import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { findSeoSection, isSectionRoot } from "@/lib/seoSections";

const SITE = "https://anoneurx.com";
const BRAND = "ANONEURX";

/** 1200x630 social card used whenever a page does not supply its own. */
const DEFAULT_OG_IMAGE = "/og-default.png";

interface SEOProps {
  /** Page label, e.g. "LYNX". The section prefix is added automatically. */
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  jsonLd?: object | object[];
  noindex?: boolean;
  /** Overrides the section inferred from `path`. Rarely needed. */
  section?: string;
}

/**
 * Strips brand and section noise from an authored page title so the composed
 * title does not read "OPEN SOURCE | Anoneurx Open Source Projects".
 *
 * Handles trailing brand attributions first ("(Anoneurx Lab)", "— Anoneurx Cloud",
 * "Contact Anoneurx University"), then a leading brand, then one leading section
 * phrase. Section-phrase stripping is skipped on section landing pages, where the
 * product name is the whole point of the title.
 */
const cleanPageLabel = (raw: string, sectionWords: string[], stripSection: boolean): string => {
  let label = raw
    // Trailing brand attributions: "(Anoneurx Lab)", " — Anoneurx Cloud",
    // "Contact Anoneurx University"
    .replace(/\s*[([][^)\]]*anoneurx[^)\]]*[)\]]\s*$/i, "")
    .replace(/\s[—–·|]+\s*anoneurx\b[^—–·|]*$/i, "")
    .replace(/\s+anoneurx$/i, "")
    .replace(/\s*\|\s*anoneurx\s*$/i, "")
    .trim();

  // Leading brand word: "Anoneurx Cloud Products" -> "Cloud Products"
  label = label.replace(/^anoneurx\s+/i, "").trim();

  if (stripSection) {
    // Leading section phrase, once, only when something meaningful remains:
    // "Open Source Projects" -> "Projects"
    for (const word of sectionWords) {
      const stripped = label.replace(new RegExp(`^${word}\\s+`, "i"), "").trim();
      if (stripped !== label && stripped.replace(/[^\p{L}\p{N}]/gu, "").length >= 3) {
        label = stripped;
        break;
      }
    }
  }

  // Leftover separators from the strip above.
  return label.replace(/^[—–·|\s]+/, "").trim();
};

/**
 * Builds the final document title.
 *
 * Section landing pages keep the brand prefix; pages inside a section are
 * prefixed by the section instead, which reads better in SERPs and keeps the
 * result scannable in a browser tab.
 */
const composeTitle = (title: string | undefined, path: string, override?: string): string => {
  const section = findSeoSection(path);
  const isRoot = !section || isSectionRoot(path, section);

  if (!title) return override ? `${BRAND} | ${override}` : BRAND;

  const label = cleanPageLabel(title, section?.words ?? [], !isRoot);
  if (!label) return BRAND;

  if (override) return `${override} | ${label}`;
  if (section && !isRoot) return `${section.label.toUpperCase()} | ${label}`;
  return `${BRAND} | ${label}`;
};

/**
 * Sitewide SEO component. Composes the document title, meta description,
 * canonical, Open Graph, Twitter Card and optional JSON-LD.
 *
 * The `meta keywords` tag is deliberately not emitted — major search engines
 * have ignored it since 2009 and it only adds noise to the head.
 */
const SEO = ({
  title,
  description = "Anoneurx builds open source software, the Black Wall operating system, Nexora browser, ASTRA research, Anoneurx Cloud, Anoneurx Pay and Anoneurx University.",
  path = "/",
  image,
  type = "website",
  jsonLd,
  noindex,
  section,
}: SEOProps) => {
  const fullTitle = composeTitle(title, path, section);
  const url = `${SITE}${path}`;
  const absolute = (value?: string) =>
    !value || value.startsWith("http") ? value : `${SITE}${value.startsWith("/") ? value : `/${value}`}`;
  const ogImage = absolute(image || DEFAULT_OG_IMAGE) as string;

  const ldArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  // react-helmet-async cannot re-emit property/name-keyed meta tags reliably in
  // the browser, and it strips the data-rh ones it cannot match. og/twitter tags
  // are therefore managed imperatively: drop any leftovers (e.g. from the SPA
  // fallback shell or a previous route) and (re)write the tags for this page.
  useEffect(() => {
    const head = document.head;
    head
      .querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]')
      .forEach((tag) => tag.remove());
    if (noindex) return;
    const ogAndTwitter: Array<[attr: "property" | "name", key: string, value: string]> = [
      ["property", "og:title", fullTitle],
      ["property", "og:description", description],
      ["property", "og:url", url],
      ["property", "og:type", type],
      ["property", "og:site_name", "Anoneurx"],
      ["property", "og:image", ogImage],
      ["property", "og:image:width", "1200"],
      ["property", "og:image:height", "630"],
      ["property", "og:image:alt", "Anoneurx"],
      ["name", "twitter:card", "summary_large_image"],
      ["name", "twitter:title", fullTitle],
      ["name", "twitter:description", description],
      ["name", "twitter:image", ogImage],
    ];
    for (const [attr, key, value] of ogAndTwitter) {
      const meta = document.createElement("meta");
      meta.setAttribute(attr, key);
      meta.setAttribute("content", value);
      head.appendChild(meta);
    }
  }, [fullTitle, description, url, type, ogImage, noindex]);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <link rel="canonical" href={url} />
      )}

      {ldArray.map((ld, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(ld)}</script>
      ))}
    </Helmet>
  );
};

export default SEO;
