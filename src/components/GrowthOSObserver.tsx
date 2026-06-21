"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export interface VisitorProfile {
  id: string;
  firstVisit: string;
  lastVisit: string;
  sessions: number;
  source: string;
  device: string;
  score: number;
  tier: "Cold" | "Warm" | "Hot" | "Customer";
  visitedPages: string[];
  maxScrollDepth: number;
  timeOnSite: number;
  clicksCount: number;
  downloadsCount: number;
  webinarsRegistered: boolean;
  strategyCallBooked: boolean;
  newsletterSubscribed: boolean;
  email?: string;
  name?: string;
  business?: string;
}

export default function GrowthOSObserver() {
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Initialize Profile
    let profile: VisitorProfile;
    const savedProfile = localStorage.getItem("gos_visitor_profile");
    
    // Check if new session
    const isNewSession = !sessionStorage.getItem("gos_session_active");
    if (isNewSession) {
      sessionStorage.setItem("gos_session_active", "true");
    }

    if (savedProfile) {
      try {
        profile = JSON.parse(savedProfile);
        profile.lastVisit = new Date().toISOString();
        if (!profile.visitedPages) {
          profile.visitedPages = [];
        }
        if (isNewSession) {
          profile.sessions = (profile.sessions || 1) + 1;
        }
      } catch (e) {
        profile = createDefaultProfile();
      }
    } else {
      profile = createDefaultProfile();
    }

    // 2. Track Referral Query Parameters (utm_source, ref)
    const ref = searchParams?.get("ref");
    const utmSource = searchParams?.get("utm_source");
    if (ref && !profile.source.includes("Referral")) {
      profile.source = `Referral (ref: ${ref})`;
    } else if (utmSource && !profile.source.includes("Campaign")) {
      profile.source = `Campaign (${utmSource})`;
    }

    // 3. Save initial profile
    saveProfile(profile);

    // 4. Track Scroll Depth
    let maxScroll = profile.maxScrollDepth || 0;
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const scrollPercent = Math.round((scrollTop / docHeight) * 100);
        if (scrollPercent > maxScroll) {
          maxScroll = scrollPercent;
          updateProfileField("maxScrollDepth", maxScroll);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 5. Track Time on Site (increments timeOnSite every 5 seconds)
    const timeInterval = setInterval(() => {
      const currentProfile = getActiveProfile();
      if (currentProfile) {
        currentProfile.timeOnSite = (currentProfile.timeOnSite || 0) + 5;
        saveProfile(currentProfile);
      }
    }, 5000);

    // 6. Track Page Clicks & Form Submissions
    const handleClicks = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest("a, button, input[type='submit']");
      if (clickable) {
        const currentProfile = getActiveProfile();
        if (currentProfile) {
          currentProfile.clicksCount = (currentProfile.clicksCount || 0) + 1;
          
          const text = clickable.textContent?.trim() || (clickable as HTMLInputElement).value || clickable.getAttribute("aria-label") || "element";
          logEvent("Click", pathname, `Clicked: "${text.substring(0, 40)}"`);

          // Check if booking strategy session
          if (
            text.toLowerCase().includes("book") || 
            text.toLowerCase().includes("strategy") || 
            text.toLowerCase().includes("consultation") ||
            clickable.getAttribute("href")?.includes("contact")
          ) {
            currentProfile.score += 15;
            logEvent("High-Intent Click", pathname, "Clicked strategy session booking triggers");
          }

          // Check if downloading resources
          if (text.toLowerCase().includes("download") || text.toLowerCase().includes("unlock")) {
            currentProfile.score += 10;
            logEvent("Download Click", pathname, "Clicked resource download button");
          }

          saveProfile(currentProfile);
        }
      }
    };
    document.addEventListener("click", handleClicks);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(timeInterval);
      document.removeEventListener("click", handleClicks);
    };
  }, []);

  // 7. Track Path Name & Score Routing
  useEffect(() => {
    if (typeof window === "undefined" || pathname.startsWith("/admin")) return;

    const currentProfile = getActiveProfile();
    if (!currentProfile) return;

    // Avoid double-counting same page refresh scoring inside session
    const isFirstTimePageThisSession = !currentProfile.visitedPages.includes(pathname);
    if (!currentProfile.visitedPages.includes(pathname)) {
      currentProfile.visitedPages.push(pathname);
    }

    // Apply Lead Scoring Weights
    let scoreIncrement = 0;
    if (pathname === "/") {
      scoreIncrement = 5;
    } else if (pathname === "/services") {
      scoreIncrement = 10;
    } else if (pathname === "/frameworks") {
      scoreIncrement = 10;
    } else if (pathname === "/blog") {
      scoreIncrement = 5;
    } else if (pathname.startsWith("/blog/")) {
      scoreIncrement = 8; // Post read
    } else if (pathname === "/resources") {
      scoreIncrement = 15;
    } else if (pathname === "/masterclass") {
      scoreIncrement = 15;
    } else if (pathname === "/contact") {
      scoreIncrement = 15;
    }

    if (isFirstTimePageThisSession) {
      currentProfile.score += scoreIncrement;
      logEvent("Page Visit", pathname, `Scored +${scoreIncrement} for visiting page.`);
    } else {
      logEvent("Page Visit", pathname, "Visited page (already visited in this browser life).");
    }

    saveProfile(currentProfile);
  }, [pathname]);

  return null;
}

// HELPER UTILITIES
function createDefaultProfile(): VisitorProfile {
  const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
  return {
    id: "anon_" + Math.random().toString(36).substring(2, 11),
    firstVisit: new Date().toISOString(),
    lastVisit: new Date().toISOString(),
    sessions: 1,
    source: typeof document !== "undefined" && document.referrer ? document.referrer : "Direct Traffic",
    device: isMobile ? "Mobile" : "Desktop",
    score: 0,
    tier: "Cold",
    visitedPages: [],
    maxScrollDepth: 0,
    timeOnSite: 0,
    clicksCount: 0,
    downloadsCount: 0,
    webinarsRegistered: false,
    strategyCallBooked: false,
    newsletterSubscribed: false,
  };
}

function getActiveProfile(): VisitorProfile | null {
  if (typeof window === "undefined") return null;
  const saved = localStorage.getItem("gos_visitor_profile");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed && !parsed.visitedPages) {
        parsed.visitedPages = [];
      }
      return parsed;
    } catch (e) {
      return null;
    }
  }
  return null;
}

function saveProfile(profile: VisitorProfile) {
  if (typeof window === "undefined") return;

  // Calculate Lead Tiers
  if (profile.strategyCallBooked) {
    profile.tier = "Customer";
  } else if (profile.score >= 50) {
    profile.tier = "Hot";
  } else if (profile.score >= 20) {
    profile.tier = "Warm";
  } else {
    profile.tier = "Cold";
  }

  localStorage.setItem("gos_visitor_profile", JSON.stringify(profile));

  // Dispatch custom event for dynamic components personalization
  const event = new CustomEvent("gos_profile_updated", { detail: profile });
  window.dispatchEvent(event);
}

function updateProfileField<K extends keyof VisitorProfile>(field: K, value: VisitorProfile[K]) {
  const profile = getActiveProfile();
  if (profile) {
    profile[field] = value;
    saveProfile(profile);
  }
}

function logEvent(type: string, path: string, details: string) {
  if (typeof window === "undefined") return;
  const events = localStorage.getItem("gos_events_log");
  let arr = [];
  if (events) {
    try {
      arr = JSON.parse(events);
    } catch (e) {}
  }
  const newEv = {
    timestamp: new Date().toLocaleTimeString(),
    type,
    path,
    details,
  };
  arr.unshift(newEv);
  localStorage.setItem("gos_events_log", JSON.stringify(arr.slice(0, 100))); // limit to 100 events
}
