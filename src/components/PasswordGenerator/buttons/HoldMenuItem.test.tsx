import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import HoldMenuItem from './HoldMenuItem';
import { TICK_MS } from '@/lib/haptics';

const stubVibrate = () => {
  const vibrate = vi.fn();
  Object.defineProperty(navigator, 'vibrate', { value: vibrate, configurable: true });
  return vibrate;
};

const renderItem = (props: { onClick?: () => void; onLongPress?: () => void; onHoldEnd?: () => void } = {}) => {
  render(
    <HoldMenuItem onClick={props.onClick ?? vi.fn()} onLongPress={props.onLongPress ?? vi.fn()} onHoldEnd={props.onHoldEnd}>
      Generate
    </HoldMenuItem>
  );
  return screen.getByRole('menuitem', { name: 'Generate' });
};

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  Reflect.deleteProperty(navigator, 'vibrate');
});

describe('HoldMenuItem hold feedback', () => {
  it('shows the held state while the item is pressed', () => {
    const item = renderItem();
    expect(item.getAttribute('data-holding')).toBeNull();

    fireEvent.pointerDown(item);
    expect(item.getAttribute('data-holding')).toBe('true');

    fireEvent.pointerUp(item);
    expect(item.getAttribute('data-holding')).toBeNull();
  });

  it('acts and ticks once at 200ms, then stays quiet while still held', () => {
    vi.useFakeTimers();
    const vibrate = stubVibrate();
    const onLongPress = vi.fn();
    const onClick = vi.fn();
    const onHoldEnd = vi.fn();
    const item = renderItem({ onLongPress, onClick, onHoldEnd });

    fireEvent.pointerDown(item);
    expect(vibrate).not.toHaveBeenCalled();
    expect(onLongPress).not.toHaveBeenCalled();

    vi.advanceTimersByTime(200);
    expect(onLongPress).toHaveBeenCalledTimes(1);
    expect(vibrate).toHaveBeenCalledTimes(1);
    expect(vibrate).toHaveBeenCalledWith(TICK_MS);

    vi.advanceTimersByTime(1000); // the finger is still down...
    expect(onLongPress).toHaveBeenCalledTimes(1); // ...but the hold already acted
    expect(vibrate).toHaveBeenCalledTimes(1);

    fireEvent.pointerUp(item);
    expect(onHoldEnd).toHaveBeenCalledTimes(1);

    fireEvent.click(item); // the click the browser sends after the release
    expect(onClick).not.toHaveBeenCalled();
  });

  it('still activates normally on a quick tap', () => {
    const onLongPress = vi.fn();
    const onClick = vi.fn();
    const onHoldEnd = vi.fn();
    const item = renderItem({ onLongPress, onClick, onHoldEnd });

    fireEvent.pointerDown(item);
    fireEvent.pointerUp(item);
    fireEvent.click(item);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onLongPress).not.toHaveBeenCalled();
    expect(onHoldEnd).not.toHaveBeenCalled();
  });

  it('still acts when the device has no Vibration API', () => {
    vi.useFakeTimers();
    const onLongPress = vi.fn();
    const item = renderItem({ onLongPress });

    expect(() => {
      fireEvent.pointerDown(item);
      vi.advanceTimersByTime(200);
    }).not.toThrow();
    expect(onLongPress).toHaveBeenCalledTimes(1);

    fireEvent.pointerUp(item);
  });
});
