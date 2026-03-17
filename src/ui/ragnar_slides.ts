import { PUNCHY_PORTAL_HTML } from './portal';

export const RAGNAR_SLIDE_HEADER = `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{TITLE}} | RAGNAR | PUNCHY.ME</title>
    <meta name="description" content="View this AI-forged presentation deck. Professional, tactical, and edge-delivered via RAGNAR.">
    
    <!-- Open Graph / Social -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="{{TITLE}} | RAGNAR Presentation">
    <meta property="og:description" content="View this AI-forged presentation deck. Professional, tactical, and edge-delivered via RAGNAR.">
    <meta property="og:image" content="https://punchy.me/og-image.webp">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{TITLE}} | RAGNAR Presentation">
    <meta name="twitter:description" content="View this AI-forged presentation deck. Professional, tactical, and edge-delivered via RAGNAR.">
    <meta name="twitter:image" content="https://punchy.me/og-images/og-image-ragnar.webp">

    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🛡️%3C/text%3E%3C/svg%3E">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/reveal.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/theme/dracula.min.css">
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&display=swap" rel="stylesheet">
    <style>
        /* ── DARK THEME (default) ── */
        :root {
            --accent: #22c55e;
            --font-mono: 'JetBrains Mono', monospace;
            --h-size: 3.5rem;
            --p-size: 2rem;

            --bg: #000000;
            --fg: #f8fafc;
            --fg-dim: rgba(248, 250, 252, 0.35);
            --quote-glass-bg: rgba(255, 255, 255, 0.03);
            --quote-glass-border: rgba(255, 255, 255, 0.08);
            --comp-bg: rgba(255, 255, 255, 0.02);
            --comp-border: rgba(255, 255, 255, 0.10);
            --comp-red-bg: rgba(239, 68, 68, 0.05);
            --comp-green-bg: rgba(34, 197, 94, 0.05);
            --toggle-bg: rgba(255, 255, 255, 0.08);
            --toggle-border: rgba(255, 255, 255, 0.15);
            --toggle-color: #f8fafc;
        }

        /* ── LIGHT THEME ── */
        html[data-theme='light'] {
            --accent: #16a34a;
            --bg: #f1f5f9;
            --fg: #0f172a;
            --fg-dim: rgba(15, 23, 42, 0.40);
            --quote-glass-bg: rgba(0, 0, 0, 0.03);
            --quote-glass-border: rgba(0, 0, 0, 0.08);
            --comp-bg: rgba(0, 0, 0, 0.02);
            --comp-border: rgba(0, 0, 0, 0.10);
            --comp-red-bg: rgba(239, 68, 68, 0.06);
            --comp-green-bg: rgba(22, 163, 74, 0.06);
            --toggle-bg: rgba(0, 0, 0, 0.06);
            --toggle-border: rgba(0, 0, 0, 0.12);
            --toggle-color: #0f172a;
        }

        .reveal {
            background-color: var(--bg) !important;
            color: var(--fg);
            font-family: var(--font-mono);
        }

        .reveal .slides {
            width: 100%;
            height: 100%;
        }

        .reveal .slides section {
            width: 100%;
            height: 100%;
            padding: 0 !important;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            background: var(--bg) !important;
        }

        .slide-container {
            width: 100%;
            max-width: 1600px;
            margin: 0;
            padding: 100px 150px;
            text-align: left;
        }

        .reveal h1, .reveal h2, .reveal h3, .reveal h4 {
            font-family: var(--font-mono);
            text-transform: uppercase;
            letter-spacing: 2px;
            color: var(--accent) !important;
            font-weight: 800;
            text-align: left;
            margin: 0 0 2rem 0;
            line-height: 1.1;
        }

        .reveal h1, .reveal h2 {
            font-size: var(--h-size) !important;
        }

        .reveal p, .reveal li {
            font-size: var(--p-size) !important;
            line-height: 1.6 !important;
            color: var(--fg) !important;
            font-weight: 500;
            text-align: left;
            margin-bottom: 1.5rem;
        }

        .reveal ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            width: 100%;
        }

        .reveal ul li {
            position: relative;
            padding-left: 50px;
            margin-bottom: 30px;
        }

        .reveal ul li::before {
            content: '▸';
            position: absolute;
            left: 0;
            top: 0;
            color: var(--accent);
            font-weight: 700;
        }

        .reveal .hero-subtitle {
            opacity: 0.7;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: var(--fg) !important;
        }

        .reveal .quote-glass {
            background: var(--quote-glass-bg);
            backdrop-filter: blur(10px);
            border: 1px solid var(--quote-glass-border);
            border-left: 8px solid var(--accent);
            padding: 60px;
            border-radius: 4px 24px 24px 4px;
            width: 100%;
            max-width: 1200px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
            margin-top: 2rem;
        }

        .reveal .quote-text {
            font-style: italic;
            margin-bottom: 2rem !important;
        }

        .reveal .quote-author {
            font-size: 1.4rem !important;
            color: var(--accent) !important;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 4px;
            margin: 0;
        }

        .reveal .comparison-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 50px;
            margin-top: 2rem;
            width: 100%;
        }

        .reveal .comparison-box {
            background: var(--comp-bg);
            border: 3px solid var(--comp-border);
            padding: 40px;
            border-radius: 12px;
            min-height: 300px;
        }

        .reveal .box-red {
            border-color: #ef4444;
            background: var(--comp-red-bg);
        }

        .reveal .box-green {
            border-color: var(--accent);
            background: var(--comp-green-bg);
        }

        .reveal .comparison-box h4 {
            font-size: 1.4rem !important;
            letter-spacing: 3px;
            margin-bottom: 25px;
            text-align: left;
        }

        .reveal .comparison-box p {
            font-size: 1.7rem !important;
        }

        .reveal .progress { color: var(--accent); }
        .reveal .controls { color: var(--accent); }

        /* ── THEME TOGGLE BUTTON ── */
        .theme-toggle {
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 2000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            background: var(--toggle-bg);
            border: 1px solid var(--toggle-border);
            border-radius: 20px;
            padding: 6px 14px;
            font-family: var(--font-mono);
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: uppercase;
            color: var(--toggle-color);
            cursor: pointer;
            transition: background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
            backdrop-filter: blur(10px);
        }

        .theme-toggle:hover {
            border-color: var(--accent);
            box-shadow: 0 0 12px rgba(34, 197, 94, 0.2);
        }

        .theme-toggle-icon { font-size: 0.9rem; }

        /* ── PRINT ── */
        @media print {
            @page { size: 1920px 1080px; margin: 0; }
            html, body, .reveal, .reveal .slides, .reveal .slides section {
                width: 1920px !important;
                height: 1080px !important;
            }
            .theme-toggle, .punchy-portal { display: none !important; }
            .reveal h1, .reveal h2, .reveal h3 { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .reveal p, .reveal li { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
    </style>
</head>
<body>
    <button class="theme-toggle" id="theme-toggle">
        <span class="theme-toggle-icon" id="toggle-icon">☀️</span>
        <span id="toggle-label">Light</span>
    </button>
    ${PUNCHY_PORTAL_HTML}
    <div class="reveal">
        <div class="slides">
            <section>
                <div class="slide-container">
                    <h1>{{TITLE}}</h1>
                    <p style="color: var(--accent); font-weight: 700; letter-spacing: 3px;">{{AUDIENCE}}</p>
                    <div style="margin-top: 100px; font-size: 1rem; color: var(--fg-dim); text-transform: uppercase; letter-spacing: 4px;">Forged by RAGNAR AI</div>
                </div>
            </section>
`;

export const RAGNAR_SLIDE_FOOTER = `
            <section>
                <div class="slide-container">
                    <h2>VICTORY SECURED.</h2>
                    <p>The strategic objectives have been defined and the path to execution is clear.</p>
                    <p style="color: var(--accent); font-weight: 800; letter-spacing: 3px; margin-top: 2rem;">READY FOR DEPLOYMENT.</p>
                    <div style="margin-top: 100px; font-size: 1rem; color: var(--fg-dim); letter-spacing: 2px;">Built with ⚡ by PUNCHY.ME</div>
                </div>
            </section>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/reveal.min.js"></script>
    <script>
        Reveal.initialize({
            hash: true,
            center: true,
            transition: 'none',
            backgroundTransition: 'none',
            controls: true,
            progress: true,
            slideNumber: 'c/t',
            width: 1920,
            height: 1080,
            margin: 0.04,
            pdfMaxPagesPerSlide: 1,
            pdfSeparateFragments: false,
            controlsLayout: 'bottom-right',
        });

        // ── THEME TOGGLE ──
        const html = document.documentElement;
        const btn = document.getElementById('theme-toggle');
        const icon = document.getElementById('toggle-icon');
        const label = document.getElementById('toggle-label');

        function applyTheme(theme) {
            html.setAttribute('data-theme', theme);
            if (theme === 'light') {
                icon.textContent = '🌙';
                label.textContent = 'Dark';
            } else {
                icon.textContent = '☀️';
                label.textContent = 'Light';
            }
            try { localStorage.setItem('ragnar-theme', theme); } catch(e) {}
        }

        // Restore saved preference
        try {
            const saved = localStorage.getItem('ragnar-theme');
            if (saved === 'light') applyTheme('light');
        } catch(e) {}

        btn.addEventListener('click', () => {
            applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
        });

        if (window.location.search.match(/print-pdf/gi)) {
            setTimeout(() => { window.print(); }, 1000);
        }
    </script>
</body>
</html>`;
