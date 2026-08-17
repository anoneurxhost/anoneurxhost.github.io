import detailed from "./detailedResearchData.json";
import { shortIdSlug } from "@/lib/utils";

/**
 * Stable 5-letter slug for every research paper, used for both:
 *   /research/read/:id   (public reader)
 *   /share/:paperId      (public share URL with OG/Twitter metadata)
 */
export interface PaperSlugRecord {
  id: number;
  slug: string;
  title: string;
}

const papers = (detailed as any).papers as Array<{ id: number; title: string }>;

export const paperSlugs: PaperSlugRecord[] = papers.map((p) => ({
  id: p.id,
  slug: shortIdSlug(p.id),
  title: p.title,
}));

export const slugForPaperId = (id: number | string): string => {
  const rec = paperSlugs.find((r) => String(r.id) === String(id));
  return rec ? rec.slug : shortIdSlug(id);
};

export const paperForSlug = (slug: string) =>
  paperSlugs.find((r) => r.slug === slug);
