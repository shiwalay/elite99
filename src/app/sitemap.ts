import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://swapnilonline.com";
  
  const routes = [
    "",
    "/about",
    "/services",
    "/blog",
    "/resources",
    "/contact",
    "/masterclass",
    "/frameworks",
    "/privacy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/blog" ? "daily" : "monthly",
    priority: route === "" ? 1.0 : route === "/services" || route === "/masterclass" ? 0.8 : 0.5,
  }));
}
