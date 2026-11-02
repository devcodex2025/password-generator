

interface CopyButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const CopyButton: React.FC<CopyButtonProps> = ({ onClick, disabled, children, className = '', style }) => (
  <button
    type="button"
    disabled={disabled}
    className={`copy-btn inline-flex w-full h-14 items-center justify-center font-semibold text-[16px] md:text-[20px] rounded-[60px] py-0 transition-all duration-200 ${className}`}
    style={style}
    onClick={onClick}
  >
    {children}
  </button>
);

export default CopyButton;
