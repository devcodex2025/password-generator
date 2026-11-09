import { readFileSync } from 'node:fs';

export type PostgresSslOptions = {
  rejectUnauthorized: boolean;
  ca?: string;
};

function readConfiguredCa(): string | undefined {
  const inline = process.env.DATABASE_SSL_CA;
  if (inline?.trim()) {
    // Vercel stores multi-line values with literal \n escapes in some UIs.
    return inline.replace(/\\n/g, '\n');
  }

  const base64 = process.env.DATABASE_SSL_CA_BASE64;
  if (base64?.trim()) {
    return Buffer.from(base64, 'base64').toString('utf8');
  }

  const caPath = process.env.DATABASE_SSL_CA_PATH;
  if (caPath?.trim()) {
    return readFileSync(caPath, 'utf8');
  }

  return undefined;
}

/**
 * TLS options for `pg`.
 *
 * Host detection keeps Supabase working without extra configuration, and
 * `DATABASE_SSL_CA` / `DATABASE_SSL_CA_BASE64` / `DATABASE_SSL_CA_PATH` let
 * deployments supply a provider CA explicitly. Certificate verification is
 * always enabled; there is no insecure fallback.
 */
export function resolvePostgresSsl(connectionString: string): PostgresSslOptions | undefined {
  const useSsl = process.env.DATABASE_SSL
    ? process.env.DATABASE_SSL === 'true'
    : connectionString.includes('supabase.co');

  if (!useSsl) return undefined;

  const ca = readConfiguredCa();
  return ca ? { rejectUnauthorized: true, ca } : { rejectUnauthorized: true };
}
