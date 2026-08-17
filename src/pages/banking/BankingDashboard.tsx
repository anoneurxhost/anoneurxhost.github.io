import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { motion } from "framer-motion";
import {
  CreditCard, ArrowUpRight, ArrowDownLeft, Plus, Send, TrendingUp, TrendingDown,
  ShoppingBag, Coffee, Plane, Briefcase, MoreHorizontal, Eye, EyeOff,
  LogOut, User as UserIcon, Settings, ChevronDown
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const transactions = [
  { id: 1, type: "out", merchant: "Whole Foods Market", category: "Groceries", icon: ShoppingBag, amount: -82.41, date: "Today" },
  { id: 2, type: "in", merchant: "Stripe Payout", category: "Income", icon: Briefcase, amount: 4250.00, date: "Today" },
  { id: 3, type: "out", merchant: "Blue Bottle Coffee", category: "Food & Drink", icon: Coffee, amount: -6.75, date: "Yesterday" },
  { id: 4, type: "out", merchant: "Delta Airlines", category: "Travel", icon: Plane, amount: -487.20, date: "Yesterday" },
  { id: 5, type: "in", merchant: "Refund — Amazon", category: "Refund", icon: ArrowDownLeft, amount: 19.99, date: "2 days ago" },
  { id: 6, type: "out", merchant: "Spotify", category: "Subscription", icon: ShoppingBag, amount: -9.99, date: "3 days ago" },
];

const cards = [
  { name: "Anoneurx Metal", last4: "8421", balance: 12480.55, color: "from-zinc-700 to-zinc-900" },
  { name: "Virtual Card", last4: "1209", balance: 950.00, color: "from-blue-600 to-blue-900" },
];

const BankingDashboard = () => {
  const [hideBalance, setHideBalance] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const total = 12480.55 + 950.00;

  const displayName = user?.name || "Alex Demo";
  const initials = displayName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  const handleLogout = () => {
    logout();
    setLogoutOpen(false);
    navigate("/auth", { replace: true });
  };

  return (
    <section className="px-4 py-10">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs text-gray-500">Welcome back</p>
            <h1 className="text-xl font-bold">Good evening, {displayName.split(" ")[0]}</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button className="bg-amber-500 hover:bg-amber-400 text-black font-bold">
              <Plus className="w-4 h-4 mr-1.5" /> Add Money
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  aria-label="Account menu"
                  className="flex items-center gap-2 min-h-11 rounded-full pl-1 pr-2.5 py-1 bg-white/5 border border-white/10 hover:bg-white/10 transition"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-amber-500/20 text-amber-300 text-xs font-bold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:block text-sm font-medium max-w-[140px] truncate">{displayName}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <p className="text-sm font-medium">{displayName}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email || "alex@anoneurx.pay"}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/pay/open-account")}>
                  <UserIcon className="w-4 h-4 mr-2" /> Account details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  <Settings className="w-4 h-4 mr-2" /> Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={(e) => { e.preventDefault(); setLogoutOpen(true); }}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Log out of Anoneurx Pay?</AlertDialogTitle>
              <AlertDialogDescription>
                You'll be signed out of this device and returned to the sign-in page.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout}>Log out</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Balance + Quick actions */}
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4 mb-6">
          <Card className="bg-gradient-to-br from-amber-500/10 via-white/[0.03] to-blue-500/10 border-white/10 backdrop-blur-2xl rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-widest text-gray-400">Total Balance</span>
                <button onClick={() => setHideBalance(!hideBalance)} className="text-gray-400 hover:text-white">
                  {hideBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-4xl font-bold mb-1">
                {hideBalance ? "•••••••" : `$${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                <TrendingUp className="w-3 h-3" /> +$1,420.30 this month
              </div>

              <div className="grid grid-cols-4 gap-2 mt-6">
                {[
                  { icon: Send, label: "Send" },
                  { icon: Plus, label: "Top Up" },
                  { icon: ArrowUpRight, label: "Pay" },
                  { icon: MoreHorizontal, label: "More" },
                ].map(a => (
                  <button key={a.label} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition">
                    <a.icon className="w-4 h-4 text-amber-400" />
                    <span className="text-[10px] uppercase tracking-widest text-gray-400">{a.label}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            {cards.map(c => (
              <Card key={c.last4} className={`bg-gradient-to-br ${c.color} border-white/10 rounded-2xl overflow-hidden relative`}>
                <CardContent className="p-5 relative">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/60">Anoneurx</p>
                      <p className="text-sm font-bold">{c.name}</p>
                    </div>
                    <CreditCard className="w-5 h-5 text-white/60" />
                  </div>
                  <p className="text-sm tracking-[0.3em] mb-2">•••• {c.last4}</p>
                  <p className="text-xs text-white/60">${c.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Income (Mar)", value: "$8,420", trend: "+12%", up: true },
            { label: "Spending (Mar)", value: "$3,140", trend: "-8%", up: false },
            { label: "Saved", value: "$5,280", trend: "+24%", up: true },
            { label: "Investments", value: "$12,910", trend: "+3.2%", up: true },
          ].map(s => (
            <Card key={s.label} className="bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl rounded-2xl">
              <CardContent className="p-4">
                <p className="text-[10px] uppercase tracking-widest text-gray-500">{s.label}</p>
                <p className="text-lg font-bold mt-1">{s.value}</p>
                <div className={`flex items-center gap-1 text-[10px] mt-1 ${s.up ? "text-emerald-400" : "text-rose-400"}`}>
                  {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {s.trend}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Transactions */}
        <Card className="bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold">Recent Transactions</h2>
              <button className="text-[11px] text-amber-400 hover:underline">View all</button>
            </div>
            <div className="divide-y divide-white/5">
              {transactions.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-3 py-3"
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${t.type === "in" ? "bg-emerald-500/15" : "bg-white/5"}`}>
                    <t.icon className={`w-4 h-4 ${t.type === "in" ? "text-emerald-400" : "text-gray-400"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{t.merchant}</p>
                    <p className="text-[10px] text-gray-500">{t.category} · {t.date}</p>
                  </div>
                  <p className={`text-sm font-bold ${t.amount > 0 ? "text-emerald-400" : "text-white"}`}>
                    {t.amount > 0 ? "+" : ""}${Math.abs(t.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BankingDashboard;
