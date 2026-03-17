import { Env, YaibaData } from '../core/types';
import { YAIBA_EDITOR_HTML } from '../ui';
import { generateUniqueId, htmlPage } from '../core/utils';
import { validateYaibaRequest } from '../core/validation';
import { TTL_3_DAYS } from '../core/constants';
import { handleValidatedRequest } from '../core/middleware';

export async function handleYaibaGet(): Promise<Response> {
    return htmlPage(YAIBA_EDITOR_HTML);
}

export async function handleYaibaPublish(request: Request, env: Env): Promise<Response> {
	return handleValidatedRequest(
		request,
		env,
		validateYaibaRequest,
		async (data: { content: string }) => {
			const id = generateUniqueId();
			const yaibaData: YaibaData = { type: 'yaiba', content: data.content, tags: [], createdAt: Date.now() };
			await env.SHORT_LINKS.put(id, JSON.stringify(yaibaData), { expirationTtl: TTL_3_DAYS });
			return { id };
		},
		{ skipHoneypot: true }
	);
}
