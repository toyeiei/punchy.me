import { Env } from '../core/types';
import { MUSASHI_FORM_HTML } from '../ui';
import { checkRateLimit } from '../services/security';

export async function handleMusashiGet(): Promise<Response> {
    return new Response(MUSASHI_FORM_HTML, { headers: { 'Content-Type': 'text/html' } });
}

export async function handleMusashiForge(request: Request, env: Env): Promise<Response> {
	try {
		const { description, hp_field } = await request.json() as { description: string, hp_field?: string };
		if (hp_field) return new Response(JSON.stringify({ error: 'Bot detected.' }), { status: 403 });
		if (!description || description.length < 50) return new Response(JSON.stringify({ error: 'Intel too shallow.' }), { status: 400 });
		if (description.length > 1000) return new Response(JSON.stringify({ error: 'Intel too dense. Limit 1000 characters.' }), { status: 400 });
		
		const ip = request.headers.get('cf-connecting-ip') || 'anonymous';
		if (!(await checkRateLimit(env, `rl:ai:${ip}`, 5))) return new Response(JSON.stringify({ error: 'Tactical cooling in progress. Limit 5 per minute.' }), { status: 429 });

		const aiResponse = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
			max_tokens: 350, temperature: 0.2, response_format: { type: 'json_object' },
			messages: [
				{ role: 'system', content: 'You are MUSASHI, Elite Strategist. Output ONLY JSON. Be extremely brief.' },
				{ role: 'user', content: `Job: ${description}\n\nReturn JSON strictly matching this schema:\n{\n  "intel": "1-sentence summary",\n  "skills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"],\n  "projects": ["P1", "P2", "Project 3 description"],\n  "salary": "THB/USD range",\n  "questions": ["Q1", "Q2", "Q3"]\n}` }
			]
		}) as { response: string | Record<string, unknown> };
		const result = typeof aiResponse.response === 'string' ? JSON.parse(aiResponse.response) : aiResponse.response;
		return new Response(JSON.stringify(result), { headers: { 'Content-Type': 'application/json' } });
	} catch (_e) { return new Response(JSON.stringify({ error: 'AI Forge failed.' }), { status: 500 }); }
}
