export const BAZUKA_FORM_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BAZUKA | Instant Digital Business Cards | PUNCHY.ME</title>
    <meta name="description" content="Generate your high-impact, neon-glitch digital business card in seconds with BAZUKA. Built for speed and professional impact.">
    <link rel="canonical" href="https://punchy.me/bazuka" />
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%23000000' /%3E%3Cg transform='rotate(15, 50, 50)'%3E%3Cpath d='M35 25 H55 C65 25 75 32 75 45 C75 58 65 65 55 65 H45 V80' stroke='%2322c55e' stroke-width='10' stroke-linecap='round' stroke-linejoin='round' fill='none' /%3E%3Cpath d='M45 45 H55' stroke='%2322c55e' stroke-width='10' stroke-linecap='round' fill='none' /%3E%3C/g%3E%3C/svg%3E">
    
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

        /* ECOSYSTEM PORTAL (Fast-Switcher) - ANCHORED BOTTOM RIGHT */
        .punchy-portal {
            position: fixed;
            bottom: 1.5rem;
            right: 1.5rem;
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(34, 197, 94, 0.2);
            border-radius: 12px;
            padding: 0.5rem;
            gap: 0;
            overflow: hidden;
            width: 44px;
            height: 44px;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1000;
            cursor: pointer;
            text-decoration: none;
        }
        .punchy-portal:hover {
            width: 280px;
            gap: 1rem;
            border-color: var(--accent);
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.2);
        }
        .portal-trigger { font-size: 1.2rem; min-width: 28px; text-align: center; display: flex; align-items: center; justify-content: center; }
        .portal-brand { color: var(--accent); font-weight: 700; font-size: 0.8rem; white-space: nowrap; opacity: 0; transition: opacity 0.3s ease; font-family: var(--font-mono); }
        .punchy-portal:hover .portal-brand { opacity: 1; }
        .portal-tools { display: flex; gap: 0.8rem; opacity: 0; transition: opacity 0.3s ease; }
        .punchy-portal:hover .portal-tools { opacity: 1; }
        .portal-tool-link { text-decoration: none; font-size: 1.1rem; transition: transform 0.2s ease; filter: grayscale(1); }
        .portal-tool-link:hover { transform: scale(1.3); filter: grayscale(0); }

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
    </style>
</head>
<body>
    <div class="grid-bg"></div>
    <div class="pixel-bg" id="pixel-bg"></div>

    <a href="/" class="punchy-portal">
        <div class="portal-trigger">⚡</div>
        <div class="portal-brand">PUNCHY.ME</div>
        <div class="portal-tools">
            <object><a href="/bazuka" class="portal-tool-link" title="BAZUKA">👤</a></object>
            <object><a href="/anakin" class="portal-tool-link" title="ANAKIN">⚡</a></object>
            <object><a href="/musashi" class="portal-tool-link" title="MUSASHI">⚔️</a></object>
            <object><a href="/odin" class="portal-tool-link" title="ODIN">🐦‍⬛</a></object>
        </div>
    </a>

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
                    // ELITE REDIRECT: Bypass modal for instant impact
                    window.location.href = '/' + suggestedId;
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

        /* ECOSYSTEM PORTAL (Fast-Switcher) - ANCHORED BOTTOM RIGHT */
        .punchy-portal {
            position: fixed;
            bottom: 1.5rem;
            right: 1.5rem;
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(34, 197, 94, 0.2);
            border-radius: 12px;
            padding: 0.5rem;
            gap: 0;
            overflow: hidden;
            width: 44px;
            height: 44px;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1000;
            cursor: pointer;
            text-decoration: none;
        }
        .punchy-portal:hover {
            width: 280px;
            gap: 1rem;
            border-color: var(--accent);
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.2);
        }
        .portal-trigger { font-size: 1.2rem; min-width: 28px; text-align: center; display: flex; align-items: center; justify-content: center; }
        .portal-brand { color: var(--accent); font-weight: 700; font-size: 0.8rem; white-space: nowrap; opacity: 0; transition: opacity 0.3s ease; font-family: var(--font-mono); }
        .punchy-portal:hover .portal-brand { opacity: 1; }
        .portal-tools { display: flex; gap: 0.8rem; opacity: 0; transition: opacity 0.3s ease; }
        .punchy-portal:hover .portal-tools { opacity: 1; }
        .portal-tool-link { text-decoration: none; font-size: 1.1rem; transition: transform 0.2s ease; filter: grayscale(1); }
        .portal-tool-link:hover { transform: scale(1.3); filter: grayscale(0); }

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

        .nickname { font-family: var(--font-brand); font-size: 3rem; font-weight: 400; color: var(--accent); margin-bottom: 0.5rem; text-transform: uppercase; }
        .job { font-weight: 700; color: var(--text-main); margin-bottom: 1.5rem; letter-spacing: 1px; }
        
        .contact-bar {
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
        }
        .contact-item { display: flex; align-items: center; gap: 0.8rem; color: var(--text-dim); text-decoration: none; transition: color 0.2s; font-size: 0.9rem; }
        .contact-item:hover { color: var(--accent); }
        .contact-item svg { width: 16px; height: 16px; }

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
    <div class="grid-bg"></div>
    <div class="pixel-bg" id="pixel-bg"></div>

    <a href="/" class="punchy-portal">
        <div class="portal-trigger">⚡</div>
        <div class="portal-brand">PUNCHY.ME</div>
        <div class="portal-tools">
            <object><a href="/bazuka" class="portal-tool-link" title="BAZUKA">👤</a></object>
            <object><a href="/anakin" class="portal-tool-link" title="ANAKIN">⚡</a></object>
            <object><a href="/musashi" class="portal-tool-link" title="MUSASHI">⚔️</a></object>
            <object><a href="/odin" class="portal-tool-link" title="ODIN">🐦‍⬛</a></object>
        </div>
    </a>

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
                    <svg viewBox="0 0 24 24"><path fill="currentColor" d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" /></svg>
                    <span id="card-email">email@example.com</span>
                </a>
                <a href="#" class="contact-item" id="card-website-link" target="_blank">
                    <svg viewBox="0 0 24 24"><path fill="currentColor" d="M7,2V13H10V22L17,10H13L17,2H7Z" /></svg>
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
