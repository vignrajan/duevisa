"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface CheckoutButtonProps {
  plan: "pro" | "team";
  variant?: "lime" | "default";
}

export function CheckoutButton({ plan, variant = "lime" }: CheckoutButtonProps) {
  const router = useRouter();
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/lemonsqueezy/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, billing }),
      });

      const data = await res.json() as { url?: string; error?: string };

      if (res.status === 401) {
        router.push("/signup?next=/pricing");
        return;
      }

      if (!res.ok || !data.url) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  const isLime = variant === "lime";

  return (
    <div className="space-y-3">
      {/* Billing toggle (only for Pro which has yearly option) */}
      {plan === "pro" && (
        <div className="flex items-center rounded-xl p-1 gap-1" style={{ background: "rgba(255,255,255,0.08)" }}>
          <button
            onClick={() => setBilling("monthly")}
            className={`flex-1 text-xs font-bold py-1.5 rounded-lg transition-all ${
              billing === "monthly"
                ? "bg-white/15 text-white"
                : "text-white/50 hover:text-white/70"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={`flex-1 text-xs font-bold py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              billing === "yearly"
                ? "bg-white/15 text-white"
                : "text-white/50 hover:text-white/70"
            }`}
          >
            Yearly
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "rgba(200,245,98,0.2)", color: "#C8F562" }}>
              Save $29
            </span>
          </button>
        </div>
      )}

      {error && (
        <p className="text-xs text-red-400 text-center">{error}</p>
      )}

      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-sm cursor-pointer transition-all disabled:opacity-60 ${
          isLime ? "btn-primary-lime" : "btn-primary"
        }`}
      >
        {loading ? (
          <><Loader2 size={14} className="animate-spin" /> Redirecting...</>
        ) : (
          `Get ${plan === "pro" ? "Pro" : "Team"} ${plan === "pro" && billing === "yearly" ? "— $79/yr" : plan === "pro" ? "— $9/mo" : "— $29/mo"} →`
        )}
      </button>

      <p className="text-center text-[10px]" style={{ color: "rgba(238,245,240,0.4)" }}>
        Secure checkout via LemonSqueezy · Cancel anytime
      </p>
    </div>
  );
}
