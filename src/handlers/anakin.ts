import { Env } from '../core/types';
import { ANAKIN_FORM_HTML } from '../ui';
import { generateUniqueId, jsonResponse, parseAIResponse, htmlPage } from '../core/utils';
import { validateAnakinRequest, isReservedId } from '../core/validation';
import { TTL_3_DAYS, AI_MAX_TOKENS_STANDARD } from '../core/constants';

export async function handleAnakinGet(): Promise<Response> {
    return htmlPage(ANAKIN_FORM_HTML);
}

export async function handleAnakinPost(request: Request, env: Env): Promise<Response> {
	try {
		const body = await request.json();
		const validation = validateAnakinRequest(body);
		
		if (!validation.success) {
			return jsonResponse({ error: validation.error }, 400);
		}

		const { hp_field, suggestedId, ...data } = validation.data!;
		if (hp_field) return jsonResponse({ error: 'Bot detected.' }, 403);
		
		const id = (suggestedId && !isReservedId(suggestedId)) ? suggestedId : generateUniqueId();
		await env.SHORT_LINKS.put(id, JSON.stringify({ ...data, type: 'anakin', aiHydrated: false }), { expirationTtl: TTL_3_DAYS });
		return jsonResponse({ id });
	} catch (e) {
		console.error('Anakin POST error:', e);
		return jsonResponse({ error: 'Invalid request' }, 400);
	}
}

export async function handleAnakinHydrate(request: Request, env: Env, path: string): Promise<Response> {
	if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
	const id = path.split('/').pop();
	if (!id) return jsonResponse({ error: 'Invalid ID' }, 400);
	const value = await env.SHORT_LINKS.get(id);
	if (!value) return jsonResponse({ error: 'Not Found' }, 404);
	try {
		if (!value.startsWith('{')) return jsonResponse({ error: 'Invalid Type' }, 400);
		const data = JSON.parse(value);
		if (data.type !== 'anakin') return jsonResponse({ error: 'Invalid Type' }, 400);
		if (data.aiHydrated) return jsonResponse(data);
		const aiResponse = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
			max_tokens: AI_MAX_TOKENS_STANDARD, temperature: 0.4, response_format: { type: 'json_object' },
			messages: [
				{ role: 'system', content: 'You are ANAKIN, Resume Architect. You craft elite, action-oriented professional narratives. DO NOT hallucinate. You MUST USE ONLY the provided CONTEXT. Do not invent new skills or experiences. Output ONLY JSON.' },
				{ role: 'user', content: `CONTEXT:\nTarget Role: ${data.job}\nCandidate Experience: ${data.experience}\nCandidate Skills: ${data.skills}\n\nAnalyze this CONTEXT and forge the resume to maximize interview chances for the Target Role.\n\nReturn JSON strictly matching this schema:\n{\n  "summary": "High-impact Professional Summary (20-28 words)",\n  "experience": ["Experience bullet 1 (15-20 words)", "Experience bullet 2", "Experience bullet 3"]\n}` }
			]
		}) as { response: string | Record<string, unknown> };
		
		const result = parseAIResponse(aiResponse.response);

		data.aiSummary = result.summary ? String(result.summary).trim() : "Elite profile forged.";
		
		let expText = data.experience;
		if (Array.isArray(result.experience)) {
			expText = result.experience.map(b => '• ' + String(b).trim().replace(/^[-•]\s*/, '')).join('\n');
		} else if (typeof result.experience === 'string') {
			expText = String(result.experience).trim().replace(/^[-•]\s*/gm, '• ');
		}
		data.aiExperience = expText;
		
		data.aiHydrated = true;
		await env.SHORT_LINKS.put(id, JSON.stringify(data), { expirationTtl: TTL_3_DAYS });
		return jsonResponse(data);
	} catch (e) {
		console.error('Anakin hydration error:', e);
		return jsonResponse({ error: 'Hydration failed' }, 500);
	}
}
