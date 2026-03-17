import { Env, BrowserRenderingResponse } from '../core/types';
import { jsonResponse, generateUniqueId, htmlPage, chunkText } from '../core/utils';
import { validateThorRequest } from '../core/validation';
import { THOR_UI_HTML } from '../ui/thor';

/**
 * Thor UI Handler
 */
export const handleThorGet = async (): Promise<Response> => {
  return htmlPage(THOR_UI_HTML);
};

/**
 * Thor Web Intelligence Forge Handler
 */
export const handleThorForge = async (request: Request, env: Env): Promise<Response> => {
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
    console.error('[THOR] Missing Cloudflare credentials');
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

    // 4. Structured Data Extraction
    const titleMatch = markdown.match(/^title:\s*"(.*?)"/m);
    let title = titleMatch ? titleMatch[1] : 'Unknown';
    if (title === 'Unknown') {
      const h1Match = markdown.match(/^# (.*?)$/m);
      title = h1Match ? h1Match[1] : 'Untitled Content';
    }

    const descMatch = markdown.match(/^description:\s*"(.*?)"/m);
    const description = descMatch ? descMatch[1] : '';

    const linkMatches = [...markdown.matchAll(/\[([^\]]{1,100})\]\((https?:\/\/[^\)]{1,500})\)/g)];
    const links = Array.from(new Set(linkMatches.map(m => m[2])));

    const wordCount = markdown.split(/\s+/).length;

    // 5. D1 Persistence (Upsert)
    const id = generateUniqueId(8);
    try {
      await env.THOR_STORAGE.prepare(`
        INSERT INTO thor_metadata (id, url, title, description, content, word_count, status, last_scraped)
        VALUES (?, ?, ?, ?, ?, ?, 'completed', CURRENT_TIMESTAMP)
        ON CONFLICT(url) DO UPDATE SET
          title = excluded.title,
          description = excluded.description,
          content = excluded.content,
          word_count = excluded.word_count,
          status = 'completed',
          last_scraped = CURRENT_TIMESTAMP
      `).bind(id, url, title, description, markdown, wordCount).run();
    } catch (dbErr) {
      console.error('[THOR] D1 Persistence Error:', dbErr);
    }

    // 6. Vectorize & AI Integration (Semantic Memory)
    let chunksProcessed = 0;
    try {
      const chunks = chunkText(markdown);
      
      // Generate embeddings in a single batch if possible, or iterate
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        
        // Generate embedding
        const embeddingResponse = await env.AI.run('@cf/baai/bge-small-en-v1.5', {
          text: [chunk]
        }) as { data: number[][] };
        
        if (embeddingResponse?.data?.[0]) {
          const vector = embeddingResponse.data[0];
          
          // Upsert to Vectorize
          await env.THOR_MEMORY.upsert([
            {
              id: `${id}-c${i}`,
              values: vector,
              metadata: {
                url,
                title,
                text: chunk.substring(0, 500) // Store snippet for reference
              }
            }
          ]);
          chunksProcessed++;
        }
      }
    } catch (aiErr) {
      console.error('[THOR] AI/Vectorize Integration Error:', aiErr);
    }

    return jsonResponse({
      id,
      url,
      title,
      description,
      links,
      wordCount,
      status: 'completed',
      intelligence: {
        chunks: chunksProcessed,
        semantic: true
      },
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
