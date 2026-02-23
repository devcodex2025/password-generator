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
      className={`bg-[#E5F6FF] dark:!bg-[#05a9ff] text-[#2A4E63] dark:text-[#16394a] dark:border dark:border-[#374151] dark:hover:bg-[#38beff] font-semibold rounded-[60px] px-[16px] py-[12px] cursor-pointer transition-all duration-200 hover:bg-[#d7eefb] ${className}`}
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
