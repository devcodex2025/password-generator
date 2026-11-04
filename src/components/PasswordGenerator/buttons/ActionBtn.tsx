'use client';

import { useEffect, useRef } from 'react';
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
  primary: 'bg-[#2A4E63] text-white hover:bg-[#1f3b4c] dark:bg-[#05a9ff] dark:text-black dark:hover:bg-[#38beff]',
  soft: 'bg-[#E5F6FF] text-[#2A4E63] hover:bg-[#d7eefb] dark:bg-white/10 dark:text-white dark:hover:bg-white/20',
};

// One button for every action inside the password field, so copy / share / generate
// (and the "more" trigger) share size, shape and focus styling at every density.
const ActionBtn: React.FC<ActionBtnProps> = ({ label, icon, showLabel, variant = 'soft', onLongPress, ...rest }) => {
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);
  const stop = () => clearInterval(timer.current);
  useEffect(() => stop, []);

  const button = (
    <button
      type="button"
      {...rest}
      onPointerDown={
        onLongPress
          ? () => {
              stop();
              timer.current = setInterval(onLongPress, 200);
            }
          : undefined
      }
      onPointerUp={stop}
      onPointerLeave={stop}
      onPointerCancel={stop}
      className={`inline-flex h-11 shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-full font-semibold leading-none transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A4E63] disabled:cursor-not-allowed disabled:opacity-50 dark:focus-visible:ring-[#05a9ff] ${
        showLabel ? 'gap-2 px-5 text-base' : 'w-11'
      } ${VARIANT[variant]}`}
    >
      {icon}
      <span className={showLabel ? undefined : 'sr-only'}>{label}</span>
    </button>
  );

  return showLabel ? button : <LongPressTip label={label} className="shrink-0">{button}</LongPressTip>;
};

export default ActionBtn;
