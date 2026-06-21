"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Search,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Eye,
  Settings,
  Sparkles,
  HelpCircle,
  MessageSquare,
  Sliders,
  Star,
  Save,
  Download,
  Video,
  Calendar,
  ArrowUpRight
} from "lucide-react";
import rawPosts from "@/data/posts.json";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string;
  status: "Draft" | "Review" | "Published";
  metaTitle: string;
  metaDesc: string;
  schema: string;
  date: string;
  content: string;
  featuredImage?: string;
}

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  rating: number;
  content: string;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface ResourceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  fileType: "PDF" | "Notion" | "ZIP" | "Excel" | "Code";
  fileSize: string;
  downloadUrl: string;
  details: string[];
  status: "Published" | "Draft";
  featuredImage?: string;
}

interface WebsiteCopy {
  heroHeadline: string;
  heroSubheadline: string;
  aboutText: string;
  ctaText: string;
  testimonials: TestimonialItem[];
  faqs: FaqItem[];
  masterclassVideoUrl: string;
  masterclassVideoProvider: string;
  masterclassTitle: string;
  masterclassDescription: string;
  masterclassCtaText: string;
  masterclassCtaLink: string;
}

const defaultCopy: WebsiteCopy = {
  heroHeadline: "Building Scalable Digital Ecosystems via AI & Automation",
  heroSubheadline: "We help experts, coaches, consultants, and founders package their knowledge, automate operations, and scale inbound high-ticket client acquisition systems.",
  aboutText: "Swapnil Shiwalay is an Ecosystem Architect, Digital Growth Strategist, and Founder with 20+ years of technology consulting experience helping business leaders structure authority assets.",
  ctaText: "Book Your Ecosystem Audit",
  testimonials: [
    { id: "test_1", name: "Dr. Amit Roy", role: "Founder, Roy Clinics", rating: 5, content: "Swapnil completely re-engineered our client acquisition flow. We went from zero predictable leads to booking high-tier consulting calls automatically." },
    { id: "test_2", name: "Jessica Mercer", role: "Executive Advisor, Mercer Consulting", rating: 5, content: "Packaging my leadership retainers into a premium digital community portal doubled our retention metrics in under 90 days." },
  ],
  faqs: [
    { id: "faq_1", question: "How does the advisory onboarding audit work?", answer: "We start with a 45-minute diagnostic session mapping out your current operations bottlenecks, then deliver a custom system blueprints layout." },
    { id: "faq_2", question: "Do you integrate with my existing email CRM?", answer: "Yes, we integrate workflows directly with Brevo, ActiveCampaign, HubSpot, or any custom API Webhook via Make.com and Zapier middleware." },
  ],
  masterclassVideoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  masterclassVideoProvider: "self_hosted",
  masterclassTitle: "Digital Business Ecosystem Masterclass",
  masterclassDescription: "Watch this 15-minute training and discover the exact systems Swapnil Shiwalay uses to help coaches, experts, and founders automate acquisition and operations.",
  masterclassCtaText: "Book 1-on-1 Consultation",
  masterclassCtaLink: "/contact",
};

interface Webinar {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  zoomLink: string;
  duration: string;
  status: "Scheduled" | "Completed" | "Cancelled";
}

export default function BlogCmsPage() {
  // Modules Tab: "blog" or "website_copy" or "resources" or "webinars"
  const [cmsModule, setCmsModule] = useState<"blog" | "website_copy" | "resources" | "webinars">("blog");

  // --- WEBINARS CMS STATE ---
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [newWebinar, setNewWebinar] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    zoomLink: "",
    duration: "60 mins"
  });

  const DEFAULT_WEBINARS: Webinar[] = [
    { id: "web_1", title: "Q3 Systems Architecture Mastermind", description: "Deep dive coaching into Make.com webhooks and PostgreSQL logging rules.", date: "2026-06-25", time: "18:00", zoomLink: "https://zoom.us/j/9392817265", duration: "60 mins", status: "Scheduled" },
    { id: "web_2", title: "Funnel Conversion Rate Optimization Check-In", description: "Reviewing VSL drop-offs and qualifying survey diagnostic form scoring.", date: "2026-06-28", time: "19:00", zoomLink: "https://zoom.us/j/9482716354", duration: "90 mins", status: "Scheduled" }
  ];

  useEffect(() => {
    const saved = localStorage.getItem("academy_webinars_data");
    if (saved) {
      try {
        setWebinars(JSON.parse(saved));
      } catch (e) {
        setWebinars(DEFAULT_WEBINARS);
      }
    } else {
      setWebinars(DEFAULT_WEBINARS);
      localStorage.setItem("academy_webinars_data", JSON.stringify(DEFAULT_WEBINARS));
    }
  }, []);

  const handleCreateWebinar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWebinar.title || !newWebinar.date || !newWebinar.time || !newWebinar.zoomLink) {
      alert("All fields are required!");
      return;
    }
    const createdWebinar: Webinar = {
      id: "web_" + Date.now(),
      title: newWebinar.title,
      description: newWebinar.description,
      date: newWebinar.date,
      time: newWebinar.time,
      zoomLink: newWebinar.zoomLink,
      duration: newWebinar.duration,
      status: "Scheduled"
    };
    const updated = [createdWebinar, ...webinars];
    setWebinars(updated);
    localStorage.setItem("academy_webinars_data", JSON.stringify(updated));

    // Push audit log
    const savedLogs = localStorage.getItem("gos_audit_logs");
    let currentLogs = [];
    if (savedLogs) {
      try { currentLogs = JSON.parse(savedLogs); } catch (e) {}
    }
    const newLog = {
      id: "log_" + Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      action: `Webinar Scheduled: "${createdWebinar.title}" on ${createdWebinar.date}`,
      ip: "192.168.1.102",
      user: "Swapnil Shiwalay"
    };
    localStorage.setItem("gos_audit_logs", JSON.stringify([newLog, ...currentLogs].slice(0, 100)));

    setNewWebinar({
      title: "",
      description: "",
      date: "",
      time: "",
      zoomLink: "",
      duration: "60 mins"
    });
    alert(`Success: Webinar Scheduled!`);
  };

  const handleCancelWebinar = (id: string) => {
    if (!confirm("Are you sure you want to cancel this webinar?")) return;
    const updated = webinars.map(w => w.id === id ? { ...w, status: "Cancelled" as const } : w);
    setWebinars(updated);
    localStorage.setItem("academy_webinars_data", JSON.stringify(updated));
  };

  // --- BLOG POSTS CMS STATE ---
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<string>("All");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editorData, setEditorData] = useState<Partial<Post>>({});

  // --- WEBSITE COPY CMS STATE ---
  const [copyData, setCopyData] = useState<WebsiteCopy>(defaultCopy);
  const [activeCopyTab, setActiveCopyTab] = useState<"general" | "testimonials" | "faqs" | "masterclass">("general");
  const [isCmsSaving, setIsCmsSaving] = useState(false);
  const [cmsSaveStatus, setCmsSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [vslUploadProgress, setVslUploadProgress] = useState<number | null>(null);

  // Temporary item states
  const [newTestimonial, setNewTestimonial] = useState<TestimonialItem>({ id: "", name: "", role: "", rating: 5, content: "" });
  const [newFaq, setNewFaq] = useState<FaqItem>({ id: "", question: "", answer: "" });

  // --- RESOURCES CMS STATE ---
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [resourceSearchTerm, setResourceSearchTerm] = useState("");
  const [resourceActiveTab, setResourceActiveTab] = useState<string>("All");
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const [isEditingResource, setIsEditingResource] = useState(false);
  const [resourceEditorData, setResourceEditorData] = useState<Partial<ResourceItem>>({});

  const defaultResources: ResourceItem[] = [
    {
      id: "growth-checklist",
      title: "Business Growth Checklist",
      tagline: "The 25-point audit to identify scaling bottlenecks.",
      description: "A complete step-by-step audit worksheet used by Swapnil to evaluate a consultant's digital ecosystem stability. Rate your organic traffic, qualification funnels, operations middleware, and retention metrics.",
      fileType: "PDF",
      fileSize: "PDF (2.4 MB)",
      downloadUrl: "/downloads/growth-checklist.pdf",
      details: [
        "Traffic & Audience channels grading criteria",
        "Auto-qualification form scoring metric",
        "Operations & AI integration checks",
        "Retention & Community engagement list"
      ],
      status: "Published",
      featuredImage: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "ai-tools-guide",
      title: "AI Tools & Middleware Guide",
      tagline: "The software stack to automate your consulting operations.",
      description: "Stop spending hours copy-pasting data. Read this blueprint and discover the low-code software triggers, LLM assistants, and messaging endpoints to run qualification and booking automatically.",
      fileType: "Code",
      fileSize: "PDF (3.8 MB)",
      downloadUrl: "/downloads/ai-tools-guide.pdf",
      details: [
        "Top Make.com / Zapier trigger scenarios",
        "Triage prompt library templates",
        "Calendar automated routing setup",
        "CRM integration guides"
      ],
      status: "Published",
      featuredImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "brand-blueprint",
      title: "Personal Brand Blueprint",
      tagline: "Unpack and structure your expertise into a proprietary framework.",
      description: "Competing on price is a choice. This guide shows how to extract your experience, package it into a signature named system, and write high-engagement LinkedIn/newsletter copy to draw inbound high-ticket leads.",
      fileType: "Notion",
      fileSize: "PDF (1.9 MB)",
      downloadUrl: "https://notion.so/brand-blueprint-mock",
      details: [
        "Proprietary framework packaging sheet",
        "LinkedIn Profile Optimization layouts",
        "Content distribution scheduling models",
        "Case study copywriting scripts"
      ],
      status: "Published",
      featuredImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "funnel-templates",
      title: "High-Ticket Funnel Templates",
      tagline: "Squeeze page and qualification page layouts that convert.",
      description: "Get the wireframes and landing page blueprints built to capture leads, pre-educate them via video, and qualify them using strategic forms.",
      fileType: "ZIP",
      fileSize: "ZIP (4.5 MB)",
      downloadUrl: "/downloads/funnel-templates.zip",
      details: [
        "High-conversion Masterclass registration page",
        "Qualifying Application Form fields list",
        "Strategic case studies slider layout",
        "Post-apply Calendly embed setup"
      ],
      status: "Published",
      featuredImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const defaultPosts = rawPosts as Post[];

  // Load from local storage
  useEffect(() => {
    // Load Blog posts
    const savedPosts = localStorage.getItem("cms_posts_data");
    const postsVersion = localStorage.getItem("cms_posts_version");
    const CURRENT_VERSION = "2.2";
    if (savedPosts && postsVersion === CURRENT_VERSION) {
      try {
        setPosts(JSON.parse(savedPosts));
      } catch (e) {
        setPosts(defaultPosts);
      }
    } else {
      setPosts(defaultPosts);
      localStorage.setItem("cms_posts_data", JSON.stringify(defaultPosts));
      localStorage.setItem("cms_posts_version", CURRENT_VERSION);
    }

    // Load Website Copy
    const savedCopy = localStorage.getItem("website_cms_copy");
    if (savedCopy) {
      try {
        const parsed = JSON.parse(savedCopy);
        if (parsed.masterclassVideoUrl && parsed.masterclassVideoUrl.startsWith("blob:")) {
          parsed.masterclassVideoUrl = defaultCopy.masterclassVideoUrl;
        }
        if (!parsed.masterclassVideoProvider) {
          parsed.masterclassVideoProvider = defaultCopy.masterclassVideoProvider;
        }
        setCopyData(parsed);
      } catch (e) {
        setCopyData(defaultCopy);
      }
    } else {
      setCopyData(defaultCopy);
      localStorage.setItem("website_cms_copy", JSON.stringify(defaultCopy));
    }

    // Load Resources
    const savedResources = localStorage.getItem("vault_resources_data");
    const resourcesVersion = localStorage.getItem("vault_resources_version");
    const CURRENT_RES_VERSION = "2.2";
    if (savedResources && resourcesVersion === CURRENT_RES_VERSION) {
      try {
        setResources(JSON.parse(savedResources));
      } catch (e) {
        setResources(defaultResources);
      }
    } else {
      setResources(defaultResources);
      localStorage.setItem("vault_resources_data", JSON.stringify(defaultResources));
      localStorage.setItem("vault_resources_version", CURRENT_RES_VERSION);
    }
  }, []);

  const savePostsToStorage = (updatedPosts: Post[]) => {
    setPosts(updatedPosts);
    localStorage.setItem("cms_posts_data", JSON.stringify(updatedPosts));
  };

  const saveCopyToStorage = (updatedCopy: WebsiteCopy) => {
    setCopyData(updatedCopy);
    localStorage.setItem("website_cms_copy", JSON.stringify(updatedCopy));
  };

  const saveResourcesToStorage = (updatedResources: ResourceItem[]) => {
    setResources(updatedResources);
    localStorage.setItem("vault_resources_data", JSON.stringify(updatedResources));
  };

  // --- RESOURCE ACTIONS ---
  const handleOpenEditResource = (resource: ResourceItem) => {
    setSelectedResource(resource);
    setResourceEditorData(resource);
    setIsEditingResource(true);
  };

  const handleOpenCreateResource = () => {
    setSelectedResource(null);
    setResourceEditorData({
      title: "",
      tagline: "",
      description: "",
      fileType: "PDF",
      fileSize: "",
      downloadUrl: "",
      details: [],
      status: "Draft",
      featuredImage: "",
    });
    setIsEditingResource(true);
  };

  const handleSaveResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resourceEditorData.title || !resourceEditorData.tagline || !resourceEditorData.downloadUrl) return;

    if (selectedResource) {
      const updated = resources.map((r) =>
        r.id === selectedResource.id
          ? {
              ...(resourceEditorData as ResourceItem),
            }
          : r
      );
      saveResourcesToStorage(updated);
    } else {
      const newResource: ResourceItem = {
        ...(resourceEditorData as ResourceItem),
        id: "resource_" + Date.now(),
      };
      saveResourcesToStorage([newResource, ...resources]);
    }
    setIsEditingResource(false);
    setSelectedResource(null);
  };

  const handleDeleteResource = (id: string) => {
    if (!confirm("Are you sure you want to delete this resource?")) return;
    const filtered = resources.filter((r) => r.id !== id);
    saveResourcesToStorage(filtered);
  };

  const filteredResources = resources.filter((res) => {
    const matchesTab = resourceActiveTab === "All" || res.status === resourceActiveTab;
    const matchesSearch =
      res.title.toLowerCase().includes(resourceSearchTerm.toLowerCase()) ||
      res.tagline.toLowerCase().includes(resourceSearchTerm.toLowerCase()) ||
      res.fileType.toLowerCase().includes(resourceSearchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // --- BLOG ACTIONS ---
  const handleOpenEdit = (post: Post) => {
    setSelectedPost(post);
    setEditorData(post);
    setIsEditing(true);
  };

  const handleOpenCreate = () => {
    setSelectedPost(null);
    setEditorData({
      title: "",
      slug: "",
      excerpt: "",
      category: "AI",
      tags: "",
      status: "Draft",
      metaTitle: "",
      metaDesc: "",
      schema: "",
      content: "",
      featuredImage: "",
    });
    setIsEditing(true);
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editorData.title || !editorData.slug) return;

    if (selectedPost) {
      const updated = posts.map((p) =>
        p.id === selectedPost.id
          ? {
              ...(editorData as Post),
              date: editorData.status === "Published" && p.date === "Draft" ? new Date().toISOString().split("T")[0] : p.date,
            }
          : p
      );
      savePostsToStorage(updated);
    } else {
      const newPost: Post = {
        ...(editorData as Post),
        id: "post_" + Date.now(),
        date: editorData.status === "Published" ? new Date().toISOString().split("T")[0] : "Draft",
      };
      savePostsToStorage([newPost, ...posts]);
    }
    setIsEditing(false);
    setSelectedPost(null);
  };

  const handleDeletePost = (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    const filtered = posts.filter((p) => p.id !== id);
    savePostsToStorage(filtered);
  };

  const filteredPosts = posts.filter((post) => {
    const matchesTab = activeTab === "All" || post.status === activeTab;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // --- WEBSITE COPY ACTIONS ---
  const handleUpdateCopyField = (key: keyof WebsiteCopy, value: any) => {
    setCopyData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveWebsiteCopy = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCmsSaving(true);
    setCmsSaveStatus("idle");

    setTimeout(() => {
      try {
        localStorage.setItem("website_cms_copy", JSON.stringify(copyData));
        setCmsSaveStatus("success");
      } catch (err) {
        setCmsSaveStatus("error");
      } finally {
        setIsCmsSaving(false);
        setTimeout(() => setCmsSaveStatus("idle"), 3000);
      }
    }, 800);
  };

  const handleAddTestimonial = () => {
    if (!newTestimonial.name || !newTestimonial.content) return;
    const updatedTestimonials = [
      ...copyData.testimonials,
      { ...newTestimonial, id: "test_" + Date.now() },
    ];
    handleUpdateCopyField("testimonials", updatedTestimonials);
    setNewTestimonial({ id: "", name: "", role: "", rating: 5, content: "" });
  };

  const handleDeleteTestimonial = (id: string) => {
    const filtered = copyData.testimonials.filter((t) => t.id !== id);
    handleUpdateCopyField("testimonials", filtered);
  };

  const handleAddFaq = () => {
    if (!newFaq.question || !newFaq.answer) return;
    const updatedFaqs = [
      ...copyData.faqs,
      { ...newFaq, id: "faq_" + Date.now() },
    ];
    handleUpdateCopyField("faqs", updatedFaqs);
    setNewFaq({ id: "", question: "", answer: "" });
  };

  const handleDeleteFaq = (id: string) => {
    const filtered = copyData.faqs.filter((f) => f.id !== id);
    handleUpdateCopyField("faqs", filtered);
  };

  return (
    <div className="space-y-8">
      {/* 1. Header with Module Navigation Tab */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-5">
        <div>
          <h1 className="text-3xl font-bold font-display text-white">Ecosystem CMS Manager</h1>
          <p className="text-slate-400 text-sm mt-0.5">Draft thought leadership articles and manage site copy configurations.</p>
        </div>

        {/* CMS Switcher Module */}
        <div className="bg-slate-950 border border-slate-900 rounded-lg p-1 flex">
          <button
            onClick={() => { setCmsModule("blog"); setIsEditing(false); setIsEditingResource(false); }}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              cmsModule === "blog"
                ? "bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/25"
                : "text-slate-400 hover:text-slate-200 border border-transparent"
            }`}
          >
            <FileText className="h-4 w-4" /> Articles CMS
          </button>
          <button
            onClick={() => { setCmsModule("website_copy"); setIsEditing(false); setIsEditingResource(false); }}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              cmsModule === "website_copy"
                ? "bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/25"
                : "text-slate-400 hover:text-slate-200 border border-transparent"
            }`}
          >
            <Settings className="h-4 w-4" /> Website Page Copy CMS
          </button>
          <button
            onClick={() => { setCmsModule("resources"); setIsEditing(false); setIsEditingResource(false); }}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              cmsModule === "resources"
                ? "bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/25"
                : "text-slate-400 hover:text-slate-200 border border-transparent"
            }`}
          >
            <Download className="h-4 w-4" /> Resources CMS
          </button>
          <button
            onClick={() => { setCmsModule("webinars"); setIsEditing(false); setIsEditingResource(false); }}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              cmsModule === "webinars"
                ? "bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/25"
                : "text-slate-400 hover:text-slate-200 border border-transparent"
            }`}
          >
            <Calendar className="h-4 w-4" /> Zoom Webinars CMS
          </button>
        </div>
      </div>

      {/* 2. BLOG MODULE SECTION */}
      {cmsModule === "blog" && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Header Action Row */}
          {!isEditing && (
            <div className="flex justify-between items-center">
              <span className="text-white font-bold font-display text-sm">Thought Leadership Insights Registry</span>
              <button
                onClick={handleOpenCreate}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#030a16] bg-[#d4af37] hover:bg-[#dfc176] rounded-lg uppercase tracking-wider transition-all cursor-pointer"
              >
                <Plus className="h-4 w-4" /> Create Article
              </button>
            </div>
          )}

          {/* Filter & Search */}
          {!isEditing && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-6 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#050e1c] border border-slate-800 rounded-lg pl-11 pr-4 py-2.5 text-slate-300 placeholder-slate-600 focus:outline-none focus:border-[#d4af37] text-xs"
                />
              </div>

              <div className="md:col-span-6 flex flex-wrap gap-2 justify-start md:justify-end">
                {["All", "Published", "Review", "Draft"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
                      activeTab === tab
                        ? "bg-[#d4af37] border-[#d4af37] text-[#030a16]"
                        : "bg-[#050e1c]/40 border-slate-800 text-slate-400 hover:border-[#d4af37]/35 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CMS Editor Form Workspace */}
          {isEditing ? (
            <form onSubmit={handleSavePost} className="glass-panel rounded-xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-slate-900 pb-4 flex justify-between items-center">
                <h3 className="text-lg font-bold font-display text-white">
                  {selectedPost ? "Modify Branded Insight Details" : "Draft New Authority Insight"}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="text-xs text-slate-450 hover:text-white"
                >
                  Cancel Editor
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Left Primary Input Column */}
                <div className="md:col-span-8 space-y-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-350 uppercase tracking-wider">Article Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Deploying Autonomous AI Agents in Your Consulting..."
                      value={editorData.title}
                      onChange={(e) => setEditorData((p) => ({ ...p, title: e.target.value }))}
                      className="w-full bg-[#050e1c] border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#d4af37] text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-350 uppercase tracking-wider">Router URL Slug</label>
                    <input
                      type="text"
                      required
                      placeholder="ai-agents-consulting"
                      value={editorData.slug}
                      onChange={(e) => setEditorData((p) => ({ ...p, slug: e.target.value }))}
                      className="w-full bg-[#050e1c] border border-slate-800 rounded-lg px-4 py-2.5 text-slate-400 focus:outline-none focus:border-[#d4af37] text-xs font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-350 uppercase tracking-wider">Short Excerpt</label>
                    <textarea
                      rows={2}
                      placeholder="How to use modern LLMs to qualify prospects..."
                      value={editorData.excerpt}
                      onChange={(e) => setEditorData((p) => ({ ...p, excerpt: e.target.value }))}
                      className="w-full bg-[#050e1c] border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#d4af37] text-xs resize-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-350 uppercase tracking-wider">Article Markdown / Copy Body</label>
                    <textarea
                      rows={10}
                      value={editorData.content}
                      onChange={(e) => setEditorData((p) => ({ ...p, content: e.target.value }))}
                      placeholder="Write your expert advisory content here..."
                      className="w-full bg-[#050e1c] border border-slate-800 rounded-lg p-4 text-white focus:outline-none focus:border-[#d4af37] text-xs font-mono"
                    />
                  </div>
                </div>

                {/* Right Meta Column */}
                <div className="md:col-span-4 space-y-5 bg-slate-950/40 p-5 rounded-xl border border-slate-900">
                  <h4 className="text-xs font-bold text-[#d4af37] uppercase tracking-widest flex items-center gap-1.5">
                    <Settings className="h-4 w-4" /> SEO Meta Registry
                  </h4>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Category</label>
                    <select
                      value={editorData.category}
                      onChange={(e) => setEditorData((p) => ({ ...p, category: e.target.value }))}
                      className="w-full bg-[#050e1c] border border-slate-800 rounded-lg px-3 py-2 text-slate-300 focus:outline-none focus:border-[#d4af37] text-xs cursor-pointer"
                    >
                      <option value="AI">AI Business</option>
                      <option value="Personal Branding">Personal Branding</option>
                      <option value="Business Growth">Business Growth</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tags</label>
                    <input
                      type="text"
                      placeholder="AI, Retainers, Scaling"
                      value={editorData.tags}
                      onChange={(e) => setEditorData((p) => ({ ...p, tags: e.target.value }))}
                      className="w-full bg-[#050e1c] border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37] text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Publish Status</label>
                    <select
                      value={editorData.status}
                      onChange={(e) => setEditorData((p) => ({ ...p, status: e.target.value as Post["status"] }))}
                      className="w-full bg-[#050e1c] border border-slate-800 rounded-lg px-3 py-2 text-slate-300 focus:outline-none focus:border-[#d4af37] text-xs cursor-pointer"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Review">Review</option>
                      <option value="Published">Published</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Meta Title Tag</label>
                    <input
                      type="text"
                      value={editorData.metaTitle}
                      onChange={(e) => setEditorData((p) => ({ ...p, metaTitle: e.target.value }))}
                      className="w-full bg-[#050e1c] border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37] text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Meta Description</label>
                    <textarea
                      rows={3}
                      value={editorData.metaDesc}
                      onChange={(e) => setEditorData((p) => ({ ...p, metaDesc: e.target.value }))}
                      className="w-full bg-[#050e1c] border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37] text-xs resize-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-555 uppercase tracking-wider font-mono">Structured Schema JSON-LD</label>
                    <textarea
                      rows={3}
                      placeholder='{"@context": "https://schema.org"}'
                      value={editorData.schema}
                      onChange={(e) => setEditorData((p) => ({ ...p, schema: e.target.value }))}
                      className="w-full bg-[#050e1c] border border-slate-800 rounded-lg px-3 py-2 text-slate-400 focus:outline-none focus:border-[#d4af37] text-[10px] font-mono resize-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Featured Image URL</label>
                    <input
                      type="text"
                      placeholder="e.g. https://images.unsplash.com/..."
                      value={editorData.featuredImage || ""}
                      onChange={(e) => setEditorData((p) => ({ ...p, featuredImage: e.target.value }))}
                      className="w-full bg-[#050e1c] border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37] text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Form Save Button */}
              <div className="border-t border-slate-900 pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 text-xs font-semibold hover:text-white cursor-pointer"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#f3e5ab] to-[#d4af37] text-[#030a16] text-xs font-bold transition-all hover:scale-[1.01] cursor-pointer"
                >
                  Publish & Sync CMS
                </button>
              </div>
            </form>
          ) : (
            /* CMS Articles List Table */
            <div className="glass-panel border-slate-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-900 text-slate-400 text-xs font-semibold">
                      <th className="py-3 px-4">Insight Title</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Tags</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900 text-xs text-slate-300">
                    {filteredPosts.length > 0 ? (
                      filteredPosts.map((post) => (
                        <tr key={post.id} className="hover:bg-slate-900/30 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-white font-display max-w-sm truncate">
                            {post.title}
                          </td>
                          <td className="py-3.5 px-4 text-slate-400">{post.category}</td>
                          <td className="py-3.5 px-4 text-slate-500">{post.tags}</td>
                          <td className="py-3.5 px-4 text-slate-550">{post.date}</td>
                          <td className="py-3.5 px-4 text-center">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold ${
                                post.status === "Published"
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  : post.status === "Review"
                                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                  : "bg-slate-850 text-slate-400 border border-slate-800"
                              }`}
                            >
                              {post.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-2">
                            <button
                              onClick={() => handleOpenEdit(post)}
                              className="text-slate-400 hover:text-[#d4af37] transition-colors cursor-pointer"
                              title="Modify post"
                            >
                              <Edit2 className="h-4 w-4 inline" />
                            </button>
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              className="text-slate-500 hover:text-rose-450 transition-colors cursor-pointer"
                              title="Delete post"
                            >
                              <Trash2 className="h-4 w-4 inline" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-6 text-center text-slate-500">
                          No insights matching search criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. WEBSITE COPY CMS MODULE */}
      {cmsModule === "website_copy" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
          
          {/* Left Sub-tabs Menu */}
          <div className="lg:col-span-3 space-y-2">
            {[
              { id: "general", label: "Branding & Hero Copy", icon: Sliders },
              { id: "testimonials", label: "Client Testimonials", icon: MessageSquare },
              { id: "faqs", label: "Objections FAQs", icon: HelpCircle },
              { id: "masterclass", label: "Masterclass Video OS", icon: Video },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSubActive = activeCopyTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCopyTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer ${
                    isSubActive
                      ? "bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/35 shadow-[0_0_15px_rgba(212,175,55,0.05)]"
                      : "bg-slate-950 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-slate-200"
                  }`}
                >
                  <Icon className={`h-4.5 w-4.5 ${isSubActive ? "text-[#d4af37]" : "text-slate-500"}`} />
                  {tab.label}
                </button>
              );
            })}

            <div className="bg-[#d4af37]/5 border border-[#d4af37]/15 p-4 rounded-xl space-y-2 mt-4 text-[10px] leading-relaxed text-slate-400">
              <p className="font-bold text-white flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#d4af37]" /> Active Connection
              </p>
              <p>Saving changes here updates your public pages (Home, About, Services) immediately in client browser instances.</p>
            </div>
          </div>

          {/* Right Sub-tab Form Panels */}
          <div className="lg:col-span-9 space-y-6">
            <form onSubmit={handleSaveWebsiteCopy} className="space-y-6">
              <div className="glass-panel border-slate-800 rounded-xl p-6 space-y-6">
                
                {/* General Branding Copy Tab */}
                {activeCopyTab === "general" && (
                  <div className="space-y-6">
                    <div className="border-b border-slate-900 pb-3">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-[#d4af37]">Branding & Hero Headlines</h3>
                      <p className="text-slate-500 text-xs mt-0.5">Control the primary positioning headlines displayed on the home page.</p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Main Hero Headline</label>
                        <input
                          type="text"
                          required
                          value={copyData.heroHeadline}
                          onChange={(e) => handleUpdateCopyField("heroHeadline", e.target.value)}
                          className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37] font-semibold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hero Subheadline</label>
                        <textarea
                          rows={3}
                          required
                          value={copyData.heroSubheadline}
                          onChange={(e) => handleUpdateCopyField("heroSubheadline", e.target.value)}
                          className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37] resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Primary Call-to-Action Text</label>
                          <input
                            type="text"
                            required
                            value={copyData.ctaText}
                            onChange={(e) => handleUpdateCopyField("ctaText", e.target.value)}
                            className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                          />
                        </div>
                      </div>

                      <div className="space-y-1 pt-2 border-t border-slate-900">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">About Page Narrative Bio (Summary Node)</label>
                        <textarea
                          rows={4}
                          required
                          value={copyData.aboutText}
                          onChange={(e) => handleUpdateCopyField("aboutText", e.target.value)}
                          className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Client Testimonials Tab */}
                {activeCopyTab === "testimonials" && (
                  <div className="space-y-6">
                    <div className="border-b border-slate-900 pb-3">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-[#d4af37]">Social Proof: Client Testimonials</h3>
                      <p className="text-slate-500 text-xs mt-0.5">Define advisory retainers success stories displayed on the front site.</p>
                    </div>

                    {/* Testimonials List */}
                    <div className="space-y-3.5">
                      {copyData.testimonials.map((test) => (
                        <div key={test.id} className="bg-slate-950 border border-slate-900 p-4 rounded-xl flex justify-between items-start gap-4">
                          <div className="space-y-1.5 leading-snug">
                            <div className="flex items-center gap-2">
                              <span className="text-white text-xs font-bold">{test.name}</span>
                              <span className="text-slate-500 text-[10px]">• {test.role}</span>
                            </div>
                            <div className="flex text-amber-400">
                              {Array.from({ length: test.rating }).map((_, i) => (
                                <Star key={i} className="h-3 w-3 fill-current" />
                              ))}
                            </div>
                            <p className="text-slate-400 text-xs italic">"{test.content}"</p>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleDeleteTestimonial(test.id)}
                            className="p-1 text-slate-500 hover:text-rose-450 transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add Testimonial Input Form */}
                    <div className="bg-slate-950 border border-slate-900 p-5 rounded-xl space-y-4">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Add Client Endorsement</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Client Name</label>
                          <input
                            type="text"
                            placeholder="e.g. Vinay Kumar"
                            value={newTestimonial.name}
                            onChange={(e) => setNewTestimonial((p) => ({ ...p, name: e.target.value }))}
                            className="w-full bg-[#050e1c] border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Role / Business</label>
                          <input
                            type="text"
                            placeholder="e.g. CEO, KumarTech"
                            value={newTestimonial.role}
                            onChange={(e) => setNewTestimonial((p) => ({ ...p, role: e.target.value }))}
                            className="w-full bg-[#050e1c] border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Rating Star Count</label>
                        <select
                          value={newTestimonial.rating}
                          onChange={(e) => setNewTestimonial((p) => ({ ...p, rating: parseInt(e.target.value) }))}
                          className="w-24 bg-[#050e1c] border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white cursor-pointer"
                        >
                          <option value={5}>5 Stars</option>
                          <option value={4}>4 Stars</option>
                          <option value={3}>3 Stars</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Success Review Copy</label>
                        <textarea
                          rows={2}
                          placeholder="Swapnil engineered our automated operations funnel..."
                          value={newTestimonial.content}
                          onChange={(e) => setNewTestimonial((p) => ({ ...p, content: e.target.value }))}
                          className="w-full bg-[#050e1c] border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleAddTestimonial}
                        className="px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white hover:text-[#d4af37] text-xs font-bold transition-colors cursor-pointer"
                      >
                        Register Endorsement
                      </button>
                    </div>
                  </div>
                )}

                {/* Objections FAQs Tab */}
                {activeCopyTab === "faqs" && (
                  <div className="space-y-6">
                    <div className="border-b border-slate-900 pb-3">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-[#d4af37]">Ecosystem Objections FAQs</h3>
                      <p className="text-slate-500 text-xs mt-0.5">Manage the accordion items displayed on public FAQ sections.</p>
                    </div>

                    {/* FAQ list */}
                    <div className="space-y-3.5">
                      {copyData.faqs.map((faq) => (
                        <div key={faq.id} className="bg-slate-950 border border-slate-900 p-4 rounded-xl flex justify-between items-start gap-4">
                          <div className="space-y-1.5 leading-snug">
                            <p className="text-white text-xs font-bold font-display">Q: {faq.question}</p>
                            <p className="text-slate-400 text-xs">A: {faq.answer}</p>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleDeleteFaq(faq.id)}
                            className="p-1 text-slate-500 hover:text-rose-450 transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add FAQ form */}
                    <div className="bg-slate-950 border border-slate-900 p-5 rounded-xl space-y-4">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Add FAQ Node</h4>
                      
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Question</label>
                        <input
                          type="text"
                          placeholder="e.g. Do you offer agency execution support?"
                          value={newFaq.question}
                          onChange={(e) => setNewFaq((p) => ({ ...p, question: e.target.value }))}
                          className="w-full bg-[#050e1c] border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Detailed Answer</label>
                        <textarea
                          rows={2}
                          placeholder="We design and deploy custom webhooks, web applications, and database logic..."
                          value={newFaq.answer}
                          onChange={(e) => setNewFaq((p) => ({ ...p, answer: e.target.value }))}
                          className="w-full bg-[#050e1c] border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleAddFaq}
                        className="px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white hover:text-[#d4af37] text-xs font-bold transition-colors cursor-pointer"
                      >
                        Register FAQ Node
                      </button>
                    </div>
                  </div>
                )}

                {/* Masterclass Video CMS Tab */}
                {activeCopyTab === "masterclass" && (
                  <div className="space-y-6">
                    <div className="border-b border-slate-900 pb-3">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-[#d4af37]">Masterclass Video & Funnel Setup</h3>
                      <p className="text-slate-500 text-xs mt-0.5">Configure your high-ticket video sales letter (VSL) settings, upload source files, and edit target CTAs.</p>
                    </div>

                    <div className="space-y-5">
                      {/* Video Source File Options */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Video Hosting Provider</label>
                          <select
                            value={copyData.masterclassVideoProvider || "self_hosted"}
                            onChange={(e) => handleUpdateCopyField("masterclassVideoProvider", e.target.value)}
                            className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
                          >
                            <option value="self_hosted">Self Hosted (.mp4, .mov, etc.)</option>
                            <option value="youtube">YouTube (Link or Video ID)</option>
                            <option value="vimeo">Vimeo (Link or Video ID)</option>
                            <option value="wistia">Wistia (Link or Video ID)</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            {copyData.masterclassVideoProvider === "self_hosted" 
                              ? "Video Source URL" 
                              : `${(copyData.masterclassVideoProvider || "youtube").charAt(0).toUpperCase() + (copyData.masterclassVideoProvider || "youtube").slice(1)} Link / Video ID`}
                          </label>
                          <input
                            type="text"
                            required
                            value={copyData.masterclassVideoUrl || ""}
                            onChange={(e) => handleUpdateCopyField("masterclassVideoUrl", e.target.value)}
                            placeholder={
                              copyData.masterclassVideoProvider === "self_hosted"
                                ? "e.g. https://www.w3schools.com/html/mov_bbb.mp4"
                                : copyData.masterclassVideoProvider === "youtube"
                                ? "e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ or ID"
                                : copyData.masterclassVideoProvider === "vimeo"
                                ? "e.g. https://vimeo.com/902888123 or ID"
                                : "e.g. https://wistia.com/medias/8d2n3b6c7a or ID"
                            }
                            className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37] font-mono"
                          />
                        </div>
                      </div>

                      {copyData.masterclassVideoProvider === "self_hosted" && (
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-display">Upload VSL Video File</label>
                          <div className="relative">
                            <input
                              type="file"
                              accept="video/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setVslUploadProgress(0);
                                  let pct = 0;
                                  const uploadProgressInterval = setInterval(() => {
                                    pct += 10;
                                    setVslUploadProgress(pct);
                                    if (pct >= 100) {
                                      clearInterval(uploadProgressInterval);
                                      setTimeout(() => setVslUploadProgress(null), 1500);
                                      
                                      const objUrl = URL.createObjectURL(file);
                                      handleUpdateCopyField("masterclassVideoUrl", objUrl);
                                    }
                                  }, 100);
                                }
                              }}
                              className="hidden"
                              id="vsl-file-upload"
                            />
                            <label
                              htmlFor="vsl-file-upload"
                              className="flex items-center justify-center gap-2 w-full bg-slate-900 border border-slate-800 hover:border-[#d4af37]/50 rounded-lg px-3 py-2 text-xs text-slate-300 hover:text-white font-bold cursor-pointer transition-colors"
                            >
                              <Download className="h-4 w-4 text-[#d4af37]" />
                              Upload VSL File (.mp4, .mov)
                            </label>
                          </div>
                          
                          {/* Upload Progress Bar */}
                          {vslUploadProgress !== null && (
                            <div className="mt-2 space-y-1">
                              <div className="flex justify-between text-[9px] font-bold text-[#d4af37] uppercase">
                                <span>Uploading Video...</span>
                                <span>{vslUploadProgress}%</span>
                              </div>
                              <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-[#f3e5ab] to-[#d4af37] transition-all duration-100" style={{ width: `${vslUploadProgress}%` }} />
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Title & Description */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Masterclass Title</label>
                        <input
                          type="text"
                          required
                          value={copyData.masterclassTitle || ""}
                          onChange={(e) => handleUpdateCopyField("masterclassTitle", e.target.value)}
                          className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37] font-semibold"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Masterclass Description</label>
                        <textarea
                          rows={3}
                          required
                          value={copyData.masterclassDescription || ""}
                          onChange={(e) => handleUpdateCopyField("masterclassDescription", e.target.value)}
                          className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37] resize-none"
                        />
                      </div>

                      {/* CTA Options */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">After Completion CTA Text</label>
                          <input
                            type="text"
                            required
                            value={copyData.masterclassCtaText || ""}
                            onChange={(e) => handleUpdateCopyField("masterclassCtaText", e.target.value)}
                            className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">After Completion CTA Link</label>
                          <input
                            type="text"
                            required
                            value={copyData.masterclassCtaLink || ""}
                            onChange={(e) => handleUpdateCopyField("masterclassCtaLink", e.target.value)}
                            className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Form Save Button Footer */}
              <div className="flex justify-end gap-4 items-center">
                {cmsSaveStatus === "success" && (
                  <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                    <CheckCircle className="h-4.5 w-4.5" /> Site copy synced successfully!
                  </span>
                )}
                {cmsSaveStatus === "error" && (
                  <span className="text-rose-450 text-xs font-semibold">
                    Error syncing to local cache index.
                  </span>
                )}
                <button
                  type="submit"
                  disabled={isCmsSaving}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#f3e5ab] to-[#d4af37] text-[#030a16] font-bold text-xs rounded-lg transition-transform hover:scale-[1.02] cursor-pointer disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {isCmsSaving ? "Syncing Page Database..." : "Save & Publish Copy"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. RESOURCES CMS MODULE */}
      {cmsModule === "resources" && (
        <div className="space-y-6 animate-fade-in">
          {/* Header Action Row */}
          {!isEditingResource && (
            <div className="flex justify-between items-center">
              <span className="text-white font-bold font-display text-sm">Downloadable Resource Assets Vault</span>
              <button
                onClick={handleOpenCreateResource}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#030a16] bg-[#d4af37] hover:bg-[#dfc176] rounded-lg uppercase tracking-wider transition-all cursor-pointer"
              >
                <Plus className="h-4 w-4" /> Create Resource
              </button>
            </div>
          )}

          {/* Filter & Search */}
          {!isEditingResource && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-6 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search resources by title, tagline, file type..."
                  value={resourceSearchTerm}
                  onChange={(e) => setResourceSearchTerm(e.target.value)}
                  className="w-full bg-[#050e1c] border border-slate-800 rounded-lg pl-11 pr-4 py-2.5 text-slate-300 placeholder-slate-600 focus:outline-none focus:border-[#d4af37] text-xs"
                />
              </div>

              <div className="md:col-span-6 flex flex-wrap gap-2 justify-start md:justify-end">
                {["All", "Published", "Draft"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setResourceActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
                      resourceActiveTab === tab
                        ? "bg-[#d4af37] border-[#d4af37] text-[#030a16]"
                        : "bg-[#050e1c]/40 border-slate-800 text-slate-400 hover:border-[#d4af37]/35 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CMS Resource Editor Form Workspace */}
          {isEditingResource ? (
            <form onSubmit={handleSaveResource} className="glass-panel rounded-xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-slate-900 pb-4 flex justify-between items-center">
                <h3 className="text-lg font-bold font-display text-white">
                  {selectedResource ? "Modify Downloadable Resource Details" : "Register New Resource Asset"}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsEditingResource(false)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Cancel Editor
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Left Primary Input Column */}
                <div className="md:col-span-8 space-y-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Resource Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Business Growth Checklist"
                      value={resourceEditorData.title || ""}
                      onChange={(e) => setResourceEditorData((p) => ({ ...p, title: e.target.value }))}
                      className="w-full bg-[#050e1c] border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#d4af37] text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Short Tagline</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. The 25-point audit worksheet to identify scaling bottlenecks."
                      value={resourceEditorData.tagline || ""}
                      onChange={(e) => setResourceEditorData((p) => ({ ...p, tagline: e.target.value }))}
                      className="w-full bg-[#050e1c] border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#d4af37] text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Detailed Description</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Provide a comprehensive summary of what the resource contains..."
                      value={resourceEditorData.description || ""}
                      onChange={(e) => setResourceEditorData((p) => ({ ...p, description: e.target.value }))}
                      className="w-full bg-[#050e1c] border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#d4af37] text-xs resize-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">What's Included / Details (One per line)</label>
                      <span className="text-[10px] text-slate-500">Separated by lines</span>
                    </div>
                    <textarea
                      rows={5}
                      placeholder="Bullet point 1&#10;Bullet point 2&#10;Bullet point 3"
                      value={resourceEditorData.details ? resourceEditorData.details.join("\n") : ""}
                      onChange={(e) => setResourceEditorData((p) => ({ ...p, details: e.target.value.split("\n") }))}
                      className="w-full bg-[#050e1c] border border-slate-800 rounded-lg p-4 text-white focus:outline-none focus:border-[#d4af37] text-xs font-mono"
                    />
                  </div>
                </div>

                {/* Right Metadata Column */}
                <div className="md:col-span-4 space-y-5 bg-slate-950/40 p-5 rounded-xl border border-slate-900">
                  <h4 className="text-xs font-bold text-[#d4af37] uppercase tracking-widest flex items-center gap-1.5">
                    <Settings className="h-4 w-4" /> Resource File Metadata
                  </h4>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">File Type</label>
                    <select
                      value={resourceEditorData.fileType || "PDF"}
                      onChange={(e) => setResourceEditorData((p) => ({ ...p, fileType: e.target.value as any }))}
                      className="w-full bg-[#050e1c] border border-slate-800 rounded-lg px-3 py-2 text-slate-300 focus:outline-none focus:border-[#d4af37] text-xs cursor-pointer"
                    >
                      <option value="PDF">PDF Document</option>
                      <option value="Notion">Notion Database</option>
                      <option value="ZIP">ZIP Archive</option>
                      <option value="Excel">Excel Worksheet</option>
                      <option value="Code">Source Code / CPU</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">File Size</label>
                    <input
                      type="text"
                      placeholder="e.g. PDF (2.4 MB) or ZIP (4.5 MB)"
                      value={resourceEditorData.fileSize || ""}
                      onChange={(e) => setResourceEditorData((p) => ({ ...p, fileSize: e.target.value }))}
                      className="w-full bg-[#050e1c] border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37] text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Download Link / Asset Key</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. /downloads/checklist.pdf"
                      value={resourceEditorData.downloadUrl || ""}
                      onChange={(e) => setResourceEditorData((p) => ({ ...p, downloadUrl: e.target.value }))}
                      className="w-full bg-[#050e1c] border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37] text-xs font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-555 uppercase tracking-wider">Status</label>
                    <select
                      value={resourceEditorData.status || "Draft"}
                      onChange={(e) => setResourceEditorData((p) => ({ ...p, status: e.target.value as any }))}
                      className="w-full bg-[#050e1c] border border-slate-800 rounded-lg px-3 py-2 text-slate-300 focus:outline-none focus:border-[#d4af37] text-xs cursor-pointer"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Featured Image URL</label>
                    <input
                      type="text"
                      placeholder="e.g. https://images.unsplash.com/..."
                      value={resourceEditorData.featuredImage || ""}
                      onChange={(e) => setResourceEditorData((p) => ({ ...p, featuredImage: e.target.value }))}
                      className="w-full bg-[#050e1c] border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37] text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Form Save Button */}
              <div className="border-t border-slate-900 pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditingResource(false)}
                  className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 text-xs font-semibold hover:text-white cursor-pointer"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#f3e5ab] to-[#d4af37] text-[#030a16] text-xs font-bold transition-all hover:scale-[1.01] cursor-pointer"
                >
                  Sync Resource to Vault
                </button>
              </div>
            </form>
          ) : (
            /* CMS Resources List Table */
            <div className="glass-panel border-slate-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-900 text-slate-400 text-xs font-semibold">
                      <th className="py-3 px-4">Resource Asset</th>
                      <th className="py-3 px-4">File Type</th>
                      <th className="py-3 px-4">File Size</th>
                      <th className="py-3 px-4">Bullets</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900 text-xs text-slate-300">
                    {filteredResources.length > 0 ? (
                      filteredResources.map((res) => (
                        <tr key={res.id} className="hover:bg-slate-900/30 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-white font-display max-w-sm truncate">
                            <div>{res.title}</div>
                            <div className="text-[10px] font-normal text-slate-500 font-sans truncate">{res.tagline}</div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-400">
                            <span className="bg-slate-950 border border-slate-900 px-2 py-0.5 rounded text-[10px] font-mono">
                              {res.fileType}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-400">{res.fileSize || "N/A"}</td>
                          <td className="py-3.5 px-4 text-slate-500">{res.details ? res.details.filter(d => d.trim().length > 0).length : 0} items</td>
                          <td className="py-3.5 px-4 text-center">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold ${
                                res.status === "Published"
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  : "bg-slate-850 text-slate-400 border border-slate-800"
                              }`}
                            >
                              {res.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-2">
                            <button
                              onClick={() => handleOpenEditResource(res)}
                              className="text-slate-400 hover:text-[#d4af37] transition-colors cursor-pointer"
                              title="Modify resource"
                            >
                              <Edit2 className="h-4 w-4 inline" />
                            </button>
                            <button
                              onClick={() => handleDeleteResource(res.id)}
                              className="text-slate-500 hover:text-rose-450 transition-colors cursor-pointer"
                              title="Delete resource"
                            >
                              <Trash2 className="h-4 w-4 inline" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-6 text-center text-slate-500">
                          No downloadable assets matching search criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {cmsModule === "webinars" && (
        <div className="space-y-8 animate-fadeIn mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Schedule Form */}
            <div className="lg:col-span-5 bg-[#050e1c]/40 border border-slate-900 rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                  <Calendar className="h-4.5 w-4.5 text-[#d4af37]" /> Schedule Zoom Masterclass
                </h3>
                <p className="text-slate-500 text-xs mt-0.5">Publish a live cohort coaching video call session.</p>
              </div>

              <form onSubmit={handleCreateWebinar} className="space-y-4">
                <div>
                  <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Webinar Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Q3 Operations Audit Workshop"
                    value={newWebinar.title}
                    onChange={(e) => setNewWebinar({ ...newWebinar, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-900 rounded-lg p-2.5 text-xs text-white placeholder-slate-650 focus:outline-none focus:border-[#d4af37] transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-505 font-bold uppercase block mb-1">Brief Description</label>
                  <textarea
                    placeholder="Provide overview details..."
                    value={newWebinar.description}
                    onChange={(e) => setNewWebinar({ ...newWebinar, description: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-900 rounded-lg p-2.5 text-xs text-white placeholder-slate-650 focus:outline-none focus:border-[#d4af37] transition-colors h-24"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Session Date</label>
                    <input
                      type="date"
                      value={newWebinar.date}
                      onChange={(e) => setNewWebinar({ ...newWebinar, date: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-900 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37] transition-colors cursor-pointer"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Session Time</label>
                    <input
                      type="time"
                      value={newWebinar.time}
                      onChange={(e) => setNewWebinar({ ...newWebinar, time: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-900 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37] transition-colors cursor-pointer"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Zoom Meeting Invite Link</label>
                    <input
                      type="url"
                      placeholder="https://zoom.us/j/..."
                      value={newWebinar.zoomLink}
                      onChange={(e) => setNewWebinar({ ...newWebinar, zoomLink: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-900 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Duration</label>
                    <select
                      value={newWebinar.duration}
                      onChange={(e) => setNewWebinar({ ...newWebinar, duration: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-900 rounded-lg p-2.5 text-xs text-white cursor-pointer focus:outline-none focus:border-[#d4af37] transition-colors"
                    >
                      <option value="30 mins">30 mins</option>
                      <option value="45 mins">45 mins</option>
                      <option value="60 mins">60 mins</option>
                      <option value="90 mins">90 mins</option>
                      <option value="120 mins">120 mins</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] text-[#030a16] py-2.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wider hover:opacity-95 cursor-pointer"
                >
                  Schedule Webinar Cohort
                </button>
              </form>
            </div>

            {/* Right: Webinars List */}
            <div className="lg:col-span-7 bg-[#050e1c]/40 border border-slate-900 rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                  <Video className="h-4.5 w-4.5 text-indigo-500" /> Scheduled Webinars Ledger
                </h3>
                <p className="text-slate-500 text-xs mt-0.5">Active registry of scheduled mastermind conference details.</p>
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                {webinars.map((web) => (
                  <div key={web.id} className="p-4 bg-slate-950 border border-slate-900 rounded-xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-xs">
                    <div className="space-y-1.5 text-left min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 rounded text-[8px] font-bold border uppercase ${
                          web.status === "Scheduled"
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                            : "bg-slate-800 text-slate-400 border-slate-800"
                        }`}>
                          {web.status}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono font-bold">
                          📅 {web.date} &bull; ⏰ {web.time} ({web.duration})
                        </span>
                      </div>
                      <span className="font-bold text-white block text-sm truncate">{web.title}</span>
                      <p className="text-[10px] text-slate-400 leading-relaxed font-sans">{web.description}</p>
                      
                      {web.status === "Scheduled" && (
                        <a
                          href={web.zoomLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-indigo-400 hover:underline font-semibold font-mono text-[10px] mt-1"
                        >
                          Join Zoom Meeting <ArrowUpRight className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                    <div className="shrink-0 flex items-center gap-2">
                      {web.status === "Scheduled" && (
                        <button
                          onClick={() => handleCancelWebinar(web.id)}
                          className="bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-500 px-3 py-1.5 rounded text-[10px] font-bold transition-all cursor-pointer"
                        >
                          Cancel Webinar
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {webinars.length === 0 && (
                  <p className="text-center text-slate-500 italic py-8">No webinars logged in calendar.</p>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
