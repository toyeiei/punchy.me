import { PUNCHY_PORTAL_HTML } from './portal';

export const MARCUS_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MARCUS | R Analytics for Everyone | PUNCHY.ME</title>
    <meta name="description" content="Run R statistical analysis in your browser. No coding required. Pre-built templates for comparing groups, finding trends, and spotting outliers. AI-powered explanations.">
    <link rel="canonical" href="https://punchy.me/marcus" />
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E📊%3C/text%3E%3C/svg%3E">

    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://punchy.me/marcus">
    <meta property="og:title" content="MARCUS | R Analytics for Everyone | PUNCHY.ME">
    <meta property="og:description" content="Run R statistical analysis in your browser. No coding required. Pre-built templates for everyone.">
    <meta property="og:image" content="https://punchy.me/og-images/og-image-marcus.webp">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@punchyme">
    <meta name="twitter:title" content="MARCUS | R Analytics for Everyone">
    <meta name="twitter:description" content="Run R statistical analysis in your browser. No coding required.">
    <meta name="twitter:image" content="https://punchy.me/og-images/og-image-marcus.webp">

    <!-- JSON-LD Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "MARCUS Analytics",
      "operatingSystem": "Any",
      "applicationCategory": "DataAnalysisApplication",
      "url": "https://punchy.me/marcus",
      "description": "Run R statistical analysis in your browser. No coding required. Pre-built templates for comparing groups, finding trends, and spotting outliers.",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "featureList": ["T-test", "Correlation", "Regression", "Summary Statistics", "Visualization"]
    }
    </script>

    <link href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
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
        
        html, body { height: 100%; background-color: #000; }

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

        .bg-image {
            position: fixed;
            inset: 0;
            background: linear-gradient(135deg, #0a0a0a 0%, #0d1117 50%, #0a0a0a 100%);
            z-index: -2;
        }
        .bg-overlay {
            position: fixed;
            inset: 0;
            background: radial-gradient(ellipse at 20% 0%, rgba(139, 92, 246, 0.06) 0%, transparent 50%),
                        radial-gradient(ellipse at 80% 100%, rgba(34, 197, 94, 0.05) 0%, transparent 50%);
            z-index: -1;
        }

        .scan-line {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100px;
            background: linear-gradient(to bottom, transparent, rgba(139, 92, 246, 0.08), transparent);
            border-bottom: 1px solid rgba(139, 92, 246, 0.15);
            z-index: 9999;
            animation: scan 5s linear infinite;
            pointer-events: none;
        }

        @keyframes scan {
            0% { transform: translateY(-100px); }
            100% { transform: translateY(100vh); }
        }
        
        .container { 
            z-index: 10; 
            padding: 5rem 2rem 2rem; 
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
            margin-bottom: 1.5rem;
        }

        h1 {
            font-family: var(--font-brand); font-size: clamp(3rem, 10vw, 90px); font-weight: 400;
            line-height: 0.85;
            color: var(--text-main);
            letter-spacing: -3px;
            text-transform: uppercase;
            animation: main-glitch 5s infinite;
        }

        @keyframes main-glitch {
            0%, 80%, 100% { transform: skew(0deg); text-shadow: none; }
            81% { transform: skew(1.5deg); text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff; }
            82% { transform: skew(-1.5deg); text-shadow: -2px 0 #ff00ff, 2px 0 #00ffff; }
            83% { transform: skew(0deg); text-shadow: none; }
        }

        .beta-badge {
            background: linear-gradient(135deg, #22c55e 0%, #8b5cf6 100%);
            color: #000;
            font-size: 0.75rem;
            font-weight: 900;
            padding: 4px 10px;
            border-radius: 6px;
            font-family: var(--font-mono);
            box-shadow: 0 0 15px rgba(34, 197, 94, 0.5);
            animation: pulse 2s infinite alternate;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        @keyframes pulse {
            0% { transform: scale(1); opacity: 0.85; }
            100% { transform: scale(1.05); opacity: 1; }
        }

        .desc {
            color: var(--text-dim);
            font-size: 0.95rem;
            line-height: 1.6;
            margin-bottom: 0.5rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }

        .ai-badge {
            display: inline-block;
            background: var(--accent);
            color: #000;
            font-size: 0.6rem;
            font-weight: 900;
            padding: 2px 6px;
            border-radius: 4px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-left: 0.5rem;
        }

        .main-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
            margin-top: 2.5rem;
        }

        @media (min-width: 900px) {
            .main-grid { grid-template-columns: 300px 1fr; }
        }

        .panel {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 2rem;
            border-radius: 24px;
            transition: all 0.3s ease;
            text-align: left;
        }
        .panel:hover {
            border-color: rgba(139, 92, 246, 0.3);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }

        .template-list {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        .template-btn {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 1rem 1.25rem;
            text-align: left;
            cursor: pointer;
            transition: all 0.2s ease;
            font-family: var(--font-mono);
            color: var(--text-main);
        }
        .template-btn:hover {
            background: rgba(139, 92, 246, 0.1);
            border-color: rgba(139, 92, 246, 0.4);
            transform: translateX(4px);
        }
        .template-btn.active {
            background: rgba(139, 92, 246, 0.15);
            border-color: #8b5cf6;
            box-shadow: 0 0 15px rgba(139, 92, 246, 0.2);
        }
        .template-title {
            font-weight: 700;
            font-size: 0.9rem;
            margin-bottom: 0.25rem;
        }
        .template-desc {
            font-size: 0.75rem;
            color: var(--text-dim);
        }

        label { 
            color: var(--text-dim); 
            font-size: 0.75rem; 
            text-transform: uppercase; 
            font-weight: 700; 
            letter-spacing: 1px; 
            margin-bottom: 0.75rem; 
            display: block; 
        }

        textarea {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 1rem 1.2rem;
            border-radius: 12px;
            color: var(--text-main);
            font-family: var(--font-mono);
            width: 100%;
            min-height: 150px;
            outline: none;
            resize: vertical;
            transition: all 0.2s;
        }
        textarea:focus {
            border-color: #8b5cf6;
            background: rgba(255, 255, 255, 0.08);
            box-shadow: 0 0 10px rgba(139, 92, 246, 0.1);
        }

        .btn-run {
            margin-top: 1.5rem;
            background: linear-gradient(135deg, #8b5cf6 0%, #22c55e 100%);
            color: #000;
            border: none;
            padding: 1.1rem;
            border-radius: 12px;
            font-weight: 900;
            width: 100%;
            cursor: pointer;
            text-transform: uppercase;
            font-family: var(--font-mono);
            letter-spacing: 1px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 0 15px rgba(139, 92, 246, 0.3);
        }
        .btn-run:hover {
            transform: scale(1.02);
            box-shadow: 0 0 25px rgba(139, 92, 246, 0.5);
        }
        .btn-run:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }

        .output-section {
            display: none;
            margin-top: 2rem;
        }

        .output-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1rem;
        }
        .output-header h3 {
            font-family: var(--font-brand);
            font-size: 1.3rem;
            color: #8b5cf6;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        .stat-box {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 1rem;
            text-align: center;
        }
        .stat-value {
            font-size: 1.5rem;
            font-weight: 900;
            color: #8b5cf6;
        }
        .stat-label {
            font-size: 0.7rem;
            color: var(--text-dim);
            text-transform: uppercase;
            margin-top: 0.25rem;
        }

        .console-output {
            background: rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(139, 92, 246, 0.2);
            border-radius: 12px;
            padding: 1.25rem;
            font-family: var(--font-mono);
            font-size: 0.8rem;
            color: var(--accent);
            white-space: pre-wrap;
            overflow-x: auto;
            line-height: 1.6;
            max-height: 300px;
            overflow-y: auto;
        }

        .ai-explanation {
            background: rgba(139, 92, 246, 0.08);
            border: 1px solid rgba(139, 92, 246, 0.3);
            border-radius: 12px;
            padding: 1.5rem;
            margin-top: 1.5rem;
        }
        .ai-explanation h4 {
            color: #8b5cf6;
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 0.75rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .ai-explanation p {
            color: var(--text-main);
            font-size: 0.9rem;
            line-height: 1.6;
        }

        .loading-bar {
            display: none;
            margin-top: 1.5rem;
            text-align: center;
        }
        .loading-text {
            color: #8b5cf6;
            font-size: 0.85rem;
            margin-bottom: 0.75rem;
        }
        .progress-bar {
            height: 4px;
            background: rgba(139, 92, 246, 0.2);
            border-radius: 2px;
            overflow: hidden;
        }
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #8b5cf6, #22c55e);
            animation: progress 2s ease-in-out infinite;
        }
        @keyframes progress {
            0% { width: 0%; margin-left: 0; }
            50% { width: 50%; margin-left: 25%; }
            100% { width: 0%; margin-left: 100%; }
        }

        .data-hint {
            font-size: 0.7rem;
            color: var(--text-dim);
            margin-top: 0.5rem;
            margin-bottom: 1rem;
        }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
    </style>
</head>
<body>
    ${PUNCHY_PORTAL_HTML}
    <div class="bg-image"></div>
    <div class="bg-overlay"></div>
    <div class="scan-line"></div>
    
    <div class="container">
        <div class="title-container">
            <h1>MARCUS</h1>
            <span class="beta-badge">BETA</span>
        </div>
        
        <p class="desc">R Analytics for Everyone. Run statistical analysis in your browser. No coding required.</p>

        <div class="main-grid">
            <div class="panel">
                <label>Choose Analysis</label>
                <div class="template-list">
                    <button class="template-btn active" data-template="summary" onclick="selectTemplate('summary')">
                        <div class="template-title">📊 Quick Summary</div>
                        <div class="template-desc">Mean, median, range, outliers</div>
                    </button>
                    <button class="template-btn" data-template="compare" onclick="selectTemplate('compare')">
                        <div class="template-title">⚖️ Compare Groups</div>
                        <div class="template-desc">Are two groups different?</div>
                    </button>
                    <button class="template-btn" data-template="trend" onclick="selectTemplate('trend')">
                        <div class="template-title">📈 Find Trend</div>
                        <div class="template-desc">Is there a pattern?</div>
                    </button>
                    <button class="template-btn" data-template="correlation" onclick="selectTemplate('correlation')">
                        <div class="template-title">🔗 Test Relationship</div>
                        <div class="template-desc">Do these relate to each other?</div>
                    </button>
                    <button class="template-btn" data-template="distribution" onclick="selectTemplate('distribution')">
                        <div class="template-title">🎯 See Distribution</div>
                        <div class="template-desc">How is data spread out?</div>
                    </button>
                </div>
            </div>

            <div class="panel">
                <label>Your Data<span class="ai-badge">AI Explained</span></label>
                <div style="display: none;"><input type="text" id="hp_field" tabindex="-1" autocomplete="off"></div>
                <textarea id="data-input" placeholder="Paste your data here (CSV format)&#10;&#10;Example:&#10;name,sales,region&#10;Alice,1200,North&#10;Bob,980,South&#10;Carol,1450,North"></textarea>
                <div style="display: flex; gap: 0.75rem; margin-top: 0.75rem; margin-bottom: 0.5rem;">
                    <button class="btn-sample" onclick="loadSampleData()" style="flex:1;background:rgba(139, 92, 246, 0.15);border:1px solid rgba(139, 92, 246, 0.4);color:#8b5cf6;padding:0.75rem;border-radius:8px;cursor:pointer;font-family:var(--font-mono);font-size:0.8rem;font-weight:700;transition:all 0.2s;">
                        📋 Load Sample Data
                    </button>
                    <button class="btn-clear" onclick="clearData()" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:var(--text-dim);padding:0.75rem 1rem;border-radius:8px;cursor:pointer;font-family:var(--font-mono);font-size:0.8rem;transition:all 0.2s;">
                        Clear
                    </button>
                </div>
                <p class="data-hint">First row = column names. Comma-separated. Works with numbers, text, or mixed data.</p>
                
                <button class="btn-run" id="run-btn" onclick="runAnalysis()">Analyze My Data</button>
                
                <div class="loading-bar" id="loading">
                    <div class="loading-text">Running R analysis in your browser...</div>
                    <div class="progress-bar"><div class="progress-fill"></div></div>
                </div>

                <div class="output-section" id="output">
                    <div class="output-header">
                        <h3>Results</h3>
                    </div>
                    
                    <div class="stats-grid" id="stats"></div>
                    
                    <label>R Console Output</label>
                    <div class="console-output" id="console"></div>
                    
                    <div class="ai-explanation" id="explanation">
                        <h4>✨ What This Means</h4>
                        <p id="ai-text">Analyzing your results...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://webr.r-wasm.org/v0.4.0/webr.mjs" type="module"></script>
    <script type="module">
        import { WebR } from 'https://webr.r-wasm.org/v0.4.0/webr.mjs';

        let webR = null;
        let currentTemplate = 'summary';

        window.selectTemplate = function(template) {
            currentTemplate = template;
            document.querySelectorAll('.template-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.template === template);
            });
            updatePlaceholder();
        };

        // Generate sample retail sales data (100 records)
        window.loadSampleData = function() {
            const regions = ['North', 'South', 'East', 'West', 'Central'];
            const products = ['Laptop', 'Phone', 'Tablet', 'Headphones', 'Monitor', 'Keyboard', 'Mouse', 'Webcam'];
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            
            let csv = 'transaction_id,date,product,region,quantity,unit_price,total_sale,profit_margin\\n';
            
            for (let i = 1; i <= 100; i++) {
                const month = months[Math.floor(Math.random() * 12)];
                const product = products[Math.floor(Math.random() * products.length)];
                const region = regions[Math.floor(Math.random() * regions.length)];
                const quantity = Math.floor(Math.random() * 10) + 1;
                const unitPrice = Math.floor(Math.random() * 500) + 50;
                const totalSale = quantity * unitPrice;
                const profitMargin = (Math.random() * 0.4 + 0.1).toFixed(2);
                
                csv += 'TXN' + String(i).padStart(3, '0') + ',' + month + ' 2026,' + product + ',' + region + ',' + quantity + ',' + unitPrice + ',' + totalSale + ',' + profitMargin + '\\n';
            }
            
            document.getElementById('data-input').value = csv;
        };

        window.clearData = function() {
            document.getElementById('data-input').value = '';
        };

        function updatePlaceholder() {
            const input = document.getElementById('data-input');
            const placeholders = {
                summary: 'Paste your data here (CSV format)\\n\\nExample:\\nsales\\n1200\\n980\\n1450\\n1100\\n890',
                compare: 'Paste grouped data (CSV)\\n\\nExample:\\ngroup,value\\nA,120\\nA,135\\nB,98\\nB,105',
                trend: 'Paste time series data\\n\\nExample:\\nmonth,revenue\\nJan,10000\\nFeb,12000\\nMar,11500',
                correlation: 'Paste two columns to compare\\n\\nExample:\\nprice,sales\\n10,500\\n15,420\\n20,380',
                distribution: 'Paste values to see spread\\n\\nExample:\\nscore\\n85\\n90\\n78\\n92\\n88\\n95'
            };
            input.placeholder = placeholders[template] || placeholders.summary;
        }

        window.runAnalysis = async function() {
            const data = document.getElementById('data-input').value.trim();
            if (!data) {
                alert('Please paste some data to analyze.');
                return;
            }

            const runBtn = document.getElementById('run-btn');
            const loading = document.getElementById('loading');
            const output = document.getElementById('output');
            const consoleEl = document.getElementById('console');
            const statsEl = document.getElementById('stats');
            const aiText = document.getElementById('ai-text');

            runBtn.disabled = true;
            runBtn.textContent = 'ANALYZING...';
            loading.style.display = 'block';
            output.style.display = 'none';

            try {
                // Initialize webR if not already done
                if (!webR) {
                    webR = new WebR();
                    await webR.init();
                }

                // Parse CSV data and run analysis
                const rCode = generateRCode(data, currentTemplate);
                const result = await webR.evalRString(rCode);
                
                // Display results
                consoleEl.textContent = result;
                
                // Parse key stats from output
                const stats = parseStats(result, currentTemplate);
                statsEl.innerHTML = stats.map(s => 
                    '<div class="stat-box"><div class="stat-value">' + s.value + '</div><div class="stat-label">' + s.label + '</div></div>'
                ).join('');

                // Get AI explanation
                output.style.display = 'block';
                output.classList.add('fade-in-up');
                
                // Call backend for AI explanation
                const hp_field = document.getElementById('hp_field').value;
                const explainRes = await fetch('/marcus/explain', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        template: currentTemplate, 
                        output: result,
                        data: data.substring(0, 500),
                        hp_field 
                    })
                });
                
                if (explainRes.ok) {
                    const { explanation } = await explainRes.json();
                    aiText.textContent = explanation;
                } else {
                    aiText.textContent = 'Analysis complete. Check the R output above for detailed statistics.';
                }

            } catch (error) {
                consoleEl.textContent = 'Error: ' + error.message;
                statsEl.innerHTML = '<div class="stat-box"><div class="stat-value">❌</div><div class="stat-label">Error</div></div>';
                output.style.display = 'block';
            } finally {
                runBtn.disabled = false;
                runBtn.textContent = 'Analyze My Data';
                loading.style.display = 'none';
            }
        };

        function generateRCode(csvData, template) {
            const escapedData = csvData.replace(/"/g, '\\\\"').replace(/\\n/g, '\\\\n');
            
            const templates = {
                summary: \`
data <- read.csv(text="\${escapedData}", stringsAsFactors=FALSE)
nums <- sapply(data, is.numeric)
if(any(nums)) {
    cat("=== SUMMARY STATISTICS ===\\\\n")
    print(summary(data[, nums]))
    cat("\\\\n=== STANDARD DEVIATION ===\\\\n")
    print(sapply(data[, nums], sd, na.rm=TRUE))
} else {
    cat("=== DATA PREVIEW ===\\\\n")
    print(head(data))
    cat("\\\\n=== STRUCTURE ===\\\\n")
    str(data)
}
\`,
                compare: \`
data <- read.csv(text="\${escapedData}", stringsAsFactors=FALSE)
cat("=== GROUP COMPARISON ===\\\\n")
if(ncol(data) >= 2) {
    groups <- unique(data[,1])
    cat("Groups found:", length(groups), "\\\\n")
    print(by(data[,2], data[,1], summary))
    if(length(groups) == 2) {
        cat("\\\\n=== T-TEST ===\\\\n")
        g1 <- data[data[,1] == groups[1], 2]
        g2 <- data[data[,1] == groups[2], 2]
        print(t.test(g1, g2))
    }
} else {
    print(summary(data))
}
\`,
                trend: \`
data <- read.csv(text="\${escapedData}", stringsAsFactors=FALSE)
cat("=== TREND ANALYSIS ===\\\\n")
if(ncol(data) >= 2) {
    x <- 1:nrow(data)
    y <- as.numeric(data[,2])
    model <- lm(y ~ x)
    cat("Direction:", ifelse(coef(model)[2] > 0, "UPWARD ↑", "DOWNWARD ↓"), "\\\\n")
    cat("Slope:", round(coef(model)[2], 3), "\\\\n")
    cat("\\\\n=== MODEL SUMMARY ===\\\\n")
    print(summary(model))
}
\`,
                correlation: \`
data <- read.csv(text="\${escapedData}", stringsAsFactors=FALSE)
cat("=== CORRELATION ANALYSIS ===\\\\n")
if(ncol(data) >= 2) {
    x <- as.numeric(data[,1])
    y <- as.numeric(data[,2])
    r <- cor(x, y, use="complete.obs")
    cat("Correlation (r):", round(r, 3), "\\\\n")
    strength <- ifelse(abs(r) > 0.7, "STRONG", ifelse(abs(r) > 0.4, "MODERATE", "WEAK"))
    direction <- ifelse(r > 0, "positive", "negative")
    cat("Interpretation:", strength, direction, "relationship\\\\n")
    cat("\\\\n=== TEST SIGNIFICANCE ===\\\\n")
    print(cor.test(x, y))
}
\`,
                distribution: \`
data <- read.csv(text="\${escapedData}", stringsAsFactors=FALSE)
cat("=== DISTRIBUTION ANALYSIS ===\\\\n")
vals <- as.numeric(data[,1])
cat("Count:", length(vals), "\\\\n")
cat("Range:", min(vals, na.rm=TRUE), "to", max(vals, na.rm=TRUE), "\\\\n")
cat("IQR:", IQR(vals, na.rm=TRUE), "\\\\n")
cat("\\\\n=== QUARTILES ===\\\\n")
print(quantile(vals, na.rm=TRUE))
cat("\\\\n=== SKEWNESS CHECK ===\\\\n")
mean_val <- mean(vals, na.rm=TRUE)
median_val <- median(vals, na.rm=TRUE)
skew <- ifelse(mean_val > median_val, "Right-skewed →", 
         ifelse(mean_val < median_val, "Left-skewed ←", "Symmetric"))
cat("Mean:", round(mean_val, 2), "| Median:", median_val, "|", skew, "\\\\n")
\`
            };
            
            return templates[template] || templates.summary;
        }

        function parseStats(output, template) {
            const stats = [];
            
            // Extract common stats from R output
            const meanMatch = output.match(/Mean\\s*:?\\s*([\\d.-]+)/i);
            const medianMatch = output.match(/Median\\s*:?\\s*([\\d.-]+)/i);
            const corrMatch = output.match(/Correlation.*?:\\s*([\\d.-]+)/i);
            const pValMatch = output.match(/p-value[\\s:]+([\\d.e-]+)/i);
            
            if (meanMatch) stats.push({ label: 'Mean', value: meanMatch[1] });
            if (medianMatch) stats.push({ label: 'Median', value: medianMatch[1] });
            if (corrMatch) stats.push({ label: 'Correlation', value: corrMatch[1] });
            if (pValMatch) {
                const p = parseFloat(pValMatch[1]);
                stats.push({ 
                    label: 'P-value', 
                    value: p < 0.001 ? '<0.001' : p.toFixed(3) 
                });
            }
            
            if (stats.length === 0) {
                stats.push({ label: 'Analysis', value: '✓' });
            }
            
            return stats;
        }

        // Initialize placeholder
        updatePlaceholder();
    </script>
</body>
</html>`;
