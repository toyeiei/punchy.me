import { env as untypedEnv, SELF } from "cloudflare:test";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Env, ZinsserSubscriber } from "../core/types";

const env = untypedEnv as unknown as Env;

// Mock global fetch for Resend API
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

describe("Zinsser Newsletter Service", () => {
  
  beforeEach(async () => {
    vi.clearAllMocks();
    
    // Clear KV
    const allKeys = await env.SHORT_LINKS.list();
    for (const key of allKeys.keys) {
      await env.SHORT_LINKS.delete(key.name);
    }

    // Default Resend mock
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: 'resend-id-123' }),
    });
  });

  describe("GET /zinsser", () => {
    it("serves the Zinsser landing page with BUILDER TIPS branding", async () => {
      const res = await SELF.fetch("http://localhost/zinsser");
      expect(res.status).toBe(200);
      expect(res.headers.get("Content-Type")).toBe("text/html");
      const html = await res.text();
      expect(html).toContain("BUILDER");
      expect(html).toContain("TIPS");
      expect(html).toContain("Zinsser Protocol");
    });
  });

  describe("POST /zinsser/subscribe", () => {
    it("processes new subscription and stores pending state in KV", async () => {
      const email = "new-builder@example.com";
      const formData = new FormData();
      formData.append("email", email);

      const res = await SELF.fetch("http://localhost/zinsser/subscribe", {
        method: "POST",
        body: formData,
      });

      expect(res.status).toBe(200);
      const html = await res.text();
      expect(html).toContain("VERIFY SIGNAL");
      expect(html).toContain(email);

      // Verify KV entry
      const kvKey = `zinsser:sub:${email}`;
      const stored = await env.SHORT_LINKS.get(kvKey);
      expect(stored).toBeTruthy();
      
      const sub = JSON.parse(stored!) as ZinsserSubscriber;
      expect(sub.email).toBe(email);
      expect(sub.status).toBe('pending');
      expect(sub.token).toHaveLength(36); // UUID length
      expect(sub.subscribedAt).toBeLessThanOrEqual(Date.now());
    });

    it("triggers confirmation email via Resend API", async () => {
      const email = "trigger@example.com";
      const formData = new FormData();
      formData.append("email", email);

      await SELF.fetch("http://localhost/zinsser/subscribe", {
        method: "POST",
        body: formData,
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.resend.com/emails',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          })
        })
      );
      
      const lastCallBody = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(lastCallBody.to).toBe(email);
      expect(lastCallBody.subject).toContain("Confirm");
      expect(lastCallBody.html).toContain("zinsser/confirm");
    });

    it("rejects invalid email formats", async () => {
      const formData = new FormData();
      formData.append("email", "not-an-email");

      const res = await SELF.fetch("http://localhost/zinsser/subscribe", {
        method: "POST",
        body: formData,
      });

      expect(res.status).toBe(400);
    });

    it("handles re-subscription of active members gracefully", async () => {
      const email = "already@active.com";
      const kvKey = `zinsser:sub:${email}`;
      
      await env.SHORT_LINKS.put(kvKey, JSON.stringify({
        type: 'zinsser:sub',
        email,
        status: 'active',
        token: 'existing-token',
        subscribedAt: Date.now()
      }));

      const formData = new FormData();
      formData.append("email", email);

      const res = await SELF.fetch("http://localhost/zinsser/subscribe", {
        method: "POST",
        body: formData,
      });

      expect(res.status).toBe(200);
      const html = await res.text();
      expect(html).toContain("VERIFY SIGNAL"); // We show success/verify page again
    });
  });

  describe("GET /zinsser/confirm", () => {
    it("activates a subscription with valid email and token", async () => {
      const email = "confirm@success.com";
      const token = "secret-uuid-123";
      const kvKey = `zinsser:sub:${email}`;
      
      await env.SHORT_LINKS.put(kvKey, JSON.stringify({
        type: 'zinsser:sub',
        email,
        status: 'pending',
        token,
        subscribedAt: Date.now()
      }));

      const res = await SELF.fetch(`http://localhost/zinsser/confirm?email=${email}&token=${token}`);
      
      expect(res.status).toBe(200);
      const html = await res.text();
      expect(html).toContain("ACTIVE SIGNAL");
      expect(html).toContain("subscription is now fully initialized");

      // Verify KV state change
      const updated = JSON.parse(await env.SHORT_LINKS.get(kvKey) || '{}') as ZinsserSubscriber;
      expect(updated.status).toBe('active');
      expect(updated.confirmedAt).toBeDefined();
    });

    it("rejects activation with mismatched token", async () => {
      const email = "confirm@fail.com";
      const token = "correct-token";
      const kvKey = `zinsser:sub:${email}`;
      
      await env.SHORT_LINKS.put(kvKey, JSON.stringify({
        type: 'zinsser:sub',
        email,
        status: 'pending',
        token,
        subscribedAt: Date.now()
      }));

      const res = await SELF.fetch(`http://localhost/zinsser/confirm?email=${email}&token=wrong-token`);
      expect(res.status).toBe(403);
      expect(await res.text()).toContain("Security token mismatch");
    });

    it("returns 404 for unknown subscribers", async () => {
      const res = await SELF.fetch("http://localhost/zinsser/confirm?email=ghost@base.com&token=any");
      expect(res.status).toBe(404);
    });

    it("handles missing parameters", async () => {
      const res = await SELF.fetch("http://localhost/zinsser/confirm?email=test@test.com");
      expect(res.status).toBe(400);
    });
  });
});
