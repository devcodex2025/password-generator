import { createLongplay } from '@tinkerlandai/longplay-sdk';

export class BillingAccessError extends Error {
  constructor(status, code, message) { super(message); this.status = status; this.code = code; }
}

/** Billing facts only: this is not customer-account authentication or permission to open a vault. */
export async function readSubscriptionAccess(authorization, env = process.env, createClient = createLongplay) {
  if (!env.LONGPLAY_ACCESS_FEATURE_ID) throw new BillingAccessError(404, 'billing_disabled', 'Billing is not enabled.');
  const token = /^Bearer (gg_ct_[A-Za-z0-9_-]{32,128})$/.exec(authorization || '')?.[1];
  // Content-administration tokens and Server Keys are not customer credentials.
  if (!token) throw new BillingAccessError(401, 'customer_session_required', 'A customer billing session is required.');
  let client;
  try {
    if (!env.LONGPLAY_BASE_URL || !env.LONGPLAY_APP_ID || !['sandbox', 'live'].includes(env.LONGPLAY_ENVIRONMENT)) throw new Error('Incomplete billing config');
    client = createClient({ baseUrl: env.LONGPLAY_BASE_URL, scope: { projectId: env.LONGPLAY_APP_ID, environment: env.LONGPLAY_ENVIRONMENT }, timeoutMs: 5000 });
    client.identify(token);
    const { check } = await client.checkEntitlement({ requirement: { internal_feature_id: env.LONGPLAY_ACCESS_FEATURE_ID, quantity: '1', properties: {} } });
    if (check.kind !== 'access') throw new Error('Expected access Feature');
    return { active: check.allowed, reason: check.reason };
  } catch (error) {
    if (error?.status === 401) throw new BillingAccessError(401, 'customer_session_required', 'The customer billing session has expired.');
    throw new BillingAccessError(503, 'billing_unavailable', 'Could not verify subscription access.');
  } finally { client?.destroy(); }
}

export async function subscriptionAccessResponse(request, env = process.env, createClient = createLongplay) {
  const headers = { 'Cache-Control': 'no-store', 'Content-Type': 'application/json', Vary: 'Authorization' };
  try {
    return new Response(JSON.stringify(await readSubscriptionAccess(request.headers.get('authorization'), env, createClient)), { status: 200, headers });
  } catch (error) {
    const known = error instanceof BillingAccessError;
    return new Response(JSON.stringify({ error: known ? error.code : 'billing_unavailable' }), { status: known ? error.status : 503, headers });
  }
}
