# DueVisa — Complete Product Requirements Document
### Immigration Deadline Tracker SaaS
**Domain:** duevisa.com | **Version:** 1.0 | **Date:** April 2026

---

## MASTER PROMPT FOR CLAUDE OPUS

> Copy everything below the divider line and paste it into Claude Opus to begin building.

---

---

# CLAUDE OPUS MASTER PROMPT

You are a senior full-stack engineer and product designer helping me build **DueVisa** — a SaaS immigration deadline tracker at **duevisa.com**.

Your job is to build this product end-to-end, one phase at a time. I will tell you which phase to start with. Be proactive, write complete production-ready code, and never leave placeholders. When you build something, build it fully.

Below is the complete product specification. Study it thoroughly before writing a single line of code.

---

## 1. PRODUCT OVERVIEW

**What it is:** DueVisa is a personal immigration deadline tracker. Users input their visa type and document expiry dates, and get a real-time dashboard showing countdowns to every deadline, color-coded urgency, and automated email reminders before deadlines hit.

**The problem it solves:** Immigrants in the US juggle dozens of expiry dates — visa stamps, work permits (EADs), I-94 status dates, passports, green cards, driver's licenses, and more. Missing any one deadline can result in loss of work authorization, deportation risk, or years of legal delays. There is no dedicated, simple tool for this. People use spreadsheets, sticky notes, or nothing at all.

**Who uses it:**
- H-1B workers (primary — ~600K active in US)
- F-1 international students (~1M in US)
- Green card holders tracking renewal
- TN visa holders (Canadian and Mexican professionals)
- O-1 and L-1 visa holders
- Spouses and dependents on derivative visas

**The goal:** Become THE go-to immigration deadline tracker. Every immigrant in the US should know DueVisa. Think: "Mint.com but for immigration status."

---

## 2. BRAND IDENTITY

**Brand Name:** DueVisa
**Domain:** duevisa.com
**Tagline:** "Know exactly when to act."

**Brand Personality:** Calm, precise, trustworthy, on your side. NOT scary, NOT alarmist. The brand speaks like a knowledgeable friend, not a lawyer.

**Voice — DO say:**
- "Your EAD renewal window opens in 47 days"
- "You're in good standing — next action in 6 months"
- "Start your H-1B renewal process now"

**Voice — DON'T say:**
- "Warning! Your visa is about to expire!"
- "You may be violating immigration law"
- "URGENT: Act immediately"

### Color Palette
| Name | Hex | Usage |
|------|-----|-------|
| Forest Green (Primary) | #0A5C4A | Buttons, links, primary UI |
| Lime (Accent) | #C8F562 | CTAs, highlights, urgency-good |
| Stamp Gold | #E8C547 | Warning state, deadline approaching |
| Midnight (Background) | #050E0B | Dark background |
| Card Dark | #0F2419 | Card backgrounds |
| Sage | #7A9E8A | Secondary text |
| Critical Red | #EF4444 | Expired / critical state only |

### Typography
| Font | Weight | Usage |
|------|--------|-------|
| Cormorant Garamond | 600-700 | Hero headlines, display text |
| Syne | 400-800 | UI labels, navigation, body |
| DM Mono | 300-500 | Dates, countdown numbers, code |

Load from Google Fonts:
```
https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap
```

### Logo
- Icon: A square with rounded corners (like a stamp) containing 3 horizontal lines
- Wordmark: "Due" in white + "Visa" in #C8F562 (lime)
- Subtext: "deadline tracker" in DM Mono, uppercase, tracked out

---

## 3. TECH STACK

Use this exact stack. Do not substitute without asking.

| Layer | Tool | Why |
|-------|------|-----|
| Frontend | Next.js 14 (App Router) | SEO, fast pages, React |
| Styling | Tailwind CSS | Rapid development |
| Database | Supabase (PostgreSQL) | Auth + DB + realtime, free tier |
| Auth | Supabase Auth | Email/password + Google OAuth |
| Email | Resend | Developer-friendly, cheap |
| Payments | Stripe | Industry standard |
| Deployment | Vercel | Free tier, instant deploys |
| Analytics | Plausible or Umami | Privacy-first, cheap |

### Environment Variables needed:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_APP_URL=https://duevisa.com
```

---

## 4. DATABASE SCHEMA

Build this exact schema in Supabase. Use Row Level Security (RLS) on all tables.

```sql
-- Users (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'team')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  reminder_email BOOLEAN DEFAULT true,
  reminder_sms BOOLEAN DEFAULT false,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Document trackers
CREATE TABLE documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  -- Document identity
  doc_type TEXT NOT NULL, -- 'h1b_stamp', 'i94', 'ead', 'passport', 'green_card', etc.
  label TEXT NOT NULL, -- Custom label e.g. "H-1B Visa Stamp"
  visa_category TEXT NOT NULL, -- 'H-1B', 'F-1', 'Green Card', 'TN', 'O-1', 'L-1'
  -- Dates
  expiry_date DATE NOT NULL,
  issued_date DATE,
  -- Metadata
  document_number TEXT, -- Optional: actual document number
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  -- Renewal tracking
  renewal_started BOOLEAN DEFAULT false,
  renewal_filed_date DATE,
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Family members (for tracking dependents)
CREATE TABLE family_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT NOT NULL,
  relationship TEXT NOT NULL, -- 'spouse', 'child', 'dependent'
  visa_category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reminder log (track what emails were sent)
CREATE TABLE reminder_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  days_before INTEGER NOT NULL, -- 180, 90, 60, 30, 7
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  email_id TEXT -- Resend email ID for tracking
);

-- Attorney leads (for monetization)
CREATE TABLE attorney_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  visa_category TEXT,
  issue_description TEXT,
  contact_email TEXT,
  contacted_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminder_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only see own profile" ON profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Users can only see own documents" ON documents FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can only see own family" ON family_members FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can only see own reminders" ON reminder_logs FOR ALL USING (auth.uid() = user_id);
```

---

## 5. VISA TYPES & DOCUMENTS

This is the core data structure. Build this as a constants file.

```typescript
// /lib/visa-config.ts

export const VISA_CONFIG = {
  "H-1B": {
    label: "H-1B Specialty Worker",
    icon: "💼",
    color: "#6366f1",
    documents: [
      { type: "h1b_stamp", label: "H-1B Visa Stamp", description: "Stamp in your passport (not same as status)", renewLeadDays: 90, required: true },
      { type: "i94", label: "I-94 Authorized Stay", description: "Your authorized period of stay — most critical", renewLeadDays: 180, required: true },
      { type: "i797", label: "I-797 Petition Approval", description: "USCIS H-1B petition — employer must file extension", renewLeadDays: 180, required: true },
      { type: "passport", label: "Passport", description: "Must be valid 6 months beyond any travel date", renewLeadDays: 270, required: true },
      { type: "ead", label: "EAD Work Permit", description: "If on H-4 EAD or combo card — apply 180 days before", renewLeadDays: 180, required: false },
      { type: "drivers_license", label: "Driver's License", description: "Many states tie to visa/status expiry", renewLeadDays: 60, required: false },
    ]
  },
  "F-1": {
    label: "F-1 International Student",
    icon: "🎓",
    color: "#10b981",
    documents: [
      { type: "f1_stamp", label: "F-1 Visa Stamp", description: "Stamp in passport — needed to re-enter US", renewLeadDays: 90, required: true },
      { type: "i20", label: "I-20 Program End Date", description: "Your DS-2019 or I-20 — maintain full-time status", renewLeadDays: 120, required: true },
      { type: "sevis", label: "SEVIS Fee / Registration", description: "Student exchange visitor system — check with DSO", renewLeadDays: 90, required: true },
      { type: "passport", label: "Passport", description: "Must be valid throughout program", renewLeadDays: 270, required: true },
      { type: "opt_ead", label: "OPT EAD", description: "Optional Practical Training — apply 90 days before graduation", renewLeadDays: 150, required: false },
      { type: "stem_opt", label: "STEM OPT Extension", description: "24-month extension — apply 90 days before OPT ends", renewLeadDays: 120, required: false },
    ]
  },
  "Green Card": {
    label: "Lawful Permanent Resident",
    icon: "🟢",
    color: "#f59e0b",
    documents: [
      { type: "green_card", label: "Green Card (I-551)", description: "Permanent Resident Card — renew 6 months before expiry", renewLeadDays: 180, required: true },
      { type: "passport", label: "Home Country Passport", description: "Keep valid for travel", renewLeadDays: 270, required: true },
      { type: "reentry_permit", label: "Re-entry Permit", description: "If traveling abroad for 1+ year — apply before leaving", renewLeadDays: 90, required: false },
      { type: "i751", label: "I-751 (Remove Conditions)", description: "If on 2-year conditional green card — file within 90-day window", renewLeadDays: 90, required: false },
      { type: "n400", label: "N-400 Citizenship Eligibility", description: "Track when you're eligible to apply for citizenship", renewLeadDays: 90, required: false },
    ]
  },
  "TN": {
    label: "TN Visa (Canada/Mexico)",
    icon: "🍁",
    color: "#ef4444",
    documents: [
      { type: "tn_i94", label: "TN Status (I-94)", description: "Authorized period of stay — renew at port of entry or with I-129", renewLeadDays: 180, required: true },
      { type: "passport", label: "Passport", description: "Must be valid throughout TN period", renewLeadDays: 270, required: true },
      { type: "employer_letter", label: "Employer Support Letter", description: "Updated letter needed for any TN renewal", renewLeadDays: 90, required: true },
    ]
  },
  "O-1": {
    label: "O-1 Extraordinary Ability",
    icon: "⭐",
    color: "#8b5cf6",
    documents: [
      { type: "o1_stamp", label: "O-1 Visa Stamp", description: "Stamp in passport — needed for re-entry", renewLeadDays: 90, required: true },
      { type: "i94", label: "I-94 Authorized Stay", description: "Your authorized period of stay", renewLeadDays: 180, required: true },
      { type: "i797", label: "I-797 Approval Notice", description: "USCIS O-1 petition — employer/agent files extension", renewLeadDays: 180, required: true },
      { type: "passport", label: "Passport", description: "Must be valid 6 months beyond travel", renewLeadDays: 270, required: true },
    ]
  },
  "L-1": {
    label: "L-1 Intracompany Transfer",
    icon: "🏢",
    color: "#06b6d4",
    documents: [
      { type: "l1_stamp", label: "L-1 Visa Stamp", description: "Stamp in passport — needed for re-entry", renewLeadDays: 90, required: true },
      { type: "i94", label: "I-94 Authorized Stay", description: "Your authorized period of stay", renewLeadDays: 180, required: true },
      { type: "i797", label: "I-797 Petition Approval", description: "USCIS L-1 petition — employer must file", renewLeadDays: 180, required: true },
      { type: "passport", label: "Passport", description: "Must be valid 6 months beyond travel", renewLeadDays: 270, required: true },
    ]
  },
  "H-4": {
    label: "H-4 Dependent Spouse",
    icon: "💑",
    color: "#ec4899",
    documents: [
      { type: "h4_stamp", label: "H-4 Visa Stamp", description: "Stamp in passport — tied to H-1B spouse status", renewLeadDays: 90, required: true },
      { type: "i94", label: "I-94 Authorized Stay", description: "Authorized period of stay", renewLeadDays: 180, required: true },
      { type: "passport", label: "Passport", description: "Keep valid at all times", renewLeadDays: 270, required: true },
      { type: "h4_ead", label: "H-4 EAD Work Permit", description: "Only if H-1B spouse has approved I-140 — apply 180 days before expiry", renewLeadDays: 180, required: false },
    ]
  }
}

export type VisaType = keyof typeof VISA_CONFIG;
```

---

## 6. FEATURE SPECIFICATIONS

### 6.1 Authentication
- Email + password signup
- Google OAuth (one-click for gmail users — huge for tech workers)
- Email verification required
- Password reset flow
- On signup: collect name, visa type, country of origin (optional)

### 6.2 Onboarding Flow (4 steps)
**Step 1 — Welcome:** "What visa type are you on?" (show visa cards with icons)
**Step 2 — Add Documents:** Show all relevant document types for their visa. Required ones pre-selected. Date pickers for expiry dates.
**Step 3 — Add Family:** "Do you have dependents on a visa?" Optional — add spouse/children with their own documents.
**Step 4 — Reminders:** "How do you want to be reminded?" Email (default on), SMS (pro feature), frequency choices.

### 6.3 Dashboard (main screen)
Layout:
- Top: Greeting + summary stats (total docs, docs needing attention, next deadline in X days)
- Alert banner: If any document expires within 60 days, show prominent banner
- Document cards: Sorted by urgency (soonest first)
- Each card shows: Document name, expiry date, days remaining, status badge, "Start Renewal" CTA if in window

Status logic:
```
EXPIRED:  expiry_date < today
CRITICAL: days_remaining <= 30
WARNING:  days_remaining <= renewLeadDays (document-specific)
GOOD:     days_remaining > renewLeadDays
```

### 6.4 Document Management
- Add new document
- Edit expiry date
- Mark renewal as started (changes card state)
- Mark renewal as filed (with filed date)
- Archive document (hide from dashboard)
- Upload document scan (pro feature — store in Supabase Storage)

### 6.5 Reminder System (CRITICAL FEATURE)
Build a cron job (Vercel cron or Supabase Edge Functions) that runs DAILY and:
1. Queries all active documents where expiry_date is in {180, 90, 60, 30, 7} days from today
2. Checks reminder_logs to avoid duplicates (don't send same reminder twice)
3. Sends personalized email via Resend
4. Logs to reminder_logs table

Email reminder template must include:
- Document name and expiry date
- Days remaining (bold, large)
- What happens if they miss it (plain English)
- Specific action they should take NOW
- Link to their dashboard
- "Find an Immigration Attorney" link (monetization)

Reminder schedule per document:
- 180 days: "Start preparing — here's your renewal checklist"
- 90 days: "Your renewal window opens. Here's what to do."
- 60 days: "Action recommended — don't wait longer"
- 30 days: "Urgent — start your renewal immediately"
- 7 days: "Critical — file immediately if you haven't"

### 6.6 Pricing & Plans

#### Free Plan
- Up to 3 documents
- Email reminders at 30 and 7 days only
- No family members
- No document storage
- No SMS

#### Pro Plan — $9/month or $79/year
- Unlimited documents
- Email reminders at all intervals (180, 90, 60, 30, 7 days)
- Up to 5 family members
- Document scan storage (10GB)
- SMS reminders
- Priority email support
- Export to PDF/CSV

#### Team Plan — $29/month (for HR teams)
- Everything in Pro
- Up to 20 employee profiles
- HR admin dashboard
- Bulk document import (CSV)
- Team renewal status overview
- Dedicated support

### 6.7 Attorney Referral (Monetization #2)
- "Need an attorney?" CTA on every critical/warning card
- Clicking opens a modal: "Tell us about your situation"
- Collects: visa type, issue description, email
- Saves to attorney_leads table
- Sends lead to partnered immigration attorneys (you charge attorneys $30-80/lead)
- Simple directory page: /attorneys — list of vetted immigration lawyers by state

### 6.8 Settings Page
- Profile: name, email, phone
- Visa type (can change)
- Notification preferences: which reminders, email vs SMS
- Change password
- Billing: view plan, upgrade, cancel
- Export data (GDPR compliance)
- Delete account

---

## 7. PAGE STRUCTURE

```
/ (landing page)
/pricing
/attorneys
/blog (SEO content)
/blog/[slug]
/login
/signup
/signup/onboarding
/dashboard (protected)
/dashboard/documents/add
/dashboard/documents/[id]
/dashboard/family
/dashboard/settings
/dashboard/settings/billing
/api/reminders/send (cron endpoint)
/api/stripe/webhook
/api/stripe/create-checkout
```

---

## 8. LANDING PAGE REQUIREMENTS

The landing page is your #1 acquisition channel. It must be exceptional.

**Above the fold:**
- Headline: "Never miss an immigration deadline again." (Cormorant Garamond, large)
- Subheadline: "DueVisa tracks every visa, permit, and document — and reminds you before it's too late."
- CTA: "Start tracking free →" (lime green button)
- Hero image: Dashboard mockup / animated countdown cards

**Social proof section:**
- "Trusted by 10,000+ immigrants" (use aspirational numbers at launch, update as you grow)
- Logos of visa types supported (H-1B, F-1, Green Card, TN, O-1, L-1)

**Problem section:**
- "One missed deadline can cost you everything."
- Show the stakes: job loss, deportation risk, years of delays
- Keep it factual, not fear-mongering

**How it works (3 steps):**
1. Select your visa type
2. Enter your document dates
3. Get reminded at the right time — automatically

**Feature highlights:**
- All visa types covered
- Smart reminders at 180, 90, 60, 30, and 7 days
- Family members included
- Plain English — no legal jargon

**Pricing section:** Show 3 plans (Free / Pro / Team)

**FAQ section:** (important for SEO)
- When should I start my H-1B renewal?
- What's the difference between my visa stamp and I-94?
- Can I work if my EAD is expired?
- What happens if I overstay my visa?

**Footer:** Links, social, privacy policy, terms

---

## 9. SEO STRATEGY

### Target Keywords (write blog posts for these)
| Keyword | Monthly Searches | Priority |
|---------|-----------------|----------|
| when to renew H-1B visa | 2,400/mo | HIGH |
| EAD renewal timeline 2026 | 3,100/mo | HIGH |
| I-94 vs visa stamp difference | 1,800/mo | HIGH |
| green card renewal reminder | 900/mo | MEDIUM |
| F-1 OPT deadline | 2,200/mo | HIGH |
| immigration document checklist | 1,400/mo | MEDIUM |
| H-4 EAD renewal process | 800/mo | MEDIUM |
| TN visa renewal process | 1,100/mo | MEDIUM |

### Blog Post Templates to Build
1. "The Complete H-1B Renewal Timeline: When to Start and What to Do"
2. "I-94 vs Visa Stamp: What's the Difference and Which One Matters"
3. "EAD Renewal in 2026: Timeline, Process, and What Changed"
4. "The F-1 Student Immigration Checklist: Every Date You Need to Track"
5. "What Happens If You Overstay Your Visa? (And How to Avoid It)"
6. "Green Card Renewal Guide: When to Apply and What Documents You Need"

### Technical SEO
- Use Next.js metadata API for all pages
- Generate sitemap.xml dynamically
- Structured data (FAQ schema for FAQ sections)
- OpenGraph images for all blog posts
- Page speed: aim for 95+ Lighthouse score

---

## 10. EMAIL TEMPLATES

Build these in Resend with React Email.

### Welcome Email
Subject: "Your immigration deadline tracker is ready 🛂"
- Welcome, show their first document countdown
- Link to complete their profile
- Show what reminders they'll receive

### Reminder Email (180 days)
Subject: "[Document] renewal window opens in 180 days — here's your checklist"
- Friendly, calm tone
- Exact expiry date
- Renewal checklist specific to document type
- "Set a reminder in your calendar" link
- Attorney CTA in footer

### Reminder Email (30 days)
Subject: "⚠ [Document] expires in 30 days — start your renewal now"
- More urgent but not panicked
- Direct action steps
- Attorney CTA more prominent

### Reminder Email (7 days)
Subject: "🚨 [Document] expires in 7 days"
- Very direct
- "If you haven't filed, do it today"
- Emergency attorney contact

---

## 11. LAUNCH STRATEGY

### Week 1–2: Build MVP
- Auth (signup/login)
- Onboarding flow
- Dashboard with document cards
- Add/edit documents
- Basic email reminders (manual trigger first)

### Week 3: Polish & Test
- Set up cron job for automated reminders
- Stripe integration for Pro plan
- Mobile responsive check
- Test with 5 real immigrants

### Week 4: Launch
Post in these communities on the same day:
- r/immigration (1.2M members) — post: "I built a free immigration deadline tracker — DueVisa"
- r/h1b — "Built something for our community"
- r/f1visa — "Free tool for tracking OPT/STEM OPT deadlines"
- r/USCIS — Share with honest story
- LinkedIn — Target HR professionals, immigration attorneys
- IndieHackers — Build in public post
- ProductHunt — Schedule launch

### Month 2+: Growth
- Cold email 50 immigration law firms — offer free attorney listing
- Partner with international student offices at 3 universities
- Build SEO blog (1 post/week)
- Start collecting testimonials

---

## 12. BUILD PHASES

When I give you a phase number, build everything in that phase completely before stopping.

### PHASE 1: Project Setup + Database
- Initialize Next.js 14 app with TypeScript and Tailwind
- Install and configure all dependencies
- Set up Supabase client
- Create all database tables with RLS
- Create /lib/visa-config.ts with all visa types
- Create /lib/utils.ts with date calculation helpers
- Set up environment variable structure

### PHASE 2: Authentication
- Signup page (/signup) with email + Google OAuth
- Login page (/login)
- Auth callback handler
- Protected route middleware
- Profile creation on signup trigger (Supabase function)

### PHASE 3: Onboarding
- 4-step onboarding flow (/signup/onboarding)
- Visa type selection (Step 1)
- Document date entry (Step 2)
- Family members (Step 3)
- Reminder preferences (Step 4)
- Save all data to Supabase

### PHASE 4: Dashboard
- Main dashboard (/dashboard)
- Document cards with countdown rings
- Urgency sorting
- Summary stats bar
- Alert banners for critical deadlines
- Add document modal
- Edit document modal

### PHASE 5: Reminder System
- Vercel cron job setup (vercel.json)
- /api/reminders/send endpoint
- Duplicate prevention logic
- Resend integration
- All 5 email templates (React Email)
- Test reminder send

### PHASE 6: Payments
- Stripe Products setup (Free/Pro/Team)
- /api/stripe/create-checkout endpoint
- /api/stripe/webhook endpoint
- Pricing page (/pricing)
- Upgrade flow from dashboard
- Feature gating (free plan limits)

### PHASE 7: Landing Page
- Full marketing landing page (/)
- Hero section with animated mockup
- Problem/solution sections
- Feature highlights
- Pricing table
- FAQ section
- Footer

### PHASE 8: SEO + Blog
- Blog infrastructure (/blog)
- MDX setup for blog posts
- 3 initial blog posts written
- Sitemap.xml
- Meta tags and OpenGraph
- Structured data

### PHASE 9: Polish + Launch Prep
- Mobile responsiveness audit
- Performance optimization
- Error handling and loading states
- Attorney referral feature
- Settings page complete
- Privacy Policy + Terms of Service pages

---

## 13. UTILITY FUNCTIONS TO BUILD

```typescript
// /lib/utils.ts

// Get days until a date
export function daysUntil(date: Date | string): number

// Get status level for a document
export function getDocumentStatus(daysRemaining: number, renewLeadDays: number): 
  'expired' | 'critical' | 'warning' | 'good'

// Get human-readable time string
export function formatTimeRemaining(days: number): string
// Examples: "3 days", "2 weeks", "4 months", "EXPIRED"

// Check if user is on free plan and over limit
export function isOverFreeLimit(documentCount: number): boolean

// Get next reminder date for a document
export function getNextReminderDate(expiryDate: Date): Date | null

// Calculate renewal start date recommendation
export function getRecommendedRenewalDate(expiryDate: Date, renewLeadDays: number): Date
```

---

## 14. IMPORTANT RULES FOR CLAUDE OPUS

1. **Write complete code.** Never write "// TODO" or "add implementation here". Every function must be fully implemented.

2. **Use the exact brand colors** from Section 2. Do not invent new colors.

3. **Mobile first.** Every component must work on a 375px wide screen.

4. **Error states.** Every form and API call must have proper error handling and user-facing error messages.

5. **Loading states.** Every async operation must have a loading indicator.

6. **Type safety.** Use TypeScript throughout. No `any` types.

7. **Security.** Never expose API keys. Use server-side routes for Stripe and sensitive operations. RLS handles database security.

8. **Accessibility.** All interactive elements need proper aria labels. Color is not the only indicator of status.

9. **Do not use placeholder data** in production components. Use Supabase real data with proper loading/empty states.

10. **Ask before changing the stack.** If you think a different tool would be better, ask first rather than substituting.

---

## 15. WHEN TO START

Tell Claude Opus: **"Start with Phase [number]"**

For a completely fresh start, say: **"Start with Phase 1"**

If you already have the project set up, specify which phase you need.

After each phase is complete, review the output, test it, then come back and say **"Phase [X] looks good, start Phase [X+1]"**

---

*Document prepared: April 2026 | DueVisa v1.0*
