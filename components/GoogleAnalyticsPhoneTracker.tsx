'use client';

import { useEffect } from 'react';
import { trackPhoneClick } from '@/lib/analytics';

/**
 * Listens for clicks on tel: links and sends phone_click to GA4.
 * Uses delegation so all current and future tel: links are tracked without per-link changes.
 */
export function GoogleAnalyticsPhoneTracker() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Element;
      const link = target.closest('a[href]');
      const href = link?.getAttribute('href');
      if (!link || !href || !href.toLowerCase().startsWith('tel:')) return;
      const location = link.getAttribute('data-ga-location') ?? undefined;
      trackPhoneClick(location ? { link_location: location } : undefined);
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  return null;
}
