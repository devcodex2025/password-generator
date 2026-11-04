'use client';

import { useEffect, useRef, useState } from 'react';
import { vibrateTick } from '@/lib/haptics';

/** Delay before hold-to-repeat starts; the fill and the haptic tick use it. */
export const HOLD_MS = 200;

/**
 * Press-and-hold repeat with one short haptic tick when the repeat starts.
 *
 * `holding` drives the pressed styling; `hasRepeated` lets the click that ends
 * a hold be swallowed (the hold already acted); the interval is cleared on
 * release and on unmount.
 */
export function useHoldRepeat(onRepeat?: () => void) {
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);
  const repeated = useRef(false);
  const [holding, setHolding] = useState(false);

  const stop = () => {
    clearInterval(timer.current);
    timer.current = undefined;
    setHolding(false);
  };

  useEffect(() => () => clearInterval(timer.current), []);

  const start = () => {
    repeated.current = false;
    stop();
    setHolding(true);
    timer.current = setInterval(() => {
      if (!repeated.current) {
        repeated.current = true;
        vibrateTick();
      }
      onRepeat?.();
    }, HOLD_MS);
  };

  return {
    holding,
    start,
    stop,
    /** True once this press has passed the hold threshold. */
    hasRepeated: () => repeated.current,
    clearRepeated: () => {
      repeated.current = false;
    },
  };
}
