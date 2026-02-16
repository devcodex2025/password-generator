import { NextRequest, NextResponse } from 'next/server';
import { contentRepository } from '@/lib/content-repository';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';
  const slug = searchParams.get('slug');

  if (slug) {
    const guide = await contentRepository.getGuide(slug, locale);
    if (!guide) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(guide);
  }

  return NextResponse.json(await contentRepository.listGuides(locale));
}
