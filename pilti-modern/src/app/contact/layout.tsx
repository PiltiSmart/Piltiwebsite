import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Get in Touch with PiltiSmart",
  description: "Reach out to PiltiSmart for enterprise partnerships, customer support, device integrations, and general inquiries regarding our smart solutions.",
  openGraph: {
    title: "Contact Us | Get in Touch with PiltiSmart",
    description: "Reach out to PiltiSmart for enterprise partnerships, customer support, device integrations, and general inquiries regarding our smart solutions.",
    type: "website",
    url: "https://piltismart.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
