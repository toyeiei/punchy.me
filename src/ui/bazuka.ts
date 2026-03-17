import { PUNCHY_PORTAL_HTML } from './portal';

export const BAZUKA_FORM_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BAZUKA | Instant Digital Business Cards | PUNCHY.ME</title>
    <meta name="description" content="Generate your high-impact, neon-glitch digital business card in seconds with BAZUKA. Built for speed and professional impact.">
    <link rel="canonical" href="https://punchy.me/bazuka" />
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E👤%3C/text%3E%3C/svg%3E">

    <!-- Open Graph / Social -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://punchy.me/bazuka">
    <meta property="og:title" content="BAZUKA | Instant Digital Business Cards | PUNCHY.ME">
    <meta property="og:description" content="Generate your high-impact digital business card in seconds. Free, stylish, and edge-native.">
    <meta property="og:image" content="https://punchy.me/og-images/og-image-bazuka.webp">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="BAZUKA | Instant Digital Business Cards | PUNCHY.ME">
    <meta name="twitter:description" content="Generate your high-impact digital business card in seconds. Free, stylish, and edge-native.">
    <meta name="twitter:image" content="https://punchy.me/og-images/og-image-bazuka.webp">

    <!-- JSON-LD Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "BAZUKA Digital Business Cards",
      "operatingSystem": "Any",
      "applicationCategory": "BusinessApplication",
      "url": "https://punchy.me/bazuka",
      "description": "Generate high-impact, neon-glitch digital business cards in seconds. Free and edge-native.",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
    </script>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
    <style>
        :root {
            --bg: #000000;
            --card-bg: rgba(255, 255, 255, 0.03);
            --accent: #22c55e;
            --accent-hover: #4ade80;
            --text-main: #f8fafc;
            --text-dim: #94a3b8;
            --font-brand: 'Bitcount Prop Double', cursive;
            --font-mono: 'JetBrains Mono', monospace;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        html, body {
            height: 100%;
            background-color: var(--bg);
        }

        body {
            color: var(--text-main);
            font-family: var(--font-mono);
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
            position: relative;
            padding: 0;
            overflow-y: auto;
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
            background-image: linear-gradient(rgba(34, 197, 94, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.08) 1px, transparent 1px);
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
            z-index: 1;
        }

        .pixel.green { background: var(--accent); box-shadow: 0 0 5px var(--accent); opacity: 0.6; }

        @keyframes drift {
            0% { transform: translateX(0); opacity: 0; }
            5% { opacity: 1; }
            95% { opacity: 1; }
            100% { transform: translateX(calc(100vw + 20px)); opacity: 0; }
        }

        .container {
            width: 100%;
            max-width: 500px;
            text-align: center;
            z-index: 10;
            position: relative;
            padding: 6rem 1.5rem 2rem;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .title-container {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 1rem;
        }

        h1 {
            font-family: var(--font-brand); font-size: clamp(3rem, 12vw, 100px); font-weight: 400;
            line-height: 0.8;
            color: var(--text-main);
            letter-spacing: -3px;
            text-transform: uppercase;
            position: relative;
            animation: main-glitch 5s infinite;
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        @keyframes main-glitch {
            0%, 80%, 100% { transform: skew(0deg); text-shadow: none; }
            81% { transform: skew(2deg); text-shadow: 1px 0 #ff00ff; }
            82% { transform: skew(-2deg); text-shadow: -1px 0 #00ffff; }
            83% { transform: skew(0deg); text-shadow: none; }
        }

        .punchy-desc {
            font-family: var(--font-mono);
            color: var(--text-dim);
            font-size: 0.9rem;
            margin-bottom: 2rem;
            line-height: 1.5;
        }

        .input-group {
            background: var(--card-bg);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 2.5rem;
            border-radius: 24px;
            display: flex;
            flex-direction: column;
            gap: 1.2rem;
            text-align: left;
            transition: all 0.3s ease;
        }
        .input-group:hover {
            transform: translateY(-5px);
            border-color: var(--accent);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        /* SHINOBI INPUTS */
        input {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 1rem 1.2rem;
            border-radius: 12px;
            color: var(--text-main);
            font-family: var(--font-mono);
            outline: none;
            width: 100%;
            transition: all 0.2s;
        }
        input:focus { 
            border-color: var(--accent); 
            background: rgba(255, 255, 255, 0.08); 
            box-shadow: 0 0 10px rgba(34, 197, 94, 0.1);
        }

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
            margin-top: 0.5rem;
        }

        button#bazuka-btn:hover { background: var(--accent-hover); box-shadow: 0 0 20px rgba(34, 197, 94, 0.4); }

        .beta-badge {
            background: var(--accent);
            color: #000;
            font-size: 0.8rem;
            font-weight: 900;
            padding: 4px 10px;
            border-radius: 6px;
            font-family: var(--font-mono);
            box-shadow: 0 0 15px rgba(34, 197, 94, 0.6);
            animation: pulse 2s infinite alternate;
        }

        @keyframes pulse {
            0% { transform: scale(1); opacity: 0.8; }
            100% { transform: scale(1.05); opacity: 1; }
        }

        /* SUCCESS MODAL */
        #modal-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: none; align-items: center; justify-content: center;
            z-index: 2000; opacity: 0; transition: opacity 0.3s;
        }
        #modal-overlay.show { display: flex; opacity: 1; }
        .modal {
            background: #000; border: 1px solid var(--accent);
            padding: 3rem; border-radius: 24px; text-align: center;
            max-width: 450px; width: 95%; transform: scale(0.9); transition: transform 0.3s;
            box-shadow: 0 0 50px rgba(34, 197, 94, 0.2);
            position: relative;
        }
        #modal-overlay.show .modal { transform: scale(1); }
        .success-icon {
            width: 80px; height: 80px; background: var(--accent); border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            margin: 0 auto 1.5rem;
            box-shadow: 0 0 30px var(--accent);
            animation: success-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes success-pop { 0% { transform: scale(0); } 100% { transform: scale(1); } }
        .success-icon svg { width: 40px; height: 40px; color: #000; }

        .modal-title {
            font-family: var(--font-mono); 
            font-size: 1.8rem; 
            font-weight: 700;
            color: var(--accent); 
            margin-bottom: 0.5rem;
            letter-spacing: 2px;
        }

        .modal-link {
            display: inline-block;
            margin-top: 2rem;
            padding: 1rem 2rem;
            background: rgba(34, 197, 94, 0.1);
            border: 1px solid var(--accent);
            color: var(--accent);
            text-decoration: none;
            font-family: var(--font-mono);
            font-weight: 700;
            border-radius: 12px;
            transition: all 0.3s;
            opacity: 0.5;
            pointer-events: none;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .modal-link.ready {
            opacity: 1;
            pointer-events: auto;
            background: var(--accent);
            color: #000;
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.4);
        }
        .modal-link.ready:hover {
            transform: scale(1.05);
            background: var(--accent-hover);
        }
    </style>
</head>
<body>
    <div class="grid-bg"></div>
    <div class="pixel-bg" id="pixel-bg"></div>

    <div id="modal-overlay">
        <div class="modal">
            <div class="success-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h2 class="modal-title">CARD FORGED</h2>
            <p style="color: var(--text-dim); font-family: var(--font-mono); font-size: 0.8rem; letter-spacing: 1px;">TACTICAL IDENTITY IS NOW LIVE</p>
            <a href="#" id="success-link" class="modal-link">INITIALIZING...</a>
        </div>
    </div>

    ${PUNCHY_PORTAL_HTML}

    <div class="container">
        <div class="title-container" style="display: flex; align-items: center; justify-content: center; gap: 1.5rem;">
            <h1>BAZUKA</h1>
            <span class="beta-badge">BETA</span>
        </div>
        <p class="punchy-desc">Forging high-impact digital presence in seconds.</p>
        <form id="bazuka-form">
            <div class="input-group">
                <input type="text" id="hp_field" style="display: none;" tabindex="-1" autocomplete="off">
                <input type="text" id="nickname" placeholder="👤 Nickname" required>
                <input type="text" id="job" placeholder="💼 Job Title" required>
                <input type="email" id="email" placeholder="📧 Email Address" required>
                <input type="url" id="website" placeholder="🌐 Website URL" required>
                <button type="submit" id="bazuka-btn">GENERATE DIGITAL CARD</button>
            </div>
            <div id="turnstile-container" style="display: none;">
                <div class="cf-turnstile" data-sitekey="0x4AAAAAACpO5kHNRhLAhQOH" data-size="invisible" data-callback="onTurnstileSuccess" data-error-callback="onTurnstileError"></div>
            </div>
        </form>
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

        const form = document.getElementById('bazuka-form');
        const submitBtn = document.getElementById('bazuka-btn');

        function resetSubmitBtn() {
            submitBtn.disabled = false;
            submitBtn.innerText = 'GENERATE DIGITAL CARD';
            isUserInitiated = false;
            if (turnstileTimeoutId) {
                clearTimeout(turnstileTimeoutId);
                turnstileTimeoutId = null;
            }
        }

        let isUserInitiated = false;
        let turnstileTimeoutId = null;

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
            if (isUserInitiated) createBazuka(''); 
        };

        form.onsubmit = async (e) => {
            e.preventDefault();
            submitBtn.disabled = true;
            submitBtn.innerText = 'FORGING...';
            isUserInitiated = true;

            // ULTRA-FAST HANDSHAKE: 1s timeout for Turnstile
            turnstileTimeoutId = setTimeout(() => {
                if (isUserInitiated) createBazuka('');
            }, 1000);

            if (window.turnstile) {
                try {
                    window.turnstile.execute();
                } catch (err) {
                    createBazuka('');
                }
            } else {
                createBazuka('');
            }
        };

        async function createBazuka(token = '') {
            const suggestedId = Math.random().toString(36).substring(2, 8);
            const formData = {
                suggestedId,
                hp_field: document.getElementById('hp_field').value,
                nickname: document.getElementById('nickname').value,
                job: document.getElementById('job').value,
                email: document.getElementById('email').value,
                website: document.getElementById('website').value,
                'cf-turnstile-response': token
            };

            try {
                const res = await fetch('/bazuka', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                
                if (res.ok) {
                    // ELITE FLOW: Show success modal immediately
                    const modal = document.getElementById('modal-overlay');
                    const link = document.getElementById('success-link');
                    
                    modal.classList.add('show');
                    link.href = '/' + suggestedId;
                    
                    // Unlock link after 1.5s (simulating propagation)
                    setTimeout(() => {
                        link.innerText = 'VIEW DIGITAL CARD';
                        link.classList.add('ready');
                    }, 1500);
                } else {
                    alert('Forge failed. Please try again.');
                    resetSubmitBtn();
                }
            } catch (err) {
                alert('Network error. Please try again.');
                resetSubmitBtn();
            }
        }
    </script>
</body>
</html>`;

export const BAZUKA_CARD_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title id="title-tag">Business Card | PUNCHY.ME</title>
    <link href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
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
        
        html, body { height: 100%; background-color: var(--bg); }

        body {
            color: var(--text-main);
            font-family: var(--font-mono);
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
            position: relative;
            padding: 0;
            overflow-y: auto;
        }
        .pixel-bg {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            z-index: 0;
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
            z-index: 1;
        }
        .pixel.green { background: var(--accent); box-shadow: 0 0 5px var(--accent); opacity: 0.6; }
        @keyframes drift {
            0% { transform: translateX(0); opacity: 0; }
            5% { opacity: 1; }
            95% { opacity: 1; }
            100% { transform: translateX(calc(100vw + 20px)); opacity: 0; }
        }

        .card-container {
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            padding: 2rem;
            z-index: 10;
        }
        .card {
            background: rgba(255, 255, 255, 0.03); /* SHINOBI GLASS */
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 24px;
            padding: 3.5rem;
            max-width: 480px;
            width: 100%;
            position: relative;
            transition: all 0.3s ease;
            box-shadow: 0 40px 100px rgba(0,0,0,0.8);
        }
        .card:hover {
            transform: translateY(-5px);
            border-color: var(--accent);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        
        .hud-corner {
            position: absolute;
            width: 20px;
            height: 20px;
            border: 2px solid var(--accent);
            opacity: 0.5;
        }
        .top-left { top: 20px; left: 20px; border-right: none; border-bottom: none; }
        .top-right { top: 20px; right: 20px; border-left: none; border-bottom: none; }
        .bottom-left { bottom: 20px; left: 20px; border-right: none; border-top: none; }
        .bottom-right { bottom: 20px; right: 20px; border-left: none; border-top: none; }

        .nickname { 
            font-family: var(--font-brand); 
            font-size: clamp(2.2rem, 10vw, 3.45rem); 
            font-weight: 400; 
            color: var(--accent); 
            margin-bottom: 0.5rem; 
            text-transform: uppercase; 
            word-wrap: break-word;
            overflow-wrap: break-word;
            padding-left: 2.25rem; /* Indent to align with contact text below icons */
        }
        .job { 
            font-weight: 700; 
            color: var(--text-main); 
            margin-bottom: 1.5rem; 
            letter-spacing: 1px; 
            font-size: 0.9rem;
            word-wrap: break-word;
            overflow-wrap: break-word;
            padding-left: 2.25rem; /* Indent to align with contact text below icons */
        }
        
        .contact-bar {
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
        }
        .contact-item { 
            display: flex; 
            align-items: center; 
            gap: 1rem; 
            color: var(--text-dim); 
            text-decoration: none; 
            transition: color 0.2s; 
            font-size: 0.9rem;
            word-wrap: break-word;
            overflow-wrap: break-word;
        }
        .contact-item:hover { color: var(--accent); }
        
        .icon-svg { 
            width: 1.25rem; 
            height: 1.25rem; 
            flex-shrink: 0; 
            color: var(--accent);
        }

        .expiration-note {
            position: absolute;
            bottom: -30px;
            left: 0;
            width: 100%;
            text-align: center;
            font-size: 0.7rem;
            color: var(--text-dim);
            opacity: 0.6;
            letter-spacing: 1px;
            text-transform: uppercase;
        }
    </style>
</head>
<body>
    ${PUNCHY_PORTAL_HTML}
    <div class="grid-bg"></div>
    <div class="pixel-bg" id="pixel-bg"></div>

    <div class="card-container">
        <div class="card">
            <div class="hud-corner top-left"></div>
            <div class="hud-corner top-right"></div>
            <div class="hud-corner bottom-left"></div>
            <div class="hud-corner bottom-right"></div>
            <h1 class="nickname" id="card-nickname">NAME</h1>
            <div class="job" id="card-job">JOB TITLE</div>
            <div class="contact-bar">
                <a href="#" class="contact-item" id="card-email-link">
                    <svg class="icon-svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" /></svg>
                    <span id="card-email">email@example.com</span>
                </a>
                <a href="#" class="contact-item" id="card-website-link" target="_blank">
                    <svg class="icon-svg" viewBox="0 0 24 24"><path fill="currentColor" d="M7,2V13H10V22L17,10H13L17,2H7Z" /></svg>
                    <span id="card-website">website.com</span>
                </a>
            </div>
            <div class="expiration-note">FORGED BY BAZUKA • EXPIRES IN 3 DAYS</div>
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
