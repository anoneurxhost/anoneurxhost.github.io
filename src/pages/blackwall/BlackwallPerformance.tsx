import { motion } from "framer-motion";
import { Zap, Activity, Battery, Gauge, Rocket, FastForward } from "lucide-react";
import BlackwallLayout from "./BlackwallLayout";

const metrics = [
  { icon: Rocket, label: "Boot Time", value: "3.2s", desc: "Cold boot to fully interactive desktop." },
  { icon: Activity, label: "Memory Usage", value: "340MB", desc: "Base system idle memory footprint." },
  { icon: FastForward, label: "App Launch", value: "<150ms", desc: "Average launch time for native applications." },
];

const BlackwallPerformance = () => (
  <BlackwallLayout>
    <section className="px-4 py-20 min-h-screen">
      <div className="container-responsive max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-amber-500">Benchmarks</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold">Unrivaled Velocity.</h1>
          <p className="mt-6 text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            By shedding decades of legacy overhead and optimizing the scheduler for modern silicon, Black Wall delivers performance that feels instantaneous.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[2rem] border border-white/[0.06] bg-white/[0.02] text-center group hover:bg-amber-500/5 hover:border-amber-500/30 transition-all"
            >
              <div className="h-12 w-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <m.icon className="h-6 w-6 text-amber-500" />
              </div>
              <div className="text-3xl font-bold mb-1 tracking-tight">{m.value}</div>
              <div className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-3">{m.label}</div>
              <p className="text-xs text-slate-500 leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Technical Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <div className="flex gap-4 items-center mb-3">
                <Gauge className="h-5 w-5 text-amber-500" />
                <h3 className="font-bold">Real-time Scheduler</h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Our custom scheduler treats every frame as a deadline. Logic and rendering are prioritized with micro-second precision, ensuring zero-jitter interaction.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <div className="flex gap-4 items-center mb-3">
                <Battery className="h-5 w-5 text-amber-500" />
                <h3 className="font-bold">Aggressive C-State Scaling</h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                By minimizing inter-process context switching and utilizing hardware-level power hints, we increase battery efficiency by up to 40% over standard kernels.
              </p>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="aspect-square rounded-[3rem] bg-gradient-to-br from-amber-600/20 to-transparent border border-amber-500/10 flex items-center justify-center relative overflow-hidden"
          >
            <Zap className="h-32 w-32 text-amber-500/20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.1)_0%,transparent_70%)]" />
          </motion.div>
        </div>
      </div>
    </section>
  </BlackwallLayout>
);

export default BlackwallPerformance;
