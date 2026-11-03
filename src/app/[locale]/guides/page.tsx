import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getCachedGuides } from '@/lib/cached-content';
import { homeHref } from '@/lib/locale-links';
import { getGuideCategoryLabel, getGuidesUiLabels } from '@/lib/guides-i18n';
import { formatGuideDate, getGuidesUiCopy } from '@/lib/guides-ui';
import { ARTICLE_CATALOG, SUPPORTED_CONTENT_LANGUAGES } from '@/content/articles';
import LocalizedPageShell from '@/components/LocalizedPageShell';
import Breadcrumbs from '@/components/Breadcrumbs';
import GuideReadButton from '@/components/GuideReadButton';
import NordPassAffiliatePromo from '@/components/affiliate/NordPassAffiliatePromo';

const baseUrl = 'https://www.generatepasswordto.me';
const hreflangMap: Record<string, string> = { ua: 'uk' };
export const runtime = 'nodejs';
export const revalidate = 3600;

const guidesMetaI18n: Record<string, { title: string; description: string }> = {
  en: {
    title: 'Password Security Guides — Expert Articles & Best Practices',
    description: 'In-depth guides about password security, compliance standards (NIST, PCI DSS), breach recovery, 2FA setup, and account protection best practices.',
  },
  ua: {
    title: 'Гайди з безпеки паролів — експертні статті та найкращі практики',
    description: 'Детальні гайди з безпеки паролів, стандартів відповідності (NIST, PCI DSS), відновлення після витоків, налаштування 2FA та захисту акаунтів.',
  },
  es: {
    title: 'Guías de seguridad de contraseñas — Artículos y buenas prácticas',
    description: 'Guías detalladas sobre seguridad de contraseñas, estándares de cumplimiento (NIST, PCI DSS), recuperación tras brechas, configuración de 2FA y protección de cuentas.',
  },
  fr: {
    title: 'Guides de sécurité des mots de passe — Articles experts et bonnes pratiques',
    description: 'Guides approfondis sur la sécurité des mots de passe, les normes de conformité (NIST, PCI DSS), la récupération après violation, la configuration 2FA et la protection des comptes.',
  },
  de: {
    title: 'Passwortsicherheits-Ratgeber — Fachartikel und Best Practices',
    description: 'Ausführliche Ratgeber zu Passwortsicherheit, Compliance-Standards (NIST, PCI DSS), Wiederherstellung nach Datenlecks, 2FA-Einrichtung und Kontoschutz.',
  },
  it: {
    title: 'Guide alla sicurezza delle password — Articoli e best practice',
    description: 'Guide approfondite sulla sicurezza delle password, standard di conformità (NIST, PCI DSS), recupero dopo violazioni, configurazione 2FA e protezione degli account.',
  },
  pt: {
    title: 'Guias de segurança de senhas — Artigos e boas práticas',
    description: 'Guias detalhados sobre segurança de senhas, padrões de conformidade (NIST, PCI DSS), recuperação após violações, configuração de 2FA e proteção de contas.',
  },
  ru: {
    title: 'Руководства по безопасности паролей — экспертные статьи и лучшие практики',
    description: 'Подробные руководства по безопасности паролей, стандартам соответствия (NIST, PCI DSS), восстановлению после утечек, настройке 2FA и защите аккаунтов.',
  },
  zh: {
    title: '密码安全指南 — 专家文章与最佳实践',
    description: '深入了解密码安全、合规标准（NIST、PCI DSS）、泄露恢复、2FA设置及账户保护的最佳实践指南。',
  },
  ja: {
    title: 'パスワードセキュリティガイド — 専門記事とベストプラクティス',
    description: 'パスワードセキュリティ、コンプライアンス基準（NIST、PCI DSS）、漏洩後の復旧、2FA設定、アカウント保護に関する詳細ガイド。',
  },
  pl: {
    title: 'Przewodniki bezpieczeństwa haseł — artykuły eksperckie i najlepsze praktyki',
    description: 'Szczegółowe przewodniki dotyczące bezpieczeństwa haseł, standardów zgodności (NIST, PCI DSS), odzyskiwania po wycieku danych, konfiguracji 2FA i ochrony kont.',
  },
  vi: {
    title: 'Hướng dẫn bảo mật mật khẩu — bài viết chuyên sâu và thực hành tốt',
    description: 'Hướng dẫn chuyên sâu về bảo mật mật khẩu, tiêu chuẩn tuân thủ (NIST, PCI DSS), khắc phục sau rò rỉ dữ liệu, thiết lập 2FA và bảo vệ tài khoản.',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  // The VI guide index can be indexed once every catalog guide has a vi body.
  const hasVi = ARTICLE_CATALOG.every((article) => Boolean(article.content.vi));
  const isFallbackLocale = locale === 'vi' && !hasVi;
  const canonical = isFallbackLocale ? `${baseUrl}/en/guides` : `${baseUrl}/${locale}/guides`;
  const meta = guidesMetaI18n[locale] || guidesMetaI18n.en;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
      languages: {
        ...Object.fromEntries(
          SUPPORTED_CONTENT_LANGUAGES.filter((lang) => lang !== 'vi' || hasVi).map((lang) => [
            hreflangMap[lang] || lang,
            `${baseUrl}/${lang}/guides`,
          ])
        ),
        'x-default': `${baseUrl}/en/guides`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      siteName: 'generatepasswordto.me',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/generate-password-preview.png`,
          width: 1200,
          height: 630,
          alt: 'Password Security Guides',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [`${baseUrl}/images/generate-password-preview.png`],
    },
    robots: {
      index: !isFallbackLocale,
      follow: true,
      googleBot: {
        index: !isFallbackLocale,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function GuidesIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const labels = getGuidesUiLabels(locale);
  const uiCopy = getGuidesUiCopy(locale);
  const guides = await getCachedGuides(locale);
  const canonical = `${baseUrl}/${locale}/guides`;
  const meta = guidesMetaI18n[locale] || guidesMetaI18n.en;

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: meta.title,
    description: meta.description,
    url: canonical,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: guides.length,
      itemListElement: guides.map((guide, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: guide.title,
        description: guide.excerpt,
        url: `${baseUrl}/${locale}/guides/${guide.slug}`,
        image: guide.image.startsWith('http') ? guide.image : `${baseUrl}${guide.image}`,
        dateModified: guide.updatedAt,
      })),
    },
  };

  return (
    <LocalizedPageShell locale={locale}>
      <script
        id="guides-collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <section className="max-w-6xl mx-auto px-4 py-10">
        <Breadcrumbs
          language={locale}
          items={[
            { label: labels.home, href: homeHref(locale) },
            { label: labels.guides },
          ]}
        />
        <h1 className="mt-4 text-3xl md:text-4xl font-bold text-[#071016] dark:text-[#e0e0e0]">{labels.guidesTitle}</h1>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          {guides.map((guide, index) => {
            return (
              <article
                key={guide.slug}
                className="group overflow-hidden rounded-24 border border-[#E5F6FF] dark:border-[#374151] bg-white dark:bg-[#171717] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_35px_-20px_rgba(42,78,99,0.65)] hover:border-[#c7eefe] dark:hover:border-[#4b5563]"
              >
                <Link href={`/${locale}/guides/${guide.slug}`} className="block">
                  <div className="relative w-full overflow-hidden aspect-[16/7] bg-[#E5F6FF] dark:bg-[#111827]">
                    <Image
                      src={guide.image}
                      alt={`${guide.title} — ${getGuideCategoryLabel(locale, guide.category)}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index < 2}
                      fetchPriority={index < 2 ? 'high' : 'auto'}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <div className="guide-category-label mt-3 text-xs uppercase tracking-wide text-[#2A4E63] dark:text-[#9ca3af]">
                    {getGuideCategoryLabel(locale, guide.category)}
                  </div>
                  <h2 className="mt-1.5 text-lg font-semibold text-[#071016] dark:text-[#e0e0e0]">
                    <Link
                      href={`/${locale}/guides/${guide.slug}`}
                      className="rounded-sm !text-[#071016] dark:!text-[#e0e0e0] transition-all duration-200 hover:!text-[#2A4E63] dark:hover:!text-[#d7f2ff] hover:underline underline-offset-4 decoration-2"
                    >
                      {guide.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-sm text-[#374151] dark:text-[#c7c7c7] line-clamp-2">{guide.excerpt}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-[#2A4E63] dark:text-[#9ca3af]">
                    <span>{uiCopy.minRead(guide.readingMinutes)}</span>
                    <span>{uiCopy.updatedLabel}: {formatGuideDate(locale, guide.updatedAt)}</span>
                  </div>
                  <GuideReadButton
                    href={`/${locale}/guides/${guide.slug}`}
                    label={labels.readGuide}
                    loadingLabel={uiCopy.loadingLabel}
                  />
                </div>
              </article>
            );
          })}
        </div>

        {/* Affiliate recommendation */}
        <NordPassAffiliatePromo
          locale={locale}
          className="mt-8"
          placement="guides-index"
        />
      </section>
    </LocalizedPageShell>
  );
}

