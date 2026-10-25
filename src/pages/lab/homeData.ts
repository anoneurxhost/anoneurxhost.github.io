import type { Problem } from "./data";

/**
 * Curated content for the /lab landing page.
 *
 * Everything here is either derived from ./data (problems, areas, projects,
 * papers) or authored copy for sections that have no dataset yet. Unknown
 * values stay in square brackets so they are obviously placeholders.
 */

/**
 * The four research areas highlighted on the landing page. Ids refer to
 * `researchAreas` in ./data.
 */
export const featuredAreaIds = ["ai-ml", "cybersecurity", "robotics", "systems-os"] as const;

/**
 * Problem areas map onto the filter chips. A chip can cover more than one
 * stored area, e.g. the AI chip also matches "AI Safety".
 */
export const areaFilterGroups: Record<string, string[]> = {
  AI: ["AI", "AI Safety"],
  Cybersecurity: ["Cybersecurity"],
  Robotics: ["Robotics"],
  Systems: ["Systems"],
};

export const areaFilters = ["All", "AI", "Cybersecurity", "Robotics", "Systems"] as const;

/**
 * Maps a research area id from ./data onto the problem areas it covers, so
 * the counts on the landing page are counted from the problems themselves
 * instead of the hand-maintained `problemCount` field.
 */
export const areaProblemAreas: Record<string, string[]> = {
  "ai-ml": ["AI", "AI Safety"],
  cybersecurity: ["Cybersecurity"],
  robotics: ["Robotics"],
  "systems-os": ["Systems"],
};

export type AreaFilter = (typeof areaFilters)[number];

export type StatusFilter =
  | "All"
  | "Open"
  | "In progress"
  | "Open Research Problem"
  | "Under Investigation"
  | "Solved";

export const statusFilters: StatusFilter[] = [
  "All",
  "Open",
  "In progress",
  "Open Research Problem",
  "Under Investigation",
  "Solved",
];

/** Maps a stored problem status onto the label used across the landing page. */
export const statusLabel = (status: Problem["status"]): string =>
  status === "In Progress" ? "In progress" : status;

/** True when a problem belongs to the selected area chip. */
export const matchesArea = (problem: Problem, filter: AreaFilter): boolean => {
  if (filter === "All") return true;
  const group = areaFilterGroups[filter] ?? [filter];
  return problem.areas.some((area) => group.includes(area));
};

/** True when a problem matches the selected status filter. */
export const matchesStatus = (problem: Problem, filter: StatusFilter): boolean => {
  if (filter === "All") return true;
  return statusLabel(problem.status) === filter;
};

export type Opportunity = {
  id: string;
  title: string;
  meta: string;
  description: string;
  href: string;
  cta: string;
};

export const labOpportunities: Opportunity[] = [
  {
    id: "student-researcher",
    title: "Student researcher placements",
    meta: "[Placeholder: next intake window]",
    description:
      "Join a supervised team on one of the open problems above. A placement is scoped to a single research question, a named supervisor and a deliverable you can put your name on.",
    href: "/lab/apply",
    cta: "Apply to the lab",
  },
  {
    id: "fellowships",
    title: "Research fellowships",
    meta: "[Placeholder: fellowship intake]",
    description:
      "Fellowships fund a longer, self-directed piece of work on a problem from the board, with a research mentor and a publication plan agreed at the start.",
    href: "/opportunities/fellowships",
    cta: "See fellowships",
  },
  {
    id: "research-grants",
    title: "Research grants and co-supervision",
    meta: "[Placeholder: grant cycle]",
    description:
      "Fund a shared problem with us through a research grant, or co-supervise a student project with a university group. Existing lab infrastructure is reused rather than rebuilt.",
    href: "/opportunities/research-grants",
    cta: "See research grants",
  },
];

export type Principle = {
  id: string;
  title: string;
  description: string;
};

export const labPrinciples: Principle[] = [
  {
    id: "reproducible",
    title: "Reproducible by default",
    description:
      "Every result ships with the code, data description and evaluation harness that produced it, so a result can be re-run instead of trusted.",
  },
  {
    id: "open",
    title: "Open problems, open review",
    description:
      "Problem statements are published with the research gap, the known limitations and the questions that are still unanswered.",
  },
  {
    id: "mentored",
    title: "Mentored, not abandoned",
    description:
      "Each team has a named supervisor, a scoped first milestone and a review cadence, so progress is visible and nobody waits in silence.",
  },
];
