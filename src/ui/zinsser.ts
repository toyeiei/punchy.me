import { DESIGN_TOKENS, GLOBAL_STYLES, FORM_STYLES, buildMetaTags } from './shared';
import { PUNCHY_PORTAL_HTML } from './portal';

/**
 * Zinsser Newsletter Landing Page (BUILDER TIPS)
 */
export function renderZinsserLanding(): string {
	const meta = buildMetaTags({
		title: 'BUILDER TIPS | Zinsser Newsletter',
		description: 'Learn to become a builder in the age of AI. Weekly tactical insights for modern developers.',
		ogImage: '/og-images/og-image-musashi.webp', // Using Musashi as a tactical placeholder
	});

	return `<!DOCTYPE html>
<html lang="en">
<head>
	${meta}
	<style>
		${GLOBAL_STYLES}
		${FORM_STYLES}
		
		body {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 2rem;
			min-height: 100vh;
			background: radial-gradient(circle at top right, rgba(34, 197, 94, 0.05), transparent), #000;
			position: relative;
			overflow-x: hidden;
		}

		.scan-lines {
			position: fixed;
			top: 0; left: 0; width: 100%; height: 100%;
			background: linear-gradient(
				rgba(18, 16, 16, 0) 50%,
				rgba(0, 0, 0, 0.1) 50%
			), linear-gradient(
				90deg,
				rgba(255, 0, 0, 0.02),
				rgba(0, 255, 0, 0.01),
				rgba(0, 0, 255, 0.02)
			);
			background-size: 100% 4px, 3px 100%;
			pointer-events: none;
			z-index: 100;
		}

		.scan-lines::after {
			content: '';
			position: absolute;
			top: 0; left: 0; width: 100%; height: 100%;
			background: rgba(34, 197, 94, 0.03);
			opacity: 0;
			animation: scanline-flicker 0.1s infinite;
		}

		@keyframes scanline-flicker {
			0% { opacity: 0.1; }
			50% { opacity: 0.2; }
			100% { opacity: 0.1; }
		}

		.moving-scanline {
			position: fixed;
			top: 0; left: 0; width: 100%; height: 4px;
			background: rgba(34, 197, 94, 0.1);
			opacity: 0.5;
			z-index: 101;
			pointer-events: none;
			animation: scanline-move 8s linear infinite;
		}

		@keyframes scanline-move {
			0% { transform: translateY(-100%); }
			100% { transform: translateY(100vh); }
		}

		.zinsser-container {
			width: 100%;
			max-width: 600px;
			z-index: 10;
		}

		.hero-badge {
			display: inline-block;
			background: rgba(34, 197, 94, 0.1);
			color: ${DESIGN_TOKENS.colors.green};
			font-size: 10px;
			font-weight: 700;
			padding: 4px 12px;
			border-radius: 100px;
			text-transform: uppercase;
			letter-spacing: 2px;
			margin-bottom: 1.5rem;
			border: 1px solid rgba(34, 197, 94, 0.2);
		}

		h1 {
			font-family: ${DESIGN_TOKENS.fonts.display};
			font-size: clamp(3rem, 10vw, 5rem);
			line-height: 0.9;
			margin-bottom: 1.5rem;
			text-transform: uppercase;
			letter-spacing: -2px;
		}

		.description {
			color: rgba(255, 255, 255, 0.6);
			font-size: 1.1rem;
			line-height: 1.6;
			margin-bottom: 3rem;
		}

		.zinsser-card {
			background: ${DESIGN_TOKENS.colors.glassWhite};
			backdrop-filter: ${DESIGN_TOKENS.effects.blur};
			border: 1px solid ${DESIGN_TOKENS.colors.glassWhiteBorder};
			border-radius: 24px;
			padding: 2.5rem;
			position: relative;
			overflow: hidden;
		}

		.zinsser-card::before {
			content: '';
			position: absolute;
			top: 0; left: 0; width: 100%; height: 2px;
			background: linear-gradient(90deg, transparent, ${DESIGN_TOKENS.colors.green}, transparent);
		}

		.input-group {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}

		@media (min-width: 640px) {
			.input-group {
				flex-direction: row;
			}
			.input-group .form-input {
				flex: 1;
			}
		}

		.feature-list {
			margin-top: 2rem;
			list-style: none;
			display: grid;
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		@media (min-width: 640px) {
			.feature-list {
				grid-template-columns: 1fr 1fr;
			}
		}

		.feature-item {
			display: flex;
			align-items: center;
			gap: 10px;
			font-size: 12px;
			color: rgba(255, 255, 255, 0.5);
		}

		.feature-item svg {
			width: 14px;
			height: 14px;
			color: ${DESIGN_TOKENS.colors.green};
		}

		.footer-note {
			margin-top: 2rem;
			text-align: center;
			font-size: 10px;
			color: rgba(255, 255, 255, 0.3);
			text-transform: uppercase;
			letter-spacing: 1px;
		}
	</style>
</head>
<body>
	${PUNCHY_PORTAL_HTML}
	<div class="scan-lines"></div>
	<div class="moving-scanline"></div>

	<main class="zinsser-container">
		<div class="hero-badge">Zinsser Protocol v1.0</div>
		<h1>BUILDER<br><span class="neon-green">TIPS</span></h1>
		<p class="description">
			The age of AI is here. Learn to build at the speed of thought. 
			Get weekly tactical insights, code patterns, and architectural 
			blueprints delivered straight to your command center.
		</p>

		<div class="zinsser-card">
			<form action="/zinsser/subscribe" method="POST">
				<div class="input-group">
					<input type="email" name="email" class="form-input" placeholder="commander@base.com" required>
					<button type="submit" class="btn-primary">Initialize</button>
				</div>
			</form>

			<ul class="feature-list">
				<li class="feature-item">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
					</svg>
					Weekly AI Forge Reports
				</li>
				<li class="feature-item">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
					</svg>
					Zero-Regression Patterns
				</li>
				<li class="feature-item">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
					</svg>
					Edge Architecture
				</li>
				<li class="feature-item">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
					</svg>
					Direct Builder Support
				</li>
			</ul>
		</div>

		<div class="footer-note">
			Built for the high-velocity engineer.
		</div>
	</main>
</body>
</html>`;
}

/**
 * Zinsser Subscription Success Page
 */
export function renderZinsserSuccess(email: string): string {
	const meta = buildMetaTags({
		title: 'PENDING | Zinsser Newsletter',
		description: 'Verify your subscription to BUILDER TIPS.',
	});

	return `<!DOCTYPE html>
<html lang="en">
<head>
	${meta}
	<style>
		${GLOBAL_STYLES}
		body {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 2rem;
			min-height: 100vh;
			position: relative;
			overflow-x: hidden;
		}

		.scan-lines {
			position: fixed;
			top: 0; left: 0; width: 100%; height: 100%;
			background: linear-gradient(
				rgba(18, 16, 16, 0) 50%,
				rgba(0, 0, 0, 0.1) 50%
			), linear-gradient(
				90deg,
				rgba(255, 0, 0, 0.02),
				rgba(0, 255, 0, 0.01),
				rgba(0, 0, 255, 0.02)
			);
			background-size: 100% 4px, 3px 100%;
			pointer-events: none;
			z-index: 100;
		}

		.moving-scanline {
			position: fixed;
			top: 0; left: 0; width: 100%; height: 4px;
			background: rgba(34, 197, 94, 0.1);
			opacity: 0.5;
			z-index: 101;
			pointer-events: none;
			animation: scanline-move 8s linear infinite;
		}

		@keyframes scanline-move {
			0% { transform: translateY(-100%); }
			100% { transform: translateY(100vh); }
		}

		.zinsser-card {
			background: ${DESIGN_TOKENS.colors.glassWhite};
			backdrop-filter: ${DESIGN_TOKENS.effects.blur};
			border: 1px solid ${DESIGN_TOKENS.colors.glassWhiteBorder};
			border-radius: 24px;
			padding: 3rem;
			max-width: 500px;
			text-align: center;
			z-index: 10;
		}
		.icon {
			font-size: 3rem;
			margin-bottom: 1.5rem;
		}
		h2 {
			font-family: ${DESIGN_TOKENS.fonts.display};
			font-size: 2.5rem;
			margin-bottom: 1rem;
			text-transform: uppercase;
		}
		p {
			color: rgba(255, 255, 255, 0.6);
			line-height: 1.6;
			margin-bottom: 2rem;
		}
		.email-badge {
			display: inline-block;
			background: rgba(34, 197, 94, 0.1);
			color: ${DESIGN_TOKENS.colors.green};
			padding: 8px 16px;
			border-radius: 8px;
			font-weight: 700;
			margin-bottom: 2rem;
		}
	</style>
</head>
<body>
	${PUNCHY_PORTAL_HTML}
	<div class="scan-lines"></div>
	<div class="moving-scanline"></div>
	<div class="zinsser-card">
		<div class="icon">📩</div>
		<h2>VERIFY SIGNAL</h2>
		<p>We've sent a confirmation link to your terminal.</p>
		<div class="email-badge">${email}</div>
		<p style="font-size: 12px;">Check your inbox (and spam) to complete the initialization.</p>
		<a href="/zinsser" style="color: ${DESIGN_TOKENS.colors.green}; text-decoration: none; font-weight: 700; font-size: 14px;">← BACK TO BASE</a>
	</div>
</body>
</html>`;
}

/**
 * Zinsser Confirmation Success Page
 */
export function renderZinsserConfirm(): string {
	const meta = buildMetaTags({
		title: 'ACTIVE | Zinsser Newsletter',
		description: 'Subscription confirmed. Welcome to BUILDER TIPS.',
	});

	return `<!DOCTYPE html>
<html lang="en">
<head>
	${meta}
	<style>
		${GLOBAL_STYLES}
		body {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 2rem;
			min-height: 100vh;
			position: relative;
			overflow-x: hidden;
		}

		.scan-lines {
			position: fixed;
			top: 0; left: 0; width: 100%; height: 100%;
			background: linear-gradient(
				rgba(18, 16, 16, 0) 50%,
				rgba(0, 0, 0, 0.1) 50%
			), linear-gradient(
				90deg,
				rgba(255, 0, 0, 0.02),
				rgba(0, 255, 0, 0.01),
				rgba(0, 0, 255, 0.02)
			);
			background-size: 100% 4px, 3px 100%;
			pointer-events: none;
			z-index: 100;
		}

		.moving-scanline {
			position: fixed;
			top: 0; left: 0; width: 100%; height: 4px;
			background: rgba(34, 197, 94, 0.1);
			opacity: 0.5;
			z-index: 101;
			pointer-events: none;
			animation: scanline-move 8s linear infinite;
		}

		@keyframes scanline-move {
			0% { transform: translateY(-100%); }
			100% { transform: translateY(100vh); }
		}

		.zinsser-card {
			background: ${DESIGN_TOKENS.colors.glassWhite};
			backdrop-filter: ${DESIGN_TOKENS.effects.blur};
			border: 1px solid ${DESIGN_TOKENS.colors.green};
			border-radius: 24px;
			padding: 3rem;
			max-width: 500px;
			text-align: center;
			box-shadow: 0 0 30px rgba(34, 197, 94, 0.1);
			z-index: 10;
		}
		.icon {
			font-size: 3rem;
			margin-bottom: 1.5rem;
			color: ${DESIGN_TOKENS.colors.green};
		}
		h2 {
			font-family: ${DESIGN_TOKENS.fonts.display};
			font-size: 2.5rem;
			margin-bottom: 1rem;
			text-transform: uppercase;
		}
		p {
			color: rgba(255, 255, 255, 0.6);
			line-height: 1.6;
			margin-bottom: 2rem;
		}
	</style>
</head>
<body>
	${PUNCHY_PORTAL_HTML}
	<div class="scan-lines"></div>
	<div class="moving-scanline"></div>
	<div class="zinsser-card">
		<div class="icon">✅</div>
		<h2>ACTIVE SIGNAL</h2>
		<p>Welcome to <strong>BUILDER TIPS</strong>. Your subscription is now fully initialized. Prepare for tactical insights every week.</p>
		<a href="/" class="btn-primary" style="display: inline-block; text-decoration: none;">ENTER ECOSYSTEM</a>
	</div>
</body>
</html>`;
}

/**
 * Zinsser Unsubscription Success Page
 */
export function renderZinsserUnsubscribe(): string {
	const meta = buildMetaTags({
		title: 'UNSUBSCRIBED | Zinsser Newsletter',
		description: 'You have been unsubscribed from BUILDER TIPS.',
	});

	return `<!DOCTYPE html>
<html lang="en">
<head>
	${meta}
	<style>
		${GLOBAL_STYLES}
		body {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 2rem;
			min-height: 100vh;
			position: relative;
			overflow-x: hidden;
		}

		.scan-lines {
			position: fixed;
			top: 0; left: 0; width: 100%; height: 100%;
			background: linear-gradient(
				rgba(18, 16, 16, 0) 50%,
				rgba(0, 0, 0, 0.1) 50%
			), linear-gradient(
				90deg,
				rgba(255, 0, 0, 0.02),
				rgba(0, 255, 0, 0.01),
				rgba(0, 0, 255, 0.02)
			);
			background-size: 100% 4px, 3px 100%;
			pointer-events: none;
			z-index: 100;
		}

		.moving-scanline {
			position: fixed;
			top: 0; left: 0; width: 100%; height: 4px;
			background: rgba(34, 197, 94, 0.1);
			opacity: 0.5;
			z-index: 101;
			pointer-events: none;
			animation: scanline-move 8s linear infinite;
		}

		@keyframes scanline-move {
			0% { transform: translateY(-100%); }
			100% { transform: translateY(100vh); }
		}

		.zinsser-card {
			background: ${DESIGN_TOKENS.colors.glassWhite};
			backdrop-filter: ${DESIGN_TOKENS.effects.blur};
			border: 1px solid rgba(255, 255, 255, 0.1);
			border-radius: 24px;
			padding: 3rem;
			max-width: 500px;
			text-align: center;
			z-index: 10;
		}
		h2 {
			font-family: ${DESIGN_TOKENS.fonts.display};
			font-size: 2.5rem;
			margin-bottom: 1rem;
			text-transform: uppercase;
		}
		p {
			color: rgba(255, 255, 255, 0.6);
			line-height: 1.6;
			margin-bottom: 2rem;
		}
	</style>
</head>
<body>
	${PUNCHY_PORTAL_HTML}
	<div class="scan-lines"></div>
	<div class="moving-scanline"></div>
	<div class="zinsser-card">
		<h2>SIGNAL LOST</h2>
		<p>You have been successfully unsubscribed from <strong>BUILDER TIPS</strong>. Your terminal is now clear.</p>
		<a href="/" style="color: ${DESIGN_TOKENS.colors.green}; text-decoration: none; font-weight: 700; font-size: 14px;">← BACK TO ECOSYSTEM</a>
	</div>
</body>
</html>`;
}
