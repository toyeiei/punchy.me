# Midgard Export Migration Plan

## Overview

| Current Project | New Project |
|-----------------|-------------|
| `punchy.me` | `midgard` |
| All tools | Blog + Editor only |
| Single KV namespace | New KV namespace |

---

## Files to Export

```
FROM: cloudflare-short-link/
TO:   midgard/

┌─────────────────────────────────────────────────────────────────┐
│  FILES TO COPY (with modifications)                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  src/handlers/midgard.ts    →  src/handlers/midgard.ts         │
│  src/handlers/marcus.ts     →  src/handlers/marcus.ts          │
│  src/handlers/freya.ts      →  src/handlers/freya.ts           │
│                                                                 │
│  src/ui/midgard.ts          →  src/ui/midgard.ts               │
│  src/ui/marcus.ts           →  src/ui/marcus.ts                │
│  src/ui/freya.ts            →  src/ui/freya.ts                 │
│                                                                 │
│  src/core/types.ts          →  src/core/types.ts (minimal)     │
│  src/core/utils.ts          →  src/core/utils.ts               │
│                                                                 │
│  (NEW)                      →  src/index.ts                    │
│  (NEW)                      →  wrangler.toml                    │
│  (NEW)                      →  package.json                     │
│  (NEW)                      →  tsconfig.json                   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  FILES TO REMOVE (not needed)                                   │
├─────────────────────────────────────────────────────────────────┤
│  src/ui/portal.ts           (PUNCHY portal)                     │
│  src/handlers/shorten.ts    (URL shortener)                    │
│  src/handlers/bazuka.ts     (Business cards)                   │
│  src/handlers/anakin.ts     (Resume builder)                   │
│  src/handlers/musashi.ts    (Job analyzer)                     │
│  src/handlers/yaiba.ts      (Encrypted notes)                  │
│  src/handlers/ragnar.ts     (Slide generator)                  │
│  src/handlers/odin.ts       (Data analyzer)                    │
│  src/handlers/thor.ts       (Web intelligence)                 │
│  src/handlers/asgard.ts     (Workspace)                        │
│  src/handlers/zinsser.ts    (Newsletter)                       │
│  src/handlers/static.ts     (Static pages)                     │
│  src/handlers/render.ts     (Short link redirects)             │
│  src/services/security.ts   (Turnstile, rate limit)            │
│  src/core/router.ts         (Old router)                       │
│  src/core/constants.ts      (FREYA_CACHE_TTL only needed)      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Step-by-Step Migration

### Phase 1: Create New Project

```bash
# 1. Create project directory
mkdir midgard
cd midgard

# 2. Initialize npm
npm init -y

# 3. Install dependencies
npm install -D wrangler typescript @cloudflare/workers-types vitest @cloudflare/vitest-pool-workers

# 4. Create directory structure
mkdir -p src/handlers src/ui src/core src/services
```

### Phase 2: Create Configuration Files

**`package.json`**
```json
{
  "name": "midgard",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "wrangler dev",
    "deploy": "wrangler deploy",
    "test": "vitest run",
    "lint": "eslint src/",
    "typecheck": "tsc --noEmit"
  },
  "devDependencies": {
    "@cloudflare/workers-types": "^4.20240403.0",
    "@cloudflare/vitest-pool-workers": "^0.4.0",
    "typescript": "^5.4.0",
    "vitest": "^1.4.0",
    "wrangler": "^3.0.0"
  }
}
```

**`wrangler.toml`**
```toml
name = "midgard"
main = "src/index.ts"
compatibility_date = "2024-04-03"
assets = { directory = "./public" }

[[routes]]
pattern = "midgard.punchy.me"
custom_domain = true

[[kv_namespaces]]
binding = "POSTS"
id = "<NEW_KV_NAMESPACE_ID>"

[ai]
binding = "AI"
remote = true

[vars]
# Optional: blog metadata
BLOG_TITLE = "MARCUS"
BLOG_DESCRIPTION = "Stoic wisdom for modern builders"
```

**`tsconfig.json`**
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "node",
    "lib": ["ES2022"],
    "types": ["@cloudflare/workers-types"],
    "strict": true,
    "noEmit": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### Phase 3: Create Minimal Core Files

**`src/core/types.ts`**
```typescript
// Minimal types for Midgard project

export interface Env {
  POSTS: KVNamespace;
  AI: Ai;
  MIDGARD_SECRET: string;
  UNSPLASH_ACCESS_KEY: string;
}

// MARCUS - Blog posts
export interface MarcusPost {
  type: 'marcus:post';
  id: string;
  slug: string;
  title: string;
  body: string;
  excerpt: string;
  coverImage: string | null;
  tags: string[];
  schema?: Record<string, unknown>;
  status: 'draft' | 'published';
  createdAt: number;
  publishedAt: number;
}
```

**`src/core/utils.ts`**
```typescript
// Shared utilities

export function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

export function htmlPage(html: string): Response {
  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}

export function escapeHTML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function generateUniqueId(length = 6): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
```

### Phase 4: Create Router

**`src/index.ts`**
```typescript
import { Env } from './core/types';
import { handleMarcusHome, handleMarcusPost, handleMarcusTag, handleMarcusRSS } from './handlers/marcus';
import { 
  handleMidgardGet, 
  handleMidgardList, 
  handleMidgardEdit,
  handleMidgardSaveDraft,
  handleMidgardPublish,
  handleMidgardUpdate,
  handleMidgardDelete,
  handleMidgardAITitles,
  handleMidgardAIExcerpt,
  handleMidgardAIPolish,
  handleMidgardAISeo,
  handleMidgardAISchema
} from './handlers/midgard';
import { handleFreyaSearch } from './handlers/freya';

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // MARCUS - Public Blog
    if (path === '/marcus' || path === '/marcus/') {
      return handleMarcusHome(request, env);
    }
    if (path === '/marcus/rss') {
      return handleMarcusRSS(env);
    }
    if (path.startsWith('/marcus/tag/')) {
      const tag = path.replace('/marcus/tag/', '');
      return handleMarcusTag(request, env, tag);
    }
    if (path.startsWith('/marcus/') && path !== '/marcus/') {
      const slug = path.replace('/marcus/', '');
      return handleMarcusPost(request, env, slug);
    }

    // Midgard - Private Editor
    if (path === '/midgard' || path === '/midgard/') {
      if (method === 'GET') return handleMidgardGet(request, env);
      return new Response('Method Not Allowed', { status: 405 });
    }
    
    if (path === '/midgard/posts') {
      return handleMidgardList(request, env);
    }
    
    if (path.startsWith('/midgard/edit/')) {
      const slug = path.replace('/midgard/edit/', '');
      return handleMidgardEdit(request, env, slug);
    }
    
    if (path === '/midgard/draft') {
      return handleMidgardSaveDraft(request, env);
    }
    
    if (path === '/midgard/publish') {
      return handleMidgardPublish(request, env);
    }
    
    if (path === '/midgard/update') {
      return handleMidgardUpdate(request, env);
    }
    
    if (path.startsWith('/midgard/post/')) {
      if (method === 'DELETE') {
        const id = path.replace('/midgard/post/', '');
        return handleMidgardDelete(request, env, id);
      }
      return new Response('Method Not Allowed', { status: 405 });
    }
    
    // AI Endpoints
    if (path === '/midgard/ai/titles') return handleMidgardAITitles(request, env);
    if (path === '/midgard/ai/excerpt') return handleMidgardAIExcerpt(request, env);
    if (path === '/midgard/ai/polish') return handleMidgardAIPolish(request, env);
    if (path === '/midgard/ai/seo') return handleMidgardAISeo(request, env);
    if (path === '/midgard/ai/schema') return handleMidgardAISchema(request, env);

    // Freya - Image Search
    if (path === '/freya/search') {
      return handleFreyaSearch(request, env, ctx);
    }

    // Favicon
    if (path === '/favicon.ico') {
      return new Response(null, { status: 204 });
    }

    // 404
    return new Response('Not Found', { status: 404 });
  }
};
```

### Phase 5: Modify Handlers

**Changes needed in each handler:**

| File | Change |
|------|--------|
| `handlers/midgard.ts` | Update imports, remove `PUNCHY_PORTAL_HTML` |
| `handlers/marcus.ts` | Update imports, remove `PUNCHY_PORTAL_HTML` |
| `handlers/freya.ts` | Update imports, change `env.SHORT_LINKS` → `env.POSTS` |
| `ui/midgard.ts` | Remove `${PUNCHY_PORTAL_HTML}` |
| `ui/marcus.ts` | Remove `${PUNCHY_PORTAL_HTML}` |
| `ui/freya.ts` | Remove portal if present |

### Phase 6: KV Key Migration

**Old keys (punchy.me):**
```
marcus:post:{id}
marcus:slug:{slug}
marcus:index
```

**New keys (midgard):** Same structure, new namespace

**Data migration option:**
```bash
# Export from old KV
wrangler kv:key list --namespace-id=<OLD_ID> > keys.json

# Import to new KV (manual or script)
```

### Phase 7: Set Secrets

```bash
# In midgard project
wrangler secret put MIDGARD_SECRET
wrangler secret put UNSPLASH_ACCESS_KEY
```

---

## Migration Script

Save as `migrate.sh` in parent directory:

```bash
#!/bin/bash

# Create new project
mkdir -p midgard/src/{handlers,ui,core,services}
cd midgard

# Initialize
npm init -y
npm install -D wrangler typescript @cloudflare/workers-types

# Copy handlers
cp ../cloudflare-short-link/src/handlers/midgard.ts src/handlers/
cp ../cloudflare-short-link/src/handlers/marcus.ts src/handlers/
cp ../cloudflare-short-link/src/handlers/freya.ts src/handlers/

# Copy UI
cp ../cloudflare-short-link/src/ui/midgard.ts src/ui/
cp ../cloudflare-short-link/src/ui/marcus.ts src/ui/
cp ../cloudflare-short-link/src/ui/freya.ts src/ui/

# Create minimal core files (manual - see plan above)
# Create index.ts router (manual)
# Create wrangler.toml (manual)

echo "Migration files copied. Manual steps remaining:"
echo "1. Create src/core/types.ts (minimal)"
echo "2. Create src/core/utils.ts"
echo "3. Create src/index.ts (router)"
echo "4. Create wrangler.toml"
echo "5. Remove PUNCHY_PORTAL_HTML from UI files"
echo "6. Update env.SHORT_LINKS → env.POSTS"
```

---

## Post-Migration Checklist

```markdown
[ ] Test locally: npm run dev
[ ] Verify /marcus renders blog
[ ] Verify /midgard editor works
[ ] Test authentication with MIDGARD_SECRET
[ ] Test Unsplash images with UNSPLASH_ACCESS_KEY
[ ] Test AI endpoints
[ ] Create KV namespace in Cloudflare dashboard
[ ] Update wrangler.toml with KV namespace ID
[ ] Set secrets: MIDGARD_SECRET, UNSPLASH_ACCESS_KEY
[ ] Deploy: npm run deploy
[ ] Test production URLs
[ ] Migrate existing posts from old KV (optional)
```

---

## Deployment Options

| Option | Domain | Notes |
|--------|--------|-------|
| A | `midgard.punchy.me` | Subdomain of punchy.me |
| B | `blog.punchy.me` | Focus on blog |
| C | Custom domain | Separate brand |

---

## Timeline Estimate

| Phase | Time | Tasks |
|-------|------|-------|
| 1. Setup | 10 min | Create project, configure bindings |
| 2. Copy | 15 min | Copy files, adjust imports |
| 3. Router | 10 min | Create new index.ts |
| 4. Test | 15 min | Local testing, fix issues |
| 5. Deploy | 5 min | Deploy to Cloudflare |
| **Total** | **~1 hour** | |
