"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 sm:left-auto sm:right-24 z-40 max-w-sm w-[calc(100vw-3rem)] sm:w-auto animate-slide-up">
      <div className="glass-panel border-[#d4af37]/35 rounded-xl p-4 shadow-2xl flex items-center justify-between gap-4 relative overflow-hidden">
        {/* Glowing side accent */}
        <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#d4af37]" />

        <div className="flex items-center gap-2.5 pl-1.5">
          <div className="h-8 w-8 rounded bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] shrink-0">
            <Calendar className="h-4 w-4" />
          </div>
          <div className="hidden sm:block">
            <p className="text-white text-xs font-bold font-display uppercase tracking-wider">Free Diagnostics</p>
            <p className="text-slate-400 text-[10px] mt-0.5 leading-none">Map your system bottlenecks</p>
          </div>
        </div>

        <Link
          href="/contact"
          className="flex items-center justify-center gap-1 px-4 py-2.5 text-xs font-bold text-[#030a16] bg-gradient-to-r from-[#f3e5ab] to-[#d4af37] rounded-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:scale-[1.02] shrink-0 uppercase tracking-wider font-semibold"
        >
          Apply Now
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
