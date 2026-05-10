"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { addDays, differenceInDays, format, isValid, parseISO } from "date-fns";
import { ArrowRight, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

const STAGES = [
  { days: 180, label: "180d", action: "Start preparing — contact your employer or attorney" },
  { days: 90,  label: "90d",  action: "Renewal window open — file Form I-765 now" },
  { days: 60,  label: "60d",  action: "Action recommended — don't delay any longer" },
  { days: 30,  label: "30d",  action: "File immediately to avoid a work authorization gap" },
  { days: 7,   label: "7d",   action: "CRITICAL — contact an immigration attorney today" },
];

function calcStageIndex(daysLeft: number): number {
  if (daysLeft > 180) return -1; // pre-window
  if (daysLeft > 90)  return 0;
  if (daysLeft > 60)  return 1;
  if (daysLeft > 30)  return 2;
  if (daysLeft > 7)   return 3;
  if (daysLeft >= 0)  return 4;
  return 5; // expired
}

export function EADCalculator() {
  const [expiryInput, setExpiryInput] = useState("");

  const result = useMemo(() => {
    if (!expiryInput) return null;
    const expiry = parseISO(expiryInput);
    if (!isValid(expiry)) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);

    const daysLeft        = differenceInDays(expiry, today);
    const windowDate      = addDays(expiry, -180);
    const daysUntilWindow = differenceInDays(windowDate, today);
    const windowOpen      = daysUntilWindow <= 0;
    const stageIndex      = calcStageIndex(daysLeft);

    const level =
      daysLeft < 0   ? "expired"  :
      daysLeft <= 30  ? "critical" :
      daysLeft <= 180 ? "warning"  : "good";

    return {
      daysLeft,
      windowDate,
      windowOpen,
      daysUntilWindow,
      stageIndex,
      level,
      expiryFmt: format(expiry, "MMM d, yyyy"),
      windowFmt: format(windowDate, "MMM d, yyyy"),
    };
  }, [expiryInput]);

  /* ── helpers ── */
  const dayColor = result
    ? result.level === "good"     ? "text-forest dark:text-lime"
    : result.level === "warning"  ? "text-gold"
    : "text-critical"
    : "";

  return (
    <div className="max-w-2xl mx-auto">

      {/* ── Date input card ── */}
      <div className="card mb-5">
        <label htmlFor="ead-expiry" className="label flex items-center gap-2">
          <CalendarDays size={14} className="text-forest dark:text-lime" />
          Your EAD expiry date
        </label>
        <input
          id="ead-expiry"
          type="date"
          value={expiryInput}
          onChange={(e) => setExpiryInput(e.target.value)}
          className="input-field mt-2"
        />
        <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
          Found on your EAD card. No account required.
        </p>
      </div>

      {/* ── Results ── */}
      {result && (
        <div className="space-y-3 animate-fade-in">

          {/* Three stat tiles */}
          <div className="grid grid-cols-3 gap-3">
            {/* Days left */}
            <div className="rounded-2xl p-3 sm:p-4 border text-center"
              style={{ background: "var(--bg-card)", borderColor: "var(--border-default)" }}>
              <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-2"
                style={{ color: "var(--text-muted)" }}>Days left</div>
              <div className={cn("text-2xl sm:text-3xl font-black font-mono tracking-tight leading-none", dayColor)}>
                {result.daysLeft < 0 ? "EXP" : result.daysLeft}
              </div>
              <div className="text-[9px] sm:text-[10px] mt-1.5 leading-tight"
                style={{ color: "var(--text-muted)" }}>
                {result.daysLeft < 0 ? "Expired" : result.expiryFmt}
              </div>
            </div>

            {/* 180-day window */}
            <div className="rounded-2xl p-3 sm:p-4 border text-center"
              style={{ background: "var(--bg-card)", borderColor: "var(--border-default)" }}>
              <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-2"
                style={{ color: "var(--text-muted)" }}>180-day window</div>
              <div className={cn("text-xs sm:text-sm font-black leading-tight", {
                "text-forest dark:text-lime": !result.windowOpen,
                "text-gold": result.windowOpen && result.level === "warning",
                "text-critical": result.windowOpen && (result.level === "critical" || result.level === "expired"),
              })}>
                {result.windowOpen ? "Open now" : result.windowFmt}
              </div>
              <div className="text-[9px] sm:text-[10px] mt-1.5 leading-tight"
                style={{ color: "var(--text-muted)" }}>
                {result.windowOpen
                  ? "File I-765 now"
                  : `Opens in ${result.daysUntilWindow}d`}
              </div>
            </div>

            {/* Reminder stage */}
            <div className="rounded-2xl p-3 sm:p-4 border text-center"
              style={{ background: "var(--bg-card)", borderColor: "var(--border-default)" }}>
              <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-2"
                style={{ color: "var(--text-muted)" }}>Stage</div>
              <div className={cn("text-xs sm:text-sm font-black leading-tight", dayColor)}>
                {result.level === "expired" ? "Expired"
                  : result.stageIndex === -1 ? "None yet"
                  : `${result.stageIndex + 1} of 5`}
              </div>
              <div className="text-[9px] sm:text-[10px] mt-1.5 leading-tight"
                style={{ color: "var(--text-muted)" }}>
                {result.level === "expired" ? "Seek legal help"
                  : result.stageIndex === -1 ? "Alert at 180d"
                  : `${STAGES[result.stageIndex].days}-day alert`}
              </div>
            </div>
          </div>

          {/* Action message banner */}
          {result.stageIndex >= 0 && result.stageIndex < 5 && (
            <div className={cn("rounded-2xl px-5 py-4 border flex items-start gap-3 text-sm font-semibold leading-relaxed", {
              "bg-critical/5 border-critical/20 text-critical": result.level === "critical",
              "bg-gold/5 border-gold/20 text-gold":             result.level === "warning",
            })}>
              {STAGES[result.stageIndex].action}
            </div>
          )}
          {result.level === "expired" && (
            <div className="rounded-2xl px-5 py-4 border bg-critical/5 border-critical/20 text-critical text-sm font-semibold leading-relaxed">
              Your EAD has expired. Stop working immediately and seek legal advice to restore authorization.
            </div>
          )}

          {/* Reminder timeline */}
          <div className="card">
            <p className="text-[10px] font-bold uppercase tracking-widest mb-4"
              style={{ color: "var(--text-muted)" }}>Your reminder timeline</p>

            <div className="relative flex justify-between items-start">
              {/* connector line */}
              <div className="absolute left-3.5 right-3.5 top-3.5 h-px"
                style={{ background: "var(--border-default)" }} />

              {STAGES.map((stage, i) => {
                const isCompleted = result.stageIndex > i || result.level === "expired";
                const isCurrent   = result.stageIndex === i;
                const isFuture    = !isCompleted && !isCurrent;
                return (
                  <div key={stage.days} className="relative flex flex-col items-center gap-1.5 z-10">
                    <div className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all",
                      isCurrent   && "bg-forest dark:bg-lime text-lime dark:text-midnight border-forest dark:border-lime scale-110",
                      isCompleted && "bg-forest/15 dark:bg-lime/15 text-forest dark:text-lime border-forest/30 dark:border-lime/25",
                      isFuture    && "border-border-default bg-card-bg",
                    )}>
                      {isCompleted
                        ? <span>✓</span>
                        : <span style={{ color: isCurrent ? undefined : "var(--text-muted)" }}>{i + 1}</span>}
                    </div>
                    <span className={cn("text-[9px] font-mono font-bold",
                      isCurrent ? "text-forest dark:text-lime" : "text-muted"
                    )}>
                      {stage.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-2xl p-5 border border-forest/20 dark:border-lime/20"
            style={{ background: "rgba(10,92,74,0.05)" }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                  Track this automatically — it&apos;s free
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  DueVisa emails you at every stage. No spreadsheets. No forgetting.
                </p>
              </div>
              <Link href="/signup" className="btn-primary text-sm py-2.5 px-5 flex-shrink-0 whitespace-nowrap">
                Start free <ArrowRight size={14} />
              </Link>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
