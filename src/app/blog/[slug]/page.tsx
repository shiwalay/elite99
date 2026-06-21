import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostDetailClient from "@/components/BlogPostDetailClient";
import rawPosts from "@/data/posts.json";
import {
  generateMetadataHelper,
  getArticleSchema,
  getBreadcrumbSchema,
  getFaqSchema,
} from "@/lib/seo";

interface Post {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime?: string;
  content?: string;
  status?: string;
  featured?: boolean;
  featuredImage?: string;
}

const posts = rawPosts as Post[];

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const foundPost = posts.find((p) => p.slug === slug);

  if (!foundPost) {
    return {};
  }

  return generateMetadataHelper({
    title: foundPost.title,
    description: foundPost.excerpt,
    slug: `blog/${slug}`,
    ogImage: foundPost.featuredImage,
    ogType: "article",
  });
}

export default async function BlogPostDetail(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const foundPost = posts.find((p) => p.slug === slug);

  if (!foundPost) {
    notFound();
  }

  // Parse sections
  const contentWords = foundPost.content ? foundPost.content.split(/\s+/).length : 0;
  const readTime = foundPost.readTime || `${Math.ceil(contentWords / 200)} min read`;
  const paragraphs = foundPost.content
    ? foundPost.content.split("\n\n").filter((p) => p.trim().length > 0)
    : [];

  const postContent = {
    title: foundPost.title,
    category: foundPost.category,
    date: foundPost.date || "Jun 15, 2026",
    readTime,
    featuredImage: foundPost.featuredImage,
    introduction: foundPost.excerpt || paragraphs[0] || "",
    sections: [
      {
        heading: "",
        paragraphs: paragraphs.length > 0 ? paragraphs : [foundPost.excerpt || ""],
      },
    ],
    conclusion:
      "Deploying structured platforms and automation triggers is the key to building authority and scaling operations.",
    content: foundPost.content,
  };

  // Generate related posts recommendation list
  const filtered = posts.filter((p) => p.slug !== slug);
  const matched = filtered.filter((p) => p.category === foundPost.category).slice(0, 2);
  const relatedRecommendations = matched.length === 2 ? matched : filtered.slice(0, 2);

  // Generate schemas
  const articleSchema = getArticleSchema({
    title: foundPost.title,
    description: foundPost.excerpt,
    url: `https://swapnilonline.com/blog/${slug}`,
    imageUrl: foundPost.featuredImage || "https://swapnilonline.com/swapnil_hero.png",
    datePublished: "2026-06-15T00:00:00Z",
    dateModified: new Date().toISOString(),
  });

  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Blog", item: "/blog" },
    { name: foundPost.title, item: `/blog/${slug}` },
  ]);

  // Extract FAQs from content to inject FAQ schema dynamically
  const faqList: { question: string; answer: string }[] = [];
  if (foundPost.content) {
    const lines = foundPost.content.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith("### Q:") || line.startsWith("Q:")) {
        const question = line.replace(/^(### Q:|Q:)\s*/, "");
        const nextLine = lines[i + 1]?.trim() || "";
        if (nextLine) {
          faqList.push({ question, answer: nextLine });
        }
      }
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      {faqList.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqSchema(faqList)) }}
        />
      )}
      <BlogPostDetailClient
        slug={slug}
        post={postContent}
        relatedPosts={relatedRecommendations}
      />
    </>
  );
}
