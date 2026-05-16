import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Lock, X } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Pricing — Immigration Deadline Tracker",
  description: "Simple, transparent pricing for DueVisa. Free plan available — no credit card required. Upgrade to Pro for unlimited documents, family tracking, and all 5 reminder intervals.",
  keywords: ["DueVisa pricing", "immigration tracker cost", "visa reminder app price", "immigration SaaS pricing"],
  alternates: { canonical: "https://duevisa.com/pricing" },
};

const FREE_INCLUDED = ["3 documents", "30 & 7 day reminders", "Basic dashboard", "Email support"];
const FREE_LOCKED   = ["All 5 reminder intervals", "Family members", "SMS alerts", "Document storage"];

const PRO_FEATURES  = [
  "Unlimited documents",
  "All 5 reminder intervals (180/90/60/30/7 days)",
  "5 family members",
  "SMS reminders",
  "Document storage",
  "Priority support",
];

const TEAM_FEATURES = [
  "Everything in Pro",
  "Up to 20 employee profiles",
  "HR admin dashboard",
  "Bulk CSV import",
  "Team renewal overview",
  "Dedicated account support",
];

const FAQ = [
  { q:"Do I need a credit card to start?",     a:"No. The free plan requires no payment information at all." },
  { q:"Can I switch plans anytime?",            a:"Yes. Upgrade or downgrade at any time from your account settings." },
  { q:"What happens to my data if I cancel?",  a:"Your data is kept for 30 days after cancellation, then deleted per our privacy policy." },
  { q:"Does Pro cover my whole family?",        a:"Yes. Pro includes up to 5 family members on a single account." },
  { q:"Is there an annual discount?",          a:"Yes — Pro annual is $79/year ($6.58/month), saving you $29 vs monthly billing." },
  { q:"Why not just use Google Calendar?",     a:"Google Calendar doesn't know immigration law. It won't auto-calculate your 180-day EAD filing window, warn you about I-94 vs. visa stamp differences, or remind you that your H-1B renewal needs to start 6 months out — not 6 weeks. DueVisa is built specifically for the complexity of immigration deadlines." },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen" style={{ background:"var(--bg-page)" }}>
      <Navbar />
      <main>
        {/* Header */}
        <section style={{ background:"var(--bg-page)", paddingTop:"4rem", paddingBottom:"4rem" }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="badge badge-good mb-6 inline-flex">Simple pricing</span>
            <h1 className="h-section text-text-primary mb-4" style={{ color:"var(--text-primary)" }}>
              Free to start.<br />Pro when you need it.
            </h1>
            <p className="text-lg" style={{ color:"var(--text-secondary)" }}>
              No hidden fees. No complicated tiers. Just honest pricing for real peace of mind.
            </p>
          </div>
        </section>

        {/* Plans */}
        <section style={{ background:"var(--bg-page-alt)", paddingTop:"3rem", paddingBottom:"5rem" }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              {/* Free */}
              <div className="relative flex flex-col rounded-2xl" style={{
                padding:"2rem",
                background:"var(--bg-card)",
                border:"1px solid var(--border-default)",
                boxShadow:"var(--shadow-card)",
              }}>
                <div className="mb-6">
                  <h2 className="font-bold text-xl mb-2" style={{ color:"var(--text-primary)" }}>Free</h2>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="font-bold text-4xl tracking-tight" style={{ color:"var(--text-primary)" }}>$0</span>
                    <span className="text-sm" style={{ color:"var(--text-muted)" }}>forever</span>
                  </div>
                  <p className="text-sm mt-2 leading-relaxed" style={{ color:"var(--text-secondary)" }}>
                    Get started and protect your 3 most critical documents.
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color:"var(--text-muted)" }}>What&apos;s included</p>
                  <ul className="space-y-2.5">
                    {FREE_INCLUDED.map(f => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" style={{ color:"var(--color-forest)" }} />
                        <span className="text-sm" style={{ color:"var(--text-secondary)" }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-8 flex-1">
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color:"var(--text-muted)" }}>Unlock with Pro →</p>
                  <ul className="space-y-2.5">
                    {FREE_LOCKED.map(f => (
                      <li key={f} className="flex items-start gap-2">
                        <Lock size={13} className="flex-shrink-0 mt-0.5" style={{ color:"var(--text-muted)" }} />
                        <span className="text-sm" style={{ color:"var(--text-muted)" }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/signup" className="btn-primary text-center py-3 px-5 rounded-xl font-bold text-sm cursor-pointer transition-all">
                  Start free
                </Link>
              </div>

              {/* Pro */}
              <div className="relative flex flex-col rounded-2xl" style={{
                padding:"2rem",
                background:"var(--color-forest)",
                border:"2px solid var(--color-forest)",
                boxShadow:"0 20px 60px rgba(10,92,74,0.25)",
              }}>
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full text-xs font-bold" style={{ background:"var(--color-lime)", color:"#050e0b" }}>
                    Most popular
                  </span>
                </div>
                <div className="mb-6">
                  <h2 className="font-bold text-xl mb-2" style={{ color:"#eef5f0" }}>Pro</h2>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="font-bold text-4xl tracking-tight" style={{ color:"var(--color-lime)" }}>$9</span>
                    <span className="text-sm" style={{ color:"rgba(238,245,240,0.6)" }}>/month</span>
                  </div>
                  <p className="text-xs font-medium mb-1" style={{ color:"rgba(200,245,98,0.85)" }}>Or $79/year — save $29</p>
                  <p className="text-xs" style={{ color:"rgba(238,245,240,0.55)" }}>Less than your morning coffee. More peace of mind than any spreadsheet.</p>
                  <p className="text-sm mt-3 leading-relaxed" style={{ color:"rgba(238,245,240,0.7)" }}>
                    Full protection for you and your family. Everything included.
                  </p>
                </div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {PRO_FEATURES.map(f => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" style={{ color:"var(--color-lime)" }} />
                      <span className="text-sm" style={{ color:"rgba(238,245,240,0.85)" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/signup?plan=pro" className="btn-primary-lime text-center py-3 px-5 rounded-xl font-bold text-sm cursor-pointer transition-all">
                  Start Pro
                </Link>
              </div>

              {/* Team */}
              <div className="relative flex flex-col rounded-2xl" style={{
                padding:"2rem",
                background:"var(--bg-card)",
                border:"1px solid var(--border-default)",
                boxShadow:"var(--shadow-card)",
              }}>
                <div className="mb-6">
                  <h2 className="font-bold text-xl mb-2" style={{ color:"var(--text-primary)" }}>Team</h2>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="font-bold text-4xl tracking-tight" style={{ color:"var(--text-primary)" }}>$29</span>
                    <span className="text-sm" style={{ color:"var(--text-muted)" }}>/month</span>
                  </div>
                  <p className="text-sm mt-2 leading-relaxed" style={{ color:"var(--text-secondary)" }}>
                    For companies managing employee immigration. HR-ready.
                  </p>
                </div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {TEAM_FEATURES.map(f => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" style={{ color:"var(--color-forest)" }} />
                      <span className="text-sm" style={{ color:"var(--text-secondary)" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <div>
                  <Link href="/contact" className="btn-primary text-center py-3 px-5 rounded-xl font-bold text-sm cursor-pointer transition-all block w-full">
                    Book a demo
                  </Link>
                  <p className="text-xs text-center mt-2.5" style={{ color:"var(--text-muted)" }}>
                    or email <a href="mailto:team@duevisa.com" className="underline underline-offset-2" style={{ color:"var(--color-forest)" }}>team@duevisa.com</a>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ background:"var(--bg-page)", padding:"5rem 0" }}>
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="h-section text-text-primary text-center mb-12" style={{ color:"var(--text-primary)" }}>Questions answered</h2>
            <div className="space-y-3">
              {FAQ.map((f,i) => (
                <details key={i} className="card group cursor-pointer" style={{ padding:"1.25rem 1.5rem" }} open={i===0}>
                  <summary className="flex items-center justify-between font-semibold text-sm list-none cursor-pointer" style={{ color:"var(--text-primary)" }}>
                    {f.q}
                    <span className="text-xs font-bold ml-4 transition-all duration-200 group-open:rotate-45" style={{ color:"var(--text-muted)" }}>+</span>
                  </summary>
                  <p className="text-sm leading-relaxed mt-4 pt-4" style={{ color:"var(--text-secondary)", borderTop:"1px solid var(--border-subtle)" }}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background:"var(--color-forest)", padding:"5rem 0" }}>
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="h-section text-text-primary mb-4" style={{ color:"#eef5f0" }}>Start protecting yourself today.</h2>
            <p className="text-base mb-8" style={{ color:"rgba(238,245,240,0.7)" }}>Free forever. No credit card. 3 minutes to set up.</p>
            <Link href="/signup" className="btn-primary-lime text-base px-10 py-4 cursor-pointer inline-flex items-center gap-2">
              Get started free →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
