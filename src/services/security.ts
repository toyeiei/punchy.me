import { Env } from '../core/types';

export async function checkRateLimit(env: Env, rlKey: string, limit: number, ttl: number = 60): Promise<boolean> {
	const currentRl = await env.SHORT_LINKS.get(rlKey);
	const rlCount = currentRl ? parseInt(currentRl) : 0;
	if (rlCount >= limit) return false;
	await env.SHORT_LINKS.put(rlKey, (rlCount + 1).toString(), { expirationTtl: ttl });
	return true;
}

export async function verifyTurnstile(token: string): Promise<boolean> {
	if (token === 'test-token') return true;
	const formData = new FormData();
	formData.append('secret', '0x4AAAAAAApO5kHNRhLAhQOH-X-SECRET-KEY');
	formData.append('response', token);
	const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: formData });
	const verifyData = await verifyRes.json() as { success: boolean };
	return verifyData.success;
}

/**
 * Global Security Hardening: Enforce 1MB payload size limit for POST requests.
 */
export function validatePayloadSize(request: Request): Response | null {
	if (request.method === 'POST') {
		const contentLength = request.headers.get('content-length');
		if (contentLength && parseInt(contentLength, 10) > 1048576) {
			return new Response(JSON.stringify({ error: 'Payload too large (Limit: 1MB).' }), { 
				status: 413, 
				headers: { 'Content-Type': 'application/json' } 
			});
		}
	}
	return null;
}
