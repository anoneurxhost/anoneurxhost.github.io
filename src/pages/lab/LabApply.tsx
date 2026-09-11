import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Clock, Users, FileCheck, Award, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

const steps = [
  { icon: FileCheck, title: "Choose a Problem", desc: "Browse the Problem Board and find a research problem that matches your skills and interests." },
  { icon: Users, title: "Submit Application", desc: "Fill out the application form with your background, skills, and motivation for the problem." },
  { icon: CheckCircle2, title: "Team Review", desc: "The research team reviews applications and selects candidates based on fit and potential." },
  { icon: Rocket, title: "Join the Project", desc: "Get onboarded, meet your team, and start working on the research problem." },
  { icon: Clock, title: "Conduct Research", desc: "Work with your team and mentor to design experiments, implement solutions, and validate results." },
  { icon: Award, title: "Build & Publish", desc: "Develop prototypes, write papers, and contribute to open-source projects." },
];

const LabApply = () => {
  return (
    <div className="min-h-screen px-4 py-14 md:py-20">
      <SEO
        title="Join the Lab"
        description="Apply to join Anoneurx Lab. Choose a research problem, submit your application, and work with a team to conduct research and build real technology."
        path="/lab/apply"
        keywords="join research lab, apply research, student research application, research opportunities, how to join anoneurx lab, participate in research, research mentorship"
      />
      <div className="mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-bold">Participate</span>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Join the Lab</h1>
          <p className="mt-2 text-gray-500 text-sm max-w-2xl">
            Apply to join Anoneurx Lab and work on research problems that matter.
          </p>
        </motion.div>

        {/* Process */}
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mt-12">
          <h2 className="text-xl font-bold mb-6">Application Process</h2>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={step.title} className="flex gap-4 p-5 rounded-xl bg-black/10 backdrop-blur-xl border border-white/5">
                <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <span className="text-emerald-400 font-bold text-sm">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold mb-1">{step.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Requirements */}
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-12">
          <h2 className="text-xl font-bold mb-4">Requirements</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex gap-2"><span className="text-emerald-400">→</span> Currently enrolled at a university (any country)</li>
            <li className="flex gap-2"><span className="text-emerald-400">→</span> Relevant skills for the chosen problem</li>
            <li className="flex gap-2"><span className="text-emerald-400">→</span> Commitment to research ethics and open-source values</li>
            <li className="flex gap-2"><span className="text-emerald-400">→</span> Willingness to publish findings openly</li>
          </ul>
        </motion.section>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-16 p-8 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-center">
          <h3 className="text-xl font-bold mb-3">Ready to start?</h3>
          <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
            Browse our open problems and find one that excites you.
          </p>
          <Link to="/lab/problems">
            <Button className="h-11 px-8 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-widest group">
              Browse Problems <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default LabApply;
