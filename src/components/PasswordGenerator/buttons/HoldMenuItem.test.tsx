import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import HoldMenuItem from './HoldMenuItem';
import { HOLD_MS } from './useHoldAction';

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

  it('arms at the threshold and acts once on release', () => {
    vi.useFakeTimers();
    const onLongPress = vi.fn();
    const onClick = vi.fn();
    const onHoldEnd = vi.fn();
    const item = renderItem({ onLongPress, onClick, onHoldEnd });

    fireEvent.pointerDown(item);
    expect(onLongPress).not.toHaveBeenCalled();

    vi.advanceTimersByTime(HOLD_MS);
    expect(onLongPress).not.toHaveBeenCalled(); // armed, waiting for release

    fireEvent.pointerUp(item);
    expect(onLongPress).toHaveBeenCalledTimes(1);
    expect(onHoldEnd).toHaveBeenCalledTimes(1);

    fireEvent.click(item); // the click the browser sends after the release
    expect(onClick).not.toHaveBeenCalled();
  });

  it('ignores a duplicate pointerdown during the same press', () => {
    vi.useFakeTimers();
    const onLongPress = vi.fn();
    const item = renderItem({ onLongPress });

    fireEvent.pointerDown(item);
    fireEvent.pointerDown(item);
    vi.advanceTimersByTime(HOLD_MS);
    fireEvent.pointerUp(item);

    expect(onLongPress).toHaveBeenCalledTimes(1);
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
});
