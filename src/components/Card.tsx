"use client";

import React from "react";

interface CardProps {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  glow?: boolean;
  onClick?: () => void;
}

export default function Card({
  header,
  children,
  footer,
  className = "",
  glow = false,
  onClick,
}: CardProps) {
  const isClickable = !!onClick;
  
  return (
    <div
      onClick={onClick}
      className={`
        rounded-2xl border border-slate-800 
        bg-slate-900 shadow-sm 
        transition-all duration-300
        ${glow ? "shadow-md hover:shadow-lg" : "hover:shadow-md"}
        ${isClickable ? "cursor-pointer hover:-translate-y-0.5 active:translate-y-0" : ""}
        ${className}
      `}
    >
      {header && (
        <div className="px-6 py-4 border-b border-slate-800">
          {header}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
      {footer && (
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/20 rounded-b-2xl">
          {footer}
        </div>
      )}
    </div>
  );
}
