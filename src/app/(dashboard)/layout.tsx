"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { canAccessRoute, getDefaultRoute } from "@/lib/auth";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      // Check if user can access the current route
      if (!canAccessRoute(user.role, pathname)) {
        // Redirect to default route for this role
        const defaultRoute = getDefaultRoute(user.role);
        router.replace(defaultRoute);
      }
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white dark:bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white text-gray-900 dark:bg-black dark:text-slate-200">
      <Sidebar />
      <div className="relative z-10 flex flex-1 flex-col bg-white dark:bg-black">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] dark:from-slate-900 dark:via-black dark:to-black">
          {children}
        </main>
      </div>
    </div>
  );
}
