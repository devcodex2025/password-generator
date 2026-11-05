import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import ActionBtn from './ActionBtn';
import { HOLD_MS } from './useHoldAction';

const renderButton = (props: { onLongPress?: () => void; onClick?: () => void } = {}) => {
  render(<ActionBtn label="Generate" icon={<span />} showLabel={false} {...props} />);
  return screen.getByRole('button', { name: 'Generate' });
};

afterEach(() => {
  cleanup();
  vi.useRealTimers();
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

  it('arms at the threshold and acts once on release', () => {
    vi.useFakeTimers();
    const onLongPress = vi.fn();
    const button = renderButton({ onLongPress });

    fireEvent.pointerDown(button);
    expect(onLongPress).not.toHaveBeenCalled(); // a tap is not a hold yet

    vi.advanceTimersByTime(HOLD_MS);
    expect(onLongPress).not.toHaveBeenCalled(); // armed, waiting for release

    fireEvent.pointerUp(button);
    expect(onLongPress).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(1000);
    expect(onLongPress).toHaveBeenCalledTimes(1);
  });

  it('ignores a duplicate pointerdown during the same press', () => {
    vi.useFakeTimers();
    const onLongPress = vi.fn();
    const button = renderButton({ onLongPress });

    fireEvent.pointerDown(button);
    fireEvent.pointerDown(button); // some browsers/assistive layers repeat it
    vi.advanceTimersByTime(HOLD_MS);
    fireEvent.pointerUp(button);

    expect(onLongPress).toHaveBeenCalledTimes(1);
  });

  it('cancels a hold released before the threshold', () => {
    vi.useFakeTimers();
    const onLongPress = vi.fn();
    const onClick = vi.fn();
    const button = renderButton({ onLongPress, onClick });

    fireEvent.pointerDown(button);
    vi.advanceTimersByTime(HOLD_MS - 1);
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
    vi.advanceTimersByTime(HOLD_MS);
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
