# PUNCHY.ME - URL Shortener Project

## Objective
To build a high-performance, visually striking, and reliable URL shortening service using Cloudflare Workers and KV storage. The service must be modern, responsive, and maintainable.

## Engineering Philosophy
"This is our way. This is the only way to create great software."
- **TDD (Test-Driven Development)**: We build with confidence by writing tests before code.
- **High Quality**: We never settle for "good enough." Every line of code must meet senior-level standards.
- **Continuous Validation**: We test, lint, and refactor relentlessly. Validation is the only path to finality.
- **Surgical Precision**: We make targeted, clean updates to maintain system integrity and avoid technical debt.

## Core Principles

### 1. TDD (Test-Driven Development)
We strictly adhere to the **Test-First principle**. No new feature or bug fix is implemented without first writing a failing test case that defines the expected behavior.
- **Workflow:** Red (Write failing test) -> Green (Make it pass) -> Refactor (Optimize code).
- **Validation:** Every change is validated through automated tests before deployment.

### 2. Code Quality & Standards
We maintain senior-level engineering standards regardless of project scale.
- **ESLint:** Strict linting rules are enforced to ensure code consistency and prevent common errors.
- **TypeScript:** Strong typing is used throughout the project to catch errors at compile time.
- **Idiomatic Code:** We follow Cloudflare Workers best practices and modern CSS standards.

## Approach
- **Research:** Map the codebase and validate assumptions through empirical data.
- **Strategy:** Formulate grounded, step-by-step plans for every implementation.
- **Execution:** Iterate through a **Plan -> Act -> Validate** cycle for every sub-task.

## Problem Solving
1. **Empirical Reproduction:** We confirm issues by creating reproduction scripts or tests before applying fixes.
2. **Surgical Updates:** We apply precise, targeted changes to maintain system integrity.
3. **Continuous Validation:** Success is only confirmed when behavioral correctness is verified and structural integrity is confirmed within the full project context.

## CLI & Environment
- **Command Separation**: Always use `;` to separate multiple commands in a single line (PowerShell requirement). Do **NOT** use `&&` as it is not supported in this environment.

## Roadmap (Planned High-Impact Features)
- **Edge Analytics & Click Tracking**: Track real-time engagement metrics (clicks, geography, referrers) using Cloudflare's high-performance data plane.
- **Custom Alias (Slug) Support**: Empower users to create branded, memorable short links (e.g., `punchy.me/my-link`).
- **QR Code Generation**: Instantly generate visually matching QR codes for every shortened link.
- **Expiry Management**: Add the ability to set time-to-live (TTL) for temporary or time-sensitive links.
