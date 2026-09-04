import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Github,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import ProjectShell from "@/components/project/ProjectShell";
import ProjectLogo from "@/components/project/ProjectLogo";
import ContentSidebar, { TocItem } from "@/components/project/ContentSidebar";
import PeopleGrid from "@/components/project/PeopleGrid";
import DesktopDemo from "@/components/project/DesktopDemo";
import StoreBadges from "@/components/project/StoreBadges";
import { resolveProject } from "./resolveProject";

const Section: React.FC<{
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
  lead?: string;
}> = ({ id, index, title, children, lead }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.5 }}
    className="scroll-mt-28 rounded-[5px] border border-white/10 bg-black/10 p-6 backdrop-blur-xl md:p-8"
  >
    <div className="mb-5 flex items-center gap-3">
      <span className="font-mono text-xs tracking-[0.2em] text-fuchsia-400">{index}</span>
      <h2 className="text-xl font-semibold text-white md:text-2xl">{title}</h2>
    </div>
    {lead && <p className="mb-6 max-w-3xl font-light leading-relaxed text-slate-300">{lead}</p>}
    {children}
  </motion.section>
);

export const OSProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const resolved = resolveProject(id);
  const [copied, setCopied] = useState<"link" | null>(null);

  if (!resolved) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-950 px-4 text-center text-white">
        <div className="rounded-[5px] border border-white/10 bg-black/10 p-10 backdrop-blur-xl">
          <h1 className="mb-3 text-3xl font-bold">Project not found</h1>
          <p className="mb-6 text-slate-400">We could not locate that project.</p>
          <Link to="/opensource/projects" className="inline-flex items-center gap-2 rounded-xl bg-fuchsia-600 px-5 py-2.5 text-sm font-semibold hover:bg-fuchsia-500">
            <ArrowLeft className="h-4 w-4" /> Back to projects
          </Link>
        </div>
      </div>
    );
  }

  const { project, extra } = resolved;

  const copy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied("link");
    setTimeout(() => setCopied(null), 2200);
  };

  const toc: TocItem[] = [
    { id: "overview", label: "Overview" },
    { id: "highlights", label: "Key metrics", level: 2 },
    { id: "get", label: extra.platform === "mobile" ? "Get the app" : "Get the build" },
    ...(extra.desktopDemo ? [{ id: "demo", label: "Desktop demo" } as TocItem] : []),
    { id: "features", label: "Capabilities" },
    { id: "people", label: "People" },
    { id: "pages", label: "More pages" },
  ];

  return (
    <ProjectShell
      projectId={project.id}
      name={project.name}
      platformLabel={extra.platformLabel}
      githubUrl={project.githubUrl}
      extra={extra}
    >
      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mb-12 overflow-hidden rounded-[5px] border border-white/10 bg-black/10 p-6 backdrop-blur-xl md:p-10"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-fuchsia-600/15 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-start">
          <ProjectLogo name={project.name} logo={extra.logo} accent={extra.accent} size="lg" className="shrink-0" />

          <div className="min-w-0 flex-1">
            <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-1 font-mono uppercase tracking-wider text-fuchsia-300">
                <Sparkles className="h-3.5 w-3.5" /> {extra.platformLabel}
              </span>
              <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 font-semibold text-cyan-300">{project.language}</span>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 font-semibold text-emerald-300">{project.version}</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 font-semibold text-amber-300">
                <Star className="h-3.5 w-3.5" /> {project.stars.toLocaleString()}
              </span>
            </div>

            <h1 className="mb-3 font-brand text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">{project.name}</h1>
            <p className="mb-4 max-w-3xl text-lg font-light text-slate-200">{project.subtitle}</p>
            <p className="mb-7 max-w-3xl font-light leading-relaxed text-slate-400">{project.description}</p>

            <StoreBadges extra={extra} className="mb-5" />

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 font-semibold text-white backdrop-blur-md hover:bg-white/10"
              >
                <Github className="h-4 w-4" /> Source
              </a>
              <Link
                to={`/opensource/${project.id}/features`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 font-semibold text-white backdrop-blur-md hover:bg-white/10"
              >
                Features <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to={`/opensource/${project.id}/privacy`}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-2.5 font-semibold text-emerald-300 hover:bg-emerald-500/20"
              >
                <ShieldCheck className="h-4 w-4" /> Privacy
              </Link>
              <button
                onClick={copy}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 font-medium text-slate-200 hover:bg-white/10"
              >
                {copied === "link" ? <Check className="h-4 w-4 text-emerald-400" /> : <Share2 className="h-4 w-4" />}
                {copied === "link" ? "Link copied" : "Share"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* BODY + RIGHT CONTENT RAIL */}
      <div className="grid gap-10 lg:grid-cols-[1fr_240px]">
        <div className="min-w-0 space-y-8">
          <Section id="overview" index="01" title="Overview" lead={project.abstract}>
            <div id="highlights" className="grid scroll-mt-28 grid-cols-2 gap-4 sm:grid-cols-4">
              {project.stats.map((st) => (
                <div key={st.label} className="rounded-[5px] border border-white/10 bg-black/10 p-4 backdrop-blur-xl">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-fuchsia-300">{st.label}</p>
                  <p className="mt-1 text-xl font-bold text-white">{st.value}</p>
                  <p className="mt-1 text-[11px] text-slate-400">{st.subtext}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-4 text-sm text-slate-400">
              <span><span className="font-semibold text-white">Maintainers:</span> {project.authors.join(", ")}</span>
              <span className="font-mono text-xs">{project.institution}</span>
              <span className="text-xs">License: <span className="text-slate-200">{project.license}</span></span>
            </div>
          </Section>

          <Section
            id="get"
            index="02"
            title={extra.platform === "mobile" ? "Get the app" : extra.platform === "os" ? "Install the OS" : "Get the build"}
            lead={
              extra.platform === "mobile"
                ? "Install from your preferred store, or verify and sideload the signed release artefact."
                : "Signed release artefacts, reproducibly built from the tagged source tree."
            }
          >
            <StoreBadges extra={extra} className="mb-6" />
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/[0.05] text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="px-4 py-2.5">Artefact</th>
                    <th className="px-4 py-2.5">Target</th>
                    <th className="px-4 py-2.5">Version</th>
                    <th className="px-4 py-2.5">Size</th>
                  </tr>
                </thead>
                <tbody>
                  {project.downloads.map((d) => (
                    <tr key={d.name} className="border-t border-white/8 text-slate-300 hover:bg-white/[0.03]">
                      <td className="px-4 py-3 font-mono text-xs text-white">
                        <a href={d.url} className="hover:text-fuchsia-300">{d.name}</a>
                      </td>
                      <td className="px-4 py-3">{d.target}</td>
                      <td className="px-4 py-3 font-mono text-xs">{d.version}</td>
                      <td className="px-4 py-3">{d.size}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {extra.desktopDemo && (
            <Section id="demo" index="03" title={extra.desktopDemo.title} lead={extra.desktopDemo.description}>
              <DesktopDemo demo={extra.desktopDemo} />
            </Section>
          )}

          <Section id="features" index={extra.desktopDemo ? "03" : "03"} title="Capabilities">
            <div className="grid gap-4 sm:grid-cols-2">
              {extra.features.map((f) => (
                <div key={f.title} className="rounded-[5px] border border-white/10 bg-black/10 p-5 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-fuchsia-400/30">
                  {f.tag && <span className="mb-2 inline-block rounded-md bg-fuchsia-500/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-fuchsia-300">{f.tag}</span>}
                  <h3 className="text-base font-semibold text-white">{f.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{f.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="people" index={extra.desktopDemo ? "04" : "04"} title="People behind the project">
            <div id="contributors" className="scroll-mt-28">
              <h3 className="mb-3 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-slate-400">
                <Users className="h-4 w-4" /> Contributors
              </h3>
              <PeopleGrid people={extra.contributors} />
            </div>
            <div id="testers" className="mt-8 scroll-mt-28">
              <h3 className="mb-3 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-slate-400">
                <ShieldCheck className="h-4 w-4" /> Testers &amp; QA
              </h3>
              <PeopleGrid people={extra.testers} compact />
            </div>
          </Section>

          <Section id="pages" index={extra.desktopDemo ? "05" : "05"} title="Explore the project">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { to: `/opensource/${project.id}/features`, label: "Features", desc: "Full capability breakdown" },
                { to: `/opensource/${project.id}/download`, label: "Download", desc: "Artefacts and checksums" },
                ...(extra.desktopDemo ? [{ to: `/opensource/${project.id}/demo`, label: "Demo", desc: "Interactive walkthrough" }] : []),
                { to: `/opensource/${project.id}/changelog`, label: "Changelog", desc: "Release history" },
                { to: `/opensource/${project.id}/roadmap`, label: "Roadmap", desc: "What ships next" },
                { to: `/opensource/${project.id}/contributors`, label: "People", desc: "Contributors & testers" },
                { to: `/opensource/${project.id}/faq`, label: "FAQ", desc: "Common questions" },
                { to: `/opensource/${project.id}/security`, label: "Security", desc: "Disclosure policy" },
                { to: `/opensource/${project.id}/privacy`, label: "Privacy", desc: "Data practices" },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="group rounded-[5px] border border-white/10 bg-black/10 p-4 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-fuchsia-400/40"
                >
                  <span className="flex items-center justify-between text-sm font-semibold text-white">
                    {l.label} <ArrowRight className="h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-fuchsia-300" />
                  </span>
                  <span className="mt-1 block text-xs text-slate-400">{l.desc}</span>
                </Link>
              ))}
            </div>
          </Section>

        </div>

        <aside className="hidden lg:block">
          <ContentSidebar items={toc} title="Contents" />
        </aside>
      </div>
    </ProjectShell>
  );
};

export default OSProjectDetail;
