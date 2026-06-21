"use client";

import { useState, useMemo, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Download,
  Users,
  MousePointer,
  Eye,
  Clock,
  Target,
  Share2,
  Calendar,
  Filter,
  Sparkles,
  RefreshCw,
  ArrowUpRight,
  Search,
  Globe,
  Smartphone,
  Laptop,
  DollarSign,
  CreditCard,
  ArrowRight,
  Play
} from "lucide-react";

// Mock data generator for graph paths based on selected metrics and ranges
const graphDataByRange: Record<string, Record<string, { label: string; value: number }[]>> = {
  "7D": {
    sessions: [
      { label: "Mon", value: 1840 },
      { label: "Tue", value: 2100 },
      { label: "Wed", value: 1980 },
      { label: "Thu", value: 2450 },
      { label: "Fri", value: 2200 },
      { label: "Sat", value: 1750 },
      { label: "Sun", value: 1920 },
    ],
    leads: [
      { label: "Mon", value: 45 },
      { label: "Tue", value: 58 },
      { label: "Wed", value: 51 },
      { label: "Thu", value: 72 },
      { label: "Fri", value: 60 },
      { label: "Sat", value: 38 },
      { label: "Sun", value: 42 },
    ],
    downloads: [
      { label: "Mon", value: 30 },
      { label: "Tue", value: 42 },
      { label: "Wed", value: 35 },
      { label: "Thu", value: 50 },
      { label: "Fri", value: 41 },
      { label: "Sat", value: 25 },
      { label: "Sun", value: 28 },
    ],
  },
  "30D": {
    sessions: [
      { label: "Week 1", value: 12400 },
      { label: "Week 2", value: 14100 },
      { label: "Week 3", value: 13800 },
      { label: "Week 4", value: 15400 },
    ],
    leads: [
      { label: "Week 1", value: 310 },
      { label: "Week 2", value: 380 },
      { label: "Week 3", value: 340 },
      { label: "Week 4", value: 420 },
    ],
    downloads: [
      { label: "Week 1", value: 210 },
      { label: "Week 2", value: 260 },
      { label: "Week 3", value: 230 },
      { label: "Week 4", value: 290 },
    ],
  },
  "90D": {
    sessions: [
      { label: "Month 1", value: 52000 },
      { label: "Month 2", value: 58400 },
      { label: "Month 3", value: 64100 },
    ],
    leads: [
      { label: "Month 1", value: 1250 },
      { label: "Month 2", value: 1480 },
      { label: "Month 3", value: 1610 },
    ],
    downloads: [
      { label: "Month 1", value: 890 },
      { label: "Month 2", value: 1040 },
      { label: "Month 3", value: 1120 },
    ],
  },
};

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<"7D" | "30D" | "90D">("7D");
  const [activeMetric, setActiveMetric] = useState<"sessions" | "leads" | "downloads">("sessions");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [analyticsTab, setAnalyticsTab] = useState<"visitor" | "payments">("visitor");
  
  // Payments & Funnel States
  const [paymentRecords, setPaymentRecords] = useState<any[]>([]);
  const [paymentSearch, setPaymentSearch] = useState("");
  const [newPayForm, setNewPayForm] = useState({
    studentName: "",
    studentEmail: "",
    amount: 4999,
    level: 1,
    paymentPlan: "Fully Paid"
  });

  const DEFAULT_PAYMENTS = [
    { id: "pay_1", studentName: "Jessica Mercer", studentEmail: "jessica@mercer.com", amount: 24999, level: 2, date: "2026-06-19", status: "success", paymentPlan: "Fully Paid" },
    { id: "pay_2", studentName: "Rahul Sen", studentEmail: "rahul@business.com", amount: 4999, level: 1, date: "2026-06-18", status: "success", paymentPlan: "Fully Paid" },
    { id: "pay_3", studentName: "Meera Patel", studentEmail: "meera@patel.com", amount: 4999, level: 1, date: "2026-06-18", status: "success", paymentPlan: "Fully Paid" },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("academy_payments_data");
    if (saved) {
      try {
        setPaymentRecords(JSON.parse(saved));
      } catch (e) {
        setPaymentRecords(DEFAULT_PAYMENTS);
      }
    } else {
      setPaymentRecords(DEFAULT_PAYMENTS);
      localStorage.setItem("academy_payments_data", JSON.stringify(DEFAULT_PAYMENTS));
    }
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPayForm.studentName || !newPayForm.studentEmail) {
      alert("Name and Email are required!");
      return;
    }
    const newRecord = {
      id: "pay_" + Date.now(),
      studentName: newPayForm.studentName,
      studentEmail: newPayForm.studentEmail,
      amount: Number(newPayForm.amount),
      level: Number(newPayForm.level),
      date: new Date().toISOString().split('T')[0],
      status: "success",
      paymentPlan: newPayForm.paymentPlan
    };
    const updated = [newRecord, ...paymentRecords];
    setPaymentRecords(updated);
    localStorage.setItem("academy_payments_data", JSON.stringify(updated));

    // Also push a live audit log if possible
    const savedLogs = localStorage.getItem("gos_audit_logs");
    let currentLogs = [];
    if (savedLogs) {
      try { currentLogs = JSON.parse(savedLogs); } catch (e) {}
    }
    const newLog = {
      id: "log_" + Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      action: `Payment Recorded: Received ₹${newRecord.amount.toLocaleString()} from ${newRecord.studentName}`,
      ip: "192.168.1.102",
      user: "Swapnil Shiwalay"
    };
    localStorage.setItem("gos_audit_logs", JSON.stringify([newLog, ...currentLogs].slice(0, 100)));

    setNewPayForm({
      studentName: "",
      studentEmail: "",
      amount: 4999,
      level: 1,
      paymentPlan: "Fully Paid"
    });
    alert(`Success: Recorded payment of ₹${newRecord.amount.toLocaleString()}!`);
  };

  // Metrics summary based on time range
  const summaryStats = useMemo(() => {
    const multiplier = timeRange === "7D" ? 1 : timeRange === "30D" ? 4.2 : 12.5;
    return {
      sessions: {
        value: Math.round(14840 * multiplier).toLocaleString(),
        change: "+12.4%",
        isPositive: true,
      },
      leads: {
        value: Math.round(382 * multiplier).toLocaleString(),
        change: "+8.2%",
        isPositive: true,
      },
      downloads: {
        value: Math.round(274 * multiplier).toLocaleString(),
        change: "+15.1%",
        isPositive: true,
      },
      convRate: {
        value: (timeRange === "7D" ? "2.57%" : timeRange === "30D" ? "2.71%" : "2.83%"),
        change: "+0.3%",
        isPositive: true,
      },
    };
  }, [timeRange]);

  const trafficSources = [
    { source: "Organic Search (Google)", sessions: "6,240", percentage: 42, icon: Globe },
    { source: "LinkedIn Profile / Posts", sessions: "4,150", percentage: 28, icon: Share2 },
    { source: "YouTube Ecosystem", sessions: "2,230", percentage: 15, icon: Eye },
    { source: "Direct (Brand Search)", sessions: "1,480", percentage: 10, icon: Target },
    { source: "Email Newsletters", sessions: "740", percentage: 5, icon: Clock },
  ];

  const resourceDownloads = [
    { title: "AI-Powered Business Ecosystem Blueprint", type: "PDF Guide", downloads: 412, convRate: "34.2%", status: "Active" },
    { title: "Digital Architect Growth Stack Checklist", type: "Notion Sheet", downloads: 289, convRate: "28.5%", status: "Active" },
    { title: "High-Ticket Knowledge Monetization Strategy", type: "Video Masterclass", downloads: 198, convRate: "19.8%", status: "Active" },
    { title: "7-Figure Automation Triggers Workbook", type: "Excel Sheet", downloads: 145, convRate: "12.4%", status: "Active" },
    { title: "Premium Brand Positioning Playbook", type: "PDF Guide", downloads: 92, convRate: "8.1%", status: "Draft" },
  ];

  const filteredResources = resourceDownloads.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // SVG Chart Calculation
  const currentChartData = graphDataByRange[timeRange][activeMetric];
  const maxVal = Math.max(...currentChartData.map((d) => d.value)) * 1.15;
  const chartHeight = 220;
  const chartWidth = 720;
  const points = currentChartData.map((d, index) => {
    const x = (index / (currentChartData.length - 1)) * (chartWidth - 40) + 20;
    const y = chartHeight - (d.value / maxVal) * (chartHeight - 40) - 20;
    return { x, y, label: d.label, val: d.value };
  });

  const pathD = points.length
    ? `M ${points[0].x} ${points[0].y} ` + points.slice(1).map((p) => `L ${p.x} ${p.y}`).join(" ")
    : "";

  const areaD = points.length
    ? `${pathD} L ${points[points.length - 1].x} ${chartHeight - 20} L ${points[0].x} ${chartHeight - 20} Z`
    : "";

  const exportAnalyticsCSV = () => {
    const headers = "Date Range,Metric,Label,Value\n";
    const rows = currentChartData
      .map((d) => `"${timeRange}","${activeMetric}","${d.label}",${d.value}`)
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", `swapnilonline_analytics_${activeMetric}_${timeRange}.csv`);
    a.click();
  };

  return (
    <div className="space-y-8">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-white">Ecosystem Analytics Center</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Performance metrics tracking audience growth, asset engagement, and lead conversion rates.
          </p>
        </div>

        {/* Time filters & Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-slate-950 border border-slate-900 rounded-lg p-1 flex">
            {(["7D", "30D", "90D"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  timeRange === r
                    ? "bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/25"
                    : "text-slate-400 hover:text-slate-200 border border-transparent"
                }`}
              >
                {r === "7D" ? "7 Days" : r === "30D" ? "30 Days" : "90 Days"}
              </button>
            ))}
          </div>

          <button
            onClick={handleRefresh}
            className={`p-2 rounded-lg bg-slate-950 border border-slate-900 text-slate-400 hover:text-white cursor-pointer transition-colors ${
              isRefreshing ? "animate-spin text-[#d4af37]" : ""
            }`}
            title="Refresh statistics"
          >
            <RefreshCw className="h-4.5 w-4.5" />
          </button>

          <button
            onClick={exportAnalyticsCSV}
            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-[#f3e5ab]/10 to-[#d4af37]/10 hover:from-[#f3e5ab]/15 hover:to-[#d4af37]/15 text-white border border-[#d4af37]/35 rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            <Download className="h-3.5 w-3.5 text-[#d4af37]" /> Export Data
          </button>
        </div>
      </div>

      {/* SUB-TABS NAVIGATION */}
      <div className="flex border-b border-slate-900 gap-1 pb-1 overflow-x-auto">
        <button
          onClick={() => setAnalyticsTab("visitor")}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-t-lg transition-all cursor-pointer ${
            analyticsTab === "visitor"
              ? "bg-slate-950 border-t-2 border-[#d4af37] text-white border-x border-x-slate-900"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Users className="h-3.5 w-3.5" /> Visitor Trends
        </button>
        <button
          onClick={() => setAnalyticsTab("payments")}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-t-lg transition-all cursor-pointer ${
            analyticsTab === "payments"
              ? "bg-slate-950 border-t-2 border-[#d4af37] text-white border-x border-x-slate-900"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <TrendingUp className="h-3.5 w-3.5" /> Payments & Funnel Analytics
        </button>
      </div>

      {analyticsTab === "visitor" && (
        <>
          {/* Main Metrics Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1 */}
        <div
          onClick={() => setActiveMetric("sessions")}
          className={`glass-panel rounded-xl p-5 space-y-4 cursor-pointer transition-all border ${
            activeMetric === "sessions"
              ? "border-[#d4af37] bg-[#d4af37]/5 shadow-[0_0_20px_rgba(212,175,55,0.05)]"
              : "border-slate-800 hover:border-slate-700"
          }`}
        >
          <div className="flex justify-between items-center">
            <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Traffic</span>
            <Users className={`h-4.5 w-4.5 ${activeMetric === "sessions" ? "text-indigo-500" : "text-slate-400"}`} />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white font-display">{summaryStats.sessions.value}</span>
            <span className="text-emerald-400 text-xs font-semibold flex items-center gap-0.5">
              <TrendingUp className="h-3 w-3" /> {summaryStats.sessions.change}
            </span>
          </div>
          <p className="text-[10px] text-slate-500">Unique user visitor sessions</p>
        </div>

        {/* Metric 2 */}
        <div
          onClick={() => setActiveMetric("leads")}
          className={`glass-panel rounded-xl p-5 space-y-4 cursor-pointer transition-all border ${
            activeMetric === "leads"
              ? "border-indigo-600 bg-indigo-600/5 shadow-[0_0_20px_rgba(79,70,229,0.05)]"
              : "border-slate-800 hover:border-slate-700"
          }`}
        >
          <div className="flex justify-between items-center">
            <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Leads</span>
            <Target className={`h-4.5 w-4.5 ${activeMetric === "leads" ? "text-indigo-500" : "text-slate-400"}`} />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white font-display">{summaryStats.leads.value}</span>
            <span className="text-emerald-400 text-xs font-semibold flex items-center gap-0.5">
              <TrendingUp className="h-3 w-3" /> {summaryStats.leads.change}
            </span>
          </div>
          <p className="text-[10px] text-slate-500">Contact forms & audit inquiries</p>
        </div>

        {/* Metric 3 */}
        <div
          onClick={() => setActiveMetric("downloads")}
          className={`glass-panel rounded-xl p-5 space-y-4 cursor-pointer transition-all border ${
            activeMetric === "downloads"
              ? "border-indigo-600 bg-indigo-600/5 shadow-[0_0_20px_rgba(79,70,229,0.05)]"
              : "border-slate-800 hover:border-slate-700"
          }`}
        >
          <div className="flex justify-between items-center">
            <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Asset Downloads</span>
            <Download className={`h-4.5 w-4.5 ${activeMetric === "downloads" ? "text-indigo-500" : "text-slate-400"}`} />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white font-display">{summaryStats.downloads.value}</span>
            <span className="text-emerald-400 text-xs font-semibold flex items-center gap-0.5">
              <TrendingUp className="h-3 w-3" /> {summaryStats.downloads.change}
            </span>
          </div>
          <p className="text-[10px] text-slate-500">Blueprints & checklists generated</p>
        </div>

        {/* Metric 4 */}
        <div className="glass-panel border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Opt-In Rate</span>
            <MousePointer className="h-4.5 w-4.5 text-slate-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white font-display">{summaryStats.convRate.value}</span>
            <span className="text-emerald-400 text-xs font-semibold flex items-center gap-0.5">
              <TrendingUp className="h-3 w-3" /> {summaryStats.convRate.change}
            </span>
          </div>
          <p className="text-[10px] text-slate-500">Average traffic to lead conversion</p>
        </div>
      </div>

      {/* Dynamic Graph Section */}
      <div className="glass-panel border-slate-800 rounded-xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-4">
          <div>
            <h3 className="text-lg font-bold font-display text-white">
              Ecosystem Growth Trend
            </h3>
            <p className="text-slate-500 text-xs mt-0.5">
              Showing {activeMetric} distribution across the selected timeframe ({timeRange}).
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950 px-3 py-1 rounded border border-slate-900">
            <Sparkles className="h-3.5 w-3.5 text-[#d4af37]" /> Data streams updated hourly
          </div>
        </div>

        {/* Custom SVG Line Chart */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[640px] h-[260px] relative">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d4af37" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="20" y1="20" x2={chartWidth - 20} y2="20" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3,3" />
              <line x1="20" y1="70" x2={chartWidth - 20} y2="70" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3,3" />
              <line x1="20" y1="120" x2={chartWidth - 20} y2="120" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3,3" />
              <line x1="20" y1="170" x2={chartWidth - 20} y2="170" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3,3" />
              <line x1="20" y1={chartHeight - 20} x2={chartWidth - 20} y2={chartHeight - 20} stroke="#334155" strokeWidth="1" />

              {/* Area Under Path */}
              {areaD && <path d={areaD} fill="url(#chartGradient)" />}

              {/* Main Line Path */}
              {pathD && (
                <path
                  d={pathD}
                  fill="none"
                  stroke="#d4af37"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Interactive Dots & Text Labels */}
              {points.map((p, idx) => (
                <g key={idx} className="group cursor-pointer">
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="4"
                    fill="#030a16"
                    stroke="#d4af37"
                    strokeWidth="2"
                    className="hover:r-6 transition-all duration-150"
                  />
                  {/* Tooltip Hover Overlay */}
                  <text
                    x={p.x}
                    y={p.y - 12}
                    textAnchor="middle"
                    className="text-[9px] font-bold fill-white font-display hidden group-hover:block bg-slate-900"
                  >
                    {p.val.toLocaleString()}
                  </text>
                  {/* Bottom Label Axis */}
                  <text
                    x={p.x}
                    y={chartHeight - 4}
                    textAnchor="middle"
                    className="text-[10px] font-medium fill-slate-500 font-display"
                  >
                    {p.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Traffic Channels */}
        <div className="lg:col-span-6 glass-panel border-slate-800 rounded-xl p-6 space-y-6">
          <div className="border-b border-slate-900 pb-3 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold font-display text-white">Acquisition Channels</h3>
              <p className="text-slate-500 text-xs mt-0.5">Top referrers feeding into the business ecosystem.</p>
            </div>
            <Globe className="h-4.5 w-4.5 text-[#d4af37]" />
          </div>

          <div className="space-y-4.5">
            {trafficSources.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Icon className="h-3.5 w-3.5 text-[#d4af37]/80" />
                      <span className="font-semibold">{item.source}</span>
                    </div>
                    <div className="text-slate-400 font-bold font-display">
                      {item.sessions} <span className="text-[10px] text-slate-500 font-normal">({item.percentage}%)</span>
                    </div>
                  </div>
                  {/* Progress Line */}
                  <div className="w-full h-2 bg-slate-950 border border-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#f3e5ab]/60 to-[#d4af37] rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Technical Device / User Agent Analytics */}
        <div className="lg:col-span-6 glass-panel border-slate-800 rounded-xl p-6 space-y-6">
          <div className="border-b border-slate-900 pb-3 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold font-display text-white">Device Breakdown</h3>
              <p className="text-slate-500 text-xs mt-0.5">Platforms used by clients booking calls and audits.</p>
            </div>
            <Laptop className="h-4.5 w-4.5 text-[#d4af37]" />
          </div>

          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="bg-slate-950 border border-slate-900 p-4 rounded-xl text-center space-y-2">
              <Laptop className="h-5 w-5 text-[#d4af37] mx-auto" />
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Desktop</p>
              <p className="text-2xl font-bold text-white font-display">74.5%</p>
              <p className="text-[9px] text-slate-500 leading-none">High-intent desktop forms</p>
            </div>
            <div className="bg-slate-950 border border-slate-900 p-4 rounded-xl text-center space-y-2">
              <Smartphone className="h-5 w-5 text-[#d4af37] mx-auto" />
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Mobile</p>
              <p className="text-2xl font-bold text-white font-display">22.1%</p>
              <p className="text-[9px] text-slate-500 leading-none">LinkedIn mobile webview</p>
            </div>
            <div className="bg-slate-950 border border-slate-900 p-4 rounded-xl text-center space-y-2">
              <Globe className="h-5 w-5 text-[#d4af37] mx-auto" />
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Tablet / Other</p>
              <p className="text-2xl font-bold text-white font-display">3.4%</p>
              <p className="text-[9px] text-slate-500 leading-none">Newsletters embeds</p>
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-900 p-3.5 rounded-lg flex items-start gap-2.5">
            <Clock className="h-4 w-4 text-[#d4af37] shrink-0 mt-0.5" />
            <div className="leading-tight space-y-0.5">
              <p className="text-white text-xs font-bold">Performance Note</p>
              <p className="text-slate-400 text-[10px] leading-relaxed">
                Desktop users convert at a 4.1% rate, while mobile users convert at 1.8%. We recommend prioritizing desktop layout for complex ecosystem frameworks.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Asset Download & Magnet Performance */}
      <div className="glass-panel border-slate-800 rounded-xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-4">
          <div>
            <h3 className="text-lg font-bold font-display text-white">Lead Magnet Performance</h3>
            <p className="text-slate-500 text-xs mt-0.5">Downloads and opt-in conversion percentages for free digital assets.</p>
          </div>
          {/* Search Magnet */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search resource..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-900 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d4af37] transition-all"
            />
          </div>
        </div>

        {/* Resources Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-900 text-slate-400 text-xs font-semibold">
                <th className="py-3 px-4">Resource Asset</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4 text-right">Downloads ({timeRange})</th>
                <th className="py-3 px-4 text-right">Conversion Rate</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900 text-xs">
              {filteredResources.length > 0 ? (
                filteredResources.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/30 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white font-display">
                      {item.title}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      <span className="px-2.5 py-1 bg-slate-950 border border-slate-900 rounded-md text-[10px] font-semibold">
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right text-white font-bold font-display">
                      {Math.round(item.downloads * (timeRange === "7D" ? 1 : timeRange === "30D" ? 4.2 : 12.5)).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-right text-emerald-400 font-semibold">
                      {item.convRate}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-slate-500">
                    No resources matching search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )}

      {analyticsTab === "payments" && (
        <div className="space-y-8 animate-fadeIn">
          {/* MRR and Funnel Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-panel border-slate-800 rounded-xl p-5 space-y-3">
              <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider block">Monthly Recurring (MRR)</span>
              <p className="text-2xl font-bold text-amber-500 font-display">₹450,000</p>
              <p className="text-[10px] text-slate-500">Compounding retainer support retainers</p>
            </div>
            <div className="glass-panel border-slate-800 rounded-xl p-5 space-y-3">
              <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider block">Annual Recurring (ARR)</span>
              <p className="text-2xl font-bold text-white font-display">₹5,400,000</p>
              <p className="text-[10px] text-slate-500">Projected yearly ecosystem yield</p>
            </div>
            <div className="glass-panel border-slate-800 rounded-xl p-5 space-y-3">
              <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider block">Total Gross Revenue</span>
              <p className="text-2xl font-bold text-emerald-400 font-display">₹1,842,500</p>
              <p className="text-[10px] text-slate-500">Lifetime GOS transacted value</p>
            </div>
            <div className="glass-panel border-slate-800 rounded-xl p-5 space-y-3">
              <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider block">Conversion Yield</span>
              <p className="text-2xl font-bold text-white font-display">14.2%</p>
              <p className="text-[10px] text-slate-500">Visitor-to-Masterclass application opt-in</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: VSL Funnel Stages */}
            <div className="lg:col-span-7 glass-panel border-slate-800 rounded-xl p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                  <Play className="h-4 w-4 text-[#d4af37]" /> VSL Funnel Conversion Metrics
                </h3>
                <p className="text-slate-500 text-xs mt-0.5">High-ticket video sales letter funnel drop-off stats.</p>
              </div>

              {/* Conversion Pipeline Flowchart */}
              <div className="space-y-4 pt-2">
                {[
                  { stage: "1. VSL Landing Page Views", val: 15240, pct: 100, drop: "0% drop" },
                  { stage: "2. Watched 50%+ (Briefing VSL)", val: 4820, pct: 31.6, drop: "-68.4% drop" },
                  { stage: "3. Diagnostic Survey Clicked", val: 2150, pct: 14.1, drop: "-55.4% drop" },
                  { stage: "4. Qualified Applications", val: 840, pct: 5.5, drop: "-60.9% drop" },
                  { stage: "5. Outbound Strategy Calls Booked", val: 137, pct: 0.9, drop: "-83.7% drop" },
                  { stage: "6. Academy Sales Closed (L1/L2)", val: 22, pct: 0.14, drop: "-83.9% drop" }
                ].map((item, index) => (
                  <div key={index} className="space-y-1.5 relative">
                    {index < 5 && (
                      <div className="absolute left-[9px] top-6 bottom-[-20px] w-0.5 bg-slate-900 border-l border-dashed border-slate-800 -z-10" />
                    )}
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-805 text-[10px] text-slate-400 flex items-center justify-center font-bold font-mono">
                          {index + 1}
                        </span>
                        <span className="font-semibold text-slate-200">{item.stage}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-white font-bold font-mono">{item.val.toLocaleString()} </span>
                        <span className="text-slate-550 text-[10px]">({item.pct}%)</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pl-8">
                      <div className="flex-grow h-2 bg-slate-950 border border-slate-900 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-rose-500 font-bold w-18 text-right shrink-0">{item.drop}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Record Transaction Form */}
            <div className="lg:col-span-5 glass-panel border-slate-800 rounded-xl p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-indigo-500" /> Record Transaction
                </h3>
                <p className="text-slate-500 text-xs mt-0.5">Manually record client academy upgrade payments.</p>
              </div>

              <form onSubmit={handleRecordPayment} className="space-y-4">
                <div>
                  <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Student Name</label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    value={newPayForm.studentName}
                    onChange={(e) => setNewPayForm({ ...newPayForm, studentName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-900 rounded-lg p-2.5 text-xs text-white placeholder-slate-650 focus:outline-none focus:border-[#d4af37] transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-505 font-bold uppercase block mb-1">Student Email</label>
                  <input
                    type="email"
                    placeholder="e.g. john@doe.com"
                    value={newPayForm.studentEmail}
                    onChange={(e) => setNewPayForm({ ...newPayForm, studentEmail: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-900 rounded-lg p-2.5 text-xs text-white placeholder-slate-650 focus:outline-none focus:border-[#d4af37] transition-colors"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Amount (INR)</label>
                    <input
                      type="number"
                      value={newPayForm.amount}
                      onChange={(e) => setNewPayForm({ ...newPayForm, amount: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-900 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Cohort Tier</label>
                    <select
                      value={newPayForm.level}
                      onChange={(e) => setNewPayForm({ ...newPayForm, level: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-900 rounded-lg p-2.5 text-xs text-white cursor-pointer focus:outline-none focus:border-[#d4af37] transition-colors"
                    >
                      <option value={1}>L1: Foundations (₹4,999)</option>
                      <option value={2}>L2: Systems (₹24,999)</option>
                      <option value={3}>L3: Quantum (₹99,990)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Payment Plan</label>
                  <select
                    value={newPayForm.paymentPlan}
                    onChange={(e) => setNewPayForm({ ...newPayForm, paymentPlan: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-900 rounded-lg p-2.5 text-xs text-white cursor-pointer focus:outline-none focus:border-[#d4af37] transition-colors"
                  >
                    <option value="Fully Paid">Fully Paid</option>
                    <option value="3x EMI Installment">3x EMI Installment</option>
                    <option value="Scholarship Grant">Scholarship Grant</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] text-[#030a16] py-2.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wider hover:opacity-95 cursor-pointer"
                >
                  Record Payment Entry
                </button>
              </form>
            </div>
          </div>

          {/* Stateful Transactions Directory */}
          <div className="glass-panel border-slate-800 rounded-xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-4">
              <div>
                <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                  <DollarSign className="h-4.5 w-4.5 text-[#d4af37]" /> Transacted Capital Ledger
                </h3>
                <p className="text-slate-500 text-xs mt-0.5">Live stateful receipt logs matching student accounts.</p>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={paymentSearch}
                  onChange={(e) => setPaymentSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-900 rounded-lg text-xs text-white placeholder-slate-550 focus:outline-none focus:border-[#d4af37] transition-colors"
                />
              </div>
            </div>

            <div className="overflow-x-auto border border-slate-900 rounded-xl bg-slate-950/40">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-900">
                    <th className="p-4">Receipt ID</th>
                    <th className="p-4">Student Account</th>
                    <th className="p-4 text-right">Paid Amount</th>
                    <th className="p-4 text-center">Enrollment Ladder</th>
                    <th className="p-4">Payment Schedule</th>
                    <th className="p-4">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900 text-slate-300">
                  {paymentRecords
                    .filter(p =>
                      p.studentName.toLowerCase().includes(paymentSearch.toLowerCase()) ||
                      p.studentEmail.toLowerCase().includes(paymentSearch.toLowerCase()) ||
                      p.id.toLowerCase().includes(paymentSearch.toLowerCase())
                    )
                    .map((pay) => (
                      <tr key={pay.id} className="hover:bg-slate-900/10">
                        <td className="p-4 font-mono text-indigo-400 font-semibold">{pay.id}</td>
                        <td className="p-4">
                          <span className="font-bold text-white block">{pay.studentName}</span>
                          <span className="text-[10px] text-slate-550 block">{pay.studentEmail}</span>
                        </td>
                        <td className="p-4 text-right font-bold text-emerald-400 font-mono">
                          ₹{pay.amount.toLocaleString("en-IN")}
                        </td>
                        <td className="p-4 text-center">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${
                            pay.level === 3 
                              ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                              : pay.level === 2
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : "bg-slate-900 text-slate-400 border-slate-800"
                          }`}>
                            L{pay.level}: {pay.level === 1 ? "Foundations" : pay.level === 2 ? "Systems" : "Quantum"}
                          </span>
                        </td>
                        <td className="p-4 font-semibold text-slate-350">{pay.paymentPlan}</td>
                        <td className="p-4 text-slate-500 font-mono">{pay.date}</td>
                      </tr>
                    ))}
                  {paymentRecords.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-500 italic">No receipts logged.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
