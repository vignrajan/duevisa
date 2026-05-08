// /app/signup/onboarding/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ChevronRight, ChevronLeft, Check, Bell, Mail, Phone } from "lucide-react";
import { VISA_CONFIG, VISA_TYPES, type VisaType } from "@/lib/visa-config";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3 | 4;

interface DocumentEntry {
  type: string;
  label: string;
  expiryDate: string;
  selected: boolean;
}

interface FamilyMember {
  fullName: string;
  relationship: string;
  visaCategory: string;
}

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState<Step>(1);
  const [selectedVisa, setSelectedVisa] = useState<VisaType | null>(null);
  const [documents, setDocuments] = useState<DocumentEntry[]>([]);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [reminderEmail, setReminderEmail] = useState(true);
  const [reminderSms, setReminderSms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Step 1 → Step 2: set documents for selected visa
  function handleVisaSelect(visa: VisaType) {
    setSelectedVisa(visa);
    const config = VISA_CONFIG[visa];
    const docs: DocumentEntry[] = config.documents.map((d) => ({
      type: d.type,
      label: d.label,
      expiryDate: "",
      selected: d.required,
    }));
    setDocuments(docs);
    setStep(2);
  }

  function addFamilyMember() {
    setFamilyMembers([...familyMembers, { fullName: "", relationship: "spouse", visaCategory: "" }]);
  }

  function updateFamilyMember(index: number, field: keyof FamilyMember, value: string) {
    const updated = [...familyMembers];
    updated[index] = { ...updated[index], [field]: value };
    setFamilyMembers(updated);
  }

  function removeFamilyMember(index: number) {
    setFamilyMembers(familyMembers.filter((_, i) => i !== index));
  }

  async function handleFinish() {
    setLoading(true);
    setError("");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    try {
      // @ts-expect-error — hand-crafted DB types incompatible with Supabase v2.105 generics for writes
      await supabase.from("profiles").upsert({
        id: user.id,
        email: user.email!,
        reminder_email: reminderEmail,
        reminder_sms: reminderSms,
      });

      // Insert selected documents
      const docsToInsert = documents
        .filter((d) => d.selected && d.expiryDate)
        .map((d) => ({
          user_id: user.id,
          doc_type: d.type,
          label: d.label,
          visa_category: selectedVisa!,
          expiry_date: d.expiryDate,
        }));

      if (docsToInsert.length > 0) {
        // @ts-expect-error — hand-crafted DB types incompatible with Supabase v2.105 generics for writes
        const { error: docsError } = await supabase.from("documents").insert(docsToInsert);
        if (docsError) throw docsError;
      }

      // Insert family members
      const familyToInsert = familyMembers
        .filter((f) => f.fullName && f.visaCategory)
        .map((f) => ({
          user_id: user.id,
          full_name: f.fullName,
          relationship: f.relationship,
          visa_category: f.visaCategory,
        }));

      if (familyToInsert.length > 0) {
        // @ts-expect-error — hand-crafted DB types incompatible with Supabase v2.105 generics for writes
        await supabase.from("family_members").insert(familyToInsert);
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const stepTitles = ["Visa Type", "Documents", "Family", "Reminders"];
  const stepProgress = ((step - 1) / 3) * 100;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-page)" }}>
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      {/* Header */}
      <div className="relative border-b border-white/5 px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="font-syne font-bold text-lg">
              <span className="text-white">Due</span>
              <span className="text-lime">Visa</span>
            </span>
            <span className="text-sage text-sm font-mono">Step {step} of 4</span>
          </div>
          {/* Progress bar */}
          <div className="h-1 bg-white/10 rounded-full">
            <div
              className="h-1 bg-lime rounded-full transition-all duration-500"
              style={{ width: `${stepProgress}%` }}
            />
          </div>
          {/* Step labels */}
          <div className="flex justify-between mt-2">
            {stepTitles.map((title, i) => (
              <span
                key={title}
                className={cn(
                  "text-[10px] font-mono uppercase tracking-wider",
                  step === i + 1 ? "text-lime" : step > i + 1 ? "text-lime/60" : "text-sage/40"
                )}
              >
                {title}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative flex-1 flex items-start justify-center py-10 px-4">
        <div className="w-full max-w-2xl">
          {/* Step 1 — Visa Selection */}
          {step === 1 && (
            <div className="animate-fade-in-up">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                What visa type are you on?
              </h1>
              <p className="text-sage mb-8">
                Select your primary visa. We&apos;ll show you all the documents you need to track.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {VISA_TYPES.map((visa) => {
                  const config = VISA_CONFIG[visa];
                  return (
                    <button
                      key={visa}
                      onClick={() => handleVisaSelect(visa)}
                      className={cn(
                        "text-left p-5 rounded-2xl border transition-all duration-200 group",
                        "border-white/10 hover:border-lime/30 hover:bg-lime/5"
                      )}
                    >
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 font-mono font-bold text-xs flex-shrink-0" style={{ background: VISA_CONFIG[visa].color + "22", color: VISA_CONFIG[visa].color }}>{visa}</div>
                      <span className="font-syne font-bold text-white text-lg block">{visa}</span>
                      <span className="text-sage text-sm block mt-1">{config.label}</span>
                      <div className="flex items-center gap-1 mt-3 text-sage/60 text-xs group-hover:text-lime/60">
                        <span>{config.documents.length} documents to track</span>
                        <ChevronRight size={12} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2 — Documents */}
          {step === 2 && selectedVisa && (
            <div className="animate-fade-in-up">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                Enter your document dates
              </h1>
              <p className="text-sage mb-8">
                Required documents are pre-selected. Enter expiry dates for the ones you have.
              </p>
              <div className="space-y-3">
                {documents.map((doc, i) => {
                  const config = VISA_CONFIG[selectedVisa].documents.find((d) => d.type === doc.type);
                  return (
                    <div
                      key={doc.type}
                      className={cn(
                        "rounded-xl border p-4 transition-all",
                        doc.selected ? "border-lime/20 bg-lime/5" : "border-white/10 bg-card/50"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => {
                            const updated = [...documents];
                            updated[i].selected = !updated[i].selected;
                            setDocuments(updated);
                          }}
                          className={cn(
                            "mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all",
                            doc.selected
                              ? "border-lime bg-lime"
                              : "border-white/20 bg-transparent"
                          )}
                          aria-label={`${doc.selected ? "Deselect" : "Select"} ${doc.label}`}
                        >
                          {doc.selected && <Check size={11} className="text-midnight" />}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-syne font-semibold text-white text-sm">{doc.label}</span>
                            {config?.required && (
                              <span className="badge badge-good text-[9px]">Required</span>
                            )}
                          </div>
                          <p className="text-sage text-xs mb-3">{config?.description}</p>
                          {doc.selected && (
                            <div>
                              <label
                                htmlFor={`expiry-${doc.type}`}
                                className="text-sage/70 text-xs mb-1 block"
                              >
                                Expiry date
                              </label>
                              <input
                                id={`expiry-${doc.type}`}
                                type="date"
                                value={doc.expiryDate}
                                onChange={(e) => {
                                  const updated = [...documents];
                                  updated[i].expiryDate = e.target.value;
                                  setDocuments(updated);
                                }}
                                className="input-field text-sm py-2"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-3 mt-8">
                <button onClick={() => setStep(1)} className="btn-ghost flex items-center gap-1">
                  <ChevronLeft size={16} />
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  Next: Family Members
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3 — Family */}
          {step === 3 && (
            <div className="animate-fade-in-up">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                Any dependents on a visa?
              </h1>
              <p className="text-sage mb-8">
                Add family members to track their deadlines too. Optional — you can add them later.
              </p>

              {familyMembers.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl mb-6">
                  <p className="text-sage mb-4">No family members added yet</p>
                  <button onClick={addFamilyMember} className="btn-secondary text-sm">
                    + Add family member
                  </button>
                </div>
              ) : (
                <div className="space-y-4 mb-6">
                  {familyMembers.map((member, i) => (
                    <div key={i} className="card border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-syne font-semibold text-white text-sm">
                          Family Member {i + 1}
                        </span>
                        <button
                          onClick={() => removeFamilyMember(i)}
                          className="text-sage/60 hover:text-critical text-xs transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label htmlFor={`family-name-${i}`} className="label">Full name</label>
                          <input
                            id={`family-name-${i}`}
                            type="text"
                            value={member.fullName}
                            onChange={(e) => updateFamilyMember(i, "fullName", e.target.value)}
                            placeholder="e.g. Jane Doe"
                            className="input-field"
                          />
                        </div>
                        <div>
                          <label htmlFor={`family-rel-${i}`} className="label">Relationship</label>
                          <select
                            id={`family-rel-${i}`}
                            value={member.relationship}
                            onChange={(e) => updateFamilyMember(i, "relationship", e.target.value)}
                            className="input-field"
                          >
                            <option value="spouse">Spouse</option>
                            <option value="child">Child</option>
                            <option value="dependent">Dependent</option>
                          </select>
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor={`family-visa-${i}`} className="label">Visa category</label>
                          <select
                            id={`family-visa-${i}`}
                            value={member.visaCategory}
                            onChange={(e) => updateFamilyMember(i, "visaCategory", e.target.value)}
                            className="input-field"
                          >
                            <option value="">Select visa type...</option>
                            {VISA_TYPES.map((v) => (
                              <option key={v} value={v}>{v} — {VISA_CONFIG[v].label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={addFamilyMember} className="btn-ghost w-full text-sm border border-dashed border-white/10">
                    + Add another
                  </button>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="btn-ghost flex items-center gap-1">
                  <ChevronLeft size={16} />
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  Next: Reminders
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 4 — Reminders */}
          {step === 4 && (
            <div className="animate-fade-in-up">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                How should we remind you?
              </h1>
              <p className="text-sage mb-8">
                You&apos;ll get reminders at 180, 90, 60, 30, and 7 days before each deadline.
              </p>

              <div className="space-y-4 mb-8">
                {/* Email */}
                <div
                  className={cn(
                    "flex items-center gap-4 p-5 rounded-2xl border cursor-pointer transition-all",
                    reminderEmail ? "border-lime/30 bg-lime/5" : "border-white/10"
                  )}
                  onClick={() => setReminderEmail(!reminderEmail)}
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      reminderEmail ? "bg-lime/20" : "bg-white/5"
                    )}
                  >
                    <Mail size={22} className={reminderEmail ? "text-lime" : "text-sage"} />
                  </div>
                  <div className="flex-1">
                    <div className="font-syne font-semibold text-white">Email reminders</div>
                    <div className="text-sage text-sm">Detailed reminders with action steps — included in all plans</div>
                  </div>
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                      reminderEmail ? "border-lime bg-lime" : "border-white/20"
                    )}
                  >
                    {reminderEmail && <Check size={12} className="text-midnight" />}
                  </div>
                </div>

                {/* SMS */}
                <div
                  className={cn(
                    "flex items-center gap-4 p-5 rounded-2xl border cursor-pointer transition-all",
                    reminderSms ? "border-lime/30 bg-lime/5" : "border-white/10"
                  )}
                  onClick={() => setReminderSms(!reminderSms)}
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      reminderSms ? "bg-lime/20" : "bg-white/5"
                    )}
                  >
                    <Phone size={22} className={reminderSms ? "text-lime" : "text-sage"} />
                  </div>
                  <div className="flex-1">
                    <div className="font-syne font-semibold text-white flex items-center gap-2">
                      SMS reminders
                      <span className="badge bg-gold/10 text-gold border border-gold/20 text-[9px]">Pro</span>
                    </div>
                    <div className="text-sage text-sm">Quick text message alerts — upgrade to Pro to unlock</div>
                  </div>
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                      reminderSms ? "border-lime bg-lime" : "border-white/20"
                    )}
                  >
                    {reminderSms && <Check size={12} className="text-midnight" />}
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-card border border-white/5 rounded-2xl p-5 mb-8">
                <h3 className="font-syne font-semibold text-white mb-3">Your reminders schedule:</h3>
                <div className="space-y-2">
                  {[
                    { days: 180, label: "Start preparing — here's your renewal checklist" },
                    { days: 90, label: "Renewal window opens — here's what to do" },
                    { days: 60, label: "Action recommended — don't wait longer" },
                    { days: 30, label: "Start your renewal immediately" },
                    { days: 7, label: "File immediately if you haven't" },
                  ].map((r) => (
                    <div key={r.days} className="flex items-center gap-3">
                      <span className="font-mono text-lime text-sm w-12 text-right">{r.days}d</span>
                      <span className="text-sage text-sm">{r.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {error && (
                <div className="bg-critical/10 border border-critical/20 rounded-lg px-4 py-3 mb-4">
                  <p className="text-critical text-sm">{error}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={() => setStep(3)} className="btn-ghost flex items-center gap-1">
                  <ChevronLeft size={16} />
                  Back
                </button>
                <button
                  onClick={handleFinish}
                  disabled={loading}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Setting up your tracker...
                    </>
                  ) : (
                    <>
                      <Bell size={16} />
                      Go to my dashboard →
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
