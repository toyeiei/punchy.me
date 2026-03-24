import { Env } from '../core/types';
import { renderBazuka, renderAnakin, renderYaiba, renderRagnar, renderNotFound, renderYaibaResyncing } from '../core/renderers';

export async function handleRender(request: Request, env: Env, path: string): Promise<Response> {
	if (request.method !== 'GET') return new Response('Method Not Allowed', { status: 405 });
	
	// Ragnar slide route
	if (path.startsWith('/ragnar/slide/')) {
		const id = path.substring(14);
		const value = await env.SHORT_LINKS.get(id);
		if (value) {
			try {
				const data = JSON.parse(value);
				if (data.type === 'ragnar') {
					return renderRagnar(data);
				}
			} catch (_e) { /* fallback */ }
		}
		return renderNotFound();
	}

	// Standard short link lookup
	const id = path.startsWith('/y/') ? path.substring(3) : path.substring(1);
	let value = await env.SHORT_LINKS.get(id);

	// Eventual consistency retry for Yaiba
	if (!value && path.startsWith('/y/')) {
		await new Promise(r => setTimeout(r, 600));
		value = await env.SHORT_LINKS.get(id);
	}

	if (value) {
		// Simple redirect
		if (value.startsWith('http')) return Response.redirect(value, 301);
		
		// JSON-based content
		if (value.startsWith('{')) {
			try {
				const data = JSON.parse(value);
				switch (data.type) {
					case 'bazuka': return renderBazuka(data);
					case 'anakin': return renderAnakin(data);
					case 'yaiba': return renderYaiba(value);
					case 'ragnar': return renderRagnar(data);
					default: break;
				}
			} catch (_e) {
				// Malformed JSON fallback
			}
		}
	}

	// 404 handling
	return path.startsWith('/y/') ? renderYaibaResyncing() : renderNotFound();
}
