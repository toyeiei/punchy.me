import { Env } from '../core/types';
import { BazukaHandler, AnakinHandler } from '../core/rewriters';
import { BAZUKA_CARD_TEMPLATE, ANAKIN_RESUME_TEMPLATE, YAIBA_VIEW_HTML, RAGNAR_SLIDE_HEADER, RAGNAR_SLIDE_FOOTER, SYNC_ERROR_HTML } from '../ui';
import { escapeHTML } from '../core/utils';

export async function handleRender(request: Request, env: Env, path: string): Promise<Response> {
	if (request.method !== 'GET') return new Response('Method Not Allowed', { status: 405 });
	// Check for Ragnar slide route first
	if (path.startsWith('/ragnar/slide/')) {
		const id = path.substring(14);
		const value = await env.SHORT_LINKS.get(id);
		if (value) {
			try {
				const data = JSON.parse(value);
				if (data.type === 'ragnar') {
					let slidesHtml = '';
					data.slides.forEach((s: import('../core/types').RagnarSlide) => {
						const type = s.type || 'list';
						
						// 1. BIGTEXT: High-impact hero statement
						if (type === 'bigtext' || type === 'opening' || type === 'closing') {
							slidesHtml += `
								<section class="slide-bigtext">
									<div class="slide-container">
										<h2 class="hero-statement">${escapeHTML(s.content)}</h2>
										${s.header ? `<p class="hero-subtitle">${escapeHTML(s.header)}</p>` : ''}
									</div>
								</section>`;
						}
						
						// 2. QUOTE: Cinematic blockquote
						else if (type === 'quote' || type === 'challenge') {
							slidesHtml += `
								<section class="slide-quote">
									<div class="slide-container">
										<div class="quote-glass">
											<p class="quote-text">"${escapeHTML(s.content)}"</p>
											${s.header ? `<p class="quote-author">— ${escapeHTML(s.header)}</p>` : ''}
										</div>
									</div>
								</section>`;
						}
						
						// 3. LIST: Tactical bullet points
						else if (type === 'list' || type === 'points' || type === 'action') {
							slidesHtml += `
								<section class="slide-list">
									<div class="slide-container">
										<h2>${escapeHTML(s.header)}</h2>
										<ul>`;
							const lines = s.content.split('\n');
							lines.forEach(l => {
								if (l.trim()) {
									slidesHtml += `<li>${escapeHTML(l.trim().replace(/^[•▸-]\s*/, ''))}</li>`;
								}
							});
							slidesHtml += `</ul></div></section>`;
						}
						
						// 4. COMPARISON: Before/After grid
						else if (type === 'comparison' || type === 'solution') {
							const parts = s.content.split(' | ');
							const left = escapeHTML(parts[0] || 'Current State');
							const right = escapeHTML(parts[1] || 'Future State');
							slidesHtml += `
								<section class="slide-comparison">
									<div class="slide-container">
										<h2>${escapeHTML(s.header)}</h2>
										<div class="comparison-grid">
											<div class="comparison-box box-red">
												<h4 class="text-red">BEFORE</h4>
												<p>${left}</p>
											</div>
											<div class="comparison-box box-green">
												<h4 class="text-green">AFTER</h4>
												<p>${right}</p>
											</div>
										</div>
									</div>
								</section>`;
						}
					});
					
					const html = RAGNAR_SLIDE_HEADER.replace(/{{TITLE}}/g, escapeHTML(data.title)).replace(/{{AUDIENCE}}/g, escapeHTML(data.audience)) + slidesHtml + RAGNAR_SLIDE_FOOTER;
						
					return new Response(html, { headers: { "Content-Type": "text/html" } });
				}
			} catch (_e) { /* fallback */ }
		}
		return new Response(SYNC_ERROR_HTML, { status: 404, headers: { 'Content-Type': 'text/html' } });
	}

	const id = path.startsWith('/y/') ? path.substring(3) : path.substring(1);
	let value = await env.SHORT_LINKS.get(id);

	// Only retry for /y/ (Yaiba) paths where eventual consistency is expected
	if (!value && path.startsWith('/y/')) {
		await new Promise(r => setTimeout(r, 300));
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
					return new HTMLRewriter().on('#res-name', handler).on('#res-job', handler).on('#res-email', handler).on('#res-website', handler).on('#res-email-link', handler).on('#res-website-link', handler).on('#res-summary', handler).on('#res-experience', handler).on('#res-education', handler).on('#res-skills', handler).on('#title-tag', handler).on('#og-title', handler).on('#twitter-title', handler).on('#og-description', handler).on('#twitter-description', handler).transform(new Response(ANAKIN_RESUME_TEMPLATE, { headers: { "Content-Type": "text/html" } }));
				}
				if (data.type === 'yaiba') {
					return new HTMLRewriter().on('#raw-data', { element(element: Element) { element.setInnerContent(value || ''); } }).transform(new Response(YAIBA_VIEW_HTML, { headers: { "Content-Type": "text/html" } }));
				}
			} catch (_e) {
				// Malformed JSON fallback
			}
		}
	}

	if (path.startsWith('/y/')) {
		return new Response(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>RESYNCING | YAIBA</title><style>body{background:#000;color:#22c55e;font-family:monospace;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;} .msg{letter-spacing:2px; animation:pulse 1.5s infinite alternate;} @keyframes pulse{from{opacity:0.4} to{opacity:1}}</style><script>setTimeout(()=>location.reload(), 1500)</script></head><body><div class="msg">[ RESYNCING SHADOW NODE... ]</div></body></html>`, { status: 404, headers: { 'Content-Type': 'text/html' } });
	}

	return new Response(SYNC_ERROR_HTML, { status: 404, headers: { 'Content-Type': 'text/html' } });
}
