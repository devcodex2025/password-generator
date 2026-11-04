import { StrictMode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
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

async function renderGenerator(strict = false) {
  const ui = <PasswordGenerator language="en" />;
  render(strict ? <StrictMode>{ui}</StrictMode> : ui);
  await waitFor(() => expect(firstPassword()).not.toBe(''));
}

beforeEach(() => {
  (window as unknown as { gtag: typeof gtag }).gtag = gtag;
  vi.mocked(loadWordlist).mockResolvedValue(FAKE_WORDS);
});

afterEach(() => {
  cleanup();
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

  it('appends rows on quantity increase without replacing existing ones', async () => {
    await renderGenerator();
    const before = firstPassword();
    setQuantity('3');
    await waitFor(() => expect(passwordInputs()).toHaveLength(3));
    expect(firstPassword()).toBe(before);
    expect(events('passwords_generated_batch').slice(-1)[0]?.[2]).toMatchObject({ count: 2 });
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

  it('sends a single initial generation event under StrictMode', async () => {
    await renderGenerator(true);
    // give a duplicated effect time to fire if it were going to
    await new Promise((resolve) => setTimeout(resolve, 300));
    expect(events('passwords_generated_batch')).toHaveLength(1);
    expect(events('passwords_regenerated')).toHaveLength(0);
  });

  it('recovers the row count after a failed append', async () => {
    await renderGenerator();
    clickMode('Words');
    await waitFor(() => expect(firstPassword().split('-')).toHaveLength(4));

    vi.mocked(loadWordlist).mockRejectedValueOnce(new Error('offline'));
    setQuantity('2');
    await screen.findByText(/Could not load the word list/);
    expect(passwordInputs()).toHaveLength(1);

    setQuantity('3');
    await waitFor(() => expect(passwordInputs()).toHaveLength(3));
  });

  it('clamps a negative quantity to 1', async () => {
    await renderGenerator();
    setQuantity('3');
    await waitFor(() => expect(passwordInputs()).toHaveLength(3));
    setQuantity('-5');
    await waitFor(() => expect(passwordInputs()).toHaveLength(1));
    expect((screen.getByLabelText('Quantity') as HTMLInputElement).value).toBe('1');
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
