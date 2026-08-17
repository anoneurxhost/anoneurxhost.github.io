import React, { useState } from 'react';
import { ArrowLeft, Send, Plus, X, Lightbulb, Users, Cpu, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { toast } from 'sonner';
import { z } from 'zod';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const projectSchema = z.object({
  title: z.string().trim().min(3, 'Title must be at least 3 characters').max(100, 'Title must be under 100 characters'),
  category: z.string().min(1, 'Please select a category'),
  description: z.string().trim().min(20, 'Description must be at least 20 characters').max(2000, 'Description must be under 2000 characters'),
  problemStatement: z.string().trim().min(10, 'Problem statement is required').max(1000, 'Must be under 1000 characters'),
  proposedSolution: z.string().trim().min(10, 'Proposed solution is required').max(1000, 'Must be under 1000 characters'),
  techStack: z.array(z.string()).min(1, 'Add at least one technology'),
  teamSize: z.string().min(1, 'Please select team size'),
  roles: z.array(z.string()).min(1, 'Add at least one role needed'),
  timeline: z.string().min(1, 'Please select a timeline'),
  name: z.string().trim().min(2, 'Name is required').max(100),
  email: z.string().trim().email('Invalid email address'),
  experience: z.string().min(1, 'Please select your experience level'),
  portfolio: z.string().url('Invalid URL').or(z.literal('')).optional(),
});

type ProjectForm = z.infer<typeof projectSchema>;

const categories = ['AI & Machine Learning', 'Robotics', 'Blockchain', 'Space Technology', 'IoT', 'Quantum Computing', 'Cybersecurity', 'Other'];
const teamSizes = ['1-3 Members', '4-8 Members', '9-15 Members', '16-30 Members', '30+ Members'];
const timelines = ['1-3 Months', '3-6 Months', '6-12 Months', '12-18 Months', '18+ Months'];
const experienceLevels = ['Student', 'Junior (0-2 years)', 'Mid (2-5 years)', 'Senior (5+ years)', 'Lead / Principal'];

const SubmitProject = () => {
  const [form, setForm] = useState<Partial<ProjectForm>>({
    techStack: [],
    roles: [],
  });
  const [techInput, setTechInput] = useState('');
  const [roleInput, setRoleInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  };

  const addChip = (field: 'techStack' | 'roles', value: string, setter: (v: string) => void) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    const arr = (form[field] || []) as string[];
    if (arr.length >= 10) return;
    if (!arr.includes(trimmed)) {
      setForm(prev => ({ ...prev, [field]: [...arr, trimmed] }));
      if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
    }
    setter('');
  };

  const removeChip = (field: 'techStack' | 'roles', value: string) => {
    setForm(prev => ({ ...prev, [field]: ((prev[field] || []) as string[]).filter(v => v !== value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = projectSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => { fieldErrors[err.path[0] as string] = err.message; });
      setErrors(fieldErrors);
      toast.error('Please fix the errors below');
      return;
    }
    setSubmitting(true);
    // Simulate submission
    await new Promise(r => setTimeout(r, 1500));
    setSubmitting(false);
    toast.success('Project proposal submitted successfully! Our team will review it shortly.');
    setForm({ techStack: [], roles: [] });
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 bg-white/[0.04] border ${errors[field] ? 'border-red-500/50' : 'border-white/10'} rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors backdrop-blur-sm`;

  const selectClass = (field: string) =>
    `w-full px-4 py-3 bg-white/[0.04] border ${errors[field] ? 'border-red-500/50' : 'border-white/10'} rounded-xl text-sm text-white focus:outline-none focus:border-primary/50 transition-colors backdrop-blur-sm appearance-none cursor-pointer`;

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-16 bg-transparent">
        <div className="container-responsive text-white">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Header */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="space-y-4">
              <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Portfolio
              </Link>
              <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-1.5">
                <Lightbulb className="w-4 h-4 mr-2" />
                Propose Innovation
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Submit a Project</h1>
              <p className="text-base text-gray-300 max-w-xl">
                Have an innovative idea? Propose your project and collaborate with our global team of engineers and researchers.
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Project Details */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08]">
                  <CardContent className="p-6 space-y-5">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <FileText className="w-5 h-5" />
                      <h2 className="text-lg font-semibold text-white">Project Details</h2>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-300">Project Title *</label>
                      <input className={inputClass('title')} placeholder="e.g. Autonomous Drone Swarm Intelligence" value={form.title || ''} onChange={e => update('title', e.target.value)} maxLength={100} />
                      {errors.title && <p className="text-xs text-red-400">{errors.title}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-300">Category *</label>
                      <select className={selectClass('category')} value={form.category || ''} onChange={e => update('category', e.target.value)}>
                        <option value="" className="bg-gray-900">Select category</option>
                        {categories.map(c => <option key={c} value={c} className="bg-gray-900">{c}</option>)}
                      </select>
                      {errors.category && <p className="text-xs text-red-400">{errors.category}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-300">Description *</label>
                      <textarea className={`${inputClass('description')} min-h-[120px] resize-y`} placeholder="Describe your project in detail..." value={form.description || ''} onChange={e => update('description', e.target.value)} maxLength={2000} />
                      <div className="flex justify-between">
                        {errors.description && <p className="text-xs text-red-400">{errors.description}</p>}
                        <p className="text-xs text-gray-500 ml-auto">{(form.description || '').length}/2000</p>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-300">Problem Statement *</label>
                      <textarea className={`${inputClass('problemStatement')} min-h-[80px] resize-y`} placeholder="What problem does this project solve?" value={form.problemStatement || ''} onChange={e => update('problemStatement', e.target.value)} maxLength={1000} />
                      {errors.problemStatement && <p className="text-xs text-red-400">{errors.problemStatement}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-300">Proposed Solution *</label>
                      <textarea className={`${inputClass('proposedSolution')} min-h-[80px] resize-y`} placeholder="How will your project address this problem?" value={form.proposedSolution || ''} onChange={e => update('proposedSolution', e.target.value)} maxLength={1000} />
                      {errors.proposedSolution && <p className="text-xs text-red-400">{errors.proposedSolution}</p>}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Tech Stack */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08]">
                  <CardContent className="p-6 space-y-5">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <Cpu className="w-5 h-5" />
                      <h2 className="text-lg font-semibold text-white">Technical Requirements</h2>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-300">Tech Stack * <span className="text-gray-500">(press Enter to add)</span></label>
                      <div className="flex gap-2">
                        <input className={`flex-1 ${inputClass('techStack')}`} placeholder="e.g. Python, TensorFlow, ROS2" value={techInput}
                          onChange={e => setTechInput(e.target.value)}
                          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addChip('techStack', techInput, setTechInput); } }}
                        />
                        <button type="button" onClick={() => addChip('techStack', techInput, setTechInput)}
                          className="px-3 py-2 bg-primary/20 text-primary border border-primary/30 rounded-xl hover:bg-primary/30 transition-colors">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      {errors.techStack && <p className="text-xs text-red-400">{errors.techStack}</p>}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {((form.techStack || []) as string[]).map(t => (
                          <Badge key={t} className="bg-primary/10 text-primary border-primary/20 gap-1.5 pr-1.5">
                            {t}
                            <button type="button" onClick={() => removeChip('techStack', t)} className="hover:text-red-400 transition-colors"><X className="w-3 h-3" /></button>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-300">Estimated Timeline *</label>
                      <select className={selectClass('timeline')} value={form.timeline || ''} onChange={e => update('timeline', e.target.value)}>
                        <option value="" className="bg-gray-900">Select timeline</option>
                        {timelines.map(t => <option key={t} value={t} className="bg-gray-900">{t}</option>)}
                      </select>
                      {errors.timeline && <p className="text-xs text-red-400">{errors.timeline}</p>}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Team */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08]">
                  <CardContent className="p-6 space-y-5">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <Users className="w-5 h-5" />
                      <h2 className="text-lg font-semibold text-white">Team Requirements</h2>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-300">Team Size *</label>
                      <select className={selectClass('teamSize')} value={form.teamSize || ''} onChange={e => update('teamSize', e.target.value)}>
                        <option value="" className="bg-gray-900">Select team size</option>
                        {teamSizes.map(s => <option key={s} value={s} className="bg-gray-900">{s}</option>)}
                      </select>
                      {errors.teamSize && <p className="text-xs text-red-400">{errors.teamSize}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-300">Roles Needed * <span className="text-gray-500">(press Enter to add)</span></label>
                      <div className="flex gap-2">
                        <input className={`flex-1 ${inputClass('roles')}`} placeholder="e.g. ML Engineer, Robotics Developer" value={roleInput}
                          onChange={e => setRoleInput(e.target.value)}
                          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addChip('roles', roleInput, setRoleInput); } }}
                        />
                        <button type="button" onClick={() => addChip('roles', roleInput, setRoleInput)}
                          className="px-3 py-2 bg-primary/20 text-primary border border-primary/30 rounded-xl hover:bg-primary/30 transition-colors">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      {errors.roles && <p className="text-xs text-red-400">{errors.roles}</p>}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {((form.roles || []) as string[]).map(r => (
                          <Badge key={r} className="bg-green-500/10 text-green-400 border-green-500/20 gap-1.5 pr-1.5">
                            {r}
                            <button type="button" onClick={() => removeChip('roles', r)} className="hover:text-red-400 transition-colors"><X className="w-3 h-3" /></button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Proposer Info */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08]">
                  <CardContent className="p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-white">Your Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-300">Full Name *</label>
                        <input className={inputClass('name')} placeholder="John Doe" value={form.name || ''} onChange={e => update('name', e.target.value)} maxLength={100} />
                        {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-300">Email *</label>
                        <input type="email" className={inputClass('email')} placeholder="john@example.com" value={form.email || ''} onChange={e => update('email', e.target.value)} maxLength={255} />
                        {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-300">Experience Level *</label>
                        <select className={selectClass('experience')} value={form.experience || ''} onChange={e => update('experience', e.target.value)}>
                          <option value="" className="bg-gray-900">Select level</option>
                          {experienceLevels.map(l => <option key={l} value={l} className="bg-gray-900">{l}</option>)}
                        </select>
                        {errors.experience && <p className="text-xs text-red-400">{errors.experience}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-300">Portfolio URL</label>
                        <input type="url" className={inputClass('portfolio')} placeholder="https://github.com/yourprofile" value={(form.portfolio as string) || ''} onChange={e => update('portfolio', e.target.value)} />
                        {errors.portfolio && <p className="text-xs text-red-400">{errors.portfolio}</p>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Submit */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-6 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl text-base font-semibold transition-colors"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</span>
                  ) : (
                    <span className="flex items-center gap-2"><Send className="w-5 h-5" /> Submit Project Proposal</span>
                  )}
                </Button>
              </motion.div>
            </form>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default SubmitProject;
