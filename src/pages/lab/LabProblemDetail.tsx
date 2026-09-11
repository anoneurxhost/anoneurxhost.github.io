import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Users, BookOpen, Code2, Target, FileText, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import ContentSidebar, { TocItem } from "@/components/project/ContentSidebar";
import { problems } from "./data";

const problemToc: TocItem[] = [
  { id: "statement", label: "Problem Statement" },
  { id: "why-it-matters", label: "Why It Matters" },
  { id: "research-gap", label: "Research Gap" },
  { id: "research-questions", label: "Research Questions" },
  { id: "technologies", label: "Suggested Technologies" },
  { id: "skills", label: "Required Skills" },
  { id: "team", label: "Team & Supervisor" },
  { id: "deliverables", label: "Expected Deliverables" },
];

const LabProblemDetail = () => {
  const { id } = useParams();
  const problem = problems.find((p) => p.id === id);

  if (!problem) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Problem Not Found</h1>
          <Link to="/lab/problems" className="text-emerald-400 text-sm hover:underline">← Back to Problem Board</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-14 md:py-20">
      <SEO
        title={`${problem.title}`}
        description={`${problem.description} — An open research problem at Anoneurx Lab (${problem.code}). Difficulty: ${problem.difficulty}. Status: ${problem.status}.`}
        path={`/lab/problems/${problem.id}`}
        type="article"
        keywords={`anoneurx research, ${problem.code}, research problem, open research, ${problem.areas.join(", ")}, student research, ai research challenges, cybersecurity research, robotics research`}
      />
      <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-[1fr_240px]">
      <div className="min-w-0 rounded-2xl border border-white/5 bg-black/10 backdrop-blur-xl p-6 md:p-10">
        {/* Back */}
        <Link to="/lab/problems" className="inline-flex items-center gap-2 text-gray-500 text-sm hover:text-white transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Problem Board
        </Link>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-emerald-400/80">{problem.code}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
              problem.difficulty === "Beginner" ? "bg-green-500/10 text-green-400" :
              problem.difficulty === "Intermediate" ? "bg-yellow-500/10 text-yellow-400" :
              problem.difficulty === "Advanced" ? "bg-orange-500/10 text-orange-400" :
              "bg-red-500/10 text-red-400"
            }`}>
              {problem.difficulty}
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
              problem.status === "Open" ? "bg-emerald-500/10 text-emerald-400" :
              problem.status === "In Progress" ? "bg-blue-500/10 text-blue-400" :
              "bg-gray-500/10 text-gray-400"
            }`}>
              {problem.status}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">{problem.title}</h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {problem.areas.map((area) => (
              <span key={area} className="text-xs px-3 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10">{area}</span>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <div className="space-y-10">
          {/* Problem Statement */}
          <motion.section id="statement" className="scroll-mt-28" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <SectionHeader icon={Target} title="Problem Statement" />
            <p className="text-gray-300 text-sm leading-relaxed">{problem.description}</p>
          </motion.section>

          {/* Why It Matters */}
          <motion.section id="why-it-matters" className="scroll-mt-28" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
            <SectionHeader icon={BookOpen} title="Why It Matters" />
            <p className="text-gray-300 text-sm leading-relaxed">{problem.whyItMatters}</p>
          </motion.section>

          {/* Research Gap */}
          <motion.section id="research-gap" className="scroll-mt-28" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <SectionHeader icon={Target} title="Research Gap" />
            <p className="text-gray-300 text-sm leading-relaxed">{problem.researchGap}</p>
          </motion.section>

          {/* Research Questions */}
          <motion.section id="research-questions" className="scroll-mt-28" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}>
            <SectionHeader icon={FileText} title="Research Questions" />
            <ol className="space-y-3">
              {problem.researchQuestions.map((q, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-300">
                  <span className="text-emerald-400 font-mono text-xs mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                  <span>{q}</span>
                </li>
              ))}
            </ol>
          </motion.section>

          {/* Suggested Technologies */}
          <motion.section id="technologies" className="scroll-mt-28" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <SectionHeader icon={Wrench} title="Suggested Technologies" />
            <div className="flex flex-wrap gap-2">
              {problem.technologies.map((tech) => (
                <span key={tech} className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">{tech}</span>
              ))}
            </div>
          </motion.section>

          {/* Required Skills */}
          <motion.section id="skills" className="scroll-mt-28" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}>
            <SectionHeader icon={Code2} title="Required Skills" />
            <div className="flex flex-wrap gap-2">
              {problem.skills.map((skill) => (
                <span key={skill} className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 border border-white/10">{skill}</span>
              ))}
            </div>
          </motion.section>

          {/* Team & Supervisor */}
          <motion.section id="team" className="scroll-mt-28" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-black/10 backdrop-blur-xl border border-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Team Size</span>
                </div>
                <p className="text-white text-sm font-bold">{problem.teamSize} researchers</p>
                <p className="text-gray-500 text-xs mt-1">Suitable for: {problem.suitableFor.join(", ")}</p>
              </div>
              <div className="p-5 rounded-xl bg-black/10 backdrop-blur-xl border border-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Supervisor</span>
                </div>
                <p className="text-white text-sm font-bold">{problem.supervisor}</p>
                <p className="text-gray-500 text-xs mt-1">Research Lead, Anoneurx Lab</p>
              </div>
            </div>
          </motion.section>

          {/* Deliverables */}
          <motion.section id="deliverables" className="scroll-mt-28" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45 }}>
            <SectionHeader icon={FileText} title="Expected Deliverables" />
            <ul className="space-y-2">
              {problem.deliverables.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-emerald-400 mt-1">→</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </motion.section>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 p-8 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-center"
        >
          <h3 className="text-xl font-bold mb-3">Work on this problem</h3>
          <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
            Apply to join Anoneurx Lab and contribute to this research problem.
          </p>
          <Link to="/lab/apply">
            <Button className="h-11 px-8 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-widest group">
              Apply Now <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>

      <aside className="hidden lg:block">
        <ContentSidebar items={problemToc} title="Contents" />
      </aside>
    </div>
  </div>
  );
};

const SectionHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <div className="flex items-center gap-2 mb-4">
    <Icon className="h-4 w-4 text-emerald-400" />
    <h2 className="text-lg font-bold">{title}</h2>
  </div>
);

export default LabProblemDetail;
