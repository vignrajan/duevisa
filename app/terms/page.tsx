import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FileText, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | DueVisa",
  description:
    "DueVisa terms of service. Understand your rights and responsibilities when using our immigration deadline tracking platform.",
  alternates: { canonical: "https://duevisa.com/terms" },
};

const SECTIONS = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    body: [
      "By accessing or using DueVisa (\"the Service\"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the Service.",
      "These terms form a legally binding agreement between you and DueVisa (a sole proprietorship). Your continued use of the Service after any changes to these terms constitutes acceptance of the updated terms.",
    ],
  },
  {
    id: "what-duevisa-is",
    title: "2. What DueVisa Is — and Is Not",
    body: [
      "DueVisa is a deadline tracking and reminder tool. It helps you record immigration document expiry dates and sends you email reminders before those dates arrive.",
    ],
    bullets: [
      "DueVisa is NOT a law firm and does NOT provide immigration legal advice",
      "DueVisa does NOT interpret immigration law or advise on your legal status",
      "DueVisa does NOT guarantee that its deadline calculations are legally accurate, complete, or current",
      "Immigration rules, USCIS processing times, and filing requirements change frequently — always verify with an attorney or uscis.gov",
      "You are solely responsible for your immigration compliance and for taking timely action on your documents",
    ],
    footer: "Always consult a licensed immigration attorney for advice specific to your situation.",
  },
  {
    id: "eligibility",
    title: "3. Eligibility",
    bullets: [
      "You must be at least 18 years old to create a DueVisa account",
      "You must provide accurate and truthful account information",
      "One person may hold one account — accounts may not be shared or transferred",
      "If you create an account on behalf of an organisation, you represent that you have authority to bind that organisation",
    ],
  },
  {
    id: "plans",
    title: "4. Free and Paid Plans",
    subsections: [
      {
        heading: "Free plan",
        text: "Track up to 3 documents with 30-day and 7-day email reminders. No credit card required. The free plan is available indefinitely at no cost.",
      },
      {
        heading: "Pro plan",
        text: "Unlimited documents, all five reminder intervals (180/90/60/30/7 days), up to 5 family members, SMS reminders, and document storage. Billed monthly or annually.",
      },
      {
        heading: "Team plan",
        text: "Everything in Pro, plus up to 20 employee profiles, an HR admin dashboard, and bulk CSV import. Intended for companies managing employee immigration. Billed monthly.",
      },
      {
        heading: "Price changes",
        text: "We reserve the right to change plan pricing. We will give at least 30 days notice via email before any price increase takes effect for existing subscribers. All payments are processed by LemonSqueezy.",
      },
    ],
  },
  {
    id: "billing",
    title: "5. Subscriptions and Billing",
    bullets: [
      "Pro and Team subscriptions are billed monthly or annually, depending on the plan you select",
      "All payments are processed securely by LemonSqueezy — we do not store your payment card details",
      "Subscriptions auto-renew at the end of each billing period until you cancel",
      "You may cancel at any time via Settings → Billing; cancellation takes effect at the end of the current billing period",
      "We do not issue refunds for partial billing periods",
      "Annual plans: a full refund is available within 14 days of the initial purchase. After 14 days, no refund is issued for the remainder of the annual term",
      "If a payment fails, we will attempt to retry and notify you by email. Continued payment failure may result in plan downgrade",
    ],
  },
  {
    id: "acceptable-use",
    title: "6. Acceptable Use",
    body: ["You agree not to use DueVisa to:"],
    bullets: [
      "Engage in any unlawful activity or violate any applicable law or regulation",
      "Attempt to access, view, or modify another user's account or data",
      "Reverse engineer, decompile, scrape, or extract data from the platform",
      "Upload false, misleading, or fabricated document data",
      "Resell, sublicense, or provide access to DueVisa as a service to third parties without written permission",
      "Introduce malware, spam, or code that could disrupt or overload the service",
      "Use automated tools (bots, scrapers) to access the service in a way that exceeds normal usage",
    ],
    footer: "We reserve the right to investigate suspected violations and suspend or terminate accounts accordingly.",
  },
  {
    id: "your-data",
    title: "7. Your Data",
    body: [
      "You retain full ownership of the immigration document data you enter into DueVisa.",
      "By using the Service, you grant DueVisa a limited, non-exclusive, royalty-free licence to store, process, and display your data solely for the purpose of providing the Service to you.",
      "We will never sell, rent, or license your data to third parties. We will never use your immigration data for advertising or profiling.",
      "For full details on how we handle your data, please read our Privacy Policy.",
    ],
    link: { text: "Read our Privacy Policy →", href: "/privacy" },
  },
  {
    id: "accuracy",
    title: "8. Accuracy of Deadline Calculations",
    body: [
      "DueVisa calculates reminder dates based solely on the expiry dates you enter. The quality of our reminders depends entirely on the accuracy of the dates you provide.",
    ],
    bullets: [
      "We make no warranty that our deadline calculations reflect current immigration law",
      "USCIS processing times, fee amounts, and procedural requirements change frequently and without notice",
      "A reminder sent by DueVisa is not a substitute for legal advice or official government guidance",
      "DueVisa is not liable for any immigration consequences, including out-of-status violations, resulting from incorrect dates entered by users, reminder delivery failures, or reliance on DueVisa without independent legal verification",
    ],
    footer: "Always verify your deadlines with a licensed immigration attorney or directly at uscis.gov.",
  },
  {
    id: "availability",
    title: "9. Service Availability",
    bullets: [
      "We aim for 99.9% uptime but do not guarantee uninterrupted access to the Service",
      "We may perform planned maintenance, which we will communicate in advance where possible",
      "We are not liable for losses, missed deadlines, or damages arising from Service downtime or interruption",
      "We may modify, suspend, or discontinue the Service (or any feature) at any time with reasonable notice",
    ],
  },
  {
    id: "ip",
    title: "10. Intellectual Property",
    body: [
      "The DueVisa name, logo, product design, code, and content are owned by DueVisa and protected by applicable intellectual property laws.",
      "You may not copy, reproduce, modify, distribute, or create derivative works of any part of the platform without prior written permission.",
      "Nothing in these terms grants you any rights in DueVisa's intellectual property other than the limited right to use the Service as described here.",
    ],
  },
  {
    id: "termination",
    title: "11. Termination",
    bullets: [
      "You may delete your account at any time from Settings → Account. Upon deletion, your data will be permanently removed within 30 days",
      "We may suspend or terminate your account immediately if you violate these terms, engage in fraudulent activity, or if we are required to do so by law",
      "Upon termination, your right to use the Service ends immediately",
      "Paid subscriptions cancelled mid-period will remain active until the end of the paid period; no partial refunds will be issued",
    ],
  },
  {
    id: "liability",
    title: "12. Limitation of Liability",
    body: [
      "To the maximum extent permitted by applicable law:",
    ],
    bullets: [
      "DueVisa is not liable for any immigration consequences — including accrual of unlawful presence, loss of status, visa denial, or removal — resulting from missed deadlines, incorrect dates, or reliance on the Service",
      "DueVisa is not liable for any indirect, incidental, special, punitive, or consequential damages, including but not limited to loss of income, data, or business opportunities",
      "DueVisa's total aggregate liability to you for any claim arising from your use of the Service is limited to the greater of (a) the total fees you paid in the three months immediately preceding the claim, or (b) USD $10",
    ],
    footer: "Some jurisdictions do not allow limitation of liability for certain damages. In those jurisdictions, DueVisa's liability is limited to the greatest extent permitted by law.",
  },
  {
    id: "warranties",
    title: "13. Disclaimer of Warranties",
    body: [
      "DueVisa is provided \"as is\" and \"as available\" without any warranty of any kind, express or implied.",
      "We expressly disclaim all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.",
      "We do not warrant that the Service will be error-free, uninterrupted, secure, or that any defects will be corrected.",
    ],
  },
  {
    id: "governing-law",
    title: "14. Governing Law",
    body: [
      "These Terms are governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.",
      "Any dispute arising from or relating to these Terms or your use of DueVisa that cannot be resolved informally shall be submitted to binding arbitration in accordance with the Arbitration and Conciliation Act, 1996 (India).",
      "Before initiating arbitration, you agree to first contact us at legal@duevisa.com and attempt to resolve the dispute informally for a period of 30 days.",
    ],
  },
  {
    id: "changes",
    title: "15. Changes to Terms",
    body: [
      "We may update these Terms of Service from time to time. If we make material changes, we will notify you by email at least 30 days before the changes take effect.",
      "Your continued use of DueVisa after the effective date of updated Terms constitutes your acceptance of the new Terms. If you do not agree to the updated Terms, you must stop using the Service and delete your account.",
    ],
  },
  {
    id: "contact",
    title: "16. Contact",
    body: ["Questions about these Terms? Contact us:"],
    contact: true,
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>
      <Navbar />

      <main>
        {/* Header */}
        <section style={{ background: "var(--bg-page)", paddingTop: "5rem", paddingBottom: "3rem" }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 mb-6">
              <FileText size={18} style={{ color: "var(--color-forest)" }} />
              <span className="badge badge-good">Terms of Service</span>
            </div>
            <h1 className="h-section mb-3" style={{ color: "var(--text-primary)" }}>
              Clear terms.<br />No surprises.
            </h1>
            <p className="text-base font-medium mb-2" style={{ color: "var(--text-muted)" }}>
              Effective date: May 2026
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Plain English. Here is what you can expect from us — and what we expect from you.
            </p>
          </div>
        </section>

        {/* Critical disclaimer */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-6">
          <div
            className="flex items-start gap-3 rounded-xl px-5 py-4"
            style={{
              background: "rgba(232,197,71,0.08)",
              border: "1px solid rgba(232,197,71,0.30)",
            }}
          >
            <AlertTriangle size={17} className="flex-shrink-0 mt-0.5" style={{ color: "#92600a" }} />
            <div className="space-y-1">
              <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                DueVisa is not a law firm and does not provide legal advice.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                DueVisa is a deadline tracking tool only. We are not responsible for immigration consequences
                arising from missed deadlines, incorrect dates, or reliance on this service without independent
                legal guidance. Always consult a licensed immigration attorney.
              </p>
            </div>
          </div>
        </div>

        {/* Table of contents */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-10">
          <nav
            className="rounded-xl px-5 py-4"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)" }}
          >
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>
              Contents
            </p>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-sm transition-colors hover:underline"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* Content */}
        <div style={{ background: "var(--bg-page-alt)", paddingBottom: "5rem" }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-12 pt-8">
            {SECTIONS.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2
                  className="font-bold text-xl mb-4"
                  style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
                >
                  {section.title}
                </h2>

                {/* Body paragraphs */}
                {"body" in section && section.body && (
                  <div className="space-y-3 mb-4">
                    {section.body.map((para, i) => (
                      <p key={i} className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        {para}
                      </p>
                    ))}
                  </div>
                )}

                {/* Subsections (Section 4) */}
                {"subsections" in section && section.subsections && (
                  <div className="space-y-5">
                    {section.subsections.map((sub) => (
                      <div key={sub.heading}>
                        <p className="text-sm font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                          {sub.heading}
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                          {sub.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Bullet list */}
                {"bullets" in section && section.bullets && (
                  <ul className="space-y-2 my-4">
                    {section.bullets.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span
                          className="text-base leading-none flex-shrink-0 mt-1"
                          style={{ color: "var(--color-forest)" }}
                        >
                          ·
                        </span>
                        <span className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Footer paragraph */}
                {"footer" in section && section.footer && (
                  <p
                    className="text-sm leading-relaxed mt-4 pt-4 font-medium"
                    style={{
                      color: "var(--text-primary)",
                      borderTop: "1px solid var(--border-subtle)",
                    }}
                  >
                    {section.footer}
                  </p>
                )}

                {/* Internal link */}
                {"link" in section && section.link && (
                  <Link
                    href={section.link.href}
                    className="inline-flex text-sm font-semibold mt-2 hover:underline"
                    style={{ color: "var(--color-forest)" }}
                  >
                    {section.link.text}
                  </Link>
                )}

                {/* Contact block */}
                {"contact" in section && section.contact && (
                  <div
                    className="mt-4 rounded-xl px-5 py-4 space-y-1"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)" }}
                  >
                    <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>DueVisa</p>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      Email:{" "}
                      <a
                        href="mailto:legal@duevisa.com"
                        className="font-semibold hover:underline"
                        style={{ color: "var(--color-forest)" }}
                      >
                        legal@duevisa.com
                      </a>
                    </p>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      Website:{" "}
                      <a
                        href="https://duevisa.com"
                        className="font-semibold hover:underline"
                        style={{ color: "var(--color-forest)" }}
                      >
                        https://duevisa.com
                      </a>
                    </p>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      We aim to respond to all legal enquiries within 5 business days.
                    </p>
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>

        {/* CTA */}
        <section style={{ background: "var(--color-forest)", padding: "5rem 0" }}>
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="h-section mb-4" style={{ color: "#eef5f0" }}>
              Questions about our terms?
            </h2>
            <p className="text-base mb-8" style={{ color: "rgba(238,245,240,0.7)" }}>
              Email us at{" "}
              <a
                href="mailto:legal@duevisa.com"
                className="font-semibold underline underline-offset-2"
                style={{ color: "var(--color-lime)" }}
              >
                legal@duevisa.com
              </a>{" "}
              — we are happy to clarify anything.
            </p>
            <Link href="/signup" className="btn-primary-lime inline-flex">
              Get started free →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
