import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, CircleDashed, Clock, Download, HelpCircle, Lock, ShieldCheck } from "lucide-react";
import ProjectShell from "@/components/project/ProjectShell";
import ContentSidebar, { TocItem } from "@/components/project/ContentSidebar";
import PeopleGrid from "@/components/project/PeopleGrid";
import DesktopDemo from "@/components/project/DesktopDemo";
import StoreBadges from "@/components/project/StoreBadges";
import { resolveProject } from "./resolveProject";
import { ProjectExtra, PolicySection } from "@/data/types";

export type SubPageKind =
  | "features"
  | "download"
  | "demo"
  | "changelog"
  | "roadmap"
  | "faq"
  | "security"
  | "privacy"
  | "contributors";

const TITLES: Record<SubPageKind, { title: string; kicker: string }> = {
  features: { title: "Features", kicker: "Capability breakdown" },
  download: { title: "Download", kicker: "Releases & artefacts" },
  demo: { title: "Demo", kicker: "Interactive walkthrough" },
  changelog: { title: "Changelog", kicker: "Release history" },
  roadmap: { title: "Roadmap", kicker: "What ships next" },
  faq: { title: "FAQ", kicker: "Frequently asked" },
  security: { title: "Security", kicker: "Disclosure policy" },
  privacy: { title: "Privacy Policy", kicker: "Data practices" },
  contributors: { title: "People", kicker: "Contributors & testers" },
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const Card: React.FC<{ children: React.ReactNode; id?: string; className?: string }> = ({ children, id, className = "" }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.45 }}
    className={`scroll-mt-28 rounded-[5px] border border-white/10 bg-black/10 p-6 backdrop-blur-xl md:p-8 ${className}`}
  >
    {children}
  </motion.section>
);

const PolicyBlocks: React.FC<{ sections: PolicySection[] }> = ({ sections }) => (
  <div className="rounded-[5px] bg-black/10 p-6 backdrop-blur-xl md:p-8">
    <div className="space-y-6">
      {sections.map((s, i) => (
        <div key={s.title} id={slug(s.title)} className="scroll-mt-28 border-b border-white/10 pb-6 last:border-b-0 last:pb-0">
          <div className="mb-3 flex items-center gap-3">
            <span className="font-mono text-xs tracking-[0.2em] text-fuchsia-400">{String(i + 1).padStart(2, "0")}</span>
            <h2 className="text-lg font-semibold text-white md:text-xl">{s.title}</h2>
          </div>
          {s.body.map((p) => (
            <p key={p} className="mb-3 font-light leading-relaxed text-slate-300">{p}</p>
          ))}
          {s.bullets && (
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {s.bullets.map((b) => (
                <li key={b} className="flex gap-2 text-sm text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> {b}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  </div>
);

const VALID_KINDS: SubPageKind[] = ["features", "download", "demo", "changelog", "roadmap", "faq", "security", "privacy", "contributors"];

const ProjectSubPage: React.FC = () => {
  const { id, subPage } = useParams<{ id: string; subPage: string }>();
  const kind: SubPageKind = (VALID_KINDS.includes(subPage as SubPageKind) ? subPage : "features") as SubPageKind;
  const resolved = resolveProject(id);

  if (!resolved) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-950 px-4 text-center text-white">
        <div className="rounded-[5px] border border-white/10 bg-black/10 p-10 backdrop-blur-xl">
          <h1 className="mb-3 text-3xl font-bold">Project not found</h1>
          <Link to="/opensource/projects" className="inline-flex items-center gap-2 rounded-xl bg-fuchsia-600 px-5 py-2.5 text-sm font-semibold hover:bg-fuchsia-500">
            <ArrowLeft className="h-4 w-4" /> Back to projects
          </Link>
        </div>
      </div>
    );
  }

  const { project, extra } = resolved;
  const meta = TITLES[kind];

  let toc: TocItem[] = [];
  if (kind === "privacy") toc = extra.privacy.sections.map((s) => ({ id: slug(s.title), label: s.title }));
  if (kind === "security") toc = extra.security.map((s) => ({ id: slug(s.title), label: s.title }));
  if (kind === "features") toc = extra.features.map((f) => ({ id: slug(f.title), label: f.title }));
  if (kind === "changelog") toc = extra.changelog.map((c) => ({ id: slug(c.version), label: `${c.version} · ${c.date}` }));
  if (kind === "roadmap") toc = extra.roadmap.map((r) => ({ id: slug(r.quarter), label: r.quarter }));
  if (kind === "faq") toc = extra.faq.map((f) => ({ id: slug(f.q), label: f.q }));
  if (kind === "contributors")
    toc = [
      { id: "contributors", label: "Contributors" },
      { id: "testers", label: "Testers & QA" },
    ];
  if (kind === "download")
    toc = [
      { id: "channels", label: "Channels" },
      { id: "artefacts", label: "Artefacts" },
      { id: "verify", label: "Verify your download" },
    ];
  if (kind === "demo") toc = [{ id: "demo", label: "Live window" }, { id: "requirements", label: "Requirements" }];

  return (
    <ProjectShell
      projectId={project.id}
      name={project.name}
      platformLabel={extra.platformLabel}
      githubUrl={project.githubUrl}
      extra={extra}
    >
      <motion.header
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 border-b border-white/10 pb-8"
      >
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-fuchsia-400">{meta.kicker}</p>
        <h1 className="font-brand text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">{meta.title}</h1>
        <p className="mt-3 max-w-3xl font-light text-slate-400">
          {kind === "privacy"
            ? extra.privacy.summary
            : kind === "security"
            ? `How we handle vulnerability reports and hardening for ${project.name}.`
            : `${project.name} — ${project.subtitle}`}
        </p>
        {kind === "privacy" && (
          <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
            <Lock className="h-3.5 w-3.5 text-emerald-400" /> Last updated {extra.privacy.updated}
          </p>
        )}
      </motion.header>

      <div className="grid gap-10 lg:grid-cols-[1fr_240px]">
        <div className="min-w-0 space-y-6">
          {kind === "privacy" && <PolicyBlocks sections={extra.privacy.sections} />}
          {kind === "security" && <PolicyBlocks sections={extra.security} />}

          {kind === "features" && (
            <div className="grid gap-5 sm:grid-cols-2">
              {extra.features.map((f) => (
                <Card key={f.title} id={slug(f.title)}>
                  {f.tag && <span className="mb-2 inline-block rounded-md bg-fuchsia-500/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-fuchsia-300">{f.tag}</span>}
                  <h2 className="text-lg font-semibold text-white">{f.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.desc}</p>
                </Card>
              ))}
            </div>
          )}

          {kind === "download" && (
            <>
              <Card id="channels">
                <h2 className="mb-4 text-lg font-semibold text-white">Distribution channels</h2>
                <StoreBadges extra={extra} />
                {!extra.storeLinks && <p className="text-sm text-slate-400">Install via the package registry listed in the repository README.</p>}
              </Card>
              <Card id="artefacts">
                <h2 className="mb-4 text-lg font-semibold text-white">Release artefacts</h2>
                <div className="overflow-hidden rounded-2xl border border-white/10">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-white/[0.05] text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      <tr>
                        <th className="px-4 py-2.5">File</th>
                        <th className="px-4 py-2.5">Target</th>
                        <th className="px-4 py-2.5">Version</th>
                        <th className="px-4 py-2.5">Size</th>
                        <th className="px-4 py-2.5" />
                      </tr>
                    </thead>
                    <tbody>
                      {project.downloads.map((d) => (
                        <tr key={d.name} className="border-t border-white/8 text-slate-300 hover:bg-white/[0.03]">
                          <td className="px-4 py-3 font-mono text-xs text-white">{d.name}</td>
                          <td className="px-4 py-3">{d.target}</td>
                          <td className="px-4 py-3 font-mono text-xs">{d.version}</td>
                          <td className="px-4 py-3">{d.size}</td>
                          <td className="px-4 py-3 text-right">
                            <a href={d.url} className="inline-flex items-center gap-1.5 rounded-lg border border-white/12 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10">
                              <Download className="h-3.5 w-3.5" /> Get
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
              <Card id="verify">
                <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
                  <ShieldCheck className="h-5 w-5 text-emerald-400" /> Verify your download
                </h2>
                <p className="mb-4 text-sm text-slate-400">Every artefact is signed. Confirm the signature before installing.</p>
                <pre className="overflow-x-auto rounded-xl border border-white/10 bg-slate-950 p-4 font-mono text-xs text-slate-300">{`# verify the detached signature
gpg --verify ${project.id}-release.sig ${project.id}-release

# compare the checksum
sha256sum -c ${project.id}-release.sha256`}</pre>
              </Card>
            </>
          )}

          {kind === "demo" &&
            (extra.desktopDemo ? (
              <>
                <Card id="demo">
                  <h2 className="mb-2 text-lg font-semibold text-white">{extra.desktopDemo.title}</h2>
                  <p className="mb-6 text-sm text-slate-400">{extra.desktopDemo.description}</p>
                  <DesktopDemo demo={extra.desktopDemo} />
                </Card>
                <Card id="requirements">
                  <h2 className="mb-3 text-lg font-semibold text-white">Requirements</h2>
                  <ul className="grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
                    {extra.desktopDemo.requirements.map((r) => (
                      <li key={r} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fuchsia-400" /> {r}</li>
                    ))}
                  </ul>
                </Card>
              </>
            ) : (
              <Card>
                <p className="text-slate-300">A hosted demo is not available for this project yet — the repository ships runnable examples instead.</p>
              </Card>
            ))}

          {kind === "changelog" && (
            <div className="space-y-5">
              {extra.changelog.map((c) => (
                <Card key={c.version} id={slug(c.version)}>
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span className="rounded-lg bg-fuchsia-500/15 px-2.5 py-1 font-mono text-xs text-fuchsia-300">{c.version}</span>
                    <span className="text-xs text-slate-400">{c.date}</span>
                    <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-slate-400">{c.kind}</span>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {c.notes.map((n) => (
                      <li key={n} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> {n}</li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          )}

          {kind === "roadmap" && (
            <div className="space-y-5">
              {extra.roadmap.map((r) => (
                <Card key={r.quarter} id={slug(r.quarter)}>
                  <div className="mb-3 flex items-center gap-3">
                    {r.status === "shipped" ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    ) : r.status === "active" ? (
                      <Clock className="h-5 w-5 text-fuchsia-400" />
                    ) : (
                      <CircleDashed className="h-5 w-5 text-slate-500" />
                    )}
                    <h2 className="text-lg font-semibold text-white">{r.quarter}</h2>
                    <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-slate-400">{r.status}</span>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {r.items.map((i) => (
                      <li key={i} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fuchsia-400" /> {i}</li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          )}

          {kind === "faq" && (
            <div className="space-y-4">
              {extra.faq.map((f) => (
                <Card key={f.q} id={slug(f.q)}>
                  <h2 className="mb-2 flex items-start gap-2 text-base font-semibold text-white">
                    <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-fuchsia-400" /> {f.q}
                  </h2>
                  <p className="pl-6 text-sm leading-relaxed text-slate-400">{f.a}</p>
                </Card>
              ))}
            </div>
          )}

          {kind === "contributors" && (
            <>
              <Card id="contributors">
                <h2 className="mb-4 text-lg font-semibold text-white">Contributors</h2>
                <PeopleGrid people={extra.contributors} />
              </Card>
              <Card id="testers">
                <h2 className="mb-4 text-lg font-semibold text-white">Testers &amp; QA</h2>
                <PeopleGrid people={extra.testers} compact />
              </Card>
            </>
          )}
        </div>

        <aside className="hidden lg:block">
          <ContentSidebar items={toc} title="Contents" />
        </aside>
      </div>
    </ProjectShell>
  );
};

export default ProjectSubPage;
