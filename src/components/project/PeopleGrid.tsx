import React from "react";
import { Github, User } from "lucide-react";
import { Person, githubAvatar, githubProfile } from "@/data/types";

type Props = {
  people: Person[];
  compact?: boolean;
};

/** Generate initials from a name */
const getInitials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/** Contributor / tester grid — avatars link to GitHub when available, otherwise show local profile. */
const PeopleGrid: React.FC<Props> = ({ people, compact = false }) => (
  <div className={`grid gap-3 ${compact ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
    {people.map((p) => {
      const hasGithub = !!p.github;
      const initials = getInitials(p.name);

      const content = (
        <>
          {p.avatar ? (
            <img
              src={p.avatar}
              alt={`${p.name} avatar`}
              loading="lazy"
              className="h-11 w-11 shrink-0 rounded-full border border-white/15 object-cover grayscale transition-all group-hover:grayscale-0"
            />
          ) : hasGithub ? (
            <img
              src={githubAvatar(p.github!)}
              alt={`${p.name} GitHub avatar`}
              loading="lazy"
              className="h-11 w-11 shrink-0 rounded-full border border-white/15 object-cover grayscale transition-all group-hover:grayscale-0"
            />
          ) : (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 text-sm font-bold text-white/80">
              {initials}
            </div>
          )}
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-white">{p.name}</span>
            <span className="block truncate text-xs text-slate-400">{p.role}</span>
            {p.focus && !compact && (
              <span className="mt-0.5 block truncate text-[11px] font-mono text-slate-500">{p.focus}</span>
            )}
          </span>
          {hasGithub && <Github className="ml-auto h-4 w-4 shrink-0 text-slate-500 transition-colors group-hover:text-fuchsia-300" />}
          {!hasGithub && <User className="ml-auto h-4 w-4 shrink-0 text-slate-500 transition-colors group-hover:text-fuchsia-300" />}
        </>
      );

      const baseClass = "group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-fuchsia-400/40 hover:bg-white/[0.06]";

      if (hasGithub) {
        return (
          <a
            key={p.github}
            href={githubProfile(p.github!)}
            target="_blank"
            rel="noreferrer noopener"
            title={`Open ${p.name} on GitHub`}
            className={baseClass}
          >
            {content}
          </a>
        );
      }

      return (
        <div key={p.name} title={p.name} className={baseClass}>
          {content}
        </div>
      );
    })}
  </div>
);

export default PeopleGrid;
