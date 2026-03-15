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
			max_tokens: 250, temperature: 0.6,
			messages: [
				{ role: 'system', content: 'You are ANAKIN, Resume Architect. Use [SUMMARY] and [EXPERIENCE] tags.' },
				{ role: 'user', content: `Job: ${data.job}\nExp: ${data.experience}\nSkills: ${data.skills}` }
			]
		}) as { response: string };
		const text = aiResponse.response || '';
		const sM = text.match(/\[SUMMARY\](.*?)\[\/SUMMARY\]/si);
		const eM = text.match(/\[EXPERIENCE\](.*?)\[\/EXPERIENCE\]/si);
		data.aiSummary = sM ? sM[1].trim() : "Elite profile forged.";
		data.aiExperience = eM ? eM[1].trim() : data.experience;
		data.aiHydrated = true;
		await env.SHORT_LINKS.put(id, JSON.stringify(data), { expirationTtl: 259200 });
		return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
	} catch (_e) { return new Response(JSON.stringify({ error: 'Hydration failed' }), { status: 500 }); }
}
