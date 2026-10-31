import { buildHomeJsonLdScripts } from '@/lib/home-structured-data';

/**
 * Server-rendered JSON-LD. Plain <script> elements (not next/script) so the
 * data ships inside the static HTML for crawlers and never crosses a client
 * boundary: a <script> inside a client hydration tree triggers a dev-side
 * "script tag" warning and would be treated as user code.
 */
export default function HomeStructuredData({ locale }: { locale: string }) {
  const scripts = buildHomeJsonLdScripts(locale);
  return (
    <>
      {scripts.map(({ id, payload }) => (
        <script
          key={id}
          id={id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
        />
      ))}
    </>
  );
}
