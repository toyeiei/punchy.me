import { env, SELF } from "cloudflare:test";
import { it, expect, describe, vi, beforeEach } from "vitest";

describe("PUNCHY.ME URL Shortener", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("serves the homepage", async () => {
    const response = await SELF.fetch("http://localhost/");
    expect(response.status).toBe(200);
    const linkHeader = response.headers.get("Link");
    expect(linkHeader).toContain("preconnect");
    expect(linkHeader).toContain("rel=preload");
    const text = await response.text();
    expect(text).toContain("PUNCHY.ME");
  });

  it("shortens a new URL", async () => {
    const longUrl = "https://example.com/test-tdd";
    const response = await SELF.fetch("http://localhost/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: longUrl }),
    });
    expect(response.status).toBe(200);
    const data = await response.json() as { id: string };
    expect(data.id).toHaveLength(6);
    const stored = await env.SHORT_LINKS.get(data.id);
    expect(stored).toBe(longUrl);
  });

  it("automatically prepends https:// if protocol is missing", async () => {
    const response = await SELF.fetch("http://localhost/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: "google.com" }),
    });
    const data = await response.json() as { id: string };
    const stored = await env.SHORT_LINKS.get(data.id);
    expect(stored).toBe("https://google.com");
  });

  it("returns the same ID for the same URL (Deduplication)", async () => {
    const longUrl = "https://example.com/shared";
    const res1 = await SELF.fetch("http://localhost/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: longUrl }),
    });
    const data1 = await res1.json() as { id: string };
    const res2 = await SELF.fetch("http://localhost/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: longUrl }),
    });
    const data2 = await res2.json() as { id: string };
    expect(data1.id).toBe(data2.id);
  });

  it("redirects correctly", async () => {
    const id = "redir1";
    const longUrl = "https://vitest.dev/";
    await env.SHORT_LINKS.put(id, longUrl);
    const response = await SELF.fetch(`http://localhost/${id}`, { redirect: "manual" });
    expect(response.status).toBe(301);
    expect(response.headers.get("Location")).toBe(longUrl);
  });

  it("returns 404 for unknown IDs", async () => {
    const response = await SELF.fetch("http://localhost/unknown-id");
    expect(response.status).toBe(404);
  });

  it("serves robots.txt", async () => {
    const response = await SELF.fetch("http://localhost/robots.txt");
    expect(response.status).toBe(200);
    const text = await response.text();
    expect(text).toContain("User-agent: *");
  });

  it("serves sitemap.xml", async () => {
    const response = await SELF.fetch("http://localhost/sitemap.xml");
    expect(response.status).toBe(200);
    const text = await response.text();
    expect(text).toContain("<loc>https://punchy.me/</loc>");
  });

  it("serves the favicon", async () => {
    const res1 = await SELF.fetch("http://localhost/favicon.ico");
    expect(res1.status).toBe(200);
    expect(res1.headers.get("Content-Type")).toBe("image/svg+xml");

    const res2 = await SELF.fetch("http://localhost/favicon.svg");
    expect(res2.status).toBe(200);
    expect(res2.headers.get("Content-Type")).toBe("image/svg+xml");
  });

  it("auto-fixes invalid URL by prepending https://", async () => {
    const response = await SELF.fetch("http://localhost/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: "not-a-valid-url" }),
    });
    expect(response.status).toBe(200);
    const data = await response.json() as { id: string };
    const stored = await env.SHORT_LINKS.get(data.id);
    expect(stored).toBe("https://not-a-valid-url");
  });

  it("handles malformed JSON payload", async () => {
    const response = await SELF.fetch("http://localhost/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{ invalid json: }",
    });
    expect(response.status).toBe(400);
    const data = await response.json() as { error: string };
    expect(data.error).toBe("Invalid request");
  });

  it("rejects recursive URLs (punchy.me)", async () => {
    const response = await SELF.fetch("http://localhost/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: "https://punchy.me/something" }),
    });
    expect(response.status).toBe(400);
    const data = await response.json() as { error: string };
    expect(data.error).toBe("Invalid URL.");
  });

  it("rejects honeypot submission", async () => {
    const response = await SELF.fetch("http://localhost/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: "https://example.com/honeypot", hp_field: "I am a bot" }),
    });
    expect(response.status).toBe(403);
    const data = await response.json() as { error: string };
    expect(data.error).toBe("Bot detected.");
  });

  it("enforces rate limits (IP-based)", async () => {
    const ip = "1.2.3.4";
    for (let i = 0; i < 11; i++) {
      const response = await SELF.fetch("http://localhost/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json", "CF-Connecting-IP": ip },
        body: JSON.stringify({ url: `https://example.com/rl-${i}` }),
      });
      if (i < 10) { expect(response.status).toBe(200); } 
      else { 
        expect(response.status).toBe(429);
        const data = await response.json() as { error: string };
        expect(data.error).toBe("Too many requests"); 
      }
    }
  });

  it("serves static assets (og-image.webp)", async () => {
    const response = await SELF.fetch("http://localhost/og-image.webp");
    expect(response.status).toBeDefined();
  });

  it("handles URL normalization (trailing slashes)", async () => {
    const res1 = await SELF.fetch("http://localhost/shorten", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: "https://example.com/slash" }) });
    const { id: id1 } = await res1.json() as { id: string };
    const res2 = await SELF.fetch("http://localhost/shorten", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: "https://example.com/slash/" }) });
    const { id: id2 } = await res2.json() as { id: string };
    expect(id1).toBe(id2);
  });

  it("preserves complex URLs with queries and fragments", async () => {
    const complexUrl = "https://example.com/path?name=toy&age=38#engineering";
    const res = await SELF.fetch("http://localhost/shorten", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: complexUrl }) });
    const { id } = await res.json() as { id: string };
    const redirectRes = await SELF.fetch(`http://localhost/${id}`, { redirect: "manual" });
    expect(redirectRes.headers.get("Location")).toBe(complexUrl);
  });

  it("ensures short IDs are case-sensitive", async () => {
    const shortenRes = await SELF.fetch("http://localhost/shorten", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: "https://example.com/case" }) });
    const { id } = await shortenRes.json() as { id: string };
    const res1 = await SELF.fetch(`http://localhost/${id}`, { redirect: "manual" });
    expect(res1.status).toBe(301);
    const res2 = await SELF.fetch(`http://localhost/${id.toUpperCase()}`);
    expect(res2.status).toBe(404);
  });

  it("supports optimistic suggestedId", async () => {
    const suggestedId = "opt123";
    const res = await SELF.fetch("http://localhost/shorten", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: "https://optimistic.com", suggestedId }) });
    const data = await res.json() as { id: string };
    expect(data.id).toBe(suggestedId);
    const stored = await env.SHORT_LINKS.get(suggestedId);
    expect(stored).toBe("https://optimistic.com");
  });

  it("falls back if suggestedId is invalid or taken", async () => {
    await env.SHORT_LINKS.put("taken1", "https://taken.com");
    const res1 = await SELF.fetch("http://localhost/shorten", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: "https://new.com", suggestedId: "taken1" }) });
    const data1 = await res1.json() as { id: string };
    expect(data1.id).not.toBe("taken1");
    const res2 = await SELF.fetch("http://localhost/shorten", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: "https://new2.com", suggestedId: "abc" }) });
    const data2 = await res2.json() as { id: string };
    expect(data2.id).toHaveLength(6);
  });

  it("ensures protocol prepending is idempotent (no https://https://)", async () => {
    const response = await SELF.fetch("http://localhost/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: "https://already-correct.com" }),
    });
    const data = await response.json() as { id: string };
    const stored = await env.SHORT_LINKS.get(data.id);
    expect(stored).toBe("https://already-correct.com");
    expect(stored).not.toContain("https://https://");
  });

  it("gracefully handles corrupted JSON in dynamic routes", async () => {
    const id = "corrupt";
    await env.SHORT_LINKS.put(id, "{ invalid json }");
    const response = await SELF.fetch(`http://localhost/${id}`, { redirect: "manual" });
    expect(response.status).not.toBe(500);
  });

  it("serves the favicon with correct content-type", async () => {
    const response = await SELF.fetch("http://localhost/favicon.svg");
    expect(response.headers.get("Content-Type")).toBe("image/svg+xml");
  });

  describe("BAZUKA Feature", () => {
    it("serves the bazuka form", async () => {
      const response = await SELF.fetch("http://localhost/bazuka");
      expect(response.status).toBe(200);
      const text = await response.text();
      expect(text).toContain("BAZUKA");
    });

    it("prevents XSS/HTML injection in cards", async () => {
      const maliciousTag = "<script>alert('XSS')</script>";
      const maliciousName = `Toy${maliciousTag}`;
      const createResponse = await SELF.fetch("http://localhost/bazuka", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname: maliciousName, job: "Hacker", email: "hacker@example.com", website: "https://hacker.com" }),
      });
      const { id } = await createResponse.json() as { id: string };
      const viewResponse = await SELF.fetch(`http://localhost/${id}`);
      const html = await viewResponse.text();
      expect(html).not.toContain(maliciousTag);
      expect(html).toContain("Toy&lt;script&gt;alert('XSS')&lt;/script&gt;");
    });

    it("creates a bazuka business card", async () => {
      const response = await SELF.fetch("http://localhost/bazuka", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname: "Toy", job: "Data Analyst", email: "toy@example.com", website: "https://datarockie.com" }),
      });
      expect(response.status).toBe(200);
      const data = await response.json() as { id: string };
      expect(data.id).toHaveLength(6);
    });

    it("renders a bazuka business card via HTMLRewriter", async () => {
      const createResponse = await SELF.fetch("http://localhost/bazuka", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname: "BazukaBoy", job: "Rocket Scientist", email: "rocket@example.com", website: "https://rocket.com" }),
      });
      const { id } = await createResponse.json() as { id: string };
      const viewResponse = await SELF.fetch(`http://localhost/${id}`);
      const html = await viewResponse.text();
      expect(html).toContain("BazukaBoy");
      expect(html).toContain("Rocket Scientist");
      expect(html).toContain("rocket@example.com");
      expect(html).toContain("https://rocket.com");
    });
  });

  describe("ANAKIN Feature", () => {
    it("serves the anakin form", async () => {
      const response = await SELF.fetch("http://localhost/anakin");
      expect(response.status).toBe(200);
      const text = await response.text();
      expect(text).toContain("ANAKIN");
      expect(text).toContain("Full Name");
    });

    it("creates an AI resume (Anakin Forge)", async () => {
      const aiSpy = vi.spyOn(env.AI, 'run').mockResolvedValue({
        response: "[SUMMARY] Mocked AI Summary [/SUMMARY] [EXPERIENCE] Mocked Bullet points [/EXPERIENCE]"
      });
      const response = await SELF.fetch("http://localhost/anakin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Anakin Skywalker", job: "Jedi Knight", email: "anakin@force.com", website: "https://force.com", education: "Jedi Academy", skills: "Force", experience: "Raw history" }),
      });
      expect(response.status).toBe(200);
      const data = await response.json() as { id: string };
      expect(data.id).toHaveLength(6);
      expect(aiSpy).toHaveBeenCalled();
      const viewRes = await SELF.fetch(`http://localhost/${data.id}`);
      const html = await viewRes.text();
      expect(html).toContain("Anakin Skywalker");
      expect(html).toContain("Mocked AI Summary");
      expect(html).toContain("Built with ⚡ by Toy & Gemini CLI");
      expect(html).toContain("Portfolio");
      expect(html).toContain("FORGED BY ANAKIN AI • POWERED BY PUNCHY.ME");
      expect(html).toContain("print-footer");
    });

    it("enforces 500 character limits for education and skills", async () => {
      const longText = "a".repeat(501);
      const response = await SELF.fetch("http://localhost/anakin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Toy",
          job: "Data Analyst",
          email: "toy@example.com",
          website: "https://toy.com",
          education: longText,
          skills: "Skill",
          experience: "Exp"
        }),
      });
      expect(response.status).toBe(400);
      const data = await response.json() as { error: string };
      expect(data.error).toBe("Input fields must be under 500 characters each.");
    });
  });
});
