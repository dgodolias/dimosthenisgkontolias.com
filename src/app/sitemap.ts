import type { MetadataRoute } from "next";

const siteUrl = "https://dimosthenisgkontolias.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-06-26"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
