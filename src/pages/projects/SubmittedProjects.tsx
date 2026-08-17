import React, { useState } from 'react';
import { Search, Clock, CheckCircle, Loader, ArrowRight, Lightbulb, Users, Calendar, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const submittedProjects = [
  { id: 1, title: "AI-Powered Code Review Assistant", category: "AI & Machine Learning", status: "Approved", submittedBy: "Sarah Chen", date: "2024-03-15", techStack: ["Python", "GPT-4", "React"], teamSize: 4, description: "An intelligent code review tool that uses LLMs to provide contextual feedback on pull requests." },
  { id: 2, title: "Decentralized Identity Platform", category: "Blockchain", status: "Under Review", submittedBy: "James Park", date: "2024-03-18", techStack: ["Solidity", "React", "IPFS"], teamSize: 3, description: "A self-sovereign identity system built on Ethereum for secure credential verification." },
  { id: 3, title: "Autonomous Drone Swarm Controller", category: "Robotics", status: "In Progress", submittedBy: "Emily Watson", date: "2024-03-10", techStack: ["ROS2", "Python", "C++"], teamSize: 6, description: "A distributed control system for coordinating multiple drones in search-and-rescue missions." },
  { id: 4, title: "Quantum Error Correction Simulator", category: "Quantum Computing", status: "Approved", submittedBy: "David Kim", date: "2024-03-08", techStack: ["Qiskit", "Python", "NumPy"], teamSize: 3, description: "A simulation framework for testing quantum error correction codes on noisy quantum circuits." },
  { id: 5, title: "Smart Agriculture IoT Platform", category: "IoT", status: "Under Review", submittedBy: "Maria Gonzalez", date: "2024-03-20", techStack: ["Arduino", "React", "Node.js", "MongoDB"], teamSize: 5, description: "An IoT system for precision agriculture with soil monitoring and automated irrigation." },
  { id: 6, title: "Neural Style Transfer for Architecture", category: "AI & Machine Learning", status: "In Progress", submittedBy: "Robert Chen", date: "2024-03-12", techStack: ["PyTorch", "Flask", "Three.js"], teamSize: 4, description: "Applying neural style transfer to architectural designs for creative visualization." },
  { id: 7, title: "P2P Energy Trading Marketplace", category: "Blockchain", status: "Approved", submittedBy: "Lisa Thompson", date: "2024-02-28", techStack: ["Solidity", "Next.js", "PostgreSQL"], teamSize: 5, description: "A decentralized marketplace for peer-to-peer renewable energy trading." },
  { id: 8, title: "Space Debris Tracking Dashboard", category: "Space Technology", status: "Under Review", submittedBy: "Ahmed Hassan", date: "2024-03-22", techStack: ["Python", "Three.js", "TLE Data"], teamSize: 3, description: "Real-time visualization and prediction of orbital debris trajectories." },
];

const statusConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  "Approved": { icon: CheckCircle, color: "text-green-400", bg: "bg-green-500/20 border-green-500/30" },
  "Under Review": { icon: Clock, color: "text-yellow-400", bg: "bg-yellow-500/20 border-yellow-500/30" },
  "In Progress": { icon: Loader, color: "text-blue-400", bg: "bg-blue-500/20 border-blue-500/30" },
};

const SubmittedProjects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStatus, setActiveStatus] = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...new Set(submittedProjects.map(p => p.category))];
  const statuses = ['All', 'Approved', 'Under Review', 'In Progress'];

  const filtered = submittedProjects.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.submittedBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = activeStatus === 'All' || p.status === activeStatus;
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    return matchSearch && matchStatus && matchCat;
  });

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-16 bg-transparent">
        <div className="container-responsive text-white">
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Hero */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="space-y-4">
              <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-1.5">
                <Lightbulb className="w-4 h-4 mr-2" />
                Community Projects
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Submitted Projects</h1>
              <p className="text-base text-gray-300 max-w-2xl">
                Browse innovation projects proposed by our community. Track their status from submission to launch.
              </p>
              <Link to="/dev-lab/submit">
                <Button className="mt-2">
                  <Lightbulb className="w-4 h-4 mr-2" /> Submit Your Project
                </Button>
              </Link>
            </motion.div>

            {/* Search & Filters */}
            <div className="space-y-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text" placeholder="Search projects or authors..."
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors backdrop-blur-sm"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {statuses.map(s => (
                  <button key={s} onClick={() => setActiveStatus(s)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeStatus === s ? 'bg-primary text-primary-foreground' : 'bg-white/[0.04] text-gray-400 hover:bg-white/[0.08] hover:text-white border border-white/10'}`}>
                    {s}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map(c => (
                  <button key={c} onClick={() => setActiveCategory(c)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${activeCategory === c ? 'bg-white/20 text-white' : 'bg-white/[0.04] text-gray-500 hover:bg-white/[0.08] hover:text-white border border-white/10'}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-16"><p className="text-gray-400">No projects found matching your criteria.</p></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((project, i) => {
                  const sc = statusConfig[project.status];
                  const StatusIcon = sc.icon;
                  return (
                    <motion.div key={project.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: (i % 3) * 0.08 }}>
                      <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] hover:border-primary/30 transition-all duration-300 group hover:bg-white/[0.06] h-full">
                        <CardContent className="p-6 space-y-4 flex flex-col h-full">
                          <div className="flex items-center justify-between">
                            <Badge className={`text-xs ${sc.bg} ${sc.color} border`}>
                              <StatusIcon className="w-3 h-3 mr-1" /> {project.status}
                            </Badge>
                            <Badge className="bg-white/[0.06] text-gray-400 border-white/10 text-xs">{project.category}</Badge>
                          </div>
                          <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">{project.title}</h3>
                          <p className="text-sm text-gray-400 line-clamp-2 flex-1">{project.description}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {project.techStack.map(tech => (
                              <span key={tech} className="text-xs text-white/40 px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">{tech}</span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-white/[0.06]">
                            <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {project.teamSize} members</span>
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(project.date).toLocaleDateString()}</span>
                          </div>
                          <div className="text-xs text-gray-500">by {project.submittedBy}</div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default SubmittedProjects;
