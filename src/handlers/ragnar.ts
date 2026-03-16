import { Env, RagnarData, RagnarSlide } from '../core/types';
import { RAGNAR_HTML } from '../ui/ragnar';
import { generateUniqueId, jsonResponse, parseAIResponse, htmlPage } from '../core/utils';
import { validateRagnarRequest } from '../core/validation';
import { TTL_3_DAYS, AI_MAX_TOKENS_RAGNAR } from '../core/constants';

const VALID_SLIDE_TYPES = new Set<RagnarSlide['type']>(['list', 'quote', 'bigtext', 'comparison', 'opening', 'points', 'challenge', 'solution', 'action', 'closing']);

export async function handleRagnarGet() {
	return htmlPage(RAGNAR_HTML);
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

		// RAGNAR PROMPT - Semantic Dynamic Types
		const systemPrompt = `You are RAGNAR, an elite strategic presentation architect. Your mission is to forge a high-impact, 6-slide tactical deck.

SLIDE TYPES (Use exactly these keys for the "type" field):
1. "bigtext" - A massive, high-impact hero statement. (10-15 words). Use for Opening or Vision.
2. "quote" - A cinematic, frosted blockquote for philosophy or deep insight. (15-25 words).
3. "list" - Exactly 3-4 tactical bullet points. Header required. Content: Bullets separated by \\n. (12-20 words each).
4. "comparison" - A "BEFORE | AFTER" transformation grid. Separated by | in the content. (10-15 words per side).

DECK ARCHITECTURE (6 Slides):
- Slide 1: Opening Impact (bigtext)
- Slide 2: The Core Problem (list or quote)
- Slide 3: The Pivot/Vision (bigtext)
- Slide 4: Strategic Solution (comparison)
- Slide 5: Execution Roadmap (list)
- Slide 6: Final Strike (quote or bigtext)

EXAMPLE OUTPUT (Strict JSON only):
{
  "title": "Quantum Leap Strategy",
  "audience": "Executive Leadership",
  "slides": [
    { "type": "bigtext", "header": "FORGING THE FUTURE", "content": "TRANSFORMING LEGACY INFRASTRUCTURE INTO A HIGH-PERFORMANCE NEURAL ASSET" },
    { "type": "list", "header": "THE COMPETITIVE GAP", "content": "Fragmented data silos causing 40% efficiency loss\\nManual processing cycles slowing market reaction time\\nTechnological debt blocking modern scale" },
    { "type": "bigtext", "header": "THE VISION", "content": "A UNIFIED DATA FABRIC DRIVING INSTANT DECISION INTELLIGENCE" },
    { "type": "comparison", "header": "OPERATIONAL SHIFT", "content": "Manual analysis taking 3 weeks | Automated AI insights in 3 seconds" },
    { "type": "list", "header": "PHASED DEPLOYMENT", "content": "Month 1: Infrastructure Audit and Data Cleansing\\nMonth 2: Core AI Engine Integration and Training\\nMonth 3: Enterprise-Wide Rollout and Optimization" },
    { "type": "quote", "header": "MIYAMOTO MUSASHI", "content": "Fix your eye on a small target, and your world will expand to meet your focus." }
  ]
}

CRITICAL: Each slide MUST contain at least 50-80 words of high-value strategic content. Output ONLY valid JSON. NO markdown code blocks. NO preamble. NO commentary. START WITH { AND END WITH }.`;

		const userPrompt = `Forge an elite, detailed 6-slide strategic deck for:
Title: ${title}
Audience: ${audience}
Mission Intel: ${details}

Ensure the narrative arc is aggressive, professional, and provides deep strategic value. Each slide should be substantial and impressive.`;

		// Using Mistral Small 3.1 24B - Superior Reasoning & Instruction Following
		const aiResponse = await env.AI.run('@cf/mistralai/mistral-small-3.1-24b-instruct', {
			messages: [
				{ role: 'system', content: systemPrompt },
				{ role: 'user', content: userPrompt }
			],
			max_tokens: AI_MAX_TOKENS_RAGNAR,
			temperature: 0.6
		}) as { response: string };

		let parsed: Record<string, unknown>;
		try {
			parsed = parseAIResponse(aiResponse.response);
		} catch (parseError) {
			console.error('Ragnar parse failure:', parseError);
			return jsonResponse({ error: 'Failed to parse AI response. The forge is confused.' }, 500);
		}

		if (!Array.isArray(parsed.slides) || parsed.slides.length === 0) {
			return jsonResponse({ error: 'The forge returned no slides. The gods are testing us.' }, 500);
		}

		const result: RagnarData = {
			type: 'ragnar',
			title: typeof parsed.title === 'string' ? parsed.title : title,
			audience: typeof parsed.audience === 'string' ? parsed.audience : audience,
			slides: (parsed.slides as Record<string, unknown>[]).map(s => ({
				header: typeof s.header === 'string' ? s.header : '',
				content: typeof s.content === 'string' ? s.content : '',
				type: (typeof s.type === 'string' && VALID_SLIDE_TYPES.has(s.type as RagnarSlide['type'])) ? s.type as RagnarSlide['type'] : 'list',
			})),
		};

		const id = generateUniqueId();
		await env.SHORT_LINKS.put(id, JSON.stringify(result), { expirationTtl: TTL_3_DAYS });

		return jsonResponse({ id });

	} catch (err: unknown) {
		console.error('Ragnar forge error:', err);
		const message = err instanceof Error ? err.message : 'Unknown error';
		return jsonResponse({ error: message }, 500);
	}
}
