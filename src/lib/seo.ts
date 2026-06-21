import type { Metadata } from "next";

interface MetadataInput {
  title: string;
  description: string;
  slug?: string;
  ogImage?: string;
  ogType?: "website" | "article";
}

export function generateMetadataHelper({
  title,
  description,
  slug = "",
  ogImage = "https://swapnilonline.com/swapnil_hero.png",
  ogType = "website",
}: MetadataInput): Metadata {
  const baseUrl = "https://swapnilonline.com";
  const canonicalUrl = `${baseUrl}${slug ? `/${slug}` : ""}`;
  
  // Format Title: Primary Keyword | Secondary Keyword | Elite99
  // If title already has 'Elite99', keep it, otherwise append.
  let formattedTitle = title;
  if (!title.includes("Elite99")) {
    const parts = title.split("|").map((p) => p.trim());
    if (parts.length >= 2) {
      formattedTitle = `${parts[0]} | ${parts[1]} | Elite99`;
    } else {
      formattedTitle = `${title} | Elite99`;
    }
  }

  // Enforce Description limits (140-160 characters)
  let formattedDesc = description;
  if (formattedDesc.length > 160) {
    formattedDesc = formattedDesc.substring(0, 157) + "...";
  } else if (formattedDesc.length < 100) {
    // Pad to CTR optimize if too short
    formattedDesc = `${description} Build your scalable digital business ecosystem with custom AI automations today.`;
    if (formattedDesc.length > 160) {
      formattedDesc = formattedDesc.substring(0, 157) + "...";
    }
  }

  return {
    title: formattedTitle,
    description: formattedDesc,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: formattedTitle,
      description: formattedDesc,
      url: canonicalUrl,
      siteName: "Elite99",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: formattedTitle,
        },
      ],
      locale: "en_US",
      type: ogType,
    },
    twitter: {
      card: "summary_large_image",
      title: formattedTitle,
      description: formattedDesc,
      images: [ogImage],
      creator: "@swapnilonline",
    },
  };
}

// JSON-LD Schema Generators

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Elite99",
    "url": "https://swapnilonline.com",
    "logo": "https://swapnilonline.com/swapnil_hero.png",
    "sameAs": [
      "https://linkedin.com",
      "https://twitter.com",
      "https://youtube.com"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-99999-99999",
      "contactType": "customer service",
      "email": "contact@swapnilonline.com"
    }
  };
}

export function getFounderSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Swapnil Shiwalay",
    "jobTitle": "Digital Business Architect & AI Consultant",
    "url": "https://swapnilonline.com",
    "sameAs": [
      "https://linkedin.com",
      "https://twitter.com"
    ]
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Elite99 SwapnilOnline",
    "url": "https://swapnilonline.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://swapnilonline.com/blog?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function getBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((it, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": it.name,
      "item": it.item.startsWith("http") ? it.item : `https://swapnilonline.com${it.item}`
    }))
  };
}

export interface ArticleInput {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  datePublished: string;
  dateModified: string;
}

export function getArticleSchema({
  title,
  description,
  url,
  imageUrl,
  datePublished,
  dateModified,
}: ArticleInput) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": title,
    "image": [imageUrl],
    "datePublished": datePublished,
    "dateModified": dateModified,
    "author": {
      "@type": "Person",
      "name": "Swapnil Shiwalay",
      "url": "https://swapnilonline.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Elite99",
      "logo": {
        "@type": "ImageObject",
        "url": "https://swapnilonline.com/swapnil_hero.png"
      }
    },
    "description": description,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };
}

export interface CourseInput {
  title: string;
  description: string;
  courseId: string;
}

export function getCourseSchema({ title, description, courseId }: CourseInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": title,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "Elite99 Academy",
      "sameAs": "https://swapnilonline.com"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "instructor": {
        "@type": "Person",
        "name": "Swapnil Shiwalay",
        "jobTitle": "Systems Architect"
      }
    },
    "url": `https://swapnilonline.com/academy/course/${courseId}`
  };
}

export function getFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };
}
