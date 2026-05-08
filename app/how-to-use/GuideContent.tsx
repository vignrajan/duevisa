"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  CheckCircle2, Clock, Bell, Shield, Zap, Users, ChevronRight,
  AlertTriangle, Scale, BookOpen, CreditCard, HelpCircle, Home,
  FileText, ArrowRight, Star
} from "lucide-react";

const SECTIONS = [
  { id: "intro", label: "Introduction", Icon: Home },
  { id: "setup", label: "Getting Started", Icon: Zap },
  { id: "onboarding", label: "Onboarding", Icon: FileText },
  { id: "dashboard", label: "Dashboard", Icon: Shield },
  { id: "documents", label: "Documents", Icon: BookOpen },
  { id: "reminders", label: "Reminders", Icon: Bell },
  { id: "family", label: "Family Tracking", Icon: Users },
  { id: "attorney", label: "Find an Attorney", Icon: Scale },
  { id: "plans", label: "Plans & Pricing", Icon: CreditCard },
  { id: "faq", label: "FAQs", Icon: HelpCircle },
];

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.06 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, vis] as const;
}

function Fade({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(18px)", transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s` }}>
      {children}
    </div>
  );
}

function GuideCard({ children, className = "", accent = false }: { children: React.ReactNode; className?: string; accent?: boolean }) {
  return (
    <div className={`card ${accent ? "border-forest/30 shadow-md ring-1 ring-forest/5" : ""} ${className}`}>
      {children}
    </div>
  );
}

function Callout({ type = "tip", children }: { type?: "tip"|"warn"|"danger"; children: React.ReactNode }) {
  const cfg = {
    tip:    { border: "border-forest border-l-4",    bg: "bg-page-alt2",     icon: <CheckCircle2 size={18} className="text-forest flex-shrink-0 mt-0.5" />,    label: "TIP",      lc: "text-forest", badge: "badge-good" },
    warn:   { border: "border-yellow-500 border-l-4",    bg: "bg-yellow-500/10",     icon: <AlertTriangle size={18} className="text-yellow-500 flex-shrink-0 mt-0.5" />,   label: "IMPORTANT",lc: "text-yellow-600 dark:text-yellow-500", badge: "badge-warning" },
    danger: { border: "border-red-500 border-l-4", bg: "bg-red-500/10", icon: <AlertTriangle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />, label: "CRITICAL", lc: "text-red-600 dark:text-red-500", badge: "badge-critical" },
  }[type];
  return (
    <div className={`rounded-2xl border p-6 mb-8 flex gap-5 transition-all shadow-sm ${cfg.border} ${cfg.bg}`}>
      {cfg.icon}
      <div>
        <span className={`badge ${cfg.badge} px-2 py-0.5 mb-2 inline-flex`}>{cfg.label}</span>
        <div className="text-sm leading-relaxed text-primary font-medium">{children}</div>
      </div>
    </div>
  );
}

function SectionHeading({ tag, title, sub }: { tag: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-14">
      <span className="badge badge-good mb-6 inline-flex">{tag}</span>
      <h2 className="h-section mb-6 leading-[1.1]">{title}</h2>
      {sub && <p className="text-lg leading-relaxed max-w-2xl text-secondary font-medium">{sub}</p>}
    </div>
  );
}

function Step({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-5 mb-10 last:mb-0">
      <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-forest flex items-center justify-center shadow-glow-forest border border-forest/20 font-mono">
        <span className="font-bold text-lg text-lime">{num}</span>
      </div>
      <div className="pt-1">
        <div className="h-card mb-2">{title}</div>
        <div className="text-base leading-relaxed text-secondary font-medium">{children}</div>
      </div>
    </div>
  );
}

function MockDashboard() {
  const docs = [
    { label: "EAD Work Permit", days: 8, status: "critical", date: "May 9, 2026" },
    { label: "H-1B Visa Stamp", days: 47, status: "warning", date: "Jun 17, 2026" },
    { label: "Passport", days: 198, status: "warning", date: "Nov 15, 2026" },
    { label: "I-797 Approval", days: 312, status: "good", date: "Mar 9, 2027" },
  ];
  const sc = {
    critical: { t:"text-red-600 dark:text-red-500", bl:"border-l-red-500", bc:"border-red-500/20", bg:"bg-red-500/10" }, 
    warning: { t:"text-yellow-600 dark:text-yellow-500", bl:"border-l-yellow-400", bc:"border-yellow-500/20", bg:"bg-yellow-500/10" }, 
    good: { t:"text-forest dark:text-lime", bl:"border-l-forest dark:border-l-lime", bc:"border-border-default", bg:"bg-card-bg" } 
  } as Record<string, { t: string; bl: string; bc: string; bg: string }>;

  return (
    <div className="bg-card-bg border border-border-default rounded-2xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between p-5 border-b border-border-subtle bg-card-elevated">
        <div>
          <div className="font-bold text-base tracking-tight text-primary">Welcome back, Raj</div>
          <div className="text-[11px] font-bold tracking-widest mt-1 text-secondary uppercase">H-1B · 4 DOCUMENTS TRACKED</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-1.5 shadow-sm">
          <span className="text-[11px] text-red-600 font-bold tracking-wider uppercase">1 CRITICAL</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 p-5 border-b border-border-subtle bg-card-bg">
        {[["4", "DOCUMENTS"], ["1", "ACTION NEEDED"], ["8d", "NEXT DEADLINE"]].map(([v, l], i) => (
          <div key={l} className={`rounded-xl p-4 border shadow-sm ${i === 2 ? "border-red-200 bg-red-50" : "bg-card-elevated border-border-subtle"}`}>
            <div className={`font-bold text-2xl tracking-tight ${i === 2 ? "text-red-600" : "text-primary"}`}>{v}</div>
            <div className="text-[10px] font-bold tracking-widest mt-1 text-secondary uppercase">{l}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3 p-5 bg-card-elevated">
        {docs.map(d => {
          const c = sc[d.status];
          return (
            <div key={d.label} className={`border border-l-4 rounded-xl p-4 flex items-center justify-between shadow-sm ${c.bl} ${c.bc} ${c.bg}`}>
              <div>
                <div className="font-bold text-sm tracking-tight text-primary mb-1">{d.label}</div>
                <div className="text-[10px] font-bold tracking-wider text-secondary uppercase">EXPIRES {d.date}</div>
              </div>
              <div className="text-right">
                <div className={`font-bold text-2xl leading-none ${c.t}`}>{d.days}</div>
                <div className="text-[10px] font-bold mt-1 text-secondary uppercase">DAYS LEFT</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MockOnboarding() {
  const [step, setStep] = useState(0);
  const visaTypes = [["H-1B", "Specialty Worker"], ["F-1", "Student"], ["Green Card", "Permanent Resident"], ["O-1", "Extraordinary Ability"]];
  const reminderRows = [["180 days", "Renewal window opens"], ["90 days", "Time to file — guide sent"], ["60 days", "Action recommended"], ["30 days", "Urgent — file immediately"], ["7 days", "Critical — emergency action"]];
  return (
    <div className="bg-card-bg border border-border-default rounded-2xl p-6 shadow-sm">
      <div className="flex gap-3 mb-8">
        {["Select Visa", "Add Documents", "Set Reminders"].map((s, i) => (
          <button key={s} onClick={() => setStep(i)} className="flex-1 cursor-pointer">
            <div className={`h-1.5 rounded-full mb-2 transition-all duration-300 ${i <= step ? "bg-forest" : "bg-gray-200"}`} />
            <div className={`text-[10px] font-bold tracking-widest uppercase ${i === step ? "text-forest" : "text-muted"}`}>STEP {i + 1}</div>
          </button>
        ))}
      </div>
      {step === 0 && (
        <div className="animate-fade-in">
          <div className="font-bold text-xl mb-2 tracking-tight text-primary">What visa are you on?</div>
          <div className="text-sm mb-6 text-secondary">Select your primary status</div>
          <div className="grid grid-cols-2 gap-3">
            {visaTypes.map(([type, sub], i) => (
              <button key={type} onClick={() => setStep(1)}
                className={`rounded-xl p-4 border text-left cursor-pointer transition-all duration-200 ${i === 0 ? "border-forest bg-[#F0F4EF] shadow-sm" : "bg-card-bg border-border-default hover:border-border-strong"}`}>
                <div className={`font-bold text-base tracking-tight mb-1 ${i === 0 ? "text-forest" : "text-primary"}`}>{type}</div>
                <div className={`text-xs ${i === 0 ? "text-forest/70" : "text-secondary"}`}>{sub}</div>
              </button>
            ))}
          </div>
        </div>
      )}
      {step === 1 && (
        <div className="animate-fade-in">
          <div className="font-bold text-xl mb-2 tracking-tight text-primary">H-1B Documents</div>
          <div className="text-sm mb-6 text-secondary">Enter expiry dates for your documents</div>
          {[["H-1B Visa Stamp", false], ["I-94 Status Expiry", true], ["I-797 Approval Notice", false]].map(([label, fill]) => (
            <div key={label as string} className="mb-4">
              <div className="text-sm font-semibold mb-2 text-primary">{label}</div>
              <div className={`w-full px-4 py-3 rounded-xl border text-sm font-medium ${fill ? "text-primary border-forest ring-2 ring-forest/10 bg-card-bg" : "text-muted border-border-default bg-card-elevated"}`}>
                {fill ? "2027-03-01" : "Select date..."}
              </div>
            </div>
          ))}
          <button onClick={() => setStep(2)} className="w-full bg-forest text-white font-bold py-3.5 rounded-xl mt-4 cursor-pointer flex items-center justify-center gap-2 hover:bg-forest-dark transition-colors shadow-sm">Continue <ArrowRight size={16} /></button>
        </div>
      )}
      {step === 2 && (
        <div className="animate-fade-in">
          <div className="font-bold text-xl mb-2 tracking-tight text-primary">Reminder Preferences</div>
          <div className="text-sm mb-6 text-secondary">We'll remind you at these intervals before each deadline</div>
          <div className="border border-border-default rounded-xl overflow-hidden">
            {reminderRows.map(([days, desc], i) => (
              <div key={days} className={`flex items-center justify-between p-4 bg-card-bg ${i !== reminderRows.length - 1 ? "border-b border-border-subtle" : ""}`}>
                <div className="flex items-center gap-4">
                  <span className="text-forest text-sm font-bold w-16">{days}</span>
                  <span className="text-sm font-medium text-secondary">{desc}</span>
                </div>
                <div className="w-10 h-5 bg-forest rounded-full relative flex-shrink-0 shadow-inner">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-card-bg rounded-full shadow-sm" />
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setStep(0)} className="w-full bg-forest text-white font-bold py-3.5 rounded-xl mt-6 cursor-pointer hover:bg-forest-dark transition-colors shadow-sm">Go to Dashboard</button>
        </div>
      )}
    </div>
  );
}

function FamilyMock() {
  const members = [
    { name: "Raj Patel", visa: "H-1B", docs: 4, urgent: 1, color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
    { name: "Priya Patel", visa: "H-4 + EAD", docs: 3, urgent: 1, color: "bg-pink-100 text-pink-700 border-pink-200" },
    { name: "Aryan Patel", visa: "H-4 Dependent", docs: 2, urgent: 0, color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  ];
  return (
    <div className="bg-card-bg border border-border-default rounded-2xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between p-5 border-b border-border-subtle bg-card-elevated">
        <span className="font-bold text-base tracking-tight text-primary">Family Dashboard</span>
        <span className="text-[11px] font-bold tracking-widest text-secondary uppercase">3 MEMBERS</span>
      </div>
      <div className="divide-y divide-gray-100">
        {members.map(m => (
          <div key={m.name} className="flex items-center gap-4 p-5 bg-card-bg">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border-2 font-bold text-lg ${m.color}`}>
              {m.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-base tracking-tight text-primary mb-1">{m.name}</div>
              <div className="text-[11px] font-bold tracking-wider text-secondary uppercase">{m.visa} · {m.docs} DOCS</div>
            </div>
            {m.urgent > 0 && <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-1.5 shadow-sm"><span className="text-[11px] font-bold text-red-600 uppercase">{m.urgent} URGENT</span></div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function PricingMock() {
  const plans = [
    { name: "Free", price: "$0", period: "forever", features: ["3 documents", "30 & 7 day reminders", "Email support"], cta: "Start Free", popular: false },
    { name: "Pro", price: "$9", period: "/month", features: ["Unlimited documents", "All 5 reminder intervals", "5 family members", "Document storage", "SMS reminders"], cta: "Start Pro", popular: true },
    { name: "Team", price: "$29", period: "/month", features: ["20 employee profiles", "HR admin dashboard", "Bulk CSV import", "Dedicated support"], cta: "Contact Sales", popular: false },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {plans.map(p => (
        <div key={p.name} className={`rounded-2xl border p-6 relative flex flex-col transition-all duration-300 ${p.popular ? "border-forest shadow-md bg-card-bg" : "border-border-default bg-card-elevated"}`}>
          {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C8F562] text-[#050E0B] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-sm border border-[#A8D44A]">POPULAR</div>}
          <div className={`font-bold text-sm tracking-widest uppercase mb-4 ${p.popular ? "text-forest" : "text-secondary"}`}>{p.name}</div>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="font-bold text-4xl tracking-tight text-primary">{p.price}</span>
            <span className="text-sm font-medium text-secondary">{p.period}</span>
          </div>
          <ul className="space-y-3 flex-1 mb-6">
            {p.features.map(f => <li key={f} className="flex gap-2.5 text-sm font-medium text-secondary"><CheckCircle2 size={16} className={`flex-shrink-0 mt-0.5 ${p.popular ? "text-forest" : "text-muted"}`} /><span>{f}</span></li>)}
          </ul>
          <div className={`rounded-xl py-3 text-center font-bold text-sm cursor-pointer transition-all shadow-sm ${p.popular ? "bg-forest text-white hover:bg-forest-dark" : "bg-card-bg border border-border-default text-primary hover:bg-card-elevated"}`}>{p.cta}</div>
        </div>
      ))}
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border-subtle last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-6 cursor-pointer text-left gap-4 hover:bg-page-alt px-4 -mx-4 rounded-xl transition-all group">
        <span className="font-bold text-base tracking-tight text-primary transition-colors group-hover:text-forest">{q}</span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border transition-all duration-300 ${open?"border-forest bg-forest text-lime shadow-glow-forest":"border-border-default text-muted group-hover:border-forest/30"}`}>
          <ChevronRight size={16} className={`transition-transform duration-300 ${open?"rotate-90":""}`} />
        </div>
      </button>
      {open && <div className="text-base leading-relaxed pb-8 pt-2 px-4 -mx-4 text-secondary font-medium animate-fade-in border-t border-border-subtle/50 mt-2">{a}</div>}
    </div>
  );
}

export default function DueVisaGuide() {
  const [activeSection, setActiveSection] = useState("intro");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-page-bg">
      <Navbar />
      {/* Mobile section toggle */}
      <div className="lg:hidden sticky top-[60px] z-40 border-b bg-white/95 backdrop-blur-md border-border-default px-4 py-3 shadow-sm">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="flex items-center justify-between w-full cursor-pointer">
          <span className="font-bold text-sm text-primary uppercase tracking-wide">Guide Sections</span>
          <ChevronRight size={16} className={`text-forest transition-transform ${mobileMenuOpen ? "rotate-90" : ""}`} />
        </button>
        {mobileMenuOpen && (
          <div className="mt-4 grid grid-cols-2 gap-2 animate-fade-in pb-2">
            {SECTIONS.map(({ id, label, Icon }) => (
              <a key={id} href={`#${id}`} onClick={() => { setActiveSection(id); setMobileMenuOpen(false); }}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${activeSection === id ? "bg-[#F0F4EF] text-forest border border-forest/20" : "bg-card-elevated border border-transparent text-secondary"}`}>
                <Icon size={14} className="flex-shrink-0" />{label}
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto py-10 px-4 border-r border-border-default bg-page-alt">
          <div className="text-[10px] font-bold tracking-widest px-4 mb-4 text-muted uppercase">Contents</div>
          {SECTIONS.map(({ id, label, Icon }) => (
            <a key={id} href={`#${id}`} onClick={() => setActiveSection(id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 mb-1 ${activeSection === id ? "bg-card-bg text-forest shadow-sm border border-border-default" : "border border-transparent text-secondary hover:bg-page-alt"}`}>
              <Icon size={16} className={`flex-shrink-0 ${activeSection === id ? "text-forest" : "text-muted"}`} />{label}
            </a>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-6 md:px-16 py-16 pb-32 max-w-4xl bg-page-bg relative">
          {/* Subtle dot grid for main area */}
          <div className="absolute inset-0 bg-dots opacity-40 pointer-events-none" aria-hidden="true" />
          {/* Radial forest glow matching landing page */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none z-0" aria-hidden="true"
            style={{ background: "radial-gradient(ellipse at center top, rgba(10,92,74,0.08) 0%, transparent 70%)" }} />
          
          {/* INTRO */}
          <section id="intro" className="mb-32 relative z-10">
            <Fade>
              <div className="mb-14">
                <div className="inline-flex items-center gap-2 mb-8">
                  <span className="badge badge-good">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping-pulse absolute inline-flex h-full w-full rounded-full bg-forest opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-forest" />
                    </span>
                    Official Guide · v1.0
                  </span>
                </div>
                <h1 className="h-hero mb-8 leading-[1.05]">
                  How to use<br />
                  <span className="text-gradient-lime">DueVisa</span>
                </h1>
                <p className="text-lg md:text-xl leading-relaxed max-w-2xl text-secondary font-medium">
                  Everything you need to know about tracking your immigration deadlines, setting up reminders, and never missing a date that matters.
                </p>
              </div>
            </Fade>
            <Fade delay={0.1}>
              <GuideCard accent className="!p-8 bg-page-alt2/50 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-forest/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />
                <div className="text-[11px] font-bold text-forest tracking-widest uppercase mb-4">What is DueVisa?</div>
                <p className="text-base leading-relaxed mb-4 text-primary font-medium">DueVisa is an immigration deadline tracker built specifically for immigrants in the United States. It tracks every visa, permit, and document you own — and sends you smart, timely reminders before each deadline so you never lose your legal status.</p>
                <p className="text-base leading-relaxed text-primary font-medium">Unlike a calendar app, DueVisa knows immigration law. It knows your EAD needs 180 days of lead time. It knows your I-94 and visa stamp are different things. You just enter dates — DueVisa handles the intelligence.</p>
              </GuideCard>
            </Fade>
            <Fade delay={0.15}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Who it's for", body: "H-1B, F-1, Green Card, TN, O-1, L-1 visa holders and their families", Icon: Users },
                  { label: "Setup time", body: "Under 3 minutes to have your full dashboard live with reminders active", Icon: Clock },
                  { label: "Cost", body: "Free for up to 3 documents. Pro at $9/month for unlimited everything", Icon: Star },
                ].map(c => (
                  <GuideCard key={c.label} className="!p-6 flex flex-col hover:translate-y-[-4px] transition-all duration-300">
                    <div className="w-12 h-12 rounded-2xl bg-page-alt border border-border-default flex items-center justify-center mb-5 shadow-sm group">
                      <c.Icon size={20} className="text-forest transition-transform group-hover:scale-110" />
                    </div>
                    <div className="h-card mb-2">{c.label}</div>
                    <div className="text-sm leading-relaxed text-secondary font-medium">{c.body}</div>
                  </GuideCard>
                ))}
              </div>
            </Fade>
          </section>

          {/* GETTING STARTED */}
          <section id="setup" className="mb-32">
            <Fade><SectionHeading tag="Getting Started" title="Create your account in 2 minutes." sub="DueVisa requires no immigration knowledge to set up. You just need your document expiry dates." /></Fade>
            <Fade delay={0.05}>
              <GuideCard className="!p-8">
                <Step num="1" title="Go to duevisa.com and click 'Start tracking free'">No credit card required. The free plan gives you 3 documents and basic reminders immediately.</Step>
                <Step num="2" title="Sign up with email or Google">Click <strong className="text-forest">"Continue with Google"</strong> for one-click signup, or enter your email and create a password.</Step>
                <Step num="3" title="Verify your email">Check your inbox for a verification link. Use the email you check most often — this is where reminders arrive.</Step>
                <Step num="4" title="Complete your 3-step onboarding">After verifying, you'll be taken to onboarding. This takes under 3 minutes.</Step>
              </GuideCard>
              <Callout type="tip">Use a personal email, not your work address. If you change jobs, you may lose access to your work email — and your reminders with it.</Callout>
            </Fade>
          </section>

          {/* ONBOARDING */}
          <section id="onboarding" className="mb-32">
            <Fade><SectionHeading tag="Onboarding" title="Three steps to your first dashboard." sub="The accuracy of your dates determines everything. Take your time here." /></Fade>
            <Fade delay={0.05}>
              <div className="mb-8">
                <MockOnboarding />
                <p className="text-[10px] font-bold mt-4 text-center tracking-widest text-muted uppercase">Interactive Preview ↑</p>
              </div>
            </Fade>
            <Fade delay={0.1}>
              <GuideCard className="!p-8">
                <div className="text-[11px] font-bold text-forest tracking-widest uppercase mb-6">Where to find each date</div>
                <div className="flex flex-col gap-3">
                  {[
                    ["Visa stamp expiry", "The date on the visa page in your passport under 'Expiration Date'"],
                    ["I-94 expiry", "Go to i94.cbp.dhs.gov — it shows your authorized stay end date"],
                    ["EAD expiry", "Printed on the front of your EAD card under 'Card Expires'"],
                    ["I-797 expiry", "The 'Validity Period' end date on your USCIS approval notice letter"],
                    ["Passport expiry", "The expiration date on the photo page of your passport"],
                  ].map(([label, desc]) => (
                    <div key={label} className="flex gap-4 rounded-xl p-4 bg-card-elevated border border-border-subtle">
                      <span className="text-forest font-bold mt-0.5 flex-shrink-0">→</span>
                      <div>
                        <div className="font-bold text-sm mb-1 tracking-tight text-primary">{label}</div>
                        <div className="text-sm text-secondary font-medium">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </GuideCard>
            </Fade>
          </section>

          {/* DASHBOARD */}
          <section id="dashboard" className="mb-32">
            <Fade><SectionHeading tag="Dashboard" title="Your immigration status at a glance." sub="Every document you track lives here, sorted by urgency. The most critical is always at the top." /></Fade>
            <Fade delay={0.05}>
              <div className="mb-8"><MockDashboard /><p className="text-[10px] font-bold mt-4 text-center tracking-widest text-muted uppercase">Example Dashboard View</p></div>
            </Fade>
            <Fade delay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {[
                  { dotCls: "bg-red-500", label: "CRITICAL (red)", labelCls: "text-red-600 dark:text-red-500", desc: "Expires within 30 days. Act immediately. Contact an attorney." },
                  { dotCls: "bg-yellow-500", label: "ACTION NEEDED (yellow)", labelCls: "text-yellow-600 dark:text-yellow-500", desc: "Within renewal window. Ideal time to start — don't wait." },
                  { dotCls: "bg-forest dark:bg-lime", label: "GOOD STANDING (green)", labelCls: "text-forest dark:text-lime", desc: "No action needed. Document is valid and not due yet." },
                  { dotCls: "bg-muted border border-border-strong", label: "EXPIRED", labelCls: "text-secondary", desc: "Already expired. Contact an immigration attorney today." },
                ].map(s => (
                  <GuideCard key={s.label} className="!p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-3 h-3 rounded-full flex-shrink-0 shadow-sm ${s.dotCls}`} />
                      <span className={`text-[11px] font-bold tracking-widest uppercase ${s.labelCls}`}>{s.label}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-text-secondary font-medium">{s.desc}</p>
                  </GuideCard>
                ))}
              </div>
              <Callout type="warn">If you see a red card at the top of your dashboard, that is your most important task today. Do not wait.</Callout>
            </Fade>
          </section>

          {/* DOCUMENTS */}
          <section id="documents" className="mb-32">
            <Fade><SectionHeading tag="Documents" title="Add, edit, and manage every document." sub="DueVisa tracks documents — not just visa types. Here's how to manage them." /></Fade>
            <Fade delay={0.05}>
              <GuideCard className="!p-8">
                <div className="text-[11px] font-bold text-forest tracking-widest uppercase mb-6">Adding a new document</div>
                <Step num="1" title="Click '+ Add Document' on your dashboard">Click the primary button in the top right corner of your dashboard.</Step>
                <Step num="2" title="Select the document type">Choose from the list for your visa. If not listed, choose 'Other'.</Step>
                <Step num="3" title="Enter the expiry date">DueVisa immediately calculates days remaining and schedules your reminders.</Step>
                <Step num="4" title="Add optional details">Optionally add your document number for reference when calling USCIS.</Step>
              </GuideCard>
              <Callout type="warn"><strong>Renewing your EAD?</strong> Don't delete the old document. Edit the expiry date to match your new card — history stays intact.</Callout>
            </Fade>
          </section>

          {/* REMINDERS */}
          <section id="reminders" className="mb-32">
            <Fade><SectionHeading tag="Reminders" title="Smart alerts at exactly the right time." sub="Up to 5 reminders per document — each timed to when you need to take action." /></Fade>
            <Fade delay={0.05}>
              <div className="flex flex-col gap-3 mb-8">
                {[
                  { days: "180 days before", action: "PREPARE", cls: "border-l-forest bg-page-alt2 border-forest/20", lc: "text-forest bg-card-bg border border-forest/20", desc: "Renewal window opens. Full checklist with forms, documents to gather, processing times." },
                  { days: "90 days before", action: "FILE", cls: "border-l-forest bg-page-alt2 border-forest/20", lc: "text-forest bg-card-bg border border-forest/20", desc: "Time to actually file. DueVisa walks you through the exact steps for your document type." },
                  { days: "60 days before", action: "URGENT", cls: "border-l-yellow-500 bg-yellow-500/10 border-yellow-500/20", lc: "text-yellow-600 dark:text-yellow-500 bg-card-bg border border-yellow-500/20", desc: "If you haven't filed, act now. Includes a direct link to premium processing options." },
                  { days: "30 days before", action: "CRITICAL", cls: "border-l-red-500 bg-red-500/10 border-red-500/20", lc: "text-red-700 dark:text-red-500 bg-card-bg border border-red-500/20", desc: "High urgency. If renewal isn't filed, you risk a gap in work authorization." },
                  { days: "7 days before", action: "EMERGENCY", cls: "border-l-red-500 bg-red-500/10 border-red-500/20", lc: "text-red-700 dark:text-red-500 bg-card-bg border border-red-500/20", desc: "Emergency alert. DueVisa connects you directly to a vetted immigration attorney." },
                ].map((r, i) => (
                  <div key={r.days} className={`border-l-4 border-y border-r rounded-xl p-5 !cursor-default shadow-sm ${r.cls}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <span className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-md shadow-sm ${r.lc}`}>{r.action}</span>
                        <span className="text-sm font-bold text-primary">{r.days}</span>
                      </div>
                      <span className="text-[10px] font-bold tracking-widest text-muted uppercase">REMINDER {i + 1} OF 5</span>
                    </div>
                    <p className="text-sm leading-relaxed text-primary font-medium">{r.desc}</p>
                  </div>
                ))}
              </div>
              <Callout type="tip">Free plan gets 30-day and 7-day reminders. Pro gets all 5 intervals including the critical 180-day early warning.</Callout>
            </Fade>
          </section>

          {/* FAMILY */}
          <section id="family" className="mb-32">
            <Fade><SectionHeading tag="Family Tracking" title="One dashboard for your entire family." sub="If your spouse or children are on dependent visas, their deadlines are just as important as yours." /></Fade>
            <Fade delay={0.05}><div className="mb-8"><FamilyMock /></div></Fade>
            <Fade delay={0.1}>
              <GuideCard className="!p-8">
                <div className="text-[11px] font-bold text-forest tracking-widest uppercase mb-6">How to add a family member</div>
                <Step num="1" title="Go to Dashboard → Family">Click the 'Family' tab in your left navigation.</Step>
                <Step num="2" title="Click 'Add Family Member'">Enter their name, relationship, and visa type.</Step>
                <Step num="3" title="Add their documents">DueVisa auto-shows the right document types for their visa.</Step>
                <Step num="4" title="Their deadlines appear on your dashboard">All family documents show up with the same urgency color system.</Step>
              </GuideCard>
            </Fade>
          </section>

          {/* ATTORNEY */}
          <section id="attorney" className="mb-32">
            <Fade><SectionHeading tag="Find an Attorney" title="Connect with a lawyer when it matters." sub="When a deadline is dangerously close, DueVisa connects you to a vetted attorney." /></Fade>
            <Fade delay={0.05}>
              <GuideCard className="!p-8">
                <div className="text-[11px] font-bold text-forest tracking-widest uppercase mb-6">How it works</div>
                <Step num="1" title="Click 'Talk to an Attorney' on any urgent card">Appears on any document in Warning or Critical state.</Step>
                <Step num="2" title="Describe your situation in 2–3 sentences">A brief form: visa type (pre-filled), what's happening, your contact email.</Step>
                <Step num="3" title="We match you with a specialist">DueVisa sends your details to attorneys who specialise in your visa type.</Step>
                <Step num="4" title="Get expert help fast">They contact you within 4–24 hours. No cold calls, no Googling.</Step>
              </GuideCard>
              <Callout type="danger">If any document is <strong>already expired</strong>, use the attorney feature immediately. This is not a situation to handle without legal guidance.</Callout>
            </Fade>
          </section>

          {/* PLANS */}
          <section id="plans" className="mb-32">
            <Fade><SectionHeading tag="Plans & Pricing" title="Free to start. Pro when you need it." sub="Most users start on the free plan. You'll know when it's time to upgrade." /></Fade>
            <Fade delay={0.05}><div className="mb-8"><PricingMock /></div></Fade>
            <Fade delay={0.1}><Callout type="tip">Annual Pro is $79/year ($6.58/month) — saves $29 vs monthly. Less than a coffee, protecting your legal status.</Callout></Fade>
          </section>

          {/* FAQ */}
          <section id="faq" className="mb-20">
            <Fade><SectionHeading tag="FAQs" title="Common questions answered." /></Fade>
            <Fade delay={0.05}>
              <GuideCard className="!p-6 !px-8">
                {[
                  { q: "Is my data safe?", a: "Yes. DueVisa uses Supabase with Row Level Security — only you can see your own documents. We never sell your data." },
                  { q: "What's the difference between my visa stamp and my I-94?", a: "Your visa stamp lets you enter the US. Your I-94 is your authorized period of stay. You can have a valid I-94 with an expired stamp — they're different." },
                  { q: "I'm on H-1B but my spouse is on H-4. Do I need two accounts?", a: "No. Add your spouse as a Family Member under your account. One login, one subscription." },
                  { q: "Will I get spammed?", a: "No. DueVisa sends a maximum of 5 emails per document per renewal cycle. No newsletters, no product upsells." },
                  { q: "Can I cancel my Pro subscription?", a: "Yes, at any time from Settings → Billing. You'll retain Pro features until end of billing period." },
                  { q: "Is this a legal service?", a: "No. DueVisa is a deadline tracking tool, not a legal service. Our attorney feature connects you with licensed professionals." },
                ].map(item => <FAQItem key={item.q} {...item} />)}
              </GuideCard>
            </Fade>
          </section>

          {/* FINAL CTA */}
          <Fade>
            <div className="relative overflow-hidden rounded-3xl p-12 text-center group bg-forest shadow-glow-forest">
              <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-lime/10 blur-[100px] pointer-events-none" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-lime/10 border border-lime/20 flex items-center justify-center mx-auto mb-8 shadow-sm">
                  <Shield size={28} className="text-lime" />
                </div>
                <h2 className="h-section mb-6 !text-white leading-[1.1]">Ready to start?</h2>
                <p className="text-lg mb-10 leading-relaxed text-white/70 font-medium">Set up your full dashboard in under 3 minutes. Free forever.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/signup" className="btn-primary-lime px-10 py-4 text-base cursor-pointer animate-glow">
                    Start tracking free <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </Fade>
        </main>
      </div>
      <Footer />
    </div>
  );
}
