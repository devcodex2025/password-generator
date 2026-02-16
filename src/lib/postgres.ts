type QueryResult<T = unknown> = { rows: T[] };
type PgPool = {
  query: <T = unknown>(text: string, params?: unknown[]) => Promise<QueryResult<T>>;
};

let pool: PgPool | null = null;

export function getPostgresPool(): PgPool {
  if (pool) {
    return pool;
  }

  const connectionString = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;
  if (!connectionString) {
    throw new Error(
      'DATABASE_URL or SUPABASE_DB_URL is not set. Set one of them to use CONTENT_SOURCE=database.',
    );
  }

  const useSsl = process.env.DATABASE_SSL
    ? process.env.DATABASE_SSL === 'true'
    : connectionString.includes('supabase.co');

  // Runtime load avoids Turbopack symlink panic on Windows in this project setup.
  const nodeRequire = eval('require') as NodeRequire;
  const { Pool } = nodeRequire('pg') as {
    Pool: new (options: { connectionString: string; ssl?: { rejectUnauthorized: false } }) => PgPool;
  };

  pool = new Pool({
    connectionString,
    ssl: useSsl ? { rejectUnauthorized: false } : undefined,
  });

  return pool;
}
