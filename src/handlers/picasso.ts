import { Env } from '../core/types';
import { PICASSO_HTML } from '../ui/picasso';
import { checkRateLimit } from '../services/security';

export async function handlePicassoGet(): Promise<Response> {
	return new Response(PICASSO_HTML, { headers: { 'Content-Type': 'text/html' } });
}

export async function handlePicassoSearch(request: Request, env: Env): Promise<Response> {
	try {
		const { query, page = 1 } = await request.json() as { query: string, page?: number };
		if (!query || typeof query !== 'string' || query.trim() === '') {
			return new Response(JSON.stringify({ error: 'Invalid search query.' }), { status: 400 });
		}

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
		
		// Sanitize response to only return what frontend needs (URL, ID, alt description, etc)
		// Optimize payload by directly requesting WEBP formats via Imgix parameters on the raw URL
		// w=1400 is optimized for rapid edge-delivery while maintaining crisp text overlays
		const sanitizedImages = (data.results || []).map((img) => {
			const baseUrl = img.urls.raw || img.urls.regular;
			const joiner = baseUrl.includes('?') ? '&' : '?';
			
			return {
				id: img.id,
				url: `${baseUrl}${joiner}w=1400&fit=max&fm=webp&q=70`,
				thumb: `${baseUrl}${joiner}w=400&fit=crop&fm=webp&q=60`,
				alt: img.alt_description,
				author: img.user?.name || 'Unknown'
			};
		});

		return new Response(JSON.stringify({ images: sanitizedImages }), { headers: { 'Content-Type': 'application/json' } });
	} catch (e) {
		console.error("PICASSO SEARCH ERROR:", e);
		return new Response(JSON.stringify({ error: 'Internal server error during search.' }), { status: 500 });
	}
}
