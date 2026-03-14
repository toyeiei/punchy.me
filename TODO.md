# PUNCHY.ME | Tactical Roadmap & TODOs

## Phase 1: Final Deployment (Immediate Actions)
- [ ] **Commit Configuration**: Stage and commit the hardened `wrangler.toml` and new `worker-configuration.d.ts`.
- [ ] **Production Merge**: Merge the `loki` branch into `main`.
- [ ] **Edge Launch**: Execute `npm run deploy` to push the LOKI HUD to `punchy.me`.
- [ ] **Secret Provisioning**: Set up the Resend API key in production: `npx wrangler secret put RESEND_API_KEY`.
- [ ] **Log Synchronization**: Update `IMPLEMENTATION_LOG.md` and `GEMINI.md` for the v4.4.0 milestone.

## Phase 2: LOKI Expansion (Post-MVP)
- [ ] **Digital Gift Delivery**: Implement the logic to trigger Resend emails containing the "Strategist's Ebook" upon a successful pledge.
- [ ] **Admin Command Center**: Create a hidden, protected route (e.g., `/loki/admin`) to post updates to the Tactical Timeline via the UI.
- [ ] **Pledge Metrics**: Update the D1 schema to include `amount` and `currency` for financial tracking.
- [ ] **Supporter Arsenal**: Add a "Wall of Agents" to the LOKI page, displaying the names of top supporters.

## Phase 3: Strategic Roadmap (High-Impact)
- [ ] **Edge Tactical Analytics**: Real-time world-map visualization of clicks, devices, and recruiter engagement.
- [ ] **Branded Slugs**: Empower users to create custom aliases (e.g., `punchy.me/toy-card`).
- [ ] **QR Arsenal**: Automatically generate visually matching QR codes for every shortened link.
- [ ] **Expiry Protocols**: Add Time-to-Live (TTL) support for temporary tactical links.

## Phase 4: Design Hardening
- [ ] **Mobile UX Audit**: Refine the LOKI dual-pane layout for small-screen "Single-Column" fluidity.
- [ ] **Accessibility Strike**: Ensure all forms and timeline entries meet high-contrast accessibility standards.

---
*Status: LOKI Infrastructure Primed. 36/36 Tests Passing.*
