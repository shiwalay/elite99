"use client";

import { AdminThemeProvider } from "@/components/AdminThemeContext";

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminThemeProvider>
      {children}
    </AdminThemeProvider>
  );
}
