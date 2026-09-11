import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Users, BookOpen, Globe, Shield, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

const values = [
  { icon: Target, title: "Problem-First", desc: "We start with real problems, not trendy topics. Every research project addresses a genuine gap in knowledge." },
  { icon: Users, title: "Student-Driven", desc: "Students lead the research. Research leads provide mentorship, not direction. Your ideas matter." },
  { icon: Globe, title: "Open by Default", desc: "All research code, datasets, and papers are open source. Knowledge should be freely available." },
  { icon: Shield, title: "Rigorous", desc: "We follow the scientific method. Every claim is backed by evidence. Every experiment is reproducible." },
  { icon: BookOpen, title: "Publishable", desc: "We aim for publication in recognized venues. Research that stays in a notebook is research wasted." },
  { icon: Code2, title: "Product-Bound", desc: "Great research becomes great products. The path from paper to prototype to product is part of our process." },
];

const LabAbout = () => {
  return (
    <div className="min-h-screen px-4 py-14 md:py-20">
      <SEO
        title="About the Lab"
        description="Why Anoneurx Lab exists: open research, real problems, student-driven study of AI, cybersecurity, robotics, and systems. Open by default. Rigorous by design."
        path="/lab/about"
        keywords="anoneurx lab about, open research philosophy, research lab mission, student research participation, open source research, research evaluation, how research problems are selected"
      />
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-bold">About</span>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">About Anoneurx Lab</h1>
        </motion.div>

        {/* Mission */}
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mt-12">
          <h2 className="text-xl font-bold mb-4">Why We Exist</h2>
          <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
            <p>
              Anoneurx Lab was created to bridge the gap between academic research and real-world impact.
              We identify open problems across AI, cybersecurity, robotics, and systems — then invite
              university students to work on them with mentorship, infrastructure, and a path to publication.
            </p>
            <p>
              Most research labs are closed. Most student research goes unread. We're changing that by making
              research open, accessible, and connected to products that matter.
            </p>
          </div>
        </motion.section>

        {/* Philosophy */}
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="mt-12">
          <h2 className="text-xl font-bold mb-4">Research Philosophy</h2>
          <div className="p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
            <p className="text-gray-300 text-sm leading-relaxed italic">
              "Anoneurx discovers difficult problems and gives students a place to solve them."
            </p>
            <p className="text-emerald-400 text-xs mt-3 font-bold">— Muhammad Qasim, Research Lead</p>
          </div>
        </motion.section>

        {/* Values */}
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-12">
          <h2 className="text-xl font-bold mb-6">Our Values</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((v, i) => (
              <div key={v.title} className="p-5 rounded-xl bg-black/10 backdrop-blur-xl border border-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <v.icon className="h-4 w-4 text-emerald-400" />
                  <h3 className="text-sm font-bold">{v.title}</h3>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Who Can Participate */}
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="mt-12">
          <h2 className="text-xl font-bold mb-4">Who Can Participate</h2>
          <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
            <p>
              Any university student with relevant skills. We welcome undergrads, Masters, and PhD students
              from any university worldwide. No prior research experience is required for beginner-level problems.
            </p>
            <p>
              We also welcome industry researchers and professionals who want to mentor or contribute expertise.
            </p>
          </div>
        </motion.section>

        {/* How Problems Are Selected */}
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-12">
          <h2 className="text-xl font-bold mb-4">How Problems Are Selected</h2>
          <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
            <p>
              Problems are identified through literature review, industry needs analysis, and gaps observed
              in existing technology. Each problem must meet three criteria:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex gap-2"><span className="text-emerald-400">→</span> It addresses a genuine research gap</li>
              <li className="flex gap-2"><span className="text-emerald-400">→</span> It can be meaningfully contributed to by students</li>
              <li className="flex gap-2"><span className="text-emerald-400">→</span> It has potential for real-world impact</li>
            </ul>
          </div>
        </motion.section>

        {/* Open Source Philosophy */}
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }} className="mt-12">
          <h2 className="text-xl font-bold mb-4">Open Source Philosophy</h2>
          <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
            <p>
              All research code is published under open-source licenses. Datasets are shared openly when possible.
              Papers are posted as preprints on arXiv before or alongside conference submission.
            </p>
            <p>
              We believe that research locked behind paywalls or private repos is research that fails its purpose.
            </p>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="mt-16 text-center">
          <h3 className="text-xl font-bold mb-4">Ready to contribute?</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/lab/problems">
              <Button className="h-11 px-8 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-widest group">
                Browse Problems <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/lab/apply">
              <Button variant="outline" className="h-11 px-8 rounded-lg border-emerald-500/20 hover:bg-emerald-500/5 text-white font-bold text-xs uppercase tracking-widest">
                Join the Lab
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LabAbout;
