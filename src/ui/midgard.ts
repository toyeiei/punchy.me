/**
 * Midgard Editor UI
 * Private writing interface for MARCUS
 * Supports Markdown with preview
 * Zen, calm light theme - black and white
 * Sidebar layout with auto-save, keyboard shortcuts, markdown help
 */

import { MarcusPost } from '../core/types';

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
			height: 100vh;
			overflow: hidden;
		}
		
		/* Custom Scrollbar - Light Theme */
		::-webkit-scrollbar { width: 6px; height: 6px; }
		::-webkit-scrollbar-track { background: transparent; }
		::-webkit-scrollbar-thumb { background: #ddd; border-radius: 3px; }
		::-webkit-scrollbar-thumb:hover { background: #ccc; }
		* { scrollbar-width: thin; scrollbar-color: #ddd transparent; }
		
		/* Text Selection */
		::selection { background: #e5e5e5; color: #000; }
		::-moz-selection { background: #e5e5e5; color: #000; }
		
		/* Header */
		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 16px 24px;
			border-bottom: 1px solid #eee;
			background: #fff;
			z-index: 100;
			flex-shrink: 0;
		}
		.header-left {
			display: flex;
			align-items: center;
			gap: 24px;
		}
		.logo { color: #000; font-size: 12px; letter-spacing: 2px; font-weight: 600; }
		.save-status { font-size: 11px; color: #ccc; }
		.save-status.saved { color: #22c55e; }
		
		.header-actions {
			display: flex;
			align-items: center;
			gap: 12px;
		}
		.header-btn {
			padding: 8px 16px;
			border-radius: 6px;
			font-family: inherit;
			font-size: 12px;
			font-weight: 600;
			cursor: pointer;
			transition: all 0.2s;
		}
		.header-btn-primary {
			background: #000;
			color: #fff;
			border: none;
		}
		.header-btn-primary:hover { background: #333; }
		.header-btn-primary:disabled { background: #ccc; cursor: not-allowed; }
		.header-btn-secondary {
			background: transparent;
			color: #666;
			border: 1px solid #ddd;
		}
		.header-btn-secondary:hover { border-color: #999; color: #000; }
		.header-link {
			color: #999;
			text-decoration: none;
			font-size: 12px;
		}
		.header-link:hover { color: #000; }
		
		/* Drafts Modal */
		.drafts-modal {
			display: none;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0,0,0,0.5);
			z-index: 200;
			align-items: center;
			justify-content: center;
		}
		.drafts-modal.open { display: flex; }
		.drafts-content {
			background: #fff;
			border-radius: 12px;
			padding: 24px;
			max-width: 500px;
			width: 90%;
			max-height: 80vh;
			overflow-y: auto;
		}
		.drafts-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20px;
		}
		.drafts-title { font-size: 18px; font-weight: 600; }
		.drafts-close {
			background: none;
			border: none;
			font-size: 20px;
			cursor: pointer;
			color: #999;
		}
		.drafts-close:hover { color: #000; }
		.draft-item {
			padding: 12px;
			border: 1px solid #eee;
			border-radius: 8px;
			margin-bottom: 12px;
			cursor: pointer;
		}
		.draft-item:hover { border-color: #000; }
		.draft-item-title { font-weight: 600; margin-bottom: 4px; }
		.draft-item-meta { font-size: 11px; color: #999; }
		.drafts-empty { text-align: center; color: #999; padding: 40px 0; }
		
		/* Main Layout - 3 columns, fills viewport */
		.main-layout {
			display: flex;
			height: calc(100vh - 57px);
		}
		
		/* Left Sidebar - independent scroll */
		.sidebar {
			width: 22%;
			min-width: 260px;
			max-width: 320px;
			background: #fafafa;
			border-right: 1px solid #eee;
			padding: 24px;
			overflow-y: auto;
			flex-shrink: 0;
		}
		
		/* Editor Panel - Center, independent scroll */
		.editor-panel {
			flex: 1;
			padding: 32px 40px;
			min-width: 0;
			overflow-y: auto;
		}
		
		/* Cover Image Preview (in editor) */
		.cover-preview {
			width: 100%;
			height: 280px;
			object-fit: cover;
			border-radius: 8px;
			margin-bottom: 24px;
			background: #f5f5f5;
			display: none;
		}
		.cover-preview.visible { display: block; }
		.cover-preview.loading {
			animation: pulse-light 1.5s ease-in-out infinite;
		}
		@keyframes pulse-light {
			0%, 100% { background: #f5f5f5; }
			50% { background: #eee; }
		}
		
		/* Right AI Panel - independent scroll */
		.ai-panel {
			width: 22%;
			min-width: 240px;
			max-width: 300px;
			background: #fafafa;
			border-left: 1px solid #eee;
			padding: 24px;
			overflow-y: auto;
			flex-shrink: 0;
		}
		
		/* AI Panel Header */
		.ai-header {
			font-size: 10px;
			color: #999;
			text-transform: uppercase;
			letter-spacing: 1px;
			margin-bottom: 20px;
			padding-bottom: 12px;
			border-bottom: 1px solid #eee;
		}
		
		/* AI Section */
		.ai-section {
			margin-bottom: 16px;
		}
		.ai-toggle {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 10px 12px;
			background: #fff;
			border: 1px solid #eee;
			border-radius: 6px;
			cursor: pointer;
			transition: all 0.2s;
			font-size: 12px;
			font-weight: 500;
		}
		.ai-toggle:hover {
			border-color: #ccc;
		}
		.ai-toggle.open {
			border-color: #999;
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
		}
		.ai-toggle-icon {
			font-size: 10px;
			color: #999;
			transition: transform 0.2s;
		}
		.ai-toggle.open .ai-toggle-icon {
			transform: rotate(180deg);
		}
		.ai-content {
			display: none;
			padding: 12px;
			background: #fff;
			border: 1px solid #999;
			border-top: none;
			border-radius: 0 0 6px 6px;
		}
		.ai-content.open {
			display: block;
		}
		.ai-btn {
			width: 100%;
			padding: 10px 14px;
			background: #fff;
			border: 1px solid #eee;
			border-radius: 6px;
			font-family: inherit;
			font-size: 12px;
			color: #666;
			cursor: pointer;
			transition: all 0.2s;
			display: flex;
			align-items: center;
			gap: 8px;
		}
		.ai-btn:hover {
			border-color: #999;
			color: #000;
		}
		.ai-btn:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
		.ai-btn-icon {
			font-size: 14px;
		}
		
		/* AI Results */
		.ai-results {
			margin-top: 12px;
		}
		.ai-result-item {
			padding: 10px 12px;
			background: #fff;
			border: 1px solid #eee;
			border-radius: 6px;
			margin-bottom: 8px;
			cursor: pointer;
			transition: all 0.2s;
			font-size: 12px;
			line-height: 1.4;
		}
		.ai-result-item:hover {
			border-color: #999;
		}
		.ai-result-item.selected {
			border-color: #999;
			background: #f5f5f5;
		}
		.ai-loading {
			font-size: 11px;
			color: #999;
			padding: 8px 0;
		}
		.ai-error {
			font-size: 11px;
			color: #c00;
			padding: 8px 0;
		}
		
		/* SEO Score Display */
		.seo-score {
			text-align: center;
			padding: 16px;
			background: #f5f5f5;
			border-radius: 8px;
			margin-bottom: 12px;
		}
		.seo-score-num {
			font-size: 36px;
			font-weight: 700;
			color: #000;
		}
		.seo-score-label {
			font-size: 14px;
			color: #999;
		}
		.seo-checklist {
			margin-bottom: 12px;
		}
		.seo-item {
			font-size: 11px;
			padding: 6px 0;
			border-bottom: 1px solid #eee;
		}
		.seo-item:last-child { border-bottom: none; }
		.seo-ok { color: #22c55e; }
		.seo-warn { color: #f59e0b; }
		.seo-error { color: #ef4444; }
		.seo-fix {
			font-size: 10px;
			color: #999;
			padding-left: 16px;
			margin-bottom: 4px;
		}
		.seo-section {
			font-size: 10px;
			color: #666;
			text-transform: uppercase;
			letter-spacing: 0.5px;
			margin-top: 12px;
			margin-bottom: 8px;
		}
		.seo-keywords {
			display: flex;
			flex-wrap: wrap;
			gap: 6px;
		}
		.seo-keyword {
			font-size: 11px;
			padding: 4px 10px;
			background: #f5f5f5;
			border: 1px solid #eee;
			border-radius: 20px;
			cursor: pointer;
			transition: all 0.2s;
		}
		.seo-keyword:hover { border-color: #999; }
		.seo-keyword.selected {
			background: #000;
			color: #fff;
			border-color: #000;
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
		
		/* Excerpt textarea - vertical resize only */
		.sidebar textarea[name="excerpt"] {
			resize: vertical;
			min-height: 128px;
		}
		
		/* Slug preview */
		.slug-preview { margin-top: 6px; font-size: 11px; color: #999; word-break: break-all; }
		.slug-preview span { color: #666; }
		
		/* Tags help */
		.tags-help { font-size: 10px; color: #ccc; margin-top: 4px; }
		
		/* Schema Toggle (Left Sidebar) */
		.schema-section {
			margin-top: 16px;
		}
		.schema-toggle {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 10px 12px;
			background: #fff;
			border: 1px solid #eee;
			border-radius: 6px;
			cursor: pointer;
			transition: all 0.2s;
			font-size: 11px;
			font-weight: 500;
		}
		.schema-toggle:hover {
			border-color: #ccc;
		}
		.schema-toggle.open {
			border-color: #999;
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
		}
		.schema-toggle-icon {
			font-size: 10px;
			color: #999;
			transition: transform 0.2s;
		}
		.schema-toggle.open .schema-toggle-icon {
			transform: rotate(180deg);
		}
		.schema-content {
			display: none;
			padding: 12px;
			background: #fff;
			border: 1px solid #999;
			border-top: none;
			border-radius: 0 0 6px 6px;
		}
		.schema-content.open {
			display: block;
		}
		.schema-type {
			font-size: 10px;
			color: #666;
			margin-bottom: 8px;
		}
		.schema-textarea {
			width: 100%;
			min-height: 120px;
			font-family: 'JetBrains Mono', monospace;
			font-size: 11px;
			background: #fafafa;
			border: 1px solid #eee;
			border-radius: 4px;
			padding: 8px;
			color: #000;
			resize: vertical;
		}
		.schema-textarea:focus {
			outline: none;
			border-color: #999;
		}
		.schema-actions {
			display: flex;
			gap: 8px;
			margin-top: 8px;
		}
		.schema-btn {
			flex: 1;
			padding: 8px;
			font-size: 10px;
			background: #f5f5f5;
			border: 1px solid #eee;
			border-radius: 4px;
			cursor: pointer;
			transition: all 0.2s;
		}
		.schema-btn:hover {
			border-color: #999;
		}
		.schema-valid {
			font-size: 10px;
			color: #22c55e;
			margin-top: 6px;
		}
		.schema-invalid {
			font-size: 10px;
			color: #ef4444;
			margin-top: 6px;
		}
		
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
			min-height: 60px;
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
			background: #f5f5f5;
		}
		.image-thumb:hover { opacity: 1; border-color: #000; }
		.image-thumb.selected { border-color: #000; opacity: 1; }
		.image-thumb.loading { 
			animation: pulse-light 1.5s ease-in-out infinite; 
		}
		@keyframes pulse-light {
			0%, 100% { background: #f5f5f5; }
			50% { background: #eee; }
		}

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
		
		/* Mobile - Desktop Only Message */
		.desktop-only-msg {
			display: none;
			text-align: center;
			padding: 60px 20px;
		}
		.desktop-only-msg h2 {
			font-family: 'Crimson Pro', Georgia, serif;
			font-size: 28px;
			margin-bottom: 16px;
		}
		.desktop-only-msg p {
			color: #999;
			font-size: 14px;
			margin-bottom: 24px;
		}
		.desktop-only-msg a {
			color: #000;
			text-decoration: underline;
		}
		
		/* Slash Command Dropdown (internal link picker) */
		.slash-dropdown {
			position: absolute;
			display: none;
			background: #fff;
			border: 1px solid #ddd;
			border-radius: 8px;
			box-shadow: 0 4px 12px rgba(0,0,0,0.15);
			max-height: 300px;
			overflow-y: auto;
			z-index: 1000;
			min-width: 300px;
		}
		.slash-dropdown.visible { display: block; }
		.slash-search {
			padding: 12px;
			border-bottom: 1px solid #eee;
		}
		.slash-search input {
			width: 100%;
			padding: 8px 12px;
			border: 1px solid #eee;
			border-radius: 4px;
			font-family: inherit;
			font-size: 13px;
		}
		.slash-search input:focus {
			outline: none;
			border-color: #999;
		}
		.slash-list { padding: 8px 0; }
		.slash-item {
			padding: 10px 16px;
			cursor: pointer;
			font-size: 13px;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.slash-item:hover,
		.slash-item.selected {
			background: #f5f5f5;
		}
		.slash-item-title { font-weight: 500; }
		.slash-item-slug { color: #999; font-size: 11px; }
		.slash-empty {
			padding: 20px;
			text-align: center;
			color: #999;
			font-size: 12px;
		}
		.slash-hint {
			padding: 8px 16px;
			border-top: 1px solid #eee;
			font-size: 10px;
			color: #999;
			background: #fafafa;
		}
		
		@media (max-width: 900px) {
			.header { display: none; }
			.main-layout { display: none; }
			.desktop-only-msg { display: block; }
		}
	</style>
</head>
<body>
	<header class="header">
		<div class="header-left">
			<div class="logo">MIDGARD</div>
			<div class="save-status" id="save-status"></div>
		</div>
		<div class="header-actions">
			<a href="/midgard/posts" class="header-link">Drafts</a>
			<a href="/marcus" class="header-link">View Blog</a>
			<button type="button" class="header-btn header-btn-secondary" onclick="saveDraftOnly()">Save Draft</button>
			<button type="button" class="header-btn header-btn-secondary" onclick="previewMarkdown()">Preview</button>
			<button type="button" class="header-btn header-btn-primary" id="publish-btn" onclick="publishPost()">Publish</button>
		</div>
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
					<textarea name="excerpt" class="form-input" rows="5" placeholder="Brief summary..."></textarea>
				</div>

				<!-- Tags -->
				<div class="form-group">
					<label class="form-label">Tags</label>
					<input type="text" name="tags" class="form-input" placeholder="stoicism, discipline">
					<div class="tags-help">Comma-separated</div>
				</div>

				<!-- JSON-LD Schema (Advanced) -->
				<div class="schema-section">
					<div class="schema-toggle" onclick="toggleSchema()">
						<span>📋 JSON-LD Schema</span>
						<span class="schema-toggle-icon">▼</span>
					</div>
					<div class="schema-content" id="schema-content">
						<div class="schema-type">Type: Article (Blog Post)</div>
						<textarea name="schema" class="schema-textarea" id="schema-textarea" placeholder='{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "author": { "@type": "Person", "name": "..." }
}'></textarea>
						<div class="schema-actions">
							<button type="button" class="schema-btn" onclick="generateSchema()">✨ Auto-generate</button>
							<button type="button" class="schema-btn" onclick="validateSchema()">✓ Validate</button>
						</div>
						<div id="schema-status"></div>
					</div>
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
			<img id="cover-preview" class="cover-preview" alt="Cover image preview">
			<textarea name="body" class="body-input" id="body-textarea" placeholder="Start writing... (type '/' for internal links)" required></textarea>
			<div class="word-count"><span id="word-count">0</span> words</div>
			
			<!-- Slash Command Dropdown (internal link picker) -->
			<div id="slash-dropdown" class="slash-dropdown">
				<div class="slash-search">
					<input type="text" id="slash-search-input" placeholder="Search posts...">
				</div>
				<div class="slash-list" id="slash-list"></div>
				<div class="slash-hint">↑↓ Navigate · Enter Select · Esc Close</div>
			</div>
		</main>

		<!-- AI Panel -->
		<aside class="ai-panel">
			<div class="ai-header">AI Assistant</div>

			<!-- Title Suggestions -->
			<div class="ai-section">
				<div class="ai-toggle" onclick="toggleAISection('titles')">
					<span>✨ Title Suggestions</span>
					<span class="ai-toggle-icon">▼</span>
				</div>
				<div class="ai-content" id="ai-titles">
					<button type="button" class="ai-btn" onclick="generateTitles()">
						<span class="ai-btn-icon">✨</span>
						<span>Generate titles</span>
					</button>
					<div class="ai-results" id="title-results"></div>
				</div>
			</div>

			<!-- Auto Excerpt -->
			<div class="ai-section">
				<div class="ai-toggle" onclick="toggleAISection('excerpt')">
					<span>📝 Auto Excerpt</span>
					<span class="ai-toggle-icon">▼</span>
				</div>
				<div class="ai-content" id="ai-excerpt">
					<button type="button" class="ai-btn" onclick="generateExcerpt()">
						<span class="ai-btn-icon">📝</span>
						<span>Generate excerpt</span>
					</button>
					<div class="ai-results" id="excerpt-results"></div>
				</div>
			</div>

			<!-- Polish Prose -->
			<div class="ai-section">
				<div class="ai-toggle" onclick="toggleAISection('polish')">
					<span>✒️ Polish Prose</span>
					<span class="ai-toggle-icon">▼</span>
				</div>
				<div class="ai-content" id="ai-polish">
					<button type="button" class="ai-btn" onclick="polishProse()">
						<span class="ai-btn-icon">✒️</span>
						<span>Improve writing</span>
					</button>
					<div class="ai-results" id="polish-results"></div>
				</div>
			</div>

			<!-- SEO Optimizer -->
			<div class="ai-section">
				<div class="ai-toggle" onclick="toggleAISection('seo')">
					<span>📊 SEO Optimizer</span>
					<span class="ai-toggle-icon">▼</span>
				</div>
				<div class="ai-content" id="ai-seo">
					<button type="button" class="ai-btn" onclick="analyzeSEO()">
						<span class="ai-btn-icon">📊</span>
						<span>Analyze SEO</span>
					</button>
					<div class="ai-results" id="seo-results"></div>
				</div>
			</div>
		</aside>
	</div>

	<!-- Desktop Only Message -->
	<div class="desktop-only-msg">
		<h2>Desktop Required</h2>
		<p>Midgard editor is designed for desktop writing.</p>
		<p><a href="/marcus">View MARCUS Blog</a> or <a href="/">Return Home</a></p>
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
				schema: document.getElementById('schema-textarea').value,
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
				document.getElementById('schema-textarea').value = draft.schema || '';
				slugPreview.textContent = draft.slug || 'your-slug';
				updateWordCount();
				updateSaveStatus('restored', draft.savedAt);
				
				// Restore cover preview
				const coverPreview = document.getElementById('cover-preview');
				if (draft.coverImage) {
					const optimizedUrl = draft.coverImage.includes('unsplash.com') 
						? (draft.coverImage.includes('?') ? draft.coverImage + '&w=720&fm=webp&q=70' : draft.coverImage + '?w=720&fm=webp&q=70')
						: draft.coverImage;
					coverPreview.src = optimizedUrl;
					coverPreview.classList.add('visible');
				}
			}
		}

		function updateSaveStatus(state, timestamp) {
			if (state === 'saved') {
				saveStatus.textContent = 'Draft saved';
				saveStatus.className = 'save-status saved';
				setTimeout(() => { saveStatus.className = 'save-status'; }, 2000);
			} else if (state === 'server-saved') {
				saveStatus.textContent = 'Saved to server';
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
			// Handle slash dropdown navigation
			if (slashDropdown.classList.contains('visible')) {
				if (e.key === 'ArrowDown') {
					e.preventDefault();
					navigateSlash(1);
					return;
				} else if (e.key === 'ArrowUp') {
					e.preventDefault();
					navigateSlash(-1);
					return;
				} else if (e.key === 'Enter') {
					e.preventDefault();
					selectSlashItem();
					return;
				} else if (e.key === 'Escape') {
					e.preventDefault();
					hideSlashDropdown();
					return;
				}
			}
			
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

		// Slash Command - Internal Link Picker
		const slashDropdown = document.getElementById('slash-dropdown');
		const slashSearchInput = document.getElementById('slash-search-input');
		const slashList = document.getElementById('slash-list');
		let allPosts = [];
		let filteredPosts = [];
		let selectedIndex = -1;
		let slashStartPos = -1;
		
		// Fetch posts on load
		async function loadPostsForSlash() {
			try {
				const res = await fetch('/midgard/posts');
				const data = await res.json();
				allPosts = data.posts || [];
			} catch (e) {
				console.error('Failed to load posts for slash command');
			}
		}
		loadPostsForSlash();
		
		// Listen for "/" in textarea
		bodyInput.addEventListener('keydown', (e) => {
			if (e.key === '/' && !slashDropdown.classList.contains('visible')) {
				slashStartPos = bodyInput.selectionStart;
			}
		});
		
		bodyInput.addEventListener('input', (e) => {
			const pos = bodyInput.selectionStart;
			const text = bodyInput.value;
			
			// Check if we're in a slash command
			if (slashStartPos !== -1 && pos > slashStartPos) {
				const searchTerm = text.substring(slashStartPos + 1, pos).toLowerCase();
				showSlashDropdown(searchTerm);
			} else if (slashStartPos === -1 && text.endsWith('/')) {
				// Just typed "/"
				slashStartPos = pos - 1;
				showSlashDropdown('');
			} else {
				hideSlashDropdown();
			}
		});
		
		function showSlashDropdown(searchTerm) {
			// Filter posts
			filteredPosts = allPosts.filter(post => 
				post.title.toLowerCase().includes(searchTerm) ||
				post.slug.toLowerCase().includes(searchTerm)
			);
			
			if (filteredPosts.length === 0) {
				slashList.innerHTML = '<div class="slash-empty">No posts found</div>';
			} else {
				slashList.innerHTML = filteredPosts.map((post, i) => 
					'<div class="slash-item' + (i === selectedIndex ? ' selected' : '') + '" data-index="' + i + '" data-title="' + post.title + '" data-slug="' + post.slug + '" onclick="selectSlashItemByIndex(' + i + ')">' +
					'<span class="slash-item-title">' + post.title + '</span>' +
					'<span class="slash-item-slug">/marcus/' + post.slug + '</span>' +
					'</div>'
				).join('');
			}
			
			// Position dropdown near cursor
			const rect = bodyInput.getBoundingClientRect();
			const lineHeight = parseInt(getComputedStyle(bodyInput).lineHeight) || 24;
			const charWidth = 8; // approximate
			const text = bodyInput.value.substring(0, bodyInput.selectionStart);
			const lines = text.split('\\n');
			const currentLine = lines.length;
			const colInLine = lines[lines.length - 1].length;
			
			slashDropdown.style.top = (rect.top + (currentLine * lineHeight) - bodyInput.scrollTop + 30) + 'px';
			slashDropdown.style.left = (rect.left + (colInLine * charWidth) + 20) + 'px';
			slashDropdown.classList.add('visible');
			
			selectedIndex = 0;
			updateSlashSelection();
		}
		
		function hideSlashDropdown() {
			slashDropdown.classList.remove('visible');
			slashStartPos = -1;
			selectedIndex = -1;
		}
		
		function navigateSlash(direction) {
			selectedIndex = Math.max(0, Math.min(filteredPosts.length - 1, selectedIndex + direction));
			updateSlashSelection();
		}
		
		function updateSlashSelection() {
			const items = slashList.querySelectorAll('.slash-item');
			items.forEach((item, i) => {
				item.classList.toggle('selected', i === selectedIndex);
			});
		}
		
		function selectSlashItem() {
			if (selectedIndex >= 0 && selectedIndex < filteredPosts.length) {
				insertLink(filteredPosts[selectedIndex]);
			}
		}
		
		function selectSlashItemByIndex(index) {
			selectedIndex = index;
			selectSlashItem();
		}
		
		function insertLink(post) {
			const text = bodyInput.value;
			const before = text.substring(0, slashStartPos);
			const after = text.substring(bodyInput.selectionStart);
			const link = '[' + post.title + '](/marcus/' + post.slug + ')';
			
			bodyInput.value = before + link + after;
			const newPos = before.length + link.length;
			bodyInput.setSelectionRange(newPos, newPos);
			bodyInput.focus();
			
			hideSlashDropdown();
			saveDraft();
			updateWordCount();
		}
		
		// Close dropdown when clicking outside
		document.addEventListener('click', (e) => {
			if (!slashDropdown.contains(e.target) && e.target !== bodyInput) {
				hideSlashDropdown();
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

		function previewMarkdown() {
			const title = titleInput.value;
			const body = bodyInput.value;
			const excerpt = form.querySelector('[name="excerpt"]').value;
			const coverImage = form.querySelector('[name="coverImage"]').value;
			const tags = form.querySelector('[name="tags"]').value;

			const renderedBody = DOMPurify.sanitize(marked.parse(body || '', { breaks: true }));
			const tagsHtml = tags ? tags.split(',').map(t => '<span style="background:rgba(34,197,94,0.1);color:#22c55e;padding:4px 12px;border-radius:20px;font-size:12px;margin-right:8px;">' + t.trim() + '</span>').join('') : '';

			const previewHtml = '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>' + (title || 'Preview') + ' - MARCUS</title><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet"><style>*{box-sizing:border-box;margin:0;padding:0}body{background:#000;color:#fff;font-family:JetBrains Mono,monospace;line-height:1.8}.container{max-width:800px;margin:0 auto;padding:40px 20px}.cover-img{width:100%;height:300px;object-fit:cover;border-radius:12px;margin-bottom:40px}.title{font-family:Crimson Pro,Georgia,serif;font-size:42px;margin-bottom:24px;line-height:1.2}.meta{color:#666;font-size:12px;margin-bottom:40px}.tags{margin-bottom:40px}.body{font-family:Crimson Pro,Georgia,serif;font-size:18px;line-height:1.9}.body h1,.body h2,.body h3{font-family:Crimson Pro,Georgia,serif;margin:2rem 0 1rem;color:#fff}.body p{margin-bottom:1.5rem}.body ul,.body ol{margin:1.5rem 0;padding-left:2rem}.body li{margin-bottom:0.5rem}.body blockquote{border-left:3px solid #22c55e;padding-left:1.5rem;margin:1.5rem 0;color:#888;font-style:italic}.body code{background:rgba(255,255,255,0.1);padding:2px 8px;border-radius:4px;font-size:0.9em}.body pre{background:rgba(0,0,0,0.5);padding:1.5rem;border-radius:8px;overflow-x:auto;margin:1.5rem 0}.body pre code{background:none;padding:0}.body a{color:#22c55e;text-decoration:none}.watermark{position:fixed;top:20px;right:20px;background:#000;color:#fff;border:1px solid #fff;font-size:10px;padding:8px 16px;border-radius:20px;z-index:100}</style></head><body><div class="watermark">PREVIEW</div><div class="container">' + (coverImage ? '<img src="' + coverImage + '" class="cover-img" alt="">' : '') + '<h1 class="title">' + (title || 'Untitled') + '</h1><div class="meta">Just now · ' + (wordCount.textContent) + ' words</div>' + (tagsHtml ? '<div class="tags">' + tagsHtml + '</div>' : '') + (excerpt ? '<p style="color:#888;font-style:italic;margin-bottom:40px;">' + excerpt + '</p>' : '') + '<div class="body">' + renderedBody + '</div></div></body></html>';

			// Open new window or reuse existing one
			if (!previewWindow || previewWindow.closed) {
				previewWindow = window.open('', 'midgard-preview');
			}

			// Write content directly to window (no blob URL needed)
			previewWindow.document.open();
			previewWindow.document.write(previewHtml);
			previewWindow.document.close();
			previewWindow.focus();
		}

		// Publish post (creates new or publishes existing draft)
		async function publishPost() {
			// Validate required fields
			if (!titleInput.value.trim() || !bodyInput.value.trim() || !slugInput.value.trim()) {
				alert('Title, body, and slug are required');
				return;
			}

			const formData = new FormData();
			formData.append('title', titleInput.value);
			formData.append('slug', slugInput.value);
			formData.append('body', bodyInput.value);
			formData.append('excerpt', form.querySelector('[name="excerpt"]').value);
			formData.append('coverImage', form.querySelector('[name="coverImage"]').value);
			formData.append('tags', form.querySelector('[name="tags"]').value);
			formData.append('schema', document.getElementById('schema-textarea').value);

			// If editing existing post/draft, include ID (will publish draft)
			if (window.editingPostId) {
				formData.append('id', window.editingPostId);
			}

			publishBtn.textContent = 'Publishing...';
			publishBtn.disabled = true;

			try {
				// Always use /midgard/publish - it handles both new and existing
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
					
					// Clear editing state
					window.editingPostId = null;
					
					// Clear URL param
					window.history.replaceState({}, '', '/midgard');
					
					setTimeout(() => {
						titleInput.value = '';
						slugInput.value = '';
						bodyInput.value = '';
						form.querySelector('[name="excerpt"]').value = '';
						form.querySelector('[name="coverImage"]').value = '';
						form.querySelector('[name="tags"]').value = '';
						document.getElementById('schema-textarea').value = '';
						document.getElementById('cover-preview').classList.remove('visible');
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
		}

		// Save draft only (not published)
		async function saveDraftOnly() {
			const formData = new FormData();
			formData.append('title', titleInput.value || 'Untitled Draft');
			formData.append('slug', slugInput.value || 'draft-' + Date.now());
			formData.append('body', bodyInput.value);
			formData.append('excerpt', form.querySelector('[name="excerpt"]').value);
			formData.append('coverImage', form.querySelector('[name="coverImage"]').value);
			formData.append('tags', form.querySelector('[name="tags"]').value);
			formData.append('schema', document.getElementById('schema-textarea').value);

			// If editing existing draft/post, include ID
			if (window.editingPostId) {
				formData.append('id', window.editingPostId);
			}

			try {
				const res = await fetch('/midgard/draft', {
					method: 'POST',
					body: formData
				});

				const data = await res.json();

				if (data.success) {
					// Store the draft ID
					window.editingPostId = data.id;
					
					// Save to localStorage too
					saveDraft();
					
					// Show feedback
					updateSaveStatus('server-saved');
					successMsg.innerHTML = '<strong>Draft saved!</strong>';
					successMsg.classList.add('show');
					
					setTimeout(() => {
						successMsg.classList.remove('show');
					}, 2000);
				} else {
					alert('Error: ' + (data.error || 'Unknown error'));
				}
			} catch (err) {
				alert('Failed to save draft: ' + err.message);
			}
		}

		// Inspire images from Unsplash (via FREYA)
		let inspireImages = [];
		async function loadInspireImages() {
			const picker = document.getElementById('image-picker');
			const loading = document.getElementById('inspire-loading');
			const coverInput = document.getElementById('cover-image-input');
			
			// Pre-fill with placeholder divs (no UI shift)
			picker.innerHTML = '<div class="image-thumb loading"></div><div class="image-thumb loading"></div><div class="image-thumb loading"></div>';
			loading.textContent = 'Loading...';

			try {
				const res = await fetch('/freya/search');
				const data = await res.json();
				inspireImages = (data.images || []).slice(0, 3);

				picker.innerHTML = '';
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
			const coverPreview = document.getElementById('cover-preview');
			const thumbs = document.querySelectorAll('.image-thumb');
			
			thumbs.forEach(t => t.classList.remove('selected'));
			thumbs[index].classList.add('selected');
			
			// Update input
			coverInput.value = inspireImages[index].url;
			
			// Show preview in editor (use small size for speed)
			coverPreview.src = inspireImages[index].small;
			coverPreview.classList.add('visible');
			coverPreview.classList.remove('loading');
			
			scheduleSave();
		}

		// Update cover preview when URL is manually changed
		document.getElementById('cover-image-input').addEventListener('change', function() {
			const coverPreview = document.getElementById('cover-preview');
			const url = this.value.trim();
			
			if (url) {
				// Add Unsplash optimization params if it's an Unsplash URL
				const optimizedUrl = url.includes('unsplash.com') 
					? (url.includes('?') ? url + '&w=720&fm=webp&q=70' : url + '?w=720&fm=webp&q=70')
					: url;
				
				coverPreview.src = optimizedUrl;
				coverPreview.classList.add('visible', 'loading');
				coverPreview.onload = () => coverPreview.classList.remove('loading');
				coverPreview.onerror = () => coverPreview.classList.remove('visible');
			} else {
				coverPreview.classList.remove('visible');
			}
		});

		// AI: Generate Title Suggestions
		async function generateTitles() {
			const resultsEl = document.getElementById('title-results');
			const body = bodyInput.value.trim();
			
			if (!body) {
				resultsEl.innerHTML = '<div class="ai-error">Write some content first</div>';
				return;
			}

			resultsEl.innerHTML = '<div class="ai-loading">Generating titles...</div>';

			try {
				const res = await fetch('/midgard/ai/titles', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ body })
				});
				const data = await res.json();

				if (data.titles && data.titles.length > 0) {
					resultsEl.innerHTML = data.titles.map((t, i) => 
						'<div class="ai-result-item" onclick="selectTitle(' + i + ')">' + t + '</div>'
					).join('');
					window.aiTitles = data.titles;
				} else {
					resultsEl.innerHTML = '<div class="ai-error">No titles generated</div>';
				}
			} catch (err) {
				resultsEl.innerHTML = '<div class="ai-error">Failed to generate</div>';
			}
		}

		function selectTitle(index) {
			titleInput.value = window.aiTitles[index];
			document.querySelectorAll('#title-results .ai-result-item').forEach((el, i) => {
				el.classList.toggle('selected', i === index);
			});
			scheduleSave();
		}

		// AI: Generate Excerpt
		async function generateExcerpt() {
			const resultsEl = document.getElementById('excerpt-results');
			const body = bodyInput.value.trim();
			
			if (!body) {
				resultsEl.innerHTML = '<div class="ai-error">Write some content first</div>';
				return;
			}

			resultsEl.innerHTML = '<div class="ai-loading">Generating excerpt...</div>';

			try {
				const res = await fetch('/midgard/ai/excerpt', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ body })
				});
				const data = await res.json();

				if (data.excerpt) {
					resultsEl.innerHTML = '<div class="ai-result-item" onclick="selectExcerpt()">' + data.excerpt + '</div>';
					window.aiExcerpt = data.excerpt;
				} else {
					resultsEl.innerHTML = '<div class="ai-error">No excerpt generated</div>';
				}
			} catch (err) {
				resultsEl.innerHTML = '<div class="ai-error">Failed to generate</div>';
			}
		}

		function selectExcerpt() {
			form.querySelector('[name="excerpt"]').value = window.aiExcerpt;
			document.querySelector('#excerpt-results .ai-result-item').classList.add('selected');
			scheduleSave();
		}

		// AI: Polish Prose
		async function polishProse() {
			const resultsEl = document.getElementById('polish-results');
			const body = bodyInput.value.trim();
			
			if (!body) {
				resultsEl.innerHTML = '<div class="ai-error">Write some content first</div>';
				return;
			}

			resultsEl.innerHTML = '<div class="ai-loading">Polishing prose...</div>';

			try {
				const res = await fetch('/midgard/ai/polish', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ body })
				});
				const data = await res.json();

				if (data.polished) {
					resultsEl.innerHTML = 
						'<div class="ai-result-item" onclick="applyPolished()">' + 
						(data.polished.substring(0, 150) + '...') + '</div>' +
						'<div style="font-size:10px;color:#999;margin-top:8px;">Click to replace body</div>';
					window.aiPolished = data.polished;
				} else {
					resultsEl.innerHTML = '<div class="ai-error">No polish generated</div>';
				}
			} catch (err) {
				resultsEl.innerHTML = '<div class="ai-error">Failed to polish</div>';
			}
		}

		function applyPolished() {
			if (confirm('Replace your body text with polished version?')) {
				bodyInput.value = window.aiPolished;
				document.querySelector('#polish-results .ai-result-item').classList.add('selected');
				updateWordCount();
				scheduleSave();
			}
		}

		// AI Panel Toggle
		function toggleAISection(section) {
			const content = document.getElementById('ai-' + section);
			const toggle = content.previousElementSibling;
			const isOpen = content.classList.contains('open');
			
			// Close all sections first
			document.querySelectorAll('.ai-content').forEach(el => el.classList.remove('open'));
			document.querySelectorAll('.ai-toggle').forEach(el => el.classList.remove('open'));
			
			// Open clicked section (if wasn't open)
			if (!isOpen) {
				content.classList.add('open');
				toggle.classList.add('open');
			}
		}

		// SEO Optimizer - Hybrid (Rules + AI)
		async function analyzeSEO() {
			const resultsEl = document.getElementById('seo-results');
			const title = titleInput.value.trim();
			const body = bodyInput.value.trim();
			const excerpt = form.querySelector('[name="excerpt"]').value.trim();
			
			if (!body) {
				resultsEl.innerHTML = '<div class="ai-error">Write some content first</div>';
				return;
			}

			resultsEl.innerHTML = '<div class="ai-loading">Analyzing...</div>';

			// RULES ENGINE (instant, no AI tokens)
			const issues = [];
			let score = 100;

			// Title length check
			if (title.length === 0) {
				issues.push({ type: 'error', text: 'Missing title', fix: null });
				score -= 20;
			} else if (title.length < 40) {
				issues.push({ type: 'warn', text: 'Title too short (' + title.length + ' chars)', fix: 'Aim for 50-60 chars' });
				score -= 5;
			} else if (title.length > 70) {
				issues.push({ type: 'warn', text: 'Title too long (' + title.length + ' chars)', fix: 'Keep under 60 chars' });
				score -= 5;
			} else {
				issues.push({ type: 'ok', text: 'Title length: Good (' + title.length + ' chars)', fix: null });
			}

			// Excerpt check
			if (!excerpt) {
				issues.push({ type: 'error', text: 'Missing excerpt', fix: 'Add a 150-160 char summary' });
				score -= 15;
			} else if (excerpt.length < 100) {
				issues.push({ type: 'warn', text: 'Excerpt too short (' + excerpt.length + ' chars)', fix: 'Aim for 150-160 chars' });
				score -= 5;
			} else if (excerpt.length > 170) {
				issues.push({ type: 'warn', text: 'Excerpt too long (' + excerpt.length + ' chars)', fix: 'Keep under 160 chars' });
				score -= 5;
			} else {
				issues.push({ type: 'ok', text: 'Excerpt length: Good (' + excerpt.length + ' chars)', fix: null });
			}

			// Word count check
			const wordCount = body.trim().split(/\\s+/).filter(w => w.length > 0).length;
			if (wordCount < 300) {
				issues.push({ type: 'warn', text: 'Content too short (' + wordCount + ' words)', fix: 'Aim for 1000+ words' });
				score -= 10;
			} else {
				issues.push({ type: 'ok', text: 'Word count: ' + wordCount + ' words', fix: null });
			}

			// Heading check (markdown)
			const h2Count = (body.match(/^## /gm) || []).length;
			if (h2Count === 0 && wordCount > 300) {
				issues.push({ type: 'warn', text: 'No H2 headings', fix: 'Add ## headings for structure' });
				score -= 5;
			} else if (h2Count > 0) {
				issues.push({ type: 'ok', text: 'H2 headings: ' + h2Count, fix: null });
			}

			// Internal links check
			const linkCount = (body.match(/\\[.*\\]\\(.*\\)/g) || []).length;
			if (linkCount === 0 && wordCount > 500) {
				issues.push({ type: 'warn', text: 'No links in content', fix: 'Add relevant links' });
				score -= 5;
			} else if (linkCount > 0) {
				issues.push({ type: 'ok', text: 'Links: ' + linkCount, fix: null });
			}

			// Clamp score
			score = Math.max(0, Math.min(100, score));

			// Render score and checklist
			let html = '<div class="seo-score"><span class="seo-score-num">' + score + '</span><span class="seo-score-label">/100</span></div>';
			html += '<div class="seo-checklist">';
			issues.forEach(issue => {
				const icon = issue.type === 'ok' ? '✓' : issue.type === 'warn' ? '⚠' : '✗';
				const cls = issue.type === 'ok' ? 'seo-ok' : issue.type === 'warn' ? 'seo-warn' : 'seo-error';
				html += '<div class="seo-item ' + cls + '">' + icon + ' ' + issue.text + '</div>';
				if (issue.fix) {
					html += '<div class="seo-fix">→ ' + issue.fix + '</div>';
				}
			});
			html += '</div>';

			// AI-enhanced features (keywords, meta)
			if (body.length >= 100) {
				html += '<div class="ai-loading" style="margin-top:12px;">Generating keywords & meta...</div>';
				
				try {
					const res = await fetch('/midgard/ai/seo', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ title, body, excerpt })
					});
					const data = await res.json();

					if (data.keywords) {
						html += '<div class="seo-section">Focus Keywords:</div>';
						html += '<div class="seo-keywords">';
						data.keywords.forEach((kw, i) => {
							html += '<div class="seo-keyword" onclick="selectKeyword(' + i + ')">' + kw + '</div>';
						});
						html += '</div>';
						window.seoKeywords = data.keywords;
					}

					if (data.metaDescription) {
						html += '<div class="seo-section">Suggested Meta:</div>';
						html += '<div class="ai-result-item" onclick="applyMeta()">' + data.metaDescription + '</div>';
						window.seoMeta = data.metaDescription;
					}
				} catch (err) {
					html += '<div class="ai-error">AI analysis failed</div>';
				}
			}

			resultsEl.innerHTML = html;
		}

		function selectKeyword(index) {
			const keywords = document.querySelectorAll('.seo-keyword');
			keywords.forEach((el, i) => el.classList.toggle('selected', i === index));
		}

		function applyMeta() {
			if (window.seoMeta) {
				form.querySelector('[name="excerpt"]').value = window.seoMeta;
				scheduleSave();
			}
		}

		// JSON-LD Schema Functions
		function toggleSchema() {
			const content = document.getElementById('schema-content');
			const toggle = content.previousElementSibling;
			const isOpen = content.classList.contains('open');
			
			content.classList.toggle('open', !isOpen);
			toggle.classList.toggle('open', !isOpen);
		}

		async function generateSchema() {
			const textarea = document.getElementById('schema-textarea');
			const status = document.getElementById('schema-status');
			const title = titleInput.value.trim();
			const body = bodyInput.value.trim();
			const excerpt = form.querySelector('[name="excerpt"]').value.trim();
			const coverImage = form.querySelector('[name="coverImage"]').value.trim();

			if (!body) {
				status.innerHTML = '<div class="schema-invalid">Write content first</div>';
				return;
			}

			status.innerHTML = '<div class="schema-valid">Generating...</div>';

			try {
				const res = await fetch('/midgard/ai/schema', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ title, body, excerpt, coverImage })
				});
				const data = await res.json();

				if (data.schema) {
					textarea.value = JSON.stringify(data.schema, null, 2);
					status.innerHTML = '<div class="schema-valid">✓ Schema generated</div>';
					scheduleSave();
				} else {
					status.innerHTML = '<div class="schema-invalid">Failed to generate</div>';
				}
			} catch (err) {
				status.innerHTML = '<div class="schema-invalid">Error generating schema</div>';
			}
		}

		function validateSchema() {
			const textarea = document.getElementById('schema-textarea');
			const status = document.getElementById('schema-status');
			const value = textarea.value.trim();

			if (!value) {
				status.innerHTML = '<div class="schema-invalid">Schema is empty</div>';
				return;
			}

			try {
				const parsed = JSON.parse(value);
				
				// Check required fields
				const hasContext = parsed['@context'];
				const hasType = parsed['@type'];
				
				if (!hasContext || !hasType) {
					status.innerHTML = '<div class="schema-invalid">Missing @context or @type</div>';
					return;
				}

				status.innerHTML = '<div class="schema-valid">✓ Valid JSON-LD (' + parsed['@type'] + ')</div>';
			} catch (err) {
				status.innerHTML = '<div class="schema-invalid">Invalid JSON: ' + err.message + '</div>';
			}
		}

		// Load draft and inspire images on page load
		loadDraft();
		loadInspireImages();
		
		// Check if we're editing an existing post (URL has ?edit=slug)
		const urlParams = new URLSearchParams(window.location.search);
		const editSlug = urlParams.get('edit');
		const isNewPost = urlParams.get('new') === 'true';
		
		if (isNewPost) {
			// Clear editor for new post
			clearEditor();
			// Clear any saved draft from localStorage
			localStorage.removeItem(DRAFT_KEY);
		} else if (editSlug) {
			// Load existing post for editing
			loadPostForEdit(editSlug);
		} else {
			// Restore draft from localStorage (if any)
			loadDraft();
		}
		
		function clearEditor() {
			titleInput.value = '';
			slugInput.value = '';
			bodyInput.value = '';
			form.querySelector('[name="excerpt"]').value = '';
			form.querySelector('[name="coverImage"]').value = '';
			form.querySelector('[name="tags"]').value = '';
			document.getElementById('schema-textarea').value = '';
			document.getElementById('cover-preview').classList.remove('visible');
			slugPreview.textContent = 'your-slug';
			wordCount.textContent = '0';
			window.editingPostId = null;
		}

		async function loadPostForEdit(slug) {
			try {
				const res = await fetch('/midgard/edit/' + slug);
				if (!res.ok) {
					console.error('Failed to load post');
					return;
				}
				const data = await res.json();
				if (data.post) {
					const post = data.post;
					titleInput.value = post.title || '';
					slugInput.value = post.slug || '';
					bodyInput.value = post.body || '';
					form.querySelector('[name="excerpt"]').value = post.excerpt || '';
					form.querySelector('[name="coverImage"]').value = post.coverImage || '';
					form.querySelector('[name="tags"]').value = (post.tags || []).join(', ');
					document.getElementById('schema-textarea').value = post.schema ? JSON.stringify(post.schema, null, 2) : '';
					slugPreview.textContent = post.slug || 'your-slug';
					updateWordCount();
					
					// Store post ID for update
					window.editingPostId = post.id;
					
					// Show cover preview
					if (post.coverImage) {
						const coverPreview = document.getElementById('cover-preview');
						const optimizedUrl = post.coverImage.includes('unsplash.com') 
							? (post.coverImage.includes('?') ? post.coverImage + '&w=720&fm=webp&q=70' : post.coverImage + '?w=720&fm=webp&q=70')
							: post.coverImage;
						coverPreview.src = optimizedUrl;
						coverPreview.classList.add('visible');
					}
				}
			} catch (err) {
				console.error('Error loading post:', err);
			}
		}
	</script>
</body>
</html>`;
}

export function renderMidgardPostsList(posts: MarcusPost[]): string {
	const postsHtml = posts.map(post => {
		const isDraft = post.status === 'draft';
		const statusBadge = isDraft 
			? '<span class="status-badge draft">Draft</span>'
			: '<span class="status-badge published">Published</span>';
		const date = isDraft 
			? new Date(post.createdAt).toLocaleDateString()
			: new Date(post.publishedAt).toLocaleDateString();
		const viewLink = isDraft 
			? ''
			: '<a href="/marcus/' + post.slug + '" class="action-btn" target="_blank">View</a>';
		
		return '<div class="post-row" data-post-id="' + post.id + '" data-post-title="' + escapeHTML(post.title) + '">' +
			'<div class="post-info">' +
				'<div class="post-title-row">' +
					'<span class="post-title">' + escapeHTML(post.title) + '</span>' +
					statusBadge +
				'</div>' +
				'<div class="post-meta">/' + post.slug + ' · ' + date + '</div>' +
			'</div>' +
			'<div class="post-actions">' +
				'<a href="/midgard?edit=' + post.slug + '" class="action-btn">Edit</a>' +
				viewLink +
				'<button class="action-btn delete-btn" onclick="confirmDelete(\'' + post.id + '\', \'' + escapeHTML(post.title).replace(/'/g, "\\'") + '\')">Delete</button>' +
			'</div>' +
		'</div>';
	}).join('');

	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Posts - Midgard</title>
	<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet">
	<style>
		* { box-sizing: border-box; margin: 0; padding: 0; }
		body { background: #fff; color: #000; font-family: 'JetBrains Mono', monospace; min-height: 100vh; }
		.container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
		.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 1px solid #eee; }
		.title { font-size: 24px; font-weight: 600; }
		.back-link { color: #999; text-decoration: none; font-size: 12px; }
		.back-link:hover { color: #000; }
		.post-row { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid #eee; }
		.post-row:last-child { border-bottom: none; }
		.post-info { flex: 1; }
		.post-title-row { display: flex; align-items: center; gap: 12px; margin-bottom: 4px; }
		.post-title { font-size: 16px; }
		.status-badge { font-size: 10px; padding: 4px 10px; border-radius: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; }
		.status-badge.draft { background: #fef3c7; color: #92400e; }
		.status-badge.published { background: #dcfce7; color: #166534; }
		.post-meta { font-size: 12px; color: #999; }
		.post-actions { display: flex; gap: 12px; }
		.action-btn { padding: 8px 16px; font-size: 12px; border-radius: 6px; text-decoration: none; border: 1px solid #eee; color: #666; cursor: pointer; background: #fff; font-family: inherit; }
		.action-btn:hover { border-color: #000; color: #000; }
		.delete-btn { color: #dc2626; border-color: #fecaca; }
		.delete-btn:hover { background: #fef2f2; border-color: #dc2626; color: #dc2626; }
		.new-btn { display: inline-block; margin-top: 24px; padding: 12px 24px; background: #000; color: #fff; text-decoration: none; border-radius: 6px; font-size: 13px; }
		.new-btn:hover { background: #333; }
		.empty { text-align: center; padding: 60px 0; color: #999; }
		
		/* Delete Confirmation Modal */
		.modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: none; align-items: center; justify-content: center; z-index: 1000; }
		.modal-overlay.visible { display: flex; }
		.modal { background: #fff; border-radius: 12px; padding: 32px; max-width: 400px; width: 90%; text-align: center; }
		.modal-title { font-size: 18px; font-weight: 600; margin-bottom: 12px; }
		.modal-text { color: #666; font-size: 14px; margin-bottom: 24px; }
		.modal-actions { display: flex; gap: 12px; justify-content: center; }
		.modal-btn { padding: 10px 24px; border-radius: 6px; font-size: 13px; cursor: pointer; font-family: inherit; border: none; }
		.modal-btn-cancel { background: #f5f5f5; color: #666; }
		.modal-btn-cancel:hover { background: #eee; }
		.modal-btn-delete { background: #dc2626; color: #fff; }
		.modal-btn-delete:hover { background: #b91c1c; }
	</style>
</head>
<body>
	<div class="container">
		<div class="header">
			<div class="title">Your Posts</div>
			<a href="/midgard" class="back-link">← Back to Editor</a>
		</div>
		${posts.length > 0 ? postsHtml : '<div class="empty">No posts yet. Start writing!</div>'}
		<a href="/midgard?new=true" class="new-btn">+ New Post</a>
	</div>
	
	<!-- Delete Confirmation Modal -->
	<div id="delete-modal" class="modal-overlay">
		<div class="modal">
			<div class="modal-title">Delete Post?</div>
			<div class="modal-text" id="delete-modal-text">This action cannot be undone.</div>
			<div class="modal-actions">
				<button class="modal-btn modal-btn-cancel" onclick="closeModal()">Cancel</button>
				<button class="modal-btn modal-btn-delete" id="confirm-delete-btn">Delete</button>
			</div>
		</div>
	</div>
	
	<script>
		let deletePostId = null;
		
		function confirmDelete(postId, postTitle) {
			deletePostId = postId;
			document.getElementById('delete-modal-text').textContent = '"' + postTitle + '" will be permanently deleted. This action cannot be undone.';
			document.getElementById('delete-modal').classList.add('visible');
		}
		
		function closeModal() {
			deletePostId = null;
			document.getElementById('delete-modal').classList.remove('visible');
		}
		
		document.getElementById('confirm-delete-btn').addEventListener('click', async function() {
			if (!deletePostId) return;
			
			this.textContent = 'Deleting...';
			this.disabled = true;
			
			try {
				const res = await fetch('/midgard/post/' + deletePostId, { method: 'DELETE' });
				const data = await res.json();
				
				if (data.success) {
					// Remove row from UI
					const row = document.querySelector('.post-row[data-post-id="' + deletePostId + '"]');
					if (row) row.remove();
					
					// Check if empty
					const remaining = document.querySelectorAll('.post-row');
					if (remaining.length === 0) {
						document.querySelector('.container').innerHTML = '<div class="header"><div class="title">Your Posts</div><a href="/midgard" class="back-link">← Back to Editor</a></div><div class="empty">No posts yet. Start writing!</div><a href="/midgard?new=true" class="new-btn">+ New Post</a>';
					}
					
					closeModal();
				} else {
					alert('Error: ' + (data.error || 'Failed to delete'));
					this.textContent = 'Delete';
					this.disabled = false;
				}
			} catch (err) {
				alert('Failed to delete: ' + err.message);
				this.textContent = 'Delete';
				this.disabled = false;
			}
		});
		
		// Close modal on overlay click
		document.getElementById('delete-modal').addEventListener('click', function(e) {
			if (e.target === this) closeModal();
		});
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

function escapeHTML(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}
