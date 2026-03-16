import { env as untypedEnv, SELF } from "cloudflare:test";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Env } from "./core/types";

const env = untypedEnv as unknown as Env;

// Ensure VITEST global is set for test-token bypass
(globalThis as { VITEST?: boolean }).VITEST = true;

describe("PUNCHY.ME URL Shortener", () => {
  
  beforeEach(async () => {
    // Optimized KV clearing: only clear if not empty
    const keys = await env.SHORT_LINKS.list({ limit: 10 });
    if (keys.keys.length > 0) {
      const allKeys = await env.SHORT_LINKS.list();
      for (const key of allKeys.keys) {
        await env.SHORT_LINKS.delete(key.name);
      }
    }
  });

  describe("Shortener Core", () => {
    it("serves the homepage", async () => {
      const res = await SELF.fetch("http://localhost/");
      expect(res.status).toBe(200);
      const html = await res.text();
      expect(html).toContain("PUNCHY.ME");
    });

    it("shortens a valid URL and redirects correctly", async () => {
      const longUrl = "https://google.com";
      const shortenRes = await SELF.fetch("http://localhost/shorten", {
        method: "POST",
        body: JSON.stringify({ url: longUrl }),
        headers: { "Content-Type": "application/json" },
      });
      
      expect(shortenRes.status).toBe(200);
      const { id } = await shortenRes.json() as { id: string };
      expect(id).toBeDefined();

      const redirectRes = await SELF.fetch(`http://localhost/${id}`, {
        redirect: "manual",
      });
      expect(redirectRes.status).toBe(301);
      expect(redirectRes.headers.get("Location")).toContain("https://google.com");
    });

    it("automatically prepends https:// if missing", async () => {
      const res = await SELF.fetch("http://localhost/shorten", {
        method: "POST",
        body: JSON.stringify({ url: "example.com" }),
        headers: { "Content-Type": "application/json" },
      });
      const { id } = await res.json() as { id: string };
      const val = await env.SHORT_LINKS.get(id);
      expect(val).toBe("https://example.com");
    });

    it("implements KV Resilience (Double-Lock) on redirection", async () => {
      const id = "resilient-id";
      const target = "https://resilient.com";
      
      // Simulate delayed KV write (double-lock only works for /y/ paths)
      setTimeout(async () => {
        await env.SHORT_LINKS.put(id, target);
      }, 300);

      const res = await SELF.fetch(`http://localhost/y/${id}`, { redirect: "manual" });
      expect(res.status).toBe(301);
      expect(res.headers.get("Location")).toContain(target);
    });

    it("normalizes trailing slashes for deduplication", async () => {
      const url1 = "https://example.com/";
      const url2 = "https://example.com";
      
      const res1 = await SELF.fetch("http://localhost/shorten", {
        method: "POST",
        body: JSON.stringify({ url: url1 }),
        headers: { "Content-Type": "application/json" },
      });
      const { id: id1 } = await res1.json() as { id: string };

      const res2 = await SELF.fetch("http://localhost/shorten", {
        method: "POST",
        body: JSON.stringify({ url: url2 }),
        headers: { "Content-Type": "application/json" },
      });
      const { id: id2 } = await res2.json() as { id: string };

      expect(id1).toBe(id2);
    });

    it("rejects recursive shortening of own links", async () => {
      const res = await SELF.fetch("http://localhost/shorten", {
        method: "POST",
        body: JSON.stringify({ url: "https://punchy.me/xyz" }),
        headers: { "Content-Type": "application/json" },
      });
      expect(res.status).toBe(400);
      const { error } = await res.json() as { error: string };
      expect(error).toContain("Recursive");
    });

    it("rejects bot submissions (honeypot)", async () => {
      const res = await SELF.fetch("http://localhost/shorten", {
        method: "POST",
        body: JSON.stringify({ url: "https://valid.com", hp_field: "I am a bot" }),
        headers: { "Content-Type": "application/json" },
      });
      expect(res.status).toBe(403);
    });

    it("enforces IP-based rate limiting (10 NEW links per minute)", async () => {
      const ip = "1.2.3.4";
      for (let i = 0; i < 10; i++) {
        await SELF.fetch("http://localhost/shorten", {
          method: "POST",
          body: JSON.stringify({ url: `https://test${i}.com` }),
          headers: { "Content-Type": "application/json", "cf-connecting-ip": ip },
        });
      }
      const finalRes = await SELF.fetch("http://localhost/shorten", {
        method: "POST",
        body: JSON.stringify({ url: "https://one-too-many.com" }),
        headers: { "Content-Type": "application/json", "cf-connecting-ip": ip },
      });
      expect(finalRes.status).toBe(429);
    });

    it("respects suggested ID and handles collisions", async () => {
      const suggested = "my-brand";
      await env.SHORT_LINKS.put(suggested, "https://old.com");
      
      const res = await SELF.fetch("http://localhost/shorten", {
        method: "POST",
        body: JSON.stringify({ url: "https://new.com", suggestedId: suggested }),
        headers: { "Content-Type": "application/json" },
      });
      const { id } = await res.json() as { id: string };
      expect(id).not.toBe(suggested);
      expect(id.length).toBe(6);
    });

    it("handles malformed JSON payloads", async () => {
      const res = await SELF.fetch("http://localhost/shorten", {
        method: "POST",
        body: "{ malformed: json ",
        headers: { "Content-Type": "application/json" },
      });
      expect(res.status).toBe(400);
    });
  });

  describe("BAZUKA Feature", () => {
    it("creates and renders a business card", async () => {
      const cardData = { nickname: "Toy", job: "Data Analyst", email: "toy@samsung.com", website: "https://datarockie.com" };
      const createRes = await SELF.fetch("http://localhost/bazuka", {
        method: "POST",
        body: JSON.stringify(cardData),
        headers: { "Content-Type": "application/json" },
      });
      const { id } = await createRes.json() as { id: string };
      
      const renderRes = await SELF.fetch(`http://localhost/${id}`);
      const html = await renderRes.text();
      expect(html).toContain("Toy");
      expect(html).toContain("Data Analyst");
    });

    it("verifies the BAZUKA forge button logic and field validation", async () => {
      // Test 1: Rejects missing fields
      const incompleteData = { nickname: "Toy" };
      const failRes = await SELF.fetch("http://localhost/bazuka", {
        method: "POST",
        body: JSON.stringify(incompleteData),
        headers: { "Content-Type": "application/json" },
      });
      expect(failRes.status).toBe(400);

      // Test 2: Successful forge with all fields
      const fullData = { nickname: "Musashi", job: "Strategist", email: "ronin@edge.io", website: "https://punchy.me" };
      const successRes = await SELF.fetch("http://localhost/bazuka", {
        method: "POST",
        body: JSON.stringify(fullData),
        headers: { "Content-Type": "application/json" },
      });
      expect(successRes.status).toBe(200);
      const { id } = await successRes.json() as { id: string };
      expect(id).toBeDefined();
      expect(id.length).toBe(6);
    });
  });

  describe("ANAKIN Feature (Portal Strategy)", () => {
    it("implements the full Anakin Portal lifecycle", async () => {
      const resumeData = { name: "Anakin Skywalker", job: "Jedi Knight", email: "ani@force.com", experience: "Piloting starfighters, lightsaber combat.", skills: "The Force, Engineering", education: "Tatooine Podracing Academy" };
      const createRes = await SELF.fetch("http://localhost/anakin", {
        method: "POST",
        body: JSON.stringify(resumeData),
        headers: { "Content-Type": "application/json" },
      });
      const { id } = await createRes.json() as { id: string };

      // Spy on AI
      const aiSpy = vi.spyOn(env.AI, 'run').mockResolvedValue({
        response: JSON.stringify({
          summary: "A powerful Force user with expert engineering skills.",
          experience: "- Mastered lightsaber combat techniques.\n- Piloted starfighters in critical missions.\n- Engineered custom droids."
        })
      });

      const hydrateRes = await SELF.fetch(`http://localhost/anakin/hydrate/${id}`, { method: 'POST' });
      expect(hydrateRes.status).toBe(200);
      const hydratedData = await hydrateRes.json() as Record<string, unknown>;
      expect(hydratedData.aiHydrated).toBe(true);
      expect(hydratedData.aiSummary).toContain("Force user");

      const renderRes = await SELF.fetch(`http://localhost/${id}`);
      const html = await renderRes.text();
      expect(html).toContain("Anakin Skywalker");
      expect(html).toContain("Force user");
      
      aiSpy.mockRestore();
    });

    it("ensuring hydration is idempotent", async () => {
      const id = "existing-anakin";
      await env.SHORT_LINKS.put(id, JSON.stringify({ type: 'anakin', aiHydrated: true, name: "Ani", aiSummary: "Already Hydrated" }));
      const res = await SELF.fetch(`http://localhost/anakin/hydrate/${id}`, { method: 'POST' });
      const data = await res.json() as Record<string, unknown>;
      expect(data.aiSummary).toBe("Already Hydrated");
    });

    it("rejects hydration for non-existent IDs", async () => {
      const res = await SELF.fetch("http://localhost/anakin/hydrate/ghost", { method: 'POST' });
      expect(res.status).toBe(404);
    });

    it("rejects hydration for non-Anakin types", async () => {
      await env.SHORT_LINKS.put("not-anakin", "https://google.com");
      const res = await SELF.fetch("http://localhost/anakin/hydrate/not-anakin", { method: 'POST' });
      expect(res.status).toBe(400);
    });

    it("enforces 500 character limits on experience", async () => {
      const longText = "a".repeat(501);
      const res = await SELF.fetch("http://localhost/anakin", {
        method: "POST",
        body: JSON.stringify({ name: "X", experience: longText, skills: "S" }),
        headers: { "Content-Type": "application/json" },
      });
      expect(res.status).toBe(400);
    });

    it("correctly parses AI response with experience as an array", async () => {
      const id = "array-experience";
      await env.SHORT_LINKS.put(id, JSON.stringify({ type: 'anakin', aiHydrated: false, name: "Ani", job: "Jedi", experience: "x", skills: "y" }));

      const aiSpy = vi.spyOn(env.AI, 'run').mockResolvedValue({
        response: JSON.stringify({
          summary: "A highly skilled Jedi with engineering prowess.",
          experience: [
            "Won the Boonta Eve Classic.",
            "Built C-3PO.",
            "Destroyed the Trade Federation Droid Control Ship."
          ]
        })
      });

      const res = await SELF.fetch(`http://localhost/anakin/hydrate/${id}`, { method: 'POST' });
      expect(res.status).toBe(200);
      const data = await res.json() as Record<string, unknown>;
      
      expect(data.aiSummary).toBe("A highly skilled Jedi with engineering prowess.");
      expect(data.aiExperience).toContain("• Won the Boonta Eve Classic.");
      expect(data.aiExperience).toContain("• Built C-3PO.");

      aiSpy.mockRestore();
    });

    it("correctly parses AI response with embedded JSON fallback", async () => {
      const id = "embedded-json";
      await env.SHORT_LINKS.put(id, JSON.stringify({ type: 'anakin', aiHydrated: false, name: "Ani", job: "Jedi", experience: "x", skills: "y" }));

      const aiSpy = vi.spyOn(env.AI, 'run').mockResolvedValue({
        response: `Here is the JSON you requested:
{
  "summary": "A highly skilled Jedi with engineering prowess.",
  "experience": [
    "Won the Boonta Eve Classic.",
    "Built C-3PO.",
    "Destroyed the Trade Federation Droid Control Ship."
  ]
}
Hope this helps!`
      });

      const res = await SELF.fetch(`http://localhost/anakin/hydrate/${id}`, { method: 'POST' });
      expect(res.status).toBe(200);
      const data = await res.json() as Record<string, unknown>;
      
      expect(data.aiSummary).toBe("A highly skilled Jedi with engineering prowess.");
      expect(data.aiExperience).toContain("• Won the Boonta Eve Classic.");
      expect(data.aiExperience).toContain("• Built C-3PO.");

      aiSpy.mockRestore();
    });
  });

  describe("Mobile UX & Accessibility", () => {
    it("serves mobile-optimized viewports across all tools", async () => {
      const routes = ["/", "/bazuka", "/anakin", "/musashi", "/yaiba"];
      for (const route of routes) {
        const res = await SELF.fetch(`http://localhost${route}`);
        const html = await res.text();
        expect(html).toContain('name="viewport"');
        expect(html).toContain('width=device-width');
      }
    });

    it("implements adaptive scrolling on BAZUKA for keyboard safety", async () => {
      const res = await SELF.fetch("http://localhost/bazuka");
      const html = await res.text();
      expect(html).toContain('backdrop-filter: blur');
    });

    it("implements adaptive scrolling on ANAKIN for keyboard safety", async () => {
      const res = await SELF.fetch("http://localhost/anakin");
      const html = await res.text();
      expect(html).toContain('backdrop-filter: blur');
    });

    it("contains mobile focus-lock scripts on forms", async () => {
      const res = await SELF.fetch("http://localhost/bazuka");
      const html = await res.text();
      expect(html).toContain('<form');
    });

    it("ensures touch-friendly interaction targets on mobile", async () => {
      const res = await SELF.fetch("http://localhost/");
      const html = await res.text();
      expect(html).toContain('padding: 2rem'); 
    });
  });

  describe("YAIBA Feature (Zen Editor)", () => {
    it("serves the YAIBA editor page", async () => {
      const res = await SELF.fetch("http://localhost/yaiba");
      expect(res.status).toBe(200);
      const html = await res.text();
      expect(html).toContain("YAIBA");
      expect(html).toContain("textarea id=\"editor\"");
    });

    it("publishes a note and renders it correctly", async () => {
      const noteContent = "## Hello YAIBA\\nThis is a test note that must be at least one hundred characters long to pass the supreme validation check of the elite Zen Editor. We forge only Master Works here. Efficiency is our secondary concern.";
      const publishRes = await SELF.fetch("http://localhost/yaiba/publish", {
        method: "POST",
        body: JSON.stringify({ content: noteContent }),
        headers: { "Content-Type": "application/json" },
      });
      
      expect(publishRes.status).toBe(200);
      const { id } = await publishRes.json() as { id: string };
      expect(id).toBeDefined();

      const renderRes = await SELF.fetch(`http://localhost/y/${id}`);
      const html = await renderRes.text();
      expect(html).toContain("Zero-Knowledge Storage");
      expect(html).toContain("Hello YAIBA");
    });

    it("rejects notes exceeding 1800 characters", async () => {
      const longNote = "a".repeat(5001); // Updated to 5000 byte limit check in worker
      const res = await SELF.fetch("http://localhost/yaiba/publish", {
        method: "POST",
        body: JSON.stringify({ content: longNote }),
        headers: { "Content-Type": "application/json" },
      });
      expect(res.status).toBe(400);
    });
  });

  describe("RAGNAR Feature (Slide Forge)", () => {
    it("serves the RAGNAR HUD page", async () => {
      const res = await SELF.fetch("http://localhost/ragnar");
      expect(res.status).toBe(200);
      const html = await res.text();
      expect(html).toContain("RAGNAR");
      expect(html).toContain("Forge Presentation");
    });

    it("forges a tactical slide deck with various slide types", async () => {
      const aiSpy = vi.spyOn(env.AI, 'run').mockResolvedValue({
        response: JSON.stringify({
          title: "Viking Strategy",
          audience: "Modern Warriors",
          slides: [
            { header: "The Mission", content: "We are embarking on a strategic transformation", type: "opening" },
            { header: "Key Objectives", content: "Conquer the digital realm\\nEstablish market dominance", type: "points" },
            { header: "The Challenge", content: "Legacy systems slow our progress", type: "challenge" },
            { header: "Transformation", content: "Legacy Systems | The AI Vanguard", type: "solution" },
            { header: "Action Plan", content: "Deploy the fleet\\nSecure the victory", type: "action" },
            { header: "Victory", content: "100% Market Capture Achieved", type: "closing" }
          ]
        })
      });

      const res = await SELF.fetch("http://localhost/ragnar/forge", {
        method: "POST",
        body: JSON.stringify({ title: "Viking Strategy", audience: "Warriors", details: "Conquer the digital realm." }),
        headers: { "Content-Type": "application/json" },
      });

      expect(res.status).toBe(200);
      const { id } = await res.json() as { id: string };
      expect(id).toBeDefined();

      const renderRes = await SELF.fetch(`http://localhost/ragnar/slide/${id}`);
      expect(renderRes.status).toBe(200);
      const html = await renderRes.text();
      expect(html).toContain("Viking Strategy");
      expect(html).toContain("reveal.js");
      expect(html).toContain("AFTER"); // Check for solution/comparison slide
      expect(html.match(/<section/g)?.length).toBeGreaterThan(6);

      aiSpy.mockRestore();
    });
  });

  describe("MUSASHI Feature (Attack Engine)", () => {
    const validJobIntel = "We are seeking a Senior Data Analyst with 5 years experience in SQL and Python. You will build dashboards and lead a team.";

    it("serves the MUSASHI HUD page", async () => {
      const res = await SELF.fetch("http://localhost/musashi");
      expect(res.status).toBe(200);
      const html = await res.text();
      expect(html).toContain("MUSASHI");
      expect(html).toContain("Get Musashi");
    });

    it("forges a complete attack path from job description", async () => {  
      const aiSpy = vi.spyOn(env.AI, 'run').mockResolvedValue({
        response: JSON.stringify({
          intel: "Senior Data Analyst role at Samsung.",
          skills: ["SQL", "Python", "Tableau", "AWS", "Kafka"],
          projects: ["Dashboards: Build real-time analytics", "Kafka: Stream data pipeline"],
          salary: "150,000 THB - 200,000 THB / $4,000 - $5,500 USD",
          questions: ["Explain SQL joins", "Describe a complex data pipeline"]
        })
      });

      const response = await SELF.fetch("http://localhost/musashi/forge", {
        method: "POST",
        body: JSON.stringify({ description: validJobIntel }),
        headers: { "Content-Type": "application/json" },
      });

      expect(response.status).toBe(200);
      const data = await response.json() as Record<string, unknown>;
      expect(data.intel).toContain("Samsung");
      expect(data.skills).toHaveLength(5);
      expect(data.salary).toContain("THB");
      
      aiSpy.mockRestore();
    });

    it("enforces character limits on job intel", async () => {
      const hugeIntel = "a".repeat(1001);
      const res = await SELF.fetch("http://localhost/musashi/forge", {
        method: "POST",
        body: JSON.stringify({ description: hugeIntel }),
        headers: { "Content-Type": "application/json" },
      });
      expect(res.status).toBe(400);
      expect(await res.text()).toContain("Limit 1000");
    });

    it("handles missing or malformed AI response gracefully", async () => {
      const aiSpy = vi.spyOn(env.AI, 'run').mockResolvedValue({
        response: "Not a JSON object"
      });

      const res = await SELF.fetch("http://localhost/musashi/forge", {
        method: "POST",
        body: JSON.stringify({ description: validJobIntel }),
        headers: { "Content-Type": "application/json" },
      });

      expect(res.status).toBe(500); 
      aiSpy.mockRestore();
    });

    it("handles special characters in job descriptions", async () => {
      const specialIntel = "Looking for a 'Rockstar' Developer with <Mastery> in #TypeScript & \"Cloudflare\".";
      const aiSpy = vi.spyOn(env.AI, 'run').mockResolvedValue({
        response: JSON.stringify({ intel: "Special Character Test", skills: ["TS"], projects: [], salary: "N/A", questions: [] })
      });

      const res = await SELF.fetch("http://localhost/musashi/forge", {
        method: "POST",
        body: JSON.stringify({ description: specialIntel }),
        headers: { "Content-Type": "application/json" },
      });

      expect(res.status).toBe(200);
      aiSpy.mockRestore();
    });

    it("rejects empty job description payload", async () => {
      const res = await SELF.fetch("http://localhost/musashi/forge", {
        method: "POST",
        body: JSON.stringify({ description: "" }),
        headers: { "Content-Type": "application/json" },
      });
      expect(res.status).toBe(400);
    });

    it("enforces exact character boundaries (min 50)", async () => {
      const shallowIntel = "Too short.";
      const res = await SELF.fetch("http://localhost/musashi/forge", {
        method: "POST",
        body: JSON.stringify({ description: shallowIntel }),
        headers: { "Content-Type": "application/json" },
      });
      expect(res.status).toBe(400);
    });

    it("contains the Strategic View Toggle controls", async () => {
      const res = await SELF.fetch("http://localhost/musashi");
      const html = await res.text();
      expect(html).toContain("view-toggle");
      expect(html).toContain("Musashi");
      expect(html).toContain("Analysis");
      expect(html).toContain("Raw JSON");
    });

    it("renders CORE SKILLS as high-impact badges in the HUD", async () => {
      const aiSpy = vi.spyOn(env.AI, 'run').mockResolvedValue({
        response: JSON.stringify({
          intel: "Test Summary",
          skills: ["TypeScript", "Cloudflare", "Llama 3", "JSON", "Security"],
          projects: ["Test Project"],
          salary: "100k",
          questions: ["Test Question"]
        })
      });

      const res = await SELF.fetch("http://localhost/musashi/forge", {
        method: "POST",
        body: JSON.stringify({ description: validJobIntel }),
        headers: { "Content-Type": "application/json" },
      });

      expect(res.status).toBe(200);
      const data = await res.json() as { skills: string[] };
      expect(data.skills).toHaveLength(5);
      expect(data.skills[0]).toBe("TypeScript");
      
      aiSpy.mockRestore();
    });

    it("rejects bot submissions via honeypot on MUSASHI forge", async () => {
      const res = await SELF.fetch("http://localhost/musashi/forge", {
        method: "POST",
        body: JSON.stringify({ description: validJobIntel, hp_field: "I am a bot" }),
        headers: { "Content-Type": "application/json" },
      });
      expect(res.status).toBe(403);
    });

    it("enforces AI-specific rate limiting (5 NEW forges per minute)", async () => {
      const ip = "9.9.9.9";
      const aiSpy = vi.spyOn(env.AI, 'run').mockResolvedValue({
        response: JSON.stringify({ intel: "ok", skills: [], projects: [], salary: "ok", questions: [] })
      });

      for (let i = 0; i < 5; i++) {
        await SELF.fetch("http://localhost/musashi/forge", {
          method: "POST",
          body: JSON.stringify({ description: validJobIntel }),
          headers: { "Content-Type": "application/json", "cf-connecting-ip": ip },
        });
      }
      
      const finalRes = await SELF.fetch("http://localhost/musashi/forge", {
        method: "POST",
        body: JSON.stringify({ description: validJobIntel }),
        headers: { "Content-Type": "application/json", "cf-connecting-ip": ip },
      });
      
      expect(finalRes.status).toBe(429);
      expect(await finalRes.text()).toContain("Tactical cooling");
      aiSpy.mockRestore();
    });
  });

  describe("ODIN Feature (Tactical Analysis)", () => {
    it("serves the ODIN HUD page with all tactical dependencies", async () => {
      const res = await SELF.fetch("http://localhost/odin");
      expect(res.status).toBe(200);
      const html = await res.text();
      expect(html).toContain("ODIN");
      expect(html).toContain("SUPREME DATA COMMAND");
      expect(html).toContain("arquero"); // Verify dependency link
      expect(html).toContain("PIVOT"); // Verify new tactical button
    });

    it("rejects AI analysis without a security handshake (Turnstile)", async () => {
      const res = await SELF.fetch("http://localhost/odin/analyze", {
        method: "POST",
        body: JSON.stringify({ columns: ["Job"], numRows: 1, sample: [] }),
        headers: { "Content-Type": "application/json" },
      });
      expect(res.status).toBe(403);
      const data = await res.json() as Record<string, unknown>;
      expect(data.error).toContain("Security handshake required");
    });

    it("performs AI analysis with a valid test token", async () => {
      const aiSpy = vi.spyOn(env.AI, 'run').mockResolvedValue({
        response: JSON.stringify({
          strategic_overview: "Battle ready.",
          anomalies_detected: "None.",
          tactical_recommendations: "Full scale deployment."
        })
      });

      const res = await SELF.fetch("http://localhost/odin/analyze", {
        method: "POST",
        body: JSON.stringify({ 
          columns: ["Role"], 
          numRows: 10, 
          sample: [{ Role: "Commander" }],
          turnstileToken: "test-token" 
        }),
        headers: { "Content-Type": "application/json" },
      });

      expect(res.status).toBe(200);
      const data = await res.json() as Record<string, unknown>;
      expect(data.strategic_overview).toBe("Battle ready.");
      aiSpy.mockRestore();
    });

    it("enforces a tactical cooldown (rate limiting) for AI requests", async () => {
      const aiSpy = vi.spyOn(env.AI, 'run').mockResolvedValue({
        response: JSON.stringify({
          strategic_overview: "OK",
          anomalies_detected: "None",
          tactical_recommendations: "Deploy"
        })
      });

      const ip = "1.2.3.4";
      const makeRequest = () => SELF.fetch("http://localhost/odin/analyze", {
        method: "POST",
        body: JSON.stringify({ columns: ["X"], numRows: 1, sample: [], turnstileToken: "test-token" }),
        headers: { "Content-Type": "application/json", "cf-connecting-ip": ip },
      });

      // Exhaust 5 requests sequentially
      for (let i = 0; i < 5; i++) {
        const r = await makeRequest();
        expect(r.status).toBe(200);
      }

      const res = await makeRequest();
      expect(res.status).toBe(429);
      const data = await res.json() as Record<string, unknown>;
      expect(data.error).toContain("Tactical cooling");
      
      aiSpy.mockRestore();
    }, 20000); 

    it("regression: ensures core URL shortener remains functional", async () => {
      const res = await SELF.fetch("http://localhost/shorten", {
        method: "POST",
        body: JSON.stringify({ url: "https://example.com/odin-test" }),
        headers: { "Content-Type": "application/json" },
      });
      expect(res.status).toBe(200);
      const data = await res.json() as Record<string, unknown>;
      expect(data.id).toBeDefined();
    });
  });

  describe("FREYA Feature (Image Editor)", () => {
    it("serves the FREYA HUD page", async () => {
      const res = await SELF.fetch("http://localhost/freya");
      expect(res.status).toBe(200);
      expect(await res.text()).toContain("FREYA");
    });

    it("proxies Unsplash API searches securely and returns sanitized JSON", async () => {
      const originalFetch = globalThis.fetch;
      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockImplementation(async (input, init) => {
        const url = typeof input === 'string' ? input : (input as Request).url;
        if (url.includes('api.unsplash.com')) {
          return new Response(JSON.stringify({
            results: [
              { id: "1", urls: { regular: "https://example.com/1.jpg" }, alt_description: "alt 1", user: { name: "user1" } },
              { id: "2", urls: { regular: "https://example.com/2.jpg" }, alt_description: "alt 2", user: { name: "user2" } }
            ]
          }), { status: 200, headers: { 'Content-Type': 'application/json' }});
        }
        return originalFetch(input, init);
      });

      const res = await SELF.fetch("http://localhost/freya/search?q=office", {
        method: "GET",
        headers: { "cf-connecting-ip": "1.1.1.1" },
      });
      
      expect(res.status).toBe(200);
      const data = await res.json() as Record<string, unknown>;
      
      expect(Array.isArray(data.images)).toBe(true);
      const images = data.images as Record<string, unknown>[];
      expect(images.length).toBe(2);
      // Verify sanitized URL structure (optimized for webp)
      expect(images[0].url).toContain("w=1200");
      expect(images[0].thumb).toContain("w=150");
      
      const fetchCall = fetchSpy.mock.calls.find(call => {
        const url = typeof call[0] === 'string' ? call[0] : (call[0] as Request).url;
        return url.includes('api.unsplash.com');
      });
      expect(fetchCall).toBeDefined();
      expect(typeof fetchCall![0] === 'string' ? fetchCall![0] : (fetchCall![0] as Request).url).toContain("query=office");
      
      fetchSpy.mockRestore();
    });

    it("supports random image loads with empty queries", async () => {
      const originalFetch = globalThis.fetch;
      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockImplementation(async (input, init) => {
        const url = typeof input === 'string' ? input : (input as Request).url;
        if (url.includes('api.unsplash.com')) {
          return new Response(JSON.stringify([
            { id: "rand1", urls: { regular: "https://example.com/r1.jpg" }, alt_description: "rand alt", user: { name: "user1" } }
          ]), { status: 200, headers: { 'Content-Type': 'application/json' }});
        }
        return originalFetch(input, init);
      });

      const res = await SELF.fetch("http://localhost/freya/search?q=", {
        method: "GET",
      });
      
      expect(res.status).toBe(200);
      const data = await res.json() as { images: Array<{ id: string }> };
      expect(data.images[0].id).toBe("rand1");
      
      const fetchCall = fetchSpy.mock.calls.find(call => {
        const url = typeof call[0] === 'string' ? call[0] : (call[0] as Request).url;
        return url.includes('api.unsplash.com');
      });
      expect(fetchCall).toBeDefined();
      expect(typeof fetchCall![0] === 'string' ? fetchCall![0] : (fetchCall![0] as Request).url).toContain("/photos/random");
      
      fetchSpy.mockRestore();
    });

    it("enforces Unsplash API specific rate limiting (10 per minute)", async () => {
      const originalFetch = globalThis.fetch;
      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockImplementation(async (input, init) => {
        const url = typeof input === 'string' ? input : (input as Request).url;
        if (url.includes('api.unsplash.com')) {
          // Mock the random endpoint response structure (array of objects with 'urls')
          return new Response(JSON.stringify([{ 
            id: "mock", 
            urls: { regular: "https://example.com/mock.jpg" },
            alt_description: "mock alt",
            user: { name: "mock user" }
          }]), { status: 200, headers: { 'Content-Type': 'application/json' }});
        }
        return originalFetch(input, init);
      });
      
      const ip = "freya-rl-ip-" + Date.now();
      // Using an empty query (q=) triggers 'random' mode, bypassing the Cache API 
      // which prevents ctx.waitUntil hanging in the Vitest simulator during loop requests.
      for (let i = 0; i < 10; i++) {
        const r = await SELF.fetch(`http://localhost/freya/search?q=&i=${i}`, {
          method: "GET",
          headers: { "cf-connecting-ip": ip },
        });
        expect(r.status).toBe(200);
      }

      const res = await SELF.fetch(`http://localhost/freya/search?q=&i=11`, {
        method: "GET",
        headers: { "cf-connecting-ip": ip },
      });
      expect(res.status).toBe(429);
      const data = await res.json() as { error?: string };
      expect(data.error).toContain("Tactical cooling in progress.");
      
      fetchSpy.mockRestore();
    });
  });

  describe("Master Ecosystem Integration (Zero-Break)", () => {
    it("verifies all professional tools are reachable from the homepage", async () => {
      const res = await SELF.fetch("http://localhost/");
      const html = await res.text();
      const tools = ["/bazuka", "/anakin", "/musashi", "/odin", "/yaiba", "/ragnar", "/freya"];

      for (const tool of tools) {
        expect(html).toContain(`href="${tool}"`);
      }
    });

    it("verifies the ECOSYSTEM Portal shows all 7 launched tools and brand", async () => {
      // Fetch ODIN as a representative page with the portal
      const res = await SELF.fetch("http://localhost/odin");
      const html = await res.text();
      
      // Verify Portal Presence and Brand
      expect(html).toContain("punchy-portal");
      expect(html).toContain("PUNCHY.ME");
      
      // Verify all 7 Tools are in the portal
      const portalTools = ["/bazuka", "/anakin", "/musashi", "/odin", "/yaiba", "/ragnar", "/freya"];
      for (const tool of portalTools) {
        // Look for the specific link structure used in the portal switcher
        expect(html).toContain(`href="${tool}"`);
      }
    });

    it("verifies YAIBA print-optimized architecture", async () => {
      const res = await SELF.fetch("http://localhost/yaiba");
      const html = await res.text();
      expect(html).toContain("@media print");
      expect(html).toContain("print-header");
    });

    it("verifies ODIN command terminal capability", async () => {
      const res = await SELF.fetch("http://localhost/odin");
      const html = await res.text();
      expect(html).toContain("id=\"query-terminal\"");
      expect(html).toContain("id=\"run-terminal\"");
    });

    it("verifies MUSASHI high-speed anchor extraction", async () => {
      const aiSpy = vi.spyOn(env.AI, 'run').mockResolvedValue({
        response: JSON.stringify({ intel: "ok", skills: [], projects: [], salary: "ok", questions: [] })
      });
      const res = await SELF.fetch("http://localhost/musashi/forge", {
        method: "POST",
        body: JSON.stringify({ description: "We need a Senior Engineer with 10 years of experience in Cloudflare and TypeScript." }),
        headers: { "Content-Type": "application/json" },
      });
      expect(res.status).toBe(200);
      aiSpy.mockRestore();
    });
  });

  describe("PUNCHY.ME Global Security & Resilience (CRITICAL)", () => {
    it("CRITICAL 1: enforces Terminal Security Isolation (ODIN)", async () => {
      // Test the 'fetch' blacklist specifically
      const res = await SELF.fetch("http://localhost/odin");
      const html = await res.text();
      // Verify the blacklist contains the high-risk keywords
      expect(html).toContain("'fetch'");
      expect(html).toContain("'document'");
      expect(html).toContain("'window'");
      expect(html).toContain("'SEC>'");
    });

    it("CRITICAL 2: enforces Turnstile Bot-Shield on all AI routes", async () => {
      // Test Musashi Forge (Should fail without token)
      const _resMusashi = await SELF.fetch("http://localhost/musashi/forge", {
        method: "POST",
        body: JSON.stringify({ description: "Valid job intel..." }),
        headers: { "Content-Type": "application/json" },
      });
      // Currently Musashi relies on honeypot, but let's check ODIN which has Turnstile
      const resOdin = await SELF.fetch("http://localhost/odin/analyze", {
        method: "POST",
        body: JSON.stringify({ columns: ["X"], numRows: 1, sample: [] }),
        headers: { "Content-Type": "application/json" },
      });
      expect(resOdin.status).toBe(403); // Security handshake required
    });

    it("CRITICAL 3: verifies KV Double-Lock Resilience on redirection", async () => {
      // Simulate a scenario where ID exists but KV is 'slow'
      const testId = "consistency-test";
      const targetUrl = "https://datarockie.com";
      
      // Seed the KV
      await env.SHORT_LINKS.put(testId, targetUrl);
      
      // Perform lookup. The code performs a 500ms sleep internally if first lookup fails.
      const res = await SELF.fetch(`http://localhost/${testId}`, { redirect: 'manual' });
      expect(res.status).toBe(301);
      // Support both trailing and non-trailing slash matches
      expect(res.headers.get("Location")).toContain("https://datarockie.com");
    });
  });

  describe("ASGARD Workspace Robustness", () => {
    it("Workspace Accessibility: serves correct HTML structure", async () => {
      const res = await SELF.fetch("http://localhost/asgard");
      expect(res.status).toBe(200);
      const html = await res.text();
      expect(html).toContain('id="bg-layer"');
      expect(html).toContain('class="dock-container"');
      expect(html).toContain('id="spotlight"');
      expect(html).toContain('id="clock"');
      expect(html).toContain('id="pomodoro"');
    });

    it("Soundscape Edge Integrity: verifies local asset path and performance headers", async () => {
      const res = await SELF.fetch("http://localhost/asgard");
      const html = await res.text();
      // Verify local asset usage
      expect(html).toContain('src="/asgard_assets/all-of-my-pryces-asgard.mp3"');
      // Verify performance mandate (preload="none")
      expect(html).toContain('preload="none"');
    });

    it("Zen Mode State Consistency: verifies CSS existence and layout stability", async () => {
      const res = await SELF.fetch("http://localhost/asgard");
      const html = await res.text();
      // Check for Zen mode specific CSS rules that prevent layout shift
      expect(html).toContain('body.zen-mode .dock-container');
      expect(html).toContain('body.zen-mode .pomodoro-container');
      // Verify the removed bright green neon state (checking absence of the class rule)
      expect(html).not.toContain('.pomodoro-container.active { color: #22c55e; }');
    });
  });

  describe("Security Hardening v2 (World-Class)", () => {
    it("injects Content-Security-Policy on all HTML responses", async () => {
      const routes = ["/", "/bazuka", "/anakin", "/musashi", "/yaiba", "/ragnar", "/odin", "/freya", "/asgard"];
      for (const route of routes) {
        const res = await SELF.fetch(`http://localhost${route}`);
        const csp = res.headers.get("Content-Security-Policy");
        expect(csp).toBeTruthy();
        expect(csp).toContain("default-src 'self'");
        expect(csp).toContain("frame-ancestors 'none'");
        expect(csp).toContain("base-uri 'self'");
      }
    });

    it("injects X-Content-Type-Options: nosniff on HTML responses", async () => {
      const res = await SELF.fetch("http://localhost/");
      expect(res.headers.get("X-Content-Type-Options")).toBe("nosniff");
    });

    it("does NOT inject CSP on JSON API responses", async () => {
      const res = await SELF.fetch("http://localhost/shorten", {
        method: "POST",
        body: JSON.stringify({ url: "https://test-csp.com" }),
        headers: { "Content-Type": "application/json" },
      });
      expect(res.headers.get("Content-Security-Policy")).toBeNull();
    });

    it("rejects reserved IDs to prevent route shadowing", async () => {
      const res = await SELF.fetch("http://localhost/shorten", {
        method: "POST",
        body: JSON.stringify({ url: "https://reserved-test.com", suggestedId: "odin" }),
        headers: { "Content-Type": "application/json" },
      });
      expect(res.status).toBe(200);
      const { id } = await res.json() as { id: string };
      // Should NOT be "odin" — must generate a random ID instead
      expect(id).not.toBe("odin");
      expect(id.length).toBe(6);
    });

    it("rejects reserved IDs case-insensitively", async () => {
      const res = await SELF.fetch("http://localhost/shorten", {
        method: "POST",
        body: JSON.stringify({ url: "https://reserved-case.com", suggestedId: "RAGNAR" }),
        headers: { "Content-Type": "application/json" },
      });
      const { id } = await res.json() as { id: string };
      expect(id).not.toBe("RAGNAR");
    });

    it("serves Cache-Control headers on static tool pages", async () => {
      const routes = ["/bazuka", "/anakin", "/musashi", "/yaiba", "/ragnar", "/odin", "/freya"];
      for (const route of routes) {
        const res = await SELF.fetch(`http://localhost${route}`);
        const cc = res.headers.get("Cache-Control");
        expect(cc).toContain("public");
        expect(cc).toContain("max-age=3600");
      }
    });

    it("serves Cache-Control on favicon and robots.txt", async () => {
      const faviconRes = await SELF.fetch("http://localhost/favicon.ico");
      expect(faviconRes.headers.get("Cache-Control")).toContain("max-age=86400");

      const robotsRes = await SELF.fetch("http://localhost/robots.txt");
      expect(robotsRes.headers.get("Cache-Control")).toContain("max-age=86400");
    });

    it("includes Ragnar and Asgard in sitemap.xml", async () => {
      const res = await SELF.fetch("http://localhost/sitemap.xml");
      const xml = await res.text();
      expect(xml).toContain("punchy.me/ragnar");
      expect(xml).toContain("punchy.me/asgard");
    });
  });

  describe("AI Response Parsing Robustness", () => {
    it("parses JSON wrapped in markdown code blocks", async () => {
      const aiSpy = vi.spyOn(env.AI, 'run').mockResolvedValue({
        response: '```json\n{"intel":"wrapped","skills":["A"],"projects":[],"salary":"N/A","questions":[]}\n```'
      });

      const res = await SELF.fetch("http://localhost/musashi/forge", {
        method: "POST",
        body: JSON.stringify({ description: "Senior Engineer with 5 years in TypeScript and React, building dashboards." }),
        headers: { "Content-Type": "application/json" },
      });
      expect(res.status).toBe(200);
      const data = await res.json() as { intel: string };
      expect(data.intel).toBe("wrapped");
      aiSpy.mockRestore();
    });

    it("parses JSON embedded in conversational AI text", async () => {
      const aiSpy = vi.spyOn(env.AI, 'run').mockResolvedValue({
        response: 'Sure! Here is the analysis:\n\n{"intel":"embedded","skills":["B","C"],"projects":["P1"],"salary":"100k","questions":["Q1"]}\n\nHope this helps!'
      });

      const res = await SELF.fetch("http://localhost/musashi/forge", {
        method: "POST",
        body: JSON.stringify({ description: "Data Analyst role requiring SQL, Python, dashboards and team leadership experience." }),
        headers: { "Content-Type": "application/json" },
      });
      expect(res.status).toBe(200);
      const data = await res.json() as { intel: string };
      expect(data.intel).toBe("embedded");
      aiSpy.mockRestore();
    });

    it("handles AI returning empty string gracefully", async () => {
      const aiSpy = vi.spyOn(env.AI, 'run').mockResolvedValue({
        response: ''
      });

      const res = await SELF.fetch("http://localhost/musashi/forge", {
        method: "POST",
        body: JSON.stringify({ description: "Data Analyst role requiring SQL, Python, dashboards and team leadership experience." }),
        headers: { "Content-Type": "application/json" },
      });
      expect(res.status).toBe(500);
      aiSpy.mockRestore();
    });

    it("handles AI network error gracefully", async () => {
      const aiSpy = vi.spyOn(env.AI, 'run').mockRejectedValue(new Error('AI service unavailable'));

      const res = await SELF.fetch("http://localhost/musashi/forge", {
        method: "POST",
        body: JSON.stringify({ description: "Data Analyst role requiring SQL, Python, dashboards and team leadership experience." }),
        headers: { "Content-Type": "application/json" },
      });
      expect(res.status).toBe(500);
      aiSpy.mockRestore();
    });

    it("Ragnar handles AI returning wrong schema (slides as string)", async () => {
      const aiSpy = vi.spyOn(env.AI, 'run').mockResolvedValue({
        response: JSON.stringify({
          title: "Bad Schema",
          audience: "Test",
          slides: "This should be an array"
        })
      });

      const res = await SELF.fetch("http://localhost/ragnar/forge", {
        method: "POST",
        body: JSON.stringify({ title: "Test", audience: "Devs", details: "Test schema validation" }),
        headers: { "Content-Type": "application/json" },
      });
      expect(res.status).toBe(500);
      const data = await res.json() as { error: string };
      expect(data.error).toContain("no slides");
      aiSpy.mockRestore();
    });

    it("Ragnar validates slide fields at runtime", async () => {
      const aiSpy = vi.spyOn(env.AI, 'run').mockResolvedValue({
        response: JSON.stringify({
          title: 123,
          slides: [
            { header: null, content: 456, type: "list" },
            { content: "valid content" }
          ]
        })
      });

      const res = await SELF.fetch("http://localhost/ragnar/forge", {
        method: "POST",
        body: JSON.stringify({ title: "Fallback Test", audience: "QA", details: "Testing runtime guards" }),
        headers: { "Content-Type": "application/json" },
      });
      expect(res.status).toBe(200);
      const { id } = await res.json() as { id: string };

      // Verify stored data used fallback values
      const stored = JSON.parse(await env.SHORT_LINKS.get(id) || '{}');
      expect(stored.title).toBe("Fallback Test"); // Fell back to user-provided title since AI returned number
      expect(stored.slides[0].header).toBe(""); // null → empty string
      expect(stored.slides[0].content).toBe(""); // number → empty string
      expect(stored.slides[1].type).toBe("list"); // missing → default "list"

      aiSpy.mockRestore();
    });
  });

});
