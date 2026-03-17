import { Env, AresResult } from '../core/types';
import { ARES_HTML } from '../ui/ares';
import { validateAresRequest } from '../core/validation';
import { handleValidatedRequest } from '../core/middleware';
import { jsonResponse, htmlPage, generateUniqueId, parseAIResponse } from '../core/utils';
import { checkRateLimit } from '../services/security';
import { AIError } from '../core/errors';
import { AI_MAX_TOKENS_STANDARD } from '../core/constants';
import { KEYWORD_EXTRACTION_PROMPT, PAS_COPY_PROMPT } from '../prompts/ares';

type UnsplashSearchResult = {
	results: Array<{
		id: string;
		urls: { raw?: string; regular: string; small: string };
		color: string;
		alt_description: string;
	}>;
};

type UnsplashImageResult = {
	id: string;
	urls: { raw?: string; regular: string; small: string };
	color: string;
	alt_description: string;
};

function isUnsplashSearchResult(data: unknown): data is UnsplashSearchResult {
	if (typeof data !== 'object' || data === null) return false;
	const obj = data as Record<string, unknown>;
	return Array.isArray(obj.results);
}

export async function handleAresGet(): Promise<Response> {
	return htmlPage(ARES_HTML);
}

export async function handleAresForge(request: Request, env: Env): Promise<Response> {
	return handleValidatedRequest(
		request,
		env,
		validateAresRequest,
		async (data, ip, env) => {
			// Rate limit
			const allowed = await checkRateLimit(env, `rl:ares:${ip}`, 3, 60);
			if (!allowed) {
				return jsonResponse({ error: 'Too many requests. Wait a minute before generating more.' }, 429);
			}

			// Step 1: Extract keywords using Mistral AI
			const keywordResponse = await env.AI.run('@cf/mistral/mistral-7b-instruct-v0.1', {
				max_tokens: 100,
				temperature: 0.3,
				messages: [
					{ role: 'system', content: KEYWORD_EXTRACTION_PROMPT },
					{ role: 'user', content: `Product: ${data.product}\nTarget Customer: ${data.customer}` }
				]
			}) as { response: string };

			let keywords: string[];
			try {
				const parsed = parseAIResponse(keywordResponse.response);
				keywords = Array.isArray(parsed.keywords) ? parsed.keywords.slice(0, 2) : ['marketing', 'business'];
			} catch {
				keywords = ['marketing', 'business'];
			}

			// Step 2: Search Unsplash for 3 images using first keyword
			const searchKeyword = keywords[0] || 'marketing';
			const unsplashRes = await fetch(
				`https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchKeyword)}&per_page=3&orientation=landscape`,
				{
					headers: { 'Authorization': `Client-ID ${env.UNSPLASH_ACCESS_KEY}` }
				}
			);

			if (!unsplashRes.ok) {
				throw new AIError('Failed to search images');
			}

			const rawData: unknown = await unsplashRes.json();
			if (!isUnsplashSearchResult(rawData) || rawData.results.length === 0) {
				throw new AIError('No images found for keywords');
			}

			const images: UnsplashImageResult[] = rawData.results.slice(0, 3);

			// Step 3: Generate PAS copy for each image using Mistral AI
			const panels: AresResult['panels'] = [];

			for (const img of images) {
				const copyPrompt = PAS_COPY_PROMPT
					.replace('{{PRODUCT}}', data.product)
					.replace('{{CUSTOMER}}', data.customer)
					.replace('{{IMAGE_CONTEXT}}', img.alt_description || 'Professional marketing imagery');

				let copy: { problem: string; agitate: string; solution: string };
				try {
					const copyResponse = await env.AI.run('@cf/mistral/mistral-7b-instruct-v0.1', {
						max_tokens: AI_MAX_TOKENS_STANDARD,
						temperature: 0.7,
						response_format: { type: 'json_object' },
						messages: [
							{ role: 'system', content: copyPrompt },
							{ role: 'user', content: 'Generate PAS copy now.' }
						]
					}) as { response: string | Record<string, unknown> };

					const parsedCopy = parseAIResponse(copyResponse.response);
					copy = {
						problem: String(parsedCopy.problem || 'Struggling to stay on track?'),
						agitate: String(parsedCopy.agitate || 'Every missed opportunity costs you growth.'),
						solution: String(parsedCopy.solution || 'This solution changes everything.')
					};
				} catch {
					copy = {
						problem: 'Struggling to stay on track?',
						agitate: 'Every missed opportunity costs you growth.',
						solution: 'This solution changes everything.'
					};
				}

				// Build color palette: use Unsplash color + 4 derived colors
				const baseColor = img.color || '#22c55e';
				const colors = generateColorPalette(baseColor);

				const baseUrl = img.urls.raw || img.urls.regular;
				panels.push({
					imageUrl: `${baseUrl}?w=1200&fit=max&fm=webp&q=80`,
					thumbUrl: `${baseUrl}?w=600&fit=max&fm=webp&q=60`,
					imageColor: baseColor,
					copy,
					colors
				});
			}

			// Step 4: Store result (optional - could be stateless)
			const id = generateUniqueId(6);
			const result: AresResult = {
				type: 'ares',
				product: data.product,
				customer: data.customer,
				keywords,
				panels,
				createdAt: Date.now()
			};

			// Store for 3 days
			await env.SHORT_LINKS.put(id, JSON.stringify(result), { expirationTtl: 259200 });

			return result;
		},
		{ rateLimit: { key: 'ares', limit: 5, ttl: 60 } }
	);
}

/**
 * Generate a 5-color palette from a base color
 * @param baseColor - Hex color string (e.g., "#22c55e")
 * @returns Array of 5 hex color strings
 */
export function generateColorPalette(baseColor: string): string[] {
	// Parse hex color
	const hex = baseColor.replace('#', '');
	const r = parseInt(hex.substring(0, 2), 16) || 0;
	const g = parseInt(hex.substring(2, 4), 16) || 0;
	const b = parseInt(hex.substring(4, 6), 16) || 0;

	return [
		baseColor,
		adjustBrightness(r, g, b, 1.3),
		adjustBrightness(r, g, b, 0.7),
		complementaryColor(r, g, b),
		mutedColor(r, g, b)
	];
}

function adjustBrightness(r: number, g: number, b: number, factor: number): string {
	const clamp = (v: number) => Math.min(255, Math.max(0, Math.round(v)));
	return '#' + [r, g, b].map(v => clamp(v * factor).toString(16).padStart(2, '0')).join('');
}

function complementaryColor(r: number, g: number, b: number): string {
	const clamp = (v: number) => Math.min(255, Math.max(0, Math.round(v)));
	return '#' + [255 - r, 255 - g, 255 - b].map(v => clamp(v).toString(16).padStart(2, '0')).join('');
}

function mutedColor(r: number, g: number, b: number): string {
	const clamp = (v: number) => Math.min(255, Math.max(0, Math.round(v)));
	const gray = 128;
	return '#' + [r, g, b].map(v => clamp((v + gray) / 2).toString(16).padStart(2, '0')).join('');
}
