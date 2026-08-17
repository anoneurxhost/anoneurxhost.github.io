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
import { ArrowLeft, CheckCircle, Mic } from "lucide-react";
import { toast } from "sonner";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const HostEvent = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", topic: "", description: "", resources: "", date: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.topic || !form.description) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSubmitted(true);
    toast.success("Application submitted successfully!");
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
            <p className="text-muted-foreground mb-6">We'll review your event proposal and get back to you within 5 business days.</p>
            <Link to="/community/events"><Button variant="outline" className="border-white/[0.1]">Back to Events</Button></Link>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-lg">
          <Link to="/community/events" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Events
          </Link>

          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Badge className="mb-4 bg-white/[0.06] border-white/[0.1] text-muted-foreground text-xs">
              <Mic className="w-3 h-3 mr-1" /> Host
            </Badge>
            <h1 className="text-foreground mb-2">Host an Event</h1>
            <p className="text-muted-foreground mb-8">We provide support, promotion, and infrastructure for community events.</p>

            <Card className="bg-white/[0.03] border-white/[0.08]">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="name" className="text-foreground text-sm mb-2 block">Your Name *</Label>
                    <Input id="name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Full name" className="bg-white/[0.04] border-white/[0.1] text-foreground placeholder:text-muted-foreground" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-foreground text-sm mb-2 block">Email *</Label>
                    <Input id="email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@example.com" className="bg-white/[0.04] border-white/[0.1] text-foreground placeholder:text-muted-foreground" />
                  </div>
                  <div>
                    <Label htmlFor="topic" className="text-foreground text-sm mb-2 block">Event Topic *</Label>
                    <Input id="topic" value={form.topic} onChange={e => setForm(f => ({ ...f, topic: e.target.value }))} placeholder="e.g., Advanced TypeScript Patterns" className="bg-white/[0.04] border-white/[0.1] text-foreground placeholder:text-muted-foreground" />
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-foreground text-sm mb-2 block">Event Description *</Label>
                    <Textarea id="description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Describe your event, target audience, and what attendees will learn..." rows={4} className="bg-white/[0.04] border-white/[0.1] text-foreground placeholder:text-muted-foreground resize-none" />
                  </div>
                  <div>
                    <Label htmlFor="resources" className="text-foreground text-sm mb-2 block">Resources Needed</Label>
                    <Textarea id="resources" value={form.resources} onChange={e => setForm(f => ({ ...f, resources: e.target.value }))} placeholder="e.g., Zoom account, recording equipment, co-host..." rows={3} className="bg-white/[0.04] border-white/[0.1] text-foreground placeholder:text-muted-foreground resize-none" />
                  </div>
                  <div>
                    <Label htmlFor="date" className="text-foreground text-sm mb-2 block">Proposed Date</Label>
                    <Input id="date" type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="bg-white/[0.04] border-white/[0.1] text-foreground" />
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

export default HostEvent;
