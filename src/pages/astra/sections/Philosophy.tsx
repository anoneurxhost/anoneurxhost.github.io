import { Compass, ShieldCheck, Scale, Eye, Wrench } from "lucide-react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Reveal, SectionHeader, AstraCard } from "../AstraUi";

const PRINCIPLES = [
  {
    icon: Scale,
    title: "Honesty before hype",
    body: "Published progress equals measured progress. If it is not reproducible, it does not exist.",
  },
  {
    icon: ShieldCheck,
    title: "Consent is structural",
    body: "Learning requires permission. Consent is enforced at runtime, stored with provenance and revocable at any time.",
  },
  {
    icon: Compass,
    title: "Capability before scale",
    body: "The loop must work at 20B before anyone talks about 1T. Size is earned, never assumed.",
  },
  {
    icon: Eye,
    title: "Transparency by default",
    body: "Architecture, blockers and evaluation are public. Black boxes are for adversaries, not for the people who trust the system.",
  },
  {
    icon: Wrench,
    title: "Self-improvement must be safe",
    body: "The loop can change itself, but never beyond guardrails, alignment and human review. Improvement happens inside a box.",
  },
];

const Philosophy = () => (
  <section className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
    <div className="container-responsive">
      <SectionHeader
        eyebrow="11 · Philosophy"
        title={
          <>
            The rules the project{" "}
            <span className="text-[#38BDF8]">won't break</span>
          </>
        }
        subtitle="Five principles that constrain every technical decision. If something conflicts with these, the something changes."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PRINCIPLES.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06}>
            <AstraCard className="h-full">
              <CardHeader>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-[#7DD3FC]">
                  <p.icon className="h-5 w-5" />
                </span>
                <CardTitle className="pt-4 text-lg text-white">
                  {p.title}
                </CardTitle>
                <CardDescription className="text-gray-300">
                  {p.body}
                </CardDescription>
              </CardHeader>
            </AstraCard>
          </Reveal>
        ))}
        <Reveal delay={0.3}>
          <AstraCard hover={false} className="flex h-full items-center justify-center border-dashed p-7 text-center">
            <p className="text-sm text-[#5C6474]">
              Rule zero: the loop serves its users.
              <br />
              Everything else is an implementation detail.
            </p>
          </AstraCard>
        </Reveal>
      </div>
    </div>
  </section>
);

export default Philosophy;