import { Link } from "react-router-dom";
import { GitPullRequest, GraduationCap, BookOpen, ArrowRight } from "lucide-react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Reveal, SectionHeader, AstraCard } from "../AstraUi";

const WAYS = [
  {
    icon: BookOpen,
    to: "/lab/problems",
    title: "Open a research problem",
    body: "The modules above are real, active research problems. Claim one, work on it, publish results.",
  },
  {
    icon: GraduationCap,
    to: "/lab/apply",
    title: "Join the Lab",
    body: "Apply to the Anoneurx Lab as a student researcher and work directly on ASTRA's open questions.",
  },
  {
    icon: GitPullRequest,
    to: "/opensource/contribute",
    title: "Contribute code & critique",
    body: "The evaluation tooling, memory interfaces and loop code will be open. Review, build and challenge.",
  },
];

const Contribution = () => (
  <section className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
    <div className="container-responsive">
      <SectionHeader
        eyebrow="13 · Contribute"
        title={
          <>
            Help build <span className="text-[#38BDF8]">something honest</span>
          </>
        }
        subtitle="ASTRA needs researchers, engineers and critical reviewers. If you believe self-learning AI should be transparent, there is a seat at this table."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {WAYS.map((w, i) => (
          <Reveal key={w.title} delay={i * 0.08}>
            <Link to={w.to} className="group block h-full">
              <AstraCard className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-[#7DD3FC]">
                      <w.icon className="h-5 w-5" />
                    </span>
                    <ArrowRight className="h-4 w-4 text-[#5C6474] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#7DD3FC]" />
                  </div>
                  <CardTitle className="pt-4 text-lg text-white">
                    {w.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    {w.body}
                  </CardDescription>
                </CardHeader>
              </AstraCard>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Contribution;