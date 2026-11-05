'use client';

import { useEffect, useRef, useState } from 'react';
import { vibrateTick } from '@/lib/haptics';

/** Delay before a press turns into a hold action; the fill and the tick use it. */
export const HOLD_MS = 200;

/**
 * Let the motor start before the action changes the screen. `vibrate()` only
 * queues the pulse, so calling the action immediately made the new password
 * paint before the phone actually buzzed.
 */
export const HAPTIC_LEAD_MS = 80;

/**
 * Press-and-hold action with one short haptic tick when the hold threshold is
 * reached.
 *
 * Holding for less than `HOLD_MS` does nothing, so a tap stays a tap. Once the
 * threshold is reached the action fires exactly once, even if the finger stays
 * down. The haptic starts first; the visible action follows after
 * `HAPTIC_LEAD_MS`. `holding` drives the pressed styling; `hasFired` lets the
 * click that ends a hold be swallowed (the hold already acted); the threshold
 * timer is cleared on release and on unmount.
 */
export function useHoldAction(onHold?: () => void) {
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const actionTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const fired = useRef(false);
  const active = useRef(false);
  const [holding, setHolding] = useState(false);

  const cancelThreshold = () => {
    clearTimeout(timer.current);
    timer.current = undefined;
  };

  const stop = () => {
    cancelThreshold();
    active.current = false;
    setHolding(false);
  };

  useEffect(
    () => () => {
      clearTimeout(timer.current);
      // Do not cancel actionTimer: a menu can unmount on release during the
      // haptic lead, and the hold action still has to run.
    },
    []
  );

  const start = () => {
    if (active.current) return; // ignore a duplicate pointerdown for the same press
    fired.current = false;
    cancelThreshold();
    setHolding(true);
    active.current = true;
    timer.current = setTimeout(() => {
      fired.current = true;
      vibrateTick();
      actionTimer.current = setTimeout(() => onHold?.(), HAPTIC_LEAD_MS);
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
