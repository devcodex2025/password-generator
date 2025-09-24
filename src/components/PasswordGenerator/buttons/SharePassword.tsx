import React from 'react';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import { useTranslation } from 'react-i18next';

interface SharePasswordProps {
  password: string;
  isDarkMode?: boolean;
}

const SharePassword: React.FC<SharePasswordProps> = ({ password, isDarkMode }) => {
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
      className={`share-password-menu bg-[#E5F6FF] ${isDarkMode ? '' : ''}`}
      style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '12px' }}
    >
      <button
        className="share-btn telegram"
        onClick={() => window.open(shareLinks.telegram(password), '_blank')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#E5F6FF',
          color: '#2A4E63',
          borderRadius: '6px',
          padding: '8px 12px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 500,
          transition: 'border-bottom 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderBottom = '2px solid #2A4E63')}
        onMouseLeave={(e) => (e.currentTarget.style.borderBottom = 'none')}
      >
        <TelegramIcon /> Telegram
      </button>
      <button
        className="share-btn whatsapp"
        onClick={() => window.open(shareLinks.whatsapp(password), '_blank')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#E5F6FF',
          color: '#2A4E63',
          borderRadius: '6px',
          padding: '8px 12px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 500,
          transition: 'border-bottom 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderBottom = '2px solid #2A4E63')}
        onMouseLeave={(e) => (e.currentTarget.style.borderBottom = 'none')}
      >
        <WhatsAppIcon /> WhatsApp
      </button>
      <button
        className="share-btn email"
        onClick={() => window.open(shareLinks.email(password), '_blank')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#E5F6FF',
          color: '#2A4E63',
          borderRadius: '6px',
          padding: '8px 12px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 500,
          transition: 'border-bottom 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderBottom = '2px solid #2A4E63')}
        onMouseLeave={(e) => (e.currentTarget.style.borderBottom = 'none')}
      >
        <EmailIcon /> Email
      </button>
    </div>
  );
};

export default SharePassword;
