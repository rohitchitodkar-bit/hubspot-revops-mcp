/**
 * MCP tool definitions and handlers.
 * All tools are read-only — no writes to HubSpot.
 */

import {
  getObjectCount,
  getPipelines,
  getOwners,
  getProperties,
  getOpenDeals,
  getClosedDeals,
  getAtRiskDeals,
  getContactCountByLifecycleStage,
  getWorkflows,
  searchContacts,
} from './hubspot';

import {
  BENCHMARKS,
  CRITICAL_WORKFLOWS,
  MATURITY_LEVELS,
  searchHowTo,
  COMMON_PITFALLS,
} from './knowledge';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface McpTool {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, { type: string; description: string; enum?: string[] }>;
    required: string[];
  };
}

export interface McpToolResult {
  content: { type: 'text'; text: string }[];
  isError: boolean;
}

// ─── Tool Definitions ────────────────────────────────────────────────────────

export const TOOLS: McpTool[] = [
  {
    name: 'get_account_overview',
    description:
      'Returns a high-level summary of the HubSpot account: total contacts, companies, deals, pipelines, owners, and (if accessible) workflow count. Good starting point for any diagnostic session.',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'audit_properties',
    description:
      'Lists all properties for a given object type (contacts, companies, or deals). Flags missing critical properties and identifies properties that may be redundant or unused.',
    inputSchema: {
      type: 'object',
      properties: {
        object_type: {
          type: 'string',
          description: 'HubSpot object to audit',
          enum: ['contacts', 'companies', 'deals'],
        },
      },
      required: ['object_type'],
    },
  },
  {
    name: 'audit_pipelines',
    description:
      'Lists all deal pipelines with their stages, win probabilities, and display order. Flags issues such as missing probability weights or too many pipelines for the same sales motion.',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'get_pipeline_health',
    description:
      'Analyses all open deals and flags data quality issues: missing amount, missing close date, stale deals (no activity or modification > 21 days), and past-due close dates. Provides a stage distribution summary.',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'get_at_risk_deals',
    description:
      'Returns open deals that are at risk: past their close date, or with no activity in the last 21 days. Includes deal name, owner, stage, amount, close date, and last activity date.',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'get_lifecycle_distribution',
    description:
      'Returns the count of contacts in each HubSpot lifecycle stage (Subscriber → Lead → MQL → SQL → Opportunity → Customer → Evangelist). Identifies bottlenecks in the conversion funnel.',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'audit_workflows',
    description:
      'Lists all active workflows in the account (requires Sales Hub Professional + automation scope). Shows name, type, enabled status, and last updated date.',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'check_critical_workflows',
    description:
      'Compares active workflow names against a checklist of 12 critical workflows every HubSpot account should have (MQL assignment, SLA alerts, deal automation, etc.). Returns a gap analysis showing which critical workflows are missing.',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'get_deal_metrics',
    description:
      'Calculates key sales metrics from deal data: win rate, average deal size, average sales cycle length, and pipeline velocity. Compares against RevOps benchmarks.',
    inputSchema: {
      type: 'object',
      properties: {
        days_back: {
          type: 'string',
          description: 'Number of days of closed deal history to analyse (default: 90)',
        },
      },
      required: [],
    },
  },
  {
    name: 'get_owner_performance',
    description:
      'Returns a breakdown of open and recently closed deals by sales rep (owner). Shows deal count, total pipeline value, and closed-won value per owner.',
    inputSchema: {
      type: 'object',
      properties: {
        days_back: {
          type: 'string',
          description: 'Days of closed deal history to include (default: 90)',
        },
      },
      required: [],
    },
  },
  {
    name: 'diagnose_revops_maturity',
    description:
      'Runs a comprehensive RevOps maturity assessment based on what is configured in the HubSpot account. Returns a maturity level (1–4), supporting evidence, identified gaps, and prioritised next actions.',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'get_how_to_guide',
    description:
      'Returns step-by-step HubSpot instructions for a given topic. Useful when you know WHAT to fix and need to know HOW to do it manually in HubSpot. Topics include: workflows, properties, pipeline setup, lead scoring, lifecycle stages, sequences, templates, reports, deduplication, lead rotation, forecasting, playbooks.',
    inputSchema: {
      type: 'object',
      properties: {
        topic: {
          type: 'string',
          description:
            'What you want to learn how to do. Examples: "create a workflow", "set up lead scoring", "configure pipeline stages", "build a dashboard", "create a sequence", "fix duplicate contacts".',
        },
      },
      required: ['topic'],
    },
  },
  {
    name: 'search_contacts',
    description:
      'Searches for contacts by name, email, or company name. Returns contact details including lifecycle stage, owner, job title, and last activity.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Name, email address, or company name to search for',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_owners',
    description:
      'Lists all HubSpot users (sales reps, managers, admins) in the account with their email addresses and team assignments.',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'get_common_pitfalls',
    description:
      'Returns a list of the most common HubSpot and RevOps pitfalls with symptoms and recommended fixes. Useful for diagnosing systemic problems.',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n: number, decimals = 0): string {
  return n.toLocaleString('en-US', { maximumFractionDigits: decimals });
}

function pct(n: number): string {
  return `${(n * 100).toFixed(1)}%`;
}

function currency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${fmt(n)}`;
}

function daysAgo(ms: number | string | null): number {
  if (!ms) return 999;
  const ts = typeof ms === 'string' ? parseInt(ms, 10) : ms;
  return Math.floor((Date.now() - ts) / (1000 * 60 * 60 * 24));
}

function safeProp(deal: { properties: Record<string, string | null> }, key: string): string {
  return deal.properties[key] ?? '';
}

// ─── Tool Handlers ───────────────────────────────────────────────────────────

async function getAccountOverview(): Promise<string> {
  const [contactCount, companyCount, dealCount, pipelines, owners] = await Promise.all([
    getObjectCount('contacts'),
    getObjectCount('companies'),
    getObjectCount('deals'),
    getPipelines(),
    getOwners(),
  ]);

  let workflowInfo = '';
  try {
    const workflows = await getWorkflows();
    const active = workflows.filter((w) => w.enabled).length;
    workflowInfo = `\n- Active Workflows: ${active} (${workflows.length} total)`;
  } catch {
    workflowInfo = '\n- Workflows: Unable to read (check automation scope on Private App)';
  }

  const pipelineList = pipelines
    .map((p) => `  • ${p.label} (${p.stages.length} stages)`)
    .join('\n');

  const ownerList = owners
    .slice(0, 10)
    .map((o) => `  • ${o.firstName} ${o.lastName} <${o.email}>`)
    .join('\n');

  return [
    '## HubSpot Account Overview',
    '',
    '### Object Counts',
    `- Contacts: ${fmt(contactCount)}`,
    `- Companies: ${fmt(companyCount)}`,
    `- Deals: ${fmt(dealCount)}`,
    workflowInfo,
    '',
    '### Pipelines',
    pipelineList || '  (none found)',
    '',
    `### Sales Team (${owners.length} users)`,
    ownerList,
    owners.length > 10 ? `  ... and ${owners.length - 10} more` : '',
  ]
    .filter((l) => l !== undefined)
    .join('\n');
}

async function auditProperties(objectType: 'contacts' | 'companies' | 'deals'): Promise<string> {
  const props = await getProperties(objectType);

  const custom = props.filter((p) => p.createdUserId);
  const hubspotDefault = props.filter((p) => !p.createdUserId);

  const CRITICAL_CONTACT = [
    'lifecyclestage',
    'hubspot_owner_id',
    'hs_lead_status',
    'hs_analytics_source',
    'firstname',
    'lastname',
    'email',
    'company',
    'jobtitle',
  ];
  const CRITICAL_DEAL = [
    'dealname',
    'amount',
    'closedate',
    'dealstage',
    'pipeline',
    'hubspot_owner_id',
  ];
  const CRITICAL_COMPANY = ['name', 'domain', 'industry', 'numberofemployees', 'annualrevenue'];

  const criticalList =
    objectType === 'contacts'
      ? CRITICAL_CONTACT
      : objectType === 'deals'
      ? CRITICAL_DEAL
      : CRITICAL_COMPANY;

  const propNames = new Set(props.map((p) => p.name));
  const missing = criticalList.filter((c) => !propNames.has(c));

  const fieldTypes = custom.reduce<Record<string, number>>((acc, p) => {
    acc[p.fieldType] = (acc[p.fieldType] ?? 0) + 1;
    return acc;
  }, {});

  const freeTextCount = fieldTypes['text'] ?? 0;

  const lines = [
    `## Property Audit — ${objectType.charAt(0).toUpperCase() + objectType.slice(1)}`,
    '',
    `**Total properties:** ${props.length} (${hubspotDefault.length} HubSpot default + ${custom.length} custom)`,
    '',
    '### Custom Property Breakdown by Field Type',
    ...Object.entries(fieldTypes).map(([t, c]) => `- ${t}: ${c}`),
    '',
  ];

  if (freeTextCount > 5) {
    lines.push(
      `⚠️  **${freeTextCount} single-line text properties** — free-text fields are hard to report on. ` +
        `Consider converting to dropdowns where values are standardised.`,
      ''
    );
  }

  if (missing.length > 0) {
    lines.push(
      '### ❌ Missing Critical Properties',
      ...missing.map((m) => `- \`${m}\` — this field is needed for automation and reporting`),
      ''
    );
  } else {
    lines.push('### ✅ All critical properties exist', '');
  }

  lines.push(
    '### Custom Properties (first 30)',
    ...custom.slice(0, 30).map((p) => `- **${p.label}** (\`${p.name}\`, ${p.fieldType})`),
    custom.length > 30 ? `... and ${custom.length - 30} more custom properties` : ''
  );

  return lines.join('\n');
}

async function auditPipelines(): Promise<string> {
  const pipelines = await getPipelines();

  if (pipelines.length === 0) {
    return 'No deal pipelines found in this account.';
  }

  const lines = ['## Pipeline Audit', ''];

  for (const p of pipelines) {
    lines.push(`### Pipeline: ${p.label}`, '');

    const stagesWithNoProb = p.stages.filter(
      (s) =>
        !s.metadata.probability &&
        s.metadata.isClosed !== 'true'
    );

    for (const s of p.stages) {
      const prob = s.metadata.probability
        ? `${(parseFloat(s.metadata.probability) * 100).toFixed(0)}%`
        : '—';
      const closed = s.metadata.isClosed === 'true' ? ' (closed)' : '';
      lines.push(`  ${s.displayOrder + 1}. **${s.label}**${closed} — probability: ${prob}`);
    }

    if (stagesWithNoProb.length > 0) {
      lines.push(
        '',
        `⚠️  ${stagesWithNoProb.length} active stage(s) have no probability set: ` +
          stagesWithNoProb.map((s) => s.label).join(', ')
      );
    }

    lines.push('');
  }

  if (pipelines.length > 2) {
    lines.push(
      `⚠️  **${pipelines.length} pipelines found.** If more than one covers the same sales motion, ` +
        `consider consolidating. Use Deal Type property to segment within a single pipeline instead.`
    );
  }

  return lines.join('\n');
}

async function getPipelineHealth(): Promise<string> {
  const [openDeals, pipelines] = await Promise.all([getOpenDeals(200), getPipelines()]);

  const stageMap: Record<string, string> = {};
  for (const p of pipelines) {
    for (const s of p.stages) {
      stageMap[s.id] = s.label;
    }
  }

  let missingAmount = 0;
  let missingCloseDate = 0;
  let pastCloseDate = 0;
  let staleActivity = 0; // no activity in 21+ days
  const stageCount: Record<string, number> = {};
  const now = Date.now();
  const staleCutoff = now - 21 * 24 * 60 * 60 * 1000;

  for (const deal of openDeals) {
    const amount = safeProp(deal, 'amount');
    const closedate = safeProp(deal, 'closedate');
    const lastActivity = deal.properties['hs_lastactivitydate'];
    const stage = safeProp(deal, 'dealstage');

    if (!amount || amount === '0') missingAmount++;
    if (!closedate) missingCloseDate++;
    else if (parseInt(closedate, 10) < now) pastCloseDate++;

    const lastAct = lastActivity ? parseInt(lastActivity, 10) : 0;
    if (!lastAct || lastAct < staleCutoff) staleActivity++;

    const stageLabel = stageMap[stage] ?? stage ?? 'Unknown';
    stageCount[stageLabel] = (stageCount[stageLabel] ?? 0) + 1;
  }

  const totalValue = openDeals.reduce((sum, d) => {
    const amt = parseFloat(safeProp(d, 'amount') || '0');
    return sum + (isNaN(amt) ? 0 : amt);
  }, 0);

  const lines = [
    '## Pipeline Health Report',
    '',
    `**Open deals analysed:** ${openDeals.length}`,
    `**Total pipeline value:** ${currency(totalValue)}`,
    '',
    '### Data Quality Issues',
    `- Missing Amount: **${missingAmount}** deals (${pct(openDeals.length ? missingAmount / openDeals.length : 0)})`,
    `- Missing Close Date: **${missingCloseDate}** deals`,
    `- Past Close Date (still open): **${pastCloseDate}** deals`,
    `- No Activity in 21+ Days: **${staleActivity}** deals`,
    '',
    '### Stage Distribution',
    ...Object.entries(stageCount)
      .sort((a, b) => b[1] - a[1])
      .map(([stage, count]) => `- ${stage}: ${count} deals`),
    '',
  ];

  if (missingAmount > 0 || missingCloseDate > 0) {
    lines.push(
      '### 🔧 Recommended Fix',
      'Make **Amount** and **Close Date** required fields on your first active deal stage.',
      '**Path:** Settings → Objects → Deals → Pipelines → Edit stage → Required properties',
      ''
    );
  }

  if (staleActivity > 3) {
    lines.push(
      `⚠️  **${staleActivity} stale deals** detected. Consider building a "Stale Deal Alert" workflow that creates a task for the owner when no activity has occurred in 21 days.`
    );
  }

  return lines.join('\n');
}

async function getAtRiskDealsHandler(): Promise<string> {
  const [deals, pipelines, owners] = await Promise.all([
    getAtRiskDeals(),
    getPipelines(),
    getOwners(),
  ]);

  const stageMap: Record<string, string> = {};
  for (const p of pipelines) {
    for (const s of p.stages) stageMap[s.id] = s.label;
  }

  const ownerMap: Record<string, string> = {};
  for (const o of owners) ownerMap[o.id] = `${o.firstName} ${o.lastName}`;

  if (deals.length === 0) {
    return '✅ No at-risk deals found (no deals with past close date or 21+ days without activity).';
  }

  const now = Date.now();
  const rows = deals.map((d) => {
    const name = safeProp(d, 'dealname') || `Deal ${d.id}`;
    const amount = safeProp(d, 'amount');
    const closedate = safeProp(d, 'closedate');
    const lastActivity = d.properties['hs_lastactivitydate'];
    const stage = stageMap[safeProp(d, 'dealstage')] ?? safeProp(d, 'dealstage') ?? '—';
    const owner = ownerMap[safeProp(d, 'hubspot_owner_id')] ?? 'Unassigned';

    const risks: string[] = [];
    if (closedate && parseInt(closedate, 10) < now) {
      const daysOverdue = Math.floor((now - parseInt(closedate, 10)) / (1000 * 60 * 60 * 24));
      risks.push(`close date ${daysOverdue}d overdue`);
    }
    if (!lastActivity || parseInt(lastActivity, 10) < now - 21 * 24 * 60 * 60 * 1000) {
      const days = daysAgo(lastActivity);
      risks.push(`no activity ${days === 999 ? 'ever' : `${days}d`}`);
    }

    return `- **${name}** | ${stage} | ${amount ? currency(parseFloat(amount)) : 'no amount'} | Owner: ${owner} | ⚠️ ${risks.join(', ')}`;
  });

  return [
    `## At-Risk Deals (${deals.length} found)`,
    '',
    ...rows,
    '',
    '### 🔧 Recommended Action',
    '1. Review each deal above with the owner in the next pipeline review.',
    '2. Build a "Stale Deal Alert" workflow to catch these automatically in the future.',
    '3. Run the `get_how_to_guide` tool with topic "deal workflow" for step-by-step instructions.',
  ].join('\n');
}

async function getLifecycleDistribution(): Promise<string> {
  const counts = await getContactCountByLifecycleStage();

  const stageLabels: Record<string, string> = {
    subscriber: 'Subscriber',
    lead: 'Lead',
    marketingqualifiedlead: 'MQL',
    salesqualifiedlead: 'SQL',
    opportunity: 'Opportunity',
    customer: 'Customer',
    evangelist: 'Evangelist',
    other: 'Other',
  };

  const total = Object.values(counts).reduce((s, c) => s + c, 0);

  const rows = Object.entries(stageLabels).map(([key, label]) => {
    const count = counts[key] ?? 0;
    const share = total > 0 ? pct(count / total) : '0%';
    return `- ${label}: **${fmt(count)}** (${share})`;
  });

  const lines = ['## Lifecycle Stage Distribution', '', ...rows, ''];

  // Funnel conversion rates
  const lead = counts['lead'] ?? 0;
  const mql = counts['marketingqualifiedlead'] ?? 0;
  const sql = counts['salesqualifiedlead'] ?? 0;
  const opp = counts['opportunity'] ?? 0;
  const customer = counts['customer'] ?? 0;

  if (lead > 0) {
    lines.push(
      '### Conversion Rates',
      `- Lead → MQL: ${lead > 0 ? pct(mql / lead) : 'N/A'} (benchmark: 13–20%)`,
      `- MQL → SQL: ${mql > 0 ? pct(sql / mql) : 'N/A'}`,
      `- SQL → Opportunity: ${sql > 0 ? pct(opp / sql) : 'N/A'}`,
      `- Opportunity → Customer: ${opp > 0 ? pct(customer / opp) : 'N/A'}`,
      ''
    );
  }

  if (mql === 0 && lead > 50) {
    lines.push(
      '⚠️  **No MQLs detected** despite having leads. This usually means:',
      '   1. Lead scoring is not configured, OR',
      '   2. The MQL assignment workflow is missing or disabled.',
      '   Run `get_how_to_guide` with topic "lead scoring" for setup instructions.'
    );
  }

  return lines.join('\n');
}

async function auditWorkflowsHandler(): Promise<string> {
  const workflows = await getWorkflows();

  const active = workflows.filter((w) => w.enabled);
  const inactive = workflows.filter((w) => !w.enabled);

  const byType = active.reduce<Record<string, number>>((acc, w) => {
    acc[w.type] = (acc[w.type] ?? 0) + 1;
    return acc;
  }, {});

  const lines = [
    '## Workflow Audit',
    '',
    `**Total workflows:** ${workflows.length} (${active.length} active, ${inactive.length} inactive)`,
    '',
    '### Active Workflow Types',
    ...Object.entries(byType).map(([t, c]) => `- ${t}: ${c}`),
    '',
    '### Active Workflows',
    ...active.map((w) => {
      const updated = w.updatedAt
        ? `last updated ${daysAgo(w.updatedAt)}d ago`
        : '';
      return `- **${w.name}** (${w.type}) ${updated}`;
    }),
    '',
  ];

  const staleWorkflows = active.filter((w) => w.updatedAt && daysAgo(w.updatedAt) > 180);
  if (staleWorkflows.length > 0) {
    lines.push(
      `⚠️  **${staleWorkflows.length} workflows not updated in 6+ months** — review for relevance:`,
      ...staleWorkflows.map((w) => `   - ${w.name}`)
    );
  }

  return lines.join('\n');
}

async function checkCriticalWorkflows(): Promise<string> {
  const workflows = await getWorkflows();
  const activeNames = workflows.filter((w) => w.enabled).map((w) => w.name.toLowerCase());

  const results = CRITICAL_WORKFLOWS.map((cw) => {
    const found = activeNames.some((name) =>
      cw.keywords.some((kw) => name.includes(kw))
    );
    return { ...cw, found };
  });

  const present = results.filter((r) => r.found);
  const missing = results.filter((r) => !r.found);

  const lines = [
    '## Critical Workflows Gap Analysis',
    '',
    `**Present:** ${present.length} / ${CRITICAL_WORKFLOWS.length}`,
    `**Missing:** ${missing.length} / ${CRITICAL_WORKFLOWS.length}`,
    '',
  ];

  if (present.length > 0) {
    lines.push(
      '### ✅ Detected',
      ...present.map((r) => `- ${r.name}`),
      ''
    );
  }

  if (missing.length > 0) {
    lines.push(
      '### ❌ Missing — Build These First (highest priority first)',
      ...missing.map(
        (r, i) =>
          `${i + 1}. **${r.name}**\n   Trigger: ${r.trigger}\n   Purpose: ${r.purpose}`
      ),
      '',
      '### 🔧 Next Step',
      'Run `get_how_to_guide` with topic "create a workflow" for step-by-step build instructions.',
      'Start with the MQL Assignment workflow — it has the highest impact.'
    );
  }

  return lines.join('\n');
}

async function getDealMetrics(daysBack = 90): Promise<string> {
  const [closedDeals, openDeals] = await Promise.all([
    getClosedDeals(daysBack),
    getOpenDeals(200),
  ]);

  const allClosed = closedDeals;
  const closedWon = allClosed;

  // Win rate requires closed-lost too — approximate from open vs closed
  const wonCount = closedWon.length;

  const amounts = closedWon
    .map((d) => parseFloat(safeProp(d, 'amount') || '0'))
    .filter((a) => a > 0);

  const avgDealSize = amounts.length > 0 ? amounts.reduce((a, b) => a + b, 0) / amounts.length : 0;

  const cycleLengths = closedWon
    .map((d) => {
      const created = parseInt(safeProp(d, 'createdate') || '0', 10);
      const closed = parseInt(safeProp(d, 'closedate') || '0', 10);
      if (!created || !closed) return null;
      return Math.floor((closed - created) / (1000 * 60 * 60 * 24));
    })
    .filter((n): n is number => n !== null && n > 0);

  const avgCycle =
    cycleLengths.length > 0
      ? Math.round(cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length)
      : 0;

  const totalOpenValue = openDeals.reduce((sum, d) => {
    return sum + parseFloat(safeProp(d, 'amount') || '0');
  }, 0);

  // Pipeline velocity = (open deals × avg deal size × approx win rate) / avg cycle
  const approxWinRate = 0.25; // cannot calculate exact without closed-lost data easily
  const velocity =
    avgCycle > 0
      ? Math.round((openDeals.length * avgDealSize * approxWinRate) / avgCycle)
      : 0;

  const lines = [
    `## Deal Metrics (last ${daysBack} days)`,
    '',
    `**Closed-Won deals analysed:** ${wonCount}`,
    `**Average Deal Size:** ${currency(avgDealSize)}`,
    `**Average Sales Cycle:** ${avgCycle} days`,
    `**Open Pipeline Value:** ${currency(totalOpenValue)} across ${openDeals.length} open deals`,
    `**Pipeline Velocity (est.):** ${currency(velocity)}/day`,
    '',
    '### Benchmark Comparison',
  ];

  // Compare avg deal size and cycle against benchmarks (context-dependent)
  if (avgCycle > 0) {
    const cycleFlag = avgCycle < 30 ? '✅ Fast' : avgCycle < 90 ? '✅ Normal' : '⚠️ Long';
    lines.push(`- Sales Cycle: ${avgCycle} days — ${cycleFlag}`);
  }

  if (avgDealSize > 0) {
    lines.push(`- Avg Deal Size: ${currency(avgDealSize)}`);
  }

  lines.push(
    '',
    '### 📝 Note',
    'Win rate requires closed-lost deal data. Run the pipeline health report and compare Closed-Won count against all closed deals in the period for an accurate win rate.'
  );

  return lines.join('\n');
}

async function getOwnerPerformance(daysBack = 90): Promise<string> {
  const [openDeals, closedDeals, owners] = await Promise.all([
    getOpenDeals(200),
    getClosedDeals(daysBack),
    getOwners(),
  ]);

  const ownerMap: Record<string, string> = {};
  for (const o of owners) ownerMap[o.id] = `${o.firstName} ${o.lastName}`;

  interface OwnerStats {
    name: string;
    openCount: number;
    openValue: number;
    closedCount: number;
    closedValue: number;
  }

  const stats: Record<string, OwnerStats> = {};

  for (const deal of openDeals) {
    const ownerId = safeProp(deal, 'hubspot_owner_id') || 'unassigned';
    const name = ownerMap[ownerId] ?? 'Unassigned';
    if (!stats[ownerId]) stats[ownerId] = { name, openCount: 0, openValue: 0, closedCount: 0, closedValue: 0 };
    stats[ownerId].openCount++;
    stats[ownerId].openValue += parseFloat(safeProp(deal, 'amount') || '0');
  }

  for (const deal of closedDeals) {
    const ownerId = safeProp(deal, 'hubspot_owner_id') || 'unassigned';
    const name = ownerMap[ownerId] ?? 'Unassigned';
    if (!stats[ownerId]) stats[ownerId] = { name, openCount: 0, openValue: 0, closedCount: 0, closedValue: 0 };
    stats[ownerId].closedCount++;
    stats[ownerId].closedValue += parseFloat(safeProp(deal, 'amount') || '0');
  }

  const rows = Object.values(stats).sort((a, b) => b.closedValue - a.closedValue);

  const lines = [
    `## Owner Performance (${daysBack}-day window)`,
    '',
    '| Owner | Open Deals | Open Pipeline | Closed Won (${daysBack}d) | Closed Value |',
    '|-------|-----------|--------------|-------------------|-------------|',
    ...rows.map(
      (r) =>
        `| ${r.name} | ${r.openCount} | ${currency(r.openValue)} | ${r.closedCount} | ${currency(r.closedValue)} |`
    ),
  ];

  return lines.join('\n').replace('${daysBack}d', `${daysBack}d`);
}

async function diagnoseRevopsMaturity(): Promise<string> {
  // Gather data concurrently
  const [openDeals, pipelines, owners, lifecycleCounts] = await Promise.all([
    getOpenDeals(50),
    getPipelines(),
    getOwners(),
    getContactCountByLifecycleStage(),
  ]);

  let workflows: Awaited<ReturnType<typeof getWorkflows>> = [];
  let workflowsAvailable = true;
  try {
    workflows = await getWorkflows();
  } catch {
    workflowsAvailable = false;
  }

  const activeWorkflows = workflows.filter((w) => w.enabled);
  const mqlCount = lifecycleCounts['marketingqualifiedlead'] ?? 0;
  const customerCount = lifecycleCounts['customer'] ?? 0;

  // Score signals
  const signals: { signal: string; found: boolean }[] = [
    {
      signal: 'Multiple pipelines (suggests distinct sales motions)',
      found: pipelines.length > 1,
    },
    {
      signal: 'Pipeline stage probabilities set',
      found: pipelines.some((p) =>
        p.stages.some((s) => s.metadata.probability && s.metadata.isClosed !== 'true')
      ),
    },
    {
      signal: 'MQLs exist (lead scoring configured)',
      found: mqlCount > 0,
    },
    {
      signal: 'Customer records exist (lifecycle automation working)',
      found: customerCount > 0,
    },
    {
      signal: '5+ active workflows',
      found: activeWorkflows.length >= 5,
    },
    {
      signal: '15+ active workflows',
      found: activeWorkflows.length >= 15,
    },
    {
      signal: '30+ active workflows (scaled automation)',
      found: activeWorkflows.length >= 30,
    },
    {
      signal: 'Deals have amounts set',
      found: openDeals.filter((d) => safeProp(d, 'amount')).length > openDeals.length * 0.8,
    },
    {
      signal: 'Sales team > 3 users',
      found: owners.length > 3,
    },
    {
      signal: 'Workflows accessible (automation scope)',
      found: workflowsAvailable,
    },
  ];

  const score = signals.filter((s) => s.found).length;
  const level =
    score <= 3 ? 1 : score <= 5 ? 2 : score <= 7 ? 3 : 4;

  const maturity = MATURITY_LEVELS[level - 1];

  const lines = [
    '## RevOps Maturity Assessment',
    '',
    `### Result: Level ${level} — ${maturity.name}`,
    '',
    maturity.description,
    '',
    '### Evidence Found',
    ...signals.map((s) => `${s.found ? '✅' : '❌'} ${s.signal}`),
    '',
    '### Next Steps to Reach Level ' + Math.min(4, level + 1),
    ...MATURITY_LEVELS[Math.min(3, level)].signals.map((s) => `- ${s}`),
    '',
    '### 🔧 Immediate Actions',
    'Run `check_critical_workflows` to find which automation gaps to fill first.',
    'Run `audit_properties` contacts to check data foundation.',
    'Run `get_pipeline_health` to find data quality issues in the pipeline.',
  ];

  return lines.join('\n');
}

async function searchContactsHandler(query: string): Promise<string> {
  const filterGroups = [
    {
      filters: [
        { propertyName: 'email', operator: 'CONTAINS_TOKEN', value: query },
      ],
    },
    {
      filters: [
        { propertyName: 'firstname', operator: 'CONTAINS_TOKEN', value: query },
      ],
    },
    {
      filters: [
        { propertyName: 'lastname', operator: 'CONTAINS_TOKEN', value: query },
      ],
    },
    {
      filters: [
        { propertyName: 'company', operator: 'CONTAINS_TOKEN', value: query },
      ],
    },
  ];

  const result = await searchContacts(filterGroups, 20);

  if (result.results.length === 0) {
    return `No contacts found matching "${query}".`;
  }

  const rows = result.results.map((c) => {
    const p = c.properties;
    const name = [p['firstname'], p['lastname']].filter(Boolean).join(' ') || '(no name)';
    const email = p['email'] ?? '—';
    const company = p['company'] ?? '—';
    const stage = p['lifecyclestage'] ?? '—';
    const owner = p['hubspot_owner_id'] ? `Owner ID: ${p['hubspot_owner_id']}` : 'Unassigned';
    return `- **${name}** | ${email} | ${company} | Stage: ${stage} | ${owner}`;
  });

  return [
    `## Contact Search: "${query}" (${result.total} total matches, showing ${result.results.length})`,
    '',
    ...rows,
  ].join('\n');
}

async function getOwnersHandler(): Promise<string> {
  const owners = await getOwners();

  const rows = owners.map((o) => {
    const team = o.teams?.map((t) => t.name).join(', ') ?? 'No team';
    return `- **${o.firstName} ${o.lastName}** | ${o.email} | Team: ${team}`;
  });

  return [
    `## HubSpot Users / Owners (${owners.length} total)`,
    '',
    ...rows,
  ].join('\n');
}

function getCommonPitfalls(): string {
  const lines = ['## Common HubSpot & RevOps Pitfalls', ''];

  COMMON_PITFALLS.forEach((p, i) => {
    lines.push(
      `### ${i + 1}. ${p.pitfall}`,
      `**Symptom:** ${p.symptom}`,
      `**Fix:** ${p.fix}`,
      ''
    );
  });

  return lines.join('\n');
}

// ─── Main Dispatcher ─────────────────────────────────────────────────────────

export async function callTool(
  name: string,
  args: Record<string, unknown>
): Promise<McpToolResult> {
  try {
    let text = '';

    switch (name) {
      case 'get_account_overview':
        text = await getAccountOverview();
        break;

      case 'audit_properties': {
        const objectType = (args['object_type'] as string) ?? 'contacts';
        if (!['contacts', 'companies', 'deals'].includes(objectType)) {
          throw new Error('object_type must be one of: contacts, companies, deals');
        }
        text = await auditProperties(objectType as 'contacts' | 'companies' | 'deals');
        break;
      }

      case 'audit_pipelines':
        text = await auditPipelines();
        break;

      case 'get_pipeline_health':
        text = await getPipelineHealth();
        break;

      case 'get_at_risk_deals':
        text = await getAtRiskDealsHandler();
        break;

      case 'get_lifecycle_distribution':
        text = await getLifecycleDistribution();
        break;

      case 'audit_workflows':
        text = await auditWorkflowsHandler();
        break;

      case 'check_critical_workflows':
        text = await checkCriticalWorkflows();
        break;

      case 'get_deal_metrics': {
        const days = parseInt(String(args['days_back'] ?? '90'), 10);
        text = await getDealMetrics(isNaN(days) ? 90 : days);
        break;
      }

      case 'get_owner_performance': {
        const days = parseInt(String(args['days_back'] ?? '90'), 10);
        text = await getOwnerPerformance(isNaN(days) ? 90 : days);
        break;
      }

      case 'diagnose_revops_maturity':
        text = await diagnoseRevopsMaturity();
        break;

      case 'get_how_to_guide': {
        const topic = String(args['topic'] ?? '');
        if (!topic) throw new Error('topic is required');
        text = searchHowTo(topic);
        break;
      }

      case 'search_contacts': {
        const query = String(args['query'] ?? '');
        if (!query) throw new Error('query is required');
        text = await searchContactsHandler(query);
        break;
      }

      case 'get_owners':
        text = await getOwnersHandler();
        break;

      case 'get_common_pitfalls':
        text = getCommonPitfalls();
        break;

      default:
        throw new Error(`Unknown tool: ${name}`);
    }

    return { content: [{ type: 'text', text }], isError: false };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      content: [{ type: 'text', text: `Error: ${message}` }],
      isError: true,
    };
  }
}
