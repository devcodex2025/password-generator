'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

interface GuideReadButtonProps {
  href: string;
  label: string;
  loadingLabel?: string;
}

export default function GuideReadButton({ href, label, loadingLabel = 'Loading...' }: GuideReadButtonProps) {
  const router = useRouter();
  const [locked, setLocked] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isNavigating = locked || isPending;

  const onClick = () => {
    if (isNavigating) return;
    setLocked(true);
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isNavigating}
      aria-busy={isNavigating}
      className="mt-4 inline-flex items-center gap-2 rounded-24 bg-[#2A4E63] text-white hover:text-white dark:bg-[#05a9ff] dark:text-[#0a1e2a] dark:hover:text-[#0a1e2a] px-4 py-2 text-sm font-semibold leading-none subpixel-antialiased transition-colors duration-200 hover:bg-[#1f3b4c] dark:hover:bg-[#38beff] hover:underline underline-offset-4 decoration-2 disabled:opacity-75 disabled:cursor-not-allowed"
    >
      {isNavigating ? (
        <>
          <span className="inline-block h-3.5 w-3.5 rounded-full border-2 border-current border-r-transparent animate-spin" />
          {loadingLabel}
        </>
      ) : (
        label
      )}
    </button>
  );
}
