import { Check } from "lucide-react";
import type { Problem } from "@/pages/lab/data";
import { statusLabel } from "@/pages/lab/homeData";

const variant = (status: Problem["status"]): "open" | "progress" | "solved" =>
  status === "Open" ? "open" : status === "In Progress" ? "progress" : "solved";

const LabStatus = ({ status }: { status: Problem["status"] }) => (
  <span className={`lab-badge lab-badge--${variant(status)}`}>
    {status === "Solved" ? (
      <Check className="lab-badge__check" aria-hidden="true" />
    ) : (
      <span className="lab-badge__dot" aria-hidden="true" />
    )}
    {statusLabel(status)}
  </span>
);

export default LabStatus;
