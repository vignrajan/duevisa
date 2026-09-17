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

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function I751CalculatorPage() {
  const [expiryInput, setExpiryInput] = useState("");

  const cardExpiry = expiryInput ? new Date(expiryInput + "T12:00:00") : null;
  const today = new Date();

  const windowOpens    = cardExpiry ? addDays(cardExpiry, -90) : null; // earliest to file (joint)
  const filingDeadline = cardExpiry;                                   // file before expiry

  const daysUntilExpiry = cardExpiry ? Math.floor((cardExpiry.getTime() - today.getTime()) / 86400000) : null;
  const daysUntilWindow = windowOpens ? Math.floor((windowOpens.getTime() - today.getTime()) / 86400000) : null;

  const isExpired    = daysUntilExpiry !== null && daysUntilExpiry < 0;
  const windowOpen   = daysUntilWindow !== null && daysUntilWindow <= 0 && !isExpired;
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
              I-751 Filing Window Calculator
            </h1>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Enter your 2-year conditional green card expiry date and instantly see your 90-day I-751 filing window — the first and last day to file to remove conditions on residence.
            </p>
          </div>

          {/* Calculator */}
          <div className="p-8 rounded-2xl mb-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)" }}>
            <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
              Your conditional green card expiry date
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

            {cardExpiry && (
              <div className="mt-6 space-y-3">
                {/* Status banner */}
                {isExpired && (
                  <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}>
                    <AlertTriangle size={16} className="flex-shrink-0 mt-0.5 text-red-500" />
                    <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                      Your conditional card expired {Math.abs(daysUntilExpiry!)} days ago. If you have not filed Form I-751, contact an immigration attorney immediately — you may still be able to file late with a written explanation of good cause.
                    </p>
                  </div>
                )}
                {windowOpen && (
                  <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)" }}>
                    <AlertTriangle size={16} className="flex-shrink-0 mt-0.5 text-amber-500" />
                    <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">
                      Your filing window is OPEN. You have {daysUntilExpiry} days until your card expires — file Form I-751 now to remove conditions.
                    </p>
                  </div>
                )}
                {windowNotYet && (
                  <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "rgba(10,92,74,0.08)", border: "1px solid rgba(10,92,74,0.2)" }}>
                    <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-forest)" }} />
                    <p className="text-sm font-medium" style={{ color: "var(--color-forest)" }}>
                      Your I-751 filing window opens in {daysUntilWindow} days. Start gathering your bona-fide-marriage evidence now (joint accounts, lease, tax returns, photos).
                    </p>
                  </div>
                )}

                {/* Key dates */}
                <div className="space-y-2 pt-2">
                  {[
                    { label: "Filing window opens (90 days before)", date: windowOpens!, days: daysUntilWindow!, crit: true },
                    { label: "Last day to file (card expiry)", date: filingDeadline!, days: daysUntilExpiry!, crit: true },
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

                {/* Waiver note */}
                <div className="flex items-start gap-3 p-4 rounded-xl mt-2" style={{ background: "var(--bg-page)", border: "1px solid var(--border-default)" }}>
                  <Clock size={16} className="flex-shrink-0 mt-0.5" style={{ color: "var(--text-muted)" }} />
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    <strong style={{ color: "var(--text-primary)" }}>Filing with a waiver?</strong> If you are filing with a waiver of the joint-filing requirement (e.g. after divorce, or due to abuse), the 90-day window does <strong>not</strong> apply — you can file at any time. The dates above are for joint petitions filed by both spouses.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* How it works */}
          <div className="p-6 rounded-2xl mb-8" style={{ background: "var(--bg-page-alt)", border: "1px solid var(--border-default)" }}>
            <h2 className="font-bold text-base mb-3" style={{ color: "var(--text-primary)" }}>How the I-751 90-day window works</h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
              If you hold a 2-year conditional green card, you (and your spouse, for a joint petition) must file Form I-751 during the 90 days immediately before the card expires. Filing on time extends your permanent resident status automatically via a receipt notice while USCIS processes the case.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Missing the window can lead to loss of status and removal proceedings.{" "}
              <Link href="/blog/i751-removal-of-conditions" className="font-semibold underline" style={{ color: "var(--color-forest)" }}>Read the full I-751 guide →</Link>
            </p>
          </div>

          {/* CTA */}
          <div className="p-8 rounded-2xl text-center" style={{ background: "var(--color-forest)" }}>
            <h2 className="font-bold text-xl mb-3" style={{ color: "#eef5f0" }}>Never miss your I-751 window.</h2>
            <p className="text-sm mb-6" style={{ color: "rgba(238,245,240,0.7)" }}>
              DueVisa opens your I-751 reminder exactly 90 days before your conditional card expires, so you file squarely inside the window. Free for up to 3 documents.
            </p>
            <Link href="/signup" className="btn-primary-lime text-sm px-8 py-3 cursor-pointer inline-block">
              Start tracking free →
            </Link>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 p-4 rounded-xl" style={{ background: "var(--bg-page-alt)" }}>
            <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
              This calculator is for informational purposes only. Waiver-based petitions are not bound by the 90-day window. Confirm requirements on uscis.gov and consult a licensed immigration attorney for advice specific to your situation.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
