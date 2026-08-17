import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import BlackwallLayout from "./BlackwallLayout";
import shotDesktop from "@/assets/blackwall/screenshot-desktop.jpg";
import shotFiles from "@/assets/blackwall/screenshot-files.jpg";
import shotTerminal from "@/assets/blackwall/screenshot-terminal.jpg";
import shotSettings from "@/assets/blackwall/screenshot-settings.jpg";
import shotStore from "@/assets/blackwall/screenshot-store.jpg";
import shotLock from "@/assets/blackwall/screenshot-lock.jpg";

const shots = [
  { title: "Desktop UI", description: "Glassmorphism workspace with neon accents.", img: shotDesktop },
  { title: "File Manager", description: "Native, blazing-fast file navigation.", img: shotFiles },
  { title: "Terminal", description: "Modern shell with syntax highlighting.", img: shotTerminal },
  { title: "Settings", description: "Granular controls, beautifully organized.", img: shotSettings },
  { title: "App Store", description: "Curated, sandboxed apps in one place.", img: shotStore },
  { title: "Lock Screen", description: "Secure-by-design biometric login.", img: shotLock },
];

const BlackwallScreenshots = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <BlackwallLayout>
      <section className="px-4 py-20">
        <div className="container-responsive max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
            <span className="text-[10px] uppercase tracking-[0.3em] text-blue-400">Screenshots</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold">A tour of <span className="italic text-blue-300">Black Wall</span></h1>
            <p className="mt-4 text-sm text-slate-500 max-w-xl mx-auto">
              Click any preview to expand. Designed for clarity, optimized for focus.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {shots.map((s, i) => (
              <motion.button
                key={s.title}
                onClick={() => setActive(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl overflow-hidden hover:border-blue-500/30 transition-all text-left"
              >
                <div className="aspect-video overflow-hidden">
                  <img src={s.img} alt={s.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <div className="text-sm font-semibold text-white">{s.title}</div>
                  <div className="text-xs text-slate-500 mt-1">{s.description}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {active !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6"
          onClick={() => setActive(null)}
        >
          <button onClick={() => setActive(null)} className="absolute top-6 right-6 h-10 w-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white">
            <X className="h-4 w-4" />
          </button>
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="relative w-full max-w-5xl rounded-2xl overflow-hidden border border-white/10">
            <img src={shots[active].img} alt={shots[active].title} className="w-full h-auto" />
          </motion.div>
        </motion.div>
      )}
    </BlackwallLayout>
  );
};

export default BlackwallScreenshots;
