# RAGNAR Slide Structure Documentation

## Overview

Each of the 6 slides has a **fixed structure** that we control. The AI only provides content that fills into these structures.

---

## Slide 1: OPENING

### Structure
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│                  HEADER (3-6 words)                 │
│                  [3.5rem, neon green, bold]         │
│                                                     │
│                                                     │
│         Paragraph content goes here spanning        │
│         15-25 words explaining the big picture      │
│         and setting up the presentation theme       │
│         [2.2rem, white, centered]                   │
│                                                     │
│                                                     │
└─────────────────────────────────────────────────────┘

Alignment: CENTER
Purpose: Hook the audience with big picture
```

### HTML Structure
```html
<section class="slide-opening">
    <h2>Transforming Enterprise Decisions</h2>
    <p class="opening-text">
        We're entering a $50 billion market with AI-powered 
        analytics that reduces decision-making time from weeks 
        to minutes while improving accuracy.
    </p>
</section>
```

### CSS Classes
```css
.slide-opening {
    text-align: center;
}

.slide-opening h2 {
    font-size: 3.5rem;
    color: #22c55e;
    margin-bottom: 4rem;
    font-weight: 800;
}

.slide-opening .opening-text {
    font-size: 2.2rem;
    line-height: 1.6;
    font-weight: 500;
    max-width: 1200px;
}
```

---

## Slide 2: POINTS

### Structure
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│              HEADER (3-5 words)                     │
│              [2.8rem, neon green, centered]         │
│                                                     │
│                                                     │
│   ▸ First bullet point text here spanning          │
│     12-20 words with key information               │
│                                                     │
│   ▸ Second bullet point with similar length        │
│     providing additional details                   │
│                                                     │
│   ▸ Third bullet point completing the set          │
│     with final key information                     │
│                                                     │
│                                                     │
└─────────────────────────────────────────────────────┘

Header: CENTER
Bullets: LEFT-ALIGNED
Purpose: List key points or advantages
```

### HTML Structure
```html
<section class="slide-points">
    <h2>Our Competitive Edge</h2>
    <ul>
        <li>Proprietary machine learning algorithms trained on 10 years of enterprise data</li>
        <li>First-mover advantage in the automated decision intelligence space</li>
        <li>Existing partnerships with 15 Fortune 500 companies ready to deploy</li>
    </ul>
</section>
```

### CSS Classes
```css
.slide-points {
    align-items: flex-start;
}

.slide-points h2 {
    text-align: center;
    width: 100%;
    margin-bottom: 3rem;
    font-size: 2.8rem;
    color: #22c55e;
}

.slide-points ul {
    text-align: left;
    width: 100%;
    max-width: 1300px;
}

.slide-points ul li {
    font-size: 2rem;
    line-height: 1.6;
    margin-bottom: 35px;
}

.slide-points ul li::before {
    content: '▸';
    color: #22c55e;
    font-size: 2rem;
}
```

---

## Slide 3: CHALLENGE

### Structure
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│              HEADER (3-5 words)                     │
│              [3.2rem, neon green, bold]             │
│                                                     │
│                                                     │
│      Paragraph describing the problem or            │
│      opportunity in 20-35 words. This provides      │
│      context for why this presentation matters      │
│      and what challenge needs to be addressed       │
│      [2rem, white, centered]                        │
│                                                     │
│                                                     │
└─────────────────────────────────────────────────────┘

Alignment: CENTER
Purpose: Define the problem/opportunity
```

### HTML Structure
```html
<section class="slide-challenge">
    <h2>The Market Opportunity</h2>
    <p class="challenge-text">
        Enterprise leaders currently spend 40% of their time 
        analyzing data manually, leading to delayed decisions 
        and missed opportunities. This creates a massive gap 
        in the market for intelligent automation.
    </p>
</section>
```

### CSS Classes
```css
.slide-challenge {
    text-align: center;
}

.slide-challenge h2 {
    font-size: 3.2rem;
    color: #22c55e;
    margin-bottom: 4rem;
    font-weight: 800;
}

.slide-challenge .challenge-text {
    font-size: 2rem;
    line-height: 1.7;
    font-weight: 500;
    max-width: 1200px;
}
```

---

## Slide 4: SOLUTION

### Structure
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│              HEADER (3-5 words)                     │
│              [2.8rem, neon green, centered]         │
│                                                     │
│  ┌─────────────────────┐  ┌─────────────────────┐  │
│  │      BEFORE         │  │       AFTER         │  │
│  │   [Red border]      │  │   [Green border]    │  │
│  │                     │  │                     │  │
│  │  Current state      │  │  Future state       │  │
│  │  text here in       │  │  text here in       │  │
│  │  10-15 words        │  │  10-15 words        │  │
│  │  [1.9rem]           │  │  [1.9rem]           │  │
│  │                     │  │                     │  │
│  └─────────────────────┘  └─────────────────────┘  │
│                                                     │
└─────────────────────────────────────────────────────┘

Layout: TWO-COLUMN GRID
Purpose: Show transformation/comparison
```

### HTML Structure
```html
<section class="slide-solution">
    <h2>The Transformation</h2>
    <div class="comparison-grid">
        <div class="comparison-box box-red">
            <h4 class="text-red">BEFORE</h4>
            <p>Manual analysis requiring data scientists and taking 2-3 weeks per decision</p>
        </div>
        <div class="comparison-box box-green">
            <h4 class="text-green">AFTER</h4>
            <p>Automated AI insights delivered in real-time with 95% accuracy and actionable recommendations</p>
        </div>
    </div>
</section>
```

### CSS Classes
```css
.comparison-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    margin-top: 50px;
    max-width: 1400px;
}

.comparison-box {
    background: rgba(255, 255, 255, 0.02);
    border: 3px solid rgba(255, 255, 255, 0.1);
    padding: 60px 40px;
    border-radius: 16px;
    min-height: 350px;
    text-align: center;
}

.box-red {
    border-color: #ef4444;
    background: rgba(239, 68, 68, 0.08);
}

.box-green {
    border-color: #22c55e;
    background: rgba(34, 197, 94, 0.08);
}

.comparison-box h4 {
    font-size: 1.6rem;
    letter-spacing: 4px;
    margin-bottom: 35px;
    font-weight: 800;
}

.comparison-box p {
    font-size: 1.9rem;
    line-height: 1.7;
}
```

---

## Slide 5: ACTION

### Structure
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│              HEADER (3-5 words)                     │
│              [2.8rem, neon green, centered]         │
│                                                     │
│                                                     │
│   ▸ First action item or step described            │
│     in 12-20 words with clear direction            │
│                                                     │
│   ▸ Second action item building on first           │
│     with specific next steps to take               │
│                                                     │
│   ▸ Third action item completing the plan          │
│     with timeline or milestones included           │
│                                                     │
│   ▸ Optional fourth item if needed                 │
│     [2rem, white, left-aligned]                    │
│                                                     │
└─────────────────────────────────────────────────────┘

Header: CENTER
Bullets: LEFT-ALIGNED
Purpose: Define action plan or roadmap
```

### HTML Structure
```html
<section class="slide-action">
    <h2>12-Month Execution Plan</h2>
    <ul>
        <li>Q1-Q2: Launch beta with 10 pilot customers and gather feedback for product refinement</li>
        <li>Q3: Achieve product-market fit, iterate based on data, and prepare for scale</li>
        <li>Q4: Expand to 100 enterprise customers with dedicated success team and proven ROI metrics</li>
    </ul>
</section>
```

### CSS Classes
```css
.slide-action {
    align-items: flex-start;
}

.slide-action h2 {
    text-align: center;
    width: 100%;
    margin-bottom: 3rem;
    font-size: 2.8rem;
    color: #22c55e;
}

.slide-action ul {
    text-align: left;
    width: 100%;
    max-width: 1300px;
}

.slide-action ul li {
    font-size: 2rem;
    line-height: 1.6;
    margin-bottom: 35px;
}

.slide-action ul li::before {
    content: '▸';
    color: #22c55e;
    font-size: 2rem;
}
```

---

## Slide 6: CLOSING

### Structure
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│              HEADER (3-6 words)                     │
│              [3.5rem, neon green, bold]             │
│                                                     │
│                                                     │
│         POWERFUL CLOSING STATEMENT IN               │
│         UPPERCASE SPANNING 15-25 WORDS              │
│         TO LEAVE LASTING IMPACT                     │
│         [2.4rem, white, bold, centered]             │
│                                                     │
│                                                     │
└─────────────────────────────────────────────────────┘

Alignment: CENTER
Purpose: Strong memorable closing
```

### HTML Structure
```html
<section class="slide-closing">
    <h2>The Future Starts Now</h2>
    <p class="closing-text">
        THIS PLATFORM WILL FUNDAMENTALLY CHANGE HOW ENTERPRISES 
        MAKE CRITICAL BUSINESS DECISIONS, POSITIONING US AS 
        THE CATEGORY LEADER IN AI-POWERED DECISION INTELLIGENCE.
    </p>
</section>
```

### CSS Classes
```css
.slide-closing {
    text-align: center;
}

.slide-closing h2 {
    font-size: 3.5rem;
    color: #22c55e;
    margin-bottom: 4rem;
    font-weight: 800;
}

.slide-closing .closing-text {
    font-size: 2.4rem;
    line-height: 1.6;
    font-weight: 700;
    max-width: 1200px;
    text-transform: uppercase;
    letter-spacing: 1px;
}
```

---

## Complete Flow Example

### AI Returns This JSON:
```json
{
  "title": "AI Analytics Platform Launch",
  "audience": "Board of Directors",
  "slides": [
    {
      "type": "opening",
      "header": "Transforming Enterprise Decisions",
      "content": "We're entering a $50 billion market with AI-powered analytics that reduces decision-making time from weeks to minutes."
    },
    {
      "type": "points",
      "header": "Our Competitive Edge",
      "content": "Proprietary ML trained on 10 years of data\\nFirst-mover in decision intelligence\\nPartnerships with 15 Fortune 500 companies"
    },
    {
      "type": "challenge",
      "header": "Market Opportunity",
      "content": "Leaders spend 40% of time on manual analysis, causing delays and missed opportunities. Massive automation gap exists."
    },
    {
      "type": "solution",
      "header": "The Transformation",
      "content": "Manual analysis taking 2-3 weeks | Real-time AI insights with 95% accuracy"
    },
    {
      "type": "action",
      "header": "12-Month Plan",
      "content": "Q1-Q2: Beta with 10 pilots\\nQ3: Product-market fit\\nQ4: Scale to 100 customers"
    },
    {
      "type": "closing",
      "header": "The Future Starts Now",
      "content": "This platform will fundamentally change enterprise decision-making and position us as category leaders."
    }
  ]
}
```

### We Render It As:
```
[Title Slide]
AI ANALYTICS PLATFORM LAUNCH
Board of Directors
Forged by RAGNAR AI

[Slide 1: OPENING - centered]
TRANSFORMING ENTERPRISE DECISIONS
We're entering a $50 billion market...

[Slide 2: POINTS - header center, bullets left]
OUR COMPETITIVE EDGE
▸ Proprietary ML trained on 10 years...
▸ First-mover in decision intelligence
▸ Partnerships with 15 Fortune 500...

[Slide 3: CHALLENGE - centered]
MARKET OPPORTUNITY
Leaders spend 40% of time...

[Slide 4: SOLUTION - two columns]
THE TRANSFORMATION
┌─BEFORE─────────┐  ┌─AFTER──────────┐
│Manual analysis │  │Real-time AI    │
│taking 2-3 weeks│  │insights with   │
│                │  │95% accuracy    │
└────────────────┘  └────────────────┘

[Slide 5: ACTION - header center, bullets left]
12-MONTH PLAN
▸ Q1-Q2: Beta with 10 pilots
▸ Q3: Product-market fit
▸ Q4: Scale to 100 customers

[Slide 6: CLOSING - centered]
THE FUTURE STARTS NOW
THIS PLATFORM WILL FUNDAMENTALLY CHANGE...

[Final Slide]
VICTORY SECURED.
Built with ⚡ by PUNCHY.ME
```

---

## Console Output Example

When you create a presentation, you'll see:
```
========================================
RAGNAR AI RESPONSE (Llama 3.1 8B):
========================================
{
  "title": "AI Analytics Platform Launch",
  "audience": "Board of Directors",
  "slides": [
    {
      "type": "opening",
      "header": "Transforming Enterprise Decisions",
      "content": "We're entering a $50 billion..."
    },
    ...
  ]
}
========================================
Response length: 1847 characters
Estimated tokens: 462
========================================
✅ Successfully parsed AI response
Slide count: 6
```

---

## Key Design Decisions

### 1. Fixed Structure
**Why:** Ensures consistency. AI is bad at layout, good at content.

### 2. Type-Based Rendering
**Why:** Each slide type has optimal structure for its purpose.

### 3. Center vs Left Alignment
- **Center:** Impact slides (opening, challenge, closing, solution header)
- **Left:** Detail slides (points bullets, action bullets)

### 4. Font Size Hierarchy
- **3.5rem:** Major impact headers (opening, closing)
- **3.2rem:** Problem definition (challenge)
- **2.8rem:** Standard headers (points, action, solution)
- **2.4rem:** Closing statement (uppercase, bold)
- **2.2rem:** Opening paragraph
- **2rem:** Body text (bullets, challenge text)
- **1.9rem:** Comparison boxes
- **1.6rem:** Box labels (BEFORE/AFTER)

### 5. Color Usage
- **Neon Green (#22c55e):** Headers, bullets, green box
- **White (#f8fafc):** All body text
- **Red (#ef4444):** Before state (problem)
- **Green:** After state (solution)

---

## Debugging

### Check Console Logs
1. Start dev server: `npm run dev`
2. Create presentation at `/ragnar`
3. Open browser DevTools → Console
4. Look for `RAGNAR AI RESPONSE` logs
5. Verify JSON structure matches expected format

### Common Issues

**Issue:** Bullets not showing
**Cause:** Content doesn't have `\n` separators
**Fix:** AI prompt enforces this, but check logs

**Issue:** Text overflow
**Cause:** AI generated too many words
**Fix:** Check word counts in logs, adjust prompt

**Issue:** Comparison broken
**Cause:** Missing `|` separator in solution slide
**Fix:** Verify content has ` | ` in logs

---

## Summary

**Structure:** Fixed by us (6 types)  
**Content:** Provided by AI (headers + text)  
**Alignment:** Type-specific (center or left)  
**Logging:** Full AI response in console  
**Debugging:** Check console for JSON structure  

**Result:** Perfect consistency + quality content! 🎯
