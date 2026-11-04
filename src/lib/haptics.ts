/**
 * Best-effort haptic feedback for touch gestures.
 *
 * The Vibration API exists on Android-class browsers only and needs an active
 * user gesture, so iOS, desktops and blocked pages simply get nothing: haptics
 * are a bonus cue, never the only feedback for an action.
 */
const TICK_MS = 15;

/** One short tick; silently does nothing when vibration is unavailable. */
export function vibrateTick(durationMs: number = TICK_MS): void {
  if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') return;

  try {
    navigator.vibrate(durationMs);
  } catch {
    // Expired activation or a blocked vibration: the button still works.
  }
}
