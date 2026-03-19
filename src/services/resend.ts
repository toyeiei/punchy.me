import { Env } from '../core/types';

export interface EmailPayload {
	from?: string;
	to: string | string[];
	subject: string;
	html: string;
}

// Resend API response types
export interface ResendSuccessResponse {
	id: string;
	from: string;
	to: string[];
	created_at: string;
}

export interface ResendErrorResponse {
	name: string;
	message: string;
	statusCode?: number;
}

export interface EmailResult {
	success: boolean;
	id?: string;
	error?: string;
}

/**
 * Resend Email Service
 * Handles transactional emails via Resend API
 */
export async function sendEmail(env: Env, payload: EmailPayload): Promise<EmailResult> {
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

		const data = await response.json() as ResendSuccessResponse | ResendErrorResponse;

		if (response.ok) {
			return { success: true, id: (data as ResendSuccessResponse).id };
		} else {
			const errorData = data as ResendErrorResponse;
			console.error('Resend API Error:', errorData);
			return { success: false, error: errorData.message || 'Unknown error' };
		}
	} catch (error) {
		console.error('Failed to send email:', error);
		return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
	}
}

/**
 * Helper to send confirmation email
 */
export async function sendConfirmationEmail(env: Env, email: string, token: string): Promise<EmailResult> {
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

/**
 * Send payment receipt email
 */
export async function sendPaymentReceipt(
	env: Env, 
	email: string, 
	details: { item: string; amount: string; transactionId: string }
): Promise<EmailResult> {
	const html = `
		<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
			<h2 style="color: #22c55e;">Payment Confirmation</h2>
			<p>Thank you for your purchase!</p>
			<div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
				<p style="margin: 5px 0;"><strong>Item:</strong> ${details.item}</p>
				<p style="margin: 5px 0;"><strong>Amount:</strong> ${details.amount}</p>
				<p style="margin: 5px 0;"><strong>Transaction ID:</strong> ${details.transactionId}</p>
			</div>
			<p style="color: #666; font-size: 12px;">Your premium access is now active.</p>
			<hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
			<p style="color: #999; font-size: 10px;">PUNCHY.ME | Matte Black Baseline</p>
		</div>
	`;

	return sendEmail(env, {
		to: email,
		subject: `Payment Confirmation - ${details.item}`,
		html,
	});
}
