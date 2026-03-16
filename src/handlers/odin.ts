import { Env } from '../core/types';
import { ODIN_HTML } from '../ui';
import { checkRateLimit, verifyTurnstile } from '../services/security';

export async function handleOdinGet(): Promise<Response> {
    return new Response(ODIN_HTML, { headers: { 'Content-Type': 'text/html' } });
}

export async function handleOdinAnalyze(request: Request, env: Env): Promise<Response> {
	try {
		const { columns, numRows, sample, turnstileToken } = await request.json() as { columns: string[], numRows: number, sample: Record<string, unknown>[], turnstileToken?: string };
		if (!turnstileToken) return new Response(JSON.stringify({ error: 'Security handshake required.' }), { status: 403 });
		if (!(await verifyTurnstile(turnstileToken))) return new Response(JSON.stringify({ error: 'Security check failed.' }), { status: 403 });
		
		const ip = request.headers.get('cf-connecting-ip') || 'anonymous';
		if (!(await checkRateLimit(env, `rl:odin:${ip}`, 5))) return new Response(JSON.stringify({ error: 'Tactical cooling in progress. Limit 5 per minute.' }), { status: 429 });

		const aiResponse = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
			max_tokens: 350, temperature: 0.2, response_format: { type: 'json_object' },
			messages: [
				{ role: 'system', content: 'You are ODIN, Elite Data Strategist. Output ONLY JSON. Be concise. Schema: {"strategic_overview":"string","anomalies_detected":"string","tactical_recommendations":"string"}' },
				{ role: 'user', content: `Dataset: ${columns.join(', ')}\nRows: ${numRows}\nSample: ${JSON.stringify(sample)}` }
			]
		}) as { response: string | Record<string, unknown> };
		const result = typeof aiResponse.response === 'string' ? JSON.parse(aiResponse.response) : aiResponse.response;
		return new Response(JSON.stringify(result), { headers: { 'Content-Type': 'application/json' } });
	} catch (_e) { return new Response(JSON.stringify({ error: 'AI Forge failed.' }), { status: 500 }); }
}
