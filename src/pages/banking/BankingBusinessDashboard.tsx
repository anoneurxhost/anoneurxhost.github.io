import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Building2, Users, CreditCard, ArrowUpRight, ArrowDownLeft, TrendingUp,
  Plus, FileText, BarChart3, Settings, Globe, Receipt, Wallet,
} from "lucide-react";

const stats = [
  { label: "Cash balance", value: "$248,920.50", delta: "+4.2%" },
  { label: "MRR", value: "$48,210", delta: "+12.4%" },
  { label: "Burn / mo", value: "$32,140", delta: "-3.1%" },
  { label: "Runway", value: "18 mo", delta: "+2 mo" },
];

const team = [
  { name: "Alex Chen", role: "CEO", spend: 4820 },
  { name: "Priya Shah", role: "CFO", spend: 1240 },
  { name: "Jordan Lee", role: "Engineer", spend: 850 },
  { name: "Sam Park", role: "Designer", spend: 620 },
];

const invoices = [
  { id: "INV-2104", client: "Acme Corp", amount: 12400, status: "Paid", due: "Mar 28" },
  { id: "INV-2103", client: "Northwind", amount: 8200, status: "Pending", due: "Apr 02" },
  { id: "INV-2102", client: "Globex", amount: 4800, status: "Overdue", due: "Mar 18" },
  { id: "INV-2101", client: "Initech", amount: 22100, status: "Paid", due: "Mar 12" },
];

const tx = [
  { merchant: "AWS · Compute", category: "Infra", amount: -1240.55, when: "Today" },
  { merchant: "Stripe · Payout", category: "Income", amount: 12400.00, when: "Today" },
  { merchant: "WeWork", category: "Office", amount: -2100.00, when: "Yesterday" },
  { merchant: "Notion · Team", category: "Software", amount: -96.00, when: "Yesterday" },
  { merchant: "Wire · Northwind", category: "Income", amount: 8200.00, when: "2d" },
];

const sidebar = [
  { icon: BarChart3, label: "Overview" },
  { icon: Wallet, label: "Accounts" },
  { icon: CreditCard, label: "Cards" },
  { icon: Receipt, label: "Invoices" },
  { icon: Users, label: "Team" },
  { icon: Globe, label: "Payouts" },
  { icon: FileText, label: "Reports" },
  { icon: Settings, label: "Settings" },
];

const BankingBusinessDashboard = () => {
  return (
    <section className="px-4 py-10">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <Badge className="mb-2 bg-amber-500/10 text-amber-300 border-amber-500/20 text-[10px] uppercase tracking-widest">
              <Building2 className="w-3 h-3 mr-1.5" /> Business Account · Acme Inc.
            </Badge>
            <h1 className="text-2xl font-bold text-white">Welcome back, Alex</h1>
            <p className="text-xs text-gray-400 mt-0.5">Sandbox account · live data simulated</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-white/10 text-gray-200 hover:bg-white/5"><Plus className="w-4 h-4 mr-1.5" /> New invoice</Button>
            <Button className="bg-amber-500 hover:bg-amber-400 text-black font-bold"><ArrowUpRight className="w-4 h-4 mr-1.5" /> Send money</Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[220px_1fr] gap-6">
          {/* Sidebar */}
          <aside className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-2.5 h-fit lg:sticky lg:top-24">
            {sidebar.map((s, i) => {
              const I = s.icon;
              return (
                <button key={s.label} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition ${i === 0 ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}>
                  <I className="w-4 h-4" /> {s.label}
                </button>
              );
            })}
          </aside>

          {/* Main */}
          <div className="space-y-6">
            {/* Stats */}
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

            {/* Cash flow + invoices */}
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4">
              <Card className="bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl rounded-2xl">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-bold text-white">Recent transactions</h2>
                    <button className="text-[11px] text-amber-400 hover:underline">View all</button>
                  </div>
                  <div className="divide-y divide-white/5">
                    {tx.map((t, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="flex items-center gap-3 py-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${t.amount > 0 ? "bg-emerald-500/15" : "bg-white/5"}`}>
                          {t.amount > 0 ? <ArrowDownLeft className="w-4 h-4 text-emerald-400" /> : <ArrowUpRight className="w-4 h-4 text-gray-400" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{t.merchant}</p>
                          <p className="text-[10px] text-gray-500">{t.category} · {t.when}</p>
                        </div>
                        <p className={`text-sm font-bold ${t.amount > 0 ? "text-emerald-400" : "text-white"}`}>
                          {t.amount > 0 ? "+" : ""}${Math.abs(t.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl rounded-2xl">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-bold text-white">Invoices</h2>
                    <button className="text-[11px] text-amber-400 hover:underline">Create</button>
                  </div>
                  <div className="space-y-2.5">
                    {invoices.map(inv => (
                      <div key={inv.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                        <div>
                          <p className="text-xs font-semibold text-white">{inv.client}</p>
                          <p className="text-[10px] text-gray-500">{inv.id} · due {inv.due}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-white">${inv.amount.toLocaleString()}</p>
                          <span className={`text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded-md border ${
                            inv.status === "Paid" ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" :
                            inv.status === "Pending" ? "bg-amber-500/10 text-amber-300 border-amber-500/20" :
                            "bg-rose-500/10 text-rose-300 border-rose-500/20"
                          }`}>{inv.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Team spend */}
            <Card className="bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl rounded-2xl">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-white">Team spend (March)</h2>
                  <Badge className="bg-white/5 text-gray-300 border-white/10 text-[10px]">{team.length} cards</Badge>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {team.map(m => (
                    <div key={m.name} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-[10px] font-bold text-black">
                          {m.name.split(" ").map(s => s[0]).join("")}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white">{m.name}</p>
                          <p className="text-[10px] text-gray-500">{m.role}</p>
                        </div>
                      </div>
                      <p className="text-base font-bold text-white">${m.spend.toLocaleString()}</p>
                      <div className="h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-amber-500" style={{ width: `${Math.min(m.spend / 50, 100)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BankingBusinessDashboard;
