/* Mobile browser chrome (address bar and status area). Light mode uses the
   tinted brand surface, dark mode the ink neutral, so the chrome follows the
   theme chosen in the app instead of the operating system preference. */
export const BROWSER_THEME_LIGHT = '#E5F6FF';
export const BROWSER_THEME_DARK = '#071016';

export function browserThemeColor(isDark: boolean) {
  return isDark ? BROWSER_THEME_DARK : BROWSER_THEME_LIGHT;
}