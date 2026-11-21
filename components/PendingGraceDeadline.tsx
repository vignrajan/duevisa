"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const STORAGE_KEY = "duevisa_pending_document";

/**
 * Picks up a deadline saved to localStorage by a public tool page (e.g. the
 * H-1B grace period calculator) before the user signed in, creates it in their
 * account once they're authenticated, enables email reminders, and refreshes
 * the dashboard so the new document appears. Renders nothing.
 */
export function PendingGraceDeadline() {
  const router = useRouter();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    let raw: string | null = null;
    try {
      raw = localStorage.getItem(STORAGE_KEY);
    } catch {
      return;
    }
    if (!raw) return;

    let pending: { doc_type?: string; label?: string; visa_category?: string; expiry_date?: string };
    try {
      pending = JSON.parse(raw);
    } catch {
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
      return;
    }

    if (!pending?.doc_type || !pending?.label || !pending?.expiry_date) {
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
      return;
    }

    (async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return; // not signed in yet — leave it for next load

      // Clear first so a slow insert can't cause a duplicate on a second mount.
      try { localStorage.removeItem(STORAGE_KEY); } catch {}

      // Make sure email reminders are on for this user.
      // @ts-expect-error — hand-crafted DB types incompatible with Supabase v2 write generics
      await supabase.from("profiles").upsert({ id: user.id, email: user.email!, reminder_email: true });

      // @ts-expect-error — hand-crafted DB types incompatible with Supabase v2 write generics
      const { error } = await supabase.from("documents").insert({
        user_id: user.id,
        doc_type: pending.doc_type,
        label: pending.label,
        visa_category: pending.visa_category || "H-1B",
        expiry_date: pending.expiry_date,
      });

      if (!error) router.refresh();
    })();
  }, [router]);

  return null;
}
