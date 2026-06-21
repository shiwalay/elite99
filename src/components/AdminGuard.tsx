"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sun, Moon } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { AdminThemeProvider, useAdminTheme } from "./AdminThemeContext";

function AdminGuardContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { theme, toggleTheme } = useAdminTheme();

  useEffect(() => {
    let active = true;

    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        
        if (!active) return;

        const isUserAdmin = !!(
          data.success &&
          data.user &&
          (data.user.role === "SuperAdmin" ||
            data.user.role === "Admin" ||
            data.user.role === "Editor")
        );

        setIsAuthenticated(isUserAdmin);

        if (!isUserAdmin) {
          localStorage.removeItem("admin_authenticated");
          if (pathname !== "/admin/login") {
            router.push("/admin/login");
          }
        } else {
          localStorage.setItem("admin_authenticated", "true");
          if (pathname === "/admin/login") {
            router.push("/admin");
          }
        }
      } catch (e) {
        if (!active) return;
        // Fallback to local storage if API call fails
        const authStatus = localStorage.getItem("admin_authenticated") === "true";
        setIsAuthenticated(authStatus);
        
        if (!authStatus && pathname !== "/admin/login") {
          router.push("/admin/login");
        }
      }
    }

    checkAuth();

    return () => {
      active = false;
    };
  }, [pathname, router]);

  // Loading state overlay during check
  if (isAuthenticated === null) {
    return (
      <div className={`min-h-screen flex items-center justify-center font-display text-sm transition-colors duration-300 ${
        theme === "light" ? "light bg-slate-50 text-slate-500" : "dark bg-slate-950 text-slate-400"
      }`}>
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-6 border-2 border-indigo-600 dark:border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <span>Verifying security clearance...</span>
        </div>
      </div>
    );
  }

  // Redirecting state
  if (!isAuthenticated && pathname !== "/admin/login") {
    return (
      <div className={`min-h-screen flex items-center justify-center font-display text-sm transition-colors duration-300 ${
        theme === "light" ? "light bg-slate-50 text-slate-500" : "dark bg-slate-950 text-slate-400"
      }`}>
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-6 border-2 border-indigo-600 dark:border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <span>Redirecting to security gateway...</span>
        </div>
      </div>
    );
  }

  if (isAuthenticated && pathname === "/admin/login") {
    return (
      <div className={`min-h-screen flex items-center justify-center font-display text-sm transition-colors duration-300 ${
        theme === "light" ? "light bg-slate-50 text-slate-500" : "dark bg-slate-950 text-slate-400"
      }`}>
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-6 border-2 border-indigo-600 dark:border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <span>Loading admin operations portal...</span>
        </div>
      </div>
    );
  }

  // Path is /admin/login - render standalone without sidebar
  if (pathname === "/admin/login") {
    return (
      <div className={`min-h-screen text-slate-100 flex flex-col transition-colors duration-300 ${
        theme === "light" ? "light bg-slate-50 text-slate-900" : "dark bg-slate-950 text-slate-100"
      }`}>
        {children}
      </div>
    );
  }

  // Map path to section name
  const getSectionTitle = (path: string) => {
    if (path === "/admin") return "Overview Dashboard";
    if (path.startsWith("/admin/leads")) return "Leads & Cohorts CRM";
    if (path.startsWith("/admin/blog")) return "CMS Content Manager";
    if (path.startsWith("/admin/lms")) return "LMS & Curriculum Manager";
    if (path.startsWith("/admin/automation")) return "Workflow Automations";
    if (path.startsWith("/admin/ai")) return "AI Content Assistant";
    if (path.startsWith("/admin/analytics")) return "Analytics Engine";
    if (path.startsWith("/admin/settings")) return "Global Settings";
    return "Operations Center";
  };

  const sectionTitle = getSectionTitle(pathname);

  // Standard admin route - render with Admin Sidebar layout
  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${
      theme === "light" ? "light bg-slate-50 text-slate-800" : "dark bg-[#030a16] text-[#f1f5f9]"
    }`}>
      <AdminSidebar />
      <div className="flex-grow flex flex-col lg:pl-64 pt-16 lg:pt-0">
        
        {/* Global Desktop Workspace Header */}
        <header className={`hidden lg:flex h-16 border-b items-center justify-between px-8 transition-all duration-300 ${
          theme === "light" ? "bg-white border-slate-200/80 shadow-2xs" : "bg-slate-900 border-slate-800/60"
        }`}>
          <div>
            <span className={`text-[9px] font-bold uppercase tracking-widest ${theme === "light" ? "text-slate-400" : "text-indigo-400"}`}>GOS Core Operations</span>
            <h2 className={`text-sm font-bold tracking-tight leading-none mt-0.5 ${theme === "light" ? "text-slate-800" : "text-white"}`}>{sectionTitle}</h2>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Engine Status */}
            <div className={`flex items-center gap-1.5 text-[9px] font-bold px-2.5 py-1 rounded-full ${
              theme === "light" ? "bg-slate-100 text-slate-650" : "bg-indigo-950/40 border border-indigo-500/20 text-indigo-400"
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
              <span>GOS ENGINE ONLINE</span>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-lg border transition-all duration-200 cursor-pointer flex items-center justify-center ${
                theme === "light" 
                  ? "bg-white hover:bg-slate-50 border-slate-200 text-slate-600 shadow-2xs" 
                  : "bg-slate-950 hover:bg-slate-900 border-slate-900 text-slate-400 hover:text-white"
              }`}
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            >
              {theme === "dark" ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-indigo-600" />}
            </button>
          </div>
        </header>

        {/* Global Mobile Header Theme Switch Injector */}
        <div className="lg:hidden">
          <div className={`flex items-center justify-between px-4 py-2.5 border-b text-xs transition-all duration-300 ${
            theme === "light" ? "bg-white border-slate-200/80 text-slate-700" : "bg-slate-900 border-slate-800 text-slate-400"
          }`}>
            <span className="font-bold uppercase tracking-wider text-[9px]">{sectionTitle}</span>
            <button
              onClick={toggleTheme}
              className={`p-1.5 rounded border transition-all duration-200 cursor-pointer flex items-center justify-center ${
                theme === "light" ? "bg-white border-slate-200 text-slate-600 shadow-2xs" : "bg-slate-950 border-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              {theme === "dark" ? <Sun className="h-3.5 w-3.5 text-amber-500" /> : <Moon className="h-3.5 w-3.5 text-indigo-600" />}
            </button>
          </div>
        </div>

        <main className="flex-grow p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  return (
    <AdminThemeProvider>
      <AdminGuardContent>{children}</AdminGuardContent>
    </AdminThemeProvider>
  );
}
