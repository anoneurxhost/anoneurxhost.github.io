import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Laptop, Server, Smartphone, Palette, Cloud, ArrowLeft, ArrowRight } from "lucide-react";
import { UnifiedApplyForm } from "@/components/forms/UnifiedApplyForm";
import ApplyShell from "@/components/ApplyShell";

const positions = [
  { id: "frontend-developer", title: "Frontend Developer", icon: Laptop, skills: ["React", "TS", "Tailwind"], spots: 3, description: "Modern, responsive UIs." },
  { id: "backend-developer", title: "Backend Developer", icon: Server, skills: ["Node", "Mongo", "API"], spots: 2, description: "Scalable backend systems." },
  { id: "fullstack-developer", title: "Full-Stack Developer", icon: Code, skills: ["React", "Node", "PG"], spots: 4, description: "End-to-end product delivery." },
  { id: "mobile-developer", title: "Mobile Developer", icon: Smartphone, skills: ["RN", "iOS", "Android"], spots: 2, description: "Cross-platform mobile apps." },
  { id: "ui-ux-designer", title: "UI/UX Designer", icon: Palette, skills: ["Figma", "Systems"], spots: 1, description: "Beautiful, intuitive UX." },
  { id: "devops-engineer", title: "DevOps Engineer", icon: Cloud, skills: ["Docker", "AWS", "CI/CD"], spots: 2, description: "Infra, pipelines, cloud." },
];

const JoinDevTeamApply = () => {
  const [view, setView] = useState<"positions" | "form">("positions");
  const [selected, setSelected] = useState<any>(null);

  if (view === "form") {
    return (
      <ApplyShell badge="Apply" title={selected?.title} highlight="" subtitle="Submit your application" backTo="/careers/join-dev-team/apply" backLabel="Back to positions">
        <Button variant="outline" onClick={() => setView("positions")} className="mb-6 border-white/10 text-gray-300 hover:bg-white/5">
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Button>
        <UnifiedApplyForm
          formType="other_opportunity"
          targetId={selected?.id}
          targetTitle={selected?.title}
          onSuccess={() => { setSelected(null); setView("positions"); }}
          onCancel={() => setView("positions")}
        />
      </ApplyShell>
    );
  }

  return (
    <ApplyShell badge="We're Hiring" title="Join our" highlight="dev team" subtitle="Pick a role and apply. We review weekly." backTo="/careers/join-dev-team" backLabel="Back">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {positions.map(p => {
          const Icon = p.icon;
          return (
            <Card
              key={p.id}
              className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.06] rounded-2xl hover:bg-white/[0.06] hover:border-white/[0.14] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group"
              onClick={() => { setSelected(p); setView("form"); }}
            >
              <CardContent className="p-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                <p className="text-xs text-gray-400 mb-3 leading-relaxed">{p.description}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {p.skills.map(s => <span key={s} className="text-[10px] text-gray-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded-full">{s}</span>)}
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-500">
                  <span>{p.spots} open</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </ApplyShell>
  );
};

export default JoinDevTeamApply;
