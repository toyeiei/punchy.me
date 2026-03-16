# PUNCHY.ME Robustness Hardening Plan

## Phase 1: P0 Critical Security & Broken Code (Do First)

### 1. Remove hardcoded Turnstile secret
- Delete the hardcoded `'0x4AAAAAAApO5kHNRhLAhQOH-X-SECRET-KEY'` from `src/services/security.ts`
- Add `TURNSTILE_SECRET_KEY` to the `Env` interface in `src/core/types.ts`
- Pass `env.TURNSTILE_SECRET_KEY` into `verifyTurnstile()` as a parameter
- User will run `wrangler secret put TURNSTILE_SECRET_KEY` separately to set the real value

### 2. Fix XSS in Ragnar slide rendering
- In `src/handlers/render.ts`, apply `escapeHTML()` to all user-controlled Ragnar slide fields (`s.header`, `s.content`) before injecting into HTML strings

### 3. Remove test-token bypass in production
- Gate `if (token === 'test-token') return true;` behind a check like `if (typeof globalThis.VITEST !== 'undefined')` or remove it entirely and rely on the existing `vi.spyOn` mocking in tests

### 4. Fix missing `generateUniqueId`
- Add the function to `src/core/utils.ts` using `crypto.randomUUID().substring(0, 8)` for cryptographic randomness
- Also migrate all other `Math.random().toString(36).substring(2, 8)` calls across handlers to use this shared function

---

## Phase 2: P1 Reliability Fixes

### 5. Fix infinite 404 reload loop
- In `src/handlers/render.ts`, remove the auto-reload `setTimeout(() => window.location.reload(), 1500)` from the generic `SYNC_ERROR_HTML`
- Keep the retry-with-sleep only for the `/y/` (Yaiba) path where eventual consistency is expected, and cap it to one retry (remove the second 1200ms sleep)
- For all other paths, return the 404 page immediately without sleeping

### 6. Add runtime input validation
- Create `src/core/validation.ts` with lightweight validation helpers (no new dependency needed -- simple type guards)
- Validate incoming JSON in every POST handler: check types of required fields before using them
- Replace unsafe `as` casts with validated parsing

### 7. Improve rate limiting correctness
- KV race conditions are inherent and cannot be fully fixed without Durable Objects. However, we can make it "good enough" by:
  - Adding a comment documenting the known race window
  - Reducing the practical impact by lowering the limit slightly (e.g., set internal limit to 8 to account for races when the user-facing limit is 10)
  - This is an acceptable tradeoff for a side project vs. the complexity of Durable Objects

---

## Phase 3: P2 Code Quality

### 8. Extract shared utilities
- Create `jsonResponse(data, status)` helper in `src/core/utils.ts` to eliminate duplicated response construction
- Create `parseAIResponse(raw)` helper in `src/core/utils.ts` to consolidate the duplicated "extract JSON from AI response" logic used in anakin, musashi, and ragnar

### 9. Standardize ID generation
- Replace all `Math.random().toString(36).substring(2, 8)` calls with the new `generateUniqueId()` across shorten.ts, bazuka.ts, anakin.ts, yaiba.ts

### 10. Apply Turnstile/honeypot consistently
- Add honeypot field validation to ragnar handler (currently missing)

---

## Phase 4: P3 Cleanup

### 11. Remove console.log from production handlers
- Delete the `console.log('--- ANAKIN AI RAW OUTPUT ---')` and `console.log('--- MUSASHI AI RAW OUTPUT ---')` blocks

### 12. Replace `err: any` with proper typing
- Change `catch (err: any)` in ragnar.ts to `catch (err: unknown)` and use proper type narrowing

### 13. Fix swallowed errors
- Add `console.error` with context to all `catch (_e)` blocks so failures are observable in production logs

---

## Out of Scope (noted but not doing now)
- **HTML-in-TS refactor**: Massive effort touching every UI file. Worth doing eventually but not part of this hardening pass.
- **Durable Objects for rate limiting**: Over-engineered for current scale.
- **Brittle CSS test assertions**: Low priority, tests still pass.

## Execution Order
Phases 1-4 sequentially. Run `npm test` and `npm run lint` after all changes to verify nothing breaks.
