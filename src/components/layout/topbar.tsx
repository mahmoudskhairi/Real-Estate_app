"use client";

import { Bell, Search, User, Settings, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

export function Topbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
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
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 dark:border-slate-800 dark:bg-slate-950/50 dark:backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-purple-400 dark:text-slate-500" />
          <Input
            placeholder="Search..."
            className="pl-8 border-indigo-200 bg-white text-gray-900 placeholder:text-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-indigo-500 dark:focus:ring-0"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-indigo-600 hover:text-purple-700 hover:bg-purple-50 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-transparent transition-all"
          onClick={() => toast.info('Notifications coming soon!')}
        >
          <Bell className="h-5 w-5" />
        </Button>
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="h-10 w-10 rounded-full overflow-hidden hover:ring-2 hover:ring-indigo-400 transition-all cursor-pointer bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center shadow-md"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </button>
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-xl z-50 dark:border-slate-800 dark:bg-slate-950">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-800">
                <p className="text-sm font-semibold text-gray-900 dark:text-slate-200">
                  {user?.name || user?.email}
                </p>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-1">
                  {user?.role || 'User'}
                </p>
              </div>
              <div className="py-1">
                <button
                  onClick={() => {
                    router.push('/settings');
                    setShowProfileMenu(false);
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-indigo-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-indigo-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100 transition-colors font-medium"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setShowProfileMenu(false);
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:text-red-400 dark:hover:bg-slate-800 transition-colors font-medium"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
