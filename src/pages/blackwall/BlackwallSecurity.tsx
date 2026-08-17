import { motion } from "framer-motion";
import { ShieldAlert, ShieldCheck, Lock, EyeOff, Terminal, Key, Shield } from "lucide-react";
import BlackwallLayout from "./BlackwallLayout";

const features = [
  { icon: Lock, title: "Kernel-Level Encryption", desc: "XTS-AES-256 encryption enforced at the block level for all system and user data." },
  { icon: ShieldCheck, title: "Secure Boot", desc: "Cryptographically signed bootloader and kernel stages prevent unauthorized early-load malware." },
  { icon: Terminal, title: "Zero Telemetry", desc: "Black Wall fundamentally lacks tracking code. No data leaves your device without your knowledge." },
  { icon: Key, title: "Hardware Keys", desc: "Native support for YubiKey and WebAuthn for system-wide authentication and sudo." },
];

const BlackwallSecurity = () => (
  <BlackwallLayout>
    <section className="px-4 py-20 min-h-[80vh] flex items-center">
      <div className="container-responsive max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <ShieldAlert className="h-6 w-6 text-emerald-400" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Security that isn't <br />
              <span className="text-emerald-400 italic">optional.</span>
            </h1>
            <p className="text-slate-400 leading-relaxed mb-8">
              Privacy and security shouldn't be opt-in. In Black Wall OS, aggressive threat mitigation is baked into the foundation.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold transition-all">
                Security Overview
              </button>
              <button className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-sm font-semibold">
                Whitepaper
              </button>
            </div>
          </motion.div>

          <div className="grid gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-5 p-5 rounded-3xl border border-white/[0.06] bg-white/[0.02] hover:border-emerald-500/30 transition-all group"
              >
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-all">
                  <f.icon className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1">{f.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-[2.5rem] border border-white/[0.06] bg-gradient-to-br from-emerald-500/5 to-transparent relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4">The Trust Model</h2>
            <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
              We operate on a zero-trust architecture. No process, including system services, is granted rights by default. Every action requires a verified capability handle, drastically reducing the attack surface compared to Ring-0 privilege models.
            </p>
          </div>
          <Shield className="absolute bottom-[-20%] right-[-5%] h-64 w-64 text-emerald-500/5 rotate-[15deg]" />
        </motion.div>
      </div>
    </section>
  </BlackwallLayout>
);

export default BlackwallSecurity;
