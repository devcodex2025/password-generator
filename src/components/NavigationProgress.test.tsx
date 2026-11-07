import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import NavigationProgress from './NavigationProgress';

vi.mock('next/navigation', () => ({ usePathname: () => '/en' }));

afterEach(cleanup);

const clickLink = (attrs: Record<string, string>) => {
  const a = Object.assign(document.createElement('a'), attrs);
  a.addEventListener('click', (e) => e.preventDefault()); // jsdom cannot navigate
  document.body.appendChild(a);
  fireEvent.click(a);
  a.remove();
};

describe('NavigationProgress', () => {
  it('shows the overlay for a same-origin page link', () => {
    render(<NavigationProgress />);
    clickLink({ href: '/en/guides' });
    expect(screen.queryByRole('status')).not.toBeNull();
  });

  it('ignores file downloads, which never change the route', () => {
    render(<NavigationProgress />);
    clickLink({ href: `blob:${location.origin}/passwords`, download: 'passwords.txt' });
    expect(screen.queryByRole('status')).toBeNull();
  });
});
