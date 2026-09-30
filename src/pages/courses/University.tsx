import React from 'react';
import { GraduationCap, BookOpen, Users, Award, Brain, Bot, Satellite, Code, ArrowRight, Microscope, FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from "@/components/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const University = () => {
  const status = [
    { icon: <BookOpen className="w-6 h-6 text-blue-400" />, label: 'Programmes', value: '4 tracks' },
    { icon: <FlaskConical className="w-6 h-6 text-cyan-400" />, label: 'Status', value: 'In development' },
    { icon: <Users className="w-6 h-6 text-emerald-400" />, label: 'Enrolment', value: 'Not yet open' },
    { icon: <Award className="w-6 h-6 text-amber-400" />, label: 'Admissions', value: 'By application' },
  ];

  const programs = [
    { icon: <Brain className="w-8 h-8 text-blue-400" />, title: 'Artificial Intelligence', description: 'Deep learning, natural language processing, computer vision and intelligent systems. Course material covers model training and evaluation.', color: 'from-blue-500/20 to-cyan-500/20' },
    { icon: <Bot className="w-8 h-8 text-emerald-400" />, title: 'Robotics & Automation', description: 'Kinematics, control and autonomous systems. Course material covers simulation and hardware integration.', color: 'from-emerald-500/20 to-teal-500/20' },
    { icon: <Satellite className="w-8 h-8 text-sky-400" />, title: 'Space Technology', description: 'Satellite systems, orbital mechanics and aerospace engineering. Course material covers ground segment design.', color: 'from-sky-500/20 to-cyan-500/20' },
    { icon: <Code className="w-8 h-8 text-orange-400" />, title: 'Distributed Systems', description: 'Consensus, smart contracts and peer-to-peer architectures. Course material covers protocol design and analysis.', color: 'from-orange-500/20 to-rose-500/20' },
  ];

  const faculty = [
    { name: 'Dr. Zoha Tariq', role: 'Professor', specialization: 'Mathematical Physics' },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-16 bg-transparent">
        <div className="container-responsive text-white">
          <div className="max-w-6xl mx-auto space-y-20">
            {/* Hero */}
            <div className="text-center space-y-6">
              <Badge className="bg-primary/20 text-blue-500 border-primary/30 px-4 py-2">
                <GraduationCap className="w-4 h-4 mr-2" />
                Education &amp; Research
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Anoneurx University</h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Course material across artificial intelligence, robotics, space technology and distributed
                systems. The material is browsable now. Cohort applications have not opened.
              </p>
            </div>

            {/* Programme status */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {status.map((item, i) => (
                <Card key={i} className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
                  <CardContent className="p-6 space-y-2">
                    <div className="flex justify-center">{item.icon}</div>
                    <div className="text-lg font-semibold text-white">{item.value}</div>
                    <div className="text-xs text-gray-400">{item.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="text-sm text-gray-400 max-w-3xl">
              We do not publish enrolment, graduate or paper counts. No cohort has completed, so any such
              figure would be invented. Published research output is listed on the research page instead.
            </p>

            {/* Mission */}
            <section className="space-y-4">
              <h2 className="text-3xl font-semibold">Purpose</h2>
              <p className="text-base text-gray-300 leading-relaxed max-w-3xl">
                Anoneurx University exists to publish course material that connects engineering theory to
                working systems. Material is written by the teams building the software it describes, and it
                is released openly so that anyone can work through it without enrolling.
              </p>
            </section>

            {/* Academic Programs */}
            <section className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold">Programmes</h2>
                <p className="text-base text-gray-400">Four subject tracks, each mapped to work the organisation is doing.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {programs.map((program, i) => (
                  <Card key={i} className="bg-white/5 border-white/10 hover:border-primary/20 transition-all duration-300 group">
                    <CardHeader className="space-y-3">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${program.color} flex items-center justify-center`}>{program.icon}</div>
                      <CardTitle className="text-xl font-semibold text-white group-hover:text-primary transition-colors">{program.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-base text-gray-300">{program.description}</p>
                      <div className="flex items-center justify-end">
                        <Link to="/courses" className="text-sm text-primary hover:underline flex items-center gap-1">Browse material <ArrowRight className="w-3 h-3" /></Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* How study works */}
            <section className="space-y-8">
              <h2 className="text-3xl font-semibold">How study works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: <BookOpen className="w-6 h-6 text-blue-400" />, title: 'Open material', description: 'Every course is readable without an account. No enrolment required to start.' },
                  { icon: <Microscope className="w-6 h-6 text-cyan-400" />, title: 'Lab exercises', description: 'Exercises run against real repositories and datasets from active projects.' },
                  { icon: <Award className="w-6 h-6 text-amber-400" />, title: 'Reviewed material', description: 'Content is revised when the underlying software changes, not on a fixed schedule.' },
                ].map((item, i) => (
                  <Card key={i} className="bg-white/5 border-white/10">
                    <CardContent className="p-6 space-y-3">
                      {item.icon}
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      <p className="text-sm text-gray-300">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Faculty Highlights */}
            <section className="space-y-8">
              <h2 className="text-3xl font-semibold">Faculty</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {faculty.map((member, i) => (
                  <Card key={i} className="bg-white/5 border-white/10 text-center">
                    <CardContent className="p-6 space-y-3">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600/30 to-blue-500/10 mx-auto flex items-center justify-center">
                        <span className="text-xl font-bold text-blue-500">{member.name.charAt(0)}{member.name.split(' ').pop()?.charAt(0)}</span>
                      </div>
                      <h3 className="text-base font-semibold text-white">{member.name}</h3>
                      <p className="text-sm text-blue-500">{member.role}</p>
                      <p className="text-xs text-gray-400">{member.specialization}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Admissions CTA */}
            <section className="text-center space-y-6">
              <Card className="bg-black/40 backdrop-blur-md pt-16 pb-8 border-none max-w-2xl mx-auto">
                <CardContent className="p-8 md:p-12 space-y-4">
                  <h2 className="text-3xl font-semibold text-white">Start reading</h2>
                  <p className="text-base text-gray-300">
                    Course material is open now. Cohort applications open once the first intake is scheduled, and
                    we will publish the date here rather than maintain a waiting list.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <Button asChild size="lg"><Link to="/courses">Browse Courses</Link></Button>
                    <Button variant="outline" asChild size="lg" className="border-white/20 text-white hover:bg-white/10"><Link to="/contact">Contact Admissions</Link></Button>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default University;
