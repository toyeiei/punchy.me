import { describe, it, expect, vi, beforeEach } from 'vitest';
import { THOR_HANDLER } from './thor';
import { Env } from '../core/types';

// Mock the global fetch for Browser Rendering API calls
const mockFetch = vi.fn();
(globalThis as any).fetch = mockFetch;

describe('Thor Web Intelligence Handler', () => {
  const mockEnv: Partial<Env> = {
    CLOUDFLARE_ACCOUNT_ID: 'test-account',
    THOR_API_TOKEN: 'test-token',
    THOR_STORAGE: { prepare: vi.fn() } as any,
    AI: {} as any,
    THOR_MEMORY: {} as any
  };

  beforeEach(() => {
    mockFetch.mockClear();
    vi.clearAllMocks();
  });

  it('should reject invalid URLs with 400', async () => {
    const request = new Request('https://punchy.me/thor', {
      method: 'POST',
      body: JSON.stringify({ url: 'not-a-url' }),
      headers: { 'Content-Type': 'application/json' }
    });

    const response = await THOR_HANDLER(request, mockEnv as Env);
    expect(response.status).toBe(400);
    const data = await response.json() as { error: string };
    expect(data.error).toContain('Invalid URL');
  });

  it('should reject non-HTTP/HTTPS protocols', async () => {
    const request = new Request('https://punchy.me/thor', {
      method: 'POST',
      body: JSON.stringify({ url: 'ftp://unsafe.com' }),
      headers: { 'Content-Type': 'application/json' }
    });

    const response = await THOR_HANDLER(request, mockEnv as Env);
    expect(response.status).toBe(400);
    const data = await response.json() as { error: string };
    expect(data.error).toContain('Only HTTP and HTTPS');
  });

  it('should successfully scrape and extract structured data from Markdown', async () => {
    // Mock Markdown response from Browser Rendering REST API
    const mockMarkdown = `---
title: "Cloudflare Docs"
description: "Build on the edge."
---
# Welcome to Cloudflare
Build faster with Workers.
[Docs](https://developers.cloudflare.com/docs)
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

    const response = await THOR_HANDLER(request, mockEnv as Env);
    expect(response.status).toBe(200);
    
    const data = await response.json() as { title: string, links: string[] };
    expect(data.title).toBe('Cloudflare Docs');
    expect(data.links).toContain('https://developers.cloudflare.com/docs');
    
    // Verify fetch call
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('test-account/browser-rendering/markdown'),
      expect.objectContaining({
        headers: expect.objectContaining({
          'Authorization': 'Bearer test-token'
        })
      })
    );
  });
});
