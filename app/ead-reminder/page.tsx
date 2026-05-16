import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Bell, CheckCircle2, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "EAD Renewal Reminder — Automatic EAD Expiry Alerts",
  description: "Get automatic EAD renewal reminders at 180, 90, 60, 30, and 7 days before your Employment Authorization Document expires. Free to start.",
  keywords: ["EAD renewal reminder", "EAD expiry alert", "EAD renewal tracker", "Employment Authorization Document reminder"],
  alternates: { canonical: "https://duevisa.com/ead-reminder" },
};

const REMINDER_MILESTONES = [
  { days: 180, label: "File your I-765", desc: "The ideal time to submit your EAD renewal. Filing now maximizes your automatic extension window (up to 540 days).", urgent: false },
  { days: 90,  label: "Check case status", desc: "Verify your I-765 is received and processing. If you haven't filed, do so immediately.", urgent: false },
  { days: 60,  label: "Follow up if needed", desc: "If your receipt notice hasn't arrived, contact USCIS. Premium processing may be available.", urgent: false },
  { days: 30,  label: "Prepare for gap risk", desc: "If your renewal isn't approved and there's no automatic extension, alert your employer's HR team now.", urgent: true },
  { days: 7,   label: "Final reminder", desc: "Your EAD expires in 1 week. Confirm your automatic extension status with an immigration attorney.", urgent: true },
];

const EAD_CATEGORIES = [
  { name: "H-4 EAD", note: "Spouse of H-1B with approved I-140 — highly volatile, file early" },
  { name: "OPT EAD", note: "F-1 students — 90 days before graduation or OPT start date" },
  { name: "STEM OPT EAD", note: "24-month extension — file 90 days before OPT EAD expires" },
  { name: "Pending Green Card (I-485)", note: "Work authorization during adjustment of status" },
  { name: "Asylum-based EAD", note: "Must maintain valid asylum application" },
  { name: "TPS EAD", note: "Temporary Protected Status work authorization" },
];

export default function EadReminderPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Hero */}
          <div className="mb-16 text-center">
            <div className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: "var(--color-forest)" }}>
              <Bell size={24} style={{ color: "var(--color-lime)" }} />
            </div>
            <span className="badge badge-good mb-4 inline-flex">EAD</span>
            <h1 className="h-section mb-5" style={{ color: "var(--text-primary)" }}>
              EAD Renewal Reminder
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Your EAD is your right to work. A lapse means you can&apos;t legally work — even one day. DueVisa sends automatic reminders starting 180 days before expiry, so you always file on time.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/signup" className="btn-primary text-sm px-8 py-3 cursor-pointer">
                Set up my EAD reminder →
              </Link>
              <Link href="/ead-renewal-calculator" className="btn-secondary text-sm px-8 py-3 cursor-pointer">
                Calculate my filing date
              </Link>
            </div>
          </div>

          {/* Reminder milestones */}
          <div className="mb-16">
            <h2 className="font-bold text-2xl mb-8" style={{ color: "var(--text-primary)" }}>Your EAD reminder schedule</h2>
            <div className="space-y-4">
              {REMINDER_MILESTONES.map(({ days, label, desc, urgent }) => (
                <div key={days} className="flex gap-4 p-5 rounded-2xl" style={{ background: urgent ? "rgba(245,158,11,0.06)" : "var(--bg-card)", border: `1px solid ${urgent ? "rgba(245,158,11,0.2)" : "var(--border-default)"}` }}>
                  <div className="w-14 h-14 rounded-xl flex flex-col items-center justify-center flex-shrink-0 font-bold" style={{ background: urgent ? "rgba(245,158,11,0.15)" : "var(--bg-page-alt)", color: urgent ? "#b45309" : "var(--color-forest)" }}>
                    <span className="text-lg leading-none">{days}</span>
                    <span className="text-[10px] font-normal">days</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{label}</p>
                      {urgent && <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">Urgent</span>}
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* EAD categories */}
          <div className="mb-16">
            <h2 className="font-bold text-2xl mb-6" style={{ color: "var(--text-primary)" }}>EAD categories DueVisa tracks</h2>
            <div className="space-y-3">
              {EAD_CATEGORIES.map(({ name, note }) => (
                <div key={name} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)" }}>
                  <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-forest)" }} />
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{name}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How it works */}
          <div className="mb-10 p-6 rounded-2xl" style={{ background: "var(--bg-page-alt)", border: "1px solid var(--border-default)" }}>
            <h2 className="font-bold text-base mb-4" style={{ color: "var(--text-primary)" }}>How the automatic extension works</h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
              If you file your I-765 renewal <strong style={{ color: "var(--text-primary)" }}>before your EAD expires</strong>, USCIS may grant an automatic extension of up to 540 days while your case is pending. This means you can keep working even if your card&apos;s physical expiry date passes.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              The key: you must file on time. DueVisa&apos;s 180-day reminder is designed to give you enough runway to file before the window closes.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <Clock size={13} style={{ color: "var(--text-muted)" }} />
              <Link href="/ead-renewal-calculator" className="text-xs font-semibold underline underline-offset-2" style={{ color: "var(--color-forest)" }}>
                Calculate your exact filing date →
              </Link>
            </div>
          </div>

          {/* CTA */}
          <div className="p-8 rounded-2xl text-center" style={{ background: "var(--color-forest)" }}>
            <h2 className="font-bold text-xl mb-3" style={{ color: "#eef5f0" }}>Set up your EAD reminder in 3 minutes.</h2>
            <p className="text-sm mb-6" style={{ color: "rgba(238,245,240,0.7)" }}>
              Add your EAD expiry date once. DueVisa handles every reminder automatically. Free for up to 3 documents.
            </p>
            <Link href="/signup" className="btn-primary-lime text-sm px-8 py-3 cursor-pointer inline-block">
              Start free →
            </Link>
          </div>

          <div className="mt-6 p-4 rounded-xl" style={{ background: "var(--bg-page-alt)" }}>
            <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
              This page is for informational purposes only. EAD automatic extension eligibility varies by category. Consult a licensed immigration attorney for advice specific to your situation.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
