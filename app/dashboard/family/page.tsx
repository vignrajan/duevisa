// /app/dashboard/family/page.tsx
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { FamilyClient } from "./FamilyClient";

export const metadata = { title: "Family Members" };

export default async function FamilyPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: familyMembers } = await supabase
    .from("family_members")
    .select("*")
    .eq("user_id", user.id);

  return <FamilyClient userId={user.id} familyMembers={familyMembers || []} />;
}
