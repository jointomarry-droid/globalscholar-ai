import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://globalscholar.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${BASE_URL}/scholarships`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${BASE_URL}/universities`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/countries`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.7 },
    { url: `${BASE_URL}/ai-search`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE_URL}/ai`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE_URL}/login`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${BASE_URL}/register`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.4 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.4 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.2 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.2 },
  ];

  const countryPages = [
    "united-states", "united-kingdom", "germany", "canada", "australia",
    "france", "netherlands", "japan", "south-korea", "turkey", "china", "india",
  ].map((slug) => ({
    url: `${BASE_URL}/countries/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const scholarshipSlugs = [
    "erasus-mundus-joint-master", "chevening-scholarship", "daad-development-scholarship",
    "fulbright-foreign-student", "australia-awards", "mext-scholarship",
  ].map((slug) => ({
    url: `${BASE_URL}/scholarships/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const universitySlugs = [
    "technical-university-munich", "university-of-oxford", "mit",
    "university-of-toronto", "university-of-melbourne", "university-of-tokyo",
  ].map((slug) => ({
    url: `${BASE_URL}/universities/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const blogSlugs = [
    "how-to-write-winning-sop", "top-fully-funded-europe-2026",
    "study-in-germany-guide", "ielts-vs-toefl-comparison",
    "ai-transforming-scholarship-discovery", "financial-planning-international-students",
  ].map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...countryPages, ...scholarshipSlugs, ...universitySlugs, ...blogSlugs];
}
