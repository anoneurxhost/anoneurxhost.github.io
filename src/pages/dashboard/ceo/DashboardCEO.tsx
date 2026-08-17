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
import {
  Crown,
  Users,
  DollarSign,
  FolderOpen,
  TrendingUp,
  ArrowUpRight,
  Building,
} from "lucide-react";

const companyStats = {
  totalEmployees: 500,
  totalRevenue: 50000000,
  activeProjects: 25,
  departments: 6,
  monthlyGrowth: 15,
  marketValue: 250000000,
};

const departments = [
  { name: "AI Development", head: "Dr. Sarah Chen", employees: 85, budget: 12000000 },
  { name: "Web/Mobile Dev", head: "Mike Johnson", employees: 120, budget: 8500000 },
  { name: "Robotics", head: "Dr. Alex Rivera", employees: 65, budget: 15000000 },
  { name: "Cybersecurity", head: "Emma Wilson", employees: 45, budget: 6000000 },
  { name: "Blockchain", head: "David Kim", employees: 35, budget: 4500000 },
  { name: "Networking", head: "Lisa Anderson", employees: 40, budget: 5500000 },
];

const recentActivities = [
  { message: "New department head hired for AI Development", time: "2 hours ago" },
  { message: "Major client project completed ahead of schedule", time: "4 hours ago" },
  { message: "Q4 revenue target exceeded by 20%", time: "1 day ago" },
  { message: "Strategic partnership signed with tech giant", time: "2 days ago" },
];

const console_ = STAFF_CONSOLES.ceo;
const maxHeadcount = Math.max(...departments.map((d) => d.employees));

const DashboardCEO = () => (
  <StaffPage>
    <PageHeader
      eyebrow={console_.eyebrow}
      title="Executive Overview"
      description="Company-wide performance, departments and strategic direction at a glance."
      icon={Crown}
      gradient={console_.gradient}
      actions={
        <Button asChild variant="outline" className="border-white/15 text-white hover:bg-white/10">
          <Link to="/dashboard/ceo/strategic-kpis">
            Strategic KPIs <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      }
    />

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon={Users} label="Total employees" value={companyStats.totalEmployees} gradient={console_.gradient} />
      <StatCard
        icon={DollarSign}
        label="Annual revenue"
        value={`$${(companyStats.totalRevenue / 1_000_000).toFixed(0)}M`}
        gradient="from-emerald-500 to-teal-500"
      />
      <StatCard icon={FolderOpen} label="Active projects" value={companyStats.activeProjects} gradient="from-blue-500 to-cyan-500" />
      <StatCard
        icon={TrendingUp}
        label="Monthly growth"
        value={`${companyStats.monthlyGrowth}%`}
        hint={`Valuation $${(companyStats.marketValue / 1_000_000).toFixed(0)}M`}
        gradient="from-violet-500 to-fuchsia-500"
      />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <StaffSection className="lg:col-span-2">
        <Card className="glass-dark border-white/10 p-5 md:p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-white">Departments</h2>
            <Button asChild size="sm" variant="ghost" className="text-slate-300 hover:bg-white/10">
              <Link to="/dashboard/ceo/departments">Manage</Link>
            </Button>
          </div>
          <div className="space-y-4">
            {departments.map((dept) => (
              <div key={dept.name} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-white truncate">{dept.name}</p>
                    <p className="text-xs text-slate-400">Head: {dept.head}</p>
                  </div>
                  <Badge variant="outline" className="border-white/15 text-slate-300 shrink-0">
                    ${(dept.budget / 1_000_000).toFixed(1)}M
                  </Badge>
                </div>
                <div className="mt-3">
                  <ProgressBar value={Math.round((dept.employees / maxHeadcount) * 100)} />
                  <p className="mt-1.5 text-xs text-slate-400">{dept.employees} people</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </StaffSection>

      <StaffSection className="space-y-6">
        <Card className="glass-dark border-white/10 p-5 md:p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Recent activity</h2>
          <ul className="space-y-3">
            {recentActivities.map((activity) => (
              <li key={activity.message} className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-amber-400 shrink-0" />
                <div>
                  <p className="text-sm text-slate-200">{activity.message}</p>
                  <p className="text-xs text-slate-500">{activity.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="glass-dark border-white/10 p-5 md:p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Quick actions</h2>
          <div className="grid gap-2">
            {console_.menu.slice(2, 8).map((item) => (
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

        <Card className="glass-dark border-white/10 p-5 md:p-6">
          <div className="flex items-center gap-3">
            <Building className="h-5 w-5 text-slate-300" />
            <div>
              <p className="text-sm font-medium text-white">{companyStats.departments} departments</p>
              <p className="text-xs text-slate-400">Operating across six technology verticals</p>
            </div>
          </div>
        </Card>
      </StaffSection>
    </div>
  </StaffPage>
);

export default DashboardCEO;
