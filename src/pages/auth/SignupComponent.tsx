import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import logoSvg from "@/assets/logo.jpeg";

export interface SignupComponentProps {
  onNavigateToLogin: () => void;
  onNavigateToPay?: () => void;
  onSubmitSignup: (data: { email: string; password: string; name: string }) => Promise<void>;
  onVerifyCode?: (data: { email: string; code: string }) => Promise<void>;
  loading?: boolean;
  error?: string | null;
  brandName?: string;
}

const inputClass =
  "bg-white/[0.06] border-white/15 text-white placeholder:text-gray-500 h-11 focus-visible:ring-offset-0";

export const SignupComponent: React.FC<SignupComponentProps> = ({
  onNavigateToLogin,
  onSubmitSignup,
  onVerifyCode,
  loading = false,
  error = null,
  brandName = "Anoneurx",
}) => {
  // Steps: 1 = Email, 2 = Password, 3 = Name, 4 = Verification Code
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [code, setCode] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!email.trim() || !email.includes("@")) {
      setLocalError("Please enter a valid email address.");
      return;
    }
    setStep(2);
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!password || password.length < 8) {
      setLocalError("Password must be at least 8 characters long.");
      return;
    }
    setStep(3);
  };

  const handleNextStep3 = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    if (!fullName) {
      setLocalError("Please enter your name.");
      return;
    }
    try {
      await onSubmitSignup({ email, password, name: fullName });
      setStep(4);
    } catch (err: any) {
      setLocalError(err?.message || "Failed to create account. Please try again.");
    }
  };

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!code || code.length < 6) {
      setLocalError("Enter the full 6-digit code.");
      return;
    }
    try {
      if (onVerifyCode) {
        await onVerifyCode({ email, code });
      }
    } catch (err: any) {
      setLocalError(err?.message || "Invalid verification code.");
    }
  };

  const currentError = localError || error;

  return (
    <div className="w-full">
      {/* Header Logo */}
      <div className="flex flex-col items-center justify-center text-center mb-6">
        <img src={logoSvg} alt="Anoneurx" className="w-16 h-16 object-contain mb-2" />
        <div className="text-xl font-brand tracking-wider text-white font-semibold">{brandName}</div>
      </div>

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
            <div>
              <h1 className="text-2xl font-semibold text-white mb-1.5">Create account</h1>
              <p className="text-sm text-gray-400 mb-6">One account for every {brandName} service.</p>
            </div>

            <form onSubmit={handleNextStep1} className="space-y-4">
              <div className="space-y-1.5">
                <Input
                  type="email"
                  placeholder="someone@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setLocalError(null);
                  }}
                  autoFocus
                  className={inputClass}
                />
              </div>

              {currentError && <p className="text-sm text-red-400">{currentError}</p>}

              <div className="flex items-center justify-end pt-2">
                <Button type="submit" className="h-11 px-6 bg-blue-600 hover:bg-blue-500 text-white font-medium">
                  Next
                </Button>
              </div>
            </form>
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
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-xs text-gray-300 transition-colors border border-white/10"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-gray-400" />
              <span className="max-w-[200px] truncate">{email}</span>
            </button>

            <div>
              <h1 className="text-2xl font-semibold text-white mb-1.5">Create a password</h1>
            </div>

            <form onSubmit={handleNextStep2} className="space-y-4">
              <div className="relative space-y-1.5">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLocalError(null);
                  }}
                  autoFocus
                  className={`${inputClass} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {currentError && <p className="text-sm text-red-400">{currentError}</p>}

              <div className="flex items-center justify-end pt-2">
                <Button type="submit" className="h-11 px-6 bg-blue-600 hover:bg-blue-500 text-white font-medium">
                  Next
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="space-y-4"
          >
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-xs text-gray-300 transition-colors border border-white/10"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-gray-400" />
              <span className="max-w-[200px] truncate">{email}</span>
            </button>

            <div>
              <h1 className="text-2xl font-semibold text-white mb-1.5">What's your name?</h1>
            </div>

            <form onSubmit={handleNextStep3} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setLocalError(null);
                  }}
                  autoFocus
                  className={inputClass}
                />
                <Input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setLocalError(null);
                  }}
                  className={inputClass}
                />
              </div>

              {currentError && <p className="text-sm text-red-400">{currentError}</p>}

              <div className="flex items-center justify-end pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-11 px-6 bg-blue-600 hover:bg-blue-500 text-white font-medium"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Next"}
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="space-y-4"
          >
            <div>
              <h1 className="text-2xl font-semibold text-white mb-1.5">Verify email</h1>
              <p className="text-sm text-gray-400 mb-4">Enter code sent to {email}.</p>
            </div>

            <form onSubmit={handleVerifySubmit} className="space-y-4">
              <div className="flex justify-center py-2">
                <InputOTP
                  maxLength={6}
                  value={code}
                  onChange={(v) => {
                    setCode(v);
                    setLocalError(null);
                  }}
                >
                  <InputOTPGroup>
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <InputOTPSlot key={i} index={i} className="border-white/15 text-white h-11 w-11" />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {currentError && <p className="text-sm text-red-400 text-center">{currentError}</p>}

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="text-xs text-gray-400 hover:text-white"
                >
                  Back
                </button>

                <Button
                  type="submit"
                  disabled={loading}
                  className="h-11 px-6 bg-blue-600 hover:bg-blue-500 text-white font-medium"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Finish"}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-center text-xs text-gray-500 mt-7">
        Already have an account?{" "}
        <button type="button" onClick={onNavigateToLogin} className="text-blue-400 hover:text-blue-300">
          Sign in
        </button>
      </p>
    </div>
  );
};
