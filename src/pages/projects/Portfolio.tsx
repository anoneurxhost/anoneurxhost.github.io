import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink, Github, Calendar, Users, TrendingUp, Award, Briefcase,
  Code, Globe, Star, CheckCircle, Clock, Sparkles
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PageTransition from '@/components/PageTransition';

const portfolioProjects = [
  { id: 1, title: "AI E-Commerce Platform", description: "Full-stack e-commerce with AI recommendations and dynamic pricing.", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop", category: "Web", technologies: ["React", "Node", "TF"], status: "completed", impact: "+40% conversion", liveLink: "https://example.com", githubLink: "https://github.com" },
  { id: 2, title: "Autonomous Drone Nav", description: "Drone navigation using computer vision and LIDAR for agriculture.", image: "https://images.unsplash.com/photo-1508614999368-9260051292e5?w=600&h=400&fit=crop", category: "Robotics", technologies: ["Python", "ROS", "OpenCV"], status: "completed", impact: "-60% survey time", githubLink: "https://github.com" },
  { id: 3, title: "DeFi Platform", description: "Blockchain DeFi for P2P lending, staking, and yield farming.", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop", category: "Blockchain", technologies: ["Solidity", "Web3"], status: "live", impact: "$50M+ volume", liveLink: "https://example.com" },
  { id: 4, title: "Healthcare System", description: "Patient management, telemedicine and AI diagnostics.", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop", category: "Web", technologies: ["React", "Django"], status: "completed", impact: "100K+ patients", liveLink: "https://example.com" },
  { id: 5, title: "Satellite Analytics", description: "Satellite imagery for climate monitoring and disaster response.", image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&h=400&fit=crop", category: "Space", technologies: ["Python", "TF"], status: "in_progress", impact: "1TB+ daily" },
  { id: 6, title: "Smart Manufacturing IoT", description: "Real-time monitoring and predictive maintenance.", image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600&h=400&fit=crop", category: "AI/ML", technologies: ["Python", "MQTT"], status: "completed", impact: "+30% efficiency" },
  { id: 7, title: "Mobile Banking", description: "Secure mobile banking with biometric auth and instant transfers.", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop", category: "Mobile", technologies: ["RN", "PG"], status: "live", impact: "500K+ downloads", liveLink: "https://example.com" },
  { id: 8, title: "AI Customer Chatbot", description: "NLP chatbot for automated support across channels.", image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop", category: "AI/ML", technologies: ["GPT-4", "FastAPI"], status: "completed", impact: "80% resolution", liveLink: "https://example.com" },
  { id: 9, title: "Supply Chain Blockchain", description: "End-to-end tracking via blockchain with verification.", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop", category: "Blockchain", technologies: ["Hyperledger"], status: "completed", impact: "1M+ products" },
  { id: 10, title: "Quantum Compiler", description: "Compiler bridging classical code with quantum execution.", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop", category: "AI/ML", technologies: ["Qiskit"], status: "in_progress", impact: "Research grade" },
  { id: 11, title: "Edge Vision SDK", description: "Real-time object detection on edge devices.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop", category: "AI/ML", technologies: ["C++", "ONNX"], status: "live", impact: "200+ deployments", githubLink: "https://github.com" },
  { id: 12, title: "Smart Home Hub", description: "Unified smart home control with voice and automation.", image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&h=400&fit=crop", category: "Mobile", technologies: ["RN"], status: "completed", impact: "20K+ homes" },
];

const categories = ["All", "AI/ML", "Web", "Mobile", "Robotics", "Blockchain", "Space"];

const stats = [
  { label: "Projects", value: "150+", icon: Briefcase },
  { label: "Clients", value: "80+", icon: Users },
  { label: "Tech Stack", value: "50+", icon: Code },
  { label: "Awards", value: "25", icon: Award },
];

const statusBadge = (status: string) => {
  if (status === 'live') return <Badge className="bg-blue-500/15 text-blue-300 border-blue-500/30 text-[9px] px-1.5 py-0"><Globe className="w-2.5 h-2.5 mr-1" />Live</Badge>;
  if (status === 'in_progress') return <Badge className="bg-yellow-500/15 text-yellow-300 border-yellow-500/30 text-[9px] px-1.5 py-0"><Clock className="w-2.5 h-2.5 mr-1" />WIP</Badge>;
  return <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30 text-[9px] px-1.5 py-0"><CheckCircle className="w-2.5 h-2.5 mr-1" />Done</Badge>;
};

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return portfolioProjects.filter(p => {
      const cat = activeCategory === "All" || p.category === activeCategory;
      const q = !query || p.title.toLowerCase().includes(query.toLowerCase());
      return cat && q;
    });
  }, [activeCategory, query]);

  return (
    <PageTransition>
      <div className="min-h-screen relative">
        <div className="pointer-events-none absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-[160px]" />
        <div className="pointer-events-none absolute bottom-20 left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-[140px]" />

        {/* Hero */}
        <section className="relative z-10 px-4 pt-24 pb-10">
          <div className="container mx-auto max-w-6xl text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Badge className="mb-3 bg-white/5 text-blue-300 border-white/10 px-3 py-1 backdrop-blur-xl text-[10px]">
                <Star className="w-3 h-3 mr-1.5" /> Our Work
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
                Our Portfolio
              </h1>
              <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto mb-6">
                A selection of projects across AI, robotics, blockchain and beyond.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 max-w-3xl mx-auto">
              {stats.map((s) => (
                <Card key={s.label} className="bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl">
                  <CardContent className="p-4 text-center">
                    <s.icon className="w-4 h-4 text-blue-400 mx-auto mb-1.5" />
                    <div className="text-lg font-bold text-white">{s.value}</div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-500 mt-0.5">{s.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        {/* Grid — 4 per row */}
        <section className="relative z-10 px-4 pb-24">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Card className="group h-full bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl rounded-2xl overflow-hidden hover:border-primary/30 transition-all">
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute top-2 left-2 flex gap-1">
                        <Badge className="bg-black/60 backdrop-blur text-white border-white/15 text-[9px] px-1.5 py-0">{p.category}</Badge>
                        {statusBadge(p.status)}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-sm font-bold text-white mb-1 line-clamp-1">{p.title}</h3>
                      <p className="text-[11px] text-gray-400 leading-relaxed mb-3 line-clamp-2">{p.description}</p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {p.technologies.slice(0, 3).map(t => (
                          <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/5 border border-white/5 text-gray-400">{t}</span>
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5 mb-3 text-[10px] text-emerald-400">
                        <TrendingUp className="w-3 h-3" /> {p.impact}
                      </div>

                      <div className="flex gap-1.5">
                        {p.liveLink && (
                          <Button asChild size="sm" variant="outline" className="flex-1 h-7 text-[10px] border-white/10 text-white hover:bg-white/5">
                            <a href={p.liveLink} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-3 h-3 mr-1" /> Demo
                            </a>
                          </Button>
                        )}
                        {p.githubLink && (
                          <Button asChild size="sm" variant="outline" className="flex-1 h-7 text-[10px] border-white/10 text-white hover:bg-white/5">
                            <a href={p.githubLink} target="_blank" rel="noopener noreferrer">
                              <Github className="w-3 h-3 mr-1" /> Code
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-gray-500 text-sm">No projects match your filters.</div>
            )}
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Portfolio;
