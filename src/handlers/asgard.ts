import { Env } from '../core/types';
import { ASGARD_HTML } from '../ui/asgard';

export async function handleAsgardGet(_request: Request, _env: Env, _ctx: ExecutionContext): Promise<Response> {
	// Serving a highly-optimized local WebP image directly via Cloudflare Assets
	const bgUrl = '/asgard_bg/asgard_bg_01.webp';
	
	return new Response(ASGARD_HTML(bgUrl), {
		headers: { 'Content-Type': 'text/html;charset=UTF-8' },
	});
}
