"use client";

import { usePathname } from "next/navigation";
import { Suspense, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ExitIntentModal from "@/components/ExitIntentModal";
import StickyCTA from "@/components/StickyCTA";
import GrowthOSObserver from "@/components/GrowthOSObserver";
import AIChatbot from "@/components/AIChatbot";
import CommandPalette from "@/components/CommandPalette";
import { useEcosystemStore } from "@/store/useEcosystemStore";

export default function RootLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  const isAdmin = pathname.startsWith("/admin");
  const isAcademy = pathname.startsWith("/academy");
  const theme = useEcosystemStore((state) => state.theme);
  const hydrateStore = useEcosystemStore((state) => state.hydrateStore);

  useEffect(() => {
    hydrateStore();
  }, [hydrateStore]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      const isDashboard = pathname.startsWith("/admin") || pathname.startsWith("/academy");
      if (isDashboard && theme === "light") {
        root.classList.add("light");
        root.classList.remove("dark");
      } else {
        root.classList.add("dark");
        root.classList.remove("light");
      }
    }
  }, [theme, pathname]);

  if (isAdmin || isAcademy) {
    return (
      <>
        <Suspense fallback={null}>
          <GrowthOSObserver />
        </Suspense>
        {children}
        <CommandPalette />
      </>
    );
  }

  return (
    <>
      <Suspense fallback={null}>
        <GrowthOSObserver />
      </Suspense>
      <Header />
      <main className="flex-grow pt-20">{children}</main>
      <Footer />
      <ExitIntentModal />
      <StickyCTA />
      <AIChatbot />
      <CommandPalette />
    </>
  );
}
