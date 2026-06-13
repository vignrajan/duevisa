# DueVisa — Master Issue Backlog
Generated: 2026-06-13

---

## P0 — Launch Blockers

| # | Title | Impact | Effort | Fix Strategy |
|---|-------|--------|--------|--------------|
| P0-1 | Redundant + conflicting font imports in layout.tsx | Body uses Syne/Cormorant loaded in layout but globals.css loads Plus Jakarta Sans separately — wastes ~80kb bandwidth, causes FOUT | Low | Remove wrong fonts from layout.tsx, consolidate to next/font or single @import |
| P0-2 | Delete Account does nothing — only signs user out | Deceptive. Login page promises "delete all data at any time". Privacy/legal liability. | Medium | Create DELETE /api/account route using admin client, call supabase.auth.admin.deleteUser() |
| P0-3 | Stripe price IDs are hardcoded placeholders | "price_pro_monthly", "price_pro_yearly", "price_team_monthly" — any upgrade attempt creates a broken Stripe session | Low | Add env var guard + clear user-facing message; no code change until Stripe is configured |
| P0-4 | Zero analytics — no way to measure signups, conversions, or funnel | Can't make product decisions or validate launch | Medium | Add PostHog or GA4 script to root layout |
| P0-5 | No favicon — browser tab shows blank icon | Trust/brand issue for first-time visitors | Low | Add favicon to layout metadata and create SVG icon |

---

## P1 — Critical

| # | Title | Impact | Effort | Fix Strategy |
|---|-------|--------|--------|--------------|
| P1-1 | Sitemap missing 11 pages | SEO — pages not indexed by Google | Low | Add all public pages to sitemap.ts |
| P1-2 | "Terms" in signup is plain text, not a link | Legal: users don't know what they're agreeing to | Low | Wrap in <Link href="/terms"> |
| P1-3 | Onboarding allows free users to enable SMS | UI says SMS is Pro but doesn't prevent enabling it during onboarding — user expectation mismatch | Low | Show locked state / don't save reminder_sms=true for free plan users |
| P1-4 | serverActions allowedOrigins missing Vercel preview URLs | Server actions fail on staging/preview deployments | Low | Add *.vercel.app to next.config.mjs allowedOrigins |
| P1-5 | No favicon/icon in public directory or metadata | Empty browser tab, missing OG touch icon | Low | Create SVG favicon via metadata icons config |
| P1-6 | Middleware only protects /dashboard prefix, not /api routes | API routes rely on per-route auth checks — inconsistent | Medium | Verify all API routes have auth guards (they do, but document) |
| P1-7 | No rate limiting on /api/waitlist | Can be spammed — fills DB and burns Resend quota | Medium | Add IP-based rate limiting or Vercel edge rate limit |
| P1-8 | Blog images are null for all 6 posts | Blog listing looks incomplete, bad for SEO | Low | Use colored category pill or generate placeholder OG image |

---

## P2 — Important

| # | Title | Impact | Effort | Fix Strategy |
|---|-------|--------|--------|--------------|
| P2-1 | No schema.org structured data | Missing rich results in Google — lower CTR | Medium | Add Organization + WebSite + FAQPage JSON-LD to relevant pages |
| P2-2 | Font loading via Google Fonts CDN | Render-blocking, privacy concern (GDPR) | Medium | Use next/font/google for Zero Layout Shift + self-hosting |
| P2-3 | Sitemap lacks lastModified dates on static pages | Google freshness signal missing | Low | Add lastModified to all sitemap entries |
| P2-4 | No Content Security Policy headers | XSS risk — no CSP header set | Medium | Add security headers in next.config.mjs |
| P2-5 | attorney_leads RLS allows insert with null user_id but can't query | Silent data collection issue | Low | Make contact_email NOT NULL, improve RLS |
| P2-6 | No error boundary in DashboardClient | Unhandled JS errors crash entire dashboard | Medium | Add React error boundary |
| P2-7 | Missing ARIA labels on icon-only buttons in Navbar | Accessibility — screen readers can't describe theme toggle | Low | Add aria-label to theme toggle and hamburger |

---

## P3 — Nice To Have

| # | Title | Impact | Effort |
|---|-------|--------|--------|
| P3-1 | Blog posts have no real content (placeholder dates in 2026) | Content quality | High |
| P3-2 | No robots meta on /login /signup to prevent indexing | Wasted crawl budget | Low |
| P3-3 | Font-display: swap not set for Google Fonts @import | Performance — FOUT worse without it | Low |
| P3-4 | No sitemap for blog posts (dynamic) | Blog SEO | Low |
| P3-5 | Not-found.tsx uses hardcoded dark styles | Doesn't respect light/dark theme | Low |
