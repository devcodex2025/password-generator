import Script from 'next/script';
import { buildHomeJsonLdScripts } from '@/lib/home-structured-data';

export default function HomeStructuredData({ locale }: { locale: string }) {
  const scripts = buildHomeJsonLdScripts(locale);
  return (
    <>
      {scripts.map(({ id, payload }) => (
        <Script
          key={id}
          id={id}
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
        />
      ))}
    </>
  );
}
