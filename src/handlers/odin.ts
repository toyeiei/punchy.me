import { Env } from '../core/types';
import { ODIN_HTML } from '../ui';
import { verifyTurnstile } from '../services/security';
import { validateOdinRequest } from '../core/validation';
import { htmlPage } from '../core/utils';
import { AI_MAX_TOKENS_STANDARD } from '../core/constants';
import { handleAIRequest } from '../core/middleware';
import { AuthenticationError } from '../core/errors';
import { ODIN_SYSTEM_PROMPT, buildOdinUserPrompt } from '../prompts/odin';

export async function handleOdinGet(): Promise<Response> {
    return htmlPage(ODIN_HTML);
}

export async function handleOdinAnalyze(request: Request, env: Env): Promise<Response> {
	return handleAIRequest(
		request,
		env,
		validateOdinRequest,
		async (data: { columns: string[]; numRows: number; sample: Record<string, unknown>[]; turnstileToken: string }, _ip: string, env: Env) => {
			if (!(await verifyTurnstile(data.turnstileToken, env.TURNSTILE_SECRET_KEY))) {
				throw new AuthenticationError('Security check failed.');
			}
			
			const aiResponse = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
				max_tokens: AI_MAX_TOKENS_STANDARD, temperature: 0.2, response_format: { type: 'json_object' },
				messages: [
					{ role: 'system', content: ODIN_SYSTEM_PROMPT },
					{ role: 'user', content: buildOdinUserPrompt(data.columns, data.numRows, data.sample) }
				]
			}) as { response: string | Record<string, unknown> };
			
			return typeof aiResponse.response === 'string' ? JSON.parse(aiResponse.response) : aiResponse.response;
		},
		'odin',
		5
	);
}
