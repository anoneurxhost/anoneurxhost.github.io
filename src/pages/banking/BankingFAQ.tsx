import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const faqs = [
  { q: "Is Anoneurx Bank a real bank?", a: "Anoneurx Bank is a digital banking platform partnered with chartered, regulated banks. Deposits are held with FDIC-equivalent partners and insured up to $250,000." },
  { q: "Is there a monthly fee?", a: "No. Standard accounts are completely free. We offer an optional Premium tier with metal cards, higher limits, and travel perks." },
  { q: "How long does signup take?", a: "Most customers are approved in under 2 minutes with an instant virtual card. A physical card arrives in 5–7 days." },
  { q: "Can I use my card abroad?", a: "Yes. Use your card in 180+ countries with zero foreign transaction fees and real-time mid-market FX." },
  { q: "How do you protect my money?", a: "256-bit encryption, mandatory MFA, biometric login, fraud monitoring, and SOC 2 Type II compliance." },
  { q: "Do you support crypto?", a: "Yes — buy, sell, and hold BTC, ETH, USDC, and 30+ assets directly in your account." },
  { q: "Can I send international wires?", a: "Yes — instant SEPA, ACH, SWIFT, and FX transfers in over 30 currencies." },
  { q: "How do I close my account?", a: "Open Settings → Account → Close Account. Your remaining balance is transferred out instantly, no questions asked." },
];

const BankingFAQ = () => (
  <section className="px-4 py-16">
    <div className="container mx-auto max-w-3xl">
      <div className="text-center mb-10">
        <Badge className="bg-amber-500/10 text-amber-300 border-amber-500/30 text-[10px] mb-3">FAQ</Badge>
        <h1 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h1>
      </div>
      <Accordion type="single" collapsible className="space-y-2">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="bg-white/[0.03] border border-white/[0.08] backdrop-blur-2xl rounded-xl px-4">
            <AccordionTrigger className="text-sm font-medium text-white text-left hover:no-underline">{f.q}</AccordionTrigger>
            <AccordionContent className="text-xs text-gray-400 leading-relaxed pb-4">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default BankingFAQ;
