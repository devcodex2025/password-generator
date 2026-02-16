import { NextResponse } from 'next/server';
import { contentRepository } from '@/lib/content-repository';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

type HealthStatus = 'ok' | 'error' | 'disabled';

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

function safeMongoHost(uri: string | undefined): string | null {
  if (!uri) return null;
  try {
    const parsed = new URL(uri);
    return parsed.host || null;
  } catch {
    return null;
  }
}

function parseBool(value: string | null): boolean | null {
  if (value == null) return null;
  const normalized = value.trim().toLowerCase();
  if (normalized === 'true' || normalized === '1' || normalized === 'yes') return true;
  if (normalized === 'false' || normalized === '0' || normalized === 'no') return false;
  return null;
}

function getMongoTlsDiagnostics(mongoUri: string | undefined) {
  const base = {
    nodeVersion: process.version,
    opensslVersion: process.versions?.openssl || null,
    env: {
      NODE_TLS_REJECT_UNAUTHORIZED: process.env.NODE_TLS_REJECT_UNAUTHORIZED || null,
      MONGODB_SERVER_SELECTION_TIMEOUT_MS: process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS || null,
      MONGODB_TLS: process.env.MONGODB_TLS || null,
      MONGODB_SSL: process.env.MONGODB_SSL || null,
      MONGODB_TLS_ALLOW_INVALID_CERTIFICATES: process.env.MONGODB_TLS_ALLOW_INVALID_CERTIFICATES || null,
      MONGODB_TLS_ALLOW_INVALID_HOSTNAMES: process.env.MONGODB_TLS_ALLOW_INVALID_HOSTNAMES || null,
      MONGODB_TLS_INSECURE: process.env.MONGODB_TLS_INSECURE || null,
    },
  };

  if (!mongoUri) {
    return { ...base, uriParsed: false };
  }

  try {
    const url = new URL(mongoUri);
    return {
      ...base,
      uriParsed: true,
      uriScheme: url.protocol.replace(':', ''),
      host: url.host || null,
      query: {
        tls: parseBool(url.searchParams.get('tls')),
        ssl: parseBool(url.searchParams.get('ssl')),
        tlsAllowInvalidCertificates: parseBool(url.searchParams.get('tlsAllowInvalidCertificates')),
        tlsAllowInvalidHostnames: parseBool(url.searchParams.get('tlsAllowInvalidHostnames')),
        tlsInsecure: parseBool(url.searchParams.get('tlsInsecure')),
        authMechanism: url.searchParams.get('authMechanism'),
        retryWrites: parseBool(url.searchParams.get('retryWrites')),
      },
    };
  } catch {
    return {
      ...base,
      uriParsed: false,
      uriScheme: mongoUri.startsWith('mongodb+srv://')
        ? 'mongodb+srv'
        : mongoUri.startsWith('mongodb://')
          ? 'mongodb'
          : 'unknown',
      host: safeMongoHost(mongoUri),
    };
  }
}

function formatMongoError(error: unknown) {
  if (!error) return null;
  if (error instanceof Error) {
    const e = error as Error & { code?: string | number; cause?: unknown };
    const cause = e.cause instanceof Error
      ? { name: e.cause.name, message: e.cause.message }
      : e.cause
        ? String(e.cause)
        : null;
    return {
      name: e.name,
      code: e.code ?? null,
      message: e.message,
      cause,
    };
  }
  return { name: 'UnknownError', code: null, message: String(error), cause: null };
}

async function checkMongo() {
  const mongoUri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME || 'generatepassword';
  const collectionName = process.env.MONGODB_COLLECTION || 'content_guides';
  const timeout = Number.parseInt(process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS || '3000', 10);
  const tlsDiagnostics = getMongoTlsDiagnostics(mongoUri);

  if (!mongoUri) {
    return {
      status: 'disabled' as HealthStatus,
      hasMongoUri: false,
      host: null,
      dbName,
      collectionName,
      tlsDiagnostics,
    };
  }

  const nodeRequire = eval('require') as NodeRequire;
  const { MongoClient } = nodeRequire('mongodb') as {
    MongoClient: new (uri: string, options?: { serverSelectionTimeoutMS?: number }) => {
      connect: () => Promise<void>;
      close: () => Promise<void>;
      db: (name: string) => {
        collection: (name: string) => {
          countDocuments: (query: Record<string, unknown>) => Promise<number>;
          aggregate: <T>(pipeline: Array<Record<string, unknown>>) => { toArray: () => Promise<T[]> };
        };
      };
    };
  };

  const client = new MongoClient(mongoUri, {
    serverSelectionTimeoutMS: Number.isFinite(timeout) ? timeout : 3000,
  });

  try {
    await client.connect();
    const collection = client.db(dbName).collection(collectionName);
    const total = await collection.countDocuments({});
    const localeBuckets = await collection
      .aggregate<{ _id: string; n: number }>([
        { $group: { _id: '$locale', n: { $sum: 1 } } },
        { $sort: { n: -1 } },
      ])
      .toArray();

    return {
      status: 'ok' as HealthStatus,
      hasMongoUri: true,
      host: safeMongoHost(mongoUri),
      dbName,
      collectionName,
      totalDocuments: total,
      locales: localeBuckets,
      tlsDiagnostics,
    };
  } catch (error) {
    const formatted = formatMongoError(error);
    return {
      status: 'error' as HealthStatus,
      hasMongoUri: true,
      host: safeMongoHost(mongoUri),
      dbName,
      collectionName,
      error: formatted?.message || String(error),
      errorDetails: formatted,
      tlsDiagnostics,
    };
  } finally {
    try {
      await client.close();
    } catch {
      // Ignore close errors in diagnostics endpoint.
    }
  }
}

async function checkPostgres() {
  const databaseUrl = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;
  if (!databaseUrl) {
    return { status: 'disabled' as HealthStatus, hasDatabaseUrl: false };
  }

  try {
    const nodeRequire = eval('require') as NodeRequire;
    const { Pool } = nodeRequire('pg') as {
      Pool: new (options: { connectionString: string; ssl?: { rejectUnauthorized: false } }) => {
        query: (sql: string) => Promise<{ rows: Array<{ now: string }> }>;
        end: () => Promise<void>;
      };
    };

    const useSsl = process.env.DATABASE_SSL
      ? process.env.DATABASE_SSL === 'true'
      : databaseUrl.includes('supabase.co');

    const pool = new Pool({
      connectionString: databaseUrl,
      ssl: useSsl ? { rejectUnauthorized: false } : undefined,
    });
    const ping = await pool.query('select now()::text as now');
    await pool.end();

    return {
      status: 'ok' as HealthStatus,
      hasDatabaseUrl: true,
      serverTime: ping.rows[0]?.now || null,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      status: 'error' as HealthStatus,
      hasDatabaseUrl: true,
      error: message,
    };
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

export async function GET() {
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
        mongo,
        postgres,
        envSummary: {
          hasContentSource: Boolean(process.env.CONTENT_SOURCE),
          hasMongoUri: Boolean(process.env.MONGODB_URI),
          hasDatabaseUrl: Boolean(process.env.DATABASE_URL || process.env.SUPABASE_DB_URL),
          mongoDbName: process.env.MONGODB_DB_NAME || 'generatepassword',
          mongoCollection: process.env.MONGODB_COLLECTION || 'content_guides',
        },
      },
      { status: 200 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        ok: false,
        timestamp: new Date().toISOString(),
        fatalError: message,
      },
      { status: 200 },
    );
  }
}
