import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Search } from "lucide-react";
import { useState, useMemo } from "react";
import BlackwallLayout from "./BlackwallLayout";

const groups: { category: string; items: { q: string; a: string }[] }[] = [
  {
    category: "General",
    items: [
      { q: "Is Black Wall free?", a: "Yes — Black Wall OS is completely free and open source under the MIT license. Download, modify and redistribute without restriction." },
      { q: "Is it Linux based?", a: "No. Black Wall is a brand-new operating system built from scratch in Rust, with its own microkernel. A Linux compatibility layer lets you run most Linux apps natively." },
      { q: "What is the current release?", a: "v1.0.0 'Obsidian' is the latest stable release. We ship updates weekly through atomic, signed packages." },
      { q: "Who is Black Wall for?", a: "Privacy-focused users, developers, gamers, and anyone tired of choosing between performance and freedom." },
    ],
  },
  {
    category: "Installation",
    items: [
      { q: "Can I dual boot?", a: "Absolutely. Black Wall plays nicely with existing Windows, macOS and Linux installs. The installer guides you through partitioning and bootloader setup." },
      { q: "What are the system requirements?", a: "4 GB RAM minimum (8 GB recommended), 20 GB free disk space, and a 64-bit x86_64 or ARM64 CPU." },
      { q: "Can I run it in a virtual machine?", a: "Yes — VirtualBox, VMware, QEMU, and UTM are all officially supported with pre-built VM images." },
      { q: "How do I verify my download?", a: "Each ISO ships with a SHA256 checksum and a GPG signature. The download page shows the expected hash." },
    ],
  },
  {
    category: "Security & Privacy",
    items: [
      { q: "Is it secure?", a: "Security is the founding principle. Memory-safe Rust kernel, capability-based sandboxing for every app, signed atomic updates and zero telemetry by default." },
      { q: "Does Black Wall collect data?", a: "No. There is zero telemetry. Optional crash reports are opt-in and fully anonymized." },
      { q: "How does the sandbox work?", a: "Every app runs inside a capability container. Apps must explicitly request access to files, the network, the camera, etc. — no surprise permissions." },
      { q: "Is the source code auditable?", a: "Yes — the entire OS is open source on GitHub under MIT. Independent security audits are published twice a year." },
    ],
  },
  {
    category: "Performance & Gaming",
    items: [
      { q: "Does it support gaming?", a: "Yes — Black Wall ships with Vulkan drivers, a Proton compatibility layer, low-latency scheduler and full controller support out of the box." },
      { q: "How fast does it boot?", a: "Cold boot averages 3.2 seconds on modern SSDs and 5.8 seconds on older HDDs." },
      { q: "What is the RAM footprint?", a: "Idle RAM usage sits at ~480 MB, leaving plenty of headroom for your apps." },
      { q: "Are GPUs supported?", a: "AMD and Intel GPUs work out of the box. NVIDIA requires a one-click proprietary driver install due to licensing." },
    ],
  },
  {
    category: "Updates & Support",
    items: [
      { q: "How do updates work?", a: "Updates are atomic and signed via our blockchain identity layer. You can roll back any update with one click if something breaks." },
      { q: "How can I get help?", a: "Join our Discord, post on the community forum, or open an issue on GitHub. Critical security issues should be reported via security@blackwall.os." },
      { q: "Will my apps keep working after updates?", a: "Yes. Black Wall guarantees binary compatibility within a major version. Major upgrades are seamless and reversible." },
      { q: "Is there commercial support?", a: "Yes — enterprise support contracts with SLA-backed response times are available through Anoneurx." },
    ],
  },
];

const BlackwallFAQ = () => {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    if (!query.trim()) return groups;
    const q = query.toLowerCase();
    return groups
      .map((g) => ({ ...g, items: g.items.filter((i) => i.q.toLowerCase().includes(q) || i.a.toLowerCase().includes(q)) }))
      .filter((g) => g.items.length > 0);
  }, [query]);

  return (
    <BlackwallLayout>
      <section className="px-4 py-20">
        <div className="container-responsive max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-4">
              <HelpCircle className="h-5 w-5 text-blue-300" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-blue-400">FAQ</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold">
              Common <span className="italic text-blue-300">Questions</span>
            </h1>
            <p className="mt-4 text-sm text-slate-500">Everything you need to know about Black Wall OS.</p>
          </motion.div>

          <div className="relative mb-8">
            <Search className="h-4 w-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the FAQ…"
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/40 transition-colors"
            />
          </div>

          {filtered.map((g) => (
            <div key={g.category} className="mb-8">
              <h2 className="text-[10px] uppercase tracking-[0.3em] text-blue-400 mb-3 px-2">{g.category}</h2>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl p-2">
                <Accordion type="single" collapsible className="w-full">
                  {g.items.map((f, i) => (
                    <AccordionItem key={i} value={`${g.category}-${i}`} className="border-white/[0.06] last:border-0">
                      <AccordionTrigger className="px-5 py-4 text-sm font-semibold text-white hover:no-underline hover:text-blue-300 text-left">
                        {f.q}
                      </AccordionTrigger>
                      <AccordionContent className="px-5 pb-5 text-sm text-slate-400 leading-relaxed">{f.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center text-slate-500 text-sm py-12">No results for "{query}"</div>
          )}
        </div>
      </section>
    </BlackwallLayout>
  );
};

export default BlackwallFAQ;
