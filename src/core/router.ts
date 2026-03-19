/**
 * Declarative routing table
 * Replaces flat if-chain with maintainable route definitions
 */

import { Env } from './types';

export type RouteHandler = (request: Request, env: Env, ctx: ExecutionContext, path: string) => Promise<Response> | Response;

export interface Route {
	method: 'GET' | 'POST' | 'DELETE';
	path: string | RegExp;
	handler: RouteHandler;
}

/**
 * Matches a request against route definitions
 * Supports exact string matches and regex patterns
 */
export function matchRoute(routes: Route[], method: string, path: string): RouteHandler | null {
	for (const route of routes) {
		if (route.method !== method) continue;
		
		if (typeof route.path === 'string') {
			if (route.path === path) return route.handler;
		} else {
			if (route.path.test(path)) return route.handler;
		}
	}
	return null;
}

/**
 * Simple route wrapper for handlers that don't need path parameter
 */
export function simpleHandler(fn: (request: Request, env: Env, ctx: ExecutionContext) => Promise<Response> | Response): RouteHandler {
	return (req, env, ctx, _path) => fn(req, env, ctx);
}

/**
 * Static route wrapper for handlers that only need request
 */
export function staticHandler(fn: (request: Request, env: Env) => Promise<Response> | Response): RouteHandler {
	return (req, env, _ctx, _path) => fn(req, env);
}

/**
 * No-param route wrapper for pure static responses
 */
export function pureHandler(fn: () => Promise<Response> | Response): RouteHandler {
	return (_req, _env, _ctx, _path) => fn();
}
