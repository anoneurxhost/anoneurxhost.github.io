import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import logoSvg from "@/assets/logo.jpeg";

export interface PayComponentProps {
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
  onSubmitPay: (data: { email: string; plan: string; paymentMethod: string }) => Promise<void>;
  loading?: boolean;
  error?: string | null;
  brandName?: string;
}

const inputClass =
  "bg-white/[0.06] border-white/15 text-white placeholder:text-gray-500 h-11 focus-visible:ring-offset-0";

export const PayComponent: React.FC<PayComponentProps> = ({
  onNavigateToLogin,
  onNavigateToSignup,
  onSubmitPay,
  loading = false,
  error = null,
  brandName = "Anoneurx",
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const plans = [
    { value: "basic", name: "Basic Plan", price: "$29/month", features: ["Access to basic features", "Standard support", "Limited integrations"] },
    { value: "pro", name: "Pro Plan", price: "$79/month", features: ["All features", "Priority support", "Unlimited integrations", "Advanced analytics"] },
    { value: "enterprise", name: "Enterprise Plan", price: "$199/month", features: ["All Pro features", "24/7 support", "Custom integrations", "Dedicated account manager"] },
  ];

  const paymentMethods = [
    { value: "credit-card", name: "Credit/Debit Card" },
    { value: "paypal", name: "PayPal" },
    { value: "bank-transfer", name: "Bank Transfer" },
  ];

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!email.trim() || !email.includes("@")) {
      setLocalError("Please enter a valid email address.");
      return;
    }

    if (!plan) {
      setLocalError("Please select a plan.");
      return;
    }

    if (!paymentMethod) {
      setLocalError("Please select a payment method.");
      return;
    }

    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!paymentMethod) {
      setLocalError("Please select a payment method.");
      return;
    }

    await onSubmitPay({ email, plan, paymentMethod });
  };

  const currentError = localError || error;

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="space-y-4"
          >
            <div className="flex flex-col items-center justify-center text-center mb-6">
              <img src={logoSvg} alt="Anoneurx" className="w-16 h-16 object-contain mb-2" />
              <div className="text-xl font-brand tracking-wider text-white font-semibold">{brandName}</div>
            </div>

            <div>
              <h1 className="text-2xl font-semibold text-white mb-1.5">Choose Your Plan</h1>
              <p className="text-sm text-gray-400 mb-6">Select the plan that best fits your needs and start your subscription today.</p>
            </div>

            <form onSubmit={handleNextStep} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-sm text-gray-300">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setLocalError(null);
                  }}
                  className={inputClass}
                  autoFocus
                />
              </div>

              {currentError && <p className="text-sm text-red-400">{currentError}</p>}

              <div className="space-y-3">
                <Label className="text-sm text-gray-300">Select Plan</Label>
                {plans.map((planOption) => (
                  <label
                    key={planOption.value}
                    className={`block p-4 rounded-lg border cursor-pointer transition-all ${plan === planOption.value
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-white">{planOption.name}</div>
                        <div className="text-sm text-blue-400 mt-1">{planOption.price}</div>
                      </div>
                      <input
                        type="radio"
                        name="plan"
                        value={planOption.value}
                        checked={plan === planOption.value}
                        onChange={() => setPlan(planOption.value)}
                        className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600"
                      />
                    </div>
                    <ul className="mt-3 space-y-1">
                      {planOption.features.map((feature, i) => (
                        <li key={i} className="text-xs text-gray-400">• {feature}</li>
                      ))}
                    </ul>
                  </label>
                ))}
              </div>

              <div className="space-y-3">
                <Label className="text-sm text-gray-300">Payment Method</Label>
                {paymentMethods.map((method) => (
                  <label
                    key={method.value}
                    className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all ${paymentMethod === method.value
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                      }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-5 h-5 text-gray-400" />
                        <span className="text-white">{method.name}</span>
                      </div>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={paymentMethod === method.value}
                        onChange={() => setPaymentMethod(method.value)}
                        className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600"
                      />
                    </div>
                  </label>
                ))}
              </div>

              <Button
                type="submit"
                className="w-full h-11 px-6 bg-blue-600 hover:bg-blue-500 text-white font-medium"
              >
                Continue to Payment
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 text-xs text-gray-500 bg-transparent">or</span>
              </div>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => onNavigateToLogin()}
                className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between mb-6">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-xs text-gray-300 transition-colors border border-white/10"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-gray-400" />
                <span className="max-w-[200px] truncate">Edit Plan Selection</span>
              </button>
            </div>

            <div className="flex flex-col items-center justify-center text-center mb-6">
              <Card className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="w-8 h-8 text-white" />
              </Card>
              <h1 className="text-2xl font-semibold text-white mb-1.5">Payment Details</h1>
              <p className="text-sm text-gray-400">Enter your payment information to complete your subscription</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs text-gray-400">Email</Label>
                      <p className="text-sm text-white mt-1">{email}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-400">Plan Selected</Label>
                      <p className="text-sm text-white mt-1">{plans.find(p => p.value === plan)?.name}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-400">Total (per month)</Label>
                      <p className="text-lg font-bold text-white mt-1">{plans.find(p => p.value === plan)?.price}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-400">Payment Method</Label>
                      <p className="text-sm text-white mt-1">{paymentMethods.find(m => m.value === paymentMethod)?.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {currentError && <p className="text-sm text-red-400">{currentError}</p>}

              <Button
                type="submit"
                className="w-full h-11 px-6 bg-blue-600 hover:bg-blue-500 text-white font-medium"
                disabled={loading}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Complete Payment
              </Button>
            </form>

            <p className="text-center text-xs text-gray-500 mt-7">
              By proceeding, you agree to our Terms of Service and Privacy Policy
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PayComponent;