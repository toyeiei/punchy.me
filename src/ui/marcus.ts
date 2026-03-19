/**
 * MARCUS Blog UI
 * Public-facing Stoic wisdom blog
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
	<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
	<style>
		* { box-sizing: border-box; margin: 0; padding: 0; }
		body {
			background: #000;
			color: #fff;
			font-family: 'JetBrains Mono', monospace;
			min-height: 100vh;
		}
		.container { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
		
		/* Header */
		.header { text-align: center; margin-bottom: 60px; }
		.brand { font-size: 11px; color: #22c55e; letter-spacing: 3px; margin-bottom: 24px; }
		.title { font-family: 'Crimson Pro', serif; font-size: 48px; font-weight: 600; margin-bottom: 16px; letter-spacing: -1px; }
		.subtitle { color: #666; font-size: 14px; max-width: 400px; margin: 0 auto; line-height: 1.6; }
		.rss-link { margin-top: 24px; }
		.rss-link a { color: #444; font-size: 11px; text-decoration: none; }
		.rss-link a:hover { color: #22c55e; }
		
		/* Post cards */
		.posts { display: flex; flex-direction: column; gap: 40px; }
		
		.post-card {
			background: rgba(255,255,255,0.02);
			border: 1px solid rgba(34,197,94,0.1);
			border-radius: 12px;
			overflow: hidden;
			transition: border-color 0.2s, transform 0.2s;
		}
		.post-card:hover { border-color: rgba(34,197,94,0.3); }
		
		.post-cover {
			width: 100%;
			height: 200px;
			object-fit: cover;
			background: #111;
		}
		
		.post-content { padding: 24px; }
		.post-date { font-size: 11px; color: #444; margin-bottom: 12px; }
		.post-title {
			font-family: 'Crimson Pro', serif;
			font-size: 26px;
			font-weight: 600;
			margin-bottom: 12px;
			line-height: 1.3;
		}
		.post-title a { color: #fff; text-decoration: none; }
		.post-title a:hover { color: #22c55e; }
		
		.post-excerpt {
			color: #888;
			font-size: 14px;
			line-height: 1.7;
			margin-bottom: 16px;
		}
		
		.post-tags { display: flex; gap: 8px; flex-wrap: wrap; }
		.post-tag {
			font-size: 10px;
			color: #22c55e;
			background: rgba(34,197,94,0.1);
			padding: 4px 10px;
			border-radius: 4px;
			text-decoration: none;
		}
		.post-tag:hover { background: rgba(34,197,94,0.2); }
		
		/* Empty state */
		.empty-state { text-align: center; padding: 80px 20px; color: #444; }
		
		/* Footer */
		.footer {
			margin-top: 80px;
			padding-top: 40px;
			border-top: 1px solid #111;
			text-align: center;
		}
		.footer-quote {
			font-family: 'Crimson Pro', serif;
			font-style: italic;
			color: #444;
			font-size: 16px;
			margin-bottom: 24px;
		}
		.footer-brand { font-size: 11px; color: #333; }
		.footer-brand a { color: #22c55e; text-decoration: none; }
	</style>
</head>
<body>
	<div class="container">
		<header class="header">
			<div class="brand">PUNCHY.ME</div>
			<h1 class="title">MARCUS</h1>
			<p class="subtitle">Timeless wisdom for modern builders. Thoughts on stoicism, discipline, and the art of living well.</p>
			<div class="rss-link"><a href="/marcus/rss">RSS Feed →</a></div>
		</header>

		<main class="posts">
			${posts.length > 0 ? postsHtml : `
				<div class="empty-state">
					<p>No posts yet.</p>
					<p style="margin-top: 12px; font-size: 12px;">Wisdom takes time to cultivate.</p>
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
			<div class="post-content">
				<div class="post-date">${date}</div>
				<h2 class="post-title"><a href="/marcus/${post.slug}">${escapeHTML(post.title)}</a></h2>
				<p class="post-excerpt">${escapeHTML(post.excerpt)}</p>
				<div class="post-tags">${tagsHtml}</div>
			</div>
		</article>
	`;
}

export function renderMarcusPost(post: MarcusPost): string {
	const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	const coverHtml = post.coverImage
		? `<img src="${post.coverImage}" alt="" class="post-cover">`
		: '';

	const tagsHtml = post.tags
		.map(tag => `<a href="/marcus/tag/${tag}" class="tag">${tag}</a>`)
		.join('');

	// Convert body to paragraphs
	const bodyHtml = post.body
		.split('\n\n')
		.map(p => p.trim())
		.filter(p => p.length > 0)
		.map(p => `<p>${escapeHTML(p)}</p>`)
		.join('\n');

	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>${escapeHTML(post.title)} - MARCUS</title>
	<meta name="description" content="${escapeHTML(post.excerpt)}">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
	<style>
		* { box-sizing: border-box; margin: 0; padding: 0; }
		body {
			background: #000;
			color: #fff;
			font-family: 'JetBrains Mono', monospace;
			min-height: 100vh;
		}
		.container { max-width: 720px; margin: 0 auto; padding: 40px 20px; }
		
		/* Back link */
		.back-link { margin-bottom: 40px; }
		.back-link a { color: #444; font-size: 12px; text-decoration: none; }
		.back-link a:hover { color: #22c55e; }
		
		/* Cover */
		.post-cover {
			width: 100%;
			height: 300px;
			object-fit: cover;
			border-radius: 12px;
			margin-bottom: 32px;
			background: #111;
		}
		
		/* Header */
		.post-header { margin-bottom: 40px; }
		.post-date { font-size: 11px; color: #444; margin-bottom: 16px; }
		.post-title {
			font-family: 'Crimson Pro', serif;
			font-size: 40px;
			font-weight: 600;
			line-height: 1.2;
			margin-bottom: 20px;
		}
		.post-tags { display: flex; gap: 8px; flex-wrap: wrap; }
		.tag {
			font-size: 10px;
			color: #22c55e;
			background: rgba(34,197,94,0.1);
			padding: 4px 10px;
			border-radius: 4px;
			text-decoration: none;
		}
		.tag:hover { background: rgba(34,197,94,0.2); }
		
		/* Body */
		.post-body {
			font-family: 'Crimson Pro', serif;
			font-size: 20px;
			line-height: 1.8;
			color: #ccc;
			margin-bottom: 60px;
		}
		.post-body p { margin-bottom: 24px; }
		
		/* Footer */
		.post-footer {
			padding-top: 40px;
			border-top: 1px solid #111;
			text-align: center;
		}
		.share-text { font-size: 11px; color: #444; margin-bottom: 16px; }
		.share-link {
			color: #666;
			font-size: 12px;
			padding: 10px 20px;
			border: 1px solid #222;
			border-radius: 6px;
			text-decoration: none;
			display: inline-block;
		}
		.share-link:hover { border-color: #22c55e; color: #22c55e; }
	</style>
</head>
<body>
	<div class="container">
		<nav class="back-link">
			<a href="/marcus">← Back to MARCUS</a>
		</nav>

		${coverHtml}

		<header class="post-header">
			<div class="post-date">${date}</div>
			<h1 class="post-title">${escapeHTML(post.title)}</h1>
			<div class="post-tags">${tagsHtml}</div>
		</header>

		<article class="post-body">
			${bodyHtml}
		</article>

		<footer class="post-footer">
			<p class="share-text">Share this wisdom</p>
			<a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://punchy.me/marcus/${post.slug}`)}" class="share-link" target="_blank" rel="noopener">Share on X</a>
		</footer>
	</div>
	${PUNCHY_PORTAL_HTML}
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
	<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Crimson+Pro:wght@400;600&display=swap" rel="stylesheet">
	<style>
		* { box-sizing: border-box; margin: 0; padding: 0; }
		body { background: #000; color: #fff; font-family: 'JetBrains Mono', monospace; min-height: 100vh; }
		.container { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
		
		.back-link { margin-bottom: 40px; }
		.back-link a { color: #444; font-size: 12px; text-decoration: none; }
		.back-link a:hover { color: #22c55e; }
		
		.header { margin-bottom: 40px; }
		.tag-title {
			font-family: 'Crimson Pro', serif;
			font-size: 32px;
			margin-bottom: 8px;
		}
		.tag-title span { color: #22c55e; }
		.post-count { color: #444; font-size: 12px; }
		
		.posts { display: flex; flex-direction: column; gap: 40px; }
		.post-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(34,197,94,0.1); border-radius: 12px; padding: 24px; }
		.post-date { font-size: 11px; color: #444; margin-bottom: 12px; }
		.post-title { font-family: 'Crimson Pro', serif; font-size: 22px; margin-bottom: 12px; }
		.post-title a { color: #fff; text-decoration: none; }
		.post-title a:hover { color: #22c55e; }
		.post-excerpt { color: #888; font-size: 14px; line-height: 1.6; }
	</style>
</head>
<body>
	<div class="container">
		<nav class="back-link">
			<a href="/marcus">← Back to MARCUS</a>
		</nav>

		<header class="header">
			<h1 class="tag-title">Posts tagged <span>#${tag}</span></h1>
			<p class="post-count">${posts.length} post${posts.length !== 1 ? 's' : ''}</p>
		</header>

		<main class="posts">
			${postsHtml || '<p style="color:#444">No posts with this tag.</p>'}
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
