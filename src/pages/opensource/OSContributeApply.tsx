import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, CheckCircle2 } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import PageHero from "@/components/PageHero";
import BreadcrumbTrail from "@/components/site/BreadcrumbTrail";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";

const AREAS = [
  "Frontend",
  "Backend",
  "Systems / OS",
  "Security",
  "Docs & DX",
  "Design",
  "Data / ML",
  "Testing & CI",
];

const STAGES = ["Application received", "Maintainer match", "First issue assigned", "Onboarded"];

const OSContributeApply = () => {
  const [submitted, setSubmitted] = useState(false);
  const [areas, setAreas] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", email: "", github: "", project: "", experience: "" });

  const toggleArea = (a: string) =>
    setAreas((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Name and email are required.");
      return;
    }
    trackEvent("opensource_contributor_apply", { areas: areas.join(","), project: form.project });
    setSubmitted(true);
    toast.success("Application received — a maintainer will be in touch.");
  };

  return (
    <PageTransition>
      <div className="min-h-screen pb-16">
        <PageHero
          eyebrow="Open Source"
          title="Apply to Contribute"
          intro="Tell us what you want to work on and we'll match you with a maintainer and a first issue."
          icon={UserPlus}
        />

        <div className="container-custom">
          <BreadcrumbTrail
            items={[
              { name: "Open Source", to: "/opensource" },
              { name: "Contribute", to: "/opensource/contribute" },
              { name: "Apply" },
            ]}
          />
        </div>

        <section className="container-custom mb-10" aria-labelledby="stages">
          <h2 id="stages" className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
            What happens next
          </h2>
          <ol className="grid gap-3 sm:grid-cols-4">
            {STAGES.map((s, i) => (
              <li
                key={s}
                className={`rounded-xl border p-3 text-sm ${
                  submitted && i === 0
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-border/60 bg-card/30 text-muted-foreground"
                }`}
              >
                <span className="mr-1.5 text-xs opacity-70">{i + 1}.</span>
                {s}
              </li>
            ))}
          </ol>
        </section>

        <section className="container-custom max-w-2xl">
          {submitted ? (
            <div className="rounded-2xl border border-primary/40 bg-primary/5 p-8 text-center">
              <CheckCircle2 className="mx-auto mb-3 h-8 w-8 text-primary" aria-hidden />
              <h2 className="text-xl font-semibold mb-2">Application received</h2>
              <p className="text-sm text-muted-foreground mb-5">
                A maintainer reviews contributor applications twice a week. In the meantime, browse the
                good first issues and read the contribution workflow.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/opensource/contribute" className="text-sm text-primary hover:underline">
                  Contribution workflow
                </Link>
                <Link to="/opensource/projects" className="text-sm text-primary hover:underline">
                  Browse projects
                </Link>
                <Link to="/opensource/support" className="text-sm text-primary hover:underline">
                  Contributor support
                </Link>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md p-6"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="github">GitHub username</Label>
                  <Input
                    id="github"
                    value={form.github}
                    onChange={(e) => setForm({ ...form, github: e.target.value })}
                    placeholder="octocat"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="project">Project you want to work on</Label>
                  <Input
                    id="project"
                    value={form.project}
                    onChange={(e) => setForm({ ...form, project: e.target.value })}
                    placeholder="Any / project name"
                  />
                </div>
              </div>

              <fieldset className="space-y-2">
                <legend className="text-sm font-medium">Areas of interest</legend>
                <div className="flex flex-wrap gap-2">
                  {AREAS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => toggleArea(a)}
                      aria-pressed={areas.includes(a)}
                      className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                        areas.includes(a)
                          ? "border-primary/50 bg-primary/15 text-primary"
                          : "border-border/60 text-muted-foreground hover:border-primary/30"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="space-y-1.5">
                <Label htmlFor="experience">Relevant experience</Label>
                <Textarea
                  id="experience"
                  rows={4}
                  value={form.experience}
                  onChange={(e) => setForm({ ...form, experience: e.target.value })}
                  placeholder="Projects, languages, previous open source work…"
                />
              </div>

              <Button type="submit" className="w-full sm:w-auto">
                Submit application
              </Button>
            </form>
          )}
        </section>
      </div>
    </PageTransition>
  );
};

export default OSContributeApply;
