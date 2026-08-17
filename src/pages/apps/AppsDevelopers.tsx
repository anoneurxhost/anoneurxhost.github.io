import { useNavigate } from "react-router-dom";
import { BadgeCheck, ArrowRight, Globe2, Wallet, BarChart3, ShieldCheck, Rocket, TrendingUp } from "lucide-react";
import AppsLayout from "./AppsLayout";

const features = [
  { icon: BadgeCheck, title: "Verified Publisher Profile" },
  { icon: Rocket, title: "Upload Unlimited Apps" },
  { icon: BarChart3, title: "Analytics Dashboard" },
  { icon: Wallet, title: "Revenue Reports" },
  { icon: ShieldCheck, title: "Priority Review" },
  { icon: Globe2, title: "Multi-Platform Publishing" },
];

const AppsDevelopers = () => {
  const navigate = useNavigate();

  return (
    <AppsLayout title="Become a Developer · Anoneurx Apps">
      <section className="px-4 pt-16 pb-20">
        <div className="container-responsive">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.25em] uppercase bg-white/5 border border-white/10 text-blue-300">
              <TrendingUp className="h-3 w-3" /> Developer Program
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-white">Become a Developer</h1>
            <p className="mt-4 text-slate-400 text-lg">
              Publish apps, grow revenue, manage updates, and reach global users.
            </p>
          </div>

          <div className="mt-12 grid lg:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">
            {/* Pricing card */}
            <div className="relative rounded-3xl border border-white/15 bg-gradient-to-br from-blue-600/20 via-cyan-500/10 to-transparent backdrop-blur-2xl p-8 overflow-hidden">
              <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-blue-500/30 blur-3xl pointer-events-none" />
              <div className="relative">
                <div className="text-[11px] uppercase tracking-widest text-blue-300">Developer Account</div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">$20</span>
                  <span className="text-sm text-slate-400">USD · One-time Registration</span>
                </div>
                <p className="mt-3 text-sm text-slate-300">Lifetime publisher access — no recurring fees.</p>

                <ul className="mt-6 space-y-3">
                  {features.map((f) => {
                    const I = f.icon;
                    return (
                      <li key={f.title} className="flex items-center gap-3 text-sm text-slate-200">
                        <span className="h-7 w-7 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                          <I className="h-3.5 w-3.5 text-blue-300" />
                        </span>
                        {f.title}
                      </li>
                    );
                  })}
                </ul>

                <button
                  onClick={() => navigate("/payment?product=Developer%20Account&amount=20&category=Apps")}
                  className="mt-8 w-full inline-flex items-center justify-center gap-2 h-12 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/40 hover:shadow-blue-500/60 hover:-translate-y-0.5 transition"
                >
                  Register Now <ArrowRight className="h-4 w-4" />
                </button>
                <p className="mt-3 text-[11px] text-center text-slate-400">
                  Secured payment · After successful payment you'll be redirected to your dashboard.
                </p>
              </div>
            </div>

            {/* Why */}
            <div className="space-y-4">
              {[
                { title: "Reach Millions", desc: "Global discovery on the Anoneurx storefront." },
                { title: "Earn More", desc: "Industry-leading 90/10 revenue split." },
                { title: "Premium Tools", desc: "Beta channels, A/B listings, growth insights." },
                { title: "Trusted Pipeline", desc: "Signed builds, malware scans, integrity checks." },
              ].map((b) => (
                <div key={b.title} className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-5 hover:border-white/25 transition">
                  <div className="text-base font-semibold text-white">{b.title}</div>
                  <div className="text-sm text-slate-400 mt-1">{b.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </AppsLayout>
  );
};

export default AppsDevelopers;
