"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Network,
  Award,
  RefreshCw,
  Cpu,
  Workflow,
  Laptop,
  CheckCircle,
  HelpCircle,
  LayoutGrid,
  Info,
} from "lucide-react";

export default function FrameworksPage() {
  const [activeGraphic, setActiveGraphic] = useState<number>(0);

  const graphicsList = [
    { name: "1. Digital Ecosystem Blueprint", desc: "The flow map connecting traffic, lead triage, and client delivery." },
    { name: "2. Personal Brand Growth Journey", desc: "The progression timeline from invisible expert to Category King." },
    { name: "3. Authority Flywheel", desc: "The compounding content loop that feeds organic client acquisition." },
    { name: "4. Lead Generation Engine", desc: "A funnel diagram detailing traffic filters and booking routing." },
    { name: "5. AI-Powered Business System", desc: "The middleware node maps connecting forms, LLM triage, and CRM." },
    { name: "6. Content-to-Revenue Framework", desc: "Aligning distribution posts with advisory sales packages." },
    { name: "7. Business Growth Roadmap", desc: "Chronological milestone phases for systems buildouts." },
    { name: "8. Digital Asset Pyramid", desc: "value asset tiers from free magnets to high-ticket masterminds." },
    { name: "9. Impact-to-Income Model", desc: "Map of declining manual delivery hours vs compounding income." },
    { name: "10. Knowledge Monetization System", desc: "Connecting student acquisition directly with community retainers." },
  ];

  return (
    <div className="py-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-900/5 rounded-full blur-[140px] pointer-events-none" />

      {/* BACK LINK */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </div>

      {/* HEADER */}
      <header className="space-y-4 pb-8 border-b border-slate-900 mb-12">
        <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold">
          Systems Library
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white">
          Ecosystem <span className="gold-gradient-text">Frameworks & Blueprints</span>
        </h1>
        <p className="text-slate-350 text-sm sm:text-base max-w-2xl leading-relaxed font-light">
          An interactive catalog of Swapnil Shiwalay&apos;s proprietary business design roadmaps. Select a blueprint below to view its visual structure and operational explanations.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-2">
          {graphicsList.map((g, idx) => (
            <button
              key={idx}
              onClick={() => setActiveGraphic(idx)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col ${
                idx === activeGraphic
                  ? "bg-[#0d1e36] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                  : "bg-[#050e1c]/40 border-slate-800 hover:border-[#d4af37]/35"
              }`}
            >
              <span
                className={`text-sm font-bold font-display transition-colors ${
                  idx === activeGraphic ? "text-[#d4af37]" : "text-white"
                }`}
              >
                {g.name}
              </span>
              <span className="text-slate-400 text-xs mt-1 font-light leading-normal">
                {g.desc}
              </span>
            </button>
          ))}
        </div>

        {/* Right Side: Interactive CSS/SVG Graphic Canvas */}
        <div className="lg:col-span-8">
          <div className="glass-panel border-[#d4af37]/20 rounded-2xl p-6 sm:p-10 min-h-[500px] flex flex-col justify-between relative overflow-hidden transition-all duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#d4af37]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-900 pb-4">
                <Info className="h-5 w-5 text-[#d4af37]" />
                <h2 className="text-xl sm:text-2xl font-bold font-display gold-gradient-text pb-1">
                  {graphicsList[activeGraphic].name.split(". ")[1]}
                </h2>
              </div>

              {/* RENDER THE ACTIVE GRAPHIC MOCKUP */}
              <div className="bg-[#020813] border border-slate-900 rounded-xl p-4 sm:p-8 flex justify-center items-center min-h-[300px] relative overflow-hidden">
                {activeGraphic === 0 && <EcosystemBlueprint />}
                {activeGraphic === 1 && <BrandGrowthJourney />}
                {activeGraphic === 2 && <AuthorityFlywheel />}
                {activeGraphic === 3 && <LeadGenEngine />}
                {activeGraphic === 4 && <AiBusinessSystem />}
                {activeGraphic === 5 && <ContentRevenueFramework />}
                {activeGraphic === 6 && <BusinessGrowthRoadmap />}
                {activeGraphic === 7 && <DigitalAssetPyramid />}
                {activeGraphic === 8 && <ImpactIncomeModel />}
                {activeGraphic === 9 && <KnowledgeMonetization />}
              </div>
            </div>

            {/* Explanation Footer inside canvas */}
            <div className="pt-6 border-t border-slate-900 mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-slate-400 text-xs sm:text-sm font-light text-center sm:text-left leading-relaxed">
                This diagram is presentation-grade and represents live advisory structures.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#d4af37] text-navy-dark text-xs font-bold uppercase tracking-wider rounded font-semibold text-[#030a16]"
              >
                Apply Framework to My Business
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* GRAPHICS VECTOR COMPONENTS                                                 */
/* ========================================================================== */

// 1. Ecosystem Blueprint
function EcosystemBlueprint() {
  const steps = ["Traffic", "Capture Form", "AI Triage", "CRM Entry", "Scheduler"];
  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-around gap-4 text-center">
      {steps.map((st, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <div className="glass-panel border-[#d4af37]/35 rounded-lg p-3 w-32 flex flex-col items-center shadow-lg">
            <span className="text-[#d4af37] text-xs font-bold font-display uppercase">Node {idx + 1}</span>
            <span className="text-white text-sm font-semibold mt-1">{st}</span>
          </div>
          {idx < steps.length - 1 && (
            <span className="hidden sm:block text-[#d4af37] text-lg font-bold">&rarr;</span>
          )}
        </div>
      ))}
    </div>
  );
}

// 2. Personal Brand Growth Journey
function BrandGrowthJourney() {
  const points = [
    { year: "Phase 1", title: "Invisible Expert", desc: "No digital footprints; dependent on referrals." },
    { year: "Phase 2", title: "Category Authority", desc: "Proprietary frameworks packaged; long-form content active." },
    { year: "Phase 3", title: "Ecosystem Architect", desc: "AI automations active; high-ticket community scaled." },
  ];
  return (
    <div className="w-full space-y-4">
      {points.map((pt, idx) => (
        <div key={idx} className="flex items-center gap-4">
          <div className="h-8 w-16 bg-[#d4af37]/10 border border-[#d4af37]/35 text-[#d4af37] text-xs font-bold rounded flex items-center justify-center shrink-0">
            {pt.year}
          </div>
          <div className="glass-panel border-slate-800 rounded-lg p-3 flex-grow text-left">
            <h4 className="text-white font-bold text-sm font-display">{pt.title}</h4>
            <p className="text-slate-400 text-xs mt-0.5 leading-normal">{pt.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// 3. Authority Flywheel
function AuthorityFlywheel() {
  return (
    <div className="relative h-60 w-60 rounded-full border border-[#d4af37]/25 flex items-center justify-center animate-spin [animation-duration:15s]">
      {/* Outer flywheel nodes */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-[#0d1e36] border border-[#d4af37] rounded p-1.5 text-[9px] text-[#f3e5ab] font-bold uppercase tracking-wider">
        Create Asset
      </div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#0d1e36] border border-[#d4af37] rounded p-1.5 text-[9px] text-[#f3e5ab] font-bold uppercase tracking-wider">
        Distribute
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#0d1e36] border border-[#d4af37] rounded p-1.5 text-[9px] text-[#f3e5ab] font-bold uppercase tracking-wider">
        Build Trust
      </div>
      <div className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#0d1e36] border border-[#d4af37] rounded p-1.5 text-[9px] text-[#f3e5ab] font-bold uppercase tracking-wider">
        Qualify Leads
      </div>

      {/* Center core */}
      <div className="h-20 w-20 rounded-full bg-[#0d1e36] border-2 border-[#d4af37] flex items-center justify-center text-center p-2 shadow-lg z-10 animate-pulse">
        <span className="text-[#d4af37] text-[10px] font-bold uppercase tracking-wider leading-none">Authority Core</span>
      </div>
    </div>
  );
}

// 4. Lead Generation Engine
function LeadGenEngine() {
  return (
    <div className="w-full max-w-sm flex flex-col items-center space-y-3">
      <div className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-center text-xs font-bold uppercase text-white">
        Traffic: Ads & Social Content
      </div>
      <span className="text-indigo-500 text-xs font-bold">&darr;</span>
      <div className="w-4/5 bg-rose-950/20 border border-rose-900/35 rounded-lg p-2 text-center text-xs font-bold uppercase text-rose-450 flex items-center justify-center gap-1.5">
        <span>Triage Filter: Application Qualifiers</span>
      </div>
      <span className="text-indigo-500 text-xs font-bold">&darr;</span>
      <div className="w-3/5 bg-emerald-950/20 border border-emerald-900/35 rounded-lg p-2 text-center text-xs font-bold uppercase text-emerald-400">
        Output: Scheduled Zoom Bookings
      </div>
    </div>
  );
}

// 5. AI-Powered Business System
function AiBusinessSystem() {
  const nodes = [
    { name: "Submission", role: "Webhook Form" },
    { name: "Make.com", role: "Middleware" },
    { name: "Claude API", role: "AI Triage" },
    { name: "Hubspot CRM", role: "Data Sync" },
  ];
  return (
    <div className="w-full grid grid-cols-2 gap-4">
      {nodes.map((node, idx) => (
        <div key={idx} className="glass-panel border-slate-800 rounded-xl p-3 flex flex-col items-center justify-center text-center">
          <span className="h-7 w-7 rounded-lg bg-[#d4af37]/5 border border-[#d4af37]/15 flex items-center justify-center text-[#d4af37] text-xs font-bold mb-2">
            {idx + 1}
          </span>
          <h4 className="text-white font-bold text-xs sm:text-sm font-display">{node.name}</h4>
          <p className="text-slate-500 text-[10px] mt-0.5">{node.role}</p>
        </div>
      ))}
    </div>
  );
}

// 6. Content-to-Revenue Framework
function ContentRevenueFramework() {
  const columns = [
    { title: "Organic Post", target: "Qualifying Guide", product: "Diagnostic Call" },
    { title: "Long-form insights", target: "15m Masterclass", product: "Ecosystem retainer" },
  ];
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
      {columns.map((col, idx) => (
        <div key={idx} className="glass-panel border-[#d4af37]/15 rounded-xl p-4 space-y-3">
          <div className="border-b border-slate-900 pb-1.5">
            <span className="text-[#d4af37] text-[10px] uppercase font-bold tracking-wider">Tier {idx + 1}</span>
          </div>
          <div className="space-y-1">
            <p className="text-slate-500 text-[10px] uppercase font-bold leading-none">Pillar Post</p>
            <p className="text-white text-xs sm:text-sm font-semibold">{col.title}</p>
          </div>
          <div className="space-y-1">
            <p className="text-slate-500 text-[10px] uppercase font-bold leading-none">Lead Capture Asset</p>
            <p className="text-[#f3e5ab] text-xs sm:text-sm font-semibold">{col.target}</p>
          </div>
          <div className="space-y-1">
            <p className="text-slate-500 text-[10px] uppercase font-bold leading-none">Consulting Offer</p>
            <p className="text-white text-xs sm:text-sm font-bold">{col.product}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// 7. Business Growth Roadmap
function BusinessGrowthRoadmap() {
  const phases = [
    { title: "1. Systems Audit", status: "Completed" },
    { title: "2. Framework Package", status: "Designing" },
    { title: "3. AI Middleware Build", status: "Queued" },
  ];
  return (
    <div className="w-full space-y-3">
      {phases.map((ph, idx) => (
        <div key={idx} className="flex items-center justify-between p-3 bg-slate-900/30 border border-slate-800 rounded-lg">
          <span className="text-white text-xs sm:text-sm font-semibold font-display">{ph.title}</span>
          <span
            className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
              ph.status === "Completed"
                ? "bg-emerald-950/20 border border-emerald-900/35 text-emerald-400"
                : ph.status === "Designing"
                ? "bg-amber-500/10 border border-amber-500/25 text-amber-500"
                : "bg-slate-900 border border-slate-800 text-slate-500"
            }`}
          >
            {ph.status}
          </span>
        </div>
      ))}
    </div>
  );
}

// 8. Digital Asset Pyramid
function DigitalAssetPyramid() {
  return (
    <div className="flex flex-col items-center w-full max-w-[280px]">
      {/* Apex */}
      <div className="w-1/3 bg-indigo-600 text-white text-[9px] font-bold p-2 text-center rounded-t-lg shadow-md uppercase tracking-wider">
        Mastermind
      </div>
      {/* Middle */}
      <div className="w-2/3 bg-slate-900 border-x border-t border-slate-800 text-white text-[9px] font-bold p-2 text-center shadow-md uppercase tracking-wider mt-1">
        Retainers
      </div>
      {/* Base */}
      <div className="w-full bg-slate-950 border border-slate-800 text-slate-300 text-[9px] font-bold p-2.5 text-center rounded-b-lg shadow-md uppercase tracking-wider mt-1">
        Free checklist blueprints
      </div>
    </div>
  );
}

// 9. Impact-to-Income Model
function ImpactIncomeModel() {
  return (
    <div className="w-full max-w-xs space-y-4">
      {/* Manual Labor row */}
      <div className="space-y-1">
        <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500">
          <span>Weekly Manual Admin Hours</span>
          <span className="text-rose-400">Declining 75%</span>
        </div>
        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
          <div className="h-full bg-rose-500 w-1/4" />
        </div>
      </div>

      {/* Income scale row */}
      <div className="space-y-1">
        <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500">
          <span>Business Retainer Income</span>
          <span className="text-emerald-400">Compounding 4.5x</span>
        </div>
        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 w-4/5" />
        </div>
      </div>
    </div>
  );
}

// 10. Knowledge Monetization System
function KnowledgeMonetization() {
  return (
    <div className="w-full flex items-center justify-around gap-2 text-center">
      <div className="glass-panel border-slate-800 rounded p-2.5 w-24 text-[10px] text-slate-400 font-bold uppercase">
        Courses / Books
      </div>
      <span className="text-[#d4af37] font-bold">&rarr;</span>
      <div className="glass-panel border-[#d4af37]/35 rounded p-3 w-28 text-xs text-[#f3e5ab] font-bold uppercase shadow-lg animate-pulse">
        Community Portal
      </div>
      <span className="text-[#d4af37] font-bold">&rarr;</span>
      <div className="glass-panel border-slate-800 rounded p-2.5 w-24 text-[10px] text-slate-400 font-bold uppercase">
        Masterminds
      </div>
    </div>
  );
}
