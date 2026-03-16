import { HTML } from '../ui';

export function handleHome(): Response {
	return new Response(HTML, { 
		headers: { 
			'Content-Type': 'text/html', 
			'Link': '<https://fonts.googleapis.com>; rel=preconnect, <https://fonts.gstatic.com>; rel=preconnect, <https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double&family=JetBrains+Mono:wght@400;700&display=swap>; rel=preload; as=style' 
		} 
	});
}

export function handleFavicon(): Response {
	const svg = `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#000000" /><g transform="rotate(15, 50, 50)"><path d="M35 25 H55 C65 25 75 32 75 45 C75 58 65 65 55 65 H45 V80" stroke="#22c55e" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none" /><path d="M45 45 H55" stroke="#22c55e" stroke-width="10" stroke-linecap="round" fill="none" /></g></svg>`;
	return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
}

export function handleRobots(): Response {
	return new Response('User-agent: *\nAllow: /\nSitemap: https://punchy.me/sitemap.xml');
}

export function handleSitemap(): Response {
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url><loc>https://punchy.me/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
	<url><loc>https://punchy.me/bazuka</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
	<url><loc>https://punchy.me/anakin</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
	<url><loc>https://punchy.me/musashi</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
	<url><loc>https://punchy.me/odin</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
	<url><loc>https://punchy.me/yaiba</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
	<url><loc>https://punchy.me/freya</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
</urlset>`.trim();
	return new Response(sitemap, { headers: { 'Content-Type': 'application/xml' } });
}
