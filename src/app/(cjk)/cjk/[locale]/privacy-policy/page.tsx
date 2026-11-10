// zh and ja: the same route as src/app/(latin)/[locale]/privacy-policy/page.tsx, rendered under the CJK root layout.
import * as page from '@/app/(latin)/[locale]/privacy-policy/page';
import { CJK_LOCALES } from '@/lib/cjk-locales';

export * from '@/app/(latin)/[locale]/privacy-policy/page';
export { default } from '@/app/(latin)/[locale]/privacy-policy/page';

export function generateStaticParams() {
  return CJK_LOCALES.flatMap((locale) => page.generateStaticParams({ params: { locale } }));
}
