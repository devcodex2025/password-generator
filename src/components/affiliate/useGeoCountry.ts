'use client';

import { useEffect, useState } from 'react';

/**
 * Country code from the `geo` cookie (set by middleware from the platform's
 * IP header). Returns undefined during SSR and on the first client render, so
 * the server-rendered markup and the first client render always match.
 */
export function useGeoCountry(): string | undefined {
  const [geo, setGeo] = useState<string | undefined>(undefined);

  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)geo=([A-Za-z]{2})(?:;|$)/);
    if (match) setGeo(match[1].toUpperCase());
  }, []);

  return geo;
}
