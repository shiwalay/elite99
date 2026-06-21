import { NextResponse } from "next/server";
import pSeoData from "@/data/programmatic-seo.json";

export async function GET() {
  const baseUrl = "https://swapnilonline.com";

  // Static site pages mapping
  const staticPages = [
    "",
    "/about",
    "/services",
    "/contact",
    "/masterclass",
    "/resources",
    "/frameworks",
    "/privacy",
    "/terms",
  ];

  const staticUrls = staticPages.map((route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${route === "" ? "daily" : "monthly"}</changefreq>
    <priority>${route === "" ? "1.0" : route === "/services" || route === "/masterclass" ? "0.8" : "0.5"}</priority>
  </url>
  `).join("");

  // Programmatic landing pages mapping
  const programmaticUrls = Object.keys(pSeoData).map((slug) => `
  <url>
    <loc>${baseUrl}/${slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  `).join("");

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls}
  ${programmaticUrls}
</urlset>`;

  return new NextResponse(sitemapXml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
