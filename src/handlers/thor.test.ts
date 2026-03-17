import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleThorForge } from './thor';
import { Env } from '../core/types';

const mockFetch = vi.fn();
(globalThis as { fetch: typeof fetch }).fetch = mockFetch as unknown as typeof fetch;

function createMockEnv() {
  const selectFirst = vi.fn().mockResolvedValue(null);
  const upsertFirst = vi.fn().mockResolvedValue({ id: 'thor-new-id' });
  const updateRun = vi.fn().mockResolvedValue({ success: true });

  const mockD1 = {
    prepare: vi.fn((sql: string) => {
      if (sql.includes('SELECT id, content FROM thor_metadata')) {
        return {
          bind: vi.fn(() => ({ first: selectFirst }))
        };
      }

      if (sql.includes('INSERT INTO thor_metadata')) {
        return {
          bind: vi.fn(() => ({ first: upsertFirst }))
        };
      }

      if (sql.includes('UPDATE thor_metadata SET status = ?')) {
        return {
          bind: vi.fn(() => ({ run: updateRun }))
        };
      }

      throw new Error(`Unexpected SQL in test: ${sql}`);
    })
  };

  const mockEnv: Partial<Env> = {
    SHORT_LINKS: { get: vi.fn(), put: vi.fn() } as unknown as KVNamespace,
    CLOUDFLARE_ACCOUNT_ID: 'test-account',
    THOR_API_TOKEN: 'test-token',
    THOR_STORAGE: mockD1 as unknown as D1Database,
    AI: {
      run: vi.fn().mockResolvedValue({ data: [[0.1, 0.2]] })
    } as unknown as Ai,
    THOR_MEMORY: {
      upsert: vi.fn().mockResolvedValue({ success: true }),
      deleteByIds: vi.fn().mockResolvedValue({ success: true })
    } as unknown as VectorizeIndex
  };

  return {
    mockEnv,
    mockD1,
    selectFirst,
    upsertFirst,
    updateRun,
    aiRun: mockEnv.AI!.run as ReturnType<typeof vi.fn>,
    memoryUpsert: mockEnv.THOR_MEMORY!.upsert as ReturnType<typeof vi.fn>,
    memoryDeleteByIds: mockEnv.THOR_MEMORY!.deleteByIds as ReturnType<typeof vi.fn>,
  };
}

describe('Thor Web Intelligence Handler', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    vi.clearAllMocks();
  });

  it('should reject invalid URLs with 400', async () => {
    const { mockEnv } = createMockEnv();
    const request = new Request('https://punchy.me/thor', {
      method: 'POST',
      body: JSON.stringify({ url: 'not-a-url' }),
      headers: { 'Content-Type': 'application/json' }
    });

    const response = await handleThorForge(request, mockEnv as Env);
    expect(response.status).toBe(400);
    const data = await response.json() as { error: string };
    expect(data.error).toContain('Invalid URL');
  });

  it('should reject localhost and private targets before fetch', async () => {
    const { mockEnv } = createMockEnv();
    const request = new Request('https://punchy.me/thor', {
      method: 'POST',
      body: JSON.stringify({ url: 'http://127.0.0.1:3000/admin' }),
      headers: { 'Content-Type': 'application/json' }
    });

    const response = await handleThorForge(request, mockEnv as Env);
    expect(response.status).toBe(400);
    const data = await response.json() as { error: string };
    expect(data.error.toLowerCase()).toContain('private');
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('should persist canonical ids, resolve relative links, and batch embeddings', async () => {
    const { mockEnv, upsertFirst, aiRun, memoryUpsert, memoryDeleteByIds } = createMockEnv();
    const mockMarkdown = `---
title: "Cloudflare Docs"
description: "Build on the edge."
---
# Welcome to Cloudflare
${'Workers on the edge. '.repeat(90)}
[Docs](/docs)
[Docs](/docs)
[API](https://api.cloudflare.com)
`;

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        result: { markdown: mockMarkdown }
      })
    });

    upsertFirst.mockResolvedValueOnce({ id: 'thor-canonical-id' });
    aiRun.mockResolvedValueOnce({ data: [[0.1, 0.2], [0.3, 0.4]] });

    const request = new Request('https://punchy.me/thor', {
      method: 'POST',
      body: JSON.stringify({ url: 'https://developers.cloudflare.com' }),
      headers: { 'Content-Type': 'application/json' }
    });

    const response = await handleThorForge(request, mockEnv as Env);
    expect(response.status).toBe(200);

    const data = await response.json() as {
      title: string;
      links: string[];
      id: string;
      status: string;
      storage: { persisted: boolean };
      intelligence: { semantic: boolean; chunks: number };
    };

    expect(data.title).toBe('Cloudflare Docs');
    expect(data.links).toEqual([
      'https://developers.cloudflare.com/docs',
      'https://api.cloudflare.com/'
    ]);
    expect(data.id).toBe('thor-canonical-id');
    expect(data.status).toBe('completed');
    expect(data.storage.persisted).toBe(true);
    expect(data.intelligence.semantic).toBe(true);
    expect(data.intelligence.chunks).toBe(2);

    expect(aiRun).toHaveBeenCalledWith('@cf/baai/bge-small-en-v1.5', {
      text: expect.arrayContaining([expect.any(String), expect.any(String)])
    });
    expect(memoryUpsert).toHaveBeenCalledWith([
      expect.objectContaining({ id: 'thor-canonical-id-c0' }),
      expect.objectContaining({ id: 'thor-canonical-id-c1' })
    ]);
    expect(memoryDeleteByIds).not.toHaveBeenCalled();
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('test-account/browser-rendering/markdown'),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token'
        })
      })
    );
  });

  it('should reuse the existing canonical id and remove stale vectors on re-scrape', async () => {
    const { mockEnv, selectFirst, upsertFirst, aiRun, memoryDeleteByIds } = createMockEnv();
    selectFirst.mockResolvedValueOnce({
      id: 'thor-existing-id',
      content: 'legacy '.repeat(1400)
    });
    upsertFirst.mockResolvedValueOnce({ id: 'thor-existing-id' });
    aiRun.mockResolvedValueOnce({ data: [[0.9, 0.1]] });

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        result: { markdown: '# Smaller page\nShort content now.' }
      })
    });

    const request = new Request('https://punchy.me/thor', {
      method: 'POST',
      body: JSON.stringify({ url: 'https://example.com/docs' }),
      headers: { 'Content-Type': 'application/json' }
    });

    const response = await handleThorForge(request, mockEnv as Env);
    expect(response.status).toBe(200);
    const data = await response.json() as { id: string };
    expect(data.id).toBe('thor-existing-id');
    expect(memoryDeleteByIds).toHaveBeenCalledWith([
      'thor-existing-id-c1',
      'thor-existing-id-c2',
      'thor-existing-id-c3',
      'thor-existing-id-c4',
      'thor-existing-id-c5',
      'thor-existing-id-c6',
      'thor-existing-id-c7',
      'thor-existing-id-c8',
      'thor-existing-id-c9'
    ]);
  });

  it('should return partial status and skip vectorization when D1 persistence fails', async () => {
    const { mockEnv, upsertFirst, aiRun, memoryUpsert } = createMockEnv();
    upsertFirst.mockRejectedValueOnce(new Error('D1 unavailable'));

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        result: { markdown: '# Cloudflare\nPersistent storage failed.' }
      })
    });

    const request = new Request('https://punchy.me/thor', {
      method: 'POST',
      body: JSON.stringify({ url: 'https://example.com' }),
      headers: { 'Content-Type': 'application/json' }
    });

    const response = await handleThorForge(request, mockEnv as Env);
    expect(response.status).toBe(200);
    const data = await response.json() as {
      id: string | null;
      status: string;
      storage: { persisted: boolean };
      intelligence: { semantic: boolean };
    };

    expect(data.id).toBeNull();
    expect(data.status).toBe('partial');
    expect(data.storage.persisted).toBe(false);
    expect(data.intelligence.semantic).toBe(false);
    expect(aiRun).not.toHaveBeenCalled();
    expect(memoryUpsert).not.toHaveBeenCalled();
  });

  it('should return partial status when vectorization fails', async () => {
    const { mockEnv, memoryUpsert } = createMockEnv();
    memoryUpsert.mockRejectedValueOnce(new Error('Vectorize unavailable'));

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        result: { markdown: '# Cloudflare\nVector indexing failed.' }
      })
    });

    const request = new Request('https://punchy.me/thor', {
      method: 'POST',
      body: JSON.stringify({ url: 'https://example.com/vector' }),
      headers: { 'Content-Type': 'application/json' }
    });

    const response = await handleThorForge(request, mockEnv as Env);
    expect(response.status).toBe(200);

    const data = await response.json() as {
      id: string;
      status: string;
      storage: { persisted: boolean };
      intelligence: { semantic: boolean; chunks: number };
    };

    expect(data.id).toBe('thor-new-id');
    expect(data.status).toBe('partial');
    expect(data.storage.persisted).toBe(true);
    expect(data.intelligence.semantic).toBe(false);
    expect(data.intelligence.chunks).toBe(0);
  });
});
