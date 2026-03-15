export const YAIBA_EDITOR_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>YAIBA | Zen Markdown Editor | PUNCHY.ME</title>
    <link href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <!-- Marked.js for fast Markdown parsing -->
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <!-- DOMPurify to prevent XSS in preview -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.0.6/purify.min.js"></script>
    <style>
        :root {
            --bg: #000000;
            --accent: #22c55e;
            --text-main: #f8fafc;
            --text-dim: #94a3b8;
            --font-brand: 'Bitcount Prop Double', cursive;
            --font-mono: 'JetBrains Mono', monospace;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        html, body {
            height: 100%;
            background-color: var(--bg);
            color: var(--text-main);
            font-family: var(--font-mono);
            overflow: hidden;
        }

        /* Pulse Grid Background */
        .grid-bg {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background-image: 
                linear-gradient(rgba(34, 197, 94, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.05) 1px, transparent 1px);
            background-size: 40px 40px;
            z-index: 0;
            pointer-events: none;
        }

        /* Tactical Header */
        .tactical-header {
            position: fixed;
            top: 0; left: 0; width: 100%;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 1.5rem;
            background: rgba(0,0,0,0.8);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(34, 197, 94, 0.2);
            z-index: 100;
        }

        .brand {
            font-family: var(--font-brand);
            font-size: 1.5rem;
            color: var(--accent);
            text-transform: uppercase;
            text-decoration: none;
            letter-spacing: -1px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .header-controls {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .tag-input-wrapper {
            position: relative;
            display: flex;
            align-items: center;
        }

        .tag-input {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: var(--text-main);
            font-family: var(--font-mono);
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 0.8rem;
            width: 200px;
            outline: none;
            transition: all 0.2s;
        }
        .tag-input:focus { border-color: var(--accent); }

        .publish-btn {
            background: var(--accent);
            color: #000;
            border: none;
            padding: 6px 16px;
            border-radius: 6px;
            font-weight: 700;
            cursor: pointer;
            font-family: var(--font-mono);
            text-transform: uppercase;
            transition: all 0.2s;
        }
        .publish-btn:hover { background: #4ade80; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3); }
        .publish-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        /* Split Pane Layout */
        .workspace {
            display: flex;
            height: calc(100vh - 60px);
            margin-top: 60px;
            position: relative;
            z-index: 10;
        }

        .pane {
            flex: 1;
            height: 100%;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            position: relative;
        }

        .editor-pane {
            border-right: 1px solid rgba(34, 197, 94, 0.2);
            background: rgba(0,0,0,0.6);
            backdrop-filter: blur(5px);
        }

        .preview-pane {
            background: rgba(255,255,255,0.02);
            backdrop-filter: blur(5px);
            padding: 2rem;
            overflow-y: auto;
        }

        textarea#editor {
            width: 100%;
            height: 100%;
            background: transparent;
            border: none;
            color: var(--text-main);
            font-family: var(--font-mono);
            font-size: 1rem;
            line-height: 1.6;
            padding: 2rem;
            resize: none;
            outline: none;
        }

        .char-counter {
            position: absolute;
            bottom: 15px;
            right: 20px;
            font-size: 0.75rem;
            color: var(--text-dim);
            background: rgba(0,0,0,0.8);
            padding: 4px 8px;
            border-radius: 4px;
            border: 1px solid rgba(255,255,255,0.1);
            pointer-events: none;
        }
        .char-counter.limit { color: #ef4444; border-color: #ef4444; }

        /* Markdown Preview Styling */
        #preview-content {
            max-width: 800px;
            margin: 0 auto;
        }
        #preview-content h1, #preview-content h2, #preview-content h3 {
            font-family: var(--font-brand);
            color: var(--accent);
            text-transform: uppercase;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
            font-weight: 400;
        }
        #preview-content p { margin-bottom: 1em; line-height: 1.7; }
        #preview-content a { color: var(--accent); text-decoration: none; border-bottom: 1px solid rgba(34,197,94,0.3); }
        #preview-content a:hover { border-bottom-color: var(--accent); }
        #preview-content code {
            background: rgba(255,255,255,0.1);
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 0.9em;
        }
        #preview-content pre {
            background: rgba(0,0,0,0.8);
            border: 1px solid rgba(255,255,255,0.1);
            padding: 1rem;
            border-radius: 8px;
            overflow-x: auto;
            margin-bottom: 1em;
        }
        #preview-content pre code { background: transparent; padding: 0; }
        #preview-content blockquote {
            border-left: 4px solid var(--accent);
            padding-left: 1rem;
            color: var(--text-dim);
            margin-bottom: 1em;
            font-style: italic;
        }
        #preview-content ul, #preview-content ol { margin-bottom: 1em; padding-left: 2rem; }

        /* Modal */
        .modal-overlay {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.9);
            backdrop-filter: blur(10px);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .modal-overlay.show { display: flex; opacity: 1; }
        
        .modal-content {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(34, 197, 94, 0.3);
            padding: 3rem;
            border-radius: 16px;
            text-align: center;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 20px 50px rgba(0,0,0,0.8);
            transform: translateY(20px);
            transition: transform 0.3s ease;
        }
        .modal-overlay.show .modal-content { transform: translateY(0); }

        .modal-title { color: var(--accent); font-family: var(--font-brand); font-size: 2rem; margin-bottom: 1rem; text-transform: uppercase; }
        .modal-desc { color: var(--text-dim); margin-bottom: 2rem; font-size: 0.9rem; }
        
        .link-box {
            background: rgba(0,0,0,0.5);
            border: 1px solid rgba(255,255,255,0.1);
            padding: 1rem;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1.5rem;
        }
        .link-text { color: var(--text-main); font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .copy-btn {
            background: rgba(34,197,94,0.1);
            color: var(--accent);
            border: 1px solid var(--accent);
            padding: 4px 10px;
            border-radius: 4px;
            cursor: pointer;
            font-family: var(--font-mono);
            font-size: 0.8rem;
            text-transform: uppercase;
        }
        .copy-btn:hover { background: var(--accent); color: #000; }

        @media (max-width: 768px) {
            .workspace { flex-direction: column; height: auto; overflow: auto; }
            .pane { flex: none; height: 50vh; }
            .editor-pane { border-right: none; border-bottom: 1px solid rgba(34, 197, 94, 0.2); }
            .header-controls { flex-wrap: wrap; justify-content: flex-end; }
            .tag-input { width: 120px; }
            html, body { overflow: auto; }
        }
    </style>
</head>
<body>
    <div class="grid-bg"></div>

    <header class="tactical-header">
        <a href="/" class="brand">YAIBA <span style="font-size: 0.8rem; background: var(--accent); color: #000; padding: 2px 6px; border-radius: 4px; font-family: var(--font-mono); vertical-align: middle;">ZEN</span></a>
        <div class="header-controls">
            <div class="tag-input-wrapper">
                <input type="text" id="tags" class="tag-input" placeholder="Tags (comma separated)">
            </div>
            <button id="publish-btn" class="publish-btn">PUBLISH</button>
        </div>
    </header>

    <div class="workspace">
        <div class="pane editor-pane">
            <textarea id="editor" placeholder="Start writing... (Markdown supported)" maxlength="1800"></textarea>
            <div id="char-counter" class="char-counter">0 / 1800</div>
        </div>
        <div class="pane preview-pane">
            <div id="preview-content"></div>
        </div>
    </div>

    <!-- Success Modal -->
    <div id="success-modal" class="modal-overlay">
        <div class="modal-content">
            <h2 class="modal-title">Note Published</h2>
            <p class="modal-desc">Your note is live. The link will expire and self-destruct in 3 days.</p>
            <div class="link-box">
                <span id="final-link" class="link-text">https://punchy.me/...</span>
                <button id="modal-copy-btn" class="copy-btn">Copy</button>
            </div>
            <button onclick="window.location.href='/yaiba'" class="publish-btn" style="width: 100%;">Write Another</button>
        </div>
    </div>

    <script>
        const editor = document.getElementById('editor');
        const preview = document.getElementById('preview-content');
        const charCounter = document.getElementById('char-counter');
        const publishBtn = document.getElementById('publish-btn');
        const tagsInput = document.getElementById('tags');

        // Initial render
        renderPreview();

        editor.addEventListener('input', () => {
            renderPreview();
            updateCounter();
        });

        function renderPreview() {
            const rawMarkdown = editor.value;
            // Parse Markdown to HTML
            const rawHtml = marked.parse(rawMarkdown || '_Empty note..._');
            // Sanitize HTML to prevent XSS
            const cleanHtml = DOMPurify.sanitize(rawHtml);
            preview.innerHTML = cleanHtml;
        }

        function updateCounter() {
            const len = editor.value.length;
            charCounter.innerText = \`\${len} / 1800\`;
            if (len >= 1750) {
                charCounter.classList.add('limit');
            } else {
                charCounter.classList.remove('limit');
            }
        }

        publishBtn.addEventListener('click', async () => {
            const content = editor.value.trim();
            if (!content) return alert('Cannot publish an empty note.');
            
            publishBtn.disabled = true;
            publishBtn.innerText = 'PUBLISHING...';

            const tags = tagsInput.value.split(',').map(t => t.trim()).filter(t => t);

            try {
                const response = await fetch('/yaiba/publish', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content, tags })
                });

                if (response.ok) {
                    const data = await response.json();
                    showSuccessModal(data.id);
                } else {
                    const err = await response.json();
                    alert(err.error || 'Failed to publish.');
                    publishBtn.disabled = false;
                    publishBtn.innerText = 'PUBLISH';
                }
            } catch (err) {
                alert('Network error.');
                publishBtn.disabled = false;
                publishBtn.innerText = 'PUBLISH';
            }
        });

        function showSuccessModal(id) {
            const url = window.location.origin + '/y/' + id;
            document.getElementById('final-link').innerText = url;
            const modal = document.getElementById('success-modal');
            modal.classList.add('show');

            const copyBtn = document.getElementById('modal-copy-btn');
            copyBtn.onclick = () => {
                navigator.clipboard.writeText(url);
                copyBtn.innerText = 'COPIED!';
                copyBtn.style.background = 'var(--accent)';
                copyBtn.style.color = '#000';
                setTimeout(() => {
                    copyBtn.innerText = 'COPY';
                    copyBtn.style.background = 'rgba(34,197,94,0.1)';
                    copyBtn.style.color = 'var(--accent)';
                }, 2000);
            };
        }
    </script>
</body>
</html>`;

export const YAIBA_VIEW_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Encrypted Note | PUNCHY.ME</title>
    <link href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.0.6/purify.min.js"></script>
    <style>
        :root {
            --bg: #000000;
            --accent: #22c55e;
            --text-main: #f8fafc;
            --text-dim: #94a3b8;
            --font-brand: 'Bitcount Prop Double', cursive;
            --font-mono: 'JetBrains Mono', monospace;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            background-color: var(--bg);
            color: var(--text-main);
            font-family: var(--font-mono);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10vh 1.5rem;
            position: relative;
        }

        /* Pulse Grid Background */
        .grid-bg {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background-image: 
                linear-gradient(rgba(34, 197, 94, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.05) 1px, transparent 1px);
            background-size: 40px 40px;
            z-index: 0;
            pointer-events: none;
        }

        .container {
            width: 100%;
            max-width: 800px;
            z-index: 10;
            background: rgba(255, 255, 255, 0.02);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            padding: 3rem clamp(1.5rem, 5vw, 4rem);
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 2rem;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .meta-info {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .timestamp {
            font-size: 0.8rem;
            color: var(--text-dim);
            text-transform: uppercase;
        }

        .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }

        .tag {
            background: rgba(34, 197, 94, 0.1);
            color: var(--accent);
            border: 1px solid rgba(34, 197, 94, 0.2);
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 0.7rem;
            text-transform: uppercase;
        }

        .expiry-badge {
            background: rgba(239, 68, 68, 0.1);
            color: #ef4444;
            border: 1px solid rgba(239, 68, 68, 0.3);
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 0.7rem;
            font-weight: 700;
            text-transform: uppercase;
        }

        /* Markdown Preview Styling */
        #content {
            font-size: 1.1rem;
            line-height: 1.7;
        }
        #content h1, #content h2, #content h3 {
            font-family: var(--font-brand);
            color: var(--accent);
            text-transform: uppercase;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
            font-weight: 400;
        }
        #content p { margin-bottom: 1em; }
        #content a { color: var(--accent); text-decoration: none; border-bottom: 1px solid rgba(34,197,94,0.3); }
        #content a:hover { border-bottom-color: var(--accent); }
        #content code {
            background: rgba(255,255,255,0.1);
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 0.9em;
        }
        #content pre {
            background: rgba(0,0,0,0.8);
            border: 1px solid rgba(255,255,255,0.1);
            padding: 1rem;
            border-radius: 8px;
            overflow-x: auto;
            margin-bottom: 1em;
        }
        #content pre code { background: transparent; padding: 0; }
        #content blockquote {
            border-left: 4px solid var(--accent);
            padding-left: 1rem;
            color: var(--text-dim);
            margin-bottom: 1em;
            font-style: italic;
        }
        #content ul, #content ol { margin-bottom: 1em; padding-left: 2rem; }

        .footer {
            margin-top: 3rem;
            text-align: center;
        }
        .footer a {
            color: var(--text-dim);
            text-decoration: none;
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: color 0.2s;
        }
        .footer a:hover { color: var(--accent); }

        /* Hidden data store for hydration */
        #raw-data { display: none; }
    </style>
</head>
<body>
    <div class="grid-bg"></div>

    <div class="container">
        <div class="header">
            <div class="meta-info">
                <div class="timestamp" id="ts-display">Published: ...</div>
                <div class="tags" id="tags-container"></div>
            </div>
            <div class="expiry-badge">Expires in 3 Days</div>
        </div>

        <div id="content">Loading...</div>

        <div class="footer">
            <a href="/yaiba">[ Forged via YAIBA ]</a>
        </div>
    </div>

    <div id="raw-data"></div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const rawDataEl = document.getElementById('raw-data');
            if (rawDataEl && rawDataEl.textContent) {
                try {
                    const data = JSON.parse(rawDataEl.textContent);
                    
                    // Render Date
                    if (data.createdAt) {
                        const date = new Date(data.createdAt);
                        document.getElementById('ts-display').innerText = 'Published: ' + date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
                    }

                    // Render Tags
                    if (data.tags && data.tags.length > 0) {
                        const tagsHtml = data.tags.map(t => \`<span class="tag">\${t.replace(/</g, '&lt;')}</span>\`).join('');
                        document.getElementById('tags-container').innerHTML = tagsHtml;
                    }

                    // Render Markdown
                    if (data.content) {
                        const rawHtml = marked.parse(data.content);
                        const cleanHtml = DOMPurify.sanitize(rawHtml);
                        document.getElementById('content').innerHTML = cleanHtml;
                    }
                } catch (e) {
                    document.getElementById('content').innerText = 'Error loading note data.';
                }
            }
        });
    </script>
</body>
</html>`;