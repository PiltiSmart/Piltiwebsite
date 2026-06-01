import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | PiltiSmart",
  description: "Learn how PiltiSmart handles and protects your data, device configurations, and personal information across our IoT products and services.",
  openGraph: {
    title: "Privacy Policy | PiltiSmart",
    description: "Learn how PiltiSmart handles and protects your data, device configurations, and personal information across our IoT products and services.",
    type: "website",
    url: "https://piltismart.com/privacy",
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
