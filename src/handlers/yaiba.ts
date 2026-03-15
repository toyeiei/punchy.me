import { Env, YaibaData } from '../core/types';
import { YAIBA_EDITOR_HTML } from '../ui';

export async function handleYaibaGet(): Promise<Response> {
    return new Response(YAIBA_EDITOR_HTML, { headers: { 'Content-Type': 'text/html' } });
}

export async function handleYaibaPublish(request: Request, env: Env): Promise<Response> {
	try {
		const { content } = await request.json() as { content: string };
		if (!content || content.length < 100) return new Response(JSON.stringify({ error: 'YAIBA requires at least 100 characters.' }), { status: 400 });
		if (content.length > 5000) return new Response(JSON.stringify({ error: 'Invalid content size.' }), { status: 400 });
		const id = Math.random().toString(36).substring(2, 8);
		const yaibaData: YaibaData = { type: 'yaiba', content, tags: [], createdAt: Date.now() };
		await env.SHORT_LINKS.put(id, JSON.stringify(yaibaData), { expirationTtl: 259200 });
		return new Response(JSON.stringify({ id }), { headers: { 'Content-Type': 'application/json' } });
	} catch (_e) { return new Response(JSON.stringify({ error: 'Publish failed' }), { status: 500 }); }
}
