'use client'
import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import seoData from './SeoData'

interface ShareBlockProps {
  className?: string
  title?: string
  hashtags?: string[]
  language?: string
}

const SITE_URL = typeof window !== 'undefined' ? window.location.origin : 'https://generatepasswordto.me'

const encode = (s: string) => encodeURIComponent(s)

export default function ShareBlock({ className, title = 'Generate secure passwords', hashtags = ['password', 'security', 'generator'], language = 'en' }: ShareBlockProps) {
  const [copiedUrl, setCopiedUrl] = useState(false)
  const [copiedBB, setCopiedBB] = useState(false)
  const [copiedMD, setCopiedMD] = useState(false)
  const url = typeof window !== 'undefined' ? window.location.href : SITE_URL
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
        hn: 'HN',
        copyUrl: 'Copy URL',
        copied: 'Copied',
        copyBBCode: 'Copy BBCode',
        copyMarkdown: 'Copy Markdown',
        email: 'Share via Email',
      },
      ua: {
        share: 'Поділитися',
        help: 'Допоможіть іншим знаходити надійні паролі',
        snippet: 'Генеруйте надійні, безпечні паролі миттєво.',
        twitter: 'Twitter',
        facebook: 'Facebook',
        linkedin: 'LinkedIn',
        reddit: 'Reddit',
        telegram: 'Telegram',
        hn: 'HN',
        copyUrl: 'Скопіювати URL',
        copied: 'Скопійовано',
        copyBBCode: 'Скопіювати BBCode',
        copyMarkdown: 'Скопіювати Markdown',
        email: 'Поділитися електронною поштою',
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
        hn: 'HN',
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
        hn: 'HN',
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
        hn: 'HN',
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
        hn: 'HN',
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
        hn: 'HN',
        copyUrl: 'Copiar URL',
        copied: 'Copiado',
        copyBBCode: 'Copiar BBCode',
        copyMarkdown: 'Copiar Markdown',
        email: 'Compartilhar por e-mail',
      },
      ru: {
        share: 'Поделиться',
        help: 'Помогите другим находить надёжные пароли',
        snippet: 'Создавайте надёжные, безопасные пароли мгновенно.',
        twitter: 'Twitter',
        facebook: 'Facebook',
        linkedin: 'LinkedIn',
        reddit: 'Reddit',
        telegram: 'Telegram',
        hn: 'HN',
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
        hn: 'HN',
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
        hn: 'HN',
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
        hn: 'HN',
        copyUrl: 'Kopiuj URL',
        copied: 'Skopiowano',
        copyBBCode: 'Kopiuj BBCode',
        copyMarkdown: 'Kopiuj Markdown',
        email: 'Udostępnij e-mailem',
      },
    }
    return dict[language] || dict.en
  }, [language])

  // Localized short share text (safe for networks with limits)
  const shareText = useMemo(() => {
    const base = preview.title || t.snippet
    return base.length > 140 ? base.slice(0, 137) + '…' : base
  }, [preview.title, t.snippet])

  const share = useMemo(() => {
    const text = shareText
    const hash = hashtags.join(',')
    return {
      twitter: `https://twitter.com/intent/tweet?url=${encode(url)}&text=${encode(text)}&hashtags=${encode(hash)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encode(url)}`,
      // LinkedIn: use title+summary where supported
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encode(url)}&title=${encode(text)}&summary=${encode(preview.description)}`,
      reddit: `https://www.reddit.com/submit?url=${encode(url)}&title=${encode(text)}`,
      telegram: `https://t.me/share/url?url=${encode(url)}&text=${encode(text)}`,
      hackernews: `https://news.ycombinator.com/submitlink?u=${encode(url)}&t=${encode(text)}`,
      email: `mailto:?subject=${encode(text)}&body=${encode(url)}`,
      copy: url,
      bbcode: `[url=${url}]${text}[/url]`,
      markdown: `[${text}](${url})`,
    }
  }, [url, shareText, preview.description, hashtags])

  const onCopy = async (value: string, setState: (v: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(value)
      setState(true)
      setTimeout(() => setState(false), 1500)
    } catch (_) {}
  }

  return (
    <div className={`rounded-24 border border-[#E5F6FF] dark:border-[#374151] bg-white dark:bg-[#1c1c1c] p-4 ${className || ''}`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-[#071016] dark:text-[#e0e0e0] font-semibold">{t.share}</h4>
        <span className="text-sm text-gray-500 dark:text-gray-300">{t.help}</span>
      </div>
      <div className="mb-4 flex items-start gap-3 rounded-24 border border-[#E5F6FF] dark:border-[#2f343d] bg-[#F8FBFF] dark:bg-[#111418] p-3">
        <div className="shrink-0 w-10 h-10 rounded-lg bg-white dark:bg-[#1a1f24] flex items-center justify-center border border-[#E5F6FF] dark:border-[#2f343d]">
          <Image src="/images/logo.svg" alt="Logo" width={20} height={20} />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-[#071016] dark:text-[#e0e0e0] truncate">{preview.title}</div>
          <div className="text-xs text-[#374151] dark:text-[#9ca3af] line-clamp-2">{preview.description}</div>
        </div>
      </div>
      <div className="grid grid-cols-6 sm:grid-cols-6 md:grid-cols-6 gap-3">
        <a href={share.twitter} title={t.twitter} aria-label={t.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-[#E8F5FD] hover:bg-[#d7eefe] ring-1 ring-black/5 dark:ring-white/10 transition">
          <Image src="/images/twitter.png" alt={t.twitter} width={18} height={18} className="object-contain" />
        </a>
        <a href={share.facebook} title={t.facebook} aria-label={t.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-[#E7F3FF] hover:bg-[#d6e9ff] ring-1 ring-black/5 dark:ring-white/10 transition">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true"><path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495v-9.294H9.847V11.06h2.973V8.41c0-2.94 1.796-4.543 4.417-4.543 1.256 0 2.337.093 2.651.135v3.073l-1.82.001c-1.428 0-1.703.679-1.703 1.674v2.19h3.406l-.444 3.646h-2.962V24h5.807C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z"/></svg>
        </a>
        <a href={share.linkedin} title={t.linkedin} aria-label={t.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-[#EEF3F8] hover:bg-[#e1ebf4] ring-1 ring-black/5 dark:ring-white/10 transition">
          <Image src="/images/linkdIn.png" alt={t.linkedin} width={18} height={18} className="object-contain" />
        </a>
        <a href={share.reddit} title={t.reddit} aria-label={t.reddit} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-[#FFF0E6] hover:bg-[#ffe6d6] ring-1 ring-black/5 dark:ring-white/10 transition">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF4500" aria-hidden="true"><path d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-7.5-2.25a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zm-9 0a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM12 19.5c2.485 0 4.5-1.12 4.5-2.5 0-.275-.225-.5-.5-.5s-.5.225-.5.5c0 .69-1.567 1.5-3.5 1.5s-3.5-.81-3.5-1.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5c0 1.38 2.015 2.5 4.5 2.5zm7.19-7.34a1.66 1.66 0 10-2.34-2.34c-.54-.31-1.19-.5-1.88-.53l.64-3.01 2.09.44a1.16 1.16 0 101.18-.86 1.16 1.16 0 00-1.07.7l-2.41-.51a.5.5 0 00-.59.39l-.77 3.65c-1.69.07-3.2.59-4.25 1.38a1.66 1.66 0 10-2.44 2.25c-.02.15-.03.31-.03.47 0 2.49 2.91 4.5 6.5 4.5s6.5-2.01 6.5-4.5c0-.16-.01-.32-.03-.47z"/></svg>
        </a>
        <a href={share.telegram} title={t.telegram} aria-label={t.telegram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-[#E3F2FD] hover:bg-[#d4ecff] ring-1 ring-black/5 dark:ring-white/10 transition">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#229ED9" aria-hidden="true"><path d="M9.036 15.804l-.377 5.308c.54 0 .774-.232 1.054-.51l2.534-2.43 5.25 3.84c.962.532 1.646.252 1.91-.89l3.46-16.188c.353-1.648-.596-2.296-1.628-1.89L1.12 10.2c-1.56.608-1.536 1.48-.265 1.878l5.7 1.78L18.78 6.4c.66-.404 1.26-.18.765.224"/></svg>
        </a>
        <a href={share.hackernews} title={t.hn} aria-label={t.hn} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-[#FFF4E5] hover:bg-[#ffecd1] ring-1 ring-black/5 dark:ring-white/10 transition">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF6600" aria-hidden="true"><path d="M3 3h18v18H3V3zm9.8 9.7l3.7 6.3h-2.2l-2.6-4.7-2.6 4.7H6.9l3.8-6.3V6.9h2.1v5.8z"/></svg>
        </a>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <button onClick={() => onCopy(share.copy, setCopiedUrl)} className="rounded-24 px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-[#23272f] dark:hover:bg-[#2f343d] text-[#071016] dark:text-[#e0e0e0] transition text-xs sm:text-sm whitespace-normal break-words text-center min-h-[38px]">{copiedUrl ? t.copied : t.copyUrl}</button>
        <button onClick={() => onCopy(share.bbcode, setCopiedBB)} className="rounded-24 px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-[#23272f] dark:hover:bg-[#2f343d] text-[#071016] dark:text-[#e0e0e0] transition text-xs sm:text-sm whitespace-normal break-words text-center min-h-[38px]">{copiedBB ? t.copied : t.copyBBCode}</button>
        <button onClick={() => onCopy(share.markdown, setCopiedMD)} className="rounded-24 px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-[#23272f] dark:hover:bg-[#2f343d] text-[#071016] dark:text-[#e0e0e0] transition text-xs sm:text-sm whitespace-normal break-words text-center min-h-[38px]">{copiedMD ? t.copied : t.copyMarkdown}</button>
      </div>
      <div className="mt-3">
        <a href={share.email} className="text-sm text-[#2A4E63] hover:underline">{t.email}</a>
      </div>
    </div>
  )
}


