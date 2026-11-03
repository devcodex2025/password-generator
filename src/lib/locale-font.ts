/**
 * Locale fonts for text rendered outside `.container.<locale>`.
 *
 * The site maps fonts per locale in `src/styles/index.css` with selectors such
 * as `.container.ua *`. Page content is inside that container, but dialogs are
 * rendered through a portal directly under `<body>`, so they used to fall back
 * to the default Varela Round stack: Cyrillic then dropped to a system face and
 * CJK to the browser default, which no longer matched the rest of the page.
 *
 * A plain inline `fontFamily` on the dialog root is not enough: the global
 * `* { font-family: ... }` rule applies to every child and beats inheritance.
 * These helper class names pair with the `.locale-font-*` rules in the global
 * stylesheet, which target descendants the same way the page rules do.
 */

/** Class that applies the locale font to the element and all of its children. */
export function localeFontClass(locale: string | undefined | null): string {
  switch (locale) {
    case 'ua':
    case 'ru':
      return 'locale-font-ua';
    case 'zh':
      return 'locale-font-zh';
    case 'ja':
      return 'locale-font-ja';
    default:
      // English, Polish and any other Latin locale already inherit the default
      // Varela Round stack from the global rule.
      return '';
  }
}
