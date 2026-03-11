import { HTML, BAZUKA_FORM_HTML, BAZUKA_CARD_TEMPLATE } from './ui';

export interface Env {
	SHORT_LINKS: KVNamespace;
	TURNSTILE_SECRET_KEY?: string;
}

/**
 * HTMLRewriter Handler for Bazuka Cards
 */
class BazukaHandler {
	private data: any;
	constructor(data: any) { this.data = data; }
	element(element: Element) {
		const id = element.getAttribute('id');
		if (id === 'card-nickname') {
			element.setInnerContent(this.data.nickname);
			element.setAttribute('data-text', this.data.nickname);
		}
		if (id === 'card-job') element.setInnerContent(this.data.job);
		if (id === 'card-email') {
			element.setInnerContent(this.data.email);
			element.setAttribute('href', `mailto:${this.data.email}`);
		}
		if (id === 'card-linkedin') {
			element.setAttribute('href', this.data.linkedin);
		}
		if (id === 'title-tag') {
			element.setInnerContent(`${this.data.nickname} | PUNCHY.ME BAZUKA`);
		}
	}
}

/**
 * Basic IP-based rate limiter using KV
 * Limit: 10 requests per minute
 */
async function isRateLimited(ip: string, env: Env): Promise<boolean> {
	const key = `rate-limit:${ip}`;
	const current = await env.SHORT_LINKS.get(key);
	const count = parseInt(current || "0");

	if (count >= 10) return true;

	// Increment and set TTL to 60s
	await env.SHORT_LINKS.put(key, (count + 1).toString(), { expirationTtl: 60 });
	return false;
}

/**
 * Verify Cloudflare Turnstile token
 */
async function verifyTurnstile(token: string, secret: string, ip: string): Promise<boolean> {
	const formData = new FormData();
	formData.append('secret', secret);
	formData.append('response', token);
	formData.append('remoteip', ip);

	const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
	const result = await fetch(url, { body: formData, method: 'POST' });
	const outcome = await result.json() as { success: boolean };
	return outcome.success;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-real-ip") || "127.0.0.1";

		// SEO: robots.txt
		if (url.pathname === "/robots.txt") {
			return new Response("User-agent: *\nAllow: /\nSitemap: https://punchy.me/sitemap.xml", {
				headers: { "Content-Type": "text/plain" },
			});
		}

		// SEO: sitemap.xml
		if (url.pathname === "/sitemap.xml") {
			const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://punchy.me/</loc>
    <lastmod>2026-03-11</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
			return new Response(sitemap.trim(), {
				headers: { "Content-Type": "text/xml; charset=utf-8" },
			});
		}

		// Serve the frontend
		if (url.pathname === "/" && request.method === "GET") {
			return new Response(HTML, {
				headers: { "Content-Type": "text/html" },
			});
		}

		// BAZUKA: Serve the creation form
		if (url.pathname === "/bazuka" && request.method === "GET") {
			return new Response(BAZUKA_FORM_HTML, {
				headers: { "Content-Type": "text/html" },
			});
		}

		// BAZUKA: Create a business card
		if (url.pathname === "/bazuka" && request.method === "POST") {
			try {
				const body = await request.json() as any;
				const { nickname, job, email, linkedin, 'cf-turnstile-response': token } = body;

				// Basic validation
				if (!nickname || !job || !email || !linkedin) {
					return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
				}

				// Rate limiting
				if (await isRateLimited(ip, env)) {
					return new Response(JSON.stringify({ error: "Too many requests" }), { status: 429 });
				}

				// Turnstile verification
				if (env.TURNSTILE_SECRET_KEY && token) {
					const isHuman = await verifyTurnstile(token, env.TURNSTILE_SECRET_KEY, ip);
					if (!isHuman) return new Response(JSON.stringify({ error: "Verification failed" }), { status: 403 });
				}

				const id = Math.random().toString(36).substring(2, 8);
				const data = { type: 'bazuka', nickname, job, email, linkedin };
				
				// Store with 3-day TTL (259200 seconds)
				await env.SHORT_LINKS.put(id, JSON.stringify(data), { expirationTtl: 259200 });

				return new Response(JSON.stringify({ id }), {
					headers: { "Content-Type": "application/json" },
				});
			} catch (_err) {
				return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400 });
			}
		}

		// API: Shorten a URL
		if (url.pathname === "/shorten" && request.method === "POST") {
		try {
		const body = await request.json() as { 
			url: string; 
			hp_field?: string; 
			'cf-turnstile-response'?: string; 
		};
		const { url: originalUrl, hp_field, 'cf-turnstile-response': turnstileToken } = body;

		// 1. Honeypot check
		if (hp_field) {
			return new Response(JSON.stringify({ error: "Bot detected." }), { 
				status: 403,
				headers: { "Content-Type": "application/json" }
			});
		}

		// 2. Basic validation (Move this up to avoid counting invalid requests in rate limit)
		if (!originalUrl || !originalUrl.startsWith('http')) {
			return new Response(JSON.stringify({ error: "Invalid URL. Must start with http:// or https://" }), { 
				status: 400,
				headers: { "Content-Type": "application/json" }
			});
		}

		// 3. Recursive URL filtering
		if (originalUrl.includes("punchy.me")) {
			return new Response(JSON.stringify({ error: "Recursive shortening is not allowed." }), { 
				status: 400,
				headers: { "Content-Type": "application/json" }
			});
		}

		// 4. Rate limiting (IP-based) - Only count valid requests
		if (await isRateLimited(ip, env)) {
			return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), { 
				status: 429,
				headers: { "Content-Type": "application/json" }
			});
		}

		// 5. Turnstile verification (if secret is configured)

				if (env.TURNSTILE_SECRET_KEY && turnstileToken) {
					const isHuman = await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET_KEY, ip);
					if (!isHuman) {
						return new Response(JSON.stringify({ error: "Verification failed. Are you a bot?" }), { 
							status: 403,
							headers: { "Content-Type": "application/json" }
						});
					}
				}
				
				// Basic validation
				if (!originalUrl || !originalUrl.startsWith('http')) {
					return new Response(JSON.stringify({ error: "Invalid URL. Must start with http:// or https://" }), { 
						status: 400,
						headers: { "Content-Type": "application/json" }
					});
				}

				// Check if URL already has a short ID (Reverse Mapping)
				const existingId = await env.SHORT_LINKS.get(`url:${originalUrl}`);
				if (existingId) {
					return new Response(JSON.stringify({ id: existingId }), {
						headers: { "Content-Type": "application/json" },
					});
				}

				// Generate a random 6-character ID
				const id = Math.random().toString(36).substring(2, 8);
				
				// Store ID -> URL mapping
				await env.SHORT_LINKS.put(id, originalUrl);
				// Store URL -> ID mapping (Reverse)
				await env.SHORT_LINKS.put(`url:${originalUrl}`, id);

				return new Response(JSON.stringify({ id }), {
					headers: { "Content-Type": "application/json" },
				});
			} catch (_err) {
				return new Response(JSON.stringify({ error: "Invalid request" }), { 
					status: 400,
					headers: { "Content-Type": "application/json" }
				});
			}
		}

		// Redirect short links or serve BAZUKA cards
		const id = url.pathname.slice(1); // Get path after /
		if (id && id.length > 0) {
			const value = await env.SHORT_LINKS.get(id);
			if (value) {
				// Check if it's a BAZUKA card (stored as JSON)
				if (value.startsWith('{')) {
					try {
						const data = JSON.parse(value);
						if (data.type === 'bazuka') {
							const handler = new BazukaHandler(data);
							return new HTMLRewriter()
								.on('#card-nickname', handler)
								.on('#card-job', handler)
								.on('#card-email', handler)
								.on('#card-linkedin', handler)
								.on('#title-tag', handler)
								.transform(new Response(BAZUKA_CARD_TEMPLATE, {
									headers: { "Content-Type": "text/html" },
								}));
						}
					} catch (_e) {
						// Not valid JSON, treat as URL
					}
				}
				// Normal URL redirect
				return Response.redirect(value, 301);
			}
			return new Response("Link not found or expired", { status: 404 });
		}

		return new Response("Not Found", { status: 404 });
	},
};
