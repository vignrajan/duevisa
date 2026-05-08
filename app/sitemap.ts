// /app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://duevisa.com";

  const staticPages = [
    { url: baseUrl, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/pricing`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/attorneys`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/login`, changeFrequency: "yearly" as const, priority: 0.4 },
    { url: `${baseUrl}/signup`, changeFrequency: "yearly" as const, priority: 0.6 },
  ];

  const blogPosts = [
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
