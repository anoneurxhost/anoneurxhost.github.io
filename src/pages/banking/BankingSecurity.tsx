import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, KeyRound, Server, FileCheck } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { icon: Shield, title: "256-bit Encryption", desc: "All data at rest and in transit is encrypted with AES-256." },
  { icon: Lock, title: "Biometric Login", desc: "Face ID, Touch ID, and hardware security key support." },
  { icon: KeyRound, title: "Multi-Factor", desc: "Mandatory MFA on every login and high-risk action." },
  { icon: Server, title: "SOC 2 Type II", desc: "Independently audited every year against SOC 2 Type II." },
  { icon: Eye, title: "Zero Telemetry", desc: "We don't sell your data. Ever. Period." },
  { icon: FileCheck, title: "Insured Deposits", desc: "Funds held with FDIC-equivalent partner banks up to $250K." },
];

const BankingSecurity = () => (
  <section className="px-4 py-16">
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-10">
        <Badge className="bg-emerald-500/10 text-emerald-300 border-emerald-500/30 mb-3 text-[10px]">Security</Badge>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Your money, protected by the best</h1>
        <p className="text-sm text-gray-400">Bank-grade security, ruthlessly engineered for transparency.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it, i) => (
          <motion.div key={it.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
            <Card className="h-full bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl rounded-2xl hover:border-emerald-500/30 transition">
              <CardContent className="p-5">
                <it.icon className="w-5 h-5 text-emerald-400 mb-3" />
                <h3 className="text-sm font-bold mb-1">{it.title}</h3>
                <p className="text-xs text-gray-400">{it.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BankingSecurity;
