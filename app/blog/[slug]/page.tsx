// /app/blog/[slug]/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

const RELATED_TOOLS: Record<string, { label: string; href: string; desc: string }[]> = {
  "h1b-renewal-timeline": [
    { label: "H-1B Deadline Tracker", href: "/h1b-renewal-tracker", desc: "Track your H-1B renewal countdown automatically." },
    { label: "Start tracking free", href: "/signup", desc: "Add your I-797 and get reminders at 180, 90, 60, 30, and 7 days." },
  ],
  "i94-vs-visa-stamp": [
    { label: "H-1B Deadline Tracker", href: "/h1b-renewal-tracker", desc: "Track both your I-94 and visa stamp with automatic reminders." },
    { label: "Start tracking free", href: "/signup", desc: "Never confuse your deadlines again — DueVisa tracks both." },
  ],
  "ead-renewal-2026": [
    { label: "EAD Renewal Calculator", href: "/ead-renewal-calculator", desc: "Calculate your exact EAD filing window in seconds." },
    { label: "EAD Renewal Reminder", href: "/ead-reminder", desc: "Get reminders 180 days before your EAD expires." },
  ],
  "f1-student-immigration-checklist": [
    { label: "F-1 OPT Tracker", href: "/f1-opt-tracker", desc: "Track your OPT EAD, STEM OPT, and I-20 deadlines automatically." },
    { label: "Start tracking free", href: "/signup", desc: "All 6 F-1 documents, pre-configured with the right lead times." },
  ],
  "what-happens-if-you-overstay": [
    { label: "H-1B Deadline Tracker", href: "/h1b-renewal-tracker", desc: "Track your I-94 authorized stay and never overstay again." },
    { label: "EAD Renewal Reminder", href: "/ead-reminder", desc: "Automatic reminders before your EAD expires." },
  ],
  "green-card-renewal-guide": [
    { label: "Green Card Renewal Tracker", href: "/green-card-renewal", desc: "Track your I-551 expiry and I-751 filing window automatically." },
    { label: "Start tracking free", href: "/signup", desc: "DueVisa sends your first green card reminder 180 days out." },
  ],
};

// Blog post content
const POSTS: Record<string, {
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
}> = {
  "h1b-renewal-timeline": {
    title: "The Complete H-1B Renewal Timeline: When to Start and What to Do",
    description: "A step-by-step guide to H-1B renewal — from the 180-day mark to filing your I-129 extension.",
    date: "April 15, 2026",
    readTime: "8 min",
    category: "H-1B",
    content: `
## When Should You Start Your H-1B Renewal?

The H-1B renewal process should begin **at least 6 months (180 days) before your I-797 approval notice expires**. This gives your employer time to prepare, and you enough runway to handle USCIS delays.

The moment you pass the 180-day mark before your I-797 expiry, DueVisa will send you your first reminder.

## The H-1B Extension Timeline

### 180 Days Out: Alert Your Employer
Your employer is the petitioner for your H-1B extension. They need to:
- Contact their immigration attorney
- Gather your updated job description, LCA (Labor Condition Application), and salary information
- Decide on standard vs. premium processing

**Don't wait.** Many HR teams and attorneys have backlogs. Starting now protects you.

### 120 Days Out: LCA Approval
Your employer's attorney should file a new Labor Condition Application (LCA) with the Department of Labor. This typically takes 7 business days but can be faster.

### 90 Days Out: I-129 Filing
The I-797 extension is filed via Form I-129. At this point, your employer should be ready to submit the petition. USCIS allows filing up to 6 months before expiry.

**Premium processing** (Form I-907) costs $2,805 and guarantees a 15 business day response. If you're cutting it close, premium processing is worth every dollar.

### The I-94 vs. I-797 — Which One Actually Matters?
Most H-1B workers confuse their I-797 approval notice with their authorized period of stay. Here's the truth:

- **I-797**: Approves your H-1B petition (employer-sponsored)
- **I-94**: Your actual authorized stay (check yours at i94.cbp.dhs.gov)

Your I-94 is often tied to your I-797 date, but not always. Always check both.

### Cap-Gap Protection
If your H-1B petition is filed before your current status expires, you may qualify for **cap-gap protection** — this allows you to continue working while your extension is pending. This is especially important for F-1 to H-1B transitions.

## Common Mistakes to Avoid

1. **Waiting until 60 days out**: By then, standard processing won't save you
2. **Assuming your employer will handle it**: Confirm they've actually started
3. **Confusing your visa stamp expiry with your I-94**: The stamp is irrelevant for domestic work authorization
4. **Traveling before your extension is approved**: Your stamp must be valid to re-enter

## What DueVisa Tracks for H-1B Workers

DueVisa automatically tracks:
- **H-1B Visa Stamp** (renewal lead: 90 days)
- **I-94 Authorized Stay** (renewal lead: 180 days) — **most critical**
- **I-797 Petition Approval** (renewal lead: 180 days)
- **Passport** (renewal lead: 270 days)
- **EAD** if applicable (renewal lead: 180 days)
- **Driver's License** (renewal lead: 60 days)

Start tracking yours at DueVisa — it's free.
    `,
  },
  "i94-vs-visa-stamp": {
    title: "I-94 vs Visa Stamp: What's the Difference and Which One Matters",
    description: "Most immigrants confuse their visa stamp with their I-94. Understanding the difference could save your legal status.",
    date: "April 10, 2026",
    readTime: "5 min",
    category: "General",
    content: `
## The Confusion That Costs People Their Status

Every year, thousands of immigrants make a dangerous mistake: they think their visa stamp is what keeps them in legal status. It's not.

Your **visa stamp** and your **I-94** are two completely different things. Confusing them is one of the most common immigration mistakes — and the consequences can be severe.

## What Is a Visa Stamp?

A visa stamp is the sticker in your passport issued by a US consulate or embassy. It allows you to **request entry** into the United States.

Key facts about your visa stamp:
- It can be expired — and you're still in legal status inside the US
- It only matters when you're **re-entering** the US from abroad
- An expired stamp means you need to get a new one at a consulate before your next international trip

## What Is an I-94?

Your I-94 is your **Admission Record** — issued by Customs and Border Protection (CBP) when you enter the US. It shows:
- Your class of admission (H-1B, F-1, etc.)
- Your **authorized period of stay** (the critical date)

The I-94 is what actually determines how long you can legally remain in the US.

**Check your current I-94 at:** [i94.cbp.dhs.gov](https://i94.cbp.dhs.gov)

## Which One Should You Track?

**Both — but the I-94 date is the one you must never violate.**

Here's the practical breakdown:

| Situation | What Matters |
|-----------|-------------|
| Working inside the US | I-94 authorized stay date |
| Traveling internationally | Visa stamp must be valid to re-enter |
| Determining legal status | I-94 date |

## The Dangerous Scenario

Imagine: Your H-1B visa stamp expires in 2023. Your I-94 says "D/S" (Duration of Status) or lists a date in 2025. 

You are **completely fine** remaining and working in the US — as long as your employer keeps your petition in order.

But if you fly to India for vacation in 2024 with that expired stamp, you cannot re-enter without visiting a US consulate first.

## What DueVisa Does

DueVisa tracks both separately — because both matter in different contexts:

- **Visa Stamp**: Alerts you 90 days before expiry if you travel internationally
- **I-94**: Alerts you 180 days out — the critical deadline that affects your actual status

Add both documents at duevisa.com to stay ahead of both deadlines.
    `,
  },
  "ead-renewal-2026": {
    title: "EAD Renewal in 2026: Timeline, Process, and What Changed",
    description: "USCIS updated EAD automatic extension rules. Here's what H-4 EAD, OPT EAD, and other EAD holders need to know.",
    date: "April 5, 2026",
    readTime: "7 min",
    category: "EAD",
    content: `
## What Is an EAD?

An Employment Authorization Document (EAD) is a physical card that gives you the legal right to work in the United States. Unlike H-1B or L-1 status (which is employer-sponsored), an EAD is independently issued to you.

## Who Needs an EAD?

- **H-4 spouses** of H-1B holders with approved I-140s
- **F-1 students** on OPT or STEM OPT
- **Green card applicants** waiting for their card
- **Asylum seekers** and other categories

## The Most Important Change: Automatic Extension

As of 2024, USCIS significantly extended the **automatic extension** period for EAD renewals. If you file your renewal before your EAD expires, you may get an automatic extension of **up to 540 days** while your case is pending.

This applies to most EAD categories, but not all. Check the USCIS website or consult an attorney to confirm yours qualifies.

## The 180-Day Filing Rule

**Always file your EAD renewal 180 days before expiry.** Here's why:

1. USCIS processing times can exceed 6 months
2. Filing early maximizes your automatic extension window
3. Gaps in EAD authorization mean gaps in work authorization — which can have tax and HR consequences

## What to File

The EAD renewal is done via **Form I-765**. You'll need:
- Completed Form I-765
- 2 passport-style photos
- Copy of your current EAD
- Supporting documentation (varies by category)
- Filing fee (currently $520, unless fee waiver applies)

## H-4 EAD Specifically

H-4 EAD is one of the most volatile categories — it has been subject to litigation and policy changes. As of 2026:
- H-4 EAD automatic extension is available
- Your H-1B spouse must have an **approved I-140** for you to qualify for H-4 EAD
- Your H-4 status must remain valid during the entire period

## DueVisa for EAD Holders

DueVisa sends your first EAD reminder **180 days before expiry** — the exact moment you should be filing. You'll receive follow-up reminders at 90, 60, 30, and 7 days.

Don't track your EAD in a spreadsheet. Track it with DueVisa — it's free for up to 3 documents.
    `,
  },
  "f1-student-immigration-checklist": {
    title: "The F-1 Student Immigration Checklist: Every Date You Need to Track",
    description: "F-1 students track more dates than any other visa category. This comprehensive checklist covers every deadline from enrollment to STEM OPT.",
    date: "March 28, 2026",
    readTime: "9 min",
    category: "F-1",
    content: `
## F-1 Students Have the Most Complex Immigration Timelines

If you're an F-1 international student, you're managing more immigration dates than almost any other visa holder. Get one wrong, and you could lose your student status, your OPT authorization, or your ability to re-enter the US.

This is your complete checklist.

## Document 1: F-1 Visa Stamp

**Renewal lead: 90 days before travel**

Your F-1 visa stamp allows you to enter the United States. It can be expired while you're studying inside the US — but you need a valid stamp to re-enter after international travel.

**Track this if:** You plan to travel internationally during your program.

## Document 2: I-20 Program End Date

**Renewal lead: 120 days**

Your I-20 is issued by your school's Designated School Official (DSO). It shows your authorized program end date. Maintaining full-time enrollment keeps your status active.

**Action needed:** If you need an extension (changing programs, taking longer), contact your DSO well before the I-20 end date.

## Document 3: SEVIS Registration

**Track with your DSO**

Your SEVIS record must be maintained. Take breaks in enrollment only with DSO authorization (authorized vacation, medical leave, etc.).

## Document 4: Passport

**Renewal lead: 270 days**

Your passport must be valid throughout your program and for travel. Some countries allow renewal through the consulate in the US.

## Document 5: OPT EAD (If Applicable)

**Renewal lead: 150 days**

For Optional Practical Training (OPT), you must apply **90 days before your graduation date** (or OPT start date). The I-765 takes up to 90 days to process — file early.

OPT gives you 12 months of work authorization in your field of study.

## Document 6: STEM OPT Extension (If Applicable)

**Renewal lead: 120 days**

If you're in a STEM field, you can apply for a 24-month STEM OPT extension. You must apply before your OPT EAD expires.

Requirements:
- STEM-eligible degree
- Employment with an E-Verify employer
- IEP (Individual Employment Plan) signed by both you and your employer

## The F-1 Timeline Summary

| Event | When to Act |
|-------|------------|
| OPT Application | 90 days before graduation |
| STEM OPT Extension | 90 days before OPT expires |
| I-20 Extension | Before program end date |
| Visa Stamp Renewal | 90 days before international travel |
| Passport Renewal | 270 days before expiry |

## Common F-1 Mistakes

1. Missing the OPT application window (there's a 60-day period before graduation)
2. Starting work before your OPT EAD arrives
3. Taking more than 90 days of unemployment during OPT
4. Forgetting to update your DSO on employer changes during OPT

## Track Everything in DueVisa

DueVisa has a dedicated F-1 document set that includes all 6 documents above, pre-configured with the right reminder timelines. Start tracking for free at duevisa.com.
    `,
  },
  "what-happens-if-you-overstay": {
    title: "What Happens If You Overstay Your Visa? (And How to Avoid It)",
    description: "Overstaying has serious consequences — 3-year and 10-year bars, future visa denials, and deportation risk.",
    date: "March 20, 2026",
    readTime: "10 min",
    category: "General",
    content: `
## What Does "Overstay" Mean?

An overstay occurs when you remain in the United States past your authorized period of stay — the date on your I-94 Admission Record. 

Note: this is **not** your visa stamp expiry date. Your visa stamp can expire while you're still in lawful status. But your I-94 date is absolute.

## The Unlawful Presence Clock

When you overstay, you begin accumulating "unlawful presence." This matters because US immigration law imposes bars on people who accumulate unlawful presence and then leave or are removed:

- **Under 180 days**: No automatic bar (but you may face visa denial)
- **180 days to 1 year**: **3-year bar** from re-entering the US
- **1 year or more**: **10-year bar** from re-entering the US
- **Multiple violations**: Permanent bar (very rare, for willful violators)

## The Day You Leave Matters

The clock for unlawful presence starts the day after your authorized stay ends (or the day you're found out of status). The bars are triggered **when you leave** the US.

This means: if you've overstayed by 6 months and you board a flight home, you've now triggered the 3-year bar the moment you cross the border.

## Consequences Beyond the Bar

Even without triggering a formal bar, overstaying can:
- Result in visa denial for future applications
- Trigger removal proceedings if discovered
- Appear permanently on your immigration record
- Affect green card or naturalization applications

## Circumstances Where Overstay Doesn't Count

Some circumstances "toll" (pause) the unlawful presence clock:
- Minors under 18
- Pending asylum applications (in some cases)
- Approved VAWA petitions
- Certain visa applications filed before I-94 expiry (like AOS)

Consult an attorney if you think you may have an exception.

## How to Avoid Overstaying

1. **Know your I-94 date**: Check it at i94.cbp.dhs.gov — not your visa stamp
2. **Track it with DueVisa**: Get reminders at 180, 90, 60, 30, and 7 days
3. **File extensions on time**: If your employer is delaying, escalate
4. **Don't assume your employer is tracking for you**: Many aren't
5. **Consult an attorney if you're unsure**: A $200 consultation is infinitely cheaper than a 10-year bar

## If You've Already Overstayed

If you're currently in unlawful presence, don't panic — but act immediately:
- **Do not leave the US** without consulting an immigration attorney
- Look into Adjustment of Status options if you have a qualifying petition
- Consider voluntary departure with an attorney's guidance

The worst thing you can do is nothing. Time makes overstay situations worse, not better.

## The Free Alternative: Track Deadlines with DueVisa

The best way to avoid overstaying is to track your I-94 date like your career depends on it — because it does.

DueVisa sends you reminders at 180, 90, 60, 30, and 7 days before your authorized stay expires. It's free for your first 3 documents.

Sign up at duevisa.com.
    `,
  },
  "green-card-renewal-guide": {
    title: "Green Card Renewal Guide: When to Apply and What Documents You Need",
    description: "Your green card expires — but you don't lose permanent resident status. Here's everything about Form I-90.",
    date: "March 12, 2026",
    readTime: "6 min",
    category: "Green Card",
    content: `
## Does Your Green Card Expiring Mean You're Losing Status?

No. This is the most common misconception about green card renewal.

As a **Lawful Permanent Resident (LPR)**, your status does not expire — ever. What expires is the green card itself (Form I-551), which is simply the **physical evidence** of your status.

However, you need a valid green card to:
- Work legally (I-9 employment verification)
- Re-enter the US after international travel
- Prove your status to banks, landlords, and government agencies

So while you don't lose status, you absolutely need to renew your card.

## Standard Green Card: 10-Year Renewal

Most green cards are valid for 10 years. USCIS recommends filing Form I-90 **6 months before expiry** — that's 180 days.

## Conditional Green Card (2-Year): The I-751

If you received a 2-year conditional green card (through marriage or investor visa), you must file **Form I-751 to remove conditions** within the 90-day window before your 2-year card expires.

This is a firm window — filing too early or too late can cause problems.

## What to File: Form I-90

Form I-90 (Application to Replace Permanent Resident Card) is the standard renewal form. You'll need:
- Completed Form I-90
- Current (or expired) green card copy
- 2 passport-style photos
- Filing fee ($540 as of 2026 — check USCIS.gov for current fees)
- Any name change documentation if applicable

Filing online at USCIS.gov is faster and easier than paper filing.

## Processing Times

Standard I-90 processing: **8-24 months** (USCIS processing times vary significantly)

While your case is pending, your I-90 receipt notice serves as evidence of your continued LPR status for 24 months. Your employer can use this for I-9 reverification.

## Other Documents Green Card Holders Should Track

Beyond the green card itself, DueVisa helps green card holders track:

- **Home Country Passport**: Keep valid for international travel (270-day renewal lead)
- **Re-entry Permit**: If planning to be outside the US for 1+ year (apply before leaving)
- **I-751 (Remove Conditions)**: The critical 90-day filing window
- **N-400 Citizenship Eligibility**: Track when you hit the 5-year (or 3-year for married to US citizen) threshold

## Track Your Green Card with DueVisa

DueVisa sends your first green card renewal reminder 180 days before expiry — right when USCIS recommends you file. Free to get started.
    `,
  },
};

interface BlogPostPageProps {
  params: { slug: string };
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = POSTS[params.slug];
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = POSTS[params.slug];
  if (!post) notFound();

  // Parse simple markdown to HTML-like rendering
  const sections = post.content.trim().split("\n\n");

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>
      <Navbar />

      <main className="pt-28 pb-24">
        <article className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Back */}
          <Link href="/blog" className="flex items-center gap-2 text-secondary hover:text-primary text-sm mb-8 transition-colors">
            <ArrowLeft size={16} />
            Back to Blog
          </Link>

          {/* Header */}
          <div className="mb-10">
            <span className="badge badge-good mb-4">{post.category}</span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-secondary text-lg mb-6">{post.description}</p>
            <div className="flex items-center gap-4 text-muted text-sm font-mono">
              <div className="flex items-center gap-1.5">
                <Calendar size={13} />
                {post.date}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={13} />
                {post.readTime} read
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px mb-10" style={{ background: "var(--border-default)" }} />

          {/* Content */}
          <div className="prose-custom space-y-5">
            {sections.map((section, i) => {
              const trimmed = section.trim();
              if (trimmed.startsWith("## ")) {
                return (
                  <h2 key={i} className="font-syne font-bold text-primary text-2xl mt-10 mb-4">
                    {trimmed.slice(3)}
                  </h2>
                );
              }
              if (trimmed.startsWith("### ")) {
                return (
                  <h3 key={i} className="font-syne font-bold text-primary text-lg mt-8 mb-3">
                    {trimmed.slice(4)}
                  </h3>
                );
              }
              if (trimmed.startsWith("**") && trimmed.includes("**:")) {
                // Bold definition
                const [bold, ...rest] = trimmed.split("**:");
                return (
                  <p key={i} className="text-secondary leading-relaxed">
                    <strong className="text-primary">{bold.replace("**", "")}</strong>
                    {rest.join("**:")}
                  </p>
                );
              }
              if (trimmed.startsWith("| ")) {
                // Simple table
                const rows = trimmed.split("\n").filter((r) => !r.match(/^[\|\s\-]+$/));
                return (
                  <div key={i} className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      {rows.map((row, ri) => {
                        const cells = row.split("|").filter((c) => c.trim());
                        return (
                          <tr
                            key={ri}
                            className={ri === 0 ? "border-b border-border-default" : "border-b border-border-subtle"}
                          >
                            {cells.map((cell, ci) => (
                              ri === 0 ? (
                                <th key={ci} className="text-left py-2 px-3 font-syne font-semibold text-primary text-xs uppercase tracking-wider">
                                  {cell.trim()}
                                </th>
                              ) : (
                                <td key={ci} className="py-2 px-3 text-secondary">
                                  {cell.trim()}
                                </td>
                              )
                            ))}
                          </tr>
                        );
                      })}
                    </table>
                  </div>
                );
              }
              if (trimmed.startsWith("- ")) {
                const items = trimmed.split("\n");
                return (
                  <ul key={i} className="space-y-2">
                    {items.map((item, ii) => (
                      <li key={ii} className="flex items-start gap-2 text-secondary">
                        <span className="text-forest dark:text-lime mt-1.5 flex-shrink-0">·</span>
                        <span>{item.slice(2)}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              if (trimmed.match(/^\d+\./)) {
                const items = trimmed.split("\n");
                return (
                  <ol key={i} className="space-y-2">
                    {items.map((item, ii) => (
                      <li key={ii} className="flex items-start gap-3 text-secondary">
                        <span className="font-mono text-forest dark:text-lime font-bold text-sm mt-0.5 flex-shrink-0">
                          {ii + 1}.
                        </span>
                        <span>{item.replace(/^\d+\.\s/, "")}</span>
                      </li>
                    ))}
                  </ol>
                );
              }
              if (trimmed) {
                // Process bold text
                const parts = trimmed.split(/\*\*(.*?)\*\*/g);
                return (
                  <p key={i} className="text-secondary leading-relaxed text-base">
                    {parts.map((part, pi) =>
                      pi % 2 === 1 ? (
                        <strong key={pi} className="text-primary font-semibold">
                          {part}
                        </strong>
                      ) : (
                        part
                      )
                    )}
                  </p>
                );
              }
              return null;
            })}
          </div>

          {/* Related tools */}
          {RELATED_TOOLS[params.slug] && (
            <div className="mt-12 space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color:"var(--text-muted)" }}>Related tools</p>
              {RELATED_TOOLS[params.slug].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="flex items-center justify-between p-4 rounded-xl border transition-all hover:border-forest group"
                  style={{ background:"var(--bg-card)", borderColor:"var(--border-default)" }}
                >
                  <div>
                    <p className="font-semibold text-sm group-hover:text-forest transition-colors" style={{ color:"var(--text-primary)" }}>{tool.label}</p>
                    <p className="text-xs mt-0.5" style={{ color:"var(--text-secondary)" }}>{tool.desc}</p>
                  </div>
                  <span className="text-forest opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold ml-4">→</span>
                </Link>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 p-8 rounded-2xl text-center" style={{ background: "var(--bg-page-alt2)", border: "1px solid var(--border-strong)" }}>
            <h3 className="font-syne font-bold text-primary text-xl mb-3">
              Track your deadlines automatically
            </h3>
            <p className="text-secondary text-sm mb-6">
              DueVisa sends you email reminders at 180, 90, 60, 30, and 7 days before
              every immigration deadline. Free for up to 3 documents.
            </p>
            <Link href="/signup" className="btn-primary inline-block">
              Start tracking free →
            </Link>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-4 rounded-xl" style={{ background: "var(--bg-page-alt)" }}>
            <p className="text-muted text-xs text-center">
              This article is for informational purposes only and does not constitute legal advice.
              Consult a licensed immigration attorney for advice specific to your situation.
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
