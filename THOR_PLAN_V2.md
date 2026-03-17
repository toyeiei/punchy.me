# THOR V2 - Simple Web Intelligence

## Philosophy
Simple but mighty. One request, one response. No persistence, no complexity.

## Workflow
```
URL → Browser Rendering (/markdown) → Mistral 24B → Intelligence Report (HTML + PDF)
```

## Data Extracted

### SEO & Meta
- og:image, og:title, og:description
- meta title, description, keywords
- canonical URL, robots status

### Structure
- H1/H2/H3 hierarchy
- Link count (internal/external)
- Image count with notable alts

### Content Intelligence (AI)
- Summary (150-200 words)
- Main topics/tags (5-7)
- Content type detection (blog, docs, landing, product, etc.)
- Target audience inference
- Key entities mentioned (brands, people, products)

### Technical Signals
- JSON-LD schema presence
- Open Graph completeness score
- Estimated reading time
- Word count

## API

### POST /thor/forge
**Input:** `{ url: string }`

**Output:**
```json
{
  "url": "https://example.com",
  "title": "Page Title",
  "intelligence": {
    "seo": { ... },
    "structure": { ... },
    "content": { ... },
    "technical": { ... }
  },
  "pdfUrl": "/thor/pdf/{id}"
}
```

### GET /thor/pdf/{id}
Returns downloadable PDF report (ephemeral, KV-cached for 1 hour)

## Stack
- Browser Rendering REST API (/markdown endpoint)
- Workers AI: `@cf/mistralai/mistral-small-24b-instruct-2503`
- KV for ephemeral PDF cache (1-hour TTL)

## No Longer Needed
- D1 database
- Vectorize index
- Chunking/embedding logic
- Semantic query endpoint

---
*Created: 2026-03-17 - Thor V2 Simplification*
