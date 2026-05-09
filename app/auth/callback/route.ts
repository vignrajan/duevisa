// /app/auth/callback/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      // Log the real error for debugging
      console.error("[Auth Callback Error]", error.message, error);
      return NextResponse.redirect(
        `${origin}/login?error=auth-callback-error&reason=${encodeURIComponent(error.message)}`
      );
    }

    // Check if new user needs onboarding (no documents yet)
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: docs } = await supabase
        .from("documents")
        .select("id")
        .eq("user_id", user.id)
        .limit(1);

      // If they have no documents, send to onboarding
      if (!docs || docs.length === 0) {
        return NextResponse.redirect(`${origin}/signup/onboarding`);
      }
    }
    return NextResponse.redirect(`${origin}${next}`);
  }

  console.error("[Auth Callback] No code param found in URL");
  return NextResponse.redirect(`${origin}/login?error=auth-callback-error&reason=no_code`);
}
