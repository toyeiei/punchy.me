import { Env } from '../core/types';
import { renderMarcusHome, renderMarcusPost, renderMarcusTag } from '../ui/marcus';
import { getPostList, getPostBySlug, getPostsByTag } from './midgard';
import { htmlPage } from '../core/utils';

/**
 * Handle GET /marcus
 * Blog home page - list all posts
 */
export async function handleMarcusGet(_request: Request, env: Env): Promise<Response> {
	const posts = await getPostList(env, 20);
	return htmlPage(renderMarcusHome(posts));
}

/**
 * Handle GET /marcus/{slug}
 * Individual post page
 */
export async function handleMarcusPostGet(request: Request, env: Env, slug: string): Promise<Response> {
	const post = await getPostBySlug(env, slug);

	if (!post) {
		return new Response('Post not found', { status: 404 });
	}

	return htmlPage(renderMarcusPost(post));
}

/**
 * Handle GET /marcus/tag/{tag}
 * Posts by tag
 */
export async function handleMarcusTagGet(request: Request, env: Env, tag: string): Promise<Response> {
	const posts = await getPostsByTag(env, tag);
	return htmlPage(renderMarcusTag(tag, posts));
}

/**
 * Handle GET /marcus/rss
 * RSS feed
 */
export async function handleMarcusRss(_request: Request, env: Env): Promise<Response> {
	const posts = await getPostList(env, 20);
	
	const rssItems = posts.map(post => `
		<item>
			<title>${escapeXml(post.title)}</title>
			<description>${escapeXml(post.excerpt)}</description>
			<link>https://punchy.me/marcus/${post.slug}</link>
			<guid>https://punchy.me/marcus/${post.slug}</guid>
			<pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
			${post.tags.map(t => `<category>${escapeXml(t)}</category>`).join('\n')}
		</item>
	`).join('\n');

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
	<channel>
		<title>MARCUS - Stoic Wisdom</title>
		<description>Timeless wisdom for modern builders</description>
		<link>https://punchy.me/marcus</link>
		<language>en-us</language>
		${rssItems}
	</channel>
</rss>`;

	return new Response(rss, {
		headers: { 'Content-Type': 'application/rss+xml' }
	});
}

function escapeXml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}
