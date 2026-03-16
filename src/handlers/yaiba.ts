import { Env, YaibaData } from '../core/types';
import { YAIBA_EDITOR_HTML } from '../ui';
import { generateUniqueId, jsonResponse, htmlPage } from '../core/utils';
import { validateYaibaRequest } from '../core/validation';
import { TTL_3_DAYS } from '../core/constants';

export async function handleYaibaGet(): Promise<Response> {
    return htmlPage(YAIBA_EDITOR_HTML);
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
		await env.SHORT_LINKS.put(id, JSON.stringify(yaibaData), { expirationTtl: TTL_3_DAYS });
		return jsonResponse({ id });
	} catch (e) {
		console.error('Yaiba publish error:', e);
		return jsonResponse({ error: 'Publish failed' }, 500);
	}
}
