import { Env, BazukaData } from '../core/types';
import { BAZUKA_FORM_HTML } from '../ui';
import { generateUniqueId } from '../core/utils';

export async function handleBazukaGet(): Promise<Response> {
    return new Response(BAZUKA_FORM_HTML, { headers: { 'Content-Type': 'text/html' } });
}

export async function handleBazukaPost(request: Request, env: Env): Promise<Response> {
	try {
		const data = await request.json() as BazukaData & { suggestedId?: string, hp_field?: string };
		if (data.hp_field) return new Response(JSON.stringify({ error: 'Bot detected.' }), { status: 403 });
		if (!data.nickname || !data.job) return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
		const id = data.suggestedId || generateUniqueId();
		await env.SHORT_LINKS.put(id, JSON.stringify({ ...data, type: 'bazuka' }), { expirationTtl: 259200 });
		return new Response(JSON.stringify({ id }), { headers: { 'Content-Type': 'application/json' } });
	} catch (_e) { return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 }); }
}
