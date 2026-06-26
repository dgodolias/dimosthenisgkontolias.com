import type { MetadataRoute } from "next";

const siteUrl = "https://dimosthenisgkontolias.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "anthropic-ai"],
        allow: ["/", "/llms.txt"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
