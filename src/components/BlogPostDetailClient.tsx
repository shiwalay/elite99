"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Sparkles, CheckCircle, Share2, ThumbsUp, Bookmark, Copy, Award } from "lucide-react";

interface PostContent {
  title: string;
  category: string;
  date: string;
  readTime: string;
  introduction: string;
  sections: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
  conclusion: string;
  featuredImage?: string;
  content?: string;
}

interface Post {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime?: string;
  content?: string;
  status?: string;
  featured?: boolean;
  featuredImage?: string;
}

export default function BlogPostDetailClient({
  slug,
  post,
  relatedPosts,
}: {
  slug: string;
  post: PostContent;
  relatedPosts: Post[];
}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [claps, setClaps] = useState(0);
  const [hasClapped, setHasClapped] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Calculate scroll progress
  useEffect(() => {
    let lastProgress = 0;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
          if (totalScroll > 0) {
            const currentProgress = Math.round((window.scrollY / totalScroll) * 100);
            if (currentProgress !== lastProgress) {
              lastProgress = currentProgress;
              setScrollProgress(currentProgress);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load bookmark state
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("blog_bookmarks");
    if (savedBookmarks) {
      try {
        const arr = JSON.parse(savedBookmarks);
        setIsBookmarked(arr.includes(slug));
      } catch (e) {}
    }
  }, [slug]);

  const toggleBookmark = () => {
    const savedBookmarks = localStorage.getItem("blog_bookmarks");
    let arr = [];
    if (savedBookmarks) {
      try {
        arr = JSON.parse(savedBookmarks);
      } catch (e) {}
    }
    
    let updated;
    if (arr.includes(slug)) {
      updated = arr.filter((s: string) => s !== slug);
      setIsBookmarked(false);
    } else {
      updated = [...arr, slug];
      setIsBookmarked(true);
    }
    localStorage.setItem("blog_bookmarks", JSON.stringify(updated));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };

  const handleClap = () => {
    if (claps < 50) {
      setClaps(prev => prev + 1);
      setHasClapped(true);
    }
  };

  // Custom visual markdown elements parser
  const renderParagraph = (text: string, pIdx: number) => {
    const trimmed = text.trim();
    
    // 1. Filter out SEO Brief Block
    if (
      trimmed.startsWith("[SEO BRIEF]") || 
      trimmed.startsWith("- **Primary Keyword**") || 
      trimmed.startsWith("- **Secondary Keywords**") || 
      trimmed.startsWith("- **Search Intent**") || 
      trimmed.startsWith("- **Meta Title**") || 
      trimmed.startsWith("- **Meta Description**") || 
      trimmed.startsWith("- **Featured Snippet Opportunity**") || 
      trimmed.startsWith("- **Internal Linking Suggestions**") || 
      trimmed.startsWith("- **Social Media Snippets**") ||
      trimmed.includes("Primary Keyword") ||
      trimmed.includes("Search Intent")
    ) {
      return null;
    }
    if (trimmed.startsWith("---") && pIdx < 3) {
      return null;
    }
    
    // 2. Headings
    if (trimmed.startsWith("# ")) {
      return null; // Title is rendered dynamically at the top
    }
    if (trimmed.startsWith("## ")) {
      return (
        <h2 key={pIdx} className="text-2xl sm:text-3xl font-bold font-display text-white mt-12 mb-4 tracking-wide border-b border-slate-900 pb-2">
          {trimmed.replace("## ", "")}
        </h2>
      );
    }
    if (trimmed.startsWith("### ")) {
      return (
        <h3 key={pIdx} className="text-xl sm:text-2xl font-bold font-display text-white mt-8 mb-3">
          {trimmed.replace("### ", "")}
        </h3>
      );
    }

    // 3. Alerts & Blockquotes
    if (trimmed.startsWith("> [!TIP]") || trimmed.startsWith("> [!IMPORTANT]") || trimmed.startsWith("> [!NOTE]")) {
      const cleanQuote = trimmed
        .replace(/> \[\!(TIP|IMPORTANT|NOTE)\]\n?/g, "")
        .replace(/> /g, "");
      return (
        <blockquote key={pIdx} className="p-6 bg-[#050e1c]/80 border-l-4 border-[#d4af37] rounded-r-xl my-8 text-slate-300 italic text-sm sm:text-base leading-relaxed">
          {cleanQuote}
        </blockquote>
      );
    }
    if (trimmed.startsWith(">")) {
      return (
        <blockquote key={pIdx} className="border-l-4 border-slate-800 pl-4 py-1 italic text-slate-400 my-6">
          {trimmed.replace(/^>\s*/g, "")}
        </blockquote>
      );
    }

    // 4. Code schematic boxes
    if (trimmed.startsWith("```")) {
      const codeLines = trimmed.split("\n").filter(line => !line.startsWith("```"));
      return (
        <pre key={pIdx} className="p-5 bg-[#020813] border border-slate-900 rounded-xl overflow-x-auto my-6 text-xs sm:text-sm font-mono text-slate-350 leading-normal scrollbar-thin">
          <code>{codeLines.join("\n")}</code>
        </pre>
      );
    }

    // 5. Comparison matrices tables
    if (trimmed.startsWith("|")) {
      const rows = trimmed.split("\n").map(r => r.split("|").map(c => c.trim()).filter(c => c !== ""));
      if (rows.length < 2) return null;
      
      const dataRows = rows.filter(r => !r[0]?.startsWith("---") && !r[0]?.startsWith(" :---"));
      const headers = dataRows[0];
      const body = dataRows.slice(1);

      return (
        <div key={pIdx} className="my-8 overflow-x-auto border border-slate-900 rounded-xl">
          <table className="min-w-full divide-y divide-slate-900 text-sm">
            <thead className="bg-[#050e1c]">
              <tr>
                {headers.map((h, i) => (
                  <th key={i} className="px-4 py-3 text-left font-semibold text-white uppercase tracking-wider text-xs">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-950 bg-[#030a16]/40">
              {body.map((row, rI) => (
                <tr key={rI} className="hover:bg-slate-950/20">
                  {row.map((cell, cI) => (
                    <td key={cI} className="px-4 py-3 text-slate-300 font-light">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    // 6. Visual blueprint diagrams
    if (trimmed.startsWith("![")) {
      const altMatch = trimmed.match(/!\[(.*?)\]/);
      const urlMatch = trimmed.match(/\((.*?)\)/);
      if (urlMatch) {
        return (
          <div key={pIdx} className="my-8 space-y-2">
            <div className="relative w-full rounded-2xl overflow-hidden border border-slate-900 shadow-lg bg-slate-950">
              <img src={urlMatch[1]} alt={altMatch ? altMatch[1] : "Blueprint"} className="w-full h-auto max-h-[480px] object-cover" />
            </div>
            {altMatch && (
              <p className="text-center text-xs text-slate-550 font-light italic">
                {altMatch[1]}
              </p>
            )}
          </div>
        );
      }
    }

    // 7. Lists
    if (trimmed.startsWith("- [ ]") || trimmed.startsWith("- [x]") || trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const items = trimmed.split("\n").map(item => {
        return item.replace(/^-\s*\[\s*[ x]?\s*\]\s*/g, "").replace(/^-\s*/g, "").replace(/^\*\s*/g, "");
      });
      return (
        <ul key={pIdx} className="space-y-3 my-6 pl-5 list-disc text-slate-350">
          {items.map((item, iI) => (
            <li key={iI} className="leading-relaxed font-light text-base sm:text-[18px]">
              {item}
            </li>
          ))}
        </ul>
      );
    }

    // 8. Normal text paragraph
    return (
      <p key={pIdx} className="text-slate-305 text-base sm:text-[18px] leading-[1.8] font-light my-6 tracking-wide">
        {trimmed}
      </p>
    );
  };

  const rawParagraphs = post.content ? post.content.split("\n\n").filter(p => p.trim().length > 0) : [];

  return (
    <div className="py-12 pb-20 relative">
      
      {/* Sticky top scroll indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-950 z-50">
        <div 
          className="h-full bg-gradient-to-r from-[#f3e5ab] to-[#d4af37] transition-all duration-100" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* BREADCRUMB & NAVIGATION BAR */}
      <div className="max-w-[720px] mx-auto px-4 sm:px-0 mb-8 flex items-center justify-between">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-[#d4af37] transition-colors uppercase tracking-wider font-semibold"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Insights
        </Link>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-650 font-medium">
          <span>Home</span>
          <span>/</span>
          <span>Insights</span>
          <span>/</span>
          <span className="text-[#d4af37]">{post.category}</span>
        </div>
      </div>

      {/* ELEGANT MEDIUM HEADER */}
      <header className="max-w-[720px] mx-auto px-4 sm:px-0 space-y-6 pb-6">
        
        {/* Category Badge */}
        <span className="px-2.5 py-0.5 bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-[10px] font-bold rounded uppercase tracking-wider">
          {post.category}
        </span>

        {/* Large title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display gold-gradient-text pb-1 leading-tight tracking-tight">
          {post.title}
        </h1>

        {/* Author details block */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-y border-slate-900/60 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full overflow-hidden border border-[#d4af37]/35 shadow-md">
              <img
                src="/swapnil_hero.png"
                alt="Swapnil Shiwalay"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">Swapnil Shiwalay</span>
                <span className="text-slate-600">&middot;</span>
                <button className="text-[10px] font-bold text-[#d4af37] hover:text-[#f3e5ab] uppercase tracking-wider cursor-pointer">Follow</button>
              </div>
              <p className="text-slate-550 text-[11px] font-medium">Systems Architect &amp; AI Consultant &middot; <span className="font-mono">{post.date}</span></p>
            </div>
          </div>

          {/* Social shares and bookmarks */}
          <div className="flex items-center gap-4 text-slate-500">
            <span className="text-xs font-mono">{post.readTime}</span>
            <span className="text-slate-800">|</span>
            <button onClick={handleCopyLink} className="hover:text-white transition-colors cursor-pointer" title="Copy Link">
              <Share2 className="h-4 w-4" />
            </button>
            <a href="https://linkedin.com" target="_blank" rel="noopener" className="hover:text-white transition-colors" title="Share on LinkedIn">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <button onClick={toggleBookmark} className="hover:text-amber-500 transition-colors cursor-pointer" title="Bookmark Story">
              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
            </button>
            {shareCopied && (
              <span className="text-[10px] text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-900/30">Link Copied!</span>
            )}
          </div>
        </div>
      </header>

      {/* FEATURED BANNER PICTURE */}
      {post.featuredImage && (
        <div className="max-w-[840px] mx-auto px-4 sm:px-0 my-8">
          <div className="relative w-full rounded-2xl overflow-hidden border border-slate-900 shadow-xl bg-slate-950 aspect-[21/9]">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* ARTICLE BODY COLUMN */}
      <article className="max-w-[720px] mx-auto px-4 sm:px-0 text-slate-200">
        
        {/* Introduction */}
        {post.introduction && (
          <p className="text-white font-medium text-lg border-l-2 border-[#d4af37] pl-4 italic my-6 leading-relaxed">
            {post.introduction}
          </p>
        )}

        {/* Dynamic Markdown Render paragraphs */}
        {rawParagraphs.length > 0 ? (
          rawParagraphs.map((para, pIdx) => renderParagraph(para, pIdx))
        ) : (
          post.sections.map((sec, idx) => (
            <div key={idx} className="space-y-4 pt-4 text-left">
              {sec.heading && (
                <h2 className="text-2xl font-bold font-display text-white mt-8 mb-3">
                  {sec.heading}
                </h2>
              )}
              {sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-slate-300 text-base leading-relaxed my-4">{p}</p>
              ))}
              {sec.bullets && (
                <ul className="space-y-2 pl-5 list-disc text-slate-350">
                  {sec.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))
        )}

        {/* Conclusion section summary */}
        <div className="pt-8 border-t border-slate-900 mt-12 space-y-3 bg-[#050e1c]/45 p-6 rounded-2xl border border-slate-900/60 text-left">
          <h3 className="text-white font-semibold text-lg flex items-center gap-2 font-display">
            <Sparkles className="h-5 w-5 text-[#d4af37]" /> Key Summary takeaway
          </h3>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
            {post.conclusion}
          </p>
        </div>

        {/* CLAP & SHARE ACTION FOOTER BAR */}
        <div className="flex items-center justify-between border-y border-slate-900/65 py-4 my-10 text-slate-500">
          <div className="flex items-center gap-6">
            <button 
              onClick={handleClap} 
              className={`flex items-center gap-2 hover:text-[#d4af37] transition-all cursor-pointer ${hasClapped ? 'text-[#d4af37] scale-105' : ''}`}
              title="Clap for this post"
            >
              <ThumbsUp className="h-4.5 w-4.5" />
              <span className="text-xs font-mono font-semibold">{claps} claps</span>
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={toggleBookmark} className="hover:text-white transition-colors cursor-pointer" title="Bookmark story">
              <Bookmark className={`h-4.5 w-4.5 ${isBookmarked ? 'fill-[#d4af37] text-[#d4af37]' : ''}`} />
            </button>
            <button onClick={handleCopyLink} className="hover:text-white transition-colors cursor-pointer" title="Share story link">
              <Share2 className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>

        {/* AUTHOR PROFILE END CARD */}
        <div className="glass-panel border-slate-800 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#050e1c] to-[#02070f] flex flex-col sm:flex-row gap-6 items-center my-12 text-left">
          <div className="h-20 w-20 rounded-full overflow-hidden border border-[#d4af37]/35 shadow-lg shrink-0">
            <img
              src="/swapnil_hero.png"
              alt="Swapnil Shiwalay"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="space-y-3 text-center sm:text-left flex-grow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h4 className="text-white font-bold text-lg font-display">Written by Swapnil Shiwalay</h4>
              <Link href="/about" className="text-xs font-bold text-[#d4af37] hover:underline">View Profile</Link>
            </div>
            <p className="text-slate-450 text-xs sm:text-sm leading-relaxed font-light">
              For 20+ years, Swapnil has designed digital architectures. He specializes in packaging proprietary expert frameworks and launching low-code automation webhooks.
            </p>
            <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-4">
              <Link 
                href="/contact" 
                className="px-4 py-2 bg-[#d4af37] hover:bg-[#dfc176] text-[#030a16] font-bold text-xs uppercase tracking-wider rounded transition-all duration-300 font-semibold"
              >
                Apply for Strategy Session
              </Link>
            </div>
          </div>
        </div>

      </article>

      {/* RECOMMENDED READS SECTION */}
      {relatedPosts.length > 0 && (
        <section className="bg-[#020813] border-t border-slate-900 py-16 mt-16">
          <div className="max-w-[720px] mx-auto px-4 sm:px-0 space-y-8">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase border-l-2 border-[#d4af37] pl-3 text-left">
              Recommended from SwapnilOnline
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rPost) => (
                <div key={rPost.slug} className="glass-panel border-slate-900 hover:border-slate-800 p-5 rounded-xl flex flex-col justify-between space-y-4 group text-left">
                  <div className="space-y-2">
                    {rPost.featuredImage && (
                      <div className="relative w-full h-32 overflow-hidden rounded-lg mb-2">
                        <img src={rPost.featuredImage} alt={rPost.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102" />
                      </div>
                    )}
                    <span className="text-[10px] uppercase text-[#d4af37] font-bold tracking-wider">{rPost.category}</span>
                    <Link href={`/blog/${rPost.slug}`} className="block">
                      <h5 className="text-white font-bold text-base group-hover:text-[#d4af37] transition-colors leading-snug line-clamp-2">{rPost.title}</h5>
                    </Link>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-950/60 text-[11px] text-slate-500">
                    <span className="font-mono">{rPost.date}</span>
                    <Link href={`/blog/${rPost.slug}`} className="text-[#d4af37] font-bold hover:underline">Read &rarr;</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
