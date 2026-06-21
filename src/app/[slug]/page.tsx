import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle, HelpCircle, Layers } from "lucide-react";
import pSeoData from "@/data/programmatic-seo.json";
import { generateMetadataHelper, getFaqSchema } from "@/lib/seo";

interface ProgrammaticPage {
  slug: string;
  title: string;
  description: string;
  primaryKeyword: string;
  secondaryKeyword: string;
  introduction: string;
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  ctaText: string;
}

const dataMap = pSeoData as Record<string, ProgrammaticPage>;

export async function generateStaticParams() {
  return Object.keys(dataMap).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const page = dataMap[slug];

  if (!page) {
    return {};
  }

  return generateMetadataHelper({
    title: page.title,
    description: page.description,
    slug,
  });
}

export default async function ProgrammaticSEOPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const page = dataMap[slug];

  if (!page) {
    notFound();
  }

  const faqSchema = getFaqSchema(page.faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="py-16 pb-24 overflow-hidden tech-grid-bg">
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 w-full text-left space-y-12">
          
          {/* HERO HEADER */}
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-650/10 border border-indigo-500/20 text-xs font-semibold tracking-wider text-indigo-400 uppercase">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" /> Programmatic SEO Blueprint
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold font-display tracking-tight leading-tight gold-gradient-text pb-2">
              {page.title.split("|")[0].trim()}
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed font-light">
              {page.introduction}
            </p>
          </div>

          {/* DYNAMIC CONTENT SECTIONS */}
          <div className="space-y-10">
            {page.sections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-white border-b border-slate-900 pb-2">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-slate-350 text-base leading-[1.8] font-light">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* FAQS */}
          {page.faqs.length > 0 && (
            <div className="space-y-6 pt-6">
              <h2 className="text-2xl font-bold font-display text-white flex items-center gap-2">
                <HelpCircle className="h-6 w-6 text-[#d4af37]" /> Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {page.faqs.map((faq, fIdx) => (
                  <div key={fIdx} className="glass-panel border-slate-900 p-5 rounded-2xl bg-[#0d1e36]/10">
                    <h4 className="text-white font-semibold text-base mb-2">{faq.question}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed font-light">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CALL TO ACTION */}
          <div className="glass-panel border-slate-800 p-8 rounded-3xl bg-gradient-to-br from-[#050e1c] to-[#02070f] text-center space-y-6 shadow-lg">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">Let&apos;s Design Your Custom System Architecture</h3>
            <p className="text-slate-450 text-sm leading-relaxed max-w-xl mx-auto font-light">
              Schedule a 1-on-1 operational audit with Swapnil Shiwalay to analyze your business bottlenecks and scale your digital assets.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                {page.ctaText}
                <ArrowRight className="h-5 w-5 ml-1" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
