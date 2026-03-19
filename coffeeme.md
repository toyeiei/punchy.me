# Coffee.me - "Buy Me a Coffee" Clone on Cloudflare

## Platform Overview

| Feature | Buy Me a Coffee | Ko-fi | Our Platform |
|---------|-----------------|-------|--------------|
| One-time tips | ✅ | ✅ | ✅ (Stripe) |
| Subscriptions | ✅ | ✅ | ✅ (Stripe) |
| Shop/products | ✅ | ✅ | Phase 2 |
| Commissions | ❌ | ✅ | Phase 2 |
| Goal tracking | ✅ | ✅ | ✅ |
| Analytics | ✅ | ✅ | ✅ (D1) |
| Custom pages | ✅ | ✅ | ✅ |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLOUDFLARE EDGE                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │   Worker     │    │     KV       │    │     D1       │      │
│  │  (Router)    │◄──►│  (Cache)     │◄──►│  (SQLite)    │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│         │                   │                    │               │
│         ▼                   ▼                    ▼               │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │   Stripe     │    │   Pages      │    │  Analytics   │      │
│  │   Payments   │    │   (HTML)     │    │   (Metrics)  │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────┐
                    │   Creator    │
                    │   Dashboard  │
                    │   (React)    │
                    └──────────────┘
```

---

## Database Schema (D1)

```sql
-- Creators (the people receiving tips)
CREATE TABLE creators (
  id TEXT PRIMARY KEY,              -- 'coffee_abc123'
  slug TEXT UNIQUE,                 -- 'johndoe' -> johndoe.coffee.me
  name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  theme TEXT DEFAULT 'dark',        -- dark, light, custom
  accent_color TEXT DEFAULT '#22c55e',
  goal_amount INTEGER,              -- in cents
  goal_description TEXT,            -- "New laptop for streaming"
  created_at INTEGER,
  stripe_account_id TEXT,           -- Stripe Connect account
  stripe_onboarding_complete BOOLEAN DEFAULT FALSE
);

-- Supporters (the people giving tips)
CREATE TABLE supporters (
  id TEXT PRIMARY KEY,
  email TEXT,
  name TEXT,
  created_at INTEGER
);

-- Tips (one-time payments)
CREATE TABLE tips (
  id TEXT PRIMARY KEY,
  creator_id TEXT REFERENCES creators(id),
  supporter_id TEXT REFERENCES supporters(id),
  amount INTEGER NOT NULL,          -- in cents
  message TEXT,
  is_public BOOLEAN DEFAULT TRUE,
  created_at INTEGER,
  stripe_payment_id TEXT
);

-- Subscriptions (recurring)
CREATE TABLE subscriptions (
  id TEXT PRIMARY KEY,
  creator_id TEXT REFERENCES creators(id),
  supporter_id TEXT REFERENCES supporters(id),
  amount INTEGER NOT NULL,
  interval TEXT,                     -- 'monthly', 'yearly'
  status TEXT,                       -- 'active', 'canceled', 'past_due'
  stripe_subscription_id TEXT,
  started_at INTEGER,
  canceled_at INTEGER
);

-- Goals
CREATE TABLE goals (
  id TEXT PRIMARY KEY,
  creator_id TEXT REFERENCES creators(id),
  title TEXT,
  target_amount INTEGER,
  current_amount INTEGER DEFAULT 0,
  deadline INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  created_at INTEGER
);

-- Analytics events
CREATE TABLE events (
  id TEXT PRIMARY KEY,
  creator_id TEXT,
  event_type TEXT,                   -- 'page_view', 'tip', 'subscribe'
  amount INTEGER,
  created_at INTEGER
);
```

---

## API Endpoints

```
Public Routes (No Auth)
─────────────────────────
GET  /{slug}                    → Creator profile page
POST /{slug}/tip               → Create tip checkout
POST /{slug}/subscribe         → Create subscription checkout
GET  /{slug}/supporters        → Public supporter list
GET  /{slug}/goals             → Active goals

Creator Routes (Auth Required)
──────────────────────────────
GET  /dashboard                 → Creator dashboard
GET  /dashboard/analytics       → Earnings, views, stats
GET  /dashboard/tips            → List of tips received
GET  /dashboard/subscriptions   → Active subscribers
GET  /dashboard/goals           → Manage goals
POST /dashboard/goals           → Create new goal
PUT  /dashboard/settings        → Update profile
GET  /dashboard/payouts         → Withdrawal history

Stripe Webhooks
───────────────
POST /webhooks/stripe          → Handle payment events
```

---

## Key Components

### 1. Creator Page (Dynamic HTML)

```typescript
// src/handlers/coffee.ts
export async function handleCreatorPage(
  request: Request, 
  env: Env, 
  slug: string
): Promise<Response> {
  // Check KV cache first
  const cached = await env.KV.get(`page:${slug}`);
  if (cached) {
    return new Response(cached, { headers: { 'Content-Type': 'text/html' }});
  }

  // Fetch from D1
  const creator = await env.DB.prepare(
    'SELECT * FROM creators WHERE slug = ?'
  ).bind(slug).first();

  if (!creator) {
    return new Response('Creator not found', { status: 404 });
  }

  // Render page
  const html = renderCreatorPage(creator);
  
  // Cache for 5 minutes
  await env.KV.put(`page:${slug}`, html, { expirationTtl: 300 });
  
  return new Response(html, { headers: { 'Content-Type': 'text/html' }});
}
```

### 2. Tip Creation (Stripe Checkout)

```typescript
export async function handleTip(
  request: Request, 
  env: Env, 
  slug: string
): Promise<Response> {
  const { amount, message, email } = await request.json();

  const creator = await getCreator(env, slug);
  
  // Create Stripe checkout session
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        unit_amount: amount,  // Dynamic amount!
        product_data: {
          name: `Coffee for ${creator.name}`,
          description: message || 'A small token of appreciation'
        }
      },
      quantity: 1
    }],
    success_url: `${request.url}/success`,
    cancel_url: `${request.url}`,
    metadata: {
      creator_id: creator.id,
      type: 'tip',
      message
    }
  });

  return Response.redirect(session.url, 303);
}
```

### 3. Stripe Connect (Creator Payouts)

```typescript
// Onboard creator to Stripe Connect
export async function handleStripeConnect(
  request: Request,
  env: Env,
  creatorId: string
): Promise<Response> {
  const account = await stripe.accounts.create({
    type: 'express',
    capabilities: {
      transfers: { requested: true }
    }
  });

  // Save account ID
  await env.DB.prepare(
    'UPDATE creators SET stripe_account_id = ? WHERE id = ?'
  ).bind(account.id, creatorId).run();

  // Generate onboarding link
  const link = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: `${env.BASE_URL}/dashboard/connect/refresh`,
    return_url: `${env.BASE_URL}/dashboard/connect/success`,
    type: 'account_onboarding'
  });

  return Response.redirect(link.url, 303);
}
```

### 4. Webhook Handler

```typescript
export async function handleWebhook(
  request: Request,
  env: Env
): Promise<Response> {
  const { type, data } = await parseWebhook(request, env);

  switch (type) {
    case 'checkout.session.completed': {
      const { creator_id, type: paymentType } = data.metadata;
      
      if (paymentType === 'tip') {
        await env.DB.prepare(`
          INSERT INTO tips (id, creator_id, amount, message, created_at)
          VALUES (?, ?, ?, ?, ?)
        `).bind(
          generateId(),
          creator_id,
          data.amount_total,
          data.metadata.message,
          Date.now()
        ).run();

        // Update goal progress
        await updateGoalProgress(env, creator_id, data.amount_total);
      }
      break;
    }

    case 'customer.subscription.created': {
      // Add subscription record
      break;
    }

    case 'invoice.paid': {
      // Recurring payment received
      // Transfer to creator's Stripe Connect account
      await stripe.transfers.create({
        amount: data.amount_paid * 0.95,  // 5% platform fee
        currency: 'usd',
        destination: creator.stripe_account_id
      });
      break;
    }
  }

  return new Response('OK');
}
```

---

## Revenue Model

| Model | Description | Fee |
|-------|-------------|-----|
| Platform fee | % of each transaction | 5% |
| Stripe fee | Payment processing | 2.9% + $0.30 |
| Creator receives | Net amount | ~92% |

**Example:** $10 tip
- Stripe: $0.59
- Platform: $0.50
- Creator: $8.91

---

## Feature Comparison with Existing

```
Our Platform Advantages:
├── Edge-first (fast page loads)
├── Lower fees (5% vs 5-10%)
├── Custom themes (CSS injection)
├── Real-time analytics
├── D1 for complex queries
├── No vendor lock-in
└── Own your data

Competitor Advantages:
├── Brand recognition
├── Existing user base
├── Mobile apps
├── More integrations
└── Support team
```

---

## MVP Scope (Phase 1)

```
Core Features (Week 1-2):
├── Creator registration
├── Custom slug/page
├── One-time tips
├── Stripe Connect onboarding
├── Basic dashboard
└── Webhook handling

Phase 2 (Month 1):
├── Subscriptions
├── Goals
├── Analytics dashboard
├── Custom themes
└── Export data

Phase 3 (Month 2+):
├── Shop/digital products
├── Commissions
├── Mobile app
├── API for integrations
└── Team accounts
```

---

## Estimated Costs

| Item | Monthly Cost |
|------|--------------|
| Workers (included) | $0 |
| KV (1GB) | $0.50 |
| D1 (5GB) | $5.00 |
| Stripe (no monthly) | $0 |
| Custom domain | $1.00 |
| **Total** | **~$7/month** |

---

## Quick Start Structure

```
coffee.me/
├── src/
│   ├── index.ts              # Router
│   ├── core/
│   │   ├── types.ts          # Interfaces
│   │   ├── db.ts             # D1 queries
│   │   └── stripe.ts         # Stripe utilities
│   ├── handlers/
│   │   ├── creator.ts        # Public pages
│   │   ├── dashboard.ts      # Creator dashboard
│   │   ├── tip.ts            # Tip handling
│   │   └── webhook.ts        # Stripe webhooks
│   └── ui/
│       ├── creator.ts        # Creator page template
│       └── dashboard.ts      # Dashboard template
├── schema.sql                # D1 migrations
└── wrangler.toml
```

---

## Next Steps

1. **Add to PUNCHY.ME** - Integrate as a new tool
2. **New project** - Standalone "coffee.me" platform
3. **Both** - Shared infrastructure, separate domains
