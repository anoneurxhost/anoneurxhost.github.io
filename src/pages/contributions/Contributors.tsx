import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Star, ExternalLink, GitPullRequest, Code, ArrowRight, ArrowLeft, Bug, BookOpen, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

type ContributionType = "code" | "docs" | "security" | "bugs" | "performance";

const contributionConfig: Record<ContributionType, { label: string; color: string; icon: typeof Code }> = {
  code: { label: "Code", color: "bg-blue-500/20 text-blue-300 border-blue-500/30", icon: Code },
  docs: { label: "Documentation", color: "bg-purple-500/20 text-purple-300 border-purple-500/30", icon: BookOpen },
  security: { label: "Security", color: "bg-red-500/20 text-red-300 border-red-500/30", icon: Shield },
  bugs: { label: "Bug Fixes", color: "bg-amber-500/20 text-amber-300 border-amber-500/30", icon: Bug },
  performance: { label: "Performance", color: "bg-green-500/20 text-green-300 border-green-500/30", icon: Zap },
};

const contributors: {
  username: string; name: string; role: string; contributions: number;
  repos: string[]; specialties: string[]; bio: string; types: ContributionType[];
}[] = [
  { username: "sarahchen", name: "Sarah Chen", role: "Core Maintainer", contributions: 342, repos: ["platform", "ai-engine"], specialties: ["React", "TypeScript"], bio: "Full-stack developer focused on AI integration and platform architecture.", types: ["code", "performance"] },
  { username: "alexkumar", name: "Alex Kumar", role: "Module Lead", contributions: 287, repos: ["arcadeum", "platform"], specialties: ["Node.js", "MongoDB"], bio: "Backend specialist building scalable distributed systems.", types: ["code", "security"] },
  { username: "mariasantos", name: "Maria Santos", role: "Documentation", contributions: 234, repos: ["docs", "platform"], specialties: ["Technical Writing", "API Design"], bio: "Making complex systems understandable through clear documentation.", types: ["docs"] },
  { username: "jameswilson", name: "James Wilson", role: "Security Lead", contributions: 198, repos: ["platform", "robotics-sdk"], specialties: ["Security", "DevOps"], bio: "Keeping the platform secure and infrastructure resilient.", types: ["security", "code"] },
  { username: "yukitanaka", name: "Yuki Tanaka", role: "QA Engineer", contributions: 176, repos: ["platform", "arcadeum"], specialties: ["Testing", "CI/CD"], bio: "Quality advocate ensuring every release meets high standards.", types: ["bugs", "code"] },
  { username: "omarhassan", name: "Omar Hassan", role: "DevOps Lead", contributions: 154, repos: ["infra", "platform"], specialties: ["Docker", "Kubernetes"], bio: "Orchestrating cloud infrastructure and deployment pipelines.", types: ["code", "performance"] },
  { username: "lisapark", name: "Lisa Park", role: "Frontend Lead", contributions: 143, repos: ["platform", "ui-kit"], specialties: ["React", "Tailwind CSS"], bio: "Crafting beautiful and accessible user interfaces.", types: ["code", "performance"] },
  { username: "rajpatel", name: "Raj Patel", role: "ML Engineer", contributions: 128, repos: ["ai-engine", "robotics-sdk"], specialties: ["Python", "TensorFlow"], bio: "Building intelligent systems that learn and adapt.", types: ["code"] },
  { username: "emmadavis", name: "Emma Davis", role: "Mobile Lead", contributions: 112, repos: ["mobile-sdk", "platform"], specialties: ["React Native", "Swift"], bio: "Bringing the platform to mobile devices worldwide.", types: ["code", "bugs"] },
  { username: "carlosrivera", name: "Carlos Rivera", role: "Data Engineer", contributions: 98, repos: ["data-pipeline", "ai-engine"], specialties: ["Spark", "Python"], bio: "Processing and analyzing data at scale.", types: ["code", "performance"] },
  { username: "annakim", name: "Anna Kim", role: "UX Designer", contributions: 87, repos: ["ui-kit", "docs"], specialties: ["Figma", "Design Systems"], bio: "Designing intuitive experiences backed by research.", types: ["docs", "code"] },
  { username: "michaelbrown", name: "Michael Brown", role: "Blockchain Dev", contributions: 76, repos: ["blockchain", "platform"], specialties: ["Solidity", "Web3"], bio: "Building decentralized solutions for the future.", types: ["code", "security"] },
];

const ContributorsPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative py-24 sm:py-32 px-4">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto max-w-5xl relative z-10">
            <Link to="/contributions" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Contributions
            </Link>
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }} className="text-center">
              <Badge className="mb-6 bg-white/[0.06] border-white/[0.1] text-white/80">
                <Users className="w-3 h-3 mr-1" /> Community
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Contributors</h1>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                Meet the people who build, maintain, and improve the Anoneurx platform every day.
              </p>
            </motion.div>

            {/* Summary Stats */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }} className="mt-10 grid grid-cols-3 gap-4 max-w-lg mx-auto">
              {[
                { label: "Contributors", value: "1,800+", icon: Users },
                { label: "Total PRs", value: "2,847", icon: GitPullRequest },
                { label: "Repositories", value: "12", icon: Code },
              ].map(s => (
                <Card key={s.label} className="bg-white/[0.03] border-white/[0.08] text-center">
                  <CardContent className="p-4">
                    <s.icon className="w-4 h-4 text-white/30 mx-auto mb-1" />
                    <p className="text-lg font-bold text-white">{s.value}</p>
                    <p className="text-xs text-white/40">{s.label}</p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contributors Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {contributors.map((c, i) => (
                <motion.div key={c.username} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.05, duration: 0.4 }}>
                  <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] hover:bg-white/[0.06] transition-all duration-300 group h-full">
                    <CardContent className="p-6">
                      {/* Header with Avatar */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative">
                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=1a1a2e&color=fff&size=64&bold=true`}
                            alt={c.name}
                            className="w-14 h-14 rounded-2xl border-2 border-white/[0.1] group-hover:border-white/[0.2] transition-colors"
                          />
                          {i < 3 && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                              <Star className="w-3 h-3 text-amber-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-white truncate">{c.name}</h3>
                          <a href={`https://github.com/${c.username}`} target="_blank" rel="noopener noreferrer" className="text-xs text-white/40 hover:text-white/70 transition-colors flex items-center gap-1">
                            @{c.username} <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                          <Badge className="mt-1.5 bg-white/[0.06] border-white/[0.1] text-white/60 text-xs">{c.role}</Badge>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-sm text-white/50 mb-4 line-clamp-2">{c.bio}</p>

                      {/* Contribution Type Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {c.types.map(t => {
                          const conf = contributionConfig[t];
                          return (
                            <Badge key={t} className={`${conf.color} text-[10px] gap-1`}>
                              <conf.icon className="w-2.5 h-2.5" /> {conf.label}
                            </Badge>
                          );
                        })}
                      </div>

                      {/* Stats & Repos */}
                      <div className="flex items-center justify-between text-xs text-white/30 pt-3 border-t border-white/[0.06]">
                        <span className="flex items-center gap-1"><GitPullRequest className="w-3 h-3" /> {c.contributions} contributions</span>
                        <div className="flex gap-2">
                          {c.repos.slice(0, 2).map(r => (
                            <span key={r} className="flex items-center gap-1"><Code className="w-2.5 h-2.5" /> {r}</span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link to="/contributions">
                <Button variant="outline" className="gap-2 border-white/[0.1] text-white/70 hover:bg-white/[0.06]">
                  Back to Contribution Guide <ArrowRight className="w-3 h-3" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default ContributorsPage;
