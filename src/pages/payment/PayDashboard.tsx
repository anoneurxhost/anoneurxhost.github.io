import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Banknote,
  CreditCard,
  Download,
  Globe,
  Landmark,
  LayoutDashboard,
  Lock,
  Receipt,
  Send,
  Settings,
  TrendingUp,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  ACCOUNT_TYPES,
  PERMISSIONS,
  ACCOUNT_TYPE_LIST,
  getAccountConfig,
  hasPermission,
  type PayAccountType,
} from "./payAccounts";

const statsByType = {
  individual: { balance: "$12,840.50", monthly: "+$2,180", cards: 2, sent: "$1,240" },
  student: { balance: "$1,280.00", monthly: "+$320", cards: 1, sent: "$480" },
  business: { balance: "$248,920.50", monthly: "+$28,410", cards: 6, sent: "$32,140" },
  corporate: { balance: "$4,820,150.00", monthly: "+$512,900", cards: 42, sent: "$1,240,000" },
} as const;

const txByType: Record<PayAccountType, { merchant: string; category: string; amount: number; when: string }[]> = {
  individual: [
    { merchant: "Stripe · Payout", category: "Income", amount: 2180.00, when: "Today" },
    { merchant: "Whole Foods", category: "Groceries", amount: -84.23, when: "Today" },
    { merchant: "Uber", category: "Transport", amount: -22.50, when: "Yesterday" },
    { merchant: "Netflix", category: "Subscriptions", amount: -15.99, when: "2d" },
  ],
  student: [
    { merchant: "Campus Bookstore", category: "Books", amount: -124.00, when: "Today" },
    { merchant: "Starbucks", category: "Food", amount: -6.45, when: "Today" },
    { merchant: "Scholarship Deposit", category: "Income", amount: 1200.00, when: "Yesterday" },
    { merchant: "Spotify Student", category: "Subscriptions", amount: -5.99, when: "3d" },
  ],
  business: [
    { merchant: "AWS · Compute", category: "Infra", amount: -1240.55, when: "Today" },
    { merchant: "Stripe · Payout", category: "Income", amount: 12400.00, when: "Today" },
    { merchant: "WeWork", category: "Office", amount: -2100.00, when: "Yesterday" },
    { merchant: "Notion · Team", category: "Software", amount: -96.00, when: "Yesterday" },
  ],
  corporate: [
    { merchant: "Wire · Northwind", category: "Income", amount: 820000.00, when: "Today" },
    { merchant: "Azure · Infra", category: "Infra", amount: -28400.00, when: "Today" },
    { merchant: "Deloitte · Advisory", category: "Professional", amount: -120000.00, when: "Yesterday" },
    { merchant: "Treasury · Yield", category: "Income", amount: 18400.00, when: "Yesterday" },
  ],
};

const quickActions: { key: string; label: string; icon: LucideIcon }[] = [
  { key: "send_money", label: "Send", icon: Send },
  { key: "receive_money", label: "Request", icon: ArrowDownLeft },
  { key: "bank_transfer", label: "Bank", icon: Landmark },
  { key: "debit_card", label: "Cards", icon: CreditCard },
  { key: "crypto", label: "Crypto", icon: Banknote },
  { key: "invoices", label: "Invoice", icon: Receipt },
];

const permissionIcon = (key: string) => {
  const map: Record<string, LucideIcon> = {
    send_money: Send,
    receive_money: ArrowDownLeft,
    bank_transfer: Landmark,
    debit_card: CreditCard,
    crypto: Banknote,
    international: Globe,
    invoices: Receipt,
    payroll: Wallet,
    team_cards: CreditCard,
    analytics: TrendingUp,
    treasury: LayoutDashboard,
    expense_management: Receipt,
    tax_tools: Download,
    student_discounts: Zap,
    tuition: Landmark,
    savings_goals: TrendingUp,
    api_access: Settings,
  };
  return map[key] || Zap;
};

const ACCOUNT_STORAGE_KEY = "pay_account_type";

const PayDashboard = () => {
  const navigate = useNavigate();
  const { type: typeParam } = useParams();
  const [accountType, setAccountType] = useState<PayAccountType>(() => {
    const stored = typeParam || localStorage.getItem(ACCOUNT_STORAGE_KEY);
    return stored && stored in ACCOUNT_TYPES ? (stored as PayAccountType) : "individual";
  });

  const config = useMemo(() => getAccountConfig(accountType), [accountType]);
  const Icon = config.icon;

  useEffect(() => {
    const param = typeParam && typeParam in ACCOUNT_TYPES ? (typeParam as PayAccountType) : null;
    if (param) {
      setAccountType(param);
      localStorage.setItem(ACCOUNT_STORAGE_KEY, param);
    }
  }, [typeParam]);

  const stats = statsByType[accountType];
  const tx = txByType[accountType];

  const [activeNav, setActiveNav] = useState("overview");
  const enabledPermissions = config.permissions
    .map(p => ({ key: p, label: PERMISSIONS[p], icon: permissionIcon(p) }))
    .filter(p => p.label);

  const switchAccount = (t: PayAccountType) => {
    setAccountType(t);
    localStorage.setItem(ACCOUNT_STORAGE_KEY, t);
    setActiveNav("overview");
    navigate(`/pay/account/${t}`);
  };

  return (
    <section className="px-4 py-10">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge className={`bg-white/5 border-white/10 text-gray-300 text-[10px] uppercase tracking-widest`}>
                <Icon className="w-3 h-3 mr-1.5 text-white" /> {config.name} Account
              </Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Anoneurx Pay</h1>
            <p className="text-sm text-gray-400 mt-1">{config.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1">
              {ACCOUNT_TYPE_LIST.map(t => (
                <button
                  key={t}
                  onClick={() => switchAccount(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    t === accountType ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {ACCOUNT_TYPES[t].name}
                </button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-white/10 text-gray-200 hover:bg-white/5"
              onClick={() => navigate("/pay")}
            >
              <Lock className="w-3.5 h-3.5 mr-1.5" /> Logout
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[220px_1fr] gap-6">
          <aside className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-2.5 h-fit lg:sticky lg:top-24">
            {config.nav.map(item => (
              <button
                key={item.key}
                onClick={() => setActiveNav(item.key)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-colors ${
                  activeNav === item.key ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Zap className="w-3.5 h-3.5" /> {item.label}
              </button>
            ))}
          </aside>

          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: "Balance", value: stats.balance },
                { label: "Monthly change", value: stats.monthly, positive: true },
                { label: "Cards", value: String(stats.cards) },
                { label: "Sent this month", value: stats.sent },
              ].map(s => (
                <Card key={s.label} className="bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl rounded-2xl">
                  <CardContent className="p-4">
                    <p className="text-[10px] uppercase tracking-widest text-gray-500">{s.label}</p>
                    <p className="text-xl font-bold text-white mt-1">{s.value}</p>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-400 mt-1">
                      <TrendingUp className="w-3 h-3" /> Active
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl rounded-2xl">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-white">Quick actions</h2>
                  <span className="text-[10px] text-gray-500">Permission-based</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {quickActions
                    .filter(a => hasPermission(config, a.key))
                    .map(a => {
                      const A = a.icon;
                      return (
                        <button
                          key={a.key}
                          className={`group flex flex-col items-center gap-2 p-3 rounded-xl border border-white/5 bg-gradient-to-br ${config.accent} bg-opacity-10 hover:bg-opacity-20 transition`}
                        >
                          <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                            <A className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-[10px] text-gray-300">{a.label}</span>
                        </button>
                      );
                    })}
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-[1.5fr_1fr] gap-4">
              <Card className="bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl rounded-2xl">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-bold text-white">Recent activity</h2>
                    <button className="text-[11px] text-blue-400 hover:underline">View all</button>
                  </div>
                  <div className="divide-y divide-white/5">
                    {tx.map((t, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="flex items-center gap-3 py-3"
                      >
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
                    <h2 className="text-sm font-bold text-white">Account limits</h2>
                    <Badge className="bg-white/5 text-gray-300 border-white/10 text-[10px]">{config.name}</Badge>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "Send limit", value: config.limits.send },
                      { label: "Receive limit", value: config.limits.receive },
                      { label: "Daily limit", value: config.limits.daily },
                    ].map(l => (
                      <div key={l.label} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                        <span className="text-xs text-gray-400">{l.label}</span>
                        <span className="text-xs font-bold text-white">{l.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl rounded-2xl">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-white">Plan permissions</h2>
                  <span className="text-[10px] text-gray-500">{enabledPermissions.length} of {Object.keys(PERMISSIONS).length} features</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {enabledPermissions.map(p => {
                    const P = p.icon;
                    return (
                      <div key={p.key} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${config.accent} flex items-center justify-center`}>
                          <P className="w-4 h-4 text-white" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-white truncate">{p.label}</p>
                          <p className="text-[10px] text-gray-500">{p.key.replace(/_/g, " ")}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PayDashboard;
