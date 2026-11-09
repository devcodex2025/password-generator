import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { resolvePostgresSsl } from './postgres-ssl';

const KEYS = [
  'DATABASE_SSL',
  'DATABASE_SSL_CA',
  'DATABASE_SSL_CA_BASE64',
  'DATABASE_SSL_CA_PATH',
] as const;

const originalEnv = Object.fromEntries(KEYS.map((key) => [key, process.env[key]]));

afterEach(() => {
  for (const key of KEYS) {
    const value = originalEnv[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

describe('resolvePostgresSsl', () => {
  it('disables TLS when not requested and the host is not Supabase', () => {
    delete process.env.DATABASE_SSL;
    expect(resolvePostgresSsl('postgresql://localhost:5432/app')).toBeUndefined();
  });

  it('enables verified TLS automatically for Supabase hosts', () => {
    delete process.env.DATABASE_SSL;
    expect(resolvePostgresSsl('postgresql://user:pass@db.example.supabase.co:5432/postgres')).toEqual({
      rejectUnauthorized: true,
    });
  });

  it('never disables certificate verification when TLS is forced', () => {
    process.env.DATABASE_SSL = 'true';
    expect(resolvePostgresSsl('postgresql://localhost:5432/app')).toEqual({
      rejectUnauthorized: true,
    });
  });

  it('passes an inline provider CA with escaped newlines', () => {
    process.env.DATABASE_SSL = 'true';
    process.env.DATABASE_SSL_CA = String.raw`-----BEGIN CERT-----\nline\n-----END CERT-----`;

    expect(resolvePostgresSsl('postgresql://localhost:5432/app')).toEqual({
      rejectUnauthorized: true,
      ca: '-----BEGIN CERT-----\nline\n-----END CERT-----',
    });
  });

  it('decodes a base64 provider CA', () => {
    process.env.DATABASE_SSL = 'true';
    process.env.DATABASE_SSL_CA_BASE64 = Buffer.from('provider-ca').toString('base64');

    expect(resolvePostgresSsl('postgresql://localhost:5432/app')).toEqual({
      rejectUnauthorized: true,
      ca: 'provider-ca',
    });
  });

  it('reads a provider CA from a file path', () => {
    const directory = mkdtempSync(join(tmpdir(), 'pgssl-'));
    const caPath = join(directory, 'ca.pem');
    writeFileSync(caPath, 'file-ca', 'utf8');

    try {
      process.env.DATABASE_SSL = 'true';
      process.env.DATABASE_SSL_CA_PATH = caPath;

      expect(resolvePostgresSsl('postgresql://localhost:5432/app')).toEqual({
        rejectUnauthorized: true,
        ca: 'file-ca',
      });
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });
});
