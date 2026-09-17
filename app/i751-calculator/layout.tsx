import { Metadata } from "next";

export const metadata: Metadata = {
  title: "I-751 Filing Window Calculator (2026) — Free",
  description: "Enter your conditional (2-year) green card expiry date and instantly see your 90-day I-751 filing window — the first day and last day you can file to remove conditions on residence.",
  keywords: ["i-751 filing window calculator", "i751 90 day window", "when to file i-751", "remove conditions green card date", "conditional green card expiry calculator"],
  alternates: { canonical: "https://duevisa.com/i751-calculator" },
};

export default function I751CalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
