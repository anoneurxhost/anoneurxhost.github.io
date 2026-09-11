import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import SEO from "@/components/SEO";
import { faqItems } from "./data";

const LabFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen px-4 py-14 md:py-20">
      <SEO
        title="FAQ"
        description="Frequently asked questions about Anoneurx Lab: research problems, joining the lab, eligibility, mentorship, publishing, and open source research."
        path="/lab/faq"
        keywords="anoneurx lab faq, research lab questions, how to join, student eligibility, research mentorship, publishing research, open source research faq"
      />
      <div className="mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-bold">FAQ</span>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Frequently Asked Questions</h1>
        </motion.div>

        <div className="mt-12 space-y-3">
          {faqItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="rounded-xl border border-white/5 bg-black/10 backdrop-blur-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-sm font-bold">{item.question}</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5 pl-12">
                  <p className="text-gray-400 text-sm leading-relaxed">{item.answer}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LabFaq;
