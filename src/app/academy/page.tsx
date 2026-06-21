"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Sparkles,
  Trophy,
  Award,
  BookOpen,
  MessageSquare,
  Send,
  Play,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  Zap,
  Bot,
  Copy,
  Check,
  LogOut,
  Flame,
  Moon,
  Sun,
  ClipboardList,
  Activity,
  Heart,
  Lightbulb,
  ThumbsUp,
  ExternalLink,
  ChevronRight,
  User,
  Users,
  Home
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEcosystemStore } from "@/store/useEcosystemStore";
import { DEFAULT_COURSES, DEFAULT_HABITS, DEFAULT_BADGES, Course } from "./courses-data";
import Card from "@/components/Card";
import CertificateLayout from "@/components/CertificateLayout";

interface CommunityPost {
  id: string;
  author: string;
  role: string;
  channel: string;
  title: string;
  content: string;
  timestamp: string;
  likes: number;
  reactions: { fire: number; light: number; thumbs: number; heart: number };
  comments: Array<{ author: string; content: string; timestamp: string }>;
}

const DEFAULT_POSTS: CommunityPost[] = [
  {
    id: "post_1",
    author: "Swapnil Shiwalay",
    role: "Architect",
    channel: "announcements",
    title: "Welcome to Elite 90™ Transformation Program! 🚀",
    content: "Congratulations on taking the leap. Remember: this is not a course, it is a 90-day execution crucible. Maintain your daily habit metrics, complete the curriculum missions, and submit your blueprints. Let's build consistency, focus, and spiritual integrity.",
    timestamp: "2 hours ago",
    likes: 15,
    reactions: { fire: 12, light: 8, thumbs: 14, heart: 9 },
    comments: [
      { author: "Rahul Sen", content: "Ready to lock in the 90 days. Day 1 checked off!", timestamp: "1 hour ago" }
    ]
  },
  {
    id: "post_2",
    author: "Swapnil Shiwalay",
    role: "Architect",
    channel: "announcements",
    title: "Habits Accountability: Consistency Over Intensity",
    content: "Make sure you check off at least 6 out of 9 daily tasks. That is the threshold to keep your consistency rating green and keep your day streak active.",
    timestamp: "5 hours ago",
    likes: 8,
    reactions: { fire: 6, light: 4, thumbs: 8, heart: 5 },
    comments: []
  }
];

const isCourseUnlocked = (courseId: string, completedLessons: string[], passedQuizzes: string[], currentCourses: Course[]) => {
  const index = currentCourses.findIndex(c => c.id === courseId);
  if (index <= 0) return true; // First course is always unlocked

  // Check if all prior courses are completed
  for (let i = 0; i < index; i++) {
    const prior = currentCourses[i];
    const priorLessonsCompleted = prior.lessons.every(l => completedLessons.includes(l.id));
    const priorQuizPassed = passedQuizzes.includes(prior.id);
    if (!priorLessonsCompleted || !priorQuizPassed) {
      return false;
    }
  }
  return true;
};

export default function AcademyPage() {
  const {
    user,
    theme,
    toggleTheme,
    loginUser,
    loginUserWithFullProfile,
    logoutUser,
    unlockedCourses,
    completedLessons,
    passedQuizzes,
    habitsChecked,
    toggleHabit,
    addXp,
    assignments,
    submitAssignment,
    updateAssignmentStatus,
    resetProgress,
    completeOnboarding,
    saveOnboardingStepDetails,
    toggleDailyGoalChecked,
    
    // Telemetry & Accountability states
    students,
    sentCommunications,
    automationRules,
    aiCoachHistory,
    welcomeVideoConfig,
    updateWelcomeVideoUrl,
    sendSimulatedAlert,
    addCustomAutomationRule,
    toggleAutomationRule,
    updateAutomationRuleTemplate,
    triggerAutomationRuleEvaluation,
    submitAiCoachMessage
  } = useEcosystemStore();

  const [coursesList, setCoursesList] = useState<Course[]>(DEFAULT_COURSES);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("academy_courses_list");
      if (saved) {
        try {
          setCoursesList(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse academy_courses_list", e);
        }
      }
    }
  }, []);

  // Derived state calculations for Level 1 and Level 2 progression
  const l1Count = coursesList.filter(c => c.level === 1).filter(course => {
    const lessonsCompleted = course.lessons.every(l => completedLessons.includes(l.id));
    const quizPassed = passedQuizzes.includes(course.id);
    return lessonsCompleted && quizPassed;
  }).length;

  const isL1Finished = l1Count === 6;

  const l2Count = coursesList.filter(c => c.level === 2).filter(course => {
    const lessonsCompleted = course.lessons.every(l => completedLessons.includes(l.id));
    const quizPassed = passedQuizzes.includes(course.id);
    return lessonsCompleted && quizPassed;
  }).length;

  const isL2Finished = l2Count === 2;

  // Level 2 is unlocked if Level 1 is fully finished, OR if simulated/unlockedLevel is >= 2
  const isL2Unlocked = isL1Finished || (user?.unlockedLevel && user.unlockedLevel >= 2);

  const [activeTab, setActiveTab] = useState<"home" | "journey" | "challenge" | "community" | "profile" | "quantum" | "mentor" | "coach" | "admin_console">("home");
  const [selectedSyllabusLevel, setSelectedSyllabusLevel] = useState<number>(1);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [certificateModalData, setCertificateModalData] = useState<{
    id: string;
    level: number;
    issueDate: string;
  } | null>(null);

  useEffect(() => {
    if (user) {
      setSelectedSyllabusLevel(user.unlockedLevel || 1);
      
      if (user.onboarded) {
        const dismissed = localStorage.getItem(`gos_welcome_video_dismissed_${user.email}`);
        if (!dismissed) {
          setShowWelcomeVideoModal(true);
        }
      }
    }
  }, [user]);
  const [authMode, setAuthMode] = useState<"login" | "register">("register");
  const [authForm, setAuthForm] = useState({ name: "", email: "", role: "Student" });

  // Auth OTP verification states
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpError, setOtpError] = useState("");

  // Onboarding wizard states
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [onboardingForm, setOnboardingForm] = useState({
    name: "",
    mobile: "",
    experience: "consultant",
    revenue: "under_1l",
    challenge: "leads",
    goal: "leads_engine"
  });

  // Accountability System states
  const [authMethod, setAuthMethod] = useState<"email" | "mobile" | "google" | "apple">("email");
  const [authFormMobile, setAuthFormMobile] = useState("");
  const [registrationDetails, setRegistrationDetails] = useState({
    city: "Mumbai",
    country: "India",
    profession: "Founder",
    ageGroup: "25-34",
    source: "LinkedIn",
    coursePurchased: "ELITE 90™ Growth Operating System"
  });

  // 6-step onboarding wizard details
  const [onboardingProfilePhoto, setOnboardingProfilePhoto] = useState("avatar1");
  const [onboardingGoals, setOnboardingGoals] = useState<string[]>([]);
  const [onboardingSelfAssessment, setOnboardingSelfAssessment] = useState({
    discipline: 5,
    focus: 5,
    energy: 5,
    relationships: 5,
    health: 5,
    finance: 5
  });
  const [onboardingVision90Day, setOnboardingVision90Day] = useState("");
  const [onboardingAgreed, setOnboardingAgreed] = useState(false);

  // Welcome video modal state
  const [showWelcomeVideoModal, setShowWelcomeVideoModal] = useState(false);

  // Admin Command Center states
  const [selectedAdminTab, setSelectedAdminTab] = useState<"dashboard" | "students" | "builder" | "cohorts">("dashboard");
  const [selectedStudentDetails, setSelectedStudentDetails] = useState<any | null>(null);
  const [selectedRuleId, setSelectedRuleId] = useState<string>("rule_1");
  const [editingTemplateSubject, setEditingTemplateSubject] = useState("");
  const [editingTemplateBody, setEditingTemplateBody] = useState("");
  const [ruleEnabled, setRuleEnabled] = useState(true);

  // Chat message input for AI Coach
  const [coachInput, setCoachInput] = useState("");

  // Community state
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [forumChannel, setForumChannel] = useState<string>("all");
  const [newPost, setNewPost] = useState({ title: "", content: "", channel: "wins" });
  const [commentText, setCommentText] = useState<{ [postId: string]: string }>({});

  // Payment mock states
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayLevel, setSelectedPayLevel] = useState<number>(0);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success">("idle");

  // Referral states
  const [copiedLink, setCopiedLink] = useState(false);

  // AI Assistant states
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([]);
  const [inputMessage, setInputMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const coachTabChatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    coachTabChatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aiCoachHistory]);

  // Dynamic quote catalyst states
  const [quote, setQuote] = useState({ text: "", author: "", role: "" });

  useEffect(() => {
    const quotesList = [
      {
        text: "You do not rise to the level of your goals. You fall to the level of your systems.",
        author: "James Clear",
        role: "Author of Atomic Habits"
      },
      {
        text: "Simple can be harder than complex: you have to work hard to get your thinking clean to make it simple.",
        author: "Steve Jobs",
        role: "Co-founder of Apple"
      },
      {
        text: "Product and media are leverage. You can create software and content that work for you while you sleep.",
        author: "Naval Ravikant",
        role: "Entrepreneur & Philosopher"
      },
      {
        text: "If you can't describe what you are doing as a process, you don't know what you are doing.",
        author: "W. Edwards Deming",
        role: "Pioneer of Quality Control"
      },
      {
        text: "The best way to predict the future is to create it.",
        author: "Peter Drucker",
        role: "Father of Modern Management"
      },
      {
        text: "Focus is a matter of deciding what things you're not going to do.",
        author: "John Carmack",
        role: "Legendary Game Developer & VR Pioneer"
      },
      {
        text: "Your system is perfectly designed to get the results you are currently getting.",
        author: "W. Edwards Deming",
        role: "Pioneer of Quality Control"
      }
    ];
    const index = Math.floor(Math.random() * quotesList.length);
    setQuote(quotesList[index]);
  }, []);

  // Initialize community posts from localStorage or default
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("academy_discussion_board");
      if (saved) {
        try {
          setPosts(JSON.parse(saved));
        } catch (e) {
          setPosts(DEFAULT_POSTS);
        }
      } else {
        setPosts(DEFAULT_POSTS);
        localStorage.setItem("academy_discussion_board", JSON.stringify(DEFAULT_POSTS));
      }
    }
  }, []);

  // Bot welcome message
  useEffect(() => {
    if (user) {
      setChatMessages([
        {
          sender: "bot",
          text: `Welcome to ELITE 90™ Transformation Arena, ${user.name}! 🧘 I am your AI Accountability Companion. I monitor your streaks, consistency ratings, and Quest unlocks. Let me know if you need scaling tips or habit accountability.`
        }
      ]);
      setOnboardingForm((prev) => ({ ...prev, name: prev.name || user.name }));
    }
  }, [user]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);
  // Sync selected rule state in Admin Console
  useEffect(() => {
    const selectedRule = automationRules.find(r => r.id === selectedRuleId);
    if (selectedRule) {
      setEditingTemplateSubject(selectedRule.templateSubject);
      setEditingTemplateBody(selectedRule.templateBody);
      setRuleEnabled(selectedRule.enabled);
    }
  }, [selectedRuleId, automationRules]);
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMethod === "email" && !authForm.email) return;
    if (authMethod === "mobile" && !authFormMobile) return;
    setOtpSent(true);
    setOtpError("");
    setOtpCode("");
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode === "1234") {
      const emailVal = authMethod === "email" ? authForm.email : `${authFormMobile.replace(/[^0-9]/g, "") || "guest"}@mobile-crucible.com`;
      loginUserWithFullProfile({
        name: authForm.name || (authMethod === "email" ? authForm.email.split("@")[0] : "Mobile Seeker"),
        email: emailVal,
        mobile: authMethod === "mobile" ? authFormMobile : "+91 98765 43210",
        role: authForm.role,
        city: registrationDetails.city,
        country: registrationDetails.country,
        profession: registrationDetails.profession,
        ageGroup: registrationDetails.ageGroup,
        source: registrationDetails.source,
        coursePurchased: registrationDetails.coursePurchased
      });
      setOtpSent(false);
      setOtpError("");
    } else {
      setOtpError("Incorrect security verification code. Enter '1234' to verify.");
    }
  };

  const handleSocialLogin = (provider: "google" | "apple") => {
    const emailVal = `${provider}_seeker_${Math.floor(Math.random() * 1000)}@${provider}-crucible.com`;
    loginUserWithFullProfile({
      name: provider === "google" ? "Google Seeker" : "Apple Seeker",
      email: emailVal,
      role: "Student",
      source: `${provider} Login`,
      coursePurchased: "ELITE 90™ Growth Operating System"
    });
  };

  const handleOnboardingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Compile goals and assessment details
    const updates = {
      profilePhoto: onboardingProfilePhoto,
      goals: onboardingGoals.length > 0 ? onboardingGoals : [onboardingForm.goal],
      selfAssessment: onboardingSelfAssessment,
      vision90Day: onboardingVision90Day,
      agreedToAccountability: onboardingAgreed,
      mobile: onboardingForm.mobile || user?.mobile,
      city: registrationDetails.city,
      country: registrationDetails.country,
      profession: registrationDetails.profession,
      ageGroup: registrationDetails.ageGroup,
      source: registrationDetails.source,
      coursePurchased: registrationDetails.coursePurchased
    };

    saveOnboardingStepDetails(updates);

    // Toast notification
    const toast = document.createElement("div");
    toast.className = "fixed bottom-20 right-5 bg-emerald-500 text-white font-semibold px-4 py-3 rounded-xl shadow-lg z-50 text-xs border border-emerald-400/20";
    toast.innerHTML = `🏁 Accountability induction complete! Welcome to the crucible.`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);

    // Show configurable welcome video popup
    setShowWelcomeVideoModal(true);
  };

  const handleToggleHabitChecked = (habitId: string) => {
    toggleHabit(habitId);
    
    // Display visual toast notification
    const toast = document.createElement("div");
    toast.className = "fixed bottom-20 right-5 bg-emerald-500 text-white font-semibold px-4 py-3 rounded-xl shadow-lg z-50 animate-bounce text-xs border border-emerald-400/20";
    const checked = !habitsChecked[habitId];
    toast.innerHTML = checked ? `🔥 +15 XP: Completed daily habit!` : `⚖️ -15 XP: Habit checklist updated`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  // Payment mock graduation
  const handleUpgradeLevel = (level: number) => {
    setSelectedPayLevel(level);
    setShowPaymentModal(true);
    setPaymentStatus("idle");
  };

  const handleSimulatePayment = () => {
    setPaymentStatus("processing");
    setTimeout(() => {
      setPaymentStatus("success");
      setTimeout(() => {
        setShowPaymentModal(false);
        // Add 1000 XP and simulate grade advancement
        addXp(1000);
        
        // Update user storage manually to force tier sync
        if (user) {
          const updatedUser = {
            ...user,
            unlockedLevel: Math.max(user.unlockedLevel, selectedPayLevel)
          };
          localStorage.setItem("academy_logged_in_user", JSON.stringify(updatedUser));
          // Fast reload via store
          loginUser(user.name, user.email, user.role);
        }

        const toast = document.createElement("div");
        toast.className = "fixed bottom-20 right-5 bg-emerald-500 text-white font-semibold px-4 py-3 rounded-xl shadow-lg z-50 animate-bounce text-xs";
        toast.innerHTML = `👑 Level ${selectedPayLevel} Ascension Path Unlocked! (+1000 XP)`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
      }, 1000);
    }, 1500);
  };

  // Forum logic
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content || !user) return;

    const postObj: CommunityPost = {
      id: "post_" + Date.now(),
      author: user.name,
      role: user.role,
      channel: newPost.channel,
      title: newPost.title,
      content: newPost.content,
      timestamp: "Just now",
      likes: 0,
      reactions: { fire: 0, light: 0, thumbs: 0, heart: 0 },
      comments: []
    };

    const updated = [postObj, ...posts];
    setPosts(updated);
    localStorage.setItem("academy_discussion_board", JSON.stringify(updated));
    setNewPost({ title: "", content: "", channel: "wins" });
    addXp(20);
  };

  const handleReactPost = (postId: string, reaction: "fire" | "light" | "thumbs" | "heart") => {
    const updated = posts.map((p) => {
      if (p.id === postId) {
        const reactions = p.reactions || { fire: 0, light: 0, thumbs: 0, heart: 0 };
        return {
          ...p,
          reactions: {
            ...reactions,
            [reaction]: (reactions[reaction] || 0) + 1
          }
        };
      }
      return p;
    });
    setPosts(updated);
    localStorage.setItem("academy_discussion_board", JSON.stringify(updated));
  };

  const handleCommentSubmit = (postId: string) => {
    const text = commentText[postId];
    if (!text || !text.trim() || !user) return;

    const updated = posts.map((p) => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, { author: user.name, content: text, timestamp: "Just now" }]
        };
      }
      return p;
    });

    setPosts(updated);
    localStorage.setItem("academy_discussion_board", JSON.stringify(updated));
    setCommentText((prev) => ({ ...prev, [postId]: "" }));
    addXp(10);
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !user) return;

    const text = inputMessage;
    setChatMessages((prev) => [...prev, { sender: "user", text }]);
    setInputMessage("");

    setTimeout(() => {
      let reply = "Your accountability index is climbing. Watch today's lessons and submit blueprints to clear the next quiz barrier.";
      const lower = text.toLowerCase();
      if (lower.includes("habit") || lower.includes("streak")) {
        const checkedCount = Object.values(habitsChecked).filter(Boolean).length;
        reply = `You have completed ${checkedCount}/9 daily quest habits today. Your current streak is at ${user.streakDays} days. Keep it up!`;
      } else if (lower.includes("quantum") || lower.includes("level 3")) {
        reply = "The Quantum mastermind is a private circle reserved for Level 3 members. Graduate from Ascension (Level 2) with a consistency rating >80% to qualify.";
      }
      setChatMessages((prev) => [...prev, { sender: "bot", text: reply }]);
      addXp(10);
    }, 8000 * 0.1); // Quick response
  };

  const copyReferral = () => {
    if (!user) return;
    const link = `https://swapnilonline.com/masterclass?ref=${user.email.split("@")[0]}_elite90`;
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Helper values
  const checkedHabitsCount = Object.values(habitsChecked).filter(Boolean).length;
  const consistencyPercent = Math.round((checkedHabitsCount / 9) * 100);

  const totalLessonsCount = coursesList.reduce((acc, c) => acc + c.lessons.length, 0);
  const lessonsCompletedCount = completedLessons.length;
  const overallProgressPercent = totalLessonsCount > 0 
    ? Math.round((lessonsCompletedCount / totalLessonsCount) * 100)
    : 0;

  // Active quest estimation
  const getActiveQuest = () => {
    for (const course of coursesList) {
      if (course.level <= (user?.unlockedLevel || 1)) {
        for (const lesson of course.lessons) {
          if (!completedLessons.includes(lesson.id)) {
            return {
              courseId: course.id,
              lessonId: lesson.id,
              title: `${course.title}: ${lesson.title}`
            };
          }
        }
      }
    }
    return {
      courseId: "c1",
      lessonId: "c1_l1",
      title: "Digital Business Mindset: Ecosystem Intro"
    };
  };

  const activeQuest = getActiveQuest();

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300 dark bg-slate-950 text-slate-100">
      
      {/* AUTHENTICATION GATE & ONBOARDING */}
      {!user ? (
        <div className="flex-grow flex items-center justify-center p-6 min-h-screen relative overflow-hidden bg-slate-950">
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full border border-slate-800 bg-slate-900 p-8 rounded-3xl space-y-6 text-left shadow-2xl"
          >
            <div className="text-center space-y-2">
              <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white mx-auto shadow-md">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white mt-4 font-display">Elite Transformation OS™</h2>
              <p className="text-slate-400 text-xs font-light animate-pulse">
                Select your validation method and register into the 90-Day accountability crucible.
              </p>
            </div>

            {/* Auth Method Selector (Only shown if OTP not sent) */}
            {!otpSent && (
              <div className="grid grid-cols-4 gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-850">
                {(["email", "mobile", "google", "apple"] as const).map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => {
                      setAuthMethod(method);
                      setOtpSent(false);
                      setOtpError("");
                    }}
                    className={`py-2 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                      authMethod === method
                        ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                        : "text-slate-500 hover:text-slate-350 border border-transparent"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            )}

            {otpSent ? (
              <form onSubmit={handleOtpVerify} className="space-y-4">
                <div className="text-center space-y-1">
                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest font-mono block">Security OTP Sent</span>
                  <p className="text-[11px] text-slate-450 leading-normal">
                    Enter the code sent to your registered {authMethod}. Use simulated code <strong className="text-emerald-400 font-mono">1234</strong> to verify.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider font-mono block">Verification Code</label>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    placeholder="Enter 1234"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="input-field text-center tracking-widest font-mono font-bold text-lg"
                  />
                </div>

                {otpError && (
                  <p className="text-xs text-rose-500 font-semibold text-center">{otpError}</p>
                )}

                <button
                  type="submit"
                  className="btn-primary w-full py-3 text-xs uppercase tracking-widest font-bold"
                >
                  Verify security key
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                  >
                    Cancel / Back
                  </button>
                </div>
              </form>
            ) : (
              <>
                {/* Selector tabs for Register / Login */}
                {(authMethod === "email" || authMethod === "mobile") && (
                  <div className="flex bg-slate-950 p-1 rounded-xl gap-1 border border-slate-800">
                    <button
                      onClick={() => setAuthMode("register")}
                      className={`flex-grow py-2 text-center text-xs font-semibold rounded-lg transition-all ${
                        authMode === "register"
                          ? "bg-slate-900 text-white border border-slate-800"
                          : "text-slate-500 hover:text-slate-200"
                      }`}
                    >
                      Induct Identity (Register)
                    </button>
                    <button
                      onClick={() => {
                        setAuthMode("login");
                        setAuthForm({ name: "Rahul Sen", email: "rahul@business.com", role: "Student" });
                        setAuthFormMobile("+91 98765 43210");
                      }}
                      className={`flex-grow py-2 text-center text-xs font-semibold rounded-lg transition-all ${
                        authMode === "login"
                          ? "bg-slate-900 text-white border border-slate-800"
                          : "text-slate-500 hover:text-slate-200"
                      }`}
                    >
                      Authenticate (Login)
                    </button>
                  </div>
                )}

                {/* Social Login triggers */}
                {(authMethod === "google" || authMethod === "apple") ? (
                  <div className="space-y-4 pt-2">
                    <p className="text-xs text-slate-400 text-center font-light leading-relaxed">
                      Transform Seeker registration via secure {authMethod === "google" ? "Google G-Suite" : "Apple ID"} credentials log.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleSocialLogin(authMethod)}
                      className="w-full py-3 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-700 text-slate-100 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-650/10"
                    >
                      <span>Continue with {authMethod === "google" ? "Google Account" : "Apple Device Key"}</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleAuthSubmit} className="space-y-4">
                    {/* Common fields for Register */}
                    {authMode === "register" && (
                      <div className="space-y-3 border-b border-slate-800/80 pb-4 mb-4">
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-slate-500 tracking-wider block font-mono">Seeker Name</label>
                          <input
                            type="text"
                            required
                            placeholder="Rahul Sen"
                            value={authForm.name}
                            onChange={(e) => setAuthForm((prev) => ({ ...prev, name: e.target.value }))}
                            className="input-field text-xs"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[9px] uppercase font-bold text-slate-500 tracking-wider block font-mono">City</label>
                            <input
                              type="text"
                              required
                              placeholder="Bangalore"
                              value={registrationDetails.city}
                              onChange={(e) => setRegistrationDetails((prev) => ({ ...prev, city: e.target.value }))}
                              className="input-field text-xs"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] uppercase font-bold text-slate-500 tracking-wider block font-mono">Country</label>
                            <input
                              type="text"
                              required
                              placeholder="India"
                              value={registrationDetails.country}
                              onChange={(e) => setRegistrationDetails((prev) => ({ ...prev, country: e.target.value }))}
                              className="input-field text-xs"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[9px] uppercase font-bold text-slate-500 tracking-wider block font-mono">Profession</label>
                            <input
                              type="text"
                              required
                              placeholder="Consultant"
                              value={registrationDetails.profession}
                              onChange={(e) => setRegistrationDetails((prev) => ({ ...prev, profession: e.target.value }))}
                              className="input-field text-xs"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] uppercase font-bold text-slate-500 tracking-wider block font-mono">Age Group</label>
                            <select
                              value={registrationDetails.ageGroup}
                              onChange={(e) => setRegistrationDetails((prev) => ({ ...prev, ageGroup: e.target.value }))}
                              className="select-field text-xs"
                            >
                              <option value="18-24">18-24</option>
                              <option value="25-34">25-34</option>
                              <option value="35-44">35-44</option>
                              <option value="45-54">45-54</option>
                              <option value="55+">55+</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-slate-500 tracking-wider block font-mono">How did you find us?</label>
                          <select
                            value={registrationDetails.source}
                            onChange={(e) => setRegistrationDetails((prev) => ({ ...prev, source: e.target.value }))}
                            className="select-field text-xs"
                          >
                            <option value="Google Search">Google Search</option>
                            <option value="Instagram">Instagram</option>
                            <option value="YouTube">YouTube</option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="Referral">Friend Referral</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-slate-500 tracking-wider block font-mono">Course Purchased</label>
                          <select
                            value={registrationDetails.coursePurchased}
                            onChange={(e) => setRegistrationDetails((prev) => ({ ...prev, coursePurchased: e.target.value }))}
                            className="select-field text-xs"
                          >
                            <option value="ELITE 90™ Growth Operating System">ELITE 90™ Growth Operating System</option>
                            <option value="Transformation Blueprint Pro">Transformation Blueprint Pro</option>
                            <option value="Spiritual Foundations Masterclass">Spiritual Foundations Masterclass</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {authMethod === "email" ? (
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider font-mono block">Security Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="name@email.com"
                          value={authForm.email}
                          onChange={(e) => setAuthForm((prev) => ({ ...prev, email: e.target.value }))}
                          className="input-field text-xs"
                        />
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider font-mono block">Mobile number</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 99999 99999"
                          value={authFormMobile}
                          onChange={(e) => setAuthFormMobile(e.target.value)}
                          className="input-field text-xs font-mono"
                        />
                      </div>
                    )}

                    {/* Common fields for email/mobile */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider font-mono block">Crucible Role Tier</label>
                      <select
                        value={authForm.role}
                        onChange={(e) => setAuthForm((prev) => ({ ...prev, role: e.target.value }))}
                        className="select-field text-xs"
                      >
                        <option value="Student">Student (Check tasks, watch curriculum)</option>
                        <option value="Mentor">Mentor (Grade assignments, audit progress)</option>
                        <option value="Admin">Admin (Access command center & rules builder)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="btn-primary w-full text-xs uppercase tracking-wider py-3 mt-2"
                    >
                      {authMode === "register" ? "Enter transformation OS" : "Authenticate credentials"}
                    </button>
                  </form>
                )}

                <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800">
                  {authMode === "register" ? (
                    <span>Already registered? <button onClick={() => { setAuthMode("login"); setAuthForm({ name: "Rahul Sen", email: "rahul@business.com", role: "Student" }); }} className="text-indigo-400 hover:underline font-semibold cursor-pointer">Login here</button></span>
                  ) : (
                    <span>Need an account? <button onClick={() => setAuthMode("register")} className="text-indigo-400 hover:underline font-semibold cursor-pointer">Register here</button></span>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </div>
      ) : !user.onboarded ? (
        <div className="flex-grow flex items-center justify-center p-6 min-h-screen relative overflow-hidden bg-slate-950">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg w-full border border-slate-800 bg-slate-900 p-8 rounded-3xl space-y-6 text-left shadow-2xl"
          >
            <div className="flex justify-between items-center border-b pb-4 border-slate-800">
              <div>
                <span className="text-[9px] text-indigo-400 font-bold uppercase tracking-widest font-mono block">Induction Step {onboardingStep} of 6</span>
                <h2 className="text-base font-bold text-white mt-0.5 font-display">Student Success Onboarding</h2>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5, 6].map((step) => (
                  <div
                    key={step}
                    className={`h-1.5 w-4 rounded-full transition-all ${
                      onboardingStep >= step ? "bg-indigo-500" : "bg-slate-800"
                    }`}
                  />
                ))}
              </div>
            </div>

            <form onSubmit={handleOnboardingSubmit} className="space-y-6">
              {/* STEP 1: WELCOME SCREEN */}
              {onboardingStep === 1 && (
                <div className="space-y-4">
                  <div className="bg-indigo-950/20 border border-indigo-500/20 p-5 rounded-2xl space-y-2">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block font-mono">Induction Briefing</span>
                    <h3 className="font-bold text-lg text-white">Welcome, {user.name}!</h3>
                    <p className="text-xs text-slate-400 font-light leading-relaxed">
                      You are about to enter the **90-Day Accountability Crucible**. This system is engineered not just for content delivery, but for **complete personal and professional transformation**.
                    </p>
                    <p className="text-xs text-slate-400 font-light leading-relaxed">
                      Before unlocking your study console, we must baseline your goals, audit your current focus, and sign your digital accountability agreement.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOnboardingStep(2)}
                    className="btn-primary w-full text-xs uppercase tracking-wider py-3"
                  >
                    Start My Induction
                  </button>
                </div>
              )}

              {/* STEP 2: PROFILE PHOTO SELECTOR */}
              {onboardingStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block font-mono">Select Seeker Avatar Identity</label>
                    <p className="text-[11px] text-slate-450 font-light pb-2">Choose a design profile badge to represent your crucible presence.</p>
                    
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { id: "avatar1", emoji: "🧘", label: "Seeker" },
                        { id: "avatar2", emoji: "⚡", label: "Architect" },
                        { id: "avatar3", emoji: "👑", label: "Leader" },
                        { id: "avatar4", emoji: "🚀", label: "Founder" }
                      ].map((av) => (
                        <button
                          key={av.id}
                          type="button"
                          onClick={() => setOnboardingProfilePhoto(av.id)}
                          className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                            onboardingProfilePhoto === av.id
                              ? "bg-indigo-650/10 border-indigo-500 text-white"
                              : "bg-slate-950/20 border-slate-800 text-slate-500 hover:border-slate-700"
                          }`}
                        >
                          <span className="text-2xl">{av.emoji}</span>
                          <span className="text-[9px] font-bold uppercase tracking-wider">{av.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border border-slate-800 p-4 rounded-xl flex items-center justify-between bg-slate-950/40">
                    <span className="text-xs text-slate-400 font-light">Or simulate local photo upload:</span>
                    <label className="bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-750 px-3.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer font-mono">
                      Mock File Upload
                      <input type="file" className="hidden" onChange={() => {
                        const toast = document.createElement("div");
                        toast.className = "fixed bottom-20 right-5 bg-emerald-500 text-white font-semibold px-4 py-3 rounded-xl shadow-lg z-50 text-xs";
                        toast.innerHTML = "📸 Profile photo uploaded successfully!";
                        document.body.appendChild(toast);
                        setTimeout(() => toast.remove(), 2500);
                      }} />
                    </label>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setOnboardingStep(1)}
                      className="btn-secondary w-1/3 text-xs uppercase tracking-wider"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setOnboardingStep(3)}
                      className="btn-primary w-2/3 text-xs uppercase tracking-wider"
                    >
                      Save & Proceed
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: GOALS SELECTION */}
              {onboardingStep === 3 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block font-mono">Select Transformation Goals</label>
                    <p className="text-[11px] text-slate-450 font-light pb-2">Select all target coordinates you are scaling over this 90-day sprint.</p>

                    <div className="space-y-2">
                      {[
                        "Weight Loss",
                        "Productivity",
                        "Spiritual Growth",
                        "Business Growth",
                        "Complete Transformation"
                      ].map((goalOption) => {
                        const isSelected = onboardingGoals.includes(goalOption);
                        return (
                          <button
                            key={goalOption}
                            type="button"
                            onClick={() => {
                              if (isSelected) {
                                setOnboardingGoals(onboardingGoals.filter(g => g !== goalOption));
                              } else {
                                setOnboardingGoals([...onboardingGoals, goalOption]);
                              }
                            }}
                            className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                              isSelected
                                ? "bg-indigo-650/10 border-indigo-500 text-white font-semibold"
                                : "bg-slate-950/20 border-slate-800 text-slate-400 hover:border-slate-700"
                            }`}
                          >
                            <span className="text-xs">{goalOption}</span>
                            <div className={`h-4 w-4 rounded-md border flex items-center justify-center shrink-0 ${
                              isSelected ? "bg-indigo-500 border-indigo-400 text-white" : "border-slate-800 bg-transparent"
                            }`}>
                              {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setOnboardingStep(2)}
                      className="btn-secondary w-1/3 text-xs uppercase tracking-wider"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (onboardingGoals.length === 0) {
                          alert("Please select at least one goal to proceed.");
                          return;
                        }
                        setOnboardingStep(4);
                      }}
                      className="btn-primary w-2/3 text-xs uppercase tracking-wider"
                    >
                      Proceed to Assessment
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: SELF ASSESSMENT */}
              {onboardingStep === 4 && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block font-mono">Baseline Performance Audit</label>
                    <p className="text-[11px] text-slate-450 font-light">Rate your current metrics from **1 to 10** across critical lifelines.</p>

                    <div className="space-y-3.5 max-h-[280px] overflow-y-auto pr-2">
                      {[
                        { key: "discipline", label: "Discipline & Execution" },
                        { key: "focus", label: "Focus & Flow State" },
                        { key: "energy", label: "Energy & Vitality" },
                        { key: "relationships", label: "Relationships & Synergy" },
                        { key: "health", label: "Health & Alignment" },
                        { key: "finance", label: "Finance & Wealth Systems" }
                      ].map((item) => {
                        const val = onboardingSelfAssessment[item.key as keyof typeof onboardingSelfAssessment];
                        return (
                          <div key={item.key} className="space-y-1">
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-semibold text-slate-200">{item.label}</span>
                              <span className="font-bold text-indigo-400 font-mono">{val}/10</span>
                            </div>
                            <input
                              type="range"
                              min={1}
                              max={10}
                              value={val}
                              onChange={(e) => setOnboardingSelfAssessment({
                                ...onboardingSelfAssessment,
                                [item.key]: parseInt(e.target.value)
                              })}
                              className="w-full accent-indigo-500 bg-slate-850 h-1.5 rounded-lg appearance-none cursor-pointer"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setOnboardingStep(3)}
                      className="btn-secondary w-1/3 text-xs uppercase tracking-wider"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setOnboardingStep(5)}
                      className="btn-primary w-2/3 text-xs uppercase tracking-wider"
                    >
                      Save & Proceed
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: 90-DAY VISION COMMITMENT */}
              {onboardingStep === 5 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block font-mono">Create 90-Day Vision Blueprint</label>
                    <p className="text-[11px] text-slate-455 font-light leading-relaxed">
                      Write down your written commitment. What does ultimate success look like in 90 days? Describe the transformation in detail.
                    </p>

                    <textarea
                      required
                      rows={5}
                      value={onboardingVision90Day}
                      onChange={(e) => setOnboardingVision90Day(e.target.value)}
                      placeholder="In 90 days, I commit to completing this program, scaling my systems architecture, losing 5kg of fat, and showing up with 10/10 discipline every single day..."
                      className="input-field text-xs resize-none"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setOnboardingStep(4)}
                      className="btn-secondary w-1/3 text-xs uppercase tracking-wider"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!onboardingVision90Day.trim()) {
                          alert("Please write your written vision commitment first.");
                          return;
                        }
                        setOnboardingStep(6);
                      }}
                      className="btn-primary w-2/3 text-xs uppercase tracking-wider"
                    >
                      Compile Agreement
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 6: DIGITAL ACCOUNTABILITY AGREEMENT */}
              {onboardingStep === 6 && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block font-mono">Digital Accountability Agreement</label>
                    
                    <div className="border border-slate-800 bg-slate-950/60 p-4 rounded-2xl max-h-[220px] overflow-y-auto space-y-3 text-[11px] text-slate-400 font-light leading-relaxed">
                      <p className="font-bold text-white uppercase text-center border-b border-slate-850 pb-2">CRUCIBLE SOCIAL CONTRACT</p>
                      <p>
                        I, <strong className="text-white">{user.name}</strong>, hereby register my credentials to undergo the Elite Transformation program.
                      </p>
                      <p>
                        I acknowledge that transformation is the result of compounding daily consistencies. I pledge to check in, complete my modules, and submit assignments on time.
                      </p>
                      <p>
                        <strong>Target goals coordinates locked:</strong> {onboardingGoals.join(", ")}
                      </p>
                      <p>
                        <strong>90-Day Written Vision:</strong> &ldquo;{onboardingVision90Day}&rdquo;
                      </p>
                    </div>

                    <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-950/30 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={onboardingAgreed}
                        onChange={(e) => setOnboardingAgreed(e.target.checked)}
                        className="mt-0.5 accent-indigo-500"
                      />
                      <span className="text-xs text-slate-350 select-none">
                        <strong>Mandatory:</strong> I commit to complete this journey and hold myself fully accountable to the metrics.
                      </span>
                    </label>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setOnboardingStep(5)}
                      className="btn-secondary w-1/3 text-xs uppercase tracking-wider"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={!onboardingAgreed}
                      className="btn-primary w-2/3 text-xs uppercase tracking-wider font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Seal Agreement & Enter
                    </button>
                  </div>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      ) : (
        
        /* AUTHENTICATED WORKSPACE */
        <div className="max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start relative min-h-screen pb-24 md:pb-8">
          
          {/* SIDEBAR NAVIGATION */}
          <aside className="w-full md:w-64 border rounded-3xl p-6 flex flex-col justify-between shrink-0 sticky top-8 bg-slate-900/40 border-slate-800">
            <div className="space-y-6">
              <div className="text-left border-b pb-4 border-slate-800">
                <span className="text-[10px] font-bold text-indigo-400 tracking-widest font-mono uppercase block">Elite Transformation OS™</span>
                <h3 className="text-lg font-bold mt-1 font-display">Student Arena</h3>
              </div>

              {/* Profile Card Widget */}
              <div className="border rounded-2xl p-4 space-y-3 text-xs bg-slate-950/60 border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-indigo-600/20 border border-indigo-500/25 flex items-center justify-center text-indigo-400 font-bold uppercase shrink-0">
                    {user.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold truncate">{user.name}</p>
                    <span className="text-[9px] text-emerald-500 font-bold flex items-center gap-0.5 mt-0.5">🔥 {user.streakDays} Day Streak</span>
                  </div>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: `${Math.min((user.xp / 5000) * 100, 100)}%` }} />
                </div>
                <div className="flex justify-between text-[9px] text-slate-500 font-bold font-mono">
                  <span>{user.xp} XP</span>
                  <span>5,000 XP Target</span>
                </div>
              </div>

              {/* Goal Card Widget */}
              {user.analyzedGoalCard && (
                <Card
                  glow
                  className="bg-slate-950/40 border-slate-800 text-xs shadow-md p-0 overflow-hidden"
                  header={
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                      <span className="font-bold text-white tracking-wide text-[10px] uppercase font-mono">Focus Blueprint</span>
                    </div>
                  }
                >
                  <div className="space-y-3.5">
                    <div>
                      <h4 className="font-bold text-slate-200 text-xs mb-1">
                        {user.analyzedGoalCard.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {user.analyzedGoalCard.description}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono block">Daily Metric Checklist</span>
                      <div className="text-[10px] text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-850 font-semibold leading-relaxed">
                        {user.analyzedGoalCard.focusMetrics}
                      </div>
                    </div>

                    <button
                      onClick={toggleDailyGoalChecked}
                      className={`w-full py-2 px-3 rounded-xl border flex items-center justify-center gap-2 transition-all text-[10px] font-bold uppercase tracking-wider cursor-pointer ${
                        user.analyzedGoalCard.dailyChecked
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
                          : "bg-indigo-650 hover:bg-indigo-600 text-white border-transparent shadow-sm"
                      }`}
                    >
                      {user.analyzedGoalCard.dailyChecked ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400 stroke-[3px]" />
                          Focus Cleared (+10 XP)
                        </>
                      ) : (
                        <>
                          <div className="h-3 w-3 rounded-full border border-white/50" />
                          Mark Focus Cleared
                        </>
                      )}
                    </button>
                  </div>
                </Card>
              )}

              {/* Navigation Tabs */}
              <nav className="space-y-1 text-xs">
                {[
                  { id: "home", label: "Dashboard Overview", icon: Home },
                  { id: "journey", label: "Missions Roadmap", icon: BookOpen },
                  { id: "challenge", label: "Daily Challenge", icon: ClipboardList },
                  { id: "community", label: "Accountability Pods", icon: MessageSquare },
                  { id: "coach", label: "ELITE COACH™ AI", icon: Bot },
                  { id: "profile", label: "Analytics & Badges", icon: Activity },
                  { id: "quantum", label: "Quantum L3 Club", icon: Sparkles }
                ].map((item) => {
                  const NavIcon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left font-semibold cursor-pointer ${
                        activeTab === item.id
                          ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-xs"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent"
                      }`}
                    >
                      <NavIcon className="h-4 w-4" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Sidebar bottom */}
            <div className="pt-4 mt-6 border-t border-slate-800 space-y-2 text-xs">
              {user.role === "Admin" && (
                <button
                  type="button"
                  onClick={() => setActiveTab("admin_console")}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                    activeTab === "admin_console"
                      ? "bg-slate-950 text-indigo-400 border-indigo-500/20"
                      : "bg-slate-950/20 hover:bg-slate-900 border-slate-800 text-slate-450"
                  }`}
                >
                  <ShieldAlert className="h-3.5 w-3.5 text-indigo-500" /> Admin Command Center
                </button>
              )}
              {(user.role === "Admin" || user.role === "Mentor") && (
                <button
                  onClick={() => setActiveTab("mentor")}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                    activeTab === "mentor"
                      ? "bg-slate-950 text-indigo-400 border-indigo-500/20"
                      : "bg-slate-950/20 hover:bg-slate-900 border-slate-800 text-slate-450"
                  }`}
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-indigo-500" /> Mentor Desk
                </button>
              )}
              <button
                onClick={logoutUser}
                className="w-full flex items-center gap-2 px-3 py-2 border border-slate-800 hover:border-rose-500/20 text-slate-500 hover:text-rose-500 text-[10px] font-bold rounded-xl transition-all uppercase tracking-wider cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" /> Logout Session
              </button>
            </div>
          </aside>

          {/* MAIN ARENA WORKSPACE */}
          <main className="flex-1 space-y-6 min-w-0 w-full">
            
            {/* STAGE HEADER BAR */}
            <div className="border rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xs bg-slate-900 border-slate-800">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider block font-mono">Arena Tier</span>
                  <span className="bg-indigo-600 text-white text-xs font-semibold px-2 py-0.5 rounded-lg">
                    Level {user.unlockedLevel}
                  </span>
                </div>
                <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider block font-mono">Rank Status</span>
                  <span className="font-semibold text-xs text-indigo-600 dark:text-indigo-400">{user.rank}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {/* Streak Counter */}
                <div className="flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                  <Flame className="h-4 w-4 text-emerald-500 animate-pulse" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs">{user.streakDays} Day Streak</span>
                </div>
                
                {/* XP status */}
                <div className="flex items-center gap-2">
                  <span className="font-bold font-mono text-xs">{user.xp} XP</span>
                  <div className="w-20 bg-slate-100 dark:bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
                    <div className="h-full bg-emerald-500" style={{ width: `${Math.min((user.xp / 5000) * 100, 100)}%` }} />
                  </div>
                </div>

                <div className="flex items-center gap-2 border-l pl-4 border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-150 dark:hover:bg-slate-850 transition-all relative"
                  >
                    <Bot className="h-4 w-4" />
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-indigo-500" />
                  </button>
                </div>
              </div>
            </div>

            {/* TAB SCREENS */}
            <div className="space-y-6">

              {/* 1. DASHBOARD OVERVIEW */}
              {activeTab === "home" && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6 text-left"
                >
                  <Card className="relative overflow-hidden" glow={true}>
                    <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                          🔥 Crucible Transformation active
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight font-display">Keep Building, {user.name}</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-lg font-light leading-relaxed">
                          Your account status is active on <strong className="text-indigo-600 dark:text-indigo-400 font-semibold">Level {user.unlockedLevel}</strong>. Maintain your consistency checklists and watching node quests to secure rank promotions.
                        </p>
                        <div className="pt-2">
                          <Link
                            href={`/academy/course/${activeQuest.courseId}/${activeQuest.lessonId}`}
                            className="btn-primary shadow-md text-xs uppercase tracking-wider"
                          >
                            Launch Current Quest &rarr;
                          </Link>
                        </div>
                      </div>

                      {/* Stat Metrics */}
                      <div className="grid grid-cols-2 gap-4 w-full md:w-auto shrink-0 font-mono">
                        <div className="border p-4 rounded-2xl text-center bg-slate-950/40 border-slate-800">
                          <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold block">Streak Log</span>
                          <span className="text-xl font-bold text-emerald-500">🔥 {user.streakDays} Days</span>
                        </div>
                        <div className="border p-4 rounded-2xl text-center bg-slate-950/40 border-slate-800">
                          <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold block">XP Rating</span>
                          <span className="text-xl font-bold text-amber-500">{user.xp} XP</span>
                        </div>
                        <div className="border p-4 rounded-2xl text-center col-span-2 bg-slate-950/40 border-slate-800">
                          <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold block">Course Completion Progress</span>
                          <span className="text-base font-bold">{overallProgressPercent}% Complete</span>
                          <div className="w-full bg-slate-850 h-1.5 rounded-full overflow-hidden mt-2">
                            <div className="h-full bg-emerald-500" style={{ width: `${overallProgressPercent}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Summary Circles */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <Card className="flex justify-between items-center">
                      <div className="space-y-1">
                        <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold block font-mono">Curriculum Syllabus</span>
                        <span className="text-2xl font-bold font-mono">{overallProgressPercent}%</span>
                        <span className="text-slate-500 text-[10px] block font-light">Overall watch nodes</span>
                      </div>
                      <div className="relative h-12 w-12 flex items-center justify-center shrink-0">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="24" cy="24" r="20" stroke="currentColor" className="text-slate-800" strokeWidth="3.5" fill="transparent" />
                          <circle cx="24" cy="24" r="20" stroke="currentColor" className="text-indigo-400" strokeWidth="3.5" fill="transparent" strokeDasharray="125" strokeDashoffset={125 - (125 * overallProgressPercent) / 100} />
                        </svg>
                        <span className="absolute text-[9px] font-bold text-indigo-500 font-mono">{overallProgressPercent}%</span>
                      </div>
                    </Card>

                    <Card className="flex justify-between items-center">
                      <div className="space-y-1">
                        <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold block font-mono">Habits Checked Today</span>
                        <span className="text-2xl font-bold font-mono">{checkedHabitsCount} / 9</span>
                        <span className="text-emerald-500 text-[10px] font-bold block">{consistencyPercent >= 66 ? "Streak Guarded" : "Need 6 checked"}</span>
                      </div>
                      <div className="relative h-12 w-12 flex items-center justify-center shrink-0">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="24" cy="24" r="20" stroke="currentColor" className="text-slate-800" strokeWidth="3.5" fill="transparent" />
                          <circle cx="24" cy="24" r="20" stroke="currentColor" className="text-emerald-500" strokeWidth="3.5" fill="transparent" strokeDasharray="125" strokeDashoffset={125 - (125 * consistencyPercent) / 100} />
                        </svg>
                        <span className="absolute text-[9px] font-bold text-emerald-500 font-mono">{consistencyPercent}%</span>
                      </div>
                    </Card>

                    <Card className="flex justify-between items-center">
                      <div className="space-y-1">
                        <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold block font-mono">Webinar Attendance</span>
                        <span className="text-2xl font-bold font-mono">82%</span>
                        <span className="text-slate-500 text-[10px] block font-light">Interactive coaching events</span>
                      </div>
                      <div className="h-10 w-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 shrink-0">
                        <Trophy className="h-5 w-5" />
                      </div>
                    </Card>
                  </div>

                  {/* DYNAMIC SYSTEM GROWTH CATALYST QUOTE PANEL */}
                  {quote.text && (
                    <Card className="relative overflow-hidden border border-slate-800 bg-slate-900 p-6 sm:p-8">
                      <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-b from-indigo-500 to-emerald-500" />
                      <div className="flex items-start gap-4 text-left">
                        <div className="h-9 w-9 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 mt-1">
                          <Sparkles className="h-5 w-5" />
                        </div>
                        <div className="space-y-2">
                          <span className="text-[9px] font-bold text-indigo-400 tracking-widest uppercase font-mono block">Ecosystem Mindset Catalyst</span>
                          <p className="text-base sm:text-lg font-display italic text-slate-100 leading-relaxed font-light font-serif">
                            &ldquo;{quote.text}&rdquo;
                          </p>
                          <div>
                            <span className="text-xs font-semibold text-slate-100 font-mono">&mdash; {quote.author}</span>
                            <span className="text-[10px] text-slate-400 font-light block mt-0.5">{quote.role}</span>
                          </div>

                          <div className="pt-3 flex flex-wrap items-center gap-3">
                            <a
                              href={`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(
                                `"${quote.text}" — ${quote.author} (${quote.role})\n\nJoin the accountability crucible at: https://swapnilonline.com/academy`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0077b5]/10 border border-[#0077b5]/20 text-[#0077b5] dark:text-[#3babff] hover:bg-[#0077b5] hover:text-white transition-all text-[10px] font-bold uppercase tracking-wider font-mono cursor-pointer"
                            >
                              <svg
                                className="h-3 w-3"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                <rect width="4" height="12" x="2" y="9" />
                                <circle cx="4" cy="4" r="2" />
                              </svg>
                              Share to LinkedIn
                            </a>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(`"${quote.text}" — ${quote.author} (${quote.role})\n\nJoin the accountability crucible at: https://swapnilonline.com/academy`);
                                const toast = document.createElement("div");
                                toast.className = "fixed bottom-20 right-5 bg-emerald-500 text-white font-semibold px-4 py-3 rounded-xl shadow-lg z-50 text-xs border border-emerald-400/20";
                                toast.innerHTML = `📋 Quote copied to clipboard!`;
                                document.body.appendChild(toast);
                                setTimeout(() => toast.remove(), 2500);
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white transition-all text-[10px] font-bold uppercase tracking-wider font-mono cursor-pointer"
                            >
                              <Copy className="h-3.5 w-3.5" /> Copy Text
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}

                  {/* Active Quest & Quick Checklist */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left: Active Quest launching card */}
                    <div className="lg:col-span-8 space-y-6">
                      <Card>
                        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                          <div className="h-7 w-7 rounded-lg bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                            <Play className="h-4 w-4" />
                          </div>
                          <h3 className="text-xs font-bold uppercase tracking-wider">Active Quest briefing</h3>
                        </div>
                        
                        <div className="border p-5 rounded-2xl space-y-2 text-left bg-slate-950/45 border-slate-800">
                          <span className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase block font-mono">Current watch mission</span>
                          <h4 className="font-bold text-base leading-tight">{activeQuest.title}</h4>
                          <p className="text-slate-550 dark:text-slate-400 text-xs leading-normal font-light">
                            Watch this lesson, fulfill the required gating quiz, and upload blueprints to proceed along the Ascension timeline.
                          </p>
                        </div>
                        
                        <div className="pt-4">
                          <Link
                            href={`/academy/course/${activeQuest.courseId}/${activeQuest.lessonId}`}
                            className="btn-primary w-full text-xs uppercase tracking-wider"
                          >
                            Enter Study Console
                          </Link>
                        </div>
                      </Card>

                      {/* Recent wins card */}
                      <Card>
                        <h3 className="text-xs font-bold uppercase tracking-wider mb-4 border-b pb-3 border-slate-100 dark:border-slate-800 flex items-center gap-2">
                          <Users className="h-4 w-4 text-indigo-500" /> Accountability pod check-ins
                        </h3>
                        <div className="space-y-4">
                          {posts.slice(0, 2).map((post) => (
                            <div key={post.id} className="border-l-2 border-indigo-600 pl-4 space-y-1">
                              <span className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase font-mono block">Win broadcast</span>
                              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">{post.title}</h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 font-light">{post.content}</p>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </div>

                    {/* Right: Quick Checklist */}
                    <Card className="lg:col-span-4">
                      <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-4">
                        <div className="h-7 w-7 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                          <ClipboardList className="h-4 w-4" />
                        </div>
                        <h3 className="text-xs font-bold uppercase tracking-wider">Today&apos;s quests</h3>
                      </div>

                      <div className="space-y-3">
                        {DEFAULT_HABITS.slice(0, 5).map((h) => {
                          const isChecked = !!habitsChecked[h.id];
                          return (
                            <button
                              key={h.id}
                              onClick={() => handleToggleHabitChecked(h.id)}
                              className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                                isChecked
                                  ? "bg-emerald-500/5 border-emerald-500/20 text-slate-100"
                                  : "bg-transparent border-slate-800 text-slate-450 hover:border-slate-750"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-sm">{h.icon}</span>
                                <span className="text-xs font-medium">{h.name}</span>
                              </div>
                              <div className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                                isChecked
                                  ? "bg-emerald-500 border-emerald-400 text-white"
                                  : "border-slate-800 bg-transparent"
                              }`}>
                                {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                              </div>
                            </button>
                          );
                        })}
                        <button
                          onClick={() => setActiveTab("challenge")}
                          className="w-full py-2.5 text-center text-[10px] font-bold text-indigo-400 hover:underline uppercase tracking-wider block"
                        >
                          View Challenge Board
                        </button>
                      </div>
                    </Card>
                  </div>
                </motion.div>
              )}
                                {/* 2. JOURNEY MAP */}
              {activeTab === "journey" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6 text-left"
                >
                  <div className="flex justify-between items-center border-b pb-4 border-slate-800">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight font-display">Missions Syllabus</h2>
                      <p className="text-slate-400 text-xs font-light">Structure your transformation milestones step-by-step.</p>
                    </div>
                  </div>

                  {/* Dual Column Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column: Vertical timeline */}
                    <div className="lg:col-span-4 space-y-6 bg-slate-900/40 border border-slate-850 p-6 rounded-3xl relative">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b pb-2 border-slate-850">
                        Journey Timeline
                      </h3>
                      
                      {/* Vertical line path */}
                      <div className="absolute left-[39px] top-[75px] bottom-[40px] w-0.5 bg-slate-850 z-0" />

                      <div className="space-y-8 relative z-10">
                        {/* Masterclass Briefing Node */}
                        <div className="flex gap-4 items-start">
                          <div className="h-8 w-8 rounded-full bg-emerald-500/10 border border-emerald-505 text-emerald-400 flex items-center justify-center shrink-0 font-bold text-xs uppercase font-mono shadow-md shadow-emerald-500/5">
                            ✓
                          </div>
                          <div className="space-y-1 pt-0.5">
                            <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest font-mono">Masterclass</span>
                            <h4 className="text-xs font-bold text-slate-300">Induction VSL</h4>
                            <p className="text-[10px] text-slate-500 font-light">Completed & Verified</p>
                          </div>
                        </div>

                        {/* Level 1 Foundations Node */}
                        <button
                          onClick={() => setSelectedSyllabusLevel(1)}
                          className={`w-full flex gap-4 items-start text-left focus:outline-none transition-all p-2.5 rounded-xl border ${
                            selectedSyllabusLevel === 1
                              ? "bg-slate-900 border-indigo-500/30 shadow-lg shadow-indigo-500/5"
                              : "border-transparent hover:bg-slate-850/50"
                          } cursor-pointer`}
                        >
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs font-mono transition-colors ${
                            l1Count === 6
                              ? "bg-indigo-650 text-white"
                              : "bg-indigo-650/20 text-indigo-400 border border-indigo-500/30"
                          }`}>
                            L1
                          </div>
                          <div className="space-y-1.5 flex-1 min-w-0">
                            <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest font-mono">Level 1</span>
                            <h4 className="text-xs font-bold text-slate-200">Foundations</h4>
                            
                            {/* Progress bar */}
                            <div className="space-y-1 pt-0.5">
                              <div className="h-1.5 w-full bg-slate-850 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-indigo-500 transition-all duration-300"
                                  style={{ width: `${Math.round((l1Count / 6) * 100)}%` }}
                                />
                              </div>
                              <span className="text-[9px] text-slate-400 font-mono font-medium block">
                                Progress: {Math.round((l1Count / 6) * 100)}% ({l1Count}/6 complete)
                              </span>
                            </div>
                          </div>
                        </button>

                        {/* Level 2 Ascension Node */}
                        <button
                          onClick={() => {
                            if (isL2Unlocked) {
                              setSelectedSyllabusLevel(2);
                            } else {
                              const toast = document.createElement("div");
                              toast.className = "fixed bottom-20 right-5 bg-red-500 text-white font-semibold px-4 py-3 rounded-xl shadow-lg z-50 text-xs border border-red-400/25";
                              toast.innerHTML = `🔒 Complete Level 1 Foundations to unlock Level 2.`;
                              document.body.appendChild(toast);
                              setTimeout(() => toast.remove(), 3000);
                            }
                          }}
                          className={`w-full flex gap-4 items-start text-left focus:outline-none transition-all p-2.5 rounded-xl border ${
                            selectedSyllabusLevel === 2
                              ? "bg-slate-900 border-indigo-500/30 shadow-lg shadow-indigo-500/5"
                              : "border-transparent hover:bg-slate-850/50"
                          } ${!isL2Unlocked ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                        >
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs font-mono transition-colors ${
                            !isL2Unlocked
                              ? "bg-slate-950 text-slate-655 border border-slate-850"
                              : l2Count === 2
                              ? "bg-emerald-650 text-white"
                              : "bg-indigo-650/20 text-indigo-400 border border-indigo-500/30"
                          }`}>
                            {!isL2Unlocked ? <Lock className="h-3.5 w-3.5" /> : "L2"}
                          </div>
                          <div className="space-y-1.5 flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest font-mono">Level 2</span>
                              {!isL2Unlocked && <span className="bg-slate-855 text-slate-500 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase font-mono">Locked</span>}
                            </div>
                            <h4 className="text-xs font-bold text-slate-200">Ascension</h4>
                            
                            {isL2Unlocked ? (
                              <div className="space-y-1 pt-0.5">
                                <div className="h-1.5 w-full bg-slate-850 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-emerald-500 transition-all duration-300"
                                    style={{ width: `${Math.round((l2Count / 2) * 100)}%` }}
                                  />
                                </div>
                                <span className="text-[9px] text-slate-400 font-mono font-medium block">
                                  Progress: {Math.round((l2Count / 2) * 100)}% ({l2Count}/2 complete)
                                </span>
                              </div>
                            ) : (
                              <p className="text-[9px] text-slate-505">Complete Level 1 to Unlock</p>
                            )}
                          </div>
                        </button>

                        {/* Level 3 Quantum Node */}
                        <button
                          onClick={() => {
                            setSelectedSyllabusLevel(3);
                          }}
                          className={`w-full flex gap-4 items-start text-left focus:outline-none transition-all p-2.5 rounded-xl border ${
                            selectedSyllabusLevel === 3
                              ? "bg-slate-900 border-indigo-500/30 shadow-lg shadow-indigo-500/5"
                              : "border-transparent hover:bg-slate-850/50"
                          } cursor-pointer`}
                        >
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs font-mono transition-colors ${
                            selectedSyllabusLevel === 3
                              ? "bg-indigo-650/40 text-indigo-300 border border-indigo-500/50"
                              : "bg-slate-950 text-slate-655 border border-slate-855"
                          }`}>
                            <Sparkles className="h-3.5 w-3.5" />
                          </div>
                          <div className="space-y-1 flex-1 min-w-0">
                            <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest font-mono">Level 3</span>
                            <h4 className="text-xs font-bold text-slate-200">Quantum</h4>
                            <p className="text-[9px] text-slate-505">Invitation Only</p>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Active Level Course Grid */}
                    <div className="lg:col-span-8 space-y-6">
                      
                      {/* LEVEL 1 VIEW */}
                      {selectedSyllabusLevel === 1 && (
                        <div className="space-y-6">
                          <div className="flex justify-between items-center bg-slate-900/20 border border-slate-850/80 p-4 rounded-2xl">
                            <div>
                              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">Level 1 Modules</h3>
                              <p className="text-slate-450 text-[10px]">Complete all 6 foundations to earn your badge & certificate.</p>
                            </div>
                            
                            {isL1Finished && (
                              <button
                                onClick={() => {
                                  const cert = user?.certificates?.find(c => c.level === 1) || {
                                    id: `cert_l1_${user?.email.toLowerCase().replace(/[^a-z0-9]/g, "") || "guest"}`,
                                    level: 1,
                                    issueDate: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
                                  };
                                  setCertificateModalData(cert);
                                  setShowCertificateModal(true);
                                }}
                                className="btn-primary flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3.5 py-2 cursor-pointer bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 shadow-lg shadow-amber-500/10 text-white rounded-xl"
                              >
                                <Award className="h-3.5 w-3.5" /> Claim Certificate
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {coursesList.filter(c => c.level === 1).map((course) => {
                              const isCompleted = course.lessons.every((l) => completedLessons.includes(l.id)) && passedQuizzes.includes(course.id);
                              const isStarted = course.lessons.some((l) => completedLessons.includes(l.id));
                              const unlocked = isCourseUnlocked(course.id, completedLessons, passedQuizzes, coursesList);
                              const isLocked = !unlocked;

                              return (
                                <Card key={course.id} className="flex flex-col justify-between border-slate-805 bg-slate-900/20 hover:border-slate-705 transition-all">
                                  <div className="space-y-2 flex-grow flex flex-col justify-between">
                                    <div className="space-y-2">
                                      <div className="flex justify-between items-start gap-2">
                                        <div className="flex flex-wrap items-center gap-1.5">
                                          <span className="text-[9px] font-bold text-slate-550 uppercase tracking-widest font-mono">{course.duration}</span>
                                          {course.category && (
                                            <span className="bg-indigo-600/15 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.5 rounded text-[8px] font-mono font-semibold">
                                              {course.category}
                                            </span>
                                          )}
                                          {course.subCategory && (
                                            <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded text-[8px] font-mono font-semibold">
                                              {course.subCategory}
                                            </span>
                                          )}
                                        </div>
                                        {isCompleted ? (
                                          <span className="badge-success">GRADUATED</span>
                                        ) : isStarted ? (
                                          <span className="badge-warning">IN PROGRESS</span>
                                        ) : isLocked ? (
                                          <span className="badge-neutral flex items-center gap-1"><Lock className="h-2.5 w-2.5 text-slate-550" /> LOCKED</span>
                                        ) : (
                                          <span className="badge-neutral">UNSTARTED</span>
                                        )}
                                      </div>

                                      {course.thumbnailUrl && (
                                        <div className="w-full h-32 rounded-lg overflow-hidden relative my-2 border border-slate-800">
                                          <img
                                            src={course.thumbnailUrl}
                                            alt={course.title}
                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                          />
                                        </div>
                                      )}

                                      <h4 className="font-bold text-sm text-slate-100">{course.title}</h4>
                                      <p className="text-xs text-slate-400 font-light leading-normal">{course.description}</p>
                                    </div>
                                  </div>
                                  <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                                    <span className="text-[10px] text-slate-400 font-medium font-mono">{course.lessons.length} Quest Nodes</span>
                                    {!isLocked ? (
                                      <Link
                                        href={`/academy/course/${course.id}/${course.lessons[0].id}`}
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:underline cursor-pointer"
                                      >
                                        Enter Mission <ChevronRight className="h-3 w-3" />
                                      </Link>
                                    ) : (
                                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-550 cursor-not-allowed">
                                        <Lock className="h-3 w-3 text-slate-605" /> Locked
                                      </span>
                                    )}
                                  </div>
                                </Card>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* LEVEL 2 VIEW */}
                      {selectedSyllabusLevel === 2 && (
                        <div className="space-y-6">
                          {!isL2Unlocked ? (
                            <Card className="border-indigo-500/20 bg-indigo-950/20 text-center p-8 space-y-4">
                              <div className="h-10 w-10 rounded-full bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400">
                                <Lock className="h-5 w-5" />
                              </div>
                              <div className="space-y-1">
                                <h4 className="font-bold text-sm">Ascension Pathway Locked</h4>
                                <p className="text-xs text-slate-400 max-w-sm mx-auto font-light leading-relaxed">
                                  Graduate from all Level 1 foundations and submit your blueprints to authorize Ascension clearance, or unlock the simulator pathway.
                                </p>
                              </div>
                              <button
                                onClick={() => handleUpgradeLevel(2)}
                                className="btn-primary text-xs uppercase tracking-wider cursor-pointer text-white rounded-xl"
                              >
                                Simulate Ascension Unlock
                              </button>
                            </Card>
                          ) : (
                            <div className="space-y-6">
                              <div className="flex justify-between items-center bg-slate-900/20 border border-slate-850/80 p-4 rounded-2xl">
                                <div>
                                  <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">Level 2 Modules</h3>
                                  <p className="text-slate-450 text-[10px]">Complete all Level 2 modules to qualify for Level 3 Quantum.</p>
                                </div>
                                
                                {isL2Finished && (
                                  <button
                                    onClick={() => {
                                      const cert = user?.certificates?.find(c => c.level === 2) || {
                                        id: `cert_l2_${user?.email.toLowerCase().replace(/[^a-z0-9]/g, "") || "guest"}`,
                                        level: 2,
                                        issueDate: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
                                      };
                                      setCertificateModalData(cert);
                                      setShowCertificateModal(true);
                                    }}
                                    className="btn-primary flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3.5 py-2 cursor-pointer bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 shadow-lg shadow-amber-500/10 text-white rounded-xl"
                                  >
                                    <Award className="h-3.5 w-3.5" /> Claim Certificate
                                  </button>
                                )}
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {coursesList.filter(c => c.level === 2).map((course) => {
                                  const isCompleted = course.lessons.every((l) => completedLessons.includes(l.id)) && passedQuizzes.includes(course.id);
                                  const isStarted = course.lessons.some((l) => completedLessons.includes(l.id));
                                  const unlocked = isCourseUnlocked(course.id, completedLessons, passedQuizzes, coursesList);
                                  const isLocked = !unlocked;

                                  return (
                                    <Card key={course.id} className="flex flex-col justify-between border-slate-805 bg-slate-900/20 hover:border-slate-705 transition-all">
                                      <div className="space-y-2 flex-grow flex flex-col justify-between">
                                        <div className="space-y-2">
                                          <div className="flex justify-between items-start gap-2">
                                            <div className="flex flex-wrap items-center gap-1.5">
                                              <span className="text-[9px] font-bold text-slate-550 uppercase tracking-widest font-mono">{course.duration}</span>
                                              {course.category && (
                                                <span className="bg-indigo-600/15 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.5 rounded text-[8px] font-mono font-semibold">
                                                  {course.category}
                                                </span>
                                              )}
                                              {course.subCategory && (
                                                <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded text-[8px] font-mono font-semibold">
                                                  {course.subCategory}
                                                </span>
                                              )}
                                            </div>
                                            {isCompleted ? (
                                              <span className="badge-success">GRADUATED</span>
                                            ) : isStarted ? (
                                              <span className="badge-warning">IN PROGRESS</span>
                                            ) : isLocked ? (
                                              <span className="badge-neutral flex items-center gap-1"><Lock className="h-2.5 w-2.5 text-slate-550" /> LOCKED</span>
                                            ) : (
                                              <span className="badge-neutral">UNSTARTED</span>
                                            )}
                                          </div>

                                          {course.thumbnailUrl && (
                                            <div className="w-full h-32 rounded-lg overflow-hidden relative my-2 border border-slate-800">
                                              <img
                                                src={course.thumbnailUrl}
                                                alt={course.title}
                                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                              />
                                            </div>
                                          )}

                                          <h4 className="font-bold text-sm text-slate-100">{course.title}</h4>
                                          <p className="text-xs text-slate-400 font-light leading-normal">{course.description}</p>
                                        </div>
                                      </div>
                                      <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                                        <span className="text-[10px] text-slate-400 font-medium font-mono">{course.lessons.length} Quest Nodes</span>
                                        {!isLocked ? (
                                          <Link
                                            href={`/academy/course/${course.id}/${course.lessons[0].id}`}
                                            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:underline cursor-pointer"
                                          >
                                            Enter Mission <ChevronRight className="h-3 w-3" />
                                          </Link>
                                        ) : (
                                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-550 cursor-not-allowed">
                                            <Lock className="h-3 w-3 text-slate-605" /> Locked
                                          </span>
                                        )}
                                      </div>
                                    </Card>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* LEVEL 3 QUANTUM ACCESS APPLICATION PORTAL */}
                      {selectedSyllabusLevel === 3 && (
                        <div className="space-y-6">
                          <Card className="max-w-xl mx-auto border-indigo-500/20 bg-indigo-950/20 text-left p-6 md:p-8 space-y-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
                            
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 animate-pulse">
                                <Sparkles className="h-5 w-5" />
                              </div>
                              <div>
                                <h3 className="text-base font-bold text-slate-100 uppercase tracking-wide font-display">Quantum Access Portal</h3>
                                <span className="text-[10px] text-amber-500 font-mono tracking-wider uppercase">Invitation Only Gate</span>
                              </div>
                            </div>

                            <p className="text-xs text-slate-400 leading-relaxed font-light">
                              The Quantum VIP Mastermind is a private circle reserved for elite students who have built and automated their business blueprint pipeline. Membership requires completing strict structural metrics.
                            </p>

                            <div className="space-y-3 border-t border-b border-slate-800/80 py-4">
                              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Eligibility Checklist</h4>
                              
                              <div className="space-y-2.5">
                                {/* Checklist 1 */}
                                <div className="flex items-center gap-2.5 text-xs">
                                  <div className={`h-4.5 w-4.5 rounded flex items-center justify-center shrink-0 border transition-all ${
                                    isL1Finished 
                                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400" 
                                      : "border-slate-800 text-slate-550"
                                  }`}>
                                    {isL1Finished ? "✓" : "○"}
                                  </div>
                                  <span className={isL1Finished ? "text-slate-200 font-medium" : "text-slate-500"}>
                                    Level 1 Foundations Complete ({l1Count}/6 Modules)
                                  </span>
                                </div>

                                {/* Checklist 2 */}
                                <div className="flex items-center gap-2.5 text-xs">
                                  <div className={`h-4.5 w-4.5 rounded flex items-center justify-center shrink-0 border transition-all ${
                                    isL2Finished 
                                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400" 
                                      : "border-slate-800 text-slate-550"
                                  }`}>
                                    {isL2Finished ? "✓" : "○"}
                                  </div>
                                  <span className={isL2Finished ? "text-slate-200 font-medium" : "text-slate-500"}>
                                    Level 2 Systems Integration Complete ({l2Count}/2 Modules)
                                  </span>
                                </div>

                                {/* Checklist 3 */}
                                <div className="flex items-center gap-2.5 text-xs">
                                  <div className={`h-4.5 w-4.5 rounded flex items-center justify-center shrink-0 border transition-all ${
                                    consistencyPercent >= 80 
                                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400" 
                                      : "border-slate-800 text-slate-550"
                                  }`}>
                                    {consistencyPercent >= 80 ? "✓" : "○"}
                                  </div>
                                  <span className={consistencyPercent >= 80 ? "text-slate-200 font-medium" : "text-slate-500"}>
                                    Target 14-Day Consistency Score met ({consistencyPercent}% / 80% required)
                                  </span>
                                </div>

                                {/* Checklist 4 */}
                                <div className="flex items-center gap-2.5 text-xs">
                                  <div className={`h-4.5 w-4.5 rounded flex items-center justify-center shrink-0 border transition-all ${
                                    user?.onboarded 
                                      ? "bg-emerald-500/10 border-emerald-505 text-emerald-400" 
                                      : "border-slate-800 text-slate-550"
                                  }`}>
                                    {user?.onboarded ? "✓" : "○"}
                                  </div>
                                  <span className={user?.onboarded ? "text-slate-200 font-medium" : "text-slate-500"}>
                                    Active Business Blueprint Audit Cleared
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="pt-2 text-center">
                              {isL1Finished && isL2Finished && consistencyPercent >= 80 && user?.onboarded ? (
                                <div className="space-y-4">
                                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-center text-xs font-semibold">
                                    ✓ All ascension requirements satisfied.
                                  </div>
                                  <button
                                    onClick={() => {
                                      // Upgrade level in store
                                      const updatedUser = {
                                        ...user,
                                        unlockedLevel: 3
                                      };
                                      localStorage.setItem("academy_logged_in_user", JSON.stringify(updatedUser));
                                      localStorage.setItem(`academy_profile_${user?.email.toLowerCase()}`, JSON.stringify(updatedUser));
                                      loginUser(user?.name || "Rahul", user?.email || "rahul@sen.com", user?.role || "Student");
                                      
                                      const toast = document.createElement("div");
                                      toast.className = "fixed bottom-20 right-5 bg-emerald-500 text-white font-semibold px-4 py-3 rounded-xl shadow-lg z-50 text-xs animate-bounce";
                                      toast.innerHTML = `👑 Quantum Level 3 Mastermind VIP access unlocked!`;
                                      document.body.appendChild(toast);
                                      setTimeout(() => toast.remove(), 4000);
                                    }}
                                    className="btn-primary w-full py-3 text-xs uppercase tracking-wider font-bold bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 cursor-pointer text-white rounded-xl"
                                  >
                                    Submit Mastermind Invitation Request
                                  </button>
                                </div>
                              ) : (
                                <div className="space-y-3">
                                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                                    Status: Pending Eligibility Check
                                  </p>
                                  <button
                                    disabled
                                    className="w-full py-2.5 rounded-xl border border-slate-800 bg-transparent text-slate-600 text-xs font-bold uppercase tracking-wider cursor-not-allowed"
                                  >
                                    Application Gate Closed
                                  </button>
                                  <button
                                    onClick={() => handleUpgradeLevel(3)}
                                    className="text-[10px] text-indigo-400 hover:underline uppercase tracking-wider font-bold block mx-auto pt-1 cursor-pointer"
                                  >
                                    Bypass with simulated unlock
                                  </button>
                                </div>
                              )}
                            </div>
                          </Card>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
              {activeTab === "challenge" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6 text-left"
                >
                  <div className="flex justify-between items-center border-b pb-4 border-slate-800">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight font-display">Daily Quest Checklist</h2>
                      <p className="text-slate-400 text-xs font-light">Complete at least 6 daily tasks to preserve your active streak.</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-full">
                         Consistency: {consistencyPercent}%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Checklist items */}
                    <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {DEFAULT_HABITS.map((h) => {
                        const isChecked = !!habitsChecked[h.id];
                        return (
                          <button
                            key={h.id}
                            onClick={() => handleToggleHabitChecked(h.id)}
                            className={`flex items-center justify-between p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                              isChecked
                                ? "bg-emerald-500/5 border-emerald-500/20 text-slate-100"
                                : "bg-transparent border-slate-800 text-slate-400 hover:border-slate-700"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{h.icon}</span>
                              <div>
                                <span className="text-xs font-bold block">{h.name}</span>
                                <span className="text-[9px] text-slate-400 font-mono">+{h.points} XP reward</span>
                              </div>
                            </div>
                            <div className={`h-6 w-6 rounded-lg border flex items-center justify-center shrink-0 transition-all ${
                              isChecked
                                ? "bg-emerald-500 border-emerald-400 text-white"
                                : "border-slate-800 bg-transparent"
                            }`}>
                              {isChecked && <Check className="h-4 w-4 stroke-[3]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Stats Widget */}
                    <div className="md:col-span-4 space-y-6">
                      <Card className="text-center space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider border-b pb-2 border-slate-800">Consistency Status</h4>
                        
                        <div className="relative h-24 w-24 flex items-center justify-center mx-auto">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="48" cy="48" r="42" stroke="currentColor" className="text-slate-800" strokeWidth="6" fill="transparent" />
                            <circle cx="48" cy="48" r="42" stroke="currentColor" className="text-emerald-500" strokeWidth="6" fill="transparent" strokeDasharray="264" strokeDashoffset={264 - (264 * consistencyPercent) / 100} />
                          </svg>
                          <span className="absolute text-sm font-bold font-mono text-emerald-500">{consistencyPercent}%</span>
                        </div>

                        <div className="space-y-1">
                          <p className="text-xs font-bold">{checkedHabitsCount} of 9 Checked</p>
                          <p className="text-[10px] text-slate-400 font-light max-w-xs mx-auto leading-normal">
                            Maintain a rating above 66% daily (6 habits) to maintain your daily streak count.
                          </p>
                        </div>
                      </Card>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 4. DISCUSSIONS */}
              {activeTab === "community" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6 text-left"
                >
                  <div className="flex justify-between items-center border-b pb-4 border-slate-800">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight font-display">Accountability Pods</h2>
                      <p className="text-slate-400 text-xs font-light">Share your wins, blueprints, and consult other seekers.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left Channels */}
                    <div className="lg:col-span-3 space-y-2">
                      {[
                        { id: "all", label: "All Broadcasters" },
                        { id: "announcements", label: "📢 Announcements" },
                        { id: "wins", label: "🔥 Shared Wins" },
                        { id: "feedback", label: "💬 Blueprints Feedback" },
                        { id: "questions", label: "❓ System Questions" }
                      ].map((ch) => (
                        <button
                          key={ch.id}
                          onClick={() => setForumChannel(ch.id)}
                          className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                            forumChannel === ch.id
                              ? "bg-slate-900 border-slate-800 text-indigo-400"
                              : "bg-transparent border-transparent text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          {ch.label}
                        </button>
                      ))}
                    </div>

                    {/* Right Feed & Submission */}
                    <div className="lg:col-span-9 space-y-6">
                      {/* Create Post */}
                      <Card>
                        <form onSubmit={handleCreatePost} className="space-y-4">
                          <h4 className="text-xs font-bold uppercase tracking-wider mb-2">Share to Crucible Feed</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <input
                              type="text"
                              required
                              placeholder="Post Title (e.g. Day 10 Checked!)"
                              value={newPost.title}
                              onChange={(e) => setNewPost((prev) => ({ ...prev, title: e.target.value }))}
                              className="input-field sm:col-span-2"
                            />
                            <select
                              value={newPost.channel}
                              onChange={(e) => setNewPost((prev) => ({ ...prev, channel: e.target.value }))}
                              className="select-field"
                            >
                              <option value="wins">🔥 Wins</option>
                              <option value="feedback">💬 Feedback</option>
                              <option value="questions">❓ Questions</option>
                            </select>
                          </div>
                          <textarea
                            required
                            rows={3}
                            placeholder="Write your blueprint update or log details..."
                            value={newPost.content}
                            onChange={(e) => setNewPost((prev) => ({ ...prev, content: e.target.value }))}
                            className="textarea-field h-24"
                          />
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-slate-400 font-mono">Award +20 XP on share</span>
                            <button
                              type="submit"
                              className="btn-primary text-xs uppercase tracking-wider"
                            >
                              Publish WIN
                            </button>
                          </div>
                        </form>
                      </Card>

                      {/* Posts Feed */}
                      <div className="space-y-4">
                        {posts
                          .filter((p) => forumChannel === "all" || p.channel === forumChannel)
                          .map((post) => (
                            <Card key={post.id} className="space-y-4">
                              <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2">
                                  <div className="h-8 w-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-bold text-indigo-500 text-xs">
                                    {post.author.charAt(0)}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-xs font-bold">{post.author}</span>
                                      <span className="badge-neutral text-[8px] px-1.5 py-0.5">
                                        {post.role}
                                      </span>
                                    </div>
                                    <span className="text-[9px] text-slate-400 block font-light font-mono">{post.timestamp}</span>
                                  </div>
                                </div>
                                <span className="badge-neutral text-[9px]">
                                  #{post.channel}
                                </span>
                              </div>

                              <div className="space-y-2">
                                <h4 className="font-bold text-sm text-slate-100">{post.title}</h4>
                                <p className="text-xs text-slate-400 leading-relaxed font-light whitespace-pre-wrap">{post.content}</p>
                              </div>

                              {/* Reactions */}
                              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
                                {[
                                  { type: "fire", emoji: "🔥", count: post.reactions?.fire || 0 },
                                  { type: "light", emoji: "💡", count: post.reactions?.light || 0 },
                                  { type: "thumbs", emoji: "👍", count: post.reactions?.thumbs || 0 },
                                  { type: "heart", emoji: "❤️", count: post.reactions?.heart || 0 }
                                ].map((react) => (
                                  <button
                                    key={react.type}
                                    onClick={() => handleReactPost(post.id, react.type as any)}
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-lg text-[10px] font-semibold transition-all cursor-pointer"
                                  >
                                    <span>{react.emoji}</span>
                                    <span className="text-slate-400 font-mono">{react.count}</span>
                                  </button>
                                ))}
                              </div>

                              {/* Comments Renders */}
                              {post.comments?.length > 0 && (
                                <div className="space-y-2 pl-4 border-l border-slate-800 pt-2">
                                  {post.comments.map((c, index) => (
                                    <div key={index} className="text-xs space-y-0.5">
                                      <div className="flex items-center gap-1.5">
                                        <span className="font-bold text-[10px]">{c.author}</span>
                                        <span className="text-[8px] text-slate-400 font-mono">{c.timestamp}</span>
                                      </div>
                                      <p className="text-slate-400 font-light leading-normal">{c.content}</p>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Add Comment */}
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="Write response comment..."
                                  value={commentText[post.id] || ""}
                                  onChange={(e) => {
                                    const text = e.target.value;
                                    setCommentText((prev) => ({ ...prev, [post.id]: text }));
                                  }}
                                  onKeyDown={(e) => e.key === "Enter" && handleCommentSubmit(post.id)}
                                  className="input-field flex-grow"
                                />
                                <button
                                  onClick={() => handleCommentSubmit(post.id)}
                                  className="btn-primary w-11 px-0 shrink-0"
                                >
                                  <Send className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </Card>
                          ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 5. PROFILE & ACHIEVEMENTS */}
              {activeTab === "profile" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6 text-left"
                >
                  <div className="flex justify-between items-center border-b pb-4 border-slate-800">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight font-display text-white">Analytics & Achievements</h2>
                      <p className="text-slate-400 text-xs font-light">Verify self-assessment audits, credentials, and alert history.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Achievements Column */}
                    <div className="lg:col-span-8 space-y-6">
                      
                      {/* Telemetry & Self-Assessment Audit */}
                      <Card className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider border-b pb-2 border-slate-800 text-slate-350">Telemetry & Self-Assessment Audit</h3>
                        <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                          Your current self-assessment coordinates locked in during your transformation induction.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            { label: "Discipline & Execution", val: user?.selfAssessment?.discipline || 5, color: "bg-indigo-500 text-indigo-400 border-indigo-500/25" },
                            { label: "Focus & Flow State", val: user?.selfAssessment?.focus || 5, color: "bg-emerald-500 text-emerald-400 border-emerald-500/25" },
                            { label: "Energy & Vitality", val: user?.selfAssessment?.energy || 5, color: "bg-amber-500 text-amber-400 border-amber-500/25" },
                            { label: "Relationships & Synergy", val: user?.selfAssessment?.relationships || 5, color: "bg-pink-500 text-pink-400 border-pink-500/25" },
                            { label: "Health & Alignment", val: user?.selfAssessment?.health || 5, color: "bg-cyan-500 text-cyan-400 border-cyan-500/25" },
                            { label: "Finance & Wealth Systems", val: user?.selfAssessment?.finance || 5, color: "bg-rose-500 text-rose-400 border-rose-500/25" }
                          ].map((item, idx) => (
                            <div key={idx} className="space-y-1.5 p-3 rounded-xl border bg-slate-950/30 border-slate-850">
                              <div className="flex justify-between items-center text-xs">
                                <span className="font-semibold text-slate-300">{item.label}</span>
                                <span className="font-bold font-mono text-[11px] text-slate-400">{item.val}/10</span>
                              </div>
                              <div className="w-full bg-slate-850 h-2 rounded-full overflow-hidden border border-slate-800">
                                <div className={`h-full ${item.color.split(" ")[0]}`} style={{ width: `${item.val * 10}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>

                      {/* Sealed 90-Day Vision Card */}
                      <Card className="border-indigo-500/10 bg-indigo-950/5 relative overflow-hidden space-y-4">
                        <div className="absolute top-0 right-0 p-3 text-[10px] font-mono font-bold text-indigo-400 flex items-center gap-1.5">
                          <Lock className="h-3.5 w-3.5 animate-pulse" /> SECURED
                        </div>
                        <h3 className="text-xs font-bold uppercase tracking-wider border-b pb-2 border-slate-800 text-slate-300">Sealed 90-Day Vision Commitment</h3>
                        
                        <div className="space-y-3 bg-slate-950/50 p-5 rounded-2xl border border-slate-800/80">
                          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                            <span>REGISTRATION DATE: {user?.joiningDate || new Date().toISOString().split("T")[0]}</span>
                            <span>COHORT TIER: LEVEL {user?.unlockedLevel}</span>
                          </div>
                          
                          <div className="border-t border-dashed border-slate-800/60 pt-2 space-y-1">
                            <span className="text-[9px] uppercase font-bold text-slate-450 tracking-wider font-mono">Target Coordinates:</span>
                            <div className="flex flex-wrap gap-1.5">
                              {(user?.goals || ["Complete Transformation"]).map((g, i) => (
                                <span key={i} className="bg-indigo-650/15 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded text-[9px] font-mono font-semibold uppercase">
                                  {g}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="border-t border-dashed border-slate-800/60 pt-2 space-y-1">
                            <span className="text-[9px] uppercase font-bold text-slate-450 tracking-wider font-mono">Vision Blueprint Text:</span>
                            <p className="text-xs text-slate-350 leading-relaxed font-mono italic">
                              &ldquo;{user?.vision90Day || "I commit to completing the academy transformation modules, maintaining my streak levels, and shipping all systems architecture blueprints."}&rdquo;
                            </p>
                          </div>

                          <div className="border-t border-dashed border-slate-800/60 pt-3 flex items-center gap-2 text-[10px] text-emerald-400 font-bold uppercase tracking-wider font-mono">
                            <ShieldCheck className="h-4 w-4 text-emerald-500" /> Digitally Signed Crucible Contract
                          </div>
                        </div>
                      </Card>

                      {/* Accountability Alerts Inbox */}
                      <Card className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider border-b pb-2 border-slate-800 text-slate-300">Accountability Alerts Inbox</h3>
                        <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                          Your notification logs of automated nudges, WhatsApp warnings, or email triggers generated by the system.
                        </p>

                        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                          {sentCommunications.filter(c => c.studentEmail.toLowerCase() === user?.email.toLowerCase()).length > 0 ? (
                            sentCommunications
                              .filter(c => c.studentEmail.toLowerCase() === user?.email.toLowerCase())
                              .map((comm) => (
                                <div key={comm.id} className="border border-slate-800 p-4 rounded-2xl bg-slate-950/40 space-y-2.5 hover:border-slate-700 transition-all">
                                  <div className="flex justify-between items-center text-xs">
                                    <div className="flex items-center gap-2">
                                      <span className={`px-2 py-0.5 rounded text-[8px] font-bold font-mono uppercase ${
                                        comm.type === "WhatsApp"
                                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                          : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                                      }`}>
                                        {comm.type}
                                      </span>
                                      <span className="font-bold text-slate-350 font-mono text-[10px]">{comm.triggerName}</span>
                                    </div>
                                    <span className="text-[9px] text-slate-500 font-mono">{comm.timestamp}</span>
                                  </div>
                                  <p className="text-[11px] text-slate-400 leading-relaxed font-mono whitespace-pre-wrap border-t border-slate-900 pt-2">
                                    {comm.content}
                                  </p>
                                </div>
                              ))
                          ) : (
                            <div className="border border-dashed border-slate-800 p-6 rounded-2xl text-center space-y-1 bg-slate-950/10">
                              <ShieldCheck className="h-6 w-6 text-slate-600 mx-auto" />
                              <h4 className="font-bold text-slate-400 text-xs">Inbox Pristine</h4>
                              <p className="text-[9px] text-slate-500 max-w-xs mx-auto leading-relaxed">
                                No warning nudges or activity risk flags have been generated for your account credentials. Keep it up!
                              </p>
                            </div>
                          )}
                        </div>
                      </Card>

                      {/* Credentials & Certifications Vault */}
                      <Card className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider border-b pb-2 border-slate-800 text-slate-350">Earned Certifications</h3>
                        
                        {l1Count === 6 || l2Count === 2 || (user?.certificates && user.certificates.length > 0) ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Level 1 Cert */}
                            {(l1Count === 6 || user?.certificates?.some(c => c.level === 1)) && (
                              <div className="border border-amber-600/30 bg-amber-600/5 p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-amber-500/50 transition-all shadow-lg shadow-amber-500/5">
                                <div className="space-y-2">
                                  <div className="flex justify-between items-start">
                                    <span className="bg-amber-600/20 text-amber-400 font-bold px-2 py-0.5 rounded text-[8px] font-mono uppercase tracking-wider">Level 1</span>
                                    <Award className="h-5 w-5 text-amber-400" />
                                  </div>
                                  <h4 className="font-bold text-sm text-slate-100 uppercase tracking-wide">Level 1 Foundation</h4>
                                  <p className="text-[10px] text-slate-400 font-light">Granted for masterclass induction, and clearing all foundational architecture blueprints.</p>
                                </div>
                                <div className="pt-2">
                                  <button
                                    onClick={() => {
                                      const cert = user?.certificates?.find(c => c.level === 1) || {
                                        id: `cert_l1_${user?.email.toLowerCase().replace(/[^a-z0-9]/g, "") || "guest"}`,
                                        level: 1,
                                        issueDate: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
                                      };
                                      setCertificateModalData(cert);
                                      setShowCertificateModal(true);
                                    }}
                                    className="btn-primary w-full py-2.5 text-[10px] uppercase tracking-wider font-bold bg-amber-600 hover:bg-amber-500 text-white rounded-xl cursor-pointer"
                                  >
                                    View Certificate Preview
                                  </button>
                                </div>
                              </div>
                            )}

                            {/* Level 2 Cert */}
                            {(l2Count === 2 || user?.certificates?.some(c => c.level === 2)) && (
                              <div className="border border-indigo-500/30 bg-indigo-500/5 p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-indigo-500/50 transition-all shadow-lg shadow-indigo-500/5">
                                <div className="space-y-2">
                                  <div className="flex justify-between items-start">
                                    <span className="bg-indigo-500/20 text-indigo-400 font-bold px-2 py-0.5 rounded text-[8px] font-mono uppercase tracking-wider">Level 2</span>
                                    <Award className="h-5 w-5 text-indigo-400" />
                                  </div>
                                  <h4 className="font-bold text-sm text-slate-100 uppercase tracking-wide">Level 2 Systems</h4>
                                  <p className="text-[10px] text-slate-400 font-light">Granted for automating CRM contact pipelines, webhook handlers, and API setups.</p>
                                </div>
                                <div className="pt-2">
                                  <button
                                    onClick={() => {
                                      const cert = user?.certificates?.find(c => c.level === 2) || {
                                        id: `cert_l2_${user?.email.toLowerCase().replace(/[^a-z0-9]/g, "") || "guest"}`,
                                        level: 2,
                                        issueDate: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
                                      };
                                      setCertificateModalData(cert);
                                      setShowCertificateModal(true);
                                    }}
                                    className="btn-primary w-full py-2.5 text-[10px] uppercase tracking-wider font-bold bg-indigo-650 hover:bg-indigo-650/80 text-white rounded-xl cursor-pointer"
                                  >
                                    View Certificate Preview
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="border border-dashed border-slate-800 p-8 rounded-2xl text-center space-y-2">
                            <Lock className="h-8 w-8 text-slate-650 mx-auto" />
                            <h4 className="font-bold text-slate-300 text-xs">Certifications Vault Empty</h4>
                            <p className="text-[10px] text-slate-500 max-w-xs mx-auto leading-relaxed">
                              Complete all syllabus modules in Level 1 (6 modules) or Level 2 (2 modules) to graduate and claim your certificate!
                            </p>
                          </div>
                        )}
                      </Card>

                      {/* Achievements Badges Card */}
                      <Card>
                        <h3 className="text-xs font-bold uppercase tracking-wider mb-4 border-b pb-2 border-slate-800 text-slate-350">Achievements Badges</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {DEFAULT_BADGES.map((b) => {
                            // Determine if badge is unlocked
                            let unlocked = false;
                            if (b.id === "b1") unlocked = true; // Inducted Initiate
                            if (b.id === "b2" && (l1Count === 6 || user?.unlockedLevel >= 2)) unlocked = true; // Level 1 graduate
                            if (b.id === "b3" && user?.xp >= 5000) unlocked = true;
                            if (b.id === "b4" && user?.streakDays >= 7) unlocked = true;
                            if (b.id === "b9" && user?.unlockedLevel >= 3) unlocked = true; // Quantum Leader

                            return (
                              <div
                                key={b.id}
                                className={`border p-4 rounded-2xl flex flex-col items-center text-center space-y-2 transition-all ${
                                  unlocked
                                    ? "bg-slate-900 border-slate-800"
                                    : "bg-transparent border-slate-800/55 opacity-40"
                                }`}
                              >
                                <span className="text-3xl">{b.icon}</span>
                                <div>
                                  <h4 className="text-xs font-bold text-slate-100">{b.title}</h4>
                                  <p className="text-[9px] text-slate-400 mt-0.5 leading-tight font-light">{b.description}</p>
                                </div>
                                <span className={unlocked ? "badge-success text-[8px]" : "badge-neutral text-[8px]"}>
                                  {unlocked ? "UNLOCKED" : b.requirement}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </Card>
                    </div>

                    {/* Right Column: SyllabusCompletionLedger and ReferralProgram */}
                    <div className="lg:col-span-4 space-y-6">
                      {/* Syllabus Progress Ledger / Timeline */}
                      <Card className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider border-b pb-2 border-slate-800 text-slate-350">Syllabus Completion Ledger</h3>
                        
                        <div className="space-y-3 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                          {coursesList.map((course) => {
                            const completedCount = course.lessons.filter(l => completedLessons.includes(l.id)).length;
                            const isQuizCleared = passedQuizzes.includes(course.id);
                            const isFinished = completedCount === course.lessons.length && isQuizCleared;

                            return (
                              <div key={course.id} className="flex gap-4 items-start relative z-10 text-xs">
                                <div className={`h-7.5 w-7.5 rounded-full flex items-center justify-center shrink-0 font-bold border transition-colors ${
                                  isFinished
                                    ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                                    : completedCount > 0
                                    ? "bg-amber-500/10 border-amber-500 text-amber-400 text-[10px]"
                                    : "bg-slate-950 border-slate-800 text-slate-600"
                                }`}>
                                  {isFinished ? "✓" : completedCount}
                                </div>
                                <div className="space-y-1 pt-0.5 text-left">
                                  <h4 className={`font-bold ${isFinished ? "text-slate-200" : "text-slate-450"}`}>
                                    {course.title}
                                  </h4>
                                  <p className="text-[10px] text-slate-500 font-light">
                                    {completedCount === course.lessons.length
                                      ? "All lesson quests watched"
                                      : `${completedCount} of ${course.lessons.length} lessons watched`}
                                    {" • "}
                                    {isQuizCleared ? "Quiz Gate Cleared" : "Quiz Gate Locked"}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </Card>

                      <Card className="space-y-4 text-left">
                        <h4 className="text-xs font-bold uppercase tracking-wider border-b pb-2 border-slate-800 text-slate-350">Referral Program</h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-light">
                          Share your referral link with other creators. Earn <strong className="text-emerald-500">+250 XP</strong> once they enroll.
                        </p>
                        
                        <div className="flex gap-2">
                          <input
                            type="text"
                            readOnly
                            value={`https://swapnilonline.com/masterclass?ref=${user?.email ? user.email.split("@")[0] : "visitor"}_elite90`}
                            className="input-field font-mono text-[10px] flex-grow bg-slate-950 border border-slate-800 text-slate-300"
                          />
                          <button
                            onClick={copyReferral}
                            className="btn-primary w-11 px-0 shrink-0 cursor-pointer"
                          >
                            {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                          </button>
                        </div>

                        <div className="pt-2 text-center">
                          <button
                            onClick={() => {
                              if (confirm("Are you sure you want to clear your learning coordinates, XP, streaks, and daily checklist metrics?")) {
                                resetProgress();
                              }
                            }}
                            className="text-[10px] font-bold text-rose-500 hover:underline uppercase tracking-wider cursor-pointer bg-transparent border-none"
                          >
                            ⚠️ Reset All Progress
                          </button>
                        </div>
                      </Card>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ELITE COACH™ AI Chat Tab */}
              {activeTab === "coach" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6 text-left"
                >
                  <div className="flex justify-between items-center border-b pb-4 border-slate-800">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight font-display text-white">ELITE COACH™ AI</h2>
                      <p className="text-slate-400 text-xs font-light">Your high-fidelity telemetry-aware behavioral coach.</p>
                    </div>
                    {user && (
                      <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-xl">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[8px] text-emerald-400 uppercase font-bold font-mono tracking-wider">Telemetry Engine Active</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Chat Window */}
                    <div className="lg:col-span-8 flex flex-col border border-slate-800 bg-slate-900/60 rounded-3xl overflow-hidden shadow-2xl h-[550px] backdrop-blur-md">
                      {/* Chat messages */}
                      <div className="flex-grow overflow-y-auto p-6 space-y-4">
                        {aiCoachHistory.map((msg) => {
                          const isUser = msg.role === "user";
                          return (
                            <div
                              key={msg.id}
                              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                            >
                              <div className={`flex gap-3 max-w-[78%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
                                {!isUser && (
                                  <div className="h-8 w-8 rounded-xl bg-indigo-650 flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-650/20">
                                    <Bot className="h-4 w-4" />
                                  </div>
                                )}
                                <div className="space-y-1">
                                  <div className={`rounded-2xl px-4 py-3 leading-relaxed text-sm ${
                                    isUser
                                      ? "bg-indigo-600 text-white rounded-tr-none shadow-md"
                                      : "bg-slate-850 border border-slate-800 text-slate-200 rounded-tl-none shadow-md"
                                  }`}>
                                    {msg.content}
                                  </div>
                                  <span className="text-[9px] text-slate-500 block font-mono px-1">
                                    {new Date(msg.timestamp).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" })}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        <div ref={coachTabChatEndRef} />
                      </div>

                      {/* Quick Commands */}
                      <div className="px-6 py-2 bg-slate-950/20 border-t border-slate-800 flex flex-wrap gap-2 items-center">
                        <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider font-mono">Quick Audits:</span>
                        {[
                          { label: "📊 Analyze my progress score", query: "Analyze my progress score" },
                          { label: "🔥 Analyze my habit routine & streaks", query: "Analyze my habit routine & streaks" },
                          { label: "🧘 Show my 90-day vision commitments", query: "Show my 90-day vision commitments" },
                          { label: "💪 Formulate a recovery plan", query: "Formulate a recovery plan" }
                        ].map((btn, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              submitAiCoachMessage(btn.query);
                            }}
                            className="bg-slate-950/40 hover:bg-slate-950 hover:text-indigo-400 text-slate-450 border border-slate-800/80 px-2.5 py-1 rounded-lg text-[10px] transition-all cursor-pointer font-medium"
                          >
                            {btn.label}
                          </button>
                        ))}
                      </div>

                      {/* Chat input */}
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (!coachInput.trim()) return;
                          submitAiCoachMessage(coachInput);
                          setCoachInput("");
                        }}
                        className="p-3 border-t border-slate-800 bg-slate-950 shrink-0 flex gap-3"
                      >
                        <input
                          type="text"
                          placeholder="Ask ELITE COACH™ anything about your habits, routines, or level progressions..."
                          value={coachInput}
                          onChange={(e) => setCoachInput(e.target.value)}
                          className="flex-grow bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                        <button
                          type="submit"
                          className="px-5 bg-indigo-600 hover:bg-indigo-750 text-white rounded-xl flex items-center justify-center transition-all cursor-pointer border-none"
                        >
                          <Send className="h-4 w-4" />
                        </button>
                      </form>
                    </div>

                    {/* Stats sidebar */}
                    <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
                      <Card className="space-y-4 h-full flex flex-col justify-between">
                        <div className="space-y-4">
                          <h3 className="text-xs font-bold uppercase tracking-wider border-b pb-2 border-slate-800 text-slate-350">Coach Assessment Audit</h3>
                          <div className="space-y-4 text-xs">
                            <div className="flex justify-between items-center bg-slate-950/40 p-3 rounded-xl border border-slate-850">
                              <span className="text-slate-400 font-medium">Success Score</span>
                              <span className="font-bold font-mono text-indigo-400 text-base">{user?.successScore || 5}/100</span>
                            </div>

                            <div className="flex justify-between items-center bg-slate-950/40 p-3 rounded-xl border border-slate-850">
                              <span className="text-slate-400 font-medium">Consistency Rating</span>
                              <span className={`font-bold font-mono text-base ${
                                (user?.consistencyScore || 0) >= 80
                                  ? "text-emerald-400"
                                  : (user?.consistencyScore || 0) >= 60
                                  ? "text-amber-400"
                                  : "text-rose-450"
                              }`}>{user?.consistencyScore || 0}%</span>
                            </div>

                            <div className="flex justify-between items-center bg-slate-950/40 p-3 rounded-xl border border-slate-850">
                              <span className="text-slate-400 font-medium">Risk designation</span>
                              <span className={`font-bold font-mono uppercase text-[10px] tracking-wider px-2 py-0.5 rounded-md ${
                                user?.riskCategory === "High Performer"
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25"
                                  : user?.riskCategory === "Active"
                                  ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/25"
                                  : user?.riskCategory === "Slow Learner"
                                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/25"
                                  : "bg-rose-500/10 text-rose-400 border border-rose-500/25"
                              }`}>{user?.riskCategory || "Active"}</span>
                            </div>
                          </div>

                          <div className="bg-slate-950/20 border border-slate-800 p-4 rounded-2xl text-[11px] text-slate-400 leading-relaxed font-light space-y-2">
                            <span className="font-bold text-slate-200 uppercase text-[9px] tracking-wider block font-mono">Coach Instructions</span>
                            <p>
                              ELITE COACH™ uses real-time telemetry from your completions and streak metrics to evaluate risk classification.
                            </p>
                            <p>
                              Ask it to <strong className="text-indigo-400">"Analyze my progress"</strong> or <strong className="text-indigo-400">"Formulate a recovery plan"</strong> to receive personalized coaching logs.
                            </p>
                          </div>
                        </div>

                        <div className="border border-slate-800 p-4 rounded-2xl bg-indigo-950/5 text-center space-y-2">
                          <Bot className="h-6 w-6 text-indigo-400 mx-auto" />
                          <h4 className="font-bold text-xs">Transform Seeker Contract</h4>
                          <p className="text-[10px] text-slate-500 font-light leading-normal">
                            You agreed to undergo the 90-day transformation crucible on {new Date(user?.joiningDate || Date.now()).toLocaleDateString("en-IN")}.
                          </p>
                        </div>
                      </Card>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Admin Command Center */}
              {activeTab === "admin_console" && user?.role === "Admin" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6 text-left"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 border-slate-800 gap-4">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight font-display text-white">Admin Command Center</h2>
                      <p className="text-slate-400 text-xs font-light">Monitor academy telemetries, student risks, and manage automation rules.</p>
                    </div>

                    {/* Sub-navigation inside Admin Command Center */}
                    <div className="flex bg-slate-950 p-1 rounded-xl gap-1 border border-slate-800">
                      {[
                        { id: "dashboard", label: "Dashboard Widgets" },
                        { id: "students", label: "Student Roster Ledger" },
                        { id: "builder", label: "Automation Rule Builder" }
                      ].map((subTab) => (
                        <button
                          key={subTab.id}
                          type="button"
                          onClick={() => {
                            setSelectedAdminTab(subTab.id as any);
                            setSelectedStudentDetails(null);
                          }}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                            selectedAdminTab === subTab.id
                              ? "bg-slate-900 text-indigo-400 border border-slate-800"
                              : "text-slate-500 hover:text-slate-350"
                          }`}
                        >
                          {subTab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SUB-TAB 1: DASHBOARD WIDGETS */}
                  {selectedAdminTab === "dashboard" && (
                    <div className="space-y-6">
                      {/* Metric Grid */}
                      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                        {[
                          { label: "Total Registrations", value: students.length, suffix: "Seekers", desc: "Total database cohort size" },
                          { label: "Active Cohort", value: students.filter(s => s.riskCategory === "Active" || s.riskCategory === "High Performer").length, suffix: "Users", desc: "Consistency index looks green" },
                          { label: "At-Risk / Stalled", value: students.filter(s => s.riskCategory !== "Active" && s.riskCategory !== "High Performer").length, suffix: "Seekers", desc: "Requires manual/auto nudges" },
                          { label: "Average Success Score", value: Math.round(students.reduce((acc, curr) => acc + (curr.successScore || 0), 0) / (students.length || 1)), suffix: "/ 100", desc: "Ecosystem consistency average" },
                          { label: "Total Submissions", value: assignments.length, suffix: "Quests", desc: "Grading queue review ledger" }
                        ].map((m, i) => (
                          <div key={i} className="border border-slate-800 bg-slate-900/40 p-4 rounded-2xl flex flex-col justify-between space-y-1 text-xs">
                            <span className="text-slate-500 font-medium font-mono text-[9px] uppercase tracking-wider">{m.label}</span>
                            <div className="flex items-baseline gap-1.5 py-1">
                              <span className="text-xl font-bold font-mono text-white">{m.value}</span>
                              <span className="text-[10px] text-slate-400 font-medium">{m.suffix}</span>
                            </div>
                            <span className="text-[9px] text-slate-500 font-light leading-normal">{m.desc}</span>
                          </div>
                        ))}
                      </div>

                      {/* Drop-off & Funnel Analytics & Risk Category Distribution */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Funnel */}
                        <Card className="lg:col-span-7 space-y-4">
                          <h3 className="text-xs font-bold uppercase tracking-wider border-b pb-2 border-slate-800 text-slate-350">
                            Seeker Conversion Funnel Drop-off
                          </h3>
                          <div className="space-y-4 pt-2">
                            {[
                              { stage: "Registered Seeker Profiles", count: students.length, pct: 100, color: "bg-indigo-650/80" },
                              { stage: "Completed Profile Onboarding", count: students.filter(s => s.onboarded).length, pct: Math.round((students.filter(s => s.onboarded).length / (students.length || 1)) * 100), color: "bg-indigo-550/80" },
                              { stage: "Ascension Tier Unlock (L2)", count: students.filter(s => s.unlockedLevel >= 2).length, pct: Math.round((students.filter(s => s.unlockedLevel >= 2).length / (students.length || 1)) * 100), color: "bg-indigo-500/80" },
                              { stage: "Quantum Circle Unlock (L3)", count: students.filter(s => s.unlockedLevel >= 3).length, pct: Math.round((students.filter(s => s.unlockedLevel >= 3).length / (students.length || 1)) * 100), color: "bg-emerald-500/80" }
                            ].map((f, i) => (
                              <div key={i} className="space-y-1.5 text-xs">
                                <div className="flex justify-between items-center">
                                  <span className="font-semibold text-slate-300">{f.stage}</span>
                                  <div className="font-mono text-slate-400 text-[10px]">
                                    <strong className="text-white font-bold">{f.count}</strong> seekers ({f.pct}%)
                                  </div>
                                </div>
                                <div className="w-full bg-slate-950 h-3.5 rounded-lg overflow-hidden border border-slate-850">
                                  <div className={`h-full ${f.color} transition-all`} style={{ width: `${f.pct}%` }} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </Card>

                        {/* Risk breakup */}
                        <Card className="lg:col-span-5 space-y-4">
                          <h3 className="text-xs font-bold uppercase tracking-wider border-b pb-2 border-slate-800 text-slate-350">
                            Risk Designations Breakout
                          </h3>
                          
                          <div className="space-y-3.5 pt-2 text-xs text-left">
                            {[
                              { label: "High Performers (>85 Score)", count: students.filter(s => s.riskCategory === "High Performer").length, color: "bg-emerald-500" },
                              { label: "Active Progress (Green)", count: students.filter(s => s.riskCategory === "Active").length, color: "bg-indigo-500" },
                              { label: "Slow Learners (Lesson gaps)", count: students.filter(s => s.riskCategory === "Slow Learner").length, color: "bg-amber-500" },
                              { label: "Inconsistent Habits (<60%)", count: students.filter(s => s.riskCategory === "Course Abandonment Risk").length, color: "bg-pink-500" },
                              { label: "At-Risk (No login 3d+)", count: students.filter(s => s.riskCategory === "At-Risk").length, color: "bg-rose-400" },
                              { label: "Inactive (No login 7d+)", count: students.filter(s => s.riskCategory === "Inactive").length, color: "bg-rose-600" }
                            ].map((r, i) => {
                              const pct = Math.round((r.count / (students.length || 1)) * 100) || 0;
                              return (
                                <div key={i} className="flex items-center gap-3">
                                  <div className={`h-2.5 w-2.5 rounded-full shrink-0 ${r.color}`} />
                                  <div className="flex-grow flex justify-between items-center text-slate-400 font-sans">
                                    <span className="font-light">{r.label}</span>
                                    <span className="font-bold font-mono text-slate-200">{r.count} ({pct}%)</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </Card>
                      </div>
                    </div>
                  )}

                  {/* SUB-TAB 2: STUDENT ROSTER LEDGER */}
                  {selectedAdminTab === "students" && (
                    <div className="space-y-6">
                      <div className="border border-slate-850 bg-slate-900/40 rounded-3xl overflow-hidden shadow-xl">
                        <div className="p-4 border-b border-slate-800 bg-slate-950/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
                          <span className="font-bold uppercase tracking-wider text-slate-400 font-mono">Cohort Search Registry</span>
                          <span className="text-[10px] text-slate-500">{students.length} seeker coordinates registered.</span>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="border-b border-slate-800 text-[10px] uppercase font-bold text-slate-500 tracking-wider bg-slate-950/40">
                                <th className="p-4 font-mono">Seeker / Email</th>
                                <th className="p-4 font-mono">Purchased Course</th>
                                <th className="p-4 font-mono">Telemetry Score</th>
                                <th className="p-4 font-mono">Streak days</th>
                                <th className="p-4 font-mono">Risk Category</th>
                                <th className="p-4 font-mono text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {students.map((student) => (
                                <tr key={student.email} className="border-b border-slate-850 hover:bg-slate-800/10 transition-colors">
                                  <td className="p-4">
                                    <div className="space-y-0.5">
                                      <span className="font-bold text-slate-200">{student.name}</span>
                                      <span className="text-[9px] text-slate-500 block font-mono leading-none">{student.email}</span>
                                    </div>
                                  </td>
                                  <td className="p-4 text-slate-400 font-light">{student.coursePurchased}</td>
                                  <td className="p-4">
                                    <div className="flex items-center gap-2">
                                      <span className="font-bold font-mono text-indigo-400">{student.successScore || 0}</span>
                                      <div className="w-16 bg-slate-950 h-1 rounded-full overflow-hidden border border-slate-850">
                                        <div className="h-full bg-indigo-500" style={{ width: `${student.successScore || 0}%` }} />
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-4">
                                    <span className="font-bold text-emerald-500 font-mono">{student.streakDays || 0}d</span>
                                  </td>
                                  <td className="p-4">
                                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider font-mono ${
                                      student.riskCategory === "High Performer"
                                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                        : student.riskCategory === "Active"
                                        ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                                        : student.riskCategory === "Slow Learner"
                                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                        : "bg-rose-500/10 text-rose-450 border border-rose-500/20"
                                    }`}>
                                      {student.riskCategory || "Active"}
                                    </span>
                                  </td>
                                  <td className="p-4 text-right">
                                    <button
                                      type="button"
                                      onClick={() => setSelectedStudentDetails(student)}
                                      className="bg-indigo-650 hover:bg-indigo-500 text-white font-bold uppercase text-[9px] tracking-wider px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors border-none"
                                    >
                                      Drill-down Telemetry
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* DRILL-DOWN DETAILED TELEMETRY DRAWER / COMPONENT */}
                      {selectedStudentDetails && (
                        <Card className="border-indigo-500/20 bg-indigo-950/5 space-y-6">
                          <div className="flex justify-between items-center border-b pb-3 border-slate-800">
                            <div className="flex items-center gap-2">
                              <Activity className="h-4.5 w-4.5 text-indigo-400" />
                              <h3 className="text-sm font-bold uppercase tracking-wide font-display text-white">
                                Telemetry audit drawer: {selectedStudentDetails.name}
                              </h3>
                            </div>
                            <button
                              onClick={() => setSelectedStudentDetails(null)}
                              className="text-slate-400 hover:text-white font-bold text-xs uppercase cursor-pointer"
                            >
                              ✕ Close Drawer
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Profile details */}
                            <div className="space-y-4">
                              <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-wider font-mono border-b pb-1 border-slate-850">
                                Demographic coordinates
                              </h4>
                              
                              <div className="space-y-2 text-xs text-slate-400">
                                <div className="flex justify-between"><span className="font-light">Mobile:</span><span className="font-mono text-slate-200">{selectedStudentDetails.mobile || "N/A"}</span></div>
                                <div className="flex justify-between"><span className="font-light">Location:</span><span className="font-mono text-slate-200">{selectedStudentDetails.city || "N/A"}, {selectedStudentDetails.country || "N/A"}</span></div>
                                <div className="flex justify-between"><span className="font-light">Profession:</span><span className="font-mono text-slate-200">{selectedStudentDetails.profession || "N/A"}</span></div>
                                <div className="flex justify-between"><span className="font-light">Age Group:</span><span className="font-mono text-slate-200">{selectedStudentDetails.ageGroup || "N/A"}</span></div>
                                <div className="flex justify-between"><span className="font-light">Joining channel:</span><span className="font-mono text-slate-200">{selectedStudentDetails.source || "N/A"}</span></div>
                                <div className="flex justify-between"><span className="font-light">Course enrolled:</span><span className="font-mono text-slate-200 text-xs">{selectedStudentDetails.coursePurchased || "N/A"}</span></div>
                                <div className="flex justify-between"><span className="font-light">Last Activity log:</span><span className="font-mono text-slate-200 text-[10px]">{selectedStudentDetails.lastActivity || "N/A"}</span></div>
                              </div>
                            </div>

                            {/* Self Assessment slider values */}
                            <div className="space-y-4">
                              <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-wider font-mono border-b pb-1 border-slate-850">
                                Self-Assessment Radar Indicators
                              </h4>
                              
                              <div className="space-y-2">
                                {[
                                  { label: "Discipline", val: selectedStudentDetails.selfAssessment?.discipline || 5, color: "bg-indigo-500" },
                                  { label: "Focus", val: selectedStudentDetails.selfAssessment?.focus || 5, color: "bg-emerald-500" },
                                  { label: "Energy", val: selectedStudentDetails.selfAssessment?.energy || 5, color: "bg-amber-500" },
                                  { label: "Relationships", val: selectedStudentDetails.selfAssessment?.relationships || 5, color: "bg-pink-500" },
                                  { label: "Health", val: selectedStudentDetails.selfAssessment?.health || 5, color: "bg-cyan-500" },
                                  { label: "Finance", val: selectedStudentDetails.selfAssessment?.finance || 5, color: "bg-rose-500" }
                                ].map((item, idx) => (
                                  <div key={idx} className="space-y-0.5 text-[11px]">
                                    <div className="flex justify-between items-center text-slate-400">
                                      <span>{item.label}</span>
                                      <span className="font-bold text-slate-200 font-mono">{item.val}/10</span>
                                    </div>
                                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-850">
                                      <div className={`h-full ${item.color}`} style={{ width: `${item.val * 10}%` }} />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* 90-Day Vision & Trigger Alerts panel */}
                            <div className="space-y-4">
                              <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-wider font-mono border-b pb-1 border-slate-850">
                                Vision lockbox & Alert simulation
                              </h4>

                              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-850 space-y-1.5 text-xs">
                                <span className="text-[8px] uppercase font-bold text-indigo-400 tracking-wider block font-mono">90-Day Signed Vision:</span>
                                <p className="text-[10px] text-slate-355 italic font-mono leading-relaxed line-clamp-3">
                                  &ldquo;{selectedStudentDetails.vision90Day || "No vision blueprint sealed."}&rdquo;
                                </p>
                              </div>

                              <div className="space-y-2 pt-1.5">
                                <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider block font-mono">Manual alert simulation triggers:</span>
                                <div className="grid grid-cols-1 gap-1.5">
                                  <button
                                    onClick={() => {
                                      const msg = `ALERT: Seeker ${selectedStudentDetails.name}, your account is flagged at-risk due to no activity for 3 days. Return to the Arena or schedule a review: https://swapnilonline.com/recovery`;
                                      sendSimulatedAlert(selectedStudentDetails.email, "Manual Override Alert (Inactivity)", "Email", msg);
                                    }}
                                    className="bg-slate-955 hover:bg-slate-950 hover:text-indigo-400 border border-slate-850 px-2 py-1.5 rounded-lg text-[9px] uppercase font-bold font-mono tracking-wider text-left text-slate-400 cursor-pointer transition-colors"
                                  >
                                    📧 Simulate Inactivity (3 Days) Email
                                  </button>
                                  <button
                                    onClick={() => {
                                      const msg = `WARNING: Seeker ${selectedStudentDetails.name}, consistency index dropped to ${selectedStudentDetails.consistencyScore || 50}%. Check habits catalog checklist.`;
                                      sendSimulatedAlert(selectedStudentDetails.email, "Manual Override Alert (Consistency)", "WhatsApp", msg);
                                    }}
                                    className="bg-slate-955 hover:bg-slate-950 hover:text-emerald-400 border border-slate-850 px-2 py-1.5 rounded-lg text-[9px] uppercase font-bold font-mono tracking-wider text-left text-slate-400 cursor-pointer transition-colors"
                                  >
                                    💬 Simulate Consistency Drop WhatsApp
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Communication Log Table for this student */}
                          <div className="space-y-3 pt-2">
                            <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-wider font-mono border-b pb-1 border-slate-850">
                              Alert logs history for {selectedStudentDetails.name}
                            </h4>

                            <div className="space-y-2 max-h-[160px] overflow-y-auto pr-2">
                              {sentCommunications.filter(c => c.studentEmail.toLowerCase() === selectedStudentDetails.email.toLowerCase()).length > 0 ? (
                                sentCommunications
                                  .filter(c => c.studentEmail.toLowerCase() === selectedStudentDetails.email.toLowerCase())
                                  .map((comm) => (
                                    <div key={comm.id} className="border border-slate-850 p-3 rounded-xl bg-slate-955 text-xs flex justify-between gap-4 items-start">
                                      <div className="space-y-1 text-left">
                                        <div className="flex items-center gap-2">
                                          <span className={`px-1.5 py-0.5 rounded text-[7px] font-bold font-mono uppercase ${
                                            comm.type === "WhatsApp" ? "bg-emerald-500/10 text-emerald-400" : "bg-indigo-500/10 text-indigo-400"
                                          }`}>{comm.type}</span>
                                          <span className="font-bold text-slate-350 font-mono text-[9px]">{comm.triggerName}</span>
                                        </div>
                                        <p className="text-[10px] text-slate-400 font-mono leading-relaxed whitespace-pre-wrap">{comm.content}</p>
                                      </div>
                                      <span className="text-[8px] text-slate-550 shrink-0 font-mono">{comm.timestamp}</span>
                                    </div>
                                  ))
                              ) : (
                                <p className="text-[10px] text-slate-500 italic font-mono text-center py-4 bg-slate-950/20 rounded-xl">
                                  No sent warnings logged inside the ledger database for this student.
                                </p>
                              )}
                            </div>
                          </div>
                        </Card>
                      )}
                    </div>
                  )}

                  {/* SUB-TAB 3: AUTOMATION RULE BUILDER */}
                  {selectedAdminTab === "builder" && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      {/* Rules List Column */}
                      <div className="lg:col-span-5 space-y-4">
                        <Card className="space-y-4">
                          <div className="flex justify-between items-center border-b pb-2 border-slate-800">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-350">Active triggers</h3>
                            <button
                              onClick={triggerAutomationRuleEvaluation}
                              className="bg-indigo-650 hover:bg-indigo-500 text-white font-bold uppercase text-[9px] tracking-wider px-2.5 py-1 rounded-md cursor-pointer transition-colors border-none"
                            >
                              Evaluate triggers now
                            </button>
                          </div>

                          <div className="space-y-3.5">
                            {automationRules.map((rule) => (
                              <button
                                key={rule.id}
                                type="button"
                                onClick={() => setSelectedRuleId(rule.id)}
                                className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex justify-between items-start gap-4 ${
                                  selectedRuleId === rule.id
                                    ? "bg-indigo-650/10 border-indigo-500 text-white"
                                    : "bg-slate-950/20 border-slate-800 text-slate-400 hover:border-slate-700"
                                }`}
                              >
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-xs">{rule.triggerEvent}</span>
                                    <span className={`px-1.5 py-0.5 rounded text-[7px] font-bold font-mono uppercase ${
                                      rule.actionChannel === "WhatsApp"
                                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                        : rule.actionChannel === "Email"
                                        ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                    }`}>{rule.actionChannel}</span>
                                  </div>
                                  <p className="text-[10px] text-slate-500 font-light leading-normal">{rule.condition}</p>
                                </div>

                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleAutomationRule(rule.id);
                                  }}
                                  className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider cursor-pointer border ${
                                    rule.enabled
                                      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20"
                                      : "bg-slate-950 text-slate-500 border-slate-800"
                                  }`}
                                >
                                  {rule.enabled ? "ACTIVE" : "PAUSED"}
                                </div>
                              </button>
                            ))}
                          </div>
                        </Card>
                      </div>

                      {/* Template Editor Column */}
                      <div className="lg:col-span-7 space-y-4">
                        <Card className="space-y-5">
                          <div className="flex justify-between items-center border-b pb-2 border-slate-800">
                            <span className="text-[10px] uppercase font-bold text-indigo-400 font-mono tracking-widest block">Rule Editor</span>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-350">Message Template Builder</h3>
                          </div>

                          <div className="space-y-4 text-xs text-left">
                            <div className="space-y-1.5">
                              <label className="text-[9px] uppercase font-bold text-slate-500 tracking-wider font-mono block">Template Subject line</label>
                              <input
                                type="text"
                                placeholder="Alert subject line..."
                                value={editingTemplateSubject}
                                onChange={(e) => setEditingTemplateSubject(e.target.value)}
                                className="input-field text-xs text-white"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <div className="flex justify-between items-center">
                                <label className="text-[9px] uppercase font-bold text-slate-500 tracking-wider font-mono block">Template Body content</label>
                                <span className="text-[8px] text-slate-500 font-mono font-bold uppercase tracking-wider">Supports: {"{Student Name}"}, {"{Streak}"}, {"{Progress}"}, {"{Consistency}"}</span>
                              </div>
                              <textarea
                                rows={7}
                                placeholder="Alert body content..."
                                value={editingTemplateBody}
                                onChange={(e) => setEditingTemplateBody(e.target.value)}
                                className="input-field text-xs text-white font-mono resize-none"
                              />
                            </div>

                            <div className="flex items-center justify-between pt-2">
                              <div className="flex items-center gap-3">
                                <button
                                  type="button"
                                  onClick={() => toggleAutomationRule(selectedRuleId)}
                                  className={`btn-secondary text-[10px] uppercase font-bold tracking-wider py-2 px-4 ${
                                    ruleEnabled ? "hover:border-rose-500/25 hover:text-rose-400" : ""
                                  }`}
                                >
                                  {ruleEnabled ? "⏸️ Pause rule trigger" : "▶️ Activate rule trigger"}
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  updateAutomationRuleTemplate(selectedRuleId, editingTemplateSubject, editingTemplateBody);
                                  
                                  const toast = document.createElement("div");
                                  toast.className = "fixed bottom-20 right-5 bg-emerald-500 text-white font-semibold px-4 py-3 rounded-xl shadow-lg z-50 text-xs border border-emerald-400/20";
                                  toast.innerHTML = "💾 Rules Database: Template updated & serialized successfully.";
                                  document.body.appendChild(toast);
                                  setTimeout(() => toast.remove(), 3000);
                                }}
                                className="btn-primary text-[10px] uppercase font-bold tracking-wider py-2 px-6 border-none cursor-pointer"
                              >
                                Save Changes
                              </button>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "quantum" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6 text-left"
                >
                  <div className="flex justify-between items-center border-b pb-4 border-slate-800">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight font-display">Quantum VIP Mastermind</h2>
                      <p className="text-slate-400 text-xs font-light">Exclusive briefings and private mastermind coordinates for Level 3 members.</p>
                    </div>
                  </div>

                  {user.unlockedLevel < 3 ? (
                    <Card className="max-w-xl mx-auto border-indigo-500/20 bg-indigo-950/20 text-center p-8 space-y-4">
                      <div className="h-12 w-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400">
                        <Sparkles className="h-6 w-6" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold">Quantum Club Invitation Pending</h3>
                        <p className="text-xs text-slate-400 leading-relaxed font-light max-w-sm mx-auto">
                          Membership in the Quantum Circle requires completion of all Level 2 Integration projects, high-tier consistency metrics, and an active business audit.
                        </p>
                      </div>
                      <div className="pt-2">
                        <button
                          onClick={() => handleUpgradeLevel(3)}
                          className="btn-primary text-xs uppercase tracking-wider"
                        >
                          Simulate Level 3 Upgrade Unlock
                        </button>
                      </div>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="space-y-4">
                        <div className="flex justify-between items-start">
                          <span className="badge-success text-[9px]">Active Link</span>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Private Mastermind Zoom</h4>
                        </div>
                        <h3 className="text-lg font-bold">Weekly Founder Accountability Call</h3>
                        <p className="text-xs text-slate-400 font-light leading-relaxed">
                          Join Swapnil and fellow L3 architects live on Zoom to triage funnel blockages and operational setups.
                        </p>
                        <div className="pt-2">
                          <a
                            href="https://zoom.us"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary text-xs uppercase tracking-wider"
                          >
                            Launch Zoom Meeting <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </Card>

                      <Card className="space-y-4">
                        <div className="flex justify-between items-start">
                          <span className="badge-achievement text-[9px]">VIP Channel</span>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Slack Coordinates</h4>
                        </div>
                        <h3 className="text-lg font-bold">Private Slack workspace access</h3>
                        <p className="text-xs text-slate-400 font-light leading-relaxed">
                          Direct chat channel coordinates for 1-on-1 operational audits, immediate feedback, and tech stack setups.
                        </p>
                        <div className="pt-2">
                          <a
                            href="https://slack.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary text-xs uppercase tracking-wider"
                          >
                            Enter Slack Workspace <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </Card>
                    </div>
                  )}
                </motion.div>
              )}

              {/* 7. MENTOR GRADING DESK */}
              {activeTab === "mentor" && (user.role === "Admin" || user.role === "Mentor") && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6 text-left"
                >
                  <div className="flex justify-between items-center border-b pb-4 border-slate-800">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight font-display">Mentor Review Desk</h2>
                      <p className="text-slate-400 text-xs font-light">Grade submitted assignments and provide accountability feedback.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {assignments.length > 0 ? (
                      assignments.map((asg) => (
                        <Card key={asg.id} className="space-y-4">
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-xs">{asg.studentName}</span>
                                <span className="text-[9px] text-slate-400 font-mono">{asg.studentEmail}</span>
                              </div>
                              <span className="text-[10px] text-slate-400 block font-light mt-0.5">{asg.timestamp}</span>
                            </div>
                            <span className={
                              asg.status === "approved"
                                ? "badge-success text-[8px]"
                                : asg.status === "rejected"
                                ? "badge-danger text-[8px]"
                                : "badge-warning text-[8px]"
                            }>
                              {asg.status.toUpperCase()}
                            </span>
                          </div>

                          <div className="border p-4 rounded-xl space-y-1.5 bg-slate-950/50 border-slate-800">
                            <span className="text-[8px] font-bold text-indigo-500 uppercase tracking-wider block font-mono">
                              {asg.courseTitle} - {asg.lessonTitle}
                            </span>
                            <h4 className="text-xs font-bold text-slate-200">{asg.title}</h4>
                            <div className="pt-2 flex items-center gap-2">
                              <a
                                href={asg.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-450 hover:underline"
                              >
                                View Submitted Assets link <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>
                            {asg.feedback && (
                              <p className="text-[10px] text-slate-400 italic pt-2 border-t border-slate-800 mt-2 font-mono">
                                Feedback: &ldquo;{asg.feedback}&rdquo;
                              </p>
                            )}
                          </div>

                          {asg.status === "pending" && (
                            <div className="flex flex-col sm:flex-row gap-2 pt-2">
                              <input
                                type="text"
                                placeholder="Add optional review notes..."
                                id={`feedback_${asg.id}`}
                                className="input-field flex-grow"
                              />
                              <div className="flex gap-2 shrink-0">
                                <button
                                  onClick={() => {
                                    const input = document.getElementById(`feedback_${asg.id}`) as HTMLInputElement;
                                    updateAssignmentStatus(asg.id, "approved", input?.value || "Approved! Keep it up.");
                                  }}
                                  className="btn-success text-xs uppercase tracking-wider"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => {
                                    const input = document.getElementById(`feedback_${asg.id}`) as HTMLInputElement;
                                    updateAssignmentStatus(asg.id, "rejected", input?.value || "Please revise and resubmit.");
                                  }}
                                  className="btn-danger text-xs uppercase tracking-wider"
                                >
                                  Request Revision
                                </button>
                              </div>
                            </div>
                          )}
                        </Card>
                      ))
                    ) : (
                      <div className="py-8 text-center text-slate-500 text-xs font-light">
                        No submissions registered in the ledger.
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </main>
        </div>
      )}

      {/* MOCK PAYMENT OVERLAY */}
      <AnimatePresence>
        {showPaymentModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-3xl p-6 space-y-6 text-left shadow-2xl text-slate-200"
            >
              <div className="space-y-1">
                <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider font-mono">Sandbox Payment Simulator</span>
                <h3 className="text-xl font-bold tracking-tight text-white font-display">Unlock Level {selectedPayLevel} Access</h3>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  You are unlocking Level {selectedPayLevel} Ascension clearance. Fulfill the simulated transaction gate below.
                </p>
              </div>

              {paymentStatus === "idle" && (
                <div className="space-y-4">
                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-400">Tuition Tier Fee</span>
                    <span className="font-bold font-mono text-white">
                      {selectedPayLevel === 3 ? "₹1,24,999" : "₹24,999"}
                    </span>
                  </div>
                  
                  <button
                    onClick={handleSimulatePayment}
                    className="btn-primary w-full text-xs uppercase tracking-wider"
                  >
                    Authorize Simulated Transfer
                  </button>
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="btn-secondary w-full text-xs uppercase tracking-wider"
                  >
                    Cancel Transaction
                  </button>
                </div>
              )}

              {paymentStatus === "processing" && (
                <div className="py-8 text-center space-y-3">
                  <div className="h-8 w-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin mx-auto" />
                  <p className="text-xs font-mono text-indigo-400">Processing ledger update...</p>
                </div>
              )}

              {paymentStatus === "success" && (
                <div className="py-8 text-center space-y-3">
                  <div className="h-10 w-10 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mx-auto border border-emerald-500/20">
                    <Check className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">Authorization Completed</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* WELCOME VIDEO POPUP OVERLAY */}
      <AnimatePresence>
        {showWelcomeVideoModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-3xl p-6 md:p-8 space-y-6 text-left shadow-2xl text-slate-200 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-650/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-1">
                <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider font-mono">Welcome Video Briefing</span>
                <h3 className="text-xl font-bold tracking-tight text-white font-display">Watch Your Transformation Welcome</h3>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  Swapnil has prepared a private briefing outlining your 90-day transformation pathway. Watch this message to configure your console.
                </p>
              </div>

              <div className="border border-slate-800 rounded-2xl overflow-hidden aspect-video bg-black relative">
                <video
                  src={welcomeVideoConfig.url}
                  controls
                  autoPlay={welcomeVideoConfig.autoPlay}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
                <span className="text-[10px] text-slate-500 font-mono">
                  Assigned level: <span className="text-indigo-400 font-semibold">Level {welcomeVideoConfig.levelScope} Path</span>
                </span>
                
                <button
                  type="button"
                  onClick={() => {
                    setShowWelcomeVideoModal(false);
                    if (typeof window !== "undefined" && user) {
                      localStorage.setItem(`gos_welcome_video_dismissed_${user.email}`, "true");
                    }
                  }}
                  className="btn-primary flex items-center gap-2 text-xs uppercase tracking-wider py-2.5 px-6 font-bold cursor-pointer"
                >
                  Start My Transformation Journey
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CHATBOT OVERLAY COMPACT */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-80 h-96 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col text-left"
          >
            {/* Header */}
            <div className="bg-indigo-600 p-4 flex justify-between items-center text-white shrink-0">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                <span className="text-xs font-bold font-display uppercase tracking-wider">Accountability Nudge</span>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white/80 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-4 space-y-3 text-xs">
              {chatMessages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] rounded-xl px-3 py-2 leading-relaxed ${
                    m.sender === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-950 border border-slate-800 text-slate-350"
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input form */}
            <form onSubmit={handleSendChatMessage} className="p-2 border-t border-slate-800 bg-slate-950 shrink-0 flex gap-2">
              <input
                type="text"
                placeholder="Ask your accountability guide..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-grow bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center justify-center transition-all"
              >
                <Send className="h-3 w-3" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CERTIFICATE PREVIEW MODAL */}
      <AnimatePresence>
        {showCertificateModal && certificateModalData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-4xl w-full text-center relative overflow-hidden shadow-2xl space-y-6 my-8"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-650/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-90 h-90 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex justify-between items-center border-b pb-4 border-slate-800">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-indigo-400" />
                  <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-display">
                    Verified Graduate Credentials
                  </h3>
                </div>
                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="text-slate-400 hover:text-white font-bold text-sm"
                >
                  ✕
                </button>
              </div>

              {/* Landscape Certificate Container */}
              <div className="border border-slate-800 rounded-2xl p-4 bg-slate-950/50 overflow-x-auto shadow-inner">
                <div className="min-w-[680px] md:min-w-0">
                  <CertificateLayout
                    studentName={user?.name || "Rahul Sen"}
                    courseName="ELITE 90™ Growth Operating System"
                    levelName={certificateModalData.level === 1 ? "Level 1: Foundational Architecture" : "Level 2: Systems Integration"}
                    completionDate={certificateModalData.issueDate}
                    certificateId={certificateModalData.id}
                  />
                </div>
              </div>

              {/* Action Buttons Panel */}
              <div className="flex flex-wrap justify-center items-center gap-4 pt-2 border-t border-slate-800">
                
                {/* Print/Download Registry Page */}
                <button
                  onClick={() => window.open(`/academy/certificate/${certificateModalData.id}`, "_blank")}
                  className="btn-primary flex items-center gap-2 text-xs uppercase tracking-wider cursor-pointer text-white rounded-xl py-2.5 px-4"
                >
                  <Award className="h-4 w-4" /> Download / Print PDF
                </button>

                {/* LinkedIn Add to Profile */}
                <a
                  href={`https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(
                    certificateModalData.level === 1 ? "ELITE 90™ - Level 1 Foundation" : "ELITE 90™ - Level 2 Systems Integration"
                  )}&organizationName=Shiwalay%20Consulting&issueYear=2026&issueMonth=6&certId=${
                    certificateModalData.id
                  }&certUrl=${encodeURIComponent(`https://swapnilonline.com/academy/certificate/${certificateModalData.id}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0077b5] hover:bg-[#0077b5]/90 text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  Add to LinkedIn Profile
                </a>

                {/* X Share */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    `I am proud to share that I have completed the ${
                      certificateModalData.level === 1 ? "Level 1 Foundation" : "Level 2 Systems Integration"
                    } of the ELITE 90™ program! Verify here: https://swapnilonline.com/academy/certificate/${certificateModalData.id}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-9 w-9 rounded-xl border border-slate-805 hover:bg-slate-800 text-slate-350 hover:text-white transition-all cursor-pointer"
                  title="Share on X"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* WhatsApp Share */}
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    `I am proud to share that I have completed the ${
                      certificateModalData.level === 1 ? "Level 1 Foundation" : "Level 2 Systems Integration"
                    } of the ELITE 90™ program! Verify here: https://swapnilonline.com/academy/certificate/${certificateModalData.id}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-9 w-9 rounded-xl border border-slate-805 hover:bg-slate-800 text-slate-350 hover:text-white transition-all cursor-pointer"
                  title="Share on WhatsApp"
                >
                  <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.731-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.424 0 9.835-4.41 9.837-9.834.001-2.628-1.021-5.1-2.877-6.958-1.857-1.858-4.33-2.88-6.96-2.881-5.428 0-9.84 4.412-9.842 9.837-.001 1.53.407 3.023 1.182 4.3l-.997 3.637 3.732-.98.301.148z" />
                  </svg>
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="w-full py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/40 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
