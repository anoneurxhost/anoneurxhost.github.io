import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Server, Shield, Container, Cpu, Lock, Zap, Bell, CheckCircle2, ArrowRight, Terminal } from "lucide-react";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const RELEASE_DATE = new Date("2026-12-01T00:00:00Z").getTime();

const features = [
  { icon: Shield, title: "Hardened Kernel", desc: "Rust core with mandatory access control, capability isolation and memory-safe drivers." },
  { icon: Lock, title: "Zero Trust by Default", desc: "Mutual TLS, workload identity and cryptographic attestation between every service." },
  { icon: Container, title: "Container Native", desc: "First-class OCI runtime, rootless containers and per-workload seccomp profiles." },
  { icon: Cpu, title: "Bare-Metal Ready", desc: "Boots on ARM64 and x86_64 with UEFI Secure Boot and TPM-sealed root of trust." },
  { icon: Zap, title: "Live Patching", desc: "Roll out kernel and userland patches without reboots or downtime." },
  { icon: Terminal, title: "Immutable Root FS", desc: "Signed, immutable base image with A/B updates and instant rollback." },
];

const faq = [
  { q: "When does Black Wall Server launch?", a: "December 2026. Preview builds ship to notify-list subscribers throughout Q4 2026." },
  { q: "Is Black Wall Server open source?", a: "The core runtime is open source. Enterprise features ship under a commercial licence." },
  { q: "Which architectures are supported?", a: "ARM64 and x86_64 at launch, RISC-V within the first year." },
  { q: "Will it run on my provider?", a: "Officially supported on Anoneurx Cloud, AWS, GCP, Azure, Hetzner and Equinix Metal at launch." },
];

const useCountdown = () => {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, RELEASE_DATE - now);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  return { days, hours, minutes, seconds };
};

const BlackwallServer = () => {
  const { days, hours, minutes, seconds } = useCountdown();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    document.title = "Anoneurx | Black Wall Server OS";
    setSubscribed(!!localStorage.getItem("blackwall_server_notify"));
  }, []);

  const notify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    localStorage.setItem("blackwall_server_notify", email);
    setSubscribed(true);
    toast.success("You're on the list. We'll email you at launch.");
  };

  return (
    <div className="flex flex-col text-white">
      <SEO
        title="Black Wall Server OS"
        description="Black Wall Server OS — a hardened Anoneurx operating system for servers. Zero-trust, container-native, air-gap capable. Launching December 2026."
        path="/blackwall/server"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Black Wall Server OS",
          applicationCategory: "ServerApplication",
          operatingSystem: "Cross-platform",
          releaseDate: "2026-12",
          description: "Hardened server OS from Anoneurx.",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      {/* HERO */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="container-responsive relative z-10 text-center max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="bg-blue-500/10 text-blue-300 border-blue-500/20 text-[10px] font-bold uppercase tracking-widest mb-6">
              <Server className="h-3 w-3 mr-1.5" /> Coming December 2026
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold font-brand tracking-tight mb-6 leading-tight">
              Black Wall <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-500">
                Server OS
              </span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              The Black Wall operating system, rebuilt for servers. Zero-trust by default, container-native, air-gap capable. Purpose-built for critical workloads.
            </p>

            {/* Countdown */}
            <div className="grid grid-cols-4 gap-3 max-w-2xl mx-auto mb-10">
              {[
                { label: "Days", value: days },
                { label: "Hours", value: hours },
                { label: "Minutes", value: minutes },
                { label: "Seconds", value: seconds },
              ].map((c) => (
                <div key={c.label} className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4">
                  <div className="text-3xl md:text-4xl font-bold text-white tabular-nums">{String(c.value).padStart(2, "0")}</div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">{c.label}</div>
                </div>
              ))}
            </div>

            {/* Notify form */}
            <form onSubmit={notify} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribed}
                className="h-12 bg-white/[0.04] border-white/10 text-white placeholder:text-gray-500"
              />
              <Button
                type="submit"
                disabled={subscribed}
                className="h-12 px-6 bg-white text-black hover:bg-white/90 font-bold text-xs uppercase tracking-widest"
              >
                {subscribed ? (
                  <><CheckCircle2 className="h-4 w-4 mr-2" /> Subscribed</>
                ) : (
                  <><Bell className="h-4 w-4 mr-2" /> Notify me</>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative py-16 px-4">
        <div className="container-responsive max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Engineered for critical infrastructure</h2>
            <p className="text-sm text-gray-400 max-w-2xl mx-auto">Every subsystem is designed for zero-trust, high-throughput server workloads.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="h-full bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl rounded-2xl hover:border-blue-500/30 transition-all">
                  <CardContent className="p-6">
                    <div className="h-10 w-10 rounded-xl bg-blue-500/15 flex items-center justify-center mb-4">
                      <f.icon className="h-5 w-5 text-blue-300" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-16 px-4">
        <div className="container-responsive max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">Frequently asked</h2>
          <div className="space-y-3">
            {faq.map((f, i) => (
              <Card key={i} className="bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl">
                <CardContent className="p-5">
                  <h3 className="text-sm font-bold text-white mb-2">{f.q}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{f.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="border-white/10 hover:bg-white/5 text-white">
              <Link to="/blackwall">Back to Black Wall OS <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlackwallServer;