import type { Metadata } from "next";
import AdminGuard from "@/components/AdminGuard";

export const metadata: Metadata = {
  title: "Admin Console | SwapnilOnline.com",
  description: "Centralized digital business operations, CRM, CMS, and automations control center.",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminGuard>
      {children}
    </AdminGuard>
  );
}
