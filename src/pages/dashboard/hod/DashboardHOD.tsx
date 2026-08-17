import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  StaffPage,
  StaffSection,
  PageHeader,
  StatCard,
  ProgressBar,
} from "@/layouts/staff/ui";
import { STAFF_CONSOLES } from "@/layouts/staff/staff.config";
import { Users, DollarSign, FolderOpen, Award, Target, ArrowUpRight } from "lucide-react";

const DEPARTMENT_NAMES: Record<string, string> = {
  "web-mobile": "Web/Mobile Development",
  "ai-dev": "AI Development",
  robotics: "Robotics",
  networking: "Networking",
  cybersecurity: "Cybersecurity",
  blockchain: "Blockchain",
};

const departmentStats = {
  totalStaff: 15,
  monthlyBudget: 350000,
  activeProjects: 4,
  avgPerformance: 4.2,
  utilizationRate: 87,
};

const staff = [
  { id: 1, name: "Alice Johnson", role: "hr", performance: 94 },
  { id: 2, name: "Bob Smith", role: "employee", performance: 89 },
  { id: 3, name: "Carol Davis", role: "employee", performance: 92 },
  { id: 4, name: "David Wilson", role: "hr", performance: 88 },
];

const projects = [
  { name: "Project Alpha", progress: 75, team: 6, deadline: "2024-12-30" },
  { name: "Project Beta", progress: 60, team: 4, deadline: "2025-01-15" },
  { name: "Project Gamma", progress: 90, team: 3, deadline: "2024-12-25" },
];

const console_ = STAFF_CONSOLES.hod;

const readDepartment = () => {
  try {
    const raw = localStorage.getItem("user");
    const parsed = raw ? (JSON.parse(raw) as { department?: string }) : null;
    return parsed?.department ? DEPARTMENT_NAMES[parsed.department] ?? "Department" : "Department";
  } catch {
    return "Department";
  }
};

const DashboardHOD = () => {
  const departmentName = readDepartment();

  return (
    <StaffPage>
      <PageHeader
        eyebrow={console_.eyebrow}
        title={`Head of ${departmentName}`}
        description="Departmental staff, projects, budget and performance in one place."
        icon={Target}
        gradient={console_.gradient}
        actions={
          <Button asChild variant="outline" className="border-white/15 text-white hover:bg-white/10">
            <Link to="/dashboard/hod/performance">
              Team performance <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total staff" value={departmentStats.totalStaff} gradient={console_.gradient} />
        <StatCard
          icon={DollarSign}
          label="Monthly budget"
          value={`$${(departmentStats.monthlyBudget / 1000).toFixed(0)}K`}
          gradient="from-emerald-500 to-teal-500"
        />
        <StatCard icon={FolderOpen} label="Active projects" value={departmentStats.activeProjects} gradient="from-blue-500 to-cyan-500" />
        <StatCard
          icon={Award}
          label="Avg performance"
          value={`${departmentStats.avgPerformance}/5`}
          hint={`${departmentStats.utilizationRate}% utilisation`}
          gradient="from-amber-500 to-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StaffSection>
          <Card className="glass-dark border-white/10 p-5 md:p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-white">Department staff</h2>
              <Button asChild size="sm" variant="ghost" className="text-slate-300 hover:bg-white/10">
                <Link to="/dashboard/hod/staff">Manage</Link>
              </Button>
            </div>
            <div className="space-y-3">
              {staff.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3.5"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{member.name}</p>
                    <p className="text-xs uppercase tracking-wide text-slate-400">{member.role}</p>
                  </div>
                  <Badge variant="outline" className="border-white/15 text-slate-300">
                    {member.performance}%
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </StaffSection>

        <StaffSection>
          <Card className="glass-dark border-white/10 p-5 md:p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-white">Active projects</h2>
              <Button asChild size="sm" variant="ghost" className="text-slate-300 hover:bg-white/10">
                <Link to="/dashboard/hod/projects">View all</Link>
              </Button>
            </div>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.name} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white">{project.name}</p>
                    <span className="text-xs text-slate-400">{project.progress}%</span>
                  </div>
                  <div className="mt-3">
                    <ProgressBar value={project.progress} />
                  </div>
                  <p className="mt-1.5 text-xs text-slate-500">
                    {project.team} people · due {project.deadline}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </StaffSection>
      </div>

      <StaffSection>
        <Card className="glass-dark border-white/10 p-5 md:p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Quick actions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {console_.menu.slice(2, 10).map((item) => (
              <Button
                key={item.path}
                asChild
                variant="outline"
                className="justify-start border-white/10 bg-white/[0.02] text-slate-200 hover:bg-white/10"
              >
                <Link to={item.path}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>
        </Card>
      </StaffSection>
    </StaffPage>
  );
};

export default DashboardHOD;
