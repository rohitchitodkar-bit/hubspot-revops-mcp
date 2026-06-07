/**
 * HubSpot REST API wrapper — read-only.
 * Uses the HubSpot private app token from HUBSPOT_ACCESS_TOKEN env var.
 */

const BASE = 'https://api.hubapi.com';

// ─── Core fetch ─────────────────────────────────────────────────────────────

async function hs<T = unknown>(
  path: string,
  options: RequestInit & { query?: Record<string, string | number> } = {}
): Promise<T> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) throw new Error('HUBSPOT_ACCESS_TOKEN environment variable is not set.');

  const { query, ...fetchOptions } = options;
  const url = new URL(`${BASE}${path}`);
  if (query) {
    Object.entries(query).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  }

  const res = await fetch(url.toString(), {
    ...fetchOptions,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(fetchOptions.headers ?? {}),
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`HubSpot API ${res.status} on ${path}: ${body.slice(0, 300)}`);
  }

  return res.json() as Promise<T>;
}

async function hsPost<T = unknown>(path: string, body: unknown): Promise<T> {
  return hs<T>(path, { method: 'POST', body: JSON.stringify(body) });
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface HsProperty {
  name: string;
  label: string;
  type: string;
  fieldType: string;
  groupName: string;
  description: string;
  createdUserId?: string;
  updatedUserId?: string;
  hidden: boolean;
  formField: boolean;
  options?: { label: string; value: string }[];
}

export interface HsPipelineStage {
  id: string;
  label: string;
  displayOrder: number;
  metadata: { probability?: string; isClosed?: string };
}

export interface HsPipeline {
  id: string;
  label: string;
  displayOrder: number;
  stages: HsPipelineStage[];
}

export interface HsDeal {
  id: string;
  properties: Record<string, string | null>;
}

export interface HsContact {
  id: string;
  properties: Record<string, string | null>;
}

export interface HsOwner {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userId?: number;
  teams?: { id: string; name: string }[];
}

export interface HsWorkflow {
  id: string;
  name: string;
  type: string;
  enabled: boolean;
  insertedAt: number;
  updatedAt: number;
  enrollmentCriteria?: unknown;
}

export interface SearchResponse<T> {
  total: number;
  results: T[];
  paging?: { next?: { after: string } };
}

// ─── Account Overview ────────────────────────────────────────────────────────

export async function getObjectCount(
  objectType: 'contacts' | 'companies' | 'deals'
): Promise<number> {
  const data = await hs<SearchResponse<unknown>>(
    `/crm/v3/objects/${objectType}/search`,
    {
      method: 'POST',
      body: JSON.stringify({ filterGroups: [], limit: 1, properties: [] }),
    }
  );
  return data.total;
}

export async function getPipelines(): Promise<HsPipeline[]> {
  const data = await hs<{ results: HsPipeline[] }>('/crm/v3/pipelines/deals');
  return data.results;
}

export async function getOwners(): Promise<HsOwner[]> {
  const data = await hs<{ results: HsOwner[] }>('/crm/v3/owners/', {
    query: { limit: 100 },
  });
  return data.results;
}

// ─── Properties ──────────────────────────────────────────────────────────────

export async function getProperties(
  objectType: 'contacts' | 'companies' | 'deals'
): Promise<HsProperty[]> {
  const data = await hs<{ results: HsProperty[] }>(
    `/crm/v3/properties/${objectType}`
  );
  return data.results;
}

// ─── Deals ───────────────────────────────────────────────────────────────────

const DEAL_PROPS = [
  'dealname',
  'amount',
  'closedate',
  'dealstage',
  'pipeline',
  'hubspot_owner_id',
  'hs_lastmodifieddate',
  'hs_lastactivitydate',
  'createdate',
  'hs_deal_stage_probability',
];

export async function searchDeals(
  filterGroups: unknown[],
  extraProps: string[] = [],
  limit = 100
): Promise<SearchResponse<HsDeal>> {
  return hsPost<SearchResponse<HsDeal>>('/crm/v3/objects/deals/search', {
    filterGroups,
    properties: [...new Set([...DEAL_PROPS, ...extraProps])],
    limit,
    sorts: [{ propertyName: 'hs_lastmodifieddate', direction: 'DESCENDING' }],
  });
}

export async function getOpenDeals(limit = 200): Promise<HsDeal[]> {
  const data = await searchDeals(
    [
      {
        filters: [
          {
            propertyName: 'hs_is_closed',
            operator: 'EQ',
            value: 'false',
          },
        ],
      },
    ],
    [],
    limit
  );
  return data.results;
}

export async function getClosedDeals(daysBack = 90): Promise<HsDeal[]> {
  const since = Date.now() - daysBack * 24 * 60 * 60 * 1000;
  const data = await searchDeals(
    [
      {
        filters: [
          {
            propertyName: 'hs_is_closed_won',
            operator: 'EQ',
            value: 'true',
          },
          {
            propertyName: 'closedate',
            operator: 'GTE',
            value: String(since),
          },
        ],
      },
    ],
    [],
    200
  );
  return data.results;
}

export async function getAtRiskDeals(): Promise<HsDeal[]> {
  const cutoff = Date.now() - 21 * 24 * 60 * 60 * 1000;
  const now = Date.now();

  // Two groups: stale activity OR past close date
  const data = await searchDeals(
    [
      {
        filters: [
          { propertyName: 'hs_is_closed', operator: 'EQ', value: 'false' },
          {
            propertyName: 'hs_lastactivitydate',
            operator: 'LTE',
            value: String(cutoff),
          },
        ],
      },
      {
        filters: [
          { propertyName: 'hs_is_closed', operator: 'EQ', value: 'false' },
          {
            propertyName: 'closedate',
            operator: 'LTE',
            value: String(now),
          },
        ],
      },
    ],
    [],
    100
  );
  return data.results;
}

// ─── Contacts ────────────────────────────────────────────────────────────────

const CONTACT_PROPS = [
  'firstname',
  'lastname',
  'email',
  'company',
  'jobtitle',
  'lifecyclestage',
  'lead_status',
  'hubspot_owner_id',
  'hs_lead_status',
  'createdate',
  'lastmodifieddate',
];

export async function searchContacts(
  filterGroups: unknown[],
  limit = 50
): Promise<SearchResponse<HsContact>> {
  return hsPost<SearchResponse<HsContact>>('/crm/v3/objects/contacts/search', {
    filterGroups,
    properties: CONTACT_PROPS,
    limit,
  });
}

export async function getContactCountByLifecycleStage(): Promise<
  Record<string, number>
> {
  const stages = [
    'subscriber',
    'lead',
    'marketingqualifiedlead',
    'salesqualifiedlead',
    'opportunity',
    'customer',
    'evangelist',
    'other',
  ];

  const counts = await Promise.all(
    stages.map(async (stage) => {
      try {
        const r = await hsPost<SearchResponse<HsContact>>(
          '/crm/v3/objects/contacts/search',
          {
            filterGroups: [
              {
                filters: [
                  {
                    propertyName: 'lifecyclestage',
                    operator: 'EQ',
                    value: stage,
                  },
                ],
              },
            ],
            properties: [],
            limit: 1,
          }
        );
        return [stage, r.total] as [string, number];
      } catch {
        return [stage, 0] as [string, number];
      }
    })
  );

  return Object.fromEntries(counts);
}

// ─── Workflows ───────────────────────────────────────────────────────────────

export async function getWorkflows(): Promise<HsWorkflow[]> {
  try {
    const data = await hs<{ results: HsWorkflow[] }>('/automation/v4/flows', {
      query: { limit: 100 },
    });
    return data.results ?? [];
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes('403') || msg.includes('401')) {
      throw new Error(
        'Workflows API requires the "automation" scope on your Private App, and Sales Hub Professional or higher.'
      );
    }
    throw err;
  }
}
