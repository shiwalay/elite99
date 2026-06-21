"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Play,
  CheckCircle2,
  Lock,
  ChevronRight,
  ChevronDown,
  Bot,
  Send,
  Check,
  Sparkles,
  Menu,
  X,
  FileText,
  HelpCircle,
  Upload,
  AlertCircle,
  Moon,
  Sun,
  ExternalLink,
  Heart,
  MessageSquare,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEcosystemStore } from "@/store/useEcosystemStore";
import { DEFAULT_COURSES, DEFAULT_COHORTS, Course, Lesson } from "../../../courses-data";
import Card from "@/components/Card";
import Confetti from "@/components/Confetti";

interface LessonComment {
  id: string;
  authorName: string;
  content: string;
  timestamp: string;
  likes: number;
  likedByCurrentUser?: boolean;
}

const isCourseUnlocked = (courseId: string, completedLessons: string[], passedQuizzes: string[]) => {
  const index = DEFAULT_COURSES.findIndex(c => c.id === courseId);
  if (index <= 0) return true; // First course c1 is always unlocked

  // Check if all prior courses are completed
  for (let i = 0; i < index; i++) {
    const prior = DEFAULT_COURSES[i];
    const priorLessonsCompleted = prior.lessons.every(l => completedLessons.includes(l.id));
    const priorQuizPassed = passedQuizzes.includes(prior.id);
    if (!priorLessonsCompleted || !priorQuizPassed) {
      return false;
    }
  }
  return true;
};

export default function LessonViewerPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params?.courseId as string;
  const lessonId = params?.lessonId as string;

  const {
    user,
    theme,
    toggleTheme,
    completedLessons,
    passedQuizzes,
    unlockedCourses,
    completeLesson,
    passQuiz,
    submitAssignment,
    assignments,
    loginUser,
    addXp
  } = useEcosystemStore();

  // Navigation / layout states
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [coursesList, setCoursesList] = useState<Course[]>(DEFAULT_COURSES);
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completedModuleName, setCompletedModuleName] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);

  // Lesson quiz states
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const [quizErrorMessage, setQuizErrorMessage] = useState("");

  // Comments states
  const [comments, setComments] = useState<LessonComment[]>([]);
  const [newCommentText, setNewCommentText] = useState("");

  // Assignment states
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentLink, setAssignmentLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Chat states
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([]);
  const [inputMessage, setInputMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Load courses List from localStorage or default
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCourses = localStorage.getItem("academy_courses_list");
      if (savedCourses) {
        try {
          setCoursesList(JSON.parse(savedCourses));
        } catch (e) {
          setCoursesList(DEFAULT_COURSES);
        }
      }
    }
  }, []);

  // Reset videoEnded when lessonId changes
  useEffect(() => {
    setVideoEnded(false);
  }, [lessonId]);

  // Validate authentication
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("academy_logged_in_user");
      if (!savedUser && !user) {
        router.push("/academy");
      }
    }
  }, [user, router]);

  // Sync parameters to update active course/lesson
  useEffect(() => {
    if (!courseId || !lessonId) return;

    const course = coursesList.find((c) => c.id === courseId);
    if (course) {
      setActiveCourse(course);
      const lesson = course.lessons.find((l) => l.id === lessonId);
      if (lesson) {
        setActiveLesson(lesson);
        // Reset quiz inputs
        setSelectedOption(null);
        setQuizChecked(false);
        setQuizPassed(false);
        setQuizErrorMessage("");
      }
    }
  }, [courseId, lessonId, coursesList]);

  // Initialize bot welcome
  useEffect(() => {
    if (user && activeLesson) {
      setChatMessages([
        {
          sender: "bot",
          text: `Welcome to node: "${activeLesson.title}". Let me know if you need any clarification or design suggestions for your blueprints.`
        }
      ]);
    }
  }, [user, activeLesson]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Helper: get mock comments
  const getMockCommentsForLesson = (id: string): LessonComment[] => {
    return [
      {
        id: `${id}_m1`,
        authorName: "Dr. Amit Roy",
        content: "This module completely shifts the framing of how we value our delivery. Excited to implement the structured feedback loops.",
        timestamp: "3 hours ago",
        likes: 4,
        likedByCurrentUser: false
      },
      {
        id: `${id}_m2`,
        authorName: "Jessica Mercer",
        content: "I've outlined our system boundaries based on this training node. Highly recommend taking notes on the scaling constraints.",
        timestamp: "1 day ago",
        likes: 2,
        likedByCurrentUser: false
      }
    ];
  };

  // Load comments when lessonId changes
  useEffect(() => {
    if (!lessonId) return;

    const key = `academy_comments_${lessonId}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        setComments(JSON.parse(saved));
      } catch (e) {
        const mocks = getMockCommentsForLesson(lessonId);
        setComments(mocks);
        localStorage.setItem(key, JSON.stringify(mocks));
      }
    } else {
      const mocks = getMockCommentsForLesson(lessonId);
      setComments(mocks);
      localStorage.setItem(key, JSON.stringify(mocks));
    }
  }, [lessonId]);

  // Helper to save comments
  const saveComments = (updated: LessonComment[]) => {
    setComments(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(`academy_comments_${lessonId}`, JSON.stringify(updated));
    }
  };

  // Handle comment like action
  const handleLikeComment = (id: string) => {
    const updated = comments.map((comment) => {
      if (comment.id === id) {
        const liked = !comment.likedByCurrentUser;
        return {
          ...comment,
          likedByCurrentUser: liked,
          likes: liked ? comment.likes + 1 : Math.max(0, comment.likes - 1)
        };
      }
      return comment;
    });
    saveComments(updated);
  };

  // Handle comment submission
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newCommentText.trim()) return;

    const newComment: LessonComment = {
      id: `comment_${Date.now()}`,
      authorName: user.name,
      content: newCommentText.trim(),
      timestamp: "Just now",
      likes: 0,
      likedByCurrentUser: false
    };

    const updated = [newComment, ...comments];
    saveComments(updated);
    setNewCommentText("");

    const toast = document.createElement("div");
    toast.className = "fixed bottom-20 right-5 bg-emerald-500 text-white font-semibold px-4 py-3 rounded-xl shadow-lg z-50 text-xs border border-emerald-400/20";
    toast.innerHTML = `✍️ Learning takeaway posted successfully!`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  if (!user || !activeCourse || !activeLesson) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-xs text-slate-400 font-mono">
        Establishing security node connection...
      </div>
    );
  }

  // Helper: Drip Lock Status Check
  const getCohortWeekInfo = (course: Course) => {
    const cohort = DEFAULT_COHORTS.find((c) => c.tierId === course.level) || DEFAULT_COHORTS[0];
    const dripWeek = cohort.dripWeeks[course.id];
    
    if (dripWeek === undefined) {
      return { isDripLocked: false, unlockDateStr: "" };
    }

    const startDate = new Date(cohort.startDate);
    const now = new Date();
    
    const startClean = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const nowClean = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const diffTime = nowClean.getTime() - startClean.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    const currentWeek = diffDays <= 0 ? 0 : Math.floor((diffDays - 1) / 7) + 1;
    
    const isDripLocked = false;
    
    const targetDays = (dripWeek - 1) * 7;
    const unlockDate = new Date(startClean.getTime() + targetDays * 24 * 60 * 60 * 1000);
    const unlockDateStr = unlockDate.toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' });
    
    return { isDripLocked, unlockDateStr };
  };

  // Helper: Prerequisite Check
  const getPriorCoursePrereqs = (course: Course) => {
    const index = coursesList.findIndex((c) => c.id === course.id);
    if (index <= 0) return null;

    const prior = coursesList[index - 1];
    const priorLessons = prior.lessons.map((l) => l.id);
    
    const allLessonsWatched = priorLessons.every((id) => completedLessons.includes(id));
    const quizPassed = passedQuizzes.includes(prior.id);

    return {
      priorCourseTitle: prior.title,
      isLocked: !allLessonsWatched || !quizPassed,
      reasons: {
        lessons: !allLessonsWatched,
        quiz: !quizPassed
      }
    };
  };

  const isCourseAccessible = (course: Course) => {
    let unlockedLevel = user.unlockedLevel;
    if (passedQuizzes.includes("c6")) {
      unlockedLevel = Math.max(unlockedLevel, 2);
    }
    if (passedQuizzes.includes("c8")) {
      unlockedLevel = Math.max(unlockedLevel, 3);
    }
    if (course.level > unlockedLevel) return false;
    
    const drip = getCohortWeekInfo(course);
    if (drip.isDripLocked) return false;
    
    const prereq = getPriorCoursePrereqs(course);
    if (prereq && prereq.isLocked) return false;
    
    return true;
  };

  const getNextLessonInfo = () => {
    if (!activeCourse || !activeLesson || coursesList.length === 0) {
      return { nextLesson: null, nextCourse: null, isNextAccessible: false };
    }

    const currentCourseIdx = coursesList.findIndex((c) => c.id === activeCourse.id);
    if (currentCourseIdx === -1) {
      return { nextLesson: null, nextCourse: null, isNextAccessible: false };
    }

    const currentLessonIdx = activeCourse.lessons.findIndex((l) => l.id === activeLesson.id);
    if (currentLessonIdx === -1) {
      return { nextLesson: null, nextCourse: null, isNextAccessible: false };
    }

    // Next lesson in same course
    if (currentLessonIdx < activeCourse.lessons.length - 1) {
      const nextLesson = activeCourse.lessons[currentLessonIdx + 1];
      const isNextAccessible = isCourseAccessible(activeCourse);
      return { nextLesson, nextCourse: activeCourse, isNextAccessible };
    }

    // Next lesson is first lesson of next course
    if (currentCourseIdx < coursesList.length - 1) {
      const nextCourse = coursesList[currentCourseIdx + 1];
      if (nextCourse.lessons && nextCourse.lessons.length > 0) {
        const nextLesson = nextCourse.lessons[0];
        const isNextAccessible = isCourseAccessible(nextCourse);
        return { nextLesson, nextCourse, isNextAccessible };
      }
    }

    return { nextLesson: null, nextCourse: null, isNextAccessible: false };
  };

  const { nextLesson, nextCourse, isNextAccessible } = getNextLessonInfo();

  const triggerModuleCompletion = () => {
    if (!activeCourse) return;
    const key = `gos_celebrated_${activeCourse.id}`;
    const alreadyCelebrated = localStorage.getItem(key);
    if (!alreadyCelebrated) {
      localStorage.setItem(key, "true");
      setCompletedModuleName(activeCourse.title);
      setShowCompletionModal(true);
      addXp(100); // 100 XP module completion bonus
    }
  };

  // Mark lesson watched
  const handleMarkWatched = () => {
    if (!activeLesson || !activeCourse) return;
    completeLesson(activeLesson.id);

    const updatedLessons = completedLessons.includes(activeLesson.id) 
      ? completedLessons 
      : [...completedLessons, activeLesson.id];

    const allLessonsWatched = activeCourse.lessons.every((l) => updatedLessons.includes(l.id));
    const quizPassedAlready = passedQuizzes.includes(activeCourse.id);

    if (allLessonsWatched && quizPassedAlready) {
      triggerModuleCompletion();
    } else {
      const toast = document.createElement("div");
      toast.className = "fixed bottom-20 right-5 bg-emerald-500 text-white font-semibold px-4 py-3 rounded-xl shadow-lg z-50 animate-bounce text-xs border border-emerald-400/20";
      toast.innerHTML = `🔥 Quest watched! (+20 XP)`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }
  };

  // Quiz check
  const handleCheckQuiz = () => {
    if (selectedOption === null || !activeCourse) {
      setQuizErrorMessage("Please select a qualifying answer option.");
      return;
    }

    setQuizChecked(true);
    const correctIndex = activeCourse.quiz.correctIndex;
    
    if (selectedOption === correctIndex) {
      setQuizPassed(true);
      setQuizErrorMessage("");
      passQuiz(activeCourse.id);

      const updatedQuizzes = passedQuizzes.includes(activeCourse.id)
        ? passedQuizzes
        : [...passedQuizzes, activeCourse.id];

      const allLessonsWatched = activeCourse.lessons.every((l) => completedLessons.includes(l.id));

      if (allLessonsWatched) {
        triggerModuleCompletion();
      } else {
        const toast = document.createElement("div");
        toast.className = "fixed bottom-20 right-5 bg-emerald-500 text-white font-semibold px-4 py-3 rounded-xl shadow-lg z-50 animate-bounce text-xs border border-emerald-400/20";
        toast.innerHTML = `🏆 Quiz checkpoint cleared! (+50 XP)`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
      }
    } else {
      setQuizPassed(false);
      setQuizErrorMessage("Authorization denied. Incorrect blueprint alignment.");
    }
  };

  // Submit Blueprint
  const handleBlueprintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignmentTitle || !assignmentLink) return;

    setIsSubmitting(true);
    
    submitAssignment({
      courseId: activeCourse.id,
      lessonId: activeLesson.id,
      courseTitle: activeCourse.title,
      lessonTitle: activeLesson.title,
      studentName: user.name,
      studentEmail: user.email,
      title: assignmentTitle,
      link: assignmentLink
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setAssignmentTitle("");
      setAssignmentLink("");

      const toast = document.createElement("div");
      toast.className = "fixed bottom-20 right-5 bg-emerald-500 text-white font-semibold px-4 py-3 rounded-xl shadow-lg z-50 text-xs border border-emerald-400/20";
      toast.innerHTML = `📨 Blueprint submitted for mentor audit! (+10 XP)`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }, 800);
  };

  // AI chat send
  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const text = inputMessage;
    setChatMessages((prev) => [...prev, { sender: "user", text }]);
    setInputMessage("");

    setTimeout(() => {
      let reply = `Regarding "${activeLesson.title}": ensure you structure your visual flowchart before configuring webhook triggers. Let me know if you need template links.`;
      const lower = text.toLowerCase();
      if (lower.includes("quiz") || lower.includes("correct")) {
        reply = "Review the week video notes to identify the primary element linking marketing funnels to webhook payloads.";
      }
      setChatMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 600);
  };

  const activeLessonWatched = completedLessons.includes(activeLesson.id);
  const activeCourseQuizPassed = passedQuizzes.includes(activeCourse.id);
  const currentSubmission = assignments.find(
    (a) => a.lessonId === activeLesson.id && a.studentEmail.toLowerCase() === user.email.toLowerCase()
  );

  const activeDrip = getCohortWeekInfo(activeCourse);
  const activePrereq = getPriorCoursePrereqs(activeCourse);
  let activeUnlockedLevel = user.unlockedLevel;
  if (passedQuizzes.includes("c6")) activeUnlockedLevel = Math.max(activeUnlockedLevel, 2);
  if (passedQuizzes.includes("c8")) activeUnlockedLevel = Math.max(activeUnlockedLevel, 3);
  const isActiveUnlocked = activeCourse.level <= activeUnlockedLevel;
  const isCurrentCourseAccessible = isActiveUnlocked && !activeDrip.isDripLocked && (!activePrereq || !activePrereq.isLocked);

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300 dark bg-slate-950 text-slate-100">
      
      <header className="px-6 py-4 flex items-center justify-between border-b shrink-0 bg-slate-900 border-slate-800">
        <div className="flex items-center gap-4">
          <Link
            href="/academy"
            className="p-1.5 rounded-lg hover:bg-slate-150 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="text-left">
            <div className="flex flex-wrap items-center gap-1.5 text-[9px] text-slate-500 font-bold uppercase tracking-wider font-mono">
              <Link href="/academy" className="hover:text-indigo-400 transition-colors">
                Academy Hub
              </Link>
              <span className="text-slate-700">/</span>
              <span>Level {activeCourse.level}</span>
              <span className="text-slate-700">/</span>
              <span className="" title={activeCourse.title}>
                {activeCourse.title}
              </span>
              <span className="text-slate-700">/</span>
              <span className="text-indigo-400" title={activeLesson.title}>
                {activeLesson.title}
              </span>
            </div>
            <h1 className="text-xs md:text-sm font-bold text-slate-100 font-display mt-0.5">{activeLesson.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-slate-150 dark:hover:bg-slate-800 transition-colors text-slate-500"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* CORE WORKSPACE */}
      <div className="flex-grow flex relative overflow-hidden">
        
        {/* SIDEBAR COURSE INDEX */}
        <aside className={`w-80 shrink-0 border-r absolute md:relative z-20 h-full transition-transform duration-350 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:hidden"
        } bg-slate-900/60 border-slate-800`}>
          <div className="h-full overflow-y-auto p-4 space-y-6 text-left">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b pb-2 border-slate-800">Curriculum Map</h3>
            
            <div className="space-y-4">
              {coursesList.map((course) => {
                let unlockedLevel = user.unlockedLevel;
                if (passedQuizzes.includes("c6")) unlockedLevel = Math.max(unlockedLevel, 2);
                if (passedQuizzes.includes("c8")) unlockedLevel = Math.max(unlockedLevel, 3);
                const isUnlocked = course.level <= unlockedLevel;
                const drip = getCohortWeekInfo(course);
                const prereq = getPriorCoursePrereqs(course);
                const accessible = isUnlocked && !drip.isDripLocked && (!prereq || !prereq.isLocked);

                return (
                  <div key={course.id} className="space-y-1.5 text-xs">
                    <div className="flex justify-between items-center px-2 py-1 bg-slate-950/40 border border-slate-800 rounded-lg">
                      <span className="font-bold truncate max-w-[180px]">{course.title}</span>
                      {!accessible ? (
                        <Lock className="h-3 w-3 text-slate-500 shrink-0" />
                      ) : passedQuizzes.includes(course.id) ? (
                        <span className="badge-success text-[8px] px-1.5 py-0.5">CLEARED</span>
                      ) : (
                        <span className="badge-warning text-[8px] px-1.5 py-0.5">ACTIVE</span>
                      )}
                    </div>

                    {accessible && (
                      <div className="pl-3 space-y-1 border-l border-slate-800">
                        {course.lessons.map((les) => {
                          const watched = completedLessons.includes(les.id);
                          const active = les.id === lessonId;
                          return (
                            <Link
                              key={les.id}
                              href={`/academy/course/${course.id}/${les.id}`}
                              className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                                active
                                  ? "bg-indigo-600/10 text-indigo-400 font-bold border border-indigo-500/20"
                                  : "hover:bg-slate-800 text-slate-400 font-medium"
                              }`}
                            >
                              <span className="truncate max-w-[160px]">{les.title}</span>
                              {watched ? (
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                              ) : (
                                <Play className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* STUDY STAGE */}
        <main className="flex-1 overflow-y-auto p-6 space-y-8 text-left max-w-4xl mx-auto">
          {!isCurrentCourseAccessible ? (
            <div className="border rounded-3xl p-12 text-center space-y-6 bg-slate-900 border-slate-800 my-12">
              <div className="h-16 w-16 bg-slate-950 border border-slate-805 rounded-full flex items-center justify-center mx-auto text-indigo-400">
                <Lock className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-slate-100 font-display">Quest Node Locked</h2>
                <p className="text-xs text-slate-400 max-w-md mx-auto font-light leading-relaxed">
                  To access this mission node, please complete all preceding lessons and clear the quiz checkpoint for the prior module: <span className="font-bold text-indigo-400">"{activePrereq?.priorCourseTitle || "Previous Course"}"</span>.
                </p>
              </div>
              <div className="pt-4">
                <Link
                  href="/academy"
                  className="btn-primary inline-flex items-center gap-2 text-xs uppercase tracking-wider"
                >
                  Return to Dashboard
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* VIDEO FRAME PANEL */}
          <div className="border rounded-3xl overflow-hidden shadow-lg relative aspect-video bg-slate-950 border-slate-800">
            <video
              ref={videoRef}
              src={activeLesson.videoUrl}
              controls
              onEnded={() => {
                setVideoEnded(true);
                handleMarkWatched();
              }}
              className="h-full w-full object-cover"
              poster="/images/dashboard-video-poster.jpg"
            />

            {/* Play Next Overlay */}
            {videoEnded && nextLesson && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center space-y-4 z-10 transition-all duration-300">
                <div className="text-center space-y-1">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest font-mono">Up Next</span>
                  <h3 className="text-base font-bold text-white max-w-sm truncate px-4">{nextLesson.title}</h3>
                  <p className="text-xs text-slate-400">{nextLesson.duration}</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  {isNextAccessible ? (
                    <Link
                      href={`/academy/course/${nextCourse?.id}/${nextLesson.id}`}
                      className="btn-primary flex items-center gap-2 text-xs uppercase tracking-wider shadow-lg shadow-indigo-500/25 px-6 py-2.5 rounded-xl font-bold"
                    >
                      Play Next Video <ChevronRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <button
                        disabled
                        className="btn-primary opacity-50 cursor-not-allowed flex items-center gap-2 text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl font-bold"
                      >
                        Play Next Video <Lock className="h-3.5 w-3.5" />
                      </button>
                      <span className="text-[10px] text-rose-400 font-bold font-mono">
                        Locked: Complete Prior Course requirements
                      </span>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setVideoEnded(false);
                      if (videoRef.current) {
                        videoRef.current.currentTime = 0;
                        videoRef.current.play();
                      }
                    }}
                    className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors cursor-pointer mt-2"
                  >
                    Replay Video
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* WATCH TRIGGER ACTION BAR */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold font-display">{activeLesson.title}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-light">Duration: {activeLesson.duration} &bull; Fulfill watch status and clearing targets to proceed.</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={handleMarkWatched}
                disabled={activeLessonWatched}
                className={`${activeLessonWatched ? "btn-success" : "btn-primary shadow-md"} text-xs uppercase tracking-wider flex items-center gap-1.5`}
              >
                {activeLessonWatched ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" /> Watched & Saved
                  </>
                ) : (
                  "Mark as Watched (+20 XP)"
                )}
              </button>

              {nextLesson && (
                isNextAccessible ? (
                  <Link
                    href={`/academy/course/${nextCourse?.id}/${nextLesson.id}`}
                    className="btn-primary text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md"
                  >
                    Play Next <ChevronRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <button
                    disabled
                    className="btn-primary opacity-50 cursor-not-allowed text-xs uppercase tracking-wider flex items-center gap-1.5"
                    title="Prerequisite locked. Complete prior requirements first."
                  >
                    Play Next <Lock className="h-3.5 w-3.5" />
                  </button>
                )
              )}
            </div>
          </div>

          {/* ATTACHED RESOURCE LINK */}
          {activeLesson.shareLink && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-indigo-500/15 text-indigo-400 rounded-xl flex items-center justify-center shrink-0">
                  <ExternalLink className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-200">Attached Lesson Resource</h4>
                  <p className="text-[10px] text-slate-400 font-light mt-0.5">Reference documents, PDFs, templates, or external links attached to this lesson.</p>
                </div>
              </div>
              <a
                href={activeLesson.shareLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs uppercase tracking-wider flex items-center gap-1.5 self-stretch sm:self-auto justify-center"
              >
                Open Attached Resource <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          )}

          {/* CHECKPOINT GATES GRIDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* QUIZ PORTAL */}
            <Card>
              <div className="flex items-center gap-2 border-b pb-3 mb-4 border-slate-800">
                <HelpCircle className="h-4 w-4 text-indigo-500" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">Quiz checkgate</h3>
              </div>

              {activeCourseQuizPassed ? (
                <div className="py-6 text-center space-y-3">
                  <div className="h-10 w-10 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                    <Check className="h-5 w-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-100">Quiz checkpoint passed</h4>
                    <p className="text-[10px] text-slate-400 mt-1 font-light">Gating cleared. This course level is validated in the ledger.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs font-bold text-slate-200 leading-normal">{activeCourse.quiz.question}</p>
                  
                  <div className="space-y-2">
                    {activeCourse.quiz.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (!quizChecked) setSelectedOption(idx);
                        }}
                        className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                          selectedOption === idx
                            ? "bg-indigo-600/10 border-indigo-500/40 text-indigo-400"
                            : "bg-transparent border-slate-800 text-slate-350 hover:border-slate-700"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {quizErrorMessage && (
                    <p className="text-[10px] text-rose-500 font-bold flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {quizErrorMessage}
                    </p>
                  )}

                  <div className="pt-2">
                    <button
                      onClick={handleCheckQuiz}
                      className="btn-primary w-full text-xs uppercase tracking-wider"
                    >
                      Authorize Quiz Check
                    </button>
                  </div>
                </div>
              )}
            </Card>

            {/* BLUEPRINT GATEWAY */}
            <Card>
              <div className="flex items-center gap-2 border-b pb-3 mb-4 border-slate-800">
                <Upload className="h-4 w-4 text-indigo-500" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">Blueprint submission</h3>
              </div>

              {currentSubmission ? (
                <div className="space-y-4 text-xs">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950/40 border border-slate-800">
                    <div className="truncate pr-2">
                      <h4 className="font-bold truncate">{currentSubmission.title}</h4>
                      <a
                        href={currentSubmission.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[9px] text-indigo-400 hover:underline inline-flex items-center gap-0.5 mt-0.5"
                      >
                        Inspect link <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    </div>
                    <span className={
                      currentSubmission.status === "approved"
                        ? "badge-success text-[8px]"
                        : currentSubmission.status === "rejected"
                        ? "badge-danger text-[8px]"
                        : "badge-warning text-[8px]"
                    }>
                      {currentSubmission.status.toUpperCase()}
                    </span>
                  </div>

                  {currentSubmission.feedback && (
                    <div className="border border-slate-800 rounded-xl p-3.5 italic bg-slate-950/20 font-mono text-[10px] text-slate-400">
                      Feedback: &ldquo;{currentSubmission.feedback}&rdquo;
                    </div>
                  )}

                  {currentSubmission.status === "rejected" && (
                    <form onSubmit={handleBlueprintSubmit} className="space-y-3 pt-2">
                      <input
                        type="text"
                        required
                        placeholder="Blueprint Title (e.g. Model V1 Revision)"
                        value={assignmentTitle}
                        onChange={(e) => setAssignmentTitle(e.target.value)}
                        className="input-field"
                      />
                      <input
                        type="url"
                        required
                        placeholder="Revised Google Doc / Miro board link"
                        value={assignmentLink}
                        onChange={(e) => setAssignmentLink(e.target.value)}
                        className="input-field"
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full text-xs uppercase tracking-wider"
                      >
                        {isSubmitting ? "Uploading blueprint..." : "Upload revision"}
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                <form onSubmit={handleBlueprintSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <input
                      type="text"
                      required
                      placeholder="Blueprint Title (e.g. Mindset Map V1)"
                      value={assignmentTitle}
                      onChange={(e) => setAssignmentTitle(e.target.value)}
                      className="input-field"
                    />
                    <input
                      type="url"
                      required
                      placeholder="Asset Link (Google Doc, Miro board, Figma URL)"
                      value={assignmentLink}
                      onChange={(e) => setAssignmentLink(e.target.value)}
                      className="input-field"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full text-xs uppercase tracking-wider"
                  >
                    {isSubmitting ? "Registering Blueprint..." : "Submit Blueprint (+10 XP)"}
                  </button>
                </form>
              )}
            </Card>

          </div>

          {/* TAKEAWAYS & DISCUSSION FEED */}
          <Card className="bg-slate-900 border-slate-800" glow={false}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b pb-4 mb-5 border-slate-800/80">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-100 font-display">takeaways & discussion</h3>
                  <p className="text-[10px] text-slate-500 font-light mt-0.5">Share your core learning takeaways from this lesson</p>
                </div>
              </div>
              <span className="bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-[10px] font-mono text-slate-400 font-bold shrink-0">
                {comments.length} Takeaways
              </span>
            </div>

            {/* POST COMMENT FORM */}
            <form onSubmit={handleAddComment} className="flex gap-4 items-start mb-6">
              <div className="h-8 w-8 rounded-full bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs uppercase shrink-0">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 space-y-3">
                <textarea
                  required
                  placeholder="Share your key takeaways or learning insights from this lesson..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="w-full min-h-[72px] p-3 text-xs bg-slate-950/60 border border-slate-855 rounded-xl focus:outline-none focus:border-indigo-500/50 text-slate-200 placeholder-slate-500 resize-none leading-relaxed transition-colors"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn-primary py-1.5 px-4 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="h-3 w-3" /> Post takeaway
                  </button>
                </div>
              </div>
            </form>

            {/* COMMENTS LIST */}
            {comments.length === 0 ? (
              <div className="text-center py-6 text-slate-500 text-xs font-light">
                No learning takeaways posted yet. Be the first to share!
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex gap-4 items-start pt-4 border-t border-slate-800/60"
                  >
                    <div className="h-8 w-8 rounded-full bg-slate-950 border border-slate-805 flex items-center justify-center text-slate-400 font-bold text-xs uppercase shrink-0">
                      {comment.authorName.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0 text-xs">
                      <div className="flex justify-between items-center gap-2 mb-1.5">
                        <span className="font-bold text-slate-300">{comment.authorName}</span>
                        <span className="text-[10px] text-slate-500 font-light font-mono">{comment.timestamp}</span>
                      </div>
                      <p className="text-slate-400 leading-relaxed font-medium break-words">
                        {comment.content}
                      </p>
                      
                      {/* LIKE ACTION */}
                      <div className="mt-2.5 flex items-center gap-2">
                        <button
                          onClick={() => handleLikeComment(comment.id)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all text-[10px] font-bold uppercase tracking-wider cursor-pointer ${
                            comment.likedByCurrentUser
                              ? "bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/20"
                              : "bg-transparent border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700"
                          }`}
                        >
                          <Heart className={`h-3 w-3 ${comment.likedByCurrentUser ? "fill-rose-450 text-rose-450" : ""}`} />
                          {comment.likes} {comment.likes === 1 ? "like" : "likes"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

            </>
          )}
        </main>
      </div>

      {/* CHAT ACCOUNTABILITY Guide OVERLAY */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-80 h-96 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col text-left text-slate-200"
          >
            <div className="bg-indigo-600 p-4 flex justify-between items-center text-white shrink-0">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                <span className="text-xs font-bold font-display uppercase tracking-wider">Accountability guide</span>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-white/80 hover:text-white">✕</button>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-3 text-xs">
              {chatMessages.map((m, idx) => (
                <div key={idx} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-xl px-3 py-2 leading-relaxed ${
                    m.sender === "user" ? "bg-indigo-600 text-white" : "bg-slate-950 border border-slate-800 text-slate-400"
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendChatMessage} className="p-2 border-t border-slate-800 bg-slate-950 shrink-0 flex gap-2">
              <input
                type="text"
                placeholder="Ask blueprint feedback tips..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-grow bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
              />
              <button type="submit" className="px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center justify-center">
                <Send className="h-3 w-3" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODULE COMPLETION CELEBRATION MODAL */}
      <AnimatePresence>
        {showCompletionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
            <Confetti />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-lg w-full text-center relative overflow-hidden shadow-2xl space-y-6"
            >
              {/* Background glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              
              {/* Gold Medal Icon */}
              <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-400 p-0.5 shadow-lg shadow-amber-500/10 flex items-center justify-center animate-bounce">
                <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center">
                  <Award className="h-10 w-10 text-amber-400" />
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest font-mono">
                  Module Completed Successfully
                </span>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white font-display uppercase">
                  {completedModuleName}
                </h2>
                <p className="text-xs text-slate-400 max-w-sm mx-auto font-light leading-relaxed">
                  You have cleared all blueprint checkpoints, watched all video briefs, and passed the module quiz audit.
                </p>
              </div>

              {/* Bonus Card */}
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 flex justify-between items-center text-left">
                <div>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider font-mono">Completion Reward</span>
                  <p className="text-xs font-bold text-slate-200">System Integration Bonus</p>
                </div>
                <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-xl text-amber-400 font-mono text-xs font-bold">
                  <Sparkles className="h-3.5 w-3.5 animate-pulse" /> +100 XP
                </div>
              </div>

              {/* Level Progress */}
              {activeCourse && (
                <div className="space-y-2 text-left bg-slate-950/30 border border-slate-850 p-4 rounded-2xl">
                  {activeCourse.level === 1 ? (
                    (() => {
                      const completedCount = ["c1", "c2", "c3", "c4", "c5", "c6"].filter(cId => {
                        const c = coursesList.find(x => x.id === cId);
                        return c && c.lessons.every(l => completedLessons.includes(l.id)) && passedQuizzes.includes(cId);
                      }).length;
                      const progressPercent = Math.min(100, Math.round((completedCount / 6) * 100));
                      const isLevel1Finished = completedCount === 6;

                      return (
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                            <span className="text-slate-400">Level 1 Foundations Progress</span>
                            <span className="text-indigo-400 font-mono">{progressPercent}% ({completedCount}/6 Modules)</span>
                          </div>
                          <div className="h-2 w-full bg-slate-805 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-indigo-500 to-amber-500 transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                          </div>
                          {isLevel1Finished && (
                            <p className="text-[10px] text-emerald-400 font-bold pt-1 flex items-center gap-1.5">
                              <Check className="h-3.5 w-3.5 text-emerald-400" /> Level 1 fully cleared! You are certified.
                            </p>
                          )}
                        </div>
                      );
                    })()
                  ) : (
                    (() => {
                      const completedCount = ["c7", "c8"].filter(cId => {
                        const c = coursesList.find(x => x.id === cId);
                        return c && c.lessons.every(l => completedLessons.includes(l.id)) && passedQuizzes.includes(cId);
                      }).length;
                      const progressPercent = Math.min(100, Math.round((completedCount / 2) * 100));
                      const isLevel2Finished = completedCount === 2;

                      return (
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                            <span className="text-slate-400">Level 2 Systems Integration Progress</span>
                            <span className="text-indigo-400 font-mono">{progressPercent}% ({completedCount}/2 Modules)</span>
                          </div>
                          <div className="h-2 w-full bg-slate-805 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                          </div>
                          {isLevel2Finished && (
                            <p className="text-[10px] text-emerald-400 font-bold pt-1 flex items-center gap-1.5">
                              <Check className="h-3.5 w-3.5 text-emerald-400" /> Level 2 fully cleared! Ascension Pathway authorized.
                            </p>
                          )}
                        </div>
                      );
                    })()
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col gap-2 pt-2">
                {activeCourse && (
                  (() => {
                    const isL1Finished = activeCourse.level === 1 && ["c1", "c2", "c3", "c4", "c5", "c6"].every(cId => {
                      const c = coursesList.find(x => x.id === cId);
                      return c && c.lessons.every(l => completedLessons.includes(l.id)) && passedQuizzes.includes(cId);
                    });
                    const isL2Finished = activeCourse.level === 2 && ["c7", "c8"].every(cId => {
                      const c = coursesList.find(x => x.id === cId);
                      return c && c.lessons.every(l => completedLessons.includes(l.id)) && passedQuizzes.includes(cId);
                    });

                    if (isL1Finished || isL2Finished) {
                      return (
                        <Link
                          href="/academy?tab=profile"
                          className="btn-primary w-full py-3 text-xs uppercase tracking-wider font-bold text-center block cursor-pointer"
                        >
                          Claim Graduation Certificate & Badge
                        </Link>
                      );
                    }
                  })()
                )}

                <button
                  onClick={() => setShowCompletionModal(false)}
                  className="w-full py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/40 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Continue Learning
                </button>
                
                <Link
                  href="/academy"
                  className="w-full py-1 text-[10px] font-bold text-indigo-400 hover:underline uppercase tracking-wider block text-center cursor-pointer"
                >
                  Return to Syllabus Dashboard
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
