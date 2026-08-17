import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Sparkles, Search, Folder, Lock, Zap } from "lucide-react";
import notesHero from "@/assets/marketing/notes-hero.jpg";
import PageTransition from "@/components/PageTransition";

const features = [
  { icon: Sparkles, title: "AI Summaries", desc: "Turn long notes into 3-line briefs instantly." },
  { icon: Search, title: "Instant Search", desc: "Semantic search finds the idea, not just the keyword." },
  { icon: Folder, title: "Smart Folders", desc: "Auto-organized notebooks powered by AI." },
  { icon: Lock, title: "End-to-End Encrypted", desc: "Your thoughts stay yours. We can't read them." },
  { icon: Zap, title: "Realtime Sync", desc: "Cross-device sync in under 100ms." },
  { icon: FileText, title: "Markdown First", desc: "Power-user shortcuts and clean export." },
];

const Notes = () => (
  <PageTransition>
    <div className="min-h-screen relative">
      <div className="pointer-events-none absolute top-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[160px]" />

      <section className="px-4 pt-20 pb-12">
        <div className="container mx-auto max-w-7xl grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="bg-blue-500/10 text-blue-300 border-blue-500/30 text-[10px] mb-4">
              <Sparkles className="w-3 h-3 mr-1.5" /> Anoneurx Notes
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              The note-taking app that{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">thinks with you</span>
            </h1>
            <p className="text-base text-gray-400 mb-7 max-w-lg">
              Capture thoughts. Let AI summarize, organize, and recall them — across every device, instantly.
            </p>
            <div className="flex gap-3">
              <Button className="h-11 px-6 bg-blue-500 hover:bg-blue-400 text-white font-bold">Try Free</Button>
              <Button variant="outline" className="h-11 px-6 border-white/15 text-white hover:bg-white/5">See Features</Button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="relative">
            <div className="absolute -inset-10 bg-gradient-to-tr from-blue-500/20 to-purple-500/10 blur-3xl rounded-full" />
            <img src={notesHero} alt="Anoneurx Notes" width={1280} height={768} className="relative rounded-2xl border border-white/10 shadow-2xl" />
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Everything a great note app should be</h2>
            <p className="text-sm text-gray-400">Premium experience, zero clutter.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="h-full bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl rounded-2xl hover:border-blue-500/30 transition">
                  <CardContent className="p-5">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center mb-3">
                      <f.icon className="w-4 h-4 text-blue-400" />
                    </div>
                    <h3 className="text-sm font-bold mb-1">{f.title}</h3>
                    <p className="text-xs text-gray-400">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  </PageTransition>
);

export default Notes;
