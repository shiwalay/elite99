import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";
import {
  generateMetadataHelper,
  getOrganizationSchema,
  getFounderSchema,
  getWebsiteSchema,
} from "@/lib/seo";

export const metadata: Metadata = generateMetadataHelper({
  title: "Digital Business Architecture | AI Growth Consultant",
  description: "Scale your business operations. Build custom AI systems, automated qualification pipelines, and personal authority positioning with Swapnil Shiwalay.",
  slug: "",
});

export default function Home() {
  const schemas = [
    getOrganizationSchema(),
    getFounderSchema(),
    getWebsiteSchema(),
  ];

  return (
    <>
      {schemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <HomePageClient />
    </>
  );
}
