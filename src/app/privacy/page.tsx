import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPage() {
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
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-white">Privacy Policy</h1>
        <p className="text-slate-500 text-xs sm:text-sm font-semibold">Last Updated: June 20, 2026</p>
      </header>

      <div className="mt-8 space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base font-light">
        <p>
          At SwapnilOnline.com, the privacy of our visitors is of extreme importance to us. This Privacy Policy document outlines the types of personal information received and collected by SwapnilOnline.com and how it is used.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-white font-display pt-4">1. Collection of Information</h2>
        <p>
          We collect personal identification information from Users only if they voluntarily submit such information to us. Users can refuse to supply personally identification information, except that it may prevent them from engaging in certain Site-related activities (such as applying for a diagnostic call or subscribing to our newsletter).
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-white font-display pt-4">2. Use of Information</h2>
        <p>
          SwapnilOnline.com may collect and use Users personal information for the following purposes:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>To qualify advisory session requests:</strong> The business answers provided in the contact application are analyzed to make sure of business alignment before a consultation is booked.</li>
          <li><strong>To send periodic emails:</strong> We may use the email address to send User information and updates pertaining to their order or subscription. It may also be used to respond to their inquiries, questions, and/or other requests.</li>
        </ul>

        <h2 className="text-lg sm:text-xl font-bold text-white font-display pt-4">3. Data Security Policy</h2>
        <p>
          We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, transaction information, and data stored on our Site.
        </p>
      </div>
    </div>
  );
}
