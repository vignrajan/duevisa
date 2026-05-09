// /app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardClient } from "./DashboardClient";
import type { Profile } from "@/types/database";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch or create profile with explicit typing to prevent inference errors
  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  let profile: Profile | null = existingProfile;

  if (!profile) {
    const { createAdminClient } = await import("@/lib/supabase/admin");
    const adminSupabase = createAdminClient();
    
    const { data: newProfile, error: upsertError } = await adminSupabase
      .from("profiles")
      .upsert({
        id: user.id,
        email: user.email!,
        full_name: user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
        plan: "free",
      })
      .select()
      .single();
    
    if (upsertError) {
      console.error("Profile creation error:", upsertError);
    } else {
      profile = newProfile;
    }
  }

  // Fetch documents
  const { data: documents } = await supabase
    .from("documents")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .order("expiry_date", { ascending: true });

  // Fetch family members
  const { data: familyMembers } = await supabase
    .from("family_members")
    .select("*")
    .eq("user_id", user.id);

  return (
    <DashboardClient
      user={user}
      profile={profile}
      documents={documents || []}
      familyMembers={familyMembers || []}
    />
  );
}
