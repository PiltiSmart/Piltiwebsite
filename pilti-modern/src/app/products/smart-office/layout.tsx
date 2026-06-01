import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smart Office Resource Calibrator | PiltiSmart",
  description: "Maximize office energy savings and workspace efficiency with presence sensing systems, custom HVAC rules, and intelligent corporate calibration.",
  openGraph: {
    title: "Smart Office Resource Calibrator | PiltiSmart",
    description: "Maximize office energy savings and workspace efficiency with presence sensing systems, custom HVAC rules, and intelligent corporate calibration.",
    type: "website",
    url: "https://piltismart.com/products/smart-office",
  },
};

export default function SmartOfficeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
