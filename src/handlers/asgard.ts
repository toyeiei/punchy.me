import { Env } from '../core/types';
import { ASGARD_HTML } from '../ui/asgard';

export async function handleAsgardGet(_request: Request, _env: Env, _ctx: ExecutionContext): Promise<Response> {
	// MVP: Hardcoded high-quality, optimized Unsplash image (Snow mountain under stars)
	// Using q=80 and auto=format for Edge optimization while maintaining quality
	const bgUrl = 'https://images.unsplash.com/photo-1483728157106-2dc6674ba006?q=80&w=2560&auto=format&fit=crop';
	
	return new Response(ASGARD_HTML(bgUrl), {
		headers: { 'Content-Type': 'text/html;charset=UTF-8' },
	});
}
