import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { X, Download, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import shotDesktop from "@/assets/blackwall/screenshot-desktop.jpg";
import shotFiles from "@/assets/blackwall/screenshot-files.jpg";
import shotTerminal from "@/assets/blackwall/screenshot-terminal.jpg";
import shotSettings from "@/assets/blackwall/screenshot-settings.jpg";
import shotStore from "@/assets/blackwall/screenshot-store.jpg";
import shotLock from "@/assets/blackwall/screenshot-lock.jpg";

type Cat = "All" | "Desktop" | "Apps" | "Security" | "Terminal";

const shots: { title: string; description: string; img: string; cat: Exclude<Cat, "All"> }[] = [
  { title: "Desktop UI", description: "Glassmorphism workspace with neon accents.", img: shotDesktop, cat: "Desktop" },
  { title: "File Manager", description: "Native, blazing-fast file navigation.", img: shotFiles, cat: "Apps" },
  { title: "Terminal", description: "Modern shell with syntax highlighting.", img: shotTerminal, cat: "Terminal" },
  { title: "Settings", description: "Granular controls, beautifully organized.", img: shotSettings, cat: "Desktop" },
  { title: "App Store", description: "Curated, sandboxed apps in one place.", img: shotStore, cat: "Apps" },
  { title: "Lock Screen", description: "Secure-by-design biometric login.", img: shotLock, cat: "Security" },
];

const cats: Cat[] = ["All", "Desktop", "Apps", "Security", "Terminal"];

const BlackwallShowcase = () => {
  const [active, setActive] = useState<number | null>(null);
  const [cat, setCat] = useState<Cat>("All");

  const filtered = useMemo(
    () => (cat === "All" ? shots : shots.filter((s) => s.cat === cat)),
    [cat]
  );

  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="pointer-events-none absolute top-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[160px]" />
      <div className="pointer-events-none absolute bottom-40 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[160px]" />

      <section className="px-4 pt-32 pb-12 relative">
        <div className="container-responsive max-w-6xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="bg-blue-500/10 text-blue-300 border-blue-500/20 text-[10px] uppercase tracking-[0.3em] mb-5">
              Showcase
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight font-brand">
              See <span className="italic bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">Black Wall</span> in motion
            </h1>
            <p className="mt-5 text-sm md:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
              A guided tour of the Black Wall OS interface — from the lock screen to the terminal. Click any preview to expand.
            </p>
          </motion.div>

          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border backdrop-blur-2xl transition-all ${
                  cat === c
                    ? "bg-white text-black border-white"
                    : "bg-white/[0.03] text-gray-400 border-white/10 hover:border-blue-500/40 hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="container-responsive max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((s, i) => (
              <motion.button
                key={s.title}
                onClick={() => setActive(shots.indexOf(s))}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-2xl overflow-hidden hover:border-blue-500/40 transition-all text-left"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white">{s.title}</div>
                    <div className="text-[11px] text-gray-500 mt-1">{s.description}</div>
                  </div>
                  <Badge className="bg-blue-500/10 text-blue-300 border-blue-500/20 text-[9px] uppercase tracking-widest">
                    {s.cat}
                  </Badge>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="container-responsive max-w-4xl">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-blue-900/10 via-black to-slate-900/5 p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">Ready to try it yourself?</h2>
            <p className="text-sm text-gray-400 mb-6 max-w-lg mx-auto">
              Download the latest ISO or dive into the docs to learn how Black Wall is built.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/blackwall/download">
                <Button className="h-12 px-7 rounded-lg bg-white text-black font-bold text-xs uppercase tracking-widest">
                  Download ISO <Download className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Link to="/docs/blackwall">
                <Button variant="outline" className="h-12 px-7 rounded-lg border-white/10 hover:bg-white/5 text-white font-bold text-xs uppercase tracking-widest">
                  Read Docs <BookOpen className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6"
            onClick={() => setActive(null)}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute top-6 right-6 h-10 w-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-5xl rounded-2xl overflow-hidden border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={shots[active].img} alt={shots[active].title} className="w-full h-auto" />
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 to-transparent">
                <div className="text-sm font-bold text-white">{shots[active].title}</div>
                <div className="text-xs text-gray-400 mt-1">{shots[active].description}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlackwallShowcase;
