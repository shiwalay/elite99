"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useEcosystemStore } from "@/store/useEcosystemStore";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("admin_theme") as Theme;
    if (saved === "light" || saved === "dark") {
      setThemeState(saved);
      try {
        useEcosystemStore.getState().setTheme(saved);
      } catch (e) {}
    }
    setMounted(true);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("admin_theme", newTheme);
    localStorage.setItem("lms_theme", newTheme); // Sync with LMS theme
    
    try {
      useEcosystemStore.getState().setTheme(newTheme);
    } catch (e) {}

    // Dispatch custom event for vanilla components
    if (typeof window !== "undefined") {
      const event = new CustomEvent("admin_theme_changed", { detail: newTheme });
      window.dispatchEvent(event);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAdminTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useAdminTheme must be used within an AdminThemeProvider");
  }
  return context;
}
