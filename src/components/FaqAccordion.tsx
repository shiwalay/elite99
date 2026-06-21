"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<FaqItem[]>([
    {
      question: "What exactly is a 'Digital Business Ecosystem'?",
      answer: "Unlike standalone marketing campaigns, a Digital Business Ecosystem is a fully integrated asset model. It connects your personal authority branding directly with automated lead qualification filters (middleward triggers) and customer retention portals (community platforms). It ensures that every visitor is nurtured, qualified, and routed automatically, letting your business scale without requiring linear labor.",
    },
    {
      question: "How is this different from hiring a typical marketing agency?",
      answer: "Marketing agencies focus on vanity metrics like clicks and impressions, usually requiring high monthly ad spends and offering cookie-cutter template designs. As a Digital Business Architect, Swapnil focuses on operational systems design. We write custom code, program custom AI agents, and build proprietary frameworks that you own forever. We engineer the structural asset, not just rent attention.",
    },
    {
      question: "Who is this framework designed for?",
      answer: "The framework is engineered for subject-matter leaders: High-ticket Coaches, Consultants, Authors, Trainers, Speakers, CEOs, Doctors, Educators, and Startup Founders who are already generating revenue but want to break past plateaus, stop trading hours for money, and automate their admin overhead.",
    },
    {
      question: "What is the typical timeframe to see results?",
      answer: "Most advisory clients establish their signature frameworks and initial qualification funnels within 30 to 45 days. Complete systems builds—including custom AI triage agents and private community portals—typically take 60 to 90 days. The outcome is a compounding asset that saves 15+ hours weekly and elevates client contract value.",
    },
    {
      question: "Do I need to be tech-savvy to manage the ecosystem?",
      answer: "No. The system is designed to remove tech complexity, not increase it. We build using clean, stable middleware (Make.com, Zapier, active CRMs) and hand over clear operating templates. The automations handle the heavy lifting, leaving you to focus strictly on advisory delivery.",
    },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem("website_cms_copy");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.faqs && parsed.faqs.length > 0) {
          setFaqs(parsed.faqs);
        }
      } catch (e) {
        // Fallback
      }
    }
  }, []);

  const handleToggle = (idx: number) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <div className="w-full space-y-4">
      {faqs.map((faq, idx) => {
        const isOpen = activeIndex === idx;
        return (
          <div
            key={idx}
            className={`glass-panel rounded-xl transition-all duration-300 overflow-hidden ${
              isOpen ? "border-[#d4af37]/35 bg-[#0d1e36]/40" : "border-slate-800"
            }`}
          >
            <button
              onClick={() => handleToggle(idx)}
              className="w-full flex items-center justify-between p-5 text-left text-white font-semibold text-sm sm:text-base cursor-pointer hover:text-[#d4af37] transition-colors"
            >
              <span className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-[#d4af37] shrink-0" />
                {faq.question}
              </span>
              {isOpen ? (
                <ChevronUp className="h-5 w-5 text-[#d4af37] shrink-0" />
              ) : (
                <ChevronDown className="h-5 w-5 text-slate-500 shrink-0" />
              )}
            </button>

            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? "max-h-60 border-t border-slate-900" : "max-h-0"
              }`}
            >
              <p className="p-5 text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
