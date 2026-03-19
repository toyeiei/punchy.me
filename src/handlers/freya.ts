import { Env } from '../core/types';
import { FREYA_HTML } from '../ui/freya';
import { checkRateLimit } from '../services/security';
import { jsonResponse, htmlPage } from '../core/utils';
import { FREYA_CACHE_TTL } from '../core/constants';

type UnsplashImage = { id: string; urls: { raw?: string; regular: string }; alt_description: string; user?: { name: string } };

function isUnsplashImage(x: unknown): x is UnsplashImage {
	if (typeof x !== 'object' || x === null) return false;
	const obj = x as Record<string, unknown>;
	return typeof obj.id === 'string' && typeof obj.urls === 'object' && obj.urls !== null;
}

export async function handleFreyaGet(): Promise<Response> {
	return htmlPage(FREYA_HTML);
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
			return jsonResponse({ error: 'Tactical cooling in progress. Limit 10 searches per minute.' }, 429);
		}
		
		const res = await fetch(unsplashUrl, {
			headers: {
				'Authorization': `Client-ID ${env.UNSPLASH_ACCESS_KEY}`
			},
			cf: {
				cacheTtl: isSearch ? FREYA_CACHE_TTL : 0,
				cacheEverything: !!isSearch
			}
		});

		if (!res.ok) {
			console.error('Unsplash API error:', res.status, res.statusText);
			return jsonResponse({ error: 'Failed to fetch from Unsplash.' }, 500);
		}

		const rawData: unknown = await res.json();
		// Unsplash returns results in .results for search, but as a top-level array for random
		let rawResults: unknown[];
		if (isSearch) {
			const searchData = rawData as { results?: unknown[] };
			rawResults = Array.isArray(searchData.results) ? searchData.results : [];
		} else {
			rawResults = Array.isArray(rawData) ? rawData : [];
		}
		const results = rawResults.filter(isUnsplashImage);
		
		const sanitizedImages = results.map((img) => {
			const baseUrl = img.urls.raw || img.urls.regular;
			const joiner = baseUrl.includes('?') ? '&' : '?';

			return {
				id: img.id,
				url: `${baseUrl}${joiner}w=1200&fit=max&fm=webp&q=70`, // Optimized for Social Media (1200px)
				preview: `${baseUrl}${joiner}w=600&fit=max&fm=webp&q=30`, // Fast canvas "ghost" load (600px)
				small: `${baseUrl}${joiner}w=400&fit=max&fm=webp&q=40`, // Editor preview (400px, fast)
				tiny: `${baseUrl}${joiner}w=100&fit=max&fm=webp&q=15`, // Extreme pre-fetch (100px)
				thumb: `${baseUrl}${joiner}w=150&fit=crop&fm=webp&q=20`, // Sidebar thumbnails (150px)
				alt: img.alt_description,
				author: img.user?.name || 'Unknown'
			};
		});

		const response = new Response(JSON.stringify({ images: sanitizedImages }), { 
			headers: { 
				'Content-Type': 'application/json',
				'Cache-Control': isSearch ? `public, max-age=${FREYA_CACHE_TTL}` : 'no-cache'
			} 
		});

		// Store in Edge Cache only for queries
		if (isSearch) ctx.waitUntil(cache.put(cacheKey, response.clone()));

		return response;
	} catch (e) {
		console.error("FREYA SEARCH ERROR:", e);
		return jsonResponse({ error: 'Internal server error during search.' }, 500);
	}
}
