import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PiltiStore™ - Commerce Platform | PiltiSmart",
  description: "Shop for our next-generation smart current sensing switches, AI cameras, and unified TV-PC hardware solutions designed for your connected life.",
  openGraph: {
    title: "PiltiStore™ - Commerce Platform | PiltiSmart",
    description: "Shop for our next-generation smart current sensing switches, AI cameras, and unified TV-PC hardware solutions designed for your connected life.",
    type: "website",
    url: "https://piltismart.com/store",
  },
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
