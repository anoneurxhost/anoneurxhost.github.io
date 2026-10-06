/**
 * Section registry used to build SEO titles.
 *
 * A section is the top-level product or area a page lives under. Titles follow a
 * section-first convention:
 *
 *   /opensource            ->  ANONEURX | OPEN SOURCE      (section landing page)
 *   /opensource/lynx       ->  OPEN SOURCE | LYNX          (page inside a section)
 *   /blackwall/server      ->  BLACK WALL | Server
 *
 * Longer prefixes are matched first, so `/nexora-ai` wins over `/nexora`.
 */
export type SeoSection = {
  /** URL prefix that identifies the section. */
  prefix: string;
  /** Human label used as the title prefix, without the `|` separator. */
  label: string;
  /** Alternate spellings stripped from page titles to avoid `OPEN SOURCE | Open Source`. */
  words: string[];
};

export const SEO_SECTIONS: SeoSection[] = [
  { prefix: "/nexora-ai", label: "Nexora AI", words: ["Nexora AI"] },
  { prefix: "/opensource", label: "Open Source", words: ["Open Source", "Opensource"] },
  { prefix: "/blackwall", label: "Black Wall", words: ["Black Wall", "Blackwall"] },
  { prefix: "/blacklink", label: "Black Link", words: ["Black Link", "Blacklink"] },
  { prefix: "/internships", label: "Internships", words: ["Internships"] },
  { prefix: "/university", label: "University", words: ["Anoneurx University", "University"] },
  { prefix: "/community", label: "Community", words: ["Anoneurx Community", "Community"] },
  { prefix: "/hackathon", label: "Hackathon", words: ["Anoneurx Hackathon", "Hackathon"] },
  { prefix: "/careers", label: "Careers", words: ["Careers"] },
  { prefix: "/research", label: "Research", words: ["Anoneurx Research", "Research"] },
  { prefix: "/cloud", label: "Anoneurx Cloud", words: ["Anoneurx Cloud", "Cloud"] },
  { prefix: "/astra", label: "ASTRA", words: ["ASTRA", "Astra"] },
  { prefix: "/nexora", label: "Nexora", words: ["Nexora"] },
  { prefix: "/courses", label: "Courses", words: ["Courses"] },
  { prefix: "/faculty", label: "Faculty", words: ["Faculty"] },
  { prefix: "/intern", label: "Interns", words: ["Anoneurx Interns", "Interns"] },
  { prefix: "/people", label: "People", words: ["Anoneurx Team", "People"] },
  { prefix: "/arcadeum", label: "Arcadeum", words: ["Anoneurx Arcadeum", "Arcadeum"] },
  { prefix: "/connect", label: "Connect", words: ["Anoneurx Connect", "Connect"] },
  { prefix: "/docs", label: "Documentation", words: ["Documentation", "Docs"] },
  { prefix: "/apps", label: "Apps", words: ["Anoneurx Apps", "Apps"] },
  { prefix: "/blogs", label: "Blog", words: ["Anoneurx Blog", "Blog"] },
  { prefix: "/pay", label: "Anoneurx Pay", words: ["Anoneurx Pay", "Pay"] },
  { prefix: "/lab", label: "Lab", words: ["Anoneurx Lab", "Lab"] },
  { prefix: "/notes", label: "Notes", words: ["Notes"] },
  { prefix: "/atlas", label: "ATLAS", words: ["ATLAS Language", "ATLAS"] },
];

/** Finds the section a pathname belongs to, or null for top-level pages. */
export function findSeoSection(pathname: string): SeoSection | null {
  if (!pathname || pathname === "/") return null;
  return (
    SEO_SECTIONS.find(
      (s) => pathname === s.prefix || pathname.startsWith(`${s.prefix}/`)
    ) ?? null
  );
}

/** True when the pathname is the section's own landing page. */
export function isSectionRoot(pathname: string, section: SeoSection): boolean {
  return pathname === section.prefix || pathname === `${section.prefix}/`;
}
