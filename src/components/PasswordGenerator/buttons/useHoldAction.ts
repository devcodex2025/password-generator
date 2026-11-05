'use client';

import { useEffect, useRef, useState } from 'react';

/** Delay before a press turns into a hold action; the fill uses it too. */
export const HOLD_MS = 200;

/**
 * Press-and-hold action without the automatic repeat.
 *
 * Holding for less than `HOLD_MS` does nothing, so a tap stays a tap. Once the
 * threshold is reached the press is armed and the action runs when the finger
 * is released — after the browser/system has delivered its own tap or
 * long-press vibration. `holding` drives the pressed styling; `hasFired` lets
 * the click that follows the release be swallowed; the timer is cleared on
 * release and on unmount.
 */
export function useHoldAction(onHold?: () => void) {
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const fired = useRef(false);
  const active = useRef(false);
  const [holding, setHolding] = useState(false);

  const stop = () => {
    clearTimeout(timer.current);
    timer.current = undefined;
    active.current = false;
    setHolding(false);
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  const start = () => {
    if (active.current) return; // ignore a duplicate pointerdown for the same press
    fired.current = false;
    clearTimeout(timer.current);
    setHolding(true);
    active.current = true;
    timer.current = setTimeout(() => {
      fired.current = true;
    }, HOLD_MS);
  };

  /**
   * Ends the press. Returns true and runs the action when the hold threshold
   * was reached; a release before the threshold stays a normal click.
   */
  const finish = () => {
    const held = fired.current && active.current;
    stop();
    if (held) onHold?.();
    return held;
  };

  return {
    holding,
    start,
    stop,
    finish,
    /** True once this press passed the hold threshold. */
    hasFired: () => fired.current,
    clearFired: () => {
      fired.current = false;
    },
  };
}
