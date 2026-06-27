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
  "how-long-does-ead-renewal-take": [
    { label: "EAD Renewal Calculator", href: "/ead-renewal-calculator", desc: "See your exact 180-day filing window in seconds." },
    { label: "EAD Renewal Reminder", href: "/ead-reminder", desc: "Get reminded 180 days before your EAD expires — automatically." },
  ],
  "h4-ead-renewal-guide": [
    { label: "EAD Renewal Reminder", href: "/ead-reminder", desc: "Track your H-4 EAD and H-4 I-94 together — never let either lapse." },
    { label: "H-1B Deadline Tracker", href: "/h1b-renewal-tracker", desc: "Your H-4 EAD depends on your spouse's H-1B — track both in one place." },
  ],
  "ead-540-day-automatic-extension": [
    { label: "EAD Renewal Calculator", href: "/ead-renewal-calculator", desc: "Find out exactly when to file to qualify for the auto-extension." },
    { label: "EAD Renewal Reminder", href: "/ead-reminder", desc: "File before expiry — DueVisa reminds you 180 days out." },
  ],
  "h1b-grace-period-after-layoff": [
    { label: "H-1B Deadline Tracker", href: "/h1b-renewal-tracker", desc: "Track your 60-day grace period countdown and every H-1B deadline automatically." },
    { label: "Start tracking free", href: "/signup", desc: "DueVisa tracks your grace period end date and sends reminders at 30, 14, and 7 days." },
  ],
  "how-to-check-your-i94": [
    { label: "H-1B Deadline Tracker", href: "/h1b-renewal-tracker", desc: "Track your I-94 authorized stay date with automatic reminders." },
    { label: "Start tracking free", href: "/signup", desc: "Add your I-94 date once — DueVisa reminds you at 180, 90, 60, 30, and 7 days." },
  ],
  "opt-application-timeline": [
    { label: "F-1 OPT Tracker", href: "/f1-opt-tracker", desc: "Track your OPT EAD, STEM OPT, and I-20 deadlines in one place." },
    { label: "Start tracking free", href: "/signup", desc: "DueVisa reminds you when to open your 90-day OPT window and every deadline after." },
  ],
  "stem-opt-extension-guide": [
    { label: "F-1 OPT Tracker", href: "/f1-opt-tracker", desc: "Track your STEM OPT filing window and 24-month extension end date automatically." },
    { label: "Start tracking free", href: "/signup", desc: "DueVisa reminds you when your STEM OPT filing window opens — and every report deadline." },
  ],
  "i751-removal-of-conditions": [
    { label: "Green Card Renewal Tracker", href: "/green-card-renewal", desc: "Track your I-751 90-day filing window and conditional card expiry automatically." },
    { label: "Start tracking free", href: "/signup", desc: "DueVisa opens your I-751 reminder exactly 90 days before your 2-year card expires." },
  ],
  "h1b-transfer-timeline": [
    { label: "H-1B Deadline Tracker", href: "/h1b-renewal-tracker", desc: "Track your H-1B transfer receipt, approval, and I-94 dates in one place." },
    { label: "Start tracking free", href: "/signup", desc: "DueVisa tracks your current I-94 and new petition dates so nothing slips." },
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
  faqs?: { q: string; a: string }[];
}> = {
  "how-long-does-ead-renewal-take": {
    title: "EAD Processing Time in 2026: How Long Does Renewal Take?",
    description: "EAD renewal can take anywhere from 1 to 8+ months depending on your category and service center. Here's how to check your timeline and avoid a work gap.",
    date: "June 18, 2026",
    readTime: "11 min",
    category: "EAD",
    content: `
If your Employment Authorization Document (EAD) is approaching its expiry date, you are almost certainly asking the same question thousands of immigrants ask every week: how long does EAD renewal actually take?

The honest answer is that it varies enormously — and that uncertainty is exactly what makes EAD renewal so stressful. File too late and you risk a gap in work authorization that can cost you your job. File at the right time and you may never feel a thing.

This guide breaks down real EAD processing times in 2026, how to check your own case, and the single most important step that protects you from a work gap.

## Quick Answer

As of 2026, EAD renewal (Form I-765) typically takes **between 1 and 8 months** to process, depending on your eligibility category and which USCIS service center handles your case. The most reliable protection is to **file your renewal 180 days (about 6 months) before your current EAD expires** — and, for most categories, a timely-filed renewal grants an automatic extension of up to 540 days while you wait. Always confirm current processing times for your specific form category at the official USCIS processing times page.

## Why EAD Processing Times Vary So Much

There is no single "EAD processing time." USCIS processes Form I-765 across multiple service centers and lockboxes, and the time depends on several factors:

- **Your eligibility category** — the three-letter code on your EAD (for example C08 for asylum applicants, C09 for adjustment of status applicants, A12 or C19 for TPS, C26 for H-4 spouses, C03B for OPT)
- **Which service center is assigned** — workloads differ between centers
- **Whether biometrics are required** — some categories need a biometrics appointment
- **Filing method** — online filing is often slightly faster to process and confirm than paper
- **Whether your case triggers a Request for Evidence (RFE)** — any RFE adds weeks or months

Because of these variables, two people who file on the same day can receive their new cards months apart.

## Typical EAD Processing Times by Category

The ranges below are general estimates based on recent USCIS trends. **Always verify the live figure for your category at the USCIS processing times tool before relying on it** — these numbers shift month to month.

| EAD Category | Common Range (2026) |
|--------------|---------------------|
| C09 — Adjustment of status (pending green card) | 2 to 8 months |
| C08 — Asylum applicant | 1 to 6 months |
| C26 — H-4 dependent spouse | 2 to 6 months |
| C03B — F-1 STEM OPT | 2 to 5 months |
| (c)(3) — F-1 OPT (post-completion) | 1 to 4 months |
| A12 / C19 — TPS | 2 to 8 months |

The key takeaway: even the fastest categories can take a month, and the slower ones can take well over half a year. That is why the timing of when you file matters more than almost anything else.

## How to Check Your Own EAD Processing Time

You do not have to guess. USCIS publishes live data:

1. Go to the official USCIS "Check Case Processing Times" page
2. Select **Form I-765, Application for Employment Authorization**
3. Choose your **eligibility category** (use the code from your current EAD)
4. Select the **form category / service center** if prompted
5. USCIS shows the time it currently takes to process most cases, plus the date you can submit an inquiry if your case is taking longer than expected

Once you have a case receipt number (it starts with three letters such as IOE, EAC, WAC, LIN, or SRC), you can also track real-time status updates in your USCIS online account.

## The 180-Day Rule: When You Should File

Here is the rule that protects you: **file your EAD renewal 180 days before your current card expires.**

USCIS accepts EAD renewal applications up to 180 days before the expiration date printed on your current card. There are two reasons this is the smart move:

1. **Processing buffer** — with up to 8 months of possible processing time, filing 6 months early gives USCIS the runway to approve your card before the old one expires.
2. **Automatic extension eligibility** — for most renewal categories, filing **before** your EAD expires (and in the same eligibility category) qualifies you for an automatic extension of your work authorization while the renewal is pending.

Filing earlier than 180 days is not allowed and will result in rejection. Filing later than 180 days is risky. The 180-day mark is the sweet spot — not a moment you want to discover after it has already passed.

## The Automatic Extension: Your Safety Net

If you file a timely renewal, many EAD categories receive an **automatic extension of up to 540 days** beyond the expiration date on your current card. During this window, your expired EAD — combined with your Form I-797C receipt notice — can serve as proof of continued work authorization for I-9 purposes.

Important conditions generally apply:

- You must file **before** your current EAD expires
- Your renewal must be in the **same eligibility category** (with limited exceptions, such as certain C08 and C09 cross-category cases)
- Your category must be **eligible** for the automatic extension — not every category qualifies
- For dependent categories like H-4 EAD, the extension **cannot run beyond the validity of your underlying status** (more on this below)

Because eligibility rules and the length of the extension have changed over time, confirm the current terms for your category on the USCIS website before you rely on the extension.

## What Happens If There Is a Gap

If your EAD expires before your renewal is approved and you do **not** qualify for an automatic extension, you generally must **stop working** on the expiration date. Continuing to work without authorization can have serious consequences for both you and your employer, including:

- Loss of your job until the new EAD arrives
- Complications for future immigration applications
- I-9 compliance problems for your employer

This is the exact scenario the 180-day rule and the automatic extension are designed to prevent. The cost of filing early is a few hours of paperwork. The cost of filing late can be your paycheck.

## How to Speed Up (Or Avoid Slowing Down) Your EAD

You cannot pay for premium processing on most EAD categories, but you can avoid self-inflicted delays:

- **File online** when your category allows it — it reduces mailing time and data-entry errors
- **Double-check your eligibility category code** — an incorrect code is a common RFE trigger
- **Include the correct fee** (or a complete fee-waiver request if eligible) — verify the current fee on USCIS.gov before filing
- **Respond to any RFE immediately** — do not let the clock run
- **Keep your address updated** with USCIS so your card and notices reach you

## Common EAD Renewal Mistakes

1. **Waiting until 60 or 90 days before expiry to file** — by then, slower categories cannot finish in time
2. **Assuming the automatic extension applies to everyone** — confirm your category qualifies
3. **Filing in the wrong eligibility category** — triggers RFEs and delays
4. **Forgetting that the auto-extension can be capped by your underlying status** — critical for H-4 and L-2 dependents
5. **Not tracking the expiry date at all** — the single most common and most preventable mistake

## Your EAD Renewal Action Checklist

- Find the expiration date and category code on your current EAD
- Mark the date exactly 180 days before expiry — this is your file-by target
- Confirm your category's current processing time on USCIS.gov
- Confirm whether your category qualifies for the automatic extension
- Gather your documents (current EAD copy, photos, supporting evidence)
- File Form I-765 online or by mail with the correct fee
- Save your I-797C receipt notice — you may need it for I-9 proof
- Track your case status in your USCIS online account

## The Bottom Line

EAD processing time in 2026 ranges from about one month to more than eight, and you cannot control which end of that range your case lands on. What you **can** control is when you file. File 180 days before expiry, in the correct category, and you give yourself both the processing buffer and the automatic extension that keep your work authorization intact.

The hardest part is simply remembering the date — six months before an expiry that may be years away. That is precisely the problem DueVisa solves: add your EAD once, and we send you a reminder 180 days before it expires, then again at 90, 60, 30, and 7 days. Instead of tracking renewal windows in a spreadsheet, you get a nudge at exactly the right moment. Start tracking free at duevisa.com.
    `,
    faqs: [
      { q: "How long does EAD renewal take in 2026?", a: "EAD renewal (Form I-765) generally takes between 1 and 8 months depending on your eligibility category and the assigned USCIS service center. Check the live figure for your category on the official USCIS processing times page." },
      { q: "How early can I file my EAD renewal?", a: "USCIS accepts EAD renewal applications up to 180 days (about 6 months) before your current card expires. Filing earlier than 180 days results in rejection." },
      { q: "Can I work while my EAD renewal is pending?", a: "If you file a timely renewal in an eligible category, you may receive an automatic extension of up to 540 days. During that window, your expired EAD plus your I-797C receipt notice can serve as I-9 proof. If your category is not eligible, you generally must stop working when the card expires." },
      { q: "Is there premium processing for EAD?", a: "Premium processing is not available for most EAD categories. The best way to avoid delay is to file 180 days early, in the correct category, with complete documentation." },
      { q: "How do I check my EAD case status?", a: "Use your receipt number (starting with letters like IOE, EAC, WAC, LIN, or SRC) in your USCIS online account, or check the USCIS Case Status Online tool." },
      { q: "What happens if my EAD expires before renewal is approved?", a: "If you do not qualify for an automatic extension, you must stop working on the expiration date. This is why filing 180 days early and confirming your auto-extension eligibility is so important." },
    ],
  },
  "h4-ead-renewal-guide": {
    title: "H-4 EAD Renewal: The Complete 2026 Guide",
    description: "H-4 EAD is one of the most fragile work permits in US immigration. Here's how renewal works, who qualifies, and how the auto-extension is capped by your H-4 status.",
    date: "June 16, 2026",
    readTime: "12 min",
    category: "EAD",
    content: `
The H-4 EAD is a lifeline for thousands of spouses of H-1B workers — and one of the most fragile work permits in the entire US immigration system. Its rules have been litigated, threatened, and changed repeatedly, and its renewal depends on a chain of other documents that must all stay valid at the same time.

If you hold an H-4 EAD, renewing it on time is not just paperwork — it is the difference between keeping your career and being forced to stop working overnight. This guide explains exactly how H-4 EAD renewal works in 2026, who qualifies, and the one nuance that catches H-4 holders off guard every year.

## Quick Answer

To renew an H-4 EAD, you must file **Form I-765** while you hold **valid H-4 status** and while your H-1B spouse has an **approved Form I-140** (or qualifies for H-1B extension beyond the sixth year under AC21). File **180 days before expiry**. A timely renewal in the C26 category can qualify for an automatic extension of up to 540 days — but, critically, that extension **cannot run beyond the expiration date of your H-4 I-94**. Renewing your H-4 status and your H-4 EAD together is the safest approach.

## What Is an H-4 EAD?

An H-4 visa is for the dependent spouse and children of an H-1B worker. By default, H-4 status does **not** include work authorization. However, certain H-4 spouses can apply for an Employment Authorization Document (EAD) — coded **category (c)(26)** — that lets them work for any employer, start a business, and build an independent career.

The H-4 EAD is uniquely valuable because, unlike the H-1B itself, it is not tied to a single employer. But that freedom comes with fragility: the H-4 EAD exists only as long as the underlying H-1B and H-4 statuses remain valid.

## Who Qualifies for an H-4 EAD?

You are generally eligible to apply for (or renew) an H-4 EAD if **all** of the following are true:

- You are in valid **H-4 status** as the spouse of an H-1B worker
- Your H-1B spouse is the **principal beneficiary of an approved Form I-140** (Immigrant Petition for Alien Worker), **or**
- Your H-1B spouse has been granted H-1B status beyond the standard six years under sections 106(a) and (b) of AC21 (typically because a labor certification or I-140 was filed at least 365 days earlier)

Children in H-4 status are **not** eligible for an H-4 EAD — only spouses.

## The H-4 EAD Renewal Timeline

The renewal process mirrors other EADs but with extra dependencies. Here is the sequence:

### 180 Days Before Expiry: Start

USCIS accepts your renewal up to 180 days before your current H-4 EAD expires. This is your target filing window. Because H-4 EAD processing can take several months, starting here gives you the buffer you need.

### Confirm Your H-4 Status Is Valid (and Will Stay Valid)

This is the step unique to H-4 holders. Your H-4 EAD cannot extend past your H-4 I-94 expiration. If your H-4 status is expiring soon, you typically need to **extend your H-4 status at the same time** — often filed together with your spouse's H-1B extension (Form I-129) and your I-765.

### File the Right Combination of Forms

Depending on your situation, you may file:

- **Form I-765** — the EAD renewal itself (always required)
- **Form I-539** — to extend your H-4 status (if your H-4 I-94 is expiring)
- These are frequently filed **concurrently** with the H-1B spouse's **Form I-129** extension

### Track and Respond

Save your I-797C receipt notices. Respond to any RFE immediately. Monitor your case in your USCIS online account.

## The Nuance That Catches People: The Auto-Extension Cap

Here is the single most important thing to understand about H-4 EAD renewal.

Like many EAD categories, a timely-filed H-4 EAD renewal can qualify for an **automatic extension of up to 540 days**. But for H-4 holders there is a hard limit: **the automatic extension ends on the earlier of (a) the end of the extension period, or (b) the expiration date of your H-4 I-94.**

In plain English: **your H-4 EAD auto-extension cannot outlive your H-4 status.** If your H-4 I-94 expires before your new EAD is approved, your work authorization stops on that date — even if the 540-day window has not run out.

This is why H-4 spouses must think about **two deadlines at once**: the EAD expiry **and** the H-4 I-94 expiry. Renewing the EAD while letting H-4 status lapse defeats the entire purpose.

## Documents You Will Typically Need

- Completed **Form I-765** (category c26)
- Copy of your **current H-4 EAD** (front and back)
- Copy of your **H-4 approval notice / I-94**
- Evidence of your spouse's **approved I-140** or AC21-qualifying H-1B extension
- Copy of your **marriage certificate**
- Copies of your spouse's **H-1B approval notice and I-94**
- Two passport-style **photos**
- The correct **filing fee** (verify the current amount on USCIS.gov — fees and online-vs-paper pricing have changed)

## H-4 EAD Renewal Fees in 2026

The Form I-765 filing fee changed under the 2024 USCIS fee rule, and online filing is priced differently from paper filing for many categories. Rather than rely on an outdated number, **check the current Form I-765 fee on the official USCIS fee schedule before you file.** Filing with the wrong fee is a common cause of rejection.

## Common H-4 EAD Renewal Mistakes

1. **Renewing the EAD but letting H-4 status lapse** — the auto-extension dies with your H-4 I-94
2. **Assuming the I-140 approval carries forever** — keep the evidence current and on file
3. **Filing late** — H-4 EAD processing can take months; the 180-day window exists for a reason
4. **Not filing I-539 when H-4 status is also expiring** — leaves a status gap
5. **Forgetting children's H-4 status** — they are not EAD-eligible but their status still needs tracking

## Will the H-4 EAD Program Continue?

The H-4 EAD program has faced repeated legal and political challenges over the years, and its future has been questioned more than once. As of 2026 it remains in effect, but the history of the program is a strong argument for **renewing early** and keeping your documentation airtight. Policy can change; a timely, complete filing is your best protection regardless of the political climate.

## Your H-4 EAD Renewal Checklist

- Note both your **EAD expiry** and your **H-4 I-94 expiry**
- Mark 180 days before the **earlier** of the two as your action date
- Confirm your spouse's I-140 approval (or AC21 eligibility) is documented
- Decide whether you need I-539 (H-4 extension) alongside I-765
- Consider concurrent filing with your spouse's I-129 extension
- Verify the current I-765 fee on USCIS.gov
- File, save your receipt notices, and track your case
- Keep your expired EAD plus I-797C for I-9 proof during any auto-extension

## The Bottom Line

H-4 EAD renewal is not one deadline — it is two intertwined deadlines, and the work permit can only stand as long as the H-4 status beneath it holds. The spouses who never face a work gap are the ones who track both dates and file 180 days early.

That dual-deadline tracking is exactly what trips people up, and exactly what DueVisa is built for. Add your H-4 EAD and your H-4 I-94, and DueVisa watches both — sending reminders 180, 90, 60, 30, and 7 days before either one expires, so you renew them together and never let the EAD outrun the status it depends on. Start tracking free at duevisa.com.
    `,
    faqs: [
      { q: "Who qualifies for an H-4 EAD?", a: "H-4 spouses qualify if they are in valid H-4 status and their H-1B spouse has an approved Form I-140, or has H-1B status extended beyond six years under AC21. Children in H-4 status are not eligible." },
      { q: "How early should I renew my H-4 EAD?", a: "File Form I-765 up to 180 days before your current H-4 EAD expires. Because processing can take several months, the 180-day mark is the recommended filing window." },
      { q: "Does the 540-day automatic extension apply to H-4 EAD?", a: "Yes, a timely H-4 EAD renewal can qualify for an automatic extension of up to 540 days — but the extension cannot run beyond the expiration date of your H-4 I-94. Your work authorization ends if your H-4 status lapses." },
      { q: "Do I need to file I-539 with my H-4 EAD renewal?", a: "If your H-4 I-94 is also expiring, you typically need Form I-539 to extend your H-4 status, often filed concurrently with your spouse's H-1B (I-129) extension and your I-765." },
      { q: "What documents do I need to renew an H-4 EAD?", a: "Generally: Form I-765, a copy of your current EAD, your H-4 I-94/approval notice, evidence of your spouse's approved I-140, your marriage certificate, your spouse's H-1B documents, photos, and the correct fee." },
      { q: "Can my H-4 EAD work authorization continue if my H-4 status expires?", a: "No. The H-4 EAD and any automatic extension end when your H-4 I-94 expires. You must keep your H-4 status valid for the EAD to remain effective." },
    ],
  },
  "ead-540-day-automatic-extension": {
    title: "The 540-Day EAD Automatic Extension, Explained (2026)",
    description: "A timely EAD renewal can keep you working for up to 540 days past your card's expiry. Here's who qualifies, how to prove it for I-9, and the traps to avoid.",
    date: "June 14, 2026",
    readTime: "10 min",
    category: "EAD",
    content: `
For anyone who depends on an Employment Authorization Document to work in the United States, few rules matter more than the automatic extension. It is the safety net that keeps you employed while USCIS — often slowly — processes your renewal. Used correctly, it means an expired card on your desk does not mean an expired paycheck.

But the automatic extension is widely misunderstood. People assume it is automatic for everyone (it is not), that it lasts forever (it does not), and that their employer will simply know what to do (they often do not). This guide clears it all up.

## Quick Answer

If you file your EAD renewal (Form I-765) **before your current card expires**, in the **same eligibility category**, and your category is **eligible**, you may automatically continue working for up to **540 days** past the expiration date printed on your card. Your proof for I-9 purposes is your **expired EAD plus your Form I-797C receipt notice**. Not every category qualifies, and for dependent categories the extension can be capped by your underlying status — so always confirm the current rules for your category on USCIS.gov.

## What Is the EAD Automatic Extension?

When you file a renewal for certain EAD categories, USCIS allows your existing work authorization to continue automatically while the new card is being processed. This bridges the gap between your old card's expiration and your new card's approval.

The extension period has been increased over time to address USCIS processing backlogs. In recent years the maximum automatic extension has been set at **up to 540 days** for eligible renewal applicants. Because the exact length and the categories covered have shifted as USCIS issues new rules, treat 540 days as the current ceiling and verify the figure that applies to your specific category and filing date.

## Who Qualifies for the Automatic Extension?

Three conditions generally must all be true:

1. **Timely filing** — you filed Form I-765 to renew **before** your current EAD expired
2. **Same category** — your renewal is in the **same eligibility category** as your expiring EAD (with limited exceptions, notably some adjustment-of-status C09 and asylum C08 situations where a cross-category match is allowed)
3. **Eligible category** — your EAD category is on the list of categories that qualify for the automatic extension

### Examples of Commonly Eligible Categories

- (c)(8) — Pending asylum applicants
- (c)(9) — Adjustment of status applicants (pending green card)
- (c)(26) — H-4 dependent spouses
- (a)(12) and (c)(19) — Temporary Protected Status (TPS)
- (a)(17), (a)(18) — E and L dependent spouses (in many cases)

### Categories That Often Do NOT Qualify

- **F-1 OPT and STEM OPT** — post-completion OPT does **not** receive this automatic extension (STEM OPT has its own separate 180-day cap-gap-style extension rule, which works differently)

Because this list is defined by USCIS and can change, **confirm your category's current eligibility on the USCIS website** before relying on the extension.

## How Long Does the Extension Last?

The automatic extension lasts until the **earliest** of:

- **540 days** from the expiration date on your current EAD, **or**
- The **approval or denial** of your renewal application, **or**
- For dependent categories (such as H-4, L-2, E), the **expiration of your underlying status** (for example, your H-4 I-94)

That third condition is the one people forget. If you are in a dependent category, your work authorization can end the moment your status document expires — even if the 540-day clock has time left.

## How to Prove the Extension to Your Employer (Form I-9)

Your employer is legally required to verify your work authorization, and an expired EAD card on its own does not satisfy that requirement. To document the automatic extension for **Form I-9**, you generally present:

1. Your **expired EAD** (the physical card), **and**
2. Your **Form I-797C, Notice of Action** receipt for the Form I-765 renewal, showing that you filed in the same eligibility category and that the category is eligible for the extension

Together, these establish your continued authorization for the duration of the automatic extension. Your employer updates the I-9, and you keep working without interruption.

**Tip:** Many HR departments are unfamiliar with the 540-day rule. It helps to bring a printout of the current USCIS guidance on automatic EAD extensions when you speak with them.

## The Trap: Filing Even One Day Late

The entire automatic extension depends on filing **before** your current EAD expires. If your card expires first and you file afterward:

- You get **no** automatic extension
- You generally must **stop working** until the new card is approved
- You may face a gap that affects your income, your job, and your record

There is no grace period for this. "Timely" means before the expiration date — full stop. This is why the 180-day filing window exists, and why filing early is the only reliable strategy.

## Common Questions HR Teams Ask

- **"Your card is expired — how can you still work?"** Show the I-797C receipt and the USCIS automatic-extension guidance.
- **"How long is the extension?"** Up to 540 days from the card's expiry, or until USCIS decides, whichever comes first.
- **"What if the new card never comes before 540 days?"** This is rare, but if it happens, work authorization ends at day 540 unless USCIS has acted. Escalate the case with USCIS well before then.

## Common Mistakes to Avoid

1. **Filing after the EAD expires** — forfeits the extension entirely
2. **Filing in a different category** — breaks the "same category" requirement
3. **Assuming OPT/STEM OPT qualifies** — it follows different rules
4. **Ignoring the underlying-status cap** — fatal for H-4, L-2, and E dependents
5. **Not informing HR proactively** — leads to wrongful work stoppages

## Your Automatic Extension Checklist

- Confirm your EAD **category code** and check if it is eligible for the extension
- File your renewal **before** the card's expiration date (aim for 180 days early)
- File in the **same eligibility category**
- Keep your **I-797C receipt notice** safe — it is your I-9 proof
- If you are a dependent, confirm your **underlying status** outlasts the extension you need
- Give HR your expired EAD plus the I-797C and a copy of USCIS guidance
- Track your case and escalate if it approaches the 540-day limit

## The Bottom Line

The 540-day automatic extension is one of the most valuable protections in US immigration — but it rewards exactly one behavior: filing before your EAD expires. Miss that date and the safety net disappears. Hit it, in the right category, and you can keep working seamlessly for well over a year while USCIS catches up.

Everything hinges on a single date you need to act on months in advance. That is the problem DueVisa removes from your plate: add your EAD, and we remind you 180 days before it expires — the exact moment you should file to lock in the automatic extension — then again at 90, 60, 30, and 7 days. No spreadsheets, no missed windows, no expired safety net. Start tracking free at duevisa.com.
    `,
    faqs: [
      { q: "How long is the EAD automatic extension in 2026?", a: "A timely, eligible EAD renewal can extend work authorization for up to 540 days past the card's expiration date, or until USCIS approves or denies the renewal — whichever comes first. Confirm the current length for your category on USCIS.gov." },
      { q: "Who qualifies for the 540-day automatic EAD extension?", a: "You generally qualify if you filed your renewal before your EAD expired, in the same eligibility category, and your category is on the USCIS list of eligible categories (such as c8, c9, c26, and TPS categories)." },
      { q: "Does OPT or STEM OPT get the 540-day extension?", a: "No. Post-completion F-1 OPT does not receive this automatic extension. STEM OPT has its own separate extension rule that works differently." },
      { q: "How do I prove the automatic extension for I-9?", a: "Present your expired EAD card together with your Form I-797C receipt notice for the I-765 renewal. Together they document your continued authorization for the extension period." },
      { q: "What happens if I file my EAD renewal after it expires?", a: "You forfeit the automatic extension and generally must stop working until the new EAD is approved. The extension only applies if you file before the expiration date." },
      { q: "Can the automatic extension end early?", a: "Yes. For dependent categories like H-4, L-2, and E, the extension ends when your underlying status (such as your H-4 I-94) expires, even if the 540-day window has not run out." },
    ],
  },
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
  "h1b-grace-period-after-layoff": {
    title: "H-1B Grace Period After Layoff: Your 60-Day Survival Guide (2026)",
    description: "Laid off on an H-1B? You have 60 days to act — and every day counts. Here's exactly what to do, what your options are, and what mistakes can end your stay.",
    date: "June 22, 2026",
    readTime: "13 min",
    category: "H-1B",
    content: `
Losing your job is stressful for anyone. But losing your job on an H-1B visa adds a layer of urgency that most people aren't prepared for: the moment your employment ends, a 60-day countdown begins. Use those 60 days wisely and you can stay in the US legally and transition to a new status. Miss the deadline or make the wrong move and you may face serious consequences that could affect your immigration record for years.

This guide is the complete playbook for navigating the H-1B grace period after a layoff.

## Quick Answer

When your H-1B employment is terminated — including layoffs, resignations, or firing — you enter a **60-day grace period** (or until your I-94 expires, whichever is shorter). During those 60 days you can legally remain in the US but you **cannot work**. You must use the time to either start a new H-1B transfer with a sponsoring employer, change to another visa status (such as F-1, O-1, or H-4), or prepare to leave the US. Doing nothing is not an option. Verify all timelines on the USCIS website and consult an immigration attorney as early as possible — ideally within the first week.

## What Is the H-1B 60-Day Grace Period?

The 60-day H-1B grace period was formally established in 2017 under the DHS rule "Retention of EB-1, EB-2, and EB-3 Immigrant Workers" (8 CFR 214.1(l)(2)). Before 2017, H-1B workers who lost their jobs were technically out of status the moment employment ended, with no official cushion. The regulation fixed that by creating a formal grace period.

Key legal facts:

- The grace period is **60 consecutive calendar days**, not business days
- It applies each time you experience a period of employment cessation — you can use it multiple times during an H-1B admission, but only once per cessation event
- If your authorized stay (I-94 expiry date) is less than 60 days away, the grace period ends at the I-94 date — whichever comes first
- The grace period does **not** authorize work — you are maintaining status, not employment authorization

## When Does the 60-Day Clock Start?

The clock starts the day your employment ends. This is the date your employer terminates you — typically the last day you are on payroll or the date in your termination letter, whichever is earlier.

A note on WARN Act severance: some companies keep laid-off workers on payroll for a period after the announced layoff date for legal or HR reasons. In those cases, your grace period likely starts when you actually stop being an employee, not when the layoff was announced. Confirm the exact effective date in writing from your employer, as this affects your entire timeline.

## What You Can and Cannot Do During the Grace Period

| Action | Allowed During Grace Period? |
|--------|------------------------------|
| Remain in the US | Yes |
| Interview for new jobs | Yes |
| Travel internationally | Risky — re-entry requires valid H-1B stamp and new employer petition |
| Work for the old employer | No |
| Work for a new employer without an approved transfer | No |
| Work after receiving H-1B transfer receipt | Yes (with portability, after 60+ days in prior status) |
| Start a business / work as self-employed | No |
| Attend school (as enrolled student) | Not as a change of status — requires formal F-1 change |

The most important thing to understand: **the grace period buys you time to act, not permission to work**.

## Your 4 Options During the 60-Day Window

### Option 1: H-1B Transfer to a New Employer

This is the most common path and the one that keeps your career moving without interruption.

To transfer your H-1B:

1. Find an employer willing to sponsor your H-1B
2. The new employer files a new Form I-129 (H-1B petition) on your behalf with USCIS
3. Once the I-129 is **filed** (not just approved), you can begin working for the new employer under H-1B portability — provided you meet the AC21 portability rules (generally 180 days in H-1B status with an approved I-140)
4. USCIS processes the petition (standard or premium processing available)

**Important**: The filing must happen within your 60-day grace period. If your new employer's attorney files the I-129 on Day 61 or later, you were out of status at the time of filing and the petition will generally be denied.

Premium processing ($2,805 as of 2026) expedites USCIS's review to 15 business days and is highly recommended given the tight timeline.

### Option 2: Change to Another Nonimmigrant Status

If you don't have a new employer lined up immediately, you can file to change to a different visa status. Common options:

**H-4 (Dependent Spouse Status)**
If your spouse is in valid H-1B status, you can file to change to H-4 within the 60-day window. This preserves your ability to stay in the US. If you were previously approved for H-4 EAD, you would need to reapply for work authorization separately.

**F-1 (Student)**
If you have been admitted to or plan to enroll in a US academic program, you can file to change to F-1 status. Note: most schools require you to be physically present and enrolled. Changing to F-1 does not automatically authorize work — you would need OPT or CPT for that later.

**O-1 (Extraordinary Ability)**
If you have significant achievements in your field (publications, awards, high salary, media coverage), an O-1 may be an option. O-1 petitions are complex and generally require an attorney and several months of preparation, so realistically this is not a fast option within 60 days unless preparation is already underway.

**B-2 (Tourist)**
In very limited circumstances, some people request a change to B-2 status to buy additional time. This is rarely a great long-term solution and comes with significant restrictions — you cannot work in B-2 status at all.

### Option 3: File for Adjustment of Status (Green Card)

If you have an approved I-140 immigrant petition (employment-based green card petition), you may be eligible to file Form I-485 (Adjustment of Status) if a visa number is available in your priority date's category. Filing I-485 gives you the ability to apply for an EAD (work permit) while the green card case is pending.

This path requires careful planning and often has long wait times, but it can be a meaningful option for those already deep in the green card process.

### Option 4: Leave the US

If you cannot find a new employer or change status within 60 days, you must depart the US before the grace period ends. Leaving voluntarily — before you fall out of status — protects your ability to return on a future visa. Staying beyond the 60-day grace period means you are accruing unlawful presence, which can trigger bars on future re-entry.

## The 60-Day Countdown: Week-by-Week Action Plan

| Days | Action |
|------|--------|
| Day 1–3 | Get termination date confirmed in writing. Calculate your exact grace period end date. Consult an immigration attorney — ideally one your employer provides as a severance benefit. |
| Day 4–7 | Begin job search aggressively. Reach out to your network. Ask your former employer if they will cooperate with H-1B transfer paperwork (documentation of previous employment, wage records). |
| Day 8–21 | Pursue interviews. Identify employers open to H-1B sponsorship. If no leads, begin evaluating status change options (H-4, F-1). |
| Day 21–35 | If you have an offer, engage the new employer's immigration attorney immediately. Begin I-129 preparation. |
| Day 35–50 | The I-129 must be filed — or a change-of-status application submitted — with enough time to process and confirm receipt before Day 60. Do not wait until Day 59 to file. |
| Day 50–60 | Last resort window. If no options have materialized, begin preparing to depart the US. |

## Common Mistakes That End H-1B Status

These are the errors that immigration attorneys see most often — and they are all avoidable.

**Mistake 1: Treating the grace period as a job-hunting sabbatical.**
60 days passes faster than you expect. Starting your job search on Day 1 is not too early — it is barely on time.

**Mistake 2: Working for any employer without an approved or pending H-1B transfer.**
Even a one-day consulting engagement, freelance project, or day of work for a startup is unauthorized employment. The consequences can include visa revocation, deportation, and multi-year bars on future immigration benefits.

**Mistake 3: Traveling internationally without understanding re-entry rules.**
If you leave the US during the grace period, you will need a valid H-1B visa stamp from your new employer and an approved or pending H-1B petition to re-enter in H-1B status. If you re-enter as a tourist, you will not be able to work. International travel during an active grace period is almost always a bad idea unless an attorney has specifically reviewed your situation.

**Mistake 4: Assuming severance pay extends the grace period.**
Receiving severance or staying on the payroll temporarily does not necessarily extend your authorized H-1B employment beyond your actual termination date. The grace period begins when employment legally ends.

**Mistake 5: Waiting to hire an attorney.**
The first week is the most valuable week. Many laid-off H-1B workers spend weeks processing the emotional shock of a layoff before thinking about immigration — and then discover they have 20 days left. Hire an attorney in week one.

**Mistake 6: Not getting the termination date in writing.**
The exact date matters for your grace period calculation. Verbal confirmations are not enough.

## H-1B Transfer: How Portability Works

If you've been in H-1B status for at least 180 days and your employer has filed an employment-based immigrant petition (I-140) that has been approved for 180+ days, you have **AC21 portability**. This allows you to change employers while a green card case is pending, without losing your priority date or requiring a new immigrant petition.

Even without AC21 portability, you can still transfer your H-1B — you simply need the new I-129 to be filed and accepted before you begin work at the new employer.

## If Your Company Provides Immigration Support

Many tech and enterprise companies include immigration assistance in layoff severance packages, especially for H-1B employees. This typically means:

- The company's immigration law firm will consult with you at no cost for a defined period
- They may provide documentation of your prior H-1B status to help with transfers
- Some employers offer extended payroll periods that keep you in valid H-1B status longer

Ask your HR or severance coordinator about this explicitly. It is often not volunteered but is sometimes available.

## USCIS Resources and Where to Verify

Always confirm current policy details directly with USCIS before making decisions:

- **8 CFR 214.1(l)(2)** — the federal regulation defining the grace period
- **USCIS.gov H-1B page** — current filing requirements and processing times
- **USCIS processing times tool** — current I-129 and I-485 timelines
- **USCIS Form I-129 instructions** — H-1B classification section

Immigration regulations can change. What applies in 2026 may differ from what applied in prior years. This article reflects the rules as of mid-2026 — verify current terms at USCIS.gov.

## Track Your Grace Period with DueVisa

The 60-day clock is unforgiving. DueVisa lets you enter your layoff date and tracks the exact end of your grace period, sending you reminders at 30, 14, and 7 days remaining — so you never lose track of where you stand.

Add your grace period and any pending petition deadlines at duevisa.com. Free to start.
    `,
    faqs: [
      {
        q: "How long is the H-1B grace period after a layoff?",
        a: "The H-1B grace period is 60 calendar days from the date your employment ends, or until your I-94 authorized stay expires, whichever comes first. It was established by a 2017 DHS regulation (8 CFR 214.1(l)(2)). The grace period allows you to remain in the US and look for a new employer, but you cannot work during this time.",
      },
      {
        q: "Can I work during the 60-day H-1B grace period?",
        a: "No. The grace period allows you to maintain legal presence in the US, but it does not authorize employment. You cannot work for any employer — including on a freelance or consulting basis — until a new H-1B transfer petition has been filed (and in some cases approved) by a new employer. Working without authorization is a serious immigration violation.",
      },
      {
        q: "Does severance pay extend my H-1B status?",
        a: "Not necessarily. If your employer keeps you on the official payroll for a defined severance period, you may technically remain in H-1B status during that time — but this depends on the terms of the arrangement. In most cases, if you are notified of termination on Day 1 and paid severance for 4 weeks, your H-1B status effectively ends at termination, not at the end of the severance period. Confirm the exact termination date with your employer and an attorney.",
      },
      {
        q: "What if I can't find a new job within 60 days?",
        a: "If you don't have a new H-1B sponsor within 60 days, you have a few options: (1) file to change to another nonimmigrant status such as H-4 (if your spouse is in H-1B status), F-1 (if you are enrolling in school), or in limited cases B-2; (2) file for Adjustment of Status if you have an approved I-140 and a visa number is available; or (3) depart the US voluntarily before the grace period ends. Staying beyond 60 days without taking any of these steps means you are accruing unlawful presence.",
      },
      {
        q: "Can I travel outside the US during my H-1B grace period?",
        a: "This is very risky and generally not recommended without consulting an attorney first. If you leave the US during the grace period, you will need a valid H-1B visa stamp in your passport from a sponsoring employer to re-enter in H-1B status. Without an active employer, you would typically need to re-enter as a tourist, which does not allow you to work. International travel during an active grace period can complicate your situation significantly.",
      },
      {
        q: "When can I start working at a new company after an H-1B transfer is filed?",
        a: "Under H-1B portability rules, you can generally start working at a new employer once the new I-129 petition has been filed and you have received the I-797C receipt notice — you do not need to wait for approval. However, standard portability (under AC21) requires that you have been in H-1B status for at least 180 days and your employment is in the same or a similar occupational classification. Confirm the specific rules with your attorney before starting work at the new employer.",
      },
      {
        q: "Does the H-1B grace period reset each time I change employers?",
        a: "The grace period applies each time there is a cessation of employment — so in theory you can use it multiple times during the same H-1B admission period. However, it applies per cessation event, not per calendar year. If you are laid off, use 45 days of your grace period to find a new employer, start working, and then are laid off again, you get a fresh 60-day grace period for the new cessation.",
      },
      {
        q: "What happens if I overstay the 60-day grace period?",
        a: "If you remain in the US beyond the 60-day grace period without changing to another valid status or filing for extension, you begin accruing unlawful presence. Accruing 180+ days of unlawful presence and then leaving the US triggers a 3-year bar on re-entry. Accruing 1 year or more triggers a 10-year bar. It also creates complications for future immigration applications including green card petitions and visa renewals.",
      },
    ],
  },
  "opt-application-timeline": {
    title: "OPT Application Timeline: The 90-Day Window Explained (2026)",
    description: "F-1 students can only apply for OPT within a strict 90-day window. Miss it and you lose your OPT year. Here's the exact timeline, how to calculate your window, and every deadline you need to track.",
    date: "June 22, 2026",
    readTime: "12 min",
    category: "F-1",
    content: `
Optional Practical Training (OPT) is one of the most time-sensitive processes in F-1 immigration. Unlike most immigration filings where filing earlier is always better, OPT has a strict 90-day application window that opens exactly 90 days before your program end date. File outside that window — in either direction — and USCIS will reject your application and you will lose your OPT year entirely.

This guide gives you the complete OPT application timeline, from when you can apply to when you can start working, with every date you need to hit and every mistake to avoid.

## Quick Answer

For post-completion OPT, you can file Form I-765 **no earlier than 90 days before your program end date** and **no later than 60 days after your program end date**. USCIS recommends filing as early as possible within that window — ideally 3 to 4 months before you want to start working. Processing typically takes 3 to 5 months in 2026. Your OPT start date can be no later than 60 days after your program end date, and you choose the start date yourself when filing. Always confirm current timelines with your DSO (Designated School Official) and on uscis.gov.

## What Is OPT?

Optional Practical Training authorizes F-1 students to work in the US in a job directly related to their field of study. There are two types:

- **Pre-completion OPT**: Work authorization while you are still enrolled (part-time while classes are in session, full-time during breaks)
- **Post-completion OPT**: Work authorization for up to 12 months after you graduate or finish your program — this is what most students use

This guide focuses on **post-completion OPT** since that is where the timeline is most critical.

If you are eligible for STEM OPT extension (a 24-month extension for qualifying STEM degrees), that requires a separate application filed within the last 90 days of your initial OPT period — covered in a separate guide.

## The 90-Day OPT Application Window

Here is the rule that defines everything:

**You may file Form I-765 for post-completion OPT between 90 days before your program end date and 60 days after your program end date.**

| Milestone | Description |
|-----------|-------------|
| Program End Date − 90 days | Earliest you can file I-765 |
| Program End Date | Last day of your F-1 program (from your I-20) |
| Program End Date + 60 days | Grace period ends — latest your OPT start date can be |
| OPT Start Date | The date you chose when filing (must be within the window) |
| OPT Start Date + 12 months | Your OPT EAD expires |

The 90-day window is not "about 3 months" — it is a hard 90 calendar days. USCIS will reject applications filed even one day early.

## How to Calculate Your OPT Window

Your program end date is printed on your I-20 in the field labeled "Program End Date" or "Completion Date." This is the date your school expects you to finish your degree requirements — it is not necessarily graduation ceremony date.

Example: If your program end date is May 15, 2026:

- Earliest filing date: February 14, 2026 (90 days before May 15)
- Latest OPT start date: July 14, 2026 (60 days after May 15)
- OPT end date: 12 months after your chosen start date

**Critical note**: If your program end date changes — for example, because you are finishing early or your completion is delayed — your DSO must update your I-20 and your OPT window shifts accordingly. Always calculate from the date on your most current I-20.

## Step-by-Step OPT Application Timeline

### 3–4 Months Before Your Program End Date

This is your ideal filing window.

1. **Meet with your DSO** (Designated School Official at your school's international students office). Your DSO must recommend you for OPT in SEVIS before you can apply.
2. **Request your OPT I-20** from your DSO — it will be endorsed with an OPT recommendation and will look slightly different from your standard I-20.
3. **Gather your application documents** (see checklist below).
4. **File Form I-765** with USCIS with the correct fee.

Filing 3–4 months early gives you enough runway for USCIS processing (currently 3–5 months in 2026) so your EAD card arrives before or near your chosen start date.

### 60–90 Days Before Your Program End Date

This is still within the window but is cutting it close given current processing times. If you file 60 days before your program end date and processing takes 5 months, your card may not arrive until well after your start date. You will not be able to work until the physical card arrives (unlike some other work authorization types, OPT does not have an auto-extension).

### After Your Program End Date

You can still file during the 60-day grace period after your program end date — but you cannot work during this window unless your EAD has already been approved. This path almost guarantees a work gap. Avoid it if at all possible.

### After the 60-Day Grace Period

You cannot apply for OPT. Your 12-month OPT entitlement for that degree level is gone.

## What Documents Do You Need?

| Document | Notes |
|----------|-------|
| Form I-765 | Application for Employment Authorization |
| OPT-endorsed I-20 | Issued by your DSO; must show OPT recommendation |
| Copy of current F-1 visa | Front page of your passport visa stamp |
| Copy of your I-94 | From i94.cbp.dhs.gov |
| Passport photo (2 copies) | 2×2 inches, white background |
| Copy of all previous I-20s | Every I-20 you have ever held |
| Copy of previous EADs (if any) | If you had prior OPT or EAD |
| Filing fee | $520 as of 2026 — check uscis.gov for current amount |

Do not include originals in your mailing — USCIS will not return them. Send clear photocopies and keep the originals.

## Choosing Your OPT Start Date

When you file, you choose your requested OPT start date. Rules:

- It must be **after your program end date** (you cannot work before you graduate)
- It must be **no later than 60 days after your program end date**
- Your OPT end date will be exactly 12 months from your chosen start date

Choose strategically. If you have a job lined up that starts June 1 and your program ends May 15, request June 1 as your start date — you get the full 12 months of OPT on that schedule. If you request May 16 as your start date but your EAD doesn't arrive until July, those weeks from May 16 still count toward your 12-month clock whether or not you were able to work.

**You cannot change your OPT start date after USCIS approves your application.** Choose carefully.

## OPT Processing Times in 2026

USCIS currently processes Form I-765 for OPT (category (c)(3)(B)) in approximately 3 to 5 months at most service centers. This is why filing at the 90-day mark is the right move — you want the card in hand at or near your start date.

You can check the live processing time for your service center and category at the USCIS processing times tool on uscis.gov. Select Form I-765, then eligibility category (c)(3)(B) for post-completion OPT.

You will receive a Form I-797C receipt notice first (within 2–4 weeks of filing), then a biometrics appointment if required, then your approval notice and EAD card.

## When Can You Start Working?

You can only begin working on OPT on the start date printed on your EAD card — not your requested start date, and not the date USCIS approves your application. If the card is delayed, you wait for the physical card to arrive.

The only exception: if your EAD card has not arrived but you have your approval notice, contact your DSO — in some limited situations, schools can advise on how to handle this.

## Unemployment Days: The Clock Inside the Clock

Once your OPT starts, an unemployment clock begins. For regular (non-STEM) OPT:

- You can have **no more than 90 days of unemployment** during your 12-month OPT period
- Days without a qualifying job count against your 90-day limit
- If you exceed 90 days of unemployment, you fall out of F-1 status

Report every job start and end date to your DSO promptly — they track your employment in SEVIS. Failing to report is itself a status violation.

## Common OPT Application Mistakes

**Mistake 1: Filing before the 90-day window opens.**
USCIS will reject your application and return it. You will have to refile — potentially now in a tighter window and behind on processing time.

**Mistake 2: Letting your DSO miss the SEVIS recommendation.**
You cannot file I-765 until your DSO has recommended you in SEVIS. Do not wait until the last week to start the DSO conversation — some schools require 2–4 weeks of lead time.

**Mistake 3: Sending originals instead of copies.**
USCIS will not return original documents if they get lost or damaged in the process.

**Mistake 4: Requesting a start date you cannot actually use.**
If you request June 1 but your job doesn't start until August, your OPT clock still runs from June 1 and you've used up two months of your 12-month allotment.

**Mistake 5: Not tracking your unemployment days.**
Students who don't track their 90 days of allowed unemployment can fall out of status without realizing it. Count every gap.

**Mistake 6: Forgetting about STEM OPT.**
If your degree is in a qualifying STEM field, you can apply for a 24-month extension during the last 90 days of your initial OPT. File early — STEM OPT processing can take several months, and you need the application filed before your OPT ends.

## After OPT: What Are Your Options?

Your OPT year will end. Here are the common paths forward:

- **H-1B cap lottery**: Your employer files an H-1B petition for the next cap season (lottery in March for October 1 start date). Cap-gap protects you while waiting.
- **STEM OPT extension**: 24 additional months for qualifying degrees.
- **Change of status**: H-4, F-2, or other dependent status if spouse has qualifying visa.
- **Return to school**: Enroll in a new program at a higher level and restore F-1 status.
- **Depart the US**: The 60-day F-1 grace period begins when your OPT ends.

## Track Your OPT Timeline with DueVisa

Between the 90-day application window, your chosen start date, unemployment day tracking, and STEM OPT filing window, OPT involves more deadlines than almost any other immigration category. DueVisa tracks all of them — OPT EAD expiry, STEM OPT filing window, and your F-1 I-20 program end date — with reminders so nothing slips.

Add your dates at duevisa.com. Free for your first 3 documents.
    `,
    faqs: [
      {
        q: "When can I apply for OPT?",
        a: "For post-completion OPT, you can file Form I-765 starting 90 days before your program end date (as listed on your I-20). You cannot file earlier than 90 days before, and your chosen OPT start date cannot be later than 60 days after your program end date. Filing at the 90-day mark is recommended given that USCIS currently takes 3–5 months to process OPT applications.",
      },
      {
        q: "How long does OPT take to process in 2026?",
        a: "USCIS currently takes approximately 3 to 5 months to process Form I-765 for OPT. Processing times vary by service center and can change. Check the current processing time for your service center and category (c)(3)(B) for post-completion OPT at the USCIS processing times tool on uscis.gov. Because of this timeline, filing as soon as your 90-day window opens is the safest approach.",
      },
      {
        q: "Can I work before my OPT EAD card arrives?",
        a: "No. You can only start working on OPT on the start date printed on your physical EAD card. You must have the card in hand before working. Unlike some other work authorization types, OPT does not allow you to begin work on the receipt notice alone. If your card is significantly delayed, contact your DSO for guidance.",
      },
      {
        q: "What happens if I miss the OPT application window?",
        a: "If you file after the 60-day grace period following your program end date, USCIS will reject your I-765 and you will lose your post-completion OPT entitlement for that degree level. There is no appeal or extension. This is why tracking the window carefully and filing as early as possible is so important.",
      },
      {
        q: "How many days can I be unemployed on OPT?",
        a: "For standard post-completion OPT, you can have a maximum of 90 days of cumulative unemployment during your 12-month OPT period. Days without a qualifying job (in your field of study) count against this limit. If you exceed 90 days, you fall out of F-1 status. Report all job start and end dates to your DSO promptly so they can track your employment in SEVIS.",
      },
      {
        q: "Can I change my OPT start date after filing?",
        a: "No. Once USCIS approves your OPT application, the start date on your EAD card is fixed. You cannot change it. This is why choosing your start date carefully when you file is critical — pick a date you can realistically use, because your 12-month clock runs from that date regardless of when you actually start working.",
      },
      {
        q: "What is the difference between OPT and STEM OPT?",
        a: "Standard OPT (post-completion) gives you 12 months of work authorization after graduating in any degree field. STEM OPT is a 24-month extension available to students who graduated with a qualifying STEM degree (Science, Technology, Engineering, or Mathematics). To get STEM OPT, your employer must be enrolled in E-Verify, and you must apply during the last 90 days of your standard OPT period. STEM OPT raises your unemployment day limit to 150 days.",
      },
      {
        q: "Does my DSO need to do anything before I apply for OPT?",
        a: "Yes — your DSO must recommend you for OPT in SEVIS (the government's student tracking system) and issue you an OPT-endorsed I-20 before you can file I-765 with USCIS. This is required. Contact your school's international students office as soon as your 90-day window opens, or earlier — many schools require several weeks of lead time to process the SEVIS recommendation.",
      },
    ],
  },
  "stem-opt-extension-guide": {
    title: "STEM OPT Extension: The Complete 24-Month Guide (2026)",
    description: "The STEM OPT extension gives qualifying graduates 24 extra months of work authorization. Here's who qualifies, the exact filing window, the I-983 training plan, and every reporting deadline.",
    date: "June 22, 2026",
    readTime: "13 min",
    category: "F-1",
    content: `
If you graduated with a STEM degree and you are on OPT, the STEM OPT extension is the single most valuable immigration benefit available to you: 24 additional months of work authorization on top of your initial 12-month OPT, giving you up to 36 months total in the US to work and pursue an H-1B. But the extension comes with a strict filing window, an employer training plan requirement, and ongoing reporting obligations that catch many students off guard.

This guide covers exactly who qualifies, when to file, and every deadline you must track to keep your STEM OPT valid.

## Quick Answer

The STEM OPT extension adds **24 months** of work authorization for F-1 students who earned a qualifying STEM degree and are working for an **E-Verify employer**. You must file Form I-765 **during the last 90 days of your initial 12-month OPT period** and **before your current OPT EAD expires**. You also need a completed **Form I-983 Training Plan** signed by your employer. If you file on time, you receive an automatic extension of up to 180 days while the application is pending. Always verify current rules with your DSO and on uscis.gov.

## What Is the STEM OPT Extension?

Standard post-completion OPT gives F-1 graduates 12 months of work authorization. The STEM OPT extension allows eligible students to extend that by **24 months**, for a total of **36 months** of OPT. This extra time is critical because it gives you multiple chances at the H-1B lottery (which most people do not win on the first try).

## Who Qualifies for STEM OPT?

You must meet all of the following:

- You are currently on **valid post-completion OPT** (standard 12-month OPT)
- Your degree is in a **qualifying STEM field** on the DHS STEM Designated Degree Program List (identified by CIP code)
- The degree was earned from an **accredited, SEVP-certified** US school
- Your employer is enrolled in and using **E-Verify**
- Your employer will complete and sign a **Form I-983 Training Plan**
- Your job is **directly related** to your STEM degree and is paid

A key nuance: you can apply for STEM OPT based on a **previously earned STEM degree** even if your most recent OPT is based on a non-STEM degree, as long as the prior STEM degree is from an SEVP-certified school and the practical training relates to it.

## The STEM OPT Filing Window

This is the rule that governs your entire timeline:

**You must file Form I-765 for the STEM extension during the 90 days before your current OPT EAD expires — and the application must be received by USCIS before your current OPT EAD expires.**

| Milestone | Description |
|-----------|-------------|
| OPT EAD Expiry − 90 days | Earliest you can file the STEM extension |
| OPT EAD Expiry | Your current 12-month OPT ends |
| Filing on time | Grants automatic extension of up to 180 days while pending |
| STEM OPT EAD | 24-month extension from the day after your OPT EAD expired |

If you file even one day after your current OPT EAD expires, you lose the extension. The 90-day window before expiry is your only chance.

## The 180-Day Automatic Extension

If you file your STEM OPT application on time (before your OPT EAD expires) and your extension is still pending when the OPT EAD expires, you are automatically authorized to continue working for up to **180 days** while USCIS processes your application. This bridge prevents a work gap — but only if you filed before the deadline.

## Step-by-Step STEM OPT Timeline

### 90+ Days Before OPT EAD Expiry: Prepare

1. **Confirm your degree is STEM-eligible** — check the CIP code on your I-20 against the DHS STEM Designated Degree Program List.
2. **Confirm your employer uses E-Verify** — ask HR directly; not all employers are enrolled.
3. **Complete Form I-983 with your employer** — this training plan describes your role, learning objectives, and supervision.

### The 90-Day Window: File

4. **Request a STEM OPT I-20 from your DSO** — bring your completed I-983. Your DSO updates SEVIS and issues a new I-20 with the STEM recommendation.
5. **File Form I-765** within 60 days of your DSO issuing the STEM OPT I-20, and before your current OPT EAD expires.

### After Filing

6. **Receive your I-797C receipt notice** — keep it; combined with your expired EAD it proves your 180-day authorization.
7. **Receive your STEM OPT EAD** — work authorized through the new card's expiry.

## Form I-983: The Training Plan

The I-983 is unique to STEM OPT and trips up many applicants. It is a formal training plan that:

- Describes how your job relates to your STEM degree
- Lists specific learning objectives and how they will be achieved
- Identifies your supervisor and how your performance is evaluated
- Must be **signed by both you and an authorized official at your employer**

You do not mail the I-983 to USCIS — you submit it to your DSO, who keeps it on file. But it must be complete before your DSO will recommend you for STEM OPT.

## Ongoing Reporting Requirements

STEM OPT has far more reporting obligations than standard OPT. Missing any of these can end your status:

| Report | Deadline |
|--------|----------|
| Validation report to DSO | Every 6 months (confirming employment details) |
| Annual self-evaluation on I-983 | At 12 months and at the end of the 24-month period |
| Change of employer | Within 10 days |
| Change of address | Within 10 days |
| Change in job/salary/hours | Promptly, with updated I-983 |
| Loss of employment | Within 10 days |

The 6-month validation reports are the ones most students forget. Set a recurring reminder.

## Unemployment Limit on STEM OPT

During the combined OPT + STEM OPT period, you are allowed a total of **150 days of unemployment** (compared to 90 days on standard OPT alone). The 90 days from your initial OPT carry over and you get an additional 60 days during the STEM extension. Exceeding 150 cumulative days means falling out of status.

## STEM OPT and the H-1B Cap-Gap

The biggest strategic value of STEM OPT is the multiple H-1B lottery attempts it enables. If your employer files an H-1B petition and you are selected, **cap-gap** can extend your work authorization and status from the time your STEM OPT ends until your H-1B start date (October 1). With 36 months of OPT, you typically get two to three lottery cycles instead of one.

## Common STEM OPT Mistakes

**Mistake 1: Filing after the OPT EAD expires.** The extension is lost. The 90-day-before window is firm.

**Mistake 2: Assuming your employer uses E-Verify.** Confirm it explicitly — STEM OPT requires it, and many smaller employers are not enrolled.

**Mistake 3: Forgetting the 6-month validation reports.** These are easy to miss because they recur silently. A missed report is a status violation.

**Mistake 4: An incomplete or generic I-983.** USCIS and your DSO expect a specific, detailed training plan — not boilerplate.

**Mistake 5: Working for an employer that won't sign the I-983.** No I-983, no STEM OPT. Confirm employer cooperation before you rely on the extension.

## Track Your STEM OPT Deadlines with DueVisa

STEM OPT has more recurring deadlines than any other F-1 benefit: the 90-day filing window, the new EAD expiry, and 6-month validation reports for two full years. DueVisa tracks every one and reminds you before each — including the validation reports that are so easy to forget.

Add your dates at duevisa.com. Free for your first 3 documents.
    `,
    faqs: [
      {
        q: "When can I apply for the STEM OPT extension?",
        a: "You must file Form I-765 for the STEM OPT extension during the 90 days before your current OPT EAD expires, and USCIS must receive it before your OPT EAD expires. You also need to file within 60 days of your DSO issuing your STEM OPT I-20. Filing as early as the window opens is recommended to allow for processing time.",
      },
      {
        q: "How long is the STEM OPT extension?",
        a: "The STEM OPT extension provides 24 additional months of work authorization on top of your initial 12-month post-completion OPT, for a total of up to 36 months. This extended period is especially valuable because it allows multiple chances at the H-1B lottery.",
      },
      {
        q: "Can I keep working while my STEM OPT application is pending?",
        a: "Yes, if you filed on time. If you submitted your STEM OPT application before your current OPT EAD expired and it is still pending when the EAD expires, you receive an automatic extension of work authorization for up to 180 days while USCIS processes your application. Your expired EAD plus the I-797C receipt notice serves as proof.",
      },
      {
        q: "What is Form I-983 and do I mail it to USCIS?",
        a: "Form I-983 is the Training Plan for STEM OPT students. It describes how your job relates to your STEM degree, your learning objectives, supervision, and evaluation. It must be signed by you and an authorized official at your employer. You do NOT mail it to USCIS — you submit it to your DSO, who keeps it on file and uses it to recommend you for STEM OPT in SEVIS.",
      },
      {
        q: "Does my employer need to be enrolled in E-Verify for STEM OPT?",
        a: "Yes. STEM OPT requires that your employer is enrolled in and uses E-Verify, the federal employment eligibility verification system. This is a strict requirement. Confirm with your employer's HR department before relying on the STEM extension — many smaller employers are not enrolled in E-Verify.",
      },
      {
        q: "What are the STEM OPT reporting requirements?",
        a: "STEM OPT requires more reporting than standard OPT: a validation report to your DSO every 6 months, a self-evaluation on your I-983 at 12 months and at the end of the period, and reports within 10 days for any change of employer, address, or loss of employment. Missing these reports — especially the recurring 6-month validations — is a status violation.",
      },
      {
        q: "How many days can I be unemployed on STEM OPT?",
        a: "During the combined initial OPT and STEM OPT period, you are allowed up to 150 cumulative days of unemployment. This is the original 90 days from your standard OPT plus an additional 60 days during the STEM extension. Exceeding 150 total days of unemployment means you fall out of F-1 status.",
      },
      {
        q: "Can I get STEM OPT if my current degree isn't STEM?",
        a: "Possibly. You may be able to apply for STEM OPT based on a previously earned STEM degree, even if your most recent OPT is based on a non-STEM degree — as long as the prior STEM degree is from an SEVP-certified school and your practical training is directly related to that STEM degree. Discuss your specific situation with your DSO.",
      },
    ],
  },
  "i751-removal-of-conditions": {
    title: "I-751 Removal of Conditions: The 90-Day Filing Window (2026)",
    description: "Conditional green card holders must file Form I-751 within a strict 90-day window before their 2-year card expires. Miss it and you risk losing permanent residence. Here's the exact timeline and process.",
    date: "June 22, 2026",
    readTime: "11 min",
    category: "Green Card",
    content: `
If you received a 2-year conditional green card — almost always through marriage to a US citizen or permanent resident — you do not yet have permanent residence locked in. You have a conditional status that expires, and to keep it you must file Form I-751 to remove the conditions within a strict 90-day window. Miss that window and you can lose your status entirely.

This guide explains exactly when to file, how the process works, and the deadlines you cannot afford to miss.

## Quick Answer

If you hold a 2-year conditional green card, you must file **Form I-751 (Petition to Remove Conditions on Residence)** during the **90 days immediately before your conditional card expires**. Filing on time extends your permanent resident status automatically (currently up to 48 months) via a receipt notice while USCIS processes the case. Filing late requires a written explanation of good cause, and failing to file at all can result in loss of status and removal proceedings. Always verify current requirements on uscis.gov.

## Why You Have a Conditional Green Card

You received a 2-year conditional green card (rather than a 10-year card) if your permanent residence was granted based on a marriage that was **less than 2 years old** at the time you were approved. The condition exists so USCIS can confirm, two years later, that the marriage is genuine and not solely for immigration benefits. Conditional residence is also issued in certain investor (EB-5) cases.

Your status is real permanent residence — but it is conditional, and the condition must be removed before the card expires.

## The 90-Day Filing Window

This is the rule that governs everything:

**File Form I-751 during the 90 days immediately before the expiration date on your conditional green card.**

| Milestone | Description |
|-----------|-------------|
| Card Expiry − 90 days | Earliest you can file I-751 (jointly) |
| Card Expiry | Your conditional green card expires |
| Filing on time | Receipt notice extends status (currently up to 48 months) |
| After expiry without filing | Risk of status loss and removal proceedings |

The expiration date is printed on the front of your green card. Count back 90 days — that is the day your window opens.

**Important exception:** If you are filing with a waiver of the joint-filing requirement (for example, after divorce, or due to abuse), you are **not** bound by the 90-day window and can file at any time. The 90-day window applies to joint petitions filed by both spouses together.

## What "Removing Conditions" Means

When USCIS approves your I-751, your conditional status converts to **permanent residence with a 10-year green card**. You no longer have to re-prove your marriage, and you are on the standard path toward eventual naturalization.

## Filing Jointly vs. Filing with a Waiver

**Joint filing** (the standard path): You and your spouse file Form I-751 together, demonstrating that your marriage is genuine. This requires the 90-day window.

**Filing with a waiver**: If you cannot file jointly — because of divorce, your spouse's death, abuse, or extreme hardship — you can request a waiver of the joint-filing requirement. Waiver-based petitions can be filed at any time, not just in the 90-day window.

## What Evidence Do You Need?

USCIS wants proof that your marriage is bona fide. Strong evidence includes:

- Joint bank account and credit card statements
- A shared lease or mortgage and property deeds
- Joint utility bills and insurance policies (health, auto, life)
- Birth certificates of children born to the marriage
- Joint tax returns
- Photos together over the 2-year period
- Affidavits from people who know you as a couple

The more documentation spanning the full 2 years, the stronger your case. Thin evidence is a leading cause of Requests for Evidence (RFEs) and interviews.

## What to File

| Item | Notes |
|------|-------|
| Form I-751 | Petition to Remove Conditions on Residence |
| Copy of your conditional green card (both sides) | Front and back |
| Evidence of bona fide marriage | See list above |
| Filing fee | Check uscis.gov for the current amount |
| Waiver documentation (if applicable) | Divorce decree, death certificate, etc. |

## What Happens After You File

1. **Receipt notice (Form I-797C)** arrives within a few weeks. This notice automatically extends your permanent resident status — currently up to 48 months — and serves as proof of your status along with your expired green card.
2. **Biometrics appointment** for fingerprints and photo.
3. **USCIS review** — they may approve, issue an RFE, or schedule an interview.
4. **Approval** — your conditions are removed and you receive a 10-year green card.

Keep your receipt notice with your expired card at all times — together they prove you are a lawful permanent resident while the case is pending, including for travel and I-9 employment.

## What If You Miss the Window?

If you fail to file before your conditional card expires:

- Your conditional resident status **automatically terminates**
- USCIS can initiate **removal (deportation) proceedings**
- You can still file late **with a written explanation of good cause** for the delay, but approval is not guaranteed and your situation becomes more precarious

If you have missed your window, contact an immigration attorney immediately — do not simply wait.

## Common I-751 Mistakes

**Mistake 1: Filing too early.** USCIS will reject a joint petition filed before the 90-day window opens. Count carefully from the card expiry date.

**Mistake 2: Forgetting entirely.** The 2-year card feels permanent, and many people simply forget the deadline. This is the most common — and most damaging — mistake.

**Mistake 3: Thin marriage evidence.** Submitting only a couple of documents invites an RFE or interview. Build a thorough record spanning the full 2 years.

**Mistake 4: Not updating your address.** USCIS sends critical notices by mail. A missed biometrics or interview notice can derail your case.

**Mistake 5: Assuming divorce ends your eligibility.** It does not — you can file with a waiver of the joint-filing requirement. Get legal advice rather than giving up.

## Track Your I-751 Window with DueVisa

The I-751 90-day window is one of the easiest deadlines to forget — your 2-year card feels like a real green card right up until it expires. DueVisa opens your I-751 reminder exactly 90 days before your conditional card expires, so you file squarely inside the window.

Add your conditional green card expiry at duevisa.com. Free for your first 3 documents.
    `,
    faqs: [
      {
        q: "When do I file Form I-751?",
        a: "If you are filing jointly with your spouse, you must file Form I-751 during the 90 days immediately before your 2-year conditional green card expires. The expiration date is printed on the front of your card — count back 90 days to find when your window opens. If you are filing with a waiver of the joint-filing requirement (e.g., after divorce), you can file at any time.",
      },
      {
        q: "What happens if I don't file I-751 before my card expires?",
        a: "Your conditional resident status automatically terminates, and USCIS can place you in removal (deportation) proceedings. You can still file late with a written explanation showing good cause for the delay, but approval is not guaranteed. If you have missed or are about to miss your window, contact an immigration attorney immediately.",
      },
      {
        q: "Does my conditional green card expiring mean I lose my status while the I-751 is pending?",
        a: "No, as long as you filed on time. When you file Form I-751, USCIS sends a receipt notice (Form I-797C) that automatically extends your permanent resident status — currently up to 48 months — while your case is processed. Carry this receipt notice with your expired green card; together they prove your status for travel and employment.",
      },
      {
        q: "Can I file I-751 if I'm divorced?",
        a: "Yes. If you are divorced, you can file Form I-751 with a request for a waiver of the joint-filing requirement. Waiver-based petitions are not bound by the 90-day window and can be filed at any time. You will need to provide your divorce decree and continue to demonstrate that the marriage was entered into in good faith. Consult an attorney for divorce-based waiver cases.",
      },
      {
        q: "What evidence do I need for I-751?",
        a: "USCIS wants proof that your marriage is genuine. Strong evidence includes joint bank and credit card statements, a shared lease or mortgage, joint utility bills and insurance policies, joint tax returns, birth certificates of children, photos together over time, and affidavits from people who know you as a couple. Documentation spanning the full 2-year period makes the strongest case.",
      },
      {
        q: "How long does I-751 take to process?",
        a: "Processing times vary significantly and have been lengthy in recent years, which is why the receipt notice extends your status for up to 48 months. Check the current processing time for Form I-751 at the USCIS processing times tool on uscis.gov. While pending, your receipt notice combined with your expired card serves as evidence of your continued permanent resident status.",
      },
      {
        q: "What is the difference between a conditional and permanent green card?",
        a: "A conditional green card is valid for 2 years and is issued when your residence is based on a marriage less than 2 years old at approval (or certain investor cases). A permanent (10-year) green card is issued after you remove the conditions via Form I-751. Both grant lawful permanent residence, but the conditional card requires the I-751 step to keep your status and obtain the 10-year card.",
      },
    ],
  },
  "h1b-transfer-timeline": {
    title: "H-1B Transfer Timeline: How Long It Takes and When You Can Start (2026)",
    description: "Changing employers on an H-1B? Here's the complete transfer timeline — from offer to filing to your first day at the new job — and exactly when H-1B portability lets you start working.",
    date: "June 22, 2026",
    readTime: "11 min",
    category: "H-1B",
    content: `
Changing jobs on an H-1B is one of the most common — and most misunderstood — moves in US immigration. The good news: you usually do not have to wait for USCIS approval to start your new job. The H-1B "portability" rule lets you begin working as soon as your new employer's petition is properly filed. But the timing details matter enormously, and getting them wrong can put your status at risk.

This guide breaks down the full H-1B transfer timeline and answers the question everyone asks: when can I actually start?

## Quick Answer

An H-1B transfer is simply a new Form I-129 petition filed by your new employer — there is no separate "transfer" form. Under **H-1B portability** (AC21), you can begin working for the new employer **as soon as USCIS receives the new petition** (confirmed by the I-797C receipt notice), as long as you were in valid H-1B status, the petition is non-frivolous, and you have not worked without authorization. You do **not** need to wait for approval. Premium processing (15 business days) is available; standard processing can take several months. Verify current rules on uscis.gov.

## What an "H-1B Transfer" Actually Is

There is no Form for an H-1B "transfer." When you change employers, your new employer files a brand-new **Form I-129 H-1B petition** for you. Because you already hold an H-1B and are counted against the cap, this new petition is **cap-exempt** — it is not subject to the annual H-1B lottery. That is what makes transfers relatively straightforward compared to a first-time H-1B.

## The H-1B Portability Rule: Why You Can Start Early

Under the American Competitiveness in the Twenty-First Century Act (AC21), an H-1B worker can begin employment with a new employer as soon as that employer files a non-frivolous H-1B petition — you do not have to wait for approval. To use portability, you must:

- Have been **lawfully admitted** in H-1B status
- Have a **new I-129 petition filed before your current authorized stay expires**
- **Not have engaged in unauthorized employment** since your last admission

Once the petition is filed and you have the receipt notice, you are authorized to work for the new employer while the petition is pending.

## The H-1B Transfer Timeline, Step by Step

| Stage | Typical Duration |
|-------|------------------|
| Offer accepted → attorney engaged | A few days to 2 weeks |
| Attorney prepares petition + LCA | 1–3 weeks |
| LCA certification by DOL | ~7 business days |
| Petition filed → I-797C receipt | A few days to 2 weeks |
| **You can start working** | On/after receipt (portability) |
| Premium processing decision | 15 business days |
| Standard processing decision | 2–6+ months |

### Step 1: Offer and Attorney Engagement

Once you accept the offer, the new employer's immigration attorney begins the process. Provide your current I-797, I-94, visa stamp, passport, and prior pay stubs promptly — delays here delay everything.

### Step 2: Labor Condition Application (LCA)

Before filing the I-129, the employer files an LCA with the Department of Labor, which certifies the wage and working conditions. LCA certification typically takes about 7 business days. This step cannot be skipped.

### Step 3: Filing the I-129 Petition

With the certified LCA, the attorney files the I-129 petition. You will receive an I-797C receipt notice confirming USCIS has the petition. **This receipt is the trigger for portability — keep it safe.**

### Step 4: Starting Work

You can begin working for the new employer on or after the date USCIS receives the petition (the receipt date), provided you meet the portability conditions. Many people choose to wait for the receipt notice in hand for documentation purposes.

### Step 5: USCIS Decision

- **Premium processing** ($2,805 as of 2026): USCIS acts within 15 business days — issuing an approval, RFE, or denial. Highly recommended for transfers to reduce uncertainty.
- **Standard processing**: Several months. You can keep working under portability the entire time.

## When Should You Give Notice at Your Current Job?

This is the strategic question. Common approaches:

- **Conservative**: Wait until the new petition is approved before resigning. Safest, but you carry two jobs' worth of risk and the new employer may want you sooner.
- **Balanced**: Resign after the new petition is filed and you have the receipt notice, relying on portability. This is the most common approach.
- **Aggressive**: Resign at offer acceptance. Riskiest — if anything delays the LCA or filing, you could have a status gap.

Most attorneys recommend waiting until at least the receipt notice before giving notice, and ideally choosing premium processing for faster certainty.

## What About the 60-Day Grace Period?

If you have already left your old job (or were laid off), you may be relying on the 60-day grace period. In that case, the new I-129 must be filed **before your grace period ends**. The grace period and portability work together: the grace period keeps you in status while you find the job; the filed petition lets you start working.

## Premium Processing: Worth It for Transfers?

For transfers, premium processing is usually worth the cost because:

- It removes months of uncertainty about whether the petition will be approved
- Some new employers will not let you start until approval — premium gets you there in 15 business days
- If an RFE is issued, you learn quickly and can respond rather than waiting months

## Does Transferring Reset Your H-1B 6-Year Clock?

No. Your H-1B is subject to a **6-year maximum** across all employers. Transferring does not reset this clock — your time with the previous employer still counts. However, if you have an approved I-140 or qualify under AC21, you may be able to extend beyond 6 years (covered in a separate guide).

## Common H-1B Transfer Mistakes

**Mistake 1: Resigning before the petition is filed.** If the LCA or filing is delayed, you could fall out of status. Wait for the receipt notice.

**Mistake 2: Assuming the transfer resets your 6-year clock.** It does not. Track your cumulative H-1B time.

**Mistake 3: Skipping premium processing on a tight timeline.** Standard processing can take months — premium removes the uncertainty for a few thousand dollars.

**Mistake 4: Not keeping your I-797C receipt.** It is your proof of work authorization under portability. Keep digital and physical copies.

**Mistake 5: Letting your I-94 expire.** Portability requires the new petition to be filed before your authorized stay ends. Know your I-94 date.

## Track Your H-1B Transfer with DueVisa

A transfer involves several dates that all matter: your current I-94 expiry, the new petition's receipt date, and the approval. DueVisa tracks them together so you always know your status — and reminds you well before your I-94 runs out.

Add your H-1B dates at duevisa.com. Free for your first 3 documents.
    `,
    faqs: [
      {
        q: "How long does an H-1B transfer take?",
        a: "The full process typically takes a few weeks to prepare and file (including ~7 business days for LCA certification), after which USCIS decides the petition. With premium processing, USCIS acts within 15 business days; standard processing can take 2 to 6+ months. Importantly, you can usually start working at the new employer as soon as the petition is filed under H-1B portability — you don't have to wait for approval.",
      },
      {
        q: "When can I start working at my new employer on an H-1B transfer?",
        a: "Under H-1B portability (AC21), you can begin working for the new employer as soon as USCIS receives the new I-129 petition, confirmed by the I-797C receipt notice. You must have been in valid H-1B status, the petition must be non-frivolous and filed before your authorized stay expires, and you must not have worked without authorization. You do not need to wait for the petition to be approved.",
      },
      {
        q: "Is there a separate form for an H-1B transfer?",
        a: "No. There is no dedicated 'transfer' form. Your new employer files a new Form I-129 H-1B petition on your behalf. Because you already hold an H-1B and are counted against the cap, this petition is cap-exempt and is not subject to the annual H-1B lottery — which makes transfers much more straightforward than a first-time H-1B.",
      },
      {
        q: "Should I quit my current job before the H-1B transfer is approved?",
        a: "Most immigration attorneys recommend waiting until at least the new petition is filed and you have the I-797C receipt notice before resigning, so you can rely on H-1B portability. Resigning before the petition is filed creates the risk of a status gap if the LCA or filing is delayed. Some workers wait for full approval (faster with premium processing) for maximum certainty.",
      },
      {
        q: "Does an H-1B transfer reset my 6-year limit?",
        a: "No. The H-1B 6-year maximum applies across all employers, and transferring does not reset the clock — your time with previous employers still counts. However, if you have an approved I-140 immigrant petition or otherwise qualify under AC21, you may be able to extend your H-1B beyond the 6-year limit.",
      },
      {
        q: "Is premium processing worth it for an H-1B transfer?",
        a: "For most transfers, yes. Premium processing ($2,805 as of 2026) gets a USCIS decision within 15 business days, removing months of uncertainty. It's especially valuable if your new employer won't let you start until approval, or if you want to know quickly whether an RFE will be issued so you can respond. Always confirm the current premium processing fee on uscis.gov.",
      },
      {
        q: "What if I was laid off — can I still transfer my H-1B?",
        a: "Yes. If you were laid off, you have a 60-day grace period to find a new employer. The new employer's I-129 petition must be filed before your grace period ends. The grace period keeps you in valid status while you job-hunt, and the filed petition lets you begin working under portability. File as early in the grace period as possible given processing times.",
      },
    ],
  },
  "how-to-check-your-i94": {
    title: "How to Check Your I-94 Online: Step-by-Step Guide (2026)",
    description: "Your I-94 — not your visa stamp — controls how long you can legally stay in the US. Here's how to find it, read it, and fix errors, with screenshots-level detail.",
    date: "June 22, 2026",
    readTime: "10 min",
    category: "General",
    content: `
Your I-94 is the single most important number in your US immigration life — and most visa holders have never actually looked at it. It is not your visa stamp. It is not your I-797 approval notice. It is the official record of how long you are legally permitted to stay in the United States, and it is available online for free in about two minutes.

This guide walks you through exactly how to find your I-94, how to read every field on it, and what to do if something is wrong.

## Quick Answer

To check your I-94, go to the official CBP website at **i94.cbp.dhs.gov**, click "Get Most Recent I-94," and enter your name, date of birth, and passport details exactly as they appear in your passport. Your most recent I-94 record will display your **admission date, class of admission (visa category), and "Admit Until" date** — the date by which you must leave or extend your status. This "Admit Until" date, not your visa stamp expiration, controls how long you can legally stay. The service is free; never pay a third-party site for it.

## What Is an I-94, Exactly?

The Form I-94 is the **Arrival/Departure Record** issued by US Customs and Border Protection (CBP) every time you enter the United States. It records:

- The date you were admitted
- The immigration status (class of admission) you were granted
- The date until which you are authorized to stay (the "Admit Until" date)

Since 2013, CBP has automated the I-94 for most travelers arriving by air and sea — you no longer get the small white paper card stapled into your passport. Instead, your I-94 is created electronically and is available to retrieve online.

## I-94 vs Visa Stamp vs I-797: Which Date Matters?

This is the confusion that gets people in trouble. These are three different documents with three different dates:

| Document | What It Is | Which Date Controls Your Stay? |
|----------|-----------|-------------------------------|
| Visa stamp (in passport) | Permission to *travel* to a US port of entry | No — it only controls when you can seek entry |
| I-797 approval notice | USCIS approval of a petition (e.g., H-1B) | Sometimes — but your actual admission is on the I-94 |
| I-94 record | CBP's record of your *authorized stay* | Yes — the "Admit Until" date is what matters |

Your visa stamp can be expired while you are still perfectly legal in the US, because the I-94 governs your stay — not the stamp. Conversely, you can have a valid multi-year visa stamp but an I-94 that expires much sooner. **Always trust the I-94 date.**

## Step-by-Step: How to Retrieve Your I-94

### Step 1: Go to the official CBP website

Open your browser and go to **i94.cbp.dhs.gov**. This is the only official, free source. Be wary of look-alike sites that charge a fee — the government service costs nothing.

### Step 2: Click "Get Most Recent I-94"

On the homepage, select the option to retrieve your most recent I-94. You will be asked to consent to the terms of use.

### Step 3: Enter your details exactly as in your passport

You will need to provide:

- First (given) name
- Last (family/surname) name
- Date of birth
- Passport number
- Country of issuance of the passport

**Critical**: Enter your name exactly as it appears in the passport you used to enter the US, including the order of names. Name mismatches are the number one reason the system says "not found."

### Step 4: Review your I-94 record

Once submitted, your most recent I-94 displays on screen with your admission record. You can print it or save it as a PDF for your records.

### Step 5: (Optional) Check your travel history

The same website offers a "View Travel History" option, which shows your arrivals and departures over the past several years. This is useful for counting days present for tax residency, naturalization, or visa applications — though CBP notes the travel history may not be 100% complete.

## How to Read Your I-94: Every Field Explained

When your record displays, you will see several fields. Here is what each one means:

- **Admission (I-94) Record Number** — an 11-digit number unique to this admission. You may need this for applications.
- **Most Recent Date of Entry** — the date you last entered the US.
- **Class of Admission** — your visa category as admitted (e.g., H-1B, F-1, B-2, L-1). Confirm this matches the status you expect.
- **Admit Until Date** — the most important field. This is the last date you are authorized to remain in the US in this status. If it says "D/S," see below.

## What Does "D/S" Mean on an I-94?

If your "Admit Until" date says **D/S**, it stands for **Duration of Status**. This is common for F-1 students, J-1 exchange visitors, and some other categories. It means you are authorized to stay for as long as you maintain valid status (e.g., enrolled full-time and following program rules) rather than until a fixed calendar date.

D/S does not mean "stay forever." If you fall out of status — for example, by dropping below full-time enrollment — you can begin accruing unlawful presence even though no fixed date appears on your I-94.

## Common I-94 Errors and How to Fix Them

CBP officers occasionally make data-entry mistakes. The most common errors:

- **Wrong "Admit Until" date** — for example, an H-1B holder admitted only until their visa stamp date instead of their I-797 petition validity date
- **Wrong class of admission** — admitted in the wrong category
- **Misspelled name or wrong passport number**

If you find an error:

1. **For errors at an airport/seaport (air or sea arrival)**: Contact a CBP Deferred Inspection site or visit i94.cbp.dhs.gov for correction guidance.
2. **For errors at a land border**: Visit a CBP port of entry or Deferred Inspection office.
3. Bring your passport, visa, I-797 (if applicable), and any supporting documents.

Fix errors **immediately**. An incorrect I-94 date can cause you to unknowingly overstay, which has serious consequences.

## Why You Should Check Your I-94 After Every Entry

Make it a habit: every single time you re-enter the US, check your I-94 within a few days. Here's why:

- CBP may admit you to a date earlier than you expect (commonly tied to passport expiry)
- An error caught in week one is easy to fix; an error discovered after you've overstayed is not
- Your "Admit Until" date — not your I-797 or visa — is what an immigration officer, employer, or DMV will rely on

## The "Passport Rule" That Catches People Off Guard

CBP generally cannot admit you past the expiration date of your passport. So if your passport expires before your visa petition does, your I-94 may be cut short to your passport's expiry date — even if your H-1B petition is valid for two more years.

The fix: renew your passport well before it expires, and after each entry, verify your I-94 "Admit Until" date reflects your full authorized period. If it was shortened due to passport expiry, you may need to renew your passport and then correct or extend your I-94.

## Track Your I-94 Date with DueVisa

Once you know your "Admit Until" date, the next step is making sure you never forget it. DueVisa lets you enter your I-94 expiration once and sends you reminders at 180, 90, 60, 30, and 7 days before your authorized stay ends — so a missed date never turns into an overstay.

Add your I-94 at duevisa.com. Free for your first 3 documents.
    `,
    faqs: [
      {
        q: "Where do I check my I-94 online?",
        a: "Go to the official CBP website at i94.cbp.dhs.gov and click 'Get Most Recent I-94.' Enter your name, date of birth, and passport details exactly as they appear in your passport. The service is completely free — avoid third-party sites that charge a fee for what the government provides at no cost.",
      },
      {
        q: "Is the I-94 the same as my visa stamp?",
        a: "No. Your visa stamp (in your passport) is permission to travel to a US port of entry and request admission. Your I-94 is CBP's record of how long you are actually authorized to stay once admitted. The I-94 'Admit Until' date controls your legal stay — your visa stamp can even be expired while you remain perfectly legal in the US.",
      },
      {
        q: "What does 'D/S' mean on my I-94?",
        a: "D/S stands for 'Duration of Status.' It appears instead of a fixed date for categories like F-1 students and J-1 exchange visitors. It means you can stay as long as you maintain valid status (such as full-time enrollment), rather than until a specific calendar date. However, if you fall out of status, you can begin accruing unlawful presence even with D/S on your I-94.",
      },
      {
        q: "Why can't the I-94 website find my record?",
        a: "The most common reason is a name mismatch. Enter your name exactly as it appears in the passport you used to enter the US, including the correct order of given and family names. Other causes include using a different passport than the one you entered with, or entering by land border before the record was processed. If problems persist, contact a CBP Deferred Inspection office.",
      },
      {
        q: "My I-94 'Admit Until' date is wrong. What do I do?",
        a: "CBP data-entry errors do happen. To correct an air or sea arrival record, contact a CBP Deferred Inspection site or check i94.cbp.dhs.gov for guidance. For land-border errors, visit a CBP port of entry. Bring your passport, visa, and I-797 approval notice if applicable. Fix errors immediately — an incorrect date can cause you to unknowingly overstay.",
      },
      {
        q: "Why is my I-94 date earlier than my visa or I-797?",
        a: "The most common reason is your passport expiration. CBP generally cannot admit you past your passport's expiry date, so if your passport expires before your H-1B petition, your I-94 may be shortened to the passport date. Renew your passport well in advance and verify your I-94 after each entry to ensure it reflects your full authorized stay.",
      },
      {
        q: "Do I need to check my I-94 every time I enter the US?",
        a: "Yes — it's a strongly recommended habit. CBP may admit you to a different date than you expect, and catching an error in the first week is far easier than discovering it after you've overstayed. Since your 'Admit Until' date governs your legal stay, verifying it after every entry protects you from accidental status violations.",
      },
    ],
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

  const url = `https://duevisa.com/blog/${params.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": post.title,
        "description": post.description,
        "datePublished": post.date,
        "dateModified": post.date,
        "author": { "@type": "Organization", "name": "DueVisa", "url": "https://duevisa.com" },
        "publisher": {
          "@type": "Organization",
          "name": "DueVisa",
          "logo": { "@type": "ImageObject", "url": "https://duevisa.com/favicon.svg" },
        },
        "mainEntityOfPage": { "@type": "WebPage", "@id": url },
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://duevisa.com" },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://duevisa.com/blog" },
          { "@type": "ListItem", "position": 3, "name": post.title, "item": url },
        ],
      },
      ...(post.faqs && post.faqs.length > 0
        ? [{
            "@type": "FAQPage",
            "mainEntity": post.faqs.map((f) => ({
              "@type": "Question",
              "name": f.q,
              "acceptedAnswer": { "@type": "Answer", "text": f.a },
            })),
          }]
        : []),
    ],
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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

          {/* FAQ section */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="mt-14">
              <h2 className="font-syne font-bold text-primary text-2xl mb-6">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {post.faqs.map((f, i) => (
                  <details key={i} className="card group cursor-pointer" style={{ padding: "1.25rem 1.5rem" }}>
                    <summary className="flex items-center justify-between font-semibold text-sm list-none cursor-pointer text-primary">
                      {f.q}
                      <span className="text-xs font-bold ml-4 transition-all duration-200 group-open:rotate-45" style={{ color: "var(--text-muted)" }}>+</span>
                    </summary>
                    <p className="text-sm leading-relaxed mt-4 pt-4 text-secondary" style={{ borderTop: "1px solid var(--border-subtle)" }}>{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}

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
