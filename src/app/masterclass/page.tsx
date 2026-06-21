"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  CheckCircle,
  Clock,
  Sparkles,
  Users,
  Award,
  Video,
  ChevronRight,
  Shield,
  VolumeX,
  Volume2,
  ArrowRight,
} from "lucide-react";
import { useEcosystemStore } from "@/store/useEcosystemStore";

export default function MasterclassPage() {
  const { user, loginUser, addXp } = useEcosystemStore();
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const [copyData, setCopyData] = useState({
    masterclassTitle: "Digital Business Ecosystem Masterclass",
    masterclassDescription: "Watch this 15-minute training and discover the exact systems Swapnil Shiwalay uses to help coaches, experts, and founders automate acquisition and operations.",
    masterclassVideoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    masterclassVideoProvider: "self_hosted",
    masterclassCtaText: "Book 1-on-1 Consultation",
    masterclassCtaLink: "/contact"
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [retention, setRetention] = useState(0);
  const [watchedSeconds, setWatchedSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const ytPlayerRef = useRef<any>(null);
  const vimeoPlayerRef = useRef<any>(null);
  const wistiaPlayerRef = useRef<any>(null);

  const isYouTubeUrl = (url: string) => {
    if (!url) return false;
    let cleanUrl = url.trim();
    if (cleanUrl.includes("<iframe") && cleanUrl.includes("src=")) {
      const match = cleanUrl.match(/src=["']([^"']+)["']/i);
      if (match && match[1]) cleanUrl = match[1].trim();
    }
    if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) return true;
    const lower = cleanUrl.toLowerCase();
    return lower.includes("youtube.com") || lower.includes("youtu.be") || lower.includes("youtube-nocookie.com");
  };

  const getYouTubeId = (url: string) => {
    if (!url) return null;
    let cleanUrl = url.trim();
    if (cleanUrl.includes("<iframe") && cleanUrl.includes("src=")) {
      const match = cleanUrl.match(/src=["']([^"']+)["']/i);
      if (match && match[1]) cleanUrl = match[1].trim();
    }
    if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) return cleanUrl;
    const regexes = [
      /[?&]v=([^&#\?]+)/i,
      /youtu\.be\/([^&#\?]+)/i,
      /embed\/([^&#\?]+)/i,
      /shorts\/([^&#\?]+)/i,
      /live\/([^&#\?]+)/i,
      /v\/([^&#\?]+)/i,
      /youtube\.com\/([^&#\?\/]+)$/i
    ];
    for (const regex of regexes) {
      const match = cleanUrl.match(regex);
      if (match && match[1]) {
        const id = match[1].trim();
        if (id.length === 11) return id;
      }
    }
    return null;
  };

  const getVimeoId = (url: string) => {
    if (!url) return null;
    let cleanUrl = url.trim();
    if (cleanUrl.includes("<iframe") && cleanUrl.includes("src=")) {
      const match = cleanUrl.match(/src=["']([^"']+)["']/i);
      if (match && match[1]) cleanUrl = match[1].trim();
    }
    if (/^\d+$/.test(cleanUrl)) return cleanUrl;
    const regExp = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/i;
    const match = cleanUrl.match(regExp);
    return match ? match[1] : null;
  };

  const getWistiaId = (url: string) => {
    if (!url) return null;
    let cleanUrl = url.trim();
    if (cleanUrl.includes("<iframe") && cleanUrl.includes("src=")) {
      const match = cleanUrl.match(/src=["']([^"']+)["']/i);
      if (match && match[1]) cleanUrl = match[1].trim();
    }
    if (/^[a-zA-Z0-9]{10}$/.test(cleanUrl)) return cleanUrl;
    const regExp = /(?:wistia\.com\/medias\/|wistia\.net\/embed\/iframe\/|medias\/)([a-zA-Z0-9]{10})/i;
    const match = cleanUrl.match(regExp);
    return match ? match[1] : null;
  };

  // Sync with CMS text overrides
  useEffect(() => {
    const saved = localStorage.getItem("website_cms_copy");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCopyData((prev) => ({
          ...prev,
          masterclassTitle: parsed.masterclassTitle || prev.masterclassTitle,
          masterclassDescription: parsed.masterclassDescription || prev.masterclassDescription,
          masterclassVideoUrl: parsed.masterclassVideoUrl || prev.masterclassVideoUrl,
          masterclassVideoProvider: parsed.masterclassVideoProvider || prev.masterclassVideoProvider,
          masterclassCtaText: parsed.masterclassCtaText || prev.masterclassCtaText,
          masterclassCtaLink: parsed.masterclassCtaLink || prev.masterclassCtaLink
        }));
      } catch (e) {}
    }

    // If user already logged in, bypass form
    if (user) {
      setIsRegistered(true);
    }
  }, [user]);

  // Load Wistia/Vimeo/Youtube third-party API triggers
  useEffect(() => {
    if (!isRegistered) return;
    const provider = copyData.masterclassVideoProvider;
    const videoUrl = copyData.masterclassVideoUrl;

    if (isYouTubeUrl(videoUrl) || provider === "youtube") {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      (window as any).onYouTubeIframeAPIReady = () => {
        const ytId = getYouTubeId(videoUrl);
        if (!ytId) return;
        ytPlayerRef.current = new (window as any).YT.Player("yt-player", {
          videoId: ytId,
          playerVars: {
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3
          },
          events: {
            onReady: () => setIsPlayerReady(true),
            onStateChange: handleYTStateChange
          }
        });
      };
    } else if (provider === "vimeo" || videoUrl.includes("vimeo.com")) {
      const script = document.createElement("script");
      script.src = "https://player.vimeo.com/api/player.js";
      script.onload = () => {
        const vimeoId = getVimeoId(videoUrl);
        if (!vimeoId) return;
        vimeoPlayerRef.current = new (window as any).Vimeo.Player("vimeo-player", {
          id: vimeoId,
          controls: false
        });
        vimeoPlayerRef.current.ready().then(() => {
          setIsPlayerReady(true);
        });
        vimeoPlayerRef.current.on("play", () => setIsPlaying(true));
        vimeoPlayerRef.current.on("pause", () => setIsPlaying(false));
        vimeoPlayerRef.current.on("timeupdate", (data: any) => {
          setProgress(data.percent * 100);
          setWatchedSeconds(Math.round(data.seconds));
          setRetention(Math.min(Math.round((data.seconds / data.duration) * 100), 100));
        });
        vimeoPlayerRef.current.on("ended", handleVideoEnded);
      };
      document.body.appendChild(script);
    } else if (provider === "wistia" || videoUrl.includes("wistia.com")) {
      const wistiaId = getWistiaId(videoUrl);
      if (wistiaId) {
        const script = document.createElement("script");
        script.src = `https://fast.wistia.com/embed/medias/${wistiaId}.jsonp`;
        const script2 = document.createElement("script");
        script2.src = "https://fast.wistia.com/assets/external/E-v1.js";
        script2.onload = () => {
          (window as any)._wq = (window as any)._wq || [];
          (window as any)._wq.push({
            id: wistiaId,
            onReady: (video: any) => {
              wistiaPlayerRef.current = video;
              setIsPlayerReady(true);
              video.bind("play", () => setIsPlaying(true));
              video.bind("pause", () => setIsPlaying(false));
              video.bind("secondchange", (sec: number) => {
                const duration = video.duration();
                setProgress((sec / duration) * 100);
                setWatchedSeconds(sec);
                setRetention(Math.min(Math.round((sec / duration) * 100), 100));
              });
              video.bind("end", handleVideoEnded);
            }
          });
        };
        document.body.appendChild(script);
        document.body.appendChild(script2);
      }
    } else {
      // Self hosted default HTML5 player is ready instantly
      setIsPlayerReady(true);
    }
  }, [isRegistered]);

  // YouTube state polling timer
  let ytInterval: any = null;
  const handleYTStateChange = (event: any) => {
    if (event.data === (window as any).YT.PlayerState.PLAYING) {
      setIsPlaying(true);
      ytInterval = setInterval(() => {
        if (ytPlayerRef.current) {
          const current = ytPlayerRef.current.getCurrentTime();
          const duration = ytPlayerRef.current.getDuration();
          setProgress((current / duration) * 100);
          setWatchedSeconds(Math.round(current));
          setRetention(Math.min(Math.round((current / duration) * 100), 100));
        }
      }, 1000);
    } else {
      setIsPlaying(false);
      if (ytInterval) clearInterval(ytInterval);
      if (event.data === (window as any).YT.PlayerState.ENDED) {
        handleVideoEnded();
      }
    }
  };

  useEffect(() => {
    return () => {
      if (ytInterval) clearInterval(ytInterval);
    };
  }, []);

  const handlePlayClick = () => {
    if (isPlaying) {
      // Pause
      if (videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else if (ytPlayerRef.current) {
        ytPlayerRef.current.pauseVideo();
      } else if (vimeoPlayerRef.current) {
        vimeoPlayerRef.current.pause();
      } else if (wistiaPlayerRef.current) {
        wistiaPlayerRef.current.pause();
      }
    } else {
      // Play
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else if (ytPlayerRef.current) {
        ytPlayerRef.current.playVideo();
      } else if (vimeoPlayerRef.current) {
        vimeoPlayerRef.current.play();
      } else if (wistiaPlayerRef.current) {
        wistiaPlayerRef.current.play();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration || 1;
      setProgress((current / duration) * 100);
      setWatchedSeconds(Math.round(current));
      setRetention(Math.min(Math.round((current / duration) * 100), 100));
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setVideoCompleted(true);
    addXp(50); // Award XP for completing the masterclass briefing
    
    // Update local profile
    const saved = localStorage.getItem("gos_visitor_profile");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        parsed.webinarsRegistered = true;
        parsed.score = (parsed.score || 0) + 15;
        localStorage.setItem("gos_visitor_profile", JSON.stringify(parsed));
        window.dispatchEvent(new CustomEvent("gos_profile_updated", { detail: parsed }));
      } catch (e) {}
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    } else if (ytPlayerRef.current) {
      if (ytPlayerRef.current.isMuted()) {
        ytPlayerRef.current.unMute();
        setIsMuted(false);
      } else {
        ytPlayerRef.current.mute();
        setIsMuted(true);
      }
    } else if (vimeoPlayerRef.current) {
      vimeoPlayerRef.current.getVolume().then((vol: number) => {
        vimeoPlayerRef.current.setVolume(vol === 0 ? 1 : 0);
        setIsMuted(vol > 0);
      });
    } else if (wistiaPlayerRef.current) {
      if (wistiaPlayerRef.current.isMuted()) {
        wistiaPlayerRef.current.unmute();
        setIsMuted(false);
      } else {
        wistiaPlayerRef.current.mute();
        setIsMuted(true);
      }
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;

    setSubmitting(true);
    
    // Create lead object statefully in CRM
    const newLead = {
      id: "lead_" + Date.now(),
      name: formData.name,
      email: formData.email,
      mobile: "+91 99999 99999",
      businessType: "expert",
      monthlyRevenue: "under_100k",
      challenge: "inconsistent_leads",
      notes: `Registered for Masterclass briefing. Description: ${formData.business}`,
      status: "New" as const,
      source: "Masterclass Form",
      date: new Date().toISOString().split("T")[0],
    };

    try {
      const saved = localStorage.getItem("crm_leads_data");
      const currentLeads = saved ? JSON.parse(saved) : [];
      localStorage.setItem("crm_leads_data", JSON.stringify([newLead, ...currentLeads]));
    } catch (err) {}

    // Hydrate student profile in store
    loginUser(formData.name, formData.email, "Student");

    // Award +20 score to visitor profile
    const savedProfile = localStorage.getItem("gos_visitor_profile");
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        profile.name = formData.name;
        profile.email = formData.email;
        profile.webinarsRegistered = true;
        profile.score = (profile.score || 0) + 20;
        localStorage.setItem("gos_visitor_profile", JSON.stringify(profile));
        window.dispatchEvent(new CustomEvent("gos_profile_updated", { detail: profile }));
      } catch (e) {}
    }

    sessionStorage.setItem("exit_intent_dismissed", "true");

    setTimeout(() => {
      setSubmitting(false);
      setIsRegistered(true);
    }, 1200);
  };

  const learnPoints = [
    "The 5-Step Digital Business Architect blueprint Swapnil Shiwalay deploys.",
    "How to connect Make.com and custom qualified AI middleware to CRM tables.",
    "How to replace hourly consulting packages with proprietary high-ticket frameworks.",
    "A structural audit method to find traffic bottlenecks in under 10 minutes."
  ];

  return (
    <div className="py-12 pb-20 relative overflow-hidden tech-grid-bg min-h-screen">
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {!isRegistered ? (
          /* REGISTRATION SCREEN */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start text-left">
            {/* Left Column: Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600/10 border border-indigo-500/20 text-xs font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
                <Video className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" /> Free Growth Masterclass
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display leading-tight gold-gradient-text pb-1">
                How to Build a Scalable Digital Ecosystem That Generates Clients on Autopilot
              </h1>
              <p className="text-slate-550 dark:text-slate-300 text-base sm:text-lg font-light leading-relaxed">
                Watch this 15-minute training and discover the exact systems Swapnil Shiwalay uses to help coaches, experts, and founders automate acquisition and operations.
              </p>

              {/* What you'll learn */}
              <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-white font-bold text-lg flex items-center gap-2 font-display">
                  <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" /> Core Curriculum & Outlines
                </h3>
                <ul className="space-y-3">
                  {learnPoints.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-slate-500 dark:text-slate-350 text-sm sm:text-base leading-relaxed font-light">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sidebar Duration Info */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                  <h4 className="text-white font-semibold text-xs flex items-center gap-1.5 mb-2 uppercase tracking-wider">
                    <Users className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" /> Audiences
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-light leading-normal">
                    Coaches, Consultants, Subject Experts, SaaS Founders.
                  </p>
                </div>
                <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                  <h4 className="text-white font-semibold text-xs flex items-center gap-1.5 mb-2 uppercase tracking-wider">
                    <Clock className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" /> Duration
                  </h4>
                  <p className="text-indigo-600 dark:text-indigo-400 text-2xl font-bold font-display">15 Minutes</p>
                  <p className="text-slate-450 dark:text-slate-500 text-[10px] mt-1 leading-normal">
                    Fully optimized value. Zero fluff. Straight strategies.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Registration Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-5"
            >
              <div className="glass-panel border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 p-6 sm:p-8 rounded-3xl space-y-6 shadow-lg">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold font-display text-white">Unlock Free Access</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-light">
                    Submit the qualification fields below to instantly load the masterclass stream.
                  </p>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-xs font-semibold text-slate-500 dark:text-slate-455 uppercase tracking-wider block">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      placeholder="e.g. John Doe"
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-600 transition-all text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-xs font-semibold text-slate-500 dark:text-slate-455 uppercase tracking-wider block">
                      Your Business Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      placeholder="e.g. john@business.com"
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-600 transition-all text-sm"
                    />
                  </div>

                  {/* Business Type */}
                  <div className="space-y-1">
                    <label htmlFor="business" className="text-xs font-semibold text-slate-500 dark:text-slate-455 uppercase tracking-wider block">
                      Business Description
                    </label>
                    <input
                      type="text"
                      id="business"
                      required
                      value={formData.business}
                      onChange={(e) => setFormData((p) => ({ ...p, business: e.target.value }))}
                      placeholder="e.g. Consulting Agency / Business Coach"
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-600 transition-all text-sm"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all cursor-pointer flex items-center justify-center text-xs uppercase tracking-widest shadow-xs disabled:opacity-50 mt-4"
                  >
                    {submitting ? "Preparing Stream..." : "Unlock Instantly"}
                  </button>
                </form>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-550 pt-2 border-t border-slate-200 dark:border-slate-800/80">
                  <Shield className="h-3.5 w-3.5 text-slate-405" /> Secure data connection
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          /* VIDEO PLAYER SCREEN */
          <div className="space-y-8 max-w-4xl mx-auto text-center">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-emerald-500 font-bold">
                Access Active &bull; Qualification Verified
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold font-display gold-gradient-text pb-1">
                {copyData.masterclassTitle}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-light">
                Welcome, <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{user?.name || "Rahul"}</span>. Watch the operational briefing below.
              </p>
            </div>

            {/* Video container */}
            <div
              onClick={handlePlayClick}
              className="relative w-full aspect-video rounded-3xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-center items-center group cursor-pointer"
            >
              {copyData.masterclassVideoProvider === "youtube" || isYouTubeUrl(copyData.masterclassVideoUrl) ? (
                <div id="yt-player" className="w-full h-full pointer-events-none" />
              ) : copyData.masterclassVideoProvider === "vimeo" ? (
                <div id="vimeo-player" className="w-full h-full pointer-events-none" />
              ) : copyData.masterclassVideoProvider === "wistia" ? (
                <div id="wistia-player" className="w-full h-full pointer-events-none" />
              ) : (
                copyData.masterclassVideoUrl && (
                  <video
                    ref={videoRef}
                    src={copyData.masterclassVideoUrl}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleVideoEnded}
                    onCanPlay={() => setIsPlayerReady(true)}
                    controls={false}
                    disablePictureInPicture
                    controlsList="nodownload nofullscreen noremoteplayback"
                    onContextMenu={(e) => e.preventDefault()}
                    className="w-full h-full object-cover animate-fade-in"
                    playsInline
                  />
                )
              )}

              {/* Overlay with play button / loading state */}
              {!isPlaying && !videoCompleted && (
                <div className="absolute inset-0 z-20 bg-slate-950/85 flex flex-col justify-center items-center p-6 space-y-4">
                  {!isPlayerReady ? (
                    <>
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600" />
                      <div className="text-center">
                        <p className="text-white font-semibold text-sm">Loading Briefing Stream...</p>
                        <p className="text-slate-500 text-xs mt-1">Connecting secure player endpoint</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="h-16 w-16 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300">
                        <Play className="h-8 w-8 fill-current ml-1" />
                      </div>
                      <div className="text-center animate-pulse">
                        <p className="text-white font-semibold text-lg">Click to Play Operational VSL</p>
                        <p className="text-slate-400 text-xs mt-1">Presented by Swapnil Shiwalay &bull; Retention Tracking Enabled</p>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Custom Mute Toggle */}
              {isPlaying && (
                <button
                  onClick={toggleMute}
                  className="absolute bottom-4 right-4 p-2 bg-slate-900/80 border border-slate-800 rounded-xl hover:border-indigo-600 text-slate-300 hover:text-white transition-colors cursor-pointer z-30"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
              )}

              {/* Secure Player Notice */}
              <div className="absolute top-4 left-4 px-2 py-1 rounded bg-slate-900/60 border border-slate-800 backdrop-blur-sm text-[9px] text-slate-400 uppercase tracking-widest font-semibold flex items-center gap-1 z-30">
                <Shield className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
                Secure VSL Stream
              </div>

              {/* Custom Video Progress bar at the bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-900">
                <div
                  className="h-full bg-indigo-600 transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Retention Stats Live Feedback */}
            <div className="flex justify-between items-center text-[10px] text-slate-500 max-w-xl mx-auto px-2">
              <span>Real-Time Retention: <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{retention}%</span></span>
              <span>Watch Progress: <span className="text-slate-400">{watchedSeconds}s</span></span>
            </div>

            {/* VSL CTA Box */}
            <div className={`relative mx-auto transition-all duration-500 ${videoCompleted ? "max-w-4xl" : "max-w-xl"}`}>
              {!videoCompleted ? (
                /* LOCKED CTA SCREEN */
                <div className="glass-panel border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 rounded-2xl p-6 text-center space-y-3 opacity-60">
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                    Advisory Scheduler Locked
                  </p>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    Please watch the operational briefing video to completion. Swapnil&apos;s priority calendar CTA link will unlock automatically once finished.
                  </p>
                </div>
              ) : (
                /* UNLOCKED CTA SCREEN (Fades in) */
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8 text-left"
                >
                  <div className="text-center space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      ✓ Masterclass Completed &bull; Retention Verified
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold font-display mt-2 gold-gradient-text pb-1">
                      Your Digital Ecosystem Roadmap
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl mx-auto font-light">
                      Transition from standard operations to a self-growing growth system. Choose your entry point below.
                    </p>
                  </div>                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                    {/* L1 Card */}
                    <div className="glass-panel border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 rounded-3xl p-6 flex flex-col justify-between relative hover:border-indigo-600 dark:hover:border-indigo-400 transition-all duration-300 hover:shadow-md group">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">Level 01</span>
                          <span className="px-2 py-0.5 text-[9px] font-bold bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 rounded-full uppercase">Instant Access</span>
                        </div>
                        <h3 className="text-white font-bold text-base sm:text-lg font-display group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          Conceptual Building Blocks
                        </h3>
                        <p className="text-slate-550 dark:text-slate-400 text-xs font-light leading-relaxed">
                          Lay the architectural blueprints of your digital business. Includes **6 core foundational courses** covering funnel models, customer scoring science, and operations mapping.
                        </p>
                        <div className="space-y-1.5 pt-2">
                          <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wide">Curriculum Highlights:</div>
                          <ul className="text-slate-500 dark:text-slate-350 text-[11px] space-y-1">
                            <li className="flex items-center gap-1">✓ The 5-Step Ecosystem Matrix</li>
                            <li className="flex items-center gap-1">✓ Authority Asset Structuring</li>
                            <li className="flex items-center gap-1">✓ Automation Trigger Blueprints</li>
                          </ul>
                        </div>
                      </div>
                      <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl font-bold font-display text-white">Rs. 4,999</span>
                          <span className="text-slate-450 dark:text-slate-500 text-[10px] line-through">Rs. 14,999</span>
                        </div>
                        <a
                          href="/contact?level=l1"
                          className="w-full text-center block px-4 py-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl uppercase tracking-wider transition-all duration-300"
                        >
                          Enroll in L1 Course
                        </a>
                      </div>
                    </div>

                    {/* L2 Card */}
                    <div className="glass-panel border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 rounded-3xl p-6 flex flex-col justify-between relative hover:border-indigo-600 dark:hover:border-indigo-400 transition-all duration-300 hover:shadow-md group">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Level 02</span>
                          <span className="px-2 py-0.5 text-[9px] font-bold bg-slate-100 dark:bg-slate-850 text-slate-500 dark:text-slate-400 rounded-full uppercase">Advanced</span>
                        </div>
                        <h3 className="text-white font-bold text-base sm:text-lg font-display group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          Systems Training
                        </h3>
                        <p className="text-slate-550 dark:text-slate-400 text-xs font-light leading-relaxed">
                          Turn theory into running machines. Deep-dive operational systems training of digital business, covering live triggers, WhatsApp API routing, webhook data syncs, and custom middleware automations.
                        </p>
                        <div className="space-y-1.5 pt-2">
                          <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wide">Skills Acquired:</div>
                          <ul className="text-slate-500 dark:text-slate-350 text-[11px] space-y-1">
                            <li className="flex items-center gap-1">✓ Make.com & Zapier Workflows</li>
                            <li className="flex items-center gap-1">✓ Real-time CRM Syncing</li>
                            <li className="flex items-center gap-1">✓ Dynamic Lead Scoring Setup</li>
                          </ul>
                        </div>
                      </div>
                      <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Unlockable after L1</span>
                        </div>
                        <a
                          href="/contact?level=l2"
                          className="w-full text-center block px-4 py-3 text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl uppercase tracking-wider transition-all duration-300"
                        >
                          Request Systems Syllabus
                        </a>
                      </div>
                    </div>

                    {/* L2.5 Card */}
                    <div className="glass-panel border-indigo-200 dark:border-indigo-900 bg-white/70 dark:bg-slate-900/50 rounded-3xl p-6 flex flex-col justify-between relative hover:border-indigo-600 dark:hover:border-indigo-400 transition-all duration-300 hover:shadow-md group">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">Level 02.5</span>
                          <span className="px-2 py-0.5 text-[9px] font-bold bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 rounded-full uppercase">30-Day Sprint</span>
                        </div>
                        <h3 className="text-white font-bold text-base sm:text-lg font-display group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          Systems Accelerator
                        </h3>
                        <p className="text-slate-550 dark:text-slate-400 text-xs font-light leading-relaxed">
                          For small business owners and scaling experts. A fast-tracked cohort program to implement, audit, and launch your automation pipeline in 30 days.
                        </p>
                        <div className="space-y-1.5 pt-2">
                          <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wide">Cohort Scope:</div>
                          <ul className="text-slate-500 dark:text-slate-350 text-[11px] space-y-1">
                            <li className="flex items-center gap-1">✓ 30-Day Implementation sprint</li>
                            <li className="flex items-center gap-1">✓ Live webhook & automation builds</li>
                            <li className="flex items-center gap-1">✓ Private Slack pipeline channel</li>
                            <li className="flex items-center gap-1">✓ Custom middleware mapping templates</li>
                          </ul>
                        </div>
                      </div>
                      <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl font-bold font-display text-white">Rs. 49,999</span>
                          <span className="text-slate-450 dark:text-slate-500 text-[10px] line-through">Rs. 99,999</span>
                        </div>
                        <a
                          href="/contact?level=l2_5"
                          className="w-full text-center block px-4 py-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl uppercase tracking-wider transition-all duration-300"
                        >
                          Join Accelerator Sprint
                        </a>
                      </div>
                    </div>

                    {/* L3 Card */}
                    <div className="glass-panel border-indigo-200 dark:border-indigo-900 bg-white/70 dark:bg-slate-900/50 rounded-3xl p-6 flex flex-col justify-between relative hover:border-indigo-600 dark:hover:border-indigo-400 transition-all duration-300 hover:shadow-md group">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">Level 03</span>
                          <span className="px-2 py-0.5 text-[9px] font-bold bg-indigo-600/10 text-indigo-600 dark:text-indigo-455 rounded-full uppercase tracking-wider">Qualified Only</span>
                        </div>
                        <h3 className="text-white font-bold text-base sm:text-lg font-display group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          Live Quantum Group
                        </h3>
                        <p className="text-slate-555 dark:text-slate-405 text-xs font-light leading-relaxed">
                          Our highest level implementation tier. Strictly reserved for qualified business owners ready to scale operations. Can attend our elite weekly mastermind sessions.
                        </p>
                        <div className="space-y-1.5 pt-2">
                          <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wide">Elite Access Benefits:</div>
                          <ul className="text-slate-505 dark:text-slate-355 text-[11px] space-y-1">
                            <li className="flex items-center gap-1">★ Weekly Live Mastermind Calls</li>
                            <li className="flex items-center gap-1">★ Direct Systems Audits with Swapnil</li>
                            <li className="flex items-center gap-1">★ Private CEO Slack Channel Access</li>
                          </ul>
                        </div>
                      </div>
                      <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 font-display">Weekly Mastermind</span>
                        </div>
                        <a
                          href="/contact?level=l3"
                          className="w-full text-center block px-4 py-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl uppercase tracking-wider transition-all duration-300 animate-pulse"
                        >
                          Apply for Mastermind
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
