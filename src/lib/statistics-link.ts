/**
 * The 2026 password statistics page is published in a subset of locales. Pages
 * that link to it must check `hasStatisticsPage` first, otherwise the other
 * locales would render links to a 404, and those links are how Google discovers
 * the page, so a broken one is worse than no link at all.
 */

export const STATISTICS_PAGE_LOCALES = ['en', 'ua', 'vi'] as const;

export type StatisticsPageLocale = (typeof STATISTICS_PAGE_LOCALES)[number];

type StatisticsLinkCopy = {
  heading: string;
  description: string;
  label: string;
};

const STATISTICS_LINK_COPY: Record<StatisticsPageLocale, StatisticsLinkCopy> = {
  en: {
    heading: 'Password statistics 2026',
    description:
      'Breach volumes, password length and reuse data compiled from public security reports: the context behind every guide on this page.',
    label: 'Read the 2026 password statistics',
  },
  ua: {
    heading: 'Статистика паролів 2026',
    description:
      'Дані про обсяг витоків, довжину паролів і повторне використання з публічних звітів: контекст до кожного гайда на цій сторінці.',
    label: 'Статистика паролів 2026',
  },
  vi: {
    heading: 'Thống kê mật khẩu 2026',
    description:
      'Số liệu về rò rỉ dữ liệu, độ dài và việc dùng lại mật khẩu từ các báo cáo công khai: bối cảnh cho mọi hướng dẫn trên trang này.',
    label: 'Đọc thống kê mật khẩu 2026',
  },
};

function normalizeLocale(locale: string): StatisticsPageLocale {
  const key = (locale || 'en').trim().toLowerCase().split(/[-_]/)[0];
  return (STATISTICS_PAGE_LOCALES as readonly string[]).includes(key)
    ? (key as StatisticsPageLocale)
    : 'en';
}

export function hasStatisticsPage(locale: string): boolean {
  const key = (locale || 'en').trim().toLowerCase().split(/[-_]/)[0];
  return (STATISTICS_PAGE_LOCALES as readonly string[]).includes(key);
}

export function getStatisticsLinkCopy(locale: string): StatisticsLinkCopy {
  return STATISTICS_LINK_COPY[normalizeLocale(locale)];
}
