const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function isClient(): boolean {
  return typeof window !== 'undefined';
}

function hasGtag(): boolean {
  return isClient() && typeof window.gtag === 'function';
}

/**
 * Send event to GA4. Uses gtag when available; otherwise pushes to dataLayer
 * so events aren't lost if the user acts before gtag.js has loaded (lazyOnload).
 */
function sendEvent(eventName: string, params: Record<string, unknown>): void {
  if (!isClient() || !GA_ID) return;
  try {
    if (hasGtag()) {
      window.gtag('event', eventName, params);
    } else {
      const w = window as Window & { dataLayer?: unknown[] };
      w.dataLayer = w.dataLayer ?? [];
      w.dataLayer.push(['event', eventName, params]);
    }
  } catch {
    // Ad blockers or gtag errors must not break the site
  }
}

/**
 * Send phone_click event to GA4. Call when user clicks a tel: link.
 */
export function trackPhoneClick(options?: { link_location?: string }): void {
  const params: Record<string, string> = {
    page_location: window.location.href,
  };
  if (options?.link_location) {
    params.link_location = options.link_location;
  }
  sendEvent('phone_click', params);
}

/**
 * Send form submission event to GA4.
 * Success: uses recommended generate_lead for conversions.
 * Failure: uses form_submit_error for monitoring.
 */
export function trackFormSubmit(options: {
  form_name: string;
  success: boolean;
}): void {
  if (options.success) {
    sendEvent('generate_lead', { form_name: options.form_name });
  } else {
    sendEvent('form_submit_error', {
      form_name: options.form_name,
      success: false,
    });
  }
}
