export const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PUNCHY.ME | Ultra-Fast URL Shortener & Link Brander</title>
    <meta name="description" content="Shorten long URLs instantly with PUNCHY.ME. A high-performance, neon-glitch styled link shortener built for speed, style, and smart deduplication.">
    <meta name="keywords" content="URL shortener, link shortener, shorten link, branded links, fast redirection, PUNCHY.ME">
    <link rel="canonical" href="https://punchy.me/" />
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%23000000' /%3E%3Cg transform='rotate(15, 50, 50)'%3E%3Cpath d='M35 25 H55 C65 25 75 32 75 45 C75 58 65 65 55 65 H45 V80' stroke='%2322c55e' stroke-width='10' stroke-linecap='round' stroke-linejoin='round' fill='none' /%3E%3Cpath d='M45 45 H55' stroke='%2322c55e' stroke-width='10' stroke-linecap='round' fill='none' /%3E%3C/g%3E%3C/svg%3E">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://punchy.me/">
    <meta property="og:title" content="PUNCHY.ME | Ultra-Fast URL Shortener">
    <meta property="og:description" content="Instant URL shortening with impact. Built for speed and style on Cloudflare Edge.">
    <meta property="og:image" content="https://punchy.me/og-image.webp">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://punchy.me/">
    <meta property="twitter:title" content="PUNCHY.ME | Ultra-Fast URL Shortener">
    <meta property="twitter:description" content="Instant URL shortening with impact. Built for speed and style on Cloudflare Edge.">
    <meta property="twitter:image" content="https://punchy.me/og-image.webp">

    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "PUNCHY.ME",
      "url": "https://punchy.me/",
      "description": "A high-performance URL shortener built on Cloudflare Workers.",
      "applicationCategory": "Utility",
      "operatingSystem": "Web",
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
            overflow: hidden;
            position: relative;
        }

        /* Pixel Background Animation */
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
            animation: main-glitch 4s infinite;
        }

        @keyframes main-glitch {
            0%, 20%, 40%, 45%, 55%, 70%, 100% { transform: skew(0deg); text-shadow: 0 0 10px rgba(34, 197, 94, 0.1); }
            21% { transform: skew(2deg); text-shadow: 2px 0 0 #ff00ff, -2px 0 0 #00ffff; }
            41% { transform: skew(-2deg); text-shadow: -2px 0 0 #ff00ff, 2px 0 0 #00ffff; }
            51% { transform: skew(1deg); }
        }

        h1::before, h1::after {
            content: "PUNCHY.ME";
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: var(--bg);
            opacity: 0.5;
        }

        h1::before {
            left: 2px;
            text-shadow: -1px 0 #ff00ff;
            animation: glitch-anim 6s infinite linear alternate-reverse;
        }

        h1::after {
            left: -2px;
            text-shadow: -1px 0 #00ffff;
            animation: glitch-anim-2 3s infinite linear alternate-reverse;
        }

        @keyframes glitch-anim {
            0%, 100% { clip-path: inset(40% 0 61% 0); opacity: 0; }
            20%, 80% { clip-path: inset(92% 0 1% 0); opacity: 0.5; }
            40%, 60% { clip-path: inset(43% 0 1% 0); opacity: 0; }
        }

        @keyframes glitch-anim-2 {
            0%, 100% { clip-path: inset(24% 0 29% 0); opacity: 0; }
            50% { clip-path: inset(54% 0 21% 0); opacity: 0.5; }
        }

        h1:hover {
            text-shadow: 0 0 30px var(--accent), 0 0 60px var(--accent);
            transition: text-shadow 0.2s;
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

        /* Modal / Pop-up */
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
            padding: 1rem;
            border-radius: 12px;
            margin: 1.5rem 0;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .result-link {
            flex: 1;
            color: var(--accent);
            text-decoration: none;
            word-break: break-all;
            font-size: 1.1rem;
            font-weight: 700;
            text-align: left;
        }

        .copy-btn {
            background: #334155;
            border: none;
            padding: 8px;
            border-radius: 8px;
            cursor: pointer;
            color: var(--text-main);
            transition: background 0.2s;
        }

        .copy-btn:hover { background: #475569; }

        .close-link {
            display: block;
            margin-top: 1rem;
            color: var(--text-dim);
            text-decoration: none;
            font-size: 0.9rem;
            cursor: pointer;
        }

        .close-link:hover { color: var(--text-main); }

        /* Visible Footer */
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

        /* SEO Hidden Content */
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
                <div class="cf-turnstile" data-sitekey="0x4AAAAAACpO5kHNRhLAhQOH" data-size="invisible" data-callback="onTurnstileSuccess"></div>
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
        const modalOverlay = document.getElementById('modal-overlay');
        const resultLink = document.getElementById('short-url-result');
        const copyBtn = document.getElementById('copy-btn');
        
        // Track if the Turnstile check was triggered by a user click
        let isUserInitiated = false;

        // Global callback for invisible Turnstile
        window.onTurnstileSuccess = (token) => {
            if (isUserInitiated) {
                executeShorten(token);
                isUserInitiated = false; // Reset
            }
        };

        form.onsubmit = async (e) => {
            e.preventDefault();
            const urlInput = document.getElementById('url');
            
            // Guard: Don't execute if URL is empty or invalid
            if (!urlInput.value || !urlInput.checkValidity()) {
                urlInput.reportValidity();
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerText = 'PUNCHING...';
            isUserInitiated = true;

            // Trigger Turnstile check programmatically
            if (window.turnstile) {
                window.turnstile.execute();
            } else {
                executeShorten(); // Fallback if script didn't load
            }
        };

        async function executeShorten(turnstileToken = '') {
            const url = document.getElementById('url').value;
            const hp_field = document.getElementById('hp_field').value;

            try {
                const response = await fetch('/shorten', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        url, 
                        hp_field,
                        'cf-turnstile-response': turnstileToken 
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    const shortUrl = window.location.origin + '/' + data.id;
                    resultLink.innerText = shortUrl;
                    resultLink.href = shortUrl;
                    
                    modalOverlay.style.display = 'flex';
                    setTimeout(() => modalOverlay.classList.add('show'), 10);
                } else {
                    const errorData = await response.json();
                    alert(errorData.error || 'Error punching URL. Try again.');
                    if (window.turnstile) window.turnstile.reset();
                }
            } catch (err) {
                alert('Network error.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerText = 'Get Short Link';
            }
        }

        copyBtn.onclick = () => {
            navigator.clipboard.writeText(resultLink.innerText).then(() => {
                const originalContent = copyBtn.innerHTML;
                copyBtn.innerHTML = '<span style="color: var(--accent); font-size: 0.8rem;">DONE!</span>';
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

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });

        // Pixel Generation
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
        for(let i=0; i<20; i++) createPixel(); // Initial burst
    </script>
</body>
</html>`;

export const BAZUKA_FORM_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BAZUKA | Instant Digital Business Cards</title>
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
            animation: main-glitch 4s infinite;
        }

        @keyframes main-glitch {
            0%, 20%, 40%, 45%, 55%, 70%, 100% { transform: skew(0deg); text-shadow: 0 0 10px rgba(34, 197, 94, 0.1); }
            21% { transform: skew(2deg); text-shadow: 2px 0 0 #ff00ff, -2px 0 0 #00ffff; }
            41% { transform: skew(-2deg); text-shadow: -2px 0 0 #ff00ff, 2px 0 0 #00ffff; }
            51% { transform: skew(1deg); }
        }

        .input-group {
            background: var(--card-bg);
            padding: 2rem;
            border-radius: 20px;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }

        input {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 1rem;
            border-radius: 10px;
            color: var(--text-main);
            font-family: var(--font-mono);
            outline: none;
            transition: border-color 0.2s;
        }

        input:focus { border-color: var(--accent); }

        button#bazuka-btn {
            background: var(--accent);
            color: #052e16;
            border: none;
            padding: 1rem;
            border-radius: 10px;
            font-weight: 700;
            cursor: pointer;
            text-transform: uppercase;
            font-family: var(--font-mono);
            transition: all 0.3s;
        }

        button#bazuka-btn:hover { background: var(--accent-hover); transform: translateY(-2px); }

        #modal-overlay {
            display: none;
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(8px);
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .modal {
            background: #000000;
            padding: 3rem 2rem;
            border-radius: 32px;
            width: 90%;
            max-width: 500px;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .result-link { color: var(--accent); font-weight: 700; text-decoration: none; word-break: break-all; }
    </style>
</head>
<body>
    <div class="pixel-bg" id="pixel-bg"></div>
    <div class="container">
        <h1>BAZUKA</h1>
        <form id="bazuka-form">
            <div class="input-group">
                <input type="text" id="nickname" placeholder="Nickname" required>
                <input type="text" id="job" placeholder="Job Title" required>
                <input type="email" id="email" placeholder="Email" required>
                <input type="url" id="linkedin" placeholder="LinkedIn URL" required>
                <button type="submit" id="bazuka-btn">BAZUKA</button>
            </div>
            <div id="turnstile-container" style="display: none;">
                <div class="cf-turnstile" data-sitekey="0x4AAAAAACpO5kHNRhLAhQOH" data-size="invisible" data-callback="onTurnstileSuccess"></div>
            </div>
        </form>
    </div>

    <div id="modal-overlay">
        <div class="modal">
            <h2>CARD ARMED!</h2>
            <p style="margin: 1rem 0; color: var(--text-dim);">Your dynamic card is live for 3 days:</p>
            <div style="background: #111; padding: 1rem; border-radius: 10px; margin-bottom: 1.5rem;">
                <a href="#" id="result-url" class="result-link" target="_blank"></a>
            </div>
            <button onclick="location.reload()" style="background: transparent; color: var(--text-dim); border: none; cursor: pointer;">Create Another</button>
        </div>
    </div>

    <script>
        const form = document.getElementById('bazuka-form');
        const submitBtn = document.getElementById('bazuka-btn');
        let isUserInitiated = false;

        window.onTurnstileSuccess = (token) => {
            if (isUserInitiated) {
                createBazuka(token);
                isUserInitiated = false;
            }
        };

        form.onsubmit = async (e) => {
            e.preventDefault();
            submitBtn.disabled = true;
            submitBtn.innerText = 'ARMING...';
            isUserInitiated = true;
            if (window.turnstile) window.turnstile.execute();
            else createBazuka();
        };

        async function createBazuka(token = '') {
            const data = {
                nickname: document.getElementById('nickname').value,
                job: document.getElementById('job').value,
                email: document.getElementById('email').value,
                linkedin: document.getElementById('linkedin').value,
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
                    document.getElementById('modal-overlay').style.display = 'flex';
                } else {
                    const err = await response.json();
                    alert(err.error || 'Bazuka failed.');
                }
            } catch (err) {
                alert('Network error.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerText = 'BAZUKA';
            }
        }

        // Pixel Background
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
            animation: drift var(--duration) linear infinite;
            top: var(--top); left: -10px;
        }

        .pixel.green { background: var(--accent); box-shadow: 0 0 5px var(--accent); opacity: 0.6; }

        @keyframes drift {
            0% { transform: translateX(0); opacity: 0; }
            100% { transform: translateX(calc(100vw + 20px)); opacity: 0; }
        }

        .card {
            z-index: 10;
            text-align: left;
            border-left: 4px solid var(--accent);
            padding: 2rem;
            background: rgba(17, 17, 17, 0.8);
            backdrop-filter: blur(10px);
            border-radius: 0 20px 20px 0;
            max-width: 90%;
            width: 400px;
            box-shadow: 20px 20px 60px rgba(0,0,0,0.5);
        }

        .nickname {
            font-family: var(--font-brand);
            font-size: 3rem;
            color: var(--accent);
            margin-bottom: 0.5rem;
            text-transform: uppercase;
        }

        .job { font-size: 1.2rem; color: var(--text-main); font-weight: 700; margin-bottom: 1.5rem; letter-spacing: 1px; }
        
        .info-row { margin-bottom: 0.8rem; display: flex; align-items: center; gap: 10px; }
        .label { color: var(--text-dim); font-size: 0.8rem; text-transform: uppercase; width: 80px; }
        .value { color: var(--text-main); font-size: 0.9rem; text-decoration: none; }
        .value:hover { color: var(--accent); }

        .footer { margin-top: 2rem; font-size: 0.7rem; color: var(--text-dim); border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1rem; }
    </style>
</head>
<body>
    <div class="pixel-bg" id="pixel-bg"></div>
    <div class="card">
        <div class="nickname" id="card-nickname">NAME</div>
        <div class="job" id="card-job">JOB TITLE</div>
        
        <div class="info-row">
            <span class="label">Email</span>
            <a href="" class="value" id="card-email">email@example.com</a>
        </div>
        <div class="info-row">
            <span class="label">LinkedIn</span>
            <a href="" class="value" id="card-linkedin" target="_blank">View Profile</a>
        </div>

        <div class="footer">
            Generated via PUNCHY.ME BAZUKA • Expires in 3 days
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
