import { Env } from './core/types';
import { HTML } from './ui';

// Handlers
import { handleShorten } from './handlers/shorten';
import { handleBazukaGet, handleBazukaPost } from './handlers/bazuka';
import { handleAnakinGet, handleAnakinPost, handleAnakinHydrate } from './handlers/anakin';
import { handleMusashiGet, handleMusashiForge } from './handlers/musashi';
import { handleYaibaGet, handleYaibaPublish } from './handlers/yaiba';
import { handleLokiGet, handleLokiTimeline, handleLokiSupport } from './handlers/loki';
import { handleOdinGet, handleOdinAnalyze } from './handlers/odin';
import { handleRender } from './handlers/render';

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		const path = url.pathname;

		// 0. Global Security Hardening: Payload Size Limit (1MB)
		if (request.method === 'POST') {
			const contentLength = request.headers.get('content-length');
			if (contentLength && parseInt(contentLength, 10) > 1048576) {
				return new Response(JSON.stringify({ error: 'Payload too large (Limit: 1MB).' }), { status: 413, headers: { 'Content-Type': 'application/json' } });
			}
		}

		// 1. Static Routes
		if (path === '/' && request.method === 'GET') return new Response(HTML, { headers: { 'Content-Type': 'text/html', 'Link': '<https://fonts.googleapis.com>; rel=preconnect, <https://fonts.gstatic.com>; rel=preconnect, <https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double&family=JetBrains+Mono:wght@400;700&display=swap>; rel=preload; as=style' } });
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
		if (path === '/shorten' && request.method === 'POST') return handleShorten(request, env);

		// 3. GET Tool Routes
		if (path === '/bazuka' && request.method === 'GET') return handleBazukaGet();
		if (path === '/anakin' && request.method === 'GET') return handleAnakinGet();
		if (path === '/musashi' && request.method === 'GET') return handleMusashiGet();
		if (path === '/yaiba' && request.method === 'GET') return handleYaibaGet();
		if (path === '/loki' && request.method === 'GET') return handleLokiGet();
		if (path === '/odin' && request.method === 'GET') return handleOdinGet();

		// 4. POST APIs & Dynamic Routes
		if (path === '/bazuka' && request.method === 'POST') return handleBazukaPost(request, env);
		if (path === '/anakin' && request.method === 'POST') return handleAnakinPost(request, env);
		if (path.startsWith('/anakin/hydrate/') && request.method === 'POST') return handleAnakinHydrate(request, env, path);
		if (path === '/musashi/forge' && request.method === 'POST') return handleMusashiForge(request, env);
		if (path === '/yaiba/publish' && request.method === 'POST') return handleYaibaPublish(request, env);
		if (path === '/loki/timeline' && request.method === 'GET') return handleLokiTimeline(request, env);
		if (path === '/loki/support' && request.method === 'POST') return handleLokiSupport(request, env);
		if (path === '/odin/analyze' && request.method === 'POST') return handleOdinAnalyze(request, env);

		// 5. Dynamic Redirection & Rendering
		if (path.length > 1) return handleRender(request, env, path);

		return new Response("Not Found", { status: 404 });
	},
};
