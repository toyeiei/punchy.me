import { Env, StripeCustomer, StripeSubscription, PremiumTool } from './types';
import { jsonResponse } from './utils';

const STRIPE_API_VERSION = '2023-10-16';

// Stripe API base URL
const STRIPE_API_URL = 'https://api.stripe.com/v1';

// Price ID Configuration - Set these in Stripe Dashboard
export const STRIPE_PRICES = {
	// One-time purchases per tool
	tools: {
		thor: 'price_thor_onetime',      // Replace with actual Stripe price ID
		marcus: 'price_marcus_onetime',  // Replace with actual Stripe price ID
		zeus: 'price_zeus_onetime',      // Replace with actual Stripe price ID
	} as Record<PremiumTool, string>,
	// Subscription plans
	subscriptions: {
		monthly: 'price_pro_monthly',    // Replace with actual Stripe price ID
		yearly: 'price_pro_yearly',      // Replace with actual Stripe price ID
	} as Record<'monthly' | 'yearly', string>,
} as const;

// Tool pricing (in cents)
export const TOOL_PRICES: Record<PremiumTool, number> = {
	thor: 999,    // $9.99
	marcus: 999,  // $9.99
	zeus: 999,    // $9.99
};

export const SUBSCRIPTION_PRICES = {
	monthly: 1900,  // $19.00/month
	yearly: 19000,  // $190.00/year (2 months free)
} as const;

/**
 * Make authenticated request to Stripe API
 */
async function stripeRequest(
	env: Env,
	method: string,
	endpoint: string,
	body?: string
): Promise<Response> {
	if (!env.STRIPE_SECRET_KEY) {
		return jsonResponse({ error: 'Stripe not configured' }, 500);
	}

	return fetch(`${STRIPE_API_URL}${endpoint}`, {
		method,
		headers: {
			'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`,
			'Stripe-Version': STRIPE_API_VERSION,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body,
	});
}

/**
 * Verify Stripe webhook signature using HMAC-SHA256
 * @see https://stripe.com/docs/webhooks/signatures
 */
export async function verifyWebhookSignature(
	payload: string,
	signature: string,
	secret: string
): Promise<boolean> {
	if (!signature || !secret) {
		return false;
	}

	// Parse the signature header
	const sigParts: Record<string, string> = {};
	for (const part of signature.split(',')) {
		const [key, value] = part.split('=');
		if (key && value) {
			sigParts[key] = value;
		}
	}

	const timestamp = sigParts['t'];
	const v1Signature = sigParts['v1'];

	if (!timestamp || !v1Signature) {
		return false;
	}

	// Check timestamp to prevent replay attacks (5 minute tolerance)
	const timestampMs = parseInt(timestamp, 10) * 1000;
	const toleranceMs = 5 * 60 * 1000; // 5 minutes
	if (Math.abs(Date.now() - timestampMs) > toleranceMs) {
		console.error('Stripe webhook timestamp outside tolerance');
		return false;
	}

	// Construct the signed payload string
	const signedPayload = `${timestamp}.${payload}`;

	// Compute HMAC-SHA256
	const encoder = new TextEncoder();
	const key = await crypto.subtle.importKey(
		'raw',
		encoder.encode(secret),
		{ name: 'HMAC', hash: 'SHA-256' },
		false,
		['sign']
	);

	const signatureBuffer = await crypto.subtle.sign(
		'HMAC',
		key,
		encoder.encode(signedPayload)
	);

	// Convert to hex string
	const computedSignature = Array.from(new Uint8Array(signatureBuffer))
		.map(b => b.toString(16).padStart(2, '0'))
		.join('');

	// Timing-safe comparison
	return timingSafeEqual(computedSignature, v1Signature);
}

/**
 * Timing-safe string comparison to prevent timing attacks
 */
function timingSafeEqual(a: string, b: string): boolean {
	if (a.length !== b.length) {
		return false;
	}

	let result = 0;
	for (let i = 0; i < a.length; i++) {
		result |= a.charCodeAt(i) ^ b.charCodeAt(i);
	}
	return result === 0;
}

/**
 * Parse and validate webhook event with signature verification
 */
export async function parseWebhookEvent(
	payload: string,
	signature: string,
	secret: string
): Promise<{ valid: boolean; event: unknown }> {
	// Verify signature
	const isValid = await verifyWebhookSignature(payload, signature, secret);

	if (!isValid) {
		return { valid: false, event: null };
	}

	// Parse JSON
	try {
		const event = JSON.parse(payload);
		return { valid: true, event };
	} catch {
		return { valid: false, event: null };
	}
}

/**
 * Create a checkout session for one-time payment
 * Uses price_data for dynamic pricing if no price ID configured
 */
export async function createCheckoutSession(
	env: Env,
	tool: PremiumTool,
	successUrl: string,
	cancelUrl: string,
	customerEmail?: string
): Promise<{ url: string; sessionId: string } | { error: string }> {
	const priceId = STRIPE_PRICES.tools[tool];
	const price = TOOL_PRICES[tool];

	const params = new URLSearchParams({
		'mode': 'payment',
		'success_url': successUrl,
		'cancel_url': cancelUrl,
		'payment_method_types[]': 'card',
		'allow_promotion_codes': 'true',
	});

	// Add customer email if provided (for better tracking)
	if (customerEmail) {
		params.set('customer_email', customerEmail);
	}

	// Use existing price ID if configured, otherwise create dynamic price
	if (priceId && !priceId.startsWith('price_')) {
		// Price ID not set, use price_data
		params.set('line_items[0][price_data][currency]', 'usd');
		params.set('line_items[0][price_data][unit_amount]', String(price));
		params.set('line_items[0][price_data][product_data][name]', `PUNCHY.ME - ${tool.toUpperCase()} Premium`);
		params.set('line_items[0][price_data][product_data][description]', `One-time purchase for ${tool} tool access`);
	} else {
		// Use configured price ID
		params.set('line_items[0][price]', priceId);
	}

	params.set('line_items[0][quantity]', '1');
	params.set('metadata[tool]', tool);
	params.set('metadata[type]', 'tool_purchase');

	const response = await stripeRequest(env, 'POST', '/checkout/sessions', params.toString());
	const data = await response.json() as Record<string, unknown>;

	if (data.error) {
		return { error: String((data.error as Record<string, unknown>).message) };
	}

	return { 
		url: String(data.url), 
		sessionId: String(data.id) 
	};
}

/**
 * Create a checkout session for subscription
 */
export async function createSubscriptionSession(
	env: Env,
	successUrl: string,
	cancelUrl: string,
	plan: 'monthly' | 'yearly' = 'monthly',
	customerEmail?: string
): Promise<{ url: string; sessionId: string } | { error: string }> {
	const priceId = STRIPE_PRICES.subscriptions[plan];

	const params = new URLSearchParams({
		'mode': 'subscription',
		'success_url': successUrl,
		'cancel_url': cancelUrl,
		'payment_method_types[]': 'card',
		'allow_promotion_codes': 'true',
		'line_items[0][price]': priceId,
		'line_items[0][quantity]': '1',
		'metadata[plan]': plan,
		'metadata[type]': 'subscription',
	});

	// Add customer email if provided
	if (customerEmail) {
		params.set('customer_email', customerEmail);
	}

	const response = await stripeRequest(env, 'POST', '/checkout/sessions', params.toString());
	const data = await response.json() as Record<string, unknown>;

	if (data.error) {
		return { error: String((data.error as Record<string, unknown>).message) };
	}

	return { 
		url: String(data.url),
		sessionId: String(data.id)
	};
}

/**
 * Create customer portal session
 */
export async function createPortalSession(
	env: Env,
	customerId: string,
	returnUrl: string
): Promise<{ url: string } | { error: string }> {
	const params = new URLSearchParams({
		'customer': customerId,
		'return_url': returnUrl,
	});

	const response = await stripeRequest(env, 'POST', '/billing_portal/sessions', params.toString());
	const data = await response.json() as Record<string, unknown>;

	if (data.error) {
		return { error: String((data.error as Record<string, unknown>).message) };
	}

	return { url: String(data.url) };
}

/**
 * Retrieve subscription details
 */
export async function getSubscription(
	env: Env,
	subscriptionId: string
): Promise<StripeSubscription | null> {
	const response = await stripeRequest(env, 'GET', `/subscriptions/${subscriptionId}`);
	const data = await response.json() as Record<string, unknown>;

	if (data.error) {
		return null;
	}

	return {
		id: String(data.id),
		status: String(data.status) as StripeSubscription['status'],
		currentPeriodStart: Number(data.current_period_start) * 1000,
		currentPeriodEnd: Number(data.current_period_end) * 1000,
		cancelAtPeriodEnd: Boolean(data.cancel_at_period_end),
	};
}

/**
 * Store customer data in KV
 */
export async function saveCustomer(
	env: Env,
	customerId: string,
	customer: StripeCustomer
): Promise<void> {
	await env.SHORT_LINKS.put(`stripe:customer:${customerId}`, JSON.stringify(customer));
}

/**
 * Get customer data from KV
 */
export async function getCustomer(
	env: Env,
	customerId: string
): Promise<StripeCustomer | null> {
	const data = await env.SHORT_LINKS.get(`stripe:customer:${customerId}`);
	return data ? JSON.parse(data) : null;
}

/**
 * Check if user has access to a premium tool
 */
export async function checkToolAccess(
	env: Env,
	customerId: string | null,
	tool: PremiumTool
): Promise<boolean> {
	// If no customer ID, check by IP (simpler approach)
	if (!customerId) {
		return false;
	}

	const customer = await getCustomer(env, customerId);
	if (!customer) {
		return false;
	}

	// Check subscription
	if (customer.subscription?.status === 'active' || customer.subscription?.status === 'trialing') {
		return true;
	}

	// Check one-time purchase
	return !!customer.purchases[tool];
}

/**
 * Check if user has pro subscription
 */
export async function checkProAccess(
	env: Env,
	customerId: string | null
): Promise<boolean> {
	if (!customerId) {
		return false;
	}

	const customer = await getCustomer(env, customerId);
	if (!customer?.subscription) {
		return false;
	}

	return customer.subscription.status === 'active' || customer.subscription.status === 'trialing';
}

/**
 * Grant tool purchase to customer
 */
export async function grantToolPurchase(
	env: Env,
	customerId: string,
	tool: PremiumTool
): Promise<void> {
	let customer = await getCustomer(env, customerId);
	if (!customer) {
		customer = {
			id: customerId,
			email: '',
			createdAt: Date.now(),
			purchases: {},
		};
	}

	customer.purchases[tool] = Date.now();
	await saveCustomer(env, customerId, customer);
}

/**
 * Grant subscription to customer
 */
export async function grantSubscription(
	env: Env,
	customerId: string,
	subscription: StripeSubscription
): Promise<void> {
	let customer = await getCustomer(env, customerId);
	if (!customer) {
		customer = {
			id: customerId,
			email: '',
			createdAt: Date.now(),
			purchases: {},
		};
	}

	customer.subscription = subscription;
	await saveCustomer(env, customerId, customer);
}

/**
 * Revoke subscription from customer
 */
export async function revokeSubscription(
	env: Env,
	customerId: string
): Promise<void> {
	const customer = await getCustomer(env, customerId);
	if (customer) {
		customer.subscription = undefined;
		await saveCustomer(env, customerId, customer);
	}
}
