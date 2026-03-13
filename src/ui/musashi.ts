export const MUSASHI_FORM_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MUSASHI | Cold Attack Engine | PUNCHY.ME</title>
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
            text-align: center;
            position: relative;
        }

        /* Pulse Grid Background (Inherited from YAIBA) */
        .grid-bg {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background-image: 
                linear-gradient(rgba(34, 197, 94, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.05) 1px, transparent 1px);
            background-size: 40px 40px;
            z-index: 1;
        }

        .scan-line {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100px;
            background: linear-gradient(to bottom, transparent, rgba(34, 197, 94, 0.1), transparent);
            border-bottom: 1px solid rgba(34, 197, 94, 0.2);
            z-index: 2;
            animation: scan 4s linear infinite;
            pointer-events: none;
        }

        @keyframes scan {
            0% { transform: translateY(-100px); }
            100% { transform: translateY(100vh); }
        }
        
        .container { z-index: 10; padding: 2rem; position: relative; max-width: 1100px; }
        
        .title-container {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        h1 {
            font-family: var(--font-brand);
            font-size: clamp(3rem, 12vw, 100px);
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
            content: "MUSASHI";
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

        .status-badge {
            background: var(--accent);
            color: #000;
            font-size: 0.8rem;
            font-weight: 900;
            padding: 4px 12px;
            border-radius: 6px;
            font-family: var(--font-mono);
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.6);
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .quote-box {
            margin-top: 3rem;
            border-left: 2px solid var(--accent);
            padding: 1rem 2rem;
            text-align: left;
            background: rgba(34, 197, 94, 0.03);
        }

        .quote-text {
            color: var(--text-main);
            font-size: 1.25rem;
            font-style: italic;
            line-height: 1.6;
            margin-bottom: 1rem;
        }

        .quote-author {
            color: var(--accent);
            font-weight: 700;
            text-transform: uppercase;
            font-size: 0.8rem;
            letter-spacing: 2px;
        }

        /* SHINOBI GLASS Design System */
        .panel {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 2.5rem;
            border-radius: 24px;
            transition: all 0.3s ease;
            text-align: left;
        }
        .panel:hover {
            border-color: var(--accent);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .musashi-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
            margin-top: 4rem;
            width: 100%;
        }

        @media (min-width: 900px) {
            .musashi-grid { grid-template-columns: 1fr 1fr; }
        }

        label { color: var(--text-dim); font-size: 0.75rem; text-transform: uppercase; font-weight: 700; letter-spacing: 1px; margin-bottom: 0.75rem; display: block; }
        textarea {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 1.2rem;
            border-radius: 12px;
            color: var(--text-main);
            font-family: var(--font-mono);
            width: 100%;
            min-height: 200px;
            outline: none;
            resize: vertical;
        }

        .back-home {
            position: fixed;
            top: 1.5rem;
            left: 1.5rem;
            color: var(--accent);
            text-decoration: none;
            font-size: 0.8rem;
            font-weight: 700;
            padding: 8px 12px;
            background: rgba(0,0,0,0.5);
            border: 1px solid rgba(34, 197, 94, 0.2);
            border-radius: 8px;
            backdrop-filter: blur(5px);
            z-index: 100;
            transition: all 0.3s;
        }
        .back-home:hover { opacity: 1; transform: scale(1.05); border-color: var(--accent); box-shadow: 0 0 15px rgba(34, 197, 94, 0.3); }

        /* Suite Grid Styling */
        .suite-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
            margin-top: 4rem;
            width: 100%;
        }

        @media (min-width: 768px) {
            .suite-grid { grid-template-columns: 1fr 1fr; }
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
            backdrop-filter: blur(10px);
        }

        .feature-card:hover {
            background: rgba(34, 197, 94, 0.05);
            border-color: var(--accent);
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .feature-icon { font-size: 1.5rem; color: var(--accent); margin-bottom: 1rem; display: block; }
        .feature-title { font-family: var(--font-brand); font-size: 1.75rem; margin-bottom: 0.5rem; text-transform: uppercase; }
        .feature-tagline { color: var(--text-dim); font-size: 0.85rem; line-height: 1.5; }
    </style>
</head>
<body>
    <div class="grid-bg"></div>
    <div class="scan-line"></div>
    <a href="/" class="back-home">[ ⚡ PUNCHY.ME ]</a>
    <div class="container">
        <div class="title-container">
            <h1>MUSASHI</h1>
            <span class="status-badge">COMING SOON</span>
        </div>
        
        <div class="quote-box">
            <p class="quote-text">"You must reach the point where you have no specialized equipment and depend on nothing outside yourself."</p>
            <p class="quote-author">— MIYAMOTO MUSASHI, The Book of Five Rings</p>
        </div>

        <div class="musashi-grid">
            <!-- Left Panel: The Strategic Input -->
            <div class="panel">
                <label>Target Job Intel</label>
                <textarea id="job-description" placeholder="Paste full job description here to extract tactical data..."></textarea>
                <div style="font-size: 0.7rem; color: var(--text-dim); margin-top: -1rem; margin-bottom: 1.5rem;">Maximum intel depth: 3,000 characters.</div>
                <button class="btn-forge" id="forge-btn" style="margin-top: 1.5rem; background: var(--accent); color: #000; border: none; padding: 1rem; border-radius: 12px; font-weight: 900; width: 100%; cursor: pointer; text-transform: uppercase; font-family: var(--font-mono); letter-spacing: 1px;">Execute Cold Attack</button>
            </div>

            <!-- Right Panel: Strategic Intelligence -->
            <div class="panel">
                <div id="intel-output" style="color: var(--text-dim); text-align: center; padding-top: 4rem;">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">📡</div>
                    Awaiting Target Data...
                </div>
            </div>
        </div>
    </div>

    <script>
        const forgeBtn = document.getElementById('forge-btn');
        const jobInput = document.getElementById('job-description');
        const intelOutput = document.getElementById('intel-output');

        forgeBtn.onclick = async () => {
            const description = jobInput.value.trim();
            if (description.length < 50) {
                alert("Target Intel is too shallow. Provide at least 50 characters of job description.");
                return;
            }

            // HUD STATE: Show 'Forging'
            forgeBtn.innerText = 'FORGING ATTACK PATH...';
            forgeBtn.disabled = true;
            
            intelOutput.innerHTML = \`
                <div style=\"padding-top: 4rem; text-align: center; color: var(--accent);\">
                    <div style=\"font-size: 2rem; margin-bottom: 1rem; animation: pulse 1.5s infinite;\">📡</div>
                    ANALYZING TARGET INTEL...
                </div>
            \`;

            try {
                const response = await fetch('/musashi/forge', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ description })
                });

                if (response.ok) {
                    const data = await response.json();
                    renderIntelligence(data);
                } else {
                    const err = await response.json();
                    alert(err.error || 'Forge failed.');
                }
            } catch (err) {
                alert('Network strike failed. Check connection.');
            } finally {
                forgeBtn.innerText = 'Execute Cold Attack';
                forgeBtn.disabled = false;
            }
        };

        function renderIntelligence(data) {
            // Placeholder for Phase 3 rendering logic
            intelOutput.innerHTML = \`<pre style=\"color: var(--text-main); font-size: 0.8rem; text-align: left; overflow: auto; max-height: 500px;\">\${JSON.stringify(data, null, 2)}</pre>\`;
        }

        const bg = document.getElementById('pixel-bg');
        // Animation logic here...
    </script>
</body>
</html>`;
