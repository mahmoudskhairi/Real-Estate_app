"use client";

import { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // This will be overridden by the settings page when user data loads
    // Just ensuring we have a default
    if (!document.documentElement.classList.contains('dark') && 
        !document.documentElement.classList.contains('light')) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return <>{children}</>;
}
