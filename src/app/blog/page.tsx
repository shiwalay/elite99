import type { Metadata } from "next";
import BlogPageClient from "@/components/BlogPageClient";
import rawPosts from "@/data/posts.json";
import { generateMetadataHelper, getBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = generateMetadataHelper({
  title: "Systems & AI Scaling Insights | Humans of Internet",
  description: "Read architectural essays and deep-dives on digital business strategy, Make.com operations automation, and high-ticket personal branding by Swapnil Shiwalay.",
  slug: "blog",
});

export default function BlogPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Blog Insights", item: "/blog" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogPageClient initialPosts={rawPosts} />
    </>
  );
}
