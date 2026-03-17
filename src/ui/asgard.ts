export const ASGARD_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ASGARD | The Supreme Workspace for Deep Work & Focus</title>
    <meta name="description" content="Enter ASGARD: The ultimate minimalist web desktop. A world-class workspace featuring Spotlight search, Pomodoro focus timer, and ambient soundscapes for maximum productivity.">
    <meta name="keywords" content="productivity, deep work, focus timer, pomodoro, web desktop, minimalist workspace, asgard, punchy.me">
    
    <!-- SEO & Social Mastery -->
    <link rel="canonical" href="https://punchy.me/asgard">
    <meta property="og:title" content="ASGARD | The Supreme Workspace">
    <meta property="og:description" content="A world-class, distraction-free desktop environment for the elite creator. Ultra-fast, edge-native, and beautifully minimal.">
    <meta property="og:url" content="https://punchy.me/asgard">
    <meta property="og:type" content="website">
    <meta property="og:image" content="https://punchy.me/og-images/og-image-asgard.webp">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="ASGARD | The Supreme Workspace">
    <meta name="twitter:description" content="Maximize your focus with the Asgardian desktop launchpad. Integrated Spotlight search, Pomodoro, and Zen mode.">
    <meta name="twitter:image" content="https://punchy.me/og-images/og-image-asgard.webp">

    <!-- Structured Data: WebApplication -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "ASGARD Workspace",
      "url": "https://punchy.me/asgard",
      "description": "A world-class web-based desktop environment optimized for focus and deep work.",
      "applicationCategory": "ProductivityApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript and HTML5 support",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Minimalist Digital Clock",
        "Mac-style Interactive Dock",
        "Spotlight Tactical Search (Ctrl+K)",
        "Integrated Pomodoro Focus Timer",
        "Ambient Focus Soundscapes",
        "Total Stealth Zen Mode"
      ],
      "publisher": {
        "@type": "Organization",
        "name": "PUNCHY.ME Ecosystem"
      }
    }
    </script>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double:wght@400;700;900&family=Outfit:wght@200;400;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🌌%3C/text%3E%3C/svg%3E">
    
    <style>
        :root {
            --text-main: #f8fafc;
            --text-dim: rgba(255, 255, 255, 0.7);
            --font-display: 'Outfit', sans-serif;
            --font-mono: 'JetBrains Mono', monospace;
            --font-brand: 'Bitcount Prop Double', cursive;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        html, body {
            height: 100%;
            width: 100%;
            height: 100svh; /* Stable mobile height */
            margin: 0;
            padding: 0;
            overflow: hidden;
            background-color: #000;
            -ms-overflow-style: none;
            scrollbar-width: none;
        }

        /* Hide scrollbars globally */
        ::-webkit-scrollbar { display: none; }

        body {
            color: var(--text-main);
            font-family: var(--font-display);
            position: relative;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
        }

        /* The Cinematic Background Layer */
        #bg-layer {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            z-index: 0;
            opacity: 0;
            transform: scale(1.08); /* Subtle zoom for entrance */
            transition: opacity 2.5s cubic-bezier(0.22, 1, 0.36, 1), transform 2.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        #bg-layer.loaded {
            opacity: 1;
            transform: scale(1.0);
        }

        /* Tactical Overlay (42% Dim) */
        .overlay {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.42);
            z-index: 1;
            pointer-events: none;
        }

        /* Clock and Greeting - Centered HUD */
        .time-container {
            position: absolute;
            top: 45%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            z-index: 10;
            width: 90%;
            text-shadow: 0 4px 30px rgba(0, 0, 0, 0.8);
        }

        .clock {
            font-family: var(--font-brand);
            font-size: clamp(6rem, 12vw, 10rem);
            font-weight: 400;
            line-height: 1;
            letter-spacing: -2px;
            margin-bottom: 0.5rem;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .date-display {
            font-family: var(--font-brand);
            font-size: clamp(1rem, 2vw, 1.5rem);
            font-weight: 400;
            color: var(--text-dim);
            text-transform: uppercase;
            letter-spacing: 4px;
            margin-bottom: 1.5rem;
            opacity: 0;
            transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .greeting {
            font-size: clamp(1.5rem, 3vw, 2.5rem);
            font-weight: 400;
            letter-spacing: 1px;
            color: #fff;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* The Mac-Style Dock */
        .dock-container {
            position: absolute;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%) translateY(20px);
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
            opacity: 0;
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Entrance Trigger States */
        body.loaded-ui .clock,
        body.loaded-ui .date-display {
            opacity: 1;
            transform: translateY(0);
        }
        body.loaded-ui .greeting {
            opacity: 1;
            transform: translateY(0);
        }
        body.loaded-ui .dock-container {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
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
        /* Spotlight Search Overlay - Frosted White */
        .spotlight-overlay {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            z-index: 100;
            display: none;
            align-items: center;
            justify-content: center;
        }
        .spotlight-overlay.active { display: flex; }
        .spotlight-search-box {
            width: 600px;
            max-width: 90%;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid #fff;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
            transform: translateY(-50px);
            transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .spotlight-overlay.active .spotlight-search-box { transform: translateY(0); }
        .spotlight-input {
            width: 100%;
            background: transparent;
            border: none;
            outline: none;
            color: #000;
            font-size: 1.5rem;
            font-family: var(--font-display);
        }
        .spotlight-hint {
            font-size: 0.7rem;
            color: rgba(0, 0, 0, 0.5);
            margin-top: 1rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-family: var(--font-mono);
        }

        /* Pomodoro Timer */
        .pomodoro-container {
            margin-top: 1rem;
            font-family: var(--font-mono);
            font-size: 1.2rem;
            color: var(--text-dim);
            cursor: pointer;
            transition: all 0.3s ease;
            user-select: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }
        .pomodoro-container:hover { color: #fff; }
        .pomodoro-progress {
            width: 100px;
            height: 2px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 1px;
            overflow: hidden;
            position: relative;
        }
        .pomodoro-bar {
            height: 100%;
            background: #22c55e;
            width: 0%;
            transition: width 1s linear;
        }

        /* Total Stealth (Zen Mode) */
        body.zen-mode .greeting {
            opacity: 0 !important;
            transform: translateY(20px);
            pointer-events: none !important;
        }
        body.zen-mode .dock-container {
            opacity: 0 !important;
            transform: translateX(-50%) translateY(20px) !important;
            pointer-events: none !important;
        }
        body.zen-mode .pomodoro-container {
            margin-top: 0.5rem;
        }

        @media (max-width: 768px) {
            .time-container { top: 40%; width: 100%; padding: 0 1rem; }
            .clock { font-size: 8.5rem; letter-spacing: -4px; margin-bottom: 0.2rem; }
            .date-display { font-size: 1.7rem; letter-spacing: 2px; margin-bottom: 1rem; }
            .greeting { font-size: 1.1rem; line-height: 1.4; max-width: 80%; margin: 0 auto; }
            
            .dock-container {
                width: auto;
                max-width: 90vw;
                justify-content: flex-start;
                gap: 8px;
                padding: 10px 18px;
                bottom: calc(2.5rem + env(safe-area-inset-bottom));
                height: 64px;
                border-radius: 32px;
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
            }
            
            .dock-item { 
                width: 42px; 
                height: 42px; 
                font-size: 1.4rem; 
                flex-shrink: 0; 
            }
            .dock-item:hover { transform: scale(1.2) translateY(-5px); margin: 0; }
            .dock-item:hover + .dock-item,
            .dock-item:has(+ .dock-item:hover) { transform: scale(1.1); margin: 0; }
        }

        /* Extra landscape mobile optimization */
        @media (max-height: 500px) {
            .time-container { top: 35%; scale: 0.7; }
            .dock-container { height: 50px; bottom: 0.5rem; padding: 5px 15px; }
            .dock-item { width: 34px; height: 34px; font-size: 1.1rem; }
        }
    </style>
</head>
<body>
    <div id="bg-layer"></div>
    <div class="overlay"></div>

    <div class="time-container">
        <div class="clock" id="clock">00:00</div>
        <div class="date-display" id="date">JANUARY 1</div>
        <div class="greeting" id="greeting">Welcome to Asgard.</div>
        
        <!-- POMODORO DISABLED FOR NOW
        <div class="pomodoro-container" id="pomodoro" onclick="togglePomodoro()" oncontextmenu="resetPomodoro(event)">
            <span id="pomo-status">FOCUS</span>
            <span id="pomo-timer">25:00</span>
            <div class="pomodoro-progress">
                <div class="pomodoro-bar" id="pomo-bar"></div>
            </div>
        </div>
        -->
    </div>

    <div class="spotlight-overlay" id="spotlight">
        <div class="spotlight-search-box">
            <input type="text" class="spotlight-input" id="spotlight-input" placeholder="Search Google or Ecosystem..." autocomplete="off">
            <div class="spotlight-hint">Press ENTER to Search • ESC to Close • ⌘K to Open</div>
        </div>
    </div>

    <div class="dock-container">
        <a href="/" class="dock-item" data-title="HOME">✨</a>
        <a href="/bazuka" class="dock-item" data-title="BAZUKA">👤</a>
        <a href="/anakin" class="dock-item" data-title="ANAKIN">🪨</a>
        <a href="/thor" class="dock-item" data-title="THOR">⚡</a>
        <a href="/musashi" class="dock-item" data-title="MUSASHI">⚔️</a>
        <a href="/odin" class="dock-item" data-title="ODIN">🐦‍⬛</a>
        <a href="/yaiba" class="dock-item" data-title="YAIBA">✒️</a>
        <a href="/ragnar" class="dock-item" data-title="RAGNAR">🛡️</a>
        <a href="/freya" class="dock-item" data-title="FREYA">🌠</a>
        <div class="dock-item" data-title="SOUND" onclick="toggleSound()" style="cursor:pointer" id="sound-btn">🎧</div>
    </div>

    <audio id="ambient-audio" loop preload="none">
        <source src="/asgard_assets/all-of-my-pryces-asgard.mp3" type="audio/mpeg">
    </audio>

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

        // --- BACKGROUND LOADING (Cinematic Fade-in) ---
        const background = '/asgard_assets/asgard_bg_midjourney.webp';
        const bgLayer = document.getElementById('bg-layer');
        const img = new Image();
        img.src = background;
        img.onload = () => {
            bgLayer.style.backgroundImage = 'url(' + background + ')';
            bgLayer.classList.add('loaded');
        };

        // --- POMODORO LOGIC ---
        let pomoMinutes = 25;
        let pomoSeconds = 0;
        let pomoInterval = null;
        let isPomoActive = false;

        function togglePomodoro() {
            const container = document.getElementById('pomodoro');
            if (isPomoActive) {
                clearInterval(pomoInterval);
                isPomoActive = false;
                container.classList.remove('active');
                document.getElementById('pomo-status').innerText = 'PAUSED';
            } else {
                isPomoActive = true;
                container.classList.add('active');
                document.getElementById('pomo-status').innerText = 'FOCUS';
                pomoInterval = setInterval(updatePomodoro, 1000);
            }
        }

        function updatePomodoro() {
            if (pomoSeconds === 0) {
                if (pomoMinutes === 0) {
                    clearInterval(pomoInterval);
                    alert('Focus Session Complete, Asgardian.');
                    resetPomodoro();
                    return;
                }
                pomoMinutes--;
                pomoSeconds = 59;
            } else {
                pomoSeconds--;
            }
            renderPomo();
        }

        function renderPomo() {
            const m = pomoMinutes < 10 ? '0' + pomoMinutes : pomoMinutes;
            const s = pomoSeconds < 10 ? '0' + pomoSeconds : pomoSeconds;
            document.getElementById('pomo-timer').innerText = m + ':' + s;
            const percent = ((25 * 60 - (pomoMinutes * 60 + pomoSeconds)) / (25 * 60)) * 100;
            document.getElementById('pomo-bar').style.width = percent + '%';
        }

        function resetPomodoro(e) {
            if (e) e.preventDefault();
            clearInterval(pomoInterval);
            isPomoActive = false;
            pomoMinutes = 25;
            pomoSeconds = 0;
            document.getElementById('pomodoro').classList.remove('active');
            document.getElementById('pomo-status').innerText = 'FOCUS';
            renderPomo();
        }

        // --- SPOTLIGHT LOGIC ---
        const spotlight = document.getElementById('spotlight');
        const spotlightInput = document.getElementById('spotlight-input');

        window.addEventListener('keydown', (e) => {
            // Toggle Zen Mode (Z key)
            if (e.key.toLowerCase() === 'z' && document.activeElement.tagName !== 'INPUT') {
                document.body.classList.toggle('zen-mode');
            }

            // Open Spotlight (Ctrl+K or Cmd+K)
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                spotlight.classList.add('active');
                spotlightInput.focus();
            }

            // Close Spotlight (Escape)
            if (e.key === 'Escape') {
                spotlight.classList.remove('active');
                spotlightInput.blur();
            }
        });

        spotlightInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const rawQuery = spotlightInput.value.trim();
                const query = rawQuery.toLowerCase();

                if (query) {
                    // Ecosystem Discovery
                    const tools = {
                        'bazuka': '/bazuka', 'card': '/bazuka', 'profile': '/bazuka',
                        'anakin': '/anakin', 'resume': '/anakin', 'cv': '/anakin',
                        'musashi': '/musashi', 'job': '/musashi', 'intel': '/musashi',
                        'odin': '/odin', 'data': '/odin', 'analysis': '/odin',
                        'yaiba': '/yaiba', 'write': '/yaiba', 'markdown': '/yaiba',
                        'ragnar': '/ragnar', 'slide': '/ragnar', 'presentation': '/ragnar',
                        'freya': '/freya', 'image': '/freya', 'design': '/freya',
                        'asgard': '/asgard',
                        'home': '/'
                    };

                    if (tools[query]) {
                        window.location.href = tools[query];
                    } else {
                        window.open('https://www.google.com/search?q=' + encodeURIComponent(rawQuery), '_blank');
                    }
                    spotlight.classList.remove('active');
                    spotlightInput.value = '';
                }
            }
        });

        spotlight.addEventListener('click', (e) => {
            if (e.target === spotlight) {
                spotlight.classList.remove('active');
            }
        });

        // --- SOUNDSCAPE LOGIC ---
        let isSoundOn = false;
        const audio = document.getElementById('ambient-audio');
        const soundBtn = document.getElementById('sound-btn');

        function toggleSound() {
            if (isSoundOn) {
                audio.pause();
                soundBtn.innerText = '🎧';
                soundBtn.style.filter = 'grayscale(1)';
                isSoundOn = false;
            } else {
                audio.play();
                soundBtn.innerText = '🔊';
                soundBtn.style.filter = 'grayscale(0)';
                isSoundOn = true;
            }
        }

        // --- ENTRANCE SEQUENCE ---
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.classList.add('loaded-ui');
            }, 500);
        });
    </script>
</body>
</html>`;
