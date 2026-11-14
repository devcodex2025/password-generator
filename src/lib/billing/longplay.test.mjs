import { test, mock } from 'node:test';
import assert from 'node:assert/strict';
import { readSubscriptionAccess, subscriptionAccessResponse } from './longplay.mjs';
const token = `gg_ct_${'a'.repeat(43)}`;
const env = { LONGPLAY_ACCESS_FEATURE_ID: '11111111-1111-4111-8111-111111111111', LONGPLAY_BASE_URL: 'https://billing.example', LONGPLAY_APP_ID: 'app', LONGPLAY_ENVIRONMENT: 'sandbox' };
function fixture({ allowed = true, kind = 'access', failure } = {}) {
  const calls = [];
  return { calls, create: (options) => { calls.push(['config', options]); return {
    identify: (value) => calls.push(['identify', value]), destroy: () => calls.push(['destroy']),
      checkEntitlement: async (input) => { calls.push(['check', input]); if (failure) throw (failure instanceof Error ? failure : new Error(failure)); return { check: { kind, allowed, reason: allowed ? null : 'not_entitled' } }; },
  }; } };
}
test('disabled integration needs no session, Customer lookup or network', async () => {
  const f = fixture(); const response = await subscriptionAccessResponse(new Request('https://app.example/api/billing/access'), {}, f.create);
  assert.equal(response.status, 404); assert.deepEqual(f.calls, []);
});
test('content-admin credentials, Server Keys and client Customer IDs do not authenticate billing', async () => {
  for (const value of ['', 'Bearer gg_sk_example', 'Bearer admin-token', 'customer-id']) {
    const f = fixture(); await assert.rejects(readSubscriptionAccess(value, env, f.create), { status: 401 }); assert.deepEqual(f.calls, []);
  }
});
test('checks only the authenticated Customer and clears credentials afterward', async () => {
  const f = fixture(); assert.deepEqual(await readSubscriptionAccess(`Bearer ${token}`, env, f.create), { active: true, reason: null });
  assert.deepEqual(f.calls[2], ['check', { requirement: { internal_feature_id: env.LONGPLAY_ACCESS_FEATURE_ID, quantity: '1', properties: {} } }]);
  assert.deepEqual(f.calls.at(-1), ['destroy']);
});
test('denial is a billing fact, never a local vault unlock, and responses are not cacheable', async () => {
  const f = fixture({ allowed: false }); const response = await subscriptionAccessResponse(new Request('https://app.example/api/billing/access', { headers: { Authorization: `Bearer ${token}` } }), env, f.create);
  assert.equal(response.status, 200); assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await response.json(), { active: false, reason: 'not_entitled' });
});
test('an expired Customer session requests authentication rather than reporting a billing outage', async () => {
  const f = fixture({ failure: Object.assign(new Error('expired'), { status: 401 }) });
  await assert.rejects(readSubscriptionAccess(`Bearer ${token}`, env, f.create), { status: 401, code: 'customer_session_required' });
  assert.deepEqual(f.calls.at(-1), ['destroy']);
});
test('service failure or metered Feature fails closed and never exposes provider details', async () => {
  for (const config of [{ failure: 'secret-response' }, { kind: 'credit' }]) {
    const f = fixture(config); const response = await subscriptionAccessResponse(new Request('https://app.example/api/billing/access', { headers: { Authorization: `Bearer ${token}` } }), env, f.create);
    assert.equal(response.status, 503); assert.deepEqual(await response.json(), { error: 'billing_unavailable' });
    assert.deepEqual(f.calls.at(-1), ['destroy']);
  }
});

test('the published SDK sends a Customer-scoped request and verifies the protocol envelope', async () => {
  const network = mock.method(globalThis, 'fetch', async (url, init) => {
    assert.equal(String(url), 'https://billing.example/api/v1/entitlements/check');
    assert.equal(new Headers(init.headers).get('authorization'), `Bearer ${token}`);
    assert.deepEqual(JSON.parse(init.body), { requirement: { internal_feature_id: env.LONGPLAY_ACCESS_FEATURE_ID, quantity: '1', properties: {} } });
    return new Response(JSON.stringify({ requestId: '22222222-2222-4222-8222-222222222222', scope: { projectId: 'app', environment: 'sandbox' }, check: { internal_feature_id: env.LONGPLAY_ACCESS_FEATURE_ID, name: 'Storage access', kind: 'access', quantity: '1', allowed: false, reason: 'not_entitled', preview: null } }), { headers: { 'Content-Type': 'application/json', 'X-Indiana-Protocol': '0.10' } });
  });
  try { assert.deepEqual(await readSubscriptionAccess(`Bearer ${token}`, env), { active: false, reason: 'not_entitled' }); }
  finally { network.mock.restore(); }
});
