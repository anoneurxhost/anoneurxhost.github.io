import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Lock, AlertTriangle, Clock, Mail, Award, CheckCircle, Eye } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const policies = [
  { title: "Reporting Vulnerabilities", icon: AlertTriangle, color: "text-red-400", content: "Do NOT open public issues for security vulnerabilities. Email security@anoneurx.com with a detailed description including steps to reproduce, affected components, and potential impact." },
  { title: "Response Timeline", icon: Clock, color: "text-amber-400", content: "We acknowledge reports within 24 hours, provide an initial assessment within 72 hours, and aim to release patches for critical vulnerabilities within 7 days." },
  { title: "Responsible Disclosure", icon: Eye, color: "text-blue-400", content: "We ask reporters to give us 90 days to develop and release a fix before public disclosure. We will credit reporters in our security advisories." },
  { title: "Bug Bounty Program", icon: Award, color: "text-green-400", content: "Critical vulnerabilities are eligible for monetary rewards. Severity is assessed using CVSS scoring. Contact security@anoneurx.com for current bounty ranges." },
];

const securityMeasures = [
  { measure: "Authentication", description: "JWT tokens with configurable expiry, refresh token rotation, and bcrypt password hashing" },
  { measure: "Authorization", description: "Role-based access control (RBAC) with granular permissions checked at middleware level" },
  { measure: "Input Validation", description: "Server-side validation on all endpoints using Zod schemas and express-validator" },
  { measure: "SQL/NoSQL Injection", description: "Parameterized queries and express-mongo-sanitize to prevent injection attacks" },
  { measure: "XSS Prevention", description: "Content Security Policy headers via Helmet.js, output encoding, and sanitized user input" },
  { measure: "Rate Limiting", description: "Per-IP and per-user rate limits on all API endpoints to prevent abuse and DDoS" },
  { measure: "CORS", description: "Strict origin whitelisting with configurable allowed methods and headers" },
  { measure: "HTTPS", description: "TLS encryption enforced in production with HSTS headers" },
];

const severityLevels = [
  { level: "Critical", color: "bg-red-500/20 text-red-300 border-red-500/30", bounty: "$500 - $2,000", examples: "Remote code execution, authentication bypass, data breach" },
  { level: "High", color: "bg-orange-500/20 text-orange-300 border-orange-500/30", bounty: "$200 - $500", examples: "Privilege escalation, stored XSS, SSRF" },
  { level: "Medium", color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30", bounty: "$50 - $200", examples: "CSRF, reflected XSS, information disclosure" },
  { level: "Low", color: "bg-blue-500/20 text-blue-300 border-blue-500/30", bounty: "Recognition", examples: "Open redirect, clickjacking, minor info leak" },
];

const SecurityPolicy = () => (
  <PageTransition>
    <div className="min-h-screen">
      <section className="relative py-24 sm:py-32 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-red-500/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <Link to="/contributions" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Contributions
          </Link>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
            <Badge className="mb-6 bg-red-500/10 border-red-500/20 text-red-300">
              <Shield className="w-3 h-3 mr-1" /> Security
            </Badge>
            <h1 className="text-white mb-4">Security Policy</h1>
            <p className="text-lg text-white/60 max-w-2xl">
              How we handle security vulnerabilities and protect our users.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Policies */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl space-y-4">
          {policies.map((p, i) => (
            <motion.div key={p.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1, duration: 0.4 }}>
              <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08]">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                    <p.icon className={`w-5 h-5 ${p.color}`} />
                  </div>
                  <div>
                    <h3 className="text-white mb-2">{p.title}</h3>
                    <p className="text-sm text-white/50">{p.content}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Severity & Bounty */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-white mb-8">Severity Levels & Bounty</h2>
          <div className="space-y-3">
            {severityLevels.map((s, i) => (
              <motion.div key={s.level} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1, duration: 0.4 }}>
                <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08]">
                  <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                    <Badge className={`${s.color} text-xs shrink-0 w-fit`}>{s.level}</Badge>
                    <div className="flex-1">
                      <p className="text-sm text-white/50">{s.examples}</p>
                    </div>
                    <span className="text-sm text-white/70 font-medium shrink-0">{s.bounty}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Measures */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <Lock className="w-5 h-5 text-white/40" />
            <h2 className="text-white">Security Measures</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {securityMeasures.map((m, i) => (
              <motion.div key={m.measure} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.06, duration: 0.4 }}>
                <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] h-full">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-400/60" />
                      <h3 className="text-white text-sm">{m.measure}</h3>
                    </div>
                    <p className="text-xs text-white/50">{m.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] p-8">
            <Mail className="w-8 h-8 text-white/30 mx-auto mb-4" />
            <h2 className="text-white mb-3">Report a Vulnerability</h2>
            <p className="text-white/50 mb-6">Found a security issue? Contact us privately.</p>
            <a href="mailto:security@anoneurx.com">
              <Button className="gap-2 bg-white/[0.06] backdrop-blur border border-white/[0.1] text-white hover:bg-white/[0.1]">
                <Mail className="w-4 h-4" /> security@anoneurx.com
              </Button>
            </a>
          </Card>
        </div>
      </section>
    </div>
  </PageTransition>
);

export default SecurityPolicy;
