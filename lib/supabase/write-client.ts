// /lib/supabase/admin.ts
// Untyped client for write operations when using hand-crafted Database types.
// For reads, always use the typed createClient() from client.ts or server.ts.
import { createBrowserClient } from "@supabase/ssr";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createWriteClient(): ReturnType<typeof createBrowserClient<any>> {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
