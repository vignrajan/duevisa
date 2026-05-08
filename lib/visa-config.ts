// /lib/visa-config.ts

export const VISA_CONFIG = {
  "H-1B": {
    label: "H-1B Specialty Worker",
    code: "H-1B",
    color: "#6366f1",
    documents: [
      { type: "h1b_stamp", label: "H-1B Visa Stamp", description: "Stamp in your passport (not same as status)", renewLeadDays: 90, required: true },
      { type: "i94", label: "I-94 Authorized Stay", description: "Your authorized period of stay — most critical", renewLeadDays: 180, required: true },
      { type: "i797", label: "I-797 Petition Approval", description: "USCIS H-1B petition — employer must file extension", renewLeadDays: 180, required: true },
      { type: "passport", label: "Passport", description: "Must be valid 6 months beyond any travel date", renewLeadDays: 270, required: true },
      { type: "ead", label: "EAD Work Permit", description: "If on H-4 EAD or combo card — apply 180 days before", renewLeadDays: 180, required: false },
      { type: "drivers_license", label: "Driver's License", description: "Many states tie to visa/status expiry", renewLeadDays: 60, required: false },
    ],
  },
  "F-1": {
    label: "F-1 International Student",
    code: "F-1",
    color: "#10b981",
    documents: [
      { type: "f1_stamp", label: "F-1 Visa Stamp", description: "Stamp in passport — needed to re-enter US", renewLeadDays: 90, required: true },
      { type: "i20", label: "I-20 Program End Date", description: "Your DS-2019 or I-20 — maintain full-time status", renewLeadDays: 120, required: true },
      { type: "sevis", label: "SEVIS Fee / Registration", description: "Student exchange visitor system — check with DSO", renewLeadDays: 90, required: true },
      { type: "passport", label: "Passport", description: "Must be valid throughout program", renewLeadDays: 270, required: true },
      { type: "opt_ead", label: "OPT EAD", description: "Optional Practical Training — apply 90 days before graduation", renewLeadDays: 150, required: false },
      { type: "stem_opt", label: "STEM OPT Extension", description: "24-month extension — apply 90 days before OPT ends", renewLeadDays: 120, required: false },
    ],
  },
  "Green Card": {
    label: "Lawful Permanent Resident",
    code: "GC",
    color: "#f59e0b",
    documents: [
      { type: "green_card", label: "Green Card (I-551)", description: "Permanent Resident Card — renew 6 months before expiry", renewLeadDays: 180, required: true },
      { type: "passport", label: "Home Country Passport", description: "Keep valid for travel", renewLeadDays: 270, required: true },
      { type: "reentry_permit", label: "Re-entry Permit", description: "If traveling abroad for 1+ year — apply before leaving", renewLeadDays: 90, required: false },
      { type: "i751", label: "I-751 (Remove Conditions)", description: "If on 2-year conditional green card — file within 90-day window", renewLeadDays: 90, required: false },
      { type: "n400", label: "N-400 Citizenship Eligibility", description: "Track when you're eligible to apply for citizenship", renewLeadDays: 90, required: false },
    ],
  },
  "TN": {
    label: "TN Visa (Canada/Mexico)",
    code: "TN",
    color: "#ef4444",
    documents: [
      { type: "tn_i94", label: "TN Status (I-94)", description: "Authorized period of stay — renew at port of entry or with I-129", renewLeadDays: 180, required: true },
      { type: "passport", label: "Passport", description: "Must be valid throughout TN period", renewLeadDays: 270, required: true },
      { type: "employer_letter", label: "Employer Support Letter", description: "Updated letter needed for any TN renewal", renewLeadDays: 90, required: true },
    ],
  },
  "O-1": {
    label: "O-1 Extraordinary Ability",
    code: "O-1",
    color: "#8b5cf6",
    documents: [
      { type: "o1_stamp", label: "O-1 Visa Stamp", description: "Stamp in passport — needed for re-entry", renewLeadDays: 90, required: true },
      { type: "i94", label: "I-94 Authorized Stay", description: "Your authorized period of stay", renewLeadDays: 180, required: true },
      { type: "i797", label: "I-797 Approval Notice", description: "USCIS O-1 petition — employer/agent files extension", renewLeadDays: 180, required: true },
      { type: "passport", label: "Passport", description: "Must be valid 6 months beyond travel", renewLeadDays: 270, required: true },
    ],
  },
  "L-1": {
    label: "L-1 Intracompany Transfer",
    code: "L-1",
    color: "#06b6d4",
    documents: [
      { type: "l1_stamp", label: "L-1 Visa Stamp", description: "Stamp in passport — needed for re-entry", renewLeadDays: 90, required: true },
      { type: "i94", label: "I-94 Authorized Stay", description: "Your authorized period of stay", renewLeadDays: 180, required: true },
      { type: "i797", label: "I-797 Petition Approval", description: "USCIS L-1 petition — employer must file", renewLeadDays: 180, required: true },
      { type: "passport", label: "Passport", description: "Must be valid 6 months beyond travel", renewLeadDays: 270, required: true },
    ],
  },
  "H-4": {
    label: "H-4 Dependent Spouse",
    code: "H-4",
    color: "#ec4899",
    documents: [
      { type: "h4_stamp", label: "H-4 Visa Stamp", description: "Stamp in passport — tied to H-1B spouse status", renewLeadDays: 90, required: true },
      { type: "i94", label: "I-94 Authorized Stay", description: "Authorized period of stay", renewLeadDays: 180, required: true },
      { type: "passport", label: "Passport", description: "Keep valid at all times", renewLeadDays: 270, required: true },
      { type: "h4_ead", label: "H-4 EAD Work Permit", description: "Only if H-1B spouse has approved I-140 — apply 180 days before expiry", renewLeadDays: 180, required: false },
    ],
  },
} as const;

export type VisaType = keyof typeof VISA_CONFIG;

export type DocumentConfig = {
  type: string;
  label: string;
  description: string;
  renewLeadDays: number;
  required: boolean;
};

export const VISA_TYPES = Object.keys(VISA_CONFIG) as VisaType[];

export function getVisaConfig(visaType: VisaType) {
  return VISA_CONFIG[visaType];
}

export function getDocumentConfig(visaType: VisaType, docType: string): DocumentConfig | undefined {
  return VISA_CONFIG[visaType].documents.find((d) => d.type === docType);
}
