import { Env } from '../core/types';
import { MARCUS_HTML } from '../ui/marcus';
import { validateMarcusRequest } from '../core/validation';
import { handleValidatedRequest } from '../core/middleware';
import { jsonResponse, htmlPage } from '../core/utils';
import { checkRateLimit } from '../services/security';
import { AI_MAX_TOKENS_STANDARD } from '../core/constants';
import { parseAIResponse } from '../core/utils';
import { CSP_POLICY_MARCUS } from '../core/security-headers';

export async function handleMarcusGet(): Promise<Response> {
	const response = htmlPage(MARCUS_HTML);
	const headers = new Headers(response.headers);
	headers.set('Content-Security-Policy', CSP_POLICY_MARCUS);
	// PostMessage channel doesn't need COEP/COOP headers
	
	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers
	});
}

const EXPLANATION_PROMPTS: Record<string, string> = {
	summary: `You are a friendly statistics teacher. Explain summary statistics in simple terms.
Given R output from a summary analysis, explain what the numbers mean for someone without stats background.
Focus on: what's typical (mean/median), what's the range, and if there are any surprises.
Keep it under 150 words. Be conversational and encouraging.`,
	
	compare: `You are a friendly statistics teacher. Explain group comparison results.
Given R output comparing two groups, explain: Are they different? How much? Is it meaningful?
Avoid jargon. Use "likely different" or "probably similar" instead of statistical terms.
Keep it under 150 words. Be practical and actionable.`,
	
	trend: `You are a friendly statistics teacher. Explain trend analysis results.
Given R output about trends, explain: Is it going up or down? How strong is the pattern?
Use plain language. Say "clear upward trend" or "no strong pattern" instead of technical terms.
Keep it under 150 words. Be clear about what the data shows.`,
	
	correlation: `You are a friendly statistics teacher. Explain correlation results.
Given R output about relationships, explain: Do these things relate? How strongly?
Use analogies when helpful. Avoid "correlation coefficient" - say "relationship strength" instead.
Keep it under 150 words. Be honest about limitations.`,
	
	distribution: `You are a friendly statistics teacher. Explain distribution results.
Given R output about how data spreads out, explain: Is it balanced? Clustered somewhere? Any outliers?
Use visual language like "bell-shaped" or "leaning right." Be intuitive.
Keep it under 150 words. Help them visualize the data.`
};

export async function handleMarcusExplain(request: Request, env: Env): Promise<Response> {
	return handleValidatedRequest(
		request,
		env,
		validateMarcusRequest,
		async (data, ip, env) => {
			// Rate limit
			const allowed = await checkRateLimit(env, `rl:marcus:${ip}`, 10, 60);
			if (!allowed) {
				return jsonResponse({ error: 'Too many analyses. Wait a moment.' }, 429);
			}

			const systemPrompt = EXPLANATION_PROMPTS[data.template] || EXPLANATION_PROMPTS.summary;

			// Generate AI explanation
			const aiResponse = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
				max_tokens: AI_MAX_TOKENS_STANDARD,
				temperature: 0.4,
				messages: [
					{ role: 'system', content: systemPrompt },
					{ role: 'user', content: `R Output:\n${data.output}\n\nData sample: ${data.data || 'not provided'}` }
				]
			}) as { response: string };

			let explanation: string;
			try {
				const parsed = parseAIResponse(aiResponse.response);
				explanation = typeof parsed === 'object' && parsed.explanation 
					? String(parsed.explanation)
					: aiResponse.response.substring(0, 300);
			} catch {
				explanation = aiResponse.response.substring(0, 300);
			}

			return { explanation };
		},
		{ rateLimit: { key: 'marcus-explain', limit: 15, ttl: 60 } }
	);
}
