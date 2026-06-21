"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Sparkles, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Target, 
  Zap, 
  Users, 
  Award,
  TrendingUp,
  ChevronRight,
  Calculator,
  Compass,
  Play
} from "lucide-react";
import InteractiveEcosystem from "@/components/InteractiveEcosystem";
import EcosystemCalculator from "@/components/EcosystemCalculator";
import FaqAccordion from "@/components/FaqAccordion";

export default function HomePageClient() {
  const painPoints = [
    "Depend on word-of-mouth referrals",
    "Have no predictable lead generation process",
    "Struggle to position themselves online",
    "Post content without generating clients",
    "Work without automation",
    "Trade time for money",
    "Feel overwhelmed by technology and AI"
  ];

  const awarenessPoints = [
    "Personal Brands",
    "Automated Lead Generation",
    "Content Systems",
    "Communities",
    "Digital Products",
    "High-Ticket Offers",
    "AI-Powered Workflows"
  ];

  const identityAssets = [
    { title: "Content Assets", desc: "Articles, guides, videos, and blueprints that pre-sell your expertise 24/7." },
    { title: "Audience Assets", desc: "A clean, owned distribution list of professionals subscribed to your insights." },
    { title: "Community Assets", desc: "Private skool hubs and cohorts where students transform together." },
    { title: "Digital Assets", desc: "Masterclasses, frameworks, and PDFs that scale value globally without overhead." },
    { title: "Brand Assets", desc: "An authority-driven position that makes you the default choice in your niche." },
    { title: "AI Assets", desc: "Custom qualified assistants, CRM integrations, and automatic pipeline routing." }
  ];

  const imaginePoints = [
    "Qualified inquiries from eager prospects.",
    "Webinar & Masterclass registrations on autopilot.",
    "Sales appointments booked directly into your calendar.",
    "Course enrollments & educational portal access sales.",
    "Active community members engaging with your brand.",
    "Strategic partnership and advisory opportunities."
  ];

  const solutionPillars = [
    {
      title: "Authority",
      desc: "Build a powerful personal brand.",
      details: "Position yourself as the default category expert using high-authority search profiles and content loops.",
      icon: Award
    },
    {
      title: "Audience",
      desc: "Attract the right people consistently.",
      details: "Generate inbound interest by deploying high-value digital resources and targeting specific niches.",
      icon: Users
    },
    {
      title: "Automation",
      desc: "Leverage AI and technology.",
      details: "Connect low-code middleware (Make.com, Zapier) and qualification triggers to eliminate manual admin overhead.",
      icon: Cpu
    },
    {
      title: "Acquisition",
      desc: "Generate qualified leads and clients.",
      details: "Deploy qualified application funnels that filter, qualify, and direct warm prospects to your calendar.",
      icon: Target
    },
    {
      title: "Ascension",
      desc: "Create multiple offers and recurring revenue.",
      details: "Transition from linear hourly consultation models to high-ticket masterminds and digital product lines.",
      icon: TrendingUp
    }
  ];

  const [activeTab, setActiveTab] = useState<"calculator" | "details">("calculator");

  return (
    <div className="space-y-32 pb-24 overflow-hidden bg-slate-950 text-slate-100 font-sans relative">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-16 sm:pt-24">
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-10 w-80 h-80 bg-indigo-650/10 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-purple-950/10 rounded-full blur-[150px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column (Copy) */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold tracking-wider text-indigo-400 uppercase">
                <Sparkles className="h-3.5 w-3.5" /> High-Impact Digital Systems
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight leading-[1.1] text-white">
                The Internet Has Created <span className="gold-gradient-text">More Opportunity</span> Than Ever Before.
              </h1>
              
              <h2 className="text-lg sm:text-xl font-medium text-slate-300 border-l-2 border-indigo-500/40 pl-4 leading-relaxed">
                Yet Most Experts, Coaches, Consultants, and Professionals Are Still Struggling to Build a Predictable Digital Business.
              </h2>

              <div className="space-y-4 text-slate-400 text-sm sm:text-base leading-relaxed font-light">
                <p>
                  You have knowledge. You have experience. You have expertise. <strong className="text-white">But expertise alone does not create income.</strong>
                </p>
                <p>
                  Without the right system, your growth becomes dependent on referrals, random social media posts, inconsistent leads, and endless hustle.
                </p>
                <p className="italic">
                  The result? You work harder every year but never create the freedom, impact, and wealth you truly deserve.
                </p>
              </div>

              <div className="pt-4 space-y-3">
                <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider">
                  It&apos;s Time to Build a Digital Business That Works For You.
                </h3>
                <p className="text-slate-350 text-xs sm:text-sm font-semibold">
                  Learn how to attract leads, build authority, automate marketing, and create multiple income streams using proven digital business systems.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/masterclass"
                  className="flex items-center justify-center gap-2 px-8 py-4 text-sm sm:text-base font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-indigo-400 to-indigo-300 hover:from-indigo-300 hover:to-indigo-200 rounded-xl shadow-lg shadow-indigo-950/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Start Your Free Masterclass
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#assessment"
                  className="flex items-center justify-center gap-2 px-8 py-4 text-sm sm:text-base font-semibold border border-slate-800 hover:border-indigo-500/30 hover:bg-slate-900/30 rounded-xl transition-all duration-300"
                >
                  Take the Assessment
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Right Column (Visual Image) */}
            <div className="lg:col-span-5 relative flex justify-center w-full">
              <div className="relative w-full max-w-[360px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-slate-800 shadow-indigo-950/20 group">
                <Image
                  src="/swapnil_hero.png"
                  alt="Swapnil Shiwalay"
                  fill
                  sizes="(max-w-768px) 100vw, 360px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />
                
                {/* Float badges */}
                <div className="absolute -top-4 -left-4 glass-panel rounded-2xl p-3 border border-slate-800 shadow-lg hidden sm:block">
                  <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Systems Architect
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800/80 text-center">
                  <span className="text-xs font-mono font-bold text-indigo-400">SWAPNILONLINE.COM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION 2: PAIN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-rose-500 font-bold flex items-center gap-2">
              <AlertTriangle className="h-4.5 w-4.5 text-rose-550" /> The Scaling Obstacle
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              Why Most Knowledge Professionals Never Scale
            </h2>
            <div className="space-y-4 text-slate-400 font-light leading-relaxed text-sm sm:text-base">
              <p>
                The problem is not lack of knowledge.
              </p>
              <p className="border-l-2 border-rose-500/40 pl-4 text-slate-300">
                The problem is lack of a business system.
              </p>
              <p>
                They know their subject. But they don&apos;t know how to package, position, market, and scale their expertise. As a result, they remain stuck.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/5 backdrop-blur-md space-y-4">
              <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider block font-mono">Expert Bottlenecks</span>
              <div className="space-y-3.5">
                {painPoints.map((point, idx) => (
                  <div key={idx} className="flex gap-3 items-start text-xs sm:text-sm text-slate-300">
                    <XCircle className="h-4.5 w-4.5 text-rose-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-light">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION 3: AWARENESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-last lg:order-first">
            <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/5 backdrop-blur-md space-y-4">
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block font-mono">Compounding Digital Assets</span>
              <div className="space-y-3.5">
                {awarenessPoints.map((point, idx) => (
                  <div key={idx} className="flex gap-3 items-start text-xs sm:text-sm text-slate-350 font-semibold">
                    <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
              <Compass className="h-4.5 w-4.5 text-emerald-400" /> Systemic Shifts
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              The Rules of Business Have Changed
            </h2>
            <div className="space-y-4 text-slate-400 font-light leading-relaxed text-sm sm:text-base">
              <p>
                Today&apos;s most successful professionals are not necessarily the smartest.
              </p>
              <p className="border-l-2 border-emerald-500/40 pl-4 text-slate-300">
                They are the ones who have built digital ecosystems.
              </p>
              <p>
                The market no longer rewards expertise alone. It rewards visibility, positioning, trust, and systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION 4: IDENTITY SHIFT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">
            Asset Mindset
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            Stop Thinking Like a Service Provider. <br className="hidden sm:inline" />
            <span className="gold-gradient-text">Start Thinking Like a Digital Business Owner.</span>
          </h2>
          <p className="text-slate-405 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto">
            A freelancer sells time. A consultant sells expertise. A digital business owner builds assets. The goal is not to work more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {identityAssets.map((asset, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl border border-slate-800 bg-slate-900/5 hover:border-slate-700 hover:bg-slate-900/20 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-indigo-500/10 transition-colors" />
              <div className="flex gap-4 items-center mb-3">
                <div className="h-2 w-2 rounded-full bg-indigo-500" />
                <h3 className="text-white font-bold text-base leading-snug font-display">{asset.title}</h3>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">{asset.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-slate-350 text-sm font-semibold tracking-wide uppercase text-center mt-12 bg-slate-900/40 border border-slate-800/80 rounded-2xl py-3 max-w-md mx-auto">
          ⚖️ Shift decisions &bull; Shift results
        </p>
      </section>

      {/* 5. SECTION 5: OPPORTUNITY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-indigo-405" /> Predictable Growth
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              Imagine Building a Business That Generates Leads Every Day
            </h2>
            <div className="space-y-4 text-slate-400 font-light leading-relaxed text-sm sm:text-base">
              <p>
                Imagine waking up to qualified inquiries, webinar registrations, course sales, and appointment slots booked without depending on referrals.
              </p>
              <p className="border-l-2 border-indigo-500/40 pl-4 text-slate-300">
                Without chasing clients. Without spending years figuring it out alone.
              </p>
              <p>
                This is what happens when you build a Digital Business Ecosystem.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/5 backdrop-blur-md space-y-4">
              <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider block font-mono">Compound Inbound Opportunities</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {imaginePoints.map((point, idx) => (
                  <div key={idx} className="flex gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="h-4.5 w-4.5 text-indigo-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-light">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECTION 6: URGENCY */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="glass-panel border-indigo-500/25 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden group">
          {/* Subtle glowing element */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-40 pointer-events-none" />
          
          <div className="space-y-6 relative z-10 text-left sm:text-center">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold flex items-center sm:justify-center gap-2">
              <Zap className="h-4.5 w-4.5 animate-pulse text-[#d4af37]" /> Adapt or Remain Stagnant
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              The AI Revolution Is Creating Two Types of Professionals
            </h2>
            <div className="space-y-4 text-slate-350 text-sm leading-relaxed font-light max-w-2xl mx-auto">
              <p>
                The first group waits. They keep doing what worked five years ago. The second group adapts. They leverage AI, automation, personal branding, and digital systems to create exponential growth.
              </p>
              <p className="font-semibold text-slate-200">
                Five years from now, the gap between these two groups will be enormous.
              </p>
              <p className="italic text-xs text-indigo-400">
                The best time to build your digital ecosystem was yesterday. The second-best time is today.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SECTION 7: AUTHORITY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Image */}
          <div className="lg:col-span-5 flex justify-center order-last lg:order-first">
            <div className="relative w-full max-w-[360px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-slate-800 shadow-indigo-950/20 group">
              <Image
                src="/swapnil_hero.png"
                alt="Swapnil Shiwalay"
                fill
                sizes="(max-w-768px) 100vw, 360px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-85" />
            </div>
          </div>

          {/* Bio info */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">
              Systems Architect
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
              Meet Swapnil Shiwalay
            </h2>
            <p className="text-xs sm:text-sm font-mono tracking-widest text-[#d4af37] font-bold uppercase">
              Founder, Digital Business Strategist & AI-Powered Growth Architect
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
              For more than 20 years, Swapnil has helped businesses, entrepreneurs, experts, coaches, consultants, healthcare professionals, and thought leaders leverage technology, marketing, automation, and digital systems to scale their impact and income.
            </p>

            <div className="border-t border-slate-900/60 pt-6 mt-6 space-y-4">
              <h4 className="text-xs uppercase tracking-wider font-bold text-white">Experience Highlights</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>20+ Years in Digital Business</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>2,000+ Websites & Projects</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Worked With Industry Leaders</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Specialist in Branding, AI & Funnels</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Founder, Shiwalay Digital Pvt. Ltd.</span>
                </div>
              </div>
            </div>

            <p className="text-slate-400 text-xs italic border-l-2 border-indigo-500/40 pl-3 pt-1">
              &ldquo;His mission is simple: To help experts transform their knowledge into scalable digital businesses.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* 8. SECTION 8: SOLUTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">
            Compounding Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            Introducing The Digital Business Ecosystem Framework™
          </h2>
          <p className="text-slate-400 text-sm font-light leading-relaxed max-w-xl mx-auto">
            A proven framework designed to help experts and professionals build predictable growth online. Move from uncertainty to predictability.
          </p>
        </div>

        {/* 5 Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 text-left mb-16">
          {solutionPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="p-5 rounded-2xl border border-slate-800 bg-slate-900/5 hover:border-slate-700 transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base leading-snug font-display">{pillar.title}</h3>
                    <p className="text-[#d4af37] text-[10px] uppercase font-bold tracking-wider mt-0.5">{pillar.desc}</p>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed font-light">{pillar.details}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Nested Interactive Ecosystem Canvas */}
        <div className="border border-slate-800 rounded-3xl p-6 sm:p-10 bg-slate-900/10 backdrop-blur-md overflow-x-auto">
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block font-mono text-center mb-6">Interactive Systems Blueprint</span>
          <InteractiveEcosystem />
        </div>
      </section>

      {/* 9. SECTION 9: OFFER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold">
            Enrollment Gateway
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            Start Your Transformation Journey
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-stretch">
          {/* Main Offer Card */}
          <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl border border-indigo-500/20 bg-indigo-950/10 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <span className="px-2.5 py-1 bg-indigo-600/15 border border-indigo-500/25 text-indigo-400 text-[10px] font-bold rounded uppercase tracking-wider font-mono">
                    VIDEO MASTERCLASS
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mt-3 font-display">Free Digital Business Masterclass</h3>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-slate-500 text-[9px] uppercase block tracking-wider font-bold">INVESTMENT</span>
                  <span className="text-emerald-400 text-xl font-bold font-mono">FREE</span>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-800/80">
                <h4 className="text-xs uppercase tracking-wider font-bold text-white font-mono">What You Will Learn:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-slate-300">
                  <div className="flex gap-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-indigo-455 shrink-0 mt-0.5" />
                    <span>How to position yourself as an authority</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-indigo-455 shrink-0 mt-0.5" />
                    <span>How to create irresistible offers</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-indigo-455 shrink-0 mt-0.5" />
                    <span>How to generate leads consistently</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-indigo-455 shrink-0 mt-0.5" />
                    <span>How to use AI to accelerate growth</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-indigo-455 shrink-0 mt-0.5" />
                    <span>How to build a scalable digital ecosystem</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800/80">
                <h4 className="text-xs uppercase tracking-wider font-bold text-white font-mono">Plus Receive:</h4>
                <div className="flex flex-wrap gap-2 text-[10px] text-slate-350">
                  <span className="bg-slate-900 border border-slate-800 px-2 py-1 rounded-lg">✓ Digital Business Assessment</span>
                  <span className="bg-slate-900 border border-slate-800 px-2 py-1 rounded-lg">✓ Growth Roadmap</span>
                  <span className="bg-slate-900 border border-slate-800 px-2 py-1 rounded-lg">✓ AI Tools Resource Guide</span>
                  <span className="bg-slate-900 border border-slate-800 px-2 py-1 rounded-lg">✓ Business System Blueprint</span>
                </div>
              </div>
            </div>

            <div className="pt-8 relative z-10">
              <Link
                href="/masterclass"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-widest text-slate-950 bg-gradient-to-r from-indigo-400 to-indigo-300 hover:from-indigo-300 hover:to-indigo-200 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-950/20"
              >
                Reserve Your Seat Now
                <Play className="h-4.5 w-4.5 fill-current" />
              </Link>
            </div>
          </div>

          {/* Assessment Embed Sidebar */}
          <div id="assessment" className="lg:col-span-5 p-6 rounded-3xl border border-slate-800 bg-slate-900/10 backdrop-blur-xs flex flex-col justify-between scroll-mt-24">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-indigo-455" />
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider font-mono">Diagnostic Calculator</span>
              </div>
              <h3 className="text-xl font-bold text-white font-display">Take the Digital Business Assessment</h3>
              <p className="text-slate-400 text-xs leading-relaxed font-light">
                Calculate your systems index instantly. Rate your bottlenecks across personal branding, qualified lead pipelines, and AI automation.
              </p>
            </div>
            
            <div className="mt-6 border-t border-slate-800 pt-6">
              <EcosystemCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* 10. SECTION 10: DECISION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/10 backdrop-blur-md p-8 sm:p-16 space-y-8 relative overflow-hidden group">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white tracking-wide uppercase">
              One Decision Can Change Your Next 5 Years
            </h2>

            <div className="space-y-4 text-slate-350 text-sm sm:text-base font-light leading-relaxed">
              <p>
                You can continue relying on hope, referrals, and inconsistent growth.
              </p>
              <p className="font-semibold text-slate-200">
                Or you can build a digital business system designed for today&apos;s economy.
              </p>
              <p>
                The opportunity is here. The tools are available. The market is growing.
              </p>
            </div>

            <div className="pt-4 space-y-2">
              <p className="text-xs uppercase tracking-widest text-[#d4af37] font-bold">The Question Is:</p>
              <h4 className="text-lg sm:text-xl font-bold text-white">Will you remain a participant? Or become a leader in the digital economy?</h4>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link
                href="/masterclass"
                className="flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-indigo-400 to-indigo-300 hover:from-indigo-300 hover:to-indigo-200 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                Start Your Free Masterclass
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-200 border border-slate-800 hover:border-indigo-500/30 hover:bg-slate-900/30 rounded-xl transition-all duration-300"
              >
                Begin Your Transformation Today
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ ACCORDION SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">
            Objections Addressed
          </span>
          <h2 className="text-3xl font-bold font-display text-white tracking-tight">Frequently Asked Questions</h2>
        </div>
        <FaqAccordion />
      </section>

      {/* FINAL CLOSING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel border-indigo-500/20 rounded-3xl p-8 sm:p-16 text-center space-y-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-50" />
          
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-wider uppercase">
              Build Systems. Create Assets. Scale Impact.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto">
              Join thousands of professionals embracing the future of digital business through strategy, technology, automation, AI, and personal branding.
            </p>
            
            <div className="py-2 border-t border-b border-slate-900/60 flex flex-col items-center justify-center gap-1.5 max-w-xs mx-auto">
              <span className="text-[10px] font-mono tracking-widest text-[#d4af37] font-bold uppercase">Your Digital Business Journey Starts Here</span>
              <span className="text-xs font-semibold text-white">With Swapnil Shiwalay</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
