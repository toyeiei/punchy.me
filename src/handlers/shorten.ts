import { Env } from '../core/types';
import { generateUniqueId } from '../core/utils';
import { validateShortenRequest, isReservedId } from '../core/validation';
import { handleValidatedRequest } from '../core/middleware';
import { ValidationError } from '../core/errors';

export async function handleShorten(request: Request, env: Env): Promise<Response> {
	const url = new URL(request.url);
	
	return handleValidatedRequest(
		request,
		env,
		validateShortenRequest,
		async (data: { url: string; suggestedId?: string }, _ip: string, env: Env) => {
			let targetUrl = data.url.trim();
			if (!targetUrl.startsWith('http')) targetUrl = 'https://' + targetUrl;
			
			try {
				const parsed = new URL(targetUrl);
				const targetHost = parsed.hostname;
				if (targetHost === url.hostname || targetHost.endsWith('punchy.me') || targetHost.endsWith('workers.dev')) {
					throw new ValidationError('Recursive shortening detected.');
				}
			} catch (urlError) {
				// If URL parsing failed, it's actually an invalid URL
				if (urlError instanceof ValidationError) {
					throw urlError; // Re-throw our validation error
				}
				throw new ValidationError('Invalid URL format.');
			}
			
			const normalized = targetUrl.replace(/\/+$/, '');
			const existingId = await env.SHORT_LINKS.get(`url:${normalized}`);
			if (existingId) return { id: existingId };
			
			let id = data.suggestedId || generateUniqueId();
			if (data.suggestedId && isReservedId(data.suggestedId)) id = generateUniqueId();
			const collision = await env.SHORT_LINKS.get(id);
			if (collision && data.suggestedId) id = generateUniqueId();
			
			await env.SHORT_LINKS.put(id, normalized);
			await env.SHORT_LINKS.put(`url:${normalized}`, id);
			return { id };
		},
		{ rateLimit: { key: 'shorten', limit: 10 } }
	);
}
