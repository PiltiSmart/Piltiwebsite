import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | PiltiSmart - IoT Enterprise Engineering",
  description: "Learn about the mission, values, and world-class engineering team behind PiltiSmart's next-generation smart technology and IoT infrastructure.",
  openGraph: {
    title: "About Us | PiltiSmart - IoT Enterprise Engineering",
    description: "Learn about the mission, values, and world-class engineering team behind PiltiSmart.",
    type: "website",
    url: "https://piltismart.com/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
