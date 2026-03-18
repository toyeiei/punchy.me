import { Env, BrowserRenderingResponse, ThorReport, ThorIntelligence } from '../core/types';
import { generateUniqueId, htmlPage } from '../core/utils';
import { validateThorRequest } from '../core/validation';
import { THOR_UI_HTML } from '../ui/thor';
import { handleValidatedRequest } from '../core/middleware';
import { ExternalServiceError, InternalError, ValidationError } from '../core/errors';
import { THOR_SYSTEM_PROMPT, buildThorUserPrompt } from '../prompts/thor';

const THOR_RATE_LIMIT = 5;

/**
 * Thor UI Handler
 */
export const handleThorGet = async (): Promise<Response> => {
	return htmlPage(THOR_UI_HTML);
};

/**
 * Thor Intelligence Forge - Scrape → Analyze → Report
 */
export const handleThorForge = async (request: Request, env: Env): Promise<Response> => {
	return handleValidatedRequest(
		request,
		env,
		validateThorRequest,
		async (data: { url: string }, _ip: string, env: Env) => forgeThorIntelligence(data.url, env),
		{ rateLimit: { key: 'thor', limit: THOR_RATE_LIMIT } }
	);
};

/**
 * Thor PDF Report Handler - Returns cached intelligence report as printable HTML
 */
export const handleThorPdf = async (request: Request, env: Env, path: string): Promise<Response> => {
	const id = path.replace('/thor/pdf/', '');
	if (!id || id.length < 6) {
		throw new ValidationError('Invalid report ID');
	}

	const cached = await env.SHORT_LINKS.get(`thor:${id}`);
	if (!cached) {
		throw new ValidationError('Report not found or expired');
	}

	const report = JSON.parse(cached) as ThorReport;
	return htmlPage(buildThorPdfHtml(report));
};

async function forgeThorIntelligence(url: string, env: Env): Promise<ThorReport> {
	// 1. Validate URL
	const parsedUrl = validateThorTarget(url);

	// 2. Check credentials
	const accountId = env.CLOUDFLARE_ACCOUNT_ID;
	const apiToken = env.THOR_API_TOKEN;
	if (!accountId || !apiToken) {
		console.error('[THOR] Missing Cloudflare credentials');
		throw new InternalError('Intelligence engine configuration incomplete');
	}

	// 3. Scrape via Browser Rendering
	const markdown = await fetchThorMarkdown(url, accountId, apiToken);
	if (!markdown.trim()) {
		throw new ExternalServiceError('Empty result from browser rendering');
	}

	// 4. Analyze with Mistral
	const intelligence = await analyzeWithMistral(markdown, url, env);

	// 5. Build and cache report
	const report: ThorReport = {
		id: generateUniqueId(8),
		url,
		title: intelligence.content.summary?.split('.')[0] || parsedUrl.hostname,
		scrapedAt: new Date().toISOString(),
		intelligence
	};

	// Cache for 1 hour (3600 seconds) for PDF access
	await env.SHORT_LINKS.put(`thor:${report.id}`, JSON.stringify(report), { expirationTtl: 3600 });

	return report;
}

function validateThorTarget(url: string): URL {
	let parsedUrl: URL;
	try {
		parsedUrl = new URL(url);
	} catch {
		throw new ValidationError('Invalid URL provided');
	}

	if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
		throw new ValidationError('Only HTTP and HTTPS protocols are allowed');
	}

	if (parsedUrl.username || parsedUrl.password) {
		throw new ValidationError('URLs with embedded credentials are not allowed');
	}

	if (isForbiddenThorHostname(parsedUrl.hostname)) {
		throw new ValidationError('Private and internal network targets are not allowed');
	}

	return parsedUrl;
}

async function fetchThorMarkdown(url: string, accountId: string, apiToken: string): Promise<string> {
	let apiResponse: Response;
	try {
		apiResponse = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/browser-rendering/markdown`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${apiToken}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ 
				url,
				gotoOptions: {
					waitUntil: 'networkidle2',
					timeout: 30000
				},
				// Block unnecessary resources for speed (we only need text content)
				rejectRequestPattern: [
					/^.*\.(css|png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|eot)$/i,
					/google-analytics|googletagmanager|facebook\.com|tracking|analytics|ads/i
				]
			})
		});
	} catch (error) {
		console.error('[THOR] Browser Rendering Network Error:', error);
		throw new ExternalServiceError('Failed to connect to browser rendering service');
	}

	if (!apiResponse.ok) {
		const errorData = await apiResponse.text();
		console.error('[THOR] Browser Rendering API Error:', errorData);
		throw new ExternalServiceError('Browser rendering service error');
	}

	let responseData: BrowserRenderingResponse;
	try {
		responseData = await apiResponse.json() as BrowserRenderingResponse;
	} catch (error) {
		console.error('[THOR] Browser Rendering Parse Error:', error);
		throw new ExternalServiceError('Invalid response from browser rendering');
	}

	if (!responseData.success || !responseData.result) {
		throw new ExternalServiceError('Empty result from browser rendering');
	}

	return responseData.result;
}

async function analyzeWithMistral(markdown: string, url: string, env: Env): Promise<ThorIntelligence> {
	try {
		const aiResponse = await env.AI.run('@cf/mistralai/mistral-small-3.1-24b-instruct', {
			messages: [
				{ role: 'system', content: THOR_SYSTEM_PROMPT },
				{ role: 'user', content: buildThorUserPrompt(markdown, url) }
			],
			max_tokens: 1500,
			temperature: 0.2
		}) as { response: string };

		// Parse AI response
		const cleaned = aiResponse.response
			.replace(/```json\n?/g, '')
			.replace(/```\n?/g, '')
			.trim();

		const startIndex = cleaned.indexOf('{');
		const endIndex = cleaned.lastIndexOf('}');
		if (startIndex === -1 || endIndex === -1) {
			throw new Error('No JSON object found in AI response');
		}

		const parsed = JSON.parse(cleaned.slice(startIndex, endIndex + 1)) as Partial<ThorIntelligence>;

		// Ensure all fields exist with defaults
		return {
			seo: {
				ogTitle: parsed.seo?.ogTitle ?? null,
				ogDescription: parsed.seo?.ogDescription ?? null,
				ogImage: parsed.seo?.ogImage ?? null,
				metaTitle: parsed.seo?.metaTitle ?? null,
				metaDescription: parsed.seo?.metaDescription ?? null,
				metaKeywords: parsed.seo?.metaKeywords ?? [],
				canonical: parsed.seo?.canonical ?? null,
				robots: parsed.seo?.robots ?? null
			},
			structure: {
				h1Count: parsed.structure?.h1Count ?? 0,
				h2Count: parsed.structure?.h2Count ?? 0,
				h3Count: parsed.structure?.h3Count ?? 0,
				h1Texts: parsed.structure?.h1Texts ?? [],
				linkCount: parsed.structure?.linkCount ?? 0,
				imageCount: parsed.structure?.imageCount ?? 0,
				notableImages: parsed.structure?.notableImages ?? []
			},
			content: {
				summary: parsed.content?.summary ?? 'Unable to generate summary.',
				topics: parsed.content?.topics ?? [],
				contentType: parsed.content?.contentType ?? 'other',
				targetAudience: parsed.content?.targetAudience ?? 'Unknown',
				keyEntities: parsed.content?.keyEntities ?? [],
				readingTime: parsed.content?.readingTime ?? 0,
				wordCount: parsed.content?.wordCount ?? 0
			},
			technical: {
				hasSchema: parsed.technical?.hasSchema ?? false,
				schemaTypes: parsed.technical?.schemaTypes ?? [],
				ogScore: parsed.technical?.ogScore ?? 0
			}
		};
	} catch (error) {
		console.error('[THOR] AI Analysis Error:', error);
		throw new ExternalServiceError('Failed to analyze page content');
	}
}

function buildThorPdfHtml(report: ThorReport): string {
	const { intelligence } = report;

	// Build conditional sections
	const keyEntitiesSection = intelligence.content.keyEntities.length > 0
		? '<div style="margin-top: 15px;"><div class="label">Key Entities</div><div class="value">' + intelligence.content.keyEntities.map(e => escapeHtml(e)).join(', ') + '</div></div>'
		: '';

	const h1TextsSection = intelligence.structure.h1Texts.length > 0
		? '<div style="margin-top: 15px;"><div class="label">H1 Text</div><ul class="heading-list">' + intelligence.structure.h1Texts.map(h => '<li>' + escapeHtml(h) + '</li>').join('') + '</ul></div>'
		: '';

	const ogImageSection = intelligence.seo.ogImage
		? '<div style="margin-top: 15px;"><div class="label">OG Image</div><div class="value" style="word-break: break-all; font-size: 12px;">' + escapeHtml(intelligence.seo.ogImage) + '</div></div>'
		: '';

	const schemaTypesSection = intelligence.technical.schemaTypes.length > 0
		? '<div class="field"><div class="label">Schema Types</div><div class="value">' + intelligence.technical.schemaTypes.map(s => escapeHtml(s)).join(', ') + '</div></div>'
		: '';

	const topicTags = intelligence.content.topics.map(t => '<span class="tag">' + escapeHtml(t) + '</span>').join('');

	return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>THOR Intelligence Report - ' + escapeHtml(report.title) + '</title><style>* { margin: 0; padding: 0; box-sizing: border-box; }body { font-family: "Inter", -apple-system, sans-serif; color: #000; line-height: 1.6; padding: 40px; max-width: 800px; margin: 0 auto; }.header { border-bottom: 3px solid #22c55e; padding-bottom: 20px; margin-bottom: 30px; }.logo { font-family: monospace; font-size: 14px; color: #22c55e; letter-spacing: 2px; margin-bottom: 10px; }h1 { font-size: 28px; margin-bottom: 8px; }.url { color: #666; font-size: 14px; word-break: break-all; }.timestamp { color: #999; font-size: 12px; margin-top: 5px; }.section { margin-bottom: 30px; }h2 { font-size: 18px; color: #22c55e; border-bottom: 1px solid #eee; padding-bottom: 8px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; }.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }.field { margin-bottom: 10px; }.label { font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 0.5px; }.value { font-size: 14px; }.value.null { color: #ccc; font-style: italic; }.summary { background: #f8f8f8; padding: 20px; border-radius: 8px; font-size: 14px; line-height: 1.7; }.tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }.tag { background: #22c55e; color: #fff; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }.score { display: flex; align-items: center; gap: 15px; }.score-bar { flex: 1; height: 20px; background: #eee; border-radius: 10px; overflow: hidden; }.score-fill { height: 100%; background: #22c55e; }.score-value { font-weight: 700; font-size: 24px; color: #22c55e; }.heading-list { list-style: none; }.heading-list li { padding: 5px 0; border-bottom: 1px solid #f0f0f0; }.heading-list li:last-child { border-bottom: none; }.footer { margin-top: 50px; border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #999; font-size: 12px; }@media print {body { padding: 20px; }.section { break-inside: avoid; }}</style></head><body><div class="header"><div class="logo">[ THOR INTELLIGENCE REPORT ]</div><h1>' + escapeHtml(report.title) + '</h1><div class="url">' + escapeHtml(report.url) + '</div><div class="timestamp">Analyzed: ' + new Date(report.scrapedAt).toLocaleString() + '</div></div><div class="section"><h2>Content Summary</h2><div class="summary">' + escapeHtml(intelligence.content.summary) + '</div><div class="tags">' + topicTags + '</div></div><div class="section"><h2>Content Intelligence</h2><div class="grid"><div class="field"><div class="label">Content Type</div><div class="value">' + escapeHtml(intelligence.content.contentType) + '</div></div><div class="field"><div class="label">Target Audience</div><div class="value">' + escapeHtml(intelligence.content.targetAudience) + '</div></div><div class="field"><div class="label">Word Count</div><div class="value">' + intelligence.content.wordCount.toLocaleString() + ' words</div></div><div class="field"><div class="label">Reading Time</div><div class="value">~' + intelligence.content.readingTime + ' min</div></div></div>' + keyEntitiesSection + '</div><div class="section"><h2>Page Structure</h2><div class="grid"><div class="field"><div class="label">H1 Headings</div><div class="value">' + intelligence.structure.h1Count + '</div></div><div class="field"><div class="label">H2 Headings</div><div class="value">' + intelligence.structure.h2Count + '</div></div><div class="field"><div class="label">Links</div><div class="value">' + intelligence.structure.linkCount + '</div></div><div class="field"><div class="label">Images</div><div class="value">' + intelligence.structure.imageCount + '</div></div></div>' + h1TextsSection + '</div><div class="section"><h2>SEO Analysis</h2><div class="grid"><div class="field"><div class="label">Open Graph Title</div><div class="value' + (intelligence.seo.ogTitle ? '' : ' null') + '">' + (intelligence.seo.ogTitle ? escapeHtml(intelligence.seo.ogTitle) : 'Not set') + '</div></div><div class="field"><div class="label">Meta Title</div><div class="value' + (intelligence.seo.metaTitle ? '' : ' null') + '">' + (intelligence.seo.metaTitle ? escapeHtml(intelligence.seo.metaTitle) : 'Not set') + '</div></div><div class="field"><div class="label">OG Description</div><div class="value' + (intelligence.seo.ogDescription ? '' : ' null') + '">' + (intelligence.seo.ogDescription ? escapeHtml(intelligence.seo.ogDescription) : 'Not set') + '</div></div><div class="field"><div class="label">Meta Description</div><div class="value' + (intelligence.seo.metaDescription ? '' : ' null') + '">' + (intelligence.seo.metaDescription ? escapeHtml(intelligence.seo.metaDescription) : 'Not set') + '</div></div></div>' + ogImageSection + '</div><div class="section"><h2>Technical Signals</h2><div class="grid"><div class="field"><div class="label">JSON-LD Schema</div><div class="value">' + (intelligence.technical.hasSchema ? 'Present' : 'Not detected') + '</div></div>' + schemaTypesSection + '</div><div style="margin-top: 20px;"><div class="label">Open Graph Score</div><div class="score"><div class="score-bar"><div class="score-fill" style="width: ' + intelligence.technical.ogScore + '%"></div></div><div class="score-value">' + intelligence.technical.ogScore + '/100</div></div></div></div><div class="footer">Generated by THOR Web Intelligence Engine at PUNCHY.ME</div></body></html>';
}

function escapeHtml(str: string): string {
	if (!str) return '';
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

function isForbiddenThorHostname(hostname: string): boolean {
	const normalized = hostname.trim().toLowerCase().replace(/^\[|\]$/g, '');
	if (!normalized) return true;

	if (
		normalized === 'localhost' ||
		normalized.endsWith('.localhost') ||
		normalized.endsWith('.local') ||
		normalized.endsWith('.internal')
	) {
		return true;
	}

	if (isPrivateIpv4(normalized) || isPrivateIpv6(normalized)) {
		return true;
	}

	return false;
}

function isPrivateIpv4(hostname: string): boolean {
	const parts = hostname.split('.');
	if (parts.length !== 4 || parts.some(part => !/^\d+$/.test(part))) return false;

	const octets = parts.map(part => Number(part));
	if (octets.some(octet => octet < 0 || octet > 255)) return false;

	const [a, b] = octets;
	if (a === 0 || a === 10 || a === 127) return true;
	if (a === 169 && b === 254) return true;
	if (a === 172 && b >= 16 && b <= 31) return true;
	if (a === 192 && b === 168) return true;
	if (a === 100 && b >= 64 && b <= 127) return true;
	if (a === 198 && (b === 18 || b === 19)) return true;

	return false;
}

function isPrivateIpv6(hostname: string): boolean {
	if (!hostname.includes(':')) return false;

	const normalized = hostname.toLowerCase();
	if (normalized === '::1' || normalized === '::') return true;
	if (normalized.startsWith('fe8') || normalized.startsWith('fe9') || normalized.startsWith('fea') || normalized.startsWith('feb')) {
		return true;
	}
	if (normalized.startsWith('fc') || normalized.startsWith('fd')) return true;
	if (normalized.startsWith('::ffff:127.') || normalized.startsWith('::ffff:10.') || normalized.startsWith('::ffff:192.168.')) {
		return true;
	}

	return false;
}
