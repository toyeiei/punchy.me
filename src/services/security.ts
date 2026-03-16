import { Env } from '../core/types';
import { MAX_PAYLOAD_SIZE } from '../core/constants';

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
	if (token === 'test-token') {
		// Cloudflare Workers test environment detection
		const g = globalThis as { VITEST?: unknown; process?: { env?: { NODE_ENV?: string } } };
		if (typeof g.VITEST !== 'undefined') return true;
		// Node.js test environment fallback
		try {
			if (g.process?.env?.NODE_ENV === 'test') return true;
		} catch {
			// Worker environment doesn't have process
		}
	}
	
	const formData = new FormData();
	formData.append('secret', secretKey);
	formData.append('response', token);
	const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: formData });
	const verifyData = await verifyRes.json() as { success: boolean };
	return verifyData.success;
}

/**
 * Global Security Hardening: Enforce 1MB payload size limit for POST requests.
 * Checks actual body size via clone — Content-Length is client-supplied and untrustworthy.
 */
export async function validatePayloadSize(request: Request): Promise<Response | null> {
	if (request.method === 'POST') {
		// Fast-fail on honest Content-Length
		const contentLength = request.headers.get('content-length');
		if (contentLength && parseInt(contentLength, 10) > MAX_PAYLOAD_SIZE) {
			return new Response(JSON.stringify({ error: 'Payload too large (Limit: 1MB).' }), {
				status: 413,
				headers: { 'Content-Type': 'application/json' }
			});
		}
		// Verify actual body size (Content-Length can be omitted or spoofed)
		const body = await request.clone().arrayBuffer();
		if (body.byteLength > MAX_PAYLOAD_SIZE) {
			return new Response(JSON.stringify({ error: 'Payload too large (Limit: 1MB).' }), {
				status: 413,
				headers: { 'Content-Type': 'application/json' }
			});
		}
	}
	return null;
}
