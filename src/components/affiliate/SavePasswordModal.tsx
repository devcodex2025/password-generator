'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { resolveAffiliateUrl } from '@/content/affiliate/links';
import { announceModalOpen, subscribeModalOpen } from '@/lib/modal-coordination';
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

/**
 * The prompt is shown on every copy action. It only appears after an explicit
 * user gesture, so it stays intentional rather than interrupting the page.
 */
export function shouldShowSavePrompt(): boolean {
  return typeof window !== 'undefined';
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

    // Only one dialog at a time: announce this one and step aside if the
    // bookmark instructions open on top of it.
    announceModalOpen('save-password');
    const unsubscribe = subscribeModalOpen((id) => {
      if (id === 'save-password') return;
      track('save_modal_dismiss', locale);
      onClose();
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        track('save_modal_dismiss', locale);
        onClose();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      unsubscribe();
      document.removeEventListener('keydown', onKey);
    };
  }, [open, locale, onClose]);

  if (!open) return null;

  const dismiss = () => {
    track('save_modal_dismiss', locale);
    onClose();
  };

  // Render in a body portal: the generator card uses a CSS filter for its
  // shadow, which otherwise makes `position: fixed` cover only that card.
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[10050] flex items-end justify-center bg-[#071016]/45 p-3 backdrop-blur-[2px] sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="save-password-modal-title"
      onClick={dismiss}
    >
      <div
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl border border-[#E5F6FF] bg-white p-6 shadow-2xl ring-1 ring-[#2A4E63]/5 dark:border-[#374151] dark:bg-[#1c1c1c] dark:ring-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EAF8FF] text-[#2A4E63] dark:bg-[#05a9ff]/15 dark:text-[#38beff]">
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2
              id="save-password-modal-title"
              className="mt-1 text-[19px] font-bold leading-snug text-[#071016] dark:text-[#e0e0e0]"
            >
              {c.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={dismiss}
            aria-label={c.dismiss}
            className="shrink-0 rounded-full p-1 text-[#6b7280] transition hover:bg-[#EAF8FF] hover:text-[#2A4E63] dark:text-[#9ca3af] dark:hover:bg-white/10 dark:hover:text-white"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <p className="mt-4 text-[15px] leading-6 text-[#374151] dark:text-[#c7c7c7]">{c.body}</p>

        <a
          href={target.href}
          target="_blank"
          rel="sponsored noopener"
          onClick={() => {
            track('save_modal_cta', locale);
            onClose();
          }}
          data-affiliate="nordpass"
          data-placement="save-modal"
          className={cn(
            'mt-5 flex w-full items-center justify-center rounded-full bg-[#05a9ff] px-6 py-3.5',
            'text-[16px] font-semibold !text-[#0a1e2a] shadow-md transition hover:bg-[#38beff]',
            'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#05a9ff]/30'
          )}
        >
          {c.cta}
        </a>

        <button
          type="button"
          onClick={dismiss}
          className="mt-2 w-full rounded-full px-6 py-2.5 text-[14px] font-medium text-[#6b7280] transition hover:bg-[#EAF8FF] hover:text-[#2A4E63] dark:text-[#9ca3af] dark:hover:bg-white/5 dark:hover:text-white"
        >
          {c.dismiss}
        </button>

        <p className="mt-2 text-center text-[11px] italic text-[#6b7280] dark:text-[#9ca3af]">{c.ad}</p>
      </div>
    </div>,
    document.body
  );
}
