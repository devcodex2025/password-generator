'use client';

import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/**
 * Shared button primitive.
 *
 * The app had the same pill button re-implemented in every component with
 * slightly different heights, radii, hover states and focus rings. This keeps
 * one source of truth for the visual variants while components only pick a
 * variant/size and add layout classes.
 */

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'choice';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition focus-visible:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-50';

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-[#2A4E63] text-white hover:bg-[#1f3b4c] focus-visible:ring-[#2A4E63]/30 dark:bg-[#05a9ff] dark:text-[#16394a] dark:hover:bg-[#38beff] dark:focus-visible:ring-[#05a9ff]/40',
  secondary:
    'border-2 border-[#2A4E63] bg-white text-[#2A4E63] hover:bg-[#E5F6FF] focus-visible:ring-[#2A4E63]/30 dark:border-[#05a9ff] dark:bg-[#374151] dark:text-[#e0e0e0] dark:hover:bg-[#2d2d2d] dark:focus-visible:ring-[#05a9ff]/40',
  ghost:
    'text-[#6b7280] hover:bg-[#EAF8FF] hover:text-[#2A4E63] focus-visible:ring-[#2A4E63]/20 dark:text-[#9ca3af] dark:hover:bg-white/5 dark:hover:text-white dark:focus-visible:ring-[#05a9ff]/30',
  choice:
    'border-2 border-gray-200 bg-white text-[#2A4E63] hover:border-[#2A4E63] focus-visible:ring-[#2A4E63]/30 dark:border-gray-600 dark:bg-[#374151] dark:text-[#e0e0e0] dark:hover:border-[#05a9ff] dark:focus-visible:ring-[#05a9ff]/40',
};

const CHOICE_SELECTED =
  'border-[#2A4E63] bg-[#e5f6ff] text-[#2A4E63] dark:border-[#05a9ff] dark:bg-[#05a9ff] dark:text-[#0a1e2a]';

const SIZES: Record<ButtonSize, string> = {
  sm: 'min-h-9 px-3 text-[13px]',
  md: 'min-h-11 px-4 text-[14px]',
  lg: 'min-h-12 px-6 text-[16px]',
  icon: 'h-11 w-11 p-0',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Only meaningful for `variant="choice"`: draws the selected state. */
  selected?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', selected = false, className, type = 'button', ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(BASE, VARIANTS[variant], variant === 'choice' && selected && CHOICE_SELECTED, SIZES[size], className)}
      {...props}
    />
  );
});

export default Button;
