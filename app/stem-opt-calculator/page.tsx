"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Calculator, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function addMonths(date: Date, months: number) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function StemOptCalculatorPage() {
  const [expiryInput, setExpiryInput] = useState("");

  const optExpiry = expiryInput ? new Date(expiryInput + "T12:00:00") : null;
  const today = new Date();

  const windowOpens   = optExpiry ? addDays(optExpiry, -90) : null;   // earliest to file
  const filingDeadline = optExpiry;                                    // must file before OPT EAD expires
  const pendingWorkEnd = optExpiry ? addDays(optExpiry, 180) : null;   // 180-day work auth while pending
  const stemEnd        = optExpiry ? addMonths(optExpiry, 24) : null;  // 24-month extension end

  const daysUntilExpiry   = optExpiry ? Math.floor((optExpiry.getTime() - today.getTime()) / 86400000) : null;
  const daysUntilWindow   = windowOpens ? Math.floor((windowOpens.getTime() - today.getTime()) / 86400000) : null;

  const isExpired   = daysUntilExpiry !== null && daysUntilExpiry < 0;
  const windowOpen  = daysUntilWindow !== null && daysUntilWindow <= 0 && !isExpired;
  const windowNotYet = daysUntilWindow !== null && daysUntilWindow > 0;

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Hero */}
          <div className="mb-12 text-center">
            <div className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: "var(--color-forest)" }}>
              <Calculator size={24} style={{ color: "var(--color-lime)" }} />
            </div>
            <span className="badge badge-good mb-4 inline-flex">Free tool</span>
            <h1 className="h-section mb-4" style={{ color: "var(--text-primary)" }}>
              STEM OPT Extension Calculator
            </h1>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Enter your current OPT EAD expiry date and instantly see your 90-day STEM OPT filing window, the last day you can file, and when your 24-month extension ends.
            </p>
          </div>

          {/* Calculator */}
          <div className="p-8 rounded-2xl mb-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)" }}>
            <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
              Your current OPT EAD expiry date
            </label>
            <input
              type="date"
              value={expiryInput}
              onChange={e => setExpiryInput(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border text-sm font-mono transition-all focus:outline-none"
              style={{
                background: "var(--bg-page)",
                border: "1px solid var(--border-default)",
                color: "var(--text-primary)",
              }}
            />

            {optExpiry && (
              <div className="mt-6 space-y-3">
                {/* Status banner */}
                {isExpired && (
                  <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}>
                    <AlertTriangle size={16} className="flex-shrink-0 mt-0.5 text-red-500" />
                    <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                      Your OPT EAD expired {Math.abs(daysUntilExpiry!)} days ago. The STEM OPT filing window has closed — you must have filed before expiry. Consult your DSO and an immigration attorney immediately.
                    </p>
                  </div>
                )}
                {windowOpen && (
                  <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)" }}>
                    <AlertTriangle size={16} className="flex-shrink-0 mt-0.5 text-amber-500" />
                    <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">
                      Your filing window is OPEN. You have {daysUntilExpiry} days until your OPT EAD expires — file Form I-765 for the STEM extension now, and get your I-983 signed by your employer.
                    </p>
                  </div>
                )}
                {windowNotYet && (
                  <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "rgba(10,92,74,0.08)", border: "1px solid rgba(10,92,74,0.2)" }}>
                    <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-forest)" }} />
                    <p className="text-sm font-medium" style={{ color: "var(--color-forest)" }}>
                      Your STEM OPT filing window opens in {daysUntilWindow} days. Start preparing your I-983 training plan with your employer now.
                    </p>
                  </div>
                )}

                {/* Key dates */}
                <div className="space-y-2 pt-2">
                  {[
                    { label: "Filing window opens (90 days before)", date: windowOpens!, days: daysUntilWindow!, crit: true, icon: Clock },
                    { label: "Last day to file (OPT EAD expiry)", date: filingDeadline!, days: daysUntilExpiry!, crit: true, icon: AlertTriangle },
                    { label: "180-day work window ends (if pending)", date: pendingWorkEnd!, days: daysUntilExpiry! + 180, crit: false, icon: Clock },
                    { label: "STEM OPT extension ends (24 months)", date: stemEnd!, days: Math.floor((stemEnd!.getTime() - today.getTime()) / 86400000), crit: true, icon: CheckCircle2 },
                  ].map(({ label, date, days, crit }) => (
                    <div key={label} className="flex items-center justify-between py-3 px-4 rounded-xl" style={{ background: "var(--bg-page-alt)" }}>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: crit ? "var(--text-primary)" : "var(--text-secondary)" }}>{label}</p>
                        <p className="text-xs font-mono mt-0.5" style={{ color: "var(--text-muted)" }}>{formatDate(date)}</p>
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${days < 0 ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : days <= 30 ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : ""}`} style={days >= 0 && days > 30 ? { background: "var(--bg-page)", color: "var(--text-muted)" } : {}}>
                        {days < 0 ? `${Math.abs(days)}d ago` : days === 0 ? "Today" : `in ${days}d`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* How it works */}
          <div className="p-6 rounded-2xl mb-8" style={{ background: "var(--bg-page-alt)", border: "1px solid var(--border-default)" }}>
            <h2 className="font-bold text-base mb-3" style={{ color: "var(--text-primary)" }}>How the STEM OPT window works</h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
              You must file Form I-765 for the 24-month STEM OPT extension during the 90 days before your current OPT EAD expires — and USCIS must receive it before the expiry date. You also need a completed Form I-983 training plan signed by your E-Verify employer, and a STEM OPT I-20 from your DSO.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              If you file on time, you can keep working for up to 180 days while USCIS processes the extension. Miss the window and you lose the extension entirely.{" "}
              <Link href="/blog/stem-opt-extension-guide" className="font-semibold underline" style={{ color: "var(--color-forest)" }}>Read the full STEM OPT guide →</Link>
            </p>
          </div>

          {/* CTA */}
          <div className="p-8 rounded-2xl text-center" style={{ background: "var(--color-forest)" }}>
            <h2 className="font-bold text-xl mb-3" style={{ color: "#eef5f0" }}>Never miss a STEM OPT deadline.</h2>
            <p className="text-sm mb-6" style={{ color: "rgba(238,245,240,0.7)" }}>
              DueVisa tracks your OPT expiry, STEM filing window, and the 6-month validation reports — with reminders before each. Free for up to 3 documents.
            </p>
            <Link href="/signup" className="btn-primary-lime text-sm px-8 py-3 cursor-pointer inline-block">
              Start tracking free →
            </Link>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 p-4 rounded-xl" style={{ background: "var(--bg-page-alt)" }}>
            <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
              This calculator is for informational purposes only. Your exact filing window depends on your I-20 dates and your DSO&apos;s SEVIS recommendation. Confirm all dates with your DSO and on uscis.gov, and consult a licensed immigration attorney for advice specific to your situation.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
