/**
 * Minimal Google service-account auth for the reporting scripts.
 * Zero dependencies: signs a JWT with the key and exchanges it for an access token.
 */
import fs from 'node:fs';
import crypto from 'node:crypto';

const b64url = (data) =>
  Buffer.from(data)
    .toString('base64')
    .replace(/=+$/, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

export function loadServiceAccount(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`credential file not found: ${filePath}`);
  }
  const sa = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (sa.type !== 'service_account') {
    throw new Error(
      `credential type is "${sa.type}", expected "service_account". ` +
        'OAuth authorized_user tokens expire/revoke — use a service-account key.'
    );
  }
  return sa;
}

export async function getAccessToken(sa, scope) {
  const now = Math.floor(Date.now() / 1000);
  const tokenUri = sa.token_uri || 'https://oauth2.googleapis.com/token';
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = b64url(
    JSON.stringify({ iss: sa.client_email, scope, aud: tokenUri, iat: now, exp: now + 3600 })
  );
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(`${header}.${claims}`);
  const assertion = `${header}.${claims}.${b64url(signer.sign(sa.private_key))}`;

  const res = await fetch(tokenUri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) {
    throw new Error(`token exchange failed: HTTP ${res.status} ${(await res.text()).slice(0, 200)}`);
  }
  return (await res.json()).access_token;
}

export async function apiJson(token, url, body) {
  const res = await fetch(url, {
    method: body ? 'POST' : 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(30000),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`HTTP ${res.status} ${text.slice(0, 400)}`);
  return text ? JSON.parse(text) : {};
}

/** Resolves a GA4 property ID from GA4_PROPERTY or by matching the property name. */
export async function resolvePropertyId(token, hint = 'generatepasswordto') {
  const fromEnv = (process.env.GA4_PROPERTY || '').replace(/^properties\//, '');
  if (fromEnv) return fromEnv;

  const { accountSummaries = [] } = await apiJson(
    token,
    'https://analyticsadmin.googleapis.com/v1beta/accountSummaries?pageSize=200'
  );
  const properties = accountSummaries.flatMap((a) => a.propertySummaries || []);
  const chosen =
    properties.find((p) => new RegExp(hint, 'i').test(p.displayName || '')) || properties[0];
  if (!chosen) throw new Error('no GA4 properties visible to this service account');
  return chosen.property.replace('properties/', '');
}
