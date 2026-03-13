export const ANAKIN_FORM_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ANAKIN | AI-Powered Professional Resumes | PUNCHY.ME</title>
    <meta name="description" content="Generate a high-impact, AI-refined digital resume in seconds with ANAKIN. Built for speed and professional career impact.">
    <link rel="canonical" href="https://punchy.me/anakin" />
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%23000000' /%3E%3Cg transform='rotate(15, 50, 50)'%3E%3Cpath d='M35 25 H55 C65 25 75 32 75 45 C75 58 65 65 55 65 H45 V80' stroke='%2322c55e' stroke-width='10' stroke-linecap='round' stroke-linejoin='round' fill='none' /%3E%3Cpath d='M45 45 H55' stroke='%2322c55e' stroke-width='10' stroke-linecap='round' fill='none' /%3E%3C/g%3E%3C/svg%3E">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://punchy.me/anakin">
    <meta property="og:title" content="ANAKIN | AI-Powered Professional Resumes">
    <meta property="og:description" content="Generate your professional digital resume with AI. Fast, stylish, and free.">
    <meta property="og:image" content="https://punchy.me/og-image.webp">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:title" content="ANAKIN | AI-Powered Professional Resumes">
    <meta property="twitter:description" content="Generate your professional digital resume with AI. Fast, stylish, and free.">
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

        html, body {
            height: 100%;
            margin: 0;
            padding: 0;
        }

        html, body {
            height: 100%;
            margin: 0;
            padding: 0;
        }

        body {
            background-color: var(--bg);
            color: var(--text-main);
            font-family: var(--font-mono);
            display: flex;
            justify-content: center;
            align-items: flex-start; /* Start at top for long forms */
            min-height: 100vh;
            min-height: -webkit-fill-available;
            position: relative;
            padding: 6rem 1.5rem 2rem; /* Added extra top padding for the back-button badge */
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
        }

        .back-home {
            position: absolute;
            top: 1.5rem;
            left: 1.5rem;
            color: var(--accent);
            text-decoration: none;
            font-size: 0.8rem;
            font-weight: 700;
            letter-spacing: 1px;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.3s ease;
            opacity: 0.7;
            z-index: 100;
            background: rgba(0,0,0,0.5);
            padding: 8px 12px;
            border-radius: 8px;
            backdrop-filter: blur(5px);
            border: 1px solid rgba(34, 197, 94, 0.2);
        }
        .back-home:hover { opacity: 1; transform: scale(1.05); border-color: var(--accent); box-shadow: 0 0 15px rgba(34, 197, 94, 0.3); }

        .container {
            width: 100%;
            max-width: 900px;
            text-align: center;
            z-index: 10;
            position: relative;
        }

        .title-container {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1.5rem;
            margin-bottom: 1rem;
        }

        h1 {
            font-family: var(--font-brand);
            font-size: clamp(3rem, 10vw, 80px);
            line-height: 1;
            color: var(--text-main);
            letter-spacing: -2px;
            text-transform: uppercase;
            position: relative;
            animation: main-glitch 5s infinite;
            will-change: transform, opacity;
            transform: translateZ(0);
        }

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

        .punchy-desc {
            font-family: var(--font-mono);
            color: var(--text-dim);
            font-size: 0.9rem;
            margin-bottom: 2.5rem;
            line-height: 1.5;
            letter-spacing: 0.5px;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
        }

        .input-group {
            background: var(--card-bg);
            padding: 3rem;
            border-radius: 24px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.05);
            text-align: left;
        }

        .form-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2.5rem;
        }

        @media (min-width: 768px) {
            .form-grid {
                grid-template-columns: 1fr 1fr;
            }
        }

        .field-group { margin-bottom: 1.5rem; }
        .field-group:last-child { margin-bottom: 0; }

        label { color: var(--text-dim); font-size: 0.75rem; text-transform: uppercase; font-weight: 700; letter-spacing: 1px; margin-bottom: 0.5rem; display: block; }

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

        /* Live Validation Styles */
        .input-wrapper { position: relative; }
        input.valid, textarea.valid { border-color: var(--accent); box-shadow: 0 0 10px rgba(34, 197, 94, 0.1); }
        input.invalid, textarea.invalid { border-color: #ef4444; box-shadow: 0 0 10px rgba(239, 68, 68, 0.1); }
        
        .validation-hint { 
            position: absolute; 
            right: 15px; 
            top: 50%; 
            transform: translateY(-50%); 
            font-size: 0.9rem; 
            pointer-events: none;
            opacity: 0;
            transition: all 0.2s;
        }
        input.valid + .validation-hint { opacity: 1; color: var(--accent); }
        textarea.valid + .validation-hint { opacity: 1; color: var(--accent); top: 20px; transform: none; }

        .ai-badge {
            background: var(--accent);
            color: #000;
            font-size: 0.6rem;
            font-weight: 900;
            padding: 2px 6px;
            border-radius: 4px;
            margin-left: 8px;
            vertical-align: middle;
            box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
        }
        .field-note {
            font-size: 0.7rem;
            color: var(--text-dim);
            margin-top: 6px;
            line-height: 1.4;
        }
        .field-note b { color: var(--accent); }

        .char-counter {
            font-size: 0.65rem;
            color: var(--text-dim);
            text-align: right;
            margin-top: 6px;
            font-family: var(--font-mono);
            letter-spacing: 1px;
        }
        .char-counter.limit { color: #ef4444; font-weight: 700; }

        textarea { resize: vertical; min-height: 120px; }

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
            width: 100%;
            margin-top: 2rem;
            grid-column: 1 / -1;
        }

        @keyframes anakin-glow {
            0% { box-shadow: 0 0 5px rgba(34, 197, 94, 0.2); transform: scale(1); }
            100% { box-shadow: 0 0 25px rgba(34, 197, 94, 0.6); transform: scale(1.01); }
        }

        button#anakin-btn:hover { background: var(--accent-hover); }
        button#anakin-btn:disabled { opacity: 0.5; cursor: not-allowed; animation: none; }

        .integrated-footer {
            grid-column: 1 / -1;
            text-align: center;
            margin-top: 1.5rem;
            font-size: 0.75rem;
            color: var(--text-dim);
            opacity: 0.6;
            transition: opacity 0.2s;
        }
        .integrated-footer:hover { opacity: 1; }

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
    </style>
</head>
<body>
    <div class="pixel-bg" id="pixel-bg"></div>
    <a href="/" class="back-home">[ ⚡ PUNCHY.ME ]</a>
    <div class="container">
        <div class="title-container">
            <h1>ANAKIN</h1>
            <span class="beta-badge">BETA</span>
        </div>
        <p class="punchy-desc">Harnessing Llama 3 to forge elite professional resumes. Transform your raw data into career-winning impact.</p>
        <form id="anakin-form">
            <div class="input-group">
                <div class="form-grid">
                    <!-- Left Column: Personal Info -->
                    <div class="form-col-left">
                        <div class="field-group">
                            <label>Full Name</label>
                            <div class="input-wrapper">
                                <input type="text" id="name" placeholder="Anakin Skywalker" required minlength="2">
                                <span class="validation-hint">✓</span>
                            </div>
                        </div>
                        <div class="field-group">
                            <label>Target Job Title <span class="ai-badge">AI</span></label>
                            <div class="input-wrapper">
                                <input type="text" id="job" placeholder="Jedi Knight / Sith Lord" required minlength="2">
                                <span class="validation-hint">✓</span>
                            </div>
                            <div class="field-note">ANAKIN will surgically craft your resume specifically for <b>this role</b>. Precision is critical for AI alignment.</div>
                        </div>
                        <div class="field-group">
                            <label>Email Address</label>
                            <div class="input-wrapper">
                                <input type="email" id="email" placeholder="anakin@force.com" required>
                                <span class="validation-hint">✓</span>
                            </div>
                        </div>
                        <div class="field-group">
                            <label>Portfolio Website</label>
                            <div class="input-wrapper">
                                <input type="url" id="website" placeholder="https://force.com" required>
                                <span class="validation-hint">✓</span>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column: Professional Content -->
                    <div class="form-col-right">
                        <div class="field-group">
                            <label>Education</label>
                            <div class="input-wrapper">
                                <textarea id="education" placeholder="Jedi Academy, Master Yoda's Classes..." required maxlength="500"></textarea>
                                <span class="validation-hint">✓</span>
                            </div>
                            <div class="char-counter" id="edu-counter">0 / 500</div>
                        </div>
                        <div class="field-group">
                            <label>Skills & Expertise</label>
                            <div class="input-wrapper">
                                <textarea id="skills" placeholder="Lightsaber combat, Podracing, The Force..." required maxlength="500"></textarea>
                                <span class="validation-hint">✓</span>
                            </div>
                            <div class="field-note">Separate skills with <b>commas</b> (e.g. Marketing, SEO, Vibe Coding) to generate tactical resume tags.</div>
                            <div class="char-counter" id="skills-counter">0 / 500</div>
                        </div>
                        <div class="field-group">
                            <label>Experience & Impact</label>
                            <div class="input-wrapper">
                                <textarea id="experience" placeholder="Built a podracer from scrap, Led the 501st Legion..." required maxlength="500"></textarea>
                                <span class="validation-hint">✓</span>
                            </div>
                            <div class="char-counter" id="exp-counter">0 / 500</div>
                        </div>
                    </div>
                </div>
                
                <button type="submit" id="anakin-btn">GENERATE RESUME</button>
                <div class="integrated-footer">
                    Built with ⚡ by Toy & Gemini CLI
                </div>
            </div>
            
            <div id="turnstile-container" style="display: none;">
                <div class="cf-turnstile" data-sitekey="0x4AAAAAACpO5kHNRhLAhQOH" data-size="invisible" data-callback="onTurnstileSuccess" data-error-callback="onTurnstileError"></div>
            </div>
        </form>
    </div>

    <script>
        const form = document.getElementById('anakin-form');
        const submitBtn = document.getElementById('anakin-btn');
        
        const inputs = form.querySelectorAll('input, textarea');
        const counters = {
            'education': document.getElementById('edu-counter'),
            'skills': document.getElementById('skills-counter'),
            'experience': document.getElementById('exp-counter')
        };

        function validateInput(input) {
            let isValid = input.checkValidity() && input.value.trim().length > 0;
            
            // Stricter Email Validation Pattern
            if (input.id === 'email') {
                const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$/;
                isValid = isValid && emailPattern.test(input.value.trim());
            }

            if (isValid) {
                input.classList.add('valid');
                input.classList.remove('invalid');
            } else if (input.value.trim().length > 0) {
                input.classList.add('invalid');
                input.classList.remove('valid');
            } else {
                input.classList.remove('valid', 'invalid');
            }
        }

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                validateInput(input);
                if (counters[input.id]) {
                    const length = input.value.length;
                    counters[input.id].innerText = \`\${length} / 500\`;
                    if (length >= 450) counters[input.id].classList.add('limit');
                    else counters[input.id].classList.remove('limit');
                }
            });
        });

        function resetSubmitBtn() {
            submitBtn.disabled = false;
            submitBtn.innerText = 'GENERATE RESUME';
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
                experience: document.getElementById('experience').value,
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
                    window.location.href = '/' + result.id;
                } else {
                    const err = await response.json();
                    alert(err.error || 'Anakin failed.');
                    resetSubmitBtn();
                }
            } catch (err) {
                alert('Network error.');
                resetSubmitBtn();
            }
        }

        // Mobile UX: Scroll into view on focus
        const formInputs = form.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                setTimeout(() => {
                    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            });
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

export const ANAKIN_RESUME_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title id="title-tag">Professional Resume | PUNCHY.ME</title>
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%23000000' /%3E%3Cg transform='rotate(15, 50, 50)'%3E%3Cpath d='M35 25 H55 C65 25 75 32 75 45 C75 58 65 65 55 65 H45 V80' stroke='%2322c55e' stroke-width='10' stroke-linecap='round' stroke-linejoin='round' fill='none' /%3E%3Cpath d='M45 45 H55' stroke='%2322c55e' stroke-width='10' stroke-linecap='round' fill='none' /%3E%3C/g%3E%3C/svg%3E">
    
    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:title" id="og-title" content="AI Refined Resume | PUNCHY.ME">
    <meta property="og:description" id="og-description" content="View my professional digital resume. Part of the PUNCHY.ME ecosystem.">
    <meta property="og:image" content="https://punchy.me/og-image.webp">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:title" id="twitter-title" content="Professional Resume | PUNCHY.ME">
    <meta property="twitter:description" id="twitter-description" content="View my professional digital resume. Refined by Anakin AI.">
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
            align-items: flex-start;
            min-height: 100vh;
            padding: 4rem 1rem;
            line-height: 1.6;
            overflow-x: hidden;
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
            background: #111111;
            border-radius: 24px;
            max-width: 900px;
            width: 100%;
            padding: 4rem;
            box-shadow: 0 40px 100px rgba(0,0,0,0.8);
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.05);
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
            font-size: 0.75rem;
            cursor: pointer;
            text-transform: uppercase;
            font-weight: 700;
            transition: all 0.2s;
            font-family: 'JetBrains Mono', monospace;
        }
        .util-btn:hover { background: var(--accent); color: #000; border-color: var(--accent); }

        .resume-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2.5rem;
        }

        .header { margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 2rem; text-align: left; }

        .name {
            font-family: var(--font-brand);
            font-size: clamp(2.5rem, 8vw, 4.5rem);
            color: var(--text-main);
            text-transform: uppercase;
            line-height: 1;
            margin-bottom: 0.5rem;
        }

        .job-title { font-size: 1.5rem; color: var(--accent); font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 1.5rem; }

        .contact-bar {
            display: flex;
            flex-wrap: wrap;
            gap: 1.5rem;
            font-size: 0.85rem;
            color: var(--text-dim);
            font-family: var(--font-mono);
        }

        .contact-item { display: flex; align-items: center; gap: 0.5rem; text-decoration: none; color: inherit; transition: color 0.2s; }
        .contact-item:hover { color: var(--accent); }
        .contact-label { color: var(--accent); font-weight: 700; text-transform: uppercase; font-size: 0.7rem; }

        .expertise-tags {
            margin-top: 1rem;
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
            font-size: 0.8rem;
            color: var(--text-main);
            opacity: 0.9;
        }

        .expertise-tag {
            background: rgba(34, 197, 94, 0.1);
            border: 1px solid rgba(34, 197, 94, 0.2);
            padding: 4px 10px;
            border-radius: 6px;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 0.7rem;
            font-weight: 700;
        }

        .section { margin-bottom: 1rem; position: relative; }
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

        /* Glassmorphism AI Box */
        .ai-box { 
            font-size: 1rem; 
            color: var(--text-main); 
            font-weight: 400; 
            line-height: 1.6; 
            background: rgba(34, 197, 94, 0.05);
            border: 1px solid rgba(34, 197, 94, 0.2);
            padding: 1.5rem;
            border-radius: 16px;
            backdrop-filter: blur(5px);
            position: relative;
        }
        .ai-box::before {
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
            z-index: 5;
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        .ai-box[data-refined="true"]::before { opacity: 1; }

        /* Loading Animation for Hydration */
        [data-pending="true"] {
            color: var(--accent) !important;
            animation: forge-glitch 1s infinite alternate;
            opacity: 0.7;
        }

        @keyframes forge-glitch {
            0% { opacity: 0.4; filter: blur(1px); }
            100% { opacity: 1; filter: blur(0); }
        }

        .content-text { color: var(--text-main); white-space: pre-wrap; font-size: 1rem; line-height: 1.5; }

        /* Experience List Spacing */
        #res-experience ul, #res-experience ol { padding-left: 1.5rem; margin: 0; }
        #res-experience li { margin-bottom: 1.25rem; }
        #res-experience li:last-child { margin-bottom: 0; }

        /* Sidebar Elements */
        .sidebar-section { margin-bottom: 1.5rem; }
        .sidebar-label { color: var(--accent); font-size: 0.7rem; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 0.5rem; }
        .sidebar-value { color: var(--text-main); font-size: 0.9rem; word-break: break-all; text-decoration: none; display: block; }
        .sidebar-value:hover { color: var(--accent); }

        .brand-footer { grid-column: 1 / -1; margin-top: 2rem; font-size: 0.75rem; color: var(--text-dim); text-align: center; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1rem; }

        .print-footer { display: none; }

        @media print {
            @page { size: letter; margin: 10mm; }
            body { background: white !important; color: black !important; padding: 0; margin: 0; display: block !important; }
            .pixel-bg, .hud-corner, .utility-bar, .brand-footer { display: none !important; }
            .resume-card { background: white !important; color: black !important; box-shadow: none !important; border: none !important; padding: 0 !important; max-width: 100% !important; page-break-inside: avoid !important; height: auto !important; display: block !important; }
            .name { color: black !important; }
            .job-title, .section-title, .sidebar-label { color: #16a34a !important; }
            
            /* DEFINITIVE FIX: Minimalist AI summary for print */
            .ai-box { 
                background: white !important; 
                border: 1.5pt solid black !important; 
                color: black !important; 
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                padding: 10pt !important;
                margin: 10pt 0 !important;
                height: auto !important;
                min-height: 50pt !important;
                overflow: visible !important;
                backdrop-filter: none !important;
                -webkit-print-color-adjust: economy !important;
                print-color-adjust: economy !important;
            }
            .ai-box::before { 
                border: 1pt solid black !important; 
                background: white !important; 
                color: black !important; 
                top: -8pt !important;
                opacity: 1 !important;
            }
            #res-summary, #res-experience { 
                display: block !important; 
                visibility: visible !important; 
                color: black !important; 
                opacity: 1 !important;
                font-size: 11pt !important;
                line-height: 1.4 !important;
            }
            
            .content-text, .sidebar-value, .contact-item { color: black !important; }
            .contact-label { color: #16a34a !important; }
            .expertise-tag { 
                background: white !important; 
                border: 1pt solid black !important; 
                color: black !important; 
                padding: 2pt 6pt !important;
            }
            .print-footer { display: block !important; text-align: center; margin-top: 20pt; font-size: 8pt; color: #666; border-top: 0.5pt solid #ddd; padding-top: 10pt; font-weight: bold; }
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
            <h1 class="name" id="res-name">ANAKIN SKYWALKER</h1>
            <div class="job-title" id="res-job">JEDI KNIGHT</div>
            
            <div class="contact-bar">
                <a href="#" class="contact-item" id="res-email-link">
                    <svg style="width:14px;height:14px" viewBox="0 0 24 24"><path fill="currentColor" d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" /></svg>
                    <span id="res-email">anakin@force.com</span>
                </a>
                <a href="#" class="contact-item" id="res-website-link" target="_blank">
                    <svg style="width:14px;height:14px" viewBox="0 0 24 24"><path fill="currentColor" d="M7,2V13H10V22L17,10H13L17,2H7Z" /></svg>
                    <span id="res-website">PORTFOLIO</span>
                </a>
            </div>

            <div class="expertise-tags" id="res-skills">
                <span class="expertise-tag">The Force</span>
                <span class="expertise-tag">Lightsaber Combat</span>
                <span class="expertise-tag">Podracing</span>
            </div>
        </div>

        <div class="resume-grid">
            <div class="main-col">
                <div class="section">
                    <h2 class="section-title">Professional Summary</h2>
                    <div class="ai-box" id="summary-box">
                        <div id="res-summary" class="content-text">Refining professional profile...</div>
                    </div>
                </div>

                <div class="section">
                    <h2 class="section-title">Experience & Impact</h2>
                    <div class="ai-box" id="experience-box" style="font-style: italic;">
                        <div id="res-experience" class="content-text">Preparing impact data...</div>
                    </div>
                </div>

                <div class="section">
                    <h2 class="section-title">Education</h2>
                    <div class="content-text" id="res-education">Jedi Academy</div>
                </div>
            </div>
        </div>

        <div class="brand-footer">
            FORGED BY ANAKIN AI • POWERED BY PUNCHY.ME • Built with ⚡ by Toy & Gemini CLI • Expires in 3 days
        </div>
        <div class="print-footer">
            FORGED BY ANAKIN AI • POWERED BY PUNCHY.ME
        </div>
    </div>

    <script type="application/ld+json" id="schema-block"></script>

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

        // Background Animation
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

        // Client-Side AI Hydration
        async function hydrateAI() {
            const summaryEl = document.getElementById('res-summary');
            const summaryBox = document.getElementById('summary-box');
            const experienceEl = document.getElementById('res-experience');
            const experienceBox = document.getElementById('experience-box');
            const resName = document.getElementById('res-name').innerText;
            const resJob = document.getElementById('res-job').innerText;
            
            if (!summaryEl || summaryEl.getAttribute('data-pending') !== 'true') {
                updateSchema(resName, resJob, summaryEl?.innerText || '');
                if (summaryBox) summaryBox.setAttribute('data-refined', 'true');
                if (experienceBox) experienceBox.setAttribute('data-refined', 'true');
                return;
            }

            const id = window.location.pathname.substring(1);
            try {
                const response = await fetch('/anakin/hydrate/' + id, { method: 'POST' });
                if (response.ok) {
                    const data = await response.json();
                    
                    summaryEl.innerText = data.aiSummary;
                    summaryEl.removeAttribute('data-pending');
                    summaryBox.setAttribute('data-refined', 'true');
                    
                    experienceEl.innerText = data.aiExperience;
                    experienceEl.removeAttribute('data-pending');
                    experienceBox.setAttribute('data-refined', 'true');
                    experienceBox.style.fontStyle = 'normal';

                    updateSchema(resName, resJob, data.aiSummary);
                }
            } catch (err) {
                console.error('Hydration failed', err);
            }
        }

        function updateSchema(name, job, summary) {
            const schema = {
                "@context": "https://schema.org",
                "@type": "ProfilePage",
                "mainEntity": {
                    "@type": "Person",
                    "name": name,
                    "jobTitle": job,
                    "description": summary
                }
            };
            document.getElementById('schema-block').textContent = JSON.stringify(schema);
        }

        window.onload = hydrateAI;
    </script>
</body>
</html>`;
