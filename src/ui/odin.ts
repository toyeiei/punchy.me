export const ODIN_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ODIN | Tactical Terminal Data Command | PUNCHY.ME</title>
    <meta name="description" content="ODIN Tactical Terminal: A high-performance, edge-native data command center for professional analysts. Crunch intel at the edge with supreme precision and style.">
    <meta name="keywords" content="ODIN, tactical data, edge analytics, data command, terminal style, professional analytics, PUNCHY.ME">
    <link rel="canonical" href="https://punchy.me/odin" />
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%23000000' /%3E%3Cg transform='rotate(15, 50, 50)'%3E%3Cpath d='M35 25 H55 C65 25 75 32 75 45 C75 58 65 65 55 65 H45 V80' stroke='%2322c55e' stroke-width='10' stroke-linecap='round' stroke-linejoin='round' fill='none' /%3E%3Cpath d='M45 45 H55' stroke='%2322c55e' stroke-width='10' stroke-linecap='round' fill='none' /%3E%3C/g%3E%3C/svg%3E">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://punchy.me/odin">
    <meta property="og:title" content="ODIN | Tactical Terminal Data Command">
    <meta property="og:description" content="Crunch intel at the edge with ODIN. The supreme data command center for professional impact.">
    <meta property="og:image" content="https://punchy.me/og-image.webp">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://punchy.me/odin">
    <meta property="twitter:title" content="ODIN | Tactical Terminal Data Command">
    <meta property="twitter:description" content="Crunch intel at the edge with ODIN. The supreme data command center for professional impact.">
    <meta property="twitter:image" content="https://punchy.me/og-image.webp">

    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "ODIN",
      "url": "https://punchy.me/odin",
      "description": "Tactical Terminal Data Command center for edge-native analytics.",
      "applicationCategory": "Analytics",
      "operatingSystem": "Web",
      "author": {
        "@type": "Person",
        "name": "Kasidis Satangmongkol",
        "url": "https://datarockie.com"
      }
    }
    </script>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
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
        
        html, body {
            height: 100%;
            background-color: var(--bg);
            color: var(--text-main);
            font-family: var(--font-mono);
        }

        body {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            overflow-x: hidden;
            overflow-y: auto;
            position: relative;
        }

        /* Pulse Grid Background */
        .grid-bg {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background-image:
                linear-gradient(rgba(34, 197, 94, 0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.08) 1px, transparent 1px);
            background-size: 40px 40px;
            z-index: 0;
            pointer-events: none;
        }
        .scan-line {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100px;
            background: linear-gradient(to bottom, transparent, rgba(34, 197, 94, 0.08), transparent);
            border-bottom: 1px solid rgba(34, 197, 94, 0.15);
            z-index: 0;
            animation: scan 6s linear infinite;
            pointer-events: none;
            will-change: transform;
            transform: translateZ(0);
        }

        @keyframes scan {
            0% { transform: translateY(-100px) translateZ(0); }
            100% { transform: translateY(100vh) translateZ(0); }
        }

        /* ECOSYSTEM PORTAL (Fast-Switcher) - ANCHORED BOTTOM RIGHT */
        .punchy-portal {
            position: fixed;
            bottom: 1.5rem;
            right: 1.5rem;
            display: flex;
            flex-direction: row-reverse; /* Expand to the left */
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
        .portal-trigger {
            font-size: 1.2rem;
            min-width: 28px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .portal-brand {
            color: var(--accent);
            font-weight: 700;
            font-size: 0.8rem;
            white-space: nowrap;
            opacity: 0;
            transition: opacity 0.3s ease;
            font-family: var(--font-mono);
        }
        .punchy-portal:hover .portal-brand { opacity: 1; }
        .portal-tools {
            display: flex;
            gap: 0.8rem;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .punchy-portal:hover .portal-tools { opacity: 1; }
        .portal-tool-link {
            text-decoration: none;
            font-size: 1.1rem;
            transition: transform 0.2s ease;
            filter: grayscale(1);
        }
        .portal-tool-link:hover { transform: scale(1.3); filter: grayscale(0); }

        /* UNIFIED TACTICAL HEADER */
        .global-header {
            position: sticky;
            top: 0;
            left: 0;
            width: 100%;
            padding: 1.5rem 2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            z-index: 100;
            background: rgba(0,0,0,0.8);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .brand-block {
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }

        .odin-brand {
            font-family: var(--font-brand);
            font-size: 5.5rem;
            color: var(--text-main);
            line-height: 0.8;
            letter-spacing: -3px;
            font-weight: 400;
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
            position: relative;
            animation: odin-glitch 5s infinite;
        }

        .mvp-badge {
            background: var(--accent);
            color: #000;
            font-size: 0.8rem;
            font-weight: 900;
            padding: 4px 10px;
            border-radius: 6px;
            font-family: var(--font-mono);
            box-shadow: 0 0 15px rgba(34, 197, 94, 0.6);
            align-self: flex-start;
            margin-top: 0.5rem;
            letter-spacing: 1px;
            animation: pulse 2s infinite alternate;
        }

        @keyframes pulse {
            0% { transform: scale(1); opacity: 0.8; }
            100% { transform: scale(1.05); opacity: 1; }
        }

        @keyframes odin-glitch {
            0%, 80%, 100% { transform: skew(0deg) translateZ(0); text-shadow: none; }
            81% { transform: skew(2deg) translateZ(0); text-shadow: 1px 0 #ff00ff; }
            82% { transform: skew(-2deg) translateZ(0); text-shadow: -1px 0 #00ffff; }
            83% { transform: skew(0deg) translateZ(0); text-shadow: none; }
        }

        .odin-brand::before, .odin-brand::after {
            content: attr(data-text);
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: #000;
            opacity: 0;
            will-change: transform, opacity;
            transform: translateZ(0);
        }

        .odin-brand::before { left: 1px; color: #ff00ff; animation: glitch-anim-1 4s infinite; }
        .odin-brand::after { left: -1px; color: #00ffff; animation: glitch-anim-2 3s infinite; }

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

        .odin-desc {
            font-family: var(--font-mono);
            font-size: 0.85rem;
            color: var(--text-main);
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: bold;
            border-right: 1px solid rgba(255, 255, 255, 0.2);
            padding-right: 1.5rem;
            height: fit-content;
            white-space: nowrap;
        }

        .tactical-badges {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .badge {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 0.7rem;
            color: var(--text-main);
            font-weight: bold;
            letter-spacing: 1px;
            min-width: 110px;
            text-align: center;
        }

        .container { 
            display: flex; 
            width: 100%; 
            height: calc(100vh - 120px); 
            z-index: 10; 
            position: relative; 
            flex-shrink: 0;
        }

        /* Panel Structure: 60/40 */
        .panel {
            height: 100%;
            display: flex;
            flex-direction: column;
            padding: 1.5rem;
            gap: 1rem;
            overflow: hidden;
        }
        .panel-left { 
            width: 60%;
            border-right: 1px solid rgba(255, 255, 255, 0.05); 
        }
        .panel-right {
            width: 40%;
        }

        .panel-title {
            font-size: 0.7rem;
            color: var(--text-dim);
            text-transform: uppercase;
            letter-spacing: 2px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

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
            background: #111111;
            color: var(--text-main);
            text-align: left;
            padding: 12px 10px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            position: sticky;
            top: 0;
            z-index: 5;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        td {
            padding: 10px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            background: rgba(0, 0, 0, 0.2);
        }
        tr:hover td {
            color: var(--text-main);
            background: rgba(255, 255, 255, 0.02);
        }

        .recipes-container {
            display: flex;
            gap: 10px;
            overflow-x: auto;
            padding: 10px 0;
            scrollbar-width: none;
        }
        .recipes-container::-webkit-scrollbar { display: none; }
        
        .btn-recipe {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.05);
            color: var(--text-main);
            border: 1px solid rgba(255, 255, 255, 0.15);
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 0.7rem;
            font-family: var(--font-mono);
            font-weight: 700;
            line-height: 1; 
            white-space: nowrap;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            text-transform: uppercase;
            letter-spacing: 1.5px;
            flex-shrink: 0;
        }
        .btn-recipe:hover {
            background: rgba(34, 197, 94, 0.1);
            color: var(--accent);
            border-color: var(--accent);
            box-shadow: 0 0 25px rgba(34, 197, 94, 0.25);
            transform: translateY(-2px);
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
            position: relative;
        }
        
        .history-btn {
            background: transparent;
            color: var(--text-dim);
            border: none;
            cursor: pointer;
            font-size: 1rem;
            display: flex;
            align-items: center;
            transition: color 0.2s ease;
        }
        .history-btn:hover { color: var(--accent); }

        .history-dropdown {
            position: absolute;
            bottom: 100%;
            left: 0;
            width: 100%;
            background: rgba(17, 17, 17, 0.95);
            border: 1px solid rgba(34, 197, 94, 0.3);
            border-bottom: none;
            border-radius: 8px 8px 0 0;
            display: none;
            flex-direction: column;
            z-index: 50;
            backdrop-filter: blur(10px);
            overflow: hidden;
        }
        .history-item {
            padding: 10px 15px;
            font-size: 0.75rem;
            color: var(--text-dim);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            cursor: pointer;
            transition: all 0.2s ease;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .history-item:hover {
            background: rgba(34, 197, 94, 0.1);
            color: var(--accent);
        }
        .show-history { display: flex; }
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

        /* World-Class Mobile HUD */
        @media (max-width: 1024px) {
            .global-header {
                position: relative; 
                padding: 1.5rem;
                background: rgba(0,0,0,0.9);
            }
            .tactical-badges {
                display: none; 
            }
            .odin-brand { font-size: 4.5rem; } 
            .odin-desc { 
                border-left: 1px solid rgba(255, 255, 255, 0.2);
                border-right: none;
                padding-left: 1rem;
                padding-right: 0;
                font-size: 0.8rem; 
                white-space: normal;
                max-width: 280px; 
            }
            .container {
                flex-direction: column;
                height: auto;
                padding-top: 0; 
            }
            .panel {
                width: 100% !important;
                height: auto;
                min-height: 350px;
                border-right: none;
                padding: 1rem;
            }
            .panel-left {
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            .preview-box {
                height: 300px;
                flex-grow: 0;
            }
            .panel-right {
                margin-top: 1rem;
            }
            .punchy-portal {
                bottom: 1rem;
                right: 1rem;
            }
            .punchy-portal:hover {
                width: 44px; 
            }
        }

    </style>
</head>
<body>
    <div class="grid-bg"></div>
    <div class="scan-line"></div>
    
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

    <header class="global-header">
        <div class="brand-block">
            <div class="odin-brand" data-text="ODIN">ODIN</div>
            <div class="mvp-badge">MVP</div>
            <div class="odin-desc">SUPREME DATA COMMAND // CRUNCH INTEL AT THE EDGE</div>
        </div>
        <div class="tactical-badges">
            <div class="badge" id="record-count">0 RECORDS</div>
            <div class="badge" id="column-count">0 COLUMNS</div>
            <div class="badge" id="data-size">0.0 KB</div>
        </div>
    </header>

    <div class="container">
        <!-- LEFT PANEL: SOURCE -->
        <section class="panel panel-left">
            <h2 class="panel-title">SOURCE INTEL</h2>
            <div class="preview-box">
                <table id="source-table"></table>
            </div>

            <div class="recipes-container">
                <button class="btn-recipe" data-code="table.select('Job', 'Salary')">[ SELECT ]</button>
                <button class="btn-recipe" data-code="table.filter(d => d.Salary > 100000)">[ FILTER ]</button>
                <button class="btn-recipe" data-code="table.orderby(aq.desc('Salary')).slice(0, 10)">[ TOP 10 ]</button>
                <button class="btn-recipe" data-code="table.groupby('Dept').count()">[ GROUP BY ]</button>
                <button class="btn-recipe" data-code="table.sample(5)">[ SAMPLE ]</button>
                <button class="btn-recipe" data-code="table.groupby('Region', 'Dept').rollup({ Avg_Salary: d => op.mean(d.Salary) })">[ PIVOT ]</button>
            </div>
            
            <div class="terminal-container">
                <div class="history-dropdown" id="history-dropdown"></div>
                <button class="history-btn" id="history-toggle" title="Command History">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M12 7v5l4 2"></path></svg>
                </button>
                <span class="prompt">&gt;</span>
                <input type="text" id="query-terminal" placeholder="table.groupby('Dept').count()" autocomplete="off" spellcheck="false">
                <button class="run-btn" id="run-terminal">RUN</button>
            </div>
        </section>

        <!-- RIGHT PANEL: RESULT -->
        <section class="panel panel-right">
            <h2 class="panel-title">ANALYSIS RESULT</h2>
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

        const mockCSV = \`Employee,Job,Dept,Salary,Years,Region
Alex Carter,Data Analyst,Engineering,120000,3,APAC
Jordan Smith,Senior Engineer,Engineering,150000,5,NA
Casey Reed,Marketing Manager,Marketing,90000,4,EMEA
Riley Vance,Data Scientist,Engineering,140000,4,APAC
Morgan Blake,HR Specialist,HR,80000,2,NA
Taylor Quinn,VP Engineering,Engineering,250000,10,NA
Skyler Grey,Marketing Exec,Marketing,85000,3,APAC
Dakota Lane,Data Analyst,Engineering,115000,2,EMEA
Peyton Cross,Director HR,HR,160000,8,NA
Quinn Blair,Product Manager,Product,130000,5,APAC
Reese Hunt,UX Designer,Product,110000,4,EMEA
Avery Frost,Sales Lead,Sales,95000,6,NA
Emerson Cole,DevOps Engineer,Engineering,145000,5,APAC
Parker West,Content Strategist,Marketing,75000,2,EMEA
Finley Nash,Financial Analyst,Finance,105000,3,NA
Logan Sharp,CTO,Engineering,300000,15,NA
Robin Banks,Support Hero,Support,60000,1,APAC
Jamie Fox,QA Tester,Engineering,85000,2,EMEA
Sasha King,Legal Counsel,Legal,180000,7,NA
Ari Stone,Growth Hacker,Marketing,125000,4,APAC\`;

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
                
                recordCount.innerText = table.numRows() + ' RECORDS';
                columnCount.innerText = table.numCols() + ' COLUMNS';
                const sizeKb = (new Blob([text]).size / 1024).toFixed(1);
                dataSizeBadge.innerText = sizeKb + ' KB';
                
                resultTable.innerHTML = ''; 
            } catch (err) {
                console.error("Forge Failed:", err);
            }
        };

        window.onload = () => loadData(mockCSV);

        const terminal = document.getElementById('query-terminal');
        const runBtn = document.getElementById('run-terminal');
        const termContainer = document.querySelector('.terminal-container');

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

            const forbidden = ['fetch', 'document', 'window', 'eval', 'XMLHttpRequest', 'cookie', 'localStorage', 'sessionStorage', 'location', 'script'];
            const isMalicious = forbidden.some(word => cmd.toLowerCase().includes(word.toLowerCase()));
            
            if (isMalicious) {
                termContainer.classList.add('error');
                document.querySelector('.prompt').innerText = 'SEC>';
                return;
            }

            try {
                const fn = new Function('table', 'aq', 'op', 'profile', 'window', 'document', 'fetch', \`return \${cmd}\`);
                const result = fn(table, aq, aq.op, profile, null, null, null);
                
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
            }
        };

        terminal.addEventListener('keydown', (e) => { if (e.key === 'Enter') window.executeQuery(); });

        document.querySelectorAll('.btn-recipe').forEach(btn => {
            btn.onclick = () => {
                terminal.value = btn.getAttribute('data-code');
                terminal.focus();
                btn.style.borderColor = 'var(--accent)';
                setTimeout(() => btn.style.borderColor = 'rgba(255, 255, 255, 0.15)', 300);
            };
        });

        let commandHistory = [];
        const historyToggle = document.getElementById('history-toggle');
        const historyDropdown = document.getElementById('history-dropdown');

        const updateHistoryUI = () => {
            historyDropdown.innerHTML = commandHistory.map(cmd => \`
                <div class="history-item" title="\${cmd}">\${cmd}</div>
            \`).join('');
            
            document.querySelectorAll('.history-item').forEach(item => {
                item.onclick = () => {
                    terminal.value = item.getAttribute('title');
                    historyDropdown.classList.remove('show-history');
                    terminal.focus();
                };
            });
        };

        historyToggle.onclick = (e) => {
            e.stopPropagation();
            if (commandHistory.length === 0) return alert("Command History Has No Records, Please Write Your First Query");
            historyDropdown.classList.toggle('show-history');
        };

        window.onclick = () => historyDropdown.classList.remove('show-history');

        const originalExecute = executeQuery;
        window.executeQuery = () => {
            const cmd = terminal.value.trim();
            const prevResult = resultTable.innerHTML;
            
            originalExecute();
            
            if (resultTable.innerHTML !== prevResult && !commandHistory.includes(cmd)) {
                commandHistory.unshift(cmd);
                if (commandHistory.length > 5) commandHistory.pop();
                updateHistoryUI();
            }
        };
        runBtn.onclick = window.executeQuery;
    </script>
</body>
</html>`;
