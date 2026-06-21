import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://swapnilonline.com";
  
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/api",
          "/api/*",
          "/_next",
          "/_next/*",
        ],
      },
      {
        userAgent: ["Googlebot", "Bingbot", "Applebot", "ChatGPT-User", "OAI-SearchBot", "PerplexityBot", "ClaudeBot"],
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/api",
          "/api/*",
        ],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
