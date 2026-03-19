/**
 * Midgard Editor UI
 * Private writing interface for MARCUS
 * Supports Markdown with preview
 * Zen, calm light theme - black and white
 */

export function renderMidgardEditor(): string {
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Midgard - MARCUS Editor</title>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
	<!-- Markdown preview dependencies -->
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
		.container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
		
		/* Header */
		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 40px;
			padding-bottom: 20px;
			border-bottom: 1px solid #eee;
		}
		.logo { color: #000; font-size: 12px; letter-spacing: 2px; }
		.nav-links a { color: #999; text-decoration: none; margin-left: 24px; font-size: 12px; }
		.nav-links a:hover { color: #000; }
		
		/* Title */
		.page-title { font-size: 28px; margin-bottom: 8px; font-weight: 400; }
		.page-subtitle { color: #999; font-size: 13px; margin-bottom: 40px; }
		
		/* Form */
		.form-group { margin-bottom: 24px; }
		.form-label { display: block; font-size: 11px; color: #666; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px; }
		
		.form-input {
			width: 100%;
			background: #fafafa;
			border: 1px solid #eee;
			border-radius: 8px;
			padding: 16px;
			color: #000;
			font-family: inherit;
			font-size: 16px;
			transition: border-color 0.2s, box-shadow 0.2s;
		}
		.form-input:focus {
			outline: none;
			border-color: #000;
			box-shadow: 0 0 0 3px rgba(0,0,0,0.05);
		}
		.form-input::placeholder { color: #ccc; }
		
		/* Title input - larger */
		.title-input { font-size: 24px; font-weight: 600; background: #fff; }
		
		/* Body textarea - larger, serif for writing */
		.body-input {
			font-family: 'Crimson Pro', Georgia, serif;
			font-size: 18px;
			line-height: 1.8;
			min-height: 400px;
			resize: vertical;
			background: #fff;
		}
		
		/* Excerpt */
		.excerpt-input { min-height: 80px; font-size: 14px; }
		
		/* Slug preview */
		.slug-preview { 
			margin-top: 8px; 
			font-size: 12px; 
			color: #999; 
		}
		.slug-preview span { color: #666; }
		
		/* Tags */
		.tags-help { font-size: 11px; color: #ccc; margin-top: 8px; }
		
		/* Actions */
		.actions {
			display: flex;
			gap: 16px;
			margin-top: 32px;
		}
		.btn {
			padding: 14px 32px;
			border-radius: 8px;
			font-family: inherit;
			font-size: 13px;
			font-weight: 600;
			cursor: pointer;
			transition: all 0.2s;
		}
		.btn-primary {
			background: #000;
			color: #fff;
			border: none;
		}
		.btn-primary:hover {
			background: #333;
		}
		.btn-secondary {
			background: transparent;
			color: #666;
			border: 1px solid #ddd;
		}
		.btn-secondary:hover { border-color: #999; color: #000; }
		
		/* Success message */
		.success-msg {
			background: #f0f0f0;
			border: 1px solid #000;
			border-radius: 8px;
			padding: 20px;
			margin-bottom: 24px;
			display: none;
		}
		.success-msg.show { display: block; }
		.success-msg a { color: #000; text-decoration: underline; }
		
		/* Word count */
		.word-count {
			text-align: right;
			font-size: 11px;
			color: #ccc;
			margin-top: 8px;
		}
	</style>
</head>
<body>
	<div class="container">
		<header class="header">
			<div class="logo">MIDGARD</div>
			<nav class="nav-links">
				<a href="/marcus">View Blog</a>
				<a href="/">Home</a>
			</nav>
		</header>

		<h1 class="page-title">Write for MARCUS</h1>
		<p class="page-subtitle">Timeless wisdom for modern builders</p>

		<div id="success-msg" class="success-msg">
			<strong>Published!</strong> View at: <a id="post-link" href="#"></a>
		</div>

		<form id="publish-form">
			<div class="form-group">
				<label class="form-label">Title</label>
				<input type="text" name="title" class="form-input title-input" placeholder="The obstacle becomes the way" required>
			</div>

			<div class="form-group">
				<label class="form-label">Slug (URL path)</label>
				<input type="text" name="slug" class="form-input" placeholder="the-obstacle-becomes-the-way" required pattern="[a-z0-9-]+" title="Lowercase letters, numbers, and hyphens only">
				<div class="slug-preview">URL: <span>punchy.me/marcus/<span id="slug-preview-text">your-slug</span></span></div>
			</div>

			<div class="form-group">
				<label class="form-label">Body</label>
				<textarea name="body" class="form-input body-input" placeholder="Write your thoughts here..." required></textarea>
				<div class="word-count"><span id="word-count">0</span> words</div>
			</div>

			<div class="form-group">
				<label class="form-label">Excerpt (optional)</label>
				<textarea name="excerpt" class="form-input excerpt-input" placeholder="Brief summary for previews and SEO..."></textarea>
			</div>

			<div class="form-group">
				<label class="form-label">Cover Image URL (optional)</label>
				<input type="url" name="coverImage" class="form-input" placeholder="https://images.unsplash.com/...">
			</div>

			<div class="form-group">
				<label class="form-label">Tags</label>
				<input type="text" name="tags" class="form-input" placeholder="stoicism, discipline, mindset">
				<div class="tags-help">Comma-separated, lowercase</div>
			</div>

			<div class="actions">
				<button type="submit" class="btn btn-primary">Publish</button>
				<button type="button" class="btn btn-secondary" onclick="previewMarkdown()">Preview</button>
				<button type="button" class="btn btn-secondary" onclick="clearForm()">Clear</button>
			</div>
		</form>
	</div>

	<script>
		const form = document.getElementById('publish-form');
		const slugInput = form.querySelector('[name="slug"]');
		const slugPreview = document.getElementById('slug-preview-text');
		const bodyInput = form.querySelector('[name="body"]');
		const wordCount = document.getElementById('word-count');
		const successMsg = document.getElementById('success-msg');
		const postLink = document.getElementById('post-link');

		// Slug preview
		slugInput.addEventListener('input', () => {
			slugPreview.textContent = slugInput.value || 'your-slug';
		});

		// Word count
		bodyInput.addEventListener('input', () => {
			const words = bodyInput.value.trim().split(/\\s+/).filter(w => w.length > 0);
			wordCount.textContent = words.length;
		});

		// Markdown preview - opens in new tab
		function previewMarkdown() {
			const title = form.querySelector('[name="title"]').value;
			const body = bodyInput.value;
			const excerpt = form.querySelector('[name="excerpt"]').value;
			const coverImage = form.querySelector('[name="coverImage"]').value;
			const tags = form.querySelector('[name="tags"]').value;

			// Parse markdown with DOMPurify
			const renderedBody = DOMPurify.sanitize(marked.parse(body || ''));

			// Build preview HTML (same style as MARCUS post page - dark theme)
			const tagsHtml = tags ? tags.split(',').map(t => '<span style="background:rgba(34,197,94,0.1);color:#22c55e;padding:4px 12px;border-radius:20px;font-size:12px;margin-right:8px;">' + t.trim() + '</span>').join('') : '';

			const previewHtml = '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>' + (title || 'Preview') + ' - MARCUS</title><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet"><style>*{box-sizing:border-box;margin:0;padding:0}body{background:#000;color:#fff;font-family:JetBrains Mono,monospace;line-height:1.8}.container{max-width:800px;margin:0 auto;padding:40px 20px}.cover-img{width:100%;height:300px;object-fit:cover;border-radius:12px;margin-bottom:40px}.title{font-family:Crimson Pro,Georgia,serif;font-size:42px;margin-bottom:24px;line-height:1.2}.meta{color:#666;font-size:12px;margin-bottom:40px}.tags{margin-bottom:40px}.body{font-family:Crimson Pro,Georgia,serif;font-size:18px;line-height:1.9}.body h1,.body h2,.body h3{font-family:Crimson Pro,Georgia,serif;margin:2rem 0 1rem;color:#fff}.body p{margin-bottom:1.5rem}.body ul,.body ol{margin:1.5rem 0;padding-left:2rem}.body li{margin-bottom:0.5rem}.body blockquote{border-left:3px solid #22c55e;padding-left:1.5rem;margin:1.5rem 0;color:#888;font-style:italic}.body code{background:rgba(255,255,255,0.1);padding:2px 8px;border-radius:4px;font-size:0.9em}.body pre{background:rgba(0,0,0,0.5);padding:1.5rem;border-radius:8px;overflow-x:auto;margin:1.5rem 0}.body pre code{background:none;padding:0}.body a{color:#22c55e;text-decoration:none}.watermark{position:fixed;top:20px;right:20px;background:#000;color:#fff;border:1px solid #fff;font-size:10px;padding:8px 16px;border-radius:20px;z-index:100}</style></head><body><div class="watermark">PREVIEW</div><div class="container">' + (coverImage ? '<img src="' + coverImage + '" class="cover-img" alt="">' : '') + '<h1 class="title">' + (title || 'Untitled') + '</h1><div class="meta">Just now · ' + (wordCount.textContent) + ' words</div>' + (tagsHtml ? '<div class="tags">' + tagsHtml + '</div>' : '') + (excerpt ? '<p style="color:#888;font-style:italic;margin-bottom:40px;">' + excerpt + '</p>' : '') + '<div class="body">' + renderedBody + '</div></div></body></html>';

			// Open in new tab
			const blob = new Blob([previewHtml], { type: 'text/html' });
			const url = URL.createObjectURL(blob);
			window.open(url, '_blank');
		}

		// Form submit
		form.addEventListener('submit', async (e) => {
			e.preventDefault();
			
			const formData = new FormData(form);
			const btn = form.querySelector('.btn-primary');
			btn.textContent = 'Publishing...';
			btn.disabled = true;

			try {
				const res = await fetch('/midgard/publish', {
					method: 'POST',
					body: formData
				});

				const data = await res.json();

				if (data.success) {
					postLink.href = data.url;
					postLink.textContent = data.url;
					successMsg.classList.add('show');
					
					// Clear form after success
					setTimeout(() => {
						form.reset();
						slugPreview.textContent = 'your-slug';
						wordCount.textContent = '0';
					}, 2000);
				} else {
					alert('Error: ' + (data.error || 'Unknown error'));
				}
			} catch (err) {
				alert('Failed to publish: ' + err.message);
			}

			btn.textContent = 'Publish';
			btn.disabled = false;
		});

		function clearForm() {
			if (confirm('Clear all fields?')) {
				form.reset();
				slugPreview.textContent = 'your-slug';
				wordCount.textContent = '0';
				successMsg.classList.remove('show');
			}
		}
	</script>
</body>
</html>`;
}

export function renderMidgardSuccess(postUrl: string): string {
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Published - Midgard</title>
	<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet">
	<style>
		body { background: #000; color: #fff; font-family: 'JetBrains Mono', monospace; text-align: center; padding: 100px 20px; }
		.icon { font-size: 64px; margin-bottom: 24px; }
		.title { font-size: 28px; margin-bottom: 16px; color: #22c55e; }
		.link { color: #666; font-size: 14px; }
		.link a { color: #22c55e; text-decoration: none; }
	</style>
</head>
<body>
	<div class="icon">✓</div>
	<h1 class="title">Published!</h1>
	<p class="link">View at: <a href="${postUrl}">${postUrl}</a></p>
</body>
</html>`;
}
