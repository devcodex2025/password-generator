import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

type RouteHandler = (request: Request) => Promise<Response>;

const ENV_KEYS = [
  'CONTENT_HEALTH_TOKEN',
  'CONTENT_SOURCE',
  'MONGODB_URI',
  'DATABASE_URL',
  'SUPABASE_DB_URL',
] as const;

const originalEnv = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]));

let contentHealthGet: RouteHandler;
let syncContentGet: RouteHandler;
let syncContentPost: RouteHandler;

beforeAll(async () => {
  // Keep the probe deterministic and offline: JSON content, no database.
  delete process.env.CONTENT_SOURCE;
  delete process.env.MONGODB_URI;
  delete process.env.DATABASE_URL;
  delete process.env.SUPABASE_DB_URL;

  ({ GET: contentHealthGet } = await import('./content-health/route'));
  ({ GET: syncContentGet, POST: syncContentPost } = await import('./sync-content/route'));
});

afterEach(() => {
  for (const key of ENV_KEYS) {
    const value = originalEnv[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

afterAll(() => {
  for (const key of ENV_KEYS) {
    const value = originalEnv[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

describe('internal API routes fail closed', () => {
  it('returns 503 from content-health when the token is not configured', async () => {
    delete process.env.CONTENT_HEALTH_TOKEN;

    const response = await contentHealthGet(new Request('https://example.test/api/content-health'));
    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toMatchObject({
      ok: false,
      error: 'CONTENT_HEALTH_TOKEN is not configured',
    });
  });

  it('returns 503 from sync-content GET when the token is not configured', async () => {
    delete process.env.CONTENT_HEALTH_TOKEN;

    const response = await syncContentGet(new Request('https://example.test/api/sync-content'));
    expect(response.status).toBe(503);
  });

  it('returns 503 from sync-content POST when the token is not configured', async () => {
    delete process.env.CONTENT_HEALTH_TOKEN;

    const response = await syncContentPost(
      new Request('https://example.test/api/sync-content', { method: 'POST' }),
    );
    expect(response.status).toBe(503);
  });

  it('returns 401 when the token is configured but missing', async () => {
    process.env.CONTENT_HEALTH_TOKEN = 'test-token';

    const response = await contentHealthGet(new Request('https://example.test/api/content-health'));
    expect(response.status).toBe(401);
  });

  it('returns 401 when the token is supplied in the query string', async () => {
    process.env.CONTENT_HEALTH_TOKEN = 'test-token';

    const response = await contentHealthGet(
      new Request('https://example.test/api/content-health?token=test-token'),
    );
    expect(response.status).toBe(401);
  });

  it('returns 401 from sync-content when the token is supplied in the query string', async () => {
    process.env.CONTENT_HEALTH_TOKEN = 'test-token';

    const response = await syncContentGet(
      new Request('https://example.test/api/sync-content?token=test-token'),
    );
    expect(response.status).toBe(401);
  });
});

describe('content-health response', () => {
  it('accepts a header token and does not expose database topology or error text', async () => {
    process.env.CONTENT_HEALTH_TOKEN = 'test-token';

    const response = await contentHealthGet(
      new Request('https://example.test/api/content-health', {
        headers: { authorization: 'Bearer test-token' },
      }),
    );

    expect(response.status).toBe(200);
    const body = await response.json();

    expect(body.ok).toBe(true);
    expect(body.mongo).toEqual({ status: 'disabled', configured: false });
    expect(body.postgres).toEqual({ status: 'disabled', configured: false });
    expect(body.envSummary).toEqual({
      hasContentSource: false,
      hasMongoUri: false,
      hasDatabaseUrl: false,
    });

    const serialized = JSON.stringify(body);
    for (const forbidden of [
      'host',
      'dbName',
      'databaseName',
      'collectionName',
      'totalDocuments',
      'errorDetails',
      'tlsDiagnostics',
      'fatalError',
    ]) {
      expect(serialized).not.toContain(forbidden);
    }
  });
});
