# THOR - Web Intelligence Engine

## Objective
To build a simple, ultra-fast solution using Cloudflare Browser AI that scrapes a webpage, extracts structured information, and transforms the content into a queryable "database" for deep analysis with LLMs (Llama/Mistral).

## Functional Requirements
- **Extraction**: Scrape title, metadata, and JSON-LD schema.
- **Hierarchy**: Map page structure (H1, H2) and visual assets (images).
- **Intelligence**: Generate a tactical summary of the page's core content.
- **Discovery**: Recursively discover and scrape internal links from the same website.
- **Analysis**: Enable deep semantic queries against the scraped data using Cloudflare Workers AI and Vectorize.

## Strategic Stack
- **Cloudflare Browser Rendering REST API**: High-speed, stateless edge-native HTML-to-Markdown extraction via the `/markdown` endpoint.
- **Workers AI**:
    - `@cf/meta/llama-3-8b-instruct` (Narrative analysis & Summarization).
    - `@cf/baai/bge-small-en-v1.5` (Semantic embeddings for querying).
- **Vectorize**: High-performance vector database for semantic memory.
- **D1 Database**: Structured storage for metadata and page hierarchy.

## Implementation Protocol (The Thor Forge)

### Phase 1: The Blueprint
- [x] Define the `THOR_STORAGE` KV/D1 schema.
- [x] Map the UI for the Thor control center (Tactical HUD).
- [x] Implement a stateless scraper service using the Browser Rendering `/markdown` REST API.

### Phase 2: The Vanguard (TDD)
- [x] Create `src/handlers/thor.test.ts`.
- [x] Mock the `/browser-rendering/markdown` API responses.
- [x] Add tests for link discovery within the Markdown output.

### Phase 3: The Forge (Implementation)
- [x] `src/handlers/thor.ts`: Core scraping and recursive discovery logic using the REST API.
- [x] `src/services/intelligence.ts`: AI summarization and embedding pipeline.
- [x] `src/ui/thor.ts`: Matte Black tactical interface for the Thor tool.

### Phase 4: The Crucible (Validation)
- [ ] `npm test` -> 100% pass.
- [ ] `npx tsc --noEmit` -> Zero errors.

---
*Created on 2026-03-17 by Toy & Gemini CLI (Thor Project)*
