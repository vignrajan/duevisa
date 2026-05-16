import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2, Clock, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "F-1 OPT Tracker — Track OPT EAD and STEM OPT Deadlines",
  description: "Track your F-1 OPT EAD, STEM OPT extension, I-20, and visa stamp deadlines automatically. Get reminders before every critical F-1 deadline.",
  keywords: ["F-1 OPT tracker", "STEM OPT deadline", "OPT EAD reminder", "F-1 student visa tracker"],
  alternates: { canonical: "https://duevisa.com/f1-opt-tracker" },
};

const DOCUMENTS = [
  { name: "F-1 Visa Stamp", lead: "90 days before travel", note: "Required for international re-entry — can be expired inside the US" },
  { name: "I-20 Program End Date", lead: "120 days", note: "Contact your DSO to extend if needed before this date" },
  { name: "OPT EAD", lead: "150 days", note: "Apply 90 days before graduation; USCIS takes up to 90 days to process" },
  { name: "STEM OPT Extension EAD", lead: "120 days", note: "File before your OPT EAD expires; requires E-Verify employer" },
  { name: "Passport", lead: "270 days", note: "Must be valid for the duration of your program and travel" },
  { name: "SEVIS Registration", lead: "As needed", note: "Maintained by your DSO — never take unauthorized breaks in enrollment" },
];

export default function F1OptTrackerPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Hero */}
          <div className="mb-16 text-center">
            <div className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: "var(--color-forest)" }}>
              <GraduationCap size={24} style={{ color: "var(--color-lime)" }} />
            </div>
            <span className="badge badge-good mb-4 inline-flex">F-1 / OPT</span>
            <h1 className="h-section mb-5" style={{ color: "var(--text-primary)" }}>
              F-1 OPT Deadline Tracker
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              F-1 students manage more immigration deadlines than almost any other visa holder. DueVisa tracks all six — OPT EAD, STEM OPT, I-20, visa stamp, passport, and more — with the right lead times pre-configured.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/signup" className="btn-primary text-sm px-8 py-3 cursor-pointer">
                Start tracking free →
              </Link>
              <Link href="/blog/f1-student-immigration-checklist" className="btn-secondary text-sm px-8 py-3 cursor-pointer">
                Read the F-1 checklist
              </Link>
            </div>
          </div>

          {/* Documents */}
          <div className="mb-16">
            <h2 className="font-bold text-2xl mb-6" style={{ color: "var(--text-primary)" }}>Every F-1 deadline, tracked</h2>
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

          {/* OPT timing note */}
          <div className="mb-10 p-6 rounded-2xl" style={{ background: "var(--bg-page-alt)", border: "1px solid var(--border-default)" }}>
            <h2 className="font-bold text-base mb-3" style={{ color: "var(--text-primary)" }}>The OPT application window</h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
              You can apply for OPT up to <strong style={{ color: "var(--text-primary)" }}>90 days before graduation</strong> and no later than <strong style={{ color: "var(--text-primary)" }}>60 days after</strong>. USCIS processing takes up to 90 days, so file as early as possible.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              For STEM OPT, you must apply before your OPT EAD expires and must be employed by an E-Verify employer. DueVisa tracks both deadlines separately.
            </p>
          </div>

          {/* CTA */}
          <div className="p-8 rounded-2xl text-center" style={{ background: "var(--color-forest)" }}>
            <h2 className="font-bold text-xl mb-3" style={{ color: "#eef5f0" }}>Track all your F-1 deadlines in one place.</h2>
            <p className="text-sm mb-6" style={{ color: "rgba(238,245,240,0.7)" }}>
              All 6 F-1 documents, pre-configured with the right reminder timelines. Free for up to 3 documents.
            </p>
            <Link href="/signup" className="btn-primary-lime text-sm px-8 py-3 cursor-pointer inline-block">
              Start free →
            </Link>
          </div>

          <div className="mt-6 p-4 rounded-xl" style={{ background: "var(--bg-page-alt)" }}>
            <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
              This page is for informational purposes only. Consult your DSO or a licensed immigration attorney for advice specific to your situation.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
