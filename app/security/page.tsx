import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Lock, Shield, Eye, Server, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Security at DueVisa — How We Protect Your Data",
  description: "DueVisa uses industry-standard encryption, access controls, and security practices to protect your immigration data. Here's exactly what we do.",
  alternates: { canonical: "https://duevisa.com/security" },
};

const PRACTICES = [
  {
    icon: Lock,
    title: "Encryption at rest and in transit",
    desc: "All data is encrypted at rest using AES-256. All data in transit is protected with TLS 1.2+. Your information is never transmitted or stored in plaintext.",
  },
  {
    icon: Shield,
    title: "Access controls",
    desc: "Row-level security ensures that you can only access your own data. Our systems enforce strict access controls at every layer of the stack.",
  },
  {
    icon: Eye,
    title: "We never sell your data",
    desc: "Your immigration data is yours. We do not sell, rent, or share it with third parties for advertising or any other commercial purpose. See our Privacy Policy for details.",
  },
  {
    icon: Server,
    title: "Infrastructure security",
    desc: "DueVisa runs on enterprise-grade infrastructure with regular security updates, automated backups, and 99.9% uptime SLA.",
  },
];

const COMMITMENTS = [
  "No tracking pixels or third-party ad networks",
  "No selling or renting your personal data",
  "Minimal data collection — we only ask for what we need",
  "You can request deletion of your account and all data at any time",
  "Breach notification within 72 hours if applicable law requires",
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Hero */}
          <div className="mb-16 text-center">
            <div className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: "var(--color-forest)" }}>
              <Lock size={24} style={{ color: "var(--color-lime)" }} />
            </div>
            <h1 className="h-section mb-5" style={{ color: "var(--text-primary)" }}>
              Your data is safe with us.
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Immigration data is sensitive. We treat it that way. Here&apos;s exactly what we do to protect your information.
            </p>
          </div>

          {/* Practices */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
            {PRACTICES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ background: "var(--bg-page-alt2)" }}>
                  <Icon size={17} style={{ color: "var(--color-forest)" }} />
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: "var(--text-primary)" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* Commitments */}
          <div className="mb-16 p-8 rounded-2xl" style={{ background: "var(--bg-page-alt)", border: "1px solid var(--border-default)" }}>
            <h2 className="font-bold text-xl mb-6" style={{ color: "var(--text-primary)" }}>Our commitments to you</h2>
            <ul className="space-y-3">
              {COMMITMENTS.map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-forest)" }} />
                  <span className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Responsible disclosure */}
          <div className="mb-16">
            <h2 className="font-bold text-xl mb-4" style={{ color: "var(--text-primary)" }}>Responsible disclosure</h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
              If you discover a security vulnerability in DueVisa, please report it to us privately before disclosing it publicly. We take all reports seriously and will respond within 48 hours.
            </p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Email: <a href="mailto:security@duevisa.com" className="underline underline-offset-2" style={{ color: "var(--color-forest)" }}>security@duevisa.com</a>
            </p>
          </div>

          {/* Disclaimer */}
          <div className="p-5 rounded-xl mb-10" style={{ background: "var(--bg-page-alt)" }}>
            <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
              For full details on how we collect and process your data, see our{" "}
              <Link href="/privacy" className="underline underline-offset-2">Privacy Policy</Link>{" "}
              and{" "}
              <Link href="/terms" className="underline underline-offset-2">Terms of Service</Link>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
