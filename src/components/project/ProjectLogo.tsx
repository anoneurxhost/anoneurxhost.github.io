import React from "react";

type Props = {
  name: string;
  logo?: string;
  accent?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZES = {
  sm: "h-10 w-10 text-sm rounded-xl",
  md: "h-14 w-14 text-lg rounded-2xl",
  lg: "h-20 w-20 text-2xl rounded-[1.4rem]",
};

/** Project / app logo. Falls back to a gradient monogram tile. */
const ProjectLogo: React.FC<Props> = ({ name, logo, accent = "from-purple-500 to-cyan-500", size = "md", className = "" }) => {
  const initials = name
    .replace(/[^A-Za-z ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  if (logo) {
    return (
      <img
        src={logo}
        alt={`${name} logo`}
        loading="lazy"
        className={`${SIZES[size]} object-contain border border-white/10 bg-white/5 p-1.5 backdrop-blur-md ${className}`}
      />
    );
  }

  return (
    <div
      aria-hidden
      className={`${SIZES[size]} relative grid place-items-center overflow-hidden border border-white/15 bg-gradient-to-br ${accent} font-brand tracking-[0.15em] text-white shadow-lg shadow-black/40 ${className}`}
    >
      <span className="absolute inset-0 bg-black/25" />
      <span className="relative z-10">{initials || "AX"}</span>
    </div>
  );
};

export default ProjectLogo;
