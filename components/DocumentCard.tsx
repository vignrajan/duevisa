// /components/DocumentCard.tsx
"use client";

import { useState } from "react";
import { Clock, RefreshCw, AlertCircle, CheckCircle2, ChevronRight } from "lucide-react";
import { cn, formatDate, formatTimeRemaining, getStatusBg, getStatusColor, getStatusLabel } from "@/lib/utils";
import type { DocumentWithStatus } from "@/types/database";

interface DocumentCardProps {
  doc: DocumentWithStatus;
  onStartRenewal?: (id: string) => void;
  onEdit?: (doc: DocumentWithStatus) => void;
  loading?: boolean;
}

export function DocumentCard({ doc, onStartRenewal, onEdit, loading }: DocumentCardProps) {
  const [hovered, setHovered] = useState(false);
// ... (omitting unchanged lines for brevity in instruction, will provide full replacement)

  const statusBg = getStatusBg(doc.status);
  const statusColor = getStatusColor(doc.status);

  // SVG ring progress
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(100, (doc.daysRemaining / 365) * 100));
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const ringColor = {
    good: "var(--color-forest)",
    warning: "var(--color-gold)",
    critical: "var(--color-critical)",
    expired: "var(--color-critical)",
  }[doc.status];

  // In dark mode, we want the lime version
  const darkRingColor = {
    good: "#C8F562",
    warning: "#E8C547",
    critical: "#EF4444",
    expired: "#EF4444",
  }[doc.status];

  return (
    <div
      className={cn(
        "relative rounded-2xl border p-6 transition-all duration-300 cursor-pointer group",
        "bg-card-bg border-border-default hover:border-forest/20 dark:hover:border-lime/20 shadow-sm",
        hovered && "shadow-card-hover translate-y-[-4px]",
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onEdit?.(doc)}
    >
      {/* Status indicator line */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl",
          doc.status === "good" && "bg-forest dark:bg-lime",
          doc.status === "warning" && "bg-gold",
          (doc.status === "critical" || doc.status === "expired") && "bg-critical",
        )}
      />

      <div className="flex items-start gap-4">
        {/* Countdown Ring */}
        <div className="relative flex-shrink-0 w-16 h-16">
          <svg width="64" height="64" viewBox="0 0 64 64">
            {/* Background ring */}
            <circle
              cx="32" cy="32" r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-border-default/50"
            />
            {/* Progress ring */}
            <circle
              cx="32" cy="32" r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className={cn(
                "countdown-ring transition-all duration-1000",
                statusColor
              )}
            />
          </svg>
          {/* Center number */}
          <div className="absolute inset-0 flex items-center justify-center">
            {doc.status === "expired" ? (
              <AlertCircle size={18} className="text-critical" />
            ) : (
              <span className={cn("font-mono text-xs font-bold leading-none text-center", statusColor)}>
                {doc.daysRemaining <= 365 ? (
                  <>
                    <span className="text-sm">{doc.daysRemaining}</span>
                    <br />
                    <span className="text-[8px] opacity-70">days</span>
                  </>
                ) : (
                  <span className="text-[9px]">1yr+</span>
                )}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-syne font-semibold text-primary text-sm leading-tight truncate">
              {doc.label}
            </h3>
            <span className={cn("badge text-[10px] flex-shrink-0", {
              "badge-good": doc.status === "good",
              "badge-warning": doc.status === "warning",
              "badge-critical": doc.status === "critical",
              "badge-expired": doc.status === "expired",
            })}>
              {getStatusLabel(doc.status)}
            </span>
          </div>

          <p className="font-mono text-muted text-xs mb-2">
            Expires: {formatDate(doc.expiry_date)}
          </p>

          <p className={cn("font-syne font-semibold text-sm", statusColor)}>
            {formatTimeRemaining(doc.daysRemaining)}
          </p>

          {/* Renewal status */}
          {doc.renewal_started && (
            <div className="flex items-center gap-1.5 mt-2">
              <CheckCircle2 size={12} className="text-forest dark:text-lime" />
              <span className="text-forest dark:text-lime text-xs font-semibold">Renewal started</span>
            </div>
          )}

          {/* CTA */}
          {(doc.status === "warning" || doc.status === "critical") && !doc.renewal_started && (
            <button
              className="mt-3 flex items-center gap-1.5 text-forest dark:text-lime text-xs font-bold hover:gap-2 transition-all disabled:opacity-50"
              disabled={loading}
              onClick={(e) => {
                e.stopPropagation();
                onStartRenewal?.(doc.id);
              }}
            >
              {loading ? (
                <RefreshCw size={11} className="animate-spin" />
              ) : (
                <RefreshCw size={11} />
              )}
              {loading ? "Updating..." : "Start Renewal"}
              {!loading && <ChevronRight size={11} />}
            </button>
          )}
        </div>
      </div>

      {/* Visa category tag */}
      <div className="mt-3 pt-3 border-t border-border-default flex items-center justify-between">
        <span className="font-mono text-[10px] text-muted/60 uppercase tracking-wider">
          {doc.visa_category} · {doc.doc_type}
        </span>
        {doc.notes && (
          <span className="text-muted/40 text-[10px] truncate max-w-[120px]">{doc.notes}</span>
        )}
      </div>
    </div>
  );
}
