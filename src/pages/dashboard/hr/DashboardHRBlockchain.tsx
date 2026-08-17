
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
  Link,
  Coins,
  Database
} from "lucide-react";

const DashboardHRBlockchain = () => {
  const departmentStats = {
    totalEmployees: 18,
    activeProjects: 5,
    monthlyBudget: 480000,
    satisfaction: 4.6,
    pendingLeaves: 0,
    newHires: 2,
    activeInterns: 3
  };

  const employees = [
    { id: 1, name: 'Anna Davis', position: 'Blockchain Architect', salary: 130000, performance: 97 },
    { id: 2, name: 'Kevin Chen', position: 'Smart Contract Developer', salary: 115000, performance: 95 },
    { id: 3, name: 'Maya Patel', position: 'DeFi Specialist', salary: 108000, performance: 93 },
    { id: 4, name: 'Alex Thompson', position: 'Crypto Analyst', salary: 95000, performance: 91 }
  ];

  return (
    <>
      <DashboardLayout title="HR Management - Blockchain">
        <div className="space-y-6">
          {/* Department Header */}
          <Card className="bg-gradient-to-r from-yellow-900/20 to-amber-900/20 border-yellow-600">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-2">
                  <Link className="w-6 h-6 text-yellow-400" />
                  <Coins className="w-6 h-6 text-amber-400" />
                  <Database className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-yellow-400 font-bold">Blockchain HR</h3>
                  <p className="text-gray-300 text-sm">Building decentralized solutions and cryptocurrency innovations</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white/10 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="text-white font-bold text-xl">{departmentStats.totalEmployees}</p>
                    <p className="text-gray-300 text-sm">Blockchain Devs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Additional stats */}
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="employees">Team</TabsTrigger>
              <TabsTrigger value="projects">Blockchain Projects</TabsTrigger>
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

export default DashboardHRBlockchain;
