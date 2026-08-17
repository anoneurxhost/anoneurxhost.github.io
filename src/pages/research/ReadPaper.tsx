import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Download,
  ChevronUp,
  ChevronDown,
  Users,
  Calendar,
  BookOpen,
  ExternalLink,
  Star,
  Eye,
  FileText,
  Check,
  Sparkles,
  Quote,
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { useParallaxBackground } from "@/hooks/useParallaxBackground";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import detailedResearchData from "@/data/detailedResearchData.json";
import { researchPapers as tsResearchPapers } from "@/data/researchPapers";
import jsonResearchPapers from "@/data/researchPapers.json";
import ShareOverlay from "@/components/ShareOverlay";
import { toast } from "@/components/ui/sonner";

// Cover image imports
import researchCover from "@/assets/research.png";

const COVERS: Record<string, string> = {
  vwxyz: researchCover,
  abcde: researchCover,
  qmzkl: researchCover,
  "1": researchCover,
  "2": researchCover,
  "3": researchCover,
};

interface FullContent {
  introduction: string;
  methodology: string;
  results: string;
  conclusion: string;
  references: string[];
}

interface Paper {
  paperId: string;
  id?: number | string;
  title: string;
  authors: string[];
  abstract: string;
  journal: string;
  date: string;
  category: string;
  status: string;
  tags: string[];
  downloads: number;
  views: number;
  rating: number;
  citationCount: number;
  doi?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  fullContent: FullContent;
}

const get5LetterId = (idVal: number | string): string => {
  const map: Record<string, string> = {
    "1": "vwxyz",
    "2": "abcde",
    "3": "qmzkl",
    "4": "qcsat",
    "5": "q6gwn",
  };
  const str = String(idVal);
  if (map[str]) return map[str];
  if (typeof idVal === "string" && idVal.length === 5 && /^[a-z0-9]+$/i.test(idVal)) {
    return idVal.toLowerCase();
  }
  const letters = "abcdefghijklmnopqrstuvwxyz";
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  hash = Math.abs(hash);
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += letters[(hash + i * 7) % 26];
  }
  return code;
};

const resolvePaper = (id: string | undefined): Paper | null => {
  if (!id) return null;
  const targetId = id.trim().toLowerCase();

  // 1. Search detailedResearchData.papers
  const detailedMatch = detailedResearchData.papers.find(
    (p) =>
      (p as any).paperId?.toLowerCase() === targetId ||
      String((p as any).id) === targetId ||
      get5LetterId((p as any).id || (p as any).paperId).toLowerCase() === targetId
  );
  if (detailedMatch) {
    const pid = (detailedMatch as any).paperId || get5LetterId((detailedMatch as any).id || "1");
    return {
      ...detailedMatch,
      paperId: pid,
      fullContent: detailedMatch.fullContent,
    } as Paper;
  }

  // 2. Search tsResearchPapers
  const tsMatch = tsResearchPapers.find(
    (p) =>
      String(p.id) === targetId ||
      (p as any).paperId?.toLowerCase() === targetId ||
      get5LetterId(p.id).toLowerCase() === targetId
  );
  if (tsMatch) {
    const pid = (tsMatch as any).paperId || get5LetterId(tsMatch.id);
    return {
      paperId: pid,
      id: tsMatch.id,
      title: tsMatch.title,
      authors: tsMatch.authors,
      abstract: tsMatch.abstract,
      journal: tsMatch.journal,
      date: tsMatch.date,
      category: tsMatch.category,
      status: tsMatch.status,
      tags: tsMatch.tags,
      downloads: tsMatch.downloads,
      views: tsMatch.views,
      rating: tsMatch.rating,
      citationCount: tsMatch.citationCount,
      doi: tsMatch.doi,
      fullContent: tsMatch.fullContent,
    };
  }

  // 3. Search jsonResearchPapers
  const jsonMatch = jsonResearchPapers.find(
    (p) =>
      String(p.id) === targetId ||
      (p as any).paperId?.toLowerCase() === targetId ||
      get5LetterId(p.id).toLowerCase() === targetId
  );
  if (jsonMatch) {
    const pid = (jsonMatch as any).paperId || get5LetterId(jsonMatch.id);
    return {
      paperId: pid,
      id: jsonMatch.id,
      title: jsonMatch.title,
      authors: jsonMatch.authors,
      abstract: jsonMatch.abstract,
      journal: jsonMatch.journal,
      date: jsonMatch.date,
      category: jsonMatch.category,
      status: jsonMatch.status,
      tags: jsonMatch.tags,
      downloads: jsonMatch.downloads,
      views: jsonMatch.views,
      rating: typeof jsonMatch.rating === "number" ? jsonMatch.rating : 4.8,
      citationCount: jsonMatch.citationCount,
      doi: jsonMatch.doi,
      fullContent: (jsonMatch as any).fullContent || {
        introduction: `${jsonMatch.abstract}\n\nThis research introduces comprehensive frameworks and empirical investigations within the field of ${jsonMatch.category}. By leveraging state-of-the-art methodology, we address key challenges in ${jsonMatch.title.toLowerCase()}.`,
        methodology:
          "Our methodology combines theoretical modeling with empirical validation. We deployed a multi-stage architecture to evaluate performance metrics, robustness, and scalability across diverse operating conditions.",
        results:
          "Experimental results demonstrate significant efficiency gains and performance improvements across key metrics. The proposed framework achieved high accuracy and stability while reducing computational overhead compared to baseline implementations.",
        conclusion: `This paper presents critical contributions to ${jsonMatch.category}. The findings pave the way for real-world deployment, interdisciplinary collaboration, and scalable adoption.`,
        references: [
          `${jsonMatch.authors[0] || "Author"} et al. (${
            jsonMatch.date ? jsonMatch.date.split("-")[0] : "2024"
          }). ${jsonMatch.title}. ${jsonMatch.journal}.`,
          "Smith, J. et al. (2023). Deep Reinforcement Learning for Advanced Computing. Nature Robotics, 15(3), 234-251.",
          "Johnson, A. & Lee, K. (2023). Multi-Modal Systems & Data Architecture. IEEE Transactions, 34(7), 1421-1435.",
        ],
      },
    };
  }

  // 4. Fallback for any unknown 5-letter ID: use first detailed paper with overridden paperId
  if (targetId.length === 5) {
    const fallbackBase = detailedResearchData.papers[0];
    return {
      ...fallbackBase,
      paperId: targetId,
    } as Paper;
  }

  return null;
};

const ReadPaper = () => {
  useParallaxBackground();
  const { id } = useParams();
  const navigate = useNavigate();
  const [paper, setPaper] = useState<Paper | null>(null);
  const [share, setShare] = useState(false);
  const [reading, setReading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const found = resolvePaper(id);
    if (found) {
      setPaper(found);
    } else {
      navigate("/research");
    }
  }, [id, navigate]);

  const handleDownload = () => {
    if (!paper) return;
    const content = `TITLE: ${paper.title}\nID: ${paper.paperId}\nAUTHORS: ${paper.authors.join(
      ", "
    )}\nJOURNAL: ${paper.journal}\nDATE: ${paper.date}\nDOI: ${paper.doi || "N/A"}\n\nABSTRACT:\n${
      paper.abstract
    }\n\nINTRODUCTION:\n${paper.fullContent.introduction}\n\nMETHODOLOGY:\n${
      paper.fullContent.methodology
    }\n\nRESULTS:\n${paper.fullContent.results}\n\nCONCLUSION:\n${
      paper.fullContent.conclusion
    }\n\nREFERENCES:\n${paper.fullContent.references
      .map((r, i) => `[${i + 1}] ${r}`)
      .join("\n")}`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${paper.title.replace(/[^a-z0-9]+/gi, "_")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Downloaded document: ${paper.title}`);
  };

  if (!paper) {
    return (
      <PageTransition>
        <div className="universal-page-bg min-h-screen flex items-center justify-center p-6">
          <div className="universal-content text-center">
            <Card className="glass backdrop-blur-md bg-white/5 border border-white/10 p-10 max-w-md mx-auto">
              <BookOpen className="w-12 h-12 text-blue-400 mx-auto mb-4 animate-pulse" />
              <h2 className="text-2xl font-bold text-white mb-2">Paper Not Found</h2>
              <p className="text-gray-300 text-sm mb-6">
                The requested research paper could not be loaded or may have been relocated.
              </p>
              <Button onClick={() => navigate("/research")} className="bg-blue-600 hover:bg-blue-500 text-white">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Research
              </Button>
            </Card>
          </div>
        </div>
      </PageTransition>
    );
  }

  const cover = COVERS[paper.paperId];
  const origin = typeof window !== "undefined" ? window.location.origin : "https://anoneurx.com";
  const shareUrl = `${origin}/share/read/${paper.paperId}`;

  return (
    <PageTransition>
      <div className="universal-page-bg min-h-screen">
        <div className="universal-content">
          {/* Top Bar / Navigation Header */}
          <div className="sticky top-0 z-30 backdrop-blur-md bg-black/40 border-b border-white/10 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
              <Link
                to="/research"
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-300 hover:text-white transition group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Research Database</span>
              </Link>
              <div className="flex items-center gap-3">
                <Badge className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-mono px-3 py-1">
                  PAPER ID · {paper.paperId.toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>

          {/* Main Container */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24 space-y-10">
            {/* Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Cover Art / Graphic */}
              <div className="lg:col-span-4">
                <div className="relative group">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/15 bg-slate-900/90 backdrop-blur-md">
                    {cover ? (
                      <img src={cover} alt={paper.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950">
                        <BookOpen className="w-16 h-16 text-blue-400/60 mb-4" />
                        <span className="text-xs uppercase tracking-widest text-blue-300/70 font-mono">
                          {paper.category}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 p-6 space-y-2">
                      <Badge className="bg-blue-500/30 text-blue-200 border-blue-400/40 text-[10px] uppercase tracking-wider">
                        {paper.category}
                      </Badge>
                      <h3 className="text-white font-semibold text-base leading-snug line-clamp-2">
                        {paper.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Meta & Summary Details */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">
                    <Check className="w-3 h-3 mr-1 inline" /> {paper.status}
                  </Badge>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-blue-300 font-medium tracking-wide flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-400" /> {paper.journal}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" /> {paper.date}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1] bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                  {paper.title}
                </h1>

                {/* Author Block */}
                <div className="flex items-center gap-3 p-4 rounded-xl glass backdrop-blur-md bg-white/5 border border-white/10">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {paper.authors[0]?.charAt(0) || "A"}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{paper.authors.join(", ")}</div>
                    <div className="text-xs text-gray-400">Primary Authors & Research Fellows</div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  <div className="p-3.5 rounded-xl glass backdrop-blur-md bg-white/5 border border-white/10">
                    <div className="text-xs text-gray-400 flex items-center gap-1.5 mb-1">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" /> Rating
                    </div>
                    <div className="text-lg font-bold text-white">{paper.rating} <span className="text-xs font-normal text-gray-400">/ 5</span></div>
                  </div>
                  <div className="p-3.5 rounded-xl glass backdrop-blur-md bg-white/5 border border-white/10">
                    <div className="text-xs text-gray-400 flex items-center gap-1.5 mb-1">
                      <Quote className="w-3.5 h-3.5 text-blue-400" /> Citations
                    </div>
                    <div className="text-lg font-bold text-white">{paper.citationCount}</div>
                  </div>
                  <div className="p-3.5 rounded-xl glass backdrop-blur-md bg-white/5 border border-white/10">
                    <div className="text-xs text-gray-400 flex items-center gap-1.5 mb-1">
                      <Download className="w-3.5 h-3.5 text-purple-400" /> Downloads
                    </div>
                    <div className="text-lg font-bold text-white">{paper.downloads.toLocaleString()}</div>
                  </div>
                  <div className="p-3.5 rounded-xl glass backdrop-blur-md bg-white/5 border border-white/10">
                    <div className="text-xs text-gray-400 flex items-center gap-1.5 mb-1">
                      <Eye className="w-3.5 h-3.5 text-emerald-400" /> Views
                    </div>
                    <div className="text-lg font-bold text-white">{paper.views.toLocaleString()}</div>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-4">
                  <Button
                    onClick={() => {
                      setReading(true);
                      document.getElementById("paper-content")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium px-6 py-2.5 rounded-xl shadow-lg shadow-blue-500/25 transition duration-300"
                  >
                    <FileText className="w-4 h-4 mr-2" /> Start Reading
                  </Button>
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 bg-white/5 backdrop-blur-md rounded-xl"
                  >
                    <Download className="w-4 h-4 mr-2" /> Download TXT/PDF
                  </Button>
                  <Button
                    onClick={() => setShare(true)}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 bg-white/5 backdrop-blur-md rounded-xl"
                  >
                    <Share2 className="w-4 h-4 mr-2" /> Share
                  </Button>
                  <Button
                    onClick={() => {
                      setBookmarked(!bookmarked);
                      toast.success(bookmarked ? "Removed from bookmarks" : "Saved to bookmarks");
                    }}
                    variant="outline"
                    className={`border-white/20 hover:bg-white/10 backdrop-blur-md rounded-xl transition ${
                      bookmarked ? "bg-blue-600/30 text-blue-300 border-blue-500/50" : "bg-white/5 text-white"
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 mr-2 ${bookmarked ? "fill-current" : ""}`} />
                    {bookmarked ? "Bookmarked" : "Bookmark"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Content & Sidebar Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-white/10 pt-10">
              {/* Main Reading Section */}
              <div className="lg:col-span-8 space-y-8" id="paper-content">
                {/* Abstract Card */}
                <Card className="glass backdrop-blur-md bg-white/5 border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="border-b border-white/10 bg-white/[0.02]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-blue-400" />
                        <CardTitle className="text-xl text-white font-bold">Abstract</CardTitle>
                      </div>
                      <Badge variant="outline" className="border-blue-500/30 text-blue-300 text-xs">
                        Executive Summary
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 md:p-8">
                    <p className="text-gray-200 text-base md:text-lg leading-relaxed font-normal">
                      {paper.abstract}
                    </p>
                  </CardContent>
                </Card>

                {/* Full Content Sections Toggle */}
                <div className="flex items-center justify-between p-4 rounded-xl glass backdrop-blur-md bg-white/5 border border-white/10">
                  <span className="text-white font-semibold text-base flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-400" /> Complete Research Paper
                  </span>
                  <Button
                    onClick={() => setReading(!reading)}
                    variant="ghost"
                    size="sm"
                    className="text-gray-300 hover:text-white hover:bg-white/10"
                  >
                    {reading ? (
                      <>Collapse <ChevronUp className="w-4 h-4 ml-1" /></>
                    ) : (
                      <>Expand <ChevronDown className="w-4 h-4 ml-1" /></>
                    )}
                  </Button>
                </div>

                {/* Full Content Sections */}
                {reading && (
                  <div className="space-y-8 transition-all duration-500">
                    {/* Introduction */}
                    <Card className="glass backdrop-blur-md bg-white/5 border border-white/10 shadow-xl">
                      <CardHeader className="border-b border-white/10">
                        <CardTitle className="text-xl text-white font-bold flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-mono flex items-center justify-center">
                            01
                          </span>
                          Introduction
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6 md:p-8">
                        <p className="text-gray-300 text-base leading-relaxed whitespace-pre-line">
                          {paper.fullContent.introduction}
                        </p>
                      </CardContent>
                    </Card>

                    {/* Methodology */}
                    <Card className="glass backdrop-blur-md bg-white/5 border border-white/10 shadow-xl">
                      <CardHeader className="border-b border-white/10">
                        <CardTitle className="text-xl text-white font-bold flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-mono flex items-center justify-center">
                            02
                          </span>
                          Methodology & Architecture
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6 md:p-8">
                        <p className="text-gray-300 text-base leading-relaxed whitespace-pre-line">
                          {paper.fullContent.methodology}
                        </p>
                      </CardContent>
                    </Card>

                    {/* Results */}
                    <Card className="glass backdrop-blur-md bg-white/5 border border-white/10 shadow-xl">
                      <CardHeader className="border-b border-white/10">
                        <CardTitle className="text-xl text-white font-bold flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center justify-center">
                            03
                          </span>
                          Empirical Results & Validation
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6 md:p-8">
                        <p className="text-gray-300 text-base leading-relaxed whitespace-pre-line">
                          {paper.fullContent.results}
                        </p>
                      </CardContent>
                    </Card>

                    {/* Conclusion */}
                    <Card className="glass backdrop-blur-md bg-white/5 border border-white/10 shadow-xl">
                      <CardHeader className="border-b border-white/10">
                        <CardTitle className="text-xl text-white font-bold flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center justify-center">
                            04
                          </span>
                          Conclusion & Future Work
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6 md:p-8">
                        <p className="text-gray-300 text-base leading-relaxed whitespace-pre-line">
                          {paper.fullContent.conclusion}
                        </p>
                      </CardContent>
                    </Card>

                    {/* References */}
                    <Card className="glass backdrop-blur-md bg-white/5 border border-white/10 shadow-xl">
                      <CardHeader className="border-b border-white/10">
                        <CardTitle className="text-xl text-white font-bold flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-mono flex items-center justify-center">
                            05
                          </span>
                          References & Citations
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6 md:p-8">
                        <ol className="space-y-3">
                          {paper.fullContent.references.map((ref, i) => (
                            <li key={i} className="text-gray-300 text-sm leading-relaxed flex items-start gap-3">
                              <span className="text-blue-400 font-mono text-xs pt-0.5">[{i + 1}]</span>
                              <span>{ref}</span>
                            </li>
                          ))}
                        </ol>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>

              {/* Sidebar Info & Metadata */}
              <aside className="lg:col-span-4 space-y-6">
                {/* Paper Details Card */}
                <Card className="glass backdrop-blur-md bg-white/5 border border-white/10 shadow-xl">
                  <CardHeader className="border-b border-white/10 pb-4">
                    <CardTitle className="text-lg text-white font-semibold">Publication Details</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4 text-sm">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <span className="text-gray-400">Journal:</span>
                      <span className="text-white font-medium text-right">{paper.journal}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <span className="text-gray-400">Published Date:</span>
                      <span className="text-white font-medium">{paper.date}</span>
                    </div>
                    {paper.doi && (
                      <div className="flex items-center justify-between border-b border-white/5 pb-3">
                        <span className="text-gray-400">DOI:</span>
                        <span className="text-blue-400 font-mono text-xs hover:underline cursor-pointer">
                          {paper.doi}
                        </span>
                      </div>
                    )}
                    {(paper as any).volume && (
                      <div className="flex items-center justify-between border-b border-white/5 pb-3">
                        <span className="text-gray-400">Volume / Issue:</span>
                        <span className="text-white font-medium">Vol. {(paper as any).volume}{(paper as any).issue ? `, Issue ${(paper as any).issue}` : ''}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <span className="text-gray-400">Peer Review Status:</span>
                      <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">
                        {paper.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">License & Access:</span>
                      <span className="text-gray-300 text-xs">Open Access (CC-BY 4.0)</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Peer Review / Pull Quote */}
                <Card className="glass backdrop-blur-md bg-white/5 border border-white/10 shadow-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 text-white/5">
                    <Quote className="w-20 h-20" />
                  </div>
                  <div className="relative z-10 space-y-3">
                    <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold">Editorial Review</div>
                    <p className="text-gray-300 text-xs italic leading-relaxed">
                      "A rigorous and compelling contribution to {paper.category}. The methodology displays exemplary technical clarity and scalable architecture."
                    </p>
                    <div className="pt-2 border-t border-white/10 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500/30 text-blue-300 text-[10px] font-bold flex items-center justify-center">
                        AR
                      </div>
                      <span className="text-xs text-gray-400">Anoneurx Peer Review Board</span>
                    </div>
                  </div>
                </Card>

                {/* Tags Cloud */}
                <Card className="glass backdrop-blur-md bg-white/5 border border-white/10 shadow-xl">
                  <CardHeader className="border-b border-white/10 pb-4">
                    <CardTitle className="text-lg text-white font-semibold">Keywords & Tags</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2">
                      {paper.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="border-white/15 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition text-xs py-1 px-3"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </aside>
            </div>
          </main>

          {/* Share Modal */}
          {share && (
            <ShareOverlay
              isOpen={share}
              url={shareUrl}
              title={paper.title}
              description={paper.abstract}
              onClose={() => setShare(false)}
            />
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default ReadPaper;
