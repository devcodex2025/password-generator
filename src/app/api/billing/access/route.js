import { subscriptionAccessResponse } from '../../../../lib/billing/longplay.mjs';

export const runtime = 'nodejs';

export async function GET(request) {
  return subscriptionAccessResponse(request);
}
