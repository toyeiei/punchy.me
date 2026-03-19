import { Env, MarcusPost } from '../core/types';
import { renderMidgardEditor, renderMidgardPostsList } from '../ui/midgard';
import { jsonResponse, generateUniqueId } from '../core/utils';

/**
 * Check if request has valid Midgard access
 * Returns { hasAccess: boolean, shouldSetCookie: boolean, token?: string }
 */
function checkMidgardAccess(request: Request, env: Env): { hasAccess: boolean; shouldSetCookie: boolean; token?: string } {
	// Check header token (no cookie needed)
	const headerToken = request.headers.get('x-midgard-token');
	if (headerToken && env.MIDGARD_SECRET && headerToken === env.MIDGARD_SECRET) {
		return { hasAccess: true, shouldSetCookie: false };
	}

	// Check query param (for browser access - set cookie)
	const url = new URL(request.url);
	const queryToken = url.searchParams.get('token');
	if (queryToken && env.MIDGARD_SECRET && queryToken === env.MIDGARD_SECRET) {
		return { hasAccess: true, shouldSetCookie: true, token: queryToken };
	}

	// Check cookie (already authenticated)
	const cookie = request.headers.get('cookie') || '';
	const cookieMatch = cookie.match(/midgard_token=([^;]+)/);
	if (cookieMatch && env.MIDGARD_SECRET && cookieMatch[1] === env.MIDGARD_SECRET) {
		return { hasAccess: true, shouldSetCookie: false };
	}

	// No secret configured = no access (secure by default)
	if (!env.MIDGARD_SECRET) {
		return { hasAccess: false, shouldSetCookie: false };
	}

	return { hasAccess: false, shouldSetCookie: false };
}

/**
 * Handle GET /midgard
 * Show the editor page (sets cookie if accessing via token)
 */
export async function handleMidgardGet(request: Request, env: Env): Promise<Response> {
	const access = checkMidgardAccess(request, env);
	
	if (!access.hasAccess) {
		return new Response('Unauthorized - Visit /midgard?token=YOUR_SECRET to authenticate', { status: 401 });
	}

	const html = renderMidgardEditor();
	const headers: HeadersInit = { 'Content-Type': 'text/html' };

	// Set cookie if this is first access via token
	if (access.shouldSetCookie && access.token) {
		// Cookie expires in 30 days
		const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
		headers['Set-Cookie'] = `midgard_token=${access.token}; Path=/; HttpOnly; SameSite=Strict; Expires=${expires}`;
	}

	return new Response(html, { headers });
}

/**
 * Handle POST /midgard/publish
 * Publish a new post to MARCUS
 */
export async function handleMidgardPublish(request: Request, env: Env): Promise<Response> {
	const access = checkMidgardAccess(request, env);
	if (!access.hasAccess) {
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
		const schemaStr = formData.get('schema')?.toString()?.trim() || '';

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

		// Parse schema if provided
		let schema: Record<string, unknown> | undefined;
		if (schemaStr) {
			try {
				schema = JSON.parse(schemaStr);
			} catch {
				// Invalid JSON, ignore schema
			}
		}

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
			schema,
			status: 'published',
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
	const access = checkMidgardAccess(request, env);
	if (!access.hasAccess) {
		return new Response('Unauthorized', { status: 401 });
	}

	const posts = await getPostList(env);

	// Check if client wants JSON (API) or HTML (browser)
	// Default to JSON for slash command, HTML for direct browser access
	const url = new URL(request.url);
	const format = url.searchParams.get('format');
	const accept = request.headers.get('accept') || '';
	
	if (format === 'json' || accept.includes('application/json') || !accept.includes('text/html')) {
		return jsonResponse({ posts });
	}

	// Return HTML page for browser
	return new Response(renderMidgardPostsList(posts), {
		headers: { 'Content-Type': 'text/html' }
	});
}

/**
 * Handle GET /midgard/edit/{slug}
 * Load existing post for editing
 */
export async function handleMidgardEdit(request: Request, env: Env, slug: string): Promise<Response> {
	const access = checkMidgardAccess(request, env);
	if (!access.hasAccess) {
		return new Response('Unauthorized', { status: 401 });
	}

	const post = await getPostBySlug(env, slug);
	if (!post) {
		return new Response('Post not found', { status: 404 });
	}

	// Return post data as JSON for the editor to load
	return jsonResponse({ post });
}

/**
 * Handle DELETE /midgard/post/{id}
 * Delete a post
 */
export async function handleMidgardDelete(request: Request, env: Env, postId: string): Promise<Response> {
	const access = checkMidgardAccess(request, env);
	if (!access.hasAccess) {
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
 * Handle POST /midgard/update
 * Update an existing post
 */
export async function handleMidgardUpdate(request: Request, env: Env): Promise<Response> {
	const access = checkMidgardAccess(request, env);
	if (!access.hasAccess) {
		return new Response('Unauthorized', { status: 401 });
	}

	try {
		const formData = await request.formData();

		const postId = formData.get('id')?.toString()?.trim();
		const title = formData.get('title')?.toString()?.trim();
		const body = formData.get('body')?.toString()?.trim();
		const excerpt = formData.get('excerpt')?.toString()?.trim() || '';
		const coverImage = formData.get('coverImage')?.toString()?.trim() || null;
		const tagsStr = formData.get('tags')?.toString()?.trim() || '';
		const schemaStr = formData.get('schema')?.toString()?.trim() || '';

		if (!postId) {
			return jsonResponse({ error: 'Post ID is required' }, 400);
		}

		// Get existing post
		const existingData = await env.SHORT_LINKS.get(`marcus:post:${postId}`);
		if (!existingData) {
			return jsonResponse({ error: 'Post not found' }, 404);
		}

		const existing = JSON.parse(existingData) as MarcusPost;

		// Parse tags
		const tags = tagsStr
			.split(',')
			.map(t => t.trim().toLowerCase())
			.filter(t => t.length > 0);

		// Parse schema if provided
		let schema: Record<string, unknown> | undefined;
		if (schemaStr) {
			try {
				schema = JSON.parse(schemaStr);
			} catch {
				// Invalid JSON, ignore
			}
		}

		// Update post (keep original timestamps)
		const updatedPost: MarcusPost = {
			...existing,
			title: title || existing.title,
			body: body || existing.body,
			excerpt: excerpt || existing.excerpt,
			coverImage,
			tags,
			schema,
		};

		// Store updated post
		await env.SHORT_LINKS.put(`marcus:post:${postId}`, JSON.stringify(updatedPost));

		return jsonResponse({ 
			success: true, 
			id: postId,
			url: `https://punchy.me/marcus/${updatedPost.slug}`
		});
	} catch (error) {
		console.error('Midgard update error:', error);
		return jsonResponse({ error: 'Failed to update post' }, 500);
	}
}

/**
 * Handle POST /midgard/draft
 * Save a draft (unpublished post)
 */
export async function handleMidgardSaveDraft(request: Request, env: Env): Promise<Response> {
	const access = checkMidgardAccess(request, env);
	if (!access.hasAccess) {
		return new Response('Unauthorized', { status: 401 });
	}

	try {
		const formData = await request.formData();

		const postId = formData.get('id')?.toString()?.trim(); // Optional - for updating existing draft
		const title = formData.get('title')?.toString()?.trim() || 'Untitled Draft';
		const body = formData.get('body')?.toString()?.trim() || '';
		const excerpt = formData.get('excerpt')?.toString()?.trim() || '';
		const coverImage = formData.get('coverImage')?.toString()?.trim() || null;
		const tagsStr = formData.get('tags')?.toString()?.trim() || '';
		const schemaStr = formData.get('schema')?.toString()?.trim() || '';
		const slug = formData.get('slug')?.toString()?.trim() || `draft-${Date.now()}`;

		// Parse tags
		const tags = tagsStr
			.split(',')
			.map(t => t.trim().toLowerCase())
			.filter(t => t.length > 0);

		// Parse schema if provided
		let schema: Record<string, unknown> | undefined;
		if (schemaStr) {
			try {
				schema = JSON.parse(schemaStr);
			} catch {
				// Invalid JSON, ignore
			}
		}

		const now = Date.now();

		// If updating existing draft
		if (postId) {
			const existingData = await env.SHORT_LINKS.get(`marcus:post:${postId}`);
			if (existingData) {
				const existing = JSON.parse(existingData) as MarcusPost;
				const updatedPost: MarcusPost = {
					...existing,
					title,
					body,
					excerpt,
					coverImage,
					tags,
					schema,
					slug,
				};
				await env.SHORT_LINKS.put(`marcus:post:${postId}`, JSON.stringify(updatedPost));
				return jsonResponse({ success: true, id: postId });
			}
		}

		// Create new draft
		const id = postId || generateUniqueId(8);
		const draft: MarcusPost = {
			type: 'marcus:post',
			id,
			slug,
			title,
			body,
			excerpt,
			coverImage,
			tags,
			schema,
			status: 'draft',
			createdAt: now,
			publishedAt: 0, // Not published yet
		};

		// Store by ID
		await env.SHORT_LINKS.put(`marcus:post:${id}`, JSON.stringify(draft));

		// Store by slug
		await env.SHORT_LINKS.put(`marcus:slug:${slug}`, id);

		// Update index
		await updatePostIndex(env, id, now);

		return jsonResponse({ success: true, id });

	} catch (error) {
		console.error('Midgard save draft error:', error);
		return jsonResponse({ error: 'Failed to save draft' }, 500);
	}
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

/**
 * AI: Generate Title Suggestions
 * POST /midgard/ai/titles
 */
export async function handleMidgardAITitles(request: Request, env: Env): Promise<Response> {
	const access = checkMidgardAccess(request, env);
	if (!access.hasAccess) {
		return jsonResponse({ error: 'Unauthorized' }, 401);
	}

	try {
		const { body } = await request.json() as { body: string };
		
		if (!body || body.trim().length < 50) {
			return jsonResponse({ error: 'Content too short' }, 400);
		}

		const prompt = `Generate 5 catchy, engaging title suggestions for this blog post. Return ONLY a JSON array of strings, no other text.

Content:
${body.substring(0, 1000)}`;

		const aiResponse = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
			prompt,
			max_tokens: 200
		});

		const text = (aiResponse as { response?: string }).response || '';
		
		// Parse JSON array from response
		const jsonMatch = text.match(/\[[\s\S]*\]/);
		if (jsonMatch) {
			const titles = JSON.parse(jsonMatch[0]) as string[];
			return jsonResponse({ titles: titles.slice(0, 5) });
		}

		// Fallback: parse line by line
		const titles = text.split('\n')
			.map(line => line.replace(/^[\d]+[.)]?\s*/, '').replace(/"/g, '').replace(/\[|\]/g, '').trim())
			.filter(line => line.length > 5 && line.length < 100)
			.slice(0, 5);
		
		return jsonResponse({ titles });
	} catch (error) {
		console.error('AI titles error:', error);
		return jsonResponse({ error: 'Failed to generate titles' }, 500);
	}
}

/**
 * AI: Generate Excerpt
 * POST /midgard/ai/excerpt
 */
export async function handleMidgardAIExcerpt(request: Request, env: Env): Promise<Response> {
	const access = checkMidgardAccess(request, env);
	if (!access.hasAccess) {
		return jsonResponse({ error: 'Unauthorized' }, 401);
	}

	try {
		const { body } = await request.json() as { body: string };
		
		if (!body || body.trim().length < 50) {
			return jsonResponse({ error: 'Content too short' }, 400);
		}

		const prompt = `Summarize this blog post in 1-2 sentences for SEO. Keep it under 160 characters. Return ONLY the summary text, no quotes or extra formatting.

Content:
${body.substring(0, 1500)}`;

		const aiResponse = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
			prompt,
			max_tokens: 100
		});

		const excerpt = ((aiResponse as { response?: string }).response || '').trim();
		
		return jsonResponse({ excerpt });
	} catch (error) {
		console.error('AI excerpt error:', error);
		return jsonResponse({ error: 'Failed to generate excerpt' }, 500);
	}
}

/**
 * AI: Polish Prose
 * POST /midgard/ai/polish
 */
export async function handleMidgardAIPolish(request: Request, env: Env): Promise<Response> {
	const access = checkMidgardAccess(request, env);
	if (!access.hasAccess) {
		return jsonResponse({ error: 'Unauthorized' }, 401);
	}

	try {
		const { body } = await request.json() as { body: string };
		
		if (!body || body.trim().length < 50) {
			return jsonResponse({ error: 'Content too short' }, 400);
		}

		const prompt = `Improve this writing for clarity, flow, and impact. Fix grammar. Keep the same meaning and tone. Return ONLY the improved text, no explanations.

Text:
${body.substring(0, 2000)}`;

		const aiResponse = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
			prompt,
			max_tokens: 2000
		});

		const polished = ((aiResponse as { response?: string }).response || '').trim();
		
		return jsonResponse({ polished });
	} catch (error) {
		console.error('AI polish error:', error);
		return jsonResponse({ error: 'Failed to polish prose' }, 500);
	}
}

/**
 * AI: SEO Analysis (Keywords + Meta)
 * POST /midgard/ai/seo
 */
export async function handleMidgardAISeo(request: Request, env: Env): Promise<Response> {
	const access = checkMidgardAccess(request, env);
	if (!access.hasAccess) {
		return jsonResponse({ error: 'Unauthorized' }, 401);
	}

	try {
		const { title, body, excerpt } = await request.json() as { title: string; body: string; excerpt: string };
		
		if (!body || body.trim().length < 100) {
			return jsonResponse({ error: 'Content too short' }, 400);
		}

		const prompt = `Analyze this blog post for SEO. Return JSON with:
1. "keywords": array of 3 focus keywords/phrases (short, SEO-friendly)
2. "metaDescription": optimized meta description (150-160 chars, include main keyword)

Title: ${title || 'Untitled'}
Excerpt: ${excerpt || 'None'}
Content: ${body.substring(0, 1500)}

Return ONLY valid JSON, no other text.`;

		const aiResponse = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
			prompt,
			max_tokens: 200
		});

		const text = ((aiResponse as { response?: string }).response || '').trim();
		
		// Parse JSON from response
		const jsonMatch = text.match(/\{[\s\S]*\}/);
		if (jsonMatch) {
			const result = JSON.parse(jsonMatch[0]) as { keywords?: string[]; metaDescription?: string };
			return jsonResponse({
				keywords: result.keywords || [],
				metaDescription: result.metaDescription || null
			});
		}

		return jsonResponse({ keywords: [], metaDescription: null });
	} catch (error) {
		console.error('AI SEO error:', error);
		return jsonResponse({ error: 'Failed SEO analysis' }, 500);
	}
}

/**
 * AI: Generate JSON-LD Schema
 * POST /midgard/ai/schema
 */
export async function handleMidgardAISchema(request: Request, env: Env): Promise<Response> {
	const access = checkMidgardAccess(request, env);
	if (!access.hasAccess) {
		return jsonResponse({ error: 'Unauthorized' }, 401);
	}

	try {
		const { title, body, excerpt, coverImage } = await request.json() as { 
			title: string; 
			body: string; 
			excerpt: string;
			coverImage?: string;
		};
		
		if (!body || body.trim().length < 100) {
			return jsonResponse({ error: 'Content too short' }, 400);
		}

		const prompt = `Generate JSON-LD structured data for this blog post. Return ONLY valid JSON object (no markdown, no explanation).

Requirements:
- @context: "https://schema.org"
- @type: "Article"
- headline: the title
- description: the excerpt or a summary
- author: { "@type": "Person", "name": "PUNCHY.ME" }
- publisher: { "@type": "Organization", "name": "PUNCHY.ME", "url": "https://punchy.me" }
- datePublished: current date in ISO format
- dateModified: same as datePublished
- mainEntityOfPage: { "@type": "WebPage", "@id": "https://punchy.me/marcus/[slug]" }

${coverImage ? `Include image: "${coverImage}"` : 'Skip image field'}

Title: ${title || 'Untitled'}
Excerpt: ${excerpt || 'No excerpt'}
Content preview: ${body.substring(0, 500)}

Return ONLY the JSON object, no other text.`;

		const aiResponse = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
			prompt,
			max_tokens: 400
		});

		const text = ((aiResponse as { response?: string }).response || '').trim();
		
		// Parse JSON from response
		const jsonMatch = text.match(/\{[\s\S]*\}/);
		if (jsonMatch) {
			try {
				const schema = JSON.parse(jsonMatch[0]) as Record<string, unknown>;
				return jsonResponse({ schema });
			} catch {
				// Return raw text if parsing fails
				return jsonResponse({ schema: null, raw: text });
			}
		}

		return jsonResponse({ schema: null });
	} catch (error) {
		console.error('AI schema error:', error);
		return jsonResponse({ error: 'Failed to generate schema' }, 500);
	}
}
