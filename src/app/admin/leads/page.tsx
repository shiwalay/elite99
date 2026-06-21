"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Search,
  Filter,
  CheckCircle,
  FileSpreadsheet,
  Trash2,
  Bookmark,
  MessageSquare,
  TrendingUp,
  UserCheck,
  Layers,
  Copy,
  Archive,
  Save,
  Award,
  Sparkles,
  X,
  FileText,
  Check,
  Plus,
  Zap,
  Activity
} from "lucide-react";
import { useAdminTheme } from "@/components/AdminThemeContext";
import { DEFAULT_COHORTS, DEFAULT_COURSES, Cohort } from "../../academy/courses-data";

interface Lead {
  id: string;
  name: string;
  email: string;
  mobile: string;
  businessType: string;
  monthlyRevenue: string;
  challenge: string;
  notes: string;
  status: "New" | "Contacted" | "Qualified" | "Won" | "Lost";
  source: string;
  date: string;
  score?: number;
  tier?: string;
}

interface Ambassador {
  name: string;
  email: string;
  clicks: number;
  leads: number;
  sales: number;
  commission: string;
  link: string;
}

interface Mentor {
  name: string;
  role: string;
  satisfaction: number;
  managed: number;
  reviews: number;
  responseTime: string;
}

const DEFAULT_LMS_STUDENTS = [
  { 
    name: "Jessica Mercer", 
    email: "jessica@mercer.com", 
    cohortId: "cohort_l2_june", 
    rank: "Architect", 
    xp: 3450, 
    completions: 8, 
    avatarColor: "bg-indigo-600", 
    level: 2, 
    attendance: 90, 
    completedLessons: ["c1_l1", "c1_l2", "c1_l3", "c2_l1", "c2_l2", "c3_l1", "c3_l2", "c7_l1"], 
    passedQuizzes: ["c1", "c2", "c3"], 
    streakDays: 12, 
    badges: ["Course Champion", "Implementation Expert"],
    recommendation: false,
    country: "United States",
    regDate: "2026-05-10",
    watchTime: "4h 25m",
    webinarCount: 8,
    purchases: [{ item: "ELITE 90™ Core Systems (L2)", date: "2026-05-10", price: "₹24,999" }]
  },
  { 
    name: "Rahul Sen", 
    email: "rahul@business.com", 
    cohortId: "cohort_l1_june", 
    rank: "Builder", 
    xp: 2150, 
    completions: 5, 
    avatarColor: "bg-[#d4af37]", 
    level: 1, 
    attendance: 80, 
    completedLessons: ["c1_l1", "c1_l2", "c1_l3", "c2_l1", "c2_l2"], 
    passedQuizzes: ["c1"], 
    streakDays: 5, 
    badges: ["Fast Learner"],
    recommendation: false,
    country: "India",
    regDate: "2026-06-01",
    watchTime: "2h 10m",
    webinarCount: 3,
    purchases: [{ item: "ELITE 90™ Foundations (L1)", date: "2026-06-01", price: "₹4,999" }]
  },
  { 
    name: "Meera Patel", 
    email: "meera@patel.com", 
    cohortId: "cohort_l1_june", 
    rank: "Builder", 
    xp: 1820, 
    completions: 4, 
    avatarColor: "bg-emerald-600", 
    level: 1, 
    attendance: 75, 
    completedLessons: ["c1_l1", "c1_l2", "c1_l3", "c2_l1"], 
    passedQuizzes: ["c1"], 
    streakDays: 4, 
    badges: [],
    recommendation: false,
    country: "India",
    regDate: "2026-06-03",
    watchTime: "1h 50m",
    webinarCount: 2,
    purchases: [{ item: "ELITE 90™ Foundations (L1)", date: "2026-06-03", price: "₹4,999" }]
  }
];

const DEFAULT_AMBASSADORS: Ambassador[] = [
  { name: "Meera Patel", email: "meera@patel.com", clicks: 342, leads: 48, sales: 12, commission: "₹45,000", link: "swapnilonline.com?ref=meera" },
  { name: "Anish Roy", email: "anish@roy.com", clicks: 120, leads: 15, sales: 3, commission: "₹14,997", link: "swapnilonline.com?ref=anish" },
];

const DEFAULT_MENTORS: Mentor[] = [
  { name: "Suresh Gupta", role: "Principal Tech Mentor", satisfaction: 94, managed: 32, reviews: 180, responseTime: "2.4 hours" },
  { name: "Arpita Sharma", role: "Systems Design Mentor", satisfaction: 98, managed: 28, reviews: 145, responseTime: "1.8 hours" },
];

const defaultLeads: Lead[] = [
  {
    id: "lead_1",
    name: "Dr. Amit Roy",
    email: "amit@royclinic.com",
    mobile: "+91 98223 11442",
    businessType: "Doctor / Clinic Owner",
    monthlyRevenue: "₹500,000 - ₹2,000,000 / month ($6k - $24k)",
    challenge: "Inconsistent Lead Generation",
    notes: "Met on LinkedIn. Interested in building a patient acquisition funnel with AI follow-up routing.",
    status: "New",
    source: "Web Form",
    date: "2026-06-20",
    score: 65,
    tier: "Hot"
  },
  {
    id: "lead_2",
    name: "Jessica Mercer",
    email: "jessica@mercerconsulting.com",
    mobile: "+1 (415) 882-9901",
    businessType: "Coach / Consultant / Speaker",
    monthlyRevenue: "₹2,000,000+ / month ($24k+)",
    challenge: "Difficulty Scaling Beyond Referrals",
    notes: "Wants to package her proprietary executive leadership modules into a premium group community portal.",
    status: "Contacted",
    source: "Masterclass Squeeze",
    date: "2026-06-19",
    score: 85,
    tier: "Customer"
  },
  {
    id: "lead_3",
    name: "Vinay Kumar",
    email: "vinay@kumartech.in",
    mobile: "+91 77651 88902",
    businessType: "CEO / Business Owner",
    monthlyRevenue: "₹100,000 - ₹500,000 / month ($1.2k - $6k)",
    challenge: "No Automated Marketing/Sales Funnels",
    notes: "Struggling with administrative time loss. Seeking Zapier triggers mapping calendar schedule.",
    status: "Qualified",
    source: "Checklist Download",
    date: "2026-06-18",
    score: 45,
    tier: "Warm"
  },
];

export default function LeadsCrmPage() {
  const { theme } = useAdminTheme();
  const [activeSubTab, setActiveSubTab] = useState<"leads" | "students" | "cohorts" | "referrals">("leads");

  // ==========================================
  // TAB 1: LEADS CRM DATABASE STATES & HANDLERS
  // ==========================================
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>(" ");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadNoteText, setLeadNoteText] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("crm_leads_data");
    if (saved) {
      try { setLeads(JSON.parse(saved)); } catch (e) { setLeads(defaultLeads); }
    } else {
      setLeads(defaultLeads);
      localStorage.setItem("crm_leads_data", JSON.stringify(defaultLeads));
    }
  }, []);

  const saveLeadsToStorage = (updatedLeads: Lead[]) => {
    setLeads(updatedLeads);
    localStorage.setItem("crm_leads_data", JSON.stringify(updatedLeads));
  };

  const handleUpdateStatus = (id: string, status: Lead["status"]) => {
    const updated = leads.map((l) => (l.id === id ? { ...l, status } : l));
    saveLeadsToStorage(updated);
    if (selectedLead?.id === id) {
      setSelectedLead((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const handleAddLeadNote = (id: string) => {
    if (!leadNoteText.trim()) return;
    const updated = leads.map((l) => (l.id === id ? { ...l, notes: leadNoteText } : l));
    saveLeadsToStorage(updated);
    if (selectedLead?.id === id) {
      setSelectedLead((prev) => (prev ? { ...prev, notes: leadNoteText } : null));
    }
    setLeadNoteText("");
  };

  const handleDeleteLead = (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    const filtered = leads.filter((l) => l.id !== id);
    saveLeadsToStorage(filtered);
    setSelectedLead(null);
  };

  const handleExportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Business Type", "Monthly Revenue", "Primary Challenge", "Status", "Source", "Date", "Notes"];
    const rows = leads.map((l) => [
      l.name,
      l.email,
      l.mobile,
      l.businessType,
      l.monthlyRevenue,
      l.challenge,
      l.status,
      l.source,
      l.date,
      l.notes.replace(/\n/g, " "),
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.map((val) => `"${val}"`).join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `crm_leads_export_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = filterStatus === "All" || lead.status === filterStatus;
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !q ||
      lead.name.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      lead.challenge.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  // ==========================================
  // TAB 2: STUDENT DIRECTORY CRM STATES & HANDLERS
  // ==========================================
  const [lmsStudents, setLmsStudents] = useState<any[]>([]);
  const [selectedCrmStudent, setSelectedCrmStudent] = useState<any | null>(null);
  const [modalTab, setModalTab] = useState<"dossier" | "quests" | "financials" | "community" | "quizzes">("dossier");
  const [editingNoteText, setEditingNoteText] = useState("");
  const [mentorNotes, setMentorNotes] = useState<Record<string, string>>({});

  // Student list filters
  const [filterLevel, setFilterLevel] = useState("all");
  const [filterCohort, setFilterCohort] = useState("all");
  const [filterHealth, setFilterHealth] = useState("all");
  const [filterCountry, setFilterCountry] = useState("all");
  const [filterProgress, setFilterProgress] = useState("all");

  useEffect(() => {
    const savedLmsStudents = localStorage.getItem("academy_leaderboard_data");
    if (savedLmsStudents) {
      try { setLmsStudents(JSON.parse(savedLmsStudents)); } catch (e) { setLmsStudents(DEFAULT_LMS_STUDENTS); }
    } else {
      setLmsStudents(DEFAULT_LMS_STUDENTS);
      localStorage.setItem("academy_leaderboard_data", JSON.stringify(DEFAULT_LMS_STUDENTS));
    }

    const savedNotes = localStorage.getItem("academy_mentor_notes");
    if (savedNotes) {
      try { setMentorNotes(JSON.parse(savedNotes)); } catch (e) {}
    }
  }, []);

  const getEnrichedStudent = (s: any) => {
    if (!s) return null;
    const complCount = s.completedLessons?.length || 0;
    const progressPercent = Math.min(100, Math.round((complCount / 12) * 100)); // assumes 12 lessons total
    const attendancePercent = s.attendance || 80;
    const quizzesCount = s.passedQuizzes?.length || 0;
    const healthScore = Math.round((progressPercent * 0.4) + (attendancePercent * 0.4) + ((quizzesCount > 0 ? 100 : 50) * 0.2));
    
    return {
      ...s,
      progressPercent,
      attendancePercent,
      healthScore,
      country: s.country || "India",
      regDate: s.regDate || "2026-06-01",
      watchTime: s.watchTime || "2h 30m",
      webinarCount: s.webinarCount || 3,
      purchases: s.purchases || [{ item: "ELITE 90™ Core Course (L1)", date: s.regDate || "2026-06-01", price: "₹4,999" }]
    };
  };

  const handleUpdateLevelInModal = (name: string, level: number) => {
    const updated = lmsStudents.map((s) => (s.name === name ? { ...s, level } : s));
    setLmsStudents(updated);
    localStorage.setItem("academy_leaderboard_data", JSON.stringify(updated));
    if (selectedCrmStudent && selectedCrmStudent.name === name) {
      setSelectedCrmStudent((prev: any) => ({ ...prev, level }));
    }
  };

  const handleUpdateRecommendationInModal = (email: string, val: boolean) => {
    const updated = lmsStudents.map(s => s.email === email ? { ...s, recommendation: val } : s);
    setLmsStudents(updated);
    localStorage.setItem("academy_leaderboard_data", JSON.stringify(updated));
    if (selectedCrmStudent && selectedCrmStudent.email === email) {
      setSelectedCrmStudent((prev: any) => ({ ...prev, recommendation: val }));
    }
  };

  const handleSaveMentorNotes = (email: string) => {
    const updatedNotes = { ...mentorNotes, [email]: editingNoteText };
    setMentorNotes(updatedNotes);
    localStorage.setItem("academy_mentor_notes", JSON.stringify(updatedNotes));
    alert("Mentor audit notes saved statefully.");
  };

  const handleAwardBadge = (email: string, badgeName: string) => {
    const studentObj = lmsStudents.find(s => s.email === email);
    if (!studentObj) return;
    const currentBadges = studentObj.badges || [];
    let updatedBadges = [...currentBadges];
    if (currentBadges.includes(badgeName)) {
      updatedBadges = updatedBadges.filter(b => b !== badgeName);
    } else {
      updatedBadges.push(badgeName);
    }
    const updated = lmsStudents.map(s => s.email === email ? { ...s, badges: updatedBadges } : s);
    setLmsStudents(updated);
    localStorage.setItem("academy_leaderboard_data", JSON.stringify(updated));
    if (selectedCrmStudent && selectedCrmStudent.email === email) {
      setSelectedCrmStudent((prev: any) => ({ ...prev, badges: updatedBadges }));
    }
  };

  const handleAdjustXP = (email: string, amount: number) => {
    const updated = lmsStudents.map(s => {
      if (s.email === email) {
        const nextXp = Math.max(0, (s.xp || 0) + amount);
        let rank = s.rank;
        if (nextXp >= 3000) rank = "Architect";
        else if (nextXp >= 2000) rank = "Builder";
        else rank = "Explorer";
        return { ...s, xp: nextXp, rank };
      }
      return s;
    });
    setLmsStudents(updated);
    localStorage.setItem("academy_leaderboard_data", JSON.stringify(updated));
    if (selectedCrmStudent && selectedCrmStudent.email === email) {
      const updatedS = updated.find(s => s.email === email);
      setSelectedCrmStudent(updatedS);
    }
  };

  const enrichedStudents = lmsStudents.map(getEnrichedStudent);
  const filteredStudents = enrichedStudents.filter((student) => {
    if (!student) return false;
    if (filterLevel !== "all" && student.level?.toString() !== filterLevel) return false;
    if (filterCohort !== "all" && student.cohortId !== filterCohort) return false;
    if (filterHealth !== "all") {
      if (filterHealth === "risk" && student.healthScore >= 50) return false;
      if (filterHealth === "warning" && (student.healthScore < 50 || student.healthScore >= 70)) return false;
      if (filterHealth === "high" && student.healthScore < 70) return false;
    }
    if (filterCountry !== "all" && student.country.toLowerCase() !== filterCountry.toLowerCase()) return false;
    if (filterProgress !== "all") {
      if (filterProgress === "high" && student.progressPercent <= 75) return false;
      if (filterProgress === "mid" && (student.progressPercent < 25 || student.progressPercent > 75)) return false;
      if (filterProgress === "low" && student.progressPercent >= 25) return false;
    }
    return true;
  });

  // ==========================================
  // TAB 3: COHORT COMMAND STATES & HANDLERS
  // ==========================================
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [editingCohort, setEditingCohort] = useState<Cohort | null>(null);
  const [newCohortName, setNewCohortName] = useState("");
  const [newCohortTier, setNewCohortTier] = useState<1 | 2 | 3>(1);
  const [newCohortPrice, setNewCohortPrice] = useState(4999);
  const [newCohortCapacity, setNewCohortCapacity] = useState(50);
  const [newCohortMentors, setNewCohortMentors] = useState("Suresh Gupta");

  useEffect(() => {
    const savedCohorts = localStorage.getItem("academy_cohorts");
    if (savedCohorts) {
      try { setCohorts(JSON.parse(savedCohorts)); } catch (e) { setCohorts(DEFAULT_COHORTS); }
    } else {
      setCohorts(DEFAULT_COHORTS);
      localStorage.setItem("academy_cohorts", JSON.stringify(DEFAULT_COHORTS));
    }
  }, []);

  const saveCohortsToStorage = (updated: Cohort[]) => {
    setCohorts(updated);
    localStorage.setItem("academy_cohorts", JSON.stringify(updated));
  };

  const handleToggleEnrollment = (id: string) => {
    const updated = cohorts.map((c) => {
      if (c.id === id) {
        const nextStatus: Cohort["status"] = c.status === "active" ? "closed" : c.status === "closed" ? "upcoming" : "active";
        return { ...c, status: nextStatus };
      }
      return c;
    });
    saveCohortsToStorage(updated);
  };

  const handleCloneCohort = (id: string) => {
    const target = cohorts.find(c => c.id === id);
    if (!target) return;
    const cloned: Cohort = {
      ...target,
      id: `cohort_${target.tierId}_${Date.now().toString().slice(-4)}`,
      name: `${target.name} (Copy)`,
      enrolled: 0,
      status: "upcoming"
    };
    saveCohortsToStorage([...cohorts, cloned]);
  };

  const handleArchiveCohort = (id: string) => {
    const updated = cohorts.map(c => c.id === id ? { ...c, status: "archived" as any } : c);
    saveCohortsToStorage(updated);
  };

  const handleSaveCohortEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCohort) return;
    const updated = cohorts.map(c => c.id === editingCohort.id ? editingCohort : c);
    saveCohortsToStorage(updated);
    setEditingCohort(null);
    alert("Cohort updates successfully saved.");
  };

  const handleCreateCohort = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCohortName.trim()) return;
    
    const newCohort: Cohort = {
      id: `cohort_l${newCohortTier}_${Date.now().toString().slice(-4)}`,
      name: newCohortName,
      tierId: newCohortTier,
      price: newCohortPrice,
      capacity: newCohortCapacity,
      enrolled: 0,
      status: "upcoming",
      mentors: [newCohortMentors],
      description: `Cohort learning group for Level ${newCohortTier} track.`,
      startDate: "2026-06-01",
      endDate: "2026-09-01",
      dripWeeks: {}
    };

    saveCohortsToStorage([...cohorts, newCohort]);
    setNewCohortName("");
    alert("New learn cohort created successfully!");
  };

  // ==========================================
  // TAB 4: REFERRALS & MENTORS STATES & HANDLERS
  // ==========================================
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([]);
  const [mentorsList, setMentorsList] = useState<Mentor[]>([]);
  const [newAmbassadorName, setNewAmbassadorName] = useState("");
  const [newAmbassadorEmail, setNewAmbassadorEmail] = useState("");
  const [newAmbassadorRef, setNewAmbassadorRef] = useState("");

  useEffect(() => {
    const savedAmb = localStorage.getItem("academy_ambassadors");
    if (savedAmb) {
      try { setAmbassadors(JSON.parse(savedAmb)); } catch (e) { setAmbassadors(DEFAULT_AMBASSADORS); }
    } else {
      setAmbassadors(DEFAULT_AMBASSADORS);
      localStorage.setItem("academy_ambassadors", JSON.stringify(DEFAULT_AMBASSADORS));
    }

    const savedMentors = localStorage.getItem("academy_mentors");
    if (savedMentors) {
      try { setMentorsList(JSON.parse(savedMentors)); } catch (e) { setMentorsList(DEFAULT_MENTORS); }
    } else {
      setMentorsList(DEFAULT_MENTORS);
      localStorage.setItem("academy_mentors", JSON.stringify(DEFAULT_MENTORS));
    }
  }, []);

  const handleCreateAmbassador = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAmbassadorName.trim() || !newAmbassadorEmail.trim()) return;

    const refToken = newAmbassadorRef.trim() || newAmbassadorName.toLowerCase().replace(/\s+/g, "");
    const newAmb: Ambassador = {
      name: newAmbassadorName,
      email: newAmbassadorEmail,
      clicks: 0,
      leads: 0,
      sales: 0,
      commission: "₹0",
      link: `swapnilonline.com?ref=${refToken}`
    };

    const updated = [...ambassadors, newAmb];
    setAmbassadors(updated);
    localStorage.setItem("academy_ambassadors", JSON.stringify(updated));
    
    setNewAmbassadorName("");
    setNewAmbassadorEmail("");
    setNewAmbassadorRef("");
    alert("New referral tracking link registered statefully.");
  };

  // ==========================================
  // COMMON TAILWIND CLASS MAP
  // ==========================================
  const cl = {
    card: "bg-[#050e1c]/40 border border-slate-900 p-5 rounded-2xl",
    innerCard: "bg-slate-950/80 border border-slate-900 p-4 rounded-xl",
    input: "w-full bg-[#030a16] border border-slate-900 text-xs px-3 py-2.5 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-[#d4af37]",
    select: "bg-[#030a16] border border-slate-900 text-xs px-2.5 py-2 rounded-lg text-white cursor-pointer focus:outline-none focus:border-[#d4af37]"
  };

  return (
    <div className="space-y-8 relative">
      
      {/* 1. SECTION TABS MENU */}
      <div className="flex flex-wrap border-b border-slate-900 gap-1 pb-1 overflow-x-auto scrollbar-none">
        {[
          { id: "leads", label: "Leads Database", icon: UserCheck },
          { id: "students", label: "Student Roster CRM", icon: Users },
          { id: "cohorts", label: "Cohort Command Center", icon: Layers },
          { id: "referrals", label: "Referrals & Mentors", icon: Award }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-t-lg text-xs font-semibold transition-all cursor-pointer ${
                activeSubTab === tab.id
                  ? "bg-[#050e1c] border-t-2 border-[#d4af37] text-white border-x border-x-slate-900"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 2. TAB SUB-VIEWS */}
      <div className="bg-[#050e1c]/40 border border-slate-900 rounded-2xl p-6">
        
        {/* SUB-VIEW 1: LEADS CRM DATABASE */}
        {activeSubTab === "leads" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-5">
              <div>
                <h2 className="text-xl font-bold text-white font-display">Inbound Strategy Leads</h2>
                <p className="text-slate-500 text-xs mt-0.5">Qualify, manage, and audit inbound strategy applications.</p>
              </div>
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#030a16] bg-[#d4af37] hover:bg-[#dfc176] rounded-md uppercase tracking-wider transition-all cursor-pointer font-display"
              >
                <FileSpreadsheet className="h-4 w-4" /> Export CSV
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-5 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search leads name or challenge..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#050e1c] border border-slate-800 rounded-lg pl-11 pr-4 py-2.5 text-slate-300 placeholder-slate-600 focus:outline-none focus:border-[#d4af37] text-xs"
                />
              </div>

              <div className="md:col-span-7 flex flex-wrap gap-2 justify-start md:justify-end">
                {["All", "New", "Contacted", "Qualified", "Won", "Lost"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      filterStatus === status
                        ? "bg-[#d4af37] border-[#d4af37] text-[#030a16]"
                        : "bg-[#050e1c]/40 border-slate-800 text-slate-400 hover:border-[#d4af37]/35 hover:text-white"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* CRM Data Table */}
            <div className="overflow-x-auto border border-slate-900 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-900">
                    <th className="p-4">Client Profile</th>
                    <th className="p-4">Monthly Revenue</th>
                    <th className="p-4">Bottleneck Challenge</th>
                    <th className="p-4">Source</th>
                    <th className="p-4">Triage Stage</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300 divide-y divide-slate-900">
                  {filteredLeads.length > 0 ? (
                    filteredLeads.map((lead, idx) => (
                      <tr key={lead.id || lead.email || idx} className="hover:bg-slate-900/10 transition-colors">
                        <td className="p-4 font-bold text-white leading-tight">
                          {lead.name}
                          <span className="block text-[10px] text-slate-500 font-medium font-sans mt-0.5">{lead.email}</span>
                          <span className="block text-[10px] text-slate-500 font-medium font-sans">{lead.mobile}</span>
                        </td>
                        <td className="p-4 font-medium">
                          {lead.businessType} 
                          <span className="block text-[10px] text-[#f3e5ab] mt-0.5">{lead.monthlyRevenue}</span>
                        </td>
                        <td className="p-4 text-slate-400 leading-normal">{lead.challenge}</td>
                        <td className="p-4 text-slate-500 font-medium">{lead.source}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${
                            lead.status === "Won" || lead.status === "Qualified"
                              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                              : lead.status === "Contacted"
                              ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                              : lead.status === "Lost"
                              ? "bg-rose-500/10 border-rose-500/20 text-rose-450"
                              : "bg-slate-900 border-slate-800 text-slate-400"
                          }`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => {
                              setSelectedLead(lead);
                              setLeadNoteText(lead.notes || "");
                            }}
                            className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 hover:border-indigo-500/30 text-slate-300 hover:text-indigo-400 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all"
                          >
                            Audit
                          </button>
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-1.5 border border-slate-900 hover:border-rose-950 text-slate-500 hover:text-rose-400 rounded cursor-pointer transition-all inline-flex items-center justify-center align-middle"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-500 italic">No leads found matching criteria.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUB-VIEW 2: STUDENT DIRECTORY CRM */}
        {activeSubTab === "students" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-900 pb-5">
              <h2 className="text-xl font-bold text-white font-display">Student Directory CRM</h2>
              <p className="text-slate-500 text-xs mt-0.5">Filter streaks, audit homework deliverables, grant badges, and manage access privileges.</p>
            </div>

            {/* Filter Widgets */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 bg-slate-950/60 border border-slate-900 p-4 rounded-xl">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 uppercase font-bold block">Level Gate</label>
                <select value={filterLevel} onChange={e=>setFilterLevel(e.target.value)} className={cl.select + " w-full py-1.5"}>
                  <option value="all">All Levels</option>
                  <option value="1">L1: Foundations</option>
                  <option value="2">L2: Systems</option>
                  <option value="3">L3: Quantum Mastermind</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 uppercase font-bold block">Cohort ID</label>
                <select value={filterCohort} onChange={e=>setFilterCohort(e.target.value)} className={cl.select + " w-full py-1.5"}>
                  <option value="all">All Cohorts</option>
                  {cohorts.filter(c=>c.status!=='archived').map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 uppercase font-bold block">Health Score</label>
                <select value={filterHealth} onChange={e=>setFilterHealth(e.target.value)} className={cl.select + " w-full py-1.5"}>
                  <option value="all">All Statuses</option>
                  <option value="high">High Performers (≥70%)</option>
                  <option value="warning">Warning Pace (50-69%)</option>
                  <option value="risk">Dropout Risk (&lt;50%)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 uppercase font-bold block">Country</label>
                <select value={filterCountry} onChange={e=>setFilterCountry(e.target.value)} className={cl.select + " w-full py-1.5"}>
                  <option value="all">All Countries</option>
                  <option value="india">India</option>
                  <option value="united states">United States</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-505 uppercase font-bold block">Course Progress</label>
                <select value={filterProgress} onChange={e=>setFilterProgress(e.target.value)} className={cl.select + " w-full py-1.5"}>
                  <option value="all">All Progress</option>
                  <option value="high">Completed &gt; 75%</option>
                  <option value="mid">Completed 25% - 75%</option>
                  <option value="low">Completed &lt; 25%</option>
                </select>
              </div>
            </div>

            {/* Student Directory Table */}
            <div className="overflow-x-auto border border-slate-900 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-900">
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Level / Cohort</th>
                    <th className="p-3 text-center">Progress</th>
                    <th className="p-3 text-center">Attendance</th>
                    <th className="p-3 text-center">Health Score</th>
                    <th className="p-3 text-center">🔥 Streak</th>
                    <th className="p-3 font-medium">Country</th>
                    <th className="p-3 text-right">Profile</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900 text-slate-300">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student: any, idx) => {
                      const cohName = cohorts.find(c => c.id === student.cohortId)?.name || student.cohortId;
                      return (
                        <tr key={student.email || student.name || idx} className="hover:bg-slate-900/10">
                          <td className="p-3 flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shrink-0 shadow-sm ${student.avatarColor || 'bg-indigo-600'}`}>
                              {student.name.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <span className="font-bold text-white block">{student.name}</span>
                              <span className="text-[10px] text-slate-500 font-sans block mt-0.5">{student.email}</span>
                            </div>
                          </td>
                          <td className="p-3 whitespace-nowrap">
                            <span className={`px-1.5 py-0.5 rounded border text-[9px] font-bold ${
                              student.level === 3 ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" : student.level === 2 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-slate-900 text-slate-400 border-slate-800"
                            } mr-2`}>
                              L{student.level || 1}
                            </span>
                            <span className="text-slate-400 font-medium">{cohName}</span>
                          </td>
                          <td className="p-3 text-center font-mono font-bold">{student.progressPercent}%</td>
                          <td className="p-3 text-center font-mono font-bold">{student.attendancePercent}%</td>
                          <td className="p-3 text-center">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono border ${
                              student.healthScore >= 70 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : student.healthScore >= 50 ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : "bg-rose-500/10 text-rose-450 border-rose-500/20"
                            }`}>
                              {student.healthScore}%
                            </span>
                          </td>
                          <td className="p-3 text-center font-mono font-bold">
                            {student.streakDays > 0 ? (
                              <span className="text-amber-500 flex items-center justify-center gap-0.5">
                                🔥 {student.streakDays}d
                              </span>
                            ) : (
                              <span className="text-slate-500">-</span>
                            )}
                          </td>
                          <td className="p-3 text-slate-400">{student.country}</td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => {
                                setSelectedCrmStudent(student);
                                setEditingNoteText(mentorNotes[student.email] || "");
                              }}
                              className="bg-slate-900 hover:bg-[#d4af37]/25 text-[#d4af37] border border-[#d4af37]/20 hover:text-white px-2.5 py-1.5 rounded text-[10px] transition-all cursor-pointer font-bold uppercase tracking-wider"
                            >
                              Open Profile
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-slate-500 italic">No matching students in roster.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUB-VIEW 3: COHORT SETTINGS */}
        {activeSubTab === "cohorts" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-900 pb-5">
              <h2 className="text-xl font-bold text-white font-display">Cohort Command Center</h2>
              <p className="text-slate-500 text-xs mt-0.5">Manage pricing structure, seats capacity, assigned mentors, and enrollment toggles.</p>
            </div>

            {/* Quick Cohort KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-950 border border-slate-900 p-3.5 rounded-xl space-y-1">
                <span className="text-[9px] text-slate-500 uppercase tracking-wider font-bold block">Total Cohorts</span>
                <span className="text-xl font-bold text-white font-mono">{cohorts.filter(c => c.status !== "archived").length} groups</span>
              </div>
              <div className="bg-slate-950 border border-slate-900 p-3.5 rounded-xl space-y-1">
                <span className="text-[9px] text-slate-500 uppercase tracking-wider font-bold block">Active Cohorts</span>
                <span className="text-xl font-bold text-[#d4af37] font-mono">{cohorts.filter(c => c.status === "active").length} active</span>
              </div>
              <div className="bg-slate-950 border border-slate-900 p-3.5 rounded-xl space-y-1">
                <span className="text-[9px] text-slate-500 uppercase tracking-wider font-bold block">Enrolled Ratio</span>
                <span className="text-xl font-bold text-white font-mono">
                  {cohorts.reduce((acc, c) => acc + (c.enrolled || 0), 0)} / {cohorts.reduce((acc, c) => acc + c.capacity, 0)} Seats
                </span>
              </div>
              <div className="bg-slate-950 border border-slate-900 p-3.5 rounded-xl space-y-1">
                <span className="text-[9px] text-slate-500 uppercase tracking-wider font-bold block">Projected Revenue</span>
                <span className="text-xl font-bold text-emerald-400 font-mono">
                  ₹{cohorts.reduce((acc, c) => acc + (c.price * (c.enrolled || 0)), 0).toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Cohorts Directory Table */}
              <div className="lg:col-span-8 bg-slate-950/60 border border-slate-900 p-5 rounded-xl space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-900 pb-2">
                  <Layers className="h-4 w-4 text-indigo-500" /> Cohorts Roster
                </h3>
                <div className="overflow-x-auto border border-slate-900 rounded-xl">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-950 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-900">
                        <th className="p-3">Cohort Name</th>
                        <th className="p-3 text-center">Level</th>
                        <th className="p-3 text-center">Pricing</th>
                        <th className="p-3 text-center">Seats Filled</th>
                        <th className="p-3 text-center font-bold text-white">Enrollment Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300 divide-y divide-slate-900">
                      {cohorts.filter(c => c.status !== "archived").map((coh, idx) => (
                        <tr key={coh.id || idx} className="hover:bg-slate-900/10">
                          <td className="p-3">
                            <span className="font-bold text-white block">{coh.name}</span>
                            <span className="text-[10px] text-slate-500 font-sans block truncate max-w-[200px]" title={coh.description}>{coh.description}</span>
                            <span className="text-[8px] text-slate-400 block font-mono mt-0.5">Mentors: {coh.mentors?.join(", ") || "None"}</span>
                          </td>
                          <td className="p-3 text-center">
                            <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[9px] font-bold px-1.5 py-0.5 rounded">
                              L{coh.tierId}
                            </span>
                          </td>
                          <td className="p-3 text-center font-mono font-bold">₹{coh.price.toLocaleString("en-IN")}</td>
                          <td className="p-3 text-center font-mono">
                            <span className="text-white font-bold">{coh.enrolled || 0}</span> / <span className="text-slate-500">{coh.capacity}</span>
                          </td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => handleToggleEnrollment(coh.id)}
                              className={`px-2.5 py-0.5 text-[9px] font-bold uppercase rounded border transition-colors cursor-pointer ${
                                coh.status === "active"
                                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/25"
                                  : coh.status === "upcoming"
                                  ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/25"
                                  : coh.status === "closed"
                                  ? "bg-rose-500/10 text-rose-450 border-rose-500/20 hover:bg-rose-500/25"
                                  : "bg-slate-950 text-slate-500 border-slate-900"
                              }`}
                            >
                              {coh.status}
                            </button>
                          </td>
                          <td className="p-3 text-right space-x-1.5 whitespace-nowrap">
                            <button
                              onClick={() => setEditingCohort(coh)}
                              className="bg-slate-900 hover:bg-indigo-950/20 text-indigo-400 border border-indigo-900/30 hover:border-indigo-500/50 px-2 py-1 rounded text-[9px] font-bold transition-all cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleCloneCohort(coh.id)}
                              className="bg-slate-900 hover:bg-slate-800 text-slate-350 border border-slate-800 p-1.5 rounded transition-all cursor-pointer inline-flex items-center justify-center align-middle"
                              title="Clone"
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => handleArchiveCohort(coh.id)}
                              className="bg-slate-900 hover:bg-rose-950/20 text-slate-400 hover:text-rose-400 border border-slate-800 p-1.5 rounded transition-all cursor-pointer inline-flex items-center justify-center align-middle"
                              title="Archive"
                            >
                              <Archive className="h-3 w-3" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Add Cohort Form */}
              <div className="lg:col-span-4 space-y-6">
                
                {editingCohort ? (
                  <div className="bg-slate-950 border border-[#d4af37]/35 p-5 rounded-xl space-y-4 animate-fadeIn">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-900 pb-2">
                      <Save className="h-4 w-4 text-[#d4af37]" /> Edit Cohort: {editingCohort.name}
                    </h3>
                    <form onSubmit={handleSaveCohortEdit} className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[9px] text-slate-500 uppercase font-bold">Cohort Name</label>
                        <input
                          type="text"
                          required
                          value={editingCohort.name}
                          onChange={(e) => setEditingCohort({ ...editingCohort, name: e.target.value })}
                          className={cl.input}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] text-slate-500 uppercase font-bold">Price (₹)</label>
                          <input
                            type="number"
                            required
                            value={editingCohort.price}
                            onChange={(e) => setEditingCohort({ ...editingCohort, price: Number(e.target.value) })}
                            className={cl.input}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] text-slate-500 uppercase font-bold">Capacity</label>
                          <input
                            type="number"
                            required
                            value={editingCohort.capacity}
                            onChange={(e) => setEditingCohort({ ...editingCohort, capacity: Number(e.target.value) })}
                            className={cl.input}
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] text-slate-500 uppercase font-bold">Cohort Mentors</label>
                        <input
                          type="text"
                          value={editingCohort.mentors?.join(", ")}
                          onChange={(e) => setEditingCohort({ ...editingCohort, mentors: e.target.value.split(",").map(m=>m.trim()) })}
                          className={cl.input}
                        />
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button
                          type="submit"
                          className="flex-1 bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] text-[#030a16] font-bold py-2 rounded text-xs uppercase tracking-wider transition-all cursor-pointer font-display"
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingCohort(null)}
                          className="px-4 py-2 border border-slate-800 text-slate-400 hover:text-white rounded text-xs uppercase transition-all cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="bg-slate-950 border border-slate-900 p-5 rounded-xl space-y-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-900 pb-2">
                      <Plus className="h-4 w-4 text-[#d4af37]" /> Create New Cohort
                    </h3>
                    <form onSubmit={handleCreateCohort} className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[9px] text-slate-500 uppercase font-bold">Cohort Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Cohort L1 June Track"
                          value={newCohortName}
                          onChange={(e) => setNewCohortName(e.target.value)}
                          className={cl.input}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] text-slate-500 uppercase font-bold">Select Tier Level</label>
                          <select
                            value={newCohortTier}
                            onChange={(e) => setNewCohortTier(Number(e.target.value) as any)}
                            className={cl.select + " w-full"}
                          >
                            <option value={1}>L1: Foundations</option>
                            <option value={2}>L2: Systems</option>
                            <option value={3}>L3: Quantum Group</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] text-slate-500 uppercase font-bold">Capacity</label>
                          <input
                            type="number"
                            required
                            value={newCohortCapacity}
                            onChange={(e) => setNewCohortCapacity(Number(e.target.value))}
                            className={cl.input}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] text-slate-500 uppercase font-bold">Price (₹)</label>
                          <input
                            type="number"
                            required
                            value={newCohortPrice}
                            onChange={(e) => setNewCohortPrice(Number(e.target.value))}
                            className={cl.input}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] text-slate-500 uppercase font-bold">Assign Mentor</label>
                          <select
                            value={newCohortMentors}
                            onChange={(e) => setNewCohortMentors(e.target.value)}
                            className={cl.select + " w-full"}
                          >
                            <option value="Suresh Gupta">Suresh Gupta</option>
                            <option value="Arpita Sharma">Arpita Sharma</option>
                          </select>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] text-[#030a16] font-bold py-2.5 rounded text-xs uppercase tracking-wider hover:opacity-95 transition-all cursor-pointer font-display"
                      >
                        Create Group
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SUB-VIEW 4: REFERRALS & MENTORS */}
        {activeSubTab === "referrals" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-900 pb-5">
              <h2 className="text-xl font-bold text-white font-display">Referrals &amp; Mentor Management</h2>
              <p className="text-slate-500 text-xs mt-0.5">Track affiliate partner click attributes and review active mentor performance scorecards.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Affiliate Partners */}
              <div className="lg:col-span-8 bg-slate-950/60 border border-slate-900 p-5 rounded-xl space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2 border-b border-slate-900">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="h-4 w-4 text-[#d4af37]" /> Partner Ambassadors
                  </h3>
                  
                  {/* Quick Referral Generator */}
                  <form onSubmit={handleCreateAmbassador} className="flex gap-2 flex-wrap items-center w-full sm:w-auto">
                    <input
                      type="text"
                      required
                      placeholder="Partner Name"
                      value={newAmbassadorName}
                      onChange={e=>setNewAmbassadorName(e.target.value)}
                      className="bg-[#030a16] border border-slate-800 rounded px-2.5 py-1 text-[10px] text-white focus:outline-none placeholder-slate-700"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Partner Email"
                      value={newAmbassadorEmail}
                      onChange={e=>setNewAmbassadorEmail(e.target.value)}
                      className="bg-[#030a16] border border-slate-800 rounded px-2.5 py-1 text-[10px] text-white focus:outline-none placeholder-slate-700"
                    />
                    <input
                      type="text"
                      placeholder="Ref Token (Optional)"
                      value={newAmbassadorRef}
                      onChange={e=>setNewAmbassadorRef(e.target.value)}
                      className="bg-[#030a16] border border-slate-800 rounded px-2.5 py-1 text-[10px] text-white focus:outline-none placeholder-slate-700 w-24"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1 bg-[#d4af37] hover:bg-[#dfc176] text-[#030a16] font-bold text-[10px] uppercase rounded cursor-pointer transition-all"
                    >
                      Add Link
                    </button>
                  </form>
                </div>

                <div className="overflow-x-auto border border-slate-900 rounded-xl">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-950 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-900">
                        <th className="p-3">Partner Ambassador</th>
                        <th className="p-3">Tracking Reference URL</th>
                        <th className="p-3 text-right">Clicks</th>
                        <th className="p-3 text-right">Leads</th>
                        <th className="p-3 text-right">Sales</th>
                        <th className="p-3 text-right">Payout</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300 divide-y divide-slate-900">
                      {ambassadors.map((amb, idx) => (
                        <tr key={idx} className="hover:bg-slate-900/10">
                          <td className="p-3 font-bold text-white">
                            {amb.name}
                            <span className="block text-[10px] text-slate-500 font-normal font-sans mt-0.5">{amb.email}</span>
                          </td>
                          <td className="p-3 text-slate-400 font-mono">{amb.link}</td>
                          <td className="p-3 text-right font-mono">{amb.clicks}</td>
                          <td className="p-3 text-right font-mono text-amber-500 font-bold">{amb.leads}</td>
                          <td className="p-3 text-right font-mono text-emerald-400 font-bold">{amb.sales}</td>
                          <td className="p-3 text-right font-bold text-emerald-400 font-display">{amb.commission}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mentors Scorecards */}
              <div className="lg:col-span-4 bg-slate-950/60 border border-slate-900 p-5 rounded-xl space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-900 pb-2">
                  <Award className="h-4 w-4 text-indigo-500" /> Mentor Performance
                </h3>
                <div className="space-y-3">
                  {mentorsList.map((m, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-950 border border-slate-900 rounded-xl space-y-2 text-xs">
                      <div className="flex justify-between items-start">
                        <div>
                          <strong className="text-white block">{m.name}</strong>
                          <span className="text-[9px] text-slate-500 block leading-tight mt-0.5">{m.role}</span>
                        </div>
                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-bold px-1.5 py-0.5 rounded text-[9px]">
                          {m.satisfaction}% Rating
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-900/60 text-[9px] text-slate-450 font-sans font-medium">
                        <div>
                          <span className="block font-bold text-white font-mono">{m.managed}</span>
                          Students
                        </div>
                        <div>
                          <span className="block font-bold text-white font-mono">{m.reviews}</span>
                          Graded
                        </div>
                        <div>
                          <span className="block font-bold text-indigo-400 font-mono">{m.responseTime}</span>
                          Response
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ==========================================
         LEAD DOSSIER MODAL OVERLAY
         ========================================== */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-[#020813]/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative overflow-hidden animate-fadeIn shadow-2xl">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer font-bold"
            >
              ✕
            </button>

            <div className="border-b border-slate-900 pb-4">
              <h3 className="text-xl font-bold font-display text-white">{selectedLead.name}</h3>
              <p className="text-slate-400 text-xs mt-0.5">{selectedLead.email} &bull; {selectedLead.mobile}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="space-y-4">
                <div>
                  <span className="text-[9px] text-slate-500 uppercase tracking-wider font-bold block mb-0.5">Profile Segment</span>
                  <p className="text-white font-semibold">{selectedLead.businessType}</p>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 uppercase tracking-wider font-bold block mb-0.5">Revenue Bracket</span>
                  <p className="text-amber-500 font-bold">{selectedLead.monthlyRevenue}</p>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 uppercase tracking-wider font-bold block mb-0.5">Primary Bottleneck</span>
                  <span className="text-[9px] text-slate-505 uppercase tracking-wider font-bold block mb-1">Update Triage Stage</span>
                  <div className="flex flex-wrap gap-2">
                    {(["New", "Contacted", "Qualified", "Won", "Lost"] as Lead["status"][]).map((stage) => (
                      <button
                        key={stage}
                        onClick={() => handleUpdateStatus(selectedLead.id, stage)}
                        className={`px-2.5 py-1.5 rounded text-[9px] font-bold uppercase tracking-wider border cursor-pointer ${
                          selectedLead.status === stage
                            ? "bg-indigo-600 border-indigo-600 text-white"
                            : "bg-slate-950 border-slate-900 text-slate-400 hover:border-slate-800"
                        }`}
                      >
                        {stage}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 uppercase tracking-wider font-bold block mb-0.5">Lead Source</span>
                  <p className="text-slate-350">{selectedLead.source} (Inbound: {selectedLead.date})</p>
                </div>
              </div>
            </div>

            {/* Notes Section */}
            <div className="pt-4 border-t border-slate-900 space-y-3">
              <span className="text-[9px] text-slate-500 uppercase tracking-wider font-bold block flex items-center gap-1.5">
                <MessageSquare className="h-4 w-4 text-indigo-500" /> Advisor Audit Notes
              </span>
              <div className="bg-slate-950 border border-slate-900 p-3 rounded-lg text-slate-300 text-xs sm:text-sm leading-relaxed max-h-32 overflow-y-auto italic font-medium">
                {selectedLead.notes ? `"${selectedLead.notes}"` : "No audit notes logged yet."}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type new audit note/comment..."
                  value={leadNoteText}
                  onChange={(e) => setLeadNoteText(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-650 text-xs flex-grow focus:outline-none focus:border-indigo-600"
                />
                <button
                  onClick={() => handleAddLeadNote(selectedLead.id)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded cursor-pointer transition-all"
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
         STUDENT DOSSIER MODAL OVERLAY
         ========================================== */}
      {selectedCrmStudent && (() => {
        const student = getEnrichedStudent(selectedCrmStudent);
        if (!student) return null;
        const currentCohortName = cohorts.find(c => c.id === student.cohortId)?.name || student.cohortId;

        return (
          <div className="fixed inset-0 z-50 bg-[#020813]/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[85vh] text-left text-xs animate-fadeIn text-slate-200">
              
              {/* Profile Header Sidebar */}
              <div className="w-full md:w-80 bg-slate-950 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-900">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white shrink-0 ${student.avatarColor || 'bg-indigo-600'}`}>
                      {student.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-white truncate">{student.name}</h4>
                      <p className="text-[10px] text-slate-500 font-sans break-all truncate">{student.email}</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <span className="text-[9px] uppercase text-slate-500 block font-bold">LMS LEVEL / COHORT</span>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="bg-amber-500/10 text-[#d4af37] border border-amber-500/20 text-[10px] font-bold px-2 py-0.5 rounded">
                          L{student.level || 1}
                        </span>
                        <span className="text-slate-350 font-medium truncate">{currentCohortName}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase text-slate-500 block font-bold">Country & Join Date</span>
                      <p className="text-slate-350">{student.country} • Joined {student.regDate}</p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase text-slate-500 block font-bold">Watch Time / Webinars</span>
                      <p className="text-slate-350">{student.watchTime} • Attended {student.webinarCount} calls</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-[9px] uppercase text-slate-500 block font-bold mb-1">XP Points Rank</span>
                    <div className="flex items-center justify-between bg-[#030a16] border border-slate-900 rounded p-2 text-[10px]">
                      <span className="font-bold text-white font-mono">{student.xp} XP</span>
                      <span className="text-[#d4af37] font-semibold">{student.rank}</span>
                    </div>
                  </div>

                  {/* Level Upgrade Action dropdown */}
                  <div className="pt-2 space-y-1">
                    <span className="text-[9px] uppercase text-slate-500 block font-bold">Promote / Demote Level</span>
                    <select
                      value={student.level || 1}
                      onChange={(e) => handleUpdateLevelInModal(student.name, Number(e.target.value))}
                      className="w-full bg-[#030a16] border border-slate-900 text-xs px-2.5 py-1.5 rounded text-white cursor-pointer focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value={1}>Level 1: Digital Foundations</option>
                      <option value={2}>Level 2: Systems Architect</option>
                      <option value={3}>Level 3: Quantum Mastermind</option>
                    </select>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-900 text-[10px] text-slate-500 font-mono">
                  ID: crm_{student.email ? student.email.substring(0, 4) : "seek"}
                </div>
              </div>

              {/* Detail Tabs Area */}
              <div className="flex-1 p-6 flex flex-col justify-between overflow-y-auto space-y-6">
                <div className="space-y-5">
                  <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-[#d4af37]" /> Student Roster CRM Details
                    </h3>
                    <button
                      onClick={() => setSelectedCrmStudent(null)}
                      className="text-slate-400 hover:text-white font-bold text-xs bg-slate-950 border border-slate-900 px-2 py-0.5 rounded cursor-pointer transition-all"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Horizontal Tabs inside the Modal */}
                  <div className="flex flex-wrap border-b border-slate-900 gap-1 pb-1">
                    {[
                      { id: "dossier", label: "Dossier & Notes" },
                      { id: "quests", label: "Quest Assignments" },
                      { id: "financials", label: "Financials Ledger" },
                      { id: "community", label: "Community & Badges" },
                      { id: "quizzes", label: "Quizzes & Certs" }
                    ].map((mTab) => (
                      <button
                        key={mTab.id}
                        onClick={() => setModalTab(mTab.id as any)}
                        className={`px-3 py-1.5 text-[10px] font-bold rounded-t transition-all cursor-pointer ${
                          modalTab === mTab.id
                            ? "bg-slate-950 border-t-2 border-[#d4af37] text-white"
                            : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {mTab.label}
                      </button>
                    ))}
                  </div>

                  {/* TAB CONTENT SWITCH IN CRM MODAL */}
                  {modalTab === "dossier" && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-slate-950 border border-slate-900 p-2.5 rounded-xl space-y-0.5">
                          <span className="text-[9px] text-slate-500 uppercase block font-bold">Curriculum Comp</span>
                          <p className="text-base font-bold text-white font-mono">{student.progressPercent}%</p>
                        </div>
                        <div className="bg-slate-950 border border-slate-900 p-2.5 rounded-xl space-y-0.5">
                          <span className="text-[9px] text-slate-500 uppercase block font-bold">Live Attendance</span>
                          <p className="text-base font-bold text-white font-mono">{student.attendancePercent}%</p>
                        </div>
                        <div className="bg-slate-950 border border-slate-900 p-2.5 rounded-xl space-y-0.5">
                          <span className="text-[9px] text-slate-500 uppercase block font-bold">Engagement Health</span>
                          <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded border inline-block ${
                            student.healthScore >= 70 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : student.healthScore >= 50 ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : "bg-rose-500/10 text-rose-450 border-rose-500/20"
                          }`}>
                            {student.healthScore}%
                          </span>
                        </div>
                      </div>

                      {/* Mentor notes update box */}
                      <div className="bg-slate-950 border border-slate-900 p-4 rounded-xl space-y-2">
                        <span className="text-[9px] text-slate-400 uppercase tracking-wider font-bold block">Mentor Notes & Action items</span>
                        <textarea
                          value={editingNoteText}
                          onChange={(e) => setEditingNoteText(e.target.value)}
                          placeholder="Add remarks, assessment notes, and cohort goals..."
                          className="w-full bg-slate-950 border border-slate-900 text-xs p-2.5 rounded-lg text-slate-200 min-h-[85px] focus:outline-none focus:border-[#d4af37]"
                        />
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mt-1">
                          <label className="flex items-center gap-1.5 cursor-pointer text-[10px] text-slate-450 select-none">
                            <input
                              type="checkbox"
                              checked={student.recommendation || false}
                              onChange={(e) => handleUpdateRecommendationInModal(student.email, e.target.checked)}
                              className="rounded border-slate-800 text-[#d4af37] focus:ring-[#d4af37]"
                            />
                            Flag candidate for Quantum Level 3 Mastermind group nomination
                          </label>
                          <button
                            type="button"
                            onClick={() => handleSaveMentorNotes(student.email)}
                            className="bg-slate-900 hover:bg-[#d4af37]/25 text-[#d4af37] border border-[#d4af37]/20 px-4.5 py-1.5 rounded transition-all cursor-pointer font-bold"
                          >
                            Save Audit Notes
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {modalTab === "quests" && (
                    <div className="space-y-4 animate-fadeIn">
                      <span className="text-[9px] text-slate-500 uppercase tracking-wider font-bold block mb-1">Weekly deliverables homework logs</span>
                      <div className="overflow-hidden border border-slate-900 rounded-lg">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-slate-950 text-slate-500 font-semibold border-b border-slate-900">
                              <th className="p-2.5">Quest Module</th>
                              <th className="p-2.5 text-center">Status</th>
                              <th className="p-2.5 text-right font-mono">Timestamp</th>
                            </tr>
                          </thead>
                          <tbody className="text-slate-350 divide-y divide-slate-900">
                            {[
                              { quest: "Q1.1: Core Business Foundations VSL Blueprint", status: "Approved", time: "2026-06-11 14:20" },
                              { quest: "Q1.2: Acquisition Channels Traffic Matrix Setup", status: "Approved", time: "2026-06-12 18:45" },
                              { quest: "Q2.1: Zapier Automation Drip Webhooks Workflow", status: "Pending", time: "2026-06-19 11:30" },
                              { quest: "Q2.2: Retainer Pricing & EMI Funnels Roster", status: "Not Submitted", time: "-" }
                            ].map((q, qidx) => (
                              <tr key={qidx} className="hover:bg-slate-900/10">
                                <td className="p-2.5 font-bold text-white">{q.quest}</td>
                                <td className="p-2.5 text-center">
                                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold border ${
                                    q.status === "Approved" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : q.status === "Pending" ? "bg-amber-500/10 border-amber-500/20 text-amber-400" : "bg-slate-900 border-slate-800 text-slate-500"
                                  }`}>
                                    {q.status}
                                  </span>
                                </td>
                                <td className="p-2.5 text-right font-mono text-slate-500">{q.time}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {modalTab === "financials" && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-[#030a16] border border-slate-900 p-4 rounded-xl space-y-3 text-left">
                          <span className="text-[9px] text-[#d4af37] font-bold uppercase tracking-wider block border-b border-slate-900 pb-1.5">Affiliate partner attributes</span>
                          <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-sans">
                            <div className="bg-slate-950 border border-slate-900 p-2 rounded">
                              <span className="block font-bold text-white font-mono">₹45,000</span>
                              Commission
                            </div>
                            <div className="bg-slate-950 border border-slate-900 p-2 rounded">
                              <span className="block font-bold text-white font-mono">12 users</span>
                              Closed Sales
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] text-slate-500 font-bold block uppercase">Tracking Link URL</label>
                            <input readOnly type="text" value={`swapnilonline.com?ref=${student.name.toLowerCase().replace(/\s+/g, "")}`} className="w-full bg-slate-950 border border-slate-900 text-[10px] font-mono px-2 py-1.5 rounded text-slate-400" />
                          </div>
                        </div>

                        <div className="bg-[#030a16] border border-slate-900 p-4 rounded-xl space-y-2 text-left">
                          <span className="text-[9px] text-green-400 font-bold uppercase tracking-wider block border-b border-slate-900 pb-1.5">Purchased ledgers history</span>
                          <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                            {student.purchases.map((p: any, pidx: number) => (
                              <div key={pidx} className="flex justify-between items-center text-[10px] p-2 bg-slate-950 border border-slate-900 rounded">
                                <div className="text-left">
                                  <strong className="text-white block font-sans">{p.item}</strong>
                                  <span className="text-[8px] text-slate-500 font-mono">{p.date}</span>
                                </div>
                                <span className="text-green-400 font-bold font-mono">{p.price}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {modalTab === "community" && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-[#030a16] border border-slate-900 p-4 rounded-xl space-y-2 text-left">
                          <span className="text-[9px] text-[#d4af37] font-bold uppercase tracking-wider block">Awarded Badges</span>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {["Fast Learner", "Implementation Expert", "Course Champion", "Habit Builder", "Scaling Hero"].map((badge) => {
                              const hasBadge = (student.badges || []).includes(badge);
                              return (
                                <button
                                  key={badge}
                                  onClick={() => handleAwardBadge(student.email, badge)}
                                  className={`px-2.5 py-1.5 rounded border text-[9px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                                    hasBadge
                                      ? "bg-amber-500/15 border-amber-500/45 text-amber-500"
                                      : "bg-slate-950 border-slate-900 text-slate-500 hover:text-slate-400"
                                  }`}
                                >
                                  {badge} {hasBadge && "✓"}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="bg-slate-950 border border-slate-900 p-4 rounded-xl space-y-3 text-left">
                          <span className="text-[9px] text-indigo-400 font-bold uppercase tracking-wider block">XP Adjuster Command</span>
                          <p className="text-slate-500 text-[10px] leading-normal font-sans">Modify the student's XP metrics to reflect community participation, event attendance, or peer review feedback.</p>
                          <div className="flex gap-2 pt-1">
                            <button
                              onClick={() => handleAdjustXP(student.email, 100)}
                              className="flex-1 bg-slate-900 hover:bg-emerald-950/20 text-emerald-400 border border-emerald-900/30 hover:border-emerald-500/50 py-2 rounded text-[10px] font-bold cursor-pointer transition-all"
                            >
                              +100 XP
                            </button>
                            <button
                              onClick={() => handleAdjustXP(student.email, 500)}
                              className="flex-1 bg-slate-900 hover:bg-emerald-950/20 text-emerald-400 border border-emerald-900/30 hover:border-emerald-500/50 py-2 rounded text-[10px] font-bold cursor-pointer transition-all"
                            >
                              +500 XP
                            </button>
                            <button
                              onClick={() => handleAdjustXP(student.email, -100)}
                              className="flex-1 bg-slate-900 hover:bg-rose-950/20 text-rose-450 border border-rose-900/30 hover:border-rose-500/50 py-2 rounded text-[10px] font-bold cursor-pointer transition-all"
                            >
                              -100 XP
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {modalTab === "quizzes" && (
                    <div className="space-y-4 animate-fadeIn">
                      <span className="text-[9px] text-slate-400 uppercase tracking-wider font-bold block mb-1">Passed Quizzes & Certification Credentials</span>
                      <div className="space-y-2">
                        {[
                          { quiz: "conceptual_foundations_q1", title: "L1 Foundations gate quiz", score: "100%", status: "Passed", certId: "CERT-L1-82937" },
                          { quiz: "systems_api_q2", title: "L2 Systems gate quiz", score: "80%", status: "Passed", certId: "CERT-L2-19283" },
                          { quiz: "mastermind_audit_q3", title: "L3 Quantum eligibility quiz", score: "0%", status: "Not Attempted", certId: "-" }
                        ].map((qz, qidx) => (
                          <div key={qidx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-slate-950 border border-slate-900 rounded-lg text-[10px]">
                            <div className="text-left space-y-0.5">
                              <strong className="text-white block font-sans">{qz.title}</strong>
                              <span className="text-[9px] text-slate-500 font-mono">Quiz ID: {qz.quiz}</span>
                            </div>
                            <div className="flex items-center gap-3 mt-2 sm:mt-0">
                              <span className="font-mono text-slate-400">Score: {qz.score}</span>
                              <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase border ${
                                qz.status === "Passed" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-slate-900 border-slate-800 text-slate-500"
                              }`}>
                                {qz.status}
                              </span>
                              {qz.certId !== "-" && (
                                <a
                                  href={`/academy/certificate/${qz.certId}`}
                                  target="_blank"
                                  className="text-indigo-400 hover:text-indigo-300 font-bold underline font-mono"
                                >
                                  View Cert ({qz.certId})
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-900">
                  <button
                    onClick={() => setSelectedCrmStudent(null)}
                    className="bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white border border-slate-800 px-6 py-2 rounded text-[10px] font-bold uppercase transition-all cursor-pointer font-display"
                  >
                    Close Dossier Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
