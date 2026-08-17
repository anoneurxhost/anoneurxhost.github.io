import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bug, CheckCircle2, ChevronRight, Info, Laptop, Layers, Mail, MapPin, Shield, Compass, Code, Activity } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import PageTransition from "@/components/PageTransition";

const ReportBug = () => {
  const { product } = useParams<{ product: string }>();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isBlackwall = product === 'blackwall';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitted(true);
    setIsSubmitting(false);
    toast.success(`Bug report for ${product} submitted`);
  };

  const productInfo = isBlackwall ? {
    title: "Blackwall OS Intelligence",
    description: "Provide system-level diagnostics for kernel-level bugs.",
    tips: [
      { icon: Code, text: "Include kernel panic logs or stack traces if available." },
      { icon: Activity, text: "Specify the hardware environment and driver versions." },
      { icon: Shield, text: "Note any security policy violations or firewall issues." }
    ],
    accent: "text-purple-400"
  } : {
    title: "Nexora Engine Insights",
    description: "Help us refine the nexus between speed and privacy.",
    tips: [
      { icon: Laptop, text: "Export console logs (F12) for rendering or JS errors." },
      { icon: Compass, text: "Specify the URL where the misbehavior occurred." },
      { icon: Activity, text: "Note any conflicting extensions or proxy settings." }
    ],
    accent: "text-blue-400"
  };

  return (
    <PageTransition>
      <div className="section-padding min-h-screen flex items-center justify-center">
        <div className="container-responsive max-w-5xl">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full flex justify-center"
              >
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 rounded-[5px] text-center p-12 max-w-md shadow-2xl">
                  <div className="h-20 w-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-white mb-3 uppercase tracking-tighter">Report Synchronized</CardTitle>
                  <CardDescription className="text-gray-400 mb-10 leading-relaxed text-sm">
                    The engineering teams for <span className="text-white font-bold capitalize">{product}</span> have been notified. Your contribution accelerates our stability roadmap.
                  </CardDescription>
                  <Link to={isBlackwall ? '/blackwall' : '/nexora'}>
                    <Button variant="glass" className="w-full h-14 rounded-[5px] text-sm font-bold uppercase tracking-[0.2em] transition-all">
                      Return to Workspace
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid lg:grid-cols-2 gap-8 items-stretch"
              >
                {/* Form Card */}
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 rounded-[5px] overflow-hidden shadow-2xl flex flex-col">
                  <form onSubmit={handleSubmit} className="flex flex-col h-full">
                    <CardHeader className="bg-white/5 border-b border-white/10 px-8 py-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg font-bold text-white uppercase tracking-widest flex items-center gap-2">
                            <Bug className={`h-5 w-5 ${isBlackwall ? 'text-purple-400' : 'text-blue-400'}`} />
                            Incident Report
                          </CardTitle>
                          <CardDescription className="text-[11px] text-gray-500 uppercase tracking-tighter">
                            Target Ecosystem: <span className="text-white font-bold">{product}</span>
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-8 space-y-6 flex-1">
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-[11px] uppercase font-bold text-gray-400 tracking-widest ml-1">Context Summary</Label>
                        <Input
                          id="title"
                          required
                          placeholder="Briefly state what failed..."
                          className="bg-white/5 border-white/10 backdrop-blur-md rounded-[5px] h-12 text-white placeholder:text-gray-700 focus:border-primary/50 text-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="version" className="text-[11px] uppercase font-bold text-gray-400 tracking-widest ml-1">Build / Version</Label>
                        <Input
                          id="version"
                          required
                          placeholder="e.g. v2.0.4-dev"
                          className="bg-white/5 border-white/10 backdrop-blur-md rounded-[5px] h-12 text-white placeholder:text-gray-700 focus:border-primary/50 text-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-[11px] uppercase font-bold text-gray-400 tracking-widest ml-1">Reproduction Steps</Label>
                        <Textarea
                          id="description"
                          required
                          rows={6}
                          placeholder="Describe the sequence of actions that triggered the issue..."
                          className="bg-white/5 border-white/10 backdrop-blur-md rounded-[5px] text-white placeholder:text-gray-700 focus:border-primary/50 resize-none leading-relaxed text-sm"
                        />
                      </div>
                    </CardContent>

                    <CardFooter className="px-8 pb-10 pt-4">
                      <Button
                        type="submit"
                        className={`w-full h-14 ${isBlackwall ? 'bg-purple-600 hover:bg-purple-500' : 'bg-blue-600 hover:bg-blue-500'} text-white rounded-[5px] font-bold text-xs uppercase tracking-[0.3em] transition-all group shadow-xl`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : (
                          <div className="flex items-center gap-2">
                            Synchronize Report
                            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>

                {/* Info Card */}
                <div className="flex flex-col gap-8">
                  <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[5px] p-8 flex-1">
                    <CardHeader className="p-0 mb-8">
                      <CardTitle className="text-2xl font-bold text-white uppercase tracking-tighter mb-2">{productInfo.title}</CardTitle>
                      <CardDescription className="text-gray-400 text-sm leading-relaxed">
                        {productInfo.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 space-y-6">
                      {productInfo.tips.map((tip, i) => (
                        <div key={i} className="flex items-start gap-4 group">
                          <div className={`mt-1 p-2 rounded-lg bg-white/5 border border-white/10 ${productInfo.accent} transition-colors group-hover:bg-white/10`}>
                            <tip.icon className="h-4 w-4" />
                          </div>
                          <p className="text-xs text-gray-400 leading-relaxed pt-1 group-hover:text-gray-300 transition-colors">
                            {tip.text}
                          </p>
                        </div>
                      ))}
                    </CardContent>
                    <div className="mt-12 pt-8 border-t border-white/10">
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">Urgent Inquiries</p>
                      <div className="grid gap-4">
                        <div className="flex items-center gap-3 group cursor-pointer">
                          <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all text-blue-400">
                            <Mail className="h-4 w-4" />
                          </div>
                          <span className="text-xs text-gray-400">securityops@anoneurx.com</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Secondary small card */}
                  <Card className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-[5px] p-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
                        <Activity className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white uppercase tracking-widest">Global Status</p>
                        <p className="text-[10px] text-emerald-400 uppercase tracking-tighter">Systems Operational</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
};

export default ReportBug;
