import { afterEach, describe, expect, it } from 'vitest';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@/components/i18n';
import BookmarkPrompt from './BookmarkPrompt';

const title = () => screen.queryByRole('heading', { name: 'Bookmark this tool' });
const setConsentCookie = () => {
  document.cookie = `cc_cookie=${encodeURIComponent('{"categories":["necessary"]}')}; path=/`;
};

afterEach(() => {
  cleanup();
  document.cookie = 'cc_cookie=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  document.documentElement.className = '';
  localStorage.clear();
});

describe('BookmarkPrompt', () => {
  it('waits for a stored cookie choice, then pins to the viewport bottom', async () => {
    render(<BookmarkPrompt language="en" active />);
    document.documentElement.classList.add('show--consent'); // banner open
    await new Promise((r) => setTimeout(r, 50));
    expect(title()).toBeNull();

    // the visitor accepts: cookie stored, banner closed
    setConsentCookie();
    act(() => {
      document.documentElement.classList.remove('show--consent');
    });
    await waitFor(() => expect(title()).not.toBeNull());
    expect(title()!.closest('section')!.parentElement).toBe(document.body); // portal, not inline
  });

  it('reserves bottom space while shown so it never covers focused content', async () => {
    setConsentCookie();
    render(<BookmarkPrompt language="en" active />);
    await waitFor(() => expect(title()).not.toBeNull());
    expect(document.body.style.paddingBottom).not.toBe('');
    expect(document.documentElement.style.scrollPaddingBottom).toBe(document.body.style.paddingBottom);

    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    await waitFor(() => expect(title()).toBeNull());
    expect(document.body.style.paddingBottom).toBe('');
    expect(document.documentElement.style.scrollPaddingBottom).toBe('');
  });

  it('hides while the cookie preferences dialog is reopened', async () => {
    setConsentCookie();
    render(<BookmarkPrompt language="en" active />);
    await waitFor(() => expect(title()).not.toBeNull());

    act(() => {
      document.documentElement.classList.add('show--preferences');
    });
    await waitFor(() => expect(title()).toBeNull());
    act(() => {
      document.documentElement.classList.remove('show--preferences');
    });
    await waitFor(() => expect(title()).not.toBeNull());
  });
});
