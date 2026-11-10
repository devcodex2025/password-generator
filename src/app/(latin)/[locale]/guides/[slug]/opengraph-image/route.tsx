import { ImageResponse } from 'next/og';
import { forParentLocale } from '@/lib/cjk-locales';
import { ARTICLE_CATALOG, getArticleBySlug, getArticleLocales, getLocalizedArticle } from '@/content/articles';
import type { ContentLanguage } from '@/content/articles';

export const runtime = 'nodejs';

const size = { width: 1200, height: 630 };

const categoryColors: Record<string, { bg: string; text: string; accent: string }> = {
  'security-basics': { bg: '#0c2d48', text: '#e0f4ff', accent: '#38bdf8' },
  policy: { bg: '#1a1a2e', text: '#e8e8ff', accent: '#818cf8' },
  implementation: { bg: '#0d2818', text: '#e0ffe8', accent: '#4ade80' },
  'incident-response': { bg: '#2d1208', text: '#ffe8d8', accent: '#fb923c' },
};

const categoryIcons: Record<string, string> = {
  'security-basics': '\u{1F512}',
  policy: '\u{1F4DC}',
  implementation: '\u{2699}\u{FE0F}',
  'incident-response': '\u{1F6A8}',
};

export function generateStaticParams({ params }: { params?: { locale?: string } } = {}) {
  return ARTICLE_CATALOG.flatMap((article) =>
    forParentLocale(getArticleLocales(article), params).map((locale) => ({ locale, slug: article.slug })),
  );
}

async function renderOgImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0c2d48',
            color: '#e0f4ff',
            fontSize: 48,
            fontWeight: 700,
          }}
        >
          generatepasswordto.me
        </div>
      ),
      { ...size },
    );
  }

  const localized = getLocalizedArticle(article, locale as ContentLanguage);
  const colors = categoryColors[article.category] || categoryColors['security-basics'];
  const icon = categoryIcons[article.category] || '\u{1F512}';

  const categoryLabel = article.category
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: colors.bg,
          padding: '60px 70px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${colors.accent}15, transparent 70%)`,
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -120,
            left: -60,
            width: 350,
            height: 350,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${colors.accent}10, transparent 70%)`,
            display: 'flex',
          }}
        />

        {/* Category badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: `${colors.accent}20`,
              border: `2px solid ${colors.accent}40`,
              borderRadius: '12px',
              padding: '8px 20px',
              fontSize: 22,
              fontWeight: 600,
              color: colors.accent,
              letterSpacing: '0.5px',
            }}
          >
            <span>{icon}</span>
            <span>{categoryLabel}</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: `${colors.accent}15`,
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: 18,
              color: `${colors.accent}cc`,
              fontWeight: 500,
            }}
          >
            {locale.toUpperCase()}
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <h1
            style={{
              fontSize: localized.title.length > 60 ? 42 : localized.title.length > 40 ? 48 : 54,
              fontWeight: 800,
              color: colors.text,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              margin: 0,
              maxWidth: '100%',
              wordBreak: 'break-word',
            }}
          >
            {localized.title}
          </h1>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: `2px solid ${colors.accent}30`,
            paddingTop: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '10px',
                backgroundColor: colors.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                fontWeight: 800,
                color: colors.bg,
              }}
            >
              G
            </div>
            <span
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: `${colors.text}cc`,
              }}
            >
              generatepasswordto.me
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              fontSize: 18,
              color: `${colors.text}88`,
            }}
          >
            <span>{article.readingMinutes} min read</span>
            <span style={{ color: `${colors.accent}60` }}>|</span>
            <span>{article.updatedAt}</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

// Public URL: /<locale>/guides/<slug>/opengraph-image. The guide metadata points og:image and
// twitter:image here explicitly, so zh and ja previews use a public path (proxy.ts rewrites it).
export function GET(_request: Request, context: { params: Promise<{ locale: string; slug: string }> }) {
  return renderOgImage({ params: context.params });
}
