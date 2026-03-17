import { Env, RagnarData, RagnarSlide } from '../core/types';
import { RAGNAR_HTML } from '../ui/ragnar';
import { generateUniqueId, parseAIResponse, htmlPage } from '../core/utils';
import { validateRagnarRequest } from '../core/validation';
import { TTL_3_DAYS, AI_MAX_TOKENS_RAGNAR } from '../core/constants';
import { handleValidatedRequest } from '../core/middleware';
import { RAGNAR_SYSTEM_PROMPT, buildRagnarUserPrompt } from '../prompts/ragnar';
import { AIError } from '../core/errors';

const VALID_SLIDE_TYPES = new Set<RagnarSlide['type']>(['list', 'quote', 'bigtext', 'comparison', 'opening', 'points', 'challenge', 'solution', 'action', 'closing']);

export async function handleRagnarGet() {
	return htmlPage(RAGNAR_HTML);
}

export async function handleRagnarForge(request: Request, env: Env) {
	return handleValidatedRequest(
		request,
		env,
		validateRagnarRequest,
		async (data: { title: string; audience: string; details: string }, _ip: string, env: Env) => {
			let aiResponse: { response: string };
			try {
				aiResponse = await env.AI.run('@cf/mistralai/mistral-small-3.1-24b-instruct', {
					messages: [
						{ role: 'system', content: RAGNAR_SYSTEM_PROMPT },
						{ role: 'user', content: buildRagnarUserPrompt(data.title, data.audience, data.details) }
					],
					max_tokens: AI_MAX_TOKENS_RAGNAR,
					temperature: 0.3
				}) as { response: string };
			} catch (_e) {
				throw new AIError('AI service unavailable');
			}

			const parsed = parseAIResponse(aiResponse.response);

			if (!Array.isArray(parsed.slides) || parsed.slides.length === 0) {
				throw new AIError('The forge returned no slides. The gods are testing us.');
			}

			const result: RagnarData = {
				type: 'ragnar',
				title: typeof parsed.title === 'string' ? parsed.title : data.title,
				audience: typeof parsed.audience === 'string' ? parsed.audience : data.audience,
				slides: (parsed.slides as Record<string, unknown>[]).map(s => ({
					header: typeof s.header === 'string' ? s.header : '',
					content: typeof s.content === 'string' ? s.content : '',
					type: (typeof s.type === 'string' && VALID_SLIDE_TYPES.has(s.type as RagnarSlide['type'])) ? s.type as RagnarSlide['type'] : 'list',
				})),
			};

			const id = generateUniqueId();
			await env.SHORT_LINKS.put(id, JSON.stringify(result), { expirationTtl: TTL_3_DAYS });

			return { id };
		}
	);
}
