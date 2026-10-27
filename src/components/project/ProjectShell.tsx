import React, { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Github } from "lucide-react";
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

/** Project page chrome matching the Open Source home page nav bar style:
   sticky header, bg-black/20 backdrop blur, nav links with active underline,
   actions on the right. Navigation items wrap on mobile instead of scrolling. */
const ProjectShell: React.FC<Props> = ({ projectId, name, platformLabel, githubUrl, extra, children }) => {
  const { pathname } = useLocation();
  const root = `/opensource/${projectId}`;

  const isActive = (path: string) => pathname === path;

  const navLinkClasses = (active: boolean) =>
    `relative px-6 py-3 text-sm font-semibold transition-all duration-300 rounded-xl ${
      active ? "text-white shadow-lg" : "text-white/90 hover:text-white hover:shadow-lg"
    }`;

  return (
    <div className="relative min-h-screen text-white">
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      <header className="sticky top-0 z-40 bg-black/20 backdrop-blur-xl">
        <div className="container-custom py-4 flex justify-between items-center px-4 lg:px-0">
          {/* Logo */}
          <Link to={root} className="flex items-center space-x-3 group" onClick={() => {}}>
            <ProjectLogo name={name} logo={extra.logo} accent={extra.accent} size="sm" />
            <span className="leading-tight">
              <span className="block font-brand text-sm tracking-[0.18em] text-white">{name}</span>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">{platformLabel}</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-2">
            {PROJECT_PAGES.filter((p) => !(p.key === "demo" && !extra.desktopDemo)).map((p) => {
              const to = p.path ? `${root}/${p.path}` : root;
              const active = isActive(to) || (p.path === "" && pathname === `${root}/`);
              return (
                <Link
                  key={p.key}
                  to={to}
                  className={navLinkClasses(active) + " group"}
                  onClick={() => {}}
                >
                  {p.label}
                  {!active && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-fuchsia-600 to-blue-700 transition-all duration-300 group-hover:w-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Auth / actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="relative group text-white p-2 rounded-lg transition-all duration-300 hover:bg-white/10"
            >
              <Github className="w-6 h-6" />
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-fuchsia-600 to-blue-700 transition-all duration-300 group-hover:w-full" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 rounded-lg text-gray-300 hover:bg-white/20" aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">{children}</main>
    </div>
  );
};

export default ProjectShell;
