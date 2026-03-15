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
			max_tokens: 350, temperature: 0.4,
			messages: [
				{ role: 'system', content: 'You are ANAKIN, Resume Architect. You craft elite, action-oriented professional narratives. DO NOT hallucinate. You MUST USE ONLY the provided [CONTEXT]. Do not invent new skills or experiences.\n\n[DIRECTIVE]\n1. Write a high-impact Professional Summary (20-28 words) that clearly positions the candidate for their target role.\n2. Write exactly 3 Experience Bullets (15-20 words per bullet). Use strong action verbs and highlight achievements from the [CONTEXT] that match the target role.\n\n[OUTPUT FORMAT]\n[SUMMARY]\n...\n[/SUMMARY]\n[EXPERIENCE]\n- ...\n- ...\n- ...\n[/EXPERIENCE]' },
				{ role: 'user', content: `[CONTEXT]\nTarget Role: ${data.job}\nCandidate Experience: ${data.experience}\nCandidate Skills: ${data.skills}\n\nAnalyze this [CONTEXT] and forge the resume to maximize interview chances for the Target Role.` }
			]
		}) as { response: string };
		const text = aiResponse.response || '';
		console.log('\\n--- ANAKIN AI RAW OUTPUT ---');
		console.log(text);
		console.log('----------------------------\\n');
		const sM = text.match(/\[SUMMARY\]([\s\S]*?)\[\/SUMMARY\]/i);
		const eM = text.match(/\[EXPERIENCE\]([\s\S]*?)\[\/EXPERIENCE\]/i);
		data.aiSummary = sM ? sM[1].trim() : "Elite profile forged.";
		data.aiExperience = eM ? eM[1].trim().replace(/^- /gm, '• ') : data.experience;
		data.aiHydrated = true;
		await env.SHORT_LINKS.put(id, JSON.stringify(data), { expirationTtl: 259200 });
		return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
	} catch (_e) { return new Response(JSON.stringify({ error: 'Hydration failed' }), { status: 500 }); }
}
