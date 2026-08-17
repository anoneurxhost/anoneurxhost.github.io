import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Search, User, ArrowLeft } from "lucide-react";
import blogData from "@/data/blogData.json";
import { motion } from "framer-motion";

const BlogsAll = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const filtered = blogData.filter(blog => {
    const matchSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        blog.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory === "" || blog.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "date") return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortBy === "title") return a.title.localeCompare(b.title);
    if (sortBy === "author") return a.author.localeCompare(b.author);
    return 0;
  });

  const categories = [...new Set(blogData.map(b => b.category))];

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Header */}
        <section className="pt-28 pb-12 px-4 relative overflow-hidden">
          <div className="absolute top-20 right-10 w-80 h-80 bg-blue-500/8 rounded-full blur-[140px]" />

          <div className="container mx-auto max-w-6xl relative z-10">
            <Link to="/blogs">
              <Button variant="ghost" size="sm" className="mb-8 text-gray-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blogs
              </Button>
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                All Articles
              </h1>
              <p className="text-gray-400 mb-10 max-w-xl">
                Browse our complete collection of insights and innovations.
              </p>
            </motion.div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-11 h-11 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-gray-500 rounded-xl backdrop-blur-xl"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-11 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-gray-300 text-sm backdrop-blur-xl"
              >
                <option value="" className="text-black">All Categories</option>
                {categories.map(c => <option key={c} value={c} className="text-black">{c}</option>)}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-11 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-gray-300 text-sm backdrop-blur-xl"
              >
                <option value="date" className="text-black">Newest First</option>
                <option value="title" className="text-black">By Title</option>
                <option value="author" className="text-black">By Author</option>
              </select>
            </div>

            <p className="text-xs text-gray-600 mt-4">
              {sorted.length} of {blogData.length} articles
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>
        </section>

        {/* Grid */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            {sorted.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 mb-4">No articles found</p>
                <Button variant="outline" onClick={() => { setSearchTerm(""); setSelectedCategory(""); }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sorted.map((blog, i) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 3) * 0.08 }}
                  >
                    <Link to={`/blogs/${blog.id}`} className="block h-full">
                      <Card className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl overflow-hidden group hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 h-full flex flex-col">
                        <div className="aspect-video overflow-hidden">
                          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <CardContent className="p-6 flex flex-col flex-1">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[11px] text-gray-500 bg-white/5 border border-white/5 px-2.5 py-1 rounded-full">{blog.category}</span>
                            <span className="text-[11px] text-gray-600 flex items-center"><Clock className="w-3 h-3 mr-1" />{blog.readTime}</span>
                          </div>
                          <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-blue-200 transition-colors flex-1">{blog.title}</h3>
                          <p className="text-sm text-gray-500 mb-4 line-clamp-2">{blog.excerpt}</p>
                          <div className="flex items-center justify-between text-xs text-gray-600 mt-auto">
                            <div className="flex items-center"><User className="w-3 h-3 mr-1" />{blog.author}</div>
                            <div className="flex items-center"><Calendar className="w-3 h-3 mr-1" />{new Date(blog.date).toLocaleDateString()}</div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default BlogsAll;
