import { Env } from '../core/types';
import { FREYA_HTML } from '../ui/freya';
import { checkRateLimit } from '../services/security';

export async function handleFreyaGet(): Promise<Response> {
	return new Response(FREYA_HTML, { headers: { 'Content-Type': 'text/html' } });
}

export async function handleFreyaSearch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
	try {
		const url = new URL(request.url);
		const query = url.searchParams.get('q');
		const page = url.searchParams.get('p') || '1';
		const isSearch = query && query.trim() !== '';

		// Determine Unsplash Endpoint
		let unsplashUrl;
		if (isSearch) {
			unsplashUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=10&page=${page}`;
		} else {
			// Random mode for initial page load
			unsplashUrl = `https://api.unsplash.com/photos/random?count=10`;
		}

		// Edge Cache Implementation (only for search, not for random to keep it fresh)
		const cache = caches.default;
		const cacheKey = new Request(url.toString(), request);
		if (isSearch) {
			const cachedResponse = await cache.match(cacheKey);
			if (cachedResponse) return cachedResponse;
		}

		const ip = request.headers.get('cf-connecting-ip') || 'anonymous';
		if (!(await checkRateLimit(env, `rl:unsplash:${ip}`, 10))) {
			return new Response(JSON.stringify({ error: 'Tactical cooling in progress. Limit 10 searches per minute.' }), { status: 429 });
		}
		
		const res = await fetch(unsplashUrl, {
			headers: {
				'Authorization': `Client-ID ${env.UNSPLASH_ACCESS_KEY}`
			},
			cf: { 
				cacheTtl: isSearch ? 600 : 0, 
				cacheEverything: !!isSearch 
			}
		});

		if (!res.ok) {
			console.error('Unsplash API error:', await res.text());
			return new Response(JSON.stringify({ error: 'Failed to fetch from Unsplash.' }), { status: 500 });
		}

		type UnsplashImage = { id: string; urls: { raw?: string; regular: string }; alt_description: string; user?: { name: string } };

		const rawData = await res.json() as { results?: UnsplashImage[] } | UnsplashImage[];
		// Unsplash returns results in .results for search, but as a top-level array for random
		const results = (isSearch ? (rawData as { results?: UnsplashImage[] }).results : (rawData as UnsplashImage[])) || [];
		
		const sanitizedImages = results.map((img: UnsplashImage) => {
			const baseUrl = img.urls.raw || img.urls.regular;
			const joiner = baseUrl.includes('?') ? '&' : '?';

			return {
				id: img.id,
				url: `${baseUrl}${joiner}w=1200&fit=max&fm=webp&q=70`, // Optimized for Social Media (1200px)
				preview: `${baseUrl}${joiner}w=600&fit=max&fm=webp&q=30`, // Fast canvas "ghost" load (600px)
				tiny: `${baseUrl}${joiner}w=100&fit=max&fm=webp&q=15`, // Extreme pre-fetch (100px)
				thumb: `${baseUrl}${joiner}w=150&fit=crop&fm=webp&q=20`, // Optimized visual balance grid thumb (150px)
				alt: img.alt_description,
				author: img.user?.name || 'Unknown'
			};
		});

		const response = new Response(JSON.stringify({ images: sanitizedImages }), { 
			headers: { 
				'Content-Type': 'application/json',
				'Cache-Control': isSearch ? 'public, max-age=600' : 'no-cache'
			} 
		});

		// Store in Edge Cache only for queries
		if (isSearch) ctx.waitUntil(cache.put(cacheKey, response.clone()));

		return response;
	} catch (e) {
		console.error("FREYA SEARCH ERROR:", e);
		return new Response(JSON.stringify({ error: 'Internal server error during search.' }), { status: 500 });
	}
}
