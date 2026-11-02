import { NextResponse, type NextRequest } from 'next/server';

/**
 * Stores the visitor's country in a first-party `geo` cookie so client
 * components can pick a geo-specific affiliate landing page without a
 * server round-trip or a hydration mismatch.
 *
 * The header is provided by the hosting platform (Vercel: x-vercel-ip-country).
 * When it is absent (local dev, unsupported host) nothing is written and the
 * registry falls back to locale-based links.
 */
export function proxy(request: NextRequest) {
  // Root URL renders the English locale without changing the URL (the canonical
  // home stays https://www.generatepasswordto.me). [locale] is the root layout now,
  // so `/` must be mapped onto it explicitly.
  const isRoot = request.nextUrl.pathname === '/';
  const response = isRoot
    ? NextResponse.rewrite(new URL('/en', request.url))
    : NextResponse.next();

  if (!request.cookies.get('geo')) {
    const country = request.headers.get('x-vercel-ip-country');
    if (country && /^[A-Z]{2}$/.test(country)) {
      response.cookies.set('geo', country, {
        path: '/',
        maxAge: 60 * 60 * 24,
        sameSite: 'lax',
      });
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|api|.*\\..*).*)'],
};

