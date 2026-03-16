import { Env, RagnarData } from '../core/types';
import { RAGNAR_HTML } from '../ui/ragnar';
import { generateUniqueId } from '../core/utils';

export async function handleRagnarGet() {
	return new Response(RAGNAR_HTML, {
		headers: { 'Content-Type': 'text/html' },
	});
}

export async function handleRagnarForge(request: Request, env: Env) {
	try {
		const { title, audience, details } = await request.json() as { title: string, audience: string, details: string };

		if (!title || !details) {
			return new Response(JSON.stringify({ error: 'Title and Details are required to summon Ragnar.' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}

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

		let result: RagnarData;
		try {
			// Clean up AI response if it contains markdown markers
			const cleanText = aiResponse.response.replace(/```json/g, '').replace(/```/g, '').trim();
			const parsed = JSON.parse(cleanText);
			
			result = {
				type: 'ragnar',
				title: parsed.title || title,
				audience: parsed.audience || audience,
				slides: parsed.slides || []
			};
		} catch (e) {
			console.error('AI JSON PARSE ERROR:', e);
			return new Response(JSON.stringify({ error: 'Ragnar failed to forge the JSON structure. Try again, warrior.' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		if (!result.slides || result.slides.length === 0) {
			return new Response(JSON.stringify({ error: 'The forge returned no slides. The gods are testing us.' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		const id = generateUniqueId();
		await env.SHORT_LINKS.put(id, JSON.stringify(result), {
			expirationTtl: 60 * 60 * 24 * 3 // 3 days
		});

		return new Response(JSON.stringify({ id }), {
			headers: { 'Content-Type': 'application/json' },
		});

	} catch (err: any) {
		return new Response(JSON.stringify({ error: err.message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
}
