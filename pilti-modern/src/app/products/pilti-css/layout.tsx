import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pilti Clinical Support System (PCSS) | PiltiSmart",
  description: "Redefine patient care with advanced AI diagnostic assistants, real-time telemetry monitoring, and smart clinical support integration.",
  openGraph: {
    title: "Pilti Clinical Support System (PCSS) | PiltiSmart",
    description: "Redefine patient care with advanced AI diagnostic assistants, real-time telemetry monitoring, and smart clinical support integration.",
    type: "website",
    url: "https://piltismart.com/products/pilti-css",
  },
};

export default function PiltiCssLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
