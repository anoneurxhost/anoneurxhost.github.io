import { motion } from "framer-motion";
import { Sparkles, Languages, FileText, Wand2 } from "lucide-react";
import NexoraLayout from "./NexoraLayout";
import aiImg from "@/assets/nexora/browser-ai.jpg";

const NexoraAI = () => (
  <NexoraLayout>
    <section className="px-4 py-20">
      <div className="container-responsive max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 border border-purple-500/20 mb-4">
            <Sparkles className="h-5 w-5 text-purple-300" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-purple-400">Nexora AI</span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold">A browser that <span className="italic text-purple-300">thinks</span> with you.</h1>
        </motion.div>

        <div className="rounded-2xl overflow-hidden border border-white/10 mb-12">
          <img src={aiImg} alt="Nexora AI sidebar" loading="lazy" className="w-full h-auto" />
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { icon: Languages, title: "Translate Anywhere", desc: "Real-time inline translation in 100+ languages." },
            { icon: FileText, title: "Summarize Pages", desc: "Get the gist of any article, paper or thread in seconds." },
            { icon: Wand2, title: "Smart Automation", desc: "Ask the AI to fill forms, sort tabs, or research a topic." },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl p-6">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center mb-4">
                <c.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-base font-bold mb-2">{c.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </NexoraLayout>
);

export default NexoraAI;
