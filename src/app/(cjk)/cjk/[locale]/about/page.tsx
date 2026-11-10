// zh and ja: the same route as src/app/(latin)/[locale]/about/page.tsx, rendered under the CJK root layout.
import * as page from '@/app/(latin)/[locale]/about/page';
import { CJK_LOCALES } from '@/lib/cjk-locales';

export * from '@/app/(latin)/[locale]/about/page';
export { default } from '@/app/(latin)/[locale]/about/page';

export function generateStaticParams() {
  return CJK_LOCALES.flatMap((locale) => page.generateStaticParams({ params: { locale } }));
}
