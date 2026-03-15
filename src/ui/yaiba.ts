export const YAIBA_EDITOR_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>YAIBA | Zen Markdown Editor | PUNCHY.ME</title>
    <link href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
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

        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
        ::-webkit-scrollbar-thumb { background: rgba(34, 197, 94, 0.2); border-radius: 4px; border: 1px solid rgba(34, 197, 94, 0.1); }
        ::-webkit-scrollbar-thumb:hover { background: rgba(34, 197, 94, 0.4); }

        .grid-bg {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background-image: linear-gradient(rgba(34, 197, 94, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.05) 1px, transparent 1px);
            background-size: 40px 40px;
            z-index: 0;
            pointer-events: none;
        }

        .scan-line {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 4px;
            background: linear-gradient(to bottom, transparent, var(--accent), transparent);
            opacity: 0.1;
            z-index: 1;
            pointer-events: none;
            animation: scan 6s linear infinite;
        }
        @keyframes scan { from { transform: translateY(-100px); } to { transform: translateY(100vh); } }

        .tactical-header {
            position: fixed;
            top: 0; left: 0; width: 100%;
            padding: 1.5rem 2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: rgba(0,0,0,0.8);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(34, 197, 94, 0.2);
            z-index: 100;
        }

        .brand-block { display: flex; align-items: center; gap: 1.5rem; }
        .brand-text-wrapper { display: flex; flex-direction: column; gap: 4px; }
        
        .title-row { display: flex; align-items: center; gap: 1rem; }
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
        }
        .tagline { font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-dim); letter-spacing: 1.5px; text-transform: uppercase; font-weight: 700; opacity: 0.8; }

        .beta-badge {
            background: var(--accent);
            color: #000;
            font-size: 0.8rem;
            font-weight: 900;
            padding: 4px 10px;
            border-radius: 6px;
            font-family: var(--font-mono);
            box-shadow: 0 0 15px rgba(34, 197, 94, 0.6);
            letter-spacing: 1px;
            animation: pulse 2s infinite alternate;
            margin-top: -10px;
        }
        @keyframes pulse { from { transform: scale(1); opacity: 0.8; } to { transform: scale(1.05); opacity: 1; } }

        .brand::before, .brand::after {
            content: attr(data-text);
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: #000;
            opacity: 0;
            will-change: transform, opacity;
            transform: translateZ(0);
        }
        .brand::before { left: 1px; color: #ff00ff; animation: glitch-anim-1 4s infinite; }
        .brand::after { left: -1px; color: #00ffff; animation: glitch-anim-2 3s infinite; }

        @keyframes yaiba-glitch {
            0%, 80%, 100% { transform: skew(0deg) translateZ(0); text-shadow: none; }
            81% { transform: skew(2deg) translateZ(0); text-shadow: 1px 0 #ff00ff; }
            82% { transform: skew(-2deg) translateZ(0); text-shadow: -1px 0 #00ffff; }
            83% { transform: skew(0deg) translateZ(0); text-shadow: none; }
        }
        @keyframes glitch-anim-1 { 0%, 90%, 100% { opacity: 0; transform: translate(0) translateZ(0); clip-path: inset(50% 0 50% 0); } 91% { opacity: 0.5; transform: translate(-2px, 2px) translateZ(0); clip-path: inset(10% 0 80% 0); } 92% { opacity: 0; transform: translate(0) translateZ(0); } }
        @keyframes glitch-anim-2 { 0%, 94%, 100% { opacity: 0; transform: translate(0) translateZ(0); clip-path: inset(50% 0 50% 0); } 95% { opacity: 0.5; transform: translate(2px, -2px) translateZ(0); clip-path: inset(80% 0 10% 0); } 96% { opacity: 0; transform: translate(0) translateZ(0); } }

        .header-controls { display: flex; align-items: center; gap: 1.5rem; }
        .encryption-status { font-size: 0.65rem; color: var(--text-dim); text-transform: uppercase; letter-spacing: 1px; display: flex; align-items: center; gap: 5px; opacity: 0.6; }
        .encryption-status span { width: 6px; height: 6px; background: var(--text-dim); border-radius: 50%; display: inline-block; }

        .action-group { display: flex; align-items: center; gap: 0.8rem; }

        .publish-btn { background: #ffffff; color: #000000; border: none; padding: 10px 24px; border-radius: 6px; font-weight: 700; cursor: pointer; font-family: var(--font-mono); text-transform: uppercase; transition: all 0.3s ease; }
        .publish-btn:hover { background: #e2e8f0; transform: translateY(-1px); box-shadow: 0 4px 15px rgba(255, 255, 255, 0.1); }
        .publish-btn:disabled { opacity: 0.3; cursor: not-allowed; transform: none; }

        .print-btn { background: transparent; color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.3); padding: 8px 20px; border-radius: 6px; font-weight: 700; cursor: pointer; font-family: var(--font-mono); text-transform: uppercase; transition: all 0.2s; }
        .print-btn:hover { background: rgba(255, 255, 255, 0.05); border-color: #ffffff; }

        @media print {
            .grid-bg, .scan-line, .tactical-header, .resizer, .editor-pane, .cursor-pulse, .char-counter { display: none !important; }
            html, body { background: #fff !important; color: #000 !important; height: auto !important; min-height: auto !important; overflow: visible !important; position: static !important; }
            .workspace { margin: 0 !important; padding: 0 !important; height: auto !important; display: block !important; }
            .preview-pane { background: #fff !important; padding: 0 !important; width: 100% !important; display: block !important; position: static !important; overflow: visible !important; backdrop-filter: none !important; }
            #preview-content { max-width: 100%; color: #000 !important; }
            #preview-content h1:first-child, #preview-content p:first-child { margin-top: 0 !important; }
            #preview-content h1, #preview-content h2, #preview-content h3 { color: #000 !important; border-bottom: 2px solid #000; margin-top: 1.5rem; page-break-after: avoid; }
            #preview-content p, #preview-content pre { page-break-inside: avoid; }
            .print-only { display: block !important; font-family: var(--font-mono); text-transform: uppercase; }
            .print-header { color: #999 !important; font-size: 8pt; margin-bottom: 2rem; border-bottom: 1px solid #eee; padding-bottom: 5px; }
            .print-footer { color: #666 !important; font-size: 9pt; margin-top: 4rem; border-top: 1px solid #eee; padding-top: 1rem; text-align: center; font-weight: 700; letter-spacing: 1px; }
            #preview-content a { color: #000 !important; border-bottom: 1px solid #000; }
            #preview-content pre { background: #f5f5f5 !important; border: 1px solid #ddd !important; color: #000 !important; white-space: pre-wrap !important; }
            #preview-content code { background: #eee !important; color: #000 !important; }
            #preview-content input[type="checkbox"] { border: 1px solid #000 !important; }
            #preview-content input[type="checkbox"]:checked { background: #000 !important; }
        }
        .print-only { display: none; }

        .workspace { display: flex; height: calc(100vh - 100px); margin-top: 100px; position: relative; z-index: 10; }
        .pane { height: 100%; display: flex; flex-direction: column; overflow: hidden; position: relative; will-change: flex; }
        body.resizing .preview-pane { pointer-events: none; }
        body.resizing * { cursor: col-resize !important; }

        .editor-pane { flex: 1 1 50%; background: #121212; border-right: 1px solid rgba(255, 255, 255, 0.05); }
        .preview-pane { flex: 1 1 50%; background: #121212; padding: 2.5rem; overflow-y: auto; }

        .resizer { width: 4px; height: 100%; background: rgba(0, 0, 0, 0.3); cursor: col-resize; transition: background 0.2s; position: relative; z-index: 20; }
        .resizer:hover, .resizer.dragging { background: #ffffff; box-shadow: 0 0 10px #ffffff; }
        .resizer::after { content: ''; position: absolute; top: 0; left: -10px; right: -10px; bottom: 0; }

        textarea#editor { width: 100%; height: 100%; background: transparent; border: none; color: var(--text-main); font-family: var(--font-mono); font-size: 1.1rem; line-height: 1.8; padding: 2.5rem; resize: none; outline: none; transition: background 0.3s ease; }
        textarea#editor:focus { background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255, 255, 255, 0.02) 0%, transparent 50%); }

        .cursor-pulse { position: absolute; pointer-events: none; width: 20px; height: 20px; background: #ffffff; filter: blur(10px); border-radius: 50%; opacity: 0; z-index: 5; transition: transform 0.1s linear; }

        .char-counter { position: absolute; bottom: 15px; right: 20px; font-size: 0.75rem; color: #ffffff; background: rgba(0,0,0,0.8); padding: 4px 8px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); pointer-events: auto; transition: all 0.2s ease; cursor: help; }
        .char-counter.valid { color: var(--accent); border-color: var(--accent); }
        .char-counter.limit { color: #ef4444; border-color: #ef4444; }
        .char-counter::after { content: "YAIBA REQUIRES MIN 100 CHARS TO FORGE"; position: absolute; bottom: 100%; right: 0; margin-bottom: 8px; background: #ffffff; color: #000; font-weight: 700; font-size: 0.6rem; padding: 4px 8px; border-radius: 4px; white-space: nowrap; opacity: 0; pointer-events: none; transition: all 0.2s ease; transform: translateY(5px); }
        .char-counter:hover::after { opacity: 1; transform: translateY(0); }
        .char-counter.valid:hover::after { content: "MASTER WORK READY"; color: var(--accent); background: #000; border: 1px solid var(--accent); }

        #preview-content h1, #preview-content h2, #preview-content h3 { font-family: var(--font-brand); color: var(--text-main); text-transform: uppercase; margin-top: 1.5em; margin-bottom: 0.5em; font-weight: 400; }
        #preview-content p { margin-bottom: 1em; line-height: 1.7; }
        #preview-content a { color: #ffffff; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.3); }
        #preview-content code { background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; font-size: 1rem; }
        #preview-content pre { background: rgba(0,0,0,0.8); border: 1px solid rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; overflow-x: auto; margin-bottom: 1em; }
        #preview-content pre code { background: transparent; padding: 0; font-size: 1rem; }
        #preview-content img { max-width: 100%; height: auto; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); margin: 1rem 0; }
        #preview-content blockquote { border-left: 4px solid #ffffff; padding-left: 1rem; color: var(--text-dim); margin-bottom: 1em; font-style: italic; }
        #preview-content ul, #preview-content ol { margin-bottom: 1em; padding-left: 1.5rem; list-style: none !important; }
        #preview-content li { position: relative; line-height: 1.8; }
        #preview-content li::before { content: "•"; color: #ffffff; position: absolute; left: -1.2rem; font-weight: bold; opacity: 0.5; }
        #preview-content li:has(input[type="checkbox"])::before, #preview-content li.task-list-item::before { content: none !important; }
        #preview-content input[type="checkbox"] { -webkit-appearance: none; appearance: none; width: 1.2rem; height: 1.2rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; cursor: pointer; vertical-align: middle; margin-right: 10px; position: relative; transition: all 0.2s ease; margin-left: -1.2rem; }
        #preview-content input[type="checkbox"]:checked { background: #ffffff; border-color: #ffffff; box-shadow: 0 0 8px rgba(255, 255, 255, 0.4); }
        #preview-content input[type="checkbox"]:checked::after { content: '✓'; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #000; font-size: 0.8rem; font-weight: 900; }

        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); backdrop-filter: blur(15px); display: none; justify-content: center; align-items: center; z-index: 1000; opacity: 0; transition: opacity 0.4s ease; }
        .modal-overlay.show { display: flex; opacity: 1; }
        .modal-content { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); padding: 4rem 3rem; border-radius: 24px; text-align: center; max-width: 550px; width: 90%; box-shadow: 0 40px 100px rgba(0,0,0,0.8); transform: scale(0.8) translateY(30px); opacity: 0; transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); position: relative; z-index: 1001; }
        .modal-overlay.show .modal-content { transform: scale(1) translateY(0); opacity: 1; box-shadow: 0 0 60px rgba(255, 255, 255, 0.1); animation: success-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }
        @keyframes success-pop { 0% { transform: scale(0.8) translateY(30px); opacity: 0; } 100% { transform: scale(1) translateY(0); opacity: 1; } }
        .modal-title { color: var(--text-main); font-family: var(--font-brand); font-size: 3rem; margin-bottom: 1.5rem; text-transform: uppercase; font-weight: 400; letter-spacing: 4px; }
        .modal-desc { color: var(--text-dim); margin-bottom: 2.5rem; font-size: 1rem; line-height: 1.8; font-family: var(--font-mono); }
        .link-box { background: rgba(0,0,0,0.5); border: 1px solid rgba(255, 255, 255, 0.1); padding: 0.8rem 1.2rem; border-radius: 12px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; gap: 1rem; height: 60px; }
        .link-text { color: #ffffff; font-size: 0.95rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-decoration: none; border-bottom: 1px solid transparent; transition: border-color 0.2s; font-family: var(--font-mono); flex: 1; text-align: left; }
        .link-text:hover { border-bottom-color: #ffffff; }
        .copy-btn { background: rgba(255, 255, 255, 0.1); color: #ffffff; border: 1px solid #ffffff; padding: 0 20px; height: 36px; border-radius: 6px; cursor: pointer; font-family: var(--font-mono); font-size: 0.75rem; text-transform: uppercase; font-weight: 700; transition: all 0.2s; display: flex; align-items: center; justify-content: center; white-space: nowrap; }
        .copy-btn:hover { background: #ffffff; color: #000; box-shadow: 0 0 15px #ffffff; }

        @media (max-width: 768px) {
            .tactical-header { height: auto; padding: 1.2rem; flex-direction: column; gap: 1.2rem; align-items: flex-start; }
            .brand { font-size: 3rem; } /* 20% increase for mobile */
            .tagline { font-size: 0.55rem; letter-spacing: 1px; }
            .workspace { flex-direction: column; height: calc(100vh - 140px); margin-top: 140px; }
            .pane { flex: 1 1 50% !important; height: 50% !important; }
            .editor-pane { border-right: none; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
            .header-controls { width: 100%; justify-content: space-between; flex-direction: row; }
            .publish-btn, .print-btn { padding: 8px 16px; font-size: 0.75rem; }
            textarea#editor { padding: 1.5rem; font-size: 1rem; }
            .preview-pane { padding: 1.5rem; }
            .resizer { display: none; }
        }
    </style>
</head>
<body>
    <div class="grid-bg"></div>
    <div class="scan-line"></div>
    <div id="cursor-glow" class="cursor-pulse"></div>

    <header class="tactical-header">
        <div class="brand-block">
            <div class="brand-text-wrapper">
                <div class="title-row">
                    <a href="/" class="brand" data-text="YAIBA">YAIBA</a>
                    <div class="beta-badge">BETA</div>
                </div>
                <div class="tagline">THE LIGHTWEIGHT ZEN EDITOR FOR MODERN WRITERS</div>
            </div>
        </div>
        <div class="header-controls">
            <div class="encryption-status"><span></span> E2E ENCRYPTED</div>
            <div class="action-group">
                <button id="print-btn" class="print-btn">PRINT</button>
                <button id="publish-btn" class="publish-btn">PUBLISH</button>
            </div>
        </div>
    </header>

    <div class="workspace">
        <div class="pane editor-pane" id="editor-pane">
            <textarea id="editor" placeholder="Start writing... (Markdown supported)" maxlength="1800"></textarea>
            <div id="char-counter" class="char-counter">0 / 1800</div>
        </div>
        <div class="resizer" id="resizer"></div>
        <div class="pane preview-pane" id="preview-pane">
            <div class="print-only print-header">FORGED VIA YAIBA | ELITE ZEN EDITOR ON THE EDGE</div>
            <div id="preview-content"></div>
            <div class="print-only print-footer">YAIBA: FORGING FOCUS. SIMPLE. SECURE. SUPREME. [ PUNCHY.ME ]</div>
        </div>
    </div>

    <div id="success-modal" class="modal-overlay">
        <div class="grid-bg"></div>
        <div class="scan-line"></div>
        <div class="modal-content">
            <h2 class="modal-title">A MASTER WORK</h2>
            <p class="modal-desc">Your note has been refined into a craft. Encrypted client-side and forged onto the global edge. Respect the silence.</p>
            <div class="link-box">
                <a id="final-link" class="link-text" href="#" target="_blank">https://punchy.me/...</a>
                <button id="modal-copy-btn" class="copy-btn">Copy</button>
            </div>
            <button onclick="window.location.href='/yaiba'" class="publish-btn" style="width: 100%;">NEW YAIBA NOTE</button>
        </div>
    </div>

    <script>
        const editor = document.getElementById('editor');
        const preview = document.getElementById('preview-content');
        const charCounter = document.getElementById('char-counter');
        const publishBtn = document.getElementById('publish-btn');
        const printBtn = document.getElementById('print-btn');
        const cursorGlow = document.getElementById('cursor-glow');
        const resizer = document.getElementById('resizer');
        const editorPane = document.getElementById('editor-pane');
        const previewPane = document.getElementById('preview-pane');

        printBtn.onclick = () => window.print();

        let isResizing = false;
        let animationFrameId = null;
        resizer.addEventListener('mousedown', (e) => { isResizing = true; resizer.classList.add('dragging'); document.body.classList.add('resizing'); document.body.style.userSelect = 'none'; });
        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(() => {
                const workspaceRect = resizer.parentElement.getBoundingClientRect();
                const mouseX = e.clientX - workspaceRect.left;
                let leftWidthPercent = (mouseX / workspaceRect.width) * 100;
                if (leftWidthPercent < 35) leftWidthPercent = 35;
                if (leftWidthPercent > 65) leftWidthPercent = 65;
                editorPane.style.flex = \`0 0 \${leftWidthPercent}%\`;
                previewPane.style.flex = \`0 0 \${100 - leftWidthPercent}%\`;
            });
        });
        document.addEventListener('mouseup', () => { if (!isResizing) return; isResizing = false; resizer.classList.remove('dragging'); document.body.classList.remove('resizing'); document.body.style.userSelect = ''; if (animationFrameId) cancelAnimationFrame(animationFrameId); });

        async function encryptContent(text) {
            const key = await window.crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
            const iv = window.crypto.getRandomValues(new Uint8Array(12));
            const encoded = new TextEncoder().encode(text);
            const encrypted = await window.crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, key, encoded);
            const exportedKey = await window.crypto.subtle.exportKey("raw", key);
            const keyBase64 = btoa(String.fromCharCode(...new Uint8Array(exportedKey)));
            const ivBase64 = btoa(String.fromCharCode(...iv));
            const encryptedBase64 = btoa(String.fromCharCode(...new Uint8Array(encrypted)));
            return { data: encryptedBase64 + "." + ivBase64, key: keyBase64.replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/, '') };
        }

        marked.setOptions({ highlight: function(code, lang) { const language = hljs.getLanguage(lang) ? lang : 'plaintext'; return hljs.highlight(code, { language }).value; }, langPrefix: 'hljs language-' });

        function renderPreview() {
            const rawMarkdown = editor.value;
            const rawHtml = marked.parse(rawMarkdown || '_Start your Zen journey... (Min 100 chars)_');
            preview.innerHTML = DOMPurify.sanitize(rawHtml);
            preview.querySelectorAll('pre code').forEach((el) => hljs.highlightElement(el));
        }

        function updateCounter() {
            const len = editor.value.length;
            charCounter.innerText = \`\${len} / 1800\`;
            charCounter.classList.remove('valid', 'limit');
            if (len >= 100 && len <= 1800) charCounter.classList.add('valid');
            if (len >= 1750) charCounter.classList.add('limit');
        }

        editor.addEventListener('input', () => { renderPreview(); updateCounter(); cursorGlow.style.opacity = '0.4'; setTimeout(() => cursorGlow.style.opacity = '0', 100); });
        editor.addEventListener('mousemove', (e) => { const rect = editor.getBoundingClientRect(); editor.style.setProperty('--x', (e.clientX - rect.left) + 'px'); editor.style.setProperty('--y', (e.clientY - rect.top) + 'px'); cursorGlow.style.left = e.clientX + 'px'; cursorGlow.style.top = e.clientY + 'px'; });

        publishBtn.addEventListener('click', async () => {
            const content = editor.value.trim();
            if (content.length < 100) return alert('YAIBA requires at least 100 characters to forge a Master Work.');
            publishBtn.disabled = true; publishBtn.innerText = 'FORGING...';
            try {
                const { data, key } = await encryptContent(content);
                const response = await fetch('/yaiba/publish', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content: data }) });
                if (response.ok) { const result = await response.json(); showSuccessModal(result.id, key); }
                else { publishBtn.disabled = false; publishBtn.innerText = 'PUBLISH'; }
            } catch (err) { publishBtn.disabled = false; publishBtn.innerText = 'PUBLISH'; }
        });

        function showSuccessModal(id, key) {
            const url = window.location.origin + '/y/' + id + '#' + key;
            const linkEl = document.getElementById('final-link');
            linkEl.innerText = url; linkEl.href = url;
            document.getElementById('success-modal').classList.add('show');
            const copyBtn = document.getElementById('modal-copy-btn');
            copyBtn.onclick = () => { navigator.clipboard.writeText(url); copyBtn.innerText = 'COPIED!'; setTimeout(() => copyBtn.innerText = 'COPY', 2000); };
        }
        renderPreview();
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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
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
        body { background-color: var(--bg); color: var(--text-main); font-family: var(--font-mono); min-height: 100vh; display: flex; flex-direction: column; align-items: center; padding: 10vh 1.5rem; position: relative; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
        ::-webkit-scrollbar-thumb { background: rgba(34, 197, 94, 0.2); border-radius: 4px; border: 1px solid rgba(34, 197, 94, 0.1); }
        ::-webkit-scrollbar-thumb:hover { background: rgba(34, 197, 94, 0.4); }
        
        /* PURE ZEN VIEW: No Grid */
        
        .container { width: 100%; max-width: 800px; z-index: 10; background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 3rem clamp(1.5rem, 5vw, 4rem); box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .meta-info { display: flex; flex-direction: column; gap: 0.5rem; }
        .timestamp { font-size: 0.8rem; color: var(--text-dim); text-transform: uppercase; }
        .status-badge { display: flex; flex-direction: column; align-items: flex-end; gap: 5px; }
        .expiry-badge { background: rgba(255, 255, 255, 0.05); color: var(--text-dim); border: 1px solid rgba(255, 255, 255, 0.1); padding: 4px 10px; border-radius: 6px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; }
        .secure-lock { font-size: 0.65rem; color: #ffffff; text-transform: uppercase; display: flex; align-items: center; gap: 4px; } /* Pure White */
        
        #content { font-size: 1.1rem; line-height: 1.7; }
        #content h1, #content h2, #content h3 { font-family: var(--font-brand); color: var(--text-main); text-transform: uppercase; margin-top: 1.5em; margin-bottom: 0.5em; font-weight: 400; }
        #content p { margin-bottom: 1em; }
        #content a { color: #ffffff; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.3); }
        #content code { background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; font-size: 1rem; }
        #content pre { background: rgba(0,0,0,0.8); border: 1px solid rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; overflow-x: auto; margin-bottom: 1em; }
        #content pre code { background: transparent; padding: 0; font-size: 1rem; }
        #content img { max-width: 100%; height: auto; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); margin: 1rem 0; }
        #content blockquote { border-left: 4px solid #ffffff; padding-left: 1rem; color: var(--text-dim); margin-bottom: 1em; font-style: italic; }
        #content ul, #content ol { margin-bottom: 1em; padding-left: 1.5rem; list-style: none !important; }
        #content li { position: relative; line-height: 1.8; }
        #content li::before { content: "•"; color: #ffffff; position: absolute; left: -1.2rem; font-weight: bold; opacity: 0.5; }
        #content li:has(input[type="checkbox"])::before, #content li.task-list-item::before { content: none !important; }
        #content input[type="checkbox"] { -webkit-appearance: none; appearance: none; width: 1.2rem; height: 1.2rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; cursor: pointer; vertical-align: middle; margin-right: 10px; position: relative; transition: all 0.2s ease; margin-left: -1.2rem; }
        #content input[type="checkbox"]:checked { background: #ffffff; border-color: #ffffff; box-shadow: 0 0 8px rgba(255, 255, 255, 0.4); }
        #content input[type="checkbox"]:checked::after { content: '✓'; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #000; font-size: 0.8rem; font-weight: 900; }
        
        .footer { margin-top: 3rem; text-align: center; }
        .footer a { color: var(--text-dim); text-decoration: none; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; transition: color 0.2s; }
        .footer a:hover { color: var(--accent); }
        @media print {
            .grid-bg, .footer, .secure-lock, .expiry-badge { display: none !important; }
            html, body { background: #fff !important; color: #000 !important; height: auto !important; min-height: auto !important; overflow: visible !important; padding: 0 !important; position: static !important; }
            .container { background: #fff !important; border: none !important; box-shadow: none !important; max-width: 100% !important; padding: 0 !important; margin: 0 !important; position: static !important; display: block !important; backdrop-filter: none !important; }
            #content { color: #000 !important; font-size: 12pt !important; overflow: visible !important; display: block !important; position: static !important; }
            #content h1:first-child, #content p:first-child { margin-top: 0 !important; }
            #content h1, #content h2, #content h3 { color: #000 !important; border-bottom: 2px solid #000; margin-top: 1.5rem; page-break-after: avoid; }
            #content p, #content pre { page-break-inside: avoid; }
            .print-only { display: block !important; font-family: var(--font-mono); text-transform: uppercase; }
            .print-header { color: #999 !important; font-size: 8pt; margin-bottom: 2rem; border-bottom: 1px solid #eee; padding-bottom: 5px; }
            .print-footer { color: #666 !important; font-size: 9pt; margin-top: 4rem; border-top: 1px solid #eee; padding-top: 1rem; text-align: center; font-weight: 700; letter-spacing: 1px; }
            #content pre { background: #f5f5f5 !important; border: 1px solid #ddd !important; color: #000 !important; white-space: pre-wrap !important; }
            #content input[type="checkbox"]:checked { background: #000 !important; }
        }
        .print-only { display: none; }
        #raw-data { display: none; }
    </style>
</head>
<body>
    <div class="container">
        <div class="print-only print-header">FORGED VIA YAIBA | ELITE ZEN EDITOR ON THE EDGE</div>
        <div class="header">
            <div class="meta-info"><div class="timestamp" id="ts-display">Published: ...</div></div>
            <div class="status-badge"><div class="expiry-badge">Expires in 3 Days</div><div class="secure-lock">🔒 Zero-Knowledge Storage</div></div>
        </div>
        <div id="content">Decrypting Shadow Node...</div>
        <div class="print-only print-footer">YAIBA: FORGING FOCUS. SIMPLE. SECURE. SUPREME. [ PUNCHY.ME ]</div>
        <div class="footer">
            <div style="margin-bottom: 1rem;"><button onclick="window.print()" style="background:transparent; color:var(--accent); border:1px solid var(--accent); padding:4px 12px; border-radius:4px; font-family:var(--font-mono); font-size:0.7rem; cursor:pointer; text-transform:uppercase;">[ Print / Save PDF ]</button></div>
            <a href="/yaiba">[ Forged via YAIBA ]</a>
        </div>
    </div>
    <div id="raw-data"></div>
    <script>
        async function decryptContent(encryptedData, keyBase64) {
            try {
                const parts = encryptedData.split('.');
                const encrypted = Uint8Array.from(atob(parts[0]), c => c.charCodeAt(0));
                const iv = Uint8Array.from(atob(parts[1]), c => c.charCodeAt(0));
                const normalizedKey = keyBase64.replace(/-/g, '+').replace(/_/g, '/');
                const keyRaw = Uint8Array.from(atob(normalizedKey), c => c.charCodeAt(0));
                const key = await window.crypto.subtle.importKey("raw", keyRaw, { name: "AES-GCM" }, false, ["decrypt"]);
                const decrypted = await window.crypto.subtle.decrypt({ name: "AES-GCM", iv: iv }, key, encrypted);
                return new TextDecoder().decode(decrypted);
            } catch (e) { console.error(e); return null; }
        }
        document.addEventListener('DOMContentLoaded', async () => {
            const rawDataEl = document.getElementById('raw-data');
            const hash = window.location.hash.substring(1);
            if (!hash) { document.getElementById('content').innerHTML = '<div style="color:#ef4444">ERROR: Decryption key missing from URL. This note cannot be read without the fragment key.</div>'; return; }
            if (rawDataEl && rawDataEl.textContent) {
                try {
                    const data = JSON.parse(rawDataEl.textContent);
                    if (data.createdAt) { const date = new Date(data.createdAt); document.getElementById('ts-display').innerText = 'Published: ' + date.toLocaleDateString() + ' ' + date.toLocaleTimeString(); }
                    const decrypted = await decryptContent(data.content, hash);
                    if (decrypted) {
                        const rawHtml = marked.parse(decrypted);
                        const cleanHtml = DOMPurify.sanitize(rawHtml);
                        const contentEl = document.getElementById('content');
                        contentEl.innerHTML = cleanHtml;
                        contentEl.querySelectorAll('pre code').forEach((el) => hljs.highlightElement(el));
                    } else { document.getElementById('content').innerHTML = '<div style="color:#ef4444">ERROR: Decryption failed. The key in your link may be incorrect or corrupted.</div>'; }
                } catch (e) { document.getElementById('content').innerText = 'Error loading note data.'; }
            }
        });
    </script>
</body>
</html>`;