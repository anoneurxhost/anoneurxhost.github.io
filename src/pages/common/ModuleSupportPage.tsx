import { useParams } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import PageHero from "@/components/PageHero";
import BreadcrumbTrail from "@/components/site/BreadcrumbTrail";
import ModuleContactSection from "@/components/site/ModuleContactSection";
import { MODULE_SUPPORT, type ModuleSupportConfig } from "@/config/moduleSupport";

/**
 * One layout for every module contact / support page. The route passes a config
 * key so metadata (handled centrally in RouteSEO) and content stay unique.
 */
const ModuleSupportPage = ({ configKey }: { configKey?: string }) => {
  const params = useParams();
  const key = configKey ?? params.moduleKey ?? "";
  const config: ModuleSupportConfig | undefined = MODULE_SUPPORT[key];

  if (!config) return null;

  return (
    <PageTransition>
      <div className="min-h-screen pb-16">
        <PageHero eyebrow={config.eyebrow} title={config.title} intro={config.intro} icon={config.icon} />

        <div className="container-custom">
          <BreadcrumbTrail items={config.breadcrumb} />
        </div>

        <section className="container-custom" aria-labelledby="topics">
          <h2 id="topics" className="text-xl font-semibold mb-4">
            What we help with
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {config.topics.map((t) => (
              <div
                key={t.title}
                className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md p-5"
              >
                <h3 className="font-semibold mb-1.5">{t.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
        </section>

        <ModuleContactSection
          module={config.module}
          email={config.email}
          responseTime={config.responseTime}
          escalation={config.escalation}
          channels={config.channels}
          links={config.links}
        />
      </div>
    </PageTransition>
  );
};

export default ModuleSupportPage;
