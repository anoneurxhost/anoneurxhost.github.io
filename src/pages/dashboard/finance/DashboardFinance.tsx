import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  CheckCircle, 
  XCircle,
  Calendar,
  RefreshCw,
  AlertTriangle
} from "lucide-react";
import { format, subDays } from "date-fns";
import { paymentApi } from "@/services/api";
import { toast } from "@/hooks/use-toast";
import { SkeletonCard, SkeletonChart, SkeletonTable } from "@/components/ui/skeleton-loaders";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface PaymentStats {
  totalRevenue: number;
  totalPending: number;
  totalCompleted: number;
  totalFailed: number;
  transactionCount: number;
  averageTransaction: number;
}

interface Transaction {
  _id: string;
  userId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  description: string;
  createdAt: string;
  method?: string;
}

const chartConfig = {
  revenue: { label: "Revenue", color: "hsl(var(--chart-1))" },
  expenses: { label: "Expenses", color: "hsl(var(--chart-2))" },
  pending: { label: "Pending", color: "hsl(var(--chart-3))" },
  completed: { label: "Completed", color: "hsl(var(--chart-4))" },
  failed: { label: "Failed", color: "hsl(var(--chart-5))" },
};

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#6366f1'];

const DashboardFinance = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<PaymentStats>({
    totalRevenue: 0,
    totalPending: 0,
    totalCompleted: 0,
    totalFailed: 0,
    transactionCount: 0,
    averageTransaction: 0,
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [dateRange, setDateRange] = useState({
    startDate: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
    endDate: format(new Date(), 'yyyy-MM-dd'),
  });
  const [statusFilter, setStatusFilter] = useState('all');
  const [monthlyData, setMonthlyData] = useState<any[]>([]);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      
      const [statsRes, transactionsRes] = await Promise.all([
        paymentApi.getStats(dateRange.startDate, dateRange.endDate),
        paymentApi.getAll({ 
          startDate: dateRange.startDate, 
          endDate: dateRange.endDate,
          status: statusFilter !== 'all' ? statusFilter : undefined,
          limit: 50
        }),
      ]);

      if (statsRes.success && statsRes.data) {
        setStats({
          totalRevenue: statsRes.data.totalRevenue || 0,
          totalPending: statsRes.data.totalPending || 0,
          totalCompleted: statsRes.data.totalCompleted || 0,
          totalFailed: statsRes.data.totalFailed || 0,
          transactionCount: statsRes.data.transactionCount || 0,
          averageTransaction: statsRes.data.averageTransaction || 0,
        });
        
        // Generate monthly chart data from stats
        if (statsRes.data.monthlyBreakdown) {
          setMonthlyData(statsRes.data.monthlyBreakdown);
        } else {
          // Fallback mock data for chart visualization
          setMonthlyData([
            { month: 'Jan', revenue: 12000, expenses: 8000 },
            { month: 'Feb', revenue: 15000, expenses: 9500 },
            { month: 'Mar', revenue: 18000, expenses: 10000 },
            { month: 'Apr', revenue: 16000, expenses: 9000 },
            { month: 'May', revenue: 21000, expenses: 11000 },
            { month: 'Jun', revenue: 24000, expenses: 12500 },
          ]);
        }
      }

      if (transactionsRes.success && transactionsRes.data) {
        const paymentsData = (transactionsRes.data as any).payments || 
                            (transactionsRes.data as any).data || [];
        setTransactions(paymentsData);
      }
    } catch (err) {
      console.error('Finance fetch error:', err);
      setError('Failed to load financial data');
      toast({
        title: "Error",
        description: "Failed to load financial data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [dateRange, statusFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-400" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      completed: 'bg-green-500/20 text-green-400 border-green-500/30',
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      failed: 'bg-red-500/20 text-red-400 border-red-500/30',
      refunded: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    };
    return variants[status] || 'bg-gray-500/20 text-gray-400';
  };

  const pieData = [
    { name: 'Completed', value: stats.totalCompleted, color: COLORS[0] },
    { name: 'Pending', value: stats.totalPending, color: COLORS[1] },
    { name: 'Failed', value: stats.totalFailed, color: COLORS[2] },
  ].filter(d => d.value > 0);

  if (loading) {
    return (
      <DashboardLayout title="Finance Management">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SkeletonChart />
            <SkeletonChart />
          </div>
          <SkeletonTable rows={5} columns={5} />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout title="Finance Management">
        <Card className="bg-destructive/10 border-destructive/50 p-6">
          <div className="flex flex-col items-center gap-4">
            <AlertTriangle className="w-12 h-12 text-destructive" />
            <p className="text-destructive">{error}</p>
            <Button onClick={fetchData}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Finance Management">
      <div className="space-y-6">
        {/* Date Range Filter */}
        <Card className="bg-card/50 border-border">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-end gap-4">
              <div className="space-y-2">
                <Label className="text-muted-foreground">Start Date</Label>
                <Input
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">End Date</Label>
                <Input
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32 bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={fetchData} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card/50 border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">
                    ${stats.totalRevenue.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">
                    ${stats.totalPending.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">
                    {stats.transactionCount}
                  </p>
                  <p className="text-sm text-muted-foreground">Transactions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <TrendingDown className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">
                    ${stats.averageTransaction.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Avg Transaction</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend Chart */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(var(--chart-1))" 
                      fill="hsl(var(--chart-1))" 
                      fillOpacity={0.3}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="expenses" 
                      stroke="hsl(var(--chart-2))" 
                      fill="hsl(var(--chart-2))" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Payment Status Distribution */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Payment Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Transactions Table */}
        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 text-muted-foreground font-medium">ID</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">Description</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">Amount</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">Status</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center p-8 text-muted-foreground">
                        No transactions found for this period
                      </td>
                    </tr>
                  ) : (
                    transactions.map((tx) => (
                      <tr key={tx._id} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="p-3 text-foreground font-mono text-sm">
                          {tx._id.slice(-8)}
                        </td>
                        <td className="p-3 text-foreground">{tx.description}</td>
                        <td className="p-3 text-foreground font-semibold">
                          ${tx.amount.toLocaleString()}
                        </td>
                        <td className="p-3">
                          <Badge className={getStatusBadge(tx.status)}>
                            {getStatusIcon(tx.status)}
                            <span className="ml-1 capitalize">{tx.status}</span>
                          </Badge>
                        </td>
                        <td className="p-3 text-muted-foreground">
                          {format(new Date(tx.createdAt), 'MMM dd, yyyy')}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardFinance;
