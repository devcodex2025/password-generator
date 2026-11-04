'use client';

import HoldFill from './HoldFill';
import { useHoldRepeat } from './useHoldRepeat';
import LongPressTip from './LongPressTip';

interface ActionBtnProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className' | 'type'> {
  label: string;
  icon: React.ReactNode;
  /** Render the label next to the icon; otherwise it is screen-reader only. */
  showLabel: boolean;
  variant?: 'primary' | 'soft';
  /** Called every 200ms while the button is held down. */
  onLongPress?: () => void;
}

const VARIANT = {
  primary: {
    button: 'bg-[#2A4E63] text-white hover:bg-[#1f3b4c] dark:bg-[#05a9ff] dark:text-black dark:hover:bg-[#38beff]',
    // Material-style state layer: a light wash on the dark button.
    charge: 'bg-white/25',
  },
  soft: {
    button: 'bg-[#E5F6FF] text-[#2A4E63] hover:bg-[#d7eefb] dark:bg-white/10 dark:text-white dark:hover:bg-white/20',
    charge: 'bg-[#2A4E63]/15 dark:bg-white/15',
  },
};

// One button for every action inside the password field, so copy / share / generate
// (and the "more" trigger) share size, shape and focus styling at every density.
const ActionBtn: React.FC<ActionBtnProps> = ({ label, icon, showLabel, variant = 'soft', onLongPress, ...rest }) => {
  const { onClick } = rest;
  const hold = useHoldRepeat(onLongPress);

  // A hold already generated while the finger was down; the click that ends it
  // must not add one more. Short taps never reach the repeat and still click.
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (hold.hasRepeated()) {
      hold.clearRepeated();
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  const button = (
    <button
      type="button"
      {...rest}
      onClick={handleClick}
      {...(onLongPress && {
        onPointerDown: (event: React.PointerEvent<HTMLButtonElement>) => {
          if (event.button > 0) return; // right / middle click is not a hold
          hold.start();
        },
        onPointerUp: hold.stop,
        onPointerLeave: hold.stop,
        onPointerCancel: hold.stop,
      })}
      data-holding={hold.holding ? 'true' : undefined}
      className={`group relative inline-flex h-11 shrink-0 cursor-pointer touch-manipulation select-none items-center justify-center overflow-hidden whitespace-nowrap rounded-full font-semibold leading-none transition-[transform,background-color,box-shadow] duration-200 ease-out [-webkit-touch-callout:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A4E63] disabled:cursor-not-allowed disabled:opacity-50 dark:focus-visible:ring-[#05a9ff] data-[holding=true]:scale-95 data-[holding=true]:shadow-inner motion-reduce:transition-none motion-reduce:data-[holding=true]:scale-100 ${
        showLabel ? 'px-5 text-base' : 'w-11'
      } ${VARIANT[variant].button}`}
    >
      {onLongPress && <HoldFill className={VARIANT[variant].charge} />}
      <span className={`relative z-10 inline-flex items-center justify-center ${showLabel ? 'gap-2' : ''}`}>
        {icon}
        <span className={showLabel ? undefined : 'sr-only'}>{label}</span>
      </span>
    </button>
  );

  return showLabel ? button : <LongPressTip label={label} className="shrink-0">{button}</LongPressTip>;
};

export default ActionBtn;
