# UAT Checklist — HubSpot RevOps MCP Server

Run after `npx tsx scripts/seed-uat.ts` has populated the trial account.
Call each tool in Claude and verify the expected output.

---

## Setup verification

Before running tool tests:
- [ ] `HUBSPOT_ACCESS_TOKEN` in `.env.local` points to the **read-only** Private App
- [ ] MCP server is running (`npm run dev`) or deployed to Vercel
- [ ] MCP server is connected to Claude (check Settings → Integrations)

---

## Tool Tests

### 1. `get_account_overview`
**Call:** "Give me an overview of this HubSpot account"

**Expected:**
- Contacts: ~20
- Companies: ~5
- Deals: ~15
- Pipelines: 1 (Sales Pipeline or similar)
- Users: at least 1 (your trial account email)
- Workflows: either a count OR a "check automation scope" message

**Pass criteria:** All 5 sections appear, no error

---

### 2. `audit_properties` — contacts
**Call:** "Audit the contact properties"

**Expected:**
- Shows total property count (usually 100+)
- Lists HubSpot default vs custom
- Reports "All critical properties exist" (default account has all core fields)
- Field type breakdown (text, select, date, etc.)

**Pass criteria:** No error, critical properties section appears

---

### 3. `audit_properties` — deals
**Call:** "Audit the deal properties"

**Expected:**
- Shows deal property list
- Critical deal properties (dealname, amount, closedate, dealstage, pipeline, hubspot_owner_id) all present

**Pass criteria:** No error, no missing critical properties flagged

---

### 4. `audit_pipelines`
**Call:** "Show me the pipeline setup"

**Expected:**
- Lists 1 pipeline ("Sales Pipeline" or default name)
- Shows each stage with probability %
- If any stages have no probability: flags them
- No "too many pipelines" warning (only 1 pipeline)

**Pass criteria:** Stages and probabilities displayed

---

### 5. `get_pipeline_health`
**Call:** "How healthy is our deal pipeline?"

**Expected:**
- ~15 deals analysed
- Missing Amount: **1** deal ("Bright Ventures — TBD Scope")
- Past Close Date: **2** deals ("Acme Corp — Q1 Renewal", "EdgeNet — Custom Integration")
- No Activity 21+ Days: **3–4** deals (2 stale + 2 overdue)
- Stage distribution shows deal counts per stage
- Recommendation to make Amount required

**Pass criteria:** Counts match seed data (±1 for timing differences)

---

### 6. `get_at_risk_deals`
**Call:** "Which deals are at risk?"

**Expected:**
- Returns **4 deals**:
  - CloudStack — Starter Package (28d no activity)
  - DataFlow — Pro Tier Expansion (35d no activity)
  - Acme Corp — Q1 Renewal (15d past close date)
  - EdgeNet — Custom Integration (30d past close date + stale)
- Each shows: name, stage, amount, owner, risk reason

**Pass criteria:** At least 3–4 at-risk deals returned with risk reason

---

### 7. `get_lifecycle_distribution`
**Call:** "Show me the lifecycle stage distribution"

**Expected:**
- Subscriber: 3
- Lead: 5
- MQL: 3
- SQL: 2
- Opportunity: 2
- Customer: 3
- Evangelist: 1
- Other: 1
- Conversion rates shown (Lead → MQL etc.)

**Pass criteria:** Counts approximately match above (±1)

---

### 8. `audit_workflows`
**Call:** "List all workflows"

**Requires:** Sales Hub Professional trial

**Expected (Pro trial):**
- Shows count of active/inactive workflows
- Default HubSpot trial may have 0–2 sample workflows
- "0 workflows not updated in 6+ months" (all are new)

**Expected (free tier):**
- Error message: "requires the automation scope on your Private App, and Sales Hub Professional or higher"

**Pass criteria:** Either a workflow list OR a clear scope error (not a generic crash)

---

### 9. `check_critical_workflows`
**Call:** "Which critical workflows are missing?"

**Requires:** Sales Hub Professional trial

**Expected:**
- Present: 0–2 (default HubSpot sample workflows may partially match)
- Missing: 10–12 (trial account has no custom workflows built)
- Prioritised list of what to build first

**Pass criteria:** Gap list appears, tool doesn't crash on empty workflow account

---

### 10. `get_deal_metrics`
**Call:** "What are our deal metrics for the last 90 days?"

**Expected:**
- Closed-Won deals analysed: **5**
- Average Deal Size: ~$21,120 (sum of 28800+12000+19200+36000+9600 / 5)
- Average Sales Cycle: some value in days (based on createdate vs closedate)
- Open Pipeline Value: sum of the ~10 open deals with amounts

**Pass criteria:** Avg deal size is in the ~$15K–$28K range, no error

---

### 11. `get_owner_performance`
**Call:** "How are the sales reps performing?"

**Expected:**
- Table with 2–3 rows (your trial user + "Unassigned")
- Unassigned: 1 open deal ("CloudStack — Inbound Inquiry")
- Your user: split of the remaining deals

**Pass criteria:** Table renders, Unassigned row appears

---

### 12. `diagnose_revops_maturity`
**Call:** "What is our RevOps maturity level?"

**Expected:**
- Level: **1 or 2** (Foundational or Developing)
  - Evidence: pipeline exists ✅, stages have probabilities ✅, MQLs exist ✅
  - Missing: <5 active workflows ❌, <15 workflows ❌
- Signals listed with ✅/❌
- Next steps provided

**Pass criteria:** Level 1 or 2 returned, signals list appears

---

### 13. `get_how_to_guide`
**Call:** "How do I create a workflow in HubSpot?"

**Expected:**
- Step-by-step instructions for workflow creation
- Navigation path like: Automation → Workflows → Create workflow
- No HubSpot API calls needed (pure knowledge base)

**Also test:** "How do I set up lead scoring?", "How do I fix duplicate contacts?", "How do I build a dashboard?"

**Pass criteria:** Relevant how-to content returned for each topic

---

### 14. `search_contacts`
**Call:** "Search for contacts at Acme"

**Expected:**
- Returns Alice Baker, Frank Green, Karen Lewis, Paul Quinn (all at Acme Corp)
- Shows email, lifecycle stage, company

**Also test:** "search for alice.baker@acmecorp" and "search for Clara"

**Pass criteria:** Matching contacts returned

---

### 15. `get_owners`
**Call:** "List all HubSpot users"

**Expected:**
- Your trial account email address
- Possibly one or two HubSpot system users

**Pass criteria:** At least 1 user returned with email

---

### 16. `get_common_pitfalls`
**Call:** "What are the most common HubSpot mistakes?"

**Expected:**
- List of 8 pitfalls with symptoms and fixes
- No HubSpot API calls needed

**Pass criteria:** Full pitfall list returned

---

## Summary scorecard

| # | Tool | Status | Notes |
|---|------|--------|-------|
| 1 | get_account_overview | ☐ | |
| 2 | audit_properties (contacts) | ☐ | |
| 3 | audit_properties (deals) | ☐ | |
| 4 | audit_pipelines | ☐ | |
| 5 | get_pipeline_health | ☐ | |
| 6 | get_at_risk_deals | ☐ | |
| 7 | get_lifecycle_distribution | ☐ | |
| 8 | audit_workflows | ☐ | Pro only |
| 9 | check_critical_workflows | ☐ | Pro only |
| 10 | get_deal_metrics | ☐ | |
| 11 | get_owner_performance | ☐ | |
| 12 | diagnose_revops_maturity | ☐ | |
| 13 | get_how_to_guide | ☐ | |
| 14 | search_contacts | ☐ | |
| 15 | get_owners | ☐ | |
| 16 | get_common_pitfalls | ☐ | |
