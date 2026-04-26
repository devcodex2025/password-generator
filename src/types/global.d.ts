/* Global type augmentations for window analytics helpers */

export {};

declare global {
  interface Window {
    /** Google Analytics gtag function (injected by GA script in layout) */
    gtag?: (...args: unknown[]) => void;
    /** Vercel Analytics helper */
    va?: (event: string, data?: Record<string, unknown>) => void;
  }
}
