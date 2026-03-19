/**
 * Midgard Editor UI
 * Private writing interface for MARCUS
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
	<style>
		* { box-sizing: border-box; margin: 0; padding: 0; }
		body {
			background: #000;
			color: #fff;
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
			border-bottom: 1px solid rgba(34,197,94,0.2);
		}
		.logo { color: #22c55e; font-size: 12px; letter-spacing: 2px; }
		.nav-links a { color: #666; text-decoration: none; margin-left: 24px; font-size: 12px; }
		.nav-links a:hover { color: #22c55e; }
		
		/* Title */
		.page-title { font-size: 28px; margin-bottom: 8px; }
		.page-subtitle { color: #666; font-size: 13px; margin-bottom: 40px; }
		
		/* Form */
		.form-group { margin-bottom: 24px; }
		.form-label { display: block; font-size: 11px; color: #22c55e; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px; }
		
		.form-input {
			width: 100%;
			background: rgba(255,255,255,0.03);
			border: 1px solid rgba(34,197,94,0.2);
			border-radius: 8px;
			padding: 16px;
			color: #fff;
			font-family: inherit;
			font-size: 16px;
			transition: border-color 0.2s;
		}
		.form-input:focus {
			outline: none;
			border-color: #22c55e;
		}
		.form-input::placeholder { color: #444; }
		
		/* Title input - larger */
		.title-input { font-size: 24px; font-weight: 600; }
		
		/* Body textarea - larger, serif for writing */
		.body-input {
			font-family: 'Crimson Pro', Georgia, serif;
			font-size: 18px;
			line-height: 1.8;
			min-height: 400px;
			resize: vertical;
		}
		
		/* Excerpt */
		.excerpt-input { min-height: 80px; font-size: 14px; }
		
		/* Slug preview */
		.slug-preview { 
			margin-top: 8px; 
			font-size: 12px; 
			color: #666; 
		}
		.slug-preview span { color: #22c55e; }
		
		/* Tags */
		.tags-help { font-size: 11px; color: #444; margin-top: 8px; }
		
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
			background: #22c55e;
			color: #000;
			border: none;
		}
		.btn-primary:hover {
			transform: scale(1.02);
			box-shadow: 0 0 20px rgba(34,197,94,0.3);
		}
		.btn-secondary {
			background: transparent;
			color: #666;
			border: 1px solid #333;
		}
		.btn-secondary:hover { border-color: #666; color: #fff; }
		
		/* Success message */
		.success-msg {
			background: rgba(34,197,94,0.1);
			border: 1px solid #22c55e;
			border-radius: 8px;
			padding: 20px;
			margin-bottom: 24px;
			display: none;
		}
		.success-msg.show { display: block; }
		.success-msg a { color: #22c55e; }
		
		/* Word count */
		.word-count {
			text-align: right;
			font-size: 11px;
			color: #444;
			margin-top: 8px;
		}
	</style>
</head>
<body>
	<div class="container">
		<header class="header">
			<div class="logo">PUNCHY.ME / MIDGARD</div>
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
