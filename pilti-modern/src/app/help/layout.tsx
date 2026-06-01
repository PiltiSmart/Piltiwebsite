import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help & Documentation | PiltiSmart Support",
  description: "Browse step-by-step guides, device configuration tutorials, knowledge base articles, and video documentation to master your smart IoT ecosystem.",
  openGraph: {
    title: "Help & Documentation | PiltiSmart Support",
    description: "Browse step-by-step guides, device configuration tutorials, knowledge base articles, and video documentation to master your smart IoT ecosystem.",
    type: "website",
    url: "https://piltismart.com/help",
  },
};

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
