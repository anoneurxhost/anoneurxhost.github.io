import { Link } from "react-router-dom";
import { GitPullRequest, ArrowRight, CheckCircle2, BookOpen, Shield, Award, Layers, ListChecks, Users } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import PageHero from "@/components/PageHero";
import BreadcrumbTrail from "@/components/site/BreadcrumbTrail";

const STEPS = [
  { title: "Pick an issue", body: "Start with a good first issue on any Anoneurx repository — each one lists scope, files and a mentor." },
  { title: "Discuss the approach", body: "Comment with your plan. A maintainer confirms direction before you write code." },
  { title: "Open a pull request", body: "Small, focused commits with tests. CI must be green before review starts." },
  { title: "Review & iterate", body: "Expect one to three review rounds. Reviewers explain the why, not just the what." },
  { title: "Merge & credit", body: "Merged work lands you on the contributors page and counts toward rewards." },
];

const RESOURCES = [
  { to: "/opensource/contributions/how-to-contribute", label: "How to contribute", body: "Setup, branching model and commit conventions.", icon: BookOpen },
  { to: "/opensource/contributions/architecture", label: "Architecture", body: "How the codebases are structured before you dive in.", icon: Layers },
  { to: "/opensource/contributions/review-progress", label: "Review progress", body: "Where your pull request sits in the queue.", icon: ListChecks },
  { to: "/opensource/contributions/code-of-conduct", label: "Code of conduct", body: "The standards every contributor agrees to.", icon: Users },
  { to: "/opensource/contributions/security", label: "Security policy", body: "Coordinated disclosure for vulnerabilities.", icon: Shield },
  { to: "/opensource/contributions/rewards", label: "Rewards", body: "Sponsorship, swag and reference letters for sustained work.", icon: Award },
  { to: "/opensource/contributors", label: "Contributors", body: "Everyone who has shipped to Anoneurx open source.", icon: Users },
];

const OSContribute = () => (
  <PageTransition>
    <div className="min-h-screen pb-16">
      <PageHero
        eyebrow="Open Source"
        title="Contribute to Anoneurx Open Source"
        intro="Good first issues, a documented workflow, real reviews and credit for the work you ship."
        icon={GitPullRequest}
      />

      <div className="container-custom">
        <BreadcrumbTrail items={[{ name: "Open Source", to: "/opensource" }, { name: "Contribute" }]} />
      </div>

      <section className="container-custom mb-12">
        <Link
          to="/opensource/contribute/apply"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Apply to the contributor program
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </section>

      <section className="container-custom mb-14" aria-labelledby="workflow">
        <h2 id="workflow" className="text-xl font-semibold mb-5">
          The contribution workflow
        </h2>
        <ol className="relative space-y-5 border-l border-border/60 pl-6">
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative">
              <span className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full border border-primary/40 bg-background text-[11px] text-primary">
                {i + 1}
              </span>
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-custom mb-14" aria-labelledby="resources">
        <h2 id="resources" className="text-xl font-semibold mb-4">
          Everything a contributor needs
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((r) => {
            const Icon = r.icon;
            return (
              <Link
                key={r.to}
                to={r.to}
                className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md p-5 transition-colors hover:border-primary/40"
              >
                <Icon className="mb-3 h-5 w-5 text-primary" aria-hidden />
                <h3 className="font-semibold mb-1">{r.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.body}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="container-custom" aria-labelledby="expect">
        <h2 id="expect" className="text-xl font-semibold mb-4">
          What you get
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {[
            "A named maintainer as a reviewer for every pull request",
            "Public credit on the contributors page",
            "Rewards and sponsorship for sustained contributions",
            "University credit on the Open Source track",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/opensource/support" className="text-sm text-primary hover:underline">
            Contributor support
          </Link>
          <Link to="/university/opensource" className="text-sm text-primary hover:underline">
            Open Source at Anoneurx University
          </Link>
        </div>
      </section>
    </div>
  </PageTransition>
);

export default OSContribute;
