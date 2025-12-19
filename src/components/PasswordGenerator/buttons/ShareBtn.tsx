
import Image from 'next/image';

interface ShareButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  iconClassName?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ onClick, children, className = '', style, iconClassName }) => (
  <button
    className={`bg-[#E5F6FF] text-[#2A4E63] font-semibold rounded-[60px] px-[16px] py-[12px] flex items-center ${className}`}
    onClick={onClick}
    style={{ cursor: 'pointer', ...style }}
  >
    <Image
      src="/images/share-paper-plane.svg"
      alt="share password"
      width={24}
      height={24}
      className={iconClassName || 'mr-2'}
    />
    {children}
  </button>
);

export default ShareButton;
