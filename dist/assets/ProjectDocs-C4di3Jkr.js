import{p as o,j as e,P as c,L as l,m as d,B as m,ar as p,as as u,at as h,au as y,C as g,a as v,g as f}from"./index-KDcZOitD.js";import{A as x}from"./arrow-left-ohdjSoDf.js";const S={hidden:{opacity:0,y:20},visible:{opacity:1,y:0}},b=({title:n,content:t})=>e.jsxs("div",{className:"mb-6",children:[n&&e.jsx("h3",{className:"text-lg font-semibold text-foreground mb-2 mt-4",children:n}),e.jsx("div",{className:"text-sm text-muted-foreground whitespace-pre-line leading-relaxed",children:t})]}),a={"black-wall":{name:"Black Wall OS",icon:f,color:"from-blue-500/20 to-cyan-500/20",status:"Alpha / 60% Complete",tagline:"A Modular, Secure, Modern Operating System Architecture",description:"Black Wall OS is an independent research and development project focused on creating a modular, security-first operating system architecture that explores modern OS design principles using safe systems programming methodologies.",tabs:[{value:"intro",label:"Introduction",sections:[{title:"Vision and Mission",content:"Black Wall OS is an independent research and development project focused on creating a modular, security-first operating system architecture that explores modern OS design principles using safe systems programming methodologies. The project represents an experimental approach to operating system development, combining established architectural patterns with innovative security concepts."},{title:"Why This Project Exists",content:`- Explore modern operating system development using Rust's memory-safety guarantees
- Investigate modular kernel architecture with clear separation of concerns
- Demonstrate security-first system design from the ground up
- Provide a research platform for operating system concepts
- Create a teaching and learning resource for systems engineering`},{title:"Philosophy & Long-Term Vision",content:`Modern Secure OS: A focus on creating a system secured by design rather than patched into security.
Developer-First System: Ensuring that server deployment and advanced coding environments are native to the core OS structure.
Blockchain-Backed Integrity: Integrating cryptographic hashes and ledger systems to protect the recovery models and user identity.
AI-Integrated Operating System Design: Empowering developers with System Runtime Intelligence (SRI).`}]},{value:"architecture",label:"Architecture",sections:[{title:"Layered System Structure",content:`UI Layer (React + TypeScript)
Service Layer (System Services, Backend APIs)
Kernel Layer (Rust, Memory, Processes)
Hardware Abstraction (Boot, Drivers, HAL)
Boot Structure (UEFI Bootloader)`},{title:"Modular Kernel Architecture",content:`The kernel is designed with strict modularity:
- Memory Manager: Physical and virtual memory allocation
- Process Manager: Task scheduling and process lifecycle
- Interrupt Handler: IDT-based exception and interrupt handling
- Syscall Interface: System call abstraction layer
- Driver Model: Hardware abstraction with standardized driver interface`},{title:"Service-Based System Model",content:`System functionality is delivered through discrete services:
- API Server: RESTful service infrastructure
- Assistant Service: AI-style system assistant
- Security Service: Permission and integrity management
- Recovery Service: Blockchain-based recovery coordination`}]},{value:"tech-stack",label:"Tech Stack",sections:[{title:"Rust (Backend & System Services)",content:`- Kernel Development: no_std kernel implementation for x86_64
- Bootloader: UEFI bootloader written in Rust
- System Services: Backend microservices architecture
- Security Modules: Memory-safe security engine implementation`},{title:"React & TypeScript (System UI Architecture)",content:`- Frontend Framework: React 18+ with TypeScript
- State Management: Zustand for centralized state
- Component Library: Custom modular UI primitives
- Build System: Vite for fast development and building
- IPC Communication: Inter-process communication layer`}]},{value:"security",label:"Security & Blockchain",sections:[{title:"Security-First System Design Principles",content:`1. Defense in Depth: Multiple layers of security controls
2. Least Privilege: Minimal permission requirements for all components
3. Memory Safety: Rust's ownership model prevents common vulnerabilities
4. Secure Boot Philosophy: Chain of trust from firmware to application`},{title:"Blockchain-Based Recovery Mode",content:`The Blockchain-Based Recovery Mode introduces distributed ledger principles to operating system recovery, creating a tamper-resistant audit trail for system states and recovery operations.

- Immutable State Log: System state changes recorded in append-only log
- Cryptographic Hashing: Each state linked via cryptographic hashes
- Distributed Verification: Multiple verification points
- Anti-Tampering: Any modification detected immediately`},{title:"Secure Rollback Mechanism",content:`1. State Snapshots: Periodic system state snapshots
2. Hash Chain: Cryptographically linked state history
3. Verification: Rollback only to verified states
4. Audit Trail: Complete history of system modifications`}]},{value:"modes",label:"Modes & SRI",sections:[{title:"Server & Developer Mode",content:`Designed for Server Environments. Server & Developer Mode provides a performance-optimized, configuration-driven environment for professional deployments:
- Headless Operation: Full system control without graphical interface
- Resource Efficiency: Minimal resource footprint
- Remote Access: Secure remote management capabilities
- Container Support: Isolation and deployment workflows`},{title:"Assistant Mode (SRI - System Runtime Intelligence)",content:`The Assistant Mode provides an AI-style integrated assistant operating at the OS level:
- Natural Language Interface: Command via text or voice
- System Context Awareness: Understands system state
- Proactive Assistance: Anticipates user needs
- Automation Capabilities: Execute complex system tasks

It features comprehensive Developer Assistance (Code context, Build assistance) and System Monitoring.`}]}]}},w=()=>{const{projectId:n}=o(),t=a[n||""]||a["black-wall"];return e.jsx(c,{children:e.jsx("div",{className:"min-h-screen py-20 px-4",children:e.jsxs("div",{className:"container mx-auto max-w-4xl",children:[e.jsxs(l,{to:"/docs",className:"inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors",children:[e.jsx(x,{className:"w-4 h-4"})," Back to Documentation"]}),e.jsxs(d.div,{initial:"hidden",animate:"visible",variants:S,children:[e.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[e.jsx("div",{className:`w-12 h-12 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center shadow-lg shadow-black/20`,children:e.jsx(t.icon,{className:"w-6 h-6 text-foreground/70"})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-3xl font-bold text-foreground font-brand",children:t.name}),e.jsx("p",{className:"text-sm text-muted-foreground",children:t.tagline})]}),e.jsx(m,{className:"ml-auto bg-blue-500/15 text-blue-300 border-blue-500/20 text-xs",children:t.status})]}),e.jsx("p",{className:"text-muted-foreground mb-8 max-w-3xl leading-relaxed",children:t.description})]}),t.tabs?e.jsxs(p,{defaultValue:t.tabs[0].value,className:"space-y-6",children:[e.jsx(u,{className:"bg-white/[0.04] border border-white/[0.08] p-1 flex-wrap h-auto",children:t.tabs.map(s=>e.jsx(h,{value:s.value,className:"text-sm data-[state=active]:bg-white/[0.1] px-4 py-2",children:s.label},s.value))}),t.tabs.map(s=>e.jsx(y,{value:s.value,children:e.jsx(g,{className:"bg-black/40 backdrop-blur-md border-white/5",children:e.jsx(v,{className:"p-8",children:s.sections.map((r,i)=>e.jsx(b,{title:r.title,content:r.content},i))})})},s.value))]}):e.jsx("div",{children:"Failed to load project docs."})]})})})};export{w as default};
