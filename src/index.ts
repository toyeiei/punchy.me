import { Env } from './core/types';

// Handlers
import { handleShorten } from './handlers/shorten';
import { handleBazukaGet, handleBazukaPost } from './handlers/bazuka';
import { handleAnakinGet, handleAnakinPost, handleAnakinHydrate } from './handlers/anakin';
import { handleMusashiGet, handleMusashiForge } from './handlers/musashi';
import { handleYaibaGet, handleYaibaPublish } from './handlers/yaiba';
import { handleLokiGet, handleLokiTimeline, handleLokiSupport } from './handlers/loki';
import { handleOdinGet, handleOdinAnalyze } from './handlers/odin';
import { handleFreyaGet, handleFreyaSearch } from './handlers/freya';
import { handleAsgardGet } from './handlers/asgard';
import { handleHome, handleFavicon, handleRobots, handleSitemap } from './handlers/static';
import { handleRender } from './handlers/render';

// Services
import { validatePayloadSize } from './services/security';

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		const path = url.pathname;
		const method = request.method;

		// 0. Global Security Hardening
		const payloadError = validatePayloadSize(request);
		if (payloadError) return payloadError;

		// 1. Static Routes
		if (path === '/' && method === 'GET') return handleHome();
		if (path === '/favicon.ico' || path === '/favicon.svg') return handleFavicon();
		if (path === '/robots.txt') return handleRobots();
		if (path === '/sitemap.xml') return handleSitemap();

		// 2. Shortener API
		if (path === '/shorten' && method === 'POST') return handleShorten(request, env);

		// 3. GET Tool Routes
		if (path === '/asgard' && method === 'GET') return handleAsgardGet(request, env, ctx);
		if (path === '/bazuka' && method === 'GET') return handleBazukaGet();
		if (path === '/anakin' && method === 'GET') return handleAnakinGet();
		if (path === '/musashi' && method === 'GET') return handleMusashiGet();
		if (path === '/yaiba' && method === 'GET') return handleYaibaGet();
		if (path === '/loki' && method === 'GET') return handleLokiGet();
		if (path === '/odin' && method === 'GET') return handleOdinGet();
		if (path === '/freya' && method === 'GET') return handleFreyaGet();

		// 4. POST APIs & Dynamic Routes
		if (path === '/bazuka' && method === 'POST') return handleBazukaPost(request, env);
		if (path === '/anakin' && method === 'POST') return handleAnakinPost(request, env);
		if (path.startsWith('/anakin/hydrate/') && method === 'POST') return handleAnakinHydrate(request, env, path);
		if (path === '/musashi/forge' && method === 'POST') return handleMusashiForge(request, env);
		if (path === '/yaiba/publish' && method === 'POST') return handleYaibaPublish(request, env);
		if (path === '/loki/timeline' && method === 'GET') return handleLokiTimeline(request, env);
		if (path === '/loki/support' && method === 'POST') return handleLokiSupport(request, env);
		if (path === '/odin/analyze' && method === 'POST') return handleOdinAnalyze(request, env);
		if (path === '/freya/search' && method === 'GET') return handleFreyaSearch(request, env, ctx);

		// 5. Dynamic Redirection & Rendering
		if (path.length > 1) return handleRender(request, env, path);

		return new Response("Not Found", { status: 404 });
	},
};
