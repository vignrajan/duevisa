"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, Circle, ChevronDown, ChevronUp, Lock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { getChecklistForDocument } from "@/lib/checklists";

interface RenewalChecklistProps {
  documentId: string;
  documentType: string;
  daysRemaining: number;
  userId: string;
  isPro: boolean;
  onRequestEdit?: () => void;
}

export function RenewalChecklist({
  documentId,
  documentType,
  daysRemaining,
  userId,
  isPro,
  onRequestEdit,
}: RenewalChecklistProps) {
  const checklist = getChecklistForDocument(documentType);

  const [expanded, setExpanded] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [expandedDetails, setExpandedDetails] = useState<Set<number>>(new Set());
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    if (!checklist || daysRemaining > checklist.triggerDays) return;

    async function fetchProgress() {
      const { data } = await supabase
        .from("checklist_progress")
        .select("completed_steps")
        .eq("document_id", documentId)
        .maybeSingle();

      const steps = (data as { completed_steps: number[] } | null)?.completed_steps;
      if (steps?.length) {
        setCompletedSteps(steps);
      }
      setLoaded(true);
    }

    fetchProgress();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentId]);

  // Don't render if no checklist for this doc type, or not yet in trigger window
  if (!checklist || daysRemaining > checklist.triggerDays) return null;

  async function toggleStep(stepId: number) {
    const next = completedSteps.includes(stepId)
      ? completedSteps.filter((id) => id !== stepId)
      : [...completedSteps, stepId];

    setCompletedSteps(next); // optimistic update
    setSaving(true);

    try {
      const { error } = await supabase.from("checklist_progress").upsert(
        {
          user_id: userId,
          document_id: documentId,
          checklist_key: checklist.key,
          completed_steps: next,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,document_id" }
      );
      if (error) throw error;
    } catch {
      setCompletedSteps(completedSteps); // revert on failure
    } finally {
      setSaving(false);
    }
  }

  function toggleDetail(stepId: number) {
    setExpandedDetails((prev) => {
      const next = new Set(prev);
      if (next.has(stepId)) next.delete(stepId);
      else next.add(stepId);
      return next;
    });
  }

  const totalSteps = checklist.steps.length;
  const completedCount = completedSteps.length;
  const allDone = isPro && completedCount === totalSteps && totalSteps > 0;
  const progressPct = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  return (
    <div className="rounded-2xl border border-border-default overflow-hidden" style={{ background: "var(--bg-card)" }}>
      {/* ── Collapsed toggle row ── */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 transition-colors hover:bg-page-alt/60"
        style={{ textAlign: "left" }}
      >
        <div className="flex items-center gap-2.5">
          <CheckCircle2 size={14} className="text-forest dark:text-lime flex-shrink-0" />
          <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
            {checklist.title}
          </span>
          {loaded && (
            <span
              className={cn(
                "text-[10px] font-mono font-bold px-2 py-0.5 rounded-full",
                allDone
                  ? "text-forest dark:text-lime"
                  : "text-muted"
              )}
              style={{
                background: allDone
                  ? "rgba(10,92,74,0.08)"
                  : "var(--bg-page-alt)",
              }}
            >
              {isPro ? `${completedCount}/${totalSteps}` : `${totalSteps} steps`}
            </span>
          )}
        </div>
        {expanded ? (
          <ChevronUp size={15} className="text-muted flex-shrink-0" />
        ) : (
          <ChevronDown size={15} className="text-muted flex-shrink-0" />
        )}
      </button>

      {/* ── Expanded body ── */}
      {expanded && (
        <div className="border-t border-border-default px-4 pt-4 pb-5 space-y-4">

          {/* Progress bar — only shown for pro */}
          {isPro && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                  {completedCount} of {totalSteps} steps completed
                </span>
                <span className={cn("text-xs font-bold", allDone ? "text-forest dark:text-lime" : "text-muted")}>
                  {progressPct}%
                </span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border-default)" }}>
                <div
                  className="h-full rounded-full bg-forest dark:bg-lime transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          )}

          {/* Free-tier upgrade banner */}
          {!isPro && (
            <Link
              href="/pricing"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border transition-colors group"
              style={{
                background: "rgba(232,197,71,0.05)",
                borderColor: "rgba(232,197,71,0.2)",
              }}
            >
              <Lock size={13} className="text-gold flex-shrink-0" />
              <span className="text-xs font-semibold flex-1" style={{ color: "var(--text-secondary)" }}>
                Upgrade to Pro to track your progress and save completed steps →
              </span>
              <ArrowRight size={12} className="text-gold flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}

          {/* Step list */}
          <div className="space-y-0.5">
            {checklist.steps.map((step) => {
              const isChecked = completedSteps.includes(step.id);
              const hasDetail = !!step.detail;
              const detailOpen = expandedDetails.has(step.id);

              return (
                <div key={step.id}>
                  <div className="flex items-start gap-3 py-2 px-1 rounded-lg hover:bg-page-alt/40 transition-colors">
                    {/* Checkbox / lock */}
                    <button
                      onClick={() => isPro && !saving && toggleStep(step.id)}
                      className={cn(
                        "flex-shrink-0 mt-0.5 transition-all duration-200",
                        !isPro ? "cursor-not-allowed" : "cursor-pointer"
                      )}
                      aria-label={isChecked ? "Uncheck step" : "Check step"}
                      disabled={saving && isPro}
                    >
                      {!isPro ? (
                        <Lock size={14} className="text-muted/40" />
                      ) : isChecked ? (
                        <CheckCircle2 size={16} className="text-forest dark:text-lime transition-all" />
                      ) : (
                        <Circle size={16} className="text-muted/40 hover:text-muted/70 transition-colors" />
                      )}
                    </button>

                    {/* Text + detail toggle */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className={cn(
                            "text-sm leading-snug transition-colors",
                            isChecked && isPro ? "line-through" : ""
                          )}
                          style={{
                            color: isChecked && isPro
                              ? "var(--text-muted)"
                              : "var(--text-primary)",
                          }}
                        >
                          <span
                            className="font-mono text-[10px] mr-1.5 select-none"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {step.id}.
                          </span>
                          {step.text}
                        </p>
                        {hasDetail && (
                          <button
                            onClick={() => toggleDetail(step.id)}
                            className="flex-shrink-0 text-[10px] font-medium transition-colors hover:text-primary"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {detailOpen ? "Less" : "More"}
                          </button>
                        )}
                      </div>

                      {hasDetail && detailOpen && (
                        <div className="mt-1.5 pl-2.5 border-l-2 border-forest/20 dark:border-lime/20">
                          <p
                            className="text-xs leading-relaxed"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {step.detail}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* All-done success banner */}
          {allDone && (
            <div
              className="rounded-xl p-4 border border-forest/20 dark:border-lime/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              style={{ background: "rgba(10,92,74,0.06)" }}
            >
              <div className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-forest dark:text-lime flex-shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-forest dark:text-lime leading-snug">
                  All steps complete. Remember to update your new expiry date in DueVisa.
                </p>
              </div>
              {onRequestEdit && (
                <button
                  onClick={onRequestEdit}
                  className="btn-primary text-xs py-2 px-4 flex-shrink-0 whitespace-nowrap"
                >
                  Update expiry date
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
