// /app/dashboard/settings/SettingsClient.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, Trash2, LogOut, ChevronLeft, Check, KeyRound } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/types/database";
import type { User } from "@supabase/supabase-js";

interface SettingsClientProps {
  user: User;
  profile: Profile | null;
}

export function SettingsClient({ user, profile }: SettingsClientProps) {
  const router = useRouter();
  const supabase = createClient();

  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [reminderEmail, setReminderEmail] = useState(profile?.reminder_email ?? true);
  const [reminderSms, setReminderSms] = useState(profile?.reminder_sms ?? false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // Password change state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    // @ts-expect-error — hand-crafted DB types incompatible with Supabase v2.105 generics for writes
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      email: user.email!,
      full_name: fullName,
      phone,
      reminder_email: reminderEmail,
      reminder_sms: reminderSms,
    });

    setSaving(false);
    if (error) {
      setError(error.message);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      router.refresh();
    }
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError("");

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords don't match.");
      return;
    }

    setPasswordSaving(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setPasswordSaving(false);

    if (error) {
      setPasswordError(error.message);
    } else {
      setPasswordSaved(true);
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPasswordSaved(false), 3000);
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  async function handleDeleteAccount() {
    if (!confirm("Are you sure you want to delete your account? This cannot be undone.")) return;
    await supabase.auth.signOut();
    router.push("/");
  }

  // Check if user logged in via OAuth (no password to change)
  const isOAuthUser = user.app_metadata?.provider && user.app_metadata.provider !== "email";

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page-alt)" }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {/* Back */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors text-secondary hover:text-primary"
        >
          <ChevronLeft size={16} />
          Back to Dashboard
        </Link>

        <h1 className="font-display text-3xl font-bold mb-2 text-primary">Settings</h1>
        <p className="text-sm mb-8 text-secondary">Manage your profile and notification preferences</p>

        {/* Profile */}
        <section className="card bg-card-bg border-border-default mb-6">
          <h2 className="font-syne font-bold text-lg mb-5 text-primary">Profile</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label htmlFor="settings-name" className="label">Full name</label>
              <input
                id="settings-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="input-field"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label htmlFor="settings-email" className="label">Email address</label>
              <input
                id="settings-email"
                type="email"
                value={user.email || ""}
                disabled
                className="input-field opacity-60 cursor-not-allowed"
              />
              <p className="text-xs mt-1 text-muted">Email cannot be changed here</p>
            </div>
            <div>
              <label htmlFor="settings-phone" className="label">Phone number (optional)</label>
              <input
                id="settings-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="input-field"
              />
            </div>

            <h3 className="font-syne font-semibold text-base pt-2 text-primary">Notification Preferences</h3>
            <div className="space-y-3">
              {[
                {
                  id: "email-toggle",
                  label: "Email reminders",
                  description: "Receive email alerts before each deadline",
                  checked: reminderEmail,
                  onChange: setReminderEmail,
                  available: true,
                },
                {
                  id: "sms-toggle",
                  label: "SMS reminders",
                  description: "Receive text message alerts (Pro plan)",
                  checked: reminderSms,
                  onChange: setReminderSms,
                  available: profile?.plan === "pro" || profile?.plan === "team",
                },
              ].map((pref) => (
                <label
                  key={pref.id}
                  htmlFor={pref.id}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${!pref.available ? "opacity-60" : ""}`}
                  style={{ borderColor: "var(--border-default)" }}
                >
                  <div>
                    <div className="font-syne font-medium text-sm text-primary">{pref.label}</div>
                    <div className="text-xs mt-0.5 text-secondary">{pref.description}</div>
                  </div>
                  <input
                    id={pref.id}
                    type="checkbox"
                    checked={pref.checked}
                    onChange={(e) => pref.available && pref.onChange(e.target.checked)}
                    disabled={!pref.available}
                    className="w-4 h-4 accent-[#0A5C4A] cursor-pointer"
                    aria-label={pref.label}
                  />
                </label>
              ))}
            </div>

            {error && <p className="form-error">{error}</p>}

            <button
              type="submit"
              disabled={saving}
              className="btn-primary flex items-center gap-2 w-full justify-center"
            >
              {saving ? (
                <><Loader2 size={16} className="animate-spin" /> Saving...</>
              ) : saved ? (
                <><Check size={16} /> Saved!</>
              ) : (
                <><Save size={16} /> Save changes</>
              )}
            </button>
          </form>
        </section>

        {/* Change Password (only for email/password users) */}
        {!isOAuthUser && (
          <section className="card bg-card-bg border-border-default mb-6">
            <div className="flex items-center gap-2 mb-5">
              <KeyRound size={18} className="text-forest" />
              <h2 className="font-syne font-bold text-lg text-primary">Change Password</h2>
            </div>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label htmlFor="new-password" className="label">New password</label>
                <input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="input-field"
                  minLength={8}
                  required
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="label">Confirm new password</label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="input-field"
                  required
                />
              </div>

              {passwordError && <p className="form-error">{passwordError}</p>}

              <button
                type="submit"
                disabled={passwordSaving}
                className="btn-secondary flex items-center gap-2 w-full justify-center"
              >
                {passwordSaving ? (
                  <><Loader2 size={16} className="animate-spin" /> Updating...</>
                ) : passwordSaved ? (
                  <><Check size={16} /> Password updated!</>
                ) : (
                  "Update password"
                )}
              </button>
            </form>
          </section>
        )}

        {/* Plan */}
        <section className="card bg-card-bg border-border-default mb-6">
          <h2 className="font-syne font-bold text-lg mb-4 text-primary">Plan</h2>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-mono text-sm uppercase font-bold text-forest">
                {profile?.plan || "free"} plan
              </div>
              <div className="text-xs mt-0.5 text-secondary">
                {profile?.plan === "free"
                  ? "Up to 3 documents, reminders at 30 & 7 days"
                  : "Unlimited documents, all reminder intervals"}
              </div>
            </div>
            {profile?.plan === "free" && (
              <Link href="/pricing" className="btn-primary text-sm py-2 px-4">
                Upgrade
              </Link>
            )}
          </div>
        </section>

        {/* Account */}
        <section className="card bg-card-bg border-border-default border-red-200 dark:border-critical/20">
          <h2 className="font-syne font-bold text-lg mb-4 text-primary">Account</h2>
          <div className="space-y-3">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-2 text-sm px-4 py-3 rounded-xl border border-border-default text-secondary hover:text-primary transition-all"
            >
              <LogOut size={16} />
              Sign out
            </button>
            <button
              onClick={handleDeleteAccount}
              className="w-full flex items-center gap-2 text-critical/70 hover:text-critical text-sm px-4 py-3 rounded-xl border border-red-100 hover:border-red-300 transition-all dark:border-critical/10 dark:hover:border-critical/30"
            >
              <Trash2 size={16} />
              Delete account
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
