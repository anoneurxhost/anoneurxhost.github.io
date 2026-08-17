import { motion } from "framer-motion";
import { Download, Apple, Monitor, Smartphone, Cpu, ShieldCheck, Calendar } from "lucide-react";
import NexoraLayout from "../nexora/NexoraLayout";

const platforms = [
  { name: "Windows", note: "Windows 10 / 11 · x64", icon: Monitor, cta: "Download .EXE", color: "from-blue-500 to-cyan-400", available: true },
  { name: "Linux", note: "Ubuntu, Fedora, Arch · AppImage / .deb", icon: Cpu, cta: "Download AppImage", color: "from-amber-500 to-orange-400", available: true },
  { name: "Android", note: "Android 10+ · Play Store", icon: Smartphone, cta: "Get on Play Store", color: "from-emerald-500 to-teal-400", available: true },
  { name: "macOS", note: "Apple Silicon / Intel · Universal DMG", icon: Apple, cta: "Coming Soon", color: "from-slate-500 to-slate-400", available: false },
  { name: "iOS", note: "iPhone & iPad · App Store", icon: Smartphone, cta: "Coming Soon", color: "from-purple-500 to-pink-400", available: false },
];

const NexoraDownload = () => (
  <NexoraLayout>
    <section className="px-4 py-20">
      <div className="container-responsive max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-blue-400">Download</span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold">Get Nexora <span className="italic text-blue-300">everywhere.</span></h1>
          <p className="mt-4 text-sm text-slate-500 max-w-lg mx-auto">
            Free forever. Verified releases. Lightning-fast mirrors worldwide.
          </p>
          <div className="mt-5 inline-flex items-center gap-3 text-xs text-slate-500">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 text-[10px] uppercase tracking-widest">Stable</span>
            <span>v2.8.4 · Released April 2026</span>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {platforms.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl p-6 flex flex-col"
            >
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-4`}>
                <p.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-bold">{p.name}</h3>
              <p className="text-xs text-slate-500 mt-1 mb-5">{p.note}</p>
              <button
                disabled={!p.available}
                className={`mt-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  p.available
                    ? "bg-blue-600 hover:bg-blue-500 text-white hover:shadow-[0_0_24px_rgba(37,99,235,0.4)]"
                    : "bg-white/5 text-slate-500 cursor-not-allowed"
                }`}
              >
                {p.available && <Download className="h-3.5 w-3.5" />}
                {p.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <div className="rounded-2xl border border-blue-500/15 bg-blue-500/[0.04] p-5 flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-blue-300 flex-shrink-0" />
          <p className="text-xs text-slate-400">All downloads are signed and verified. GPG signatures and SHA256 checksums available on our GitHub.</p>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-5">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-4 w-4 text-blue-300" />
              <h3 className="text-base font-bold">What's new in v2.8.4</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex gap-2"><span className="text-blue-400">+</span> AI sidebar with translation & summary</li>
              <li className="flex gap-2"><span className="text-blue-400">+</span> Encrypted sync v2 — 3x faster</li>
              <li className="flex gap-2"><span className="text-emerald-400">~</span> Improved tab suspension (saves 80% RAM)</li>
              <li className="flex gap-2"><span className="text-amber-400">!</span> Fixed PDF reader memory leak</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
            <h3 className="text-base font-bold mb-3">Beta channel</h3>
            <p className="text-xs text-slate-500 mb-4">Want the bleeding edge? Join the beta channel and get experimental features 4 weeks early.</p>
            <button className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white text-xs font-semibold hover:bg-white/10 transition-all">Join Beta Program</button>
          </div>
        </div>
      </div>
    </section>
  </NexoraLayout>
);

export default NexoraDownload;
