import PageTransition from "@/components/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, Cloud, Container, GitBranch, Copy, Check, Server } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const CodeBlock = ({ title, code }: { title: string; code: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
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

const Deployment = () => {
  return (
    <PageTransition>
      <div className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link to="/docs" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Documentation
          </Link>

          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Badge className="mb-4 bg-white/[0.06] border-white/[0.1] text-white/80">
              <Cloud className="w-3 h-3 mr-1" /> Deployment
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Deployment Guide</h1>
            <p className="text-white/50 mb-10 max-w-2xl">
              Deploy with Docker, CI/CD via GitHub Actions, or manually to your own server.
            </p>
          </motion.div>

          <div className="space-y-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Container className="w-5 h-5 text-white/40" /> Docker Build
              </h2>
              <CodeBlock
                title="bash"
                code={`docker build -t anoneurx-platform .\ndocker run -p 3000:3000 \\\n  -e NODE_ENV=production \\\n  -e MONGODB_URI=your-mongodb-uri \\\n  -e JWT_SECRET=your-secret \\\n  anoneurx-platform`}
              />
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Container className="w-5 h-5 text-white/40" /> Docker Compose
              </h2>
              <CodeBlock
                title="docker-compose.yml"
                code={`version: '3.8'\nservices:\n  app:\n    build: .\n    ports:\n      - '3000:3000'\n    environment:\n      - NODE_ENV=production\n      - MONGODB_URI=mongodb://db:27017/anoneurx\n      - JWT_SECRET=\${JWT_SECRET}\n    depends_on:\n      - db\n    restart: unless-stopped\n  db:\n    image: mongo:7\n    volumes:\n      - mongo-data:/data/db\n    restart: unless-stopped\nvolumes:\n  mongo-data:`}
              />
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-white/40" /> CI/CD with GitHub Actions
              </h2>
              <CodeBlock
                title=".github/workflows/deploy.yml"
                code={`name: Deploy\non:\n  push:\n    branches: [main]\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n      - run: npm ci\n      - run: npm run build\n      - run: npm test\n      - name: Deploy to server\n        run: |\n          docker build -t anoneurx-platform .\n          docker push your-registry/anoneurx-platform`}
              />
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Server className="w-5 h-5 text-white/40" /> Server Requirements
              </h2>
              <Card className="bg-white/[0.03] border-white/[0.08]">
                <CardContent className="p-6 space-y-3 text-sm text-white/60">
                  <p><span className="text-white/80 font-medium">Small:</span> 2 CPU cores, 4GB RAM, 20GB disk</p>
                  <p><span className="text-white/80 font-medium">Medium:</span> 4 CPU cores, 8GB RAM, 50GB disk</p>
                  <p><span className="text-white/80 font-medium">Production:</span> 8+ CPU cores, 16GB+ RAM, 100GB+ SSD</p>
                  <p className="pt-2 text-white/40">Kubernetes Helm charts are available in the /deploy/k8s directory.</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Deployment;
