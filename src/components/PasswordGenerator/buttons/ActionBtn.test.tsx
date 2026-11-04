import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import ActionBtn from './ActionBtn';

const stubVibrate = () => {
  const vibrate = vi.fn();
  Object.defineProperty(navigator, 'vibrate', { value: vibrate, configurable: true });
  return vibrate;
};

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  Reflect.deleteProperty(navigator, 'vibrate');
});

describe('ActionBtn hold feedback', () => {
  it('ticks once when the repeat starts and stays silent until then', () => {
    vi.useFakeTimers();
    const vibrate = stubVibrate();
    const onLongPress = vi.fn();
    render(<ActionBtn label="Generate" icon={<span />} showLabel={false} onLongPress={onLongPress} />);
    const button = screen.getByRole('button', { name: 'Generate' });

    fireEvent.pointerDown(button);
    expect(vibrate).not.toHaveBeenCalled(); // a tap is not a hold yet

    vi.advanceTimersByTime(200);
    expect(onLongPress).toHaveBeenCalledTimes(1);
    expect(vibrate).toHaveBeenCalledTimes(1);
    expect(vibrate).toHaveBeenCalledWith(15);

    vi.advanceTimersByTime(1000); // the repeat keeps generating...
    expect(onLongPress).toHaveBeenCalledTimes(6);
    expect(vibrate).toHaveBeenCalledTimes(1); // ...without buzzing again

    fireEvent.pointerUp(button);
  });

  it('still repeats when the device has no Vibration API', () => {
    vi.useFakeTimers();
    const onLongPress = vi.fn();
    render(<ActionBtn label="Generate" icon={<span />} showLabel={false} onLongPress={onLongPress} />);
    const button = screen.getByRole('button', { name: 'Generate' });

    expect(() => {
      fireEvent.pointerDown(button);
      vi.advanceTimersByTime(200);
    }).not.toThrow();
    expect(onLongPress).toHaveBeenCalledTimes(1);

    fireEvent.pointerUp(button);
  });
});
