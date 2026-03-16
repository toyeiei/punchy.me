import { Env } from '../core/types';
import { ODIN_HTML } from '../ui';
import { checkRateLimit, verifyTurnstile } from '../services/security';
import { validateOdinRequest } from '../core/validation';
import { jsonResponse } from '../core/utils';

export async function handleOdinGet(): Promise<Response> {
    return new Response(ODIN_HTML, { headers: { 'Content-Type': 'text/html' } });
}

export async function handleOdinAnalyze(request: Request, env: Env): Promise<Response> {
	try {
		const body = await request.json();
		const validation = validateOdinRequest(body);
		
		if (!validation.success) {
			return jsonResponse({ error: validation.error }, 400);
		}
		
		const { columns, numRows, sample, turnstileToken } = validation.data!;
		if (!(await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET_KEY))) return jsonResponse({ error: 'Security check failed.' }, 403);
		
		const ip = request.headers.get('cf-connecting-ip') || 'anonymous';
		if (!(await checkRateLimit(env, `rl:odin:${ip}`, 5))) return jsonResponse({ error: 'Tactical cooling in progress. Limit 5 per minute.' }, 429);

		const aiResponse = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
			max_tokens: 350, temperature: 0.2, response_format: { type: 'json_object' },
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
