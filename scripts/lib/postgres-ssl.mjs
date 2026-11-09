import fs from 'node:fs';

function readConfiguredCa() {
  const inline = process.env.DATABASE_SSL_CA;
  if (inline?.trim()) {
    return inline.replace(/\\n/g, '\n');
  }

  const base64 = process.env.DATABASE_SSL_CA_BASE64;
  if (base64?.trim()) {
    return Buffer.from(base64, 'base64').toString('utf8');
  }

  const caPath = process.env.DATABASE_SSL_CA_PATH;
  if (caPath?.trim()) {
    return fs.readFileSync(caPath, 'utf8');
  }

  return undefined;
}

/**
 * TLS options for `pg` in local maintenance scripts.
 * Certificate verification is always enabled.
 */
export function resolvePostgresSsl(connectionString) {
  const useSsl = process.env.DATABASE_SSL
    ? process.env.DATABASE_SSL === 'true'
    : connectionString.includes('supabase.co');

  if (!useSsl) return undefined;

  const ca = readConfiguredCa();
  return ca ? { rejectUnauthorized: true, ca } : { rejectUnauthorized: true };
}
