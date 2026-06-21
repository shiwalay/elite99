import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  Compass, 
  Shield, 
  Lightbulb, 
  Sparkles, 
  Target, 
  CheckCircle2, 
  User, 
  Heart, 
  Award, 
  ShieldCheck, 
  Flame, 
  BookOpen, 
  Brain, 
  Coins, 
  Globe, 
  Eye, 
  Zap, 
  Quote
} from "lucide-react";

export default function AboutPage() {
  const missionItems = [
    "Discover their unique purpose and expertise.",
    "Build digital-first businesses and personal brands.",
    "Leverage AI, technology, and automation ethically.",
    "Create multiple streams of value and income.",
    "Build communities around transformation and learning.",
    "Preserve and scale ancient wisdom through modern technology.",
    "Generate wealth without compromising values.",
    "Leave a meaningful legacy for future generations."
  ];

  const coreValues = [
    {
      num: "01",
      title: "Truth Before Trends",
      desc: "Seek what is true, not merely what is popular.",
      icon: Eye,
      color: "from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-400"
    },
    {
      num: "02",
      title: "Service Before Self",
      desc: "Real success is measured by the value created for others.",
      icon: Heart,
      color: "from-rose-500/20 to-pink-500/20 border-rose-500/30 text-rose-400"
    },
    {
      num: "03",
      title: "Continuous Learning",
      desc: "Remain a student regardless of achievements.",
      icon: BookOpen,
      color: "from-amber-500/20 to-yellow-500/20 border-amber-500/30 text-amber-400"
    },
    {
      num: "04",
      title: "Conscious Wealth Creation",
      desc: "Wealth is a tool for freedom, contribution, and growth.",
      icon: Coins,
      color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400"
    },
    {
      num: "05",
      title: "Systems Over Shortcuts",
      desc: "Sustainable success comes from strong systems and disciplined execution.",
      icon: Target,
      color: "from-violet-500/20 to-purple-500/20 border-violet-500/30 text-violet-400"
    },
    {
      num: "06",
      title: "Integrity in Action",
      desc: "Align words, decisions, and actions.",
      icon: ShieldCheck,
      color: "from-cyan-500/20 to-sky-500/20 border-cyan-500/30 text-cyan-400"
    },
    {
      num: "07",
      title: "Human-Centric Technology",
      desc: "Use technology and AI to enhance human potential, not replace human values.",
      icon: Brain,
      color: "from-indigo-500/20 to-purple-500/20 border-indigo-500/30 text-indigo-400"
    },
    {
      num: "08",
      title: "Long-Term Thinking",
      desc: "Build assets, institutions, and communities that outlive temporary trends.",
      icon: Globe,
      color: "from-teal-500/20 to-emerald-500/20 border-teal-500/30 text-teal-400"
    },
    {
      num: "09",
      title: "Courageous Experimentation",
      desc: "Innovation requires taking calculated risks and learning from failure.",
      icon: Zap,
      color: "from-orange-500/20 to-amber-500/20 border-orange-500/30 text-orange-450"
    },
    {
      num: "10",
      title: "Spiritual Growth",
      desc: "Outer success is incomplete without inner evolution and self-awareness.",
      icon: Sparkles,
      color: "from-fuchsia-500/20 to-purple-500/20 border-fuchsia-500/30 text-fuchsia-400"
    }
  ];

  return (
    <div className="space-y-24 py-12 pb-20 relative overflow-hidden bg-slate-950 text-slate-100">
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-indigo-650/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-purple-950/10 rounded-full blur-[150px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold flex items-center gap-2">
              <User className="h-4 w-4 text-indigo-455 animate-pulse" /> Personal Purpose & Mission
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white leading-tight">
              Swapnil Shiwalay
            </h1>
            <div className="border-l-4 border-indigo-500/50 pl-4 space-y-4">
              <p className="text-slate-200 text-lg sm:text-xl leading-relaxed font-medium">
                To help individuals, experts, coaches, healers, educators, and conscious entrepreneurs unlock their highest potential by integrating wisdom, technology, systems, and digital leverage to create meaningful impact, prosperity, and transformation.
              </p>
            </div>
            <p className="text-slate-400 text-base leading-relaxed font-light">
              I believe that every human being possesses unique knowledge, experience, and gifts that can serve humanity. My purpose is to help people discover, package, scale, and share that value with the world.
            </p>
          </div>

          <div className="lg:col-span-5 flex justify-center">
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
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800/80 text-center">
                <span className="text-xs font-mono font-bold text-indigo-400">DIGITAL BUSINESS ARCHITECT</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISION & MISSION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Vision card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-3xl border border-slate-800 bg-slate-900/10 backdrop-blur-xs relative overflow-hidden group hover:border-indigo-500/20 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-550/5 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-550/10 transition-colors" />
            <div className="space-y-6">
              <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Compass className="h-5 w-5" />
              </div>
              <h2 className="text-3xl font-bold font-display text-white tracking-wide">Vision</h2>
              <div className="space-y-4 text-slate-300 font-light leading-relaxed text-sm sm:text-base">
                <p>
                  To build a global ecosystem that empowers millions of people to transform their knowledge, experience, and wisdom into scalable digital assets, thriving communities, and sustainable businesses that create both wealth and positive social impact.
                </p>
                <p>
                  To become a catalyst for a new generation of conscious creators, educators, and leaders who use technology and timeless wisdom to elevate human potential.
                </p>
              </div>
            </div>
            <div className="pt-8 border-t border-slate-900/60 mt-8 flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <span>Future Oriented</span> &bull; <span>Wisdom & Scaling</span>
            </div>
          </div>

          {/* Mission list */}
          <div className="lg:col-span-7 p-8 rounded-3xl border border-slate-800 bg-slate-900/10 backdrop-blur-xs relative overflow-hidden group hover:border-emerald-500/15 transition-all duration-300">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-6">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Target className="h-5 w-5" />
              </div>
              <h2 className="text-3xl font-bold font-display text-white tracking-wide">Mission</h2>
              <p className="text-slate-400 text-sm font-light">
                My mission is to create systems, platforms, communities, and educational frameworks that help people:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {missionItems.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start text-xs text-slate-300">
                    <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-light">{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed border-t border-slate-900/60 pt-4 mt-6">
                Through education, consulting, technology, content, and community building, I aim to impact millions of lives over the next two decades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">
            The Code of the Seeker
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            Core Values
          </h2>
          <p className="text-slate-400 text-sm font-light max-w-lg mx-auto">
            These guiding principles form the operational bedrock of our architecture and consulting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl border border-slate-800 bg-slate-900/5 hover:bg-slate-900/20 transition-all duration-300 hover:-translate-y-1 relative group hover:border-slate-705"
              >
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div className={`h-10 w-10 rounded-xl bg-slate-900 border flex items-center justify-center transition-colors group-hover:scale-105 duration-300 bg-gradient-to-br ${val.color}`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-3xl font-bold font-mono text-slate-800 group-hover:text-slate-750 transition-colors pointer-events-none select-none">
                    {val.num}
                  </span>
                </div>
                <h3 className="text-white font-bold text-base leading-snug font-display mb-2">{val.title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* LIFE PHILOSOPHY MANIFESTO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl border border-slate-800 bg-slate-900/10 backdrop-blur-md p-8 sm:p-16 text-center overflow-hidden group">
          {/* Subtle decorative glow in center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-3xl mx-auto space-y-8 relative z-10">
            <div className="inline-flex h-10 w-10 rounded-full bg-slate-950 border border-slate-850 items-center justify-center text-indigo-400 mb-2">
              <Quote className="h-4 w-4" />
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white tracking-wide uppercase">
              Life Philosophy
            </h2>

            <div className="space-y-6 text-slate-200 text-lg sm:text-xl lg:text-2xl font-light italic font-serif leading-relaxed">
              <p>
                &ldquo;Build with the mind of a strategist.&rdquo;
              </p>
              <p>
                &ldquo;Serve with the heart of a teacher.&rdquo;
              </p>
              <p>
                &ldquo;Learn with the curiosity of a student.&rdquo;
              </p>
              <p>
                &ldquo;Lead with the wisdom of a seeker.&rdquo;
              </p>
            </div>

            <div className="py-4 flex items-center justify-center gap-6">
              <div className="h-[1px] w-12 bg-slate-800" />
              <div className="flex gap-2">
                <span className="text-[10px] font-mono tracking-widest text-[#d4af37] font-bold uppercase">Wealth</span>
                <span className="text-[10px] font-mono tracking-widest text-slate-500">&bull;</span>
                <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-bold uppercase">Impact</span>
                <span className="text-[10px] font-mono tracking-widest text-slate-500">&bull;</span>
                <span className="text-[10px] font-mono tracking-widest text-indigo-400 font-bold uppercase">Legacy</span>
              </div>
              <div className="h-[1px] w-12 bg-slate-800" />
            </div>

            <p className="text-slate-350 text-base sm:text-lg font-light leading-relaxed max-w-xl mx-auto">
              And leave the world better than you found it.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel border-indigo-500/20 rounded-3xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-50" />
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-wide relative z-10">
            Let&apos;s Architect Your Digital Asset
          </h2>
          <p className="text-slate-450 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-light relative z-10">
            Align your custom expertise with compounding middleware, ethical AI automation, and authority positioning.
          </p>
          <div className="pt-2 relative z-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-indigo-400 to-indigo-300 hover:from-indigo-300 hover:to-indigo-200 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-950/20 hover:-translate-y-0.5"
            >
              Get In Touch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
