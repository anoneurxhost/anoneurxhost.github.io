import { motion } from "framer-motion";
import { Download, Upload, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import NexoraLayout from "./NexoraLayout";

const steps = [
  { n: "1", title: "Download Nexora", desc: "Pick your platform from the download page — install in under a minute." },
  { n: "2", title: "Open the import wizard", desc: "Settings → Import data. Pick your old browser." },
  { n: "3", title: "Choose what to bring", desc: "Bookmarks, history, passwords, open tabs — all opt-in." },
  { n: "4", title: "Pin Nexora as default", desc: "We'll prompt you. Two clicks and you're done." },
];

const NexoraSwitch = () => (
  <NexoraLayout>
    <section className="px-4 py-20">
      <div className="container-responsive max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-4">
            <Upload className="h-5 w-5 text-blue-300" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-blue-400">Switch to Nexora</span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold">Switching is <span className="italic text-blue-300">painless.</span></h1>
          <p className="mt-4 text-sm text-slate-500">Bring your old browser with you in under 60 seconds.</p>
        </motion.div>

        <div className="space-y-4 mb-10">
          {steps.map((s, i) => (
            <motion.div key={s.n} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl p-5">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0 text-sm font-bold">{s.n}</div>
              <div className="flex-1">
                <h3 className="text-base font-bold mb-1">{s.title}</h3>
                <p className="text-xs text-slate-500">{s.desc}</p>
              </div>
              <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-1.5 flex-shrink-0" />
            </motion.div>
          ))}
        </div>

        <Link to="/nexora/download" className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all">
          <Download className="h-4 w-4" /> Download Nexora <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  </NexoraLayout>
);

export default NexoraSwitch;
