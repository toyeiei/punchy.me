import { Env } from '../core/types';
import { ASGARD_HTML } from '../ui/asgard';

export async function handleAsgardGet(_request: Request, _env: Env, _ctx: ExecutionContext): Promise<Response> {
	// The HTML is now static (randomness handled on client), allowing 100% Edge caching
	const response = new Response(ASGARD_HTML, {
		headers: { 
			'Content-Type': 'text/html;charset=UTF-8',
			'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
			// Early Hints & Preloading for critical assets
			'Link': '<https://fonts.googleapis.com>; rel=preconnect, <https://fonts.gstatic.com>; rel=preconnect, </asgard_assets/asgard_bg_midjourney.webp>; rel=preload; as=image'
		},
	});
	
	return response;
}
