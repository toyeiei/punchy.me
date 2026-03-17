# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Local dev server (wrangler dev, runs on localhost:8787)
npm test             # Run full test suite (vitest run via @cloudflare/vitest-pool-workers)
npm run lint         # ESLint
npx tsc --noEmit     # Type-check without emitting
npx vitest run --reporter=verbose  # Verbose test output for debugging
wrangler deploy --dry-run           # Validate edge bundle without deploying
```

There is no way to run a single test file — the entire suite lives in `src/index.test.ts`. To run a subset, use `npx vitest run -t "test name pattern"`.

**Never run `wrangler deploy` or `npm run deploy` without explicit user approval.**

## Architecture

PUNCHY.ME is a Cloudflare Workers application — a URL shortener with 8 integrated professional tools. Single Worker entry point, single KV namespace (`SHORT_LINKS`), zero runtime NPM dependencies.

### Request Flow

`src/index.ts` is a flat if-chain router that dispatches to handlers:

1. **Static routes** → `handlers/static.ts` (homepage, favicon, robots, sitemap)
2. **POST /shorten** → `handlers/shorten.ts` (core URL shortening)
3. **GET /\<tool\>** → tool handler returns HTML from `ui/*.ts` template strings
4. **POST /\<tool\>/...** → tool handler processes input, may call AI, stores to KV
5. **GET /\<anything-else\>** → `handlers/render.ts` (KV lookup → redirect or HTMLRewriter render)

### Key Layers

- **`src/core/types.ts`** — All shared interfaces (`Env`, `BazukaData`, `AnakinData`, `RagnarSlide`, etc.)
- **`src/core/validation.ts`** — Request validators returning `ValidationResult<T>` — every POST endpoint validates through these
- **`src/core/utils.ts`** — `escapeHTML()`, `generateUniqueId()`, `jsonResponse()`, `parseAIResponse()`
- **`src/core/rewriters.ts`** — HTMLRewriter element handlers for Bazuka/Anakin dynamic rendering
- **`src/services/security.ts`** — KV-based rate limiting, Turnstile verification, payload size check
- **`src/handlers/*.ts`** — One file per tool, exports GET page handler + POST API handler
- **`src/ui/*.ts`** — Each file exports HTML template strings (full pages as template literals)

### Tools and Their AI Models

| Tool | Route | AI Model | Storage |
|------|-------|----------|---------|
| Shortener | `/shorten` | None | KV: `{id}` → URL, `url:{normalized}` → id |
| BAZUKA | `/bazuka` | None | KV: `{id}` → JSON with `type: 'bazuka'` |
| ANAKIN | `/anakin` | Llama 3 8B (hydration) | KV: `{id}` → JSON with `type: 'anakin'` |
| MUSASHI | `/musashi/forge` | Llama 3 8B | Stateless (returns JSON) |
| YAIBA | `/yaiba/publish` | None | KV: `{id}` → JSON with `type: 'yaiba'`, 3-day TTL |
| RAGNAR | `/ragnar/forge` | Mistral 24B | KV: `{id}` → JSON with `type: 'ragnar'`, 3-day TTL |
| ODIN | `/odin/analyze` | Llama 3 8B | Stateless (returns JSON) |
| FREYA | `/freya/search` | None | Proxies Unsplash API with edge caching |
| ASGARD | `/asgard` | None | Static page with Pomodoro/clock/spotlight |

### Dynamic Rendering (`render.ts`)

The catch-all handler determines content type by inspecting KV values:
- Starts with `http` → 301 redirect (short link)
- Starts with `{` → parse JSON, check `type` field, render via HTMLRewriter (bazuka/anakin) or template injection (yaiba/ragnar)
- `/ragnar/slide/{id}` — special route for Reveal.js slide decks
- `/y/{id}` — Yaiba notes with 600ms retry for KV eventual consistency

### KV Key Conventions

All data shares the `SHORT_LINKS` namespace. Key prefixes:
- `{6-char-id}` — short link target URL or JSON data blob
- `url:{normalized-url}` — reverse lookup for deduplication
- `rl:{feature}:{ip}` — rate limit counters with TTL

### UI Templates

UI is generated as exported template literal strings in `src/ui/*.ts`. Some handlers import from `'../ui'` (barrel), others import directly (e.g., `'../ui/ragnar'`). The shared ecosystem navigation bar lives in `src/ui/portal.ts` and is injected via `${PUNCHY_PORTAL_HTML}` into each tool's template.

Design system: Matte Black (#000) + Neon Green (#22c55e), glassmorphism panels (`rgba(255,255,255,0.03)` + `backdrop-filter: blur(10px)`), JetBrains Mono font.

### Testing

Single test file: `src/index.test.ts` (~940 lines). Tests run against real Cloudflare Workers runtime via `@cloudflare/vitest-pool-workers`. AI calls are mocked with `vi.spyOn(env.AI, 'run')`. KV is cleared in `beforeEach`. The global `VITEST = true` enables test-token bypass for Turnstile verification.

## Workflow Constraints

- **TDD-first**: Write failing tests before implementation. New tests must fail while existing tests stay green.
- **Efficient validation loop**:
  - During iteration (each small change): `npx tsc --noEmit`
  - Frequently (when TypeScript is green): `npm run lint`
  - Milestones / before handoff: `npm test`
  - Always run the full gate before finishing a batch of fixes: `npx tsc --noEmit && npm run lint && npm test`
- **Full test suite required** for any change touching `src/ui/` or `src/index.ts` — isolated tests are insufficient for UI template integrity.
- **Template literal hazard**: UI files use nested template literals. Never use backticks inside inner HTML — use single quotes and string concatenation instead. After modifying any `src/ui/*.ts` file, verify the template termination points.
- **Design freeze during test/lint cycles**: Do not make UI aesthetic changes while fixing tests or lint. Validation phases are for correctness only.
