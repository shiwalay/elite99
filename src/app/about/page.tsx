import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Compass, Shield, Lightbulb, Star, ShieldCheck, Heart, User } from "lucide-react";

export default function AboutPage() {
  const narrativeSteps = [
    {
      label: "The Beginning",
      title: "2002: Coding CSS in the Web 1.0 Era",
      desc: "Swapnil's journey started back when the internet was a collection of static text pages. Coding layouts by hand, he learned the baseline dynamics of digital consumer attention. He realized early on that the internet was not a trend—it was the future foundation of business.",
    },
    {
      label: "The Challenges",
      title: "Building Agencies & Chasing Scale",
      desc: "By 2008, he had expanded creative tech teams and founded agencies, delivering over 500+ web portals. But with growth came massive operational friction. The business was highly dependent on manual coordination, client negotiations, and cold outbound outreach.",
    },
    {
      label: "The Failures",
      title: "Systems That Crushed My Freedom",
      desc: "For years, Swapnil built what looked like successful agencies from the outside. But internally, the model was broken. It was a referral trap. When referrals stopped, revenue crashed. When referrals surged, delivery workload became overwhelming. He was trading his life force for linear growth.",
    },
    {
      label: "The Learnings",
      title: "Ecosystems Beat Ad-Hoc Marketing",
      desc: "Through these trials, he uncovered a fundamental truth: loose marketing campaigns (ads, random posts) are temporary band-aids. To scale predictably, you need a compounding digital ecosystem. Every digital asset—from search profiles to automation triggers—must link together into a single pipeline.",
    },
    {
      label: "The Transformation",
      title: "Becoming the Digital Business Architect",
      desc: "Swapnil shifted his focus from custom web design to systems architecture. By merging personal authority branding with low-code middleware and AI integrations, he designed the 'Digital Business Ecosystem Framework'. This turned manual, time-trapped experts into leveraged category authorities.",
    },
  ];

  const values = [
    {
      title: "Extreme Integrity",
      description: "No empty marketing hacks or short-term tricks. We build real, compounding digital assets that you own forever.",
      icon: Shield,
    },
    {
      title: "Simplicity First",
      description: "Complexity stops execution. We streamline your funnels and middleware so they are easy for your team to manage.",
      icon: Compass,
    },
    {
      title: "Conscious Scaling",
      description: "We build systems that give you your freedom back. Growing a business should enrich your life, not consume it.",
      icon: Heart,
    },
    {
      title: "Long-Term Systems",
      description: "We design structures that accumulate value over 5, 10, or 20 years, making referrals a bonus, not a dependency.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="space-y-24 py-12 pb-20 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-indigo-900/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* HEADER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-widest text-indigo-500 font-bold flex items-center gap-1.5">
              <User className="h-4 w-4" /> The Story of the Architect
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold font-display text-white leading-tight">
              An Authentic Journey to <span className="gold-gradient-text">Ecosystem Architecture</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed font-light">
              Swapnil Shiwalay is not a marketer selling advertising packages. He is a systems engineer. For 20+ years, he has deconstructed complex web technologies to help thought leaders build predictable digital assets.
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
              His mission is not to sell you ads, but to construct a self-sustaining client acquisition and operations flow that allows you to focus on your core genius.
            </p>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[360px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl gold-border-gradient">
              <Image
                src="/swapnil_hero.png"
                alt="Swapnil Shiwalay - Systems Architect"
                fill
                sizes="(max-w-768px) 100vw, 360px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030a16] via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* THE STORY TIMELINE */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold">
            Chronology
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display gold-gradient-text pb-1">
            Lessons From 20+ Years in the Trenches
          </h2>
        </div>

        <div className="relative border-l border-slate-800 ml-4 sm:ml-6 md:ml-32 pl-6 sm:pl-8 space-y-12">
          {narrativeSteps.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Step label on the left (hidden on mobile) */}
              <div className="hidden md:block absolute -left-40 top-0 text-right w-28">
                <span className="text-xs uppercase tracking-widest text-[#d4af37]/60 font-bold block">
                  {step.label}
                </span>
              </div>

              {/* Dot on line */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 rounded-full bg-[#030a16] border-2 border-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.4)] group-hover:scale-125 transition-transform duration-300" />

              {/* Narrative card */}
              <div className="glass-panel hover:bg-[#0d1e36]/40 p-6 rounded-xl transition-all duration-300 space-y-2">
                <span className="md:hidden block text-xs uppercase tracking-widest text-[#d4af37] font-bold">
                  {step.label}
                </span>
                <h3 className="text-white font-bold text-lg sm:text-xl tracking-wide font-display">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* THE MISSION */}
      <section className="bg-[#020813] py-16 border-y border-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold">
            The Mission
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display gold-gradient-text pb-1">
            Helping 1 Million Experts Build Systems of Impact & Income
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-light">
            We believe that knowledge is the world&apos;s most valuable asset. Our mission is to provide <strong>1 Million coaches, consultants, trainers, and founders</strong> with the systems architecture needed to share their expertise, reclaim their time, and build high-ticket retainers.
          </p>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold">
            Core Beliefs
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display gold-gradient-text pb-1">
            The Code We Operate By
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <div
                key={idx}
                className="glass-panel hover:border-[#d4af37]/45 rounded-xl p-5 space-y-4 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-10 w-10 rounded-lg bg-[#d4af37]/5 border border-[#d4af37]/15 flex items-center justify-center text-[#d4af37]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-white font-bold text-base leading-snug font-display">{v.title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">{v.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FUTURE OUTLOOK */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel border-[#d4af37]/15 rounded-2xl p-6 sm:p-8 space-y-4 text-center">
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold">
            The Future
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white">AI-Augmented Systems Leadership</h3>
          <p className="text-slate-400 text-sm leading-relaxed font-light max-w-xl mx-auto">
            The future belongs to those who combine deep human expertise with autonomous systems. We are continuously designing templates and AI prompts to ensure our clients lead their respective niches.
          </p>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel border-[#d4af37]/20 rounded-2xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold font-display gold-gradient-text pb-1">
            Ready to Build Your Compounding Digital Asset?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-light">
            Skip the generic agency pitches. Let&apos;s map out your systems architecture in an advisory session.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-[#030a16] bg-gradient-to-r from-[#f3e5ab] to-[#d4af37] rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]"
            >
              Book Advisory Session
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
