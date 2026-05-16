import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2, Clock, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "H-1B Renewal Deadline Tracker — Never Miss Your H-1B Extension",
  description: "Track your H-1B renewal deadline automatically. Get reminders at 180, 90, 60, 30, and 7 days before your I-797 expires. Free to start.",
  keywords: ["H-1B renewal tracker", "H-1B deadline reminder", "I-797 expiry tracker", "H-1B extension deadline"],
  alternates: { canonical: "https://duevisa.com/h1b-renewal-tracker" },
};

const TIMELINE = [
  { days: 180, label: "Alert your employer", desc: "Contact your immigration attorney and start gathering LCA documentation." },
  { days: 120, label: "LCA filing", desc: "Your employer files a new Labor Condition Application with the Department of Labor. Takes ~7 business days." },
  { days: 90,  label: "File I-129", desc: "Your employer submits the H-1B extension petition. Consider premium processing if you're close to your deadline." },
  { days: 60,  label: "Confirm receipt", desc: "Verify USCIS receipt notice. Track your case status at uscis.gov/case-status." },
  { days: 30,  label: "Final check", desc: "Confirm case is still pending or approved. Do not travel internationally until extension is approved." },
  { days: 0,   label: "I-797 expiry", desc: "Your current petition expires. With cap-gap protection, you may continue working if your extension is filed and pending." },
];

const DOCUMENTS = [
  { name: "I-797 Approval Notice", lead: "180 days", note: "Most critical — tracks your petition expiry" },
  { name: "I-94 Authorized Stay", lead: "180 days", note: "May differ from I-797 — check i94.cbp.dhs.gov" },
  { name: "H-1B Visa Stamp", lead: "90 days", note: "Required for re-entry after international travel" },
  { name: "Passport", lead: "270 days", note: "Must be valid for the duration of your status" },
  { name: "EAD (if applicable)", lead: "180 days", note: "H-4 EAD holders should track separately" },
];

export default function H1bTrackerPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Hero */}
          <div className="mb-16 text-center">
            <span className="badge badge-good mb-4 inline-flex">H-1B</span>
            <h1 className="h-section mb-5" style={{ color: "var(--text-primary)" }}>
              H-1B Renewal Deadline Tracker
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Your H-1B renewal window opens 6 months before your I-797 expires — and most employers need every day of it. DueVisa tracks your countdown and alerts you at every critical milestone.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/signup" className="btn-primary text-sm px-8 py-3 cursor-pointer">
                Start tracking free →
              </Link>
              <Link href="/blog/h1b-renewal-timeline" className="btn-secondary text-sm px-8 py-3 cursor-pointer">
                Read the H-1B guide
              </Link>
            </div>
          </div>

          {/* Warning */}
          <div className="mb-10 flex items-start gap-3 p-5 rounded-2xl" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)" }}>
            <AlertTriangle size={18} className="flex-shrink-0 mt-0.5 text-amber-500" />
            <div>
              <p className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-1">Don&apos;t wait until 60 days out</p>
              <p className="text-sm text-amber-700/80 dark:text-amber-400/80">Standard USCIS processing takes 3–6 months. If your employer hasn&apos;t started your renewal at the 180-day mark, you&apos;re already late. Premium processing (Form I-907) costs $2,805 but can save your status.</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-16">
            <h2 className="font-bold text-2xl mb-8" style={{ color: "var(--text-primary)" }}>The H-1B renewal timeline</h2>
            <div className="space-y-4">
              {TIMELINE.map(({ days, label, desc }) => (
                <div key={days} className="flex gap-5">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm font-mono" style={{ background: days === 0 ? "var(--color-forest)" : "var(--bg-card)", border: "1px solid var(--border-default)", color: days === 0 ? "var(--color-lime)" : "var(--text-primary)" }}>
                      {days === 0 ? "Day 0" : `-${days}d`}
                    </div>
                    {days !== 0 && <div className="w-px flex-1 mt-2" style={{ background: "var(--border-subtle)", minHeight: "1.5rem" }} />}
                  </div>
                  <div className="pb-6">
                    <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>{label}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documents to track */}
          <div className="mb-16">
            <h2 className="font-bold text-2xl mb-6" style={{ color: "var(--text-primary)" }}>Documents H-1B workers should track</h2>
            <div className="space-y-3">
              {DOCUMENTS.map(({ name, lead, note }) => (
                <div key={name} className="flex items-start justify-between gap-4 p-4 rounded-xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)" }}>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-forest)" }} />
                    <div>
                      <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{name}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{note}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <Clock size={12} style={{ color: "var(--text-muted)" }} />
                    <span className="text-xs font-mono font-semibold" style={{ color: "var(--color-forest)" }}>{lead}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="p-8 rounded-2xl text-center" style={{ background: "var(--color-forest)" }}>
            <h2 className="font-bold text-xl mb-3" style={{ color: "#eef5f0" }}>Track all of this automatically.</h2>
            <p className="text-sm mb-6" style={{ color: "rgba(238,245,240,0.7)" }}>
              Add your I-797, I-94, visa stamp, and passport. DueVisa sends reminders at every critical milestone. Free for up to 3 documents.
            </p>
            <Link href="/signup" className="btn-primary-lime text-sm px-8 py-3 cursor-pointer inline-block">
              Start tracking free →
            </Link>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 p-4 rounded-xl" style={{ background: "var(--bg-page-alt)" }}>
            <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
              This page is for informational purposes only and does not constitute legal advice. Consult a licensed immigration attorney for advice specific to your situation.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
