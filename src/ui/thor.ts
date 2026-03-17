import { PUNCHY_PORTAL_HTML } from './portal';

export const THOR_UI_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>THOR | Web Intelligence Engine</title>
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <style>
        :root {
            --bg: #000000;
            --fg: #f8fafc;
            --accent: #22c55e;
            --glass: rgba(255, 255, 255, 0.03);
            --border: rgba(255, 255, 255, 0.08);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background: var(--bg);
            color: var(--fg);
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            height: 100vh;
            display: flex;
            overflow: hidden;
        }

        /* Tactical HUD Layout */
        .main-deck {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 2rem;
            position: relative;
        }

        .side-panel {
            width: 400px;
            background: rgba(0, 0, 0, 0.5);
            border-left: 1px solid var(--border);
            backdrop-filter: blur(20px);
            display: flex;
            flex-direction: column;
            padding: 1.5rem;
        }

        .brand-badge {
            position: absolute;
            top: 2rem;
            left: 2rem;
            font-family: monospace;
            color: var(--accent);
            letter-spacing: 2px;
            font-weight: bold;
        }

        /* Form Styling */
        .forge-container {
            width: 100%;
            max-width: 500px;
            text-align: center;
        }

        h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            letter-spacing: -1px;
        }

        .input-group {
            position: relative;
            margin-top: 2rem;
        }

        .visually-hidden {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }

        input {
            width: 100%;
            background: var(--glass);
            border: 1px solid var(--border);
            padding: 1.2rem;
            color: var(--fg);
            font-size: 1rem;
            outline: none;
            transition: border-color 0.3s ease;
        }

        input:focus { border-color: var(--accent); }

        button {
            margin-top: 1.5rem;
            width: 100%;
            background: var(--accent);
            color: #000;
            border: none;
            padding: 1.2rem;
            font-weight: 900;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 2px;
            transition: opacity 0.3s ease;
        }

        button:hover { opacity: 0.9; }
        button:disabled { opacity: 0.5; cursor: not-allowed; }

        /* Intelligence Log */
        .log-header {
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: var(--accent);
            margin-bottom: 1.5rem;
            display: flex;
            justify-content: space-between;
        }

        #log-output {
            flex: 1;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.85rem;
            overflow-y: auto;
            color: #94a3b8;
            line-height: 1.6;
        }

        .log-entry { margin-bottom: 0.5rem; }
        .log-entry.success { color: var(--accent); }
        .log-entry.info { color: #60a5fa; }
        .log-entry.error { color: #ef4444; }

        ${PUNCHY_PORTAL_HTML}
    </style>
</head>
<body>
    <div class="brand-badge">[ THOR.V1 ]</div>

    <main class="main-deck">
        <div class="forge-container">
            <h1>Web Intelligence</h1>
            <p style="color: #64748b;">Transform any website into a queryable database.</p>
            
            <div class="input-group">
                <input type="url" id="target-url" placeholder="https://example.com" required>
                <input type="text" id="hp_field" class="visually-hidden" tabindex="-1" autocomplete="off">
                <button id="forge-btn">Forge Intelligence</button>
            </div>
        </div>
    </main>

    <aside class="side-panel">
        <div class="log-header">
            <span>INTELLIGENCE LOG</span>
            <span id="status-tag">READY</span>
        </div>
        <div id="log-output">
            <div class="log-entry info">> Initialize system...</div>
            <div class="log-entry info">> Awaiting deployment directives.</div>
        </div>
    </aside>

    <script>
        const urlInput = document.getElementById('target-url');
        const forgeBtn = document.getElementById('forge-btn');
        const logOutput = document.getElementById('log-output');
        const statusTag = document.getElementById('status-tag');
        const hpField = document.getElementById('hp_field');

        function addLog(msg, type = 'info') {
            const entry = document.createElement('div');
            entry.className = 'log-entry ' + type;
            entry.textContent = '> ' + msg;
            logOutput.appendChild(entry);
            logOutput.scrollTop = logOutput.scrollHeight;
        }

        forgeBtn.addEventListener('click', async () => {
            const url = urlInput.value.trim();
            if (!url) return;

            forgeBtn.disabled = true;
            statusTag.textContent = 'WORKING';
            addLog('Initializing extraction for: ' + url);

            try {
                const res = await fetch('/thor/forge', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url, hp_field: hpField.value })
                });

                const data = await res.json();

                if (!res.ok) throw new Error(data.error || 'Extraction failed');

                addLog('Title: ' + data.title, 'success');
                addLog('Links Found: ' + data.links.length);
                addLog('Storage: ' + (data.storage && data.storage.persisted ? 'ONLINE' : 'DEGRADED'), data.storage && data.storage.persisted ? 'success' : 'error');
                addLog('Semantic Memory: ' + (data.intelligence && data.intelligence.semantic ? 'SYNCED' : 'PARTIAL'), data.intelligence && data.intelligence.semantic ? 'success' : 'error');
                addLog('Status: ' + data.status, data.status === 'completed' ? 'success' : 'info');
                if (data.intelligence && data.intelligence.truncated) {
                    addLog('Large page detected. Intelligence payload was capped.', 'info');
                }
                
            } catch (err) {
                const message = err instanceof Error ? err.message : 'Unknown error';
                addLog('Error: ' + message, 'error');
            } finally {
                forgeBtn.disabled = false;
                statusTag.textContent = 'READY';
            }
        });
    </script>
</body>
</html>
`;
