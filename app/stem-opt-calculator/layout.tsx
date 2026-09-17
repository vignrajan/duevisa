import { Metadata } from "next";

export const metadata: Metadata = {
  title: "STEM OPT Extension Deadline Calculator (2026) — Free",
  description: "Enter your OPT EAD expiry date and instantly see your 90-day STEM OPT filing window, the last day to file, your 24-month extension end date, and the 180-day pending-work window.",
  keywords: ["stem opt calculator", "stem opt extension deadline", "stem opt filing window", "stem opt 90 day window", "when to file stem opt"],
  alternates: { canonical: "https://duevisa.com/stem-opt-calculator" },
};

export default function StemOptCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
