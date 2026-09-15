import { ReactNode } from "react";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}: Props) => (
  <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}>
    {eyebrow && (
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400/90">
        {eyebrow}
      </p>
    )}
    <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{title}</h2>
    {description && (
      <p className="mt-4 text-base leading-relaxed text-slate-500 dark:text-slate-400 sm:text-lg">{description}</p>
    )}
  </div>
);

export default SectionHeading;