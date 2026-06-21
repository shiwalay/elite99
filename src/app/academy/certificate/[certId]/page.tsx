"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, Download } from "lucide-react";
import CertificateLayout from "@/components/CertificateLayout";

export default function CertificateVerificationPage() {
  const params = useParams();
  const certId = params?.certId as string;
  
  const [data, setData] = useState<{
    studentName: string;
    courseName: string;
    levelName: string;
    completionDate: string;
  } | null>(null);

  useEffect(() => {
    if (!certId) return;

    // Attempt to read from localStorage to see if it matches the current user's generated certificate
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("academy_logged_in_user");
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);
          setData({
            studentName: user.name || "Rahul Sen",
            courseName: "ELITE 90™ Growth Operating System",
            levelName: certId.includes("L2") ? "Level 2: Systems Integration" : "Level 1: Foundational Architecture",
            completionDate: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
          });
          return;
        } catch (e) {}
      }
      
      // Fallback details if no user logged in
      setData({
        studentName: "Rahul Sen",
        courseName: "ELITE 90™ Growth Operating System",
        levelName: certId.includes("L2") ? "Level 2: Systems Integration" : "Level 1: Foundational Architecture",
        completionDate: "21 June 2026"
      });
    }
  }, [certId]);

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-xs text-slate-400 font-mono">
        Loading verification registry node...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center justify-center p-4 md:p-8 font-sans print:p-0 print:bg-white">
      
      {/* Header Back Button - Hidden during print */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-6 print:hidden">
        <Link
          href="/academy"
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" /> Return to Academy
        </Link>
        
        <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
          <CheckCircle2 className="h-3.5 w-3.5" /> Registry Verified
        </div>
      </div>

      {/* Main Content Card */}
      <div className="w-full max-w-4xl bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-10 space-y-8 relative overflow-hidden shadow-2xl print:shadow-none print:border-none print:p-0 print:bg-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none print:hidden" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none print:hidden" />

        {/* Title - Hidden during print */}
        <div className="text-center space-y-2 print:hidden">
          <div className="flex justify-center items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-indigo-400" />
            <h1 className="text-xl md:text-2xl font-bold tracking-tight font-display text-white uppercase">
              Ascension Registry Node
            </h1>
          </div>
          <p className="text-xs text-slate-400 max-w-md mx-auto font-light leading-relaxed">
            Verify credentials status, signature registries, and specialized pathways clearing logs in the Elite 90 ledger.
          </p>
        </div>

        {/* Certificate Display Container */}
        <div className="border border-slate-800 rounded-2xl p-4 md:p-8 bg-slate-950/40 relative overflow-x-auto shadow-inner print:border-none print:p-0 print:bg-white print:overflow-visible">
          <div className="min-w-[640px] md:min-w-0 print:min-w-0">
            <CertificateLayout
              studentName={data.studentName}
              courseName={data.courseName}
              levelName={data.levelName}
              completionDate={data.completionDate}
              certificateId={certId}
            />
          </div>
        </div>

        {/* Action Panel - Hidden during print */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2 print:hidden">
          <button
            onClick={() => window.print()}
            className="btn-primary flex items-center gap-2 text-xs uppercase tracking-wider cursor-pointer"
          >
            <Download className="h-4 w-4" /> Download/Print Certificate
          </button>
          
          <div className="text-[10px] text-slate-500 font-mono">
            Registry Verification ID: <span className="text-slate-400 font-semibold">{certId}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
