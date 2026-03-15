import { HTML, BAZUKA_FORM_HTML, BAZUKA_CARD_TEMPLATE, ANAKIN_FORM_HTML, ANAKIN_RESUME_TEMPLATE, SYNC_ERROR_HTML, MUSASHI_FORM_HTML, YAIBA_EDITOR_HTML, YAIBA_VIEW_HTML, LOKI_HTML, ODIN_HTML } from './ui';

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
	experience: string;
	aiSummary?: string;
	aiExperience?: string;
	aiHydrated?: boolean;
}

interface YaibaData {
	type: 'yaiba';
	content: string;
	tags: string[];
	createdAt: number;
}

export interface Env {
	SHORT_LINKS: KVNamespace;
	AI: Ai;
	LOKI_DB: D1Database;
	TURNSTILE_SITE_KEY: string;
	RESEND_API_KEY?: string;
}

/**
 * High-performance HTML escaper
 */
function escapeHTML(str: string): string {
	if (!str) return '';
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
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
			element.setAttribute('data-text', this.data.nickname);
		}
		if (id === 'card-job') element.setInnerContent(this.data.job);
		if (id === 'card-email') element.setInnerContent(this.data.email);
		if (id === 'card-website') element.setInnerContent(escapeHTML(this.data.website));
		
		if (id === 'card-email-link') element.setAttribute('href', `mailto:${this.data.email}`);
		if (id === 'card-website-link') element.setAttribute('href', escapeHTML(this.data.website));
		
		// SEO Injection
		if (id === 'title-tag') element.setInnerContent(`${this.data.nickname} | Digital Business Card | PUNCHY.ME`);
		if (id === 'og-title' || id === 'twitter-title') {
			element.setAttribute('content', escapeHTML(`${this.data.nickname} | Digital Business Card | PUNCHY.ME`));
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
		if (id === 'res-website') element.setInnerContent(escapeHTML(this.data.website));

		if (id === 'res-email-link') element.setAttribute('href', `mailto:${this.data.email}`);
		if (id === 'res-website-link') element.setAttribute('href', escapeHTML(this.data.website));
		if (id === 'res-summary') {
			if (this.data.aiSummary) {
				element.setInnerContent(this.data.aiSummary);
				element.removeAttribute('data-pending');
			} else {
				element.setInnerContent('Refining professional profile...');
				element.setAttribute('data-pending', 'true');
			}
		}
		if (id === 'res-experience') {
			if (this.data.aiExperience) {
				element.setInnerContent(this.data.aiExperience);
				element.removeAttribute('data-pending');
			} else {
				element.setInnerContent(this.data.experience);
				element.setAttribute('data-pending', 'true');
			}
		}
		if (id === 'res-education') element.setInnerContent(this.data.education);
		if (id === 'res-skills') {
			const tags = this.data.skills.split(',').map(s => `<span class="expertise-tag">${escapeHTML(s.trim())}</span>`).join('');
			element.setInnerContent(tags, { html: true });
		}
		
		// SEO Injection
		if (id === 'title-tag') element.setInnerContent(`${this.data.name} | Professional Resume | PUNCHY.ME`);
		if (id === 'og-title' || id === 'twitter-title') {
			element.setAttribute('content', escapeHTML(`${this.data.name} | Professional Resume | PUNCHY.ME`));
		}
		if (id === 'og-description' || id === 'twitter-description') {
			const desc = this.data.aiSummary || `View the professional resume of ${this.data.name} (${this.data.job}). Refined by Anakin AI.`;
			element.setAttribute('content', escapeHTML(desc));
		}
	}
}

/**
 * Main Worker Entry Point
 */
export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		const path = url.pathname;

		// 1. Static Routes
		if (path === '/') return new Response(HTML, { headers: { 'Content-Type': 'text/html', 'Link': '<https://fonts.googleapis.com>; rel=preconnect, <https://fonts.gstatic.com>; rel=preconnect, <https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double&family=JetBrains+Mono:wght@400;700&display=swap>; rel=preload; as=style' } });
		if (path === '/favicon.ico' || path === '/favicon.svg') return new Response(`<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#000000" /><g transform="rotate(15, 50, 50)"><path d="M35 25 H55 C65 25 75 32 75 45 C75 58 65 65 55 65 H45 V80" stroke="#22c55e" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none" /><path d="M45 45 H55" stroke="#22c55e" stroke-width="10" stroke-linecap="round" fill="none" /></g></svg>`, { headers: { 'Content-Type': 'image/svg+xml' } });
		if (path === '/robots.txt') return new Response('User-agent: *\nAllow: /\nSitemap: https://punchy.me/sitemap.xml');
		if (path === '/sitemap.xml') {
			const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url><loc>https://punchy.me/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
	<url><loc>https://punchy.me/bazuka</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
	<url><loc>https://punchy.me/anakin</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
</urlset>`.trim();
			return new Response(sitemap, { headers: { 'Content-Type': 'application/xml' } });
		}

		// 2. Shortener API
		if (path === '/shorten' && request.method === 'POST') {
			try {
				const { url: longUrl, suggestedId, hp_field } = await request.json() as { url: string, suggestedId?: string, hp_field?: string };
				if (hp_field) return new Response(JSON.stringify({ error: 'Bot detected.' }), { status: 403 });
				let targetUrl = longUrl.trim();
				if (!targetUrl.startsWith('http')) targetUrl = 'https://' + targetUrl;
				try {
					const targetHost = new URL(targetUrl).hostname;
					if (targetHost === url.hostname || targetHost.endsWith('punchy.me') || targetHost.endsWith('workers.dev')) {
						return new Response(JSON.stringify({ error: 'Recursive shortening detected.' }), { status: 400 });
					}
				} catch (_e) {
					return new Response(JSON.stringify({ error: 'Invalid URL format.' }), { status: 400 });
				}
				const normalized = targetUrl.replace(/\/+$/, '');
				targetUrl = normalized;
				const existingId = await env.SHORT_LINKS.get(`url:${normalized}`);
				if (existingId) return new Response(JSON.stringify({ id: existingId }), { headers: { 'Content-Type': 'application/json' } });
				const ip = request.headers.get('cf-connecting-ip') || 'anonymous';
				const rlKey = `rl:${ip}`;
				const currentRl = await env.SHORT_LINKS.get(rlKey);
				const rlCount = currentRl ? parseInt(currentRl) : 0;
				if (rlCount >= 10) return new Response(JSON.stringify({ error: 'Too many requests' }), { status: 429 });
				await env.SHORT_LINKS.put(rlKey, (rlCount + 1).toString(), { expirationTtl: 60 });
				let id = suggestedId || Math.random().toString(36).substring(2, 8);
				const collision = await env.SHORT_LINKS.get(id);
				if (collision && suggestedId) id = Math.random().toString(36).substring(2, 8);
				await env.SHORT_LINKS.put(id, targetUrl);
				await env.SHORT_LINKS.put(`url:${normalized}`, id);

				return new Response(JSON.stringify({ id }), { headers: { 'Content-Type': 'application/json' } });
			} catch (_e) { return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 }); }
		}

		// 3. Tool Routes
		if (path === '/musashi') return new Response(MUSASHI_FORM_HTML, { headers: { 'Content-Type': 'text/html' } });
		if (path === '/yaiba') return new Response(YAIBA_EDITOR_HTML, { headers: { 'Content-Type': 'text/html' } });
		if (path === '/yaiba/publish' && request.method === 'POST') {
			try {
				const { content } = await request.json() as { content: string };
				if (!content || content.length > 5000) return new Response(JSON.stringify({ error: 'Invalid content size.' }), { status: 400 });
				const id = Math.random().toString(36).substring(2, 8);
				const yaibaData: YaibaData = { type: 'yaiba', content, tags: [], createdAt: Date.now() };
				await env.SHORT_LINKS.put(id, JSON.stringify(yaibaData), { expirationTtl: 259200 });
				return new Response(JSON.stringify({ id }), { headers: { 'Content-Type': 'application/json' } });
			} catch (_e) { return new Response(JSON.stringify({ error: 'Publish failed' }), { status: 500 }); }
		}
		if (path === '/loki') return new Response(LOKI_HTML, { headers: { 'Content-Type': 'text/html' } });
		if (path === '/odin') return new Response(ODIN_HTML, { headers: { 'Content-Type': 'text/html' } });

		// 4. Dynamic Redirection & Rendering
		if (path.length > 1) {
			const id = path.startsWith('/y/') ? path.substring(3) : path.substring(1);
			let value = await env.SHORT_LINKS.get(id);
			
			// ADAPTIVE DOUBLE-LOCK: Retry up to 3 times with increasing delays
			if (!value) {
				await new Promise(resolve => setTimeout(resolve, 600)); 
				value = await env.SHORT_LINKS.get(id);
			}
			if (!value) {
				await new Promise(resolve => setTimeout(resolve, 1200)); 
				value = await env.SHORT_LINKS.get(id);
			}

			if (value) {
				if (value.startsWith('http')) return Response.redirect(value, 301);
				if (value.startsWith('{')) {
					try {
						const data = JSON.parse(value);
						if (data.type === 'bazuka') {
							const handler = new BazukaHandler(data);
							return new HTMLRewriter().on('#card-nickname', handler).on('#card-job', handler).on('#card-email', handler).on('#card-website', handler).on('#card-email-link', handler).on('#card-website-link', handler).on('#title-tag', handler).on('#og-title', handler).on('#twitter-title', handler).on('#og-description', handler).on('#twitter-description', handler).transform(new Response(BAZUKA_CARD_TEMPLATE, { headers: { "Content-Type": "text/html" } }));
						}
						if (data.type === 'anakin') {
							const handler = new AnakinHandler(data);
							const res = new Response(ANAKIN_RESUME_TEMPLATE, { headers: { "Content-Type": "text/html" } });
							return new HTMLRewriter().on('#res-name', handler).on('#res-job', handler).on('#res-email', handler).on('#res-website', handler).on('#res-email-link', handler).on('#res-website-link', handler).on('#res-summary', handler).on('#res-experience', handler).on('#res-education', handler).on('#res-skills', handler).on('#title-tag', handler).on('#og-title', handler).on('#twitter-title', handler).on('#og-description', handler).on('#twitter-description', handler).transform(res);
						}
						if (data.type === 'yaiba') {
							return new HTMLRewriter().on('#raw-data', { element(element: Element) { element.setInnerContent(value); } }).transform(new Response(YAIBA_VIEW_HTML, { headers: { "Content-Type": "text/html" } }));
						}
					} catch (_e) { }
				}
			}
			
			// ZEN RESILIENCE: If it's a YAIBA path, return a cleaner resync page instead of SYNC_ERROR_HTML
			if (path.startsWith('/y/')) {
				return new Response(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>RESYNCING | YAIBA</title><style>body{background:#000;color:#22c55e;font-family:monospace;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;} .msg{letter-spacing:2px; animation:pulse 1.5s infinite alternate;} @keyframes pulse{from{opacity:0.4} to{opacity:1}}</style><script>setTimeout(()=>location.reload(), 1500)</script></head><body><div class="msg">[ RESYNCING SHADOW NODE... ]</div></body></html>`, { status: 404, headers: { 'Content-Type': 'text/html' } });
			}

			return new Response(SYNC_ERROR_HTML, { status: 404, headers: { 'Content-Type': 'text/html' } });
		}

		return new Response("Not Found", { status: 404 });
	},
};