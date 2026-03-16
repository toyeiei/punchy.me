import { Env, AnakinData } from '../core/types';
import { ANAKIN_FORM_HTML } from '../ui';

export async function handleAnakinGet(): Promise<Response> {
    return new Response(ANAKIN_FORM_HTML, { headers: { 'Content-Type': 'text/html' } });
}

export async function handleAnakinPost(request: Request, env: Env): Promise<Response> {
	try {
		const data = await request.json() as AnakinData & { suggestedId?: string, hp_field?: string };
		if (data.hp_field) return new Response(JSON.stringify({ error: 'Bot detected.' }), { status: 403 });
		if (!data.name || !data.experience || !data.skills) return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });      
		if (data.experience.length > 500) return new Response(JSON.stringify({ error: 'Experience too dense. Limit 500 characters.' }), { status: 400 });
		const id = data.suggestedId || Math.random().toString(36).substring(2, 8);
		await env.SHORT_LINKS.put(id, JSON.stringify({ ...data, type: 'anakin', aiHydrated: false }), { expirationTtl: 259200 });
		return new Response(JSON.stringify({ id }), { headers: { 'Content-Type': 'application/json' } });
	} catch (_e) { return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 }); }
}

export async function handleAnakinHydrate(request: Request, env: Env, path: string): Promise<Response> {
	if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
	const id = path.split('/').pop();
	if (!id) return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });
	const value = await env.SHORT_LINKS.get(id);
	if (!value) return new Response(JSON.stringify({ error: 'Not Found' }), { status: 404 });
	try {
		if (!value.startsWith('{')) return new Response(JSON.stringify({ error: 'Invalid Type' }), { status: 400 });
		const data = JSON.parse(value);
		if (data.type !== 'anakin') return new Response(JSON.stringify({ error: 'Invalid Type' }), { status: 400 });
		if (data.aiHydrated) return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
		const aiResponse = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
			max_tokens: 350, temperature: 0.4, response_format: { type: 'json_object' },
			messages: [
				{ role: 'system', content: 'You are ANAKIN, Resume Architect. You craft elite, action-oriented professional narratives. DO NOT hallucinate. You MUST USE ONLY the provided CONTEXT. Do not invent new skills or experiences. Output ONLY JSON.' },
				{ role: 'user', content: `CONTEXT:\nTarget Role: ${data.job}\nCandidate Experience: ${data.experience}\nCandidate Skills: ${data.skills}\n\nAnalyze this CONTEXT and forge the resume to maximize interview chances for the Target Role.\n\nReturn JSON strictly matching this schema:\n{\n  "summary": "High-impact Professional Summary (20-28 words)",\n  "experience": ["Experience bullet 1 (15-20 words)", "Experience bullet 2", "Experience bullet 3"]\n}` }
			]
		}) as { response: string | Record<string, unknown> };
		
		let result: Record<string, unknown> = {};
		if (typeof aiResponse.response === 'string') {
			try {
				const jsonMatch = aiResponse.response.match(/\{[\s\S]*\}/);
				if (jsonMatch) {
					result = JSON.parse(jsonMatch[0]);
				} else {
					result = JSON.parse(aiResponse.response);
				}
			} catch (_e) {
				console.error("ANAKIN: Final JSON Parse Failure on:", aiResponse.response);
			}
		} else {
			result = aiResponse.response || {};
		}

		console.log('\n--- ANAKIN AI RAW OUTPUT ---');
		console.log(typeof aiResponse.response === 'string' ? aiResponse.response : JSON.stringify(result, null, 2));
		console.log('----------------------------\n');

		data.aiSummary = result.summary ? String(result.summary).trim() : "Elite profile forged.";
		
		let expText = data.experience;
		if (Array.isArray(result.experience)) {
			expText = result.experience.map(b => '• ' + String(b).trim().replace(/^[-•]\s*/, '')).join('\n');
		} else if (typeof result.experience === 'string') {
			expText = String(result.experience).trim().replace(/^[-•]\s*/gm, '• ');
		}
		data.aiExperience = expText;
		
		data.aiHydrated = true;
		await env.SHORT_LINKS.put(id, JSON.stringify(data), { expirationTtl: 259200 });
		return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
	} catch (_e) { return new Response(JSON.stringify({ error: 'Hydration failed' }), { status: 500 }); }
}
