import { Env } from '../core/types';
import { ODIN_HTML } from '../ui';
import { verifyTurnstile } from '../services/security';
import { validateOdinRequest } from '../core/validation';
import { htmlPage, parseAIResponse } from '../core/utils';
import { AI_MAX_TOKENS_STANDARD } from '../core/constants';
import { handleAIRequest } from '../core/middleware';
import { AIError, AuthenticationError } from '../core/errors';
import { ODIN_SYSTEM_PROMPT, buildOdinUserPrompt } from '../prompts/odin';
import { CSP_POLICY_ODIN } from '../core/security-headers';

export async function handleOdinGet(): Promise<Response> {
	const response = htmlPage(ODIN_HTML);
	const headers = new Headers(response.headers);
	headers.set('Content-Security-Policy', CSP_POLICY_ODIN);
	return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
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
			
			let aiResponse: { response: string | Record<string, unknown> };
			try {
				aiResponse = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
					max_tokens: AI_MAX_TOKENS_STANDARD, temperature: 0.2, response_format: { type: 'json_object' },
					messages: [
						{ role: 'system', content: ODIN_SYSTEM_PROMPT },
						{ role: 'user', content: buildOdinUserPrompt(data.columns, data.numRows, data.sample) }
					]
				}) as { response: string | Record<string, unknown> };
			} catch (_e) {
				throw new AIError('AI service unavailable');
			}
			return parseAIResponse(aiResponse.response);
		},
		'odin',
		5
	);
}
