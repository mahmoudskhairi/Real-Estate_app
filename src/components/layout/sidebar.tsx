"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  Settings,
  LogOut,
  PieChart,
  Briefcase,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { canAccessRoute } from "@/lib/auth";
import { toast } from "@/lib/toast";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Leads", href: "/leads" },
  { icon: Briefcase, label: "Clients", href: "/clients" },
  { icon: Building2, label: "Properties", href: "/products" },
  { icon: FileText, label: "Claims", href: "/claims" },
  { icon: PieChart, label: "Analytics", href: "/analytics" },
  { icon: UserPlus, label: "Users", href: "/users" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      
      if (response.ok) {
        toast.success('Logged out successfully');
        router.push('/login');
      } else {
        toast.error('Failed to logout');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('An error occurred during logout');
    }
  };

  return (
    <div className="flex h-full w-64 flex-col border-r border-gray-200 bg-white dark:border-slate-800 dark:bg-slate-950/50 dark:backdrop-blur-xl">
      <div className="flex h-16 items-center px-6 border-b border-gray-200 dark:border-slate-800">
        <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-cyan-400">
          NEXUS ERP
        </span>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {sidebarItems
            .filter((item) => !user || canAccessRoute(user.role, item.href))
            .map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg dark:bg-indigo-500/10 dark:text-indigo-400 dark:shadow-none dark:from-transparent dark:via-transparent dark:to-transparent"
                      : "text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-indigo-700 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-100 dark:hover:from-transparent dark:hover:to-transparent"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
        </nav>
      </div>
      <div className="border-t border-gray-200 p-4 dark:border-slate-800">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start gap-3 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:text-slate-400 dark:hover:text-red-400 dark:hover:bg-red-900/10 transition-all duration-200 font-medium"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
