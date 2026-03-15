export const YAIBA_EDITOR_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>YAIBA | Zen Markdown Editor | PUNCHY.ME</title>
    <link href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <!-- Marked.js for fast Markdown parsing -->
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <!-- Highlight.js for Syntax Highlighting -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
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

        /* CUSTOM SCROLLBAR: Tactical Neon */
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
        ::-webkit-scrollbar-thumb { 
            background: rgba(34, 197, 94, 0.2); 
            border-radius: 4px; 
            border: 1px solid rgba(34, 197, 94, 0.1);
        }
        ::-webkit-scrollbar-thumb:hover { background: rgba(34, 197, 94, 0.4); }

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
            padding: 1.5rem 2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: rgba(0,0,0,0.8);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(34, 197, 94, 0.2);
            z-index: 100;
        }

        .brand-block {
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }

        .brand-text-wrapper {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

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

        .tagline {
            font-family: var(--font-mono);
            font-size: 0.65rem;
            color: var(--text-dim);
            letter-spacing: 1.5px;
            text-transform: uppercase;
            font-weight: 700;
            opacity: 0.8;
        }

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

        @keyframes glitch-anim-1 {
            0%, 90%, 100% { opacity: 0; transform: translate(0) translateZ(0); clip-path: inset(50% 0 50% 0); }
            91% { opacity: 0.5; transform: translate(-2px, 2px) translateZ(0); clip-path: inset(10% 0 80% 0); }
            92% { opacity: 0; transform: translate(0) translateZ(0); }
        }

        @keyframes glitch-anim-2 {
            0%, 94%, 100% { opacity: 0; transform: translate(0) translateZ(0); clip-path: inset(50% 0 50% 0); }
            95% { opacity: 0.5; transform: translate(2px, -2px) translateZ(0); clip-path: inset(80% 0 10% 0); }
            96% { opacity: 0; transform: translate(0) translateZ(0); }
        }

        .mvp-badge {
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
            margin-top: 0.5rem;
        }

        @keyframes pulse {
            0% { transform: scale(1); opacity: 0.8; }
            100% { transform: scale(1.05); opacity: 1; }
        }
        
        .header-controls {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .encryption-status {
            font-size: 0.65rem;
            color: var(--accent);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-right: 1rem;
            display: flex;
            align-items: center;
            gap: 5px;
            opacity: 0.8;
        }
        .encryption-status span {
            width: 6px;
            height: 6px;
            background: var(--accent);
            border-radius: 50%;
            display: inline-block;
            box-shadow: 0 0 8px var(--accent);
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
            padding: 10px 24px;
            border-radius: 6px;
            font-weight: 700;
            cursor: pointer;
            font-family: var(--font-mono);
            text-transform: uppercase;
            transition: all 0.3s ease;
            animation: slow-glow 3s infinite ease-in-out;
        }
        .publish-btn:hover { background: #4ade80; transform: translateY(-1px); box-shadow: 0 0 20px rgba(34, 197, 94, 0.6); }
        .publish-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; animation: none; }

        .print-btn {
            background: transparent;
            color: var(--accent);
            border: 1px solid var(--accent);
            padding: 8px 20px;
            border-radius: 6px;
            font-weight: 700;
            cursor: pointer;
            font-family: var(--font-mono);
            text-transform: uppercase;
            transition: all 0.2s;
        }
        .print-btn:hover { background: rgba(34, 197, 94, 0.1); transform: translateY(-1px); }

        @keyframes slow-glow {
            0%, 100% { box-shadow: 0 0 5px rgba(34, 197, 94, 0.2); }
            50% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.5); }
        }

        /* PRINT OPTIMIZATION */
        @media print {
            .grid-bg, .tactical-header, .resizer, .editor-pane, .cursor-pulse, .char-counter, .punchy-portal { display: none !important; }
            html, body { background: #fff !important; color: #000 !important; height: auto !important; overflow: visible !important; }
            .workspace { margin: 0; height: auto !important; display: block !important; overflow: visible !important; }
            .preview-pane { background: #fff !important; padding: 0; width: 100% !important; display: block !important; position: static !important; overflow: visible !important; }
            #preview-content { max-width: 100%; color: #000 !important; overflow: visible !important; }
            #preview-content h1, #preview-content h2, #preview-content h3 { color: #000 !important; border-bottom: 2px solid #000; }
            #preview-content a { color: #000 !important; border-bottom: 1px solid #000; }
            #preview-content pre { background: #f5f5f5 !important; border: 1px solid #ddd !important; color: #000 !important; white-space: pre-wrap !important; }
            #preview-content code { background: #eee !important; color: #000 !important; }
            #preview-content input[type="checkbox"] { border: 1px solid #000 !important; }
            #preview-content input[type="checkbox"]:checked { background: #000 !important; }
        }

        /* Split Pane Layout */
        .workspace {
            display: flex;
            height: calc(100vh - 100px);
            margin-top: 100px;
            position: relative;
            z-index: 10;
        }

        .pane {
            height: 100%;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            position: relative;
        }

        .editor-pane {
            flex: 1 1 50%;
            background: #121212; /* RONIN GREY: Deep Tactical Foundation */
            border-right: 1px solid rgba(255, 255, 255, 0.05);
        }

        .preview-pane {
            flex: 1 1 50%;
            background: #121212; /* RONIN GREY: Deep Tactical Foundation */
            padding: 2.5rem;
            overflow-y: auto;
        }

        .resizer {
            width: 4px;
            height: 100%;
            background: rgba(0, 0, 0, 0.3);
            cursor: col-resize;
            transition: background 0.2s;
            position: relative;
            z-index: 20;
        }
        .resizer:hover, .resizer.dragging { background: var(--accent); box-shadow: 0 0 10px var(--accent); }
        .resizer::after {
            content: '';
            position: absolute;
            top: 0; left: -10px; right: -10px; bottom: 0;
        }

        textarea#editor {
            width: 100%;
            height: 100%;
            background: transparent;
            border: none;
            color: var(--text-main);
            font-family: var(--font-mono);
            font-size: 1.1rem;
            line-height: 1.8;
            padding: 2.5rem;
            resize: none;
            outline: none;
            transition: background 0.3s ease;
        }

        /* RONIN TYPEWRITER MODE: Subtle focus effect */
        textarea#editor:focus {
            background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(34, 197, 94, 0.03) 0%, transparent 50%);
        }

        .cursor-pulse {
            position: absolute;
            pointer-events: none;
            width: 20px;
            height: 20px;
            background: var(--accent);
            filter: blur(10px);
            border-radius: 50%;
            opacity: 0;
            z-index: 5;
            transition: transform 0.1s linear;
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
            max-width: 900px;
            margin: 0;
        }
        #preview-content h1, #preview-content h2, #preview-content h3 {
            font-family: var(--font-brand);
            color: var(--text-main); /* Changed to white */
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
            font-size: 1rem; /* Increased font size */
        }
        #preview-content pre {
            background: rgba(0,0,0,0.8);
            border: 1px solid rgba(255,255,255,0.1);
            padding: 1rem;
            border-radius: 8px;
            overflow-x: auto;
            margin-bottom: 1em;
        }
        #preview-content pre code { background: transparent; padding: 0; font-size: 1rem; } /* Increased font size */
        
        /* Tactical Fluid Images */
        #preview-content img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            border: 1px solid rgba(255,255,255,0.1);
            margin: 1rem 0;
        }

        #preview-content blockquote {
            border-left: 4px solid var(--accent);
            padding-left: 1rem;
            color: var(--text-dim);
            margin-bottom: 1em;
            font-style: italic;
        }
        #preview-content ul, #preview-content ol { margin-bottom: 1em; padding-left: 2rem; }
        
        /* Tactical Checkboxes */
        #preview-content input[type="checkbox"] {
            -webkit-appearance: none;
            appearance: none;
            width: 1.2rem;
            height: 1.2rem;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 4px;
            cursor: pointer;
            vertical-align: middle;
            margin-right: 10px;
            position: relative;
            transition: all 0.2s ease;
        }
        #preview-content input[type="checkbox"]:checked {
            background: var(--accent);
            border-color: var(--accent);
            box-shadow: 0 0 8px rgba(34, 197, 94, 0.4);
        }
        #preview-content input[type="checkbox"]:checked::after {
            content: '✓';
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            color: #000;
            font-size: 0.8rem;
            font-weight: 900;
        }

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
    <div id="cursor-glow" class="cursor-pulse"></div>
<header class="tactical-header">
    <div class="brand-block">
        <div class="brand-text-wrapper">
            <div class="title-row">
                <a href="/" class="brand" data-text="YAIBA">YAIBA</a>
            </div>
            <div class="tagline">THE LIGHTWEIGHT ZEN EDITOR FOR MODERN WRITERS</div>
        </div>
    </div>
        <div class="header-controls">
            <div class="encryption-status"><span></span> E2E ENCRYPTED</div>
            <div class="tag-input-wrapper">
                <input type="text" id="tags" class="tag-input" placeholder="Tags (comma separated)">
            </div>
            <button id="print-btn" class="print-btn">PRINT</button>
            <button id="publish-btn" class="publish-btn">PUBLISH</button>
        </div>
    </header>

    <div class="workspace">
        <div class="pane editor-pane" id="editor-pane">
            <textarea id="editor" placeholder="Start writing... (Markdown supported)" maxlength="1800"></textarea>
            <div id="char-counter" class="char-counter">0 / 1800</div>
        </div>
        <div class="resizer" id="resizer"></div>
        <div class="pane preview-pane" id="preview-pane">
            <div id="preview-content"></div>
        </div>
    </div>

    <!-- Success Modal -->
    <div id="success-modal" class="modal-overlay">
        <div class="modal-content">
            <h2 class="modal-title">Shadow Node Forged</h2>
            <p class="modal-desc">Note encrypted client-side. The link below contains the fragment key. We do not store this key on our servers.</p>
            <div class="link-box">
                <span id="final-link" class="link-text">https://punchy.me/...</span>
                <button id="modal-copy-btn" class="copy-btn">Copy</button>
            </div>
            <button onclick="window.location.href='/yaiba'" class="publish-btn" style="width: 100%;">New Session</button>
        </div>
    </div>

    <script>
        const editor = document.getElementById('editor');
        const preview = document.getElementById('preview-content');
        const charCounter = document.getElementById('char-counter');
        const publishBtn = document.getElementById('publish-btn');
        const printBtn = document.getElementById('print-btn');
        const tagsInput = document.getElementById('tags');
        const cursorGlow = document.getElementById('cursor-glow');
        const resizer = document.getElementById('resizer');
        const editorPane = document.getElementById('editor-pane');
        const previewPane = document.getElementById('preview-pane');

        printBtn.onclick = () => window.print();

        /* RESIZE LOGIC: Tactical Split */
        let isResizing = false;

        resizer.addEventListener('mousedown', (e) => {
            isResizing = true;
            resizer.classList.add('dragging');
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;

            const workspaceRect = resizer.parentElement.getBoundingClientRect();
            const mouseX = e.clientX - workspaceRect.left;
            
            // Calculate percentages
            let leftWidthPercent = (mouseX / workspaceRect.width) * 100;
            
            // Constraints: Min 35% each side
            if (leftWidthPercent < 35) leftWidthPercent = 35;
            if (leftWidthPercent > 65) leftWidthPercent = 65;

            editorPane.style.flex = \`0 0 \${leftWidthPercent}%\`;
            previewPane.style.flex = \`0 0 \${100 - leftWidthPercent}%\`;
        });

        document.addEventListener('mouseup', () => {
            if (!isResizing) return;
            isResizing = false;
            resizer.classList.remove('dragging');
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        });

        /* SHADOW PERSISTENCE: AES-GCM Encryption Core */
        async function encryptContent(text) {
            const key = await window.crypto.subtle.generateKey(
                { name: "AES-GCM", length: 256 },
                true,
                ["encrypt", "decrypt"]
            );
            const iv = window.crypto.getRandomValues(new Uint8Array(12));
            const encoded = new TextEncoder().encode(text);
            const encrypted = await window.crypto.subtle.encrypt(
                { name: "AES-GCM", iv: iv },
                key,
                encoded
            );
            
            const exportedKey = await window.crypto.subtle.exportKey("raw", key);
            const keyBase64 = btoa(String.fromCharCode(...new Uint8Array(exportedKey)));
            const ivBase64 = btoa(String.fromCharCode(...iv));
            const encryptedBase64 = btoa(String.fromCharCode(...new Uint8Array(encrypted)));
            
            return {
                data: encryptedBase64 + "." + ivBase64,
                key: keyBase64.replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/, '')
            };
        }

        // Initial render
        renderPreview();

        editor.addEventListener('input', (e) => {
            renderPreview();
            updateCounter();
            
            // Ronin Pulse Effect
            cursorGlow.style.opacity = '0.4';
            setTimeout(() => cursorGlow.style.opacity = '0', 100);
        });

        // Mouse tracking for Ronin focus
        editor.addEventListener('mousemove', (e) => {
            const rect = editor.getBoundingClientRect();
            editor.style.setProperty('--x', (e.clientX - rect.left) + 'px');
            editor.style.setProperty('--y', (e.clientY - rect.top) + 'px');
            
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });

        function renderPreview() {
            const rawMarkdown = editor.value;
            const rawHtml = marked.parse(rawMarkdown || '_Start your Zen journey..._');
            const cleanHtml = DOMPurify.sanitize(rawHtml);
            preview.innerHTML = cleanHtml;
            // High-fidelity syntax trigger
            preview.querySelectorAll('pre code').forEach((el) => {
                hljs.highlightElement(el);
            });
        }

        function updateCounter() {
            const len = editor.value.length;
            charCounter.innerText = \`\${len} / 1800\`;
            charCounter.classList.toggle('limit', len >= 1750);
        }

        publishBtn.addEventListener('click', async () => {
            const content = editor.value.trim();
            if (!content) return;
            
            publishBtn.disabled = true;
            publishBtn.innerText = 'ENCRYPTING...';

            try {
                // Client-side Encryption
                const { data, key } = await encryptContent(content);
                const tags = tagsInput.value.split(',').map(t => t.trim()).filter(t => t);

                const response = await fetch('/yaiba/publish', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content: data, tags })
                });

                if (response.ok) {
                    const result = await response.json();
                    showSuccessModal(result.id, key);
                } else {
                    const err = await response.json();
                    alert(err.error || 'Publish failed');
                    publishBtn.disabled = false;
                    publishBtn.innerText = 'PUBLISH';
                }
            } catch (err) {
                console.error(err);
                publishBtn.disabled = false;
                publishBtn.innerText = 'PUBLISH';
            }
        });

        function showSuccessModal(id, key) {
            const url = window.location.origin + '/y/' + id + '#' + key;
            document.getElementById('final-link').innerText = url;
            document.getElementById('success-modal').classList.add('show');

            const copyBtn = document.getElementById('modal-copy-btn');
            copyBtn.onclick = () => {
                navigator.clipboard.writeText(url);
                copyBtn.innerText = 'COPIED!';
                setTimeout(() => copyBtn.innerText = 'COPY', 2000);
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

        /* CUSTOM SCROLLBAR: Tactical Neon */
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
        ::-webkit-scrollbar-thumb { 
            background: rgba(34, 197, 94, 0.2); 
            border-radius: 4px; 
            border: 1px solid rgba(34, 197, 94, 0.1);
        }
        ::-webkit-scrollbar-thumb:hover { background: rgba(34, 197, 94, 0.4); }

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

        .status-badge {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 5px;
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

        .secure-lock {
            font-size: 0.65rem;
            color: var(--accent);
            text-transform: uppercase;
            display: flex;
            align-items: center;
            gap: 4px;
        }

        /* Markdown Preview Styling */
        #content {
            font-size: 1.1rem;
            line-height: 1.7;
        }
        #content h1, #content h2, #content h3 {
            font-family: var(--font-brand);
            color: var(--text-main); /* Changed to white */
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
            font-size: 1rem; /* Increased font size */
        }
        #content pre {
            background: rgba(0,0,0,0.8);
            border: 1px solid rgba(255,255,255,0.1);
            padding: 1rem;
            border-radius: 8px;
            overflow-x: auto;
            margin-bottom: 1em;
        }
        #content pre code { background: transparent; padding: 0; font-size: 1rem; } /* Increased font size */

        /* Tactical Fluid Images */
        #content img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            border: 1px solid rgba(255,255,255,0.1);
            margin: 1rem 0;
        }

        #content blockquote {
            border-left: 4px solid var(--accent);
            padding-left: 1rem;
            color: var(--text-dim);
            margin-bottom: 1em;
            font-style: italic;
        }
        #content ul, #content ol { margin-bottom: 1em; padding-left: 2rem; }

        /* Tactical Checkboxes */
        #content input[type="checkbox"] {
            -webkit-appearance: none;
            appearance: none;
            width: 1.2rem;
            height: 1.2rem;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 4px;
            cursor: pointer;
            vertical-align: middle;
            margin-right: 10px;
            position: relative;
            transition: all 0.2s ease;
        }
        #content input[type="checkbox"]:checked {
            background: var(--accent);
            border-color: var(--accent);
            box-shadow: 0 0 8px rgba(34, 197, 94, 0.4);
        }
        #content input[type="checkbox"]:checked::after {
            content: '✓';
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            color: #000;
            font-size: 0.8rem;
            font-weight: 900;
        }

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

        /* PRINT OPTIMIZATION FOR VIEW PAGE */
        @media print {
            .grid-bg, .footer, .secure-lock, .expiry-badge { display: none !important; }
            html, body { background: #fff !important; color: #000 !important; height: auto !important; overflow: visible !important; padding: 0 !important; }
            .container { background: #fff !important; border: none !important; box-shadow: none !important; max-width: 100% !important; padding: 0 !important; margin: 0 !important; position: static !important; }
            #content { color: #000 !important; font-size: 12pt !important; overflow: visible !important; }
            #content h1, #content h2, #content h3 { color: #000 !important; border-bottom: 2px solid #000; }
            #content pre { background: #f5f5f5 !important; border: 1px solid #ddd !important; color: #000 !important; white-space: pre-wrap !important; }
            #content input[type="checkbox"]:checked { background: #000 !important; }
        }

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
            <div class="status-badge">
                <div class="expiry-badge">Expires in 3 Days</div>
                <div class="secure-lock">🔒 Zero-Knowledge Storage</div>
            </div>
        </div>

        <div id="content">Decrypting Shadow Node...</div>

        <div class="footer">
            <div style="margin-bottom: 1rem;">
                <button onclick="window.print()" style="background:transparent; color:var(--accent); border:1px solid var(--accent); padding:4px 12px; border-radius:4px; font-family:var(--font-mono); font-size:0.7rem; cursor:pointer; text-transform:uppercase;">[ Print / Save PDF ]</button>
            </div>
            <a href="/yaiba">[ Forged via YAIBA ]</a>
        </div>
    </div>

    <div id="raw-data"></div>

    <script>
        /* SHADOW PERSISTENCE: AES-GCM Decryption Core */
        async function decryptContent(encryptedData, keyBase64) {
            try {
                const parts = encryptedData.split('.');
                const encrypted = Uint8Array.from(atob(parts[0]), c => c.charCodeAt(0));
                const iv = Uint8Array.from(atob(parts[1]), c => c.charCodeAt(0));
                
                // Normalizing base64 from URL fragment
                const normalizedKey = keyBase64.replace(/-/g, '+').replace(/_/g, '/');
                const keyRaw = Uint8Array.from(atob(normalizedKey), c => c.charCodeAt(0));
                
                const key = await window.crypto.subtle.importKey(
                    "raw",
                    keyRaw,
                    { name: "AES-GCM" },
                    false,
                    ["decrypt"]
                );

                const decrypted = await window.crypto.subtle.decrypt(
                    { name: "AES-GCM", iv: iv },
                    key,
                    encrypted
                );

                return new TextDecoder().decode(decrypted);
            } catch (e) {
                console.error(e);
                return null;
            }
        }

        document.addEventListener('DOMContentLoaded', async () => {
            const rawDataEl = document.getElementById('raw-data');
            const hash = window.location.hash.substring(1);
            
            if (!hash) {
                document.getElementById('content').innerHTML = '<div style="color:#ef4444">ERROR: Decryption key missing from URL. This note cannot be read without the fragment key.</div>';
                return;
            }

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

                    // Decrypt Content
                    const decrypted = await decryptContent(data.content, hash);
                    if (decrypted) {
                        const rawHtml = marked.parse(decrypted);
                        const cleanHtml = DOMPurify.sanitize(rawHtml);
                        const contentEl = document.getElementById('content');
                        contentEl.innerHTML = cleanHtml;
                        // High-fidelity syntax trigger
                        contentEl.querySelectorAll('pre code').forEach((el) => {
                            hljs.highlightElement(el);
                        });
                    } else {
                        document.getElementById('content').innerHTML = '<div style="color:#ef4444">ERROR: Decryption failed. The key in your link may be incorrect or corrupted.</div>';
                    }
                } catch (e) {
                    document.getElementById('content').innerText = 'Error loading note data.';
                }
            }
        });
    </script>
</body>
</html>`;