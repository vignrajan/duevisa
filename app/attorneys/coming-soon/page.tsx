import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Bell, Scale, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Attorney Profile — Coming Soon | DueVisa",
  description:
    "Full attorney profiles with reviews, contact, and booking are launching soon on DueVisa.",
};

export default function AttorneyComingSoonPage() {
  return (
    <div className="min-h-screen bg-card-bg">
      <Navbar />

      <main className="flex flex-col items-center justify-center min-h-screen px-4 pt-20 pb-24">
        {/* Animated glow orb */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(10,92,74,0.04) 0%, rgba(200,245,98,0.04) 40%, transparent 70%)",
            filter: "blur(40px)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-xl w-full text-center">
          {/* Icon */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl bg-[#F0F4EF] border border-[#C8D4C4] flex items-center justify-center shadow-sm">
                <Scale size={40} className="text-forest" />
              </div>
              {/* Sparkle badges */}
              <span className="absolute -top-2 -right-2 w-8 h-8 bg-card-bg border border-border-default shadow-sm rounded-full flex items-center justify-center">
                <Sparkles size={14} className="text-forest" />
              </span>
            </div>
          </div>

          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#F0F4EF] text-forest rounded-full text-xs font-bold tracking-wide uppercase mb-8 border border-[#C8D4C4] shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest opacity-50" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-forest" />
            </span>
            In Development
          </span>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-6 leading-tight tracking-tight">
            Attorney Profiles
            <br />
            <span className="text-forest">Coming Soon</span>
          </h1>

          <p className="text-lg mb-12 leading-relaxed text-text-secondary font-medium">
            We're building full attorney profile pages with verified
            reviews, direct booking, and case history. You'll be able to
            connect with the right attorney in seconds.
          </p>

          {/* Feature teasers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 text-left">
            {[
              { label: "Verified Profiles", desc: "Bar-certified, background-checked" },
              { label: "Direct Booking", desc: "Schedule consultations instantly" },
              { label: "Case Reviews", desc: "Real outcomes from real clients" },
            ].map((item) => (
              <div key={item.label} className="bg-card-bg border border-border-default rounded-2xl p-5 text-center shadow-sm">
                <p className="font-bold text-text-primary text-sm mb-2 tracking-tight">{item.label}</p>
                <p className="text-text-secondary text-xs leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Notify CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/attorneys"
              className="px-6 py-3.5 rounded-xl border border-border-default text-text-primary font-bold hover:bg-card-elevated transition-colors flex items-center gap-2 text-sm shadow-sm"
              id="back-to-attorneys-btn"
            >
              <ArrowLeft size={16} />
              Back to Attorneys
            </Link>
            <Link
              href="/signup"
              className="px-6 py-3.5 rounded-xl bg-forest text-white font-bold hover:bg-forest-dark transition-colors flex items-center gap-2 text-sm shadow-sm"
              id="notify-me-btn"
            >
              <Bell size={16} />
              Get Notified at Launch
            </Link>
          </div>

          {/* Fine print */}
          <p className="text-text-muted text-xs mt-10 font-bold tracking-widest uppercase">
            Launching Q3 2026 · DueVisa Attorney Directory
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
