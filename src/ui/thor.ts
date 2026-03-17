import { PUNCHY_PORTAL_HTML } from './portal';

export const THOR_UI_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>THOR | Web Intelligence Engine | PUNCHY.ME</title>
    <link rel="canonical" href="https://punchy.me/thor" />
    <meta name="description" content="THOR Web Intelligence: One-click web page analysis. Extract SEO data, content structure, and AI-powered insights instantly.">
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E⚡%3C/text%3E%3C/svg%3E">

    <!-- Open Graph / Social -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://punchy.me/thor">
    <meta property="og:title" content="THOR | Web Intelligence Engine | PUNCHY.ME">
    <meta property="og:description" content="One-click web page analysis. Extract SEO data, content structure, and AI-powered insights instantly.">
    <meta property="og:image" content="https://punchy.me/og-images/og-image-thor.webp">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="THOR | Web Intelligence Engine | PUNCHY.ME">
    <meta name="twitter:description" content="One-click web page analysis. Extract SEO data, content structure, and AI-powered insights instantly.">
    <meta name="twitter:image" content="https://punchy.me/og-images/og-image-thor.webp">

    <!-- JSON-LD Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "THOR Web Intelligence",
      "operatingSystem": "Any",
      "applicationCategory": "UtilitiesApplication",
      "url": "https://punchy.me/thor",
      "description": "AI-powered web intelligence engine. Extracts SEO data, content structure, and generates actionable insights from any URL.",
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
            background: linear-gradient(135deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%);
            z-index: -2;
        }
        .bg-overlay {
            position: fixed;
            inset: 0;
            background: radial-gradient(ellipse at top, rgba(34, 197, 94, 0.08) 0%, transparent 50%);
            z-index: -1;
        }

        /* Scan line effect */
        .scan-line {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100px;
            background: linear-gradient(to bottom, transparent, rgba(34, 197, 94, 0.05), transparent);
            border-bottom: 1px solid rgba(34, 197, 94, 0.1);
            z-index: 0;
            animation: scan 6s linear infinite;
            pointer-events: none;
        }

        @keyframes scan {
            0% { transform: translateY(-100px); }
            100% { transform: translateY(100vh); }
        }

        .container {
            z-index: 10;
            max-width: 900px;
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
        }

        .quote-box {
            margin-bottom: 3rem;
            border-left: 2px solid var(--accent);
            padding: 0.75rem 1.5rem;
            text-align: left;
            background: rgba(34, 197, 94, 0.03);
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }

        .quote-text {
            color: var(--text-main);
            font-size: 0.95rem;
            font-style: italic;
            line-height: 1.5;
            margin-bottom: 0.5rem;
        }

        .quote-author {
            color: var(--accent);
            font-weight: 700;
            text-transform: uppercase;
            font-size: 0.75rem;
            letter-spacing: 1px;
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

        .thor-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
            width: 100%;
        }

        @media (min-width: 900px) {
            .thor-grid { grid-template-columns: 1fr 1fr; }
        }

        .panel {
            background: rgba(0, 0, 0, 0.55);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.10);
            padding: 2.5rem;
            border-radius: 24px;
            text-align: left;
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .panel:hover {
            border-color: rgba(34, 197, 94, 0.4);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
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

        input {
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

        input:focus {
            border-color: var(--accent);
            background: rgba(255, 255, 255, 0.09);
            box-shadow: 0 0 12px rgba(34, 197, 94, 0.12);
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

        .terminal-log {
            margin-top: 1.5rem;
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

        /* Intelligence Output */
        .intel-output {
            color: var(--text-dim);
            text-align: center;
            padding-top: 4rem;
        }

        .intel-output.active {
            padding-top: 0;
            text-align: left;
        }

        .intel-block {
            margin-bottom: 1.5rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            padding-bottom: 1.5rem;
        }

        .intel-title {
            color: var(--accent);
            font-size: 0.8rem;
            font-weight: 900;
            margin-bottom: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .intel-content {
            color: var(--text-main);
            font-size: 0.95rem;
            line-height: 1.6;
        }

        .summary-box {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 1.25rem;
            border-radius: 12px;
            font-size: 0.9rem;
            line-height: 1.7;
            color: var(--text-main);
        }

        .stat-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }

        .stat-item { }

        .stat-label {
            font-size: 0.65rem;
            color: var(--text-dim);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 0.25rem;
        }

        .stat-value {
            font-size: 1rem;
            font-weight: 600;
            color: var(--text-main);
        }

        .topic-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-top: 1rem;
        }

        .topic-tag {
            background: rgba(34, 197, 94, 0.15);
            color: var(--accent);
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        /* Inline metrics style */
        .metrics-line {
            display: flex;
            flex-wrap: wrap;
            gap: 1.25rem;
            font-size: 0.85rem;
        }

        .metric {
            color: var(--text-dim);
        }

        .metric-label {
            color: var(--text-dim);
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .metric-val {
            color: var(--text-main);
            font-weight: 600;
        }

        .topics-inline, .entities-inline {
            color: var(--text-main);
            font-size: 0.9rem;
            line-height: 1.5;
        }

        .audience-text {
            color: var(--text-main);
            font-size: 0.9rem;
            line-height: 1.5;
        }

        /* Source header styles */
        .source-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem 1rem;
            background: rgba(34, 197, 94, 0.08);
            border: 1px solid rgba(34, 197, 94, 0.2);
            border-radius: 8px;
        }

        .source-domain {
            font-size: 1rem;
            font-weight: 700;
            color: var(--accent);
            word-break: break-all;
        }

        .source-link {
            font-size: 0.75rem;
            color: var(--text-dim);
            text-decoration: none;
            white-space: nowrap;
            padding-left: 1rem;
        }

        .source-link:hover {
            color: var(--accent);
        }

        .og-score {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .og-bar {
            flex: 1;
            height: 8px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            overflow: hidden;
        }

        .og-fill {
            height: 100%;
            background: var(--accent);
            transition: width 0.5s ease;
        }

        .og-value {
            font-weight: 700;
            font-size: 1.1rem;
            color: var(--accent);
            min-width: 60px;
            text-align: right;
        }

        .download-btn {
            display: inline-block;
            margin-top: 1.5rem;
            padding: 0.8rem 1.5rem;
            background: transparent;
            border: 1px solid var(--accent);
            color: var(--accent);
            text-decoration: none;
            font-weight: 700;
            font-size: 0.85rem;
            border-radius: 8px;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: all 0.2s ease;
        }

        .download-btn:hover {
            background: rgba(34, 197, 94, 0.1);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(34, 197, 94, 0.2);
        }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up {
            animation: fadeInUp 0.5s ease forwards;
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
            <h1>THOR</h1>
            <span class="beta-badge">BETA</span>
        </div>

        <p class="desc">The Web Intelligence Engine. One-click analysis transforms any URL into actionable insights.</p>

        <div class="quote-box">
            <p class="quote-text">"Knowledge is power. Intelligence is the ability to use it."</p>
            <p class="quote-author">— THOR, God of Thunder & Wisdom</p>
        </div>

        <div class="thor-grid">
            <div class="panel">
                <label>Target URL <span class="ai-badge">AI</span></label>
                <input type="url" id="target-url" placeholder="https://example.com" required>
                <button class="btn-forge" id="forge-btn">Forge Intelligence</button>
                <div class="processing-notice" id="processing-notice">
                    ⚡ Extracting & Analyzing... This takes 5-10 seconds
                </div>
                <div class="terminal-log" id="terminal-log"></div>
            </div>

            <div class="panel">
                <div class="intel-output" id="intel-output">
                    <div style="font-size: 2.5rem; margin-bottom: 1rem;">⚡</div>
                    Awaiting Target URL...
                </div>
            </div>
        </div>
    </div>

    <script>
        const urlInput = document.getElementById('target-url');
        const forgeBtn = document.getElementById('forge-btn');
        const processingNotice = document.getElementById('processing-notice');
        const terminalLog = document.getElementById('terminal-log');
        const intelOutput = document.getElementById('intel-output');

        forgeBtn.addEventListener('click', async () => {
            const url = urlInput.value.trim();
            if (!url) {
                alert('Enter a target URL to analyze.');
                return;
            }

            forgeBtn.disabled = true;
            forgeBtn.textContent = 'FORGING...';
            processingNotice.style.display = 'block';
            terminalLog.style.display = 'block';
            terminalLog.innerHTML = '';
            intelOutput.classList.remove('active');
            intelOutput.innerHTML = '<div style="font-size: 2.5rem; margin-bottom: 1rem;">⚡</div> Analyzing...';

            const messages = [
                '> INITIALIZING BROWSER RENDERING...',
                '> EXTRACTING PAGE CONTENT...',
                '> PARSING SEO METADATA...',
                '> ANALYZING WITH MISTRAL AI...',
                '> FORGING INTELLIGENCE REPORT...'
            ];

            let i = 0;
            const logInterval = setInterval(() => {
                if (i < messages.length) {
                    const line = document.createElement('div');
                    line.className = 'log-line';
                    line.innerText = messages[i];
                    terminalLog.appendChild(line);
                    i++;
                }
            }, 800);

            try {
                const res = await fetch('/thor/forge', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url })
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Forge failed');

                clearInterval(logInterval);
                processingNotice.style.display = 'none';
                terminalLog.style.display = 'none';

                renderIntelligence(data);
            } catch (err) {
                clearInterval(logInterval);
                alert('Forge failed: ' + err.message);
                processingNotice.style.display = 'none';
                terminalLog.style.display = 'none';
            } finally {
                forgeBtn.disabled = false;
                forgeBtn.textContent = 'FORGE INTELLIGENCE';
            }
        });

        function renderIntelligence(data) {
            const intel = data.intelligence;
            intelOutput.classList.add('active', 'fade-in-up');

            // Extract domain from URL
            let domain = '';
            try {
                const urlObj = new URL(data.url);
                domain = urlObj.hostname;
            } catch (e) {
                domain = data.url;
            }

            let html = '';

            // Source header with domain
            html += '<div class="intel-block" style="margin-bottom: 1.25rem;">';
            html += '<div class="source-header">';
            html += '<div class="source-domain">' + escapeHtml(domain) + '</div>';
            html += '<a href="' + escapeHtml(data.url) + '" target="_blank" class="source-link">Visit Source ↗</a>';
            html += '</div></div>';

            // Summary - clean and prominent
            html += '<div class="intel-block" style="border-bottom: 1px solid rgba(34, 197, 94, 0.2); padding-bottom: 1.5rem; margin-bottom: 1.5rem;">';
            html += '<div class="intel-title" style="font-size: 0.7rem; margin-bottom: 0.5rem;">SUMMARY</div>';
            html += '<div class="summary-box" style="background: transparent; border: none; padding: 0; font-size: 0.95rem;">' + escapeHtml(intel.content.summary) + '</div>';
            html += '</div>';

            // Key Metrics - compact inline format
            html += '<div class="intel-block" style="margin-bottom: 1.25rem;">';
            html += '<div class="intel-title" style="font-size: 0.7rem;">KEY METRICS</div>';
            html += '<div class="metrics-line">';
            html += '<span class="metric"><span class="metric-label">Content Type:</span> <span class="metric-val">' + escapeHtml(intel.content.contentType) + '</span></span>';
            html += '<span class="metric"><span class="metric-label">Word Count:</span> <span class="metric-val">~' + intel.content.wordCount.toLocaleString() + '</span></span>';
            html += '<span class="metric"><span class="metric-label">Reading Time:</span> <span class="metric-val">~' + intel.content.readingTime + ' min</span></span>';
            html += '</div>';
            html += '<div class="metrics-line" style="margin-top: 0.5rem;">';
            html += '<span class="metric"><span class="metric-label">Structure:</span> <span class="metric-val">' + intel.structure.h1Count + ' H1, ' + intel.structure.h2Count + ' H2, ' + intel.structure.h3Count + ' H3</span></span>';
            html += '<span class="metric"><span class="metric-label">Links:</span> <span class="metric-val">' + intel.structure.linkCount + '</span></span>';
            html += '<span class="metric"><span class="metric-label">Images:</span> <span class="metric-val">' + intel.structure.imageCount + '</span></span>';
            html += '</div></div>';

            // Topics - inline tags
            html += '<div class="intel-block" style="margin-bottom: 1.25rem;">';
            html += '<div class="intel-title" style="font-size: 0.7rem;">TOPICS EXTRACTED</div>';
            html += '<div class="topics-inline">' + intel.content.topics.map(function(t) { return escapeHtml(t); }).join(' • ') + '</div>';
            html += '</div>';

            // Target Audience
            html += '<div class="intel-block" style="margin-bottom: 1.25rem;">';
            html += '<div class="intel-title" style="font-size: 0.7rem;">TARGET AUDIENCE</div>';
            html += '<div class="audience-text">' + escapeHtml(intel.content.targetAudience) + '</div>';
            html += '</div>';

            // Key Entities (if any)
            if (intel.content.keyEntities && intel.content.keyEntities.length > 0) {
                html += '<div class="intel-block" style="margin-bottom: 1.25rem;">';
                html += '<div class="intel-title" style="font-size: 0.7rem;">KEY ENTITIES</div>';
                html += '<div class="entities-inline">' + intel.content.keyEntities.slice(0, 8).map(function(e) { return escapeHtml(e); }).join(' • ') + '</div>';
                html += '</div>';
            }

            // SEO & Technical - compact
            html += '<div class="intel-block" style="margin-bottom: 1.25rem;">';
            html += '<div class="intel-title" style="font-size: 0.7rem;">TECHNICAL SIGNALS</div>';
            html += '<div class="metrics-line">';
            html += '<span class="metric"><span class="metric-label">OG Score:</span> <span class="metric-val">' + intel.technical.ogScore + '/100</span></span>';
            html += '<span class="metric"><span class="metric-label">JSON-LD Schema:</span> <span class="metric-val">' + (intel.technical.hasSchema ? 'Present' : 'Not detected') + '</span></span>';
            html += '</div></div>';

            // Report ID + PDF link
            html += '<div class="intel-block" style="border-top: 1px solid rgba(34, 197, 94, 0.2); padding-top: 1.25rem; margin-bottom: 0;">';
            html += '<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">';
            html += '<div><span class="metric-label" style="font-size: 0.65rem; display: block; margin-bottom: 0.25rem;">REPORT ID</span><code style="color: var(--accent); font-size: 0.85rem;">' + data.id + '</code></div>';
            html += '<a href="/thor/pdf/' + data.id + '" class="download-btn" target="_blank" style="margin-top: 0;">Download PDF Report</a>';
            html += '</div></div>';

            intelOutput.innerHTML = html;
        }

        function escapeHtml(str) {
            if (!str) return '';
            return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
        }

        // Enter key support
        urlInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') forgeBtn.click();
        });
    </script>
</body>
</html>`;
