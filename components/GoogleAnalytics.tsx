'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Sends page_view to GA4 on client-side route changes (Next.js Link navigation).
 * Initial page load is already tracked by the gtag config in layout; this handles SPA navigations.
 */
export function GoogleAnalyticsRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (!GA_ID || typeof window === 'undefined' || typeof window.gtag !== 'function') return;

    // Skip first run: initial page_view is sent by the inline gtag('config') in layout
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const fullPath = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    window.gtag('config', GA_ID, { page_path: fullPath });
  }, [pathname, searchParams]);

  return null;
}
