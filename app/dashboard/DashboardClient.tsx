// /app/dashboard/DashboardClient.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Plus,
  Bell,
  Settings,
  LogOut,
  AlertTriangle,
  FileText,
  Users,
  Clock,
  RefreshCw,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { DocumentCard } from "@/components/DocumentCard";
import { AddDocumentModal } from "@/components/AddDocumentModal";
import { daysUntil, getDocumentStatus, sortByUrgency, FREE_PLAN_LIMIT, isOverFreeLimit } from "@/lib/utils";
import { VISA_CONFIG } from "@/lib/visa-config";
import type { Document, FamilyMember, Profile, DocumentWithStatus } from "@/types/database";
import type { User } from "@supabase/supabase-js";

interface DashboardClientProps {
  user: User;
  profile: Profile | null;
  documents: Document[];
  familyMembers: FamilyMember[];
}

export function DashboardClient({ user, profile, documents, familyMembers }: DashboardClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  const [showAddModal, setShowAddModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  // Compute document statuses with proper renewLeadDays per visa/doc type
  const docsWithStatus = useMemo<DocumentWithStatus[]>(() => {
    const enriched = documents.map((doc) => {
      const daysRemaining = daysUntil(doc.expiry_date);
      // Look up the correct renewLeadDays from visa config
      const visaConf = VISA_CONFIG[doc.visa_category as keyof typeof VISA_CONFIG];
      const docConf = visaConf?.documents?.find((d) => d.type === doc.doc_type);
      const renewLeadDays = docConf?.renewLeadDays ?? 90;
      const status = getDocumentStatus(daysRemaining, renewLeadDays);
      return { ...doc, daysRemaining, status };
    });
    return sortByUrgency(enriched);
  }, [documents]);

  // Stats
  const totalDocs = docsWithStatus.length;
  const criticalCount = docsWithStatus.filter((d) => d.status === "critical" || d.status === "expired").length;
  const warningCount = docsWithStatus.filter((d) => d.status === "warning").length;
  const nextDeadline = docsWithStatus[0];

  // Plan check
  const isPro = profile?.plan === "pro" || profile?.plan === "team";
  const atFreeLimit = !isPro && isOverFreeLimit(totalDocs);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleStartRenewal(docId: string) {
    setIsUpdating(docId);
    setError(null);
    try {
      // @ts-expect-error — hand-crafted DB types incompatible with Supabase v2.105 generics for writes
      const { error: updateError } = await supabase.from("documents").update({ renewal_started: true }).eq("id", docId);
      if (updateError) throw updateError;
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to start renewal");
    } finally {
      setIsUpdating(null);
    }
  }

  function handleDocumentAdded() {
    setShowAddModal(false);
    router.refresh();
  }

  const firstName = profile?.full_name?.split(" ")[0] || user.email?.split("@")[0] || "there";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page-alt)" }}>
      {/* ─── Sidebar (desktop) ─── */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card-bg border-r border-border-default hidden lg:flex flex-col z-40 transition-colors duration-300">
        {/* Logo */}
        <div className="p-6 border-b border-border-default">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-forest flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="4" width="12" height="1.5" rx="0.75" fill="#C8F562" />
                <rect x="2" y="7.25" width="9" height="1.5" rx="0.75" fill="#C8F562" opacity="0.7" />
                <rect x="2" y="10.5" width="12" height="1.5" rx="0.75" fill="#C8F562" />
              </svg>
            </div>
            <span className="font-bold text-[1.0625rem] tracking-tight" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              Due<span className="text-forest">Visa</span>
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {[
            { href: "/dashboard", icon: <FileText size={18} />, label: "Documents" },
            { href: "/dashboard/family", icon: <Users size={18} />, label: "Family Members" },
            { href: "/dashboard/settings", icon: <Settings size={18} />, label: "Settings" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                pathname === item.href
                  ? "bg-forest/5 text-forest"
                  : "text-secondary hover:text-primary hover:bg-secondary/5"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border-default space-y-2">
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-secondary hover:text-primary bg-page-alt border border-border-default hover:border-strong transition-all group shadow-sm"
            >
              {resolvedTheme === "dark" ? (
                <><Sun size={16} className="text-gold" /> Light Mode</>
              ) : (
                <><Moon size={16} className="text-forest" /> Dark Mode</>
              )}
            </button>
          )}

          <div className="flex items-center gap-3 p-2 rounded-xl bg-page-alt border border-border-subtle">
            <div className="w-8 h-8 rounded-lg bg-forest flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-lime">
              {firstName[0]?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-primary text-[11px] font-bold truncate">{profile?.full_name || firstName}</div>
              <div className="text-[9px] text-muted uppercase font-bold tracking-wider">
                {profile?.plan || "free"} plan
              </div>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-muted hover:text-red-500 hover:bg-red-50/50 transition-all"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </aside>

      {/* ─── Mobile header ─── */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 glass border-b border-border-default">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-forest flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="4" width="12" height="1.5" rx="0.75" fill="#C8F562" />
                <rect x="2" y="7.25" width="9" height="1.5" rx="0.75" fill="#C8F562" opacity="0.7" />
                <rect x="2" y="10.5" width="12" height="1.5" rx="0.75" fill="#C8F562" />
              </svg>
            </div>
            <span className="font-syne font-bold text-base text-primary">
              Due<span className="text-forest">Visa</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="w-9 h-9 rounded-lg flex items-center justify-center border border-border-default bg-card-bg text-secondary"
              >
                {resolvedTheme === "dark" ? <Sun size={15} className="text-gold" /> : <Moon size={15} className="text-forest" />}
              </button>
            )}
            <Link href="/dashboard/settings" className="w-9 h-9 rounded-lg flex items-center justify-center border border-border-default bg-card-bg text-secondary">
              <Settings size={15} />
            </Link>
            <button 
              onClick={handleSignOut} 
              className="w-9 h-9 rounded-lg flex items-center justify-center border border-border-default bg-card-bg text-muted hover:text-red-500"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* ─── Main content ─── */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Greeting + stats */}
          <div className="mb-8">
            <h1 className="h-section text-primary mb-1">
              {greeting}, {firstName}
            </h1>
            <p className="text-muted text-sm">Here&apos;s your immigration status at a glance</p>
          </div>

          {/* Alert banner */}
          {criticalCount > 0 && (
            <div className="flex items-start gap-3 bg-critical/10 border border-critical/25 rounded-2xl p-4 mb-6 animate-fade-in-up">
              <AlertTriangle size={20} className="text-critical flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-syne font-semibold text-primary text-sm">
                  {criticalCount} document{criticalCount > 1 ? "s" : ""} need immediate attention
                </p>
                <p className="text-critical/80 text-xs mt-0.5">
                  Start your renewal process immediately to avoid losing status
                </p>
              </div>
            </div>
          )}

          {/* Stats bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                label: "Total Documents",
                value: totalDocs,
                icon: <FileText size={18} className="text-muted" />,
                color: "text-primary",
              },
              {
                label: "Need Attention",
                value: criticalCount + warningCount,
                icon: <AlertTriangle size={18} className="text-amber-600 dark:text-gold" />,
                color: criticalCount + warningCount > 0 ? "text-amber-600 dark:text-gold" : "text-forest dark:text-lime",
              },
              {
                label: "Next Deadline",
                value: nextDeadline ? `${nextDeadline.daysRemaining}d` : "—",
                icon: <Clock size={18} className="text-forest dark:text-lime" />,
                color: "text-forest dark:text-lime",
              },
              {
                label: "Family Members",
                value: familyMembers.length,
                icon: <Users size={18} className="text-muted" />,
                color: "text-primary",
              },
            ].map((stat) => (
              <div key={stat.label} className="bg-card-bg border border-border-default rounded-2xl p-5 shadow-sm flex items-center gap-4 hover:shadow-card transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-page-alt flex items-center justify-center flex-shrink-0 border border-border-subtle">
                  {stat.icon}
                </div>
                <div>
                  <div className={`font-mono font-extrabold text-2xl tracking-tight leading-none mb-1 ${stat.color}`}>{stat.value}</div>
                  <div className="text-muted text-[10px] uppercase font-bold tracking-widest">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Documents section */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-syne font-bold text-primary text-xl tracking-tight">Your Documents</h2>
            <button
              onClick={() => {
                if (atFreeLimit) {
                  router.push("/pricing");
                } else {
                  setShowAddModal(true);
                }
              }}
              className="btn-primary text-sm py-2 px-4 flex items-center gap-2"
              aria-label="Add new document"
            >
              <Plus size={16} />
              Add Document
            </button>
          </div>

          {/* Free plan limit notice */}
          {atFreeLimit && (
            <div className="flex items-center gap-3 bg-gold/10 border border-gold/20 rounded-xl p-4 mb-4">
              <Bell size={18} className="text-gold flex-shrink-0" />
              <div className="flex-1">
                <p className="font-syne font-semibold text-primary text-sm">
                  Free plan limit reached ({FREE_PLAN_LIMIT} documents)
                </p>
                <p className="text-muted text-xs mt-0.5">Upgrade to Pro for unlimited documents and earlier reminders</p>
              </div>
              <Link href="/pricing" className="btn-secondary text-xs py-1.5 px-3 flex-shrink-0">
                Upgrade
              </Link>
            </div>
          )}

          {/* Document cards grid */}
          {docsWithStatus.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl">
              <div className="w-16 h-16 bg-forest/5 dark:bg-lime/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText size={28} className="text-forest dark:text-lime" />
              </div>
              <h3 className="font-syne font-bold text-primary text-lg mb-2">No documents yet</h3>
              <p className="text-muted text-sm mb-6 max-w-sm mx-auto">
                Add your first immigration document to start tracking deadlines and receiving reminders.
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="btn-primary inline-flex items-center gap-2"
              >
                <Plus size={16} />
                Add your first document
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {docsWithStatus.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  doc={doc}
                  onStartRenewal={handleStartRenewal}
                  onEdit={() => {}}
                  loading={isUpdating === doc.id}
                />
              ))}
            </div>
          )}

          {/* Family section */}
          {familyMembers.length > 0 && (
            <div className="mt-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-syne font-bold text-primary text-xl tracking-tight">Family Members</h2>
                <Link href="/dashboard/family" className="text-forest dark:text-lime text-sm font-bold hover:underline">
                  Manage →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {familyMembers.map((member) => (
                  <div key={member.id} className="card flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-forest/10 dark:bg-forest/40 border border-forest/10 dark:border-lime/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-forest dark:text-lime font-mono font-bold text-sm">
                        {member.full_name[0]?.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="font-syne font-semibold text-primary text-sm">{member.full_name}</div>
                      <div className="text-muted text-xs">
                        {member.relationship} · {member.visa_category}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick actions */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/attorneys"
              className="card flex items-center gap-3 hover:border-forest/20 dark:hover:border-lime/20 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-forest/5 dark:bg-lime/10 flex items-center justify-center flex-shrink-0 group-hover:bg-forest/10 dark:group-hover:bg-lime/20 transition-colors">
                <RefreshCw size={18} className="text-forest dark:text-lime" />
              </div>
              <div>
                <div className="font-syne font-semibold text-primary text-sm">Find an Attorney</div>
                <div className="text-muted text-xs">Get expert immigration help</div>
              </div>
            </Link>
            <Link
              href="/dashboard/settings"
              className="card flex items-center gap-3 hover:border-forest/20 dark:hover:border-lime/20 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-forest/5 dark:bg-lime/10 flex items-center justify-center flex-shrink-0 group-hover:bg-forest/10 dark:group-hover:bg-lime/20 transition-colors">
                <Bell size={18} className="text-forest dark:text-lime" />
              </div>
              <div>
                <div className="font-syne font-semibold text-primary text-sm">Reminder Settings</div>
                <div className="text-muted text-xs">Configure your alerts</div>
              </div>
            </Link>
            <Link
              href="/pricing"
              className="card flex items-center gap-3 hover:border-forest/20 dark:hover:border-lime/20 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-forest/5 dark:bg-lime/10 flex items-center justify-center flex-shrink-0 group-hover:bg-forest/10 dark:group-hover:bg-lime/20 transition-colors">
                <Settings size={18} className="text-forest dark:text-lime" />
              </div>
              <div>
                <div className="font-syne font-semibold text-primary text-sm">
                  {isPro ? "Pro Plan Active" : "Upgrade to Pro"}
                </div>
                <div className="text-muted text-xs">
                  {isPro ? "All features unlocked" : "Unlimited docs + earlier reminders"}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>

      {/* Add Document Modal */}
      {showAddModal && (
        <AddDocumentModal
          userId={user.id}
          onClose={() => setShowAddModal(false)}
          onSuccess={handleDocumentAdded}
        />
      )}
    </div>
  );
}
