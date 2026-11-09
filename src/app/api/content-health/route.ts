import { NextResponse } from 'next/server';
import { checkRequestToken } from '@/lib/api-auth';
import { contentRepository } from '@/lib/content-repository';
import { resolvePostgresSsl } from '@/lib/postgres-ssl';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

type HealthStatus = 'ok' | 'error' | 'disabled';

const NO_STORE = { 'Cache-Control': 'no-store' };

function resolveSource() {
  const explicitSource = process.env.CONTENT_SOURCE?.toLowerCase();
  const autoDetectedSource = process.env.MONGODB_URI
    ? 'mongodb'
    : process.env.DATABASE_URL || process.env.SUPABASE_DB_URL
      ? 'database'
      : 'json';
  const source = explicitSource || autoDetectedSource;
  return { source, explicitSource: explicitSource || null, autoDetectedSource };
}

function parseBool(value: string | undefined): boolean | undefined {
  if (value == null) return undefined;
  const normalized = value.trim().toLowerCase();
  if (normalized === 'true' || normalized === '1' || normalized === 'yes') return true;
  if (normalized === 'false' || normalized === '0' || normalized === 'no') return false;
  return undefined;
}

function logProbeFailure(probe: string, error: unknown) {
  const name = error instanceof Error ? error.name : typeof error;
  const code =
    error && typeof error === 'object' && 'code' in error
      ? String((error as { code?: unknown }).code)
      : null;
  // Never log connection strings or raw provider errors: they can contain hosts
  // and credentials. Name + code are enough to triage.
  console.error(`[content-health] ${probe} probe failed`, { name, code });
}

async function checkMongo() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    return { status: 'disabled' as HealthStatus, hasMongoUri: false };
  }

  const dbName = process.env.MONGODB_DB_NAME || 'generatepassword';
  const collectionName = process.env.MONGODB_COLLECTION || 'content_guides';
  const timeout = Number.parseInt(process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS || '3000', 10);

  const nodeRequire = eval('require') as NodeRequire;
  const { MongoClient } = nodeRequire('mongodb') as {
    MongoClient: new (
      uri: string,
      options?: {
        serverSelectionTimeoutMS?: number;
        tls?: boolean;
        ssl?: boolean;
        tlsAllowInvalidCertificates?: boolean;
        tlsAllowInvalidHostnames?: boolean;
        tlsInsecure?: boolean;
      },
    ) => {
      connect: () => Promise<void>;
      close: () => Promise<void>;
      db: (name: string) => {
        collection: (name: string) => {
          countDocuments: (query: Record<string, unknown>) => Promise<number>;
        };
      };
    };
  };

  const client = new MongoClient(mongoUri, {
    serverSelectionTimeoutMS: Number.isFinite(timeout) ? timeout : 3000,
    tls: parseBool(process.env.MONGODB_TLS),
    ssl: parseBool(process.env.MONGODB_SSL),
    tlsAllowInvalidCertificates: parseBool(process.env.MONGODB_TLS_ALLOW_INVALID_CERTIFICATES),
    tlsAllowInvalidHostnames: parseBool(process.env.MONGODB_TLS_ALLOW_INVALID_HOSTNAMES),
    tlsInsecure: parseBool(process.env.MONGODB_TLS_INSECURE),
  });

  try {
    await client.connect();
    const collection = client.db(dbName).collection(collectionName);
    await collection.countDocuments({});
    return { status: 'ok' as HealthStatus, hasMongoUri: true };
  } catch (error) {
    logProbeFailure('mongodb', error);
    return { status: 'error' as HealthStatus, hasMongoUri: true };
  } finally {
    try {
      await client.close();
    } catch {
      // Ignore close errors in the diagnostics endpoint.
    }
  }
}

async function checkPostgres() {
  const databaseUrl = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;
  if (!databaseUrl) {
    return { status: 'disabled' as HealthStatus, hasDatabaseUrl: false };
  }

  let pool: { query: (sql: string) => Promise<unknown>; end: () => Promise<void> } | null = null;

  try {
    const nodeRequire = eval('require') as NodeRequire;
    const { Pool } = nodeRequire('pg') as {
      Pool: new (options: {
        connectionString: string;
        ssl?: { rejectUnauthorized: boolean; ca?: string };
      }) => { query: (sql: string) => Promise<unknown>; end: () => Promise<void> };
    };

    pool = new Pool({
      connectionString: databaseUrl,
      ssl: resolvePostgresSsl(databaseUrl),
    });
    await pool.query('select 1');
    return { status: 'ok' as HealthStatus, hasDatabaseUrl: true };
  } catch (error) {
    logProbeFailure('postgres', error);
    return { status: 'error' as HealthStatus, hasDatabaseUrl: true };
  } finally {
    if (pool) {
      try {
        await pool.end();
      } catch {
        // Ignore close errors in the diagnostics endpoint.
      }
    }
  }
}

function detectJsonFallback(guide: Awaited<ReturnType<typeof contentRepository.getGuide>>) {
  if (!guide) return false;

  const shellText = 'This guide is a prepared content shell';
  const hasShell = guide.sections.some((section) =>
    section.paragraphs.some((paragraph) => paragraph.includes(shellText)),
  );
  return hasShell;
}

export async function GET(request: Request) {
  const auth = checkRequestToken(request, process.env.CONTENT_HEALTH_TOKEN);
  if (auth === 'not-configured') {
    return NextResponse.json(
      { ok: false, error: 'CONTENT_HEALTH_TOKEN is not configured' },
      { status: 503, headers: NO_STORE },
    );
  }
  if (auth !== 'authorized') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: NO_STORE });
  }

  try {
    const source = resolveSource();
    const probeLocale = process.env.CONTENT_HEALTH_PROBE_LOCALE || 'ua';
    const probeSlug = process.env.CONTENT_HEALTH_PROBE_SLUG || 'how-to-create-strong-passwords';

    const [mongo, postgres, guide] = await Promise.all([
      checkMongo(),
      checkPostgres(),
      contentRepository.getGuide(probeSlug, probeLocale),
    ]);

    return NextResponse.json(
      {
        ok: true,
        timestamp: new Date().toISOString(),
        source,
        probe: {
          slug: probeSlug,
          locale: probeLocale,
          returnedLocale: guide?.locale || null,
          title: guide?.title || null,
          jsonShellFallbackDetected: detectJsonFallback(guide),
        },
        // Only coarse status is exposed. Hosts, database/collection names,
        // document counts and raw provider errors stay server-side.
        mongo: { status: mongo.status, configured: mongo.hasMongoUri },
        postgres: { status: postgres.status, configured: postgres.hasDatabaseUrl },
        envSummary: {
          hasContentSource: Boolean(process.env.CONTENT_SOURCE),
          hasMongoUri: Boolean(process.env.MONGODB_URI),
          hasDatabaseUrl: Boolean(process.env.DATABASE_URL || process.env.SUPABASE_DB_URL),
        },
      },
      { status: 200, headers: NO_STORE },
    );
  } catch (error) {
    logProbeFailure('content', error);
    return NextResponse.json(
      {
        ok: false,
        timestamp: new Date().toISOString(),
        error: 'Content health probe failed',
      },
      { status: 500, headers: NO_STORE },
    );
  }
}
