export const RAGNAR_SLIDE_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{TITLE}} | RAGNAR | PUNCHY.ME</title>
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🛡️%3C/text%3E%3C/svg%3E">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/reveal.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/theme/dracula.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double:wght@400;700;900&family=JetBrains+Mono:wght@400;700&family=Outfit:wght@400;700;900&display=swap" rel="stylesheet">
    <style>
        :root {
            --accent: #22c55e;
            --font-brand: 'Bitcount Prop Double', cursive;
            --font-mono: 'JetBrains Mono', monospace;
            --font-main: 'Outfit', sans-serif;
        }

        .reveal {
            background-color: #000000;
            color: #f8fafc;
            font-family: var(--font-main);
        }

        .reveal h1, .reveal h2, .reveal h3, .reveal h4 {
            font-family: var(--font-brand);
            text-transform: uppercase;
            letter-spacing: -1px;
            color: #ffffff;
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
        }

        .reveal h1 { font-size: 3.5rem; color: var(--accent); }
        .reveal h2 { font-size: 2.5rem; border-bottom: 2px solid var(--accent); display: inline-block; padding-bottom: 10px; margin-bottom: 30px; }

        .reveal .slides section {
            text-align: left;
            padding: 40px;
        }

        .reveal .slides section.center {
            text-align: center;
        }

        .reveal ul {
            list-style-type: none;
            margin-left: 0;
        }

        .reveal ul li {
            position: relative;
            padding-left: 40px;
            margin-bottom: 20px;
            font-size: 1.2rem;
            line-height: 1.4;
        }

        .reveal ul li::before {
            content: '⚔️';
            position: absolute;
            left: 0;
            top: 5px;
            font-size: 1rem;
        }

        /* NEW SLIDE TYPES */
        .reveal .slide-quote blockquote {
            font-size: 2.2rem !important;
            font-style: italic;
            border: none !important;
            background: none !important;
            box-shadow: none !important;
            color: #ffffff !important;
            line-height: 1.4 !important;
            width: 100% !important;
        }

        .reveal .slide-quote .quote-attribution {
            margin-top: 2rem;
            color: var(--accent);
            font-family: var(--font-mono);
            font-weight: 700;
            font-size: 1.2rem;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .reveal .slide-bigtext h2 {
            font-size: 4rem !important;
            border: none !important;
            color: var(--accent) !important;
            margin-bottom: 1rem !important;
        }

        .reveal .slide-bigtext p {
            font-size: 2.8rem !important;
            font-weight: 900 !important;
            line-height: 1.1 !important;
            text-transform: uppercase;
        }

        .reveal .slide-comparison .comparison-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-top: 40px;
        }

        .reveal .slide-comparison .comparison-box {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(10px);
            padding: 40px;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            transition: all 0.3s ease;
        }

        .reveal .slide-comparison .box-red { border-left: 6px solid #ef4444; }
        .reveal .slide-comparison .box-green { border-left: 6px solid var(--accent); }

        .reveal .slide-comparison h4 {
            font-family: var(--font-mono);
            font-size: 1rem;
            letter-spacing: 2px;
            margin-bottom: 20px;
        }

        .reveal .slide-comparison .text-red { color: #ef4444; }
        .reveal .slide-comparison .text-green { color: var(--accent); }

        .reveal .progress { color: var(--accent); }
        .reveal .controls { color: var(--accent); }

        .brand-badge {
            position: fixed;
            bottom: 20px;
            left: 20px;
            font-family: var(--font-brand);
            font-size: 1rem;
            color: rgba(255, 255, 255, 0.2);
            z-index: 100;
            letter-spacing: 1px;
        }

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

        /* Print Override */
        @media print {
            .brand-badge, .controls, .progress { display: none !important; }
        }
    </style>
</head>
<body>
    <div class="brand-badge">PUNCHY.ME | RAGNAR</div>
    <div class="reveal">
        <div class="slides">
            <!-- TITLE SLIDE -->
            <section class="center" data-transition="zoom">
                <h1 style="font-size: 5rem; margin-bottom: 0;">{{TITLE}}</h1>
                <p style="font-family: var(--font-mono); color: var(--accent); margin-top: 20px; font-weight: 700; letter-spacing: 2px;">{{AUDIENCE}}</p>
                <div style="margin-top: 50px; font-size: 0.8rem; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 3px;">Forged by RAGNAR AI</div>
            </section>

            <!-- DYNAMIC SLIDES -->
            {{SLIDES_HTML}}

            <!-- FINAL SLIDE -->
            <section class="center" data-transition="slide">
                <h2>VICTORY SECURED.</h2>
                <p style="font-size: 1.5rem; margin-top: 30px;">The strategic objectives have been defined.</p>
                <p style="color: var(--accent); font-family: var(--font-mono); font-weight: 700; margin-top: 20px;">READY FOR DEPLOYMENT.</p>
                <div style="margin-top: 100px; font-size: 0.9rem; color: rgba(255,255,255,0.3);">Built with ⚡ by PUNCHY.ME</div>
            </section>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/reveal.min.js"></script>
    <script>
        Reveal.initialize({
            hash: true,
            center: true,
            transition: 'convex',
            backgroundTransition: 'fade',
            controls: true,
            progress: true,
            slideNumber: 'c/t',
            pdfMaxPagesPerSlide: 1,
            pdfSeparateFragments: false,
        });

        // Auto-print to PDF if requested
        if (window.location.search.match(/print-pdf/gi)) {
            setTimeout(() => {
                window.print();
            }, 1000);
        }
    </script>
</body>
</html>`;
