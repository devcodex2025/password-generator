/**
 * Phase 2: send affiliate conversions into GA4 as `purchase` events.
 *
 * The click tracker writes the GA4 client id into `aff_sub2`, the network returns it back as
 * `Stat.affiliate_info2` on every conversion. That is the whole join, so no database is required.
 */

const OFFER_NAMES: Record<string, string> = {
  '15': 'NordVPN',
  '488': 'NordPass',
  '489': 'NordLocker',
  '754': 'NordPass Business',
};

export interface SyncOptions {
  /** How far back to look for approved conversions. */
  days?: number;
  /** Build the payloads but do not send them. */
  dryRun?: boolean;
  /** Send to the GA4 validation endpoint instead of the live one. */
  validate?: boolean;
  /** Include pending conversions (they can still be rejected later). */
  includePending?: boolean;
}

export interface SyncResult {
  conversionId: string | null;
  clientId?: string;
  transactionId?: string;
  value?: number;
  status?: 'sent' | 'skipped' | 'invalid';
  reason?: string;
  httpStatus?: number;
  validationMessages?: unknown[];
}

export interface SyncReport {
  generatedAt: string;
  days: number;
  mode: 'dry-run' | 'validate' | 'live';
  conversions: number;
  sent: number;
  skipped: number;
  invalid: number;
  results: SyncResult[];
}

const isoDate = (date: Date) => date.toISOString().slice(0, 10);

async function hasOffersRequest(params: Record<string, string | string[]>): Promise<Record<string, unknown>[]> {
  const apiKey = process.env.NORD_AFFILIATE_API_KEY;
  if (!apiKey) throw new Error('NORD_AFFILIATE_API_KEY is not configured');

  const url = new URL(process.env.HASOFFERS_API_BASE || 'https://api.hasoffers.com/Apiv3/json');
  url.searchParams.set('NetworkId', process.env.NORD_AFFILIATE_NETWORK_ID || 'nordvpn');
  url.searchParams.set('api_key', apiKey);
  url.searchParams.set('Format', 'json');
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      for (const item of value) url.searchParams.append(`${key}[]`, item);
    } else {
      url.searchParams.set(key, value);
    }
  }

  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(30000),
  });
  const body = (await response.json().catch(() => null)) as {
    response?: { status?: number; errorMessage?: unknown; data?: { data?: unknown } };
  } | null;
  const payload = body?.response;
  if (payload?.status !== 1) {
    const error = payload?.errorMessage;
    const message =
      typeof error === 'string'
        ? error
        : (error as { message?: string } | undefined)?.message || `HTTP ${response.status}`;
    throw new Error(message);
  }
  const data = payload.data?.data ?? {};
  return (Array.isArray(data) ? data : Object.values(data)) as Record<string, unknown>[];
}

function parseConversionTime(value: unknown): Date | null {
  if (!value) return null;
  const normalised = String(value).includes('T') ? String(value) : `${String(value).replace(' ', 'T')}Z`;
  const date = new Date(normalised);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** GA4 accepts backdated Measurement Protocol events for 72 hours only. */
const MAX_BACKDATE_MS = 72 * 3600 * 1000;

export async function runAffiliateSync(options: SyncOptions = {}): Promise<SyncReport> {
  const days = Math.max(1, Math.min(548, options.days ?? 30));
  const measurementId = process.env.GA4_MEASUREMENT_ID;
  const apiSecret = process.env.GA4_MP_API_SECRET;
  if (!measurementId || !apiSecret) {
    throw new Error('GA4_MEASUREMENT_ID and GA4_MP_API_SECRET must be configured');
  }

  const start = new Date(Date.now() - days * 86400000);
  const statuses = options.includePending ? ['approved', 'pending'] : ['approved'];

  const rows = await hasOffersRequest({
    Target: 'Affiliate_Report',
    Method: 'getConversions',
    limit: '500',
    page: '1',
    data_start: isoDate(start),
    data_end: isoDate(new Date()),
    'filters[Stat.datetime][conditional]': 'GREATER_THAN_OR_EQUAL_TO',
    'filters[Stat.datetime][values]': [`${isoDate(start)} 00:00:00`],
    'filters[Stat.conversion_status][conditional]': 'EQUAL_TO',
    'filters[Stat.conversion_status][values]': statuses,
    fields: [
      'Stat.id',
      'Stat.datetime',
      'Stat.conversion_status',
      'Stat.approved_payout',
      'Stat.affiliate_info1',
      'Stat.affiliate_info2',
      'Stat.offer_id',
      'Stat.currency',
    ],
  });

  const mode = options.dryRun ? 'dry-run' : options.validate ? 'validate' : 'live';
  const endpoint = options.validate
    ? `https://www.google-analytics.com/debug/mp/collect?measurement_id=${encodeURIComponent(measurementId)}&api_secret=${encodeURIComponent(apiSecret)}`
    : `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(measurementId)}&api_secret=${encodeURIComponent(apiSecret)}`;

  const results: SyncResult[] = [];
  let sent = 0;
  let skipped = 0;
  let invalid = 0;

  for (const row of rows) {
    const conversion = (row.Stat ?? row) as Record<string, unknown>;
    const conversionId = conversion.id ? String(conversion.id) : null;
    const clientId = String(conversion.affiliate_info2 ?? '').trim();

    if (!/^\d+\.\d+$/.test(clientId)) {
      skipped += 1;
      results.push({
        conversionId,
        status: 'skipped',
        reason: clientId ? 'aff_sub2 is not a GA4 client id' : 'no GA4 client id (click predates Phase 2 or consent was denied)',
      });
      continue;
    }

    const value = Number(conversion.approved_payout ?? 0);
    if (!Number.isFinite(value) || value <= 0) {
      invalid += 1;
      results.push({ conversionId, clientId, status: 'invalid', reason: 'payout is zero or missing' });
      continue;
    }

    const occurredAt = parseConversionTime(conversion.datetime);
    const backdate = occurredAt && Date.now() - occurredAt.getTime() <= MAX_BACKDATE_MS;
    const offerId = String(conversion.offer_id ?? '');

    const payload = {
      client_id: clientId,
      ...(backdate && occurredAt ? { timestamp_micros: String(occurredAt.getTime() * 1000) } : {}),
      events: [
        {
          name: 'purchase',
          params: {
            transaction_id: `aff-${conversionId ?? Date.now()}`,
            value,
            currency: String(conversion.currency ?? 'USD') || 'USD',
            affiliation: 'nord-affiliate',
            items: [
              {
                item_id: offerId || 'nord-offer',
                item_name: OFFER_NAMES[offerId] ?? 'Nord offer',
                price: value,
                quantity: 1,
              },
            ],
            engagement_time_msec: '100',
          },
        },
      ],
    };

    if (options.dryRun) {
      results.push({
        conversionId,
        clientId,
        transactionId: `aff-${conversionId}`,
        value,
        status: 'sent',
        reason: 'dry-run',
      });
      sent += 1;
      continue;
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(20000),
    });

    const result: SyncResult = {
      conversionId,
      clientId,
      transactionId: `aff-${conversionId}`,
      value,
      status: response.ok ? 'sent' : 'invalid',
      httpStatus: response.status,
    };

    if (options.validate) {
      const validation = (await response.json().catch(() => null)) as
        | { validationMessages?: unknown[] }
        | null;
      result.validationMessages = validation?.validationMessages ?? [];
    }

    if (response.ok) sent += 1;
    else invalid += 1;
    results.push(result);
  }

  return {
    generatedAt: new Date().toISOString(),
    days,
    mode,
    conversions: rows.length,
    sent,
    skipped,
    invalid,
    results,
  };
}
