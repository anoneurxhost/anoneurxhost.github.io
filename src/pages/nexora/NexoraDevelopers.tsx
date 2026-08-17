import { motion } from "framer-motion";
import { Code2, Puzzle, Terminal, Book, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import NexoraLayout from "./NexoraLayout";

const NexoraDevelopers = () => (
  <NexoraLayout>
    <section className="px-4 py-20">
      <div className="container-responsive max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-4">
            <Code2 className="h-5 w-5 text-blue-300" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-blue-400">Developers</span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold">Build for <span className="italic text-blue-300">Nexora</span></h1>
          <p className="mt-4 text-sm text-slate-500 max-w-xl mx-auto">Powerful APIs, a friendly extension SDK and a developer-first browser.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {[
            { icon: Puzzle, title: "Extension SDK", desc: "Chrome-compatible Web Extension API plus exclusive Nexora hooks for AI and sync." },
            { icon: Terminal, title: "DevTools++", desc: "An evolved DevTools with built-in network privacy inspector and AI explanations." },
            { icon: Book, title: "API Reference", desc: "Complete reference for every browser API, with live playground examples." },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl p-6">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mb-4">
                <c.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-base font-bold mb-2">{c.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/[0.04] p-8 text-center">
          <h3 className="text-lg font-bold mb-2">Get the SDK</h3>
          <p className="text-sm text-slate-400 mb-5">Install the Nexora CLI and scaffold your first extension in under a minute.</p>
          <Link to="/nexora/docs" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all">
            Read developer docs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  </NexoraLayout>
);

export default NexoraDevelopers;
