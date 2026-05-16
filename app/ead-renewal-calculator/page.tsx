"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Calculator, AlertTriangle, CheckCircle2 } from "lucide-react";

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function subtractDays(date: Date, days: number) {
  return addDays(date, -days);
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function EadCalculatorPage() {
  const [expiryInput, setExpiryInput] = useState("");

  const expiryDate = expiryInput ? new Date(expiryInput + "T12:00:00") : null;
  const today = new Date();

  const filingDeadline   = expiryDate ? subtractDays(expiryDate, 180) : null;
  const reminder90       = expiryDate ? subtractDays(expiryDate, 90) : null;
  const reminder30       = expiryDate ? subtractDays(expiryDate, 30) : null;
  const daysUntilExpiry  = expiryDate ? Math.floor((expiryDate.getTime() - today.getTime()) / 86400000) : null;
  const daysUntilFiling  = filingDeadline ? Math.floor((filingDeadline.getTime() - today.getTime()) / 86400000) : null;

  const isFilingPast = daysUntilFiling !== null && daysUntilFiling < 0;
  const isExpired    = daysUntilExpiry !== null && daysUntilExpiry < 0;
  const isUrgent     = daysUntilExpiry !== null && daysUntilExpiry >= 0 && daysUntilExpiry <= 90;

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
              EAD Renewal Calculator
            </h1>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Enter your EAD expiry date and instantly see when you should file, when to expect your first reminder, and whether you&apos;re in the danger zone.
            </p>
          </div>

          {/* Calculator */}
          <div className="p-8 rounded-2xl mb-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)" }}>
            <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
              Your EAD expiry date
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

            {expiryDate && (
              <div className="mt-6 space-y-3">
                {/* Status banner */}
                {isExpired && (
                  <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}>
                    <AlertTriangle size={16} className="flex-shrink-0 mt-0.5 text-red-500" />
                    <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                      Your EAD expired {Math.abs(daysUntilExpiry!)} days ago. Consult an immigration attorney immediately.
                    </p>
                  </div>
                )}
                {isUrgent && !isExpired && (
                  <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)" }}>
                    <AlertTriangle size={16} className="flex-shrink-0 mt-0.5 text-amber-500" />
                    <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">
                      Your EAD expires in {daysUntilExpiry} days — this is urgent. {isFilingPast ? "You are past the ideal filing window." : "File your I-765 now."}
                    </p>
                  </div>
                )}
                {!isUrgent && !isExpired && (
                  <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "rgba(10,92,74,0.08)", border: "1px solid rgba(10,92,74,0.2)" }}>
                    <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-forest)" }} />
                    <p className="text-sm font-medium" style={{ color: "var(--color-forest)" }}>
                      Your EAD expires in {daysUntilExpiry} days. {daysUntilFiling! > 0 ? `File in ${daysUntilFiling} days.` : "You should be filing now."}
                    </p>
                  </div>
                )}

                {/* Key dates */}
                <div className="space-y-2 pt-2">
                  {[
                    { label: "File your I-765 (180 days out)", date: filingDeadline!, days: daysUntilFiling!, crit: true },
                    { label: "90-day reminder", date: reminder90!, days: daysUntilExpiry! - 90, crit: false },
                    { label: "30-day final reminder", date: reminder30!, days: daysUntilExpiry! - 30, crit: false },
                    { label: "EAD expiry", date: expiryDate, days: daysUntilExpiry!, crit: true },
                  ].map(({ label, date, days, crit }) => (
                    <div key={label} className="flex items-center justify-between py-3 px-4 rounded-xl" style={{ background: "var(--bg-page-alt)" }}>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: crit ? "var(--text-primary)" : "var(--text-secondary)" }}>{label}</p>
                        <p className="text-xs font-mono mt-0.5" style={{ color: "var(--text-muted)" }}>{formatDate(date)}</p>
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${days < 0 ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : days <= 30 ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-page text-muted"}`} style={days >= 0 && days > 30 ? { background: "var(--bg-page)", color: "var(--text-muted)" } : {}}>
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
            <h2 className="font-bold text-base mb-3" style={{ color: "var(--text-primary)" }}>How the 180-day rule works</h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
              USCIS recommends filing Form I-765 at least 180 days before your EAD expires. Filing early maximizes your automatic extension window — which can extend your work authorization up to 540 days while USCIS processes your renewal.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              If you file after your EAD expires, you may have a gap in work authorization. A gap means you cannot legally work — which can have serious HR and tax consequences.
            </p>
          </div>

          {/* CTA */}
          <div className="p-8 rounded-2xl text-center" style={{ background: "var(--color-forest)" }}>
            <h2 className="font-bold text-xl mb-3" style={{ color: "#eef5f0" }}>Never calculate this manually again.</h2>
            <p className="text-sm mb-6" style={{ color: "rgba(238,245,240,0.7)" }}>
              DueVisa tracks your EAD automatically and sends reminders at 180, 90, 60, 30, and 7 days before expiry. Free for up to 3 documents.
            </p>
            <Link href="/signup" className="btn-primary-lime text-sm px-8 py-3 cursor-pointer inline-block">
              Start tracking free →
            </Link>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 p-4 rounded-xl" style={{ background: "var(--bg-page-alt)" }}>
            <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
              This calculator is for informational purposes only. Filing timelines may vary based on your visa category and USCIS processing times. Consult a licensed immigration attorney for advice specific to your situation.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
