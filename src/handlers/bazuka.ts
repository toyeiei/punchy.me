import { Env } from '../core/types';
import { BAZUKA_FORM_HTML } from '../ui';
import { generateUniqueId, htmlPage } from '../core/utils';
import { validateBazukaRequest, isReservedId } from '../core/validation';
import { TTL_3_DAYS } from '../core/constants';
import { handleValidatedRequest } from '../core/middleware';

export async function handleBazukaGet(): Promise<Response> {
    return htmlPage(BAZUKA_FORM_HTML);
}

export async function handleBazukaPost(request: Request, env: Env): Promise<Response> {
	return handleValidatedRequest(
		request,
		env,
		validateBazukaRequest,
		async (data: { nickname: string; job: string; email: string; website: string; suggestedId?: string }) => {
			const id = (data.suggestedId && !isReservedId(data.suggestedId)) ? data.suggestedId : generateUniqueId();
			const { suggestedId: _, ...cardData } = data;
			await env.SHORT_LINKS.put(id, JSON.stringify({ ...cardData, type: 'bazuka' }), { expirationTtl: TTL_3_DAYS });
			return { id };
		}
	);
}
