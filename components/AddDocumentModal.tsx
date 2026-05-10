// /components/AddDocumentModal.tsx
"use client";

import { useState } from "react";
import { X, Plus, Save, Loader2 } from "lucide-react";
import { VISA_CONFIG, VISA_TYPES, type VisaType } from "@/lib/visa-config";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { DocumentWithStatus } from "@/types/database";

interface AddDocumentModalProps {
  userId: string;
  onClose: () => void;
  onSuccess: () => void;
  document?: DocumentWithStatus; // when provided, modal is in edit mode
}

export function AddDocumentModal({ userId, onClose, onSuccess, document: editDoc }: AddDocumentModalProps) {
  const isEditing = !!editDoc;

  const [step, setStep] = useState<"visa" | "doc">(isEditing ? "doc" : "visa");
  const [selectedVisa, setSelectedVisa] = useState<VisaType | null>(
    isEditing ? (editDoc.visa_category as VisaType) : null
  );
  const [selectedDocType, setSelectedDocType] = useState(isEditing ? editDoc.doc_type : "");
  const [customLabel, setCustomLabel] = useState(isEditing ? editDoc.label : "");
  const [expiryDate, setExpiryDate] = useState(isEditing ? editDoc.expiry_date : "");
  const [issuedDate, setIssuedDate] = useState(isEditing ? (editDoc.issued_date ?? "") : "");
  const [notes, setNotes] = useState(isEditing ? (editDoc.notes ?? "") : "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedVisa || !selectedDocType || !expiryDate) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const docConfig = VISA_CONFIG[selectedVisa].documents.find((d) => d.type === selectedDocType);
      const label = customLabel || docConfig?.label || selectedDocType;

      if (isEditing) {
        // @ts-expect-error — hand-crafted DB types incompatible with Supabase v2.105 generics for writes
        const { error: dbError } = await supabase.from("documents").update({
          doc_type: selectedDocType,
          label,
          expiry_date: expiryDate,
          issued_date: issuedDate || null,
          notes: notes || null,
        }).eq("id", editDoc.id);
        if (dbError) throw dbError;
      } else {
        // @ts-expect-error — hand-crafted DB types incompatible with Supabase v2.105 generics for writes
        const { error: dbError } = await supabase.from("documents").insert({
          user_id: userId,
          doc_type: selectedDocType,
          label,
          visa_category: selectedVisa,
          expiry_date: expiryDate,
          issued_date: issuedDate || null,
          notes: notes || null,
        });
        if (dbError) throw dbError;
      }

      onSuccess();
    } catch (err: any) {
      console.error("Document save error:", err);
      if (err.message?.includes("foreign key constraint") || err.code === "23503") {
        setError("Your user profile is being initialized. Please refresh the page and try again.");
      } else {
        setError(err.message || "Failed to save document. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-midnight/80 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg bg-card-bg rounded-2xl border border-border-default shadow-card overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-default">
          <div>
            <h2 className="font-syne font-bold text-primary text-lg">
              {isEditing ? "Edit Document" : "Add Document"}
            </h2>
            <p className="text-muted text-sm mt-0.5">
              {isEditing ? "Update this document's details" : "Track a new immigration document"}
            </p>
          </div>
          <button onClick={onClose} className="btn-ghost p-2" aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          {step === "visa" && (
            <div>
              <p className="text-muted text-sm mb-4">Select your visa type:</p>
              <div className="grid grid-cols-2 gap-3">
                {VISA_TYPES.map((visa) => {
                  const config = VISA_CONFIG[visa];
                  return (
                    <button
                      key={visa}
                      onClick={() => {
                        setSelectedVisa(visa);
                        setStep("doc");
                      }}
                      className={cn(
                        "text-left p-3 rounded-xl border transition-all duration-200",
                        "border-border-default hover:border-lime/30 hover:bg-lime/5"
                      )}
                    >
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-1 font-mono font-bold text-[10px]" style={{ background: config.color + "15", color: config.color }}>{visa}</div>
                      <span className="font-syne font-semibold text-primary text-xs block">{visa}</span>
                      <span className="text-secondary text-[10px] block mt-0.5 leading-tight">{config.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === "doc" && selectedVisa && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Visa context row */}
              <div className="flex items-center gap-2 mb-2">
                {!isEditing && (
                  <>
                    <button
                      type="button"
                      onClick={() => setStep("visa")}
                      className="text-muted hover:text-primary text-sm transition-colors"
                    >
                      ← Back
                    </button>
                    <span className="text-muted/40">|</span>
                  </>
                )}
                <span className="font-mono text-xs text-forest dark:text-lime font-bold">{selectedVisa}</span>
                {isEditing && (
                  <span className="text-muted text-xs">· visa type locked</span>
                )}
              </div>

              {/* Document type */}
              <div>
                <label htmlFor="doc-type-select" className="label">Document Type *</label>
                <select
                  id="doc-type-select"
                  value={selectedDocType}
                  onChange={(e) => {
                    setSelectedDocType(e.target.value);
                    if (!isEditing) {
                      const docConfig = VISA_CONFIG[selectedVisa].documents.find(
                        (d) => d.type === e.target.value
                      );
                      if (docConfig) setCustomLabel(docConfig.label);
                    }
                  }}
                  className="input-field"
                  required
                >
                  <option value="">Select document type...</option>
                  {VISA_CONFIG[selectedVisa].documents.map((doc) => (
                    <option key={doc.type} value={doc.type}>
                      {doc.label} {doc.required ? "*" : "(optional)"}
                    </option>
                  ))}
                </select>
                {selectedDocType && (
                  <p className="text-secondary text-xs mt-1.5 leading-relaxed">
                    {VISA_CONFIG[selectedVisa].documents.find((d) => d.type === selectedDocType)?.description}
                  </p>
                )}
              </div>

              {/* Custom label */}
              <div>
                <label htmlFor="custom-label" className="label">Label</label>
                <input
                  id="custom-label"
                  type="text"
                  value={customLabel}
                  onChange={(e) => setCustomLabel(e.target.value)}
                  placeholder="e.g. My H-1B Visa Stamp"
                  className="input-field"
                />
              </div>

              {/* Expiry date */}
              <div>
                <label htmlFor="expiry-date" className="label">Expiry Date *</label>
                <input
                  id="expiry-date"
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              {/* Issued date */}
              <div>
                <label htmlFor="issued-date" className="label">Issued Date (optional)</label>
                <input
                  id="issued-date"
                  type="date"
                  value={issuedDate}
                  onChange={(e) => setIssuedDate(e.target.value)}
                  className="input-field"
                />
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="doc-notes" className="label">Notes (optional)</label>
                <textarea
                  id="doc-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional notes..."
                  rows={2}
                  className="input-field resize-none"
                />
              </div>

              {error && <p className="form-error">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Saving...
                  </>
                ) : isEditing ? (
                  <>
                    <Save size={16} />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    Add Document
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
