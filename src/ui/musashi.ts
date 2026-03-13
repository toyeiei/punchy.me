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

        /* Pulse Grid Background */
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
            margin-top: 1rem; /* Moved closer to title */
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
            margin-top: 48px; /* Standardized to exactly 48px */
            width: 100%;
        }

        @media (min-width: 900px) {
            .musashi-grid { grid-template-columns: 1fr 1fr; }
        }

        label { color: var(--text-dim); font-size: 0.75rem; text-transform: uppercase; font-weight: 700; letter-spacing: 1px; margin-bottom: 0.75rem; display: block; }
        textarea {
            background: #000000; /* Solid background for clear text */
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

        .intel-block { margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 1.5rem; }
        .intel-title { color: var(--accent); font-size: 0.8rem; font-weight: 900; margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 2px; display: flex; align-items: center; gap: 0.5rem; }
        .intel-content { color: var(--text-main); font-size: 0.95rem; line-height: 1.6; white-space: pre-wrap; }
        
        .copy-action {
            background: rgba(34, 197, 94, 0.1);
            border: 1px solid rgba(34, 197, 94, 0.3);
            color: var(--accent);
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 0.7rem;
            font-weight: 700;
            cursor: pointer;
            margin-top: 1rem;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.2s;
        }
        .copy-action:hover { background: var(--accent); color: #000; }

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
            z-index: 1;
        }
    </style>
</head>
<body>
    <div class="grid-bg"></div>
    <div class="scan-line"></div>
    <div class="pixel-bg" id="pixel-bg"></div>
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
            <div class="panel">
                <label>Target Job Intel</label>
                <textarea id="job-description" placeholder="Paste full job description here to extract tactical data..."></textarea>
                <div style="font-size: 0.7rem; color: var(--text-dim); margin-bottom: 1.5rem;">Maximum intel depth: 3,000 characters.</div>
                <button class="btn-forge" id="forge-btn" style="margin-top: 0.5rem; background: var(--accent); color: #000; border: none; padding: 1rem; border-radius: 12px; font-weight: 900; width: 100%; cursor: pointer; text-transform: uppercase; font-family: var(--font-mono); letter-spacing: 1px;">Execute Cold Attack</button>
            </div>

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

            forgeBtn.innerText = 'FORGING ATTACK PATH...';
            forgeBtn.disabled = true;
            intelOutput.innerHTML = '<div style="padding-top: 4rem; text-align: center; color: var(--accent);"><div style="font-size: 2rem; margin-bottom: 1rem; animation: pulse 1.5s infinite;">📡</div>ANALYZING TARGET INTEL...</div>';

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
                alert('Network strike failed.');
            } finally {
                forgeBtn.innerText = 'Execute Cold Attack';
                forgeBtn.disabled = false;
            }
        };

        function renderIntelligence(data) {
            intelOutput.style.paddingTop = '0';
            let html = '';
            html += '<div class="intel-block"><div class="intel-title"><span>📡</span> Target Intel</div>';
            html += '<div class="intel-content">' + data.intel + '</div></div>';
            html += '<div class="intel-block"><div class="intel-title"><span>🎯</span> Strategic Analysis</div>';
            html += '<div class="intel-content">' + data.analysis + '</div></div>';
            html += '<div class="intel-block"><div class="intel-title"><span>⚔️</span> The Tactical Hook (LinkedIn)</div>';
            html += '<div class="intel-content" id="hook-text">' + data.hook + '</div>';
            html += '<button class="copy-action" onclick="copyToClipboard(\\'hook-text\\', this)">Copy Hook to Arsenal</button></div>';
            html += '<div class="intel-block"><div class="intel-title"><span>🔥</span> The Deep Strike (Email)</div>';
            html += '<div class="intel-content" id="strike-text">' + data.strike + '</div>';
            html += '<button class="copy-action" onclick="copyToClipboard(\\'strike-text\\', this)">Copy Strike to Arsenal</button></div>';
            intelOutput.innerHTML = html;
        }

        window.copyToClipboard = (elementId, btn) => {
            const text = document.getElementById(elementId).innerText;
            navigator.clipboard.writeText(text).then(() => {
                const originalText = btn.innerText;
                btn.innerText = 'COPIED TO ARSENAL';
                btn.style.background = 'var(--accent)';
                btn.style.color = '#000';
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = 'rgba(34, 197, 94, 0.1)';
                    btn.style.color = 'var(--accent)';
                }, 2000);
            });
        };

        const bg = document.getElementById('pixel-bg');
        function createPixel() {
            const pixel = document.createElement('div');
            pixel.className = 'pixel';
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
