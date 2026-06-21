"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Send, Shield, Calendar, Sparkles } from "lucide-react";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const level = searchParams.get("level");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    businessType: "",
    monthlyRevenue: "",
    challenge: "",
    message: "",
  });

  useEffect(() => {
    if (level === "l1") {
      setFormData((prev) => ({
        ...prev,
        message: prev.message || "Applying for L1 Course: Conceptual building blocks of Digital Business (Rs. 4999, includes 6 foundational courses).",
      }));
    } else if (level === "l2") {
      setFormData((prev) => ({
        ...prev,
        message: prev.message || "Applying for L2 Course: Systems Training of Digital Business.",
      }));
    } else if (level === "l3") {
      setFormData((prev) => ({
        ...prev,
        message: prev.message || "Applying for L3 Tier: Live Quantum Group (Qualified Users - Weekly Mastermind session inquiry).",
      }));
    }
  }, [level]);

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const businessTypes = [
    { label: "Coach / Consultant / Speaker", value: "coach_consultant" },
    { label: "Subject Matter Expert / Trainer", value: "expert" },
    { label: "CEO / Business Owner", value: "ceo_owner" },
    { label: "Startup Founder", value: "founder" },
    { label: "Other", value: "other" },
  ];

  const revenues = [
    { label: "Less than ₹100,000 / month (Under $1.2k)", value: "under_100k" },
    { label: "₹100,000 - ₹500,000 / month ($1.2k - $6k)", value: "100k_500k" },
    { label: "₹500,000 - ₹2,000,000 / month ($6k - $24k)", value: "500k_2m" },
    { label: "₹2,000,000+ / month ($24k+)", value: "above_2m" },
  ];

  const challenges = [
    { label: "Inconsistent Lead Generation", value: "inconsistent_leads" },
    { label: "No Automated Marketing/Sales Funnels", value: "no_automation" },
    { label: "Lack of Authority & Content Distribution", value: "no_authority" },
    { label: "Difficulty Scaling Beyond Referrals", value: "scaling" },
    { label: "Other", value: "other" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Create lead object matching CRM structure
    const newLead = {
      id: "lead_" + Date.now(),
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      businessType: formData.businessType || "Other",
      monthlyRevenue: formData.monthlyRevenue || "100k_500k",
      challenge: formData.challenge || "Other",
      notes: formData.message || "Strategy session qualifying inquiry.",
      status: "New" as const,
      source: "Strategy Session Form",
      date: new Date().toISOString().split("T")[0],
    };

    try {
      const saved = localStorage.getItem("crm_leads_data");
      const currentLeads = saved ? JSON.parse(saved) : [];
      localStorage.setItem("crm_leads_data", JSON.stringify([newLead, ...currentLeads]));
    } catch (err) {
      // Error recovery
    }

    // Dismiss exit popup
    sessionStorage.setItem("exit_intent_dismissed", "true");

    // Update GOS visitor profile
    const savedProfile = localStorage.getItem("gos_visitor_profile");
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        profile.strategyCallBooked = true;
        profile.name = formData.name;
        profile.email = formData.email;
        profile.score = Math.max(profile.score || 0, 80) + 40;
        profile.tier = "Customer";
        localStorage.setItem("gos_visitor_profile", JSON.stringify(profile));
        
        const event = new CustomEvent("gos_profile_updated", { detail: profile });
        window.dispatchEvent(event);
      } catch (e) {}
    }

    // Mock API submission simulation
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  if (status === "success") {
    return (
      <div className="glass-panel border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-6 animate-fade-in shadow-lg">
        <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-450">
          <CheckCircle className="h-8 w-8" />
        </div>
        <div className="space-y-2 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display">
            Application Received!
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed font-light">
            Thank you, <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{formData.name}</span>. Swapnil&apos;s team is currently reviewing your business profiles to qualify the session.
          </p>
        </div>
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-5 text-left max-w-md w-full space-y-3">
          <div className="flex items-start gap-2.5">
            <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-slate-900 dark:text-white text-xs font-semibold uppercase tracking-wider">Next Step</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 leading-normal">
                Check your email inbox or WhatsApp (at <span className="text-indigo-600 dark:text-indigo-400 font-medium">{formData.mobile}</span>) for the priority scheduler link to book your exact time slot within 12 hours.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-slate-900 dark:text-white text-xs font-semibold uppercase tracking-wider">Preparation</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 leading-normal">
                To prepare for your call, we highly recommend downloading our free <a href="/resources" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Business Growth Checklist</a>.
              </p>
            </div>
          </div>
        </div>
        <p className="text-slate-400 text-xs flex items-center gap-1.5 justify-center">
          <Shield className="h-4 w-4 text-slate-500" /> Secure, 100% confidential data policy
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 rounded-3xl p-6 sm:p-10 space-y-6 relative overflow-hidden text-left shadow-lg">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="border-b border-slate-200 dark:border-slate-800/85 pb-5 mb-4">
        <h3 className="text-2xl font-bold font-display text-white">Apply for a Strategy Session</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 leading-relaxed font-light">
          Due to high volume and Swapnil&apos;s active advisory schedule, sessions are reserved for qualified leaders. Fill out the qualifiers below to unlock the booking system.
        </p>
      </div>

      {level && (
        <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-xl p-4 flex items-start gap-3 text-left animate-fade-in">
          <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider font-display">
              {level === "l1" && "Selected: Level 1 — Conceptual Building Blocks (Rs. 4,999)"}
              {level === "l2" && "Selected: Level 2 — Systems Training of Digital Business"}
              {level === "l3" && "Selected: Level 3 — Live Quantum Group & Mastermind"}
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 leading-relaxed font-light">
              {level === "l1" && "Your application qualifies you to purchase the L1 Course (Conceptual Building Blocks of Digital Business) with 6 comprehensive courses."}
              {level === "l2" && "Our team will evaluate your business structures for L2 Course (Systems Training of Digital Business)."}
              {level === "l3" && "Strictly reserved for qualified users. L3 members are eligible to attend our weekly live mastermind calls."}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-xs font-semibold text-slate-500 dark:text-slate-450 uppercase tracking-wider">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Dr. John Doe"
            className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all text-sm"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-semibold text-slate-500 dark:text-slate-450 uppercase tracking-wider">
            Business Email <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. john@business.com"
            className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all text-sm"
          />
        </div>
      </div>

      {/* Mobile */}
      <div className="space-y-1.5">
        <label htmlFor="mobile" className="text-xs font-semibold text-slate-500 dark:text-slate-450 uppercase tracking-wider">
          Mobile / WhatsApp Number <span className="text-rose-500">*</span>
        </label>
        <input
          type="tel"
          id="mobile"
          name="mobile"
          required
          value={formData.mobile}
          onChange={handleChange}
          placeholder="e.g. +91 98765 43210"
          className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all text-sm"
        />
      </div>

      {/* Business Type */}
      <div className="space-y-1.5">
        <label htmlFor="businessType" className="text-xs font-semibold text-slate-500 dark:text-slate-450 uppercase tracking-wider">
          Which best describes you? <span className="text-rose-500">*</span>
        </label>
        <select
          id="businessType"
          name="businessType"
          required
          value={formData.businessType}
          onChange={handleChange}
          className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all text-sm cursor-pointer"
        >
          <option value="" disabled className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white">Select your profile</option>
          {businessTypes.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Monthly Revenue */}
      <div className="space-y-1.5">
        <label htmlFor="monthlyRevenue" className="text-xs font-semibold text-slate-500 dark:text-slate-450 uppercase tracking-wider">
          Current Monthly Business Revenue <span className="text-rose-500">*</span>
        </label>
        <select
          id="monthlyRevenue"
          name="monthlyRevenue"
          required
          value={formData.monthlyRevenue}
          onChange={handleChange}
          className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all text-sm cursor-pointer"
        >
          <option value="" disabled className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white">Select your revenue range</option>
          {revenues.map((opt, index) => (
            <option key={index} value={opt.value} className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Main Challenge */}
      <div className="space-y-1.5">
        <label htmlFor="challenge" className="text-xs font-semibold text-slate-500 dark:text-slate-450 uppercase tracking-wider">
          Main Business Bottleneck / Challenge <span className="text-rose-500">*</span>
        </label>
        <select
          id="challenge"
          name="challenge"
          required
          value={formData.challenge}
          onChange={handleChange}
          className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all text-sm cursor-pointer"
        >
          <option value="" disabled className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white">Select your primary challenge</option>
          {challenges.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Text message */}
      <div className="space-y-1.5">
        <label htmlFor="message" className="text-xs font-semibold text-slate-500 dark:text-slate-450 uppercase tracking-wider">
          Additional Context (Optional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us briefly about your business, website URL, or key goals..."
          className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all text-sm resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all cursor-pointer flex items-center justify-center text-xs uppercase tracking-widest shadow-xs disabled:opacity-50 mt-4"
      >
        <span className="flex items-center gap-2">
          {status === "submitting" ? "Qualifying Application..." : "Submit Application & Book Call"}
          <Send className="h-4 w-4 ml-2" />
        </span>
      </button>

      <div className="flex items-center justify-center gap-1.5 text-xs text-slate-550 pt-2 border-t border-slate-200 dark:border-slate-800/80">
        <Shield className="h-4 w-4 text-slate-405" /> 100% Secure & Confidential
      </div>
    </form>
  );
}
