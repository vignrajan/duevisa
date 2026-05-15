import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Immigration Blog",
  description: "Expert guides on H-1B renewal, EAD timelines, green card renewal, F-1 OPT deadlines, and more. Stay informed about US immigration.",
};

const BLOG_POSTS = [
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
                  <div className="font-mono text-forest text-4xl font-bold">H-1B</div>
                  <div className="text-forest/70 text-sm mt-1 font-medium tracking-wide uppercase">Renewal Guide</div>
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
