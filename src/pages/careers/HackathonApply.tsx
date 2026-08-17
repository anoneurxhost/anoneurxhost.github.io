import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Users, Trophy, MapPin, Clock, Search, Send, ArrowLeft } from "lucide-react";
import { UnifiedApplyForm } from "@/components/forms/UnifiedApplyForm";
import ApplyShell from "@/components/ApplyShell";

const upcomingEvents = [
  { id: "ai-innovation-2024", title: "AI Innovation Hackathon", date: "Mar 15-17", location: "San Francisco", duration: "48h", maxTeamSize: 4, prize: "$50K", themes: ["AI", "Health"], description: "Build AI for healthcare and sustainability.", spotsLeft: 45, accent: "text-blue-400" },
  { id: "blockchain-buildout-2024", title: "Blockchain BuildOut", date: "Apr 22-24", location: "Austin", duration: "54h", maxTeamSize: 5, prize: "$30K", themes: ["DeFi", "Web3"], description: "Build the next-gen decentralized apps.", spotsLeft: 67, accent: "text-purple-400" },
  { id: "quantum-challenge-2024", title: "Quantum Challenge", date: "May 10-12", location: "Boston", duration: "48h", maxTeamSize: 3, prize: "$75K", themes: ["Quantum", "Algos"], description: "Practical quantum computing applications.", spotsLeft: 23, accent: "text-emerald-400" },
  { id: "climate-hack-2024", title: "Climate Hack", date: "Jun 8-10", location: "Online", duration: "48h", maxTeamSize: 4, prize: "$25K", themes: ["Climate", "IoT"], description: "Tech that reduces carbon footprint.", spotsLeft: 88, accent: "text-cyan-400" },
];

const HackathonApply = () => {
  const [view, setView] = useState<"events" | "form">("events");
  const [selected, setSelected] = useState<any>(null);
  const [search, setSearch] = useState("");
  const filtered = upcomingEvents.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) || e.themes.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  if (view === "form") {
    return (
      <ApplyShell badge="Apply" title={selected?.title} highlight="" subtitle="Complete your hackathon registration" backTo="/careers/hackathon/apply" backLabel="Back to events">
        <Button variant="outline" onClick={() => setView("events")} className="mb-6 border-white/10 text-gray-300 hover:bg-white/5">
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Button>
        <UnifiedApplyForm
          formType="hackathon"
          targetId={selected?.id}
          targetTitle={selected?.title}
          onSuccess={() => { setSelected(null); setView("events"); }}
          onCancel={() => setView("events")}
        />
      </ApplyShell>
    );
  }

  return (
    <ApplyShell badge="Hackathon Hub" title="Choose your" highlight="challenge" subtitle="Register for a hackathon. Spots are limited." backTo="/careers/hackathon" backLabel="Back to hackathon">
      <div className="max-w-md mx-auto mb-8 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events or themes" className="pl-9 bg-white/5 border-white/10 text-white" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map(e => (
          <Card key={e.id} className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-2xl hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300 group">
            <CardContent className="p-5 flex flex-col h-full">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {e.themes.map(t => (
                  <span key={t} className="text-[10px] text-gray-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded-full">{t}</span>
                ))}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{e.title}</h3>
              <p className="text-xs text-gray-400 mb-4 leading-relaxed flex-1">{e.description}</p>
              <div className="space-y-1.5 text-[11px] text-gray-400 mb-4">
                <div className="flex items-center"><Calendar className="w-3 h-3 mr-2 text-gray-600" />{e.date}</div>
                <div className="flex items-center"><MapPin className="w-3 h-3 mr-2 text-gray-600" />{e.location}</div>
                <div className="flex items-center"><Clock className="w-3 h-3 mr-2 text-gray-600" />{e.duration}</div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center"><Trophy className={`w-3 h-3 mr-2 ${e.accent}`} /><span className={e.accent}>{e.prize}</span></span>
                  <span className="text-gray-500">{e.spotsLeft} left</span>
                </div>
              </div>
              <Button size="sm" variant="glass" className="w-full" onClick={() => { setSelected(e); setView("form"); }}>
                <Send className="w-3.5 h-3.5 mr-1.5" /> Register
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </ApplyShell>
  );
};

export default HackathonApply;
