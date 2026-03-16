import { Env, RagnarData } from '../core/types';
import { RAGNAR_HTML } from '../ui/ragnar';
import { generateUniqueId, jsonResponse, parseAIResponse } from '../core/utils';
import { validateRagnarRequest } from '../core/validation';

export async function handleRagnarGet() {
	return new Response(RAGNAR_HTML, {
		headers: { 'Content-Type': 'text/html' },
	});
}

export async function handleRagnarForge(request: Request, env: Env) {
	try {
		const body = await request.json();
		const validation = validateRagnarRequest(body);
		
		if (!validation.success) {
			return jsonResponse({ error: validation.error }, 400);
		}
		
		const { title, audience, details, hp_field } = validation.data!;
		if (hp_field) return jsonResponse({ error: 'Bot detected.' }, 403);

		// RAGNAR AI PROMPT
		const systemPrompt = `You are RAGNAR, the Legendary Viking King and Master Strategist. 
Your mission is to forge a high-impact, 10-page tactical slide presentation based on the user's mission details.
Each slide must be punchy, authoritative, and strategic.

OUTPUT FORMAT:
You MUST return ONLY a valid JSON object with the following structure:
{
  "title": "Presentation Title",
  "audience": "Target Audience",
  "slides": [
    { 
      "header": "Slide Header", 
      "content": "Slide Content",
      "type": "list | quote | bigtext | comparison" 
    },
    ... exactly 10 slides ...
  ]
}

SLIDE TYPES:
- list: A header and 3-4 bullet points (using •).
- quote: A powerful Viking-inspired strategic quote or statement.
- bigtext: A single massive, impactful sentence or statistic.
- comparison: A side-by-side comparison of 'Current State' vs 'Victory State' separated by a ' | ' character.

CONSTRAINTS:
- Use powerful, Viking-inspired professional language.
- Exactly 10 slides in the "slides" array.
- Mix slide types (at least one of each type).
- Content must be concise.
- No preamble or postamble. ONLY JSON.`;

		const userPrompt = `MISSION TITLE: ${title}
TARGET AUDIENCE: ${audience}
STRATEGIC DETAILS: ${details}`;

		const aiResponse = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
			messages: [
				{ role: 'system', content: systemPrompt },
				{ role: 'user', content: userPrompt }
			],
			max_tokens: 1500,
			temperature: 0.7
		}) as { response: string };

		const parsed = parseAIResponse(aiResponse.response);
		
		const result: RagnarData = {
			type: 'ragnar',
			title: parsed.title as string || title,
			audience: parsed.audience as string || audience,
			slides: parsed.slides as RagnarData['slides'] || []
		};

		if (!result.slides || result.slides.length === 0) {
			return jsonResponse({ error: 'The forge returned no slides. The gods are testing us.' }, 500);
		}

		const id = generateUniqueId();
		await env.SHORT_LINKS.put(id, JSON.stringify(result), {
			expirationTtl: 60 * 60 * 24 * 3 // 3 days
		});

		return jsonResponse({ id });

	} catch (err: unknown) {
		console.error('Ragnar forge error:', err);
		const message = err instanceof Error ? err.message : 'Unknown error';
		return jsonResponse({ error: message }, 500);
	}
}
