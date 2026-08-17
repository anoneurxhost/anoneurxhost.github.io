
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Search,
  Filter,
  ExternalLink,
  Download,
  Calendar,
  Users,
  BookOpen,
  Star,
  Eye,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { useParallaxBackground } from "@/hooks/useParallaxBackground";
import { useState } from "react";
import researchPapers from "@/data/researchPapers.json";

const ViewInJournal = () => {
  useParallaxBackground();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All", 
    "Data Science & AI", 
    "Cybersecurity", 
    "Robotics", 
    "Space Tech & Networking", 
    "Blockchain & Distributed Systems"
  ];

  const filteredPapers = researchPapers.filter((paper) => {
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || paper.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleReadPaper = (paperId: number) => {
    navigate(`/read/${paperId}`);
  };

  return (
    <PageTransition>
      <div className="universal-page-bg">
        <div className="universal-content">

          {/* Header */}
          <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Research Journal Database
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Explore our comprehensive collection of peer-reviewed research papers across multiple disciplines
                </p>
              </div>

              {/* Search and Filters */}
              <Card className="glass backdrop-blur-md bg-white/5 border border-white/10 mb-8">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search papers, authors, keywords..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                          className={selectedCategory === category 
                            ? "bg-blue-600 hover:bg-blue-700" 
                            : "border-gray-600 text-white hover:bg-white/10"
                          }
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Papers Grid */}
          <section className="px-4 sm:px-6 lg:px-8 pb-16">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredPapers.map((paper) => (
                  <Link key={paper.id} to={`/read/${paper.id}`} className="glass backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                    <CardHeader className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                          {paper.category}
                        </Badge>
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                          {paper.status}
                        </Badge>
                      </div>
                      
                      <CardTitle className="text-xl text-white mb-3 line-clamp-2 group-hover:text-blue-300 transition-colors">
                        {paper.title}
                      </CardTitle>
                      
                      <CardDescription className="text-gray-300 line-clamp-3 mb-4">
                        {paper.abstract}
                      </CardDescription>

                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-400" />
                          <span className="text-gray-300">
                            {paper.authors.slice(0, 2).join(", ")}
                            {paper.authors.length > 2 && ` +${paper.authors.length - 2} more`}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-purple-400" />
                          <span className="text-gray-300">{paper.journal}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300">{paper.date}</span>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                          <div className="flex items-center gap-4 text-xs text-gray-400">
                            <div className="flex items-center gap-1">
                              <Download className="w-3 h-3" />
                              <span>{paper.downloads}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              <span>{paper.views}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-current text-yellow-400" />
                              <span>{paper.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-6 pt-0">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {paper.tags.slice(0, 3).map((tag, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="border-gray-600 text-gray-300 text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {paper.tags.length > 3 && (
                          <Badge
                            variant="outline"
                            className="border-gray-600 text-gray-300 text-xs"
                          >
                            +{paper.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Link>
                ))}
              </div>

              {filteredPapers.length === 0 && (
                <div className="text-center py-16">
                  <h3 className="text-2xl font-bold text-white mb-4">No papers found</h3>
                  <p className="text-gray-400 mb-8">Try adjusting your search terms or filters</p>
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("All");
                    }}
                    variant="outline"
                    className="border-gray-600 text-white hover:bg-white/10"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default ViewInJournal;
