import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface LabPageHeadProps {
  eyebrow: string;
  title: string;
  lead?: string;
  back?: { to: string; label: string };
  actions?: ReactNode;
}

const LabPageHead = ({ eyebrow, title, lead, back, actions }: LabPageHeadProps) => (
  <header className="lab-page-head">
    {back && (
      <Link className="lab-back" to={back.to}>
        <ArrowLeft className="lab-btn__icon" aria-hidden="true" />
        {back.label}
      </Link>
    )}
    <p className="lab-eyebrow">{eyebrow}</p>
    <h1>{title}</h1>
    {lead && <p className="lab-lead">{lead}</p>}
    {actions && <div className="lab-hero__actions">{actions}</div>}
  </header>
);

export default LabPageHead;
