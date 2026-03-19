import { Env, MarcusPost } from '../core/types';
import { renderMidgardEditor } from '../ui/midgard';
import { jsonResponse, generateUniqueId } from '../core/utils';

/**
 * Check if request has valid Midgard access
 */
function checkMidgardAccess(request: Request, env: Env): boolean {
	// Check header token
	const headerToken = request.headers.get('x-midgard-token');
	if (headerToken && env.MIDGARD_SECRET && headerToken === env.MIDGARD_SECRET) {
		return true;
	}

	// Check query param (for browser access)
	const url = new URL(request.url);
	const queryToken = url.searchParams.get('token');
	if (queryToken && env.MIDGARD_SECRET && queryToken === env.MIDGARD_SECRET) {
		return true;
	}

	// Check cookie
	const cookie = request.headers.get('cookie') || '';
	const cookieMatch = cookie.match(/midgard_token=([^;]+)/);
	if (cookieMatch && env.MIDGARD_SECRET && cookieMatch[1] === env.MIDGARD_SECRET) {
		return true;
	}

	// No secret configured = no access (secure by default)
	if (!env.MIDGARD_SECRET) {
		return false;
	}

	return false;
}

/**
 * Handle GET /midgard
 * Show the editor page
 */
export async function handleMidgardGet(request: Request, env: Env): Promise<Response> {
	if (!checkMidgardAccess(request, env)) {
		return new Response('Unauthorized', { status: 401 });
	}

	return new Response(renderMidgardEditor(), {
		headers: { 'Content-Type': 'text/html' },
	});
}

/**
 * Handle POST /midgard/publish
 * Publish a new post to MARCUS
 */
export async function handleMidgardPublish(request: Request, env: Env): Promise<Response> {
	if (!checkMidgardAccess(request, env)) {
		return new Response('Unauthorized', { status: 401 });
	}

	try {
		const formData = await request.formData();

		const title = formData.get('title')?.toString()?.trim();
		const body = formData.get('body')?.toString()?.trim();
		const excerpt = formData.get('excerpt')?.toString()?.trim() || '';
		const coverImage = formData.get('coverImage')?.toString()?.trim() || null;
		const tagsStr = formData.get('tags')?.toString()?.trim() || '';
		const slug = formData.get('slug')?.toString()?.trim();

		// Validation
		if (!title || !body) {
			return jsonResponse({ error: 'Title and body are required' }, 400);
		}

		if (!slug) {
			return jsonResponse({ error: 'Slug is required' }, 400);
		}

		// Parse tags
		const tags = tagsStr
			.split(',')
			.map(t => t.trim().toLowerCase())
			.filter(t => t.length > 0);

		const now = Date.now();
		const id = generateUniqueId(8);

		// Create post
		const post: MarcusPost = {
			type: 'marcus:post',
			id,
			slug,
			title,
			body,
			excerpt: excerpt || body.substring(0, 160) + '...',
			coverImage,
			tags,
			createdAt: now,
			publishedAt: now,
		};

		// Store by ID
		await env.SHORT_LINKS.put(`marcus:post:${id}`, JSON.stringify(post));

		// Store by slug for SEO-friendly URLs
		await env.SHORT_LINKS.put(`marcus:slug:${slug}`, id);

		// Update post index (for chronological listing)
		await updatePostIndex(env, id, now);

		return jsonResponse({ 
			success: true, 
			id, 
			slug,
			url: `/marcus/${slug}` 
		});

	} catch (error) {
		console.error('Midgard publish error:', error);
		return jsonResponse({ error: 'Failed to publish post' }, 500);
	}
}

/**
 * Handle GET /midgard/posts
 * List all posts for editing
 */
export async function handleMidgardList(request: Request, env: Env): Promise<Response> {
	if (!checkMidgardAccess(request, env)) {
		return new Response('Unauthorized', { status: 401 });
	}

	const posts = await getPostList(env);

	return jsonResponse({ posts });
}

/**
 * Handle DELETE /midgard/post/{id}
 * Delete a post
 */
export async function handleMidgardDelete(request: Request, env: Env, postId: string): Promise<Response> {
	if (!checkMidgardAccess(request, env)) {
		return new Response('Unauthorized', { status: 401 });
	}

	// Get post to find slug
	const postData = await env.SHORT_LINKS.get(`marcus:post:${postId}`);
	if (!postData) {
		return jsonResponse({ error: 'Post not found' }, 404);
	}

	const post = JSON.parse(postData) as MarcusPost;

	// Delete by ID and slug
	await env.SHORT_LINKS.delete(`marcus:post:${postId}`);
	await env.SHORT_LINKS.delete(`marcus:slug:${post.slug}`);

	// Remove from index
	await removeFromPostIndex(env, postId);

	return jsonResponse({ success: true });
}

/**
 * Update the chronological post index
 */
async function updatePostIndex(env: Env, postId: string, timestamp: number): Promise<void> {
	const indexData = await env.SHORT_LINKS.get('marcus:index');
	const index = indexData ? JSON.parse(indexData) : [];
	
	// Add new post to front
	index.unshift({ id: postId, timestamp });
	
	await env.SHORT_LINKS.put('marcus:index', JSON.stringify(index));
}

/**
 * Remove post from index
 */
async function removeFromPostIndex(env: Env, postId: string): Promise<void> {
	const indexData = await env.SHORT_LINKS.get('marcus:index');
	if (!indexData) return;

	const index = JSON.parse(indexData);
	const filtered = index.filter((item: { id: string }) => item.id !== postId);
	
	await env.SHORT_LINKS.put('marcus:index', JSON.stringify(filtered));
}

/**
 * Get list of posts (newest first)
 */
export async function getPostList(env: Env, limit: number = 50): Promise<MarcusPost[]> {
	const indexData = await env.SHORT_LINKS.get('marcus:index');
	if (!indexData) return [];

	const index = JSON.parse(indexData);
	const posts: MarcusPost[] = [];

	for (const item of index.slice(0, limit)) {
		const postData = await env.SHORT_LINKS.get(`marcus:post:${item.id}`);
		if (postData) {
			posts.push(JSON.parse(postData));
		}
	}

	return posts;
}

/**
 * Get post by slug
 */
export async function getPostBySlug(env: Env, slug: string): Promise<MarcusPost | null> {
	const postId = await env.SHORT_LINKS.get(`marcus:slug:${slug}`);
	if (!postId) return null;

	const postData = await env.SHORT_LINKS.get(`marcus:post:${postId}`);
	return postData ? JSON.parse(postData) : null;
}

/**
 * Get posts by tag
 */
export async function getPostsByTag(env: Env, tag: string): Promise<MarcusPost[]> {
	const allPosts = await getPostList(env, 100);
	return allPosts.filter(post => post.tags.includes(tag.toLowerCase()));
}
