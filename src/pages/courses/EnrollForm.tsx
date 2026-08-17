import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Loader2, Sparkles, User, Mail, Phone, BookOpen, GraduationCap, Globe, Calendar, Briefcase, FileText, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageTransition from "@/components/PageTransition";
import { toast } from "sonner";

const coursesData: Record<string, { title: string; category: string }> = {
  'neural-networks': { title: 'Advanced Neural Networks', category: 'AI' },
  'robotics-kinematics': { title: 'Robotics Kinematics', category: 'Robotics' },
  'kernel-development': { title: 'Secure Kernel Development', category: 'OS' },
  'blockchain-infra': { title: 'Blockchain Infrastructure', category: 'Blockchain' },
  'aerospace-101': { title: 'Aerospace Engineering 101', category: 'Space Tech' },
  'quantum-fundamentals': { title: 'Quantum Computing Fundamentals', category: 'Physics' },
};

const EnrollForm = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const course = courseId ? coursesData[courseId] : null;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    currentEducation: '',
    institution: '',
    gpa: '',
    linkedinUrl: '',
    portfolioUrl: '',
    experience: '',
    motivation: '',
    goals: '',
    preferredSchedule: 'full-time',
    howDidYouHear: '',
    agreeTerms: false,
  });

  useEffect(() => {
    if (!course) navigate('/courses');
  }, [course, navigate]);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(p => ({ ...p, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      toast.error("Please agree to the terms and conditions.");
      return;
    }
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setSuccess(true);
    toast.success("Enrollment application submitted!");
  };

  if (success) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md w-full text-center space-y-6">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-white">Application Submitted!</h1>
              <p className="text-base text-gray-400">Your application for {course?.title} is under review. We'll contact you within 48 hours.</p>
            </div>
            <div className="flex flex-col gap-3">
              <Button asChild className="w-full"><Link to="/dashboard">Go to Dashboard</Link></Button>
              <Button variant="ghost" asChild className="text-gray-400"><Link to="/courses">Browse more courses</Link></Button>
            </div>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <Link to={`/courses/${courseId}`} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Course Details
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-3 space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-white">Course Application</h1>
                <p className="text-base text-gray-400">Complete all required fields to apply for {course?.title}.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Section 1: Personal Info */}
                <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-primary to-blue-500" />
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-white flex items-center gap-2"><User className="w-4 h-4 text-primary" /> Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm text-gray-300">Full Name *</Label>
                      <Input required placeholder="John Doe" className="bg-white/[0.04] border-white/10 text-white placeholder:text-gray-600" value={formData.fullName} onChange={e => handleChange('fullName', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm text-gray-300 flex items-center gap-1"><Mail className="w-3 h-3" /> Email *</Label>
                        <Input type="email" required placeholder="john@example.com" className="bg-white/[0.04] border-white/10 text-white placeholder:text-gray-600" value={formData.email} onChange={e => handleChange('email', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm text-gray-300 flex items-center gap-1"><Phone className="w-3 h-3" /> Phone *</Label>
                        <Input required placeholder="+1 (555) 000-0000" className="bg-white/[0.04] border-white/10 text-white placeholder:text-gray-600" value={formData.phone} onChange={e => handleChange('phone', e.target.value)} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm text-gray-300 flex items-center gap-1"><Calendar className="w-3 h-3" /> Date of Birth *</Label>
                        <Input type="date" required className="bg-white/[0.04] border-white/10 text-white" value={formData.dateOfBirth} onChange={e => handleChange('dateOfBirth', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm text-gray-300 flex items-center gap-1"><Globe className="w-3 h-3" /> Nationality *</Label>
                        <Input required placeholder="e.g. United States" className="bg-white/[0.04] border-white/10 text-white placeholder:text-gray-600" value={formData.nationality} onChange={e => handleChange('nationality', e.target.value)} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Section 2: Education */}
                <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-white flex items-center gap-2"><GraduationCap className="w-4 h-4 text-purple-400" /> Education & Background</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm text-gray-300">Current Education Level *</Label>
                        <select required className="w-full rounded-md bg-white/[0.04] border border-white/10 text-white px-3 py-2 text-sm" value={formData.currentEducation} onChange={e => handleChange('currentEducation', e.target.value)}>
                          <option value="" className="bg-gray-900">Select level</option>
                          <option value="high-school" className="bg-gray-900">High School</option>
                          <option value="bachelors" className="bg-gray-900">Bachelor's Degree</option>
                          <option value="masters" className="bg-gray-900">Master's Degree</option>
                          <option value="phd" className="bg-gray-900">PhD</option>
                          <option value="professional" className="bg-gray-900">Working Professional</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm text-gray-300">GPA / Percentage</Label>
                        <Input placeholder="e.g. 3.8/4.0 or 85%" className="bg-white/[0.04] border-white/10 text-white placeholder:text-gray-600" value={formData.gpa} onChange={e => handleChange('gpa', e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm text-gray-300">Institution / University *</Label>
                      <Input required placeholder="e.g. MIT, Stanford, Self-taught" className="bg-white/[0.04] border-white/10 text-white placeholder:text-gray-600" value={formData.institution} onChange={e => handleChange('institution', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm text-gray-300 flex items-center gap-1"><Briefcase className="w-3 h-3" /> Relevant Experience *</Label>
                      <Textarea required placeholder="Describe your academic or professional experience related to this course..." className="bg-white/[0.04] border-white/10 text-white placeholder:text-gray-600 min-h-[100px]" value={formData.experience} onChange={e => handleChange('experience', e.target.value)} />
                    </div>
                  </CardContent>
                </Card>

                {/* Section 3: Links & Portfolio */}
                <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-500" />
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-white flex items-center gap-2"><Globe className="w-4 h-4 text-green-400" /> Links & Portfolio</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm text-gray-300">LinkedIn Profile</Label>
                        <Input placeholder="https://linkedin.com/in/..." className="bg-white/[0.04] border-white/10 text-white placeholder:text-gray-600" value={formData.linkedinUrl} onChange={e => handleChange('linkedinUrl', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm text-gray-300">Portfolio / GitHub URL</Label>
                        <Input placeholder="https://github.com/..." className="bg-white/[0.04] border-white/10 text-white placeholder:text-gray-600" value={formData.portfolioUrl} onChange={e => handleChange('portfolioUrl', e.target.value)} />
                      </div>
                    </div>
                    <div className="p-4 border border-dashed border-white/10 rounded-xl text-center space-y-2 hover:border-white/20 transition-colors cursor-pointer">
                      <Upload className="w-6 h-6 text-gray-500 mx-auto" />
                      <p className="text-sm text-gray-400">Upload your Resume / CV (PDF, max 5MB)</p>
                      <p className="text-xs text-gray-500">Drag and drop or click to browse</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Section 4: Motivation */}
                <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-white flex items-center gap-2"><BookOpen className="w-4 h-4 text-amber-400" /> Motivation & Goals</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm text-gray-300">Why do you want to take this course? *</Label>
                      <Textarea required placeholder="Explain your motivation for enrolling in this specific course..." className="bg-white/[0.04] border-white/10 text-white placeholder:text-gray-600 min-h-[100px]" value={formData.motivation} onChange={e => handleChange('motivation', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm text-gray-300">Learning Goals *</Label>
                      <Textarea required placeholder="What skills do you hope to gain? How will you apply them?" className="bg-white/[0.04] border-white/10 text-white placeholder:text-gray-600 min-h-[100px]" value={formData.goals} onChange={e => handleChange('goals', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm text-gray-300">Preferred Schedule *</Label>
                        <select required className="w-full rounded-md bg-white/[0.04] border border-white/10 text-white px-3 py-2 text-sm" value={formData.preferredSchedule} onChange={e => handleChange('preferredSchedule', e.target.value)}>
                          <option value="full-time" className="bg-gray-900">Full-time</option>
                          <option value="part-time" className="bg-gray-900">Part-time</option>
                          <option value="weekend" className="bg-gray-900">Weekend Only</option>
                          <option value="self-paced" className="bg-gray-900">Self-paced</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm text-gray-300">How did you hear about us?</Label>
                        <select className="w-full rounded-md bg-white/[0.04] border border-white/10 text-white px-3 py-2 text-sm" value={formData.howDidYouHear} onChange={e => handleChange('howDidYouHear', e.target.value)}>
                          <option value="" className="bg-gray-900">Select...</option>
                          <option value="social-media" className="bg-gray-900">Social Media</option>
                          <option value="friend" className="bg-gray-900">Friend / Referral</option>
                          <option value="search" className="bg-gray-900">Search Engine</option>
                          <option value="university" className="bg-gray-900">University / School</option>
                          <option value="other" className="bg-gray-900">Other</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Terms */}
                <div className="flex items-start gap-3 p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                  <input type="checkbox" id="terms" checked={formData.agreeTerms} onChange={e => handleChange('agreeTerms', e.target.checked)} className="mt-1 rounded border-white/20" />
                  <label htmlFor="terms" className="text-sm text-gray-400">
                    I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>. I confirm that all information provided is accurate and complete. *
                  </label>
                </div>

                <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-white font-semibold h-12 relative overflow-hidden group">
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" /> Submitting Application...
                      </motion.div>
                    ) : (
                      <motion.div key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        Submit Application <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] sticky top-32">
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-primary/20 text-primary border-primary/20">Selected Course</Badge>
                  <CardTitle className="text-xl text-white">{course?.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-400">Applying for the {course?.category} specialization track.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {[
                      'Full access to all course modules and materials',
                      'Direct mentorship from industry experts',
                      'Verified certificate upon completion',
                      'Access to exclusive project repositories',
                      'Career placement assistance',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3 h-3 text-green-400" />
                        </div>
                        <p className="text-sm text-gray-300">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-white/[0.03] border border-white/[0.08] rounded-xl space-y-3">
                    <p className="text-xs text-primary font-semibold uppercase tracking-wider">Requirements</p>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li className="flex items-center gap-2"><FileText className="w-3 h-3 text-white/30" /> Resume / CV</li>
                      <li className="flex items-center gap-2"><GraduationCap className="w-3 h-3 text-white/30" /> Education credentials</li>
                      <li className="flex items-center gap-2"><Briefcase className="w-3 h-3 text-white/30" /> Relevant experience</li>
                      <li className="flex items-center gap-2"><BookOpen className="w-3 h-3 text-white/30" /> Statement of purpose</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl space-y-1">
                    <p className="text-xs text-primary font-semibold uppercase tracking-wider">Next Steps</p>
                    <p className="text-sm text-gray-300">After submission, our team will review your application and send an interview invitation within 48 hours.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default EnrollForm;
