import { motion } from "framer-motion";
import NexoraLayout from "./NexoraLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is Nexora completely free?",
    answer: "Yes, Nexora is free to download and use. We believe privacy and performance are fundamental rights to navigating the web, not premium features."
  },
  {
    question: "What rendering engine does Nexora use?",
    answer: "Nexora uses a highly optimized, stripped-down branch of the Blink engine bundled with our proprietary NexEngine compositing framework."
  },
  {
    question: "How do Smart Workspaces differ from normal browser profiles?",
    answer: "Smart Workspaces can be switched universally without launching a separate window. They instantly freeze unused workspaces to save RAM and maintain strict context isolation of cookies and histories."
  },
  {
    question: "Can I use Chrome extensions?",
    answer: "Yes, Nexora has full compatibility with the Chrome Web Store. Just navigate there and install your favorite extensions."
  },
  {
    question: "What data does Nexora collect?",
    answer: "None. Nexora incorporates zero telemetry and doesn't record your usage. Optional crash logs are strictly opt-in."
  }
];

const NexoraFAQ = () => (
  <NexoraLayout>
    <section className="px-4 py-20">
      <div className="container-responsive max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <span className="text-[10px] uppercase tracking-[0.3em] text-blue-400">FAQ</span>
          <h1 className="mt-3 text-4xl font-bold">Frequently Asked <span className="italic text-blue-300">Questions</span></h1>
          <p className="mt-4 text-sm text-slate-500">
            Find answers about Nexora's core functionality and features.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-white/10 bg-white/5 rounded-xl px-4">
                <AccordionTrigger className="text-left font-semibold text-white hover:text-blue-400 transition-colors py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 text-sm leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  </NexoraLayout>
);

export default NexoraFAQ;
