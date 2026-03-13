# Team Operational Framework: Toy & Gemini CLI

This document serves as the tactical guide for our software team. It captures our engineering philosophy, workflow tactics, and the feedback required to maintain a world-class standard.

## 1. Engineering Philosophy
- **TDD First**: No code without a failing test case.
- **Mechanical Sympathy**: Design software that respects the physical and distributed constraints of the hardware (e.g., KV eventual consistency, mobile keyboards).
- **Tool-First HUD**: Prioritize a clean, tactical interface that reduces cognitive load.

## 2. Communication Framework (The OCC Method)
To ensure surgical precision and avoid scope creep, all major directives should follow the **Objective + Context + Constraint** framework:

*   **Objective**: What is the ultimate goal? (e.g., "Implement Custom Slugs")
*   **Context**: Where does this apply? (e.g., "Only for BAZUKA card generation")
*   **Constraint**: What are the boundaries? (e.g., "Slugs must be alphanumeric, min 4 chars, and not break existing redirection logic")

## 3. The "Definition of Done" (DoD)
A task is only considered complete when:
1.  **Code Quality**: `npm run lint` returns zero errors.
2.  **Verification**: All related tests in `npm test` pass with 100% reliability.
3.  **Documentation**: `GEMINI.md` and `IMPLEMENTATION_LOG.md` are updated.
4.  **Deployment**: Production state is synchronized and verified.

## 4. Architectural Decision Records (ADR)
Before implementing complex roadmap items (e.g., MUSASHI blades), demand **Technical Trade-offs**:
- Ask for 3 implementation paths.
- Evaluate the Pros/Cons of each (Speed vs. Complexity vs. Cost).

## 5. Continuous Improvement (Team Audit 2026-03-13)
- **Strengths**: Conceptual curiosity, quality obsession, iterative refinement.
- **Opportunities**: Strictly defining boundaries between "Mobile" and "Desktop" logic, increasing instruction density to capture edge cases earlier.

## 6. Design Language System (SHINOBI GLASS)
Standardized card/panel effect for the PUNCHY.ME ecosystem:
*   **Base**: Semi-transparent background (`rgba(255, 255, 255, 0.03)`).
*   **Blur**: `backdrop-filter: blur(10px)` for glassmorphism.
*   **Border**: 1px thin stealth border (`rgba(255, 255, 255, 0.08)`).
*   **Hover**: Interactive `var(--accent)` border-glow (no vertical lift).

## 7. Tool-Specific Safety Protocols (Anti-Bug Mandates)
To maintain world-class speed, we must bypass recurring tool limitations:

### 7.1. Nested Template Literal Bug
*   **Problem**: `write_file` and `replace` erroneously escape backticks (e.g., \`;) in nested templates.
*   **Prevention**: **NEVER** use nested backticks. Use single quotes and string concatenation (`' + var + '`) for inner HTML generation (e.g., in `renderIntelligence`).
*   **Audit**: After every UI file write, surgically verify the final 5 lines of the file for escaped backslashes.

### 7.2. Context-Locking for Replacements
*   **Problem**: Fuzzy matching applies changes to the wrong location.
*   **Prevention**: Always provide **3-5 lines of context** in `old_string`. Avoid replacing single lines or generic tags.

### 7.3. Immediate Validation
*   **Problem**: Small syntax errors compound into large system failures.
*   **Prevention**: Run `npm run lint` immediately after any modification to a `src/ui/` file.

---
*This document is foundational. We do not just fix bugs; we harden the architecture.*
