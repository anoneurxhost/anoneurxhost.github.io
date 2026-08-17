import React from "react";
import { Shield, Lock, Eye, CheckCircle, Globe, Terminal, FileCheck, Layers } from "lucide-react";
import CloudLayout from "./CloudLayout";

const features = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    desc: "All data at rest is encrypted using AES-256 by default. Traffic uses TLS 1.3."
  },
  {
    icon: Shield,
    title: "Private Networking",
    desc: "Isolated VPCs without public internet traversal. Private IP addressing built-in."
  },
  {
    icon: FileCheck,
    title: "Global Compliance",
    desc: "SOC2 Type II, ISO 27001, and HIPAA compliant environments ready for deployment."
  },
  {
    icon: Eye,
    title: "Threat Monitoring",
    desc: "AI-driven IDS/IPS system scans for anomalous traffic and mitigates attempts."
  }
];

const CloudSecurity = () => {
  return (
    <CloudLayout>
      <div className="pt-32 pb-20">
        <div className="container-responsive">
          <div className="max-w-3xl mx-auto text-center mb-16">
             <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">Security by Design.</h1>
             <p className="text-gray-400 text-sm leading-relaxed max-w-xl mx-auto">
               We treat security as the primary feature. Every byte and packet is governed by zero-trust architecture.
             </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-20 max-w-5xl mx-auto">
             {features.map((f, i) => (
                <div key={i} className="p-8 rounded-lg bg-white/[0.02] border border-white/5 hover:border-violet-500/20 transition-all group">
                   <div className="h-12 w-12 rounded-lg bg-violet-600/10 flex items-center justify-center mb-6">
                      <f.icon className="h-6 w-6 text-violet-400" />
                   </div>
                   <h3 className="text-lg font-bold mb-3 tracking-tight">{f.title}</h3>
                   <p className="text-[11px] text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
             ))}
          </div>

          {/* Compliance Logos */}
          <div className="pt-16 border-t border-white/5 flex flex-col items-center">
             <p className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.4em] mb-10">Certification & Trust</p>
             <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                {["SOC2", "ISO27001", "GDPR", "HIPAA", "PCI-DSS"].map(c => (
                  <div key={c} className="text-lg font-black font-brand tracking-tighter">{c}</div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </CloudLayout>
  );
};

export default CloudSecurity;
