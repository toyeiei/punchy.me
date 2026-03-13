import { env, SELF } from "cloudflare:test";
import { it, expect, describe, vi, beforeEach } from "vitest";

describe("PUNCHY.ME URL Shortener", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("Shortener Core", () => {
    it("serves the homepage", async () => {
      const response = await SELF.fetch("http://localhost/");
      expect(response.status).toBe(200);
      const text = await response.text();
      expect(text).toContain("PUNCHY.ME");
    });

    it("shortens a valid URL and redirects correctly", async () => {
      const longUrl = "https://example.com/very/long/url";
      const response = await SELF.fetch("http://localhost/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: longUrl }),
      });
      
      expect(response.status).toBe(200);
      const { id } = await response.json() as { id: string };
      expect(id).toHaveLength(6);

      const redirectRes = await SELF.fetch(`http://localhost/${id}`, { redirect: "manual" });
      expect(redirectRes.status).toBe(301);
      expect(redirectRes.headers.get("Location")).toBe(longUrl);
    });

    it("automatically prepends https:// if missing", async () => {
      const response = await SELF.fetch("http://localhost/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: "google.com" }),
      });
      const { id } = await response.json() as { id: string };
      const redirectRes = await SELF.fetch(`http://localhost/${id}`, { redirect: "manual" });
      expect(redirectRes.headers.get("Location")).toBe("https://google.com/");
    });

    it("implements KV Resilience (Double-Lock) on redirection", async () => {
      const id = "retry-id";
      const target = "https://retry-success.com";
      
      // 1. Start a fetch in parallel
      const fetchPromise = SELF.fetch(`http://localhost/${id}`, { redirect: "manual" });
      
      // 2. Delay the KV insertion by 200ms (Worker retries after 500ms)
      await new Promise(resolve => setTimeout(resolve, 200));
      await env.SHORT_LINKS.put(id, target);

      const response = await fetchPromise;
      expect(response.status).toBe(301);
      expect(response.headers.get("Location")).toBe(target + "/");
    });

    it("normalizes trailing slashes for deduplication", async () => {
      const res1 = await SELF.fetch("http://localhost/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: "https://toy.me/" }),
      });
      const { id: id1 } = await res1.json() as { id: string };

      const res2 = await SELF.fetch("http://localhost/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: "https://toy.me" }),
      });
      const { id: id2 } = await res2.json() as { id: string };

      expect(id1).toBe(id2);
    });

    it("rejects recursive shortening of punchy.me links", async () => {
      const response = await SELF.fetch("http://localhost/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: "https://punchy.me/xyz" }),
      });
      expect(response.status).toBe(400);
    });

    it("rejects bot submissions (honeypot)", async () => {
      const response = await SELF.fetch("http://localhost/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: "https://google.com", hp_field: "i-am-a-bot" }),
      });
      expect(response.status).toBe(403);
    });

    it("enforces IP-based rate limiting (10 req/min)", async () => {
      const longUrl = "https://test.com";
      // Perform 10 requests (Rate limit is 10)
      for (let i = 0; i < 10; i++) {
        await SELF.fetch("http://localhost/shorten", {
          method: "POST",
          headers: { "Content-Type": "application/json", "CF-Connecting-IP": "1.2.3.4" },
          body: JSON.stringify({ url: `${longUrl}/${i}` }),
        });
      }
      
      // 11th request should fail
      const response = await SELF.fetch("http://localhost/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json", "CF-Connecting-IP": "1.2.3.4" },
        body: JSON.stringify({ url: "https://fail.com" }),
      });
      expect(response.status).toBe(429);
    });

    it("respects suggested ID and handles collisions", async () => {
      const suggested = "custom";
      const res1 = await SELF.fetch("http://localhost/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: "https://first.com", suggestedId: suggested }),
      });
      const { id: id1 } = await res1.json() as { id: string };
      expect(id1).toBe(suggested);

      // Second attempt with same suggested ID should fallback to random
      const res2 = await SELF.fetch("http://localhost/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: "https://second.com", suggestedId: suggested }),
      });
      const { id: id2 } = await res2.json() as { id: string };
      expect(id2).not.toBe(suggested);
      expect(id2).toHaveLength(6);
    });

    it("handles malformed JSON payloads", async () => {
      const response = await SELF.fetch("http://localhost/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "not-json",
      });
      expect(response.status).toBe(400);
    });
  });

  describe("BAZUKA Feature", () => {
    it("creates and renders a business card", async () => {
      const response = await SELF.fetch("http://localhost/bazuka", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname: "Toy", job: "Analyst", email: "toy@example.com", website: "https://toy.me" }),
      });
      const data = await response.json() as { id: string };
      const view = await SELF.fetch(`http://localhost/${data.id}`);
      const html = await view.text();
      expect(html).toContain("Toy");
      expect(html).toContain("Analyst");
    });
  });

  describe("ANAKIN Feature (Portal Strategy)", () => {
    const validPayload = { 
      name: "Anakin Skywalker", 
      job: "Jedi Knight", 
      email: "anakin@force.com", 
      website: "https://force.com", 
      education: "Jedi Academy", 
      skills: "Force", 
      experience: "Raw history" 
    };

    it("implements the full Anakin Portal lifecycle", async () => {
      // 1. Initial Submission
      const response = await SELF.fetch("http://localhost/anakin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validPayload),
      });
      expect(response.status).toBe(200);
      const data = await response.json() as { id: string };
      const id = data.id;

      // 2. Initial View (Pending)
      const viewRes = await SELF.fetch(`http://localhost/${id}`);
      const html = await viewRes.text();
      expect(html).toContain("Anakin Skywalker");
      expect(html).toContain("Refining professional profile...");

      // 3. Hydration
      const aiSpy = vi.spyOn(env.AI, 'run').mockResolvedValue({
        response: "[SUMMARY] Elite Forged Summary [/SUMMARY] [EXPERIENCE] AI Bullet Points [/EXPERIENCE]"
      });
      
      const hydrateRes = await SELF.fetch(`http://localhost/anakin/hydrate/${id}`, { method: "POST" });
      expect(hydrateRes.status).toBe(200);
      expect(aiSpy).toHaveBeenCalled();

      // 4. Final View (Check if placeholder is replaced)
      const finalRes = await SELF.fetch(`http://localhost/${id}`);
      const finalHtml = await finalRes.text();
      expect(finalHtml).toContain("Elite Forged Summary");
      expect(finalHtml).not.toContain("Refining professional profile...");
    });

    it("ensures hydration is idempotent", async () => {
      const response = await SELF.fetch("http://localhost/anakin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validPayload),
      });
      const { id } = await response.json() as { id: string };

      const aiSpy = vi.spyOn(env.AI, 'run').mockResolvedValue({
        response: "[SUMMARY] Run 1 [/SUMMARY] [EXPERIENCE] Bullets [/EXPERIENCE]"
      });

      await SELF.fetch(`http://localhost/anakin/hydrate/${id}`, { method: "POST" });
      expect(aiSpy).toHaveBeenCalledTimes(1);

      const res2 = await SELF.fetch(`http://localhost/anakin/hydrate/${id}`, { method: "POST" });
      const data2 = await res2.json() as { aiSummary: string };
      expect(data2.aiSummary).toBe("Run 1");
      expect(aiSpy).toHaveBeenCalledTimes(1);
    });

    it("rejects hydration for non-existent IDs", async () => {
      const response = await SELF.fetch("http://localhost/anakin/hydrate/fake123", { method: "POST" });
      expect(response.status).toBe(404);
    });

    it("rejects hydration for non-Anakin types", async () => {
      await env.SHORT_LINKS.put("link", "https://google.com");
      const response = await SELF.fetch("http://localhost/anakin/hydrate/link", { method: "POST" });
      expect(response.status).toBe(400);
    });

    it("enforces 500 character limits on experience", async () => {
      const longText = "a".repeat(501);
      const response = await SELF.fetch("http://localhost/anakin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...validPayload, experience: longText }),
      });
      expect(response.status).toBe(400);
    });
  });
});
