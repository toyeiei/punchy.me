import { Env } from '../core/types';

export interface EmailPayload {
	from?: string;
	to: string | string[];
	subject: string;
	html: string;
}

/**
 * Resend Email Service
 * Handles transactional emails via Resend API
 */
export async function sendEmail(env: Env, payload: EmailPayload): Promise<{ success: boolean; id?: string; error?: any }> {
	if (!env.RESEND_API_KEY) {
		console.error('RESEND_API_KEY is not configured');
		return { success: false, error: 'RESEND_API_KEY_MISSING' };
	}

	const { from = 'PUNCHY.ME <onboarding@resend.dev>', to, subject, html } = payload;

	try {
		const response = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${env.RESEND_API_KEY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				from,
				to,
				subject,
				html,
			}),
		});

		const data = await response.json() as any;

		if (response.ok) {
			return { success: true, id: data.id };
		} else {
			console.error('Resend API Error:', data);
			return { success: false, error: data };
		}
	} catch (error) {
		console.error('Failed to send email:', error);
		return { success: false, error };
	}
}

/**
 * Helper to send confirmation email
 */
export async function sendConfirmationEmail(env: Env, email: string, token: string): Promise<{ success: boolean; error?: any }> {
	const confirmUrl = `https://punchy.me/zinsser/confirm?token=${token}&email=${encodeURIComponent(email)}`;
	
	const html = `
		<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
			<h2 style="color: #22c55e;">BUILDER TIPS</h2>
			<p>Welcome to the age of AI building.</p>
			<p>Please confirm your subscription to start receiving weekly insights on how to build faster and smarter.</p>
			<div style="margin: 30px 0;">
				<a href="${confirmUrl}" style="background: #22c55e; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; text-transform: uppercase;">Confirm Subscription</a>
			</div>
			<p style="color: #666; font-size: 12px;">If you didn't request this, you can safely ignore this email.</p>
			<hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
			<p style="color: #999; font-size: 10px;">PUNCHY.ME | Matte Black Baseline</p>
		</div>
	`;

	return sendEmail(env, {
		to: email,
		subject: 'Confirm your BUILDER TIPS subscription',
		html,
	});
}
