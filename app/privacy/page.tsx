import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Shield, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | DueVisa",
  description:
    "DueVisa privacy policy. Learn how we collect, use, and protect your immigration document data.",
  alternates: { canonical: "https://duevisa.com/privacy" },
};

const SECTIONS = [
  {
    id: "introduction",
    title: "1. Introduction",
    body: [
      "DueVisa is an immigration deadline tracking tool that helps you stay on top of visa expiry dates, renewal windows, and document deadlines. We are not a law firm and nothing on DueVisa constitutes legal advice. Always consult a licensed immigration attorney for advice specific to your situation.",
      "This Privacy Policy explains what personal data we collect, how we use it, who we share it with, and what rights you have over it. By using DueVisa, you agree to the practices described here.",
    ],
  },
  {
    id: "information-we-collect",
    title: "2. Information We Collect",
    subsections: [
      {
        heading: "Account information",
        text: "When you create an account, we collect your email address and display name. If you sign in with Google OAuth, we also receive your Google profile name and profile photo URL.",
      },
      {
        heading: "Immigration document data",
        text: "You voluntarily enter document types (e.g. H-1B, EAD, Green Card), document names, and expiry dates. This is the core data that powers your dashboard and reminders. We do not ask for passport numbers, alien registration numbers, case numbers, or any government-issued ID numbers.",
      },
      {
        heading: "Family and dependent information",
        text: "If you use the family tracking feature, you may enter names, relationships, and document dates for your dependents. This information is stored under your account and subject to the same protections as your own data.",
      },
      {
        heading: "Payment information",
        text: "Subscription payments are processed entirely by LemonSqueezy. We never see, store, or handle your credit card number, bank details, or billing address. LemonSqueezy provides us only with a subscription status (active/cancelled) and your billing email.",
      },
      {
        heading: "Usage data",
        text: "We collect basic usage information such as pages visited, features used, and login timestamps. This helps us understand how the product is being used so we can improve it.",
      },
      {
        heading: "Device and technical data",
        text: "We may collect your browser type, device type, operating system, and IP address as part of standard server logging. This data is used for security monitoring and debugging.",
      },
    ],
  },
  {
    id: "how-we-use",
    title: "3. How We Use Your Information",
    body: [
      "We use your data for the following purposes and no others:",
    ],
    bullets: [
      "To provide deadline tracking, countdown timers, and renewal checklist features",
      "To send email reminders at 180, 90, 60, 30, and 7 days before each document expires",
      "To process and manage your subscription via LemonSqueezy",
      "To authenticate your identity and keep your account secure",
      "To improve the product based on aggregate, anonymised usage patterns",
      "To respond to your support requests",
    ],
    footer:
      "We never sell your data. We never share your data with advertisers. We never use your immigration information for profiling, scoring, or any purpose other than the service you signed up for.",
  },
  {
    id: "data-storage",
    title: "4. Data Storage and Security",
    body: [
      "All user data is stored in Supabase, which runs on AWS infrastructure. Supabase enforces Row Level Security (RLS) policies on every table — meaning the database itself ensures that queries from one user's session can only return that user's own data.",
      "Data is encrypted in transit (TLS 1.2+) and encrypted at rest by default on Supabase. We do not store passwords — authentication is handled by Supabase Auth (password hashing using bcrypt) or delegated to Google OAuth.",
      "We limit access to production data to essential personnel only and do not store copies of user data in development or staging environments.",
    ],
  },
  {
    id: "third-parties",
    title: "5. Third-Party Service Providers",
    body: [
      "We use the following sub-processors to operate DueVisa. Each receives only the data necessary to perform its function.",
    ],
    table: [
      { provider: "Supabase", purpose: "Database, authentication, and file storage", data: "All user and document data", link: "https://supabase.com/privacy" },
      { provider: "Vercel", purpose: "Application hosting and CDN", data: "Request logs, IP addresses", link: "https://vercel.com/legal/privacy-policy" },
      { provider: "Resend", purpose: "Transactional email delivery", data: "Your email address and reminder content", link: "https://resend.com/legal/privacy-policy" },
      { provider: "LemonSqueezy", purpose: "Subscription payment processing", data: "Billing email and payment details (never shared with us)", link: "https://www.lemonsqueezy.com/privacy" },
      { provider: "Google", purpose: "OAuth sign-in (optional)", data: "Name, email, profile photo (only if you use Google sign-in)", link: "https://policies.google.com/privacy" },
    ],
  },
  {
    id: "immigration-data",
    title: "6. Immigration Data — Special Notice",
    highlight: true,
    body: [
      "We understand that your immigration status is sensitive. Here is our explicit commitment:",
    ],
    bullets: [
      "We use your document data only to calculate deadlines and send reminders",
      "We do not share, disclose, or report your data to USCIS, ICE, CBP, the Department of State, or any government agency — ever",
      "We do not use your immigration data for advertising, profiling, or any secondary purpose",
      "Your document data is never sold or licensed to any third party",
      "No DueVisa employee accesses your document data except when you explicitly request support",
    ],
  },
  {
    id: "email",
    title: "7. Email Communications",
    body: [
      "When you add a document to DueVisa, you will receive reminder emails at the intervals you configure (up to 180, 90, 60, 30, and 7 days before expiry). You will also receive account-related emails such as sign-up confirmation and password reset.",
      "You can disable or adjust reminders at any time in your account Settings. You can unsubscribe from non-essential communications using the unsubscribe link in any email.",
      "We use Resend to deliver all emails. Your email address is shared with Resend solely for this purpose.",
    ],
  },
  {
    id: "retention",
    title: "8. Data Retention",
    bullets: [
      "While your account is active, we retain all data you have entered",
      "If you cancel your subscription, your data remains accessible on the free plan limits",
      "If you delete your account, all your personal data and document records are permanently deleted within 30 days",
      "You can request immediate deletion at any time by emailing privacy@duevisa.com",
      "Anonymised, aggregated usage statistics (e.g. how many users track H-1B documents) may be retained indefinitely as they contain no personal information",
    ],
  },
  {
    id: "your-rights",
    title: "9. Your Rights",
    body: [
      "You have the following rights over your personal data. To exercise any of them, email privacy@duevisa.com — we will respond within 5 business days.",
    ],
    bullets: [
      "Access — request a copy of all data we hold about you",
      "Correction — update any incorrect or outdated information in your account",
      "Deletion — delete your account and all associated data permanently",
      "Portability — export your document data as CSV from the dashboard at any time",
      "Opt out — unsubscribe from reminder emails or disable individual notifications in Settings",
    ],
  },
  {
    id: "childrens",
    title: "10. Children's Privacy",
    body: [
      "DueVisa is intended for adults managing their own or their family's immigration documents. We do not knowingly collect personal data from anyone under the age of 18. If you believe a minor has created an account, please contact us at privacy@duevisa.com and we will delete the account promptly.",
    ],
  },
  {
    id: "changes",
    title: "11. Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time. If we make material changes — such as collecting new categories of data or changing how we share it — we will notify you via email at least 14 days before the change takes effect.",
      "Continued use of DueVisa after the effective date of a change constitutes your acceptance of the updated policy. We will always keep prior versions of this policy available upon request.",
    ],
  },
  {
    id: "contact",
    title: "12. Contact",
    body: [
      "For privacy questions, data requests, or concerns, contact us at:",
    ],
    contact: true,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>
      <Navbar />

      <main>
        {/* Header */}
        <section style={{ background: "var(--bg-page)", paddingTop: "5rem", paddingBottom: "3rem" }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 mb-6">
              <Shield size={18} style={{ color: "var(--color-forest)" }} />
              <span className="badge badge-good">Privacy Policy</span>
            </div>
            <h1 className="h-section mb-3" style={{ color: "var(--text-primary)" }}>
              Your data. Your privacy.
            </h1>
            <p className="text-base font-medium mb-2" style={{ color: "var(--text-muted)" }}>
              Effective date: May 2026
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Plain English. No legalese. Here is exactly what we collect and what we do with it.
            </p>
          </div>
        </section>

        {/* Not a law firm disclaimer */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-6">
          <div
            className="flex items-start gap-3 rounded-xl px-5 py-4"
            style={{
              background: "var(--bg-page-alt2)",
              border: "1px solid var(--border-default)",
            }}
          >
            <Info size={17} className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-forest)" }} />
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              <strong style={{ color: "var(--text-primary)" }}>DueVisa is not a law firm</strong> and does not provide legal advice.
              Nothing on this website constitutes legal counsel. For advice specific to your immigration situation,
              please consult a licensed immigration attorney.
            </p>
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
        <div style={{ background: "var(--bg-page-alt)", paddingTop: "0.5rem", paddingBottom: "5rem" }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-12 pt-8">
            {SECTIONS.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24"
                style={
                  section.highlight
                    ? {
                        background: "var(--bg-page-alt2)",
                        border: "1px solid var(--border-strong)",
                        borderRadius: "1rem",
                        padding: "1.75rem",
                      }
                    : undefined
                }
              >
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

                {/* Subsections (Section 2) */}
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

                {/* Third-party table */}
                {"table" in section && section.table && (
                  <div className="overflow-x-auto mt-4 rounded-xl" style={{ border: "1px solid var(--border-default)" }}>
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr style={{ background: "var(--bg-card)", borderBottom: "1px solid var(--border-default)" }}>
                          {["Provider", "Purpose", "Data shared"].map((h) => (
                            <th
                              key={h}
                              className="text-left py-2.5 px-4 text-xs font-bold uppercase tracking-wider"
                              style={{ color: "var(--text-muted)" }}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.map((row, i) => (
                          <tr
                            key={row.provider}
                            style={{
                              borderBottom:
                                i < section.table!.length - 1
                                  ? "1px solid var(--border-subtle)"
                                  : undefined,
                            }}
                          >
                            <td className="py-3 px-4 font-semibold align-top" style={{ color: "var(--text-primary)" }}>
                              <a
                                href={row.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                                style={{ color: "var(--color-forest)" }}
                              >
                                {row.provider}
                              </a>
                            </td>
                            <td className="py-3 px-4 align-top" style={{ color: "var(--text-secondary)" }}>
                              {row.purpose}
                            </td>
                            <td className="py-3 px-4 align-top" style={{ color: "var(--text-secondary)" }}>
                              {row.data}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
                        href="mailto:privacy@duevisa.com"
                        className="font-semibold hover:underline"
                        style={{ color: "var(--color-forest)" }}
                      >
                        privacy@duevisa.com
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
                      We respond to all privacy requests within 5 business days.
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
              Your immigration data is safe with us.
            </h2>
            <p className="text-base mb-8" style={{ color: "rgba(238,245,240,0.7)" }}>
              Questions about your data? Email{" "}
              <a
                href="mailto:privacy@duevisa.com"
                className="font-semibold underline underline-offset-2"
                style={{ color: "var(--color-lime)" }}
              >
                privacy@duevisa.com
              </a>
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
