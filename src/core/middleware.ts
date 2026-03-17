/**
 * Request processing middleware pipeline
 * Eliminates duplicated handler boilerplate
 */

import { Env } from './types';
import { ValidationResult } from './validation';
import { jsonResponse } from './utils';
import { checkRateLimit } from '../services/security';
import { ValidationError, AuthenticationError, RateLimitError, handleError } from './errors';

export interface ParsedRequest<T> {
	data: T;
	ip: string;
}

/**
 * Generic POST request handler with validation pipeline
 * Handles: JSON parsing -> validation -> honeypot check -> rate limiting
 */
export async function handleValidatedRequest<T, R>(
	request: Request,
	env: Env,
	validator: (body: unknown) => ValidationResult<T>,
	handler: (data: T, ip: string, env: Env) => Promise<R>,
	options?: {
		rateLimit?: { key: string; limit: number; ttl?: number };
		skipHoneypot?: boolean;
	}
): Promise<Response> {
	try {
		let body: unknown;
		try {
			body = await request.json();
		} catch (parseError) {
			throw new ValidationError('Invalid request');
		}
		
		const validation = validator(body);

		if (!validation.success) {
			if (validation.requiresAuth) {
				throw new AuthenticationError(validation.error || 'Authentication required');
			}
			throw new ValidationError(validation.error || 'Invalid request');
		}

		const { hp_field, ...cleanData } = validation.data as T & { hp_field?: string };

		if (!options?.skipHoneypot && hp_field) {
			throw new AuthenticationError('Bot detected.');
		}

		const ip = request.headers.get('cf-connecting-ip') || 'anonymous';

		if (options?.rateLimit) {
			const { key, limit, ttl } = options.rateLimit;
			const allowed = await checkRateLimit(env, `rl:${key}:${ip}`, limit, ttl);
			if (!allowed) {
				throw new RateLimitError();
			}
		}

		const result = await handler(cleanData as T, ip, env);
		return jsonResponse(result);

	} catch (error) {
		return handleError(error);
	}
}

/**
 * Stateless AI handler (no KV storage, returns JSON directly)
 */
export async function handleAIRequest<T, R>(
	request: Request,
	env: Env,
	validator: (body: unknown) => ValidationResult<T>,
	handler: (data: T, ip: string, env: Env) => Promise<R>,
	rateLimitKey: string,
	rateLimitCount: number = 5
): Promise<Response> {
	return handleValidatedRequest(request, env, validator, handler, {
		rateLimit: { key: rateLimitKey, limit: rateLimitCount }
	});
}
