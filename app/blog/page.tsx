import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Immigration Blog — Visa Deadlines, Renewal Guides & Tips",
  description: "Expert guides on H-1B renewal, EAD timelines, green card renewal, F-1 OPT deadlines, and more. Written in plain English.",
  keywords: ["H-1B renewal guide", "EAD renewal 2026", "immigration deadline tips", "F-1 OPT tracker", "green card renewal"],
  alternates: { canonical: "https://duevisa.com/blog" },
};

const BLOG_POSTS = [
  {
    slug: "opt-application-timeline",
    title: "OPT Application Timeline: The 90-Day Window Explained (2026)",
    description: "F-1 students can only apply for OPT within a strict 90-day window. Miss it and you lose your OPT year. Here's the exact timeline, how to calculate your window, and every deadline you need to track.",
    date: "June 22, 2026",
    readTime: "12 min",
    category: "F-1",
    image: null,
  },
  {
    slug: "how-to-check-your-i94",
    title: "How to Check Your I-94 Online: Step-by-Step Guide (2026)",
    description: "Your I-94 — not your visa stamp — controls how long you can legally stay in the US. Here's how to find it, read it, and fix errors, with screenshots-level detail.",
    date: "June 22, 2026",
    readTime: "10 min",
    category: "General",
    image: null,
  },
  {
    slug: "h1b-grace-period-after-layoff",
    title: "H-1B Grace Period After Layoff: Your 60-Day Survival Guide (2026)",
    description: "Laid off on an H-1B? You have 60 days to act — and every day counts. Here's exactly what to do, what your options are, and what mistakes can end your stay.",
    date: "June 22, 2026",
    readTime: "13 min",
    category: "H-1B",
    image: null,
  },
  {
    slug: "how-long-does-ead-renewal-take",
    title: "EAD Processing Time in 2026: How Long Does Renewal Take?",
    description: "EAD renewal can take anywhere from 1 to 8+ months depending on your category and service center. Here's how to check your timeline and avoid a work gap.",
    date: "June 18, 2026",
    readTime: "11 min",
    category: "EAD",
    image: null,
  },
  {
    slug: "h4-ead-renewal-guide",
    title: "H-4 EAD Renewal: The Complete 2026 Guide",
    description: "H-4 EAD is one of the most fragile work permits in US immigration. Here's how renewal works, who qualifies, and how the auto-extension is capped by your H-4 status.",
    date: "June 16, 2026",
    readTime: "12 min",
    category: "EAD",
    image: null,
  },
  {
    slug: "ead-540-day-automatic-extension",
    title: "The 540-Day EAD Automatic Extension, Explained (2026)",
    description: "A timely EAD renewal can keep you working for up to 540 days past your card's expiry. Here's who qualifies, how to prove it for I-9, and the traps to avoid.",
    date: "June 14, 2026",
    readTime: "10 min",
    category: "EAD",
    image: null,
  },
  {
    slug: "h1b-renewal-timeline",
    title: "The Complete H-1B Renewal Timeline: When to Start and What to Do",
    description: "A step-by-step guide to H-1B renewal — from the 180-day mark to filing your I-129 extension. Never miss your window again.",
    date: "April 15, 2026",
    readTime: "8 min",
    category: "H-1B",
    image: null,
  },
  {
    slug: "i94-vs-visa-stamp",
    title: "I-94 vs Visa Stamp: What's the Difference and Which One Matters",
    description: "Most immigrants confuse their visa stamp with their I-94. Understanding the difference could save your legal status.",
    date: "April 10, 2026",
    readTime: "5 min",
    category: "General",
    image: null,
  },
  {
    slug: "ead-renewal-2026",
    title: "EAD Renewal in 2026: Timeline, Process, and What Changed",
    description: "USCIS updated EAD automatic extension rules. Here's what H-4 EAD, OPT EAD, and other EAD holders need to know.",
    date: "April 5, 2026",
    readTime: "7 min",
    category: "EAD",
    image: null,
  },
  {
    slug: "f1-student-immigration-checklist",
    title: "The F-1 Student Immigration Checklist: Every Date You Need to Track",
    description: "F-1 students track more dates than any other visa category. This comprehensive checklist covers every deadline from enrollment to STEM OPT.",
    date: "March 28, 2026",
    readTime: "9 min",
    category: "F-1",
    image: null,
  },
  {
    slug: "what-happens-if-you-overstay",
    title: "What Happens If You Overstay Your Visa? (And How to Avoid It)",
    description: "Overstaying has serious consequences — 3-year and 10-year bars, future visa denials, and deportation risk. Here's the full picture.",
    date: "March 20, 2026",
    readTime: "10 min",
    category: "General",
    image: null,
  },
  {
    slug: "green-card-renewal-guide",
    title: "Green Card Renewal Guide: When to Apply and What Documents You Need",
    description: "Your green card expires — you don't lose status, but you still need to renew. Here's everything you need to know about Form I-90.",
    date: "March 12, 2026",
    readTime: "6 min",
    category: "Green Card",
    image: null,
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "H-1B":       "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700/40",
  "F-1":        "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700/40",
  "EAD":        "bg-tinted-white text-forest border-border-strong dark:bg-forest/20 dark:text-lime dark:border-forest/40",
  "Green Card": "bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700/40",
  "General":    "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800/30 dark:text-slate-300 dark:border-slate-700/40",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="h-section text-text-primary mb-4" style={{ color: "var(--text-primary)" }}>
              Stay informed. Stay compliant.
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              Expert guides on visa renewals, document timelines, and immigration law — written in plain English, not legalese.
            </p>
          </div>

          {/* Featured post */}
          <div className="mb-10">
            <Link
              href={`/blog/${BLOG_POSTS[0].slug}`}
              className="block bg-card-bg border border-border-default rounded-2xl hover:border-forest hover:shadow-card-hover transition-all duration-300 group md:flex md:gap-8 overflow-hidden"
            >
              <div className="md:w-2/5 aspect-video md:aspect-auto bg-page-alt2 flex items-center justify-center flex-shrink-0">
                <div className="text-center">
                  <div className="font-mono text-forest text-4xl font-bold">{BLOG_POSTS[0].category}</div>
                  <div className="text-forest/70 text-sm mt-1 font-medium tracking-wide uppercase">Guide</div>
                </div>
              </div>
              <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${CATEGORY_COLORS[BLOG_POSTS[0].category]}`}>
                    {BLOG_POSTS[0].category}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#C8F562] text-[#050E0B]">Featured</span>
                </div>
                <h2 className="font-bold text-2xl sm:text-3xl mb-3 text-text-primary group-hover:text-forest transition-colors leading-tight">
                  {BLOG_POSTS[0].title}
                </h2>
                <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-6">{BLOG_POSTS[0].description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3 text-text-secondary text-xs font-semibold tracking-wide">
                    <span>{BLOG_POSTS[0].date}</span>
                    <span>·</span>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{BLOG_POSTS[0].readTime} read</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-forest font-semibold text-sm group-hover:gap-2 transition-all">
                    Read more <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* CTA Banner */}
          <div className="mb-10 rounded-2xl px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-6" style={{ background:"var(--color-forest)" }}>
            <div>
              <p className="font-bold text-lg mb-1" style={{ color:"#eef5f0" }}>Never miss a deadline again.</p>
              <p className="text-sm" style={{ color:"rgba(238,245,240,0.7)" }}>Track all your visas, EADs, and immigration documents in one place. Free for up to 3 documents.</p>
            </div>
            <Link href="/signup" className="btn-primary-lime text-sm px-6 py-3 cursor-pointer whitespace-nowrap flex-shrink-0">
              Start free →
            </Link>
          </div>

          {/* Blog grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.slice(1).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-card-bg border border-border-default rounded-2xl hover:border-forest hover:shadow-card-hover transition-all duration-300 group flex flex-col overflow-hidden"
              >
                {/* Visual */}
                <div className="aspect-[16/9] bg-page-alt border-b border-border-subtle flex items-center justify-center flex-shrink-0">
                  <div className="font-mono text-text-muted text-xl font-bold tracking-widest uppercase">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase border w-fit mb-4 ${CATEGORY_COLORS[post.category]}`}>
                    {post.category}
                  </span>

                  <h2 className="font-bold text-text-primary text-lg mb-3 group-hover:text-forest transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-2">
                    {post.description}
                  </p>
                  
                  <div className="flex items-center gap-3 text-text-muted text-xs font-semibold tracking-wide mt-auto pt-4 border-t border-border-subtle">
                    <span>{post.date}</span>
                    <span>·</span>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
