"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Edit2,
  Layers,
  Video,
  HelpCircle,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Sparkles,
  Clock,
  Play,
  Check,
  Award,
  BookOpenCheck,
  FileText,
  AlertCircle,
  UserCheck,
  Users
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEcosystemStore } from "@/store/useEcosystemStore";
import { DEFAULT_COURSES, Course, Lesson } from "../../academy/courses-data";
import Card from "@/components/Card";
import { useAdminTheme } from "@/components/AdminThemeContext";

interface CustomBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: string;
}

export default function LmsManagerPage() {
  const {
    assignments,
    updateAssignmentStatus,
    addXp
  } = useEcosystemStore();
  const { theme } = useAdminTheme();

  const [coursesList, setCoursesList] = useState<Course[]>([]);
  const [lmsStudents, setLmsStudents] = useState<any[]>([]);
  const [lmsActiveView, setLmsActiveView] = useState<"dashboard" | "wizard" | "grading" | "gamification">("dashboard");
  
  // Wizard course creation states
  const [activeStep, setActiveStep] = useState<number>(1);
  const [newCourseForm, setNewCourseForm] = useState({
    title: "",
    level: 1,
    duration: "Week 1",
    description: ""
  });
  const [wizardLessons, setWizardLessons] = useState<Lesson[]>([]);
  const [newLessonForm, setNewLessonForm] = useState({
    title: "",
    duration: "10 mins",
    videoUrl: "",
    shareLink: ""
  });
  const [quizForm, setQuizForm] = useState({
    question: "",
    o1: "",
    o2: "",
    o3: "",
    o4: "",
    correctIndex: 0
  });

  // Gamification states
  const [availableBadges, setAvailableBadges] = useState<CustomBadge[]>([]);
  const [xpAdjustUser, setXpAdjustUser] = useState("");
  const [xpAdjustAmount, setXpAdjustAmount] = useState(100);

  // Initialize
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Courses
      const savedCourses = localStorage.getItem("academy_courses_list");
      if (savedCourses) {
        try { setCoursesList(JSON.parse(savedCourses)); } catch (e) { setCoursesList(DEFAULT_COURSES); }
      } else {
        setCoursesList(DEFAULT_COURSES);
        localStorage.setItem("academy_courses_list", JSON.stringify(DEFAULT_COURSES));
      }

      // Students
      const savedStudents = localStorage.getItem("academy_leaderboard_data");
      if (savedStudents) {
        try { setLmsStudents(JSON.parse(savedStudents)); } catch (e) { setLmsStudents([]); }
      } else {
        setLmsStudents([]);
      }

      // Badges
      const defaultBadges: CustomBadge[] = [
        { id: "b1", title: "Course Champion", description: "Completed all foundation course levels.", icon: "🏆", requirement: "Complete L1 Curriculum" },
        { id: "b2", title: "Implementation Expert", description: "Created full working Zapier integration webhook logs.", icon: "⚙️", requirement: "Setup Webhook Flowchart" }
      ];
      const savedBadges = localStorage.getItem("academy_badges");
      if (savedBadges) {
        try { setAvailableBadges(JSON.parse(savedBadges)); } catch (e) { setAvailableBadges(defaultBadges); }
      } else {
        setAvailableBadges(defaultBadges);
        localStorage.setItem("academy_badges", JSON.stringify(defaultBadges));
      }
    }
  }, []);

  const pushAuditLog = (actionText: string) => {
    const savedLogs = localStorage.getItem("gos_audit_logs") || "[]";
    try {
      const logs = JSON.parse(savedLogs);
      const newLog = {
        id: "log_" + Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        action: actionText,
        user: "Swapnil Shiwalay"
      };
      localStorage.setItem("gos_audit_logs", JSON.stringify([newLog, ...logs].slice(0, 50)));
    } catch (e) {}
  };

  // Add lesson in Wizard
  const handleAddWizardLesson = () => {
    if (!newLessonForm.title) return;
    const lesson: Lesson = {
      id: "les_" + Date.now(),
      title: newLessonForm.title,
      duration: newLessonForm.duration,
      videoUrl: newLessonForm.videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4",
      shareLink: newLessonForm.shareLink || undefined
    };
    setWizardLessons([...wizardLessons, lesson]);
    setNewLessonForm({ title: "", duration: "10 mins", videoUrl: "", shareLink: "" });
  };

  // Wizard Complete -> Save Course
  const handleFinishWizard = () => {
    const nextCourse: Course = {
      id: "c_" + Date.now(),
      level: Number(newCourseForm.level),
      title: newCourseForm.title,
      duration: newCourseForm.duration,
      description: newCourseForm.description,
      lessons: wizardLessons,
      quiz: {
        question: quizForm.question || "What is the core target of this module?",
        options: [quizForm.o1 || "Option A", quizForm.o2 || "Option B", quizForm.o3 || "Option C", quizForm.o4 || "Option D"],
        correctIndex: Number(quizForm.correctIndex)
      }
    };

    const updatedCourses = [...coursesList, nextCourse];
    setCoursesList(updatedCourses);
    localStorage.setItem("academy_courses_list", JSON.stringify(updatedCourses));
    pushAuditLog(`LMS: Created course node "${newCourseForm.title}"`);

    // Reset wizard
    setNewCourseForm({ title: "", level: 1, duration: "Week 1", description: "" });
    setWizardLessons([]);
    setQuizForm({ question: "", o1: "", o2: "", o3: "", o4: "", correctIndex: 0 });
    setActiveStep(1);
    setLmsActiveView("dashboard");

    alert(`Course "${nextCourse.title}" successfully added to curriculum map.`);
  };

  // Delete course
  const handleDeleteCourse = (id: string) => {
    const updated = coursesList.filter((c) => c.id !== id);
    setCoursesList(updated);
    localStorage.setItem("academy_courses_list", JSON.stringify(updated));
    pushAuditLog(`LMS: Removed course node ID ${id}`);
  };

  // Adjust XP points
  const handleAdjustXpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!xpAdjustUser) return;

    // Apply XP update to student roster state
    const updated = lmsStudents.map((s) => {
      if (s.name === xpAdjustUser || s.email === xpAdjustUser) {
        const nextXp = Math.max(0, s.xp + xpAdjustAmount);
        // Sync with active student user if applicable
        const activeStudent = localStorage.getItem("academy_logged_in_user");
        if (activeStudent) {
          try {
            const parsed = JSON.parse(activeStudent);
            if (parsed.email.toLowerCase() === s.email.toLowerCase()) {
              addXp(xpAdjustAmount);
            }
          } catch (e) {}
        }
        return { ...s, xp: nextXp };
      }
      return s;
    });

    setLmsStudents(updated);
    localStorage.setItem("academy_leaderboard_data", JSON.stringify(updated));
    pushAuditLog(`Gamification: Awarded ${xpAdjustAmount} XP to ${xpAdjustUser}`);
    alert(`XP ledger modified for ${xpAdjustUser} successfully.`);
    setXpAdjustUser("");
  };

  return (
    <div className="space-y-8 text-left">
      
      {/* HEADER BANNER */}
      <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4 ${
        theme === "light" ? "border-slate-200" : "border-slate-800"
      }`}>
        <div>
          <h1 className="text-3xl font-bold font-display">LMS Curriculum Manager</h1>
          <p className="text-slate-500 text-sm mt-1 font-light">Structure learning blueprints, grade student assignments, and issue merit badges.</p>
        </div>

        {/* View Switchers */}
        <div className={`flex p-1 rounded-xl gap-1 shrink-0 border ${
          theme === "light" ? "bg-slate-100 border-slate-200" : "bg-slate-950 border-slate-800"
        }`}>
          {[
            { id: "dashboard", label: "Curriculum Map", icon: BookOpen },
            { id: "wizard", label: "Add Course Map", icon: Plus },
            { id: "grading", label: "Blueprints Grading Desk", icon: BookOpenCheck },
            { id: "gamification", label: "Merits & XP Desk", icon: Award }
          ].map((v) => {
            const Icon = v.icon;
            return (
              <button
                key={v.id}
                onClick={() => setLmsActiveView(v.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  lmsActiveView === v.id
                    ? theme === "light"
                      ? "bg-white text-indigo-600 shadow-xs border border-slate-200"
                      : "bg-slate-900 text-white shadow-xs border border-slate-800"
                    : theme === "light"
                    ? "text-slate-500 hover:text-slate-800"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {v.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* SUB-SECTIONS */}
      <div className="space-y-6">

        {/* 1. CURRICULUM OVERVIEW */}
        {lmsActiveView === "dashboard" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coursesList.map((course) => (
                <Card key={course.id} className="flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <span className="bg-indigo-600/15 text-indigo-600 dark:text-indigo-400 font-bold px-2 py-0.5 rounded text-[9px] font-mono">
                        LEVEL {course.level} &bull; {course.duration}
                      </span>
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="p-1 text-slate-400 hover:text-rose-500 rounded transition-colors cursor-pointer"
                        title="Delete Course Node"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <h3 className={`font-bold text-base ${theme === "light" ? "text-slate-800" : "text-white"}`}>{course.title}</h3>
                    <p className={`text-xs font-light leading-normal ${theme === "light" ? "text-slate-500" : "text-slate-400"}`}>{course.description}</p>
                    
                    {/* Lessons list */}
                    <div className="pt-3 space-y-1">
                      <span className="text-[9px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider block font-mono">Quest nodes list</span>
                      {course.lessons.map((l, idx) => (
                        <div key={l.id} className={`flex items-center justify-between text-xs p-2 border rounded-lg ${
                          theme === "light" ? "bg-slate-50 border-slate-100" : "bg-slate-950/40 border-slate-800/80"
                        }`}>
                          <div className="flex flex-col min-w-0 pr-2">
                            <span className="font-medium truncate">{idx + 1}. {l.title}</span>
                            {l.shareLink && (
                              <a
                                href={l.shareLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[9px] text-indigo-500 hover:text-indigo-400 font-mono mt-0.5 truncate hover:underline"
                                title={l.shareLink}
                              >
                                🔗 {l.shareLink}
                              </a>
                            )}
                          </div>
                          <span className="text-[9px] text-slate-500 dark:text-slate-400 font-mono shrink-0">{l.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`pt-4 border-t mt-4 flex justify-between items-center text-[10px] text-slate-500 dark:text-slate-400 font-mono ${
                    theme === "light" ? "border-slate-100" : "border-slate-800"
                  }`}>
                    <span>Quiz Barrier Configured</span>
                    <span className="font-bold text-indigo-500">Cleared target Index: {course.quiz?.correctIndex}</span>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* 2. ADD COURSE WIZARD */}
        {lmsActiveView === "wizard" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-xl mx-auto"
          >
            <Card className="space-y-6">
              <div className="flex justify-between items-center border-b pb-3 border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-bold uppercase tracking-wider">Curriculum wizard (Step {activeStep}/3)</h3>
                <span className="text-[10px] bg-indigo-500/10 text-indigo-500 font-bold px-2 py-0.5 rounded-full font-mono">NEW COURSE</span>
              </div>

              {/* Step 1: Course Info */}
              {activeStep === 1 && (
                <div className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-450 uppercase block font-mono">Course Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Scaling Personal Authority models"
                      value={newCourseForm.title}
                      onChange={(e) => setNewCourseForm((prev) => ({ ...prev, title: e.target.value }))}
                      className="input-field"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-450 uppercase block font-mono">Course Tier level</label>
                      <select
                        value={newCourseForm.level}
                        onChange={(e) => setNewCourseForm((prev) => ({ ...prev, level: Number(e.target.value) }))}
                        className="select-field"
                      >
                        <option value={1}>Level 1 Foundations</option>
                        <option value={2}>Level 2 Integration</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-450 uppercase block font-mono">Duration index</label>
                      <input
                        type="text"
                        placeholder="e.g. Week 4 or Module 2"
                        value={newCourseForm.duration}
                        onChange={(e) => setNewCourseForm((prev) => ({ ...prev, duration: e.target.value }))}
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-450 uppercase block font-mono">Description Summary</label>
                    <textarea
                      rows={3}
                      placeholder="Flesh out the syllabus objectives for student logs..."
                      value={newCourseForm.description}
                      onChange={(e) => setNewCourseForm((prev) => ({ ...prev, description: e.target.value }))}
                      className="textarea-field h-24"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => {
                        if (newCourseForm.title) setActiveStep(2);
                      }}
                      className="btn-primary text-xs uppercase tracking-wider"
                    >
                      Next Step <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Quest node items builder */}
              {activeStep === 2 && (
                <div className="space-y-4 text-xs">
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-500 uppercase block font-mono border-b pb-1 border-slate-100 dark:border-slate-800">Quest Lessons List</h4>
                    {wizardLessons.length > 0 ? (
                      <div className="space-y-2">
                        {wizardLessons.map((l, index) => (
                          <div key={index} className={`flex justify-between items-center p-2.5 border rounded-lg ${
                            theme === "light" ? "bg-slate-50 border-slate-200" : "bg-slate-950/40 border-slate-800"
                          }`}>
                            <div className="flex flex-col">
                              <span className="font-medium">{index + 1}. {l.title} ({l.duration})</span>
                              {l.shareLink && (
                                <span className="text-[9px] text-indigo-400 font-mono mt-0.5 truncate max-w-[300px]">🔗 Attached: {l.shareLink}</span>
                              )}
                            </div>
                            <button
                              onClick={() => setWizardLessons(wizardLessons.filter((_, i) => i !== index))}
                              className="p-1 text-slate-500 dark:text-slate-400 hover:text-rose-500 rounded cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 italic py-2 font-light">No quest nodes added yet.</p>
                    )}
                  </div>

                  <div className={`border p-4 rounded-2xl space-y-3 ${
                    theme === "light" ? "bg-slate-50 border-slate-200" : "bg-slate-950/20 border-slate-800"
                  }`}>
                    <span className="font-bold text-slate-500 uppercase block font-mono text-[9px]">Add lesson coordinates</span>
                    <input
                      type="text"
                      placeholder="e.g. Intro to Client Retainers"
                      value={newLessonForm.title}
                      onChange={(e) => setNewLessonForm((prev) => ({ ...prev, title: e.target.value }))}
                      className="input-field"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Duration (e.g. 15 mins)"
                        value={newLessonForm.duration}
                        onChange={(e) => setNewLessonForm((prev) => ({ ...prev, duration: e.target.value }))}
                        className="input-field"
                      />
                      <input
                        type="url"
                        placeholder="Video link (Wistia/Vimeo URL)"
                        value={newLessonForm.videoUrl}
                        onChange={(e) => setNewLessonForm((prev) => ({ ...prev, videoUrl: e.target.value }))}
                        className="input-field"
                      />
                    </div>
                    <input
                      type="url"
                      placeholder="Share link/Attached resource URL (PDF/Website - optional)"
                      value={newLessonForm.shareLink || ""}
                      onChange={(e) => setNewLessonForm((prev) => ({ ...prev, shareLink: e.target.value }))}
                      className="input-field font-mono text-[11px]"
                    />
                    <button
                      onClick={handleAddWizardLesson}
                      className="btn-primary w-full text-xs uppercase tracking-wider"
                    >
                      Insert Quest Node
                    </button>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      onClick={() => setActiveStep(1)}
                      className="btn-secondary text-xs uppercase tracking-wider"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" /> Back
                    </button>
                    <button
                      onClick={() => setActiveStep(3)}
                      className="btn-primary text-xs uppercase tracking-wider"
                    >
                      Next Step <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Quiz Gating Parameters */}
              {activeStep === 3 && (
                <div className="space-y-4 text-xs">
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-455 uppercase block font-mono border-b pb-1 border-slate-100 dark:border-slate-800">Quiz checkgate config</h4>
                    
                    <div className="space-y-1">
                      <label className="font-bold text-slate-450 uppercase block font-mono">Quiz Question</label>
                      <input
                        type="text"
                        placeholder="e.g. Which model produces recurring authority retainers?"
                        value={quizForm.question}
                        onChange={(e) => setQuizForm((prev) => ({ ...prev, question: e.target.value }))}
                        className="input-field"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-bold text-slate-455 uppercase block font-mono">Configure answer options</label>
                      <div className="grid grid-cols-2 gap-2">
                        {["o1", "o2", "o3", "o4"].map((opt, i) => (
                          <input
                            key={opt}
                            type="text"
                            placeholder={`Option ${i + 1}`}
                            value={(quizForm as any)[opt]}
                            onChange={(e) => setQuizForm((prev) => ({ ...prev, [opt]: e.target.value }))}
                            className="input-field"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-450 uppercase block font-mono">Correct Index option</label>
                      <select
                        value={quizForm.correctIndex}
                        onChange={(e) => setQuizForm((prev) => ({ ...prev, correctIndex: Number(e.target.value) }))}
                        className="select-field"
                      >
                        <option value={0}>Option 1</option>
                        <option value={1}>Option 2</option>
                        <option value={2}>Option 3</option>
                        <option value={3}>Option 4</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => setActiveStep(2)}
                      className="btn-secondary text-xs uppercase tracking-wider"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" /> Back
                    </button>
                    <button
                      onClick={handleFinishWizard}
                      className="btn-primary text-xs uppercase tracking-wider"
                    >
                      Compile Course Node <Check className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        )}

        {/* 3. ASSIGNMENT GRADING DESK */}
        {lmsActiveView === "grading" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {assignments.length > 0 ? (
              assignments.map((asg) => (
                <Card key={asg.id} className="space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs">{asg.studentName}</span>
                        <span className="text-[9px] text-slate-500 font-mono">{asg.studentEmail}</span>
                      </div>
                      <span className="text-[10px] text-slate-455 block font-light mt-0.5 font-mono">{asg.timestamp}</span>
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

                  <div className={`border p-4 rounded-xl space-y-1.5 ${
                    theme === "light" ? "bg-slate-50 border-slate-200" : "bg-slate-950/40 border-slate-800"
                  }`}>
                    <span className="text-[8px] font-bold text-indigo-500 uppercase tracking-wider block font-mono">
                      {asg.courseTitle} &rarr; {asg.lessonTitle}
                    </span>
                    <h4 className={`text-xs font-bold ${theme === "light" ? "text-slate-800" : "text-slate-200"}`}>{asg.title}</h4>
                    <div className="pt-2 flex items-center gap-2 text-xs">
                      <a
                        href={asg.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        Inspect blueprint URL <ArrowRight className="h-3 w-3" />
                      </a>
                    </div>
                    {asg.feedback && (
                      <p className="text-[10px] text-slate-500 dark:text-slate-450 italic pt-2 border-t border-slate-200/50 dark:border-slate-800 mt-2 font-mono">
                        Feedback: &ldquo;{asg.feedback}&rdquo;
                      </p>
                    )}
                  </div>

                  {asg.status === "pending" && (
                    <div className="flex flex-col sm:flex-row gap-2 pt-2 text-xs">
                      <input
                        type="text"
                        placeholder="Add review summary..."
                        id={`lms_feedback_${asg.id}`}
                        className="input-field flex-grow"
                      />
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => {
                            const input = document.getElementById(`lms_feedback_${asg.id}`) as HTMLInputElement;
                            updateAssignmentStatus(asg.id, "approved", input?.value || "Approved. Clear to proceed.");
                            pushAuditLog(`LMS: Approved blueprint submitted by ${asg.studentName}`);
                          }}
                          className="btn-success text-xs uppercase tracking-wider"
                        >
                          Approve Blueprint
                        </button>
                        <button
                          onClick={() => {
                            const input = document.getElementById(`lms_feedback_${asg.id}`) as HTMLInputElement;
                            updateAssignmentStatus(asg.id, "rejected", input?.value || "Blueprints reject. Please revise.");
                            pushAuditLog(`LMS: Rejected blueprint submitted by ${asg.studentName}`);
                          }}
                          className="btn-danger text-xs uppercase tracking-wider"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  )}
                </Card>
              ))
            ) : (
              <div className="py-8 text-center text-slate-500 text-xs font-light">
                No blueprint submissions are currently registered.
              </div>
            )}
          </motion.div>
        )}

        {/* 4. GAMIFICATION DESK */}
        {lmsActiveView === "gamification" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Adjust XP */}
              <Card>
                <h3 className="text-xs font-bold uppercase tracking-wider mb-4 border-b pb-2 border-slate-100 dark:border-slate-800">Adjust student XP ledger</h3>
                <form onSubmit={handleAdjustXpSubmit} className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-450 uppercase block font-mono">Select Student</label>
                    <select
                      value={xpAdjustUser}
                      onChange={(e) => setXpAdjustUser(e.target.value)}
                      className="select-field"
                    >
                      <option value="">Choose Student Roster...</option>
                      {lmsStudents.map((s, idx) => (
                        <option key={s.email || s.name || idx} value={s.name}>{s.name} ({s.email})</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-450 uppercase block font-mono">XP adjustment amount</label>
                    <input
                      type="number"
                      value={xpAdjustAmount}
                      onChange={(e) => setXpAdjustAmount(Number(e.target.value))}
                      className="input-field font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full text-xs uppercase tracking-wider"
                  >
                    Adjust Ledger
                  </button>
                </form>
              </Card>

              {/* Badges overview */}
              <Card className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider border-b pb-2 border-slate-100 dark:border-slate-800">Available Merits</h3>
                <div className="grid grid-cols-2 gap-3">
                  {availableBadges.map((badge) => (
                    <div key={badge.id} className={`border p-3.5 rounded-xl text-center space-y-1 ${
                      theme === "light" ? "bg-slate-50 border-slate-200" : "bg-slate-950/40 border-slate-800/70"
                    }`}>
                      <span className="text-2xl">{badge.icon}</span>
                      <h4 className="text-xs font-bold">{badge.title}</h4>
                      <span className="badge-achievement text-[8px]">
                        {badge.requirement}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
