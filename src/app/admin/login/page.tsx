"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Layers,
  Lock,
  User,
  RefreshCw,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  Globe,
  Settings,
  Sun,
  Moon,
} from "lucide-react";
import { useAdminTheme } from "@/components/AdminThemeContext";

export default function AdminLoginPage() {
  const { theme, toggleTheme } = useAdminTheme();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Generate random captcha
  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Removed ambiguous characters like 0, O, I, 1
    let code = "";
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setCaptchaInput("");
  };

  useEffect(() => {
    generateCaptcha();
    
    // Clear any previous authentication state
    localStorage.removeItem("admin_authenticated");
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    // Verify Captcha
    if (captchaInput.toUpperCase() !== captchaCode) {
      setErrorMsg("Security Verification Code (Captcha) is incorrect.");
      generateCaptcha();
      return;
    }

    // Load actual password from settings or use default
    const savedPassword = localStorage.getItem("admin_password") || "Shiwalay$9393";
    const savedEmail = "shiwalay@gmail.com";

    setIsLoading(true);

    setTimeout(() => {
      if (email.toLowerCase() === savedEmail && password === savedPassword) {
        setSuccessMsg("Credentials authorized. Redirecting...");
        localStorage.setItem("admin_authenticated", "true");
        setTimeout(() => {
          router.push("/admin");
        }, 800);
      } else {
        setErrorMsg("Invalid administrative email address or password.");
        setIsLoading(false);
        generateCaptcha();
      }
    }, 1200);
  };

  const cmsLinks = [
    { name: "Website Home", href: "/" },
    { name: "About Founder", href: "/about" },
    { name: "Advisory Services", href: "/services" },
    { name: "Masterclass", href: "/masterclass" },
    { name: "CMS Insights", href: "/blog" },
    { name: "Resources Library", href: "/resources" },
    { name: "Qualifying Contact", href: "/contact" },
  ];

  return (
    <div className={`min-h-screen flex flex-col justify-between transition-colors duration-300 ${
      theme === "light" ? "light bg-slate-50 text-slate-900" : "dark bg-slate-950 text-slate-100"
    }`}>
      
      {/* 1. SEPARATE HEADER */}
      <header className="bg-white/80 dark:bg-[#020813]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-4 px-6 sm:px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 w-full">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="h-9 w-9 rounded-xl bg-indigo-600 dark:bg-indigo-600 flex items-center justify-center text-white">
              <Layers className="h-4.5 w-4.5 text-white" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold tracking-wider text-slate-900 dark:text-white uppercase leading-none">
                SWAPNIL
              </span>
              <span className="text-[10px] font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mt-0.5">
                ADMIN CONSOLE
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            {/* CMS Link Options */}
            <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-550 dark:text-slate-450">
              {cmsLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg border transition-all duration-200 cursor-pointer flex items-center justify-center h-9 w-9 ${
                theme === "light" 
                  ? "bg-white hover:bg-slate-50 border-slate-200 text-slate-650 shadow-2xs" 
                  : "bg-slate-950 hover:bg-slate-900 border-slate-900 text-slate-400 hover:text-white"
              }`}
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            >
              {theme === "dark" ? <Sun className="h-4 w-4 text-indigo-400" /> : <Moon className="h-4 w-4 text-indigo-600" />}
            </button>
          </div>
        </div>
      </header>

      {/* 2. LOGIN CONTENT */}
      <main className="flex-grow flex items-center justify-center px-4 py-12 relative overflow-hidden tech-grid-bg">
        {/* Background Gradients */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="w-full max-w-md relative z-10">
          <div className="glass-panel border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 p-8 rounded-3xl space-y-6 text-left shadow-lg">
            
            {/* Header Text */}
            <div className="text-center space-y-2">
              <div className="inline-flex h-12 w-12 rounded-2xl bg-indigo-600 dark:bg-indigo-600 text-white items-center justify-center shadow-sm mb-2">
                <Lock className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">Console Authorization</h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-light">
                Provide credentials and complete visual verification to access ecosystem backend.
              </p>
            </div>

            {/* Error or Success Messages */}
            {errorMsg && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-650 dark:text-rose-400 p-3.5 rounded-xl text-xs flex items-start gap-2">
                <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}
            {successMsg && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-650 dark:text-emerald-400 p-3.5 rounded-xl text-xs flex items-start gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5 animate-ping shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Admin Email</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-450 dark:text-slate-500" />
                  <input
                    type="email"
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-600 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Credentials Token (Password)</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-450 dark:text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-10 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-600 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-650 dark:hover:text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                  </button>
                </div>
              </div>

              {/* CAPTCHA SECTION */}
              <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-800/80">
                <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Security Captcha</label>
                
                <div className="flex items-center gap-3">
                  {/* Captcha Display Panel */}
                  <div className="flex-grow select-none relative h-11 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center overflow-hidden">
                    {/* Skewed Canvas lines background simulation */}
                    <div className="absolute inset-0 opacity-15 pointer-events-none">
                      <div className="absolute w-full h-[1px] bg-slate-400 dark:bg-white top-2 rotate-[4deg]" />
                      <div className="absolute w-full h-[1px] bg-slate-400 dark:bg-white top-5 -rotate-[6deg]" />
                      <div className="absolute w-full h-[1px] bg-indigo-600 dark:bg-indigo-400 top-7 rotate-[12deg]" />
                    </div>
                    {/* Alphanumeric skewed characters */}
                    <span 
                      className="font-mono text-base font-bold tracking-widest text-indigo-600 dark:text-indigo-400 select-none skew-x-12 skew-y-3"
                      style={{ textShadow: "0 0 8px rgba(79,70,229,0.3)" }}
                    >
                      {captchaCode}
                    </span>
                  </div>

                  {/* Reload button */}
                  <button
                    type="button"
                    onClick={generateCaptcha}
                    className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-650 dark:hover:text-white transition-colors cursor-pointer"
                    title="Reload security image"
                  >
                    <RefreshCw className="h-4.5 w-4.5" />
                  </button>
                </div>

                {/* Input block */}
                <input
                  type="text"
                  placeholder="Enter 5-character Captcha"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  required
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white uppercase text-center tracking-widest focus:outline-none focus:border-indigo-600 transition-all font-mono"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all cursor-pointer flex items-center justify-center text-xs uppercase tracking-widest shadow-xs disabled:opacity-50 mt-4"
              >
                {isLoading ? "Verifying..." : "Authorize Credentials"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>

            </form>

            {/* Help guidelines */}
            <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-250 dark:border-slate-800/80">
              <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider block">System Access Credentials</span>
              <span className="text-[10px] text-slate-500 mt-1 block">
                User: <span className="font-mono text-slate-700 dark:text-slate-300">shiwalay@gmail.com</span> | Pass: <span className="font-mono text-slate-700 dark:text-slate-300">Shiwalay$9393</span>
              </span>
            </div>

          </div>
        </div>
      </main>

      {/* 3. SEPARATE FOOTER */}
      <footer className="bg-white/80 dark:bg-[#020813]/80 border-t border-slate-200 dark:border-slate-800 py-6 px-6 sm:px-8 text-center text-xs text-slate-550 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Swapnil Shiwalay. Operations Console. All rights reserved.</p>
          <div className="flex gap-4 text-slate-500 dark:text-slate-400 font-semibold">
            <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Return to Front Site</Link>
            <span>•</span>
            <Link href="/services" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Growth Consulting</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
