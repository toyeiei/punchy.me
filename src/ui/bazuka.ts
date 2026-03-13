export const BAZUKA_FORM_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BAZUKA | Instant Digital Business Cards | PUNCHY.ME</title>
    <meta name="description" content="Generate your high-impact, neon-glitch digital business card in seconds with BAZUKA. Built for speed and professional impact.">
    <link rel="canonical" href="https://punchy.me/bazuka" />
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
            margin-bottom: 1rem;
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
            content: "BAZUKA";
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

        .punchy-desc {
            font-family: var(--font-mono);
            color: var(--text-dim);
            font-size: 0.9rem;
            margin-bottom: 2rem;
            line-height: 1.5;
            letter-spacing: 0.5px;
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
            text-align: left;
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
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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
        <p class="punchy-desc">Forging high-impact digital presence in seconds. Fast, stylish, and built for the Edge.</p>
        <form id="bazuka-form">
            <div class="input-group">
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
            submitBtn.innerText = 'GENERATE DIGITAL CARD';
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
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%23000000' /%3E%3Cg transform='rotate(15, 50, 50)'%3E%3Cpath d='M35 25 H55 C65 25 75 32 75 45 C75 58 65 65 55 65 H45 V80' stroke='%2322c55e' stroke-width='10' stroke-linecap='round' stroke-linejoin='round' fill='none' /%3E%3Cpath d='M45 45 H55' stroke='%2322c55e' stroke-width='10' stroke-linecap='round' fill='none' /%3E%3C/g%3E%3C/svg%3E">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:title" id="og-title" content="Digital Business Card | PUNCHY.ME">
    <meta property="og:description" id="og-description" content="Check out my digital business card on BAZUKA. Part of the PUNCHY.ME ecosystem.">
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

    <script type="application/ld+json" id="schema-block"></script>

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

        // Dynamic Schema Generation
        const nickname = document.getElementById('card-nickname').innerText;
        const job = document.getElementById('card-job').innerText;
        const email = document.getElementById('card-email').innerText;
        const website = document.getElementById('card-website').href;

        const schema = {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": nickname,
            "jobTitle": job,
            "email": email,
            "url": website,
            "mainEntityOfPage": {
                "@type": "ContactPage",
                "@id": window.location.href
            }
        };
        document.getElementById('schema-block').textContent = JSON.stringify(schema);
    </script>
</body>
</html>`;
