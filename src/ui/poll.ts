import { PUNCHY_PORTAL_HTML } from './portal';

export const POLL_FORM_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>POLL PUNCH | Instant Poll Generator | PUNCHY.ME</title>
    <meta name="description" content="Create lightning-fast polls in seconds. Share instantly, collect votes, auto-expires in 24 hours. No login required.">
    <link rel="canonical" href="https://punchy.me/poll" />
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🗳️%3C/text%3E%3C/svg%3E">

    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://punchy.me/poll">
    <meta property="og:title" content="POLL PUNCH | Instant Poll Generator | PUNCHY.ME">
    <meta property="og:description" content="Create lightning-fast polls in seconds. Share instantly, collect votes, auto-expires in 24 hours. No login required.">
    <meta property="og:image" content="https://punchy.me/og-images/og-image-poll.webp">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@punchyme">
    <meta name="twitter:title" content="POLL PUNCH | Instant Poll Generator">
    <meta name="twitter:description" content="Create lightning-fast polls. Share instantly. Auto-expires in 24 hours.">
    <meta name="twitter:image" content="https://punchy.me/og-images/og-image-poll.webp">

    <!-- JSON-LD Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "POLL PUNCH",
      "operatingSystem": "Any",
      "applicationCategory": "BusinessApplication",
      "url": "https://punchy.me/poll",
      "description": "Lightning-fast poll generator. Create, share, collect votes. Auto-expires in 24 hours. No login required.",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "150"
      }
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
            background: linear-gradient(135deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%);
            z-index: -2;
        }
        .bg-overlay {
            position: fixed;
            inset: 0;
            background: radial-gradient(ellipse at 50% 0%, rgba(34, 197, 94, 0.08) 0%, transparent 60%);
            z-index: -1;
        }

        .scan-line {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100px;
            background: linear-gradient(to bottom, transparent, rgba(34, 197, 94, 0.08), transparent);
            border-bottom: 1px solid rgba(34, 197, 94, 0.15);
            z-index: 9999;
            animation: scan 4s linear infinite;
            pointer-events: none;
        }

        @keyframes scan {
            0% { transform: translateY(-100px); }
            100% { transform: translateY(100vh); }
        }
        
        .container { 
            z-index: 10; 
            padding: 6rem 2rem 2rem; 
            position: relative; 
            max-width: 900px; 
            width: 100%;
            flex-grow: 1;
        }
        
        .title-container {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        h1 {
            font-family: var(--font-brand); font-size: clamp(2.5rem, 10vw, 80px); font-weight: 400;
            line-height: 0.85;
            color: var(--text-main);
            letter-spacing: -2px;
            text-transform: uppercase;
            animation: main-glitch 5s infinite;
        }

        @keyframes main-glitch {
            0%, 80%, 100% { transform: skew(0deg); text-shadow: none; }
            81% { transform: skew(1.5deg); text-shadow: 1px 0 #ff00ff; }
            82% { transform: skew(-1.5deg); text-shadow: -1px 0 #00ffff; }
            83% { transform: skew(0deg); text-shadow: none; }
        }

        .beta-badge {
            background: var(--accent);
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
            margin-bottom: 1rem;
            max-width: 550px;
            margin-left: auto;
            margin-right: auto;
        }

        .expiry-notice {
            color: var(--accent);
            font-size: 0.8rem;
            font-weight: 700;
            margin-bottom: 2.5rem;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .panel {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 2.5rem;
            border-radius: 24px;
            transition: all 0.3s ease;
            text-align: left;
        }
        .panel:hover {
            border-color: rgba(34, 197, 94, 0.3);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }

        .poll-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
            margin-top: 40px;
            width: 100%;
        }

        @media (min-width: 800px) {
            .poll-grid { grid-template-columns: 1fr 1fr; }
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

        input {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 1rem 1.2rem;
            border-radius: 12px;
            color: var(--text-main);
            font-family: var(--font-mono);
            width: 100%;
            outline: none;
            transition: all 0.2s;
        }
        input:focus {
            border-color: var(--accent);
            background: rgba(255, 255, 255, 0.08);
            box-shadow: 0 0 10px rgba(34, 197, 94, 0.1);
        }

        .option-row {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 0.75rem;
        }
        .option-num {
            color: var(--accent);
            font-weight: 900;
            font-size: 0.85rem;
            min-width: 24px;
        }
        .option-input {
            flex: 1;
        }

        .btn-create {
            margin-top: 1.5rem;
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
            box-shadow: 0 0 10px rgba(34, 197, 94, 0.2);
        }
        .btn-create:hover {
            transform: scale(1.02);
            background: var(--accent-hover);
            box-shadow: 0 0 25px rgba(34, 197, 94, 0.5);
        }
        .btn-create:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }

        .result-box {
            display: none;
            margin-top: 1.5rem;
            animation: fadeIn 0.5s ease forwards;
        }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

        .poll-link {
            display: block;
            background: var(--accent);
            color: #000;
            padding: 1.2rem;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 900;
            margin-bottom: 1rem;
            text-align: center;
            font-size: 1rem;
            letter-spacing: 1px;
            text-transform: uppercase;
            transition: all 0.2s ease;
        }
        .poll-link:hover {
            background: var(--accent-hover);
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(34, 197, 94, 0.3);
        }

        .copy-hint {
            color: var(--text-dim);
            font-size: 0.75rem;
            text-align: center;
        }
    </style>
</head>
<body>
    ${PUNCHY_PORTAL_HTML}
    <div class="bg-image"></div>
    <div class="bg-overlay"></div>
    <div class="scan-line"></div>
    
    <div class="container">
        <div class="title-container">
            <h1>POLL PUNCH</h1>
            <span class="beta-badge">BETA</span>
        </div>
        
        <p class="desc">Lightning-fast poll generator. Create, share, collect votes. No login required.</p>
        <p class="expiry-notice">⚡ Polls auto-expire in 24 hours</p>

        <div class="poll-grid">
            <div class="panel">
                <label>Poll Question</label>
                <div style="display: none;"><input type="text" id="hp_field" tabindex="-1" autocomplete="off"></div>
                <input type="text" id="question" placeholder="e.g., What feature should we build next?" maxlength="200">
                <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: var(--text-dim); margin-top: 0.5rem; margin-bottom: 1.5rem;">
                    <div>2-4 options required</div>
                    <div id="q-counter">0 / 200</div>
                </div>

                <label>Options</label>
                <div class="option-row">
                    <span class="option-num">1.</span>
                    <input type="text" class="option-input" id="opt1" placeholder="Option 1" maxlength="100">
                </div>
                <div class="option-row">
                    <span class="option-num">2.</span>
                    <input type="text" class="option-input" id="opt2" placeholder="Option 2" maxlength="100">
                </div>
                <div class="option-row">
                    <span class="option-num">3.</span>
                    <input type="text" class="option-input" id="opt3" placeholder="Option 3 (optional)" maxlength="100">
                </div>
                <div class="option-row">
                    <span class="option-num">4.</span>
                    <input type="text" class="option-input" id="opt4" placeholder="Option 4 (optional)" maxlength="100">
                </div>

                <button class="btn-create" id="create-btn">Create Poll</button>

                <div class="result-box" id="result">
                    <p style="margin-bottom: 1rem; color: var(--text-dim); text-align: center;">Poll created! Share the link:</p>
                    <a href="#" class="poll-link" id="poll-link" target="_blank">OPEN POLL</a>
                    <p class="copy-hint">Link auto-expires in 24 hours</p>
                </div>
            </div>

            <div class="panel">
                <div id="preview" style="color: var(--text-dim); text-align: center; padding-top: 3rem;">
                    <div style="font-size: 2.5rem; margin-bottom: 1rem;">🗳️</div>
                    <div>Live Preview</div>
                    <div style="font-size: 0.75rem; margin-top: 0.5rem;">Start typing to see your poll</div>
                </div>
            </div>
        </div>
    </div>

    <script>
        const createBtn = document.getElementById('create-btn');
        const questionInput = document.getElementById('question');
        const optInputs = [
            document.getElementById('opt1'),
            document.getElementById('opt2'),
            document.getElementById('opt3'),
            document.getElementById('opt4')
        ];
        const resultBox = document.getElementById('result');
        const pollLink = document.getElementById('poll-link');
        const preview = document.getElementById('preview');
        const qCounter = document.getElementById('q-counter');

        function updatePreview() {
            const q = questionInput.value.trim();
            const options = optInputs.map(i => i.value.trim()).filter(v => v);

            if (!q && options.length === 0) {
                preview.innerHTML = '<div style="color: var(--text-dim); text-align: center; padding-top: 3rem;"><div style="font-size: 2.5rem; margin-bottom: 1rem;">🗳️</div><div>Live Preview</div><div style="font-size: 0.75rem; margin-top: 0.5rem;">Start typing to see your poll</div></div>';
                return;
            }

            let html = '<div style="color: var(--text-main); font-size: 1.1rem; font-weight: 700; margin-bottom: 1.5rem;">' + escapeHtmlSimple(q || 'Your question...') + '</div>';
            html += '<div style="display: flex; flex-direction: column; gap: 0.75rem;">';
            options.forEach((opt, i) => {
                html += '<div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 0.8rem 1rem; border-radius: 8px; display: flex; align-items: center; gap: 0.75rem;">';
                html += '<span style="color: var(--accent); font-weight: 700;">' + (i + 1) + '</span>';
                html += '<span>' + escapeHtmlSimple(opt) + '</span>';
                html += '</div>';
            });
            html += '</div>';
            preview.innerHTML = html;
        }

        function escapeHtmlSimple(str) {
            return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        }

        questionInput.addEventListener('input', () => {
            qCounter.innerText = questionInput.value.length + ' / 200';
            updatePreview();
        });
        optInputs.forEach(i => i.addEventListener('input', updatePreview));

        createBtn.onclick = async () => {
            const question = questionInput.value.trim();
            const options = optInputs.map(i => i.value.trim()).filter(v => v);

            if (!question) {
                alert('Please enter a question.');
                return;
            }
            if (options.length < 2) {
                alert('Please provide at least 2 options.');
                return;
            }

            createBtn.innerText = 'CREATING...';
            createBtn.disabled = true;

            try {
                const hp_field = document.getElementById('hp_field').value;
                const response = await fetch('/poll/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ question, options, hp_field })
                });

                if (response.ok) {
                    const { id } = await response.json();
                    const fullUrl = window.location.origin + '/poll/' + id;
                    pollLink.href = fullUrl;
                    pollLink.innerText = 'OPEN POLL';
                    resultBox.style.display = 'block';
                } else {
                    const err = await response.json();
                    alert('Failed: ' + (err.error || 'Unknown error'));
                }
            } catch (err) {
                alert('Network error: ' + err.message);
            } finally {
                createBtn.innerText = 'Create Poll';
                createBtn.disabled = false;
            }
        };
    </script>
</body>
</html>`;

export function generatePollVoteHTML(pollId: string, question: string, options: string[], votes: number[], totalVotes: number, hasVoted: boolean): string {
    const maxVotes = Math.max(...votes, 1);
    
    let optionsHtml = '';
    options.forEach((opt, i) => {
        const percentage = totalVotes > 0 ? Math.round((votes[i] / totalVotes) * 100) : 0;
        const barWidth = totalVotes > 0 ? Math.round((votes[i] / maxVotes) * 100) : 0;
        
        optionsHtml += `
            <div class="option-vote ${hasVoted ? 'voted' : ''}" data-index="${i}">
                <div class="option-bar-bg">
                    <div class="option-bar" style="width: ${hasVoted ? barWidth : 0}%"></div>
                </div>
                <div class="option-content">
                    <span class="option-label">${escapeHtmlSimple(opt)}</span>
                    ${hasVoted ? '<span class="option-stats">' + votes[i] + ' votes (' + percentage + '%)</span>' : ''}
                </div>
            </div>`;
    });

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtmlSimple(question)} | POLL PUNCH</title>
    <meta name="description" content="Vote on this poll created with POLL PUNCH. Lightning-fast polling tool.">
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🗳️%3C/text%3E%3C/svg%3E">
    
    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="${escapeHtmlSimple(question)} | POLL PUNCH">
    <meta property="og:description" content="Vote on this poll. Created with POLL PUNCH.">
    <meta name="twitter:card" content="summary">
    
    <link href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --accent: #22c55e;
            --accent-hover: #4ade80;
            --text-main: #f8fafc;
            --text-dim: #94a3b8;
            --font-brand: 'Bitcount Prop Double', cursive;
            --font-mono: 'JetBrains Mono', monospace;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background: #000;
            color: var(--text-main);
            font-family: var(--font-mono);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        .container { max-width: 500px; width: 100%; }
        .brand { text-align: center; margin-bottom: 2rem; }
        .brand a { color: var(--accent); text-decoration: none; font-family: var(--font-brand); font-size: 1.5rem; letter-spacing: -1px; }
        .panel {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 2rem;
            border-radius: 20px;
        }
        .question { font-size: 1.3rem; font-weight: 700; margin-bottom: 1.5rem; line-height: 1.4; }
        .options { display: flex; flex-direction: column; gap: 0.75rem; }
        .option-vote {
            position: relative;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.2s;
            overflow: hidden;
        }
        .option-vote:hover:not(.voted) { border-color: var(--accent); background: rgba(255, 255, 255, 0.08); }
        .option-vote.voted { cursor: default; }
        .option-bar-bg { position: absolute; inset: 0; opacity: 0.3; }
        .option-bar { height: 100%; background: var(--accent); transition: width 0.5s ease; }
        .option-content { position: relative; padding: 1rem 1.25rem; display: flex; justify-content: space-between; align-items: center; }
        .option-label { font-weight: 500; }
        .option-stats { font-size: 0.8rem; color: var(--accent); }
        .total-votes { text-align: center; margin-top: 1.5rem; color: var(--text-dim); font-size: 0.85rem; }
        .voted-notice {
            text-align: center; margin-top: 1.5rem; padding: 0.75rem;
            background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3);
            border-radius: 8px; color: var(--accent); font-size: 0.85rem;
        }
        .create-new { text-align: center; margin-top: 2rem; }
        .create-new a { color: var(--text-dim); text-decoration: none; font-size: 0.85rem; transition: color 0.2s; }
        .create-new a:hover { color: var(--accent); }
    </style>
</head>
<body>
    ${PUNCHY_PORTAL_HTML}
    <div class="container">
        <div class="brand"><a href="/poll">POLL PUNCH</a></div>
        <div class="panel">
            <div class="question">${escapeHtmlSimple(question)}</div>
            <div class="options" id="options">${optionsHtml}</div>
            <div class="total-votes">${totalVotes} vote${totalVotes !== 1 ? 's' : ''}</div>
            ${hasVoted ? '<div class="voted-notice">✓ You voted already</div>' : ''}
        </div>
        <div class="create-new"><a href="/poll">Create your own poll →</a></div>
    </div>
    <script>
        const pollId = '${pollId}';
        const hasVoted = ${hasVoted};
        const options = document.querySelectorAll('.option-vote');

        if (!hasVoted) {
            options.forEach(opt => {
                opt.onclick = async () => {
                    const index = parseInt(opt.dataset.index);
                    opt.style.pointerEvents = 'none';
                    
                    try {
                        const res = await fetch('/poll/vote/' + pollId, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ optionIndex: index })
                        });
                        
                        if (res.ok) { window.location.reload(); }
                        else {
                            const err = await res.json();
                            alert('Vote failed: ' + (err.error || 'Unknown error'));
                            opt.style.pointerEvents = 'auto';
                        }
                    } catch (e) {
                        alert('Network error: ' + e.message);
                        opt.style.pointerEvents = 'auto';
                    }
                };
            });
        }
    </script>
</body>
</html>`;
}

function escapeHtmlSimple(str: string): string {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
