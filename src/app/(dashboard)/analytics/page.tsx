"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  Users,
  Building2,
  DollarSign,
  Activity,
  Target,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/lib/toast";

interface IncomeData {
  clientId: string;
  clientName: string;
  clientEmail: string;
  totalIncome: number;
  numberOfProducts: number;
}

export default function AnalyticsPage() {
  const [incomeData, setIncomeData] = useState<IncomeData[]>([]);
  const [loadingIncome, setLoadingIncome] = useState(true);

  const stats = [
    {
      title: "Total Revenue",
      value: "$18.5M",
      change: "+12.5%",
      icon: DollarSign,
      trend: "up",
    },
    {
      title: "Active Leads",
      value: "247",
      change: "+8.2%",
      icon: Users,
      trend: "up",
    },
    {
      title: "Properties Sold",
      value: "34",
      change: "+23.1%",
      icon: Building2,
      trend: "up",
    },
    {
      title: "Conversion Rate",
      value: "13.8%",
      change: "-2.4%",
      icon: Target,
      trend: "down",
    },
  ];

  const monthlyData = [
    { month: "Jan", revenue: 2.1, deals: 8 },
    { month: "Feb", revenue: 1.8, deals: 6 },
    { month: "Mar", revenue: 2.4, deals: 9 },
    { month: "Apr", revenue: 3.2, deals: 12 },
    { month: "May", revenue: 2.7, deals: 10 },
    { month: "Jun", revenue: 3.8, deals: 14 },
  ];

  useEffect(() => {
    const fetchIncomeBreakdown = async () => {
      try {
        const response = await fetch("/api/analytics/income-breakdown");
        if (response.ok) {
          const data = await response.json();
          setIncomeData(data);
        } else {
          toast.error("Failed to load income breakdown data.");
        }
      } catch (error) {
        console.error("Error fetching income breakdown:", error);
        toast.error("An error occurred while fetching income data.");
      } finally {
        setLoadingIncome(false);
      }
    };

    fetchIncomeBreakdown();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-2 dark:text-white dark:bg-none">
          Analytics
        </h1>
        <p className="text-violet-700 font-medium dark:text-slate-400 dark:font-normal">
          Track your performance and key metrics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="border-2 border-violet-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-950/50 dark:backdrop-blur-xl"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-violet-900 dark:text-slate-400 dark:font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-purple-600 dark:text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent dark:text-white dark:bg-none">
                {stat.value}
              </div>
              <p
                className={`text-xs flex items-center gap-1 mt-1 font-semibold ${
                  stat.trend === "up"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                <TrendingUp
                  className={`h-3 w-3 ${
                    stat.trend === "down" ? "rotate-180" : ""
                  }`}
                />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Revenue Chart */}
        <Card className="border-2 border-violet-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-950/50 dark:backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2 dark:text-white dark:bg-none">
              <Activity className="h-5 w-5 text-violet-600 dark:text-indigo-400" />
              Monthly Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data) => (
                <div key={data.month} className="flex items-center gap-4">
                  <div className="w-12 text-sm font-semibold text-violet-700 dark:text-slate-400 dark:font-normal">
                    {data.month}
                  </div>
                  <div className="flex-1">
                    <div className="h-8 bg-violet-100 rounded-md overflow-hidden dark:bg-slate-800/50">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-md flex items-center justify-end px-2 dark:from-indigo-500 dark:to-cyan-500"
                        style={{ width: `${(data.revenue / 4) * 100}%` }}
                      >
                        <span className="text-xs font-bold text-white">
                          ${data.revenue}M
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Deals Chart */}
        <Card className="border-2 border-fuchsia-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-950/50 dark:backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2 dark:text-white dark:bg-none">
              <Building2 className="h-5 w-5 text-fuchsia-600 dark:text-cyan-400" />
              Deals Closed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data) => (
                <div key={data.month} className="flex items-center gap-4">
                  <div className="w-12 text-sm font-semibold text-fuchsia-700 dark:text-slate-400 dark:font-normal">
                    {data.month}
                  </div>
                  <div className="flex-1">
                    <div className="h-8 bg-fuchsia-100 rounded-md overflow-hidden dark:bg-slate-800/50">
                      <div
                        className="h-full bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-md flex items-center justify-end px-2 dark:from-cyan-500 dark:to-blue-500"
                        style={{ width: `${(data.deals / 14) * 100}%` }}
                      >
                        <span className="text-xs font-bold text-white">
                          {data.deals}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-2 border-violet-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-950/50 dark:backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-violet-900 font-bold text-sm dark:text-white dark:font-semibold">
              Top Performing Agent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent dark:text-white dark:bg-none">
                Sarah Johnson
              </div>
              <p className="text-sm font-semibold text-violet-700 dark:text-slate-400 dark:font-normal">
                12 deals closed
              </p>
              <p className="text-xs font-semibold text-green-600 dark:text-green-400">
                +34% from last month
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-950/50 dark:backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-purple-900 font-bold text-sm dark:text-white dark:font-semibold">
              Average Deal Size
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent dark:text-white dark:bg-none">
                $544K
              </div>
              <p className="text-sm font-semibold text-purple-700 dark:text-slate-400 dark:font-normal">
                Last 30 days
              </p>
              <p className="text-xs font-semibold text-green-600 dark:text-green-400">
                +18% from last month
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-fuchsia-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-950/50 dark:backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-fuchsia-900 font-bold text-sm dark:text-white dark:font-semibold">
              Pipeline Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent dark:text-white dark:bg-none">
                $24.8M
              </div>
              <p className="text-sm font-semibold text-fuchsia-700 dark:text-slate-400 dark:font-normal">
                Active opportunities
              </p>
              <p className="text-xs font-semibold text-green-600 dark:text-green-400">
                +26% from last month
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Income Breakdown Table */}
      <Card className="border-2 border-green-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-950/50 dark:backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center gap-2 dark:text-white dark:bg-none">
            <DollarSign className="h-5 w-5 text-green-600 dark:text-emerald-400" />
            Income Breakdown by Client
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loadingIncome ? (
            <div className="text-center text-slate-500">
              Loading income data...
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Total Income</TableHead>
                  <TableHead className="text-right">
                    Products Purchased
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incomeData.map((data) => (
                  <TableRow key={data.clientId}>
                    <TableCell>
                      <div className="font-medium">{data.clientName}</div>
                      <div className="text-sm text-muted-foreground">
                        {data.clientEmail}
                      </div>
                    </TableCell>
                    <TableCell>
                      ${data.totalIncome.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {data.numberOfProducts}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
