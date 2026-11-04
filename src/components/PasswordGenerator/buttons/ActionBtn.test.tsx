import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import ActionBtn from './ActionBtn';

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

  it('ticks once when the repeat starts and stays silent until then', () => {
    vi.useFakeTimers();
    const vibrate = stubVibrate();
    const onLongPress = vi.fn();
    const button = renderButton({ onLongPress });

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
    const button = renderButton({ onLongPress });

    expect(() => {
      fireEvent.pointerDown(button);
      vi.advanceTimersByTime(200);
    }).not.toThrow();
    expect(onLongPress).toHaveBeenCalledTimes(1);

    fireEvent.pointerUp(button);
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
