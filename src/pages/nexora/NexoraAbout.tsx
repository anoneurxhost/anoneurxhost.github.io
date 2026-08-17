import { motion } from "framer-motion";
import { Compass, Heart, Globe, Users } from "lucide-react";
import NexoraLayout from "./NexoraLayout";

const values = [
  { icon: Heart, title: "User First", desc: "We work for users — not advertisers, not data brokers, not investors.", color: "from-rose-500 to-pink-400" },
  { icon: Globe, title: "Open Web", desc: "We believe the web should stay open, interoperable and free.", color: "from-blue-500 to-cyan-400" },
  { icon: Users, title: "Community Driven", desc: "Built in the open, shaped by feedback, owned by everyone.", color: "from-emerald-500 to-teal-400" },
];

const NexoraAbout = () => (
  <NexoraLayout>
    <section className="px-4 py-20">
      <div className="container-responsive max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-4">
            <Compass className="h-5 w-5 text-blue-300" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-blue-400">About</span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold">
            Why <span className="italic text-blue-300">Nexora</span> exists
          </h1>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl p-8 md:p-12 mb-12 space-y-5 text-slate-300">
          <p className="text-lg leading-relaxed">
            We grew tired of browsers built around <span className="text-white font-semibold">advertising</span>, telemetry and lock-in.
          </p>
          <p className="text-base text-slate-400 leading-relaxed">
            Nexora is a clean-room browser built around three uncompromising ideas: speed, privacy and freedom.
            No ads. No trackers. No corporate overlords. Just a fast, modern browser that works for you.
          </p>
          <p className="text-base text-slate-400 leading-relaxed">
            We're a small team backed by <span className="text-white font-semibold">Anoneurx</span>, a community of engineers
            who care about the open web. Today, Nexora is used by hundreds of thousands of people across more than 70 countries.
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
  </NexoraLayout>
);

export default NexoraAbout;
