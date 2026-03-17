import { PUNCHY_PORTAL_HTML } from './portal';

export const YAIBA_EDITOR_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>YAIBA | Zen Markdown Editor | PUNCHY.ME</title>
    <meta name="description" content="YAIBA Zen Editor: High-performance, client-side encrypted Markdown editor. Secure, focused, and edge-native.">
    
    <!-- Open Graph / Social -->
    <meta property="og:title" content="YAIBA | Zen Markdown Editor | PUNCHY.ME">
    <meta property="og:description" content="High-performance, client-side encrypted Markdown editor. Secure, focused, and edge-native.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://punchy.me/yaiba">
    <meta property="og:image" content="https://punchy.me/og-images/og-image-yaiba.webp">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="YAIBA | Zen Markdown Editor | PUNCHY.ME">
    <meta name="twitter:description" content="High-performance, client-side encrypted Markdown editor. Secure, focused, and edge-native.">
    <meta name="twitter:image" content="https://punchy.me/og-images/og-image-yaiba.webp">

    <!-- JSON-LD Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "YAIBA Zen Editor",
      "operatingSystem": "Any",
      "applicationCategory": "ProductivityApplication",
      "description": "High-performance, client-side encrypted Markdown editor. Secure, focused, and edge-native.",
      "url": "https://punchy.me/yaiba",
      "publisher": {
        "@type": "Organization",
        "name": "PUNCHY.ME"
      }
    }
    </script>

    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E✒️%3C/text%3E%3C/svg%3E">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    
    <!-- Strategic Dependencies -->
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.0.6/purify.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>

    <style>
        :root {
            --bg: #000000;
            --ronin: #121212;
            --accent: #22c55e;
            --accent-hover: #4ade80;
            --text-main: #f8fafc;
            --text-dim: #94a3b8;
            --font-brand: 'Bitcount Prop Double', cursive;
            --font-mono: 'JetBrains Mono', monospace;
            --header-h: 120px;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        html, body { height: 100%; background-color: var(--bg); color: var(--text-main); font-family: var(--font-mono); overflow: hidden; }

        /* CUSTOM SCROLLBAR: White Glow */
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.2); }
        ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.3); border-radius: 10px; transition: all 0.3s; }
        ::-webkit-scrollbar-thumb:hover { background: #ffffff; box-shadow: 0 0 15px #ffffff; }
        * { scrollbar-width: thin; scrollbar-color: rgba(255, 255, 255, 0.3) rgba(0, 0, 0, 0.2); }

        .tactical-header { height: var(--header-h); padding: 0 2.5rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255, 255, 255, 0.05); background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); position: relative; z-index: 200; }
        
        .brand-text-wrapper { display: flex; flex-direction: column; gap: 4px; }
        .title-row { display: flex; align-items: center; gap: 1.5rem; }
        .brand {
            font-family: var(--font-brand);
            font-size: 4.5rem;
            color: var(--text-main);
            text-transform: uppercase;
            text-decoration: none;
            letter-spacing: -3px;
            line-height: 0.8;
            position: relative;
            animation: yaiba-glitch 5s infinite;
            font-weight: 400;
        }
        .tagline { font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-dim); letter-spacing: 1.5px; text-transform: uppercase; font-weight: 700; opacity: 0.8; }
        
        .beta-badge { background: var(--accent); color: #000; font-size: 0.8rem; font-weight: 900; padding: 4px 10px; border-radius: 6px; font-family: var(--font-mono); box-shadow: 0 0 15px rgba(34, 197, 94, 0.6); animation: pulse 2s infinite alternate; letter-spacing: 1px; margin-top: -10px; }
        @keyframes pulse { from { transform: scale(1); opacity: 0.8; } to { transform: scale(1.05); opacity: 1; } }

        @keyframes yaiba-glitch {
            0%, 80%, 100% { transform: skew(0deg); text-shadow: none; } 
            81% { transform: skew(2deg); text-shadow: 1px 0 #ff00ff; }  
            82% { transform: skew(-2deg); text-shadow: -1px 0 #00ffff; }
            83% { transform: skew(0deg); text-shadow: none; }
        }

        .header-controls { display: flex; gap: 1.5rem; align-items: center; }
        .encryption-status { font-size: 0.65rem; color: var(--text-dim); text-transform: uppercase; letter-spacing: 1px; display: flex; align-items: center; gap: 8px; opacity: 0.6; }
        .status-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--text-dim); }
        
        .action-group { display: flex; align-items: center; gap: 0.8rem; }
        .publish-btn { background: #ffffff; color: #000000; border: none; padding: 10px 24px; border-radius: 6px; font-weight: 700; cursor: pointer; font-family: var(--font-mono); text-transform: uppercase; transition: all 0.3s ease; }
        .publish-btn:hover { background: #e2e8f0; transform: translateY(-1px); box-shadow: 0 4px 15px rgba(255, 255, 255, 0.1); }
        .publish-btn:disabled { opacity: 0.3; cursor: not-allowed; transform: none; }
        
        .print-btn { background: transparent; color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.3); padding: 8px 20px; border-radius: 6px; font-weight: 700; cursor: pointer; font-family: var(--font-mono); text-transform: uppercase; transition: all 0.2s; }
        .print-btn:hover { background: rgba(255, 255, 255, 0.05); border-color: #ffffff; }

        .workspace { display: flex; height: calc(100vh - var(--header-h)); position: relative; }
        .pane { height: 100%; overflow: hidden; position: relative; will-change: flex; }
        .editor-pane { flex: 1 1 50%; border-right: 1px solid rgba(255, 255, 255, 0.05); background: var(--ronin); position: relative; }
        .preview-pane { flex: 1 1 50%; background: var(--ronin); padding: 3rem; overflow-y: auto; line-height: 1.6; }
        
        /* POINTER ISOLATION */
        body.resizing .preview-pane, body.resizing .editor-pane { pointer-events: none; user-select: none; }
        body.resizing * { cursor: col-resize !important; }

        textarea#editor { width: 100%; height: 100%; background: transparent; border: none; color: #ffffff; font-family: var(--font-mono); font-size: 1.1rem; padding: 3rem; outline: none; resize: none; line-height: 1.8; }
        
        .preview-content { max-width: 800px; margin: 0 auto; color: var(--text-main); font-size: 1.1rem; }
        .preview-content h1, .preview-content h2, .preview-content h3 { font-family: var(--font-brand); color: var(--text-main); margin: 2rem 0 1rem; line-height: 1.2; padding-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 1px; font-weight: 400; border: none; }
        .preview-content h1 { font-size: 3rem; }
        .preview-content p { margin-bottom: 1.5rem; opacity: 0.9; }
        .preview-content a { color: var(--accent); text-decoration: none; border-bottom: 1px solid transparent; transition: all 0.2s; }
        .preview-content a:hover { border-bottom-color: var(--accent); }
        
        .preview-content img { max-width: 100%; height: auto; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); margin: 1rem 0; }
        .preview-content ul { list-style: none; padding-left: 1.5rem; }
        .preview-content li { position: relative; margin-bottom: 0.5rem; }
        .preview-content li::before { content: "•"; color: #ffffff; position: absolute; left: -1.2rem; font-weight: bold; opacity: 0.5; }
        .preview-content li:has(input[type="checkbox"])::before { content: none !important; }
        .preview-content input[type="checkbox"] { -webkit-appearance: none; appearance: none; width: 1.2rem; height: 1.2rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; cursor: pointer; vertical-align: middle; margin-right: 10px; position: relative; transition: all 0.2s ease; margin-left: -1.2rem; }
        .preview-content input[type="checkbox"]:checked { background: #ffffff; border-color: #ffffff; }
        .preview-content input[type="checkbox"]:checked::after { content: '✓'; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #000; font-size: 0.8rem; font-weight: 900; }

        .preview-content table { width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; font-size: 0.95rem; }
        .preview-content th, .preview-content td { padding: 12px; border: 1px solid rgba(255, 255, 255, 0.1); text-align: left; }
        .preview-content th { background: rgba(255, 255, 255, 0.03); font-weight: 700; text-transform: uppercase; color: var(--text-dim); }

        .preview-content code { background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; font-size: 0.95em; }
        .preview-content pre { background: rgba(0,0,0,0.8); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; overflow-x: auto; border: 1px solid rgba(255, 255, 255, 0.1); }
        .preview-content pre code { background: transparent; padding: 0; font-size: 1rem; }
        .preview-content blockquote { border-left: 4px solid #fff; padding-left: 1.5rem; margin-bottom: 1.5rem; font-style: italic; color: var(--text-dim); }
        
        /* RESIZER HARDENING: touch-action: none is mandatory for Pointer API stability */
        .resizer { width: 6px; flex-shrink: 0; cursor: col-resize; background: rgba(255, 255, 255, 0.03); transition: background 0.2s; z-index: 300; touch-action: none; }
        .resizer:hover, .resizer.dragging { background: #ffffff; box-shadow: 0 0 15px #ffffff; }

        .char-counter { position: absolute; bottom: 1.5rem; right: 1.5rem; background: rgba(0,0,0,0.8); border: 1px solid rgba(255,255,255,0.1); padding: 6px 12px; border-radius: 4px; font-size: 0.7rem; color: var(--text-dim); font-family: var(--font-mono); z-index: 400; transition: all 0.2s ease; }

        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.95); backdrop-filter: blur(15px); display: none; align-items: center; justify-content: center; z-index: 1000; opacity: 0; transition: opacity 0.4s ease; }
        .modal-overlay.show { display: flex; opacity: 1; }
        .modal { background: #000; border: 1px solid rgba(255, 255, 255, 0.1); padding: 4rem; border-radius: 24px; text-align: center; max-width: 600px; width: 95%; transform: scale(0.9) translateY(30px); transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); position: relative; box-shadow: 0 0 100px rgba(255, 255, 255, 0.1); overflow: hidden; }
        .modal-overlay.show .modal { transform: scale(1) translateY(0); }

        .success-icon {
            width: 80px; height: 80px; background: var(--accent); border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            margin: 0 auto 1.5rem;
            box-shadow: 0 0 30px var(--accent);
            animation: success-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            position: relative; z-index: 10;
        }
        @keyframes success-pop { 0% { transform: scale(0); } 100% { transform: scale(1); } }
        .success-icon svg { width: 40px; height: 40px; color: #000; }
        .modal-content-wrapper { position: relative; z-index: 10; }

        @media (max-width: 768px) {
            .tactical-header { height: auto; padding: 1.5rem; flex-direction: column; gap: 1.2rem; align-items: flex-start; }
            .brand { font-size: 3rem; }
            .workspace { flex-direction: column; height: calc(100vh - 160px); margin-top: 0; }
            .pane { flex: 1 1 50% !important; height: 50% !important; }
            .editor-pane { border-right: none; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
            textarea#editor { padding: 1.5rem; font-size: 1rem; }
            .preview-pane { padding: 1.5rem; }
            .resizer { display: none; }
            .char-counter { bottom: 1rem; right: 1rem; font-size: 0.6rem; padding: 4px 8px; }
        }

        /* PDF PRINT OPTIMIZATION (Clean Room Mandate) */
        @media print {
            * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            .tactical-header, .resizer, .editor-pane, .punchy-portal, .char-counter, .cursor-pulse { display: none !important; }
            html, body { background: #fff !important; color: #000 !important; height: auto !important; min-height: auto !important; overflow: visible !important; padding: 0 !important; position: static !important; }
            .workspace { display: block !important; height: auto !important; margin: 0 !important; overflow: visible !important; }
            .preview-pane { display: block !important; width: 100% !important; height: auto !important; padding: 0 !important; background: #fff !important; color: #000 !important; overflow: visible !important; position: static !important; }
            .preview-content { max-width: 100% !important; margin: 0 !important; padding: 0 !important; display: block !important; color: #000 !important; }
            .preview-content h1, .preview-content h2, .preview-content h3 { color: #000 !important; border: none !important; margin-top: 1.5rem !important; font-weight: 400 !important; page-break-after: avoid; }
            .preview-content p, .preview-content pre, .preview-content blockquote { page-break-inside: avoid; color: #000 !important; opacity: 1 !important; }
            .preview-content ul { list-style: disc !important; padding-left: 2rem !important; }
            .preview-content li::before { display: none !important; }
            .preview-content pre { background: #f5f5f5 !important; border: 1px solid #ddd !important; color: #000 !important; }
            .preview-content pre code { color: #000 !important; }
            .preview-content th, .preview-content td { border: 1px solid #ccc !important; color: #000 !important; }
            .preview-content th { background: #eee !important; }
            .print-only { display: block !important; font-family: var(--font-mono); text-transform: uppercase; font-size: 8pt; color: #999 !important; margin-bottom: 2rem; border-bottom: 1px solid #eee; padding-bottom: 5px; }
            .print-footer { display: block !important; color: #666 !important; font-size: 9pt; margin-top: 4rem; border-top: 1px solid #eee; padding-top: 1rem; text-align: center; font-weight: 700; letter-spacing: 1px; }
            .preview-content input[type="checkbox"] { border: 1px solid #000 !important; background: #fff !important; }
            .preview-content input[type="checkbox"]:checked { background: #000 !important; border-color: #000 !important; }
            .preview-content input[type="checkbox"]:checked::after { color: #fff !important; }
            }
            .print-only { display: none; }
    </style>
</head>
<body>
    ${PUNCHY_PORTAL_HTML}
    <div class="print-only print-header">FORGED VIA YAIBA | ELITE ZEN EDITOR ON THE EDGE</div>

    <header class="tactical-header">
        <div class="brand-block">
            <div class="brand-text-wrapper">
                <div class="title-row">
                    <a href="/" class="brand" data-text="YAIBA">YAIBA</a>
                    <div class="beta-badge">BETA</div>
                </div>
                <div class="tagline">The Lightweight Zen Editor for Modern Writers</div>
            </div>
        </div>
        
        <div class="header-controls">
            <div class="encryption-status"><div class="status-dot"></div> E2E ENCRYPTED</div>
            <div class="action-group">
                <button class="print-btn" onclick="window.print()">Print</button>
                <button class="publish-btn" id="publish-btn">Publish</button>
            </div>
        </div>
    </header>

    <div class="workspace" id="workspace">
        <section class="pane editor-pane" id="editor-pane">
            <textarea id="editor" spellcheck="false" placeholder="# Start your Zen journey... (Min 100 chars)

Use Markdown to craft elite documents. 
Your work is encrypted locally before being stored."></textarea>
            <div id="char-counter" class="char-counter">0 / 1800</div>
        </section>
        
        <div class="resizer" id="resizer"></div>
        
        <section class="pane preview-pane" id="preview-pane">
            <div class="preview-content" id="preview"></div>
            <div class="print-only print-footer">FORGED AT THE EDGE BY PUNCHY.ME</div>
        </section>
    </div>

    <div id="modal-overlay" class="modal-overlay">
        <div class="modal">
            <div class="success-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h2 style="font-family: var(--font-brand); font-weight: 400; font-size: 2.5rem; margin-bottom: 1rem;">A MASTER WORK</h2>
            <p style="color: var(--text-dim); margin-bottom: 2.5rem; font-size: 0.95rem;">Encrypted client-side and deployed to the edge. Key fragment is not stored on our servers.</p>
            
            <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 1.2rem; margin-bottom: 2rem; display: flex; align-items: center; gap: 1rem;">
                <a id="success-url" href="#" target="_blank" style="flex: 1; color: #ffffff; font-family: var(--font-mono); font-size: 0.9rem; text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-decoration: none; border-bottom: 1px solid transparent;">https://punchy.me/y/abcdef...</a>
                <button id="copy-btn" style="background: rgba(255, 255, 255, 0.1); color: #ffffff; border: 1px solid #ffffff; padding: 0 20px; height: 36px; border-radius: 6px; cursor: pointer; font-family: var(--font-mono); font-size: 0.75rem; text-transform: uppercase; font-weight: 700;">Copy</button>
            </div>
            
            <button class="publish-btn" onclick="location.reload()" style="width: 100%;">NEW YAIBA NOTE</button>
        </div>
    </div>

    <script>
        const editor = document.getElementById('editor');
        const preview = document.getElementById('preview');
        const charCounter = document.getElementById('char-counter');
        const publishBtn = document.getElementById('publish-btn');
        const resizer = document.getElementById('resizer');
        const workspace = document.getElementById('workspace');
        const editorPane = document.getElementById('editor-pane');
        const previewPane = document.getElementById('preview-pane');

        marked.setOptions({
            highlight: function(code, lang) {
                const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                return hljs.highlight(code, { language }).value;
            },
            langPrefix: 'hljs language-'
        });

        let renderTimeout;
        function renderPreview() {
            if (renderTimeout) clearTimeout(renderTimeout);
            renderTimeout = setTimeout(() => {
                const rawHtml = marked.parse(editor.value || '');
                preview.innerHTML = DOMPurify.sanitize(rawHtml);
                preview.querySelectorAll('pre code').forEach((el) => hljs.highlightElement(el));
            }, 50);
        }

        function updateCounter() {
            const len = editor.value.length;
            charCounter.innerText = len + ' / 1800';
            publishBtn.disabled = len < 100 || len > 1800;
        }

        editor.addEventListener('input', () => { renderPreview(); updateCounter(); });

        // Frame-Throttled Resizer (Bulletproof Standard)
        let isResizing = false;
        let animationFrameId = null;

        const onMouseMove = (e) => {
            if (!isResizing) return;
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            
            animationFrameId = requestAnimationFrame(() => {
                const workspaceRect = workspace.getBoundingClientRect();
                const mouseX = e.clientX - workspaceRect.left;
                let percentage = (mouseX / workspaceRect.width) * 100;
                
                if (percentage > 15 && percentage < 85) {
                    editorPane.style.flex = '1 1 ' + percentage + '%';
                    previewPane.style.flex = '1 1 ' + (100 - percentage) + '%';
                }
                animationFrameId = null;
            });
        };

        const onMouseUp = () => {
            if (!isResizing) return;
            isResizing = false;
            document.body.classList.remove('resizing');
            resizer.classList.remove('dragging');
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        };

        resizer.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isResizing = true;
            document.body.classList.add('resizing');
            resizer.classList.add('dragging');
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        async function generateKey() {
            return await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
        }

        async function encrypt(text, key) {
            const iv = crypto.getRandomValues(new Uint8Array(12));
            const encoded = new TextEncoder().encode(text);
            const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoded);
            return { ciphertext: btoa(String.fromCharCode(...new Uint8Array(ciphertext))), iv: btoa(String.fromCharCode(...iv)) };
        }

        async function exportKey(key) {
            const exported = await crypto.subtle.exportKey("raw", key);
            return btoa(String.fromCharCode(...new Uint8Array(exported))).replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/, '');
        }

        publishBtn.onclick = async () => {
            const content = editor.value;
            publishBtn.innerText = 'FORGING...';
            publishBtn.disabled = true;

            try {
                const key = await generateKey();
                const { ciphertext, iv } = await encrypt(content, key);
                const exportedKey = await exportKey(key);
                const payload = JSON.stringify({ c: ciphertext, i: iv });

                const res = await fetch('/yaiba/publish', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content: payload })
                });

                if (res.ok) {
                    const { id } = await res.json();
                    const finalUrl = window.location.origin + '/y/' + id + '#' + exportedKey;
                    const urlEl = document.getElementById('success-url');
                    urlEl.innerText = finalUrl;
                    urlEl.href = finalUrl;
                    document.getElementById('modal-overlay').classList.add('show');

                    document.getElementById('copy-btn').onclick = () => {
                        navigator.clipboard.writeText(finalUrl);
                        document.getElementById('copy-btn').innerText = 'COPIED';
                        setTimeout(() => document.getElementById('copy-btn').innerText = 'Copy', 2000);
                    };
                }
            } catch (err) {
                console.error(err);
            } finally {
                publishBtn.innerText = 'Publish';
                publishBtn.disabled = false;
            }
        };

        renderPreview();
    </script>
</body>
</html>`;

export const YAIBA_VIEW_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title id="title-tag">YAIBA | Professional Markdown View | PUNCHY.ME</title>
    <meta name="description" id="meta-description" content="Securely view this Zen Markdown document on PUNCHY.ME.">
    
    <!-- Open Graph / Social -->
    <meta property="og:type" content="website">
    <meta property="og:title" id="og-title" content="YAIBA | Markdown View | PUNCHY.ME">
    <meta property="og:description" id="og-description" content="Securely view this Zen Markdown document on PUNCHY.ME.">
    <meta property="og:image" content="https://punchy.me/og-image.webp">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" id="twitter-title" content="YAIBA | Markdown View | PUNCHY.ME">
    <meta name="twitter:description" id="twitter-description" content="Securely view this Zen Markdown document on PUNCHY.ME.">
    <meta name="twitter:image" content="https://punchy.me/og-image.webp">

    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E✒️%3C/text%3E%3C/svg%3E">

        <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.0.6/purify.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>

    <style>
        :root {
            --bg: #000000;
            --ronin: #121212;
            --accent: #22c55e;
            --text-main: #f8fafc;
            --text-dim: #94a3b8;
            --font-brand: 'Bitcount Prop Double', cursive;
            --font-mono: 'JetBrains Mono', monospace;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        html, body { height: 100%; min-height: 100vh; background-color: var(--ronin); color: var(--text-main); font-family: var(--font-mono); line-height: 1.6; }

        /* CUSTOM SCROLLBAR: White Glow */
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.2); }
        ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.3); border-radius: 10px; transition: all 0.3s; }
        ::-webkit-scrollbar-thumb:hover { background: #ffffff; box-shadow: 0 0 15px #ffffff; }

        .container { max-width: 800px; margin: 1rem auto; padding: 6rem 2rem; position: relative; min-height: 100%; background: var(--ronin); border: none; border-radius: 0; }
        
        .header { margin-bottom: 4rem; text-align: left; }
        .secure-lock { color: #fff; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; display: flex; align-items: center; gap: 8px; margin-bottom: 1rem; }
        .lock-dot { width: 8px; height: 8px; background: #fff; border-radius: 50%; box-shadow: 0 0 10px #fff; }
        .timestamp { color: var(--text-dim); font-size: 0.65rem; text-transform: uppercase; letter-spacing: 1px; }
        
        .expiry-badge { position: absolute; top: 2rem; right: 2rem; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); padding: 6px 12px; border-radius: 6px; font-size: 0.6rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; }

        #content { font-size: 1.1rem; }
        #content h1, #content h2, #content h3 { font-family: var(--font-brand); color: var(--text-main); margin: 2.5rem 0 1.25rem; line-height: 1.2; text-transform: uppercase; letter-spacing: 1px; font-weight: 400; border: none; }
        #content h1 { font-size: 3.5rem; padding-bottom: 0.5rem; }
        #content p { margin-bottom: 1.5rem; }
        #content a { color: var(--accent); text-decoration: none; border-bottom: 1px solid transparent; transition: all 0.2s; }
        #content a:hover { border-bottom-color: var(--accent); }
        
        #content img { max-width: 100%; height: auto; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); margin: 1rem 0; }
        #content ul { list-style: none; padding-left: 1.5rem; }
        #content li { position: relative; line-height: 1.8; }
        #content li::before { content: "•"; color: #ffffff; position: absolute; left: -1.2rem; font-weight: bold; opacity: 0.5; }
        #content li:has(input[type="checkbox"])::before { content: none !important; }
        #content input[type="checkbox"] { -webkit-appearance: none; appearance: none; width: 1.2rem; height: 1.2rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; cursor: pointer; vertical-align: middle; margin-right: 10px; position: relative; transition: all 0.2s ease; margin-left: -1.2rem; }
        #content input[type="checkbox"]:checked { background: #ffffff; border-color: #ffffff; }
        #content input[type="checkbox"]:checked::after { content: '✓'; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #000; font-size: 0.8rem; font-weight: 900; }

        #content table { width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; font-size: 0.95rem; }
        #content th, #content td { padding: 12px; border: 1px solid rgba(255, 255, 255, 0.1); text-align: left; }
        #content th { background: rgba(255, 255, 255, 0.03); font-weight: 700; text-transform: uppercase; color: var(--text-dim); }

        #content code { background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; font-size: 0.95em; }
        #content pre { background: rgba(0,0,0,0.8); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; overflow-x: auto; border: 1px solid rgba(255, 255, 255, 0.1); }
        #content blockquote { border-left: 4px solid #fff; padding-left: 1.5rem; margin-bottom: 1.5rem; font-style: italic; color: var(--text-dim); }

        .footer { margin-top: 3rem; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 2rem; }
        .footer a { color: var(--text-dim); text-decoration: none; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; transition: color 0.2s; }
        .footer a:hover { color: var(--accent); }

        @media print {
            .punchy-portal { display: none !important; visibility: hidden !important; opacity: 0 !important; }
            .footer, .secure-lock, .expiry-badge { display: none !important; }
            html, body { background: #fff !important; color: #000 !important; height: auto !important; min-height: auto !important; overflow: visible !important; padding: 0 !important; position: static !important; }
            .container { background: #fff !important; border: none !important; box-shadow: none !important; max-width: 100% !important; padding: 0 !important; margin: 0 !important; position: static !important; display: block !important; backdrop-filter: none !important; }
            #content { color: #000 !important; font-size: 12pt !important; overflow: visible !important; display: block !important; position: static !important; }
            #content h1:first-child, #content p:first-child { margin-top: 0 !important; }
            #content h1, #content h2, #content h3 { color: #000 !important; border: none !important; margin-top: 1.5rem; page-break-after: avoid; font-weight: 400 !important; }
            #content p, #content pre, #content blockquote { page-break-inside: avoid; color: #000 !important; opacity: 1 !important; }
            #content ul { list-style: disc !important; padding-left: 2rem !important; }
            #content li::before { display: none !important; }
            .print-only { display: block !important; font-family: var(--font-mono); text-transform: uppercase; }
            .print-header { color: #999 !important; font-size: 8pt; margin-bottom: 2rem; border-bottom: 1px solid #eee; padding-bottom: 5px; }
            .print-footer { color: #666 !important; font-size: 9pt; margin-top: 4rem; border-top: 1px solid #eee; padding-top: 1rem; text-align: center; font-weight: 700; letter-spacing: 1px; }
            #content pre { background: #f5f5f5 !important; border: 1px solid #ddd !important; color: #000 !important; white-space: pre-wrap !important; }
            #content input[type="checkbox"] { border: 1px solid #000 !important; background: #fff !important; }
            #content input[type="checkbox"]:checked { background: #000 !important; border-color: #000 !important; }
            #content input[type="checkbox"]:checked::after { color: #fff !important; }
            }        .print-only { display: none; }
        #raw-data { display: none; }
    </style>
</head>
<body>
    ${PUNCHY_PORTAL_HTML}
    <div class="container">
        <div class="print-only print-header">FORGED VIA YAIBA | ELITE ZEN EDITOR ON THE EDGE</div>
        <div class="header">
            <div class="meta-info"><div class="timestamp" id="ts-display">Published: ...</div></div>
            <div class="status-badge"><div class="expiry-badge">Expires in 3 days</div><div class="secure-lock">🔒 Zero-Knowledge Storage</div></div>
        </div>

        <div id="content">Decrypting master work...</div>
        
        <div class="print-only print-footer">FORGED AT THE EDGE BY PUNCHY.ME</div>
        
        <div class="footer">
            <div style="margin-bottom: 1rem;"><button onclick="window.print()" style="background:#ffffff; color:#000000; border:none; padding:6px 16px; border-radius:6px; font-family:var(--font-mono); font-size:0.75rem; font-weight:700; cursor:pointer; text-transform:uppercase; box-shadow:0 4px 15px rgba(255,255,255,0.1); transition:all 0.2s;">[ Print / Save PDF ]</button></div>
            <a href="/yaiba">Forge Your Own at PUNCHY.ME</a>
        </div>
    </div>

    <div id="raw-data"></div>

    <script>
        async function decrypt(ciphertext, iv, keyBase64) {
            const normalizedKey = keyBase64.replace(/-/g, '+').replace(/_/g, '/');
            const keyData = Uint8Array.from(atob(normalizedKey), c => c.charCodeAt(0));
            const key = await crypto.subtle.importKey("raw", keyData, "AES-GCM", true, ["decrypt"]);
            const ivData = Uint8Array.from(atob(iv), c => c.charCodeAt(0));
            const cipherData = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0));
            const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv: ivData }, key, cipherData);
            return new TextDecoder().decode(decrypted);
        }

        window.addEventListener('load', async () => {
            const hash = window.location.hash.substring(1);
            const rawDataEl = document.getElementById('raw-data');
            
            if (!hash) {
                document.getElementById('content').innerHTML = '<div style="color: #ef4444; font-weight: bold;">[ ACCESS DENIED ] Decryption key missing from URL fragment.</div>';
                return;
            }

            if (rawDataEl && rawDataEl.textContent) {
                try {
                    const data = JSON.parse(rawDataEl.textContent);
                    if (data.createdAt) {
                        const date = new Date(data.createdAt);
                        document.getElementById('ts-display').innerText = 'Published: ' + date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
                    }
                    const payload = typeof data.content === 'string' ? JSON.parse(data.content) : data.content;
                    const decrypted = await decrypt(payload.c, payload.i, hash);
                    const rawHtml = marked.parse(decrypted);
                    document.getElementById('content').innerHTML = DOMPurify.sanitize(rawHtml);
                    document.querySelectorAll('pre code').forEach((el) => hljs.highlightElement(el));
                    if (decrypted.length > 0) {
                        const firstLine = decrypted.split('\\n')[0].replace(/[#*_\`]/g, '').trim();
                        if (firstLine) document.title = \`\${firstLine} | YAIBA\`;
                    }
                } catch (e) {
                    console.error(e);
                    document.getElementById('content').innerHTML = '<div style="color: #ef4444; font-weight: bold;">[ DECRYPTION FAILED ] The key in your link may be incorrect or corrupted.</div>';
                }
            }
        });
        </script>
        </body>
        </html>`;
