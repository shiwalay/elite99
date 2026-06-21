"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles, Navigation, Laptop, Sun, Moon, LogOut, CheckCircle, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEcosystemStore } from "@/store/useEcosystemStore";

export default function CommandPalette() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { user, theme, toggleTheme, resetProgress, addXp, logoutUser } = useEcosystemStore();
  const paletteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (paletteRef.current && !paletteRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  const navItems = [
    { label: "Go to Homepage", desc: "View GOS landing page & briefing", action: () => router.push("/") },
    { label: "Go to Masterclass", desc: "Watch Swapnil's 15-minute briefing", action: () => router.push("/masterclass") },
    { label: "Go to Resources Vault", desc: "Download growth checklists & tools", action: () => router.push("/resources") },
    { label: "Go to Strategy Booking", desc: "Apply for a 1-on-1 growth audit", action: () => router.push("/contact") },
    { label: "Go to Student Academy", desc: "Access the 90-day transformation arena", action: () => router.push("/academy") },
    { label: "Go to Admin Operations Cockpit", desc: "Centralized CMS/CRM console backend", action: () => router.push("/admin") },
  ];

  const quickActions = [
    { label: `Toggle Theme (${theme === "dark" ? "Light" : "Dark"})`, icon: theme === "dark" ? Sun : Moon, action: () => toggleTheme() },
    ...(user
      ? [
          { label: "Log Win (+30 XP)", icon: Sparkles, action: () => addXp(30) },
          { label: "Reset Academy Progress", icon: ShieldAlert, action: () => resetProgress() },
          { label: "Sign Out of Academy", icon: LogOut, action: () => logoutUser() },
        ]
      : []),
  ];

  const allItems = [...navItems, ...quickActions.map(q => ({ label: q.label, desc: "Quick Action shortcut", action: q.action }))];
  const filtered = allItems.filter(item =>
    item.label.toLowerCase().includes(search.toLowerCase()) ||
    item.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            ref={paletteRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Search Input bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
              <Search className="h-5 w-5 text-slate-400 mr-3" />
              <input
                type="text"
                placeholder="Type a command or search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent border-none text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-sm"
                autoFocus
              />
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">
                ESC
              </span>
            </div>

            {/* Content List */}
            <div className="max-h-[300px] overflow-y-auto p-2 space-y-1">
              {filtered.length > 0 ? (
                filtered.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleAction(item.action)}
                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex justify-between items-center group cursor-pointer"
                  >
                    <div>
                      <p className="text-slate-900 dark:text-white text-xs font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {item.label}
                      </p>
                      <p className="text-slate-400 text-[10px] mt-0.5 font-light">
                        {item.desc}
                      </p>
                    </div>
                    <Navigation className="h-3.5 w-3.5 text-slate-350 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))
              ) : (
                <div className="py-8 text-center text-slate-400 text-xs font-light">
                  No commands match your query.
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-slate-50 dark:bg-slate-900/60 px-4 py-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-400">
              <div className="flex gap-2">
                <span>↑↓ to navigate</span>
                <span>↵ to select</span>
              </div>
              <div>
                <span>Press <span className="font-mono">Cmd+K</span> to close</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
