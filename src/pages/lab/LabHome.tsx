import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Beaker, Users, Lightbulb, FlaskConical, BookOpen, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/SEO";
import { problems, researchPapers, researchers, researchAreas } from "./data";

const steps = [
  { icon: Target, title: "Discover", desc: "Find a real problem that matters." },
  { icon: FlaskConical, title: "Research", desc: "Conduct rigorous experiments." },
  { icon: Lightbulb, title: "Prototype", desc: "Build a working solution." },
  { icon: Beaker, title: "Publish", desc: "Share your findings with the world." },
];

const LabHome = () => {
  const openProblems = problems.filter((p) => p.status === "Open").slice(0, 3);
  const recentPapers = researchPapers.slice(0, 3);

  return (
    <div className="flex flex-col">
      <SEO
        title="Anoneurx Research Lab"
        description="Anoneurx Lab discovers difficult problems in AI, cybersecurity, robotics, and systems — and gives students a place to solve them. Real problems. Open research."
        path="/lab"
        keywords="anoneurx lab, open research, research lab, student research, ai research, cybersecurity research, robotics research, open problems, research problems for students, computer science research, machine learning research"
      />
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/10 via-transparent to-transparent" />
        <div className="mx-auto max-w-7xl py-24 md:py-36 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] font-bold uppercase tracking-widest mb-6">
              <Beaker className="h-3 w-3 mr-1.5" /> Anoneurx Research Lab
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              Real Problems.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300">
                Open Research.
              </span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl mb-10 leading-relaxed">
              Anoneurx Lab discovers difficult problems and gives students a place to solve them.
              Research that matters. Contributions that count.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/lab/problems">
                <Button className="h-12 px-8 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-widest group">
                  Work on a Problem <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/lab/about">
                <Button variant="outline" className="h-12 px-8 rounded-lg border-white/10 hover:bg-white/5 text-white font-bold text-xs uppercase tracking-widest">
                  About the Lab
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is Anoneurx Lab */}
      <section className="py-20 border-y border-white/5 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-bold">What is Anoneurx Lab?</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">Research without walls.</h2>
              <p className="mt-5 text-gray-400 text-sm leading-relaxed">
                We identify open problems across AI, cybersecurity, robotics, and systems — then invite
                university students to work on them with mentorship, infrastructure, and a path to publication.
              </p>
              <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                Every problem is real. Every contribution is tracked. Every solution has the potential to
                become an Anoneurx product or open-source tool.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-5 rounded-xl bg-black/10 backdrop-blur-xl border border-white/5 hover:border-emerald-500/30 transition-all group"
                >
                  <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <step.icon className="h-5 w-5 text-emerald-400" />
                  </div>
                  <h3 className="text-sm font-bold mb-1">{step.title}</h3>
                  <p className="text-gray-500 text-xs">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Problems */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-bold">Problem Board</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">Open Problems</h2>
              <p className="mt-2 text-gray-500 text-sm">Real research problems waiting for student teams.</p>
            </div>
            <Link to="/lab/problems" className="hidden md:block text-white/60 text-sm hover:text-white transition-colors">
              See all →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {openProblems.map((problem, i) => (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link
                  to={`/lab/problems/${problem.id}`}
                  className="block p-6 rounded-xl bg-black/10 backdrop-blur-xl border border-white/5 hover:border-emerald-500/30 transition-all group h-full"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-mono text-emerald-400/80">{problem.code}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      problem.difficulty === "Beginner" ? "bg-green-500/10 text-green-400" :
                      problem.difficulty === "Intermediate" ? "bg-yellow-500/10 text-yellow-400" :
                      problem.difficulty === "Advanced" ? "bg-orange-500/10 text-orange-400" :
                      "bg-red-500/10 text-red-400"
                    }`}>
                      {problem.difficulty}
                    </span>
                  </div>
                  <h3 className="text-base font-bold mb-2 group-hover:text-emerald-400 transition-colors">{problem.title}</h3>
                  <p className="text-gray-500 text-xs mb-4 line-clamp-2">{problem.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {problem.areas.map((area) => (
                      <span key={area} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400">{area}</span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-24 border-y border-white/5 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-bold">Research Domains</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Research Areas</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {researchAreas.map((area, i) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="p-5 rounded-xl bg-black/10 backdrop-blur-xl border border-white/5 hover:border-emerald-500/30 transition-all group text-center"
              >
                <h3 className="text-sm font-bold mb-1 group-hover:text-emerald-400 transition-colors">{area.name}</h3>
                <p className="text-gray-500 text-xs mb-3">{area.problemCount} problems</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Research */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-bold">Latest Research</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">Published & Ongoing</h2>
            </div>
            <Link to="/lab/research" className="hidden md:block text-white/60 text-sm hover:text-white transition-colors">
              See all →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {recentPapers.map((paper, i) => (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="p-6 rounded-xl bg-black/10 backdrop-blur-xl border border-white/5 hover:border-emerald-500/30 transition-all group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    paper.category === "Published" ? "bg-emerald-500/10 text-emerald-400" :
                    paper.category === "Ongoing" ? "bg-blue-500/10 text-blue-400" :
                    paper.category === "Preprint" ? "bg-purple-500/10 text-purple-400" :
                    "bg-gray-500/10 text-gray-400"
                  }`}>
                    {paper.category}
                  </span>
                  <span className="text-[10px] text-gray-500">{paper.area}</span>
                </div>
                <h3 className="text-sm font-bold mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2">{paper.title}</h3>
                <p className="text-gray-500 text-xs mb-3 line-clamp-3">{paper.abstract}</p>
                <div className="text-[10px] text-gray-600">
                  {paper.authors.join(", ")} · {paper.date}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Researchers */}
      <section className="py-24 border-y border-white/5 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-bold">Team</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">Student Researchers</h2>
            </div>
            <Link to="/lab/people" className="hidden md:block text-white/60 text-sm hover:text-white transition-colors">
              See all →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {researchers.map((person, i) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="p-6 rounded-xl bg-black/10 backdrop-blur-xl border border-white/5 hover:border-emerald-500/30 transition-all group text-center"
              >
                <div className="h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="text-sm font-bold mb-1">{person.name}</h3>
                <p className="text-emerald-400/80 text-[10px] font-bold uppercase tracking-wider mb-2">{person.role}</p>
                <div className="flex flex-wrap justify-center gap-1">
                  {person.areas.map((area) => (
                    <span key={area} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400">{area}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-bold">Process</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Choose a Problem", desc: "Browse the Problem Board and find a research problem that matches your skills and interests." },
              { step: "02", title: "Join & Research", desc: "Apply to join, get matched with a team, and start conducting research with mentorship." },
              { step: "03", title: "Build & Publish", desc: "Develop solutions, write papers, and contribute to open-source projects that matter." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-emerald-500/20 mb-4">{item.step}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/10 via-black to-teal-900/10 p-10 lg:p-16 text-center">
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight">
                Ready to solve a <span className="text-emerald-400">real problem?</span>
              </h2>
              <p className="text-gray-400 text-sm mb-8 max-w-xl mx-auto leading-relaxed">
                Join Anoneurx Lab and work on research that matters. Open to students worldwide.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/lab/problems">
                  <Button className="h-12 px-8 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-widest group">
                    Browse Problems <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/lab/apply">
                  <Button variant="outline" className="h-12 px-8 rounded-lg border-emerald-500/20 hover:bg-emerald-500/5 text-white font-bold text-xs uppercase tracking-widest">
                    <BookOpen className="h-4 w-4 mr-2" /> Research Guide
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LabHome;
