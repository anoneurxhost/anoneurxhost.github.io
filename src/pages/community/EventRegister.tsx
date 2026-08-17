import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const categories = ["Student", "Professional", "Researcher", "Educator", "Hobbyist", "Other"];

const EventRegister = () => {
  const { eventId } = useParams();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", category: "", interests: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.category) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSubmitted(true);
    toast.success("Registration submitted successfully!");
  };

  if (submitted) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center px-4">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center max-w-md">
            <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h1 className="text-foreground mb-3">You're Registered!</h1>
            <p className="text-muted-foreground mb-6">We've sent a confirmation email with all the event details.</p>
            <Link to="/community/events/upcoming"><Button variant="outline" className="border-white/[0.1]">Back to Events</Button></Link>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-lg">
          <Link to={`/community/events/${eventId}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Event
          </Link>

          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Badge className="mb-4 bg-white/[0.06] border-white/[0.1] text-muted-foreground text-xs">Registration</Badge>
            <h1 className="text-foreground mb-2">Event Registration</h1>
            <p className="text-muted-foreground mb-8">Fill in the form below to secure your spot.</p>

            <Card className="bg-white/[0.03] border-white/[0.08]">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="name" className="text-foreground text-sm mb-2 block">Full Name *</Label>
                    <Input id="name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your full name" className="bg-white/[0.04] border-white/[0.1] text-foreground placeholder:text-muted-foreground" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-foreground text-sm mb-2 block">Email *</Label>
                    <Input id="email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@example.com" className="bg-white/[0.04] border-white/[0.1] text-foreground placeholder:text-muted-foreground" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-foreground text-sm mb-2 block">Phone</Label>
                    <Input id="phone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+1 (555) 000-0000" className="bg-white/[0.04] border-white/[0.1] text-foreground placeholder:text-muted-foreground" />
                  </div>
                  <div>
                    <Label className="text-foreground text-sm mb-2 block">Category *</Label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(c => (
                        <button type="button" key={c} onClick={() => setForm(f => ({ ...f, category: c }))}
                          className={`px-4 py-2 rounded-lg text-sm transition-all border ${form.category === c ? "bg-white/[0.12] text-foreground border-white/[0.2]" : "text-muted-foreground border-white/[0.08] hover:bg-white/[0.06]"}`}>
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="interests" className="text-foreground text-sm mb-2 block">What are you most interested in?</Label>
                    <Textarea id="interests" value={form.interests} onChange={e => setForm(f => ({ ...f, interests: e.target.value }))} placeholder="Tell us what you're hoping to learn or discuss..." rows={3} className="bg-white/[0.04] border-white/[0.1] text-foreground placeholder:text-muted-foreground resize-none" />
                  </div>
                  <Button type="submit" className="w-full">Register</Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default EventRegister;
