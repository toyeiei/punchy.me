import { Env } from '../core/types';

/**
 * KV-based rate limiting with known race condition limitations.
 * 
 * KNOWN ISSUE: Cloudflare KV is eventually consistent. Two concurrent requests
 * can both read count=N, both write count=N+1, effectively bypassing the limit.
 * 
 * This is acceptable for this project's scale. For production-grade enforcement,
 * use Cloudflare Durable Objects or the Rate Limiting API.
 * 
 * @param env - Worker environment bindings
 * @param rlKey - Rate limit key (e.g., "rl:ip:1.2.3.4")
 * @param limit - Maximum requests allowed in the window
 * @param ttl - Time window in seconds (default: 60)
 */
export async function checkRateLimit(env: Env, rlKey: string, limit: number, ttl: number = 60): Promise<boolean> {
	const currentRl = await env.SHORT_LINKS.get(rlKey);
	const rlCount = currentRl ? parseInt(currentRl) : 0;
	if (rlCount >= limit) return false;
	await env.SHORT_LINKS.put(rlKey, (rlCount + 1).toString(), { expirationTtl: ttl });
	return true;
}

export async function verifyTurnstile(token: string, secretKey: string): Promise<boolean> {
	// Allow test-token bypass only in test environment
	if (token === 'test-token' && typeof (globalThis as { VITEST?: unknown }).VITEST !== 'undefined') return true;
	
	const formData = new FormData();
	formData.append('secret', secretKey);
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
