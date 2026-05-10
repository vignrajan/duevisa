// app/page.tsx — Landing Page — Typeform-inspired redesign
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2, Clock, Bell, Users, Shield, Zap, ChevronRight, AlertTriangle, Plane, Scale, ArrowRight, Star, X } from "lucide-react";

const STATS = [
  { value: "580,000+", label: "H-1B holders in the US" },
  { value: "180-day",  label: "EAD window auto-calculated" },
  { value: "5",        label: "document types tracked" },
  { value: "Zero",     label: "missed deadlines" },
];

const PROBLEMS = [
  { icon: <Zap size={22} className="text-critical" />, title: "Loss of work authorization", desc: "An expired EAD or H-1B means you legally cannot work — even one day over can jeopardize your status.", stat: "1 in 4", statLabel: "immigrants miss a renewal window" },
  { icon: <Plane size={22} className="text-gold" />, title: "Travel restrictions", desc: "An expired visa stamp means you can't re-enter the US after international travel.", stat: "18 days", statLabel: "average time to notice an expiry" },
  { icon: <Scale size={22} className="text-forest" />, title: "Years of legal delays", desc: "Missing the I-751 window or green card renewal can reset your entire immigration timeline.", stat: "$3,000+", statLabel: "average attorney fees for late renewals" },
];

const HOW_IT_WORKS = [
  { num: "01", title: "Sign up free in 60 seconds", desc: "No credit card. No immigration knowledge needed. Just your email." },
  { num: "02", title: "Enter your document dates", desc: "Add your visa stamp, EAD, I-94, passport — we tell you exactly what to track." },
  { num: "03", title: "Get reminded at the right time", desc: "Up to 5 reminders per document: 180, 90, 60, 30, and 7 days before expiry." },
];

const FEATURES = [
  { icon: <Shield size={20} className="text-forest" />, title: "Smart deadline tracking", desc: "Knows immigration law. Knows your EAD needs 180 days. Not just a calendar." },
  { icon: <Bell size={20} className="text-forest" />, title: "5-stage email reminders", desc: "Timed to when you actually need to act — not arbitrary date-based alerts." },
  { icon: <Users size={20} className="text-forest" />, title: "Family dashboard", desc: "Track your spouse, children, dependents — all in one unified view." },
  { icon: <Clock size={20} className="text-forest" />, title: "Days-remaining countdown", desc: "Live countdown with color-coded urgency. Red, amber, green — instantly clear." },
  { icon: <Scale size={20} className="text-forest" />, title: "Attorney connect", desc: "When time is short, connect with a vetted immigration lawyer in minutes." },
  { icon: <CheckCircle2 size={20} className="text-forest" />, title: "All visa types", desc: "H-1B, F-1, Green Card, TN, O-1, L-1, H-4 EAD, and more." },
];

const TESTIMONIALS = [
  { quote: "My H-1B was expiring in 8 days and I had no idea. DueVisa caught it. I genuinely don't know what I would have done.", name: "Arjun S.", role: "H-1B Engineer · San Jose, CA", stars: 5 },
  { quote: "I track my entire family on one account — me on H-1B, my wife on H-4 EAD, and our son on H-4. Couldn't be easier.", name: "Priya M.", role: "H-1B + H-4 family · Seattle, WA", stars: 5 },
  { quote: "The 180-day reminder is what sold me. No other tool thinks that far ahead. My attorney was impressed.", name: "Chen W.", role: "F-1 → OPT STEM · Boston, MA", stars: 5 },
];

const PLANS = [
  {
    name: "Free", price: "$0", period: "forever",
    desc: "For individuals getting started",
    features: ["3 documents tracked", "30 & 7 day reminders", "Email support"],
    cta: "Start free", href: "/signup", highlight: false,
  },
  {
    name: "Pro", price: "$9", period: "/month", note: "$79/year — save $29",
    desc: "For individuals who need full protection",
    features: ["Unlimited documents", "All 5 reminder intervals", "5 family members", "SMS reminders", "Document storage"],
    cta: "Start Pro", href: "/signup?plan=pro", highlight: true,
  },
  {
    name: "Team", price: "$29", period: "/month",
    desc: "For HR teams managing employee visas",
    features: ["Everything in Pro", "Up to 20 employees", "HR admin dashboard", "Bulk CSV import", "Dedicated support"],
    cta: "Contact us", href: "/signup?plan=team", highlight: false,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: "var(--bg-page)", paddingTop: "5rem", paddingBottom: "6rem" }}>
        {/* Subtle dot grid */}
        <div className="absolute inset-0 bg-dots opacity-60 pointer-events-none" aria-hidden="true" />
        {/* Soft forest glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none" aria-hidden="true"
          style={{ background: "radial-gradient(ellipse at center top, rgba(10,92,74,0.07) 0%, transparent 70%)" }} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-8">
            <span className="badge badge-good">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping-pulse absolute inline-flex h-full w-full rounded-full bg-forest opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-forest" />
              </span>
              Trusted by 10,000+ immigrants across the US
            </span>
          </div>

          {/* Headline */}
          <h1 className="h-hero mb-6" style={{ color: "var(--text-primary)" }}>
            Never miss an<br />
            <span className="text-gradient-lime">immigration</span><br />
            deadline again.
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            DueVisa tracks every visa, permit, and document — and reminds you before it&apos;s too late. No spreadsheets. No stress.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <Link href="/signup" id="hero-cta-btn" className="btn-primary text-base px-8 py-3.5 cursor-pointer">
              Start tracking free <ArrowRight size={16} />
            </Link>
            <Link href="/pricing" className="btn-secondary text-base px-6 py-3.5 cursor-pointer">
              View pricing
            </Link>
          </div>

          {/* Visa chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="text-xs font-medium mr-1" style={{ color: "var(--text-muted)" }}>Supports:</span>
            {["H-1B", "F-1", "Green Card", "TN", "O-1", "L-1", "H-4"].map(v => (
              <span key={v} className="px-3 py-1.5 rounded-lg text-xs font-medium cursor-default transition-all duration-200"
                style={{ border: "1px solid var(--border-default)", color: "var(--text-secondary)", background: "var(--bg-card)" }}>
                {v}
              </span>
            ))}
          </div>
        </div>

        {/* Dashboard mockup */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="animate-float">
            <div className="rounded-2xl overflow-hidden"
              style={{ boxShadow: "var(--shadow-card-hover)", border: "1px solid var(--border-default)", background: "var(--bg-card)" }}>
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-5 py-3.5" style={{ borderBottom: "1px solid var(--border-default)", background: "var(--bg-page-alt)" }}>
                <div className="w-2.5 h-2.5 rounded-full bg-critical" />
                <div className="w-2.5 h-2.5 rounded-full bg-gold" />
                <div className="w-2.5 h-2.5 rounded-full bg-lime" />
                <div className="flex-1 ml-3 rounded-md px-3 py-1 text-center border bg-card-bg border-border-subtle">
                  <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-muted">duevisa.com/dashboard</span>
                </div>
              </div>
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 p-5 border-b border-border-default bg-page-alt2/30 dark:bg-page-alt2/10">
                {[["6", "Tracked", <Shield key="s" size={14} className="text-forest" />], ["47d", "Next deadline", <Clock key="c" size={14} className="text-gold" />], ["4/6", "Safe", <CheckCircle2 key="cc" size={14} className="text-lime" />]].map(([val, label, icon]) => (
                  <div key={label as string} className="rounded-xl p-4 text-center border bg-card-bg border-border-subtle">
                    <div className="flex justify-center mb-1.5">{icon}</div>
                    <div className="font-bold text-lg font-mono tracking-tight text-primary">{val}</div>
                    <div className="text-xs mt-0.5 font-medium text-secondary">{label}</div>
                  </div>
                ))}
              </div>
              {/* Document rows */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-5 pb-5 pt-5 bg-warm-white dark:bg-card-bg border-t border-border-default">
                {[
                  { label: "I-797 Petition", days: "8", status: "critical" },
                  { label: "I-94 Authorized Stay", days: "47", status: "warning" },
                  { label: "H-1B Visa Stamp", days: "142", status: "good" },
                  { label: "Passport", days: "312", status: "good" },
                ].map(doc => (
                  <div key={doc.label} className={cn(
                    "rounded-xl p-4 flex items-center gap-3 border transition-all",
                    doc.status === "critical"
                      ? "border-red-500/50 bg-red-50 dark:bg-red-900/10"
                      : doc.status === "warning"
                        ? "border-yellow-400/50 bg-yellow-50 dark:bg-yellow-900/10"
                        : "border-border-default bg-white dark:bg-card-bg"
                  )}>
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm flex-shrink-0 border shadow-sm",
                      doc.status === "critical"
                        ? "bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/30"
                        : doc.status === "warning"
                          ? "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/30"
                          : "bg-green-50 dark:bg-forest/20 text-forest dark:text-lime border-green-100 dark:border-lime/20"
                    )}>{doc.days}</div>
                    <div>
                      <div className="font-bold text-sm tracking-tight text-primary">{doc.label}</div>
                      <div className="text-[11px] font-bold tracking-wider mt-0.5 uppercase text-muted">{doc.days} days remaining</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 rounded-full pointer-events-none"
            style={{ background: "rgba(10,92,74,0.12)", filter: "blur(24px)" }} />
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────── */}
      <section style={{ background: "var(--bg-page-alt)", borderTop: "1px solid var(--border-default)", borderBottom: "1px solid var(--border-default)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="text-center px-4 py-6 md:py-0"
                style={{
                  borderRight: i < 3 ? "1px solid var(--border-default)" : undefined,
                  borderBottom: i < 2 ? "1px solid var(--border-default)" : undefined,
                }}
              >
                <div className="stat-number text-forest dark:text-lime mb-1.5" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}>
                  {s.value}
                </div>
                <div className="text-xs sm:text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM ─────────────────────────────────────────────── */}
      <section style={{ background: "var(--bg-page)", padding: "6rem 0" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="badge badge-warning mb-5 inline-flex">The stakes are high</span>
            <h2 className="h-section mb-4" style={{ color: "var(--text-primary)" }}>
              One missed deadline can<br />cost you <span className="text-gradient-gold">everything.</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              Immigrants in the US juggle dozens of expiry dates. Missing any one can mean job loss, deportation risk, or years of legal delays.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PROBLEMS.map(p => (
              <div key={p.title} className="card cursor-default">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: "var(--bg-page-alt)", border: "1px solid var(--border-default)" }}>
                  {p.icon}
                </div>
                <div className="mb-4">
                  <span className="stat-number" style={{ color: "var(--text-primary)", fontSize: "2.25rem" }}>{p.stat}</span>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{p.statLabel}</p>
                </div>
                <h3 className="h-card mb-2" style={{ color: "var(--text-primary)" }}>{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section style={{ background: "var(--bg-page-alt2)", padding: "6rem 0" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="badge badge-good mb-5 inline-flex">How it works</span>
            <h2 className="h-section mb-4" style={{ color: "var(--text-primary)" }}>
              Set up in 3 minutes.<br />Protected forever.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.num} className="relative">
                {/* Connector line */}
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+2rem)] right-0 h-px" style={{ background: "var(--border-default)" }} />
                )}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl font-bold text-sm mb-5 font-mono"
                    style={{ background: "var(--color-forest)", color: "var(--color-lime)" }}>
                    {step.num}
                  </div>
                  <h3 className="h-card mb-2" style={{ color: "var(--text-primary)" }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/signup" className="btn-primary text-base px-8 py-3.5 cursor-pointer inline-flex">
              Start for free — takes 3 minutes <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY DUEVISA COMPARISON ───────────────────────────────── */}
      <section style={{ background: "var(--bg-page-alt2)", padding: "6rem 0" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-16">
            <span className="badge badge-good mb-5 inline-flex">Why DueVisa</span>
            <h2 className="h-section mb-4" style={{ color: "var(--text-primary)" }}>
              The difference is<br />
              <span className="text-gradient-lime">knowing in advance.</span>
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              Most immigrants manage immigration reactively. DueVisa makes it proactive.
            </p>
          </div>

          {/* Three columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 md:items-stretch">

            {/* Column 1 — Without DueVisa */}
            <div className="rounded-2xl md:rounded-r-none p-7 flex flex-col"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--bg-page-alt)", border: "1px solid var(--border-default)" }}>
                  <X size={14} style={{ color: "var(--text-muted)" }} />
                </div>
                <h3 className="font-bold text-sm tracking-tight" style={{ color: "var(--text-muted)" }}>
                  Without DueVisa
                </h3>
              </div>
              <ul className="space-y-4 flex-1">
                {[
                  "Track expiry dates in a spreadsheet",
                  "Set manual Google Calendar reminders",
                  "Remember which date means what (stamp vs I-797 vs I-94)",
                  "Guess when your 180-day EAD window opens",
                  "Panic when a deadline approaches",
                  "Pay attorney fees for status checks",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <X size={14} className="flex-shrink-0 mt-0.5" style={{ color: "var(--text-muted)" }} />
                    <span className="text-sm leading-snug" style={{ color: "var(--text-secondary)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 — DueVisa (center, elevated) */}
            <div className="relative rounded-2xl md:-my-4 p-7 pb-8 flex flex-col z-10 bg-forest/[0.05] dark:bg-forest/[0.35] border border-forest/25 dark:border-lime/25"
              style={{ boxShadow: "var(--shadow-card-hover)" }}>
              {/* Top badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap" style={{ background: "var(--color-lime)", color: "#050e0b" }}>Most popular</span>
              </div>

              <div className="flex items-center gap-3 mb-6 mt-2">
                <div className="w-8 h-8 rounded-lg bg-forest flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="4" width="12" height="1.5" rx="0.75" fill="#C8F562" />
                    <rect x="2" y="7.25" width="9" height="1.5" rx="0.75" fill="#C8F562" opacity="0.7" />
                    <rect x="2" y="10.5" width="12" height="1.5" rx="0.75" fill="#C8F562" />
                  </svg>
                </div>
                <h3 className="font-bold text-sm tracking-tight text-forest dark:text-lime">
                  The DueVisa difference
                </h3>
              </div>

              <ul className="space-y-4 flex-1">
                {[
                  "One dashboard for every document",
                  "Auto-calculates the 180-day EAD window",
                  "Smart reminders at 180/90/60/30/7 days",
                  "Family & dependent tracking included",
                  "Color-coded urgency — green, yellow, red",
                  "Attorney directory when you need help",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5 text-forest dark:text-lime" />
                    <span className="text-sm leading-snug" style={{ color: "var(--text-primary)" }}>{item}</span>
                  </li>
                ))}
              </ul>

              <Link href="/signup" className="btn-primary mt-8 text-sm justify-center">
                Start free — 3 minutes <ArrowRight size={14} />
              </Link>
            </div>

            {/* Column 3 — Consequences */}
            <div className="rounded-2xl md:rounded-l-none p-7 flex flex-col bg-red-600/[0.04] dark:bg-red-600/[0.09] border border-red-500/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-red-500/10">
                  <AlertTriangle size={14} className="text-critical" />
                </div>
                <h3 className="font-bold text-sm tracking-tight text-critical">
                  Missing a deadline
                </h3>
              </div>
              <ul className="space-y-4 flex-1">
                {[
                  "EAD expiry = can't legally work",
                  "I-94 overstay = immigration violation",
                  "Passport expiry = can't travel for visa stamp",
                  "Missed renewal = months of legal delays",
                  "Worst case = deportation proceedings",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <AlertTriangle size={14} className="flex-shrink-0 mt-0.5 text-critical" />
                    <span className="text-sm leading-snug" style={{ color: "var(--text-secondary)" }}>{item}</span>
                  </li>
                ))}
              </ul>
              {/* Callout */}
              <div className="mt-8 p-4 rounded-xl bg-red-500/[0.07] border border-red-500/20">
                <p className="text-xs leading-relaxed text-critical/80">
                  A single missed deadline can trigger consequences that take years and thousands of dollars to resolve.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────── */}
      <section style={{ background: "var(--bg-page)", padding: "6rem 0" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="badge badge-good mb-5 inline-flex">Everything you need</span>
            <h2 className="h-section" style={{ color: "var(--text-primary)" }}>
              Built specifically<br />for immigrants.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(f => (
              <div key={f.title} className="card cursor-default">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(10,92,74,0.08)", border: "1px solid rgba(10,92,74,0.12)" }}>
                  {f.icon}
                </div>
                <h3 className="h-card mb-2" style={{ color: "var(--text-primary)" }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <section style={{ background: "var(--bg-page-alt)", padding: "6rem 0" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="badge badge-good mb-5 inline-flex">Loved by immigrants</span>
            <h2 className="h-section" style={{ color: "var(--text-primary)" }}>
              Real people.<br />Real peace of mind.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="card cursor-default flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={14} fill="#0a5c4a" className="text-forest" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "var(--text-secondary)" }}>&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{t.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────── */}
      <section style={{ background: "var(--bg-page)", padding: "6rem 0" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="badge badge-good mb-5 inline-flex">Simple pricing</span>
            <h2 className="h-section" style={{ color: "var(--text-primary)" }}>Free to start. Upgrade when ready.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PLANS.map(plan => (
              <div key={plan.name} className={`relative rounded-2xl flex flex-col transition-all duration-300 cursor-default ${plan.highlight ? "shadow-card-hover" : ""
                }`} style={{
                  padding: "2rem",
                  border: plan.highlight ? "2px solid var(--color-forest)" : "1px solid var(--border-default)",
                  background: plan.highlight ? "rgba(10,92,74,0.04)" : "var(--bg-card)",
                }}>
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap" style={{ background: "var(--color-lime)", color: "#050e0b" }}>Most popular</span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-2" style={{ color: "var(--text-primary)" }}>{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="font-bold text-4xl tracking-tight" style={{ color: "var(--text-primary)" }}>{plan.price}</span>
                    <span className="text-sm" style={{ color: "var(--text-muted)" }}>{plan.period}</span>
                  </div>
                  {"note" in plan && <p className="text-xs font-medium" style={{ color: "var(--color-forest)" }}>{plan.note}</p>}
                  <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>{plan.desc}</p>
                </div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-forest mt-0.5 flex-shrink-0" />
                      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href={plan.href} className={`text-center py-3 px-5 rounded-xl font-semibold text-sm cursor-pointer transition-all ${plan.highlight ? "btn-primary" : "btn-secondary"
                  }`}>{plan.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section style={{ background: "var(--bg-page-alt)", padding: "5rem 0" }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="h-section text-center mb-12" style={{ color: "var(--text-primary)" }}>Common questions</h2>
          <div className="space-y-3">
            {[
              { q: "When should I start my H-1B renewal?", a: "At least 6 months (180 days) before your I-797 expires. DueVisa sends you a reminder at exactly the 180-day mark." },
              { q: "What's the difference between I-94 and visa stamp?", a: "Your visa stamp lets you enter the US. Your I-94 is your authorized stay period — never overstay your I-94 date." },
              { q: "Can I work if my EAD is expired?", a: "No. Apply at least 180 days before expiry to use automatic extension rules. DueVisa alerts you at every milestone." },
              { q: "Is my data secure?", a: "Yes. Supabase Row Level Security ensures only you can access your data. We never share or sell it." },
              { q: "Can I cancel Pro anytime?", a: "Yes. Cancel from Settings → Billing. You keep Pro features until the end of your billing period." },
            ].map((faq, i) => (
              <details key={i} className="card group cursor-pointer" style={{ padding: "1.25rem 1.5rem" }}>
                <summary className="flex items-center justify-between font-semibold text-sm list-none cursor-pointer" style={{ color: "var(--text-primary)" }}>
                  {faq.q}
                  <ChevronRight size={15} className="flex-shrink-0 ml-4 transition-transform duration-200 group-open:rotate-90" style={{ color: "var(--text-muted)" }} />
                </summary>
                <p className="text-sm leading-relaxed mt-4 pt-4" style={{ color: "var(--text-secondary)", borderTop: "1px solid var(--border-subtle)" }}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA — Forest green band ─────────────────────────── */}
      <section style={{ background: "var(--color-forest)", padding: "6rem 0" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide"
            style={{ background: "rgba(200,245,98,0.15)", border: "1px solid rgba(200,245,98,0.25)", color: "var(--color-lime)" }}>
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping-pulse absolute inline-flex h-full w-full rounded-full bg-lime opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime" />
            </span>
            Join 10,000+ immigrants
          </span>
          <h2 className="h-section mb-5" style={{ color: "#eef5f0" }}>
            Know exactly<br /><span style={{ color: "var(--color-lime)" }}>when to act.</span>
          </h2>
          <p className="text-lg mb-10 leading-relaxed" style={{ color: "rgba(238,245,240,0.75)" }}>
            Set up in 3 minutes. Protected forever. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" id="bottom-cta-btn" className="btn-primary-lime text-base px-10 py-4 cursor-pointer animate-glow">
              Start tracking free <ArrowRight size={18} />
            </Link>
            <Link href="/pricing" className="text-sm font-medium cursor-pointer flex items-center gap-1" style={{ color: "rgba(238,245,240,0.65)" }}>
              See pricing <ChevronRight size={14} />
            </Link>
          </div>
          <p className="text-xs mt-6" style={{ color: "rgba(238,245,240,0.4)" }}>
            No credit card required · Cancel anytime
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
