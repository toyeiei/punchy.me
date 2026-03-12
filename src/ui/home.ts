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
      "softwareVersion": "2.9",
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
    <link href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
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
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            overflow-x: hidden;
            position: relative;
            padding: 4rem 0;
        }

        .pixel-bg {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            z-index: 1;
            pointer-events: none;
            overflow: hidden;
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

        .container {
            width: 90%;
            max-width: 800px;
            text-align: center;
            z-index: 10;
            position: relative;
        }

        h1 {
            font-family: var(--font-brand);
            font-size: clamp(4rem, 15vw, 120px);
            line-height: 1;
            margin-bottom: 2rem;
            color: var(--text-main);
            letter-spacing: -2px;
            text-transform: uppercase;
            position: relative;
            animation: main-glitch 5s infinite;
            will-change: transform, opacity;
            transform: translateZ(0);
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

        /* Command Center Suite Grid */
        .suite-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
            margin-top: 2rem;
        }

        @media (min-width: 640px) {
            .suite-grid {
                grid-template-columns: 1fr 1fr;
            }
        }

        .feature-card {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 20px;
            padding: 2rem;
            text-decoration: none;
            color: var(--text-main);
            transition: all 0.3s ease;
            text-align: left;
            position: relative;
            overflow: hidden;
        }

        .feature-card:hover {
            background: rgba(34, 197, 94, 0.05);
            border-color: var(--accent);
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
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

        .success-icon {
            width: 80px; height: 80px;
            background: var(--accent);
            border-radius: 50%;
            display: flex; justify-content: center; align-items: center;
            margin: 0 auto 1.5rem;
            animation: pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        @keyframes pop { 0% { transform: scale(0); } 100% { transform: scale(1); } }

        .success-icon svg { width: 40px; height: 40px; color: #052e16; }

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

        .footer {
            position: fixed;
            bottom: 1.5rem;
            right: 1.5rem;
            font-size: 0.8rem;
            color: var(--text-dim);
            z-index: 20;
            opacity: 0.6;
            transition: opacity 0.2s;
        }
        .footer:hover { opacity: 1; }
    </style>
</head>
<body>
    <div class="pixel-bg" id="pixel-bg"></div>
    <div class="container">
        <h1>PUNCHY.ME</h1>
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

        <!-- Command Center: Ecosystem Suite -->
        <div class="suite-grid">
            <a href="/bazuka" class="feature-card">
                <span class="feature-icon">[ 👤 ]</span>
                <div class="feature-title">BAZUKA</div>
                <div class="feature-tagline">Instant Digital Identity. Professional cards that explode with style.</div>
            </a>
            <a href="/anakin" class="feature-card">
                <span class="feature-icon">⚡</span>
                <div class="feature-title">ANAKIN</div>
                <div class="feature-tagline">Elite AI Resumes. Forged by Llama 3 for career-winning impact.</div>
            </a>
        </div>
    </div>

    <div class="footer">
        Built with ⚡ by Toy & Gemini CLI
    </div>

    <div id="modal-overlay">
        <div class="modal">
            <div class="success-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h2>PUNCHED!</h2>
            <p style="color: var(--text-dim); margin-top: 0.5rem;">Your short link is ready.</p>
            <div class="result-container">
                <a href="#" id="short-url-result" class="result-link" target="_blank"></a>
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
        
        let isUserInitiated = false;
        let turnstileTimeoutId = null;
        let cachedToken = null;

        function resetSubmitBtn() {
            submitBtn.disabled = false;
            submitBtn.innerText = 'Get Short Link';
            isUserInitiated = false;
            if (turnstileTimeoutId) {
                clearTimeout(turnstileTimeoutId);
                turnstileTimeoutId = null;
            }
        }

        function pretriggerTurnstile() {
            if (window.turnstile && !cachedToken && !isUserInitiated) {
                try { window.turnstile.execute(); } catch (e) {}
            }
        }

        urlInput.addEventListener('input', pretriggerTurnstile, { once: true });
        submitBtn.addEventListener('mouseenter', pretriggerTurnstile);

        window.onTurnstileSuccess = (token) => {
            cachedToken = token;
            if (isUserInitiated) {
                if (turnstileTimeoutId) { clearTimeout(turnstileTimeoutId); turnstileTimeoutId = null; }
                executeShorten(token);
            }
        };

        window.onTurnstileError = () => { if (isUserInitiated) executeShorten(); };

        form.onsubmit = async (e) => {
            e.preventDefault();
            if (!urlInput.value || !urlInput.checkValidity()) { urlInput.reportValidity(); return; }

            const suggestedId = Math.random().toString(36).substring(2, 8);
            const optimisticUrl = window.location.origin + '/' + suggestedId;
            
            submitBtn.disabled = true;
            submitBtn.innerText = 'PUNCHING...';
            isUserInitiated = true;

            if (cachedToken) {
                executeShorten(cachedToken, suggestedId);
            } else if (window.turnstile) {
                turnstileTimeoutId = setTimeout(() => { if (isUserInitiated) executeShorten('', suggestedId); }, 4000);
                try { window.turnstile.execute(); } catch (err) { executeShorten('', suggestedId); }
            } else {
                executeShorten('', suggestedId);
            }
        };

        async function executeShorten(turnstileToken = '', suggestedId = '') {
            let url = urlInput.value.trim();
            if (url && !url.startsWith('http')) url = 'https://' + url;

            try {
                const response = await fetch('/shorten', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url, suggestedId, 'cf-turnstile-response': turnstileToken })
                });

                if (response.ok) {
                    const data = await response.json();
                    
                    // SMART WAIT: Tiny 300ms delay before showing modal to ensure KV breathes
                    setTimeout(() => {
                        const finalShortUrl = window.location.origin + '/' + data.id;
                        resultLink.innerText = finalShortUrl;
                        resultLink.href = finalShortUrl;
                        modalOverlay.style.display = 'flex';
                        setTimeout(() => modalOverlay.classList.add('show'), 10);
                        cachedToken = null;
                        if (window.turnstile) window.turnstile.reset();
                    }, 300);
                } else {
                    const errorData = await response.json();
                    alert(errorData.error || 'Error punching URL.');
                    resetSubmitBtn();
                }
            } catch (err) {
                alert('Network error.');
                resetSubmitBtn();
            } finally {
                // Submit button resets after modal is shown or error occurs
            }
        }

        copyBtn.onclick = () => {
            navigator.clipboard.writeText(resultLink.innerText).then(() => {
                const originalContent = copyBtn.innerHTML;
                copyBtn.innerHTML = '<span style="color: var(--accent); font-size: 0.8rem; font-family: var(--font-mono);">DONE!</span>';
                setTimeout(() => copyBtn.innerHTML = originalContent, 2000);
            });
        };

        function closeModal() {
            modalOverlay.classList.remove('show');
            setTimeout(() => { 
                modalOverlay.style.display = 'none'; 
                urlInput.value = ''; 
                resetSubmitBtn();
            }, 300);
        }

        closeBtn.onclick = closeModal;

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
