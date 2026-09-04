import React from "react";
import { Github } from "lucide-react";
import { Person, githubAvatar, githubProfile } from "@/data/types";

type Props = {
  people: Person[];
  compact?: boolean;
};

/** Contributor / tester grid — avatars link straight to the GitHub profile. */
const PeopleGrid: React.FC<Props> = ({ people, compact = false }) => (
  <div className={`grid gap-3 ${compact ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
    {people.map((p) => (
      <a
        key={p.github}
        href={githubProfile(p.github)}
        target="_blank"
        rel="noreferrer noopener"
        title={`Open ${p.name} on GitHub`}
        className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-fuchsia-400/40 hover:bg-white/[0.06]"
      >
        <img
          src={githubAvatar(p.github)}
          alt={`${p.name} GitHub avatar`}
          loading="lazy"
          className="h-11 w-11 shrink-0 rounded-full border border-white/15 object-cover grayscale transition-all group-hover:grayscale-0"
        />
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-white">{p.name}</span>
          <span className="block truncate text-xs text-slate-400">{p.role}</span>
          {p.focus && !compact && (
            <span className="mt-0.5 block truncate text-[11px] font-mono text-slate-500">{p.focus}</span>
          )}
        </span>
        <Github className="ml-auto h-4 w-4 shrink-0 text-slate-500 transition-colors group-hover:text-fuchsia-300" />
      </a>
    ))}
  </div>
);

export default PeopleGrid;
