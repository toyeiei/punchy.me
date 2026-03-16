import { Env } from '../core/types';
import { BAZUKA_FORM_HTML } from '../ui';
import { generateUniqueId, jsonResponse, htmlPage } from '../core/utils';
import { validateBazukaRequest, isReservedId } from '../core/validation';
import { TTL_3_DAYS } from '../core/constants';

export async function handleBazukaGet(): Promise<Response> {
    return htmlPage(BAZUKA_FORM_HTML);
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
		
		const id = (suggestedId && !isReservedId(suggestedId)) ? suggestedId : generateUniqueId();
		await env.SHORT_LINKS.put(id, JSON.stringify({ ...data, type: 'bazuka' }), { expirationTtl: TTL_3_DAYS });
		return jsonResponse({ id });
	} catch (e) {
		console.error('Bazuka POST error:', e);
		return jsonResponse({ error: 'Invalid request' }, 400);
	}
}
