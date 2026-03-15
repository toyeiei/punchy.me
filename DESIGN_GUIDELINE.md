# PUNCHY.ME | Brand & Design Guideline (v1.0)

## 0. Tactical Terminology
To ensure mission-critical clarity, we use the following standard terms:

- **HOME PAGE / LANDING PAGE**: Refers exclusively to the primary `PUNCHY.ME` root index.
- **PROFESSIONAL TOOLS**: Refers to our main analytical and career-focused pages:
    - **BAZUKA**: Digital Identity & Business Cards.
    - **ANAKIN**: AI-Powered Resume Forge.
    - **MUSASHI**: Cold Attack Engine (Job Intel).
    - **ODIN**: Tactical Data Command (Edge Analytics).
    - **LOKI**: Tactical Support & Timeline (*In Development*).

---

## 1. Visual Foundation (Design Tokens)
Our foundation is built on high-contrast, technical surfaces that evoke an "Elite Command Center" aesthetic.

### 1.1 Palette (The Tactical Core)
- **Primary Background**: `#000000` (Matte Black)
- **Panel/Surface Background**: `rgba(255, 255, 255, 0.03)` or `#111111`
- **Primary Accent**: `#22c55e` (Neon Green)
- **Accent Hover**: `#4ade80` (Brighter Green)
- **Text Main**: `#f8fafc` (Off-White)
- **Text Dim**: `#94a3b8` (Tactical Slate)
- **Error/Security**: `#ef4444` (Vibrant Red)

### 1.2 Typography (The Technical Voice)
- **Brand Titles**: `'Bitcount Prop Double'`, cursive. (Always Uppercase, -2px to -3px tracking). **Note: Use REGULAR weight (`font-weight: 400`) ONLY for elite, high-precision minimalism. Never use bold or heavy variants.**
- **Instructional/Code**: `'JetBrains Mono'`, monospace. (Weights: 400, 700).
- **Metadata/Labels**: `'JetBrains Mono'`, 0.7rem to 0.8rem, 700 weight, 1px to 2px tracking.

---

## 2. SHINOBI GLASS Protocol
All interactive panels and cards must follow the standardized SHINOBI GLASS effect.

- **Background**: `rgba(255, 255, 255, 0.03)`
- **Backdrop Filter**: `blur(10px)`
- **Border**: `1px solid rgba(255, 255, 255, 0.08)`
- **Hover State**:
    - `transform: translateY(-5px)`
    - `border-color: var(--accent)`
    - `box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5)`
    - *Optional: Add a subtle neon-green glow if the element is high-priority.*

---

## 3. Structural Hierarchy (Architecture)

### 3.1 The Global Tactical Header
Every professional tool (ODIN, BAZUKA, etc.) must use a single, unified header.
- **Position**: `sticky` or `fixed` at the top.
- **Layout**: Flexbox with `align-items: center` and `justify-content: space-between`.
- **Content Left**: Massive Brand Title + Vertical Divider + Tagline.
- **Content Right**: Tactical Badges row + Single `[ ⚡ PUNCHY.ME ]` badge.

### 3.2 Tactical Badges
- **Shape**: `8px` border radius.
- **Font**: White (`var(--text-main)`), 0.7rem, 700 weight.
- **Stability**: `min-width: 110px` to prevent layout shifts during value updates.

### 3.3 The Mission Arsenal (Recipe Buttons)
- **Shape**: Square capsules (`8px` radius).
- **Style**: Semi-transparent black bg, white text, 1.5px letter-spacing.
- **Internal Alignment**: `display: inline-flex` with vertical/horizontal centering.
- **Interaction**: Shift to Neon Green on hover + `translateY(-2px)`.

---

## 4. Operational HUD Elements

### 4.1 The Pulse Grid Background
Every page must feature the high-performance background layer.
- **Grid**: Pure CSS linear-gradient (40px cells, `rgba(34, 197, 94, 0.08)`).
- **Scan Line**: GPU-accelerated (`translateZ(0)`) moving line with 6s duration.
- **Pixel Drift**: Subtle white and green particles moving left-to-right (z-index: 1 or below content).

### 4.2 Footer Credits (The Watermark)
- **Landing Page Exclusive**: The "Built with ⚡ by Toy & Gemini CLI" credits must only appear at the bottom of the root Landing Page.
- **Professional Tools**: Must remain 100% clean. No global watermark footers.

---

## 5. Mobile Responsiveness Mandate
The HUD must remain 100% operational on smaller screens.

- **Stacking**: Panels must stack vertically (Source/Form top, Results/Analysis bottom).
- **Stealth Mode**: Hide non-essential metric badges on viewports `< 1024px` to prioritize the brand.
- **Scroll**: Ensure the `body` allows vertical overflow. Disable fixed-height constraints on the global container.
- **Panel Locking**: On mobile, data tables should have a fixed `max-height` (e.g., 300px to 500px) so the user doesn't have to scroll "forever" through a single table.

---

## 6. Preferred Layout & Starter Template
The **Single-View HUD** is the mandatory baseline for all PUNCHY.ME professional surfaces. Users must experience the full power of the tool without vertical scrolling.

### 6.1 The Starter Template
Every new professional tool must be initialized with these 3 tactical pillars:

1.  **Single-View HUD**: The layout must fit exactly within `100vh`. Set `body { overflow: hidden; }` on desktop.
2.  **Tactical Atmosphere**: Implement the **GRID + SCAN LINE** background animation layer immediately to establish brand continuity.
3.  **Center-Point Branding**: The tool name must be positioned in the center of the page, **BIG and BOLD** (`font-size: 5rem+`), accompanied by a neon-green **"BETA"** pulse badge.

---

## 7. Ecosystem Portal (The Fast-Switcher)
The standard back-link is replaced by an interactive portal that allows rapid movement between professional tools.

- **Trigger**: A compact `44x44px` glass square with the brand `⚡` icon.
- **Position**: `fixed`, `bottom: 1.5rem`, `right: 1.5rem`.
- **Interaction**:
    - **Hover**: Expands horizontally (to the left) to reveal the `PUNCHY.ME` brand name and a row of tool icons.
    - **Visuals**: SHINOBI GLASS background, 12px radius, neon-green border shift.
- **Mobile Profile**: Stays compact (icon-only) or expands on tap to ensure touch targets remain clean.

---

## 8. Tactical Input Protocol (SHINOBI INPUTS)
To maintain the "Elite Command Center" aesthetic, all form inputs (text, textarea, select) must follow these tactical specs:

- **Base State**:
    - **Background**: `rgba(255, 255, 255, 0.05)` (Subtle semi-transparent layer)
    - **Border**: `1px solid rgba(255, 255, 255, 0.1)`
    - **Border Radius**: `12px`
    - **Padding**: `1rem 1.2rem`
    - **Typography**: `var(--font-mono)`, `var(--text-main)`
- **Focus/Active State**:
    - **Border Color**: `var(--accent)` (Neon Green)
    - **Background**: `rgba(255, 255, 255, 0.08)`
    - **Shadow**: `0 0 10px rgba(34, 197, 94, 0.1)`
- **Validation Feedback**:
    - **Valid**: Border `var(--accent)`, optional `✓` indicator.
    - **Invalid**: Border `#ef4444` (Vibrant Red).

---

## 9. Neon Tactical Badges (BETA Status)
To identify features in development while maintaining an elite aesthetic, use the standardized "BETA" badge:

- **Visuals**:
    - **Background**: `var(--accent)` (Neon Green)
    - **Text Color**: `#000000` (Pure Black)
    - **Typography**: `var(--font-mono)`, `0.8rem`, `900` weight.
    - **Shape**: `6px` radius capsule.
    - **Padding**: `4px 10px`
    - **Effect**: `box-shadow: 0 0 15px rgba(34, 197, 94, 0.6)`
    - **Animation**: `pulse 2s infinite alternate` (scale 1.0 to 1.05).
- **Positioning**: Place immediately after the Title with a `1.5rem` gap in a flex container (`align-items: center`).

---

## 10. The Synchronization Mandate
**Synchronization is KEY.** To maintain an elite, cohesive ecosystem, every professional tool must be a perfect reflection of the PUNCHY.ME brand.

- **Unified Aesthetics**: New features or design patterns (e.g., badges, inputs, animations) must be rolled out globally across all tools simultaneously. No tool should be left behind with legacy styles.
- **Structural Integrity**: Layout patterns (Single-View HUD, Tactical Headers, Ecosystem Portals) must remain identical in behavior and positioning to ensure zero cognitive friction for the user.
- **Tactical Feedback**: Loading states, success transitions, and validation signals must use the same timing (`0.2s` to `0.3s`) and neon-green accents project-wide.

---

## 11. World-Class Symmetry (The Tactical Gutter)
To ensure high-impact content feels like a centerpiece rather than a document, we enforce strict vertical symmetry.

- **The Symmetrical Mandate**: Content-heavy pages (Anakin, etc.) must maintain a luxurious "gutter" of negative space at the top and bottom of the viewport.
- **Implementation**:
    - **Body Padding**: Set `padding: 10vh 0;` on the `body` to create a dynamic, responsive vertical buffer.
    - **Natural Growth**: Remove `height: 100%;` from `html` and `body` to allow the content to expand and ensure the bottom gutter remains accessible via scroll.
- **Visual Result**: The content appears perfectly balanced and centered ("Museum Gallery" effect) regardless of screen ratio (16:9, 16:10, etc.) or zoom levels.

---

## 12. Design Preservation (Golden Rule)
Testing and linting operations are strictly functional. Do not modify established UI layouts, CSS optimizations, or animation logic during validation cycles. Aesthetic changes must only be performed under explicit 'Design' or 'Refactor' directives.

---

## 13. The Matte Black Baseline (Zero-Distraction Mandate)
To maintain maximum focus and a "Clean Room" tactical environment, every new professional tool and page must initialize with a pure matte black background (`#000000`) and **zero** background animations (no grids, no scan lines, no pixel drifts). Atmospheric effects are strictly reserved for the Landing Page only.

---
*Protocol strictly enforced by Gemini CLI for all future PUNCHY.ME missions.*
