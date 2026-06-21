"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import InteractiveEcosystem from "@/components/InteractiveEcosystem";
import EcosystemCalculator from "@/components/EcosystemCalculator";
import FaqAccordion from "@/components/FaqAccordion";
import { useEcosystemStore } from "@/store/useEcosystemStore";
import {
  TrendingUp,
  Award,
  Zap,
  Users,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  RefreshCw,
  Cpu,
  Layers,
  Star,
} from "lucide-react";

export default function HomePageClient() {
  const { theme, websiteCmsCopy } = useEcosystemStore();
  const { heroHeadline, heroSubheadline, testimonials } = websiteCmsCopy;

  // GOS Personalization State
  const [visitorTier, setVisitorTier] = useState<"Cold" | "Warm" | "Hot" | "Customer">("Cold");
  const [personalizedCta, setPersonalizedCta] = useState({
    title: "Book a Growth Strategy Call",
    subtitle: "Schedule a 1-on-1 operational audit with Swapnil",
    badge: "Digital Business Ecosystem Architect",
    link: "/contact"
  });

  // Newsletter Form State
  const [newsletterName, setNewsletterName] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubbed, setNewsletterSubbed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    // 1. Add to subscribers database in localStorage
    const savedSubs = localStorage.getItem("gos_newsletter_subs");
    let currentSubs = [];
    if (savedSubs) {
      try { currentSubs = JSON.parse(savedSubs); } catch (err) {}
    }
    const newSub = {
      email: newsletterEmail,
      name: newsletterName || "Subscriber",
      date: new Date().toISOString().split("T")[0],
      score: 15,
      opens: 1,
      clicks: 0,
      interests: ["General Insights"]
    };
    localStorage.setItem("gos_newsletter_subs", JSON.stringify([newSub, ...currentSubs]));

    // 2. Update GOS Profile
    const savedProfile = localStorage.getItem("gos_visitor_profile");
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        profile.newsletterSubscribed = true;
        if (newsletterName) profile.name = newsletterName;
        profile.email = newsletterEmail;
        profile.score = (profile.score || 0) + 15;
        localStorage.setItem("gos_visitor_profile", JSON.stringify(profile));
        
        // Dispatch custom event
        const event = new CustomEvent("gos_profile_updated", { detail: profile });
        window.dispatchEvent(event);
      } catch (err) {}
    }

    // 3. Dismiss Exit Intent modal for session
    sessionStorage.setItem("exit_intent_dismissed", "true");

    setNewsletterSubbed(true);
    setNewsletterName("");
    setNewsletterEmail("");
  };

  useEffect(() => {
    const applyPersonalization = (profileData?: any) => {
      let score = 0;
      let tier = "Cold";
      let webinarsReg = false;
      let callBooked = false;

      if (profileData) {
        score = profileData.score || 0;
        tier = profileData.tier || "Cold";
        webinarsReg = profileData.webinarsRegistered || false;
        callBooked = profileData.strategyCallBooked || false;
      } else {
        const localProf = localStorage.getItem("gos_visitor_profile");
        if (localProf) {
          try {
            const parsed = JSON.parse(localProf);
            score = parsed.score || 0;
            tier = parsed.tier || "Cold";
            webinarsReg = parsed.webinarsRegistered || false;
            callBooked = parsed.strategyCallBooked || false;
          } catch (e) {}
        }
      }

      setVisitorTier(tier as any);

      if (callBooked || tier === "Customer") {
        setPersonalizedCta({
          title: "Access Student Academy Portal",
          subtitle: "Enter the private student training community & Skool hub.",
          badge: "Active Student & Partner Hub",
          link: "/academy"
        });
      } else if (tier === "Hot" || score >= 50) {
        setPersonalizedCta({
          title: "Apply for Direct Advisory Session",
          subtitle: "Schedule your priority high-ticket Growth Strategy session.",
          badge: "Priority Lead Route Activated",
          link: "/contact"
        });
      } else if (tier === "Warm" || score >= 20 || webinarsReg) {
        setPersonalizedCta({
          title: "Unlock Free Operations Masterclass",
          subtitle: "Watch the 15-minute systems automation training instantly.",
          badge: "Recommended Next Step",
          link: "/masterclass"
        });
      } else {
        setPersonalizedCta({
          title: "Download Free Growth Checklist",
          subtitle: "Rate your digital bottlenecks with our 25-point audit worksheet.",
          badge: "Ecosystem Architect Guide",
          link: "/resources"
        });
      }
    };

    applyPersonalization();

    const handleProfileUpdate = (e: any) => {
      if (e.detail) {
        applyPersonalization(e.detail);
      }
    };

    window.addEventListener("gos_profile_updated", handleProfileUpdate);
    return () => window.removeEventListener("gos_profile_updated", handleProfileUpdate);
  }, []);

  const stats = [
    { value: "20+", label: "Years Experience" },
    { value: "2000+", label: "Websites Delivered" },
    { value: "15+", label: "Industries Served" },
    { value: "AI & Digital", label: "Growth Specialist" },
  ];

  const invisibleFactors = [
    {
      title: "No Personal Brand",
      consequence: "Clients treat you as a replaceable vendor rather than the default authority.",
      icon: Award,
    },
    {
      title: "No Lead System",
      consequence: "Relying strictly on referrals, creating unpredictable dry spells.",
      icon: TrendingUp,
    },
    {
      title: "No Authority Positioning",
      consequence: "Stuck in commoditized pricing cycles, negotiating fees.",
      icon: Layers,
    },
    {
      title: "No Operations Automation",
      consequence: "Spending 15+ hours weekly on scheduling, qualify routing, and data entry.",
      icon: Cpu,
    },
    {
      title: "No Community Moat",
      consequence: "No compounding asset; every client acquisition is a one-off transaction.",
      icon: Users,
    },
  ];

  const beforeAfter = [
    {
      before: "Dependent on unpredictable referrals",
      after: "Predictable lead generation systems",
    },
    {
      before: "Random, ad-hoc social media posts",
      after: "Authority-driven content distribution engine",
    },
    {
      before: "Exhausting manual follow-ups & routing",
      after: "Automated nurturing & AI qualification",
    },
    {
      before: "Selling commoditized hourly consulting",
      after: "High-ticket proprietary framework retainer models",
    },
  ];

  const serviceCards = [
    {
      title: "Digital Business Strategy",
      problem: "No blueprint. Unsure how to package your 10,000 hours of knowledge.",
      outcome: "A proprietary signature framework and high-leverage digital roadmap.",
      icon: Layers,
    },
    {
      title: "AI Business Transformation",
      problem: "Admin bloat. Wasting time on manual follow-ups and CRM updates.",
      outcome: "Make.com/Zapier automations and custom qualified AI assistants.",
      icon: Cpu,
    },
    {
      title: "Personal Brand Growth",
      problem: "Invisibility. Competitors with less knowledge occupy the spotlight.",
      outcome: "High-retention content engines for LinkedIn, YouTube, and search optimization.",
      icon: Award,
    },
    {
      title: "Website & Funnel Systems",
      problem: "Leaky websites. Visitors leave without submitting contact details.",
      outcome: "Premium, ultra-fast Next.js hubs built to pre-sell and convert.",
      icon: Sparkles,
    },
    {
      title: "Marketing Automation",
      problem: "High sales friction. Spending hours speaking with unqualified leads.",
      outcome: "Qualified application funnels that route warm prospects to your calendar.",
      icon: RefreshCw,
    },
    {
      title: "Growth Consulting",
      problem: "Plateaued revenue. Incapable of scaling pricing tiers.",
      outcome: "Advisory sessions to scale operations and package high-ticket masterminds.",
      icon: TrendingUp,
    },
  ];

  const caseStories = [
    {
      title: "From Referral Trap to Scalable Automation",
      subtitle: "B2B Strategic Advisory Firm",
      challenge: "Company relied purely on referral networks, bottlenecking growth at ₹400k/month.",
      strategy: "Designed their proprietary framework blueprint, set up a 15-minute qualification masterclass funnel, and integrated AI lead scoring.",
      execution: "Developed custom code landing pages, automated scheduling triggers, and connected CRM data pipelines.",
      outcome: "Reached ₹1.8M/month within 6 months; reduced manual sales admin by 75%.",
    },
    {
      title: "Authority Positioning for Executive Coach",
      subtitle: "Global Leadership Specialist",
      challenge: "Client was charging hourly rates, facing high client churn and constant outreach exhaustion.",
      strategy: "Packaging their expertise into a premium corporate training model and launched an active authority-driven content loop.",
      execution: "Set up a branded community hub on Circle and deployed automated email nurturing templates.",
      outcome: "Closed three 6-month corporate retainers ($15k/each) in the first 90 days; average customer lifetime value increased by 300%.",
    },
  ];

  const knowledgeHub = [
    { type: "Framework", title: "The Digital Ecosystem Blueprint", desc: "A structural diagram of the 5-step client acquisition and delivery framework." },
    { type: "Article", title: "Deploying AI Middleware in Consulting", desc: "How to connect Make.com and OpenAI assistants to qualification forms." },
    { type: "Podcast Mockup", title: "Conscious Business Scaling", desc: "Swapnil Shiwalay on scaling digital operations without losing peace of mind." },
  ];

  const trustLogos = ["Shiwalay Digital", "Ecosystem Builders", "Authority Agency", "Subject Matter Experts", "Growth Consulting"];

  return (
    <div className="space-y-24 pb-20 overflow-hidden tech-grid-bg">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-8 sm:pt-16">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Copy */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600/10 border border-indigo-500/20 text-xs font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
                <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" /> {personalizedCta.badge}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight leading-[1.1] gold-gradient-text pb-2">
                {heroHeadline}
              </h1>
              <p className="text-slate-550 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
                {heroSubheadline}
              </p>

              {/* CTAs */}
              <div className="space-y-4 pt-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={personalizedCta.link}
                    className="flex items-center justify-center gap-2 px-8 py-4 text-sm sm:text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    {personalizedCta.title}
                    <ArrowRight className="h-5 w-5 ml-1" />
                  </Link>
                  <Link
                    href="/frameworks"
                    className={`flex items-center justify-center gap-2 px-8 py-4 text-sm sm:text-base font-semibold bg-transparent border rounded-xl transition-all duration-300 cursor-pointer ${
                      theme === "light"
                        ? "text-slate-700 border-slate-200 hover:border-indigo-600 hover:bg-slate-100"
                        : "text-white border-slate-800 hover:border-indigo-400 hover:bg-slate-900/40"
                    }`}
                  >
                    Explore the Ecosystem Framework
                  </Link>
                </div>
                
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider pl-1">
                  Active GOS Tier: <span className="text-indigo-600 dark:text-indigo-450">{visitorTier} Lead</span> &bull; {personalizedCta.subtitle}
                </p>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              className="lg:col-span-5 relative flex justify-center w-full"
            >
              <div className="relative w-full max-w-[380px] aspect-square rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
                <Image
                  src="/swapnil_hero.png"
                  alt="Swapnil Shiwalay - Digital Ecosystem Architect"
                  fill
                  sizes="(max-w-768px) 100vw, 380px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 via-transparent to-transparent" />
              </div>

              {/* Floating cards */}
              <div className="absolute -top-4 -left-4 glass-panel bg-white/80 dark:bg-slate-900/60 rounded-2xl p-3 border border-slate-200 dark:border-slate-800 shadow-md hidden sm:block">
                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-450">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Ecosystem Architect
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 glass-panel bg-white/80 dark:bg-slate-900/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-md hidden sm:block">
                <p className="text-indigo-600 dark:text-indigo-400 font-bold text-lg leading-none">20+ Years</p>
                <p className="text-slate-455 dark:text-slate-400 text-[10px] uppercase tracking-wider font-semibold mt-1">Systems Advisory</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. TRUST & AUTHORITY SECTION */}
      <section className="bg-white dark:bg-slate-900/40 py-12 border-y border-slate-200 dark:border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center border-b border-slate-200 dark:border-slate-800 pb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
                  <span className="text-indigo-600 dark:text-indigo-450">{stat.value.replace("+", "")}</span>
                  {stat.value.includes("+") && <span className="text-indigo-600 dark:text-indigo-450">+</span>}
                </p>
                <p className="text-xs sm:text-sm font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Client Logos Container */}
          <div className="pt-8 text-center space-y-4">
            <p className="text-[10px] sm:text-xs font-bold text-slate-455 dark:text-slate-500 uppercase tracking-widest">
              Trusted by Experts, Consultants & Business Leaders
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16 opacity-65 dark:opacity-45">
              {trustLogos.map((logo, idx) => (
                <span key={idx} className="text-slate-800 dark:text-white text-sm sm:text-base font-semibold font-display tracking-widest uppercase">
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE PROBLEM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase tracking-widest text-rose-500 font-bold flex items-center justify-center gap-1.5">
            <AlertTriangle className="h-4 w-4" /> The Invisible Expert trap
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display gold-gradient-text pb-1">
            Why Most Experts Stay Invisible & Underpaid
          </h2>
          <p className="text-slate-550 dark:text-slate-400 text-sm sm:text-base leading-relaxed font-light">
            High-value experts are often trapped in manual operations and pricing wars. Without structured systems, you stay dependent on referrals and hit growth barriers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {invisibleFactors.map((factor, idx) => {
            const Icon = factor.icon;
            return (
              <div
                key={idx}
                className="glass-panel border-slate-200 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/30 rounded-3xl p-5 space-y-4 shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-10 w-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-white font-semibold text-base leading-snug">{factor.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-light leading-relaxed">{factor.consequence}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. ECOSYSTEM FRAMEWORK SECTION */}
      <section id="framework" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative scroll-mt-24 w-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 relative z-10">
          <span className="text-xs uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">
            The Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display gold-gradient-text pb-1">
            The Digital Business Ecosystem Flow
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed font-light">
            Instead of loose marketing tactics, build an integrated, compounding pipeline: Audience → Content → Authority → Lead Gen → Automation → Conversion → Community → Scale.
          </p>
        </div>

        <div className="relative z-10 w-full overflow-x-auto">
          <InteractiveEcosystem />
        </div>
      </section>

      {/* 5. DIAGNOSTIC INTERACTIVE CALCULATOR */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <EcosystemCalculator />
      </section>

      {/* 6. BEFORE VS AFTER COMPARISON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="glass-panel border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 rounded-3xl p-6 sm:p-10 shadow-lg">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <span className="text-xs uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">
              The Shift
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display gold-gradient-text pb-1">
              Ecosystem Business Transformation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
            {/* Before (Left) */}
            <div className="space-y-4 pb-6 md:pb-0 md:pr-8 text-left">
              <h4 className="text-rose-500 font-bold text-sm sm:text-base uppercase tracking-wider flex items-center gap-1.5 justify-center sm:justify-start">
                <AlertTriangle className="h-4 w-4" /> Before: Time-Trapped Expert
              </h4>
              <ul className="space-y-3">
                {beforeAfter.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-light">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0 mt-2" />
                    {item.before}
                  </li>
                ))}
              </ul>
            </div>

            {/* After (Right) */}
            <div className="space-y-4 pt-6 md:pt-0 md:pl-8 text-left">
              <h4 className="text-emerald-500 font-bold text-sm sm:text-base uppercase tracking-wider flex items-center gap-1.5 justify-center sm:justify-start">
                <CheckCircle className="h-4 w-4" /> After: Scalable Ecosystem Architect
              </h4>
              <ul className="space-y-3">
                {beforeAfter.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-slate-800 dark:text-slate-205 text-xs sm:text-sm font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                    {item.after}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">
            Advisory Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display gold-gradient-text pb-1">
            Ecosystem Systems We Design
          </h2>
          <p className="text-slate-550 dark:text-slate-400 text-sm sm:text-base leading-relaxed font-light">
            We strategy-map, custom-develop, and automate your entire client acquisition and operations flow. Custom engineered, zero cookie-cutter templates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCards.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="glass-panel border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 rounded-3xl p-6 flex flex-col space-y-4 relative group justify-between shadow-2xs hover:shadow-md transition-all duration-300"
              >
                <div className="space-y-4 text-left">
                  <div className="h-12 w-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600/20 transition-all duration-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-wide">{service.title}</h3>
                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Problem Solved</p>
                    <p className="text-slate-555 dark:text-slate-400 text-xs sm:text-sm font-light leading-relaxed">{service.problem}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-indigo-600 dark:text-indigo-400 text-xs uppercase tracking-wider font-semibold">Outcome</p>
                    <p className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed">{service.outcome}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 text-left">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider hover:text-indigo-800 dark:hover:text-white transition-colors"
                  >
                    Learn Design Process
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. CASE STUDIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">
            Real Transformations
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display gold-gradient-text pb-1">
            Ecosystem Case Studies
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {caseStories.map((story, idx) => (
            <div
              key={idx}
              className="glass-panel border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden shadow-lg text-left"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-full blur-2xl -z-10" />

              <div className="space-y-4">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">{story.title}</h3>
                    <p className="text-slate-500 text-xs mt-0.5">{story.subtitle}</p>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded">
                    Case Study
                  </span>
                </div>

                <div className="space-y-4 pt-1">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block mb-1">
                      The Challenge
                    </span>
                    <p className="text-slate-555 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-light">{story.challenge}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block mb-1">
                      The Strategy
                    </span>
                    <p className="text-slate-555 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-light">{story.strategy}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block mb-1">
                      The Execution
                    </span>
                    <p className="text-slate-555 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-light">{story.execution}</p>
                  </div>
                  <div className="p-3.5 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/30 rounded-xl">
                    <span className="text-[10px] text-indigo-600 dark:text-indigo-400 uppercase tracking-wider font-bold block mb-0.5">
                      Business Outcome
                    </span>
                    <p className="text-indigo-700 dark:text-indigo-300 text-sm font-semibold italic">
                      &ldquo;{story.outcome}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. THOUGHT LEADERSHIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">
            Knowledge Moat
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display gold-gradient-text pb-1">
            Authority & Systems Assets
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {knowledgeHub.map((kh, idx) => (
            <div
              key={idx}
              className="glass-panel border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 rounded-3xl p-5 space-y-4 shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-left"
            >
              <div className="flex justify-between items-center">
                <span className="px-2 py-0.5 bg-indigo-600/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold rounded uppercase tracking-wider">
                  {kh.type}
                </span>
                <span className="text-slate-455 dark:text-slate-500 text-[10px] font-semibold">Available Free</span>
              </div>
              <h3 className="text-white font-bold text-base sm:text-lg">{kh.title}</h3>
              <p className="text-slate-550 dark:text-slate-400 text-xs sm:text-sm font-light leading-relaxed">{kh.desc}</p>
              <div className="pt-2">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider hover:text-indigo-800 dark:hover:text-white transition-colors"
                >
                  Access Asset
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9.5 TESTIMONIALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">
            Advisory Endorsements
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display gold-gradient-text pb-1">
            What Founders & Experts Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((test) => (
            <div key={test.id} className="glass-panel border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 rounded-3xl p-6 sm:p-8 space-y-4 relative overflow-hidden shadow-md text-left">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-600/5 rounded-full blur-xl -z-10" />
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <h4 className="text-white text-base font-bold font-display">{test.name}</h4>
                  <p className="text-slate-500 text-xs">{test.role}</p>
                </div>
                <div className="flex text-amber-500">
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-slate-550 dark:text-slate-300 text-xs sm:text-sm leading-relaxed italic font-light">
                &ldquo;{test.content}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 10. FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">
            Objections Addressed
          </span>
          <h2 className="text-3xl font-bold font-display gold-gradient-text pb-1">Frequently Asked Questions</h2>
        </div>
        <FaqAccordion />
      </section>

      {/* 11. NEWSLETTER */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="glass-panel border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center space-y-6 shadow-lg">
          <div className="absolute top-0 left-0 w-48 h-48 bg-indigo-600/5 rounded-full blur-2xl pointer-events-none -z-10" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="space-y-3 relative z-10 text-center">
            <span className="text-xs uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">
              System Publication
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display gold-gradient-text pb-1">
              Join Humans of Internet
            </h2>
            <p className="text-slate-550 dark:text-slate-350 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-light">
              Weekly insights read by 10,000+ digital advisors. Dive deep into **AI operations middleware**, **proprietary framework packaging**, and **high-ticket community retention**.
            </p>
          </div>

          {!newsletterSubbed ? (
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 relative z-10">
              <input
                type="text"
                placeholder="First Name"
                value={newsletterName}
                onChange={(e) => setNewsletterName(e.target.value)}
                required
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-600 transition-all"
              />
              <input
                type="email"
                placeholder="Business Email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-600 transition-all"
              />
              <button
                type="submit"
                className="w-full sm:w-auto h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all cursor-pointer flex items-center justify-center text-xs uppercase tracking-widest shadow-xs px-6"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <div className="max-w-md mx-auto p-4 bg-white dark:bg-slate-950 border border-emerald-500/30 rounded-xl text-center animate-fade-in relative z-10">
              <p className="text-emerald-600 dark:text-emerald-450 font-bold text-sm">Thanks for joining Humans of Internet!</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Check your inbox for the welcome briefing.</p>
            </div>
          )}

          <p className="text-slate-400 text-xs relative z-10 flex items-center justify-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-500" /> 100% private data policy. No spam. One-click unsubscribe.
          </p>
        </div>
      </section>
    </div>
  );
}
