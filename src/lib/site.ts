/**
 * Site-wide URL constants.
 *
 * Every public page lives under the /en-us locale prefix, so all canonical
 * URLs are built with `canonicalPath`/`canonicalUrl` instead of concatenating
 * a raw route path against SITE.
 */
export const SITE = "https://anoneurx.com";

/** Locale prefix applied to every page URL. */
export const LOCALE_PREFIX = "/en-us";

/** Maps an app route path onto its canonical URL path. */
export const canonicalPath = (path: string): string => {
  if (!path || path === "/") return LOCALE_PREFIX;
  return `${LOCALE_PREFIX}${path.startsWith("/") ? path : `/${path}`}`;
};

/** Maps an app route path onto its absolute canonical URL. */
export const canonicalUrl = (path: string): string => `${SITE}${canonicalPath(path)}`;
