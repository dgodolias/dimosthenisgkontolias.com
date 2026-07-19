import type { MetadataRoute } from "next";

const siteUrl = "https://dimosthenisgkontolias.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-06-27"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/cv`,
      lastModified: new Date("2026-07-19"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/llms.txt`,
      lastModified: new Date("2026-06-27"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
