import { env, SELF } from "cloudflare:test";
import { it, expect, describe } from "vitest";

describe("PUNCHY.ME URL Shortener", () => {
  it("serves the homepage", async () => {
    const response = await SELF.fetch("http://localhost/");
    expect(response.status).toBe(200);
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
});
