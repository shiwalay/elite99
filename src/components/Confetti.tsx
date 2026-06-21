"use client";

import React, { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  x: number; // percentage left
  delay: number; // seconds delay
  duration: number; // seconds duration
  color: string;
  shape: "circle" | "square" | "triangle";
  size: number; // pixels size
  spinSpeed: number; // seconds rotation duration
}

export default function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const colors = [
      "#3b82f6", // blue
      "#10b981", // emerald
      "#f59e0b", // amber
      "#ef4444", // red
      "#8b5cf6", // violet
      "#ec4899", // pink
      "#06b6d4"  // cyan
    ];
    const shapes: Array<"circle" | "square" | "triangle"> = ["circle", "square", "triangle"];

    const tempPieces: ConfettiPiece[] = Array.from({ length: 85 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2.5,
      duration: 3.5 + Math.random() * 3.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      size: 7 + Math.random() * 10,
      spinSpeed: 2 + Math.random() * 3
    }));

    setPieces(tempPieces);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50 animate-fade-in">
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0.2;
          }
        }
      `}</style>
      {pieces.map((p) => {
        const shapeStyle: React.CSSProperties = {};
        if (p.shape === "circle") {
          shapeStyle.borderRadius = "50%";
        } else if (p.shape === "triangle") {
          shapeStyle.width = 0;
          shapeStyle.height = 0;
          shapeStyle.backgroundColor = "transparent";
          shapeStyle.borderLeft = `${p.size / 2}px solid transparent`;
          shapeStyle.borderRight = `${p.size / 2}px solid transparent`;
          shapeStyle.borderBottom = `${p.size}px solid ${p.color}`;
        }

        return (
          <div
            key={p.id}
            className="absolute"
            style={{
              left: `${p.x}%`,
              top: "-50px",
              width: p.shape === "triangle" ? undefined : `${p.size}px`,
              height: p.shape === "triangle" ? undefined : `${p.size}px`,
              backgroundColor: p.shape === "triangle" ? undefined : p.color,
              animation: `fall ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`,
              transformOrigin: "center",
              ...shapeStyle
            }}
          />
        );
      })}
    </div>
  );
}
