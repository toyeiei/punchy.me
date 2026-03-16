import { Env } from '../core/types';
import { ASGARD_HTML } from '../ui/asgard';

export async function handleAsgardGet(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
	// Fallback stunning image just in case
	let bgUrl = 'https://images.unsplash.com/photo-1531366936337-7c912a458b07?q=80&w=2560&auto=format&fit=crop';
	
	try {
		const cache = caches.default;
		// We cache the background URL for 1 hour to avoid hitting Unsplash API limits
		// The cache key uses a rounded hour timestamp so all users see the same image during that hour.
		const hourKey = Math.floor(Date.now() / (1000 * 60 * 60));
		const cacheKey = new Request(`https://punchy.me/api/internal/asgard-bg?h=${hourKey}`);
		
		const cachedResponse = await cache.match(cacheKey);

		if (cachedResponse) {
			const data = await cachedResponse.json() as { url: string };
			if (data && data.url) {
				bgUrl = data.url;
			}
		} else if (env.UNSPLASH_ACCESS_KEY) {
			// Fetch a new image if cache missed and we have the key
			const unsplashRes = await fetch('https://api.unsplash.com/photos/random?query=aurora,cosmos,majestic,nature&orientation=landscape', {
				headers: { 'Authorization': `Client-ID ${env.UNSPLASH_ACCESS_KEY}` }
			});

			if (unsplashRes.ok) {
				const data = await unsplashRes.json() as { urls?: { regular?: string } };
				if (data && data.urls && data.urls.regular) {
					bgUrl = data.urls.regular;
					
					// Store in cache for 1 hour
					const responseToCache = new Response(JSON.stringify({ url: bgUrl }), {
						headers: { 
							'Content-Type': 'application/json',
							'Cache-Control': 's-maxage=3600'
						}
					});
					ctx.waitUntil(cache.put(cacheKey, responseToCache));
				}
			}
		}
	} catch (e) {
		console.error("ASGARD BG ERROR:", e);
		// Fail silently and use the fallback background
	}

	return new Response(ASGARD_HTML(bgUrl), {
		headers: { 'Content-Type': 'text/html;charset=UTF-8' },
	});
}
