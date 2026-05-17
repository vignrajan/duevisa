"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, Eye, EyeOff, CheckCircle2, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function UpdatePasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [exchanging, setExchanging] = useState(true);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      setError("Invalid or expired reset link. Please request a new one.");
      setExchanging(false);
      return;
    }
    supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
      if (error) {
        setError("This reset link has expired or already been used. Please request a new one.");
      }
      setExchanging(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setDone(true);
      setTimeout(() => router.push("/dashboard"), 2500);
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-card-bg">
      {/* Brand panel */}
      <div className="hidden md:flex flex-col justify-between w-5/12 p-12 text-white relative overflow-hidden" style={{ background: "var(--color-forest)" }}>
        <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none" />
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2.5 group cursor-pointer mb-12">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="4" width="12" height="1.5" rx="0.75" fill="#C8F562" />
                <rect x="2" y="7.25" width="9" height="1.5" rx="0.75" fill="#C8F562" opacity="0.7" />
                <rect x="2" y="10.5" width="12" height="1.5" rx="0.75" fill="#C8F562" />
              </svg>
            </div>
            <span className="font-bold text-[1.0625rem] tracking-tight">Due<span className="text-lime">Visa</span></span>
          </Link>
          <h2 className="text-3xl font-bold leading-tight mb-4 tracking-tight">
            Set your new password.
          </h2>
          <p className="text-lg opacity-80 leading-relaxed max-w-sm">
            Choose a strong password to keep your immigration data secure.
          </p>
        </div>
        <div className="relative z-10 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
          <p className="text-sm leading-relaxed text-white/90">
            Your data is encrypted and only accessible by you. If you didn&apos;t request a password reset, contact us at hello@duevisa.com.
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex flex-col justify-center p-8 sm:p-12 md:p-20 relative bg-card-bg">
        <Link href="/" className="md:hidden inline-flex items-center gap-2 mb-12">
          <span className="font-bold text-xl tracking-tight text-forest">Due<span className="text-lime">Visa</span></span>
        </Link>

        <div className="w-full max-w-md mx-auto">
          <Link href="/login" className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-text-primary mb-6 transition-colors">
            <ArrowLeft size={14} /> Back to login
          </Link>

          <h1 className="text-3xl font-bold mb-2 tracking-tight text-text-primary">Set new password</h1>
          <p className="text-text-secondary text-sm mb-8">Enter and confirm your new password below.</p>

          {exchanging ? (
            <div className="flex items-center gap-3 text-text-secondary text-sm">
              <Loader2 size={16} className="animate-spin text-forest" />
              Verifying reset link…
            </div>
          ) : done ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
              <CheckCircle2 size={36} className="text-forest mx-auto mb-3" />
              <h3 className="text-lg font-bold text-text-primary mb-2">Password updated!</h3>
              <p className="text-sm text-text-secondary">Redirecting you to your dashboard…</p>
            </div>
          ) : error && !password ? (
            <div className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm leading-relaxed">
                {error}
              </div>
              <Link href="/forgot-password" className="btn-primary inline-flex items-center gap-2 text-sm">
                Request a new reset link →
              </Link>
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-1.5">New password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Minimum 8 characters"
                    minLength={8}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-border-default focus:border-forest focus:ring-2 focus:ring-forest/10 outline-none transition-all text-text-primary pr-12"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-1.5">Confirm password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  placeholder="Re-enter your password"
                  minLength={8}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border-default focus:border-forest focus:ring-2 focus:ring-forest/10 outline-none transition-all text-text-primary"
                />
              </div>
              {error && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm font-medium">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-forest hover:bg-forest-dark text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-sm shadow-forest/20 mt-6"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : "Update password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
