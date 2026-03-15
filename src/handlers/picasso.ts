import { Env } from '../core/types';
import { PICASSO_HTML } from '../ui/picasso';
import { checkRateLimit } from '../services/security';

export async function handlePicassoGet(): Promise<Response> {
	return new Response(PICASSO_HTML, { headers: { 'Content-Type': 'text/html' } });
}

export async function handlePicassoSearch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
	try {
		const url = new URL(request.url);
		const query = url.searchParams.get('q');
		const page = url.searchParams.get('p') || '1';

		if (!query || query.trim() === '') {
			return new Response(JSON.stringify({ error: 'Invalid search query.' }), { status: 400 });
		}

		// Edge Cache Implementation
		const cache = caches.default;
		const cacheKey = new Request(url.toString(), request);
		let cachedResponse = await cache.match(cacheKey);
		if (cachedResponse) return cachedResponse;

		const ip = request.headers.get('cf-connecting-ip') || 'anonymous';
		if (!(await checkRateLimit(env, `rl:unsplash:${ip}`, 10))) {
			return new Response(JSON.stringify({ error: 'Tactical cooling in progress. Limit 10 searches per minute.' }), { status: 429 });
		}

		const unsplashUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=10&page=${page}`;
		
		const res = await fetch(unsplashUrl, {
			headers: {
				'Authorization': `Client-ID ${env.UNSPLASH_ACCESS_KEY}`
			}
		});

		if (!res.ok) {
			console.error('Unsplash API error:', await res.text());
			return new Response(JSON.stringify({ error: 'Failed to fetch from Unsplash.' }), { status: 500 });
		}

		const data = await res.json() as { results?: Array<{ id: string, urls: { raw: string, regular: string, small: string }, alt_description: string, user?: { name: string } }> };
		
		const sanitizedImages = (data.results || []).map((img) => {
			const baseUrl = img.urls.raw || img.urls.regular;
			const joiner = baseUrl.includes('?') ? '&' : '?';
			
			return {
				id: img.id,
				url: `${baseUrl}${joiner}w=1400&fit=max&fm=webp&q=70`,
				preview: `${baseUrl}${joiner}w=800&fit=max&fm=webp&q=40`,
				tiny: `${baseUrl}${joiner}w=200&fit=max&fm=webp&q=20`, // Tier 0
				thumb: `${baseUrl}${joiner}w=400&fit=crop&fm=webp&q=60`,
				alt: img.alt_description,
				author: img.user?.name || 'Unknown'
			};
		});

		const response = new Response(JSON.stringify({ images: sanitizedImages }), { 
			headers: { 
				'Content-Type': 'application/json',
				'Cache-Control': 'public, max-age=600' // Cache for 10 minutes
			} 
		});

		// Store in Edge Cache
		ctx.waitUntil(cache.put(cacheKey, response.clone()));

		return response;
	} catch (e) {
		console.error("PICASSO SEARCH ERROR:", e);
		return new Response(JSON.stringify({ error: 'Internal server error during search.' }), { status: 500 });
	}
}
