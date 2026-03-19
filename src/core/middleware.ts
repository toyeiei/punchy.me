/**
 * Request processing middleware pipeline
 * Eliminates duplicated handler boilerplate
 */

import { Env, PremiumTool } from './types';
import { ValidationResult } from './validation';
import { jsonResponse } from './utils';
import { checkRateLimit } from '../services/security';
import { ValidationError, AuthenticationError, RateLimitError, handleError } from './errors';
import { getCustomer } from './stripe';

export interface ParsedRequest<T> {
	data: T;
	ip: string;
}

/**
 * Extract customer ID from request (cookie or header)
 */
export function getCustomerIdFromRequest(request: Request): string | null {
	// Check cookie first
	const cookie = request.headers.get('cookie') || '';
	const customerIdMatch = cookie.match(/stripe_customer_id=([^;]+)/);
	if (customerIdMatch) {
		return customerIdMatch[1];
	}

	// Check header (for API clients)
	const headerCustomerId = request.headers.get('x-customer-id');
	if (headerCustomerId) {
		return headerCustomerId;
	}

	// Check query param (fallback)
	const url = new URL(request.url);
	return url.searchParams.get('customer_id');
}

/**
 * Premium access check result
 */
export interface PremiumAccessResult {
	hasAccess: boolean;
	customerId: string | null;
	reason?: string;
	customer?: {
		subscription?: { status: string };
		purchases: string[];
	};
}

/**
 * Check if request has premium access
 * Returns access status and customer info
 */
export async function checkPremiumAccess(
	request: Request,
	env: Env,
	tool?: PremiumTool
): Promise<PremiumAccessResult> {
	const customerId = getCustomerIdFromRequest(request);

	if (!customerId) {
		return { hasAccess: false, customerId: null, reason: 'no_customer_id' };
	}

	const customer = await getCustomer(env, customerId);
	if (!customer) {
		return { hasAccess: false, customerId, reason: 'customer_not_found' };
	}

	// Check subscription first (covers all tools)
	if (customer.subscription?.status === 'active' || customer.subscription?.status === 'trialing') {
		return {
			hasAccess: true,
			customerId,
			customer: {
				subscription: customer.subscription,
				purchases: Object.keys(customer.purchases),
			},
		};
	}

	// Check specific tool purchase
	if (tool && customer.purchases[tool]) {
		return {
			hasAccess: true,
			customerId,
			customer: {
				subscription: customer.subscription,
				purchases: Object.keys(customer.purchases),
			},
		};
	}

	return {
		hasAccess: false,
		customerId,
		reason: tool ? `no_access_to_${tool}` : 'no_subscription',
		customer: {
			subscription: customer.subscription,
			purchases: Object.keys(customer.purchases),
		},
	};
}

/**
 * Premium tool handler wrapper (backward compatible)
 * Only enforces premium access if STRIPE_SECRET_KEY is configured
 */
export async function handlePremiumRequest<T, R>(
	request: Request,
	env: Env,
	tool: PremiumTool,
	validator: (body: unknown) => ValidationResult<T>,
	handler: (data: T, ip: string, env: Env) => Promise<R>,
	options?: {
		rateLimit?: { key: string; limit: number; ttl?: number };
		skipHoneypot?: boolean;
	}
): Promise<Response> {
	try {
		// If Stripe is not configured, allow free access (backward compatible)
		if (!env.STRIPE_SECRET_KEY) {
			return handleValidatedRequest(request, env, validator, handler, options);
		}

		// Check premium access when Stripe is configured
		const access = await checkPremiumAccess(request, env, tool);
		
		if (!access.hasAccess) {
			// Return upgrade prompt instead of error
			return jsonResponse({
				error: 'premium_required',
				message: `This feature requires premium access. Visit /stripe/pricing to upgrade.`,
				tool,
				reason: access.reason,
				upgradeUrl: '/stripe/pricing',
			}, 402); // 402 Payment Required
		}

		// Proceed with normal validated request handling
		return handleValidatedRequest(request, env, validator, handler, options);

	} catch (error) {
		return handleError(error);
	}
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
		} catch (_e) {
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
