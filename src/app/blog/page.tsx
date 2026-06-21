"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Clock, ArrowRight, BookOpen, Calendar, Bookmark, Share2, Sparkles, ExternalLink, Award, Users } from "lucide-react";
import rawPosts from "@/data/posts.json";

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

const defaultPosts = rawPosts as Post[];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>(" ");
  const [posts, setPosts] = useState<Post[]>([]);
  const [bookmarkedSlugs, setBookmarkedSlugs] = useState<string[]>([]);
  const [shareSuccess, setShareSuccess] = useState<string | null>(null);

  // Sync state with client local storage
  useEffect(() => {
    // Initial load searchQuery space trick to prevent ssr mismatch
    setSearchQuery("");

    const saved = localStorage.getItem("cms_posts_data");
    const postsVersion = localStorage.getItem("cms_posts_version");
    const CURRENT_VERSION = "2.2";
    let loadedPosts = defaultPosts;

    if (saved && postsVersion === CURRENT_VERSION) {
      try {
        const parsed = JSON.parse(saved);
        loadedPosts = parsed;
      } catch (e) {
        loadedPosts = defaultPosts;
      }
    } else {
      localStorage.setItem("cms_posts_data", JSON.stringify(defaultPosts));
      localStorage.setItem("cms_posts_version", CURRENT_VERSION);
    }
    
    setPosts(loadedPosts.filter((p: Post) => p.status === "Published" || !p.status));

    // Load Bookmarks
    const savedBookmarks = localStorage.getItem("blog_bookmarks");
    if (savedBookmarks) {
      try {
        setBookmarkedSlugs(JSON.parse(savedBookmarks));
      } catch (e) {}
    }
  }, []);

  const categories = [
    "All",
    "AI",
    "Marketing",
    "Business Growth",
    "Personal Branding",
    "Entrepreneurship",
    "Digital Transformation",
  ];

  const getReadTime = (post: Post) => {
    if (post.readTime) return post.readTime;
    const words = post.content ? post.content.split(/\s+/).length : 0;
    if (words < 100) return "5 min read";
    return Math.ceil(words / 200) + " min read";
  };

  const toggleBookmark = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    let updated;
    if (bookmarkedSlugs.includes(slug)) {
      updated = bookmarkedSlugs.filter((s) => s !== slug);
    } else {
      updated = [...bookmarkedSlugs, slug];
    }
    setBookmarkedSlugs(updated);
    localStorage.setItem("blog_bookmarks", JSON.stringify(updated));
  };

  const handleCopyLink = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/blog/${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      setShareSuccess(slug);
      setTimeout(() => setShareSuccess(null), 2000);
    });
  };

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Trending posts list (Featured + popular based on ordering)
  const trendingPosts = posts.filter((p) => p.featured).slice(0, 3);
  const feedPosts = filteredPosts;

  return (
    <div className="py-12 pb-20 relative overflow-hidden">
      {/* Ambient background glow elements */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-indigo-900/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* HEADER HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-16">
        <span className="text-xs uppercase tracking-widest text-indigo-500 font-bold">
          Publication & Analysis
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold font-display text-white tracking-tight">
          Humans of <span className="gold-gradient-text">Internet Insights</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-light">
          Deep-dives, frameworks, and architectural guides on digital business systems, automation integrations, and personal branding models.
        </p>

        {/* Search bar */}
        <div className="max-w-xl mx-auto pt-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by keyword, topic, or system..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#050e1c]/80 border border-slate-900 rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#d4af37]/60 text-sm transition-all"
            />
          </div>
        </div>
      </section>

      {/* CATEGORIES NAVIGATION BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 border-b border-slate-900 pb-4 overflow-x-auto scrollbar-none">
        <div className="flex gap-6 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-sm font-medium pb-2 border-b-2 transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "border-[#d4af37] text-[#d4af37]"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* TWO COLUMN GRID LAYOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT COLUMN: ARTICLE FEED */}
          <div className="lg:col-span-8 space-y-8 divide-y divide-slate-900">
            {feedPosts.length > 0 ? (
              feedPosts.map((post, idx) => (
                <article key={post.slug} className={`pt-8 first:pt-0 flex justify-between gap-6 group`}>
                  <div className="flex-1 space-y-3">
                    
                    {/* Author Details Block */}
                    <div className="flex items-center gap-2 text-xs">
                      <div className="h-6 w-6 rounded-full overflow-hidden border border-slate-800 bg-slate-900 flex items-center justify-center shrink-0">
                        <img
                          src="/swapnil_hero.png"
                          alt="Swapnil Shiwalay"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="font-semibold text-slate-300">Swapnil Shiwalay</span>
                      <span className="text-slate-650">&middot;</span>
                      <span className="text-slate-550 font-mono">{post.date}</span>
                      <span className="text-slate-650">&middot;</span>
                      <span className="px-2 py-0.5 rounded bg-[#d4af37]/10 text-[#d4af37] text-[10px] uppercase font-bold tracking-wider shrink-0">
                        {post.category}
                      </span>
                    </div>

                    {/* Article link */}
                    <Link href={`/blog/${post.slug}`} className="block group-hover:opacity-95 space-y-1.5">
                      <h2 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-[#d4af37] transition-colors leading-snug">
                        {post.title}
                      </h2>
                      <p className="text-slate-450 text-sm leading-relaxed line-clamp-2 font-light">
                        {post.excerpt}
                      </p>
                    </Link>

                    {/* Metadata Footer bar */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" /> {getReadTime(post)}
                        </span>
                        {post.featured && (
                          <span className="flex items-center gap-1 text-[#d4af37] font-semibold">
                            <Award className="h-3.5 w-3.5" /> Featured
                          </span>
                        )}
                      </div>

                      {/* Share & Bookmark actions */}
                      <div className="flex items-center gap-4">
                        <button
                          onClick={(e) => handleCopyLink(post.slug, e)}
                          className="text-slate-500 hover:text-white transition-colors"
                          title="Copy Link"
                        >
                          <Share2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => toggleBookmark(post.slug, e)}
                          className="text-slate-500 hover:text-amber-500 transition-colors"
                          title={bookmarkedSlugs.includes(post.slug) ? "Remove Bookmark" : "Save Story"}
                        >
                          <Bookmark className={`h-4 w-4 ${bookmarkedSlugs.includes(post.slug) ? 'fill-amber-500 text-amber-500' : ''}`} />
                        </button>
                        {shareSuccess === post.slug && (
                          <span className="text-[10px] text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-900/30">Copied!</span>
                        )}
                      </div>
                    </div>

                  </div>

                  {/* Thumbnail Cover Photo */}
                  {post.featuredImage && (
                    <Link href={`/blog/${post.slug}`} className="shrink-0 self-center">
                      <div className="w-20 h-20 sm:w-36 sm:h-24 rounded-xl overflow-hidden border border-slate-900 shadow-md group">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                          loading="lazy"
                        />
                      </div>
                    </Link>
                  )}
                </article>
              ))
            ) : (
              <div className="py-16 text-center text-slate-500">
                No insights found matching your search.
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: STICKY EDITORIAL SIDEBAR */}
          <div className="lg:col-span-4 space-y-10">
            <div className="sticky top-28 space-y-10">
              
              {/* Author Bio Card */}
              <div className="glass-panel border-slate-800 p-6 rounded-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full overflow-hidden border border-[#d4af37]/30 shadow-lg">
                    <img
                      src="/swapnil_hero.png"
                      alt="Swapnil Shiwalay"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base font-display">Swapnil Shiwalay</h4>
                    <p className="text-[#d4af37] text-xs font-semibold">Systems & AI Architect</p>
                  </div>
                </div>
                
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                  For 20+ years, Swapnil has built scalable digital ecosystems. He helps experts package intellectual property and automate acquisition flow models.
                </p>

                <div className="flex items-center justify-between pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d4af37] hover:text-white uppercase tracking-wider transition-colors"
                  >
                    Apply for Advisory
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  
                  {/* Social icons */}
                  <div className="flex gap-3 text-slate-500">
                    <a href="https://linkedin.com" target="_blank" rel="noopener" className="hover:text-white transition-colors" title="LinkedIn">
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener" className="hover:text-white transition-colors" title="Twitter/X">
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Trending Posts block */}
              {trendingPosts.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-white font-bold text-sm tracking-wider uppercase border-l-2 border-[#d4af37] pl-3">
                    Trending on Insights
                  </h4>
                  <div className="space-y-4">
                    {trendingPosts.map((post, idx) => (
                      <div key={post.slug} className="flex gap-4 items-start">
                        <span className="text-2xl font-extrabold text-slate-800 font-display leading-none">
                          0{idx + 1}
                        </span>
                        <div className="space-y-1">
                          <Link href={`/blog/${post.slug}`} className="text-slate-200 hover:text-[#d4af37] text-sm font-semibold leading-snug transition-colors line-clamp-2">
                            {post.title}
                          </Link>
                          <span className="text-slate-550 text-[10px] block font-mono">
                            {post.date} &middot; {getReadTime(post)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tag Cloud filter options */}
              <div className="space-y-3">
                <h4 className="text-white font-bold text-sm tracking-wider uppercase border-l-2 border-[#d4af37] pl-3">
                  Recommended Topics
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {categories.filter(c => c !== "All").map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? "bg-[#d4af37] border-[#d4af37] text-[#030a16]"
                          : "bg-slate-950/40 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Micro Newsletter Signup Card */}
              <div className="glass-panel border-slate-800 p-6 rounded-2xl bg-gradient-to-br from-[#050e1c] to-[#02070f] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#d4af37]/5 rounded-full blur-2xl" />
                <h4 className="text-white font-bold text-sm font-display">Join Humans of Internet</h4>
                <p className="text-slate-400 text-xs leading-relaxed mt-2 font-light">
                  Weekly systems strategies, prompt files, and high-ticket sales automation insights.
                </p>
                <div className="mt-4 flex gap-2">
                  <input
                    type="email"
                    placeholder="Business Email"
                    className="bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-white placeholder-slate-700 text-xs flex-grow focus:outline-none focus:border-[#d4af37]/55"
                  />
                  <button className="px-3 py-2 bg-gradient-to-r from-[#f3e5ab] to-[#d4af37] text-[#030a16] font-bold rounded-lg text-xs hover:shadow-[0_0_10px_rgba(212,175,55,0.3)] transition-all cursor-pointer">
                    Join
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
