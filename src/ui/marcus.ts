import { PUNCHY_PORTAL_HTML } from './portal';

export const MARCUS_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MARCUS | R Terminal | PUNCHY.ME</title>
    <meta name="description" content="R Analytics Terminal. Write and execute R code directly in your browser. WebR-powered statistical analysis.">
    <link rel="canonical" href="https://punchy.me/marcus" />
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E📊%3C/text%3E%3C/svg%3E">

    <meta property="og:type" content="website">
    <meta property="og:url" content="https://punchy.me/marcus">
    <meta property="og:title" content="MARCUS | R Terminal | PUNCHY.ME">
    <meta property="og:description" content="R Analytics Terminal. Write and execute R code in your browser.">
    <meta property="og:image" content="https://punchy.me/og-images/og-image-marcus.webp">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@punchyme">
    <meta name="twitter:title" content="MARCUS | R Terminal">
    <meta name="twitter:description" content="R Analytics Terminal. Write and execute R code in your browser.">
    <meta name="twitter:image" content="https://punchy.me/og-images/og-image-marcus.webp">

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "MARCUS Analytics",
      "operatingSystem": "Any",
      "applicationCategory": "DataAnalysisApplication",
      "url": "https://punchy.me/marcus",
      "description": "R Analytics Terminal. Write and execute R code in your browser.",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
    </script>

    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg: #0a0a0a;
            --terminal-bg: #0d0d0d;
            --accent: #22c55e;
            --accent-dim: #166534;
            --purple: #8b5cf6;
            --text-main: #e5e5e5;
            --text-dim: #737373;
            --border: #1a1a1a;
            --font-mono: 'JetBrains Mono', monospace;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        html, body { height: 100%; background-color: var(--bg); }

        body {
            color: var(--text-main);
            font-family: var(--font-mono);
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            overflow: hidden;
        }

        .terminal-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            max-width: 1200px;
            width: 100%;
            margin: 0 auto;
            padding: 1rem;
        }

        .terminal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.75rem 1rem;
            background: var(--terminal-bg);
            border: 1px solid var(--border);
            border-bottom: none;
            border-radius: 12px 12px 0 0;
        }

        .terminal-title {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 700;
            font-size: 0.9rem;
            color: var(--accent);
        }

        .terminal-dots {
            display: flex;
            gap: 6px;
        }
        .terminal-dots span {
            width: 12px;
            height: 12px;
            border-radius: 50%;
        }
        .terminal-dots span:nth-child(1) { background: #ef4444; }
        .terminal-dots span:nth-child(2) { background: #eab308; }
        .terminal-dots span:nth-child(3) { background: #22c55e; }

        .status-badge {
            font-size: 0.65rem;
            padding: 3px 8px;
            border-radius: 4px;
            background: var(--accent-dim);
            color: var(--accent);
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .status-badge.loading {
            background: rgba(139, 92, 246, 0.2);
            color: var(--purple);
            animation: blink 1s infinite;
        }
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        .loading-bar-container {
            background: var(--terminal-bg);
            border: 1px solid var(--border);
            border-top: none;
            padding: 0.75rem 1rem;
            display: none;
        }
        .loading-bar-container.active {
            display: block;
        }
        .loading-bar-wrapper {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 4px;
            height: 8px;
            overflow: hidden;
            position: relative;
        }
        .loading-bar {
            background: linear-gradient(90deg, var(--purple), var(--accent));
            height: 100%;
            width: 0%;
            transition: width 0.3s ease;
            border-radius: 4px;
        }
        .loading-text {
            font-size: 0.7rem;
            color: var(--text-dim);
            margin-bottom: 0.5rem;
            display: flex;
            justify-content: space-between;
        }
        .loading-percentage {
            color: var(--purple);
            font-weight: 700;
        }

        .terminal-body {
            flex: 1;
            display: flex;
            flex-direction: column;
            background: var(--terminal-bg);
            border: 1px solid var(--border);
            border-radius: 0 0 12px 12px;
            overflow: hidden;
        }

        .output-area {
            flex: 1;
            overflow-y: auto;
            padding: 1rem;
            font-size: 0.8rem;
            line-height: 1.6;
            background: #000;
        }

        .output-line {
            margin-bottom: 0.25rem;
            white-space: pre-wrap;
            word-break: break-word;
        }
        .output-line.prompt {
            color: var(--accent);
        }
        .output-line.command {
            color: var(--text-main);
        }
        .output-line.result {
            color: #a3a3a3;
        }
        .output-line.error {
            color: #ef4444;
        }
        .output-line.info {
            color: var(--purple);
        }
        .output-line.success {
            color: var(--accent);
        }

        .input-area {
            display: flex;
            align-items: center;
            border-top: 1px solid var(--border);
            background: #050505;
        }

        .prompt-symbol {
            color: var(--accent);
            font-weight: 700;
            padding: 1rem 0.75rem;
            font-size: 0.85rem;
            user-select: none;
        }

        #r-input {
            flex: 1;
            background: transparent;
            border: none;
            color: var(--text-main);
            font-family: var(--font-mono);
            font-size: 0.85rem;
            padding: 1rem 0.5rem;
            outline: none;
        }

        #r-input::placeholder {
            color: var(--text-dim);
        }

        .sidebar {
            width: 280px;
            background: var(--terminal-bg);
            border-left: 1px solid var(--border);
            padding: 1rem;
            overflow-y: auto;
            display: none;
        }
        @media (min-width: 900px) {
            .sidebar { display: block; }
        }

        .sidebar h3 {
            font-size: 0.7rem;
            color: var(--text-dim);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 0.75rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid var(--border);
        }

        .snippet-list {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .snippet-btn {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 8px;
            padding: 0.75rem;
            text-align: left;
            cursor: pointer;
            transition: all 0.2s;
            font-family: var(--font-mono);
            font-size: 0.75rem;
            color: var(--text-main);
        }
        .snippet-btn:hover {
            background: rgba(139, 92, 246, 0.1);
            border-color: rgba(139, 92, 246, 0.3);
        }
        .snippet-btn .name {
            font-weight: 700;
            color: var(--purple);
            margin-bottom: 0.25rem;
        }
        .snippet-btn .desc {
            color: var(--text-dim);
            font-size: 0.65rem;
        }

        .flex-row {
            display: flex;
            flex: 1;
            overflow: hidden;
        }

        .main-terminal {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .toolbar {
            display: flex;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            background: #080808;
            border-bottom: 1px solid var(--border);
        }

        .toolbar-btn {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 6px;
            padding: 0.5rem 0.75rem;
            font-size: 0.7rem;
            color: var(--text-dim);
            cursor: pointer;
            transition: all 0.2s;
            font-family: var(--font-mono);
        }
        .toolbar-btn:hover {
            background: rgba(139, 92, 246, 0.1);
            border-color: rgba(139, 92, 246, 0.3);
            color: var(--text-main);
        }

        .hidden { display: none; }
    </style>
</head>
<body>
    ${PUNCHY_PORTAL_HTML}
    
    <div class="terminal-container">
        <div class="terminal-header">
            <div class="terminal-title">
                <span>📊</span> MARCUS R Terminal
            </div>
            <div class="terminal-dots">
                <span></span><span></span><span></span>
            </div>
            <span class="status-badge loading" id="status">LOADING R...</span>
        </div>
        
        <div class="loading-bar-container active" id="loading-container">
            <div class="loading-text">
                <span id="loading-message">Initializing WebR...</span>
                <span class="loading-percentage" id="loading-percent">0%</span>
            </div>
            <div class="loading-bar-wrapper">
                <div class="loading-bar" id="loading-bar"></div>
            </div>
        </div>
        
        <div class="flex-row">
            <div class="main-terminal">
                <div class="toolbar">
                    <button class="toolbar-btn" id="btn-clear">Clear Output</button>
                    <button class="toolbar-btn" id="btn-sample">Load Sample Data</button>
                    <button class="toolbar-btn" id="btn-help">Show Commands</button>
                </div>
                <div class="terminal-body">
                    <div class="output-area" id="output">
                        <div class="output-line info">[MARCUS] R Terminal v1.0</div>
                        <div class="output-line info">[MARCUS] Powered by WebR - R running in your browser via WebAssembly</div>
                        <div class="output-line result"></div>
                        <div class="output-line info">[MARCUS] Loading R environment (~30MB, may take 10-30s on first visit)...</div>
                        <div class="output-line result"></div>
                        <div class="output-line info">[MARCUS] While waiting, you can use Clear/Help buttons.</div>
                    </div>
                    <div class="input-area">
                        <span class="prompt-symbol">❯</span>
                        <input type="text" id="r-input" placeholder="Enter R code or :help for commands..." autocomplete="off" spellcheck="false">
                    </div>
                </div>
            </div>
            
            <div class="sidebar">
                <h3>Quick Snippets</h3>
                <div class="snippet-list">
                    <button class="snippet-btn" data-code="summary(data)">
                        <div class="name">summary()</div>
                        <div class="desc">Statistical summary of data</div>
                    </button>
                    <button class="snippet-btn" data-code="mean(x)">
                        <div class="name">mean()</div>
                        <div class="desc">Calculate mean of vector x</div>
                    </button>
                    <button class="snippet-btn" data-code="sd(x)">
                        <div class="name">sd()</div>
                        <div class="desc">Standard deviation</div>
                    </button>
                    <button class="snippet-btn" data-code="hist(x)">
                        <div class="name">hist()</div>
                        <div class="desc">Histogram of values</div>
                    </button>
                    <button class="snippet-btn" data-code="cor(x, y)">
                        <div class="name">cor()</div>
                        <div class="desc">Correlation between x and y</div>
                    </button>
                    <button class="snippet-btn" data-code="t.test(g1, g2)">
                        <div class="name">t.test()</div>
                        <div class="desc">Compare two groups</div>
                    </button>
                    <button class="snippet-btn" data-code="lm(y ~ x)">
                        <div class="name">lm()</div>
                        <div class="desc">Linear regression model</div>
                    </button>
                    <button class="snippet-btn" data-code="plot(x, y)">
                        <div class="name">plot()</div>
                        <div class="desc">Scatter plot</div>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script type="module">
        import { WebR } from 'https://webr.r-wasm.org/latest/webr.mjs';

        const output = document.getElementById('output');
        const input = document.getElementById('r-input');
        const status = document.getElementById('status');
        const btnClear = document.getElementById('btn-clear');
        const btnSample = document.getElementById('btn-sample');
        const btnHelp = document.getElementById('btn-help');
        const loadingContainer = document.getElementById('loading-container');
        const loadingBar = document.getElementById('loading-bar');
        const loadingPercent = document.getElementById('loading-percent');
        const loadingMessage = document.getElementById('loading-message');

        let isReady = false;
        let webR = null;
        let shelter = null;
        let commandHistory = [];
        let historyIndex = -1;

        function addOutput(text, type = 'result') {
            const line = document.createElement('div');
            line.className = 'output-line ' + type;
            line.textContent = text;
            output.appendChild(line);
            output.scrollTop = output.scrollHeight;
        }

        function setStatus(text, isLoading = false) {
            status.textContent = text;
            if (isLoading) {
                status.classList.add('loading');
            } else {
                status.classList.remove('loading');
            }
        }

        function updateLoadingProgress(percent, message) {
            loadingBar.style.width = percent + '%';
            loadingPercent.textContent = percent + '%';
            loadingMessage.textContent = message;
        }

        async function initWebR() {
            let progressInterval;
            try {
                addOutput('[MARCUS] Initializing WebR...', 'info');
                setStatus('LOADING', true);
                updateLoadingProgress(5, 'Loading WebR core...');

                // Simulate progress while loading (WebR doesn't expose actual progress)
                let progress = 5;
                progressInterval = setInterval(() => {
                    if (isReady) {
                        clearInterval(progressInterval);
                        return;
                    }
                    
                    progress += Math.random() * 10;
                    if (progress > 95) progress = 95;
                    
                    let msg = 'Loading R packages...';
                    if (progress < 30) msg = 'Downloading WebAssembly (~15MB)...';
                    else if (progress < 60) msg = 'Initializing R runtime...';
                    else if (progress < 85) msg = 'Loading base packages...';
                    
                    updateLoadingProgress(Math.floor(progress), msg);
                }, 500);

                addOutput('[MARCUS] Step 1: Creating WebR instance...', 'info');
                console.log('[MARCUS DEBUG] About to create WebR instance');
                
                // Use PostMessage channel
                addOutput('[MARCUS] Using PostMessage communication channel...', 'info');
                addOutput('[MARCUS] Location: ' + window.location.href, 'info');
                console.log('[MARCUS DEBUG] Current URL:', window.location.href);
                
                webR = new WebR({
                    baseUrl: 'https://webr.r-wasm.org/latest/',
                    serviceWorkerUrl: '',
                    channelType: 'PostMessage',
                    homedir: '/home/web_user',
                });
                
                addOutput('[MARCUS] Step 2: WebR instance created', 'success');
                console.log('[MARCUS DEBUG] WebR instance created:', webR);
                
                addOutput('[MARCUS] Step 3: Initializing R environment...', 'info');
                addOutput('[MARCUS] (Downloading ~15MB, may take 30-90 seconds)', 'info');
                console.log('[MARCUS DEBUG] Starting webR.init()...');
                console.log('[MARCUS DEBUG] If this hangs, check console for errors');
                
                // Add promise wrapper to catch silent failures
                try {
                    await new Promise((resolve, reject) => {
                        webR.init()
                            .then(() => {
                                console.log('[MARCUS DEBUG] webR.init() resolved successfully!');
                                resolve(true);
                            })
                            .catch((err) => {
                                console.error('[MARCUS DEBUG] webR.init() rejected:', err);
                                reject(err);
                            });
                        
                        // Log progress every 5 seconds
                        let elapsed = 0;
                        const progressLogger = setInterval(() => {
                            elapsed += 5;
                            console.log('[MARCUS DEBUG] Still initializing... (' + elapsed + 's elapsed)');
                            if (elapsed >= 120) {
                                clearInterval(progressLogger);
                                reject(new Error('Initialization timeout - WebR may not be compatible with Edge. Try Chrome or Firefox.'));
                            }
                        }, 5000);
                    });
                } catch (initError) {
                    console.error('[MARCUS DEBUG] Init error caught:', initError);
                    throw initError;
                }
                
                addOutput('[MARCUS] Step 4: R initialized!', 'success');
                console.log('[MARCUS DEBUG] webR.init() completed successfully');
                
                // Create a shelter for managing R objects
                addOutput('[MARCUS] Step 5: Creating R shelter...', 'info');
                shelter = await new webR.Shelter();
                
                addOutput('[MARCUS] Step 6: R runtime ready!', 'success');
                console.log('[MARCUS DEBUG] Shelter created, R is fully ready');
                
                // Stop progress simulation
                if (progressInterval) clearInterval(progressInterval);
                
                updateLoadingProgress(100, 'R ready!');
                setStatus('READY', false);
                isReady = true;
                
                setTimeout(() => {
                    loadingContainer.classList.remove('active');
                }, 500);

                addOutput('[MARCUS] R environment ready!', 'success');
                addOutput('', 'result');
                addOutput('[MARCUS] Quick start commands:', 'info');
                addOutput('  x <- c(1, 2, 3, 4, 5)    # Create vector', 'result');
                addOutput('  mean(x)                 # Calculate mean', 'result');
                addOutput('  summary(x)              # Summary stats', 'result');
                addOutput('', 'result');
                input.focus();

            } catch (err) {
                if (progressInterval) clearInterval(progressInterval);
                setStatus('ERROR', false);
                loadingContainer.classList.remove('active');
                addOutput('[ERROR] Failed to initialize WebR: ' + (err.message || String(err)), 'error');
                addOutput('[ERROR] Error type: ' + err.constructor.name, 'error');
                if (err.stack) {
                    addOutput('[ERROR] Stack: ' + err.stack.substring(0, 500), 'error');
                }
                addOutput('[MARCUS] Troubleshooting:', 'info');
                addOutput('[MARCUS] 1. Check browser console (F12) for detailed errors', 'info');
                addOutput('[MARCUS] 2. Try Chrome/Firefox if Edge has issues', 'info');
                addOutput('[MARCUS] 3. Check internet connection to webr.r-wasm.org', 'info');
                console.error('[MARCUS] WebR init error (full):', err);
                console.error('[MARCUS] Error details:', {
                    message: err.message,
                    name: err.name,
                    stack: err.stack
                });
            }
        }

        async function executeR(code) {
            if (!isReady || !webR) {
                addOutput('[ERROR] R not ready. Status: ' + status.textContent, 'error');
                addOutput('[ERROR] Please wait for READY status.', 'error');
                return;
            }

            addOutput('> ' + code, 'command');
            commandHistory.push(code);
            historyIndex = commandHistory.length;

            try {
                // Handle special commands
                if (code.startsWith(':')) {
                    handleSpecialCommand(code);
                    return;
                }

                // Capture R output
                const result = await shelter.captureR(code, {
                    withAutoprint: true,
                    captureStreams: true,
                    captureConditions: false
                });
                
                // Display captured output
                if (result.output && result.output.length > 0) {
                    result.output.forEach(out => {
                        if (out.type === 'stdout') {
                            addOutput(out.data, 'result');
                        } else if (out.type === 'stderr') {
                            addOutput(out.data, 'error');
                        }
                    });
                } else {
                    // Silent execution (like assignment)
                    addOutput('', 'result');
                }
            } catch (err) {
                addOutput('Error: ' + (err.message || String(err)), 'error');
            }
        }

        function handleSpecialCommand(cmd) {
            const parts = cmd.slice(1).split(' ');
            const command = parts[0].toLowerCase();

            switch (command) {
                case 'help':
                    addOutput('[HELP] Available commands:', 'info');
                    addOutput('  :help          - Show this help', 'result');
                    addOutput('  :clear         - Clear terminal output', 'result');
                    addOutput('  :sample        - Load sample dataset', 'result');
                    addOutput('  :vars          - List defined variables', 'result');
                    addOutput('', 'result');
                    addOutput('[HELP] R functions: summary, mean, median, sd, var, cor, t.test, lm, hist', 'info');
                    break;
                case 'clear':
                    output.innerHTML = '';
                    addOutput('[MARCUS] Terminal cleared.', 'info');
                    break;
                case 'sample':
                    loadSampleData();
                    break;
                case 'vars':
                    executeR('ls()');
                    break;
                default:
                    addOutput('[ERROR] Unknown command: ' + command, 'error');
            }
        }

        async function loadSampleData() {
            if (!isReady || !webR) {
                addOutput('[ERROR] R not ready. Please wait.', 'error');
                return;
            }
            
            addOutput('[MARCUS] Loading sample retail sales data...', 'info');
            
            try {
                // Create sample data frame
                await webR.evalRVoid('retail_sales <- data.frame(' +
                    'transaction_id = sprintf("TXN%03d", 1:100),' +
                    'product = sample(c("Laptop","Phone","Tablet","Headphones","Monitor"), 100, replace=TRUE),' +
                    'region = sample(c("North","South","East","West"), 100, replace=TRUE),' +
                    'quantity = sample(1:10, 100, replace=TRUE),' +
                    'unit_price = sample(50:500, 100, replace=TRUE)' +
                    ')');
                    
                await webR.evalRVoid('retail_sales$revenue <- retail_sales$quantity * retail_sales$unit_price');
                
                addOutput('[MARCUS] Sample data loaded! 100 retail sales records created.', 'success');
                addOutput('[MARCUS] Try: head(retail_sales) or summary(retail_sales$revenue)', 'info');
            } catch (err) {
                addOutput('[ERROR] Failed to load sample data: ' + (err.message || String(err)), 'error');
            }
        }

        // Clear Output button - works even while loading
        btnClear.addEventListener('click', () => {
            output.innerHTML = '';
            addOutput('[MARCUS] Terminal cleared.', 'info');
            if (!isReady) {
                addOutput('[MARCUS] R still loading... Status: ' + status.textContent, 'info');
            }
            input.focus();
        });

        // Load Sample button
        btnSample.addEventListener('click', () => {
            if (!isReady) {
                addOutput('[MARCUS] R still loading. Please wait for READY status.', 'info');
                return;
            }
            loadSampleData();
        });

        // Help button
        btnHelp.addEventListener('click', () => {
            handleSpecialCommand(':help');
        });

        // Input keydown handler
        input.addEventListener('keydown', async (e) => {
            if (e.key === 'Enter' && input.value.trim()) {
                await executeR(input.value.trim());
                input.value = '';
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    input.value = commandHistory[historyIndex] || '';
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    input.value = commandHistory[historyIndex] || '';
                } else {
                    historyIndex = commandHistory.length;
                    input.value = '';
                }
            }
        });

        // Sidebar snippets
        document.querySelectorAll('.snippet-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const code = btn.dataset.code;
                input.value = code;
                input.focus();
            });
        });

        // Start initialization
        initWebR();
    </script>
</body>
</html>`;
