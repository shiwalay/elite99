"use client";

import { useState, useEffect } from "react";
import { X, FileText, Download, CheckCircle, Mail, Shield } from "lucide-react";

export default function ExitIntentModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  useEffect(() => {
    // If user has already dismissed or opted in during this session, do not fire
    const dismissed = sessionStorage.getItem("exit_intent_dismissed");
    if (dismissed) return;

    // Do not fire if they have already filled in a form on the site (making them a lead/customer)
    const profile = localStorage.getItem("gos_visitor_profile");
    if (profile) {
      try {
        const parsed = JSON.parse(profile);
        if (
          parsed.newsletterSubscribed ||
          parsed.strategyCallBooked ||
          parsed.downloadsCount > 0 ||
          parsed.webinarsRegistered
        ) {
          return;
        }
      } catch (err) {}
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // e.clientY < 20 means mouse is moving towards browser tabs/back button
      if (e.clientY < 20) {
        setIsVisible(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("exit_intent_dismissed", "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Update GOS visitor profile
    const savedProfile = localStorage.getItem("gos_visitor_profile");
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        profile.downloadsCount = (profile.downloadsCount || 0) + 1;
        profile.name = name;
        profile.email = email;
        profile.score = (profile.score || 0) + 20; // +20 points
        localStorage.setItem("gos_visitor_profile", JSON.stringify(profile));
        
        const event = new CustomEvent("gos_profile_updated", { detail: profile });
        window.dispatchEvent(event);
      } catch (err) {}
    }

    // Add to subscribers list
    try {
      const savedSubs = localStorage.getItem("gos_newsletter_subs");
      let currentSubs = [];
      if (savedSubs) {
        currentSubs = JSON.parse(savedSubs);
      }
      if (!currentSubs.some((s: any) => s.email === email)) {
        const newSub = {
          email,
          name: name || "Exit Pop-up Lead",
          date: new Date().toISOString().split("T")[0],
          score: 20,
          opens: 1,
          clicks: 1,
          interests: ["Business Growth Checklist"]
        };
        localStorage.setItem("gos_newsletter_subs", JSON.stringify([newSub, ...currentSubs]));
      }
    } catch (err) {}

    setTimeout(() => {
      setStatus("success");
      sessionStorage.setItem("exit_intent_dismissed", "true");

      // Auto-close modal after 2.5 seconds to allow user to read confirmation
      setTimeout(() => {
        setIsVisible(false);
      }, 2500);
    }, 1200);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="glass-panel border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 max-w-md w-full p-8 rounded-3xl space-y-6 relative overflow-hidden animate-fade-in shadow-2xl text-left">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 dark:hover:text-white cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {status !== "success" ? (
          /* OPT-IN FORM */
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <FileText className="h-5 w-5" />
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">
                Exclusive Lead Magnet
              </span>
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">Before You Exit...</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                Grab our free <span className="font-semibold text-slate-900 dark:text-white">Business Growth Checklist</span>—the 25-point systems audit Swapnil Shiwalay uses to locate scaling blockages.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="space-y-1">
                <label htmlFor="exit-name" className="text-xs font-semibold text-slate-500 dark:text-slate-450 uppercase tracking-wider block">
                  First Name
                </label>
                <input
                  type="text"
                  id="exit-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John"
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-600 transition-all text-sm"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="exit-email" className="text-xs font-semibold text-slate-500 dark:text-slate-450 uppercase tracking-wider block">
                  Business Email
                </label>
                <input
                  type="email"
                  id="exit-email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. john@business.com"
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-600 transition-all text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all cursor-pointer flex items-center justify-center text-xs uppercase tracking-widest shadow-xs disabled:opacity-50 mt-4"
              >
                {status === "submitting" ? "Securing Asset..." : "Get Free Checklist"}
                <Download className="h-4 w-4 ml-2" />
              </button>
            </form>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-550 pt-2 border-t border-slate-200 dark:border-slate-800/80">
              <Shield className="h-3.5 w-3.5 text-slate-400" /> 100% Secure. Unsubscribe anytime.
            </div>
          </div>
        ) : (
          /* SUCCESS STATE */
          <div className="text-center space-y-6 pt-2 flex flex-col items-center">
            <div className="h-14 w-14 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-450">
              <CheckCircle className="h-7 w-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">Checklist Unlocked!</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                Thank you, <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{name}</span>. We sent the 25-point audit file to <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{email}</span>.
              </p>
            </div>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert("Download started in mock environment!");
                handleClose();
              }}
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all cursor-pointer flex items-center justify-center text-xs uppercase tracking-widest shadow-xs"
            >
              Download PDF Directly
              <Download className="h-4 w-4 ml-2" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
