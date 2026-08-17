import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import PageHero from "@/components/PageHero";
import BreadcrumbTrail from "@/components/site/BreadcrumbTrail";
import ModuleContactSection from "@/components/site/ModuleContactSection";
import { UNIVERSITY_MODULES, UNIVERSITY_MODULE_LIST } from "@/config/universityModules";

/** Shared layout for the /university/{opensource,blackwall,pay,cloud} pages. */
const UniversityModulePage = ({ moduleKey }: { moduleKey: string }) => {
  const config = UNIVERSITY_MODULES[moduleKey];
  if (!config) return null;

  const others = UNIVERSITY_MODULE_LIST.filter((m) => m.key !== config.key);

  return (
    <PageTransition>
      <div className="min-h-screen pb-16">
        <PageHero eyebrow={config.eyebrow} title={config.title} intro={config.intro} icon={config.icon} />

        <div className="container-custom">
          <BreadcrumbTrail items={config.breadcrumb} />
        </div>

        <section className="container-custom mb-14" aria-labelledby="about">
          <h2 id="about" className="text-xl font-semibold mb-3">
            About the track
          </h2>
          <p className="max-w-3xl text-muted-foreground leading-relaxed">{config.about}</p>
          <Link
            to={config.productLink.to}
            className="mt-5 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
          >
            {config.productLink.label}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </section>

        <section className="container-custom mb-14" aria-labelledby="programs">
          <h2 id="programs" className="text-xl font-semibold mb-4">
            Programs
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {config.programs.map((p) => (
              <article key={p.title} className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md p-5">
                <span className="mb-2 inline-block rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-primary">
                  {p.level}
                </span>
                <h3 className="font-semibold mb-1.5">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="container-custom mb-14" aria-labelledby="engage">
          <h2 id="engage" className="text-xl font-semibold mb-4">
            How students engage
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {config.engage.map((e) => (
              <div key={e.title} className="rounded-2xl border border-border/60 bg-card/30 p-5">
                <h3 className="font-semibold mb-1.5">{e.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{e.body}</p>
              </div>
            ))}
          </div>
        </section>

        <ModuleContactSection
          module={`${config.title.split(" at ")[0]} — University`}
          email={config.contact.email}
          responseTime={config.contact.responseTime}
          escalation={config.contact.escalation}
          links={[
            { label: "University", to: "/university" },
            { label: "Faculty", to: "/faculty" },
            { label: "University contact", to: "/university/contact" },
          ]}
        />

        <section className="container-custom" aria-labelledby="other-tracks">
          <h2 id="other-tracks" className="text-xl font-semibold mb-4">
            Other university tracks
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {others.map((m) => (
              <Link
                key={m.key}
                to={m.path}
                className="rounded-2xl border border-border/60 bg-card/30 p-5 transition-colors hover:border-primary/40"
              >
                <h3 className="font-semibold mb-1">{m.title.split(" at ")[0]}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{m.intro}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default UniversityModulePage;
