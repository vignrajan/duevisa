import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Shield, Clock, Users, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About DueVisa — Built for Immigrants, by People Who Get It",
  description: "DueVisa was built to solve a real problem: immigration deadlines are complex, high-stakes, and easy to miss. Learn who we are and why we built this.",
  alternates: { canonical: "https://duevisa.com/about" },
};

const VALUES = [
  {
    icon: Shield,
    title: "Privacy first",
    desc: "Your immigration data is sensitive. We encrypt everything at rest and in transit, and we never sell or share your data. Ever.",
  },
  {
    icon: Clock,
    title: "Deadlines are non-negotiable",
    desc: "A missed immigration deadline can cost you your job and years of work. We take that seriously. Every reminder we send matters.",
  },
  {
    icon: Users,
    title: "Built for real immigrants",
    desc: "Not for lawyers, not for HR departments. For the H-1B worker who's juggling a full-time job and doesn't have time to track six different expiry dates.",
  },
  {
    icon: Heart,
    title: "Plain English, always",
    desc: "Immigration is complicated enough. We won't make it worse with jargon. Every notification, every label, every feature is written to be understood.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Hero */}
          <div className="mb-16 text-center">
            <span className="badge badge-good mb-6 inline-flex">About DueVisa</span>
            <h1 className="h-section mb-5" style={{ color: "var(--text-primary)" }}>
              Built for immigrants.<br />By people who get it.
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              DueVisa exists because immigration deadlines are uniquely high-stakes — and uniquely easy to miss. One expired EAD. One I-94 you forgot to check. One employer who assumed you were tracking your own visa. The consequences can be devastating.
            </p>
          </div>

          {/* Story */}
          <div className="prose-custom space-y-5 mb-16">
            <h2 className="font-bold text-2xl" style={{ color: "var(--text-primary)" }}>Why we built this</h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              The US immigration system tracks over 40 million non-citizens — each with their own set of documents, deadlines, and renewal windows. Most of them are managing these deadlines in a spreadsheet, a phone calendar, or in their head.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              That&apos;s not good enough. A generic calendar doesn&apos;t know that your EAD renewal should be filed 180 days out, not 30. It doesn&apos;t know that your I-94 date and your visa stamp date are two completely different things. It doesn&apos;t send you a reminder when you&apos;re 6 months out from a deadline that needs action today.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              DueVisa does. We built the deadline intelligence that immigration requires — pre-configured lead times, visa-type-aware reminders, and a dashboard that shows your entire immigration picture at a glance.
            </p>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="font-bold text-2xl mb-8" style={{ color: "var(--text-primary)" }}>What we believe</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {VALUES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="p-6 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)" }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ background: "var(--bg-page-alt2)" }}>
                    <Icon size={17} style={{ color: "var(--color-forest)" }} />
                  </div>
                  <h3 className="font-bold text-base mb-2" style={{ color: "var(--text-primary)" }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Founder note */}
          <div className="mb-16 p-8 rounded-2xl" style={{ background: "var(--bg-page-alt)", border: "1px solid var(--border-default)" }}>
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center font-bold text-xl" style={{ background: "var(--color-forest)", color: "var(--color-lime)" }}>
                V
              </div>
              <div>
                <h3 className="font-bold text-base mb-1" style={{ color: "var(--text-primary)" }}>A note from the founder</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                  &ldquo;I built DueVisa because I watched people I care about navigate one of the most stressful experiences imaginable — staying in the country where they&apos;ve built their lives — with tools designed for grocery lists and meeting reminders. Immigration deserves better. You deserve better.&rdquo;
                </p>
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Vignesh Rajan</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Founder, DueVisa</p>
              </div>
            </div>
          </div>

          {/* Legal note */}
          <div className="p-5 rounded-xl mb-10" style={{ background: "var(--bg-page-alt)" }}>
            <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
              DueVisa is a deadline tracking tool, not a law firm. We do not provide legal advice. For advice specific to your situation, consult a licensed immigration attorney.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="font-bold text-2xl mb-4" style={{ color: "var(--text-primary)" }}>Ready to stop worrying?</h2>
            <p className="text-base mb-6" style={{ color: "var(--text-secondary)" }}>Free for up to 3 documents. No credit card required.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/signup" className="btn-primary text-sm px-8 py-3 cursor-pointer">
                Start tracking free →
              </Link>
              <Link href="/contact" className="btn-secondary text-sm px-8 py-3 cursor-pointer">
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
