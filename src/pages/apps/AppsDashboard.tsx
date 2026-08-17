import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard, AppWindow, Upload, DollarSign, BarChart3, MessageSquare, Settings,
  Download, Users, Clock, TrendingUp, BadgeCheck, ArrowUpRight,
} from "lucide-react";
import AppsLayout from "./AppsLayout";
import { apps } from "./appsData";

const sidebar = [
  { icon: LayoutDashboard, label: "Overview", id: "overview" },
  { icon: AppWindow, label: "My Apps", id: "apps" },
  { icon: Upload, label: "Upload App", id: "upload" },
  { icon: DollarSign, label: "Earnings", id: "earnings" },
  { icon: BarChart3, label: "Analytics", id: "analytics" },
  { icon: MessageSquare, label: "Reviews", id: "reviews" },
  { icon: Settings, label: "Settings", id: "settings" },
];

const stats = [
  { icon: Download, label: "Total Downloads", value: "1.24M", delta: "+8.2%" },
  { icon: DollarSign, label: "Revenue", value: "$48,920", delta: "+12.4%" },
  { icon: Users, label: "Active Users", value: "184K", delta: "+3.1%" },
  { icon: Clock, label: "Pending Reviews", value: "7", delta: "-2" },
];

const AppsDashboard = () => {
  const [active, setActive] = useState("overview");
  const myApps = apps.slice(0, 5);

  return (
    <AppsLayout title="Developer Dashboard · Anoneurx Apps">
      <section className="px-4 pt-10 pb-20">
        <div className="container-responsive">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold uppercase tracking-widest text-emerald-300">
                <BadgeCheck className="h-3 w-3" /> Verified Developer
              </div>
              <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-white">Welcome back, Developer</h1>
              <p className="text-sm text-slate-400 mt-1">Here's how your apps are performing today.</p>
            </div>
            <Link
              to="/apps/submit"
              className="inline-flex items-center gap-2 px-5 h-10 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition"
            >
              <Upload className="h-4 w-4" /> Submit New App
            </Link>
          </div>

          <div className="grid lg:grid-cols-[240px_1fr] gap-6">
            {/* Sidebar */}
            <aside className="rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-2.5 h-fit">
              {sidebar.map((s) => {
                const I = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActive(s.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition ${
                      active === s.id ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <I className="h-4 w-4" /> {s.label}
                  </button>
                );
              })}
            </aside>

            {/* Main */}
            <div>
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s) => {
                  const I = s.icon;
                  return (
                    <div key={s.label} className="rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
                          <I className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-[9px] font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 inline-flex items-center gap-1">
                          <TrendingUp className="h-2.5 w-2.5" /> {s.delta}
                        </span>
                      </div>
                      <div className="mt-3 text-xl font-bold text-white">{s.value}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{s.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Recent apps table */}
              <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-2xl overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-white/5">
                  <div>
                    <h3 className="text-sm font-semibold text-white">Recent Apps</h3>
                    <p className="text-[11px] text-slate-400">Manage your published apps and updates.</p>
                  </div>
                  <Link to="/apps/browse" className="text-[10px] text-blue-300 hover:text-white inline-flex items-center gap-1 uppercase tracking-widest font-bold">
                    View all <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-white/[0.02] text-[10px] uppercase tracking-widest text-slate-400">
                      <tr>
                        <th className="text-left px-4 py-3 font-medium">App Name</th>
                        <th className="text-left px-4 py-3 font-medium">Version</th>
                        <th className="text-left px-4 py-3 font-medium">Status</th>
                        <th className="text-right px-4 py-3 font-medium">Downloads</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {myApps.map((a, i) => {
                        const Icon = a.icon;
                        const statuses = ["Live", "Live", "In Review", "Live", "Draft"];
                        const colors = ["emerald", "emerald", "amber", "emerald", "slate"];
                        const s = statuses[i];
                        const c = colors[i];
                        return (
                          <tr key={a.id} className="hover:bg-white/[0.02] transition">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2.5">
                                <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${a.color} flex items-center justify-center`}>
                                  <Icon className="h-3.5 w-3.5 text-white" />
                                </div>
                                <div>
                                  <div className="text-xs font-semibold text-white">{a.name}</div>
                                  <div className="text-[10px] text-slate-400">{a.developer}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-slate-300 text-xs">v{(2 + i * 0.1).toFixed(1)}.0</td>
                            <td className="px-4 py-3">
                              <span className={`text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded-md border bg-${c}-500/10 text-${c}-300 border-${c}-500/20`}>{s}</span>
                            </td>
                            <td className="px-4 py-3 text-right text-slate-300 font-mono text-[10px]">{(a.reviews * 10).toLocaleString()}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppsLayout>
  );
};

export default AppsDashboard;
