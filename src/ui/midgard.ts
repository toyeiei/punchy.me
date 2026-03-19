/**
 * Midgard Editor UI
 * Private writing interface for MARCUS
 * Supports Markdown with preview
 * Zen, calm light theme - black and white
 * Sidebar layout with auto-save, keyboard shortcuts, markdown help
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
		
		/* Header */
		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 16px 24px;
			border-bottom: 1px solid #eee;
			position: sticky;
			top: 0;
			background: #fff;
			z-index: 100;
		}
		.logo { color: #000; font-size: 12px; letter-spacing: 2px; font-weight: 600; }
		.nav-links a { color: #999; text-decoration: none; margin-left: 24px; font-size: 12px; }
		.nav-links a:hover { color: #000; }
		.save-status { font-size: 11px; color: #ccc; margin-right: auto; margin-left: 24px; }
		.save-status.saved { color: #22c55e; }
		
		/* Main Layout */
		.main-layout {
			display: flex;
			min-height: calc(100vh - 57px);
		}
		
		/* Sidebar */
		.sidebar {
			width: 25%;
			min-width: 280px;
			max-width: 360px;
			background: #fafafa;
			border-right: 1px solid #eee;
			padding: 24px;
			overflow-y: auto;
			height: calc(100vh - 57px);
			position: sticky;
			top: 57px;
		}
		
		/* Editor Panel */
		.editor-panel {
			flex: 1;
			padding: 32px 40px;
			max-width: 900px;
		}
		
		/* Form Elements */
		.form-group { margin-bottom: 20px; }
		.form-label { display: block; font-size: 10px; color: #999; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 1px; }
		
		.form-input {
			width: 100%;
			background: #fff;
			border: 1px solid #eee;
			border-radius: 6px;
			padding: 12px;
			color: #000;
			font-family: inherit;
			font-size: 14px;
			transition: border-color 0.2s, box-shadow 0.2s;
		}
		.form-input:focus {
			outline: none;
			border-color: #000;
			box-shadow: 0 0 0 2px rgba(0,0,0,0.05);
		}
		.form-input::placeholder { color: #ccc; }
		
		/* Sidebar inputs - smaller */
		.sidebar .form-input { font-size: 13px; padding: 10px; }
		.sidebar .form-group { margin-bottom: 16px; }
		
		/* Slug preview */
		.slug-preview { margin-top: 6px; font-size: 11px; color: #999; word-break: break-all; }
		.slug-preview span { color: #666; }
		
		/* Tags help */
		.tags-help { font-size: 10px; color: #ccc; margin-top: 4px; }
		
		/* Editor Title */
		.title-input {
			font-size: 32px;
			font-weight: 600;
			font-family: 'Crimson Pro', Georgia, serif;
			border: none;
			background: transparent;
			padding: 0;
			margin-bottom: 24px;
			width: 100%;
		}
		.title-input:focus { outline: none; box-shadow: none; }
		.title-input::placeholder { color: #ddd; }
		
		/* Editor Body */
		.body-input {
			font-family: 'Crimson Pro', Georgia, serif;
			font-size: 18px;
			line-height: 1.9;
			min-height: 500px;
			resize: none;
			border: none;
			background: transparent;
			width: 100%;
		}
		.body-input:focus { outline: none; }
		.body-input::placeholder { color: #ddd; }
		
		/* Word count */
		.word-count {
			font-size: 11px;
			color: #ccc;
			margin-top: 16px;
			padding-top: 16px;
			border-top: 1px solid #eee;
		}
		
		/* Divider */
		.divider {
			height: 1px;
			background: #eee;
			margin: 20px 0;
		}
		
		/* Actions */
		.actions {
			display: flex;
			flex-direction: column;
			gap: 10px;
			margin-top: 24px;
		}
		.btn {
			padding: 12px 20px;
			border-radius: 6px;
			font-family: inherit;
			font-size: 13px;
			font-weight: 600;
			cursor: pointer;
			transition: all 0.2s;
			text-align: center;
		}
		.btn-primary {
			background: #000;
			color: #fff;
			border: none;
		}
		.btn-primary:hover { background: #333; }
		.btn-primary:disabled { background: #ccc; cursor: not-allowed; }
		.btn-secondary {
			background: transparent;
			color: #666;
			border: 1px solid #ddd;
		}
		.btn-secondary:hover { border-color: #999; color: #000; }
		
		/* Markdown Help */
		.markdown-help { margin-top: 24px; }
		.help-toggle {
			font-size: 10px;
			color: #999;
			cursor: pointer;
			display: flex;
			align-items: center;
			gap: 4px;
			text-transform: uppercase;
			letter-spacing: 1px;
		}
		.help-toggle:hover { color: #000; }
		.help-content {
			display: none;
			margin-top: 12px;
			font-size: 11px;
			color: #666;
			line-height: 1.6;
		}
		.help-content.show { display: block; }
		.help-content code {
			background: #eee;
			padding: 2px 6px;
			border-radius: 3px;
			font-size: 10px;
		}
		.help-content p { margin-bottom: 8px; }
		
		/* Success message */
		.success-msg {
			background: #f0f0f0;
			border: 1px solid #000;
			border-radius: 6px;
			padding: 12px;
			margin-bottom: 16px;
			display: none;
			font-size: 12px;
		}
		.success-msg.show { display: block; }
		.success-msg a { color: #000; text-decoration: underline; }
		
		/* Cover Image Picker */
		.inspire-row {
			display: flex;
			align-items: center;
			gap: 8px;
			margin-top: 8px;
		}
		.inspire-btn {
			font-size: 10px;
			color: #999;
			cursor: pointer;
			text-transform: uppercase;
			letter-spacing: 1px;
			background: none;
			border: none;
			padding: 4px 0;
		}
		.inspire-btn:hover { color: #000; }
		.inspire-loading { font-size: 10px; color: #ccc; }
		.image-picker {
			display: flex;
			gap: 8px;
			margin-top: 8px;
		}
		.image-thumb {
			width: 60px;
			height: 60px;
			border-radius: 6px;
			object-fit: cover;
			border: 2px solid #eee;
			cursor: pointer;
			opacity: 0.7;
			transition: all 0.2s;
		}
		.image-thumb:hover { opacity: 1; border-color: #000; }
		.image-thumb.selected { border-color: #000; opacity: 1; }

		/* Keyboard shortcuts hint */
		.shortcuts-hint {
			font-size: 10px;
			color: #ccc;
			margin-top: 16px;
			line-height: 1.6;
		}
		.shortcuts-hint kbd {
			background: #eee;
			padding: 2px 6px;
			border-radius: 3px;
			font-family: inherit;
		}
		
		/* Mobile Responsive */
		@media (max-width: 900px) {
			.main-layout { flex-direction: column; }
			.sidebar {
				width: 100%;
				max-width: none;
				min-width: auto;
				height: auto;
				position: static;
				border-right: none;
				border-bottom: 1px solid #eee;
				padding: 20px;
			}
			.editor-panel { padding: 24px 20px; }
			.body-input { min-height: 350px; }
			.title-input { font-size: 26px; }
			.save-status { display: none; }
		}
	</style>
</head>
<body>
	<header class="header">
		<div class="logo">MIDGARD</div>
		<div class="save-status" id="save-status"></div>
		<nav class="nav-links">
			<a href="/marcus">View Blog</a>
			<a href="/">Home</a>
		</nav>
	</header>

	<div class="main-layout">
		<!-- Sidebar -->
		<aside class="sidebar">
			<div id="success-msg" class="success-msg">
				<strong>Published!</strong> <a id="post-link" href="#"></a>
			</div>

			<form id="publish-form">
				<!-- Slug -->
				<div class="form-group">
					<label class="form-label">Slug</label>
					<input type="text" name="slug" class="form-input" placeholder="post-url-slug" required pattern="[a-z0-9-]+" title="Lowercase letters, numbers, and hyphens only">
					<div class="slug-preview">punchy.me/marcus/<span id="slug-preview-text">your-slug</span></div>
				</div>

				<!-- Cover Image -->
				<div class="form-group">
					<label class="form-label">Cover Image</label>
					<input type="url" name="coverImage" class="form-input" placeholder="https://..." id="cover-image-input">
					<div class="inspire-row">
						<button type="button" class="inspire-btn" onclick="loadInspireImages()">↻ Refresh</button>
						<span class="inspire-loading" id="inspire-loading"></span>
					</div>
					<div class="image-picker" id="image-picker"></div>
				</div>

				<!-- Excerpt -->
				<div class="form-group">
					<label class="form-label">Excerpt</label>
					<textarea name="excerpt" class="form-input" rows="3" placeholder="Brief summary..."></textarea>
				</div>

				<!-- Tags -->
				<div class="form-group">
					<label class="form-label">Tags</label>
					<input type="text" name="tags" class="form-input" placeholder="stoicism, discipline">
					<div class="tags-help">Comma-separated</div>
				</div>

				<div class="divider"></div>

				<!-- Actions -->
				<div class="actions">
					<button type="submit" class="btn btn-primary" id="publish-btn">Publish</button>
					<button type="button" class="btn btn-secondary" onclick="previewMarkdown()">Preview</button>
					<button type="button" class="btn btn-secondary" onclick="clearDraft()">Clear Draft</button>
				</div>

				<!-- Markdown Help -->
				<div class="markdown-help">
					<div class="help-toggle" onclick="toggleHelp()">
						<span id="help-icon">+</span> Markdown Help
					</div>
					<div class="help-content" id="help-content">
						<p><code># H1</code> <code>## H2</code> <code>### H3</code></p>
						<p><code>**bold**</code> <code>*italic*</code></p>
						<p><code>- list item</code></p>
						<p><code>1. numbered</code></p>
						<p><code>> blockquote</code></p>
						<p><code>\`code\`</code> <code>\`\`\`code block\`\`\`</code></p>
						<p><code>[link](url)</code> <code>![img](url)</code></p>
						<p><code>---</code> horizontal rule</p>
					</div>
				</div>

				<!-- Keyboard shortcuts -->
				<div class="shortcuts-hint">
					<kbd>Ctrl</kbd>+<kbd>S</kbd> Save draft<br>
					<kbd>Ctrl</kbd>+<kbd>P</kbd> Preview
				</div>
			</form>
		</aside>

		<!-- Editor Panel -->
		<main class="editor-panel">
			<input type="text" name="title" class="title-input" placeholder="Title" required>
			<textarea name="body" class="body-input" placeholder="Start writing..." required></textarea>
			<div class="word-count"><span id="word-count">0</span> words</div>
		</main>
	</div>

	<script>
		const form = document.getElementById('publish-form');
		const titleInput = document.querySelector('.title-input');
		const bodyInput = document.querySelector('.body-input');
		const slugInput = form.querySelector('[name="slug"]');
		const slugPreview = document.getElementById('slug-preview-text');
		const wordCount = document.getElementById('word-count');
		const successMsg = document.getElementById('success-msg');
		const postLink = document.getElementById('post-link');
		const saveStatus = document.getElementById('save-status');
		const publishBtn = document.getElementById('publish-btn');

		// Draft auto-save
		const DRAFT_KEY = 'midgard_draft';
		let saveTimeout = null;

		function saveDraft() {
			const draft = {
				title: titleInput.value,
				slug: slugInput.value,
				body: bodyInput.value,
				excerpt: form.querySelector('[name="excerpt"]').value,
				coverImage: form.querySelector('[name="coverImage"]').value,
				tags: form.querySelector('[name="tags"]').value,
				savedAt: Date.now()
			};
			localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
			updateSaveStatus('saved');
		}

		function loadDraft() {
			const saved = localStorage.getItem(DRAFT_KEY);
			if (saved) {
				const draft = JSON.parse(saved);
				titleInput.value = draft.title || '';
				slugInput.value = draft.slug || '';
				bodyInput.value = draft.body || '';
				form.querySelector('[name="excerpt"]').value = draft.excerpt || '';
				form.querySelector('[name="coverImage"]').value = draft.coverImage || '';
				form.querySelector('[name="tags"]').value = draft.tags || '';
				slugPreview.textContent = draft.slug || 'your-slug';
				updateWordCount();
				updateSaveStatus('restored', draft.savedAt);
			}
		}

		function clearDraft() {
			if (confirm('Clear all fields and delete saved draft?')) {
				localStorage.removeItem(DRAFT_KEY);
				titleInput.value = '';
				slugInput.value = '';
				bodyInput.value = '';
				form.querySelector('[name="excerpt"]').value = '';
				form.querySelector('[name="coverImage"]').value = '';
				form.querySelector('[name="tags"]').value = '';
				slugPreview.textContent = 'your-slug';
				wordCount.textContent = '0';
				successMsg.classList.remove('show');
				saveStatus.textContent = '';
			}
		}

		function updateSaveStatus(state, timestamp) {
			if (state === 'saved') {
				saveStatus.textContent = 'Draft saved';
				saveStatus.className = 'save-status saved';
				setTimeout(() => { saveStatus.className = 'save-status'; }, 2000);
			} else if (state === 'restored' && timestamp) {
				const ago = Math.floor((Date.now() - timestamp) / 1000);
				const text = ago < 60 ? 'just now' : ago < 3600 ? Math.floor(ago/60) + ' min ago' : Math.floor(ago/3600) + ' hr ago';
				saveStatus.textContent = 'Draft restored (' + text + ')';
				saveStatus.className = 'save-status saved';
			}
		}

		// Auto-save on input (debounced)
		function scheduleSave() {
			clearTimeout(saveTimeout);
			saveTimeout = setTimeout(saveDraft, 1000);
		}

		[titleInput, bodyInput, slugInput].forEach(el => {
			el.addEventListener('input', scheduleSave);
		});
		form.querySelectorAll('.form-input').forEach(el => {
			el.addEventListener('input', scheduleSave);
		});

		// Slug preview
		slugInput.addEventListener('input', () => {
			slugPreview.textContent = slugInput.value || 'your-slug';
		});

		// Word count
		function updateWordCount() {
			const words = bodyInput.value.trim().split(/\\s+/).filter(w => w.length > 0);
			wordCount.textContent = words.length;
		}
		bodyInput.addEventListener('input', updateWordCount);

		// Keyboard shortcuts
		document.addEventListener('keydown', (e) => {
			if (e.ctrlKey || e.metaKey) {
				if (e.key === 's') {
					e.preventDefault();
					saveDraft();
				} else if (e.key === 'p') {
					e.preventDefault();
					previewMarkdown();
				}
			}
		});

		// Markdown help toggle
		function toggleHelp() {
			const content = document.getElementById('help-content');
			const icon = document.getElementById('help-icon');
			if (content.classList.contains('show')) {
				content.classList.remove('show');
				icon.textContent = '+';
			} else {
				content.classList.add('show');
				icon.textContent = '−';
			}
		}

		// Preview window reference (reuse same tab)
		let previewWindow = null;
		let previewUrl = null;

		function previewMarkdown() {
			const title = titleInput.value;
			const body = bodyInput.value;
			const excerpt = form.querySelector('[name="excerpt"]').value;
			const coverImage = form.querySelector('[name="coverImage"]').value;
			const tags = form.querySelector('[name="tags"]').value;

			const renderedBody = DOMPurify.sanitize(marked.parse(body || '', { breaks: true }));
			const tagsHtml = tags ? tags.split(',').map(t => '<span style="background:rgba(34,197,94,0.1);color:#22c55e;padding:4px 12px;border-radius:20px;font-size:12px;margin-right:8px;">' + t.trim() + '</span>').join('') : '';

			const previewHtml = '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>' + (title || 'Preview') + ' - MARCUS</title><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet"><style>*{box-sizing:border-box;margin:0;padding:0}body{background:#000;color:#fff;font-family:JetBrains Mono,monospace;line-height:1.8}.container{max-width:800px;margin:0 auto;padding:40px 20px}.cover-img{width:100%;height:300px;object-fit:cover;border-radius:12px;margin-bottom:40px}.title{font-family:Crimson Pro,Georgia,serif;font-size:42px;margin-bottom:24px;line-height:1.2}.meta{color:#666;font-size:12px;margin-bottom:40px}.tags{margin-bottom:40px}.body{font-family:Crimson Pro,Georgia,serif;font-size:18px;line-height:1.9}.body h1,.body h2,.body h3{font-family:Crimson Pro,Georgia,serif;margin:2rem 0 1rem;color:#fff}.body p{margin-bottom:1.5rem}.body ul,.body ol{margin:1.5rem 0;padding-left:2rem}.body li{margin-bottom:0.5rem}.body blockquote{border-left:3px solid #22c55e;padding-left:1.5rem;margin:1.5rem 0;color:#888;font-style:italic}.body code{background:rgba(255,255,255,0.1);padding:2px 8px;border-radius:4px;font-size:0.9em}.body pre{background:rgba(0,0,0,0.5);padding:1.5rem;border-radius:8px;overflow-x:auto;margin:1.5rem 0}.body pre code{background:none;padding:0}.body a{color:#22c55e;text-decoration:none}.watermark{position:fixed;top:20px;right:20px;background:#000;color:#fff;border:1px solid #fff;font-size:10px;padding:8px 16px;border-radius:20px;z-index:100}</style></head><body><div class="watermark">PREVIEW</div><div class="container">' + (coverImage ? '<img src="' + coverImage + '" class="cover-img" alt="">' : '') + '<h1 class="title">' + (title || 'Untitled') + '</h1><div class="meta">Just now · ' + (wordCount.textContent) + ' words</div>' + (tagsHtml ? '<div class="tags">' + tagsHtml + '</div>' : '') + (excerpt ? '<p style="color:#888;font-style:italic;margin-bottom:40px;">' + excerpt + '</p>' : '') + '<div class="body">' + renderedBody + '</div></div></body></html>';

			// Revoke old blob URL to prevent memory leak
			if (previewUrl) {
				URL.revokeObjectURL(previewUrl);
			}

			const blob = new Blob([previewHtml], { type: 'text/html' });
			previewUrl = URL.createObjectURL(blob);

			// Open or refresh preview window
			if (previewWindow && !previewWindow.closed) {
				previewWindow.location.href = previewUrl;
				previewWindow.focus();
			} else {
				previewWindow = window.open(previewUrl, 'midgard-preview');
			}
		}

		// Form submit
		form.addEventListener('submit', async (e) => {
			e.preventDefault();
			
			const formData = new FormData();
			formData.append('title', titleInput.value);
			formData.append('slug', slugInput.value);
			formData.append('body', bodyInput.value);
			formData.append('excerpt', form.querySelector('[name="excerpt"]').value);
			formData.append('coverImage', form.querySelector('[name="coverImage"]').value);
			formData.append('tags', form.querySelector('[name="tags"]').value);

			publishBtn.textContent = 'Publishing...';
			publishBtn.disabled = true;

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
					localStorage.removeItem(DRAFT_KEY);
					
					setTimeout(() => {
						titleInput.value = '';
						slugInput.value = '';
						bodyInput.value = '';
						form.querySelector('[name="excerpt"]').value = '';
						form.querySelector('[name="coverImage"]').value = '';
						form.querySelector('[name="tags"]').value = '';
						slugPreview.textContent = 'your-slug';
						wordCount.textContent = '0';
						successMsg.classList.remove('show');
					}, 3000);
				} else {
					alert('Error: ' + (data.error || 'Unknown error'));
				}
			} catch (err) {
				alert('Failed to publish: ' + err.message);
			}

			publishBtn.textContent = 'Publish';
			publishBtn.disabled = false;
		});

		// Inspire images from Unsplash (via FREYA)
		let inspireImages = [];
		async function loadInspireImages() {
			const picker = document.getElementById('image-picker');
			const loading = document.getElementById('inspire-loading');
			const coverInput = document.getElementById('cover-image-input');
			
			loading.textContent = 'Loading...';
			picker.innerHTML = '';

			try {
				const res = await fetch('/freya/search');
				const data = await res.json();
				inspireImages = (data.images || []).slice(0, 3);

				inspireImages.forEach((img, i) => {
					const thumb = document.createElement('img');
					thumb.src = img.thumb;
					thumb.className = 'image-thumb';
					thumb.alt = img.alt || 'Cover option ' + (i + 1);
					thumb.title = img.author || 'Unsplash';
					thumb.onclick = () => selectImage(i);
					if (coverInput.value === img.url) {
						thumb.classList.add('selected');
					}
					picker.appendChild(thumb);
				});
				loading.textContent = inspireImages.length + ' images';
			} catch (err) {
				loading.textContent = 'Failed to load';
				console.error('Inspire error:', err);
			}
		}

		function selectImage(index) {
			const coverInput = document.getElementById('cover-image-input');
			const thumbs = document.querySelectorAll('.image-thumb');
			
			thumbs.forEach(t => t.classList.remove('selected'));
			thumbs[index].classList.add('selected');
			
			coverInput.value = inspireImages[index].url;
			scheduleSave();
		}

		// Load draft and inspire images on page load
		loadDraft();
		loadInspireImages();
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
