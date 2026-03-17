import { PUNCHY_PORTAL_HTML } from './portal';

export const ARES_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ARES | AI Marketing Idea Generator | PUNCHY.ME</title>
    <link rel="canonical" href="https://punchy.me/ares" />
    <meta name="description" content="ARES generates marketing ideas with AI-curated images, PAS copy, and color palettes. Powered by Mistral AI.">
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🎯%3C/text%3E%3C/svg%3E">

    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://punchy.me/ares">
    <meta property="og:title" content="ARES | AI Marketing Idea Generator | PUNCHY.ME">
    <meta property="og:description" content="Transform product descriptions into marketing gold. AI-generated images, copy, and color palettes in seconds.">
    <meta property="og:image" content="https://punchy.me/og-images/og-image-ares.webp">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="ARES | AI Marketing Idea Generator">
    <meta name="twitter:description" content="Transform product descriptions into marketing gold with AI-generated images, copy, and color palettes.">
    <meta name="twitter:image" content="https://punchy.me/og-images/og-image-ares.webp">

    <!-- JSON-LD Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "ARES Marketing Idea Generator",
      "operatingSystem": "Any",
      "applicationCategory": "MarketingApplication",
      "url": "https://punchy.me/ares",
      "description": "AI-powered marketing idea generator. Creates visual marketing panels with images, PAS copy, and color palettes.",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
    </script>

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
        
        html, body { height: 100%; background-color: #000; }

        body {
            color: var(--text-main);
            font-family: var(--font-mono);
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
            overflow-y: auto;
            overflow-x: hidden;
            text-align: center;
            position: relative;
            padding: 0;
        }

        .bg-image {
            position: fixed;
            inset: 0;
            background: linear-gradient(135deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%);
            z-index: -2;
        }
        .bg-overlay {
            position: fixed;
            inset: 0;
            background: radial-gradient(ellipse at 30% 20%, rgba(34, 197, 94, 0.06) 0%, transparent 50%),
                        radial-gradient(ellipse at 70% 80%, rgba(139, 92, 246, 0.04) 0%, transparent 50%);
            z-index: -1;
        }

        .scan-line {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100px;
            background: linear-gradient(to bottom, transparent, rgba(34, 197, 94, 0.08), transparent);
            border-bottom: 1px solid rgba(34, 197, 94, 0.15);
            z-index: 9999;
            animation: scan 4s linear infinite;
            pointer-events: none;
        }

        @keyframes scan {
            0% { transform: translateY(-100px); }
            100% { transform: translateY(100vh); }
        }
        
        .container { 
            z-index: 10; 
            padding: 5rem 2rem 2rem; 
            position: relative; 
            max-width: 1200px; 
            width: 100%;
            flex-grow: 1;
        }
        
        .title-container {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1.5rem;
            margin-bottom: 1.5rem;
        }

        h1 {
            font-family: var(--font-brand); font-size: clamp(3rem, 10vw, 90px); font-weight: 400;
            line-height: 0.85;
            color: var(--text-main);
            letter-spacing: -3px;
            text-transform: uppercase;
            animation: main-glitch 5s infinite;
        }

        @keyframes main-glitch {
            0%, 80%, 100% { transform: skew(0deg); text-shadow: none; }
            81% { transform: skew(1.5deg); text-shadow: 1px 0 #ff00ff; }
            82% { transform: skew(-1.5deg); text-shadow: -1px 0 #00ffff; }
            83% { transform: skew(0deg); text-shadow: none; }
        }

        .beta-badge {
            background: var(--accent);
            color: #000;
            font-size: 0.75rem;
            font-weight: 900;
            padding: 4px 10px;
            border-radius: 6px;
            font-family: var(--font-mono);
            box-shadow: 0 0 15px rgba(34, 197, 94, 0.5);
            animation: pulse 2s infinite alternate;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        @keyframes pulse {
            0% { transform: scale(1); opacity: 0.85; }
            100% { transform: scale(1.05); opacity: 1; }
        }

        .desc {
            color: var(--text-dim);
            font-size: 0.95rem;
            line-height: 1.6;
            margin-bottom: 0.5rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }

        .ai-badge {
            display: inline-block;
            background: var(--accent);
            color: #000;
            font-size: 0.6rem;
            font-weight: 900;
            padding: 2px 6px;
            border-radius: 4px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-left: 0.5rem;
        }

        .panel {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 2.5rem;
            border-radius: 24px;
            transition: all 0.3s ease;
            text-align: left;
        }
        .panel:hover {
            border-color: rgba(34, 197, 94, 0.3);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }

        .input-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
            margin-bottom: 1.5rem;
        }

        @media (min-width: 700px) {
            .input-grid { grid-template-columns: 1fr 1fr; }
        }

        label { 
            color: var(--text-dim); 
            font-size: 0.75rem; 
            text-transform: uppercase; 
            font-weight: 700; 
            letter-spacing: 1px; 
            margin-bottom: 0.75rem; 
            display: block; 
        }

        input, textarea {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 1rem 1.2rem;
            border-radius: 12px;
            color: var(--text-main);
            font-family: var(--font-mono);
            width: 100%;
            outline: none;
            transition: all 0.2s;
        }
        input:focus, textarea:focus {
            border-color: var(--accent);
            background: rgba(255, 255, 255, 0.08);
            box-shadow: 0 0 10px rgba(34, 197, 94, 0.1);
        }
        textarea {
            min-height: 100px;
            resize: vertical;
        }

        .btn-forge {
            margin-top: 0.5rem;
            background: var(--accent);
            color: #000;
            border: none;
            padding: 1.1rem;
            border-radius: 12px;
            font-weight: 900;
            width: 100%;
            cursor: pointer;
            text-transform: uppercase;
            font-family: var(--font-mono);
            letter-spacing: 1px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 0 10px rgba(34, 197, 94, 0.2);
        }
        .btn-forge:hover {
            transform: scale(1.02);
            background: var(--accent-hover);
            box-shadow: 0 0 25px rgba(34, 197, 94, 0.5);
        }
        .btn-forge:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }

        .terminal-log {
            margin-top: 1.5rem;
            background: rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(34, 197, 94, 0.15);
            border-radius: 12px;
            padding: 1.25rem;
            font-size: 0.8rem;
            color: var(--accent);
            display: none;
            text-align: left;
            line-height: 1.8;
        }

        /* Results Grid */
        .results-container {
            display: none;
            margin-top: 3rem;
        }
        .results-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        .results-header h2 {
            font-family: var(--font-brand);
            font-size: 1.5rem;
            color: var(--accent);
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .results-header p {
            color: var(--text-dim);
            font-size: 0.85rem;
            margin-top: 0.5rem;
        }

        .panels-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
        }

        @media (min-width: 900px) {
            .panels-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .marketing-panel {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            overflow: hidden;
            transition: all 0.3s ease;
        }
        .marketing-panel:hover {
            border-color: var(--accent);
            transform: translateY(-4px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        }

        .panel-image {
            width: 100%;
            height: 220px;
            object-fit: cover;
            background: #111;
        }

        .panel-content {
            padding: 1.5rem;
        }

        .panel-section-title {
            color: var(--accent);
            font-size: 0.7rem;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 0.75rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .copy-section {
            margin-bottom: 1.25rem;
        }
        .copy-part {
            margin-bottom: 0.75rem;
        }
        .copy-label {
            color: var(--text-dim);
            font-size: 0.65rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 0.25rem;
        }
        .copy-text {
            color: var(--text-main);
            font-size: 0.85rem;
            line-height: 1.5;
        }

        .color-palette {
            display: flex;
            gap: 0.5rem;
            margin-top: 1rem;
        }
        .color-swatch {
            flex: 1;
            height: 36px;
            border-radius: 6px;
            position: relative;
            transition: transform 0.2s ease;
        }
        .color-swatch:hover {
            transform: scale(1.1);
        }
        .color-hex {
            position: absolute;
            bottom: -20px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 0.6rem;
            color: var(--text-dim);
            white-space: nowrap;
            opacity: 0;
            transition: opacity 0.2s;
        }
        .color-swatch:hover .color-hex {
            opacity: 1;
        }

        .keyword-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-top: 1rem;
        }
        .keyword-tag {
            background: rgba(34, 197, 94, 0.15);
            border: 1px solid rgba(34, 197, 94, 0.3);
            color: var(--accent);
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 0.7rem;
            font-weight: 600;
        }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up {
            animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
    </style>
</head>
<body>
    ${PUNCHY_PORTAL_HTML}
    <div class="bg-image"></div>
    <div class="bg-overlay"></div>
    <div class="scan-line"></div>
    
    <div class="container">
        <div class="title-container">
            <h1>ARES</h1>
            <span class="beta-badge">BETA</span>
        </div>
        
        <p class="desc">The God of Marketing Ideas. AI-generated visual campaigns with images, PAS copy, and color palettes.</p>

        <div class="panel" style="max-width: 800px; margin: 2rem auto 0;">
            <div style="display: none;"><input type="text" id="hp_field" tabindex="-1" autocomplete="off"></div>
            <div class="input-grid">
                <div>
                    <label>Product Description<span class="ai-badge">AI</span></label>
                    <textarea id="product" placeholder="e.g., A smart water bottle that tracks hydration and glows to remind you to drink water" maxlength="500"></textarea>
                </div>
                <div>
                    <label>Target Customer<span class="ai-badge">AI</span></label>
                    <input type="text" id="customer" placeholder="e.g., Health-conscious millennials, busy professionals" maxlength="200">
                </div>
            </div>
            <button class="btn-forge" id="forge-btn">Generate Marketing Ideas</button>
            
            <div class="terminal-log" id="log"></div>
        </div>

        <div class="results-container" id="results">
            <div class="results-header">
                <h2>Campaign Panels</h2>
                <p id="results-subtitle"></p>
                <div class="keyword-tags" id="keywords"></div>
            </div>
            <div class="panels-grid" id="panels"></div>
        </div>
    </div>

    <script>
        const forgeBtn = document.getElementById('forge-btn');
        const log = document.getElementById('log');
        const results = document.getElementById('results');
        const panelsContainer = document.getElementById('panels');
        const keywordsContainer = document.getElementById('keywords');
        const resultsSubtitle = document.getElementById('results-subtitle');

        forgeBtn.onclick = async () => {
            const product = document.getElementById('product').value.trim();
            const customer = document.getElementById('customer').value.trim();

            if (!product || !customer) {
                alert('Please provide both product description and target customer.');
                return;
            }

            if (product.length < 20) {
                alert('Product description is too short. Provide more details.');
                return;
            }

            forgeBtn.disabled = true;
            forgeBtn.innerText = 'GENERATING...';
            log.style.display = 'block';
            results.style.display = 'none';
            log.innerHTML = '';

            const messages = [
                '> INITIALIZING ARES AI...',
                '> EXTRACTING KEYWORDS...',
                '> SEARCHING UNSPLASH...',
                '> GENERATING PAS COPY...',
                '> EXTRACTING COLOR PALETTES...',
                '> ASSEMBLING CAMPAIGN PANELS...'
            ];

            let i = 0;
            const logInterval = setInterval(() => {
                if (i < messages.length) {
                    const line = document.createElement('div');
                    line.innerText = messages[i];
                    log.appendChild(line);
                    i++;
                }
            }, 600);

            try {
                const hp_field = document.getElementById('hp_field').value;
                const res = await fetch('/ares/forge', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ product, customer, hp_field })
                });

                if (res.ok) {
                    const data = await res.json();
                    clearInterval(logInterval);
                    log.style.display = 'none';
                    renderResults(data);
                } else {
                    const err = await res.json();
                    clearInterval(logInterval);
                    log.style.display = 'none';
                    alert('Generation failed: ' + (err.error || 'Unknown error'));
                }
            } catch (err) {
                clearInterval(logInterval);
                log.style.display = 'none';
                alert('Network error: ' + err.message);
            } finally {
                forgeBtn.innerText = 'Generate Marketing Ideas';
                forgeBtn.disabled = false;
            }
        };

        function renderResults(data) {
            results.style.display = 'block';
            resultsSubtitle.textContent = 'Product: ' + data.product.substring(0, 50) + (data.product.length > 50 ? '...' : '');
            
            // Keywords
            keywordsContainer.innerHTML = '';
            data.keywords.forEach(kw => {
                const tag = document.createElement('span');
                tag.className = 'keyword-tag';
                tag.textContent = kw;
                keywordsContainer.appendChild(tag);
            });

            // Panels
            panelsContainer.innerHTML = '';
            data.panels.forEach((panel, idx) => {
                const panelEl = document.createElement('div');
                panelEl.className = 'marketing-panel fade-in-up';
                panelEl.style.animationDelay = (idx * 0.15) + 's';

                let html = '<img class="panel-image" src="' + panel.thumbUrl + '" alt="Marketing image" loading="lazy">';
                html += '<div class="panel-content">';
                
                // Copy section
                html += '<div class="copy-section">';
                html += '<div class="panel-section-title">📝 PAS Copy</div>';
                html += '<div class="copy-part"><div class="copy-label">Problem</div><div class="copy-text">' + escapeHtml(panel.copy.problem) + '</div></div>';
                html += '<div class="copy-part"><div class="copy-label">Agitate</div><div class="copy-text">' + escapeHtml(panel.copy.agitate) + '</div></div>';
                html += '<div class="copy-part"><div class="copy-label">Solution</div><div class="copy-text">' + escapeHtml(panel.copy.solution) + '</div></div>';
                html += '</div>';

                // Color palette
                html += '<div class="panel-section-title">🎨 Color Palette</div>';
                html += '<div class="color-palette">';
                panel.colors.forEach(color => {
                    html += '<div class="color-swatch" style="background-color: ' + color + ';"><span class="color-hex">' + color + '</span></div>';
                });
                html += '</div>';

                html += '</div>';
                panelEl.innerHTML = html;
                panelsContainer.appendChild(panelEl);
            });

            results.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        function escapeHtml(str) {
            return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        }
    </script>
</body>
</html>`;
