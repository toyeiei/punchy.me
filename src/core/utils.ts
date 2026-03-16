export function escapeHTML(str: string): string {
	if (!str) return '';
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

export function generateUniqueId(length: number = 6): string {
	// Use crypto.randomUUID() for cryptographic randomness, then truncate to desired length
	return crypto.randomUUID().replace(/-/g, '').substring(0, length);
}

/**
 * Creates a standardized JSON response
 * @param data - Data to serialize as JSON
 * @param status - HTTP status code (default: 200)
 */
export function jsonResponse(data: unknown, status: number = 200): Response {
	return new Response(JSON.stringify(data), {
		status,
		headers: { 'Content-Type': 'application/json' }
	});
}

/** Serves a static HTML page with aggressive edge caching */
export function htmlPage(html: string): Response {
	return new Response(html, {
		headers: {
			'Content-Type': 'text/html',
			'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
		}
	});
}

/**
 * Parses AI response that may be wrapped in markdown code blocks
 * Handles both raw JSON strings and pre-parsed objects
 * @param response - AI response (string or object)
 * @returns Parsed JSON object
 */
export function parseAIResponse(response: string | Record<string, unknown>): Record<string, unknown> {
	if (typeof response === 'object') {
		return response;
	}

	// Remove markdown code block wrappers if present
	const cleanText = response.replace(/```json/g, '').replace(/```/g, '').trim();
	
	// Try to extract the first JSON-like object from text using a more robust approach
	const start = cleanText.indexOf('{');
	const end = cleanText.lastIndexOf('}');
	
	if (start !== -1 && end !== -1 && end > start) {
		const potentialJson = cleanText.substring(start, end + 1);
		try {
			return JSON.parse(potentialJson);
		} catch (_e) {
			// Bracket-matching fallback: find the outermost balanced { ... }
			let depth = 0;
			let objStart = -1;
			for (let i = 0; i < cleanText.length; i++) {
				if (cleanText[i] === '{') {
					if (depth === 0) objStart = i;
					depth++;
				} else if (cleanText[i] === '}') {
					depth--;
					if (depth === 0 && objStart !== -1) {
						return JSON.parse(cleanText.substring(objStart, i + 1));
					}
				}
			}
		}
	}
	
	// Final fallback: try parsing the entire cleaned string
	return JSON.parse(cleanText);
}
