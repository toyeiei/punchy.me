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
            --ronin: #121212;
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

        .tactical-header { height: var(--header-h); padding: 0 2.5rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255, 255, 255, 0.05); background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); position: relative; z-index: 200; }
        
        .brand-text-wrapper { display: flex; flex-direction: column; gap: 4px; }
        .title-row { display: flex; align-items: center; gap: 1.5rem; }
        .brand { font-family: var(--font-brand); font-size: 4.5rem; color: var(--text-main); text-transform: uppercase; text-decoration: none; letter-spacing: -3px; line-height: 0.8; font-weight: 400; }
        .tagline { font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-dim); letter-spacing: 1.5px; text-transform: uppercase; font-weight: 700; opacity: 0.8; }
        
        .beta-badge { background: var(--accent); color: #000; font-size: 0.8rem; font-weight: 900; padding: 4px 10px; border-radius: 6px; font-family: var(--font-mono); box-shadow: 0 0 15px rgba(34, 197, 94, 0.6); animation: pulse 2s infinite alternate; letter-spacing: 1px; margin-top: -10px; }
        @keyframes pulse { from { transform: scale(1); opacity: 0.8; } to { transform: scale(1.05); opacity: 1; } }

        .workspace { display: flex; height: calc(100vh - var(--header-h)); position: relative; }
        .sidebar { width: 20%; background: var(--ronin); border-right: 1px solid rgba(255, 255, 255, 0.05); border-left: 1px solid rgba(255, 255, 255, 0.05); display: flex; flex-direction: column; min-width: 250px; }
        .sidebar-section { padding: 1.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
        .sidebar-section h3 { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 1rem; color: var(--text-dim); }
        
        input[type="text"], input[type="number"], select { width: 100%; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); color: #fff; padding: 12px; border-radius: 6px; font-family: var(--font-mono); font-size: 0.9rem; margin-bottom: 1rem; transition: all 0.2s; outline: none; }
        input[type="text"]:focus, input[type="number"]:focus, select:focus { border-color: #ffffff; background: rgba(255, 255, 255, 0.1); }
        
        select option { background: #121212; color: #fff; padding: 10px; }

        .image-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; overflow-y: auto; padding-right: 5px; min-height: 0; flex: 1; margin-bottom: 1rem; align-content: start; }
        .image-item { width: 100%; aspect-ratio: 16 / 9; background: rgba(255, 255, 255, 0.05); border-radius: 6px; overflow: hidden; cursor: pointer; border: 2px solid transparent; transition: all 0.2s; position: relative; display: flex; align-items: center; justify-content: center; }
        .image-item:hover, .image-item.active { border-color: #ffffff; box-shadow: 0 0 15px rgba(255, 255, 255, 0.3); }
        .image-item img { width: 100%; height: 100%; object-fit: contain; display: block; }
        
        .main-pane { width: 60%; padding: 2rem; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #0a0a0a; overflow: hidden; position: relative; }
        .canvas-container { max-width: 100%; max-height: 100%; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; overflow: hidden; background: #000; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); }
        canvas { display: block; max-width: 100%; max-height: calc(100vh - 200px); object-fit: contain; }

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
    </style>
</head>
<body>
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
    </header>

    <div class="workspace">
        <!-- LEFT SIDEBAR: Search -->
        <div class="sidebar">
            <div class="sidebar-section">
                <h3>1. Search Image</h3>
                <input type="text" id="search-input" placeholder="e.g., cyberpunk city" onkeydown="if(event.key === 'Enter') searchImages(true)">
                <button class="btn" onclick="searchImages(true)" id="search-btn">Search Unsplash</button>
            </div>
            <div class="sidebar-section" style="flex: 1; overflow: hidden; display: flex; flex-direction: column;">
                <h3>Results</h3>
                <div class="image-grid" id="image-grid">
                    <!-- Images will be rendered here -->
                </div>
                <button class="btn btn-outline" onclick="searchImages(false)" id="load-more-btn" style="display: none;">Fetch New Set</button>
            </div>
        </div>

        <!-- MAIN PANE: Canvas -->
        <div class="main-pane">
            <div class="canvas-container">
                <canvas id="canvas"></canvas>
            </div>
        </div>

        <!-- RIGHT SIDEBAR: Editor -->
        <div class="sidebar">
            <div class="sidebar-section">
                <h3>2. Editor</h3>
                
                <label style="font-size: 0.7rem; color: var(--text-dim); margin-bottom: 5px; display: block; text-transform: uppercase;">Dark Wash (<span id="wash-val">0</span>%)</label>
                <input type="range" id="dark-wash" min="0" max="100" value="0" style="width: 100%; margin-bottom: 1.5rem; accent-color: #ffffff;" oninput="document.getElementById('wash-val').innerText = this.value; renderCanvas()">
                
                <h3 style="margin-top: 1.5rem;">Typography</h3>
                <input type="text" id="text-overlay" placeholder="Overlay Text" oninput="renderCanvas()">
                
                <select id="font-family" onchange="renderCanvas()">
                    <option value="'Bitcount Prop Double'">Bitcount Prop Double</option>
                    <option value="'JetBrains Mono'">JetBrains Mono</option>
                    <option value="'Outfit'">Outfit (Google Sans)</option>
                    <option value="'Inter'">Inter (Sans)</option>
                    <option value="'Oswald'">Oswald (Bold)</option>
                    <option value="'Playfair Display'">Playfair (Elegant)</option>
                </select>

                <label style="font-size: 0.7rem; color: var(--text-dim); margin-bottom: 5px; display: block; text-transform: uppercase;">Font Size (<span id="font-size-val">120</span>px)</label>
                <input type="range" id="font-size" min="10" max="400" value="120" style="width: 100%; margin-bottom: 1.5rem; accent-color: #ffffff;" oninput="document.getElementById('font-size-val').innerText = this.value; renderCanvas()">

                <label style="font-size: 0.7rem; color: var(--text-dim); margin-bottom: 5px; display: block; text-transform: uppercase;">Position X (<span id="text-x-val">50</span>%)</label>
                <input type="range" id="text-x" min="0" max="100" value="50" style="width: 100%; margin-bottom: 1rem; accent-color: #ffffff;" oninput="document.getElementById('text-x-val').innerText = this.value; renderCanvas()">
                
                <label style="font-size: 0.7rem; color: var(--text-dim); margin-bottom: 5px; display: block; text-transform: uppercase;">Position Y (<span id="text-y-val">50</span>%)</label>
                <input type="range" id="text-y" min="0" max="100" value="50" style="width: 100%; margin-bottom: 1.5rem; accent-color: #ffffff;" oninput="document.getElementById('text-y-val').innerText = this.value; renderCanvas()">

                <h3 style="margin-top: 1.5rem;">Dimensions</h3>
                <div style="display: flex; gap: 10px; margin-bottom: 1.5rem;">
                    <input type="number" id="img-width" value="1920" placeholder="Width" oninput="updateImageBuffer(); renderCanvas()">
                    <input type="number" id="img-height" value="1080" placeholder="Height" oninput="updateImageBuffer(); renderCanvas()">
                </div>
                
                <button class="btn" onclick="downloadImage()" id="download-btn" disabled>Download WEBP</button>
            </div>
        </div>
    </div>

    <script>
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const offscreenCanvas = document.createElement('canvas');
        const offCtx = offscreenCanvas.getContext('2d');
        
        let currentImage = null;
        let currentPage = 1;
        let currentQuery = '';
        const tinyCache = {}; // Global cache for pre-fetched tiny images

        // Default to a blank 1920x1080 canvas
        canvas.width = 1920;
        canvas.height = 1080;
        updateImageBuffer(); // Initialize empty buffer
        renderCanvas();

        async function searchImages(isNewSearch = false) {
            const input = document.getElementById('search-input').value;
            if (!input) return;

            const btn = document.getElementById('search-btn');
            const loadMoreBtn = document.getElementById('load-more-btn');
            
            if (isNewSearch) {
                currentPage = 1;
                currentQuery = input;
                btn.innerText = 'Searching...';
                btn.disabled = true;
            } else {
                currentPage++;
                loadMoreBtn.innerText = 'Fetching...';
                loadMoreBtn.disabled = true;
            }
            
            try {
                const res = await fetch('/picasso/search?q=' + encodeURIComponent(currentQuery) + '&p=' + currentPage);
                
                if (res.ok) {
                    const data = await res.json();
                    renderGrid(data.images, true); // Always replace for clean results
                    loadMoreBtn.style.display = 'block';
                } else {
                    const data = await res.json();
                    alert(data.error || 'Search failed');
                }
            } catch (err) {
                alert('Network error');
            } finally {
                btn.innerText = 'Search Unsplash';
                btn.disabled = false;
                loadMoreBtn.innerText = 'Fetch New Set';
                loadMoreBtn.disabled = false;
            }
        }

        function renderGrid(images, replace = true) {
            const grid = document.getElementById('image-grid');
            if (replace) grid.innerHTML = '';
            
            images.forEach(img => {
                // Pre-fetch tiny version immediately
                const tinyImg = new Image();
                tinyImg.crossOrigin = "anonymous";
                tinyImg.src = img.tiny;
                tinyCache[img.id] = tinyImg;

                const item = document.createElement('div');
                item.className = 'image-item';
                item.onclick = () => {
                    document.querySelectorAll('.image-item').forEach(el => el.classList.remove('active'));
                    item.classList.add('active');
                    loadImage(img.id, img.url, img.preview); // Passing ID for Tier 0
                };
                
                const imgEl = document.createElement('img');
                imgEl.src = img.thumb;
                imgEl.alt = img.alt || 'Unsplash image';
                imgEl.loading = 'lazy';
                imgEl.decoding = 'async';
                
                item.appendChild(imgEl);
                grid.appendChild(item);
            });
        }

        function loadImage(id, url, previewUrl) {
            const btn = document.getElementById('download-btn');
            btn.disabled = true;
            btn.innerText = 'FORGING...';
            
            // Tier 0: Check if tiny image is already in pre-fetch cache
            if (tinyCache[id] && tinyCache[id].complete) {
                currentImage = tinyCache[id];
                updateImageBuffer();
                renderCanvas();
                btn.innerText = 'PREVIEWING...';
            }

            // Tier 1: Load Low-Res Preview
            const previewImg = new Image();
            previewImg.crossOrigin = "anonymous";
            previewImg.onload = () => {
                // Only replace if we haven't already loaded the master
                if (currentImage === null || currentImage.src !== url) {
                    currentImage = previewImg;
                    updateImageBuffer();
                    renderCanvas();
                    btn.disabled = false;
                    btn.innerText = 'FORGING MASTER...';
                }
            };
            previewImg.src = previewUrl;

            // Tier 2: Load High-Res Master
            const masterImg = new Image();
            masterImg.crossOrigin = "anonymous";
            masterImg.onload = () => {
                currentImage = masterImg;
                updateImageBuffer();
                btn.disabled = false;
                btn.innerText = 'Download WEBP';
                renderCanvas();
            };
            masterImg.src = url; 
        }

        function updateImageBuffer() {
            const wInput = parseInt(document.getElementById('img-width').value) || 1920;
            const hInput = parseInt(document.getElementById('img-height').value) || 1080;
            
            offscreenCanvas.width = wInput;
            offscreenCanvas.height = hInput;

            if (currentImage) {
                // Object cover logic for offscreen buffer
                const imgRatio = currentImage.width / currentImage.height;
                const canvasRatio = wInput / hInput;
                let drawW, drawH, dx, dy;

                if (imgRatio > canvasRatio) {
                    drawH = hInput;
                    drawW = currentImage.width * (hInput / currentImage.height);
                    dx = (wInput - drawW) / 2;
                    dy = 0;
                } else {
                    drawW = wInput;
                    drawH = currentImage.height * (wInput / currentImage.width);
                    dx = 0;
                    dy = (hInput - drawH) / 2;
                }
                offCtx.drawImage(currentImage, dx, dy, drawW, drawH);
            } else {
                offCtx.fillStyle = '#111';
                offCtx.fillRect(0, 0, wInput, hInput);
            }
        }

        function renderCanvas() {
            const wInput = parseInt(document.getElementById('img-width').value) || 1920;
            const hInput = parseInt(document.getElementById('img-height').value) || 1080;
            const text = document.getElementById('text-overlay').value;

            canvas.width = wInput;
            canvas.height = hInput;

            // Blit the pre-calculated buffer
            ctx.drawImage(offscreenCanvas, 0, 0);

            // Dark Wash Overlay
            const washValue = parseInt(document.getElementById('dark-wash').value) || 0;
            if (washValue > 0) {
                ctx.fillStyle = 'rgba(0, 0, 0, ' + (washValue / 100) + ')';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            // Draw Text
            if (text) {
                const fontFamily = document.getElementById('font-family').value;
                const fontSize = parseInt(document.getElementById('font-size').value) || 120;
                const posXPercent = parseInt(document.getElementById('text-x').value) || 50;
                const posYPercent = parseInt(document.getElementById('text-y').value) || 50;

                ctx.font = fontSize + 'px ' + fontFamily + ', sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                // Add a slight dark shadow for readability
                ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
                ctx.shadowBlur = 15;
                ctx.lineWidth = 0; // Removed stroke

                const posX = (wInput * posXPercent) / 100;
                const posY = (hInput * posYPercent) / 100;

                ctx.fillStyle = "white";
                ctx.fillText(text, posX, posY);

                // Reset shadow
                ctx.shadowBlur = 0;
            }
        }

        function downloadImage() {
            if (!currentImage) return;
            const dataUrl = canvas.toDataURL('image/webp', 0.9);
            const a = document.createElement('a');
            a.href = dataUrl;
            a.download = 'punchy-picasso-' + Date.now() + '.webp';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    </script>
</body>
</html>`;