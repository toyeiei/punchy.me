import { Env } from '../core/types';
import { checkRateLimit } from '../services/security';
import { generateUniqueId } from '../core/utils';

export async function handleShorten(request: Request, env: Env): Promise<Response> {
	const url = new URL(request.url);
	try {
		const { url: longUrl, suggestedId, hp_field } = await request.json() as { url: string, suggestedId?: string, hp_field?: string };
		if (hp_field) return new Response(JSON.stringify({ error: 'Bot detected.' }), { status: 403 });
		let targetUrl = longUrl.trim();
		if (!targetUrl.startsWith('http')) targetUrl = 'https://' + targetUrl;
		try {
			const targetHost = new URL(targetUrl).hostname;
			if (targetHost === url.hostname || targetHost.endsWith('punchy.me') || targetHost.endsWith('workers.dev')) {
				return new Response(JSON.stringify({ error: 'Recursive shortening detected.' }), { status: 400 });
			}
		} catch (_e) {
			return new Response(JSON.stringify({ error: 'Invalid URL format.' }), { status: 400 });
		}
		const normalized = targetUrl.replace(/\/+$/, '');
		targetUrl = normalized;
		const existingId = await env.SHORT_LINKS.get(`url:${normalized}`);
		if (existingId) return new Response(JSON.stringify({ id: existingId }), { headers: { 'Content-Type': 'application/json' } });
		
		const ip = request.headers.get('cf-connecting-ip') || 'anonymous';
		if (!(await checkRateLimit(env, `rl:${ip}`, 10))) return new Response(JSON.stringify({ error: 'Too many requests' }), { status: 429 });

		let id = suggestedId || generateUniqueId();
		const collision = await env.SHORT_LINKS.get(id);
		if (collision && suggestedId) id = generateUniqueId();
		await env.SHORT_LINKS.put(id, targetUrl);
		await env.SHORT_LINKS.put(`url:${normalized}`, id);
		return new Response(JSON.stringify({ id }), { headers: { 'Content-Type': 'application/json' } });
	} catch (_e) { return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 }); }
}
