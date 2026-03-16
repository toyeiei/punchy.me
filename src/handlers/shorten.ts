import { Env } from '../core/types';
import { checkRateLimit } from '../services/security';
import { generateUniqueId, jsonResponse } from '../core/utils';
import { validateShortenRequest, isReservedId } from '../core/validation';

export async function handleShorten(request: Request, env: Env): Promise<Response> {
	const url = new URL(request.url);
	try {
		const body = await request.json();
		const validation = validateShortenRequest(body);
		
		if (!validation.success) {
			return jsonResponse({ error: validation.error }, 400);
		}
		
		const { url: longUrl, suggestedId, hp_field } = validation.data!;
		if (hp_field) return jsonResponse({ error: 'Bot detected.' }, 403);
		let targetUrl = longUrl.trim();
		if (!targetUrl.startsWith('http')) targetUrl = 'https://' + targetUrl;
		try {
			const targetHost = new URL(targetUrl).hostname;
			if (targetHost === url.hostname || targetHost.endsWith('punchy.me') || targetHost.endsWith('workers.dev')) {
				return jsonResponse({ error: 'Recursive shortening detected.' }, 400);
			}
		} catch (_e) {
			return jsonResponse({ error: 'Invalid URL format.' }, 400);
		}
		const normalized = targetUrl.replace(/\/+$/, '');
		targetUrl = normalized;
		const existingId = await env.SHORT_LINKS.get(`url:${normalized}`);
		if (existingId) return jsonResponse({ id: existingId });
		
		const ip = request.headers.get('cf-connecting-ip') || 'anonymous';
		if (!(await checkRateLimit(env, `rl:shorten:${ip}`, 10))) return jsonResponse({ error: 'Too many requests' }, 429);

		let id = suggestedId || generateUniqueId();
		if (suggestedId && isReservedId(suggestedId)) id = generateUniqueId();
		const collision = await env.SHORT_LINKS.get(id);
		if (collision && suggestedId) id = generateUniqueId();
		await env.SHORT_LINKS.put(id, targetUrl);
		await env.SHORT_LINKS.put(`url:${normalized}`, id);
		return jsonResponse({ id });
	} catch (e) {
		console.error('Shorten error:', e);
		return jsonResponse({ error: 'Invalid request' }, 400);
	}
}
