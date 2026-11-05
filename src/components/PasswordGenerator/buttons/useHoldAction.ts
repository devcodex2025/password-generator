'use client';

import { useEffect, useRef, useState } from 'react';
import { vibrateTick } from '@/lib/haptics';

/** Delay before a press turns into a hold action; the fill and the tick use it. */
export const HOLD_MS = 200;

/**
 * Press-and-hold action with one short haptic tick when the hold threshold is
 * reached.
 *
 * Holding for less than `HOLD_MS` does nothing, so a tap stays a tap. Once the
 * threshold is reached the action fires exactly once, even if the finger stays
 * down. `holding` drives the pressed styling; `hasFired` lets the click that
 * ends a hold be swallowed (the hold already acted); the timer is cleared on
 * release and on unmount.
 */
export function useHoldAction(onHold?: () => void) {
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const fired = useRef(false);
  const [holding, setHolding] = useState(false);

  const stop = () => {
    clearTimeout(timer.current);
    timer.current = undefined;
    setHolding(false);
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  const start = () => {
    fired.current = false;
    stop();
    setHolding(true);
    timer.current = setTimeout(() => {
      fired.current = true;
      vibrateTick();
      onHold?.();
    }, HOLD_MS);
  };

  return {
    holding,
    start,
    stop,
    /** True once this press has passed the hold threshold and acted. */
    hasFired: () => fired.current,
    clearFired: () => {
      fired.current = false;
    },
  };
}
