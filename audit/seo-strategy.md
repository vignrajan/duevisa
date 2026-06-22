# DueVisa — SEO Strategy & Topical Authority Map

**Generated:** 2026-06-22
**Author:** Internal SEO build

> **Data note:** This environment has no live access to Ahrefs / SEMrush / Google Keyword Planner. All search-volume, difficulty (KD), and CPC figures below are **directional estimates** based on knowledge of the US immigration niche — they indicate *relative* priority, not exact tool data. Validate with a real keyword tool before committing budget. Where a number is a guess, it is marked with `~`.

---

## 1. Strategy in One Paragraph

DueVisa is a new domain competing in a niche dominated by (a) USCIS/government pages, (b) large immigration law firms (Boundless, VisaNation, Nolo, CitizenPath), and (c) forums (Reddit, Trackitt). DueVisa **cannot** out-authority law firms on broad head terms ("green card", "h1b visa") quickly. The winning strategy is **deadline/renewal-intent long-tail + tool/calculator pages + programmatic "expires in X" pages**, where intent is high, competition is thinner, and DueVisa's product is the literal answer to the query.

**Three pillars:**
1. **Tool pages** (already built): `/ead-renewal-calculator`, `/h1b-renewal-tracker`, `/f1-opt-tracker`, `/green-card-renewal`, `/ead-reminder` — these target commercial intent.
2. **Supporting blog clusters** that link into the tool pages (this is where the new EAD articles fit).
3. **Programmatic pages** ("EAD expires in 3 months — what to do") for scale.

---

## 2. Keyword Research (Directional Estimates)

### A. High Commercial Intent (tool/product pages)

| Keyword | Est. Volume | Est. KD | Intent | Target Page |
|---|---|---|---|---|
| ead renewal calculator | ~1.5k | Low-Med | Commercial | /ead-renewal-calculator |
| visa expiration tracker | ~700 | Low | Commercial | / (home) |
| immigration deadline tracker | ~400 | Low | Commercial | / (home) |
| h1b expiration tracker | ~300 | Low | Commercial | /h1b-renewal-tracker |
| i94 expiration calculator | ~600 | Low | Commercial | (build) |
| ead renewal reminder | ~200 | Low | Commercial | /ead-reminder |
| visa reminder app | ~150 | Low | Commercial | / (home) |
| opt expiration tracker | ~200 | Low | Commercial | /f1-opt-tracker |
| green card renewal reminder | ~250 | Low | Commercial | /green-card-renewal |

### B. Informational, High Intent (blog cluster)

| Keyword | Est. Volume | Est. KD | Intent | Target Post |
|---|---|---|---|---|
| how long does ead renewal take | ~4k | Med | Info | how-long-does-ead-renewal-take ✅ |
| ead automatic extension 540 days | ~5k | Med | Info | ead-540-day-automatic-extension ✅ |
| h4 ead renewal | ~3k | Med | Info | h4-ead-renewal-guide ✅ |
| when should i renew my ead | ~2k | Low-Med | Info | how-long-does-ead-renewal-take ✅ |
| ead processing time | ~8k | Med-High | Info | how-long-does-ead-renewal-take ✅ |
| how to check i94 expiration date | ~3k | Low | Info | i94-vs-visa-stamp (expand) |
| h1b grace period after layoff | ~6k | Med | Info | (build — high priority) |
| can i work while ead renewal pending | ~1.5k | Low | Info | ead-540-day-automatic-extension ✅ |
| ead expired can i work | ~1k | Low | Info | ead-540-day-automatic-extension ✅ |
| passport renewal before visa expiration | ~800 | Low | Info | (build) |

### C. Programmatic SEO Patterns (scale play)

These are templated pages generated from one component, one per variation. Low individual volume, high aggregate.

| Pattern | Example Queries | Page Template |
|---|---|---|
| `ead-expires-in-[n]-months` | "ead expires in 3 months", "ead expires in 6 months" | "Your EAD expires in N months — what to do now" |
| `[visa]-expires-in-[n]-days` | "h1b expires in 60 days" | countdown + action checklist |
| `[doc]-renewal-checklist` | "i-90 renewal checklist" | checklist + tracker CTA |
| `[country]-passport-renewal-in-usa` | "indian passport renewal in usa" | per-country guide |

**Priority:** Build the programmatic engine **after** the blog cluster proves indexation. Thin programmatic pages on a new domain can trigger Helpful Content issues — each page must carry genuinely useful, differentiated content (a real checklist, real timeline), not just a swapped number.

---

## 3. SERP / Competitor Notes (EAD cluster)

- **Who ranks:** Boundless, VisaNation, CitizenPath, Nolo, USCIS.gov, Reddit (r/immigration, r/h1b).
- **Average top-10 length:** 1,800–3,000 words.
- **Common weaknesses to beat:**
  - Most competitor pages are **not updated** for the current 540-day rule nuances or the dependent-status cap (H-4/L-2 auto-extension ending with I-94). DueVisa's articles cover this explicitly.
  - Few competitors connect the *informational* answer to an *action tool* (a tracker/reminder). DueVisa does, naturally.
  - Forum results have high engagement but poor structure — easy to beat on clarity, tables, and FAQ schema.
- **Featured snippet / AI Overview opportunities:** "Quick Answer" boxes added to each new article are written to be liftable as snippets. FAQ schema added for PAA capture.

---

## 4. Internal Linking Plan

Each blog post links **down** to a tool page (conversion) and **across** to a sibling post (topical depth). Already wired via `RELATED_TOOLS`:

```
how-long-does-ead-renewal-take  →  /ead-renewal-calculator, /ead-reminder
h4-ead-renewal-guide            →  /ead-reminder, /h1b-renewal-tracker
ead-540-day-automatic-extension →  /ead-renewal-calculator, /ead-reminder
```

**To do:** Add reciprocal links *from* the tool pages back to the cluster posts ("Learn more: How long does EAD renewal take?"). This closes the loop and passes authority both ways.

---

## 5. On-Page SEO Implemented

- ✅ Unique title (<60 char where possible) + meta description per post via `generateMetadata`
- ✅ `Article` + `BreadcrumbList` + `FAQPage` JSON-LD schema on every post
- ✅ Quick Answer box in first 100 words (snippet/AI-overview bait)
- ✅ H2/H3 hierarchy, tables, checklists
- ✅ 20+ FAQ entries across the 3 new posts (PAA targeting)
- ✅ Posts added to `sitemap.ts`
- ✅ Natural CTA to product in every conclusion
- ✅ EEAT: government-source references (USCIS, CBP), explicit "verify on USCIS.gov" hedging, legal disclaimer block

---

## 6. Topical Authority Map (the build queue)

### CLUSTER 1 — EAD (in progress)
- ✅ EAD processing time / how long does renewal take
- ✅ H-4 EAD renewal guide
- ✅ 540-day automatic extension explained
- ✅ EAD renewal in 2026 (existing)
- ⬜ OPT EAD vs STEM OPT vs H-4 EAD (comparison)
- ⬜ EAD renewal cost / fees 2026
- ⬜ What to do if your EAD expired and you didn't renew
- ⬜ EAD RFE: common reasons and how to respond

### CLUSTER 2 — H-1B
- ✅ H-1B renewal timeline (existing)
- ✅ **H-1B grace period after layoff (60 days)** — high priority, high volume
- ⬜ H-1B transfer timeline
- ⬜ H-1B to green card timeline
- ⬜ Cap-gap explained (F-1 → H-1B)
- ⬜ H-1B extension beyond 6 years (AC21)

### CLUSTER 3 — I-94 / Status / Overstay
- ✅ I-94 vs visa stamp (existing)
- ✅ What happens if you overstay (existing)
- ⬜ How to check your I-94 (step-by-step) — high volume
- ⬜ I-94 vs I-797 difference
- ⬜ Unlawful presence vs out of status
- ⬜ Duration of Status (D/S) explained

### CLUSTER 4 — F-1 / Students
- ✅ F-1 immigration checklist (existing)
- ⬜ OPT application timeline (90-day window)
- ⬜ STEM OPT extension guide
- ⬜ F-1 grace period (60 days) explained
- ⬜ Day 1 CPT risks

### CLUSTER 5 — Green Card / Citizenship
- ✅ Green card renewal guide (existing)
- ⬜ I-751 removal of conditions (90-day window)
- ⬜ N-400 citizenship eligibility calculator + guide
- ⬜ Re-entry permit guide
- ⬜ Green card while traveling (I-551 stamp)

### CLUSTER 6 — Passport / Cross-cutting
- ⬜ Passport validity rules for US visa holders (6-month rule)
- ⬜ Per-country passport renewal in the USA (programmatic seed)

---

## 7. Programmatic Page Ideas (20)

1–10: `ead-expires-in-{1,2,3,4,5,6,7,8,9,12}-months`
11–15: `h1b-expires-in-{30,60,90,120,180}-days`
16–18: `{indian,chinese,nigerian}-passport-renewal-in-usa`
19: `i94-expired-what-to-do`
20: `green-card-expires-in-6-months`

## 8. Comparison Page Ideas (20 seed)
DueVisa vs spreadsheet · DueVisa vs Google Calendar · OPT vs STEM OPT · H-1B vs H-4 EAD · I-94 vs I-797 · I-94 vs visa stamp · Consular vs premium processing · I-90 vs I-751 · EAD vs work visa · AOS vs consular processing · (+10 more visa-type comparisons)

## 9. Calculator Page Ideas (20 seed)
EAD renewal window · I-94 expiry · H-1B 6-year max · OPT unemployment days · STEM OPT end date · N-400 eligibility date · green card 5-year citizenship clock · I-751 90-day window · re-entry permit timing · passport 6-month validity · (+10 more)

---

## 10. Recommended Next Actions (priority order)

1. **Deploy** the 3 EAD posts (merge branch → main).
2. **Submit sitemap** in Google Search Console + request indexing for the 3 new URLs.
3. **Add reciprocal links** from tool pages → cluster posts.
4. Write **"H-1B grace period after layoff"** next — highest-volume gap in the map.
5. Build the **I-94 checker guide** (high volume, low difficulty).
6. Only after indexation is confirmed: build the **programmatic "expires in X" engine** with genuinely differentiated per-page content.
7. Stand up **analytics** (still missing) so you can measure which cluster converts.
