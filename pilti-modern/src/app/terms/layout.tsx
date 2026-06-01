import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | PiltiSmart",
  description: "Read the legal agreements, licensing terms, usage guidelines, and service conditions that apply to your use of PiltiSmart devices and applications.",
  openGraph: {
    title: "Terms of Service | PiltiSmart",
    description: "Read the legal agreements, licensing terms, usage guidelines, and service conditions that apply to your use of PiltiSmart devices and applications.",
    type: "website",
    url: "https://piltismart.com/terms",
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
