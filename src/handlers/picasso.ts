import { Env } from '../core/types';
import { PICASSO_HTML } from '../ui/picasso';
import { checkRateLimit } from '../services/security';

export async function handlePicassoGet(): Promise<Response> {
	return new Response(PICASSO_HTML, { headers: { 'Content-Type': 'text/html' } });
}

export async function handlePicassoSearch(request: Request, env: Env): Promise<Response> {
	try {
		const { query } = await request.json() as { query: string };
		if (!query || typeof query !== 'string' || query.trim() === '') {
			return new Response(JSON.stringify({ error: 'Invalid search query.' }), { status: 400 });
		}

		const ip = request.headers.get('cf-connecting-ip') || 'anonymous';
		if (!(await checkRateLimit(env, `rl:unsplash:${ip}`, 10))) {
			return new Response(JSON.stringify({ error: 'Tactical cooling in progress. Limit 10 searches per minute.' }), { status: 429 });
		}

		const unsplashUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=12`;
		
		const res = await fetch(unsplashUrl, {
			headers: {
				'Authorization': `Client-ID ${env.UNSPLASH_ACCESS_KEY}`
			}
		});

		if (!res.ok) {
			console.error('Unsplash API error:', await res.text());
			return new Response(JSON.stringify({ error: 'Failed to fetch from Unsplash.' }), { status: 500 });
		}

		const data = await res.json() as { results?: Array<{ id: string, urls: { regular: string, small: string }, alt_description: string, user?: { name: string } }> };
		
		// Sanitize response to only return what frontend needs (URL, ID, alt description, etc)
		const sanitizedImages = (data.results || []).map((img) => ({
			id: img.id,
			url: img.urls.regular,
			thumb: img.urls.small,
			alt: img.alt_description,
			author: img.user?.name || 'Unknown'
		}));

		return new Response(JSON.stringify({ images: sanitizedImages }), { headers: { 'Content-Type': 'application/json' } });
	} catch (e) {
		console.error("PICASSO SEARCH ERROR:", e);
		return new Response(JSON.stringify({ error: 'Internal server error during search.' }), { status: 500 });
	}
}
