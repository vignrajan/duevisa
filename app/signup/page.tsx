"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Eye, EyeOff, CheckCircle2, ArrowRight, Shield } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signUp({
      email, password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : '')}/auth/callback?next=/signup/onboarding`,
      },
    });
    if (error) setError(error.message);
    else setSuccess(true);
    setLoading(false);
  }

  async function handleGoogleSignup() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : '')}/auth/callback?next=/signup/onboarding` },
    });
    if (error) { setError(error.message); setLoading(false); }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-card-bg">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-50 border border-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} className="text-forest" />
          </div>
          <h2 className="text-3xl font-bold mb-4 tracking-tight text-text-primary">Check your email</h2>
          <p className="text-text-secondary mb-8 leading-relaxed">
            We sent a confirmation link to <strong className="text-text-primary">{email}</strong>. 
            Click the link to verify your account.
          </p>
          <Link href="/login" className="btn-secondary w-full justify-center py-3">
            Back to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-card-bg">
      {/* Brand panel (left) */}
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
            Start tracking deadlines for free.
          </h2>
          <p className="text-lg opacity-80 leading-relaxed max-w-sm mb-12">
            Join 10,000+ immigrants who trust DueVisa to keep them protected.
          </p>

          <ul className="space-y-4">
            {[
              "180-day advance warnings",
              "Family member tracking",
              "Bank-level data security",
              "Cancel anytime"
            ].map(item => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-lime" />
                <span className="text-white/90 font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Form panel (right) */}
      <div className="flex-1 flex flex-col justify-center p-8 sm:p-12 md:p-20 relative bg-card-bg">
        <Link href="/" className="md:hidden inline-flex items-center gap-2 mb-12">
          <span className="font-bold text-xl tracking-tight text-forest">Due<span className="text-lime">Visa</span></span>
        </Link>
        
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-2 tracking-tight text-text-primary">Create account</h1>
          <p className="text-text-secondary text-sm mb-8">Takes less than 60 seconds. No credit card needed.</p>

          <button
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl border border-border-default bg-card-bg hover:bg-card-elevated text-text-primary font-medium text-sm transition-all duration-200 mb-6 cursor-pointer hover:border-border-strong"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border-default" /></div>
            <div className="relative flex justify-center"><span className="bg-card-bg px-4 text-text-muted text-xs font-medium uppercase tracking-wider">or sign up with email</span></div>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">Full name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl border border-border-default focus:border-forest focus:ring-2 focus:ring-forest/10 outline-none transition-all text-text-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-border-default focus:border-forest focus:ring-2 focus:ring-forest/10 outline-none transition-all text-text-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  minLength={8}
                  className="w-full px-4 py-3 rounded-xl border border-border-default focus:border-forest focus:ring-2 focus:ring-forest/10 outline-none transition-all text-text-primary pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
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
              {loading ? <Loader2 size={18} className="animate-spin" /> : "Create free account"}
            </button>
            
            <p className="text-center text-xs text-text-secondary mt-4 flex items-center justify-center gap-1">
              <Shield size={12} /> By signing up, you agree to the Terms
            </p>
          </form>

          <p className="text-center text-sm text-text-secondary mt-8">
            Already have an account? <Link href="/login" className="font-bold text-forest hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
