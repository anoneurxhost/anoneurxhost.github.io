import { useState } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Layers, Server, Monitor, Database, Shield, Globe, Copy, Check } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const CodeBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div className="relative">
      <button onClick={handleCopy} className="absolute top-3 right-3 text-white/30 hover:text-white/60 transition-colors">
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
      <pre className="bg-black/40 backdrop-blur border border-white/10 rounded-lg p-4 text-sm font-mono text-green-300/80 overflow-x-auto whitespace-pre">{code}</pre>
    </div>
  );
};

const layers = [
  { name: "Presentation Layer", icon: Monitor, color: "text-blue-400", items: ["React Pages (Lazy Loaded)", "Reusable UI Components (shadcn/ui)", "Framer Motion Animations", "Responsive Tailwind CSS Layouts"] },
  { name: "State & Context Layer", icon: Globe, color: "text-purple-400", items: ["AuthContext — Authentication state", "UserContext — User profile data", "NotificationContext — Real-time alerts", "NavigationContext — Route management"] },
  { name: "Service Layer", icon: Server, color: "text-green-400", items: ["API Service (Axios/Fetch)", "Auth API — Login, Register, Token Refresh", "Role API — RBAC Management", "Certificate Service — PDF Generation"] },
  { name: "Backend Layer", icon: Layers, color: "text-amber-400", items: ["Express.js REST API", "Route → Middleware → Controller Pattern", "JWT Authentication + RBAC", "Rate Limiting & Input Validation"] },
  { name: "Data Layer", icon: Database, color: "text-cyan-400", items: ["MongoDB with Mongoose ODM", "User, Project, Application Models", "Role & Permission Models", "File & Content Models"] },
  { name: "Security Layer", icon: Shield, color: "text-red-400", items: ["Helmet.js — HTTP Security Headers", "CORS Configuration", "Mongo Sanitize — NoSQL Injection Prevention", "Rate Limiting — DDoS Protection"] },
];

const Architecture = () => (
  <PageTransition>
    <div className="min-h-screen">
      <section className="relative py-24 sm:py-32 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/3 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <Link to="/contributions" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Contributions
          </Link>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
            <Badge className="mb-6 bg-white/[0.06] border-white/[0.1] text-white/80">
              <Layers className="w-3 h-3 mr-1" /> Architecture
            </Badge>
            <h1 className="text-white mb-4">Architecture Overview</h1>
            <p className="text-lg text-white/60 max-w-2xl">
              Understand the system design, layers, and how components interact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* System Diagram */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-white mb-8">System Architecture</h2>
          <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08]">
            <CardContent className="p-6">
              <CodeBlock code={`┌─────────────────────────────────────────────────┐
│                   Client (React)                │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │
│  │  Pages   │ │Components│ │    Contexts       │ │
│  │ (Lazy)   │ │  (UI)    │ │ (Auth/Notif/Nav)  │ │
│  └────┬─────┘ └──────────┘ └────────┬─────────┘ │
│       │                              │           │
│  ┌────▼──────────────────────────────▼─────────┐ │
│  │          Services / API Layer               │ │
│  └────────────────┬────────────────────────────┘ │
└───────────────────┼──────────────────────────────┘
                    │ HTTP / REST
┌───────────────────▼──────────────────────────────┐
│              Express.js Server                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │
│  │  Routes  │ │Middleware│ │   Controllers     │ │
│  │          │ │Auth/RBAC │ │                   │ │
│  └────┬─────┘ └──────────┘ └────────┬─────────┘ │
│       │                              │           │
│  ┌────▼──────────────────────────────▼─────────┐ │
│  │           Models (Mongoose/MongoDB)         │ │
│  └─────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────┘`} />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Layers */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-white mb-8">Application Layers</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {layers.map((layer, i) => (
              <motion.div key={layer.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08, duration: 0.4 }}>
                <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] h-full">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center">
                        <layer.icon className={`w-5 h-5 ${layer.color}`} />
                      </div>
                      <h3 className="text-white">{layer.name}</h3>
                    </div>
                    <ul className="space-y-2">
                      {layer.items.map((item, j) => (
                        <li key={j} className="text-xs text-white/50 flex items-start gap-2">
                          <span className="text-white/20 mt-1">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Structure */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-white mb-8">Project Structure</h2>
          <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08]">
            <CardContent className="p-6">
              <CodeBlock code={`src/
├── pages/              # Page components (lazy loaded)
├── components/         # Reusable UI components
│   └── ui/             # shadcn/ui primitives
├── contexts/           # React context providers
├── hooks/              # Custom React hooks
├── services/           # API service layer
├── layouts/            # Layout wrappers
├── data/               # Static JSON data
├── utils/              # Utility functions
└── types/              # TypeScript type definitions

server/
├── routes/             # API route definitions
├── controllers/        # Request handlers
├── middleware/          # Auth, validation, rate limiting
├── models/             # Mongoose/MongoDB models
├── config/             # Database, logger, multer config
├── seeds/              # Database seed scripts
└── validators/         # Input validation schemas`} />
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <Link to="/contributions">
            <Button variant="outline" className="gap-2 border-white/[0.1] text-white/70 hover:bg-white/[0.06]">
              <ArrowLeft className="w-3 h-3" /> Back to Contributions
            </Button>
          </Link>
        </div>
      </section>
    </div>
  </PageTransition>
);

export default Architecture;
