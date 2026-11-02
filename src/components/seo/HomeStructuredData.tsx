import { buildHomeJsonLdScripts } from '@/lib/home-structured-data';

/**
 * Server-rendered JSON-LD.
 *
 * The markup is emitted as one HTML string instead of React-rendered <script>
 * elements. React 19 warns ("Encountered a script tag while rendering React
 * component") whenever the locale layout re-renders during client-side
 * navigation. Inserting the same payload through `dangerouslySetInnerHTML`
 * keeps the <script type="application/ld+json"> tags in the server HTML for
 * crawlers, refreshes them on client navigation, and never asks React to
 * create a script element. JSON-LD is data, not executable code, so the
 * browser not executing an innerHTML-inserted script is intentional.
 *
 * `<` is escaped to prevent a payload string from closing the script tag.
 */
export default function HomeStructuredData({ locale }: { locale: string }) {
  const scripts = buildHomeJsonLdScripts(locale);
  const html = scripts
    .map(({ id, payload }) => {
      const json = JSON.stringify(payload).replace(/</g, '\\u003c');
      return `<script id="${id}" type="application/ld+json">${json}</script>`;
    })
    .join('');

  return <div hidden aria-hidden="true" dangerouslySetInnerHTML={{ __html: html }} />;
}
