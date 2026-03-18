import { PUNCHY_PORTAL_HTML } from './portal';

export const ZEUS_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ZEUS | Monte Carlo Retirement Simulator (THB) | PUNCHY.ME</title>
    <meta name="description" content="Monte Carlo simulation for retirement planning in Thai Baht. Visualize 1000 scenarios of your financial future. Income stops at age 60 (Thai retirement).">
    <link rel="canonical" href="https://punchy.me/zeus" />
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E⚡%3C/text%3E%3C/svg%3E">

    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://punchy.me/zeus">
    <meta property="og:title" content="ZEUS | Monte Carlo Retirement Simulator (THB) | PUNCHY.ME">
    <meta property="og:description" content="Visualize 1000 scenarios of your financial future in Thai Baht. Income stops at age 60 (Thai retirement).">
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

        .event-preset-btn {
            background: rgba(167, 139, 250, 0.1);
            border: 1px solid rgba(167, 139, 250, 0.3);
            border-radius: 6px;
            padding: 4px 10px;
            font-size: 0.7rem;
            color: #a78bfa;
            cursor: pointer;
            font-family: var(--font-mono);
            transition: all 0.2s;
        }
        .event-preset-btn:hover {
            background: rgba(167, 139, 250, 0.2);
            border-color: rgba(167, 139, 250, 0.5);
        }
        .event-remove-btn {
            background: rgba(239, 68, 68, 0.15);
            border: 1px solid rgba(239, 68, 68, 0.3);
            border-radius: 4px;
            padding: 3px 8px;
            cursor: pointer;
            color: #ef4444;
            font-size: 0.7rem;
            font-family: var(--font-mono);
            flex-shrink: 0;
        }
        .stat-box.danger .stat-value { color: #ef4444; }
        .stat-box.warning .stat-value { color: #f97316; }
        .stat-box.safe .stat-value { color: #22c55e; }
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
        
        <p class="desc">Monte Carlo Retirement Simulator (Thai Baht). Visualize 1000 scenarios of your financial future. Income stops at age 60 (Thai retirement).</p>

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
                    <label>Annual Income (฿) <span style="font-size:0.75em;color:#94a3b8;">(stops at age 60)</span></label>
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
                    <label>Current Savings (฿)</label>
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
                    <label>Retirement Target (฿)</label>
                    <input type="number" id="retirementTarget" value="1000000" min="0" step="50000">
                </div>

                <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
                    <label style="color: var(--accent-secondary);">Income Projection</label>
                    <div class="input-group">
                        <div class="slider-header">
                            <label style="margin-bottom: 0;">Salary Growth/Year</label>
                            <span class="slider-value" id="salaryGrowth-value">5%</span>
                        </div>
                        <input type="range" id="salaryGrowth" min="0" max="20" value="5" step="1" oninput="updateSlider('salaryGrowth', '%')">
                        <div style="font-size: 0.65rem; color: var(--text-dim); margin-top: 0.3rem;">Raises compound over time</div>
                    </div>
                </div>

                <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
                    <label style="color: #ef4444;">Crisis Simulation</label>
                    <div class="input-group">
                        <div class="slider-header">
                            <label style="margin-bottom: 0;">Crisis Events</label>
                            <span class="slider-value" id="crisisEvents-value">0</span>
                        </div>
                        <input type="range" id="crisisEvents" min="0" max="10" value="0" step="1" oninput="updateSlider('crisisEvents')">
                        <div style="font-size: 0.65rem; color: var(--text-dim); margin-top: 0.3rem;">Random 30% wealth drops (recession, pandemic, etc)</div>
                    </div>
                </div>

                <!-- Retirement Spending Section -->
                <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
                    <label style="color: #22c55e;">Retirement Spending</label>
                    <div class="input-group">
                        <label>Monthly Expenses After Retirement (฿) <span style="font-size:0.75em;color:#94a3b8;">(age 60+)</span></label>
                        <input type="number" id="monthlyExpenses" value="30000" min="0" step="1000">
                        <div style="font-size: 0.65rem; color: var(--text-dim); margin-top: 0.3rem;">Withdrawn from savings each month after retiring</div>
                    </div>
                    <div class="input-group">
                        <div class="slider-header">
                            <label style="margin-bottom: 0;">Healthcare/Month at Age 60 (฿)</label>
                            <span class="slider-value" id="healthcareBase-value">฿3,000</span>
                        </div>
                        <input type="range" id="healthcareBase" min="0" max="20000" value="3000" step="500" oninput="updateHealthcareSlider()">
                        <div style="font-size: 0.65rem; color: var(--text-dim); margin-top: 0.3rem;">Escalates with age — doubles roughly every 10 yrs</div>
                    </div>
                    <div class="input-group">
                        <div class="slider-header">
                            <label style="margin-bottom: 0;">Healthcare Cost Growth/Year</label>
                            <span class="slider-value" id="healthcareGrowth-value">7%</span>
                        </div>
                        <input type="range" id="healthcareGrowth" min="0" max="15" value="7" step="0.5" oninput="updateSlider('healthcareGrowth', '%')">
                        <div style="font-size: 0.65rem; color: var(--text-dim); margin-top: 0.3rem;">Thailand medical inflation ~7–10%/yr</div>
                    </div>
                </div>

                <!-- Life Events Section -->
                <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
                    <label style="color: #a78bfa;">Life Events</label>
                    <div style="font-size: 0.65rem; color: var(--text-dim); margin-bottom: 0.75rem;">One-time costs at specific ages — max 4 events</div>
                    <div id="life-events-list"></div>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        <button class="event-preset-btn" onclick="addLifeEvent(30, 500000, 'Wedding')">+ Wedding</button>
                        <button class="event-preset-btn" onclick="addLifeEvent(35, 3000000, 'Buy House')">+ House</button>
                        <button class="event-preset-btn" onclick="addLifeEvent(33, 800000, 'Buy Car')">+ Car</button>
                        <button class="event-preset-btn" onclick="addLifeEvent(28, 2000000, 'Children')">+ Children</button>
                    </div>
                </div>

                <div style="background: rgba(251, 191, 36, 0.08); border: 1px solid rgba(251, 191, 36, 0.2); border-radius: 8px; padding: 0.75rem; margin-top: 1rem; font-size: 0.7rem; color: var(--text-dim);">
                    <div style="color: var(--accent); font-weight: 700; margin-bottom: 0.25rem;">You will see:</div>
                    <div>• 1000 simulated futures</div>
                    <div>• Probability of reaching FIRE</div>
                    <div>• Ruin probability in retirement</div>
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

                <div class="crisis-comparison" id="crisis-info" style="display:none;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);border-radius:8px;padding:16px;margin:16px 0;">
                    <!-- Filled by JS when crisis events > 0 -->
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
        let lifeEvents = [];

        window.updateSlider = function(id, suffix) {
            suffix = suffix || '';
            const slider = document.getElementById(id);
            const display = document.getElementById(id + '-value');
            display.textContent = slider.value + suffix;
        };

        window.updateHealthcareSlider = function() {
            const val = parseInt(document.getElementById('healthcareBase').value);
            document.getElementById('healthcareBase-value').textContent = '฿' + val.toLocaleString();
        };

        window.addLifeEvent = function(defaultAge, defaultAmount, defaultLabel) {
            if (lifeEvents.length >= 4) {
                alert('Maximum 4 life events allowed.');
                return;
            }
            lifeEvents.push({ age: defaultAge, amount: defaultAmount, label: defaultLabel });
            renderLifeEvents();
        };

        window.removeLifeEvent = function(idx) {
            lifeEvents.splice(idx, 1);
            renderLifeEvents();
        };

        window.updateLifeEvent = function(idx, field, value) {
            if (field === 'age' || field === 'amount') {
                lifeEvents[idx][field] = parseFloat(value) || 0;
            } else {
                lifeEvents[idx][field] = value;
            }
        };

        function renderLifeEvents() {
            const container = document.getElementById('life-events-list');
            container.innerHTML = '';
            lifeEvents.forEach(function(event, idx) {
                const row = document.createElement('div');
                row.style.cssText = 'display:flex;gap:0.4rem;align-items:center;margin-bottom:0.5rem;flex-wrap:wrap;';
                row.innerHTML =
                    '<span style="color:var(--text-dim);font-size:0.7rem;flex-shrink:0;">Age</span>' +
                    '<input type="number" value="' + event.age + '" min="18" max="80" ' +
                    'style="width:55px;" onchange="updateLifeEvent(' + idx + ', &quot;age&quot;, this.value)">' +
                    '<input type="text" value="' + event.label + '" placeholder="Label" ' +
                    'style="flex:1;min-width:80px;" onchange="updateLifeEvent(' + idx + ', &quot;label&quot;, this.value)">' +
                    '<span style="color:var(--accent-secondary);font-size:0.75rem;flex-shrink:0;">฿</span>' +
                    '<input type="number" value="' + event.amount + '" min="0" step="50000" ' +
                    'style="width:110px;" onchange="updateLifeEvent(' + idx + ', &quot;amount&quot;, this.value)">' +
                    '<button class="event-remove-btn" onclick="removeLifeEvent(' + idx + ')">×</button>';
                container.appendChild(row);
            });
        }

        // Initialize displays
        updateSlider('age');
        updateSlider('savingsRate', '%');
        updateSlider('returnRate', '%');
        updateSlider('inflationRate', '%');
        updateSlider('salaryGrowth', '%');
        updateSlider('crisisEvents');
        updateSlider('healthcareGrowth', '%');
        updateHealthcareSlider();

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
                salaryGrowth: parseFloat(document.getElementById('salaryGrowth').value) / 100,
                crisisEvents: parseInt(document.getElementById('crisisEvents').value) || 0,
                monthlyExpenses: parseFloat(document.getElementById('monthlyExpenses').value) || 0,
                healthcareBase: parseFloat(document.getElementById('healthcareBase').value) || 0,
                healthcareGrowth: parseFloat(document.getElementById('healthcareGrowth').value) / 100,
                lifeEvents: lifeEvents,
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
            
            const ruinPct = (data.ruinProbability * 100).toFixed(1) + '%';
            const ruinClass = data.ruinProbability > 0.3 ? 'danger' : (data.ruinProbability > 0.1 ? 'warning' : 'safe');
            const stats = [
                { value: formatCurrency(data.medianFinal), label: 'Median Outcome', cls: '' },
                { value: formatCurrency(data.p10), label: '10th Percentile', cls: '' },
                { value: formatCurrency(data.p90), label: '90th Percentile', cls: '' },
                { value: data.medianYearsToFire + ' yrs', label: 'Years to FIRE', cls: '' },
                { value: ruinPct, label: 'Ruin Probability', cls: ruinClass },
            ];

            stats.forEach(function(stat, i) {
                const box = document.createElement('div');
                box.className = 'stat-box fade-in-up' + (stat.cls ? ' ' + stat.cls : '');
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

            // Crisis comparison display
            if (inputs.crisisEvents > 0 && data.successProbabilityNoCrisis !== undefined) {
                const crisisDiff = data.successProbabilityNoCrisis - data.successProbability;
                const crisisInfo = document.getElementById('crisis-info');
                if (crisisInfo) {
                    crisisInfo.innerHTML = 
                        '<div style="display:flex;justify-content:space-between;margin-bottom:8px;">' +
                        '<span style="color:#22c55e;">Without crises:</span>' +
                        '<span style="color:#22c55e;font-weight:bold;">' + (data.successProbabilityNoCrisis * 100).toFixed(1) + '%</span>' +
                        '</div>' +
                        '<div style="display:flex;justify-content:space-between;">' +
                        '<span style="color:#fbbf24;">With ' + inputs.crisisEvents + ' crisis(ies):</span>' +
                        '<span style="color:#fbbf24;font-weight:bold;">' + (data.successProbability * 100).toFixed(1) + '%</span>' +
                        '</div>' +
                        '<div style="margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.1);text-align:center;font-size:0.85rem;color:#f87171;">' +
                        'Crisis impact: -' + (crisisDiff * 100).toFixed(1) + '% success rate' +
                        '</div>';
                    crisisInfo.style.display = 'block';
                }
            } else {
                const crisisInfo = document.getElementById('crisis-info');
                if (crisisInfo) crisisInfo.style.display = 'none';
            }

            // Line chart - all iterations
            const yearsToSimulate = 65 - inputs.age;
            const labels = Array.from({ length: yearsToSimulate }, (_, i) => inputs.age + i);
            
            if (simulationChart) simulationChart.destroy();
            
            const ctx1 = document.getElementById('simulationChart').getContext('2d');
            
            // Prepare datasets - faded paths first (so they're behind the median)
            const fadedPaths = data.iterations.slice(0, 200).map((iteration, i) => ({
                data: iteration.slice(0, yearsToSimulate),
                borderColor: 'rgba(251, 191, 36, 0.08)',
                borderWidth: 1,
                pointRadius: 0,
                fill: false,
                tension: 0.1
            }));

            // Bold MEDIAN path (typical outcome)
            const medianDataset = {
                data: data.medianPath ? data.medianPath.slice(0, yearsToSimulate) : [],
                borderColor: 'rgba(251, 191, 36, 1)',
                borderWidth: 3,
                pointRadius: 0,
                fill: false,
                tension: 0.1,
                label: 'Median Path'
            };

            // Crisis markers (red dots on median path at crisis years)
            let crisisMarkerDataset = null;
            if (data.crisisYears && data.crisisYears.length > 0) {
                const crisisPoints = data.crisisYears.map(crisisYearIdx => ({
                    x: inputs.age + crisisYearIdx,
                    y: data.medianPath ? data.medianPath[crisisYearIdx] : 0
                }));
                crisisMarkerDataset = {
                    data: crisisPoints,
                    borderColor: 'rgba(239, 68, 68, 1)',
                    backgroundColor: 'rgba(239, 68, 68, 0.8)',
                    borderWidth: 2,
                    pointRadius: 6,
                    pointStyle: 'circle',
                    showLine: false,
                    label: 'Crisis'
                };
            }

            // Target line
            const targetDataset = {
                data: Array(yearsToSimulate).fill(inputs.retirementTarget),
                borderColor: 'rgba(34, 197, 94, 0.8)',
                borderWidth: 2,
                borderDash: [5, 5],
                pointRadius: 0,
                fill: false,
                label: 'Target'
            };

            // Life event markers (purple triangles at event ages)
            const lifeEventDatasets = inputs.lifeEvents
                ? inputs.lifeEvents.map(function(event) {
                    const eventIdx = event.age - inputs.age;
                    const y = data.medianPath && eventIdx >= 0 && eventIdx < data.medianPath.length
                        ? data.medianPath[eventIdx] : 0;
                    return {
                        data: [{ x: event.age, y: y }],
                        borderColor: 'rgba(167, 139, 250, 1)',
                        backgroundColor: 'rgba(167, 139, 250, 0.9)',
                        borderWidth: 2,
                        pointRadius: 7,
                        pointStyle: 'triangle',
                        showLine: false,
                        label: event.label
                    };
                })
                : [];

            // Combine: faded paths, median, crisis markers, life events, target
            const datasets = [
                ...fadedPaths,
                medianDataset,
                ...(crisisMarkerDataset ? [crisisMarkerDataset] : []),
                ...lifeEventDatasets,
                targetDataset
            ];

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
                            ticks: { color: '#94a3b8', font: { size: 10 } },
                            title: { display: true, text: 'Age', color: '#94a3b8', font: { size: 11 } }
                        },
                        y: {
                            grid: { color: 'rgba(255,255,255,0.05)' },
                            ticks: {
                                color: '#94a3b8',
                                font: { size: 10 },
                                callback: v => '฿' + (v / 1000) + 'k'
                            },
                            title: { display: true, text: 'Wealth (฿)', color: '#94a3b8', font: { size: 11 } }
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
                            ticks: { color: '#94a3b8', font: { size: 9 }, maxRotation: 45 },
                            title: { display: true, text: 'Final Wealth', color: '#94a3b8', font: { size: 11 } }
                        },
                        y: {
                            grid: { color: 'rgba(255,255,255,0.05)' },
                            ticks: { color: '#94a3b8', font: { size: 10 } },
                            title: { display: true, text: 'Scenarios', color: '#94a3b8', font: { size: 11 } }
                        }
                    }
                }
            });

            // Insight text
            const insightText = document.getElementById('insight-text');
            const yearsToFire = data.medianYearsToFire;
            const fireAge = inputs.age + yearsToFire;
            const successPct = (data.successProbability * 100).toFixed(0);
            
            const ruinPctNum = (data.ruinProbability * 100).toFixed(0);
            const ruinNote = data.ruinProbability > 0.3
                ? ' Warning: ' + ruinPctNum + '% of scenarios deplete savings before age 100 — consider reducing expenses or increasing your target.'
                : data.ruinProbability > 0.05
                ? ' Note: ' + ruinPctNum + '% ruin risk — a small buffer above your target would make retirement more secure.'
                : '';
            if (data.successProbability > 0.8) {
                insightText.textContent = 'Strong position! ' + successPct + '% of simulations hit your target by age ' + fireAge + '. Consider a larger safety margin to cover rising healthcare costs.' + ruinNote;
            } else if (data.successProbability > 0.5) {
                insightText.textContent = 'On track but not guaranteed. ' + successPct + '% of scenarios succeed. Bumping savings rate or reducing post-retirement spending improves your odds.' + ruinNote;
            } else {
                insightText.textContent = 'Challenging path ahead. Only ' + successPct + '% of simulations reach your goal. Try: higher savings rate, longer timeline, or a lower retirement target.' + ruinNote;
            }
        }

        function formatCurrency(n) {
            if (n >= 1000000) return '฿' + (n / 1000000).toFixed(1) + 'M';
            if (n >= 1000) return '฿' + (n / 1000).toFixed(0) + 'k';
            return '฿' + n.toFixed(0);
        }

        function formatCurrencyShort(n) {
            if (n >= 1000000) return '฿' + (n / 1000000).toFixed(1) + 'M';
            return '฿' + (n / 1000).toFixed(0) + 'k';
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
