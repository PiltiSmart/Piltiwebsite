import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SmartySwitch™ Smart Home Solutions | PiltiSmart",
  description: "Monitor and automate your home with SmartySwitch™ featuring premium WiFi current sensing, anomaly detection, and energy analytics.",
  openGraph: {
    title: "SmartySwitch™ Smart Home Solutions | PiltiSmart",
    description: "Monitor and automate your home with SmartySwitch™ featuring premium WiFi current sensing, anomaly detection, and energy analytics.",
    type: "website",
    url: "https://piltismart.com/products/smart-home",
  },
};

export default function SmartHomeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
