/**
 * Security headers and policies
 * Centralized security hardening configuration
 */

function buildCspPolicy(options?: { allowUnsafeEval?: boolean; allowWebR?: boolean }): string {
	let scriptSrc = "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com";
	let connectSrc = "connect-src 'self' https://challenges.cloudflare.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com";
	let workerSrc = "worker-src 'self'";
	
	if (options?.allowUnsafeEval) {
		scriptSrc = "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com";
	}
	
	if (options?.allowWebR) {
		scriptSrc += " https://webr.r-wasm.org blob: 'wasm-unsafe-eval'";
		connectSrc += " https://webr.r-wasm.org https://cdn.jsdelivr.net blob: data:";
		workerSrc = "worker-src 'self' blob: https://webr.r-wasm.org data:";
	}

	const parts = [
		"default-src 'self'",
		scriptSrc,
		"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com",
		"font-src 'self' https://fonts.gstatic.com",
		"img-src 'self' https://images.unsplash.com https://*.unsplash.com data:",
		connectSrc,
		workerSrc,
		"frame-src https://challenges.cloudflare.com",
		"frame-ancestors 'none'",
		"base-uri 'self'",
		"form-action 'self'",
	];

	return parts.join('; ');
}

export const CSP_POLICY = buildCspPolicy();

// ODIN uses a terminal-like query field that evaluates expressions via `new Function(...)`.
// That requires `script-src 'unsafe-eval'`.
export const CSP_POLICY_ODIN = buildCspPolicy({ allowUnsafeEval: true });

// MARCUS uses WebR which needs to load from webr.r-wasm.org and fetch WASM files
export const CSP_POLICY_MARCUS = buildCspPolicy({ allowWebR: true });

/**
 * Complete security headers set
 */
export const SECURITY_HEADERS = {
	'Content-Security-Policy': CSP_POLICY,
	'X-Content-Type-Options': 'nosniff',
	'X-Frame-Options': 'DENY',
	'X-XSS-Protection': '1; mode=block',
	'Referrer-Policy': 'strict-origin-when-cross-origin',
	'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
} as const;

/**
 * Applies security headers to HTML responses
 */
export function withSecurityHeaders(response: Response): Response {
	const contentType = response.headers.get('Content-Type');
	
	// Only apply CSP to HTML responses
	if (!contentType?.includes('text/html')) {
		return response;
	}
	
	const headers = new Headers(response.headers);
	
	for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
		if (key === 'Content-Security-Policy' && headers.has('Content-Security-Policy')) continue;
		headers.set(key, value);
	}
	
	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers
	});
}

/**
 * Validates URL to prevent SSRF attacks
 */
export function isUrlSafe(url: string, allowedDomains: string[] = []): boolean {
	try {
		const parsed = new URL(url);
		
		// Block private IP ranges
		const hostname = parsed.hostname.toLowerCase();
		
		// Block localhost variants
		if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]') {
			return false;
		}
		
		// Block private IP ranges (simplified check)
		if (hostname.startsWith('10.') || 
			hostname.startsWith('172.16.') ||
			hostname.startsWith('192.168.') ||
			hostname.startsWith('169.254.')) {
			return false;
		}
		
		// Block metadata endpoints
		if (hostname === '169.254.169.254') {
			return false;
		}
		
		// If allowed domains specified, check whitelist
		if (allowedDomains.length > 0) {
			return allowedDomains.some(domain => hostname === domain || hostname.endsWith('.' + domain));
		}
		
		return true;
	} catch {
		return false;
	}
}

/**
 * Sanitizes user input to prevent XSS (more comprehensive than escapeHTML)
 */
export function sanitizeInput(input: string, maxLength: number = 10000): string {
	if (!input) return '';
	
	// Truncate to max length
	let sanitized = input.substring(0, maxLength);
	
	// Remove null bytes
	sanitized = sanitized.replace(/\0/g, '');
	
	// Remove control characters (except newlines and tabs)
	// eslint-disable-next-line no-control-regex
	sanitized = sanitized.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '');
	
	return sanitized;
}
