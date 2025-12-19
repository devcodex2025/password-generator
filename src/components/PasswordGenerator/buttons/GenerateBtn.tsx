import { useRef } from 'react';

interface GenerateButtonProps {
  onClick: () => void;
  onLongPress?: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick, onLongPress, children, className = '', style }) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseDown = () => {
    if (onLongPress) {
      intervalRef.current = setInterval(onLongPress, 200);
    }
  };

  const handleMouseUp = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <button
      className={`bg-[#E5F6FF] text-[#2A4E63] font-semibold rounded-[60px] px-[16px] py-[12px] ${className}`}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      style={{ cursor: 'pointer', ...style }}
    >
      {children}
    </button>
  );
};

export default GenerateButton;
