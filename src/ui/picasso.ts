export const PICASSO_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PICASSO | Ultra-Fast Image Editor | PUNCHY.ME</title>
    <meta name="description" content="PICASSO Image Editor: Ultra-fast, edge-native image editing with Unsplash integration.">
    
    <!-- Open Graph / Social -->
    <meta property="og:title" content="PICASSO | Ultra-Fast Image Editor | PUNCHY.ME">
    <meta property="og:description" content="Ultra-fast, edge-native image editing with Unsplash integration.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://punchy.me/picasso">
    <meta property="og:image" content="https://punchy.me/og-image.webp">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="PICASSO | Ultra-Fast Image Editor | PUNCHY.ME">
    <meta name="twitter:description" content="Ultra-fast, edge-native image editing with Unsplash integration.">
    <meta name="twitter:image" content="https://punchy.me/og-image.webp">

    <!-- JSON-LD Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "PICASSO Image Editor",
      "operatingSystem": "Any",
      "applicationCategory": "MultimediaApplication",
      "description": "Ultra-fast, edge-native image editing with Unsplash integration.",
      "url": "https://punchy.me/picasso",
      "publisher": {
        "@type": "Organization",
        "name": "PUNCHY.ME"
      }
    }
    </script>

    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%23000000' /%3E%3Cg transform='rotate(15, 50, 50)'%3E%3Cpath d='M35 25 H55 C65 25 75 32 75 45 C75 58 65 65 55 65 H45 V80' stroke='%2322c55e' stroke-width='10' stroke-linecap='round' stroke-linejoin='round' fill='none' /%3E%3Cpath d='M45 45 H55' stroke='%2322c55e' stroke-width='10' stroke-linecap='round' fill='none' /%3E%3C/g%3E%3C/svg%3E">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double:wght@400;700;900&family=JetBrains+Mono:wght@400;700&family=Inter:wght@400;900&family=Oswald:wght@400;700&family=Playfair+Display:ital,wght@0,900;1,900&family=Outfit:wght@400;900&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --bg: #000000;
            --ronin: #080808;
            --accent: #22c55e;
            --accent-hover: #4ade80;
            --text-main: #f8fafc;
            --text-dim: #94a3b8;
            --font-brand: 'Bitcount Prop Double', cursive;
            --font-mono: 'JetBrains Mono', monospace;
            --header-h: 120px;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        html, body { height: 100%; background-color: var(--bg); color: var(--text-main); font-family: var(--font-mono); overflow: hidden; }

        /* CUSTOM SCROLLBAR */
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.2); }
        ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.3); border-radius: 10px; transition: all 0.3s; }
        ::-webkit-scrollbar-thumb:hover { background: #ffffff; box-shadow: 0 0 15px #ffffff; }
        * { scrollbar-width: thin; scrollbar-color: rgba(255, 255, 255, 0.3) rgba(0, 0, 0, 0.2); }

        .tactical-header { height: var(--header-h); padding: 0 2.5rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255, 255, 255, 0.05); background: #000; backdrop-filter: blur(10px); position: relative; z-index: 200; }
        
        .brand-text-wrapper { display: flex; flex-direction: column; gap: 4px; }
        .title-row { display: flex; align-items: center; gap: 1.5rem; }
        .brand { font-family: var(--font-brand); font-size: 4.5rem; color: var(--text-main); text-transform: uppercase; text-decoration: none; letter-spacing: -3px; line-height: 0.8; font-weight: 400; }
        .tagline { font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-dim); letter-spacing: 1.5px; text-transform: uppercase; font-weight: 700; opacity: 0.8; }
        
        .beta-badge { background: var(--accent); color: #000; font-size: 0.8rem; font-weight: 900; padding: 4px 10px; border-radius: 6px; font-family: var(--font-mono); box-shadow: 0 0 15px rgba(34, 197, 94, 0.6); animation: pulse 2s infinite alternate; letter-spacing: 1px; margin-top: -10px; }
        @keyframes pulse { from { transform: scale(1); opacity: 0.8; } to { transform: scale(1.05); opacity: 1; } }

        .workspace { display: flex; height: calc(100vh - var(--header-h)); position: relative; background: #000; }
        .sidebar { width: 20%; background: var(--ronin); border-right: 1px solid rgba(255, 255, 255, 0.05); border-left: 1px solid rgba(255, 255, 255, 0.05); display: flex; flex-direction: column; min-width: 250px; }
        .sidebar-section { padding: 1.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
        .sidebar-section h3 { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 1rem; color: var(--text-dim); }
        
        input[type="text"], input[type="number"], select { width: 100%; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); color: #fff; padding: 12px; border-radius: 6px; font-family: var(--font-mono); font-size: 0.9rem; margin-bottom: 1rem; transition: all 0.2s; outline: none; }
        input[type="text"]:focus, input[type="number"]:focus, select:focus { border-color: #ffffff; background: rgba(255, 255, 255, 0.1); }
        
        select option { background: #121212; color: #fff; padding: 10px; }

        .search-row { display: flex; gap: 8px; margin-bottom: 1rem; }
        .icon-btn { flex: 0 0 48px; height: 48px; background: #ffffff; color: #000; border: none; border-radius: 6px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .icon-btn:hover { transform: translateY(-3px); box-shadow: 0 5px 15px rgba(255, 255, 255, 0.3); }
        .icon-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }
        .icon-btn.secondary { background: rgba(255, 255, 255, 0.1); color: #fff; border: 1px solid rgba(255, 255, 255, 0.1); }
        .icon-btn.secondary:hover { background: #fff; color: #000; }

        .image-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; overflow-y: auto; padding-right: 5px; min-height: 0; flex: 1; align-content: start; }
        .image-item { width: 100%; aspect-ratio: 16 / 9; background: rgba(255, 255, 255, 0.05); border-radius: 6px; overflow: hidden; cursor: pointer; border: 2px solid transparent; transition: all 0.2s; position: relative; display: flex; align-items: center; justify-content: center; }
        .image-item:hover, .image-item.active { border-color: #ffffff; box-shadow: 0 0 15px rgba(255, 255, 255, 0.3); }
        .image-item img { width: 100%; height: 100%; object-fit: contain; display: block; }
        
        .main-pane { width: 60%; padding: 0; display: flex; flex-direction: column; align-items: center; background: #0a0a0a; overflow: hidden; position: relative; }
        .canvas-top-menu { width: 100%; height: 80px; display: flex; align-items: center; justify-content: center; gap: 1rem; padding: 0 2rem; border-bottom: 1px solid rgba(255, 255, 255, 0.05); background: rgba(0,0,0,0.3); z-index: 10; }
        .canvas-top-menu .menu-group { display: flex; align-items: center; gap: 8px; }
        .canvas-top-menu input, .canvas-top-menu select { margin-bottom: 0 !important; height: 40px; }
        .canvas-top-menu input[type="number"] { width: 80px; text-align: center; }
        .canvas-top-menu input[type="text"] { width: 200px; }
        .canvas-top-menu select { width: 180px; }
        .menu-label { font-size: 0.6rem; color: var(--text-dim); text-transform: uppercase; letter-spacing: 1px; font-weight: 700; margin-right: 4px; }

        .canvas-wrapper { flex: 1; width: 100%; display: flex; align-items: center; justify-content: center; padding: 2rem; }
        .canvas-container { position: relative; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; overflow: hidden; background: #000; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); width: 100%; max-width: 1200px; aspect-ratio: 16 / 9; }
        canvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; }
        #bg-canvas { z-index: 1; }
        #wash-canvas { z-index: 2; pointer-events: none; }
        #text-canvas { z-index: 3; pointer-events: none; }

        .btn { background: #ffffff; color: #000; border: none; padding: 12px 24px; border-radius: 6px; font-weight: 900; font-family: var(--font-mono); cursor: pointer; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); width: 100%; text-transform: uppercase; letter-spacing: 1px; }
        .btn:hover { transform: translateY(-5px); box-shadow: 0 8px 20px rgba(255, 255, 255, 0.4); }
        .btn:active { transform: translateY(0); box-shadow: 0 2px 5px rgba(255, 255, 255, 0.2); }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; box-shadow: none; transform: none; }
        .btn-outline { background: transparent; border: 1px solid rgba(255, 255, 255, 0.2); color: var(--text-main); margin-top: 1rem; }
        .btn-outline:hover { background: rgba(255, 255, 255, 1); color: #000; border-color: #ffffff; box-shadow: 0 8px 20px rgba(255, 255, 255, 0.4); transform: translateY(-5px); }

        /* SLIDER OVERRIDE */
        input[type="range"] { -webkit-appearance: none; background: transparent; }
        input[type="range"]::-webkit-slider-runnable-track { width: 100%; height: 4px; cursor: pointer; background: rgba(255, 255, 255, 0.1); border-radius: 2px; }
        input[type="range"]::-webkit-slider-thumb { height: 16px; width: 16px; border-radius: 50%; background: #ffffff; cursor: pointer; -webkit-appearance: none; margin-top: -6px; box-shadow: 0 0 10px rgba(255, 255, 255, 0.3); }
        input[type="range"]:focus::-webkit-slider-runnable-track { background: rgba(255, 255, 255, 0.2); }

        /* DOWNLOAD ANIMATION */
        @keyframes downloadBob {
            0% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
            100% { transform: translateY(0); }
        }
        #header-download-btn svg { animation: downloadBob 2s ease-in-out infinite; }

        /* ECOSYSTEM PORTAL */
        .punchy-portal { position: fixed; bottom: 1.5rem; right: 1.5rem; display: flex; flex-direction: row-reverse; align-items: center; background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(10px); border: 1px solid rgba(34, 197, 94, 0.2); border-radius: 12px; padding: 0.5rem; gap: 0; overflow: hidden; width: 44px; height: 44px; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); z-index: 1000; cursor: pointer; text-decoration: none; }
        .punchy-portal:hover { width: 360px; gap: 1rem; border-color: var(--accent); box-shadow: 0 0 20px rgba(34, 197, 94, 0.2); }
        .portal-trigger { font-size: 1.2rem; min-width: 28px; text-align: center; display: flex; align-items: center; justify-content: center; }
        .portal-brand { color: var(--accent); font-weight: 700; font-size: 0.8rem; white-space: nowrap; opacity: 0; transition: opacity 0.3s ease; font-family: var(--font-mono); }
        .punchy-portal:hover .portal-brand { opacity: 1; }
        .portal-tools { display: flex; gap: 0.8rem; opacity: 0; transition: opacity 0.3s ease; }
        .punchy-portal:hover .portal-tools { opacity: 1; }
        .portal-tool-link { text-decoration: none; font-size: 1.1rem; transition: transform 0.2s ease; filter: grayscale(1); }
        .portal-tool-link:hover { transform: scale(1.3); filter: grayscale(0); }

        /* MOBILE RESTRICTION */
        .mobile-only-notice { display: none; height: 100vh; width: 100vw; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; text-align: center; background: #000; position: fixed; top: 0; left: 0; z-index: 9999; }
        .mobile-only-notice h1 { font-family: var(--font-brand); font-size: 3rem; color: var(--accent); margin-bottom: 1rem; font-weight: 400; letter-spacing: -2px; text-transform: uppercase; }
        .mobile-only-notice p { font-family: var(--font-mono); color: var(--text-dim); max-width: 300px; line-height: 1.6; }

        @media (max-width: 1024px) {
            .tactical-header, .workspace, .punchy-portal { display: none !important; }
            .mobile-only-notice { display: flex; }
        }
    </style>
</head>
<body>
    <div class="mobile-only-notice">
        <h1>DESKTOP ONLY</h1>
        <p>PICASSO is a precision tactical tool optimized for high-resolution displays. Please switch to a desktop environment to continue forging.</p>
        <a href="/" class="btn" style="margin-top: 2rem; width: auto;">Return to Base</a>
    </div>

    <a href="/" class="punchy-portal">
        <div class="portal-trigger">⚡</div>
        <div class="portal-brand">PUNCHY.ME</div>
        <div class="portal-tools">
            <object><a href="/bazuka" class="portal-tool-link" title="BAZUKA">👤</a></object>
            <object><a href="/anakin" class="portal-tool-link" title="ANAKIN">⚡</a></object>
            <object><a href="/musashi" class="portal-tool-link" title="MUSASHI">⚔️</a></object>
            <object><a href="/odin" class="portal-tool-link" title="ODIN">🐦‍⬛</a></object>
            <object><a href="/yaiba" class="portal-tool-link" title="YAIBA">✒️</a></object>
            <object><a href="/picasso" class="portal-tool-link" title="PICASSO">🎨</a></object>
        </div>
    </a>

    <header class="tactical-header">
        <div class="brand-text-wrapper">
            <div class="title-row">
                <a href="/" class="brand" data-text="PICASSO">PICASSO</a>
                <div class="beta-badge">BETA</div>
            </div>
            <div class="tagline">Ultra-Fast Edge-Native Image Editor</div>
        </div>
        
        <!-- TOP RIGHT STATUS & DOWNLOAD -->
        <div id="forge-container" style="display: none; align-items: center; gap: 1.5rem; background: rgba(255, 255, 255, 0.03); padding: 10px 20px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.08);">
            <div id="forge-status" style="font-size: 0.75rem; font-weight: 900; color: var(--accent); letter-spacing: 2px; text-transform: uppercase; font-family: var(--font-mono);">READY</div>
            <button id="header-download-btn" onclick="downloadImage()" style="background: none; border: none; cursor: pointer; padding: 0; display: flex; align-items: center; justify-content: center; transition: all 0.3s; opacity: 0.3; pointer-events: none;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 5px rgba(255,255,255,0.3));"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </button>
        </div>
    </header>

    <div class="workspace">
        <!-- LEFT SIDEBAR: Search -->
        <div class="sidebar">
            <div class="sidebar-section">
                <h3>SEARCH UNSPLASH</h3>
                <div class="search-row">
                    <input type="text" id="search-input" placeholder="Tactical Search..." oninput="debouncedSearch()" style="margin-bottom: 0;">
                    <button class="icon-btn" onclick="searchImages(true)" id="search-btn" title="Search Unsplash">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    </button>
                    <button class="icon-btn secondary" onclick="searchImages(false)" id="load-more-btn" title="Fetch New Set">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                    </button>
                </div>
            </div>
            <div class="sidebar-section" style="flex: 1; overflow: hidden; display: flex; flex-direction: column;">
                <h3>Results</h3>
                <div class="image-grid" id="image-grid">
                    <!-- Images will be rendered here -->
                </div>
            </div>
        </div>

        <!-- MAIN PANE: Canvas -->
        <div class="main-pane">
            <div class="canvas-top-menu">
                <div class="menu-group">
                    <span class="menu-label">Size:</span>
                    <input type="number" id="img-width" value="1200" oninput="resizeCanvases(); renderAll()">
                    <span style="color: var(--text-dim); opacity: 0.5;">×</span>
                    <input type="number" id="img-height" value="675" oninput="resizeCanvases(); renderAll()">
                </div>
                
                <div style="width: 1px; height: 30px; background: rgba(255,255,255,0.1); margin: 0 1rem;"></div>

                <div class="menu-group">
                    <span class="menu-label">Text:</span>
                    <input type="text" id="text-overlay" value="Punchy" placeholder="Overlay Text" oninput="renderText()">
                </div>

                <div style="width: 1px; height: 30px; background: rgba(255,255,255,0.1); margin: 0 1rem;"></div>

                <div class="menu-group">
                    <span class="menu-label">Font:</span>
                    <select id="font-family" onchange="renderText()">
                        <option value="'Bitcount Prop Double'">Bitcount Prop Double</option>
                        <option value="'JetBrains Mono'">JetBrains Mono</option>
                        <option value="'Outfit'">Outfit (Google Sans)</option>
                        <option value="'Inter'">Inter (Sans)</option>
                        <option value="'Oswald'">Oswald (Bold)</option>
                        <option value="'Playfair Display'">Playfair (Elegant)</option>
                    </select>
                </div>
            </div>
            
            <div class="canvas-wrapper">
                <div class="canvas-container" id="canvas-root">
                    <canvas id="bg-canvas"></canvas>
                    <canvas id="wash-canvas"></canvas>
                    <canvas id="text-canvas"></canvas>
                </div>
            </div>
        </div>

        <!-- RIGHT SIDEBAR: Editor -->
        <div class="sidebar">
            <div class="sidebar-section">
                <h3>EDITOR</h3>
                
                <label style="font-size: 0.7rem; color: var(--text-dim); margin-bottom: 5px; display: block; text-transform: uppercase;">Zoom (<span id="zoom-val">100</span>%)</label>
                <input type="range" id="img-zoom" min="10" max="500" value="100" style="width: 100%; margin-bottom: 1.5rem; accent-color: #ffffff;" oninput="document.getElementById('zoom-val').innerText = this.value; renderBG()">

                <label style="font-size: 0.7rem; color: var(--text-dim); margin-bottom: 5px; display: block; text-transform: uppercase;">Dark Wash (<span id="wash-val">0</span>%)</label>
                <input type="range" id="dark-wash" min="0" max="100" value="0" style="width: 100%; margin-bottom: 1.5rem; accent-color: #ffffff;" oninput="document.getElementById('wash-val').innerText = this.value; renderWash()">
                
                <label style="font-size: 0.7rem; color: var(--text-dim); margin-bottom: 5px; display: block; text-transform: uppercase;">Image X (<span id="img-x-val">50</span>%)</label>
                <input type="range" id="img-x" min="0" max="100" value="50" style="width: 100%; margin-bottom: 1.5rem; accent-color: #ffffff;" oninput="document.getElementById('img-x-val').innerText = this.value; renderBG()">
                
                <label style="font-size: 0.7rem; color: var(--text-dim); margin-bottom: 5px; display: block; text-transform: uppercase;">Image Y (<span id="img-y-val">50</span>%)</label>
                <input type="range" id="img-y" min="0" max="100" value="50" style="width: 100%; margin-bottom: 1.5rem; accent-color: #ffffff;" oninput="document.getElementById('img-y-val').innerText = this.value; renderBG()">

                <h3 style="margin-top: 1.5rem;">Typography Layout</h3>
                
                <label style="font-size: 0.7rem; color: var(--text-dim); margin-bottom: 5px; display: block; text-transform: uppercase;">Font Size (<span id="font-size-val">120</span>px)</label>
                <input type="range" id="font-size" min="10" max="400" value="120" style="width: 100%; margin-bottom: 1.5rem; accent-color: #ffffff;" oninput="document.getElementById('font-size-val').innerText = this.value; renderText()">

                <label style="font-size: 0.7rem; color: var(--text-dim); margin-bottom: 5px; display: block; text-transform: uppercase;">Position X (<span id="text-x-val">50</span>%)</label>
                <input type="range" id="text-x" min="0" max="100" value="50" style="width: 100%; margin-bottom: 1rem; accent-color: #ffffff;" oninput="document.getElementById('text-x-val').innerText = this.value; renderText()">
                
                <label style="font-size: 0.7rem; color: var(--text-dim); margin-bottom: 5px; display: block; text-transform: uppercase;">Position Y (<span id="text-y-val">50</span>%)</label>
                <input type="range" id="text-y" min="0" max="100" value="50" style="width: 100%; margin-bottom: 1.5rem; accent-color: #ffffff;" oninput="document.getElementById('text-y-val').innerText = this.value; renderText()">
            </div>
        </div>
    </div>

    <script>
        const bgCanvas = document.getElementById('bg-canvas');
        const bgCtx = bgCanvas.getContext('2d');
        const washCanvas = document.getElementById('wash-canvas');
        const washCtx = washCanvas.getContext('2d');
        const textCanvas = document.getElementById('text-canvas');
        const textCtx = textCanvas.getContext('2d');
        
        let currentImage = null;
        let currentPage = 1;
        let currentQuery = '';
        let searchTimeout = null;
        const tinyCache = {}; 
        const masterWarmup = new Set(); // To track warmed up images

        // Initial Setup
        resizeCanvases();
        renderAll();

        function debouncedSearch() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => searchImages(true), 600);
        }

        function resizeCanvases() {
            const w = parseInt(document.getElementById('img-width').value) || 1200;
            const h = parseInt(document.getElementById('img-height').value) || 675;
            [bgCanvas, washCanvas, textCanvas].forEach(c => {
                c.width = w;
                c.height = h;
            });
            // Update the container aspect ratio for visual consistency
            document.getElementById('canvas-root').style.aspectRatio = w + ' / ' + h;
        }

        async function searchImages(isNewSearch = false) {
            const input = (document.getElementById('search-input').value || '').trim();
            
            // Prevent redundant searches for same query
            if (isNewSearch && input === currentQuery && currentPage === 1 && input !== '') return;

            const searchBtn = document.getElementById('search-btn');
            const loadMoreBtn = document.getElementById('load-more-btn');
            
            if (isNewSearch) {
                currentPage = 1;
                currentQuery = input;
                searchBtn.disabled = true;
            } else {
                currentPage++;
                loadMoreBtn.disabled = true;
            }
            
            try {
                const res = await fetch('/picasso/search?q=' + encodeURIComponent(currentQuery) + '&p=' + currentPage);
                
                if (res.ok) {
                    const data = await res.json();
                    // Auto-select first image if it's a new search (includes initial random load)
                    renderGrid(data.images, true, isNewSearch); 
                }
            } catch (err) {
                console.error('Search error:', err);
            } finally {
                searchBtn.disabled = false;
                loadMoreBtn.disabled = false;
            }
        }

        function renderGrid(images, replace = true, autoSelectFirst = false) {
            const grid = document.getElementById('image-grid');
            if (replace) grid.innerHTML = '';
            
            images.forEach((img, idx) => {
                // Tier 0: Tiny Pre-fetch
                const tinyImg = new Image();
                tinyImg.crossOrigin = "anonymous";
                tinyImg.src = img.tiny;
                tinyCache[img.id] = tinyImg;

                // Pre-emptive Warm-up (Top 3)
                if (idx < 3 && !masterWarmup.has(img.id)) {
                    const warmup = new Image();
                    warmup.crossOrigin = "anonymous";
                    warmup.src = img.url;
                    masterWarmup.add(img.id);
                }

                const item = document.createElement('div');
                item.className = 'image-item';
                item.onclick = () => {
                    document.querySelectorAll('.image-item').forEach(el => el.classList.remove('active'));
                    item.classList.add('active');
                    loadImage(img.id, img.url, img.preview);
                };
                
                const imgEl = document.createElement('img');
                imgEl.src = img.thumb;
                imgEl.alt = img.alt || 'Unsplash image';
                imgEl.loading = 'lazy';
                imgEl.decoding = 'async';
                
                item.appendChild(imgEl);
                grid.appendChild(item);

                // Auto-select the first image if requested
                if (autoSelectFirst && idx === 0) {
                    item.classList.add('active');
                    loadImage(img.id, img.url, img.preview);
                }
            });
        }

        function loadImage(id, url, previewUrl) {
            const container = document.getElementById('forge-container');
            const status = document.getElementById('forge-status');
            const btn = document.getElementById('header-download-btn');
            
            container.style.display = 'flex';
            btn.style.opacity = '0.3';
            btn.style.pointerEvents = 'none';
            status.innerText = 'FORGING...';
            
            if (tinyCache[id] && tinyCache[id].complete) {
                currentImage = tinyCache[id];
                renderBG();
                status.innerText = 'PREVIEWING...';
            }

            const previewImg = new Image();
            previewImg.crossOrigin = "anonymous";
            previewImg.onload = () => {
                if (currentImage === null || currentImage.src !== url) {
                    currentImage = previewImg;
                    renderBG();
                    status.innerText = 'FORGING MASTER...';
                }
            };
            previewImg.src = previewUrl;

            const masterImg = new Image();
            masterImg.crossOrigin = "anonymous";
            masterImg.onload = () => {
                currentImage = masterImg;
                status.innerText = 'READY';
                btn.style.opacity = '1';
                btn.style.pointerEvents = 'all';
                renderBG();
            };
            masterImg.src = url; 
        }

        function renderAll() {
            renderBG();
            renderWash();
            renderText();
        }

        function renderBG() {
            const w = bgCanvas.width;
            const h = bgCanvas.height;
            bgCtx.clearRect(0, 0, w, h);

            if (currentImage) {
                const imgRatio = currentImage.width / currentImage.height;
                const canvasRatio = w / h;
                
                const posXPercent = parseInt(document.getElementById('img-x').value) || 50;
                const posYPercent = parseInt(document.getElementById('img-y').value) || 50;
                const zoomPercent = parseInt(document.getElementById('img-zoom').value) || 100;

                let baseW, baseH;

                if (imgRatio > canvasRatio) {
                    baseH = h;
                    baseW = currentImage.width * (h / currentImage.height);
                } else {
                    baseW = w;
                    baseH = currentImage.height * (w / currentImage.width);
                }

                // Apply zoom factor
                const drawW = baseW * (zoomPercent / 100);
                const drawH = baseH * (zoomPercent / 100);

                // Calculate position based on percentage (50% is center)
                // We calculate the available "slack" (difference between canvas and drawn image)
                // and apply the percentage to that slack.
                const dx = (w - drawW) * (posXPercent / 100);
                const dy = (h - drawH) * (posYPercent / 100);

                bgCtx.drawImage(currentImage, dx, dy, drawW, drawH);
            } else {
                bgCtx.fillStyle = '#111';
                bgCtx.fillRect(0, 0, w, h);
            }
        }

        function renderWash() {
            const w = washCanvas.width;
            const h = washCanvas.height;
            washCtx.clearRect(0, 0, w, h);
            
            const val = parseInt(document.getElementById('dark-wash').value) || 0;
            if (val > 0) {
                washCtx.fillStyle = 'rgba(0, 0, 0, ' + (val / 100) + ')';
                washCtx.fillRect(0, 0, w, h);
            }
        }

        function renderText() {
            const w = textCanvas.width;
            const h = textCanvas.height;
            const text = document.getElementById('text-overlay').value;
            textCtx.clearRect(0, 0, w, h);

            if (text) {
                const fontFamily = document.getElementById('font-family').value;
                const fontSize = parseInt(document.getElementById('font-size').value) || 120;
                const posXPercent = parseInt(document.getElementById('text-x').value) || 50;
                const posYPercent = parseInt(document.getElementById('text-y').value) || 50;

                textCtx.font = fontSize + 'px ' + fontFamily + ', sans-serif';
                textCtx.textAlign = 'center';
                textCtx.textBaseline = 'middle';
                textCtx.fillStyle = "white";

                const posX = (w * posXPercent) / 100;
                const posY = (h * posYPercent) / 100;
                textCtx.fillText(text, posX, posY);
            }
        }

        function downloadImage() {
            const final = document.createElement('canvas');
            final.width = bgCanvas.width;
            final.height = bgCanvas.height;
            const fCtx = final.getContext('2d');
            
            fCtx.drawImage(bgCanvas, 0, 0);
            fCtx.drawImage(washCanvas, 0, 0);
            fCtx.drawImage(textCanvas, 0, 0);
            
            const dataUrl = final.toDataURL('image/webp', 0.9);
            const a = document.createElement('a');
            a.href = dataUrl;
            a.download = 'punchy-picasso-' + Date.now() + '.webp';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }

        // Initial Setup
        resizeCanvases();
        renderAll();
        searchImages(true); // Trigger initial random load

        // Ensure fonts are loaded before final render
        document.fonts.ready.then(() => {
            renderText();
        });
    </script>
</body>
</html>`;