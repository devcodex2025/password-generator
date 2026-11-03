/**
 * Minimal modal coordination.
 *
 * The site has two independent client-side dialogs that must never be open at
 * the same time: the NordPass "where will you keep it" prompt (save modal) and
 * the bookmark instructions sheet. Instead of lifting both into a global store,
 * each dialog announces that it opened and closes itself when another one does.
 *
 * Guards: no document access during SSR and no throwing when the environment
 * does not support CustomEvent.
 */

export type ModalId = 'save-password' | 'bookmark-instructions';

export const MODAL_OPEN_EVENT = 'gptm:modal-open';

/** Let other dialogs know which modal just opened. */
export function announceModalOpen(id: ModalId): void {
  try {
    if (typeof window === 'undefined' || typeof window.dispatchEvent !== 'function') return;
    window.dispatchEvent(new CustomEvent<ModalId>(MODAL_OPEN_EVENT, { detail: id }));
  } catch {
    /* coordination is best-effort; it must never block a dialog */
  }
}

/** Subscribe to other dialogs opening. Returns an unsubscribe function. */
export function subscribeModalOpen(handler: (id: ModalId) => void): () => void {
  if (typeof window === 'undefined' || typeof window.addEventListener !== 'function') {
    return () => {};
  }

  const listener = (event: Event) => {
    const id = (event as CustomEvent<ModalId>).detail;
    if (id) handler(id);
  };

  window.addEventListener(MODAL_OPEN_EVENT, listener as EventListener);
  return () => window.removeEventListener(MODAL_OPEN_EVENT, listener as EventListener);
}
