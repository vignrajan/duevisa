"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    
    // Redirect back to dashboard/settings (or login) to set the new password 
    // after Supabase automatically logs them in via the magic link.
    
    if (error) { 
      setError(error.message); 
    } else { 
      setSuccess(true); 
    }
    setLoading(false);
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
            Regain access to your tracking dashboard.
          </h2>
          <p className="text-lg opacity-80 leading-relaxed max-w-sm">
            We'll send you a secure link to reset your password and get back to your deadlines.
          </p>
        </div>

        {/* Support snippet */}
        <div className="relative z-10 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
          <p className="text-sm leading-relaxed mb-4 text-white/90">
            If you signed up using Google, you don't need a password. Simply return to the login page and click "Continue with Google".
          </p>
          <Link href="/login" className="flex items-center gap-2 text-sm font-semibold text-lime hover:underline">
            <ArrowLeft size={14} /> Back to sign in
          </Link>
        </div>
      </div>

      {/* Form panel (right) */}
      <div className="flex-1 flex flex-col justify-center p-8 sm:p-12 md:p-20 relative bg-card-bg">
        <Link href="/" className="md:hidden inline-flex items-center gap-2 mb-12">
          <span className="font-bold text-xl tracking-tight text-forest">Due<span className="text-lime">Visa</span></span>
        </Link>
        
        <div className="w-full max-w-md mx-auto">
          <Link href="/login" className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-text-primary mb-6 transition-colors">
            <ArrowLeft size={14} /> Back to login
          </Link>

          <h1 className="text-3xl font-bold mb-2 tracking-tight text-text-primary">Reset password</h1>
          <p className="text-text-secondary text-sm mb-8">Enter the email associated with your account</p>

          {success ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">Check your email</h3>
              <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                We've sent a password reset link to <span className="font-semibold text-text-primary">{email}</span>. Click the link to securely update your password.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="text-sm font-bold text-forest hover:text-forest-dark"
              >
                Try a different email
              </button>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
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
                {loading ? <Loader2 size={18} className="animate-spin" /> : "Send reset link"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
