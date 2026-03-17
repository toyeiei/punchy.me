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

### 4. Mandatory Execution Protocol (Plan First)
When given an instruction, the AI agent MUST ALWAYS respond with a structured plan and its understanding of the task. The agent MUST ask for explicit permission from the user BEFORE proceeding with any implementation or tool execution. THIS IS A STRICT PROTOCOL AND MUST NOT BE BROKEN.

## Approach & Problem Solving
- **Research:** Map the codebase and validate assumptions through empirical data.
- **Strategy:** Formulate grounded, step-by-step plans for every implementation.
- **Execution:** Iterate through a **Plan -> Act -> Validate** cycle for every sub-task.
- **Empirical Reproduction:** We confirm issues by creating reproduction scripts or tests before applying fixes.
- **Surgical Updates:** We apply precise, targeted changes to maintain system integrity.
- **Continuous Validation:** Success is only confirmed when behavioral correctness is verified and structural integrity is confirmed within the full project context.

## CLI & Environment
- **Command Separation**: Use `&&` to chain commands (WSL Ubuntu/Bash support).
- **Verbose Testing**: Use `npx vitest run --reporter=verbose` to debug hanging tests or detailed execution flow.

## Deployment Protocol
- **Explicit Approval**: NEVER deploy automatically (e.g., `wrangler deploy` or `npm run deploy`). You MUST ask for explicit user permission before every deployment.
- **Progress Tracking**: All historical progress and version milestones are maintained in `IMPLEMENTATION_LOG.md`.

## Design Philosophy
- **Cyber-Tactical Aesthetic**: Dark, high-contrast themes (Matte Black + Neon Green). 'Tactical HUD' feel.
- **Seamless Transitions**: Dark digital experience, but high-contrast black-on-white for printed output (PDF).
- **Ecosystem Discovery (Command Center)**: 'Tactical Feature Cards' below primary tools instead of traditional menus.
- **Design Language System (SHINOBI GLASS)**:
    *   **Base**: Semi-transparent background (`rgba(255, 255, 255, 0.03)`).
    *   **Blur**: `backdrop-filter: blur(10px)`.
    *   **Border**: 1px thin stealth border (`rgba(255, 255, 255, 0.08)`).
    *   **Hover**: Interactive `var(--accent)` border-glow.
- **Design Revamp Prohibition (The Golden Rule)**: Focus exclusively on behavioral verification during test/lint phases. Revamping UI design during these phases is STRICTLY PROHIBITED.

## Architectural Safeguards

### 1. Tool-Specific Safety Protocols (Anti-Bug Mandates)
- **Nested Template Literal Bug**: **NEVER** use nested backticks. Use single quotes and string concatenation (`' + var + '`) for inner HTML.
- **Context-Locking for Replacements**: Provide **3-5 lines of context** in `old_string` to avoid fuzzy matching errors.
- **Immediate Validation**: Run `npm run lint` and `npx tsc --noEmit` immediately after any UI modification.

### 2. Strict Template Integrity
- **Mandate**: After modifying any UI template in `src/ui/`, verify the transition points between exported template constants. Confirm all template literals are properly terminated with a simple backtick (`) and semicolon (;).

### 3. Strategic Integrity Protocols (Zero-Regression)
- **Pre-Validation Hook**: Immediately run a syntax check after ANY write operation.
- **Double-Read**: Explicitly read the lines following a change to verify termination points.
- **Full-Suite Regression**: Any change touching `src/ui/` or `src/index.ts` requires a full `npm test`.

### 4. Consistency Mitigation (KV Resilience)
- **Smart Wait (Frontend)**: 1.2s lock with progress bar.
- **True Synchronization**: Frontend waits for final ID confirmation.
- **Double-Lock (Backend)**: 500ms pause and retry on KV lookup failure.
- **Optimistic UI**: Client-side ID generation for 0ms perceived latency.

### 5. Smart Rate Limiting
- **Free Re-Punches**: Deduplication happens before the rate limit increment.
- **Strict Normalization**: URLs normalized (trailing slashes removed) before deduplication.

### 6. AI Engine Standards
- **Prompt Structure**: Use `[CONTEXT]`, `[DIRECTIVE]`, and `[OUTPUT FORMAT]` blocks.
- **Narrative Constraints**: Strict word counts and tone (Senior-level, result-focused).

## Roadmap (Planned High-Impact Features)
- **MUSASHI | Dual-Blade Portfolio Hub**: Unified tactical dashboard.
- **Cold Attack Engine**: AI-powered outreach strategist.
- **Edge Tactical Analytics**: Real-time world-map visualization.
- **Custom Alias (Slug) Support**: Branded short links.
- **QR Code Generation**: Matching QR codes for short links.
- **Expiry Management**: TTL for temporary links.
