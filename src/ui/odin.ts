export const ODIN_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ODIN | Tactical Data Analysis | PUNCHY.ME</title>
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
            display: flex;
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

        .container { 
            display: flex; 
            width: 100%; 
            height: 100vh; 
            z-index: 10; 
            position: relative; 
        }

        /* Left Sidebar: 15% */
        .sidebar {
            width: 15%;
            min-width: 180px;
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(10px);
            border-right: 1px solid rgba(255, 255, 255, 0.08);
            padding: 2rem 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        /* Right Panel: 85% */
        .main-panel {
            width: 85%;
            padding: 2rem;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            overflow: hidden;
        }

        .title {
            font-family: var(--font-brand);
            font-size: 3.8rem;
            color: var(--text-main);
            margin-bottom: 2rem;
            text-align: center;
            line-height: 1;
            letter-spacing: -2px;
        }

        .btn-odin {
            background: rgba(0, 0, 0, 0.5);
            color: var(--text-dim);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 0.8rem;
            border-radius: 8px;
            font-family: var(--font-mono);
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: left;
            width: 100%;
        }
        .btn-odin:hover {
            border-color: var(--accent);
            color: var(--accent);
            transform: translateX(5px);
            box-shadow: -5px 0 15px rgba(34, 197, 94, 0.2);
        }
        .btn-odin.active {
            background: var(--accent);
            color: #000;
            font-weight: 700;
            border-color: var(--accent);
        }

        /* Preview Box */
        .preview-box {
            flex-grow: 1;
            background: rgba(0, 0, 0, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            overflow: auto;
            position: relative;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.8rem;
            color: var(--text-dim);
        }
        th {
            background: rgba(34, 197, 94, 0.1);
            color: var(--accent);
            text-align: left;
            padding: 12px;
            border-bottom: 1px solid rgba(34, 197, 94, 0.3);
            position: sticky;
            top: 0;
            z-index: 5;
        }
        td {
            padding: 10px 12px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        tr:hover td {
            color: var(--text-main);
            background: rgba(255, 255, 255, 0.02);
        }

        .hidden { display: none !important; }
        
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
            padding: 2rem 4rem;
            border: 2px dashed rgba(34, 197, 94, 0.4);
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .upload-label:hover {
            border-color: var(--accent);
            background: rgba(34, 197, 94, 0.05);
        }

        .back-home {
            position: fixed; bottom: 1.5rem; left: 1.5rem;
            color: var(--accent); text-decoration: none; font-size: 0.8rem; font-weight: 700;
            padding: 8px 12px; background: rgba(0,0,0,0.5); border: 1px solid rgba(34, 197, 94, 0.2);
            border-radius: 8px; backdrop-filter: blur(5px); z-index: 100;
        }

        .status-bar {
            padding: 0.5rem 1rem;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 8px;
            font-size: 0.7rem;
            color: var(--accent);
            display: flex;
            justify-content: space-between;
            margin-bottom: 4rem; /* Clear the [PUNCHY.ME] badge */
        }

        /* Terminal UI */
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
            margin: 0;
            padding: 0;
        }
    </style>
</head>
<body>
    <div class="grid-bg"></div>
    <a href="/" class="back-home">[ ⚡ PUNCHY.ME ]</a>

    <div class="container">
        <aside class="sidebar">
            <h1 class="title">ODIN</h1>
            <button class="btn-odin" id="btn-demo" style="border-color: rgba(34, 197, 94, 0.5); color: var(--text-main);">Demo Intel</button>
            <button class="btn-odin" id="btn-profile">Profile</button>
            <button class="btn-odin" id="btn-dimension">Dimension</button>
            <button class="btn-odin" id="btn-aggregate">Aggregate</button>
            
            <div style="margin: 1.5rem 0; height: 1px; background: rgba(34, 197, 94, 0.2); display: none;"></div>
            <button class="btn-odin hidden" id="btn-ai" style="color: var(--accent); border-color: var(--accent); font-weight: bold; text-align: center;">[ AI INTEL ]</button>
            
            <div style="flex-grow: 1;"></div>
            
            <div class="status-bar" id="status-bar">
                <span>READY</span>
                <span id="record-count">0 RECORDS</span>
            </div>
        </aside>

        <main class="main-panel">
            <div class="preview-box" id="preview-box">
                <div class="upload-overlay" id="upload-overlay">
                    <label for="csv-file" class="upload-label">
                        <span style="color: var(--accent); font-size: 1.2rem;">DROP MISSION INTEL (CSV)</span>
                        <p style="color: var(--text-dim); margin-top: 1rem; font-size: 0.8rem;">Max 1000 Records | Tactical Analysis</p>
                    </label>
                    <input type="file" id="csv-file" class="file-input" accept=".csv">
                </div>
                <table id="data-table">
                    <!-- Data will be injected here -->
                </table>
            </div>

            <div class="terminal-container">
                <span class="prompt">&gt;</span>
                <input type="text" id="query-terminal" placeholder="table.groupby('Dept').count()" autocomplete="off" spellcheck="false">
            </div>
        </main>
    </div>

    <!-- AI Intel Overlay -->
    <div id="ai-modal" class="hidden" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 100; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(5px);">
        <div style="background: rgba(17,17,17,0.9); border: 1px solid var(--accent); padding: 2rem; border-radius: 12px; width: 80%; max-width: 800px; box-shadow: 0 0 30px rgba(34,197,94,0.2);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(34,197,94,0.3); padding-bottom: 1rem;">
                <h2 style="color: var(--accent); font-family: var(--font-brand); font-size: 1.5rem; text-transform: uppercase;">[ STRATEGIC ANALYSIS ]</h2>
                <button id="close-ai" style="background: transparent; color: var(--text-dim); border: none; cursor: pointer; font-size: 2rem; line-height: 1;">&times;</button>
            </div>
            <div id="ai-content" style="color: var(--text-main); font-size: 0.9rem; line-height: 1.6; max-height: 60vh; overflow-y: auto; font-family: var(--font-mono);">
                <div style="text-align: center; padding: 2rem;"><span class="prompt">FORGING INTEL...</span></div>
            </div>
        </div>
    </div>

    <script>
        let table = null;

        const csvInput = document.getElementById('csv-file');
        const uploadOverlay = document.getElementById('upload-overlay');
        const dataTable = document.getElementById('data-table');
        const recordCount = document.getElementById('record-count');
        const statusBar = document.getElementById('status-bar');

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
Product Manager,Product,130000,5,APAC\`;

        document.getElementById('btn-demo').onclick = () => {
            try {
                table = aq.fromCSV(mockCSV);
                renderTable(table);
                uploadOverlay.classList.add('hidden');
                recordCount.innerText = table.numRows() + ' RECORDS';
                setActive('btn-demo');
                statusBar.children[0].innerText = 'DEMO LOADED';
                statusBar.style.color = 'var(--accent)';
            } catch (err) {
                alert("Demo Forge Failed: " + err);
            }
        };

        // 1. Upload & Parse
        csvInput.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                const text = event.target.result;
                try {
                    table = aq.fromCSV(text);
                    if (table.numRows() > 1000) {
                        alert("Tactical limit exceeded (1000 records max). Slicing...");
                        table = table.slice(0, 1000);
                    }
                    renderTable(table);
                    uploadOverlay.classList.add('hidden');
                    recordCount.innerText = table.numRows() + ' RECORDS';
                    statusBar.children[0].innerText = 'DATA LOADED';
                } catch (err) {
                    alert("Forge Failed: Invalid CSV format.");
                }
            };
            reader.readAsText(file);
        };

        function renderTable(dt) {
            let html = '<thead><tr>';
            const columns = dt.columnNames();
            columns.forEach(col => html += '<th>' + col + '</th>');
            html += '</tr></thead><tbody>';

            // Show first 100 rows for preview
            const preview = dt.slice(0, 100);
            preview.scan((row, data) => {
                html += '<tr>';
                columns.forEach(col => {
                    html += '<td>' + data[col][row] + '</td>';
                });
                html += '</tr>';
            });
            html += '</tbody>';
            dataTable.innerHTML = html;
        }

        // 2. Profile Action
        document.getElementById('btn-profile').onclick = () => {
            if (!table) return alert("No intel uploaded.");
            const summary = table.summary();
            renderTable(summary);
            setActive('btn-profile');
        };

        // 3. Dimension (Sort by first column)
        document.getElementById('btn-dimension').onclick = () => {
            if (!table) return alert("No intel uploaded.");
            const firstCol = table.columnNames()[0];
            const sorted = table.orderby(firstCol);
            renderTable(sorted);
            setActive('btn-dimension');
        };

        // 4. Aggregate (Count by first column)
        document.getElementById('btn-aggregate').onclick = () => {
            if (!table) return alert("No intel uploaded.");
            const firstCol = table.columnNames()[0];
            const agg = table.groupby(firstCol).count();
            renderTable(agg);
            setActive('btn-aggregate');
        };

        // Upload Button helper
        document.getElementById('btn-upload').onclick = () => {
            uploadOverlay.classList.remove('hidden');
            setActive('btn-upload');
        };

        function setActive(id) {
            document.querySelectorAll('.btn-odin').forEach(b => b.classList.remove('active'));
            if(id) document.getElementById(id).classList.add('active');
        }

        // Terminal Query Engine
        const terminal = document.getElementById('query-terminal');
        const termContainer = document.querySelector('.terminal-container');

        terminal.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                if (!table) {
                    alert("No intel uploaded to query.");
                    return;
                }
                const cmd = terminal.value.trim();
                if (!cmd) return;
                
                try {
                    // Safe evaluation context for Arquero on the client
                    const fn = new Function('table', 'aq', \`return \${cmd}\`);
                    const result = fn(table, aq);
                    
                    if (result && typeof result.numRows === 'function') {
                        renderTable(result);
                        termContainer.classList.remove('error');
                        document.querySelector('.prompt').innerText = '>';
                        setActive(''); // Clear active buttons since state is custom
                    } else {
                        throw new Error("Result is not a valid Arquero table.");
                    }
                } catch (err) {
                    termContainer.classList.add('error');
                    document.querySelector('.prompt').innerText = 'ERR>';
                    console.error("Query Error:", err);
                }
            }
        });

        // AI Intel Logic
        const aiModal = document.getElementById('ai-modal');
        const aiContent = document.getElementById('ai-content');
        
        document.getElementById('close-ai').onclick = () => aiModal.classList.add('hidden');
        
        document.getElementById('btn-ai').onclick = async () => {
            if (!table) return alert("No intel uploaded to analyze.");
            
            aiModal.classList.remove('hidden');
            aiContent.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--accent);"><span class="prompt">SYNCHRONIZING WITH LLAMA 3...</span></div>';
            
            try {
                // Generate a lightweight sample
                const columns = table.columnNames();
                const numRows = table.numRows();
                let sample = [];
                table.slice(0, 5).scan((row, data) => {
                    let r = {};
                    columns.forEach(c => r[c] = data[c][row]);
                    sample.push(r);
                });
                
                const payload = { columns, numRows, sample };
                
                const res = await fetch('/odin/analyze', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                
                if (res.ok) {
                    const data = await res.json();
                    aiContent.innerHTML = \`
                        <div style="margin-bottom: 1.5rem;">
                            <h3 style="color: var(--accent); margin-bottom: 0.5rem; text-transform: uppercase; font-size: 1rem;">// Strategic Overview</h3>
                            <p>\${data.strategic_overview || 'No overview available.'}</p>
                        </div>
                        <div style="margin-bottom: 1.5rem;">
                            <h3 style="color: var(--accent); margin-bottom: 0.5rem; text-transform: uppercase; font-size: 1rem;">// Detected Anomalies</h3>
                            <p>\${data.anomalies_detected || 'No anomalies detected.'}</p>
                        </div>
                        <div>
                            <h3 style="color: var(--accent); margin-bottom: 0.5rem; text-transform: uppercase; font-size: 1rem;">// Tactical Recommendations</h3>
                            <p>\${data.tactical_recommendations || 'No recommendations.'}</p>
                        </div>
                    \`;
                } else {
                    const err = await res.json();
                    aiContent.innerHTML = \`<div style="color: #ef4444;">Forge Failed: \${err.error || 'Unknown Error'}</div>\`;
                }
            } catch (e) {
                aiContent.innerHTML = \`<div style="color: #ef4444;">Connection Failed.</div>\`;
            }
        };
    </script>
</body>
</html>`;