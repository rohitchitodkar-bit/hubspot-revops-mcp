/**
 * HubSpot MCP Server — JSON-RPC 2.0 endpoint.
 * Implements the Model Context Protocol over HTTP (stateless, Vercel-compatible).
 * All HubSpot operations are read-only.
 */

import { NextRequest, NextResponse } from 'next/server';
import { TOOLS, callTool } from '@/lib/tools';

export const runtime = 'nodejs';
export const maxDuration = 60;

// ─── CORS headers ─────────────────────────────────────────────────────────────

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

// ─── GET — health check ────────────────────────────────────────────────────────

export async function GET() {
  return NextResponse.json(
    {
      name: 'hubspot-revops-mcp',
      version: '1.0.0',
      description: 'HubSpot diagnostic and RevOps advisory MCP server (read-only)',
      tools: TOOLS.length,
    },
    { headers: CORS_HEADERS }
  );
}

// ─── JSON-RPC types ───────────────────────────────────────────────────────────

interface JsonRpcRequest {
  jsonrpc: '2.0';
  id?: string | number | null;
  method: string;
  params?: unknown;
}

interface JsonRpcResponse {
  jsonrpc: '2.0';
  id: string | number | null;
  result?: unknown;
  error?: { code: number; message: string; data?: unknown };
}

function ok(id: string | number | null, result: unknown): JsonRpcResponse {
  return { jsonrpc: '2.0', id, result };
}

function err(
  id: string | number | null,
  code: number,
  message: string,
  data?: unknown
): JsonRpcResponse {
  return { jsonrpc: '2.0', id, error: { code, message, data } };
}

// ─── Method handlers ──────────────────────────────────────────────────────────

function handleInitialize(id: string | number | null): JsonRpcResponse {
  return ok(id, {
    protocolVersion: '2024-11-05',
    capabilities: {
      tools: {},
    },
    serverInfo: {
      name: 'hubspot-revops-mcp',
      version: '1.0.0',
    },
  });
}

function handleToolsList(id: string | number | null): JsonRpcResponse {
  return ok(id, { tools: TOOLS });
}

async function handleToolsCall(
  id: string | number | null,
  params: unknown
): Promise<JsonRpcResponse> {
  const p = params as Record<string, unknown>;
  const name = p['name'];
  const args = (p['arguments'] ?? {}) as Record<string, unknown>;

  if (typeof name !== 'string') {
    return err(id, -32602, 'Invalid params: "name" must be a string');
  }

  const result = await callTool(name, args);
  return ok(id, result);
}

// ─── Main POST handler ────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      err(null, -32700, 'Parse error: invalid JSON'),
      { status: 400, headers: CORS_HEADERS }
    );
  }

  // Support both single requests and batches
  const requests = Array.isArray(body) ? body : [body];
  const responses: JsonRpcResponse[] = [];

  for (const item of requests) {
    const rpc = item as JsonRpcRequest;
    const id = rpc.id ?? null;

    if (!rpc.method) {
      responses.push(err(id, -32600, 'Invalid Request: missing method'));
      continue;
    }

    try {
      switch (rpc.method) {
        case 'initialize':
          responses.push(handleInitialize(id));
          break;

        case 'notifications/initialized':
          // Notification — no response required; skip silently
          break;

        case 'tools/list':
          responses.push(handleToolsList(id));
          break;

        case 'tools/call':
          responses.push(await handleToolsCall(id, rpc.params));
          break;

        default:
          // Only return error for requests (have id), not notifications
          if (id !== null && id !== undefined) {
            responses.push(err(id, -32601, `Method not found: ${rpc.method}`));
          }
      }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      responses.push(err(id, -32603, `Internal error: ${message}`));
    }
  }

  // Return single object for single request, array for batch
  const responseBody = Array.isArray(body) ? responses : responses[0];

  // If all items were notifications there may be nothing to return
  if (!responseBody) {
    return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
  }

  return NextResponse.json(responseBody, { headers: CORS_HEADERS });
}
