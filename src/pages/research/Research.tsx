import React, { useState, useMemo } from 'react';
import { Search, FileText, Download, Calendar, Users, ExternalLink, ArrowRight, BookOpen, Star, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { researchPapers } from "@/data/researchPapers";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const Research = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => ['All', ...new Set(researchPapers.map(p => p.category))], []);

  const filtered = useMemo(() => researchPapers.filter(p => {
    const q = searchQuery.toLowerCase();
    const matchSearch = p.title.toLowerCase().includes(q) || p.authors.join(' ').toLowerCase().includes(q);
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    return matchSearch && matchCat;
  }), [searchQuery, activeCategory]);

  const stats = [
    { value: `${researchPapers.length}+`, label: "Papers Published", icon: FileText },
    { value: "15+", label: "Active Projects", icon: Star },
    { value: `${researchPapers.reduce((a, p) => a + p.citationCount, 0)}+`, label: "Total Citations", icon: BookOpen },
    { value: `${Math.round(researchPapers.reduce((a, p) => a + (p.downloads || 0), 0) / 1000)}K+`, label: "Downloads", icon: Download },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-16 bg-transparent">
        <div className="container-responsive text-white">
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Hero */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center space-y-6">
              <Badge className="bg-white/[0.06] border-white/[0.1] text-white/80 px-4 py-2">
                <BookOpen className="w-4 h-4 mr-2" /> Research & Innovation
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Pushing the Boundaries of Technology
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Cutting-edge research in AI, robotics, space exploration, and quantum computing.
              </p>
              <div className="flex gap-4 justify-center pt-2">
                <Button asChild size="lg"><Link to="/view-in-journal">View All Papers <ExternalLink className="w-4 h-4 ml-2" /></Link></Button>
                <Button variant="outline" asChild size="lg" className="border-white/20 text-white hover:bg-white/10">
                  <Link to="/strategic-kpis">Strategic KPIs</Link>
                </Button>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div key={stat.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }}>
                  <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] text-center">
                    <CardContent className="p-6 space-y-2">
                      <stat.icon className="w-6 h-6 text-primary mx-auto" />
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Search & Filter */}
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input placeholder="Search papers or authors..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-gray-500 rounded-xl backdrop-blur-sm text-sm focus:outline-none focus:border-white/20 transition-colors" />
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)}
                    className={`text-sm px-4 py-1.5 rounded-full transition-all duration-200 ${activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.08]"}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Papers Grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-400 mb-4">No papers found matching your criteria.</p>
                <Button variant="outline" onClick={() => { setSearchQuery(''); setActiveCategory('All'); }} className="border-white/10 text-white/70">Clear Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((paper, i) => (
                  <motion.div key={paper.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: (i % 3) * 0.08 }}>
                    <Link to={`/read/${paper.id}`} className="block h-full">
                      <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 h-full flex flex-col group">
                        <CardContent className="p-6 flex flex-col flex-1 space-y-3">
                          <div className="flex items-center justify-between">
                            <Badge className="bg-white/[0.06] border-white/[0.08] text-white/60 text-xs">{paper.category}</Badge>
                            <Badge className={`text-xs border-none ${paper.status === 'Published' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>{paper.status}</Badge>
                          </div>
                          <h3 className="text-lg font-semibold text-white leading-snug group-hover:text-primary transition-colors flex-1 line-clamp-2">{paper.title}</h3>
                          <p className="text-sm text-gray-500 line-clamp-2">{paper.abstract}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {paper.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="text-xs text-white/40 px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">{tag}</span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-white/[0.06] mt-auto">
                            <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {paper.authors.length} authors</span>
                            <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {paper.rating}</span>
                            <span className="flex items-center gap-1"><Download className="w-3 h-3" /> {paper.downloads}</span>
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {paper.date} · {paper.journal}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Research;
