import { motion } from "framer-motion";
import { Github, MessageCircle, Send, Users } from "lucide-react";
import NexoraLayout from "./NexoraLayout";

const channels = [
  { name: "GitHub", desc: "File issues, contribute code, browse the source.", icon: Github, link: "#", color: "from-slate-500 to-slate-700", users: "12k stars" },
  { name: "Discord", desc: "Live chat with the team and other power users.", icon: MessageCircle, link: "#", color: "from-indigo-500 to-purple-500", users: "32k members" },
  { name: "Telegram", desc: "Casual community for tips, tricks and beta builds.", icon: Send, link: "#", color: "from-blue-500 to-cyan-400", users: "8k members" },
  { name: "Reddit", desc: "/r/nexora — discussions, support and showcases.", icon: Users, link: "#", color: "from-orange-500 to-rose-500", users: "21k members" },
];

const NexoraCommunity = () => (
  <NexoraLayout>
    <section className="px-4 py-20">
      <div className="container-responsive max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <span className="text-[10px] uppercase tracking-[0.3em] text-blue-400">Community</span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold">Join the <span className="italic text-blue-300">Nexora</span> family</h1>
          <p className="mt-4 text-sm text-slate-500 max-w-xl mx-auto">Pick your favorite platform — we're active everywhere.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {channels.map((c, i) => (
            <motion.a
              key={c.name}
              href={c.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl p-6 hover:border-blue-500/30 transition-all flex items-center gap-5"
            >
              <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center flex-shrink-0`}>
                <c.icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold">{c.name}</h3>
                  <span className="text-[10px] uppercase tracking-widest text-slate-500">{c.users}</span>
                </div>
                <p className="text-xs text-slate-500">{c.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  </NexoraLayout>
);

export default NexoraCommunity;
