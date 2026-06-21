"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Workflow,
  Sparkles,
  BarChart3,
  Settings,
  Menu,
  X,
  Layers,
  LogOut,
  User,
  BookOpen,
} from "lucide-react";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Leads CRM", href: "/admin/leads", icon: Users },
    { name: "CMS Manager", href: "/admin/blog", icon: FileText },
    { name: "LMS Manager", href: "/admin/lms", icon: BookOpen },
    { name: "Automations", href: "/admin/automation", icon: Workflow },
    { name: "AI Assistant", href: "/admin/ai", icon: Sparkles },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Top Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 z-40">
        <Link href="/admin" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
            <Layers className="h-4 w-4 text-white" />
          </div>
          <span className="text-white font-bold text-sm tracking-wider uppercase font-display">Swapnil.Admin</span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-slate-400 hover:text-white cursor-pointer"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar Shell */}
      <aside
        className={`fixed top-16 lg:top-0 bottom-0 left-0 z-35 w-64 bg-slate-950 border-r border-slate-900 p-5 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6">
          {/* Logo (Desktop only) */}
          <div className="hidden lg:flex items-center space-x-2 border-b border-slate-900 pb-4 mb-4">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
              <Layers className="h-4 w-4 text-white" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold tracking-wider text-white uppercase leading-none font-display">
                SWAPNIL
              </span>
              <span className="text-[9px] font-semibold tracking-widest text-indigo-400 uppercase mt-0.5 font-mono">
                ADMIN CONSOLE
              </span>
            </div>
          </div>

          {/* Nav List */}
          <nav className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-indigo-600/10 text-indigo-400 border-l-2 border-indigo-500"
                      : "text-slate-400 hover:bg-slate-900/50 hover:text-slate-200"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Block Footer */}
        <div className="pt-4 border-t border-slate-900 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <User className="h-4.5 w-4.5" />
            </div>
            <div className="text-left leading-tight">
              <p className="text-white text-xs font-semibold">Swapnil Shiwalay</p>
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider font-mono">Super Admin</p>
            </div>
          </div>
          <Link
            href="/"
            onClick={() => {
              localStorage.removeItem("admin_authenticated");
            }}
            className="flex items-center justify-center gap-2 w-full px-3 py-2 text-xs font-bold text-slate-450 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            Return to Site (Logout)
          </Link>
        </div>
      </aside>
    </>
  );
}
