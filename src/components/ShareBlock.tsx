'use client'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import ShareIcon from '@mui/icons-material/Share'
import seoData from './SeoData'

interface ShareBlockProps {
  className?: string
  title?: string
  hashtags?: string[]
  language?: string
}

// Keep the first render deterministic for SSR/hydration; the exact page URL is
// applied on the client after mount.
const SITE_URL = 'https://generatepasswordto.me'

const encode = (s: string) => encodeURIComponent(s)

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  className: 'h-[18px] w-[18px]',
}

function LinkGlyph() {
  return (
    <svg {...iconProps}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}

function CodeGlyph() {
  return (
    <svg {...iconProps}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

function MarkdownGlyph() {
  return (
    <svg {...iconProps}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M8 13v4" />
      <path d="M16 13v4" />
      <path d="m11 15-1.5 2L8 15" />
      <path d="m13 17 1.5-2 1.5 2" />
    </svg>
  )
}

function CheckGlyph() {
  return (
    <svg {...iconProps} className="h-[18px] w-[18px]">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function MailGlyph() {
  return (
    <svg {...iconProps}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  )
}

export default function ShareBlock({
  className,
  title = 'Generate secure passwords',
  hashtags = ['password', 'security', 'generator'],
  language = 'en',
}: ShareBlockProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState(false)
  const [copiedBB, setCopiedBB] = useState(false)
  const [copiedMD, setCopiedMD] = useState(false)
  const [copiedAction, setCopiedAction] = useState('')
  const panelId = useId()
  const contentRef = useRef<HTMLDivElement | null>(null)
  const [url, setUrl] = useState(SITE_URL)

  useEffect(() => {
    setUrl(window.location.href)
  }, [])

  // Collapsed panel content must not stay keyboard-focusable.
  useEffect(() => {
    const node = contentRef.current
    if (node) node.inert = !isOpen
  }, [isOpen])

  const preview = useMemo(() => {
    try {
      const found = Array.isArray(seoData) ? (seoData as any[]).find((s: any) => s.language === language) : null
      return {
        title: found?.title || 'Generate Password To Me',
        description: found?.description || 'Create strong, secure passwords that meet modern standards.',
      }
    } catch {
      return {
        title: 'Generate Password To Me',
        description: 'Create strong, secure passwords that meet modern standards.',
      }
    }
  }, [language])

  const t = useMemo(() => {
    const dict: Record<string, any> = {
      en: {
        share: 'Share',
        help: 'Help others find strong passwords',
        snippet: 'Generate strong, secure passwords instantly.',
        twitter: 'Twitter',
        facebook: 'Facebook',
        linkedin: 'LinkedIn',
        reddit: 'Reddit',
        telegram: 'Telegram',
        copyUrl: 'Copy URL',
        copied: 'Copied',
        copyBBCode: 'Copy BBCode',
        copyMarkdown: 'Copy Markdown',
        email: 'Share via Email',
      },
      ua: {
        share: 'Поділитись',
        help: 'Допоможіть іншим знайти надійні паролі',
        snippet: 'Генеруйте надійні та безпечні паролі миттєво.',
        twitter: 'Twitter',
        facebook: 'Facebook',
        linkedin: 'LinkedIn',
        reddit: 'Reddit',
        telegram: 'Telegram',
        copyUrl: 'Скопіювати URL',
        copied: 'Скопійовано',
        copyBBCode: 'Скопіювати BBCode',
        copyMarkdown: 'Скопіювати Markdown',
        email: 'Поділитись через email',
      },
      es: {
        share: 'Compartir',
        help: 'Ayuda a otros a encontrar contraseñas seguras',
        snippet: 'Genera contraseñas fuertes y seguras al instante.',
        twitter: 'Twitter',
        facebook: 'Facebook',
        linkedin: 'LinkedIn',
        reddit: 'Reddit',
        telegram: 'Telegram',
        copyUrl: 'Copiar URL',
        copied: 'Copiado',
        copyBBCode: 'Copiar BBCode',
        copyMarkdown: 'Copiar Markdown',
        email: 'Compartir por correo',
      },
      fr: {
        share: 'Partager',
        help: 'Aidez les autres à trouver des mots de passe solides',
        snippet: 'Générez des mots de passe forts et sécurisés instantanément.',
        twitter: 'Twitter',
        facebook: 'Facebook',
        linkedin: 'LinkedIn',
        reddit: 'Reddit',
        telegram: 'Telegram',
        copyUrl: 'Copier l’URL',
        copied: 'Copié',
        copyBBCode: 'Copier le BBCode',
        copyMarkdown: 'Copier Markdown',
        email: 'Partager par e-mail',
      },
      de: {
        share: 'Teilen',
        help: 'Anderen helfen, starke Passwörter zu finden',
        snippet: 'Erstellen Sie sofort starke, sichere Passwörter.',
        twitter: 'Twitter',
        facebook: 'Facebook',
        linkedin: 'LinkedIn',
        reddit: 'Reddit',
        telegram: 'Telegram',
        copyUrl: 'URL kopieren',
        copied: 'Kopiert',
        copyBBCode: 'BBCode kopieren',
        copyMarkdown: 'Markdown kopieren',
        email: 'Per E-Mail teilen',
      },
      it: {
        share: 'Condividi',
        help: 'Aiuta gli altri a trovare password sicure',
        snippet: 'Genera subito password forti e sicure.',
        twitter: 'Twitter',
        facebook: 'Facebook',
        linkedin: 'LinkedIn',
        reddit: 'Reddit',
        telegram: 'Telegram',
        copyUrl: 'Copia URL',
        copied: 'Copiato',
        copyBBCode: 'Copia BBCode',
        copyMarkdown: 'Copia Markdown',
        email: 'Condividi via email',
      },
      pt: {
        share: 'Compartilhar',
        help: 'Ajude outros a encontrar senhas fortes',
        snippet: 'Gere senhas fortes e seguras instantaneamente.',
        twitter: 'Twitter',
        facebook: 'Facebook',
        linkedin: 'LinkedIn',
        reddit: 'Reddit',
        telegram: 'Telegram',
        copyUrl: 'Copiar URL',
        copied: 'Copiado',
        copyBBCode: 'Copiar BBCode',
        copyMarkdown: 'Copiar Markdown',
        email: 'Compartilhar por e-mail',
      },
      ru: {
        share: 'Поделиться',
        help: 'Помогите другим находить надёжные пароли',
        snippet: 'Создавайте надёжные и безопасные пароли мгновенно.',
        twitter: 'Twitter',
        facebook: 'Facebook',
        linkedin: 'LinkedIn',
        reddit: 'Reddit',
        telegram: 'Telegram',
        copyUrl: 'Копировать URL',
        copied: 'Скопировано',
        copyBBCode: 'Копировать BBCode',
        copyMarkdown: 'Копировать Markdown',
        email: 'Поделиться по email',
      },
      zh: {
        share: '分享',
        help: '帮助他人找到强密码',
        snippet: '立即生成强大且安全的密码。',
        twitter: 'Twitter',
        facebook: 'Facebook',
        linkedin: 'LinkedIn',
        reddit: 'Reddit',
        telegram: 'Telegram',
        copyUrl: '复制链接',
        copied: '已复制',
        copyBBCode: '复制 BBCode',
        copyMarkdown: '复制 Markdown',
        email: '通过邮件分享',
      },
      ja: {
        share: '共有',
        help: '他の人が強力なパスワードを見つけるのを助けましょう',
        snippet: '強力で安全なパスワードをすぐに生成。',
        twitter: 'Twitter',
        facebook: 'Facebook',
        linkedin: 'LinkedIn',
        reddit: 'Reddit',
        telegram: 'Telegram',
        copyUrl: 'URLをコピー',
        copied: 'コピーしました',
        copyBBCode: 'BBCodeをコピー',
        copyMarkdown: 'Markdownをコピー',
        email: 'メールで共有',
      },
      pl: {
        share: 'Udostępnij',
        help: 'Pomóż innym znaleźć silne hasła',
        snippet: 'Generuj od razu silne i bezpieczne hasła.',
        twitter: 'Twitter',
        facebook: 'Facebook',
        linkedin: 'LinkedIn',
        reddit: 'Reddit',
        telegram: 'Telegram',
        copyUrl: 'Kopiuj URL',
        copied: 'Skopiowano',
        copyBBCode: 'Kopiuj BBCode',
        copyMarkdown: 'Kopiuj Markdown',
        email: 'Udostępnij e-mailem',
      },
    }

    return dict[language] || dict.en
  }, [language])

  const shareText = useMemo(() => {
    const baseCandidate = title && title.trim().length > 0 ? title : preview.title || t.snippet
    return baseCandidate.length > 140 ? baseCandidate.slice(0, 137) + '...' : baseCandidate
  }, [title, preview.title, t.snippet])

  const ga = (event: string, params: Record<string, any> = {}) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', event, params)
    }
  }

  const share = useMemo(() => {
    const text = shareText
    const hash = hashtags.join(',')

    return {
      twitter: `https://twitter.com/intent/tweet?url=${encode(url)}&text=${encode(text)}&hashtags=${encode(hash)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encode(url)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encode(url)}&title=${encode(text)}&summary=${encode(preview.description)}`,
      reddit: `https://www.reddit.com/submit?url=${encode(url)}&title=${encode(text)}&resubmit=true&type=link`,
      telegram: `https://t.me/share/url?url=${encode(url)}&text=${encode(text)}`,
      email: `mailto:?subject=${encode(text)}&body=${encode(url)}`,
      copy: url,
      bbcode: `[url=${url}]${text}[/url]`,
      markdown: `[${text}](${url})`,
    }
  }, [url, shareText, preview.description, hashtags])

  const writeToClipboard = async (value: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value)
        return true
      }
    } catch (_) {
      // Fall through to the legacy path (older browsers, denied permissions).
    }

    try {
      const textarea = document.createElement('textarea')
      textarea.value = value
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(textarea)
      return ok
    } catch (_) {
      return false
    }
  }

  const onCopy = async (
    value: string,
    setState: (v: boolean) => void,
    label: string,
    type: 'url' | 'bbcode' | 'markdown'
  ) => {
    const ok = await writeToClipboard(value)
    if (!ok) return

    setState(true)
    setCopiedAction(label)
    window.setTimeout(() => {
      setState(false)
      setCopiedAction('')
    }, 1800)
    ga('share_copy', { type, language })
  }

  const onShareClick = (network: string) => {
    ga('share_click', { network, language })
  }

  const copyButtonBase =
    'inline-flex min-h-[46px] items-center justify-center gap-2 rounded-2xl px-3 py-2.5 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05a9ff] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#1c1c1c] sm:text-sm'
  const copyButtonIdle =
    'bg-[#F1F5F9] text-[#071016] hover:bg-[#E2E8F0] dark:bg-[#23272f] dark:text-[#e0e0e0] dark:hover:bg-[#2f343d]'
  const copyButtonCopied =
    'bg-[#DCFCE7] text-[#166534] ring-1 ring-[#86EFAC] dark:bg-[#12352a] dark:text-[#86efac] dark:ring-[#166534]'
  const copyButtonPrimary =
    'bg-[#2A4E63] text-white hover:bg-[#1f3b4c] dark:bg-[#05a9ff] dark:text-[#071016] dark:hover:bg-[#38beff]'

  return (
    <div className={`overflow-hidden rounded-24 border border-[#E5F6FF] bg-white dark:border-[#374151] dark:bg-[#1c1c1c] ${className || ''}`}>
      <button
        type="button"
        className="group flex w-full items-center justify-between gap-3 p-4 text-left transition-colors hover:bg-[#F8FBFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#05a9ff] dark:hover:bg-[#232323] sm:p-5"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E5F6FF] text-[#2A4E63] dark:bg-[#0e3a4d] dark:text-[#7dd3fc]">
            <ShareIcon fontSize="small" />
          </span>
          <span className="min-w-0">
            <span className="block text-base font-semibold text-[#071016] dark:text-[#e0e0e0]">{t.share}</span>
            <span className="block text-sm text-gray-500 dark:text-gray-300">{t.help}</span>
          </span>
        </span>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#3a6077] transition-colors group-hover:bg-[#E5F6FF] dark:text-[#d7f2ff] dark:group-hover:bg-[#2a2a2a]">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          >
            <path fill="currentColor" d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
          </svg>
        </span>
      </button>

      <div
        id={panelId}
        aria-hidden={!isOpen}
        className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div ref={contentRef} className="overflow-hidden">
          <div className="border-t border-[#E5F6FF] p-4 dark:border-[#2f343d] sm:p-5">
            <div className="mb-4 flex items-center gap-3 rounded-2xl border border-[#E5F6FF] bg-gradient-to-r from-[#F8FBFF] to-white p-3 dark:border-[#2f343d] dark:from-[#111418] dark:to-[#16181c]">
              <div className="flex h-11 w-16 shrink-0 items-center justify-center rounded-xl bg-white ring-1 ring-black/5 dark:bg-[#1a1f24] dark:ring-white/10">
                <Image
                  src="/images/logo.svg"
                  alt=""
                  width={405}
                  height={92}
                  className="h-5 w-auto object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[#071016] dark:text-[#e0e0e0]">{preview.title}</p>
                <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-[#374151] dark:text-[#9ca3af]">
                  {preview.description}
                </p>
              </div>
            </div>

            <div className="mb-4 flex flex-wrap items-center gap-2.5">
              <a href={share.twitter} title={t.twitter} aria-label={t.twitter} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F1F5F9] text-[#0f1419] ring-1 ring-black/5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05a9ff] focus-visible:ring-offset-2 dark:bg-white/10 dark:text-white dark:ring-white/10 dark:hover:bg-white/15 dark:focus-visible:ring-offset-[#1c1c1c]" onClick={() => onShareClick('twitter')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href={share.facebook} title={t.facebook} aria-label={t.facebook} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E7F3FF] ring-1 ring-black/5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#d6e9ff] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05a9ff] focus-visible:ring-offset-2 dark:bg-[#1877F2]/15 dark:ring-white/10 dark:hover:bg-[#1877F2]/25 dark:focus-visible:ring-offset-[#1c1c1c]" onClick={() => onShareClick('facebook')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true"><path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495v-9.294H9.847V11.06h2.973V8.41c0-2.94 1.796-4.543 4.417-4.543 1.256 0 2.337.093 2.651.135v3.073l-1.82.001c-1.428 0-1.703.679-1.703 1.674v2.19h3.406l-.444 3.646h-2.962V24h5.807C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z"/></svg>
              </a>
              <a href={share.linkedin} title={t.linkedin} aria-label={t.linkedin} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E8F1FA] ring-1 ring-black/5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#dbe9f7] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05a9ff] focus-visible:ring-offset-2 dark:bg-[#0A66C2]/15 dark:ring-white/10 dark:hover:bg-[#0A66C2]/25 dark:focus-visible:ring-offset-[#1c1c1c]" onClick={() => onShareClick('linkedin')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM6.814 20.452H3.861V9h2.953v11.452z"/></svg>
              </a>
              <a href={share.reddit} title={t.reddit} aria-label={t.reddit} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF0E6] ring-1 ring-black/5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ffe6d6] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05a9ff] focus-visible:ring-offset-2 dark:bg-[#FF4500]/15 dark:ring-white/10 dark:hover:bg-[#FF4500]/25 dark:focus-visible:ring-offset-[#1c1c1c]" onClick={() => onShareClick('reddit')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF4500" aria-hidden="true"><path d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-7.5-2.25a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zm-9 0a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM12 19.5c2.485 0 4.5-1.12 4.5-2.5 0-.275-.225-.5-.5-.5s-.5.225-.5.5c0 .69-1.567 1.5-3.5 1.5s-3.5-.81-3.5-1.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5c0 1.38 2.015 2.5 4.5 2.5zm7.19-7.34a1.66 1.66 0 10-2.34-2.34c-.54-.31-1.19-.5-1.88-.53l.64-3.01 2.09.44a1.16 1.16 0 101.18-.86 1.16 1.16 0 00-1.07.7l-2.41-.51a.5.5 0 00-.59.39l-.77 3.65c-1.69.07-3.2.59-4.25 1.38a1.66 1.66 0 10-2.44 2.25c-.02.15-.03.31-.03.47 0 2.49 2.91 4.5 6.5 4.5s6.5-2.01 6.5-4.5c0-.16-.01-.32-.03-.47z"/></svg>
              </a>
              <a href={share.telegram} title={t.telegram} aria-label={t.telegram} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E3F2FD] ring-1 ring-black/5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#d4ecff] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05a9ff] focus-visible:ring-offset-2 dark:bg-[#229ED9]/15 dark:ring-white/10 dark:hover:bg-[#229ED9]/25 dark:focus-visible:ring-offset-[#1c1c1c]" onClick={() => onShareClick('telegram')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#229ED9" aria-hidden="true"><path d="M9.036 15.804l-.377 5.308c.54 0 .774-.232 1.054-.51l2.534-2.43 5.25 3.84c.962.532 1.646.252 1.91-.89l3.46-16.188c.353-1.648-.596-2.296-1.628-1.89L1.12 10.2c-1.56.608-1.536 1.48-.265 1.878l5.7 1.78L18.78 6.4c.66-.404 1.26-.18.765.224"/></svg>
              </a>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => onCopy(share.copy, setCopiedUrl, 'URL', 'url')}
                className={`${copyButtonBase} ${copiedUrl ? copyButtonCopied : copyButtonPrimary}`}
              >
                {copiedUrl ? <CheckGlyph /> : <LinkGlyph />}
                <span>{copiedUrl ? t.copied : t.copyUrl}</span>
              </button>
              <button
                type="button"
                onClick={() => onCopy(share.bbcode, setCopiedBB, 'BBCode', 'bbcode')}
                className={`${copyButtonBase} ${copiedBB ? copyButtonCopied : copyButtonIdle}`}
              >
                {copiedBB ? <CheckGlyph /> : <CodeGlyph />}
                <span>{copiedBB ? t.copied : t.copyBBCode}</span>
              </button>
              <button
                type="button"
                onClick={() => onCopy(share.markdown, setCopiedMD, 'Markdown', 'markdown')}
                className={`${copyButtonBase} ${copiedMD ? copyButtonCopied : copyButtonIdle}`}
              >
                {copiedMD ? <CheckGlyph /> : <MarkdownGlyph />}
                <span>{copiedMD ? t.copied : t.copyMarkdown}</span>
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <a
                href={share.email}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#DBEAFE] px-3.5 py-2 text-sm font-medium text-[#2A4E63] transition-colors hover:bg-[#E5F6FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05a9ff] focus-visible:ring-offset-2 dark:border-[#374151] dark:text-[#7dd3fc] dark:hover:bg-[#23272f] dark:focus-visible:ring-offset-[#1c1c1c]"
                onClick={() => onShareClick('email')}
              >
                <MailGlyph />
                {t.email}
              </a>
              <span className="text-xs text-[#6b7280] dark:text-gray-400">generatepasswordto.me</span>
            </div>

            <span className="sr-only" role="status" aria-live="polite">
              {copiedAction ? `${t.copied}: ${copiedAction}` : ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
