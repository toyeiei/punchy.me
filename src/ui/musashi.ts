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
            overflow-y: auto;
            overflow-x: hidden;
            text-align: center;
            position: relative;
            padding: 0;
        }

        /* Pulse Grid Background */
        .grid-bg {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background-image: 
                linear-gradient(rgba(34, 197, 94, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.05) 1px, transparent 1px);
            background-size: 40px 40px;
            z-index: -1;
        }

        .scan-line {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100px;
            background: linear-gradient(to bottom, transparent, rgba(34, 197, 94, 0.1), transparent);
            border-bottom: 1px solid rgba(34, 197, 94, 0.2);
            z-index: 0;
            animation: scan 4s linear infinite;
            pointer-events: none;
        }

        @keyframes scan {
            0% { transform: translateY(-100px); }
            100% { transform: translateY(100vh); }
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
            z-index: 10; 
            padding: 6rem 2rem 2rem; 
            position: relative; 
            max-width: 1100px; 
            width: 100%;
            flex-grow: 1;
        }
        
        .title-container {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        h1 {
            font-family: var(--font-brand); font-size: clamp(3rem, 12vw, 100px); font-weight: 900;
            color: var(--text-main);
            letter-spacing: -2px;
            text-transform: uppercase;
            position: relative;
            animation: main-glitch 5s infinite;
        }

        @keyframes main-glitch {
            0%, 80%, 100% { transform: skew(0deg); text-shadow: none; }
            81% { transform: skew(2deg); text-shadow: 1px 0 #ff00ff; }
            82% { transform: skew(-2deg); text-shadow: -1px 0 #00ffff; }
            83% { transform: skew(0deg); text-shadow: none; }
        }

        .status-badge {
            background: var(--accent);
            color: #000;
            font-size: 0.8rem;
            font-weight: 900; /* already heavy */
            padding: 4px 12px;
            border-radius: 6px;
            font-family: var(--font-mono);
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.6);
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .quote-box {
            margin-top: 1rem;
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

        .panel {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(10px);
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
            margin-top: 48px;
            width: 100%;
        }

        @media (min-width: 900px) {
            .musashi-grid { grid-template-columns: 1fr 1fr; }
        }

        label { color: var(--text-dim); font-size: 0.75rem; text-transform: uppercase; font-weight: 700; letter-spacing: 1px; margin-bottom: 0.75rem; display: block; }
        textarea {
            background: #000000;
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
        .intel-title { color: var(--accent); font-size: 0.8rem; font-weight: 900; /* already heavy */ margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 2px; display: flex; align-items: center; gap: 0.5rem; }
        .intel-content { color: var(--text-main); font-size: 0.95rem; line-height: 1.6; white-space: pre-wrap; }
        
        .skills-container {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
            margin-top: 1rem;
        }
        .skill-badge {
            background: rgba(34, 197, 94, 0.1);
            color: #ffffff;
            border: 1px solid var(--accent);
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .json-fallback {
            background: rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 1.5rem;
            border-radius: 12px;
            font-family: var(--font-mono);
            font-size: 0.85rem;
            text-align: left;
            white-space: pre-wrap;
            overflow-x: auto;
            line-height: 1.5;
        }
        .json-key { color: var(--accent); }
        .json-string { color: #ffffff; }
        .json-number { color: #fbbf24; }
        .json-boolean { color: #f472b6; }

        .view-toggle {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 1.5rem;
            gap: 1rem;
        }
        .toggle-btn {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            color: var(--text-dim);
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 0.7rem;
            font-weight: 700;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: all 0.2s;
            font-family: var(--font-mono);
        }
        .toggle-btn.active {
            background: var(--accent);
            color: #000;
            border-color: var(--accent);
            box-shadow: 0 0 10px rgba(34, 197, 94, 0.3);
        }

        .terminal-log {
            font-family: var(--font-mono);
            font-size: 0.8rem;
            color: var(--accent);
            text-align: left;
            padding: 2rem;
            line-height: 2;
            opacity: 0.8;
        }
        .log-line { overflow: hidden; white-space: nowrap; border-right: 2px solid var(--accent); animation: typing 2s steps(40, end), blink .75s step-end infinite; margin-bottom: 0.5rem; width: fit-content; }
        @keyframes typing { from { width: 0 } to { width: 100% } }
        @keyframes blink { from, to { border-color: transparent } 50% { border-color: var(--accent); } }

        .btn-forge {
            margin-top: 0.5rem;
            background: var(--accent);
            color: #000;
            border: none;
            padding: 1rem;
            border-radius: 12px;
            font-weight: 900; /* already heavy */
            width: 100%;
            cursor: pointer;
            text-transform: uppercase;
            font-family: var(--font-mono);
            letter-spacing: 1px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 0 10px rgba(34, 197, 94, 0.2);
        }
        .btn-forge:hover {
            transform: scale(1.02);
            background: var(--accent-hover);
            box-shadow: 0 0 25px rgba(34, 197, 94, 0.5);
        }
        .btn-forge:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
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

        .pixel-bg {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            z-index: -1;
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

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up {
            animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
    </style>
</head>
<body>
    <div class="grid-bg"></div>
    <div class="scan-line"></div>
    <div class="pixel-bg" id="pixel-bg"></div>
    <a href="/" class="back-home">[ ⚡ PUNCHY.ME ]</a>

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
            <h1>MUSASHI</h1>
            <span class="status-badge">BETA</span>
        </div>
        
        <div class="quote-box">
            <p class="quote-text">"You must reach the point where you have no specialized equipment and depend on nothing outside yourself."</p>
            <p class="quote-author">— MIYAMOTO MUSASHI, The Book of Five Rings</p>
        </div>

        <div class="musashi-grid">
            <div class="panel">
                <label>Target Job Intel</label>
                <div style="display: none;"><input type="text" id="hp_field" tabindex="-1" autocomplete="off"></div>
                <textarea id="job-description" placeholder="Paste full job description here to extract tactical data..." maxlength="1000"></textarea>
                <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: var(--text-dim); margin-bottom: 1.5rem;">
                    <div>Maximum intel depth: 1,000 characters.</div>
                    <div id="char-counter">0 / 1000</div>
                </div>
                <button class="btn-forge" id="forge-btn">Get Musashi's Advice</button>
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
        let lastForgedData = null;
        let currentViewMode = 'tactical';

        window.onload = () => {
            const forgeBtn = document.getElementById('forge-btn');
            const jobInput = document.getElementById('job-description');
            const intelOutput = document.getElementById('intel-output');
            const charCounter = document.getElementById('char-counter');
            const bg = document.getElementById('pixel-bg');

            jobInput.addEventListener('input', () => {
                const count = jobInput.value.length;
                charCounter.innerText = count.toLocaleString() + ' / 1000';
                charCounter.style.color = count > 800 ? '#ff4444' : 'var(--text-dim)';
            });

            forgeBtn.onclick = async () => {
                const description = jobInput.value.trim();
                if (description.length < 50) {
                    alert('Target Intel is too shallow. Provide at least 50 characters.');
                    return;
                }

                forgeBtn.innerText = 'FORGING ATTACK PATH...';
                forgeBtn.disabled = true;
                
                intelOutput.style.paddingTop = '0';
                intelOutput.innerHTML = '<div class="terminal-log"></div>';
                const log = intelOutput.querySelector('.terminal-log');
                const messages = [
                    '> INITIALIZING MUSASHI AI...',
                    '> PARSING JOB TARGET...',
                    '> ANALYZING ARSENAL MATCHES...',
                    '> FORGING TACTICAL ATTACK PATH...'
                ];
                
                let currentMsg = 0;
                const logInterval = setInterval(() => {
                    if (currentMsg < messages.length) {
                        const line = document.createElement('div');
                        line.className = 'log-line';
                        line.innerText = messages[currentMsg];
                        log.appendChild(line);
                        currentMsg++;
                    } else {
                        clearInterval(logInterval);
                    }
                }, 1000);

                try {
                    const hp_field = document.getElementById('hp_field').value;
                    const response = await fetch('/musashi/forge', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ description, hp_field })
                    });

                    if (response.ok) {
                        const data = await response.json();
                        clearInterval(logInterval);
                        if (data && (data.intel || data.skills)) {
                            lastForgedData = data;
                            renderIntelligence(data, intelOutput);
                        } else {
                            alert('Forge error: Intelligence schema mismatched.');
                        }
                    } else {
                        const err = await response.json();
                        alert('Forge failed: ' + (err.error || 'Unknown error'));
                        clearInterval(logInterval);
                    }
                } catch (err) {
                    alert('Network strike failed: ' + err.message);
                    clearInterval(logInterval);
                } finally {
                    forgeBtn.innerText = "Get Musashi's Advice";
                    forgeBtn.disabled = false;
                }
            };

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
        };

        window.switchView = (mode) => {
            currentViewMode = mode;
            if (lastForgedData) {
                renderIntelligence(lastForgedData, document.getElementById('intel-output'));
            }
        };

        function syntaxHighlight(json) {
            if (typeof json != 'string') json = JSON.stringify(json, undefined, 2);
            json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return json.replace(/("(\\\\u[a-zA-Z0-9]{4}|\\\\[^u]|[^\\\\"])*"(\\\\s*:)?|\\\\b(true|false|null)\\\\b|-?\\\\d+(?:\\\\.\\\\d*)?(?:[eE][+\\\\-]?\\\\d+)?)/g, (match) => {
                let cls = 'json-number';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) cls = 'json-key';
                    else cls = 'json-string';
                } else if (/true|false/.test(match)) cls = 'json-boolean';
                return '<span class="' + cls + '">' + match + '</span>';
            });
        }

        function renderIntelligence(data, container) {
            container.style.paddingTop = '0';
            container.classList.remove('fade-in-up');
            void container.offsetWidth; 
            container.classList.add('fade-in-up');
            
            let html = '<div class="view-toggle">';
            html += '<button class="toggle-btn ' + (currentViewMode === 'tactical' ? 'active' : '') + '" onclick="switchView(\\'tactical\\')">Musashi\\'s Analysis</button>';
            html += '<button class="toggle-btn ' + (currentViewMode === 'raw' ? 'active' : '') + '" onclick="switchView(\\'raw\\')">Raw JSON</button>';
            html += '</div>';

            if (currentViewMode === 'raw') {
                html += '<div class="intel-block" style="text-align: left;"><div class="intel-title"><span>🛠️</span> Strategic JSON</div>';
                html += '<pre class="json-fallback">' + syntaxHighlight(data) + '</pre></div>';
                container.innerHTML = html;
                return;
            }
            
            const formatList = (arr) => {
                if (!Array.isArray(arr)) return arr;
                return arr.map(item => '• ' + item).join('<br><br>');
            };

            if (data.intel) {
                html += '<div class=\"intel-block\" style=\"text-align: left;\"><div class=\"intel-title\"><span>📡</span> Target Summary</div>';
                html += '<div class=\"intel-content\">' + data.intel + '</div></div>';
            }

            if (data.skills && Array.isArray(data.skills)) {
                html += '<div class=\"intel-block\" style=\"text-align: left;\"><div class=\"intel-title\"><span>⚡</span> CORE SKILLS</div>';
                html += '<div class=\"skills-container\">';
                data.skills.forEach(skill => {
                    html += '<span class=\"skill-badge\">' + skill + '</span>';
                });
                html += '</div></div>';
            }
            
            if (data.projects) {
                html += '<div class=\"intel-block\" style=\"text-align: left;\"><div class=\"intel-title\"><span>🎯</span> PORTFOLIO PROJECTS</div>';
                html += '<div class=\"intel-content\">' + formatList(data.projects) + '</div></div>';
            }

            if (data.salary) {
                html += '<div class=\"intel-block\" style=\"text-align: left;\"><div class=\"intel-title\"><span>💰</span> Market Intel</div>';
                html += '<div class=\"intel-content\"><strong>ESTIMATED RANGE:</strong> ' + data.salary + '</div></div>';
            }

            if (data.questions) {
                html += '<div class=\"intel-block\" style=\"text-align: left;\"><div class=\"intel-title\"><span>⚔️</span> KEY INTERVIEW QUESTIONS</div>';
                html += '<div class=\"intel-content\">' + formatList(data.questions) + '</div></div>';
            }

            container.innerHTML = html;
        }
    </script>
</body>
</html>`;
