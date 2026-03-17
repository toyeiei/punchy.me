/**
 * Shared UI components and design tokens
 * Centralizes common HTML patterns across all tools
 */

export const DESIGN_TOKENS = {
	colors: {
		black: '#000',
		green: '#22c55e',
		glassWhite: 'rgba(255, 255, 255, 0.03)',
		glassWhiteBorder: 'rgba(255, 255, 255, 0.1)',
	},
	fonts: {
		mono: "'JetBrains Mono', monospace",
		display: "'Bitcount Prop Double', monospace",
	},
	effects: {
		blur: 'blur(10px)',
		blurHeavy: 'blur(24px)',
	},
} as const;

/**
 * Common meta tags for SEO and social sharing
 */
export function buildMetaTags(params: {
	title: string;
	description: string;
	ogImage?: string;
	canonicalUrl?: string;
}): string {
	const { title, description, ogImage = '/og-image.webp', canonicalUrl } = params;
	
	return `
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>${title}</title>
		<meta name="description" content="${description}">
		${canonicalUrl ? `<link rel="canonical" href="${canonicalUrl}">` : ''}
		
		<!-- Open Graph -->
		<meta property="og:title" content="${title}">
		<meta property="og:description" content="${description}">
		<meta property="og:image" content="${ogImage}">
		<meta property="og:type" content="website">
		
		<!-- Twitter Card -->
		<meta name="twitter:card" content="summary_large_image">
		<meta name="twitter:title" content="${title}">
		<meta name="twitter:description" content="${description}">
		<meta name="twitter:image" content="${ogImage}">
		
		<!-- Favicon -->
		<link rel="icon" type="image/svg+xml" href="/favicon.svg">
		
		<!-- Fonts -->
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
	`;
}

/**
 * Global CSS reset and design system styles
 */
export const GLOBAL_STYLES = `
	* { margin: 0; padding: 0; box-sizing: border-box; }
	
	body {
		background: ${DESIGN_TOKENS.colors.black};
		color: #fff;
		font-family: ${DESIGN_TOKENS.fonts.mono};
		min-height: 100vh;
		overflow-x: hidden;
	}
	
	.glass-panel {
		background: ${DESIGN_TOKENS.colors.glassWhite};
		backdrop-filter: ${DESIGN_TOKENS.effects.blur};
		border: 1px solid ${DESIGN_TOKENS.colors.glassWhiteBorder};
		border-radius: 16px;
	}
	
	.neon-green { color: ${DESIGN_TOKENS.colors.green}; }
	.neon-border { border-color: ${DESIGN_TOKENS.colors.green}; }
	
	.btn-primary {
		background: ${DESIGN_TOKENS.colors.green};
		color: ${DESIGN_TOKENS.colors.black};
		font-family: ${DESIGN_TOKENS.fonts.mono};
		font-weight: 700;
		font-size: 14px;
		padding: 14px 32px;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
		text-transform: uppercase;
		letter-spacing: 1px;
	}
	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(34, 197, 94, 0.3);
	}
	.btn-primary:active {
		transform: translateY(0);
	}
	.btn-primary:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		transform: none;
	}
`;

/**
 * Common form input styles
 */
export const FORM_STYLES = `
	.form-input, .form-textarea {
		width: 100%;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		color: #fff;
		font-family: ${DESIGN_TOKENS.fonts.mono};
		font-size: 14px;
		padding: 12px 16px;
		transition: border-color 0.3s ease, background 0.3s ease;
	}
	.form-input:focus, .form-textarea:focus {
		outline: none;
		border-color: ${DESIGN_TOKENS.colors.green};
		background: rgba(255, 255, 255, 0.08);
	}
	.form-input::placeholder, .form-textarea::placeholder {
		color: rgba(255, 255, 255, 0.4);
	}
	
	.form-label {
		display: block;
		color: ${DESIGN_TOKENS.colors.green};
		font-size: 12px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 1px;
		margin-bottom: 8px;
	}
	
	.form-group {
		margin-bottom: 24px;
	}
`;

/**
 * Loading spinner component
 */
export const LOADING_SPINNER = `
	<div class="loading-spinner">
		<div class="spinner"></div>
		<style>
			.loading-spinner {
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 40px;
			}
			.spinner {
				width: 40px;
				height: 40px;
				border: 3px solid rgba(34, 197, 94, 0.1);
				border-top-color: ${DESIGN_TOKENS.colors.green};
				border-radius: 50%;
				animation: spin 0.8s linear infinite;
			}
			@keyframes spin {
				to { transform: rotate(360deg); }
			}
		</style>
	</div>
`;

/**
 * Error message component
 */
export function buildErrorMessage(message: string): string {
	return `
		<div class="error-message">
			<span class="error-icon">⚠️</span>
			<span class="error-text">${message}</span>
		</div>
		<style>
			.error-message {
				display: flex;
				align-items: center;
				gap: 12px;
				background: rgba(239, 68, 68, 0.1);
				border: 1px solid rgba(239, 68, 68, 0.3);
				border-radius: 8px;
				padding: 16px;
				color: #ef4444;
				font-family: ${DESIGN_TOKENS.fonts.mono};
				font-size: 14px;
				margin: 16px 0;
			}
			.error-icon { font-size: 20px; }
		</style>
	`;
}

/**
 * Success message component
 */
export function buildSuccessMessage(message: string): string {
	return `
		<div class="success-message">
			<span class="success-icon">✓</span>
			<span class="success-text">${message}</span>
		</div>
		<style>
			.success-message {
				display: flex;
				align-items: center;
				gap: 12px;
				background: rgba(34, 197, 94, 0.1);
				border: 1px solid rgba(34, 197, 94, 0.3);
				border-radius: 8px;
				padding: 16px;
				color: ${DESIGN_TOKENS.colors.green};
				font-family: ${DESIGN_TOKENS.fonts.mono};
				font-size: 14px;
				margin: 16px 0;
			}
			.success-icon {
				font-size: 20px;
				font-weight: 700;
			}
		</style>
	`;
}
