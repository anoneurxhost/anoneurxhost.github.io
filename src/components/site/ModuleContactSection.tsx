import { Link } from "react-router-dom";
import { Mail, MessageSquare, Clock, ShieldAlert, ArrowRight, type LucideIcon } from "lucide-react";

export interface ModuleContactChannel {
  icon?: LucideIcon;
  label: string;
  value: string;
  href?: string;
  note?: string;
}

export interface ModuleContactSectionProps {
  module: string;
  email: string;
  responseTime: string;
  escalation?: string;
  channels?: ModuleContactChannel[];
  links?: { label: string; to: string }[];
  className?: string;
}

/**
 * Reusable contact / support block used by every module (Open Source,
 * University, Black Wall, Pay, Cloud) so details and layout stay consistent.
 */
const ModuleContactSection = ({
  module,
  email,
  responseTime,
  escalation,
  channels = [],
  links = [],
  className = "",
}: ModuleContactSectionProps) => {
  const base: ModuleContactChannel[] = [
    { icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
    { icon: Clock, label: "Response time", value: responseTime },
    ...(escalation ? [{ icon: ShieldAlert, label: "Escalation", value: escalation }] : []),
  ];
  const all = [...base, ...channels];

  return (
    <section className={`py-14 ${className}`} aria-labelledby={`contact-${module.replace(/\s+/g, "-").toLowerCase()}`}>
      <div className="container-custom">
        <h2 id={`contact-${module.replace(/\s+/g, "-").toLowerCase()}`} className="text-2xl md:text-3xl font-bold mb-2">
          Contact {module}
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Talk to the {module} team directly. Every request is triaged by the people who build and
          operate it — no generic queue.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {all.map((c) => {
            const Icon = c.icon ?? MessageSquare;
            const body = (
              <div className="h-full rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md p-5 transition-colors hover:border-primary/40">
                <Icon className="mb-3 h-5 w-5 text-primary" aria-hidden />
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{c.label}</p>
                <p className="font-medium break-words">{c.value}</p>
                {c.note && <p className="mt-1 text-xs text-muted-foreground">{c.note}</p>}
              </div>
            );
            return c.href ? (
              <a key={c.label + c.value} href={c.href} className="block">
                {body}
              </a>
            ) : (
              <div key={c.label + c.value}>{body}</div>
            );
          })}
        </div>

        {links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-4 py-2 text-sm transition-colors hover:border-primary/50 hover:text-primary"
              >
                {l.label}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ModuleContactSection;
