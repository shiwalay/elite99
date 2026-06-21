"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ArrowRight,
  TrendingUp,
  Cpu,
  Award,
  FileText
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  cta?: {
    text: string;
    link: string;
    icon?: "calendar" | "play" | "download" | "arrow";
  };
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Chat with Welcome Message
  useEffect(() => {
    setMessages([
      {
        id: "msg_welcome",
        role: "assistant",
        content: "Hello! I am Swapnil's AI Growth Advisor. I can help you identify business scaling bottlenecks, automate your workflows, or design a high-authority personal brand stack. What would you like to achieve today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // GOS Score Increment Helper
  const incrementGOSScore = (points: number, reason: string) => {
    const saved = localStorage.getItem("gos_visitor_profile");
    if (saved) {
      try {
        const profile = JSON.parse(saved);
        profile.score = (profile.score || 0) + points;
        localStorage.setItem("gos_visitor_profile", JSON.stringify(profile));
        
        // Log GOS event
        const events = localStorage.getItem("gos_events_log");
        let arr = [];
        if (events) arr = JSON.parse(events);
        arr.unshift({
          timestamp: new Date().toLocaleTimeString(),
          type: "Chatbot Interaction",
          path: window.location.pathname,
          details: reason
        });
        localStorage.setItem("gos_events_log", JSON.stringify(arr.slice(0, 100)));

        // Dispatch update
        const event = new CustomEvent("gos_profile_updated", { detail: profile });
        window.dispatchEvent(event);
      } catch (e) {}
    }
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    // Grant GOS points for engagement once per session
    if (!sessionStorage.getItem("gos_chat_engaged")) {
      sessionStorage.setItem("gos_chat_engaged", "true");
      incrementGOSScore(5, "Engaged with AI Chatbot bubble");
    }
  };

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: "user_" + Date.now(),
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsTyping(true);
    incrementGOSScore(10, `Asked question: "${textToSend.substring(0, 40)}"`);

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateAIResponse(textToSend);
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 1200);
  };

  const generateAIResponse = (input: string): Message => {
    const text = input.toLowerCase();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const id = "ai_" + Date.now();

    // 1. SCALING & REVENUE
    if (
      text.includes("revenue") ||
      text.includes("mrr") ||
      text.includes("scale") ||
      text.includes("grow") ||
      text.includes("business") ||
      text.includes("pricing") ||
      text.includes("client") ||
      text.includes("high-ticket") ||
      text.includes("consulting")
    ) {
      return {
        id,
        role: "assistant",
        content: "To scale your consulting or digital business, you must transition from hourly commoditized services to a high-ticket proprietary signature framework. By building direct qualification filters, you ensure you only speak with premium clients. Let's schedule a Strategy Session to map out your architecture.",
        timestamp,
        cta: {
          text: "Apply for Strategy Call",
          link: "/contact",
          icon: "calendar"
        }
      };
    }

    // 2. AUTOMATION & SYSTEMS
    if (
      text.includes("automate") ||
      text.includes("automation") ||
      text.includes("make") ||
      text.includes("zapier") ||
      text.includes("crm") ||
      text.includes("hubspot") ||
      text.includes("system") ||
      text.includes("middleware") ||
      text.includes("webhook") ||
      text.includes("email")
    ) {
      return {
        id,
        role: "assistant",
        content: "Automated operations are the backbone of a modern business. By building API integrations using Make.com or Zapier, you can capture leads, score them statefully, route them to priority schedulers, and update your CRM automatically without wasting 15+ hours weekly. Watch our 15-minute systems masterclass to see this live.",
        timestamp,
        cta: {
          text: "Watch Systems Masterclass",
          link: "/masterclass",
          icon: "play"
        }
      };
    }

    // 3. PERSONAL BRAND & AUTHORITY
    if (
      text.includes("brand") ||
      text.includes("authority") ||
      text.includes("linkedin") ||
      text.includes("content") ||
      text.includes("writer") ||
      text.includes("copy") ||
      text.includes("articles") ||
      text.includes("seo") ||
      text.includes("voice")
    ) {
      return {
        id,
        role: "assistant",
        content: "A premium personal brand is the ultimate moat. Instead of chasing referrals, you can package your unique IP into authority-driven pillar content that ranks on search engines and pre-sells your value. Check out our free Personal Brand Blueprint in the Resource Vault to get profile templates.",
        timestamp,
        cta: {
          text: "Get Brand Blueprint",
          link: "/resources",
          icon: "download"
        }
      };
    }

    // 4. CHECKLIST / AUDIT
    if (
      text.includes("checklist") ||
      text.includes("audit") ||
      text.includes("scorecard") ||
      text.includes("pdf") ||
      text.includes("sheet") ||
      text.includes("download") ||
      text.includes("free")
    ) {
      return {
        id,
        role: "assistant",
        content: "Our 25-Point Business Growth Checklist is the exact worksheet Swapnil Shiwalay uses to analyze traffic assets, qualification pipelines, operations middleware, and client retention funnels. Download it directly from the resources section.",
        timestamp,
        cta: {
          text: "Download Checklist PDF",
          link: "/resources",
          icon: "download"
        }
      };
    }

    // 5. ABOUT SWAPNIL
    if (
      text.includes("swapnil") ||
      text.includes("shiwalay") ||
      text.includes("who is") ||
      text.includes("background") ||
      text.includes("experience")
    ) {
      return {
        id,
        role: "assistant",
        content: "Swapnil Shiwalay is a digital business architect and AI growth consultant with 20+ years of operational experience. He has helped deliver over 2,000+ digital applications and packages knowledge assets for global companies and subject matter experts. Learn more about his roadmap here.",
        timestamp,
        cta: {
          text: "Read About Swapnil",
          link: "/about",
          icon: "arrow"
        }
      };
    }

    // DEFAULT RESPONSE
    return {
      id,
      role: "assistant",
      content: "That is a great query. Building a sustainable digital education or consulting practice requires aligning a high-authority personal brand with automated marketing systems. To see how these components connect in real time, I highly recommend watching our masterclass or booking an advisory diagnostics session.",
      timestamp,
      cta: {
        text: "Apply for Strategy Call",
        link: "/contact",
        icon: "calendar"
      }
    };
  };

  const getCtaIcon = (iconName?: string) => {
    switch (iconName) {
      case "calendar":
        return <TrendingUp className="h-3 w-3 shrink-0" />;
      case "play":
        return <Bot className="h-3 w-3 shrink-0" />;
      case "download":
        return <FileText className="h-3 w-3 shrink-0" />;
      default:
        return <ArrowRight className="h-3 w-3 shrink-0" />;
    }
  };

  return (
    <>
      {/* 1. CHAT BUBBLE TRIGGER */}
      {!isOpen && (
        <button
          onClick={handleOpenChat}
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-br from-[#f3e5ab] to-[#d4af37] text-[#030a16] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group"
          aria-label="Open AI Growth Assistant"
        >
          <MessageSquare className="h-6 w-6 group-hover:rotate-6 transition-transform" />
          <span className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-green-500 border-2 border-[#020813] rounded-full animate-pulse" />
        </button>
      )}

      {/* 2. CHAT WINDOW */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[350px] sm:w-[380px] h-[500px] rounded-2xl glass-panel border-[#d4af37]/35 shadow-2xl flex flex-col overflow-hidden animate-slide-up bg-[#020813]/95">
          {/* Header */}
          <div className="bg-[#030a16] border-b border-[#d4af37]/15 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#f3e5ab] to-[#d4af37] flex items-center justify-center shadow-lg">
                <Sparkles className="h-4.5 w-4.5 text-[#030a16]" />
              </div>
              <div>
                <h3 className="text-white text-xs font-bold font-display uppercase tracking-wider">AI Growth Advisor</h3>
                <p className="text-green-400 text-[9px] flex items-center gap-1 font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                  Online • Score Driver Active
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="h-6 w-6 rounded bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] border border-[#d4af37]/25 shrink-0 mt-1">
                    <Sparkles className="h-3 w-3" />
                  </div>
                )}
                
                <div className="space-y-1.5 max-w-[80%]">
                  <div
                    className={`rounded-xl px-3 py-2.5 text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#d4af37] text-[#030a16] font-medium rounded-tr-none"
                        : "bg-slate-900/60 border border-slate-800/80 text-slate-200 rounded-tl-none font-light"
                    }`}
                  >
                    {msg.content}
                  </div>

                  {/* Dynamic CTA button for assistant message */}
                  {msg.role === "assistant" && msg.cta && (
                    <div className="pt-1">
                      <Link
                        href={msg.cta.link}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#d4af37]/15 border border-[#d4af37]/45 text-[#f3e5ab] hover:bg-[#d4af37]/25 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-300"
                      >
                        {msg.cta.text}
                        {getCtaIcon(msg.cta.icon)}
                      </Link>
                    </div>
                  )}

                  <p className={`text-[8px] text-slate-500 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                    {msg.timestamp}
                  </p>
                </div>

                {msg.role === "user" && (
                  <div className="h-6 w-6 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 shrink-0 mt-1">
                    <User className="h-3 w-3" />
                  </div>
                )}
              </div>
            ))}

            {/* AI Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2.5 justify-start">
                <div className="h-6 w-6 rounded bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] border border-[#d4af37]/25 shrink-0">
                  <Sparkles className="h-3 w-3" />
                </div>
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl rounded-tl-none px-3 py-2 text-xs text-slate-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick CTAs Footer (Show context buttons) */}
          <div className="px-4 py-2 bg-[#030a16]/40 border-t border-slate-900/60 flex gap-1.5 flex-wrap">
            <button
              onClick={() => handleSendMessage("Scale my business revenue")}
              className="text-[9px] font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-2 py-1 rounded-md border border-slate-800/85 transition-colors cursor-pointer"
            >
              Scale Revenue
            </button>
            <button
              onClick={() => handleSendMessage("Automate my operations")}
              className="text-[9px] font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-2 py-1 rounded-md border border-slate-800/85 transition-colors cursor-pointer"
            >
              Automate systems
            </button>
            <button
              onClick={() => handleSendMessage("Build a personal brand")}
              className="text-[9px] font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-2 py-1 rounded-md border border-slate-800/85 transition-colors cursor-pointer"
            >
              Personal brand
            </button>
            <button
              onClick={() => handleSendMessage("Get Free Growth Checklist")}
              className="text-[9px] font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-2 py-1 rounded-md border border-slate-800/85 transition-colors cursor-pointer"
            >
              Get Checklist
            </button>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputMessage);
            }}
            className="p-3 bg-[#030a16] border-t border-[#d4af37]/15 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask anything about digital growth..."
              className="flex-grow bg-[#050e1c] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d4af37]"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="h-8 w-8 rounded-lg bg-gradient-to-r from-[#f3e5ab] to-[#d4af37] text-[#030a16] flex items-center justify-center hover:shadow-[0_0_10px_rgba(212,175,55,0.3)] disabled:opacity-40 transition-all cursor-pointer shrink-0"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
