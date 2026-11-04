import { useEffect, useId, useRef, useState } from 'react';

interface LongPressTipProps {
  label: string;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

// Shows `label` above the wrapped icon-only button while it is held (touch long-press).
const LongPressTip: React.FC<LongPressTipProps> = ({ label, className = '', disabled = false, children }) => {
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const rootRef = useRef<HTMLDivElement>(null);
  const tooltipId = useId();
  const [show, setShow] = useState(false);

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    if (!disabled) return;
    clearTimeout(timer.current);
    setShow(false);
  }, [disabled]);

  useEffect(() => {
    const button = rootRef.current?.querySelector('button');
    if (!button) return;
    if (show) button.setAttribute('aria-describedby', tooltipId);
    else button.removeAttribute('aria-describedby');
    return () => button.removeAttribute('aria-describedby');
  }, [show, tooltipId]);

  const start = () => {
    if (disabled) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setShow(true), 400);
  };

  const stop = () => {
    clearTimeout(timer.current);
    if (!show) return;
    timer.current = setTimeout(() => setShow(false), 800);
  };

  return (
    <div
      ref={rootRef}
      className={`relative select-none [-webkit-touch-callout:none] ${className}`}
      onPointerDown={start}
      onPointerUp={stop}
      onPointerLeave={stop}
      onPointerCancel={stop}
      onContextMenu={(e) => {
        if (!disabled) e.preventDefault();
      }}
    >
      {children}
      {show && !disabled && (
        <span
          id={tooltipId}
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-[44vw] -translate-x-1/2 rounded-md bg-[#071016] px-2 py-1 text-center text-xs text-white shadow-lg"
        >
          {label}
        </span>
      )}
    </div>
  );
};

export default LongPressTip;
