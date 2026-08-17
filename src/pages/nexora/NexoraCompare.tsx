import { motion } from "framer-motion";
import { Check, X, Compass } from "lucide-react";
import NexoraLayout from "./NexoraLayout";

const browsers = ["Nexora", "Chrome", "Brave", "Firefox"];
const rows: { feature: string; values: (boolean | string)[] }[] = [
  { feature: "Zero telemetry", values: [true, false, true, false] },
  { feature: "Built-in ad blocker", values: [true, false, true, false] },
  { feature: "Built-in VPN", values: [true, false, false, false] },
  { feature: "Native AI sidebar", values: [true, false, false, false] },
  { feature: "End-to-end sync", values: [true, false, true, true] },
  { feature: "Open source", values: [true, false, true, true] },
  { feature: "Tab suspension", values: [true, "limited", true, true] },
  { feature: "Chrome extensions", values: [true, true, true, false] },
  { feature: "Average RAM (10 tabs)", values: ["480 MB", "1.8 GB", "1.1 GB", "950 MB"] },
];

const Cell = ({ v }: { v: boolean | string }) =>
  typeof v === "boolean" ? (
    v ? <Check className="h-4 w-4 text-emerald-400 mx-auto" /> : <X className="h-4 w-4 text-slate-600 mx-auto" />
  ) : (
    <span className="text-xs text-slate-400">{v}</span>
  );

const NexoraCompare = () => (
  <NexoraLayout>
    <section className="px-4 py-20">
      <div className="container-responsive max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-4">
            <Compass className="h-5 w-5 text-blue-300" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-blue-400">Compare</span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold">How does <span className="italic text-blue-300">Nexora</span> stack up?</h1>
        </motion.div>

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left p-4 text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Feature</th>
                {browsers.map((b) => (
                  <th key={b} className="text-center p-4 text-xs font-bold text-white">{b}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.feature} className="border-b border-white/[0.04] last:border-0">
                  <td className="p-4 text-slate-400">{r.feature}</td>
                  {r.values.map((v, i) => (
                    <td key={i} className="p-4 text-center">
                      <Cell v={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </NexoraLayout>
);

export default NexoraCompare;
