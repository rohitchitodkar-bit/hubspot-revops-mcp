# RevOps & HubSpot MCP Tool — Knowledge Base
**Purpose:** Reference for an AI-powered HubSpot diagnostic and advisory MCP tool. Use this to audit existing HubSpot infrastructure, recommend improvements, diagnose workflow errors, and guide scaling. Sources: Revenue Operations (Diorio & Hummel, Wiley), HubSpot RevOps Workbook, Weflow cheat sheet series.

---

## TABLE OF CONTENTS
1. [RevOps Philosophy & Why It Matters](#1-revops-philosophy)
2. [Revenue Cycle Models](#2-revenue-cycle-models)
3. [RevOps Management System — 6 Pillars](#3-management-system-6-pillars)
4. [Revenue Operating System — 9 Building Blocks](#4-operating-system-9-building-blocks)
5. [RevOps Maturity Model — 18 Dimensions × 4 Levels](#5-maturity-model)
6. [Six Smart Actions (How to Start)](#6-six-smart-actions)
7. [Metrics, Benchmarks & KPIs](#7-metrics-benchmarks-kpis)
8. [HubSpot-Specific Diagnostic Framework](#8-hubspot-diagnostic-framework)
9. [Data Hygiene Maturity Model](#9-data-hygiene-maturity)
10. [Common RevOps Pitfalls & Fixes](#10-common-pitfalls)
11. [Dashboard & Reporting Templates](#11-dashboard-templates)
12. [Forecasting Framework](#12-forecasting-framework)
13. [Revenue Cadence (Ceremonies & Meetings)](#13-revenue-cadence)
14. [HubSpot Workflow Audit Checklist](#14-hubspot-workflow-audit)
15. [MCP Tool — First-Day Diagnostic Questions](#15-first-day-diagnostics)

---

## 1. RevOps Philosophy

### Definition
**Revenue Operations (RevOps)** is a commercial model that creates sustainable, scalable growth by:
- **Management System (EQ):** Aligning the *people* in revenue teams (Sales, Marketing, Customer Success, Service)
- **Operating System (IQ):** Combining *technology, data, processes, and channels* to generate consistent growth

### The Core Problem RevOps Solves
Most companies treat growth as "art." They manage Marketing, Sales, and Service in separate silos:
- Disconnected processes, policies, procedures, and machines
- No system to manage the full revenue cycle
- Technology stacks deployed as isolated silos of automation
- Revenue leaks through handoffs between functions (can cost 10 EBITDA points)

### Financial Link: RevOps → Firm Value
- **58% of S&P 500 value creation** comes from organic revenue growth (more than cost reduction + margin expansion + free cash flow combined)
- Hyper-growth companies (>40% YoY) and high NRR (>100%) command the highest PE/valuation multiples
- A 10% increase in organizational capability (analytics, cross-functional collaboration) drives avg **5.5% increase in stock price**
- Customer equity value elasticity = **0.72** (10% increase in customer asset value → 7.2% increase in stock price)
- Intangible assets (customer data, brand, digital infrastructure) now explain **>80% of firm value**

### Key Insight for HubSpot Work
> "Most companies' largest business assets (customer data, CRM data, digital infrastructure) are underperforming." — Diorio & Hummel

The HubSpot instance at any company IS a strategic financial asset. Auditing and optimizing it creates real firm value.

---

## 2. Revenue Cycle Models

### Model A: The Revenue Cycle (Diorio & Hummel)
```
AWARENESS → DEMAND → PURCHASE → CONSUMPTION
```
All four stages must be connected and managed as one system — not handed off between disconnected teams.

### Model B: HubSpot Flywheel
```
ATTRACT → ENGAGE → DELIGHT
```
- **Attract:** Content, SEO, paid ads, social → bring strangers to website
- **Engage:** Forms, email, CRM, sales → convert to customers  
- **Delight:** Support, success, NPS → turn customers into promoters
- Each delight creates new attraction (flywheel spins itself)

**HubSpot Flywheel KPIs to track:**
- Attract: Traffic, MQL rate, CAC
- Engage: SQL rate, close rate, sales cycle length
- Delight: NPS, NRR, churn rate, expansion revenue

### Model C: Bowtie Model (Full Customer Lifecycle)
```
Awareness → Education → Selection → Mutual Commit → First Impact
→ Recurring Impact → Maximum Impact → Expansion → Retention
```
- **Pre-purchase (left side):** Marketing + Sales own this
- **Post-purchase (right side):** Customer Success + Service own this
- **The knot (Commit):** Where handoff happens — highest risk of revenue leakage

### Model D: 4D Selling (Modern Reality)
Selling teams must be: **D**igital, **D**ata-driven, **D**ynamic, **D**ispersed
- 80% of customers prefer digital-first engagement
- 55% of millennial B2B buyers prefer buying without talking to a sales rep (Gartner)
- This means HubSpot workflows, sequences, and automation must do more heavy lifting than ever

---

## 3. Management System — 6 Pillars

### Pillar 1: Commercial Leadership
*Top-down leadership to unify Marketing, Sales, and Service into ONE revenue team*

**3 Core Competencies:**
1. **Accountability** — Full accountability for return on all enterprise selling resources, assets, and investments
2. **Ownership** — Single point of decision-making for the enterprise revenue process (e.g., CRO or RevOps lead)
3. **Change Management** — Top-down leadership to transform the commercial model

**HubSpot Translation:**
- Is there one person who owns HubSpot decisions? Or is it fragmented by team?
- Are Sales, Marketing, and CS KPIs aligned in one dashboard?
- Is HubSpot data trusted by leadership, or does everyone maintain their own spreadsheets?

### Pillar 2: Commercial Operations
*Reconfigure operations to provide end-to-end management across the customer journey*

**3 Core Competencies:**
4. **Common Purpose** — Shared goals, KPIs, and incentives across all customer-facing teams
5. **Organization** — Cross-functional RevOps structure (not isolated Marketing Ops + Sales Ops)
6. **Commercial Process** — Single cross-functional process from prospect to expansion

**HubSpot Translation:**
- Are Marketing, Sales, and CS pipeline stages defined and agreed upon?
- Are lead handoff criteria (MQL → SQL → SAL) documented in HubSpot properties?
- Is there a single "source of truth" CRM, or are people working in parallel systems?

### Pillar 3: Commercial Architecture
*Maximize return on selling assets through go-to-market design*

**3 Core Competencies:**
7. **Go-to-Market Strategy** — Data-driven segmentation, targeting, coverage
8. **Sales Force Design** — Role clarity (BDR/SDR → AE → CSM), compensation alignment
9. **Sales Performance Management** — Territory, quota, pipeline coverage

**HubSpot Translation:**
- Are HubSpot pipelines structured to match actual sales process stages?
- Do pipeline stages have entry/exit criteria and probability mappings?
- Are deal owner assignments automated based on territory/segment rules?

### Pillar 4: Commercial Insights
*Customer engagement + seller activity data → actionable intelligence*

**3 Core Competencies:**
10. **Data-Driven Selling** — Prescriptive, real-time revenue intelligence
11. **KPIs** — Shared dashboards of commercial performance across functions
12. **Predictive Selling Insights** — AI-powered forecasting, account scoring, win probability

**HubSpot Translation:**
- Is there a shared HubSpot dashboard that Marketing, Sales, and CS all use?
- Are contact engagement scores (email opens, page visits, form fills) being tracked?
- Is the pipeline forecast based on deal stage × probability, or is it being manually adjusted?

### Pillar 5: Commercial Enablement
*Turn technology into a "force multiplier"*

**3 Core Competencies:**
13. **Enablement & Engagement** — CRM + sales enablement integrated into one seller workflow
14. **Readiness & Development** — Closed-loop training + coaching at scale
15. **Revenue Enhancement** — CPQ, pricing tools, lead-to-cash automation

**HubSpot Translation:**
- Are HubSpot sequences being used consistently (or are reps doing their own thing)?
- Are deal-based workflows automating follow-up tasks at each stage?
- Are email templates, call scripts, and playbooks stored in HubSpot?

### Pillar 6: Commercial Asset Management
*Strategically manage data, technology, content, and IP assets*

**3 Core Competencies:**
16. **Content Assets** — Centralized ownership and taxonomy for all selling content
17. **Data Assets** — Common architecture for customer data; no duplicate/conflicting sources
18. **Technology Assets** — Centralized tech portfolio management (rationalize, audit, connect)

**HubSpot Translation:**
- Are HubSpot properties clean, deduplicated, and consistently named?
- Are there duplicate properties doing the same job?
- Is the tech stack integrated properly (HubSpot ↔ email ↔ calendar ↔ support tool)?
- Are there custom properties that are never filled in? (waste)

---

## 4. Operating System — 9 Building Blocks

| # | Block | What It Is | HubSpot Equivalent |
|---|-------|-----------|-------------------|
| 1 | **Revenue Enablement** | CRM, sales enablement, content mgmt, readiness systems | HubSpot CRM + Sales Hub sequences, templates, playbooks |
| 2 | **Channel Optimization** | Improve engagement, productivity, coverage of selling channels | HubSpot sequences, email, calling, meeting booking |
| 3 | **Customer-Facing Technology** | Owned digital infrastructure: website, blog, landing pages, forms, chatbots | HubSpot Marketing Hub, CMS, chat, forms |
| 4 | **Revenue Intelligence** | Analytics/dashboards for financial return on growth investments | HubSpot Reports, custom dashboards, forecast tool |
| 5 | **Engagement Data Hub** | Aggregate all customer + seller activity data | HubSpot contact timeline, email tracking, activity log |
| 6 | **Customer Intelligence** | Convert data into actionable insights (account health, intent, ICP fit) | HubSpot contact/company scores, deal health |
| 7 | **Talent Development** | Training, playbooks, onboarding, learning | HubSpot Sales Playbooks, coaching features |
| 8 | **Resource Optimization** | Territory, quota, account prioritization | HubSpot deal owner rules, lead rotation, target accounts |
| 9 | **Revenue Enhancement** | Pricing, packaging, proposal tools, CPQ | HubSpot quotes, deal line items, product library |

### The Key Insight: "The Team That Connects the Most Dots Wins"
The 9 building blocks only create value when they are **connected** — not siloed. Connecting CRM to email tracking to deal workflows to reporting to forecasting is what separates a high-performing HubSpot instance from a glorified spreadsheet.

> "Three decades after the advent of CRM, 67% of enterprise CRM implementations still generate lower than acceptable ROI." — Sales Management Association

The problem is NOT HubSpot. It's the failure to integrate it into a connected selling system.

---

## 5. Maturity Model — 18 Dimensions × 4 Levels

*Use this to assess the current company's HubSpot/RevOps state and identify the biggest gaps.*

### COMMERCIAL LEADERSHIP

| Competency | Level 1: Begin | Level 2: Basic | Level 3: Advanced | Level 4: Best-in-Class |
|-----------|--------------|--------------|-----------------|----------------------|
| **1. Accountability** | Corporate performance goals defined and cascaded | Financially valid criteria to prioritize/measure growth investments | Feedback loops for attribution across Sales, Marketing, CS | Full accountability for financial outcomes for all teams and infrastructure |
| **2. Ownership** | Assign someone to evaluate RevOps pain points | Assign exec for cross-functional PM | CXO/CRO established to lead commercial transformation | All cross-functional resource + infrastructure decisions centralized |
| **3. Change Management** | Culture of continuous improvement demanded | Change management office with top-down process authority | Shared goals and incentives for all customer-facing employees | All growth operations centralized under CXO with transformation remit |

### COMMERCIAL OPERATIONS

| Competency | Level 1 | Level 2 | Level 3 | Level 4 |
|-----------|---------|---------|---------|---------|
| **4. Common Purpose** | Common definitions of opportunity and performance | Clarified ownership at every customer journey stage | Common measures of account/pipeline health for all teams | Common incentives based on customer value for all employees |
| **5. Organization** | RevOps Center of Excellence coordinates activities | Sales Ops + Sales Enablement with dotted-line central reporting | Sales + Marketing Ops integrated with dotted-line central reporting | All RevOps, enablement, and analytics with solid-line central reporting |
| **6. Commercial Process** | Cross-functional process mapped (roles, handoffs, leakage points) | Roles and handoff criteria clearly defined for all functions | Process reengineered to eliminate friction and leakage | Systems and data infrastructure integrated to improve visibility end-to-end |

### COMMERCIAL ARCHITECTURE

| Competency | Level 1 | Level 2 | Level 3 | Level 4 |
|-----------|---------|---------|---------|---------|
| **7. GTM Strategy** | GTM strategy assessed for opportunity gaps | Targets refined with data-driven intent/fit/probability | Coverage reflects new roles, team selling, automation | Market segmentation supported by algorithmic opportunity models |
| **8. Sales Force Design** | Sales force design assessed for performance gaps | Emphasis redesigned to optimize margins and CLV | Segmentation clarifies lead gen / specialist / success roles | Incentive comp redesigned for cross-functional common purpose |
| **9. Sales Performance Mgmt** | Territory + quota assumptions audited | Redefine territories/quotas with data-driven inputs | Automate the TQP (Territory/Quota/Planning) process | Align incentives across Sales, Marketing, CS on customer lifetime value |

### COMMERCIAL INSIGHTS

| Competency | Level 1 | Level 2 | Level 3 | Level 4 |
|-----------|---------|---------|---------|---------|
| **10. Data-Driven Selling** | Customer engagement + seller activity data integrated for coaching | Real-time guidance enabled across revenue teams | Measures trigger automatic actions across the commercial process | Real-time guidance fully enabled across all revenue teams |
| **11. KPIs** | Single KPI dashboard agreed upon by Sales, Marketing, CS leadership | Data-driven CLV, account health, seller performance, opportunity measures | KPIs measure end-to-end commercial process across functions | Common incentives based on CLV, cost-to-sell, and selling activities |
| **12. Predictive Insights** | Center of Excellence for predictive insights established | Analytics predict opportunity value, intent, win probability | Predictive analytics for accurate sales forecasts | Affective analytics assess customer sentiment in real time |

### COMMERCIAL ENABLEMENT

| Competency | Level 1 | Level 2 | Level 3 | Level 4 |
|-----------|---------|---------|---------|---------|
| **13. Enablement & Engagement** | Audit tech portfolio for utilization, productivity, ROI | Sales enablement in digital selling platform | Readiness + enablement + engagement roadmap integrated | Fully integrated for data-driven guided selling in real time |
| **14. Readiness & Development** | Audit L&D tech portfolio | L&D portfolio integrated into closed-loop feedback process | Readiness + enablement roadmap improves ramp and skills | Full integration supports AI-driven coaching at scale in real time |
| **15. Revenue Enhancement** | Audit CPQ/fulfillment tools for leakage and friction | Centralize CPQ management across functions | CPQ roadmap integrated to accelerate lead-to-cash | One-to-one personalization of pricing, proposals, onboarding at scale |

### COMMERCIAL ASSET MANAGEMENT

| Competency | Level 1 | Level 2 | Level 3 | Level 4 |
|-----------|---------|---------|---------|---------|
| **16. Content Assets** | All content organized with common taxonomy | Single source of truth for content (enablement, readiness, response) | Content available across enablement, readiness, revenue enhancement systems | End-to-end response management across enterprise, multichannel, real-time |
| **17. Data Assets** | Customer data sources inventoried; common architecture defined | Data administration centralized; harmonized architecture | Single source of truth for all engagement + conversational intelligence data | Fully integrated Revenue Operating System routes data in real time |
| **18. Technology Assets** | Tech portfolio audited for duplication, disconnects, underuse | Centralized admin for consistent architecture across functions | Centralized investment + implementation across functions | Commercial tech roadmap built around core platforms with integrated ecosystem |

---

## 6. Six Smart Actions

*Smart Actions = practical, financially viable steps that are Actionable + Connected + Accretive + Scalable*

### Smart Action 1: Get Better Visibility into the Revenue Cycle
**Goal:** Aggregate customer engagement + seller activity data into a commercial intelligence dashboard

**What to build in HubSpot:**
- Unified dashboard: pipeline health, account health, seller performance, opportunity potential
- Contact engagement score (email opens, site visits, content downloads → lead score)
- Deal health signals: days in stage, last activity, next steps, contact depth
- Pipeline velocity report: (# deals × avg deal size × win rate) / sales cycle days

**Steps:**
1. Inventory first-party data: email, website, calendar, recorded conversations in HubSpot
2. Build single KPI dashboard with Sales + Marketing + CS leadership buy-in
3. Set pipeline stage probability weights based on historical data
4. Create alerts when deals go stale (no activity > X days)

### Smart Action 2: Simplify the Selling Workflow
**Goal:** Connect CRM, sales enablement, content, and readiness tools into one streamlined seller experience

**What to audit in HubSpot:**
- How many tools do reps use in a day? Is HubSpot one of them, or do they bypass it?
- Are email templates, sequences, and call scripts available directly in HubSpot?
- How many clicks does it take to log a call, update a deal, and send a follow-up?
- Are there required fields blocking reps from moving deals forward? (friction vs. data quality trade-off)

**Steps:**
1. Map the current seller daily workflow step by step
2. Identify top 3 friction points (where reps go outside HubSpot)
3. Audit tech portfolio — eliminate tools that duplicate HubSpot functionality
4. Enforce deal stage workflows to automate the next-step tasks reps forget

### Smart Action 3: Share Marketing Insights with Frontline Sellers (ABM)
**Goal:** Route marketing signals (email engagement, page visits, form fills, content downloads) to sales reps as account alerts

**What to build in HubSpot:**
- Marketing contact → Lead score property based on behavioral signals
- Contact qualification workflow: score threshold → assign to rep → create task → send internal notification
- Account-level view: company activity feed showing all contacts' recent engagement
- ABM target accounts: HubSpot target accounts list with ABM tier property

**Steps:**
1. Define ICP (Ideal Customer Profile) criteria as HubSpot filter (industry, company size, job title, engagement)
2. Build lead scoring model (demographic + behavioral)
3. Create workflow: MQL threshold met → notify rep → create "hot lead" task
4. Build company-level engagement dashboard showing marketing activity by account

### Smart Action 4: Develop and Retain High-Performing Selling Talent
**Goal:** Close the loop between training, seller behavior, and customer outcomes

**What to check in HubSpot:**
- Are sales playbooks created and linked to deal stages?
- Are call outcomes being logged consistently (call disposition tracking)?
- Are meeting notes and call recordings attached to contact records?
- Is onboarding tracked with a HubSpot deal pipeline or checklist property?

### Smart Action 5: Make Selling Channels More Effective
**Goal:** Use real-time data to improve call and email performance; guide sellers at the moment of engagement

**What to enable in HubSpot:**
- HubSpot Conversations (inbox) connected to all team email inboxes
- Sales sequences with A/B tested email templates
- Meeting booking links on all email signatures and sequences
- Call outcomes logged with required disposition field
- Deal-based automated follow-up tasks triggered by no-reply within X days

### Smart Action 6: Streamline the Selling Content Supply Chain
**Goal:** Ensure the right content reaches sellers at the right deal stage

**What to build in HubSpot:**
- Document library with content tagged by buyer stage and persona
- Sales playbooks with embedded content links for each deal stage
- Email templates organized by stage (Prospecting / Discovery / Proposal / Closing / Renewal)
- Snippet library for common objections and responses

---

## 7. Metrics, Benchmarks & KPIs

### Revenue Performance Benchmarks (B2B SaaS)

| Metric | Benchmark | Formula |
|--------|-----------|---------|
| **Win Rate** | 20–30% | Closed-Won / (Closed-Won + Closed-Lost) |
| **Pipeline Coverage** | 3–4× quota | Total pipeline value / quota |
| **MQL → SQL Conversion** | 13–20% | SQLs / MQLs |
| **MQL Response Time** | < 1 hour | Time from MQL → first rep activity |
| **Sales Cycle Length** | Varies by ACV; shorter = better | Avg days Prospect → Closed |
| **CAC Payback Period** | < 12 months | CAC / (ACV × Gross Margin %) |
| **NRR (Net Revenue Retention)** | > 110% | (Beginning MRR + Expansion − Contraction − Churn) / Beginning MRR |
| **GRR (Gross Revenue Retention)** | > 90% | (Beginning MRR − Contraction − Churn) / Beginning MRR |
| **Churn Rate** | < 5% annually | Churned Customers / Beginning Customers |
| **NPS (B2B SaaS)** | 30–40 | Standard NPS survey |
| **Talk Ratio (Seller)** | 40–50% rep talking | Conversation intelligence tool |
| **Question Rate** | 18–25 questions/hour | Conversation intelligence |
| **Follow-Up Rate** | ≥ 80% | % of calls with logged follow-up |
| **Pipeline Velocity** | Maximize | (# Deals × Avg Deal Size × Win Rate) / Avg Sales Cycle Days |

### Leading vs. Lagging Indicators

| Type | Examples |
|------|---------|
| **Lagging (outcomes)** | Revenue, Win Rate, NRR, Churn, NPS |
| **Leading (activities)** | # outreach attempts, MQL response time, # demos booked, Pipeline Coverage ratio |
| **Process health** | % deals with next step, % deals updated in last 7 days, avg days in stage |

### Forecast Categories (HubSpot)
- **Pipeline:** Deals expected to close this period; not yet committed
- **Best Case:** Deals with upside potential if everything goes right
- **Commit:** Deals where rep is highly confident → closes this period
- **Closed:** Already won revenue

### Forecast Methods
1. **Weighted Forecast:** Deal Amount × Stage Probability % (HubSpot default)
2. **Bottom-up:** Rep-by-rep forecast roll-up, adjusted by manager judgment
3. **AI Forecast:** HubSpot AI forecast (requires Sales Hub Professional/Enterprise)

### CRM Data Quality Stats (Industry)
- 53% of sales teams have poor CRM data quality
- 79% of CRM data entered by reps is inaccurate or incomplete
- Manual activity logging captures only **28%** of actual activities (automated logging captures 98%)
- These stats explain why HubSpot automation, email sync, and activity capture are critical

---

## 8. HubSpot-Specific Diagnostic Framework

### HubSpot RevOps Maturity Scorecard (40-Point Evaluation)
*Adapted from HubSpot RevOps Certification Workbook*

Rate each area 0–4 (0 = not started, 4 = fully optimized):

#### Category A: Data Foundation (0–12 pts)
| Item | Score 0–4 |
|------|-----------|
| Contact properties defined, named consistently, used consistently | |
| Company properties defined and filled for ICP criteria | |
| No duplicate contacts/companies (deduplication workflows active) | |
| Lead lifecycle stage property properly populated via automation | |
| Required fields enforced at key stage transitions | |
| Data import/export standards documented | |

#### Category B: Process & Workflows (0–16 pts)
| Item | Score 0–4 |
|------|-----------|
| Lead capture → CRM routing workflow operational | |
| MQL definition documented and automated in HubSpot | |
| Lead assignment/rotation workflow active | |
| Deal stage progression workflows with task automation | |
| Lead nurture sequences (email) active for each buyer stage | |
| SLA enforcement workflow (MQL response time alerts) | |
| Lifecycle stage transitions automated (not manual) | |
| Re-engagement workflow for cold contacts | |

#### Category C: Reporting & Visibility (0–12 pts)
| Item | Score 0–4 |
|------|-----------|
| Marketing dashboard (traffic, MQLs, campaigns) | |
| Sales pipeline dashboard (deals, stages, velocity) | |
| Shared revenue dashboard (both teams review weekly) | |
| Deal health indicators (days in stage, no activity alerts) | |
| Forecast report (quota vs. pipeline vs. actuals) | |
| Conversion funnel report (Visitor → MQL → SQL → Close) | |

**Total Score: ____ / 40**
- **0–15:** Foundational — major gaps in automation and data hygiene
- **16–25:** Developing — basic automation in place; reporting inconsistent
- **26–34:** Aligned — good automation; reporting used in decision-making
- **35–40:** Scaled — fully connected system; data-driven selling active

### HubSpot SLA Framework
SLAs (Service Level Agreements) define the commitment between Marketing and Sales:

| SLA Type | Example |
|----------|---------|
| **MQL Response Time** | Marketing commits to X MQLs/month; Sales commits to respond within 1 hour |
| **Lead Quality** | Marketing commits only MQLs meeting ICP criteria are passed |
| **Feedback Loop** | Sales commits to mark leads as Disqualified with reason within 5 days |
| **Data Standards** | Both teams commit to not manually skipping lifecycle stages |

**HubSpot Implementation:**
- Create "MQL Timestamp" property when lifecycle stage = MQL
- Workflow: If MQL Timestamp > 1 hour ago AND no sales activity → create urgent task + Slack alert to manager
- Create "Lead Disqualification Reason" property for sales feedback to marketing

### Lead Lifecycle Stages (HubSpot Standard)
```
Subscriber → Lead → MQL → SQL → Opportunity → Customer → Evangelist
```

**Critical: these should be automated, not manually set.**

Each transition should be triggered by:
- Subscriber → Lead: Form fill (any)
- Lead → MQL: Lead score ≥ threshold OR specific high-intent action
- MQL → SQL: Sales accepts the lead (creates deal or changes contact stage)
- SQL → Opportunity: Deal created in active pipeline
- Opportunity → Customer: Deal marked Closed-Won
- Customer → Evangelist: NPS score ≥ 9 or referral

### HubSpot Property Audit Checklist
Run this when first entering a HubSpot account:

1. **How many custom contact properties exist?**
   - < 20: Likely under-built
   - 20–60: Typical for mid-size
   - > 60: Risk of bloat; audit for unused properties

2. **Check property usage rates:**
   - Navigate to: Settings → Properties → Contact Properties → Sort by "Used in..."
   - Any property with 0 records filled AND not used in workflows → candidate for deletion

3. **Check for conflicting/duplicate properties:**
   - Multiple "Industry" properties? (HubSpot default + custom)
   - Multiple "Lead Source" properties with different names but same purpose?

4. **Check for missing critical properties:**
   - `Lifecycle Stage` (must be automated)
   - `Lead Status` (for sales to track outreach stage)
   - `Lead Score` (for MQL threshold)
   - `Original Source` / `Original Source Drill-down 1 & 2`
   - `HubSpot Owner` (for routing)
   - `Last Activity Date` (auto-set by HubSpot)
   - `Deal Stage` (on deal records)
   - `Close Date` (on deal records — required for forecasting)
   - `Amount` (on deal records — required for revenue reporting)

5. **Check company ↔ contact association:**
   - What % of contacts are associated with a company record?
   - Target: >90% for B2B

### HubSpot Pipeline Audit Checklist
1. **How many pipelines exist?**
   - One per distinct sales motion (New Business, Renewal, Expansion, etc.)
   - Multiple pipelines for the same motion = fragmentation problem

2. **Do pipeline stages match real buying/selling stages?**
   - Stages should reflect buyer decisions, not internal activities
   - Each stage should have a clear exit criterion

3. **Are stage probabilities calibrated to actual win rates?**
   - Pull historical closed-won data; calculate win rate per stage entry
   - Default HubSpot probabilities are generic; replace with actuals

4. **Are there deals stuck in stages?**
   - Build report: Deals by stage with Last Modified Date > 30 days
   - This reveals where the pipeline is bottlenecked

5. **Is Close Date being updated?**
   - Stale close dates (deals past their close date still open) = forecasting inaccuracy

---

## 9. Data Hygiene Maturity Model

*Adapted from Salesforce Data Hygiene Cheat Sheet (Weflow) — principles apply identically to HubSpot*

### 4-Level Maturity Model

| Level | Name | Description |
|-------|------|-------------|
| **1** | Basic Capture | Data entry is ad hoc; no standards; reps fill in what they want |
| **2** | Structured | Required fields enforced; basic naming conventions; import standards |
| **3** | Intelligent | Automated data enrichment; lead scoring; deduplication workflows |
| **4** | Optimization | Real-time data quality monitoring; predictive scores; AI-enhanced |

### 8 Common Data Challenges (and HubSpot Fixes)

| Challenge | HubSpot Fix |
|-----------|-------------|
| Missing data (required fields ignored) | Make fields required on deal/contact stage transitions in workflows |
| Duplicate records | Enable HubSpot duplicate management; create dedup workflow |
| Inconsistent naming conventions | Use dropdown properties instead of free-text where possible |
| Lead source not captured | Set lead source from form submission using "Original Source" property |
| Poor contact-company association | Workflow: if Contact domain matches Company domain → auto-associate |
| Stale/inactive records | Re-engagement workflow: if last activity > 180 days → move to re-engagement |
| No activity logging | Enable email sync (HubSpot Gmail/Outlook extension) for automatic activity capture |
| Stage progression without data | Add required properties to workflow enrollment criteria (can't skip without filling) |

### HubSpot Data Hygiene Workflow Templates

**1. Deduplication Alert:**
- Trigger: New contact created
- Condition: Contact with same email domain + first name exists
- Action: Create internal notification to HubSpot admin

**2. Missing Data Alert:**
- Trigger: Deal stage moves to "Proposal Sent"
- Condition: Company Name OR Amount is empty
- Action: Create task for owner → "Fill missing deal data before proceeding"

**3. Stale Deal Alert:**
- Trigger: Daily scheduled
- Condition: Deal is open AND Last Modified Date > 21 days
- Action: Create task for deal owner → "Update deal or close as lost"

**4. Lifecycle Stage Enforcement:**
- Trigger: Deal Created
- Action: Set associated contact Lifecycle Stage to "Opportunity" (if not already Customer)

**5. Contact-Company Auto-Association:**
- Trigger: New contact created
- Condition: Email domain matches existing company domain
- Action: Associate contact to company

---

## 10. Common RevOps Pitfalls & Fixes

*From Strategic RevOps Cheat Sheet (Weflow) + Diorio & Hummel*

### 8 Strategic Pitfalls

| Pitfall | Symptom in HubSpot | Fix |
|---------|-------------------|-----|
| **1. Ad-hoc overload** | Every request gets a new workflow; no standards | Build a workflow governance policy: name, owner, purpose, review date on every workflow |
| **2. Poor GTM alignment** | Marketing sends leads Sales ignores | Create MQL criteria together; build feedback loop property (Sales → Marketing) |
| **3. Weak data strategy** | Properties created randomly; no ICP tracking | Audit properties; define core data model; create required fields |
| **4. No strategy time** | RevOps only reacts to tickets; no proactive improvement | Block weekly RevOps strategy time; quarterly audit calendar |
| **5. Role misunderstood** | RevOps seen as "CRM admin" | Reframe RevOps as revenue architect: present pipeline health, not just tech support |
| **6. Tech stack chaos** | 20+ tools; data doesn't flow between them | Audit integrations; ensure HubSpot is the system of record; consolidate where possible |
| **7. Weak forecasting** | Forecast is gut-feel; pipeline is not reliable | Enforce deal stage criteria; build weighted forecast report; weekly pipeline review |
| **8. Tool-first mindset** | Buying new software before fixing process | Fix process first, then automate it — not the reverse |

### Revenue Leakage Points (Where to Look in HubSpot)
Revenue leaks through "air gaps" — gaps between Marketing, Sales, and CS:

| Leakage Point | HubSpot Diagnostic |
|--------------|-------------------|
| MQLs not followed up on | Report: MQLs with no activity > 48 hours |
| Deals lost to "no decision" | Lost reason property analysis |
| Pricing errors / discounts given without authority | CPQ check; deal amount vs. quoted amount |
| Customers not contacted for renewal | Automated renewal workflow missing |
| Expansion opportunities missed | No cross-sell/upsell workflow for existing customers |
| Customer churn signals not acted on | No health score or churn risk property defined |

---

## 11. Dashboard & Reporting Templates

*From RevOps Reports & Dashboards Cheat Sheet (Weflow)*

### 6 Essential HubSpot Dashboards

#### Dashboard 1: Pipeline Velocity
Metrics to include:
- Pipeline by stage (count + value)
- Avg days in each stage
- Pipeline velocity formula: (Deals × Deal Size × Win Rate) / Avg Sales Cycle
- Deal velocity trend (week over week)

#### Dashboard 2: Pipeline Waterfall
Shows how pipeline changes over time:
- New deals created this period
- Deals pushed to next period
- Deals lost/won
- Net pipeline change

#### Dashboard 3: Stage Conversion Funnel
- Lead → MQL → SQL → Opportunity → Closed-Won rates
- Identify the weakest conversion point (biggest drop-off = biggest opportunity)
- Compare by rep, by lead source, by segment

#### Dashboard 4: At-Risk Opportunities
- Deals past close date (still open)
- Deals with no activity in last 14/21 days
- Deals missing key data (Amount, Company, Next Step)
- Deals in a stage longer than average

#### Dashboard 5: Forecast vs. Actuals
- Quota (set as target in HubSpot)
- Weighted pipeline (stage × probability)
- Committed (Best Case + Commit categories)
- Closed-Won to date
- Gap to quota

#### Dashboard 6: Marketing → Revenue Funnel
- Traffic by source
- MQLs created this period by source
- MQL → SQL conversion rate by source
- Revenue attributed by source (multi-touch)
- CAC by channel

### Deal Health Signals (What Makes a "Healthy" Deal)
From Conversation Intelligence research:
1. **Next Steps defined** — Is there a logged next step with a date?
2. **Activity velocity** — Is the activity level increasing or decreasing as deal progresses?
3. **Multi-threading** — Are we talking to 2+ contacts at the account (not single-threaded)?
4. **Access to power** — Have we engaged with a decision-maker (Director level or above)?
5. **Sales methodology completion** — Has the rep completed MEDDIC/SPICED criteria fields?
6. **Mutual action plan** — Is there a shared timeline with the prospect?

**HubSpot Implementation:**
- Create a "Deal Health Score" calculated property based on these signals
- Build report: Deals with health score < 50 AND close date this quarter → flag for manager review

---

## 12. Forecasting Framework

*From Sales Forecasting Cheat Sheet + Ultimate Sales Forecasting Guide (Weflow)*

### 6-Step Forecasting Process

| Step | Decision | HubSpot Action |
|------|---------|----------------|
| 1. **Forecast Number** | What are we trying to predict? (Bookings, MRR, ARR, Revenue) | Define primary deal metric: Amount or Monthly Recurring Revenue |
| 2. **Frequency** | How often do we forecast? (Weekly recommended) | Set weekly pipeline review cadence; use HubSpot forecast tool |
| 3. **Record Types** | What objects does forecast cover? (New, Renewal, Expansion) | Separate pipelines per revenue type |
| 4. **Forecast Categories** | Pipeline / Best Case / Commit / Closed | Enable HubSpot Forecast Categories (Sales Hub Pro+) |
| 5. **Forecast Type** | Weighted / Bottom-up / AI | Start with weighted; add AI forecast when data is sufficient |
| 6. **Operating Cadence** | Who reviews, when, what actions result | Weekly 1:1s → team forecast call → manager rollup → leadership |

### 3 Core Forecasting Problems
1. **Missing CRM data** — Deals without Amount, Close Date, or Stage are invisible to the forecast
2. **Poor pipeline visibility** — Reps over-promise; managers don't have ground truth
3. **Inefficient process** — Forecast is built in spreadsheets, not HubSpot; takes hours each week

### HubSpot Forecast Prerequisites
- Every open deal MUST have: Amount, Close Date, Pipeline, Deal Stage, HubSpot Owner
- Deal Stage probabilities must reflect actual historical win rates
- Forecast Categories must be filled by reps (not auto-set)
- Weekly discipline: reps update pipeline before Monday stand-up

### Capacity Modeling (Strategic Planning)
| Step | Question |
|------|----------|
| 1 | What is the revenue target? (annual) |
| 2 | What is the avg deal size? |
| 3 | What is the win rate? |
| 4 | What is the avg sales cycle? |
| 5 | How many reps are needed? (Leads Needed / Deals per Rep) |

Formula: **Reps Needed = (Revenue Target / Avg Deal Size) / (Win Rate × Avg Deals per Rep per Period)**

---

## 13. Revenue Cadence (Ceremonies & Meetings)

*From Revenue Cadence Guide (Weflow)*

### Weekly Rhythm
| Day | Activity | HubSpot Prep |
|-----|---------|-------------|
| Monday | Pipeline Review — all open deals reviewed | Pull "At-Risk" dashboard; update all deals before meeting |
| Tuesday | Forecast Call — rep + manager commit for the week | Pull forecast report; review Commit vs. quota gap |
| Wednesday | Marketing Sync — review MQL quality + volume | Pull MQL report; review lead source attribution |
| Friday | CRM Tidy-Up — reps update deal data | Send automated reminder: "Update your deals for accuracy" |

### Types of Revenue Ceremonies
| Ceremony | Frequency | Participants | Purpose |
|---------|-----------|-------------|---------|
| **Rep 1:1** | Weekly | Rep + Manager | Deal coaching, pipeline review, deal-level forecast |
| **Team Pipeline Review** | Weekly | Full Sales Team | Pipeline health, best practices sharing |
| **Forecast Roll-Up** | Weekly | Sales Mgr + CRO | Consolidated forecast; commit to leadership |
| **Revenue Review** | Monthly | Sales + Marketing + CS | Full funnel review; MQL quality, win rates, NRR |
| **QBR (Quarterly)** | Quarterly | All leadership | Performance vs. plan; strategy alignment |
| **Board Reporting** | Monthly/Quarterly | CRO/CEO + Board | ARR, NRR, churn, CAC payback, pipeline coverage |

### HubSpot Automation for Cadence
- Scheduled workflow: Every Monday 8am → create task for all deal owners "Review and update your open deals"
- Workflow: Deal close date = next 7 days AND no activity last 3 days → alert manager via email
- Workflow: New MQL created → create task for rep "Follow up within 1 hour" + set due date

---

## 14. HubSpot Workflow Audit Checklist

### Workflow Health Assessment
For each active workflow, check:
- [ ] Does it have a clear name? (Format: [Object] [Trigger] [Action] — e.g., "Contact - MQL Score - Notify Rep")
- [ ] Does it have an owner listed in the description?
- [ ] Does it have a last-reviewed date in the description?
- [ ] Is the enrollment trigger specific enough? (Not overly broad)
- [ ] Are there suppression lists to prevent duplicate enrollments?
- [ ] Does it have test contacts it was tested on?
- [ ] Is it still active and needed? (Not outdated from old campaigns)

### Critical Workflows That Should Exist
| # | Workflow Name | Trigger | Actions |
|---|-------------|---------|---------|
| 1 | **Lead Capture → Lifecycle** | Form submitted | Set Lifecycle Stage = Lead |
| 2 | **MQL Assignment** | Lead Score ≥ threshold | Set Lifecycle = MQL; Assign owner; Create task; Send internal email |
| 3 | **MQL SLA Alert** | MQL date > 1 hour AND no activity | Alert manager; escalate task |
| 4 | **Deal Created → Contact Stage** | Deal created | Set associated contact Lifecycle = Opportunity |
| 5 | **Deal Closed Won → Customer** | Deal stage = Closed Won | Set contact Lifecycle = Customer; enroll in onboarding sequence |
| 6 | **Deal Closed Lost → Re-nurture** | Deal stage = Closed Lost | Set contact Lifecycle = Lead; enroll in nurture sequence (90-day delay) |
| 7 | **Stale Deal Alert** | Deal open AND last modified > 21 days | Create task for owner: update or close |
| 8 | **Missing Deal Data Alert** | Deal stage moves | If Amount or Close Date blank → alert owner |
| 9 | **Contact-Company Association** | New contact created | If email domain matches company → associate |
| 10 | **Re-engagement (Cold Leads)** | Last activity date > 180 days AND Lifecycle = Lead | Enroll in re-engagement email sequence |
| 11 | **Customer Health Check** | Monthly trigger | If customer has no recent activity → create CS task "Check in with customer" |
| 12 | **Renewal Alert** | Deal Close Date = 60 days away AND Deal Type = Renewal | Create task for AE + CSM: initiate renewal conversation |

### Common Workflow Errors to Diagnose
| Error | Symptoms | Fix |
|-------|---------|-----|
| **Infinite loop** | Contact enrolled thousands of times | Add re-enrollment control; check if action re-triggers enrollment condition |
| **Missing unenrollment** | Contacts stuck in workflow forever | Add "Goal" criteria or unenrollment condition |
| **Overly broad enrollment** | Entire database re-enrolls on every edit | Use "Contact is created" not "Contact property changes" unless specific |
| **Conflicting workflows** | Two workflows fight over same property | Document all workflows; use suppression lists |
| **Dead-end nurture** | Nurture emails end but contact stays in sequence | Add exit criteria or follow-up workflow after sequence ends |
| **Timing errors** | Emails sent at 3am on weekends | Use send-time optimization or restrict to business hours |

---

## 15. First-Day Diagnostic Questions (MCP Tool Use)

*When first connecting to a new HubSpot instance, gather this context to inform all recommendations*

### About the Company
1. What industry is this company in?
2. What is the company's primary go-to-market motion? (Outbound sales / inbound marketing / PLG / channel)
3. What is the typical deal size and sales cycle length?
4. Is this primarily new customer acquisition, or is there significant renewal/expansion revenue?
5. How large is the revenue team? (# marketing, # sales reps, # CSMs)

### About the HubSpot Setup
6. Which HubSpot Hubs are active? (Marketing, Sales, Service, CMS, Operations)
7. What subscription tier? (Starter / Professional / Enterprise)
8. How long has HubSpot been in use?
9. Were contacts migrated from another CRM? (Data quality risk)
10. Is there a primary HubSpot admin? Or is admin responsibility shared/informal?

### About Current Pain Points
11. What is the biggest frustration the sales team has with HubSpot right now?
12. What is the biggest frustration the marketing team has?
13. Are there reports or dashboards leadership looks at regularly, or is reporting ad hoc?
14. Are there workflows that "aren't working" or producing unexpected results?
15. Are there integrations with other tools? (Salesforce, Slack, Intercom, Gong, ZoomInfo, etc.)

### About RevOps Maturity
16. Is there a dedicated RevOps or Sales Ops person?
17. Is there a documented ICP (Ideal Customer Profile)?
18. Is there a documented lead scoring model?
19. Are there SLAs between Marketing and Sales?
20. Is there a weekly pipeline review cadence?

---

## 16. MCP Tool — Recommended Architecture

### Core Capabilities to Build
1. **HubSpot Connection Layer**
   - Private App authentication (token-based)
   - Read: Contacts, Companies, Deals, Pipelines, Properties, Workflows, Reports, Owners
   - Write (with confirmation): Update properties, create workflows, create tasks
   - Scopes needed: `crm.objects.contacts.read`, `crm.objects.companies.read`, `crm.objects.deals.read`, `crm.schemas.contacts.read`, `crm.schemas.companies.read`, `automation`, `reports`

2. **Diagnostic Engine**
   - Property audit (count, fill rate, duplicates)
   - Pipeline health report (stale deals, missing data, stage distribution)
   - Workflow audit (active count, errors, missing critical workflows from list above)
   - Data quality score (% contacts with required fields filled)
   - Lifecycle stage distribution (how many in each stage)

3. **Benchmark Comparison**
   - Compare client metrics to benchmarks in Section 7 above
   - Flag any metric > 20% below benchmark as "Critical Issue"
   - Flag any metric 10–20% below as "Improvement Opportunity"

4. **Recommendation Engine**
   - Map diagnostic findings → Smart Actions (Section 6 above)
   - Prioritize recommendations by: (a) data quality first, (b) workflow automation second, (c) reporting third, (d) advanced features last
   - Use RevOps Maturity Model (Section 5) to place client on maturity curve

5. **Workflow Builder Guidance**
   - Given a goal ("I want to automatically follow up with MQLs"), output the workflow logic
   - Validate proposed workflow against common errors (Section 14 above)
   - Check that prerequisite properties and lists exist before recommending workflow

6. **Natural Language Q&A**
   - "What is our win rate?" → pull data from HubSpot API → calculate → compare to benchmark
   - "Which deals are at risk?" → run at-risk criteria → return deal list
   - "What workflows should I build first?" → run diagnostic → return prioritized list

### Minimum HubSpot Subscription for Full MCP Functionality
| Feature | Required Tier |
|---------|-------------|
| Properties API (read contact/company schemas) | Free |
| Deals API | Free |
| Workflows API (read/write) | **Sales Hub Professional** (~$90/seat/month) |
| Forecast API | Sales Hub Professional |
| Custom Reports API | Marketing Hub Professional |
| AI Forecast | Sales Hub Enterprise |
| Advanced Sequences | Sales Hub Professional |

**Minimum viable:** Sales Hub Professional on at least one paid seat.

---

## Sources
- Diorio, S. & Hummel, C. *Revenue Operations: A New Way to Align Sales & Marketing* (Wiley, 2022)
- HubSpot RevOps Certification Workbook
- Weflow Cheat Sheet Series: RevOps, Strategic RevOps, RevOps Metrics & Benchmarks, Sales Forecasting, Revenue Cadence, Board Reporting, Conversation Intelligence, Data Hygiene, Dashboards & Reports
- HubSpot API Documentation (private app authentication, scopes, object APIs)
