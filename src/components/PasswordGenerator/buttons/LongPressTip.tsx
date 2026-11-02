import { useRef, useState } from 'react';

interface LongPressTipProps {
  label: string;
  className?: string;
  children: React.ReactNode;
}

// Shows `label` above the wrapped icon-only button while it is held (mobile only).
const LongPressTip: React.FC<LongPressTipProps> = ({ label, className = '', children }) => {
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [show, setShow] = useState(false);

  const start = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setShow(true), 400);
  };

  const stop = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setShow(false), 800);
  };

  return (
    <div
      className={`relative select-none [-webkit-touch-callout:none] ${className}`}
      onPointerDown={start}
      onPointerUp={stop}
      onPointerLeave={stop}
      onPointerCancel={stop}
      onContextMenu={(e) => e.preventDefault()}
    >
      {children}
      {show && (
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-[44vw] -translate-x-1/2 rounded-md bg-[#071016] px-2 py-1 text-center text-xs text-white md:hidden"
        >
          {label}
        </span>
      )}
    </div>
  );
};

export default LongPressTip;
