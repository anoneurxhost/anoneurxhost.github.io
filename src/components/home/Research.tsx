import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import roboticsHeroImg from "@/assets/marketing/robotics-hero.jpg";

export const Research: React.FC = () => {
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 text-white border-t border-white/5 overflow-hidden">
      {/* Glow background accent */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20">

        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-purple-400 uppercase"
          >
            FRONTIER DISCOVERY
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-cyan-300 font-brand"
          >
            Research & Innovation
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 font-light"
          >
            Advancing the frontiers of computational science through fundamental research and open algorithmic breakthroughs.
          </motion.p>
        </div>

        {/* Interactive Graphic & Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl p-8 sm:p-12 backdrop-blur-2xl overflow-hidden shadow-2xl"
        >
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono text-bold tracking-wider uppercase font-brand">
                ANONEURX RESEARCH LABS
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Pioneering Intelligent Systems & Hardware Foundations
              </h3>
              <p className="text-slate-300 text-base leading-relaxed font-light">
                Our interdisciplinary research teams publish peer-reviewed papers, release benchmark datasets, and contribute formal proofs directly into the open-source software ecosystem.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  to="/research"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white font-semibold text-sm hover:bg-white/20 hover:border-white/40 backdrop-blur-md transition-all"
                >
                  <span>Explore Research Hub</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Robotics Hero Image Illustration */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative w-full max-w-md rounded-2xl overflow-hidden border border-white/15 shadow-2xl group">
                <img
                  src={roboticsHeroImg}
                  alt="Robotics Research"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Research;
