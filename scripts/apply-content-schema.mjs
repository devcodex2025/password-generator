import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import pg from 'pg';

const { Pool } = pg;

function getDatabaseUrl() {
  return process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;
}

function shouldUseSsl(connectionString) {
  if (process.env.DATABASE_SSL) {
    return process.env.DATABASE_SSL === 'true';
  }
  return connectionString.includes('supabase.co');
}

async function main() {
  const schemaPath = process.argv[2] || 'db/content_schema.sql';
  const databaseUrl = getDatabaseUrl();

  if (!databaseUrl) {
    throw new Error('DATABASE_URL or SUPABASE_DB_URL is not set.');
  }

  const absoluteSchemaPath = path.resolve(process.cwd(), schemaPath);
  const schemaSql = fs.readFileSync(absoluteSchemaPath, 'utf8');

  if (!schemaSql.trim()) {
    throw new Error(`Schema file is empty: ${absoluteSchemaPath}`);
  }

  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: shouldUseSsl(databaseUrl) ? { rejectUnauthorized: false } : undefined,
  });

  const client = await pool.connect();
  try {
    await client.query(schemaSql);
    console.log(`Applied schema from ${schemaPath}`);
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
