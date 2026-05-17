import { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Scale, CheckCircle2, Mail } from "lucide-react";
import { AttorneyLeadForm } from "./AttorneyLeadForm";

export const metadata: Metadata = {
  title: "Find an Immigration Attorney — DueVisa",
  description: "Need an immigration attorney? Describe your situation and we'll help connect you with the right legal professional for your visa or green card case.",
  alternates: { canonical: "https://duevisa.com/attorneys" },
};

const WHEN_YOU_NEED = [
  "Your H-1B renewal is denied or delayed",
  "You've received an RFE (Request for Evidence)",
  "You're considering an EB-1 or EB-2 NIW petition",
  "You've overstayed or have a status gap",
  "You're filing an I-485 adjustment of status",
  "Your employer won't sponsor your green card",
];

export default function AttorneysPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Hero */}
          <div className="text-center mb-16">
            <div className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: "var(--color-forest)" }}>
              <Scale size={24} style={{ color: "var(--color-lime)" }} />
            </div>
            <span className="badge badge-good mb-4 inline-flex">Attorney Connect</span>
            <h1 className="h-section mb-5" style={{ color: "var(--text-primary)" }}>
              Need an immigration attorney?
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              DueVisa tracks your deadlines — but some situations require legal advice. Describe your case below and we&apos;ll help connect you with the right attorney within 24 hours.
            </p>
          </div>

          {/* Lead form */}
          <div className="mb-16 p-8 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)" }}>
            <h2 className="font-bold text-xl mb-2" style={{ color: "var(--text-primary)" }}>
              Tell us about your situation
            </h2>
            <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
              We&apos;ll respond within 24 hours. This is not legal advice — we&apos;re helping you find the right attorney.
            </p>
            <AttorneyLeadForm />
          </div>

          {/* When you need an attorney */}
          <div className="mb-16">
            <h2 className="font-bold text-xl mb-6" style={{ color: "var(--text-primary)" }}>
              When you need an attorney (not just a tracker)
            </h2>
            <div className="space-y-3">
              {WHEN_YOU_NEED.map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "var(--bg-page-alt)", border: "1px solid var(--border-default)" }}>
                  <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-forest)" }} />
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Are you an attorney? */}
          <div className="p-8 rounded-2xl text-center" style={{ background: "var(--bg-page-alt)", border: "1px solid var(--border-default)" }}>
            <h2 className="font-bold text-lg mb-2" style={{ color: "var(--text-primary)" }}>
              Are you an immigration attorney?
            </h2>
            <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
              We&apos;re building a vetted attorney directory. Apply to be listed and connect with immigrants who need your expertise.
            </p>
            <a
              href="mailto:attorneys@duevisa.com?subject=Attorney Directory Application"
              className="btn-primary inline-flex items-center gap-2 text-sm px-6 py-3 cursor-pointer"
            >
              <Mail size={14} /> Apply to be listed →
            </a>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-4 rounded-xl" style={{ background: "var(--bg-page-alt)" }}>
            <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
              DueVisa is not a law firm and does not provide legal advice. Attorney referrals are a courtesy service only. Always verify an attorney&apos;s credentials independently.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
