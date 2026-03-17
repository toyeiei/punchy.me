import { PUNCHY_PORTAL_HTML } from './portal';

export const ZEUS_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ZEUS | Monte Carlo Retirement Simulator | PUNCHY.ME</title>
    <meta name="description" content="Monte Carlo simulation for retirement planning. Visualize 1000 scenarios of your financial future. See your probability of reaching FIRE.">
    <link rel="canonical" href="https://punchy.me/zeus" />
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E⚡%3C/text%3E%3C/svg%3E">

    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://punchy.me/zeus">
    <meta property="og:title" content="ZEUS | Monte Carlo Retirement Simulator | PUNCHY.ME">
    <meta property="og:description" content="Visualize 1000 scenarios of your financial future. See your probability of reaching FIRE.">
    <meta property="og:image" content="https://punchy.me/og-images/og-image-zeus.webp">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@punchyme">
    <meta name="twitter:title" content="ZEUS | Monte Carlo Retirement Simulator">
    <meta name="twitter:description" content="Visualize 1000 scenarios of your financial future. Calculate your FIRE probability.">
    <meta name="twitter:image" content="https://punchy.me/og-images/og-image-zeus.webp">

    <!-- JSON-LD Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "ZEUS Monte Carlo Simulator",
      "operatingSystem": "Any",
      "applicationCategory": "FinanceApplication",
      "url": "https://punchy.me/zeus",
      "description": "Monte Carlo simulation for retirement planning. Visualize 1000 scenarios of your financial future.",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "featureList": ["Monte Carlo Simulation", "FIRE Calculator", "Retirement Planning", "Probability Analysis"]
    }
    </script>

    <link href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <!-- Chart.js from CDN - lightweight and fast -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
    <style>
        :root {
            --bg: #000000;
            --accent: #fbbf24;
            --accent-hover: #fcd34d;
            --accent-secondary: #f97316;
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
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1205 50%, #0a0a0a 100%);
            z-index: -2;
        }
        .bg-overlay {
            position: fixed;
            inset: 0;
            background: radial-gradient(ellipse at 50% 0%, rgba(251, 191, 36, 0.08) 0%, transparent 50%),
                        radial-gradient(ellipse at 80% 80%, rgba(249, 115, 22, 0.05) 0%, transparent 50%);
            z-index: -1;
        }

        .lightning-flash {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: radial-gradient(ellipse at 50% 30%, rgba(251, 191, 36, 0.15) 0%, transparent 70%);
            z-index: 9998;
            pointer-events: none;
            opacity: 0;
            animation: lightning 8s infinite;
        }

        @keyframes lightning {
            0%, 95%, 100% { opacity: 0; }
            96% { opacity: 1; }
            97% { opacity: 0; }
            98% { opacity: 0.5; }
        }
        
        .container { 
            z-index: 10; 
            padding: 5rem 2rem 2rem; 
            position: relative; 
            max-width: 1200px; 
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
            font-family: var(--font-brand); font-size: clamp(3rem, 12vw, 100px); font-weight: 400;
            line-height: 0.85;
            color: var(--accent);
            letter-spacing: -3px;
            text-transform: uppercase;
            animation: thunder-glow 3s infinite;
        }

        @keyframes thunder-glow {
            0%, 100% { text-shadow: 0 0 30px rgba(251, 191, 36, 0.3); }
            50% { text-shadow: 0 0 50px rgba(251, 191, 36, 0.6), 0 0 80px rgba(249, 115, 22, 0.3); }
        }

        .beta-badge {
            background: linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%);
            color: #000;
            font-size: 0.75rem;
            font-weight: 900;
            padding: 4px 10px;
            border-radius: 6px;
            font-family: var(--font-mono);
            box-shadow: 0 0 15px rgba(251, 191, 36, 0.5);
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

        .main-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
            margin-top: 2.5rem;
        }

        @media (min-width: 900px) {
            .main-grid { grid-template-columns: 350px 1fr; }
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
            border-color: rgba(251, 191, 36, 0.3);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }

        label { 
            color: var(--text-dim); 
            font-size: 0.75rem; 
            text-transform: uppercase; 
            font-weight: 700; 
            letter-spacing: 1px; 
            margin-bottom: 0.5rem; 
            display: block; 
        }

        input, select {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 0.85rem 1rem;
            border-radius: 10px;
            color: var(--text-main);
            font-family: var(--font-mono);
            width: 100%;
            outline: none;
            transition: all 0.2s;
            font-size: 0.9rem;
        }
        input:focus, select:focus {
            border-color: var(--accent);
            background: rgba(255, 255, 255, 0.08);
            box-shadow: 0 0 10px rgba(251, 191, 36, 0.1);
        }
        input[type="number"] {
            -moz-appearance: textfield;
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        .input-group {
            margin-bottom: 1.25rem;
        }

        .slider-group {
            margin-bottom: 1.25rem;
        }
        .slider-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.5rem;
        }
        .slider-value {
            color: var(--accent);
            font-weight: 700;
            font-size: 0.85rem;
        }

        input[type="range"] {
            -webkit-appearance: none;
            width: 100%;
            height: 6px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
            padding: 0;
            border: none;
        }
        input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 18px;
            height: 18px;
            background: var(--accent);
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
        }
        input[type="range"]::-moz-range-thumb {
            width: 18px;
            height: 18px;
            background: var(--accent);
            border-radius: 50%;
            cursor: pointer;
            border: none;
        }

        .btn-simulate {
            margin-top: 1.5rem;
            background: linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%);
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
            box-shadow: 0 0 15px rgba(251, 191, 36, 0.3);
        }
        .btn-simulate:hover {
            transform: scale(1.02);
            box-shadow: 0 0 30px rgba(251, 191, 36, 0.5);
        }
        .btn-simulate:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }

        .results-section {
            display: none;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        @media (min-width: 600px) {
            .stats-grid { grid-template-columns: repeat(4, 1fr); }
        }

        .stat-box {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 1rem;
            text-align: center;
        }
        .stat-value {
            font-size: 1.3rem;
            font-weight: 900;
            color: var(--accent);
        }
        .stat-label {
            font-size: 0.65rem;
            color: var(--text-dim);
            text-transform: uppercase;
            margin-top: 0.25rem;
            letter-spacing: 0.5px;
        }

        .chart-container {
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(251, 191, 36, 0.2);
            border-radius: 16px;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
        }

        .chart-title {
            font-family: var(--font-brand);
            font-size: 1rem;
            color: var(--accent);
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 1rem;
            text-align: center;
        }

        .probability-bar {
            margin-top: 1.5rem;
        }
        .prob-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
        }
        .prob-title {
            font-size: 0.85rem;
            color: var(--text-main);
        }
        .prob-value {
            font-size: 0.85rem;
            font-weight: 700;
            color: var(--accent);
        }
        .prob-track {
            height: 12px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 6px;
            overflow: hidden;
        }
        .prob-fill {
            height: 100%;
            background: linear-gradient(90deg, #ef4444 0%, #fbbf24 50%, #22c55e 100%);
            border-radius: 6px;
            transition: width 1s ease-out;
        }

        .insight-box {
            background: rgba(251, 191, 36, 0.08);
            border: 1px solid rgba(251, 191, 36, 0.3);
            border-radius: 12px;
            padding: 1.25rem;
            margin-top: 1rem;
        }
        .insight-box h4 {
            color: var(--accent);
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 0.5rem;
        }
        .insight-box p {
            color: var(--text-main);
            font-size: 0.85rem;
            line-height: 1.5;
        }

        .iterations-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(251, 191, 36, 0.15);
            border: 1px solid rgba(251, 191, 36, 0.3);
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.75rem;
            color: var(--accent);
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
    <div class="lightning-flash"></div>
    
    <div class="container">
        <div class="title-container">
            <h1>ZEUS</h1>
            <span class="beta-badge">BETA</span>
        </div>
        
        <p class="desc">Monte Carlo Retirement Simulator. Visualize 1000 scenarios of your financial future. See your probability of reaching FIRE.</p>

        <div class="main-grid">
            <div class="panel">
                <label>Your Profile</label>
                <div style="display: none;"><input type="text" id="hp_field" tabindex="-1" autocomplete="off"></div>
                
                <div class="input-group">
                    <div class="slider-header">
                        <label style="margin-bottom: 0;">Current Age</label>
                        <span class="slider-value" id="age-value">35</span>
                    </div>
                    <input type="range" id="age" min="18" max="80" value="35" oninput="updateSlider('age')">
                </div>

                <div class="input-group">
                    <label>Annual Income ($)</label>
                    <input type="number" id="income" value="100000" min="0" step="5000">
                </div>

                <div class="input-group">
                    <div class="slider-header">
                        <label style="margin-bottom: 0;">Savings Rate</label>
                        <span class="slider-value" id="savingsRate-value">25%</span>
                    </div>
                    <input type="range" id="savingsRate" min="0" max="80" value="25" oninput="updateSlider('savingsRate', '%')">
                </div>

                <div class="input-group">
                    <label>Current Savings ($)</label>
                    <input type="number" id="currentSavings" value="50000" min="0" step="5000">
                </div>

                <div class="input-group">
                    <div class="slider-header">
                        <label style="margin-bottom: 0;">Expected Return</label>
                        <span class="slider-value" id="returnRate-value">7%</span>
                    </div>
                    <input type="range" id="returnRate" min="0" max="15" value="7" step="0.5" oninput="updateSlider('returnRate', '%')">
                </div>

                <div class="input-group">
                    <div class="slider-header">
                        <label style="margin-bottom: 0;">Inflation Rate</label>
                        <span class="slider-value" id="inflationRate-value">3%</span>
                    </div>
                    <input type="range" id="inflationRate" min="0" max="10" value="3" step="0.5" oninput="updateSlider('inflationRate', '%')">
                </div>

                <div class="input-group">
                    <label>Retirement Target ($)</label>
                    <input type="number" id="retirementTarget" value="1000000" min="0" step="50000">
                </div>

                <button class="btn-simulate" id="simulate-btn" onclick="runSimulation()">Run 1000 Simulations</button>
            </div>

            <div class="panel results-section" id="results">
                <div class="iterations-badge">
                    <span>⚡</span>
                    <span>1,000 Monte Carlo Iterations</span>
                </div>

                <div class="stats-grid" id="stats-grid"></div>

                <div class="chart-container">
                    <div class="chart-title">1000 Paths to Retirement</div>
                    <canvas id="simulationChart"></canvas>
                </div>

                <div class="chart-container">
                    <div class="chart-title">Final Wealth Distribution</div>
                    <canvas id="distributionChart" style="max-height: 200px;"></canvas>
                </div>

                <div class="probability-bar">
                    <div class="prob-header">
                        <span class="prob-title">Probability of Reaching Target</span>
                        <span class="prob-value" id="prob-value">0%</span>
                    </div>
                    <div class="prob-track">
                        <div class="prob-fill" id="prob-fill" style="width: 0%;"></div>
                    </div>
                </div>

                <div class="insight-box" id="insight">
                    <h4>💡 Key Insight</h4>
                    <p id="insight-text">Run the simulation to see your personalized analysis.</p>
                </div>
            </div>
        </div>
    </div>

    <script>
        let simulationChart = null;
        let distributionChart = null;

        window.updateSlider = function(id, suffix = '') {
            const slider = document.getElementById(id);
            const display = document.getElementById(id + '-value');
            display.textContent = slider.value + suffix;
        };

        // Initialize displays
        updateSlider('age');
        updateSlider('savingsRate', '%');
        updateSlider('returnRate', '%');
        updateSlider('inflationRate', '%');

        window.runSimulation = async function() {
            const btn = document.getElementById('simulate-btn');
            const results = document.getElementById('results');
            
            const inputs = {
                age: parseInt(document.getElementById('age').value),
                income: parseFloat(document.getElementById('income').value) || 0,
                savingsRate: parseFloat(document.getElementById('savingsRate').value) / 100,
                currentSavings: parseFloat(document.getElementById('currentSavings').value) || 0,
                returnRate: parseFloat(document.getElementById('returnRate').value) / 100,
                inflationRate: parseFloat(document.getElementById('inflationRate').value) / 100,
                retirementTarget: parseFloat(document.getElementById('retirementTarget').value) || 0,
            };

            if (inputs.income <= 0) {
                alert('Please enter your annual income.');
                return;
            }

            btn.disabled = true;
            btn.textContent = 'SIMULATING...';

            try {
                const hp_field = document.getElementById('hp_field').value;
                const response = await fetch('/zeus/simulate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...inputs, hp_field })
                });

                if (response.ok) {
                    const data = await response.json();
                    renderResults(data, inputs);
                    results.style.display = 'block';
                    results.classList.add('fade-in-up');
                    results.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    const err = await response.json();
                    alert('Simulation failed: ' + (err.error || 'Unknown error'));
                }
            } catch (err) {
                alert('Network error: ' + err.message);
            } finally {
                btn.disabled = false;
                btn.textContent = 'Run 1000 Simulations';
            }
        };

        function renderResults(data, inputs) {
            // Stats grid
            const statsGrid = document.getElementById('stats-grid');
            statsGrid.innerHTML = '';
            
            const stats = [
                { value: formatCurrency(data.medianFinal), label: 'Median Outcome' },
                { value: formatCurrency(data.p10), label: '10th Percentile' },
                { value: formatCurrency(data.p90), label: '90th Percentile' },
                { value: data.medianYearsToFire + ' yrs', label: 'Years to FIRE' }
            ];
            
            stats.forEach((stat, i) => {
                const box = document.createElement('div');
                box.className = 'stat-box fade-in-up';
                box.style.animationDelay = (i * 0.1) + 's';
                box.innerHTML = '<div class="stat-value">' + stat.value + '</div><div class="stat-label">' + stat.label + '</div>';
                statsGrid.appendChild(box);
            });

            // Probability bar
            const probValue = document.getElementById('prob-value');
            const probFill = document.getElementById('prob-fill');
            probValue.textContent = (data.successProbability * 100).toFixed(1) + '%';
            setTimeout(() => {
                probFill.style.width = (data.successProbability * 100) + '%';
            }, 100);

            // Line chart - all iterations
            const yearsToSimulate = 65 - inputs.age;
            const labels = Array.from({ length: yearsToSimulate }, (_, i) => inputs.age + i);
            
            if (simulationChart) simulationChart.destroy();
            
            const ctx1 = document.getElementById('simulationChart').getContext('2d');
            
            // Prepare datasets - show median line prominently, others faded
            const datasets = data.iterations.slice(0, 200).map((iteration, i) => ({
                data: iteration.slice(0, yearsToSimulate),
                borderColor: i === 0 ? 'rgba(251, 191, 36, 1)' : 'rgba(251, 191, 36, 0.08)',
                borderWidth: i === 0 ? 3 : 1,
                pointRadius: 0,
                fill: false,
                tension: 0.1
            }));

            // Add target line
            datasets.push({
                data: Array(yearsToSimulate).fill(inputs.retirementTarget),
                borderColor: 'rgba(34, 197, 94, 0.8)',
                borderWidth: 2,
                borderDash: [5, 5],
                pointRadius: 0,
                fill: false,
                label: 'Target'
            });

            simulationChart = new Chart(ctx1, {
                type: 'line',
                data: { labels, datasets },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: { display: false },
                        tooltip: { enabled: false }
                    },
                    scales: {
                        x: {
                            grid: { color: 'rgba(255,255,255,0.05)' },
                            ticks: { color: '#94a3b8', font: { size: 10 } }
                        },
                        y: {
                            grid: { color: 'rgba(255,255,255,0.05)' },
                            ticks: {
                                color: '#94a3b8',
                                font: { size: 10 },
                                callback: v => '$' + (v / 1000) + 'k'
                            }
                        }
                    }
                }
            });

            // Distribution histogram
            const finalValues = data.iterations.map(it => it[it.length - 1]);
            const histogram = createHistogram(finalValues, 20);
            
            if (distributionChart) distributionChart.destroy();
            
            const ctx2 = document.getElementById('distributionChart').getContext('2d');
            distributionChart = new Chart(ctx2, {
                type: 'bar',
                data: {
                    labels: histogram.bins.map(b => formatCurrencyShort(b)),
                    datasets: [{
                        data: histogram.counts,
                        backgroundColor: histogram.bins.map(b => 
                            b >= inputs.retirementTarget ? 'rgba(34, 197, 94, 0.6)' : 'rgba(251, 191, 36, 0.4)'
                        ),
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: ctx => ctx.raw + ' scenarios'
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: { display: false },
                            ticks: { color: '#94a3b8', font: { size: 9 }, maxRotation: 45 }
                        },
                        y: {
                            grid: { color: 'rgba(255,255,255,0.05)' },
                            ticks: { color: '#94a3b8', font: { size: 10 } }
                        }
                    }
                }
            });

            // Insight text
            const insightText = document.getElementById('insight-text');
            const yearsToFire = data.medianYearsToFire;
            const fireAge = inputs.age + yearsToFire;
            const successPct = (data.successProbability * 100).toFixed(0);
            
            if (data.successProbability > 0.8) {
                insightText.textContent = 'Strong position! ' + successPct + '% of simulations hit your target by age ' + fireAge + '. Consider increasing savings rate to retire even earlier or build a larger safety margin.';
            } else if (data.successProbability > 0.5) {
                insightText.textContent = 'You\\'re on track but not guaranteed. ' + successPct + '% of scenarios succeed. Consider bumping your savings rate a few percentage points for better odds.';
            } else {
                insightText.textContent = 'Challenging path ahead. Only ' + successPct + '% of simulations reach your goal. Consider: higher savings rate, longer timeline, or adjusting your target.';
            }
        }

        function formatCurrency(n) {
            if (n >= 1000000) return '$' + (n / 1000000).toFixed(1) + 'M';
            if (n >= 1000) return '$' + (n / 1000).toFixed(0) + 'k';
            return '$' + n.toFixed(0);
        }

        function formatCurrencyShort(n) {
            if (n >= 1000000) return '$' + (n / 1000000).toFixed(1) + 'M';
            return '$' + (n / 1000).toFixed(0) + 'k';
        }

        function createHistogram(values, numBins) {
            const min = Math.min(...values);
            const max = Math.max(...values);
            const binWidth = (max - min) / numBins;
            
            const bins = [];
            const counts = [];
            
            for (let i = 0; i < numBins; i++) {
                bins.push(min + (i + 0.5) * binWidth);
                counts.push(0);
            }
            
            values.forEach(v => {
                const binIndex = Math.min(Math.floor((v - min) / binWidth), numBins - 1);
                counts[binIndex]++;
            });
            
            return { bins, counts };
        }
    </script>
</body>
</html>`;
