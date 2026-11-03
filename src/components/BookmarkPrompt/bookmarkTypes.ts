/**
 * Shared types for the BookmarkPrompt feature.
 *
 * The runtime helpers live in `bookmarkUtils.mjs` so the pure logic can be
 * exercised by the repository's `node --test` suite without a build step.
 */

export type DeviceType = 'desktop' | 'tablet' | 'mobile';

export type OperatingSystem =
  | 'windows'
  | 'macos'
  | 'linux'
  | 'chromeos'
  | 'android'
  | 'ios'
  | 'ipados'
  | 'unknown';

export type BrowserId =
  | 'chrome'
  | 'edge'
  | 'firefox'
  | 'safari'
  | 'brave'
  | 'opera'
  | 'samsung'
  | 'other';

export interface PlatformInfo {
  deviceType: DeviceType;
  os: OperatingSystem;
  browser: BrowserId;
  /** False when the user agent could not identify the OS/browser reliably. */
  isReliable: boolean;
}

export interface PlatformSignals {
  userAgent?: string;
  platform?: string;
  maxTouchPoints?: number;
  coarsePointer?: boolean;
  viewportWidth?: number;
}

export type BookmarkStepId =
  | 'press_shortcut'
  | 'open_menu'
  | 'choose_bookmark'
  | 'confirm'
  | 'share'
  | 'add_bookmark'
  | 'save';

export interface BookmarkInstructionsPlan {
  steps: BookmarkStepId[];
  /** `Ctrl + D` / `⌘ + D`, or `null` when a keyboard is not the primary input. */
  shortcut: string | null;
  /** Translation key for the platform summary line. */
  noteKey: string | null;
  /** Translation key for an OS-specific hint (desktop only). */
  osHintKey: string | null;
  /** Show the "or use the browser menu" alternative (desktop only). */
  menuAlternative: boolean;
}

export interface BookmarkState {
  dismissed: boolean;
  dismissedAt: number | null;
  markedDoneAt: number | null;
  version: number;
  updatedAt?: number;
}

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export type CloseMethod = 'close' | 'backdrop' | 'escape' | 'marked_done' | 'other_modal';
