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
                    <label>Education <span style="font-size: 0.65rem; color: var(--accent); opacity: 0.8;">[MAX 500 CHARS]</span></label>
                    <textarea id="education" placeholder="Jedi Academy, Master Yoda's Classes..." required maxlength="500"></textarea>
                </div>
                <div>
                    <label>Skills & Achievements <span style="font-size: 0.65rem; color: var(--accent); opacity: 0.8;">[MAX 500 CHARS]</span></label>
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
            max-width: 900px;
            width: 100%;
            padding: 4rem;
            border: 1px solid rgba(255, 255, 255, 0.05);
            box-shadow: 0 40px 100px rgba(0,0,0,0.8);
            position: relative;
            overflow: hidden;
        }

        /* HUD Accents */
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

        .utility-bar {
            position: absolute;
            top: 25px;
            right: 60px;
            display: flex;
            gap: 1rem;
            z-index: 20;
        }

        .util-btn {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            color: var(--text-dim);
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 0.7rem;
            cursor: pointer;
            text-transform: uppercase;
            font-weight: 700;
            transition: all 0.2s;
        }
        .util-btn:hover { background: var(--accent); color: #000; border-color: var(--accent); }

        .resume-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 4rem;
        }

        @media (min-width: 768px) {
            .resume-grid {
                grid-template-columns: 2fr 1fr;
            }
        }

        .header { margin-bottom: 3rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 2rem; grid-column: 1 / -1; }

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

        .section { margin-bottom: 1rem; }
        .section-title { 
            font-family: var(--font-brand);
            font-size: 1.25rem; 
            color: var(--accent); 
            text-transform: uppercase; 
            margin-bottom: 1rem; 
            display: flex; 
            align-items: center; 
            gap: 1rem; 
        }
        .section-title::after { content: ""; flex: 1; height: 1px; background: rgba(34, 197, 94, 0.2); }

        /* Glassmorphism AI Summary */
        .ai-summary { 
            font-size: 1.1rem; 
            color: var(--text-main); 
            font-weight: 400; 
            line-height: 1.6; 
            font-style: italic; 
            background: rgba(34, 197, 94, 0.05);
            border: 1px solid rgba(34, 197, 94, 0.2);
            padding: 1.5rem;
            border-radius: 16px;
            backdrop-filter: blur(5px);
            position: relative;
        }
        .ai-summary::before {
            content: "AI REFINED";
            position: absolute;
            top: -10px;
            left: 20px;
            background: var(--accent);
            color: #000;
            font-size: 0.6rem;
            font-weight: 900;
            padding: 2px 8px;
            border-radius: 4px;
        }

        .content-text { color: var(--text-main); white-space: pre-wrap; font-size: 1rem; line-height: 1.5; }

        /* Sidebar Elements */
        .sidebar-section { margin-bottom: 1.5rem; }
        .sidebar-label { color: var(--accent); font-size: 0.7rem; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 0.5rem; }
        .sidebar-value { color: var(--text-main); font-size: 0.9rem; word-break: break-all; text-decoration: none; display: block; }
        .sidebar-value:hover { color: var(--accent); }

        .skill-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .skill-tag { 
            background: rgba(255,255,255,0.05); 
            padding: 4px 10px; 
            border-radius: 4px; 
            font-size: 0.75rem; 
            border: 1px solid rgba(255,255,255,0.1);
            color: var(--text-main);
        }

        .brand-footer { grid-column: 1 / -1; margin-top: 2rem; font-size: 0.75rem; color: var(--text-dim); text-align: center; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1rem; }

        .util-btn {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            color: var(--text-dim);
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 0.75rem;
            cursor: pointer;
            text-transform: uppercase;
            font-weight: 700;
            transition: all 0.2s;
            font-family: 'JetBrains Mono', monospace;
        }
        .util-btn:hover { background: var(--accent); color: #000; border-color: var(--accent); }

        .print-footer { display: none; }

        @media print {
            @page { size: letter; margin: 10mm; }
            body { background: white; color: black; padding: 0; margin: 0; display: block; }
            .pixel-bg, .hud-corner, .utility-bar, .brand-footer { display: none !important; }
            .resume-card { background: white; color: black; box-shadow: none; border: none; padding: 0; max-width: 100%; page-break-inside: avoid; height: 100%; display: flex; flex-direction: column; }
            .name { color: black; animation: none; text-shadow: none; }
            .job-title, .section-title, .sidebar-label, .ai-summary::before { color: #16a34a; }
            .ai-summary { background: #f0fdf4 !important; border: 1px solid #bbf7d0 !important; color: #166534 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; box-shadow: inset 0 0 0 1000px #f0fdf4 !important; }
            .content-text, .sidebar-value, .skill-tag { color: black; }
            .skill-tag { border-color: #ddd; }
            .print-footer { display: block; text-align: center; margin-top: auto; font-size: 0.75rem; color: #666; border-top: 1px solid #ddd; padding-top: 1rem; font-weight: bold; }
        }
    </style>
</head>
<body>
    <div class="pixel-bg" id="pixel-bg"></div>
    
    <div class="resume-card">
        <!-- HUD Accents -->
        <div class="hud-corner top-left"></div>
        <div class="hud-corner top-right"></div>
        <div class="hud-corner bottom-left"></div>
        <div class="hud-corner bottom-right"></div>

        <!-- Utility Buttons -->
        <div class="utility-bar">
            <button class="util-btn" onclick="window.print()">Print PDF</button>
            <button class="util-btn" id="copy-resume-link">Copy URL</button>
        </div>

        <div class="header">
            <div class="name" id="res-name">ANAKIN SKYWALKER</div>
            <div class="job-title" id="res-job">JEDI KNIGHT</div>
        </div>

        <div class="resume-grid">
            <div class="main-col">
                <div class="section">
                    <div class="section-title">Professional Summary</div>
                    <div class="ai-summary" id="res-summary">
                        Refining professional profile...
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">Education</div>
                    <div class="content-text" id="res-education">Jedi Academy</div>
                </div>
            </div>

            <div class="sidebar-col">
                <div class="sidebar-section">
                    <div class="sidebar-label">Contact</div>
                    <a href="#" class="sidebar-value" id="res-email">anakin@force.com</a>
                </div>

                <div class="sidebar-section">
                    <div class="sidebar-label">Network</div>
                    <a href="#" class="sidebar-value" id="res-website" target="_blank">PORTFOLIO</a>
                </div>

                <div class="sidebar-section">
                    <div class="sidebar-label">Expertise</div>
                    <div class="content-text" id="res-skills" style="font-size: 0.9rem; line-height: 2;">
                        The Force, Lightsaber Combat, Podracing
                    </div>
                </div>
            </div>
        </div>

        <div class="brand-footer">
            FORGED BY ANAKIN AI • POWERED BY PUNCHY.ME • Built with ⚡ by Toy & Gemini CLI
        </div>
        <div class="print-footer">
            FORGED BY ANAKIN AI • POWERED BY PUNCHY.ME
        </div>
    </div>

    <script>
        // Copy Link Functionality
        document.getElementById('copy-resume-link').onclick = () => {
            navigator.clipboard.writeText(window.location.href).then(() => {
                const btn = document.getElementById('copy-resume-link');
                const original = btn.innerText;
                btn.innerText = 'COPIED!';
                btn.style.background = 'var(--accent)';
                btn.style.color = '#000';
                setTimeout(() => {
                    btn.innerText = original;
                    btn.style.background = '';
                    btn.style.color = '';
                }, 2000);
            });
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
