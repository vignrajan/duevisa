// /lib/supabase/admin.ts
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

/**
 * Admin client that uses the SERVICE_ROLE_KEY to bypass RLS.
 * USE ONLY ON THE SERVER. NEVER EXPOSE TO CLIENT.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Missing Supabase admin environment variables.");
  }

  return createClient<Database>(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
