/**
 * @param {string} text
 * @param {string} suffix
 * @returns {{ breached: boolean, count: number }}
 */
export function parseHibpRange(text, suffix) {
  const target = suffix.trim().toUpperCase();
  for (const line of text.split('\n')) {
    const [hashSuffix, count] = line.split(':');
    if (hashSuffix && hashSuffix.trim().toUpperCase() === target) {
      const parsed = parseInt((count ?? '').trim(), 10);
      const n = Number.isNaN(parsed) ? 0 : parsed;
      return { breached: n > 0, count: n };
    }
  }
  return { breached: false, count: 0 };
}
