import { Env, PremiumTool, PREMIUM_TOOLS } from '../core/types';
import { renderStripeCheckout, renderStripeSuccess } from '../ui/stripe';
import { 
	createCheckoutSession, 
	createSubscriptionSession, 
	createPortalSession,
	parseWebhookEvent,
	grantToolPurchase,
	grantSubscription,
	revokeSubscription,
	getCustomer,
	checkProAccess,
	checkToolAccess
} from '../core/stripe';
import { jsonResponse } from '../core/utils';

/**
 * Handle GET /stripe/checkout
 * Create checkout session for premium tool or subscription
 */
export async function handleStripeCheckout(request: Request, env: Env): Promise<Response> {
	const url = new URL(request.url);
	const tool = url.searchParams.get('tool') as PremiumTool | null;
	const plan = url.searchParams.get('plan') as 'monthly' | 'yearly' | null;

	const successUrl = `${url.origin}/stripe/success?tool=${tool || ''}&plan=${plan || ''}`;
	const cancelUrl = `${url.origin}${tool ? `/${tool}` : '/zinsser'}`;

	let result;
	if (plan) {
		// Subscription checkout
		result = await createSubscriptionSession(env, successUrl, cancelUrl, plan);
	} else if (tool && PREMIUM_TOOLS.includes(tool)) {
		// One-time tool purchase
		result = await createCheckoutSession(env, tool, successUrl, cancelUrl);
	} else {
		return jsonResponse({ error: 'Invalid checkout parameters' }, 400);
	}

	if ('error' in result) {
		return jsonResponse({ error: result.error }, 500);
	}

	// Redirect to Stripe
	return Response.redirect(result.url, 303);
}

/**
 * Handle GET /stripe/success
 * Show success page after payment
 */
export async function handleStripeSuccess(_request: Request, _env: Env): Promise<Response> {
	return new Response(renderStripeSuccess(), {
		headers: { 'Content-Type': 'text/html' },
	});
}

/**
 * Handle GET /stripe/portal
 * Create and redirect to customer portal
 */
export async function handleStripePortal(request: Request, env: Env): Promise<Response> {
	const url = new URL(request.url);
	const customerId = url.searchParams.get('customer_id');
	const returnUrl = url.searchParams.get('return_url') || url.origin;

	if (!customerId) {
		return jsonResponse({ error: 'customer_id required' }, 400);
	}

	const result = await createPortalSession(env, customerId, returnUrl);

	if ('error' in result) {
		return jsonResponse({ error: result.error }, 500);
	}

	return Response.redirect(result.url, 303);
}

/**
 * Handle POST /stripe/webhook
 * Process Stripe webhook events with proper signature verification
 */
export async function handleStripeWebhook(request: Request, env: Env): Promise<Response> {
	const signature = request.headers.get('stripe-signature') || '';
	const payload = await request.text();

	if (!env.STRIPE_WEBHOOK_SECRET) {
		console.error('Stripe webhook: STRIPE_WEBHOOK_SECRET not configured');
		return jsonResponse({ error: 'Webhook not configured' }, 500);
	}

	// Verify signature and parse event
	const { valid, event } = await parseWebhookEvent(payload, signature, env.STRIPE_WEBHOOK_SECRET);

	if (!valid || !event) {
		console.error('Stripe webhook: Invalid signature or payload');
		return jsonResponse({ error: 'Invalid signature or payload' }, 400);
	}

	const eventType = (event as Record<string, unknown>).type as string;
	const data = ((event as Record<string, unknown>).data as Record<string, unknown>)?.object as Record<string, unknown> || {};

	console.log('Stripe webhook received:', eventType);

	try {
		switch (eventType) {
			case 'checkout.session.completed': {
				const customerId = String(data.customer);
				const customerEmail = String(data.customer_email || '');
				const metadata = data.metadata as Record<string, string> || {};
				const mode = String(data.mode);

				// Check if this was a subscription or one-time payment
				if (mode === 'subscription') {
					const subscriptionId = String(data.subscription);
					const subscription = {
						id: subscriptionId,
						status: 'active' as const,
						currentPeriodStart: Date.now(),
						currentPeriodEnd: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
						cancelAtPeriodEnd: false,
					};
					await grantSubscription(env, customerId, subscription);
					
					// Update customer email if provided
					const customer = await getCustomer(env, customerId);
					if (customer && customerEmail) {
						customer.email = customerEmail;
						await saveCustomerDirect(env, customerId, customer);
					}
					
					console.log('Stripe: Subscription granted to', customerId);
				} else if (metadata.tool) {
					// One-time tool purchase
					await grantToolPurchase(env, customerId, metadata.tool as PremiumTool);
					console.log('Stripe: Tool purchase granted:', metadata.tool, 'to', customerId);
				}
				break;
			}

			case 'customer.subscription.created':
			case 'customer.subscription.updated': {
				const subscriptionId = String(data.id);
				const customerId = String(data.customer);
				const status = String(data.status);
				const currentPeriodStart = Number(data.current_period_start) * 1000;
				const currentPeriodEnd = Number(data.current_period_end) * 1000;
				const cancelAtPeriodEnd = Boolean(data.cancel_at_period_end);

				const subscription = {
					id: subscriptionId,
					status: status as 'active' | 'trialing' | 'past_due' | 'canceled',
					currentPeriodStart,
					currentPeriodEnd,
					cancelAtPeriodEnd,
				};

				await grantSubscription(env, customerId, subscription);
				console.log('Stripe: Subscription updated for', customerId, 'status:', status);
				break;
			}

			case 'customer.subscription.deleted': {
				const customerId = String(data.customer);
				await revokeSubscription(env, customerId);
				console.log('Stripe: Subscription revoked for', customerId);
				break;
			}

			case 'invoice.payment_failed': {
				const customerId = String(data.customer);
				// Log but don't revoke immediately - give user chance to update payment
				console.log('Stripe: Payment failed for', customerId, '- access retained for grace period');
				break;
			}

			case 'invoice.paid': {
				const customerId = String(data.customer);
				console.log('Stripe: Invoice paid for', customerId);
				break;
			}

			default:
				console.log('Stripe: Unhandled event type:', eventType);
		}

		return jsonResponse({ received: true }, 200);
	} catch (error) {
		console.error('Stripe webhook processing error:', error);
		return jsonResponse({ error: 'Webhook processing failed' }, 500);
	}
}

// Helper to save customer directly (used in webhook handler)
async function saveCustomerDirect(env: Env, customerId: string, customer: unknown): Promise<void> {
	await env.SHORT_LINKS.put(`stripe:customer:${customerId}`, JSON.stringify(customer));
}

/**
 * Handle GET /stripe/status
 * Check user's access status
 */
export async function handleStripeStatus(request: Request, env: Env): Promise<Response> {
	const url = new URL(request.url);
	const customerId = url.searchParams.get('customer_id');
	const tool = url.searchParams.get('tool') as PremiumTool | null;

	if (!customerId) {
		return jsonResponse({ error: 'customer_id required' }, 400);
	}

	const customer = await getCustomer(env, customerId);

	if (!customer) {
		return jsonResponse({ 
			hasAccess: false, 
			reason: 'no_customer' 
		}, 200);
	}

	const hasAccess = tool
		? await checkToolAccess(env, customerId, tool)
		: await checkProAccess(env, customerId);

	return jsonResponse({
		hasAccess,
		customer: {
			id: customer.id,
			subscription: customer.subscription ? {
				status: customer.subscription.status,
				currentPeriodEnd: customer.subscription.currentPeriodEnd,
			} : null,
			purchases: Object.keys(customer.purchases),
		},
	}, 200);
}

/**
 * Handle GET /stripe/pricing
 * Show pricing page
 */
export async function handleStripePricing(_request: Request, _env: Env): Promise<Response> {
	return new Response(renderStripeCheckout(), {
		headers: { 'Content-Type': 'text/html' },
	});
}
