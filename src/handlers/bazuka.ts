import { Env } from '../core/types';
import { BAZUKA_FORM_HTML } from '../ui';
import { generateUniqueId, jsonResponse } from '../core/utils';
import { validateBazukaRequest } from '../core/validation';

export async function handleBazukaGet(): Promise<Response> {
    return new Response(BAZUKA_FORM_HTML, { headers: { 'Content-Type': 'text/html' } });
}

export async function handleBazukaPost(request: Request, env: Env): Promise<Response> {
	try {
		const body = await request.json();
		const validation = validateBazukaRequest(body);
		
		if (!validation.success) {
			return jsonResponse({ error: validation.error }, 400);
		}
		
		const { hp_field, suggestedId, ...data } = validation.data!;
		if (hp_field) return jsonResponse({ error: 'Bot detected.' }, 403);
		
		const id = suggestedId || generateUniqueId();
		await env.SHORT_LINKS.put(id, JSON.stringify({ ...data, type: 'bazuka' }), { expirationTtl: 259200 });
		return new Response(JSON.stringify({ id }), { headers: { 'Content-Type': 'application/json' } });
	} catch (e) {
		console.error('Bazuka POST error:', e);
		return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
	}
}
