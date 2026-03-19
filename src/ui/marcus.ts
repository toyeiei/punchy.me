/**
 * MARCUS Blog UI
 * Public-facing Stoic wisdom blog
 * Zen Minimalist Light Theme
 */

import { MarcusPost } from '../core/types';
import { PUNCHY_PORTAL_HTML } from './portal';

export function renderMarcusHome(posts: MarcusPost[]): string {
	const postsHtml = posts.map(post => renderPostCard(post)).join('');

	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>MARCUS - Stoic Wisdom</title>
	<meta name="description" content="Timeless wisdom for modern builders. Thoughts on stoicism, discipline, and the art of living well.">
	<link rel="alternate" type="application/rss+xml" title="MARCUS RSS" href="/marcus/rss">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
	<style>
		* { box-sizing: border-box; margin: 0; padding: 0; }
		body {
			background: #fff;
			color: #000;
			font-family: 'JetBrains Mono', monospace;
			min-height: 100vh;
		}
		.container { max-width: 720px; margin: 0 auto; padding: 60px 24px; }
		
		/* Header */
		.header { text-align: center; margin-bottom: 80px; padding-bottom: 60px; border-bottom: 1px solid #eee; }
		.nav { display: flex; justify-content: center; gap: 24px; margin-bottom: 40px; }
		.nav a { color: #999; font-size: 11px; text-decoration: none; letter-spacing: 0.5px; }
		.nav a:hover { color: #000; }
		.brand { font-size: 11px; color: #999; letter-spacing: 2px; margin-bottom: 32px; text-transform: uppercase; }
		.title { font-family: 'Crimson Pro', serif; font-size: 56px; font-weight: 600; margin-bottom: 24px; letter-spacing: -1px; }
		.subtitle { color: #666; font-size: 15px; max-width: 380px; margin: 0 auto; line-height: 1.7; font-family: 'Crimson Pro', serif; }
		
		/* Post cards */
		.posts { display: flex; flex-direction: column; gap: 60px; }
		
		.post-card {
			padding-bottom: 60px;
			border-bottom: 1px solid #eee;
		}
		.post-card:last-child { border-bottom: none; }
		
		.post-cover {
			width: 100%;
			height: 320px;
			object-fit: cover;
			border-radius: 8px;
			margin-bottom: 32px;
			background: #f5f5f5;
		}
		
		.post-meta { font-size: 11px; color: #999; margin-bottom: 16px; }
		.post-meta span { margin-right: 16px; }
		.post-title {
			font-family: 'Crimson Pro', serif;
			font-size: 32px;
			font-weight: 600;
			margin-bottom: 16px;
			line-height: 1.2;
		}
		.post-title a { color: #000; text-decoration: none; }
		.post-title a:hover { color: #22c55e; }
		
		.post-excerpt {
			color: #666;
			font-size: 16px;
			line-height: 1.8;
			margin-bottom: 20px;
			font-family: 'Crimson Pro', serif;
		}
		
		.post-tags { display: flex; gap: 10px; flex-wrap: wrap; }
		.post-tag {
			font-size: 11px;
			color: #666;
			background: #f5f5f5;
			padding: 6px 14px;
			border-radius: 20px;
			text-decoration: none;
		}
		.post-tag:hover { background: #22c55e; color: #fff; }
		
		/* Empty state */
		.empty-state { text-align: center; padding: 80px 20px; color: #999; }
		
		/* Footer */
		.footer {
			margin-top: 80px;
			padding-top: 60px;
			border-top: 1px solid #eee;
			text-align: center;
		}
		.footer-quote {
			font-family: 'Crimson Pro', serif;
			font-style: italic;
			color: #999;
			font-size: 18px;
			margin-bottom: 24px;
		}
		.footer-brand { font-size: 11px; color: #999; }
		.footer-brand a { color: #22c55e; text-decoration: none; }
	</style>
</head>
<body>
	<div class="container">
		<header class="header">
			<nav class="nav">
				<a href="/">home</a>
				<a href="/marcus/rss">rss</a>
			</nav>
			<div class="brand">PUNCHY.ME</div>
			<h1 class="title">MARCUS</h1>
			<p class="subtitle">Timeless wisdom for modern builders. Thoughts on stoicism, discipline, and the art of living well.</p>
		</header>

		<main class="posts">
			${posts.length > 0 ? postsHtml : `
				<div class="empty-state">
					<p>No posts yet.</p>
					<p style="margin-top: 12px; font-size: 13px; font-family: 'Crimson Pro', serif; font-style: italic;">Wisdom takes time to cultivate.</p>
				</div>
			`}
		</main>

		<footer class="footer">
			<p class="footer-quote">"The obstacle becomes the way."</p>
			<p class="footer-brand">Part of <a href="/">PUNCHY.ME</a></p>
		</footer>
	</div>
	${PUNCHY_PORTAL_HTML}
</body>
</html>`;
}

function renderPostCard(post: MarcusPost): string {
	const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	const coverHtml = post.coverImage
		? `<img src="${post.coverImage}" alt="" class="post-cover" loading="lazy">`
		: '';

	const tagsHtml = post.tags
		.map(tag => `<a href="/marcus/tag/${tag}" class="post-tag">${tag}</a>`)
		.join('');

	return `
		<article class="post-card">
			${coverHtml}
			<div class="post-meta"><span>${date}</span><span>${post.tags.length > 0 ? post.tags[0] : ''}</span></div>
			<h2 class="post-title"><a href="/marcus/${post.slug}">${escapeHTML(post.title)}</a></h2>
			<p class="post-excerpt">${escapeHTML(post.excerpt)}</p>
			<div class="post-tags">${tagsHtml}</div>
		</article>
	`;
}

export function renderMarcusPost(post: MarcusPost): string {
	const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	const readingTime = Math.ceil(post.body.split(/\s+/).length / 200);

	const coverHtml = post.coverImage
		? `<img src="${post.coverImage}" alt="" class="post-cover">`
		: '';

	const tagsHtml = post.tags
		.map(tag => `<a href="/marcus/tag/${tag}" class="tag">${tag}</a>`)
		.join('');

	// JSON-LD Schema
	const schemaHtml = post.schema
		? `<script type="application/ld+json">${JSON.stringify(post.schema)}</script>`
		: '';

	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>${escapeHTML(post.title)} - MARCUS</title>
	<meta name="description" content="${escapeHTML(post.excerpt)}">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
	<!-- JSON-LD Structured Data -->
	${schemaHtml}
	<!-- Markdown rendering -->
	<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.0.6/purify.min.js"></script>
	<style>
		* { box-sizing: border-box; margin: 0; padding: 0; }
		body {
			background: #fff;
			color: #000;
			font-family: 'JetBrains Mono', monospace;
			min-height: 100vh;
		}
		.container { max-width: 720px; margin: 0 auto; padding: 60px 24px; }
		
		/* Back link */
		.back-link { margin-bottom: 60px; }
		.back-link a { color: #999; font-size: 12px; text-decoration: none; }
		.back-link a:hover { color: #000; }
		
		/* Cover */
		.post-cover {
			width: 100%;
			height: 360px;
			object-fit: cover;
			border-radius: 8px;
			margin-bottom: 40px;
			background: #f5f5f5;
		}
		
		/* Header */
		.post-header { margin-bottom: 48px; }
		.post-meta { font-size: 12px; color: #999; margin-bottom: 20px; }
		.post-meta span { margin-right: 20px; }
		.post-title {
			font-family: 'Crimson Pro', serif;
			font-size: 48px;
			font-weight: 600;
			line-height: 1.15;
			margin-bottom: 24px;
		}
		.post-tags { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 24px; }
		.tag {
			font-size: 11px;
			color: #666;
			background: #f5f5f5;
			padding: 6px 14px;
			border-radius: 20px;
			text-decoration: none;
		}
		.tag:hover { background: #22c55e; color: #fff; }
		
		/* Excerpt */
		.post-excerpt {
			font-family: 'Crimson Pro', serif;
			font-size: 20px;
			line-height: 1.6;
			color: #666;
			font-style: italic;
			padding-bottom: 40px;
			margin-bottom: 40px;
			border-bottom: 1px solid #eee;
		}
		
		/* Body */
		.post-body {
			font-family: 'Crimson Pro', serif;
			font-size: 19px;
			line-height: 1.85;
			color: #333;
			margin-bottom: 60px;
		}
		.post-body p { margin-bottom: 28px; }
		.post-body h1, .post-body h2, .post-body h3 { font-family: 'Crimson Pro', serif; color: #000; margin: 2.5rem 0 1.25rem; line-height: 1.2; }
		.post-body h1 { font-size: 36px; }
		.post-body h2 { font-size: 28px; }
		.post-body h3 { font-size: 22px; }
		.post-body ul, .post-body ol { margin: 1.5rem 0; padding-left: 1.5rem; }
		.post-body li { margin-bottom: 0.75rem; }
		.post-body blockquote { 
			border-left: 3px solid #22c55e; 
			padding-left: 1.5rem; 
			margin: 2rem 0; 
			color: #666; 
			font-style: italic; 
		}
		.post-body code { background: #f5f5f5; padding: 3px 8px; border-radius: 4px; font-size: 0.85em; }
		.post-body pre { background: #f5f5f5; padding: 1.5rem; border-radius: 8px; overflow-x: auto; margin: 1.5rem 0; }
		.post-body pre code { background: none; padding: 0; }
		.post-body a { color: #22c55e; text-decoration: none; }
		.post-body a:hover { text-decoration: underline; }
		.post-body img { max-width: 100%; border-radius: 8px; margin: 2rem 0; }
		.post-body hr { border: none; border-top: 1px solid #eee; margin: 2.5rem 0; }
		
		/* Footer */
		.post-footer {
			padding-top: 48px;
			border-top: 1px solid #eee;
			text-align: center;
		}
		.share-text { font-size: 11px; color: #999; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; }
		.share-link {
			color: #000;
			font-size: 13px;
			padding: 12px 24px;
			border: 1px solid #ddd;
			border-radius: 6px;
			text-decoration: none;
			display: inline-block;
		}
		.share-link:hover { border-color: #000; background: #000; color: #fff; }
	</style>
</head>
<body>
	<div class="container">
		<nav class="back-link">
			<a href="/marcus">← MARCUS</a>
		</nav>

		${coverHtml}

		<header class="post-header">
			<div class="post-meta"><span>${date}</span><span>${readingTime} min read</span></div>
			<h1 class="post-title">${escapeHTML(post.title)}</h1>
			<div class="post-tags">${tagsHtml}</div>
		</header>

		<p class="post-excerpt">${escapeHTML(post.excerpt)}</p>

		<article class="post-body" id="post-body">
			<!-- Markdown content rendered by JS -->
		</article>

		<footer class="post-footer">
			<p class="share-text">Share this wisdom</p>
			<a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://punchy.me/marcus/${post.slug}`)}" class="share-link" target="_blank" rel="noopener">Share on X</a>
		</footer>
	</div>
	${PUNCHY_PORTAL_HTML}
	<script>
		// Render markdown body
		const bodyEl = document.getElementById('post-body');
		const markdown = ${JSON.stringify(post.body)};
		bodyEl.innerHTML = DOMPurify.sanitize(marked.parse(markdown || '', { breaks: true }));
	</script>
</body>
</html>`;
}

export function renderMarcusTag(tag: string, posts: MarcusPost[]): string {
	const postsHtml = posts.map(post => renderPostCard(post)).join('');

	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>${tag} - MARCUS</title>
	<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Crimson+Pro:wght@400;600&display=swap" rel="stylesheet">
	<style>
		* { box-sizing: border-box; margin: 0; padding: 0; }
		body { background: #fff; color: #000; font-family: 'JetBrains Mono', monospace; min-height: 100vh; }
		.container { max-width: 720px; margin: 0 auto; padding: 60px 24px; }
		
		.back-link { margin-bottom: 60px; }
		.back-link a { color: #999; font-size: 12px; text-decoration: none; }
		.back-link a:hover { color: #000; }
		
		.header { margin-bottom: 60px; padding-bottom: 40px; border-bottom: 1px solid #eee; }
		.tag-title {
			font-family: 'Crimson Pro', serif;
			font-size: 40px;
			margin-bottom: 12px;
		}
		.tag-title span { color: #22c55e; }
		.post-count { color: #999; font-size: 13px; }
		
		.posts { display: flex; flex-direction: column; gap: 60px; }
		.post-card { padding-bottom: 60px; border-bottom: 1px solid #eee; }
		.post-card:last-child { border-bottom: none; }
		.post-meta { font-size: 11px; color: #999; margin-bottom: 16px; }
		.post-title { font-family: 'Crimson Pro', serif; font-size: 28px; margin-bottom: 16px; line-height: 1.2; }
		.post-title a { color: #000; text-decoration: none; }
		.post-title a:hover { color: #22c55e; }
		.post-excerpt { color: #666; font-size: 16px; line-height: 1.7; font-family: 'Crimson Pro', serif; }
	</style>
</head>
<body>
	<div class="container">
		<nav class="back-link">
			<a href="/marcus">← MARCUS</a>
		</nav>

		<header class="header">
			<h1 class="tag-title">Posts tagged <span>#${tag}</span></h1>
			<p class="post-count">${posts.length} post${posts.length !== 1 ? 's' : ''}</p>
		</header>

		<main class="posts">
			${postsHtml || '<p style="color:#999; font-family: Crimson Pro, serif; font-style: italic;">No posts with this tag.</p>'}
		</main>
	</div>
	${PUNCHY_PORTAL_HTML}
</body>
</html>`;
}

function escapeHTML(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}
