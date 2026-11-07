'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RefreshIcon from '@mui/icons-material/Refresh';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ActionBtn from './buttons/ActionBtn';
import HoldMenuItem from './buttons/HoldMenuItem';
import { menuPaperSx, shareTargets, useDensity } from './passwordActions';

interface PasswordRowProps {
  password: string;
  index: number;
  onGenerate: (index: number) => void;
  onCopy: (index: number) => void;
  /** Called with the share target key when a share link is opened. */
  onShare?: (target: string) => void;
  isAnimating: boolean;
  isDarkMode: boolean;
}

export default function PasswordRow({
  password,
  index,
  onGenerate,
  onCopy,
  onShare,
  isAnimating,
  isDarkMode,
}: PasswordRowProps) {
  const { t } = useTranslation();
  const fieldRef = useRef<HTMLDivElement>(null);
  const density = useDensity(fieldRef);
  const showLabel = density === 'labels';
  const [copied, setCopied] = useState(false);
  const [menu, setMenu] = useState<{ kind: 'more' | 'share'; anchor: HTMLElement } | null>(null);
  const closeMenu = () => setMenu(null);

  // the menu's anchor button disappears when the density changes
  useEffect(() => setMenu(null), [density]);

  const handleCopy = () => {
    onCopy(index);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const generate = () => onGenerate(index);


  const copyBtn = (
    <ActionBtn
      variant="primary"
      showLabel={showLabel}
      label={copied ? t('copied_short') : t('copy')}
      icon={copied ? <CheckIcon /> : <ContentCopyIcon />}
      disabled={!password || isAnimating}
      onClick={handleCopy}
    />
  );

  return (
    // BulkPasswords mirrors this wrapper and the pill below so its toolbar opens in the same spot
    <div className="my-3 w-full lg:my-1">
      <div
        ref={fieldRef}
        className="flex h-16 w-full min-w-0 items-center gap-1.5 rounded-[120px] border-2 border-solid border-[#E5F6FF] bg-white py-0 pl-4 pr-2 text-[#071016] dark:border-transparent dark:bg-[#000000]"
      >
        <label htmlFor={`password-output-${index}`} className="sr-only">{t('a11y_password_generated')}</label>
        <input
          id={`password-output-${index}`}
          type="text"
          value={password || ''}
          className="min-w-0 flex-1 border-none bg-transparent py-2 text-base outline-none dark:text-white md:text-lg"
          readOnly
        />
        {/* order: copy, share, generate */}
        {copyBtn}
        {density === 'menu' ? (
          <ActionBtn
            showLabel={false}
            label={t('a11y_more_actions')}
            icon={<MoreVertIcon />}
            aria-haspopup="menu"
            aria-expanded={menu?.kind === 'more'}
            onClick={(e) => setMenu({ kind: 'more', anchor: e.currentTarget })}
          />
        ) : (
          <>
            <ActionBtn
              showLabel={showLabel}
              label={t('share-password')}
              icon={<SendOutlinedIcon />}
              aria-haspopup="menu"
              aria-expanded={menu?.kind === 'share'}
              onClick={(e) => setMenu({ kind: 'share', anchor: e.currentTarget })}
            />
            <ActionBtn
              showLabel={showLabel}
              label={t('generate')}
              icon={<RefreshIcon />}
              onClick={generate}
              onLongPress={generate}
            />
          </>
        )}
      </div>
      <Menu
        anchorEl={menu?.anchor}
        open={!!menu}
        onClose={closeMenu}
        // the default scroll lock hides the page scrollbar, which shifts the layout
        disableScrollLock
        PaperProps={{ sx: menuPaperSx(isDarkMode) }}
      >
        {menu?.kind === 'more' && [
          <HoldMenuItem
            key="generate"
            onClick={() => { generate(); closeMenu(); }}
            onLongPress={generate}
            onHoldEnd={closeMenu}
          >
            <ListItemIcon sx={{ color: 'inherit' }}><RefreshIcon /></ListItemIcon>
            {t('generate')}
          </HoldMenuItem>,
          <Divider key="divider" />,
          <ListSubheader key="share" sx={{ bgcolor: 'transparent', color: 'inherit', lineHeight: '32px' }}>
            {t('share-password')}
          </ListSubheader>,
        ]}
        {shareTargets(`${t('share_message')}${password}`, t('share-password')).map(({ key, label, Icon, color, href }) => (
          <MenuItem
            key={key}
            component="a"
            href={href}
            {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
            onClick={() => {
              onShare?.(key);
              closeMenu();
            }}
          >
            <ListItemIcon><Icon sx={{ color }} /></ListItemIcon>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
