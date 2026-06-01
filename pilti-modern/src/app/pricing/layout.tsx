import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing Plans | PiltiSmart Services",
  description: "Find the perfect plan for your smart home, office, agricultural grid, or enterprise industrial deployment. Scale your IoT assets with transparent plans.",
  openGraph: {
    title: "Pricing Plans | PiltiSmart Services",
    description: "Find the perfect plan for your smart home, office, agricultural grid, or enterprise industrial deployment. Scale your IoT assets with transparent plans.",
    type: "website",
    url: "https://piltismart.com/pricing",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
