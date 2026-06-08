# HubSpot How-To Guide — Implementation Reference
**Purpose:** Step-by-step instructions for common HubSpot tasks. Used by the MCP tool to accompany every recommendation with exact manual implementation steps. Covers Sales Hub Professional.  
**Navigation format:** Settings menu → sub-menu → action

---

## TABLE OF CONTENTS
1. [Properties — Create, Edit, Audit, Delete](#1-properties)
2. [Pipelines — Create, Configure, Audit Deal Stages](#2-pipelines)
3. [Workflows — Create, Edit, Audit, Troubleshoot](#3-workflows)
4. [Lifecycle Stages — Configure and Automate](#4-lifecycle-stages)
5. [Lead Scoring — Build a Score Property](#5-lead-scoring)
6. [Lists — Active and Static](#6-lists)
7. [Sequences — Create and Manage](#7-sequences)
8. [Email Templates — Create and Organize](#8-email-templates)
9. [Snippets — Create and Use](#9-snippets)
10. [Playbooks — Create for Deal Stages](#10-playbooks)
11. [Tasks — Manual and Automated](#11-tasks)
12. [Meetings — Booking Link Setup](#12-meetings)
13. [Dashboards and Reports — Build and Share](#13-dashboards-and-reports)
14. [Forecasting — Set Up and Use](#14-forecasting)
15. [Lead Rotation — Assign Owners Automatically](#15-lead-rotation)
16. [Deal Automation — Stage-Based Triggers](#16-deal-automation)
17. [Notifications — Internal Alerts Setup](#17-notifications)
18. [Data Deduplication — Merge and Prevent](#18-deduplication)
19. [Imports — Clean Data Import Process](#19-imports)
20. [Integrations — Connect External Tools](#20-integrations)
21. [Users and Teams — Manage Permissions](#21-users-and-teams)
22. [Audit Tools — Review Account Health](#22-audit-tools)
23. [Associations — Link Objects Correctly](#23-associations)
24. [Target Accounts — ABM Setup](#24-target-accounts)

---

## 1. Properties

### What Are Properties?
Properties store data on HubSpot objects (Contacts, Companies, Deals, Tickets). Custom properties extend the defaults. Getting properties right is the foundation of everything else.

### 1.1 Create a New Contact Property
1. Go to **Settings** (gear icon, top right)
2. Left sidebar → **Properties**
3. Top right → **Create property**
4. Select object type: **Contact**
5. Fill in:
   - **Group:** Choose the group it belongs to (or create a new group to keep things organized)
   - **Label:** Human-readable name (e.g., "Lead Source Detail")
   - **Internal name:** Auto-generated; leave as-is unless you have a naming convention
   - **Field type:** Choose carefully:
     - *Single-line text* — free-text, hard to report on; avoid unless necessary
     - *Dropdown select* — best for standardized values (industry, lead source, etc.)
     - *Multiple checkboxes* — when multiple values can apply simultaneously
     - *Date picker* — for dates (e.g., "Contract Renewal Date")
     - *Number* — for numeric values used in calculations
     - *Calculated* — derives value from other properties automatically
     - *Score* — for lead/contact scoring (special type)
6. If Dropdown: click **+ Add option** to add each value; drag to reorder
7. Click **Create**

### 1.2 Create a New Company or Deal Property
Same steps as above — at step 4 select **Company** or **Deal** instead of Contact.

### 1.3 Edit an Existing Property
1. **Settings** → **Properties**
2. Select object (Contact / Company / Deal)
3. Search for the property by name
4. Click the property name to open it
5. Edit label, options, or group → **Save**
> **Note:** You cannot change the internal name or field type after creation. If you need to, create a new property and migrate data via workflow.

### 1.4 Add a Property to a Record Form (Make It Visible)
1. Go to any Contact/Company/Deal record
2. In the left panel, scroll to the relevant section
3. Click **Manage properties** (pencil icon on the section header)
4. Search for your property → toggle it on → **Save**

### 1.5 Make a Property Required at a Deal Stage
1. **Settings** → **Objects** → **Deals**
2. Click **Pipelines** tab → select your pipeline
3. Click **Edit** next to a stage
4. Under **Required properties**, click **Add a required property**
5. Select the property → set whether it's required to *enter* or *exit* the stage
6. Click **Save**
> **Use case:** Require "Close Date" and "Amount" before a deal can enter "Proposal Sent" — prevents forecast data gaps.

### 1.6 Audit Properties for Fill Rate
1. **Reports** → **Data Management** → **Properties**
2. Select **Contacts** (or other object)
3. The table shows each property with % of records where it has a value
4. Sort by % filled ascending → bottom of the list = least-used properties
5. Any property with < 5% fill rate AND not used in any workflow → candidate for deletion

### 1.7 Find Duplicate / Redundant Properties
1. **Settings** → **Properties** → select object
2. Export property list: **Actions** → **Export all properties**
3. Open in Excel/Sheets; sort by label
4. Look for: same concept, different names (e.g., "Lead Source", "Original Lead Source", "Source")
5. Decide which is canonical; migrate data; delete the others

### 1.8 Delete a Property
1. **Settings** → **Properties**
2. Hover over the property → click **Actions** → **Delete**
3. HubSpot warns you how many records use it and how many workflows reference it
4. Resolve all references first (update workflows, remove from forms) before deleting

### 1.9 Create a Property Group (for Organization)
1. **Settings** → **Properties**
2. Top right → **Create group**
3. Name it (e.g., "Lead Qualification", "Contract Info", "RevOps Internal")
4. Assign properties to the group when creating/editing them

---

## 2. Pipelines

### 2.1 View Existing Pipelines
1. **Settings** → **Objects** → **Deals**
2. Click **Pipelines** tab
3. All pipelines listed with their stages

### 2.2 Create a New Pipeline
1. **Settings** → **Objects** → **Deals** → **Pipelines**
2. Top right → **Add pipeline**
3. Name it (e.g., "New Business", "Renewal", "Expansion")
4. Add stages (see 2.3 below)
5. Click **Save**

### 2.3 Configure Deal Stages
For each stage in a pipeline:
1. Click the stage name to edit it
2. Set:
   - **Stage name:** Reflects a buyer decision, not an internal activity (e.g., "Discovery Completed" not "Had a call")
   - **Win probability:** The historical % of deals entering this stage that close. Start with a guess; refine after 3+ months of data
   - **Deal probability is**: always-show, or show only when stage is active
3. To add a stage: click **+ Add stage** at the bottom of the stage list
4. Drag stages to reorder them
5. **Save**

### 2.4 Set Required Properties per Stage
*(Already covered in 1.5 above)*

### 2.5 View Pipeline Health (Quick Audit)
1. Go to **Sales** → **Deals**
2. Switch to **Board view** (top right toggle)
3. Each column = one stage; cards show deal name, amount, close date, owner
4. Look for:
   - Columns with too many stacked cards (bottleneck)
   - Cards with no amount shown (missing data)
   - Cards with past close dates (stale)

### 2.6 Delete a Pipeline
1. **Settings** → **Objects** → **Deals** → **Pipelines**
2. Click pipeline name → **Actions** → **Delete**
3. You must move all deals to another pipeline first — HubSpot will prompt you

---

## 3. Workflows

### 3.1 Workflow Types
| Type | Best For |
|------|---------|
| **Contact-based** | Lifecycle automation, lead nurture, MQL assignment |
| **Company-based** | Company property updates, account-level alerts |
| **Deal-based** | Stage automation, task creation, deal alerts |
| **Ticket-based** | Support automation |
| **Quote-based** | Quote follow-up |

### 3.2 Create a Contact-Based Workflow
1. **Automation** → **Workflows**
2. Top right → **Create workflow** → **From scratch**
3. Select **Contact-based**
4. Choose trigger type:
   - *Contact is created* — fires once when a new contact is added
   - *Contact property is set/changed* — fires when a specific property updates
   - *Form is submitted* — fires on a specific form submission
   - *Email link is clicked* — fires on marketing email engagement
5. Click **Set up triggers** → configure your trigger condition → **Save**
6. Click **+** to add actions:
   - **Set property value** — update a contact property
   - **Send email** — send a marketing or automated email
   - **Create task** — assign a to-do to the contact owner or a specific user
   - **Send internal email notification** — alert a team member
   - **Rotate contact to owner** — assign from a team (round-robin or by rules)
   - **Enroll in sequence** — start a sales sequence (Sales Hub Pro required)
   - **Add to list** — add contact to a static or active list
   - **Set contact owner** — assign to specific user
   - **Delay** — wait X days/hours/minutes before next action
   - **If/then branch** — split workflow based on a condition
7. Add **Unenrollment criteria** (top right of workflow editor) — conditions where contacts EXIT the workflow mid-flow
8. Add **Goal** (optional) — if contact meets this condition, they exit successfully
9. Toggle **Re-enrollment** if the workflow should re-fire when trigger is met again
10. Top right → **Review and publish** → **Turn on**

### 3.3 Create a Deal-Based Workflow
1. **Automation** → **Workflows** → **Create workflow** → **From scratch**
2. Select **Deal-based**
3. Set trigger: e.g., *Deal stage is equal to "Proposal Sent"*
4. Add actions: e.g., Create task "Follow up on proposal" due in 3 days → assign to Deal Owner
5. Add unenrollment: *Deal stage is Closed Won OR Closed Lost* (so completed deals exit)
6. **Turn on**

### 3.4 Common Workflow Actions Reference

**Create a Task:**
- Action: **Create task**
- Fields: Title, Notes, Due date (relative: "3 days from now"), Assign to (Deal Owner / specific user), Priority

**Send Internal Email Notification:**
- Action: **Send internal email notification**
- Fields: To (specific user, contact owner, deal owner), Subject, Body (can include HubSpot tokens like {{contact.firstname}})

**If/Then Branch:**
- Action: **If/then branch**
- Use to split: e.g., if Company Size > 200 → go to Enterprise path; else → go to SMB path

**Delay Until:**
- Action: **Delay until a day or time**
- Use to send emails only on weekdays, or at 9am in the contact's timezone

**Copy Property Value:**
- Action: **Copy property value**
- Use to sync data between objects (e.g., copy Contact's "Company Name" to Deal's "Account Name")

### 3.5 Troubleshoot a Broken Workflow
1. **Automation** → **Workflows** → click the workflow name
2. Click **History** tab (top of workflow editor)
3. Search for a specific contact to see what happened to them
4. Status options:
   - *Enrolled* — in the workflow now
   - *Completed* — went through successfully
   - *Unenrolled* — exited via unenrollment criteria
   - *Left via goal* — achieved the goal
   - *Skipped action* — a specific action was skipped (click to see why)
   - *Error* — something failed; click to see the error message
5. Common errors:
   - "User not found" — the owner field is blank; fix: add a default fallback owner
   - "Email not sent — contact unsubscribed" — normal; not a bug
   - "Workflow loop detected" — the action triggers the enrollment condition again; fix: add a suppression

### 3.6 Check for Workflow Conflicts
1. **Automation** → **Workflows**
2. Use the **Filter** button to filter by: Object type + Active status
3. Look for multiple workflows that:
   - Set the same property (only the last one to run wins)
   - Enroll on the same trigger (both fire; may cause duplicate tasks)
4. Check **Dependencies** on any workflow: click the workflow → **Details** tab → see which lists, properties, emails it uses

### 3.7 Workflow Naming Convention (Best Practice)
Format: `[Object] | [Trigger] | [Main Action]`
Examples:
- `Contact | MQL Score ≥ 50 | Assign Owner + Create Task`
- `Deal | Stage = Proposal Sent | Create Follow-Up Task`
- `Contact | No Activity 180 Days | Re-engagement Sequence`

Add in the **Description** field: Owner name, creation date, last reviewed date, purpose.

### 3.8 Pause / Deactivate a Workflow
1. Open the workflow
2. Top right toggle → switch to **Off**
3. Contacts currently enrolled: they stay enrolled but no new actions trigger until re-activated
4. To remove all currently enrolled contacts: **Actions** → **Unenroll all contacts**

---

## 4. Lifecycle Stages

### 4.1 HubSpot Default Lifecycle Stages (in order)
`Subscriber → Lead → Marketing Qualified Lead (MQL) → Sales Qualified Lead (SQL) → Opportunity → Customer → Evangelist → Other`

> **Important rule:** HubSpot lifecycle stages only move *forward* automatically. If a contact is a Customer and you set them to Lead, it will not change because Customer is further along. To reset, you must manually set or use a workflow with "Set property value" with "Always set value" checked.

### 4.2 Automate Lifecycle Stage Transitions
Each transition should be a workflow:

**Subscriber → Lead** (any form fill):
- Trigger: Form submitted (any form)
- Action: Set Lifecycle Stage = Lead (if current value is Subscriber or blank)

**Lead → MQL** (score threshold):
- Trigger: Lead Score is greater than or equal to [threshold]
- Action: Set Lifecycle Stage = MQL

**MQL → SQL** (sales accepts):
- Trigger: Deal is created AND associated contact Lifecycle Stage is MQL
- Action: Set associated contact Lifecycle Stage = SQL
*(Or: when rep changes "Lead Status" to "Qualified")*

**SQL → Opportunity** (deal created):
- Trigger: Deal is created (contact-based, via associated deal)
- Action: Set Lifecycle Stage = Opportunity

**Opportunity → Customer** (deal closed won):
- Trigger: Deal stage = Closed Won
- Action: Set associated contact Lifecycle Stage = Customer

### 4.3 View Lifecycle Stage Distribution
1. **Contacts** → **All Contacts**
2. Top right → **Columns** → add "Lifecycle Stage"
3. Or: **Reports** → **Create report** → Contact property breakdown by Lifecycle Stage
4. A healthy distribution in an active pipeline shows a funnel shape (many Leads, fewer MQLs, fewer Customers)

---

## 5. Lead Scoring

### 5.1 Create a HubSpot Score Property
1. **Settings** → **Properties** → **Contact**
2. **Create property** → Field type: **Score**
3. Name it: "Lead Score" (or "HubSpot Score" if using default)
4. Click **Create**

### 5.2 Configure Scoring Criteria
1. Go to **Settings** → **Properties** → find your Score property → click it
2. Click **Manage score criteria**
3. Two sections: **Positive attributes** (add points) and **Negative attributes** (subtract points)

**Positive attribute examples:**
| Criteria | Points | Rationale |
|----------|--------|-----------|
| Job Title contains "VP", "Director", "Head of", "Manager" | +10 | Decision-maker signal |
| Company Size > 50 employees | +5 | ICP fit |
| Page views ≥ 5 in last 30 days | +10 | High intent |
| Pricing page viewed | +15 | Very high intent |
| Demo request form submitted | +25 | Direct intent |
| Downloaded case study or whitepaper | +8 | Content engagement |
| Email opened ≥ 3 in last 30 days | +5 | Engagement |
| Email link clicked ≥ 2 in last 30 days | +8 | Engaged |
| Industry = [your ICP industry] | +10 | Fit |

**Negative attribute examples:**
| Criteria | Points | Rationale |
|----------|--------|-----------|
| Email domain contains "gmail" / "yahoo" / "hotmail" | -10 | Personal email = likely not B2B |
| Job Title contains "student" / "intern" | -15 | Not a buyer |
| Unsubscribed from all email | -20 | Unengaged |
| No activity in last 90 days | -10 | Gone cold |

4. Click **Save** after each criterion
5. Set your MQL threshold: what total score = ready for sales? Start at 30–50; adjust based on conversion data.

### 5.3 Build the MQL Workflow Using the Score
*(See Workflow Section 3.2 — use "Lead Score ≥ [threshold]" as the trigger)*

---

## 6. Lists

### 6.1 Active Lists vs. Static Lists
| Type | Updates | Best For |
|------|---------|---------|
| **Active list** | Automatically — contacts enter/exit based on criteria | Ongoing segments (all MQLs, all customers, etc.) |
| **Static list** | Only when manually added or via import/workflow | One-time campaign sends, suppression lists |

### 6.2 Create a List
1. **Contacts** → **Lists** (left sidebar) → **Create list** (top right)
2. Choose **Active** or **Static**
3. Name it descriptively (e.g., "Active — All MQLs", "Static — Trade Show 2025")
4. Set filter criteria (for Active):
   - Click **Add filter**
   - Choose property / form / workflow / email behavior
   - Add multiple filters with AND/OR logic
5. Click **Save list**
6. HubSpot shows how many contacts match

### 6.3 Common Lists to Create
| List Name | Criteria | Use |
|-----------|---------|-----|
| All MQLs | Lifecycle Stage = MQL | Workflow enrollment, reporting |
| All SQLs | Lifecycle Stage = SQL | Sales reporting |
| All Customers | Lifecycle Stage = Customer | CS workflows, reporting |
| No Activity 90 Days | Last Activity Date < 90 days ago AND Lifecycle ≠ Customer | Re-engagement workflow |
| Unsubscribed | Email Opt Out = True | Suppression from all sends |
| ICP Contacts | Industry + Company Size + Job Title filters matching ICP | ABM targeting |

---

## 7. Sequences

> **Requires:** Sales Hub Professional or Enterprise

### 7.1 What Sequences Are
Sequences are automated series of sales emails and tasks sent from a rep's personal email account (not marketing emails). They stop automatically when the contact replies or books a meeting.

### 7.2 Create a Sequence
1. **Sales** → **Sequences** (left sidebar) → **Create sequence**
2. Name it (e.g., "Cold Outbound — SaaS CTO", "Post-Demo Follow-Up")
3. Click **+** to add steps:
   - **Automated email:** Uses a template; sent from rep's personal inbox
   - **Manual email task:** Reminds rep to send a custom email
   - **Call task:** Reminds rep to make a call
   - **LinkedIn task:** Reminds rep to send a LinkedIn message or connection request
   - **General task:** Any custom action
4. Set the delay between steps (e.g., "Send 2 business days after previous step")
5. For email steps: click **Create new template** or select an existing template
6. **Save** the sequence

### 7.3 Enroll a Contact in a Sequence (Manual)
1. Open the Contact record
2. Top right → **Enroll in sequence**
3. Select the sequence
4. Choose which email address to send from (rep's connected email)
5. Customize the first email if needed
6. Click **Start**

### 7.4 Enroll via Workflow (Automated)
1. In a workflow, add action: **Enroll in sequence**
2. Select the sequence
3. Select which user the emails send from (must be a specific user, not "contact owner")
4. Note: the user must have their email connected to HubSpot for this to work

### 7.5 View Sequence Performance
1. **Sales** → **Sequences**
2. Click a sequence name
3. View: Open rate, Click rate, Reply rate, Meeting booked rate, Unenroll rate per step
4. A/B test by cloning the sequence and changing one variable (subject line, step timing)

---

## 8. Email Templates

### 8.1 Create an Email Template
1. **Sales** → **Templates** → **New template** → **From scratch**
2. Name it (use a naming convention: `[Stage] — [Persona] — [Purpose]`)
   Examples: `Outbound — SaaS CFO — Cold Introduction`, `Post-Demo — Follow-Up Day 1`
3. Write the subject line and body
4. Use **personalization tokens:** click the `{}` icon → insert: `{{contact.firstname}}`, `{{contact.company}}`, `{{owner.firstname}}`, etc.
5. Click **Save template**

### 8.2 Organize Templates by Folder
1. **Sales** → **Templates**
2. Left sidebar → **New folder** → name it by stage or team (e.g., "Prospecting", "Post-Demo", "Renewal")
3. Drag templates into folders

### 8.3 Share Templates with the Team
1. Open a template → click **Actions** → **Edit**
2. Set **Visibility**: Private (only you) or Everyone (whole team)
3. **Save**

### 8.4 View Template Performance
1. **Sales** → **Templates**
2. The table shows: # sent, open rate, click rate per template
3. Sort by open rate or click rate to identify best performers

---

## 9. Snippets

### What Are Snippets?
Short, reusable blocks of text inserted into emails, notes, or chat with a `#` shortcut. Useful for common responses to objections, standard meeting prep questions, or intro lines.

### 9.1 Create a Snippet
1. **Sales** → **Snippets** → **New snippet**
2. Name it (this becomes the shortcut name)
3. Write the content (can include personalization tokens)
4. **Save**

### 9.2 Use a Snippet
- In any email or note field: type `#` followed by the snippet name → it appears in a dropdown → click to insert

---

## 10. Playbooks

> **Requires:** Sales Hub Professional or Enterprise

### What Are Playbooks?
Playbooks are interactive note-taking guides that pop up on Contact, Company, or Deal records. Reps fill them out during calls or discovery meetings. Answers can be auto-saved to HubSpot properties.

### 10.1 Create a Playbook
1. **Sales** → **Playbooks** → **Create playbook** → **From scratch**
2. Name it (e.g., "Discovery Call — MEDDIC", "Demo Follow-Up Checklist")
3. Select the type: **Call** or **Prospecting**
4. Add questions:
   - **Short answer** — free text
   - **Multiple choice** — select from options
   - **Number** — numeric input
   - **Yes/No**
5. For each question, optionally: **Link to property** → select a Contact/Deal property
   → the rep's answer auto-populates that property on the record
6. **Publish**

### 10.2 Attach Playbook to a Deal Stage
1. Edit the playbook → **Settings** tab
2. Under **Record type**, select **Deal**
3. Under **Pipeline/Stage**, select which stage should surface this playbook
4. The playbook icon appears automatically on deal records at that stage

### 10.3 View Playbook Usage
1. **Sales** → **Playbooks** → click a playbook
2. View: # times used, by which reps, completion rate per question

---

## 11. Tasks

### 11.1 Create a Task Manually
1. Go to any Contact, Company, or Deal record
2. **Activities** tab → **Create task** (or use the quick shortcut at top)
3. Fill in: Title, Due date, Assign to (user), Priority, Notes
4. **Save task**

### 11.2 Create Tasks via Workflow
*(See Workflow Section 3.4 — "Create task" action)*

### 11.3 View All Your Tasks
1. **Sales** → **Tasks**
2. Filter by: Due date, Owner, Priority, Associated object
3. Use **Queue** feature: create a task queue for a set of contacts → work through them in sequence with call/email shortcuts

### 11.4 Build a Task Completion Report
1. **Reports** → **Create report** → **Single object** → **Activities**
2. Filter: Activity type = Task; Task status = Completed
3. Group by: Owner
4. This shows how many tasks each rep is completing per week

---

## 12. Meetings

### 12.1 Create a Personal Meeting Link
1. **Sales** → **Meetings** → **Create meeting link**
2. Choose type:
   - **One-on-one** — personal link (uses your calendar)
   - **Group** — multiple HubSpot users available simultaneously
   - **Round robin** — rotates among multiple reps
3. Set:
   - **Meeting name** (e.g., "30-Minute Discovery Call")
   - **Duration**
   - **Buffer time** before/after
   - **Availability hours**
   - **Calendar:** Connect Google Calendar or Outlook (if not already connected)
4. **Customize page:** Add logo, description, questions to fill before booking
5. Copy the link and add to email signature, sequences, and email templates
6. **Save**

### 12.2 Connect Your Calendar
1. **Settings** → **General** → **Calendar**
2. Click **Connect calendar** → sign in with Google or Microsoft account
3. HubSpot syncs meetings booked via meeting links AND logs calendar events on contact records (if contacts match by email)

---

## 13. Dashboards and Reports

### 13.1 Create a New Dashboard
1. **Reports** → **Dashboards** → **Create dashboard** (top right)
2. Name it (e.g., "Sales Pipeline Health", "Marketing Funnel", "Revenue Overview")
3. Set visibility: Private / Specific users / Everyone
4. **Create dashboard**

### 13.2 Add Reports to a Dashboard
1. Open a dashboard
2. Click **Add report** (top right)
3. Choose:
   - **From report library** — pre-built HubSpot reports (fastest to start)
   - **Create new report** — build from scratch
4. For report library: browse categories (Sales, Marketing, Service) → preview → **Add to dashboard**

### 13.3 Create a Custom Report (Single Object)
1. **Reports** → **Create report** → **Single object**
2. Select object: Contacts / Companies / Deals / Activities
3. Choose:
   - **X-axis:** What to group by (e.g., Deal Stage, Close Date, Owner)
   - **Y-axis:** What to measure (e.g., Count of deals, Sum of Amount)
4. Apply filters (e.g., Close Date = This quarter)
5. Choose chart type (Bar, Line, Pie, Table)
6. **Run report** to preview → **Save**

### 13.4 Create a Funnel Report (Multi-Stage)
1. **Reports** → **Create report** → **Funnel**
2. Select object: Contacts or Deals
3. Add stages in order (e.g., Lead → MQL → SQL → Opportunity → Customer)
4. Set date range
5. **Run** → shows conversion rates between each stage → **Save**

### 13.5 Create a Pipeline Velocity Report
1. **Reports** → **Create report** → **Single object** → **Deals**
2. Filter: Deal stage ≠ Closed Won/Lost; Date range = this quarter
3. Add columns: Deal name, Amount, Stage, Days in stage, Last modified, Owner
4. Sort by "Days in stage" descending
5. **Save** to "Pipeline Health" dashboard

### 13.6 Build the "At-Risk Deals" Report
1. **Reports** → **Create report** → **Single object** → **Deals**
2. Filters:
   - Deal stage ≠ Closed Won AND ≠ Closed Lost
   - Last activity date is more than 21 days ago
   - OR: Close date is in the past
3. Columns: Deal name, Owner, Amount, Stage, Close Date, Last Activity Date
4. Save as "At-Risk Deals" → add to Sales Dashboard

### 13.7 Set a Report as a Favorite / Pin to Dashboard
1. In a dashboard, hover over a report card
2. Click the **⋮** menu → **Edit** to resize/move; or **Remove** to delete from dashboard
3. Drag cards to rearrange the dashboard layout

---

## 14. Forecasting

> **Requires:** Sales Hub Professional or Enterprise

### 14.1 Enable and Access Forecast
1. **Sales** → **Forecast** (left sidebar)
2. If not visible: **Settings** → **Objects** → **Deals** → **Forecast** → enable it

### 14.2 Configure Forecast Categories
1. **Settings** → **Objects** → **Deals** → **Forecast**
2. Assign forecast categories to deal stages:
   - **Pipeline** — deals early in the process
   - **Best Case** — likely but not committed
   - **Commit** — rep is confident this closes this period
   - **Closed** — already won (auto-assigned)
   - **Omit** — excluded from forecast (e.g., disqualified deals not yet closed)
3. Click **Save**

### 14.3 Set Quota for a Rep
1. **Sales** → **Forecast**
2. Click the **Quota** column for a rep → enter their period quota
3. Quotas can be set per month, quarter, or custom period

### 14.4 Review Team Forecast
1. **Sales** → **Forecast**
2. See:
   - Each rep's quota, weighted forecast, commit amount, best case, closed
   - Pipeline coverage ratio (total pipeline / quota)
   - Deals included in each category (click to drill down)

---

## 15. Lead Rotation

### 15.1 Round-Robin Lead Assignment (via Workflow)
1. Create a Contact-based workflow
2. Trigger: Lifecycle Stage = MQL (or Lead Status = New)
3. Action: **Rotate contact to owner** → select a team or specific users
4. HubSpot rotates assignments evenly among selected users
5. Set **Notify owner**: Yes → sends an email/notification to assigned rep

### 15.2 Rule-Based Assignment (e.g., by Territory)
1. In a workflow, after enrollment trigger:
2. Add **If/then branch:**
   - Branch 1: Country = United States → Set Owner = [US Rep]
   - Branch 2: Country = United Kingdom → Set Owner = [UK Rep]
   - Default: Set Owner = [default rep or manager]
3. This way, each branch assigns a different owner

### 15.3 View Owner Assignment Distribution
1. **Reports** → **Create report** → **Single object** → **Contacts**
2. Group by: Contact Owner
3. Filter: Create date = last 30 days; Lifecycle Stage = MQL
4. This shows whether leads are being distributed evenly

---

## 16. Deal Automation

### 16.1 Auto-Create Tasks at Each Deal Stage
1. Create a **Deal-based workflow**
2. Trigger: Deal stage is equal to "[Stage Name]" (e.g., "Demo Scheduled")
3. Action: Create task → Title: "Send pre-demo research brief", Due: 1 day from now, Assign to: Deal owner
4. Add unenrollment: Deal stage = Closed Won OR Closed Lost
5. **Turn on**

### 16.2 Auto-Send Internal Notification When Deal Advances
1. Deal-based workflow
2. Trigger: Deal stage changes to "Proposal Sent"
3. Action: **Send internal email notification** → To: Deal Owner's Manager
4. Body: "{{deal.dealname}} has moved to Proposal Sent. Amount: {{deal.amount}}. Owner: {{deal.hubspot_owner_id}}"

### 16.3 Auto-Update Close Date Warning
1. Deal-based workflow
2. Trigger: Deal is active (enrolled) — use a date-based trigger: "Close Date is X days away"
3. Condition: Deal stage ≠ Closed Won AND ≠ Closed Lost
4. Action: Create task → "Review close date accuracy — date approaching" → assign to owner
5. This prevents stale close dates from distorting the forecast

### 16.4 Closed Won → Kick Off Onboarding
1. Deal-based workflow
2. Trigger: Deal stage = Closed Won
3. Actions in sequence:
   - Set associated contact Lifecycle Stage = Customer
   - Create task for CSM: "Begin onboarding for [deal name]"
   - Send internal notification to CS team
   - Add contact to "New Customers — Onboarding" list
   - Enroll contact in onboarding email sequence (if applicable)

---

## 17. Notifications

### 17.1 Personal Notification Settings
1. **Settings** (gear icon) → **Notifications**
2. Toggle on/off different notification types:
   - Deals: stage changes, new deals assigned to you
   - Contacts: new lead assigned, form submissions
   - Mentions: when someone @mentions you in a note
3. Set delivery: In-app / Email / Slack (if integrated)

### 17.2 Send Slack Notifications via Workflow
> Requires HubSpot + Slack integration enabled

1. In a workflow, add action: **Send Slack notification**
2. Select channel (e.g., #new-leads, #sales-alerts)
3. Compose message with tokens (e.g., "New MQL: {{contact.firstname}} {{contact.lastname}} from {{contact.company}}")

### 17.3 Enable Slack Integration
1. **Settings** → **Integrations** → **Connected apps** → search "Slack"
2. Click **Install** → authorize with your Slack workspace
3. Once connected, Slack notification action becomes available in workflows

---

## 18. Deduplication

### 18.1 Use HubSpot's Built-In Duplicate Management
1. **Contacts** → **Actions** → **Manage duplicates**
2. HubSpot shows pairs of contacts it thinks are duplicates (based on email, name, company)
3. For each pair: click **Merge** (choose which record to keep as primary) or **Not a duplicate**
4. The primary record retains all data; secondary is merged in and deleted
5. Do this regularly — weekly or monthly for active imports

### 18.2 Merge Two Contacts Manually
1. Open the contact you want to keep (primary)
2. Top right → **Actions** → **Merge**
3. Search for the duplicate contact
4. Select which record wins on each conflicting property
5. **Merge**

### 18.3 Prevent Duplicates via Form Settings
1. Go to a form → **Edit** → **Options** tab
2. Under **What should happen when a contact submits this form?**
3. Select: **Update existing contact** (not "Always create a new contact")
4. This means if the email already exists in HubSpot, it updates the record rather than creating a duplicate

### 18.4 Build a Deduplication Workflow (Contact-Company Matching)
1. Contact-based workflow
2. Trigger: Contact is created AND Email domain is known
3. Action: **If/then branch**: If Company with same domain exists → Associate contact to company
4. This auto-links contacts to their company based on email domain

---

## 19. Imports

### 19.1 Import Contacts from CSV
1. **Contacts** → top right → **Import**
2. Click **Start an import** → **Import file** → **Upload file**
3. Map CSV columns to HubSpot properties
   - For each column: select the matching HubSpot property
   - Unmapped columns are ignored
4. Check **Create and update contacts** (not just create)
5. Set **Import name** (for tracking later)
6. Choose whether to add to a list (static list auto-created from this import)
7. Click **Finish import**

### 19.2 Best Practices Before Importing
- Clean the file first: remove duplicates, standardize property values (e.g., all job titles cased the same way)
- Ensure email column is complete (email is the unique identifier)
- Add a source property in the CSV (e.g., "Import Source = Trade Show 2025")
- Test with 5 rows first before importing thousands

### 19.3 View Import History
1. **Contacts** → **Import** → **View imports**
2. Shows all past imports with: date, # contacts created, # updated, # errors
3. Download the error file to see which rows failed and why

---

## 20. Integrations

### 20.1 View Connected Apps
1. **Settings** → **Integrations** → **Connected apps**
2. See all active integrations and their sync status

### 20.2 Connect Gmail or Outlook
1. **Settings** → **General** → **Email**
2. Click **Connect personal email** → follow OAuth flow
3. Once connected:
   - Emails sent from Gmail/Outlook are logged in HubSpot on matching contacts
   - HubSpot sidebar appears in Gmail (if extension installed)
   - Meeting events sync from Google/Outlook Calendar

### 20.3 Install HubSpot Sales Extension (Gmail / Outlook)
1. Go to Chrome Web Store → search "HubSpot Sales"
2. Install the extension
3. Sign in with HubSpot credentials
4. A HubSpot panel appears in Gmail:
   - See contact info without leaving email
   - Log emails, create tasks, enroll in sequences directly from Gmail

### 20.4 Connect Aircall (VoIP Integration)
1. **Settings** → **Integrations** → **Connected apps** → search "Aircall"
2. Click **Install** → authorize with Aircall account
3. Once connected:
   - Calls made in Aircall are logged as activities in HubSpot
   - Call outcome, duration, and recording link appear on contact timeline
   - Disposition codes from Aircall map to HubSpot call outcomes

### 20.5 Check Integration Sync Errors
1. **Settings** → **Integrations** → **Connected apps** → click the integration
2. Click **Sync errors** tab
3. Review and resolve failed records (usually caused by missing required fields or data mismatches)

---

## 21. Users and Teams

### 21.1 Add a New User
1. **Settings** → **Users & Teams** → **Users** tab
2. Top right → **Create user**
3. Enter email address; select role (Super Admin / Admin / User)
4. Select seat type (Sales Hub seat vs. Marketing Hub seat)
5. Assign to a team (optional)
6. **Send invite** → user receives email to set up their account

### 21.2 Create a Team
1. **Settings** → **Users & Teams** → **Teams** tab
2. **Create team**
3. Name the team (e.g., "SDR Team", "Account Executives", "Customer Success")
4. Add members
5. Teams are used for: meeting round-robin, workflow assignment, reporting by team

### 21.3 Manage User Permissions
1. **Settings** → **Users & Teams** → click a user
2. **Permissions** tab
3. Toggle individual permissions:
   - *View all records* vs. *View only owned records*
   - *Edit all records* vs. *Edit only owned records*
   - *Export data* — toggle off for reps who shouldn't export lists
   - *Manage properties* — toggle off to prevent accidental property changes
   - *Admin access* — gives access to Settings

### 21.4 Super Admin vs. Regular Admin
| Access | Super Admin | Admin | User |
|--------|------------|-------|------|
| All Settings | Yes | Most | No |
| User management | Yes | Yes | No |
| Billing | Yes | No | No |
| All contacts/deals | Yes | Yes | Only owned |
| Create workflows | Yes | Yes | No |

---

## 22. Audit Tools

### 22.1 View Account Usage (What's Being Used)
1. **Settings** → **Account defaults** → **Usage**
2. See: contacts used vs. limit, emails sent, workflows active, etc.

### 22.2 Audit Active Workflows
1. **Automation** → **Workflows**
2. Filter: Status = Active
3. Sort by: Last updated (oldest first)
4. Workflows not updated in 6+ months → review for relevance
5. Check enrollment numbers — a workflow with 0 enrolled ever may never have worked

### 22.3 Audit Properties for Cleanliness
*(See Section 1.6 and 1.7)*

### 22.4 Find Forms With No Submissions
1. **Marketing** → **Forms**
2. The submissions column shows submission count
3. Forms with 0 submissions that are published → review if they're needed

### 22.5 Find Unused Email Templates
1. **Sales** → **Templates**
2. Sort by "Sent" column ascending
3. Templates with 0 sends → archive or delete

### 22.6 Review Deal Pipeline for Data Quality
Run these reports to spot data issues:
- Deals with no Amount → **Deals** → filter: Amount is unknown
- Deals with no Close Date → filter: Close Date is unknown
- Deals with no Owner → filter: HubSpot Owner is unknown
- All three of these = invisible to the forecast

---

## 23. Associations

### 23.1 What Are Associations?
HubSpot links objects together: Contacts ↔ Companies ↔ Deals ↔ Tickets. These associations define relationships and allow data to flow between objects.

### 23.2 Associate a Contact to a Company (Manual)
1. Open the Contact record
2. Right panel under **Company** → **+ Add** → search for the company → select it
3. Or open the Company record → right panel → **Contacts** → **Add contact**

### 23.3 Set Primary Company for a Contact
1. Open Contact record → right panel → **Company**
2. If multiple companies listed: hover over the desired one → click **Set as primary**

### 23.4 Create an Association via Workflow
*(See Section 18.4 — contact-company domain matching)*

### 23.5 Association Labels (Advanced — Requires Enterprise)
Define custom labels for associations (e.g., "Decision Maker", "Champion", "Technical Contact") to track influence within an account. Available in Sales Hub Enterprise.

---

## 24. Target Accounts (ABM)

> **Requires:** Sales Hub Professional or Enterprise + Marketing Hub Professional

### 24.1 Set Up ABM in HubSpot
1. **Marketing** → **Target Accounts** (or **Sales** → **Target Accounts**)
2. Click **Get started**
3. HubSpot creates two new properties automatically:
   - **Target Account** (Company) — Yes/No flag
   - **Buying Role** (Contact) — dropdown (Decision Maker, Champion, End User, etc.)

### 24.2 Mark a Company as a Target Account
1. Open a Company record
2. Find the **Target Account** property → set to **Yes**
3. Or: use a workflow to auto-tag companies that match ICP criteria

### 24.3 Assign Buying Roles to Contacts
1. Open a Contact record associated with a target account
2. Find the **Buying Role** property → select role (Decision Maker, Champion, etc.)
3. This enables multi-threading visibility: can you see which accounts have only one contact?

### 24.4 View Target Account Dashboard
1. **Sales** → **Target Accounts**
2. Shows: all target accounts, contact coverage (how many contacts per account), engagement score, deal status
3. Accounts with 0–1 contacts = under-penetrated (single-threaded risk)

---

## QUICK REFERENCE: Navigation Paths

| Task | Path |
|------|------|
| Create contact property | Settings → Properties → Contact → Create property |
| Create workflow | Automation → Workflows → Create workflow |
| View active workflows | Automation → Workflows → filter Active |
| Build a report | Reports → Create report |
| View pipeline | Sales → Deals (Board view) |
| Set up forecast | Settings → Objects → Deals → Forecast |
| Create a sequence | Sales → Sequences → Create sequence |
| Create email template | Sales → Templates → New template |
| Manage users | Settings → Users & Teams |
| View duplicates | Contacts → Actions → Manage duplicates |
| Import contacts | Contacts → Import |
| View integrations | Settings → Integrations → Connected apps |
| Create meeting link | Sales → Meetings → Create meeting link |
| Create playbook | Sales → Playbooks → Create playbook |
| Build a list | Contacts → Lists → Create list |
| Set lead score criteria | Settings → Properties → Score property → Manage score criteria |
| View lifecycle stage stats | Reports → Create report → Contacts → group by Lifecycle Stage |
| Add property to record view | Any record → section header pencil icon → Manage properties |
| Make field required on deal stage | Settings → Objects → Deals → Pipelines → Edit stage → Required properties |
