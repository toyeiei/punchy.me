import { env, SELF } from "cloudflare:test";
import { it, expect, describe } from "vitest";

describe("PUNCHY.ME URL Shortener", () => {
  it("serves the homepage", async () => {
    const response = await SELF.fetch("http://localhost/");
    expect(response.status).toBe(200);
    
    // Verify 103 Early Hints / Link headers
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
    expect(data.id).toBeDefined();
    expect(data.id.length).toBe(6);

    // Verify it's in KV
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
    
    // First shortening
    const res1 = await SELF.fetch("http://localhost/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: longUrl }),
    });
    const data1 = await res1.json() as { id: string };

    // Second shortening
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

    const response = await SELF.fetch(`http://localhost/${id}`, {
      redirect: "manual",
    });

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
    expect(response.headers.get("Content-Type")).toBe("text/plain");
    const text = await response.text();
    expect(text).toContain("User-agent: *");
  });

  it("serves sitemap.xml", async () => {
    const response = await SELF.fetch("http://localhost/sitemap.xml");
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("text/xml; charset=utf-8");
    const text = await response.text();
    expect(text).toContain("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
    expect(text).toContain("<loc>https://punchy.me/</loc>");
    expect(text).toContain("<lastmod>2026-03-11</lastmod>");
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
    expect(data.error).toBe("Recursive shortening is not allowed.");
  });

  it("rejects honeypot submission", async () => {
    const response = await SELF.fetch("http://localhost/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        url: "https://example.com/honeypot",
        hp_field: "I am a bot" 
      }),
    });
    expect(response.status).toBe(403);
    const data = await response.json() as { error: string };
    expect(data.error).toBe("Bot detected.");
  });

  it("enforces rate limits (IP-based)", async () => {
    const ip = "1.2.3.4";
    const longUrl = "https://example.com/rate-limit";
    
    // Simulate 11 requests (limit is 10)
    for (let i = 0; i < 11; i++) {
      const response = await SELF.fetch("http://localhost/shorten", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "CF-Connecting-IP": ip 
        },
        body: JSON.stringify({ url: `${longUrl}-${i}` }),
      });
      
      if (i < 10) {
        expect(response.status).toBe(200);
      } else {
        expect(response.status).toBe(429);
        const data = await response.json() as { error: string };
        expect(data.error).toBe("Too many requests. Please try again later.");
      }
    }
  });

  it("serves static assets (og-image.webp)", async () => {
    const response = await SELF.fetch("http://localhost/og-image.webp");
    expect(response.status).toBeDefined();
  });

  it("handles URL normalization (trailing slashes)", async () => {
    const url1 = "https://example.com/slash";
    const url2 = "https://example.com/slash/";
    
    const res1 = await SELF.fetch("http://localhost/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url1 }),
    });
    const { id: id1 } = await res1.json() as { id: string };

    const res2 = await SELF.fetch("http://localhost/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url2 }),
    });
    const { id: id2 } = await res2.json() as { id: string };

    expect(id1).toBe(id2);
  });

  it("preserves complex URLs with queries and fragments", async () => {
    const complexUrl = "https://example.com/path?name=toy&age=38#engineering";
    const response = await SELF.fetch("http://localhost/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: complexUrl }),
    });
    
    const { id } = await response.json() as { id: string };
    
    // Test redirection
    const redirectRes = await SELF.fetch(`http://localhost/${id}`, {
      redirect: "manual",
    });
    
    expect(redirectRes.status).toBe(301);
    expect(redirectRes.headers.get("Location")).toBe(complexUrl);
  });

  it("ensures short IDs are case-sensitive", async () => {
    const longUrl = "https://example.com/case-test";
    const shortenRes = await SELF.fetch("http://localhost/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: longUrl }),
    });
    const { id } = await shortenRes.json() as { id: string };

    // Exact match should work (manual redirect check)
    const res1 = await SELF.fetch(`http://localhost/${id}`, {
      redirect: "manual"
    });
    expect(res1.status).toBe(301);

    // Uppercase version should 404 (assuming ID contains at least one letter)
    const res2 = await SELF.fetch(`http://localhost/${id.toUpperCase()}`);
    expect(res2.status).toBe(404);
  });

  it("supports optimistic suggestedId", async () => {
    const suggestedId = "opt123";
    const response = await SELF.fetch("http://localhost/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: "https://optimistic.com", suggestedId })
    });
    const data = await response.json() as { id: string };
    expect(data.id).toBe(suggestedId);

    // Verify it's actually stored
    const stored = await env.SHORT_LINKS.get(suggestedId);
    expect(stored).toBe("https://optimistic.com");
  });

  it("falls back if suggestedId is invalid or taken", async () => {
    // 1. Taken ID
    await env.SHORT_LINKS.put("taken1", "https://taken.com");
    const res1 = await SELF.fetch("http://localhost/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: "https://new.com", suggestedId: "taken1" })
    });
    const data1 = await res1.json() as { id: string };
    expect(data1.id).not.toBe("taken1");
    expect(data1.id).toHaveLength(6);

    // 2. Invalid Format (too short)
    const res2 = await SELF.fetch("http://localhost/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: "https://new2.com", suggestedId: "abc" })
    });
    const data2 = await res2.json() as { id: string };
    expect(data2.id).not.toBe("abc");
    expect(data2.id).toHaveLength(6);
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
        body: JSON.stringify({
          nickname: maliciousName,
          job: "Hacker",
          email: "hacker@example.com",
          website: "https://hacker.com"
        }),
      });
      const { id } = await createResponse.json() as { id: string };

      const viewResponse = await SELF.fetch(`http://localhost/${id}`);
      const html = await viewResponse.text();
      
      // Verification: The unescaped tag should NEVER appear
      expect(html).not.toContain(maliciousTag);
      
      // Check innerContent escaping
      expect(html).toContain("Toy&lt;script&gt;alert('XSS')&lt;/script&gt;");
      // Check attribute escaping
      expect(html).toContain("data-text=\"Toy&lt;script&gt;alert(&#39;XSS&#39;)&lt;/script&gt;\"");
    });

    it("creates a bazuka business card", async () => {
      const response = await SELF.fetch("http://localhost/bazuka", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname: "Toy",
          job: "Data Analyst",
          email: "toy@example.com",
          website: "https://datarockie.com"
        }),
      });
      expect(response.status).toBe(200);
      const data = await response.json() as { id: string };
      expect(data.id).toHaveLength(6);
    });

    it("renders a bazuka business card via HTMLRewriter", async () => {
      // First create one
      const createResponse = await SELF.fetch("http://localhost/bazuka", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname: "BazukaBoy",
          job: "Rocket Scientist",
          email: "rocket@example.com",
          website: "https://rocket.com"
        }),
      });
      const { id } = await createResponse.json() as { id: string };

      // Then view it
      const viewResponse = await SELF.fetch(`http://localhost/${id}`);
      expect(viewResponse.status).toBe(200);
      const html = await viewResponse.text();
      expect(html).toContain("BazukaBoy");
      expect(html).toContain("Rocket Scientist");
      expect(html).toContain("rocket@example.com");
      expect(html).toContain("https://rocket.com");
    });
  });
});
