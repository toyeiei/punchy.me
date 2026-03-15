import { Env } from '../core/types';
import { BazukaHandler, AnakinHandler } from '../core/rewriters';
import { BAZUKA_CARD_TEMPLATE, ANAKIN_RESUME_TEMPLATE, YAIBA_VIEW_HTML, SYNC_ERROR_HTML } from '../ui';

export async function handleRender(request: Request, env: Env, path: string): Promise<Response> {
	if (request.method !== 'GET') return new Response('Method Not Allowed', { status: 405 });
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
