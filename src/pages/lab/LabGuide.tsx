import { motion } from "framer-motion";
import { BookOpen, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { guideSections } from "./data";

const LabGuide = () => {
  return (
    <div className="min-h-screen px-4 py-14 md:py-20">
      <SEO
        title="Research Guide"
        description="A complete research guide for university students: how to select a problem, do a literature review, find research gaps, design experiments, evaluate, write papers, and publish."
        path="/lab/guide"
        keywords="research guide, how to do research, literature review, research gap, designing experiments, research methodology, writing a research paper, git github workflow, research ethics, publishing research, student research guide"
      />
      <div className="mx-auto max-w-4xl">
        <Link to="/lab" className="inline-flex items-center gap-2 text-gray-500 text-sm hover:text-white transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Lab
        </Link>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-bold">Guide</span>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Research Guide</h1>
          <p className="mt-2 text-gray-500 text-sm max-w-2xl">
            A comprehensive guide for students who want to conduct research at Anoneurx Lab.
          </p>
        </motion.div>

        <div className="mt-12 space-y-8">
          {guideSections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="p-6 rounded-xl bg-black/10 backdrop-blur-xl border border-white/5"
            >
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-4 w-4 text-emerald-400" />
                <h2 className="text-lg font-bold">{section.title}</h2>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LabGuide;
