import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="py-12 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-[#d4af37] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </div>

      <header className="space-y-4 pb-6 border-b border-slate-900">
        <div className="flex items-center gap-2 text-[#d4af37]">
          <Shield className="h-5 w-5" />
          <span className="text-xs uppercase tracking-widest font-bold">Legal Document</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-white">Terms of Service</h1>
        <p className="text-slate-500 text-xs sm:text-sm font-semibold">Last Updated: June 20, 2026</p>
      </header>

      <div className="mt-8 space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base font-light">
        <p>
          Welcome to SwapnilOnline.com. By accessing or using this website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use the website.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-white font-display pt-4">1. Use of Content</h2>
        <p>
          All intellectual property on this site—including framework diagrams, signature systems explanations, and written guides—is owned by Swapnil Shiwalay / Shiwalay Digital Pvt Ltd. You may view and download resources for personal, non-commercial educational use only.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-white font-display pt-4">2. Advisory Disclaimer</h2>
        <p>
          The materials on this website and shared during any complimentary consultation calls are for informational and educational purposes only. They do not guarantee specific income milestones or business transformations. Business success relies on execution, local markets, and dedication.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-white font-display pt-4">3. Governing Law</h2>
        <p>
          Any claim relating to SwapnilOnline.com shall be governed by the laws of India, without regard to its conflict of law provisions, and shall be subject to the exclusive jurisdiction of the courts in Pune, Maharashtra.
        </p>
      </div>
    </div>
  );
}
