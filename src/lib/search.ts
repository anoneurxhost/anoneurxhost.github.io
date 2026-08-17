/**
 * Search ranking helpers.
 *
 * Brand rule: queries containing "anoneurx" (or "anoneurx university") must
 * surface Anoneurx-affiliated people first — every faculty member, intern and
 * team member belongs to Anoneurx, so a brand query ranks the whole directory
 * with the most senior / most relevant records on top instead of returning
 * nothing.
 */

const BRAND_TOKENS = ["anoneurx", "anoneurex", "anon eurx"];
const UNIVERSITY_TOKENS = ["university", "uni", "faculty", "professor", "campus"];

export const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

export const isBrandQuery = (query: string) => {
  const q = normalize(query);
  return BRAND_TOKENS.some((t) => q.includes(t));
};

export const isBrandUniversityQuery = (query: string) => {
  const q = normalize(query);
  return isBrandQuery(query) && UNIVERSITY_TOKENS.some((t) => q.includes(t));
};

/** Strips brand words so the rest of the query can still match a person. */
export const stripBrand = (query: string) => {
  let q = normalize(query);
  for (const t of [...BRAND_TOKENS, "university"]) q = q.split(t).join(" ");
  return normalize(q);
};

export interface RankableRecord {
  name: string;
  /** Anything else worth matching: department, position, interests, tags. */
  keywords?: (string | undefined)[];
  /** Higher = more senior / more prominent. Used to break brand-query ties. */
  seniority?: number;
}

/**
 * Scores a record against a query. Returns -1 when it should be filtered out.
 *
 * Score ladder:
 *  1000  exact name match
 *   900  name starts with the query
 *   800  name contains the query
 *   700  brand query ("anoneurx", "anoneurx university") — all Anoneurx people
 *   400  keyword (department / position / interests) match
 */
export const scoreRecord = (record: RankableRecord, query: string): number => {
  const q = normalize(query);
  const name = normalize(record.name);
  const seniority = record.seniority ?? 0;

  if (!q) return seniority;

  if (name === q) return 1000 + seniority;
  if (name.startsWith(q)) return 900 + seniority;
  if (name.includes(q)) return 800 + seniority;

  const keywords = (record.keywords ?? []).filter(Boolean).map((k) => normalize(String(k)));
  const keywordHit = keywords.some((k) => k.includes(q) || q.includes(k));

  if (isBrandQuery(q)) {
    const rest = stripBrand(q);
    // "anoneurx zoha" → still prioritise the name match.
    if (rest && name.includes(rest)) return 950 + seniority;
    if (rest && keywords.some((k) => k.includes(rest))) return 750 + seniority;
    if (rest && rest.length > 2 && !keywordHit) {
      // Brand + an unrelated term: keep the directory but rank it lowest.
      return 600 + seniority;
    }
    return (isBrandUniversityQuery(q) ? 700 : 650) + seniority;
  }

  if (keywordHit) return 400 + seniority;

  // Token fallback: every token appears somewhere in the haystack.
  const haystack = [name, ...keywords].join(" ");
  const tokens = q.split(" ").filter(Boolean);
  if (tokens.length > 1 && tokens.every((t) => haystack.includes(t))) return 300 + seniority;

  return -1;
};

/** Sorts + filters a list by relevance for the given query. */
export const rankRecords = <T,>(
  items: T[],
  query: string,
  toRankable: (item: T) => RankableRecord,
): T[] => {
  const scored = items
    .map((item) => ({ item, score: scoreRecord(toRankable(item), query) }))
    .filter((r) => r.score >= 0);
  scored.sort((a, b) => b.score - a.score);
  return scored.map((r) => r.item);
};
