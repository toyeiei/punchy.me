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
	experience: string;
	aiSummary?: string;
	aiExperience?: string;
	aiHydrated?: boolean;
}

export interface Env {
	SHORT_LINKS: KVNamespace;
	AI: Ai;
	TURNSTILE_SITE_KEY: string;
}

/**
 * High-performance HTML escaper
 */
function escapeHTML(str: string): string {
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
		if (id === 'card-email') {
			element.setInnerContent(this.data.email);
			element.setAttribute('href', `mailto:${this.data.email}`);
		}
		if (id === 'card-website') {
			element.setInnerContent(this.data.website.replace(/^https?:\/\//, ''));
			element.setAttribute('href', escapeHTML(this.data.website));
		}
		
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
		if (id === 'res-website') {
			element.setInnerContent(this.data.website.replace(/^https?:\/\//, ''));
			element.setAttribute('href', escapeHTML(this.data.website));
		}
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
		if (id === 'res-skills') element.setInnerContent(this.data.skills);
		
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
		if (path === '/sitemap.xml') return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://punchy.me/</loc><changefreq>weekly</changefreq></url></urlset>', { headers: { 'Content-Type': 'application/xml' } });

		// 2. Shortener API
		if (path === '/shorten' && request.method === 'POST') {
			try {
				const { url: longUrl, suggestedId, hp_field } = await request.json() as { url: string, suggestedId?: string, hp_field?: string };
				
				// Security: Bot Protection
				if (hp_field) return new Response(JSON.stringify({ error: 'Bot detected.' }), { status: 403 });
				if (longUrl.includes('punchy.me')) return new Response(JSON.stringify({ error: 'Invalid URL.' }), { status: 400 });

				// Security: IP-based Rate Limiting (10 req/min)
				const ip = request.headers.get('CF-Connecting-IP') || 'anonymous';
				const rlKey = `rl:${ip}`;
				const currentRl = await env.SHORT_LINKS.get(rlKey);
				const rlCount = currentRl ? parseInt(currentRl) : 0;
				if (rlCount >= 10) return new Response(JSON.stringify({ error: 'Too many requests' }), { status: 429 });
				await env.SHORT_LINKS.put(rlKey, (rlCount + 1).toString(), { expirationTtl: 60 });

				// Data: URL Normalization
				let targetUrl = longUrl.trim();
				if (!targetUrl.startsWith('http')) targetUrl = 'https://' + targetUrl;
				const normalized = targetUrl.replace(/\/+$/, '');

				// Data: Deduplication
				const existingId = await env.SHORT_LINKS.get(`url:${normalized}`);
				if (existingId) return new Response(JSON.stringify({ id: existingId }), { headers: { 'Content-Type': 'application/json' } });

				// Logic: ID Generation
				let id = suggestedId || Math.random().toString(36).substring(2, 8);
				const collision = await env.SHORT_LINKS.get(id);
				if (collision && suggestedId) id = Math.random().toString(36).substring(2, 8); // Fallback if suggested is taken

				// Logic: Persistence
				await env.SHORT_LINKS.put(id, targetUrl);
				await env.SHORT_LINKS.put(`url:${normalized}`, id);

				return new Response(JSON.stringify({ id }), { headers: { 'Content-Type': 'application/json' } });
			} catch (_e) {
				return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
			}
		}

		// 3. BAZUKA Routes
		if (path === '/bazuka') {
			if (request.method === 'GET') return new Response(BAZUKA_FORM_HTML, { headers: { 'Content-Type': 'text/html' } });
			if (request.method === 'POST') {
				try {
					const data = await request.json() as BazukaData;
					if (!data.nickname || !data.job) return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
					const id = Math.random().toString(36).substring(2, 8);
					await env.SHORT_LINKS.put(id, JSON.stringify({ ...data, type: 'bazuka' }), { expirationTtl: 259200 }); // 3 days
					return new Response(JSON.stringify({ id }), { headers: { 'Content-Type': 'application/json' } });
				} catch (_e) {
					return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
				}
			}
		}

		// 4. ANAKIN Routes
		if (path === '/anakin') {
			if (request.method === 'GET') return new Response(ANAKIN_FORM_HTML, { headers: { 'Content-Type': 'text/html' } });
			if (request.method === 'POST') {
				try {
					const data = await request.json() as AnakinData;
					if (!data.name || !data.experience || !data.skills) return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
					if ((data.education && data.education.length > 500) || (data.skills && data.skills.length > 500) || (data.experience && data.experience.length > 500)) {
						return new Response(JSON.stringify({ error: 'Input fields must be under 500 characters each.' }), { status: 400 });
					}
					
					const id = Math.random().toString(36).substring(2, 8);
					await env.SHORT_LINKS.put(id, JSON.stringify({ ...data, type: 'anakin', aiHydrated: false }), { expirationTtl: 259200 });
					return new Response(JSON.stringify({ id }), { headers: { 'Content-Type': 'application/json' } });
				} catch (_e) {
					return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
				}
			}
		}

		// 5. ANAKIN Hydration Route (AI Background Task)
		if (path.startsWith('/anakin/hydrate/')) {
			const id = path.split('/').pop();
			if (!id) return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });
			const value = await env.SHORT_LINKS.get(id);
			if (!value) return new Response(JSON.stringify({ error: 'Not Found' }), { status: 404 });

			try {
				if (!value.startsWith('{')) return new Response(JSON.stringify({ error: 'Invalid Type' }), { status: 400 });
				const data = JSON.parse(value);
				if (data.type !== 'anakin') return new Response(JSON.stringify({ error: 'Invalid Type' }), { status: 400 });
				if (data.aiHydrated) return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });

				// Perform AI Hydration with Hardened Format Instructions
				const aiResponse = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
					max_tokens: 250,
					temperature: 0.6,
					messages: [
						{ role: 'system', content: 'You are ANAKIN, Resume Architect. Your goal is to transform raw career data into elite narratives. IMPORTANT: You MUST wrap your response in [SUMMARY] and [EXPERIENCE] tags exactly as shown in the output format. No conversational filler.' },
						{ 
							role: 'user', 
							content: `[CONTEXT]\nTarget Role: ${data.job}\nAcademic Foundation: ${data.education}\nTechnical Arsenal: ${data.skills}\nRaw Field Data: ${data.experience}\n\n[DIRECTIVE]\n1. Write professional summary (MIN 20 WORDS, MAX 28 WORDS).\n2. Rewrite work history into 3 Action-Result bullet points (MIN 15 WORDS, MAX 20 WORDS PER BULLET) using high-impact action verbs.\n\n[OUTPUT FORMAT]\n[SUMMARY] (summary text here) [/SUMMARY]\n[EXPERIENCE] (3 bullet points here) [/EXPERIENCE]` 
						}					]
				}) as { response: string };

				const responseText = aiResponse.response || '';
				
				// DEFENSIVE EXTRACTION
				const summaryMatch = responseText.match(/\[SUMMARY\](.*?)\[\/SUMMARY\]/si);
				const experienceMatch = responseText.match(/\[EXPERIENCE\](.*?)\[\/EXPERIENCE\]/si);

				// Helper to strip tags and inject list spacing
				const cleanResult = (text: string) => {
					return text
						.replace(/\[\/?SUMMARY\]/gi, '')
						.replace(/\[\/?EXPERIENCE\]/gi, '')
						.replace(/(\n|^)[-•]\s?/g, '\n\n- ') // Inject spacing before bullet points
						.trim();
				};

				if (summaryMatch) {
					data.aiSummary = cleanResult(summaryMatch[1]);
				} else {
					const paragraphs = responseText.split('\n\n').filter(p => p.trim().length > 20);
					data.aiSummary = paragraphs[0] ? cleanResult(paragraphs[0]) : "Elite professional profile forged.";
				}

				if (experienceMatch) {
					data.aiExperience = cleanResult(experienceMatch[1]);
				} else {
					const paragraphs = responseText.split('\n\n').filter(p => p.trim().length > 20);
					data.aiExperience = paragraphs.length > 1 ? cleanResult(paragraphs.slice(1).join('\n\n')) : cleanResult(data.experience);
				}

				data.aiHydrated = true;

				await env.SHORT_LINKS.put(id, JSON.stringify(data), { expirationTtl: 259200 });
				return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
			} catch (_e) {
				return new Response(JSON.stringify({ error: 'Hydration failed' }), { status: 500 });
			}
		}

		// 6. Dynamic Redirection & Rendering
		if (path.length > 1) {
			const id = path.substring(1);
			let value = await env.SHORT_LINKS.get(id);
			
			// KV Resilience
			if (!value) {
				await new Promise(resolve => setTimeout(resolve, 500));
				value = await env.SHORT_LINKS.get(id);
			}

			if (value) {
				if (value.startsWith('http')) {
					try {
						return Response.redirect(value, 301);
					} catch (_e) {
						return new Response("Invalid redirect destination", { status: 400 });
					}
				} else if (value.startsWith('{')) {
					try {
						const data = JSON.parse(value);
						if (data.type === 'bazuka') {
							const handler = new BazukaHandler(data);
							return new HTMLRewriter()
								.on('#card-nickname', handler)
								.on('#card-job', handler)
								.on('#card-email', handler)
								.on('#card-website', handler)
								.on('#title-tag', handler)
								.on('#og-title', handler)
								.on('#twitter-title', handler)
								.on('#og-description', handler)
								.on('#twitter-description', handler)
								.transform(new Response(BAZUKA_CARD_TEMPLATE, { headers: { "Content-Type": "text/html" } }));
						}
						if (data.type === 'anakin') {
							const handler = new AnakinHandler(data);
							const res = new Response(ANAKIN_RESUME_TEMPLATE, { headers: { "Content-Type": "text/html" } });
							return new HTMLRewriter()
								.on('#res-name', handler)
								.on('#res-job', handler)
								.on('#res-email', handler)
								.on('#res-website', handler)
								.on('#res-summary', handler)
								.on('#res-experience', handler)
								.on('#res-education', handler)
								.on('#res-skills', handler)
								.on('#title-tag', handler)
								.on('#og-title', handler)
								.on('#twitter-title', handler)
								.on('#og-description', handler)
								.on('#twitter-description', handler)
								.transform(res);
						}
					} catch (_e) {
						// Malformed JSON fallback
					}
				}
			}
			return new Response("Link not found or expired", { status: 404 });
		}

		return new Response("Not Found", { status: 404 });
	},
};
