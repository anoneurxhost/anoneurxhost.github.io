import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CheckCircle, GraduationCap } from "lucide-react";
import { toast } from "sonner";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const MentorshipApply = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", profession: "", experience: "", motivation: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.profession || !form.experience || !form.motivation) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSubmitted(true);
    toast.success("Mentorship application submitted!");
  };

  if (submitted) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center px-4">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center max-w-md">
            <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h1 className="text-foreground mb-3">Application Received!</h1>
            <p className="text-muted-foreground mb-6">Thank you for your interest in mentoring. We'll be in touch soon.</p>
            <Link to="/community/leaderboard"><Button variant="outline" className="border-white/[0.1]">Back to Leaderboard</Button></Link>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-lg">
          <Link to="/community/leaderboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Leaderboard
          </Link>

          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Badge className="mb-4 bg-white/[0.06] border-white/[0.1] text-muted-foreground text-xs">
              <GraduationCap className="w-3 h-3 mr-1" /> Mentorship
            </Badge>
            <h1 className="text-foreground mb-2">Become a Mentor</h1>
            <p className="text-muted-foreground mb-8">Share your expertise and help shape the next generation of developers.</p>

            <Card className="bg-white/[0.03] border-white/[0.08]">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="name" className="text-foreground text-sm mb-2 block">Full Name *</Label>
                    <Input id="name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your full name" className="bg-white/[0.04] border-white/[0.1] text-foreground placeholder:text-muted-foreground" />
                  </div>
                  <div>
                    <Label htmlFor="profession" className="text-foreground text-sm mb-2 block">Profession / Skill *</Label>
                    <Input id="profession" value={form.profession} onChange={e => setForm(f => ({ ...f, profession: e.target.value }))} placeholder="e.g., Full-Stack Developer, ML Engineer" className="bg-white/[0.04] border-white/[0.1] text-foreground placeholder:text-muted-foreground" />
                  </div>
                  <div>
                    <Label htmlFor="experience" className="text-foreground text-sm mb-2 block">Experience *</Label>
                    <Textarea id="experience" value={form.experience} onChange={e => setForm(f => ({ ...f, experience: e.target.value }))} placeholder="Describe your professional experience and areas of expertise..." rows={3} className="bg-white/[0.04] border-white/[0.1] text-foreground placeholder:text-muted-foreground resize-none" />
                  </div>
                  <div>
                    <Label htmlFor="motivation" className="text-foreground text-sm mb-2 block">Why do you want to mentor? *</Label>
                    <Textarea id="motivation" value={form.motivation} onChange={e => setForm(f => ({ ...f, motivation: e.target.value }))} placeholder="What motivates you to become a mentor..." rows={3} className="bg-white/[0.04] border-white/[0.1] text-foreground placeholder:text-muted-foreground resize-none" />
                  </div>
                  <Button type="submit" className="w-full">Submit Application</Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default MentorshipApply;
