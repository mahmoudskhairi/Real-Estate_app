"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, canAccessRoute, getDefaultRoute } from "@/lib/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/auth/me");
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        setUser(null);
        router.push("/login");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, refetch: fetchUser };
}

export function useRequireAuth(requiredRoute?: string) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      // If a specific route is required, check access
      if (requiredRoute && !canAccessRoute(user.role, requiredRoute)) {
        // Redirect to default route for this role
        const defaultRoute = getDefaultRoute(user.role);
        router.replace(defaultRoute);
      }
    }
  }, [user, loading, requiredRoute, router]);

  return { user, loading };
}
