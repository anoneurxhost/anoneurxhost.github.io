import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  LifeBuoy,
  CreditCard,
  UserCog,
  Wrench,
  ShieldCheck,
  Activity,
  ChevronDown,
  Mail,
} from "lucide-react";
import SEO from "@/components/SEO";

export interface FaqItem {
  q: string;
  a: string;
  category: "Billing" | "Accounts" | "Technical" | "Security";
}

export interface ModuleSupportProps {
  module: string;
  path: string;
  title: string;
  description: string;
  intro: string;
  email: string;
  contactPath: string;
  faqs: FaqItem[];
  slaTiers?: { name: string; response: string; note: string }[];
  statusNote?: string;
  theme?: "dark" | "light";
}

const CATEGORY_META = [
  { key: "Billing", icon: CreditCard, blurb: "Invoices, refunds, plans and receipts." },
  { key: "Accounts", icon: UserCog, blurb: "Sign-in, roles, profiles and access." },
  { key: "Technical", icon: Wrench, blurb: "Setup, errors, integrations and APIs." },
  { key: "Security", icon: ShieldCheck, blurb: "Disclosure, data handling and compliance." },
] as const;

const ModuleSupport = ({
  module,
  path,
  title,
  description,
  intro,
  email,
  contactPath,
  faqs,
  slaTiers = [
    { name: "Community", response: "Best effort", note: "Public discussions and issue tracker." },
    { name: "Standard", response: "1 business day", note: "Email support for all account holders." },
    { name: "Priority", response: "2 hours", note: "Business and enterprise agreements." },
  ],
  statusNote = "All systems operational.",
  theme = "dark",
}: ModuleSupportProps) => {
  const dark = theme === "dark";
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [open, setOpen] = useState<string | null>(null);

  const surface = dark ? "border-white/10 bg-white/[0.03] backdrop-blur-2xl" : "border-neutral-200 bg-white";
  const heading = dark ? "text-white" : "text-neutral-900";
  const body = dark ? "text-white/60" : "text-neutral-600";

  const filtered = useMemo(
    () =>
      faqs.filter((f) => {
        if (cat !== "all" && f.category !== cat) return false;
        if (q && !`${f.q} ${f.a} ${f.category}`.toLowerCase().includes(q.toLowerCase())) return false;
        return true;
      }),
    [faqs, q, cat],
  );

  return (
    <>
      <SEO title={title} description={description} path={path} />
      <div className={`min-h-screen pt-24 pb-24 ${dark ? "" : "bg-white"}`}>
        <div className="container-responsive max-w-6xl">
          <header className="max-w-3xl">
            <p className={`text-xs uppercase tracking-[0.25em] ${dark ? "text-primary/80" : "text-neutral-500"}`}>
              {module}
            </p>
            <h1 className={`mt-4 text-4xl md:text-5xl font-bold tracking-tight ${heading}`}>Support</h1>
            <p className={`mt-5 text-lg leading-8 ${body}`}>{intro}</p>
          </header>

          <div className={`mt-10 flex flex-col gap-4 rounded-2xl border p-5 md:flex-row md:items-center ${surface}`}>
            <label className="relative flex flex-1 items-center">
              <Search className={`pointer-events-none absolute left-4 h-4 w-4 ${dark ? "text-white/40" : "text-neutral-400"}`} />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                aria-label={`Search ${module} support articles`}
                placeholder="Search help articles…"
                className={`h-12 w-full rounded-xl border pl-11 pr-4 text-sm outline-none ${
                  dark
                    ? "border-white/10 bg-white/[0.04] text-white placeholder:text-white/30 focus:border-primary/60"
                    : "border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900"
                }`}
              />
            </label>
            <div className="flex flex-wrap gap-2">
              {["all", ...CATEGORY_META.map((c) => c.key)].map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                    cat === c
                      ? dark
                        ? "border-primary/60 bg-primary/15 text-white"
                        : "border-neutral-900 bg-neutral-900 text-white"
                      : dark
                      ? "border-white/10 text-white/60 hover:text-white"
                      : "border-neutral-300 text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  {c === "all" ? "All topics" : c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORY_META.map((c) => (
              <button
                key={c.key}
                onClick={() => setCat(c.key)}
                className={`rounded-2xl border p-5 text-left transition-transform hover:-translate-y-1 ${surface}`}
              >
                <c.icon className={`h-5 w-5 ${dark ? "text-primary" : "text-neutral-900"}`} />
                <h2 className={`mt-3 text-sm font-semibold ${heading}`}>{c.key}</h2>
                <p className={`mt-1.5 text-xs leading-relaxed ${body}`}>{c.blurb}</p>
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            <section>
              <h2 className={`text-xl font-semibold ${heading}`}>Frequently asked</h2>
              <p className={`mt-1 text-xs ${body}`}>
                {filtered.length} {filtered.length === 1 ? "article" : "articles"}
              </p>
              <div className="mt-5 space-y-3">
                {filtered.map((f) => {
                  const isOpen = open === f.q;
                  return (
                    <div key={f.q} className={`overflow-hidden rounded-2xl border ${surface}`}>
                      <button
                        onClick={() => setOpen(isOpen ? null : f.q)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 p-5 text-left"
                      >
                        <span className={`text-sm font-medium ${heading}`}>{f.q}</span>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""} ${body}`}
                        />
                      </button>
                      {isOpen && <p className={`px-5 pb-5 text-sm leading-relaxed ${body}`}>{f.a}</p>}
                    </div>
                  );
                })}
                {filtered.length === 0 && (
                  <div className={`rounded-2xl border p-8 text-center text-sm ${surface} ${body}`}>
                    No articles matched. Try another term or email us directly.
                  </div>
                )}
              </div>
            </section>

            <aside className="space-y-6">
              <div className={`rounded-2xl border p-6 ${surface}`}>
                <div className={`flex items-center gap-2 text-sm font-semibold ${heading}`}>
                  <Activity className="h-4 w-4" /> Service status
                </div>
                <p className={`mt-2 text-sm ${body}`}>{statusNote}</p>
              </div>

              <div className={`rounded-2xl border p-6 ${surface}`}>
                <div className={`flex items-center gap-2 text-sm font-semibold ${heading}`}>
                  <LifeBuoy className="h-4 w-4" /> Response targets
                </div>
                <ul className="mt-4 space-y-3">
                  {slaTiers.map((t) => (
                    <li key={t.name}>
                      <div className={`flex items-center justify-between text-sm ${heading}`}>
                        <span>{t.name}</span>
                        <span className={dark ? "text-primary" : "text-neutral-900"}>{t.response}</span>
                      </div>
                      <p className={`mt-0.5 text-xs ${body}`}>{t.note}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`rounded-2xl border p-6 ${surface}`}>
                <div className={`text-sm font-semibold ${heading}`}>Still stuck?</div>
                <p className={`mt-2 text-sm ${body}`}>
                  Escalate to a human. Include your account email and any error text.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={`mailto:${email}`}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold ${
                      dark ? "bg-primary text-primary-foreground" : "bg-neutral-900 text-white"
                    }`}
                  >
                    <Mail className="h-4 w-4" /> {email}
                  </a>
                  <Link
                    to={contactPath}
                    className={`inline-flex items-center rounded-full border px-5 py-2.5 text-sm font-medium ${
                      dark ? "border-white/15 text-white hover:bg-white/[0.08]" : "border-neutral-300 text-neutral-900 hover:bg-neutral-100"
                    }`}
                  >
                    Contact form
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModuleSupport;
