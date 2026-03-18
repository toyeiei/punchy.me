import { Env, ZinsserSubscriber } from '../core/types';
import { renderZinsserLanding, renderZinsserSuccess, renderZinsserConfirm, renderZinsserUnsubscribe } from '../ui/zinsser';
import { sendConfirmationEmail, sendEmail } from '../services/resend';
import { jsonResponse } from '../core/utils';

/**
 * Handle GET /zinsser
 * Renders the newsletter landing page
 */
export async function handleZinsserGet(_request: Request, _env: Env): Promise<Response> {
	return new Response(renderZinsserLanding(), {
		headers: { 'Content-Type': 'text/html' },
	});
}

/**
 * Handle POST /zinsser/subscribe
 * Processes new subscription requests
 */
export async function handleZinsserSubscribe(request: Request, env: Env): Promise<Response> {
	try {
		const formData = await request.formData();
		const email = formData.get('email')?.toString().trim().toLowerCase();

		if (!email || !email.includes('@')) {
			return new Response('Invalid email address provided.', { status: 400 });
		}

		const kvKey = `zinsser:sub:${email}`;
		const existing = await env.SHORT_LINKS.get(kvKey);
		
		if (existing) {
			const sub = JSON.parse(existing) as ZinsserSubscriber;
			if (sub.status === 'active') {
				// Already active, just show success page as a confirmation
				return new Response(renderZinsserSuccess(email), {
					headers: { 'Content-Type': 'text/html' },
				});
			}
		}

		const token = crypto.randomUUID();
		const subscriber: ZinsserSubscriber = {
			type: 'zinsser:sub',
			email,
			status: 'pending',
			token,
			subscribedAt: Date.now(),
		};

		// Atomic store in KV
		await env.SHORT_LINKS.put(kvKey, JSON.stringify(subscriber));
		
		// Send confirmation email via Resend
		const emailResult = await sendConfirmationEmail(env, email, token);
		
		if (!emailResult.success) {
			console.error('Zinsser: Failed to send confirmation email:', emailResult.error);
			// We proceed to show the success page but the user might not get the email if RESEND is misconfigured
		}

		return new Response(renderZinsserSuccess(email), {
			headers: { 'Content-Type': 'text/html' },
		});
	} catch (error) {
		console.error('Zinsser: Subscription error:', error);
		return new Response('Internal Server Error', { status: 500 });
	}
}

/**
 * Handle GET /zinsser/confirm
 * Activates a pending subscription via token verification
 */
export async function handleZinsserConfirm(request: Request, env: Env): Promise<Response> {
	const url = new URL(request.url);
	const email = url.searchParams.get('email')?.toLowerCase();
	const token = url.searchParams.get('token');

	if (!email || !token) {
		return new Response('Invalid or incomplete confirmation link.', { status: 400 });
	}

	const kvKey = `zinsser:sub:${email}`;
	const existing = await env.SHORT_LINKS.get(kvKey);

	if (!existing) {
		return new Response('Subscriber not found. Please try subscribing again.', { status: 404 });
	}

	const sub = JSON.parse(existing) as ZinsserSubscriber;

	if (sub.token !== token) {
		return new Response('Security token mismatch. Please request a new confirmation link.', { status: 403 });
	}

	if (sub.status !== 'active') {
		sub.status = 'active';
		sub.confirmedAt = Date.now();
		await env.SHORT_LINKS.put(kvKey, JSON.stringify(sub));
	}

	return new Response(renderZinsserConfirm(), {
		headers: { 'Content-Type': 'text/html' },
	});
}

/**
 * Handle GET /zinsser/unsubscribe
 * Deactivates a subscription
 */
export async function handleZinsserUnsubscribe(request: Request, env: Env): Promise<Response> {
	const url = new URL(request.url);
	const email = url.searchParams.get('email')?.toLowerCase();
	const token = url.searchParams.get('token');

	if (!email || !token) {
		return new Response('Invalid unsubscribe link.', { status: 400 });
	}

	const kvKey = `zinsser:sub:${email}`;
	const existing = await env.SHORT_LINKS.get(kvKey);

	if (existing) {
		const sub = JSON.parse(existing) as ZinsserSubscriber;
		if (sub.token === token) {
			sub.status = 'unsubscribed';
			await env.SHORT_LINKS.put(kvKey, JSON.stringify(sub));
		}
	}

	return new Response(renderZinsserUnsubscribe(), {
		headers: { 'Content-Type': 'text/html' },
	});
}

/**
 * Handle POST /zinsser/broadcast
 * Sends an email to all active subscribers (Admin only)
 */
export async function handleZinsserBroadcast(request: Request, env: Env): Promise<Response> {
	if (request.method !== 'POST') {
		return new Response('Method Not Allowed', { status: 405 });
	}

	const auth = request.headers.get('Authorization');
	if (!env.ZINSSER_ADMIN_KEY || auth !== `Bearer ${env.ZINSSER_ADMIN_KEY}`) {
		return new Response('Unauthorized Signal. Authentication failed.', { status: 401 });
	}

	try {
		const { title, content } = await request.json() as { title: string; content: string };

		if (!title || !content) {
			return new Response('Missing title or content.', { status: 400 });
		}

		// Fetch all active subscribers
		const activeSubscribers: ZinsserSubscriber[] = [];
		let cursor: string | undefined;
		
		do {
			const list = await env.SHORT_LINKS.list({ prefix: 'zinsser:sub:', cursor });
			for (const key of list.keys) {
				const val = await env.SHORT_LINKS.get(key.name);
				if (val) {
					const sub = JSON.parse(val) as ZinsserSubscriber;
					if (sub.status === 'active') {
						activeSubscribers.push(sub);
					}
				}
			}
			cursor = list.list_complete ? undefined : list.cursor;
		} while (cursor);

		if (activeSubscribers.length === 0) {
			return jsonResponse({ message: 'No active subscribers found.', sent: 0 });
		}

		// Broadcast loop
		const results = await Promise.all(activeSubscribers.map(async (sub) => {
			const unsubscribeLink = `https://punchy.me/zinsser/unsubscribe?email=${encodeURIComponent(sub.email)}&token=${sub.token}`;
			const footer = `
				<br><br><hr><p style="color: #999; font-size: 10px;">
				You are receiving this as part of BUILDER TIPS. 
				<a href="${unsubscribeLink}">Unsubscribe</a></p>`;
			
			return sendEmail(env, {
				to: sub.email,
				subject: title,
				html: content + footer
			});
		}));

		const successCount = results.filter(r => r.success).length;
		const failCount = results.length - successCount;

		return jsonResponse({
			message: 'Broadcast completed.',
			total: activeSubscribers.length,
			success: successCount,
			failed: failCount
		});
	} catch (error) {
		console.error('Zinsser: Broadcast error:', error);
		return new Response('Internal Server Error', { status: 500 });
	}
}
