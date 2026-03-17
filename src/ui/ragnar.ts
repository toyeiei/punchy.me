import { PUNCHY_PORTAL_HTML } from './portal';

export const RAGNAR_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RAGNAR | Legendary Slide Forge | PUNCHY.ME</title>
    <link rel="canonical" href="https://punchy.me/ragnar" />
    <meta name="description" content="RAGNAR AI Slide Forge: Transform your strategic vision into elite 6-slide presentations in seconds. Powered by Mistral 24B.">
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🛡️%3C/text%3E%3C/svg%3E">

    <!-- Open Graph / Social -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://punchy.me/ragnar">
    <meta property="og:title" content="RAGNAR | Legendary AI Slide Forge | PUNCHY.ME">
    <meta property="og:description" content="Transform your strategic vision into elite 6-slide presentations in seconds. Powered by Mistral 24B AI.">
    <meta property="og:image" content="https://punchy.me/og-images/og-image-ragnar.webp">

        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="RAGNAR | Legendary AI Slide Forge | PUNCHY.ME">
        <meta name="twitter:description" content="Transform your strategic vision into elite 6-slide presentations in seconds. Powered by Mistral 24B AI.">
        <meta name="twitter:image" content="https://punchy.me/og-images/og-image-ragnar.webp">

    <!-- JSON-LD Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "RAGNAR AI Slide Forge",
      "operatingSystem": "Any",
      "applicationCategory": "PresentationApplication",
      "url": "https://punchy.me/ragnar",
      "description": "AI-powered strategic presentation generator. Creates elite 6-slide decks using Mistral 24B for professional impact.",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
    </script>

    <link href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --accent: #22c55e;
            --accent-hover: #4ade80;
            --text-main: #f8fafc;
            --text-dim: #94a3b8;
            --font-brand: 'Bitcount Prop Double', cursive;
            --font-mono: 'JetBrains Mono', monospace;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            background-color: #000;
            color: var(--text-main);
            font-family: var(--font-mono);
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
            overflow-x: hidden;
            padding: 10vh 2rem;
        }

        /* Background image + cinematic overlay */
        .bg-image {
            position: fixed;
            inset: 0;
            background: url('/backgrounds/ragnar.webp') center / cover no-repeat;
            z-index: -2;
        }
        .bg-overlay {
            position: fixed;
            inset: 0;
            background: linear-gradient(
                160deg,
                rgba(0, 0, 0, 0.80) 0%,
                rgba(0, 0, 0, 0.55) 45%,
                rgba(0, 0, 0, 0.78) 100%
            );
            z-index: -1;
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
            text-shadow: 0 2px 30px rgba(0, 0, 0, 0.8);
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
            box-shadow: 0 0 15px rgba(34, 197, 94, 0.5);
        }

        .desc {
            color: var(--text-dim);
            font-size: 1rem;
            margin-bottom: 3rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            line-height: 1.6;
            text-shadow: 0 1px 8px rgba(0, 0, 0, 0.9);
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
        }

        .char-counter {
            font-size: 0.75rem;
            color: var(--text-dim);
            margin-top: 0.5rem;
            text-align: right;
        }
        .char-counter.warning { color: #f59e0b; }
        .char-counter.error { color: #ef4444; }

        .panel {
            background: rgba(0, 0, 0, 0.55);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.10);
            padding: 3rem;
            border-radius: 24px;
            text-align: left;
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .panel:hover {
            border-color: rgba(34, 197, 94, 0.4);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
        }

        .input-group { margin-bottom: 2rem; }

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
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.10);
            border-radius: 12px;
            padding: 1rem 1.2rem;
            color: var(--text-main);
            font-family: var(--font-mono);
            outline: none;
            transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }

        input:focus, textarea:focus {
            border-color: var(--accent);
            background: rgba(255, 255, 255, 0.09);
            box-shadow: 0 0 12px rgba(34, 197, 94, 0.12);
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
            transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
            margin-top: 1rem;
        }

        .btn-forge:hover:not(:disabled) {
            background: var(--accent-hover);
            transform: translateY(-2px);
            box-shadow: 0 10px 24px rgba(34, 197, 94, 0.35);
        }

        .btn-forge:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .terminal-log {
            margin-top: 2rem;
            background: rgba(0, 0, 0, 0.6);
            border: 1px solid rgba(34, 197, 94, 0.15);
            border-radius: 12px;
            padding: 1.5rem;
            font-size: 0.85rem;
            color: var(--accent);
            display: none;
            text-align: left;
            line-height: 1.8;
        }

        .log-line { white-space: nowrap; }

        .success-box {
            display: none;
            margin-top: 2rem;
            animation: fadeIn 0.5s ease forwards;
        }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

        .result-link {
            display: block;
            background: var(--accent);
            color: #000;
            padding: 1.2rem;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 900;
            margin-bottom: 1rem;
            transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
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

        .processing-notice {
            display: none;
            background: rgba(34, 197, 94, 0.08);
            border: 1px solid rgba(34, 197, 94, 0.3);
            border-radius: 8px;
            padding: 0.75rem 1rem;
            margin-top: 1rem;
            font-size: 0.85rem;
            color: var(--accent);
            text-align: center;
        }
    </style>
</head>
<body>
    ${PUNCHY_PORTAL_HTML}
    <div class="bg-image"></div>
    <div class="bg-overlay"></div>

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
