import React from 'react';

interface CopyButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const CopyButton: React.FC<CopyButtonProps> = ({ onClick, disabled, children, className = '', style }) => (
  <button
    disabled={disabled}
    className={`copy-btn w-full h-14 font-semibold text-[16px] md:text-[20px] rounded-[60px] py-[12px] ${className}`}
    style={style}
    onClick={onClick}
  >
    {children}
  </button>
);

export default CopyButton;
