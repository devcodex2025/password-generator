// zh and ja: the same route as src/app/(latin)/[locale]/guides/[slug]/opengraph-image/route.tsx,
// rendered under the CJK root layout.
import * as route from '@/app/(latin)/[locale]/guides/[slug]/opengraph-image/route';
import { CJK_LOCALES } from '@/lib/cjk-locales';

export * from '@/app/(latin)/[locale]/guides/[slug]/opengraph-image/route';

export function generateStaticParams() {
  return CJK_LOCALES.flatMap((locale) => route.generateStaticParams({ params: { locale } }));
}
