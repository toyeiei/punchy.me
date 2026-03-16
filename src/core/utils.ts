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
	
	// Try to extract JSON object from text
	const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
	if (jsonMatch) {
		return JSON.parse(jsonMatch[0]);
	}
	
	// Fallback: try parsing the entire cleaned string
	return JSON.parse(cleanText);
}
