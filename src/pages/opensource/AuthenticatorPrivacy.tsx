import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  EyeOff,
  HardDrive,
  Database,
  Share2,
  WifiOff,
  ShieldAlert,
  Trash2,
  UserX,
  Layers,
  KeyRound,
  FileText,
  Mail,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Fingerprint,
  Globe,
  Server,
  Smartphone,
  Info,
  AlertTriangle,
} from "lucide-react";
import OSPage from "./OSPage";
import heroBg from "@/assets/opensource/bg.png";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const AuthenticatorPrivacy: React.FC = () => {
  const [activeSection, setActiveSection] = useState("sec-1");
  const sectionRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const sections = [
    { id: "sec-1", num: "01", title: "Introduction", icon: <Info className="h-4 w-4" /> },
    { id: "sec-2", num: "02", title: "Information We Collect", icon: <Database className="h-4 w-4" /> },
    { id: "sec-3", num: "03", title: "Local Storage", icon: <HardDrive className="h-4 w-4" /> },
    { id: "sec-4", num: "04", title: "How We Use Information", icon: <EyeOff className="h-4 w-4" /> },
    { id: "sec-5", num: "05", title: "Data Sharing", icon: <Share2 className="h-4 w-4" /> },
    { id: "sec-6", num: "06", title: "Internet & Network", icon: <WifiOff className="h-4 w-4" /> },
    { id: "sec-7", num: "07", title: "Security", icon: <ShieldAlert className="h-4 w-4" /> },
    { id: "sec-8", num: "08", title: "Data Retention", icon: <Server className="h-4 w-4" /> },
    { id: "sec-9", num: "09", title: "Data Deletion", icon: <Trash2 className="h-4 w-4" /> },
    { id: "sec-10", num: "10", title: "Children's Privacy", icon: <UserX className="h-4 w-4" /> },
    { id: "sec-11", num: "11", title: "Third-Party Services", icon: <Globe className="h-4 w-4" /> },
    { id: "sec-12", num: "12", title: "Permissions", icon: <KeyRound className="h-4 w-4" /> },
    { id: "sec-13", num: "13", title: "Changes to Policy", icon: <FileText className="h-4 w-4" /> },
    { id: "sec-14", num: "14", title: "Contact Us", icon: <Mail className="h-4 w-4" /> },
    { id: "sec-15", num: "15", title: "Summary", icon: <Sparkles className="h-4 w-4" /> },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const registerRef = (id: string, el: HTMLDivElement | null) => {
    if (el) sectionRefs.current.set(id, el);
  };

  return (
    <div className="min-h-screen relative text-white bg-slate-950 selection:bg-purple-500/30 selection:text-purple-100">
      {/* Background Image */}
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat opacity-70 pointer-events-none"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/90 pointer-events-none" />

      {/* Ambient Glows */}
      <div className="fixed top-0 left-1/4 -z-10 h-[600px] w-[600px] rounded-full bg-purple-600/5 blur-[200px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 -z-10 h-[600px] w-[600px] rounded-full bg-emerald-600/5 blur-[200px] pointer-events-none" />

      <OSPage>
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">

          {/* BREADCRUMB */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 flex flex-wrap items-center justify-between gap-4"
          >
            <Link
              to="/opensource/authenticator"
              className="group inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-slate-300 backdrop-blur-md hover:bg-white/10 hover:text-white transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Authenticator
            </Link>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-mono tracking-wider text-emerald-300 uppercase backdrop-blur-sm">
                <ShieldCheck className="h-3.5 w-3.5" /> ZERO KNOWLEDGE
              </span>
            </div>
          </motion.div>

          {/* HERO */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="relative mb-12 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-slate-900/90 via-slate-950/95 to-purple-950/30 p-8 md:p-12 lg:p-16 backdrop-blur-3xl shadow-2xl shadow-purple-900/10"
          >
            {/* Hero ambient */}
            <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-purple-600/8 blur-[140px] pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-emerald-600/8 blur-[140px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

            <div className="relative z-10">
              <motion.div variants={fadeUp} className="mb-6 flex flex-wrap items-center gap-2.5">
                <span className="rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-300 tracking-wide">
                  ANONEURX Authenticator
                </span>
                <span className="h-1 w-1 rounded-full bg-slate-600" />
                <span className="rounded-lg border border-slate-700/50 bg-slate-800/60 px-3 py-1 text-xs font-mono text-slate-400">
                  Effective Sept 2, 2026
                </span>
                <span className="h-1 w-1 rounded-full bg-slate-600" />
                <span className="rounded-lg border border-slate-700/50 bg-slate-800/60 px-3 py-1 text-xs font-mono text-slate-400">
                  Updated Sept 2, 2026
                </span>
              </motion.div>

              <motion.h1 variants={fadeUp} className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl font-brand">
                Privacy Policy
              </motion.h1>

              <motion.p variants={fadeUp} className="max-w-3xl text-base text-slate-300 sm:text-lg font-light leading-relaxed">
                ANONEURX Authenticator is built with a <span className="text-emerald-300 font-medium">local-first, zero-knowledge architecture</span>. Your authentication secrets, TOTP keys, and vault credentials stay safely on your device and are <span className="text-emerald-300 font-medium">never transmitted</span> to our servers.
              </motion.p>

              {/* Quick Stats */}
              <motion.div variants={fadeUp} className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Data Collected", value: "None", color: "text-emerald-400" },
                  { label: "Servers Used", value: "Zero", color: "text-emerald-400" },
                  { label: "Tracking", value: "None", color: "text-emerald-400" },
                  { label: "Accounts Required", value: "None", color: "text-emerald-400" },
                ].map((stat, i) => (
                  <div key={i} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 backdrop-blur-sm">
                    <div className={`text-2xl font-bold font-brand ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-slate-500 mt-1 font-mono">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* MAIN GRID */}
          <div className="grid gap-8 lg:grid-cols-[300px_1fr]">

            {/* SIDEBAR TOC */}
            <div className="hidden lg:block">
              <div className="sticky top-24 rounded-[1.5rem] border border-white/[0.08] bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl shadow-black/20">
                <h3 className="mb-5 text-xs font-mono font-bold uppercase tracking-widest text-slate-500">
                  Table of Contents
                </h3>
                <nav className="space-y-0.5 text-sm max-h-[65vh] overflow-y-auto pr-1 scrollbar-thin">
                  {sections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveSection(sec.id);
                        document.getElementById(sec.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className={`group flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs transition-all duration-200 ${
                        activeSection === sec.id
                          ? "bg-purple-500/15 font-semibold text-purple-300 border border-purple-500/20 shadow-sm shadow-purple-500/5"
                          : "text-slate-500 hover:bg-white/[0.04] hover:text-slate-300 border border-transparent"
                      }`}
                    >
                      <span className={`transition-colors ${activeSection === sec.id ? "text-purple-400" : "text-slate-600 group-hover:text-slate-400"}`}>
                        {sec.icon}
                      </span>
                      <span>{sec.num}. {sec.title}</span>
                      {activeSection === sec.id && (
                        <ChevronRight className="h-3 w-3 text-purple-400 ml-auto" />
                      )}
                    </a>
                  ))}
                </nav>

                <div className="mt-6 border-t border-white/[0.06] pt-5">
                  <a
                    href="mailto:privacy@anoneurx.com"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-center text-xs font-medium text-slate-400 hover:bg-white/[0.08] hover:text-white transition-all duration-200"
                  >
                    <Mail className="h-3.5 w-3.5 text-purple-400" /> Contact Privacy Team
                  </a>
                </div>
              </div>
            </div>

            {/* POLICY CONTENT */}
            <div className="space-y-6">

              {/* 1. INTRODUCTION */}
              <AnimatedSection>
                <section id="sec-1" ref={(el) => registerRef("sec-1", el)} className="scroll-mt-24 rounded-[1.75rem] border border-white/[0.08] bg-slate-900/50 p-7 md:p-10 backdrop-blur-xl shadow-xl shadow-black/10">
                  <div className="mb-6 flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
                      <Info className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="text-xs font-mono text-slate-500 tracking-wider">SECTION 01</span>
                      <h2 className="text-2xl font-bold text-white">Introduction</h2>
                    </div>
                  </div>
                  <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed font-light text-sm sm:text-base space-y-4">
                    <p>
                      ANONEURX ("we," "us," or "our") develops and maintains <strong className="text-white">ANONEURX Authenticator</strong> (the "App").
                    </p>
                    <p>
                      ANONEURX Authenticator is designed as a privacy-focused authenticator application that operates locally on your device. The App generates and manages authentication codes without requiring an online account or transmitting your authenticator data to our servers.
                    </p>
                    <p>
                      This Privacy Policy explains what information the App accesses, collects, stores, uses, and shares.
                    </p>
                    <div className="mt-6 rounded-2xl border border-purple-500/20 bg-purple-500/[0.06] p-5 flex items-start gap-3">
                      <Lock className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-purple-200 font-medium">
                        By using ANONEURX Authenticator, you acknowledge the practices described in this Privacy Policy.
                      </p>
                    </div>
                  </div>
                </section>
              </AnimatedSection>

              {/* 2. INFORMATION WE COLLECT */}
              <AnimatedSection>
                <section id="sec-2" ref={(el) => registerRef("sec-2", el)} className="scroll-mt-24 rounded-[1.75rem] border border-white/[0.08] bg-slate-900/50 p-7 md:p-10 backdrop-blur-xl shadow-xl shadow-black/10">
                  <div className="mb-8 flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300">
                      <Database className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="text-xs font-mono text-slate-500 tracking-wider">SECTION 02</span>
                      <h2 className="text-2xl font-bold text-white">Information We Collect</h2>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {/* 2.1 */}
                    <div className="rounded-2xl border border-white/[0.06] bg-slate-950/50 p-6">
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400 text-xs font-bold">2.1</span>
                        Personal Information
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed mb-4">
                        ANONEURX Authenticator does not require you to provide personal information:
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono sm:grid-cols-4">
                        {["Name", "Email Address", "Phone Number", "Physical Address", "Account Credentials", "Government ID", "Contacts", "Financial Info"].map((item, idx) => (
                          <div key={idx} className="rounded-xl bg-white/[0.03] border border-red-500/10 p-2.5 text-center text-slate-400 flex items-center justify-center gap-1.5">
                            <span className="text-red-400/70 text-[10px]">✕</span> {item}
                          </div>
                        ))}
                      </div>
                      <p className="mt-4 text-xs text-slate-500 flex items-start gap-2">
                        <Info className="h-3.5 w-3.5 shrink-0 mt-0.5 text-slate-600" />
                        No ANONEURX account is required to use core authentication functionality.
                      </p>
                    </div>

                    {/* 2.2 */}
                    <div className="rounded-2xl border border-white/[0.06] bg-slate-950/50 p-6">
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400 text-xs font-bold">2.2</span>
                        Authentication Information
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed mb-3">
                        Authentication secrets, account labels, and other information entered or generated for authenticator entries may be stored locally on your device so that the App can provide authentication functionality.
                      </p>
                      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] p-4 mb-3">
                        <p className="text-sm font-semibold text-emerald-300 flex items-start gap-2">
                          <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5" />
                          This information is never transmitted to ANONEURX servers.
                        </p>
                      </div>
                      <p className="text-xs text-slate-500 flex items-start gap-2">
                        <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-500/60" />
                        Authentication secrets are sensitive. Protect access to your device and avoid sharing them.
                      </p>
                    </div>

                    {/* 2.3 */}
                    <div className="rounded-2xl border border-white/[0.06] bg-slate-950/50 p-6">
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/15 text-purple-400 text-xs font-bold">2.3</span>
                        Device Information
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        ANONEURX Authenticator does not intentionally collect device identifiers, advertising identifiers, precise location, contacts, microphone recordings, camera recordings, or other personal device information for analytics or advertising purposes.
                      </p>
                      <p className="mt-3 text-xs text-slate-500 flex items-start gap-2">
                        <Smartphone className="h-3.5 w-3.5 shrink-0 mt-0.5 text-slate-600" />
                        If the Android OS makes technical information available during normal operation, it is used only for App functionality and never transmitted.
                      </p>
                    </div>
                  </div>
                </section>
              </AnimatedSection>

              {/* 3. LOCAL STORAGE */}
              <AnimatedSection>
                <section id="sec-3" ref={(el) => registerRef("sec-3", el)} className="scroll-mt-24 rounded-[1.75rem] border border-white/[0.08] bg-slate-900/50 p-7 md:p-10 backdrop-blur-xl shadow-xl shadow-black/10">
                  <div className="mb-6 flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
                      <HardDrive className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="text-xs font-mono text-slate-500 tracking-wider">SECTION 03</span>
                      <h2 className="text-2xl font-bold text-white">Local Storage</h2>
                    </div>
                  </div>
                  <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-light">
                    <p>
                      ANONEURX Authenticator is designed to store all authenticator data locally on your device.
                    </p>
                    <p>Depending on your device configuration, locally stored information may include:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {["Authenticator account names or labels", "Authentication secrets", "Generated one-time authentication codes", "App preferences and settings"].map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-slate-300">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 rounded-2xl border border-purple-500/20 bg-purple-500/[0.06] p-5">
                      <p className="font-semibold text-purple-300 flex items-start gap-2">
                        <Lock className="h-4 w-4 shrink-0 mt-0.5" />
                        This information is designed to remain on your device and is never uploaded to ANONEURX servers.
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/[0.06] bg-slate-950/50 p-4">
                      <p className="text-xs text-slate-500 leading-relaxed">
                        If you uninstall the App, clear its data, reset your device, or otherwise remove locally stored data, your authenticator information may be permanently deleted. You are responsible for maintaining any backups you choose to create.
                      </p>
                    </div>
                  </div>
                </section>
              </AnimatedSection>

              {/* 4. HOW WE USE INFORMATION */}
              <AnimatedSection>
                <section id="sec-4" ref={(el) => registerRef("sec-4", el)} className="scroll-mt-24 rounded-[1.75rem] border border-white/[0.08] bg-slate-900/50 p-7 md:p-10 backdrop-blur-xl shadow-xl shadow-black/10">
                  <div className="mb-6 flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-300">
                      <EyeOff className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="text-xs font-mono text-slate-500 tracking-wider">SECTION 04</span>
                      <h2 className="text-2xl font-bold text-white">How We Use Information</h2>
                    </div>
                  </div>
                  <p className="mb-5 text-sm text-slate-300 leading-relaxed font-light">
                    Information stored locally is used solely to provide the App's functionality:
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      "Generating time-based one-time passwords (TOTP)",
                      "Generating other supported authentication codes",
                      "Displaying authenticator entries",
                      "Managing authenticator settings",
                      "Providing security-related functionality",
                      "Allowing users to manage their data",
                    ].map((use, i) => (
                      <div key={i} className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-sm text-slate-200">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{use}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/[0.06] p-4 flex items-start gap-2.5">
                    <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    <p className="text-xs font-semibold text-red-300">
                      We do not use authenticator secrets for advertising, profiling, or behavioral tracking.
                    </p>
                  </div>
                </section>
              </AnimatedSection>

              {/* 5. DATA SHARING */}
              <AnimatedSection>
                <section id="sec-5" ref={(el) => registerRef("sec-5", el)} className="scroll-mt-24 rounded-[1.75rem] border border-white/[0.08] bg-slate-900/50 p-7 md:p-10 backdrop-blur-xl shadow-xl shadow-black/10">
                  <div className="mb-6 flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
                      <Share2 className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="text-xs font-mono text-slate-500 tracking-wider">SECTION 05</span>
                      <h2 className="text-2xl font-bold text-white">Data Sharing</h2>
                    </div>
                  </div>
                  <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-light">
                    <p>
                      ANONEURX Authenticator does not intentionally sell, rent, or share your authenticator secrets or locally stored authentication information with third parties.
                    </p>
                    <p>
                      The App is designed so that authentication information remains on your device rather than being transmitted to ANONEURX servers.
                    </p>
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-5">
                      <p className="font-semibold text-emerald-300 flex items-start gap-2">
                        <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5" />
                        We do not intentionally share personal information with advertisers or data brokers.
                      </p>
                    </div>
                  </div>
                </section>
              </AnimatedSection>

              {/* 6. INTERNET AND NETWORK ACCESS */}
              <AnimatedSection>
                <section id="sec-6" ref={(el) => registerRef("sec-6", el)} className="scroll-mt-24 rounded-[1.75rem] border border-white/[0.08] bg-slate-900/50 p-7 md:p-10 backdrop-blur-xl shadow-xl shadow-black/10">
                  <div className="mb-6 flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300">
                      <WifiOff className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="text-xs font-mono text-slate-500 tracking-wider">SECTION 06</span>
                      <h2 className="text-2xl font-bold text-white">Internet & Network Access</h2>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 shrink-0">
                        <WifiOff className="h-6 w-6 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-emerald-300 mb-2">Fully Offline by Design</h3>
                        <p className="text-sm text-slate-300 leading-relaxed font-light">
                          The core functionality of ANONEURX Authenticator is designed to work entirely offline. No ANONEURX online account or cloud service is required to generate authentication codes.
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 flex items-start gap-2">
                      <Info className="h-3.5 w-3.5 shrink-0 mt-0.5 text-slate-600" />
                      If a future version introduces network-connected functionality, this Privacy Policy will be updated accordingly.
                    </p>
                  </div>
                </section>
              </AnimatedSection>

              {/* 7. SECURITY */}
              <AnimatedSection>
                <section id="sec-7" ref={(el) => registerRef("sec-7", el)} className="scroll-mt-24 rounded-[1.75rem] border border-white/[0.08] bg-slate-900/50 p-7 md:p-10 backdrop-blur-xl shadow-xl shadow-black/10">
                  <div className="mb-6 flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-300">
                      <ShieldAlert className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="text-xs font-mono text-slate-500 tracking-wider">SECTION 07</span>
                      <h2 className="text-2xl font-bold text-white">Security</h2>
                    </div>
                  </div>
                  <p className="mb-5 text-sm text-slate-300 leading-relaxed font-light">
                    We take reasonable technical measures to protect information handled by the App. Because authenticator secrets can be highly sensitive, users should also:
                  </p>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {[
                      "Keep your device secured with a strong screen lock",
                      "Avoid sharing authentication secrets",
                      "Keep the operating system and App updated",
                      "Use only trusted backup methods",
                      "Avoid installing modified or unofficial versions of the App",
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-sm text-slate-300">
                        <Lock className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 rounded-xl border border-white/[0.06] bg-slate-950/50 p-4">
                    <p className="text-xs text-slate-500 italic leading-relaxed">
                      No method of electronic storage can be guaranteed to be completely secure. Although we take reasonable measures, we cannot guarantee absolute security.
                    </p>
                  </div>
                </section>
              </AnimatedSection>

              {/* 8. DATA RETENTION */}
              <AnimatedSection>
                <section id="sec-8" ref={(el) => registerRef("sec-8", el)} className="scroll-mt-24 rounded-[1.75rem] border border-white/[0.08] bg-slate-900/50 p-7 md:p-10 backdrop-blur-xl shadow-xl shadow-black/10">
                  <div className="mb-6 flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
                      <Server className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="text-xs font-mono text-slate-500 tracking-wider">SECTION 08</span>
                      <h2 className="text-2xl font-bold text-white">Data Retention</h2>
                    </div>
                  </div>
                  <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-light">
                    <p>
                      ANONEURX does not maintain a central server-side copy of your authenticator data through the App's normal offline operation.
                    </p>
                    <p>Authenticator information remains on your device until you:</p>
                    <div className="space-y-2">
                      {[
                        "Delete an authenticator entry",
                        "Clear the App's data",
                        "Uninstall the App",
                        "Reset or erase the device",
                        "Take another action that removes locally stored information",
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-slate-300">
                          <ChevronRight className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl border border-white/[0.06] bg-slate-950/50 p-4">
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Because the data is designed to remain locally on your device, ANONEURX generally does not possess a copy of that locally stored information to delete from its servers.
                      </p>
                    </div>
                  </div>
                </section>
              </AnimatedSection>

              {/* 9. DATA DELETION */}
              <AnimatedSection>
                <section id="sec-9" ref={(el) => registerRef("sec-9", el)} className="scroll-mt-24 rounded-[1.75rem] border border-white/[0.08] bg-slate-900/50 p-7 md:p-10 backdrop-blur-xl shadow-xl shadow-black/10">
                  <div className="mb-6 flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300">
                      <Trash2 className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="text-xs font-mono text-slate-500 tracking-wider">SECTION 09</span>
                      <h2 className="text-2xl font-bold text-white">Data Deletion</h2>
                    </div>
                  </div>
                  <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-light">
                    <p>
                      You can delete authenticator entries and locally stored application information using the functionality provided by the App or Android operating system.
                    </p>
                    <p>
                      If you uninstall the App or clear its application data, locally stored App data may be deleted by the operating system.
                    </p>
                    <p>
                      Because ANONEURX Authenticator does not require an online user account for its core functionality, there is no ANONEURX account associated with your authenticator data that you need to request deletion from our servers.
                    </p>
                    <p className="text-xs text-slate-500 flex items-start gap-2">
                      <Info className="h-3.5 w-3.5 shrink-0 mt-0.5 text-slate-600" />
                      If you believe ANONEURX has received personal information through a separate interaction, you may contact us using the information below.
                    </p>
                  </div>
                </section>
              </AnimatedSection>

              {/* 10. CHILDREN'S PRIVACY */}
              <AnimatedSection>
                <section id="sec-10" ref={(el) => registerRef("sec-10", el)} className="scroll-mt-24 rounded-[1.75rem] border border-white/[0.08] bg-slate-900/50 p-7 md:p-10 backdrop-blur-xl shadow-xl shadow-black/10">
                  <div className="mb-6 flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
                      <UserX className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="text-xs font-mono text-slate-500 tracking-wider">SECTION 10</span>
                      <h2 className="text-2xl font-bold text-white">Children's Privacy</h2>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm text-slate-300 leading-relaxed font-light">
                    <p>ANONEURX Authenticator is not specifically directed toward children.</p>
                    <p>We do not knowingly collect personal information from children through the App.</p>
                    <p className="text-xs text-slate-500 flex items-start gap-2">
                      <Info className="h-3.5 w-3.5 shrink-0 mt-0.5 text-slate-600" />
                      If you believe a child has provided personal information through a separate service or channel, please contact us so we can review the matter.
                    </p>
                  </div>
                </section>
              </AnimatedSection>

              {/* 11. THIRD-PARTY SERVICES */}
              <AnimatedSection>
                <section id="sec-11" ref={(el) => registerRef("sec-11", el)} className="scroll-mt-24 rounded-[1.75rem] border border-white/[0.08] bg-slate-900/50 p-7 md:p-10 backdrop-blur-xl shadow-xl shadow-black/10">
                  <div className="mb-6 flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-300">
                      <Globe className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="text-xs font-mono text-slate-500 tracking-wider">SECTION 11</span>
                      <h2 className="text-2xl font-bold text-white">Third-Party Services & SDKs</h2>
                    </div>
                  </div>
                  <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-light">
                    <p>
                      The current version of ANONEURX Authenticator is designed to minimize third-party data collection and does not intentionally use third-party advertising or analytics services to collect personal information.
                    </p>
                    <div className="rounded-xl border border-white/[0.06] bg-slate-950/50 p-4">
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Any third-party library, SDK, or service introduced into future versions will be reviewed for its data-handling practices, and this Privacy Policy will be updated where necessary.
                      </p>
                    </div>
                  </div>
                </section>
              </AnimatedSection>

              {/* 12. PERMISSIONS */}
              <AnimatedSection>
                <section id="sec-12" ref={(el) => registerRef("sec-12", el)} className="scroll-mt-24 rounded-[1.75rem] border border-white/[0.08] bg-slate-900/50 p-7 md:p-10 backdrop-blur-xl shadow-xl shadow-black/10">
                  <div className="mb-6 flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
                      <KeyRound className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="text-xs font-mono text-slate-500 tracking-wider">SECTION 12</span>
                      <h2 className="text-2xl font-bold text-white">Permissions</h2>
                    </div>
                  </div>
                  <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-light">
                    <p>
                      ANONEURX Authenticator requests only permissions that are necessary for features provided by the App.
                    </p>
                    <p className="text-xs text-slate-500 flex items-start gap-2">
                      <Info className="h-3.5 w-3.5 shrink-0 mt-0.5 text-slate-600" />
                      If a future version requires additional permissions involving personal or sensitive information, the App and this Privacy Policy will provide appropriate disclosures as required by applicable policies and law.
                    </p>
                  </div>
                </section>
              </AnimatedSection>

              {/* 13. CHANGES TO THIS PRIVACY POLICY */}
              <AnimatedSection>
                <section id="sec-13" ref={(el) => registerRef("sec-13", el)} className="scroll-mt-24 rounded-[1.75rem] border border-white/[0.08] bg-slate-900/50 p-7 md:p-10 backdrop-blur-xl shadow-xl shadow-black/10">
                  <div className="mb-6 flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300">
                      <FileText className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="text-xs font-mono text-slate-500 tracking-wider">SECTION 13</span>
                      <h2 className="text-2xl font-bold text-white">Changes to This Policy</h2>
                    </div>
                  </div>
                  <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-light">
                    <p>
                      We may update this Privacy Policy when the App's functionality, data practices, legal requirements, or Google Play requirements change.
                    </p>
                    <p>
                      When changes are made, the "Last Updated" date at the beginning of this Privacy Policy will be updated.
                    </p>
                    <p className="text-xs text-slate-500 flex items-start gap-2">
                      <Info className="h-3.5 w-3.5 shrink-0 mt-0.5 text-slate-600" />
                      We encourage users to periodically review this page for the latest information about our privacy practices.
                    </p>
                  </div>
                </section>
              </AnimatedSection>

              {/* 14. CONTACT US */}
              <AnimatedSection>
                <section id="sec-14" ref={(el) => registerRef("sec-14", el)} className="scroll-mt-24 rounded-[1.75rem] border border-white/[0.08] bg-slate-900/50 p-7 md:p-10 backdrop-blur-xl shadow-xl shadow-black/10">
                  <div className="mb-6 flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
                      <Mail className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="text-xs font-mono text-slate-500 tracking-wider">SECTION 14</span>
                      <h2 className="text-2xl font-bold text-white">Contact Us</h2>
                    </div>
                  </div>
                  <p className="mb-6 text-sm text-slate-300">
                    If you have questions, concerns, or requests regarding this Privacy Policy or ANONEURX Authenticator:
                  </p>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <a
                      href="mailto:privacy@anoneurx.com"
                      className="group flex flex-col items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 text-center hover:bg-purple-500/[0.08] hover:border-purple-500/20 transition-all duration-300"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/15 mb-3 group-hover:bg-purple-500/25 transition-colors">
                        <Mail className="h-5 w-5 text-purple-400" />
                      </div>
                      <span className="text-xs font-mono text-slate-500 mb-1">Privacy Contact</span>
                      <span className="text-sm font-semibold text-white">privacy@anoneurx.com</span>
                    </a>

                    <a
                      href="mailto:feedback@anoneurx.com"
                      className="group flex flex-col items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 text-center hover:bg-cyan-500/[0.08] hover:border-cyan-500/20 transition-all duration-300"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/15 mb-3 group-hover:bg-cyan-500/25 transition-colors">
                        <Mail className="h-5 w-5 text-cyan-400" />
                      </div>
                      <span className="text-xs font-mono text-slate-500 mb-1">Feedback</span>
                      <span className="text-sm font-semibold text-white">feedback@anoneurx.com</span>
                    </a>

                    <a
                      href="https://anoneurx.com"
                      target="_blank"
                      rel="noreferrer"
                      className="group flex flex-col items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 text-center hover:bg-emerald-500/[0.08] hover:border-emerald-500/20 transition-all duration-300"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 mb-3 group-hover:bg-emerald-500/25 transition-colors">
                        <ExternalLink className="h-5 w-5 text-emerald-400" />
                      </div>
                      <span className="text-xs font-mono text-slate-500 mb-1">Official Website</span>
                      <span className="text-sm font-semibold text-white">anoneurx.com</span>
                    </a>
                  </div>
                </section>
              </AnimatedSection>

              {/* 15. SUMMARY */}
              <AnimatedSection>
                <section id="sec-15" ref={(el) => registerRef("sec-15", el)} className="scroll-mt-24 rounded-[2rem] border border-emerald-500/20 bg-gradient-to-br from-emerald-950/30 via-slate-900/90 to-slate-950 p-8 md:p-12 backdrop-blur-xl shadow-2xl shadow-emerald-900/10 relative overflow-hidden">
                  {/* Ambient glow */}
                  <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />
                  <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />

                  <div className="relative z-10">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15">
                        <Sparkles className="h-5 w-5 text-emerald-400" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">Summary</h2>
                    </div>
                    <p className="mb-8 text-sm text-slate-300 leading-relaxed font-light">
                      ANONEURX Authenticator is designed with a local-first privacy model. <strong className="text-emerald-300">In summary:</strong>
                    </p>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        "No ANONEURX account is required for core functionality.",
                        "Authenticator data is designed to remain on your device.",
                        "Authentication secrets are never transmitted to ANONEURX servers.",
                        "We do not sell or rent your authenticator information.",
                        "The App does not use your data for advertising or profiling.",
                        "You can remove locally stored data at any time.",
                      ].map((sum, i) => (
                        <div key={i} className="flex items-start gap-3 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.06] p-4 text-sm text-emerald-100">
                          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{sum}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-emerald-500/10 text-center">
                      <p className="text-xs font-mono font-semibold tracking-widest text-slate-500 uppercase">
                        This Privacy Policy applies specifically to ANONEURX Authenticator
                      </p>
                    </div>
                  </div>
                </section>
              </AnimatedSection>

            </div>
          </div>
        </div>
      </OSPage>
    </div>
  );
};

export default AuthenticatorPrivacy;
