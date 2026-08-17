import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowLeft, Copy, Check, Shield } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const CodeBlock = ({ title, code }: { title: string; code: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div className="rounded-lg overflow-hidden border border-white/[0.08] my-4">
      <div className="flex items-center justify-between px-4 py-2 bg-white/[0.04]">
        <span className="text-xs text-muted-foreground">{title}</span>
        <button onClick={handleCopy} className="text-muted-foreground hover:text-foreground transition-colors">
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
      <pre className="p-4 bg-white/[0.02] overflow-x-auto text-sm text-green-300/80 font-mono">{code}</pre>
    </div>
  );
};

const TextBlock = ({ title, content }: { title?: string; content: string }) => (
  <div className="mb-6">
    {title && <h3 className="text-lg font-semibold text-foreground mb-2 mt-4">{title}</h3>}
    <div className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{content}</div>
  </div>
);

const projects: Record<string, any> = {
  "black-wall": {
    name: "Black Wall OS", icon: Shield, color: "from-blue-500/20 to-cyan-500/20", status: "Alpha / 60% Complete",
    tagline: "A Modular, Secure, Modern Operating System Architecture",
    description: "Black Wall OS is an independent research and development project focused on creating a modular, security-first operating system architecture that explores modern OS design principles using safe systems programming methodologies.",
    tabs: [
      {
        value: "intro",
        label: "Introduction",
        sections: [
          {
            title: "Vision and Mission",
            content: "Black Wall OS is an independent research and development project focused on creating a modular, security-first operating system architecture that explores modern OS design principles using safe systems programming methodologies. The project represents an experimental approach to operating system development, combining established architectural patterns with innovative security concepts."
          },
          {
            title: "Why This Project Exists",
            content: "- Explore modern operating system development using Rust's memory-safety guarantees\n- Investigate modular kernel architecture with clear separation of concerns\n- Demonstrate security-first system design from the ground up\n- Provide a research platform for operating system concepts\n- Create a teaching and learning resource for systems engineering"
          },
          {
            title: "Philosophy & Long-Term Vision",
            content: "Modern Secure OS: A focus on creating a system secured by design rather than patched into security.\nDeveloper-First System: Ensuring that server deployment and advanced coding environments are native to the core OS structure.\nBlockchain-Backed Integrity: Integrating cryptographic hashes and ledger systems to protect the recovery models and user identity.\nAI-Integrated Operating System Design: Empowering developers with System Runtime Intelligence (SRI)."
          }
        ]
      },
      {
        value: "architecture",
        label: "Architecture",
        sections: [
          {
            title: "Layered System Structure",
            content: "UI Layer (React + TypeScript)\nService Layer (System Services, Backend APIs)\nKernel Layer (Rust, Memory, Processes)\nHardware Abstraction (Boot, Drivers, HAL)\nBoot Structure (UEFI Bootloader)"
          },
          {
            title: "Modular Kernel Architecture",
            content: "The kernel is designed with strict modularity:\n- Memory Manager: Physical and virtual memory allocation\n- Process Manager: Task scheduling and process lifecycle\n- Interrupt Handler: IDT-based exception and interrupt handling\n- Syscall Interface: System call abstraction layer\n- Driver Model: Hardware abstraction with standardized driver interface"
          },
          {
            title: "Service-Based System Model",
            content: "System functionality is delivered through discrete services:\n- API Server: RESTful service infrastructure\n- Assistant Service: AI-style system assistant\n- Security Service: Permission and integrity management\n- Recovery Service: Blockchain-based recovery coordination"
          }
        ]
      },
      {
        value: "tech-stack",
        label: "Tech Stack",
        sections: [
          {
            title: "Rust (Backend & System Services)",
            content: "- Kernel Development: no_std kernel implementation for x86_64\n- Bootloader: UEFI bootloader written in Rust\n- System Services: Backend microservices architecture\n- Security Modules: Memory-safe security engine implementation"
          },
          {
            title: "React & TypeScript (System UI Architecture)",
            content: "- Frontend Framework: React 18+ with TypeScript\n- State Management: Zustand for centralized state\n- Component Library: Custom modular UI primitives\n- Build System: Vite for fast development and building\n- IPC Communication: Inter-process communication layer"
          }
        ]
      },
      {
        value: "security",
        label: "Security & Blockchain",
        sections: [
          {
            title: "Security-First System Design Principles",
            content: "1. Defense in Depth: Multiple layers of security controls\n2. Least Privilege: Minimal permission requirements for all components\n3. Memory Safety: Rust's ownership model prevents common vulnerabilities\n4. Secure Boot Philosophy: Chain of trust from firmware to application"
          },
          {
            title: "Blockchain-Based Recovery Mode",
            content: "The Blockchain-Based Recovery Mode introduces distributed ledger principles to operating system recovery, creating a tamper-resistant audit trail for system states and recovery operations.\n\n- Immutable State Log: System state changes recorded in append-only log\n- Cryptographic Hashing: Each state linked via cryptographic hashes\n- Distributed Verification: Multiple verification points\n- Anti-Tampering: Any modification detected immediately"
          },
          {
            title: "Secure Rollback Mechanism",
            content: "1. State Snapshots: Periodic system state snapshots\n2. Hash Chain: Cryptographically linked state history\n3. Verification: Rollback only to verified states\n4. Audit Trail: Complete history of system modifications"
          }
        ]
      },
      {
        value: "modes",
        label: "Modes & SRI",
        sections: [
          {
            title: "Server & Developer Mode",
            content: "Designed for Server Environments. Server & Developer Mode provides a performance-optimized, configuration-driven environment for professional deployments:\n- Headless Operation: Full system control without graphical interface\n- Resource Efficiency: Minimal resource footprint\n- Remote Access: Secure remote management capabilities\n- Container Support: Isolation and deployment workflows"
          },
          {
            title: "Assistant Mode (SRI - System Runtime Intelligence)",
            content: "The Assistant Mode provides an AI-style integrated assistant operating at the OS level:\n- Natural Language Interface: Command via text or voice\n- System Context Awareness: Understands system state\n- Proactive Assistance: Anticipates user needs\n- Automation Capabilities: Execute complex system tasks\n\nIt features comprehensive Developer Assistance (Code context, Build assistance) and System Monitoring."
          }
        ]
      }
    ]
  },
};

const ProjectDocs = () => {
  const { projectId } = useParams();
  const project = projects[projectId || ""] || projects["black-wall"];

  return (
    <PageTransition>
      <div className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link to="/docs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Documentation
          </Link>

          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg shadow-black/20`}>
                <project.icon className="w-6 h-6 text-foreground/70" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground font-brand">{project.name}</h1>
                <p className="text-sm text-muted-foreground">{project.tagline}</p>
              </div>
              <Badge className="ml-auto bg-blue-500/15 text-blue-300 border-blue-500/20 text-xs">{project.status}</Badge>
            </div>
            <p className="text-muted-foreground mb-8 max-w-3xl leading-relaxed">{project.description}</p>
          </motion.div>

          {project.tabs ? (
            <Tabs defaultValue={project.tabs[0].value} className="space-y-6">
              <TabsList className="bg-white/[0.04] border border-white/[0.08] p-1 flex-wrap h-auto">
                {project.tabs.map((tab: any) => (
                  <TabsTrigger key={tab.value} value={tab.value} className="text-sm data-[state=active]:bg-white/[0.1] px-4 py-2">
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {project.tabs.map((tab: any) => (
                <TabsContent key={tab.value} value={tab.value}>
                  <Card className="bg-black/40 backdrop-blur-md border-white/5">
                    <CardContent className="p-8">
                      {tab.sections.map((section: any, idx: number) => (
                        <TextBlock key={idx} title={section.title} content={section.content} />
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <div>Failed to load project docs.</div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default ProjectDocs;
