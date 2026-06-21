"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Cpu,
  Bookmark,
  FileCode2,
  FileSpreadsheet,
  Download,
  X,
  CheckCircle,
  Shield,
} from "lucide-react";
import { useEcosystemStore } from "@/store/useEcosystemStore";

interface Resource {
  id: string;
  title: string;
  tagline: string;
  description: string;
  fileType: "PDF" | "Notion" | "ZIP" | "Excel" | "Code";
  fileSize: string;
  downloadUrl: string;
  details: string[];
  status: "Published" | "Draft";
  featuredImage?: string;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  PDF: FileText,
  Notion: Bookmark,
  ZIP: FileCode2,
  Excel: FileSpreadsheet,
  Code: Cpu,
};

const defaultResources: Resource[] = [
  {
    id: "growth-checklist",
    title: "Business Growth Checklist",
    tagline: "The 25-point audit to identify scaling bottlenecks.",
    description: "A complete step-by-step audit worksheet used by Swapnil to evaluate a consultant's digital ecosystem stability. Rate your organic traffic, qualification funnels, operations middleware, and retention metrics.",
    fileType: "PDF",
    fileSize: "PDF (2.4 MB)",
    downloadUrl: "/downloads/growth-checklist.pdf",
    details: ["Traffic & Audience channels grading criteria", "Auto-qualification form scoring metric", "Operations & AI integration checks", "Retention & Community engagement list"],
    status: "Published",
    featuredImage: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "ai-tools-guide",
    title: "AI Tools & Middleware Guide",
    tagline: "The software stack to automate your consulting operations.",
    description: "Stop spending hours copy-pasting data. Read this blueprint and discover the low-code software triggers, LLM assistants, and messaging endpoints to run qualification and booking automatically.",
    fileType: "Code",
    fileSize: "PDF (3.8 MB)",
    downloadUrl: "/downloads/ai-tools-guide.pdf",
    details: ["Top Make.com / Zapier trigger scenarios", "Triage prompt library templates", "Calendar automated routing setup", "CRM integration guides"],
    status: "Published",
    featuredImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "brand-blueprint",
    title: "Personal Brand Blueprint",
    tagline: "Unpack and structure your expertise into a proprietary framework.",
    description: "Competing on price is a choice. This guide shows how to extract your experience, package it into a signature named system, and write high-engagement LinkedIn/newsletter copy to draw inbound high-ticket leads.",
    fileType: "Notion",
    fileSize: "PDF (1.9 MB)",
    downloadUrl: "https://notion.so/brand-blueprint-mock",
    details: ["Proprietary framework packaging sheet", "LinkedIn Profile Optimization layouts", "Content distribution scheduling models", "Case study copywriting scripts"],
    status: "Published",
    featuredImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "funnel-templates",
    title: "High-Ticket Funnel Templates",
    tagline: "Squeeze page and qualification page layouts that convert.",
    description: "Get the wireframes and landing page blueprints built to capture leads, pre-educate them via video, and qualify them using strategic forms.",
    fileType: "ZIP",
    fileSize: "ZIP (4.5 MB)",
    downloadUrl: "/downloads/funnel-templates.zip",
    details: ["High-conversion Masterclass registration page", "Qualifying Application Form fields list", "Strategic case studies slider layout", "Post-apply Calendly embed setup"],
    status: "Published",
    featuredImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
  }
];

export default function ResourcesPage() {
  const { user, loginUser } = useEcosystemStore();
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [optedIn, setOptedIn] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("vault_resources_data");
    const resourcesVersion = localStorage.getItem("vault_resources_version");
    const CURRENT_RES_VERSION = "2.2";
    if (saved && resourcesVersion === CURRENT_RES_VERSION) {
      try {
        const parsed = JSON.parse(saved);
        setResources(parsed.filter((r: Resource) => r.status === "Published"));
      } catch (e) {
        setResources(defaultResources);
      }
    } else {
      setResources(defaultResources);
      localStorage.setItem("vault_resources_data", JSON.stringify(defaultResources));
      localStorage.setItem("vault_resources_version", CURRENT_RES_VERSION);
    }
  }, []);

  const handleOpenModal = (res: Resource) => {
    setSelectedResource(res);
    setOptedIn(false);
    setFormData({ name: "", email: "" });
  };

  const handleCloseModal = () => {
    setSelectedResource(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;

    setSubmitting(true);

    // Add download metrics to crm caleb leads statefully
    const newLead = {
      id: "lead_" + Date.now(),
      name: formData.name,
      email: formData.email,
      mobile: "+91 99999 99999",
      businessType: "expert",
      monthlyRevenue: "under_100k",
      challenge: "inconsistent_leads",
      notes: `Downloaded resource: ${selectedResource?.title}`,
      status: "New" as const,
      source: "Resource Vault Form",
      date: new Date().toISOString().split("T")[0]
    };

    try {
      const saved = localStorage.getItem("crm_leads_data");
      const currentLeads = saved ? JSON.parse(saved) : [];
      localStorage.setItem("crm_leads_data", JSON.stringify([newLead, ...currentLeads]));
    } catch (err) {}

    // Hydrate student profile statefully if not logged in
    if (!user) {
      loginUser(formData.name, formData.email, "Student");
    }

    // Award +15 score to visitor profile
    const savedProfile = localStorage.getItem("gos_visitor_profile");
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        profile.name = formData.name;
        profile.email = formData.email;
        profile.downloadsCount = (profile.downloadsCount || 0) + 1;
        profile.score = (profile.score || 0) + 15;
        localStorage.setItem("gos_visitor_profile", JSON.stringify(profile));
        window.dispatchEvent(new CustomEvent("gos_profile_updated", { detail: profile }));
      } catch (e) {}
    }

    sessionStorage.setItem("exit_intent_dismissed", "true");

    setTimeout(() => {
      setSubmitting(false);
      setOptedIn(true);
    }, 1200);
  };

  return (
    <div className="py-12 pb-20 relative overflow-hidden tech-grid-bg min-h-screen">
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header Text */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">
            Asset Vault
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-display gold-gradient-text pb-1">
            Digital Business Resources Library
          </h1>
          <p className="text-slate-550 dark:text-slate-400 text-sm sm:text-base leading-relaxed font-light">
            Download free operational toolkits, checklists, and blueprints Swapnil Shiwalay uses to map acquire frameworks and scale pipelines.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {resources.map((res) => {
            const Icon = iconMap[res.fileType] || FileText;
            return (
              <div
                key={res.id}
                className="glass-panel border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-md hover:shadow-lg transition-all duration-300 text-left"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/80 pb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-600/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      <Icon className="h-3.5 w-3.5" />
                      {res.fileType}
                    </span>
                    <span className="text-[10px] text-slate-450 dark:text-slate-500 uppercase tracking-wider font-bold">
                      {res.fileSize}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-wide">{res.title}</h3>
                    <p className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold mt-1">
                      {res.tagline}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mt-2 font-light">
                      {res.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block mb-2">
                      What&apos;s Included:
                    </span>
                    <ul className="space-y-1.5">
                      {res.details.map((det, idx) => (
                        <li key={idx} className="text-slate-500 dark:text-slate-350 text-xs sm:text-sm flex items-center gap-2 font-light">
                          <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 shrink-0" />
                          {det}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenModal(res)}
                  className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all cursor-pointer flex items-center justify-center text-xs uppercase tracking-widest shadow-xs gap-2"
                >
                  Download Free Asset
                  <Download className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* OPT-IN MODAL */}
      <AnimatePresence>
        {selectedResource && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 max-w-md w-full p-8 rounded-3xl space-y-6 relative overflow-hidden shadow-2xl text-left"
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 dark:hover:text-white cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {!optedIn ? (
                /* FORM STATE */
                <div className="space-y-4 pt-2">
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-bold font-display text-white">Enter Email to Download</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-light leading-relaxed">
                      Download <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{selectedResource.title}</span>. We will deliver the file directly to your inbox.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label htmlFor="modal-name" className="text-xs font-semibold text-slate-500 dark:text-slate-450 uppercase tracking-wider block">
                        Name
                      </label>
                      <input
                        type="text"
                        id="modal-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        placeholder="e.g. John Doe"
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-600 transition-all text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="modal-email" className="text-xs font-semibold text-slate-500 dark:text-slate-455 uppercase tracking-wider block">
                        Business Email
                      </label>
                      <input
                        type="email"
                        id="modal-email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        placeholder="e.g. john@business.com"
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-600 transition-all text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all cursor-pointer flex items-center justify-center text-xs uppercase tracking-widest shadow-xs disabled:opacity-50 mt-4"
                    >
                      {submitting ? "Preparing Link..." : "Download Now"}
                    </button>
                  </form>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-550 pt-2 border-t border-slate-200 dark:border-slate-800/80">
                    <Shield className="h-3.5 w-3.5 text-slate-400" /> 100% Privacy. Zero spam.
                  </div>
                </div>
              ) : (
                /* SUCCESS STATE */
                <div className="text-center space-y-6 pt-2 flex flex-col items-center">
                  <div className="h-14 w-14 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-450">
                    <CheckCircle className="h-7 w-7" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-display text-white">Download Ready!</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                      Thank you, <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{formData.name}</span>. We sent a copy of <span className="text-slate-800 dark:text-white font-medium">{selectedResource.title}</span> to <span className="text-indigo-600 dark:text-indigo-400 font-medium">{formData.email}</span>.
                    </p>
                  </div>

                  <a
                    href={selectedResource.downloadUrl}
                    onClick={() => handleCloseModal()}
                    download
                    className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all cursor-pointer flex items-center justify-center text-xs uppercase tracking-widest shadow-xs gap-2"
                  >
                    Download Directly
                    <Download className="h-4 w-4" />
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
