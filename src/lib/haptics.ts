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
 * 100ms is deliberately long while we measure the real minimum on the device;
 * once the browser and HyperOS are confirmed to vibrate at all, lower this
 * gradually (75 → 50 → 30 → 20) and keep the shortest pulse that is still felt.
 */
export const TICK_MS = 100;

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
