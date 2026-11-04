import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import HoldMenuItem from './HoldMenuItem';

const stubVibrate = () => {
  const vibrate = vi.fn();
  Object.defineProperty(navigator, 'vibrate', { value: vibrate, configurable: true });
  return vibrate;
};

const renderItem = (props: { onClick?: () => void; onRepeat?: () => void; onHoldEnd?: () => void } = {}) => {
  render(
    <HoldMenuItem onClick={props.onClick ?? vi.fn()} onRepeat={props.onRepeat ?? vi.fn()} onHoldEnd={props.onHoldEnd}>
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

  it('repeats and ticks once at 200ms, then closes on release without a second action', () => {
    vi.useFakeTimers();
    const vibrate = stubVibrate();
    const onRepeat = vi.fn();
    const onClick = vi.fn();
    const onHoldEnd = vi.fn();
    const item = renderItem({ onRepeat, onClick, onHoldEnd });

    fireEvent.pointerDown(item);
    expect(vibrate).not.toHaveBeenCalled();

    vi.advanceTimersByTime(200);
    expect(onRepeat).toHaveBeenCalledTimes(1);
    expect(vibrate).toHaveBeenCalledTimes(1);
    expect(vibrate).toHaveBeenCalledWith(15);

    vi.advanceTimersByTime(400);
    expect(onRepeat).toHaveBeenCalledTimes(3);
    expect(vibrate).toHaveBeenCalledTimes(1);

    fireEvent.pointerUp(item);
    expect(onHoldEnd).toHaveBeenCalledTimes(1);

    fireEvent.click(item); // the click the browser sends after the release
    expect(onClick).not.toHaveBeenCalled();
  });

  it('still activates normally on a quick tap', () => {
    const onRepeat = vi.fn();
    const onClick = vi.fn();
    const onHoldEnd = vi.fn();
    const item = renderItem({ onRepeat, onClick, onHoldEnd });

    fireEvent.pointerDown(item);
    fireEvent.pointerUp(item);
    fireEvent.click(item);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onRepeat).not.toHaveBeenCalled();
    expect(onHoldEnd).not.toHaveBeenCalled();
  });

  it('still repeats when the device has no Vibration API', () => {
    vi.useFakeTimers();
    const onRepeat = vi.fn();
    const item = renderItem({ onRepeat });

    expect(() => {
      fireEvent.pointerDown(item);
      vi.advanceTimersByTime(200);
    }).not.toThrow();
    expect(onRepeat).toHaveBeenCalledTimes(1);

    fireEvent.pointerUp(item);
  });
});
