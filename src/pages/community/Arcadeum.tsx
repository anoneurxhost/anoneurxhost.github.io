import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2, TrendingUp, Globe, Calendar, ArrowRight, Cloud, Shield, ShoppingBag,
  Brain, Wallet, FileText, Search, Sparkles
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const companies = [
  { id: 1, name: "Anoneurx Cloud", description: "Decentralized cloud infrastructure for the modern web.", industry: "Cloud", founded: "2026", website: "/cloud", status: "Active", revenue: "$25M+", services: ["Storage", "VPS", "Edge", "Security"], icon: "cloud" },
  { id: 2, name: "Black Wall", description: "Privacy-first OS engineered for hostile environments.", industry: "Operating Systems", founded: "2026", website: "/blackwall", status: "Expanding", revenue: "$15M+", services: ["Kernel", "Encrypted Comms", "Forensics"], icon: "shield" },
  { id: 3, name: "Nexora", description: "AI-native browser with built-in privacy and identity.", industry: "Browsers & AI", founded: "2026", website: "/nexora", status: "Growing", revenue: "$10M+", services: ["AI Search", "Sync", "Privacy"], icon: "globe" },
  { id: 4, name: "Anoneurx Apps", description: "The marketplace for Anoneurx-native software.", industry: "Marketplace", founded: "2024", website: "/apps", status: "Active", revenue: "$8M+", services: ["Distribution", "SDK", "Payments"], icon: "shopping-bag" },
  { id: 5, name: "NextGen AI Labs", description: "Ethical AI research focused on high-performance models.", industry: "Artificial Intelligence", founded: "2023", website: "/artificial-intelligence", status: "Active", revenue: "$12M+", services: ["NLP", "Vision", "Research"], icon: "brain" },
  { id: 6, name: "RoboTech", description: "Autonomous industrial systems and IoT robotics.", industry: "Robotics", founded: "2022", website: "/robotics-systems", status: "Active", revenue: "$30M+", services: ["Automation", "Rovers", "Smart Factories"], icon: "building" },
  { id: 7, name: "Anoneurx Bank", description: "Premium digital banking — virtual cards, instant transfers, AI insights.", industry: "FinTech", founded: "2026", website: "/pay", status: "Growing", revenue: "$18M+", services: ["Cards", "Transfers", "Vault"], icon: "wallet" },
  { id: 8, name: "Anoneurx Notes", description: "AI note-taking with smart summaries and instant search.", industry: "Productivity", founded: "2026", website: "/notes", status: "Growing", revenue: "$4M+", services: ["AI Summaries", "Search", "Sync"], icon: "notes" },
];

const stats = [
  { label: "Companies", value: "8" },
  { label: "Combined Revenue", value: "$122M+" },
  { label: "Employees", value: "1.2K+" },
  { label: "Countries", value: "40+" },
];

const iconMap: Record<string, any> = {
  cloud: Cloud, shield: Shield, globe: Globe, "shopping-bag": ShoppingBag,
  brain: Brain, building: Building2, wallet: Wallet, notes: FileText,
};

const Arcadeum = () => {
  const [query, setQuery] = useState("");
  const filtered = companies.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.industry.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <PageTransition>
      <div className="min-h-screen relative">
        <div className="pointer-events-none absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-[160px]" />
        <div className="pointer-events-none absolute bottom-20 left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-[140px]" />

        {/* Hero */}
        <section className="relative z-10 px-4 pt-24 pb-12">
          <div className="container mx-auto max-w-6xl text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Badge className="mb-4 bg-white/5 text-blue-300 border-white/10 px-4 py-1.5 backdrop-blur-xl">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Our Arcadeum
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                The Anoneurx{" "}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                  Ecosystem
                </span>
              </h1>
              <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto mb-8">
                Eight companies, one mission. From cloud to fintech — every product is engineered for privacy, performance, and premium experience.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10 max-w-3xl mx-auto">
              {stats.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
                  <Card className="bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl">
                    <CardContent className="p-4 text-center">
                      <div className="text-xl font-bold text-white">{s.value}</div>
                      <div className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">{s.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Companies Grid — 4 cards per row */}
        <section className="relative z-10 px-4 pb-24">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((c, i) => {
                const Icon = iconMap[c.icon] || Building2;
                return (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link to={c.website}>
                    <Card className="group h-full bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl hover:border-primary/30 hover:bg-white/[0.05] transition-all rounded-2xl">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-blue-400" />
                          </div>
                        </div>
                        <h3 className="text-base font-bold text-white mb-1">{c.name}</h3>
                        <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-3">{c.industry}</p>
                        <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2">{c.description}</p>
                      </CardContent>
                    </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative z-10 px-4 pb-20">
          <div className="container mx-auto max-w-4xl">
            <Card className="bg-gradient-to-br from-blue-500/10 via-white/[0.03] to-purple-500/10 border-white/10 backdrop-blur-2xl rounded-2xl">
              <CardContent className="p-8 text-center">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Want to join the Arcadeum?</h2>
                <p className="text-sm text-gray-400 mb-6 max-w-xl mx-auto">Partnership inquiries and investor proposals are always open.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild className="bg-primary hover:bg-primary/90 text-white">
                    <Link to="/partnership-inquiry">Partnership Inquiry</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-white/15 text-white hover:bg-white/5">
                    <Link to="/investment-opportunities">Investment Opportunities</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Arcadeum;
