import { Env } from '../core/types';
import { ODIN_HTML } from '../ui';
import { checkRateLimit, verifyTurnstile } from '../services/security';
import { validateOdinRequest } from '../core/validation';
import { jsonResponse, htmlPage } from '../core/utils';
import { AI_MAX_TOKENS_STANDARD } from '../core/constants';

export async function handleOdinGet(): Promise<Response> {
    return htmlPage(ODIN_HTML);
}

export async function handleOdinAnalyze(request: Request, env: Env): Promise<Response> {
	try {
		const body = await request.json();
		const validation = validateOdinRequest(body);
		
		if (!validation.success) {
			// Return 403 for missing Turnstile, 400 for other validation errors
			const status = validation.error === 'Security handshake required.' ? 403 : 400;
			return jsonResponse({ error: validation.error }, status);
		}
		
		const { columns, numRows, sample, turnstileToken } = validation.data!;
		if (!(await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET_KEY))) return jsonResponse({ error: 'Security check failed.' }, 403);
		
		const ip = request.headers.get('cf-connecting-ip') || 'anonymous';
		if (!(await checkRateLimit(env, `rl:odin:${ip}`, 5))) return jsonResponse({ error: 'Tactical cooling in progress. Limit 5 per minute.' }, 429);

		const aiResponse = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
			max_tokens: AI_MAX_TOKENS_STANDARD, temperature: 0.2, response_format: { type: 'json_object' },
			messages: [
				{ role: 'system', content: 'You are ODIN, Elite Data Strategist. Output ONLY JSON. Be concise. Schema: {"strategic_overview":"string","anomalies_detected":"string","tactical_recommendations":"string"}' },
				{ role: 'user', content: `Dataset: ${columns.join(', ')}\nRows: ${numRows}\nSample: ${JSON.stringify(sample)}` }
			]
		}) as { response: string | Record<string, unknown> };
		const result = typeof aiResponse.response === 'string' ? JSON.parse(aiResponse.response) : aiResponse.response;
		return jsonResponse(result);
	} catch (e) {
		console.error('Odin analyze error:', e);
		return jsonResponse({ error: 'AI Forge failed.' }, 500);
	}
}
