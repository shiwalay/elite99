import { create } from "zustand";
import { DEFAULT_COURSES } from "../app/academy/courses-data";

export const calculateTelemetry = (
  student: any,
  completedLessons: string[],
  passedQuizzes: string[],
  habitsChecked: Record<string, boolean>,
  assignments: any[]
) => {
  const totalLessons = 32;
  const completedLessonsCount = completedLessons.length;
  const passedQuizzesCount = passedQuizzes.length;
  
  const completionScore = Math.min((completedLessonsCount / totalLessons) * 30, 30);
  
  const checkedHabitsCount = Object.values(habitsChecked).filter(Boolean).length;
  const consistencyScore = Math.min((checkedHabitsCount / 9) * 100, 100);
  const habitPoints = Math.min((checkedHabitsCount / 9) * 20, 20);
  
  const studentAssignments = assignments.filter(a => a.studentEmail.toLowerCase() === student.email.toLowerCase());
  const approvedAssignments = studentAssignments.filter(a => a.status === "approved").length;
  const assignmentPoints = Math.min((approvedAssignments / 8) * 15, 15);
  
  const streakPoints = Math.min((student.streakDays || 0) * 2, 10);
  
  const quizPoints = Math.min((passedQuizzesCount / 8) * 15, 15);
  
  const communityPoints = student.email.toLowerCase() === "rahul@business.com" ? 8 : 5;
  
  const successScore = Math.round(completionScore + habitPoints + assignmentPoints + streakPoints + quizPoints + communityPoints);
  const finalSuccessScore = Math.min(Math.max(successScore, 5), 100);
  
  let riskCategory: any = "Active";
  const lastLoginDiff = student.lastLogin ? (Date.now() - new Date(student.lastLogin).getTime()) / (1000 * 60 * 60 * 24) : 0;
  
  if (lastLoginDiff >= 7) {
    riskCategory = "Inactive";
  } else if (lastLoginDiff >= 3) {
    riskCategory = "At-Risk";
  } else if (consistencyScore < 60) {
    riskCategory = "Course Abandonment Risk";
  } else if (completionScore < 5 && lastLoginDiff > 2) {
    riskCategory = "Slow Learner";
  } else if (finalSuccessScore > 85) {
    riskCategory = "High Performer";
  }
  
  return {
    successScore: finalSuccessScore,
    consistencyScore: Math.round(consistencyScore),
    riskCategory
  };
};

export interface StudentProfile {
  name: string;
  email: string;
  role: string;
  mobile?: string;
  city?: string;
  country?: string;
  profession?: string;
  ageGroup?: string;
  goals?: string[];
  joiningDate?: string;
  source?: string;
  coursePurchased?: string;
  unlockedLevel: number; // 1, 2, or 3
  progressPercent?: number;
  lastLogin?: string;
  lastActivity?: string;
  accountStatus?: "Active" | "Suspended" | "Under Review";
  
  // Gamification & telemetry
  xp: number;
  streakDays: number;
  rank: string;
  points: number;
  onboarded?: boolean;
  profilePhoto?: string;
  vision90Day?: string;
  agreedToAccountability?: boolean;
  selfAssessment?: {
    discipline: number;
    focus: number;
    energy: number;
    relationships: number;
    health: number;
    finance: number;
  };
  successScore?: number;
  consistencyScore?: number;
  riskCategory?: "Active" | "Inactive" | "Slow Learner" | "High Performer" | "At-Risk" | "Course Abandonment Risk";

  onboardingData?: {
    name?: string;
    mobile: string;
    experience: string;
    revenue: string;
    challenge: string;
    goal: string;
  };
  analyzedGoalCard?: {
    title: string;
    description: string;
    focusMetrics: string;
    dailyChecked?: boolean;
  };
  certificates?: Array<{
    id: string;
    level: number;
    issueDate: string;
  }>;
}

export interface SentCommunication {
  id: string;
  studentEmail: string;
  type: "Email" | "WhatsApp";
  triggerName: string;
  content: string;
  timestamp: string;
}

export interface AutomationRule {
  id: string;
  triggerEvent: string;
  condition: string;
  actionChannel: "Email" | "WhatsApp" | "Both";
  templateSubject: string;
  templateBody: string;
  enabled: boolean;
}

export interface AiCoachMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface WelcomeVideoConfig {
  url: string;
  autoPlay: boolean;
  isConfigured: boolean;
  levelScope: number;
}

export interface CrmLead {
  id: string;
  name: string;
  email: string;
  mobile: string;
  businessType: string;
  monthlyRevenue: string;
  challenge: string;
  notes: string;
  status: "New" | "Contacted" | "Qualified" | "Lost";
  source: string;
  date: string;
}

export interface WebinarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  zoomUrl: string;
  attendeesCount: number;
}

export interface CmsPost {
  slug: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  published: boolean;
  content?: string;
}

export interface CmsResource {
  id: string;
  title: string;
  tagline: string;
  fileSize: string;
  downloadsCount: number;
  description: string;
  details: string[];
}

export interface AssignmentSubmission {
  id: string;
  courseId: string;
  lessonId: string;
  courseTitle: string;
  lessonTitle: string;
  studentName: string;
  studentEmail: string;
  title: string;
  link: string;
  status: "pending" | "approved" | "rejected";
  feedback?: string;
  timestamp: string;
}

interface EcosystemState {
  // Authentication & Student Profile
  user: StudentProfile | null;
  isAuthenticated: boolean;
  theme: "light" | "dark";
  
  // Curriculum progress
  unlockedCourses: string[];
  completedLessons: string[];
  passedQuizzes: string[];
  habitsChecked: Record<string, boolean>;
  assignments: AssignmentSubmission[];
  
  // CRM Leads
  leads: CrmLead[];
  
  // CMS & Content Settings
  websiteCmsCopy: {
    heroHeadline: string;
    heroSubheadline: string;
    ctaText: string;
    testimonials: Array<{ id: string; name: string; role: string; rating: number; content: string }>;
  };
  posts: CmsPost[];
  resources: CmsResource[];
  webinars: WebinarEvent[];

  // Accountability Tracking & AI Coach states
  students: StudentProfile[];
  sentCommunications: SentCommunication[];
  automationRules: AutomationRule[];
  aiCoachHistory: AiCoachMessage[];
  welcomeVideoConfig: WelcomeVideoConfig;
  
  // Actions
  hydrateStore: () => Promise<void>;
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
  
  // Auth actions
  loginUser: (name: string, email: string, role: string) => Promise<void>;
  loginUserWithFullProfile: (profile: Partial<StudentProfile>) => Promise<void>;
  logoutUser: () => Promise<void>;
  
  // Academy progress actions
  addXp: (amount: number) => Promise<void>;
  toggleHabit: (habitId: string) => Promise<void>;
  unlockCourse: (courseId: string) => void;
  completeLesson: (lessonId: string) => Promise<void>;
  passQuiz: (quizId: string) => Promise<void>;
  resetProgress: () => void;
  submitAssignment: (assignment: Omit<AssignmentSubmission, "id" | "status" | "timestamp">) => void;
  updateAssignmentStatus: (id: string, status: AssignmentSubmission["status"], feedback?: string) => void;
  completeOnboarding: (data: NonNullable<StudentProfile["onboardingData"]>, goalCard: NonNullable<StudentProfile["analyzedGoalCard"]>) => Promise<void>;
  saveOnboardingStepDetails: (profileUpdates: Partial<StudentProfile>) => Promise<void>;
  toggleDailyGoalChecked: () => Promise<void>;
  
  // CRM actions
  addLead: (lead: Omit<CrmLead, "id" | "status" | "date">) => CrmLead;
  updateLeadStatus: (leadId: string, status: CrmLead["status"]) => void;
  deleteLead: (leadId: string) => void;
  
  // CMS actions
  updateCmsCopy: (copy: Partial<{ heroHeadline: string; heroSubheadline: string; ctaText: string; testimonials: Array<{ id: string; name: string; role: string; rating: number; content: string }> }>) => void;
  savePost: (post: CmsPost) => void;
  deletePost: (slug: string) => void;
  saveResource: (resource: CmsResource) => void;
  deleteResource: (id: string) => void;
  saveWebinar: (webinar: WebinarEvent) => void;
  deleteWebinar: (id: string) => void;

  // Accountability & Telemetry Actions
  updateWelcomeVideoUrl: (url: string, levelScope: number) => void;
  sendSimulatedAlert: (studentEmail: string, triggerName: string, type: "Email" | "WhatsApp", content: string) => void;
  addCustomAutomationRule: (rule: Omit<AutomationRule, "id">) => void;
  toggleAutomationRule: (ruleId: string) => void;
  updateAutomationRuleTemplate: (ruleId: string, subject: string, body: string) => void;
  triggerAutomationRuleEvaluation: () => void;
  submitAiCoachMessage: (message: string) => void;
}

export const useEcosystemStore = create<EcosystemState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  theme: "dark",
  unlockedCourses: ["c1"],
  completedLessons: [],
  passedQuizzes: [],
  habitsChecked: {},
  assignments: [],
  leads: [],
  websiteCmsCopy: {
    heroHeadline: "Build a Digital Business That Creates Impact, Authority & Revenue—Without Depending on Referrals.",
    heroSubheadline: "For 20+ years, Swapnil Shiwalay has helped businesses, experts, and thought leaders build scalable digital assets that attract opportunities, generate leads, and create long-term growth.",
    ctaText: "Book a Growth Strategy Call",
    testimonials: [
      { id: "test_1", name: "Dr. Amit Roy", role: "Founder, Roy Clinics", rating: 5, content: "Swapnil completely re-engineered our client acquisition flow. We went from zero predictable leads to booking high-tier consulting calls automatically." },
      { id: "test_2", name: "Jessica Mercer", role: "Executive Advisor, Mercer Consulting", rating: 5, content: "Packaging my leadership retainers into a premium digital community portal doubled our retention metrics in under 90 days." },
    ],
  },
  posts: [],
  resources: [],
  webinars: [],

  // Accountability Tracking & AI Coach states
  students: [
    {
      name: "Rahul Sen",
      email: "rahul@business.com",
      role: "Student",
      mobile: "+91 98765 43210",
      city: "Bangalore",
      country: "India",
      profession: "Consultant",
      ageGroup: "25-34",
      goals: ["Business Growth", "Productivity"],
      joiningDate: "2026-06-01",
      source: "Google Search",
      coursePurchased: "ELITE 90™ Growth Operating System",
      unlockedLevel: 1,
      xp: 120,
      streakDays: 3,
      rank: "Seeker",
      points: 120,
      onboarded: true,
      lastLogin: "2026-06-21T02:00:00Z",
      lastActivity: "Watched lesson: Ecosystem Intro",
      accountStatus: "Active",
      successScore: 45,
      consistencyScore: 68,
      riskCategory: "Active",
      onboardingData: {
        mobile: "+91 98765 43210",
        experience: "Consultant",
        revenue: "under_1l",
        challenge: "inconsistent_leads",
        goal: "scale_operations"
      },
      analyzedGoalCard: {
        title: "Client Acquisition Pipeline",
        description: "Set up authority funnels and organic outreach pipelines to stabilize incoming advisory leads.",
        focusMetrics: "Weekly Funnel Diagnostics & Outreach Check-in",
        dailyChecked: false
      }
    },
    {
      name: "Karan Malhotra",
      email: "karan@tech.co",
      role: "Student",
      mobile: "+91 99988 77766",
      city: "Mumbai",
      country: "India",
      profession: "Agency Owner",
      ageGroup: "25-34",
      goals: ["Business Growth", "Productivity"],
      joiningDate: "2026-05-15",
      source: "Referral",
      coursePurchased: "ELITE 90™ Growth Operating System",
      unlockedLevel: 2,
      xp: 2600,
      streakDays: 14,
      rank: "Quantum",
      points: 2600,
      onboarded: true,
      lastLogin: "2026-06-21T01:30:00Z",
      lastActivity: "Submitted assignment: L2 Systems integration blueprint",
      accountStatus: "Active",
      successScore: 92,
      consistencyScore: 95,
      riskCategory: "High Performer"
    },
    {
      name: "Priya Sharma",
      email: "priya@creatives.com",
      role: "Student",
      mobile: "+91 88877 66655",
      city: "Delhi",
      country: "India",
      profession: "Creator/Freelancer",
      ageGroup: "18-24",
      goals: ["Productivity", "Complete Transformation"],
      joiningDate: "2026-06-10",
      source: "Instagram",
      coursePurchased: "ELITE 90™ Growth Operating System",
      unlockedLevel: 1,
      xp: 650,
      streakDays: 6,
      rank: "Builder",
      points: 650,
      onboarded: true,
      lastLogin: "2026-06-20T18:45:00Z",
      lastActivity: "Watched lesson: Authority Blueprints",
      accountStatus: "Active",
      successScore: 68,
      consistencyScore: 72,
      riskCategory: "Active"
    },
    {
      name: "Anil Mehta",
      email: "anil.mehta@finance.in",
      role: "Student",
      mobile: "+91 77766 55544",
      city: "Pune",
      country: "India",
      profession: "Financial Advisor",
      ageGroup: "45-54",
      goals: ["Spiritual Growth", "Productivity"],
      joiningDate: "2026-05-01",
      source: "Google Search",
      coursePurchased: "ELITE 90™ Growth Operating System",
      unlockedLevel: 1,
      xp: 320,
      streakDays: 0,
      rank: "Seeker",
      points: 320,
      onboarded: true,
      lastLogin: "2026-06-12T10:00:00Z",
      lastActivity: "None (Inactive)",
      accountStatus: "Active",
      successScore: 28,
      consistencyScore: 35,
      riskCategory: "Inactive"
    },
    {
      name: "Sneha Patel",
      email: "sneha.patel@educate.org",
      role: "Student",
      mobile: "+91 66655 44433",
      city: "Ahmedabad",
      country: "India",
      profession: "Coach/Educator",
      ageGroup: "35-44",
      goals: ["Productivity", "Business Growth"],
      joiningDate: "2026-06-05",
      source: "LinkedIn",
      coursePurchased: "ELITE 90™ Growth Operating System",
      unlockedLevel: 1,
      xp: 410,
      streakDays: 1,
      rank: "Seeker",
      points: 410,
      onboarded: true,
      lastLogin: "2026-06-17T09:15:00Z",
      lastActivity: "Watched lesson: Time Boxing hacks",
      accountStatus: "Active",
      successScore: 42,
      consistencyScore: 48,
      riskCategory: "At-Risk"
    },
    {
      name: "Vikram Singh",
      email: "vikram.singh@corporates.com",
      role: "Student",
      mobile: "+91 95555 44444",
      city: "Gurgaon",
      country: "India",
      profession: "Corporate Manager",
      ageGroup: "35-44",
      goals: ["Productivity", "Weight Loss"],
      joiningDate: "2026-06-12",
      source: "YouTube",
      coursePurchased: "ELITE 90™ Growth Operating System",
      unlockedLevel: 1,
      xp: 180,
      streakDays: 3,
      rank: "Seeker",
      points: 180,
      onboarded: true,
      lastLogin: "2026-06-21T01:10:00Z",
      lastActivity: "None (Slow progress rate)",
      accountStatus: "Active",
      successScore: 31,
      consistencyScore: 50,
      riskCategory: "Slow Learner"
    },
    {
      name: "Aditi Verma",
      email: "aditi.verma@lifestyle.net",
      role: "Student",
      mobile: "+91 94444 33333",
      city: "Kolkata",
      country: "India",
      profession: "Nutritionist/Wellness Coach",
      ageGroup: "25-34",
      goals: ["Weight Loss", "Complete Transformation"],
      joiningDate: "2026-05-20",
      source: "Instagram",
      coursePurchased: "ELITE 90™ Growth Operating System",
      unlockedLevel: 1,
      xp: 850,
      streakDays: 2,
      rank: "Builder",
      points: 850,
      onboarded: true,
      lastLogin: "2026-06-20T11:20:00Z",
      lastActivity: "Watched lesson: Habit Crucible Setup",
      accountStatus: "Active",
      successScore: 52,
      consistencyScore: 41,
      riskCategory: "Course Abandonment Risk"
    }
  ],
  sentCommunications: [],
  automationRules: [
    {
      id: "rule_1",
      triggerEvent: "Inactivity (3 Days)",
      condition: "No login for 3 consecutive days",
      actionChannel: "Email",
      templateSubject: "🔥 Get Back in the Crucible, {Student Name}!",
      templateBody: "Hey {Student Name},\n\nWe noticed you haven't checked into your Elite 90 transformation portal for 3 days. Your active streak of {Streak} days is at risk!\n\nConsistency is the key to transformation. Spend just 10 minutes today to complete your Daily Mission.\n\nSee you in the Arena,\nSwapnil Shiwalay & the ELITE COACH™ team",
      enabled: true
    },
    {
      id: "rule_2",
      triggerEvent: "Inactivity (7 Days)",
      condition: "No login for 7 consecutive days",
      actionChannel: "Both",
      templateSubject: "⚠️ High-Risk Alert: Your Transformation is Stalled",
      templateBody: "WARNING: Seeker {Student Name}, you have been inactive for 7 days. Your progress is currently sitting at {Progress}%. \n\nWe have scheduled a WhatsApp review. Reply immediately to this message or book a diagnostic strategy recovery call with Swapnil to get back on track.",
      enabled: true
    },
    {
      id: "rule_3",
      triggerEvent: "Consistency Drop (<60%)",
      condition: "Checked habits consistency score falls below 60%",
      actionChannel: "WhatsApp",
      templateSubject: "💪 Accountability Check: Habit Recovery Plan",
      templateBody: "Hey {Student Name}! Your habits consistency score dropped to {Consistency}%. Do not panic. We've compiled a 3-step Habit Recovery Plan for you. Reply with 'RECOVER' to launch it now. Let's make today count! - ELITE COACH™",
      enabled: true
    },
    {
      id: "rule_4",
      triggerEvent: "Level Completed",
      condition: "Completing all course nodes in a Level",
      actionChannel: "Both",
      templateSubject: "🎓 Congratulations! Your Level {Level} Certificate is Available",
      templateBody: "Incredible work, {Student Name}!\n\nYou have officially graduated from Level {Level}. Your dynamic PDF certificate has been generated and added to your Achievements Vault.\n\nLicense ID: {CertId}\nXP Earned: {XP} XP\n\nShare this win on LinkedIn using the one-click deep link in your profile tab!\n\nKeep Climbing,\nSwapnil Shiwalay",
      enabled: true
    }
  ],
  aiCoachHistory: [
    {
      id: "coach_welcome",
      role: "assistant",
      content: "Welcome, Seeker! I am ELITE COACH™, your AI Accountability Coach. I am here to analyze your telemetry, review your 90-day vision commitments, and nudge you daily toward complete transformation. How can I guide you today?",
      timestamp: new Date().toISOString()
    }
  ],
  welcomeVideoConfig: {
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    autoPlay: true,
    isConfigured: true,
    levelScope: 1
  },

  hydrateStore: async () => {
    if (typeof window === "undefined") return;

    // 1. Theme
    const savedTheme = localStorage.getItem("admin_theme") as "light" | "dark" || "dark";
    set({ theme: savedTheme });

    // 2. Fetch Session from Backend
    try {
      const res = await fetch("/api/auth/session");
      const data = await res.json();
      if (data.success && data.user) {
        let completedLessons = get().completedLessons;
        let passedQuizzes = get().passedQuizzes;
        let habitsChecked = get().habitsChecked;

        if (data.dbMode) {
          if (data.user.completions) {
            completedLessons = data.user.completions.map((c: any) => c.lessonId);
          }
          if (data.user.quizPasses) {
            passedQuizzes = data.user.quizPasses.map((q: any) => q.courseId);
          }
          if (data.user.habitLogs) {
            habitsChecked = data.user.habitLogs.reduce((acc: any, h: any) => {
              if (h.checked) acc[h.habitId] = true;
              return acc;
            }, {});
          }
        } else {
          // Fallback to local storage arrays if DB is not active but session cookie matched
          try {
            const cLessons = localStorage.getItem("gos_completed_lessons");
            if (cLessons) completedLessons = JSON.parse(cLessons);
            
            const pQuizzes = localStorage.getItem("gos_passed_quizzes");
            if (pQuizzes) passedQuizzes = JSON.parse(pQuizzes);
            
            const hChecked = localStorage.getItem("gos_habits_checked");
            if (hChecked) habitsChecked = JSON.parse(hChecked);
          } catch (e) {}
        }

        set({
          user: data.user,
          isAuthenticated: true,
          completedLessons,
          passedQuizzes,
          habitsChecked
        });
        return;
      }
    } catch (e) {
      console.warn("Auth session fetch failed, falling back to LocalStorage.");
    }

    // 3. Fallback LocalStorage Hydration (If session is not active)
    let user: StudentProfile | null = null;
    const profileSaved = localStorage.getItem("academy_logged_in_user") || localStorage.getItem("gos_visitor_profile");
    if (profileSaved) {
      try {
        const parsed = JSON.parse(profileSaved);
        user = {
          name: parsed.name || "Rahul Sen",
          email: parsed.email || "rahul@business.com",
          role: parsed.role || "Student",
          unlockedLevel: parsed.unlockedLevel || parsed.level || 1,
          xp: parsed.xp || 0,
          streakDays: parsed.streakDays || 0,
          rank: parsed.rank || "Novice",
          points: parsed.points || parsed.xp || 0,
          onboarded: parsed.onboarded || false,
          onboardingData: parsed.onboardingData || undefined,
          analyzedGoalCard: parsed.analyzedGoalCard || undefined,
          certificates: parsed.certificates || []
        };
      } catch (e) {}
    }

    // 3. Progress Toggles
    let unlockedCourses = ["c1"];
    let completedLessons: string[] = [];
    let passedQuizzes: string[] = [];
    let habitsChecked: Record<string, boolean> = {};

    try {
      const uCourses = localStorage.getItem("gos_unlocked_courses");
      if (uCourses) unlockedCourses = JSON.parse(uCourses);
      
      const cLessons = localStorage.getItem("gos_completed_lessons");
      if (cLessons) completedLessons = JSON.parse(cLessons);
      
      const pQuizzes = localStorage.getItem("gos_passed_quizzes");
      if (pQuizzes) passedQuizzes = JSON.parse(pQuizzes);
      
      const hChecked = localStorage.getItem("gos_habits_checked");
      if (hChecked) habitsChecked = JSON.parse(hChecked);
    } catch (e) {}

    // Auto-ascend user level if final level quizzes/lessons are completed in the local storage
    if (user) {
      let unlockedLevel = user.unlockedLevel || 1;
      
      const l1Complete = ["c1", "c2", "c3", "c4", "c5", "c6"].every(cId => {
        const c = DEFAULT_COURSES.find(x => x.id === cId);
        return c && c.lessons.every(l => completedLessons.includes(l.id)) && passedQuizzes.includes(cId);
      });
      if (l1Complete || passedQuizzes.includes("c6")) {
        unlockedLevel = Math.max(unlockedLevel, 2);
      }

      const l2Complete = ["c7", "c8"].every(cId => {
        const c = DEFAULT_COURSES.find(x => x.id === cId);
        return c && c.lessons.every(l => completedLessons.includes(l.id)) && passedQuizzes.includes(cId);
      });
      if (l2Complete || passedQuizzes.includes("c8")) {
        unlockedLevel = Math.max(unlockedLevel, 3);
      }

      if (unlockedLevel !== user.unlockedLevel) {
        user.unlockedLevel = unlockedLevel;
        localStorage.setItem("academy_logged_in_user", JSON.stringify(user));
        localStorage.setItem(`academy_profile_${user.email.toLowerCase()}`, JSON.stringify(user));
      }
    }

    // 4. CRM Leads
    let leads: CrmLead[] = [];
    try {
      const savedLeads = localStorage.getItem("crm_leads_data");
      if (savedLeads) leads = JSON.parse(savedLeads);
    } catch (e) {}

    // 5. CMS Copy
    let copy = get().websiteCmsCopy;
    try {
      const savedCopy = localStorage.getItem("cms_website_copy");
      if (savedCopy) copy = JSON.parse(savedCopy);
    } catch (e) {}

    // 6. Automation Workflows (mapped to automationRules)
    let workflows = get().automationRules;
    try {
      const savedWorkflows = localStorage.getItem("cms_workflows_data");
      if (savedWorkflows) workflows = JSON.parse(savedWorkflows);
    } catch (e) {}

    // 7. Webinars list
    let webinars = get().webinars;
    try {
      const savedWebinars = localStorage.getItem("cms_webinars_data");
      if (savedWebinars) webinars = JSON.parse(savedWebinars);
    } catch (e) {}

    // 8. Assignments list
    let assignments = get().assignments;
    try {
      const savedAssignments = localStorage.getItem("gos_assignments_data");
      if (savedAssignments) assignments = JSON.parse(savedAssignments);
    } catch (e) {}

    // 9. Community Posts list
    let posts = get().posts;
    try {
      const savedPosts = localStorage.getItem("gos_posts_data");
      if (savedPosts) posts = JSON.parse(savedPosts);
    } catch (e) {}

    // 10. Resource Vault list
    let resources = get().resources;
    try {
      const savedResources = localStorage.getItem("cms_resources_data");
      if (savedResources) resources = JSON.parse(savedResources);
    } catch (e) {}

    set({
      theme: savedTheme,
      user,
      isAuthenticated: !!user,
      unlockedCourses,
      completedLessons,
      passedQuizzes,
      habitsChecked,
      leads,
      websiteCmsCopy: copy,
      automationRules: workflows,
      webinars,
      assignments,
      posts,
      resources
    });
  },

  toggleTheme: () => {
    const newTheme = get().theme === "dark" ? "light" : "dark";
    get().setTheme(newTheme);
  },

  setTheme: (theme) => {
    localStorage.setItem("admin_theme", theme);
    localStorage.setItem("lms_theme", theme);
    
    // Dispatch event
    if (typeof window !== "undefined") {
      const event = new CustomEvent("admin_theme_changed", { detail: theme });
      window.dispatchEvent(event);
    }
    
    set({ theme });
  },

  loginUser: async (name, email, role) => {
    let defaultProfile: StudentProfile | null = null;
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, role }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        defaultProfile = data.user;
      }
    } catch (e) {
      console.warn("DB login failed, falling back to LocalStorage.");
    }

    if (!defaultProfile) {
      let savedProfile: StudentProfile | null = null;
      try {
        const saved = localStorage.getItem(`academy_profile_${email.toLowerCase()}`);
        if (saved) {
          savedProfile = JSON.parse(saved);
        }
      } catch (e) {}

      defaultProfile = savedProfile || {
        name,
        email,
        role,
        unlockedLevel: 1,
        xp: 120,
        streakDays: 3,
        rank: "Seeker",
        points: 120,
        onboarded: false
      };
    }
    
    localStorage.setItem("academy_logged_in_user", JSON.stringify(defaultProfile));
    localStorage.setItem("gos_visitor_profile", JSON.stringify(defaultProfile));
    localStorage.setItem(`academy_profile_${email.toLowerCase()}`, JSON.stringify(defaultProfile));
    
    // Sync with CRM Leads
    const currentLeads = get().leads;
    if (!currentLeads.some(l => l.email.toLowerCase() === email.toLowerCase())) {
      get().addLead({
        name,
        email,
        mobile: defaultProfile.onboardingData?.mobile || "+91 99999 99999",
        businessType: defaultProfile.onboardingData?.experience || "coach_consultant",
        monthlyRevenue: defaultProfile.onboardingData?.revenue || "under_100k",
        challenge: defaultProfile.onboardingData?.challenge || "inconsistent_leads",
        notes: "Registered via Academy Portal.",
        source: "Academy Registration"
      });
    }

    set({
      user: defaultProfile,
      isAuthenticated: true
    });
  },

  logoutUser: async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      console.warn("API logout request failed.");
    }
    localStorage.removeItem("academy_logged_in_user");
    set({ user: null, isAuthenticated: false });
  },

  completeOnboarding: async (data, goalCard) => {
    const { user } = get();
    if (!user) return;

    const updatedUser: StudentProfile = {
      ...user,
      name: data.name || user.name,
      onboarded: true,
      onboardingData: data,
      analyzedGoalCard: goalCard
    };

    localStorage.setItem("academy_logged_in_user", JSON.stringify(updatedUser));
    localStorage.setItem(`academy_profile_${user.email.toLowerCase()}`, JSON.stringify(updatedUser));
    set({ user: updatedUser });

    try {
      await fetch("/api/student/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          onboardingData: data,
          analyzedGoalCard: goalCard,
          onboarded: true
        })
      });
    } catch (e) {
      console.warn("DB profile sync failed for onboarding completion:", e);
    }
  },

  toggleDailyGoalChecked: async () => {
    const { user } = get();
    if (!user || !user.analyzedGoalCard) return;

    const isCurrentlyChecked = !!user.analyzedGoalCard.dailyChecked;
    const nextCheckedState = !isCurrentlyChecked;

    // Award +10 XP if checked, or subtract 10 if unchecked
    const xpChange = nextCheckedState ? 10 : -10;
    
    // Recalculate rank
    const newXp = Math.max(0, user.xp + xpChange);
    let rank = user.rank;
    let unlockedLevel = user.unlockedLevel;

    if (newXp >= 2500) {
      rank = "Quantum";
      unlockedLevel = Math.max(unlockedLevel, 3);
    } else if (newXp >= 1000) {
      rank = "Ascension";
      unlockedLevel = Math.max(unlockedLevel, 2);
    } else if (newXp >= 500) {
      rank = "Builder";
    } else {
      rank = "Seeker";
    }

    const updatedUser: StudentProfile = {
      ...user,
      xp: newXp,
      points: newXp,
      rank,
      unlockedLevel,
      analyzedGoalCard: {
        ...user.analyzedGoalCard,
        dailyChecked: nextCheckedState
      }
    };

    localStorage.setItem("academy_logged_in_user", JSON.stringify(updatedUser));
    localStorage.setItem(`academy_profile_${user.email.toLowerCase()}`, JSON.stringify(updatedUser));
    set({ user: updatedUser });

    try {
      await fetch("/api/student/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          xp: newXp,
          points: newXp,
          unlockedLevel,
          analyzedGoalCard: updatedUser.analyzedGoalCard
        })
      });
    } catch (e) {
      console.warn("DB profile sync failed for daily goal check:", e);
    }
  },

  addXp: async (amount) => {
    const { user } = get();
    if (!user) return;

    const newXP = user.xp + amount;
    let rank = user.rank;
    let unlockedLevel = user.unlockedLevel;

    if (newXP >= 2500) {
      rank = "Quantum";
      unlockedLevel = Math.max(unlockedLevel, 3);
    } else if (newXP >= 1000) {
      rank = "Ascension";
      unlockedLevel = Math.max(unlockedLevel, 2);
    } else if (newXP >= 500) {
      rank = "Builder";
    } else {
      rank = "Seeker";
    }

    const updatedUser = {
      ...user,
      xp: newXP,
      points: newXP,
      rank,
      unlockedLevel
    };

    localStorage.setItem("academy_logged_in_user", JSON.stringify(updatedUser));
    localStorage.setItem("gos_visitor_profile", JSON.stringify(updatedUser));
    localStorage.setItem(`academy_profile_${user.email.toLowerCase()}`, JSON.stringify(updatedUser));

    set({ user: updatedUser });

    try {
      await fetch("/api/student/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          xp: newXP,
          points: newXP,
          unlockedLevel
        })
      });
    } catch (e) {
      console.warn("DB profile sync failed for addXp:", e);
    }
  },

  toggleHabit: async (habitId) => {
    const { habitsChecked, user } = get();
    if (!user) return;

    const updatedChecked = { ...habitsChecked, [habitId]: !habitsChecked[habitId] };
    localStorage.setItem("gos_habits_checked", JSON.stringify(updatedChecked));

    // Award / deduct XP
    const xpChange = updatedChecked[habitId] ? 15 : -15;
    await get().addXp(xpChange);

    set({ habitsChecked: updatedChecked });

    try {
      const dateStr = new Date().toISOString().split("T")[0];
      await fetch("/api/student/habits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: dateStr,
          habitId,
          checked: updatedChecked[habitId]
        })
      });
    } catch (e) {
      console.warn("DB sync failed for habit toggle:", e);
    }
  },

  unlockCourse: (courseId) => {
    const { unlockedCourses } = get();
    if (unlockedCourses.includes(courseId)) return;

    const updated = [...unlockedCourses, courseId];
    localStorage.setItem("gos_unlocked_courses", JSON.stringify(updated));
    set({ unlockedCourses: updated });
  },

  completeLesson: async (lessonId) => {
    const { completedLessons, passedQuizzes, user } = get();
    if (completedLessons.includes(lessonId)) return;

    const updatedLessons = [...completedLessons, lessonId];
    localStorage.setItem("gos_completed_lessons", JSON.stringify(updatedLessons));
    await get().addXp(20); // Award 20 XP for completing a Quest

    // Check level progression & issue certificate
    let unlockedLevel = user?.unlockedLevel || 1;
    let certificates = user?.certificates || [];
    let certToSync: { certId: string; courseName: string } | null = null;

    const l1Complete = ["c1", "c2", "c3", "c4", "c5", "c6"].every(cId => {
      const c = DEFAULT_COURSES.find(x => x.id === cId);
      return c && c.lessons.every(l => updatedLessons.includes(l.id)) && passedQuizzes.includes(cId);
    });
    if (l1Complete) {
      unlockedLevel = Math.max(unlockedLevel, 2);
      const l1CertId = `cert_l1_${user?.email.toLowerCase().replace(/[^a-z0-9]/g, "") || "guest"}`;
      if (!certificates.some(c => c.level === 1)) {
        certificates = [...certificates, {
          id: l1CertId,
          level: 1,
          issueDate: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
        }];
        certToSync = { certId: l1CertId, courseName: "Level 1: Foundation Mastered" };
      }
    }

    const l2Complete = ["c7", "c8"].every(cId => {
      const c = DEFAULT_COURSES.find(x => x.id === cId);
      return c && c.lessons.every(l => updatedLessons.includes(l.id)) && passedQuizzes.includes(cId);
    });
    if (l2Complete) {
      unlockedLevel = Math.max(unlockedLevel, 3);
      const l2CertId = `cert_l2_${user?.email.toLowerCase().replace(/[^a-z0-9]/g, "") || "guest"}`;
      if (!certificates.some(c => c.level === 2)) {
        certificates = [...certificates, {
          id: l2CertId,
          level: 2,
          issueDate: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
        }];
        certToSync = { certId: l2CertId, courseName: "Level 2: Systems Accelerated" };
      }
    }

    if (user) {
      const updatedUser = {
        ...user,
        unlockedLevel,
        certificates
      };
      localStorage.setItem("academy_logged_in_user", JSON.stringify(updatedUser));
      localStorage.setItem(`academy_profile_${user.email.toLowerCase()}`, JSON.stringify(updatedUser));
      set({ user: updatedUser });
    }

    set({ completedLessons: updatedLessons });

    try {
      await fetch("/api/student/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "lesson",
          id: lessonId
        })
      });
    } catch (e) {
      console.warn("DB progress sync failed for lesson completion:", e);
    }

    if (certToSync) {
      try {
        await fetch("/api/student/certificate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(certToSync)
        });
      } catch (e) {
        console.warn("DB certificate sync failed:", e);
      }
    }
  },

  passQuiz: async (quizId) => {
    const { passedQuizzes, completedLessons, user } = get();
    if (passedQuizzes.includes(quizId)) return;

    const updatedQuizzes = [...passedQuizzes, quizId];
    localStorage.setItem("gos_passed_quizzes", JSON.stringify(updatedQuizzes));
    await get().addXp(50); // Award 50 XP for passing a Quiz gate

    // Check level progression & issue certificate
    let unlockedLevel = user?.unlockedLevel || 1;
    let certificates = user?.certificates || [];
    let certToSync: { certId: string; courseName: string } | null = null;

    const l1Complete = ["c1", "c2", "c3", "c4", "c5", "c6"].every(cId => {
      const c = DEFAULT_COURSES.find(x => x.id === cId);
      return c && c.lessons.every(l => completedLessons.includes(l.id)) && updatedQuizzes.includes(cId);
    });
    if (l1Complete) {
      unlockedLevel = Math.max(unlockedLevel, 2);
      const l1CertId = `cert_l1_${user?.email.toLowerCase().replace(/[^a-z0-9]/g, "") || "guest"}`;
      if (!certificates.some(c => c.level === 1)) {
        certificates = [...certificates, {
          id: l1CertId,
          level: 1,
          issueDate: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
        }];
        certToSync = { certId: l1CertId, courseName: "Level 1: Foundation Mastered" };
      }
    }

    const l2Complete = ["c7", "c8"].every(cId => {
      const c = DEFAULT_COURSES.find(x => x.id === cId);
      return c && c.lessons.every(l => completedLessons.includes(l.id)) && updatedQuizzes.includes(cId);
    });
    if (l2Complete) {
      unlockedLevel = Math.max(unlockedLevel, 3);
      const l2CertId = `cert_l2_${user?.email.toLowerCase().replace(/[^a-z0-9]/g, "") || "guest"}`;
      if (!certificates.some(c => c.level === 2)) {
        certificates = [...certificates, {
          id: l2CertId,
          level: 2,
          issueDate: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
        }];
        certToSync = { certId: l2CertId, courseName: "Level 2: Systems Accelerated" };
      }
    }

    if (user) {
      const updatedUser = {
        ...user,
        unlockedLevel,
        certificates
      };
      localStorage.setItem("academy_logged_in_user", JSON.stringify(updatedUser));
      localStorage.setItem(`academy_profile_${user.email.toLowerCase()}`, JSON.stringify(updatedUser));
      set({ user: updatedUser });
    }

    set({ passedQuizzes: updatedQuizzes });

    try {
      await fetch("/api/student/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "quiz",
          id: quizId,
          score: 100
        })
      });
    } catch (e) {
      console.warn("DB progress sync failed for quiz pass:", e);
    }

    if (certToSync) {
      try {
        await fetch("/api/student/certificate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(certToSync)
        });
      } catch (e) {
        console.warn("DB certificate sync failed:", e);
      }
    }
  },


  resetProgress: () => {
    const defaultProfile: StudentProfile = {
      name: get().user?.name || "Rahul Sen",
      email: get().user?.email || "rahul@business.com",
      role: get().user?.role || "Student",
      unlockedLevel: 1,
      xp: 120,
      streakDays: 3,
      rank: "Seeker",
      points: 120
    };

    localStorage.setItem("academy_logged_in_user", JSON.stringify(defaultProfile));
    localStorage.setItem("gos_unlocked_courses", JSON.stringify(["c1"]));
    localStorage.setItem("gos_completed_lessons", JSON.stringify([]));
    localStorage.setItem("gos_passed_quizzes", JSON.stringify([]));
    localStorage.setItem("gos_habits_checked", JSON.stringify({}));

    set({
      user: defaultProfile,
      unlockedCourses: ["c1"],
      completedLessons: [],
      passedQuizzes: [],
      habitsChecked: {}
    });
  },

  submitAssignment: (assignment) => {
    const newAsg: AssignmentSubmission = {
      ...assignment,
      id: "asg_" + Date.now(),
      status: "pending",
      timestamp: "Just now"
    };

    const updated = [newAsg, ...get().assignments];
    localStorage.setItem("academy_assignments_data", JSON.stringify(updated));
    set({ assignments: updated });

    // Optionally award 10 XP for submitting
    get().addXp && get().addXp(10);
  },

  updateAssignmentStatus: (id, status, feedback) => {
    const current = get().assignments;
    const updated = current.map((a) => {
      if (a.id === id) {
        const next = { ...a, status, feedback };
        // If approved, award XP if it is the currently logged in student
        if (status === "approved" && a.studentEmail.toLowerCase() === get().user?.email.toLowerCase()) {
          setTimeout(() => {
            get().addXp(100); // 100 XP for approved assignment!
          }, 0);
        }
        return next;
      }
      return a;
    });

    localStorage.setItem("academy_assignments_data", JSON.stringify(updated));
    set({ assignments: updated });
  },

  addLead: (lead) => {
    const newLead: CrmLead = {
      ...lead,
      id: "lead_" + Date.now(),
      status: "New",
      date: new Date().toISOString().split("T")[0]
    };

    const updatedLeads = [newLead, ...get().leads];
    localStorage.setItem("crm_leads_data", JSON.stringify(updatedLeads));
    set({ leads: updatedLeads });

    return newLead;
  },

  updateLeadStatus: (leadId, status) => {
    const updated = get().leads.map(l => l.id === leadId ? { ...l, status } : l);
    localStorage.setItem("crm_leads_data", JSON.stringify(updated));
    set({ leads: updated });
  },

  deleteLead: (leadId) => {
    const updated = get().leads.filter(l => l.id !== leadId);
    localStorage.setItem("crm_leads_data", JSON.stringify(updated));
    set({ leads: updated });
  },

  updateCmsCopy: (copy) => {
    const updated = { ...get().websiteCmsCopy, ...copy };
    localStorage.setItem("website_cms_copy", JSON.stringify(updated));
    set({ websiteCmsCopy: updated });
  },

  savePost: (post) => {
    const current = get().posts;
    const exists = current.some(p => p.slug === post.slug);
    let updated;

    if (exists) {
      updated = current.map(p => p.slug === post.slug ? post : p);
    } else {
      updated = [post, ...current];
    }

    localStorage.setItem("cms_posts_data", JSON.stringify(updated));
    set({ posts: updated });
  },

  deletePost: (slug) => {
    const updated = get().posts.filter(p => p.slug !== slug);
    localStorage.setItem("cms_posts_data", JSON.stringify(updated));
    set({ posts: updated });
  },

  saveResource: (resource) => {
    const current = get().resources;
    const exists = current.some(r => r.id === resource.id);
    let updated;

    if (exists) {
      updated = current.map(r => r.id === resource.id ? resource : r);
    } else {
      updated = [resource, ...current];
    }

    localStorage.setItem("cms_resources_data", JSON.stringify(updated));
    set({ resources: updated });
  },

  deleteResource: (id) => {
    const updated = get().resources.filter(r => r.id !== id);
    localStorage.setItem("cms_resources_data", JSON.stringify(updated));
    set({ resources: updated });
  },

  saveWebinar: (webinar) => {
    const current = get().webinars;
    const exists = current.some(w => w.id === webinar.id);
    let updated;

    if (exists) {
      updated = current.map(w => w.id === webinar.id ? webinar : w);
    } else {
      updated = [webinar, ...current];
    }

    localStorage.setItem("cms_webinars_data", JSON.stringify(updated));
    set({ webinars: updated });
  },

  deleteWebinar: (id) => {
    const updated = get().webinars.filter(w => w.id !== id);
    localStorage.setItem("cms_webinars_data", JSON.stringify(updated));
    set({ webinars: updated });
  },

  loginUserWithFullProfile: async (profile) => {
    const email = profile.email || "rahul@business.com";
    const name = profile.name || "Rahul Sen";
    const role = profile.role || "Student";
    
    let defaultProfile: StudentProfile | null = null;
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role, onboardingData: profile.onboardingData }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        defaultProfile = data.user;
      }
    } catch (e) {
      console.warn("DB register failed, falling back to LocalStorage.");
    }

    if (!defaultProfile) {
      let savedProfile: StudentProfile | null = null;
      try {
        const saved = localStorage.getItem(`academy_profile_${email.toLowerCase()}`);
        if (saved) {
          savedProfile = JSON.parse(saved);
        }
      } catch (e) {}

      defaultProfile = {
        name: name,
        email: email,
        role: role,
        mobile: profile.mobile || savedProfile?.mobile || "+91 98765 43210",
        city: profile.city || savedProfile?.city || "Bangalore",
        country: profile.country || savedProfile?.country || "India",
        profession: profile.profession || savedProfile?.profession || "Consultant",
        ageGroup: profile.ageGroup || savedProfile?.ageGroup || "25-34",
        goals: profile.goals || savedProfile?.goals || ["Business Growth", "Productivity"],
        joiningDate: profile.joiningDate || savedProfile?.joiningDate || new Date().toISOString().split("T")[0],
        source: profile.source || savedProfile?.source || "Google Search",
        coursePurchased: profile.coursePurchased || savedProfile?.coursePurchased || "ELITE 90™ Growth Operating System",
        unlockedLevel: savedProfile?.unlockedLevel || profile.unlockedLevel || 1,
        xp: savedProfile?.xp || 120,
        streakDays: savedProfile?.streakDays || 3,
        rank: savedProfile?.rank || "Seeker",
        points: savedProfile?.points || 120,
        onboarded: savedProfile?.onboarded || false,
        lastLogin: new Date().toISOString(),
        lastActivity: "Logged in via custom gateway",
        accountStatus: "Active",
        successScore: savedProfile?.successScore || 45,
        consistencyScore: savedProfile?.consistencyScore || 68,
        riskCategory: savedProfile?.riskCategory || "Active",
        profilePhoto: savedProfile?.profilePhoto || undefined,
        vision90Day: savedProfile?.vision90Day || undefined,
        agreedToAccountability: savedProfile?.agreedToAccountability || false,
        selfAssessment: savedProfile?.selfAssessment || undefined,
        onboardingData: savedProfile?.onboardingData || undefined,
        analyzedGoalCard: savedProfile?.analyzedGoalCard || undefined,
        certificates: savedProfile?.certificates || []
      };
    }

    // Calculate telemetry
    const telemetry = calculateTelemetry(
      defaultProfile,
      get().completedLessons,
      get().passedQuizzes,
      get().habitsChecked,
      get().assignments
    );
    defaultProfile.successScore = telemetry.successScore;
    defaultProfile.consistencyScore = telemetry.consistencyScore;
    defaultProfile.riskCategory = telemetry.riskCategory;

    localStorage.setItem("academy_logged_in_user", JSON.stringify(defaultProfile));
    localStorage.setItem("gos_visitor_profile", JSON.stringify(defaultProfile));
    localStorage.setItem(`academy_profile_${email.toLowerCase()}`, JSON.stringify(defaultProfile));

    const currentStudents = get().students;
    const studentExists = currentStudents.some(s => s.email.toLowerCase() === email.toLowerCase());
    let updatedStudents = [];
    if (studentExists) {
      updatedStudents = currentStudents.map(s => s.email.toLowerCase() === email.toLowerCase() ? defaultProfile! : s);
    } else {
      updatedStudents = [...currentStudents, defaultProfile];
    }
    set({
      user: defaultProfile,
      isAuthenticated: true,
      students: updatedStudents
    });
  },

  saveOnboardingStepDetails: async (profileUpdates) => {
    const { user, students } = get();
    if (!user) return;

    const updatedUser: StudentProfile = {
      ...user,
      ...profileUpdates,
      selfAssessment: profileUpdates.selfAssessment 
        ? { ...user.selfAssessment, ...profileUpdates.selfAssessment } 
        : user.selfAssessment
    };

    if (updatedUser.agreedToAccountability) {
      updatedUser.onboarded = true;
      updatedUser.lastLogin = new Date().toISOString();
      updatedUser.lastActivity = "Completed Seeker Onboarding Flow";
      
      const firstGoal = (updatedUser.goals && updatedUser.goals[0]) || "Complete Transformation";
      updatedUser.analyzedGoalCard = {
        title: `${firstGoal} Blueprint`,
        description: `Execute specialized daily protocols designed to maximize your transformation success in ${firstGoal}.`,
        focusMetrics: "Daily Consistency Check & Study Progress",
        dailyChecked: false
      };
      
      updatedUser.onboardingData = {
        mobile: updatedUser.mobile || "+91 99999 99999",
        experience: updatedUser.profession || "General Seeker",
        revenue: "N/A",
        challenge: "Inconsistent Routine & Focus",
        goal: firstGoal
      };
    }

    const telemetry = calculateTelemetry(
      updatedUser,
      get().completedLessons,
      get().passedQuizzes,
      get().habitsChecked,
      get().assignments
    );
    updatedUser.successScore = telemetry.successScore;
    updatedUser.consistencyScore = telemetry.consistencyScore;
    updatedUser.riskCategory = telemetry.riskCategory;

    localStorage.setItem("academy_logged_in_user", JSON.stringify(updatedUser));
    localStorage.setItem(`academy_profile_${user.email.toLowerCase()}`, JSON.stringify(updatedUser));

    const updatedStudents = students.map(s => s.email.toLowerCase() === user.email.toLowerCase() ? updatedUser : s);

    set({ user: updatedUser, students: updatedStudents });

    try {
      await fetch("/api/student/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          onboardingData: updatedUser.onboardingData,
          analyzedGoalCard: updatedUser.analyzedGoalCard,
          onboarded: updatedUser.onboarded,
          xp: updatedUser.xp,
          points: updatedUser.points,
          unlockedLevel: updatedUser.unlockedLevel
        })
      });
    } catch (e) {
      console.warn("DB profile sync failed for onboarding step details:", e);
    }
  },

  updateWelcomeVideoUrl: (url, levelScope) => {
    const updated = {
      ...get().welcomeVideoConfig,
      url,
      levelScope,
      isConfigured: true
    };
    set({ welcomeVideoConfig: updated });
  },

  sendSimulatedAlert: (studentEmail, triggerName, type, content) => {
    const newComm: SentCommunication = {
      id: "comm_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
      studentEmail,
      type,
      triggerName,
      content,
      timestamp: new Date().toLocaleString("en-IN")
    };
    set({
      sentCommunications: [newComm, ...get().sentCommunications]
    });
  },

  addCustomAutomationRule: (rule) => {
    const newRule: AutomationRule = {
      ...rule,
      id: "rule_" + Date.now()
    };
    set({
      automationRules: [...get().automationRules, newRule]
    });
  },

  toggleAutomationRule: (ruleId) => {
    const updated = get().automationRules.map(r => r.id === ruleId ? { ...r, enabled: !r.enabled } : r);
    set({ automationRules: updated });
  },

  updateAutomationRuleTemplate: (ruleId, subject, body) => {
    const updated = get().automationRules.map(r => r.id === ruleId ? { ...r, templateSubject: subject, templateBody: body } : r);
    set({ automationRules: updated });
  },

  triggerAutomationRuleEvaluation: () => {
    const { students, automationRules } = get();
    
    students.forEach(student => {
      if (student.riskCategory === "At-Risk" || student.riskCategory === "Inactive") {
        const rule = automationRules.find(r => r.id === "rule_1");
        if (rule && rule.enabled) {
          const body = rule.templateBody
            .replace(/{Student Name}/g, student.name)
            .replace(/{Streak}/g, String(student.streakDays || 0));
          get().sendSimulatedAlert(student.email, rule.triggerEvent, "Email", body);
        }
      }

      if (student.riskCategory === "Inactive") {
        const rule = automationRules.find(r => r.id === "rule_2");
        if (rule && rule.enabled) {
          const body = rule.templateBody
            .replace(/{Student Name}/g, student.name)
            .replace(/{Progress}/g, student.unlockedLevel === 3 ? "100" : student.unlockedLevel === 2 ? "65" : "30");
          if (rule.actionChannel === "Email" || rule.actionChannel === "Both") {
            get().sendSimulatedAlert(student.email, rule.triggerEvent, "Email", body);
          }
          if (rule.actionChannel === "WhatsApp" || rule.actionChannel === "Both") {
            get().sendSimulatedAlert(student.email, rule.triggerEvent, "WhatsApp", body);
          }
        }
      }

      if ((student.consistencyScore || 0) < 60) {
        const rule = automationRules.find(r => r.id === "rule_3");
        if (rule && rule.enabled) {
          const body = rule.templateBody
            .replace(/{Student Name}/g, student.name)
            .replace(/{Consistency}/g, String(student.consistencyScore || 0));
          get().sendSimulatedAlert(student.email, rule.triggerEvent, "WhatsApp", body);
        }
      }
    });

    if (typeof window !== "undefined") {
      const toast = document.createElement("div");
      toast.className = "fixed bottom-20 right-5 bg-indigo-600 text-white font-semibold px-4 py-3 rounded-xl shadow-lg z-50 text-xs";
      toast.innerHTML = "⚡ Automation Engine: Rules evaluated & alerts generated in ledger.";
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3500);
    }
  },

  submitAiCoachMessage: (message) => {
    const { aiCoachHistory, user } = get();
    const userMsg: AiCoachMessage = {
      id: "msg_" + Date.now() + "_u",
      role: "user",
      content: message,
      timestamp: new Date().toISOString()
    };

    let reply = "I hear you, Seeker. Keep focusing on consistency. Let's make today count!";
    if (user) {
      const telemetry = calculateTelemetry(
        user,
        get().completedLessons,
        get().passedQuizzes,
        get().habitsChecked,
        get().assignments
      );
      const score = telemetry.successScore;
      const consistency = telemetry.consistencyScore;
      const risk = telemetry.riskCategory;

      const lowerMessage = message.toLowerCase();
      if (lowerMessage.includes("progress") || lowerMessage.includes("score")) {
        reply = `Analyzing your telemetry now, ${user.name}. Your current Student Success Score is **${score}/100** and your habits consistency score is **${consistency}%**. You are classified as **${risk}**. To level up, complete all assignments and maintain a green day streak!`;
      } else if (lowerMessage.includes("streak") || lowerMessage.includes("habit") || lowerMessage.includes("routine")) {
        reply = `Habits form the bedrock of systems architecture. Your active streak is **${user.streakDays || 0} days**. ${
          consistency < 60 
            ? "Your consistency score is currently under 60%. I recommend prioritizing your daily focus checklists first to prevent streak decay." 
            : "Excellent consistency index! Keep checking off those daily quest nodes."
        }`;
      } else if (lowerMessage.includes("vision") || lowerMessage.includes("90-day") || lowerMessage.includes("goal")) {
        reply = `Your registered 90-day transformation vision is: "${user.vision90Day || "Not set yet"}" under the goal category **${(user.goals && user.goals[0]) || "General transformation"}**. Keep this vision card top of mind during your daily study modules!`;
      } else if (lowerMessage.includes("recover") || lowerMessage.includes("help") || lowerMessage.includes("stuck")) {
        reply = `Let's formulate a recovery plan. (1) Complete at least 6 daily checklist items today. (2) Watch the next course module in Level ${user.unlockedLevel}. (3) Write your daily wins in the Accountability Pods channel. I am tracking your activity logs in real-time.`;
      } else {
        reply = `Hey ${user.name}! As your ELITE COACH™, I've audited your academy profile. You have completed ${get().completedLessons.length} lessons and earned ${user.xp} XP. What specific funnel blockage or routine bottleneck should we target today?`;
      }
    }

    const assistantMsg: AiCoachMessage = {
      id: "msg_" + Date.now() + "_a",
      role: "assistant",
      content: reply,
      timestamp: new Date().toISOString()
    };

    set({
      aiCoachHistory: [...aiCoachHistory, userMsg, assistantMsg]
    });
  }
}));
