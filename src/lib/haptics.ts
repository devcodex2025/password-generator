/**
 * Best-effort haptic feedback for touch gestures.
 *
 * The Vibration API exists on Android-class browsers only and needs an active
 * user gesture, so iOS, desktops and blocked pages simply get nothing: haptics
 * are a bonus cue, never the only feedback for an action.
 */

/**
 * A "tick" has to survive the whole Android haptics stack. Android's own click
 * feedback is 10–20ms, but some OEM builds (notably Xiaomi/HyperOS with Z-axis
 * linear motors) ignore or barely render pulses at the short end of that range.
 * 30ms is still a tick and is reliably felt, while a tap stays silent because
 * the pulse only fires when the 200ms hold threshold is reached.
 */
export const TICK_MS = 30;

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
