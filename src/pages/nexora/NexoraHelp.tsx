import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { HelpCircle, Search } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import NexoraLayout from "./NexoraLayout";

const faqs = [
  { cat: "General", q: "Is Nexora really free?", a: "Yes, Nexora is 100% free and will always be. No ads, no premium tiers blocking core features." },
  { cat: "General", q: "Is Nexora open source?", a: "Yes — the entire codebase is MIT licensed and available on GitHub." },
  { cat: "General", q: "Which Chromium version is Nexora based on?", a: "Nexora uses a hardened fork of Chromium 124, with security and privacy patches applied weekly." },
  { cat: "Crashes", q: "Nexora won't start after an update", a: "Try launching with --safe-mode. If that works, reset your profile from Settings → Advanced → Reset profile." },
  { cat: "Crashes", q: "Pages are crashing randomly", a: "This is usually an extension conflict. Disable extensions one-by-one to identify the culprit." },
  { cat: "Updates", q: "How do I update Nexora?", a: "Updates download in the background and apply on next restart. You can also force an update from Settings → About → Check for updates." },
  { cat: "Updates", q: "Can I disable auto-updates?", a: "Yes, but we strongly recommend against it. Updates often contain critical security fixes." },
  { cat: "Privacy", q: "Does Nexora collect any data?", a: "No telemetry. No tracking. Optional crash reports are anonymized and opt-in." },
  { cat: "Privacy", q: "How is my sync data protected?", a: "Sync data is end-to-end encrypted with a key derived from your password. We literally can't read it." },
];

const NexoraHelp = () => {
  const [query, setQuery] = useState("");
  const grouped = useMemo(() => {
    const filtered = faqs.filter((f) => !query || f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase()));
    const out: Record<string, typeof faqs> = {};
    filtered.forEach((f) => { (out[f.cat] = out[f.cat] || []).push(f); });
    return out;
  }, [query]);

  return (
    <NexoraLayout>
      <section className="px-4 py-20">
        <div className="container-responsive max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-4">
              <HelpCircle className="h-5 w-5 text-blue-300" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-blue-400">Help Center</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold">How can we <span className="italic text-blue-300">help?</span></h1>
          </motion.div>

          <div className="relative mb-8">
            <Search className="h-4 w-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the help center…" className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/40" />
          </div>

          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat} className="mb-8">
              <h2 className="text-[10px] uppercase tracking-[0.3em] text-blue-400 mb-3 px-2">{cat}</h2>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl p-2">
                <Accordion type="single" collapsible>
                  {items.map((f, i) => (
                    <AccordionItem key={i} value={`${cat}-${i}`} className="border-white/[0.06] last:border-0">
                      <AccordionTrigger className="px-5 py-4 text-sm font-semibold text-white hover:no-underline hover:text-blue-300 text-left">{f.q}</AccordionTrigger>
                      <AccordionContent className="px-5 pb-5 text-sm text-slate-400 leading-relaxed">{f.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          ))}
        </div>
      </section>
    </NexoraLayout>
  );
};

export default NexoraHelp;
