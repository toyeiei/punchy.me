import { Env } from '../core/types';
import { BazukaHandler, AnakinHandler } from '../core/rewriters';
import { BAZUKA_CARD_TEMPLATE, ANAKIN_RESUME_TEMPLATE, YAIBA_VIEW_HTML, RAGNAR_SLIDE_TEMPLATE, SYNC_ERROR_HTML } from '../ui';

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
						
						if (type === 'quote') {
							slidesHtml += `
								<section class="center slide-quote" data-transition="zoom">
									<blockquote>"${s.content}"</blockquote>
									<div class="quote-attribution">— RAGNAR'S COUNSEL</div>
								</section>`;
						} else if (type === 'bigtext') {
							slidesHtml += `
								<section class="center slide-bigtext" data-transition="fade">
									<h2>${s.header}</h2>
									<p>${s.content}</p>
								</section>`;
						} else if (type === 'comparison') {
							const parts = s.content.split(' | ');
							const left = parts[0] || 'Unknown';
							const right = parts[1] || 'Unknown';
							slidesHtml += `
								<section class="slide-comparison" data-transition="convex">
									<h2>${s.header}</h2>
									<div class="comparison-grid">
										<div class="comparison-box box-red">
											<h4 class="text-red">CURRENT STATE</h4>
											<p>${left}</p>
										</div>
										<div class="comparison-box box-green">
											<h4 class="text-green">VICTORY STATE</h4>
											<p>${right}</p>
										</div>
									</div>
								</section>`;
						} else {
							// DEFAULT: list
							slidesHtml += `<section data-transition="slide"><h2>${s.header}</h2><ul>`;
							const lines = s.content.split('\n');
							lines.forEach(l => {
								if (l.trim()) {
									slidesHtml += `<li>${l.trim().replace(/^•\s*/, '')}</li>`;
								}
							});
							slidesHtml += `</ul></section>`;
						}
					});
					
					const html = RAGNAR_SLIDE_TEMPLATE
						.replace(/{{TITLE}}/g, data.title)
						.replace(/{{AUDIENCE}}/g, data.audience)
						.replace(/{{SLIDES_HTML}}/g, slidesHtml);
						
					return new Response(html, { headers: { "Content-Type": "text/html" } });
				}
			} catch (_e) { /* fallback */ }
		}
		return new Response(SYNC_ERROR_HTML, { status: 404, headers: { 'Content-Type': 'text/html' } });
	}

	const id = path.startsWith('/y/') ? path.substring(3) : path.substring(1);
	let value = await env.SHORT_LINKS.get(id);

	if (!value) {
		await new Promise(r => setTimeout(r, 600)); 
		value = await env.SHORT_LINKS.get(id);
	}
	if (!value) {
		await new Promise(r => setTimeout(r, 1200)); 
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
					return new HTMLRewriter().on('#raw-data', { element(element: Element) { element.setInnerContent(value || '', { html: true }); } }).transform(new Response(YAIBA_VIEW_HTML, { headers: { "Content-Type": "text/html" } }));
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
