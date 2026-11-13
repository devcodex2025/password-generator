import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { CustomThemeProvider, useTheme } from './ThemeContext';
import { BROWSER_THEME_DARK, BROWSER_THEME_LIGHT } from '@/lib/browser-theme';

function ThemeToggle() {
  const { toggleMode } = useTheme();
  return <button onClick={toggleMode}>toggle</button>;
}

function themeColorMeta() {
  return document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
}

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.classList.remove('dark', 'theme-switching');
  document.head.innerHTML = `<meta name="theme-color" content="${BROWSER_THEME_LIGHT}" />`;
});

afterEach(() => {
  cleanup();
  document.head.innerHTML = '';
});

describe('CustomThemeProvider', () => {
  it('tints the mobile browser chrome for both themes', () => {
    render(
      <CustomThemeProvider>
        <ThemeToggle />
      </CustomThemeProvider>,
    );

    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(themeColorMeta()?.content).toBe(BROWSER_THEME_LIGHT);

    fireEvent.click(screen.getByRole('button'));
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(themeColorMeta()?.content).toBe(BROWSER_THEME_DARK);
    expect(JSON.parse(window.localStorage.getItem('darkMode') ?? 'false')).toBe(true);

    fireEvent.click(screen.getByRole('button'));
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(themeColorMeta()?.content).toBe(BROWSER_THEME_LIGHT);
  });

  it('creates the meta tag when the document does not have one', () => {
    document.head.innerHTML = '';

    render(
      <CustomThemeProvider>
        <ThemeToggle />
      </CustomThemeProvider>,
    );

    expect(themeColorMeta()?.content).toBe(BROWSER_THEME_LIGHT);
  });
});