import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ExternalLink, GitBranch } from "lucide-react";
import SEO from "@/components/SEO";
import { labProjects } from "./data";

const LabProjects = () => {
  return (
    <div className="min-h-screen px-4 py-14 md:py-20">
      <SEO
        title="Research Projects"
        description="Anoneurx Lab research problems that evolved into real prototypes and products. From research to implementation to Anoneurx technology."
        path="/lab/projects"
        keywords="anoneurx projects, research prototypes, research to product, open source research projects, lab projects, technology implementations, student projects"
      />
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-bold">Projects</span>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Research → Prototype → Product</h1>
          <p className="mt-2 text-gray-500 text-sm max-w-2xl">
            Problems that have evolved into actual implementations. Anoneurx research becomes real technology.
          </p>
        </div>

        {/* Pipeline */}
        <div className="mb-12 flex items-center justify-center gap-2 text-xs text-gray-500">
          {["Problem", "Research", "Prototype", "Project", "Product"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span className={`px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider ${
                i < 3 ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-gray-500"
              }`}>
                {step}
              </span>
              {i < 4 && <span className="text-gray-600">→</span>}
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {labProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="p-6 rounded-xl bg-black/10 backdrop-blur-xl border border-white/5 hover:border-emerald-500/30 transition-all group"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  project.status === "Active" ? "bg-emerald-500/10 text-emerald-400" :
                  project.status === "Prototype" ? "bg-blue-500/10 text-blue-400" :
                  "bg-gray-500/10 text-gray-400"
                }`}>
                  {project.status}
                </span>
                <span className="text-[10px] text-gray-500">{project.area}</span>
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-emerald-400 transition-colors">{project.title}</h3>
              <p className="text-gray-400 text-xs mb-4 leading-relaxed">{project.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[10px] text-gray-500">
                  <GitBranch className="h-3 w-3" />
                  {project.researchers.join(", ")}
                </div>
                {project.problemId && (
                  <Link to={`/lab/problems/${project.problemId}`} className="text-emerald-400 text-[10px] hover:underline flex items-center gap-1">
                    View Problem <ExternalLink className="h-3 w-3" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LabProjects;
