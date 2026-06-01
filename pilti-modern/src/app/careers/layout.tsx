import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Join PiltiSmart",
  description: "Work with the team that builds the future of smart ecosystems. Explore job openings in IoT systems architecture, embedded software engineering, and AI research.",
  openGraph: {
    title: "Careers | Join PiltiSmart",
    description: "Work with the team that builds the future of smart ecosystems. Explore job openings in IoT systems architecture, embedded software engineering, and AI research.",
    type: "website",
    url: "https://piltismart.com/careers",
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
