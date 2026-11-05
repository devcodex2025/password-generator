/**
 * Best-effort haptic feedback for touch gestures.
 *
 * The Vibration API exists on Android-class browsers only and needs an active
 * user gesture, so iOS, desktops and blocked pages simply get nothing: haptics
 * are a bonus cue, never the only feedback for an action.
 */

/**
 * A "tick" has to survive the whole Android haptics stack. Android's own click
 * feedback is 10–20ms, but some OEM builds (notably Xiaomi/HyperOS) ignore or
 * barely render pulses at the short end of that range.
 *
 * 40ms was the value confirmed on the Redmi Note 13 Pro: clearly felt without
 * turning the hold cue into a long buzz.
 */
export const TICK_MS = 40;

/**
 * One short tick. Returns whether the browser accepted the request; `false`
 * covers unsupported browsers, blocked vibration (silent/DND/power saving) and
 * an expired activation. Callers should never depend on the return value for
 * the action itself.
 */
export function vibrateTick(durationMs: number = TICK_MS): boolean {
  if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') return false;

  try {
    return navigator.vibrate(durationMs);
  } catch {
    // Expired activation or a blocked vibration: the button still works.
    return false;
  }
}
