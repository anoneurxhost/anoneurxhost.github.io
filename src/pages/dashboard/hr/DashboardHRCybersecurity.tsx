
import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InternshipManagement from "@/components/InternshipManagement";
import { 
  Users, 
  DollarSign,
  Award,
  FileText,
  UserPlus,
  Shield,
  Lock,
  Eye
} from "lucide-react";

const DashboardHRCybersecurity = () => {
  const departmentStats = {
    totalEmployees: 25,
    activeProjects: 7,
    monthlyBudget: 550000,
    satisfaction: 4.4,
    pendingLeaves: 1,
    newHires: 3,
    activeInterns: 4
  };

  const employees = [
    { id: 1, name: 'Robert Smith', position: 'Security Architect', salary: 125000, performance: 96 },
    { id: 2, name: 'Jennifer Liu', position: 'Penetration Tester', salary: 98000, performance: 94 },
    { id: 3, name: 'Ahmed Hassan', position: 'Incident Response Lead', salary: 105000, performance: 92 },
    { id: 4, name: 'Sarah Connor', position: 'Compliance Officer', salary: 88000, performance: 89 }
  ];

  return (
    <>
      <DashboardLayout title="HR Management - Cybersecurity">
        <div className="space-y-6">
          {/* Department Header */}
          <Card className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border-red-600">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-2">
                  <Shield className="w-6 h-6 text-red-400" />
                  <Lock className="w-6 h-6 text-orange-400" />
                  <Eye className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-red-400 font-bold">Cybersecurity HR</h3>
                  <p className="text-gray-300 text-sm">Protecting digital assets and ensuring security compliance</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats and content similar to other HR dashboards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white/10 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-white font-bold text-xl">{departmentStats.totalEmployees}</p>
                    <p className="text-gray-300 text-sm">Security Experts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Additional stat cards */}
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="employees">Team</TabsTrigger>
              <TabsTrigger value="projects">Security Projects</TabsTrigger>
              <TabsTrigger value="internships">Internships</TabsTrigger>
              <TabsTrigger value="finance">Finance</TabsTrigger>
            </TabsList>
            <TabsContent value="internships">
              <InternshipManagement />
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default DashboardHRCybersecurity;
