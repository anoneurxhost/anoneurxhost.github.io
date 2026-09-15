import SectionHeading from "./components/SectionHeading";

const services = [
  { name: "Dashboard", status: "Operational" },
  { name: "Authentication", status: "Operational" },
  { name: "Agent Enrollment", status: "Operational" },
  { name: "Connection Services", status: "Operational" },
];

const ConnectStatus = () => (
  <div className="flex flex-col">
    <section className="relative pt-20 pb-16 px-4 sm:pt-28 sm:pb-24">
      <div className="container-responsive">
        <SectionHeading
          eyebrow="Status"
          title="Anoneurx Connect Status"
          description="Current state of Anoneurx Connect services. This page reflects the status as displayed on the status page — real-time monitoring data is not yet connected."
        />
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-white/[0.08] dark:bg-[#060708]">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-connect-pulse" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">All Systems Operational</h3>
          </div>
          <div className="mt-6 space-y-4">
            {services.map((s) => (
              <div key={s.name} className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3 ring-1 ring-slate-100 dark:bg-white/[0.02] dark:ring-0">
                <span className="text-sm text-slate-700 dark:text-slate-300">{s.name}</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" /> {s.status}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">
            This is a UI placeholder. Real-time monitoring is not yet connected.
          </p>
        </div>
      </div>
    </section>
  </div>
);

export default ConnectStatus;