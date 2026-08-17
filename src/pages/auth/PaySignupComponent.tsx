import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CreditCard, User, Globe, Shield, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import logoSvg from "@/assets/logo.jpeg";

export interface PaySignupComponentProps {
  onNavigateToLogin: () => void;
  onNavigateToPay: () => void;
  onSubmitSignup: (data: { firstName: string; lastName: string; email: string; phone: string; country: string; currency: string; accountType: string }) => Promise<void>;
  loading?: boolean;
  error?: string | null;
  brandName?: string;
}

const inputClass =
  "bg-white/[0.06] border-white/15 text-white placeholder:text-gray-500 h-11 focus-visible:ring-offset-0";

export const PaySignupComponent: React.FC<PaySignupComponentProps> = ({
  onNavigateToLogin,
  onNavigateToPay,
  onSubmitSignup,
  loading = false,
  error = null,
  brandName = "Anoneurx Pay",
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    currency: "USD",
    accountType: "individual",
    acceptTerms: false,
    acceptPrivacy: false,
  });
  const [localError, setLocalError] = useState<string | null>(null);

  const countries = [
    { value: "US", name: "United States", currency: "USD" },
    { value: "GB", name: "United Kingdom", currency: "GBP" },
    { value: "CA", name: "Canada", currency: "CAD" },
    { value: "AU", name: "Australia", currency: "AUD" },
    { value: "EU", name: "European Union", currency: "EUR" },
    { value: "IN", name: "India", currency: "INR" },
    { value: "SG", name: "Singapore", currency: "SGD" },
    { value: "JP", name: "Japan", currency: "JPY" },
  ];

  const accountTypes = [
    { value: "individual", name: "Individual", icon: User },
    { value: "business", name: "Business/Company", icon: Globe },
    { value: "student", name: "Student", icon: Shield },
    { value: "corporate", name: "Corporate", icon: CreditCard },
  ];

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    setLocalError(null);
  };

  const handleSelectChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === "country") {
      const country = countries.find(c => c.value === value);
      if (country) {
        setFormData(prev => ({ ...prev, currency: country.currency }));
      }
    }
  };

  const handleCheckboxChange = (field: string) => (checked: boolean) => {
    setFormData(prev => ({ ...prev, [field]: checked }));
  };

  const validateStep1 = () => {
    if (!formData.firstName.trim()) {
      setLocalError("First name is required.");
      return false;
    }
    if (!formData.lastName.trim()) {
      setLocalError("Last name is required.");
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setLocalError("Please enter a valid email address.");
      return false;
    }
    if (!formData.phone.trim()) {
      setLocalError("Phone number is required.");
      return false;
    }
    if (!formData.country) {
      setLocalError("Country is required.");
      return false;
    }
    if (!formData.accountType) {
      setLocalError("Account type is required.");
      return false;
    }
    if (!formData.acceptTerms) {
      setLocalError("You must accept the Terms of Service.");
      return false;
    }
    if (!formData.acceptPrivacy) {
      setLocalError("You must accept the Privacy Policy.");
      return false;
    }
    return true;
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!formData.acceptTerms || !formData.acceptPrivacy) {
      setLocalError("You must accept all required terms and policies.");
      return;
    }

    await onSubmitSignup({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      currency: formData.currency,
      accountType: formData.accountType,
    });
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
              <img src={logoSvg} alt="Anoneurx Pay" className="w-16 h-16 object-contain mb-2" />
              <div className="text-xl font-brand tracking-wider text-white font-semibold">{brandName}</div>
            </div>

            <div>
              <h1 className="text-2xl font-semibold text-white mb-1.5">Create Your Account</h1>
              <p className="text-sm text-gray-400 mb-6">Sign up for Anoneurx Pay - your secure international payment platform</p>
            </div>

            <form onSubmit={handleNextStep} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-sm text-gray-300">First Name *</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleInputChange("firstName")}
                    className={inputClass}
                    autoFocus
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-sm text-gray-300">Last Name *</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleInputChange("lastName")}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-sm text-gray-300">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  className={inputClass}
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm text-gray-300">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 234 567 8900"
                  value={formData.phone}
                  onChange={handleInputChange("phone")}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country" className="text-sm text-gray-300">Country *</Label>
                  <Select onValueChange={handleSelectChange("country")} value={formData.country}>
                    <SelectTrigger className={`${inputClass} w-full`}>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-white/20 text-white">
                      {countries.map((country) => (
                        <SelectItem key={country.value} value={country.value} className="hover:bg-white/10 focus:bg-white/10">
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="currency" className="text-sm text-gray-300">Default Currency</Label>
                  <div className="relative">
                    <Input
                      id="currency"
                      type="text"
                      value={countries.find(c => c.value === formData.country)?.currency || formData.currency}
                      disabled
                      className="bg-white/[0.06] border-white/15 text-gray-400 h-11 focus-visible:ring-offset-0 cursor-not-allowed"
                    />
                    <Globe className="absolute right-3 top-3.5 w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </div>

              <div className="space-y-3 mt-4">
                <Label className="text-sm text-gray-300">Account Type *</Label>
                <div className="grid grid-cols-1 gap-2">
                  {accountTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <label
                        key={type.value}
                        className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${formData.accountType === type.value
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                          }`}
                      >
                        <input
                          type="radio"
                          name="accountType"
                          value={type.value}
                          checked={formData.accountType === type.value}
                          onChange={() => setFormData(prev => ({ ...prev, accountType: type.value }))}
                          className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 mr-3"
                        />
                        <div className="flex items-center space-x-3">
                          <Icon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-white">{type.name}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm text-gray-300">Agreement</Label>
                {[
                  { key: "acceptTerms", label: "I agree to the Terms of Service" },
                  { key: "acceptPrivacy", label: "I accept the Privacy Policy" },
                ].map((item) => (
                  <label key={item.key} className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox
                      checked={(formData as any)[item.key]}
                      onCheckedChange={handleCheckboxChange(item.key)}
                      className="border-white/20 data-[state=checked]:bg-blue-600"
                    />
                    <span className="text-xs text-gray-300">{item.label}</span>
                  </label>
                ))}
              </div>

              {currentError && <p className="text-sm text-red-400">{currentError}</p>}

              <Button
                type="submit"
                className="w-full h-11 px-6 bg-blue-600 hover:bg-blue-500 text-white font-medium"
              >
                Continue
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
                onClick={() => onNavigateToPay()}
                className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Payment Options
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
                <span className="max-w-[200px] truncate">Edit Details</span>
              </button>
            </div>

            <div className="flex flex-col items-center justify-center text-center mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-semibold text-white mb-1.5">Almost Done</h1>
              <p className="text-sm text-gray-400">You're just one step away from joining Anoneurx Pay</p>
            </div>

            <Card className="bg-white/5 border-white/10 mb-4">
              <CardContent className="p-6">
                <h3 className="text-base font-semibold text-white mb-4">Review Your Details</h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">Full Name:</span>
                    <span className="text-sm text-white">{formData.firstName} {formData.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">Email:</span>
                    <span className="text-sm text-white">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">Phone:</span>
                    <span className="text-sm text-white">{formData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">Country:</span>
                    <span className="text-sm text-white">{countries.find(c => c.value === formData.country)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">Currency:</span>
                    <span className="text-sm text-white">{formData.currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">Account Type:</span>
                    <span className="text-sm text-white">{accountTypes.find(t => t.value === formData.accountType)?.name}</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-green-600/20 border border-green-600/30 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-green-300">Secure & Protected</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Your information is encrypted and protected. We use PayPal-style security.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Button
              type="submit"
              className="w-full h-11 px-6 bg-blue-600 hover:bg-blue-500 text-white font-medium"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Create Anoneurx Pay Account
            </Button>

            <p className="text-center text-xs text-gray-500">
              By creating your account, you agree to our Terms of Service and Privacy Policy
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaySignupComponent;