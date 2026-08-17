import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import {
  User, Building2, ChevronRight, ChevronLeft, ShieldCheck, Sparkles,
  CreditCard, Lock, Check, Loader2,
} from "lucide-react";

type Plan = "free" | "pro" | "scale";

const plans: { id: Plan; name: string; price: string; perks: string[] }[] = [
  { id: "free", name: "Starter", price: "$0", perks: ["1 account", "Virtual card", "Basic insights"] },
  { id: "pro", name: "Pro", price: "$10/mo", perks: ["5 accounts", "Metal card", "Priority support"] },
  { id: "scale", name: "Scale", price: "$49/mo", perks: ["Unlimited accounts", "Team seats", "API access"] },
];

const Stepper = ({ steps, active }: { steps: string[]; active: number }) => (
  <div className="flex items-center justify-center gap-2 mb-8">
    {steps.map((s, i) => (
      <div key={s} className="flex items-center">
        <div className={`flex items-center justify-center w-7 h-7 rounded-full text-[11px] font-bold transition ${
          i <= active ? "bg-amber-500 text-black" : "bg-white/10 text-gray-500"
        }`}>{i < active ? <Check className="w-3.5 h-3.5" /> : i + 1}</div>
        <span className={`ml-2 text-[11px] uppercase tracking-widest ${i === active ? "text-white" : "text-gray-500"}`}>{s}</span>
        {i < steps.length - 1 && <div className="w-8 h-px bg-white/10 mx-3" />}
      </div>
    ))}
  </div>
);

const BankingSignup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [tab, setTab] = useState<"personal" | "business">("personal");
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  // shared
  const [account, setAccount] = useState({ name: "", email: "", password: "" });
  // personal
  const [personal, setPersonal] = useState({ phone: "", dob: "", country: "US", address: "" });
  // business
  const [business, setBusiness] = useState({
    company: "", taxId: "", country: "US", address: "", website: "", plan: "pro" as Plan,
  });
  const [card, setCard] = useState({ number: "4242 4242 4242 4242", exp: "12/30", cvc: "123", name: "" });

  const personalSteps = ["Account", "Identity", "Done"];
  const businessSteps = ["Account", "Business", "Plan", "Checkout", "Done"];
  const steps = tab === "personal" ? personalSteps : businessSteps;
  const last = steps.length - 1;

  const completeSignup = (kind: "personal" | "business") => {
    const u = {
      _id: `demo-${kind}`,
      email: account.email || `${kind}@anoneurx.bank`,
      name: account.name || (kind === "business" ? business.company || "Acme Inc." : "Alex Demo"),
      roles: [kind === "business" ? "business_owner" : "personal_user", "user"],
    };
    login(u, `demo-${kind}-token`);
    toast({ title: "Account created!", description: "Welcome to Anoneurx Bank." });
    navigate(kind === "business" ? "/pay/business" : "/pay/dashboard");
  };

  const next = async () => {
    if (step < last - 1) {
      setStep(step + 1);
      return;
    }
    // last "real" step → simulate processing then complete
    if (tab === "business" && step === businessSteps.length - 2) {
      setLoading(true);
      await new Promise(r => setTimeout(r, 1200));
      setLoading(false);
      setStep(step + 1);
      setTimeout(() => completeSignup("business"), 800);
      return;
    }
    if (tab === "personal" && step === personalSteps.length - 2) {
      setStep(step + 1);
      setTimeout(() => completeSignup("personal"), 600);
    }
  };

  const back = () => step > 0 && setStep(step - 1);

  return (
    <section className="px-4 pt-20 pb-16 min-h-screen">
      <div className="container mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Badge className="mb-3 bg-amber-500/10 text-amber-300 border-amber-500/20 px-3 py-1 text-[10px] uppercase tracking-widest">
            <Sparkles className="w-3 h-3 mr-1.5" /> Anoneurx Bank
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Open your account</h1>
          <p className="text-sm text-gray-400">2 minutes. Zero paperwork. Instant card.</p>
        </motion.div>

        <Tabs value={tab} onValueChange={(v) => { setTab(v as any); setStep(0); }}>
          <TabsList className="grid grid-cols-2 w-full max-w-sm mx-auto bg-white/5 border border-white/10 mb-8">
            <TabsTrigger value="personal" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
              <User className="w-3.5 h-3.5 mr-1.5" /> Personal
            </TabsTrigger>
            <TabsTrigger value="business" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
              <Building2 className="w-3.5 h-3.5 mr-1.5" /> Business
            </TabsTrigger>
          </TabsList>

          <Stepper steps={steps} active={step} />

          <Card className="bg-white/[0.03] border-white/10 backdrop-blur-2xl rounded-2xl">
            <CardContent className="p-6 md:p-8">
              <TabsContent value="personal" className="mt-0 space-y-4">
                {step === 0 && (
                  <>
                    <div><Label className="text-gray-300">Full name</Label><Input value={account.name} onChange={e => setAccount({ ...account, name: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
                    <div><Label className="text-gray-300">Email</Label><Input type="email" value={account.email} onChange={e => setAccount({ ...account, email: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
                    <div><Label className="text-gray-300">Password</Label><Input type="password" value={account.password} onChange={e => setAccount({ ...account, password: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
                  </>
                )}
                {step === 1 && (
                  <>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><Label className="text-gray-300">Phone</Label><Input value={personal.phone} onChange={e => setPersonal({ ...personal, phone: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
                      <div><Label className="text-gray-300">Date of birth</Label><Input type="date" value={personal.dob} onChange={e => setPersonal({ ...personal, dob: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
                      <div><Label className="text-gray-300">Country</Label><Input value={personal.country} onChange={e => setPersonal({ ...personal, country: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
                      <div><Label className="text-gray-300">Address</Label><Input value={personal.address} onChange={e => setPersonal({ ...personal, address: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-gray-500 pt-2"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Encrypted end-to-end. Used only for KYC.</div>
                  </>
                )}
                {step === 2 && (
                  <div className="text-center py-6">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4"><Check className="w-7 h-7 text-emerald-400" /></div>
                    <h3 className="text-xl font-bold text-white mb-1">You're in!</h3>
                    <p className="text-sm text-gray-400">Spinning up your account…</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="business" className="mt-0 space-y-4">
                {step === 0 && (
                  <>
                    <div><Label className="text-gray-300">Your full name</Label><Input value={account.name} onChange={e => setAccount({ ...account, name: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
                    <div><Label className="text-gray-300">Work email</Label><Input type="email" value={account.email} onChange={e => setAccount({ ...account, email: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
                    <div><Label className="text-gray-300">Password</Label><Input type="password" value={account.password} onChange={e => setAccount({ ...account, password: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
                  </>
                )}
                {step === 1 && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><Label className="text-gray-300">Company name</Label><Input value={business.company} onChange={e => setBusiness({ ...business, company: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
                    <div><Label className="text-gray-300">Tax ID / EIN</Label><Input value={business.taxId} onChange={e => setBusiness({ ...business, taxId: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
                    <div><Label className="text-gray-300">Country</Label><Input value={business.country} onChange={e => setBusiness({ ...business, country: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
                    <div><Label className="text-gray-300">Website</Label><Input value={business.website} onChange={e => setBusiness({ ...business, website: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
                    <div className="sm:col-span-2"><Label className="text-gray-300">Registered address</Label><Input value={business.address} onChange={e => setBusiness({ ...business, address: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
                  </div>
                )}
                {step === 2 && (
                  <div className="grid sm:grid-cols-3 gap-3">
                    {plans.map(p => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setBusiness({ ...business, plan: p.id })}
                        className={`text-left p-4 rounded-xl border transition ${business.plan === p.id ? "bg-amber-500/10 border-amber-400/40" : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06]"}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs uppercase tracking-widest text-gray-400">{p.name}</p>
                          {business.plan === p.id && <Check className="w-4 h-4 text-amber-400" />}
                        </div>
                        <p className="text-xl font-bold text-white">{p.price}</p>
                        <ul className="mt-3 space-y-1.5">
                          {p.perks.map(perk => <li key={perk} className="text-[11px] text-gray-400 flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-400" />{perk}</li>)}
                        </ul>
                      </button>
                    ))}
                  </div>
                )}
                {step === 3 && (
                  <div className="space-y-4">
                    <div className="rounded-xl border border-white/10 bg-gradient-to-br from-amber-500/5 to-blue-500/5 p-4 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400">Selected plan</p>
                        <p className="text-base font-bold text-white">{plans.find(p => p.id === business.plan)?.name} · {plans.find(p => p.id === business.plan)?.price}</p>
                      </div>
                      <Lock className="w-4 h-4 text-gray-500" />
                    </div>
                    <div><Label className="text-gray-300">Cardholder name</Label><Input value={card.name} onChange={e => setCard({ ...card, name: e.target.value })} placeholder="Name on card" className="bg-white/5 border-white/10 text-white mt-1" /></div>
                    <div><Label className="text-gray-300">Card number</Label>
                      <div className="relative">
                        <Input value={card.number} onChange={e => setCard({ ...card, number: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1 pl-9" />
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 mt-0.5 w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><Label className="text-gray-300">Expiry</Label><Input value={card.exp} onChange={e => setCard({ ...card, exp: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
                      <div><Label className="text-gray-300">CVC</Label><Input value={card.cvc} onChange={e => setCard({ ...card, cvc: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
                    </div>
                    <p className="text-[11px] text-gray-500 flex items-center gap-1.5"><ShieldCheck className="w-3 h-3 text-emerald-400" /> Sandbox mode — no real charge. Use any test card.</p>
                  </div>
                )}
                {step === 4 && (
                  <div className="text-center py-6">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4"><Check className="w-7 h-7 text-emerald-400" /></div>
                    <h3 className="text-xl font-bold text-white mb-1">Business account ready</h3>
                    <p className="text-sm text-gray-400">Provisioning your dashboard…</p>
                  </div>
                )}
              </TabsContent>

              {step < last && (
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                  <Button variant="ghost" onClick={back} disabled={step === 0} className="text-gray-400 hover:text-white">
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back
                  </Button>
                  <Button onClick={next} disabled={loading} className="bg-amber-500 hover:bg-amber-400 text-black font-bold">
                    {loading ? <><Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> Processing</> : (
                      <>{tab === "business" && step === 3 ? "Pay & Create" : step === last - 1 ? "Finish" : "Continue"} <ChevronRight className="w-4 h-4 ml-1" /></>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <p className="text-center text-xs text-gray-500 mt-6">
            Already have an account? <Link to="/auth?redirect=/pay/dashboard" className="text-amber-400 hover:text-amber-300">Sign in</Link>
          </p>
        </Tabs>
      </div>
    </section>
  );
};

export default BankingSignup;
