
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
    className={`bg-[#E5F6FF] text-[#2A4E63] dark:!bg-[#05a9ff] dark:!text-[#0a1e2a] font-semibold rounded-[60px] px-[16px] py-[12px] flex items-center transition-all duration-200 hover:bg-[#d7eefb] dark:hover:!bg-[#38beff] hover:underline underline-offset-4 decoration-2 ${className}`}
    onClick={onClick}
    style={{ cursor: 'pointer', ...style }}
  >
    <Image
      src="/images/share-paper-plane.svg"
      alt=""
      role="presentation"
      width={24}
      height={24}
      className={iconClassName || 'mr-2 transition-transform duration-200 hover:scale-110'}
    />
    {children}
  </button>
);

export default ShareButton;
