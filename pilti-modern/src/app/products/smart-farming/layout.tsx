import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smart Farming Precision Grid | PiltiSmart",
  description: "Optimize land, crop yields, and resource utilization using smart agricultural IoT grids, solar power, and real-time agronomic data telemetry.",
  openGraph: {
    title: "Smart Farming Precision Grid | PiltiSmart",
    description: "Optimize land, crop yields, and resource utilization using smart agricultural IoT grids, solar power, and real-time agronomic data telemetry.",
    type: "website",
    url: "https://piltismart.com/products/smart-farming",
  },
};

export default function SmartFarmingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
