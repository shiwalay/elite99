"use client";

import React from "react";

interface CertificateLayoutProps {
  studentName: string;
  courseName: string;
  levelName: string;
  completionDate: string;
  certificateId: string;
}

export default function CertificateLayout({
  studentName,
  courseName,
  levelName,
  completionDate,
  certificateId,
}: CertificateLayoutProps) {
  return (
    <div className="bg-white text-slate-900 border-[16px] border-amber-600/20 p-12 rounded-lg max-w-[842px] aspect-[1.414/1] w-full mx-auto relative shadow-2xl overflow-hidden font-serif select-none print:shadow-none print:border-amber-600 print:rounded-none">
      {/* Background Watermark Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Inner thin border */}
      <div className="border border-amber-600/30 h-full w-full p-8 flex flex-col justify-between items-center relative z-10 print:border-amber-600">
        
        {/* Certificate Header */}
        <div className="text-center space-y-2">
          <div className="text-amber-650 font-sans tracking-[0.4em] font-bold text-xs uppercase">
            elite transformation academy
          </div>
          <h2 className="text-2xl md:text-3xl font-sans font-bold tracking-wide uppercase text-slate-800 mt-2">
            certificate of completion
          </h2>
          <div className="h-0.5 w-24 bg-amber-600/40 mx-auto mt-3" />
        </div>

        {/* Certificate Recipient Statement */}
        <div className="text-center space-y-4 my-4 w-full">
          <p className="italic text-slate-500 text-[10px] md:text-xs font-serif">
            This certifies that the candidate has successfully completed the curriculum and cleared the audits for
          </p>
          <h3 className="text-2xl md:text-3xl font-sans font-bold text-indigo-950 uppercase tracking-wide truncate max-w-lg mx-auto">
            {studentName}
          </h3>
          <p className="italic text-slate-500 text-[10px] md:text-xs font-serif">
            and is granted ascension credentials for completing the specialized program:
          </p>
          <div className="space-y-1">
            <h4 className="text-lg md:text-xl font-sans font-semibold text-slate-800">
              {courseName}
            </h4>
            <span className="bg-amber-600/10 border border-amber-600/20 text-amber-800 font-sans font-bold text-[9px] uppercase px-3 py-0.5 rounded-full tracking-wider inline-block">
              {levelName}
            </span>
          </div>
        </div>

        {/* Certificate Footer Signatures & Details */}
        <div className="w-full flex justify-between items-end mt-4 pt-6 border-t border-slate-100">
          {/* Left: Issue Date and Verification */}
          <div className="text-left space-y-1">
            <div className="text-[9px] font-sans font-bold text-slate-500 uppercase tracking-wider">
              verification registry
            </div>
            <div className="text-[9px] font-mono text-slate-400">
              Date: {completionDate}
            </div>
            <div className="text-[9px] font-mono text-slate-400">
              ID: {certificateId}
            </div>
          </div>

          {/* Center: QR Code Mock */}
          <div className="flex flex-col items-center gap-1">
            <div className="h-12 w-12 border border-slate-200 p-1 bg-white rounded-md shrink-0">
              {/* Simple Mock QR Code SVG */}
              <svg viewBox="0 0 100 100" className="h-full w-full text-slate-800">
                <rect x="0" y="0" width="25" height="25" fill="currentColor" />
                <rect x="5" y="5" width="15" height="15" fill="white" />
                <rect x="75" y="0" width="25" height="25" fill="currentColor" />
                <rect x="80" y="5" width="15" height="15" fill="white" />
                <rect x="0" y="75" width="25" height="25" fill="currentColor" />
                <rect x="5" y="80" width="15" height="15" fill="white" />
                {/* Random blocks for code look */}
                <rect x="35" y="10" width="10" height="10" fill="currentColor" />
                <rect x="55" y="20" width="15" height="10" fill="currentColor" />
                <rect x="35" y="45" width="15" height="15" fill="currentColor" />
                <rect x="65" y="40" width="10" height="20" fill="currentColor" />
                <rect x="15" y="45" width="10" height="10" fill="currentColor" />
                <rect x="80" y="80" width="15" height="15" fill="currentColor" />
              </svg>
            </div>
            <span className="text-[6px] font-mono text-slate-450 uppercase tracking-widest">
              Scan to Verify
            </span>
          </div>

          {/* Right: Signature */}
          <div className="text-right space-y-0.5">
            <div className="font-serif italic text-base text-indigo-900 border-b border-slate-200 pb-0.5 font-bold pr-2 select-none">
              Swapnil Shiwalay
            </div>
            <div className="text-[9px] font-sans font-bold text-slate-500 uppercase tracking-wider">
              Program Director
            </div>
            <div className="text-[8px] font-mono text-slate-400">
              Elite 90™ Architect
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
