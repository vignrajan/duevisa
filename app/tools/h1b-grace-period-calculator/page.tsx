"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";
import { Calculator, AlertTriangle, CheckCircle2, Clock, Bell, Briefcase, ArrowRightLeft, Plane } from "lucide-react";

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function toISODate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

const FAQS = [
  {
    q: "How long is the H-1B grace period after my job ends?",
    a: "Under 8 CFR 214.1(l)(2), H-1B workers (and certain other nonimmigrant categories) are generally considered to maintain status for up to 60 consecutive calendar days after employment ends, or until the end date on their I-94 — whichever comes first. It is a discretionary grace period, available once per authorized validity period.",
  },
  {
    q: "When does the 60-day clock start?",
    a: "The clock generally starts the day after your last day of employment — the final day you are on the employer's payroll, not the day a layoff is announced. Severance pay does not extend the grace period: if your last working day is March 1, the 60 days run from March 2 even if you receive severance for months afterward.",
  },
  {
    q: "Can I work during the H-1B grace period?",
    a: "No. The grace period lets you remain in the US in valid status so you can act — it does not by itself authorize employment. You generally cannot start working for a new employer until that employer files a new H-1B petition (and, in most cases, you qualify for H-1B portability). Doing unauthorized work during the grace period can jeopardize your status.",
  },
  {
    q: "What if my I-94 expires before 60 days?",
    a: "Your grace period ends on the earlier of the two dates. If your I-94 authorized stay expires before day 60, your grace period ends on the I-94 expiry date — you do not get the full 60 days. This calculator takes the earlier of the two dates for exactly this reason.",
  },
  {
    q: "What are my options during the grace period?",
    a: "Common paths are: (1) have a new employer file an H-1B transfer petition; (2) file to change to another status (for example H-4 if your spouse is in H-1B status, or F-1); or (3) prepare to depart the US before the grace period ends. This is general information, not legal advice — talk to an immigration attorney about your specific situation.",
  },
];

export default function H1bGracePeriodCalculatorPage() {
  const [lastDayInput, setLastDayInput] = useState("");
  const [i94Input, setI94Input] = useState("");
  const [redirecting, setRedirecting] = useState(false);

  const today = new Date();
  const lastDayDate = lastDayInput ? new Date(lastDayInput + "T12:00:00") : null;
  const i94Date = i94Input ? new Date(i94Input + "T12:00:00") : null;

  const grace60 = lastDayDate ? addDays(lastDayDate, 60) : null;

  let graceEnd: Date | null = null;
  let governedByI94 = false;
  if (grace60) {
    if (i94Date && i94Date.getTime() < grace60.getTime()) {
      graceEnd = i94Date;
      governedByI94 = true;
    } else {
      graceEnd = grace60;
      governedByI94 = false;
    }
  }

  const daysRemaining = graceEnd ? Math.floor((graceEnd.getTime() - today.getTime()) / 86400000) : null;
  const isPast = daysRemaining !== null && daysRemaining < 0;
  const isUrgent = daysRemaining !== null && daysRemaining >= 0 && daysRemaining <= 14;

  async function handleGetReminders() {
    if (!graceEnd) return;
    setRedirecting(true);
    const pending = {
      doc_type: "h1b_grace_period",
      label: "H-1B Grace Period Ends",
      visa_category: "H-1B",
      expiry_date: toISODate(graceEnd),
    };
    try {
      localStorage.setItem("duevisa_pending_document", JSON.stringify(pending));
    } catch {
      /* private mode — non-fatal; the dashboard will simply have no pending doc */
    }
    const supabase = createClient();
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const redirectTo = `${origin}/auth/callback?next=${encodeURIComponent("/dashboard")}&newdoc=1`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
    if (error) setRedirecting(false);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "WebApplication",
        name: "H-1B Grace Period Calculator",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web",
        url: "https://duevisa.com/tools/h1b-grace-period-calculator",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
    ],
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Hero */}
          <div className="mb-10 text-center">
            <div className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: "var(--color-forest)" }}>
              <Calculator size={24} style={{ color: "var(--color-lime)" }} />
            </div>
            <span className="badge badge-good mb-4 inline-flex">Free tool · no login</span>
            <h1 className="h-section mb-4" style={{ color: "var(--text-primary)" }}>
              H-1B Grace Period Calculator
            </h1>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Laid off on an H-1B? Enter your last day of employment and your I-94 expiry to see your exact grace period end date — the earlier of 60 days after your last day or your I-94 expiration.
            </p>
          </div>

          {/* Calculator */}
          <div className="p-6 sm:p-8 rounded-2xl mb-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)" }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="last-day" className="block text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                  Last day of employment
                </label>
                <input
                  id="last-day"
                  type="date"
                  value={lastDayInput}
                  onChange={(e) => setLastDayInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border text-sm font-mono transition-all focus:outline-none"
                  style={{ background: "var(--bg-page)", border: "1px solid var(--border-default)", color: "var(--text-primary)" }}
                />
              </div>
              <div>
                <label htmlFor="i94-expiry" className="block text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                  I-94 expiry date
                </label>
                <input
                  id="i94-expiry"
                  type="date"
                  value={i94Input}
                  onChange={(e) => setI94Input(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border text-sm font-mono transition-all focus:outline-none"
                  style={{ background: "var(--bg-page)", border: "1px solid var(--border-default)", color: "var(--text-primary)" }}
                />
                <p className="text-xs mt-1.5" style={{ color: "var(--text-muted)" }}>
                  Find this at i94.cbp.dhs.gov. Optional, but your grace period can end on this date.
                </p>
              </div>
            </div>

            {graceEnd && (
              <div className="mt-6 space-y-3">
                {/* Headline result */}
                <div
                  className="p-5 rounded-xl text-center"
                  style={{ background: "var(--bg-page-alt2)", border: "1px solid var(--border-strong)" }}
                >
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
                    Your grace period ends
                  </p>
                  <p data-testid="grace-end-date" className="font-bold text-2xl sm:text-3xl tracking-tight" style={{ color: "var(--text-primary)" }}>
                    {formatDate(graceEnd)}
                  </p>
                  {daysRemaining !== null && (
                    <p data-testid="days-remaining" className="text-sm font-semibold mt-1" style={{ color: isPast ? "#dc2626" : isUrgent ? "#d97706" : "var(--color-forest)" }}>
                      {isPast ? `${Math.abs(daysRemaining)} days ago` : daysRemaining === 0 ? "Today" : `${daysRemaining} days remaining`}
                    </p>
                  )}
                </div>

                {/* Which rule governs */}
                <div
                  data-testid="governing-rule"
                  className="flex items-start gap-3 p-4 rounded-xl"
                  style={
                    governedByI94
                      ? { background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)" }
                      : { background: "rgba(10,92,74,0.08)", border: "1px solid rgba(10,92,74,0.2)" }
                  }
                >
                  {governedByI94 ? (
                    <AlertTriangle size={16} className="flex-shrink-0 mt-0.5 text-amber-500" />
                  ) : (
                    <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-forest)" }} />
                  )}
                  <p className="text-sm font-medium" style={{ color: governedByI94 ? undefined : "var(--color-forest)" }}>
                    {governedByI94 ? (
                      <span className="text-amber-700 dark:text-amber-400">
                        Your I-94 expires before day 60, so your grace period ends on your I-94 expiry date ({formatDate(i94Date!)}), not the full 60 days.
                      </span>
                    ) : (
                      <>Your grace period is governed by the 60-day rule — 60 days after your last day of employment{i94Date ? ", which falls on or before your I-94 expiry" : ""}.</>
                    )}
                  </p>
                </div>

                {/* Timeline */}
                <div className="space-y-2 pt-1">
                  {[
                    { label: "Last day of employment", date: lastDayDate!, muted: false },
                    { label: "60 days after last day", date: grace60!, muted: governedByI94 },
                    ...(i94Date ? [{ label: "I-94 authorized stay expires", date: i94Date, muted: !governedByI94 }] : []),
                  ].map(({ label, date, muted }) => (
                    <div key={label} className="flex items-center justify-between py-3 px-4 rounded-xl" style={{ background: "var(--bg-page-alt)" }}>
                      <p className="text-sm font-semibold" style={{ color: muted ? "var(--text-muted)" : "var(--text-secondary)" }}>{label}</p>
                      <p className="text-xs font-mono" style={{ color: muted ? "var(--text-muted)" : "var(--text-primary)" }}>{formatDate(date)}</p>
                    </div>
                  ))}
                </div>

                {/* Conversion CTA */}
                <div className="pt-3">
                  <button
                    onClick={handleGetReminders}
                    disabled={redirecting}
                    className="btn-primary w-full flex items-center justify-center gap-2 text-sm py-3.5 cursor-pointer"
                  >
                    <Bell size={16} />
                    {redirecting ? "Redirecting to sign-in…" : "Get reminders before your grace period ends"}
                  </button>
                  <p className="text-xs text-center mt-2" style={{ color: "var(--text-muted)" }}>
                    Sign in with Google and we&apos;ll save this date to your free dashboard and remind you at 30, 14, and 7 days.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Options during grace period (general info) */}
          <div className="p-6 rounded-2xl mb-6" style={{ background: "var(--bg-page-alt)", border: "1px solid var(--border-default)" }}>
            <h2 className="font-bold text-base mb-4" style={{ color: "var(--text-primary)" }}>Your options during the grace period</h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
              The grace period buys you time to act — it does not authorize work by itself. People in this situation generally pursue one of these paths:
            </p>
            <div className="space-y-3">
              {[
                { icon: <ArrowRightLeft size={16} style={{ color: "var(--color-forest)" }} />, title: "New H-1B transfer petition", desc: "A new employer files a new H-1B petition (Form I-129). This must be filed before your grace period ends." },
                { icon: <Briefcase size={16} style={{ color: "var(--color-forest)" }} />, title: "Change of status", desc: "File to change to another status — for example H-4 if your spouse is in H-1B status, or F-1 to return to study — before the grace period ends." },
                { icon: <Plane size={16} style={{ color: "var(--color-forest)" }} />, title: "Prepare to depart", desc: "If no option materializes, leave the US before your grace period ends to avoid accruing unlawful presence." },
              ].map((opt) => (
                <div key={opt.title} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)" }}>
                  <span className="flex-shrink-0 mt-0.5">{opt.icon}</span>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{opt.title}</p>
                    <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "var(--text-secondary)" }}>{opt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs leading-relaxed mt-4" style={{ color: "var(--text-secondary)" }}>
              Want the full walkthrough?{" "}
              <Link href="/blog/h1b-grace-period-after-layoff" className="font-semibold underline" style={{ color: "var(--color-forest)" }}>
                Read: H-1B grace period after layoff →
              </Link>
            </p>
          </div>

          {/* Rule source + citation */}
          <div className="p-6 rounded-2xl mb-6" style={{ background: "var(--bg-page-alt)", border: "1px solid var(--border-default)" }}>
            <h2 className="font-bold text-base mb-3" style={{ color: "var(--text-primary)" }}>How the 60-day rule works</h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
              The grace period comes from federal regulation <strong style={{ color: "var(--text-primary)" }}>8 CFR 214.1(l)(2)</strong>, which treats workers in E-1, E-2, E-3, H-1B, H-1B1, L-1, O-1, and TN status as maintaining status for up to <strong style={{ color: "var(--text-primary)" }}>60 consecutive days</strong> after their employment ends, or until the end of their authorized validity period (I-94), whichever is shorter. It is discretionary and available once per validity period.
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Sources: 8 CFR 214.1(l)(2); USCIS, &ldquo;Options for Nonimmigrant Workers Following Termination of Employment&rdquo; (uscis.gov). Note: as of this page&apos;s last update, the 60-day grace period remains in effect, but DHS has issued a proposed rule to eliminate it — verify the current status on uscis.gov before relying on it.
            </p>
          </div>

          {/* FAQ */}
          <div className="mb-6">
            <h2 className="font-bold text-lg mb-4" style={{ color: "var(--text-primary)" }}>Frequently asked questions</h2>
            <div className="space-y-3">
              {FAQS.map((f, i) => (
                <details key={i} className="card group cursor-pointer" style={{ padding: "1.25rem 1.5rem" }}>
                  <summary className="flex items-center justify-between font-semibold text-sm list-none cursor-pointer" style={{ color: "var(--text-primary)" }}>
                    {f.q}
                    <span className="text-xs font-bold ml-4 transition-all duration-200 group-open:rotate-45" style={{ color: "var(--text-muted)" }}>+</span>
                  </summary>
                  <p className="text-sm leading-relaxed mt-4 pt-4" style={{ color: "var(--text-secondary)", borderTop: "1px solid var(--border-subtle)" }}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-4 rounded-xl flex items-start gap-3" style={{ background: "var(--bg-page-alt)" }}>
            <Clock size={14} className="flex-shrink-0 mt-0.5" style={{ color: "var(--text-muted)" }} />
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
              General information, not legal advice. Talk to an immigration attorney. Grace period eligibility and length can depend on your specific facts, and immigration rules change — confirm the current rule on uscis.gov and with a licensed attorney before you act.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
