import { Env, BrowserRenderingResponse } from '../core/types';
import { jsonResponse } from '../core/utils';
import { validateThorRequest } from '../core/validation';

/**
 * Thor Web Intelligence Handler
 * Performs high-speed, stateless scraping and extraction using Cloudflare Browser Rendering REST API.
 */
export const THOR_HANDLER = async (request: Request, env: Env): Promise<Response> => {
  // 1. Validation
  let body: unknown;
  try {
    body = await request.json();
  } catch (_e) {
    return jsonResponse({ error: 'Invalid JSON payload' }, 400);
  }

  const payload = validateThorRequest(body);
  if (!payload.success || !payload.data) {
    return jsonResponse({ error: payload.error || 'Invalid payload' }, 400);
  }

  const { url } = payload.data;
  
  // 2. Security Hardening (SSRF Protection)
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return jsonResponse({ error: 'Only HTTP and HTTPS protocols are allowed' }, 400);
    }
  } catch (_e) {
    return jsonResponse({ error: 'Invalid URL provided' }, 400);
  }

  // Ensure credentials exist
  const accountId = env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = env.THOR_API_TOKEN;

  if (!accountId || !apiToken) {
    console.error('[THOR] Missing Cloudflare credentials (CLOUDFLARE_ACCOUNT_ID or THOR_API_TOKEN)');
    return jsonResponse({ error: 'Intelligence engine configuration incomplete' }, 500);
  }

  // 3. Browser Rendering API Call
  try {
    const apiResponse = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/browser-rendering/markdown`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.text();
      console.error('[THOR] Browser Rendering API Error:', errorData);
      return jsonResponse({ error: 'Failed to fetch from intelligence engine' }, 502);
    }

    const res = await apiResponse.json() as BrowserRenderingResponse;
    if (!res.success || !res.result?.markdown) {
      return jsonResponse({ error: 'Empty result from intelligence engine' }, 502);
    }

    const markdown = res.result.markdown;

    // 4. Structured Data Extraction (Hardened Regex)
    const titleMatch = markdown.match(/^title:\s*"(.*?)"/m);
    let title = titleMatch ? titleMatch[1] : 'Unknown';
    
    if (title === 'Unknown') {
      const h1Match = markdown.match(/^# (.*?)$/m);
      title = h1Match ? h1Match[1] : 'Untitled Content';
    }

    const linkMatches = [...markdown.matchAll(/\[([^\]]{1,100})\]\((https?:\/\/[^\)]{1,500})\)/g)];
    const links = Array.from(new Set(linkMatches.map(m => m[2])));

    return jsonResponse({
      url,
      title,
      links,
      status: 'completed',
      metadata: {
        linkCount: links.length,
        timestamp: new Date().toISOString()
      }
    });

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown Error';
    console.error('[THOR] System Error:', errorMessage);
    return jsonResponse({ error: 'Internal intelligence failure' }, 500);
  }
};
