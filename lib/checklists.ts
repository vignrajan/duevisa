export type ChecklistStep = {
  id: number;
  text: string;
  detail?: string;
};

export type Checklist = {
  key: string;
  title: string;
  triggerDays: number;
  steps: ChecklistStep[];
};

export const CHECKLISTS: Record<string, Checklist> = {
  h1b: {
    key: "h1b",
    title: "H-1B Renewal Checklist",
    triggerDays: 180,
    steps: [
      { id: 1, text: "Confirm employer is filing H-1B extension", detail: "Contact your HR or attorney to confirm they are aware of the upcoming expiry" },
      { id: 2, text: "Gather current I-797 approval notice" },
      { id: 3, text: "Check passport validity — must be valid 6+ months beyond I-797 expiry" },
      { id: 4, text: "Download latest I-94 record", detail: "Visit cbp.dhs.gov/I94 to get your current authorized stay record" },
      { id: 5, text: "Collect last 3 pay stubs" },
      { id: 6, text: "Get employment verification letter from HR" },
      { id: 7, text: "Attorney files Form I-129 with USCIS" },
      { id: 8, text: "Pay USCIS filing fees", detail: "I-129 base fee + ACWIA fee + optional $2,500 premium processing" },
      { id: 9, text: "Save I-797 receipt notice when received" },
      { id: 10, text: "Receive approval — update DueVisa with new expiry date" },
    ],
  },
  ead: {
    key: "ead",
    title: "EAD Renewal Checklist",
    triggerDays: 180,
    steps: [
      { id: 1, text: "Confirm your EAD eligibility category", detail: "H-4 EAD, AOS EAD, OPT EAD, or STEM OPT EAD" },
      { id: 2, text: "Photograph current EAD card (front and back)" },
      { id: 3, text: "Gather valid passport and current I-94 record" },
      { id: 4, text: "Gather H-1B I-797 if filing as H-4 dependent" },
      { id: 5, text: "Get 2 passport-style photos", detail: "2x2 inches, white background" },
      { id: 6, text: "File Form I-765 with USCIS" },
      { id: 7, text: "Pay USCIS filing fee", detail: "Check uscis.gov for current fee — approximately $410" },
      { id: 8, text: "Save receipt notice", detail: "Your 180-day automatic extension begins from the date on this notice" },
      { id: 9, text: "Attend biometrics appointment if scheduled" },
      { id: 10, text: "Receive new EAD — update DueVisa with new expiry date" },
    ],
  },
  passport: {
    key: "passport",
    title: "Passport Renewal Checklist",
    triggerDays: 270,
    steps: [
      { id: 1, text: "Download Form DS-82 from travel.state.gov", detail: "Use DS-82 for renewal. Use DS-11 if your passport is lost, stolen, or more than 15 years old" },
      { id: 2, text: "Get new passport photo", detail: "2x2 inches, white background, taken within 6 months" },
      { id: 3, text: "Collect current expiring passport" },
      { id: 4, text: "Pay fee and submit application", detail: "$130 routine (6-8 weeks) or $160 expedited (2-3 weeks)" },
      { id: 5, text: "Track application status", detail: "Visit passportappointment.travel.state.gov" },
      { id: 6, text: "Receive new passport" },
      { id: 7, text: "Check old passport — visa stamps may still be valid for travel" },
      { id: 8, text: "Update DueVisa with new passport expiry date" },
    ],
  },
  greencard: {
    key: "greencard",
    title: "Green Card Renewal Checklist",
    triggerDays: 365,
    steps: [
      { id: 1, text: "File Form I-90 with USCIS", detail: "Do not file I-485 — that is for Adjustment of Status, not renewal" },
      { id: 2, text: "Gather expiring green card and government-issued photo ID" },
      { id: 3, text: "Get 2 passport-style photos" },
      { id: 4, text: "Pay USCIS fee", detail: "$455 filing fee + $85 biometrics fee" },
      { id: 5, text: "Save receipt notice — this extends your status while pending" },
      { id: 6, text: "Attend biometrics appointment" },
      { id: 7, text: "Receive new green card" },
      { id: 8, text: "Update DueVisa with new expiry date" },
    ],
  },
  i94: {
    key: "i94",
    title: "I-94 Status Check Checklist",
    triggerDays: 90,
    steps: [
      { id: 1, text: "Visit cbp.dhs.gov/I94 to get latest record" },
      { id: 2, text: "Download and save your current I-94 record" },
      { id: 3, text: "Note your authorized stay end date", detail: "This may say D/S (Duration of Status) or a specific date" },
      { id: 4, text: "Compare against your visa stamp expiry — they are different dates" },
      { id: 5, text: "Confirm your H-1B or EAD is valid through your stay period" },
      { id: 6, text: "Contact immigration attorney if any dates do not align" },
    ],
  },
};

export function getChecklistForDocument(documentType: string): Checklist | null {
  const typeMap: Record<string, string> = {
    h1b: "h1b",
    h1b_visa_stamp: "h1b",
    h1b_stamp: "h1b",
    i797: "h1b",
    ead: "ead",
    h4_ead: "ead",
    passport: "passport",
    green_card: "greencard",
    greencard: "greencard",
    i94: "i94",
    i_94: "i94",
  };

  const key = typeMap[documentType.toLowerCase().replace(/[-\s]/g, "_")];
  return key ? CHECKLISTS[key] : null;
}
