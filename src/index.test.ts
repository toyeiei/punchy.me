import { env, SELF } from "cloudflare:test";
import { it, expect, describe, vi, beforeEach } from "vitest";

describe("PUNCHY.ME URL Shortener", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("serves the homepage", async () => {
    const response = await SELF.fetch("http://localhost/");
    expect(response.status).toBe(200);
    const text = await response.text();
    expect(text).toContain("PUNCHY.ME");
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
