import { HTML } from './ui';

export interface Env {
	SHORT_LINKS: KVNamespace;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		// SEO: robots.txt
		if (url.pathname === "/robots.txt") {
			return new Response("User-agent: *\nAllow: /\nSitemap: https://punchy.me/sitemap.xml", {
				headers: { "Content-Type": "text/plain" },
			});
		}

		// SEO: sitemap.xml
		if (url.pathname === "/sitemap.xml") {
			const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://punchy.me/</loc>
    <lastmod>2026-03-11</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
			return new Response(sitemap.trim(), {
				headers: { "Content-Type": "text/xml; charset=utf-8" },
			});
		}

		// Serve the frontend
		if (url.pathname === "/" && request.method === "GET") {
			return new Response(HTML, {
				headers: { "Content-Type": "text/html" },
			});
		}

		// API: Shorten a URL
		if (url.pathname === "/shorten" && request.method === "POST") {
			try {
				const { url: originalUrl } = await request.json() as { url: string };
				
				// Basic validation
				if (!originalUrl || !originalUrl.startsWith('http')) {
					return new Response(JSON.stringify({ error: "Invalid URL. Must start with http:// or https://" }), { 
						status: 400,
						headers: { "Content-Type": "application/json" }
					});
				}

				// Check if URL already has a short ID (Reverse Mapping)
				const existingId = await env.SHORT_LINKS.get(`url:${originalUrl}`);
				if (existingId) {
					return new Response(JSON.stringify({ id: existingId }), {
						headers: { "Content-Type": "application/json" },
					});
				}

				// Generate a random 6-character ID
				const id = Math.random().toString(36).substring(2, 8);
				
				// Store ID -> URL mapping
				await env.SHORT_LINKS.put(id, originalUrl);
				// Store URL -> ID mapping (Reverse)
				await env.SHORT_LINKS.put(`url:${originalUrl}`, id);

				return new Response(JSON.stringify({ id }), {
					headers: { "Content-Type": "application/json" },
				});
			} catch (_err) {
				return new Response(JSON.stringify({ error: "Invalid request" }), { 
					status: 400,
					headers: { "Content-Type": "application/json" }
				});
			}
		}

		// Redirect short links
		const id = url.pathname.slice(1); // Get path after /
		if (id && id.length > 0) {
			const originalUrl = await env.SHORT_LINKS.get(id);
			if (originalUrl) {
				return Response.redirect(originalUrl, 301);
			}
			return new Response("Link not found or expired", { status: 404 });
		}

		return new Response("Not Found", { status: 404 });
	},
};
