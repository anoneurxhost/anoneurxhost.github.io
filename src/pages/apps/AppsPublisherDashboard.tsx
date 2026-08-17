import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AppWindow, Upload, DollarSign, Download, Star, MessageSquare, Eye, BadgeCheck,
  TrendingUp, BarChart3, Settings, ArrowUpRight, Users, Globe, Edit2,
} from "lucide-react";

const stats = [
  { label: "Total downloads", value: "1.24M", delta: "+8.2%" },
  { label: "Revenue (Mar)", value: "$48,920", delta: "+12.4%" },
  { label: "Active users", value: "184K", delta: "+3.1%" },
  { label: "Rating", value: "4.82", delta: "+0.04" },
];

const apps = [
  { name: "Pixel Crafter", platform: "Windows · Linux", version: "2.4.1", status: "Live", downloads: 412000, rev: 18420, rating: 4.9 },
  { name: "Synth Studio Pro", platform: "macOS", version: "1.8.0", status: "Live", downloads: 248000, rev: 14210, rating: 4.7 },
  { name: "Notebook Genius", platform: "Web", version: "3.0.0", status: "In Review", downloads: 0, rev: 0, rating: 0 },
  { name: "TaskFlow", platform: "iOS · Android", version: "5.2.3", status: "Live", downloads: 580000, rev: 16290, rating: 4.8 },
  { name: "DevPanel", platform: "Linux", version: "0.9.1", status: "Draft", downloads: 0, rev: 0, rating: 0 },
];

const reviews = [
  { app: "Pixel Crafter", user: "Maria S.", rating: 5, text: "Best image editor I've used in years.", when: "2h" },
  { app: "TaskFlow", user: "Devon J.", rating: 4, text: "Solid sync, would love calendar integration.", when: "5h" },
  { app: "Synth Studio Pro", user: "Riko T.", rating: 5, text: "Sound packs are unreal.", when: "1d" },
];

const sidebar = [
  { icon: BarChart3, label: "Overview", active: true },
  { icon: AppWindow, label: "My apps" },
  { icon: Upload, label: "Submit app" },
  { icon: DollarSign, label: "Earnings" },
  { icon: Users, label: "Audience" },
  { icon: MessageSquare, label: "Reviews" },
  { icon: Globe, label: "Distribution" },
  { icon: Settings, label: "Settings" },
];

const statusColor = (s: string) =>
  s === "Live" ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" :
  s === "In Review" ? "bg-amber-500/10 text-amber-300 border-amber-500/20" :
  "bg-white/5 text-gray-400 border-white/10";

const AppsPublisherDashboard = () => {
  return (
    <section className="px-4 py-10 min-h-screen">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <Badge className="mb-2 bg-emerald-500/10 text-emerald-300 border-emerald-500/20 text-[10px] uppercase tracking-widest">
              <BadgeCheck className="w-3 h-3 mr-1.5" /> Verified Publisher · Pixelworks Studio
            </Badge>
            <h1 className="text-2xl font-bold text-white">Publisher dashboard</h1>
            <p className="text-xs text-gray-400 mt-0.5">5 apps · sandbox demo data</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-white/10 text-gray-200 hover:bg-white/5"><Edit2 className="w-4 h-4 mr-1.5" /> Edit profile</Button>
            <Link to="/apps/submit"><Button className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white"><Upload className="w-4 h-4 mr-1.5" /> Submit app</Button></Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-[220px_1fr] gap-6">
          <aside className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-2.5 h-fit lg:sticky lg:top-24">
            {sidebar.map(s => {
              const I = s.icon;
              return (
                <button key={s.label} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition ${s.active ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}>
                  <I className="w-4 h-4" /> {s.label}
                </button>
              );
            })}
          </aside>

          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {stats.map(s => (
                <Card key={s.label} className="bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl rounded-2xl">
                  <CardContent className="p-4">
                    <p className="text-[10px] uppercase tracking-widest text-gray-500">{s.label}</p>
                    <p className="text-xl font-bold text-white mt-1">{s.value}</p>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-400 mt-1"><TrendingUp className="w-3 h-3" /> {s.delta}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-white/5">
                <div>
                  <h2 className="text-sm font-bold text-white">My apps</h2>
                  <p className="text-[11px] text-gray-500">Manage published apps and updates</p>
                </div>
                <Link to="/apps/browse" className="text-[11px] text-blue-300 hover:text-white inline-flex items-center gap-1 uppercase tracking-widest font-bold">
                  Browse store <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-white/[0.02] text-[10px] uppercase tracking-widest text-gray-500">
                    <tr>
                      <th className="text-left px-5 py-3 font-medium">App</th>
                      <th className="text-left px-3 py-3 font-medium">Platform</th>
                      <th className="text-left px-3 py-3 font-medium">Version</th>
                      <th className="text-left px-3 py-3 font-medium">Status</th>
                      <th className="text-right px-3 py-3 font-medium">Downloads</th>
                      <th className="text-right px-3 py-3 font-medium">Revenue</th>
                      <th className="text-right px-5 py-3 font-medium">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {apps.map(a => (
                      <tr key={a.name} className="hover:bg-white/[0.02] transition">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400" />
                            <div>
                              <div className="text-xs font-semibold text-white">{a.name}</div>
                              <div className="text-[10px] text-gray-500">Pixelworks Studio</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-gray-300 text-xs">{a.platform}</td>
                        <td className="px-3 py-3 text-gray-300 text-xs">v{a.version}</td>
                        <td className="px-3 py-3"><span className={`text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded-md border ${statusColor(a.status)}`}>{a.status}</span></td>
                        <td className="px-3 py-3 text-right text-gray-300 font-mono text-[11px]"><Download className="w-3 h-3 inline mr-1 text-gray-500" />{a.downloads.toLocaleString()}</td>
                        <td className="px-3 py-3 text-right text-emerald-400 font-mono text-[11px]">${a.rev.toLocaleString()}</td>
                        <td className="px-5 py-3 text-right text-amber-400 text-xs">{a.rating ? <><Star className="w-3 h-3 inline -mt-0.5 fill-amber-400" /> {a.rating}</> : <span className="text-gray-600">—</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <div className="grid lg:grid-cols-2 gap-4">
              <Card className="bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl rounded-2xl">
                <CardContent className="p-5">
                  <h2 className="text-sm font-bold text-white mb-4">Latest reviews</h2>
                  <div className="space-y-3">
                    {reviews.map((r, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-white">{r.user} · <span className="text-gray-500 font-normal">{r.app}</span></span>
                          <span className="text-amber-400 text-[11px]">{"★".repeat(r.rating)}</span>
                        </div>
                        <p className="text-[11px] text-gray-400">{r.text}</p>
                        <p className="text-[10px] text-gray-600 mt-1">{r.when} ago</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl rounded-2xl">
                <CardContent className="p-5">
                  <h2 className="text-sm font-bold text-white mb-4">Distribution</h2>
                  <div className="space-y-2.5">
                    {[
                      { p: "Windows", v: 42 }, { p: "macOS", v: 24 }, { p: "Linux", v: 14 },
                      { p: "iOS", v: 12 }, { p: "Android", v: 8 },
                    ].map(d => (
                      <div key={d.p}>
                        <div className="flex justify-between text-[11px] text-gray-400 mb-1"><span>{d.p}</span><span>{d.v}%</span></div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: `${d.v}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppsPublisherDashboard;
