import { useState } from "react";
import { z } from "zod";
import { Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import SEO from "@/components/SEO";

export interface ContactChannel {
  label: string;
  email: string;
  note?: string;
}

export interface ModuleContactProps {
  /** Module name, e.g. "Anoneurx University" */
  module: string;
  /** Primary mailbox */
  email: string;
  path: string;
  title: string;
  description: string;
  intro: string;
  channels: ContactChannel[];
  responseTime?: string;
  location?: string;
  theme?: "dark" | "light";
}

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100, "Name is too long"),
  email: z.string().trim().email("Enter a valid email address").max(255),
  subject: z.string().trim().min(3, "Add a short subject").max(150),
  message: z.string().trim().min(10, "Tell us a little more").max(1500, "Message is too long"),
});

const ModuleContact = ({
  module,
  email,
  path,
  title,
  description,
  intro,
  channels,
  responseTime = "Within 1–2 business days",
  location = "Anoneurx HQ · Remote-first",
  theme = "dark",
}: ModuleContactProps) => {
  const dark = theme === "dark";
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const surface = dark
    ? "border-white/10 bg-white/[0.03] backdrop-blur-2xl"
    : "border-neutral-200 bg-white";
  const heading = dark ? "text-white" : "text-neutral-900";
  const body = dark ? "text-white/60" : "text-neutral-600";
  const field = dark
    ? "border-white/10 bg-white/[0.04] text-white placeholder:text-white/30 focus:border-primary/60"
    : "border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        if (!next[String(i.path[0])]) next[String(i.path[0])] = i.message;
      });
      setErrors(next);
      return;
    }
    setErrors({});
    setSent(true);
    toast.success("Message ready — opening your mail client");
    const url = `mailto:${email}?subject=${encodeURIComponent(
      `[${module}] ${parsed.data.subject}`,
    )}&body=${encodeURIComponent(`${parsed.data.message}\n\n— ${parsed.data.name} (${parsed.data.email})`)}`;
    window.location.href = url;
  };

  return (
    <>
      <SEO title={title} description={description} path={path} />
      <div className={`min-h-screen pt-24 pb-24 ${dark ? "" : "bg-white"}`}>
        <div className="container-responsive max-w-6xl">
          <header className="max-w-3xl">
            <p className={`text-xs uppercase tracking-[0.25em] ${dark ? "text-primary/80" : "text-neutral-500"}`}>
              {module}
            </p>
            <h1 className={`mt-4 text-4xl md:text-5xl font-bold tracking-tight ${heading}`}>Contact {module}</h1>
            <p className={`mt-5 text-lg leading-8 ${body}`}>{intro}</p>
            <a
              href={`mailto:${email}`}
              className={`mt-6 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
                dark
                  ? "border-white/15 bg-white/[0.06] text-white hover:bg-white/[0.12]"
                  : "border-neutral-300 text-neutral-900 hover:bg-neutral-100"
              }`}
            >
              <Mail className="h-4 w-4" /> {email}
            </a>
          </header>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {channels.map((c) => (
              <div key={c.email} className={`rounded-2xl border p-6 ${surface}`}>
                <h2 className={`text-sm font-semibold ${heading}`}>{c.label}</h2>
                <a
                  href={`mailto:${c.email}`}
                  className={`mt-2 block text-sm font-medium ${dark ? "text-primary" : "text-neutral-900 underline"}`}
                >
                  {c.email}
                </a>
                {c.note && <p className={`mt-3 text-sm leading-relaxed ${body}`}>{c.note}</p>}
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <form onSubmit={submit} className={`rounded-3xl border p-7 md:p-9 ${surface}`} noValidate>
              <h2 className={`text-xl font-semibold ${heading}`}>Send a message</h2>
              <p className={`mt-2 text-sm ${body}`}>
                We read every message. Include as much detail as you can.
              </p>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                {([
                  { k: "name", label: "Full name", type: "text", ph: "Ada Lovelace" },
                  { k: "email", label: "Email", type: "email", ph: "you@example.com" },
                ] as const).map((f) => (
                  <div key={f.k}>
                    <label htmlFor={`c-${f.k}`} className={`block text-xs font-medium ${body}`}>
                      {f.label}
                    </label>
                    <input
                      id={`c-${f.k}`}
                      type={f.type}
                      value={form[f.k]}
                      onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                      placeholder={f.ph}
                      aria-invalid={!!errors[f.k]}
                      className={`mt-2 h-11 w-full rounded-xl border px-4 text-sm outline-none transition-colors ${field}`}
                    />
                    {errors[f.k] && <p className="mt-1.5 text-xs text-red-400">{errors[f.k]}</p>}
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <label htmlFor="c-subject" className={`block text-xs font-medium ${body}`}>
                  Subject
                </label>
                <input
                  id="c-subject"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="How can we help?"
                  aria-invalid={!!errors.subject}
                  className={`mt-2 h-11 w-full rounded-xl border px-4 text-sm outline-none transition-colors ${field}`}
                />
                {errors.subject && <p className="mt-1.5 text-xs text-red-400">{errors.subject}</p>}
              </div>

              <div className="mt-5">
                <label htmlFor="c-message" className={`block text-xs font-medium ${body}`}>
                  Message
                </label>
                <textarea
                  id="c-message"
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Share the details…"
                  aria-invalid={!!errors.message}
                  className={`mt-2 w-full rounded-xl border p-4 text-sm outline-none transition-colors ${field}`}
                />
                {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className={`mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] ${
                  dark ? "bg-primary text-primary-foreground" : "bg-neutral-900 text-white"
                }`}
              >
                {sent ? <CheckCircle2 className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                {sent ? "Message prepared" : "Send message"}
              </button>
            </form>

            <aside className="space-y-6">
              <div className={`rounded-2xl border p-6 ${surface}`}>
                <div className={`flex items-center gap-2 text-sm font-semibold ${heading}`}>
                  <Clock className="h-4 w-4" /> Response time
                </div>
                <p className={`mt-2 text-sm ${body}`}>{responseTime}</p>
              </div>
              <div className={`rounded-2xl border p-6 ${surface}`}>
                <div className={`flex items-center gap-2 text-sm font-semibold ${heading}`}>
                  <MapPin className="h-4 w-4" /> Where we are
                </div>
                <p className={`mt-2 text-sm ${body}`}>{location}</p>
              </div>
              <div className={`rounded-2xl border p-6 ${surface}`}>
                <div className={`text-sm font-semibold ${heading}`}>Other Anoneurx desks</div>
                <ul className={`mt-3 space-y-2 text-sm ${body}`}>
                  {[
                    ["General", "hello@anoneurx.com"],
                    ["University", "university@anoneurx.com"],
                    ["Open Source", "opensource@anoneurx.com"],
                    ["Blackwall OS", "blackwall@anoneurx.com"],
                    ["Anoneurx Pay", "pay@anoneurx.com"],
                    ["Anoneurx Cloud", "cloud@anoneurx.com"],
                  ].map(([l, e]) => (
                    <li key={e} className="flex items-center justify-between gap-3">
                      <span>{l}</span>
                      <a href={`mailto:${e}`} className={dark ? "text-primary" : "text-neutral-900 underline"}>
                        {e}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModuleContact;
