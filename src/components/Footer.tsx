import Link from "next/link";
import { Layers, Mail, ArrowUpRight } from "lucide-react";


export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Masterclass", href: "/masterclass" },
    { name: "Insights", href: "/blog" },
    { name: "Resources", href: "/resources" },
  ];

  const services = [
    { name: "Digital Business Strategy", href: "/services#strategy" },
    { name: "AI Business Transformation", href: "/services#ai" },
    { name: "Personal Brand Growth", href: "/services#branding" },
    { name: "Funnel & Automation Systems", href: "/services#funnels" },
    { name: "Website & Digital Assets", href: "/services#websites" },
    { name: "Growth Consulting", href: "/services#consulting" },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-900 relative overflow-hidden text-left">
      {/* Background gradients */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Info */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-xs">
                <Layers className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-wider text-white uppercase">
                  SWAPNIL
                </span>
                <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase -mt-1">
                  SHIWALAY
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-light">
              Digital Business Architect & AI Growth Consultant. Building scalable digital ecosystems for experts, coaches, and founders to maximize impact, authority, and revenue.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-450 hover:text-indigo-400 hover:border-indigo-500/50 transition-all duration-300 shadow-2xs"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-450 hover:text-indigo-400 hover:border-indigo-500/50 transition-all duration-300 shadow-2xs"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-450 hover:text-indigo-400 hover:border-indigo-500/50 transition-all duration-300 shadow-2xs"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-6 border-l-2 border-indigo-600 pl-3">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-indigo-400 text-sm flex items-center group transition-colors font-light"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/40 mr-2 group-hover:bg-indigo-500 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-6 border-l-2 border-indigo-600 pl-3">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-slate-400 hover:text-indigo-400 text-sm flex items-center group transition-colors font-light"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/40 mr-2 group-hover:bg-indigo-500 transition-all" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Newsletter brief */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-6 border-l-2 border-indigo-600 pl-3">
              Get In Touch
            </h3>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed font-light">
              Have a project or partnership opportunity? Let&apos;s design your ecosystem.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:contact@swapnilonline.com"
                className="flex items-center gap-2 text-sm text-indigo-400 hover:underline transition-colors"
              >
                <Mail className="h-4 w-4" />
                contact@swapnilonline.com
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 text-sm text-white font-semibold hover:text-indigo-400 transition-colors group"
              >
                Book a Strategy Call
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs text-center md:text-left">
            &copy; {currentYear} Swapnil Shiwalay. All rights reserved. Built with Next.js, Tailwind CSS & TS.
          </p>
          <div className="flex space-x-6 text-xs text-slate-500">
            <Link href="/privacy" className="hover:text-slate-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

