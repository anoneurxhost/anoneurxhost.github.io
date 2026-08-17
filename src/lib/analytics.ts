/**
 * Lightweight, provider-agnostic analytics wrapper.
 *
 * Auth pages are marked `noindex` for crawlers, which has no effect on
 * analytics — these events keep firing on every auth flow.
 */

type Props = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    plausible?: (event: string, opts?: { props?: Props }) => void;
  }
}

export const trackEvent = (event: string, props: Props = {}) => {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", event, props);
    window.plausible?.(event, { props });
    window.dataLayer?.push({ event, ...props });
    // Always emit a DOM event so app-level listeners / tests can observe it.
    window.dispatchEvent(new CustomEvent("anx:analytics", { detail: { event, props } }));
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.debug("[analytics]", event, props);
    }
  } catch {
    /* analytics must never break a user flow */
  }
};

/** Namespaced helper for authentication flows. */
export const trackAuth = (action: string, props: Props = {}) =>
  trackEvent(`auth_${action}`, props);
