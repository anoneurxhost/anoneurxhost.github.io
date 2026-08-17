import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, KeyRound, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import logoSvg from "@/assets/logo.jpeg";

export interface LoginComponentProps {
  onNavigateToSignup: () => void;
  onNavigateToForgot?: () => void;
  onSubmitLogin: (data: { email: string; password?: string; keepSignedIn?: boolean }) => Promise<void>;
  loading?: boolean;
  error?: string | null;
  brandName?: string;
  onSocialLogin?: (provider: "github" | "google" | "microsoft") => void;
}

export const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

export const MicrosoftLogo = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.4 11.4H0V0h11.4v11.4z" fill="#F25022" />
    <path d="M24 11.4H12.6V0H24v11.4z" fill="#7FBA00" />
    <path d="M11.4 24H0V12.6h11.4V24z" fill="#00A4EF" />
    <path d="M24 24H12.6V12.6H24V24z" fill="#FFB900" />
  </svg>
);

export const GithubLogo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const inputClass =
  "bg-white/[0.06] border-white/15 text-white placeholder:text-gray-500 h-11 focus-visible:ring-offset-0";

export const LoginComponent: React.FC<LoginComponentProps> = ({
  onNavigateToSignup,
  onNavigateToForgot,
  onSubmitLogin,
  loading = false,
  error = null,
  brandName = "Anoneurx",
  onSocialLogin,
}) => {
  // Multi-screen steps: 1 = Email, 2 = Password, 3 = Stay signed in, 4 = Sign-in options
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!email.trim() || !email.includes("@")) {
      setLocalError("Enter a valid email address.");
      return;
    }
    setStep(2);
  };

  const handleNextStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!password) {
      setLocalError("Please enter your password.");
      return;
    }
    setStep(3);
  };

  const handleFinalSubmit = async (stay: boolean) => {
    setKeepSignedIn(stay);
    try {
      await onSubmitLogin({ email, password, keepSignedIn: stay });
    } catch (err: unknown) {
      setStep(2);
      setLocalError(err instanceof Error ? err.message : "Failed to sign in. Please verify your credentials.");
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
              <h1 className="text-2xl font-semibold text-white mb-1.5">Sign in</h1>
              <p className="text-sm text-gray-400 mb-6">Use your {brandName} account to continue.</p>
            </div>

            <form onSubmit={handleNextStep1} className="space-y-4">
              <div className="space-y-1.5">
                <Input
                  type="email"
                  placeholder="you@example.com"
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

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Sign-in options</span>
                </button>

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
              <h1 className="text-2xl font-semibold text-white mb-1.5">Enter password</h1>
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

              <div className="flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={onNavigateToForgot}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Forgot password?
                </button>

                <Button
                  type="submit"
                  disabled={loading}
                  className="h-11 px-6 bg-blue-600 hover:bg-blue-500 text-white font-medium"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign in"}
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
            className="space-y-5"
          >
            <div>
              <h1 className="text-2xl font-semibold text-white mb-1.5">Stay signed in?</h1>
              <p className="text-sm text-gray-400">Reduce the number of times you are asked to sign in.</p>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-gray-300 select-none">
                <Checkbox
                  checked={keepSignedIn}
                  onCheckedChange={(val) => setKeepSignedIn(Boolean(val))}
                  className="border-white/20"
                />
                <span>Don't show this again</span>
              </label>
            </div>

            {currentError && <p className="text-sm text-red-400">{currentError}</p>}

            <div className="flex items-center justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                disabled={loading}
                onClick={() => handleFinalSubmit(false)}
                className="h-11 px-6 bg-white/5 border-white/10 hover:bg-white/10 text-white"
              >
                No
              </Button>
              <Button
                type="button"
                disabled={loading}
                onClick={() => handleFinalSubmit(true)}
                className="h-11 px-6 bg-blue-600 hover:bg-blue-500 text-white font-medium"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Yes"}
              </Button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="space-y-5"
          >
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-white">Sign-in options</h1>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-gray-400 hover:text-white"
              >
                Back
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => onSocialLogin?.("github")}
                aria-label="Continue with GitHub"
                className="h-11 bg-white/5 border-white/10 hover:bg-white/10 text-white"
              >
                <GithubLogo />
              </Button>
              <Button
                variant="outline"
                onClick={() => onSocialLogin?.("google")}
                aria-label="Continue with Google"
                className="h-11 bg-white/5 border-white/10 hover:bg-white/10"
              >
                <GoogleLogo />
              </Button>
              <Button
                variant="outline"
                onClick={() => onSocialLogin?.("microsoft")}
                aria-label="Continue with Microsoft"
                className="h-11 bg-white/5 border-white/10 hover:bg-white/10"
              >
                <MicrosoftLogo />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {(step === 1 || step === 4) && (
        <p className="text-center text-xs text-gray-500 mt-7">
          No account?{" "}
          <button type="button" onClick={onNavigateToSignup} className="text-blue-400 hover:text-blue-300">
            Create one
          </button>
        </p>
      )}
    </div>
  );
};
