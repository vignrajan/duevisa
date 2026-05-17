"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

interface WaitlistButtonProps {
  plan?: string;
  variant?: "lime" | "default";
  label?: string;
}

export function WaitlistButton({ plan = "pro", variant = "lime", label = "Join waitlist for Pro" }: WaitlistButtonProps) {
  const [open, setOpen]       = useState(false);
  const [email, setEmail]     = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);
  const [error, setError]     = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, plan }),
      });

      const data = await res.json() as { error?: string };
      if (!res.ok) {
        setError(data.error || "Something went wrong. Try again.");
        return;
      }

      setDone(true);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-semibold text-sm" style={{ background: "rgba(200,245,98,0.15)", border: "1px solid rgba(200,245,98,0.3)", color: variant === "lime" ? "#C8F562" : "var(--color-forest)" }}>
        <CheckCircle2 size={15} />
        You&apos;re on the list!
      </div>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className={`w-full text-center py-3 px-5 rounded-xl font-bold text-sm cursor-pointer transition-all ${
          variant === "lime" ? "btn-primary-lime" : "btn-primary"
        }`}
      >
        {label}
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        autoFocus
        className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-all"
        style={{
          background: variant === "lime" ? "rgba(238,245,240,0.08)" : "var(--bg-page)",
          borderColor: variant === "lime" ? "rgba(200,245,98,0.3)" : "var(--border-default)",
          color: variant === "lime" ? "#eef5f0" : "var(--text-primary)",
        }}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className={`w-full flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl font-bold text-sm cursor-pointer transition-all disabled:opacity-60 ${
          variant === "lime" ? "btn-primary-lime" : "btn-primary"
        }`}
      >
        {loading ? <Loader2 size={14} className="animate-spin" /> : <ArrowRight size={14} />}
        {loading ? "Joining..." : "Notify me when Pro launches"}
      </button>
    </form>
  );
}
