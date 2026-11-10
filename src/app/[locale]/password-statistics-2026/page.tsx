import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import LocalizedPageShell from '@/components/LocalizedPageShell';
import { homeHref } from '@/lib/locale-links';

const baseUrl = 'https://www.generatepasswordto.me';
const LOCALES = ['en', 'ua', 'vi'] as const;
type Locale = (typeof LOCALES)[number];

const COPY: Record<Locale, {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  lengthTitle: string;
  lengthCols: string[];
  lengthRows: string[][];
  passTitle: string;
  passRows: string[][];
  demandTitle: string;
  demandIntro: string;
  demandRows: string[][];
  methodTitle: string;
  method: string;
  sourcesTitle: string;
  sources: { label: string; href: string }[];
  cta: { label: string; href: string };
}> = {
  en: {
    slug: 'password-statistics-2026',
    title: 'Password security statistics 2026: entropy, crack time and search demand',
    description: 'Original 2026 data: how password length and passphrase word count translate into entropy and crack time, plus 437 real search queries across 11 languages.',
    h1: 'Password security statistics 2026',
    intro:
      'This page publishes the data behind our generator: how length and word count translate into entropy, how long brute force actually takes against modern hardware, and what people search for across 11 languages. All numbers are reproducible from the formulas below; the query data comes from Google autocomplete collected on 31 October 2026.',
    lengthTitle: 'Random password length vs entropy',
    lengthCols: ['Length', 'Entropy (94-char pool)', 'Offline guesses at 10¹²/s', 'Recommended use'],
    lengthRows: [
      ['8 characters', '~52 bits', '~1 hour', 'Low-value accounts only'],
      ['12 characters', '~79 bits', '~19,000 years', 'Minimum for email and work'],
      ['16 characters', '~105 bits', '~1.3 × 10¹² years', 'Default from a password manager'],
      ['20 characters', '~131 bits', '~8.6 × 10¹⁹ years', 'Master passwords, wallets, admin'],
    ],
    passTitle: 'Passphrase word count vs entropy (EFF large wordlist, 7,776 words)',
    passRows: [
      ['3 words', '~39 bits', 'Weak, avoid'],
      ['4 words', '~52 bits', 'Comparable to an 8-character password'],
      ['5 words', '~65 bits', 'Better than 10 random characters'],
      ['6 words', '~78 bits', 'Comparable to 12 random characters'],
      ['7 words', '~90 bits', 'Suitable for master passwords'],
    ],
    demandTitle: 'What people search for (437 unique queries, 11 languages)',
    demandIntro:
      'We collected Google autocomplete suggestions for generator, strength, manager, length and passphrase seeds in en, ua, ru, pl, de, es, fr, it, pt, ja and zh. Clusters by how many languages show demand:',
    demandRows: [
      ['Generator (password generator, генератор паролів, …)', '11 / 11'],
      ['Strong/safe password guidance', '10 / 11'],
      ['Password managers and platforms', '9 / 11'],
      ['How to create a password', '9 / 11'],
      ['Exact password length (12/16/20 characters)', '5 / 11'],
      ['Passphrase / words / easy to remember', '4 / 11'],
    ],
    methodTitle: 'Method',
    method:
      'Entropy = log2(alphabet size) × length, with a 94-character alphabet (letters, digits, symbols). Passphrase entropy = log2(7776) × words ≈ 12.9 × words. Crack times assume 10¹² guesses per second, i.e. a modern multi-GPU offline attack against a fast hash, while online attacks against a rate-limited login are orders of magnitude slower. All generation on this site uses the Web Crypto API in your browser; nothing is sent to a server.',
    sourcesTitle: 'Sources',
    sources: [
      { label: 'NIST SP 800-63B: Digital Identity Guidelines', href: 'https://pages.nist.gov/800-63-4/sp800-63b.html' },
      { label: 'OWASP Authentication Cheat Sheet', href: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html' },
      { label: 'EFF, Deep Dive: EFF’s New Wordlists for Random Passphrases', href: 'https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases' },
      { label: 'Have I Been Pwned: Pwned Passwords', href: 'https://haveibeenpwned.com/Passwords' },
    ],
    cta: { label: 'Generate a password with these settings', href: '/en' },
  },
  ua: {
    slug: 'password-statistics-2026',
    title: 'Статистика безпеки паролів 2026: ентропія, час злому та попит',
    description: 'Оригінальні дані 2026: як довжина пароля та кількість слів у фразі впливають на ентропію й час злому, плюс 437 реальних запитів 11 мовами.',
    h1: 'Статистика безпеки паролів 2026',
    intro:
      'Ця сторінка публікує дані, на яких працює наш генератор: як довжина та кількість слів перетворюються на ентропію, скільки насправді триває перебір на сучасному обладнанні і що люди шукають 11 мовами. Усі цифри відтворюються за формулами нижче; дані запитів зібрано з Google autocomplete 31 жовтня 2026 року.',
    lengthTitle: 'Довжина випадкового пароля vs ентропія',
    lengthCols: ['Довжина', 'Ентропія (набір 94 символи)', 'Офлайн-перебір при 10¹²/с', 'Для чого підходить'],
    lengthRows: [
      ['8 символів', '~52 біти', '~1 година', 'Лише маловажливі акаунти'],
      ['12 символів', '~79 бітів', '~19 000 років', 'Мінімум для пошти й роботи'],
      ['16 символів', '~105 бітів', '~1,3 × 10¹² років', 'Стандарт із менеджера паролів'],
      ['20 символів', '~131 біт', '~8,6 × 10¹⁹ років', 'Мастер-паролі, гаманці, адмін-доступ'],
    ],
    passTitle: 'Кількість слів у фразі vs ентропія (EFF large wordlist, 7 776 слів)',
    passRows: [
      ['3 слова', '~39 бітів', 'Слабко, не варто'],
      ['4 слова', '~52 біти', 'Порівнянно з 8-символьним паролем'],
      ['5 слів', '~65 бітів', 'Краще за 10 випадкових символів'],
      ['6 слів', '~78 бітів', 'Порівнянно з 12 випадковими символами'],
      ['7 слів', '~90 бітів', 'Підходить для мастер-пароля'],
    ],
    demandTitle: 'Що шукають люди (437 унікальних запитів, 11 мов)',
    demandIntro:
      'Ми зібрали підказки Google autocomplete для запитів про генератори, надійність, менеджери, довжину та парольні фрази мовами en, ua, ru, pl, de, es, fr, it, pt, ja і zh. Кластери за кількістю мов із попитом:',
    demandRows: [
      ['Генератор (password generator, генератор паролів, …)', '11 / 11'],
      ['Поради про сильний/безпечний пароль', '10 / 11'],
      ['Менеджери паролів і платформи', '9 / 11'],
      ['Як створити пароль', '9 / 11'],
      ['Точна довжина (12/16/20 символів)', '5 / 11'],
      ['Парольна фраза / словами / легко запам’ятати', '4 / 11'],
    ],
    methodTitle: 'Методика',
    method:
      'Ентропія = log2(розмір набору) × довжина, для набору з 94 символів (літери, цифри, символи). Ентропія фрази = log2(7776) × кількість слів ≈ 12,9 × слів. Час злому розраховано для 10¹² спроб за секунду, тобто сучасна офлайн-атака на швидкий хеш, а онлайн-атаки на вхід із обмеженням спроб у рази повільніші. Уся генерація на сайті відбувається через Web Crypto API у вашому браузері; нічого не надсилається на сервер.',
    sourcesTitle: 'Джерела',
    sources: [
      { label: 'NIST SP 800-63B: Digital Identity Guidelines', href: 'https://pages.nist.gov/800-63-4/sp800-63b.html' },
      { label: 'OWASP Authentication Cheat Sheet', href: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html' },
      { label: 'EFF: нові списки слів для парольних фраз', href: 'https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases' },
      { label: 'Have I Been Pwned: Pwned Passwords', href: 'https://haveibeenpwned.com/Passwords' },
    ],
    cta: { label: 'Згенерувати пароль із цими параметрами', href: '/ua' },
  },
  vi: {
    slug: 'password-statistics-2026',
    title: 'Thống kê bảo mật mật khẩu 2026: entropy, thời gian bẻ khóa và nhu cầu tìm kiếm',
    description: 'Dữ liệu gốc năm 2026: độ dài mật khẩu và số từ trong cụm mật khẩu quy đổi thành entropy và thời gian bẻ khóa, cùng 437 truy vấn tìm kiếm thật bằng 11 ngôn ngữ.',
    h1: 'Thống kê bảo mật mật khẩu 2026',
    intro:
      'Trang này công bố dữ liệu đứng sau trình tạo mật khẩu của chúng tôi: độ dài và số từ quy đổi thành entropy thế nào, tấn công vét cạn thực tế mất bao lâu trên phần cứng hiện đại, và mọi người tìm kiếm gì bằng 11 ngôn ngữ. Mọi con số đều tái lập được bằng các công thức bên dưới; dữ liệu truy vấn lấy từ Google autocomplete thu thập ngày 31 tháng 10 năm 2026.',
    lengthTitle: 'Độ dài mật khẩu ngẫu nhiên so với entropy',
    lengthCols: ['Độ dài', 'Entropy (nhóm 94 ký tự)', 'Số lần thử ngoại tuyến ở 10¹²/giây', 'Phù hợp cho'],
    lengthRows: [
      ['8 ký tự', '~52 bit', '~1 giờ', 'Chỉ tài khoản ít giá trị'],
      ['12 ký tự', '~79 bit', '~19.000 năm', 'Mức tối thiểu cho email và công việc'],
      ['16 ký tự', '~105 bit', '~1,3 × 10¹² năm', 'Mặc định từ trình quản lý mật khẩu'],
      ['20 ký tự', '~131 bit', '~8,6 × 10¹⁹ năm', 'Mật khẩu chính, ví, quyền quản trị'],
    ],
    passTitle: 'Số từ trong cụm mật khẩu so với entropy (danh sách EFF lớn, 7.776 từ)',
    passRows: [
      ['3 từ', '~39 bit', 'Yếu, nên tránh'],
      ['4 từ', '~52 bit', 'Tương đương mật khẩu 8 ký tự'],
      ['5 từ', '~65 bit', 'Tốt hơn 10 ký tự ngẫu nhiên'],
      ['6 từ', '~78 bit', 'Tương đương 12 ký tự ngẫu nhiên'],
      ['7 từ', '~90 bit', 'Phù hợp cho mật khẩu chính'],
    ],
    demandTitle: 'Mọi người tìm kiếm gì (437 truy vấn riêng biệt, 11 ngôn ngữ)',
    demandIntro:
      'Chúng tôi thu thập gợi ý Google autocomplete cho các từ khóa về trình tạo, độ mạnh, trình quản lý, độ dài và cụm mật khẩu bằng en, ua, ru, pl, de, es, fr, it, pt, ja và zh. Các nhóm theo số ngôn ngữ có nhu cầu:',
    demandRows: [
      ['Trình tạo (password generator, генератор паролів, …)', '11 / 11'],
      ['Hướng dẫn mật khẩu mạnh/an toàn', '10 / 11'],
      ['Trình quản lý mật khẩu và nền tảng', '9 / 11'],
      ['Cách tạo mật khẩu', '9 / 11'],
      ['Độ dài chính xác (12/16/20 ký tự)', '5 / 11'],
      ['Cụm mật khẩu / dùng từ / dễ nhớ', '4 / 11'],
    ],
    methodTitle: 'Phương pháp',
    method:
      'Entropy = log2(kích thước bộ ký tự) × độ dài, với bộ 94 ký tự (chữ cái, chữ số, ký hiệu). Entropy cụm mật khẩu = log2(7776) × số từ ≈ 12,9 × số từ. Thời gian bẻ khóa giả định 10¹² lần thử mỗi giây, tức một cuộc tấn công ngoại tuyến bằng nhiều GPU nhắm vào hàm băm nhanh, còn tấn công trực tuyến vào trang đăng nhập có giới hạn số lần thử chậm hơn nhiều bậc. Mọi thao tác tạo mật khẩu trên trang này dùng Web Crypto API trong trình duyệt của bạn; không có gì được gửi tới máy chủ.',
    sourcesTitle: 'Nguồn tham khảo',
    sources: [
      { label: 'NIST SP 800-63B: Digital Identity Guidelines', href: 'https://pages.nist.gov/800-63-4/sp800-63b.html' },
      { label: 'OWASP Authentication Cheat Sheet', href: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html' },
      { label: 'EFF, Deep Dive: EFF’s New Wordlists for Random Passphrases', href: 'https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases' },
      { label: 'Have I Been Pwned: Pwned Passwords', href: 'https://haveibeenpwned.com/Passwords' },
    ],
    cta: { label: 'Tạo mật khẩu với các thiết lập này', href: '/vi' },
  },
};

export const runtime = 'nodejs';
export const revalidate = 86400;
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const copy = COPY[(locale as Locale) in COPY ? (locale as Locale) : 'en'];
  const canonical = `${baseUrl}/${locale}/${copy.slug}`;
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical,
      languages: {
        en: `${baseUrl}/en/${COPY.en.slug}`,
        uk: `${baseUrl}/ua/${COPY.ua.slug}`,
        vi: `${baseUrl}/vi/${COPY.vi.slug}`,
        'x-default': `${baseUrl}/en/${COPY.en.slug}`,
      },
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: canonical,
      siteName: 'generatepasswordto.me',
      type: 'article',
    },
    robots: { index: true, follow: true },
  };
}

export default async function PasswordStatisticsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = COPY[(locale as Locale) in COPY ? (locale as Locale) : 'en'];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: copy.h1,
    description: copy.description,
    datePublished: '2026-11-02',
    dateModified: '2026-11-02',
    inLanguage: locale === 'ua' ? 'uk' : locale === 'vi' ? 'vi' : 'en',
    author: { '@type': 'Organization', name: 'GeneratePasswordTo Editorial Team' },
    publisher: { '@type': 'Organization', name: 'generatepasswordto.me', url: baseUrl },
    citation: copy.sources.map((s) => s.href),
    mainEntityOfPage: `${baseUrl}/${locale}/${copy.slug}`,
  };

  return (
    <LocalizedPageShell locale={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <section className="max-w-4xl mx-auto px-4 pt-10 pb-16">
        <Breadcrumbs
          language={locale}
          items={[
            { label: locale === 'ua' ? 'Головна' : locale === 'vi' ? 'Trang chủ' : 'Home', href: homeHref(locale) },
            { label: copy.h1 },
          ]}
        />
        <article className="mt-4 rounded-24 border border-[#E5F6FF] dark:border-[#374151] bg-white dark:bg-[#171717] p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#071016] dark:text-[#e0e0e0]">{copy.h1}</h1>
          <p className="mt-4 text-[#374151] dark:text-[#c7c7c7] leading-7">{copy.intro}</p>

          <h2 className="mt-8 text-2xl font-semibold text-[#071016] dark:text-[#e0e0e0]">{copy.lengthTitle}</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  {copy.lengthCols.map((c) => (
                    <th key={c} className="border-b border-[#E5F6FF] dark:border-[#374151] px-2 py-2 text-left font-semibold text-[#071016] dark:text-[#e0e0e0]">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {copy.lengthRows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell) => (
                      <td key={cell} className="border-b border-[#E5F6FF] dark:border-[#374151] px-2 py-2 text-[#374151] dark:text-[#c7c7c7]">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="mt-8 text-2xl font-semibold text-[#071016] dark:text-[#e0e0e0]">{copy.passTitle}</h2>
          <ul className="mt-3 list-disc pl-5 space-y-1 text-[#374151] dark:text-[#c7c7c7]">
            {copy.passRows.map((r) => (
              <li key={r[0]}><strong>{r[0]}</strong>: {r[1]}. {r[2]}</li>
            ))}
          </ul>

          <h2 className="mt-8 text-2xl font-semibold text-[#071016] dark:text-[#e0e0e0]">{copy.demandTitle}</h2>
          <p className="mt-2 text-[#374151] dark:text-[#c7c7c7] leading-7">{copy.demandIntro}</p>
          <ul className="mt-3 list-disc pl-5 space-y-1 text-[#374151] dark:text-[#c7c7c7]">
            {copy.demandRows.map((r) => (
              <li key={r[0]}>{r[0]}: <strong>{r[1]}</strong></li>
            ))}
          </ul>

          <h2 className="mt-8 text-2xl font-semibold text-[#071016] dark:text-[#e0e0e0]">{copy.methodTitle}</h2>
          <p className="mt-2 text-[#374151] dark:text-[#c7c7c7] leading-7">{copy.method}</p>

          <h2 className="mt-8 text-2xl font-semibold text-[#071016] dark:text-[#e0e0e0]">{copy.sourcesTitle}</h2>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            {copy.sources.map((s) => (
              <li key={s.href}>
                <a className="text-[#2A4E63] dark:text-[#38beff] underline underline-offset-4 hover:text-[#1f3b4c] dark:hover:text-[#d7f2ff]" href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-8">
            <a className="inline-flex items-center rounded-full bg-[#05a9ff] px-5 py-2.5 text-[15px] font-semibold !text-[#0a1e2a] hover:bg-[#38beff]" href={copy.cta.href}>
              {copy.cta.label}
            </a>
          </p>
        </article>
      </section>
    </LocalizedPageShell>
  );
}
