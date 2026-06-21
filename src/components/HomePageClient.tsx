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
  Play,
  ArrowUpRight
} from "lucide-react";
import InteractiveEcosystem from "@/components/InteractiveEcosystem";
import EcosystemCalculator from "@/components/EcosystemCalculator";
import FaqAccordion from "@/components/FaqAccordion";

export default function HomePageClient() {
  const problems = [
    "Struggling to get quality leads?",
    "Depending on referrals?",
    "Posting content without results?",
    "Confused about AI and digital marketing?",
    "Trading time for money?"
  ];

  const realizations = [
    { title: "Visibility", desc: "Being seen by your ideal prospects in a crowded market." },
    { title: "Trust", desc: "Establishing deep credibility before a sales conversation even begins." },
    { title: "Personal Branding", desc: "Positioning yourself as the only logical solution in your niche." },
    { title: "Automation", desc: "Deploying software systems that route, qualify, and nurture prospects." },
    { title: "Systems", desc: "Building assets that compound and add value to your business over time." }
  ];

  const opportunities = [
    { title: "Consistent Leads", desc: "Inbound client inquiries routing to your pipeline daily." },
    { title: "Automated Follow-Ups", desc: "Nurturing leads via automated triggers without manual effort." },
    { title: "High-Value Clients", desc: "Attracting premium buyers who value your proprietary methods." },
    { title: "Multiple Income Streams", desc: "Monetizing your expertise through digital assets and cohorts." },
    { title: "AI-Powered Productivity", desc: "Multiplying your operational output while keeping your time free." }
  ];

  const pillars = [
    {
      title: "Authority",
      badge: "Brand Positioning",
      desc: "Build your personal brand.",
      details: "Become the default industry expert using high-authority search profiles and content loops.",
      icon: Award
    },
    {
      title: "Audience",
      badge: "Target Traffic",
      desc: "Attract the right people.",
      details: "Drive inbound interest by deploying high-value digital resources and targeting specific niches.",
      icon: Users
    },
    {
      title: "Automation",
      badge: "AI Middleware",
      desc: "Save time using AI and systems.",
      details: "Connect low-code automations to qualify leads and route data, eliminating admin bloat.",
      icon: Cpu
    },
    {
      title: "Acquisition",
      badge: "Lead Funnels",
      desc: "Generate leads and clients.",
      details: "Deploy qualified application pipelines that pre-sell prospects and fill your calendar.",
      icon: Target
    },
    {
      title: "Ascension",
      badge: "Recurring Tiers",
      desc: "Increase revenue through multiple offers.",
      details: "Transition from linear hourly rates to high-ticket masterclasses and scalable digital assets.",
      icon: TrendingUp
    }
  ];

  const masterclassTopics = [
    "Personal Branding: The blueprint for default niche authority.",
    "Lead Generation: How to attract qualified prospects consistently.",
    "AI Tools: Deploying smart assistants and automation workflows.",
    "Content Strategy: Creating assets that pre-sell your consulting.",
    "Automation Systems: Eliminating manual scheduling and qualification.",
    "Revenue Growth: Designing high-ticket retainers and offers."
  ];

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
                <Sparkles className="h-3.5 w-3.5" /> Premium Authority Systems
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight leading-[1.1] text-white">
                Turn Your Knowledge Into a <span className="gold-gradient-text">Profitable Digital Business</span>
              </h1>
              
              <h2 className="text-lg sm:text-xl font-medium text-slate-350 border-l-2 border-indigo-500/40 pl-4 leading-relaxed">
                Most experts, coaches, consultants, and professionals struggle to get consistent leads, clients, and income online.
              </h2>

              <p className="text-slate-400 text-base leading-relaxed font-light">
                Learn how to build a Digital Business Ecosystem using Personal Branding, AI, Content, Automation, and Proven Growth Systems.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/masterclass"
                  className="flex items-center justify-center gap-2 px-8 py-4 text-sm sm:text-base font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-indigo-400 to-indigo-300 hover:from-indigo-300 hover:to-indigo-200 rounded-xl shadow-lg shadow-indigo-950/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Join Free Masterclass
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#assessment"
                  className="flex items-center justify-center gap-2 px-8 py-4 text-sm sm:text-base font-semibold border border-slate-800 hover:border-indigo-500/30 hover:bg-slate-900/30 rounded-xl transition-all duration-300"
                >
                  Take Free Assessment
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
                    Growth Architect
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

      {/* 2. THE PROBLEM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-rose-500 font-bold flex items-center gap-2">
              <AlertTriangle className="h-4.5 w-4.5 text-rose-500" /> The Scaling Obstacle
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              Working Hard But Not Growing?
            </h2>
            <div className="space-y-4 text-slate-400 font-light leading-relaxed text-sm sm:text-base">
              <p>
                You&apos;re not alone. Most professionals have expertise but no business system.
              </p>
              <p className="border-l-2 border-rose-500/40 pl-4 text-slate-350 font-medium">
                Expertise alone does not guarantee client acquisition or predictable revenue in the digital economy.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/5 backdrop-blur-md space-y-4">
              <span className="text-[10px] uppercase font-bold text-rose-455 tracking-wider block font-mono">Core Obstacles</span>
              <div className="space-y-3.5">
                {problems.map((point, idx) => (
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

      {/* 3. THE REALIZATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Points list */}
          <div className="lg:col-span-6 order-last lg:order-first">
            <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/5 backdrop-blur-md space-y-6">
              <span className="text-[10px] uppercase font-bold text-emerald-450 tracking-wider block font-mono">Modern Value Metrics</span>
              <div className="space-y-4">
                {realizations.map((item, idx) => (
                  <div key={idx} className="flex gap-3.5 items-start text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-display">{item.title}</strong>
                      <span className="text-slate-400 text-xs font-light">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Intro */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
              <Compass className="h-4.5 w-4.5 text-emerald-400" /> Ground Realities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              Expertise Is Not Enough
            </h2>
            <div className="space-y-4 text-slate-400 font-light leading-relaxed text-sm sm:text-base">
              <p>
                Today, the market no longer rewards quiet excellence alone.
              </p>
              <p className="border-l-2 border-emerald-500/40 pl-4 text-slate-300 font-medium">
                Those who build digital assets grow faster than those who rely on traditional methods.
              </p>
              <p>
                To command premium value and capture attention, you must shift your focus toward visibility, positioning, trust, and systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE OPPORTUNITY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-indigo-455" /> Compound Leverage
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              Build a Business That Works Even When You Don&apos;t
            </h2>
            <div className="space-y-4 text-slate-400 font-light leading-relaxed text-sm sm:text-base">
              <p>
                A freelancer trades time. An authority builds compounding assets.
              </p>
              <p className="border-l-2 border-indigo-500/40 pl-4 text-slate-350 font-medium">
                Imagine having a self-sustaining system handling your qualified lead generation, client scheduling, and marketing assets.
              </p>
              <p>
                All from a single digital ecosystem.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/5 backdrop-blur-md space-y-6">
              <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider block font-mono">The Leverage Pipeline</span>
              <div className="space-y-4">
                {opportunities.map((item, idx) => (
                  <div key={idx} className="flex gap-3.5 items-start text-xs sm:text-sm text-slate-350">
                    <CheckCircle2 className="h-4.5 w-4.5 text-indigo-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-200 block font-display">{item.title}</strong>
                      <span className="text-slate-400 text-xs font-light">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY NOW? */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="glass-panel border-indigo-500/25 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-40 pointer-events-none" />
          
          <div className="space-y-6 relative z-10 text-left sm:text-center">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold flex items-center sm:justify-center gap-2">
              <Zap className="h-4.5 w-4.5 animate-pulse text-[#d4af37]" /> The AI Revolution Is Here
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Adapt or Remain Stagnant
            </h2>
            <div className="space-y-4 text-slate-350 text-sm leading-relaxed font-light max-w-2xl mx-auto">
              <p>
                The gap between those who adapt and those who delay is growing every day.
              </p>
              <p className="font-semibold text-slate-200 text-base sm:text-lg">
                The best time to build your digital presence is now.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ABOUT SWAPNIL SHIWALAY */}
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

          {/* Details */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">
              Systems strategist
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
              About Swapnil Shiwalay
            </h2>
            <p className="text-xs sm:text-sm font-mono tracking-widest text-[#d4af37] font-bold uppercase">
              Digital Business Strategist | Founder | Growth Architect
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
              With 20+ years of experience and 2,000+ digital projects, Swapnil helps experts, coaches, consultants, healthcare professionals, and entrepreneurs build scalable digital businesses.
            </p>

            <div className="p-5 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl space-y-2 mt-6">
              <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block font-mono">Our Core Mission</span>
              <p className="text-slate-200 text-sm sm:text-base font-semibold leading-relaxed">
                Help 10,000 experts create impact, income, and freedom through digital business systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. THE SOLUTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">
            The Scaling Engine
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            The Digital Business Ecosystem Framework™
          </h2>
          <p className="text-slate-400 text-sm font-light leading-relaxed max-w-xl mx-auto">
            A simple framework built around 5 pillars to move you from ad-hoc marketing to compounding growth assets.
          </p>
        </div>

        {/* 5 Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 text-left mb-16">
          {pillars.map((pillar, idx) => {
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

        {/* Embedded Blueprint Canvas */}
        <div className="border border-slate-800 rounded-3xl p-6 sm:p-10 bg-slate-900/10 backdrop-blur-md overflow-x-auto">
          <span className="text-[10px] uppercase font-bold text-slate-550 tracking-wider block font-mono text-center mb-6">Interactive Systems Blueprint</span>
          <InteractiveEcosystem />
        </div>
      </section>

      {/* 8. FREE MASTERCLASS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold">
            Accelerated Training
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            Free Masterclass
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-stretch">
          {/* Details Card */}
          <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl border border-indigo-500/20 bg-indigo-950/10 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <span className="px-2.5 py-1 bg-indigo-600/15 border border-indigo-500/25 text-indigo-400 text-[10px] font-bold rounded uppercase tracking-wider font-mono">
                    VIDEO TRAINING
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mt-3 font-display">Discover How To Build Your Digital Business</h3>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-slate-500 text-[9px] uppercase block tracking-wider font-bold">INVESTMENT</span>
                  <span className="text-emerald-400 text-xl font-bold font-mono">FREE</span>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-800/80">
                <h4 className="text-xs uppercase tracking-wider font-bold text-white font-mono">Inside this free training, you&apos;ll learn:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-slate-300">
                  {masterclassTopics.map((topic, i) => (
                    <div key={i} className="flex gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-indigo-455 shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800/80">
                <h4 className="text-xs uppercase tracking-wider font-bold text-white font-mono">Bonus Deliverables:</h4>
                <div className="flex flex-wrap gap-2 text-[10px] text-slate-350">
                  <span className="bg-slate-900 border border-slate-800 px-2 py-1 rounded-lg">✓ Digital Business Assessment</span>
                  <span className="bg-slate-900 border border-slate-800 px-2 py-1 rounded-lg">✓ Growth Blueprint</span>
                  <span className="bg-slate-900 border border-slate-800 px-2 py-1 rounded-lg">✓ AI Resource Kit</span>
                </div>
              </div>
            </div>

            <div className="pt-8 relative z-10">
              <Link
                href="/masterclass"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-widest text-slate-950 bg-gradient-to-r from-indigo-400 to-indigo-300 hover:from-indigo-300 hover:to-indigo-200 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-950/20"
              >
                Reserve Your Free Seat
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
              <h3 className="text-xl font-bold text-white font-display">Take Free Assessment</h3>
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

      {/* 9. YOUR NEXT STEP */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/10 backdrop-blur-md p-8 sm:p-16 space-y-8 relative overflow-hidden group">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-2xl mx-auto space-y-8 relative z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white tracking-wide uppercase">
              Your Future Business Starts With One Decision
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              <div className="p-5 border border-slate-900 rounded-2xl bg-slate-950/40 relative">
                <div className="absolute top-3 right-3 text-rose-500 font-bold uppercase text-[9px] tracking-wider">OPTION A</div>
                <h4 className="text-sm font-bold text-slate-400 mb-2">Linear Option</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-light">
                  Continue doing what everyone else is doing. Relying on inconsistent growth, word-of-mouth referrals, and trading time for money.
                </p>
              </div>
              <div className="p-5 border border-indigo-500/20 rounded-2xl bg-indigo-500/5 relative">
                <div className="absolute top-3 right-3 text-indigo-400 font-bold uppercase text-[9px] tracking-wider">OPTION B</div>
                <h4 className="text-sm font-bold text-white mb-2">Systems Option</h4>
                <p className="text-xs text-slate-305 leading-relaxed font-semibold">
                  Build a business system that generates trust, leads, clients, and growth consistently in today&apos;s digital economy.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 pt-4">
              <Link
                href="/masterclass"
                className="flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-widest text-slate-950 bg-gradient-to-r from-indigo-400 to-indigo-300 hover:from-indigo-300 hover:to-indigo-200 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                Reserve Your Free Seat
                <ArrowRight className="h-4 w-4" />
              </Link>
              
              <div className="py-2 border-t border-b border-slate-900/60 flex flex-col items-center justify-center gap-1 mt-4">
                <span className="text-[10px] font-mono tracking-widest text-indigo-400 font-bold uppercase">Build Authority &bull; Automate Growth &bull; Scale Impact</span>
                <span className="text-xs font-semibold text-slate-400">Learn With Swapnil Shiwalay</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ ACCORDION SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">
            Objections Addressed
          </span>
          <h2 className="text-3xl font-bold font-display text-white tracking-tight">Frequently Asked Questions</h2>
        </div>
        <FaqAccordion />
      </section>
    </div>
  );
}
