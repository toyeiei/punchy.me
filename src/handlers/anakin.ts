import { Env } from '../core/types';
import { ANAKIN_FORM_HTML } from '../ui';
import { generateUniqueId, jsonResponse, parseAIResponse, htmlPage } from '../core/utils';
import { validateAnakinRequest, isReservedId } from '../core/validation';
import { TTL_3_DAYS, AI_MAX_TOKENS_STANDARD } from '../core/constants';
import { handleValidatedRequest } from '../core/middleware';
import { ANAKIN_SYSTEM_PROMPT, buildAnakinUserPrompt } from '../prompts/anakin';
import { ValidationError, NotFoundError, handleError } from '../core/errors';

export async function handleAnakinGet(): Promise<Response> {
    return htmlPage(ANAKIN_FORM_HTML);
}

export async function handleAnakinPost(request: Request, env: Env): Promise<Response> {
	return handleValidatedRequest(
		request,
		env,
		validateAnakinRequest,
		async (data: { name: string; job: string; email: string; website: string; education: string; skills: string; experience: string; suggestedId?: string }) => {
			const id = (data.suggestedId && !isReservedId(data.suggestedId)) ? data.suggestedId : generateUniqueId();
			const { suggestedId: _, ...resumeData } = data;
			await env.SHORT_LINKS.put(id, JSON.stringify({ ...resumeData, type: 'anakin', aiHydrated: false }), { expirationTtl: TTL_3_DAYS });
			return { id };
		}
	);
}

export async function handleAnakinHydrate(request: Request, env: Env, path: string): Promise<Response> {
	try {
		const id = path.split('/').pop();
		if (!id) {
			throw new ValidationError('Invalid ID');
		}
		
		const value = await env.SHORT_LINKS.get(id);
		if (!value) {
			throw new NotFoundError('Resume not found');
		}
		
		if (!value.startsWith('{')) {
			throw new ValidationError('Invalid Type');
		}
		
		const data = JSON.parse(value);
		if (data.type !== 'anakin') {
			throw new ValidationError('Invalid Type');
		}
		
		if (data.aiHydrated) {
			return jsonResponse(data);
		}
		
		const aiResponse = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
			max_tokens: AI_MAX_TOKENS_STANDARD, temperature: 0.4, response_format: { type: 'json_object' },
			messages: [
				{ role: 'system', content: ANAKIN_SYSTEM_PROMPT },
				{ role: 'user', content: buildAnakinUserPrompt(data.job, data.experience, data.skills) }
			]
		}) as { response: string | Record<string, unknown> };
		
		const result = parseAIResponse(aiResponse.response);

		data.aiSummary = result.summary ? String(result.summary).trim() : "Elite profile forged.";
		
		let expText = data.experience;
		if (Array.isArray(result.experience)) {
			expText = result.experience.map((b: unknown) => '• ' + String(b).trim().replace(/^[-•]\s*/, '')).join('\n');
		} else if (typeof result.experience === 'string') {
			expText = String(result.experience).trim().replace(/^[-•]\s*/gm, '• ');
		}
		data.aiExperience = expText;
		
		data.aiHydrated = true;
		await env.SHORT_LINKS.put(id, JSON.stringify(data), { expirationTtl: TTL_3_DAYS });
		return jsonResponse(data);
	} catch (error) {
		return handleError(error);
	}
}
