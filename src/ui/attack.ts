export const ATTACK_FORM_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MUSASHI | Cold Attack Engine | PUNCHY.ME</title>
    <meta name="description" content="Forge a high-conversion career attack path. Analyze job intel and generate elite outreach in seconds.">
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%23000000' /%3E%3Cg transform='rotate(15, 50, 50)'%3E%3Cpath d='M35 25 H55 C65 25 75 32 75 45 C75 58 65 65 55 65 H45 V80' stroke='%2322c55e' stroke-width='10' stroke-linecap='round' stroke-linejoin='round' fill='none' /%3E%3Cpath d='M45 45 H55' stroke='%2322c55e' stroke-width='10' stroke-linecap='round' fill='none' /%3E%3C/g%3E%3C/svg%3E">
    <link href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
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

        html, body { height: 100%; margin: 0; padding: 0; }

        body {
            background-color: var(--bg);
            color: var(--text-main);
            font-family: var(--font-mono);
            display: flex;
            justify-content: center;
            align-items: flex-start;
            min-height: 100vh;
            position: relative;
            padding: 6rem 1.5rem 2rem;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
        }

        .back-home {
            position: fixed;
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
            max-width: 1100px;
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
        }

        .attack-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
            margin-top: 3rem;
            text-align: left;
        }

        @media (min-width: 900px) {
            .attack-grid { grid-template-columns: 1fr 1.2fr; }
        }

        .panel {
            background: var(--card-bg);
            padding: 2.5rem;
            border-radius: 24px;
            border: 1px solid rgba(255, 255, 255, 0.05);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        label { color: var(--text-dim); font-size: 0.75rem; text-transform: uppercase; font-weight: 700; letter-spacing: 1px; margin-bottom: 0.75rem; display: block; }

        textarea, select {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 1.2rem;
            border-radius: 12px;
            color: var(--text-main);
            font-family: var(--font-mono);
            outline: none;
            transition: all 0.2s;
            width: 100%;
            margin-bottom: 1.5rem;
        }

        textarea:focus { border-color: var(--accent); background: rgba(255, 255, 255, 0.08); }

        textarea { min-height: 300px; resize: vertical; }

        .btn-forge {
            background: var(--accent);
            color: #052e16;
            border: none;
            padding: 1.2rem;
            border-radius: 12px;
            font-weight: 700;
            width: 100%;
            cursor: pointer;
            text-transform: uppercase;
            font-family: var(--font-mono);
            transition: all 0.3s;
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.2);
        }
        .btn-forge:hover { transform: scale(1.02); background: var(--accent-hover); box-shadow: 0 0 30px rgba(34, 197, 94, 0.4); }

        .intel-block { margin-bottom: 2rem; }
        .intel-title { color: var(--accent); font-size: 0.9rem; font-weight: 700; margin-bottom: 0.5rem; text-transform: uppercase; }
        .intel-content { color: var(--text-main); font-size: 0.95rem; line-height: 1.6; }

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
        @keyframes drift { 0% { transform: translateX(0); opacity: 0; } 5% { opacity: 1; } 100% { transform: translateX(calc(100vw + 20px)); opacity: 0; } }
    </style>
</head>
<body>
    <div class="pixel-bg" id="pixel-bg"></div>
    <a href="/" class="back-home">[ ⚡ PUNCHY.ME ]</a>

    <div class="container">
        <div class="title-container">
            <h1>MUSASHI</h1>
            <span class="beta-badge">BETA</span>
        </div>
        <p style="color: var(--text-dim); margin-bottom: 2rem;">Elite Career Outreach Strategist. Paste Job Intel to Forge your Attack Path.</p>

        <div class="attack-grid">
            <!-- Input Panel -->
            <div class="panel">
                <label>Target Job Description</label>
                <textarea id="job-description" placeholder="Paste the full job description here..."></textarea>
                
                <label>Select User Arsenal (Optional)</label>
                <select id="user-profile">
                    <option value="">No Profile (Standard Attack)</option>
                    <!-- Hydrated from local storage or recent builds -->
                </select>

                <button class="btn-forge" id="forge-btn">Forge Attack Path</button>
            </div>

            <!-- Intelligence Panel -->
            <div class="panel" style="background: rgba(17, 17, 17, 0.6);">
                <div id="output-placeholder" style="color: var(--text-dim); text-align: center; padding-top: 4rem;">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">📡</div>
                    Awaiting Target Intel...
                </div>
                <div id="attack-output" style="display: none;">
                    <!-- Hydrated by AI -->
                </div>
            </div>
        </div>
    </div>

    <script>
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

        const forgeBtn = document.getElementById('forge-btn');
        forgeBtn.onclick = () => {
            forgeBtn.innerText = 'FORGING PATH...';
            forgeBtn.disabled = true;
            // logic to be implemented
        };
    </script>
</body>
</html>`;
