# HubSpot RevOps MCP Server

A read-only Model Context Protocol server that connects to your HubSpot account via a Private App and gives an AI assistant (Claude) diagnostic and advisory capabilities over your CRM.

## What it does

- **Audits** contacts, companies, deals, pipelines, and workflows for data quality issues
- **Diagnoses** RevOps maturity across 4 levels
- **Identifies** at-risk deals, lifecycle funnel bottlenecks, and critical workflow gaps
- **Benchmarks** your key sales metrics against industry standards
- **Guides** you step-by-step on how to fix issues manually in HubSpot

> **Read-only by design.** The MCP server never writes to HubSpot. All changes are made by you in the HubSpot UI.

---

## Setup

### 1. Create a HubSpot Private App

1. In HubSpot: **Settings → Integrations → Private Apps → Create a private app**
2. Give it a name (e.g., "RevOps MCP")
3. Under **Scopes**, enable:
   - `crm.objects.contacts.read`
   - `crm.objects.companies.read`
   - `crm.objects.deals.read`
   - `crm.schemas.contacts.read`
   - `crm.schemas.companies.read`
   - `crm.schemas.deals.read`
   - `crm.objects.owners.read`
   - `automation` *(requires Sales Hub Professional)*
4. Create the app and copy the **Access Token** (starts with `pat-na1-…`)

### 2. Clone and install

```bash
git clone <your-repo-url>
cd server
npm install
```

### 3. Configure environment

```bash
cp .env.example .env.local
# Edit .env.local and paste your HubSpot Access Token
```

### 4. Run locally

```bash
npm run dev
# MCP endpoint: http://localhost:3000/api/mcp
```

---

## Deploy to Vercel

### Option A — Vercel CLI

```bash
npm install -g vercel
vercel
# Follow prompts; add HUBSPOT_ACCESS_TOKEN as an environment variable when asked
```

### Option B — Vercel Dashboard

1. Push this repo to GitHub
2. Import the repo at vercel.com
3. Set root directory to `server/`
4. Add environment variable: `HUBSPOT_ACCESS_TOKEN = pat-na1-…`
5. Deploy

The `vercel.json` already sets `maxDuration: 60` for the MCP route.

---

## Connect to Claude

Once deployed, add the MCP server to Claude Desktop or Claude.ai:

**Claude Desktop** (`claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "hubspot": {
      "url": "https://your-deployment.vercel.app/api/mcp"
    }
  }
}
```

**Claude.ai**: Settings → Integrations → Add MCP Server → paste your Vercel URL + `/api/mcp`

---

## Available Tools (15)

| Tool | What it does |
|------|-------------|
| `get_account_overview` | Object counts, pipelines, users |
| `audit_properties` | Custom + default properties; flags missing critical fields |
| `audit_pipelines` | Pipeline stages, probabilities, issues |
| `get_pipeline_health` | Open deals with data quality flags |
| `get_at_risk_deals` | Deals past close date or with no recent activity |
| `get_lifecycle_distribution` | Contact funnel counts + conversion rates |
| `audit_workflows` | All active workflows + stale detection |
| `check_critical_workflows` | Gap analysis against 12 must-have workflows |
| `get_deal_metrics` | Win rate, avg deal size, avg cycle, velocity |
| `get_owner_performance` | Open + closed pipeline per sales rep |
| `diagnose_revops_maturity` | Level 1–4 maturity score + action plan |
| `get_how_to_guide` | Step-by-step how-to for any HubSpot task |
| `search_contacts` | Find contacts by name, email, or company |
| `get_owners` | List all HubSpot users |
| `get_common_pitfalls` | Most frequent HubSpot/RevOps mistakes + fixes |

---

## Project structure

```
server/
├── app/
│   ├── api/
│   │   └── mcp/
│   │       └── route.ts      # MCP JSON-RPC 2.0 endpoint
│   └── layout.tsx
├── lib/
│   ├── hubspot.ts            # HubSpot API wrapper (read-only)
│   ├── knowledge.ts          # Embedded RevOps knowledge base
│   └── tools.ts              # Tool definitions + handlers
├── .env.example
├── next.config.ts
├── package.json
├── tsconfig.json
└── vercel.json
```
