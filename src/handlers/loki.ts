import { Env } from '../core/types';
import { LOKI_HTML } from '../ui';

export async function handleLokiGet(): Promise<Response> {
    return new Response(LOKI_HTML, { headers: { 'Content-Type': 'text/html' } });
}

export async function handleLokiTimeline(request: Request, env: Env): Promise<Response> {
	try {
		const { results } = await env.LOKI_DB.prepare('SELECT * FROM loki_timeline ORDER BY created_at DESC LIMIT 10').all();
		return new Response(JSON.stringify(results), { headers: { 'Content-Type': 'application/json' } });
	} catch (_e) { return new Response(JSON.stringify({ error: 'Database strike failed.' }), { status: 500 }); }
}

export async function handleLokiSupport(request: Request, env: Env): Promise<Response> {
	try {
		const { name, email, message, hp_field } = await request.json() as { name: string, email: string, message?: string, hp_field?: string };
		if (hp_field) return new Response(JSON.stringify({ error: 'Bot detected.' }), { status: 403 });
		if (!name || !email) return new Response(JSON.stringify({ error: 'Identity and Frequency required.' }), { status: 400 });
		await env.LOKI_DB.prepare('INSERT INTO loki_supporters (name, email, message) VALUES (?, ?, ?)').bind(name, email, message || '').run();
		return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
	} catch (_e) { return new Response(JSON.stringify({ error: 'Pledge failed.' }), { status: 500 }); }
}
