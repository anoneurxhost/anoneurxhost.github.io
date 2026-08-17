import PageTransition from "@/components/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, Code, Lock, Users, FolderKanban, Copy, Check } from "lucide-react";
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

const endpoints = [
  {
    category: "Authentication",
    icon: Lock,
    routes: [
      { method: "POST", path: "/api/auth/login", desc: "User login (returns JWT)" },
      { method: "POST", path: "/api/auth/register", desc: "New user registration" },
      { method: "POST", path: "/api/auth/refresh", desc: "Refresh JWT token" },
      { method: "POST", path: "/api/auth/forgot-password", desc: "Request password reset" },
      { method: "POST", path: "/api/auth/reset-password", desc: "Reset with token" },
    ],
  },
  {
    category: "Users",
    icon: Users,
    routes: [
      { method: "GET", path: "/api/users/me", desc: "Current user profile" },
      { method: "PUT", path: "/api/users/me", desc: "Update profile" },
      { method: "GET", path: "/api/users", desc: "List all users (admin)" },
      { method: "DELETE", path: "/api/users/:id", desc: "Delete user (admin)" },
    ],
  },
  {
    category: "Projects",
    icon: FolderKanban,
    routes: [
      { method: "GET", path: "/api/projects", desc: "List projects" },
      { method: "POST", path: "/api/projects", desc: "Create project" },
      { method: "GET", path: "/api/projects/:id", desc: "Get project details" },
      { method: "PUT", path: "/api/projects/:id", desc: "Update project" },
      { method: "DELETE", path: "/api/projects/:id", desc: "Delete project" },
    ],
  },
];

const methodColors: Record<string, string> = {
  GET: "bg-green-500/20 text-green-400 border-green-500/30",
  POST: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  PUT: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  DELETE: "bg-red-500/20 text-red-400 border-red-500/30",
  PATCH: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

const ApiReference = () => {
  return (
    <PageTransition>
      <div className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link to="/docs" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Documentation
          </Link>

          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Badge className="mb-4 bg-white/[0.06] border-white/[0.1] text-white/80">
              <Code className="w-3 h-3 mr-1" /> API Reference
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">API Reference</h1>
            <p className="text-white/50 mb-10 max-w-2xl">
              Complete REST API documentation. All endpoints are prefixed with <code className="text-white/70 bg-white/[0.06] px-1.5 py-0.5 rounded">/api</code> and require authentication unless noted.
            </p>
          </motion.div>

          <div className="space-y-6 mb-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-xl font-bold text-white mb-4">Authentication Example</h2>
              <CodeBlock
                title="typescript"
                code={`const response = await fetch('/api/auth/login', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ email, password })\n});\nconst { token, user } = await response.json();\n\n// Use token for subsequent requests\nfetch('/api/users/me', {\n  headers: { 'Authorization': \`Bearer \${token}\` }\n});`}
              />
            </motion.div>
          </div>

          <div className="space-y-8">
            {endpoints.map((group, gi) => (
              <motion.div key={group.category} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: gi * 0.1 }}>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <group.icon className="w-5 h-5 text-white/40" /> {group.category} Endpoints
                </h2>
                <Card className="bg-white/[0.03] border-white/[0.08]">
                  <CardContent className="p-0 divide-y divide-white/[0.06]">
                    {group.routes.map((route, i) => (
                      <div key={i} className="flex items-center gap-3 px-5 py-3">
                        <Badge className={`${methodColors[route.method]} text-xs font-mono min-w-[52px] justify-center`}>
                          {route.method}
                        </Badge>
                        <code className="text-sm text-white/70 font-mono">{route.path}</code>
                        <span className="text-xs text-white/30 ml-auto hidden sm:block">{route.desc}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-12">
            <h2 className="text-xl font-bold text-white mb-4">Rate Limits</h2>
            <Card className="bg-white/[0.03] border-white/[0.08]">
              <CardContent className="p-6 space-y-2 text-sm text-white/60">
                <p>Unauthenticated: <span className="text-white/80">100 requests / 15 minutes</span></p>
                <p>Authenticated: <span className="text-white/80">1,000 requests / 15 minutes</span></p>
                <p>Admin: <span className="text-white/80">5,000 requests / 15 minutes</span></p>
                <p>File Upload: <span className="text-white/80">20 requests / hour</span></p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ApiReference;
