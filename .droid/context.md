# PUNCHY.ME Project Context

## Architecture
- **Platform:** Cloudflare Workers (edge-native TypeScript)
- **Storage:** Cloudflare KV (SHORT_LINKS namespace)
- **AI:** Workers AI (Llama 3 8B Instruct)
- **Services:** Unsplash API (Freya), Turnstile (bot protection)

## Application Structure
- **Core Shortener:** URL shortening with deduplication and rate limiting
- **Professional Tools Suite:**
  - BAZUKA: Digital business cards
  - ANAKIN: AI-powered resumes
  - MUSASHI: Job intel extraction
  - ODIN: Data analytics HUD
  - YAIBA: Markdown editor
  - RAGNAR: AI slide deck generator
  - FREYA: Image editor with Unsplash
  - ASGARD: Productivity workspace

## Critical Constraints
1. **Design Preservation (Golden Rule):** Never modify UI layouts, CSS, or animations during lint/test operations. Aesthetic changes require explicit 'Design' or 'Refactor' directives. (Source: DESIGN_GUIDELINE.md §12)
2. **Security First:** All secrets in environment variables, never hardcoded
3. **Type Safety:** All request.json() must be validated before use
4. **XSS Protection:** All user content must pass through escapeHTML()

## Coding Standards
- **ID Generation:** Use crypto.randomUUID() (not Math.random())
- **Error Handling:** Always log context in catch blocks (no silent failures)
- **Response Format:** Use shared utilities for JSON responses
- **Rate Limiting:** Document KV race condition limitations in comments

## Testing
- Vitest with @cloudflare/vitest-pool-workers
- Run `npm test` before any commit
- Run `npm run lint` to check TypeScript/ESLint

## Deployment
- `npm run dev` for local Wrangler development
- `npm run deploy` for production (punchy.me)
- Secrets managed via `wrangler secret put <KEY>`

---

**Project Lead:** Toy (Kasidis Satangmongkol)  
**Primary AI Assistant:** Gemini Pro (feature development)  
**Quality Assurance:** DROID (security hardening, refactoring)  
**Last Updated:** 2026-03-16
