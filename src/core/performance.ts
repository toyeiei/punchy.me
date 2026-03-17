/**
 * Performance optimization utilities
 * Caching strategies, preloading, and response optimization
 */

/**
 * Cache control headers for different resource types
 */
export const CacheHeaders = {
	/** Static assets (images, fonts, scripts) - 1 year */
	STATIC_ASSET: 'public, max-age=31536000, immutable',
	
	/** HTML pages - 1 hour with stale-while-revalidate */
	HTML_PAGE: 'public, max-age=3600, stale-while-revalidate=86400',
	
	/** API responses - no cache */
	API_RESPONSE: 'no-store, no-cache, must-revalidate',
	
	/** Short links - 1 week (they rarely change) */
	SHORT_LINK: 'public, max-age=604800, stale-while-revalidate=2592000',
	
	/** Dynamic content - 5 minutes */
	DYNAMIC: 'public, max-age=300, stale-while-revalidate=3600',
} as const;

/**
 * Adds performance headers to a response
 */
export function withCacheHeaders(response: Response, cacheType: keyof typeof CacheHeaders): Response {
	const headers = new Headers(response.headers);
	headers.set('Cache-Control', CacheHeaders[cacheType]);
	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers
	});
}

/**
 * Preload hints for critical resources
 */
export function buildPreloadLinks(resources: Array<{ url: string; type: 'font' | 'style' | 'script' | 'image' }>): string {
	return resources
		.map(r => `<${r.url}>; rel=preload; as=${r.type}`)
		.join(', ');
}

/**
 * Early Hints helper for HTTP/2 push
 */
export function withEarlyHints(response: Response, resources: Array<{ url: string; type: 'font' | 'style' | 'script' | 'image' }>): Response {
	if (resources.length === 0) return response;
	
	const headers = new Headers(response.headers);
	headers.set('Link', buildPreloadLinks(resources));
	
	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers
	});
}

/**
 * Compression hints for Cloudflare
 */
export function withCompressionHints(response: Response): Response {
	const headers = new Headers(response.headers);
	
	// Signal Cloudflare to use Brotli compression if available
	const contentType = headers.get('Content-Type');
	if (contentType?.includes('text/') || contentType?.includes('application/json')) {
		headers.set('CF-Compression', 'br');
	}
	
	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers
	});
}

/**
 * Measures and logs performance metrics
 */
export interface PerformanceMetrics {
	startTime: number;
	kvReadTime?: number;
	aiCallTime?: number;
	renderTime?: number;
	totalTime?: number;
}

export function startMetrics(): PerformanceMetrics {
	return { startTime: Date.now() };
}

export function recordMetric(metrics: PerformanceMetrics, metricName: keyof Omit<PerformanceMetrics, 'startTime'>, value: number): void {
	metrics[metricName] = value;
}

export function finalizeMetrics(metrics: PerformanceMetrics): PerformanceMetrics {
	metrics.totalTime = Date.now() - metrics.startTime;
	return metrics;
}

/**
 * Adds performance timing headers for debugging
 */
export function withPerformanceHeaders(response: Response, metrics: PerformanceMetrics): Response {
	const headers = new Headers(response.headers);
	
	if (metrics.totalTime) {
		headers.set('Server-Timing', `total;dur=${metrics.totalTime}`);
	}
	
	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers
	});
}
