import { NextResponse, type NextRequest } from 'next/server';

const COUNTRY_CODE = /^[A-Z]{2}$/;

function isCountryCode(value: string | null | undefined): value is string {
  // Cloudflare sends `XX` when the country cannot be determined.
  const country = value?.toUpperCase();
  return Boolean(country && COUNTRY_CODE.test(country) && country !== 'XX');
}

/**
 * Resolves the visitor country from platform headers.
 *
 * Direct Vercel traffic exposes `x-vercel-ip-country`. When the domain is
 * proxied through Cloudflare, Vercel only sees Cloudflare's egress IP, so that
 * header describes the proxy instead of the visitor. In that setup enable IP
 * Geolocation in Cloudflare and set `TRUST_CF_IPCOUNTRY=true`; the real
 * country then arrives in `CF-IPCountry`.
 *
 * The env gate keeps direct requests from trusting a client-supplied
 * `CF-IPCountry` header.
 */
function readCountry(request: NextRequest): string | null {
  if (process.env.TRUST_CF_IPCOUNTRY === 'true') {
    const cfCountry = request.headers.get('cf-ipcountry');
    if (cfCountry !== null) {
      // The CF header is authoritative when present: do not fall back to the
      // Vercel header, which would describe the Cloudflare PoP instead.
      return isCountryCode(cfCountry) ? cfCountry.toUpperCase() : null;
    }
  }

  const vercelCountry = request.headers.get('x-vercel-ip-country');
  return isCountryCode(vercelCountry) ? vercelCountry.toUpperCase() : null;
}

/**
 * Stores the visitor's country in a first-party `geo` cookie so client
 * components can pick a geo-specific affiliate landing page without a
 * server round-trip or a hydration mismatch.
 *
 * When the header is absent (local dev, unsupported host) nothing is written
 * and the registry falls back to locale-based links.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The English home is canonical at `/`. `/en` is an internal alias; send
  // direct requests to the canonical URL so sitemap, canonical and hreflang
  // all describe one page. Rewrites do not re-enter the proxy, so `/` → `/en`
  // below is unaffected.
  if (pathname === '/en') {
    const canonical = request.nextUrl.clone();
    canonical.pathname = '/';
    return NextResponse.redirect(canonical, 301);
  }

  // Root URL renders the English locale without changing the URL (the canonical
  // home stays https://www.generatepasswordto.me). [locale] is the root layout now,
  // so `/` must be mapped onto it explicitly.
  const isRoot = pathname === '/';
  const response = isRoot
    ? NextResponse.rewrite(new URL('/en', request.url))
    : NextResponse.next();

  if (!request.cookies.get('geo')) {
    const country = readCountry(request);
    if (country) {
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

