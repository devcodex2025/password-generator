import type { Metadata } from 'next';
import { getAffiliateStrings } from '@/components/affiliate/affiliate-i18n';
import { homeHref } from '@/lib/locale-links';
import LocalizedPageShell from '@/components/LocalizedPageShell';
import Breadcrumbs from '@/components/Breadcrumbs';
import NordPassAffiliatePromo from '@/components/affiliate/NordPassAffiliatePromo';

const baseUrl = 'https://www.generatepasswordto.me';
const hreflangMap: Record<string, string> = { ua: 'uk' };
const supportedLangs = ['en', 'ua', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'pl', 'vi'];

export const runtime = 'nodejs';

export function generateStaticParams() {
  return supportedLangs.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getAffiliateStrings(locale);
  const canonical = `${baseUrl}/${locale}/best-password-managers-2026`;

  return {
    title: t.pageTitle,
    description: t.pageDescription,
    keywords: [
      'best password manager 2026',
      'NordPass review',
      'NordPass vs 1Password',
      'password manager comparison',
    ],
    alternates: {
      canonical,
      languages: {
        ...Object.fromEntries(
          supportedLangs.map((lang) => [
            hreflangMap[lang] || lang,
            `${baseUrl}/${lang}/best-password-managers-2026`,
          ]),
        ),
        'x-default': `${baseUrl}/en/best-password-managers-2026`,
      },
    },
    openGraph: {
      title: t.pageTitle,
      description: t.pageDescription,
      url: canonical,
      siteName: 'generatepasswordto.me',
      type: 'article',
      images: [
        {
          url: `${baseUrl}/images/generate-password-preview.png`,
          width: 1200,
          height: 630,
          alt: t.pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.pageTitle,
      description: t.pageDescription,
      images: [`${baseUrl}/images/generate-password-preview.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/* Breadcrumb translations. */

const breadcrumbHome: Record<string, string> = {
  en: 'Home', ua: 'Головна', es: 'Inicio', fr: 'Accueil', de: 'Startseite',
  it: 'Home', pt: 'Início', ru: 'Главная', zh: '首页', ja: 'ホーム', pl: 'Strona główna',
  vi: 'Trang chủ',
};

const breadcrumbPage: Record<string, string> = {
  en: 'Best Password Managers 2026',
  ua: 'Кращі менеджери паролів 2026',
  es: 'Mejores gestores 2026',
  fr: 'Meilleurs gestionnaires 2026',
  de: 'Beste Passwort-Manager 2026',
  it: 'Migliori gestori 2026',
  pt: 'Melhores gerenciadores 2026',
  ru: 'Лучшие менеджеры 2026',
  zh: '2026最佳密码管理器',
  ja: '2026年ベストパスワードマネージャー',
  pl: 'Najlepsze menedżery 2026',
  vi: 'Trình quản lý mật khẩu tốt nhất 2026',
};

// Extra buying-checklist copy for the thinnest locales (see docs/adsense-audit-2026-11-02).
const buyerChecklist: Record<string, { title: string; text: string }> = {
  ru: {
    title: 'Что проверить перед покупкой',
    text:
      'Сравнивайте не только цену первого года: проверьте стоимость продления, поддержку двухфакторной аутентификации, офлайн-доступ и экспорт хранилища. Для семейного плана важно, сколько участников можно добавить и есть ли аварийный доступ. Если вы пользуетесь только одним браузером, встроенный менеджер закроет базовые задачи, но синхронизация между устройствами обычно требует отдельного приложения.',
  },
  ua: {
    title: 'Що перевірити перед покупкою',
    text:
      'Порівнюйте не лише ціну першого року: перевірте вартість продовження, підтримку двофакторної автентифікації, офлайн-доступ і експорт сховища. Для сімейного плану важливо, скільки учасників можна додати і чи є аварійний доступ. Якщо ви користуєтеся лише одним браузером, вбудований менеджер закриє базові задачі, але синхронізація між пристроями зазвичай потребує окремого застосунку.',
  },
};

const platformGuide: Record<
  string,
  { title: string; intro: string; items: Array<{ title: string; text: string }> }
> = {
  en: {
    title: 'Which password manager fits your platform?',
    intro:
      'The best choice depends on the devices you use and whether you want a built-in tool or a dedicated vault. These notes cover the four platforms readers ask about most.',
    items: [
      {
        title: 'Android',
        text: 'Android has Google Password Manager built in, and most third-party managers integrate with autofill. Check that the manager supports Android autofill and passkeys before you commit.',
      },
      {
        title: 'iPhone and iPad',
        text: 'iOS and iPadOS offer iCloud Keychain and autofill. A dedicated manager adds cross-platform sync, secure sharing and recovery options that iCloud Keychain does not cover in every case.',
      },
      {
        title: 'Chrome',
        text: 'Chrome remembers passwords and syncs them through your Google account. A browser extension from a dedicated manager adds sharing controls, breach monitoring and a vault that works outside Chrome.',
      },
      {
        title: 'Google Password Manager',
        text: 'Google Password Manager is free and convenient on Android and Chrome. Choose a dedicated manager when you need family sharing, detailed recovery or a vault independent of your Google account.',
      },
    ],
  },
  ua: {
    title: 'Який менеджер паролів підходить вашій платформі?',
    intro:
      'Вибір залежить від пристроїв і від того, чи хочете ви вбудований інструмент чи окреме сховище. Ці нотатки охоплюють чотири платформи, про які питають найчастіше.',
    items: [
      {
        title: 'Android',
        text: 'На Android вбудований Google Password Manager, а більшість сторонніх менеджерів інтегруються з автозаповненням. Перевірте підтримку автозаповнення Android і passkeys перед покупкою.',
      },
      {
        title: 'iPhone та iPad',
        text: 'iOS та iPadOS мають iCloud Keychain і автозаповнення. Окремий менеджер додає синхронізацію між платформами, безпечний обмін і варіанти відновлення, яких iCloud Keychain не покриває в кожному сценарії.',
      },
      {
        title: 'Chrome',
        text: 'Chrome запам\'ятовує паролі й синхронізує їх через обліковий запис Google. Розширення окремого менеджера додає контроль обміну, моніторинг витоків і сховище, яке працює поза Chrome.',
      },
      {
        title: 'Google Password Manager',
        text: 'Google Password Manager безкоштовний і зручний на Android та в Chrome. Окремий менеджер варто вибрати, коли потрібен сімейний обмін, детальне відновлення або сховище, незалежне від облікового запису Google.',
      },
    ],
  },
  es: {
    title: '¿Qué gestor de contraseñas encaja con tu plataforma?',
    intro:
      'La mejor opción depende de los dispositivos que uses y de si prefieres una herramienta integrada o una bóveda dedicada. Estas notas cubren las cuatro plataformas que más consultan los lectores.',
    items: [
      {
        title: 'Android',
        text: 'Android incluye Google Password Manager y la mayoría de los gestores externos se integran con el autocompletado. Comprueba el soporte de autocompletado y passkeys en Android antes de decidirte.',
      },
      {
        title: 'iPhone y iPad',
        text: 'iOS y iPadOS ofrecen iCloud Keychain y autocompletado. Un gestor dedicado añade sincronización entre plataformas, uso compartido seguro y opciones de recuperación que iCloud Keychain no cubre en todos los casos.',
      },
      {
        title: 'Chrome',
        text: 'Chrome recuerda contraseñas y las sincroniza con tu cuenta de Google. La extensión de un gestor dedicado añade controles de uso compartido, monitorización de filtraciones y una bóveda que funciona fuera de Chrome.',
      },
      {
        title: 'Google Password Manager',
        text: 'Google Password Manager es gratis y cómodo en Android y Chrome. Elige un gestor dedicado si necesitas compartir en familia, una recuperación detallada o una bóveda independiente de tu cuenta de Google.',
      },
    ],
  },
  fr: {
    title: 'Quel gestionnaire de mots de passe correspond à votre plateforme ?',
    intro:
      'Le bon choix dépend des appareils que vous utilisez et de votre préférence pour un outil intégré ou un coffre dédié. Ces notes couvrent les quatre plateformes les plus demandées.',
    items: [
      {
        title: 'Android',
        text: "Android intègre Google Password Manager, et la plupart des gestionnaires tiers s'appuient sur le remplissage automatique. Vérifiez la prise en charge du remplissage Android et des passkeys avant de vous engager.",
      },
      {
        title: 'iPhone et iPad',
        text: "iOS et iPadOS proposent iCloud Keychain et le remplissage automatique. Un gestionnaire dédié ajoute la synchronisation multiplateforme, le partage sécurisé et des options de récupération que iCloud Keychain ne couvre pas dans tous les cas.",
      },
      {
        title: 'Chrome',
        text: "Chrome mémorise les mots de passe et les synchronise via votre compte Google. L'extension d'un gestionnaire dédié ajoute des contrôles de partage, une surveillance des fuites et un coffre qui fonctionne hors de Chrome.",
      },
      {
        title: 'Google Password Manager',
        text: 'Google Password Manager est gratuit et pratique sur Android et Chrome. Choisissez un gestionnaire dédié si vous avez besoin de partage familial, d\'une récupération détaillée ou d\'un coffre indépendant de votre compte Google.',
      },
    ],
  },
  de: {
    title: 'Welcher Passwort-Manager passt zu Ihrer Plattform?',
    intro:
      'Die beste Wahl hängt von Ihren Geräten ab und davon, ob Sie ein eingebautes Werkzeug oder einen eigenen Tresor wollen. Diese Hinweise decken die vier am häufigsten gefragten Plattformen ab.',
    items: [
      {
        title: 'Android',
        text: 'Android bringt Google Password Manager mit, und die meisten Drittanbieter integrieren sich in die Autofill-Funktion. Prüfen Sie vor dem Kauf die Unterstützung für Android-Autofill und Passkeys.',
      },
      {
        title: 'iPhone und iPad',
        text: 'iOS und iPadOS bieten iCloud Keychain und Autofill. Ein eigener Manager ergänzt plattformübergreifende Synchronisierung, sicheres Teilen und Wiederherstellungsoptionen, die iCloud Keychain nicht in jedem Fall abdeckt.',
      },
      {
        title: 'Chrome',
        text: 'Chrome merkt sich Passwörter und synchronisiert sie über Ihr Google-Konto. Die Erweiterung eines eigenen Managers ergänzt Teilen-Kontrollen, Leak-Überwachung und einen Tresor, der außerhalb von Chrome funktioniert.',
      },
      {
        title: 'Google Password Manager',
        text: 'Google Password Manager ist kostenlos und bequem auf Android und in Chrome. Ein eigener Manager lohnt sich, wenn Sie Familienfreigabe, eine ausführliche Wiederherstellung oder einen Tresor unabhängig vom Google-Konto brauchen.',
      },
    ],
  },
  it: {
    title: 'Quale gestore di password si adatta alla tua piattaforma?',
    intro:
      'La scelta migliore dipende dai dispositivi che usi e dalla preferenza per uno strumento integrato o una cassaforte dedicata. Queste note coprono le quattro piattaforme più richieste.',
    items: [
      {
        title: 'Android',
        text: 'Android include Google Password Manager e la maggior parte dei gestori di terze parti si integra con il riempimento automatico. Verifica il supporto al riempimento automatico e alle passkey su Android prima di scegliere.',
      },
      {
        title: 'iPhone e iPad',
        text: 'iOS e iPadOS offrono iCloud Keychain e il riempimento automatico. Un gestore dedicato aggiunge sincronizzazione multipiattaforma, condivisione sicura e opzioni di recupero che iCloud Keychain non copre in ogni caso.',
      },
      {
        title: 'Chrome',
        text: "Chrome ricorda le password e le sincronizza tramite il tuo account Google. L'estensione di un gestore dedicato aggiunge controlli di condivisione, monitoraggio delle violazioni e una cassaforte che funziona fuori da Chrome.",
      },
      {
        title: 'Google Password Manager',
        text: 'Google Password Manager è gratuito e comodo su Android e Chrome. Scegli un gestore dedicato se ti servono condivisione familiare, recupero dettagliato o una cassaforte indipendente dall\'account Google.',
      },
    ],
  },
  pt: {
    title: 'Qual gerenciador de senhas combina com sua plataforma?',
    intro:
      'A melhor escolha depende dos aparelhos que você usa e de preferir uma ferramenta integrada ou um cofre dedicado. Estas notas cobrem as quatro plataformas mais procuradas.',
    items: [
      {
        title: 'Android',
        text: 'O Android já inclui o Google Password Manager, e a maioria dos gerenciadores de terceiros se integra ao preenchimento automático. Verifique o suporte a preenchimento automático e passkeys no Android antes de decidir.',
      },
      {
        title: 'iPhone e iPad',
        text: 'iOS e iPadOS oferecem o iCloud Keychain e preenchimento automático. Um gerenciador dedicado acrescenta sincronização entre plataformas, compartilhamento seguro e opções de recuperação que o iCloud Keychain não cobre em todos os casos.',
      },
      {
        title: 'Chrome',
        text: 'O Chrome lembra senhas e as sincroniza pela sua conta Google. A extensão de um gerenciador dedicado acrescenta controles de compartilhamento, monitoramento de vazamentos e um cofre que funciona fora do Chrome.',
      },
      {
        title: 'Google Password Manager',
        text: 'O Google Password Manager é gratuito e prático no Android e no Chrome. Escolha um gerenciador dedicado se precisar de compartilhamento familiar, recuperação detalhada ou um cofre independente da conta Google.',
      },
    ],
  },
  ru: {
    title: 'Какой менеджер паролей подходит вашей платформе?',
    intro:
      'Лучший выбор зависит от устройств и от того, нужен ли вам встроенный инструмент или отдельное хранилище. Эти заметки охватывают четыре платформы, о которых спрашивают чаще всего.',
    items: [
      {
        title: 'Android',
        text: 'В Android встроен Google Password Manager, а большинство сторонних менеджеров интегрируются с автозаполнением. Проверьте поддержку автозаполнения Android и passkeys перед покупкой.',
      },
      {
        title: 'iPhone и iPad',
        text: 'iOS и iPadOS предлагают iCloud Keychain и автозаполнение. Отдельный менеджер добавляет синхронизацию между платформами, безопасный обмен и варианты восстановления, которые iCloud Keychain покрывает не во всех сценариях.',
      },
      {
        title: 'Chrome',
        text: 'Chrome запоминает пароли и синхронизирует их через аккаунт Google. Расширение отдельного менеджера добавляет контроль общего доступа, мониторинг утечек и хранилище, работающее вне Chrome.',
      },
      {
        title: 'Google Password Manager',
        text: 'Google Password Manager бесплатен и удобен на Android и в Chrome. Отдельный менеджер стоит выбрать, если нужен семейный доступ, подробное восстановление или хранилище, независимое от аккаунта Google.',
      },
    ],
  },
  zh: {
    title: '哪个密码管理器适合你的平台？',
    intro:
      '最佳选择取决于你使用的设备，以及你想要内置工具还是独立保险库。下面覆盖读者最常问的四个平台。',
    items: [
      {
        title: 'Android',
        text: 'Android 内置 Google Password Manager，大多数第三方管理器也支持自动填充。购买前确认它支持 Android 自动填充和通行密钥。',
      },
      {
        title: 'iPhone 和 iPad',
        text: 'iOS 和 iPadOS 提供 iCloud 钥匙串和自动填充。独立管理器增加了跨平台同步、安全共享和恢复选项，这些并非 iCloud 钥匙串在所有场景都能覆盖。',
      },
      {
        title: 'Chrome',
        text: 'Chrome 会记住密码并通过 Google 账户同步。独立管理器的扩展增加了共享控制、泄露监控和一个可在 Chrome 之外使用的保险库。',
      },
      {
        title: 'Google Password Manager',
        text: 'Google Password Manager 在 Android 和 Chrome 上免费且方便。如果你需要家庭共享、详细恢复或独立于 Google 账户的保险库，就选独立管理器。',
      },
    ],
  },
  ja: {
    title: 'あなたのプラットフォームに合うパスワードマネージャーは？',
    intro:
      '最適な選択は使う端末と、内蔵ツールか専用の保管庫かの好みで変わります。よく質問される4つのプラットフォームをまとめました。',
    items: [
      {
        title: 'Android',
        text: 'AndroidにはGoogle Password Managerが組み込まれており、多くのサードパーティ製マネージャーが自動入力に対応しています。購入前にAndroidの自動入力とパスキー対応を確認してください。',
      },
      {
        title: 'iPhoneとiPad',
        text: 'iOSとiPadOSにはiCloudキーチェーンと自動入力があります。専用マネージャーなら、プラットフォーム間の同期、安全な共有、iCloudキーチェーンではすべてをカバーできない復元オプションが加わります。',
      },
      {
        title: 'Chrome',
        text: 'Chromeはパスワードを記憶し、Googleアカウントで同期します。専用マネージャーの拡張機能なら、共有の管理、漏洩監視、Chromeの外でも使える保管庫が加わります。',
      },
      {
        title: 'Google Password Manager',
        text: 'Google Password ManagerはAndroidとChromeで無料かつ便利です。家族での共有、詳しい復元、Googleアカウントから独立した保管庫が必要なら専用マネージャーを選びましょう。',
      },
    ],
  },
  pl: {
    title: 'Który menedżer haseł pasuje do twojej platformy?',
    intro:
      'Najlepszy wybór zależy od urządzeń i od tego, czy wolisz wbudowane narzędzie, czy osobny sejf. Te notatki obejmują cztery najczęściej pytane platformy.',
    items: [
      {
        title: 'Android',
        text: 'Android ma wbudowany Google Password Manager, a większość zewnętrznych menedżerów integruje się z autouzupełnianiem. Przed zakupem sprawdź obsługę autouzupełniania Androida i passkeys.',
      },
      {
        title: 'iPhone i iPad',
        text: 'iOS i iPadOS oferują iCloud Keychain oraz autouzupełnianie. Osobny menedżer dodaje synchronizację między platformami, bezpieczne udostępnianie i opcje odzyskiwania, których iCloud Keychain nie pokrywa w każdym scenariuszu.',
      },
      {
        title: 'Chrome',
        text: 'Chrome zapamiętuje hasła i synchronizuje je przez konto Google. Rozszerzenie osobnego menedżera dodaje kontrolę udostępniania, monitorowanie wycieków i sejf działający poza Chrome.',
      },
      {
        title: 'Google Password Manager',
        text: 'Google Password Manager jest darmowy i wygodny na Androidzie i w Chrome. Osobny menedżer wybierz, gdy potrzebujesz udostępniania rodzinnego, szczegółowego odzyskiwania lub sejfu niezależnego od konta Google.',
      },
    ],
  },
  vi: {
    title: 'Trình quản lý mật khẩu nào phù hợp với nền tảng của bạn?',
    intro:
      'Lựa chọn tốt nhất phụ thuộc vào thiết bị bạn dùng và việc bạn muốn công cụ tích hợp hay một kho lưu trữ riêng. Các ghi chú này bao quát bốn nền tảng được hỏi nhiều nhất.',
    items: [
      {
        title: 'Android',
        text: 'Android có sẵn Google Password Manager, và hầu hết trình quản lý bên thứ ba tích hợp với tự động điền. Hãy kiểm tra hỗ trợ tự động điền và passkey trên Android trước khi chọn.',
      },
      {
        title: 'iPhone và iPad',
        text: 'iOS và iPadOS có iCloud Keychain và tự động điền. Một trình quản lý riêng bổ sung đồng bộ đa nền tảng, chia sẻ an toàn và tùy chọn khôi phục mà iCloud Keychain không bao phủ mọi trường hợp.',
      },
      {
        title: 'Chrome',
        text: 'Chrome ghi nhớ mật khẩu và đồng bộ qua tài khoản Google. Tiện ích của trình quản lý riêng bổ sung kiểm soát chia sẻ, theo dõi rò rỉ và kho lưu trữ hoạt động ngoài Chrome.',
      },
      {
        title: 'Google Password Manager',
        text: 'Google Password Manager miễn phí và tiện trên Android và Chrome. Chọn trình quản lý riêng nếu bạn cần chia sẻ gia đình, khôi phục chi tiết hoặc kho lưu trữ độc lập với tài khoản Google.',
      },
    ],
  },
};

export default async function BestPasswordManagersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getAffiliateStrings(locale);
  const canonical = `${baseUrl}/${locale}/best-password-managers-2026`;

  /* JSON-LD: Product
     No aggregateRating / review on purpose: self-serving review markup is
     ineligible for rich results and risks a structured-data manual action. */
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'NordPass Password Manager',
    description: t.nordpassReviewText,
    brand: { '@type': 'Brand', name: 'NordPass' },
    url: 'https://nordpass.com',
    image: `${baseUrl}/images/generate-password-preview.png`,
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '0',
      highPrice: '47.88',
      priceCurrency: 'USD',
      offerCount: 3,
      availability: 'https://schema.org/InStock',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: breadcrumbHome[locale] || breadcrumbHome.en,
        item: `${baseUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: breadcrumbPage[locale] || breadcrumbPage.en,
        item: canonical,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD outside the client shell: a <script> inside a client boundary
          is never executed and triggers a hydration mismatch. */}
      <script
        id="product-review-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        id="breadcrumb-schema-pm"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <LocalizedPageShell locale={locale}>

      <article className="max-w-4xl mx-auto px-4 pt-10 pb-16">
        <Breadcrumbs
          language={locale}
          items={[
            { label: breadcrumbHome[locale] || breadcrumbHome.en, href: homeHref(locale) },
            { label: breadcrumbPage[locale] || breadcrumbPage.en },
          ]}
        />

        {/* Hero */}
        <h1 className="mt-6 text-3xl md:text-4xl font-bold text-[#071016] dark:text-[#e0e0e0]">
          {t.pageH1}
        </h1>
        <p className="mt-4 text-lg text-[#374151] dark:text-[#c7c7c7] leading-8">
          {t.pageIntro}
        </p>

        {/* Section: Why */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-[#071016] dark:text-[#e0e0e0]">
            {t.sectionWhyTitle}
          </h2>
          <p className="mt-3 text-[#374151] dark:text-[#c7c7c7] leading-7">
            {t.sectionWhyText}
          </p>
        </section>

        {/* Section: NordPass Review */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-[#071016] dark:text-[#e0e0e0]">
            {t.nordpassReviewTitle}
          </h2>
          <p className="mt-3 text-[#374151] dark:text-[#c7c7c7] leading-7">
            {t.nordpassReviewText}
          </p>
        </section>

        {/* Section: Comparison */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-[#071016] dark:text-[#e0e0e0]">
            {t.sectionCompareTitle}
          </h2>
          <p className="mt-3 text-[#374151] dark:text-[#c7c7c7] leading-7">
            {t.sectionCompareText}
          </p>
        </section>

        {/* Section: Platform fit */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-[#071016] dark:text-[#e0e0e0]">
            {(platformGuide[locale] || platformGuide.en).title}
          </h2>
          <p className="mt-3 text-[#374151] dark:text-[#c7c7c7] leading-7">
            {(platformGuide[locale] || platformGuide.en).intro}
          </p>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {(platformGuide[locale] || platformGuide.en).items.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#E5F6FF] bg-[#F8FDFF] p-5 dark:border-[#374151] dark:bg-[#23272f]"
              >
                <h3 className="text-lg font-semibold text-[#071016] dark:text-[#e0e0e0]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[#374151] dark:text-[#c7c7c7] leading-7">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {buyerChecklist[locale] ? (
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-[#071016] dark:text-[#e0e0e0]">
              {buyerChecklist[locale].title}
            </h2>
            <p className="mt-3 text-[#374151] dark:text-[#c7c7c7] leading-7">
              {buyerChecklist[locale].text}
            </p>
          </section>
        ) : null}

        {/* Affiliate promo block with comparison table + CTAs */}
        <NordPassAffiliatePromo
          locale={locale}
          className="mt-8"
          placement="comparison-page"
        />

        {/* Section: Verdict */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-[#071016] dark:text-[#e0e0e0]">
            {t.sectionVerdictTitle}
          </h2>
          <p className="mt-3 text-[#374151] dark:text-[#c7c7c7] leading-7">
            {t.sectionVerdictText}
          </p>
        </section>
      </article>
      </LocalizedPageShell>
    </>
  );
}
