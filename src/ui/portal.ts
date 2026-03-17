/**
 * PUNCHY.ME Ecosystem Portal (The Fast-Switcher)
 * Standalone module for global tactical navigation.
 * Protocol: Update once, use everywhere.
 */

export const PUNCHY_PORTAL_HTML = `
    <!-- ECOSYSTEM PORTAL -->
    <style>
        .punchy-portal {
            position: fixed !important; bottom: 24px !important; right: 24px !important; 
            display: flex !important; flex-direction: row-reverse !important; align-items: center !important;
            background: rgba(0, 0, 0, 0.85) !important; backdrop-filter: blur(24px) !important; 
            border: 1px solid rgba(34, 197, 94, 0.2) !important;
            border-radius: 12px !important; padding: 8px !important; gap: 0 !important; overflow: hidden !important;
            width: auto !important; max-width: 44px !important; height: 44px !important;
            transition: max-width 0.4s cubic-bezier(0.4, 0, 0.2, 1), gap 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease, box-shadow 0.3s ease !important;
            z-index: 9999 !important; text-decoration: none !important; font-size: 16px !important;
            box-sizing: border-box !important;
        }
        .punchy-portal:hover { max-width: 600px !important; gap: 16px !important; border-color: #22c55e !important; box-shadow: 0 0 20px rgba(34, 197, 94, 0.2) !important; }
        
        .portal-trigger { 
            font-size: 19px !important; min-width: 28px !important; text-align: center !important; display: flex !important; align-items: center !important; justify-content: center !important; 
            text-decoration: none !important; color: #fff !important; transition: transform 0.3s ease !important;
            margin: 0 !important; padding: 0 !important; flex-shrink: 0 !important;
        }
        .punchy-portal:hover .portal-trigger { transform: rotate(15deg); }

        .portal-brand { 
            color: #22c55e !important; font-weight: 700 !important; font-size: 13px !important; white-space: nowrap !important; opacity: 0 !important; 
            transition: opacity 0.3s ease !important; font-family: 'JetBrains Mono', monospace !important; 
            pointer-events: none !important; margin: 0 !important; padding: 0 !important;
        }
        .punchy-portal:hover .portal-brand { opacity: 1 !important; }

        .portal-tools { 
            display: flex !important; gap: 13px !important; opacity: 0 !important; transition: opacity 0.3s ease !important;
            margin: 0 !important; padding: 0 !important;
        }
        .punchy-portal:hover .portal-tools { opacity: 1 !important; }

        .portal-tool-link { 
            text-decoration: none !important; font-size: 18px !important; transition: transform 0.2s ease !important; 
            filter: grayscale(1) !important; display: block !important; width: auto !important; height: auto !important;
            margin: 0 !important; padding: 0 !important; line-height: 1 !important;
        }
        .portal-tool-link:hover { transform: scale(1.3) !important; filter: grayscale(0) !important; }

        @media screen and (max-width: 1024px), screen and (max-height: 500px) {
            .punchy-portal { display: none !important; pointer-events: none !important; opacity: 0 !important; }
        }

        @media print {
            .punchy-portal { display: none !important; }
        }
    </style>

    <div class="punchy-portal">
        <a href="/" class="portal-trigger" title="GO HOME">⚡</a>
        <div class="portal-brand">PUNCHY.ME</div>
        <div class="portal-tools">
            <a href="/bazuka" class="portal-tool-link" title="BAZUKA">👤</a>
            <a href="/anakin" class="portal-tool-link" title="ANAKIN">🪨</a>
            <a href="/musashi" class="portal-tool-link" title="MUSASHI">⚔️</a>
            <a href="/odin" class="portal-tool-link" title="ODIN">🐦‍⬛</a>
            <a href="/yaiba" class="portal-tool-link" title="YAIBA">✒️</a>
            <a href="/ragnar" class="portal-tool-link" title="RAGNAR">🛡️</a>
            <a href="/freya" class="portal-tool-link" title="FREYA">🌠</a>
            <a href="/thor" class="portal-tool-link" title="THOR">⚡</a>
            <a href="/poll" class="portal-tool-link" title="POLL PUNCH">🗳️</a>
            <a href="/ares" class="portal-tool-link" title="ARES">🎯</a>
            <a href="/marcus" class="portal-tool-link" title="MARCUS">📊</a>
            <a href="/asgard" class="portal-tool-link" title="ASGARD">🌌</a>
        </div>
    </div>
`;
