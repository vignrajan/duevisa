import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mail, MessageSquare, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact DueVisa — Get in Touch",
  description: "Have a question, found a bug, or want to set up DueVisa for your team? We'd love to hear from you.",
  alternates: { canonical: "https://duevisa.com/contact" },
};

const CONTACT_OPTIONS = [
  {
    icon: MessageSquare,
    title: "General questions",
    desc: "Questions about features, your account, or how DueVisa works.",
    action: "Email us",
    href: "mailto:hello@duevisa.com",
    value: "hello@duevisa.com",
  },
  {
    icon: Users,
    title: "Team & enterprise",
    desc: "Setting up DueVisa for your company or law firm? Let's talk.",
    action: "Book a demo",
    href: "mailto:team@duevisa.com",
    value: "team@duevisa.com",
  },
  {
    icon: Mail,
    title: "Security & privacy",
    desc: "Found a vulnerability or have a data privacy request.",
    action: "Contact security",
    href: "mailto:security@duevisa.com",
    value: "security@duevisa.com",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Hero */}
          <div className="mb-16 text-center">
            <span className="badge badge-good mb-6 inline-flex">Contact us</span>
            <h1 className="h-section mb-5" style={{ color: "var(--text-primary)" }}>
              We&apos;d love to hear from you.
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Whether you have a question, a feature request, or want to set up DueVisa for your team — reach out. We respond to every message.
            </p>
          </div>

          {/* Contact options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
            {CONTACT_OPTIONS.map(({ icon: Icon, title, desc, action, href, value }) => (
              <div key={title} className="p-6 rounded-2xl flex flex-col" style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ background: "var(--bg-page-alt2)" }}>
                  <Icon size={17} style={{ color: "var(--color-forest)" }} />
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: "var(--text-primary)" }}>{title}</h3>
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "var(--text-secondary)" }}>{desc}</p>
                <a
                  href={href}
                  className="text-sm font-semibold underline underline-offset-2"
                  style={{ color: "var(--color-forest)" }}
                >
                  {action} →
                </a>
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Response time note */}
          <div className="p-6 rounded-2xl text-center mb-10" style={{ background: "var(--bg-page-alt)", border: "1px solid var(--border-default)" }}>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              We typically respond within <strong style={{ color: "var(--text-primary)" }}>24 hours</strong> on business days. For urgent issues, include &ldquo;URGENT&rdquo; in your subject line.
            </p>
          </div>

          {/* Team demo CTA */}
          <div className="p-8 rounded-2xl text-center" style={{ background: "var(--color-forest)" }}>
            <h2 className="font-bold text-xl mb-3" style={{ color: "#eef5f0" }}>Tracking immigration for your team?</h2>
            <p className="text-sm mb-6" style={{ color: "rgba(238,245,240,0.7)" }}>
              DueVisa Team supports up to 20 employee profiles, an HR admin dashboard, and bulk CSV import. Book a 15-minute demo and we&apos;ll set it up for you.
            </p>
            <a href="mailto:team@duevisa.com?subject=Team Demo Request" className="btn-primary-lime text-sm px-8 py-3 cursor-pointer inline-block">
              Book a demo →
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
