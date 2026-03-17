import { Env } from '../core/types';
import { MUSASHI_FORM_HTML } from '../ui';
import { validateMusashiRequest } from '../core/validation';
import { parseAIResponse, htmlPage } from '../core/utils';
import { AI_MAX_TOKENS_STANDARD } from '../core/constants';
import { handleAIRequest } from '../core/middleware';
import { MUSASHI_SYSTEM_PROMPT, buildMusashiUserPrompt } from '../prompts/musashi';
import { AIError } from '../core/errors';

export async function handleMusashiGet(): Promise<Response> {
    return htmlPage(MUSASHI_FORM_HTML);
}

export async function handleMusashiForge(request: Request, env: Env): Promise<Response> {
	return handleAIRequest(
		request,
		env,
		validateMusashiRequest,
		async (data: { description: string }, _ip: string, env: Env) => {
			let aiResponse: { response: string | Record<string, unknown> };
			try {
				aiResponse = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
					max_tokens: AI_MAX_TOKENS_STANDARD, temperature: 0.2, response_format: { type: 'json_object' },
					messages: [
						{ role: 'system', content: MUSASHI_SYSTEM_PROMPT },
						{ role: 'user', content: buildMusashiUserPrompt(data.description) }
					]
				}) as { response: string | Record<string, unknown> };
			} catch (_e) {
				throw new AIError('AI service unavailable');
			}
			return parseAIResponse(aiResponse.response);
		},
		'ai',
		5
	);
}
