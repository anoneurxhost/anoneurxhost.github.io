import { motion } from "framer-motion";
import NexoraLayout from "./NexoraLayout";

const LegalPage = ({ title, intro, sections }: { title: string; intro: string; sections: { h: string; p: string }[] }) => (
  <NexoraLayout>
    <section className="px-4 py-20">
      <div className="container-responsive max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-blue-400">Legal</span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold">{title}</h1>
          <p className="mt-4 text-sm text-slate-500">Last updated: April 22, 2026</p>
        </motion.div>
        <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl p-8 md:p-10 space-y-6">
          <p className="text-sm text-slate-400 leading-relaxed">{intro}</p>
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="text-lg font-bold text-white mb-2">{s.h}</h2>
              <p className="text-sm text-slate-400 leading-relaxed">{s.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </NexoraLayout>
);

export default LegalPage;
