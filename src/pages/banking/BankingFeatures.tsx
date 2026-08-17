import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard, Zap, ShieldCheck, Sparkles, Wallet, Receipt, TrendingUp, Globe,
  Lock, Smartphone, RefreshCw, Bell
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: CreditCard, title: "Premium Cards", desc: "Metal debit, virtual single-use, and merchant-locked cards." },
  { icon: Zap, title: "Instant Transfers", desc: "Send money worldwide in seconds with no hidden fees." },
  { icon: ShieldCheck, title: "Vault Accounts", desc: "Set aside money in encrypted vaults that earn interest." },
  { icon: Sparkles, title: "AI Insights", desc: "Spending intelligence personalized to your habits." },
  { icon: Wallet, title: "Multi-Currency", desc: "Hold balances in 30+ currencies with real-time FX." },
  { icon: Receipt, title: "Auto Receipts", desc: "Automatic expense categorization and receipt capture." },
  { icon: TrendingUp, title: "Auto-Invest", desc: "Round-ups invested into curated index portfolios." },
  { icon: Globe, title: "Global Coverage", desc: "Use your card in 180+ countries — zero foreign fees." },
  { icon: Lock, title: "Biometric Auth", desc: "Face ID, Touch ID, and hardware security key support." },
  { icon: Smartphone, title: "Mobile First", desc: "Beautiful, fast app for iOS, Android, and Web." },
  { icon: RefreshCw, title: "Subscriptions", desc: "Track and pause every recurring charge in one place." },
  { icon: Bell, title: "Real-Time Alerts", desc: "Instant push notifications for every transaction." },
];

const BankingFeatures = () => (
  <section className="px-4 py-16">
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-10">
        <Badge className="bg-amber-500/10 text-amber-300 border-amber-500/30 mb-3 text-[10px]">Features</Badge>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Built for the way you actually live</h1>
        <p className="text-sm text-gray-400">Twelve features. One app. Zero monthly fee.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f, i) => (
          <motion.div key={f.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
            <Card className="h-full bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl hover:border-amber-500/30 transition rounded-2xl">
              <CardContent className="p-5">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center mb-3">
                  <f.icon className="w-4 h-4 text-amber-400" />
                </div>
                <h3 className="text-sm font-bold mb-1">{f.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BankingFeatures;
