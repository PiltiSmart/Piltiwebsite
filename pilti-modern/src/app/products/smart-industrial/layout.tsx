import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IIoT Diagnostic Hub & Automation | PiltiSmart",
  description: "Enterprise edge-to-cloud industrial automation. Telemetry monitoring, real-time vibration sensors, predictive maintenance, and operational mastery.",
  openGraph: {
    title: "IIoT Diagnostic Hub & Automation | PiltiSmart",
    description: "Enterprise edge-to-cloud industrial automation. Telemetry monitoring, real-time vibration sensors, predictive maintenance, and operational mastery.",
    type: "website",
    url: "https://piltismart.com/products/smart-industrial",
  },
};

export default function SmartIndustrialLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
