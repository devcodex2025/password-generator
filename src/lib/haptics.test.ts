import { afterEach, describe, expect, it, vi } from 'vitest';
import { TICK_MS, vibrateTick } from './haptics';

const stubVibrate = (impl: () => boolean = () => true) => {
  const vibrate = vi.fn(impl);
  Object.defineProperty(navigator, 'vibrate', { value: vibrate, configurable: true });
  return vibrate;
};

afterEach(() => {
  Reflect.deleteProperty(navigator, 'vibrate');
});

describe('vibrateTick', () => {
  it('uses a pulse long enough for Android linear motors', () => {
    // Android's native click is 10-20ms; Xiaomi/HyperOS builds can swallow the
    // short end of that range, so the web tick must stay above it.
    expect(TICK_MS).toBeGreaterThanOrEqual(25);
  });

  it('sends one tick with the default duration and reports acceptance', () => {
    const vibrate = stubVibrate(() => true);

    expect(vibrateTick()).toBe(true);
    expect(vibrate).toHaveBeenCalledTimes(1);
    expect(vibrate).toHaveBeenCalledWith(TICK_MS);
  });

  it('accepts a custom duration', () => {
    const vibrate = stubVibrate(() => true);

    expect(vibrateTick(80)).toBe(true);
    expect(vibrate).toHaveBeenCalledWith(80);
  });

  it('reports a rejection from the browser without throwing', () => {
    const vibrate = stubVibrate(() => false);

    expect(vibrateTick()).toBe(false);
    expect(vibrate).toHaveBeenCalledTimes(1);
  });

  it('does nothing when the Vibration API is missing', () => {
    expect(vibrateTick()).toBe(false);
  });

  it('swallows an exception from a broken implementation', () => {
    stubVibrate(() => {
      throw new Error('blocked');
    });

    expect(() => vibrateTick()).not.toThrow();
    expect(vibrateTick()).toBe(false);
  });
});
