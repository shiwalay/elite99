"use client";

import { useState } from "react";
import { Sparkles, Send, Copy, Check, Lightbulb, ShieldCheck, RefreshCw } from "lucide-react";

interface AiResult {
  titles: string[];
  metaTitle: string;
  metaDesc: string;
  cta: string;
  intro: string;
}

export default function AiAssistantPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [result, setResult] = useState<AiResult | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setResult(null);

    // Mock AI generator simulation
    setTimeout(() => {
      setLoading(false);
      setResult({
        titles: [
          `How to Scale Your Advisory Brand Using ${prompt.trim()} systems`,
          `The Systems Blueprint: Integrating ${prompt.trim()} Into Business Workflows`,
          `Stop Trading Hours: Why ${prompt.trim()} Is the Future of Knowledge Monetization`,
        ],
        metaTitle: `Scaling With ${prompt.trim()} | Swapnil Shiwalay Advisory`,
        metaDesc: `Discover how subject matter experts can implement ${prompt.trim()} systems to automate lead capture, route qualification pipelines, and scale client contracts.`,
        cta: `Ready to deploy automated ${prompt.trim()} systems inside your business? Apply for a systems diagnostic strategy call today.`,
        intro: `In the digital economy, the single biggest limitation to scaling a professional consulting practice is not knowledge or client demand—it is administrative labor. By integrating structured ${prompt.trim()} systems into your day-to-side operations, you turn manual delivery bottlenecks into a compounding, self-sustaining digital business asset.`,
      });
    }, 1800);
  };

  const handleCopyText = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-5">
        <div>
          <h1 className="text-3xl font-bold font-display text-white">AI Content Assistant</h1>
          <p className="text-slate-400 text-sm mt-0.5">Generate high-converting blog drafts, SEO tags, and email copies.</p>
        </div>
      </div>

      {/* INPUT FORM PANEL */}
      <div className="glass-panel border-[#d4af37]/20 rounded-xl p-6 relative overflow-hidden">
        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-[#d4af37]" /> Input Core Topic or Key Niche
            </label>
            <textarea
              rows={2}
              required
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. AI automation workflows for coaching businesses / personal branding blueprints"
              className="w-full bg-[#050e1c] border border-slate-800 rounded-lg p-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#d4af37] text-sm resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto relative inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold tracking-wide text-[#030a16] bg-gradient-to-r from-[#f3e5ab] to-[#d4af37] rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 animate-spin" /> Compiling Systems Blueprints...
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                Generate Authority Copy <Send className="h-4 w-4" />
              </span>
            )}
          </button>
        </form>
      </div>

      {/* GENERATED RESULTS AREA */}
      {result && (
        <div className="space-y-6 animate-fade-in">
          {/* Suggested Titles */}
          <div className="glass-panel border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-white font-bold text-base font-display flex items-center gap-2 border-b border-slate-900 pb-2">
              <Lightbulb className="h-4 w-4 text-[#d4af37]" /> Suggested Authority Article Titles
            </h3>
            <div className="space-y-3 pt-1">
              {result.titles.map((title, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-900 p-3 rounded-lg flex items-center justify-between gap-4">
                  <p className="text-slate-200 text-xs sm:text-sm font-semibold leading-relaxed">{title}</p>
                  <button
                    onClick={() => handleCopyText(title, `title_${idx}`)}
                    className="text-slate-500 hover:text-indigo-400 cursor-pointer"
                  >
                    {copiedField === `title_${idx}` ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SEO Metadata */}
            <div className="glass-panel border-slate-800 rounded-xl p-5 space-y-4">
              <h3 className="text-white font-bold text-base font-display flex items-center gap-2 border-b border-slate-900 pb-2">
                SEO Metadata configuration
              </h3>
              <div className="space-y-4 pt-1 text-xs">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-slate-500 font-bold uppercase tracking-wider">
                    <span>Meta Title</span>
                    <button
                      onClick={() => handleCopyText(result.metaTitle, "metaTitle")}
                      className="hover:text-[#d4af37]"
                    >
                      {copiedField === "metaTitle" ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="bg-slate-950 border border-slate-900 p-2.5 rounded text-slate-350">{result.metaTitle}</div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-slate-500 font-bold uppercase tracking-wider">
                    <span>Meta Description</span>
                    <button
                      onClick={() => handleCopyText(result.metaDesc, "metaDesc")}
                      className="hover:text-[#d4af37]"
                    >
                      {copiedField === "metaDesc" ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="bg-slate-950 border border-slate-900 p-2.5 rounded text-slate-350 leading-relaxed">{result.metaDesc}</div>
                </div>
              </div>
            </div>

            {/* CTA copy */}
            <div className="glass-panel border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-white font-bold text-base font-display border-b border-slate-900 pb-2">
                  High-Conversion Call-To-Action (CTA) Copy
                </h3>
                <div className="bg-slate-950 border border-slate-900 p-3 rounded text-slate-300 text-xs sm:text-sm leading-relaxed italic">
                  &ldquo;{result.cta}&rdquo;
                </div>
              </div>
              <button
                onClick={() => handleCopyText(result.cta, "cta")}
                className="w-full py-2.5 border border-slate-900 hover:border-slate-800 text-xs font-bold text-slate-400 hover:text-white uppercase tracking-wider rounded-lg transition-colors cursor-pointer mt-4"
              >
                {copiedField === "cta" ? "Copied to Clipboard!" : "Copy CTA Copy"}
              </button>
            </div>
          </div>

          {/* Introductory Outline */}
          <div className="glass-panel border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-white font-bold text-base font-display flex items-center justify-between border-b border-slate-900 pb-2">
              <span>Authority Introduction Paragraph Outline</span>
              <button
                onClick={() => handleCopyText(result.intro, "intro")}
                className="text-slate-500 hover:text-indigo-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
              >
                {copiedField === "intro" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                Copy Outline
              </button>
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light pt-1">
              {result.intro}
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 justify-center">
            <ShieldCheck className="h-4 w-4" /> AI model output is generated locally. Fully custom, plagiarism-free.
          </div>
        </div>
      )}
    </div>
  );
}
