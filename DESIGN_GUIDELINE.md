# PUNCHY.ME | Brand & Design Guideline (v1.0)

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
- **Brand Titles**: `'Bitcount Prop Double'`, cursive. (Always Uppercase, -2px to -3px tracking).
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
- **Grid**: Pure CSS linear-gradient (40px cells).
- **Scan Line**: GPU-accelerated (`translateZ(0)`) moving line with 6s duration.
- **Pixel Drift**: Subtle white and green particles moving left-to-right (z-index: 1 or below content).

### 4.2 Footer Credits (The Watermark)
- **Position**: **Content-Bottom**. Never fixed to the screen. It must sit at the absolute end of the scrollable content.
- **Opacity**: `0.5`.
- **Text**: "Built with ⚡ by Toy & Gemini CLI".

---

## 5. Mobile Responsiveness Mandate
The HUD must remain 100% operational on smaller screens.

- **Stacking**: Panels must stack vertically (Source/Form top, Results/Analysis bottom).
- **Stealth Mode**: Hide non-essential metric badges on viewports `< 1024px` to prioritize the brand.
- **Scroll**: Ensure the `body` allows vertical overflow. Disable fixed-height constraints on the global container.
- **Panel Locking**: On mobile, data tables should have a fixed `max-height` (e.g., 300px to 500px) so the user doesn't have to scroll "forever" through a single table.

---
*Protocol strictly enforced by Gemini CLI for all future PUNCHY.ME missions.*
