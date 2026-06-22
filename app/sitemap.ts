// /app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://duevisa.com";

  const now = new Date();
  const staticPages = [
    { url: baseUrl, changeFrequency: "weekly" as const, priority: 1, lastModified: now },
    { url: `${baseUrl}/pricing`, changeFrequency: "monthly" as const, priority: 0.8, lastModified: now },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly" as const, priority: 0.9, lastModified: now },
    { url: `${baseUrl}/attorneys`, changeFrequency: "weekly" as const, priority: 0.7, lastModified: now },
    { url: `${baseUrl}/about`, changeFrequency: "monthly" as const, priority: 0.6, lastModified: now },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly" as const, priority: 0.5, lastModified: now },
    { url: `${baseUrl}/security`, changeFrequency: "monthly" as const, priority: 0.5, lastModified: now },
    { url: `${baseUrl}/how-to-use`, changeFrequency: "monthly" as const, priority: 0.7, lastModified: now },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly" as const, priority: 0.3, lastModified: now },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly" as const, priority: 0.3, lastModified: now },
    // Feature landing pages
    { url: `${baseUrl}/h1b-renewal-tracker`, changeFrequency: "monthly" as const, priority: 0.9, lastModified: now },
    { url: `${baseUrl}/ead-renewal-calculator`, changeFrequency: "monthly" as const, priority: 0.9, lastModified: now },
    { url: `${baseUrl}/ead-reminder`, changeFrequency: "monthly" as const, priority: 0.8, lastModified: now },
    { url: `${baseUrl}/f1-opt-tracker`, changeFrequency: "monthly" as const, priority: 0.8, lastModified: now },
    { url: `${baseUrl}/green-card-renewal`, changeFrequency: "monthly" as const, priority: 0.8, lastModified: now },
    // Auth (low priority, no-index handled by robots)
    { url: `${baseUrl}/login`, changeFrequency: "yearly" as const, priority: 0.4, lastModified: now },
    { url: `${baseUrl}/signup`, changeFrequency: "yearly" as const, priority: 0.6, lastModified: now },
  ];

  const blogPosts = [
    "how-long-does-ead-renewal-take",
    "h4-ead-renewal-guide",
    "ead-540-day-automatic-extension",
    "h1b-renewal-timeline",
    "i94-vs-visa-stamp",
    "ead-renewal-2026",
    "f1-student-immigration-checklist",
    "what-happens-if-you-overstay",
    "green-card-renewal-guide",
  ].map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    lastModified: new Date(),
  }));

  return [...staticPages, ...blogPosts];
}
