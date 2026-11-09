import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import pg from 'pg';
import { resolvePostgresSsl } from './lib/postgres-ssl.mjs';

const { Pool } = pg;

function getDatabaseUrl() {
  return process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;
}

async function main() {
  const schemaPath = process.argv[2] || 'db/content_schema.sql';
  const databaseUrl = getDatabaseUrl();

  if (!databaseUrl) {
    throw new Error('DATABASE_URL or SUPABASE_DB_URL is not set.');
  }

  const absoluteSchemaPath = path.resolve(process.cwd(), schemaPath);
  const projectRoot = path.resolve(process.cwd());
  if (!absoluteSchemaPath.startsWith(projectRoot + path.sep) && absoluteSchemaPath !== projectRoot) {
    throw new Error(`Schema path must be inside the project directory: ${schemaPath}`);
  }
  const schemaSql = fs.readFileSync(absoluteSchemaPath, 'utf8');

  if (!schemaSql.trim()) {
    throw new Error(`Schema file is empty: ${absoluteSchemaPath}`);
  }

  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: resolvePostgresSsl(databaseUrl),
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
