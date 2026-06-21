import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import RootLayoutWrapper from "@/components/RootLayoutWrapper";
import "./globals.css";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const display = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Swapnil Shiwalay | Digital Business Architect & AI Consultant",
  description:
    "Empowering experts, coaches, consultants, and founders to build scalable digital ecosystems using AI, content, automation, and personal branding.",
  metadataBase: new URL("https://swapnilonline.com"),
  openGraph: {
    title: "Swapnil Shiwalay | Digital Business Architect & AI Growth Consultant",
    description:
      "I help experts, coaches, consultants, and business owners build scalable digital ecosystems using AI, content, community, and automation.",
    url: "https://swapnilonline.com",
    siteName: "Swapnil Shiwalay",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swapnil Shiwalay | Digital Business Architect",
    description:
      "I help experts and founders build scalable digital ecosystems using AI, content, and automation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#030a16] text-[#f1f5f9] font-sans" suppressHydrationWarning>
        <RootLayoutWrapper>{children}</RootLayoutWrapper>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Swapnil Shiwalay",
              "url": "https://swapnilonline.com",
              "image": "https://swapnilonline.com/swapnil_hero.png",
              "jobTitle": "Digital Business Architect & AI Growth Consultant",
              "worksFor": {
                "@type": "Organization",
                "name": "Shiwalay Digital Pvt Ltd",
              },
              "description": "I help experts, coaches, consultants, and business owners build scalable digital ecosystems using AI, content, community, and automation.",
              "sameAs": [
                "https://www.linkedin.com",
                "https://twitter.com",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
