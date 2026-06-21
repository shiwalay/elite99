"use client";

import { useState, useEffect, useMemo } from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Award,
  Trophy,
  Sparkles,
  Clock,
  CreditCard,
  DollarSign,
  Search,
  Trash2,
  Calendar,
  Filter,
  Cpu,
  Play,
  ArrowUpRight,
  ArrowDownRight,
  MessageSquare,
  Mail,
  Phone,
  ShieldCheck,
  Layers,
  Download,
  FileText,
  Share2,
  CheckCircle,
  AlertCircle,
  Map,
  AlertTriangle,
  Zap,
  ChevronRight,
  TrendingUp as TrendUpIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEcosystemStore } from "@/store/useEcosystemStore";
import { DEFAULT_COHORTS, DEFAULT_COURSES } from "../academy/courses-data";
import Card from "@/components/Card";
import { useAdminTheme } from "@/components/AdminThemeContext";

interface PaymentRecord {
  id: string;
  studentName: string;
  studentEmail: string;
  amount: number;
  level: number;
  date: string;
  status: "success" | "refunded" | "pending";
  paymentPlan: string;
}

const DEFAULT_PAYMENTS: PaymentRecord[] = [
  { id: "pay_1", studentName: "Jessica Mercer", studentEmail: "jessica@mercer.com", amount: 24999, level: 2, date: "2026-06-19", status: "success", paymentPlan: "Fully Paid" },
  { id: "pay_2", studentName: "Rahul Sen", studentEmail: "rahul@business.com", amount: 4999, level: 1, date: "2026-06-18", status: "success", paymentPlan: "Fully Paid" },
  { id: "pay_3", studentName: "Meera Patel", studentEmail: "meera@patel.com", amount: 4999, level: 1, date: "2026-06-18", status: "success", paymentPlan: "Fully Paid" },
];

const DEFAULT_LMS_STUDENTS = [
  { name: "Jessica Mercer", email: "jessica@mercer.com", cohortId: "cohort_l2_june", rank: "Architect", xp: 3450, completions: 8, avatarColor: "bg-indigo-650", level: 2, attendance: 90, completedLessons: ["c1_l1", "c1_l2", "c1_l3", "c2_l1", "c2_l2", "c3_l1", "c3_l2", "c7_l1"], passedQuizzes: ["c1", "c2", "c3"], streakDays: 12, badges: ["Course Champion", "Implementation Expert"], recommendation: false, country: "United States", regDate: "2026-05-10", watchTime: "4h 25m", webinarCount: 8, riskScore: 12, lastLogin: "2026-06-20T18:00:00Z" },
  { name: "Rahul Sen", email: "rahul@business.com", cohortId: "cohort_l1_june", rank: "Builder", xp: 2150, completions: 5, avatarColor: "bg-indigo-650", level: 1, attendance: 80, completedLessons: ["c1_l1", "c1_l2", "c1_l3", "c2_l1", "c2_l2"], passedQuizzes: ["c1"], streakDays: 5, badges: ["Fast Learner"], recommendation: false, country: "India", regDate: "2026-06-01", watchTime: "2h 10m", webinarCount: 3, riskScore: 24, lastLogin: "2026-06-19T14:30:00Z" },
  { name: "Meera Patel", email: "meera@patel.com", cohortId: "cohort_l1_june", rank: "Builder", xp: 1820, completions: 4, avatarColor: "bg-emerald-650", level: 1, attendance: 75, completedLessons: ["c1_l1", "c1_l2", "c1_l3", "c2_l1"], passedQuizzes: ["c1"], streakDays: 4, badges: [], recommendation: false, country: "India", regDate: "2026-06-03", watchTime: "1h 50m", webinarCount: 2, riskScore: 15, lastLogin: "2026-06-20T11:15:00Z" }
];

export default function AdminDashboardPage() {
  const {
    leads,
    addLead,
    updateLeadStatus,
    deleteLead,
    assignments,
    updateAssignmentStatus
  } = useEcosystemStore();
  const { theme } = useAdminTheme();

  // Active Center Main View Tab Selector
  const [activeCenterTab, setActiveCenterTab] = useState<
    "cockpit" | "revenue" | "funnel" | "success" | "intervention" | "referral" | "crm" | "reports"
  >("cockpit");

  // Local data lists synced with localstorage
  const [lmsStudents, setLmsStudents] = useState<any[]>([]);
  const [paymentRecords, setPaymentRecords] = useState<PaymentRecord[]>([]);
  const [activityFeed, setActivityFeed] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<string[]>([]);
  const [simulateToast, setSimulateToast] = useState<string | null>(null);

  // CRM Search Filter
  const [crmSearch, setCrmSearch] = useState("");
  const [crmFilter, setCrmFilter] = useState<"All" | "New" | "Contacted" | "Qualified" | "Lost">("All");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSt = localStorage.getItem("academy_leaderboard_data");
      if (savedSt) {
        try { setLmsStudents(JSON.parse(savedSt)); } catch (e) { setLmsStudents(DEFAULT_LMS_STUDENTS); }
      } else {
        setLmsStudents(DEFAULT_LMS_STUDENTS);
        localStorage.setItem("academy_leaderboard_data", JSON.stringify(DEFAULT_LMS_STUDENTS));
      }

      const savedPay = localStorage.getItem("academy_payments_data");
      if (savedPay) {
        try { setPaymentRecords(JSON.parse(savedPay)); } catch (e) { setPaymentRecords(DEFAULT_PAYMENTS); }
      } else {
        setPaymentRecords(DEFAULT_PAYMENTS);
        localStorage.setItem("academy_payments_data", JSON.stringify(DEFAULT_PAYMENTS));
      }

      const savedFeed = localStorage.getItem("academy_activity_feed");
      if (savedFeed) {
        try { setActivityFeed(JSON.parse(savedFeed)); } catch (e) { setActivityFeed([]); }
      } else {
        const initialFeed = [
          { id: "act_1", type: "New Lead Created", message: "Meera Patel registered via the main Masterclass opt-in.", time: "2 hours ago" },
          { id: "act_2", type: "Payment Complete", message: "Received payment of ₹24,999 from Jessica Mercer.", time: "1 day ago" }
        ];
        setActivityFeed(initialFeed);
        localStorage.setItem("academy_activity_feed", JSON.stringify(initialFeed));
      }

      const savedLogs = localStorage.getItem("admin_security_logs");
      if (savedLogs) {
        try { setAuditLogs(JSON.parse(savedLogs)); } catch (e) { setAuditLogs([]); }
      }
    }
  }, [addLead]);

  const triggerToast = (msg: string) => {
    setSimulateToast(msg);
    setTimeout(() => setSimulateToast(null), 3000);
  };

  const pushAuditLog = (action: string) => {
    const nextLogs = [`[${new Date().toLocaleTimeString()}] ${action}`, ...auditLogs.slice(0, 20)];
    setAuditLogs(nextLogs);
    localStorage.setItem("admin_security_logs", JSON.stringify(nextLogs));
  };

  const handleUpdateStudentField = (name: string, key: string, val: any) => {
    const updated = lmsStudents.map((s) => s.name === name ? { ...s, [key]: val } : s);
    setLmsStudents(updated);
    localStorage.setItem("academy_leaderboard_data", JSON.stringify(updated));
    pushAuditLog(`Student ${name} updated field ${key} to ${val}`);
  };

  const filteredLeads = leads.filter((l) => {
    const searchMatch = l.name.toLowerCase().includes(crmSearch.toLowerCase()) || l.email.toLowerCase().includes(crmSearch.toLowerCase());
    const filterMatch = crmFilter === "All" || l.status === crmFilter;
    return searchMatch && filterMatch;
  });

  return (
    <div className="space-y-8 text-left pb-16">
      {/* CEO COMMAND CENTER BRAND HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200/50 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-bold bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20 rounded-md uppercase tracking-wider font-mono">
              Super Admin Console
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] text-slate-400 font-mono">Real-Time BI Engine</span>
          </div>
          <h1 className="text-3xl font-bold font-display mt-1 text-slate-900 dark:text-white flex items-center gap-2">
            CEO COMMAND CENTER<span className="text-xs align-super text-[#d4af37]">™</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5 font-light">
            Business intelligence & decision cockpit for scaling to a ₹100 Crore Transformation Operating System.
          </p>
        </div>

        {/* Dynamic Simulation Actions Panel */}
        <div className="flex items-center gap-2">
          <div className="text-xs text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full font-mono font-bold flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" /> Cockpit Live
          </div>
        </div>
      </div>

      {/* CORE HUB VIEW SELECTOR */}
      <div className="flex flex-wrap gap-2 border-b border-slate-100 dark:border-slate-850 pb-2 overflow-x-auto">
        {[
          { id: "cockpit", label: "Executive Cockpit", icon: Layers },
          { id: "revenue", label: "Revenue & Leaks", icon: DollarSign },
          { id: "funnel", label: "Funnel & Cohorts", icon: Target },
          { id: "success", label: "Student Success", icon: Trophy },
          { id: "intervention", label: "Intervention Desk", icon: AlertTriangle },
          { id: "referral", label: "Referral & Social", icon: Share2 },
          { id: "crm", label: "Leads CRM Ledger", icon: Users },
          { id: "reports", label: "Executive Reports", icon: FileText }
        ].map((tab) => {
          const TabIcon = tab.icon;
          const isActive = activeCenterTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveCenterTab(tab.id as any)}
              className={`flex items-center gap-2 px-4.5 py-2.5 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30 shadow-sm"
                  : theme === "light"
                  ? "text-slate-650 hover:bg-slate-50 hover:text-slate-900 border border-transparent"
                  : "text-slate-400 hover:bg-slate-900/50 hover:text-slate-200 border border-transparent"
              }`}
            >
              <TabIcon className="h-4 w-4 shrink-0" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* INTERACTIVE VIEWPORTS */}
      <AnimatePresence mode="wait">
        {/* VIEW 1: EXECUTIVE COCKPIT */}
        {activeCenterTab === "cockpit" && (
          <motion.div
            key="cockpit-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
          >
            {/* AI Advisor - CEO INSIGHTS™ */}
            <div className="glass-panel border-indigo-200 dark:border-indigo-950/40 bg-indigo-500/5 p-6 rounded-3xl space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-indigo-650 text-white">
                    <Zap className="h-4 w-4 text-[#d4af37]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white font-display">
                      CEO INSIGHTS<span className="text-[10px] align-super text-indigo-400">™</span>
                    </h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">AI Real-Time Business Analysis</p>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-bold font-mono">
                  Updated Today at 04:57 AM
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-light text-slate-700 dark:text-slate-350 leading-relaxed">
                <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-850 space-y-1.5">
                  <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">📈 Revenue Surge</span>
                  <p>L1 &rarr; L2 upgrade automation campaign generated <strong>₹12.4 Lakh</strong> in checkout upgrades this week.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-850 space-y-1.5">
                  <span className="font-bold text-rose-500 flex items-center gap-1">⚠️ Content Drop-Off</span>
                  <p>L1 Module 3 "Automation Setup" watch-completion dropped by <strong>8%</strong>. Remediation estimated: <strong>₹18 Lakh/mo</strong> downstream upgrades.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-850 space-y-1.5">
                  <span className="font-bold text-amber-500 flex items-center gap-1">🚨 Intervention Required</span>
                  <p><strong>312 students</strong> flagged at-risk (no login 3+ days). Streak metrics are showing active decay warning signs.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-850 space-y-1.5">
                  <span className="font-bold text-[#d4af37] flex items-center gap-1">✨ Growth Catalyst</span>
                  <p>Quantum applications increased <strong>21%</strong>. Recommended Action: Roll out Level 2.5 systems sprint cohort today.</p>
                </div>
              </div>
            </div>

            {/* Top 10 Executive KPI Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { label: "Total Gross Revenue", val: "₹1.84 Crore", change: "+12.4%", desc: "vs last period", up: true },
                { label: "Monthly Recurring (MRR)", val: "₹15.8 Lakh", change: "+8.2%", desc: "compounding retainers", up: true },
                { label: "Annual Projected (ARR)", val: "₹1.90 Crore", change: "+10.5%", desc: "based on cohort run-rate", up: true },
                { label: "Active Members Base", val: "1,240 active", change: "+15.2%", desc: "enrolled system seekers", up: true },
                { label: "LMS Completion Rate", val: "74.2%", change: "+3.1%", desc: "avg quests completed", up: true },
                { label: "Accountability Index", val: "84.5%", change: "+4.2%", desc: "habit checklist tracking", up: true },
                { label: "Referral Conversion", val: "18.2%", change: "+2.5%", desc: "ambassador invitations", up: true },
                { label: "Customer Lifetime Value", val: "₹1.48 Lakh", change: "+6.8%", desc: "avg spend per student", up: true },
                { label: "Net Promoter (NPS)", val: "78 NPS", change: "+4.0%", desc: "weekly surveys index", up: true },
                { label: "Quantum Convert Rate", val: "12.5%", change: "+1.8%", desc: "L2 to L3 mastermind application", up: true }
              ].map((card, idx) => (
                <div
                  key={idx}
                  className={`border p-4.5 rounded-2xl space-y-2 flex flex-col justify-between ${
                    theme === "light" ? "bg-slate-50 border-slate-200" : "bg-slate-950/40 border-slate-800"
                  }`}
                >
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold font-mono">
                    {card.label}
                  </span>
                  <div className="flex items-baseline justify-between gap-1">
                    <span className="text-xl font-bold font-display text-slate-900 dark:text-white leading-none">
                      {card.val}
                    </span>
                    <span
                      className={`text-[10px] font-bold font-mono flex items-center gap-0.5 ${
                        card.up ? "text-emerald-500" : "text-rose-500"
                      }`}
                    >
                      {card.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {card.change}
                    </span>
                  </div>
                  <div className="w-full h-1 bg-slate-900/5 dark:bg-slate-900 rounded overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#d4af37] to-indigo-500 w-3/4 rounded" />
                  </div>
                  <span className="text-[9px] text-slate-550 leading-none">{card.desc}</span>
                </div>
              ))}
            </div>

            {/* 100 Crore Roadmap Tracker™ */}
            <div className={`border p-6 rounded-3xl space-y-6 ${
              theme === "light" ? "bg-slate-50 border-slate-200" : "bg-slate-950/40 border-slate-800"
            }`}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-base font-bold uppercase tracking-wider flex items-center gap-2 font-display text-slate-900 dark:text-white">
                    <Map className="h-4.5 w-4.5 text-[#d4af37]" /> 100 CRORE ROADMAP TRACKER™
                  </h3>
                  <p className="text-slate-500 text-xs font-light">Gap analysis and core metrics required to hit ₹100 Crore annual run-rate.</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-550 dark:text-slate-400 font-mono block">Current Progress</span>
                  <span className="text-2xl font-bold font-display gold-gradient-text">18.4% of Target</span>
                </div>
              </div>

              {/* Progress Bar visualizer */}
              <div className="space-y-2">
                <div className="w-full h-4 bg-slate-900 dark:bg-slate-950 border border-slate-250 dark:border-slate-900 rounded-full overflow-hidden p-0.5">
                  <div className="h-full bg-gradient-to-r from-[#B8860B] via-[#d4af37] to-[#FFE5B4] rounded-full shadow-[0_0_12px_rgba(212,175,55,0.3)] w-[18.4%]" />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>Current ARR: ₹18.42 Crore</span>
                  <span>Target ARR: ₹100 Crore</span>
                </div>
              </div>

              {/* Gap Analysis Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-900 space-y-1">
                  <span className="text-[9px] text-slate-500 font-mono font-bold uppercase">Member Base Gap</span>
                  <p className="text-lg font-bold text-white">4,000 Seats Required</p>
                  <p className="text-[10px] text-slate-400 font-light">Current: 1,240 (+2,760 delta needed)</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-900 space-y-1">
                  <span className="text-[9px] text-slate-500 font-mono font-bold uppercase">LTV Expansion Target</span>
                  <p className="text-lg font-bold text-white">₹2.5 Lakh Target</p>
                  <p className="text-[10px] text-slate-400 font-light">Current LTV: ₹1.48 Lakh (+₹1.02L delta)</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-900 space-y-1">
                  <span className="text-[9px] text-slate-500 font-mono font-bold uppercase">Referral Coefficient</span>
                  <p className="text-lg font-bold text-white">25% Referral Goal</p>
                  <p className="text-[10px] text-slate-400 font-light">Current Rate: 18.2% (+6.8% delta)</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-900 space-y-1">
                  <span className="text-[9px] text-slate-500 font-mono font-bold uppercase">Upsell Conversion</span>
                  <p className="text-lg font-bold text-white">35% L1 &rarr; L2 Gate</p>
                  <p className="text-[10px] text-slate-400 font-light">Current Rate: 24.1% (+10.9% delta)</p>
                </div>
              </div>

              {/* Action checklist */}
              <div className="p-4 rounded-2xl bg-[#d4af37]/5 border border-[#d4af37]/20 space-y-2">
                <span className="text-xs font-bold text-[#d4af37] uppercase font-mono block">Recommended Roadmap Interventions:</span>
                <ul className="text-xs font-light text-slate-700 dark:text-slate-350 space-y-1">
                  <li>🚀 <strong>Deploy Level 2.5 Systems Accelerator</strong> sprint model to capture mid-ticket leads (Expected MRR lift: ₹24 Lakh).</li>
                  <li>📈 <strong>Scale client base to 4,000 active members</strong> via LinkedIn organic auto-sharing systems hooks.</li>
                  <li>🔗 <strong>Audit and fix checkout page leakages</strong> on L2/L3 applications to capture ₹12 Lakh/month leak.</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 2: REVENUE COMMAND CENTER */}
        {activeCenterTab === "revenue" && (
          <motion.div
            key="revenue-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
          >
            {/* Revenue breakdown top bars */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="glass-panel border-slate-800 rounded-2xl p-5 space-y-2">
                <span className="text-slate-500 text-xs font-bold uppercase block">Revenue Today</span>
                <p className="text-3xl font-bold text-white font-display">₹1.4 Lakh</p>
                <span className="text-[10px] text-slate-550 block font-mono">1.8% of Monthly ARR</span>
              </div>
              <div className="glass-panel border-slate-800 rounded-2xl p-5 space-y-2">
                <span className="text-slate-500 text-xs font-bold uppercase block">Revenue This Week</span>
                <p className="text-3xl font-bold text-white font-display">₹18.5 Lakh</p>
                <span className="text-[10px] text-slate-550 block font-mono">12.5% vs Last Week</span>
              </div>
              <div className="glass-panel border-slate-800 rounded-2xl p-5 space-y-2">
                <span className="text-slate-500 text-xs font-bold uppercase block">Revenue This Month</span>
                <p className="text-3xl font-bold text-[#d4af37] font-display">₹62.0 Lakh</p>
                <span className="text-[10px] text-slate-550 block font-mono">92% of Monthly Forecast Goal</span>
              </div>
              <div className="glass-panel border-slate-800 rounded-2xl p-5 space-y-2">
                <span className="text-slate-500 text-xs font-bold uppercase block">Revenue Forecast (Q2)</span>
                <p className="text-3xl font-bold text-white font-display">₹2.4 Crore</p>
                <span className="text-[10px] text-slate-550 block font-mono">On target for ₹100 Crore</span>
              </div>
            </div>

            {/* Opportunities & Leaks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Opportunities list */}
              <div className="glass-panel border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-1.5 font-mono text-slate-900 dark:text-white">
                  <Sparkles className="h-4 w-4 text-[#d4af37]" /> Growth Opportunity Center
                </h3>
                <div className="space-y-3">
                  {[
                    { title: "Launch Level 2.5 Systems Accelerator", impact: "High", effort: "Medium", ROI: "12X", impactVal: "₹24 Lakh/mo" },
                    { title: "Automate LinkedIn Certificate Auto-Sharing", impact: "High", effort: "Low", ROI: "15X", impactVal: "₹12 Lakh/mo" },
                    { title: "Implement Automated WhatsApp Cart Recovery", impact: "Medium", effort: "Low", ROI: "8X", impactVal: "₹8 Lakh/mo" },
                    { title: "Add Gamified Streak Safeguard with XP", impact: "Medium", effort: "Medium", ROI: "5X", impactVal: "₹6 Lakh/mo" }
                  ].map((opp, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs p-3 rounded-xl bg-slate-950/60 border border-slate-900">
                      <div>
                        <span className="font-bold text-white block">{opp.title}</span>
                        <span className="text-[10px] text-slate-500 font-mono">Effort: {opp.effort} &bull; ROI: {opp.ROI}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-emerald-450 block text-emerald-400 font-mono">{opp.impactVal}</span>
                        <span className="text-[10px] text-slate-400">Impact: {opp.impact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leak Detector */}
              <div className="glass-panel border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-1.5 font-mono text-slate-900 dark:text-white">
                  <AlertCircle className="h-4 w-4 text-rose-500" /> Revenue Leak Detector™
                </h3>
                <div className="space-y-3">
                  {[
                    { leak: "Abandoned Quantum Mastermind Applications", count: "18 users", loss: "₹18 Lakh", impact: "Critical" },
                    { leak: "Checkout Page Funnel Drop-off Rate (24% Bounce)", count: "1524 sessions", loss: "₹12 Lakh/mo", impact: "Critical" },
                    { leak: "Unclaimed Level 1 Completion Certificates", count: "42 users", loss: "₹4.8 Lakh", impact: "High" },
                    { leak: "Inactive Level 2 seats (Missed Upsells)", count: "15 users", loss: "₹15 Lakh", impact: "Medium" }
                  ].map((leak, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs p-3 rounded-xl bg-slate-950/60 border border-slate-900">
                      <div>
                        <span className="font-bold text-white block">{leak.leak}</span>
                        <span className="text-[10px] text-slate-500 font-mono">Impacted: {leak.count}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-rose-455 text-rose-500 block font-mono">-{leak.loss}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                          leak.impact === "Critical" ? "bg-rose-500/10 text-rose-500 border border-rose-500/20" : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                        }`}>{leak.impact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Revenue product metrics breakdown */}
            <div className={`border p-6 rounded-3xl space-y-4 ${
              theme === "light" ? "bg-slate-50 border-slate-200" : "bg-slate-950/40 border-slate-800"
            }`}>
              <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-900 dark:text-white">Revenue by Cohort Product Tiers</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: "Level 1 Foundations", share: "26% Share", gross: "₹48.0 Lakh", enrolled: "312 enrolled", margin: "90% margin", color: "from-indigo-600 to-indigo-700" },
                  { name: "Level 2.5 Systems Accelerator", share: "20% Share", gross: "₹36.0 Lakh", enrolled: "58 enrolled", margin: "85% margin", color: "from-[#d4af37] to-[#FFE5B4]" },
                  { name: "Level 3 Quantum Mastermind", share: "54% Share", gross: "₹1.00 Crore", enrolled: "12 enrolled", margin: "92% margin", color: "from-purple-600 to-purple-800" }
                ].map((p, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-950 border border-slate-900 space-y-4 relative overflow-hidden">
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-500 uppercase font-mono font-bold">{p.share}</span>
                      <h4 className="text-sm font-bold text-white">{p.name}</h4>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-2xl font-bold text-emerald-400 font-display">{p.gross}</span>
                      <span className="text-xs text-slate-400 font-mono">{p.enrolled}</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-900">
                      <span>{p.margin}</span>
                      <span className="text-indigo-400">High Profit yield</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 3: FUNNEL & COHORTS */}
        {activeCenterTab === "funnel" && (
          <motion.div
            key="funnel-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
          >
            {/* Visual stacked conversions funnel */}
            <div className="glass-panel border-slate-800 rounded-3xl p-6 space-y-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-1.5 font-mono text-slate-900 dark:text-white">
                  <Play className="h-4 w-4 text-[#d4af37]" /> CEO COMMAND FUNNEL INTELLIGENCE™
                </h3>
                <p className="text-slate-500 text-xs font-light">Detailed drop-off tracking across the 11 key transformation funnel coordinates.</p>
              </div>

              <div className="space-y-4">
                {[
                  { stage: "1. VSL Landing Page Visitors", vol: 15240, conv: "100%", drop: "0%", value: "₹0", color: "bg-indigo-650" },
                  { stage: "2. Leads Captured (Opt-In)", vol: 4820, conv: "31.6%", drop: "68.4%", value: "₹0", color: "bg-indigo-650" },
                  { stage: "3. Masterclass Registrations", vol: 2150, conv: "44.6%", drop: "55.4%", value: "₹0", color: "bg-indigo-650" },
                  { stage: "4. Masterclass Completion", vol: 1240, conv: "57.6%", drop: "42.4%", value: "₹0", color: "bg-indigo-650" },
                  { stage: "5. Level 1 purchase (Foundations)", vol: 312, conv: "25.1%", drop: "74.9%", value: "₹15.6 Lakh", color: "bg-emerald-650" },
                  { stage: "6. Level 1 graduation certificate", vol: 210, conv: "67.3%", drop: "32.7%", value: "₹0", color: "bg-emerald-650" },
                  { stage: "7. Level 2 purchase (Systems)", vol: 58, conv: "27.6%", drop: "72.4%", value: "₹14.5 Lakh", color: "bg-emerald-650" },
                  { stage: "8. Level 2 graduation certificate", vol: 42, conv: "72.4%", drop: "27.6%", value: "₹0", color: "bg-[#d4af37]/80" },
                  { stage: "9. Quantum Mastermind Application", vol: 28, conv: "66.6%", drop: "33.3%", value: "₹0", color: "bg-[#d4af37]/80" },
                  { stage: "10. Quantum Application Approved", vol: 18, conv: "64.2%", drop: "35.8%", value: "₹0", color: "bg-[#d4af37]/80" },
                  { stage: "11. Quantum Enrolled (CEO level)", vol: 12, conv: "66.6%", drop: "33.3%", value: "₹1.2 Crore", color: "bg-purple-650" }
                ].map((step, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-800 dark:text-white">{step.stage}</span>
                      <div className="text-right font-mono">
                        <span className="text-slate-400">Vol: <strong>{step.vol.toLocaleString()}</strong> &bull; Conv: <strong>{step.conv}</strong> &bull; </span>
                        <span className="text-rose-500 font-bold">-{step.drop} drop</span>
                        {step.value !== "₹0" && <span className="ml-2 font-bold text-emerald-400 font-display">({step.value})</span>}
                      </div>
                    </div>
                    {/* Visual bar */}
                    <div className="w-full h-3 bg-slate-900 border border-slate-805 rounded-full overflow-hidden p-0.5">
                      <div className={`h-full ${step.color} rounded-full`} style={{ width: step.conv === "100%" ? "100%" : `${parseFloat(step.conv) * 3}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cohorts comparison ledger */}
            <div className={`border p-6 rounded-3xl space-y-4 ${
              theme === "light" ? "bg-slate-50 border-slate-200" : "bg-slate-950/40 border-slate-800"
            }`}>
              <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-900 dark:text-white">Cohort Performance Comparison</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { batch: "June 2026 Batch", source: "Organic Referrals", enrolled: "120 Seekers", completion: "76% rate", referral: "22% rate", ltv: "₹1.6 Lakh", qv: "14% conv" },
                  { batch: "May 2026 Batch", source: "Paid VSL Campaign", enrolled: "180 Seekers", completion: "62% rate", referral: "12% rate", ltv: "₹1.1 Lakh", qv: "8% conv" },
                  { batch: "April 2026 Batch", source: "LinkedIn Newsletter", enrolled: "95 Seekers", completion: "81% rate", referral: "26% rate", ltv: "₹1.9 Lakh", qv: "18% conv" }
                ].map((c, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-950 border border-slate-900 space-y-3">
                    <div className="space-y-0.5">
                      <span className="text-[9px] text-[#d4af37] uppercase font-mono font-bold">{c.source}</span>
                      <h4 className="text-sm font-bold text-white">{c.batch}</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-900 leading-tight">
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase font-bold">Enrolled</span>
                        <span className="text-slate-205 font-bold text-white font-mono">{c.enrolled}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase font-bold">Completions</span>
                        <span className="text-slate-205 font-bold text-white font-mono">{c.completion}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase font-bold">LTV</span>
                        <span className="text-slate-205 font-bold text-white font-mono">{c.ltv}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase font-bold">Referral Rate</span>
                        <span className="text-slate-205 font-bold text-white font-mono">{c.referral}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 4: STUDENT SUCCESS */}
        {activeCenterTab === "success" && (
          <motion.div
            key="success-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
          >
            {/* Student success parameters */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-panel border-slate-800 rounded-2xl p-5 space-y-2">
                <span className="text-slate-500 text-xs font-bold uppercase block">Course Completion</span>
                <p className="text-3xl font-bold text-white font-display">74.2%</p>
                <span className="text-[10px] text-slate-550 block">Avg completion across active users</span>
              </div>
              <div className="glass-panel border-slate-800 rounded-2xl p-5 space-y-2">
                <span className="text-slate-500 text-xs font-bold uppercase block">Certificates Issued</span>
                <p className="text-3xl font-bold text-white font-display">252 PDF certs</p>
                <span className="text-[10px] text-slate-550 block">Verifiable LinkedIn graduates</span>
              </div>
              <div className="glass-panel border-slate-800 rounded-2xl p-5 space-y-2">
                <span className="text-slate-500 text-xs font-bold uppercase block">Learning Velocity</span>
                <p className="text-3xl font-bold text-[#d4af37] font-display">1.2 Modules/wk</p>
                <span className="text-[10px] text-slate-550 block">Avg progress speed indexes</span>
              </div>
              <div className="glass-panel border-slate-800 rounded-2xl p-5 space-y-2">
                <span className="text-slate-500 text-xs font-bold uppercase block">Assignment Pass Rate</span>
                <p className="text-3xl font-bold text-white font-display">81.5%</p>
                <span className="text-[10px] text-slate-550 block">Blueprints approved in audit ledger</span>
              </div>
            </div>

            {/* Content performance & weakest nodes */}
            <div className="glass-panel border-slate-800 rounded-3xl p-6 space-y-6">
              <div className="flex justify-between items-center border-b border-slate-900 pb-4">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-1.5 font-mono text-slate-900 dark:text-white">
                    <AlertCircle className="h-4.5 w-4.5 text-rose-500" /> Content performance analysis
                  </h3>
                  <p className="text-slate-500 text-xs font-light">Watch-times, drop-offs, and pass rates on core modules.</p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 text-[10px] font-bold border border-rose-500/20 font-mono">
                  1 weak content flag
                </span>
              </div>

              {/* Weakest content alert banner */}
              <div className="p-4.5 rounded-2xl bg-rose-500/5 border border-rose-500/20 flex gap-3.5 items-start">
                <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-xs font-bold text-rose-500 uppercase block font-mono">Module 3 "Webhook & API integrations" Watch Drop-Off</span>
                  <p className="text-xs font-light text-slate-700 dark:text-slate-350 leading-relaxed">
                    Auditors detected a <strong>32% drop-off at minute 4:15</strong>. The module quiz pass rate is currently <strong>58% (Lowest)</strong>.
                    Recommended Action: Split the module into two short segments, and provide a pre-configured template package.
                  </p>
                </div>
              </div>

              {/* Content table */}
              <div className="overflow-x-auto border border-slate-900 rounded-xl bg-slate-950/40">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-950 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-900">
                      <th className="p-4">Academy Node Module</th>
                      <th className="p-4 text-right">Starts</th>
                      <th className="p-4 text-right">Completions</th>
                      <th className="p-4 text-right">Quiz Pass Rate</th>
                      <th className="p-4 text-center">Engagement Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900 text-slate-300">
                    {[
                      { node: "L1 Quest 1.1: Roadmap Introduction", starts: "1,520", comp: "95.2%", quiz: "92.4%", score: "94/100", color: "text-emerald-500" },
                      { node: "L1 Quest 2.3: Zapier Hook Mapping", starts: "840", comp: "78.5%", quiz: "84.1%", score: "88/100", color: "text-indigo-400" },
                      { node: "L1 Quest 3.2: Webhook integrations", starts: "612", comp: "42.0%", quiz: "58.0%", score: "45/100", color: "text-rose-500 font-bold" },
                      { node: "L2 Quest 1.4: Middleware Templates", starts: "124", comp: "89.2%", quiz: "87.5%", score: "91/100", color: "text-emerald-500" }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/10">
                        <td className="p-4 font-bold text-white">{row.node}</td>
                        <td className="p-4 text-right font-mono">{row.starts}</td>
                        <td className="p-4 text-right font-mono">{row.comp}</td>
                        <td className="p-4 text-right font-mono">{row.quiz}</td>
                        <td className={`p-4 text-center font-bold font-mono ${row.color}`}>{row.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 5: INTERVENTION DESK (At-Risk student center) */}
        {activeCenterTab === "intervention" && (
          <motion.div
            key="intervention-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {simulateToast && (
              <div className="fixed bottom-20 right-5 bg-emerald-500 text-white font-semibold px-4 py-3 rounded-xl shadow-lg z-50 text-xs border border-emerald-400/20 animate-bounce">
                {simulateToast}
              </div>
            )}

            <div className="glass-panel border-slate-800 rounded-3xl p-6 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-4">
                <div>
                  <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-rose-500" /> At-Risk Intervention Center
                  </h3>
                  <p className="text-slate-500 text-xs mt-0.5">Automated detection of students requiring accountability nudges or mentoring calls.</p>
                </div>
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 text-[10px] font-bold border border-rose-500/20 font-mono">
                    4 Action flags
                  </span>
                </div>
              </div>

              {/* Roster of At-Risk Students */}
              <div className="space-y-4">
                {[
                  { name: "Sneha Patel", email: "sneha.patel@educate.org", level: "Level 1 Foundations", progress: "32%", risk: "92/100", reason: "No Login 7 Days, Assignment Pending", action: "WhatsApp reminder" },
                  { name: "Anil Mehta", email: "anil.mehta@finance.in", level: "Level 1 Foundations", progress: "18%", risk: "88/100", reason: "Low Engagement, Streak Broken", action: "Assign Coach" },
                  { name: "Vikram Singh", email: "vikram.singh@corporates.com", level: "Level 2 Systems", progress: "52%", risk: "75/100", reason: "Incomplete Levels, Quiz Failed", action: "Send Email" },
                  { name: "Priya Sharma", email: "priya@creatives.com", level: "Level 1 Foundations", progress: "68%", risk: "68/100", reason: "Low Accountability Index", action: "Create Task" }
                ].map((s, idx) => (
                  <div key={idx} className="p-5 border border-slate-900 bg-slate-950/60 rounded-2xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                        <span className="font-bold text-white font-display text-sm">{s.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono">({s.email})</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-light text-slate-400">
                        <div>
                          <span className="text-[9px] text-slate-500 block uppercase font-bold font-mono">Tier</span>
                          <span>{s.level}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-500 block uppercase font-bold font-mono">Progress</span>
                          <span className="font-mono font-bold text-white">{s.progress}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-500 block uppercase font-bold font-mono">Risk Index</span>
                          <span className="font-mono font-bold text-rose-500">{s.risk}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-500 block uppercase font-bold font-mono">Primary Leak</span>
                          <span className="text-slate-300 font-semibold">{s.reason}</span>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Action Triggers */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0">
                      <button
                        onClick={() => triggerToast(`✉️ Email case-study nudge dispatched to ${s.name}!`)}
                        className="px-3 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5"
                      >
                        <Mail className="h-3.5 w-3.5 text-indigo-400" /> Send Email
                      </button>
                      <button
                        onClick={() => triggerToast(`💬 WhatsApp recovery payload dispatched to ${s.name}!`)}
                        className="px-3 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5"
                      >
                        <MessageSquare className="h-3.5 w-3.5 text-emerald-400" /> Send WhatsApp
                      </button>
                      <button
                        onClick={() => triggerToast(`👤 Coach assigned to audit ${s.name}'s pipelines!`)}
                        className="px-3 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5"
                      >
                        <Users className="h-3.5 w-3.5 text-[#d4af37]" /> Assign Coach
                      </button>
                      <button
                        onClick={() => triggerToast(`📝 Operations tracking task created for ${s.name}!`)}
                        className="px-3 py-2 bg-[#d4af37]/10 hover:bg-[#d4af37]/15 border border-[#d4af37]/35 text-[#d4af37] rounded-xl text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5"
                      >
                        <CheckCircle className="h-3.5 w-3.5" /> Create Task
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 6: REFERRAL & SOCIAL PROOF */}
        {activeCenterTab === "referral" && (
          <motion.div
            key="referral-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
          >
            {/* Top stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="glass-panel border-slate-800 rounded-2xl p-5 space-y-2">
                <span className="text-slate-500 text-xs font-bold uppercase block">Referral Revenue</span>
                <p className="text-3xl font-bold text-white font-display">₹28.4 Lakh</p>
                <span className="text-[10px] text-slate-550 block">Organic ambassador channels</span>
              </div>
              <div className="glass-panel border-slate-800 rounded-2xl p-5 space-y-2">
                <span className="text-slate-500 text-xs font-bold uppercase block">Referral Rate</span>
                <p className="text-3xl font-bold text-white font-display">18.2%</p>
                <span className="text-[10px] text-slate-550 block">L1 students recommending seekers</span>
              </div>
              <div className="glass-panel border-slate-800 rounded-2xl p-5 space-y-2">
                <span className="text-slate-500 text-xs font-bold uppercase block">NPS Score</span>
                <p className="text-3xl font-bold text-[#d4af37] font-display">78 NPS</p>
                <span className="text-[10px] text-slate-550 block">High satisfaction index</span>
              </div>
              <div className="glass-panel border-slate-800 rounded-2xl p-5 space-y-2">
                <span className="text-slate-500 text-xs font-bold uppercase block">Viral Coefficient</span>
                <p className="text-3xl font-bold text-white font-display">0.24 K-factor</p>
                <span className="text-[10px] text-slate-550 block">Compounding organic multipliers</span>
              </div>
            </div>

            {/* Testimonials and ambassador rankings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Testimonials counter */}
              <div className="glass-panel border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-1.5 font-mono text-slate-900 dark:text-white">
                  <Share2 className="h-4 w-4 text-indigo-500" /> Trust & Social Proof Assets
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4.5 rounded-xl bg-slate-950/60 border border-slate-900 text-center space-y-1">
                    <span className="text-slate-500 text-[10px] font-bold uppercase block">Written Testimonials</span>
                    <span className="text-2xl font-bold text-white font-display">142 assets</span>
                  </div>
                  <div className="p-4.5 rounded-xl bg-slate-950/60 border border-slate-900 text-center space-y-1">
                    <span className="text-slate-500 text-[10px] font-bold uppercase block">Video Testimonials</span>
                    <span className="text-2xl font-bold text-white font-display">28 clips</span>
                  </div>
                  <div className="p-4.5 rounded-xl bg-slate-950/60 border border-slate-900 text-center space-y-1">
                    <span className="text-slate-500 text-[10px] font-bold uppercase block">LinkedIn Shares</span>
                    <span className="text-2xl font-bold text-[#d4af37] font-display">318 posts</span>
                  </div>
                  <div className="p-4.5 rounded-xl bg-slate-950/60 border border-slate-900 text-center space-y-1">
                    <span className="text-slate-500 text-[10px] font-bold uppercase block">Certificate Shares</span>
                    <span className="text-2xl font-bold text-[#d4af37] font-display">184 shares</span>
                  </div>
                </div>
              </div>

              {/* Ambassador leaderboard */}
              <div className="glass-panel border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-1.5 font-mono text-slate-900 dark:text-white">
                  <Trophy className="h-4 w-4 text-amber-500" /> Referral Ambassadors
                </h3>
                <div className="space-y-3">
                  {[
                    { name: "Karan Malhotra", count: "12 referrals", value: "₹2.4 Lakh generated", rank: "Architect" },
                    { name: "Jessica Mercer", count: "8 referrals", value: "₹1.6 Lakh generated", rank: "Architect" },
                    { name: "Sneha Patel", count: "5 referrals", value: "₹24,995 generated", rank: "Seeker" }
                  ].map((amb, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs p-3 rounded-xl bg-slate-950/60 border border-slate-900">
                      <div>
                        <span className="font-bold text-white block">{amb.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono">Ambassador Tier: {amb.rank}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-emerald-450 block text-emerald-455 font-mono">{amb.value}</span>
                        <span className="text-[10px] text-slate-400">{amb.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 7: LEADS CRM LEDGER */}
        {activeCenterTab === "crm" && (
          <motion.div
            key="crm-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              {/* Search inputs */}
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-grow sm:flex-grow-0">
                  <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={crmSearch}
                    onChange={(e) => setCrmSearch(e.target.value)}
                    className="input-field w-full sm:w-60 pl-10 pr-4"
                  />
                </div>

                <select
                  value={crmFilter}
                  onChange={(e) => setCrmFilter(e.target.value as any)}
                  className="select-field sm:w-auto"
                >
                  <option value="All">All Stages</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>

              <span className="text-xs text-slate-500 font-mono">{filteredLeads.length} leads matching</span>
            </div>

            {/* Leads Table */}
            <div className={`overflow-x-auto border rounded-2xl ${
              theme === "light" ? "bg-white border-slate-200" : "bg-slate-900 border-slate-800"
            }`}>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-950/60 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-semibold font-mono">
                    <th className="p-3">Name</th>
                    <th className="p-3">Email Address</th>
                    <th className="p-3">Origin Channel</th>
                    <th className="p-3">Registered</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 text-slate-655 dark:text-slate-350">
                      <td className={`p-3 font-bold ${theme === "light" ? "text-slate-900" : "text-white"}`}>{lead.name}</td>
                      <td className="p-3 font-mono">{lead.email}</td>
                      <td className="p-3">
                        <span className="badge-neutral text-[9px]">
                          {lead.source}
                        </span>
                      </td>
                      <td className="p-3 font-mono">{lead.date}</td>
                      <td className="p-3">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                          className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border focus:outline-none cursor-pointer ${
                            lead.status === "Qualified"
                              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                              : lead.status === "New"
                              ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-500"
                              : lead.status === "Contacted"
                              ? "bg-amber-500/10 border-amber-500/20 text-amber-500"
                              : "bg-rose-500/10 border-rose-500/20 text-rose-500"
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Qualified">Qualified</option>
                          <option value="Lost">Lost</option>
                        </select>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => {
                            deleteLead(lead.id);
                            pushAuditLog(`CRM: Removed lead ${lead.name}`);
                          }}
                          className="p-1 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-950 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredLeads.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500 italic font-light">No CRM leads found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* VIEW 8: EXECUTIVE REPORTS (Vault) */}
        {activeCenterTab === "reports" && (
          <motion.div
            key="reports-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="glass-panel border-slate-800 rounded-3xl p-6 space-y-6">
              <div className="border-b border-slate-900 pb-4">
                <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                  <FileText className="h-4.5 w-4.5 text-indigo-500" /> Executive Report Center
                </h3>
                <p className="text-slate-500 text-xs mt-0.5">Generate, audit, and export consolidated performance summaries for stakeholders.</p>
              </div>

              {/* Reports types list */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: "Daily Operations Briefing", desc: "Leads count, revenue ledger entries, alert flags.", type: "Daily" },
                  { name: "Weekly Performance Audit", desc: "Funnel drop-off points, cohort retention indices, LTV checks.", type: "Weekly" },
                  { name: "Monthly Board Report", desc: "Comprehensive ARR run rate, referral Virality coefficients.", type: "Monthly" },
                  { name: "Quarterly Growth Roadmap", desc: "₹100 Crore gap diagnostics, milestone opportunity charts.", type: "Quarterly" }
                ].map((rep, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-950 border border-slate-900 flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <span className="px-2 py-0.5 rounded bg-indigo-600/10 text-indigo-400 text-[9px] font-mono font-bold uppercase">{rep.type}</span>
                      <h4 className="text-xs font-bold text-white mt-1.5">{rep.name}</h4>
                      <p className="text-[10px] text-slate-500 leading-relaxed font-light">{rep.desc}</p>
                    </div>
                    {/* Exports triggers */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-900">
                      <button
                        onClick={() => triggerToast(`📥 CSV compilation dispatched for ${rep.name}!`)}
                        className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-850 text-[10px] font-bold text-white rounded-lg transition-colors cursor-pointer"
                      >
                        CSV
                      </button>
                      <button
                        onClick={() => triggerToast(`📥 Excel sheet generated for ${rep.name}!`)}
                        className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-850 text-[10px] font-bold text-white rounded-lg transition-colors cursor-pointer"
                      >
                        Excel
                      </button>
                      <button
                        onClick={() => triggerToast(`📥 PDF dynamic print generated for ${rep.name}!`)}
                        className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-850 text-[10px] font-bold text-white rounded-lg transition-colors cursor-pointer"
                      >
                        PDF
                      </button>
                      <button
                        onClick={() => triggerToast(`✉️ Email notification summary queued for stakeholders!`)}
                        className="px-2.5 py-1.5 bg-indigo-600/10 hover:bg-indigo-600/20 text-[10px] font-bold text-indigo-400 rounded-lg transition-colors cursor-pointer"
                      >
                        Email
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
