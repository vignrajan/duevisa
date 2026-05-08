import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Terms of Service",
  description: "DueVisa Terms of Service — the rules and conditions for using DueVisa.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-card-bg">
      <Navbar />
      <main className="pt-28 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 tracking-tight">Terms of Service</h1>
          <p className="text-text-secondary text-sm mb-12 font-semibold tracking-wide uppercase">Last updated: April 2026</p>

          <div className="space-y-10 text-text-primary leading-relaxed font-medium">
            {[
              {
                title: "Not Legal Advice",
                content: "DueVisa is a deadline tracking tool, not a law firm. The information provided by DueVisa — including reminder dates, document descriptions, and blog content — is for informational purposes only and does not constitute legal advice. Always consult a licensed immigration attorney for advice specific to your situation.",
              },
              {
                title: "Accuracy of Information",
                content: "While we strive to provide accurate reminder timelines and immigration information, immigration law changes frequently. Renewal lead times and filing deadlines described in DueVisa are general guidelines. USCIS processing times, fee amounts, and procedural requirements may change. Always verify current requirements with USCIS.gov or your attorney.",
              },
              {
                title: "Your Responsibility",
                content: "You are solely responsible for monitoring your immigration deadlines and taking timely action. DueVisa is a convenience tool — a reminder that fails to send (due to email delivery issues, spam filters, or system errors) does not relieve you of responsibility for your immigration status.",
              },
              {
                title: "Account Terms",
                content: "You must provide accurate information when creating your account. You are responsible for maintaining the security of your password. You may not share your account with others. One person may have one account.",
              },
              {
                title: "Payments & Refunds",
                content: "Pro and Team plans are billed monthly or annually via Stripe. You may cancel at any time. We offer a 14-day money-back guarantee for new subscribers. Refunds are not available after 14 days except in extraordinary circumstances at our discretion.",
              },
              {
                title: "Termination",
                content: "We reserve the right to suspend or terminate accounts that violate these terms. You may delete your account at any time from the Settings page.",
              },
              {
                title: "Contact",
                content: "For questions about these terms, contact us at legal@duevisa.com.",
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
