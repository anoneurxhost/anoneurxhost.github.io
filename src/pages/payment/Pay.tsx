import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard, Smartphone, Shield, Lock, Globe, ChevronLeft, Bitcoin,
  ArrowRight, Check, Apple, Building2, Sparkles, Zap, Layers, Wallet,
  CheckCircle2, Star
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { toast } from "sonner";

type Step = "select" | "process" | "success";

const Pay = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const product = useMemo(() => searchParams.get("product") || "Anoneurx Premium", [searchParams]);
  const amount = useMemo(() => searchParams.get("amount") || "129", [searchParams]);
  const category = useMemo(() => searchParams.get("category") || "Subscription", [searchParams]);

  useEffect(() => {
    document.title = "Pay · Anoneurx";
    return () => { document.title = "Anoneurx"; };
  }, []);

  const [step, setStep] = useState<Step>("select");
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [submitting, setSubmitting] = useState(false);

  const methods = [
    { id: "card", icon: CreditCard, title: "Credit / Debit Card", desc: "Visa · Mastercard · Amex", accent: "from-sky-400 to-indigo-500" },
    { id: "apple", icon: Apple, title: "Apple Pay", desc: "Touch ID or Face ID", accent: "from-zinc-300 to-zinc-500" },
    { id: "wallet", icon: Wallet, title: "Anoneurx Wallet", desc: "Pay from balance", accent: "from-fuchsia-400 to-purple-500" },
    { id: "crypto", icon: Bitcoin, title: "Crypto", desc: "BTC · ETH · USDC", accent: "from-amber-400 to-orange-500" },
    { id: "bank", icon: Building2, title: "Bank Transfer", desc: "ACH · SEPA · Wire", accent: "from-emerald-400 to-teal-500" },
    { id: "mobile", icon: Smartphone, title: "Mobile Money", desc: "UPI · Google Pay", accent: "from-rose-400 to-pink-500" },
  ];

  const selected = methods.find(m => m.id === paymentMethod);
  const subtotal = Number(amount) || 0;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setStep("success");
      toast.success("Payment confirmed", { description: `${product} is now active.` });
      setTimeout(() => navigate("/"), 2200);
    }, 1400);
  };

  return (
    <PageTransition>
      <div className="min-h-screen relative universal-page-bg overflow-hidden">
        <div className="universal-page-overlay" />
        <div className="universal-moving-gradient" />

        {/* Premium ambient glows */}
        <div className="pointer-events-none absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 w-[520px] h-[520px] rounded-full bg-purple-500/20 blur-[140px]" />
        <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-emerald-500/10 blur-[140px]" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-10">
            <button
              onClick={() => step === "select" ? navigate(-1) : setStep("select")}
              className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.07] hover:border-white/20 text-gray-300 transition-all backdrop-blur-xl"
            >
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              <span className="text-xs font-medium">Back</span>
            </button>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-xl">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">Secured Checkout</span>
            </div>
          </div>

          {/* Hero header */}
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-white/[0.04] border-white/10 text-gray-300 backdrop-blur-xl px-3 py-1">
              <Sparkles className="w-3 h-3 mr-1.5 text-blue-300" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">Anoneurx Pay</span>
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">
              Complete your <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">purchase</span>
            </h1>
            <p className="text-sm text-gray-400 max-w-md mx-auto">
              Bank-grade encryption. Zero card storage. Instant provisioning.
            </p>
          </div>

          {/* Stepper */}
          <div className="flex items-center justify-center gap-3 mb-10">
            {[
              { id: "select", label: "Method" },
              { id: "process", label: "Details" },
              { id: "success", label: "Done" },
            ].map((s, i) => {
              const active = s.id === step;
              const done = (step === "process" && i < 1) || (step === "success" && i < 2);
              return (
                <React.Fragment key={s.id}>
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                      active ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30 scale-110" :
                      done ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300" :
                      "bg-white/[0.03] border border-white/10 text-gray-500"
                    }`}>
                      {done ? <Check className="w-3.5 h-3.5" /> : i + 1}
                    </div>
                    <span className={`text-[11px] font-semibold uppercase tracking-wider ${
                      active ? "text-white" : done ? "text-emerald-300" : "text-gray-500"
                    }`}>{s.label}</span>
                  </div>
                  {i < 2 && <div className={`w-12 h-px ${done ? "bg-emerald-500/40" : "bg-white/10"}`} />}
                </React.Fragment>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">
            {/* Main panel */}
            <AnimatePresence mode="wait">
              {step === "select" && (
                <motion.div
                  key="select"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-black/40 overflow-hidden">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <CardContent className="p-7">
                      <div className="mb-6">
                        <h2 className="text-xl font-bold text-white">Choose payment method</h2>
                        <p className="text-xs text-gray-400 mt-1">Select how you'd like to pay for {product}.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                        {methods.map((m) => {
                          const isSel = paymentMethod === m.id;
                          return (
                            <button
                              key={m.id}
                              type="button"
                              onClick={() => setPaymentMethod(m.id)}
                              className={`group relative flex items-center gap-3 p-4 rounded-2xl border text-left transition-all duration-300 overflow-hidden ${
                                isSel
                                  ? "bg-white/[0.06] border-white/30 shadow-lg shadow-black/20"
                                  : "bg-white/[0.015] border-white/5 hover:bg-white/[0.04] hover:border-white/15"
                              }`}
                            >
                              {isSel && (
                                <div className={`absolute inset-0 bg-gradient-to-br ${m.accent} opacity-[0.08]`} />
                              )}
                              <div className={`relative w-11 h-11 rounded-xl bg-gradient-to-br ${m.accent} flex items-center justify-center shadow-lg shrink-0`}>
                                <m.icon className="w-5 h-5 text-white" />
                              </div>
                              <div className="relative flex-1 min-w-0">
                                <div className="text-sm font-semibold text-white truncate">{m.title}</div>
                                <div className="text-[11px] text-gray-400 truncate">{m.desc}</div>
                              </div>
                              <div className={`relative w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                                isSel ? "bg-emerald-500 border-emerald-400" : "border-white/20"
                              }`}>
                                {isSel && <Check className="w-3 h-3 text-white" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <Button
                        onClick={() => setStep("process")}
                        disabled={!paymentMethod}
                        className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white text-sm font-semibold shadow-xl shadow-blue-500/25 disabled:opacity-40 border-0 rounded-xl"
                      >
                        Continue to payment <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {step === "process" && selected && (
                <motion.div
                  key="process"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-black/40 overflow-hidden">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <CardContent className="p-7">
                      <div className="flex items-center gap-3 mb-6">
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${selected.accent} flex items-center justify-center shadow-lg`}>
                          <selected.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h2 className="text-lg font-bold text-white">Pay with {selected.title}</h2>
                          <p className="text-[11px] text-gray-400">{selected.desc}</p>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        {paymentMethod === "card" ? (
                          <>
                            <div>
                              <Label className="text-[10px] uppercase tracking-[0.18em] font-semibold text-gray-400">Cardholder name</Label>
                              <Input required placeholder="Name on card" className="mt-1.5 bg-white/[0.04] border-white/10 text-white h-11 rounded-xl placeholder:text-gray-600" />
                            </div>
                            <div>
                              <Label className="text-[10px] uppercase tracking-[0.18em] font-semibold text-gray-400">Card number</Label>
                              <div className="relative mt-1.5">
                                <Input required placeholder="1234  5678  9012  3456" className="bg-white/[0.04] border-white/10 text-white h-11 rounded-xl pl-11 placeholder:text-gray-600 tracking-widest" />
                                <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label className="text-[10px] uppercase tracking-[0.18em] font-semibold text-gray-400">Expiry</Label>
                                <Input required placeholder="MM / YY" className="mt-1.5 bg-white/[0.04] border-white/10 text-white h-11 rounded-xl placeholder:text-gray-600" />
                              </div>
                              <div>
                                <Label className="text-[10px] uppercase tracking-[0.18em] font-semibold text-gray-400">CVC</Label>
                                <Input required type="password" placeholder="•••" className="mt-1.5 bg-white/[0.04] border-white/10 text-white h-11 rounded-xl placeholder:text-gray-600" />
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="p-10 rounded-2xl bg-white/[0.02] border border-dashed border-white/10 text-center">
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selected.accent} flex items-center justify-center shadow-xl mx-auto mb-4`}>
                              <selected.icon className="w-7 h-7 text-white" />
                            </div>
                            <p className="text-sm font-semibold text-white">You'll be redirected to {selected.title}</p>
                            <p className="text-[11px] text-gray-400 mt-1">Complete your payment securely on the gateway.</p>
                          </div>
                        )}

                        <Button
                          type="submit"
                          disabled={submitting}
                          className="w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white text-sm font-semibold shadow-xl shadow-emerald-500/25 border-0 rounded-xl mt-2"
                        >
                          {submitting ? (
                            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" /> Processing…</>
                          ) : (
                            <><Lock className="w-4 h-4 mr-1.5" /> Pay ${total.toFixed(2)}</>
                          )}
                        </Button>

                        <p className="text-[10px] text-center text-gray-500 pt-1">
                          By confirming you agree to our <a className="text-gray-300 underline">Terms</a> and authorize this charge.
                        </p>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {step === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-black/40 overflow-hidden">
                    <CardContent className="p-12 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.1 }}
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-2xl shadow-emerald-500/30 mx-auto mb-6"
                      >
                        <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={2.5} />
                      </motion.div>
                      <h2 className="text-2xl font-bold text-white mb-2">Payment successful</h2>
                      <p className="text-sm text-gray-400 mb-1">${total.toFixed(2)} charged for {product}.</p>
                      <p className="text-[11px] text-gray-500">A receipt has been sent to your email.</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Order summary sidebar */}
            <div className="space-y-4 lg:sticky lg:top-6">
              <Card className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-black/40 overflow-hidden">
                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-[10px] uppercase tracking-[0.22em] font-bold text-gray-400">Order Summary</h3>
                    <Star className="w-3.5 h-3.5 text-amber-400" />
                  </div>

                  <div className="flex items-start gap-3 pb-5 border-b border-white/5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-white/10 flex items-center justify-center shrink-0">
                      <Layers className="w-5 h-5 text-blue-200" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{product}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{category}</p>
                    </div>
                    <p className="text-sm font-semibold text-white">${subtotal.toFixed(2)}</p>
                  </div>

                  <div className="space-y-2.5 py-5 border-b border-white/5 text-xs">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal</span><span className="text-gray-200">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Tax (8%)</span><span className="text-gray-200">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Processing</span><span className="text-emerald-300">Free</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-baseline pt-5">
                    <span className="text-xs uppercase tracking-[0.18em] font-bold text-gray-300">Total</span>
                    <div className="text-right">
                      <div className="text-[10px] text-gray-500">USD</div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent tracking-tight">
                        ${total.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-2xl">
                <CardContent className="p-5 space-y-3">
                  {[
                    { icon: Shield, text: "256-bit SSL encryption", sub: "Bank-grade security" },
                    { icon: Lock, text: "PCI DSS compliant", sub: "Card data tokenized" },
                    { icon: Zap, text: "Instant activation", sub: "Access within seconds" },
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0">
                        <f.icon className="w-3.5 h-3.5 text-emerald-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold text-white">{f.text}</p>
                        <p className="text-[10px] text-gray-500">{f.sub}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="flex items-center justify-center gap-4 opacity-30">
                {["VISA", "MASTERCARD", "AMEX", "STRIPE"].map(m => (
                  <span key={m} className="text-[9px] font-black tracking-[0.2em] text-white">{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Pay;
