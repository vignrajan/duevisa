import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy",
  description: "DueVisa Privacy Policy — how we collect, use, and protect your immigration data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-card-bg">
      <Navbar />
      <main className="pt-28 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-text-secondary text-sm mb-12 font-semibold tracking-wide uppercase">Last updated: April 2026</p>

          <div className="space-y-10 text-text-primary leading-relaxed font-medium">
            {[
              {
                title: "What We Collect",
                content: "We collect your name, email address, visa type, and document expiry dates. Optionally, you may provide your phone number for SMS reminders. We do not collect Social Security numbers, passport numbers, or other sensitive identifying information unless you voluntarily add them as notes.",
              },
              {
                title: "How We Use Your Data",
                content: "Your data is used solely to power the DueVisa service — calculating deadline countdowns, sending reminder emails, and displaying your dashboard. We do not sell, rent, or share your personal information with third parties for marketing purposes.",
              },
              {
                title: "Data Security",
                content: "All data is encrypted in transit (TLS) and at rest. We use Supabase with Row Level Security (RLS) — meaning your documents can only be accessed by you. Database credentials are never exposed to the client. We conduct regular security reviews.",
              },
              {
                title: "Email Reminders",
                content: "By signing up, you consent to receive immigration deadline reminder emails via Resend. You can adjust or disable reminders at any time in your account Settings. We will never send unsolicited marketing emails.",
              },
              {
                title: "Data Retention",
                content: "Your data is retained while your account is active. You may export your data or delete your account at any time from the Settings page. Upon account deletion, your data is permanently removed from our systems within 30 days.",
              },
              {
                title: "Cookies",
                content: "We use only essential session cookies (via Supabase Auth) to keep you logged in. We do not use tracking or advertising cookies.",
              },
              {
                title: "Third-Party Services",
                content: "We use Supabase (database/auth), Resend (email delivery), and Stripe (payment processing). Each service has its own privacy policy and handles data according to their respective terms.",
              },
              {
                title: "Contact",
                content: "For privacy questions or data requests, email us at privacy@duevisa.com. We respond within 5 business days.",
              },
            ].map((section) => (
              <section key={section.title}>
                <h2 className="font-bold text-text-primary text-2xl mb-4 tracking-tight">{section.title}</h2>
                <p className="text-text-secondary">{section.content}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
