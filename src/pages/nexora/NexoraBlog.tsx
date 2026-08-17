import { motion } from "framer-motion";
import { Newspaper, ArrowRight, Calendar } from "lucide-react";
import NexoraLayout from "./NexoraLayout";

const posts = [
  { title: "Introducing Nexora 2.8 — AI for everyone", date: "Apr 22, 2026", excerpt: "The biggest release we've ever shipped: native AI sidebar, faster sync and a redesigned settings.", tag: "Release" },
  { title: "How we cut RAM usage by 80%", date: "Mar 14, 2026", excerpt: "A deep dive into our new tab suspension engine and why your laptop will thank you.", tag: "Engineering" },
  { title: "The road to private-by-default sync", date: "Feb 2, 2026", excerpt: "End-to-end encryption isn't optional. Here's how we built sync v2 from the ground up.", tag: "Privacy" },
  { title: "Roadmap 2026: macOS, iOS and beyond", date: "Jan 8, 2026", excerpt: "What we're building next, and how you can help shape it.", tag: "Roadmap" },
];

const NexoraBlog = () => (
  <NexoraLayout>
    <section className="px-4 py-20">
      <div className="container-responsive max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-4">
            <Newspaper className="h-5 w-5 text-blue-300" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-blue-400">Blog</span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold">Updates, tips & <span className="italic text-blue-300">roadmap</span></h1>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {posts.map((p, i) => (
            <motion.article key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }} className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl p-6 hover:border-blue-500/30 transition-all cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/25 text-[9px] uppercase tracking-widest">{p.tag}</span>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500"><Calendar className="h-3 w-3" /> {p.date}</div>
              </div>
              <h2 className="text-lg font-bold mb-2 group-hover:text-blue-300 transition-colors">{p.title}</h2>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">{p.excerpt}</p>
              <span className="inline-flex items-center gap-1.5 text-xs text-blue-300 font-semibold">Read more <ArrowRight className="h-3 w-3" /></span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  </NexoraLayout>
);

export default NexoraBlog;
