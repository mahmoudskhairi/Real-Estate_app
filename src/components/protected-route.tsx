"use client";

import { useRequireAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoute: string;
}

export function ProtectedRoute({ children, requiredRoute }: ProtectedRouteProps) {
  const { user, loading } = useRequireAuth(requiredRoute);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
