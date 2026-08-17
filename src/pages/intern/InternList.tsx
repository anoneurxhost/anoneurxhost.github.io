import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Users, ArrowRight, MapPin, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { slugify } from "@/lib/utils";
import { internProfiles } from "@/data/internProfiles";
import { rankRecords } from "@/lib/search";

const fade = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } };

const InternList: React.FC = () => {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("all");
  const [status, setStatus] = useState("all");

  const departments = useMemo(
    () => ["all", ...Array.from(new Set(internProfiles.map((i) => i.department)))],
    [],
  );

  const filtered = useMemo(() => {
    const scoped = internProfiles.filter((i) => {
      if (dept !== "all" && i.department !== dept) return false;
      if (status !== "all" && i.status !== status) return false;
      return true;
    });

    if (!q.trim()) return scoped;

    // Brand-aware ranking: "anoneurx" / "anoneurx university" surfaces the
    // whole Anoneurx intern directory, most relevant first.
    return rankRecords(scoped, q, (i) => ({
      name: i.name,
      keywords: [i.department, i.university, i.batch, i.status, i.location, i.bio],
      seniority: i.status === "Active" ? 20 : i.status === "Completed" ? 10 : 0,
    }));
  }, [q, dept, status]);

  return (
    <PageTransition>
      <SEO
        title="Interns"
        description="Meet the Anoneurx interns — the next generation of engineers, researchers and open source contributors."
        path="/intern"
      />
      <div className="min-h-screen pt-24 pb-20">
        <div className="container-responsive max-w-6xl text-white">
          <motion.div initial="hidden" animate="visible" variants={fade} className="text-center space-y-4 mb-10">
            <Badge className="bg-white/[0.06] border-white/10 text-white/80">
              <Users className="w-4 h-4 mr-2" /> Anoneurx Interns
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Interns building the next Anoneurx</h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              Every intern that has trained, contributed, or graduated from Anoneurx — across AI, Robotics, Cyber Security, Data Science and more.
            </p>
          </motion.div>

          <p className="text-xs text-white/40 mb-4">
            {filtered.length} of {internProfiles.length} interns
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {filtered.map((i) => (
              <Link key={i.internId} to={`/intern/${i.internId}`}>
                <Card className="bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-primary/30 transition-all h-full group">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center gap-3">
                      <img src={i.photo} alt={i.name} className="w-14 h-14 rounded-2xl object-cover border border-white/10" />
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold group-hover:text-primary transition-colors truncate">{i.name}</h3>
                        <p className="text-xs text-white/60 truncate">{i.department} · {i.batch}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Badge className="bg-white/[0.05] border-white/10 text-white/70 text-[10px]">{i.status}</Badge>
                      {i.university && <Badge className="bg-white/[0.05] border-white/10 text-white/60 text-[10px]">{i.university}</Badge>}
                    </div>
                    <p className="text-xs text-white/55 line-clamp-2">{i.bio}</p>
                    {i.location && (
                      <div className="flex items-center gap-1.5 text-[11px] text-white/40">
                        <MapPin className="w-3 h-3" /> {i.location}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
            {!filtered.length && <p className="text-white/50 col-span-full text-center py-10">No interns match those filters.</p>}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default InternList;
