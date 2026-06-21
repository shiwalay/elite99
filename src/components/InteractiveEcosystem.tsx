"use client";

import { useState } from "react";
import {
  Users,
  Award,
  Cpu,
  Megaphone,
  TrendingUp,
  MessagesSquare,
  Maximize2,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface EcosystemStage {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  tagline: string;
  objective: string;
  description: string;
  actionSteps: string[];
  metrics: string;
}

export default function InteractiveEcosystem() {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages: EcosystemStage[] = [
    {
      id: "audience",
      name: "1. Audience",
      icon: Users,
      tagline: "Attract High-Intent Traffic",
      objective: "Build a consistent flow of ideal buyers using short-form distribution, YouTube authority, and paid amplification.",
      description: "Stop chasing clients. We build content engines that reach the exact target market that feels aligned with your values. We focus on building traffic channels that you own, not just renting them from social media algorithms.",
      actionSteps: [
        "Create high-value short-form content loops",
        "Set up a Search SEO content system",
        "Implement micro-budget paid traffic engines for fast validation",
      ],
      metrics: "Target: 50,000+ targeted monthly views within 90 days",
    },
    {
      id: "authority",
      name: "2. Authority",
      icon: Award,
      tagline: "Position as the Category King",
      objective: "Establish absolute expertise and trustworthiness through key digital assets like guides, books, and long-form studies.",
      description: "If they don't respect your expertise, they will negotiate your price. We frame your 10,000 hours of knowledge into structured IP, making you the default logical choice in your niche.",
      actionSteps: [
        "Document your proprietary signature framework",
        "Launch high-conversion long-form guides & assets",
        "Optimize your personal brand profile architectures",
      ],
      metrics: "Target: 10x increase in organic inbound inquiries",
    },
    {
      id: "automation",
      name: "3. Automation",
      icon: Cpu,
      tagline: "Reclaim Your Time",
      objective: "Leverage AI agents and low-code middleware to handle qualification, follow-ups, and admin tasks automatically.",
      description: "Build a business that grows without your direct labor. We deploy modern CRM triggers, calendar integrations, and AI response handlers to manage prospective leads so you can focus on building.",
      actionSteps: [
        "Set up smart lead qualifying chatbots & routing",
        "Configure automated sequence workflows for email & SMS",
        "Deploy AI-driven follow-ups to never drop a warm lead",
      ],
      metrics: "Target: Save 15+ hours of manual admin tasks per week",
    },
    {
      id: "acquisition",
      name: "4. Acquisition",
      icon: Megaphone,
      tagline: "Predictable Lead Flow",
      objective: "Establish conversion-optimized landing pages and high-value lead magnets that capture contact data.",
      description: "Convert random traffic into concrete names, email addresses, and phone numbers. We design lead magnet hubs and premium squeeze pages built specifically to scale opt-ins.",
      actionSteps: [
        "Deploy high-conversion Lead Magnet Landing Pages",
        "Embed smart forms that pre-qualify user intent",
        "Integrate automated data passing into main sales pipeline",
      ],
      metrics: "Target: 25% to 40% landing page opt-in rates",
    },
    {
      id: "conversion",
      name: "5. Conversion",
      icon: TrendingUp,
      tagline: "Turn Leads Into Clients",
      objective: "Deploy high-ticket sales pages, value-first masterclasses, and automated calendar bookers.",
      description: "Conversion shouldn't feel like a high-pressure sales pitch. We create systems that pre-educate and pre-sell prospects before they even get on a call with you, making closing natural and easy.",
      actionSteps: [
        "Create a 15-minute value-first Masterclass funnel",
        "Build dynamic high-ticket application forms",
        "Structure multi-channel retargeting scripts",
      ],
      metrics: "Target: 3% to 5% sales conversion rate on qualified leads",
    },
    {
      id: "community",
      name: "6. Community",
      icon: MessagesSquare,
      tagline: "Build a Brand Moat",
      objective: "Gather your buyers and leads into a branded community container to drive retention and word-of-mouth.",
      description: "Modern customer acquisition is expensive. Community is the ultimate retention engine. We set up platforms (like Skool, Circle, or premium portals) where your students and clients interact, learn, and grow together.",
      actionSteps: [
        "Design community engagement and onboarding templates",
        "Launch interactive Q&A structures and gamification features",
        "Establish internal success loops to foster peer support",
      ],
      metrics: "Target: 80%+ community retention and high NPS scores",
    },
    {
      id: "scale",
      name: "7. Scale",
      icon: Maximize2,
      tagline: "Infinite Business Leverage",
      objective: "Maximize customer lifetime value through masterminds, software, licensing, and corporate offers.",
      description: "Once your core engine is stable, we multiply your income. We help you design premium high-ticket masterminds, license your frameworks to other businesses, and create corporate consulting models.",
      actionSteps: [
        "Structure a premium high-ticket mastermind offering",
        "Package your IP for corporate licensing and training models",
        "Optimize operational structure to support higher client volumes",
      ],
      metrics: "Target: 2x to 5x increase in Average Contract Value (ACV)",
    },
  ];

  const ActiveIcon = stages[activeStage].icon;

  return (
    <div className="w-full">
      {/* Visual Navigation Nodes */}
      <div className="grid grid-cols-2 md:grid-cols-7 gap-3 mb-10">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isActive = idx === activeStage;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStage(idx)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all duration-300 relative group cursor-pointer ${
                isActive
                  ? "bg-slate-900 border-indigo-600 shadow-[0_0_20px_rgba(79,70,229,0.15)]"
                  : "bg-slate-950/40 border-slate-800 hover:border-indigo-500/35 hover:bg-slate-900/30"
              }`}
            >
              <div
                className={`h-12 w-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-900 text-indigo-400 group-hover:bg-indigo-500/10"
                }`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <span
                className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${
                  isActive ? "text-indigo-400" : "text-slate-400 group-hover:text-slate-200"
                }`}
              >
                {stage.name.split(" ")[1]}
              </span>

              {/* Connecting line indicators (desktop only) */}
              {idx < stages.length - 1 && (
                <div className="hidden md:block absolute top-10 -right-2 translate-x-1/2 z-10 pointer-events-none">
                  <ArrowRight className={`h-4 w-4 ${isActive ? "text-indigo-400" : "text-slate-700"}`} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Stage Details Card */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 md:p-10 relative overflow-hidden transition-all duration-500 min-h-[400px]">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-indigo-900/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative z-10 items-start">
          {/* Left Column: Icon and Core objective */}
          <div className="w-full lg:w-2/5 flex flex-col space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-500">
                <ActiveIcon className="h-6 w-6" />
              </div>
              <span className="text-xs uppercase tracking-widest text-indigo-500 font-semibold">
                Ecosystem Component
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mt-2">
              {stages[activeStage].name.split(". ")[1]}
            </h3>
            <p className="text-lg font-medium text-[#f3e5ab]/90 italic leading-snug">
              &ldquo;{stages[activeStage].tagline}&rdquo;
            </p>
            <div className="pt-4 border-t border-slate-800">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1">
                Primary Goal
              </span>
              <p className="text-slate-300 text-sm leading-relaxed">
                {stages[activeStage].objective}
              </p>
            </div>
            <div className="p-3 bg-indigo-500/5 border border-indigo-500/10 rounded-lg text-xs font-semibold text-indigo-400 text-center tracking-wider">
              {stages[activeStage].metrics}
            </div>
          </div>

          {/* Right Column: Execution */}
          <div className="w-full lg:w-3/5 flex flex-col space-y-6">
            <div>
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-2">
                Operational Overview
              </span>
              <p className="text-slate-400 text-base leading-relaxed">
                {stages[activeStage].description}
              </p>
            </div>

            <div>
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-4">
                Key Deliverables
              </span>
              <ul className="space-y-3">
                {stages[activeStage].actionSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                    <span className="text-slate-200 text-sm sm:text-base leading-relaxed">
                      {step}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
