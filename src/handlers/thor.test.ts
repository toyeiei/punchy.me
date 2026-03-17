import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleThorForge, handleThorPdf } from './thor';
import { Env } from '../core/types';

const mockFetch = vi.fn();
(globalThis as { fetch: typeof fetch }).fetch = mockFetch as unknown as typeof fetch;

function createMockEnv() {
  const kvPut = vi.fn().mockResolvedValue(undefined);
  const kvGet = vi.fn().mockResolvedValue(null);

  const mockEnv: Partial<Env> = {
    SHORT_LINKS: {
      get: kvGet,
      put: kvPut
    } as unknown as KVNamespace,
    CLOUDFLARE_ACCOUNT_ID: 'test-account',
    THOR_API_TOKEN: 'test-token',
    AI: {
      run: vi.fn().mockResolvedValue({
        response: JSON.stringify({
          title: 'Test Page',
          seo: { ogTitle: 'Test OG Title', ogDescription: 'Test OG Desc', ogImage: null, metaTitle: 'Test Meta', metaDescription: null, metaKeywords: ['test'], canonical: null, robots: null },
          structure: { h1Count: 1, h2Count: 2, h3Count: 0, h1Texts: ['Main Heading'], linkCount: 5, imageCount: 3, notableImages: [] },
          content: { summary: 'This is a test page summary.', topics: ['testing', 'demo'], contentType: 'blog', targetAudience: 'Developers', keyEntities: ['Cloudflare'], readingTime: 5, wordCount: 1000 },
          technical: { hasSchema: false, schemaTypes: [], ogScore: 66 }
        })
      })
    } as unknown as Ai
  };

  return {
    mockEnv,
    kvPut,
    kvGet,
    aiRun: mockEnv.AI!.run as ReturnType<typeof vi.fn>
  };
}

describe('Thor V2 Web Intelligence Handler', () => {
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

  it('should scrape page, analyze with AI, and return structured intelligence', async () => {
    const { mockEnv, aiRun, kvPut } = createMockEnv();
    const mockMarkdown = `---
title: "Cloudflare Docs"
description: "Build on the edge."
---
# Welcome to Cloudflare
Workers on the edge. Fast, secure, scalable.
`;

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        result: { markdown: mockMarkdown }
      })
    });

    const request = new Request('https://punchy.me/thor', {
      method: 'POST',
      body: JSON.stringify({ url: 'https://developers.cloudflare.com' }),
      headers: { 'Content-Type': 'application/json' }
    });

    const response = await handleThorForge(request, mockEnv as Env);
    expect(response.status).toBe(200);

    const data = await response.json() as {
      id: string;
      url: string;
      title: string;
      intelligence: {
        seo: { ogTitle: string };
        content: { summary: string; topics: string[] };
        technical: { ogScore: number };
      };
    };

    expect(data.id).toBeDefined();
    expect(data.id.length).toBe(8);
    expect(data.url).toBe('https://developers.cloudflare.com');
    expect(data.title).toBeDefined();
    expect(data.intelligence).toBeDefined();
    expect(data.intelligence.content.summary).toContain('test page');
    expect(data.intelligence.content.topics).toContain('testing');
    expect(data.intelligence.technical.ogScore).toBe(66);

    // Verify AI was called with Mistral
    expect(aiRun).toHaveBeenCalledWith('@cf/mistralai/mistral-small-3.1-24b-instruct', expect.objectContaining({
      messages: expect.arrayContaining([
        expect.objectContaining({ role: 'system' }),
        expect.objectContaining({ role: 'user' })
      ]),
      max_tokens: 1500,
      temperature: 0.2
    }));

    // Verify report was cached for PDF access
    expect(kvPut).toHaveBeenCalledWith(
      expect.stringContaining('thor:'),
      expect.any(String),
      expect.objectContaining({ expirationTtl: 3600 })
    );

    // Verify browser rendering was called
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('test-account/browser-rendering/markdown'),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token'
        })
      })
    );
  });

  it('should handle browser rendering failures gracefully', async () => {
    const { mockEnv, aiRun } = createMockEnv();

    mockFetch.mockResolvedValueOnce({
      ok: false,
      text: async () => 'Internal Server Error'
    });

    const request = new Request('https://punchy.me/thor', {
      method: 'POST',
      body: JSON.stringify({ url: 'https://example.com' }),
      headers: { 'Content-Type': 'application/json' }
    });

    const response = await handleThorForge(request, mockEnv as Env);
    expect(response.status).toBe(502);
    const data = await response.json() as { error: string };
    expect(data.error).toContain('Browser rendering');
    expect(aiRun).not.toHaveBeenCalled();
  });

  it('should handle AI analysis failures gracefully', async () => {
    const { mockEnv, aiRun } = createMockEnv();
    aiRun.mockRejectedValueOnce(new Error('AI service unavailable'));

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        result: { markdown: '# Test Page\nSome content here.' }
      })
    });

    const request = new Request('https://punchy.me/thor', {
      method: 'POST',
      body: JSON.stringify({ url: 'https://example.com' }),
      headers: { 'Content-Type': 'application/json' }
    });

    const response = await handleThorForge(request, mockEnv as Env);
    expect(response.status).toBe(502);
    const data = await response.json() as { error: string };
    expect(data.error).toContain('analyze');
  });

  it('should return PDF report when valid ID provided', async () => {
    const { mockEnv, kvGet } = createMockEnv();

    const cachedReport = {
      id: 'test1234',
      url: 'https://example.com',
      title: 'Test Page',
      scrapedAt: new Date().toISOString(),
      intelligence: {
        seo: { ogTitle: null, ogDescription: null, ogImage: null, metaTitle: 'Test', metaDescription: null, metaKeywords: [], canonical: null, robots: null },
        structure: { h1Count: 1, h2Count: 0, h3Count: 0, h1Texts: ['Test'], linkCount: 0, imageCount: 0, notableImages: [] },
        content: { summary: 'Test summary', topics: [], contentType: 'other', targetAudience: 'Unknown', keyEntities: [], readingTime: 1, wordCount: 100 },
        technical: { hasSchema: false, schemaTypes: [], ogScore: 0 }
      }
    };

    kvGet.mockResolvedValueOnce(JSON.stringify(cachedReport));

    const request = new Request('https://punchy.me/thor/pdf/test1234');
    const response = await handleThorPdf(request, mockEnv as Env, '/thor/pdf/test1234');

    expect(response.status).toBe(200);
    const html = await response.text();
    expect(html).toContain('THOR INTELLIGENCE REPORT');
    expect(html).toContain('Test Page');
    expect(html).toContain('example.com');
  });

  it('should reject invalid PDF IDs', async () => {
    const { mockEnv } = createMockEnv();

    const request = new Request('https://punchy.me/thor/pdf/abc');
    await expect(handleThorPdf(request, mockEnv as Env, '/thor/pdf/abc')).rejects.toThrow('Invalid report ID');
  });

  it('should return error for expired PDF reports', async () => {
    const { mockEnv, kvGet } = createMockEnv();
    kvGet.mockResolvedValueOnce(null);

    const request = new Request('https://punchy.me/thor/pdf/notfound');
    await expect(handleThorPdf(request, mockEnv as Env, '/thor/pdf/notfound')).rejects.toThrow('not found');
  });

  it('should reject URLs with embedded credentials', async () => {
    const { mockEnv } = createMockEnv();
    // Test URL format that should be rejected for security reasons
    const maliciousUrl = 'https://' + 'admin:s3cr3t' + '@example.com/secret';
    const request = new Request('https://punchy.me/thor', {
      method: 'POST',
      body: JSON.stringify({ url: maliciousUrl }),
      headers: { 'Content-Type': 'application/json' }
    });

    const response = await handleThorForge(request, mockEnv as Env);
    expect(response.status).toBe(400);
    const data = await response.json() as { error: string };
    expect(data.error).toContain('credentials');
  });

  it('should reject .local and .internal domains', async () => {
    const { mockEnv } = createMockEnv();
    const request = new Request('https://punchy.me/thor', {
      method: 'POST',
      body: JSON.stringify({ url: 'https://myapp.local/dashboard' }),
      headers: { 'Content-Type': 'application/json' }
    });

    const response = await handleThorForge(request, mockEnv as Env);
    expect(response.status).toBe(400);
    const data = await response.json() as { error: string };
    expect(data.error.toLowerCase()).toContain('private');
  });
});
