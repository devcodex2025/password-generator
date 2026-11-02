import { NextResponse } from 'next/server';
import { runAffiliateSync } from '@/lib/affiliate/sync';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * Sends approved affiliate conversions into GA4 as `purchase` events.
 *
 * Auth: `Authorization: Bearer <CRON_SECRET>`. Vercel Cron adds that header automatically
 * when the variable exists. Manual run:
 *   curl -H "Authorization: Bearer $CRON_SECRET" \
 *     "https://www.generatepasswordto.me/api/affiliate/sync?days=30&validate=1"
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'CRON_SECRET is not configured' }, { status: 503 });
  }
  if (request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const url = new URL(request.url);
  const days = Number(url.searchParams.get('days') || 30);

  try {
    const report = await runAffiliateSync({
      days,
      dryRun: url.searchParams.get('dry') === '1',
      validate: url.searchParams.get('validate') === '1',
      includePending: url.searchParams.get('pending') === '1',
    });
    return NextResponse.json(report);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'sync failed' },
      { status: 500 }
    );
  }
}
