import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin, Layers, Calendar, CheckSquare, ShieldCheck } from "lucide-react";

export default function ContactPage() {
  const contactDetails = [
    {
      icon: Mail,
      title: "Direct Email",
      content: "contact@swapnilonline.com",
      href: "mailto:contact@swapnilonline.com",
    },
    {
      icon: Phone,
      title: "Connect via WhatsApp",
      content: "Chat with Advisory Team",
      href: "https://wa.me/919876543210",
    },
    {
      icon: MapPin,
      title: "Operational Base",
      content: "Pune, India / Global Consulting",
      href: "#",
    },
  ];

  return (
    <div className="py-12 pb-20 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-indigo-900/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase tracking-widest text-indigo-500 font-bold">
            Connect
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold font-display text-white">
            Schedule a <span className="gold-gradient-text">Strategy Session</span>
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed font-light">
            Have a project or partnership opportunity? Fill out the qualification application to unlock the Calendly scheduling portal.
          </p>
        </div>

        {/* CONTENT SPLIT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="glass-panel p-8 text-center text-slate-400">Loading Form...</div>}>
              <ContactForm />
            </Suspense>
          </div>

          {/* Right Column: Details & Calendly Instructions */}
          <div className="lg:col-span-5 space-y-8">
            {/* Qualification flow details */}
            <div className="glass-panel border-slate-800 rounded-xl p-6 space-y-6">
              <h3 className="text-white font-bold text-lg font-display flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#d4af37]" /> The Ecosystem Booking Flow
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/35 flex items-center justify-center text-[#d4af37] text-xs font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-semibold">Submit Qualification Details</h4>
                    <p className="text-slate-400 text-xs sm:text-sm mt-0.5 leading-relaxed">
                      Provide details about your current business revenue, business model, and primary challenges.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/35 flex items-center justify-center text-[#d4af37] text-xs font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-semibold">Triage Audit Check</h4>
                    <p className="text-slate-400 text-xs sm:text-sm mt-0.5 leading-relaxed">
                      Our system automatically parses details. Qualified applications are instantly routed to the booking scheduler page.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/35 flex items-center justify-center text-[#d4af37] text-xs font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-semibold">Diagnostic Call</h4>
                    <p className="text-slate-400 text-xs sm:text-sm mt-0.5 leading-relaxed">
                      We meet on Zoom for 20 minutes to review your system, map out bottlenecks, and design a customized strategy blueprint.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Details */}
            <div className="space-y-4">
              {contactDetails.map((detail, idx) => {
                const Icon = detail.icon;
                return (
                  <a
                    key={idx}
                    href={detail.href}
                    className="glass-panel hover:bg-[#0d1e36]/30 rounded-xl p-4 flex items-center gap-4 transition-all duration-300 group"
                  >
                    <div className="h-10 w-10 rounded-lg bg-[#d4af37]/5 border border-[#d4af37]/15 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37]/15 transition-all">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold">
                        {detail.title}
                      </p>
                      <p className="text-white text-sm font-semibold mt-0.5">
                        {detail.content}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Guarantee footer */}
            <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-[#d4af37] shrink-0 mt-0.5" />
              <p className="text-slate-400 text-xs leading-normal">
                <strong>Confidentiality Guarantee:</strong> All information shared in your application is strictly private and used only to evaluate your digital business structure. We never share details with external parties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
