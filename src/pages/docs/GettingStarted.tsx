import PageTransition from "@/components/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Terminal, FolderTree, CheckCircle, Copy, Check, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const CodeBlock = ({ title, code }: { title: string; code: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="rounded-lg overflow-hidden border border-white/[0.08]">
      <div className="flex items-center justify-between px-4 py-2 bg-white/[0.04]">
        <span className="text-xs text-white/40">{title}</span>
        <button onClick={handleCopy} className="text-white/30 hover:text-white/60 transition-colors">
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
      <pre className="p-4 bg-white/[0.02] overflow-x-auto text-sm text-white/70 font-mono">{code}</pre>
    </div>
  );
};

const GettingStarted = () => {
  return (
    <PageTransition>
      <div className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link to="/docs" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Documentation
          </Link>

          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Badge className="mb-4 bg-white/[0.06] border-white/[0.1] text-white/80">
              <BookOpen className="w-3 h-3 mr-1" /> Getting Started
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Getting Started</h1>
            <p className="text-white/50 mb-10 max-w-2xl">
              Set up your development environment and start building with the Anoneurx Platform in minutes.
            </p>
          </motion.div>

          <div className="space-y-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-white/40" /> Prerequisites
              </h2>
              <Card className="bg-white/[0.03] border-white/[0.08]">
                <CardContent className="p-6">
                  <ul className="space-y-3 text-white/60">
                    <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-white/30 mt-0.5 shrink-0" /> Node.js 18+ (recommended: 20 LTS)</li>
                    <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-white/30 mt-0.5 shrink-0" /> npm, bun, or pnpm package manager</li>
                    <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-white/30 mt-0.5 shrink-0" /> Git version control</li>
                    <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-white/30 mt-0.5 shrink-0" /> MongoDB 7+ (local or Atlas)</li>
                    <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-white/30 mt-0.5 shrink-0" /> VS Code with ESLint & Prettier extensions</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-white/40" /> Installation
              </h2>
              <CodeBlock
                title="bash"
                code={`git clone https://github.com/anoneurx/platform.git\ncd platform\nnpm install\nnpm run dev`}
              />
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-white/40" /> Environment Setup
              </h2>
              <CodeBlock
                title="bash"
                code={`cp .env.example .env\n\n# Required variables:\n# VITE_API_URL=http://localhost:5000\n# MONGODB_URI=mongodb://localhost:27017/anoneurx\n# JWT_SECRET=your-secret-key\n# JWT_EXPIRE=7d\n\nnpm run dev`}
              />
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FolderTree className="w-5 h-5 text-white/40" /> Project Structure
              </h2>
              <CodeBlock
                title="directory"
                code={`src/pages/        — Page components (lazy loaded)\nsrc/components/   — Reusable UI components\nsrc/contexts/     — React context providers\nsrc/hooks/        — Custom hooks\nsrc/services/     — API service layer\nsrc/layouts/      — Layout wrappers\nserver/           — Backend Express server\nserver/routes/    — API route definitions\nserver/models/    — Mongoose models\nserver/middleware/ — Auth, validation, rate limiting`}
              />
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-xl font-bold text-white mb-6">FAQ</h2>
              <div className="space-y-4">
                {[
                  { q: "What Node.js version is required?", a: "Node.js 18 or higher. We recommend using the latest LTS version (20.x)." },
                  { q: "Can I use yarn instead of npm?", a: "Yes, yarn works fine. We also support bun and pnpm." },
                  { q: "How do I connect to a remote database?", a: "Set MONGODB_URI in your .env file to your MongoDB Atlas connection string." },
                ].map((faq, i) => (
                  <Card key={i} className="bg-white/[0.03] border-white/[0.08]">
                    <CardContent className="p-5">
                      <p className="font-medium text-white mb-1">{faq.q}</p>
                      <p className="text-sm text-white/50">{faq.a}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default GettingStarted;
