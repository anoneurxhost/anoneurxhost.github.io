import { motion } from "framer-motion";
import { Tag, Calendar, Sparkles, Bug, Zap, Plus } from "lucide-react";
import NexoraLayout from "./NexoraLayout";

const releases = [
  {
    version: "v2.8.4",
    date: "April 22, 2026",
    tag: "Stable",
    items: [
      { icon: Plus, text: "AI sidebar with translation & summarization" },
      { icon: Plus, text: "Encrypted sync v2 — 3x faster than before" },
      { icon: Zap, text: "Tab suspension now saves up to 80% RAM" },
      { icon: Bug, text: "Fixed PDF reader memory leak" },
      { icon: Bug, text: "Fixed crash on dragging tabs to second monitor" },
    ],
  },
  {
    version: "v2.8.0",
    date: "March 5, 2026",
    tag: "Stable",
    items: [
      { icon: Plus, text: "New Smart Workspaces feature" },
      { icon: Plus, text: "Built-in encrypted DNS resolver" },
      { icon: Zap, text: "30% faster startup time" },
    ],
  },
  {
    version: "v2.7.2",
    date: "February 1, 2026",
    tag: "Patch",
    items: [
      { icon: Bug, text: "Security patch CVE-2026-1042" },
      { icon: Bug, text: "Improved cookie isolation" },
    ],
  },
];

const NexoraChangelog = () => (
  <NexoraLayout>
    <section className="px-4 py-20">
      <div className="container-responsive max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-4">
            <Tag className="h-5 w-5 text-blue-300" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-blue-400">Changelog</span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold">
            Release <span className="italic text-blue-300">notes</span>
          </h1>
          <p className="mt-4 text-sm text-slate-500">Every change, every fix, every release.</p>
        </motion.div>

        <div className="space-y-6">
          {releases.map((r, i) => (
            <motion.div
              key={r.version}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl p-6"
            >
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <h2 className="text-2xl font-bold">{r.version}</h2>
                <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase tracking-widest border ${r.tag === "Stable" ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/25" : "bg-amber-500/15 text-amber-300 border-amber-500/25"}`}>
                  {r.tag}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 ml-auto">
                  <Calendar className="h-3 w-3" /> {r.date}
                </div>
              </div>
              <ul className="space-y-2.5">
                {r.items.map((it, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-400">
                    <it.icon className={`h-3.5 w-3.5 mt-0.5 flex-shrink-0 ${it.icon === Bug ? "text-amber-400" : it.icon === Zap ? "text-emerald-400" : "text-blue-400"}`} />
                    {it.text}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </NexoraLayout>
);

export default NexoraChangelog;
