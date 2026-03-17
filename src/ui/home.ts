import { PUNCHY_PORTAL_HTML } from './portal';

export const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PUNCHY.ME | FREE Ultra-Fast URL Shortener & Link Brander</title>
    <meta name="description" content="Shorten long URLs for FREE with PUNCHY.ME. A high-performance, neon-glitch styled link shortener built for speed, style, and unlimited free links.">
    <meta name="keywords" content="free URL shortener, link shortener, shorten link, branded links, fast redirection, PUNCHY.ME">
    <link rel="canonical" href="https://punchy.me/" />
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%23000000' /%3E%3Cg transform='rotate(15, 50, 50)'%3E%3Cpath d='M35 25 H55 C65 25 75 32 75 45 C75 58 65 65 55 65 H45 V80' stroke='%2322c55e' stroke-width='10' stroke-linecap='round' stroke-linejoin='round' fill='none' /%3E%3Cpath d='M45 45 H55' stroke='%2322c55e' stroke-width='10' stroke-linecap='round' fill='none' /%3E%3C/g%3E%3C/svg%3E">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://punchy.me/">
    <meta property="og:title" content="PUNCHY.ME | FREE Ultra-Fast URL Shortener">
    <meta property="og:description" content="Instant URL shortening for FREE. High-impact links built for speed and style on Cloudflare Edge.">
    <meta property="og:image" content="https://punchy.me/og-image.webp">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://punchy.me/">
    <meta property="twitter:title" content="PUNCHY.ME | FREE Ultra-Fast URL Shortener">
    <meta property="twitter:description" content="Instant URL shortening for FREE. High-impact links built for speed and style on Cloudflare Edge.">
    <meta property="twitter:image" content="https://punchy.me/og-image.webp">

    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "PUNCHY.ME",
      "url": "https://punchy.me/",
      "description": "A FREE, ultra-fast, and easy-to-use URL shortener. Shorten your long links instantly with impact on the Cloudflare Edge.",
      "applicationCategory": "Utility",
      "applicationSubCategory": "URL Shortener",
      "operatingSystem": "Web",
      "softwareVersion": "5.0",
      "author": {
        "@type": "Person",
        "name": "Kasidis Satangmongkol",
        "url": "https://datarockie.com"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
    </script>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
    <style>
        :root {
            --bg: #000000;
            --card-bg: #111111;
            --accent: #22c55e;
            --accent-hover: #16a34a;
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
            min-height: 100svh;
            overflow-x: hidden;
            overflow-y: auto;
            position: relative;
            padding: 0;
            margin: 0;
        }

        .hero-section {
            width: 100%;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 2rem 1.5rem 0;
            z-index: 10;
        }

        .container {
            width: 90%;
            max-width: 800px;
            text-align: center;
            position: relative;
        }

        .feature-section {
            width: 100%;
            max-width: 1200px;
            padding: 0 1.5rem clamp(1.5rem, 4vh, 3rem);
            z-index: 10;
        }

        @media (max-width: 640px) {
            body { height: auto; overflow-y: auto; }
            .hero-section { min-height: 100svh; }
        }

        .pixel-bg {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            z-index: 1;
            pointer-events: none;
            overflow: hidden;
        }

        .grid-bg {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background-image: 
                linear-gradient(rgba(34, 197, 94, 0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.08) 1px, transparent 1px);
            background-size: 40px 40px;
            z-index: 0;
            pointer-events: none;
        }

        .pixel {
            position: absolute;
            width: 3px; height: 3px;
            background: rgba(255, 255, 255, 0.4);
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
            animation: drift var(--duration) linear infinite;
            top: var(--top); left: -10px;
        }

        .pixel.green { background: var(--accent); box-shadow: 0 0 5px var(--accent); opacity: 0.6; }

        @keyframes drift {
            0% { transform: translateX(0); opacity: 0; }
            5% { opacity: 1; }
            95% { opacity: 1; }
            100% { transform: translateX(calc(100vw + 20px)); opacity: 0; }
        }

        h1 {
            font-family: var(--font-brand);
            font-size: clamp(4rem, 15vw, 120px);
            line-height: 0.8;
            margin-bottom: 2rem;
            color: var(--text-main);
            letter-spacing: -3px;
            text-transform: uppercase;
            position: relative;
            animation: main-glitch 5s infinite;
            will-change: transform, opacity;
            transform: translateZ(0);
            font-weight: 400;
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        @keyframes main-glitch {
            0%, 80%, 100% { transform: skew(0deg) translateZ(0); text-shadow: none; }
            81% { transform: skew(2deg) translateZ(0); text-shadow: 1px 0 #ff00ff; }
            82% { transform: skew(-2deg) translateZ(0); text-shadow: -1px 0 #00ffff; }
            83% { transform: skew(0deg) translateZ(0); text-shadow: none; }
        }

        h1::before, h1::after {
            content: "PUNCHY.ME";
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: var(--bg);
            opacity: 0;
            will-change: transform, opacity;
            transform: translateZ(0);
        }

        h1::before { left: 1px; color: #ff00ff; animation: glitch-anim-1 4s infinite; }
        h1::after { left: -1px; color: #00ffff; animation: glitch-anim-2 3s infinite; }

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

        .input-group {
            background: var(--card-bg);
            padding: 1rem;
            border-radius: 20px;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.05);
            margin-bottom: 3rem;
        }

        @media (min-width: 640px) {
            .input-group {
                flex-direction: row;
                padding: 0.5rem;
                border-radius: 100px;
            }
        }

        input[type="url"] {
            flex: 1;
            background: transparent;
            border: none;
            padding: 1rem 1.5rem;
            color: var(--text-main);
            font-family: var(--font-mono);
            font-size: 1.1rem;
            outline: none;
        }

        input::placeholder { color: var(--text-dim); }

        button#submit-btn {
            background: var(--accent);
            color: #052e16;
            border: none;
            padding: 1rem 2rem;
            border-radius: 15px;
            font-weight: 700;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            font-family: var(--font-mono);
            text-transform: uppercase;
        }

        @media (min-width: 640px) {
            button#submit-btn { border-radius: 100px; }
        }

        button#submit-btn:hover {
            transform: scale(1.05);
            background: var(--accent-hover);
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.4);
        }

        .suite-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
            margin-top: clamp(2rem, 6vh, 4rem);
        }

        @media (min-width: 640px) {
            .suite-grid {
                grid-template-columns: 1fr 1fr;
            }
        }

        @media (min-width: 1100px) {
            .suite-grid {
                grid-template-columns: 1fr 1fr 1fr 1fr;
            }
        }

        .feature-card {
            background: rgba(255, 255, 255, 0.03);
            background-image: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), var(--bg-img);
            background-size: cover;
            background-position: center;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 20px;
            padding: 2rem;
            text-decoration: none;
            color: var(--text-main);
            transition: all 0.3s ease;
            text-align: left;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .feature-card:hover {
            background-color: rgba(34, 197, 94, 0.05);
            background-image: linear-gradient(rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)), var(--bg-img);
            border-color: var(--accent);
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .feature-card:hover .feature-tagline {
            color: #ffffff;
        }

        .feature-icon {
            font-size: 1.5rem;
            color: var(--accent);
            margin-bottom: 1rem;
            display: block;
        }

        .feature-title {
            font-family: var(--font-brand);
            font-size: 1.75rem;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-weight: 400;
            line-height: 0.8;
            text-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
        }

        .coming-soon-badge {
            background: var(--accent);
            color: #000;
            font-size: 0.6rem;
            font-weight: 900;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: var(--font-mono);
            text-transform: uppercase;
            letter-spacing: 1px;
            box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
        }

        .feature-tagline {
            color: var(--text-dim);
            font-size: 0.85rem;
            line-height: 1.5;
        }

        #modal-overlay {
            display: none;
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(15, 23, 42, 0.9);
            backdrop-filter: blur(8px);
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .modal {
            background: #000000;
            padding: 3rem 2rem;
            border-radius: 32px;
            width: 90%;
            max-width: 500px;
            text-align: center;
            position: relative;
            transform: scale(0.8);
            transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        #modal-overlay.show { opacity: 1; }
        #modal-overlay.show .modal { transform: scale(1); }

        .status-stage {
            width: 80px; height: 80px;
            margin: 0 auto 1.5rem;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .radar {
            position: absolute;
            width: 100%; height: 100%;
            border: 2px solid var(--accent);
            border-radius: 50%;
            opacity: 0.3;
            animation: radar-scan 2s linear infinite;
        }

        .radar::after {
            content: '';
            position: absolute;
            top: 50%; left: 50%;
            width: 50%; height: 2px;
            background: linear-gradient(90deg, var(--accent), transparent);
            transform-origin: left;
            animation: radar-sweep 2s linear infinite;
        }

        @keyframes radar-scan {
            0% { transform: scale(0.8); opacity: 0.5; }
            100% { transform: scale(1.2); opacity: 0; }
        }

        @keyframes radar-sweep {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .success-icon {
            width: 60px; height: 60px;
            background: var(--accent);
            border-radius: 50%;
            display: none;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 30px var(--accent);
            animation: success-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes success-pop {
            0% { transform: scale(0); }
            100% { transform: scale(1); }
        }

        .success-icon svg { width: 30px; height: 30px; color: #000; }

        .result-container {
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            margin: 1.5rem 0;
            display: flex;
            align-items: stretch;
            min-height: 56px;
            text-align: left;
            overflow: hidden;
            transition: all 0.3s ease;
        }

        .result-link {
            flex: 1;
            color: var(--accent);
            text-decoration: none;
            font-size: 1.1rem;
            font-weight: 700;
            padding: 1rem;
            display: flex;
            align-items: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-family: var(--font-mono);
        }

        .copy-btn {
            background: #1e293b;
            border: none;
            border-left: 1px solid rgba(255, 255, 255, 0.1);
            padding: 0;
            cursor: pointer;
            color: var(--text-main);
            transition: all 0.2s;
            font-family: var(--font-mono);
            width: 80px;
            flex-shrink: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .copy-btn:hover { background: #334155; }
        .close-link { display: block; margin-top: 1rem; color: var(--text-dim); text-decoration: none; font-size: 0.9rem; cursor: pointer; }
        .close-link:hover { color: var(--text-main); }

        .footer-credits {
            padding-bottom: clamp(1.5rem, 4vh, 3rem);
            width: 100%;
            font-size: 0.7rem;
            color: var(--text-dim);
            font-family: var(--font-mono);
            text-align: center;
            letter-spacing: 1px;
            opacity: 0.5;
            z-index: 10;
        }
    </style>
</head>
<body>
    <div class="grid-bg"></div>
    <div class="pixel-bg" id="pixel-bg"></div>
    ${PUNCHY_PORTAL_HTML}
    
    <section class="hero-section">
        <div class="container">
            <h1 style="margin-top: clamp(1rem, 5vh, 4rem);">PUNCHY.ME</h1>
            <form id="shorten-form">
                <div class="input-group">
                    <input type="text" name="hp_field" id="hp_field" style="display:none !important;" tabindex="-1" autocomplete="off">
                    <input type="url" id="url" placeholder="Enter your long URL here..." required>
                    <button type="submit" id="submit-btn">Get Short Link</button>
                </div>
                <div id="turnstile-container" style="display: none;">
                    <div class="cf-turnstile" data-sitekey="0x4AAAAAACpO5kHNRhLAhQOH" data-size="invisible" data-callback="onTurnstileSuccess" data-error-callback="onTurnstileError"></div>
                </div>
            </form>
        </div>
    </section>

    <section class="feature-section">
        <div class="suite-grid">
            <a href="/bazuka" class="feature-card" style="--bg-img: url('/og-images/og-image-bazuka.webp')">
                <span class="feature-icon">👤</span>
                <div class="feature-title">
                    BAZUKA
                    <span class="coming-soon-badge">BETA</span>
                </div>
                <div class="feature-tagline">Instant Digital Identity. Professional cards that explode with style.</div>
            </a>
            <a href="/anakin" class="feature-card" style="--bg-img: url('/og-images/og-image-anakin.webp')">
                <span class="feature-icon">🪨</span>
                <div class="feature-title">
                    ANAKIN
                    <span class="coming-soon-badge">BETA</span>
                </div>
                <div class="feature-tagline">Elite AI Resumes. Forged by Llama 3 for career-winning impact.</div>
            </a>
            <a href="/musashi" class="feature-card" style="--bg-img: url('/og-images/og-image-musashi.webp')">
                <span class="feature-icon">⚔️</span>
                <div class="feature-title">
                    MUSASHI
                    <span class="coming-soon-badge">BETA</span>
                </div>
                <div class="feature-tagline">AI-powered job intel and interview strike-paths.</div>
            </a>
            <a href="/odin" class="feature-card" style="--bg-img: url('/og-images/og-image-odin.webp')">
                <span class="feature-icon">🐦‍⬛</span>
                <div class="feature-title">
                    ODIN
                    <span class="coming-soon-badge">BETA</span>
                </div>
                <div class="feature-tagline">Tactical Data Command. Supreme edge-native analytics HUD.</div>
            </a>
            <a href="/yaiba" class="feature-card" style="--bg-img: url('/og-images/og-image-yaiba.webp')">
                <span class="feature-icon">✒️</span>
                <div class="feature-title">
                    YAIBA
                    <span class="coming-soon-badge">BETA</span>
                </div>
                <div class="feature-tagline">Zen Markdown Editor. Elite focus-mode writing on the edge.</div>
            </a>
            <a href="/ragnar" class="feature-card" style="--bg-img: url('/og-images/og-image-ragnar.webp')">
                <span class="feature-icon">🛡️</span>
                <div class="feature-title">
                    RAGNAR
                    <span class="coming-soon-badge">BETA</span>
                </div>
                <div class="feature-tagline">Legendary Slide Forge. Elite 10-page decks forged by AI in seconds.</div>
            </a>
            <a href="/freya" class="feature-card" style="--bg-img: url('/og-images/og-image-freya.webp')">
                <span class="feature-icon">🌠</span>
                <div class="feature-title">
                    FREYA
                    <span class="coming-soon-badge">BETA</span>
                </div>
                <div class="feature-tagline">Ultra-Fast Image Editor. Edge-native Unsplash integration.</div>
            </a>
            <a href="/thor" class="feature-card" style="--bg-img: url('/og-images/og-image-thor.webp')">
                <span class="feature-icon">⚡</span>
                <div class="feature-title">
                    THOR
                    <span class="coming-soon-badge">BETA</span>
                </div>
                <div class="feature-tagline">Web Intelligence Engine. One-click URL analysis powered by AI.</div>
            </a>
            <a href="/asgard" class="feature-card" style="--bg-img: url('/og-images/og-image-asgard.webp')" onmouseover="const l=document.createElement('link');l.rel='prefetch';l.href='/asgard';document.head.appendChild(l);this.onmouseover=null;">
                <span class="feature-icon">🌌</span>
                <div class="feature-title">
                    ASGARD
                    <span class="coming-soon-badge">NEW</span>
                </div>
                <div class="feature-tagline">The Supreme Workspace. A distraction-free desktop environment.</div>
            </a>
        </div>
    </section>

    <div class="footer-credits">
        Built with ⚡ by Toy & Gemini CLI + DROID
    </div>

    <div id="modal-overlay">
        <div class="modal">
            <div class="status-stage">
                <div class="radar" id="modal-radar"></div>
                <div class="success-icon" id="modal-success-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            </div>
            <h2 id="modal-title">PUNCHING...</h2>
            <p id="modal-subtitle" style="color: var(--text-dim); margin-top: 0.5rem;">Your short link is live.</p>
            <div class="result-container" id="result-container" style="position: relative;">
                <a href="#" id="short-url-result" class="result-link" target="_blank">forging...</a>
                <button class="copy-btn" id="copy-btn" title="Copy Link" type="button">
                    <svg style="width:20px;height:20px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                    </svg>
                </button>
            </div>
            <a class="close-link" id="close-modal-btn">Back to Home</a>
        </div>
    </div>

    <script>
        const form = document.getElementById('shorten-form');
        const submitBtn = document.getElementById('submit-btn');
        const urlInput = document.getElementById('url');
        const modalOverlay = document.getElementById('modal-overlay');
        const resultLink = document.getElementById('short-url-result');
        const copyBtn = document.getElementById('copy-btn');
        const closeBtn = document.getElementById('close-modal-btn');
        
        let cachedToken = null;

        window.onTurnstileSuccess = (token) => { cachedToken = token; executeShorten(token); };

        form.onsubmit = async (e) => {
            e.preventDefault();
            modalOverlay.style.display = 'flex';
            setTimeout(() => modalOverlay.classList.add('show'), 10);
            executeShorten(cachedToken || '');
        };

        async function executeShorten(token) {
            let url = urlInput.value.trim();
            if (url && !url.startsWith('http')) url = 'https://' + url;
            
            const radar = document.getElementById('modal-radar');
            const successIcon = document.getElementById('modal-success-icon');
            const modalTitle = document.getElementById('modal-title');

            radar.style.display = 'block';
            successIcon.style.display = 'none';
            modalTitle.innerText = 'PUNCHING...';

            try {
                const res = await fetch('/shorten', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url, 'cf-turnstile-response': token })
                });
                if (res.ok) {
                    const data = await res.json();
                    
                    // Artificial delay for animation impact
                    setTimeout(() => {
                        resultLink.innerText = window.location.origin + '/' + data.id;
                        resultLink.href = window.location.origin + '/' + data.id;
                        
                        radar.style.display = 'none';
                        successIcon.style.display = 'flex';
                        modalTitle.innerText = 'PUNCHED!';
                    }, 800);
                }
            } catch (err) { alert('Sync failed.'); }
        }

        copyBtn.onclick = () => {
            navigator.clipboard.writeText(resultLink.innerText).then(() => {
                const original = copyBtn.innerHTML;
                copyBtn.innerHTML = '<span style="color: var(--accent); font-size: 0.8rem;">DONE!</span>';
                setTimeout(() => copyBtn.innerHTML = original, 2000);
            });
        };

        closeBtn.onclick = () => {
            modalOverlay.classList.remove('show');
            setTimeout(() => { modalOverlay.style.display = 'none'; urlInput.value = ''; }, 300);
        };

        const bg = document.getElementById('pixel-bg');
        function createPixel() {
            const pixel = document.createElement('div');
            pixel.className = 'pixel';
            if (Math.random() > 0.7) pixel.classList.add('green');
            const top = Math.random() * 100;
            const duration = 5 + Math.random() * 10;
            pixel.style.setProperty('--top', top + '%');
            pixel.style.setProperty('--duration', duration + 's');
            bg.appendChild(pixel);
            setTimeout(() => pixel.remove(), duration * 1000);
        }
        setInterval(createPixel, 300);
        for(let i=0; i<20; i++) createPixel();
        </script>
        </body>
        </html>`;

        export const SYNC_ERROR_HTML = `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>NOT FOUND | PUNCHY.ME</title>
        <meta name="description" content="This link doesn't exist or has expired. Short links on PUNCHY.ME are temporary and expire after 72 hours.">
        
        <!-- Open Graph / Social -->
        <meta property="og:type" content="website">
        <meta property="og:title" content="LINK NOT FOUND | PUNCHY.ME">
        <meta property="og:description" content="This link doesn't exist or has expired. Return to PUNCHY.ME to forge a new one.">
        <meta property="og:image" content="https://punchy.me/og-image.webp">

        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="LINK NOT FOUND | PUNCHY.ME">
        <meta name="twitter:description" content="This link doesn't exist or has expired. Return to PUNCHY.ME to forge a new one.">
        <meta name="twitter:image" content="https://punchy.me/og-image.webp">

        <link href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
        <style>
        :root { --bg: #000000; --accent: #22c55e; --text: #f8fafc; --font-brand: 'Bitcount Prop Double', cursive; --font-mono: 'JetBrains Mono', monospace; }
        body { background: var(--bg); color: var(--text); font-family: var(--font-mono); display: flex; justify-content: center; align-items: center; min-height: 100vh; overflow: hidden; margin: 0; text-align: center; }
        .pixel-bg { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none; }
        .pixel { position: absolute; width: 3px; height: 3px; background: rgba(255, 255, 255, 0.4); animation: drift var(--duration) linear infinite; top: var(--top); left: -10px; }
        .pixel.green { background: var(--accent); box-shadow: 0 0 5px var(--accent); }
        .grid-bg { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-image: linear-gradient(rgba(34, 197, 94, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.08) 1px, transparent 1px); background-size: 40px 40px; z-index: 0; pointer-events: none; }
        @keyframes drift { 0% { transform: translateX(0); opacity: 0; } 5% { opacity: 1; } 100% { transform: translateX(calc(100vw + 20px)); opacity: 0; } }
        .container { z-index: 10; padding: 2rem; border: 1px solid rgba(34, 197, 94, 0.2); border-radius: 24px; background: rgba(17, 17, 17, 0.8); backdrop-filter: blur(10px); max-width: 400px; }
        h1 { font-family: var(--font-brand); color: var(--accent); font-size: 2.5rem; margin-bottom: 1rem; text-transform: uppercase; font-weight: 400; }
        p { color: #94a3b8; line-height: 1.6; font-size: 0.9rem; margin-bottom: 2rem; }
        a { color: var(--accent); text-decoration: none; font-weight: 700; }
        a:hover { text-decoration: underline; }
        </style>
        </head>
        <body>
        <div class="grid-bg"></div>
        <div class="pixel-bg" id="pixel-bg"></div>
        ${PUNCHY_PORTAL_HTML}
        <div class="container">
        <h1>404</h1>
        <p>This link doesn't exist or has expired. Short links are deleted after 72 hours.</p>
        <a href="/">← Back to PUNCHY.ME</a>
        </div>
        <script>
        const bg = document.getElementById('pixel-bg');
        function createPixel() {
            const pixel = document.createElement('div');
            pixel.className = 'pixel';
            if (Math.random() > 0.7) pixel.classList.add('green');
            const top = Math.random() * 100;
            const duration = 5 + Math.random() * 10;
            pixel.style.setProperty('--top', top + '%');
            pixel.style.setProperty('--duration', duration + 's');
            bg.appendChild(pixel);
            setTimeout(() => pixel.remove(), duration * 1000);
        }
        setInterval(createPixel, 300);
        for(let i=0; i<20; i++) createPixel();
        </script>
        </body>
        </html>`;

