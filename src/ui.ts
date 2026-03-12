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
      "softwareVersion": "1.2",
      "author": {
        "@type": "Person",
        "name": "Kasidis Satangmongkol",
        "url": "https://datarockie.com"
      },
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Kasidis Satangmongkol",
      "jobTitle": "Digital Writer",
      "worksFor": {
        "@type": "Organization",
        "name": "DataRockie"
      },
      "url": "https://datarockie.com",
      "sameAs": [
        "https://www.linkedin.com/in/kasidistoy",
        "https://punchy.me/"
      ],
      "description": "Toy is a Digital Writer at DataRockie and the creator of PUNCHY.ME, a high-performance URL shortener built on Cloudflare Workers.",
      "knowsAbout": ["Data Analysis", "Cloudflare Workers", "Content Writer"]
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
            overflow: hidden;
            position: relative;
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
            width: 3px;
            height: 3px;
            background: rgba(255, 255, 255, 0.4);
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
            animation: drift var(--duration) linear infinite;
            top: var(--top);
            left: -10px;
        }

        .pixel.green {
            background: var(--accent);
            box-shadow: 0 0 5px var(--accent);
            opacity: 0.6;
        }

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
            will-change: transform;
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

        h1::before {
            left: 1px;
            color: #ff00ff;
            animation: glitch-anim-1 4s infinite;
        }

        h1::after {
            left: -1px;
            color: #00ffff;
            animation: glitch-anim-2 3s infinite;
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

        h1:hover {
            text-shadow: 0 0 15px var(--accent);
            transition: text-shadow 0.1s ease;
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

        button#submit-btn:active { transform: scale(0.95); }

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
            width: 80px;
            height: 80px;
            background: var(--accent);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto 1.5rem;
            animation: pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        @keyframes pop {
            0% { transform: scale(0); }
            100% { transform: scale(1); }
        }

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
        .copy-btn:active { background: #0f172a; }

        .close-link {
            display: block;
            margin-top: 1rem;
            color: var(--text-dim);
            text-decoration: none;
            font-size: 0.9rem;
            cursor: pointer;
        }

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

        .seo-content {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            border: 0;
        }
    </style>
</head>
<body>
    <div class="pixel-bg" id="pixel-bg"></div>
    <div class="container">
        <h1>PUNCHY.ME</h1>
        <form id="shorten-form">
            <div class="input-group">
                <!-- Honeypot -->
                <input type="text" name="hp_field" id="hp_field" style="display:none !important;" tabindex="-1" autocomplete="off">
                
                <input type="url" id="url" placeholder="Enter your long URL here..." required>
                <button type="submit" id="submit-btn">Get Short Link</button>
            </div>
            <!-- Invisible Turnstile Container (Hidden) -->
            <div id="turnstile-container" style="display: none;">
                <div class="cf-turnstile" data-sitekey="0x4AAAAAACpO5kHNRhLAhQOH" data-size="invisible" data-callback="onTurnstileSuccess" data-error-callback="onTurnstileError"></div>
            </div>
        </form>
    </div>

    <div class="footer">
        Built with ⚡ by Toy & Gemini CLI
    </div>

    <footer class="seo-content">
        <h2>Ultra-Fast URL Shortener & Link Brander</h2>
        <p>Shorten long URLs instantly with PUNCHY.ME. Our link shortener provides fast redirection, branded links, and smart deduplication. Built on Cloudflare Workers for maximum performance and reliability. PUNCHY.ME is the best way to manage and share your links with impact.</p>
        <nav>
            <ul>
                <li><a href="https://punchy.me/">Home</a></li>
                <li><a href="https://github.com/toyeiei/punchy.me">Source Code</a></li>
            </ul>
        </nav>
    </footer>

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
                <button class="copy-btn" id="copy-btn" title="Copy Link">
                    <svg style="width:20px;height:20px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                    </svg>
                </button>
            </div>
            
            <a class="close-link" onclick="closeModal()">Back to Home</a>
        </div>
    </div>

    <script>
        const form = document.getElementById('shorten-form');
        const submitBtn = document.getElementById('submit-btn');
        const urlInput = document.getElementById('url');
        const modalOverlay = document.getElementById('modal-overlay');
        const resultLink = document.getElementById('short-url-result');
        const copyBtn = document.getElementById('copy-btn');
        
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

        // Speed Optimization: Pre-trigger Turnstile when user interacts
        function pretriggerTurnstile() {
            if (window.turnstile && !cachedToken && !isUserInitiated) {
                try {
                    window.turnstile.execute();
                } catch (e) {}
            }
        }

        urlInput.addEventListener('input', pretriggerTurnstile, { once: true });
        submitBtn.addEventListener('mouseenter', pretriggerTurnstile);

        window.onTurnstileSuccess = (token) => {
            cachedToken = token;
            if (isUserInitiated) {
                if (turnstileTimeoutId) {
                    clearTimeout(turnstileTimeoutId);
                    turnstileTimeoutId = null;
                }
                executeShorten(token);
            }
        };

        window.onTurnstileError = () => {
            console.error('Turnstile execution failed');
            if (isUserInitiated) {
                executeShorten(); // Fallback
            }
        };

        form.onsubmit = async (e) => {
            e.preventDefault();
            
            if (!urlInput.value || !urlInput.checkValidity()) {
                urlInput.reportValidity();
                return;
            }

            // OPTIMISTIC UI: Generate ID locally and show modal immediately
            const suggestedId = Math.random().toString(36).substring(2, 8);
            const optimisticUrl = window.location.origin + '/' + suggestedId;
            
            resultLink.innerText = optimisticUrl;
            resultLink.href = optimisticUrl;
            modalOverlay.style.display = 'flex';
            modalOverlay.classList.add('show');

            // If we already have a cached token, skip the delay and go instant
            if (cachedToken) {
                submitBtn.disabled = true;
                submitBtn.innerText = 'PUNCHING...';
                executeShorten(cachedToken, suggestedId);
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerText = 'PUNCHING...';
            isUserInitiated = true;

            // Safety timeout
            turnstileTimeoutId = setTimeout(() => {
                if (isUserInitiated) {
                    console.warn('Turnstile timeout, falling back');
                    executeShorten('', suggestedId);
                }
            }, 3000);

            if (window.turnstile) {
                try {
                    window.turnstile.execute();
                } catch (err) {
                    console.error('Turnstile error:', err);
                    executeShorten('', suggestedId);
                }
            } else {
                executeShorten('', suggestedId);
            }
        };

        async function executeShorten(turnstileToken = '', suggestedId = '') {
            let url = urlInput.value.trim();
            const hp_field = document.getElementById('hp_field').value;

            // Auto-prepend protocol if missing
            if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'https://' + url;
            }

            try {
                const response = await fetch('/shorten', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        url, 
                        suggestedId,
                        hp_field,
                        'cf-turnstile-response': turnstileToken 
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    const finalShortUrl = window.location.origin + '/' + data.id;
                    
                    // If the server returned a different ID (e.g. deduplication or collision)
                    // we silently update the UI.
                    if (data.id !== suggestedId) {
                        resultLink.innerText = finalShortUrl;
                        resultLink.href = finalShortUrl;
                    }
                    
                    // Clear cache for next use
                    cachedToken = null;
                    if (window.turnstile) window.turnstile.reset();
                } else {
                    const errorData = await response.json();
                    alert(errorData.error || 'Error punching URL. Try again.');
                    closeModal(); // Hide the optimistic modal if it failed
                    if (window.turnstile) window.turnstile.reset();
                    cachedToken = null;
                }
            } catch (err) {
                alert('Network error. Check your connection.');
                closeModal();
            } finally {
                resetSubmitBtn();
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
                document.getElementById('url').value = '';
            }, 300);
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });

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

export const BAZUKA_FORM_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BAZUKA | Instant Digital Business Cards</title>
    <meta name="description" content="Generate your high-impact, neon-glitch digital business card in seconds with BAZUKA. Part of the PUNCHY.ME ecosystem.">
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%23000000' /%3E%3Cg transform='rotate(15, 50, 50)'%3E%3Cpath d='M35 25 H55 C65 25 75 32 75 45 C75 58 65 65 55 65 H45 V80' stroke='%2322c55e' stroke-width='10' stroke-linecap='round' stroke-linejoin='round' fill='none' /%3E%3Cpath d='M45 45 H55' stroke='%2322c55e' stroke-width='10' stroke-linecap='round' fill='none' /%3E%3C/g%3E%3C/svg%3E">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://punchy.me/bazuka">
    <meta property="og:title" content="BAZUKA | Instant Digital Business Cards">
    <meta property="og:description" content="Create your neon-glitch digital business card. Fast, stylish, and free.">
    <meta property="og:image" content="https://punchy.me/og-image.webp">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:title" content="BAZUKA | Instant Digital Business Cards">
    <meta property="twitter:description" content="Create your neon-glitch digital business card. Fast, stylish, and free.">
    <meta property="twitter:image" content="https://punchy.me/og-image.webp">

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
            overflow: hidden;
            position: relative;
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
            width: 3px;
            height: 3px;
            background: rgba(255, 255, 255, 0.4);
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
            animation: drift var(--duration) linear infinite;
            top: var(--top);
            left: -10px;
        }

        .pixel.green {
            background: var(--accent);
            box-shadow: 0 0 5px var(--accent);
            opacity: 0.6;
        }

        @keyframes drift {
            0% { transform: translateX(0); opacity: 0; }
            5% { opacity: 1; }
            95% { opacity: 1; }
            100% { transform: translateX(calc(100vw + 20px)); opacity: 0; }
        }

        .container {
            width: 90%;
            max-width: 500px;
            text-align: center;
            z-index: 10;
            position: relative;
        }

        h1 {
            font-family: var(--font-brand);
            font-size: clamp(3rem, 10vw, 80px);
            line-height: 1;
            margin-bottom: 2rem;
            color: var(--text-main);
            letter-spacing: -2px;
            text-transform: uppercase;
            position: relative;
            animation: main-glitch 5s infinite;
            will-change: transform;
            transform: translateZ(0);
        }

        @keyframes main-glitch {
            0%, 80%, 100% { transform: skew(0deg) translateZ(0); text-shadow: none; }
            81% { transform: skew(2deg) translateZ(0); text-shadow: 1px 0 #ff00ff; }
            82% { transform: skew(-2deg) translateZ(0); text-shadow: -1px 0 #00ffff; }
            83% { transform: skew(0deg) translateZ(0); text-shadow: none; }
        }

        h1::before, h1::after {
            content: "BAZUKA";
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: var(--bg);
            opacity: 0;
            will-change: transform, opacity;
            transform: translateZ(0);
        }

        h1::before {
            left: 1px;
            color: #ff00ff;
            animation: glitch-anim-1 4s infinite;
        }

        h1::after {
            left: -1px;
            color: #00ffff;
            animation: glitch-anim-2 3s infinite;
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

        .input-group {
            background: var(--card-bg);
            padding: 2rem;
            border-radius: 20px;
            display: flex;
            flex-direction: column;
            gap: 1.2rem;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }

        input {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 1rem 1.2rem;
            border-radius: 12px;
            color: var(--text-main);
            font-family: var(--font-mono);
            outline: none;
            transition: border-color 0.2s;
            width: 100%;
        }

        input:focus { border-color: var(--accent); }

        button#bazuka-btn {
            background: var(--accent);
            color: #052e16;
            border: none;
            padding: 1.2rem;
            border-radius: 12px;
            font-weight: 700;
            cursor: pointer;
            text-transform: uppercase;
            font-family: var(--font-mono);
            transition: all 0.3s;
            position: relative;
            overflow: hidden;
            animation: bazuka-glow 2s infinite alternate;
        }

        @keyframes bazuka-glow {
            0% { box-shadow: 0 0 5px rgba(34, 197, 94, 0.2); transform: scale(1); }
            100% { box-shadow: 0 0 25px rgba(34, 197, 94, 0.6); transform: scale(1.02); }
        }

        button#bazuka-btn:hover { background: var(--accent-hover); }

        #modal-overlay {
            display: none;
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(10px);
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
            border: 1px solid rgba(255, 255, 255, 0.1);
            transform: scale(0.8);
            transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
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

        @keyframes pop {
            0% { transform: scale(0); }
            100% { transform: scale(1); }
        }

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
        .copy-btn:active { background: #0f172a; }

        h2 { font-family: var(--font-brand); font-size: 2.5rem; color: var(--text-main); margin-bottom: 0.5rem; }
        .create-another { font-family: var(--font-mono); color: var(--text-dim); background: transparent; border: none; cursor: pointer; margin-top: 1.5rem; font-size: 0.9rem; }
        .create-another:hover { color: var(--text-main); }

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
        <h1>BAZUKA</h1>
        <form id="bazuka-form">
            <div class="input-group">
                <input type="text" id="nickname" placeholder="👤 Nickname" required>
                <input type="text" id="job" placeholder="💼 Job Title" required>
                <input type="email" id="email" placeholder="📧 Email Address" required>
                <input type="url" id="website" placeholder="🌐 Website URL" required>
                <button type="submit" id="bazuka-btn">BAZUKA</button>
            </div>
            <div id="turnstile-container" style="display: none;">
                <div class="cf-turnstile" data-sitekey="0x4AAAAAACpO5kHNRhLAhQOH" data-size="invisible" data-callback="onTurnstileSuccess" data-error-callback="onTurnstileError"></div>
            </div>
        </form>
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
            <h2>CARD ARMED!</h2>
            <p style="margin: 1rem 0; color: var(--text-dim);">Your dynamic card is live for 3 days:</p>
            <div class="result-container" style="margin-top: 1.5rem;">
                <a href="#" id="result-url" class="result-link" target="_blank"></a>
                <button class="copy-btn" id="bazuka-copy-btn" title="Copy Link" type="button">
                    <svg style="width:20px;height:20px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                    </svg>
                </button>
            </div>
            <button onclick="location.reload()" class="create-another">Create Another</button>
        </div>
    </div>

    <script>
        const form = document.getElementById('bazuka-form');
        const submitBtn = document.getElementById('bazuka-btn');
        const modalOverlay = document.getElementById('modal-overlay');
        const resultUrl = document.getElementById('result-url');
        const copyBtn = document.getElementById('bazuka-copy-btn');
        let isUserInitiated = false;
        let turnstileTimeoutId = null;

        copyBtn.onclick = () => {
            navigator.clipboard.writeText(resultUrl.innerText).then(() => {
                const originalContent = copyBtn.innerHTML;
                copyBtn.innerHTML = '<span style="color: var(--accent); font-size: 0.8rem; font-weight: 700;">DONE!</span>';
                setTimeout(() => copyBtn.innerHTML = originalContent, 2000);
            });
        };

        function resetSubmitBtn() {
            submitBtn.disabled = false;
            submitBtn.innerText = 'BAZUKA';
            isUserInitiated = false;
            if (turnstileTimeoutId) {
                clearTimeout(turnstileTimeoutId);
                turnstileTimeoutId = null;
            }
        }

        window.onTurnstileSuccess = (token) => {
            if (isUserInitiated) {
                if (turnstileTimeoutId) {
                    clearTimeout(turnstileTimeoutId);
                    turnstileTimeoutId = null;
                }
                createBazuka(token);
            }
        };

        window.onTurnstileError = () => {
            if (isUserInitiated) {
                createBazuka(); // Fallback
            }
        };

        form.onsubmit = async (e) => {
            e.preventDefault();
            submitBtn.disabled = true;
            submitBtn.innerText = 'ARMING...';
            isUserInitiated = true;

            turnstileTimeoutId = setTimeout(() => {
                if (isUserInitiated) {
                    createBazuka();
                }
            }, 4000);

            if (window.turnstile) {
                try {
                    window.turnstile.execute();
                } catch (err) {
                    createBazuka();
                }
            } else {
                createBazuka();
            }
        };

        async function createBazuka(token = '') {
            const data = {
                nickname: document.getElementById('nickname').value,
                job: document.getElementById('job').value,
                email: document.getElementById('email').value,
                website: document.getElementById('website').value,
                'cf-turnstile-response': token
            };

            try {
                const response = await fetch('/bazuka', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    const result = await response.json();
                    const url = window.location.origin + '/' + result.id;
                    document.getElementById('result-url').innerText = url;
                    document.getElementById('result-url').href = url;
                    modalOverlay.style.display = 'flex';
                    setTimeout(() => modalOverlay.classList.add('show'), 10);
                } else {
                    const err = await response.json();
                    alert(err.error || 'Bazuka failed.');
                }
            } catch (err) {
                alert('Network error.');
            } finally {
                resetSubmitBtn();
            }
        }

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

export const BAZUKA_CARD_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title id="title-tag">Business Card | PUNCHY.ME</title>
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:title" id="og-title" content="Digital Business Card | PUNCHY.ME">
    <meta property="og:description" id="og-description" content="Check out my digital business card on BAZUKA.">
    <meta property="og:image" content="https://punchy.me/og-image.webp">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:title" id="twitter-title" content="Digital Business Card | PUNCHY.ME">
    <meta property="twitter:description" id="twitter-description" content="Check out my digital business card on BAZUKA.">
    <meta property="twitter:image" content="https://punchy.me/og-image.webp">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
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
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            overflow: hidden;
            position: relative;
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

        .card {
            z-index: 10;
            text-align: left;
            border-left: 4px solid var(--accent);
            padding: 2.5rem;
            background: rgba(17, 17, 17, 0.85);
            backdrop-filter: blur(15px);
            border-radius: 0 24px 24px 0;
            max-width: 95%;
            width: 440px;
            box-shadow: 20px 20px 60px rgba(0,0,0,0.6);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-left: 4px solid var(--accent);
        }

        .nickname {
            font-family: var(--font-brand);
            font-size: clamp(2rem, 10vw, 3.5rem);
            color: var(--accent);
            margin-bottom: 0.5rem;
            text-transform: uppercase;
            line-height: 1;
            word-break: break-word;
            position: relative;
            animation: main-glitch 5s infinite;
            will-change: transform;
            transform: translateZ(0);
        }

        @keyframes main-glitch {
            0%, 80%, 100% { transform: skew(0deg) translateZ(0); text-shadow: none; }
            81% { transform: skew(2deg) translateZ(0); text-shadow: 1px 0 #ff00ff; }
            82% { transform: skew(-2deg) translateZ(0); text-shadow: -1px 0 #00ffff; }
            83% { transform: skew(0deg) translateZ(0); text-shadow: none; }
        }

        .nickname::before, .nickname::after {
            content: attr(data-text);
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: transparent;
            opacity: 0;
            will-change: transform, opacity;
            transform: translateZ(0);
        }

        .nickname::before {
            left: 1px;
            color: #ff00ff;
            animation: glitch-anim-1 4s infinite;
        }

        .nickname::after {
            left: -1px;
            color: #00ffff;
            animation: glitch-anim-2 3s infinite;
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

        .job { font-size: clamp(1rem, 4vw, 1.25rem); color: var(--text-main); font-weight: 700; margin-bottom: 2rem; letter-spacing: 1px; }
        
        .info-row { margin-bottom: 1rem; display: flex; align-items: center; gap: 12px; }
        .label { color: var(--text-dim); font-size: 0.75rem; text-transform: uppercase; width: 85px; font-weight: 700; }
        .value { color: var(--text-main); font-size: 0.95rem; text-decoration: none; word-break: break-all; }
        .value:hover { color: var(--accent); }

        .footer { margin-top: 2.5rem; font-size: 0.7rem; color: var(--text-dim); border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1.2rem; }

        .brand-footer {
            position: fixed;
            bottom: 1.5rem;
            right: 1.5rem;
            font-size: 0.8rem;
            color: var(--text-dim);
            z-index: 20;
            opacity: 0.6;
        }
    </style>
</head>
<body>
    <div class="pixel-bg" id="pixel-bg"></div>
    <div class="card">
        <div class="nickname" id="card-nickname" data-text="NAME">NAME</div>
        <div class="job" id="card-job">JOB TITLE</div>
        
        <div class="info-row">
            <span class="label">Email</span>
            <a href="" class="value" id="card-email">email@example.com</a>
        </div>
        <div class="info-row">
            <span class="label">Website</span>
            <a href="" class="value" id="card-website" target="_blank"></a>
        </div>

        <div class="footer">
            Generated via PUNCHY.ME BAZUKA • Expires in 3 days
        </div>
    </div>

    <div class="brand-footer">
        Built with ⚡ by Toy & Gemini CLI
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

export const ANAKIN_FORM_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ANAKIN | AI-Powered Professional Resumes</title>
    <meta name="description" content="Generate a high-impact, AI-refined digital resume in seconds with ANAKIN. Part of the PUNCHY.ME ecosystem.">
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%23000000' /%3E%3Cg transform='rotate(15, 50, 50)'%3E%3Cpath d='M35 25 H55 C65 25 75 32 75 45 C75 58 65 65 55 65 H45 V80' stroke='%2322c55e' stroke-width='10' stroke-linecap='round' stroke-linejoin='round' fill='none' /%3E%3Cpath d='M45 45 H55' stroke='%2322c55e' stroke-width='10' stroke-linecap='round' fill='none' /%3E%3C/g%3E%3C/svg%3E">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://punchy.me/anakin">
    <meta property="og:title" content="ANAKIN | AI-Powered Professional Resumes">
    <meta property="og:description" content="Generate your professional digital resume with AI. Fast, stylish, and free.">
    <meta property="og:image" content="https://punchy.me/og-image.webp">

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
            padding: 2rem 0;
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
            max-width: 600px;
            text-align: center;
            z-index: 10;
            position: relative;
        }

        h1 {
            font-family: var(--font-brand);
            font-size: clamp(3rem, 10vw, 80px);
            line-height: 1;
            margin-bottom: 2rem;
            color: var(--text-main);
            letter-spacing: -2px;
            text-transform: uppercase;
            position: relative;
            animation: main-glitch 5s infinite;
            will-change: transform;
            transform: translateZ(0);
        }

        @keyframes main-glitch {
            0%, 80%, 100% { transform: skew(0deg) translateZ(0); text-shadow: none; }
            81% { transform: skew(2deg) translateZ(0); text-shadow: 1px 0 #ff00ff; }
            82% { transform: skew(-2deg) translateZ(0); text-shadow: -1px 0 #00ffff; }
            83% { transform: skew(0deg) translateZ(0); text-shadow: none; }
        }

        h1::before, h1::after {
            content: "ANAKIN";
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
            padding: 2.5rem;
            border-radius: 20px;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.05);
            text-align: left;
        }

        label { color: var(--text-dim); font-size: 0.75rem; text-transform: uppercase; font-weight: 700; letter-spacing: 1px; }

        input, textarea {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 1rem 1.2rem;
            border-radius: 12px;
            color: var(--text-main);
            font-family: var(--font-mono);
            outline: none;
            transition: all 0.2s;
            width: 100%;
        }

        input:focus, textarea:focus { border-color: var(--accent); background: rgba(255, 255, 255, 0.08); }

        textarea { resize: vertical; min-height: 100px; }

        button#anakin-btn {
            background: var(--accent);
            color: #052e16;
            border: none;
            padding: 1.2rem;
            border-radius: 12px;
            font-weight: 700;
            cursor: pointer;
            text-transform: uppercase;
            font-family: var(--font-mono);
            transition: all 0.3s;
            animation: anakin-glow 2s infinite alternate;
            margin-top: 1rem;
        }

        @keyframes anakin-glow {
            0% { box-shadow: 0 0 5px rgba(34, 197, 94, 0.2); transform: scale(1); }
            100% { box-shadow: 0 0 25px rgba(34, 197, 94, 0.6); transform: scale(1.02); }
        }

        button#anakin-btn:hover { background: var(--accent-hover); }
        button#anakin-btn:disabled { opacity: 0.5; cursor: not-allowed; animation: none; }

        #modal-overlay {
            display: none;
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(10px);
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
            border: 1px solid rgba(255, 255, 255, 0.1);
            transform: scale(0.8);
            transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        #modal-overlay.show { opacity: 1; }
        #modal-overlay.show .modal { transform: scale(1); }

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
        .create-another { font-family: var(--font-mono); color: var(--text-dim); background: transparent; border: none; cursor: pointer; margin-top: 1.5rem; font-size: 0.9rem; }
        .create-another:hover { color: var(--text-main); }

        .footer {
            position: fixed;
            bottom: 1.5rem;
            right: 1.5rem;
            font-size: 0.8rem;
            color: var(--text-dim);
            z-index: 20;
            opacity: 0.6;
        }
    </style>
</head>
<body>
    <div class="pixel-bg" id="pixel-bg"></div>
    <div class="container">
        <h1>ANAKIN</h1>
        <form id="anakin-form">
            <div class="input-group">
                <div>
                    <label>Full Name</label>
                    <input type="text" id="name" placeholder="Anakin Skywalker" required>
                </div>
                <div>
                    <label>Target Job Title</label>
                    <input type="text" id="job" placeholder="Jedi Knight / Sith Lord" required>
                </div>
                <div>
                    <label>Email Address</label>
                    <input type="email" id="email" placeholder="anakin@tatooine.com" required>
                </div>
                <div>
                    <label>Portfolio Website</label>
                    <input type="url" id="website" placeholder="https://force.com" required>
                </div>
                <div>
                    <label>Education (Raw Details)</label>
                    <textarea id="education" placeholder="Jedi Academy, Master Yoda's Classes..." required maxlength="500"></textarea>
                </div>
                <div>
                    <label>Skills & Achievements (Raw List)</label>
                    <textarea id="skills" placeholder="Lightsaber combat, Podracing, The Force..." required maxlength="500"></textarea>
                </div>
                <button type="submit" id="anakin-btn">GENERATE RESUME</button>
            </div>
            <div id="turnstile-container" style="display: none;">
                <div class="cf-turnstile" data-sitekey="0x4AAAAAACpO5kHNRhLAhQOH" data-size="invisible" data-callback="onTurnstileSuccess" data-error-callback="onTurnstileError"></div>
            </div>
        </form>
    </div>

    <div class="footer">
        Built with ⚡ by Toy & Gemini CLI
    </div>

    <div id="modal-overlay">
        <div class="modal">
            <h2>RESUME FORGED!</h2>
            <p style="margin: 1rem 0; color: var(--text-dim);">Your AI-powered resume is ready:</p>
            <div class="result-container">
                <a href="#" id="result-url" class="result-link" target="_blank"></a>
                <button class="copy-btn" id="anakin-copy-btn" title="Copy Link" type="button">
                    <svg style="width:20px;height:20px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                    </svg>
                </button>
            </div>
            <button onclick="location.reload()" class="create-another">Create Another</button>
        </div>
    </div>

    <script>
        const form = document.getElementById('anakin-form');
        const submitBtn = document.getElementById('anakin-btn');
        const modalOverlay = document.getElementById('modal-overlay');
        const resultUrl = document.getElementById('result-url');
        const copyBtn = document.getElementById('anakin-copy-btn');
        let isUserInitiated = false;
        let turnstileTimeoutId = null;

        copyBtn.onclick = () => {
            navigator.clipboard.writeText(resultUrl.innerText).then(() => {
                const originalContent = copyBtn.innerHTML;
                copyBtn.innerHTML = '<span style="color: var(--accent); font-size: 0.8rem; font-weight: 700;">DONE!</span>';
                setTimeout(() => copyBtn.innerHTML = originalContent, 2000);
            });
        };

        function resetSubmitBtn() {
            submitBtn.disabled = false;
            submitBtn.innerText = 'GENERATE RESUME';
            isUserInitiated = false;
            if (turnstileTimeoutId) {
                clearTimeout(turnstileTimeoutId);
                turnstileTimeoutId = null;
            }
        }

        window.onTurnstileSuccess = (token) => {
            if (isUserInitiated) {
                if (turnstileTimeoutId) {
                    clearTimeout(turnstileTimeoutId);
                    turnstileTimeoutId = null;
                }
                createAnakin(token);
            }
        };

        window.onTurnstileError = () => {
            if (isUserInitiated) createAnakin(); 
        };

        form.onsubmit = async (e) => {
            e.preventDefault();
            submitBtn.disabled = true;
            submitBtn.innerText = 'FORGING...';
            isUserInitiated = true;

            turnstileTimeoutId = setTimeout(() => {
                if (isUserInitiated) createAnakin();
            }, 6000);

            if (window.turnstile) {
                try {
                    window.turnstile.execute();
                } catch (err) {
                    createAnakin();
                }
            } else {
                createAnakin();
            }
        };

        async function createAnakin(token = '') {
            const data = {
                name: document.getElementById('name').value,
                job: document.getElementById('job').value,
                email: document.getElementById('email').value,
                website: document.getElementById('website').value,
                education: document.getElementById('education').value,
                skills: document.getElementById('skills').value,
                'cf-turnstile-response': token
            };

            try {
                const response = await fetch('/anakin', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    const result = await response.json();
                    const url = window.location.origin + '/' + result.id;
                    resultUrl.innerText = url;
                    resultUrl.href = url;
                    modalOverlay.style.display = 'flex';
                    setTimeout(() => modalOverlay.classList.add('show'), 10);
                } else {
                    const err = await response.json();
                    alert(err.error || 'Anakin failed.');
                }
            } catch (err) {
                alert('Network error.');
            } finally {
                resetSubmitBtn();
            }
        }

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

export const ANAKIN_RESUME_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title id="title-tag">Professional Resume | PUNCHY.ME</title>
    
    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:title" id="og-title" content="AI Refined Resume | PUNCHY.ME">
    <meta property="og:description" id="og-description" content="View my professional digital resume.">
    <meta property="og:image" content="https://punchy.me/og-image.webp">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
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
            display: flex;
            justify-content: center;
            align-items: flex-start;
            min-height: 100vh;
            padding: 4rem 1rem;
            line-height: 1.6;
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

        .resume-card {
            z-index: 10;
            background: rgba(17, 17, 17, 0.85);
            backdrop-filter: blur(15px);
            border-radius: 24px;
            max-width: 800px;
            width: 100%;
            padding: 4rem;
            border: 1px solid rgba(255, 255, 255, 0.05);
            box-shadow: 0 40px 100px rgba(0,0,0,0.8);
            position: relative;
            overflow: hidden;
        }

        .resume-card::before {
            content: "";
            position: absolute;
            top: 0; left: 0; width: 100%; height: 4px;
            background: linear-gradient(90deg, var(--accent), #ff00ff, #00ffff);
        }

        .header { margin-bottom: 3rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 2rem; }

        .name {
            font-family: var(--font-brand);
            font-size: clamp(2.5rem, 8vw, 4.5rem);
            color: var(--text-main);
            text-transform: uppercase;
            line-height: 1;
            margin-bottom: 0.5rem;
            position: relative;
            animation: main-glitch 5s infinite;
            will-change: transform;
            transform: translateZ(0);
        }

        @keyframes main-glitch {
            0%, 80%, 100% { transform: skew(0deg) translateZ(0); text-shadow: none; }
            81% { transform: skew(2deg) translateZ(0); text-shadow: 1px 0 #ff00ff; }
            82% { transform: skew(-2deg) translateZ(0); text-shadow: -1px 0 #00ffff; }
            83% { transform: skew(0deg) translateZ(0); text-shadow: none; }
        }

        .job-title { font-size: 1.25rem; color: var(--accent); font-weight: 700; letter-spacing: 2px; text-transform: uppercase; }

        .contact-info { display: flex; flex-wrap: wrap; gap: 1.5rem; margin-top: 1.5rem; font-size: 0.9rem; color: var(--text-dim); }
        .contact-info a { color: var(--text-main); text-decoration: none; border-bottom: 1px solid transparent; transition: border-color 0.2s; }
        .contact-info a:hover { border-color: var(--accent); color: var(--accent); }

        .section { margin-bottom: 3rem; }
        .section-title { font-size: 0.75rem; color: var(--accent); text-transform: uppercase; font-weight: 700; letter-spacing: 3px; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 1rem; }
        .section-title::after { content: ""; flex: 1; height: 1px; background: rgba(34, 197, 94, 0.2); }

        .ai-summary { font-size: 1.1rem; color: var(--text-main); font-weight: 400; line-height: 1.8; font-style: italic; border-left: 2px solid var(--accent); padding-left: 1.5rem; }

        .content-block { margin-bottom: 1.5rem; }
        .content-text { color: var(--text-main); white-space: pre-wrap; font-size: 1rem; }

        .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 1rem; }
        .skill-tag { background: rgba(255,255,255,0.05); padding: 0.5rem 1rem; border-radius: 8px; font-size: 0.85rem; border: 1px solid rgba(255,255,255,0.1); }

        .brand-footer { margin-top: 4rem; font-size: 0.75rem; color: var(--text-dim); text-align: center; }
    </style>
</head>
<body>
    <div class="pixel-bg" id="pixel-bg"></div>
    <div class="resume-card">
        <div class="header">
            <div class="name" id="res-name">ANAKIN SKYWALKER</div>
            <div class="job-title" id="res-job">JEDI KNIGHT</div>
            <div class="contact-info">
                <span id="res-email">anakin@force.com</span>
                <a href="#" id="res-website" target="_blank">PORTFOLIO</a>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Professional Summary</div>
            <div class="ai-summary" id="res-summary">
                Refining professional profile...
            </div>
        </div>

        <div class="section">
            <div class="section-title">Education</div>
            <div class="content-block">
                <div class="content-text" id="res-education">Jedi Academy</div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Skills & Expertise</div>
            <div class="content-block">
                <div class="content-text" id="res-skills">The Force, Lightsaber Combat, Podracing</div>
            </div>
        </div>

        <div class="brand-footer">
            FORGED BY ANAKIN AI • POWERED BY PUNCHY.ME
        </div>
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
