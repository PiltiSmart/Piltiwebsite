import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IoT Solutions & Services | PiltiSmart",
  description: "Explore our comprehensive suite of IoT ecosystem services, including smart homes, smart offices, precision agricultural sensing, industrial automation, and custom digital conversion frameworks.",
  openGraph: {
    title: "IoT Solutions & Services | PiltiSmart",
    description: "Explore our comprehensive suite of IoT ecosystem services, including smart homes, smart offices, precision agricultural sensing, industrial automation, and custom digital conversion frameworks.",
    type: "website",
    url: "https://piltismart.com/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
