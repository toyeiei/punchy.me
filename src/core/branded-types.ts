/**
 * Branded types for compile-time type safety
 * Prevents mixing different ID types and ensures proper usage
 */

declare const __brand: unique symbol;
type Brand<T, TBrand> = T & { [__brand]: TBrand };

/**
 * Short link ID (6 characters, alphanumeric)
 */
export type ShortLinkId = Brand<string, 'ShortLinkId'>;

/**
 * KV key for URL reverse lookups
 */
export type UrlLookupKey = Brand<string, 'UrlLookupKey'>;

/**
 * KV key for rate limiting
 */
export type RateLimitKey = Brand<string, 'RateLimitKey'>;

/**
 * Validated & normalized URL
 */
export type NormalizedUrl = Brand<string, 'NormalizedUrl'>;

/**
 * Creates a ShortLinkId from a string (runtime validation optional)
 */
export function createShortLinkId(id: string): ShortLinkId {
	return id as ShortLinkId;
}

/**
 * Creates a URL lookup key with the url: prefix
 */
export function createUrlLookupKey(url: NormalizedUrl): UrlLookupKey {
	return `url:${url}` as UrlLookupKey;
}

/**
 * Creates a rate limit key with rl: prefix
 */
export function createRateLimitKey(feature: string, identifier: string): RateLimitKey {
	return `rl:${feature}:${identifier}` as RateLimitKey;
}

/**
 * Normalizes a URL (add https, remove trailing slash)
 */
export function normalizeUrl(url: string): NormalizedUrl {
	let normalized = url.trim();
	if (!normalized.startsWith('http')) {
		normalized = 'https://' + normalized;
	}
	normalized = normalized.replace(/\/+$/, '');
	return normalized as NormalizedUrl;
}

/**
 * AI response types for stronger typing
 */
export interface AnakinAIResponse {
	summary: string;
	experience: string[] | string;
}

export interface MusashiAIResponse {
	intel: string;
	skills: string[];
	projects: string[];
	salary: string;
	questions: string[];
}

export interface OdinAIResponse {
	strategic_overview: string;
	anomalies_detected: string;
	tactical_recommendations: string;
}
