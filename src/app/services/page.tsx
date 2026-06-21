import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  Award,
  Cpu,
  Workflow,
  Laptop,
  Network,
  CheckCircle,
  HelpCircle,
  Clock,
  Sparkles,
} from "lucide-react";

export default function ServicesPage() {
  const serviceList = [
    {
      id: "strategy",
      title: "Digital Business Strategy",
      tagline: "Map the high-level architecture of your digital assets, pricing tiers, and scaling paths.",
      icon: Network,
      for: "Experts and thought leaders who are trading time for money and plateaud at current contract sizes.",
      problem: "No structured blueprint. Operating ad-hoc without knowing how their content, funnels, and products link together.",
      systems: [
        "Proprietary framework packaging models",
        "Retainer-based and high-ticket mastermind pricing grids",
        "Systems architecture software maps (Make.com, CRM, portals)",
      ],
      process: [
        { name: "Phase 1: Systems Diagnostic", desc: "We review your operational metrics, assets, and technology gaps." },
        { name: "Phase 2: Framework Map", desc: "We package your knowledge into a signature, trademark-grade named framework." },
        { name: "Phase 3: Scaling Roadmap", desc: "We map out your 90-day execution blueprint for tech and content." },
      ],
      outcomes: "A trademark-grade named framework, a defined high-ticket packaging blueprint, and a 90-day systems scaling manual.",
    },
    {
      id: "ai",
      title: "AI Business Transformation",
      tagline: "Deploy custom AI agents and low-code triggers to automate lead flows and reclaim operations time.",
      icon: Cpu,
      for: "Agencies, consultants, and companies bogged down by manual administration, triage, and scheduling.",
      problem: "Wasting 15+ hours weekly on manual lead qualifiers, follow-ups, CRM entry, and calendar bookings.",
      systems: [
        "Make.com / Zapier webhook automation triggers",
        "LLM triage agents programmed to score and route prospects",
        "AI distribution scripts translating 1 audio file into blogs, newsletters, and posts",
      ],
      process: [
        { name: "Phase 1: Task Diagnostic", desc: "We map your weekly operations to isolate admin tasks suited for AI." },
        { name: "Phase 2: Prompt & Flow Building", desc: "We connect API nodes and program AI prompts with your business parameters." },
        { name: "Phase 3: Sandbox Testing", desc: "We test automations in a sandbox before launching them live." },
      ],
      outcomes: "24/7 automated lead qualification, auto-updating CRM pipelines, and custom prompt libraries saving 15+ hours weekly.",
    },
    {
      id: "branding",
      title: "Personal Branding Architecture",
      tagline: "Build category authority and turn generic profiles into client-attracting digital assets.",
      icon: Award,
      for: "Consultants, founders, and speakers who are invisible online despite decades of real-world expertise.",
      problem: "Competitors with less experience dominating search results and charging higher fees due to better online presence.",
      systems: [
        "LinkedIn & YouTube authority profile optimization plans",
        "Search-optimized long-form asset templates (Blueprints, Guides)",
        "Daily authority distribution scheduling loops",
      ],
      process: [
        { name: "Phase 1: Hook Definition", desc: "We locate your unique angles and establish your brand positioning." },
        { name: "Phase 2: Authority Assets", desc: "We draft conversion-optimized PDF blueprints and long-form guides." },
        { name: "Phase 3: Distribution Engine", desc: "We set up automated scheduling tools to keep you visible on feeds." },
      ],
      outcomes: "Category authority positioning, polished PDF blueprints, and a sustainable content engine that generates organic inbound leads.",
    },
    {
      id: "websites",
      title: "Website & Funnel Systems",
      tagline: "Premium, ultra-fast Next.js hubs engineered to pre-sell and convert traffic.",
      icon: Laptop,
      for: "Thought leaders whose current website feels generic, slow, or fails to capture and qualify leads.",
      problem: "Slow-loading website templates that drop traffic and fail to guide visitors toward booking calls.",
      systems: [
        "Next.js App Router websites built for mobile responsiveness",
        "Embedded qualified application forms with validation hooks",
        "Dynamic case study visual timelines showing proof of results",
      ],
      process: [
        { name: "Phase 1: Wireframing & Flow", desc: "We map out user navigation paths and conversion-driven text hierarchies." },
        { name: "Phase 2: Next.js Engineering", desc: "We write clean, high-performance code with zero slow templates." },
        { name: "Phase 3: Optimization", desc: "We optimize for Core Web Vitals to guarantee fast load times." },
      ],
      outcomes: "A premium, high-speed personal brand website loaded with automated scheduling and lead capture modal assets.",
    },
    {
      id: "automation",
      title: "Marketing & Lead Automation",
      tagline: "Install value-first registration pipelines that qualify leads and schedule calls 24/7.",
      icon: Workflow,
      for: "Consultants needing a predictable pipeline of warm sales bookings without manual outreach.",
      problem: "High sales friction, spending valuable time on calls with prospects who are not a fit or are not pre-sold.",
      systems: [
        "15-minute value-first Masterclass funnel pipelines",
        "Automated WhatsApp/email follow-up sequences",
        "Calendly auto-routing links synced to qualify filters",
      ],
      process: [
        { name: "Phase 1: Copywriting", desc: "We write high-conversion copy for registration, success, and sales pages." },
        { name: "Phase 2: Middleware Integration", desc: "We connect page submissions with email sequences and calendar schedulers." },
        { name: "Phase 3: Tracking & Analytics", desc: "We integrate Google Analytics and Meta Pixels to track conversions." },
      ],
      outcomes: "An automated lead generation engine delivering pre-qualified, pre-educated prospects directly to your calendar.",
    },
    {
      id: "consulting",
      title: "Growth Consulting Advisory",
      tagline: "Direct 1-on-1 operational advisory to scale structures, team operations, and pricing.",
      icon: TrendingUp,
      for: "Successful founders and experts seeking structural steering to transition from operator to architect.",
      problem: "Feeling overwhelmed by growth; lacks senior advisory feedback to navigate systems bottlenecks.",
      systems: [
        "Weekly operations and systems review sessions",
        "Team hiring and delegation frameworks",
        "Premium community portal onboarding blueprints",
      ],
      process: [
        { name: "Phase 1: System Assessment", desc: "We identify operational bottlenecks in your current pipeline." },
        { name: "Phase 2: Strategy Sprint", desc: "We implement weekly optimization sprints to resolve bottlenecks." },
        { name: "Phase 3: Architecture Transfer", desc: "We help you document systems and train your team to take over operations." },
      ],
      outcomes: "Direct access to Swapnil Shiwalay, clear team delegation frameworks, and optimized operational systems.",
    },
  ];

  return (
    <div className="space-y-24 py-12 pb-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* HEADER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold block font-mono">
          Systems Design
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold font-display leading-tight">
          Ecosystem <span className="gold-gradient-text">Architecture Services</span>
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto font-light">
          We help you package your knowledge, deploy operations automation, and build high-ticket client acquisition engines.
        </p>

        {/* Navigation buttons */}
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          {serviceList.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="px-4 py-2 text-xs font-semibold rounded-full bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
            >
              {s.title}
            </a>
          ))}
        </div>
      </section>

      {/* DETAILED SERVICES LIST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {serviceList.map((service) => {
          const Icon = service.icon;

          return (
            <div
              key={service.id}
              id={service.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-10 lg:p-12 scroll-mt-24 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden text-left"
            >
              <div className="absolute top-0 bottom-0 left-0 w-1 bg-indigo-600" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left Column: Summary */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-indigo-950/30 border border-indigo-900/30 flex items-center justify-center text-indigo-400 shrink-0">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold font-mono">
                      Architectural Component
                    </span>
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-display gold-gradient-text pb-1">
                      {service.title}
                    </h2>
                    <p className="text-slate-400 text-sm sm:text-base leading-relaxed mt-3 font-light">
                      {service.tagline}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-2">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block font-mono">
                      Target Audience
                    </span>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                      {service.for}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/contact"
                      className="btn-primary text-xs uppercase tracking-wider"
                    >
                      Apply for Strategy Session
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* Right Column: Details */}
                <div className="lg:col-span-7 space-y-8">
                  {/* Problem solved */}
                  <div className="p-4 bg-rose-500/5 border border-rose-500/15 rounded-xl space-y-1">
                    <span className="text-[10px] text-rose-500 uppercase tracking-wider font-bold block font-mono">
                      The Bottleneck Solved
                    </span>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                      {service.problem}
                    </p>
                  </div>

                  {/* Systems Designed */}
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider font-bold block mb-4 font-mono">
                      Systems We Design & Integrate
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.systems.map((sys, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-slate-300 text-xs sm:text-sm leading-snug font-light">{sys}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Process */}
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider font-bold block mb-4 font-mono">
                      Execution Phases
                    </span>
                    <div className="space-y-4">
                      {service.process.map((p, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="h-6 w-6 rounded-full bg-indigo-950/30 border border-indigo-900/30 flex items-center justify-center text-indigo-400 text-xs font-bold shrink-0 mt-0.5">
                            {idx + 1}
                          </div>
                          <div>
                            <h4 className="text-white text-sm font-semibold">{p.name}</h4>
                            <p className="text-slate-400 text-xs sm:text-sm mt-0.5 leading-relaxed font-light">
                              {p.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Outcomes */}
                  <div className="pt-4 border-t border-slate-800">
                    <span className="text-xs text-slate-400 uppercase tracking-wider font-bold block mb-2 font-mono">
                      Compounding System Outcomes
                    </span>
                    <p className="text-slate-200 text-sm font-semibold leading-relaxed italic">
                      &ldquo;{service.outcomes}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 sm:p-12 text-center space-y-6 shadow-sm hover:shadow-md transition-all duration-300">
          <h2 className="text-2xl sm:text-3xl font-bold font-display gold-gradient-text pb-1">
            Unsure Which Systems Architectural Framework Matches Your Current Stage?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-light">
            Take a 15-minute diagnostic call where we review your traffic, automation setup, and monetization assets to design a customized strategy blueprint.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="btn-primary px-6 text-xs uppercase tracking-wider"
            >
              Book Systems Diagnostic Call
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
