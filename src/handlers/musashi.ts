import { Env } from '../core/types';
import { MUSASHI_FORM_HTML } from '../ui';
import { checkRateLimit } from '../services/security';
import { validateMusashiRequest } from '../core/validation';
import { jsonResponse, parseAIResponse, htmlPage } from '../core/utils';
import { AI_MAX_TOKENS_STANDARD } from '../core/constants';

export async function handleMusashiGet(): Promise<Response> {
    return htmlPage(MUSASHI_FORM_HTML);
}

export async function handleMusashiForge(request: Request, env: Env): Promise<Response> {
	try {
		const body = await request.json();
		const validation = validateMusashiRequest(body);
		
		if (!validation.success) {
			return jsonResponse({ error: validation.error }, 400);
		}
		
		const { description, hp_field } = validation.data!;
		if (hp_field) return jsonResponse({ error: 'Bot detected.' }, 403);
		
		const ip = request.headers.get('cf-connecting-ip') || 'anonymous';
		if (!(await checkRateLimit(env, `rl:ai:${ip}`, 5))) return jsonResponse({ error: 'Tactical cooling in progress. Limit 5 per minute.' }, 429);

		const aiResponse = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
			max_tokens: AI_MAX_TOKENS_STANDARD, temperature: 0.2, response_format: { type: 'json_object' },
			messages: [
				{ role: 'system', content: 'You are MUSASHI, Elite Strategist. Output ONLY JSON. Be extremely brief.' },
				{ role: 'user', content: `Job: ${description}\n\nReturn JSON strictly matching this schema:\n{\n  "intel": "1-sentence summary",\n  "skills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"],\n  "projects": ["P1", "P2", "Project 3 description"],\n  "salary": "THB/USD range",\n  "questions": ["Q1", "Q2", "Q3"]\n}` }
			]
		}) as { response: string | Record<string, unknown> };
		
		const result = parseAIResponse(aiResponse.response);
		return jsonResponse(result);
	} catch (e) {
		console.error('Musashi forge error:', e);
		return jsonResponse({ error: 'AI Forge failed.' }, 500);
	}
}
