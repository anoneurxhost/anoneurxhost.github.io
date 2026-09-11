import { motion } from "framer-motion";
import { Users, GitCommit } from "lucide-react";
import SEO from "@/components/SEO";
import { researchers } from "./data";

const LabPeople = () => {
  return (
    <div className="min-h-screen px-4 py-14 md:py-20">
      <SEO
        title="Researchers"
        description="Student researchers and research leads at Anoneurx Lab working on AI, systems, cybersecurity, and robotics research."
        path="/lab/people"
        keywords="anoneurx researchers, student researchers, research leads, ai researchers, cybersecurity researchers, computer science students, research team"
      />
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-bold">Team</span>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Researchers</h1>
          <p className="mt-2 text-gray-500 text-sm max-w-2xl">
            Students and research leads contributing to Anoneurx Lab.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {researchers.map((person, i) => (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="p-6 rounded-xl bg-black/10 backdrop-blur-xl border border-white/5 hover:border-emerald-500/30 transition-all group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Users className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">{person.name}</h3>
                  <p className="text-emerald-400/80 text-[10px] font-bold uppercase tracking-wider">{person.role}</p>
                </div>
              </div>
              <p className="text-gray-400 text-xs mb-4 leading-relaxed">{person.bio}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {person.areas.map((area) => (
                  <span key={area} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400">{area}</span>
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                <GitCommit className="h-3 w-3" />
                {person.contributions} contributions
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LabPeople;
