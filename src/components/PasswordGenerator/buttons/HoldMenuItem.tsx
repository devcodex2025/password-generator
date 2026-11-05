'use client';

import MenuItem from '@mui/material/MenuItem';
import HoldFill from './HoldFill';
import { useHoldAction } from './useHoldAction';

type HoldMenuItemProps = Omit<React.ComponentProps<typeof MenuItem>, 'onClick'> & {
  /** Tap or keyboard activation: the caller runs the action and closes the menu. */
  onClick: () => void;
  /** Runs once when the item has been held for 200ms. */
  onLongPress: () => void;
  /** Runs once when a hold ends, so the caller can close the menu. */
  onHoldEnd?: () => void;
};

/**
 * A menu item with the same press-and-hold action as the Generate button, for
 * the narrow layout where Generate lives in the "more actions" menu. A hold
 * keeps the menu open and regenerates above it; releasing closes the menu.
 */
const HoldMenuItem: React.FC<HoldMenuItemProps> = ({ onClick, onLongPress, onHoldEnd, children, className, ...rest }) => {
  const hold = useHoldAction(onLongPress);

  const release = () => {
    const held = hold.hasFired();
    hold.stop();
    if (held) onHoldEnd?.();
  };

  const handleClick: React.MouseEventHandler<HTMLLIElement> = (event) => {
    if (hold.hasFired()) {
      hold.clearFired();
      event.preventDefault();
      return;
    }
    onClick();
  };

  return (
    <MenuItem
      {...rest}
      onClick={handleClick}
      onPointerDown={(event) => {
        if (event.button > 0) return; // right / middle click is not a hold
        hold.start();
      }}
      onPointerUp={release}
      onPointerLeave={hold.stop}
      onPointerCancel={hold.stop}
      onContextMenu={(event) => event.preventDefault()}
      {...(hold.holding ? { 'data-holding': 'true' } : {})}
      className={`group touch-manipulation select-none [-webkit-touch-callout:none]${className ? ` ${className}` : ''}`}
      sx={{ position: 'relative', overflow: 'hidden' }}
    >
      <HoldFill className="bg-[#2A4E63]/15 dark:bg-white/15" />
      <span className="relative z-10 flex w-full min-w-0 items-center">{children}</span>
    </MenuItem>
  );
};

export default HoldMenuItem;
