import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trademarks & Intellectual Property | PiltiSmart",
  description: "Guidelines and legal notifications regarding the usage of PiltiSmart™ intellectual property, brand names, product logos, and design patterns.",
  openGraph: {
    title: "Trademarks & Intellectual Property | PiltiSmart",
    description: "Guidelines and legal notifications regarding the usage of PiltiSmart™ intellectual property, brand names, product logos, and design patterns.",
    type: "website",
    url: "https://piltismart.com/trademarks",
  },
};

export default function TrademarksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
