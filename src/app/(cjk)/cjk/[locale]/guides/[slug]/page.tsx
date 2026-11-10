// zh and ja: the same route as src/app/(latin)/[locale]/guides/[slug]/page.tsx, rendered under the CJK root layout.
import * as page from '@/app/(latin)/[locale]/guides/[slug]/page';
import { CJK_LOCALES } from '@/lib/cjk-locales';

export * from '@/app/(latin)/[locale]/guides/[slug]/page';
export { default } from '@/app/(latin)/[locale]/guides/[slug]/page';

export function generateStaticParams() {
  return CJK_LOCALES.flatMap((locale) => page.generateStaticParams({ params: { locale } }));
}
