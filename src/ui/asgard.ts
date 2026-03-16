export const ASGARD_HTML = (bgUrl: string) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ASGARD | The Supreme Workspace</title>
    <meta name="description" content="ASGARD: The Bifrost. A world-class web workspace for the PUNCHY.ME ecosystem.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double:wght@400;700;900&family=Outfit:wght@200;400;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🌌%3C/text%3E%3C/svg%3E">
    <link rel="preload" href="${bgUrl}" as="image">
    <style>
        :root {
            --text-main: #f8fafc;
            --text-dim: rgba(255, 255, 255, 0.7);
            --font-display: 'Outfit', sans-serif;
            --font-mono: 'JetBrains Mono', monospace;
            --font-brand: 'Bitcount Prop Double', cursive;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            background-color: #000;
            color: var(--text-main);
            font-family: var(--font-display);
            height: 100vh;
            width: 100vw;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
        }

        /* The Cinematic Background Layer */
        .bg-layer {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background-image: url('${bgUrl}');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            z-index: 0;
            opacity: 0;
            transform: scale(1.1);
            animation: cinematicFade 2.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes cinematicFade {
            0% { opacity: 0; transform: scale(1.1); }
            100% { opacity: 1; transform: scale(1.0); }
        }

        /* Tactical Overlay (60% Dim) */
        .overlay {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.6);
            z-index: 1;
            pointer-events: none;
        }

        /* Clock and Greeting */
        .time-container {
            position: absolute;
            top: 20%;
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
            z-index: 10;
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
            opacity: 0;
            animation: fadeInUI 1.5s ease-out 0.8s forwards;
        }

        @keyframes fadeInUI {
            from { opacity: 0; transform: translate(-50%, 10px); }
            to { opacity: 1; transform: translate(-50%, 0); }
        }

        .clock {
            font-family: var(--font-brand);
            font-size: clamp(6rem, 12vw, 10rem);
            font-weight: 400;
            line-height: 1;
            letter-spacing: -2px;
            margin-bottom: 0.5rem;
        }

        .date-display {
            font-family: var(--font-brand);
            font-size: clamp(1rem, 2vw, 1.5rem);
            font-weight: 400;
            color: var(--text-dim);
            text-transform: uppercase;
            letter-spacing: 4px;
            margin-bottom: 1.5rem;
        }

        .greeting {
            font-size: clamp(1.5rem, 3vw, 2.5rem);
            font-weight: 400;
            letter-spacing: 1px;
            color: #fff;
        }

        /* The Mac-Style Dock */
        .dock-container {
            position: absolute;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10;
            padding: 10px 20px;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 30px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: flex-end;
            gap: 10px;
            height: 80px; /* Fixed height for dock */
            transition: all 0.3s ease;
            opacity: 0;
            animation: fadeInUI 1.5s ease-out 1.2s forwards;
        }

        .dock-item {
            width: 50px;
            height: 50px;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
            text-decoration: none;
            color: white;
            transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
            position: relative;
            transform-origin: bottom center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            border: 1px solid rgba(255,255,255,0.05);
            filter: grayscale(0.5);
        }

        /* Tooltip */
        .dock-item::before {
            content: attr(data-title);
            position: absolute;
            top: -40px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            font-size: 0.8rem;
            padding: 5px 10px;
            border-radius: 6px;
            font-family: var(--font-mono);
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.2s;
            white-space: nowrap;
            border: 1px solid rgba(255,255,255,0.1);
        }

        /* Pure CSS Parabolic Scaling */
        .dock-container:hover .dock-item {
            filter: grayscale(0);
        }

        .dock-item:hover {
            transform: scale(1.6) translateY(-10px);
            margin: 0 15px;
            z-index: 10;
            background: rgba(255, 255, 255, 0.2);
            border-color: #22c55e;
            box-shadow: 0 10px 25px rgba(34, 197, 94, 0.4);
        }
        
        .dock-item:hover::before {
            opacity: 1;
        }

        .dock-item:hover + .dock-item,
        .dock-item:has(+ .dock-item:hover) {
            transform: scale(1.3) translateY(-5px);
            margin: 0 8px;
            z-index: 5;
        }

        /* Extremely subtle branding */
        .brand-watermark {
            position: absolute;
            bottom: 1rem;
            right: 1.5rem;
            font-family: var(--font-mono);
            font-size: 0.7rem;
            color: var(--text-dim);
            letter-spacing: 2px;
            opacity: 0.5;
            z-index: 10;
            text-transform: uppercase;
        }
        .brand-watermark a { color: inherit; text-decoration: none; }
        .brand-watermark a:hover { color: #fff; }

        @media (max-width: 768px) {
            .clock { font-size: 5rem; }
            .greeting { font-size: 1.5rem; }
            .dock-container {
                width: 90%;
                justify-content: center;
                gap: 5px;
                padding: 10px;
            }
            .dock-item { width: 40px; height: 40px; font-size: 1.2rem; }
            .dock-item:hover { transform: scale(1.3) translateY(-5px); margin: 0 5px; }
            .dock-item:hover + .dock-item,
            .dock-item:has(+ .dock-item:hover) { transform: scale(1.1); margin: 0 2px; }
        }
    </style>
</head>
<body>
    <div class="bg-layer"></div>
    <div class="overlay"></div>

    <div class="time-container">
        <div class="clock" id="clock">00:00</div>
        <div class="date-display" id="date">JANUARY 1</div>
        <div class="greeting" id="greeting">Welcome to Asgard.</div>
    </div>

    <div class="dock-container">
        <a href="/" class="dock-item" data-title="HOME">✨</a>
        <a href="/bazuka" class="dock-item" data-title="BAZUKA">👤</a>
        <a href="/anakin" class="dock-item" data-title="ANAKIN">⚡</a>
        <a href="/musashi" class="dock-item" data-title="MUSASHI">⚔️</a>
        <a href="/odin" class="dock-item" data-title="ODIN">🐦‍⬛</a>
        <a href="/yaiba" class="dock-item" data-title="YAIBA">✒️</a>
        <a href="/freya" class="dock-item" data-title="FREYA">🌠</a>
    </div>

    <div class="brand-watermark">
        <a href="/">PUNCHY.ME</a>
    </div>

    <script>
        function updateTime() {
            const now = new Date();
            
            // Time
            let hours = now.getHours();
            let minutes = now.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12; // Convert to 12-hour format
            minutes = minutes < 10 ? '0' + minutes : minutes;
            document.getElementById('clock').innerText = hours + ':' + minutes;

            // Date
            const options = { weekday: 'long', month: 'long', day: 'numeric' };
            document.getElementById('date').innerText = now.toLocaleDateString('en-US', options).toUpperCase();

            // Greeting
            const currentHour = now.getHours();
            let greeting = 'Welcome to Asgard.';
            if (currentHour >= 5 && currentHour < 12) greeting = 'Good Morning, ASGARDIAN.';
            else if (currentHour >= 12 && currentHour < 18) greeting = 'Good Afternoon, ASGARDIAN.';
            else if (currentHour >= 18 && currentHour < 22) greeting = 'Good Evening, ASGARDIAN.';
            else greeting = 'The Bifrost is quiet tonight, ASGARDIAN.';
            
            document.getElementById('greeting').innerText = greeting;
        }

        setInterval(updateTime, 1000);
        updateTime(); // Initial call
    </script>
</body>
</html>`;
