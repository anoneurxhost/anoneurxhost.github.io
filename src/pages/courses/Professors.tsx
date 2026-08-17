import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { slugify } from "@/lib/utils";
import { facultyDirectory } from "@/data/faculty";
import SearchFilterBar from "@/components/site/SearchFilterBar";
import BreadcrumbTrail from "@/components/site/BreadcrumbTrail";
import { rankRecords } from "@/lib/search";

const POSITION_ORDER = [
  "HOD",
  "Professor",
  "Associate Professor",
  "Assistant Professor",
  "Lecturer",
  "Research Fellow",
];

const sorted = [...facultyDirectory].sort(
  (a, b) =>
    POSITION_ORDER.indexOf(a.position) - POSITION_ORDER.indexOf(b.position)
);

const departments = ["All", ...Array.from(new Set(sorted.map((f) => f.department)))];

export default function Faculty() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  const byDept = active === "All" ? sorted : sorted.filter((f) => f.department === active);
  const visible = rankRecords(byDept, query, (f) => ({
    name: f.name,
    keywords: [f.department, f.position, "Anoneurx University", ...f.researchInterests],
    seniority: Math.max(0, POSITION_ORDER.length - POSITION_ORDER.indexOf(f.position)),
  }));

  return (
    <PageTransition>
      <SEO
        title="Faculty — Anoneurx University"
        description="Meet the professors, researchers and academics leading Anoneurx University's departments in AI, Robotics, Cyber Security, and more."
        path="/faculty"
      />

      <div className="min-h-screen pt-28 pb-24 relative overflow-hidden">
        {/* Background glows */}
        <div className="pointer-events-none absolute top-0 left-1/3 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[160px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px]" />

        <div className="container-custom relative z-10">
          {/* Hero */}
          <div className="max-w-3xl mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 uppercase tracking-widest mb-4">
              Anoneurx University
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                Faculty
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              Learn from industry pioneers and visionary researchers leading the
              frontier of technology at Anoneurx University.
            </p>
          </div>

          <BreadcrumbTrail items={[{ name: "University", to: "/university" }, { name: "Faculty" }]} />

          <SearchFilterBar
            query={query}
            onQueryChange={setQuery}
            placeholder="Search faculty — try “Anoneurx University”"
            filters={departments}
            activeFilter={active}
            onFilterChange={setActive}
            resultCount={visible.length}
            label="Search faculty"
          />

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {visible.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, delay: i * 0.04 }}
                className="group relative rounded-2xl overflow-hidden border border-white/[0.07] bg-white/[0.03] backdrop-blur-md hover:border-primary/40 hover:-translate-y-1.5 transition-all duration-300"
              >
                
                  <Link
                    to={`/faculty/${slugify(f.department)}/${slugify(f.name)}`}
                    className="text-[11px] text-primary/70 hover:text-primary font-medium transition-colors"
                  >
                   {/* Photo */}
                <div className="aspect-square relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  <img
                    src={f.photo}
                    alt={f.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-3 left-3 right-3 z-20">
                    <Badge className="mb-1.5 bg-primary/20 border-primary/40 text-primary text-[10px]">
                      {f.position}
                    </Badge>
                    <h3 className="text-base font-bold text-white leading-tight">{f.name}</h3>
                    <p className="text-xs text-primary/80 font-medium">{f.department}</p>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4">
                  <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 mb-3">{f.bio}</p>
                  <div className="flex flex-wrap gap-1">
                    {f.researchInterests.slice(0, 3).map((r) => (
                      <span
                        key={r}
                        className="px-2 py-0.5 text-[10px] bg-white/5 border border-white/10 rounded text-gray-300 group-hover:border-primary/30 transition-colors"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
                  </Link>
              </motion.div>
            ))}
            {!visible.length && (
              <p className="col-span-full py-10 text-center text-white/50">No faculty match “{query}”.</p>
            )}
          </div>

          <div className="mt-10 flex flex-wrap gap-4 text-sm">
            <Link to="/university" className="text-primary hover:underline">Anoneurx University</Link>
            <Link to="/university/contact" className="text-primary hover:underline">Contact the university</Link>
            <Link to="/intern" className="text-primary hover:underline">Anoneurx interns</Link>
            <Link to="/people" className="text-primary hover:underline">Anoneurx team</Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
