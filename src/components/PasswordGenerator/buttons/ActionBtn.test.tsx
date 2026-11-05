import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import ActionBtn from './ActionBtn';
import { TICK_MS } from '@/lib/haptics';

const stubVibrate = () => {
  const vibrate = vi.fn();
  Object.defineProperty(navigator, 'vibrate', { value: vibrate, configurable: true });
  return vibrate;
};

const renderButton = (props: { onLongPress?: () => void; onClick?: () => void } = {}) => {
  render(<ActionBtn label="Generate" icon={<span />} showLabel={false} {...props} />);
  return screen.getByRole('button', { name: 'Generate' });
};

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  Reflect.deleteProperty(navigator, 'vibrate');
});

describe('ActionBtn hold feedback', () => {
  it('shows the held state for the whole press and clears it on release', () => {
    const button = renderButton({ onLongPress: vi.fn() });
    expect(button.getAttribute('data-holding')).toBeNull();

    fireEvent.pointerDown(button);
    expect(button.getAttribute('data-holding')).toBe('true');

    fireEvent.pointerUp(button);
    expect(button.getAttribute('data-holding')).toBeNull();
  });

  it('acts and ticks once at 200ms, then stays quiet while still held', () => {
    vi.useFakeTimers();
    const vibrate = stubVibrate();
    const onLongPress = vi.fn();
    const button = renderButton({ onLongPress });

    fireEvent.pointerDown(button);
    expect(vibrate).not.toHaveBeenCalled(); // a tap is not a hold yet

    vi.advanceTimersByTime(200);
    expect(onLongPress).toHaveBeenCalledTimes(1);
    expect(vibrate).toHaveBeenCalledTimes(1);
    expect(vibrate).toHaveBeenCalledWith(TICK_MS);

    vi.advanceTimersByTime(1000); // the finger is still down...
    expect(onLongPress).toHaveBeenCalledTimes(1); // ...but the hold already acted
    expect(vibrate).toHaveBeenCalledTimes(1);

    fireEvent.pointerUp(button);
  });

  it('still acts when the device has no Vibration API', () => {
    vi.useFakeTimers();
    const onLongPress = vi.fn();
    const button = renderButton({ onLongPress });

    expect(() => {
      fireEvent.pointerDown(button);
      vi.advanceTimersByTime(200);
    }).not.toThrow();
    expect(onLongPress).toHaveBeenCalledTimes(1);

    fireEvent.pointerUp(button);
  });

  it('cancels a hold released before the 200ms threshold', () => {
    vi.useFakeTimers();
    const onLongPress = vi.fn();
    const onClick = vi.fn();
    const button = renderButton({ onLongPress, onClick });

    fireEvent.pointerDown(button);
    vi.advanceTimersByTime(199);
    expect(onLongPress).not.toHaveBeenCalled();

    fireEvent.pointerUp(button);
    vi.advanceTimersByTime(1000);
    expect(onLongPress).not.toHaveBeenCalled();

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not generate again on the click that ends a hold', () => {
    vi.useFakeTimers();
    const onLongPress = vi.fn();
    const onClick = vi.fn();
    const button = renderButton({ onLongPress, onClick });

    fireEvent.pointerDown(button);
    vi.advanceTimersByTime(200);
    fireEvent.pointerUp(button);
    fireEvent.click(button);

    expect(onLongPress).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('still generates once on a short tap', () => {
    vi.useFakeTimers();
    const onLongPress = vi.fn();
    const onClick = vi.fn();
    const button = renderButton({ onLongPress, onClick });

    fireEvent.pointerDown(button);
    fireEvent.pointerUp(button);
    fireEvent.click(button);

    expect(onLongPress).not.toHaveBeenCalled();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
