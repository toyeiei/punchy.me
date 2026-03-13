# STRATEGY | MUSASHI: The Cold Attack Engine

This document defines the unified strategy for **MUSASHI**, the career offensive module of PUNCHY.ME. It combines high-level data parsing with strategic AI intelligence to give job seekers an unfair advantage.

---

## 1. MISSION OBJECTIVE
To transform a raw Job Description into a complete **Tactical Attack Path**, providing the user with intelligence, gap analysis, and elite outreach templates in seconds.

## 2. THE TACTICAL WORKFLOW

### PHASE 1: Intel Gathering (Input)
- **Method:** Paste-to-Forge (Simple, reliable, cost-effective).
- **Source:** User pastes any Job Description (LinkedIn, Company Site, etc.).
- **Arsenal Integration:** User selects an existing **ANAKIN Profile** to provide context for comparison.

### PHASE 2: The Parsing (Intel Extraction)
Musashi surgically extracts 6 mission-critical data points from the job description:
1.  **ROLE:** Seniority level (Junior, Mid, Senior, Management).
2.  **EXPERIENCE:** Required tenure and specific industry background.
3.  **SKILLS:** Core technical and soft competencies required.
4.  **TOOLS:** Specific software, languages, and platforms (SQL, Looker, Python, etc.).
5.  **RESPONSIBILITIES:** The mission-parameters and day-to-day operations.
6.  **BENEFITS:** Compensation perks and visible company culture clues.

### PHASE 3: The Analysis (Strategic Weaponry)
Musashi leverages Llama 3 to generate 7 layers of high-value intelligence:
1.  **PORTFOLIO STRIKE:** 3 detailed project ideas designed to prove mastery for THIS specific role.
2.  **COMPENSATION INTEL:** Estimated salary range (Min - Max) based on role and industry.
3.  **INTERVIEW PREP:** The "Winning Formula"—a specific strategy to impress the hiring manager.
4.  **THREAT DETECTION:** 3 specific interview questions likely to be asked to test seniority.
5.  **SKILL GAP RADAR (Match vs. Missing):** A side-by-side comparison of the user's ANAKIN profile vs. the job requirements.
6.  **CULTURE CODE:** An analysis of the company's "Vibe" (e.g., Disruptive, Corporate, Fast-Paced) to guide outreach tone.
7.  **ATS ASSASSIN:** The Top 5 mandatory keywords required to pass the bot filters.

### PHASE 4: The Attack (Execution)
The final output consists of two high-conversion deployment templates:
1.  **THE TACTICAL HOOK (LinkedIn):** A sub-300 character connection request focused on a specific "Common Value" point.
2.  **THE DEEP STRIKE (Email):** A full-length outreach email demonstrating technical mastery and cultural alignment.

---

## 3. DESIGN & HUD PHILOSOPHY
- **Dual-Pane Interface:**
    - *Left Panel (The Field):* Job Description input and profile selector.
    - *Right Panel (The Intelligence):* Real-time hydration of Intel, Analysis, and Attack templates.
- **One-Click Deployment:** Every analysis block and outreach template must have a "Copy to Arsenal" button.
- **Visual Aesthetic:** Maintain the "Cyber-Tactical" matte black and neon green theme.

## 4. ENGINEERING CONSTRAINTS (Occam's Razor)
- **No Third-Party APIs:** Rely on high-quality text parsing and AI inference to keep the tool free and fast.
- **Edge Native:** All logic runs on Cloudflare Workers for sub-millisecond response times.
- **Stateless Intelligence:** The analysis is generated on-demand and does not require a persistent database (KV only for TTL-based profile lookups).

---
*Status: Strategy Finalized. Ready for Forge.*
