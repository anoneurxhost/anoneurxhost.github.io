import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { researchAreas } from "./data";

const LabAreas = () => {
  return (
    <div className="min-h-screen px-4 py-14 md:py-20">
      <SEO
        title="Research Areas"
        description="Research domains at Anoneurx Lab — AI & machine learning, cybersecurity, robotics, autonomous systems, systems & OS, data science, IoT & edge, AI safety, and more."
        path="/lab/areas"
        keywords="research areas, ai machine learning, cybersecurity research, robotics research, autonomous systems, operating systems research, data science, iot edge computing, human computer interaction, ai safety, frontier research"
      />
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-bold">Research Domains</span>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Research Areas</h1>
          <p className="mt-2 text-gray-500 text-sm max-w-2xl">
            Explore the domains where Anoneurx Lab is pushing the boundaries of knowledge.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {researchAreas.map((area, i) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="p-6 rounded-xl bg-black/10 backdrop-blur-xl border border-white/5 hover:border-emerald-500/30 transition-all group"
            >
              <h3 className="text-lg font-bold mb-2 group-hover:text-emerald-400 transition-colors">{area.name}</h3>
              <p className="text-gray-400 text-xs mb-4 leading-relaxed">{area.description}</p>
              <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                {area.problemCount} open problem{area.problemCount !== 1 ? "s" : ""}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LabAreas;
