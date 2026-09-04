import { useState } from "react";
import OSPage from "./OSPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Handshake,
  Heart,
  Sparkles,
  Award,
  Shield,
  Send,
  CheckCircle2,
} from "lucide-react";

const tierOptions = [
  { value: "platinum", label: "Platinum", description: "Logo on every README, dedicated engineering, roadmap co-planning." },
  { value: "gold", label: "Gold", description: "Logo on the opensource homepage, quarterly briefings, office hours." },
  { value: "silver", label: "Silver", description: "Logo on the sponsors page, newsletter recognition." },
  { value: "custom", label: "Custom / General inquiry", description: "Something else — tell us about your goals." },
];

const OSSponsorshipInquiry = () => {
  const [tier, setTier] = useState("");
  const [project, setProject] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    data.append("sponsorshipTier", tier);
    data.append("project", project);
    console.log("Open source sponsorship inquiry submitted:", Object.fromEntries(data.entries()));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <OSPage>
        <div className="max-w-xl mx-auto text-center py-20">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15 mb-6">
            <CheckCircle2 className="h-8 w-8 text-emerald-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Inquiry received</h1>
          <p className="text-white/60 leading-relaxed mb-8">
            Thanks for supporting Anoneurx open source. Our sponsorship team will get back to you at the email provided within 2 business days.
          </p>
          <Button asChild className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600">
            <a href="mailto:opensource@anoneurx.com">opensource@anoneurx.com</a>
          </Button>
        </div>
      </OSPage>
    );
  }

  return (
    <OSPage>
      <div className="text-center mb-14">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur-xl mb-4">
          <Heart className="h-3.5 w-3.5 text-rose-400" /> Sponsor a Project
        </span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Sponsor an{" "}
          <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-amber-300 bg-clip-text text-transparent">
            Open Source Project
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg leading-relaxed text-white/70">
          Fund the work that keeps Blackwall OS and Anoneurx open source free forever. Choose a tier, pick a project, and support the maintainers.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl rounded-3xl">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <Handshake className="w-5 h-5 mr-2 text-indigo-400" />
                Sponsorship Application
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-white/80 text-sm">Company Name *</Label>
                  <Input id="companyName" name="companyName" required
                    className="bg-white/[0.05] border-white/10 text-white placeholder:text-gray-500"
                    placeholder="Your Company Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPerson" className="text-white/80 text-sm">Contact Person *</Label>
                  <Input id="contactPerson" name="contactPerson" required
                    className="bg-white/[0.05] border-white/10 text-white placeholder:text-gray-500"
                    placeholder="Full Name" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/80 text-sm">Email *</Label>
                  <Input id="email" name="email" type="email" required
                    className="bg-white/[0.05] border-white/10 text-white placeholder:text-gray-500"
                    placeholder="contact@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white/80 text-sm">Phone</Label>
                  <Input id="phone" name="phone"
                    className="bg-white/[0.05] border-white/10 text-white placeholder:text-gray-500"
                    placeholder="+1 (555) 123-4567" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white/80 text-sm">Sponsorship Tier *</Label>
                <Select required onValueChange={setTier} value={tier}>
                  <SelectTrigger className="bg-white/[0.05] border-white/10 text-white">
                    <SelectValue placeholder="Select a sponsorship tier" />
                  </SelectTrigger>
                  <SelectContent>
                    {tierOptions.map((t) => (
                      <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white/80 text-sm">Which project would you like to sponsor?</Label>
                <Select onValueChange={setProject} value={project}>
                  <SelectTrigger className="bg-white/[0.05] border-white/10 text-white">
                    <SelectValue placeholder="Select a project (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blackwall">Blackwall OS</SelectItem>
                    <SelectItem value="authenticator">Authenticator</SelectItem>
                    <SelectItem value="all">All Anoneurx open source</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="proposal" className="text-white/80 text-sm">Sponsorship Proposal *</Label>
                <Textarea id="proposal" name="proposal" required
                  className="bg-white/[0.05] border-white/10 text-white placeholder:text-gray-500 min-h-[8rem]"
                  placeholder="Describe your sponsorship goals, budget range, and what you'd like to support." />
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600">
                <Send className="w-4 h-4 mr-2" />
                Submit Sponsorship Inquiry
              </Button>
            </CardContent>
          </Card>
        </form>

        <div className="space-y-6">
          <Card className="bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl rounded-3xl">
            <CardContent className="p-8">
              <h3 className="text-lg font-semibold text-white mb-5">Sponsorship Tiers</h3>
              <div className="space-y-5">
                <div className="flex gap-3">
                  <Sparkles className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-white text-sm">Platinum</p>
                    <p className="text-xs text-gray-400">Logo on every project README, dedicated engineering support, roadmap co-planning, priority hiring pipeline.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Award className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-white text-sm">Gold</p>
                    <p className="text-xs text-gray-400">Logo on the opensource homepage, quarterly briefings, access to maintainer office hours.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Shield className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-white text-sm">Silver</p>
                    <p className="text-xs text-gray-400">Logo on the sponsors page and newsletter recognition.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl rounded-3xl">
            <CardContent className="p-8">
              <h3 className="text-lg font-semibold text-white mb-5">How it works</h3>
              <div className="space-y-3">
                {["Submit your sponsorship inquiry", "Initial review and assessment", "Sponsorship discussion and tier finalization", "Agreement and launch of benefits"].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
                      {i + 1}
                    </div>
                    <span className="text-sm text-gray-300">{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </OSPage>
  );
};

export default OSSponsorshipInquiry;
