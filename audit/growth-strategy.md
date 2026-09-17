# DueVisa — Growth Strategy & User Acquisition

**Prepared:** 2026-09-17
**For:** Solo founder (based in India, targeting US customers)
**Stage (per founder):** Live; some free signups, few/no paying users
**Companion docs:** `audit/seo-strategy.md`, `audit/master-issue-backlog.md`

> **Evidence policy.** Government population/rule figures are cited and VERIFIED. Competitor pricing and app-store user numbers came from search snippets (the research environment's egress proxy blocked direct competitor/app-store page loads) — treat them as **leads to confirm**, not facts. Conversion rates and revenue projections in the financial model are **explicitly labeled assumptions**, not industry benchmarks or guarantees. Nothing here is legal advice; items needing an attorney are flagged.

---

## 1. Executive Summary

DueVisa is a well-built product in a category that just got more valuable and more crowded at the same time.

**The market reality (verified):**
- The deadline-sensitive audience is large: ~**1.58M** active F-1/M-1 students, ~**583K** authorized-to-work H-1B holders, ~**12.8M** green-card holders, plus a hard-to-size H-4 EAD / AOS-EAD layer ([SEVP 2024](https://www.ice.gov/doclib/sevis/btn/25_0605_2024-sevis-btn.pdf); [USCIS H-1B](https://www.uscis.gov/sites/default/files/document/reports/USCIS%20H-1B%20Authorized%20to%20Work%20Report.pdf); [DHS LPR 2024](https://ohss.dhs.gov/sites/default/files/2024-11/2024_1108_ohss_lawful_permenent_resident_population_estimate_2024_and_revised_2023.pdf)). ~74% of H-1B holders are Indian-origin — matching the founder's network.
- A **regulatory tailwind**: USCIS ended the 540-day EAD auto-extension for renewals filed on/after Oct 30, 2025 ([Federal Register](https://www.federalregister.gov/documents/2025/10/30/2025-19702/removal-of-the-automatic-extension-of-employment-authorization-documents)). Filing late now means no work authorization — sharply raising the value of a reminder tool.

**The competitive reality:**
- The trusted incumbents (Lawfully, Trackitt, myUSCIS, the "2M-user" case trackers) solve **case status**, not **document expiry** — a different job. DueVisa's real competition is (a) the free status quo (myUSCIS alerts + Google Calendar) and (b) a **crowded 2025–2026 cluster of near-identical expiry trackers** (ImmiHub, ImmiTrail, KeepValid, VisaEase Pro, MyImmiJourney) with no evident moat.
- **The whitespace no one owns: connecting "your date → the right action → the official rule."** DueVisa has already built the "rule" layer (17 blog articles + 3 calculators). Wired into the product, that is the differentiator.

**The honest problem.** At this stage the bottleneck is **not traffic — it's trust and conversion.** The site currently undercuts its own credibility with disclosed-fake testimonials, a placeholder founder, an unbacked "1 in 4" stat, and an aspirational "attorney connect in 24 hours" promise the founder has confirmed is not built. For an audience that is scam-sensitive and handing over immigration data, those are the first things to fix — before spending a rupee on acquisition.

**The plan in one line:** Fix trust → instrument the funnel → win F-1/OPT students into the free tier for reach → convert H-1B/H-4 households to Pro around layoffs and EAD renewals → ride the March lottery and May–Aug OPT peaks with the content engine already built.

**Willingness-to-pay caveat (heeded throughout):** deadline tracking alone is a "nice to have" that competes with free. The paid conversion case rests on (1) *acute* deadlines (layoff grace period, EAD-with-no-auto-extension, I-751 window), (2) *households* (two+ clocks), and (3) *trust*. Where those three don't hold, expect free-tier behavior, not revenue.

---

## 2. Current Product & Market Assessment

### 2a. What exists today (verified from the codebase — this is what's deployed)
- **Core:** document deadline tracking (H-1B/I-797, EAD, I-94, passport, green card, F-1/OPT + more), dashboard with color-coded countdown, family tracking, 5-stage email reminders (180/90/60/30/7d).
- **Free tools:** on-page EAD calculator + `/ead-renewal-calculator`, and (new) `/stem-opt-calculator`, `/i751-calculator`.
- **Content:** 17 SEO articles across EAD / H-1B / I-94 / F-1 / Green Card clusters with schema markup.
- **Pricing:** Free ($0, 3 docs, 30 & 7-day reminders) · Pro ($9/mo or $79/yr) · Team ($29/mo). Founding Member: **$4/mo for life, first 100**. Payments via LemonSqueezy.
- **Reminders:** Resend, daily Vercel cron.

### 2b. What's working
- Strong, loss-framed homepage and a genuinely good "with/without/consequences" comparison.
- Free tools are the correct top-of-funnel — they answer the exact query and require no account.
- Cheap, impulse-friendly pricing with a scarcity lever (Founding Member).
- A content library most look-alike competitors don't have.

### 2c. What's not working (prioritized: impact × effort × confidence)

| # | Problem | Impact | Effort | Confidence | Priority |
|---|---------|--------|--------|------------|----------|
| 1 | **Stale EAD "540-day" content** now factually wrong post-Oct 30 2025 rule | High (credibility/liability + missed tailwind) | Low | High | **P0** |
| 2 | **Disclosed-fake testimonials** ("Illustrative example") | High (trust) | Low | High | **P0** |
| 3 | **"Attorney connect in 24h"** advertised but not built (founder-confirmed) | High (trust/compliance) | Low | High | **P0** |
| 4 | **No analytics** — funnel is unmeasurable | High (blocks all experiments) | Low | High | **P0** |
| 5 | **Placeholder founder** (👤, "small team") — anonymity on a sensitive vertical | High (trust) | Med | High | **P1** |
| 6 | **Unverified "1 in 4" stat** from "a DueVisa survey" | Med (credibility) | Low | High | **P1** |
| 7 | **Thin privacy/security treatment** (1 FAQ line) for a data-sensitive audience | High (conversion) | Med | Med | **P1** |
| 8 | **Free tier may be too generous** for its own conversion (see §8) | Med (revenue) | Low | Med | **P2** |
| 9 | Calculators not in nav / weak internal linking | Med (acquisition) | Low | High | **P2** |

**P0 #1–4 are same-day fixes and gate everything else.**

### 2d. Missing information (materially affects recommendations)
Because this is early-stage, these numbers don't exist yet — and their absence is *why* Phase 1 is instrumentation, not spend:
- Current monthly visitors and traffic sources.
- Signup conversion, activation rate (≥1 document added), reminder-enabled rate.
- Free→paid conversion and current MRR/churn.
- Marketing budget and weekly founder hours available.

Every projection in §9 is scenario-based for this reason. Fill these in after 30 days of analytics and the model becomes real.

---

## 3. Ideal Customer Profiles

Ranked by revenue potential, not volume.

### ICP-1 — H-1B professional + H-4 spouse household *(primary paid ICP)*
- **Who:** Indian-origin tech/professional worker, 27–40, dual-clock household (their H-1B + I-94 + spouse's H-4 EAD + kids' H-4 + passports). ~583K H-1B workers; ~74% Indian.
- **Urgent problems:** 60-day grace period after layoff (non-extendable); H-4 EAD lapse now catastrophic with no auto-extension; multiple expiries across the family.
- **Why they'd pay $9/mo:** high income, high stakes, tech-literate, already buy services; the household angle justifies Pro's 5 family members outright.
- **Trigger events:** layoff, EAD renewal, H-1B extension, new baby (add H-4), March lottery.

### ICP-2 — F-1 student → OPT/STEM OPT *(primary free-tier / growth ICP)*
- **Who:** International student, 20–28. ~1.58M students; ~194K OPT + ~95K STEM OPT issued in 2024, both growing fast.
- **Urgent problems:** 90-day OPT application window, 90/150-day unemployment limits (miss = SEVIS termination), STEM filing window, I-20 dates.
- **Why free, not paid (mostly):** low WTP as students — but huge volume, highly networked (campus/Telegram/WhatsApp/Discord), and they *become* ICP-1 in 1–3 years. **Acquire now, monetize later.**
- **Trigger events:** graduation (May–Aug), STEM filing, job loss during OPT.

### ICP-3 — Conditional green card (I-751) & AOS-EAD holders *(secondary paid)*
- **Who:** Marriage-based conditional residents (90-day I-751 window) and adjustment-of-status applicants juggling EAD/AP renewals.
- **WTP:** moderate; real deadline pain, less price-sensitive than students.

### Anti-personas (don't build/market for these now)
- Attorneys/firms (that's the B2B Team lane — keep it inbound-only, don't chase).
- Family/humanitarian immigrants (served by other tools; not DueVisa's deadline profile).

---

## 4. Competitor Analysis

*(Pricing/user figures below are unverified search-snippet leads — confirm before using in any deck.)*

### Category A — Direct: expiry/deadline trackers (the crowd)
Near-identical to DueVisa, all small and new (2025–2026), **no evident moat:**
- **ImmiHub** (immihub.ai) — H-1B doc vault + 180/90-day reminders; free beta 2026. Closest look-alike.
- **ImmiTrail** (immitrail.com) — status timeline + reminders + scenario planning; H-1B/F-1/OPT/GC.
- **KeepValid** (keepvalid.net) — expat doc-expiry, push+email escalation; global (not US-specific).
- **VisaEase Pro** (Google Play) — countdown + OCR scan + "AI reminders"; Android.
- **MyImmiJourney** (App Store) — USCIS status + doc-wallet expiry alerts (hybrid).
- Thinner: RenewalKit, VISA Checker, NeuVault, traveldocumentvault.com.

### Category B — Case-status trackers (adjacent, trusted, NOT the same job)
- **Lawfully** — USCIS/NVC case tracker + predictions; large install base; ~$11/mo (old, unverified). **Does status, not expiry.**
- **Trackitt** — community timelines (PERM/I-140/I-485/EAD/I-751), heavily Indian EB-backlog. Closest incumbent *behavior*; free; no reminder engine.
- **"Case Tracker for USCIS/NVC"** — snippet claims "2M users" (unverified) — but for **case status**, signaling demand concentrates there.
- **myUSCIS** (official, free) — case-status email/text alerts only.

### Category C — Attorney practice management (B2B, not consumer)
- **Docketwise** (~$69–$119/user/mo, unverified), **INSZoom/Mitratech** (enterprise, unpublished, multi-year contracts), LawLogix, eimmigration. Relevant only as the Team-tier's distant comparison.

### Category D — DIY self-filing (owns immigrant SEO, different job)
- **CitizenPath** (from $79 + fees), **SimpleCitizen** (~$249+), **Boundless** (naturalization from $699; marriage GC ~$1,349). Sell *filing*, not tracking — but dominate the SEO real estate DueVisa competes in, and are potential referral partners.

### Category E — Free status quo (the real enemy)
- **myUSCIS + CBP I-94 + Google Calendar + Reddit.** $0 and "good enough." DueVisa must beat this on (1) reminders they *don't* send (document expiry ≠ case status), and (2) setup friction.

### Comparison
| | Job | Price (unverified) | Expiry reminders? | Audience |
|---|---|---|---|---|
| **DueVisa** | Doc-expiry tracking + reminders | Free / $9 / $29 | **Yes (core)** | Consumer |
| Look-alike cluster | Same | Free/unknown | Yes | Consumer |
| Lawfully / Trackitt / myUSCIS | Case status | ~$11/mo / free | No | Consumer |
| CitizenPath / Boundless | Filing | $79–$1,349 | No | Consumer |
| Docketwise / INSZoom | Firm case mgmt | $69+/seat / enterprise | For firms' clients | B2B |

---

## 5. Positioning & Differentiation

**Category line:** DueVisa is not a case-status app and not a filing service. It's the **deadline safety layer** for your whole immigration life.

**Positioning statement:**
> *For immigrants and their families managing US visa deadlines, DueVisa is the one place that tracks every document's expiry and tells you exactly when — and what — to file, months before it becomes a crisis. Unlike case-status apps and Google Calendar, DueVisa knows immigration law: it auto-calculates your filing windows and cites the rule.*

**Three defensible differentiators (against the look-alike cluster):**
1. **Date → Action → Rule.** Every reminder links to the specific action and official citation (you already wrote the content — wire it in). No competitor does this for the individual.
2. **Trust & privacy, loudly.** Named founder, real security page, "we're not a law firm, we never sell your data." Only one competitor (RenewalKit) even gestures at privacy — this lane is open.
3. **US-rule accuracy, kept current.** The Oct 2025 EAD change is the proof point: be the tool that updated within days while competitors show stale "540-day" info.

**Messaging wedge for the next 12 months:** *"The 540-day EAD safety net is gone. Now the only thing standing between you and a work gap is filing on time."*

---

## 6. Prioritized User Acquisition Channels

Ranked by fit for a solo, low-budget, India-based founder targeting the US. **Do them in this order; don't parallelize more than two.**

1. **SEO + free tools (highest ROI, already underway)** — compounding, timezone-agnostic, plays to the content already built. §7.
2. **Community participation (Reddit/Trackitt/VisaJourney/Blind)** — high-intent, $0, but rules-strict; be a helper, not a promoter. §6a.
3. **Creator/newsletter partnerships (AM22Tech, Aparna's Substack, Yudi J)** — borrows trust the founder can't yet manufacture solo. §6b.
4. **Google Search Ads (small, high-intent, later)** — only after conversion is proven; §6c. Not before.
5. **Attorney/campus partnerships (slow burn)** — credibility + distribution; pilot structure in §6d.

### 6a. Reddit & communities — participation without spam
**Rules-first stance (verified):** r/immigration (~260K), r/h1b (~137K), r/USCIS, r/f1visa all remove overt self-promotion. Blind (12M+ pros, "Work Visa" channel) is promo-hostile. Trackitt and VisaJourney (100K+) are deadline-culture forums — the most natural fit.

**Method:** Build a helpful account over 30–60 days *before* ever linking DueVisa. Answer deadline questions with genuinely useful, cited answers (your blog is the source material). Link the **free calculator** (not the paywall) only when it directly answers the question, and only where rules allow. Add a modest flair/signature where permitted. Do AMAs only after establishing a track record, ideally with a mod's blessing.

**10 discussion topics + helpful angle:**
1. r/h1b — "Laid off on H-1B — how the 60-day grace period actually works" → cite grace-period rule; link `/blog/h1b-grace-period-after-layoff`.
2. r/immigration — "PSA: the 540-day EAD auto-extension ended Oct 30, 2025 — what it means" → the tailwind; link EAD content once updated.
3. r/f1visa — "OPT 90-day window explained + a free date calculator" → `/stem-opt-calculator`.
4. r/USCIS — "I-751 90-day window: don't file too early" → `/i751-calculator`.
5. r/h1b — "How I track my whole family's visa dates in one place" (experience post, not ad).
6. r/immigration — "I-94 vs visa stamp vs I-797 — which date actually controls your stay" → I-94 article.
7. r/f1visa — "STEM OPT reporting deadlines everyone forgets (the 6-month validations)."
8. r/immigrationlaw — answer technical AC21/cap-gap questions with citations (credibility building).
9. VisaJourney — participate in EAD/I-751 timeline threads; share the calculator as a utility.
10. Trackitt — engage EB-backlog threads on H-1B extensions beyond 6 years (AC21) → link AC21 article.

**Early-user + feedback loop:** DM 10–20 engaged commenters offering free Pro for feedback; run a 5-question survey; use quotes (with permission) to replace the fake testimonials.

### 6b. Partnerships — creators, newsletters
**Best-fit targets (borrow trust):**
- **AM22Tech / Anil Gupta** — H-1B/H-4/EAD/F-1 tools + audience; sharpest single fit. Offer: co-branded calculators, affiliate/referral, or a "recommended tool" placement.
- **Aparna Vashisht-Rota — "US Immigration F1 News" Substack** — newsletter sponsorship / sponsored explainer on the EAD rule change.
- **The New Immigrant Insider (Substack)** — sponsorship.
- **Yudi J** — desi "life in USA" reach for top-of-funnel awareness.
- Attorney creators (Erika Jurado-Graham ~540K, Fiona McEntee) — broader reach but ethics-constrained; pursue "tool we recommend," not paid promo.

**What to offer:** (1) affiliate/referral revenue share; (2) free co-branded calculator embed; (3) exclusive data/explainer they can publish. **Structure a pilot:** one sponsored piece + a tracked referral link + a 30-day conversion readout before any ongoing deal. Cost should be performance-based given budget.

### 6c. Paid acquisition — small, high-intent, LATER
**Do not run ads until conversion + retention are proven (founder has few/no payers today).** When ready:
- **Google Search only** (not Display/social first). Bid on high-intent, low-competition long-tail — *not* head terms law firms dominate.
- Seed keywords: "ead renewal calculator," "i-751 filing window," "stem opt deadline," "h1b grace period after layoff," "when to file ead renewal," "i-94 expiration checker." Route each to the **matching calculator/article**, not the homepage.
- **Test budget:** $150–$300 total over 2–3 weeks, one ad group per intent, exact/phrase match. Kill any keyword that doesn't produce a signup at target CAC (see §9). This is a *learning* budget, not a growth budget.
- India-based note: use a US-targeted campaign, USD billing, and ensure LemonSqueezy tax/geo settings are correct.

### 6d. Attorney & campus partnerships (slow burn)
- **Solo/small immigration attorneys:** offer a free "client deadline tracker" they can recommend; you get credibility + referrals, they get a retention tool. Pilot: 3–5 attorneys, co-branded landing page, track referred signups for 60 days.
- **University international-student offices (DSOs):** offer the free tier + calculators as a student resource around OPT season. Long sales cycle; start conversations in spring.
- **Attorney review needed** before any co-marketing that could imply legal advice.

---

## 7. SEO Strategy & 20 Content Ideas

**Strategy recap (see `audit/seo-strategy.md` for the full map):** long-tail deadline/renewal intent + tool pages + internal linking into the calculators; beat thin forum results and stale law-firm pages on clarity, tables, and FAQ schema. **New strategic overlay:** the Oct 2025 EAD rule change resets a whole content sub-cluster and is a freshness/authority opportunity — competitors' EAD pages are now wrong.

**Convert organic → activated:** every article ends in a matching calculator CTA (no login) → calculator result page offers "save & get reminded" (signup) → onboarding adds the first document. The tool *is* the conversion mechanism.

**20 content ideas** (target keyword → intent; all verify against a real keyword tool before committing — no invented volumes):

| # | Working title | Target keyword | Intent |
|---|---|---|---|
| 1 | The 540-Day EAD Auto-Extension Ended — What To Do Now (2026) | "ead automatic extension ended" | Info, urgent |
| 2 | EAD Renewal After the 2025 Rule Change: New Timeline | "ead renewal 2026 rule change" | Info |
| 3 | Can I Work While My EAD Renewal Is Pending? (2026 Update) | "can i work ead renewal pending" | Info, high-intent |
| 4 | H-1B Amendment: When a Job Change Requires One | "h1b amendment when required" | Info |
| 5 | H-1B to Green Card Timeline (PERM → I-140 → I-485) | "h1b to green card timeline" | Info |
| 6 | I-90 Green Card Renewal Checklist & Window | "i-90 renewal checklist" | Info + tool |
| 7 | N-400 Citizenship Eligibility: The 90-Day Early Filing Rule | "n-400 90 day early filing" | Info + calculator |
| 8 | Re-Entry Permit: When to File Before Traveling | "re-entry permit timeline" | Info |
| 9 | Advance Parole While AOS Pending: Timing & Risks | "advance parole processing time" | Info |
| 10 | F-1 60-Day Grace Period Explained | "f1 grace period 60 days" | Info |
| 11 | Day-1 CPT Risks: What USCIS Actually Says | "day 1 cpt risk" | Info |
| 12 | OPT Unemployment Days Tracker & 90/150 Rule | "opt unemployment days" | Info + calculator |
| 13 | H-4 EAD After the Auto-Extension Ended | "h4 ead no automatic extension" | Info, urgent |
| 14 | Passport Renewal Before Your Visa Stamp Expires (6-Month Rule) | "passport validity us visa" | Info |
| 15 | I-94 Expired but Visa Valid — What It Means | "i-94 expired visa valid" | Info |
| 16 | Unlawful Presence vs. Out of Status | "unlawful presence vs out of status" | Info |
| 17 | Duration of Status (D/S) Explained | "d/s status meaning" | Info |
| 18 | H-1B Extension Beyond 6 Years: Recapturing Time Abroad | "h1b recapture time" | Info |
| 19 | EAD RFE: Common Reasons and How to Respond | "ead rfe reasons" | Info |
| 20 | Immigration Deadlines Every H-1B Family Should Track | "h1b family document checklist" | Info + product |

**Programmatic (after indexation proves out):** `ead-expires-in-{n}-months`, `{visa}-expires-in-{n}-days` — but only with genuinely differentiated per-page content (real checklist + citation), never a swapped number, to avoid Helpful-Content penalties.

**New calculators worth building (commercial intent, low competition):** N-400 eligibility date, OPT unemployment-days counter, I-94 expiry checker, H-1B 6-year-max calculator. Each is a ranking asset + a signup surface.

---

## 8. Conversion & Retention Improvements

### End-to-end journey
`Visitor → Free tool → Signup → First document added → Reminder enabled → Paid → Referral`

| Stage | User needs | Friction | Fix | Metric |
|-------|-----------|----------|-----|--------|
| **Visitor** | Trust it's real & safe | Fake testimonials, anon founder, stale EAD info | P0/P1 trust fixes (§2c) | Bounce %, tool-start rate |
| **Free tool** | An instant answer | — (this works) | Add "save this & get reminded" CTA on result | Tool→signup % |
| **Signup** | Fast, low-commitment | Any friction kills it | Email-only, no CC (already true); social login | Visitor→signup % |
| **First doc** | To feel it's worth it | Blank dashboard, unsure what to enter | Guided "add your first document" with type picker + auto-calculated window; prefill from the calculator they just used | **Activation % (≥1 doc)** |
| **Reminder on** | Confidence it'll fire | Unsure reminders work | Send an immediate "you're protected — first reminder scheduled for [date]" email | Reminder-enabled % |
| **Paid** | A reason to exceed free | Free tier covers most needs | Gate on *value moments*: 4th document, family member, 180-day reminder, SMS (§ below) | **Free→paid %** |
| **Referral** | To help peers | No mechanism | "Invite family — they're on your visa timeline too"; referral = 1 free Pro month | Referral rate |

### Free tier: likely too generous for its own good
Free includes 3 documents + 30 & 7-day reminders. For a single H-1B holder that may be *enough forever*. Consider (test, don't assume): free = **1–2 documents and only the 30-day reminder**, making the **180/90/60-day early warnings** (the entire value prop — "know months in advance") a Pro feature. This aligns the paywall with the promise. **Measure free→paid before and after.**

### Lifecycle email sequences (Resend already wired)
1. **Welcome (Day 0):** "You're protected. Here's your timeline." + add-second-document nudge.
2. **Activation (Day 1–3) if 0 docs:** "Add your first date in 60 seconds" + link.
3. **Household nudge (Day 3):** "Do you have a spouse or kids on dependent status? Add them."
4. **Value moment → upgrade:** when a 4th doc or family member is attempted, or a 180-day reminder would fire, surface Pro + Founding Member scarcity.
5. **Pre-deadline urgency:** the reminders themselves — make each cite the action + rule (differentiation).
6. **Win-back on cancel:** "Your data is kept 30 days" + one-click resubscribe.

### Retention
- **Reminders are the retention engine** — but they're infrequent per user, so the product feels dormant between deadlines. Fix with periodic "immigration health check" emails (quarterly "here's your timeline") and policy-change alerts (e.g., the EAD rule) that prove ongoing value.
- **Household accounts churn less** (more clocks, more stickiness) — push family adds hard.

### Sensitivity guardrails (immigration/identity data)
- Minimize data collected (dates, not document scans, unless storage is a paid, encrypted feature clearly explained).
- Never use immigration status for ad targeting; keep PII out of analytics events (§11).
- Keep the "we're not a law firm / not legal advice" line prominent. **Attorney review** for any copy that could be read as legal advice.

---

## 9. Financial Model (assumptions, not benchmarks)

**Real pricing:** Pro $9/mo or $79/yr ($6.58/mo); Founding Member $4/mo (first 100); Team $29/mo.

**Blended ARPU assumption:** with a mix of monthly ($9), annual ($6.58/mo effective), and founding ($4), assume **~$7/mo blended per paying user** early on (founding members drag it down; revisit as they fill). *This is an assumption.*

**Payers needed for MRR targets (at ~$7 blended):**

| MRR target | Paying users (~$7) | At pure $9/mo |
|---|---|---|
| **$1,000** | ~145 | ~112 |
| **$5,000** | ~715 | ~556 |
| **$10,000** | ~1,430 | ~1,112 |

**Funnel scenarios** — *all rates are assumptions for modeling, NOT guarantees or industry benchmarks; replace with your real numbers after 30 days of analytics.*

| Assumption | Conservative | Base | Growth |
|---|---|---|---|
| Visitor → signup | 2% | 3.5% | 5% |
| Signup → activated (≥1 doc) | 40% | 55% | 70% |
| Activated → paid | 1.5% | 3% | 5% |
| Net: visitor → paid | 0.012% | 0.058% | 0.175% |
| Monthly churn | 8% | 5% | 3% |

**Monthly visitors required to *net-add* ~145 payers (for ~$1,000 MRR), before churn:**
- Conservative: ~1.2M visitors — **not realistic solo; means the funnel must improve, not traffic scale.**
- Base: ~250,000 visitors.
- Growth: ~83,000 visitors.

**Read this correctly:** the lesson isn't "get a million visitors." It's that **at low conversion, traffic alone can't get you there** — so the leverage is (1) raising activated→paid via the trust + paywall-alignment fixes, and (2) buying *high-intent* traffic (calculator searchers convert far above 3.5%) rather than broad traffic. A visitor searching "i-751 filing window" behaves nothing like a cold visitor.

**Path to $1,000 MRR (most realistic sequence):**
1. Trust fixes + paywall alignment lift activated→paid toward the Base/Growth end.
2. SEO + community drive **high-intent** traffic (calculator/article searchers).
3. ~145 payers is reachable with **low-thousands of high-intent monthly visitors** at Growth-like conversion — not millions of cold ones.
4. Founding Member scarcity pulls early fence-sitters over the line.

**$5k and $10k:** require either (a) a repeatable paid channel with **CAC < ~$25** (so LTV at ~$7 ARPU and ~5% churn ≈ $140 supports it), or (b) a partnership/referral flywheel. Do not scale spend until CAC and churn are measured and CAC < LTV/3.

**CAC guardrail:** target blended CAC **< $25** early (LTV ≈ ARPU ÷ churn ≈ $7 ÷ 0.05 ≈ $140; keep CAC under a third). Any channel above that gets cut.

---

## 10. Detailed 90-Day Execution Roadmap

Assumes a solo founder with limited hours/budget. **Decision criteria are stated so you kill losers fast.**

### Days 1–30 — Validation & conversion (fix the leaks before pouring water in)

**Week 1 — Trust & truth (P0)**
- Tasks: Update/replace the EAD "540-day" article + calculator copy for the Oct 2025 rule; remove or reword "attorney connect 24h"; remove disclosed-fake testimonials (leave placeholders empty or use a single honest "new — be an early user" line); remove/soften the unverified "1 in 4" stat.
- Deliverables: corrected content live; no false claims on site.
- Hours: 6–8. Tools: repo/Vercel.
- Success metric: zero unverifiable claims; EAD content accurate.
- Decision: n/a (non-negotiable).

**Week 2 — Instrumentation (P0)**
- Tasks: Install **PostHog** (generous free tier, product analytics + funnels + session replay) or GA4; define events (§11); verify funnel captures visitor→signup→activation→paid.
- Deliverables: working funnel dashboard.
- Hours: 6–10. Tools: PostHog, LemonSqueezy webhooks (already built).
- Success metric: every funnel stage has live data.
- Decision: if events don't fire correctly, fix before Week 3 — everything downstream depends on this.

**Week 3 — Founder trust + privacy**
- Tasks: Real founder name/photo/story on `/about` + homepage; expand security/privacy into a prominent trust block; add "not a law firm" clarity.
- Deliverables: credible About + trust section.
- Hours: 5–7.
- Success metric: baseline bounce/tool-start rate recorded for later comparison.

**Week 4 — Activation + first users**
- Tasks: Guided first-document flow (prefill from calculator); "you're protected" confirmation email; DM 10–20 engaged community members offering free Pro for feedback; run 5-question survey.
- Deliverables: improved onboarding; 10+ user conversations; 3+ real testimonials (with permission).
- Hours: 8–10.
- Success metric: activation % (≥1 doc) baseline; ≥3 usable quotes.
- Decision: if activation < ~40%, onboarding is the problem — fix before acquisition.

### Days 31–60 — Acquisition experiments (two channels max)

**Week 5 — SEO freshness sprint**
- Tasks: Publish ideas #1, #3, #13 (the EAD-rule cluster — timely, competitors are stale); wire calculators into nav + reciprocal links from tool pages → articles.
- Deliverables: 3 articles; internal linking closed.
- Hours: 8. Success metric: indexation + impressions in Search Console.

**Week 6 — Community presence**
- Tasks: Daily helpful answers on r/h1b, r/f1visa, r/USCIS, Trackitt, VisaJourney (no promo yet); share calculators only where rules allow and directly relevant.
- Deliverables: established accounts; referral traffic to calculators.
- Hours: 5–7/wk ongoing. Success metric: community → calculator sessions in PostHog.
- Decision: if after 3 weeks community drives < ~30 sessions/wk, reduce effort or change subs.

**Week 7 — First partnership pilot**
- Tasks: Pitch AM22Tech + Aparna's Substack; propose one sponsored explainer on the EAD change + tracked referral link.
- Deliverables: 1 pilot live or scheduled.
- Hours: 5. Success metric: referred signups per tracked link.
- Decision: continue only if pilot CAC < $25.

**Week 8 — Paid search micro-test**
- Tasks: $150–$300 Google Search test, one ad group per high-intent keyword → matching calculator.
- Deliverables: CAC + conversion per keyword.
- Hours: 6. Success metric: cost per signup, cost per activation.
- Decision: keep only keywords with signup CAC < ~$15 (to hit paid CAC < $25 after conversion); kill the rest.

### Days 61–90 — Scale what works (double down, cut the rest)

**Week 9 — Channel review & concentration**
- Tasks: Rank all channels by CAC and activation; **stop the bottom half**; reallocate hours to the top 1–2.
- Deliverables: one-page channel scorecard.
- Hours: 4. Decision: formal keep/kill per channel.

**Week 10 — Paywall & pricing test**
- Tasks: A/B the tighter free tier (1–2 docs + 30-day only vs current 3 docs); measure free→paid; time a Founding-Member push to the March/OPT calendar if near.
- Deliverables: pricing experiment result.
- Hours: 6. Success metric: free→paid delta. Decision: adopt whichever tier maximizes revenue without tanking activation.

**Week 11 — Referral + household loop**
- Tasks: Ship "invite your family" referral (1 free Pro month); push household adds in lifecycle emails.
- Deliverables: referral feature live.
- Hours: 8. Success metric: referral rate, invites/user.

**Week 12 — Consolidate & plan next quarter**
- Tasks: Full funnel readout vs §9 assumptions; rewrite the model with real numbers; pick the single best channel to scale in Q2; seasonal prep (if March lottery / OPT season approaching, load content + creator deals now).
- Deliverables: real financial model; Q2 plan.
- Hours: 6. Decision: scale spend only if CAC < LTV/3 and churn < ~6%.

**Time budget:** ~8–12 focused hours/week. **Cash budget for 90 days:** < $500 (analytics free; ~$300 paid-search test; rest for a small creator pilot).

---

## 11. Analytics Dashboard

**Tool:** **PostHog** (free tier: product analytics, funnels, session replay, feature flags for A/B) — best fit for a small SaaS and privacy-configurable. Alternative: GA4 (traffic) + LemonSqueezy (revenue) + a spreadsheet. Add **Google Search Console** (SEO) day one.

**Events to instrument:**
- `page_view` (with `channel`/UTM), `tool_started`, `tool_completed` (calculator used), `signup_started`, `signup_completed`, `document_added` (with `type`), `reminder_enabled`, `family_member_added`, `upgrade_viewed`, `checkout_started`, `checkout_completed` (from LemonSqueezy webhook), `subscription_canceled`, `referral_sent`, `referral_converted`.
- **Privacy rule:** never attach immigration status, document numbers, names, or dates to events. Use anonymized user IDs. This audience's data is sensitive — analytics must be PII-free.

**Core reports/metrics:**
| Report | Metric |
|---|---|
| Acquisition | Sessions by channel (UTM), tool-start rate by channel |
| Landing/tool | Tool → signup conversion per page |
| Signup & activation | Visitor→signup %, signup→activation % (≥1 doc) |
| Engagement | Avg documents/user, reminder-enabled % |
| Monetization | Upgrade-viewed→paid %, free→paid %, MRR, ARPU, Founding-Member slots used |
| Retention/churn | Monthly churn %, active-account retention curve |
| Referral | Invites/user, referral conversion % |

**North-star metric:** **activated users protected** (users with ≥1 document + reminders on) — it's the leading indicator of both value delivered and future revenue.

---

## 12. The Five Highest-Priority Actions (do these first)

1. **Fix the EAD content for the Oct 2025 rule change — today.** Your `/blog/ead-540-day-automatic-extension` and calculator "540-day" copy are now wrong ([Federal Register](https://www.federalregister.gov/documents/2025/10/30/2025-19702/removal-of-the-automatic-extension-of-employment-authorization-documents)). Correct it, then turn the change into your lead marketing wedge. *(Credibility + liability + the biggest current tailwind, all in one.)*
2. **Strip every unverifiable/false claim.** Remove the "Illustrative example" testimonials, the unbacked "1 in 4" stat, and the not-built "attorney connect in 24h" promise. Replace with an honest early-stage framing. *(Trust is your #1 conversion blocker for a scam-sensitive audience.)*
3. **Install analytics (PostHog) + Search Console.** You currently can't measure a single funnel step — which means you can't run any experiment below with confidence. *(Gates everything.)*
4. **Put a real, named founder and a loud privacy/security story on the site.** Anonymity on an immigration-data product kills conversion. A face + "we never sell your data / we're not a law firm" directly answers the objection. *(Highest-leverage trust fix after #2.)*
5. **Align the paywall with the promise: make the early-warning reminders (180/90/60-day) the Pro value, and go win F-1/OPT students into the free tier while converting H-1B/H-4 households to Pro.** Test a tighter free tier, wire calculators into nav + community answers, and time pushes to the March lottery and May–Aug OPT peaks. *(Turns the audience insight into revenue.)*

---

*Everything in this document that is a projection or a conversion rate is an assumption for planning, clearly labeled — not a benchmark or a guarantee. Competitor pricing/user figures are unverified search leads. Immigration rules change; verify on uscis.gov and route users to licensed attorneys for advice. Attorney review is recommended before any co-marketing that could be read as legal advice.*
