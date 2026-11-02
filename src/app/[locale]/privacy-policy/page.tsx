import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import LocalizedPageShell from '@/components/LocalizedPageShell';
import { getStaticPageCopy, STATIC_PAGE_LOCALES } from '@/lib/static-pages-i18n';
import { LEGAL_COPY } from '@/lib/legal-i18n';
import { homeHref } from '@/lib/locale-links';

const baseUrl = 'https://www.generatepasswordto.me';
const supportedLangs = ['en', 'ua', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'pl', 'vi'];
const hreflangMap: Record<string, string> = { ua: 'uk' };

const ADS_DISCLOSURE: Record<string, string> = {
  en: 'Advertising: this site displays ads served by third-party vendors, including Google. Google uses cookies (including the DoubleClick cookie) to serve ads based on your prior visits to this and other websites. You can opt out of personalized advertising in Google Ads Settings (adssettings.google.com) or at aboutads.info.',
  ua: 'Реклама: на сайті показуються оголошення третіх сторін, зокрема Google. Google використовує файли cookie (включно з cookie DoubleClick), щоб показувати рекламу на основі ваших попередніх відвідувань цього та інших сайтів. Ви можете вимкнути персоналізовану рекламу в налаштуваннях реклами Google (adssettings.google.com) або на aboutads.info.',
  ru: 'Реклама: на сайте показываются объявления третьих сторон, в том числе Google. Google использует файлы cookie (включая cookie DoubleClick), чтобы показывать рекламу на основе ваших предыдущих посещений этого и других сайтов. Вы можете отключить персонализированную рекламу в настройках рекламы Google (adssettings.google.com) или на aboutads.info.',
  pl: 'Reklamy: witryna wyświetla reklamy dostarczane przez podmioty zewnętrzne, w tym Google. Google wykorzystuje pliki cookie (w tym cookie DoubleClick), aby wyświetlać reklamy na podstawie wcześniejszych wizyt w tej i innych witrynach. Możesz wyłączyć reklamy spersonalizowane w ustawieniach reklam Google (adssettings.google.com) lub na aboutads.info.',
  de: 'Werbung: Diese Website zeigt Anzeigen von Drittanbietern, einschließlich Google. Google verwendet Cookies (einschließlich des DoubleClick-Cookies), um Anzeigen basierend auf früheren Besuchen dieser und anderer Websites zu schalten. Sie können personalisierte Werbung in den Google-Anzeigeneinstellungen (adssettings.google.com) oder unter aboutads.info deaktivieren.',
  es: 'Publicidad: este sitio muestra anuncios de terceros proveedores, incluido Google. Google utiliza cookies (incluida la cookie de DoubleClick) para mostrar anuncios basados en tus visitas previas a este y otros sitios. Puedes desactivar la publicidad personalizada en la Configuración de anuncios de Google (adssettings.google.com) o en aboutads.info.',
  fr: 'Publicité : ce site affiche des annonces fournies par des tiers, notamment Google. Google utilise des cookies (dont le cookie DoubleClick) pour diffuser des annonces en fonction de vos visites précédentes sur ce site et d\'autres sites. Vous pouvez désactiver la publicité personnalisée dans les paramètres des annonces Google (adssettings.google.com) ou sur aboutads.info.',
  it: 'Pubblicità: questo sito mostra annunci forniti da terze parti, incluso Google. Google utilizza cookie (incluso il cookie DoubleClick) per mostrare annunci basati sulle tue visite precedenti a questo e ad altri siti. Puoi disattivare la pubblicità personalizzata nelle impostazioni degli annunci Google (adssettings.google.com) o su aboutads.info.',
  pt: 'Publicidade: este site mostra anúncios de terceiros, incluindo o Google. O Google utiliza cookies (incluindo o cookie DoubleClick) para exibir anúncios com base nas suas visitas anteriores a este e a outros sites. Pode desativar a publicidade personalizada nas definições de anúncios do Google (adssettings.google.com) ou em aboutads.info.',
  ja: '広告について：当サイトでは、Google を含む第三者配信事業者が配信する広告を表示しています。Google は Cookie（DoubleClick Cookie を含む）を使用し、このサイトや他のサイトへの過去のアクセスに基づいて広告を配信します。パーソナライズ広告は Google の広告設定（adssettings.google.com）または aboutads.info で無効にできます。',
  zh: '广告说明：本站展示由第三方（包括 Google）投放的广告。Google 使用 Cookie（包括 DoubleClick Cookie），根据您对本站及其他网站的既往访问投放广告。您可以在 Google 广告设置（adssettings.google.com）或 aboutads.info 中关闭个性化广告。',
  vi: 'Quảng cáo: trang này hiển thị quảng cáo do bên thứ ba cung cấp, bao gồm Google. Google sử dụng cookie (bao gồm cookie DoubleClick) để phân phối quảng cáo dựa trên các lần truy cập trước đó của bạn vào trang này và các trang khác. Bạn có thể tắt quảng cáo cá nhân hóa trong Cài đặt quảng cáo của Google (adssettings.google.com) hoặc tại aboutads.info.',
};

export const runtime = 'nodejs';
export const revalidate = 3600;

export function generateStaticParams() {
  return STATIC_PAGE_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const copy = getStaticPageCopy(locale);
  const legal = LEGAL_COPY[locale] ?? LEGAL_COPY.en;
  const canonical = `${baseUrl}/${locale}/privacy-policy`;
  return {
    title: copy.privacyPolicy,
    description: legal.privacy.intro.slice(0, 158),
    alternates: {
      canonical,
      languages: {
        ...Object.fromEntries(
          supportedLangs.map((lang) => [hreflangMap[lang] || lang, `${baseUrl}/${lang}/privacy-policy`])
        ),
        'x-default': `${baseUrl}/en/privacy-policy`,
      },
    },
    openGraph: {
      title: copy.privacyPolicy,
      description: legal.privacy.intro.slice(0, 158),
      url: canonical,
      siteName: 'generatepasswordto.me',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = getStaticPageCopy(locale);
  const legal = LEGAL_COPY[locale] ?? LEGAL_COPY.en;

  return (
    <LocalizedPageShell locale={locale}>
      <section className="max-w-4xl mx-auto px-4 pt-10 pb-16">
        <Breadcrumbs
          items={[
            { label: copy.home, href: homeHref(locale) },
            { label: copy.privacyPolicy },
          ]}
        />
        <article className="mt-4 rounded-24 border border-[#E5F6FF] dark:border-[#374151] bg-white dark:bg-[#171717] p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#071016] dark:text-[#e0e0e0]">{copy.privacyTitle}</h1>
          <p className="mt-4 text-[#374151] dark:text-[#c7c7c7] leading-7">{legal.privacy.intro}</p>
          {legal.privacy.sections.map((section) => (
            <section key={section.heading} className="mt-6">
              <h2 className="text-xl font-semibold text-[#071016] dark:text-[#e0e0e0]">{section.heading}</h2>
              <p className="mt-2 text-[#374151] dark:text-[#c7c7c7] leading-7">{section.body}</p>
            </section>
          ))}
          <p className="mt-6 text-[#374151] dark:text-[#c7c7c7] leading-7">
            {ADS_DISCLOSURE[locale] ?? ADS_DISCLOSURE.en}
          </p>
        </article>
      </section>
    </LocalizedPageShell>
  );
}
