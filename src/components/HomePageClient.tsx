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
  Briefcase,
  HelpCircle,
  Clock,
  LogOut,
  Sparkle
} from "lucide-react";
import InteractiveEcosystem from "@/components/InteractiveEcosystem";
import EcosystemCalculator from "@/components/EcosystemCalculator";
import FaqAccordion from "@/components/FaqAccordion";

export default function HomePageClient() {
  const painPoints = [
    "Artificial Intelligence is changing industries overnight.",
    "Companies are reducing teams.",
    "Promotions are slower.",
    "Job security is disappearing.",
    "No matter how experienced you become, your income is still controlled by someone else's decision."
  ];

  const opportunityPoints = [
    "Generates predictable income",
    "Attracts qualified leads consistently",
    "Builds your authority in your industry",
    "Allows you to work from anywhere",
    "Creates multiple streams of revenue",
    "Uses AI and automation to save time",
    "Gives you control over your future"
  ];

  const freedomPillars = [
    {
      letter: "F",
      title: "Find Your Expertise",
      desc: "Identify the knowledge, skills, and experience people will pay for."
    },
    {
      letter: "R",
      title: "Reposition Your Brand",
      desc: "Build authority and trust in your chosen niche."
    },
    {
      letter: "E",
      title: "Establish Digital Assets",
      desc: "Create your website, content ecosystem, and lead generation assets."
    },
    {
      letter: "E",
      title: "Engineer AI Systems",
      desc: "Automate lead generation, nurturing, and client acquisition."
    },
    {
      letter: "D",
      title: "Develop Revenue Streams",
      desc: "Create consulting, courses, memberships, and digital products."
    },
    {
      letter: "O",
      title: "Optimize Growth",
      desc: "Use systems, data, and automation to scale."
    },
    {
      letter: "M",
      title: "Multiply Freedom",
      desc: "Achieve location freedom, time freedom, and financial freedom."
    }
  ];

  const elite99Features = [
    "Digital Business Strategy",
    "Personal Branding Systems",
    "AI Automation Frameworks",
    "Lead Generation Systems",
    "Content Creation Blueprints",
    "Community Building Models",
    "Revenue Growth Strategies",
    "Implementation Support"
  ];

  return (
    <div className="space-y-32 pb-24 overflow-hidden bg-slate-950 text-slate-100 font-sans relative">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[95vh] flex items-center pt-16 sm:pt-24">
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-10 w-80 h-80 bg-indigo-650/10 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-purple-950/10 rounded-full blur-[150px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column (Copy) */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold tracking-wider text-indigo-400 uppercase">
                <Briefcase className="h-3.5 w-3.5" /> Niche Authority Transformation
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight leading-[1.1] text-white">
                The Employment System Is Broken. <br />
                <span className="gold-gradient-text">Your Expertise Is Your New Job Security.</span>
              </h1>
              
              <h2 className="text-lg sm:text-xl font-medium text-slate-350 border-l-2 border-indigo-500/40 pl-4 leading-relaxed">
                For years, you did everything right. You studied hard. Built experience. Worked long hours. Delivered results. Stayed loyal.
              </h2>

              <p className="text-slate-400 text-base leading-relaxed font-light">
                Yet today, despite having 10, 15, or even 20 years of expertise, you feel more uncertain than ever. Learn how to build a Digital Business Ecosystem using Personal Branding, AI, Content, Automation, and Proven Growth Systems.
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
                    Freedom Architect
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800/80 text-center">
                  <span className="text-xs font-mono font-bold text-indigo-400">ELITE99 MOVEMENT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PAIN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-rose-500 font-bold flex items-center gap-2">
              <AlertTriangle className="h-4.5 w-4.5 text-rose-500" /> Systemic Disruption
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              The Security Illusion
            </h2>
            <div className="space-y-4 text-slate-400 font-light leading-relaxed text-sm sm:text-base">
              <p>
                The truth is simple: <strong className="text-slate-200">Most professionals are trapped in a system where they exchange time for money, with little control over their future.</strong>
              </p>
              <p className="border-l-2 border-rose-500/40 pl-4 text-slate-350 font-medium">
                Despite your achievements, your income is still controlled by someone else&apos;s decision.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/5 backdrop-blur-md space-y-4">
              <span className="text-[10px] uppercase font-bold text-rose-455 tracking-wider block font-mono">Modern Job Realities</span>
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

      {/* 3. AWARENESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Timeline side */}
          <div className="lg:col-span-6 order-last lg:order-first">
            <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/5 backdrop-blur-md space-y-6">
              <span className="text-[10px] uppercase font-bold text-emerald-450 tracking-wider block font-mono">The Knowledge Economy Shift</span>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Build an active, loyal audience online.</span>
                </div>
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Create compounding digital assets and products.</span>
                </div>
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Automate operational scheduling and qual routes.</span>
                </div>
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Generate income from anywhere in the world.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Intro copy */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
              <Compass className="h-4.5 w-4.5 text-emerald-400" /> Global Re-alignment
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              The World Has Changed
            </h2>
            <div className="space-y-4 text-slate-400 font-light leading-relaxed text-sm sm:text-base">
              <p>
                We are no longer living in the Industrial Age. We are living in the Knowledge Economy.
              </p>
              <p className="border-l-2 border-emerald-500/40 pl-4 text-slate-300 font-medium">
                The most successful people are no longer those with the best resumes. They are the ones who know how to package their expertise, build trust at scale, and create digital systems that work for them 24/7.
              </p>
              <p className="italic text-xs">
                The opportunity has never been greater. But most professionals are still playing by old rules in a new world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. IDENTITY SHIFT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/10 backdrop-blur-md p-8 sm:p-12 space-y-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">
            Mindset Mutation
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            Stop Thinking Like an Employee. <br />
            Start Thinking Like a <span className="gold-gradient-text">Knowledge Entrepreneur.</span>
          </h2>
          <div className="max-w-2xl mx-auto text-slate-400 font-light leading-relaxed text-sm sm:text-base space-y-4">
            <p>
              You possess years of experience, insights, frameworks, lessons, and expertise that can create value for thousands of people.
            </p>
            <p className="font-semibold text-slate-200">
              Your knowledge is an asset. Your experience is intellectual property. Your expertise is your competitive advantage.
            </p>
            <p className="text-xs text-indigo-400">
              The moment you stop seeing yourself as a worker and start seeing yourself as a creator of value, everything changes.
            </p>
          </div>
        </div>
      </section>

      {/* 5. OPPORTUNITY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-indigo-455" /> Asset Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              Imagine Building a Digital Freelancing Business That Works
            </h2>
            <div className="space-y-4 text-slate-400 font-light leading-relaxed text-sm sm:text-base">
              <p>
                Instead of depending on a single employer, client, or source of income, you build a business around what you already know.
              </p>
              <p className="border-l-2 border-indigo-500/40 pl-4 text-slate-350 font-medium">
                Your expertise becomes your product. Your personal brand becomes your distribution channel. Your digital ecosystem becomes your growth engine.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/5 backdrop-blur-md space-y-4">
              <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider block font-mono font-semibold">Freedom-First Capabilities</span>
              <div className="space-y-3">
                {opportunityPoints.map((point, idx) => (
                  <div key={idx} className="flex gap-3 items-start text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="h-4.5 w-4.5 text-indigo-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-light">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. URGENCY */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="glass-panel border-indigo-500/25 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-40 pointer-events-none" />
          
          <div className="space-y-6 relative z-10 text-left sm:text-center">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold flex items-center sm:justify-center gap-2">
              <Zap className="h-4.5 w-4.5 animate-pulse text-[#d4af37]" /> Widening Gaps
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              The AI Gap Is Widening
            </h2>
            <div className="space-y-4 text-slate-350 text-sm leading-relaxed font-light max-w-2xl mx-auto">
              <p>
                AI is not waiting. The market is not slowing down. Opportunities are moving toward people who are visible, trusted, and digitally enabled.
              </p>
              <p className="font-semibold text-slate-205 text-base sm:text-lg">
                Five years from now, there will be two kinds of professionals: Those who leveraged technology to create freedom, and those who remained dependent on systems that no longer serve them.
              </p>
              <p className="italic text-xs text-indigo-400">
                The best time to start building your digital business was yesterday. The second-best time is today.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. AUTHORITY */}
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
              Founders bio
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
              Hi, I&apos;m Swapnil Shiwalay.
            </h2>
            <p className="text-xs sm:text-sm font-mono tracking-widest text-[#d4af37] font-bold uppercase">
              AI-Powered Digital Business Strategist
            </p>
            <div className="space-y-4 text-slate-400 text-sm sm:text-base leading-relaxed font-light">
              <p>
                For over 20 years, I have worked with entrepreneurs, experts, educators, personal brands, consultants, celebrities, and organizations to help them build digital growth systems.
              </p>
              <p>
                I have seen firsthand that success in today&apos;s world is not about working harder. It is about building systems that scale expertise.
              </p>
              <p>
                Through years of implementation, consulting, training, and digital transformation projects, I developed a framework that helps professionals turn their knowledge into profitable digital businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SOLUTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">
            The Blueprint
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            Introducing the Freedom Business Blueprint™
          </h2>
          <p className="text-slate-400 text-sm font-light leading-relaxed max-w-xl mx-auto">
            A proven framework designed to help experienced professionals transform their expertise into an AI-powered digital business.
          </p>
        </div>

        {/* FREEDOM Pillars List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 text-left mb-16">
          {freedomPillars.map((pillar, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl border border-slate-800 bg-slate-900/5 hover:border-slate-700 transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="text-4xl font-bold font-mono text-indigo-500/25 group-hover:text-indigo-400/50 transition-colors block">
                  {pillar.letter}
                </span>
                <div>
                  <h4 className="text-white font-bold text-sm leading-snug font-display">{pillar.title}</h4>
                  <p className="text-slate-405 text-[11px] leading-relaxed font-light mt-1.5">{pillar.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Embedded Blueprint Canvas */}
        <div className="border border-slate-800 rounded-3xl p-6 sm:p-10 bg-slate-900/10 backdrop-blur-md overflow-x-auto">
          <span className="text-[10px] uppercase font-bold text-slate-550 tracking-wider block font-mono text-center mb-6">Interactive Systems Blueprint</span>
          <InteractiveEcosystem />
        </div>
      </section>

      {/* 9. OFFER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold">
            The Skool Hub
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            Join the Elite99 Movement
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-stretch">
          {/* Details Card */}
          <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl border border-indigo-500/20 bg-indigo-950/10 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <span className="px-2.5 py-1 bg-indigo-600/15 border border-indigo-500/25 text-indigo-400 text-[10px] font-bold rounded uppercase tracking-wider font-mono">
                    MEMBERSHIP PORTAL
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mt-3 font-display">Freedom-Based Digital Businesses</h3>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-slate-500 text-[9px] uppercase block tracking-wider font-bold">COHORT STATUS</span>
                  <span className="text-emerald-400 text-sm font-bold font-mono">ACTIVE INDUCTION</span>
                </div>
              </div>

              <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
                A community of ambitious professionals, experts, consultants, freelancers, and entrepreneurs committed to building freedom-based digital businesses.
              </p>

              <div className="space-y-4 pt-4 border-t border-slate-800/80">
                <h4 className="text-xs uppercase tracking-wider font-bold text-white font-mono">Inside, you&apos;ll discover:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-355 font-semibold">
                  {elite99Features.map((topic, i) => (
                    <div key={i} className="flex gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-indigo-455 shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-slate-400 text-xs leading-relaxed border-t border-slate-800/80 pt-4">
                Whether you&apos;re starting from scratch or looking to scale your expertise, Elite99 provides the roadmap, systems, and support needed to build a modern digital business.
              </p>
            </div>

            <div className="pt-8 relative z-10">
              <Link
                href="/masterclass"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-widest text-slate-950 bg-gradient-to-r from-indigo-400 to-indigo-300 hover:from-indigo-300 hover:to-indigo-200 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-950/20"
              >
                Join Elite99
                <Play className="h-4.5 w-4.5 fill-current" />
              </Link>
            </div>
          </div>

          {/* Assessment Embed Sidebar */}
          <div id="assessment" className="lg:col-span-5 p-6 rounded-3xl border border-slate-800 bg-slate-900/10 backdrop-blur-xs flex flex-col justify-between scroll-mt-24">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-indigo-455" />
                <span className="text-[10px] uppercase font-bold text-slate-550 tracking-wider font-mono">Diagnostic Calculator</span>
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

      {/* 10. DECISION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/10 backdrop-blur-md p-8 sm:p-16 space-y-8 relative overflow-hidden group">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-2xl mx-auto space-y-8 relative z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white tracking-wide uppercase">
              Your Future Business Starts With One Decision
            </h2>

            <div className="space-y-4 text-slate-350 text-sm sm:text-base font-light leading-relaxed">
              <p>
                The question is not whether the world is changing. The question is whether you will change with it.
              </p>
              <p className="font-semibold text-slate-205">
                You already have the experience. You already have the knowledge. You already have the potential.
              </p>
              <p>
                Now it&apos;s time to build the systems that turn your expertise into freedom.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link
                href="/masterclass"
                className="flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-indigo-400 to-indigo-300 hover:from-indigo-300 hover:to-indigo-200 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                Reserve Your Free Seat
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-200 border border-slate-800 hover:border-indigo-500/30 hover:bg-slate-900/30 rounded-xl transition-all duration-300"
              >
                Begin Your Freedom Journey
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="py-2 border-t border-b border-slate-900/60 flex flex-col items-center justify-center gap-1 mt-6">
              <span className="text-[10px] font-mono tracking-widest text-indigo-400 font-bold uppercase">Build Authority &bull; Automate Growth &bull; Scale Impact</span>
              <span className="text-xs font-semibold text-slate-400">Learn With Swapnil Shiwalay</span>
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
    </div>
  );
}
