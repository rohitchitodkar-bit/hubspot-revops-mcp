/**
 * Embedded knowledge base.
 * Contains: RevOps benchmarks, critical workflow checklist, HubSpot how-to guide sections.
 * Source: revops_knowledge_base.md + hubspot_how_to_guide.md
 */

// ─── Benchmarks ──────────────────────────────────────────────────────────────

export interface Benchmark {
  label: string;
  good: number;
  warning: number;
  unit: string;
  description: string;
  direction: 'higher_better' | 'lower_better';
}

export const BENCHMARKS: Record<string, Benchmark> = {
  win_rate: {
    label: 'Win Rate',
    good: 0.25,
    warning: 0.15,
    unit: '%',
    description: 'Closed-Won / (Closed-Won + Closed-Lost)',
    direction: 'higher_better',
  },
  pipeline_coverage: {
    label: 'Pipeline Coverage',
    good: 3.5,
    warning: 2.0,
    unit: 'x',
    description: 'Total open pipeline value / period quota',
    direction: 'higher_better',
  },
  mql_to_sql: {
    label: 'MQL → SQL Conversion',
    good: 0.15,
    warning: 0.08,
    unit: '%',
    description: 'SQLs created / MQLs generated',
    direction: 'higher_better',
  },
  mql_response_hours: {
    label: 'MQL Response Time',
    good: 1,
    warning: 4,
    unit: 'hours',
    description: 'Hours from MQL creation to first sales activity',
    direction: 'lower_better',
  },
  cac_payback_months: {
    label: 'CAC Payback',
    good: 12,
    warning: 18,
    unit: 'months',
    description: 'Months to recover cost of customer acquisition',
    direction: 'lower_better',
  },
  nrr: {
    label: 'Net Revenue Retention (NRR)',
    good: 1.1,
    warning: 1.0,
    unit: '%',
    description: '(Beginning MRR + Expansion − Contraction − Churn) / Beginning MRR',
    direction: 'higher_better',
  },
  grr: {
    label: 'Gross Revenue Retention (GRR)',
    good: 0.9,
    warning: 0.8,
    unit: '%',
    description: '(Beginning MRR − Contraction − Churn) / Beginning MRR',
    direction: 'higher_better',
  },
  annual_churn: {
    label: 'Annual Churn Rate',
    good: 0.05,
    warning: 0.1,
    unit: '%',
    description: 'Churned customers / beginning customers (annual)',
    direction: 'lower_better',
  },
};

// ─── Critical Workflows Checklist ────────────────────────────────────────────

export interface CriticalWorkflow {
  id: string;
  name: string;
  trigger: string;
  purpose: string;
  keywords: string[]; // used to fuzzy-match against real workflow names
}

export const CRITICAL_WORKFLOWS: CriticalWorkflow[] = [
  {
    id: 'lead_lifecycle',
    name: 'Lead Capture → Lifecycle Stage',
    trigger: 'Form submitted',
    purpose: 'Sets Lifecycle Stage = Lead on any form fill',
    keywords: ['form', 'submit', 'lifecycle', 'lead'],
  },
  {
    id: 'mql_assignment',
    name: 'MQL Assignment',
    trigger: 'Lead Score ≥ threshold',
    purpose: 'Sets Lifecycle = MQL, assigns owner, creates task, sends alert',
    keywords: ['mql', 'qualify', 'score', 'assign', 'owner'],
  },
  {
    id: 'mql_sla',
    name: 'MQL SLA Alert',
    trigger: 'MQL not contacted within 1 hour',
    purpose: 'Alerts manager when MQL has no activity after 1 hour',
    keywords: ['sla', 'response', 'mql', 'alert', 'follow'],
  },
  {
    id: 'deal_contact_stage',
    name: 'Deal Created → Contact Lifecycle',
    trigger: 'Deal is created',
    purpose: 'Sets associated contact Lifecycle Stage = Opportunity',
    keywords: ['deal', 'create', 'opportunity', 'lifecycle'],
  },
  {
    id: 'closed_won_onboarding',
    name: 'Closed Won → Onboarding',
    trigger: 'Deal stage = Closed Won',
    purpose: 'Sets contact Lifecycle = Customer, creates CS task, notifies CS team',
    keywords: ['closed won', 'onboard', 'customer', 'cs', 'success'],
  },
  {
    id: 'closed_lost_nurture',
    name: 'Closed Lost → Re-nurture',
    trigger: 'Deal stage = Closed Lost',
    purpose: 'Enrolls contact in long-term nurture sequence',
    keywords: ['closed lost', 'lost', 'nurture', 're-engage'],
  },
  {
    id: 'stale_deal_alert',
    name: 'Stale Deal Alert',
    trigger: 'Deal open AND last modified > 21 days',
    purpose: 'Creates task for owner to update or close the deal',
    keywords: ['stale', 'no activity', 'stuck', 'overdue', 'inactive'],
  },
  {
    id: 'missing_deal_data',
    name: 'Missing Deal Data Alert',
    trigger: 'Deal stage advances',
    purpose: 'Alerts owner if Amount or Close Date is blank',
    keywords: ['missing', 'amount', 'close date', 'data', 'required'],
  },
  {
    id: 'contact_company_association',
    name: 'Contact-Company Auto-Association',
    trigger: 'New contact created',
    purpose: 'Associates contact to company with matching email domain',
    keywords: ['company', 'associate', 'domain', 'email', 'link'],
  },
  {
    id: 'cold_lead_reengagement',
    name: 'Cold Lead Re-engagement',
    trigger: 'Last activity > 180 days AND Lifecycle = Lead',
    purpose: 'Enrolls cold contacts in re-engagement email sequence',
    keywords: ['cold', 're-engage', 'inactive', '180', 'sequence'],
  },
  {
    id: 'customer_health_check',
    name: 'Customer Health Check',
    trigger: 'Monthly recurring trigger',
    purpose: 'Creates CS task to check in with customers with no recent activity',
    keywords: ['health', 'customer', 'check', 'monthly', 'retention'],
  },
  {
    id: 'renewal_alert',
    name: 'Renewal Alert',
    trigger: 'Deal Close Date = 60 days away AND Deal Type = Renewal',
    purpose: 'Creates task for AE + CSM to initiate renewal conversation',
    keywords: ['renewal', 'renew', 'expire', 'close date', 'contract'],
  },
];

// ─── RevOps Maturity Model (condensed) ───────────────────────────────────────

export const MATURITY_LEVELS = [
  {
    level: 1,
    name: 'Foundational',
    description:
      'Basic HubSpot setup. Properties exist but are inconsistently filled. ' +
      'No automated lifecycle stage transitions. Pipeline stages exist but no entry/exit criteria. ' +
      'Reporting is ad hoc. No shared dashboards.',
    signals: [
      'Less than 5 active workflows',
      'Lifecycle stages manually updated',
      'No lead scoring configured',
      'Multiple pipelines for the same sales motion',
      'No MQL definition documented',
    ],
  },
  {
    level: 2,
    name: 'Developing',
    description:
      'Core automation in place. Lifecycle stages automated via workflows. ' +
      'Lead scoring configured but not yet validated against conversion data. ' +
      'Basic dashboards exist. Pipeline has stage probability weights.',
    signals: [
      '5–15 active workflows',
      'Lifecycle stage transitions automated',
      'Lead score property exists',
      'Pipeline stage probabilities set',
      'At least one shared dashboard',
    ],
  },
  {
    level: 3,
    name: 'Aligned',
    description:
      'Marketing and Sales aligned on MQL definition and SLAs. ' +
      'Deal stage workflows automate tasks. Weekly pipeline review cadence. ' +
      'Shared reporting that both teams trust. Forecast categories used.',
    signals: [
      '15–30 active workflows',
      'SLA enforcement workflow exists',
      'Deal stage automation active',
      'Forecast categories configured',
      'Weekly pipeline review cadence',
    ],
  },
  {
    level: 4,
    name: 'Scaled',
    description:
      'Full-funnel automation with revenue lifecycle coverage. ' +
      'ABM target accounts configured. Renewal automation active. ' +
      'Data-driven forecasting. Sequences used systematically. ' +
      'All 12 critical workflows deployed.',
    signals: [
      '30+ active workflows',
      'All 12 critical workflows present',
      'ABM target accounts configured',
      'Renewal workflow active',
      'Playbooks linked to deal stages',
      'AI forecast enabled',
    ],
  },
];

// ─── How-To Guide Sections ───────────────────────────────────────────────────

export interface HowToSection {
  title: string;
  keywords: string[];
  content: string;
}

export const HOW_TO_GUIDE: HowToSection[] = [
  {
    title: 'Create a Contact Property',
    keywords: ['property', 'create property', 'add field', 'custom field', 'contact field'],
    content: `
**Path:** Settings → Properties → Contact → Create property

1. Click **Create property** (top right).
2. Set **Group** — use a meaningful group name (e.g., "Lead Qualification").
3. Set **Label** — human-readable name.
4. Choose **Field type**:
   - *Dropdown select* — best for standardised values (industry, lead source, status).
   - *Single-line text* — free text; hard to report on; avoid unless necessary.
   - *Date picker* — for dates (e.g., Contract Renewal Date).
   - *Number* — for numeric values used in calculations.
   - *Score* — for lead scoring.
5. Add dropdown options if applicable → click **+ Add option**.
6. Click **Create**.

**Tip:** You cannot change the field type after creation. If you need to change it, create a new property and migrate data via a workflow ("Copy property value" action).
    `.trim(),
  },
  {
    title: 'Create a Workflow (Contact-Based)',
    keywords: ['workflow', 'create workflow', 'automation', 'automate', 'trigger', 'action'],
    content: `
**Path:** Automation → Workflows → Create workflow → From scratch → Contact-based

1. Choose your **trigger** (enrollment criteria):
   - *Form is submitted* — fires on a specific form.
   - *Contact property is set/changed* — fires when a property updates.
   - *Lead Score is greater than or equal to X* — for MQL automation.
2. Click **Set up triggers** → configure → **Save**.
3. Click **+** to add **actions**:
   - *Set property value* — update a contact property.
   - *Create task* — assign a to-do to the contact owner.
   - *Send internal email notification* — alert a team member.
   - *Rotate contact to owner* — round-robin assignment.
   - *Enroll in sequence* — start a sales sequence (Sales Hub Pro required).
   - *Delay* — wait X days before next action.
   - *If/then branch* — split based on a condition.
4. Add **Unenrollment criteria** (top right of editor) — when contacts should EXIT mid-flow.
5. Toggle **Re-enrollment** on if the workflow should re-fire when the trigger is met again.
6. Click **Review and publish** → **Turn on**.

**Naming convention:** [Object] | [Trigger] | [Main Action]
Example: "Contact | MQL Score ≥ 50 | Assign Owner + Create Task"

Add in Description field: owner name, creation date, purpose.
    `.trim(),
  },
  {
    title: 'Create a Deal-Based Workflow',
    keywords: ['deal workflow', 'deal automation', 'deal stage workflow', 'stage trigger'],
    content: `
**Path:** Automation → Workflows → Create workflow → From scratch → Deal-based

1. Set trigger: *Deal stage is equal to "[Stage Name]"*
   Example: "Deal stage = Proposal Sent"
2. Add actions:
   - *Create task*: Title "Follow up on proposal", Due 3 days from now, assign to Deal Owner.
   - *Send internal email notification*: Alert the deal owner's manager.
3. Add unenrollment: *Deal stage = Closed Won OR Closed Lost* — so completed deals exit.
4. Click **Turn on**.

**Common deal workflows to build:**
- Stage → auto-create follow-up task.
- Closed Won → set contact Lifecycle = Customer, create CS onboarding task.
- Closed Lost → enroll contact in long-term re-nurture sequence.
- Stale (no activity 21+ days) → alert owner to update or close.
    `.trim(),
  },
  {
    title: 'Set Up Lead Scoring',
    keywords: ['lead score', 'scoring', 'mql score', 'score property', 'lead qualification'],
    content: `
**Path:** Settings → Properties → Contact → find "HubSpot Score" (or create a Score property)

1. Create or open a Score property → click **Manage score criteria**.
2. **Positive attributes** (add points):
   - Job Title contains "VP", "Director", "Head of" → +10 pts
   - Company Size > 50 employees → +5 pts
   - Pricing page visited → +15 pts
   - Demo request form submitted → +25 pts
   - Downloaded a case study → +8 pts
   - Email link clicked ≥ 2 in last 30 days → +8 pts
   - Industry = your ICP industry → +10 pts
3. **Negative attributes** (subtract points):
   - Email domain contains "gmail", "yahoo", "hotmail" → -10 pts
   - Job Title contains "student", "intern" → -15 pts
   - Unsubscribed from all email → -20 pts
4. Save each criterion.
5. Set MQL threshold: total score where a lead is "sales ready" (start at 30–50; adjust based on data).
6. Build a workflow: *Lead Score ≥ [threshold]* → Set Lifecycle Stage = MQL → Assign owner → Create task.
    `.trim(),
  },
  {
    title: 'Configure Pipeline Stages',
    keywords: ['pipeline', 'deal stages', 'configure pipeline', 'stage probability', 'required fields pipeline'],
    content: `
**Path:** Settings → Objects → Deals → Pipelines

**Add or edit a pipeline:**
1. Click **Add pipeline** (or click existing pipeline name to edit).
2. For each stage, set:
   - **Stage name** — reflects a buyer decision, not an internal activity.
     Good: "Discovery Completed" | Bad: "Had a call"
   - **Win probability** — % of deals entering this stage that historically close.
     Start with a rough estimate; update after 3 months of data.
3. Drag stages to reorder.
4. Click **Save**.

**Add required fields per stage:**
1. Click **Edit** next to a stage.
2. Under *Required properties*, click **Add a required property**.
3. Add: Amount, Close Date (on "Proposal Sent" or earlier).
4. Click **Save**.

**Best practice pipeline stages for SaaS:**
Prospecting → Discovery → Demo Scheduled → Demo Completed → Proposal Sent → Negotiation → Closed Won / Closed Lost
    `.trim(),
  },
  {
    title: 'Automate Lifecycle Stage Transitions',
    keywords: ['lifecycle', 'lifecycle stage', 'mql', 'sql', 'lifecycle automation', 'subscriber lead customer'],
    content: `
Each lifecycle stage transition should be a workflow (never set manually):

**Subscriber → Lead:** Any form fill
- Trigger: Form submitted (any form)
- Action: Set Lifecycle Stage = Lead (if current value is blank or Subscriber)

**Lead → MQL:** Score threshold
- Trigger: Lead Score ≥ [threshold]
- Action: Set Lifecycle Stage = MQL

**MQL → SQL:** Sales accepts the lead
- Trigger: Deal is created AND associated contact Lifecycle Stage is MQL
- Action: Set associated contact Lifecycle Stage = SQL

**SQL → Opportunity:** Deal in pipeline
- Trigger: Deal is created (deal-based workflow)
- Action: Set associated contact Lifecycle Stage = Opportunity

**Opportunity → Customer:** Deal closed won
- Trigger: Deal stage = Closed Won
- Action: Set associated contact Lifecycle Stage = Customer

**Important:** HubSpot lifecycle stages only move *forward* automatically. If a contact is already a Customer, setting them to Lead won't work unless you explicitly check "Always set value" in the Set Property action.
    `.trim(),
  },
  {
    title: 'Build a Dashboard and Reports',
    keywords: ['dashboard', 'report', 'reporting', 'create report', 'pipeline report', 'funnel report'],
    content: `
**Path:** Reports → Dashboards → Create dashboard

**Add reports:**
1. Open dashboard → **Add report** → choose *From report library* (pre-built) or *Create new*.

**Create a custom single-object report:**
1. Reports → Create report → **Single object**.
2. Select Deals / Contacts / Companies / Activities.
3. Set X-axis: Deal Stage, Owner, Close Date.
4. Set Y-axis: Count of deals, Sum of Amount.
5. Apply filters (e.g., Close Date = This quarter).
6. Choose chart type → **Save**.

**Create a funnel report:**
1. Reports → Create report → **Funnel**.
2. Select Contacts or Deals.
3. Add stages in order: Lead → MQL → SQL → Opportunity → Customer.
4. Set date range → **Run** → shows conversion rates between stages.

**Essential dashboards to create:**
- *Pipeline Health*: Open deals by stage, avg days in stage, at-risk deals.
- *Marketing Funnel*: Traffic → MQL → SQL → Customer with conversion rates.
- *Revenue Forecast*: Quota vs. weighted pipeline vs. Commit vs. Closed.
- *Owner Performance*: Deals by owner (count + amount), close rate.
    `.trim(),
  },
  {
    title: 'Set Up Sequences',
    keywords: ['sequence', 'sales sequence', 'email sequence', 'outbound', 'automated emails'],
    content: `
**Requires:** Sales Hub Professional or Enterprise
**Path:** Sales → Sequences → Create sequence

1. Name the sequence (e.g., "Cold Outbound — SaaS CTO", "Post-Demo Follow-Up").
2. Click **+** to add steps:
   - *Automated email* — uses a template; sent from rep's personal inbox.
   - *Manual email task* — reminds rep to send a custom email.
   - *Call task* — reminds rep to make a call.
   - *LinkedIn task* — reminds rep for LinkedIn outreach.
3. Set delay between steps (e.g., "2 business days after previous step").
4. For email steps: click **Create new template** or select an existing template.
5. **Save** the sequence.

**Enroll a contact:**
1. Open the Contact record → top right → **Enroll in sequence**.
2. Select sequence → choose which email to send from → customize first email → **Start**.

**Sequences stop automatically** when the contact replies or books a meeting — no manual unenrollment needed.
    `.trim(),
  },
  {
    title: 'Manage Duplicate Contacts',
    keywords: ['duplicate', 'deduplication', 'merge contacts', 'merge', 'duplicate management'],
    content: `
**Path:** Contacts → Actions → Manage duplicates

**Review HubSpot's suggestions:**
1. HubSpot shows pairs it thinks are duplicates (based on email, name, company).
2. For each pair: click **Merge** (choose the primary record) or **Not a duplicate**.
3. The primary record keeps all data; secondary is merged in and deleted.

**Merge two contacts manually:**
1. Open the contact you want to keep (primary).
2. Top right → **Actions** → **Merge**.
3. Search for the duplicate contact → select it.
4. Review which record wins on conflicting properties → **Merge**.

**Prevent future duplicates:**
- On every form: Options tab → set "What should happen when a contact submits this form?" → **Update existing contact**.
- Build a workflow: New contact created → If Company with same email domain exists → Associate contact to company.

**Recommended cadence:** Run Manage Duplicates weekly during active import periods.
    `.trim(),
  },
  {
    title: 'Set Up Lead Rotation (Round Robin Assignment)',
    keywords: ['lead rotation', 'assign leads', 'round robin', 'owner assignment', 'territory'],
    content: `
**Path:** Automation → Workflows → Create workflow → Contact-based

**Round-robin assignment:**
1. Trigger: Lifecycle Stage = MQL (or Lead Status = New).
2. Action: **Rotate contact to owner** → select the team or specific users.
3. HubSpot rotates assignments evenly among selected users.
4. Add: *Send internal email notification* to the assigned owner.

**Territory-based assignment (using If/then branch):**
1. After enrollment trigger, add **If/then branch**:
   - Branch 1: Country = United States → Set Owner = [US Rep]
   - Branch 2: Country = United Kingdom → Set Owner = [UK Rep]
   - Default branch: Set Owner = [default rep]

**To verify assignment balance:**
1. Reports → Create report → Single object → Contacts.
2. Group by: Contact Owner.
3. Filter: Create date = last 30 days; Lifecycle Stage = MQL.
4. This shows whether leads are being distributed evenly.
    `.trim(),
  },
  {
    title: 'Configure Forecasting',
    keywords: ['forecast', 'forecasting', 'quota', 'commit', 'pipeline forecast', 'revenue forecast'],
    content: `
**Requires:** Sales Hub Professional or Enterprise
**Path:** Settings → Objects → Deals → Forecast

**Enable forecast categories:**
1. Settings → Objects → Deals → Forecast.
2. Assign forecast categories to deal stages:
   - *Pipeline* — deals early in process.
   - *Best Case* — likely but not committed.
   - *Commit* — rep is highly confident this closes.
   - *Closed* — already won (auto-assigned).
   - *Omit* — excluded from forecast.
3. Click **Save**.

**Set rep quotas:**
1. Sales → Forecast.
2. Click the Quota column for a rep → enter their period quota.

**Review team forecast:**
Sales → Forecast → see each rep's quota, weighted forecast, commit, best case, closed, and pipeline coverage ratio.

**Prerequisite for accurate forecast:**
Every open deal MUST have: Amount, Close Date, Pipeline, Deal Stage, Owner. Any deal missing these is invisible to the forecast tool.
    `.trim(),
  },
  {
    title: 'Set Up Playbooks',
    keywords: ['playbook', 'discovery call', 'sales playbook', 'meddic', 'call guide'],
    content: `
**Requires:** Sales Hub Professional or Enterprise
**Path:** Sales → Playbooks → Create playbook

1. Name it (e.g., "Discovery Call Checklist", "Demo Follow-Up Checklist").
2. Add questions:
   - *Short answer* — free text.
   - *Multiple choice* — select from options.
   - *Yes/No* — quick binary questions.
3. For each question, optionally **link to a HubSpot property** → rep's answer auto-saves to the contact/deal record.
4. **Publish** the playbook.

**Attach to a deal stage:**
1. Edit the playbook → Settings tab.
2. Under Record type, select Deal.
3. Under Pipeline/Stage, select which stage surfaces this playbook.
4. The playbook icon appears automatically on deal records at that stage.

**Recommended playbooks:**
- Discovery Call (MEDDIC/SPICED framework questions)
- Demo Follow-Up Checklist
- Renewal Discovery Call
    `.trim(),
  },
  {
    title: 'Create Email Templates',
    keywords: ['email template', 'template', 'sales email', 'email sequence template'],
    content: `
**Path:** Sales → Templates → New template → From scratch

1. Name it with a convention: [Stage] — [Persona] — [Purpose]
   Example: "Outbound — SaaS CFO — Cold Introduction"
2. Write subject line and body.
3. Insert **personalisation tokens** using the {} icon:
   - {{contact.firstname}}, {{contact.company}}, {{owner.firstname}}, etc.
4. Click **Save template**.

**Organise into folders:**
Sales → Templates → left sidebar → **New folder** → name by stage (Prospecting, Post-Demo, Renewal).
Drag templates into folders.

**Share with the team:**
Open template → Actions → Edit → set Visibility to "Everyone" → Save.

**View performance:**
Sales → Templates → table shows # sent, open rate, click rate per template.
Sort by open rate to find best performers.
    `.trim(),
  },
  {
    title: 'Audit and Clean Up Properties',
    keywords: ['audit properties', 'unused properties', 'property cleanup', 'property fill rate', 'property audit'],
    content: `
**Path:** Settings → Properties → select object

**Check fill rates:**
1. Reports → Data Management → Properties → select Contacts.
2. Table shows each property with % of records filled.
3. Sort by % filled ascending → bottom = least-used.
4. Properties with <5% fill AND not used in any workflow → delete or archive.

**Find duplicate/redundant properties:**
1. Settings → Properties → Actions → Export all properties.
2. Open in spreadsheet; sort by label.
3. Look for same concept with different names (e.g., "Lead Source", "Original Lead Source", "Source of Lead").
4. Choose the canonical property; migrate data; delete the rest.

**Delete a property:**
1. Settings → Properties → hover property → Actions → Delete.
2. HubSpot warns how many records use it and how many workflows reference it.
3. Resolve all references first (update workflows, remove from forms) before deleting.

**Critical contact properties that must exist:**
- Lifecycle Stage (automated)
- Lead Status (for sales outreach stage tracking)
- Lead Score (for MQL automation)
- Original Source (set automatically by HubSpot)
- HubSpot Owner (for routing)

**Critical deal properties that must be filled:**
- Amount, Close Date, Pipeline, Deal Stage, HubSpot Owner
(Any deal missing these is invisible to the forecast)
    `.trim(),
  },
];

// ─── Search How-To Guide ─────────────────────────────────────────────────────

export function searchHowTo(query: string): string {
  const q = query.toLowerCase();

  // Score each section by how many of its keywords appear in the query
  const scored = HOW_TO_GUIDE.map((section) => {
    const matches = section.keywords.filter((k) => q.includes(k)).length;
    return { section, matches };
  }).filter((s) => s.matches > 0);

  if (scored.length === 0) {
    // Fallback: return topic index
    const topics = HOW_TO_GUIDE.map((s) => `- ${s.title}`).join('\n');
    return (
      `No specific guide matched your query. Available topics:\n\n${topics}\n\n` +
      `Try being more specific, e.g.: "create a workflow", "lead scoring", "pipeline stages", "sequences", "reports", "deduplication".`
    );
  }

  // Sort by match score and return top result
  scored.sort((a, b) => b.matches - a.matches);
  const best = scored[0].section;

  return `## ${best.title}\n\n${best.content}`;
}

// ─── Common Pitfalls ─────────────────────────────────────────────────────────

export const COMMON_PITFALLS = [
  {
    pitfall: 'Ad-hoc workflow creation without naming standards',
    symptom: 'Workflows with names like "test", "Copy of Copy of...", missing description',
    fix: 'Establish naming convention: [Object] | [Trigger] | [Action]. Add owner + creation date in description.',
  },
  {
    pitfall: 'Lifecycle stages manually updated by reps',
    symptom: 'Lifecycle stage distribution is uneven, random, or all contacts stuck at "Lead"',
    fix: 'Build automated lifecycle workflows for every stage transition. Remove permission to manually edit Lifecycle Stage from reps.',
  },
  {
    pitfall: 'Multiple pipelines for the same sales motion',
    symptom: 'More pipelines than distinct sales motions (New Business, Renewal, Expansion)',
    fix: 'Consolidate. One pipeline per sales motion. Use deal properties (Deal Type) to segment within a pipeline.',
  },
  {
    pitfall: 'Deals missing Amount or Close Date',
    symptom: 'Forecast is unreliable; pipeline report shows many deals with no amount',
    fix: 'Make Amount and Close Date required fields on the first active deal stage. Build "Missing Deal Data Alert" workflow.',
  },
  {
    pitfall: 'No MQL definition',
    symptom: 'Marketing sends everything to sales; sales ignores most leads',
    fix: 'Define ICP criteria + behavioural thresholds → build lead score → set MQL threshold → build MQL assignment workflow.',
  },
  {
    pitfall: 'Tech stack not integrated (Aircall calls not logging to HubSpot)',
    symptom: 'Contact timelines show no call activity even though reps are calling',
    fix: 'Settings → Integrations → Aircall → verify connection + sync. Check that call dispositions are mapped.',
  },
  {
    pitfall: 'No SLA between Marketing and Sales',
    symptom: 'MQLs age for days without contact; Marketing blames Sales; Sales blames lead quality',
    fix: 'Agree on: (1) MQL definition, (2) response time target (< 1 hour), (3) disqualification reason process. Build SLA enforcement workflow.',
  },
  {
    pitfall: 'Duplicate contacts from repeat form fills or imports',
    symptom: 'Same person appears multiple times; timeline is split across records',
    fix: 'Enable Manage Duplicates (Contacts → Actions). Set all forms to "Update existing contact". Run dedup workflow.',
  },
];
