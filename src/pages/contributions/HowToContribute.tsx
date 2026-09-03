import { useState } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  GitBranch, GitPullRequest, Code, CheckCircle, BookOpen,
  ArrowLeft, ArrowRight, Copy, Check, Terminal, FileCode, Eye, Zap, Monitor,
  MessageSquare, Shield, Lightbulb, Rocket
} from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const steps = [
  {
    step: "01", title: "Fork & Clone", icon: GitBranch,
    description: "Fork the repository on GitHub, then clone it to your local machine. Install dependencies and set up your environment.",
    code: `git clone https://github.com/your-username/anoneurx.git\ncd anoneurx\nnpm install`,
    color: "from-blue-500 to-cyan-500",
  },
  {
    step: "02", title: "Create a Branch", icon: GitBranch,
    description: "Create a feature branch from the main branch. Use descriptive, prefixed names for easy identification.",
    code: `git checkout -b feature/your-feature-name\n# or\ngit checkout -b fix/bug-description`,
    color: "from-purple-500 to-pink-500",
  },
  {
    step: "03", title: "Make Changes", icon: Code,
    description: "Write clean, tested code following our conventions. Run the dev server and test suite before committing.",
    code: `# Run development server\nnpm run dev\n\n# Run tests\nnpm test\n\n# Lint your code\nnpm run lint`,
    color: "from-green-500 to-emerald-500",
  },
  {
    step: "04", title: "Submit PR", icon: GitPullRequest,
    description: "Push your branch and open a Pull Request with a clear title, description, and linked issue numbers.",
    code: `git add .\ngit commit -m "feat: add new feature description"\ngit push origin feature/your-feature-name`,
    color: "from-amber-500 to-orange-500",
  },
];

const codeStandards = [
  { title: "TypeScript", description: "Use strict types. Avoid `any`. Define interfaces for all data structures.", icon: FileCode, color: "text-blue-400" },
  { title: "Components", description: "Small, focused components. Use composition. Max 200 lines per file.", icon: Code, color: "text-green-400" },
  { title: "Naming", description: "PascalCase for components, camelCase for functions, UPPER_CASE for constants.", icon: Terminal, color: "text-purple-400" },
  { title: "Testing", description: "Write unit tests for utilities and integration tests for features.", icon: CheckCircle, color: "text-amber-400" },
  { title: "Accessibility", description: "Use semantic HTML, ARIA labels, keyboard navigation support.", icon: Eye, color: "text-cyan-400" },
  { title: "Performance", description: "Lazy load routes. Memoize expensive computations. Optimize re-renders.", icon: Zap, color: "text-rose-400" },
];

const devSetup = [
  { tool: "VS Code", description: "Recommended IDE with TypeScript and React support", extensions: ["ESLint", "Prettier", "Tailwind CSS IntelliSense", "GitLens"], icon: Monitor },
  { tool: "Browser DevTools", description: "React Developer Tools and Redux DevTools for debugging", extensions: ["React DevTools", "Network Inspector"], icon: Eye },
  { tool: "Testing", description: "Jest for unit tests, Testing Library for component tests", extensions: ["Jest Runner", "Coverage Gutters"], icon: CheckCircle },
];

const issueLabels = [
  { label: "good first issue", color: "bg-green-500/20 text-green-300 border-green-500/30", description: "Great for newcomers", icon: Lightbulb },
  { label: "bug", color: "bg-red-500/20 text-red-300 border-red-500/30", description: "Something isn't working", icon: Shield },
  { label: "enhancement", color: "bg-blue-500/20 text-blue-300 border-blue-500/30", description: "New feature or improvement", icon: Rocket },
  { label: "documentation", color: "bg-purple-500/20 text-purple-300 border-purple-500/30", description: "Docs improvement", icon: BookOpen },
  { label: "help wanted", color: "bg-amber-500/20 text-amber-300 border-amber-500/30", description: "Extra attention needed", icon: MessageSquare },
  { label: "security", color: "bg-rose-500/20 text-rose-300 border-rose-500/30", description: "Security related", icon: Shield },
];

const CodeBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div className="relative">
      <button onClick={handleCopy} className="absolute top-3 right-3 p-1.5 rounded-md bg-white/5 text-white/30 hover:text-white/60 hover:bg-white/10 transition-all">
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
      <pre className="bg-black/50 backdrop-blur border border-white/10 rounded-xl p-4 text-sm font-mono text-green-300/80 overflow-x-auto">{code}</pre>
    </div>
  );
};

const HowToContribute = () => (
  <PageTransition>
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 sm:py-32 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <Link to="/contributions" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Contributions
          </Link>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
            <Badge className="mb-6 bg-white/[0.06] border-white/[0.1] text-white/80">
              <BookOpen className="w-3 h-3 mr-1" /> Contribution Guide
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">How to Contribute</h1>
            <p className="text-lg text-white/60 max-w-2xl">
              Follow these steps to make your first contribution to Anoneurx. Every line of code matters.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Visual Step Flow */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="relative">
            {/* Vertical connecting line */}
            <div className="absolute left-[27px] top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-amber-500/30 hidden md:block" />

            <div className="space-y-8">
              {steps.map((step, i) => (
                <motion.div key={step.step} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.12, duration: 0.4 }}>
                  <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] overflow-hidden hover:bg-white/[0.05] transition-all duration-300">
                    <div className={`h-1 bg-gradient-to-r ${step.color}`} />
                    <CardContent className="p-6 md:p-8">
                      <div className="flex items-start gap-5">
                        {/* Step Number Circle */}
                        <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shrink-0 shadow-lg`}>
                          <step.icon className="w-6 h-6 text-white" />
                          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-black/80 border border-white/20 flex items-center justify-center">
                            <span className="text-[10px] font-bold text-white">{step.step}</span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0 space-y-3">
                          <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                          <p className="text-base text-white/50">{step.description}</p>
                          <CodeBlock code={step.code} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Code Standards */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-semibold text-white mb-2">Code Standards</h2>
            <p className="text-base text-white/40 mb-8">Follow these conventions to keep the codebase consistent and maintainable.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {codeStandards.map((s, i) => (
              <motion.div key={s.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08, duration: 0.4 }}>
                <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] h-full hover:bg-white/[0.06] transition-all duration-300">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center shrink-0">
                        <s.icon className={`w-5 h-5 ${s.color}`} />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-white mb-1">{s.title}</h3>
                        <p className="text-sm text-white/50">{s.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dev Environment */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="flex items-center gap-3 mb-8">
              <Monitor className="w-5 h-5 text-white/40" />
              <h2 className="text-3xl font-semibold text-white">Development Environment</h2>
            </div>
          </motion.div>
          <div className="space-y-4">
            {devSetup.map((item, i) => (
              <motion.div key={item.tool} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1, duration: 0.4 }}>
                <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] hover:bg-white/[0.05] transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-white/50" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-white mb-1">{item.tool}</h3>
                        <p className="text-sm text-white/50 mb-3">{item.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {item.extensions.map(ext => (
                            <Badge key={ext} className="bg-white/[0.06] border-white/[0.1] text-white/60 text-xs">{ext}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Issue Labels */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-semibold text-white mb-2">Issue Labels</h2>
            <p className="text-base text-white/40 mb-8">Look for these labels on GitHub to find issues matching your skill level.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {issueLabels.map((item, i) => (
              <motion.div key={item.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.06 }}>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-all">
                  <item.icon className="w-4 h-4 text-white/30 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <Badge className={`${item.color} text-xs mb-1`}>{item.label}</Badge>
                    <p className="text-xs text-white/40">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PR Template */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-semibold text-white mb-8">Pull Request Template</h2>
          </motion.div>
          <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08]">
            <CardContent className="p-6">
              <CodeBlock code={`## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing done

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated`} />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Bottom Navigation */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Link to="/contributions">
              <Button variant="outline" className="gap-2 border-white/[0.1] text-white/70 hover:bg-white/[0.06]">
                <ArrowLeft className="w-3 h-3" /> Back to Contributions
              </Button>
            </Link>
            <Link to="/contributions/architecture">
              <Button variant="outline" className="gap-2 border-white/[0.1] text-white/70 hover:bg-white/[0.06]">
                Architecture Overview <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  </PageTransition>
);

export default HowToContribute;
