export const ODIN_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ODIN | Tactical Terminal Data | PUNCHY.ME</title>
    <link href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/arquero@latest"></script>
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
            height: 100vh;
            overflow: hidden;
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
            background: linear-gradient(to bottom, transparent, rgba(34, 197, 94, 0.08), transparent);
            border-bottom: 1px solid rgba(34, 197, 94, 0.15);
            z-index: 2;
            animation: scan 6s linear infinite;
            pointer-events: none;
            will-change: transform;
            transform: translateZ(0);
        }

        @keyframes scan {
            0% { transform: translateY(-100px) translateZ(0); }
            100% { transform: translateY(100vh) translateZ(0); }
        }

        /* ODIN BRANDING (Massive) */
        .odin-brand-container {
            position: fixed;
            top: 1.5rem;
            left: 1.5rem;
            z-index: 100;
            pointer-events: none;
        }
        .odin-brand {
            font-family: var(--font-brand);
            font-size: 4.5rem;
            color: var(--text-main);
            line-height: 0.8;
            letter-spacing: -3px;
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
        }
        .odin-desc {
            font-family: var(--font-mono);
            font-size: 0.7rem;
            color: var(--accent);
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-top: 0.5rem;
            font-weight: bold;
        }

        /* Tactical Header (Top Right) */
        .tactical-header {
            position: fixed;
            top: 1.5rem;
            right: 1.5rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            z-index: 100;
        }
        .badge {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 0.7rem;
            color: var(--accent);
            font-weight: bold;
            letter-spacing: 1px;
            min-width: 120px; /* Prevent header shift */
            text-align: center;
        }
        
        @keyframes neon-glow {
            0% { box-shadow: 0 0 5px rgba(34, 197, 94, 0.2); }
            50% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.6); }
            100% { box-shadow: 0 0 5px rgba(34, 197, 94, 0.2); }
        }

        .btn-demo {
            background: rgba(255, 255, 255, 0.05);
            color: var(--text-dim);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 8px 16px;
            border-radius: 8px;
            font-family: var(--font-mono);
            font-size: 0.7rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }
        .btn-demo:hover {
            background: rgba(255, 255, 255, 0.1);
            color: var(--text-main);
            transform: translateY(-2px);
        }

        .punchy-badge {
            text-decoration: none;
            color: var(--text-main);
            font-family: var(--font-mono);
            font-weight: bold;
            font-size: 0.8rem;
            background: rgba(0,0,0,0.5);
            padding: 8px 12px;
            border: 1px solid rgba(34, 197, 94, 0.2);
            border-radius: 8px;
            backdrop-filter: blur(5px);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .punchy-badge:hover {
            border-color: var(--accent);
            color: var(--accent);
            transform: translateY(-2px);
            box-shadow: 0 0 15px rgba(34, 197, 94, 0.3);
            background: rgba(34, 197, 94, 0.05);
        }

        .container { 
            display: flex; 
            width: 100%; 
            height: 100vh; 
            z-index: 10; 
            position: relative; 
            padding-top: 8rem; /* Space for large header */
        }

        /* Panel Structure: 50/50 */
        .panel {
            width: 50%;
            height: 100%;
            display: flex;
            flex-direction: column;
            padding: 1rem 1.5rem 2rem 1.5rem;
            gap: 1rem;
            overflow: hidden;
        }
        .panel-left { border-right: 1px solid rgba(255, 255, 255, 0.05); }

        .panel-title {
            font-size: 0.7rem;
            color: var(--text-dim);
            text-transform: uppercase;
            letter-spacing: 2px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .panel-title span { color: var(--accent); font-weight: bold; }

        .preview-box {
            flex-grow: 1;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            overflow: auto;
            position: relative;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.75rem;
            color: var(--text-dim);
        }
        th {
            background: rgba(34, 197, 94, 0.05);
            color: var(--accent);
            text-align: left;
            padding: 10px;
            border-bottom: 1px solid rgba(34, 197, 94, 0.2);
            position: sticky;
            top: 0;
            z-index: 5;
            backdrop-filter: blur(5px);
        }
        td {
            padding: 8px 10px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        }
        tr:hover td {
            color: var(--text-main);
            background: rgba(255, 255, 255, 0.02);
        }

        /* Terminal UI */
        .recipes-container {
            display: flex;
            gap: 10px;
            overflow-x: auto;
            padding: 5px 0;
            scrollbar-width: none;
        }
        .recipes-container::-webkit-scrollbar { display: none; }
        
        .btn-recipe {
            background: rgba(255, 255, 255, 0.02);
            color: var(--text-dim);
            border: 1px solid rgba(255, 255, 255, 0.05);
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 0.65rem;
            font-family: var(--font-mono);
            font-weight: 600;
            white-space: nowrap;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .btn-recipe:hover {
            background: rgba(34, 197, 94, 0.1);
            color: var(--accent);
            border-color: rgba(34, 197, 94, 0.3);
            box-shadow: 0 0 15px rgba(34, 197, 94, 0.1);
            transform: translateY(-1px);
        }

        .terminal-container {
            background: rgba(0, 0, 0, 0.8);
            border: 1px solid rgba(34, 197, 94, 0.4);
            border-radius: 8px;
            padding: 0.8rem 1rem;
            display: flex;
            align-items: center;
            gap: 10px;
            font-family: var(--font-mono);
            box-shadow: inset 0 0 10px rgba(34, 197, 94, 0.1);
        }
        .terminal-container.error {
            border-color: #ef4444;
            box-shadow: inset 0 0 10px rgba(239, 68, 68, 0.1);
        }
        .prompt { color: var(--accent); font-weight: bold; }
        .terminal-container.error .prompt { color: #ef4444; }
        #query-terminal {
            background: transparent;
            border: none;
            color: var(--text-main);
            font-family: var(--font-mono);
            font-size: 0.9rem;
            width: 100%;
            outline: none;
        }
        .run-btn {
            background: var(--accent);
            color: #000;
            border: none;
            padding: 6px 15px;
            border-radius: 6px;
            font-family: var(--font-mono);
            font-size: 0.75rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            animation: neon-glow 2.5s infinite ease-in-out;
        }
        .run-btn:hover {
            background: var(--accent-hover);
            box-shadow: 0 0 25px rgba(34, 197, 94, 0.7);
            transform: scale(1.05);
        }

        .upload-overlay {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.8);
            z-index: 20;
        }
        .file-input { display: none; }
        .upload-label {
            padding: 2.5rem;
            border: 1px dashed rgba(34, 197, 94, 0.3);
            border-radius: 12px;
            cursor: pointer;
            text-align: center;
            transition: all 0.3s ease;
        }
        .upload-label:hover {
            border-color: var(--accent);
            background: rgba(34, 197, 94, 0.05);
        }
        .hidden { display: none !important; }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.2);
        }
        ::-webkit-scrollbar-thumb {
            background: rgba(34, 197, 94, 0.2);
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: var(--accent);
        }
        * {
            scrollbar-width: thin;
            scrollbar-color: rgba(34, 197, 94, 0.2) rgba(0, 0, 0, 0.2);
        }

    </style>
</head>
<body>
    <div class="grid-bg"></div>
    <div class="scan-line"></div>
    
    <div class="odin-brand-container">
        <div class="odin-brand">ODIN</div>
        <div class="odin-desc">SUPREME DATA COMMAND // CRUNCH INTEL AT THE EDGE</div>
    </div>

    <header class="tactical-header">
        <div class="badge" id="record-count">0 RECORDS</div>
        <div class="badge" id="column-count">0 COLUMNS</div>
        <div class="badge" id="data-size">0.0 KB</div>
        <a href="/" class="punchy-badge">[ ⚡ PUNCHY.ME ]</a>
    </header>

    <div class="container">
        <!-- LEFT PANEL: SOURCE -->
        <section class="panel panel-left">
            <h2 class="panel-title">SOURCE INTEL <span>// DEMO PAYLOAD</span></h2>
            <div class="preview-box">
                <table id="source-table"></table>
            </div>

            <div class="recipes-container">
                <button class="btn-recipe" data-code="table.select('Job', 'Salary')">[ SELECT ]</button>
                <button class="btn-recipe" data-code="table.filter(d => d.Salary > 100000)">[ FILTER ]</button>
                <button class="btn-recipe" data-code="table.orderby(aq.desc('Salary')).slice(0, 10)">[ TOP 10 ]</button>
                <button class="btn-recipe" data-code="table.groupby('Dept').count()">[ GROUP BY ]</button>
                <button class="btn-recipe" data-code="table.sample(5)">[ SAMPLE ]</button>
                <button class="btn-recipe" data-code="table.pivot('Region', 'Dept')">[ PIVOT ]</button>
            </div>
            
            <div class="terminal-container">
                <span class="prompt">&gt;</span>
                <input type="text" id="query-terminal" placeholder="table.groupby('Dept').count()" autocomplete="off" spellcheck="false">
                <button class="run-btn" id="run-terminal">RUN</button>
            </div>
        </section>

        <!-- RIGHT PANEL: RESULT -->
        <section class="panel panel-right">
            <h2 class="panel-title">ANALYSIS RESULT <span>// ARQUERO</span></h2>
            <div class="preview-box">
                <table id="result-table"></table>
            </div>
        </section>
    </div>

    <script>
        let table = null;

        const sourceTable = document.getElementById('source-table');
        const resultTable = document.getElementById('result-table');
        const recordCount = document.getElementById('record-count');
        const columnCount = document.getElementById('column-count');
        const dataSizeBadge = document.getElementById('data-size');

        const mockCSV = \`Job,Dept,Salary,Years,Region
Data Analyst,Engineering,120000,3,APAC
Senior Engineer,Engineering,150000,5,NA
Marketing Manager,Marketing,90000,4,EMEA
Data Scientist,Engineering,140000,4,APAC
HR Specialist,HR,80000,2,NA
VP Engineering,Engineering,250000,10,NA
Marketing Exec,Marketing,85000,3,APAC
Data Analyst,Engineering,115000,2,EMEA
Director HR,HR,160000,8,NA
Product Manager,Product,130000,5,APAC
UX Designer,Product,110000,4,EMEA
Sales Lead,Sales,95000,6,NA
DevOps Engineer,Engineering,145000,5,APAC
Content Strategist,Marketing,75000,2,EMEA
Financial Analyst,Finance,105000,3,NA
CTO,Engineering,300000,15,NA
Support Hero,Support,60000,1,APAC
QA Tester,Engineering,85000,2,EMEA
Legal Counsel,Legal,180000,7,NA
Growth Hacker,Marketing,125000,4,APAC\`;

        const renderTable = (dt, target) => {
            if (!dt) return;
            let html = '<thead><tr>';
            const columns = dt.columnNames();
            columns.forEach(col => html += '<th>' + col + '</th>');
            html += '</tr></thead><tbody>';

            const preview = dt.slice(0, 100);
            preview.scan((row, data) => {
                html += '<tr>';
                columns.forEach(col => {
                    html += '<td>' + data[col][row] + '</td>';
                });
                html += '</tr>';
            });
            html += '</tbody>';
            target.innerHTML = html;
        };

        const loadData = (text) => {
            try {
                table = aq.fromCSV(text);
                if (table.numRows() > 1000) table = table.slice(0, 1000);
                if (table.numCols() > 10) table = table.select(table.columnNames().slice(0, 10));

                renderTable(table, sourceTable);
                
                // Update Badges
                recordCount.innerText = table.numRows() + ' RECORDS';
                columnCount.innerText = table.numCols() + ' COLUMNS';
                const sizeKb = (new Blob([text]).size / 1024).toFixed(1);
                dataSizeBadge.innerText = sizeKb + ' KB';
                
                resultTable.innerHTML = ''; // Clear result
            } catch (err) {
                console.error("Forge Failed:", err);
            }
        };

        // AUTO-LOAD STARTUP
        window.onload = () => loadData(mockCSV);

        // Terminal Execution
        const terminal = document.getElementById('query-terminal');
        const runBtn = document.getElementById('run-terminal');
        const termContainer = document.querySelector('.terminal-container');

        // ODIN Tactical Helpers
        const profile = (dt) => {
            if (!dt) return null;
            const cols = dt.columnNames();
            const summaryData = cols.map(name => {
                const col = dt.column(name);
                let type = 'unknown';
                const firstVal = col.get(0);
                if (firstVal !== undefined && firstVal !== null) {
                    type = typeof firstVal;
                }
                return {
                    column: name,
                    type: type,
                    sample: firstVal,
                    unique: dt.groupby(name).count().numRows()
                };
            });
            return aq.table(summaryData);
        };

        const executeQuery = () => {
            if (!table) return alert("No source data.");
            const cmd = terminal.value.trim();
            if (!cmd) return;

            try {
                // Inject profile helper and aq into the execution scope
                const fn = new Function('table', 'aq', 'profile', \`return \${cmd}\`);
                const result = fn(table, aq, profile);
                
                if (result && typeof result.numRows === 'function') {
                    renderTable(result, resultTable);
                    termContainer.classList.remove('error');
                    document.querySelector('.prompt').innerText = '>';
                } else {
                    throw new Error("Invalid Table result.");
                }
            } catch (err) {
                termContainer.classList.add('error');
                document.querySelector('.prompt').innerText = 'ERR>';
                console.error("ODIN Terminal Error:", err);
            }
        };

        terminal.addEventListener('keydown', (e) => { if (e.key === 'Enter') executeQuery(); });
        runBtn.onclick = executeQuery;

        // Mission Arsenal Logic
        document.querySelectorAll('.btn-recipe').forEach(btn => {
            btn.onclick = () => {
                terminal.value = btn.getAttribute('data-code');
                terminal.focus();
                // Visual feedback
                btn.style.borderColor = 'var(--accent)';
                setTimeout(() => btn.style.borderColor = 'rgba(34, 197, 94, 0.2)', 300);
            };
        });
    </script>
</body>
</html>`;
