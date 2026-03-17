/**
 * Rendering strategies for different content types
 * Extracted from the monolithic render.ts god function
 */

import { BazukaHandler, AnakinHandler } from './rewriters';
import { BAZUKA_CARD_TEMPLATE, ANAKIN_RESUME_TEMPLATE, YAIBA_VIEW_HTML, RAGNAR_SLIDE_HEADER, RAGNAR_SLIDE_FOOTER, SYNC_ERROR_HTML } from '../ui';
import { escapeHTML } from './utils';
import { RagnarSlide, BazukaData, AnakinData } from './types';

/**
 * Renders Bazuka business card using HTMLRewriter
 */
export function renderBazuka(data: unknown): Response {
	const handler = new BazukaHandler(data as BazukaData);
	return new HTMLRewriter()
		.on('#card-nickname', handler)
		.on('#card-job', handler)
		.on('#card-email', handler)
		.on('#card-website', handler)
		.on('#card-email-link', handler)
		.on('#card-website-link', handler)
		.on('#title-tag', handler)
		.on('#og-title', handler)
		.on('#twitter-title', handler)
		.on('#og-description', handler)
		.on('#twitter-description', handler)
		.transform(new Response(BAZUKA_CARD_TEMPLATE, { headers: { "Content-Type": "text/html" } }));
}

/**
 * Renders Anakin resume using HTMLRewriter
 */
export function renderAnakin(data: unknown): Response {
	const handler = new AnakinHandler(data as AnakinData);
	return new HTMLRewriter()
		.on('#res-name', handler)
		.on('#res-job', handler)
		.on('#res-email', handler)
		.on('#res-website', handler)
		.on('#res-email-link', handler)
		.on('#res-website-link', handler)
		.on('#res-summary', handler)
		.on('#res-experience', handler)
		.on('#res-education', handler)
		.on('#res-skills', handler)
		.on('#title-tag', handler)
		.on('#og-title', handler)
		.on('#twitter-title', handler)
		.on('#og-description', handler)
		.on('#twitter-description', handler)
		.transform(new Response(ANAKIN_RESUME_TEMPLATE, { headers: { "Content-Type": "text/html" } }));
}

/**
 * Renders Yaiba note viewer
 */
export function renderYaiba(rawValue: string): Response {
	return new HTMLRewriter()
		.on('#raw-data', {
			element(element: Element) {
				element.setInnerContent(rawValue);
			}
		})
		.transform(new Response(YAIBA_VIEW_HTML, { headers: { "Content-Type": "text/html" } }));
}

/**
 * Renders a single Ragnar slide based on type
 */
function renderSlide(slide: RagnarSlide): string {
	const type = slide.type || 'list';
	
	// BIGTEXT: High-impact hero statement
	if (type === 'bigtext' || type === 'opening' || type === 'closing') {
		return `
			<section class="slide-bigtext">
				<div class="slide-container">
					<h2 class="hero-statement">${escapeHTML(slide.content)}</h2>
					${slide.header ? `<p class="hero-subtitle">${escapeHTML(slide.header)}</p>` : ''}
				</div>
			</section>`;
	}
	
	// QUOTE: Cinematic blockquote
	if (type === 'quote' || type === 'challenge') {
		return `
			<section class="slide-quote">
				<div class="slide-container">
					<div class="quote-glass">
						<p class="quote-text">"${escapeHTML(slide.content)}"</p>
						${slide.header ? `<p class="quote-author">— ${escapeHTML(slide.header)}</p>` : ''}
					</div>
				</div>
			</section>`;
	}
	
	// LIST: Tactical bullet points
	if (type === 'list' || type === 'points' || type === 'action') {
		const bullets = slide.content.split('\n')
			.filter(l => l.trim())
			.map(l => `<li>${escapeHTML(l.trim().replace(/^[•▸-]\s*/, ''))}</li>`)
			.join('');
		
		return `
			<section class="slide-list">
				<div class="slide-container">
					<h2>${escapeHTML(slide.header)}</h2>
					<ul>${bullets}</ul>
				</div>
			</section>`;
	}
	
	// COMPARISON: Before/After grid
	if (type === 'comparison' || type === 'solution') {
		const parts = slide.content.split(' | ');
		const left = escapeHTML(parts[0] || 'Current State');
		const right = escapeHTML(parts[1] || 'Future State');
		
		return `
			<section class="slide-comparison">
				<div class="slide-container">
					<h2>${escapeHTML(slide.header)}</h2>
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
	
	// Fallback to list
	return renderSlide({ ...slide, type: 'list' });
}

/**
 * Renders Ragnar presentation slides
 */
export function renderRagnar(data: { title: string; audience: string; slides: RagnarSlide[] }): Response {
	const slidesHtml = data.slides.map(renderSlide).join('');
	const html = RAGNAR_SLIDE_HEADER
		.replace(/{{TITLE}}/g, escapeHTML(data.title))
		.replace(/{{AUDIENCE}}/g, escapeHTML(data.audience)) + slidesHtml + RAGNAR_SLIDE_FOOTER;
	
	return new Response(html, { headers: { "Content-Type": "text/html" } });
}

/**
 * 404 error page for missing content
 */
export function renderNotFound(): Response {
	return new Response(SYNC_ERROR_HTML, { status: 404, headers: { 'Content-Type': 'text/html' } });
}

/**
 * Yaiba-specific resyncing page (eventual consistency retry)
 */
export function renderYaibaResyncing(): Response {
	const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>RESYNCING | YAIBA</title><style>body{background:#000;color:#22c55e;font-family:monospace;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;} .msg{letter-spacing:2px; animation:pulse 1.5s infinite alternate;} @keyframes pulse{from{opacity:0.4} to{opacity:1}}</style><script>setTimeout(()=>location.reload(), 1500)</script></head><body><div class="msg">[ RESYNCING SHADOW NODE... ]</div></body></html>`;
	return new Response(html, { status: 404, headers: { 'Content-Type': 'text/html' } });
}
