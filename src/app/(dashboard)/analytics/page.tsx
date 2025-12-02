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

export default function AnalyticsPage() {
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
        <p className="text-slate-400">
          Track your performance and key metrics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="border-slate-800 bg-slate-950/50 backdrop-blur-xl"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <p
                className={`text-xs flex items-center gap-1 mt-1 ${
                  stat.trend === "up" ? "text-green-400" : "text-red-400"
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
        <Card className="border-slate-800 bg-slate-950/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-indigo-400" />
              Monthly Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data) => (
                <div key={data.month} className="flex items-center gap-4">
                  <div className="w-12 text-sm text-slate-400">
                    {data.month}
                  </div>
                  <div className="flex-1">
                    <div className="h-8 bg-slate-800/50 rounded-md overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-md flex items-center justify-end px-2"
                        style={{ width: `${(data.revenue / 4) * 100}%` }}
                      >
                        <span className="text-xs font-medium text-white">
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
        <Card className="border-slate-800 bg-slate-950/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Building2 className="h-5 w-5 text-cyan-400" />
              Deals Closed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data) => (
                <div key={data.month} className="flex items-center gap-4">
                  <div className="w-12 text-sm text-slate-400">
                    {data.month}
                  </div>
                  <div className="flex-1">
                    <div className="h-8 bg-slate-800/50 rounded-md overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md flex items-center justify-end px-2"
                        style={{ width: `${(data.deals / 14) * 100}%` }}
                      >
                        <span className="text-xs font-medium text-white">
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
        <Card className="border-slate-800 bg-slate-950/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white text-sm">
              Top Performing Agent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">Sarah Johnson</div>
              <p className="text-sm text-slate-400">12 deals closed</p>
              <p className="text-xs text-green-400">+34% from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-950/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white text-sm">
              Average Deal Size
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">$544K</div>
              <p className="text-sm text-slate-400">Last 30 days</p>
              <p className="text-xs text-green-400">+18% from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-950/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white text-sm">
              Pipeline Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">$24.8M</div>
              <p className="text-sm text-slate-400">Active opportunities</p>
              <p className="text-xs text-green-400">+26% from last month</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
