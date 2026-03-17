import { Env, BrowserRenderingResponse } from '../core/types';
import { generateUniqueId, htmlPage, chunkText, jsonResponse } from '../core/utils';
import { validateThorRequest } from '../core/validation';
import { THOR_UI_HTML } from '../ui/thor';
import { handleValidatedRequest } from '../core/middleware';
import { ExternalServiceError, InternalError, ValidationError } from '../core/errors';

const THOR_RATE_LIMIT = 5;
const THOR_MAX_MARKDOWN_CHARS = 24_000;
const THOR_MAX_CHUNKS = 20;

interface ThorStoredRecord {
	id: string;
	content: string | null;
}

interface ThorForgeResult {
	id: string | null;
	url: string;
	title: string;
	description: string;
	links: string[];
	wordCount: number;
	status: 'completed' | 'partial';
	storage: {
		persisted: boolean;
	};
	intelligence: {
		chunks: number;
		semantic: boolean;
		truncated: boolean;
	};
	metadata: {
		linkCount: number;
		timestamp: string;
	};
}

/**
 * Thor UI Handler
 */
export const handleThorGet = async (): Promise<Response> => {
  return htmlPage(THOR_UI_HTML);
};

export const handleThorForge = async (request: Request, env: Env): Promise<Response> => {
	return handleValidatedRequest(
		request,
		env,
		validateThorRequest,
		async (data: { url: string }, _ip: string, env: Env) => forgeThorUrl(data.url, env),
		{ rateLimit: { key: 'thor', limit: THOR_RATE_LIMIT } }
	);
};

/**
 * Thor Intelligence Query Handler
 * Performs semantic search against Vectorize index.
 */
export const handleThorQuery = async (request: Request, env: Env): Promise<Response> => {
	const body = await request.json() as { query: string };
	if (!body.query || typeof body.query !== 'string') {
		throw new ValidationError('Query is required');
	}

	try {
		// 1. Generate query embedding
		const queryVector = await env.AI.run('@cf/baai/bge-small-en-v1.5', {
			text: [body.query]
		}) as { data: number[][] };

		if (!queryVector.data?.[0]) throw new Error('Query embedding failed');

		// 2. Search Vectorize
		const matches = await env.THOR_MEMORY.query(queryVector.data[0], {
			topK: 3,
			returnValues: true,
			returnMetadata: true
		});

		// 3. Extract and format results
		const results = matches.matches.map(m => ({
			score: m.score,
			url: m.metadata?.url,
			title: m.metadata?.title,
			text: m.metadata?.text
		}));

		return jsonResponse({
			query: body.query,
			results,
			count: results.length
		});

	} catch (err) {
		console.error('[THOR] Query Error:', err);
		throw new InternalError('Failed to query intelligence core');
	}
};

async function forgeThorUrl(url: string, env: Env): Promise<ThorForgeResult> {
	const parsedUrl = validateThorTarget(url);
	const accountId = env.CLOUDFLARE_ACCOUNT_ID;
	const apiToken = env.THOR_API_TOKEN;

	if (!accountId || !apiToken) {
		console.error('[THOR] Missing Cloudflare credentials');
		throw new InternalError('Intelligence engine configuration incomplete');
	}

	const markdown = await fetchThorMarkdown(url, accountId, apiToken);
	const cleanMarkdown = markdown.trim();
	if (!cleanMarkdown) {
		throw new ExternalServiceError('Empty result from intelligence engine');
	}

	const storedMarkdown = cleanMarkdown.slice(0, THOR_MAX_MARKDOWN_CHARS);
	const chunks = chunkText(storedMarkdown).slice(0, THOR_MAX_CHUNKS);
	const title = extractThorTitle(cleanMarkdown);
	const description = extractThorDescription(cleanMarkdown);
	const links = extractThorLinks(cleanMarkdown, parsedUrl);
	const wordCount = cleanMarkdown.split(/\s+/).filter(Boolean).length;
	const wasTruncated = cleanMarkdown.length > THOR_MAX_MARKDOWN_CHARS || chunkText(storedMarkdown).length > THOR_MAX_CHUNKS;

	let existingRecord: ThorStoredRecord | null = null;
	let persistedId: string | null = null;
	let storagePersisted = false;

	try {
		existingRecord = await env.THOR_STORAGE
			.prepare('SELECT id, content FROM thor_metadata WHERE url = ? LIMIT 1')
			.bind(url)
			.first<ThorStoredRecord>() ?? null;

		const candidateId = existingRecord?.id || generateUniqueId(8);
		const upserted = await env.THOR_STORAGE.prepare(`
			INSERT INTO thor_metadata (id, url, title, description, content, word_count, status, last_scraped)
			VALUES (?, ?, ?, ?, ?, ?, 'processing', CURRENT_TIMESTAMP)
			ON CONFLICT(url) DO UPDATE SET
				title = excluded.title,
				description = excluded.description,
				content = excluded.content,
				word_count = excluded.word_count,
				status = 'processing',
				last_scraped = CURRENT_TIMESTAMP
			RETURNING id
		`).bind(candidateId, url, title, description, storedMarkdown, wordCount).first<{ id: string }>();

		persistedId = upserted?.id || candidateId;
		storagePersisted = true;
	} catch (dbErr) {
		console.error('[THOR] D1 Persistence Error:', dbErr);
	}

	let chunksProcessed = 0;
	let semanticAvailable = false;

	if (storagePersisted && persistedId && chunks.length > 0) {
		try {
			const embeddingResponse = await env.AI.run('@cf/baai/bge-small-en-v1.5', {
				text: chunks
			}) as { data?: number[][] };

			if (!Array.isArray(embeddingResponse.data) || embeddingResponse.data.length < chunks.length) {
				throw new Error('Invalid embedding response');
			}

			await env.THOR_MEMORY.upsert(chunks.map((chunk, index) => ({
				id: `${persistedId}-c${index}`,
				values: embeddingResponse.data?.[index] || [],
				metadata: {
					url,
					title,
					text: chunk.substring(0, 500)
				}
			})));

			const previousChunkCount = existingRecord?.content
				? chunkText(existingRecord.content.slice(0, THOR_MAX_MARKDOWN_CHARS)).slice(0, THOR_MAX_CHUNKS).length
				: 0;

			if (existingRecord?.id === persistedId && previousChunkCount > chunks.length) {
				await env.THOR_MEMORY.deleteByIds(buildVectorIds(persistedId, chunks.length, previousChunkCount));
			}

			chunksProcessed = chunks.length;
			semanticAvailable = true;
		} catch (aiErr) {
			console.error('[THOR] AI/Vectorize Integration Error:', aiErr);
		}
	}

	const status: 'completed' | 'partial' = storagePersisted && semanticAvailable ? 'completed' : 'partial';

	if (storagePersisted && persistedId) {
		try {
			await env.THOR_STORAGE.prepare(
				'UPDATE thor_metadata SET status = ?, last_scraped = CURRENT_TIMESTAMP WHERE id = ?'
			).bind(status, persistedId).run();
		} catch (statusErr) {
			console.error('[THOR] Status Update Error:', statusErr);
		}
	}

	return {
		id: storagePersisted ? persistedId : null,
		url,
		title,
		description,
		links,
		wordCount,
		status,
		storage: {
			persisted: storagePersisted,
		},
		intelligence: {
			chunks: chunksProcessed,
			semantic: semanticAvailable,
			truncated: wasTruncated,
		},
		metadata: {
			linkCount: links.length,
			timestamp: new Date().toISOString()
		}
	};
}

function validateThorTarget(url: string): URL {
	let parsedUrl: URL;
	try {
		parsedUrl = new URL(url);
	} catch (_e) {
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
			body: JSON.stringify({ url })
		});
	} catch (error) {
		console.error('[THOR] Browser Rendering Network Error:', error);
		throw new ExternalServiceError('Failed to fetch from intelligence engine');
	}

	if (!apiResponse.ok) {
		const errorData = await apiResponse.text();
		console.error('[THOR] Browser Rendering API Error:', errorData);
		throw new ExternalServiceError('Failed to fetch from intelligence engine');
	}

	let responseData: BrowserRenderingResponse;
	try {
		responseData = await apiResponse.json() as BrowserRenderingResponse;
	} catch (error) {
		console.error('[THOR] Browser Rendering Parse Error:', error);
		throw new ExternalServiceError('Invalid response from intelligence engine');
	}

	if (!responseData.success || !responseData.result?.markdown) {
		throw new ExternalServiceError('Empty result from intelligence engine');
	}

	return responseData.result.markdown;
}

function extractThorTitle(markdown: string): string {
	const frontmatterTitle = extractFrontmatterValue(markdown, 'title');
	if (frontmatterTitle) return frontmatterTitle;

	const h1Match = markdown.match(/^#\s+(.+)$/m);
	return h1Match?.[1]?.trim() || 'Untitled Content';
}

function extractThorDescription(markdown: string): string {
	return extractFrontmatterValue(markdown, 'description') || '';
}

function extractFrontmatterValue(markdown: string, key: string): string | null {
	const frontmatterMatch = markdown.match(/^---\n([\s\S]*?)\n---/);
	if (!frontmatterMatch?.[1]) return null;

	const keyPattern = new RegExp(`^${key}:\\s*(.*)$`, 'm');
	const valueMatch = frontmatterMatch[1].match(keyPattern);
	if (!valueMatch?.[1]) return null;

	return valueMatch[1].trim().replace(/^['"]|['"]$/g, '');
}

function extractThorLinks(markdown: string, parsedUrl: URL): string[] {
	const uniqueLinks = new Set<string>();
	const linkMatches = markdown.matchAll(/\[[^\]]{1,200}\]\(([^)\s]{1,1000})\)/g);

	for (const match of linkMatches) {
		const rawLink = match[1]?.trim();
		if (!rawLink) continue;

		try {
			const resolved = new URL(rawLink, parsedUrl);
			if (!['http:', 'https:'].includes(resolved.protocol)) continue;
			uniqueLinks.add(resolved.toString());
		} catch {
			continue;
		}
	}

	return Array.from(uniqueLinks);
}

function buildVectorIds(id: string, startIndex: number, endIndex: number): string[] {
	const ids: string[] = [];
	for (let index = startIndex; index < endIndex; index++) {
		ids.push(`${id}-c${index}`);
	}
	return ids;
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
