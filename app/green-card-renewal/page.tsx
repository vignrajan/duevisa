import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2, Clock, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Green Card Renewal Tracker — Track I-551 Expiry and I-751 Deadlines",
  description: "Track your green card (I-551) renewal, I-751 conditions removal, and citizenship eligibility automatically. Never let your green card lapse.",
  keywords: ["green card renewal tracker", "I-551 expiry reminder", "I-751 deadline", "green card renewal reminder"],
  alternates: { canonical: "https://duevisa.com/green-card-renewal" },
};

const DOCUMENTS = [
  { name: "Green Card (I-551)", lead: "180 days", note: "File Form I-90 6 months before expiry — your status doesn't expire, but your card does" },
  { name: "I-751 (Remove Conditions)", lead: "90-day window", note: "Must file within 90 days before your 2-year conditional card expires — strict window" },
  { name: "Home Country Passport", lead: "270 days", note: "Keep valid for international travel even as a permanent resident" },
  { name: "Re-entry Permit", lead: "Apply before travel", note: "Required if planning to be outside the US for 1 year or more" },
  { name: "N-400 Citizenship Eligibility", lead: "90 days", note: "You can apply 90 days before your 5-year (or 3-year for spouse of US citizen) anniversary" },
];

export default function GreenCardRenewalPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Hero */}
          <div className="mb-16 text-center">
            <span className="badge badge-good mb-4 inline-flex">Green Card</span>
            <h1 className="h-section mb-5" style={{ color: "var(--text-primary)" }}>
              Green Card Renewal Tracker
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Your status as a Lawful Permanent Resident never expires — but your green card does. And the I-751 window for conditional residents is only 90 days. DueVisa tracks every deadline automatically.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/signup" className="btn-primary text-sm px-8 py-3 cursor-pointer">
                Start tracking free →
              </Link>
              <Link href="/blog/green-card-renewal-guide" className="btn-secondary text-sm px-8 py-3 cursor-pointer">
                Read the renewal guide
              </Link>
            </div>
          </div>

          {/* Important note */}
          <div className="mb-10 flex items-start gap-3 p-5 rounded-2xl" style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)" }}>
            <AlertTriangle size={18} className="flex-shrink-0 mt-0.5 text-amber-500" />
            <div>
              <p className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-1">The I-751 window is strict</p>
              <p className="text-sm text-amber-700/80 dark:text-amber-400/80">If you have a 2-year conditional green card, you must file Form I-751 within the 90-day window before expiry — not earlier, not later. Missing this window requires an explanation and can complicate your case significantly.</p>
            </div>
          </div>

          {/* Documents */}
          <div className="mb-16">
            <h2 className="font-bold text-2xl mb-6" style={{ color: "var(--text-primary)" }}>Deadlines green card holders should track</h2>
            <div className="space-y-3">
              {DOCUMENTS.map(({ name, lead, note }) => (
                <div key={name} className="flex items-start justify-between gap-4 p-5 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)" }}>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-forest)" }} />
                    <div>
                      <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{name}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{note}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <Clock size={12} style={{ color: "var(--text-muted)" }} />
                    <span className="text-xs font-semibold" style={{ color: "var(--color-forest)" }}>{lead}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Processing note */}
          <div className="mb-10 p-6 rounded-2xl" style={{ background: "var(--bg-page-alt)", border: "1px solid var(--border-default)" }}>
            <h2 className="font-bold text-base mb-3" style={{ color: "var(--text-primary)" }}>Standard I-90 processing times</h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
              USCIS currently processes Form I-90 (green card renewal) in <strong style={{ color: "var(--text-primary)" }}>8–24 months</strong>. While your case is pending, your I-90 receipt notice serves as proof of your continued Lawful Permanent Resident status for up to 24 months.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              You may file Form I-90 up to 6 months before your card expires. USCIS does not penalise early filing — your new card&apos;s validity is calculated from the date of approval, not the date you filed.
            </p>
          </div>

          {/* CTA */}
          <div className="p-8 rounded-2xl text-center" style={{ background: "var(--color-forest)" }}>
            <h2 className="font-bold text-xl mb-3" style={{ color: "#eef5f0" }}>Track your green card automatically.</h2>
            <p className="text-sm mb-6" style={{ color: "rgba(238,245,240,0.7)" }}>
              DueVisa sends your first green card reminder 180 days before expiry — and alerts you as the I-751 window opens. Free for up to 3 documents.
            </p>
            <Link href="/signup" className="btn-primary-lime text-sm px-8 py-3 cursor-pointer inline-block">
              Start tracking free →
            </Link>
          </div>

          <div className="mt-6 p-4 rounded-xl" style={{ background: "var(--bg-page-alt)" }}>
            <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
              This page is for informational purposes only. Consult a licensed immigration attorney for advice specific to your situation.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
