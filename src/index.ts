import { HTML, BAZUKA_FORM_HTML, BAZUKA_CARD_TEMPLATE, ANAKIN_FORM_HTML, ANAKIN_RESUME_TEMPLATE } from './ui';

interface BazukaData {
	type?: string;
	nickname: string;
	job: string;
	email: string;
	website: string;
}

interface AnakinData {
	type: 'anakin';
	name: string;
	job: string;
	email: string;
	website: string;
	education: string;
	skills: string;
	aiSummary?: string;
}

interface Env {
	SHORT_LINKS: KVNamespace;
	AI: Ai;
	TURNSTILE_SECRET_KEY?: string;
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
			element.setAttribute('content', escapeHTML(`${this.data.nickname}, ${this.data.job} | PUNCHY.ME`));
		}
		if (id === 'og-description' || id === 'twitter-description') {
			element.setAttribute('content', escapeHTML(`Contact: ${this.data.email} | View my high-impact digital business card on BAZUKA.`));
		}
	}
}

/**
 * HTMLRewriter Handler for Anakin Resumes
 */
class AnakinHandler {
	private data: AnakinData;
	constructor(data: AnakinData) { this.data = data; }
	element(element: Element) {
		const id = element.getAttribute('id');
		if (id === 'res-name') element.setInnerContent(this.data.name);
		if (id === 'res-job') element.setInnerContent(this.data.job);
		if (id === 'res-email') element.setInnerContent(this.data.email);
		if (id === 'res-website') {
			element.setInnerContent(this.data.website.replace(/^https?:\/\//, ''));
			element.setAttribute('href', escapeHTML(this.data.website));
		}
		if (id === 'res-summary') element.setInnerContent(this.data.aiSummary || 'Refining professional profile...');
		if (id === 'res-education') element.setInnerContent(this.data.education);
		if (id === 'res-skills') element.setInnerContent(this.data.skills);
		if (id === 'title-tag') element.setInnerContent(`${this.data.name} | Professional Resume | PUNCHY.ME`);
		if (id === 'og-title') element.setAttribute('content', escapeHTML(`${this.data.name} | Professional Resume | PUNCHY.ME`));
		if (id === 'og-description') element.setAttribute('content', escapeHTML(`View the professional resume of ${this.data.name} (${this.data.job}). Refined by Anakin AI.`));
	}
}

/**
 * Basic IP-based rate limiter using KV
 */
async function isRateLimited(ip: string, env: Env): Promise<boolean> {
	const key = `rate-limit:${ip}`;
	try {
		const current = await env.SHORT_LINKS.get(key);
		const count = parseInt(current || "0");
		if (count >= 10) return true;
		await env.SHORT_LINKS.put(key, (count + 1).toString(), { expirationTtl: 60 });
		return false;
	} catch (err) {
		console.error("Rate limit error:", err);
		return false;
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
		const result = await fetch(url, { body: formData, method: 'POST', headers: { 'Accept': 'application/json' } });
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

		// Static routes: robots.txt, sitemap.xml, assets
		if (url.pathname === "/robots.txt") {
			return new Response("User-agent: *\nAllow: /\nSitemap: https://punchy.me/sitemap.xml", { headers: { "Content-Type": "text/plain" } });
		}
		if (url.pathname === "/sitemap.xml") {
			const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://punchy.me/</loc><lastmod>2026-03-11</lastmod><changefreq>monthly</changefreq><priority>1.0</priority></url></urlset>`;
			return new Response(sitemap.trim(), { headers: { "Content-Type": "text/xml; charset=utf-8" } });
		}

		// GET Routes
		if (url.pathname === "/favicon.ico" || url.pathname === "/favicon.svg") {
			const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#000000" /><g transform="rotate(15, 50, 50)"><path d="M35 25 H55 C65 25 75 32 75 45 C75 58 65 65 55 65 H45 V80" stroke="#22c55e" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none" /><path d="M45 45 H55" stroke="#22c55e" stroke-width="10" stroke-linecap="round" fill="none" /></g></svg>`;
			return new Response(svg, { headers: { "Content-Type": "image/svg+xml" } });
		}
		if (url.pathname === "/" && request.method === "GET") {
			return new Response(HTML, { headers: { "Content-Type": "text/html", "Link": "<https://fonts.googleapis.com>; rel=preconnect, <https://fonts.gstatic.com>; rel=preconnect; crossorigin, <https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double&family=JetBrains+Mono:wght@400;700&display=swap>; rel=preload; as=style" } });
		}
		if (url.pathname === "/bazuka" && request.method === "GET") {
			return new Response(BAZUKA_FORM_HTML, { headers: { "Content-Type": "text/html", "Link": "<https://fonts.googleapis.com>; rel=preconnect, <https://fonts.gstatic.com>; rel=preconnect; crossorigin, <https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double&family=JetBrains+Mono:wght@400;700&display=swap>; rel=preload; as=style" } });
		}
		if (url.pathname === "/anakin" && request.method === "GET") {
			return new Response(ANAKIN_FORM_HTML, { headers: { "Content-Type": "text/html", "Link": "<https://fonts.googleapis.com>; rel=preconnect, <https://fonts.gstatic.com>; rel=preconnect; crossorigin, <https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double&family=JetBrains+Mono:wght@400;700&display=swap>; rel=preload; as=style" } });
		}

		// POST Routes
		if (url.pathname === "/bazuka" && request.method === "POST") {
			try {
				const body = await request.json() as BazukaData & { 'cf-turnstile-response'?: string };
				const { nickname, job, email, website, 'cf-turnstile-response': token } = body;
				if (!nickname || !job || !email || !website) return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
				if (await isRateLimited(ip, env)) return new Response(JSON.stringify({ error: "Too many requests" }), { status: 429 });
				if (env.TURNSTILE_SECRET_KEY) {
					if (!token) return new Response(JSON.stringify({ error: "Security check required" }), { status: 403 });
					if (!(await verifyTurnstile(token, env.TURNSTILE_SECRET_KEY, ip))) return new Response(JSON.stringify({ error: "Verification failed" }), { status: 403 });
				}
				const id = Math.random().toString(36).substring(2, 8);
				const data: BazukaData = { type: 'bazuka', nickname, job, email, website };
				await env.SHORT_LINKS.put(id, JSON.stringify(data), { expirationTtl: 259200 });
				return new Response(JSON.stringify({ id }), { headers: { "Content-Type": "application/json" } });
			} catch (_err) { return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400 }); }
		}

		if (url.pathname === "/anakin" && request.method === "POST") {
			try {
				const body = await request.json() as AnakinData & { 'cf-turnstile-response'?: string };
				const { name, job, email, website, education, skills, 'cf-turnstile-response': token } = body;
				if (!name || !job || !email || !website || !education || !skills) return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
				
				// Enforce character limits (500 chars)
				if (education.length > 500 || skills.length > 500) {
					return new Response(JSON.stringify({ error: "Education and Skills must be under 500 characters each." }), { status: 400 });
				}

				if (await isRateLimited(ip, env)) return new Response(JSON.stringify({ error: "Too many requests" }), { status: 429 });
				if (env.TURNSTILE_SECRET_KEY) {
					if (!token) return new Response(JSON.stringify({ error: "Security check required" }), { status: 403 });
					if (!(await verifyTurnstile(token, env.TURNSTILE_SECRET_KEY, ip))) return new Response(JSON.stringify({ error: "Verification failed" }), { status: 403 });
				}
				// Workers AI Integration: Master Prompt (Optimized for Quality & Tokens)
				const aiResponse = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
					messages: [
						{ 
							role: 'system', 
							content: 'You are ANAKIN, an elite Resume Architect. Write a high-impact, 3-sentence summary. Rules: Use action verbs. No "I" or "My". Tone: Professional, bold, tech-forward. Examples: 1. "Engineered high-velocity pipelines using Python to drive ML models. Deploying sub-ms insights for global systems." 2. "Architecting immersive interfaces with React. Building frictionless user experiences through aesthetic disruption."' 
						},
						{ role: 'user', content: `Job: ${job}\nEducation: ${education}\nSkills: ${skills}` }
					]
				}) as any;

				// Log token usage for transparency
				if (aiResponse.usage) {
					console.log(`[ANAKIN AI] Usage: ${aiResponse.usage.prompt_tokens} input, ${aiResponse.usage.completion_tokens} output tokens.`);
				}

				const id = Math.random().toString(36).substring(2, 8);
				const data: AnakinData = { type: 'anakin', name, job, email, website, education, skills, aiSummary: aiResponse.response };
				await env.SHORT_LINKS.put(id, JSON.stringify(data), { expirationTtl: 259200 });
				return new Response(JSON.stringify({ id }), { headers: { "Content-Type": "application/json" } });
			} catch (_err) { return new Response(JSON.stringify({ error: "Anakin Forge failed" }), { status: 500 }); }
		}

		if (url.pathname === "/shorten" && request.method === "POST") {
			try {
				const body = await request.json() as { url: string; suggestedId?: string; hp_field?: string; 'cf-turnstile-response'?: string; };
				const { hp_field, 'cf-turnstile-response': turnstileToken, suggestedId } = body;
				let originalUrl = body.url ? body.url.trim() : "";
				if (hp_field) return new Response(JSON.stringify({ error: "Bot detected." }), { status: 403 });
				if (!originalUrl.startsWith('http://') && !originalUrl.startsWith('https://')) originalUrl = 'https://' + originalUrl;
				originalUrl = originalUrl.endsWith('/') ? originalUrl.slice(0, -1) : originalUrl;
				if (!originalUrl || originalUrl.includes("punchy.me")) return new Response(JSON.stringify({ error: "Recursive shortening is not allowed." }), { status: 400 });
				if (await isRateLimited(ip, env)) return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), { status: 429 });
				if (env.TURNSTILE_SECRET_KEY && turnstileToken) {
					if (!(await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET_KEY, ip))) return new Response(JSON.stringify({ error: "Verification failed" }), { status: 403 });
				}
				const existingId = await env.SHORT_LINKS.get(`url:${originalUrl}`, { cacheTtl: 3600 });
				if (existingId) return new Response(JSON.stringify({ id: existingId }), { headers: { "Content-Type": "application/json" } });
				let id = suggestedId;
				if (id && (/^[a-z0-9]{6}$/.test(id)) && !(await env.SHORT_LINKS.get(id, { cacheTtl: 3600 }))) { /* valid */ } 
				else { id = Math.random().toString(36).substring(2, 8); }
				await Promise.all([env.SHORT_LINKS.put(id, originalUrl), env.SHORT_LINKS.put(`url:${originalUrl}`, id)]);
				return new Response(JSON.stringify({ id }), { headers: { "Content-Type": "application/json" } });
			} catch (_err) { return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400 }); }
		}

		// Redirect / Render dynamic content
		const id = url.pathname.slice(1);
		if (id) {
			const value = await env.SHORT_LINKS.get(id, { cacheTtl: 3600 });
			if (value) {
				if (value.startsWith('{')) {
					try {
						const data = JSON.parse(value);
						if (data.type === 'bazuka') {
							const handler = new BazukaHandler(data);
							return new HTMLRewriter().on('#card-nickname', handler).on('#card-job', handler).on('#card-email', handler).on('#card-website', handler).on('#title-tag', handler).on('#og-title', handler).on('#og-description', handler).transform(new Response(BAZUKA_CARD_TEMPLATE, { headers: { "Content-Type": "text/html" } }));
						}
						if (data.type === 'anakin') {
							const handler = new AnakinHandler(data);
							return new HTMLRewriter().on('#res-name', handler).on('#res-job', handler).on('#res-email', handler).on('#res-website', handler).on('#res-summary', handler).on('#res-education', handler).on('#res-skills', handler).on('#title-tag', handler).on('#og-title', handler).on('#og-description', handler).transform(new Response(ANAKIN_RESUME_TEMPLATE, { headers: { "Content-Type": "text/html" } }));
						}
					} catch (_e) {}
				}
				return Response.redirect(value, 301);
			}
			return new Response("Link not found or expired", { status: 404 });
		}
		return new Response("Not Found", { status: 404 });
	},
};
