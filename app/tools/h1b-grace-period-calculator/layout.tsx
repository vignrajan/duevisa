import { Metadata } from "next";

export const metadata: Metadata = {
  title: "H-1B Grace Period Calculator (60-Day Rule) — Free | DueVisa",
  description: "Free H-1B grace period calculator. Enter your last day of employment and I-94 expiry to find your exact 60-day grace period end date, days remaining, and your options after a layoff.",
  keywords: [
    "h1b grace period calculator",
    "h-1b 60 day grace period",
    "h1b grace period after layoff",
    "h1b grace period end date",
    "60 day grace period h1b calculator",
  ],
  alternates: { canonical: "https://duevisa.com/tools/h1b-grace-period-calculator" },
  openGraph: {
    title: "H-1B Grace Period Calculator (60-Day Rule)",
    description: "Find your exact H-1B 60-day grace period end date — the earlier of 60 days after your last day of employment or your I-94 expiry.",
    url: "https://duevisa.com/tools/h1b-grace-period-calculator",
    type: "website",
  },
};

export default function H1bGracePeriodCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
