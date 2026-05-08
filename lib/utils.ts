// /lib/utils.ts

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { differenceInDays, addDays, format, isValid, parseISO } from "date-fns";

// ─── Tailwind class merger ────────────────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Days until a date ────────────────────────────────────────────────────────
export function daysUntil(date: Date | string): number {
  const target = typeof date === "string" ? parseISO(date) : date;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return differenceInDays(target, today);
}

// ─── Status level for a document ─────────────────────────────────────────────
export type DocumentStatus = "expired" | "critical" | "warning" | "good";

export function getDocumentStatus(
  daysRemaining: number,
  renewLeadDays: number
): DocumentStatus {
  if (daysRemaining < 0) return "expired";
  if (daysRemaining <= 30) return "critical";
  if (daysRemaining <= renewLeadDays) return "warning";
  return "good";
}

// ─── Human-readable time string ──────────────────────────────────────────────
export function formatTimeRemaining(days: number): string {
  if (days < 0) return "EXPIRED";
  if (days === 0) return "Today";
  if (days === 1) return "1 day";
  if (days < 7) return `${days} days`;
  if (days < 14) return "1 week";
  if (days < 30) return `${Math.floor(days / 7)} weeks`;
  if (days < 60) return "1 month";
  if (days < 365) return `${Math.floor(days / 30)} months`;
  if (days < 730) return "1 year";
  return `${Math.floor(days / 365)} years`;
}

// ─── Free plan limits ────────────────────────────────────────────────────────
export const FREE_PLAN_LIMIT = 3;

export function isOverFreeLimit(documentCount: number): boolean {
  return documentCount >= FREE_PLAN_LIMIT;
}

// ─── Next reminder date ──────────────────────────────────────────────────────
const REMINDER_DAYS = [180, 90, 60, 30, 7] as const;

export function getNextReminderDate(expiryDate: Date): Date | null {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysLeft = daysUntil(expiryDate);

  for (const days of REMINDER_DAYS) {
    if (daysLeft > days) {
      return addDays(expiryDate, -days);
    }
  }

  return null;
}

// ─── Recommended renewal start date ──────────────────────────────────────────
export function getRecommendedRenewalDate(expiryDate: Date, renewLeadDays: number): Date {
  return addDays(expiryDate, -renewLeadDays);
}

// ─── Status color classes ────────────────────────────────────────────────────
export function getStatusColor(status: DocumentStatus): string {
  switch (status) {
    case "expired":
      return "text-red-600 dark:text-red-500";
    case "critical":
      return "text-red-600 dark:text-red-400";
    case "warning":
      return "text-amber-600 dark:text-yellow-400";
    case "good":
      return "text-forest dark:text-lime";
    default:
      return "text-muted";
  }
}

export function getStatusBg(status: DocumentStatus): string {
  switch (status) {
    case "expired":
      return "bg-red-500/10 border-red-500/30";
    case "critical":
      return "bg-red-400/10 border-red-400/30";
    case "warning":
      return "bg-yellow-400/10 border-yellow-400/30";
    case "good":
      return "bg-lime/10 border-lime/30";
    default:
      return "bg-sage/10 border-sage/30";
  }
}

export function getStatusLabel(status: DocumentStatus): string {
  switch (status) {
    case "expired":
      return "Expired";
    case "critical":
      return "Critical";
    case "warning":
      return "Action Needed";
    case "good":
      return "Good Standing";
    default:
      return "Unknown";
  }
}

// ─── Format date ─────────────────────────────────────────────────────────────
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  if (!isValid(d)) return "Invalid date";
  return format(d, "MMM d, yyyy");
}

// ─── Countdown ring progress ──────────────────────────────────────────────────
export function getCountdownProgress(daysRemaining: number, renewLeadDays: number): number {
  if (daysRemaining <= 0) return 0;
  const total = renewLeadDays * 2;
  return Math.min(100, Math.max(0, (daysRemaining / total) * 100));
}

// ─── Urgency sort comparator ──────────────────────────────────────────────────
const statusOrder: Record<DocumentStatus, number> = {
  expired: 0,
  critical: 1,
  warning: 2,
  good: 3,
};

export function sortByUrgency<T extends { daysRemaining: number; status: DocumentStatus }>(
  docs: T[]
): T[] {
  return [...docs].sort((a, b) => {
    const statusDiff = statusOrder[a.status] - statusOrder[b.status];
    if (statusDiff !== 0) return statusDiff;
    return a.daysRemaining - b.daysRemaining;
  });
}
