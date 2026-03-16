# 🥊 PUNCHY.ME 

**URL Shortening with impact.** 

PUNCHY.ME is a ultra-minimal, high-performance URL shortener built for speed and style. No bloat, no tracking, just a clean "punch" to your long links.

[Live Site (punchy.me)](https://punchy.me) | [GitHub Repo](https://github.com/toyeiei/punchy.me)

## ✨ Features
- **Neon Glitch UI**: A modern, high-contrast dark theme with reactive glitch animations.
- **90s Pixel-Game BG**: Nostalgic drifting pixel background for that premium retro feel.
- **Smart Deduplication**: Automatic reverse-mapping—same long URL, same short link. No storage waste.
- **Instant Copy**: One-click clipboard action with visual feedback.
- **Responsive**: Sleek performance on everything from mobile to 4K screens.

## 🛠️ Tech Stack
- **Engine**: [Cloudflare Workers](https://workers.cloudflare.com/) (Edge Computing)
- **Database**: [Cloudflare KV](https://developers.cloudflare.com/kv/) (Low-latency Key-Value storage)
- **Language**: TypeScript (Strictly typed)
- **Testing**: [Vitest](https://vitest.dev/) (TDD Philosophy)
- **Linting**: ESLint (Senior-level code quality)

## 🚀 Engineering Principles
This project follows a strict **TDD (Test-Driven Development)** approach. Every route and piece of logic was verified by a failing test before being implemented. 

- **Test First**: No code without a test.
- **Surgical Updates**: Clean, modular code separated into UI and Logic.
- **Continuous Quality**: ESLint enforced on every commit.

## 💻 Development

### Setup
```bash
npm install
```

### Local Dev
```bash
npm run dev
```

### Run Tests
```bash
npm run test
```

### Deploy
```bash
npm run deploy
```

---
Built with ⚡ by Toy & Gemini CLI.
