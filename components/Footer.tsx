import Link from "next/link";

const FOOTER_LINKS = {
  Product: [
    { href: "/pricing",               label: "Pricing" },
    { href: "/how-to-use",            label: "How it works" },
    { href: "/blog",                  label: "Blog" },
    { href: "/attorneys",             label: "Find an Attorney" },
    { href: "/ead-renewal-calculator",label: "EAD Calculator" },
    { href: "/h1b-renewal-tracker",   label: "H-1B Tracker" },
    { href: "/ead-reminder",          label: "EAD Reminder" },
  ],
  "Visa Types": [
    { href: "/h1b-renewal-tracker",  label: "H-1B Deadline Tracker" },
    { href: "/ead-reminder",         label: "EAD Renewal Reminder" },
    { href: "/f1-opt-tracker",       label: "F-1 OPT Tracker" },
    { href: "/green-card-renewal",   label: "Green Card Renewal" },
  ],
  Company: [
    { href: "/about",   label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/security",label: "Security" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms",   label: "Terms of Service" },
    { href: "/security",label: "Security" },
  ],
};

const VISA_TYPES = ["H-1B", "F-1", "OPT / STEM OPT", "Green Card", "TN", "O-1", "L-1", "H-4", "H-4 EAD", "I-485", "I-751"];

export function Footer() {
  return (
    <footer style={{ background: "var(--bg-page-alt)", borderTop: "1px solid var(--border-default)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">

          {/* Brand — spans 2 columns on md+ */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-forest flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect x="2" y="4" width="12" height="1.5" rx="0.75" fill="#C8F562" />
                  <rect x="2" y="7.25" width="9" height="1.5" rx="0.75" fill="#C8F562" opacity="0.7" />
                  <rect x="2" y="10.5" width="12" height="1.5" rx="0.75" fill="#C8F562" />
                </svg>
              </div>
              <span className="font-bold text-[1.0625rem]" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                Due<span className="text-forest">Visa</span>
              </span>
            </Link>

            <p className="text-sm leading-relaxed max-w-xs mb-5" style={{ color: "var(--text-secondary)" }}>
              Never miss an immigration deadline again. DueVisa tracks every visa, permit, and document — and reminds you before it&apos;s too late.
            </p>

            <div className="flex flex-wrap gap-1.5">
              {VISA_TYPES.map((v) => (
                <span
                  key={v}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium"
                  style={{
                    background: "var(--bg-page)",
                    border: "1px solid var(--border-default)",
                    color: "var(--text-muted)",
                  }}
                >
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--text-muted)", fontWeight: 700 }}>
                {group}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-200 cursor-pointer hover:underline underline-offset-2"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-8 space-y-3"
          style={{ borderTop: "1px solid var(--border-default)" }}
        >
          <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
            🔒 Your data is encrypted and never shared.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              © {new Date().getFullYear()} DueVisa. Not a law firm. Deadline tracking only.
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Built for immigrants, made with care.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
