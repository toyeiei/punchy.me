export const RAGNAR_SLIDE_HEADER = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{TITLE}} | RAGNAR | PUNCHY.ME</title>
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🛡️%3C/text%3E%3C/svg%3E">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/reveal.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/theme/dracula.min.css">
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --accent: #22c55e;
            --font-mono: 'JetBrains Mono', monospace;
            --h-size: 3.5rem;
            --p-size: 2rem;
        }

        .reveal {
            background-color: #000000;
            color: #f8fafc;
            font-family: var(--font-mono);
        }

        .reveal .slides {
            width: 100%;
            height: 100%;
        }

        .reveal .slides section {
            width: 100%;
            height: 100%;
            padding: 0 !important;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
        }

        .slide-container {
            width: 100%;
            max-width: 1600px;
            margin: 0;
            padding: 100px 150px;
            text-align: left;
        }

        .reveal h1, .reveal h2, .reveal h3, .reveal h4 {
            font-family: var(--font-mono);
            text-transform: uppercase;
            letter-spacing: 2px;
            color: var(--accent);
            font-weight: 800;
            text-align: left;
            margin: 0 0 2rem 0;
            line-height: 1.1;
        }

        .reveal h1, .reveal h2 { 
            font-size: var(--h-size) !important; 
        }

        .reveal p, .reveal li {
            font-size: var(--p-size) !important;
            line-height: 1.6 !important;
            color: #f8fafc;
            font-weight: 500;
            text-align: left;
            margin-bottom: 1.5rem;
        }

        .reveal ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            width: 100%;
        }

        .reveal ul li {
            position: relative;
            padding-left: 50px;
            margin-bottom: 30px;
        }

        .reveal ul li::before {
            content: '▸';
            position: absolute;
            left: 0;
            top: 0;
            color: var(--accent);
            font-weight: 700;
        }

        .reveal .hero-statement {
            color: var(--accent) !important;
            text-shadow: 0 0 30px rgba(34, 197, 94, 0.2);
        }

        .reveal .hero-subtitle {
            opacity: 0.8;
            letter-spacing: 2px;
            text-transform: uppercase;
        }

        .reveal .quote-glass {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-left: 8px solid var(--accent);
            padding: 60px;
            border-radius: 4px 24px 24px 4px;
            width: 100%;
            max-width: 1200px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
            margin-top: 2rem;
        }

        .reveal .quote-text {
            font-style: italic;
            margin-bottom: 2rem !important;
        }

        .reveal .quote-author {
            font-size: 1.4rem !important;
            color: var(--accent) !important;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 4px;
            margin: 0;
        }

        .reveal .comparison-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 50px;
            margin-top: 2rem;
            width: 100%;
        }

        .reveal .comparison-box {
            background: rgba(255, 255, 255, 0.02);
            border: 3px solid rgba(255, 255, 255, 0.1);
            padding: 40px;
            border-radius: 12px;
            min-height: 300px;
        }

        .reveal .box-red { 
            border-color: #ef4444;
            background: rgba(239, 68, 68, 0.05);
        }
        
        .reveal .box-green { 
            border-color: var(--accent);
            background: rgba(34, 197, 94, 0.05);
        }

        .reveal .comparison-box h4 {
            font-size: 1.4rem !important;
            letter-spacing: 3px;
            margin-bottom: 25px;
            text-align: left;
        }

        .reveal .comparison-box p {
            font-size: 1.7rem !important;
        }

        .reveal .progress, .reveal .controls { color: var(--accent); }

        .slide-number {
            position: fixed;
            bottom: 20px;
            right: 20px;
            font-family: var(--font-mono);
            font-size: 0.8rem;
            color: var(--accent);
            z-index: 100;
            opacity: 0.5;
        }

        .grid-bg {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background-image: 
                linear-gradient(rgba(34, 197, 94, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.05) 1px, transparent 1px);
            background-size: 50px 50px;
            z-index: -1;
            animation: gridMove 20s linear infinite;
        }

        @keyframes gridMove {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
        }

        .pixel-bg {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            z-index: 0;
            pointer-events: none;
            overflow: hidden;
        }

        .pixel {
            position: absolute;
            width: 3px; height: 3px;
            background: rgba(255, 255, 255, 0.4);
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
            animation: drift var(--duration) linear infinite;
            top: var(--top); left: -10px;
        }

        .pixel.green { background: var(--accent); box-shadow: 0 0 5px var(--accent); opacity: 0.6; }

        @keyframes drift {
            0% { transform: translateX(0); opacity: 0; }
            5% { opacity: 1; }
            95% { opacity: 1; }
            100% { transform: translateX(calc(100vw + 20px)); opacity: 0; }
        }

        @media print {
            @page { size: 1920px 1080px; margin: 0; }
            html, body, .reveal, .reveal .slides, .reveal .slides section {
                width: 1920px !important;
                height: 1080px !important;
            }
            .controls, .progress, .grid-bg, .pixel-bg { display: none !important; }
            body { background: #000 !important; }
            .reveal h1, .reveal h2, .reveal h3, .reveal p, .reveal li {
                color: #ffffff !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
        }
    </style>
</head>
<body>
    <div class="grid-bg"></div>
    <div class="pixel-bg" id="pixel-bg"></div>
    <div class="reveal">
        <div class="slides">
            <section>
                <div class="slide-container">
                    <h1>{{TITLE}}</h1>
                    <p style="color: var(--accent); font-weight: 700; letter-spacing: 3px;">{{AUDIENCE}}</p>
                    <div style="margin-top: 100px; font-size: 1rem; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 4px;">Forged by RAGNAR AI</div>
                </div>
            </section>
`;

export const RAGNAR_SLIDE_FOOTER = `
            <section>
                <div class="slide-container">
                    <h2>VICTORY SECURED.</h2>
                    <p>The strategic objectives have been defined and the path to execution is clear.</p>
                    <p style="color: var(--accent); font-weight: 800; letter-spacing: 3px; margin-top: 2rem;">READY FOR DEPLOYMENT.</p>
                    <div style="margin-top: 100px; font-size: 1rem; color: rgba(255,255,255,0.25); letter-spacing: 2px;">Built with ⚡ by PUNCHY.ME</div>
                </div>
            </section>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/reveal.min.js"></script>
    <script>
        Reveal.initialize({
            hash: true,
            center: true,
            transition: 'none',
            backgroundTransition: 'none',
            controls: true,
            progress: true,
            slideNumber: 'c/t',
            width: 1920,
            height: 1080,
            margin: 0.04,
            pdfMaxPagesPerSlide: 1,
            pdfSeparateFragments: false,
            controlsLayout: 'bottom-right',
        });

        const bg = document.getElementById('pixel-bg');
        function createPixel() {
            const pixel = document.createElement('div');
            pixel.className = 'pixel';
            if (Math.random() > 0.7) pixel.classList.add('green');
            const top = Math.random() * 100;
            const duration = 5 + Math.random() * 10;
            pixel.style.setProperty('--top', top + '%');
            pixel.style.setProperty('--duration', duration + 's');
            bg.appendChild(pixel);
            setTimeout(() => pixel.remove(), duration * 1000);
        }
        setInterval(createPixel, 300);
        for(let i=0; i<20; i++) createPixel();

        if (window.location.search.match(/print-pdf/gi)) {
            setTimeout(() => {
                window.print();
            }, 1000);
        }
    </script>
</body>
</html>`;
