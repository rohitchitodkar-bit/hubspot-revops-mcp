/**
 * UAT seed script — populates a blank HubSpot trial account with realistic test data.
 *
 * Run ONCE against your trial account BEFORE running UAT tests.
 * Uses a separate Private App token with write access (UAT_SEED_TOKEN).
 *
 * Usage:
 *   npx tsx scripts/seed-uat.ts
 *
 * Required env var (add to .env.local):
 *   UAT_SEED_TOKEN=pat-na1-xxxxxxxx   ← Private App with write scopes
 *
 * Required Private App scopes for seeding:
 *   crm.objects.contacts.write
 *   crm.objects.companies.write
 *   crm.objects.deals.write
 *   crm.objects.contacts.read
 *   crm.objects.companies.read
 *   crm.objects.deals.read
 *   crm.schemas.contacts.read
 *   crm.schemas.companies.read
 *   crm.schemas.deals.read
 *   crm.objects.owners.read
 */

import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

const TOKEN = process.env.UAT_SEED_TOKEN;
if (!TOKEN) {
  console.error('❌  UAT_SEED_TOKEN not set in .env.local');
  process.exit(1);
}

const BASE = 'https://api.hubapi.com';

// ─── Core fetch ──────────────────────────────────────────────────────────────

async function api<T = unknown>(
  method: 'GET' | 'POST' | 'PATCH',
  path: string,
  body?: unknown
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`${method} ${path} → ${res.status}: ${text.slice(0, 400)}`);
  }

  if (res.status === 204) return {} as T;
  return res.json() as Promise<T>;
}

function log(msg: string) {
  console.log(`  ${msg}`);
}

function section(title: string) {
  console.log(`\n${'─'.repeat(60)}`);
  console.log(`  ${title}`);
  console.log('─'.repeat(60));
}

// ─── Step 0: Get default pipeline ────────────────────────────────────────────

interface Pipeline {
  id: string;
  label: string;
  stages: { id: string; label: string; displayOrder: number }[];
}

async function getDefaultPipeline(): Promise<Pipeline> {
  const data = await api<{ results: Pipeline[] }>('GET', '/crm/v3/pipelines/deals');
  if (!data.results.length) throw new Error('No deal pipelines found');
  return data.results[0];
}

// ─── Step 1: Companies ────────────────────────────────────────────────────────

const COMPANIES = [
  { name: 'Acme Corp', domain: 'acmecorp.example.com', industry: 'TECHNOLOGY', numberofemployees: '250', annualrevenue: '12000000' },
  { name: 'Bright Ventures', domain: 'brightventures.example.com', industry: 'FINANCIAL_SERVICES', numberofemployees: '45', annualrevenue: '3500000' },
  { name: 'CloudStack Inc', domain: 'cloudstack.example.com', industry: 'TECHNOLOGY', numberofemployees: '120', annualrevenue: '8000000' },
  { name: 'DataFlow LLC', domain: 'dataflow.example.com', industry: 'COMPUTER_SOFTWARE', numberofemployees: '30', annualrevenue: '1800000' },
  { name: 'EdgeNet Solutions', domain: 'edgenet.example.com', industry: 'TELECOMMUNICATIONS', numberofemployees: '600', annualrevenue: '45000000' },
];

async function seedCompanies(): Promise<string[]> {
  section('1 / 5  Companies');
  const ids: string[] = [];
  for (const c of COMPANIES) {
    const r = await api<{ id: string }>('POST', '/crm/v3/objects/companies', { properties: c });
    ids.push(r.id);
    log(`✅  ${c.name} (id: ${r.id})`);
  }
  return ids;
}

// ─── Step 2: Contacts ─────────────────────────────────────────────────────────

interface ContactDef {
  firstname: string;
  lastname: string;
  email: string;
  jobtitle: string;
  lifecyclestage: string;
  hs_lead_status?: string;
  company: string;
}

function buildContacts(companyNames: string[]): ContactDef[] {
  return [
    // Subscribers (top of funnel)
    { firstname: 'Alice', lastname: 'Baker', email: 'alice.baker@acmecorp.example.com', jobtitle: 'Marketing Manager', lifecyclestage: 'subscriber', company: companyNames[0] },
    { firstname: 'Ben', lastname: 'Carter', email: 'ben.carter@brightventures.example.com', jobtitle: 'Operations Director', lifecyclestage: 'subscriber', company: companyNames[1] },

    // Leads
    { firstname: 'Clara', lastname: 'Davis', email: 'clara.davis@cloudstack.example.com', jobtitle: 'VP Engineering', lifecyclestage: 'lead', company: companyNames[2] },
    { firstname: 'Dan', lastname: 'Evans', email: 'dan.evans@dataflow.example.com', jobtitle: 'CEO', lifecyclestage: 'lead', company: companyNames[3] },
    { firstname: 'Emma', lastname: 'Ford', email: 'emma.ford@edgenet.example.com', jobtitle: 'Head of IT', lifecyclestage: 'lead', company: companyNames[4] },

    // MQLs
    { firstname: 'Frank', lastname: 'Green', email: 'frank.green@acmecorp.example.com', jobtitle: 'Sales Director', lifecyclestage: 'marketingqualifiedlead', hs_lead_status: 'NEW', company: companyNames[0] },
    { firstname: 'Grace', lastname: 'Hall', email: 'grace.hall@brightventures.example.com', jobtitle: 'Procurement Manager', lifecyclestage: 'marketingqualifiedlead', hs_lead_status: 'NEW', company: companyNames[1] },
    { firstname: 'Henry', lastname: 'Ives', email: 'henry.ives@cloudstack.example.com', jobtitle: 'CTO', lifecyclestage: 'marketingqualifiedlead', hs_lead_status: 'OPEN', company: companyNames[2] },

    // SQLs
    { firstname: 'Iris', lastname: 'James', email: 'iris.james@dataflow.example.com', jobtitle: 'CFO', lifecyclestage: 'salesqualifiedlead', hs_lead_status: 'IN_PROGRESS', company: companyNames[3] },
    { firstname: 'Jack', lastname: 'King', email: 'jack.king@edgenet.example.com', jobtitle: 'VP Sales', lifecyclestage: 'salesqualifiedlead', hs_lead_status: 'IN_PROGRESS', company: companyNames[4] },

    // Opportunities
    { firstname: 'Karen', lastname: 'Lewis', email: 'karen.lewis@acmecorp.example.com', jobtitle: 'Chief Revenue Officer', lifecyclestage: 'opportunity', company: companyNames[0] },
    { firstname: 'Leo', lastname: 'Morris', email: 'leo.morris@brightventures.example.com', jobtitle: 'Managing Director', lifecyclestage: 'opportunity', company: companyNames[1] },

    // Customers
    { firstname: 'Mia', lastname: 'Nash', email: 'mia.nash@cloudstack.example.com', jobtitle: 'Head of Revenue', lifecyclestage: 'customer', company: companyNames[2] },
    { firstname: 'Nick', lastname: 'Owen', email: 'nick.owen@dataflow.example.com', jobtitle: 'Director of Sales', lifecyclestage: 'customer', company: companyNames[3] },
    { firstname: 'Olivia', lastname: 'Park', email: 'olivia.park@edgenet.example.com', jobtitle: 'VP Growth', lifecyclestage: 'customer', company: companyNames[4] },

    // Evangelist
    { firstname: 'Paul', lastname: 'Quinn', email: 'paul.quinn@acmecorp.example.com', jobtitle: 'Co-Founder', lifecyclestage: 'evangelist', company: companyNames[0] },

    // Other / unmanaged (to show data hygiene gaps)
    { firstname: 'Rita', lastname: 'Stone', email: 'rita.stone@brightventures.example.com', jobtitle: '', lifecyclestage: 'other', company: companyNames[1] },
    { firstname: 'Sam', lastname: 'Turner', email: 'sam.turner@cloudstack.example.com', jobtitle: '', lifecyclestage: 'lead', company: companyNames[2] },
    { firstname: 'Tina', lastname: 'Underwood', email: 'tina.u@dataflow.example.com', jobtitle: '', lifecyclestage: 'lead', company: companyNames[3] },
    { firstname: 'Uma', lastname: 'Vance', email: 'uma.vance@edgenet.example.com', jobtitle: '', lifecyclestage: 'subscriber', company: companyNames[4] },
  ];
}

async function seedContacts(): Promise<string[]> {
  section('2 / 5  Contacts');
  const ids: string[] = [];
  const contacts = buildContacts(COMPANIES.map((c) => c.name));
  for (const c of contacts) {
    const r = await api<{ id: string }>('POST', '/crm/v3/objects/contacts', { properties: c });
    ids.push(r.id);
    log(`✅  ${c.firstname} ${c.lastname} (${c.lifecyclestage})`);
  }
  return ids;
}

// ─── Step 3: Get owners ───────────────────────────────────────────────────────

interface Owner { id: string; firstName: string; lastName: string; email: string }

async function getOwners(): Promise<Owner[]> {
  const data = await api<{ results: Owner[] }>('GET', '/crm/v3/owners/?limit=10');
  return data.results;
}

// ─── Step 4: Deals ────────────────────────────────────────────────────────────

function daysFromNow(days: number): string {
  return String(Date.now() + days * 24 * 60 * 60 * 1000);
}

function daysAgoMs(days: number): string {
  return String(Date.now() - days * 24 * 60 * 60 * 1000);
}

interface DealDef {
  label: string;
  dealname: string;
  amount?: string;
  closedate: string;
  dealstage: string;
  hubspot_owner_id?: string;
  hs_lastactivitydate?: string;
  scenario: string;
}

function buildDeals(stages: { id: string; label: string }[], ownerIds: string[]): DealDef[] {
  const o1 = ownerIds[0] ?? '';
  const o2 = ownerIds[1] ?? o1;

  // Use first two non-closed stages and last stage
  const activeStages = stages.filter((s) => s.label.toLowerCase() !== 'closed won' && s.label.toLowerCase() !== 'closed lost');
  const earlyStage = activeStages[0]?.id ?? stages[0].id;
  const midStage = activeStages[Math.floor(activeStages.length / 2)]?.id ?? stages[0].id;
  const wonStage = stages.find((s) => s.label.toLowerCase().includes('won'))?.id ?? stages[stages.length - 1].id;

  return [
    // Healthy open deals
    {
      label: 'Healthy deal 1',
      dealname: 'Acme Corp — Platform Licence',
      amount: '24000',
      closedate: daysFromNow(30),
      dealstage: earlyStage,
      hubspot_owner_id: o1,
      hs_lastactivitydate: daysAgoMs(2),
      scenario: 'open / healthy',
    },
    {
      label: 'Healthy deal 2',
      dealname: 'Bright Ventures — Annual Plan',
      amount: '18000',
      closedate: daysFromNow(45),
      dealstage: midStage,
      hubspot_owner_id: o2,
      hs_lastactivitydate: daysAgoMs(5),
      scenario: 'open / healthy',
    },
    {
      label: 'Healthy deal 3',
      dealname: 'EdgeNet — Enterprise Upgrade',
      amount: '72000',
      closedate: daysFromNow(60),
      dealstage: midStage,
      hubspot_owner_id: o1,
      hs_lastactivitydate: daysAgoMs(3),
      scenario: 'open / healthy',
    },

    // Stale deals (no activity in 21+ days) — triggers get_at_risk_deals
    {
      label: 'Stale deal 1',
      dealname: 'CloudStack — Starter Package',
      amount: '9600',
      closedate: daysFromNow(20),
      dealstage: earlyStage,
      hubspot_owner_id: o2,
      hs_lastactivitydate: daysAgoMs(28),
      scenario: 'open / stale (28d no activity)',
    },
    {
      label: 'Stale deal 2',
      dealname: 'DataFlow — Pro Tier Expansion',
      amount: '14400',
      closedate: daysFromNow(15),
      dealstage: midStage,
      hubspot_owner_id: o1,
      hs_lastactivitydate: daysAgoMs(35),
      scenario: 'open / stale (35d no activity)',
    },

    // Past close date (still open) — triggers get_at_risk_deals
    {
      label: 'Overdue deal 1',
      dealname: 'Acme Corp — Q1 Renewal',
      amount: '36000',
      closedate: daysFromNow(-15),
      dealstage: midStage,
      hubspot_owner_id: o2,
      hs_lastactivitydate: daysAgoMs(10),
      scenario: 'open / past close date (-15d)',
    },
    {
      label: 'Overdue deal 2',
      dealname: 'EdgeNet — Custom Integration',
      amount: '52000',
      closedate: daysFromNow(-30),
      dealstage: midStage,
      hubspot_owner_id: o1,
      hs_lastactivitydate: daysAgoMs(22),
      scenario: 'open / past close date (-30d) + stale',
    },

    // Missing data — triggers audit_pipelines / get_pipeline_health flags
    {
      label: 'Missing amount deal',
      dealname: 'Bright Ventures — TBD Scope',
      // amount deliberately omitted
      closedate: daysFromNow(25),
      dealstage: earlyStage,
      hubspot_owner_id: o2,
      scenario: 'open / missing amount',
    },
    {
      label: 'Missing close date deal',
      dealname: 'DataFlow — Open Ended Pilot',
      amount: '7200',
      // closedate set far future to simulate missing
      closedate: daysFromNow(365),
      dealstage: earlyStage,
      hubspot_owner_id: o1,
      scenario: 'open / no real close date',
    },

    // Unassigned deal — shows in owner performance as Unassigned
    {
      label: 'Unassigned deal',
      dealname: 'CloudStack — Inbound Inquiry',
      amount: '4800',
      closedate: daysFromNow(30),
      dealstage: earlyStage,
      scenario: 'open / no owner',
    },

    // Closed-won deals (for get_deal_metrics win rate + avg deal size)
    {
      label: 'Closed won 1',
      dealname: 'Acme Corp — Initial Contract',
      amount: '28800',
      closedate: daysAgoMs(14),
      dealstage: wonStage,
      hubspot_owner_id: o1,
      hs_lastactivitydate: daysAgoMs(14),
      scenario: 'closed won (14d ago)',
    },
    {
      label: 'Closed won 2',
      dealname: 'Bright Ventures — Seed Deal',
      amount: '12000',
      closedate: daysAgoMs(30),
      dealstage: wonStage,
      hubspot_owner_id: o2,
      hs_lastactivitydate: daysAgoMs(30),
      scenario: 'closed won (30d ago)',
    },
    {
      label: 'Closed won 3',
      dealname: 'CloudStack — Growth Plan',
      amount: '19200',
      closedate: daysAgoMs(45),
      dealstage: wonStage,
      hubspot_owner_id: o1,
      hs_lastactivitydate: daysAgoMs(45),
      scenario: 'closed won (45d ago)',
    },
    {
      label: 'Closed won 4',
      dealname: 'EdgeNet — Starter Licence',
      amount: '36000',
      closedate: daysAgoMs(60),
      dealstage: wonStage,
      hubspot_owner_id: o2,
      hs_lastactivitydate: daysAgoMs(60),
      scenario: 'closed won (60d ago)',
    },
    {
      label: 'Closed won 5',
      dealname: 'DataFlow — Annual Subscription',
      amount: '9600',
      closedate: daysAgoMs(75),
      dealstage: wonStage,
      hubspot_owner_id: o1,
      hs_lastactivitydate: daysAgoMs(75),
      scenario: 'closed won (75d ago)',
    },
  ];
}

async function seedDeals(pipeline: Pipeline, ownerIds: string[]): Promise<void> {
  section('4 / 5  Deals');
  const deals = buildDeals(pipeline.stages, ownerIds);

  for (const d of deals) {
    const { label, scenario, ...props } = d;
    // Remove undefined values
    const cleanProps = Object.fromEntries(
      Object.entries(props).filter(([, v]) => v !== undefined)
    );

    const r = await api<{ id: string }>('POST', '/crm/v3/objects/deals', {
      properties: { ...cleanProps, pipeline: pipeline.id },
    });
    log(`✅  ${label} — ${scenario} (id: ${r.id})`);
  }
}

// ─── Step 5: Summary ──────────────────────────────────────────────────────────

function printSummary(ownerCount: number) {
  section('5 / 5  Done!');
  console.log(`
  Seeded:
    • 5 companies
    • 20 contacts (subscriber × 3, lead × 5, MQL × 3, SQL × 2,
                   opportunity × 2, customer × 3, evangelist × 1, other × 1)
    • 15 deals  (3 healthy open, 2 stale, 2 overdue, 1 missing amount,
                 1 no close date, 1 unassigned, 5 closed-won)
    • Assigned to ${ownerCount} owner(s)

  What this exercises:
    get_account_overview        → counts populated
    audit_properties            → default + custom property list
    audit_pipelines             → stages with probabilities
    get_pipeline_health         → missing amount + overdue deals flagged
    get_at_risk_deals           → 4 at-risk deals (2 stale + 2 overdue)
    get_lifecycle_distribution  → contacts in every stage
    get_deal_metrics            → 5 closed-won for win rate + avg size
    get_owner_performance       → 2 reps with split pipeline
    diagnose_revops_maturity    → will score Level 1–2 (no workflows yet)
    search_contacts             → search "Acme" or "alice.baker"
    get_owners                  → lists your trial account user(s)
    get_how_to_guide            → no data needed (knowledge base)
    get_common_pitfalls         → no data needed (knowledge base)
    audit_workflows             → requires Sales Hub Pro trial
    check_critical_workflows    → requires Sales Hub Pro trial

  Next step:
    Run your MCP server and test each tool using the UAT checklist.
    See: scripts/uat-checklist.md
  `);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🌱  HubSpot UAT Seed Script');
  console.log('    Target: trial account via UAT_SEED_TOKEN\n');

  try {
    const pipeline = await getDefaultPipeline();
    log(`Using pipeline: "${pipeline.label}" (${pipeline.stages.length} stages)`);

    const companyIds = await seedCompanies();
    void companyIds; // not needed for deal association in this simple seed

    await seedContacts();

    section('3 / 5  Owners');
    const owners = await getOwners();
    log(`Found ${owners.length} owner(s): ${owners.map((o) => `${o.firstName} ${o.lastName}`).join(', ')}`);
    const ownerIds = owners.map((o) => o.id);

    await seedDeals(pipeline, ownerIds);

    printSummary(owners.length);
  } catch (e) {
    console.error('\n❌  Seed failed:', e instanceof Error ? e.message : e);
    process.exit(1);
  }
}

main();
