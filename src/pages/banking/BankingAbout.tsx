import { motion } from "framer-motion";
import { Shield, Zap, Heart, Users } from "lucide-react";

const values = [
  { icon: Heart, title: "Customer Centric", desc: "Every feature is built based on real feedback from builders and creators.", color: "from-amber-500 to-orange-400" },
  { icon: Shield, title: "Uncompromising Security", desc: "Your financial safety is our highest priority, using bank-grade encryption.", color: "from-blue-500 to-indigo-400" },
  { icon: Users, title: "Community Owned", desc: "Shaped by the Anoneurx community to serve the next generation of builders.", color: "from-emerald-500 to-teal-400" },
];

const BankingAbout = () => (
  <section className="px-4 py-20">
    <div className="container-responsive max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-4">
          <Zap className="h-5 w-5 text-amber-300" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400">About Anoneurx Bank</span>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold">
          Banking for the <span className="italic text-amber-300">Modern Builder</span>
        </h1>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl p-8 md:p-12 mb-12 space-y-5 text-slate-300">
        <p className="text-lg leading-relaxed">
          Standard banking was built for a world that <span className="text-white font-semibold">no longer exists</span>.
        </p>
        <p className="text-base text-slate-400 leading-relaxed">
          Anoneurx Bank is a clean-sheet redesign of financial services. We've stripped away the paperwork, the hidden fees, and the slow legacy systems to build a platform that moves as fast as you do.
        </p>
        <p className="text-base text-slate-400 leading-relaxed">
          Whether you're a freelancer, a startup founder, or a creative professional, our mission is to provide you with the tools to manage, grow, and secure your capital with zero friction.
        </p>
      </motion.div>

      <h2 className="text-2xl font-bold mb-6 text-center">Our values</h2>
      <div className="grid sm:grid-cols-3 gap-5">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl p-6 text-center"
          >
            <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-4 mx-auto`}>
              <v.icon className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-base font-bold mb-2">{v.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BankingAbout;
