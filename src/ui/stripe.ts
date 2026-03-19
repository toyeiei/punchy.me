/**
 * Stripe Payment UI Templates
 * Pricing, checkout, and success pages
 */

import { PREMIUM_TOOLS, PremiumTool } from '../core/types';

// Design tokens
const COLORS = {
	black: '#000',
	neonGreen: '#22c55e',
	white: '#fff',
	gray: '#666',
	lightGray: '#1a1a1a',
	darkGray: '#0a0a0a',
};

const TOOL_INFO: Record<PremiumTool, { name: string; description: string; price: string }> = {
	thor: {
		name: 'THOR',
		description: 'AI-powered SEO intelligence & content analysis',
		price: '$9.99',
	},
	marcus: {
		name: 'MARCUS',
		description: 'Financial storytelling & data visualization',
		price: '$9.99',
	},
	zeus: {
		name: 'ZEUS',
		description: 'Retirement planning & wealth simulation',
		price: '$9.99',
	},
};

/**
 * Render pricing/checkout page
 */
export function renderStripeCheckout(): string {
	const toolsHtml = PREMIUM_TOOLS.map(tool => {
		const info = TOOL_INFO[tool];
		return `
			<div class="tool-card">
				<div class="tool-icon">${getToolIcon(tool)}</div>
				<div class="tool-name">${info.name}</div>
				<div class="tool-desc">${info.description}</div>
				<div class="tool-price">${info.price}</div>
				<a href="/stripe/checkout?tool=${tool}" class="btn-buy">Buy Now</a>
			</div>
		`;
	}).join('');

	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Upgrade to Premium - PUNCHY.ME</title>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
	<style>
		* { box-sizing: border-box; margin: 0; padding: 0; }
		body {
			background: ${COLORS.black};
			color: ${COLORS.white};
			font-family: 'JetBrains Mono', monospace;
			min-height: 100vh;
			padding: 40px 20px;
		}
		.container { max-width: 900px; margin: 0 auto; }
		.header {
			text-align: center;
			margin-bottom: 60px;
		}
		.logo {
			color: ${COLORS.neonGreen};
			font-size: 14px;
			font-weight: 700;
			letter-spacing: 2px;
			margin-bottom: 20px;
		}
		.title {
			font-size: 36px;
			font-weight: 700;
			margin-bottom: 12px;
		}
		.subtitle {
			color: ${COLORS.gray};
			font-size: 16px;
		}
		.section-title {
			font-size: 20px;
			font-weight: 500;
			margin-bottom: 24px;
			text-align: center;
		}
		.tools-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
			gap: 24px;
			margin-bottom: 60px;
		}
		.tool-card {
			background: rgba(255,255,255,0.03);
			border: 1px solid rgba(34,197,94,0.2);
			border-radius: 16px;
			padding: 32px 24px;
			text-align: center;
			transition: all 0.3s ease;
		}
		.tool-card:hover {
			border-color: ${COLORS.neonGreen};
			transform: translateY(-4px);
		}
		.tool-icon {
			font-size: 32px;
			margin-bottom: 16px;
		}
		.tool-name {
			font-size: 18px;
			font-weight: 700;
			color: ${COLORS.neonGreen};
			margin-bottom: 8px;
		}
		.tool-desc {
			font-size: 13px;
			color: ${COLORS.gray};
			margin-bottom: 20px;
			line-height: 1.5;
		}
		.tool-price {
			font-size: 28px;
			font-weight: 700;
			margin-bottom: 20px;
		}
		.btn-buy {
			display: inline-block;
			background: ${COLORS.neonGreen};
			color: ${COLORS.black};
			padding: 12px 32px;
			border-radius: 8px;
			text-decoration: none;
			font-weight: 600;
			transition: all 0.2s ease;
		}
		.btn-buy:hover {
			transform: scale(1.05);
			box-shadow: 0 0 20px rgba(34,197,94,0.4);
		}
		.pro-section {
			background: linear-gradient(135deg, rgba(34,197,94,0.1) 0%, rgba(0,0,0,0) 100%);
			border: 1px solid ${COLORS.neonGreen};
			border-radius: 20px;
			padding: 40px;
			text-align: center;
			margin-bottom: 40px;
		}
		.pro-badge {
			display: inline-block;
			background: ${COLORS.neonGreen};
			color: ${COLORS.black};
			padding: 6px 16px;
			border-radius: 20px;
			font-size: 12px;
			font-weight: 700;
			margin-bottom: 20px;
		}
		.pro-title {
			font-size: 28px;
			font-weight: 700;
			margin-bottom: 12px;
		}
		.pro-desc {
			color: ${COLORS.gray};
			margin-bottom: 24px;
		}
		.pro-price {
			font-size: 40px;
			font-weight: 700;
			margin-bottom: 24px;
		}
		.pro-price span {
			font-size: 16px;
			font-weight: 400;
			color: ${COLORS.gray};
		}
		.btn-pro {
			display: inline-block;
			background: ${COLORS.neonGreen};
			color: ${COLORS.black};
			padding: 16px 48px;
			border-radius: 8px;
			text-decoration: none;
			font-weight: 700;
			font-size: 16px;
			transition: all 0.2s ease;
		}
		.btn-pro:hover {
			transform: scale(1.05);
			box-shadow: 0 0 30px rgba(34,197,94,0.5);
		}
		.features {
			display: flex;
			justify-content: center;
			gap: 40px;
			margin-top: 32px;
			flex-wrap: wrap;
		}
		.feature {
			color: ${COLORS.gray};
			font-size: 14px;
		}
		.feature::before {
			content: '✓ ';
			color: ${COLORS.neonGreen};
		}
		.back-link {
			display: block;
			text-align: center;
			color: ${COLORS.gray};
			text-decoration: none;
			margin-top: 40px;
		}
		.back-link:hover {
			color: ${COLORS.neonGreen};
		}
	</style>
</head>
<body>
	<div class="container">
		<header class="header">
			<div class="logo">PUNCHY.ME</div>
			<h1 class="title">Upgrade to Premium</h1>
			<p class="subtitle">Unlock powerful AI tools for your workflow</p>
		</header>

		<section class="pro-section">
			<div class="pro-badge">MOST POPULAR</div>
			<h2 class="pro-title">Pro Subscription</h2>
			<p class="pro-desc">Access ALL premium tools with a single subscription</p>
			<div class="pro-price">$19<span>/month</span></div>
			<a href="/stripe/checkout?plan=monthly" class="btn-pro">Get Pro Access</a>
			<div class="features">
				<span class="feature">All premium tools</span>
				<span class="feature">Priority support</span>
				<span class="feature">Cancel anytime</span>
			</div>
		</section>

		<h2 class="section-title">Or buy individual tools</h2>
		<div class="tools-grid">
			${toolsHtml}
		</div>

		<a href="/" class="back-link">← Back to home</a>
	</div>
</body>
</html>`;
}

function getToolIcon(tool: PremiumTool): string {
	const icons: Record<PremiumTool, string> = {
		thor: '⚡',
		marcus: '📊',
		zeus: '🏛️',
	};
	return icons[tool];
}

/**
 * Render success page after payment
 */
export function renderStripeSuccess(): string {
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Payment Successful - PUNCHY.ME</title>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
	<style>
		* { box-sizing: border-box; margin: 0; padding: 0; }
		body {
			background: ${COLORS.black};
			color: ${COLORS.white};
			font-family: 'JetBrains Mono', monospace;
			min-height: 100vh;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 20px;
		}
		.container {
			text-align: center;
			max-width: 500px;
		}
		.icon {
			font-size: 64px;
			margin-bottom: 24px;
		}
		.title {
			font-size: 28px;
			font-weight: 700;
			margin-bottom: 12px;
			color: ${COLORS.neonGreen};
		}
		.desc {
			color: ${COLORS.gray};
			margin-bottom: 32px;
			line-height: 1.6;
		}
		.btn {
			display: inline-block;
			background: ${COLORS.neonGreen};
			color: ${COLORS.black};
			padding: 14px 32px;
			border-radius: 8px;
			text-decoration: none;
			font-weight: 600;
			transition: all 0.2s ease;
		}
		.btn:hover {
			transform: scale(1.05);
			box-shadow: 0 0 20px rgba(34,197,94,0.4);
		}
	</style>
</head>
<body>
	<div class="container">
		<div class="icon">🎉</div>
		<h1 class="title">Payment Successful!</h1>
		<p class="desc">Thank you for your purchase. Your premium access is now active. You can start using all premium features immediately.</p>
		<a href="/" class="btn">Go to Dashboard</a>
	</div>
</body>
</html>`;
}

/**
 * Render customer portal page
 */
export function renderStripePortal(): string {
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Manage Subscription - PUNCHY.ME</title>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
	<style>
		* { box-sizing: border-box; margin: 0; padding: 0; }
		body {
			background: ${COLORS.black};
			color: ${COLORS.white};
			font-family: 'JetBrains Mono', monospace;
			min-height: 100vh;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 20px;
		}
		.container {
			text-align: center;
			max-width: 500px;
		}
		.title {
			font-size: 24px;
			font-weight: 700;
			margin-bottom: 16px;
		}
		.desc {
			color: ${COLORS.gray};
			margin-bottom: 32px;
		}
		.btn {
			display: inline-block;
			background: ${COLORS.neonGreen};
			color: ${COLORS.black};
			padding: 14px 32px;
			border-radius: 8px;
			text-decoration: none;
			font-weight: 600;
		}
	</style>
</head>
<body>
	<div class="container">
		<h1 class="title">Manage Your Subscription</h1>
		<p class="desc">Click the button to access Stripe's customer portal where you can update payment methods, view invoices, or cancel your subscription.</p>
		<a href="#" id="portal-link" class="btn">Open Customer Portal</a>
	</div>
</body>
</html>`;
}

/**
 * Render access status page
 */
export function renderStripeStatus(hasAccess: boolean, tools: string[]): string {
	const toolsList = tools.length > 0 
		? tools.map(t => `<li>${t.toUpperCase()}</li>`).join('')
		: '<li>No purchases yet</li>';

	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Access Status - PUNCHY.ME</title>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
	<style>
		* { box-sizing: border-box; margin: 0; padding: 0; }
		body {
			background: ${COLORS.black};
			color: ${COLORS.white};
			font-family: 'JetBrains Mono', monospace;
			min-height: 100vh;
			padding: 40px 20px;
		}
		.container { max-width: 600px; margin: 0 auto; }
		.status {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 12px;
			font-size: 24px;
			font-weight: 700;
			margin-bottom: 24px;
		}
		.status.active { color: ${COLORS.neonGreen}; }
		.status.inactive { color: ${COLORS.gray}; }
		.card {
			background: rgba(255,255,255,0.03);
			border: 1px solid rgba(34,197,94,0.2);
			border-radius: 12px;
			padding: 24px;
		}
		.card-title {
			font-size: 14px;
			color: ${COLORS.gray};
			margin-bottom: 12px;
		}
		.tools-list {
			list-style: none;
		}
		.tools-list li {
			padding: 8px 0;
			border-bottom: 1px solid rgba(255,255,255,0.1);
		}
		.tools-list li:last-child { border-bottom: none; }
		.btn {
			display: block;
			text-align: center;
			background: ${COLORS.neonGreen};
			color: ${COLORS.black};
			padding: 14px;
			border-radius: 8px;
			text-decoration: none;
			font-weight: 600;
			margin-top: 24px;
		}
	</style>
</head>
<body>
	<div class="container">
		<div class="status ${hasAccess ? 'active' : 'inactive'}">
			${hasAccess ? '✓' : '✗'} ${hasAccess ? 'Premium Access Active' : 'No Active Access'}
		</div>
		<div class="card">
			<div class="card-title">YOUR PURCHASES</div>
			<ul class="tools-list">
				${toolsList}
			</ul>
		</div>
		${hasAccess ? '<a href="/stripe/portal" class="btn">Manage Subscription</a>' : '<a href="/stripe/pricing" class="btn">Upgrade Now</a>'}
	</div>
</body>
</html>`;
}
