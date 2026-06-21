"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Layers } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Blueprints", href: "/frameworks" },
    { name: "Masterclass", href: "/masterclass" },
    { name: "Academy", href: "/academy" },
    { name: "Insights", href: "/blog" },
    { name: "Resources", href: "/resources" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/90 backdrop-blur-md border-b border-slate-900 py-3 shadow-xs"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105">
              <Layers className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-wider text-white font-sans uppercase">
                SWAPNIL
              </span>
              <span className="text-xs font-semibold tracking-widest text-indigo-400 font-sans uppercase -mt-1">
                SHIWALAY
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isMasterclass = link.name === "Masterclass";
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={
                    isMasterclass
                      ? `px-3.5 py-1.5 rounded-full border border-[#d4af37]/30 text-[#d4af37] text-xs font-bold uppercase tracking-wider bg-[#d4af37]/5 hover:bg-[#d4af37] hover:text-slate-950 transition-all duration-300 ${
                          isActive ? "border-[#d4af37] bg-[#d4af37]/10" : ""
                        }`
                      : `text-sm font-medium tracking-wide transition-colors duration-200 hover:text-indigo-400 ${
                          isActive ? "text-indigo-400 font-semibold" : "text-slate-350"
                        }`
                  }
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 h-12 text-sm font-medium tracking-wide text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-xs group"
            >
              <span className="flex items-center gap-1.5">
                Book Strategy Call
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-indigo-400 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-slate-950/95 border-b border-slate-900 backdrop-blur-lg transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-4 pt-3 pb-6 space-y-3 sm:px-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const isMasterclass = link.name === "Masterclass";
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={
                  isMasterclass
                    ? `block px-3 py-2 rounded-xl text-center text-sm font-bold uppercase tracking-wider border border-[#d4af37]/35 bg-[#d4af37]/5 text-[#d4af37] hover:bg-[#d4af37] hover:text-slate-950 transition-all`
                    : `block px-3 py-2 rounded-xl text-base font-medium transition-colors ${
                        isActive
                          ? "bg-indigo-600/10 text-indigo-400 font-semibold"
                          : "text-slate-350 hover:bg-slate-900 hover:text-indigo-400"
                      }`
                }
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-slate-900">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center justify-center h-12 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl"
            >
              Book Strategy Call
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}


