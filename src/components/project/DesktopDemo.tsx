import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Play } from "lucide-react";
import { ProjectExtra } from "@/data/types";

type Props = { demo: NonNullable<ProjectExtra["desktopDemo"]> };

/** Simulated desktop window running the project — clickable shot switcher. */
const DesktopDemo: React.FC<Props> = ({ demo }) => {
  const [idx, setIdx] = useState(0);
  const shot = demo.shots[idx];

  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-2xl border border-white/12 bg-slate-950/80 shadow-2xl shadow-black/60 backdrop-blur-xl">
        {/* window chrome */}
        <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-2.5">
          <span className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-500/80" />
            <span className="h-3 w-3 rounded-full bg-amber-400/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          </span>
          <span className="flex items-center gap-2 truncate font-mono text-[11px] text-slate-400">
            <Monitor className="h-3.5 w-3.5" /> {demo.windowTitle}
          </span>
          <span className="ml-auto hidden items-center gap-1.5 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-fuchsia-300 sm:flex">
            <Play className="h-3 w-3" /> Live demo
          </span>
        </div>

        <div className="relative aspect-[16/10] bg-black">
          <AnimatePresence mode="wait">
            <motion.img
              key={shot.src}
              src={shot.src}
              alt={shot.caption}
              loading="lazy"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4">
            <p className="text-sm text-slate-200">{shot.caption}</p>
          </div>
        </div>

        {/* dock / tab strip */}
        <div className="flex gap-2 overflow-x-auto border-t border-white/10 bg-white/[0.03] px-3 py-2.5">
          {demo.shots.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setIdx(i)}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                i === idx
                  ? "bg-fuchsia-500/20 text-fuchsia-200 ring-1 ring-fuchsia-400/40"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md">
        <p className="mb-3 text-[11px] font-mono uppercase tracking-[0.2em] text-slate-500">System requirements</p>
        <ul className="grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
          {demo.requirements.map((r) => (
            <li key={r} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fuchsia-400" />
              {r}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DesktopDemo;
