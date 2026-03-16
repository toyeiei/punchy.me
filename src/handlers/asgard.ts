import { Env } from '../core/types';
import { ASGARD_HTML } from '../ui/asgard';

export async function handleAsgardGet(_request: Request, _env: Env, _ctx: ExecutionContext): Promise<Response> {
	// Rotate between the 3 optimized local WebP images
	const backgrounds = [
		'/asgard_bg/asgard_bg_01.webp',
		'/asgard_bg/asgard_bg_02.webp',
		'/asgard_bg/asgard_bg_03.webp'
	];
	const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
	
	return new Response(ASGARD_HTML(randomBg), {
		headers: { 
			'Content-Type': 'text/html;charset=UTF-8',
			// Prevent caching the HTML so the background rotates on reload
			'Cache-Control': 'no-cache, no-store, must-revalidate'
		},
	});
}
