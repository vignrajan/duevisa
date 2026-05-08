// /app/dashboard/family/FamilyClient.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ChevronLeft, Loader2, Edit2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { VISA_CONFIG, VISA_TYPES } from "@/lib/visa-config";
import type { FamilyMember } from "@/types/database";

interface FamilyClientProps {
  userId: string;
  familyMembers: FamilyMember[];
}

export function FamilyClient({ userId, familyMembers: initial }: FamilyClientProps) {
  const router = useRouter();
  const supabase = createClient();
  const [members, setMembers] = useState(initial);
  const [showForm, setShowForm] = useState(false);
  const [fullName, setFullName] = useState("");
  const [relationship, setRelationship] = useState("spouse");
  const [visaCategory, setVisaCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!visaCategory) { setError("Please select a visa type"); return; }
    setLoading(true);
    setError("");

    if (editingId) {
      const { error: dbError } = await (supabase as any)
        .from("family_members")
        .update({ full_name: fullName, relationship, visa_category: visaCategory })
        .eq("id", editingId);

      setLoading(false);
      if (dbError) {
        setError(dbError.message);
      } else {
        setMembers(members.map(m => m.id === editingId ? { ...m, full_name: fullName, relationship, visa_category: visaCategory } : m));
        handleCancel();
      }
    } else {
      const { data, error: dbError } = await (supabase as any)
        .from("family_members")
        .insert({ user_id: userId, full_name: fullName, relationship, visa_category: visaCategory })
        .select()
        .single();

      setLoading(false);
      if (dbError) {
        setError(dbError.message);
      } else {
        setMembers([...members, data]);
        handleCancel();
      }
    }
  }

  function handleCancel() {
    setShowForm(false);
    setEditingId(null);
    setFullName("");
    setRelationship("spouse");
    setVisaCategory("");
    setError("");
  }

  function startEdit(member: FamilyMember) {
    setEditingId(member.id);
    setFullName(member.full_name);
    setRelationship(member.relationship);
    setVisaCategory(member.visa_category);
    setShowForm(true);
    setError("");
  }

  async function handleRemove(id: string) {
    if (!confirm("Remove this family member?")) return;
    await (supabase as any).from("family_members").delete().eq("id", id);
    setMembers(members.filter((m) => m.id !== id));
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page-alt)" }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <Link href="/dashboard" className="flex items-center gap-2 text-secondary hover:text-primary text-sm font-semibold mb-8 transition-colors">
          <ChevronLeft size={16} />
          Back to Dashboard
        </Link>

        <div className="flex items-center justify-between mb-2">
          <h1 className="font-display text-3xl font-bold text-primary">Family Members</h1>
          <button onClick={() => { if (showForm && editingId) handleCancel(); else setShowForm(!showForm); }} className="btn-primary text-sm py-2 px-4 flex items-center gap-2">
            <Plus size={15} />
            {showForm ? "Cancel" : "Add"}
          </button>
        </div>
        <p className="text-secondary text-sm mb-8 font-medium">Track visas and deadlines for your dependents</p>

        {/* Add form */}
        {showForm && (
          <div className="card border border-border-default mb-6 animate-fade-in-up">
            <h2 className="font-syne font-bold text-primary text-base mb-4">{editingId ? "Edit Member" : "Add Family Member"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="fm-name" className="label">Full name</label>
                <input id="fm-name" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g. Jane Doe" className="input-field" required />
              </div>
              <div>
                <label htmlFor="fm-rel" className="label">Relationship</label>
                <select id="fm-rel" value={relationship} onChange={(e) => setRelationship(e.target.value)} className="input-field">
                  <option value="spouse">Spouse</option>
                  <option value="child">Child</option>
                  <option value="dependent">Dependent</option>
                </select>
              </div>
              <div>
                <label htmlFor="fm-visa" className="label">Visa type</label>
                <select id="fm-visa" value={visaCategory} onChange={(e) => setVisaCategory(e.target.value)} className="input-field" required>
                  <option value="">Select visa...</option>
                  {VISA_TYPES.map((v) => (
                    <option key={v} value={v}>{v} — {VISA_CONFIG[v].label}</option>
                  ))}
                </select>
              </div>
              {error && <p className="form-error">{error}</p>}
              <div className="flex gap-3">
                <button type="button" onClick={handleCancel} className="btn-ghost flex-1">Cancel</button>
                <button type="submit" disabled={loading} className="btn-primary flex-1 flex items-center justify-center gap-2">
                  {loading ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : (editingId ? "Save Changes" : "Add Member")}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Members list */}
        {members.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-border-default rounded-2xl">
            <p className="text-muted mb-3">No family members added yet</p>
            <button onClick={() => setShowForm(true)} className="btn-secondary text-sm">
              + Add family member
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {members.map((member) => (
              <div key={member.id} className="card bg-card-bg border border-border-default flex items-center gap-4 hover:shadow-card transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-forest/5 dark:bg-forest/40 border border-forest/10 dark:border-lime/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-forest dark:text-lime font-mono font-bold text-sm">
                    {member.full_name[0]?.toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="font-syne font-bold text-primary text-sm leading-tight">{member.full_name}</div>
                  <div className="text-secondary text-[10px] uppercase font-bold tracking-wider mt-0.5">{member.relationship} · {member.visa_category}</div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => startEdit(member)}
                    className="text-secondary/40 hover:text-forest dark:hover:text-lime transition-colors p-2"
                    aria-label={`Edit ${member.full_name}`}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleRemove(member.id)}
                    className="text-secondary/40 hover:text-red-600 transition-colors p-2"
                    aria-label={`Remove ${member.full_name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
