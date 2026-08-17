import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Code2,
  FolderGit2,
  GitBranch,
  Layers,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

export const OpenSource: React.FC = () => {
  const cards = [
    {
      title: "Repositories",
      description: "Public repositories featuring core modules, kernel interfaces, compilers, and CLI developer tooling.",
      icon: FolderGit2,
      count: "80+ Repos",
      path: "/opensource/projects",
    },
    {
      title: "Libraries",
      description: "High-performance Rust crates, TypeScript packages, and Python neural bindings optimized for speed.",
      icon: GitBranch,
      count: "120+ Packages",
      path: "/opensource/libraries",
    },
    {
      title: "Templates",
      description: "Production-ready starter templates for React, Next.js, Vite, microservices, and WASM modules.",
      icon: Layers,
      count: "45+ Starters",
      path: "/opensource/templates",
    },
    {
      title: "Documentation",
      description: "Comprehensive guides, API specifications, architectural diagrams, and step-by-step tutorials.",
      icon: BookOpen,
      count: "Full Docs",
      path: "/docs",
    },
    {
      title: "Developer Community",
      description: "Global community of contributors, core maintainers, code reviewers, and technical mentors.",
      icon: Users,
      count: "25k+ Members",
      path: "/community",
    },
  ];

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-black text-white border-t border-white/5 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-900/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-sky-400 uppercase"
          >
            COMMUNITY & CODE
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 font-brand"
          >
            Built in the Open for Everyone
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 font-light"
          >
            We believe transparent, accessible code accelerates global innovation. Discover our open-source software ecosystem.
          </motion.p>
        </div>

        {/* 5-Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-cyan-500/40 hover:bg-white/[0.06] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-cyan-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 text-slate-300 border border-white/10">
                      {card.count}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-sm text-slate-300 font-light leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 mt-6">
                  <Link
                    to={card.path}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors"
                  >
                    <span>Browse {card.title}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Large Central Call To Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center pt-8"
        >
          <Link
            to="/opensource"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-lg tracking-wide hover:from-cyan-400 hover:to-indigo-500 hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_40px_rgba(6,182,212,0.3)]"
          >
            <Code2 className="w-6 h-6" />
            <span>Explore Open Source Hub</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default OpenSource;
