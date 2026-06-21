"use client";

import { useState } from "react";
import { Calculator, Award, Cpu, TrendingUp, AlertTriangle, ArrowRight, ShieldCheck } from "lucide-react";

interface Question {
  id: string;
  text: string;
  category: string;
  options: { label: string; value: number; explanation: string }[];
}

export default function EcosystemCalculator() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [step, setStep] = useState(0);
  const [isCalculated, setIsCalculated] = useState(false);

  const questions: Question[] = [
    {
      id: "leads",
      text: "How predictable is your monthly inbound qualified lead flow?",
      category: "Acquisition",
      options: [
        { label: "1 - Purely dependent on referrals; highly unpredictable", value: 1, explanation: "Referral trap: No direct client acquisition assets." },
        { label: "3 - Some leads from organic posts; inconsistent month-to-month", value: 3, explanation: "Inconsistent audience: No repeatable lead capture funnel." },
        { label: "5 - Predictable inbound applications; calendar consistently full", value: 5, explanation: "Scalable acquisition: Lead pipelines are optimized." },
      ],
    },
    {
      id: "authority",
      text: "How is your personal authority structured and positioned online?",
      category: "Authority",
      options: [
        { label: "1 - Competitors copy generic posts; clients negotiate on price", value: 1, explanation: "Commoditised: Lacks unique framework packaging." },
        { label: "3 - Recognized locally; some guides/assets exist", value: 3, explanation: "Emerging authority: Needs structured IP assets." },
        { label: "5 - Category King; proprietary framework is highly sought after", value: 5, explanation: "Monopoly brand: Pre-framed as the default expert." },
      ],
    },
    {
      id: "automation",
      text: "How much administrative manual labor do you perform weekly?",
      category: "Automation",
      options: [
        { label: "1 - Exhausted; spend 15+ hours on scheduling, routing, & qualify", value: 1, explanation: "Manual bottleneck: No operations middleware." },
        { label: "3 - Use basic calendar bookers but do manual qualification", value: 3, explanation: "Semi-automated: Lacks smart AI triage filters." },
        { label: "5 - Zero admin; AI middleware handles pre-qualify and routing", value: 5, explanation: "Autonomous: Custom operations middleware runs 24/7." },
      ],
    },
    {
      id: "content",
      text: "What is your content distribution system?",
      category: "Content",
      options: [
        { label: "1 - Randomly posting when inspired; no distribution system", value: 1, explanation: "Ad-hoc posting: High-effort, low return." },
        { label: "3 - Post consistently on one platform (e.g. LinkedIn)", value: 3, explanation: "Single-channel vulnerability: Subject to algorithm changes." },
        { label: "5 - Multi-channel distribution: 1 core asset split across 5 platforms via AI", value: 5, explanation: "Leveraged engine: Compounding organic search footprint." },
      ],
    },
    {
      id: "retention",
      text: "How are your client delivery and retention structures packaged?",
      category: "Retention",
      options: [
        { label: "1 - Selling hourly consulting; high client churn rates", value: 1, explanation: "Trading time: Low customer lifetime value (LTV)." },
        { label: "3 - Sell group coaching programs but lacks group interaction assets", value: 3, explanation: "Standard course: Lacks community retention loops." },
        { label: "5 - Retained in a premium community container and mastermind tier", value: 5, explanation: "Ecosystem moat: High NPS, compounding lifetime value." },
      ],
    },
  ];

  const handleSelectOption = (value: number) => {
    const currentQuestionId = questions[step].id;
    setAnswers((prev) => ({ ...prev, [currentQuestionId]: value }));

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setIsCalculated(true);
    }
  };

  const resetCalculator = () => {
    setAnswers({});
    setStep(0);
    setIsCalculated(false);
  };

  // Score calculation
  const totalScore = Object.values(answers).reduce((acc, curr) => acc + curr, 0);
  const maxScore = questions.length * 5;
  const percentage = Math.round((totalScore / maxScore) * 100);

  // Identify Bottleneck
  let lowestCategory = "Acquisition";
  let lowestScore = 5;
  Object.entries(answers).forEach(([key, val]) => {
    if (val < lowestScore) {
      lowestScore = val;
      const q = questions.find((ques) => ques.id === key);
      if (q) lowestCategory = q.category;
    }
  });

  const bottleneckSolutions: Record<string, { title: string; desc: string }> = {
    Acquisition: {
      title: "Unpredictable Lead Squeeze",
      desc: "Your primary bottleneck is lead acquisition. You rely on word-of-mouth. Solution: Build a value-first 15-minute qualification funnel that converts cold traffic into pre-sold bookings.",
    },
    Authority: {
      title: "Commoditised Brand Positioning",
      desc: "You compete on price. Solution: Extract your knowledge into a named signature framework, restructure your website layout into a premium consulting portal, and release a core lead guide.",
    },
    Automation: {
      title: "Administrative Time Drain",
      desc: "You are stuck in low-value work. Solution: Deploy Make.com/Zapier triggers, Calendly routing, and AI auto-responders to run triage and routing.",
    },
    Content: {
      title: "Ad-Hoc Content Engine",
      desc: "Your organic content is high-friction and single-channel. Solution: Implement an AI-powered distribution script that splits a single weekly podcast or long-form post into 5 platform formats.",
    },
    Retention: {
      title: "High Client Churn / Time Exchange",
      desc: "Your business models scale linearly with labor. Solution: restructue 1-on-1 programs into a premium community portal (e.g. on Skool/Circle) linked to high-ticket masterminds.",
    },
  };

  const solution = bottleneckSolutions[lowestCategory] || bottleneckSolutions["Acquisition"];

  return (
    <div className="glass-panel border-[#d4af37]/20 rounded-2xl p-6 sm:p-10 relative overflow-hidden">
      {/* Background radial details */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#d4af37]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
        <div className="h-10 w-10 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/35 flex items-center justify-center text-[#d4af37]">
          <Calculator className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold font-display text-white">Ecosystem Maturity Diagnostic</h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">Calculate your score and identify structural bottlenecks.</p>
        </div>
      </div>

      {!isCalculated ? (
        /* CALCULATING PROCESS */
        <div className="space-y-6">
          <div className="flex justify-between items-center text-xs text-slate-500 font-semibold uppercase tracking-wider">
            <span>Section: {questions[step].category}</span>
            <span>Question {step + 1} of {questions.length}</span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#f3e5ab] to-[#d4af37] transition-all duration-300"
              style={{ width: `${((step + 1) / questions.length) * 100}%` }}
            />
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white leading-snug">
              {questions[step].text}
            </h4>

            <div className="space-y-3 pt-2">
              {questions[step].options.map((opt, oIdx) => (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(opt.value)}
                  className="w-full text-left bg-[#050e1c]/60 hover:bg-[#0d1e36] border border-slate-800 hover:border-[#d4af37]/40 p-4 rounded-xl transition-all duration-200 group flex items-start gap-3 cursor-pointer"
                >
                  <div className="h-5 w-5 rounded-full border border-slate-700 group-hover:border-[#d4af37] flex items-center justify-center text-[10px] text-white shrink-0 mt-0.5 group-hover:bg-[#d4af37] group-hover:text-navy-dark transition-all">
                    {String.fromCharCode(65 + oIdx)}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold group-hover:text-[#f3e5ab] transition-colors">
                      {opt.label}
                    </p>
                    <p className="text-slate-500 text-xs mt-1 leading-normal group-hover:text-slate-400">
                      {opt.explanation}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* RESULTS SCREEN */
        <div className="space-y-6 animate-fade-in text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-800">
            {/* Score Ring */}
            <div className="relative h-28 w-28 rounded-full border-4 border-slate-800 flex flex-col justify-center items-center shrink-0">
              <span className="text-3xl font-extrabold font-display text-[#d4af37]">{percentage}%</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Maturity</span>
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-bold font-display text-white">Your Diagnostic Report</h4>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                {percentage < 45
                  ? "Structural Vulnerability: Your brand acts as a manual freelancer rather than a compounding digital business. Tech, flow, and delivery need system-building."
                  : percentage < 75
                  ? "Operational Friction: You have active brand and traffic channels, but lacks operations automation and retentive masterminds to break revenue plateaus."
                  : "Leveraged Ecosystem: Outstanding structure. Your systems are optimized. Focus strictly on corporate packaging and paid amplification."}
              </p>
            </div>
          </div>

          {/* Bottleneck Display */}
          <div className="bg-rose-950/15 border border-rose-900/30 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-rose-450 font-semibold text-sm justify-center sm:justify-start">
              <AlertTriangle className="h-5 w-5 shrink-0" />
              <span>Primary Bottleneck: {solution.title}</span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              {solution.desc}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a
              href="/contact"
              className="flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold text-navy-dark bg-gradient-to-r from-[#f3e5ab] to-[#d4af37] rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-[1.02] cursor-pointer font-semibold text-[#030a16]"
            >
              Apply to Fix This Bottleneck
              <ArrowRight className="h-4 w-4" />
            </a>
            <button
              onClick={resetCalculator}
              className="px-6 py-4 text-sm font-medium text-slate-300 hover:text-white bg-transparent border border-slate-800 hover:border-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              Restart Diagnostic
            </button>
          </div>

          <div className="flex items-center gap-1.5 justify-center sm:justify-start text-[10px] text-slate-500 pt-2 border-t border-slate-900">
            <ShieldCheck className="h-4 w-4 text-slate-500" /> Free diagnostic. Results are kept 100% confidential.
          </div>
        </div>
      )}
    </div>
  );
}
