import React, { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Github } from "lucide-react";
import ProjectLogo from "./ProjectLogo";
import { PROJECT_PAGES, ProjectExtra } from "@/data/types";
import heroBg from "@/assets/opensource/bg.png";

type Props = {
  projectId: string;
  name: string;
  platformLabel: string;
  githubUrl: string;
  extra: ProjectExtra;
  children: ReactNode;
};

/** Standalone chrome shared by every project page: background, brand bar, page nav. */
const ProjectShell: React.FC<Props> = ({ projectId, name, platformLabel, githubUrl, extra, children }) => {
  const { pathname } = useLocation();
  const root = `/opensource/${projectId}`;

  return (
    <div className="relative min-h-screen text-white">
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/10 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link to={root} className="flex items-center gap-3 group">
            <ProjectLogo name={name} logo={extra.logo} accent={extra.accent} size="sm" />
            <span className="leading-tight">
              <span className="block font-brand text-sm tracking-[0.18em] text-white">{name}</span>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">{platformLabel}</span>
            </span>
          </Link>
           <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 pb-2 sm:px-6 lg:px-8">
          {PROJECT_PAGES.filter((p) => !(p.key === "demo" && !extra.desktopDemo)).map((p) => {
            const to = p.path ? `${root}/${p.path}` : root;
            const active = pathname === to || (p.path === "" && pathname === `${root}/`);
            return (
              <Link
                key={p.key}
                to={to}
                className={`relative whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  active ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                }`}
              >
                {p.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-[9px] h-[2px] rounded-full bg-fuchsia-500 shadow-[0_0_10px_2px] shadow-fuchsia-500/40" />
                )}
              </Link>
            );
          })}
        </nav>
          <div className="ml-auto flex items-center gap-2">
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10"
            >
              <Github className="h-4 w-4" /> <span className="hidden sm:inline">GitHub</span>
            </a>
            <Link
              to="/opensource/projects"
              className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">All projects</span>
            </Link>
          </div>
        </div>

       
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">{children}</main>

      <footer className="border-t border-white/10 bg-slate-950/70 py-8 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <span className="font-brand tracking-[0.18em] text-slate-300">ANONEURX</span>
          <span>© {new Date().getFullYear()} Anoneurx Labs · {name}</span>
          <span className="sm:ml-auto flex gap-4">
            <Link to={`${root}/privacy`} className="hover:text-slate-300">Privacy</Link>
            <Link to={`${root}/security`} className="hover:text-slate-300">Security</Link>
            <a href="mailto:opensource@anoneurx.com" className="hover:text-slate-300">Contact</a>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default ProjectShell;
