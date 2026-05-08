// /app/attorneys/AttorneyLeadForm.tsx
"use client";

import { useState } from "react";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { VISA_TYPES, VISA_CONFIG } from "@/lib/visa-config";
import { createClient } from "@/lib/supabase/client";

export function AttorneyLeadForm() {
  const [email, setEmail] = useState("");
  const [visaCategory, setVisaCategory] = useState("");
  const [issue, setIssue] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data: { user } } = await supabase.auth.getUser();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: dbError } = await (supabase as any).from("attorney_leads").insert({
      user_id: user?.id || null,
      visa_category: visaCategory,
      issue_description: issue,
      contact_email: email,
    });

    setLoading(false);
    if (dbError) {
      setError(dbError.message);
    } else {
      setSuccess(true);
    }
  }

  if (success) {
    return (
      <div className="text-center py-6">
        <CheckCircle2 size={40} className="text-forest dark:text-lime mx-auto mb-3" />
        <h3 className="font-syne font-bold text-primary text-lg mb-2">Request received!</h3>
        <p className="text-secondary text-sm">
          A vetted immigration attorney will contact you at <strong className="text-primary">{email}</strong> within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="lead-email" className="label">Your email address</label>
        <input
          id="lead-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="input-field"
          required
        />
      </div>
      <div>
        <label htmlFor="lead-visa" className="label">Visa type</label>
        <select
          id="lead-visa"
          value={visaCategory}
          onChange={(e) => setVisaCategory(e.target.value)}
          className="input-field"
          required
        >
          <option value="">Select your visa type...</option>
          {VISA_TYPES.map((v) => (
            <option key={v} value={v}>{v} — {VISA_CONFIG[v].label}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="lead-issue" className="label">Describe your situation</label>
        <textarea
          id="lead-issue"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          placeholder="e.g. My H-1B expires in 60 days and my employer hasn't started the extension process..."
          rows={4}
          className="input-field resize-none"
          required
        />
      </div>
      {error && <p className="form-error">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {loading ? (
          <><Loader2 size={16} className="animate-spin" /> Submitting...</>
        ) : (
          <><Send size={16} /> Connect me with an attorney</>
        )}
      </button>
      <p className="text-sage/60 text-xs text-center">
        Free consultation matching. Attorneys pay a referral fee — no cost to you.
      </p>
    </form>
  );
}
