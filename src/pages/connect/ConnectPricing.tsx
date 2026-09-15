import SectionHeading from "./components/SectionHeading";

const ConnectPricing = () => (
  <div className="flex flex-col">
    <section className="relative pt-20 pb-16 px-4 sm:pt-28 sm:pb-24">
      <div className="container-responsive">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple infrastructure. Transparent pricing."
          description="Plans are designed around the scale of infrastructure you manage. Pricing will be announced as Connect moves out of early access."
        />
        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-white/[0.08] dark:bg-white/[0.02]">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Pricing coming soon</h3>
          <p className="mt-4 text-slate-500 dark:text-slate-400">
            We are finalizing plans for Free, Personal, Business and Enterprise tiers. Sign up to be notified when pricing is available.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {["Free", "Personal", "Business", "Enterprise"].map((p) => (
              <span key={p} className="rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 ring-1 ring-blue-100 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400 dark:ring-0">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default ConnectPricing;