import { HTML, BAZUKA_FORM_HTML, BAZUKA_CARD_TEMPLATE } from './ui';

interface BazukaData {
	type?: string;
	nickname: string;
	job: string;
	email: string;
	website: string;
}

/**
 * Escapes characters for HTML attributes
 */
function escapeHTML(str: string): string {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

/**
 * HTMLRewriter Handler for Bazuka Cards
 */
class BazukaHandler {
	private data: BazukaData;
	constructor(data: BazukaData) { this.data = data; }
	element(element: Element) {
		const id = element.getAttribute('id');
		if (id === 'card-nickname') {
			element.setInnerContent(this.data.nickname);
			// setAttribute does NOT auto-escape in some environments/versions of HTMLRewriter
			// for security, we manually escape the nickname for the data-text attribute
			element.setAttribute('data-text', escapeHTML(this.data.nickname));
		}
		if (id === 'card-job') element.setInnerContent(this.data.job);
		if (id === 'card-email') {
			element.setInnerContent(this.data.email);
			element.setAttribute('href', `mailto:${escapeHTML(this.data.email)}`);
		}
		if (id === 'card-website') {
			element.setAttribute('href', escapeHTML(this.data.website));
			element.setInnerContent(this.data.website);
		}
		if (id === 'title-tag') {
			element.setInnerContent(`${this.data.nickname}, ${this.data.job} | PUNCHY.ME`);
		}
		if (id === 'og-title' || id === 'twitter-title') {
			element.setAttribute('content', `${this.data.nickname}, ${this.data.job} | PUNCHY.ME`);
		}
		if (id === 'og-description' || id === 'twitter-description') {
			element.setAttribute('content', `Contact: ${this.data.email} | View my high-impact digital business card on BAZUKA.`);
		}
	}
}

/**
 * Basic IP-based rate limiter using KV
 * Limit: 10 requests per minute
 */
async function isRateLimited(ip: string, env: Env): Promise<boolean> {
	const key = `rate-limit:${ip}`;
	try {
		const current = await env.SHORT_LINKS.get(key);
		const count = parseInt(current || "0");

		if (count >= 10) return true;

		// Increment and set TTL to 60s
		await env.SHORT_LINKS.put(key, (count + 1).toString(), { expirationTtl: 60 });
		return false;
	} catch (err) {
		console.error("Rate limit error:", err);
		return false; // Fail open to not block users if KV is slow
	}
}

/**
 * Verify Cloudflare Turnstile token
 */
async function verifyTurnstile(token: string, secret: string, ip: string): Promise<boolean> {
	try {
		const formData = new FormData();
		formData.append('secret', secret);
		formData.append('response', token);
		formData.append('remoteip', ip);

		const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
		const result = await fetch(url, { 
			body: formData, 
			method: 'POST',
			headers: { 'Accept': 'application/json' }
		});
		
		if (!result.ok) return false;
		
		const outcome = await result.json() as { success: boolean };
		return outcome.success;
	} catch (err) {
		console.error("Turnstile verification error:", err);
		return false;
	}
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
				headers: { 
					"Content-Type": "text/html",
					"Link": "<https://fonts.googleapis.com>; rel=preconnect, <https://fonts.gstatic.com>; rel=preconnect; crossorigin, <https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double&family=JetBrains+Mono:wght@400;700&display=swap>; rel=preload; as=style"
				},
			});
		}

		// BAZUKA: Serve the creation form
		if (url.pathname === "/bazuka" && request.method === "GET") {
			return new Response(BAZUKA_FORM_HTML, {
				headers: { 
					"Content-Type": "text/html",
					"Link": "<https://fonts.googleapis.com>; rel=preconnect, <https://fonts.gstatic.com>; rel=preconnect; crossorigin, <https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double&family=JetBrains+Mono:wght@400;700&display=swap>; rel=preload; as=style"
				},
			});
		}

		// BAZUKA: Create a business card
		if (url.pathname === "/bazuka" && request.method === "POST") {
			try {
				const body = await request.json() as BazukaData & { 'cf-turnstile-response'?: string };
				const { nickname, job, email, website, 'cf-turnstile-response': token } = body;

				// Basic validation
				if (!nickname || !job || !email || !website) {
					return new Response(JSON.stringify({ error: "All fields are required" }), { 
						status: 400,
						headers: { "Content-Type": "application/json" }
					});
				}

				// Rate limiting
				if (await isRateLimited(ip, env)) {
					return new Response(JSON.stringify({ error: "Too many requests" }), { 
						status: 429,
						headers: { "Content-Type": "application/json" }
					});
				}

				// Turnstile verification
				if (env.TURNSTILE_SECRET_KEY) {
					if (!token) {
						return new Response(JSON.stringify({ error: "Security check required" }), { 
							status: 403,
							headers: { "Content-Type": "application/json" }
						});
					}
					const isHuman = await verifyTurnstile(token, env.TURNSTILE_SECRET_KEY, ip);
					if (!isHuman) return new Response(JSON.stringify({ error: "Verification failed" }), { 
						status: 403,
						headers: { "Content-Type": "application/json" }
					});
				}

				const id = Math.random().toString(36).substring(2, 8);
				const data: BazukaData = { type: 'bazuka', nickname, job, email, website };
				
				// Store with 3-day TTL
				await env.SHORT_LINKS.put(id, JSON.stringify(data), { expirationTtl: 259200 });

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

		// API: Shorten a URL
		if (url.pathname === "/shorten" && request.method === "POST") {
			try {
				const body = await request.json() as { 
					url: string; 
					suggestedId?: string;
					hp_field?: string; 
					'cf-turnstile-response'?: string; 
				};
				const { hp_field, 'cf-turnstile-response': turnstileToken, suggestedId } = body;
				let { url: originalUrl } = body;

				// 1. Honeypot check
				if (hp_field) {
					return new Response(JSON.stringify({ error: "Bot detected." }), { 
						status: 403,
						headers: { "Content-Type": "application/json" }
					});
				}

				// 2. Normalization & Basic validation
				if (originalUrl) {
					originalUrl = originalUrl.trim();
					// Auto-prepend protocol if missing
					if (!originalUrl.startsWith('http://') && !originalUrl.startsWith('https://')) {
						originalUrl = 'https://' + originalUrl;
					}
					// Remove trailing slash
					originalUrl = originalUrl.endsWith('/') ? originalUrl.slice(0, -1) : originalUrl;
				}

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

				// 4. Rate limiting (IP-based)
				if (await isRateLimited(ip, env)) {
					return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), { 
						status: 429,
						headers: { "Content-Type": "application/json" }
					});
				}

				// 5. Turnstile verification
				if (env.TURNSTILE_SECRET_KEY) {
					if (!turnstileToken) {
						return new Response(JSON.stringify({ error: "Security check required." }), { 
							status: 403,
							headers: { "Content-Type": "application/json" }
						});
					}
					const isHuman = await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET_KEY, ip);
					if (!isHuman) {
						return new Response(JSON.stringify({ error: "Verification failed. Are you a bot?" }), { 
							status: 403,
							headers: { "Content-Type": "application/json" }
						});
					}
				}

				// Check if URL already has a short ID (Reverse Mapping)
				const existingId = await env.SHORT_LINKS.get(`url:${originalUrl}`, { cacheTtl: 3600 });
				if (existingId) {
					return new Response(JSON.stringify({ id: existingId }), {
						headers: { "Content-Type": "application/json" },
					});
				}

				let id = suggestedId;
				
				// Validate suggestedId (must be 6 alphanumeric and NOT taken)
				if (id) {
					const isValidFormat = /^[a-z0-9]{6}$/.test(id);
					const isTaken = isValidFormat ? await env.SHORT_LINKS.get(id, { cacheTtl: 3600 }) : true;
					
					if (!isValidFormat || isTaken) {
						// If invalid or taken, ignore suggestion and generate new
						id = Math.random().toString(36).substring(2, 8);
					}
				} else {
					id = Math.random().toString(36).substring(2, 8);
				}
				
				// Store mapping (Parallel)
				await Promise.all([
					env.SHORT_LINKS.put(id, originalUrl),
					env.SHORT_LINKS.put(`url:${originalUrl}`, id)
				]);

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
		const id = url.pathname.slice(1);
		if (id && id.length > 0) {
			// TURBO REDIRECT: Cache lookup in local edge memory for 1 hour (3600s)
			const value = await env.SHORT_LINKS.get(id, { cacheTtl: 3600 });
			if (value) {
				// Check if it's a BAZUKA card
				if (value.startsWith('{')) {
					try {
						const data = JSON.parse(value) as BazukaData;
						if (data.type === 'bazuka') {
							const handler = new BazukaHandler(data);
							return new HTMLRewriter()
								.on('#card-nickname', handler)
								.on('#card-job', handler)
								.on('#card-email', handler)
								.on('#card-website', handler)
								.on('#title-tag', handler)
								.transform(new Response(BAZUKA_CARD_TEMPLATE, {
									headers: { "Content-Type": "text/html" },
								}));
						}
					} catch (_e) {
						// Not valid JSON, ignore and proceed to redirect
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
