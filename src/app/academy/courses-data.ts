export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  shareLink?: string;
}

export type Quest = Lesson;

export interface Course {
  id: string;
  level: number;
  title: string;
  duration: string;
  description: string;
  lessons: Lesson[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
  };
  category?: string;
  subCategory?: string;
  thumbnailUrl?: string;
}

export type Mission = Course;

export interface Habit {
  id: string;
  name: string;
  icon: string;
  points: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: string;
}

export const DEFAULT_HABITS: Habit[] = [
  { id: "h1", name: "Wake Early (Before 6 AM)", icon: "🌅", points: 10 },
  { id: "h2", name: "Workout / Movement (30 Min)", icon: "💪", points: 10 },
  { id: "h3", name: "Meditation / Breathwork (15 Min)", icon: "🧘", points: 10 },
  { id: "h4", name: "Reading / Self-Education (20 Min)", icon: "📚", points: 10 },
  { id: "h5", name: "Deep Work Sprint (90 Min)", icon: "⚡", points: 10 },
  { id: "h6", name: "Family Time / Presence", icon: "❤️", points: 10 },
  { id: "h7", name: "Gratitude Journaling", icon: "✍️", points: 10 },
  { id: "h8", name: "Hydration (3 Liters)", icon: "💧", points: 10 },
  { id: "h9", name: "Healthy Whole Foods Only", icon: "🍏", points: 10 }
];

export const DEFAULT_BADGES: Badge[] = [
  { id: "b1", title: "Transformation Initiate", description: "Completed the Elite 90 induction masterclass briefing.", icon: "🚀", requirement: "Complete Masterclass VSL" },
  { id: "b2", title: "Foundation Warrior", description: "Graduated from Level 1 Foundations and submitted all projects.", icon: "🛡️", requirement: "Complete Level 1 Foundations" },
  { id: "b3", title: "Elite Achiever", description: "Successfully crossed a total score of 5,000 XP points.", icon: "🏆", requirement: "Cross 5,000 XP" },
  { id: "b4", title: "Monk Badge", description: "Achieved a perfect 7-day habit checklist check-off streak.", icon: "🧘", requirement: "7-Day Perfect Streak" },
  { id: "b5", title: "Deep Work Master", description: "Logged 10 deep work habit sprints successfully.", icon: "⚡", requirement: "Log 10 Deep Work sprints" },
  { id: "b6", title: "Integrity Champion", description: "Completed 15 consecutive days with a consistency score >80%.", icon: "⚖️", requirement: "Consistency >80% for 15 Days" },
  { id: "b7", title: "High Vibration Badge", description: "Completed all meditation and spiritual focus tasks for 30 days.", icon: "🌀", requirement: "30 Meditation logs" },
  { id: "b8", title: "Iron Discipline Badge", description: "Completed 60 days of the 90-day transformation log.", icon: "⛓️", requirement: "Complete 60 Challenge Days" },
  { id: "b9", title: "Quantum Leader", description: "Approved for the Quantum Mastermind Tier group access.", icon: "👑", requirement: "Promote to Level 3 Quantum" }
];
export interface Cohort {
  id: string;
  tierId: number; // 1, 2, 3
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  capacity: number;
  enrolled: number;
  price: number;
  status: "active" | "upcoming" | "archived" | "closed";
  mentors: string[];
  dripWeeks: { [courseId: string]: number };
}

export interface StudentCohortProgress {
  studentEmail: string;
  cohortId: string;
  progressPercent: number; // 0 to 100
  attendancePercent: number; // 0 to 100
  completedLessons: string[];
  passedQuizzes: string[];
  streakDays: number;
  healthScore: number; // 0 to 100
  dropoutRisk: "low" | "medium" | "high";
  upgradeStatus: {
    l2Eligible: boolean;
    l2Requested: boolean;
    l3Eligible: boolean;
    l3Requested: boolean;
    mentorRecommendation: boolean;
  };
}

export const DEFAULT_COURSES: Course[] = [
  {
    id: "c1",
    level: 1,
    title: "Digital Business Mindset",
    duration: "Week 1",
    description: "Re-wire your thinking from direct services provider to business ecosystem architect.",
    lessons: [
      { id: "c1_l1", title: "Introduction to Ecosystem Architecting", duration: "10 mins", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", shareLink: "https://www.google.com" },
      { id: "c1_l2", title: "The Mindset Shift: Employee vs Owner", duration: "12 mins", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "c1_l3", title: "Designing Your 10x Scaling Plan", duration: "15 mins", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
    ],
    quiz: {
      question: "What is the primary role of a Digital Business Ecosystem Architect?",
      options: [
        "Trading hours for project consulting fees",
        "Structuring automated pipelines that scale authority assets",
        "Building simple static websites for clients",
        "Writing daily manual emails to leads"
      ],
      correctIndex: 1
    },
    category: "Mindset",
    subCategory: "Foundations",
    thumbnailUrl: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=640&auto=format&fit=crop"
  },
  {
    id: "c2",
    level: 1,
    title: "Business Model Design",
    duration: "Week 2",
    description: "Package your IP into premium digital models that generate high-value recurring revenue.",
    lessons: [
      { id: "c2_l1", title: "High-Ticket Packaging Secrets", duration: "14 mins", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "c2_l2", title: "Structuring Retainer Matrix Models", duration: "16 mins", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
    ],
    quiz: {
      question: "Which model yields the highest customer lifetime value (LTV) for consultants?",
      options: [
        "Hourly consulting sessions",
        "Ecosystem retainers combining course + community + systems",
        "One-off project deliverables",
        "Free ebook downloads"
      ],
      correctIndex: 1
    },
    category: "Business",
    subCategory: "Packaging",
    thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=640&auto=format&fit=crop"
  },
  {
    id: "c3",
    level: 1,
    title: "Personal Branding",
    duration: "Week 3",
    description: "Establish absolute authority and command high-ticket prices using structured IP.",
    lessons: [
      { id: "c3_l1", title: "Authority Asset Creation", duration: "12 mins", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "c3_l2", title: "Omnipresent Distribution Framework", duration: "15 mins", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
    ],
    quiz: {
      question: "What makes an 'Authority Asset' different from standard marketing content?",
      options: [
        "It uses a longer length document structure",
        "It packages unique, structured IP that solves a specific operational bottleneck",
        "It is always distributed on LinkedIn",
        "It features vibrant colors and graphics"
      ],
      correctIndex: 1
    },
    category: "Branding",
    subCategory: "Authority",
    thumbnailUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=640&auto=format&fit=crop"
  },
  {
    id: "c4",
    level: 1,
    title: "Lead Generation",
    duration: "Week 4",
    description: "Build an automated funnel routing warm, qualified inquiries straight into your pipeline.",
    lessons: [
      { id: "c4_l1", title: "Lead Magnet Architecture", duration: "11 mins", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "c4_l2", title: "Automated Funnel Optimization", duration: "13 mins", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
    ],
    quiz: {
      question: "What is the primary metric to optimize in a high-ticket lead funnel?",
      options: [
        "Raw landing page visit counts",
        "Qualified application booking rates",
        "Social media share count",
        "Email subscriber bounce rates"
      ],
      correctIndex: 1
    },
    category: "Marketing",
    subCategory: "Lead Gen",
    thumbnailUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=640&auto=format&fit=crop"
  },
  {
    id: "c5",
    level: 1,
    title: "Sales Systems",
    duration: "Week 5",
    description: "Design qualification scripts and automation flows that close client retainers.",
    lessons: [
      { id: "c5_l1", title: "High-Ticket Advisory Sales", duration: "15 mins", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "c5_l2", title: "Self-Qualifying Application Triage", duration: "12 mins", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
    ],
    quiz: {
      question: "Why should we implement an application triage form before a strategy call?",
      options: [
        "To make the customer fill out paperwork",
        "To filter out low-budget leads and ensure calls are only booked with qualified prospects",
        "To slow down the sales cycle",
        "To email them newsletters"
      ],
      correctIndex: 1
    },
    category: "Sales",
    subCategory: "Systems",
    thumbnailUrl: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=640&auto=format&fit=crop"
  },
  {
    id: "c6",
    level: 1,
    title: "Digital Ecosystem Blueprint",
    duration: "Week 6",
    description: "Stitch mindset, packaging, branding, lead gen, and sales into one automated ecosystem map.",
    lessons: [
      { id: "c6_l1", title: "Mapping the Growth Operating System", duration: "16 mins", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "c6_l2", title: "Preparing for Level 2 Architecture", duration: "14 mins", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
    ],
    quiz: {
      question: "Which GOS element links all marketing campaigns to active workflows?",
      options: [
        "Dynamic lead scoring and visitor intelligence observers",
        "Single sales page links",
        "A standard PDF downloader block",
        "Static FAQ sections"
      ],
      correctIndex: 0
    },
    category: "Ecosystem",
    subCategory: "GOS Map",
    thumbnailUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=640&auto=format&fit=crop"
  },
  // Level 2 Modules
  {
    id: "c7",
    level: 2,
    title: "CRM & Website Systems",
    duration: "Module 1",
    description: "Build robust backend contact flows and responsive authority sites.",
    lessons: [
      { id: "c7_l1", title: "Structuring Lead Pipelines", duration: "18 mins", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", shareLink: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
    ],
    quiz: {
      question: "What is the primary purpose of pipeline tagging?",
      options: [
        "Aesthetic styling",
        "To track lead stages and trigger contextual email follow-ups automatically",
        "Saving hosting server bandwidth",
        "Sending invoices"
      ],
      correctIndex: 1
    },
    category: "Systems",
    subCategory: "CRM & Sites",
    thumbnailUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=640&auto=format&fit=crop"
  },
  {
    id: "c8",
    level: 2,
    title: "Automation & API Integrations",
    duration: "Module 2",
    description: "Develop seamless Make.com and Zapier webhooks routing client data.",
    lessons: [
      { id: "c8_l1", title: "Building Webhook Receivers", duration: "20 mins", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
    ],
    quiz: {
      question: "Which tool works best as middle-tier routing middleware?",
      options: ["Wordpress", "Make.com or Zapier", "Stripe API", "Google Analytics"],
      correctIndex: 1
    },
    category: "Automation",
    subCategory: "API & Webhooks",
    thumbnailUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=640&auto=format&fit=crop"
  }
];

export const DEFAULT_COHORTS: Cohort[] = [
  {
    id: "cohort_l1_june",
    tierId: 1,
    name: "L1: Foundations - June Cohort",
    description: "Foundational cohort mapping digital business architectures, lead generation, and VSL creation.",
    startDate: "2026-06-01",
    endDate: "2026-07-15",
    capacity: 100,
    enrolled: 64,
    price: 4999,
    status: "active",
    mentors: ["Swapnil Shiwalay", "Dr. Amit Roy"],
    dripWeeks: { "c1": 1, "c2": 2, "c3": 3, "c4": 4, "c5": 5, "c6": 6 }
  },
  {
    id: "cohort_l2_june",
    tierId: 2,
    name: "L2: Systems Architect - June Cohort",
    description: "Advanced systems cohort mapping CRM pipelines, Make.com webhooks, APIs, and custom client delivery automations.",
    startDate: "2026-06-01",
    endDate: "2026-08-31",
    capacity: 50,
    enrolled: 32,
    price: 24999,
    status: "active",
    mentors: ["Swapnil Shiwalay"],
    dripWeeks: { "c7": 1, "c8": 2 }
  },
  {
    id: "cohort_l3_june",
    tierId: 3,
    name: "L3: Quantum Mastermind",
    description: "Elite application-only mastermind group for scaling retainers and operations weekly mastermind sessions.",
    startDate: "2026-06-15",
    endDate: "2026-12-15",
    capacity: 25,
    enrolled: 8,
    price: 124999,
    status: "active",
    mentors: ["Swapnil Shiwalay"],
    dripWeeks: {}
  }
];
