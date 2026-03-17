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
            width: 450px;
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
            text-align: left;
        }

        label {
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #64748b;
            display: block;
            margin-bottom: 0.5rem;
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
            margin-top: 1rem;
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

        .divider {
            height: 1px;
            background: var(--border);
            width: 100%;
            margin: 2rem 0;
        }

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

        .log-entry { margin-bottom: 0.8rem; border-bottom: 1px solid rgba(255,255,255,0.02); padding-bottom: 0.5rem; }
        .log-entry.success { color: var(--accent); }
        .log-entry.info { color: #60a5fa; }
        .log-entry.error { color: #ef4444; }
        .log-entry small { display: block; font-size: 0.7rem; color: #475569; margin-top: 0.2rem; }

        ${PUNCHY_PORTAL_HTML}
    </style>
</head>
<body>
    <div class="brand-badge">[ THOR.V1 ]</div>

    <main class="main-deck">
        <div class="forge-container">
            <h1>Web Intelligence</h1>
            <p style="color: #64748b;">Turn any website into a queryable database.</p>
            
            <!-- Writer (Ingestion) -->
            <div class="input-group">
                <label>1. INGEST TARGET URL</label>
                <input type="url" id="target-url" placeholder="https://example.com" required>
                <button id="forge-btn">Forge Intelligence</button>
            </div>

            <div class="divider"></div>

            <!-- Reader (Semantic Search) -->
            <div class="input-group">
                <label>2. QUERY KNOWLEDGE BASE</label>
                <input type="text" id="query-input" placeholder="What are their core services?">
                <button id="query-btn" style="background: #60a5fa;">Execute Semantic Query</button>
            </div>
        </div>
    </main>

    <aside class="side-panel">
        <div class="log-header">
            <span>INTELLIGENCE HUD</span>
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
        const queryInput = document.getElementById('query-input');
        const queryBtn = document.getElementById('query-btn');
        const logOutput = document.getElementById('log-output');
        const statusTag = document.getElementById('status-tag');

        function addLog(msg, type = 'info', subtitle = '') {
            const entry = document.createElement('div');
            entry.className = 'log-entry ' + type;
            entry.innerHTML = '> ' + msg + (subtitle ? '<small>' + subtitle + '</small>' : '');
            logOutput.prepend(entry);
            logOutput.scrollTop = 0;
        }

        forgeBtn.addEventListener('click', async () => {
            const url = urlInput.value.trim();
            if (!url) return;

            forgeBtn.disabled = true;
            statusTag.textContent = 'FORGING';
            addLog('Initializing extraction for: ' + url);

            try {
                const res = await fetch('/thor/forge', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url })
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Extraction failed');

                addLog('Title: ' + data.title, 'success');
                addLog('Intelligence Core updated.', 'success', 'Chunks: ' + data.intelligence.chunks + ' | Words: ' + data.wordCount);
                
            } catch (err) {
                addLog('Error: ' + err.message, 'error');
            } finally {
                forgeBtn.disabled = false;
                statusTag.textContent = 'READY';
            }
        });

        queryBtn.addEventListener('click', async () => {
            const query = queryInput.value.trim();
            if (!query) return;

            queryBtn.disabled = true;
            statusTag.textContent = 'QUERYING';
            addLog('Executing query: "' + query + '"');

            try {
                const res = await fetch('/thor/query', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query })
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Query failed');

                if (data.results.length === 0) {
                    addLog('No intelligence matches found.', 'error');
                } else {
                    data.results.forEach(match => {
                        addLog('Match (Score: ' + match.score.toFixed(4) + ')', 'success', match.text + '...');
                    });
                }
                
            } catch (err) {
                addLog('Error: ' + err.message, 'error');
            } finally {
                queryBtn.disabled = false;
                statusTag.textContent = 'READY';
            }
        });
    </script>
</body>
</html>
`;
