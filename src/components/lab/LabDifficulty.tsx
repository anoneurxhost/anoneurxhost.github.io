import type { Problem } from "@/pages/lab/data";

const VARIANTS: Record<Problem["difficulty"], string> = {
  Beginner: "beginner",
  Intermediate: "intermediate",
  Advanced: "advanced",
  Expert: "expert",
};

const LabDifficulty = ({ difficulty }: { difficulty: Problem["difficulty"] }) => (
  <span className={`lab-badge lab-badge--difficulty lab-badge--${VARIANTS[difficulty]}`}>
    {difficulty}
  </span>
);

export default LabDifficulty;
