"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, DollarSign, Activity } from "lucide-react";

const stats = [
  {
    title: "Total Leads",
    value: "1,234",
    change: "+12% from last month",
    icon: Users,
    color: "text-blue-500",
  },
  {
    title: "Active Claims",
    value: "23",
    change: "-5% from last month",
    icon: FileText,
    color: "text-yellow-500",
  },
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20% from last month",
    icon: DollarSign,
    color: "text-green-500",
  },
  {
    title: "Active Users",
    value: "573",
    change: "+201 since last hour",
    icon: Activity,
    color: "text-purple-500",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:text-white dark:bg-none">
        Dashboard
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="border-indigo-200 bg-white shadow-lg hover:shadow-xl transition-shadow dark:border-slate-800 dark:bg-slate-950/50 dark:backdrop-blur-xl"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-indigo-900 dark:text-slate-200">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:text-white dark:bg-none">{stat.value}</div>
              <p className="text-xs text-purple-600 dark:text-slate-500">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-indigo-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-950/50 dark:backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-indigo-900 font-bold dark:text-white">Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[200px] w-full bg-gradient-to-br from-indigo-50 to-purple-50 rounded-md flex items-center justify-center text-indigo-400 font-medium dark:bg-slate-900/50 dark:text-slate-500">
              Chart Placeholder (Recharts)
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 border-indigo-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-950/50 dark:backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-indigo-900 font-bold dark:text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center border-2 border-indigo-200 dark:bg-slate-800 dark:border-slate-700">
                    <Activity className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-semibold leading-none text-indigo-900 dark:text-white">
                      New lead created
                    </p>
                    <p className="text-sm text-purple-600 dark:text-slate-500">Just now</p>
                  </div>
                  <div className="ml-auto font-semibold text-pink-600 dark:text-slate-500">+1</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
