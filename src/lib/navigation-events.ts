/**
 * Lightweight bridge for starting the global navigation overlay from
 * components that are not rendered inside NavigationProgress itself
 * (for example the header language switcher, which updates the locale
 * through the router rather than through a plain <a> click).
 */
export const NAVIGATION_START_EVENT = 'app:navigation-start';

export function startNavigationLoading(locale?: string) {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(
    new CustomEvent<{ locale?: string }>(NAVIGATION_START_EVENT, {
      detail: { locale },
    })
  );
}
