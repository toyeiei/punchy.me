export const LOKI_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LOKI | Support & Tactical Timeline | PUNCHY.ME</title>
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
        body {
            background-color: var(--bg);
            color: var(--text-main);
            font-family: var(--font-mono);
            display: flex;
            justify-content: center;
            align-items: flex-start;
            min-height: 100vh;
            overflow-y: auto;
            overflow-x: hidden;
            text-align: center;
            position: relative;
            padding: 4rem 0;
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
        
        .container { z-index: 10; padding: 2rem; position: relative; max-width: 1100px; width: 95%; }
        
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

        /* SHINOBI GLASS Design System */
        .panel {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 2rem;
            border-radius: 24px;
            transition: all 0.3s ease;
            text-align: left;
        }
        .panel:hover {
            border-color: var(--accent);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .loki-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
            margin-top: 48px;
            width: 100%;
        }

        @media (min-width: 900px) {
            .loki-grid { grid-template-columns: 1.2fr 1fr; }
        }

        label { color: var(--text-dim); font-size: 0.75rem; text-transform: uppercase; font-weight: 700; letter-spacing: 1px; margin-bottom: 0.5rem; display: block; }
        input, textarea {
            background: #000000;
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 1rem;
            border-radius: 12px;
            color: var(--text-main);
            font-family: var(--font-mono);
            width: 100%;
            outline: none;
            margin-bottom: 1.5rem;
        }
        textarea { min-height: 120px; resize: vertical; }

        .btn-loki {
            background: var(--accent);
            color: #000;
            border: none;
            padding: 1rem;
            border-radius: 12px;
            font-weight: 900;
            width: 100%;
            cursor: pointer;
            text-transform: uppercase;
            font-family: var(--font-mono);
            letter-spacing: 1px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn-loki:hover {
            transform: scale(1.02);
            background: var(--accent-hover);
            box-shadow: 0 0 25px rgba(34, 197, 94, 0.5);
        }

        /* Timeline Styles */
        .timeline {
            position: relative;
            padding-left: 2rem;
            border-left: 2px solid rgba(34, 197, 94, 0.2);
        }
        .timeline-entry {
            position: relative;
            margin-bottom: 2.5rem;
            animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .timeline-entry::before {
            content: "";
            position: absolute;
            left: calc(-2rem - 7px);
            top: 0.5rem;
            width: 12px; height: 12px;
            background: var(--accent);
            border-radius: 50%;
            box-shadow: 0 0 10px var(--accent);
        }
        .timeline-date {
            font-size: 0.7rem;
            color: var(--accent);
            font-weight: 700;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
        }
        .timeline-content {
            color: var(--text-main);
            font-size: 0.9rem;
            line-height: 1.6;
        }

        .back-home {
            position: fixed; top: 1.5rem; left: 1.5rem;
            color: var(--accent); text-decoration: none; font-size: 0.8rem; font-weight: 700;
            padding: 8px 12px; background: rgba(0,0,0,0.5); border: 1px solid rgba(34, 197, 94, 0.2);
            border-radius: 8px; backdrop-filter: blur(5px); z-index: 100;
        }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .pixel-bg { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none; }
        .pixel { position: absolute; width: 3px; height: 3px; background: rgba(255, 255, 255, 0.4); animation: drift var(--duration) linear infinite; top: var(--top); left: -10px; }
        @keyframes drift { 0% { transform: translateX(0); opacity: 0; } 10% { opacity: 0.3; } 100% { transform: translateX(100vw); opacity: 0; } }
    </style>
</head>
<body>
    <div class="grid-bg"></div>
    <div class="scan-line"></div>
    <div class="pixel-bg" id="pixel-bg"></div>
    <a href="/" class="back-home">[ ⚡ PUNCHY.ME ]</a>
    
    <div class="container">
        <div class="title-container">
            <h1>LOKI</h1>
            <span class="status-badge">MVP</span>
        </div>

        <div class="loki-grid">
            <!-- Left: Support Form -->
            <div class="panel">
                <label style="color: var(--accent); font-size: 1rem; margin-bottom: 1.5rem;">Strategic Support</label>
                <div style="display: none;"><input type="text" id="hp_field" tabindex="-1" autocomplete="off"></div>
                
                <label>Identify Yourself</label>
                <input type="text" id="supporter-name" placeholder="Agent Name">
                
                <label>Digital Frequency (Email)</label>
                <input type="email" id="supporter-email" placeholder="agent@high-table.com">
                
                <label>Strategic Message</label>
                <textarea id="supporter-message" placeholder="Optional brief for the strategist..."></textarea>
                
                <button class="btn-loki" id="support-btn">Pledge Support</button>
            </div>

            <!-- Right: Tactical Timeline -->
            <div class="panel">
                <label style="color: var(--accent); font-size: 1rem; margin-bottom: 1.5rem;">Tactical Timeline</label>
                <div class="timeline" id="timeline-container">
                    <div style="text-align: center; color: var(--text-dim); padding: 2rem;">Synchronizing with D1...</div>
                </div>
            </div>
        </div>
    </div>

    <script>
        window.onload = async () => {
            const supportBtn = document.getElementById('support-btn');
            const timelineContainer = document.getElementById('timeline-container');

            // 1. Fetch Timeline
            async function refreshTimeline() {
                try {
                    const res = await fetch('/loki/timeline');
                    if (res.ok) {
                        const data = await res.json();
                        if (data.length > 0) {
                            let html = '';
                            data.forEach(entry => {
                                html += '<div class="timeline-entry">';
                                html += '<div class="timeline-date">' + new Date(entry.created_at).toLocaleDateString() + '</div>';
                                html += '<div class="timeline-content">' + entry.content + '</div>';
                                html += '</div>';
                            });
                            timelineContainer.innerHTML = html;
                        } else {
                            timelineContainer.innerHTML = '<div style="color: var(--text-dim)">Timeline is currently silent.</div>';
                        }
                    }
                } catch (e) {
                    timelineContainer.innerHTML = '<div style="color: #ff4444">Connection Failed.</div>';
                }
            }

            refreshTimeline();

            // 2. Support Action
            supportBtn.onclick = async () => {
                const name = document.getElementById('supporter-name').value.trim();
                const email = document.getElementById('supporter-email').value.trim();
                const message = document.getElementById('supporter-message').value.trim();
                const hp_field = document.getElementById('hp_field').value;

                if (!name || !email) {
                    alert('Identity and Frequency are mandatory.');
                    return;
                }

                supportBtn.innerText = 'SYNCING PLEDGE...';
                supportBtn.disabled = true;

                try {
                    const res = await fetch('/loki/support', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name, email, message, hp_field })
                    });

                    if (res.ok) {
                        alert('Pledge Recorded. The Strategist thanks you.');
                        document.getElementById('supporter-name').value = '';
                        document.getElementById('supporter-email').value = '';
                        document.getElementById('supporter-message').value = '';
                    } else {
                        const err = await res.json();
                        alert('Forge Failed: ' + (err.error || 'Unknown Error'));
                    }
                } catch (e) {
                    alert('Network strike failed.');
                } finally {
                    supportBtn.innerText = 'Pledge Support';
                    supportBtn.disabled = false;
                }
            };

            // 3. Pixel Background
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
        };
    </script>
</body>
</html>`;
