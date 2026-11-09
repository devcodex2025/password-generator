import { createHash, timingSafeEqual } from 'node:crypto';

/**
 * Token authentication for internal diagnostic/maintenance endpoints.
 *
 * Tokens are read from request headers only. Query-string tokens leak into
 * proxy logs, browser history and Referer headers, so they are not accepted.
 *
 * The `x-health-token` header is kept for backwards compatibility with
 * existing runbooks; `Authorization: Bearer <token>` is the preferred form.
 */
export function readRequestToken(request: Request): string | null {
  const authorization = request.headers.get('authorization');
  if (authorization) {
    const match = /^Bearer\s+(.+)$/i.exec(authorization.trim());
    const bearer = match?.[1]?.trim();
    if (bearer) return bearer;
  }

  const healthHeader = request.headers.get('x-health-token')?.trim();
  return healthHeader || null;
}

/**
 * Compares two tokens in constant time.
 *
 * Both values are hashed first so the comparison always works on equal-length
 * buffers and does not leak the expected token length through timing.
 */
export function tokensMatch(provided: string | null | undefined, expected: string | null | undefined): boolean {
  if (!provided || !expected) return false;

  const providedDigest = createHash('sha256').update(provided, 'utf8').digest();
  const expectedDigest = createHash('sha256').update(expected, 'utf8').digest();
  return timingSafeEqual(providedDigest, expectedDigest);
}

export type TokenCheck = 'authorized' | 'unauthorized' | 'not-configured';

/**
 * Fail-closed token check: an unset expected token is a configuration error,
 * never an implicit "allow everyone" mode.
 */
export function checkRequestToken(
  request: Request,
  expected: string | null | undefined,
): TokenCheck {
  if (!expected?.trim()) return 'not-configured';
  return tokensMatch(readRequestToken(request), expected) ? 'authorized' : 'unauthorized';
}
