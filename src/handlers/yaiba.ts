import { Env, YaibaData } from '../core/types';
import { YAIBA_EDITOR_HTML } from '../ui';
import { generateUniqueId, jsonResponse } from '../core/utils';
import { validateYaibaRequest } from '../core/validation';

export async function handleYaibaGet(): Promise<Response> {
    return new Response(YAIBA_EDITOR_HTML, { headers: { 'Content-Type': 'text/html' } });
}

export async function handleYaibaPublish(request: Request, env: Env): Promise<Response> {
	try {
		const body = await request.json();
		const validation = validateYaibaRequest(body);
		
		if (!validation.success) {
			return jsonResponse({ error: validation.error }, 400);
		}
		
		const { content } = validation.data!;
		const id = generateUniqueId();
		const yaibaData: YaibaData = { type: 'yaiba', content, tags: [], createdAt: Date.now() };
		await env.SHORT_LINKS.put(id, JSON.stringify(yaibaData), { expirationTtl: 259200 });
		return jsonResponse({ id });
	} catch (e) {
		console.error('Yaiba publish error:', e);
		return jsonResponse({ error: 'Publish failed' }, 500);
	}
}
