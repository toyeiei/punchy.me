# PUNCHY.ME - URL Shortener Project

## Objective
To build a high-performance, visually striking, and reliable URL shortening service using Cloudflare Workers and KV storage. The service must be modern, responsive, and maintainable.

## Engineering Philosophy
"This is our way. This is the only way to create great software."
- **MIYAMOTO MUSASHI Strategy**: One feature at a time. Total focus. We tackle one mission until it is perfected before moving to the next.
- **Speed & Simplicity**: Speed is our priority, simplicity is in our blood. Elegant solutions are stronger than complex ones.
- **Reliability & Strength**: We forge things that are strong and consistent. We build systems that aren't easily broken.
- **TDD (Test-Driven Development)**: We build with confidence by writing tests before code.
- **Occam's Razor**: Simple is better than complex. We prioritize the simplest solution that reliably solves the problem.
- **High Quality**: We never settle for "good enough." Every line of code must meet senior-level standards.
- **Design Regression Integrity**: When forging new features, we perform rigorous regression tests. We ensure that not only is the logic functional, but the **UI Design and Brand Aesthetic** remain perfectly intact and unbroken across all tools.
- **Continuous Validation**: We test, lint, and refactor relentlessly. Validation is the only path to finality.
- **Surgical Precision**: We make targeted, clean updates to maintain system integrity and avoid technical debt.

## Core Principles

### 1. TDD (Test-Driven Development)
We strictly adhere to the **Test-First principle**. No new feature or bug fix is implemented without first writing a failing test case that defines the expected behavior.
- **Workflow:** Red (Write failing test) -> Green (Make it pass) -> Refactor (Optimize code).
- **Validation:** Every change is validated through automated tests before deployment.

### 2. Code Quality & Standards
We maintain senior-level engineering standards regardless of project scale.
- **ESLint:** Strict linting rules are enforced to ensure code consistency and prevent common errors.
- **TypeScript:** Strong typing is used throughout the project to catch errors at compile time.
- **Idiomatic Code:** We follow Cloudflare Workers best practices and modern CSS standards.

## Approach
- **Research:** Map the codebase and validate assumptions through empirical data.
- **Strategy:** Formulate grounded, step-by-step plans for every implementation.
- **Execution:** Iterate through a **Plan -> Act -> Validate** cycle for every sub-task.

## Problem Solving
1. **Empirical Reproduction:** We confirm issues by creating reproduction scripts or tests before applying fixes.
2. **Surgical Updates:** We apply precise, targeted changes to maintain system integrity.
3. **Continuous Validation:** Success is only confirmed when behavioral correctness is verified and structural integrity is confirmed within the full project context.

## CLI & Environment
- **Command Separation**: Always use `;` to separate multiple commands in a single line (PowerShell requirement). Do **NOT** use `&&` as it is not supported in this environment.

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

## Architectural Safeguards

### 1. Strict Template Integrity
We have identified a recurring high-impact bug: **Unterminated Template Literals** in UI files (e.g., `src/ui/anakin.ts`).
- **Symptom:** `HTMLRewriter` returns an empty response (`''`), causing tests to fail with messages like `expected '' to contain 'Anakin Skywalker'`.
- **Root Cause:** Malformed template exports or erroneous backslashes (e.g., `\`;`) at the end of template strings.
- **Mandate:** After modifying any UI template in `src/ui/`, engineers **MUST** surgically verify the transition points between exported template constants. Use `read_file` or `grep` to confirm that all template literals are properly terminated with a simple backtick (`) and semicolon (;).
- **Validation:** A task is not complete until `npm test` confirms that `HTMLRewriter` is successfully injecting content into the relevant template.

### 2. Consistency Mitigation (KV Resilience)
Cloudflare KV is eventually consistent. To maintain an "Instant" feel without broken links, we employ a triple-tier strategy:
- **Smart Wait (Frontend):** The result link is "locked" for 1.2s with a visual progress bar. This prevents users from clicking before the data has likely propagated.
- **True Synchronization:** The frontend waits for final ID confirmation from the server and restarts the propagation timer if the ID changed, eliminating race conditions.
- **Double-Lock (Backend):** If a lookup fails, the Worker pauses for 500ms and retries the KV fetch before returning a 404.
- **Optimistic UI:** We generate the short ID client-side to show the result at 0ms, while the actual persistence happens asynchronously in the background.

### 3. Smart Rate Limiting
To prevent abuse while remaining user-friendly, the rate limiter (10 req/min) is strategically positioned:
- **Free Re-Punches:** Deduplication checks happen *after* normalization but *before* the rate limit is incremented. Shortening the same URL multiple times is "free."
- **Strict Normalization:** All URLs are normalized (trailing slashes removed) before deduplication to ensure consistency.
- **IP-Based Tracking:** Requests are tracked via the lowercase `cf-connecting-ip` header for reliable edge identification.

## Progress & Architectural Milestones

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
- **Verification**: Expanded core suite to 16/16 tests with 100% environment isolation.

### Version 2.9.9 - Elite AI & SEO (2026-03-13)
- Overhauled AI engine with role-aligned context blocks and strict token/temperature standards.
- Integrated comprehensive SEO metadata and client-side hydrated JSON-LD schemas.

### 4. AI Engine Standards (ANAKIN)
To ensure consistent and high-quality professional narratives, the ANAKIN engine MUST adhere to these standard parameters:
- **Model:** `@cf/meta/llama-3-8b-instruct`
- **Max Tokens:** 250 (Ensures sufficient length for summary and 3 bullets)
- **Temperature:** 0.6 (Balances professional structure with narrative variety)
- **Prompt Structure:** Always use the `[CONTEXT]`, `[DIRECTIVE]`, and `[OUTPUT FORMAT]` blocks for precision.
- **Narrative Constraints:** 
    - **Professional Summary:** 20-28 words.
    - **Experience Bullets:** 15-20 words per bullet (Total 3 bullets).
    - **Tone:** Senior-level, action-oriented, and result-focused.

### 5. Design Language System (Local Memory)
- **SHINOBI GLASS**: Standardized card/panel effect consisting of `rgba(255, 255, 255, 0.03)` background, `backdrop-filter: blur(10px)`, `1px solid rgba(255, 255, 255, 0.08)` border, and a `translateY(-5px)` hover lift with `var(--accent)` border-glow. Apply this aesthetic to all new feature modules.
