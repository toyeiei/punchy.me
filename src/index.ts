import { Env } from './core/types';
import { matchRoute, pureHandler, staticHandler, simpleHandler, Route } from './core/router';

// Handlers
import { handleShorten } from './handlers/shorten';
import { handleBazukaGet, handleBazukaPost } from './handlers/bazuka';
import { handleAnakinGet, handleAnakinPost, handleAnakinHydrate } from './handlers/anakin';
import { handleMusashiGet, handleMusashiForge } from './handlers/musashi';
import { handleYaibaGet, handleYaibaPublish } from './handlers/yaiba';
import { handleRagnarGet, handleRagnarForge } from './handlers/ragnar';
import { handleOdinGet, handleOdinAnalyze } from './handlers/odin';
import { handleFreyaGet, handleFreyaSearch } from './handlers/freya';
import { handleThorGet, handleThorForge, handleThorPdf } from './handlers/thor';
import { handleAsgardGet } from './handlers/asgard';
import { handleMarcusGet, handleMarcusPostGet, handleMarcusTagGet, handleMarcusRss } from './handlers/marcus';
import { handleMidgardGet, handleMidgardPublish, handleMidgardList, handleMidgardAITitles, handleMidgardAIExcerpt, handleMidgardAIPolish, handleMidgardAISeo } from './handlers/midgard';
import { handleHome, handleFavicon, handleRobots, handleSitemap } from './handlers/static';
import { handleRender } from './handlers/render';

// Services
import { validatePayloadSize } from './services/security';
import { withSecurityHeaders } from './core/security-headers';

/**
 * Declarative Route Table
 * Self-documenting, maintainable routing configuration
 */
const ROUTES: Route[] = [
	// Static assets
	{ method: 'GET', path: '/', handler: pureHandler(handleHome) },
	{ method: 'GET', path: '/favicon.ico', handler: pureHandler(handleFavicon) },
	{ method: 'GET', path: '/favicon.svg', handler: pureHandler(handleFavicon) },
	{ method: 'GET', path: '/robots.txt', handler: pureHandler(handleRobots) },
	{ method: 'GET', path: '/sitemap.xml', handler: pureHandler(handleSitemap) },
	
	// Shortener
	{ method: 'POST', path: '/shorten', handler: staticHandler(handleShorten) },
	
	// Tool pages (GET)
	{ method: 'GET', path: '/asgard', handler: simpleHandler(handleAsgardGet) },
	{ method: 'GET', path: '/bazuka', handler: pureHandler(handleBazukaGet) },
	{ method: 'GET', path: '/anakin', handler: pureHandler(handleAnakinGet) },
	{ method: 'GET', path: '/musashi', handler: pureHandler(handleMusashiGet) },
	{ method: 'GET', path: '/yaiba', handler: pureHandler(handleYaibaGet) },
	{ method: 'GET', path: '/ragnar', handler: pureHandler(handleRagnarGet) },
	{ method: 'GET', path: '/odin', handler: pureHandler(handleOdinGet) },
	{ method: 'GET', path: '/freya', handler: pureHandler(handleFreyaGet) },
	{ method: 'GET', path: '/thor', handler: pureHandler(handleThorGet) },
	{ method: 'GET', path: '/marcus', handler: simpleHandler(handleMarcusGet) },
	{ method: 'GET', path: '/marcus/rss', handler: simpleHandler(handleMarcusRss) },
	{ method: 'GET', path: '/midgard', handler: simpleHandler(handleMidgardGet) },
	{ method: 'GET', path: '/midgard/posts', handler: simpleHandler(handleMidgardList) },
	
	// Tool APIs (POST) - More specific routes MUST come before general ones
	{ method: 'POST', path: '/bazuka', handler: staticHandler(handleBazukaPost) },
	{ method: 'POST', path: /^\/anakin\/hydrate\/[a-zA-Z0-9-]+$/, handler: (req, env, _ctx, path) => handleAnakinHydrate(req, env, path) },
	{ method: 'POST', path: '/anakin', handler: staticHandler(handleAnakinPost) },
	{ method: 'POST', path: '/musashi/forge', handler: staticHandler(handleMusashiForge) },
	{ method: 'POST', path: '/yaiba/publish', handler: staticHandler(handleYaibaPublish) },
	{ method: 'POST', path: '/ragnar/forge', handler: staticHandler(handleRagnarForge) },
	{ method: 'POST', path: '/odin/analyze', handler: staticHandler(handleOdinAnalyze) },
	{ method: 'POST', path: '/thor/forge', handler: staticHandler(handleThorForge) },
	{ method: 'GET', path: /^\/thor\/pdf\/[a-zA-Z0-9]+$/, handler: (req, env, _ctx, path) => handleThorPdf(req, env, path) },
	
	// MARCUS blog routes
	{ method: 'GET', path: /^\/marcus\/tag\/[a-z0-9-]+$/, handler: (req, env, _ctx, path) => handleMarcusTagGet(req, env, path.replace('/marcus/tag/', '')) },
	{ method: 'GET', path: /^\/marcus\/[a-z0-9-]+$/, handler: (req, env, _ctx, path) => handleMarcusPostGet(req, env, path.replace('/marcus/', '')) },
	
	// Midgard editor routes (private)
	{ method: 'POST', path: '/midgard/publish', handler: staticHandler(handleMidgardPublish) },
	{ method: 'POST', path: '/midgard/ai/titles', handler: staticHandler(handleMidgardAITitles) },
	{ method: 'POST', path: '/midgard/ai/excerpt', handler: staticHandler(handleMidgardAIExcerpt) },
	{ method: 'POST', path: '/midgard/ai/polish', handler: staticHandler(handleMidgardAIPolish) },
	{ method: 'POST', path: '/midgard/ai/seo', handler: staticHandler(handleMidgardAISeo) },
	
	// Freya search (special GET with query params)
	{ method: 'GET', path: '/freya/search', handler: simpleHandler(handleFreyaSearch) },
];

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		const path = url.pathname;
		const method = request.method;

		// Global Security Hardening
		const payloadError = await validatePayloadSize(request);
		if (payloadError) return payloadError;

		// Route matching
		const handler = matchRoute(ROUTES, method, path);
		const response = handler 
			? await handler(request, env, ctx, path)
			: (path.length > 1 ? await handleRender(request, env, path) : new Response("Not Found", { status: 404 }));

		// Apply security headers to HTML responses
		return withSecurityHeaders(response);
	},
};
