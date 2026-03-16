/**
 * PUNCHY.ME Ecosystem Portal (The Fast-Switcher)
 * Standalone module for global tactical navigation.
 * Protocol: Update once, use everywhere.
 */

export const PUNCHY_PORTAL_HTML = `
    <!-- ECOSYSTEM PORTAL -->
    <style>
        .punchy-portal {
            position: fixed; bottom: 1.5rem; right: 1.5rem; display: flex; flex-direction: row-reverse; align-items: center; 
            background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(10px); border: 1px solid rgba(34, 197, 94, 0.2); 
            border-radius: 12px; padding: 0.5rem; gap: 0; overflow: hidden; width: 44px; height: 44px; 
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); z-index: 1000; cursor: pointer; text-decoration: none;
        }
        .punchy-portal:hover { width: 380px; gap: 1rem; border-color: #22c55e; box-shadow: 0 0 20px rgba(34, 197, 94, 0.2); }
        .portal-trigger { font-size: 1.2rem; min-width: 28px; text-align: center; display: flex; align-items: center; justify-content: center; }
        .portal-brand { color: #22c55e; font-weight: 700; font-size: 0.8rem; white-space: nowrap; opacity: 0; transition: opacity 0.3s ease; font-family: 'JetBrains Mono', monospace; }
        .punchy-portal:hover .portal-brand { opacity: 1; }
        .portal-tools { display: flex; gap: 0.8rem; opacity: 0; transition: opacity 0.3s ease; }
        .punchy-portal:hover .portal-tools { opacity: 1; }
        .portal-tool-link { text-decoration: none; font-size: 1.1rem; transition: transform 0.2s ease; filter: grayscale(1); }
        .portal-tool-link:hover { transform: scale(1.3); filter: grayscale(0); }
        
        @media (max-width: 1024px) {
            .punchy-portal { display: none !important; }
        }
    </style>

    <a href="/" class="punchy-portal">
        <div class="portal-trigger">⚡</div>
        <div class="portal-brand">PUNCHY.ME</div>
        <div class="portal-tools">
            <object><a href="/bazuka" class="portal-tool-link" title="BAZUKA">👤</a></object>
            <object><a href="/anakin" class="portal-tool-link" title="ANAKIN">⚡</a></object>
            <object><a href="/musashi" class="portal-tool-link" title="MUSASHI">⚔️</a></object>
            <object><a href="/odin" class="portal-tool-link" title="ODIN">🐦‍⬛</a></object>
            <object><a href="/yaiba" class="portal-tool-link" title="YAIBA">✒️</a></object>
            <object><a href="/freya" class="portal-tool-link" title="FREYA">🌠</a></object>
        </div>
    </a>
`;
