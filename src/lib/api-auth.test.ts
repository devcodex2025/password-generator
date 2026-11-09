import { describe, expect, it } from 'vitest';
import { checkRequestToken, readRequestToken, tokensMatch } from './api-auth';

function makeRequest(url = 'https://example.test/api', headers: Record<string, string> = {}) {
  return new Request(url, { headers });
}

describe('readRequestToken', () => {
  it('reads a Bearer token from the Authorization header', () => {
    expect(readRequestToken(makeRequest(undefined, { authorization: 'Bearer secret-token' }))).toBe(
      'secret-token',
    );
  });

  it('reads the legacy x-health-token header', () => {
    expect(readRequestToken(makeRequest(undefined, { 'x-health-token': 'secret-token' }))).toBe(
      'secret-token',
    );
  });

  it('ignores a token in the query string', () => {
    expect(readRequestToken(makeRequest('https://example.test/api?token=secret-token'))).toBeNull();
  });
});

describe('tokensMatch', () => {
  it('accepts matching tokens', () => {
    expect(tokensMatch('secret-token', 'secret-token')).toBe(true);
  });

  it('rejects different tokens, including different lengths', () => {
    expect(tokensMatch('secret-token', 'other-token')).toBe(false);
    expect(tokensMatch('short', 'a-much-longer-token')).toBe(false);
  });

  it('rejects missing values', () => {
    expect(tokensMatch(null, 'secret-token')).toBe(false);
    expect(tokensMatch('secret-token', '')).toBe(false);
    expect(tokensMatch(undefined, undefined)).toBe(false);
  });
});

describe('checkRequestToken', () => {
  it('fails closed when the expected token is not configured', () => {
    expect(checkRequestToken(makeRequest(), undefined)).toBe('not-configured');
    expect(checkRequestToken(makeRequest(), '   ')).toBe('not-configured');
  });

  it('rejects a request without credentials', () => {
    expect(checkRequestToken(makeRequest(), 'secret-token')).toBe('unauthorized');
  });

  it('rejects a valid token supplied in the query string', () => {
    expect(
      checkRequestToken(makeRequest('https://example.test/api?token=secret-token'), 'secret-token'),
    ).toBe('unauthorized');
  });

  it('authorizes a matching header token', () => {
    expect(
      checkRequestToken(makeRequest(undefined, { authorization: 'Bearer secret-token' }), 'secret-token'),
    ).toBe('authorized');
  });
});
