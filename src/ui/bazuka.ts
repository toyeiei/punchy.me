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
        input:focus { border-color: var(--accent); background: rgba(255, 255, 255, 0.08); }

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
    </style>
</head>
<body>
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
        <div class="title-container">
            <h1>BAZUKA</h1>
        </div>
        <p class="punchy-desc">Forging high-impact digital presence in seconds.</p>
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

    <div id="modal-overlay">
        <div class="modal">
            <div class="status-stage">
                <div class="success-icon" id="modal-success-icon" style="display: flex;">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            </div>
            <h2>CARD FORGED!</h2>
            <p style="color: var(--text-dim); margin-top: 0.5rem;">Your high-impact identity is live.</p>
            
            <div class="result-container">
                <a href="#" id="result-link" target="_blank">Generating...</a>
                <button id="copy-btn">COPY</button>
            </div>
            <button id="close-modal">DONE</button>
        </div>
    </div>

    <style>
        #modal-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: none; align-items: center; justify-content: center;
            z-index: 2000; opacity: 0; transition: opacity 0.3s;
        }
        #modal-overlay.show { display: flex; opacity: 1; }
        .modal {
            background: #000; border: 1px solid var(--accent);
            padding: 3rem; border-radius: 24px; text-align: center;
            max-width: 450px; width: 90%; transform: scale(0.9); transition: transform 0.3s;
            box-shadow: 0 0 50px rgba(34, 197, 94, 0.2);
        }
        #modal-overlay.show .modal { transform: scale(1); }
        .status-stage { margin-bottom: 1.5rem; display: flex; justify-content: center; }
        .success-icon {
            width: 60px; height: 60px; background: var(--accent); border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            box-shadow: 0 0 30px var(--accent);
            animation: success-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes success-pop { 0% { transform: scale(0); } 100% { transform: scale(1); } }
        .success-icon svg { width: 30px; height: 30px; color: #000; }
        
        .result-container {
            background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 1rem; border-radius: 12px; margin: 2rem 0;
            display: flex; align-items: center; gap: 1rem;
        }
        #result-link {
            color: var(--accent); font-family: var(--font-mono); font-size: 0.9rem;
            text-decoration: none; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        #copy-btn, #close-modal {
            background: var(--accent); color: #000; border: none;
            padding: 0.8rem 1.5rem; border-radius: 8px; font-weight: 700;
            font-family: var(--font-mono); cursor: pointer; transition: all 0.2s;
        }
        #copy-btn:hover, #close-modal:hover { background: var(--accent-hover); transform: scale(1.05); }
        #close-modal { width: 100%; margin-top: 1rem; background: transparent; color: var(--text-dim); border: 1px solid rgba(255, 255, 255, 0.1); }
        #close-modal:hover { color: var(--text-main); border-color: var(--text-main); }
    </style>

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
        const modal = document.getElementById('modal-overlay');
        const resultLink = document.getElementById('result-link');
        const copyBtn = document.getElementById('copy-btn');
        const closeBtn = document.getElementById('close-modal');

        form.onsubmit = (e) => {
            e.preventDefault();
            if (window.turnstile) {
                turnstile.execute();
            } else {
                onTurnstileSuccess(''); // Fallback if Turnstile fails to load
            }
        };

        window.onTurnstileSuccess = async (token) => {
            const formData = {
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
                    const { id } = await res.json();
                    const fullUrl = window.location.origin + '/' + id;
                    resultLink.innerText = fullUrl;
                    resultLink.href = fullUrl;
                    modal.classList.add('show');
                }
            } catch (err) {
                alert('Forge failed. Please try again.');
            }
        };

        copyBtn.onclick = () => {
            navigator.clipboard.writeText(resultLink.innerText);
            const originalText = copyBtn.innerText;
            copyBtn.innerText = 'DONE!';
            setTimeout(() => copyBtn.innerText = originalText, 2000);
        };

        closeBtn.onclick = () => modal.classList.remove('show');
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
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 24px;
            padding: 3.5rem;
            max-width: 480px;
            width: 100%;
            position: relative;
            transition: all 0.3s ease;
        }
        .card:hover {
            transform: translateY(-5px);
            border-color: var(--accent);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        .nickname { font-family: var(--font-brand); font-size: 3rem; color: var(--accent); margin-bottom: 0.5rem; text-transform: uppercase; }
        .job { font-weight: 700; color: var(--text-main); margin-bottom: 1.5rem; }
        .contact-item { display: flex; align-items: center; gap: 0.5rem; color: var(--text-dim); text-decoration: none; margin-bottom: 0.5rem; transition: color 0.2s; }
        .contact-item:hover { color: var(--accent); }
    </style>
</head>
<body>
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
            <h1 class="nickname" id="card-nickname">NAME</h1>
            <div class="job" id="card-job">JOB TITLE</div>
            <div class="contact-bar">
                <a href="#" class="contact-item" id="card-email-link"><span id="card-email">email@example.com</span></a>
                <a href="#" class="contact-item" id="card-website-link" target="_blank"><span id="card-website">PORTFOLIO</span></a>
            </div>
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
