import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  StaffPage,
  StaffSection,
  PageHeader,
  StatCard,
  EmptyState,
} from "@/layouts/staff/ui";
import { STAFF_CONSOLES } from "@/layouts/staff/staff.config";
import {
  Users,
  UserPlus,
  Calendar,
  GraduationCap,
  Banknote,
  RefreshCw,
  ArrowUpRight,
  HeartHandshake,
} from "lucide-react";
import { staffApi, leaveApi, applicationApi, paymentApi } from "@/services/api";

interface LeaveRequest {
  _id: string;
  employeeName?: string;
  type: string;
  startDate: string;
  endDate: string;
  status: "pending" | "approved" | "rejected";
}

interface Employee {
  _id: string;
  name: string;
  department: string;
  position: string;
}

const console_ = STAFF_CONSOLES.hr;

const recentActivities = [
  { id: 1, message: "New employee onboarded", time: "2 hours ago" },
  { id: 2, message: "Leave request submitted", time: "4 hours ago" },
  { id: 3, message: "Performance review completed", time: "1 day ago" },
  { id: 4, message: "Q4 reports finalised", time: "2 days ago" },
];

const DashboardHR = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEmployees: 0,
    pendingLeaves: 0,
    activeInterns: 0,
    monthlyPayroll: 0,
    openPositions: 15,
  });
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const [staffRes, leaveRes, internsRes, payrollRes] = await Promise.all([
        staffApi.getAll({ limit: 100 }),
        leaveApi.getAll({ status: "pending" }),
        applicationApi.getAll({ formType: "internship", status: "accepted" }),
        paymentApi.getStats(),
      ]);

      const staffList = ((staffRes as { data?: unknown })?.data ?? []) as Employee[];
      const leaveList = ((leaveRes as { data?: unknown })?.data ?? []) as LeaveRequest[];
      const internList = ((internsRes as { data?: unknown })?.data ?? []) as unknown[];
      const payroll = (payrollRes as { data?: { monthlyPayroll?: number } })?.data;

      setEmployees(Array.isArray(staffList) ? staffList : []);
      setLeaveRequests(Array.isArray(leaveList) ? leaveList : []);
      setStats((prev) => ({
        ...prev,
        totalEmployees: Array.isArray(staffList) ? staffList.length : 0,
        pendingLeaves: Array.isArray(leaveList) ? leaveList.length : 0,
        activeInterns: Array.isArray(internList) ? internList.length : 0,
        monthlyPayroll: payroll?.monthlyPayroll ?? 0,
      }));
    } catch {
      // Network failures leave the console in its empty state.
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return (
    <StaffPage>
      <PageHeader
        eyebrow={console_.eyebrow}
        title="People Overview"
        description="Headcount, payroll, leave requests and internship pipeline."
        icon={HeartHandshake}
        gradient={console_.gradient}
        actions={
          <>
            <Button
              variant="outline"
              className="border-white/15 text-white hover:bg-white/10"
              onClick={fetchDashboardData}
              disabled={loading}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button asChild variant="outline" className="border-white/15 text-white hover:bg-white/10">
              <Link to="/dashboard/hr/add-employee">
                <UserPlus className="mr-2 h-4 w-4" />
                Add employee
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          label="Employees"
          value={stats.totalEmployees}
          hint={`${stats.openPositions} open roles`}
          gradient={console_.gradient}
        />
        <StatCard icon={Calendar} label="Pending leave" value={stats.pendingLeaves} gradient="from-amber-500 to-orange-500" />
        <StatCard icon={GraduationCap} label="Active interns" value={stats.activeInterns} gradient="from-blue-500 to-cyan-500" />
        <StatCard
          icon={Banknote}
          label="Monthly payroll"
          value={`$${(stats.monthlyPayroll / 1000).toFixed(0)}K`}
          gradient="from-violet-500 to-fuchsia-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <StaffSection className="lg:col-span-2">
          <Card className="glass-dark border-white/10 p-5 md:p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-white">Pending leave requests</h2>
              <Button asChild size="sm" variant="ghost" className="text-slate-300 hover:bg-white/10">
                <Link to="/dashboard/hr/leave">
                  Review <ArrowUpRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
            {leaveRequests.length === 0 ? (
              <EmptyState
                icon={Calendar}
                title="No pending requests"
                description="Leave requests awaiting approval will appear here."
              />
            ) : (
              <div className="space-y-3">
                {leaveRequests.slice(0, 6).map((request) => (
                  <div
                    key={request._id}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3.5"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {request.employeeName ?? "Employee"}
                      </p>
                      <p className="text-xs text-slate-400">
                        {request.type} · {request.startDate} → {request.endDate}
                      </p>
                    </div>
                    <Badge variant="outline" className="border-white/15 text-slate-300 shrink-0">
                      {request.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </StaffSection>

        <StaffSection className="space-y-6">
          <Card className="glass-dark border-white/10 p-5 md:p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Recent activity</h2>
            <ul className="space-y-3">
              {recentActivities.map((activity) => (
                <li key={activity.id} className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
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
        </StaffSection>
      </div>

      <StaffSection>
        <Card className="glass-dark border-white/10 p-5 md:p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-white">Team directory</h2>
            <Button asChild size="sm" variant="ghost" className="text-slate-300 hover:bg-white/10">
              <Link to="/dashboard/hr/employees">All employees</Link>
            </Button>
          </div>
          {employees.length === 0 ? (
            <EmptyState
              icon={Users}
              title="No employee records"
              description="Employees added to the system will be listed here."
            />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {employees.slice(0, 6).map((employee) => (
                <div key={employee._id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-sm font-medium text-white truncate">{employee.name}</p>
                  <p className="text-xs text-slate-400 truncate">{employee.position}</p>
                  <p className="mt-1 text-xs text-slate-500 truncate">{employee.department}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </StaffSection>
    </StaffPage>
  );
};

export default DashboardHR;
