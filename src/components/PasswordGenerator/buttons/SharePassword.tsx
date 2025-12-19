
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import { useTranslation } from 'react-i18next';

interface SharePasswordProps {
  password: string;
  isDarkMode?: boolean;
}

const SharePassword: React.FC<SharePasswordProps> = ({ password }) => {
  const { t } = useTranslation();

  const getShareText = (password: string) => {
    return `${t('share_message')}${password}`;
  };

  const shareLinks = {
    telegram: (password: string) =>
      `https://t.me/share/url?url=${encodeURIComponent(getShareText(password))}`,
    whatsapp: (password: string) =>
      `https://wa.me/?text=${encodeURIComponent(getShareText(password))}`,
    email: (password: string) =>
      `mailto:?subject=${t('share-password')}&body=${encodeURIComponent(getShareText(password))}`,
  };

  return (
    <div
      className={`share-password-menu bg-[#E5F6FF] dark:bg-[#2d2d2d] flex flex-col gap-2 p-3`}
    >
      <button
        className="share-btn telegram flex items-center gap-2 bg-[#E5F6FF] dark:bg-[#2d2d2d] text-[#2A4E63] dark:text-white rounded-md px-3 py-2 border-none cursor-pointer font-medium transition-all hover:border-b-2 hover:border-[#2A4E63] dark:hover:bg-[#374151]"
        onClick={() => window.open(shareLinks.telegram(password), '_blank')}
      >
        <TelegramIcon sx={{ color: '#2AABEE' }} /> Telegram
      </button>
      <button
        className="share-btn whatsapp flex items-center gap-2 bg-[#E5F6FF] dark:bg-[#2d2d2d] text-[#2A4E63] dark:text-white rounded-md px-3 py-2 border-none cursor-pointer font-medium transition-all hover:border-b-2 hover:border-[#2A4E63] dark:hover:bg-[#374151]"
        onClick={() => window.open(shareLinks.whatsapp(password), '_blank')}
      >
        <WhatsAppIcon sx={{ color: '#25D366' }} /> WhatsApp
      </button>
      <button
        className="share-btn email flex items-center gap-2 bg-[#E5F6FF] dark:bg-[#2d2d2d] text-[#2A4E63] dark:text-white rounded-md px-3 py-2 border-none cursor-pointer font-medium transition-all hover:border-b-2 hover:border-[#2A4E63] dark:hover:bg-[#374151]"
        onClick={() => window.open(shareLinks.email(password), '_blank')}
      >
        <EmailIcon sx={{ color: '#EA4335' }} /> Email
      </button>
    </div>
  );
};

export default SharePassword;
