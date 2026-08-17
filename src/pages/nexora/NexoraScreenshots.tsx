import { useState } from "react";
import { motion } from "framer-motion";
import { X, Monitor, Smartphone } from "lucide-react";
import NexoraLayout from "./NexoraLayout";
import desktop from "@/assets/nexora/browser-hero.jpg";
import mobile from "@/assets/nexora/browser-mobile.jpg";
import ai from "@/assets/nexora/browser-ai.jpg";
import settings from "@/assets/nexora/browser-settings.jpg";

const shots = [
  { title: "Desktop browser", desc: "Clean glassmorphism UI with smart workspaces.", img: desktop, type: "desktop" as const },
  { title: "AI sidebar", desc: "Translate, summarize, and automate — natively.", img: ai, type: "desktop" as const },
  { title: "Privacy settings", desc: "Granular controls for trackers, cookies and DNS.", img: settings, type: "desktop" as const },
  { title: "Mobile browser", desc: "Same speed, same privacy — pocket-sized.", img: mobile, type: "mobile" as const },
];

const NexoraScreenshots = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <NexoraLayout>
      <section className="px-4 py-20">
        <div className="container-responsive max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
            <span className="text-[10px] uppercase tracking-[0.3em] text-blue-400">Screenshots</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold">A tour of <span className="italic text-blue-300">Nexora</span></h1>
            <p className="mt-4 text-sm text-slate-500 max-w-xl mx-auto">Click any preview to expand.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {shots.map((s, i) => (
              <motion.button
                key={s.title}
                onClick={() => setActive(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group text-left rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl overflow-hidden hover:border-blue-500/30 transition-all"
              >
                <div className={`overflow-hidden ${s.type === "mobile" ? "aspect-[9/12] flex items-center justify-center bg-black/40 p-6" : "aspect-video"}`}>
                  <img src={s.img} alt={s.title} loading="lazy" className={`${s.type === "mobile" ? "h-full w-auto" : "w-full h-full"} object-cover group-hover:scale-105 transition-transform duration-500`} />
                </div>
                <div className="p-4 flex items-start gap-3">
                  {s.type === "mobile" ? <Smartphone className="h-4 w-4 text-blue-300 mt-0.5" /> : <Monitor className="h-4 w-4 text-blue-300 mt-0.5" />}
                  <div>
                    <div className="text-sm font-semibold text-white">{s.title}</div>
                    <div className="text-xs text-slate-500 mt-1">{s.desc}</div>
                  </div>
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
          <motion.img initial={{ scale: 0.95 }} animate={{ scale: 1 }} src={shots[active].img} alt={shots[active].title} className={`${shots[active].type === "mobile" ? "max-h-[85vh]" : "w-full max-w-5xl"} rounded-2xl border border-white/10`} />
        </motion.div>
      )}
    </NexoraLayout>
  );
};

export default NexoraScreenshots;
