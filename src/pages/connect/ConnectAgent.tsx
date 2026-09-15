import SectionHeading from "./components/SectionHeading";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const ConnectAgent = () => (
  <div className="flex flex-col">
    <section className="relative pt-20 pb-16 px-4 sm:pt-28 sm:pb-24">
      <div className="container-responsive">
        <SectionHeading
          eyebrow="Agent"
          title="Install the Anoneurx Connect Agent."
          description="Connect your Linux server to Anoneurx Connect with a lightweight server-side Agent."
        />
        <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6 ring-1 ring-blue-100 dark:border-blue-400/20 dark:bg-blue-500/10 dark:ring-0">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-blue-900 dark:text-white">Anoneurx Black Link Agent</p>
              <p className="mt-1 text-sm text-blue-700/80 dark:text-slate-400">
                The Agent will be released soon. Installation will be a single verified command once available.
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-blue-300 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-blue-700 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500 dark:bg-blue-400" />
              Soon
            </span>
          </div>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Installation", desc: "Bootstrap the Agent on your Linux server." },
            { title: "Requirements", desc: "Modern Linux distributions with a supported kernel." },
            { title: "Agent Status", desc: "Monitor health and connectivity from the dashboard." },
            { title: "Updating", desc: "Apply verified Agent updates through the dashboard." },
            { title: "Uninstalling", desc: "Remove the Agent and revoke the server identity." },
            { title: "Troubleshooting", desc: "Connection, authentication and permission guidance." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 dark:border-white/[0.06] dark:bg-white/[0.02]">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-amber-300 bg-amber-50 p-5 ring-1 ring-amber-100 dark:border-amber-500/20 dark:bg-amber-500/5 dark:ring-0">
          <p className="text-sm text-amber-800 dark:text-amber-300">
            <strong>Development notice.</strong> Some Agent features described here are under active development. Areas marked as Early Access or Coming Soon are not yet production-ready.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/blacklink"
            className="inline-flex items-center gap-2 font-semibold text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Back to overview <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/blacklink/dashboard"
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:from-blue-500 hover:to-indigo-500"
          >
            Open Dashboard <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default ConnectAgent;