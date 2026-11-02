'use client';

import { useEffect } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { resolveAffiliateUrl } from '@/content/affiliate/links';
import { useGeoCountry } from './useGeoCountry';

/* ── Copy (kept local to avoid touching the shared lang.json) ── */

type Copy = { title: string; body: string; cta: string; dismiss: string; ad: string };

const COPY: Record<string, Copy> = {
  en: {
    title: 'Password copied. Where will you keep it?',
    body: 'A password manager stores it encrypted and fills it in next time. A text file or your browser does not.',
    cta: 'Save in NordPass',
    dismiss: 'I already have a manager',
    ad: 'Ad · affiliate link',
  },
  ua: {
    title: 'Пароль скопійовано. Де ви його збережете?',
    body: 'Менеджер паролів збереже його зашифрованим і підставить наступного разу. Текстовий файл чи браузер — ні.',
    cta: 'Зберегти в NordPass',
    dismiss: 'У мене вже є менеджер',
    ad: 'Реклама · партнерське посилання',
  },
  es: {
    title: 'Contraseña copiada. ¿Dónde la vas a guardar?',
    body: 'Un gestor de contraseñas la guarda cifrada y la rellena la próxima vez. Un archivo de texto o el navegador, no.',
    cta: 'Guardar en NordPass',
    dismiss: 'Ya tengo un gestor',
    ad: 'Anuncio · enlace de afiliado',
  },
  fr: {
    title: 'Mot de passe copié. Où allez-vous le garder ?',
    body: 'Un gestionnaire le stocke chiffré et le remplit la prochaine fois. Un fichier texte ou le navigateur, non.',
    cta: 'Enregistrer dans NordPass',
    dismiss: "J'ai déjà un gestionnaire",
    ad: 'Publicité · lien affilié',
  },
  de: {
    title: 'Passwort kopiert. Wo bewahren Sie es auf?',
    body: 'Ein Passwort-Manager speichert es verschlüsselt und füllt es beim nächsten Mal aus. Eine Textdatei oder der Browser nicht.',
    cta: 'In NordPass speichern',
    dismiss: 'Ich habe schon einen Manager',
    ad: 'Anzeige · Affiliate-Link',
  },
  it: {
    title: 'Password copiata. Dove la conservi?',
    body: 'Un gestore di password la salva cifrata e la compila la prossima volta. Un file di testo o il browser no.',
    cta: 'Salva in NordPass',
    dismiss: 'Ho già un gestore',
    ad: 'Annuncio · link affiliato',
  },
  pt: {
    title: 'Senha copiada. Onde vai guardá-la?',
    body: 'Um gerenciador guarda a senha criptografada e preenche na próxima vez. Um arquivo de texto ou o navegador, não.',
    cta: 'Salvar no NordPass',
    dismiss: 'Já tenho um gerenciador',
    ad: 'Anúncio · link de afiliado',
  },
  ru: {
    title: 'Пароль скопирован. Где вы его сохраните?',
    body: 'Менеджер паролей сохранит его зашифрованным и подставит в следующий раз. Текстовый файл или браузер — нет.',
    cta: 'Сохранить в NordPass',
    dismiss: 'У меня уже есть менеджер',
    ad: 'Реклама · партнёрская ссылка',
  },
  zh: {
    title: '密码已复制。你要保存在哪里？',
    body: '密码管理器会加密保存并自动填充。文本文件或浏览器不会。',
    cta: '保存到 NordPass',
    dismiss: '我已经有管理器了',
    ad: '广告 · 联盟链接',
  },
  ja: {
    title: 'パスワードをコピーしました。どこに保存しますか？',
    body: 'パスワードマネージャーなら暗号化して保存し、次回自動入力できます。テキストファイルやブラウザではできません。',
    cta: 'NordPassに保存',
    dismiss: 'すでにマネージャーを使っています',
    ad: '広告 · アフィリエイトリンク',
  },
  pl: {
    title: 'Hasło skopiowane. Gdzie je zapiszesz?',
    body: 'Menedżer haseł zapisze je zaszyfrowane i uzupełni następnym razem. Plik tekstowy czy przeglądarka — nie.',
    cta: 'Zapisz w NordPass',
    dismiss: 'Mam już menedżera',
    ad: 'Reklama · link afiliacyjny',
  },
};

function copyFor(locale: string): Copy {
  return COPY[locale] ?? COPY.en;
}

const MAX_SHOWS = 2;
const SHOWN_KEY = 'spm_shown_count';
const SESSION_KEY = 'spm_shown_session';

/** Should the save prompt be shown for this visitor? */
export function shouldShowSavePrompt(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    if (sessionStorage.getItem(SESSION_KEY) === '1') return false;
    const shown = Number(localStorage.getItem(SHOWN_KEY) || '0');
    return Number.isFinite(shown) ? shown < MAX_SHOWS : true;
  } catch {
    return false;
  }
}

function markShown() {
  try {
    sessionStorage.setItem(SESSION_KEY, '1');
    const shown = Number(localStorage.getItem(SHOWN_KEY) || '0');
    localStorage.setItem(SHOWN_KEY, String((Number.isFinite(shown) ? shown : 0) + 1));
  } catch {
    /* storage can be blocked — fail closed */
  }
}

function track(event: string, locale: string) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', event, {
        event_category: 'affiliate',
        placement: 'save-modal',
        ui_language: locale,
        offer: 'nordpass',
      });
    }
    if (typeof window !== 'undefined' && typeof window.va === 'function') {
      window.va('event', { name: event, data: { placement: 'save-modal', locale } });
    }
  } catch {
    /* analytics must never break the UI */
  }
}

interface SavePasswordModalProps {
  locale: string;
  open: boolean;
  onClose: () => void;
}

export default function SavePasswordModal({ locale, open, onClose }: SavePasswordModalProps) {
  const c = copyFor(locale);
  const geo = useGeoCountry();
  const target = resolveAffiliateUrl('nordpass', { locale, placement: 'save-modal', geo });

  useEffect(() => {
    if (!open) return;
    track('save_modal_view', locale);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        markShown();
        track('save_modal_dismiss', locale);
        onClose();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, locale, onClose]);

  if (!open) return null;

  const dismiss = () => {
    markShown();
    track('save_modal_dismiss', locale);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[10050] flex items-end justify-center bg-black/50 p-3 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="save-password-modal-title"
      onClick={dismiss}
    >
      <div
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-[#1c1c1c]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-[#05a9ff]" aria-hidden="true" />
            <h2
              id="save-password-modal-title"
              className="text-[19px] font-bold leading-snug text-[#071016] dark:text-[#e0e0e0]"
            >
              {c.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={dismiss}
            aria-label={c.dismiss}
            className="shrink-0 rounded-full p-1 text-[#6b7280] transition hover:bg-black/5 dark:text-[#6b7280] dark:text-[#9ca3af] dark:hover:bg-white/10"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <p className="mt-3 text-[15px] leading-6 text-[#4B5563] dark:text-[#c7c7c7]">{c.body}</p>

        <a
          href={target.href}
          target="_blank"
          rel="sponsored noopener"
          onClick={() => {
            markShown();
            track('save_modal_cta', locale);
            onClose();
          }}
          data-affiliate="nordpass"
          data-placement="save-modal"
          className={cn(
            'mt-5 flex w-full items-center justify-center rounded-full bg-[#05a9ff] px-6 py-3.5',
            'text-[16px] font-semibold !text-[#0a1e2a] shadow-md transition hover:bg-[#38beff]'
          )}
        >
          {c.cta}
        </a>

        <button
          type="button"
          onClick={dismiss}
          className="mt-2 w-full rounded-full px-6 py-2.5 text-[14px] font-medium text-[#6b7280] transition hover:text-[#2A4E63] dark:text-[#6b7280] dark:text-[#9ca3af] dark:hover:text-white"
        >
          {c.dismiss}
        </button>

        <p className="mt-2 text-center text-[11px] italic text-[#6b7280] dark:text-[#9ca3af] dark:text-[#6B7280]">{c.ad}</p>
      </div>
    </div>
  );
}
