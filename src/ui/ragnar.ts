import { PUNCHY_PORTAL_HTML } from './portal';

export const RAGNAR_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RAGNAR | Legendary Slide Forge | PUNCHY.ME</title>
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🛡️%3C/text%3E%3C/svg%3E">
    <link href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg: #000000;
            --accent: #22c55e;
            --accent-hover: #4ade80;
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
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
            overflow-x: hidden;
            padding: 10vh 2rem;
        }

        .container { 
            z-index: 10; 
            max-width: 800px; 
            width: 100%;
            text-align: center;
        }
        
        .title-container {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        h1 {
            font-family: var(--font-brand); 
            font-size: clamp(3rem, 12vw, 100px); 
            font-weight: 400;
            line-height: 0.8;
            letter-spacing: -3px;
            text-transform: uppercase;
        }

        .beta-badge {
            background: var(--accent);
            color: #000;
            font-size: 0.8rem;
            font-weight: 900;
            padding: 4px 10px;
            border-radius: 6px;
            text-transform: uppercase;
            letter-spacing: 1px;
            box-shadow: 0 0 15px rgba(34, 197, 94, 0.6);
            animation: pulse 2s infinite alternate;
        }

        @keyframes pulse {
            0% { transform: scale(1); opacity: 0.8; }
            100% { transform: scale(1.05); opacity: 1; }
        }

        .desc {
            color: var(--text-dim);
            font-size: 1rem;
            margin-bottom: 3rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            line-height: 1.6;
        }

        .ai-badge {
            display: inline-block;
            background: var(--accent);
            color: #000;
            font-size: 0.65rem;
            font-weight: 900;
            padding: 3px 8px;
            border-radius: 4px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-left: 0.5rem;
            box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
        }

        .char-counter {
            font-size: 0.75rem;
            color: var(--text-dim);
            margin-top: 0.5rem;
            text-align: right;
        }

        .char-counter.warning {
            color: #f59e0b;
        }

        .char-counter.error {
            color: #ef4444;
        }

        .panel {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 3rem;
            border-radius: 24px;
            text-align: left;
            transition: all 0.3s ease;
        }

        .panel:hover {
            border-color: var(--accent);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .input-group {
            margin-bottom: 2rem;
        }

        label {
            display: block;
            color: var(--text-dim);
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 0.75rem;
        }

        input, textarea {
            width: 100%;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 1rem 1.2rem;
            color: var(--text-main);
            font-family: var(--font-mono);
            outline: none;
            transition: all 0.2s;
        }

        input:focus, textarea:focus {
            border-color: var(--accent);
            background: rgba(255, 255, 255, 0.08);
            box-shadow: 0 0 10px rgba(34, 197, 94, 0.1);
        }

        textarea {
            min-height: 120px;
            resize: vertical;
        }

        .btn-forge {
            width: 100%;
            background: var(--accent);
            color: #000;
            border: none;
            padding: 1.2rem;
            border-radius: 12px;
            font-weight: 900;
            font-size: 1.1rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            cursor: pointer;
            font-family: var(--font-mono);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            margin-top: 1rem;
        }

        .btn-forge:hover:not(:disabled) {
            background: var(--accent-hover);
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(34, 197, 94, 0.3);
        }

        .btn-forge:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .terminal-log {
            margin-top: 2rem;
            background: rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            padding: 1.5rem;
            font-size: 0.85rem;
            color: var(--accent);
            display: none;
            text-align: left;
            line-height: 1.8;
        }

        .log-line {
            overflow: hidden;
            white-space: nowrap;
            border-right: 2px solid var(--accent);
            width: fit-content;
            animation: typing 2s steps(40, end), blink .75s step-end infinite;
        }

        @keyframes typing { from { width: 0 } to { width: 100% } }
        @keyframes blink { from, to { border-color: transparent } 50% { border-color: var(--accent); } }

        .success-box {
            display: none;
            margin-top: 2rem;
            animation: fadeIn 0.5s ease forwards;
        }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .result-link {
            display: block;
            background: var(--accent);
            color: #000;
            padding: 1.2rem;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 900;
            margin-bottom: 1rem;
            transition: all 0.3s;
            text-align: center;
            font-size: 1rem;
            letter-spacing: 1px;
            text-transform: uppercase;
        }

        .result-link:hover {
            background: var(--accent-hover);
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(34, 197, 94, 0.3);
        }

        .grid-bg {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background-image: 
                linear-gradient(rgba(34, 197, 94, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.05) 1px, transparent 1px);
            background-size: 50px 50px;
            z-index: -1;
            animation: gridMove 20s linear infinite;
        }

        @keyframes gridMove {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
        }

        .scanline {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                to bottom,
                transparent 0%,
                rgba(34, 197, 94, 0.03) 50%,
                transparent 100%
            );
            background-size: 100% 4px;
            animation: scanlineMove 8s linear infinite;
            pointer-events: none;
            z-index: 1;
        }

        @keyframes scanlineMove {
            0% { background-position: 0 0; }
            100% { background-position: 0 100vh; }
        }

        .processing-notice {
            display: none;
            background: rgba(34, 197, 94, 0.1);
            border: 1px solid var(--accent);
            border-radius: 8px;
            padding: 0.75rem 1rem;
            margin-top: 1rem;
            font-size: 0.85rem;
            color: var(--accent);
            text-align: center;
            animation: pulseNotice 2s ease-in-out infinite;
        }

        @keyframes pulseNotice {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
        }
    </style>
</head>
<body>
    <div class="grid-bg"></div>
    <div class="scanline"></div>
    ${PUNCHY_PORTAL_HTML}

    <div class="container">
        <div class="title-container">
            <h1>RAGNAR</h1>
            <span class="beta-badge">BETA</span>
        </div>
        <p class="desc">The Legendary Slide Forge. Ragnar transforms your strategic vision into an elite 6-slide presentation in seconds.</p>

        <div class="panel">
            <div class="input-group">
                <label>Presentation Title</label>
                <input type="text" id="title" placeholder="e.g., The Future of Decentralized Intelligence">
            </div>
            <div class="input-group">
                <label>Target Audience</label>
                <input type="text" id="audience" placeholder="e.g., Tech Investors, Board of Directors">
            </div>
            <div class="input-group">
                <label>Presentation Details (The Core Mission)<span class="ai-badge">AI</span></label>
                <textarea id="details" placeholder="Describe the mission, the key problems, and the ultimate resolution..." maxlength="250"></textarea>
                <div class="char-counter" id="char-counter">0 / 250 characters</div>
            </div>
            <button class="btn-forge" id="forge-btn">Forge Presentation</button>
            <div class="processing-notice" id="processing-notice">
                ⚡ AI Processing... This typically takes 10-15 seconds
            </div>

            <div class="terminal-log" id="log"></div>

            <div class="success-box" id="success">
                <p style="margin-bottom: 1.5rem; color: var(--text-dim);">THE DECK IS FORGED. OPEN THE GATES:</p>
                <a href="#" class="result-link" id="slide-link" target="_blank">VIEW PRESENTATION</a>
                <p style="font-size: 0.75rem; color: var(--text-dim);">Tip: Press 'P' for Presenter View or print to PDF in the browser.</p>
            </div>
        </div>
    </div>

    <script>
        const forgeBtn = document.getElementById('forge-btn');
        const log = document.getElementById('log');
        const success = document.getElementById('success');
        const slideLink = document.getElementById('slide-link');

        forgeBtn.onclick = async () => {
            const title = document.getElementById('title').value.trim();
            const audience = document.getElementById('audience').value.trim();
            const details = document.getElementById('details').value.trim();
            const processingNotice = document.getElementById('processing-notice');

            if (!title || !details) {
                alert('The King requires a Title and Details to forge a deck.');
                return;
            }

            forgeBtn.disabled = true;
            success.style.display = 'none';
            processingNotice.style.display = 'block';
            log.style.display = 'block';
            log.innerHTML = '';

            const messages = [
                '> SUMMONING RAGNAR AI...',
                '> PARSING STRATEGIC INPUTS...',
                '> FORGING 6-SLIDE TACTICAL DECK...',
                '> INJECTING REVEAL.JS CORE...',
                '> FINALIZING PRESENTATION ASSETS...'
            ];

            let i = 0;
            const logInterval = setInterval(() => {
                if (i < messages.length) {
                    const line = document.createElement('div');
                    line.className = 'log-line';
                    line.innerText = messages[i];
                    log.appendChild(line);
                    i++;
                } else {
                    clearInterval(logInterval);
                }
            }, 800);

            try {
                const res = await fetch('/ragnar/forge', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, audience, details })
                });

                if (res.ok) {
                    const { id } = await res.json();
                    clearInterval(logInterval);
                    processingNotice.style.display = 'none';
                    log.style.display = 'none';
                    success.style.display = 'block';
                    slideLink.href = '/ragnar/slide/' + id;
                } else {
                    const err = await res.json();
                    alert('FORGE FAILED: ' + (err.error || 'The gods were silent.'));
                    forgeBtn.disabled = false;
                    clearInterval(logInterval);
                    processingNotice.style.display = 'none';
                    log.style.display = 'none';
                }
            } catch (err) {
                alert('NETWORK STRIKE FAILED: ' + err.message);
                forgeBtn.disabled = false;
                clearInterval(logInterval);
                processingNotice.style.display = 'none';
            }
        };

        // Character counter for details field
        const detailsField = document.getElementById('details');
        const charCounter = document.getElementById('char-counter');

        detailsField.addEventListener('input', () => {
            const length = detailsField.value.length;
            charCounter.textContent = \`\${length} / 250 characters\`;
            
            // Update styling based on length
            charCounter.classList.remove('warning', 'error');
            if (length > 250) {
                charCounter.classList.add('error');
            } else if (length > 200) {
                charCounter.classList.add('warning');
            }
        });
    </script>
</body>
</html>`;
