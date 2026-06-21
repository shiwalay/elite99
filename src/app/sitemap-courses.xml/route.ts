import { NextResponse } from "next/server";
import { DEFAULT_COURSES } from "@/app/academy/courses-data";

export async function GET() {
  const baseUrl = "https://swapnilonline.com";

  // Dynamic courses mapping
  const urls = DEFAULT_COURSES.map((course) => `
  <url>
    <loc>${baseUrl}/academy/course/${course.id}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  `).join("");

  // Add individual lessons mapping as nested routes
  const lessonUrls = DEFAULT_COURSES.flatMap((course) => 
    course.lessons.map((lesson) => `
  <url>
    <loc>${baseUrl}/academy/course/${course.id}/${lesson.id}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
    `)
  ).join("");

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/academy</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  ${urls}
  ${lessonUrls}
</urlset>`;

  return new NextResponse(sitemapXml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
