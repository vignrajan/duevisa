import Link from "next/link";

const FOOTER_LINKS = {
  Product: [
    { href: "/pricing",    label: "Pricing" },
    { href: "/how-to-use", label: "How it works" },
    { href: "/blog",       label: "Blog" },
    { href: "/attorneys",  label: "Find an Attorney" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms",   label: "Terms of Service" },
  ],
};

const VISA_TYPES = ["H-1B", "F-1", "Green Card", "TN", "O-1", "L-1", "H-4"];

export function Footer() {
  return (
    <footer style={{ background: "var(--bg-page-alt)", borderTop: "1px solid var(--border-default)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-forest flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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

            {/* Visa types */}
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

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-xs font-700 tracking-widest uppercase mb-4" style={{ color: "var(--text-muted)", fontWeight: 700 }}>
                {group}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-200 cursor-pointer"
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
          className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-12 pt-8"
          style={{ borderTop: "1px solid var(--border-default)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} DueVisa. Not a law firm. Deadline tracking only.
          </p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Built for immigrants. Made with care.
          </p>
        </div>
      </div>
    </footer>
  );
}
