import { StrictMode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import '@/components/i18n'; // real translations, so queries use the visible labels
import PasswordGenerator from './PasswordGenerator';
import { loadWordlist } from './generatorModes';

// Heavy or browser-only pieces that are irrelevant to generation behavior.
vi.mock('react-rewards', () => ({ useReward: () => ({ reward: () => {} }) }));
vi.mock('next/image', () => ({ default: () => null }));
vi.mock('@/components/affiliate/SavePasswordModal', () => ({ default: () => null, shouldShowSavePrompt: () => false }));
vi.mock('./generatorModes', async (importOriginal) => ({
  ...(await importOriginal<typeof import('./generatorModes')>()),
  loadWordlist: vi.fn(),
}));

const FAKE_WORDS = Array.from({ length: 50 }, (_, i) => `word${i}`);
const gtag = vi.fn();

const passwordInputs = () => screen.queryAllByLabelText('Generated password') as HTMLInputElement[];
const firstPassword = () => passwordInputs()[0]?.value ?? '';
const events = (name: string) => gtag.mock.calls.filter(([type, event]) => type === 'event' && event === name);
const clickMode = (label: string) => fireEvent.click(screen.getByRole('button', { name: label }));
const setQuantity = (value: string) => fireEvent.change(screen.getByLabelText('Quantity'), { target: { value } });
const openBulk = () => fireEvent.click(screen.getByRole('button', { name: 'Bulk' }));
const bulkList = () =>
  within(screen.getByRole('list', { name: 'Generated passwords' }))
    .queryAllByRole('listitem')
    .map((li) => li.firstElementChild!.textContent!);
const bulkView = () => screen.getByRole('region', { name: 'Generate multiple passwords' });
// toolbar buttons come before the per-row icons, so the first match is the toolbar one
const toolbarBtn = (name: string) => within(bulkView()).getAllByRole('button', { name })[0];

async function renderGenerator(strict = false) {
  const ui = <PasswordGenerator language="en" />;
  render(strict ? <StrictMode>{ui}</StrictMode> : ui);
  await waitFor(() => expect(firstPassword()).not.toBe(''));
}

// jsdom has no layout: report a fixed field width so the row picks its density.
let fieldWidth = 800;
class FakeResizeObserver {
  constructor(private cb: ResizeObserverCallback) {}
  observe() {
    this.cb([{ contentRect: { width: fieldWidth } } as ResizeObserverEntry], this as unknown as ResizeObserver);
  }
  unobserve() {}
  disconnect() {}
}

beforeEach(() => {
  fieldWidth = 800;
  vi.stubGlobal('ResizeObserver', FakeResizeObserver);
  (window as unknown as { gtag: typeof gtag }).gtag = gtag;
  vi.mocked(loadWordlist).mockResolvedValue(FAKE_WORDS);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  gtag.mockReset();
});

describe('PasswordGenerator', () => {
  it('regenerates once after the settings settle, not per change', async () => {
    await renderGenerator();
    fireEvent.click(screen.getByLabelText('Set password length to 16'));
    fireEvent.click(screen.getByLabelText('Set password length to 20'));
    expect(firstPassword()).toHaveLength(12); // still debouncing

    await waitFor(() => expect(firstPassword()).toHaveLength(20));
    expect(events('passwords_regenerated')).toHaveLength(1);
  });

  it('restores each mode length when switching chars -> words -> chars', async () => {
    await renderGenerator();
    clickMode('Words');
    await waitFor(() => expect(firstPassword().split('-')).toHaveLength(4));
    clickMode('Characters');
    await waitFor(() => expect(firstPassword().split('-')).toHaveLength(1));
    expect(firstPassword()).toHaveLength(12);
  });

  it('keeps the previous value and warns when the wordlist fails on row regenerate', async () => {
    await renderGenerator();
    clickMode('Words');
    await waitFor(() => expect(firstPassword().split('-')).toHaveLength(4));
    const before = firstPassword();

    vi.mocked(loadWordlist).mockRejectedValue(new Error('offline'));
    fireEvent.click(screen.getAllByRole('button', { name: 'Generate' })[0]);

    await screen.findByText(/Could not load the word list/);
    expect(firstPassword()).toBe(before);
  });

  it('reports the share target picked on the main row', async () => {
    await renderGenerator();
    fireEvent.click(screen.getByRole('button', { name: 'Share password' }));
    fireEvent.click(await screen.findByRole('menuitem', { name: 'WhatsApp' }));
    expect(events('password_shared').slice(-1)[0]?.[2]).toMatchObject({ target: 'whatsapp', count: 1, surface: 'home' });
  });

  it('confirms a successful copy and reports it', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText } });
    await renderGenerator();
    const password = firstPassword();
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));

    await screen.findByText('Password copied successfully');
    expect(writeText).toHaveBeenCalledWith(password);
    expect(events('password_copied').slice(-1)[0]?.[2]).toMatchObject({ index: 0, surface: 'home' });
  });

  it('reports a refused copy and never claims success', async () => {
    vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText: vi.fn().mockRejectedValue(new Error('denied')) } });
    await renderGenerator();
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));

    await screen.findByText(/Copy failed/);
    expect(screen.queryByText('Password copied successfully')).toBeNull();
    expect(events('password_copied')).toHaveLength(0);
  });

  it('shows copy, share, generate as labelled buttons when the field is wide', async () => {
    await renderGenerator();
    const names = screen.getAllByRole('button').map((b) => b.textContent);
    const [copy, share, generate] = ['Copy', 'Share password', 'Generate'].map((n) => names.indexOf(n));
    expect(copy).toBeGreaterThan(-1);
    expect(copy).toBeLessThan(share);
    expect(share).toBeLessThan(generate);
    expect(screen.queryByRole('button', { name: 'More actions' })).toBeNull();
  });

  it('collapses share and generate into a dropdown when the field is narrow', async () => {
    fieldWidth = 300;
    await renderGenerator();
    expect(screen.getByRole('button', { name: 'Copy' })).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Generate' })).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'More actions' }));
    const before = firstPassword();
    fireEvent.click(await screen.findByRole('menuitem', { name: 'Generate' }));
    await waitFor(() => expect(firstPassword()).not.toBe(before));
    expect(screen.queryByRole('menuitem', { name: 'Telegram' })).toBeNull();
  });

  it('sends a single initial generation event under StrictMode', async () => {
    await renderGenerator(true);
    // give a duplicated effect time to fire if it were going to
    await new Promise((resolve) => setTimeout(resolve, 300));
    expect(events('passwords_generated_batch')).toHaveLength(1);
    expect(events('passwords_regenerated')).toHaveLength(0);
  });

  describe('bulk generation', () => {
    const stubClipboard = () => {
      const writeText = vi.fn().mockResolvedValue(undefined);
      vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText } });
      return writeText;
    };
    const lastEvent = (name: string) => events(name).slice(-1)[0]?.[2];

    it('opens in place of the form and renders a fresh list for each quantity', async () => {
      await renderGenerator();
      expect(screen.queryByLabelText('Quantity')).toBeNull(); // no inline field on the form
      openBulk();
      expect(lastEvent('bulk_opened')).toMatchObject({ surface: 'home' });
      expect(bulkView()).toBeTruthy();
      // the covered form is out of reach for keyboard and screen readers
      expect(screen.getByRole('button', { name: 'Bulk', hidden: true }).closest('[inert]')).not.toBeNull();
      await waitFor(() => expect(bulkList()).toHaveLength(10));
      expect(lastEvent('passwords_generated_batch')).toMatchObject({ count: 10, surface: 'bulk' });
      const first = bulkList();

      setQuantity('3');
      await waitFor(() => expect(bulkList()).toHaveLength(3));
      // columns are sized from the longest password (layout itself needs a real browser)
      expect(screen.getByRole('list').style.gridTemplateColumns).toContain('12ch');
      expect(bulkList().every((p) => p.length === 12 && !first.includes(p))).toBe(true);
      expect(lastEvent('passwords_generated_batch')).toMatchObject({ count: 3, surface: 'bulk' });
    });

    it('settles quickly typed quantities into one generation', async () => {
      await renderGenerator();
      openBulk();
      await waitFor(() => expect(bulkList()).toHaveLength(10));
      const before = events('passwords_generated_batch').length;
      setQuantity('2');
      setQuantity('25');
      await waitFor(() => expect(bulkList()).toHaveLength(25));
      await new Promise((r) => setTimeout(r, 300));
      expect(events('passwords_generated_batch').slice(before).map(([, , p]) => p.count)).toEqual([25]);
    });

    it('lets the quantity field be cleared and retyped', async () => {
      await renderGenerator();
      openBulk();
      await waitFor(() => expect(bulkList()).toHaveLength(10));
      const field = screen.getByLabelText('Quantity') as HTMLInputElement;
      setQuantity('');
      expect(field.value).toBe(''); // no snap back to 10 while editing
      setQuantity('7');
      await waitFor(() => expect(bulkList()).toHaveLength(7));
      setQuantity('');
      fireEvent.blur(field);
      expect(field.value).toBe('7'); // leaving it empty restores the shown quantity
    });

    it('copies, regenerates and downloads the whole list from the toolbar', async () => {
      const writeText = stubClipboard();
      // jsdom has no createObjectURL; stub just that, URL itself must stay a constructor
      Object.defineProperty(URL, 'createObjectURL', { value: vi.fn(() => 'blob:passwords'), configurable: true });
      const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
      await renderGenerator();
      openBulk();
      await waitFor(() => expect(bulkList()).toHaveLength(10));
      const list = bulkList();

      // toolbar matches the main row; Download then Close sit where the Bulk button is
      const names = within(bulkView()).getAllByRole('button').map((b) => b.textContent);
      expect(names.slice(0, 5)).toEqual(['Copy', 'Share', 'Generate', 'Download', 'Close']);

      fireEvent.click(toolbarBtn('Copy'));
      await waitFor(() => expect(writeText).toHaveBeenCalledWith(list.join('\n')));
      await waitFor(() => expect(lastEvent('passwords_copied_all')).toMatchObject({ count: 10, surface: 'bulk' }));

      fireEvent.click(toolbarBtn('Generate'));
      await waitFor(() => expect(bulkList()).not.toEqual(list));
      expect(bulkList()).toHaveLength(10);
      expect(lastEvent('passwords_regenerated')).toMatchObject({ count: 10, surface: 'bulk' });

      fireEvent.click(toolbarBtn('Download'));
      expect(click).toHaveBeenCalledOnce();
      expect(lastEvent('passwords_downloaded')).toMatchObject({ count: 10, surface: 'bulk' });
      click.mockRestore();
    });

    it('shares a short list by link and reports the target', async () => {
      await renderGenerator();
      openBulk();
      setQuantity('3');
      await waitFor(() => expect(bulkList()).toHaveLength(3));
      const list = bulkList();

      fireEvent.click(toolbarBtn('Share'));
      const email = await screen.findByRole('menuitem', { name: 'Email' });
      for (const p of list) expect(email.getAttribute('href')).toContain(encodeURIComponent(p));
      fireEvent.click(screen.getByRole('menuitem', { name: 'Telegram' }));
      expect(lastEvent('password_shared')).toMatchObject({ target: 'telegram', count: 3, surface: 'bulk' });
    });

    it('does not build a share link longer than messengers accept', async () => {
      await renderGenerator();
      openBulk();
      setQuantity('100');
      await waitFor(() => expect(bulkList()).toHaveLength(100));
      fireEvent.click(toolbarBtn('Share')); // jsdom has no navigator.share: hint instead of links
      expect(await screen.findByText(/Too many passwords to share as a link/)).toBeTruthy();
      expect(screen.queryByRole('menuitem', { name: 'Email' })).toBeNull();
    });

    it('copies, shares and regenerates a single row from its icons', async () => {
      const writeText = stubClipboard();
      await renderGenerator();
      openBulk();
      await waitFor(() => expect(bulkList()).toHaveLength(10));
      const before = bulkList();
      const row = within(screen.getAllByRole('listitem')[2]);

      // each icon is described by its own password, so "Copy" says which one
      const copy = row.getByRole('button', { name: 'Copy' });
      expect(document.getElementById(copy.getAttribute('aria-describedby')!)!.textContent).toBe(before[2]);

      fireEvent.click(copy);
      expect(writeText).toHaveBeenCalledWith(before[2]);
      expect(await row.findByRole('button', { name: 'Copied' })).toBeTruthy();
      expect(within(bulkView()).getByRole('status').textContent).toBe('Copied'); // announced
      expect(lastEvent('password_copied')).toMatchObject({ index: 2, surface: 'bulk' });

      fireEvent.click(row.getByRole('button', { name: 'Share password' }));
      expect((await screen.findByRole('menuitem', { name: 'Email' })).getAttribute('href')).toContain(encodeURIComponent(before[2]));
      fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });

      fireEvent.click(row.getByRole('button', { name: 'Generate' }));
      await waitFor(() => expect(bulkList()[2]).not.toBe(before[2]));
      expect(bulkList().filter((p, i) => p !== before[i])).toHaveLength(1);
      expect(lastEvent('password_generated')).toMatchObject({ surface: 'bulk' });
    });

    it('does not claim a copy the clipboard refused', async () => {
      vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText: vi.fn().mockRejectedValue(new Error('denied')) } });
      await renderGenerator();
      openBulk();
      await waitFor(() => expect(bulkList()).toHaveLength(10));
      const row = within(screen.getAllByRole('listitem')[0]);
      fireEvent.click(row.getByRole('button', { name: 'Copy' }));
      await new Promise((r) => setTimeout(r, 50));
      expect(row.queryByRole('button', { name: 'Copied' })).toBeNull();
    });

    it('keeps the list and warns when the word list fails', async () => {
      await renderGenerator();
      clickMode('Words');
      await waitFor(() => expect(firstPassword().split('-')).toHaveLength(4));
      openBulk();
      await waitFor(() => expect(bulkList()).toHaveLength(10));
      const before = bulkList();
      vi.mocked(loadWordlist).mockRejectedValue(new Error('offline'));
      fireEvent.click(toolbarBtn('Generate'));
      await screen.findByText(/Could not load the word list/);
      expect(bulkList()).toEqual(before);
    });

    it('clamps the quantity to 1..100', async () => {
      await renderGenerator();
      openBulk();
      setQuantity('-5');
      await waitFor(() => expect(bulkList()).toHaveLength(1));
      expect((screen.getByLabelText('Quantity') as HTMLInputElement).value).toBe('1');
      setQuantity('500');
      await waitFor(() => expect(bulkList()).toHaveLength(100));
    });

    it('closes on Escape or Close and returns focus to the opener', async () => {
      await renderGenerator();
      const opener = screen.getByRole('button', { name: 'Bulk' });
      for (const close of [() => fireEvent.keyDown(bulkView(), { key: 'Escape' }), () => fireEvent.click(toolbarBtn('Close'))]) {
        opener.focus();
        openBulk();
        expect(document.activeElement).toBe(screen.getByLabelText('Quantity'));
        close();
        expect(screen.queryByRole('region', { name: 'Generate multiple passwords' })).toBeNull();
        expect(opener.closest('[inert]')).toBeNull();
        expect(document.activeElement).toBe(opener);
      }
    });
  });

  describe('compliance presets', () => {
    const preset = (name: string) => screen.getByRole('button', { name });
    const lengthLabel = () => screen.getByText(/Password Length:/).textContent;

    it('applies the preset minimum to the length and shows it in the label', async () => {
      await renderGenerator();
      fireEvent.click(screen.getByLabelText('Set password length to 8'));
      expect(lengthLabel()).toMatch(/ 8\s*≥ 8/);

      fireEvent.click(preset('PCI DSS'));
      expect(lengthLabel()).toMatch(/ 12\s*≥ 12/);
      await waitFor(() => expect(firstPassword()).toHaveLength(12));
    });

    it('falls back to custom when a character set is unchecked', async () => {
      await renderGenerator();
      expect(preset('NIST 800-63B').getAttribute('aria-pressed')).toBe('true');

      fireEvent.click(preset('#$%'));
      expect(preset('NIST 800-63B').getAttribute('aria-pressed')).toBe('false');
      expect(preset('PCI DSS').getAttribute('aria-pressed')).toBe('false');
      expect(screen.queryByText('Minimum 4 characters, custom character settings')).not.toBeNull();
      expect(lengthLabel()).not.toContain('≥');
    });

    it('falls back to custom when the length drops below the preset minimum', async () => {
      await renderGenerator();
      fireEvent.click(screen.getByLabelText('Set password length to 8'));
      fireEvent.click(screen.getByLabelText('Decrease password length'));
      expect(preset('NIST 800-63B').getAttribute('aria-pressed')).toBe('false');
      await waitFor(() => expect(firstPassword()).toHaveLength(7));
    });

    it('releases the active preset on click and restores its sets when picked again', async () => {
      await renderGenerator();
      fireEvent.click(preset('#$%'));
      fireEvent.click(preset('NIST 800-63B'));
      expect(preset('#$%').getAttribute('aria-pressed')).toBe('true');

      fireEvent.click(preset('NIST 800-63B'));
      expect(preset('NIST 800-63B').getAttribute('aria-pressed')).toBe('false');
      expect(preset('#$%').getAttribute('aria-pressed')).toBe('true'); // settings are kept
    });
  });
});
