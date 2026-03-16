# PUNCHY.ME - URL Shortener Project

## Objective
To build a high-performance, visually striking, and reliable URL shortening service using Cloudflare Workers and KV storage. The service must be modern, responsive, and maintainable.

## Engineering Philosophy
"This is our way. This is the only way to create great software."
- **MIYAMOTO MUSASHI Strategy**: One feature at a time. Total focus. We tackle one mission until it is perfected before moving to the next.
- **Update Once, Use Everywhere**: We prioritize extreme modularization. High-impact UI elements (like the Ecosystem Portal) must be isolated into standalone modules to ensure global consistency and zero maintenance friction.
- **Speed & Simplicity**: Speed is our priority, simplicity is in our blood. Elegant solutions are stronger than complex ones.
- **Reliability & Strength**: We forge things that are strong and consistent. We build systems that aren't easily broken.
- **TDD (Test-Driven Development) First**: No code without a failing test case. We build with confidence by writing tests before code.
- **Occam's Razor**: Simple is better than complex. We prioritize the simplest solution that reliably solves the problem.
- **High Quality**: We never settle for "good enough." Every line of code must meet senior-level standards.
- **Design Regression Integrity**: When forging new features, we perform rigorous regression tests. We ensure that not only is the logic functional, but the **UI Design and Brand Aesthetic** remain perfectly intact and unbroken across all tools.
- **Continuous Validation**: We test, lint, and refactor relentlessly. Validation is the only path to finality.
- **Surgical Precision**: We make targeted, clean updates to maintain system integrity and avoid technical debt.
- **Mechanical Sympathy**: Design software that respects the physical and distributed constraints of the hardware (e.g., KV eventual consistency, mobile keyboards).
- **Tool-First HUD**: Prioritize a clean, tactical interface that reduces cognitive load.

## The PUNCHY.ME Edge Protocol (Zero Regression Workflow)
To guarantee **Zero Regression Failure** while building high-velocity Edge applications, we adopt an elite, militaristic engineering workflow. Whenever we build a new feature (let's call it "Feature X"), we execute this exact sequence:

1.  **Phase 1: The Blueprint (Strategic Alignment)**
    *   State explicitly which files will be touched (e.g., `src/handlers/feature_x.ts`, `src/index.ts`).
    *   Define the exact KV structure or AI prompt required.
    *   Identify the potential impact on existing systems.
    *   *We do not proceed until the blueprint is approved.*
2.  **Phase 2: The Vanguard (Test-Driven Infrastructure)**
    *   Write the complete test suite for Feature X in `src/index.test.ts` **first**.
    *   Run the tests. The new tests *must fail*, but the **core tests MUST remain green**. This proves our baseline is untouched.
3.  **Phase 3: The Isolated Forge (Implementation)**
    *   Create `src/handlers/feature_x.ts` and build the core engine.
    *   Build the UI in `src/ui/feature_x.ts` adhering strictly to our "Matte Black Baseline" and "SHINOBI GLASS" aesthetic.
    *   Surgically wire the endpoint into the `src/index.ts` router.
4.  **Phase 4: The Crucible (Exhaustive Validation)**
    *   Execute the full test suite (`npm test`). We do not proceed unless it hits 100%.
    *   Execute strict Type-Checking (`npx tsc --noEmit`) and Linting (`npm run lint`).
    *   Execute `wrangler deploy --dry-run` to ensure the Edge bundle compiles perfectly.
    *   Boot the local server (`npm run dev`) for manual UI verification.
5.  **Phase 5: The Seal (Atomic Commits)**
    *   Once validation is 100% clean, bundle the feature into a single, highly descriptive atomic commit.

## Core Principles

### 1. Communication Framework (The OCC Method)
To ensure surgical precision and avoid scope creep, all major directives should follow the **Objective + Context + Constraint** framework:
*   **Objective**: What is the ultimate goal? (e.g., "Implement Custom Slugs")
*   **Context**: Where does this apply? (e.g., "Only for BAZUKA card generation")
*   **Constraint**: What are the boundaries? (e.g., "Slugs must be alphanumeric, min 4 chars, and not break existing redirection logic")

### 2. The "Definition of Done" (DoD)
A task is only considered complete when:
1.  **Code Quality**: `npm run lint` and `npx tsc --noEmit` return zero errors.
2.  **Verification**: All related tests in `npm test` pass with 100% reliability.
3.  **Documentation**: `GEMINI.md` and `IMPLEMENTATION_LOG.md` are updated.
4.  **SEO Readiness**: Every new page must have complete metadata (Open Graph, Twitter Cards), JSON-LD Schema, and be explicitly included in the `sitemap.xml` before deployment.
5.  **Deployment**: Production state is synchronized and verified.

### 3. Architectural Decision Records (ADR)
Before implementing complex roadmap items (e.g., MUSASHI blades), demand **Technical Trade-offs**:
- Ask for 3 implementation paths.
- Evaluate the Pros/Cons of each (Speed vs. Complexity vs. Cost).

## Approach
- **Research:** Map the codebase and validate assumptions through empirical data.
- **Strategy:** Formulate grounded, step-by-step plans for every implementation.
- **Execution:** Iterate through a **Plan -> Act -> Validate** cycle for every sub-task.

## Problem Solving
1. **Empirical Reproduction:** We confirm issues by creating reproduction scripts or tests before applying fixes.
2. **Surgical Updates:** We apply precise, targeted changes to maintain system integrity.
3. **Continuous Validation:** Success is only confirmed when behavioral correctness is verified and structural integrity is confirmed within the full project context.

## CLI & Environment
- **Command Separation**: Use `&&` to chain commands (WSL Ubuntu/Bash support). The project has transitioned to a Linux-based workflow.
- **Verbose Testing**: Use `npx vitest run --reporter=verbose` to debug hanging tests or detailed execution flow. This is the primary method for identifying bottlenecks in AI or Rate-Limiting suites.

## Deployment Protocol
- **Explicit Approval**: NEVER deploy automatically (e.g., `wrangler deploy` or `npm run deploy`). You MUST ask for explicit user permission before every deployment to production.
- **Progress Tracking**: Update `GEMINI.md` with our latest progress and architectural changes every time we deploy a new version of the application.

## Roadmap (Planned High-Impact Features)
- **MUSASHI | The Strategic Weapon**:
    - **Dual-Blade Portfolio Hub**: A unified tactical dashboard showcasing dual career paths side-by-side (linking Shortener, BAZUKA, and ANAKIN).
    - **Cold Attack Engine**: AI-powered outreach strategist that surgically crafts LinkedIn hooks based on job descriptions and resumes.
    - **Edge Tactical Analytics**: Real-time world-map visualization of views, devices, and recruiter engagement.
- **Edge Analytics & Click Tracking**: Track real-time engagement metrics using Cloudflare's high-performance data plane.
- **Custom Alias (Slug) Support**: Empower users to create branded, memorable short links.
- **QR Code Generation**: Instantly generate visually matching QR codes for every shortened link.
- **Expiry Management**: Add the ability to set time-to-live (TTL) for temporary links.

## Design Philosophy
- **Cyber-Tactical Aesthetic**: We prioritize dark, high-contrast themes (Matte Black + Neon Green) to maintain brand cohesion and reduce visual strain. Digital surfaces should feel like a 'Tactical HUD'.
- **Seamless Transitions**: While the digital experience is dark and immersive, the printed output must always be high-contrast black-on-white for recruiter accessibility.
- **Ecosystem Discovery (Command Center)**: We avoid traditional navigation menus. Instead, we use 'Tactical Feature Cards' positioned directly below the primary tool to encourage exploration while maintaining a 'tool-first' interface.
- **Design Language System (SHINOBI GLASS)**: Standardized card/panel effect for the PUNCHY.ME ecosystem:
    *   **Base**: Semi-transparent background (`rgba(255, 255, 255, 0.03)`).
    *   **Blur**: `backdrop-filter: blur(10px)` for glassmorphism.
    *   **Border**: 1px thin stealth border (`rgba(255, 255, 255, 0.08)`).
    *   **Hover**: Interactive `var(--accent)` border-glow (no vertical lift).
- **Design Revamp Prohibition (The Golden Rule)**: When executing 'test' or 'lint' directives, engineers MUST focus exclusively on behavioral verification and code quality (syntax, types). Revamping UI design, layout, or aesthetic optimizations during these phases is STRICTLY PROHIBITED to prevent regressions in UX performance and brand integrity. Validation cycles are for testing, not for unsolicited "cleanups" of design logic.

## Architectural Safeguards

### 1. Tool-Specific Safety Protocols (Anti-Bug Mandates)
To maintain world-class speed, we must bypass recurring tool limitations:
- **Nested Template Literal Bug**: `write_file` and `replace` erroneously escape backticks (e.g., \`;) in nested templates. **NEVER** use nested backticks. Use single quotes and string concatenation (`' + var + '`) for inner HTML generation. After every UI file write, surgically verify the final 5 lines of the file for escaped backslashes.
- **Context-Locking for Replacements**: Fuzzy matching applies changes to the wrong location. Always provide **3-5 lines of context** in `old_string`. Avoid replacing single lines or generic tags.
- **Immediate Validation**: Small syntax errors compound into large system failures. Run `npm run lint` and `npx tsc --noEmit` immediately after any modification to a `src/ui/` file.

### 2. Strict Template Integrity
We have identified a recurring high-impact bug: **Unterminated Template Literals** in UI files (e.g., `src/ui/anakin.ts`).
- **Symptom:** `HTMLRewriter` returns an empty response (`''`), causing tests to fail with messages like `expected '' to contain 'Anakin Skywalker'`.
- **Root Cause:** Malformed template exports or erroneous backslashes (e.g., \`;) at the end of template strings.
- **Mandate:** After modifying any UI template in `src/ui/`, engineers **MUST** surgically verify the transition points between exported template constants. Use `read_file` or `grep` to confirm that all template literals are properly terminated with a simple backtick (`) and semicolon (;).
- **Validation:** A task is not complete until `npm test` confirms that `HTMLRewriter` is successfully injecting content into the relevant template.

### 3. Strategic Integrity Protocols (Zero-Regression)
To eliminate unpredictable behavior and secondary bugs, the following protocols are MANDATORY:
- **Mandatory Pre-Validation Hook:** After ANY `write_file` or `replace` operation, immediately run a syntax check (`npx tsc --noEmit` or `npm run lint`). Errors MUST be resolved before proceeding.
- **Double-Read Template Integrity:** When modifying UI files, explicitly read the lines *following* the change to verify that termination points and subsequent exports are intact.
- **Full-Suite Regression Mandate:** Any change touching `src/ui/` or `src/index.ts` requires a full test suite execution (`npm test`). Isolated tests are insufficient for global UI integrity.
- **Local Log First:** When the app breaks during local development, the terminal log from `localhost` (Wrangler/Miniflare) is the PRIMARY source of truth. Always check and analyze these logs before attempting a fix.

### 4. Consistency Mitigation (KV Resilience)
Cloudflare KV is eventually consistent. To maintain an "Instant" feel without broken links, we employ a triple-tier strategy:
- **Smart Wait (Frontend):** The result link is "locked" for 1.2s with a visual progress bar. This prevents users from clicking before the data has likely propagated.
- **True Synchronization:** The frontend waits for final ID confirmation from the server and restarts the propagation timer if the ID changed, eliminating race conditions.
- **Double-Lock (Backend):** If a lookup fails, the Worker pauses for 500ms and retries the KV fetch before returning a 404.
- **Optimistic UI:** We generate the short ID client-side to show the result at 0ms, while the actual persistence happens asynchronously in the background.

### 5. Smart Rate Limiting
To prevent abuse while remaining user-friendly, the rate limiter (10 req/min) is strategically positioned:
- **Free Re-Punches:** Deduplication checks happen *after* normalization but *before* the rate limit is incremented. Shortening the same URL multiple times is "free."
- **Strict Normalization:** All URLs are normalized (trailing slashes removed) before deduplication to ensure consistency.
- **IP-Based Tracking:** Requests are tracked via the lowercase `cf-connecting-ip` header for reliable edge identification.

### 6. AI Engine Standards (ANAKIN)
To ensure consistent and high-quality professional narratives, the ANAKIN engine MUST adhere to these standard parameters:
- **Model:** `@cf/meta/llama-3-8b-instruct`
- **Max Tokens:** 250 (Ensures sufficient length for summary and 3 bullets)
- **Temperature:** 0.6 (Balances professional structure with narrative variety)
- **Prompt Structure:** Always use the `[CONTEXT]`, `[DIRECTIVE]`, and `[OUTPUT FORMAT]` blocks for precision.
- **Narrative Constraints:**
    - **Professional Summary:** 20-28 words.
    - **Experience Bullets:** 15-20 words per bullet (Total 3 bullets).
    - **Tone:** Senior-level, action-oriented, and result-focused.

## Progress & Architectural Milestones

### Version 4.9.5 - RAGNAR Mistral 24B Strategic Revolution (2026-03-16)
- **Mistral Small 3.1 24B**: Upgraded the slide forge engine to the superior 24B model for world-class strategic reasoning and JSON reliability.
- **Semantic Dynamic Slides**: Engineered a 4-type dynamic narrative system: `bigtext`, `quote`, `list`, and `comparison`, enabling the AI to forge sophisticated 6-slide strategic arcs.
- **Detailed Intelligence**: Recalibrated the AI prompt to enforce **50+ words per slide**, ensuring substantial, high-value content that impresses users.
- **Zen UI Hardening**: Executed a total UI purge—removing watermarks and download buttons—to achieve a 100% immersive tactical HUD.
- **Aesthetic Mastery**: Integrated the signature **Pixel Drift** and **Animated Grid** background, synchronized with strict `100px 150px` structural padding for global consistency.
- **Reliability Forge**: Modularized the Reveal.js template into `HEADER` and `FOOTER` components to resolve template truncation bugs and ensure 100% build integrity.

### Version 4.9.3 - Phase 4 Final Cleanup (2026-03-16)
- **Code Quality Perfection**: Achieved 100% clean ESLint pass with zero errors and zero warnings across the entire codebase.
- **TypeScript Hardening**: Eradicated all remaining `any` types in security services and handlers.

### Version 4.8.2 - Supreme UI Hardening & TypeScript Mastery (2026-03-16)
- **RAGNAR AI Slide Forge**: Revolutionized the slide generation engine with support for dynamic slide types: `List`, `Quote`, `BigText`, and `Comparison`.
- **Viking Strategic Intelligence**: Upgraded the RAGNAR AI prompt to enforce a mix of tactical slide layouts and powerful, Norse-inspired professional language.
- **Reveal.js HUD Enhancement**: Engineered custom CSS classes for high-impact visual storytelling, including dual-pane comparison grids and cinematic blockquotes.
- **TypeScript Hardening**: Forged `tsconfig.json` and achieved 100% type-safety across the ecosystem, resolving all hidden type mismatches in handlers and tests.
- **ASGARD UI Refactor**: Engineered a robust `loaded-ui` entrance strategy, replacing fragile CSS animations with coordinated class-based transitions.
- **Zen Mode Synchronization**: Perfected the Zen Mode toggle (`Z`), ensuring the greeting and dock slide down and fade out in perfect unison with 0.8s cinematic timing.
- **Spotlight Design Shift**: Transformed the search portal into a premium frosted white aesthetic with a high-contrast dark-mode input system.
- **Cinematic Depth**: Fine-tuned the ASGARD background dim to the "Golden Ratio" of 42% for maximum visual impact.

### Version 4.8.2 - Supreme UI Hardening & TypeScript Mastery (2026-03-16)
- **TypeScript Hardening**: Forged a strict `tsconfig.json` and achieved 100% type-safety across the ecosystem by resolving all hidden type mismatches in handlers and tests.
- **ASGARD Animation Mastery**: Refactored the entire entrance and Zen Mode animation logic using a robust, class-based transition strategy. This eliminates CSS conflicts and ensures the greeting and dock animate in perfect, cinematic unison.
- **Spotlight UI Transformation**: Executed a full design shift for the Spotlight Search, transforming it into a premium "frosted white" portal with a high-contrast, light-mode aesthetic for superior clarity.
- **Cinematic Depth Tuning**: Fine-tuned the ASGARD background dim to the "Golden Ratio" of 42% for maximum visual impact and depth.
- **Full-Spectrum Validation**: Confirmed 100% stability across the 61-test master suite and achieved zero errors in the newly-hardened TypeScript compiler checks.

### Version 4.8.1 - Spotlight Ecosystem Discovery (2026-03-16)

### Version 4.8.0 - ASGARD Supreme Workspace & FREYA Identity Shift (2026-03-16)
- **ASGARD Workspace**: Launched the world-class desktop launchpad at `/asgard` with a high-performance interactive dock.
- **Bifrost Architecture**: Engineered pure CSS parabolic dock scaling (`:has` selector) and cinematic hardware-accelerated entrance animations (Fade + Scale).
- **Productivity Forge**: Integrated a low-friction toolset: Spotlight Search (`Ctrl+K`), Subtle Pomodoro (Focus Timer), Zen Mode (`Z`), and Edge-delivered Ambient Soundscapes.
- **FREYA Full Identity Shift**: Successfully executed a codebase-wide rename from "Picasso" to "Freya", aligning with the Norse mythology ecosystem.
- **UI Precision Hardening**: Implemented vertical scope-mark ticks on all kreatif sliders and intuitive axis control (slide right -> move right/up).
- **Robustness Mastery**: Expanded the master test suite to 61 scenarios, covering workspace accessibility and soundscape integrity. Eradicated all `any` types for 100% TS safety.

### Version 4.7.1 - Ecosystem Portal Modularization (2026-03-16)
- **Global Portal Modularization**: Engineered a standalone `src/ui/portal.ts` module, establishing a single source of truth for project-wide tactical navigation.
- **Dynamic HTML Injection**: Implemented the `${PUNCHY_PORTAL_HTML}` injection protocol across all 6 professional tools, stripping redundant hardcoded HTML/CSS.
- **Zero-Regression Resolution**: Surmounted and resolved complex "unterminated string literal" syntax errors using sub-agent (`generalist`) batch processing.
- **"Update Once, Use Everywhere" Mandate**: Officially codified the strict modularization requirement in `GEMINI.md` and `DESIGN_GUIDELINE.md`.

### Version 4.7.0 - FREYA Edge Image Forge (2026-03-16)
- **FREYA Image Editor**: Launched the ultra-fast, edge-native image editor (`/freya`) with a 3-layer canvas rendering engine.
- **Multi-Tier Loading**: Implemented a Zero-Latency loading strategy (Tiny -> Preview -> Master) for high-resolution Unsplash assets.
- **Tactical Search Engine**: Integrated Unsplash API with Edge Caching and strict rate-limiting for optimized resource management.
- **Social Export Pipeline**: Engineered a client-side WebP export (1200px) optimized for high-impact Open Graph and social banners.

### Version 4.6.1 - World-Class Modularization (2026-03-15)
- **Architecture**: Extracted all tool logic from index.ts into isolated domain handlers (`src/handlers/`).
- **Core**: Created `src/core/types.ts` and `src/core/utils.ts` for shared interfaces and pure functions.
- **Services**: Abstracted security (rate-limiting, Turnstile) into `src/services/security.ts`.
- **Router**: Slimmed index.ts into a pure, lightweight edge routing switchboard.

### Version 4.6.0 - YAIBA Zen Markdown Forge (2026-03-15)
- **YAIBA Zen Editor**: Launched the elite Markdown editor (`/yaiba`) with client-side E2E encryption.
- **Zero-Knowledge Storage**: Engineered a secure publication flow where the decryption key never leaves the client's browser (fragment-based).
- **Dynamic HUD Resizing**: Implemented a high-performance, frame-throttled split-pane resizer for synchronous writing and previewing.
- **Ecosystem Integration**: Standardized the 'Fast-Switcher' Ecosystem Portal across all professional tools for rapid tactical movement.
- **Global Design Regression**: Hardened all GET routes to prevent method-mismatch interceptions and ensured design symmetry project-wide.
- **Verification**: All 52 tests passing with 100% feature and security coverage.

### Version 4.5.0 - ODIN Tactical Data Analysis & Global HUD Mastery (2026-03-14)
- **ODIN Tactical Hub**: Launched the "All-Father" data analysis platform (`/odin`) with a 15/85 split-pane HUD.
- **Arquero Strategic Engine**: Integrated high-speed client-side data transformation for instant profiling and aggregation.
- **AI Tactical Analyst**: Integrated Cloudflare Workers AI (`@cf/meta/llama-3-8b-instruct`) for automated strategic insights and anomaly detection.
- **Tactical Upload & DEMO**: Implemented a 1000-record CSV limit and a 1-click mock data loader for presentations.
- **World-Class Symmetry**: Codified Design Principle #11 in `DESIGN_GUIDELINE.md`, enforcing a 10vh tactical gutter and body-level padding for balanced content presentation.
- **HUD Synchronization**:
    - **Anakin**: Implemented symmetrical vertical scrolling and removed generation animations for a cleaner experience.
    - **Musashi**: Added the mini 'AI' badge to Job Intel for tactical clarity.
    - **Odin**: Removed the pulse grid background for maximum focus on data analysis.

### Version 4.3.0 - MUSASHI Strategic Forge & Safety Protocols (2026-03-13)
- **Strategic AI Forge**: Launched the fully functional Cold Attack Engine with high-speed anchor extraction.
- **Model Selection Protocol**: Codified the rule to **avoid AWQ models for JSON Mode** or complex reasoning; full-precision models are mandatory for structural integrity.
- **Immersive HUD**: Integrated the Tactical Decoder animation for real-time strategic briefings.
- **Safety Hardening**: Codified Section 7 in `WORK_DOCS.md` to prevent recurring tool bugs and increase velocity.

### Version 4.1.0 - Server-First Flow & HUD Mastery (2026-03-13)
- **Server-First Punching**: Revolutionized link generation UX by waiting for server confirmation before displaying the link, ensuring 100% propagation reliability.
- **Success Animation v2.0**: Refined the success icon with a deliberate `cubic-bezier` pop and neon-green glow for professional interactive feedback.
- **"Below the Fold" Strategy**: Isolated the primary tool in a `100svh` hero section on landing, pushing secondary modules into a discoverable scroll area to reduce cognitive load.
- **Philosophy Alignment**: Formally integrated "Occam's Razor" and established `WORK_DOCS.md` for elite team operations.

### Version 4.0.0 - Comprehensive SEO Overhaul (2026-03-13)
- Dynamic User Identity: Custom SEO Titles and Descriptions injected for every shared resume and business card.
- Semantic Authority: Standardized H1/H2 heading hierarchy globally for search indexing and accessibility.

### Version 3.9.0 - Elite HUD & Routing Integrity (2026-03-13)
- **Edge Resilience**: Triple-tier KV mitigation (1.2s Smart Wait + 500ms Double-Lock retry).
- **Tactical UX**: Branded 404 "Re-Sync" page with pixel drift and auto-reload logic.
- **Anakin Forge v2.0**: Refactored resume layout (Tactical Header + SVG Icons + Expertise Tags) optimized for 1-page PDF exports.
- **Smart Rate Limiting**: Moved rate limiting after deduplication to allow unlimited "Free Re-Punches."

### Version 2.9.9 - Elite AI & SEO (2026-03-13)
- Overhauled AI engine with role-aligned context blocks and strict token/temperature standards.
- Integrated comprehensive SEO metadata and client-side hydrated JSON-LD schemas.
