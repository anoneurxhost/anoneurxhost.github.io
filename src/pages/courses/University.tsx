import React from 'react';
import { GraduationCap, BookOpen, Users, Award, Brain, Bot, Satellite, Code, ArrowRight, Globe, Microscope, Quote, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from "@/components/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const University = () => {
  const stats = [
    { icon: <Users className="w-6 h-6 text-blue-400" />, label: 'Students', value: '25,000+' },
    { icon: <BookOpen className="w-6 h-6 text-purple-400" />, label: 'Courses', value: '150+' },
    { icon: <GraduationCap className="w-6 h-6 text-green-400" />, label: 'Graduates', value: '12,000+' },
    { icon: <Award className="w-6 h-6 text-yellow-400" />, label: 'Research Papers', value: '500+' },
  ];

  const programs = [
    { icon: <Brain className="w-8 h-8 text-blue-400" />, title: 'Artificial Intelligence', description: 'Deep learning, NLP, computer vision, and intelligent systems. Build the next generation of AI-powered solutions.', courses: 42, color: 'from-blue-500/20 to-cyan-500/20' },
    { icon: <Bot className="w-8 h-8 text-green-400" />, title: 'Robotics & Automation', description: 'From kinematics to autonomous systems. Design, build, and program robots that operate in the real world.', courses: 28, color: 'from-green-500/20 to-emerald-500/20' },
    { icon: <Satellite className="w-8 h-8 text-purple-400" />, title: 'Space Technology', description: 'Satellite systems, orbital mechanics, and aerospace engineering. Reach beyond our atmosphere.', courses: 18, color: 'from-purple-500/20 to-violet-500/20' },
    { icon: <Code className="w-8 h-8 text-orange-400" />, title: 'Blockchain & Systems', description: 'Distributed systems, smart contracts, and decentralized architectures. Build trustless infrastructure.', courses: 24, color: 'from-orange-500/20 to-red-500/20' },
  ];

  const faculty = [
    { name: 'Dr. Zoha Tariq', role: 'Proffesor', specialization: 'Mathematical Physics' },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      program: 'AI & Machine Learning',
      year: 'Class of 2025',
      rating: 5,
      quote: 'The neural networks course completely transformed my understanding of deep learning. The hands-on labs with real datasets gave me the confidence to build production-grade models. I landed a research position at a top AI lab right after graduating.',
    },
    {
      name: 'Marcus Johnson',
      program: 'Robotics & Automation',
      year: 'Class of 2024',
      rating: 5,
      quote: 'Working with actual robotic arms and autonomous vehicles in the 24/7 labs was incredible. Prof. Mitchell\'s kinematics course bridged theory and practice perfectly. I now lead a robotics team at a startup.',
    },
    {
      name: 'Elena Vasquez',
      program: 'Blockchain & Systems',
      year: 'Class of 2025',
      rating: 5,
      quote: 'The blockchain infrastructure course gave me an edge in the job market. I built a DeFi protocol as my capstone project and received funding to turn it into a real product. The mentorship here is unmatched.',
    },
    {
      name: 'Takeshi Yamamoto',
      program: 'Space Technology',
      year: 'Class of 2024',
      rating: 4,
      quote: 'From orbital mechanics simulations to collaborating with aerospace engineers on real CubeSat missions — this program delivers what it promises. The global community is also a huge advantage.',
    },
    {
      name: 'Fatima Al-Rashid',
      program: 'Cybersecurity',
      year: 'Class of 2025',
      rating: 5,
      quote: 'The penetration testing labs are incredibly realistic. Dr. Patel\'s incident response module prepared me for real-world scenarios. I earned my OSCP certification while still enrolled in the program.',
    },
    {
      name: 'Daniel Osei',
      program: 'Data Science',
      year: 'Class of 2024',
      rating: 5,
      quote: 'The data science curriculum is rigorous and practical. From feature engineering to MLOps, every module builds on the last. My capstone project — a predictive analytics platform — is now used by a healthcare startup.',
    },
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
                Education & Innovation
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Anoneurx University</h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Empowering minds through technology, research, and innovation. Where academic theory meets industrial reality.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {stats.map((stat, i) => (
                <Card key={i} className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
                  <CardContent className="p-6 space-y-2">
                    <div className="flex justify-center">{stat.icon}</div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Mission */}
            <section className="space-y-4">
              <h2 className="text-3xl font-semibold">Our Mission</h2>
              <p className="text-base text-gray-300 leading-relaxed max-w-3xl">
                At Anoneurx University, we believe that education should be as dynamic as the technology that drives our world. Our mission is to bridge the gap between academic theory and industrial reality, providing students with hands-on experience in AI, Robotics, Space systems, and beyond. We cultivate critical thinkers, innovators, and leaders who are prepared to solve the world's most pressing challenges.
              </p>
            </section>

            {/* Academic Programs */}
            <section className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold">Academic Programs</h2>
                <p className="text-base text-gray-400">Specialized tracks designed for the innovators of tomorrow.</p>
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
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">{program.courses} courses available</span>
                        <Link to="/courses" className="text-sm text-primary hover:underline flex items-center gap-1">Explore <ArrowRight className="w-3 h-3" /></Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Campus Life */}
            <section className="space-y-8">
              <h2 className="text-3xl font-semibold">Campus Life</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: <Microscope className="w-6 h-6 text-blue-400" />, title: '24/7 Labs', description: 'Open labs for hands-on research and experimentation with cutting-edge equipment.' },
                  { icon: <Globe className="w-6 h-6 text-green-400" />, title: 'Global Community', description: 'Students from 50+ countries collaborating on projects that matter.' },
                  { icon: <Award className="w-6 h-6 text-yellow-400" />, title: 'Competitions', description: 'Regular hackathons, coding challenges, and innovation competitions.' },
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
              <h2 className="text-3xl font-semibold">Faculty Highlights</h2>
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

            {/* Student Testimonials */}
            <section className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold">Student Testimonials</h2>
                <p className="text-base text-gray-400">Hear from our graduates about their experience at Anoneurx University.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((t, i) => (
                  <Card key={i} className="bg-white/5 border-white/10 hover:border-primary/10 transition-all duration-300">
                    <CardContent className="p-6 space-y-4">
                      <Quote className="w-8 h-8 text-primary/30" />
                      <p className="text-sm text-gray-300 leading-relaxed italic">"{t.quote}"</p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} className={`w-3.5 h-3.5 ${j < t.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'}`} />
                        ))}
                      </div>
                      <div className="pt-2 border-t border-white/5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-blue-500/10 flex items-center justify-center">
                            <span className="text-sm font-bold text-primary">{t.name.charAt(0)}{t.name.split(' ').pop()?.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{t.name}</p>
                            <p className="text-xs text-gray-400">{t.program} · {t.year}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Admissions CTA */}
            <section className="text-center space-y-6">
              <Card className="bg-black/40 backdrop-blur-md pt-16 pb-8 border-none max-w-2xl mx-auto">
                <CardContent className="p-8 md:p-12 space-y-4">
                  <h2 className="text-3xl font-semibold text-white">Ready to Begin?</h2>
                  <p className="text-base text-gray-300">Join thousands of students shaping the future of technology. Applications are now open for all programs.</p>
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
