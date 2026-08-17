import React, { useState } from 'react';
import { Search, Clock, Star, Users, ArrowRight, GitCompareArrows } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageTransition from "@/components/PageTransition";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import CourseComparison from "@/components/courses/CourseComparison";

import neuralImg from "@/assets/courses/neural-networks.jpg";
import roboticsImg from "@/assets/courses/robotics-kinematics.jpg";
import kernelImg from "@/assets/courses/kernel-development.jpg";
import blockchainImg from "@/assets/courses/blockchain-infra.jpg";
import aerospaceImg from "@/assets/courses/aerospace-101.jpg";
import quantumImg from "@/assets/courses/quantum-fundamentals.jpg";
import cybersecurityImg from "@/assets/courses/cybersecurity.jpg";
import dataScienceImg from "@/assets/courses/data-science.jpg";
import cloudImg from "@/assets/courses/cloud-computing.jpg";
import cvImg from "@/assets/courses/computer-vision.jpg";
import embeddedImg from "@/assets/courses/embedded-systems.jpg";
import nlpImg from "@/assets/courses/nlp.jpg";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const Courses = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [compareList, setCompareList] = useState<string[]>([]);

  const categories = ['All', 'AI', 'Robotics', 'OS', 'Blockchain', 'Space Tech', 'Physics', 'Cybersecurity', 'Data Science', 'Cloud'];

  const courses = [
    { id: 'neural-networks', title: 'Advanced Neural Networks', category: 'AI', duration: '12 Weeks', rating: 4.9, students: '1.2k', instructor: 'Dr. Sarah Chen', level: 'Advanced', image: neuralImg },
    { id: 'robotics-kinematics', title: 'Robotics Kinematics', category: 'Robotics', duration: '10 Weeks', rating: 4.8, students: '850', instructor: 'Prof. James Mitchell', level: 'Intermediate', image: roboticsImg },
    { id: 'kernel-development', title: 'Secure Kernel Development', category: 'OS', duration: '15 Weeks', rating: 4.7, students: '2.1k', instructor: 'Dr. Anton Volkov', level: 'Advanced', image: kernelImg },
    { id: 'blockchain-infra', title: 'Blockchain Infrastructure', category: 'Blockchain', duration: '8 Weeks', rating: 4.9, students: '1.5k', instructor: 'Prof. Liam Torres', level: 'Intermediate', image: blockchainImg },
    { id: 'aerospace-101', title: 'Aerospace Engineering 101', category: 'Space Tech', duration: '12 Weeks', rating: 5.0, students: '600', instructor: 'Dr. Amara Okafor', level: 'Beginner', image: aerospaceImg },
    { id: 'quantum-fundamentals', title: 'Quantum Computing Fundamentals', category: 'Physics', duration: '14 Weeks', rating: 4.8, students: '400', instructor: 'Prof. Elena Ricci', level: 'Advanced', image: quantumImg },
    { id: 'cybersecurity-ops', title: 'Cybersecurity Operations', category: 'Cybersecurity', duration: '10 Weeks', rating: 4.9, students: '1.8k', instructor: 'Dr. Maya Patel', level: 'Intermediate', image: cybersecurityImg },
    { id: 'data-science-ml', title: 'Data Science & Machine Learning', category: 'Data Science', duration: '16 Weeks', rating: 4.8, students: '3.2k', instructor: 'Prof. David Kim', level: 'Intermediate', image: dataScienceImg },
    { id: 'cloud-architecture', title: 'Cloud Architecture & DevOps', category: 'Cloud', duration: '10 Weeks', rating: 4.7, students: '2.4k', instructor: 'Dr. Rachel Foster', level: 'Intermediate', image: cloudImg },
    { id: 'computer-vision', title: 'Computer Vision & Image Processing', category: 'AI', duration: '11 Weeks', rating: 4.9, students: '950', instructor: 'Dr. Sarah Chen', level: 'Advanced', image: cvImg },
    { id: 'embedded-systems', title: 'Embedded Systems & IoT', category: 'Robotics', duration: '12 Weeks', rating: 4.6, students: '720', instructor: 'Prof. James Mitchell', level: 'Intermediate', image: embeddedImg },
    { id: 'nlp-transformers', title: 'NLP & Transformer Models', category: 'AI', duration: '10 Weeks', rating: 4.8, students: '1.1k', instructor: 'Dr. Aisha Rahman', level: 'Advanced', image: nlpImg },
    { id: 'smart-contracts', title: 'Advanced Smart Contracts', category: 'Blockchain', duration: '10 Weeks', rating: 4.8, students: '1.3k', instructor: 'Prof. Liam Torres', level: 'Advanced', image: blockchainImg },
    { id: 'satellite-systems', title: 'Satellite Systems Engineering', category: 'Space Tech', duration: '14 Weeks', rating: 4.7, students: '500', instructor: 'Dr. Amara Okafor', level: 'Advanced', image: aerospaceImg },
    { id: 'crypto-primitives', title: 'Cryptographic Primitives', category: 'Cybersecurity', duration: '8 Weeks', rating: 4.9, students: '1.2k', instructor: 'Dr. Maya Patel', level: 'Advanced', image: cybersecurityImg },
    { id: 'generative-ai', title: 'Generative AI Applications', category: 'AI', duration: '12 Weeks', rating: 5.0, students: '4.5k', instructor: 'Dr. Sarah Chen', level: 'Intermediate', image: neuralImg },
  ];

  const filtered = courses.filter((c) => {
    const matchesCategory = activeCategory === 'All' || c.category === activeCategory;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Advanced': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const toggleCompare = (id: string) => {
    setCompareList(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-16 bg-transparent">
        <div className="container-responsive text-white">
          <div className="max-w-6xl mx-auto space-y-10">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Our Courses</h1>
              <p className="text-sm text-gray-300 max-w-xl">
                Master the technologies of tomorrow with world-class curriculum designed by industry leaders.
              </p>
            </motion.div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors backdrop-blur-sm"
                  />
                </div>
                {compareList.length > 0 && (
                  <button
                    onClick={() => setCompareList([])}
                    className="flex items-center gap-2 px-4 py-2.5 bg-primary/20 text-primary border border-primary/30 rounded-xl text-sm font-medium hover:bg-primary/30 transition-colors"
                  >
                    <GitCompareArrows className="w-4 h-4" />
                    Comparing {compareList.length}/3
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === cat
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-white/[0.04] text-gray-400 hover:bg-white/[0.08] hover:text-white border border-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filtered.map((course, i) => {
                const isSelected = compareList.includes(course.id);
                return (
                  <motion.div key={course.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: (i % 3) * 0.08 }}>
                    <Card
                      className={`bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] hover:border-primary/30 transition-all duration-300 group overflow-hidden cursor-pointer hover:bg-white/[0.06] ${isSelected ? 'ring-2 ring-primary border-primary/40' : ''}`}
                    >
                      <div className="aspect-video overflow-hidden relative" onClick={() => navigate(`/courses/${course.id}`)}>
                        <img src={course.image} alt={course.title} loading="lazy" width={800} height={512} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 text-[10px] px-1.5 py-0">{course.category}</Badge>
                        </div>
                        <div className="absolute top-2 right-2">
                          <Badge className={`text-[10px] px-1.5 py-0 backdrop-blur-md ${getLevelColor(course.level)}`}>{course.level}</Badge>
                        </div>
                      </div>
                      <CardContent className="p-3 space-y-2">
                        <div className="flex items-start justify-between gap-1" onClick={() => navigate(`/courses/${course.id}`)}>
                          <h3 className="text-sm font-semibold text-white group-hover:text-primary transition-colors leading-tight">{course.title}</h3>
                          <ArrowRight className="w-4 h-4 text-white/0 -translate-x-2 group-hover:text-primary group-hover:translate-x-0 transition-all duration-300 shrink-0" />
                        </div>
                        <p className="text-xs text-gray-400">{course.instructor}</p>
                        <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1">
                          <span className="flex items-center gap-1 font-medium"><Clock className="w-3 h-3 text-primary" />{course.duration}</span>
                          <span className="flex items-center gap-1 font-medium"><Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />{course.rating}</span>
                          <span className="flex items-center gap-1 font-medium"><Users className="w-3 h-3 text-blue-400" />{course.students}</span>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleCompare(course.id); }}
                          className={`w-full mt-2 py-1.5 rounded-md text-[10px] font-medium transition-all ${
                            isSelected
                              ? 'bg-primary/20 text-primary border border-primary/30'
                              : 'bg-white/[0.04] text-gray-400 border border-white/10 hover:bg-white/[0.08] hover:text-white'
                          }`}
                        >
                          {isSelected ? '✓ Added' : 'Compare'}
                        </button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-400 text-base">No courses found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <CourseComparison
        courses={courses}
        selected={compareList}
        onToggle={toggleCompare}
        onClear={() => setCompareList([])}
      />
    </PageTransition>
  );
};

export default Courses;
