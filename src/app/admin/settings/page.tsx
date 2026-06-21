"use client";

import { useState, useEffect } from "react";
import {
  Settings,
  Mail,
  Key,
  Globe,
  Sliders,
  Database,
  Save,
  RotateCcw,
  Check,
  Lock,
  Shield,
  Activity,
  ExternalLink,
  AlertCircle,
} from "lucide-react";

interface SiteSettings {
  // Integrations
  gaId: string;
  gtmId: string;
  pixelId: string;
  calendlyUrl: string;
  
  // SMTP
  emailProvider: "SMTP" | "Brevo" | "Mailchimp";
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
  senderEmail: string;

  // Site Info
  brandName: string;
  tagline: string;
  copyrightText: string;
  consultationPrice: string;

  // Social Links
  linkedinUrl: string;
  youtubeUrl: string;
  githubUrl: string;
  twitterUrl: string;
}

const defaultSettings: SiteSettings = {
  gaId: "G-H2F5G8L7X9",
  gtmId: "GTM-K8S4W9",
  pixelId: "109827653544211",
  calendlyUrl: "https://calendly.com/swapnil-shiwalay/ecosystem-audit",
  
  emailProvider: "Brevo",
  smtpHost: "smtp-relay.brevo.com",
  smtpPort: 587,
  smtpUser: "swapnil@shiwalay.com",
  smtpPass: "••••••••••••••••••••••••",
  senderEmail: "swapnil@shiwalay.com",

  brandName: "Swapnil Shiwalay",
  tagline: "The Digital Business Ecosystem Architect",
  copyrightText: "© 2026 Swapnil Shiwalay. All rights reserved.",
  consultationPrice: "₹25,000 per Audit Session",

  linkedinUrl: "https://linkedin.com/in/swapnilshiwalay",
  youtubeUrl: "https://youtube.com/c/shiwalay",
  githubUrl: "https://github.com/swapnilonline",
  twitterUrl: "https://twitter.com/shiwalay",
};

export default function SettingsPage() {
  const [config, setConfig] = useState<SiteSettings>(defaultSettings);
  const [activeTab, setActiveTab] = useState<"general" | "integrations" | "smtp" | "social" | "security" | "audit">("general");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [testingSmtp, setTestingSmtp] = useState(false);
  const [smtpStatus, setSmtpStatus] = useState<"idle" | "success" | "error">("idle");

  // Security Credentials state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState<"idle" | "success" | "error" | "mismatch" | "wrong_current">("idle");

  // Webhook security logs
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  // Load from local storage or set defaults
  useEffect(() => {
    const saved = localStorage.getItem("site_global_settings");
    if (saved) {
      try {
        setConfig(JSON.parse(saved));
      } catch (e) {
        setConfig(defaultSettings);
      }
    } else {
      setConfig(defaultSettings);
      localStorage.setItem("site_global_settings", JSON.stringify(defaultSettings));
    }

    const savedLogs = localStorage.getItem("gos_audit_logs");
    if (savedLogs) {
      try {
        setAuditLogs(JSON.parse(savedLogs));
      } catch (e) {
        setAuditLogs([]);
      }
    }
  }, [activeTab]);

  const handleClearAuditLogs = () => {
    if (confirm("Are you sure you want to flush all system security logs?")) {
      setAuditLogs([]);
      localStorage.setItem("gos_audit_logs", JSON.stringify([]));
      alert("System security logs flushed.");
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus("idle");

    setTimeout(() => {
      try {
        localStorage.setItem("site_global_settings", JSON.stringify(config));
        setSaveStatus("success");
      } catch (err) {
        setSaveStatus("error");
      } finally {
        setIsSaving(false);
        setTimeout(() => setSaveStatus("idle"), 3000);
      }
    }, 1000);
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to revert all settings to system defaults?")) {
      setConfig(defaultSettings);
      localStorage.setItem("site_global_settings", JSON.stringify(defaultSettings));
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }
  };

  const testSmtpConnection = () => {
    setTestingSmtp(true);
    setSmtpStatus("idle");

    setTimeout(() => {
      // Simulate validation check
      if (config.smtpHost && config.smtpUser && config.smtpPort) {
        setSmtpStatus("success");
      } else {
        setSmtpStatus("error");
      }
      setTestingSmtp(false);
    }, 1500);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus("idle");

    const savedPassword = localStorage.getItem("admin_password") || "Shiwalay$9393";
    if (currentPassword !== savedPassword) {
      setPasswordStatus("wrong_current");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordStatus("mismatch");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordStatus("error");
      return;
    }

    localStorage.setItem("admin_password", newPassword);
    setPasswordStatus("success");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const updateField = (key: keyof SiteSettings, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const tabs = [
    { id: "general", label: "General & Branding", icon: Sliders },
    { id: "integrations", label: "APIs & Pixels", icon: Globe },
    { id: "smtp", label: "SMTP & Email Marketing", icon: Mail },
    { id: "social", label: "Social & Profile Links", icon: Key },
    { id: "security", label: "Security & Password", icon: Lock },
    { id: "audit", label: "Security & Webhook Audit", icon: Activity },
  ] as const;

  return (
    <div className="space-y-8">
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-white">System Settings Hub</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Configure APIs, SMTP relays, branding metadata, and ecosystem connection values.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#f3e5ab] bg-[#d4af37]/10 border border-[#d4af37]/20 px-3 py-1.5 rounded-full">
          <Shield className="h-3.5 w-3.5 text-[#d4af37]" /> Security Layer Active (AES-256 Mock)
        </div>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Tabs Menu */}
        <div className="lg:col-span-4 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer ${
                  isTabActive
                    ? "bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/35 shadow-[0_0_15px_rgba(212,175,55,0.05)]"
                    : "bg-slate-950 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-slate-200"
                }`}
              >
                <Icon className={`h-4.5 w-4.5 ${isTabActive ? "text-[#d4af37]" : "text-slate-500"}`} />
                {tab.label}
              </button>
            );
          })}

          <div className="bg-slate-950/40 border border-slate-900 p-4 rounded-xl space-y-3 mt-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <Database className="h-4 w-4 text-indigo-500" /> Core DB Status
            </div>
            <div className="space-y-1.5 text-[10px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Prisma Client:</span>
                <span className="text-emerald-400 font-semibold font-mono">v5.12 (Initialized)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Dialect:</span>
                <span className="text-slate-300 font-semibold">PostgreSQL 16</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Local Cache:</span>
                <span className="text-slate-300 font-semibold">Active (LocalStorage)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Settings Pane */}
        {activeTab === "security" && (
          <form onSubmit={handlePasswordChange} className="lg:col-span-8 space-y-6">
            <div className="glass-panel border-slate-800 rounded-xl p-6 space-y-6">
              <div className="border-b border-slate-900 pb-3 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400">Security & Password Controls</h3>
                  <p className="text-slate-500 text-xs mt-0.5">Manage credential tokens accessing the administrative console.</p>
                </div>
                <Lock className="h-4.5 w-4.5 text-slate-500" />
              </div>

              {/* Feedback States */}
              {passwordStatus === "success" && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3 rounded-lg text-xs flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0" />
                  <span>Administrative credentials updated successfully! Subsequent auth gates will verify against the new password.</span>
                </div>
              )}
              {passwordStatus === "wrong_current" && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-lg text-xs flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>Current password verification failed. Please authenticate check and try again.</span>
                </div>
              )}
              {passwordStatus === "mismatch" && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-lg text-xs flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>Token mismatch: Confirm new password must match new password input field.</span>
                </div>
              )}
              {passwordStatus === "error" && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-lg text-xs flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>Password length check failed: New password must be at least 6 characters in length.</span>
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    placeholder="••••••••••••"
                    className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      placeholder="••••••••••••"
                      className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      placeholder="••••••••••••"
                      className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Save Action Buttons */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-lg transition-transform hover:scale-[1.02] cursor-pointer"
              >
                <Save className="h-4 w-4" /> Save New Password
              </button>
            </div>
          </form>
        )}

        {activeTab === "audit" && (
          <div className="lg:col-span-8 space-y-6 animate-fadeIn">
            {/* Rate limits */}
            <div className="glass-panel border-slate-800 rounded-xl p-6 space-y-6">
              <div className="border-b border-slate-900 pb-3 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400">Outbound Webhooks & Rate Limits</h3>
                  <p className="text-slate-500 text-xs mt-0.5">Active webhooks distributing telemetry data to third-party endpoints.</p>
                </div>
                <Activity className="h-4.5 w-4.5 text-slate-500" />
              </div>

              <div className="space-y-4">
                {[
                  { name: "Lead Capture Triage Endpoint", url: "https://swapnilonline.com/api/v1/leads/catch", status: "Active", rate: "12 req/min", limit: "100 req/min" },
                  { name: "Leaderboard Streak Sync Endpoint", url: "https://swapnilonline.com/api/v1/students/sync", status: "Active", rate: "3 req/min", limit: "50 req/min" },
                  { name: "Zoom Live Webinar Sync Webhook", url: "https://swapnilonline.com/api/v1/webinars/zoom", status: "Active", rate: "0 req/min", limit: "200 req/min" }
                ].map((wh, idx) => (
                  <div key={idx} className="p-3 bg-slate-950/60 border border-slate-900 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-xs">
                    <div className="space-y-1">
                      <span className="font-bold text-white block">{wh.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono block break-all">{wh.url}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase">{wh.status}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{wh.rate} / {wh.limit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audit log logs list */}
            <div className="glass-panel border-slate-800 rounded-xl p-6 space-y-6">
              <div className="border-b border-slate-900 pb-3 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400">Real-time Security Logs</h3>
                  <p className="text-slate-500 text-xs mt-0.5">Stateful telemetry feed of admin action vectors.</p>
                </div>
                <button
                  type="button"
                  onClick={handleClearAuditLogs}
                  className="bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-500 px-3 py-1.5 rounded text-[10px] font-bold transition-all cursor-pointer"
                >
                  Clear Logs
                </button>
              </div>

              <div className="overflow-x-auto border border-slate-900 rounded-xl bg-slate-950/40">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-950 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-900">
                      <th className="p-3">Timestamp</th>
                      <th className="p-3">Action Description</th>
                      <th className="p-3 text-center">User</th>
                      <th className="p-3 text-right">IP Address</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900 text-slate-350">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-900/10">
                        <td className="p-3 font-mono text-[10px] text-slate-500">{log.timestamp}</td>
                        <td className="p-3 font-medium text-slate-200">{log.action}</td>
                        <td className="p-3 text-center font-semibold text-slate-400">{log.user || "Swapnil"}</td>
                        <td className="p-3 text-right font-mono text-slate-500">{log.ip || "192.168.1.102"}</td>
                      </tr>
                    ))}
                    {auditLogs.length === 0 && (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-slate-500 italic">No logs generated.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab !== "security" && activeTab !== "audit" && (
          <form onSubmit={handleSave} className="lg:col-span-8 space-y-6">
            <div className="glass-panel border-slate-800 rounded-xl p-6 space-y-6">
              {/* General Tab */}
              {activeTab === "general" && (
                <div className="space-y-6">
                  <div className="border-b border-slate-900 pb-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400">Branding & Global Info</h3>
                    <p className="text-slate-500 text-xs mt-0.5">Define core strings used across layouts and SEO tags.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Founder Brand Name</label>
                      <input
                        type="text"
                        value={config.brandName}
                        onChange={(e) => updateField("brandName", e.target.value)}
                        required
                        className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Positioning Tagline</label>
                      <input
                        type="text"
                        value={config.tagline}
                        onChange={(e) => updateField("tagline", e.target.value)}
                        required
                        className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Footer Copyright Note</label>
                      <input
                        type="text"
                        value={config.copyrightText}
                        onChange={(e) => updateField("copyrightText", e.target.value)}
                        required
                        className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Consulting Call Pricing</label>
                      <input
                        type="text"
                        value={config.consultationPrice}
                        onChange={(e) => updateField("consultationPrice", e.target.value)}
                        required
                        className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Integrations Tab */}
              {activeTab === "integrations" && (
                <div className="space-y-6">
                  <div className="border-b border-slate-900 pb-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400">Tracking Pixels & Scheduling</h3>
                    <p className="text-slate-500 text-xs mt-0.5">Wire global analytics containers, retargeting codes, and Calendly.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Google Analytics 4 Measurement ID</label>
                        <input
                          type="text"
                          placeholder="G-XXXXXXXXXX"
                          value={config.gaId}
                          onChange={(e) => updateField("gaId", e.target.value)}
                          className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Google Tag Manager Container ID</label>
                        <input
                          type="text"
                          placeholder="GTM-XXXXXXX"
                          value={config.gtmId}
                          onChange={(e) => updateField("gtmId", e.target.value)}
                          className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Meta Retargeting Pixel ID</label>
                      <input
                        type="text"
                        placeholder="e.g. 109827653544211"
                        value={config.pixelId}
                        onChange={(e) => updateField("pixelId", e.target.value)}
                        className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-display">Calendly Booking Link</label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          placeholder="https://calendly.com/your-slug"
                          value={config.calendlyUrl}
                          onChange={(e) => updateField("calendlyUrl", e.target.value)}
                          required
                          className="flex-grow bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                        />
                        <a
                          href={config.calendlyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg hover:text-indigo-400 flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SMTP Tab */}
              {activeTab === "smtp" && (
                <div className="space-y-6">
                  <div className="border-b border-slate-900 pb-3 flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400">Email SMTP Configuration</h3>
                      <p className="text-slate-500 text-xs mt-0.5">Sync system-triggered notifications, opt-ins, and newsletter broadcasts.</p>
                    </div>
                    <Lock className="h-4 w-4 text-slate-600" />
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">ESP Provider</label>
                        <select
                          value={config.emailProvider}
                          onChange={(e) => updateField("emailProvider", e.target.value)}
                          className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                        >
                          <option value="Brevo">Brevo (Sendinblue)</option>
                          <option value="SMTP">Custom SMTP Relay</option>
                          <option value="Mailchimp">Mailchimp Transactional</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Sender Outbound Email</label>
                        <input
                          type="email"
                          value={config.senderEmail}
                          onChange={(e) => updateField("senderEmail", e.target.value)}
                          required
                          className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">SMTP Server Host</label>
                        <input
                          type="text"
                          value={config.smtpHost}
                          onChange={(e) => updateField("smtpHost", e.target.value)}
                          required
                          className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Outbound Port</label>
                        <input
                          type="number"
                          value={config.smtpPort}
                          onChange={(e) => updateField("smtpPort", parseInt(e.target.value))}
                          required
                          className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">SMTP Username</label>
                        <input
                          type="text"
                          value={config.smtpUser}
                          onChange={(e) => updateField("smtpUser", e.target.value)}
                          required
                          className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">SMTP Relay Key / Password</label>
                        <input
                          type="password"
                          value={config.smtpPass}
                          onChange={(e) => updateField("smtpPass", e.target.value)}
                          required
                          className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    {/* SMTP Connection Tester */}
                    <div className="bg-slate-950 border border-slate-900 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="space-y-0.5">
                        <p className="text-white text-xs font-bold">SMTP Diagnostics Tool</p>
                        <p className="text-slate-500 text-[10px]">Test connection, auth, and TLS handshake speeds.</p>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        {smtpStatus === "success" && (
                          <span className="text-emerald-400 text-[11px] font-semibold flex items-center gap-1.5">
                            <Check className="h-4 w-4" /> Ready & Connected
                          </span>
                        )}
                        {smtpStatus === "error" && (
                          <span className="text-rose-400 text-[11px] font-semibold flex items-center gap-1.5">
                            Error: Connection Refused
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={testSmtpConnection}
                          disabled={testingSmtp}
                          className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg hover:text-white text-slate-300 font-bold text-xs transition-colors cursor-pointer disabled:opacity-50"
                        >
                          {testingSmtp ? "Pinging ESP..." : "Test Connection"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Social Tab */}
              {activeTab === "social" && (
                <div className="space-y-6">
                  <div className="border-b border-slate-900 pb-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400">Global Navigation Networks</h3>
                    <p className="text-slate-500 text-xs mt-0.5">Input your high-authority social media assets profiles.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-4 items-center">
                      <div className="h-9 w-9 rounded-lg bg-[#0077b5]/10 border border-[#0077b5]/20 flex items-center justify-center text-[#0077b5]">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect width="4" height="12" x="2" y="9" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      </div>
                      <div className="flex-grow space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none">LinkedIn URL</label>
                        <input
                          type="url"
                          value={config.linkedinUrl}
                          onChange={(e) => updateField("linkedinUrl", e.target.value)}
                          required
                          className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 items-center">
                      <div className="h-9 w-9 rounded-lg bg-[#ff0000]/10 border border-[#ff0000]/20 flex items-center justify-center text-[#ff0000]">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
                          <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" />
                        </svg>
                      </div>
                      <div className="flex-grow space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none">YouTube Channel URL</label>
                        <input
                          type="url"
                          value={config.youtubeUrl}
                          onChange={(e) => updateField("youtubeUrl", e.target.value)}
                          required
                          className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 items-center">
                      <div className="h-9 w-9 rounded-lg bg-[#f1f5f9]/5 border border-slate-800 flex items-center justify-center text-slate-300">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                      </div>
                      <div className="flex-grow space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none">GitHub Portfolio URL</label>
                        <input
                          type="url"
                          value={config.githubUrl}
                          onChange={(e) => updateField("githubUrl", e.target.value)}
                          required
                          className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 items-center">
                      <div className="h-9 w-9 rounded-lg bg-[#1da1f2]/10 border border-[#1da1f2]/20 flex items-center justify-center text-[#1da1f2]">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                        </svg>
                      </div>
                      <div className="flex-grow space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none">Twitter / X URL</label>
                        <input
                          type="url"
                          value={config.twitterUrl}
                          onChange={(e) => updateField("twitterUrl", e.target.value)}
                          required
                          className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Form Actions Footer Panel */}
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-950 border border-slate-900 rounded-lg text-slate-400 hover:text-white text-xs font-bold transition-all cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" /> Reset Defaults
              </button>

              <div className="flex items-center gap-4">
                {saveStatus === "success" && (
                  <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                    <Check className="h-4.5 w-4.5" /> Settings saved successfully!
                  </span>
                )}
                {saveStatus === "error" && (
                  <span className="text-rose-400 text-xs font-semibold">
                    Error: Failed to save to local storage.
                  </span>
                )}

                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#f3e5ab] to-[#d4af37] text-[#030a16] font-bold text-xs rounded-lg transition-transform cursor-pointer hover:scale-[1.02] disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {isSaving ? "Saving Config..." : "Save Settings"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
